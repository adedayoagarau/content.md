from __future__ import annotations

from pathlib import Path
import sys
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.dispatch import (  # noqa: E402
    DispatchValidationError,
    analysis_dispatch,
    terminal_disposition,
)


class EstimandDispositionTests(unittest.TestCase):
    def test_all_eleven_estimands_keep_the_locked_terminal_state(self) -> None:
        expected = {
            "EST-01": "design_supported",
            "EST-02": "design_supported",
            "EST-03": "requires_cognitive_validation",
            "EST-04": "requires_cognitive_validation",
            "EST-05": "requires_pilot_data",
            "EST-06": "requires_simulation",
            "EST-07": "unsupported",
            "EST-08": "unsupported",
            "EST-09": "requires_cognitive_validation",
            "EST-10": "unsupported",
            "EST-11": "unsupported",
        }
        self.assertEqual(
            {estimand: terminal_disposition(estimand) for estimand in expected},
            expected,
        )
        with self.assertRaises(DispatchValidationError):
            terminal_disposition("EST-12")


class ArmMethodDispatchTests(unittest.TestCase):
    def test_primary_arm_methods_are_exact(self) -> None:
        expected = {
            "ARM-A-OUTCOME": ("A-CAT-PROP/design-0.1", "A-ALPHA-NOM/design-0.1"),
            "ARM-B-COVERAGE": ("A-CAT-PROP/design-0.1", "A-ALPHA-NOM/design-0.1"),
            "ARM-C-ALLOCATION": ("A-SIDEORDER-LOGIT/design-0.1",),
            "ARM-D-GRAPH": ("A-BT-ML/design-0.1",),
            "ARM-E-INTERVAL": ("A-CAT-PROP/design-0.1",),
            "ARM-I-PROCESS": ("A-CAT-PROP/design-0.1",),
            "ARM-K-COUNTERFACTUAL": ("A-CF-PAIRED/design-0.1",),
        }
        for arm, methods in expected.items():
            with self.subTest(arm=arm):
                result = analysis_dispatch(
                    arm,
                    target_population_kind="fixed_messages_fixed_panel",
                    ordinal_profile="OM0-CORRECT-PO",
                    calibration_profile="K0-CALIBRATED",
                )
                self.assertEqual(result.primary_method_ids, methods)

    def test_conditional_f_and_j_methods_and_sensitivities_are_exact(self) -> None:
        ordinary_f = analysis_dispatch(
            "ARM-F-CALIBRATION",
            target_population_kind="fixed_messages_fixed_panel",
            ordinal_profile="OM0-CORRECT-PO",
            calibration_profile="K0-CALIBRATED",
        )
        self.assertEqual(
            ordinary_f.primary_method_ids,
            ("A-CAL-LOGIT/design-0.1",),
        )
        k6 = analysis_dispatch(
            "ARM-F-CALIBRATION",
            target_population_kind="fixed_messages_fixed_panel",
            ordinal_profile="OM0-CORRECT-PO",
            calibration_profile="K6-MISSING-INFORMATIVE",
        )
        self.assertEqual(
            k6.primary_method_ids,
            ("A-CAL-LOGIT/design-0.1", "A-CAL-MISS-LOGIT/design-0.1"),
        )

        po = analysis_dispatch(
            "ARM-J-HETEROGENEITY-ORDINAL",
            target_population_kind="fixed_messages_fixed_panel",
            ordinal_profile="OM0-CORRECT-PO",
            calibration_profile="K0-CALIBRATED",
        )
        self.assertEqual(
            po.primary_method_ids,
            ("A-ALPHA-ORD/design-0.1", "A-ORD-PO-ML/design-0.1"),
        )
        adjacent = analysis_dispatch(
            "ARM-J-HETEROGENEITY-ORDINAL",
            target_population_kind="fixed_messages_fixed_panel",
            ordinal_profile="OM3-SPARSE",
            calibration_profile="K0-CALIBRATED",
        )
        self.assertEqual(
            adjacent.primary_method_ids,
            ("A-ALPHA-ORD/design-0.1", "A-ORD-ADJ-ML/design-0.1"),
        )
        graph = analysis_dispatch(
            "ARM-D-GRAPH",
            target_population_kind="fixed_messages_fixed_panel",
            ordinal_profile="OM0-CORRECT-PO",
            calibration_profile="K0-CALIBRATED",
        )
        self.assertEqual(
            graph.sensitivity_method_ids,
            ("A-BT-RIDGE/design-0.1",),
        )

    def test_interval_dispatch_preserves_fixed_target_gaps_and_arm_e_methods(self) -> None:
        fixed_counterfactual = analysis_dispatch(
            "ARM-K-COUNTERFACTUAL",
            target_population_kind="fixed_messages_fixed_panel",
            ordinal_profile="OM0-CORRECT-PO",
            calibration_profile="K0-CALIBRATED",
        )
        self.assertEqual(fixed_counterfactual.interval_status, "unsupported_scope")
        self.assertEqual(fixed_counterfactual.interval_reason, "unsupported_target_scope")

        modeled = analysis_dispatch(
            "ARM-C-ALLOCATION",
            target_population_kind="fixed_messages_fixed_panel",
            ordinal_profile="OM0-CORRECT-PO",
            calibration_profile="K0-CALIBRATED",
        )
        self.assertEqual(
            modeled.interval_method_ids,
            ("I-FIXED-PARAM-PCT/design-0.1",),
        )

        arm_e = analysis_dispatch(
            "ARM-E-INTERVAL",
            target_population_kind="new_messages_rater_population",
            ordinal_profile="OM0-CORRECT-PO",
            calibration_profile="K0-CALIBRATED",
        )
        self.assertEqual(
            arm_e.interval_method_ids,
            (
                "I-CROSSED-PCT/design-0.1",
                "I-MESSAGE-PCT/design-0.1",
                "I-RATER-PCT/design-0.1",
                "I-NAIVE-WALD/design-0.1",
            ),
        )
        self.assertEqual(arm_e.interval_status, "eligible")

    def test_unknown_arm_or_profile_fails_closed(self) -> None:
        with self.assertRaises(DispatchValidationError):
            analysis_dispatch(
                "ARM-Z",
                target_population_kind="fixed_messages_fixed_panel",
                ordinal_profile="OM0-CORRECT-PO",
                calibration_profile="K0-CALIBRATED",
            )
        with self.assertRaises(DispatchValidationError):
            analysis_dispatch(
                "ARM-J-HETEROGENEITY-ORDINAL",
                target_population_kind="fixed_messages_fixed_panel",
                ordinal_profile="OMX",
                calibration_profile="K0-CALIBRATED",
            )


if __name__ == "__main__":
    unittest.main()
