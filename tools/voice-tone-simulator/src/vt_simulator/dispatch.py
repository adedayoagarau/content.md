"""Exhaustive estimand, arm-method, and interval dispatch tables."""

from __future__ import annotations

from dataclasses import dataclass

from .intervals import interval_contract


class DispatchValidationError(ValueError):
    """A requested estimand, arm, profile, or target has no frozen dispatch."""


@dataclass(frozen=True)
class AnalysisDispatch:
    arm_id: str
    primary_method_ids: tuple[str, ...]
    sensitivity_method_ids: tuple[str, ...]
    interval_status: str
    interval_reason: str | None
    interval_method_ids: tuple[str, ...]


_ESTIMAND_DISPOSITIONS = {
    "EST-01": "design_supported",
    "EST-02": "design_supported",
    "EST-03": "requires_cognitive_validation",
    "EST-04": "requires_cognitive_validation",
    "EST-05": "requires_pilot_data",
    "EST-06": "requires_simulation",
    "EST-07": "unsupported",
    "EST-08": "unsupported",
    "EST-09": "requires_cognitive_validation",
    "EST-10": "unsupported",
    "EST-11": "unsupported",
}
_ORDINAL_PROFILES = {
    "OM0-CORRECT-PO",
    "OM1-NONPROPORTIONAL",
    "OM2-ADJACENT",
    "OM3-SPARSE",
}
_CALIBRATION_PROFILES = {
    "K0-CALIBRATED",
    "K1-INTERCEPT",
    "K2-UNDERFIT",
    "K3-OVERCONFIDENT",
    "K4-LOW-RESOLUTION",
    "K5-INVERTED",
    "K6-MISSING-INFORMATIVE",
}
_SIMPLE_METHODS = {
    "ARM-A-OUTCOME": ("A-CAT-PROP/design-0.1", "A-ALPHA-NOM/design-0.1"),
    "ARM-B-COVERAGE": ("A-CAT-PROP/design-0.1", "A-ALPHA-NOM/design-0.1"),
    "ARM-C-ALLOCATION": ("A-SIDEORDER-LOGIT/design-0.1",),
    "ARM-D-GRAPH": ("A-BT-ML/design-0.1",),
    "ARM-E-INTERVAL": ("A-CAT-PROP/design-0.1",),
    "ARM-I-PROCESS": ("A-CAT-PROP/design-0.1",),
    "ARM-K-COUNTERFACTUAL": ("A-CF-PAIRED/design-0.1",),
}
_ALL_ARMS = {*_SIMPLE_METHODS, "ARM-F-CALIBRATION", "ARM-J-HETEROGENEITY-ORDINAL"}
_MODELED_ARMS = {
    "ARM-C-ALLOCATION",
    "ARM-D-GRAPH",
    "ARM-F-CALIBRATION",
    "ARM-J-HETEROGENEITY-ORDINAL",
}
_ARM_E_INTERVALS = (
    "I-CROSSED-PCT/design-0.1",
    "I-MESSAGE-PCT/design-0.1",
    "I-RATER-PCT/design-0.1",
    "I-NAIVE-WALD/design-0.1",
)


def terminal_disposition(estimand_id: str) -> str:
    try:
        return _ESTIMAND_DISPOSITIONS[estimand_id]
    except KeyError as error:
        raise DispatchValidationError("unknown estimand ID") from error


def analysis_dispatch(
    arm_id: str,
    *,
    target_population_kind: str,
    ordinal_profile: str,
    calibration_profile: str,
) -> AnalysisDispatch:
    """Return the complete pre-result method set for one exact arm cell."""

    if arm_id not in _ALL_ARMS:
        raise DispatchValidationError("unknown analysis arm")
    if ordinal_profile not in _ORDINAL_PROFILES:
        raise DispatchValidationError("unknown ordinal profile")
    if calibration_profile not in _CALIBRATION_PROFILES:
        raise DispatchValidationError("unknown calibration profile")

    if arm_id == "ARM-F-CALIBRATION":
        primary = ("A-CAL-LOGIT/design-0.1",)
        if calibration_profile == "K6-MISSING-INFORMATIVE":
            primary += ("A-CAL-MISS-LOGIT/design-0.1",)
    elif arm_id == "ARM-J-HETEROGENEITY-ORDINAL":
        ordinal_method = (
            "A-ORD-PO-ML/design-0.1"
            if ordinal_profile == "OM0-CORRECT-PO"
            else "A-ORD-ADJ-ML/design-0.1"
        )
        primary = ("A-ALPHA-ORD/design-0.1", ordinal_method)
    else:
        primary = _SIMPLE_METHODS[arm_id]

    sensitivities = (
        ("A-BT-RIDGE/design-0.1",) if arm_id == "ARM-D-GRAPH" else ()
    )
    if arm_id == "ARM-E-INTERVAL":
        matching = interval_contract(
            target_population_kind, modeled_coefficient=False
        )
        status = matching.interval_status
        reason = matching.reason
        interval_methods = _ARM_E_INTERVALS
    else:
        contract = interval_contract(
            target_population_kind,
            modeled_coefficient=arm_id in _MODELED_ARMS,
        )
        status = contract.interval_status
        reason = contract.reason
        interval_methods = (() if contract.method_id is None else (contract.method_id,))
    return AnalysisDispatch(
        arm_id=arm_id,
        primary_method_ids=primary,
        sensitivity_method_ids=sensitivities,
        interval_status=status,
        interval_reason=reason,
        interval_method_ids=interval_methods,
    )
