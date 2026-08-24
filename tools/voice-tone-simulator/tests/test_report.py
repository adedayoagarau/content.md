from __future__ import annotations

import io
from pathlib import Path
import sys
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.report import render_jsonl  # noqa: E402


class CanonicalJsonLinesTests(unittest.TestCase):
    def test_renderer_emits_rfc8785_lines_without_mutating_records(self) -> None:
        records = ({"z": 1, "a": "مرحبا"}, {"value": 0.5, "record_type": "Example"})
        before = tuple(dict(record) for record in records)
        sink = io.BytesIO()

        render_jsonl(records, sink)

        self.assertEqual(
            sink.getvalue(),
            (
                '{"a":"مرحبا","z":1}\n'
                '{"record_type":"Example","value":0.5}\n'
            ).encode("utf-8"),
        )
        self.assertEqual(records, before)


if __name__ == "__main__":
    unittest.main()
