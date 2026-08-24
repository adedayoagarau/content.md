from __future__ import annotations

from pathlib import Path
import sys
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.analysis import (  # noqa: E402
    GraphOutcomeRow,
    GraphValidationError,
    diagnose_graph_schedule,
    graph_diagnostics,
)
from vt_simulator.canonical import content_hash  # noqa: E402
from vt_simulator.grid import ScenarioBundle, build_scenario_preimage  # noqa: E402
from vt_simulator.manifest import ApprovedRoots, load_validated_protocol  # noqa: E402
from vt_simulator.schedule import build_graph_schedule  # noqa: E402


VERTICES = tuple(f"STREAT-{index:04d}" for index in range(1, 9))


def edge(left: int, right: int) -> tuple[str, str]:
    return f"STREAT-{left:04d}", f"STREAT-{right:04d}"


def protocol():
    return load_validated_protocol(
        ApprovedRoots(
            protocol_root=PACKAGE_ROOT / "protocol",
            paper_source_root=PACKAGE_ROOT.parents[1],
        )
    )


def graph_schedule(profile: str):
    protocol_value = protocol()
    preimage = build_scenario_preimage(
        protocol_value,
        {
            "graph_profile": profile,
            "card_count": {"id": "CARD1", "value": 1},
        },
    )
    digest = content_hash(preimage)
    return build_graph_schedule(
        ScenarioBundle(digest, f"SIM-{digest[:20]}", preimage, ("TEST-GRAPH",))
    )


class GraphGuardTests(unittest.TestCase):
    def test_directed_cycle_is_the_positive_control(self) -> None:
        wins = tuple(edge(index, index + 1) for index in range(1, 8)) + (edge(8, 1),)
        result = graph_diagnostics(VERTICES, wins, wins)
        self.assertEqual(result.undirected_component_count, 1)
        self.assertEqual(result.directed_scc_count, 1)
        self.assertTrue(result.observed_directed_strongly_connected)
        self.assertTrue(result.recurring_identity)
        self.assertEqual(result.undefeated_vertices, ())
        self.assertEqual(result.winless_vertices, ())
        self.assertTrue(result.ordinary_bt_admissible)

    def test_chain_is_weakly_connected_but_not_bt_admissible(self) -> None:
        wins = tuple(edge(index, index + 1) for index in range(1, 8))
        result = graph_diagnostics(VERTICES, wins, wins)
        self.assertEqual(result.undirected_component_count, 1)
        self.assertEqual(result.directed_scc_count, 8)
        self.assertFalse(result.observed_directed_strongly_connected)
        self.assertEqual(result.undefeated_vertices, ("STREAT-0001",))
        self.assertEqual(result.winless_vertices, ("STREAT-0008",))
        self.assertFalse(result.ordinary_bt_admissible)

    def test_two_cycles_have_two_components_and_no_global_output(self) -> None:
        wins = (
            edge(1, 2), edge(2, 3), edge(3, 4), edge(4, 1),
            edge(5, 6), edge(6, 7), edge(7, 8), edge(8, 5),
        )
        result = graph_diagnostics(VERTICES, wins, wins)
        self.assertEqual(result.undirected_component_count, 2)
        self.assertEqual(result.directed_scc_count, 2)
        self.assertFalse(result.ordinary_bt_admissible)

    def test_bridge_vulnerability_uses_observed_arcs_not_schedule(self) -> None:
        cycles = (
            edge(1, 2), edge(2, 3), edge(3, 4), edge(4, 1),
            edge(5, 6), edge(6, 7), edge(7, 8), edge(8, 5),
        )
        scheduled = cycles + (edge(4, 5), edge(5, 4))
        complete = graph_diagnostics(VERTICES, scheduled, scheduled)
        self.assertTrue(complete.ordinary_bt_admissible)
        one_way = graph_diagnostics(VERTICES, scheduled, cycles + (edge(4, 5),))
        self.assertEqual(one_way.undirected_component_count, 1)
        self.assertFalse(one_way.observed_directed_strongly_connected)
        self.assertFalse(one_way.ordinary_bt_admissible)

    def test_current_disjoint_dyads_have_no_recurring_identity(self) -> None:
        vertices = tuple(f"SCAND-{index:04d}" for index in range(1, 45))
        dyads = tuple((vertices[index], vertices[index + 1]) for index in range(0, 44, 2))
        result = graph_diagnostics(vertices, dyads, dyads)
        self.assertFalse(result.recurring_identity)
        self.assertEqual(result.undirected_component_count, 22)
        self.assertFalse(result.ordinary_bt_admissible)

    def test_unknown_vertices_and_self_edges_are_rejected(self) -> None:
        with self.assertRaises(GraphValidationError):
            graph_diagnostics(VERTICES, (edge(1, 9),), ())
        with self.assertRaises(GraphValidationError):
            graph_diagnostics(VERTICES, (edge(1, 1),), ())


class GraphScheduleOutcomeBindingTests(unittest.TestCase):
    def one_decisive_a_per_scheduled_edge(self, schedule):
        rows = []
        seen = set()
        for assignment in schedule.assignments:
            pair = (assignment.candidate_a_id, assignment.candidate_b_id)
            if pair in seen:
                continue
            seen.add(pair)
            rows.append(GraphOutcomeRow(assignment.assignment_id, "submitted", "A"))
        return tuple(rows)

    def test_directed_cycle_uses_observed_submitted_wins(self) -> None:
        schedule = graph_schedule("G2-DIRECTED-CYCLE")
        rows = self.one_decisive_a_per_scheduled_edge(schedule)
        result = diagnose_graph_schedule(schedule, rows)
        self.assertEqual(result.observed_win_count, 8)
        self.assertTrue(result.observed_directed_strongly_connected)
        self.assertTrue(result.ordinary_bt_admissible)

        missing_arc = diagnose_graph_schedule(schedule, rows[:-1])
        self.assertEqual(missing_arc.observed_win_count, 7)
        self.assertFalse(missing_arc.observed_directed_strongly_connected)
        self.assertFalse(missing_arc.ordinary_bt_admissible)

    def test_chain_fixture_stays_ineligible_despite_complete_scheduled_coverage(self) -> None:
        schedule = graph_schedule("G1-CHAIN-SEPARATED")
        result = diagnose_graph_schedule(
            schedule, self.one_decisive_a_per_scheduled_edge(schedule)
        )
        self.assertEqual(result.observed_win_count, 7)
        self.assertEqual(result.directed_scc_count, 8)
        self.assertFalse(result.ordinary_bt_admissible)

    def test_forced_fixture_rejects_a_canonical_b_win(self) -> None:
        schedule = graph_schedule("G2-DIRECTED-CYCLE")
        first = schedule.assignments[0]
        with self.assertRaises(GraphValidationError):
            diagnose_graph_schedule(
                schedule,
                (GraphOutcomeRow(first.assignment_id, "submitted", "B"),),
            )

    def test_unknown_assignment_and_invalid_state_union_fail_closed(self) -> None:
        schedule = graph_schedule("G2-DIRECTED-CYCLE")
        with self.assertRaises(GraphValidationError):
            diagnose_graph_schedule(
                schedule,
                (GraphOutcomeRow("SASSIGN-UNKNOWN", "submitted", "A"),),
            )
        first = schedule.assignments[0]
        with self.assertRaises(GraphValidationError):
            diagnose_graph_schedule(
                schedule,
                (GraphOutcomeRow(first.assignment_id, "abstained", "A"),),
            )


if __name__ == "__main__":
    unittest.main()
