from __future__ import annotations

from pathlib import Path
import sys
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.decisions import (  # noqa: E402
    BiasPrecision,
    DecisionValidationError,
    bounded_probability_summary,
    evaluate_bias_band,
    evaluate_coverage_band,
    evaluate_defined_band,
    evaluate_operating_rule,
    evaluate_type1_band,
    stopping_decision,
)


class EvaluationBandTests(unittest.TestCase):
    def test_probability_summary_reuses_one_exact_denominator(self) -> None:
        result = bounded_probability_summary(950, 1000)
        self.assertEqual(result.numerator, 950)
        self.assertEqual(result.denominator, 1000)
        self.assertEqual(result.value, 0.95)
        self.assertAlmostEqual(result.mcse, (0.95 * 0.05 / 1000) ** 0.5)
        self.assertLess(result.wilson_lower, 0.95)
        self.assertGreater(result.wilson_upper, 0.95)

        zero = bounded_probability_summary(0, 0)
        self.assertIsNone(zero.value)
        self.assertIsNone(zero.mcse)
        self.assertIsNone(zero.wilson_lower)
        self.assertIsNone(zero.wilson_upper)

    def test_defined_bias_coverage_and_type1_bands_are_exact(self) -> None:
        self.assertTrue(evaluate_defined_band(990, 1000, should_be_defined=True).passed)
        self.assertFalse(evaluate_defined_band(989, 1000, should_be_defined=True).passed)
        self.assertTrue(evaluate_defined_band(0, 1000, should_be_defined=False).passed)
        self.assertFalse(evaluate_defined_band(1, 1000, should_be_defined=False).passed)

        probability_bias = evaluate_bias_band(
            mean_estimate=0.54,
            truth=0.50,
            scale_kind="probability",
        )
        self.assertAlmostEqual(probability_bias.standardized_bias, 0.08)
        self.assertTrue(probability_bias.passed)
        self.assertFalse(
            evaluate_bias_band(
                mean_estimate=0.61,
                truth=0.50,
                scale_kind="probability",
            ).passed
        )

        coverage = evaluate_coverage_band(950, 1000)
        self.assertTrue(coverage.passed)
        self.assertTrue(coverage.wilson_contains_nominal)
        self.assertFalse(evaluate_coverage_band(930, 1000).passed)

        type1 = evaluate_type1_band(50, 1000)
        self.assertTrue(type1.passed)
        self.assertTrue(type1.wilson_contains_nominal)
        self.assertFalse(evaluate_type1_band(70, 1000).passed)


class OperatingRuleTests(unittest.TestCase):
    def test_fixed_panel_coverage_and_alpha_cannot_be_promoted_by_point_bands(self) -> None:
        fixed = evaluate_operating_rule(
            "RULE-R3-FIXED-PANEL",
            run_complete=True,
            applicable_bands_pass=True,
            required_intervals_estimated=False,
            prohibited_output_count=0,
            current_fixture_eligible=True,
        )
        self.assertEqual(fixed.result_phrase, "fixed_panel_support_unavailable")
        self.assertEqual(fixed.canonical_status, "requires_simulation")
        self.assertFalse(fixed.supported)

        coverage = evaluate_operating_rule(
            "RULE-C10-COVERAGE",
            run_complete=True,
            applicable_bands_pass=True,
            required_intervals_estimated=False,
            prohibited_output_count=0,
            current_fixture_eligible=True,
        )
        self.assertEqual(coverage.result_phrase, "coverage_candidate_support_unavailable")
        self.assertFalse(coverage.supported)

        alpha = evaluate_operating_rule(
            "RULE-ALPHA-LOWER-BOUND",
            run_complete=True,
            applicable_bands_pass=True,
            required_intervals_estimated=False,
            prohibited_output_count=0,
            current_fixture_eligible=True,
        )
        self.assertEqual(alpha.canonical_status, "requires_cognitive_validation")
        self.assertEqual(alpha.result_phrase, "lower_bound_decision_unavailable")
        self.assertFalse(alpha.supported)

    def test_allocation_and_graph_support_require_complete_clean_exact_evidence(self) -> None:
        allocation = evaluate_operating_rule(
            "RULE-SIDE-ALLOCATION",
            run_complete=True,
            applicable_bands_pass=True,
            required_intervals_estimated=True,
            prohibited_output_count=0,
            current_fixture_eligible=True,
        )
        self.assertTrue(allocation.supported)
        self.assertEqual(allocation.result_phrase, "simulation_supported_for_allocation")
        self.assertEqual(allocation.canonical_status, "requires_pilot_data")

        for changed in (
            {"run_complete": False},
            {"applicable_bands_pass": False},
            {"required_intervals_estimated": False},
            {"prohibited_output_count": 1},
            {"current_fixture_eligible": False},
        ):
            values = {
                "run_complete": True,
                "applicable_bands_pass": True,
                "required_intervals_estimated": True,
                "prohibited_output_count": 0,
                "current_fixture_eligible": True,
            }
            values.update(changed)
            with self.subTest(changed=changed):
                result = evaluate_operating_rule("RULE-GRAPH-GUARD", **values)
                self.assertFalse(result.supported)
                self.assertEqual(result.canonical_status, "requires_simulation")

    def test_unknown_rule_fails_closed(self) -> None:
        with self.assertRaises(DecisionValidationError):
            evaluate_operating_rule(
                "RULE-MAGIC",
                run_complete=True,
                applicable_bands_pass=True,
                required_intervals_estimated=True,
                prohibited_output_count=0,
                current_fixture_eligible=True,
            )


class MonteCarloStoppingTests(unittest.TestCase):
    def test_minimum_batch_increment_and_precision_cap_are_exact(self) -> None:
        early = stopping_decision(
            9000,
            probability_summaries=(bounded_probability_summary(4500, 9000),),
            bias_precision=(),
        )
        self.assertEqual(early.action, "continue")
        self.assertEqual(early.reason, "minimum_replicates_not_met")

        precise = stopping_decision(
            10000,
            probability_summaries=(bounded_probability_summary(500, 10000),),
            bias_precision=(BiasPrecision(0.005, 0.00004),),
        )
        self.assertEqual(precise.action, "complete")
        self.assertEqual(precise.reason, "precision_met")

        continue_result = stopping_decision(
            10000,
            probability_summaries=(bounded_probability_summary(1, 10000),),
            bias_precision=(BiasPrecision(0.02, 0.02),),
        )
        self.assertEqual(continue_result.action, "continue")
        self.assertEqual(continue_result.next_valid_replicate_target, 11000)

        capped = stopping_decision(
            100000,
            probability_summaries=(bounded_probability_summary(1, 100000),),
            bias_precision=(BiasPrecision(0.02, 0.02),),
        )
        self.assertEqual(capped.action, "simulation_precision_unmet")
        self.assertIsNone(capped.next_valid_replicate_target)

    def test_zero_denominator_or_nonthousand_checkpoint_cannot_pass(self) -> None:
        zero = stopping_decision(
            10000,
            probability_summaries=(bounded_probability_summary(0, 0),),
            bias_precision=(),
        )
        self.assertEqual(zero.action, "continue")
        with self.assertRaises(DecisionValidationError):
            stopping_decision(
                10500,
                probability_summaries=(),
                bias_precision=(),
            )


if __name__ == "__main__":
    unittest.main()
