from __future__ import annotations

from math import log
from pathlib import Path
import sys
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.analysis import graph_diagnostics  # noqa: E402
from vt_simulator.ml import (  # noqa: E402
    BinaryObservation,
    ComparisonObservation,
    MlValidationError,
    fit_binary_logistic,
    fit_bradley_terry,
    fit_calibration_logit,
    fit_missingness_logit,
    fit_side_order_logit,
    SideOrderObservation,
    OrdinalObservation,
    fit_ordinal_adjacent,
    fit_ordinal_proportional_odds,
)
from vt_simulator.process import ordinal_probabilities  # noqa: E402


class BinaryLogisticTests(unittest.TestCase):
    def test_damped_newton_recovers_exact_grouped_intercept_and_slope(self) -> None:
        x_low = log(0.25 / 0.75)
        x_high = -x_low
        rows = tuple(
            BinaryObservation(f"L{index}", (1.0, x_low), index == 4)
            for index in range(1, 5)
        ) + tuple(
            BinaryObservation(f"H{index}", (1.0, x_high), index != 4)
            for index in range(1, 5)
        )
        result = fit_binary_logistic(
            "TEST-LOGIT",
            ("intercept", "slope"),
            rows,
            start=(0.0, 1.0),
        )
        self.assertEqual(result.attempt_status, "estimated")
        self.assertIsNone(result.reason)
        self.assertAlmostEqual(result.coefficients[0], 0.0, places=10)
        self.assertAlmostEqual(result.coefficients[1], 1.0, places=10)
        self.assertLessEqual(result.maximum_absolute_gradient, 1.0e-10)
        self.assertLessEqual(result.maximum_absolute_step, 1.0e-10)

    def test_shape_nonfinite_and_singular_designs_fail_closed(self) -> None:
        with self.assertRaises(MlValidationError):
            fit_binary_logistic(
                "TEST",
                ("intercept",),
                (BinaryObservation("R1", (1.0, 2.0), True),),
                start=(0.0,),
            )
        singular = fit_binary_logistic(
            "TEST",
            ("intercept", "duplicate"),
            (
                BinaryObservation("R1", (1.0, 1.0), False),
                BinaryObservation("R2", (1.0, 1.0), True),
            ),
            start=(0.0, 0.0),
        )
        self.assertEqual(singular.attempt_status, "estimator_failure")
        self.assertEqual(singular.reason, "estimator_nonconvergence")
        self.assertEqual(singular.coefficients, ())


class CalibrationLogitTests(unittest.TestCase):
    def test_wrapper_uses_frozen_logit_predictor_and_start(self) -> None:
        rows = tuple(
            (f"L{index}", 0.25, index == 4) for index in range(1, 5)
        ) + tuple((f"H{index}", 0.75, index != 4) for index in range(1, 5))
        result = fit_calibration_logit(rows)
        self.assertEqual(result.attempt_status, "estimated")
        self.assertEqual(result.coefficient_names, ("intercept", "slope"))
        self.assertAlmostEqual(result.coefficients[0], 0.0, places=10)
        self.assertAlmostEqual(result.coefficients[1], 1.0, places=10)

    def test_constant_prediction_takes_the_required_precheck_null(self) -> None:
        result = fit_calibration_logit(
            (("R1", 0.5, False), ("R2", 0.5, True))
        )
        self.assertEqual(result.attempt_status, "precheck_undefined")
        self.assertEqual(result.reason, "constant_prediction_calibration_not_identifiable")
        self.assertEqual(result.coefficients, ())

    def test_missingness_wrapper_uses_absolute_sealed_logit_and_boundary_record(self) -> None:
        rows = tuple(
            (f"L{index}", 0.50, index == 4) for index in range(1, 5)
        ) + tuple((f"H{index}", 0.75, index in {3, 4}) for index in range(1, 5))
        result = fit_missingness_logit(rows)
        self.assertEqual(result.attempt_status, "estimated")
        self.assertAlmostEqual(result.coefficients[0], -log(3.0), places=10)
        self.assertAlmostEqual(result.coefficients[1], 1.0, places=10)

        boundary = fit_missingness_logit((), boundary_zero=True)
        self.assertEqual(boundary.attempt_status, "precheck_undefined")
        self.assertEqual(boundary.reason, "diagnostic_inapplicable_boundary")
        self.assertEqual(boundary.coefficients, ())


class SideOrderLogitTests(unittest.TestCase):
    def test_side_coefficient_fits_while_single_card_order_is_unsupported(self) -> None:
        rows = tuple(
            SideOrderObservation(f"L{index}", index == 4, -0.5, None, None)
            for index in range(1, 5)
        ) + tuple(
            SideOrderObservation(f"R{index}", index != 4, 0.5, None, None)
            for index in range(1, 5)
        )
        result = fit_side_order_logit(rows, order_aliased=False, include_carryover=False)
        self.assertEqual(result.attempt_status, "estimated")
        coefficients = {row.name: row for row in result.coefficients}
        self.assertAlmostEqual(coefficients["intercept"].value, 0.0, places=10)
        self.assertAlmostEqual(coefficients["side"].value, log(3.0), places=10)
        self.assertEqual(coefficients["order"].estimate_status, "unsupported")
        self.assertEqual(
            coefficients["order"].reason,
            "order_effect_not_identifiable_single_card",
        )

    def test_aliased_side_or_order_is_removed_without_leaking_a_value(self) -> None:
        rows = tuple(
            SideOrderObservation(
                f"R{index}",
                index % 2 == 0,
                0.5,
                -1.0 if index <= 4 else 1.0,
                None,
            )
            for index in range(1, 9)
        )
        result = fit_side_order_logit(rows, order_aliased=True, include_carryover=False)
        coefficients = {row.name: row for row in result.coefficients}
        self.assertEqual(coefficients["side"].estimate_status, "unsupported")
        self.assertEqual(coefficients["side"].reason, "assignment_aliased")
        self.assertIsNone(coefficients["side"].value)
        self.assertEqual(coefficients["order"].estimate_status, "unsupported")
        self.assertEqual(coefficients["order"].reason, "assignment_aliased")
        self.assertIsNone(coefficients["order"].value)


class BradleyTerryTests(unittest.TestCase):
    VERTICES = tuple(f"T{index}" for index in range(1, 5))

    def test_strong_cycle_has_centered_zero_utilities(self) -> None:
        comparisons = (
            ComparisonObservation("C1", "T1", "T2"),
            ComparisonObservation("C2", "T2", "T3"),
            ComparisonObservation("C3", "T3", "T4"),
            ComparisonObservation("C4", "T4", "T1"),
        )
        diagnostics = graph_diagnostics(
            self.VERTICES,
            tuple((row.winner_id, row.loser_id) for row in comparisons),
            tuple((row.winner_id, row.loser_id) for row in comparisons),
        )
        result = fit_bradley_terry(self.VERTICES, comparisons, diagnostics)
        self.assertEqual(result.attempt_status, "estimated")
        self.assertEqual(result.method_id, "A-BT-ML/design-0.1")
        self.assertAlmostEqual(sum(result.utilities), 0.0, places=12)
        for value in result.utilities:
            self.assertAlmostEqual(value, 0.0, places=10)

    def test_ordinary_fit_rejects_graph_guard_failure(self) -> None:
        comparisons = (
            ComparisonObservation("C1", "T1", "T2"),
            ComparisonObservation("C2", "T2", "T3"),
            ComparisonObservation("C3", "T3", "T4"),
        )
        diagnostics = graph_diagnostics(
            self.VERTICES,
            tuple((row.winner_id, row.loser_id) for row in comparisons),
            tuple((row.winner_id, row.loser_id) for row in comparisons),
        )
        result = fit_bradley_terry(self.VERTICES, comparisons, diagnostics)
        self.assertEqual(result.attempt_status, "precheck_undefined")
        self.assertEqual(result.reason, "observed_graph_not_strongly_connected")
        self.assertEqual(result.utilities, ())

    def test_named_ridge_sensitivity_is_finite_but_not_an_identification_repair(self) -> None:
        comparisons = (
            ComparisonObservation("C1", "T1", "T2"),
            ComparisonObservation("C2", "T2", "T3"),
            ComparisonObservation("C3", "T3", "T4"),
        )
        diagnostics = graph_diagnostics(
            self.VERTICES,
            tuple((row.winner_id, row.loser_id) for row in comparisons),
            tuple((row.winner_id, row.loser_id) for row in comparisons),
        )
        result = fit_bradley_terry(
            self.VERTICES,
            comparisons,
            diagnostics,
            ridge_sensitivity=True,
        )
        self.assertEqual(result.attempt_status, "estimated")
        self.assertEqual(result.method_id, "A-BT-RIDGE/design-0.1")
        self.assertTrue(result.sensitivity_only)
        self.assertAlmostEqual(sum(result.utilities), 0.0, places=12)
        self.assertTrue(all(abs(value) < 20.0 for value in result.utilities))


class OrdinalModelTests(unittest.TestCase):
    @staticmethod
    def deterministic_rows(profile: str) -> tuple[OrdinalObservation, ...]:
        rows = []
        for z_index, z in enumerate((-1.0, -0.5, 0.0, 0.5, 1.0), start=1):
            probabilities = ordinal_probabilities(profile, latent_fit=z)
            cumulative = []
            total = 0.0
            for probability in probabilities:
                total += probability
                cumulative.append(total)
            for index in range(200):
                draw = (index + 0.5) / 200.0
                band = next(
                    band_index
                    for band_index, threshold in enumerate(cumulative)
                    if draw < threshold or band_index == 4
                )
                rows.append(
                    OrdinalObservation(
                        f"R{z_index}-{index + 1:03d}",
                        band,
                        z,
                    )
                )
        return tuple(rows)

    def test_proportional_odds_recovers_ordered_thresholds_and_beta(self) -> None:
        result = fit_ordinal_proportional_odds(
            self.deterministic_rows("OM0-CORRECT-PO")
        )
        self.assertEqual(result.attempt_status, "estimated")
        self.assertEqual(result.method_id, "A-ORD-PO-ML/design-0.1")
        self.assertTrue(
            all(
                result.thresholds[index] < result.thresholds[index + 1]
                for index in range(3)
            )
        )
        for observed, expected in zip(
            result.thresholds,
            (-1.25, -0.35, 0.35, 1.25),
            strict=True,
        ):
            self.assertAlmostEqual(observed, expected, delta=0.06)
        self.assertAlmostEqual(result.slopes[0], 1.0, delta=0.06)

    def test_adjacent_category_recovers_declared_intercepts_and_slopes(self) -> None:
        result = fit_ordinal_adjacent(self.deterministic_rows("OM2-ADJACENT"))
        self.assertEqual(result.attempt_status, "estimated")
        self.assertEqual(result.method_id, "A-ORD-ADJ-ML/design-0.1")
        for observed, expected in zip(
            result.intercepts,
            (1.0, 0.5, -0.5, -1.0),
            strict=True,
        ):
            self.assertAlmostEqual(observed, expected, delta=0.08)
        for observed in result.slopes:
            self.assertAlmostEqual(observed, 1.0, delta=0.08)

    def test_invalid_band_or_nonfinite_latent_fit_is_rejected(self) -> None:
        with self.assertRaises(MlValidationError):
            fit_ordinal_proportional_odds((OrdinalObservation("R1", 5, 0.0),))
        with self.assertRaises(MlValidationError):
            fit_ordinal_adjacent((OrdinalObservation("R1", 0, float("nan")),))


if __name__ == "__main__":
    unittest.main()
