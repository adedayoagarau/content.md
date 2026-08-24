from __future__ import annotations

from pathlib import Path
import sys
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.numerics import (  # noqa: E402
    NumericValidationError,
    hyndman_fan_type7,
    inverse_regularized_beta,
    inverse_normal_as241,
    wilson_interval,
)


class InverseBetaTests(unittest.TestCase):
    def test_uniform_beta_is_the_identity(self) -> None:
        for probability in (0.000001, 0.25, 0.5, 0.999999):
            with self.subTest(probability=probability):
                self.assertAlmostEqual(
                    inverse_regularized_beta(probability, 1.0, 1.0),
                    probability,
                    places=12,
                )

    def test_beta_two_two_matches_a_hand_derived_cdf_point(self) -> None:
        # Beta(2,2) has CDF 3*x^2 - 2*x^3, which is 0.15625 at x=0.25.
        self.assertAlmostEqual(
            inverse_regularized_beta(0.15625, 2.0, 2.0), 0.25, places=12
        )

    def test_invalid_beta_domains_fail_closed(self) -> None:
        for probability, alpha, beta in (
            (0.0, 1.0, 1.0),
            (1.0, 1.0, 1.0),
            (0.5, 0.0, 1.0),
            (0.5, 1.0, 0.0),
        ):
            with self.subTest(values=(probability, alpha, beta)):
                with self.assertRaises(NumericValidationError):
                    inverse_regularized_beta(probability, alpha, beta)


class InverseNormalTests(unittest.TestCase):
    def test_hand_checkable_quantiles(self) -> None:
        self.assertEqual(inverse_normal_as241(0.5), 0.0)
        self.assertAlmostEqual(inverse_normal_as241(0.975), 1.959963984540054, places=14)
        self.assertAlmostEqual(inverse_normal_as241(0.025), -1.959963984540054, places=14)

    def test_symmetry_and_tail_are_stable(self) -> None:
        for probability in (0.0001, 0.01, 0.1, 0.3):
            with self.subTest(probability=probability):
                self.assertAlmostEqual(
                    inverse_normal_as241(probability),
                    -inverse_normal_as241(1.0 - probability),
                    places=12,
                )
        self.assertAlmostEqual(inverse_normal_as241(0.0001), -3.71901648545568, places=13)

    def test_endpoints_and_non_numeric_inputs_fail(self) -> None:
        for value in (0.0, 1.0, -0.1, 1.1, True, "0.5"):
            with self.subTest(value=value):
                with self.assertRaises(NumericValidationError):
                    inverse_normal_as241(value)  # type: ignore[arg-type]


class IntervalPrimitiveTests(unittest.TestCase):
    def test_wilson_endpoints_and_balanced_case(self) -> None:
        zero = wilson_interval(0, 10)
        self.assertEqual(zero.status, "estimated")
        self.assertAlmostEqual(zero.lower, 0.0, places=15)
        self.assertAlmostEqual(zero.upper, 0.2775327998628892, places=14)
        full = wilson_interval(10, 10)
        self.assertAlmostEqual(full.lower, 0.7224672001371107, places=14)
        self.assertAlmostEqual(full.upper, 1.0, places=15)
        balanced = wilson_interval(5, 10)
        self.assertAlmostEqual(balanced.lower, 0.236593090512564, places=14)
        self.assertAlmostEqual(balanced.upper, 0.763406909487436, places=14)

    def test_zero_denominator_is_typed_null(self) -> None:
        result = wilson_interval(0, 0)
        self.assertEqual(result.status, "undefined")
        self.assertEqual(result.reason, "zero_denominator")
        self.assertIsNone(result.lower)
        self.assertIsNone(result.upper)

    def test_hyndman_fan_type7_interpolates_exactly(self) -> None:
        values = (0.0, 10.0)
        self.assertEqual(hyndman_fan_type7(values, 0.0), 0.0)
        self.assertEqual(hyndman_fan_type7(values, 0.25), 2.5)
        self.assertEqual(hyndman_fan_type7(values, 0.975), 9.75)
        self.assertEqual(hyndman_fan_type7(values, 1.0), 10.0)

    def test_interval_domains_reject_invalid_inputs(self) -> None:
        for successes, trials in ((-1, 10), (11, 10), (1, 0)):
            with self.subTest(successes=successes, trials=trials):
                with self.assertRaises(NumericValidationError):
                    wilson_interval(successes, trials)
        for probability in (-0.1, 1.1):
            with self.subTest(probability=probability):
                with self.assertRaises(NumericValidationError):
                    hyndman_fan_type7((1.0,), probability)


if __name__ == "__main__":
    unittest.main()
