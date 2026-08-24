from __future__ import annotations

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
from vt_simulator.schedule import (  # noqa: E402
    ScheduleValidationError,
    build_graph_schedule,
    build_schedule,
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
        arm_memberships=("TEST-SCHEDULE",),
    )


class BaselineScheduleTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.protocol = protocol()
        cls.baseline = scenario(cls.protocol)
        cls.schedule = build_schedule(cls.baseline)

    def test_baseline_has_exact_120_assignments_and_identity_cross_product(self) -> None:
        assignments = self.schedule.assignments
        self.assertEqual(len(assignments), 10 * 4 * 3)
        self.assertEqual(len({item.assignment_id for item in assignments}), 120)
        self.assertEqual(
            assignments[0].assignment_id,
            "SASSIGN-0001-0001-0001",
        )
        self.assertEqual(
            assignments[-1].assignment_id,
            "SASSIGN-0004-0010-0003",
        )
        self.assertEqual(
            {(item.family_id, item.card_id, item.rater_id) for item in assignments},
            {
                (f"SMSG-{family:04d}", f"SCARD-{card:04d}", f"SRATER-{rater:04d}")
                for card in range(1, 5)
                for family in range(1, 11)
                for rater in range(1, 4)
            },
        )

    def test_split_side_and_candidate_roles_are_exact(self) -> None:
        assignments = self.schedule.assignments
        self.assertEqual(sum(item.split == "calibration" for item in assignments), 72)
        self.assertEqual(sum(item.split == "public_test" for item in assignments), 48)
        self.assertEqual(sum(item.displayed_left_candidate_id.endswith("-A") for item in assignments), 60)
        self.assertEqual(sum(item.displayed_right_candidate_id.endswith("-A") for item in assignments), 60)
        for item in assignments:
            self.assertEqual(
                {item.displayed_left_candidate_id, item.displayed_right_candidate_id},
                {item.candidate_a_id, item.candidate_b_id},
            )
            self.assertEqual(item.side_code_a, 0.5 if item.a_displayed_left else -0.5)

    def test_every_rater_session_has_positions_one_through_40(self) -> None:
        for rater in range(1, 4):
            rater_id = f"SRATER-{rater:04d}"
            items = [item for item in self.schedule.assignments if item.rater_id == rater_id]
            self.assertEqual(sorted(item.session_position_index for item in items), list(range(1, 41)))
            self.assertEqual({item.session_count for item in items}, {40})
            self.assertEqual(min(item.session_position_code for item in items), -1.0)
            self.assertEqual(max(item.session_position_code for item in items), 1.0)

    def test_card_position_and_order_code_follow_frozen_formula(self) -> None:
        expected_codes = {1: -1.0, 2: -1 / 3, 3: 1 / 3, 4: 1.0}
        for item in self.schedule.assignments:
            self.assertAlmostEqual(item.order_code, expected_codes[item.card_position_index])
            self.assertEqual(item.card_count, 4)

    def test_repeated_schedule_is_identical(self) -> None:
        self.assertEqual(build_schedule(self.baseline), build_schedule(self.baseline))


class ScheduleDesignTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.protocol = protocol()

    def test_outcome_only_changes_do_not_change_assignment_schedule(self) -> None:
        baseline = build_schedule(scenario(self.protocol))
        tie_rich = build_schedule(
            scenario(self.protocol, prevalence_profile="P2-TIE-RICH")
        )
        self.assertEqual(baseline.assignment_manifest_hash, tie_rich.assignment_manifest_hash)
        self.assertEqual(baseline.assignments, tie_rich.assignments)

    def test_near_side_design_rotates_the_extra_assignment(self) -> None:
        result = build_schedule(scenario(self.protocol, side_design="S-NEAR"))
        for family in range(1, 11):
            for card in range(1, 5):
                items = [
                    item
                    for item in result.assignments
                    if item.family_id == f"SMSG-{family:04d}"
                    and item.card_id == f"SCARD-{card:04d}"
                ]
                left = sum(item.a_displayed_left for item in items)
                self.assertLessEqual(abs(left - (len(items) - left)), 1)
        self.assertGreater(
            len(
                {
                    item.rater_id
                    for item in result.assignments
                    if item.a_displayed_left
                }
            ),
            1,
        )

    def test_aliased_side_is_explicitly_all_a_left(self) -> None:
        result = build_schedule(scenario(self.protocol, side_design="S-ALIASED"))
        self.assertTrue(all(item.a_displayed_left for item in result.assignments))
        self.assertTrue(result.side_assignment_aliased)

    def test_random_and_late_bias_designs_fail_until_owned_inputs_exist(self) -> None:
        for order_design in ("O-RANDOM", "O-LATE-BIAS"):
            with self.subTest(order_design=order_design):
                with self.assertRaises(ScheduleValidationError):
                    build_schedule(scenario(self.protocol, order_design=order_design))
        with self.assertRaises(ScheduleValidationError):
            build_schedule(scenario(self.protocol, side_design="S-8020"))

    def test_graph_and_counterfactual_schedules_do_not_fall_through(self) -> None:
        with self.assertRaises(ScheduleValidationError):
            build_schedule(scenario(self.protocol, graph_profile="G2-DIRECTED-CYCLE"))
        with self.assertRaises(ScheduleValidationError):
            build_schedule(
                scenario(self.protocol, counterfactual_profile="CF1-THRESHOLD-SHIFT")
            )


class GraphScheduleTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.protocol = protocol()

    def graph_scenario(self, graph_profile: str, **overrides: object) -> ScenarioBundle:
        values: dict[str, object] = {
            "graph_profile": graph_profile,
            "card_count": {"id": "CARD1", "value": 1},
        }
        values.update(overrides)
        return scenario(self.protocol, **values)

    def test_all_recurring_graph_profiles_have_exact_topology_and_counts(self) -> None:
        expected = {
            "G1-CHAIN-SEPARATED": (7, 210),
            "G2-DIRECTED-CYCLE": (8, 240),
            "G3-TWO-CYCLES": (8, 240),
            "G4-UNDEFEATED-STAR": (7, 210),
            "G5-BRIDGE-VULNERABLE": (10, 300),
            "G6-ROUND-ROBIN": (28, 840),
        }
        for profile, (edge_count, assignment_count) in expected.items():
            with self.subTest(profile=profile):
                result = build_graph_schedule(self.graph_scenario(profile))
                self.assertEqual(result.graph_profile, profile)
                self.assertEqual(len(result.vertices), 8)
                self.assertEqual(len(result.scheduled_edges), edge_count)
                self.assertEqual(len(result.assignments), assignment_count)
                self.assertTrue(result.recurring_identity_declared)
                self.assertEqual(
                    len({row.assignment_id for row in result.assignments}),
                    assignment_count,
                )

    def test_directed_cycle_uses_the_exact_listed_arcs_and_public_split(self) -> None:
        result = build_graph_schedule(self.graph_scenario("G2-DIRECTED-CYCLE"))
        self.assertEqual(
            result.scheduled_edges,
            tuple(
                (f"STREAT-{index:04d}", f"STREAT-{index + 1:04d}")
                for index in range(1, 8)
            )
            + (("STREAT-0008", "STREAT-0001"),),
        )
        self.assertEqual(
            sum(row.split == "calibration" for row in result.assignments),
            8 * 6 * 3,
        )
        self.assertEqual(
            sum(row.split == "public_test" for row in result.assignments),
            8 * 4 * 3,
        )
        first = result.assignments[0]
        self.assertEqual(
            (
                first.assignment_id,
                first.family_id,
                first.pair_id,
                first.candidate_a_id,
                first.candidate_b_id,
                first.card_id,
            ),
            (
                "SASSIGN-0001-0001-0001",
                "SMSG-0001",
                "SPAIR-0001-0001",
                "STREAT-0001",
                "STREAT-0002",
                "SCARD-0001",
            ),
        )

    def test_every_graph_rater_session_has_one_exact_position_per_unit(self) -> None:
        result = build_graph_schedule(self.graph_scenario("G5-BRIDGE-VULNERABLE"))
        for rater in range(1, 4):
            rater_id = f"SRATER-{rater:04d}"
            rows = [row for row in result.assignments if row.rater_id == rater_id]
            self.assertEqual(len(rows), 100)
            self.assertEqual(
                sorted(row.session_position_index for row in rows), list(range(1, 101))
            )
            self.assertEqual({row.session_count for row in rows}, {100})
            self.assertEqual({row.order_code for row in rows}, {None})
            self.assertEqual({row.card_count for row in rows}, {1})

    def test_current_dyads_have_44_unique_candidates_and_no_recurrence(self) -> None:
        result = build_graph_schedule(
            self.graph_scenario(
                "G0-CURRENT-DYADS",
                coverage={"calibration": 14, "id": "C22", "public_test": 8, "total": 22},
            )
        )
        self.assertEqual(len(result.vertices), 44)
        self.assertEqual(len(result.scheduled_edges), 22)
        self.assertEqual(len(result.assignments), 66)
        self.assertFalse(result.recurring_identity_declared)
        self.assertEqual(result.scheduled_edges[0], ("SCAND-0001", "SCAND-0002"))
        self.assertEqual(result.scheduled_edges[-1], ("SCAND-0043", "SCAND-0044"))

    def test_side_assignment_is_pair_local_and_schedule_is_outcome_independent(self) -> None:
        baseline = build_graph_schedule(self.graph_scenario("G1-CHAIN-SEPARATED"))
        changed = build_graph_schedule(
            self.graph_scenario(
                "G1-CHAIN-SEPARATED", prevalence_profile="P2-TIE-RICH"
            )
        )
        self.assertEqual(baseline.assignment_manifest_hash, changed.assignment_manifest_hash)
        self.assertEqual(baseline.assignments, changed.assignments)
        for pair_id in {row.pair_id for row in baseline.assignments}:
            rows = [row for row in baseline.assignments if row.pair_id == pair_id]
            left = sum(row.a_displayed_left for row in rows)
            self.assertLessEqual(abs(left - (len(rows) - left)), 1)

    def test_non_graph_and_non_card1_inputs_fail_closed(self) -> None:
        with self.assertRaises(ScheduleValidationError):
            build_graph_schedule(scenario(self.protocol))
        with self.assertRaises(ScheduleValidationError):
            build_graph_schedule(
                scenario(self.protocol, graph_profile="G2-DIRECTED-CYCLE")
            )


if __name__ == "__main__":
    unittest.main()
