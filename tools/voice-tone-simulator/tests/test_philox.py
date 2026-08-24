from __future__ import annotations

import json
from pathlib import Path
import sys
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.philox import (  # noqa: E402
    increment_counter,
    philox4x32_10,
    word_to_uniform,
)


class PhiloxPrimitiveTests(unittest.TestCase):
    def test_reference_zero_vector(self) -> None:
        self.assertEqual(
            philox4x32_10((0, 0, 0, 0), (0, 0)),
            (0x6627E8D5, 0xE169C58D, 0xBC57AC4C, 0x9B00DBD8),
        )

    def test_normative_protocol_vector(self) -> None:
        vector = json.loads(
            (PACKAGE_ROOT / "tests" / "fixtures" / "philox-vector.json").read_text(
                encoding="utf-8"
            )
        )
        self.assertEqual(
            philox4x32_10(tuple(vector["counter_words"]), tuple(vector["key_words"])),
            tuple(vector["first_output_words"]),
        )

    def test_counter_increments_as_one_big_endian_integer(self) -> None:
        self.assertEqual(
            increment_counter((0, 0, 0, 0xFFFFFFFF)),
            (0, 0, 1, 0),
        )
        self.assertEqual(
            increment_counter((0xFFFFFFFF,) * 4),
            (0, 0, 0, 0),
        )

    def test_uniform_mapping_is_open_interval_midpoint_rule(self) -> None:
        self.assertEqual(word_to_uniform(0), 0.5 / (2**32))
        self.assertEqual(word_to_uniform(0xFFFFFFFF), (0xFFFFFFFF + 0.5) / (2**32))
        self.assertGreater(word_to_uniform(0), 0.0)
        self.assertLess(word_to_uniform(0xFFFFFFFF), 1.0)

    def test_words_outside_uint32_are_rejected(self) -> None:
        with self.assertRaises(ValueError):
            philox4x32_10((0, 0, 0, 2**32), (0, 0))
        with self.assertRaises(ValueError):
            word_to_uniform(-1)


if __name__ == "__main__":
    unittest.main()
