"""Bounded end-to-end assembly for one deterministic baseline replicate.

This module intentionally stops before estimator fitting, interval construction,
operating decisions, persistence, or any CLI run authority.  It joins only the
already implemented deterministic schedule, owned streams, sequential process,
raw response mapping, and ordinal-band generation.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass
from math import floor

from .canonical import content_hash
from .grid import ScenarioBundle, build_scenario_preimage
from .manifest import ValidatedProtocol
from .process import (
    CandidateOrdinalBands,
    HazardLedger,
    ProcessCovariates,
    ProcessUniforms,
    SequentialProcessSpec,
    build_population_block,
    five_category_probabilities,
    generate_ordinal_bands,
    generate_raw_response,
    map_ordinal_bands,
    map_raw_response,
    run_sequential_process,
    sample_latent_category,
    select_population_effects,
)
from .schedule import ScheduledAssignment, build_schedule
from .streams import (
    ConsumptionRecord,
    StreamCoordinates,
    StreamRegistry,
    derive_stream,
)


class ReplicateValidationError(ValueError):
    """The requested replicate is outside the exact bounded SIM-I0 slice."""


@dataclass(frozen=True)
class EvidenceIndicators:
    assignment_id: str
    applicable: bool
    span_resolves: bool | None
    missing_context_complete: bool | None
    hard_issue_suspected: bool | None
    identity_defect: bool | None
    context_defect: bool | None
    rendering_defect: bool | None
    accessibility_defect: bool | None
    allocation_defect: bool | None


@dataclass(frozen=True)
class SyntheticAssignmentResult:
    assignment_id: str
    assignment_hash: str
    disposition: str
    disposition_reason: str | None
    raw_display_outcome: str | None
    derived_canonical_outcome: str | None
    display_left_band: int | None
    display_right_band: int | None
    candidate_a_band: int | None
    candidate_b_band: int | None


@dataclass(frozen=True)
class SyntheticReplicate:
    protocol_id: str
    scenario_parameter_hash: str
    replicate_index: int
    schedule_hash: str
    allocation_status: str
    assignment_results: tuple[SyntheticAssignmentResult, ...]
    evidence_indicators: tuple[EvidenceIndicators, ...]
    stream_receipts: tuple[ConsumptionRecord, ...]
    process_hazards: tuple[HazardLedger, ...]
    record_hash: str

    def hash_preimage(self) -> dict[str, object]:
        value = asdict(self)
        del value["record_hash"]
        return value


_EVIDENCE_FIELDS = (
    "span_resolves",
    "missing_context_complete",
    "hard_issue_suspected",
    "identity_defect",
    "context_defect",
    "rendering_defect",
    "accessibility_defect",
    "allocation_defect",
)
_FAMILY_SCALES = {
    "D0-INDEPENDENT": 0.0,
    "D1-MODERATE": 0.35,
    "D2-HIGH": 0.80,
}
_CARD_FITS = (-0.75, -0.50, -0.25, 0.00, 0.25, 0.50, 0.75)


def _factor_selections(scenario: ScenarioBundle) -> dict[str, object]:
    selections = scenario.preimage.get("factor_selections")
    if not isinstance(selections, dict):
        raise ReplicateValidationError("scenario factor selections are invalid")
    return selections


def _decimal_level(selections: dict[str, object], key: str) -> float:
    value = selections.get(key)
    if not isinstance(value, dict) or set(value) != {"id", "value"}:
        raise ReplicateValidationError(f"{key} must be an exact rate/effect level")
    raw = value.get("value")
    if not isinstance(raw, str):
        raise ReplicateValidationError(f"{key}.value must be a decimal string")
    return float(raw)


def _validate_slice(
    protocol: ValidatedProtocol,
    scenario: ScenarioBundle,
    replicate_index: int,
) -> dict[str, object]:
    if (
        isinstance(replicate_index, bool)
        or not isinstance(replicate_index, int)
        or not 1 <= replicate_index <= 1000
    ):
        raise ReplicateValidationError("bounded replicate_index must be an integer in 1..1000")
    expected_preimage = build_scenario_preimage(protocol, {})
    expected_hash = content_hash(expected_preimage)
    if expected_hash != protocol.baseline_scenario_parameter_hash:
        raise ReplicateValidationError("validated protocol baseline hash is inconsistent")
    if scenario.preimage != expected_preimage:
        raise ReplicateValidationError("only the exact baseline scenario is implemented")
    if scenario.scenario_parameter_hash != expected_hash:
        raise ReplicateValidationError("scenario hash does not match the baseline preimage")
    if scenario.scenario_id != f"SIM-{expected_hash[:20]}":
        raise ReplicateValidationError("scenario ID does not match the baseline hash")
    return _factor_selections(scenario)


def _draw_stream(
    protocol: ValidatedProtocol,
    scenario: ScenarioBundle,
    replicate_index: int,
    stream_name: str,
    target_id: str,
    purposes: tuple[str, ...],
    registry: StreamRegistry,
) -> tuple[dict[str, float], ConsumptionRecord]:
    stream = derive_stream(
        StreamCoordinates(
            protocol_id=protocol.protocol_id,
            master_seed_hex=protocol.master_seed_hex,
            scenario_parameter_hash=scenario.scenario_parameter_hash,
            population_block_hash=protocol.population_block_hash,
            replicate_index=str(replicate_index),
            stream_name=stream_name,
            target_id=target_id,
            expected_purposes=purposes,
        ),
        registry=registry,
    )
    values = {purpose: stream.uniform(purpose) for purpose in purposes}
    return values, stream.close()


def _assignment_index(assignment: ScheduledAssignment) -> tuple[int, int]:
    try:
        return int(assignment.family_id.removeprefix("SMSG-")), int(
            assignment.rater_id.removeprefix("SRATER-")
        )
    except ValueError as error:
        raise ReplicateValidationError("schedule contains a malformed synthetic ID") from error


def _covariates(
    assignments: tuple[ScheduledAssignment, ...],
    selections: dict[str, object],
    effects,
) -> tuple[ProcessCovariates, ...]:
    dependence = selections.get("dependence_profile")
    heterogeneity = selections.get("heterogeneity_profile")
    session_profile = selections.get("session_profile")
    if dependence not in _FAMILY_SCALES:
        raise ReplicateValidationError("dependence profile is invalid")
    side_effect = _decimal_level(selections, "side_effect")
    order_effect = _decimal_level(selections, "order_effect")
    rows: list[ProcessCovariates] = []
    for assignment in assignments:
        family, rater = _assignment_index(assignment)
        preference = effects.crossed("preference", family, rater)
        rateability = effects.crossed("rateability", family, rater)
        family_rateability = _FAMILY_SCALES[dependence] * effects.family_block.normal(
            f"family:rateability:{assignment.family_id}"
        )
        order_term = (
            0.0
            if assignment.order_code is None
            else order_effect * assignment.order_code
        )
        last_quartile = assignment.session_position_index > floor(
            0.75 * assignment.session_count
        )
        rows.append(
            ProcessCovariates(
                assignment_id=assignment.assignment_id,
                interpretation_class_mismatch=(
                    heterogeneity == "H3-INTERPRETATION-MIX"
                    and effects.rater_block.interpretation_class(rater) == 2
                ),
                last_quartile=last_quartile,
                fatigue_active=(
                    last_quartile and session_profile in {"X1-FATIGUE", "X3-COMBINED"}
                ),
                high_rateability_difficulty=rateability > 0.50,
                high_context_difficulty=family_rateability > 0.50,
                canonical_preference_contrast=(
                    preference
                    + side_effect * 2.0 * assignment.side_code_a
                    + order_term
                ),
            )
        )
    return tuple(rows)


def _evidence_row(
    assignment_id: str,
    draws: dict[str, float],
    applicable: bool,
) -> EvidenceIndicators:
    if not applicable:
        return EvidenceIndicators(assignment_id, False, None, None, None, None, None, None, None, None)
    return EvidenceIndicators(
        assignment_id=assignment_id,
        applicable=True,
        span_resolves=draws[f"{assignment_id}:span_resolves"] < 0.90,
        missing_context_complete=(
            draws[f"{assignment_id}:missing_context_complete"] < 0.90
        ),
        hard_issue_suspected=(draws[f"{assignment_id}:hard_issue_suspected"] < 0.02),
        identity_defect=draws[f"{assignment_id}:identity_defect"] < 0.02,
        context_defect=draws[f"{assignment_id}:context_defect"] < 0.02,
        rendering_defect=draws[f"{assignment_id}:rendering_defect"] < 0.02,
        accessibility_defect=(
            draws[f"{assignment_id}:accessibility_defect"] < 0.02
        ),
        allocation_defect=draws[f"{assignment_id}:allocation_defect"] < 0.02,
    )


def generate_bounded_replicate(
    protocol: ValidatedProtocol,
    scenario: ScenarioBundle,
    *,
    replicate_index: int,
) -> SyntheticReplicate:
    """Generate one exact ordinary baseline replicate without analysis or writes."""

    selections = _validate_slice(protocol, scenario, replicate_index)
    schedule = build_schedule(scenario)
    assignments = schedule.assignments
    assignment_ids = tuple(item.assignment_id for item in assignments)
    target_id = str(scenario.preimage["target_id"])

    frozen = build_population_block(protocol, replicate_index=0)
    redrawn = build_population_block(protocol, replicate_index=replicate_index)
    effects = select_population_effects(scenario, frozen, redrawn)

    registry = StreamRegistry()
    receipts: list[ConsumptionRecord] = [frozen.consumption, redrawn.consumption]

    single_streams: dict[str, dict[str, float]] = {}
    for stream_name in (
        "nonstart",
        "nonlock",
        "procedural-abstention",
        "procedural-reason",
    ):
        values, receipt = _draw_stream(
            protocol,
            scenario,
            replicate_index,
            stream_name,
            target_id,
            assignment_ids,
            registry,
        )
        single_streams[stream_name] = values
        receipts.append(receipt)

    invalidation_purposes = tuple(
        f"{assignment_id}:{field}"
        for assignment_id in assignment_ids
        for field in ("flag", "reason")
    )
    invalidation, receipt = _draw_stream(
        protocol,
        scenario,
        replicate_index,
        "invalidation",
        target_id,
        invalidation_purposes,
        registry,
    )
    receipts.append(receipt)

    submitted, receipt = _draw_stream(
        protocol,
        scenario,
        replicate_index,
        "submitted-outcome",
        target_id,
        assignment_ids,
        registry,
    )
    single_streams["submitted-outcome"] = submitted
    receipts.append(receipt)

    ordinal_purposes = tuple(
        f"{assignment_id}:{side}"
        for assignment_id in assignment_ids
        for side in ("left", "right")
    )
    ordinal, receipt = _draw_stream(
        protocol,
        scenario,
        replicate_index,
        "ordinal-band",
        target_id,
        ordinal_purposes,
        registry,
    )
    receipts.append(receipt)

    evidence_purposes = tuple(
        f"{assignment_id}:{field}"
        for assignment_id in assignment_ids
        for field in _EVIDENCE_FIELDS
    )
    evidence, receipt = _draw_stream(
        protocol,
        scenario,
        replicate_index,
        "evidence-span",
        target_id,
        evidence_purposes,
        registry,
    )
    receipts.append(receipt)

    covariates = _covariates(assignments, selections, effects)
    covariates_by_id = {row.assignment_id: row for row in covariates}
    uniforms = tuple(
        ProcessUniforms(
            assignment_id=assignment_id,
            nonstart=single_streams["nonstart"][assignment_id],
            nonlock=single_streams["nonlock"][assignment_id],
            procedural=single_streams["procedural-abstention"][assignment_id],
            procedural_reason=single_streams["procedural-reason"][assignment_id],
            invalidation_flag=invalidation[f"{assignment_id}:flag"],
            invalidation_reason=invalidation[f"{assignment_id}:reason"],
        )
        for assignment_id in assignment_ids
    )
    process = run_sequential_process(
        schedule,
        SequentialProcessSpec(
            missingness_mechanism=str(selections["missingness_mechanism"]),
            nonstart_rate=_decimal_level(selections, "nonstart_rate"),
            nonlock_rate=_decimal_level(selections, "nonlock_rate"),
            procedural_rate=_decimal_level(selections, "procedural_rate"),
            invalidation_rate=_decimal_level(selections, "invalidation_rate"),
            side_design=str(selections["side_design"]),
            locale_stratum=str(selections["locale_stratum"]),
        ),
        covariates,
        uniforms,
    )
    dispositions = {row.assignment_id: row for row in process.dispositions}

    prevalence = str(selections["prevalence_profile"])
    ordinal_profile = str(selections["ordinal_profile"])
    results: list[SyntheticAssignmentResult] = []
    evidence_rows: list[EvidenceIndicators] = []
    for assignment in assignments:
        assignment_id = assignment.assignment_id
        disposition = dispositions[assignment_id]
        applicable = disposition.disposition in {"submitted", "invalidated"}
        evidence_rows.append(_evidence_row(assignment_id, evidence, applicable))
        if not applicable:
            results.append(
                SyntheticAssignmentResult(
                    assignment_id,
                    assignment.presentation_assignment_hash,
                    disposition.disposition,
                    disposition.reason,
                    None,
                    None,
                    None,
                    None,
                    None,
                    None,
                )
            )
            continue

        family, rater = _assignment_index(assignment)
        row_covariates = covariates_by_id[assignment_id]
        probabilities = five_category_probabilities(
            prevalence,
            canonical_preference_contrast=row_covariates.canonical_preference_contrast,
            rateability_effect=effects.crossed("rateability", family, rater),
            unacceptability_effect=effects.crossed("unacceptability", family, rater),
            tie_effect=effects.crossed("tie", family, rater),
        )
        latent = sample_latent_category(
            probabilities, single_streams["submitted-outcome"][assignment_id]
        )
        raw = generate_raw_response(assignment, latent)
        mapping = map_raw_response(assignment, raw)

        card_index = int(assignment.card_id.removeprefix("SCARD-"))
        shared_fit = effects.crossed("rateability", family, rater)
        candidate_a_fit = _CARD_FITS[card_index - 1] + shared_fit
        candidate_b_fit = -_CARD_FITS[card_index - 1] + shared_fit
        left_fit = candidate_a_fit if assignment.a_displayed_left else candidate_b_fit
        right_fit = candidate_b_fit if assignment.a_displayed_left else candidate_a_fit
        raw_bands = generate_ordinal_bands(
            raw.raw_display_outcome,
            ordinal_profile,
            left_fit,
            right_fit,
            ordinal[f"{assignment_id}:left"],
            ordinal[f"{assignment_id}:right"],
        )
        candidate_bands: CandidateOrdinalBands = map_ordinal_bands(
            assignment, raw_bands
        )
        results.append(
            SyntheticAssignmentResult(
                assignment_id=assignment_id,
                assignment_hash=assignment.presentation_assignment_hash,
                disposition=disposition.disposition,
                disposition_reason=disposition.reason,
                raw_display_outcome=raw.raw_display_outcome,
                derived_canonical_outcome=mapping.derived_canonical_outcome,
                display_left_band=raw_bands.display_left_band,
                display_right_band=raw_bands.display_right_band,
                candidate_a_band=candidate_bands.candidate_a_band,
                candidate_b_band=candidate_bands.candidate_b_band,
            )
        )

    values: dict[str, object] = {
        "protocol_id": protocol.protocol_id,
        "scenario_parameter_hash": scenario.scenario_parameter_hash,
        "replicate_index": replicate_index,
        "schedule_hash": schedule.assignment_manifest_hash,
        "allocation_status": "deterministic_schedule_no_draw",
        "assignment_results": tuple(results),
        "evidence_indicators": tuple(evidence_rows),
        "stream_receipts": tuple(receipts),
        "process_hazards": process.hazards,
    }
    hash_value = content_hash(
        {
            key: [asdict(item) for item in value]
            if isinstance(value, tuple) and value and hasattr(value[0], "__dataclass_fields__")
            else value
            for key, value in values.items()
        }
    )
    return SyntheticReplicate(**values, record_hash=hash_value)  # type: ignore[arg-type]
