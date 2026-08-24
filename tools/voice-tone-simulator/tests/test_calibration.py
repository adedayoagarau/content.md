from __future__ import annotations

from dataclasses import replace
from pathlib import Path
import sys
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
REPOSITORY_ROOT = PACKAGE_ROOT.parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.calibration import (  # noqa: E402
    CalibrationValidationError,
    build_calibration_schedule,
    generate_calibration_replicate,
    transform_calibration_prediction,
)
from vt_simulator.canonical import content_hash  # noqa: E402
from vt_simulator.grid import ScenarioBundle, build_scenario_preimage  # noqa: E402
from vt_simulator.manifest import ApprovedRoots, load_validated_protocol  # noqa: E402


def protocol():
    return load_validated_protocol(
        ApprovedRoots(
            protocol_root=PACKAGE_ROOT / "protocol",
            paper_source_root=REPOSITORY_ROOT,
        )
    )


def scenario(protocol_value, **overrides: object) -> ScenarioBundle:
    preimage = build_scenario_preimage(protocol_value, overrides)
    digest = content_hash(preimage)
    return ScenarioBundle(
        scenario_parameter_hash=digest,
        scenario_id=f"SIM-{digest[:20]}",
        preimage=preimage,
        arm_memberships=("ARM-F-CALIBRATION",),
    )


class CalibrationScheduleTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.protocol = protocol()

    def test_n100_cycles_the_exact_96_unit_public_test_schedule(self) -> None:
        subject = scenario(
            self.protocol,
            heldout_count={"id": "N100", "value": 100},
        )
        result = build_calibration_schedule(self.protocol, subject)
        self.assertEqual(result.status, "scheduled")
        self.assertIsNone(result.reason)
        self.assertEqual(len(result.cases), 100)

        first = result.cases[0]
        self.assertEqual(
            (
                first.case_id,
                first.context_occurrence_id,
                first.family_id,
                first.card_id,
                first.rater_id,
                first.candidate_suffix,
                first.candidate_id,
                first.event_id,
            ),
            (
                "SCASE-000001",
                "SCTX-000001",
                "SMSG-0007",
                "SCARD-0001",
                "SRATER-0001",
                "A",
                "SCAND-0007-A",
                "E_mismatch/SCARD-0001/design-0.1",
            ),
        )
        ninety_six = result.cases[95]
        self.assertEqual(
            (
                ninety_six.family_id,
                ninety_six.card_id,
                ninety_six.rater_id,
                ninety_six.candidate_suffix,
                ninety_six.context_occurrence_id,
            ),
            ("SMSG-0010", "SCARD-0004", "SRATER-0003", "B", "SCTX-000001"),
        )
        self.assertEqual(result.cases[96].family_id, "SMSG-0007")
        self.assertEqual(result.cases[96].context_occurrence_id, "SCTX-000002")
        self.assertTrue(all(row.split == "public_test" for row in result.cases))

    def test_zero_public_test_coverage_returns_typed_unsupported_scope(self) -> None:
        subject = scenario(
            self.protocol,
            coverage={"calibration": 1, "id": "C1", "public_test": 0, "total": 1},
            heldout_count={"id": "N100", "value": 100},
        )
        result = build_calibration_schedule(self.protocol, subject)
        self.assertEqual(result.status, "unsupported_scope")
        self.assertEqual(result.reason, "insufficient_card_coverage")
        self.assertEqual(result.cases, ())

    def test_non_arm_f_schedule_axes_fail_closed(self) -> None:
        with self.assertRaises(CalibrationValidationError):
            build_calibration_schedule(
                self.protocol,
                scenario(
                    self.protocol,
                    card_count={"id": "CARD7", "value": 7},
                    heldout_count={"id": "N100", "value": 100},
                ),
            )


class CalibrationPredictionTests(unittest.TestCase):
    def test_all_seven_profiles_apply_the_frozen_transform(self) -> None:
        cases = {
            "K0-CALIBRATED": (0.80, 0.30, 0.80),
            "K1-INTERCEPT": (0.50, 0.30, 0.679178699175393),
            "K2-UNDERFIT": (0.50, 0.30, 0.50),
            "K3-OVERCONFIDENT": (0.50, 0.30, 0.50),
            "K4-LOW-RESOLUTION": (0.80, 0.30, 0.30),
            "K5-INVERTED": (0.80, 0.30, 0.20),
            "K6-MISSING-INFORMATIVE": (0.80, 0.30, 0.80),
        }
        for profile, (pi, base_rate, expected) in cases.items():
            with self.subTest(profile=profile):
                result = transform_calibration_prediction(
                    profile,
                    pi=pi,
                    base_rate=base_rate,
                    error_uniform=0.5,
                )
                self.assertAlmostEqual(result.p_star, expected, places=12)

    def test_unknown_profile_is_rejected(self) -> None:
        with self.assertRaises(CalibrationValidationError):
            transform_calibration_prediction(
                "K-UNKNOWN", pi=0.5, base_rate=0.3, error_uniform=0.5
            )

class CalibrationReplicateTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.protocol = protocol()
        cls.subject = scenario(
            cls.protocol,
            base_rate={"id": "Q50", "value": "0.50"},
            heldout_count={"id": "N100", "value": 100},
        )
        cls.result = generate_calibration_replicate(
            cls.protocol, cls.subject, replicate_index=1
        )

    def test_q50_k0_uses_uniform_beta_and_locks_prediction_before_event(self) -> None:
        first, second = self.result.case_results[:2]
        self.assertAlmostEqual(first.prediction_value, 0.9990313575835899, places=15)
        self.assertTrue(first.observed_event_value)
        self.assertEqual(first.raw_band, 0)
        self.assertAlmostEqual(second.prediction_value, 0.035989702329970896, places=15)
        self.assertFalse(second.observed_event_value)
        self.assertEqual(second.raw_band, 3)
        self.assertTrue(
            all(row.prediction_precedes_event for row in self.result.case_results)
        )
        self.assertEqual(
            (
                first.prediction_record_ordinal,
                first.event_record_ordinal,
                self.result.case_results[-1].prediction_record_ordinal,
                self.result.case_results[-1].event_record_ordinal,
            ),
            (0, 1, 198, 199),
        )
        self.assertTrue(
            all(
                row.prediction_record_ordinal < row.event_record_ordinal
                for row in self.result.case_results
            )
        )

    def test_case_and_truth_records_are_complete_and_sealed(self) -> None:
        self.assertEqual(len(self.result.case_results), 100)
        self.assertEqual(len(self.result.truth_records), 100)
        self.assertTrue(
            all(row.prediction_status == "predicted_uncalibrated" for row in self.result.case_results)
        )
        self.assertTrue(
            all(row.observed_event_status == "observed" for row in self.result.case_results)
        )
        self.assertTrue(all(row.seal_state == "sealed" for row in self.result.truth_records))
        self.assertEqual(
            {row.case_id for row in self.result.case_results},
            {row.case_id for row in self.result.truth_records},
        )

    def test_event_and_prediction_streams_consume_two_draws_per_case(self) -> None:
        self.assertEqual(
            [
                (row.stream_name, row.stream_fingerprint, row.observed_draw_count)
                for row in self.result.stream_receipts
            ],
            [
                ("event", "44f657e85c5e1198", 200),
                ("prediction", "a07e2a53e926b265", 200),
            ],
        )
        self.assertEqual(self.result.missingness.target_rate, 0.0)
        self.assertEqual(self.result.missingness.solver_status, "boundary_zero")
        self.assertEqual(self.result.missingness.missing_count, 0)

    def test_repeated_generation_is_identical_and_hash_bound(self) -> None:
        repeated = generate_calibration_replicate(
            self.protocol, self.subject, replicate_index=1
        )
        self.assertEqual(self.result, repeated)
        self.assertEqual(self.result.record_hash, content_hash(self.result.hash_preimage()))

    def test_k6_informative_missingness_reconciles_to_the_selected_mean(self) -> None:
        subject = scenario(
            self.protocol,
            calibration_profile="K6-MISSING-INFORMATIVE",
            heldout_count={"id": "N100", "value": 100},
            missing_prediction_rate={"id": "MP15", "value": "0.15"},
        )
        result = generate_calibration_replicate(
            self.protocol, subject, replicate_index=1
        )
        self.assertEqual(result.missingness.solver_status, "solved")
        self.assertLessEqual(abs(result.missingness.mean_probability - 0.15), 1.0e-12)
        self.assertGreater(result.missingness.missing_count, 0)
        self.assertLess(result.missingness.missing_count, 100)
        self.assertEqual(
            sum(row.prediction_status == "abstained" for row in result.case_results),
            result.missingness.missing_count,
        )
        self.assertTrue(
            all(row.observed_event_status == "observed" for row in result.case_results)
        )

    def test_tampered_identity_and_out_of_range_replicate_fail(self) -> None:
        tampered = replace(self.subject, scenario_parameter_hash="0" * 64)
        with self.assertRaises(CalibrationValidationError):
            generate_calibration_replicate(
                self.protocol, tampered, replicate_index=1
            )
        for invalid in (0, 1001, True):
            with self.subTest(replicate_index=invalid):
                with self.assertRaises(CalibrationValidationError):
                    generate_calibration_replicate(
                        self.protocol, self.subject, replicate_index=invalid
                    )


if __name__ == "__main__":
    unittest.main()
