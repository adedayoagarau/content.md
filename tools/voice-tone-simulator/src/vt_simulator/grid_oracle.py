"""Independent dependency-minimal oracle for the frozen scenario grid."""

from __future__ import annotations

from copy import deepcopy
from dataclasses import dataclass
import hashlib
from pathlib import Path
import json
from typing import Iterator

import rfc8785


@dataclass(frozen=True)
class IndependentGridReport:
    prededup_count: int
    unique_count: int
    duplicate_membership_count: int
    multi_arm_bundle_count: int
    scenario_hashes: tuple[str, ...]
    memberships_by_hash: tuple[tuple[str, tuple[str, ...]], ...]


def _reject_duplicate_keys(pairs: list[tuple[str, object]]) -> dict[str, object]:
    result: dict[str, object] = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"duplicate JSON key: {key}")
        result[key] = value
    return result


def _load(path: Path) -> dict[str, object]:
    parsed = json.loads(
        path.read_bytes().decode("utf-8"), object_pairs_hook=_reject_duplicate_keys
    )
    if not isinstance(parsed, dict):
        raise ValueError(f"{path.name} is not an object")
    expected = parsed.get("record_hash")
    preimage = {key: value for key, value in parsed.items() if key != "record_hash"}
    observed = hashlib.sha256(rfc8785.dumps(preimage)).hexdigest()
    if expected != observed:
        raise ValueError(f"{path.name} record hash mismatch")
    return parsed


def _dimension_rows(dimensions: list[object]) -> Iterator[tuple[object, ...]]:
    """Recursive Cartesian expansion intentionally independent of itertools.product."""

    chosen: list[object] = []

    def visit(index: int) -> Iterator[tuple[object, ...]]:
        if index == len(dimensions):
            yield tuple(chosen)
            return
        dimension = dimensions[index]
        if not isinstance(dimension, list) or not dimension:
            raise ValueError("arm dimension must be a non-empty list")
        for choice in dimension:
            chosen.append(choice)
            yield from visit(index + 1)
            chosen.pop()

    yield from visit(0)


def verify_grid_independently(protocol_path: Path) -> IndependentGridReport:
    """Rebuild the complete grid without importing the primary grid implementation."""

    root = protocol_path.resolve(strict=True)
    manifest = _load(root / "manifest.vt-msp-design-0.1.json")
    refs = manifest["profile_refs"]
    if not isinstance(refs, dict) or not isinstance(refs.get("factors"), dict):
        raise ValueError("factor profile ref is absent")
    factor_name = refs["factors"]["path"]
    if not isinstance(factor_name, str) or "/" in factor_name or ".." in factor_name:
        raise ValueError("factor profile path is not a direct child")
    factors = _load(root / factor_name)
    if factors["record_hash"] != refs["factors"]["record_hash"]:
        raise ValueError("factor profile digest does not match manifest")

    baseline = factors["baseline"]
    factor_order = factors["factor_order"]
    targets = factors["targets"]
    arms = factors["arms"]
    if not isinstance(baseline, dict) or not isinstance(factor_order, list):
        raise ValueError("factor profile baseline/order is invalid")
    if not isinstance(targets, list) or not isinstance(arms, list):
        raise ValueError("factor profile target/arm collections are invalid")
    target_map = {
        item["target_id"]: item["target_population_kind"]
        for item in targets
        if isinstance(item, dict)
    }

    row_count = 0
    preimages: dict[str, bytes] = {}
    membership: dict[str, set[str]] = {}
    short_ids: dict[str, str] = {}
    for arm in arms:
        if not isinstance(arm, dict):
            raise ValueError("arm is not an object")
        arm_id = arm["arm_id"]
        dimensions = arm["dimensions"]
        if not isinstance(arm_id, str) or not isinstance(dimensions, list):
            raise ValueError("arm shape is invalid")
        arm_count = 0
        for choices in _dimension_rows(dimensions):
            override: dict[str, object] = {}
            for choice in choices:
                if not isinstance(choice, dict):
                    raise ValueError("dimension choice is not an object")
                for key, value in choice.items():
                    if key in override and override[key] != value:
                        raise ValueError("conflicting dimension override")
                    override[key] = value
            selected = deepcopy(baseline)
            for factor_id in factor_order:
                if factor_id in override:
                    selected[factor_id] = deepcopy(override[factor_id])
            target_id = override.get("target_id", "T-FIXED-FIXED")
            target_kind = override.get(
                "target_population_kind", "fixed_messages_fixed_panel"
            )
            if target_map.get(target_id) != target_kind:
                raise ValueError("target ID/kind mismatch")
            preimage = {
                "analysis_profile_id": "VT-MSP-ANALYSIS/design-0.1",
                "factor_selections": {
                    factor_id: selected[factor_id] for factor_id in factor_order
                },
                "generating_profile_id": "VT-MSP-DGM/design-0.1",
                "math_profile_id": "VT-MSP-MATH/design-0.1",
                "scenario_grid_id": "VT-MSP-GRID/design-0.1",
                "schedule_profile_id": "VT-MSP-SCHEDULE/design-0.1",
                "target_id": target_id,
                "target_population_kind": target_kind,
            }
            raw = rfc8785.dumps(preimage)
            digest = hashlib.sha256(raw).hexdigest()
            prior = preimages.setdefault(digest, raw)
            if prior != raw:
                raise ValueError("full scenario hash collision")
            short = f"SIM-{digest[:20]}"
            if short in short_ids and short_ids[short] != digest:
                raise ValueError("short scenario ID collision")
            short_ids[short] = digest
            membership.setdefault(digest, set()).add(arm_id)
            arm_count += 1
            row_count += 1
        if arm_count != arm["prededup_count"]:
            raise ValueError(f"{arm_id} prededup count mismatch")

    hashes = tuple(sorted(preimages))
    memberships = tuple(
        (digest, tuple(sorted(membership[digest]))) for digest in hashes
    )
    return IndependentGridReport(
        prededup_count=row_count,
        unique_count=len(hashes),
        duplicate_membership_count=row_count - len(hashes),
        multi_arm_bundle_count=sum(
            1 for _, arms_for_hash in memberships if len(arms_for_hash) > 1
        ),
        scenario_hashes=hashes,
        memberships_by_hash=memberships,
    )
