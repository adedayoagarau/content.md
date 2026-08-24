from __future__ import annotations

import hashlib
import json
import math
from pathlib import Path
import sys
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.canonical import (  # noqa: E402
    CanonicalizationError,
    DuplicateKeyError,
    canonical_bytes,
    content_hash,
    load_json_strict,
    verify_record_hash,
)


BASELINE_PREIMAGE = b'{"analysis_profile_id":"VT-MSP-ANALYSIS/design-0.1","factor_selections":{"base_rate":{"id":"Q30","value":"0.30"},"calibration_profile":"K0-CALIBRATED","card_count":{"id":"CARD4","value":4},"counterfactual_profile":"CF0-INVARIANT","coverage":{"calibration":6,"id":"C10","public_test":4,"total":10},"dependence_profile":"D1-MODERATE","graph_profile":"G-NONE","heldout_count":{"id":"N1000","value":1000},"heterogeneity_profile":"H0-HOMOGENEOUS","invalidation_rate":{"id":"I00","value":"0.00"},"locale_stratum":"SLOC-1","minimum_event_count":{"id":"E20","value":20},"missing_prediction_rate":{"id":"MP00","value":"0.00"},"missingness_mechanism":"MCAR","nonlock_rate":{"id":"NL00","value":"0.00"},"nonstart_rate":{"id":"NS00","value":"0.00"},"order_design":"O-BALANCED","order_effect":{"id":"OFX0","value":"0.00"},"ordinal_profile":"OM0-CORRECT-PO","prevalence_profile":"P0-BALANCED","procedural_rate":{"id":"M05","value":"0.05"},"rater_count":{"id":"R3","value":3},"session_profile":"X0-NONE","side_design":"S-EXACT","side_effect":{"id":"SFX0","value":"0.00"},"treatment_context":{"id":"TC0-NONE","value":"0.00"}},"generating_profile_id":"VT-MSP-DGM/design-0.1","math_profile_id":"VT-MSP-MATH/design-0.1","scenario_grid_id":"VT-MSP-GRID/design-0.1","schedule_profile_id":"VT-MSP-SCHEDULE/design-0.1","target_id":"T-FIXED-FIXED","target_population_kind":"fixed_messages_fixed_panel"}'
BASELINE_HASH = "99174ca8571c01f2decac14e6247398bf5dad82e879a92c4d08fab8883925066"


class StrictJsonTests(unittest.TestCase):
    def test_baseline_preimage_round_trips_to_normative_hash(self) -> None:
        parsed = load_json_strict(BASELINE_PREIMAGE)

        encoded = canonical_bytes(parsed)

        self.assertEqual(encoded, BASELINE_PREIMAGE)
        self.assertEqual(hashlib.sha256(encoded).hexdigest(), BASELINE_HASH)

    def test_duplicate_object_key_is_rejected(self) -> None:
        with self.assertRaises(DuplicateKeyError):
            load_json_strict(b'{"a":1,"a":2}')

    def test_nonfinite_json_constant_is_rejected(self) -> None:
        for raw in (b'{"value":NaN}', b'{"value":Infinity}', b'{"value":-Infinity}'):
            with self.subTest(raw=raw), self.assertRaises(CanonicalizationError):
                load_json_strict(raw)

    def test_negative_zero_json_number_is_rejected(self) -> None:
        for raw in (b'{"value":-0}', b'{"value":-0.0}', b'{"value":-0e0}'):
            with self.subTest(raw=raw), self.assertRaises(CanonicalizationError):
                load_json_strict(raw)


class CanonicalBytesTests(unittest.TestCase):
    def test_object_keys_are_sorted_but_array_order_is_retained(self) -> None:
        first = canonical_bytes({"z": 1, "a": [2, 1]})
        second = canonical_bytes({"a": [1, 2], "z": 1})

        self.assertEqual(first, b'{"a":[2,1],"z":1}')
        self.assertEqual(second, b'{"a":[1,2],"z":1}')
        self.assertNotEqual(first, second)

    def test_non_ascii_text_is_utf8_and_not_ascii_escaped(self) -> None:
        self.assertEqual(canonical_bytes({"text": "مرحبا"}), '{"text":"مرحبا"}'.encode())

    def test_non_string_mapping_key_is_rejected(self) -> None:
        with self.assertRaises(CanonicalizationError):
            canonical_bytes({1: "not allowed"})

    def test_negative_zero_float_is_rejected(self) -> None:
        self.assertLess(math.copysign(1.0, -0.0), 0)
        with self.assertRaises(CanonicalizationError):
            canonical_bytes({"value": -0.0})


class RecordHashTests(unittest.TestCase):
    def test_content_hash_omits_only_requested_top_level_field(self) -> None:
        record = {"record_hash": "ignored", "record_type": "Example", "value": 7}
        expected = hashlib.sha256(b'{"record_type":"Example","value":7}').hexdigest()

        self.assertEqual(content_hash(record, omit=frozenset({"record_hash"})), expected)

    def test_verify_record_hash_accepts_exact_digest(self) -> None:
        record = {"record_hash": "", "record_type": "Example", "value": 7}
        record["record_hash"] = content_hash(record, omit=frozenset({"record_hash"}))

        verify_record_hash(record)

    def test_verify_record_hash_rejects_uppercase_or_wrong_digest(self) -> None:
        base = {"record_type": "Example", "value": 7}
        correct = content_hash(base)
        for digest in (correct.upper(), "0" * 64):
            with self.subTest(digest=digest), self.assertRaises(CanonicalizationError):
                verify_record_hash({**base, "record_hash": digest})


if __name__ == "__main__":
    unittest.main()
