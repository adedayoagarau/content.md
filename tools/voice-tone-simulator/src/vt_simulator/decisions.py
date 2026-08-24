"""Evaluation-band, stopping, and non-authoritative operating-rule decisions."""

from __future__ import annotations

from dataclasses import dataclass
from math import sqrt

from .numerics import wilson_interval


class DecisionValidationError(ValueError):
    """A band, stopping, or operating-rule input is outside the frozen contract."""


@dataclass(frozen=True)
class ProbabilitySummary:
    numerator: int
    denominator: int
    value: float | None
    mcse: float | None
    wilson_lower: float | None
    wilson_upper: float | None


@dataclass(frozen=True)
class BandDecision:
    evaluation_id: str
    passed: bool
    reason: str | None
    value: float | None


@dataclass(frozen=True)
class BiasBandDecision:
    evaluation_id: str
    passed: bool
    standardized_bias: float
    standardizer: float


@dataclass(frozen=True)
class ProbabilityBandDecision:
    evaluation_id: str
    passed: bool
    summary: ProbabilitySummary
    wilson_contains_nominal: bool


@dataclass(frozen=True)
class OperatingRuleDecision:
    rule_id: str
    supported: bool
    result_phrase: str
    canonical_status: str
    reason_codes: tuple[str, ...]


@dataclass(frozen=True)
class BiasPrecision:
    relative_mcse: float
    absolute_mcse: float
    all_replicate_statistic: float = 0.0


@dataclass(frozen=True)
class StoppingDecision:
    action: str
    reason: str
    current_valid_replicates: int
    next_valid_replicate_target: int | None


def bounded_probability_summary(numerator: int, denominator: int) -> ProbabilitySummary:
    if (
        isinstance(numerator, bool)
        or isinstance(denominator, bool)
        or not isinstance(numerator, int)
        or not isinstance(denominator, int)
        or numerator < 0
        or denominator < 0
        or numerator > denominator
    ):
        raise DecisionValidationError("probability counts must satisfy 0 <= n <= N")
    if denominator == 0:
        return ProbabilitySummary(numerator, denominator, None, None, None, None)
    value = numerator / denominator
    interval = wilson_interval(numerator, denominator)
    return ProbabilitySummary(
        numerator,
        denominator,
        value,
        sqrt(value * (1.0 - value) / denominator),
        interval.lower,
        interval.upper,
    )


def evaluate_defined_band(
    defined_count: int,
    denominator: int,
    *,
    should_be_defined: bool,
) -> BandDecision:
    summary = bounded_probability_summary(defined_count, denominator)
    if summary.value is None:
        return BandDecision("EV-DEFINED", False, "zero_denominator", None)
    passed = summary.value >= 0.99 if should_be_defined else defined_count == 0
    return BandDecision(
        "EV-DEFINED",
        passed,
        None if passed else "definedness_band_not_met",
        summary.value,
    )


def evaluate_bias_band(
    *,
    mean_estimate: float,
    truth: float,
    scale_kind: str,
) -> BiasBandDecision:
    estimate = float(mean_estimate)
    target = float(truth)
    if scale_kind == "probability":
        if not 0.0 <= target <= 1.0:
            raise DecisionValidationError("probability truth must be in [0,1]")
        standardizer = max(sqrt(target * (1.0 - target)), 0.10)
    elif scale_kind in {"log_odds", "ordinal", "calibration", "utility"}:
        standardizer = 1.0
    elif scale_kind == "raw_band":
        standardizer = 4.0
    else:
        raise DecisionValidationError("unknown EV-BIAS scale kind")
    standardized = (estimate - target) / standardizer
    return BiasBandDecision(
        "EV-BIAS",
        abs(standardized) <= 0.10,
        standardized,
        standardizer,
    )


def evaluate_coverage_band(covered: int, eligible: int) -> ProbabilityBandDecision:
    summary = bounded_probability_summary(covered, eligible)
    contains = (
        summary.wilson_lower is not None
        and summary.wilson_upper is not None
        and summary.wilson_lower <= 0.95 <= summary.wilson_upper
    )
    passed = summary.value is not None and 0.94 <= summary.value <= 0.97 and contains
    return ProbabilityBandDecision("EV-COVERAGE", passed, summary, contains)


def evaluate_type1_band(rejections: int, eligible: int) -> ProbabilityBandDecision:
    summary = bounded_probability_summary(rejections, eligible)
    contains = (
        summary.wilson_lower is not None
        and summary.wilson_upper is not None
        and summary.wilson_lower <= 0.05 <= summary.wilson_upper
    )
    passed = summary.value is not None and 0.04 <= summary.value <= 0.06 and contains
    return ProbabilityBandDecision("EV-TYPE1", passed, summary, contains)


def _gate_reasons(
    *,
    run_complete: bool,
    applicable_bands_pass: bool,
    required_intervals_estimated: bool,
    prohibited_output_count: int,
    current_fixture_eligible: bool,
) -> tuple[str, ...]:
    if (
        isinstance(prohibited_output_count, bool)
        or not isinstance(prohibited_output_count, int)
        or prohibited_output_count < 0
    ):
        raise DecisionValidationError("prohibited output count must be nonnegative")
    reasons: list[str] = []
    if not run_complete:
        reasons.append("run_incomplete")
    if not applicable_bands_pass:
        reasons.append("applicable_band_failure")
    if not required_intervals_estimated:
        reasons.append("required_interval_unavailable")
    if prohibited_output_count:
        reasons.append("prohibited_output_detected")
    if not current_fixture_eligible:
        reasons.append("fixture_ineligible")
    return tuple(reasons)


def evaluate_operating_rule(
    rule_id: str,
    *,
    run_complete: bool,
    applicable_bands_pass: bool,
    required_intervals_estimated: bool,
    prohibited_output_count: int,
    current_fixture_eligible: bool,
) -> OperatingRuleDecision:
    """Apply the exact non-authoritative operating table without threshold promotion."""

    reasons = _gate_reasons(
        run_complete=run_complete,
        applicable_bands_pass=applicable_bands_pass,
        required_intervals_estimated=required_intervals_estimated,
        prohibited_output_count=prohibited_output_count,
        current_fixture_eligible=current_fixture_eligible,
    )
    if rule_id == "RULE-R3-FIXED-PANEL":
        return OperatingRuleDecision(
            rule_id,
            False,
            "fixed_panel_support_unavailable",
            "requires_simulation",
            tuple(sorted({*reasons, "fixed_target_interval_method_gap"})),
        )
    if rule_id == "RULE-C10-COVERAGE":
        return OperatingRuleDecision(
            rule_id,
            False,
            "coverage_candidate_support_unavailable",
            "requires_simulation",
            tuple(sorted({*reasons, "fixed_target_interval_method_gap"})),
        )
    if rule_id == "RULE-BUNDLE-SPLIT":
        return OperatingRuleDecision(
            rule_id,
            False,
            "unsupported",
            "unsupported",
            tuple(sorted({*reasons, "card_identity_pooling_prohibited"})),
        )
    if rule_id == "RULE-ALPHA-LOWER-BOUND":
        return OperatingRuleDecision(
            rule_id,
            False,
            "lower_bound_decision_unavailable",
            "requires_cognitive_validation",
            tuple(sorted({*reasons, "alpha_interval_unsupported"})),
        )
    support_phrases = {
        "RULE-SIDE-ALLOCATION": "simulation_supported_for_allocation",
        "RULE-GRAPH-GUARD": "simulation_supported_for_graph_guard",
        "RULE-INTERVAL-TARGET": "simulation_supported_for_target_interval",
        "RULE-CALIBRATION-MINIMUM": "simulation_candidate_for_calibration_minimum",
    }
    if rule_id not in support_phrases:
        raise DecisionValidationError("unknown operating rule")
    supported = not reasons
    return OperatingRuleDecision(
        rule_id,
        supported,
        support_phrases[rule_id] if supported else "simulation_support_unavailable",
        "requires_pilot_data" if supported else "requires_simulation",
        () if supported else reasons,
    )


def stopping_decision(
    valid_replicates: int,
    *,
    probability_summaries: tuple[ProbabilitySummary, ...],
    bias_precision: tuple[BiasPrecision, ...],
) -> StoppingDecision:
    """Apply the 10k/1k/100k Monte Carlo precision schedule."""

    if (
        isinstance(valid_replicates, bool)
        or not isinstance(valid_replicates, int)
        or valid_replicates < 0
        or valid_replicates > 100000
        or valid_replicates % 1000 != 0
    ):
        raise DecisionValidationError(
            "valid replicate checkpoint must be a multiple of 1,000 in 0..100,000"
        )
    if valid_replicates < 10000:
        return StoppingDecision(
            "continue",
            "minimum_replicates_not_met",
            valid_replicates,
            10000,
        )
    probability_met = all(
        summary.denominator > 0
        and summary.mcse is not None
        and summary.mcse <= 0.0025
        for summary in probability_summaries
    )
    bias_met = True
    for precision in bias_precision:
        if precision.relative_mcse < 0.0 or precision.absolute_mcse < 0.0:
            raise DecisionValidationError("bias precision values must be nonnegative")
        if precision.relative_mcse > 0.01:
            bias_met = False
        if (
            abs(precision.all_replicate_statistic) < 0.01
            and precision.absolute_mcse > 0.0025
        ):
            bias_met = False
    if probability_met and bias_met:
        return StoppingDecision(
            "complete", "precision_met", valid_replicates, None
        )
    if valid_replicates == 100000:
        return StoppingDecision(
            "simulation_precision_unmet",
            "maximum_replicates_reached",
            valid_replicates,
            None,
        )
    return StoppingDecision(
        "continue",
        "precision_not_met",
        valid_replicates,
        valid_replicates + 1000,
    )
