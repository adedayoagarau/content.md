"""Deterministic ordinary-assignment scheduling for the bounded SIM-I0 slice."""

from __future__ import annotations

from dataclasses import asdict, dataclass
from math import ceil

from .canonical import content_hash
from .grid import ScenarioBundle


class ScheduleValidationError(ValueError):
    """A scenario cannot be represented by the implemented schedule slice."""


@dataclass(frozen=True)
class ScheduledAssignment:
    assignment_id: str
    family_id: str
    pair_id: str
    card_id: str
    rater_id: str
    candidate_a_id: str
    candidate_b_id: str
    split: str
    a_displayed_left: bool
    displayed_left_candidate_id: str
    displayed_right_candidate_id: str
    side_code_a: float
    card_position_index: int
    card_count: int
    order_code: float | None
    session_position_index: int
    session_count: int
    session_position_code: float
    presentation_assignment_hash: str


@dataclass(frozen=True)
class ScheduleResult:
    scenario_parameter_hash: str
    assignments: tuple[ScheduledAssignment, ...]
    assignment_manifest_hash: str
    side_assignment_aliased: bool
    order_assignment_aliased: bool


@dataclass(frozen=True)
class GraphScheduleResult:
    scenario_parameter_hash: str
    graph_profile: str
    vertices: tuple[str, ...]
    scheduled_edges: tuple[tuple[str, str], ...]
    assignments: tuple[ScheduledAssignment, ...]
    assignment_manifest_hash: str
    recurring_identity_declared: bool
    side_assignment_aliased: bool
    order_assignment_aliased: bool


def _require_object(
    parent: dict[str, object], key: str, required: frozenset[str]
) -> dict[str, object]:
    value = parent.get(key)
    if not isinstance(value, dict) or set(value) != required:
        raise ScheduleValidationError(f"{key} must contain exactly {sorted(required)!r}")
    return value


def _positive_int(value: object, label: str) -> int:
    if isinstance(value, bool) or not isinstance(value, int) or value < 1:
        raise ScheduleValidationError(f"{label} must be a positive integer")
    return value


def _rotate(values: list[int], offset: int) -> list[int]:
    if not values:
        return []
    normalized = offset % len(values)
    return values[normalized:] + values[:normalized]


def _centered_code(position: int, count: int) -> float | None:
    if count == 1:
        return None
    return (2 * position - count - 1) / (count - 1)


def _session_units(
    family_count: int,
    card_count: int,
    rater_index: int,
    order_design: str,
) -> list[tuple[int, int]]:
    families = list(range(1, family_count + 1))
    cards = list(range(1, card_count + 1))

    if order_design == "O-BALANCED":
        family_order = _rotate(families, rater_index - 1)
        card_order = _rotate(cards, rater_index - 1)
        units = [(family, card) for family in family_order for card in card_order]
        if rater_index % 2 == 0:
            units.reverse()
        return units
    if order_design == "O-ALIASED":
        return [(family, card) for family in families for card in cards]
    if order_design == "O-RANDOM":
        raise ScheduleValidationError(
            "O-RANDOM requires the separately owned allocation-stream shuffle"
        )
    if order_design == "O-LATE-BIAS":
        raise ScheduleValidationError(
            "O-LATE-BIAS requires pre-outcome finite-effect difficulty values"
        )
    raise ScheduleValidationError(f"unsupported order design: {order_design!r}")


def _a_is_left(
    side_design: str,
    card_index: int,
    family_index: int,
    rater_index: int,
    rater_count: int,
) -> bool:
    if side_design == "S-EXACT":
        return (card_index + family_index + rater_index) % 2 == 0
    if side_design == "S-NEAR":
        shift = (card_index + family_index - 2) % rater_count
        return ((rater_index - 1 + shift) % rater_count) < ceil(rater_count / 2)
    if side_design == "S-ALIASED":
        return True
    if side_design == "S-8020":
        raise ScheduleValidationError(
            "S-8020 requires a separately owned allocation-stream uniform"
        )
    raise ScheduleValidationError(f"unsupported side design: {side_design!r}")


def _assignment_fields(
    *,
    card_index: int,
    family_index: int,
    rater_index: int,
    calibration_count: int,
    card_count: int,
    session_position_index: int,
    session_count: int,
    card_position_index: int,
    a_displayed_left: bool,
) -> dict[str, object]:
    candidate_a_id = f"SCAND-{family_index:04d}-A"
    candidate_b_id = f"SCAND-{family_index:04d}-B"
    order_code = _centered_code(card_position_index, card_count)
    session_code = _centered_code(session_position_index, session_count)
    if session_code is None:
        session_code = 0.0
    return {
        "a_displayed_left": a_displayed_left,
        "assignment_id": f"SASSIGN-{card_index:04d}-{family_index:04d}-{rater_index:04d}",
        "candidate_a_id": candidate_a_id,
        "candidate_b_id": candidate_b_id,
        "card_count": card_count,
        "card_id": f"SCARD-{card_index:04d}",
        "card_position_index": card_position_index,
        "displayed_left_candidate_id": (
            candidate_a_id if a_displayed_left else candidate_b_id
        ),
        "displayed_right_candidate_id": (
            candidate_b_id if a_displayed_left else candidate_a_id
        ),
        "family_id": f"SMSG-{family_index:04d}",
        "order_code": order_code,
        "pair_id": f"SPAIR-{family_index:04d}",
        "rater_id": f"SRATER-{rater_index:04d}",
        "session_count": session_count,
        "session_position_code": session_code,
        "session_position_index": session_position_index,
        "side_code_a": 0.5 if a_displayed_left else -0.5,
        "split": "calibration" if family_index <= calibration_count else "public_test",
    }


def build_schedule(scenario: ScenarioBundle) -> ScheduleResult:
    """Build the exact deterministic G-NONE ordinary schedule supported by SIM-I0.

    Random allocation, graph, and counterfactual schedules fail closed until their
    independently owned stream and schedule inputs are implemented.
    """

    if content_hash(scenario.preimage) != scenario.scenario_parameter_hash:
        raise ScheduleValidationError("scenario hash does not match its parameter preimage")
    if scenario.scenario_id != f"SIM-{scenario.scenario_parameter_hash[:20]}":
        raise ScheduleValidationError("scenario ID does not match its full hash")
    if set(scenario.preimage) != {
        "analysis_profile_id",
        "factor_selections",
        "generating_profile_id",
        "math_profile_id",
        "scenario_grid_id",
        "schedule_profile_id",
        "target_id",
        "target_population_kind",
    }:
        raise ScheduleValidationError("scenario preimage does not have the exact frozen shape")

    selections = scenario.preimage.get("factor_selections")
    if not isinstance(selections, dict):
        raise ScheduleValidationError("factor_selections must be an object")
    coverage = _require_object(
        selections, "coverage", frozenset({"calibration", "id", "public_test", "total"})
    )
    family_count = _positive_int(coverage["total"], "coverage.total")
    calibration_count = _positive_int(coverage["calibration"], "coverage.calibration")
    public_test_count = coverage["public_test"]
    if (
        isinstance(public_test_count, bool)
        or not isinstance(public_test_count, int)
        or public_test_count < 0
        or calibration_count + public_test_count != family_count
    ):
        raise ScheduleValidationError("coverage split must exactly reconcile to total")

    card = _require_object(selections, "card_count", frozenset({"id", "value"}))
    rater = _require_object(selections, "rater_count", frozenset({"id", "value"}))
    card_count = _positive_int(card["value"], "card_count.value")
    rater_count = _positive_int(rater["value"], "rater_count.value")

    graph_profile = selections.get("graph_profile")
    if graph_profile != "G-NONE":
        raise ScheduleValidationError("graph schedules are outside the ordinary G-NONE slice")
    counterfactual_profile = selections.get("counterfactual_profile")
    if counterfactual_profile != "CF0-INVARIANT":
        raise ScheduleValidationError(
            "counterfactual schedules require the paired BASE/CF schedule implementation"
        )

    side_design = selections.get("side_design")
    order_design = selections.get("order_design")
    if not isinstance(side_design, str) or not isinstance(order_design, str):
        raise ScheduleValidationError("side_design and order_design must be strings")

    positions: dict[tuple[int, int, int], tuple[int, int]] = {}
    session_count = family_count * card_count
    for rater_index in range(1, rater_count + 1):
        units = _session_units(family_count, card_count, rater_index, order_design)
        if len(units) != session_count or len(set(units)) != session_count:
            raise ScheduleValidationError("session schedule is not an exact unit permutation")
        within_family_counts = {family: 0 for family in range(1, family_count + 1)}
        for session_position_index, (family_index, card_index) in enumerate(units, start=1):
            within_family_counts[family_index] += 1
            positions[(card_index, family_index, rater_index)] = (
                session_position_index,
                within_family_counts[family_index],
            )

    assignments: list[ScheduledAssignment] = []
    for card_index in range(1, card_count + 1):
        for family_index in range(1, family_count + 1):
            for rater_index in range(1, rater_count + 1):
                session_position_index, card_position_index = positions[
                    (card_index, family_index, rater_index)
                ]
                a_displayed_left = _a_is_left(
                    side_design,
                    card_index,
                    family_index,
                    rater_index,
                    rater_count,
                )
                fields = _assignment_fields(
                    card_index=card_index,
                    family_index=family_index,
                    rater_index=rater_index,
                    calibration_count=calibration_count,
                    card_count=card_count,
                    session_position_index=session_position_index,
                    session_count=session_count,
                    card_position_index=card_position_index,
                    a_displayed_left=a_displayed_left,
                )
                assignment_hash = content_hash(fields)
                assignments.append(
                    ScheduledAssignment(
                        **fields,
                        presentation_assignment_hash=assignment_hash,
                    )
                )

    frozen_assignments = tuple(assignments)
    manifest_hash = content_hash(
        {"assignments": [asdict(item) for item in frozen_assignments]}
    )
    return ScheduleResult(
        scenario_parameter_hash=scenario.scenario_parameter_hash,
        assignments=frozen_assignments,
        assignment_manifest_hash=manifest_hash,
        side_assignment_aliased=side_design == "S-ALIASED",
        order_assignment_aliased=order_design == "O-ALIASED",
    )


def _treatment(index: int) -> str:
    return f"STREAT-{index:04d}"


def _graph_topology(profile: str) -> tuple[tuple[str, str], ...]:
    if profile == "G1-CHAIN-SEPARATED":
        pairs = tuple((index, index + 1) for index in range(1, 8))
    elif profile == "G2-DIRECTED-CYCLE":
        pairs = tuple((index, index + 1) for index in range(1, 8)) + ((8, 1),)
    elif profile == "G3-TWO-CYCLES":
        pairs = ((1, 2), (2, 3), (3, 4), (4, 1), (5, 6), (6, 7), (7, 8), (8, 5))
    elif profile == "G4-UNDEFEATED-STAR":
        pairs = tuple((1, index) for index in range(2, 9))
    elif profile == "G5-BRIDGE-VULNERABLE":
        pairs = (
            (1, 2),
            (2, 3),
            (3, 4),
            (4, 1),
            (5, 6),
            (6, 7),
            (7, 8),
            (8, 5),
            (4, 5),
            (5, 4),
        )
    elif profile == "G6-ROUND-ROBIN":
        pairs = tuple((left, right) for left in range(1, 9) for right in range(left + 1, 9))
    else:
        raise ScheduleValidationError(f"unsupported recurring graph profile: {profile!r}")
    return tuple((_treatment(left), _treatment(right)) for left, right in pairs)


def _validate_graph_identity(scenario: ScenarioBundle) -> dict[str, object]:
    if content_hash(scenario.preimage) != scenario.scenario_parameter_hash:
        raise ScheduleValidationError("scenario hash does not match its parameter preimage")
    if scenario.scenario_id != f"SIM-{scenario.scenario_parameter_hash[:20]}":
        raise ScheduleValidationError("scenario ID does not match its full hash")
    selections = scenario.preimage.get("factor_selections")
    if not isinstance(selections, dict):
        raise ScheduleValidationError("factor_selections must be an object")
    graph_profile = selections.get("graph_profile")
    if graph_profile == "G-NONE" or not isinstance(graph_profile, str):
        raise ScheduleValidationError("graph schedule requires an exact G0..G6 profile")
    card = _require_object(selections, "card_count", frozenset({"id", "value"}))
    if card != {"id": "CARD1", "value": 1}:
        raise ScheduleValidationError("graph schedules force CARD1")
    if selections.get("side_design") != "S-EXACT":
        raise ScheduleValidationError("graph candidate supports only the Arm-D S-EXACT side rule")
    if selections.get("order_design") != "O-BALANCED":
        raise ScheduleValidationError("graph candidate supports only the Arm-D O-BALANCED order")
    return selections


def build_graph_schedule(scenario: ScenarioBundle) -> GraphScheduleResult:
    """Build the exact G0..G6 graph identities, sessions, and side assignments."""

    selections = _validate_graph_identity(scenario)
    profile = str(selections["graph_profile"])
    coverage = _require_object(
        selections, "coverage", frozenset({"calibration", "id", "public_test", "total"})
    )
    family_count = _positive_int(coverage["total"], "coverage.total")
    calibration_count = _positive_int(coverage["calibration"], "coverage.calibration")
    public_count = coverage["public_test"]
    if (
        isinstance(public_count, bool)
        or not isinstance(public_count, int)
        or public_count < 0
        or calibration_count + public_count != family_count
    ):
        raise ScheduleValidationError("coverage split must exactly reconcile to total")
    rater = _require_object(selections, "rater_count", frozenset({"id", "value"}))
    rater_count = _positive_int(rater["value"], "rater_count.value")

    if profile == "G0-CURRENT-DYADS":
        if coverage != {"calibration": 14, "id": "C22", "public_test": 8, "total": 22}:
            raise ScheduleValidationError("G0 requires the frozen C22 coverage")
        vertices = tuple(f"SCAND-{index:04d}" for index in range(1, 45))
        scheduled_edges = tuple(
            (vertices[index], vertices[index + 1]) for index in range(0, 44, 2)
        )
        recurring = False
    else:
        if coverage["id"] not in {"C10", "C22"}:
            raise ScheduleValidationError("recurring graph fixtures require C10 or C22")
        vertices = tuple(_treatment(index) for index in range(1, 9))
        scheduled_edges = _graph_topology(profile)
        recurring = True

    positions: dict[tuple[int, int, int], int] = {}
    for rater_index in range(1, rater_count + 1):
        families = _rotate(list(range(1, family_count + 1)), rater_index - 1)
        if profile == "G0-CURRENT-DYADS":
            units = [(family, family) for family in families]
        else:
            units = [
                (edge_index, family)
                for edge_index in range(1, len(scheduled_edges) + 1)
                for family in families
            ]
        if rater_index % 2 == 0:
            units.reverse()
        for position, (edge_index, family_index) in enumerate(units, start=1):
            positions[(edge_index, family_index, rater_index)] = position

    session_count = (
        family_count if profile == "G0-CURRENT-DYADS" else len(scheduled_edges) * family_count
    )
    assignments: list[ScheduledAssignment] = []
    edge_family_rows = (
        ((family, family) for family in range(1, family_count + 1))
        if profile == "G0-CURRENT-DYADS"
        else (
            (edge_index, family)
            for edge_index in range(1, len(scheduled_edges) + 1)
            for family in range(1, family_count + 1)
        )
    )
    for edge_index, family_index in edge_family_rows:
        candidate_a_id, candidate_b_id = scheduled_edges[edge_index - 1]
        pair_id = (
            f"SPAIR-{family_index:04d}"
            if profile == "G0-CURRENT-DYADS"
            else f"SPAIR-{edge_index:04d}-{family_index:04d}"
        )
        for rater_index in range(1, rater_count + 1):
            a_displayed_left = _a_is_left(
                "S-EXACT", 1, family_index, rater_index, rater_count
            )
            session_position = positions[(edge_index, family_index, rater_index)]
            session_code = _centered_code(session_position, session_count)
            if session_code is None:
                session_code = 0.0
            fields: dict[str, object] = {
                "a_displayed_left": a_displayed_left,
                "assignment_id": f"SASSIGN-{edge_index:04d}-{family_index:04d}-{rater_index:04d}",
                "candidate_a_id": candidate_a_id,
                "candidate_b_id": candidate_b_id,
                "card_count": 1,
                "card_id": "SCARD-0001",
                "card_position_index": 1,
                "displayed_left_candidate_id": candidate_a_id if a_displayed_left else candidate_b_id,
                "displayed_right_candidate_id": candidate_b_id if a_displayed_left else candidate_a_id,
                "family_id": f"SMSG-{family_index:04d}",
                "order_code": None,
                "pair_id": pair_id,
                "rater_id": f"SRATER-{rater_index:04d}",
                "session_count": session_count,
                "session_position_code": session_code,
                "session_position_index": session_position,
                "side_code_a": 0.5 if a_displayed_left else -0.5,
                "split": "calibration" if family_index <= calibration_count else "public_test",
            }
            assignments.append(
                ScheduledAssignment(
                    **fields,
                    presentation_assignment_hash=content_hash(fields),
                )
            )
    frozen_assignments = tuple(assignments)
    manifest_hash = content_hash(
        {
            "assignments": [asdict(row) for row in frozen_assignments],
            "graph_profile": profile,
            "scheduled_edges": [list(edge) for edge in scheduled_edges],
            "vertices": list(vertices),
        }
    )
    return GraphScheduleResult(
        scenario_parameter_hash=scenario.scenario_parameter_hash,
        graph_profile=profile,
        vertices=vertices,
        scheduled_edges=scheduled_edges,
        assignments=frozen_assignments,
        assignment_manifest_hash=manifest_hash,
        recurring_identity_declared=recurring,
        side_assignment_aliased=False,
        order_assignment_aliased=False,
    )
