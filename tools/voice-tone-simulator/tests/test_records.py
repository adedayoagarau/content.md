from __future__ import annotations

import json
from pathlib import Path
import sys
import unittest

from pydantic import ValidationError as PydanticValidationError


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.canonical import content_hash  # noqa: E402
from vt_simulator.records import (  # noqa: E402
    RecordSetValidationError,
    hash_record,
    validate_record,
    validate_record_set,
)


HASHES = {
    "protocol_hash": "1" * 64,
    "implementation_hash": "2" * 64,
    "runtime_manifest_hash": "3" * 64,
    "source_manifest_hash": "4" * 64,
}


def record(record_type: str, schema_version: str, ordinal: int, **fields: object) -> dict[str, object]:
    value: dict[str, object] = {
        "schema_version": schema_version,
        "record_type": record_type,
        **HASHES,
        "stream_id": "STREAM-CONFORMANCE-001",
        "record_ordinal": ordinal,
        "input_refs": [],
        **fields,
        "record_hash_algorithm": "sha256",
        "record_hash": "0" * 64,
    }
    value["record_hash"] = content_hash(value, omit=frozenset({"record_hash"}))
    return value


def minimal_records() -> list[dict[str, object]]:
    scenario_hash = "a" * 64
    return [
        record(
            "SimulationDesignRecord",
            "vt-sim-design-record/0.1",
            0,
            design_id="VT-MSP-DESIGN-001",
            scenario_grid_id="VT-MSP-GRID/design-0.1",
            generating_profile_id="VT-MSP-DGM/design-0.1",
            math_profile_id="VT-MSP-MATH/design-0.1",
            analysis_profile_id="VT-MSP-ANALYSIS/design-0.1",
            schedule_profile_id="VT-MSP-SCHEDULE/design-0.1",
            record_profile_id="VT-MSP-WIRE/design-0.1",
            execution_status="candidate_conformance_only",
            authority="none",
        ),
        record(
            "ScenarioRecord",
            "vt-sim-scenario-record/0.1",
            1,
            scenario_parameter_hash=scenario_hash,
            scenario_id=f"SIM-{scenario_hash[:20]}",
            scenario_parameter_preimage={"schema_version": "vt-msp-scenario-parameter/0.1"},
            arm_memberships=["ARM-A-OUTCOME"],
            input_guard_status="accepted",
            input_guard_reason_codes=[],
        ),
        record(
            "SimulationRunRecord",
            "vt-sim-run-record/0.1",
            2,
            run_id="RUN-CONFORMANCE-001",
            run_validity_status="valid",
            run_validity_reason_codes=[],
            run_completion_status="complete",
            run_completion_reason_codes=[],
            mandatory_cell_count=1,
            complete_cell_count=1,
            precision_unmet_cell_count=0,
            prohibited_capability_attestation=True,
        ),
        record(
            "AssignmentDispositionRecord",
            "vt-sim-assignment-record/0.1",
            3,
            assignment_id="ASSIGN-001",
            scenario_parameter_hash=scenario_hash,
            replicate_index="0",
            disposition="submitted",
            disposition_reason=None,
            eligible=True,
        ),
        record(
            "SyntheticRatingRecord",
            "vt-sim-rating-record/0.1",
            4,
            rating_id="RATING-001",
            assignment_ref="5" * 64,
            response_status="submitted",
            display_pairwise_outcome="LEFT",
            display_left_band=4,
            display_right_band=2,
            procedural_reason=None,
            locked=True,
        ),
        record(
            "SyntheticMappingRecord",
            "vt-sim-mapping-record/0.1",
            5,
            mapping_id="MAPPING-001",
            rating_ref="6" * 64,
            assignment_ref="5" * 64,
            raw_display_outcome="LEFT",
            derived_canonical_outcome="A",
            display_left_candidate_id="CAND-A",
            display_right_candidate_id="CAND-B",
            mapping_profile_id="VT-MSP-MAPPING/design-0.1",
        ),
        record(
            "CalibrationRecord",
            "vt-sim-calibration-record/0.1",
            6,
            calibration_id="CAL-001",
            calibration_kind="case",
            case_ref=None,
            prediction_status="predicted_uncalibrated",
            prediction_value=0.3,
            observed_event_status="observed",
            observed_event_value=True,
            sealed_pi=None,
            sealed_p_star=None,
            seal_state="not_applicable",
        ),
        record(
            "ReplicateRecord",
            "vt-sim-replicate-record/0.1",
            7,
            replicate_id="REPL-000000",
            run_ref="7" * 64,
            scenario_parameter_hash=scenario_hash,
            replicate_index="0",
            counts={"eligible": 12, "submitted": 10, "invalid": 0},
            estimator_attempts=[{"method_id": "A-CAT-PROP/design-0.1", "status": "estimated", "reason": None}],
            leakage_flags=[],
        ),
        record(
            "MetricRecord",
            "vt-sim-metric-record/0.1",
            8,
            metric_id="METRIC-001",
            estimand_id="EST-01",
            estimand_revision="design-0.1",
            target_population_kind="fixed_messages_fixed_panel",
            method_id="A-CAT-PROP/design-0.1",
            scale="proportion",
            numerator=6,
            denominator=10,
            denominator_ledger_refs=[],
            estimate_status="estimated",
            estimate_reason_codes=[],
            estimate_value=0.6,
            synthetic_truth_status="exact",
            synthetic_truth_reason_codes=[],
            synthetic_truth_value=0.6,
            synthetic_truth_mcse=None,
            run_validity_status="valid",
            run_validity_reason_codes=[],
            terminal_status="requires_pilot_data",
        ),
        record(
            "ProbabilityRecord",
            "vt-sim-probability-record/0.1",
            9,
            probability_id="PROB-001",
            event_id="EVENT-PREFERENCE-A",
            event_revision="design-0.1",
            probability_status="predicted_uncalibrated",
            probability_reason_codes=[],
            probability_value=0.7,
            observed_event_status="observed",
            observed_event_reason_codes=[],
            observed_event_value=True,
            proper_score=0.09,
        ),
        record(
            "IntervalRecord",
            "vt-sim-interval-record/0.1",
            10,
            interval_id="INTERVAL-001",
            metric_ref="8" * 64,
            interval_status="estimated",
            interval_reason_codes=[],
            confidence_level=0.95,
            lower=0.5,
            upper=0.7,
            scale="proportion",
            method_id="I-RATER-PCT/design-0.1",
            target_generalization="new_raters",
            resample_repetitions=1999,
        ),
        record(
            "CellDecisionRecord",
            "vt-sim-decision-record/0.1",
            11,
            decision_id="CELL-DECISION-001",
            scenario_parameter_hash=scenario_hash,
            completed_valid_replicates=1000,
            stop_reason="candidate_conformance_cap",
            cell_completion_status="complete",
            prohibited_output_count=0,
            operating_decision="requires_pilot_data",
            operating_reason_codes=["candidate_conformance_only"],
            authority="none",
        ),
        record(
            "ProvenanceRecord",
            "vt-sim-provenance-record/0.1",
            12,
            provenance_id="PROV-001",
            parent_record_hash="9" * 64,
            derivation_method_id="vt-sim/conformance-0.1",
            seed_coordinates=["VT-MSP-SEED/design-0.1", "replicate=0"],
            recorded_at="2026-08-19T00:00:00Z",
            actor_role="offline_candidate_operator",
            data_class="synthetic_only",
            capability_envelope="offline_synthetic_only",
        ),
        record(
            "ReviewRecord",
            "vt-sim-review-record/0.1",
            13,
            review_id="REVIEW-001",
            review_kind="method",
            design_hash="a" * 64,
            reviewed_implementation_hash="b" * 64,
            reviewer_identity_ref="reviewer:test-only",
            reviewer_role="independent_method_reviewer",
            independence_declared=True,
            checklist_dispositions={"schema": "pass", "leakage": "pass"},
            blocking_issues=[],
            disposition="reviewed_no_blocking_issue",
            reviewed_on="2026-08-19",
            authority="none",
        ),
    ]


class RecordFamilyTests(unittest.TestCase):
    def test_every_record_family_validates_and_hashes(self) -> None:
        records = minimal_records()
        self.assertEqual(len(records), 14)
        for raw in records:
            with self.subTest(record_type=raw["record_type"]):
                parsed = validate_record(raw)
                self.assertEqual(hash_record(parsed), raw["record_hash"])

    def test_all_standalone_json_schemas_are_closed_and_parseable(self) -> None:
        schema_root = PACKAGE_ROOT / "protocol" / "schemas"
        schemas = sorted(schema_root.glob("*.schema.json"))
        self.assertEqual(len(schemas), 14)
        for path in schemas:
            with self.subTest(schema=path.name):
                schema = json.loads(path.read_text(encoding="utf-8"))
                self.assertEqual(schema["$schema"], "https://json-schema.org/draft/2020-12/schema")
                self.assertFalse(schema["additionalProperties"])
                self.assertIn("record_hash", schema["required"])


class StatusUnionTests(unittest.TestCase):
    def test_submitted_insufficient_context_has_no_ordinal_bands(self) -> None:
        raw = minimal_records()[4]
        raw["display_pairwise_outcome"] = "insufficient_context"
        raw["display_left_band"] = None
        raw["display_right_band"] = None
        raw["record_hash"] = content_hash(raw, omit=frozenset({"record_hash"}))

        parsed = validate_record(raw)

        self.assertEqual(parsed.display_pairwise_outcome, "insufficient_context")
        self.assertIsNone(parsed.display_left_band)
        self.assertIsNone(parsed.display_right_band)

    def test_metric_unsupported_cannot_retain_numeric_value(self) -> None:
        raw = minimal_records()[8]
        raw["estimate_status"] = "unsupported"
        raw["estimate_reason_codes"] = ["unsupported_estimand_scope"]
        raw["record_hash"] = content_hash(raw, omit=frozenset({"record_hash"}))
        with self.assertRaises(PydanticValidationError):
            validate_record(raw)

    def test_metric_success_cannot_retain_reason(self) -> None:
        raw = minimal_records()[8]
        raw["estimate_reason_codes"] = ["estimator_nonconvergence"]
        raw["record_hash"] = content_hash(raw, omit=frozenset({"record_hash"}))
        with self.assertRaises(PydanticValidationError):
            validate_record(raw)

    def test_failed_interval_cannot_retain_bounds(self) -> None:
        raw = minimal_records()[10]
        raw["interval_status"] = "unsupported_scope"
        raw["interval_reason_codes"] = ["unsupported_target_scope"]
        raw["record_hash"] = content_hash(raw, omit=frozenset({"record_hash"}))
        with self.assertRaises(PydanticValidationError):
            validate_record(raw)

    def test_missing_probability_cannot_be_imputed(self) -> None:
        raw = minimal_records()[9]
        raw["probability_status"] = "not_run"
        raw["probability_reason_codes"] = ["simulation_not_run"]
        raw["record_hash"] = content_hash(raw, omit=frozenset({"record_hash"}))
        with self.assertRaises(PydanticValidationError):
            validate_record(raw)

    def test_invalid_run_requires_an_exact_reason(self) -> None:
        raw = minimal_records()[2]
        raw["run_validity_status"] = "invalid_run"
        raw["record_hash"] = content_hash(raw, omit=frozenset({"record_hash"}))
        with self.assertRaises(PydanticValidationError):
            validate_record(raw)

    def test_scenario_short_id_must_match_full_hash(self) -> None:
        raw = minimal_records()[1]
        raw["scenario_id"] = "SIM-00000000000000000000"
        raw["record_hash"] = content_hash(raw, omit=frozenset({"record_hash"}))
        with self.assertRaises(PydanticValidationError):
            validate_record(raw)


class RecordSetTests(unittest.TestCase):
    def test_unique_records_form_a_valid_set(self) -> None:
        independent = minimal_records()[:3]
        report = validate_record_set(validate_record(item) for item in independent)
        self.assertEqual(report.record_count, 3)
        self.assertEqual(report.record_type_count, 3)
        self.assertEqual(report.errors, ())

    def test_duplicate_hash_is_rejected(self) -> None:
        first = validate_record(minimal_records()[0])
        with self.assertRaises(RecordSetValidationError):
            validate_record_set([first, first])

    def test_unknown_record_type_is_rejected(self) -> None:
        raw = minimal_records()[0]
        raw["record_type"] = "UnknownRecord"
        raw["record_hash"] = content_hash(raw, omit=frozenset({"record_hash"}))
        with self.assertRaises(RecordSetValidationError):
            validate_record(raw)

    def test_declared_internal_reference_must_resolve(self) -> None:
        raw = minimal_records()[4]
        raw["input_refs"] = [raw["assignment_ref"]]
        raw["record_hash"] = content_hash(raw, omit=frozenset({"record_hash"}))
        parsed = validate_record(raw)
        with self.assertRaises(RecordSetValidationError):
            validate_record_set([parsed])

    def test_family_reference_cannot_be_hidden_from_input_refs(self) -> None:
        parsed = validate_record(minimal_records()[4])
        with self.assertRaises(RecordSetValidationError):
            validate_record_set([parsed])


if __name__ == "__main__":
    unittest.main()
