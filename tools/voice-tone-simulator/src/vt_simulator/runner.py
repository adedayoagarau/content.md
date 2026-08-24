"""Bounded one-scenario conformance runner with no persistent result store."""

from __future__ import annotations

from collections import Counter
from collections.abc import Iterator
from dataclasses import dataclass
import hashlib
from pathlib import Path

from .canonical import content_hash
from .grid import (
    ScenarioBundle,
    build_scenario_preimage,
    expand_prededup_rows,
)
from .manifest import ValidatedProtocol
from .records import ScientificRecord, validate_record
from .replicate import generate_bounded_replicate
from .schedule import build_schedule


BASELINE_SCENARIO_ID = "SIM-99174ca8571c01f2deca"
_BASELINE_SCENARIO_HASH = (
    "99174ca8571c01f2decac14e6247398bf5dad82e879a92c4d08fab8883925066"
)
_FIXED_RECORDED_AT = "2026-08-19T00:00:00Z"


class RunnerValidationError(ValueError):
    """A requested bounded conformance envelope is invalid."""


@dataclass(frozen=True)
class ConformanceEnvelope:
    package_root: Path
    protocol: ValidatedProtocol
    scenario_id: str
    replicates: int


def _file_set_hash(package_root: Path, paths: tuple[Path, ...]) -> str:
    rows: list[dict[str, str]] = []
    for path in sorted(paths, key=lambda item: item.relative_to(package_root).as_posix()):
        resolved = path.resolve(strict=True)
        if path.is_symlink() or not resolved.is_relative_to(package_root.resolve(strict=True)):
            raise RunnerValidationError("implementation manifest contains a prohibited path")
        rows.append(
            {
                "path": path.relative_to(package_root).as_posix(),
                "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
            }
        )
    return content_hash({"files": rows})


def implementation_hash(package_root: Path) -> str:
    """Hash the exact runtime sources used by both engine and verifier."""

    sources = tuple((package_root / "src" / "vt_simulator").glob("*.py"))
    standalone = package_root / "verify_snapshot.py"
    return _file_set_hash(package_root, (*sources, standalone))


def runtime_manifest_hash(package_root: Path) -> str:
    """Hash the closed interpreter/dependency declaration inputs."""

    return _file_set_hash(
        package_root,
        (package_root / "pyproject.toml", package_root / "requirements-build.txt"),
    )


def source_manifest_hash(protocol: ValidatedProtocol) -> str:
    """Hash the exact sorted paper-source lock mapping."""

    return content_hash(
        {
            "source_locks": [
                {"path": path, "sha256": digest}
                for path, digest in sorted(protocol.source_locks.items())
            ]
        }
    )


class _RecordBuilder:
    def __init__(
        self,
        *,
        protocol: ValidatedProtocol,
        package_root: Path,
        stream_id: str,
    ) -> None:
        self._ordinal = 0
        self._stream_id = stream_id
        self._common = {
            "protocol_hash": protocol.manifest_hash,
            "implementation_hash": implementation_hash(package_root),
            "runtime_manifest_hash": runtime_manifest_hash(package_root),
            "source_manifest_hash": source_manifest_hash(protocol),
        }

    def record(
        self,
        record_type: str,
        schema_version: str,
        *,
        input_refs: tuple[str, ...] = (),
        **fields: object,
    ) -> ScientificRecord:
        refs = tuple(sorted(set(input_refs)))
        raw: dict[str, object] = {
            "schema_version": schema_version,
            "record_type": record_type,
            **self._common,
            "stream_id": self._stream_id,
            "record_ordinal": self._ordinal,
            "input_refs": list(refs),
            **fields,
            "record_hash_algorithm": "sha256",
            "record_hash": "0" * 64,
        }
        raw["record_hash"] = content_hash(raw, omit=frozenset({"record_hash"}))
        self._ordinal += 1
        return validate_record(raw)


def _baseline_scenario(protocol: ValidatedProtocol) -> ScenarioBundle:
    preimage = build_scenario_preimage(protocol, {})
    digest = content_hash(preimage)
    memberships = tuple(
        sorted(
            {
                row.arm_id
                for row in expand_prededup_rows(protocol)
                if row.scenario_parameter_hash == digest
            }
        )
    )
    if not memberships:
        raise RunnerValidationError("baseline scenario has no declared arm membership")
    return ScenarioBundle(
        scenario_parameter_hash=digest,
        scenario_id=f"SIM-{digest[:20]}",
        preimage=preimage,
        arm_memberships=memberships,
    )


def _validate_envelope(envelope: ConformanceEnvelope) -> None:
    if envelope.scenario_id != BASELINE_SCENARIO_ID:
        raise RunnerValidationError("scenario ID is not the exact bounded baseline")
    if (
        isinstance(envelope.replicates, bool)
        or not isinstance(envelope.replicates, int)
        or not 1 <= envelope.replicates <= 1000
    ):
        raise RunnerValidationError("replicate count must be an integer in 1..1000")
    if envelope.protocol.baseline_scenario_parameter_hash != _BASELINE_SCENARIO_HASH:
        raise RunnerValidationError("protocol baseline identity is inconsistent")


def _response_status(disposition: str) -> str:
    if disposition == "submitted":
        return "submitted"
    if disposition == "invalidated":
        return "invalid"
    if disposition == "abstained":
        return "abstained"
    return "not_observed"


def run_conformance(envelope: ConformanceEnvelope) -> Iterator[ScientificRecord]:
    """Generate one exact bounded record stream entirely in memory."""

    _validate_envelope(envelope)
    scenario = _baseline_scenario(envelope.protocol)
    schedule = build_schedule(scenario)
    assignments_by_id = {row.assignment_id: row for row in schedule.assignments}
    stream_id = f"VT-CONFORMANCE-{scenario.scenario_id[4:]}-R{envelope.replicates:04d}"
    builder = _RecordBuilder(
        protocol=envelope.protocol,
        package_root=envelope.package_root,
        stream_id=stream_id,
    )
    design = builder.record(
        "SimulationDesignRecord",
        "vt-sim-design-record/0.1",
        design_id="VT-MSP-DESIGN/design-0.1",
        scenario_grid_id="VT-MSP-GRID/design-0.1",
        generating_profile_id="VT-MSP-DGM/design-0.1",
        math_profile_id="VT-MSP-MATH/design-0.1",
        analysis_profile_id="VT-MSP-ANALYSIS/design-0.1",
        schedule_profile_id="VT-MSP-SCHEDULE/design-0.1",
        record_profile_id="VT-MSP-WIRE/design-0.1",
        execution_status="candidate_conformance_only",
        authority="none",
    )
    yield design
    scenario_record = builder.record(
        "ScenarioRecord",
        "vt-sim-scenario-record/0.1",
        input_refs=(design.record_hash,),
        scenario_parameter_hash=scenario.scenario_parameter_hash,
        scenario_id=scenario.scenario_id,
        scenario_parameter_preimage=scenario.preimage,
        arm_memberships=scenario.arm_memberships,
        input_guard_status="accepted",
        input_guard_reason_codes=[],
    )
    yield scenario_record
    run_record = builder.record(
        "SimulationRunRecord",
        "vt-sim-run-record/0.1",
        input_refs=(scenario_record.record_hash,),
        run_id=f"RUN-{scenario.scenario_id[4:]}-R{envelope.replicates:04d}",
        run_validity_status="valid",
        run_validity_reason_codes=[],
        run_completion_status="complete",
        run_completion_reason_codes=[],
        mandatory_cell_count=1,
        complete_cell_count=1,
        precision_unmet_cell_count=0,
        prohibited_capability_attestation=True,
    )
    yield run_record

    replicate_hashes: list[str] = []
    canonical_a_count = 0
    submitted_mapping_count = 0
    for replicate_index in range(1, envelope.replicates + 1):
        generated = generate_bounded_replicate(
            envelope.protocol, scenario, replicate_index=replicate_index
        )
        replicate_inputs: list[str] = [run_record.record_hash]
        dispositions = Counter(row.disposition for row in generated.assignment_results)
        for result in generated.assignment_results:
            scheduled = assignments_by_id[result.assignment_id]
            assignment = builder.record(
                "AssignmentDispositionRecord",
                "vt-sim-assignment-record/0.1",
                input_refs=(run_record.record_hash, scenario_record.record_hash),
                assignment_id=f"{result.assignment_id}-R{replicate_index:04d}",
                scenario_parameter_hash=scenario.scenario_parameter_hash,
                replicate_index=str(replicate_index),
                disposition=result.disposition,
                disposition_reason=result.disposition_reason,
                eligible=result.disposition != "nonstarted",
            )
            yield assignment
            replicate_inputs.append(assignment.record_hash)

            submitted = result.disposition == "submitted"
            rating = builder.record(
                "SyntheticRatingRecord",
                "vt-sim-rating-record/0.1",
                input_refs=(assignment.record_hash,),
                rating_id=f"RATING-{result.assignment_id}-R{replicate_index:04d}",
                assignment_ref=assignment.record_hash,
                response_status=_response_status(result.disposition),
                display_pairwise_outcome=result.raw_display_outcome if submitted else None,
                display_left_band=result.display_left_band if submitted else None,
                display_right_band=result.display_right_band if submitted else None,
                procedural_reason=None if submitted else result.disposition_reason,
                locked=submitted,
            )
            yield rating
            replicate_inputs.append(rating.record_hash)

            if submitted:
                mapping = builder.record(
                    "SyntheticMappingRecord",
                    "vt-sim-mapping-record/0.1",
                    input_refs=(assignment.record_hash, rating.record_hash),
                    mapping_id=f"MAPPING-{result.assignment_id}-R{replicate_index:04d}",
                    rating_ref=rating.record_hash,
                    assignment_ref=assignment.record_hash,
                    raw_display_outcome=result.raw_display_outcome,
                    derived_canonical_outcome=result.derived_canonical_outcome,
                    display_left_candidate_id=scheduled.displayed_left_candidate_id,
                    display_right_candidate_id=scheduled.displayed_right_candidate_id,
                    mapping_profile_id="VT-MSP-MAPPING/design-0.1",
                )
                yield mapping
                canonical_a_count += mapping.derived_canonical_outcome == "A"
                submitted_mapping_count += 1
                replicate_inputs.append(mapping.record_hash)

        replicate = builder.record(
            "ReplicateRecord",
            "vt-sim-replicate-record/0.1",
            input_refs=tuple(replicate_inputs),
            replicate_id=(
                f"REPL-{replicate_index:06d}-{generated.record_hash}"
            ),
            run_ref=run_record.record_hash,
            scenario_parameter_hash=scenario.scenario_parameter_hash,
            replicate_index=str(replicate_index),
            counts={
                "eligible": 120 - dispositions["nonstarted"],
                "submitted": dispositions["submitted"],
                "invalid": dispositions["invalidated"],
            },
            estimator_attempts=[
                {
                    "method_id": "A-CAT-PROP/design-0.1",
                    "status": "estimated" if dispositions["submitted"] else "precheck_undefined",
                    "reason": None if dispositions["submitted"] else "zero_denominator",
                }
            ],
            leakage_flags=[],
        )
        yield replicate
        replicate_hashes.append(replicate.record_hash)

    numerator = canonical_a_count
    denominator = submitted_mapping_count
    if denominator == 0:
        raise RunnerValidationError("baseline conformance unexpectedly has zero submissions")
    ledger_refs = tuple(sorted(replicate_hashes))
    metric = builder.record(
        "MetricRecord",
        "vt-sim-metric-record/0.1",
        input_refs=ledger_refs,
        metric_id=f"METRIC-EST-01-A-R{envelope.replicates:04d}",
        estimand_id="EST-01",
        estimand_revision="design-0.1",
        target_population_kind="fixed_messages_fixed_panel",
        method_id="A-CAT-PROP/design-0.1",
        scale="canonical_A_proportion",
        numerator=numerator,
        denominator=denominator,
        denominator_ledger_refs=ledger_refs,
        estimate_status="estimated",
        estimate_reason_codes=[],
        estimate_value=numerator / denominator,
        synthetic_truth_status="not_applicable",
        synthetic_truth_reason_codes=["descriptive_only"],
        synthetic_truth_value=None,
        synthetic_truth_mcse=None,
        run_validity_status="valid",
        run_validity_reason_codes=[],
        terminal_status="requires_pilot_data",
    )
    yield metric
    interval = builder.record(
        "IntervalRecord",
        "vt-sim-interval-record/0.1",
        input_refs=(metric.record_hash,),
        interval_id=f"INTERVAL-EST-01-A-R{envelope.replicates:04d}",
        metric_ref=metric.record_hash,
        interval_status="unsupported_scope",
        interval_reason_codes=["unsupported_target_scope"],
        confidence_level=None,
        lower=None,
        upper=None,
        scale="canonical_A_proportion",
        method_id="not_applicable",
        target_generalization="fixed_messages_fixed_panel",
        resample_repetitions=None,
    )
    yield interval
    decision = builder.record(
        "CellDecisionRecord",
        "vt-sim-decision-record/0.1",
        input_refs=(run_record.record_hash, metric.record_hash, interval.record_hash),
        decision_id=f"DECISION-CONFORMANCE-R{envelope.replicates:04d}",
        scenario_parameter_hash=scenario.scenario_parameter_hash,
        completed_valid_replicates=envelope.replicates,
        stop_reason="candidate_conformance_cap",
        cell_completion_status="complete",
        prohibited_output_count=0,
        operating_decision="requires_simulation",
        operating_reason_codes=[
            "candidate_conformance_only",
            "fixed_target_interval_method_gap",
        ],
        authority="none",
    )
    yield decision
    provenance = builder.record(
        "ProvenanceRecord",
        "vt-sim-provenance-record/0.1",
        input_refs=(decision.record_hash,),
        provenance_id=f"PROVENANCE-CONFORMANCE-R{envelope.replicates:04d}",
        parent_record_hash=decision.record_hash,
        derivation_method_id="vt-sim/bounded-conformance-0.1",
        seed_coordinates=[
            envelope.protocol.master_seed_hex,
            scenario.scenario_parameter_hash,
            f"replicates={envelope.replicates}",
        ],
        recorded_at=_FIXED_RECORDED_AT,
        actor_role="offline_candidate_runner",
        data_class="synthetic_only",
        capability_envelope="offline_synthetic_only",
    )
    yield provenance
