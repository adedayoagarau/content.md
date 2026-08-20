from __future__ import annotations

import math
from pathlib import Path
import sys
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
REPOSITORY_ROOT = PACKAGE_ROOT.parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.leakage import (  # noqa: E402
    build_clean_universe,
    evaluate_leakage_case,
    expand_leakage_matrix,
)
from vt_simulator.manifest import ApprovedRoots, load_validated_protocol  # noqa: E402


def protocol():
    return load_validated_protocol(
        ApprovedRoots(
            protocol_root=PACKAGE_ROOT / "protocol",
            paper_source_root=REPOSITORY_ROOT,
        )
    )


class LeakageUniverseTests(unittest.TestCase):
    def test_exact_clean_universe_counts_and_id_order(self) -> None:
        c10 = build_clean_universe("C10", "K0-CALIBRATED")
        c22 = build_clean_universe("C22", "K3-OVERCONFIDENT")
        self.assertEqual(len(c10), 96)
        self.assertEqual(len(c22), 192)
        self.assertEqual(c10[0].record_id, "LGREC-C10-K0-CALIBRATED-0007-0001-0001-A")
        self.assertEqual(c10[-1].record_id, "LGREC-C10-K0-CALIBRATED-0010-0004-0003-B")
        self.assertEqual(c22[0].family_id, "SMSG-0015")
        self.assertEqual(c22[-1].family_id, "SMSG-0022")
        self.assertEqual(sum(record.event_label for record in c10), 30)

    def test_case_content_hash_excludes_record_id_and_split(self) -> None:
        first = build_clean_universe("C10", "K0-CALIBRATED")[0]
        self.assertRegex(first.case_content_hash, r"^[0-9a-f]{64}$")
        self.assertEqual(first.split, "public_test")
        self.assertIsNone(first.feature_leaked_event)


class LeakageMatrixTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.protocol = protocol()
        cls.cases = expand_leakage_matrix(cls.protocol)

    def test_all_64_cases_expand_in_frozen_order(self) -> None:
        self.assertEqual(len(self.cases), 64)
        self.assertEqual(
            self.cases[0],
            {
                "coverage": "C10",
                "profile": "K0-CALIBRATED",
                "split_overlap_rate": "0.00",
                "label_leakage_rate": "0.00",
            },
        )
        self.assertEqual(
            self.cases[-1],
            {
                "coverage": "C22",
                "profile": "K3-OVERCONFIDENT",
                "split_overlap_rate": "0.20",
                "label_leakage_rate": "0.20",
            },
        )

    def test_clean_cases_are_accepted_and_all_injected_cases_reject(self) -> None:
        for case in self.cases:
            with self.subTest(case=case):
                result = evaluate_leakage_case(case)
                is_clean = (
                    case["split_overlap_rate"] == "0.00"
                    and case["label_leakage_rate"] == "0.00"
                )
                self.assertEqual(result.input_guard_status, "accepted" if is_clean else "rejected_input")
                self.assertEqual(result.detected_union_count, result.injected_union_count)
                self.assertEqual(result.unexpected_acceptance, False)

    def test_injection_count_uses_max_one_ceiling_rule(self) -> None:
        case = {
            "coverage": "C10",
            "profile": "K0-CALIBRATED",
            "split_overlap_rate": "0.01",
            "label_leakage_rate": "0.20",
        }
        result = evaluate_leakage_case(case)
        self.assertEqual(result.eligible_count, 96)
        self.assertEqual(result.split_overlap_injected_count, max(1, math.ceil(0.01 * 96)))
        self.assertEqual(result.label_leakage_injected_count, max(1, math.ceil(0.20 * 96)))
        self.assertEqual(result.injected_union_count, 20)
        self.assertEqual(
            result.reason_codes,
            ("held_out_leakage", "split_overlap"),
        )

    def test_repeated_case_is_byte_stable(self) -> None:
        case = self.cases[37]
        self.assertEqual(evaluate_leakage_case(case), evaluate_leakage_case(case))


if __name__ == "__main__":
    unittest.main()
