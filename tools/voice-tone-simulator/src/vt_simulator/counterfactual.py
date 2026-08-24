"""Paired counterfactual schedule and generation primitives.

This module implements only the paper protocol's bounded ARM-K synthetic branch.
It does not fit estimators, construct intervals, issue decisions, persist results,
or authorize the full scenario grid.
"""

from __future__ import annotations

from copy import deepcopy
from dataclasses import asdict, dataclass, replace
from math import exp

from .canonical import content_hash
from .grid import ScenarioBundle, build_scenario_preimage
from .manifest import ValidatedProtocol
from .process import (
    CandidateOrdinalBands,
    HazardLedger,
    ProcessCovariates,
    ProcessDisposition,
    SelectedPopulationEffects,
    build_population_block,
    five_category_probabilities,
    generate_ordinal_bands,
    generate_raw_response,
    invalidation_reason_from_uniform,
    map_ordinal_bands,
    map_raw_response,
    procedural_reason_from_uniform,
    sample_latent_category,
    select_population_effects,
    solve_intercept,
)
from .replicate import (
    EvidenceIndicators,
    _CARD_FITS,
    _EVIDENCE_FIELDS,
    _assignment_index,
    _covariates,
    _decimal_level,
    _draw_stream,
    _evidence_row,
)
from .schedule import ScheduledAssignment, build_schedule
from .streams import ConsumptionRecord, StreamRegistry


class CounterfactualValidationError(ValueError):
    """A scenario or profile violates the exact ARM-K contract."""


@dataclass(frozen=True)
class CounterfactualTransform:
    canonical_preference_contrast: float
    display_left_latent_fit: float
    display_right_latent_fit: float
    threshold_location: float


@dataclass(frozen=True)
class CounterfactualOperation:
    operation_id: str
    declared_changed_fields: tuple[str, ...]
    held_constant_fields: tuple[str, ...]
    undeclared_changed_fields: tuple[str, ...]
    semantic_functional_valid: bool
    admissibility_status: str
    admissibility_reason: str | None


@dataclass(frozen=True)
class CounterfactualMember:
    member_id: str
    member_role: str
    pair_id: str
    ordinary_assignment: ScheduledAssignment
    member_hash: str


@dataclass(frozen=True)
class CounterfactualPair:
    pair_id: str
    ordinary_assignment_id: str
    members: tuple[CounterfactualMember, CounterfactualMember]
    presentation_order: tuple[str, str]
    pair_hash: str


@dataclass(frozen=True)
class CounterfactualSchedule:
    scenario_parameter_hash: str
    counterfactual_profile: str
    operation: CounterfactualOperation
    pairs: tuple[CounterfactualPair, ...]
    members: tuple[CounterfactualMember, ...]
    base_assignment_manifest_hash: str
    schedule_hash: str

    def hash_preimage(self) -> dict[str, object]:
        value = asdict(self)
        del value["schedule_hash"]
        return value


@dataclass(frozen=True)
class CounterfactualMemberResult:
    member_id: str
    member_role: str
    pair_id: str
    ordinary_assignment_id: str
    assignment_hash: str
    disposition: str
    disposition_reason: str | None
    category_probabilities: tuple[float, float, float, float, float] | None
    canonical_preference_contrast: float | None
    display_left_latent_fit: float | None
    display_right_latent_fit: float | None
    threshold_location: float | None
    raw_display_outcome: str | None
    derived_canonical_outcome: str | None
    display_left_band: int | None
    display_right_band: int | None
    candidate_a_band: int | None
    candidate_b_band: int | None


@dataclass(frozen=True)
class CounterfactualPairResult:
    pair_id: str
    presentation_order: tuple[str, str]
    base: CounterfactualMemberResult
    counterfactual: CounterfactualMemberResult
    pair_disposition: str
    transition: tuple[str, str] | None
    candidate_band_differences: tuple[int, int] | None


@dataclass(frozen=True)
class CounterfactualDenominatorLedger:
    scheduled_pairs: int
    both_valid: int
    base_only: int
    counterfactual_only: int
    neither_valid: int
    invalid_operation_rejected: int
    transition_denominator: int
    paired_band_denominator: int


@dataclass(frozen=True)
class CounterfactualReplicate:
    protocol_id: str
    scenario_parameter_hash: str
    replicate_index: int
    counterfactual_profile: str
    schedule_hash: str
    operation: CounterfactualOperation
    pair_results: tuple[CounterfactualPairResult, ...]
    denominators: CounterfactualDenominatorLedger
    evidence_indicators: tuple[EvidenceIndicators, ...]
    stream_receipts: tuple[ConsumptionRecord, ...]
    process_hazards: tuple[HazardLedger, ...]
    estimate_status: str
    estimate_reason_code: str | None
    record_hash: str

    def hash_preimage(self) -> dict[str, object]:
        value = asdict(self)
        del value["record_hash"]
        return value


_PROFILES = (
    "CF0-INVARIANT",
    "CF1-THRESHOLD-SHIFT",
    "CF2-CONSTRUCT-SHIFT",
    "CF3-ITEM-DIF",
    "CF4-INVALID-OPERATION",
)
_PROCESS_COMBINATIONS = (
    ({"id": "M00", "value": "0.00"}, "MCAR"),
    ({"id": "M15", "value": "0.15"}, "MAR-ORDER-CONTEXT"),
    ({"id": "M30", "value": "0.30"}, "MNAR-PREFERENCE"),
)
_HETEROGENEITY = ("H0-HOMOGENEOUS", "H3-INTERPRETATION-MIX")
_LOCALES = ("SLOC-1", "SLOC-2")
_ARM_K_DIMENSIONS = {
    "counterfactual_profile",
    "procedural_rate",
    "missingness_mechanism",
    "heterogeneity_profile",
    "locale_stratum",
}


def _factor_selections(scenario: ScenarioBundle) -> dict[str, object]:
    selections = scenario.preimage.get("factor_selections")
    if not isinstance(selections, dict):
        raise CounterfactualValidationError("factor_selections must be an object")
    return selections


def _validate_arm_k(
    protocol: ValidatedProtocol,
    scenario: ScenarioBundle,
) -> dict[str, object]:
    if content_hash(scenario.preimage) != scenario.scenario_parameter_hash:
        raise CounterfactualValidationError(
            "scenario hash does not match its parameter preimage"
        )
    if scenario.scenario_id != f"SIM-{scenario.scenario_parameter_hash[:20]}":
        raise CounterfactualValidationError("scenario ID does not match its full hash")
    baseline_preimage = build_scenario_preimage(protocol, {})
    expected_shape = set(baseline_preimage)
    if set(scenario.preimage) != expected_shape:
        raise CounterfactualValidationError("scenario preimage does not have the frozen shape")
    for key, value in baseline_preimage.items():
        if key != "factor_selections" and scenario.preimage[key] != value:
            raise CounterfactualValidationError(
                f"{key} is outside the exact ARM-K dimensions"
            )

    selections = _factor_selections(scenario)
    baseline = baseline_preimage["factor_selections"]
    if not isinstance(baseline, dict):
        raise CounterfactualValidationError("validated protocol baseline is invalid")
    if set(selections) != set(baseline):
        raise CounterfactualValidationError("factor selection set does not match the protocol")
    for factor_id, baseline_value in baseline.items():
        if factor_id not in _ARM_K_DIMENSIONS and selections[factor_id] != baseline_value:
            raise CounterfactualValidationError(
                f"{factor_id} is outside the exact ARM-K dimensions"
            )

    profile = selections.get("counterfactual_profile")
    process_pair = (
        selections.get("procedural_rate"),
        selections.get("missingness_mechanism"),
    )
    if profile not in _PROFILES:
        raise CounterfactualValidationError("counterfactual profile is not declared")
    if process_pair not in _PROCESS_COMBINATIONS:
        raise CounterfactualValidationError(
            "procedural rate and missingness mechanism are not an ARM-K pair"
        )
    if selections.get("heterogeneity_profile") not in _HETEROGENEITY:
        raise CounterfactualValidationError("heterogeneity profile is outside ARM-K")
    if selections.get("locale_stratum") not in _LOCALES:
        raise CounterfactualValidationError("locale stratum is outside ARM-K")
    return selections


def apply_counterfactual_profile(
    profile: str,
    locale_stratum: str,
    *,
    canonical_preference_contrast: float,
    display_left_latent_fit: float,
    display_right_latent_fit: float,
    threshold_location: float,
) -> CounterfactualTransform:
    """Apply the exact synthetic CF0..CF3 latent transformation."""

    if profile not in _PROFILES:
        raise CounterfactualValidationError("counterfactual profile is not declared")
    if locale_stratum not in _LOCALES:
        raise CounterfactualValidationError("locale stratum is outside ARM-K")
    contrast = float(canonical_preference_contrast)
    left_fit = float(display_left_latent_fit)
    right_fit = float(display_right_latent_fit)
    location = float(threshold_location)
    if profile == "CF0-INVARIANT":
        pass
    elif profile == "CF1-THRESHOLD-SHIFT":
        location += 0.50
    elif profile == "CF2-CONSTRUCT-SHIFT":
        contrast = -contrast
        left_fit = -left_fit
        right_fit = -right_fit
    elif profile == "CF3-ITEM-DIF":
        if locale_stratum == "SLOC-2":
            contrast += 0.75
            left_fit += 0.50
            right_fit += 0.50
    else:
        raise CounterfactualValidationError(
            "CF4 invalid operation cannot produce a response transform"
        )
    return CounterfactualTransform(contrast, left_fit, right_fit, location)


def _operation(profile: str) -> CounterfactualOperation:
    invalid = profile == "CF4-INVALID-OPERATION"
    return CounterfactualOperation(
        operation_id="SCFOP-0001",
        declared_changed_fields=("synthetic_surface_token",),
        held_constant_fields=(
            "candidate_identity",
            "card_identity",
            "semantic_state",
            "risk_state",
            "functional_behavior",
        ),
        undeclared_changed_fields=("synthetic_functional_behavior",) if invalid else (),
        semantic_functional_valid=not invalid,
        admissibility_status="rejected" if invalid else "admissible",
        admissibility_reason="unsupported_estimand_scope" if invalid else None,
    )


def _ordinary_shadow(scenario: ScenarioBundle) -> ScenarioBundle:
    preimage = deepcopy(scenario.preimage)
    selections = preimage["factor_selections"]
    assert isinstance(selections, dict)
    selections["counterfactual_profile"] = "CF0-INVARIANT"
    digest = content_hash(preimage)
    return ScenarioBundle(
        scenario_parameter_hash=digest,
        scenario_id=f"SIM-{digest[:20]}",
        preimage=preimage,
        arm_memberships=("ARM-K-ORDINARY-SCHEDULE-SHADOW",),
    )


def build_counterfactual_schedule(
    protocol: ValidatedProtocol,
    scenario: ScenarioBundle,
) -> CounterfactualSchedule:
    """Expand each ARM-K ordinary assignment to one BASE/CF pair."""

    selections = _validate_arm_k(protocol, scenario)
    profile = str(selections["counterfactual_profile"])
    ordinary = build_schedule(_ordinary_shadow(scenario))
    pairs: list[CounterfactualPair] = []
    members: list[CounterfactualMember] = []
    for assignment in ordinary.assignments:
        pair_id = f"{assignment.assignment_id}-PAIR"
        pair_members: list[CounterfactualMember] = []
        for role in ("BASE", "CF"):
            fields: dict[str, object] = {
                "member_id": f"{assignment.assignment_id}-{role}",
                "member_role": role,
                "pair_id": pair_id,
                "ordinary_assignment": asdict(assignment),
            }
            pair_members.append(
                CounterfactualMember(
                    member_id=str(fields["member_id"]),
                    member_role=role,
                    pair_id=pair_id,
                    ordinary_assignment=assignment,
                    member_hash=content_hash(fields),
                )
            )
        base, counterfactual = pair_members
        card = int(assignment.card_id.removeprefix("SCARD-"))
        family = int(assignment.family_id.removeprefix("SMSG-"))
        rater = int(assignment.rater_id.removeprefix("SRATER-"))
        first = "BASE" if (card + family + rater) % 2 == 0 else "CF"
        presentation_order = (first, "CF" if first == "BASE" else "BASE")
        pair_fields: dict[str, object] = {
            "members": [asdict(base), asdict(counterfactual)],
            "ordinary_assignment_id": assignment.assignment_id,
            "pair_id": pair_id,
            "presentation_order": list(presentation_order),
        }
        pair = CounterfactualPair(
            pair_id=pair_id,
            ordinary_assignment_id=assignment.assignment_id,
            members=(base, counterfactual),
            presentation_order=presentation_order,
            pair_hash=content_hash(pair_fields),
        )
        pairs.append(pair)
        members.extend(pair_members)

    values: dict[str, object] = {
        "scenario_parameter_hash": scenario.scenario_parameter_hash,
        "counterfactual_profile": profile,
        "operation": _operation(profile),
        "pairs": tuple(pairs),
        "members": tuple(members),
        "base_assignment_manifest_hash": ordinary.assignment_manifest_hash,
    }
    hash_value = content_hash(
        {
            key: [asdict(item) for item in value]
            if isinstance(value, tuple)
            else asdict(value)
            if hasattr(value, "__dataclass_fields__")
            else value
            for key, value in values.items()
        }
    )
    return CounterfactualSchedule(**values, schedule_hash=hash_value)  # type: ignore[arg-type]


def _validate_replicate_index(value: int) -> None:
    if isinstance(value, bool) or not isinstance(value, int) or not 1 <= value <= 1000:
        raise CounterfactualValidationError(
            "bounded replicate_index must be an integer in 1..1000"
        )


def _member_assignment(member: CounterfactualMember) -> ScheduledAssignment:
    fields = asdict(member.ordinary_assignment)
    fields.pop("presentation_assignment_hash")
    fields["assignment_id"] = member.member_id
    return ScheduledAssignment(
        **fields,
        presentation_assignment_hash=content_hash(fields),
    )


def _logistic(value: float) -> float:
    if value >= 0.0:
        inverse = exp(-value)
        return 1.0 / (1.0 + inverse)
    direct = exp(value)
    return direct / (1.0 + direct)


def _hazard_predictor(
    stage: str,
    mechanism: str,
    covariates: ProcessCovariates,
) -> float:
    if mechanism == "MCAR":
        return 0.0
    if mechanism not in {"MAR-ORDER-CONTEXT", "MNAR-PREFERENCE"}:
        raise CounterfactualValidationError("unknown missingness mechanism")
    if stage == "nonstart":
        value = 0.50 * float(covariates.interpretation_class_mismatch)
    elif stage == "nonlock":
        value = (
            0.75 * float(covariates.last_quartile)
            + 0.50 * float(covariates.fatigue_active)
        )
    elif stage == "procedural_abstention":
        value = (
            0.75 * float(covariates.last_quartile)
            + 0.50 * float(covariates.high_rateability_difficulty)
        )
    else:
        raise CounterfactualValidationError(f"unknown hazard stage: {stage}")
    if mechanism == "MNAR-PREFERENCE":
        value += abs(covariates.canonical_preference_contrast)
    return value


def _hazard_events(
    *,
    stage: str,
    target_rate: float,
    risk_ids: tuple[str, ...],
    covariates: dict[str, ProcessCovariates],
    draws: dict[str, float],
    mechanism: str,
    scheduled_count: int,
) -> tuple[set[str], HazardLedger]:
    predictors = tuple(
        _hazard_predictor(stage, mechanism, covariates[identity])
        for identity in risk_ids
    )
    solver = solve_intercept(target_rate, predictors)
    if solver.status == "failed":
        raise CounterfactualValidationError("intercept_solver_failure")
    events: set[str] = set()
    if solver.status == "solved":
        assert solver.intercept is not None
        for identity, predictor in zip(risk_ids, predictors, strict=True):
            if draws[identity] < _logistic(solver.intercept + predictor):
                events.add(identity)
    return events, HazardLedger(
        stage=stage,
        target_rate=target_rate,
        risk_set_count=len(risk_ids),
        event_count=len(events),
        scheduled_population_incidence=(
            len(events) / scheduled_count if scheduled_count else 0.0
        ),
        solver_status=solver.status,
        intercept=solver.intercept,
        mean_probability=solver.mean_probability,
        iterations=solver.iterations,
    )


def _base_covariates(
    schedule: CounterfactualSchedule,
    selections: dict[str, object],
    effects: SelectedPopulationEffects,
) -> dict[str, ProcessCovariates]:
    ordinary = tuple(pair.members[0].ordinary_assignment for pair in schedule.pairs)
    return {
        row.assignment_id: row
        for row in _covariates(ordinary, selections, effects)
    }


def _class_loading(
    assignment: ScheduledAssignment,
    selections: dict[str, object],
    effects: SelectedPopulationEffects,
) -> tuple[float, bool]:
    rater = int(assignment.rater_id.removeprefix("SRATER-"))
    class_two = (
        selections.get("heterogeneity_profile") == "H3-INTERPRETATION-MIX"
        and effects.rater_block.interpretation_class(rater) == 2
    )
    return (-1.0 if class_two else 1.0), class_two


def _member_covariates(
    schedule: CounterfactualSchedule,
    selections: dict[str, object],
    effects: SelectedPopulationEffects,
) -> tuple[dict[str, ProcessCovariates], dict[str, ProcessCovariates]]:
    ordinary = _base_covariates(schedule, selections, effects)
    pair_rows: dict[str, ProcessCovariates] = {}
    member_rows: dict[str, ProcessCovariates] = {}
    profile = str(selections["counterfactual_profile"])
    locale = str(selections["locale_stratum"])
    for pair in schedule.pairs:
        base_member, cf_member = pair.members
        base_row = ordinary[pair.ordinary_assignment_id]
        loading, _ = _class_loading(base_member.ordinary_assignment, selections, effects)
        base_contrast = loading * base_row.canonical_preference_contrast
        pair_rows[pair.pair_id] = replace(
            base_row,
            assignment_id=pair.pair_id,
            canonical_preference_contrast=base_contrast,
        )
        member_rows[base_member.member_id] = replace(
            base_row,
            assignment_id=base_member.member_id,
            canonical_preference_contrast=base_contrast,
        )
        transformed_contrast = base_contrast
        if profile != "CF4-INVALID-OPERATION":
            transformed_contrast = apply_counterfactual_profile(
                profile,
                locale,
                canonical_preference_contrast=base_contrast,
                display_left_latent_fit=0.0,
                display_right_latent_fit=0.0,
                threshold_location=0.0,
            ).canonical_preference_contrast
        member_rows[cf_member.member_id] = replace(
            base_row,
            assignment_id=cf_member.member_id,
            canonical_preference_contrast=transformed_contrast,
        )
    return pair_rows, member_rows


def _run_paired_process(
    schedule: CounterfactualSchedule,
    selections: dict[str, object],
    effects: SelectedPopulationEffects,
    draws: dict[str, dict[str, float]],
) -> tuple[dict[str, ProcessDisposition], tuple[HazardLedger, ...]]:
    pair_covariates, member_covariates = _member_covariates(
        schedule, selections, effects
    )
    pair_ids = tuple(pair.pair_id for pair in schedule.pairs)
    member_ids = tuple(member.member_id for member in schedule.members)
    mechanism = str(selections["missingness_mechanism"])
    pair_nonstarted, nonstart_ledger = _hazard_events(
        stage="nonstart",
        target_rate=_decimal_level(selections, "nonstart_rate"),
        risk_ids=pair_ids,
        covariates=pair_covariates,
        draws=draws["nonstart"],
        mechanism=mechanism,
        scheduled_count=len(pair_ids),
    )
    started_members = tuple(
        member.member_id
        for pair in schedule.pairs
        if pair.pair_id not in pair_nonstarted
        for member in pair.members
    )
    nonlocked, nonlock_ledger = _hazard_events(
        stage="nonlock",
        target_rate=_decimal_level(selections, "nonlock_rate"),
        risk_ids=started_members,
        covariates=member_covariates,
        draws=draws["nonlock"],
        mechanism=mechanism,
        scheduled_count=len(member_ids),
    )
    locked = tuple(identity for identity in started_members if identity not in nonlocked)
    abstained, procedural_ledger = _hazard_events(
        stage="procedural_abstention",
        target_rate=_decimal_level(selections, "procedural_rate"),
        risk_ids=locked,
        covariates=member_covariates,
        draws=draws["procedural-abstention"],
        mechanism=mechanism,
        scheduled_count=len(member_ids),
    )
    submitted = tuple(identity for identity in locked if identity not in abstained)
    invalidation_rate = _decimal_level(selections, "invalidation_rate")
    invalidated = (
        {
            identity
            for identity in submitted
            if draws["invalidation"][f"{identity}:flag"] < invalidation_rate
        }
        if invalidation_rate > 0.0
        else set()
    )
    invalidation_ledger = HazardLedger(
        stage="invalidation",
        target_rate=invalidation_rate,
        risk_set_count=len(submitted),
        event_count=len(invalidated),
        scheduled_population_incidence=(
            len(invalidated) / len(member_ids) if member_ids else 0.0
        ),
        solver_status="fixed_probability" if invalidation_rate > 0.0 else "boundary_zero",
        intercept=None,
        mean_probability=invalidation_rate,
        iterations=0,
    )

    pair_for_member = {
        member.member_id: pair
        for pair in schedule.pairs
        for member in pair.members
    }
    dispositions: dict[str, ProcessDisposition] = {}
    for identity in member_ids:
        pair = pair_for_member[identity]
        if pair.pair_id in pair_nonstarted:
            dispositions[identity] = ProcessDisposition(
                identity, "nonstarted", "nonstart_event", True, False, False, False
            )
        elif identity in nonlocked:
            dispositions[identity] = ProcessDisposition(
                identity, "nonlocked", "nonlock_event", True, True, False, False
            )
        elif identity in abstained:
            dispositions[identity] = ProcessDisposition(
                identity,
                "abstained",
                procedural_reason_from_uniform(
                    draws["procedural-reason"][identity],
                    mechanism=mechanism,
                    side_design=str(selections["side_design"]),
                    locale_stratum=str(selections["locale_stratum"]),
                    covariates=member_covariates[identity],
                ),
                True,
                True,
                False,
                False,
            )
        elif identity in invalidated:
            dispositions[identity] = ProcessDisposition(
                identity,
                "invalidated",
                invalidation_reason_from_uniform(
                    draws["invalidation"][f"{identity}:reason"]
                ),
                True,
                True,
                True,
                True,
            )
        else:
            dispositions[identity] = ProcessDisposition(
                identity, "submitted", None, True, True, True, False
            )
    if set(dispositions) != set(member_ids):
        raise CounterfactualValidationError(
            "paired process dispositions do not partition the member schedule"
        )
    return dispositions, (
        nonstart_ledger,
        nonlock_ledger,
        procedural_ledger,
        invalidation_ledger,
    )


def _latent_parameters(
    assignment: ScheduledAssignment,
    selections: dict[str, object],
    effects: SelectedPopulationEffects,
    base_covariates: ProcessCovariates,
) -> tuple[
    float,
    float,
    float,
    float,
    float,
    float,
]:
    family, rater = _assignment_index(assignment)
    loading, class_two = _class_loading(assignment, selections, effects)
    contrast = loading * base_covariates.canonical_preference_contrast
    rateability = effects.crossed("rateability", family, rater)
    tie = effects.crossed("tie", family, rater)
    unacceptability = effects.crossed("unacceptability", family, rater)
    if class_two:
        rateability += 0.50
        tie += 0.75
    card_index = int(assignment.card_id.removeprefix("SCARD-"))
    severity = (
        0.50 * effects.rater_block.normal(f"severity:{assignment.rater_id}")
        if selections.get("heterogeneity_profile") == "H3-INTERPRETATION-MIX"
        else 0.0
    )
    shared_fit = effects.crossed("rateability", family, rater) + severity
    candidate_a_fit = loading * (_CARD_FITS[card_index - 1] + shared_fit)
    candidate_b_fit = loading * (-_CARD_FITS[card_index - 1] + shared_fit)
    left_fit = candidate_a_fit if assignment.a_displayed_left else candidate_b_fit
    right_fit = candidate_b_fit if assignment.a_displayed_left else candidate_a_fit
    return contrast, rateability, unacceptability, tie, left_fit, right_fit


def _empty_member_result(
    member: CounterfactualMember,
    disposition: str,
    reason: str | None,
) -> CounterfactualMemberResult:
    assignment = _member_assignment(member)
    return CounterfactualMemberResult(
        member_id=member.member_id,
        member_role=member.member_role,
        pair_id=member.pair_id,
        ordinary_assignment_id=member.ordinary_assignment.assignment_id,
        assignment_hash=assignment.presentation_assignment_hash,
        disposition=disposition,
        disposition_reason=reason,
        category_probabilities=None,
        canonical_preference_contrast=None,
        display_left_latent_fit=None,
        display_right_latent_fit=None,
        threshold_location=None,
        raw_display_outcome=None,
        derived_canonical_outcome=None,
        display_left_band=None,
        display_right_band=None,
        candidate_a_band=None,
        candidate_b_band=None,
    )


def _generated_member_result(
    member: CounterfactualMember,
    disposition: ProcessDisposition,
    selections: dict[str, object],
    effects: SelectedPopulationEffects,
    ordinary_covariates: ProcessCovariates,
    submitted_draws: dict[str, float],
    ordinal_draws: dict[str, float],
    counterfactual_draws: dict[str, float],
) -> CounterfactualMemberResult:
    if disposition.disposition not in {"submitted", "invalidated"}:
        return _empty_member_result(
            member, disposition.disposition, disposition.reason
        )
    assignment = _member_assignment(member)
    (
        contrast,
        rateability,
        unacceptability,
        tie,
        left_fit,
        right_fit,
    ) = _latent_parameters(
        member.ordinary_assignment,
        selections,
        effects,
        ordinary_covariates,
    )
    threshold_location = 0.0
    if member.member_role == "CF":
        transform = apply_counterfactual_profile(
            str(selections["counterfactual_profile"]),
            str(selections["locale_stratum"]),
            canonical_preference_contrast=contrast,
            display_left_latent_fit=left_fit,
            display_right_latent_fit=right_fit,
            threshold_location=threshold_location,
        )
        contrast = transform.canonical_preference_contrast
        left_fit = transform.display_left_latent_fit
        right_fit = transform.display_right_latent_fit
        threshold_location = transform.threshold_location
        outcome_draw = counterfactual_draws[f"{member.member_id}:outcome"]
        left_draw = counterfactual_draws[f"{member.member_id}:left"]
        right_draw = counterfactual_draws[f"{member.member_id}:right"]
    else:
        outcome_draw = submitted_draws[member.member_id]
        left_draw = ordinal_draws[f"{member.member_id}:left"]
        right_draw = ordinal_draws[f"{member.member_id}:right"]

    probabilities = five_category_probabilities(
        str(selections["prevalence_profile"]),
        canonical_preference_contrast=contrast,
        rateability_effect=rateability,
        unacceptability_effect=unacceptability,
        tie_effect=tie,
    )
    latent = sample_latent_category(probabilities, outcome_draw)
    raw = generate_raw_response(assignment, latent)
    mapping = map_raw_response(assignment, raw)
    raw_bands = generate_ordinal_bands(
        raw.raw_display_outcome,
        str(selections["ordinal_profile"]),
        left_fit,
        right_fit,
        left_draw,
        right_draw,
        threshold_location=threshold_location,
    )
    candidate_bands: CandidateOrdinalBands = map_ordinal_bands(assignment, raw_bands)
    return CounterfactualMemberResult(
        member_id=member.member_id,
        member_role=member.member_role,
        pair_id=member.pair_id,
        ordinary_assignment_id=member.ordinary_assignment.assignment_id,
        assignment_hash=assignment.presentation_assignment_hash,
        disposition=disposition.disposition,
        disposition_reason=disposition.reason,
        category_probabilities=probabilities,
        canonical_preference_contrast=contrast,
        display_left_latent_fit=left_fit,
        display_right_latent_fit=right_fit,
        threshold_location=threshold_location,
        raw_display_outcome=raw.raw_display_outcome,
        derived_canonical_outcome=mapping.derived_canonical_outcome,
        display_left_band=raw_bands.display_left_band,
        display_right_band=raw_bands.display_right_band,
        candidate_a_band=candidate_bands.candidate_a_band,
        candidate_b_band=candidate_bands.candidate_b_band,
    )


def _pair_result(
    pair: CounterfactualPair,
    base: CounterfactualMemberResult,
    counterfactual: CounterfactualMemberResult,
    invalid_operation: bool,
) -> CounterfactualPairResult:
    if invalid_operation:
        disposition = "invalid_operation_rejected"
        transition = None
        band_difference = None
    else:
        base_valid = base.disposition == "submitted"
        cf_valid = counterfactual.disposition == "submitted"
        if base_valid and cf_valid:
            disposition = "both_valid"
            assert base.derived_canonical_outcome is not None
            assert counterfactual.derived_canonical_outcome is not None
            transition = (
                base.derived_canonical_outcome,
                counterfactual.derived_canonical_outcome,
            )
            if (
                base.candidate_a_band is not None
                and base.candidate_b_band is not None
                and counterfactual.candidate_a_band is not None
                and counterfactual.candidate_b_band is not None
            ):
                band_difference = (
                    counterfactual.candidate_a_band - base.candidate_a_band,
                    counterfactual.candidate_b_band - base.candidate_b_band,
                )
            else:
                band_difference = None
        elif base_valid:
            disposition = "base_only"
            transition = None
            band_difference = None
        elif cf_valid:
            disposition = "counterfactual_only"
            transition = None
            band_difference = None
        else:
            disposition = "neither_valid"
            transition = None
            band_difference = None
    return CounterfactualPairResult(
        pair_id=pair.pair_id,
        presentation_order=pair.presentation_order,
        base=base,
        counterfactual=counterfactual,
        pair_disposition=disposition,
        transition=transition,
        candidate_band_differences=band_difference,
    )


def _denominators(
    pair_results: tuple[CounterfactualPairResult, ...],
) -> CounterfactualDenominatorLedger:
    counts = {
        key: sum(row.pair_disposition == key for row in pair_results)
        for key in (
            "both_valid",
            "base_only",
            "counterfactual_only",
            "neither_valid",
            "invalid_operation_rejected",
        )
    }
    return CounterfactualDenominatorLedger(
        scheduled_pairs=len(pair_results),
        both_valid=counts["both_valid"],
        base_only=counts["base_only"],
        counterfactual_only=counts["counterfactual_only"],
        neither_valid=counts["neither_valid"],
        invalid_operation_rejected=counts["invalid_operation_rejected"],
        transition_denominator=sum(row.transition is not None for row in pair_results),
        paired_band_denominator=sum(
            row.candidate_band_differences is not None for row in pair_results
        ),
    )


def generate_counterfactual_replicate(
    protocol: ValidatedProtocol,
    scenario: ScenarioBundle,
    *,
    replicate_index: int,
) -> CounterfactualReplicate:
    """Generate one exact bounded ARM-K BASE/CF replicate in memory."""

    _validate_replicate_index(replicate_index)
    selections = _validate_arm_k(protocol, scenario)
    schedule = build_counterfactual_schedule(protocol, scenario)
    profile = schedule.counterfactual_profile
    target_id = str(scenario.preimage["target_id"])
    pair_ids = tuple(pair.pair_id for pair in schedule.pairs)
    member_ids = tuple(member.member_id for member in schedule.members)
    base_ids = tuple(pair.members[0].member_id for pair in schedule.pairs)
    cf_ids = tuple(pair.members[1].member_id for pair in schedule.pairs)

    frozen = build_population_block(protocol, replicate_index=0)
    redrawn = build_population_block(protocol, replicate_index=replicate_index)
    effects = select_population_effects(scenario, frozen, redrawn)
    registry = StreamRegistry()
    receipts: list[ConsumptionRecord] = [frozen.consumption, redrawn.consumption]
    draws: dict[str, dict[str, float]] = {}

    stream_specs = (
        ("nonstart", pair_ids),
        ("nonlock", member_ids),
        ("procedural-abstention", member_ids),
        ("procedural-reason", member_ids),
    )
    for stream_name, purposes in stream_specs:
        values, receipt = _draw_stream(
            protocol,
            scenario,
            replicate_index,
            stream_name,
            target_id,
            purposes,
            registry,
        )
        draws[stream_name] = values
        receipts.append(receipt)

    invalidation_purposes = tuple(
        f"{identity}:{field}"
        for identity in member_ids
        for field in ("flag", "reason")
    )
    draws["invalidation"], receipt = _draw_stream(
        protocol,
        scenario,
        replicate_index,
        "invalidation",
        target_id,
        invalidation_purposes,
        registry,
    )
    receipts.append(receipt)

    draws["submitted-outcome"], receipt = _draw_stream(
        protocol,
        scenario,
        replicate_index,
        "submitted-outcome",
        target_id,
        base_ids,
        registry,
    )
    receipts.append(receipt)
    ordinal_purposes = tuple(
        f"{identity}:{side}" for identity in base_ids for side in ("left", "right")
    )
    draws["ordinal-band"], receipt = _draw_stream(
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
        f"{identity}:{field}"
        for identity in member_ids
        for field in _EVIDENCE_FIELDS
    )
    draws["evidence-span"], receipt = _draw_stream(
        protocol,
        scenario,
        replicate_index,
        "evidence-span",
        target_id,
        evidence_purposes,
        registry,
    )
    receipts.append(receipt)
    counterfactual_purposes = tuple(
        f"{identity}:{field}"
        for identity in cf_ids
        for field in ("outcome", "left", "right")
    )
    draws["counterfactual"], receipt = _draw_stream(
        protocol,
        scenario,
        replicate_index,
        "counterfactual",
        target_id,
        counterfactual_purposes,
        registry,
    )
    receipts.append(receipt)

    invalid_operation = profile == "CF4-INVALID-OPERATION"
    ordinary_covariates = _base_covariates(schedule, selections, effects)
    evidence_rows: list[EvidenceIndicators] = []
    pair_results: list[CounterfactualPairResult] = []
    if invalid_operation:
        process_hazards: tuple[HazardLedger, ...] = ()
        for pair in schedule.pairs:
            base = _empty_member_result(
                pair.members[0],
                "invalid_operation_rejected",
                "unsupported_estimand_scope",
            )
            counterfactual = _empty_member_result(
                pair.members[1],
                "invalid_operation_rejected",
                "unsupported_estimand_scope",
            )
            evidence_rows.extend(
                _evidence_row(member.member_id, draws["evidence-span"], False)
                for member in pair.members
            )
            pair_results.append(_pair_result(pair, base, counterfactual, True))
        estimate_status = "unsupported"
        estimate_reason_code = "unsupported_estimand_scope"
    else:
        dispositions, process_hazards = _run_paired_process(
            schedule, selections, effects, draws
        )
        for pair in schedule.pairs:
            base_member, cf_member = pair.members
            base = _generated_member_result(
                base_member,
                dispositions[base_member.member_id],
                selections,
                effects,
                ordinary_covariates[pair.ordinary_assignment_id],
                draws["submitted-outcome"],
                draws["ordinal-band"],
                draws["counterfactual"],
            )
            counterfactual = _generated_member_result(
                cf_member,
                dispositions[cf_member.member_id],
                selections,
                effects,
                ordinary_covariates[pair.ordinary_assignment_id],
                draws["submitted-outcome"],
                draws["ordinal-band"],
                draws["counterfactual"],
            )
            evidence_rows.extend(
                (
                    _evidence_row(
                        base.member_id,
                        draws["evidence-span"],
                        base.disposition in {"submitted", "invalidated"},
                    ),
                    _evidence_row(
                        counterfactual.member_id,
                        draws["evidence-span"],
                        counterfactual.disposition in {"submitted", "invalidated"},
                    ),
                )
            )
            pair_results.append(_pair_result(pair, base, counterfactual, False))
        estimate_status = "not_run"
        estimate_reason_code = None

    frozen_pair_results = tuple(pair_results)
    values: dict[str, object] = {
        "protocol_id": protocol.protocol_id,
        "scenario_parameter_hash": scenario.scenario_parameter_hash,
        "replicate_index": replicate_index,
        "counterfactual_profile": profile,
        "schedule_hash": schedule.schedule_hash,
        "operation": schedule.operation,
        "pair_results": frozen_pair_results,
        "denominators": _denominators(frozen_pair_results),
        "evidence_indicators": tuple(evidence_rows),
        "stream_receipts": tuple(receipts),
        "process_hazards": process_hazards,
        "estimate_status": estimate_status,
        "estimate_reason_code": estimate_reason_code,
    }
    hash_value = content_hash(
        {
            key: [asdict(item) for item in value]
            if isinstance(value, tuple)
            else asdict(value)
            if hasattr(value, "__dataclass_fields__")
            else value
            for key, value in values.items()
        }
    )
    return CounterfactualReplicate(**values, record_hash=hash_value)  # type: ignore[arg-type]
