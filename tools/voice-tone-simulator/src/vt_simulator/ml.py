"""Frozen binary-logit and Bradley--Terry optimization primitives.

All fits are in-memory binary64 damped Newton iterations.  Linear systems use
an explicit QR solve whose R diagonal is normalized positive before backsolve.
"""

from __future__ import annotations

from dataclasses import dataclass
from math import isfinite, log

import numpy as np

from .analysis import GraphDiagnostics


class MlValidationError(ValueError):
    """A model input violates the frozen row, coefficient, or identity contract."""


@dataclass(frozen=True)
class BinaryObservation:
    row_id: str
    design: tuple[float, ...]
    outcome: bool


@dataclass(frozen=True)
class MlFit:
    method_id: str
    attempt_status: str
    reason: str | None
    coefficient_names: tuple[str, ...]
    coefficients: tuple[float, ...]
    iterations: int
    objective: float | None
    maximum_absolute_gradient: float | None
    maximum_absolute_step: float | None


@dataclass(frozen=True)
class ComparisonObservation:
    comparison_id: str
    winner_id: str
    loser_id: str


@dataclass(frozen=True)
class BradleyTerryFit:
    method_id: str
    attempt_status: str
    reason: str | None
    vertices: tuple[str, ...]
    utilities: tuple[float, ...]
    iterations: int
    objective: float | None
    maximum_absolute_gradient: float | None
    maximum_absolute_step: float | None
    sensitivity_only: bool


@dataclass(frozen=True)
class SideOrderObservation:
    row_id: str
    outcome_a: bool
    side_code_a: float
    order_code: float | None
    carryover_code: float | None


@dataclass(frozen=True)
class CoefficientResult:
    name: str
    estimate_status: str
    reason: str | None
    value: float | None


@dataclass(frozen=True)
class SideOrderFit:
    method_id: str
    attempt_status: str
    reason: str | None
    coefficients: tuple[CoefficientResult, ...]
    iterations: int
    objective: float | None


@dataclass(frozen=True)
class OrdinalObservation:
    row_id: str
    raw_band: int
    latent_fit: float


@dataclass(frozen=True)
class OrdinalFit:
    method_id: str
    attempt_status: str
    reason: str | None
    thresholds: tuple[float, ...]
    intercepts: tuple[float, ...]
    slopes: tuple[float, ...]
    iterations: int
    objective: float | None
    maximum_absolute_gradient: float | None
    maximum_absolute_step: float | None


_TOLERANCE = 1.0e-10
_MAXIMUM_ITERATIONS = 200


def _logistic_array(values: np.ndarray) -> np.ndarray:
    result = np.empty_like(values, dtype=np.float64)
    positive = values >= 0.0
    result[positive] = 1.0 / (1.0 + np.exp(-values[positive]))
    exponent = np.exp(values[~positive])
    result[~positive] = exponent / (1.0 + exponent)
    return result


def _objective(
    design: np.ndarray,
    outcomes: np.ndarray,
    coefficients: np.ndarray,
    penalty_information: np.ndarray,
) -> float:
    eta = design @ coefficients
    likelihood = float(np.sum(outcomes * eta - np.logaddexp(0.0, eta)))
    penalty = 0.5 * float(coefficients @ penalty_information @ coefficients)
    return likelihood - penalty


def _positive_diagonal_qr_solve(matrix: np.ndarray, vector: np.ndarray) -> np.ndarray:
    q_matrix, r_matrix = np.linalg.qr(matrix)
    diagonal = np.diag(r_matrix)
    threshold = np.finfo(np.float64).eps * max(1.0, float(np.linalg.norm(matrix, ord=2)))
    if np.any(np.abs(diagonal) <= threshold):
        raise np.linalg.LinAlgError("singular QR diagonal")
    signs = np.where(diagonal < 0.0, -1.0, 1.0)
    q_matrix = q_matrix * signs
    r_matrix = signs[:, None] * r_matrix
    return np.linalg.solve(r_matrix, q_matrix.T @ vector)


def _failed_fit(
    method_id: str,
    coefficient_names: tuple[str, ...],
    iterations: int,
    objective: float | None = None,
    gradient: float | None = None,
    step: float | None = None,
) -> MlFit:
    return MlFit(
        method_id=method_id,
        attempt_status="estimator_failure",
        reason="estimator_nonconvergence",
        coefficient_names=coefficient_names,
        coefficients=(),
        iterations=iterations,
        objective=objective,
        maximum_absolute_gradient=gradient,
        maximum_absolute_step=step,
    )


def _fit_arrays(
    method_id: str,
    coefficient_names: tuple[str, ...],
    design: np.ndarray,
    outcomes: np.ndarray,
    start: np.ndarray,
    penalty_information: np.ndarray,
) -> MlFit:
    coefficients = start.astype(np.float64, copy=True)
    last_step = float("inf")
    for iteration in range(1, _MAXIMUM_ITERATIONS + 1):
        eta = design @ coefficients
        probabilities = _logistic_array(eta)
        weights = probabilities * (1.0 - probabilities)
        gradient_vector = design.T @ (outcomes - probabilities) - penalty_information @ coefficients
        information = (design.T * weights) @ design + penalty_information
        maximum_gradient = float(np.max(np.abs(gradient_vector)))
        try:
            newton_step = _positive_diagonal_qr_solve(information, gradient_vector)
        except np.linalg.LinAlgError:
            return _failed_fit(
                method_id,
                coefficient_names,
                iteration,
                _objective(design, outcomes, coefficients, penalty_information),
                maximum_gradient,
                None,
            )
        if not np.all(np.isfinite(newton_step)):
            return _failed_fit(method_id, coefficient_names, iteration)
        current_objective = _objective(
            design, outcomes, coefficients, penalty_information
        )
        objective_tolerance = (
            128.0 * np.finfo(np.float64).eps * max(1.0, abs(current_objective))
        )
        scale = 1.0
        candidate = coefficients + newton_step
        candidate_objective = _objective(
            design, outcomes, candidate, penalty_information
        )
        while (
            (
                not isfinite(candidate_objective)
                or candidate_objective < current_objective - objective_tolerance
            )
            and scale > 2.0 ** -60
        ):
            scale *= 0.5
            candidate = coefficients + scale * newton_step
            candidate_objective = _objective(
                design, outcomes, candidate, penalty_information
            )
        if (
            not isfinite(candidate_objective)
            or candidate_objective < current_objective - objective_tolerance
        ):
            return _failed_fit(
                method_id,
                coefficient_names,
                iteration,
                current_objective,
                maximum_gradient,
                float(np.max(np.abs(scale * newton_step))),
            )
        last_step = float(np.max(np.abs(scale * newton_step)))
        coefficients = candidate
        updated_probabilities = _logistic_array(design @ coefficients)
        updated_gradient = (
            design.T @ (outcomes - updated_probabilities)
            - penalty_information @ coefficients
        )
        updated_maximum_gradient = float(np.max(np.abs(updated_gradient)))
        if updated_maximum_gradient <= _TOLERANCE and last_step <= _TOLERANCE:
            return MlFit(
                method_id=method_id,
                attempt_status="estimated",
                reason=None,
                coefficient_names=coefficient_names,
                coefficients=tuple(float(value) for value in coefficients),
                iterations=iteration,
                objective=candidate_objective,
                maximum_absolute_gradient=updated_maximum_gradient,
                maximum_absolute_step=last_step,
            )
    return _failed_fit(
        method_id,
        coefficient_names,
        _MAXIMUM_ITERATIONS,
        _objective(design, outcomes, coefficients, penalty_information),
        float(
            np.max(
                np.abs(
                    design.T @ (outcomes - _logistic_array(design @ coefficients))
                    - penalty_information @ coefficients
                )
            )
        ),
        last_step,
    )


def fit_binary_logistic(
    method_id: str,
    coefficient_names: tuple[str, ...],
    observations: tuple[BinaryObservation, ...],
    *,
    start: tuple[float, ...],
) -> MlFit:
    """Fit one unpenalized binary logit with the frozen Newton/QR profile."""

    if not isinstance(method_id, str) or not method_id:
        raise MlValidationError("method_id must be a non-empty string")
    if (
        not coefficient_names
        or len(set(coefficient_names)) != len(coefficient_names)
        or any(not isinstance(value, str) or not value for value in coefficient_names)
    ):
        raise MlValidationError("coefficient names must be unique non-empty strings")
    width = len(coefficient_names)
    if len(start) != width or any(not isfinite(float(value)) for value in start):
        raise MlValidationError("start must match the finite coefficient vector")
    if len(observations) < width:
        raise MlValidationError("binary model has fewer rows than coefficients")
    ids: set[str] = set()
    matrix: list[tuple[float, ...]] = []
    outcomes: list[float] = []
    for row in observations:
        if not isinstance(row.row_id, str) or not row.row_id or row.row_id in ids:
            raise MlValidationError("binary row IDs must be unique non-empty strings")
        ids.add(row.row_id)
        if len(row.design) != width:
            raise MlValidationError("binary design width does not match coefficients")
        if any(not isfinite(float(value)) for value in row.design):
            raise MlValidationError("binary design contains a non-finite value")
        if not isinstance(row.outcome, bool):
            raise MlValidationError("binary outcome must be boolean")
        matrix.append(tuple(float(value) for value in row.design))
        outcomes.append(float(row.outcome))
    return _fit_arrays(
        method_id,
        coefficient_names,
        np.asarray(matrix, dtype=np.float64),
        np.asarray(outcomes, dtype=np.float64),
        np.asarray(start, dtype=np.float64),
        np.zeros((width, width), dtype=np.float64),
    )


def _precheck_fit(method_id: str, reason: str) -> MlFit:
    return MlFit(
        method_id=method_id,
        attempt_status="precheck_undefined",
        reason=reason,
        coefficient_names=("intercept", "slope"),
        coefficients=(),
        iterations=0,
        objective=None,
        maximum_absolute_gradient=None,
        maximum_absolute_step=None,
    )


def fit_calibration_logit(
    rows: tuple[tuple[str, float, bool], ...],
) -> MlFit:
    """Fit A-CAL-LOGIT or return the frozen constant-predictor precheck."""

    if len(rows) < 2:
        raise MlValidationError("calibration logit requires at least two rows")
    transformed: list[BinaryObservation] = []
    predictors: list[float] = []
    for row_id, prediction, event in rows:
        if isinstance(prediction, bool) or not isinstance(prediction, (int, float)):
            raise MlValidationError("calibration prediction must be numeric")
        value = float(prediction)
        if not 0.0 < value < 1.0:
            raise MlValidationError("calibration prediction must be inside (0,1)")
        predictor = log(value) - log(1.0 - value)
        predictors.append(predictor)
        transformed.append(BinaryObservation(row_id, (1.0, predictor), event))
    if max(predictors) == min(predictors):
        return _precheck_fit(
            "A-CAL-LOGIT/design-0.1",
            "constant_prediction_calibration_not_identifiable",
        )
    return fit_binary_logistic(
        "A-CAL-LOGIT/design-0.1",
        ("intercept", "slope"),
        tuple(transformed),
        start=(0.0, 1.0),
    )


def fit_missingness_logit(
    rows: tuple[tuple[str, float, bool], ...],
    *,
    boundary_zero: bool = False,
) -> MlFit:
    """Fit A-CAL-MISS-LOGIT on abs(logit(p_star)) after evaluation unsealing."""

    if boundary_zero:
        if rows:
            raise MlValidationError("MP00 boundary cannot contain missingness-fit rows")
        return _precheck_fit(
            "A-CAL-MISS-LOGIT/design-0.1", "diagnostic_inapplicable_boundary"
        )
    if len(rows) < 2:
        raise MlValidationError("missingness logit requires at least two rows")
    transformed: list[BinaryObservation] = []
    predictors: list[float] = []
    for row_id, sealed_prediction, missing in rows:
        if (
            isinstance(sealed_prediction, bool)
            or not isinstance(sealed_prediction, (int, float))
        ):
            raise MlValidationError("sealed prediction must be numeric")
        value = float(sealed_prediction)
        if not 0.0 < value < 1.0:
            raise MlValidationError("sealed prediction must be inside (0,1)")
        predictor = abs(log(value) - log(1.0 - value))
        predictors.append(predictor)
        transformed.append(BinaryObservation(row_id, (1.0, predictor), missing))
    if max(predictors) == min(predictors):
        return _precheck_fit(
            "A-CAL-MISS-LOGIT/design-0.1", "assignment_aliased"
        )
    return fit_binary_logistic(
        "A-CAL-MISS-LOGIT/design-0.1",
        ("intercept", "slope"),
        tuple(transformed),
        start=(0.0, 0.0),
    )


def fit_side_order_logit(
    rows: tuple[SideOrderObservation, ...],
    *,
    order_aliased: bool,
    include_carryover: bool,
) -> SideOrderFit:
    """Fit identifiable A-SIDEORDER columns and type every removed null."""

    if len(rows) < 2:
        raise MlValidationError("side/order logit requires at least two decisive rows")
    ids: set[str] = set()
    for row in rows:
        if not isinstance(row.row_id, str) or not row.row_id or row.row_id in ids:
            raise MlValidationError("side/order row IDs must be unique strings")
        ids.add(row.row_id)
        if not isinstance(row.outcome_a, bool):
            raise MlValidationError("side/order outcome must be boolean")
        if not isfinite(float(row.side_code_a)):
            raise MlValidationError("side code must be finite")

    active_names = ["intercept"]
    active_columns: list[tuple[float, ...]] = [(1.0,) * len(rows)]
    records: dict[str, CoefficientResult] = {}

    side = tuple(2.0 * float(row.side_code_a) for row in rows)
    if max(side) == min(side):
        records["side"] = CoefficientResult(
            "side", "unsupported", "assignment_aliased", None
        )
    else:
        active_names.append("side")
        active_columns.append(side)

    order_values = tuple(row.order_code for row in rows)
    if all(value is None for value in order_values):
        records["order"] = CoefficientResult(
            "order",
            "unsupported",
            "order_effect_not_identifiable_single_card",
            None,
        )
    elif any(value is None for value in order_values):
        raise MlValidationError("order code must be uniformly present or absent")
    else:
        order = tuple(float(value) for value in order_values if value is not None)
        if order_aliased or max(order) == min(order):
            records["order"] = CoefficientResult(
                "order", "unsupported", "assignment_aliased", None
            )
        else:
            active_names.append("order")
            active_columns.append(order)

    if include_carryover:
        carry_values = tuple(row.carryover_code for row in rows)
        if any(value is None for value in carry_values):
            raise MlValidationError("active carryover column cannot contain null")
        carryover = tuple(float(value) for value in carry_values if value is not None)
        if max(carryover) == min(carryover):
            records["carryover"] = CoefficientResult(
                "carryover", "unsupported", "assignment_aliased", None
            )
        else:
            active_names.append("carryover")
            active_columns.append(carryover)

    observations = tuple(
        BinaryObservation(
            row.row_id,
            tuple(column[index] for column in active_columns),
            row.outcome_a,
        )
        for index, row in enumerate(rows)
    )
    fit = fit_binary_logistic(
        "A-SIDEORDER-LOGIT/design-0.1",
        tuple(active_names),
        observations,
        start=(0.0,) * len(active_names),
    )
    if fit.attempt_status == "estimated":
        for name, value in zip(fit.coefficient_names, fit.coefficients, strict=True):
            records[name] = CoefficientResult(name, "estimated", None, value)
    else:
        for name in active_names:
            records[name] = CoefficientResult(
                name, "invalid", fit.reason, None
            )
    output_order = ["intercept", "side", "order"]
    if include_carryover:
        output_order.append("carryover")
    return SideOrderFit(
        method_id="A-SIDEORDER-LOGIT/design-0.1",
        attempt_status=fit.attempt_status,
        reason=fit.reason,
        coefficients=tuple(records[name] for name in output_order),
        iterations=fit.iterations,
        objective=fit.objective,
    )


def _validated_ordinal_rows(
    rows: tuple[OrdinalObservation, ...], minimum_count: int
) -> tuple[OrdinalObservation, ...]:
    ids: set[str] = set()
    for row in rows:
        if not isinstance(row.row_id, str) or not row.row_id or row.row_id in ids:
            raise MlValidationError("ordinal row IDs must be unique strings")
        ids.add(row.row_id)
        if (
            isinstance(row.raw_band, bool)
            or not isinstance(row.raw_band, int)
            or not 0 <= row.raw_band <= 4
        ):
            raise MlValidationError("raw ordinal band must be an integer in 0..4")
        if not isfinite(float(row.latent_fit)):
            raise MlValidationError("ordinal latent fit must be finite")
    if len(rows) < minimum_count:
        raise MlValidationError("ordinal model has fewer rows than coefficients")
    return rows


def _maximize_custom(
    start: np.ndarray,
    evaluator,
) -> tuple[str, str | None, np.ndarray, int, float | None, float | None, float | None]:
    parameters = start.astype(np.float64, copy=True)
    last_step = float("inf")
    for iteration in range(1, _MAXIMUM_ITERATIONS + 1):
        try:
            objective, gradient, information = evaluator(parameters)
        except (FloatingPointError, ValueError, OverflowError):
            return "estimator_failure", "estimator_nonconvergence", np.array([]), iteration, None, None, None
        if (
            not isfinite(float(objective))
            or not np.all(np.isfinite(gradient))
            or not np.all(np.isfinite(information))
        ):
            return "estimator_failure", "estimator_nonconvergence", np.array([]), iteration, None, None, None
        maximum_gradient = float(np.max(np.abs(gradient)))
        try:
            step = _positive_diagonal_qr_solve(information, gradient)
        except np.linalg.LinAlgError:
            return (
                "estimator_failure",
                "estimator_nonconvergence",
                np.array([]),
                iteration,
                float(objective),
                maximum_gradient,
                None,
            )
        scale = 1.0
        objective_tolerance = (
            128.0 * np.finfo(np.float64).eps * max(1.0, abs(float(objective)))
        )
        candidate = parameters + step
        try:
            candidate_objective = float(evaluator(candidate)[0])
        except (FloatingPointError, ValueError, OverflowError):
            candidate_objective = float("-inf")
        while (
            (
                not isfinite(candidate_objective)
                or candidate_objective < objective - objective_tolerance
            )
            and scale > 2.0 ** -60
        ):
            scale *= 0.5
            candidate = parameters + scale * step
            try:
                candidate_objective = float(evaluator(candidate)[0])
            except (FloatingPointError, ValueError, OverflowError):
                candidate_objective = float("-inf")
        if (
            not isfinite(candidate_objective)
            or candidate_objective < objective - objective_tolerance
        ):
            return (
                "estimator_failure",
                "estimator_nonconvergence",
                np.array([]),
                iteration,
                float(objective),
                maximum_gradient,
                float(np.max(np.abs(scale * step))),
            )
        last_step = float(np.max(np.abs(scale * step)))
        parameters = candidate
        updated_objective, updated_gradient, _ = evaluator(parameters)
        updated_maximum_gradient = float(np.max(np.abs(updated_gradient)))
        if updated_maximum_gradient <= _TOLERANCE and last_step <= _TOLERANCE:
            return (
                "estimated",
                None,
                parameters,
                iteration,
                float(updated_objective),
                updated_maximum_gradient,
                last_step,
            )
    objective, gradient, _ = evaluator(parameters)
    return (
        "estimator_failure",
        "estimator_nonconvergence",
        np.array([]),
        _MAXIMUM_ITERATIONS,
        float(objective),
        float(np.max(np.abs(gradient))),
        last_step,
    )


def _po_thresholds(parameters: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    gaps = np.exp(parameters[1:4])
    thresholds = np.array(
        (
            parameters[0],
            parameters[0] + gaps[0],
            parameters[0] + gaps[0] + gaps[1],
            parameters[0] + gaps[0] + gaps[1] + gaps[2],
        ),
        dtype=np.float64,
    )
    jacobian = np.zeros((5, 5), dtype=np.float64)
    jacobian[:4, 0] = 1.0
    for threshold_index in range(4):
        for gap_index in range(3):
            if gap_index < threshold_index:
                jacobian[threshold_index, gap_index + 1] = gaps[gap_index]
    jacobian[4, 4] = 1.0
    return thresholds, jacobian


def _po_evaluator(rows: tuple[OrdinalObservation, ...]):
    def evaluate(parameters: np.ndarray) -> tuple[float, np.ndarray, np.ndarray]:
        thresholds, jacobian = _po_thresholds(parameters)
        beta = float(parameters[4])
        objective = 0.0
        gradient = np.zeros(5, dtype=np.float64)
        hessian = np.zeros((5, 5), dtype=np.float64)
        gaps = np.exp(parameters[1:4])
        for row in rows:
            z = float(row.latent_fit)
            cumulative = _logistic_array(thresholds - beta * z)
            density = cumulative * (1.0 - cumulative)
            curvature = density * (1.0 - 2.0 * cumulative)
            if row.raw_band == 0:
                signs = ((0, 1.0),)
            elif row.raw_band == 4:
                signs = ((3, -1.0),)
            else:
                signs = ((row.raw_band, 1.0), (row.raw_band - 1, -1.0))
            probability = 1.0 if row.raw_band == 4 else 0.0
            if row.raw_band == 4:
                probability -= cumulative[3]
            else:
                probability = sum(sign * cumulative[index] for index, sign in signs)
            if probability <= 0.0 or not isfinite(float(probability)):
                raise FloatingPointError("nonpositive ordinal probability")
            dp = np.zeros(5, dtype=np.float64)
            d2p = np.zeros((5, 5), dtype=np.float64)
            for index, sign in signs:
                dp[index] += sign * density[index]
                dp[4] += sign * (-z * density[index])
                d2p[index, index] += sign * curvature[index]
                d2p[index, 4] += sign * (-z * curvature[index])
                d2p[4, index] += sign * (-z * curvature[index])
                d2p[4, 4] += sign * (z * z * curvature[index])
            gradient_t = dp / probability
            hessian_t = d2p / probability - np.outer(dp, dp) / (probability * probability)
            gradient_q = jacobian.T @ gradient_t
            hessian_q = jacobian.T @ hessian_t @ jacobian
            for threshold_index in range(4):
                for gap_index in range(3):
                    if gap_index < threshold_index:
                        hessian_q[gap_index + 1, gap_index + 1] += (
                            gradient_t[threshold_index] * gaps[gap_index]
                        )
            objective += log(float(probability))
            gradient += gradient_q
            hessian += hessian_q
        return objective, gradient, -hessian

    return evaluate


def fit_ordinal_proportional_odds(
    rows: tuple[OrdinalObservation, ...],
) -> OrdinalFit:
    """Fit A-ORD-PO-ML with first-threshold plus positive exp-gap parameters."""

    values = _validated_ordinal_rows(rows, 5)
    start = np.asarray(
        (-1.25, log(0.90), log(0.70), log(0.90), 1.0),
        dtype=np.float64,
    )
    status, reason, parameters, iterations, objective, gradient, step = _maximize_custom(
        start, _po_evaluator(values)
    )
    if status != "estimated":
        return OrdinalFit(
            "A-ORD-PO-ML/design-0.1",
            status,
            reason,
            (),
            (),
            (),
            iterations,
            objective,
            gradient,
            step,
        )
    thresholds, _ = _po_thresholds(parameters)
    if not np.all(np.diff(thresholds) > 0.0):
        return OrdinalFit(
            "A-ORD-PO-ML/design-0.1",
            "estimator_failure",
            "estimator_nonconvergence",
            (),
            (),
            (),
            iterations,
            objective,
            gradient,
            step,
        )
    return OrdinalFit(
        "A-ORD-PO-ML/design-0.1",
        "estimated",
        None,
        tuple(float(value) for value in thresholds),
        (),
        (float(parameters[4]),),
        iterations,
        objective,
        gradient,
        step,
    )


def _adjacent_evaluator(rows: tuple[OrdinalObservation, ...]):
    features: list[np.ndarray] = []
    outcomes: list[int] = []
    for row in rows:
        matrix = np.zeros((5, 8), dtype=np.float64)
        for category in range(1, 5):
            matrix[category, :category] = 1.0
            matrix[category, 4 : 4 + category] = float(row.latent_fit)
        features.append(matrix)
        outcomes.append(row.raw_band)

    def evaluate(parameters: np.ndarray) -> tuple[float, np.ndarray, np.ndarray]:
        objective = 0.0
        gradient = np.zeros(8, dtype=np.float64)
        information = np.zeros((8, 8), dtype=np.float64)
        for matrix, outcome in zip(features, outcomes, strict=True):
            logits = matrix @ parameters
            maximum = float(np.max(logits))
            masses = np.exp(logits - maximum)
            probabilities = masses / np.sum(masses)
            mean_feature = probabilities @ matrix
            objective += float(logits[outcome] - maximum - log(float(np.sum(masses))))
            gradient += matrix[outcome] - mean_feature
            centered = matrix - mean_feature
            information += (centered.T * probabilities) @ centered
        return objective, gradient, information

    return evaluate


def fit_ordinal_adjacent(rows: tuple[OrdinalObservation, ...]) -> OrdinalFit:
    """Fit A-ORD-ADJ-ML with four free adjacent intercepts and slopes."""

    values = _validated_ordinal_rows(rows, 8)
    start = np.asarray((0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0), dtype=np.float64)
    status, reason, parameters, iterations, objective, gradient, step = _maximize_custom(
        start, _adjacent_evaluator(values)
    )
    if status != "estimated":
        return OrdinalFit(
            "A-ORD-ADJ-ML/design-0.1",
            status,
            reason,
            (),
            (),
            (),
            iterations,
            objective,
            gradient,
            step,
        )
    return OrdinalFit(
        "A-ORD-ADJ-ML/design-0.1",
        "estimated",
        None,
        (),
        tuple(float(value) for value in parameters[:4]),
        tuple(float(value) for value in parameters[4:]),
        iterations,
        objective,
        gradient,
        step,
    )


def _bt_basis(index: int, vertex_count: int) -> np.ndarray:
    if index == vertex_count - 1:
        return -np.ones(vertex_count - 1, dtype=np.float64)
    result = np.zeros(vertex_count - 1, dtype=np.float64)
    result[index] = 1.0
    return result


def _bt_precheck(
    vertices: tuple[str, ...], method_id: str, reason: str, sensitivity_only: bool
) -> BradleyTerryFit:
    return BradleyTerryFit(
        method_id=method_id,
        attempt_status="precheck_undefined",
        reason=reason,
        vertices=vertices,
        utilities=(),
        iterations=0,
        objective=None,
        maximum_absolute_gradient=None,
        maximum_absolute_step=None,
        sensitivity_only=sensitivity_only,
    )


def fit_bradley_terry(
    vertices: tuple[str, ...],
    comparisons: tuple[ComparisonObservation, ...],
    diagnostics: GraphDiagnostics,
    *,
    ridge_sensitivity: bool = False,
) -> BradleyTerryFit:
    """Fit centered ordinary BT or the separately named ridge sensitivity."""

    if len(vertices) < 2 or tuple(sorted(set(vertices))) != vertices:
        raise MlValidationError("BT vertices must be sorted, unique, and nontrivial")
    vertex_index = {value: index for index, value in enumerate(vertices)}
    if not comparisons:
        raise MlValidationError("BT requires at least one decisive comparison")
    comparison_ids: set[str] = set()
    design_rows: list[np.ndarray] = []
    for row in comparisons:
        if (
            not isinstance(row.comparison_id, str)
            or not row.comparison_id
            or row.comparison_id in comparison_ids
        ):
            raise MlValidationError("comparison IDs must be unique non-empty strings")
        comparison_ids.add(row.comparison_id)
        if row.winner_id not in vertex_index or row.loser_id not in vertex_index:
            raise MlValidationError("comparison references an unknown vertex")
        if row.winner_id == row.loser_id:
            raise MlValidationError("comparison cannot be a self-comparison")
        design_rows.append(
            _bt_basis(vertex_index[row.winner_id], len(vertices))
            - _bt_basis(vertex_index[row.loser_id], len(vertices))
        )

    method_id = (
        "A-BT-RIDGE/design-0.1" if ridge_sensitivity else "A-BT-ML/design-0.1"
    )
    if not diagnostics.recurring_identity:
        return _bt_precheck(
            vertices, method_id, "nonrecurring_entity_identity", ridge_sensitivity
        )
    if not ridge_sensitivity:
        if not diagnostics.observed_directed_strongly_connected:
            return _bt_precheck(
                vertices,
                method_id,
                "observed_graph_not_strongly_connected",
                False,
            )
        if diagnostics.undefeated_vertices or diagnostics.winless_vertices:
            return _bt_precheck(vertices, method_id, "separation_detected", False)

    design = np.vstack(design_rows)
    outcomes = np.ones(len(comparisons), dtype=np.float64)
    width = len(vertices) - 1
    if ridge_sensitivity:
        basis = np.vstack([_bt_basis(index, len(vertices)) for index in range(len(vertices))])
        penalty_information = 0.2 * (basis.T @ basis)
    else:
        penalty_information = np.zeros((width, width), dtype=np.float64)
    fit = _fit_arrays(
        method_id,
        tuple(f"theta_basis_{index}" for index in range(1, len(vertices))),
        design,
        outcomes,
        np.zeros(width, dtype=np.float64),
        penalty_information,
    )
    if fit.attempt_status != "estimated":
        return BradleyTerryFit(
            method_id=method_id,
            attempt_status=fit.attempt_status,
            reason=fit.reason,
            vertices=vertices,
            utilities=(),
            iterations=fit.iterations,
            objective=fit.objective,
            maximum_absolute_gradient=fit.maximum_absolute_gradient,
            maximum_absolute_step=fit.maximum_absolute_step,
            sensitivity_only=ridge_sensitivity,
        )
    leading = np.asarray(fit.coefficients, dtype=np.float64)
    utilities = tuple(float(value) for value in np.concatenate((leading, [-np.sum(leading)])))
    return BradleyTerryFit(
        method_id=method_id,
        attempt_status="estimated",
        reason=None,
        vertices=vertices,
        utilities=utilities,
        iterations=fit.iterations,
        objective=fit.objective,
        maximum_absolute_gradient=fit.maximum_absolute_gradient,
        maximum_absolute_step=fit.maximum_absolute_step,
        sensitivity_only=ridge_sensitivity,
    )
