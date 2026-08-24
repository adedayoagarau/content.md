"""Frozen numerical primitives with explicit domain and failure behavior."""

from __future__ import annotations

from dataclasses import dataclass
from math import exp, floor, isfinite, lgamma, log, log1p, sqrt


class NumericValidationError(ValueError):
    """A numerical request is outside the exact method domain."""


@dataclass(frozen=True)
class IntervalPrimitiveResult:
    status: str
    lower: float | None
    upper: float | None
    reason: str | None
    numerator: int
    denominator: int


def _horner(value: float, coefficients: tuple[float, ...]) -> float:
    result = coefficients[0]
    for coefficient in coefficients[1:]:
        result = result * value + coefficient
    return result


def inverse_normal_as241(probability: float) -> float:
    """Return Wichura AS241's binary64 standard-normal quantile."""

    if isinstance(probability, bool) or not isinstance(probability, (int, float)):
        raise NumericValidationError("probability must be a binary64 number")
    value = float(probability)
    if not 0.0 < value < 1.0:
        raise NumericValidationError("probability must be strictly inside (0,1)")

    q = value - 0.5
    if abs(q) <= 0.425:
        r = 0.180625 - q * q
        numerator = _horner(
            r,
            (
                2.5090809287301226727e3,
                3.3430575583588128105e4,
                6.7265770927008700853e4,
                4.5921953931549871457e4,
                1.3731693765509461125e4,
                1.9715909503065514427e3,
                1.3314166789178437745e2,
                3.3871328727963666080,
            ),
        )
        denominator = _horner(
            r,
            (
                5.2264952788528545610e3,
                2.8729085735721942674e4,
                3.9307895800092710610e4,
                2.1213794301586995867e4,
                5.3941960214247511077e3,
                6.8718700749205790830e2,
                4.2313330701600911252e1,
                1.0,
            ),
        )
        return q * numerator / denominator

    tail_probability = value if q < 0.0 else 1.0 - value
    r = sqrt(-log(tail_probability))
    if r <= 5.0:
        r -= 1.6
        numerator = _horner(
            r,
            (
                7.74545014278341407640e-4,
                2.27238449892691845833e-2,
                2.41780725177450611770e-1,
                1.27045825245236838258,
                3.64784832476320460504,
                5.76949722146069140550,
                4.63033784615654529590,
                1.42343711074968357734,
            ),
        )
        denominator = _horner(
            r,
            (
                1.05075007164441684324e-9,
                5.47593808499534494600e-4,
                1.51986665636164571966e-2,
                1.48103976427480074590e-1,
                6.89767334985100004550e-1,
                1.67638483018380384940,
                2.05319162663775882187,
                1.0,
            ),
        )
    else:
        r -= 5.0
        numerator = _horner(
            r,
            (
                2.01033439929228813265e-7,
                2.71155556874348757815e-5,
                1.24266094738807843860e-3,
                2.65321895265761230930e-2,
                2.96560571828504891230e-1,
                1.78482653991729133580,
                5.46378491116411436990,
                6.65790464350110377720,
            ),
        )
        denominator = _horner(
            r,
            (
                2.04426310338993978564e-15,
                1.42151175831644588870e-7,
                1.84631831751005468180e-5,
                7.86869131145613259100e-4,
                1.48753612908506148525e-2,
                1.36929880922735805310e-1,
                5.99832206555887937690e-1,
                1.0,
            ),
        )
    result = numerator / denominator
    return -result if q < 0.0 else result


def _beta_continued_fraction(alpha: float, beta: float, value: float) -> float:
    """Evaluate the standard incomplete-beta continued fraction in binary64."""

    maximum_iterations = 200
    tolerance = 3.0e-14
    minimum = 1.0e-300
    qab = alpha + beta
    qap = alpha + 1.0
    qam = alpha - 1.0
    c = 1.0
    d = 1.0 - qab * value / qap
    if abs(d) < minimum:
        d = minimum
    d = 1.0 / d
    result = d
    for index in range(1, maximum_iterations + 1):
        even = 2 * index
        coefficient = index * (beta - index) * value / (
            (qam + even) * (alpha + even)
        )
        d = 1.0 + coefficient * d
        if abs(d) < minimum:
            d = minimum
        c = 1.0 + coefficient / c
        if abs(c) < minimum:
            c = minimum
        d = 1.0 / d
        result *= d * c

        coefficient = -(
            (alpha + index)
            * (qab + index)
            * value
            / ((alpha + even) * (qap + even))
        )
        d = 1.0 + coefficient * d
        if abs(d) < minimum:
            d = minimum
        c = 1.0 + coefficient / c
        if abs(c) < minimum:
            c = minimum
        d = 1.0 / d
        delta = d * c
        result *= delta
        if abs(delta - 1.0) <= tolerance:
            return result
    raise NumericValidationError("incomplete-beta continued fraction did not converge")


def _regularized_beta(value: float, alpha: float, beta: float) -> float:
    if value <= 0.0:
        return 0.0
    if value >= 1.0:
        return 1.0
    log_term = (
        lgamma(alpha + beta)
        - lgamma(alpha)
        - lgamma(beta)
        + alpha * log(value)
        + beta * log1p(-value)
    )
    front = exp(log_term)
    if value < (alpha + 1.0) / (alpha + beta + 2.0):
        return front * _beta_continued_fraction(alpha, beta, value) / alpha
    return 1.0 - (
        front
        * _beta_continued_fraction(beta, alpha, 1.0 - value)
        / beta
    )


def inverse_regularized_beta(
    probability: float,
    alpha: float,
    beta: float,
) -> float:
    """Invert the regularized beta CDF by deterministic binary64 bisection."""

    for label, raw in (
        ("probability", probability),
        ("alpha", alpha),
        ("beta", beta),
    ):
        if isinstance(raw, bool) or not isinstance(raw, (int, float)):
            raise NumericValidationError(f"{label} must be a binary64 number")
        if not isfinite(float(raw)):
            raise NumericValidationError(f"{label} must be finite")
    target = float(probability)
    shape_alpha = float(alpha)
    shape_beta = float(beta)
    if not 0.0 < target < 1.0:
        raise NumericValidationError("probability must be strictly inside (0,1)")
    if shape_alpha <= 0.0 or shape_beta <= 0.0:
        raise NumericValidationError("beta shape parameters must be positive")

    lower = 0.0
    upper = 1.0
    for _ in range(200):
        midpoint = (lower + upper) / 2.0
        observed = _regularized_beta(midpoint, shape_alpha, shape_beta)
        if abs(observed - target) <= 1.0e-14:
            return midpoint
        if observed < target:
            lower = midpoint
        else:
            upper = midpoint
    raise NumericValidationError("inverse-beta bisection did not converge")


def wilson_interval(
    successes: int,
    trials: int,
    *,
    z: float = 1.959963984540054,
) -> IntervalPrimitiveResult:
    """Return the frozen two-sided Wilson score interval for one indicator."""

    if (
        isinstance(successes, bool)
        or isinstance(trials, bool)
        or not isinstance(successes, int)
        or not isinstance(trials, int)
        or successes < 0
        or trials < 0
        or successes > trials
    ):
        raise NumericValidationError("successes/trials must satisfy 0 <= successes <= trials")
    if trials == 0:
        if successes != 0:
            raise NumericValidationError("zero trials cannot have successes")
        return IntervalPrimitiveResult("undefined", None, None, "zero_denominator", 0, 0)
    if isinstance(z, bool) or not isinstance(z, (int, float)) or not isfinite(float(z)) or z <= 0:
        raise NumericValidationError("z must be a positive finite binary64 value")
    z_value = float(z)
    proportion = successes / trials
    z_squared = z_value * z_value
    denominator = 1.0 + z_squared / trials
    center = (proportion + z_squared / (2.0 * trials)) / denominator
    half_width = (
        z_value
        * sqrt(
            proportion * (1.0 - proportion) / trials
            + z_squared / (4.0 * trials * trials)
        )
        / denominator
    )
    return IntervalPrimitiveResult(
        "estimated",
        max(0.0, center - half_width),
        min(1.0, center + half_width),
        None,
        successes,
        trials,
    )


def hyndman_fan_type7(values: tuple[float, ...], probability: float) -> float:
    """Return the exact type-7 sample quantile over successful values."""

    if (
        isinstance(probability, bool)
        or not isinstance(probability, (int, float))
        or not 0.0 <= float(probability) <= 1.0
    ):
        raise NumericValidationError("quantile probability must be in [0,1]")
    if not values:
        raise NumericValidationError("quantile requires at least one value")
    ordered: list[float] = []
    for value in values:
        if isinstance(value, bool) or not isinstance(value, (int, float)) or not isfinite(float(value)):
            raise NumericValidationError("quantile values must be finite binary64 numbers")
        ordered.append(float(value))
    ordered.sort()
    if len(ordered) == 1:
        return ordered[0]
    h_zero_based = (len(ordered) - 1) * float(probability)
    lower_index = floor(h_zero_based)
    upper_index = min(lower_index + 1, len(ordered) - 1)
    fraction = h_zero_based - lower_index
    return ordered[lower_index] + fraction * (
        ordered[upper_index] - ordered[lower_index]
    )
