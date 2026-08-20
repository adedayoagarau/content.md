"""Separate Arm-F calibration-case schedule and synthetic event generation."""

from __future__ import annotations

from dataclasses import asdict, dataclass
from math import exp, log

from .canonical import content_hash
from .grid import ScenarioBundle
from .manifest import ValidatedProtocol
from .numerics import inverse_normal_as241, inverse_regularized_beta
from .process import solve_intercept
from .streams import ConsumptionRecord, StreamCoordinates, StreamRegistry, derive_stream


class CalibrationValidationError(ValueError):
    """A calibration request violates the exact Arm-F candidate contract."""


@dataclass(frozen=True)
class CalibrationCase:
    case_id: str
    context_occurrence_id: str
    family_id: str
    pair_id: str
    card_id: str
    rater_id: str
    candidate_suffix: str
    candidate_id: str
    split: str
    profile_id: str
    event_id: str


@dataclass(frozen=True)
class CalibrationSchedule:
    scenario_parameter_hash: str
    status: str
    reason: str | None
    cases: tuple[CalibrationCase, ...]
    schedule_hash: str


@dataclass(frozen=True)
class CalibrationPredictionTransform:
    p_star: float
    epsilon: float
    clipped: bool


@dataclass(frozen=True)
class CalibrationCaseResult:
    case_id: str
    context_occurrence_id: str
    family_id: str
    pair_id: str
    card_id: str
    rater_id: str
    candidate_id: str
    event_id: str
    prediction_status: str
    prediction_value: float | None
    observed_event_status: str
    observed_event_value: bool
    raw_band: int
    prediction_record_ordinal: int
    event_record_ordinal: int
    prediction_precedes_event: bool


@dataclass(frozen=True)
class CalibrationTruth:
    case_id: str
    sealed_pi: float
    sealed_p_star: float
    seal_state: str


@dataclass(frozen=True)
class CalibrationMissingnessLedger:
    profile_id: str
    target_rate: float
    solver_status: str
    intercept: float | None
    mean_probability: float
    missing_count: int
    case_count: int


@dataclass(frozen=True)
class CalibrationReplicate:
    protocol_id: str
    scenario_parameter_hash: str
    replicate_index: int
    schedule_hash: str
    case_results: tuple[CalibrationCaseResult, ...]
    truth_records: tuple[CalibrationTruth, ...]
    stream_receipts: tuple[ConsumptionRecord, ...]
    missingness: CalibrationMissingnessLedger
    oracle_probability_clip_count: int
    prediction_clip_count: int
    record_hash: str

    def hash_preimage(self) -> dict[str, object]:
        value = asdict(self)
        del value["record_hash"]
        return value


_VARIABLE_FACTORS = frozenset(
    {
        "base_rate",
        "calibration_profile",
        "heldout_count",
        "minimum_event_count",
        "missing_prediction_rate",
    }
)
_PROFILE_PARAMETERS = {
    "K1-INTERCEPT": (0.75, 1.0, 0.0),
    "K2-UNDERFIT": (0.0, 0.60, 0.10),
    "K3-OVERCONFIDENT": (0.0, 1.80, 0.10),
    "K5-INVERTED": (0.0, -1.0, 0.10),
}
_LOWER_PROBABILITY = 0.000001
_UPPER_PROBABILITY = 0.999999


def _clip_probability(value: float) -> tuple[float, bool]:
    clipped = min(max(float(value), _LOWER_PROBABILITY), _UPPER_PROBABILITY)
    return clipped, clipped != value


def _logistic(value: float) -> float:
    if value >= 0.0:
        inverse = exp(-value)
        return 1.0 / (1.0 + inverse)
    direct = exp(value)
    return direct / (1.0 + direct)


def _logit(value: float) -> float:
    return log(value) - log(1.0 - value)


def _selection_object(
    selections: dict[str, object], key: str, expected_keys: set[str]
) -> dict[str, object]:
    value = selections.get(key)
    if not isinstance(value, dict) or set(value) != expected_keys:
        raise CalibrationValidationError(f"{key} has an invalid exact shape")
    return value


def _validate_scenario(
    protocol: ValidatedProtocol, scenario: ScenarioBundle
) -> dict[str, object]:
    if content_hash(scenario.preimage) != scenario.scenario_parameter_hash:
        raise CalibrationValidationError("scenario hash does not match its preimage")
    if scenario.scenario_id != f"SIM-{scenario.scenario_parameter_hash[:20]}":
        raise CalibrationValidationError("scenario ID does not match its full hash")
    if scenario.preimage.get("target_id") != "T-FIXED-FIXED" or scenario.preimage.get(
        "target_population_kind"
    ) != "fixed_messages_fixed_panel":
        raise CalibrationValidationError("Arm F requires the exact fixed target")
    selections = scenario.preimage.get("factor_selections")
    if not isinstance(selections, dict) or set(selections) != set(protocol.factor_order):
        raise CalibrationValidationError("scenario factor selections are invalid")
    for key in protocol.factor_order:
        if key not in _VARIABLE_FACTORS and key != "coverage":
            if selections[key] != protocol.baseline[key]:
                raise CalibrationValidationError(
                    f"Arm F does not permit changing {key}"
                )
    coverage = _selection_object(
        selections,
        "coverage",
        {"id", "calibration", "public_test", "total"},
    )
    if coverage not in (
        protocol.baseline["coverage"],
        {"calibration": 1, "id": "C1", "public_test": 0, "total": 1},
    ):
        raise CalibrationValidationError("Arm F retains C10 except for the C1 no-scope guard")
    return selections


def build_calibration_schedule(
    protocol: ValidatedProtocol, scenario: ScenarioBundle
) -> CalibrationSchedule:
    """Build the exact candidate-specific Arm-F schedule or its no-scope record."""

    selections = _validate_scenario(protocol, scenario)
    coverage = _selection_object(
        selections,
        "coverage",
        {"id", "calibration", "public_test", "total"},
    )
    heldout = _selection_object(selections, "heldout_count", {"id", "value"})
    count = heldout["value"]
    if isinstance(count, bool) or not isinstance(count, int) or count < 1:
        raise CalibrationValidationError("heldout_count.value must be a positive integer")
    public_test = coverage["public_test"]
    calibration = coverage["calibration"]
    total = coverage["total"]
    if any(isinstance(value, bool) or not isinstance(value, int) for value in (public_test, calibration, total)):
        raise CalibrationValidationError("coverage counts must be integers")
    if calibration + public_test != total:
        raise CalibrationValidationError("coverage counts do not reconcile")
    if public_test == 0:
        preimage = {
            "cases": [],
            "reason": "insufficient_card_coverage",
            "scenario_parameter_hash": scenario.scenario_parameter_hash,
            "status": "unsupported_scope",
        }
        return CalibrationSchedule(
            scenario.scenario_parameter_hash,
            "unsupported_scope",
            "insufficient_card_coverage",
            (),
            content_hash(preimage),
        )

    profile_id = selections.get("calibration_profile")
    if not isinstance(profile_id, str):
        raise CalibrationValidationError("calibration profile must be a string")
    units: list[tuple[int, int, int, str]] = []
    for family in range(calibration + 1, total + 1):
        for card in range(1, 5):
            for rater in range(1, 4):
                for suffix in ("A", "B"):
                    units.append((family, card, rater, suffix))
    if len(units) != 96:
        raise CalibrationValidationError("Arm-F unit cycle must contain exactly 96 units")

    cases: list[CalibrationCase] = []
    for index in range(1, count + 1):
        family, card, rater, suffix = units[(index - 1) % len(units)]
        cases.append(
            CalibrationCase(
                case_id=f"SCASE-{index:06d}",
                context_occurrence_id=f"SCTX-{1 + (index - 1) // len(units):06d}",
                family_id=f"SMSG-{family:04d}",
                pair_id=f"SPAIR-{family:04d}",
                card_id=f"SCARD-{card:04d}",
                rater_id=f"SRATER-{rater:04d}",
                candidate_suffix=suffix,
                candidate_id=f"SCAND-{family:04d}-{suffix}",
                split="public_test",
                profile_id=profile_id,
                event_id=f"E_mismatch/SCARD-{card:04d}/design-0.1",
            )
        )
    frozen = tuple(cases)
    preimage = {
        "cases": [asdict(row) for row in frozen],
        "reason": None,
        "scenario_parameter_hash": scenario.scenario_parameter_hash,
        "status": "scheduled",
    }
    return CalibrationSchedule(
        scenario.scenario_parameter_hash,
        "scheduled",
        None,
        frozen,
        content_hash(preimage),
    )


def transform_calibration_prediction(
    profile_id: str,
    *,
    pi: float,
    base_rate: float,
    error_uniform: float,
) -> CalibrationPredictionTransform:
    """Apply one exact K0..K6 would-be-prediction transformation."""

    for label, value in (("pi", pi), ("base_rate", base_rate), ("error_uniform", error_uniform)):
        if isinstance(value, bool) or not isinstance(value, (int, float)):
            raise CalibrationValidationError(f"{label} must be numeric")
    pi_value = float(pi)
    q = float(base_rate)
    draw = float(error_uniform)
    if not _LOWER_PROBABILITY <= pi_value <= _UPPER_PROBABILITY:
        raise CalibrationValidationError("pi must already satisfy the sealed clip")
    if not 0.0 < q < 1.0 or not 0.0 < draw < 1.0:
        raise CalibrationValidationError("base rate and error uniform must be inside (0,1)")

    epsilon = 0.0
    if profile_id in {"K0-CALIBRATED", "K6-MISSING-INFORMATIVE"}:
        raw = pi_value
    elif profile_id == "K4-LOW-RESOLUTION":
        raw = q
    elif profile_id in _PROFILE_PARAMETERS:
        intercept, slope, sigma = _PROFILE_PARAMETERS[profile_id]
        epsilon = sigma * inverse_normal_as241(draw)
        raw = _logistic(intercept + slope * _logit(pi_value) + epsilon)
    else:
        raise CalibrationValidationError("unknown calibration profile")
    clipped, did_clip = _clip_probability(raw)
    return CalibrationPredictionTransform(clipped, epsilon, did_clip)


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
            protocol.protocol_id,
            protocol.master_seed_hex,
            scenario.scenario_parameter_hash,
            protocol.population_block_hash,
            str(replicate_index),
            stream_name,
            target_id,
            purposes,
        ),
        registry=registry,
    )
    values = {purpose: stream.uniform(purpose) for purpose in purposes}
    return values, stream.close()


def generate_calibration_replicate(
    protocol: ValidatedProtocol,
    scenario: ScenarioBundle,
    *,
    replicate_index: int,
) -> CalibrationReplicate:
    """Generate one bounded Arm-F calibration replicate entirely in memory."""

    if (
        isinstance(replicate_index, bool)
        or not isinstance(replicate_index, int)
        or not 1 <= replicate_index <= 1000
    ):
        raise CalibrationValidationError("bounded replicate_index must be in 1..1000")
    selections = _validate_scenario(protocol, scenario)
    schedule = build_calibration_schedule(protocol, scenario)
    if schedule.status != "scheduled":
        raise CalibrationValidationError("unsupported-scope calibration has no replicate")
    case_ids = tuple(row.case_id for row in schedule.cases)
    target_id = str(scenario.preimage["target_id"])
    registry = StreamRegistry()
    event_purposes = tuple(
        f"{case_id}:{field}"
        for case_id in case_ids
        for field in ("oracle_probability", "observed_event")
    )
    event_draws, event_receipt = _draw_stream(
        protocol,
        scenario,
        replicate_index,
        "event",
        target_id,
        event_purposes,
        registry,
    )
    prediction_purposes = tuple(
        f"{case_id}:{field}"
        for case_id in case_ids
        for field in ("error", "missingness")
    )
    prediction_draws, prediction_receipt = _draw_stream(
        protocol,
        scenario,
        replicate_index,
        "prediction",
        target_id,
        prediction_purposes,
        registry,
    )

    base_rate_level = _selection_object(selections, "base_rate", {"id", "value"})
    missing_level = _selection_object(
        selections, "missing_prediction_rate", {"id", "value"}
    )
    raw_q = base_rate_level["value"]
    raw_missing = missing_level["value"]
    if not isinstance(raw_q, str) or not isinstance(raw_missing, str):
        raise CalibrationValidationError("rate values must be decimal strings")
    q = float(raw_q)
    target_missing = float(raw_missing)
    profile_id = str(selections["calibration_profile"])

    sealed: list[tuple[float, float, bool, bool]] = []
    oracle_clip_count = 0
    prediction_clip_count = 0
    for case in schedule.cases:
        pi_raw = inverse_regularized_beta(
            event_draws[f"{case.case_id}:oracle_probability"],
            2.0 * q,
            2.0 * (1.0 - q),
        )
        pi, pi_clipped = _clip_probability(pi_raw)
        transform = transform_calibration_prediction(
            profile_id,
            pi=pi,
            base_rate=q,
            error_uniform=prediction_draws[f"{case.case_id}:error"],
        )
        observed = event_draws[f"{case.case_id}:observed_event"] < pi
        sealed.append((pi, transform.p_star, observed, transform.clipped))
        oracle_clip_count += int(pi_clipped)
        prediction_clip_count += int(transform.clipped)

    predictors = tuple(abs(_logit(p_star)) for _, p_star, _, _ in sealed)
    if target_missing == 0.0:
        solver_status = "boundary_zero"
        intercept = None
        mean_probability = 0.0
        missing_probabilities = (0.0,) * len(sealed)
    elif profile_id == "K6-MISSING-INFORMATIVE":
        solver = solve_intercept(target_missing, predictors)
        if solver.status != "solved" or solver.intercept is None or solver.mean_probability is None:
            raise CalibrationValidationError("intercept_solver_failure")
        solver_status = solver.status
        intercept = solver.intercept
        mean_probability = solver.mean_probability
        missing_probabilities = tuple(
            _logistic(intercept + predictor) for predictor in predictors
        )
    else:
        solver_status = "fixed_probability"
        intercept = None
        mean_probability = target_missing
        missing_probabilities = (target_missing,) * len(sealed)

    results: list[CalibrationCaseResult] = []
    truths: list[CalibrationTruth] = []
    missing_count = 0
    for index, (case, truth, missing_probability) in enumerate(
        zip(schedule.cases, sealed, missing_probabilities, strict=True), start=1
    ):
        pi, p_star, observed, _ = truth
        missing = (
            prediction_draws[f"{case.case_id}:missingness"] < missing_probability
        )
        missing_count += int(missing)
        raw_band = (index - 1) % 2 if observed else 2 + ((index - 1) % 3)
        results.append(
            CalibrationCaseResult(
                case.case_id,
                case.context_occurrence_id,
                case.family_id,
                case.pair_id,
                case.card_id,
                case.rater_id,
                case.candidate_id,
                case.event_id,
                "abstained" if missing else "predicted_uncalibrated",
                None if missing else p_star,
                "observed",
                observed,
                raw_band,
                2 * (index - 1),
                2 * (index - 1) + 1,
                True,
            )
        )
        truths.append(CalibrationTruth(case.case_id, pi, p_star, "sealed"))

    missingness = CalibrationMissingnessLedger(
        profile_id=profile_id,
        target_rate=target_missing,
        solver_status=solver_status,
        intercept=intercept,
        mean_probability=mean_probability,
        missing_count=missing_count,
        case_count=len(schedule.cases),
    )
    fields: dict[str, object] = {
        "protocol_id": protocol.protocol_id,
        "scenario_parameter_hash": scenario.scenario_parameter_hash,
        "replicate_index": replicate_index,
        "schedule_hash": schedule.schedule_hash,
        "case_results": tuple(results),
        "truth_records": tuple(truths),
        "stream_receipts": (event_receipt, prediction_receipt),
        "missingness": missingness,
        "oracle_probability_clip_count": oracle_clip_count,
        "prediction_clip_count": prediction_clip_count,
    }
    hash_preimage = {
        key: [asdict(row) for row in value]
        if isinstance(value, tuple) and value and hasattr(value[0], "__dataclass_fields__")
        else asdict(value)
        if hasattr(value, "__dataclass_fields__")
        else value
        for key, value in fields.items()
    }
    return CalibrationReplicate(
        **fields,
        record_hash=content_hash(hash_preimage),
    )  # type: ignore[arg-type]
