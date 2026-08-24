"""Closed scientific record families and cross-record validation."""

from __future__ import annotations

from dataclasses import dataclass
import math
from typing import Annotated, Any, Literal

from pydantic import Field, ValidationError as PydanticValidationError, model_validator

from .canonical import CanonicalizationError, canonical_bytes, content_hash, verify_record_hash
from .models import HashedRecord, LowercaseSha256, StrictRecord


class RecordSetValidationError(ValueError):
    """A record type, identity, reference, or set invariant is invalid."""


NonEmptyString = Annotated[str, Field(min_length=1)]
NonNegativeInt = Annotated[int, Field(ge=0)]
Band = Annotated[int, Field(ge=0, le=4)]
Probability = Annotated[float, Field(ge=0.0, le=1.0, allow_inf_nan=False)]
FiniteFloat = Annotated[float, Field(allow_inf_nan=False)]
DecimalIndex = Annotated[str, Field(pattern=r"^(0|[1-9][0-9]*)$")]


RunValidityReason = Literal[
    "source_hash_mismatch",
    "protocol_hash_mismatch",
    "implementation_hash_mismatch",
    "runtime_manifest_unfrozen",
    "scenario_grid_mismatch",
    "duplicate_record_id",
    "scenario_id_collision",
    "prng_conformance_failure",
    "random_stream_reuse",
    "canonicalization_failure",
    "nonfinite_serialized_value",
    "negative_control_mismatch",
    "intercept_solver_failure",
    "held_out_leakage",
    "split_overlap",
    "leakage_guard_failure",
    "prohibited_input",
    "unrecorded_exclusion",
    "denominator_mismatch",
    "record_overwrite",
    "missing_provenance",
    "graph_guard_contradiction",
    "status_value_union_violation",
]
EstimateReason = Literal[
    "simulation_not_run",
    "zero_denominator",
    "minimum_event_profile_not_met",
    "diagnostic_inapplicable_boundary",
    "constant_prediction_calibration_not_identifiable",
    "expected_disagreement_nonpositive",
    "insufficient_card_coverage",
    "nonrecurring_entity_identity",
    "observed_graph_not_strongly_connected",
    "separation_detected",
    "assignment_aliased",
    "order_effect_not_identifiable_single_card",
    "estimator_nonconvergence",
    "unsupported_estimand_scope",
    "invalid_run_propagated",
]
TruthReason = Literal[
    "simulation_not_run",
    "misspecified_model_no_scalar_truth",
    "reference_precision_unmet",
    "descriptive_only",
    "invalid_run_propagated",
]
ProbabilityReason = Literal[
    "simulation_not_run",
    "predictor_abstained",
    "unsupported_event_scope",
    "prediction_generated_after_outcome",
    "event_not_observed",
    "observed_event_abstained",
    "invalid_observed_event",
    "held_out_leakage",
    "invalid_run_propagated",
]
IntervalReason = Literal[
    "simulation_not_run",
    "estimate_undefined",
    "unsupported_target_scope",
    "insufficient_effective_clusters",
    "failed_resample_limit",
    "invalid_run_propagated",
]


class ScientificRecord(HashedRecord):
    """Immutable common envelope shared by every record family."""

    schema_version: NonEmptyString
    record_type: NonEmptyString
    protocol_hash: LowercaseSha256
    implementation_hash: LowercaseSha256
    runtime_manifest_hash: LowercaseSha256
    source_manifest_hash: LowercaseSha256
    stream_id: NonEmptyString
    record_ordinal: NonNegativeInt
    input_refs: tuple[LowercaseSha256, ...]
    record_hash_algorithm: Literal["sha256"]

    @model_validator(mode="after")
    def validate_input_reference_order(self) -> "ScientificRecord":
        if tuple(sorted(set(self.input_refs))) != self.input_refs:
            raise ValueError("input_refs must be sorted and unique")
        return self


class SimulationDesignRecord(ScientificRecord):
    schema_version: Literal["vt-sim-design-record/0.1"]
    record_type: Literal["SimulationDesignRecord"]
    design_id: NonEmptyString
    scenario_grid_id: NonEmptyString
    generating_profile_id: NonEmptyString
    math_profile_id: NonEmptyString
    analysis_profile_id: NonEmptyString
    schedule_profile_id: NonEmptyString
    record_profile_id: NonEmptyString
    execution_status: Literal["not_started", "candidate_conformance_only", "complete"]
    authority: Literal["none"]


class ScenarioRecord(ScientificRecord):
    schema_version: Literal["vt-sim-scenario-record/0.1"]
    record_type: Literal["ScenarioRecord"]
    scenario_parameter_hash: LowercaseSha256
    scenario_id: Annotated[str, Field(pattern=r"^SIM-[0-9a-f]{20}$")]
    scenario_parameter_preimage: dict[str, object]
    arm_memberships: Annotated[tuple[NonEmptyString, ...], Field(min_length=1)]
    input_guard_status: Literal["not_checked", "accepted", "rejected_input"]
    input_guard_reason_codes: tuple[RunValidityReason, ...]

    @model_validator(mode="after")
    def validate_identity_and_guard(self) -> "ScenarioRecord":
        if self.scenario_id != f"SIM-{self.scenario_parameter_hash[:20]}":
            raise ValueError("scenario_id does not match scenario_parameter_hash")
        if tuple(sorted(set(self.arm_memberships))) != self.arm_memberships:
            raise ValueError("arm_memberships must be sorted and unique")
        if self.input_guard_status == "accepted" and self.input_guard_reason_codes:
            raise ValueError("accepted input cannot retain guard reasons")
        if self.input_guard_status == "rejected_input" and not self.input_guard_reason_codes:
            raise ValueError("rejected input requires an exact guard reason")
        return self


class SimulationRunRecord(ScientificRecord):
    schema_version: Literal["vt-sim-run-record/0.1"]
    record_type: Literal["SimulationRunRecord"]
    run_id: NonEmptyString
    run_validity_status: Literal["not_run", "valid", "invalid_run"]
    run_validity_reason_codes: tuple[RunValidityReason, ...]
    run_completion_status: Literal["not_started", "running", "complete", "incomplete"]
    run_completion_reason_codes: tuple[NonEmptyString, ...]
    mandatory_cell_count: NonNegativeInt
    complete_cell_count: NonNegativeInt
    precision_unmet_cell_count: NonNegativeInt
    prohibited_capability_attestation: bool

    @model_validator(mode="after")
    def validate_run_union(self) -> "SimulationRunRecord":
        if self.run_validity_status in {"not_run", "valid"} and self.run_validity_reason_codes:
            raise ValueError("not-run or valid runs cannot retain invalid-run reasons")
        if self.run_validity_status == "invalid_run" and not self.run_validity_reason_codes:
            raise ValueError("invalid_run requires an exact reason")
        if self.run_completion_status == "complete" and self.run_completion_reason_codes:
            raise ValueError("complete run cannot retain incomplete reasons")
        if self.run_completion_status == "incomplete" and not self.run_completion_reason_codes:
            raise ValueError("incomplete run requires a reason")
        if self.complete_cell_count > self.mandatory_cell_count:
            raise ValueError("complete cell count exceeds mandatory cell count")
        if not self.prohibited_capability_attestation:
            raise ValueError("candidate must attest that prohibited capabilities were absent")
        return self


class AssignmentDispositionRecord(ScientificRecord):
    schema_version: Literal["vt-sim-assignment-record/0.1"]
    record_type: Literal["AssignmentDispositionRecord"]
    assignment_id: NonEmptyString
    scenario_parameter_hash: LowercaseSha256
    replicate_index: DecimalIndex
    disposition: Literal["nonstarted", "nonlocked", "abstained", "submitted", "invalidated"]
    disposition_reason: NonEmptyString | None
    eligible: bool

    @model_validator(mode="after")
    def validate_disposition(self) -> "AssignmentDispositionRecord":
        if self.disposition == "submitted" and self.disposition_reason is not None:
            raise ValueError("submitted assignment cannot retain a terminal reason")
        if self.disposition != "submitted" and self.disposition_reason is None:
            raise ValueError("non-submitted assignment requires a terminal reason")
        if self.disposition != "nonstarted" and not self.eligible:
            raise ValueError("only a nonstarted assignment may be ineligible")
        return self


RawOutcome = Literal[
    "LEFT", "RIGHT", "indistinguishable", "both_unacceptable", "insufficient_context"
]
DerivedOutcome = Literal[
    "A", "B", "indistinguishable", "both_unacceptable", "insufficient_context"
]


class SyntheticRatingRecord(ScientificRecord):
    schema_version: Literal["vt-sim-rating-record/0.1"]
    record_type: Literal["SyntheticRatingRecord"]
    rating_id: NonEmptyString
    assignment_ref: LowercaseSha256
    response_status: Literal["submitted", "not_observed", "abstained", "invalid"]
    display_pairwise_outcome: RawOutcome | None
    display_left_band: Band | None
    display_right_band: Band | None
    procedural_reason: NonEmptyString | None
    locked: bool

    @model_validator(mode="after")
    def validate_response(self) -> "SyntheticRatingRecord":
        if self.response_status == "submitted":
            if self.display_pairwise_outcome is None:
                raise ValueError("submitted rating requires a raw display outcome")
            if self.display_pairwise_outcome == "insufficient_context":
                if self.display_left_band is not None or self.display_right_band is not None:
                    raise ValueError("insufficient_context cannot retain raw bands")
            elif self.display_left_band is None or self.display_right_band is None:
                raise ValueError("submitted rating requires both raw bands")
            if self.procedural_reason is not None:
                raise ValueError("submitted rating cannot retain a procedural reason")
            if not self.locked:
                raise ValueError("submitted rating must be locked")
        else:
            if any(
                value is not None
                for value in (
                    self.display_pairwise_outcome,
                    self.display_left_band,
                    self.display_right_band,
                )
            ):
                raise ValueError("non-submitted rating cannot contain response data")
            if self.procedural_reason is None:
                raise ValueError("non-submitted rating requires an exact reason")
        return self


class SyntheticMappingRecord(ScientificRecord):
    schema_version: Literal["vt-sim-mapping-record/0.1"]
    record_type: Literal["SyntheticMappingRecord"]
    mapping_id: NonEmptyString
    rating_ref: LowercaseSha256
    assignment_ref: LowercaseSha256
    raw_display_outcome: RawOutcome
    derived_canonical_outcome: DerivedOutcome
    display_left_candidate_id: NonEmptyString
    display_right_candidate_id: NonEmptyString
    mapping_profile_id: NonEmptyString

    @model_validator(mode="after")
    def preserve_nondecisive_outcome(self) -> "SyntheticMappingRecord":
        if self.raw_display_outcome not in {"LEFT", "RIGHT"}:
            if self.derived_canonical_outcome != self.raw_display_outcome:
                raise ValueError("nondecisive raw outcome must remain unchanged")
        elif self.derived_canonical_outcome not in {"A", "B"}:
            raise ValueError("LEFT/RIGHT must map to canonical A/B")
        return self


class CalibrationRecord(ScientificRecord):
    schema_version: Literal["vt-sim-calibration-record/0.1"]
    record_type: Literal["CalibrationRecord"]
    calibration_id: NonEmptyString
    calibration_kind: Literal["case", "truth"]
    case_ref: LowercaseSha256 | None
    prediction_status: Literal[
        "not_run",
        "predicted_uncalibrated",
        "predicted_calibrated_for_scope",
        "abstained",
        "unsupported_scope",
        "invalid",
    ]
    prediction_value: Probability | None
    observed_event_status: Literal[
        "not_observed", "observed", "abstained", "unsupported_scope", "invalid"
    ]
    observed_event_value: bool | None
    sealed_pi: Probability | None
    sealed_p_star: Probability | None
    seal_state: Literal["not_applicable", "sealed", "unsealed_for_evaluation"]

    @model_validator(mode="after")
    def validate_calibration_kind(self) -> "CalibrationRecord":
        predicted = self.prediction_status in {
            "predicted_uncalibrated",
            "predicted_calibrated_for_scope",
        }
        if predicted != (self.prediction_value is not None):
            raise ValueError("prediction status/value union is contradictory")
        observed = self.observed_event_status == "observed"
        if observed != (self.observed_event_value is not None):
            raise ValueError("observed-event status/value union is contradictory")
        if self.calibration_kind == "case":
            if self.case_ref is not None or self.sealed_pi is not None or self.sealed_p_star is not None:
                raise ValueError("case record cannot contain sealed truth fields")
            if self.seal_state != "not_applicable":
                raise ValueError("case record seal state must be not_applicable")
        else:
            if self.case_ref is None or self.sealed_pi is None or self.sealed_p_star is None:
                raise ValueError("truth record requires case ref and both sealed probabilities")
            if self.seal_state == "not_applicable":
                raise ValueError("truth record requires a sealed or evaluation-unsealed state")
        return self


class EstimatorAttempt(StrictRecord):
    method_id: NonEmptyString
    status: Literal["not_attempted", "precheck_undefined", "estimated", "estimator_failure"]
    reason: EstimateReason | None

    @model_validator(mode="after")
    def validate_attempt(self) -> "EstimatorAttempt":
        if self.status == "estimated" and self.reason is not None:
            raise ValueError("estimated attempt cannot retain a failure reason")
        if self.status != "estimated" and self.reason is None:
            raise ValueError("non-estimated attempt requires an exact reason")
        return self


class ReplicateCounts(StrictRecord):
    eligible: NonNegativeInt
    submitted: NonNegativeInt
    invalid: NonNegativeInt

    @model_validator(mode="after")
    def validate_counts(self) -> "ReplicateCounts":
        if self.submitted + self.invalid > self.eligible:
            raise ValueError("replicate counts exceed eligible assignments")
        return self


class ReplicateRecord(ScientificRecord):
    schema_version: Literal["vt-sim-replicate-record/0.1"]
    record_type: Literal["ReplicateRecord"]
    replicate_id: NonEmptyString
    run_ref: LowercaseSha256
    scenario_parameter_hash: LowercaseSha256
    replicate_index: DecimalIndex
    counts: ReplicateCounts
    estimator_attempts: tuple[EstimatorAttempt, ...]
    leakage_flags: tuple[NonEmptyString, ...]

    @model_validator(mode="after")
    def validate_attempt_ids(self) -> "ReplicateRecord":
        method_ids = [item.method_id for item in self.estimator_attempts]
        if len(method_ids) != len(set(method_ids)):
            raise ValueError("estimator attempts contain duplicate method IDs")
        return self


_ESTIMAND_METHODS: dict[str, frozenset[str]] = {
    "EST-01": frozenset({"A-CAT-PROP/design-0.1"}),
    "EST-02": frozenset({"A-CAT-PROP/design-0.1"}),
    "EST-03": frozenset({"A-ALPHA-NOM/design-0.1"}),
    "EST-04": frozenset(
        {
            "A-ALPHA-ORD/design-0.1",
            "A-ORD-ADJ-ML/design-0.1",
            "A-ORD-PO-ML/design-0.1",
        }
    ),
    "EST-05": frozenset({"A-CAT-PROP/design-0.1"}),
    "EST-06": frozenset({"A-SIDEORDER-LOGIT/design-0.1"}),
    "EST-07": frozenset({"A-BT-ML/design-0.1", "A-BT-RIDGE/design-0.1"}),
    "EST-08": frozenset({"A-CAL-LOGIT/design-0.1", "A-CAL-MISS-LOGIT/design-0.1"}),
    "EST-09": frozenset({"A-CF-PAIRED/design-0.1"}),
    "EST-10": frozenset({"not_applicable"}),
    "EST-11": frozenset({"not_applicable"}),
}


class MetricRecord(ScientificRecord):
    schema_version: Literal["vt-sim-metric-record/0.1"]
    record_type: Literal["MetricRecord"]
    metric_id: NonEmptyString
    estimand_id: Annotated[str, Field(pattern=r"^EST-(0[1-9]|1[01])$")]
    estimand_revision: NonEmptyString
    target_population_kind: Literal[
        "fixed_messages_fixed_panel",
        "new_messages_fixed_panel",
        "fixed_messages_rater_population",
        "new_messages_rater_population",
    ]
    method_id: NonEmptyString
    scale: NonEmptyString
    numerator: NonNegativeInt | None
    denominator: NonNegativeInt | None
    denominator_ledger_refs: tuple[LowercaseSha256, ...]
    estimate_status: Literal["not_run", "estimated", "undefined", "invalid", "unsupported"]
    estimate_reason_codes: tuple[EstimateReason, ...]
    estimate_value: FiniteFloat | None
    synthetic_truth_status: Literal[
        "not_run", "exact", "reference_approximated", "undefined", "not_applicable", "invalid"
    ]
    synthetic_truth_reason_codes: tuple[TruthReason, ...]
    synthetic_truth_value: FiniteFloat | None
    synthetic_truth_mcse: Annotated[float, Field(ge=0.0, allow_inf_nan=False)] | None
    run_validity_status: Literal["not_run", "valid", "invalid_run"]
    run_validity_reason_codes: tuple[RunValidityReason, ...]
    terminal_status: Literal[
        "design_supported",
        "requires_cognitive_validation",
        "requires_simulation",
        "requires_pilot_data",
        "unsupported",
    ]

    @model_validator(mode="after")
    def validate_metric_unions(self) -> "MetricRecord":
        if (self.numerator is None) != (self.denominator is None):
            raise ValueError("numerator and denominator must be jointly present or null")
        if self.numerator is not None and self.numerator > self.denominator:
            raise ValueError("numerator cannot exceed denominator")
        if self.denominator == 0 and self.estimate_status == "estimated":
            raise ValueError("zero denominator cannot yield an estimated metric")
        estimated = self.estimate_status == "estimated"
        if estimated != (self.estimate_value is not None):
            raise ValueError("estimate status/value union is contradictory")
        if estimated and self.estimate_reason_codes:
            raise ValueError("estimated metric cannot retain estimate reasons")
        if not estimated and not self.estimate_reason_codes:
            raise ValueError("non-estimated metric requires an exact reason")

        truth_available = self.synthetic_truth_status in {"exact", "reference_approximated"}
        if truth_available != (self.synthetic_truth_value is not None):
            raise ValueError("truth status/value union is contradictory")
        if truth_available and self.synthetic_truth_reason_codes:
            raise ValueError("available truth cannot retain truth reasons")
        if not truth_available and not self.synthetic_truth_reason_codes:
            raise ValueError("unavailable truth requires an exact reason")
        if self.synthetic_truth_status == "reference_approximated":
            if self.synthetic_truth_mcse is None:
                raise ValueError("reference truth requires a Monte Carlo standard error")
        elif self.synthetic_truth_mcse is not None:
            raise ValueError("only reference-approximated truth may carry truth MCSE")

        if self.run_validity_status in {"not_run", "valid"} and self.run_validity_reason_codes:
            raise ValueError("not-run or valid metric cannot retain invalid-run reasons")
        if self.run_validity_status == "invalid_run" and not self.run_validity_reason_codes:
            raise ValueError("invalid-run metric requires an exact reason")
        allowed_methods = _ESTIMAND_METHODS[self.estimand_id]
        if self.method_id not in allowed_methods:
            raise ValueError("method is not applicable to the declared estimand")
        if self.estimand_id in {"EST-10", "EST-11"} and self.estimate_status != "unsupported":
            raise ValueError("EST-10 and EST-11 have no supported estimator in design-0.1")
        return self


class ProbabilityRecord(ScientificRecord):
    schema_version: Literal["vt-sim-probability-record/0.1"]
    record_type: Literal["ProbabilityRecord"]
    probability_id: NonEmptyString
    event_id: NonEmptyString
    event_revision: NonEmptyString
    probability_status: Literal[
        "not_run",
        "predicted_uncalibrated",
        "predicted_calibrated_for_scope",
        "abstained",
        "unsupported_scope",
        "invalid",
    ]
    probability_reason_codes: tuple[ProbabilityReason, ...]
    probability_value: Probability | None
    observed_event_status: Literal[
        "not_observed", "observed", "abstained", "unsupported_scope", "invalid"
    ]
    observed_event_reason_codes: tuple[ProbabilityReason, ...]
    observed_event_value: bool | None
    proper_score: Annotated[float, Field(ge=0.0, allow_inf_nan=False)] | None

    @model_validator(mode="after")
    def validate_probability_unions(self) -> "ProbabilityRecord":
        predicted = self.probability_status in {
            "predicted_uncalibrated",
            "predicted_calibrated_for_scope",
        }
        if predicted != (self.probability_value is not None):
            raise ValueError("probability status/value union is contradictory")
        if predicted and self.probability_reason_codes:
            raise ValueError("predicted probability cannot retain reasons")
        if not predicted and not self.probability_reason_codes:
            raise ValueError("missing probability requires an exact reason")
        observed = self.observed_event_status == "observed"
        if observed != (self.observed_event_value is not None):
            raise ValueError("event status/value union is contradictory")
        if observed and self.observed_event_reason_codes:
            raise ValueError("observed event cannot retain reasons")
        if not observed and not self.observed_event_reason_codes:
            raise ValueError("unobserved event requires an exact reason")
        if self.proper_score is not None and not (predicted and observed):
            raise ValueError("proper score requires a prediction and observed event")
        return self


class IntervalRecord(ScientificRecord):
    schema_version: Literal["vt-sim-interval-record/0.1"]
    record_type: Literal["IntervalRecord"]
    interval_id: NonEmptyString
    metric_ref: LowercaseSha256
    interval_status: Literal["estimated", "undefined", "invalid", "unsupported_scope", "not_run"]
    interval_reason_codes: tuple[IntervalReason, ...]
    confidence_level: Annotated[float, Field(gt=0.0, lt=1.0, allow_inf_nan=False)] | None
    lower: FiniteFloat | None
    upper: FiniteFloat | None
    scale: NonEmptyString
    method_id: NonEmptyString
    target_generalization: NonEmptyString
    resample_repetitions: NonNegativeInt | None

    @model_validator(mode="after")
    def validate_interval_union(self) -> "IntervalRecord":
        estimated = self.interval_status == "estimated"
        has_all = self.confidence_level is not None and self.lower is not None and self.upper is not None
        if estimated != has_all:
            raise ValueError("interval status/bounds union is contradictory")
        if estimated:
            if self.interval_reason_codes:
                raise ValueError("estimated interval cannot retain reasons")
            if self.lower > self.upper:
                raise ValueError("interval lower bound exceeds upper bound")
        else:
            if any(value is not None for value in (self.confidence_level, self.lower, self.upper)):
                raise ValueError("non-estimated interval cannot retain level or bounds")
            if not self.interval_reason_codes:
                raise ValueError("non-estimated interval requires an exact reason")
        return self


class CellDecisionRecord(ScientificRecord):
    schema_version: Literal["vt-sim-decision-record/0.1"]
    record_type: Literal["CellDecisionRecord"]
    decision_id: NonEmptyString
    scenario_parameter_hash: LowercaseSha256
    completed_valid_replicates: NonNegativeInt
    stop_reason: NonEmptyString
    cell_completion_status: Literal[
        "not_started", "running", "complete", "simulation_precision_unmet", "incomplete"
    ]
    prohibited_output_count: NonNegativeInt
    operating_decision: Literal[
        "design_supported",
        "requires_cognitive_validation",
        "requires_simulation",
        "requires_pilot_data",
        "unsupported",
    ]
    operating_reason_codes: Annotated[tuple[NonEmptyString, ...], Field(min_length=1)]
    authority: Literal["none"]

    @model_validator(mode="after")
    def block_success_with_prohibited_outputs(self) -> "CellDecisionRecord":
        if self.prohibited_output_count and self.operating_decision == "design_supported":
            raise ValueError("prohibited outputs block design_supported")
        return self


class ProvenanceRecord(ScientificRecord):
    schema_version: Literal["vt-sim-provenance-record/0.1"]
    record_type: Literal["ProvenanceRecord"]
    provenance_id: NonEmptyString
    parent_record_hash: LowercaseSha256
    derivation_method_id: NonEmptyString
    seed_coordinates: tuple[NonEmptyString, ...]
    recorded_at: Annotated[str, Field(pattern=r"^[0-9]{4}-[0-9]{2}-[0-9]{2}T.*(?:Z|[+-][0-9]{2}:[0-9]{2})$")]
    actor_role: NonEmptyString
    data_class: Literal["synthetic_only"]
    capability_envelope: Literal["offline_synthetic_only"]


class ReviewRecord(ScientificRecord):
    schema_version: Literal["vt-sim-review-record/0.1"]
    record_type: Literal["ReviewRecord"]
    review_id: NonEmptyString
    review_kind: Literal["method", "operating_rule"]
    design_hash: LowercaseSha256
    reviewed_implementation_hash: LowercaseSha256
    reviewer_identity_ref: NonEmptyString
    reviewer_role: NonEmptyString
    independence_declared: bool
    checklist_dispositions: dict[str, Literal["pass", "fail", "not_applicable"]]
    blocking_issues: tuple[NonEmptyString, ...]
    disposition: Literal["reviewed_no_blocking_issue", "revision_required"]
    reviewed_on: Annotated[str, Field(pattern=r"^[0-9]{4}-[0-9]{2}-[0-9]{2}$")]
    authority: Literal["none"]

    @model_validator(mode="after")
    def validate_review(self) -> "ReviewRecord":
        if not self.independence_declared:
            raise ValueError("review record requires an explicit independence declaration")
        has_failure = "fail" in self.checklist_dispositions.values() or bool(self.blocking_issues)
        if self.disposition == "reviewed_no_blocking_issue" and has_failure:
            raise ValueError("passing review cannot contain failures or blockers")
        if self.disposition == "revision_required" and not has_failure:
            raise ValueError("revision_required requires a failed check or blocker")
        return self


RECORD_MODELS: dict[str, type[ScientificRecord]] = {
    "SimulationDesignRecord": SimulationDesignRecord,
    "ScenarioRecord": ScenarioRecord,
    "SimulationRunRecord": SimulationRunRecord,
    "AssignmentDispositionRecord": AssignmentDispositionRecord,
    "SyntheticRatingRecord": SyntheticRatingRecord,
    "SyntheticMappingRecord": SyntheticMappingRecord,
    "CalibrationRecord": CalibrationRecord,
    "ReplicateRecord": ReplicateRecord,
    "MetricRecord": MetricRecord,
    "ProbabilityRecord": ProbabilityRecord,
    "IntervalRecord": IntervalRecord,
    "CellDecisionRecord": CellDecisionRecord,
    "ProvenanceRecord": ProvenanceRecord,
    "ReviewRecord": ReviewRecord,
}

SCHEMA_FILENAMES: dict[str, str] = {
    "SimulationDesignRecord": "design-record.schema.json",
    "ScenarioRecord": "scenario-record.schema.json",
    "SimulationRunRecord": "run-record.schema.json",
    "AssignmentDispositionRecord": "assignment-record.schema.json",
    "SyntheticRatingRecord": "rating-record.schema.json",
    "SyntheticMappingRecord": "mapping-record.schema.json",
    "CalibrationRecord": "calibration-record.schema.json",
    "ReplicateRecord": "replicate-record.schema.json",
    "MetricRecord": "metric-record.schema.json",
    "ProbabilityRecord": "probability-record.schema.json",
    "IntervalRecord": "interval-record.schema.json",
    "CellDecisionRecord": "decision-record.schema.json",
    "ProvenanceRecord": "provenance-record.schema.json",
    "ReviewRecord": "review-record.schema.json",
}


@dataclass(frozen=True)
class RecordSetReport:
    record_count: int
    record_type_count: int
    errors: tuple[str, ...]


def validate_record(record: dict[str, object]) -> ScientificRecord:
    """Validate one exact record without Python-side scalar coercion."""

    record_type = record.get("record_type")
    if not isinstance(record_type, str) or record_type not in RECORD_MODELS:
        raise RecordSetValidationError(f"unknown record_type: {record_type!r}")
    try:
        verify_record_hash(record)
        encoded = canonical_bytes(record)
    except CanonicalizationError as error:
        raise RecordSetValidationError(str(error)) from error
    return RECORD_MODELS[record_type].model_validate_json(encoded)


def hash_record(record: ScientificRecord) -> str:
    """Recompute a record hash while omitting only its own record_hash field."""

    dumped = record.model_dump(mode="json")
    return content_hash(dumped, omit=frozenset({"record_hash"}))


def validate_record_set(records: Any) -> RecordSetReport:
    """Validate record hashes, stream ordinals, references, and unique scientific IDs."""

    materialized = tuple(records)
    hashes: set[str] = set()
    ordinals: set[tuple[str, int]] = set()
    scientific_ids: set[tuple[str, str]] = set()
    scenario_hashes: set[str] = set()
    scenario_ids: set[str] = set()
    replicate_keys: set[tuple[str, str]] = set()

    for record in materialized:
        if not isinstance(record, ScientificRecord):
            raise RecordSetValidationError("record set contains an unvalidated object")
        if hash_record(record) != record.record_hash:
            raise RecordSetValidationError("record hash changed after validation")
        if record.record_hash in hashes:
            raise RecordSetValidationError("duplicate record_hash")
        hashes.add(record.record_hash)
        ordinal = (record.stream_id, record.record_ordinal)
        if ordinal in ordinals:
            raise RecordSetValidationError("duplicate record ordinal within stream")
        ordinals.add(ordinal)

        identifier_name = next(
            (
                name
                for name in type(record).model_fields
                if name.endswith("_id") and name not in {"stream_id"}
            ),
            None,
        )
        if identifier_name is not None:
            identifier = getattr(record, identifier_name)
            key = (record.record_type, identifier)
            if key in scientific_ids:
                raise RecordSetValidationError(f"duplicate {identifier_name}")
            scientific_ids.add(key)

        if isinstance(record, ScenarioRecord):
            if record.scenario_parameter_hash in scenario_hashes or record.scenario_id in scenario_ids:
                raise RecordSetValidationError("duplicate scenario identity")
            scenario_hashes.add(record.scenario_parameter_hash)
            scenario_ids.add(record.scenario_id)
        if isinstance(record, ReplicateRecord):
            key = (record.scenario_parameter_hash, record.replicate_index)
            if key in replicate_keys:
                raise RecordSetValidationError("duplicate scenario/replicate identity")
            replicate_keys.add(key)

    for record in materialized:
        required_refs: set[str] = set()
        if isinstance(record, SyntheticRatingRecord):
            required_refs.add(record.assignment_ref)
        elif isinstance(record, SyntheticMappingRecord):
            required_refs.update({record.rating_ref, record.assignment_ref})
        elif isinstance(record, CalibrationRecord) and record.case_ref is not None:
            required_refs.add(record.case_ref)
        elif isinstance(record, ReplicateRecord):
            required_refs.add(record.run_ref)
        elif isinstance(record, MetricRecord):
            required_refs.update(record.denominator_ledger_refs)
        elif isinstance(record, IntervalRecord):
            required_refs.add(record.metric_ref)
        elif isinstance(record, ProvenanceRecord):
            required_refs.add(record.parent_record_hash)
        undeclared = sorted(required_refs - set(record.input_refs))
        if undeclared:
            raise RecordSetValidationError(
                f"{record.record_type} has family refs absent from input_refs: {undeclared!r}"
            )
        missing = sorted(set(record.input_refs) - hashes)
        if missing:
            raise RecordSetValidationError(
                f"{record.record_type} has unresolved input_refs: {missing!r}"
            )

    return RecordSetReport(
        record_count=len(materialized),
        record_type_count=len({record.record_type for record in materialized}),
        errors=(),
    )


def standalone_json_schemas() -> dict[str, dict[str, object]]:
    """Return deterministic Draft 2020-12 standalone schemas for all families."""

    schemas: dict[str, dict[str, object]] = {}
    for record_type, model in RECORD_MODELS.items():
        schema = model.model_json_schema(mode="validation")
        schema["$schema"] = "https://json-schema.org/draft/2020-12/schema"
        schema["$id"] = f"https://content.md.invalid/vt-sim/{SCHEMA_FILENAMES[record_type]}"
        conditionals = _SCHEMA_CONDITIONALS.get(record_type)
        if conditionals:
            schema["allOf"] = conditionals
        schemas[SCHEMA_FILENAMES[record_type]] = schema
    return schemas


def _status_conditional(
    status_field: str,
    success_values: tuple[str, ...],
    value_fields: tuple[str, ...],
    reason_field: str,
) -> dict[str, object]:
    """Draft-2020-12 conditional mirroring a local status/value union."""

    success_match: dict[str, object]
    if len(success_values) == 1:
        success_match = {"const": success_values[0]}
    else:
        success_match = {"enum": list(success_values)}
    return {
        "if": {"properties": {status_field: success_match}, "required": [status_field]},
        "then": {
            "properties": {
                **{field: {"type": "number"} for field in value_fields},
                reason_field: {"maxItems": 0},
            }
        },
        "else": {
            "properties": {
                **{field: {"type": "null"} for field in value_fields},
                reason_field: {"minItems": 1},
            }
        },
    }


_SCHEMA_CONDITIONALS: dict[str, list[dict[str, object]]] = {
    "MetricRecord": [
        _status_conditional(
            "estimate_status", ("estimated",), ("estimate_value",), "estimate_reason_codes"
        ),
        _status_conditional(
            "synthetic_truth_status",
            ("exact", "reference_approximated"),
            ("synthetic_truth_value",),
            "synthetic_truth_reason_codes",
        ),
    ],
    "ProbabilityRecord": [
        _status_conditional(
            "probability_status",
            ("predicted_uncalibrated", "predicted_calibrated_for_scope"),
            ("probability_value",),
            "probability_reason_codes",
        )
    ],
    "IntervalRecord": [
        _status_conditional(
            "interval_status",
            ("estimated",),
            ("confidence_level", "lower", "upper"),
            "interval_reason_codes",
        )
    ],
}
