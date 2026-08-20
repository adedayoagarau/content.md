from __future__ import annotations

from pathlib import Path
import sys
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.intervals import (  # noqa: E402
    IntervalValidationError,
    cluster_resample_plan,
    interval_contract,
    naive_wald_interval,
    percentile_interval,
)


class IntervalContractTests(unittest.TestCase):
    def test_target_and_estimator_mapping_is_exact_and_fail_closed(self) -> None:
        self.assertEqual(
            interval_contract(
                "fixed_messages_fixed_panel", modeled_coefficient=True
            ).method_id,
            "I-FIXED-PARAM-PCT/design-0.1",
        )
        self.assertEqual(
            interval_contract(
                "new_messages_fixed_panel", modeled_coefficient=False
            ).method_id,
            "I-MESSAGE-PCT/design-0.1",
        )
        self.assertEqual(
            interval_contract(
                "fixed_messages_rater_population", modeled_coefficient=False
            ).method_id,
            "I-RATER-PCT/design-0.1",
        )
        self.assertEqual(
            interval_contract(
                "new_messages_rater_population", modeled_coefficient=False
            ).method_id,
            "I-CROSSED-PCT/design-0.1",
        )

        unsupported = interval_contract(
            "fixed_messages_fixed_panel", modeled_coefficient=False
        )
        self.assertEqual(unsupported.interval_status, "unsupported_scope")
        self.assertEqual(unsupported.reason, "unsupported_target_scope")
        self.assertIsNone(unsupported.method_id)

        naive = interval_contract(
            "new_messages_fixed_panel",
            modeled_coefficient=False,
            naive_mismatch_control=True,
        )
        self.assertEqual(naive.method_id, "I-NAIVE-WALD/design-0.1")
        self.assertTrue(naive.diagnostic_only)

    def test_unknown_target_is_rejected(self) -> None:
        with self.assertRaises(IntervalValidationError):
            interval_contract("new_planet", modeled_coefficient=False)


class PercentileIntervalTests(unittest.TestCase):
    def test_exact_1999_successes_use_type7_quantiles(self) -> None:
        result = percentile_interval(
            tuple(float(index) for index in range(1999)),
            method_id="I-FIXED-PARAM-PCT/design-0.1",
            failed_resample_count=0,
        )
        self.assertEqual(result.interval_status, "estimated")
        self.assertEqual(result.successful_resample_count, 1999)
        self.assertEqual(result.failed_resample_count, 0)
        self.assertAlmostEqual(result.lower, 49.95)
        self.assertAlmostEqual(result.upper, 1948.05)

    def test_failure_limit_is_100_not_more_than_100(self) -> None:
        result = percentile_interval(
            tuple(float(index) for index in range(1899)),
            method_id="I-MESSAGE-PCT/design-0.1",
            failed_resample_count=100,
        )
        self.assertEqual(result.interval_status, "undefined")
        self.assertEqual(result.reason, "failed_resample_limit")
        self.assertIsNone(result.lower)
        self.assertIsNone(result.upper)

        allowed = percentile_interval(
            tuple(float(index) for index in range(1900)),
            method_id="I-MESSAGE-PCT/design-0.1",
            failed_resample_count=99,
        )
        self.assertEqual(allowed.interval_status, "estimated")

    def test_wrong_total_or_nonfinite_value_is_rejected(self) -> None:
        with self.assertRaises(IntervalValidationError):
            percentile_interval(
                (1.0,),
                method_id="I-RATER-PCT/design-0.1",
                failed_resample_count=0,
            )
        with self.assertRaises(IntervalValidationError):
            percentile_interval(
                (float("nan"),) * 1999,
                method_id="I-RATER-PCT/design-0.1",
                failed_resample_count=0,
            )


class ResamplePlanTests(unittest.TestCase):
    FAMILIES = ("F1", "F2", "F3")
    RATERS = ("R1", "R2")

    def test_message_rater_and_crossed_multiplicities_use_floor_rule(self) -> None:
        message = cluster_resample_plan(
            "I-MESSAGE-PCT/design-0.1",
            self.FAMILIES,
            self.RATERS,
            (0.0, 0.34, 0.99),
        )
        self.assertEqual(message.family_multiplicities, (("F1", 1), ("F2", 1), ("F3", 1)))
        self.assertEqual(message.rater_multiplicities, (("R1", 1), ("R2", 1)))

        rater = cluster_resample_plan(
            "I-RATER-PCT/design-0.1",
            self.FAMILIES,
            self.RATERS,
            (0.99, 0.99),
        )
        self.assertEqual(rater.rater_multiplicities, (("R1", 0), ("R2", 2)))
        self.assertEqual(rater.record_weight("F1", "R2"), 2)

        crossed = cluster_resample_plan(
            "I-CROSSED-PCT/design-0.1",
            self.FAMILIES,
            self.RATERS,
            (0.0, 0.0, 0.99, 0.0, 0.99),
        )
        self.assertEqual(crossed.family_multiplicities, (("F1", 2), ("F2", 0), ("F3", 1)))
        self.assertEqual(crossed.rater_multiplicities, (("R1", 1), ("R2", 1)))
        self.assertEqual(crossed.record_weight("F1", "R2"), 2)
        self.assertEqual(crossed.record_weight("F2", "R1"), 0)

    def test_draw_count_unit_order_and_unknown_record_fail_closed(self) -> None:
        with self.assertRaises(IntervalValidationError):
            cluster_resample_plan(
                "I-CROSSED-PCT/design-0.1",
                self.FAMILIES,
                self.RATERS,
                (0.1,),
            )
        with self.assertRaises(IntervalValidationError):
            cluster_resample_plan(
                "I-MESSAGE-PCT/design-0.1",
                ("F2", "F1"),
                self.RATERS,
                (0.1, 0.2),
            )


class NaiveWaldTests(unittest.TestCase):
    def test_deliberate_mismatch_does_not_clip_endpoints(self) -> None:
        result = naive_wald_interval(0.10, 10)
        self.assertEqual(result.method_id, "I-NAIVE-WALD/design-0.1")
        self.assertTrue(result.diagnostic_only)
        self.assertLess(result.lower, 0.0)
        self.assertGreater(result.upper, 0.1)


if __name__ == "__main__":
    unittest.main()
