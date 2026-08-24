from __future__ import annotations

from collections import Counter
import io
import json
from pathlib import Path
import sys
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
REPOSITORY_ROOT = PACKAGE_ROOT.parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.manifest import ApprovedRoots, load_validated_protocol  # noqa: E402
from vt_simulator.canonical import content_hash  # noqa: E402
from vt_simulator.records import validate_record_set  # noqa: E402
from vt_simulator.report import render_jsonl  # noqa: E402
from vt_simulator.runner import ConformanceEnvelope, run_conformance  # noqa: E402
from vt_simulator.verify import VerificationError, verify_stream  # noqa: E402


def protocol():
    return load_validated_protocol(
        ApprovedRoots(
            protocol_root=PACKAGE_ROOT / "protocol",
            paper_source_root=REPOSITORY_ROOT,
        )
    )


class BoundedRunnerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.records = tuple(
            run_conformance(
                ConformanceEnvelope(
                    package_root=PACKAGE_ROOT,
                    protocol=protocol(),
                    scenario_id="SIM-99174ca8571c01f2deca",
                    replicates=1,
                )
            )
        )

    def test_one_replicate_emits_complete_ordered_record_set(self) -> None:
        self.assertEqual(len(self.records), 363)
        self.assertEqual(
            [record.record_ordinal for record in self.records],
            list(range(len(self.records))),
        )
        self.assertEqual(
            Counter(record.record_type for record in self.records),
            {
                "SimulationDesignRecord": 1,
                "ScenarioRecord": 1,
                "SimulationRunRecord": 1,
                "AssignmentDispositionRecord": 120,
                "SyntheticRatingRecord": 120,
                "SyntheticMappingRecord": 115,
                "ReplicateRecord": 1,
                "MetricRecord": 1,
                "IntervalRecord": 1,
                "CellDecisionRecord": 1,
                "ProvenanceRecord": 1,
            },
        )
        report = validate_record_set(self.records)
        self.assertEqual(report.record_count, 363)

    def test_baseline_summary_is_derived_without_promoting_a_claim(self) -> None:
        metric = next(record for record in self.records if record.record_type == "MetricRecord")
        interval = next(
            record for record in self.records if record.record_type == "IntervalRecord"
        )
        decision = next(
            record for record in self.records if record.record_type == "CellDecisionRecord"
        )

        self.assertEqual(metric.numerator, 37)
        self.assertEqual(metric.denominator, 115)
        self.assertAlmostEqual(metric.estimate_value, 37 / 115)
        self.assertEqual(metric.terminal_status, "requires_pilot_data")
        self.assertEqual(interval.interval_status, "unsupported_scope")
        self.assertEqual(interval.interval_reason_codes, ("unsupported_target_scope",))
        self.assertEqual(decision.operating_decision, "requires_simulation")
        self.assertEqual(decision.authority, "none")

    def test_repeated_run_is_record_for_record_identical(self) -> None:
        repeated = tuple(
            run_conformance(
                ConformanceEnvelope(
                    package_root=PACKAGE_ROOT,
                    protocol=protocol(),
                    scenario_id="SIM-99174ca8571c01f2deca",
                    replicates=1,
                )
            )
        )
        self.assertEqual(self.records, repeated)


class IndependentStreamVerifierTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.protocol = protocol()
        cls.records = tuple(
            run_conformance(
                ConformanceEnvelope(
                    package_root=PACKAGE_ROOT,
                    protocol=cls.protocol,
                    scenario_id="SIM-99174ca8571c01f2deca",
                    replicates=1,
                )
            )
        )
        cls.stream = io.BytesIO()
        render_jsonl(cls.records, cls.stream)
        cls.raw = cls.stream.getvalue()

    def test_independent_verifier_accepts_exact_stream(self) -> None:
        result = verify_stream(io.BytesIO(self.raw), self.protocol, PACKAGE_ROOT)

        self.assertEqual(result["record_type"], "RecordStreamVerificationRecord")
        self.assertEqual(result["status"], "pass")
        self.assertEqual(result["record_count"], 363)
        self.assertEqual(result["replicate_count"], 1)
        self.assertRegex(result["record_hash"], r"^[0-9a-f]{64}$")

    def test_hash_corruption_is_rejected_precisely(self) -> None:
        lines = self.raw.splitlines()
        record = json.loads(lines[3])
        record["record_hash"] = "0" * 64
        lines[3] = json.dumps(record, separators=(",", ":"), sort_keys=True).encode()

        with self.assertRaisesRegex(VerificationError, "record hash"):
            verify_stream(io.BytesIO(b"\n".join(lines) + b"\n"), self.protocol, PACKAGE_ROOT)

    def test_rehashed_denominator_mismatch_is_rejected(self) -> None:
        rows = [json.loads(line) for line in self.raw.splitlines()]
        metric = next(row for row in rows if row["record_type"] == "MetricRecord")
        metric["numerator"] -= 1
        metric["estimate_value"] = metric["numerator"] / metric["denominator"]
        metric["record_hash"] = content_hash(metric, omit=frozenset({"record_hash"}))
        raw = b"\n".join(
            json.dumps(row, separators=(",", ":"), sort_keys=True).encode() for row in rows
        ) + b"\n"

        with self.assertRaisesRegex(VerificationError, "metric numerator"):
            verify_stream(io.BytesIO(raw), self.protocol, PACKAGE_ROOT)

    def test_rehashed_ordinal_gap_is_rejected(self) -> None:
        rows = [json.loads(line) for line in self.raw.splitlines()]
        rows[10]["record_ordinal"] = 999
        rows[10]["record_hash"] = content_hash(
            rows[10], omit=frozenset({"record_hash"})
        )
        raw = b"\n".join(
            json.dumps(row, separators=(",", ":"), sort_keys=True).encode() for row in rows
        ) + b"\n"

        with self.assertRaisesRegex(VerificationError, "record ordinals"):
            verify_stream(io.BytesIO(raw), self.protocol, PACKAGE_ROOT)

    def test_rehashed_replicate_count_mismatch_is_rejected(self) -> None:
        rows = [json.loads(line) for line in self.raw.splitlines()]
        replicate = next(row for row in rows if row["record_type"] == "ReplicateRecord")
        replicate["counts"]["submitted"] -= 1
        replicate["record_hash"] = content_hash(
            replicate, omit=frozenset({"record_hash"})
        )
        raw = b"\n".join(
            json.dumps(row, separators=(",", ":"), sort_keys=True).encode() for row in rows
        ) + b"\n"

        with self.assertRaisesRegex(VerificationError, "counts"):
            verify_stream(io.BytesIO(raw), self.protocol, PACKAGE_ROOT)

    def test_rehashed_status_value_contradiction_is_rejected(self) -> None:
        rows = [json.loads(line) for line in self.raw.splitlines()]
        rating = next(
            row
            for row in rows
            if row["record_type"] == "SyntheticRatingRecord"
            and row["response_status"] == "submitted"
        )
        rating["display_pairwise_outcome"] = None
        rating["record_hash"] = content_hash(rating, omit=frozenset({"record_hash"}))
        raw = b"\n".join(
            json.dumps(row, separators=(",", ":"), sort_keys=True).encode() for row in rows
        ) + b"\n"

        with self.assertRaisesRegex(VerificationError, "raw outcome"):
            verify_stream(io.BytesIO(raw), self.protocol, PACKAGE_ROOT)

    def test_rehashed_scenario_membership_mismatch_is_rejected(self) -> None:
        rows = [json.loads(line) for line in self.raw.splitlines()]
        scenario = rows[1]
        scenario["arm_memberships"] = ["ARM-A-OUTCOME"]
        scenario["record_hash"] = content_hash(scenario, omit=frozenset({"record_hash"}))
        raw = b"\n".join(
            json.dumps(row, separators=(",", ":"), sort_keys=True).encode() for row in rows
        ) + b"\n"

        with self.assertRaisesRegex(VerificationError, "memberships"):
            verify_stream(io.BytesIO(raw), self.protocol, PACKAGE_ROOT)


if __name__ == "__main__":
    unittest.main()
