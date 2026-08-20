from __future__ import annotations

from pathlib import Path
import sys
import unittest

from pydantic import ValidationError


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.models import HashedRecord, StrictRecord  # noqa: E402


class ExampleRecord(HashedRecord):
    record_type: str
    count: int


class StrictRecordTests(unittest.TestCase):
    def test_exact_values_construct_a_frozen_record(self) -> None:
        record = ExampleRecord(record_hash="a" * 64, record_type="Example", count=3)

        self.assertEqual(record.count, 3)
        with self.assertRaises(ValidationError):
            record.count = 4

    def test_integer_string_is_not_coerced(self) -> None:
        with self.assertRaises(ValidationError):
            ExampleRecord(record_hash="a" * 64, record_type="Example", count="3")

    def test_unknown_field_is_rejected(self) -> None:
        with self.assertRaises(ValidationError):
            ExampleRecord(record_hash="a" * 64, record_type="Example", count=3, extra=True)

    def test_hash_must_be_lowercase_sha256_shape(self) -> None:
        for digest in ("A" * 64, "a" * 63, "g" * 64, ""):
            with self.subTest(digest=digest), self.assertRaises(ValidationError):
                ExampleRecord(record_hash=digest, record_type="Example", count=3)

    def test_base_record_itself_rejects_unknown_fields(self) -> None:
        with self.assertRaises(ValidationError):
            StrictRecord(unknown="value")


if __name__ == "__main__":
    unittest.main()
