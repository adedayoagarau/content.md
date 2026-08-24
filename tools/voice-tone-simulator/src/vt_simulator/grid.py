"""Primary exact expansion and deduplication of the VT-MSP scenario grid."""

from __future__ import annotations

from copy import deepcopy
from dataclasses import dataclass
import hashlib
from itertools import product
from typing import Iterator

from .canonical import canonical_bytes, content_hash
from .manifest import ValidatedProtocol


class GridValidationError(ValueError):
    """A grid override, identity, count, or collision violates the protocol."""


@dataclass(frozen=True)
class ScenarioMembership:
    arm_id: str
    scenario_parameter_hash: str
    scenario_id: str
    preimage: dict[str, object]


@dataclass(frozen=True)
class ScenarioBundle:
    scenario_parameter_hash: str
    scenario_id: str
    preimage: dict[str, object]
    arm_memberships: tuple[str, ...]


@dataclass(frozen=True)
class GridResult:
    prededup_count: int
    unique_count: int
    duplicate_membership_count: int
    multi_arm_bundle_count: int
    scenarios_by_hash: dict[str, ScenarioBundle]
    short_id_collisions: tuple[str, ...]

    def summary_record(self) -> dict[str, object]:
        ordered_hashes = sorted(self.scenarios_by_hash)
        set_digest = hashlib.sha256(canonical_bytes(ordered_hashes)).hexdigest()
        membership_digest = hashlib.sha256(
            canonical_bytes(
                [
                    [digest, list(self.scenarios_by_hash[digest].arm_memberships)]
                    for digest in ordered_hashes
                ]
            )
        ).hexdigest()
        return {
            "duplicate_memberships": self.duplicate_membership_count,
            "membership_map_hash": membership_digest,
            "multi_arm_bundles": self.multi_arm_bundle_count,
            "prededup_rows": self.prededup_count,
            "scenario_hash_set_hash": set_digest,
            "short_id_collision_count": len(self.short_id_collisions),
            "unique_scenarios": self.unique_count,
        }


_PROFILE_VALUES = {
    "analysis_profile_id": "VT-MSP-ANALYSIS/design-0.1",
    "generating_profile_id": "VT-MSP-DGM/design-0.1",
    "math_profile_id": "VT-MSP-MATH/design-0.1",
    "scenario_grid_id": "VT-MSP-GRID/design-0.1",
    "schedule_profile_id": "VT-MSP-SCHEDULE/design-0.1",
}


def _target_map(protocol: ValidatedProtocol) -> dict[str, str]:
    return {
        str(target["target_id"]): str(target["target_population_kind"])
        for target in protocol.targets
    }


def _validate_factor_selection(
    protocol: ValidatedProtocol, factor_id: str, selection: object
) -> None:
    definition = protocol.factors[factor_id]
    if not isinstance(definition, dict) or set(definition) != {"kind", "levels"}:
        raise GridValidationError(f"factor {factor_id} has an invalid definition")
    levels = definition["levels"]
    if not isinstance(levels, list) or selection not in levels:
        raise GridValidationError(f"selection for {factor_id} is not a declared exact level")


def build_scenario_preimage(
    protocol: ValidatedProtocol, overrides: dict[str, object]
) -> dict[str, object]:
    """Apply only declared exact substitutions to the complete baseline vector."""

    allowed = set(protocol.factor_order) | {"target_id", "target_population_kind"}
    unknown = sorted(set(overrides) - allowed)
    if unknown:
        raise GridValidationError(f"unknown or derived scenario fields: {unknown!r}")

    has_target_id = "target_id" in overrides
    has_target_kind = "target_population_kind" in overrides
    if has_target_id != has_target_kind:
        raise GridValidationError("target_id and target_population_kind must be overridden together")

    factors = deepcopy(protocol.baseline)
    for factor_id in protocol.factor_order:
        if factor_id in overrides:
            selection = deepcopy(overrides[factor_id])
            _validate_factor_selection(protocol, factor_id, selection)
            factors[factor_id] = selection

    target_id = str(overrides.get("target_id", "T-FIXED-FIXED"))
    target_kind = str(
        overrides.get("target_population_kind", "fixed_messages_fixed_panel")
    )
    targets = _target_map(protocol)
    if target_id not in targets or targets[target_id] != target_kind:
        raise GridValidationError("target ID and population kind are not an exact declared pair")

    return {
        "analysis_profile_id": _PROFILE_VALUES["analysis_profile_id"],
        "factor_selections": {
            factor_id: factors[factor_id] for factor_id in protocol.factor_order
        },
        "generating_profile_id": _PROFILE_VALUES["generating_profile_id"],
        "math_profile_id": _PROFILE_VALUES["math_profile_id"],
        "scenario_grid_id": _PROFILE_VALUES["scenario_grid_id"],
        "schedule_profile_id": _PROFILE_VALUES["schedule_profile_id"],
        "target_id": target_id,
        "target_population_kind": target_kind,
    }


def _merge_dimension_choices(choices: tuple[object, ...], arm_id: str) -> dict[str, object]:
    overrides: dict[str, object] = {}
    for dimension_index, choice in enumerate(choices):
        if not isinstance(choice, dict) or not choice:
            raise GridValidationError(
                f"{arm_id} dimension {dimension_index} must select a non-empty object"
            )
        for key, value in choice.items():
            if key in overrides and overrides[key] != value:
                raise GridValidationError(f"{arm_id} contains conflicting overrides for {key}")
            overrides[key] = value
    return overrides


def expand_prededup_rows(protocol: ValidatedProtocol) -> Iterator[ScenarioMembership]:
    """Expand all arms in declared order without deduplicating memberships."""

    for arm in protocol.arms:
        arm_id = arm.get("arm_id")
        dimensions = arm.get("dimensions")
        if not isinstance(arm_id, str) or not arm_id:
            raise GridValidationError("arm_id must be a non-empty string")
        if not isinstance(dimensions, list) or not dimensions:
            raise GridValidationError(f"{arm_id} must contain dimensions")
        for index, dimension in enumerate(dimensions):
            if not isinstance(dimension, list) or not dimension:
                raise GridValidationError(f"{arm_id} dimension {index} is empty")

        observed_count = 0
        for choices in product(*dimensions):
            overrides = _merge_dimension_choices(choices, arm_id)
            preimage = build_scenario_preimage(protocol, overrides)
            digest = content_hash(preimage)
            observed_count += 1
            yield ScenarioMembership(
                arm_id=arm_id,
                scenario_parameter_hash=digest,
                scenario_id=f"SIM-{digest[:20]}",
                preimage=preimage,
            )
        expected = arm.get("prededup_count")
        if isinstance(expected, bool) or not isinstance(expected, int) or expected != observed_count:
            raise GridValidationError(
                f"{arm_id} expanded to {observed_count}, expected {expected!r}"
            )


def deduplicate_scenarios(rows: tuple[ScenarioMembership, ...]) -> GridResult:
    """Deduplicate by full digest, union memberships, and reject identity collisions."""

    preimages: dict[str, dict[str, object]] = {}
    memberships: dict[str, set[str]] = {}
    short_to_full: dict[str, str] = {}
    collisions: set[str] = set()

    for row in rows:
        digest = row.scenario_parameter_hash
        if content_hash(row.preimage) != digest:
            raise GridValidationError("scenario row hash does not match its preimage")
        if row.scenario_id != f"SIM-{digest[:20]}":
            raise GridValidationError("scenario row short ID does not match its full hash")
        existing = preimages.get(digest)
        if existing is not None and canonical_bytes(existing) != canonical_bytes(row.preimage):
            raise GridValidationError("full scenario hash collision")
        preimages.setdefault(digest, row.preimage)
        memberships.setdefault(digest, set()).add(row.arm_id)
        prior = short_to_full.setdefault(row.scenario_id, digest)
        if prior != digest:
            collisions.add(row.scenario_id)

    scenarios = {
        digest: ScenarioBundle(
            scenario_parameter_hash=digest,
            scenario_id=f"SIM-{digest[:20]}",
            preimage=preimages[digest],
            arm_memberships=tuple(sorted(memberships[digest])),
        )
        for digest in sorted(preimages)
    }
    return GridResult(
        prededup_count=len(rows),
        unique_count=len(scenarios),
        duplicate_membership_count=len(rows) - len(scenarios),
        multi_arm_bundle_count=sum(
            1 for scenario in scenarios.values() if len(scenario.arm_memberships) > 1
        ),
        scenarios_by_hash=scenarios,
        short_id_collisions=tuple(sorted(collisions)),
    )
