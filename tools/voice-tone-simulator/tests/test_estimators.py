from __future__ import annotations

from math import log
from pathlib import Path
import sys
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
REPOSITORY_ROOT = PACKAGE_ROOT.parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.calibration import generate_calibration_replicate  # noqa: E402
from vt_simulator.canonical import content_hash  # noqa: E402
from vt_simulator.counterfactual import generate_counterfactual_replicate  # noqa: E402
from vt_simulator.estimators import (  # noqa: E402
    EstimatorValidationError,
    ReliabilityUnit,
    calibration_metrics,
    category_proportions,
    counterfactual_paired_summary,
    krippendorff_nominal_alpha,
    krippendorff_ordinal_alpha,
)
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
        arm_memberships=("TEST-ESTIMATOR",),
    )


class CategoryProportionTests(unittest.TestCase):
    def test_declared_denominator_and_null_rows_remain_explicit(self) -> None:
        result = category_proportions(
            ("A", "B", "tie"),
            ("A", "A", "B", None),
            declared_denominator=5,
        )
        self.assertEqual(
            [(row.category, row.numerator, row.denominator, row.value) for row in result],
            [("A", 2, 5, 0.4), ("B", 1, 5, 0.2), ("tie", 0, 5, 0.0)],
        )

    def test_invalid_categories_counts_and_denominators_fail_closed(self) -> None:
        with self.assertRaises(EstimatorValidationError):
            category_proportions(("A", "A"), ("A",), declared_denominator=1)
        with self.assertRaises(EstimatorValidationError):
            category_proportions(("A", "B"), ("C",), declared_denominator=1)
        with self.assertRaises(EstimatorValidationError):
            category_proportions(("A", "B"), ("A", "B"), declared_denominator=1)


class KrippendorffAlphaTests(unittest.TestCase):
    def test_nominal_alpha_matches_a_hand_derived_three_unit_example(self) -> None:
        result = krippendorff_nominal_alpha(
            (
                ReliabilityUnit("U1", ("A", "A")),
                ReliabilityUnit("U2", ("A", "B")),
                ReliabilityUnit("U3", ("B", "B")),
                ReliabilityUnit("U4", ("A",)),
            ),
            ("A", "B"),
        )
        self.assertEqual(result.estimate_status, "estimated")
        self.assertAlmostEqual(result.value, 4.0 / 9.0)
        self.assertEqual(result.total_unit_count, 4)
        self.assertEqual(result.pairable_unit_count, 3)
        self.assertEqual(result.pairable_rating_count, 6)
        self.assertAlmostEqual(result.observed_disagreement, 2.0)
        self.assertAlmostEqual(result.expected_disagreement, 3.6)

    def test_ordinal_distance_uses_pooled_order_not_numeric_spacing(self) -> None:
        result = krippendorff_ordinal_alpha(
            (
                ReliabilityUnit("U1", ("low", "mid")),
                ReliabilityUnit("U2", ("mid", "high")),
                ReliabilityUnit("U3", ("low", "high")),
            ),
            ("low", "mid", "high"),
        )
        self.assertEqual(result.estimate_status, "estimated")
        self.assertAlmostEqual(result.value, -0.25)
        self.assertAlmostEqual(result.observed_disagreement, 48.0)
        self.assertAlmostEqual(result.expected_disagreement, 38.4)

    def test_nonpositive_expected_disagreement_is_typed_unsupported(self) -> None:
        result = krippendorff_nominal_alpha(
            (ReliabilityUnit("U1", ("A", "A")),),
            ("A", "B"),
        )
        self.assertEqual(result.estimate_status, "unsupported")
        self.assertEqual(result.reason, "expected_disagreement_nonpositive")
        self.assertIsNone(result.value)


class CalibrationDirectMetricTests(unittest.TestCase):
    def test_hand_derived_scores_bins_auc_and_coverage(self) -> None:
        result = calibration_metrics(
            (
                ("C1", 0.10, False),
                ("C2", 0.40, False),
                ("C3", 0.80, True),
                ("C4", 0.90, True),
            ),
            scheduled_case_count=4,
            bin_count=10,
        )
        self.assertEqual(result.metric_status, "estimated")
        self.assertAlmostEqual(result.brier_score, 0.055)
        self.assertAlmostEqual(
            result.log_loss,
            -(log(0.9) + log(0.6) + log(0.8) + log(0.9)) / 4,
        )
        self.assertAlmostEqual(result.auroc, 1.0)
        self.assertEqual(len(result.reliability_bins), 4)
        self.assertAlmostEqual(result.reliability, 0.055)
        self.assertAlmostEqual(result.resolution, 0.25)
        self.assertAlmostEqual(result.uncertainty, 0.25)
        self.assertEqual(result.prediction_answer_coverage, 1.0)
        self.assertEqual(result.scored_event_coverage, 1.0)
        self.assertEqual(result.observed_event_coverage, 1.0)
        self.assertEqual(len(result.selective_risk), 10)

    def test_missing_predictions_stay_out_of_score_denominators(self) -> None:
        result = calibration_metrics(
            (
                ("C1", 0.10, False),
                ("C2", None, True),
                ("C3", 0.80, True),
                ("C4", 0.90, True),
            ),
            scheduled_case_count=4,
        )
        self.assertEqual(result.scored_case_count, 3)
        self.assertEqual(result.event_count, 2)
        self.assertEqual(result.non_event_count, 1)
        self.assertEqual(result.prediction_answer_coverage, 0.75)
        self.assertEqual(result.scored_event_coverage, 0.75)
        self.assertEqual(result.observed_event_coverage, 1.0)

    def test_generated_arm_f_records_bind_directly_to_metric_input(self) -> None:
        p = protocol()
        replicate = generate_calibration_replicate(
            p,
            scenario(
                p,
                heldout_count={"id": "N100", "value": 100},
                missing_prediction_rate={"id": "MP15", "value": "0.15"},
            ),
            replicate_index=1,
        )
        result = calibration_metrics(
            tuple(
                (row.case_id, row.prediction_value, row.observed_event_value)
                for row in replicate.case_results
            ),
            scheduled_case_count=len(replicate.case_results),
        )
        self.assertEqual(result.scored_case_count, 100 - replicate.missingness.missing_count)
        self.assertEqual(result.observed_case_count, 100)


class CounterfactualPairedEstimatorTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.protocol = protocol()

    def test_transition_band_and_discordance_counts_reconcile(self) -> None:
        replicate = generate_counterfactual_replicate(
            self.protocol,
            scenario(
                self.protocol,
                procedural_rate={"id": "M00", "value": "0.00"},
                missingness_mechanism="MCAR",
                counterfactual_profile="CF0-INVARIANT",
            ),
            replicate_index=1,
        )
        result = counterfactual_paired_summary(replicate)
        self.assertEqual(result.estimate_status, "estimated")
        self.assertEqual(sum(row.count for row in result.transitions), 120)
        self.assertEqual(result.transition_denominator, 120)
        self.assertGreater(result.discordant_pair_count, 0)
        self.assertEqual(
            sum(row.count for row in result.candidate_a_band_differences),
            replicate.denominators.paired_band_denominator,
        )
        self.assertEqual(
            sum(row.count for row in result.candidate_b_band_differences),
            replicate.denominators.paired_band_denominator,
        )

    def test_invalid_operation_is_unsupported_with_no_leaked_output(self) -> None:
        replicate = generate_counterfactual_replicate(
            self.protocol,
            scenario(
                self.protocol,
                procedural_rate={"id": "M00", "value": "0.00"},
                missingness_mechanism="MCAR",
                counterfactual_profile="CF4-INVALID-OPERATION",
            ),
            replicate_index=1,
        )
        result = counterfactual_paired_summary(replicate)
        self.assertEqual(result.estimate_status, "unsupported")
        self.assertEqual(result.reason, "unsupported_estimand_scope")
        self.assertEqual(result.transitions, ())
        self.assertEqual(result.candidate_a_band_differences, ())
        self.assertEqual(result.candidate_b_band_differences, ())


if __name__ == "__main__":
    unittest.main()
