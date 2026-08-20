"""Exact process-state primitives for the bounded synthetic simulator candidate."""

from __future__ import annotations

from dataclasses import asdict, dataclass
from math import exp, log

from .canonical import content_hash
from .grid import ScenarioBundle
from .manifest import ValidatedProtocol
from .numerics import inverse_normal_as241
from .schedule import ScheduleResult, ScheduledAssignment
from .streams import ConsumptionRecord, StreamCoordinates, derive_stream


class ProcessValidationError(ValueError):
    """A process input or generated state violates the frozen protocol."""


@dataclass(frozen=True)
class SolverResult:
    status: str
    intercept: float | None
    mean_probability: float | None
    denominator: int
    iterations: int
    reason: str | None


@dataclass(frozen=True)
class ProcessCovariates:
    assignment_id: str
    interpretation_class_mismatch: bool
    last_quartile: bool
    fatigue_active: bool
    high_rateability_difficulty: bool
    high_context_difficulty: bool
    canonical_preference_contrast: float


@dataclass(frozen=True)
class ProcessUniforms:
    assignment_id: str
    nonstart: float
    nonlock: float
    procedural: float
    procedural_reason: float
    invalidation_flag: float
    invalidation_reason: float


@dataclass(frozen=True)
class SequentialProcessSpec:
    missingness_mechanism: str
    nonstart_rate: float
    nonlock_rate: float
    procedural_rate: float
    invalidation_rate: float
    side_design: str = "S-EXACT"
    locale_stratum: str = "SLOC-1"


@dataclass(frozen=True)
class HazardLedger:
    stage: str
    target_rate: float
    risk_set_count: int
    event_count: int
    scheduled_population_incidence: float
    solver_status: str
    intercept: float | None
    mean_probability: float | None
    iterations: int


@dataclass(frozen=True)
class ProcessDisposition:
    assignment_id: str
    disposition: str
    reason: str | None
    eligible: bool
    started: bool
    locked: bool
    invalidated: bool


@dataclass(frozen=True)
class SequentialProcessResult:
    dispositions: tuple[ProcessDisposition, ...]
    hazards: tuple[HazardLedger, ...]


@dataclass(frozen=True)
class PopulationBlock:
    replicate_index: int
    purposes: tuple[str, ...]
    normal_values: tuple[tuple[str, float], ...]
    interpretation_classes: tuple[tuple[str, int], ...]
    consumption: ConsumptionRecord
    block_hash: str

    def normal(self, purpose: str) -> float:
        for key, value in self.normal_values:
            if key == purpose:
                return value
        raise ProcessValidationError(f"unknown population normal slot: {purpose}")

    def interpretation_class(self, rater_index: int) -> int:
        rater_id = f"SRATER-{rater_index:04d}"
        for key, value in self.interpretation_classes:
            if key == rater_id:
                return value
        raise ProcessValidationError(f"unknown interpretation-class rater: {rater_id}")


@dataclass(frozen=True)
class SelectedPopulationEffects:
    family_source_index: int
    rater_source_index: int
    interaction_source_index: int
    treatment_source_index: int
    dependence_profile: str
    family_block: PopulationBlock
    rater_block: PopulationBlock
    interaction_block: PopulationBlock
    treatment_block: PopulationBlock

    def crossed(self, channel: str, family_index: int, rater_index: int) -> float:
        if channel not in {"preference", "rateability", "unacceptability", "tie"}:
            raise ProcessValidationError(f"unknown crossed-effect channel: {channel}")
        if not 1 <= family_index <= 22 or not 1 <= rater_index <= 8:
            raise ProcessValidationError("crossed-effect identity is outside the population block")
        scales = {
            "D0-INDEPENDENT": (0.0, 0.0, 0.0),
            "D1-MODERATE": (0.35, 0.25, 0.15),
            "D2-HIGH": (0.80, 0.60, 0.40),
        }
        if self.dependence_profile not in scales:
            raise ProcessValidationError("unknown dependence profile")
        family_scale, rater_scale, interaction_scale = scales[self.dependence_profile]
        family_id = f"SMSG-{family_index:04d}"
        rater_id = f"SRATER-{rater_index:04d}"
        return (
            family_scale * self.family_block.normal(f"family:{channel}:{family_id}")
            + rater_scale * self.rater_block.normal(f"rater:{channel}:{rater_id}")
            + interaction_scale
            * self.interaction_block.normal(
                f"interaction:{channel}:{rater_id}:{family_id}"
            )
        )


@dataclass(frozen=True)
class RawResponse:
    assignment_id: str
    assignment_hash: str
    raw_display_outcome: str


@dataclass(frozen=True)
class DerivedResponseMapping:
    assignment_id: str
    assignment_hash: str
    raw_display_outcome: str
    derived_canonical_outcome: str
    displayed_left_candidate_id: str
    displayed_right_candidate_id: str
    mapping_profile_id: str


@dataclass(frozen=True)
class RawOrdinalBands:
    display_left_band: int | None
    display_right_band: int | None


@dataclass(frozen=True)
class CandidateOrdinalBands:
    candidate_a_band: int | None
    candidate_b_band: int | None


_PROCEDURAL_REASONS = (
    "outside_qualified_scope",
    "conflict_of_interest",
    "blindness_breach",
    "inaccessible_presentation",
    "locale_or_language_unsupported",
    "technical_failure",
    "consent_withdrawn",
    "other_declared_reason",
)
_PROCEDURAL_WEIGHTS = (0.15, 0.10, 0.10, 0.10, 0.15, 0.20, 0.10, 0.10)
_INVALIDATION_REASONS = (
    "post_lock_integrity_failure",
    "mapping_reference_mismatch",
    "duplicate_submission",
    "late_exclusion_trigger",
)
_EFFECT_CHANNELS = ("preference", "rateability", "unacceptability", "tie")
_CATEGORY_ORDER = (
    "A",
    "B",
    "indistinguishable",
    "both_unacceptable",
    "insufficient_context",
)
_PREVALENCE = {
    "P0-BALANCED": (0.35, 0.35, 0.10, 0.10, 0.10),
    "P1-ASYMMETRIC": (0.65, 0.15, 0.05, 0.10, 0.05),
    "P2-TIE-RICH": (0.20, 0.20, 0.40, 0.10, 0.10),
    "P3-BOTH-RICH": (0.15, 0.15, 0.10, 0.50, 0.10),
    "P4-CONTEXT-RICH": (0.15, 0.15, 0.10, 0.10, 0.50),
    "P5-SPARSE-NONCHOICE": (0.49, 0.49, 0.005, 0.005, 0.01),
    "P6-DEGENERATE-A": (1.0, 0.0, 0.0, 0.0, 0.0),
    "P7-DEGENERATE-TIE": (0.0, 0.0, 1.0, 0.0, 0.0),
}


def _population_purposes() -> tuple[str, ...]:
    purposes: list[str] = []
    for channel in _EFFECT_CHANNELS:
        purposes.extend(
            f"family:{channel}:SMSG-{family:04d}" for family in range(1, 23)
        )
    for channel in _EFFECT_CHANNELS:
        purposes.extend(
            f"rater:{channel}:SRATER-{rater:04d}" for rater in range(1, 9)
        )
    for channel in _EFFECT_CHANNELS:
        purposes.extend(
            f"interaction:{channel}:SRATER-{rater:04d}:SMSG-{family:04d}"
            for rater in range(1, 9)
            for family in range(1, 23)
        )
    purposes.extend(f"severity:SRATER-{rater:04d}" for rater in range(1, 9))
    purposes.extend(
        f"threshold-location:SRATER-{rater:04d}" for rater in range(1, 9)
    )
    purposes.extend(
        f"threshold-log-scale:SRATER-{rater:04d}" for rater in range(1, 9)
    )
    purposes.extend(
        f"interpretation-class:SRATER-{rater:04d}" for rater in range(1, 9)
    )
    purposes.extend(
        f"treatment-context:STREAT-{treatment:04d}:SMSG-{family:04d}"
        for treatment in range(1, 9)
        for family in range(1, 23)
    )
    result = tuple(purposes)
    if len(result) != 1032 or len(set(result)) != 1032:
        raise ProcessValidationError("population purpose ledger is not the exact 1,032 slots")
    return result


def build_population_block(
    protocol: ValidatedProtocol,
    *,
    replicate_index: int,
    reference: bool = False,
) -> PopulationBlock:
    """Generate one complete 22x8 finite-effect block and its stream receipt."""

    if isinstance(replicate_index, bool) or not isinstance(replicate_index, int):
        raise ProcessValidationError("population replicate index must be an integer")
    if reference:
        if not 1 <= replicate_index <= 10_000_000:
            raise ProcessValidationError("reference population index must be 1..10000000")
        stream_name = "finite-effects-reference"
    else:
        if not 0 <= replicate_index <= 100_000:
            raise ProcessValidationError("population replicate index must be 0..100000")
        stream_name = "finite-effects"

    purposes = _population_purposes()
    stream = derive_stream(
        StreamCoordinates(
            protocol_id=protocol.protocol_id,
            master_seed_hex=protocol.master_seed_hex,
            scenario_parameter_hash=protocol.baseline_scenario_parameter_hash,
            population_block_hash=protocol.population_block_hash,
            replicate_index=str(replicate_index),
            stream_name=stream_name,
            target_id="POPULATION-SHARED",
            expected_purposes=purposes,
        )
    )
    normal_values: list[tuple[str, float]] = []
    interpretation_classes: list[tuple[str, int]] = []
    for purpose in purposes:
        uniform = stream.uniform(purpose)
        if purpose.startswith("interpretation-class:"):
            rater_id = purpose.removeprefix("interpretation-class:")
            interpretation_classes.append((rater_id, 1 if uniform < 0.70 else 2))
        else:
            normal_values.append((purpose, inverse_normal_as241(uniform)))
    consumption = stream.close()
    preimage = {
        "consumption": asdict(consumption),
        "interpretation_classes": [list(value) for value in interpretation_classes],
        "normal_values": [list(value) for value in normal_values],
        "replicate_index": replicate_index,
        "stream_name": stream_name,
    }
    return PopulationBlock(
        replicate_index=replicate_index,
        purposes=purposes,
        normal_values=tuple(normal_values),
        interpretation_classes=tuple(interpretation_classes),
        consumption=consumption,
        block_hash=content_hash(preimage),
    )


def select_population_effects(
    scenario: ScenarioBundle,
    frozen: PopulationBlock,
    redrawn: PopulationBlock,
) -> SelectedPopulationEffects:
    """Select fixed versus redrawn components according to the exact target row."""

    if frozen.replicate_index != 0:
        raise ProcessValidationError("frozen population block must use replicate index 0")
    if redrawn.replicate_index < 1:
        raise ProcessValidationError("redrawn population block must use a positive index")
    target_id = scenario.preimage.get("target_id")
    target_kind = scenario.preimage.get("target_population_kind")
    declared = {
        "T-FIXED-FIXED": "fixed_messages_fixed_panel",
        "T-NEW-MESSAGE": "new_messages_fixed_panel",
        "T-NEW-RATER": "fixed_messages_rater_population",
        "T-NEW-RATER-MESSAGE": "new_messages_rater_population",
    }
    if target_id not in declared or declared[target_id] != target_kind:
        raise ProcessValidationError("scenario target ID/kind pair is not declared")
    selections = scenario.preimage.get("factor_selections")
    if not isinstance(selections, dict):
        raise ProcessValidationError("scenario factor selections are invalid")
    dependence_profile = selections.get("dependence_profile")
    if not isinstance(dependence_profile, str):
        raise ProcessValidationError("dependence profile is invalid")

    message_redrawn = target_id in {"T-NEW-MESSAGE", "T-NEW-RATER-MESSAGE"}
    rater_redrawn = target_id in {"T-NEW-RATER", "T-NEW-RATER-MESSAGE"}
    interaction_redrawn = message_redrawn or rater_redrawn
    family_block = redrawn if message_redrawn else frozen
    rater_block = redrawn if rater_redrawn else frozen
    interaction_block = redrawn if interaction_redrawn else frozen
    return SelectedPopulationEffects(
        family_source_index=family_block.replicate_index,
        rater_source_index=rater_block.replicate_index,
        interaction_source_index=interaction_block.replicate_index,
        treatment_source_index=family_block.replicate_index,
        dependence_profile=dependence_profile,
        family_block=family_block,
        rater_block=rater_block,
        interaction_block=interaction_block,
        treatment_block=family_block,
    )


def five_category_probabilities(
    prevalence_profile: str,
    *,
    canonical_preference_contrast: float = 0.0,
    rateability_effect: float = 0.0,
    unacceptability_effect: float = 0.0,
    tie_effect: float = 0.0,
) -> tuple[float, float, float, float, float]:
    """Compute the frozen canonical five-category softmax vector."""

    if prevalence_profile not in _PREVALENCE:
        raise ProcessValidationError("unknown prevalence profile")
    base = _PREVALENCE[prevalence_profile]
    if prevalence_profile in {"P6-DEGENERATE-A", "P7-DEGENERATE-TIE"}:
        return base
    effects = (
        0.5 * float(canonical_preference_contrast),
        -0.5 * float(canonical_preference_contrast),
        float(tie_effect),
        float(unacceptability_effect),
        float(rateability_effect),
    )
    logits = tuple(log(probability) + effect for probability, effect in zip(base, effects, strict=True))
    maximum = max(logits)
    masses = tuple(exp(value - maximum) for value in logits)
    denominator = sum(masses)
    result = tuple(value / denominator for value in masses)
    return result  # type: ignore[return-value]


def sample_latent_category(
    probabilities: tuple[float, float, float, float, float],
    draw: float,
) -> str:
    """Sample one latent canonical category in the declared half-open order."""

    _validate_uniform(draw, "submitted-outcome uniform")
    if len(probabilities) != 5 or any(value < 0.0 for value in probabilities):
        raise ProcessValidationError("five-category probability vector is invalid")
    if abs(sum(probabilities) - 1.0) > 1e-12:
        raise ProcessValidationError("five-category probability vector must sum to one")
    cumulative = 0.0
    for category, probability in zip(_CATEGORY_ORDER, probabilities, strict=True):
        cumulative += probability
        if draw < cumulative:
            return category
    return _CATEGORY_ORDER[-1]


def generate_raw_response(
    assignment: ScheduledAssignment,
    latent_category: str,
) -> RawResponse:
    """Apply only the immutable presentation map; never persist latent A/B as raw."""

    if latent_category not in _CATEGORY_ORDER:
        raise ProcessValidationError("unknown latent category")
    if latent_category == "A":
        raw = "LEFT" if assignment.a_displayed_left else "RIGHT"
    elif latent_category == "B":
        raw = "RIGHT" if assignment.a_displayed_left else "LEFT"
    else:
        raw = latent_category
    return RawResponse(
        assignment_id=assignment.assignment_id,
        assignment_hash=assignment.presentation_assignment_hash,
        raw_display_outcome=raw,
    )


def generate_graph_fixture_response(
    graph_profile: str,
    assignment: ScheduledAssignment,
    probabilities: tuple[float, float, float, float, float],
    draw: float,
) -> RawResponse:
    """Apply the G1..G5 forced-arc transform without permitting latent B wins."""

    if graph_profile not in {
        "G1-CHAIN-SEPARATED",
        "G2-DIRECTED-CYCLE",
        "G3-TWO-CYCLES",
        "G4-UNDEFEATED-STAR",
        "G5-BRIDGE-VULNERABLE",
    }:
        raise ProcessValidationError("forced graph direction applies only to G1..G5")
    _validate_uniform(draw, "graph-fixture outcome uniform")
    if len(probabilities) != 5 or any(value < 0.0 for value in probabilities):
        raise ProcessValidationError("five-category probability vector is invalid")
    if abs(sum(probabilities) - 1.0) > 1.0e-12:
        raise ProcessValidationError("five-category probability vector must sum to one")
    collapsed = (
        probabilities[0] + probabilities[1],
        probabilities[2],
        probabilities[3],
        probabilities[4],
    )
    categories = ("A", "indistinguishable", "both_unacceptable", "insufficient_context")
    cumulative = 0.0
    selected = categories[-1]
    for category, probability in zip(categories, collapsed, strict=True):
        cumulative += probability
        if draw < cumulative:
            selected = category
            break
    return generate_raw_response(assignment, selected)


def map_raw_response(
    assignment: ScheduledAssignment,
    response: RawResponse,
) -> DerivedResponseMapping:
    """Derive canonical A/B only after verifying the exact assignment binding."""

    if response.assignment_id != assignment.assignment_id:
        raise ProcessValidationError("raw response assignment ID does not match")
    if response.assignment_hash != assignment.presentation_assignment_hash:
        raise ProcessValidationError("raw response assignment hash does not match")
    raw = response.raw_display_outcome
    if raw == "LEFT":
        derived = "A" if assignment.a_displayed_left else "B"
    elif raw == "RIGHT":
        derived = "B" if assignment.a_displayed_left else "A"
    elif raw in _CATEGORY_ORDER[2:]:
        derived = raw
    else:
        raise ProcessValidationError("unknown raw display outcome")
    return DerivedResponseMapping(
        assignment_id=assignment.assignment_id,
        assignment_hash=assignment.presentation_assignment_hash,
        raw_display_outcome=raw,
        derived_canonical_outcome=derived,
        displayed_left_candidate_id=assignment.displayed_left_candidate_id,
        displayed_right_candidate_id=assignment.displayed_right_candidate_id,
        mapping_profile_id="VT-MSP-MAP/design-0.1",
    )


def _normalize_log_weights(log_weights: tuple[float, ...]) -> tuple[float, ...]:
    maximum = max(log_weights)
    masses = tuple(exp(value - maximum) for value in log_weights)
    denominator = sum(masses)
    return tuple(value / denominator for value in masses)


def ordinal_probabilities(
    ordinal_profile: str,
    *,
    latent_fit: float,
    threshold_location: float = 0.0,
    threshold_log_scale: float = 0.0,
) -> tuple[float, float, float, float, float]:
    """Return exact band probabilities for one candidate/card latent fit."""

    z = float(latent_fit)
    location = float(threshold_location)
    scale = exp(float(threshold_log_scale))
    if ordinal_profile == "OM0-CORRECT-PO":
        thresholds = tuple(
            location + scale * value for value in (-1.25, -0.35, 0.35, 1.25)
        )
        cumulative = tuple(_logistic(value - z) for value in thresholds)
        result = (
            cumulative[0],
            cumulative[1] - cumulative[0],
            cumulative[2] - cumulative[1],
            cumulative[3] - cumulative[2],
            1.0 - cumulative[3],
        )
        return result

    if ordinal_profile in {"OM1-NONPROPORTIONAL", "OM2-ADJACENT"}:
        intercepts = tuple(
            location + scale * value for value in (1.00, 0.50, -0.50, -1.00)
        )
        slopes = (
            (0.25, 0.75, 1.25, 1.75)
            if ordinal_profile == "OM1-NONPROPORTIONAL"
            else (1.0, 1.0, 1.0, 1.0)
        )
        log_weights = [0.0]
        for intercept, slope in zip(intercepts, slopes, strict=True):
            log_weights.append(log_weights[-1] + intercept + slope * z)
        normalized = _normalize_log_weights(tuple(log_weights))
        return normalized  # type: ignore[return-value]

    if ordinal_profile == "OM3-SPARSE":
        weights = (0.970, 0.020, 0.007, 0.002, 0.001)
        adjacent = tuple(log(weights[index] / weights[index - 1]) for index in range(1, 5))
        transformed = tuple(location + scale * value for value in adjacent)
        log_weights = [log(weights[0])]
        for intercept in transformed:
            log_weights.append(log_weights[-1] + intercept + 0.25 * z)
        normalized = _normalize_log_weights(tuple(log_weights))
        return normalized  # type: ignore[return-value]

    raise ProcessValidationError("unknown ordinal profile")


def _sample_band(probabilities: tuple[float, ...], draw: float) -> int:
    _validate_uniform(draw, "ordinal-band uniform")
    cumulative = 0.0
    for index, probability in enumerate(probabilities):
        cumulative += probability
        if draw < cumulative:
            return index
    return 4


def generate_ordinal_bands(
    raw_display_outcome: str,
    ordinal_profile: str,
    display_left_latent_fit: float,
    display_right_latent_fit: float,
    display_left_draw: float,
    display_right_draw: float,
    *,
    threshold_location: float = 0.0,
    threshold_log_scale: float = 0.0,
) -> RawOrdinalBands:
    """Generate two display-side raw bands, preserving the context-null invariant."""

    if raw_display_outcome not in {"LEFT", "RIGHT", *_CATEGORY_ORDER[2:]}:
        raise ProcessValidationError("unknown raw display outcome")
    _validate_uniform(display_left_draw, "display-left ordinal draw")
    _validate_uniform(display_right_draw, "display-right ordinal draw")
    if raw_display_outcome == "insufficient_context":
        return RawOrdinalBands(None, None)
    left = _sample_band(
        ordinal_probabilities(
            ordinal_profile,
            latent_fit=display_left_latent_fit,
            threshold_location=threshold_location,
            threshold_log_scale=threshold_log_scale,
        ),
        display_left_draw,
    )
    right = _sample_band(
        ordinal_probabilities(
            ordinal_profile,
            latent_fit=display_right_latent_fit,
            threshold_location=threshold_location,
            threshold_log_scale=threshold_log_scale,
        ),
        display_right_draw,
    )
    return RawOrdinalBands(left, right)


def map_ordinal_bands(
    assignment: ScheduledAssignment,
    bands: RawOrdinalBands,
) -> CandidateOrdinalBands:
    """Map display-side bands to candidates without transforming their values."""

    if assignment.a_displayed_left:
        return CandidateOrdinalBands(bands.display_left_band, bands.display_right_band)
    return CandidateOrdinalBands(bands.display_right_band, bands.display_left_band)


def ordinal_adapters(raw_band: int) -> tuple[int, float]:
    """Return the exact graph and normalized adapters for a raw 0..4 band."""

    if isinstance(raw_band, bool) or not isinstance(raw_band, int) or not 0 <= raw_band <= 4:
        raise ProcessValidationError("raw ordinal band must be an integer in 0..4")
    return raw_band + 1, raw_band / 4


def _validate_uniform(value: float, label: str) -> None:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ProcessValidationError(f"{label} must be a binary64 number")
    if not 0.0 <= float(value) < 1.0:
        raise ProcessValidationError(f"{label} must be in [0,1)")


def _validate_rate(value: float, label: str) -> float:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ProcessValidationError(f"{label} must be numeric")
    result = float(value)
    if not 0.0 <= result < 1.0:
        raise ProcessValidationError(f"{label} must be in [0,1)")
    return result


def _logistic(value: float) -> float:
    if value >= 0.0:
        inverse = exp(-value)
        return 1.0 / (1.0 + inverse)
    direct = exp(value)
    return direct / (1.0 + direct)


def _mean_probability(intercept: float, predictors: tuple[float, ...]) -> float:
    return sum(_logistic(intercept + value) for value in predictors) / len(predictors)


def solve_intercept(
    target_rate: float,
    linear_predictors: tuple[float, ...],
) -> SolverResult:
    """Solve the frozen marginal-logit intercept by bounded binary64 bisection."""

    target = _validate_rate(target_rate, "target_rate")
    predictors = tuple(float(value) for value in linear_predictors)
    if target == 0.0:
        return SolverResult(
            status="boundary_zero",
            intercept=None,
            mean_probability=0.0,
            denominator=len(predictors),
            iterations=0,
            reason=None,
        )
    if not predictors:
        return SolverResult(
            status="empty_risk_set",
            intercept=None,
            mean_probability=None,
            denominator=0,
            iterations=0,
            reason=None,
        )

    low = -40.0
    high = 40.0
    low_mean = _mean_probability(low, predictors)
    high_mean = _mean_probability(high, predictors)
    if not low_mean <= target <= high_mean:
        return SolverResult(
            status="failed",
            intercept=None,
            mean_probability=None,
            denominator=len(predictors),
            iterations=0,
            reason="intercept_solver_failure",
        )

    for iteration in range(1, 201):
        midpoint = (low + high) / 2.0
        observed = _mean_probability(midpoint, predictors)
        if abs(observed - target) <= 1e-12:
            return SolverResult(
                status="solved",
                intercept=midpoint,
                mean_probability=observed,
                denominator=len(predictors),
                iterations=iteration,
                reason=None,
            )
        if observed < target:
            low = midpoint
        else:
            high = midpoint

    return SolverResult(
        status="failed",
        intercept=None,
        mean_probability=None,
        denominator=len(predictors),
        iterations=200,
        reason="intercept_solver_failure",
    )


def _weighted_reason(draw: float, reasons: tuple[str, ...], weights: tuple[float, ...]) -> str:
    _validate_uniform(draw, "reason uniform")
    total = sum(weights)
    threshold = draw * total
    cumulative = 0.0
    for reason, weight in zip(reasons, weights, strict=True):
        cumulative += weight
        if threshold < cumulative:
            return reason
    return reasons[-1]


def procedural_reason_from_uniform(
    draw: float,
    *,
    mechanism: str,
    side_design: str,
    locale_stratum: str,
    covariates: ProcessCovariates,
) -> str:
    """Map a reason draw through the exact base or stress-case weights."""

    if mechanism not in {"MCAR", "MAR-ORDER-CONTEXT", "MNAR-PREFERENCE"}:
        raise ProcessValidationError("unknown missingness mechanism")
    weights = list(_PROCEDURAL_WEIGHTS)
    if mechanism != "MCAR":
        multiplier = exp(0.75)
        conditions = (
            covariates.interpretation_class_mismatch,
            False,
            side_design == "S-ALIASED",
            covariates.fatigue_active,
            locale_stratum == "SLOC-2",
            covariates.last_quartile,
            False,
            covariates.high_context_difficulty,
        )
        weights = [
            weight * multiplier if condition else weight
            for weight, condition in zip(weights, conditions, strict=True)
        ]
    return _weighted_reason(draw, _PROCEDURAL_REASONS, tuple(weights))


def invalidation_reason_from_uniform(draw: float) -> str:
    """Map an invalidation-reason draw to four equal-width bins."""

    return _weighted_reason(draw, _INVALIDATION_REASONS, (0.25, 0.25, 0.25, 0.25))


def _predictor(
    stage: str,
    mechanism: str,
    covariates: ProcessCovariates,
) -> float:
    if mechanism == "MCAR":
        return 0.0
    if mechanism not in {"MAR-ORDER-CONTEXT", "MNAR-PREFERENCE"}:
        raise ProcessValidationError("unknown missingness mechanism")
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
        raise ProcessValidationError(f"unknown hazard stage: {stage}")
    if mechanism == "MNAR-PREFERENCE":
        value += abs(covariates.canonical_preference_contrast)
    return value


def _index_exactly(values: tuple[object, ...], label: str) -> dict[str, object]:
    result: dict[str, object] = {}
    for value in values:
        assignment_id = getattr(value, "assignment_id", None)
        if not isinstance(assignment_id, str) or not assignment_id:
            raise ProcessValidationError(f"{label} contains an invalid assignment ID")
        if assignment_id in result:
            raise ProcessValidationError(f"{label} contains a duplicate assignment ID")
        result[assignment_id] = value
    return result


def _apply_hazard(
    *,
    stage: str,
    target_rate: float,
    risk_ids: tuple[str, ...],
    covariates: dict[str, ProcessCovariates],
    uniforms: dict[str, ProcessUniforms],
    draw_field: str,
    mechanism: str,
    scheduled_count: int,
) -> tuple[set[str], HazardLedger]:
    predictors = tuple(_predictor(stage, mechanism, covariates[value]) for value in risk_ids)
    solver = solve_intercept(target_rate, predictors)
    if solver.status == "failed":
        raise ProcessValidationError("intercept_solver_failure")
    events: set[str] = set()
    if solver.status == "solved":
        assert solver.intercept is not None
        for assignment_id, predictor in zip(risk_ids, predictors, strict=True):
            probability = _logistic(solver.intercept + predictor)
            if getattr(uniforms[assignment_id], draw_field) < probability:
                events.add(assignment_id)
    ledger = HazardLedger(
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
    return events, ledger


def run_sequential_process(
    schedule: ScheduleResult,
    spec: SequentialProcessSpec,
    covariate_rows: tuple[ProcessCovariates, ...],
    uniform_rows: tuple[ProcessUniforms, ...],
) -> SequentialProcessResult:
    """Apply the four terminal checks in their frozen risk-set order."""

    rates = {
        "nonstart": _validate_rate(spec.nonstart_rate, "nonstart_rate"),
        "nonlock": _validate_rate(spec.nonlock_rate, "nonlock_rate"),
        "procedural_abstention": _validate_rate(
            spec.procedural_rate, "procedural_rate"
        ),
        "invalidation": _validate_rate(spec.invalidation_rate, "invalidation_rate"),
    }
    if spec.missingness_mechanism not in {
        "MCAR",
        "MAR-ORDER-CONTEXT",
        "MNAR-PREFERENCE",
    }:
        raise ProcessValidationError("unknown missingness mechanism")

    assignment_ids = tuple(item.assignment_id for item in schedule.assignments)
    if len(set(assignment_ids)) != len(assignment_ids):
        raise ProcessValidationError("schedule contains duplicate assignment IDs")
    covariates = _index_exactly(covariate_rows, "covariates")
    uniforms = _index_exactly(uniform_rows, "uniforms")
    if set(covariates) != set(assignment_ids) or set(uniforms) != set(assignment_ids):
        raise ProcessValidationError("schedule, covariates, and uniforms must reconcile exactly")
    for assignment_id in assignment_ids:
        row = uniforms[assignment_id]
        for field in (
            "nonstart",
            "nonlock",
            "procedural",
            "procedural_reason",
            "invalidation_flag",
            "invalidation_reason",
        ):
            _validate_uniform(getattr(row, field), f"{assignment_id}.{field}")

    scheduled_count = len(assignment_ids)
    nonstarted, nonstart_ledger = _apply_hazard(
        stage="nonstart",
        target_rate=rates["nonstart"],
        risk_ids=assignment_ids,
        covariates=covariates,
        uniforms=uniforms,
        draw_field="nonstart",
        mechanism=spec.missingness_mechanism,
        scheduled_count=scheduled_count,
    )
    started = tuple(value for value in assignment_ids if value not in nonstarted)
    nonlocked, nonlock_ledger = _apply_hazard(
        stage="nonlock",
        target_rate=rates["nonlock"],
        risk_ids=started,
        covariates=covariates,
        uniforms=uniforms,
        draw_field="nonlock",
        mechanism=spec.missingness_mechanism,
        scheduled_count=scheduled_count,
    )
    locked = tuple(value for value in started if value not in nonlocked)
    abstained, procedural_ledger = _apply_hazard(
        stage="procedural_abstention",
        target_rate=rates["procedural_abstention"],
        risk_ids=locked,
        covariates=covariates,
        uniforms=uniforms,
        draw_field="procedural",
        mechanism=spec.missingness_mechanism,
        scheduled_count=scheduled_count,
    )
    submitted = tuple(value for value in locked if value not in abstained)

    invalidated: set[str] = set()
    invalidation_rate = rates["invalidation"]
    if invalidation_rate > 0.0:
        invalidated = {
            value
            for value in submitted
            if uniforms[value].invalidation_flag < invalidation_rate
        }
        invalidation_status = "fixed_probability"
        invalidation_mean: float | None = invalidation_rate
    else:
        invalidation_status = "boundary_zero"
        invalidation_mean = 0.0
    invalidation_ledger = HazardLedger(
        stage="invalidation",
        target_rate=invalidation_rate,
        risk_set_count=len(submitted),
        event_count=len(invalidated),
        scheduled_population_incidence=(
            len(invalidated) / scheduled_count if scheduled_count else 0.0
        ),
        solver_status=invalidation_status,
        intercept=None,
        mean_probability=invalidation_mean,
        iterations=0,
    )

    dispositions: list[ProcessDisposition] = []
    for assignment_id in assignment_ids:
        if assignment_id in nonstarted:
            dispositions.append(
                ProcessDisposition(
                    assignment_id,
                    "nonstarted",
                    "nonstart_event",
                    True,
                    False,
                    False,
                    False,
                )
            )
        elif assignment_id in nonlocked:
            dispositions.append(
                ProcessDisposition(
                    assignment_id,
                    "nonlocked",
                    "nonlock_event",
                    True,
                    True,
                    False,
                    False,
                )
            )
        elif assignment_id in abstained:
            row = uniforms[assignment_id]
            dispositions.append(
                ProcessDisposition(
                    assignment_id,
                    "abstained",
                    procedural_reason_from_uniform(
                        row.procedural_reason,
                        mechanism=spec.missingness_mechanism,
                        side_design=spec.side_design,
                        locale_stratum=spec.locale_stratum,
                        covariates=covariates[assignment_id],
                    ),
                    True,
                    True,
                    False,
                    False,
                )
            )
        elif assignment_id in invalidated:
            dispositions.append(
                ProcessDisposition(
                    assignment_id,
                    "invalidated",
                    invalidation_reason_from_uniform(
                        uniforms[assignment_id].invalidation_reason
                    ),
                    True,
                    True,
                    True,
                    True,
                )
            )
        else:
            dispositions.append(
                ProcessDisposition(
                    assignment_id,
                    "submitted",
                    None,
                    True,
                    True,
                    True,
                    False,
                )
            )

    terminal_ids = {item.assignment_id for item in dispositions}
    if terminal_ids != set(assignment_ids) or len(dispositions) != scheduled_count:
        raise ProcessValidationError("terminal dispositions do not partition the schedule")
    return SequentialProcessResult(
        dispositions=tuple(dispositions),
        hazards=(
            nonstart_ledger,
            nonlock_ledger,
            procedural_ledger,
            invalidation_ledger,
        ),
    )
