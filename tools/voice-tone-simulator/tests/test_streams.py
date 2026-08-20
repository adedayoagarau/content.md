from __future__ import annotations

import hashlib
import json
from pathlib import Path
import sys
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.streams import (  # noqa: E402
    StreamCoordinates,
    StreamOwnershipError,
    StreamRegistry,
    derive_stream,
)


VECTOR = json.loads(
    (PACKAGE_ROOT / "tests" / "fixtures" / "philox-vector.json").read_text(
        encoding="utf-8"
    )
)


def coordinates(**changes: object) -> StreamCoordinates:
    values: dict[str, object] = {
        "protocol_id": VECTOR["protocol_id"],
        "master_seed_hex": VECTOR["master_seed_hex"],
        "scenario_parameter_hash": VECTOR["scenario_parameter_hash"],
        "population_block_hash": VECTOR["population_block_hash"],
        "replicate_index": VECTOR["replicate_index"],
        "stream_name": VECTOR["stream_name"],
        "target_id": "T-FIXED-FIXED",
        "expected_purposes": ("split", "side", "family_order", "card_order", "counterfactual_order"),
    }
    values.update(changes)
    return StreamCoordinates(**values)


class StreamDerivationTests(unittest.TestCase):
    def test_normative_digest_key_counter_and_fingerprint(self) -> None:
        stream = derive_stream(coordinates())
        self.assertEqual(stream.coordinate_digest_hex, VECTOR["digest_hex"])
        self.assertEqual(stream.key, tuple(VECTOR["key_words"]))
        self.assertEqual(stream.initial_counter, tuple(VECTOR["counter_words"]))
        self.assertEqual(stream.stream_fingerprint, VECTOR["stream_fingerprint"])
        self.assertEqual(stream.next_block(), tuple(VECTOR["first_output_words"]))

    def test_coordinate_preimage_uses_exact_nul_separators(self) -> None:
        subject = VECTOR["scenario_parameter_hash"]
        raw = "\0".join(
            [VECTOR["protocol_id"], VECTOR["master_seed_hex"], subject, "1", "allocation"]
        ).encode("utf-8")
        self.assertEqual(hashlib.sha256(raw).hexdigest(), VECTOR["digest_hex"])

    def test_finite_effects_substitutes_population_block_hash(self) -> None:
        stream = derive_stream(
            coordinates(
                replicate_index="0",
                stream_name="finite-effects",
                expected_purposes=("family:preference:SMSG-0001",),
            )
        )
        expected = hashlib.sha256(
            "\0".join(
                [
                    VECTOR["protocol_id"],
                    VECTOR["master_seed_hex"],
                    VECTOR["population_block_hash"],
                    "0",
                    "finite-effects",
                ]
            ).encode("utf-8")
        ).hexdigest()
        self.assertEqual(stream.coordinate_digest_hex, expected)

    def test_repeated_independent_derivation_is_identical(self) -> None:
        left = derive_stream(coordinates())
        right = derive_stream(coordinates())
        self.assertEqual(left.next_block(), right.next_block())


class StreamOwnershipTests(unittest.TestCase):
    def test_owned_uniforms_require_exact_purpose_order_and_full_close(self) -> None:
        stream = derive_stream(coordinates(expected_purposes=("first", "second")))
        first = stream.uniform("first")
        second = stream.uniform("second")
        self.assertTrue(0.0 < first < 1.0)
        self.assertTrue(0.0 < second < 1.0)
        receipt = stream.close()
        self.assertEqual(receipt.expected_draw_count, 2)
        self.assertEqual(receipt.observed_draw_count, 2)

    def test_wrong_purpose_early_close_and_excess_draw_fail(self) -> None:
        with self.subTest("wrong purpose"):
            stream = derive_stream(coordinates(expected_purposes=("first",)))
            with self.assertRaises(StreamOwnershipError):
                stream.uniform("second")
        with self.subTest("early close"):
            stream = derive_stream(coordinates(expected_purposes=("first",)))
            with self.assertRaises(StreamOwnershipError):
                stream.close()
        with self.subTest("excess"):
            stream = derive_stream(coordinates(expected_purposes=("first",)))
            stream.uniform("first")
            with self.assertRaises(StreamOwnershipError):
                stream.uniform("second")

    def test_registry_rejects_duplicate_coordinate_ownership(self) -> None:
        registry = StreamRegistry()
        derive_stream(coordinates(), registry=registry)
        with self.assertRaises(StreamOwnershipError):
            derive_stream(coordinates(), registry=registry)

    def test_malformed_or_out_of_range_replicate_indices_fail(self) -> None:
        for invalid in ("", "00", "-1", "100001"):
            with self.subTest(value=invalid):
                with self.assertRaises(StreamOwnershipError):
                    derive_stream(coordinates(replicate_index=invalid))

    def test_finite_effect_and_reference_ranges_are_distinct(self) -> None:
        replicate_stream = derive_stream(
            coordinates(stream_name="finite-effects", replicate_index="1")
        )
        self.assertNotEqual(replicate_stream.coordinate_digest_hex, "")
        with self.assertRaises(StreamOwnershipError):
            derive_stream(
                coordinates(stream_name="finite-effects", replicate_index="100001")
            )
        with self.assertRaises(StreamOwnershipError):
            derive_stream(
                coordinates(stream_name="finite-effects-reference", replicate_index="0")
            )

    def test_unknown_stream_name_is_rejected(self) -> None:
        with self.assertRaises(StreamOwnershipError):
            derive_stream(coordinates(stream_name="analyst-random"))


if __name__ == "__main__":
    unittest.main()
