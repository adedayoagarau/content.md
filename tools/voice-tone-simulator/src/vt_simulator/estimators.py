"""Closed-form estimators for the bounded offline simulator candidate.

The iterative ML and resampling procedures live in later modules.  This module
contains only exact proportion, reliability, direct-calibration, and paired
counterfactual summaries that require no optimizer and perform no I/O.
"""

from __future__ import annotations

from collections import Counter
from dataclasses import dataclass
from math import ceil, log

from .counterfactual import CounterfactualReplicate


class EstimatorValidationError(ValueError):
    """An estimator input violates its declared denominator or identity contract."""


@dataclass(frozen=True)
class ProportionEstimate:
    category: str
    numerator: int
    denominator: int
    value: float
    estimate_status: str = "estimated"


@dataclass(frozen=True)
class ReliabilityUnit:
    unit_id: str
    values: tuple[str, ...]


@dataclass(frozen=True)
class AlphaEstimate:
    method_id: str
    estimate_status: str
    reason: str | None
    value: float | None
    total_unit_count: int
    pairable_unit_count: int
    pairable_rating_count: int
    observed_disagreement: float
    expected_disagreement: float


@dataclass(frozen=True)
class ReliabilityBin:
    bin_index: int
    count: int
    mean_prediction: float
    event_rate: float


@dataclass(frozen=True)
class SelectiveRiskPoint:
    available_fraction: float
    retained_count: int
    brier_score: float


@dataclass(frozen=True)
class CalibrationMetrics:
    metric_status: str
    reason: str | None
    scheduled_case_count: int
    observed_case_count: int
    scored_case_count: int
    event_count: int
    non_event_count: int
    brier_score: float | None
    log_loss: float | None
    auroc_status: str
    auroc: float | None
    prediction_variance: float | None
    reliability_bins: tuple[ReliabilityBin, ...]
    reliability: float | None
    resolution: float | None
    uncertainty: float | None
    prediction_answer_coverage: float
    scored_event_coverage: float
    observed_event_coverage: float
    selective_risk: tuple[SelectiveRiskPoint, ...]


@dataclass(frozen=True)
class CountCell:
    first: str | int
    second: str | int
    count: int


@dataclass(frozen=True)
class CounterfactualPairedSummary:
    method_id: str
    estimate_status: str
    reason: str | None
    scheduled_pair_count: int
    transition_denominator: int
    paired_band_denominator: int
    transitions: tuple[CountCell, ...]
    candidate_a_band_differences: tuple[CountCell, ...]
    candidate_b_band_differences: tuple[CountCell, ...]
    discordant_pair_count: int
    base_first_denominator: int
    base_first_discordant_count: int
    counterfactual_first_denominator: int
    counterfactual_first_discordant_count: int


def _categories(values: tuple[str, ...]) -> tuple[str, ...]:
    if not values or any(not isinstance(value, str) or not value for value in values):
        raise EstimatorValidationError("categories must be non-empty strings")
    if len(set(values)) != len(values):
        raise EstimatorValidationError("categories must be unique")
    return values


def category_proportions(
    categories: tuple[str, ...],
    observations: tuple[str | None, ...],
    *,
    declared_denominator: int,
) -> tuple[ProportionEstimate, ...]:
    """Return exact category counts against one caller-declared denominator."""

    category_order = _categories(categories)
    if (
        isinstance(declared_denominator, bool)
        or not isinstance(declared_denominator, int)
        or declared_denominator < 1
    ):
        raise EstimatorValidationError("declared denominator must be a positive integer")
    if len(observations) > declared_denominator:
        raise EstimatorValidationError("observations exceed the declared denominator")
    unknown = sorted(
        {value for value in observations if value is not None and value not in category_order}
    )
    if unknown:
        raise EstimatorValidationError(f"observations contain unknown categories: {unknown!r}")
    counts = Counter(value for value in observations if value is not None)
    return tuple(
        ProportionEstimate(
            category=category,
            numerator=counts[category],
            denominator=declared_denominator,
            value=counts[category] / declared_denominator,
        )
        for category in category_order
    )


def _validate_units(
    units: tuple[ReliabilityUnit, ...], categories: tuple[str, ...]
) -> tuple[tuple[str, ...], tuple[ReliabilityUnit, ...]]:
    category_order = _categories(categories)
    if not units:
        raise EstimatorValidationError("alpha requires at least one declared unit")
    ids: set[str] = set()
    for unit in units:
        if not isinstance(unit.unit_id, str) or not unit.unit_id or unit.unit_id in ids:
            raise EstimatorValidationError("reliability unit IDs must be non-empty and unique")
        ids.add(unit.unit_id)
        if any(value not in category_order for value in unit.values):
            raise EstimatorValidationError("reliability unit contains an unknown category")
    return category_order, units


def _alpha(
    units: tuple[ReliabilityUnit, ...],
    categories: tuple[str, ...],
    *,
    ordinal: bool,
) -> AlphaEstimate:
    category_order, rows = _validate_units(units, categories)
    pairable = tuple(unit for unit in rows if len(unit.values) >= 2)
    pooled = Counter(value for unit in pairable for value in unit.values)
    total_ratings = sum(pooled.values())
    observed = 0.0

    if ordinal:
        index = {value: position for position, value in enumerate(category_order)}

        def distance(left: str, right: str) -> float:
            if left == right:
                return 0.0
            low, high = sorted((index[left], index[right]))
            interior = sum(pooled[category_order[position]] for position in range(low, high + 1))
            endpoint_half = (pooled[left] + pooled[right]) / 2.0
            return (interior - endpoint_half) ** 2

        method_id = "A-ALPHA-ORD/design-0.1"
    else:

        def distance(left: str, right: str) -> float:
            return 0.0 if left == right else 1.0

        method_id = "A-ALPHA-NOM/design-0.1"

    for unit in pairable:
        counts = Counter(unit.values)
        denominator = len(unit.values) - 1
        for left in category_order:
            for right in category_order:
                ordered_count = counts[left] * (
                    counts[right] - (1 if left == right else 0)
                ) / denominator
                observed += ordered_count * distance(left, right)

    expected = 0.0
    if total_ratings > 1:
        for left in category_order:
            for right in category_order:
                ordered_expected = pooled[left] * (
                    pooled[right] - (1 if left == right else 0)
                ) / (total_ratings - 1)
                expected += ordered_expected * distance(left, right)

    if expected <= 0.0:
        return AlphaEstimate(
            method_id=method_id,
            estimate_status="unsupported",
            reason="expected_disagreement_nonpositive",
            value=None,
            total_unit_count=len(rows),
            pairable_unit_count=len(pairable),
            pairable_rating_count=total_ratings,
            observed_disagreement=observed,
            expected_disagreement=expected,
        )
    return AlphaEstimate(
        method_id=method_id,
        estimate_status="estimated",
        reason=None,
        value=1.0 - observed / expected,
        total_unit_count=len(rows),
        pairable_unit_count=len(pairable),
        pairable_rating_count=total_ratings,
        observed_disagreement=observed,
        expected_disagreement=expected,
    )


def krippendorff_nominal_alpha(
    units: tuple[ReliabilityUnit, ...], categories: tuple[str, ...]
) -> AlphaEstimate:
    return _alpha(units, categories, ordinal=False)


def krippendorff_ordinal_alpha(
    units: tuple[ReliabilityUnit, ...], categories: tuple[str, ...]
) -> AlphaEstimate:
    return _alpha(units, categories, ordinal=True)


def _validated_calibration_rows(
    rows: tuple[tuple[str, float | None, bool], ...],
    scheduled_case_count: int,
) -> tuple[tuple[str, float | None, bool], ...]:
    if (
        isinstance(scheduled_case_count, bool)
        or not isinstance(scheduled_case_count, int)
        or scheduled_case_count < 1
    ):
        raise EstimatorValidationError("scheduled_case_count must be positive")
    if len(rows) > scheduled_case_count:
        raise EstimatorValidationError("calibration rows exceed the scheduled denominator")
    ids: set[str] = set()
    for case_id, prediction, event in rows:
        if not isinstance(case_id, str) or not case_id or case_id in ids:
            raise EstimatorValidationError("calibration case IDs must be unique strings")
        ids.add(case_id)
        if not isinstance(event, bool):
            raise EstimatorValidationError("observed calibration events must be boolean")
        if prediction is not None:
            if isinstance(prediction, bool) or not isinstance(prediction, (int, float)):
                raise EstimatorValidationError("prediction must be numeric or null")
            if not 0.0 < float(prediction) < 1.0:
                raise EstimatorValidationError("prediction must be inside (0,1)")
    return rows


def _auroc(scored: tuple[tuple[str, float, bool], ...]) -> tuple[str, float | None]:
    events = tuple(row for row in scored if row[2])
    non_events = tuple(row for row in scored if not row[2])
    if not events or not non_events:
        return "unsupported", None
    wins = 0.0
    for _, event_prediction, _ in events:
        for _, non_event_prediction, _ in non_events:
            if event_prediction > non_event_prediction:
                wins += 1.0
            elif event_prediction == non_event_prediction:
                wins += 0.5
    return "estimated", wins / (len(events) * len(non_events))


def calibration_metrics(
    rows: tuple[tuple[str, float | None, bool], ...],
    *,
    scheduled_case_count: int,
    bin_count: int = 10,
) -> CalibrationMetrics:
    """Compute the exact direct Arm-F metrics on available predictions only."""

    values = _validated_calibration_rows(rows, scheduled_case_count)
    if isinstance(bin_count, bool) or not isinstance(bin_count, int) or bin_count < 1:
        raise EstimatorValidationError("bin_count must be a positive integer")
    scored = tuple(
        (case_id, float(prediction), event)
        for case_id, prediction, event in values
        if prediction is not None
    )
    observed_count = len(values)
    scored_count = len(scored)
    event_count = sum(event for _, _, event in scored)
    non_event_count = scored_count - event_count
    observed_coverage = observed_count / scheduled_case_count
    scored_coverage = scored_count / scheduled_case_count
    if not scored:
        return CalibrationMetrics(
            metric_status="unsupported",
            reason="zero_denominator",
            scheduled_case_count=scheduled_case_count,
            observed_case_count=observed_count,
            scored_case_count=0,
            event_count=0,
            non_event_count=0,
            brier_score=None,
            log_loss=None,
            auroc_status="unsupported",
            auroc=None,
            prediction_variance=None,
            reliability_bins=(),
            reliability=None,
            resolution=None,
            uncertainty=None,
            prediction_answer_coverage=0.0,
            scored_event_coverage=0.0,
            observed_event_coverage=observed_coverage,
            selective_risk=(),
        )

    errors = tuple((prediction - float(event)) ** 2 for _, prediction, event in scored)
    brier = sum(errors) / scored_count
    logloss = -sum(
        log(prediction) if event else log(1.0 - prediction)
        for _, prediction, event in scored
    ) / scored_count
    mean_prediction = sum(prediction for _, prediction, _ in scored) / scored_count
    prediction_variance = sum(
        (prediction - mean_prediction) ** 2 for _, prediction, _ in scored
    ) / scored_count
    ybar = event_count / scored_count

    ordered = tuple(sorted(scored, key=lambda row: (row[1], row[0])))
    actual_bins = min(bin_count, scored_count)
    base_size, remainder = divmod(scored_count, actual_bins)
    bins: list[ReliabilityBin] = []
    cursor = 0
    for index in range(1, actual_bins + 1):
        size = base_size + (1 if index <= remainder else 0)
        segment = ordered[cursor : cursor + size]
        cursor += size
        bins.append(
            ReliabilityBin(
                bin_index=index,
                count=size,
                mean_prediction=sum(row[1] for row in segment) / size,
                event_rate=sum(row[2] for row in segment) / size,
            )
        )
    reliability = sum(
        row.count / scored_count * (row.mean_prediction - row.event_rate) ** 2
        for row in bins
    )
    resolution = sum(
        row.count / scored_count * (row.event_rate - ybar) ** 2 for row in bins
    )
    uncertainty = ybar * (1.0 - ybar)
    auroc_status, auroc = _auroc(scored)

    confidence_order = tuple(
        sorted(scored, key=lambda row: (-abs(row[1] - 0.5), row[0]))
    )
    risk: list[SelectiveRiskPoint] = []
    for index in range(1, 11):
        fraction = index / 10.0
        retained = ceil(fraction * scored_count)
        segment = confidence_order[:retained]
        score = sum((prediction - float(event)) ** 2 for _, prediction, event in segment) / retained
        risk.append(SelectiveRiskPoint(fraction, retained, score))

    return CalibrationMetrics(
        metric_status="estimated",
        reason=None,
        scheduled_case_count=scheduled_case_count,
        observed_case_count=observed_count,
        scored_case_count=scored_count,
        event_count=event_count,
        non_event_count=non_event_count,
        brier_score=brier,
        log_loss=logloss,
        auroc_status=auroc_status,
        auroc=auroc,
        prediction_variance=prediction_variance,
        reliability_bins=tuple(bins),
        reliability=reliability,
        resolution=resolution,
        uncertainty=uncertainty,
        prediction_answer_coverage=scored_coverage,
        scored_event_coverage=scored_coverage,
        observed_event_coverage=observed_coverage,
        selective_risk=tuple(risk),
    )


def counterfactual_paired_summary(
    replicate: CounterfactualReplicate,
) -> CounterfactualPairedSummary:
    """Summarize only both-valid mapped pairs under A-CF-PAIRED."""

    if replicate.counterfactual_profile == "CF4-INVALID-OPERATION":
        if replicate.estimate_status != "unsupported":
            raise EstimatorValidationError("CF4 replicate leaked a supported estimate state")
        return CounterfactualPairedSummary(
            method_id="A-CF-PAIRED/design-0.1",
            estimate_status="unsupported",
            reason="unsupported_estimand_scope",
            scheduled_pair_count=replicate.denominators.scheduled_pairs,
            transition_denominator=0,
            paired_band_denominator=0,
            transitions=(),
            candidate_a_band_differences=(),
            candidate_b_band_differences=(),
            discordant_pair_count=0,
            base_first_denominator=0,
            base_first_discordant_count=0,
            counterfactual_first_denominator=0,
            counterfactual_first_discordant_count=0,
        )

    transition_counts: Counter[tuple[str, str]] = Counter()
    a_differences: Counter[int] = Counter()
    b_differences: Counter[int] = Counter()
    discordant = 0
    order_denominators = {"BASE": 0, "CF": 0}
    order_discordant = {"BASE": 0, "CF": 0}
    for pair in replicate.pair_results:
        if pair.transition is None:
            continue
        transition_counts[pair.transition] += 1
        changed = pair.transition[0] != pair.transition[1]
        discordant += int(changed)
        first = pair.presentation_order[0]
        order_denominators[first] += 1
        order_discordant[first] += int(changed)
        if pair.candidate_band_differences is not None:
            a_differences[pair.candidate_band_differences[0]] += 1
            b_differences[pair.candidate_band_differences[1]] += 1

    transitions = tuple(
        CountCell(left, right, transition_counts[(left, right)])
        for left, right in sorted(transition_counts)
    )
    a_rows = tuple(CountCell(value, "candidate_a", a_differences[value]) for value in sorted(a_differences))
    b_rows = tuple(CountCell(value, "candidate_b", b_differences[value]) for value in sorted(b_differences))
    if sum(row.count for row in transitions) != replicate.denominators.transition_denominator:
        raise EstimatorValidationError("transition counts do not reconcile to the pair ledger")
    if sum(row.count for row in a_rows) != replicate.denominators.paired_band_denominator:
        raise EstimatorValidationError("candidate-A band counts do not reconcile")
    if sum(row.count for row in b_rows) != replicate.denominators.paired_band_denominator:
        raise EstimatorValidationError("candidate-B band counts do not reconcile")
    return CounterfactualPairedSummary(
        method_id="A-CF-PAIRED/design-0.1",
        estimate_status="estimated",
        reason=None,
        scheduled_pair_count=replicate.denominators.scheduled_pairs,
        transition_denominator=replicate.denominators.transition_denominator,
        paired_band_denominator=replicate.denominators.paired_band_denominator,
        transitions=transitions,
        candidate_a_band_differences=a_rows,
        candidate_b_band_differences=b_rows,
        discordant_pair_count=discordant,
        base_first_denominator=order_denominators["BASE"],
        base_first_discordant_count=order_discordant["BASE"],
        counterfactual_first_denominator=order_denominators["CF"],
        counterfactual_first_discordant_count=order_discordant["CF"],
    )
