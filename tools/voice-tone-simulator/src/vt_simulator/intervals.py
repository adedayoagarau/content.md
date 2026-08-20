"""Frozen interval selection and resampling primitives."""

from __future__ import annotations

from collections import Counter
from dataclasses import dataclass
from math import floor, isfinite, sqrt

from .numerics import hyndman_fan_type7


class IntervalValidationError(ValueError):
    """An interval request violates target, method, or resample ownership."""


@dataclass(frozen=True)
class IntervalContract:
    target_population_kind: str
    interval_status: str
    reason: str | None
    method_id: str | None
    diagnostic_only: bool


@dataclass(frozen=True)
class PercentileInterval:
    method_id: str
    interval_status: str
    reason: str | None
    confidence_level: float | None
    lower: float | None
    upper: float | None
    successful_resample_count: int
    failed_resample_count: int


@dataclass(frozen=True)
class ClusterResamplePlan:
    method_id: str
    family_multiplicities: tuple[tuple[str, int], ...]
    rater_multiplicities: tuple[tuple[str, int], ...]
    draw_count: int

    def record_weight(self, family_id: str, rater_id: str) -> int:
        families = dict(self.family_multiplicities)
        raters = dict(self.rater_multiplicities)
        if family_id not in families or rater_id not in raters:
            raise IntervalValidationError("record references an unknown resample unit")
        return families[family_id] * raters[rater_id]


@dataclass(frozen=True)
class NaiveWaldInterval:
    method_id: str
    interval_status: str
    confidence_level: float
    lower: float
    upper: float
    diagnostic_only: bool


_TARGET_METHODS = {
    "new_messages_fixed_panel": "I-MESSAGE-PCT/design-0.1",
    "fixed_messages_rater_population": "I-RATER-PCT/design-0.1",
    "new_messages_rater_population": "I-CROSSED-PCT/design-0.1",
}
_PERCENTILE_METHODS = {
    "I-FIXED-PARAM-PCT/design-0.1",
    "I-MESSAGE-PCT/design-0.1",
    "I-RATER-PCT/design-0.1",
    "I-CROSSED-PCT/design-0.1",
}


def interval_contract(
    target_population_kind: str,
    *,
    modeled_coefficient: bool,
    naive_mismatch_control: bool = False,
) -> IntervalContract:
    """Select one exact method or preserve the fixed-target method gap."""

    valid_targets = {"fixed_messages_fixed_panel", *_TARGET_METHODS}
    if target_population_kind not in valid_targets:
        raise IntervalValidationError("unknown target population kind")
    if naive_mismatch_control:
        return IntervalContract(
            target_population_kind,
            "eligible",
            None,
            "I-NAIVE-WALD/design-0.1",
            True,
        )
    if target_population_kind == "fixed_messages_fixed_panel":
        if modeled_coefficient:
            return IntervalContract(
                target_population_kind,
                "eligible",
                None,
                "I-FIXED-PARAM-PCT/design-0.1",
                False,
            )
        return IntervalContract(
            target_population_kind,
            "unsupported_scope",
            "unsupported_target_scope",
            None,
            False,
        )
    return IntervalContract(
        target_population_kind,
        "eligible",
        None,
        _TARGET_METHODS[target_population_kind],
        False,
    )


def percentile_interval(
    successful_values: tuple[float, ...],
    *,
    method_id: str,
    failed_resample_count: int,
) -> PercentileInterval:
    """Apply the 1,999-resample failure limit and type-7 endpoints."""

    if method_id not in _PERCENTILE_METHODS:
        raise IntervalValidationError("method is not a frozen percentile interval")
    if (
        isinstance(failed_resample_count, bool)
        or not isinstance(failed_resample_count, int)
        or failed_resample_count < 0
    ):
        raise IntervalValidationError("failed resample count must be nonnegative")
    if len(successful_values) + failed_resample_count != 1999:
        raise IntervalValidationError("successful and failed resamples must total 1,999")
    values = tuple(float(value) for value in successful_values)
    if any(not isfinite(value) for value in values):
        raise IntervalValidationError("successful resample values must be finite")
    if failed_resample_count >= 100:
        return PercentileInterval(
            method_id,
            "undefined",
            "failed_resample_limit",
            None,
            None,
            None,
            len(values),
            failed_resample_count,
        )
    if not values:
        raise IntervalValidationError("an estimated percentile interval needs successes")
    return PercentileInterval(
        method_id,
        "estimated",
        None,
        0.95,
        hyndman_fan_type7(values, 0.025),
        hyndman_fan_type7(values, 0.975),
        len(values),
        failed_resample_count,
    )


def _validated_units(values: tuple[str, ...], label: str) -> tuple[str, ...]:
    if not values or any(not isinstance(value, str) or not value for value in values):
        raise IntervalValidationError(f"{label} must be non-empty string IDs")
    if tuple(sorted(set(values))) != values:
        raise IntervalValidationError(f"{label} must be sorted and unique")
    return values


def _multiplicities(units: tuple[str, ...], draws: tuple[float, ...]) -> tuple[tuple[str, int], ...]:
    if len(draws) != len(units):
        raise IntervalValidationError("resample draw count does not match unit count")
    selected: Counter[str] = Counter()
    for draw in draws:
        if isinstance(draw, bool) or not isinstance(draw, (int, float)):
            raise IntervalValidationError("resample draw must be numeric")
        value = float(draw)
        if not 0.0 <= value < 1.0:
            raise IntervalValidationError("resample draw must be in [0,1)")
        selected[units[floor(len(units) * value)]] += 1
    return tuple((unit, selected[unit]) for unit in units)


def cluster_resample_plan(
    method_id: str,
    family_ids: tuple[str, ...],
    rater_ids: tuple[str, ...],
    draws: tuple[float, ...],
) -> ClusterResamplePlan:
    """Map sorted cluster draws through j=1+floor(n*u)."""

    families = _validated_units(family_ids, "family IDs")
    raters = _validated_units(rater_ids, "rater IDs")
    if method_id == "I-MESSAGE-PCT/design-0.1":
        family_multiplicities = _multiplicities(families, draws)
        rater_multiplicities = tuple((value, 1) for value in raters)
    elif method_id == "I-RATER-PCT/design-0.1":
        family_multiplicities = tuple((value, 1) for value in families)
        rater_multiplicities = _multiplicities(raters, draws)
    elif method_id == "I-CROSSED-PCT/design-0.1":
        expected = len(families) + len(raters)
        if len(draws) != expected:
            raise IntervalValidationError("crossed resample requires F plus R draws")
        family_multiplicities = _multiplicities(families, draws[: len(families)])
        rater_multiplicities = _multiplicities(raters, draws[len(families) :])
    else:
        raise IntervalValidationError("method is not an identity-resampling interval")
    return ClusterResamplePlan(
        method_id,
        family_multiplicities,
        rater_multiplicities,
        len(draws),
    )


def naive_wald_interval(proportion: float, denominator: int) -> NaiveWaldInterval:
    """Return the deliberately un-clipped Arm-E mismatch interval."""

    if isinstance(proportion, bool) or not isinstance(proportion, (int, float)):
        raise IntervalValidationError("proportion must be numeric")
    value = float(proportion)
    if not 0.0 <= value <= 1.0:
        raise IntervalValidationError("proportion must be in [0,1]")
    if isinstance(denominator, bool) or not isinstance(denominator, int) or denominator < 1:
        raise IntervalValidationError("denominator must be a positive integer")
    half_width = 1.959963984540054 * sqrt(value * (1.0 - value) / denominator)
    return NaiveWaldInterval(
        "I-NAIVE-WALD/design-0.1",
        "estimated",
        0.95,
        value - half_width,
        value + half_width,
        True,
    )
