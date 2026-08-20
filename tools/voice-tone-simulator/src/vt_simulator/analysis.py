"""Guard-first analysis primitives for the bounded simulator candidate."""

from __future__ import annotations

from collections import Counter
from dataclasses import dataclass

from .schedule import GraphScheduleResult


class GraphValidationError(ValueError):
    """A comparison graph is malformed or contradicts its schedule."""


@dataclass(frozen=True)
class GraphDiagnostics:
    vertex_count: int
    scheduled_edge_count: int
    observed_win_count: int
    recurring_identity: bool
    undirected_component_count: int
    directed_scc_count: int
    observed_directed_strongly_connected: bool
    undefeated_vertices: tuple[str, ...]
    winless_vertices: tuple[str, ...]
    ordinary_bt_admissible: bool


@dataclass(frozen=True)
class GraphOutcomeRow:
    assignment_id: str
    disposition: str
    derived_canonical_outcome: str | None


def _validated_vertices(vertices: tuple[str, ...]) -> tuple[str, ...]:
    if not vertices or any(not isinstance(value, str) or not value for value in vertices):
        raise GraphValidationError("vertices must be non-empty synthetic IDs")
    if tuple(sorted(set(vertices))) != vertices:
        raise GraphValidationError("vertices must be sorted and unique")
    return vertices


def _validated_edges(
    edges: tuple[tuple[str, str], ...],
    vertex_set: set[str],
    label: str,
) -> tuple[tuple[str, str], ...]:
    result: list[tuple[str, str]] = []
    for edge in edges:
        if not isinstance(edge, tuple) or len(edge) != 2:
            raise GraphValidationError(f"{label} contains a malformed edge")
        source, target = edge
        if source not in vertex_set or target not in vertex_set:
            raise GraphValidationError(f"{label} references an unknown vertex")
        if source == target:
            raise GraphValidationError(f"{label} contains a self-edge")
        result.append((source, target))
    return tuple(result)


def _undirected_components(
    vertices: tuple[str, ...], edges: tuple[tuple[str, str], ...]
) -> int:
    adjacency = {value: set() for value in vertices}
    for left, right in edges:
        adjacency[left].add(right)
        adjacency[right].add(left)
    remaining = set(vertices)
    components = 0
    while remaining:
        components += 1
        stack = [min(remaining)]
        while stack:
            current = stack.pop()
            if current not in remaining:
                continue
            remaining.remove(current)
            stack.extend(sorted(adjacency[current] & remaining, reverse=True))
    return components


def _finish_order(vertices: tuple[str, ...], adjacency: dict[str, set[str]]) -> list[str]:
    visited: set[str] = set()
    order: list[str] = []

    def visit(start: str) -> None:
        stack: list[tuple[str, bool]] = [(start, False)]
        while stack:
            node, expanded = stack.pop()
            if expanded:
                order.append(node)
                continue
            if node in visited:
                continue
            visited.add(node)
            stack.append((node, True))
            for neighbor in sorted(adjacency[node], reverse=True):
                if neighbor not in visited:
                    stack.append((neighbor, False))

    for vertex in vertices:
        if vertex not in visited:
            visit(vertex)
    return order


def _directed_scc_count(
    vertices: tuple[str, ...], edges: tuple[tuple[str, str], ...]
) -> int:
    forward = {value: set() for value in vertices}
    reverse = {value: set() for value in vertices}
    for source, target in edges:
        forward[source].add(target)
        reverse[target].add(source)
    order = _finish_order(vertices, forward)
    visited: set[str] = set()
    count = 0
    for start in reversed(order):
        if start in visited:
            continue
        count += 1
        stack = [start]
        while stack:
            node = stack.pop()
            if node in visited:
                continue
            visited.add(node)
            stack.extend(sorted(reverse[node] - visited, reverse=True))
    return count


def graph_diagnostics(
    vertices: tuple[str, ...],
    scheduled_edges: tuple[tuple[str, str], ...],
    observed_wins: tuple[tuple[str, str], ...],
) -> GraphDiagnostics:
    """Classify observed graph support before any Bradley–Terry fit is attempted."""

    vertex_ids = _validated_vertices(vertices)
    vertex_set = set(vertex_ids)
    scheduled = _validated_edges(scheduled_edges, vertex_set, "scheduled edges")
    wins = _validated_edges(observed_wins, vertex_set, "observed wins")
    scheduled_pairs = {frozenset(edge) for edge in scheduled}
    if any(frozenset(edge) not in scheduled_pairs for edge in wins):
        raise GraphValidationError("observed win does not resolve to a scheduled pair")

    scheduled_incidence: Counter[str] = Counter()
    for left, right in scheduled:
        scheduled_incidence[left] += 1
        scheduled_incidence[right] += 1
    recurring = any(scheduled_incidence[vertex] > 1 for vertex in vertex_ids)

    indegree: Counter[str] = Counter()
    outdegree: Counter[str] = Counter()
    for winner, loser in wins:
        outdegree[winner] += 1
        indegree[loser] += 1
    undefeated = tuple(value for value in vertex_ids if indegree[value] == 0)
    winless = tuple(value for value in vertex_ids if outdegree[value] == 0)
    undirected_components = _undirected_components(vertex_ids, wins)
    scc_count = _directed_scc_count(vertex_ids, wins)
    strongly_connected = len(vertex_ids) > 1 and scc_count == 1
    admissible = recurring and strongly_connected and bool(wins)
    return GraphDiagnostics(
        vertex_count=len(vertex_ids),
        scheduled_edge_count=len(scheduled),
        observed_win_count=len(wins),
        recurring_identity=recurring,
        undirected_component_count=undirected_components,
        directed_scc_count=scc_count,
        observed_directed_strongly_connected=strongly_connected,
        undefeated_vertices=undefeated,
        winless_vertices=winless,
        ordinary_bt_admissible=admissible,
    )


def diagnose_graph_schedule(
    schedule: GraphScheduleResult,
    outcome_rows: tuple[GraphOutcomeRow, ...],
) -> GraphDiagnostics:
    """Bind mapped terminal outcomes to exact graph assignments before diagnosis."""

    assignments = {row.assignment_id: row for row in schedule.assignments}
    if len(assignments) != len(schedule.assignments):
        raise GraphValidationError("graph schedule contains duplicate assignment IDs")
    indexed: dict[str, GraphOutcomeRow] = {}
    allowed_dispositions = {
        "submitted",
        "invalidated",
        "abstained",
        "nonstarted",
        "nonlocked",
    }
    allowed_outcomes = {
        "A",
        "B",
        "indistinguishable",
        "both_unacceptable",
        "insufficient_context",
    }
    wins: list[tuple[str, str]] = []
    forced_fixture = schedule.graph_profile in {
        "G1-CHAIN-SEPARATED",
        "G2-DIRECTED-CYCLE",
        "G3-TWO-CYCLES",
        "G4-UNDEFEATED-STAR",
        "G5-BRIDGE-VULNERABLE",
    }
    for row in outcome_rows:
        if row.assignment_id not in assignments:
            raise GraphValidationError("graph outcome references an unknown assignment")
        if row.assignment_id in indexed:
            raise GraphValidationError("graph outcomes contain a duplicate assignment")
        indexed[row.assignment_id] = row
        if row.disposition not in allowed_dispositions:
            raise GraphValidationError("graph outcome has an unknown disposition")
        if row.disposition in {"abstained", "nonstarted", "nonlocked"}:
            if row.derived_canonical_outcome is not None:
                raise GraphValidationError("unobserved graph state cannot retain an outcome")
            continue
        if row.derived_canonical_outcome not in allowed_outcomes:
            raise GraphValidationError("locked graph state requires a canonical outcome")
        if row.disposition == "invalidated":
            continue
        assignment = assignments[row.assignment_id]
        if row.derived_canonical_outcome == "A":
            wins.append((assignment.candidate_a_id, assignment.candidate_b_id))
        elif row.derived_canonical_outcome == "B":
            if forced_fixture:
                raise GraphValidationError(
                    "forced-direction graph fixture produced a canonical B win"
                )
            wins.append((assignment.candidate_b_id, assignment.candidate_a_id))
    return graph_diagnostics(
        schedule.vertices,
        schedule.scheduled_edges,
        tuple(wins),
    )
