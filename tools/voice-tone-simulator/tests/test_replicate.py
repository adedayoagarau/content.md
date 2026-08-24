from __future__ import annotations

from collections import Counter
from dataclasses import replace
import json
from pathlib import Path
import sys
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
REPOSITORY_ROOT = PACKAGE_ROOT.parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.canonical import content_hash  # noqa: E402
from vt_simulator.grid import ScenarioBundle, build_scenario_preimage  # noqa: E402
from vt_simulator.manifest import ApprovedRoots, load_validated_protocol  # noqa: E402
from vt_simulator.replicate import (  # noqa: E402
    ReplicateValidationError,
    generate_bounded_replicate,
)


def protocol():
    return load_validated_protocol(
        ApprovedRoots(
            protocol_root=PACKAGE_ROOT / "protocol",
            paper_source_root=REPOSITORY_ROOT,
        )
    )


def scenario(protocol_value, **overrides: object) -> ScenarioBundle:
    preimage = build_scenario_preimage(protocol_value, overrides)
    digest = content_hash(preimage)
    return ScenarioBundle(
        scenario_parameter_hash=digest,
        scenario_id=f"SIM-{digest[:20]}",
        preimage=preimage,
        arm_memberships=("TEST-REPLICATE",),
    )


class BoundedReplicateTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.protocol = protocol()
        cls.scenario = scenario(cls.protocol)
        cls.result = generate_bounded_replicate(
            cls.protocol, cls.scenario, replicate_index=1
        )

    def test_exact_assignment_partition_and_response_boundaries(self) -> None:
        rows = self.result.assignment_results
        self.assertEqual(len(rows), 120)
        self.assertEqual(len({row.assignment_id for row in rows}), 120)
        self.assertEqual(
            {row.disposition for row in rows}, {"submitted", "abstained"}
        )
        self.assertFalse(any(row.disposition == "invalidated" for row in rows))

        for row in rows:
            with self.subTest(assignment_id=row.assignment_id):
                if row.disposition in {"submitted", "invalidated"}:
                    self.assertIsNotNone(row.raw_display_outcome)
                    self.assertIsNotNone(row.derived_canonical_outcome)
                    if row.raw_display_outcome == "insufficient_context":
                        self.assertIsNone(row.display_left_band)
                        self.assertIsNone(row.display_right_band)
                        self.assertIsNone(row.candidate_a_band)
                        self.assertIsNone(row.candidate_b_band)
                    else:
                        for band in (
                            row.display_left_band,
                            row.display_right_band,
                            row.candidate_a_band,
                            row.candidate_b_band,
                        ):
                            self.assertIn(band, range(5))
                    if row.raw_display_outcome in {"LEFT", "RIGHT"}:
                        self.assertIn(row.derived_canonical_outcome, {"A", "B"})
                else:
                    self.assertIsNone(row.raw_display_outcome)
                    self.assertIsNone(row.derived_canonical_outcome)
                    self.assertIsNone(row.display_left_band)
                    self.assertIsNone(row.display_right_band)
                    self.assertIsNone(row.candidate_a_band)
                    self.assertIsNone(row.candidate_b_band)

    def test_full_stream_allotments_are_consumed_even_for_terminal_nonresponses(self) -> None:
        observed = [
            (receipt.stream_name, receipt.target_id, receipt.observed_draw_count)
            for receipt in self.result.stream_receipts
        ]
        self.assertEqual(
            observed,
            [
                ("finite-effects", "POPULATION-SHARED", 1032),
                ("finite-effects", "POPULATION-SHARED", 1032),
                ("nonstart", "T-FIXED-FIXED", 120),
                ("nonlock", "T-FIXED-FIXED", 120),
                ("procedural-abstention", "T-FIXED-FIXED", 120),
                ("procedural-reason", "T-FIXED-FIXED", 120),
                ("invalidation", "T-FIXED-FIXED", 240),
                ("submitted-outcome", "T-FIXED-FIXED", 120),
                ("ordinal-band", "T-FIXED-FIXED", 240),
                ("evidence-span", "T-FIXED-FIXED", 960),
            ],
        )
        self.assertTrue(
            all(
                receipt.status == "complete"
                and receipt.expected_draw_count == receipt.observed_draw_count
                for receipt in self.result.stream_receipts
            )
        )

    def test_repeat_is_identical_and_record_hash_is_self_consistent(self) -> None:
        repeated = generate_bounded_replicate(
            self.protocol, self.scenario, replicate_index=1
        )
        self.assertEqual(self.result, repeated)
        self.assertEqual(
            self.result.record_hash,
            content_hash(self.result.hash_preimage()),
        )

    def test_process_and_evidence_ledgers_cover_the_schedule(self) -> None:
        self.assertEqual(
            [row.stage for row in self.result.process_hazards],
            ["nonstart", "nonlock", "procedural_abstention", "invalidation"],
        )
        self.assertEqual(
            {row.assignment_id for row in self.result.evidence_indicators},
            {row.assignment_id for row in self.result.assignment_results},
        )
        self.assertEqual(self.result.allocation_status, "deterministic_schedule_no_draw")

    def test_baseline_replicate_matches_the_frozen_independent_vector(self) -> None:
        vector = json.loads(
            (PACKAGE_ROOT / "tests" / "fixtures" / "baseline-replicate-vector.json")
            .read_text(encoding="utf-8")
        )
        self.assertEqual(
            vector["vector_id"], "VT-MSP-BASELINE-REPLICATE-1/design-0.1"
        )
        self.assertEqual(
            self.result.scenario_parameter_hash, vector["scenario_parameter_hash"]
        )
        self.assertEqual(self.result.replicate_index, vector["replicate_index"])
        self.assertEqual(self.result.schedule_hash, vector["schedule_hash"])
        self.assertEqual(self.result.record_hash, vector["replicate_record_hash"])
        self.assertEqual(len(self.result.assignment_results), vector["assignment_count"])
        self.assertEqual(
            Counter(row.disposition for row in self.result.assignment_results),
            vector["disposition_counts"],
        )
        self.assertEqual(
            Counter(
                row.derived_canonical_outcome
                for row in self.result.assignment_results
                if row.derived_canonical_outcome is not None
            ),
            vector["derived_outcome_counts"],
        )
        self.assertEqual(
            sum(row.candidate_a_band is None for row in self.result.assignment_results),
            vector["null_band_row_count"],
        )
        self.assertEqual(
            sum(row.applicable for row in self.result.evidence_indicators),
            vector["evidence_applicable_count"],
        )
        self.assertEqual(
            [
                [
                    row.stage,
                    row.risk_set_count,
                    row.event_count,
                    row.solver_status,
                    row.iterations,
                ]
                for row in self.result.process_hazards
            ],
            vector["hazards"],
        )
        self.assertEqual(
            [
                [
                    row.stream_name,
                    row.stream_fingerprint,
                    row.observed_draw_count,
                ]
                for row in self.result.stream_receipts
            ],
            vector["stream_receipts"],
        )

    def test_slice_rejects_nonbaseline_or_out_of_range_inputs(self) -> None:
        for invalid in (0, 1001, True):
            with self.subTest(replicate_index=invalid):
                with self.assertRaises(ReplicateValidationError):
                    generate_bounded_replicate(
                        self.protocol, self.scenario, replicate_index=invalid
                    )

        with self.assertRaises(ReplicateValidationError):
            generate_bounded_replicate(
                self.protocol,
                scenario(self.protocol, prevalence_profile="P2-TIE-RICH"),
                replicate_index=1,
            )

        tampered = replace(
            self.scenario,
            scenario_parameter_hash="0" * 64,
        )
        with self.assertRaises(ReplicateValidationError):
            generate_bounded_replicate(
                self.protocol, tampered, replicate_index=1
            )


if __name__ == "__main__":
    unittest.main()
