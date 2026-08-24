from __future__ import annotations

import json
from pathlib import Path
import sys
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
REPOSITORY_ROOT = PACKAGE_ROOT.parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))
if str(PACKAGE_ROOT) not in sys.path:
    sys.path.insert(0, str(PACKAGE_ROOT))


from vt_simulator.canonical import canonical_bytes, content_hash  # noqa: E402
from vt_simulator.grid import (  # noqa: E402
    GridValidationError,
    build_scenario_preimage,
    deduplicate_scenarios,
    expand_prededup_rows,
)
from vt_simulator.manifest import ApprovedRoots, load_validated_protocol  # noqa: E402
from verify_snapshot import verify_grid_independently  # noqa: E402


def protocol():
    return load_validated_protocol(
        ApprovedRoots(
            protocol_root=PACKAGE_ROOT / "protocol",
            paper_source_root=REPOSITORY_ROOT,
        )
    )


class GridCountTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.protocol = protocol()
        cls.rows = tuple(expand_prededup_rows(cls.protocol))
        cls.result = deduplicate_scenarios(cls.rows)
        cls.expected = json.loads(
            (PACKAGE_ROOT / "tests" / "fixtures" / "grid-counts.json").read_text(
                encoding="utf-8"
            )
        )

    def test_primary_grid_reproduces_all_frozen_counts(self) -> None:
        self.assertEqual(self.result.prededup_count, self.expected["prededup_rows"])
        self.assertEqual(self.result.unique_count, self.expected["unique_scenarios"])
        self.assertEqual(
            self.result.duplicate_membership_count,
            self.expected["duplicate_memberships"],
        )
        self.assertEqual(
            self.result.multi_arm_bundle_count,
            self.expected["multi_arm_bundles"],
        )
        self.assertEqual(self.result.short_id_collisions, ())

    def test_arm_rows_match_each_declared_prededup_count(self) -> None:
        observed: dict[str, int] = {}
        for row in self.rows:
            observed[row.arm_id] = observed.get(row.arm_id, 0) + 1
        expected = {item["arm_id"]: item["prededup_count"] for item in self.protocol.arms}
        self.assertEqual(observed, expected)

    def test_normative_baseline_identity_is_present(self) -> None:
        digest = self.protocol.baseline_scenario_parameter_hash
        scenario = self.result.scenarios_by_hash[digest]
        self.assertEqual(scenario.scenario_id, "SIM-99174ca8571c01f2deca")
        self.assertEqual(content_hash(scenario.preimage), digest)
        self.assertGreaterEqual(len(scenario.arm_memberships), 1)

    def test_primary_and_independent_oracle_match_exact_sets_and_memberships(self) -> None:
        independent = verify_grid_independently(PACKAGE_ROOT / "protocol")
        self.assertEqual(independent.prededup_count, self.result.prededup_count)
        self.assertEqual(independent.unique_count, self.result.unique_count)
        self.assertEqual(independent.duplicate_membership_count, self.result.duplicate_membership_count)
        self.assertEqual(independent.multi_arm_bundle_count, self.result.multi_arm_bundle_count)
        self.assertEqual(independent.scenario_hashes, tuple(sorted(self.result.scenarios_by_hash)))
        self.assertEqual(
            independent.memberships_by_hash,
            tuple(
                (digest, self.result.scenarios_by_hash[digest].arm_memberships)
                for digest in sorted(self.result.scenarios_by_hash)
            ),
        )

    def test_repeated_expansion_is_byte_identical(self) -> None:
        first = self.result.summary_record()
        second = deduplicate_scenarios(tuple(expand_prededup_rows(self.protocol))).summary_record()
        self.assertEqual(canonical_bytes(first), canonical_bytes(second))


class GridIdentityNegativeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.protocol = protocol()

    def test_arm_membership_cannot_enter_scenario_preimage(self) -> None:
        with self.assertRaises(GridValidationError):
            build_scenario_preimage(
                self.protocol,
                {"arm_memberships": ["ARM-A-OUTCOME"]},
            )

    def test_unknown_factor_override_is_rejected(self) -> None:
        with self.assertRaises(GridValidationError):
            build_scenario_preimage(self.protocol, {"analyst_default": True})

    def test_target_id_and_population_kind_must_match(self) -> None:
        with self.assertRaises(GridValidationError):
            build_scenario_preimage(
                self.protocol,
                {
                    "target_id": "T-NEW-RATER",
                    "target_population_kind": "fixed_messages_fixed_panel",
                },
            )

    def test_preimage_has_exact_eight_keys_and_all_26_factors(self) -> None:
        preimage = build_scenario_preimage(self.protocol, {})
        self.assertEqual(
            set(preimage),
            {
                "analysis_profile_id",
                "factor_selections",
                "generating_profile_id",
                "math_profile_id",
                "scenario_grid_id",
                "schedule_profile_id",
                "target_id",
                "target_population_kind",
            },
        )
        self.assertEqual(tuple(preimage["factor_selections"]), self.protocol.factor_order)


if __name__ == "__main__":
    unittest.main()
