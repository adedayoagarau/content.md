from __future__ import annotations

from pathlib import Path
import sys
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
REPOSITORY_ROOT = PACKAGE_ROOT.parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.grid import ScenarioBundle, build_scenario_preimage  # noqa: E402
from vt_simulator.manifest import ApprovedRoots, load_validated_protocol  # noqa: E402
from vt_simulator.process import (  # noqa: E402
    ProcessCovariates,
    ProcessUniforms,
    SequentialProcessSpec,
    build_population_block,
    five_category_probabilities,
    generate_raw_response,
    generate_graph_fixture_response,
    generate_ordinal_bands,
    invalidation_reason_from_uniform,
    map_ordinal_bands,
    map_raw_response,
    ordinal_adapters,
    ordinal_probabilities,
    procedural_reason_from_uniform,
    run_sequential_process,
    sample_latent_category,
    select_population_effects,
    solve_intercept,
)
from vt_simulator.schedule import build_graph_schedule, build_schedule  # noqa: E402
from vt_simulator.canonical import content_hash  # noqa: E402


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
        arm_memberships=("TEST-PROCESS",),
    )


def small_schedule():
    protocol_value = protocol()
    preimage = build_scenario_preimage(
        protocol_value,
        {
            "coverage": {"calibration": 1, "id": "C1", "public_test": 0, "total": 1},
            "card_count": {"id": "CARD1", "value": 1},
            "rater_count": {"id": "R3", "value": 3},
        },
    )
    digest = content_hash(preimage)
    scenario = ScenarioBundle(
        scenario_parameter_hash=digest,
        scenario_id=f"SIM-{digest[:20]}",
        preimage=preimage,
        arm_memberships=("TEST-PROCESS",),
    )
    return build_schedule(scenario)


class InterceptSolverTests(unittest.TestCase):
    def test_zero_target_bypasses_solver(self) -> None:
        result = solve_intercept(0.0, (0.0, 1.0))
        self.assertEqual(result.status, "boundary_zero")
        self.assertIsNone(result.intercept)
        self.assertEqual(result.denominator, 2)
        self.assertEqual(result.iterations, 0)

    def test_empty_risk_set_is_typed_and_does_not_invent_an_intercept(self) -> None:
        result = solve_intercept(0.15, ())
        self.assertEqual(result.status, "empty_risk_set")
        self.assertIsNone(result.intercept)
        self.assertEqual(result.denominator, 0)

    def test_constant_predictor_recovers_the_logit_target(self) -> None:
        result = solve_intercept(0.25, (0.0, 0.0, 0.0, 0.0))
        self.assertEqual(result.status, "solved")
        self.assertAlmostEqual(result.intercept, -1.0986122886681098, places=10)
        self.assertLessEqual(abs(result.mean_probability - 0.25), 1e-12)
        self.assertLessEqual(result.iterations, 200)

    def test_nonconstant_predictors_reconcile_to_the_target_mean(self) -> None:
        result = solve_intercept(0.30, (-1.0, 0.0, 0.5, 2.0))
        self.assertEqual(result.status, "solved")
        self.assertLessEqual(abs(result.mean_probability - 0.30), 1e-12)


class SequentialProcessTests(unittest.TestCase):
    def setUp(self) -> None:
        self.schedule = small_schedule()
        self.ids = tuple(item.assignment_id for item in self.schedule.assignments)
        self.covariates = tuple(
            ProcessCovariates(
                assignment_id=assignment_id,
                interpretation_class_mismatch=False,
                last_quartile=False,
                fatigue_active=False,
                high_rateability_difficulty=False,
                high_context_difficulty=False,
                canonical_preference_contrast=0.0,
            )
            for assignment_id in self.ids
        )

    def test_zero_boundaries_submit_every_assignment(self) -> None:
        uniforms = tuple(
            ProcessUniforms(
                assignment_id=assignment_id,
                nonstart=0.01,
                nonlock=0.01,
                procedural=0.01,
                procedural_reason=0.01,
                invalidation_flag=0.01,
                invalidation_reason=0.01,
            )
            for assignment_id in self.ids
        )
        result = run_sequential_process(
            self.schedule,
            SequentialProcessSpec(
                missingness_mechanism="MCAR",
                nonstart_rate=0.0,
                nonlock_rate=0.0,
                procedural_rate=0.0,
                invalidation_rate=0.0,
            ),
            self.covariates,
            uniforms,
        )
        self.assertEqual([item.disposition for item in result.dispositions], ["submitted"] * 3)
        self.assertEqual(
            [(stage.stage, stage.risk_set_count, stage.event_count) for stage in result.hazards],
            [
                ("nonstart", 3, 0),
                ("nonlock", 3, 0),
                ("procedural_abstention", 3, 0),
                ("invalidation", 3, 0),
            ],
        )

    def test_risk_sets_are_sequential_and_terminal_states_are_exclusive(self) -> None:
        uniforms = (
            ProcessUniforms(self.ids[0], 0.25, 0.10, 0.10, 0.10, 0.10, 0.10),
            ProcessUniforms(self.ids[1], 0.75, 0.25, 0.10, 0.10, 0.10, 0.10),
            ProcessUniforms(self.ids[2], 0.75, 0.75, 0.75, 0.10, 0.05, 0.26),
        )
        result = run_sequential_process(
            self.schedule,
            SequentialProcessSpec("MCAR", 0.5, 0.5, 0.5, 0.1),
            self.covariates,
            uniforms,
        )
        self.assertEqual(
            [item.disposition for item in result.dispositions],
            ["nonstarted", "nonlocked", "invalidated"],
        )
        self.assertEqual(
            [stage.risk_set_count for stage in result.hazards], [3, 2, 1, 1]
        )
        self.assertEqual(
            [stage.event_count for stage in result.hazards], [1, 1, 0, 1]
        )
        self.assertEqual(result.dispositions[2].reason, "mapping_reference_mismatch")

    def test_assignment_sets_must_reconcile_exactly(self) -> None:
        with self.assertRaises(ValueError):
            run_sequential_process(
                self.schedule,
                SequentialProcessSpec("MCAR", 0.0, 0.0, 0.0, 0.0),
                self.covariates[:-1],
                tuple(
                    ProcessUniforms(value, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
                    for value in self.ids
                ),
            )


class ReasonMappingTests(unittest.TestCase):
    def test_procedural_reason_bins_are_exact_in_mcar(self) -> None:
        covariates = ProcessCovariates("A", False, False, False, False, False, 0.0)
        expected = (
            (0.00, "outside_qualified_scope"),
            (0.15, "conflict_of_interest"),
            (0.25, "blindness_breach"),
            (0.35, "inaccessible_presentation"),
            (0.45, "locale_or_language_unsupported"),
            (0.60, "technical_failure"),
            (0.80, "consent_withdrawn"),
            (0.90, "other_declared_reason"),
        )
        for draw, reason in expected:
            with self.subTest(draw=draw):
                self.assertEqual(
                    procedural_reason_from_uniform(
                        draw,
                        mechanism="MCAR",
                        side_design="S-EXACT",
                        locale_stratum="SLOC-1",
                        covariates=covariates,
                    ),
                    reason,
                )

    def test_invalidation_reason_bins_are_exact(self) -> None:
        self.assertEqual(invalidation_reason_from_uniform(0.00), "post_lock_integrity_failure")
        self.assertEqual(invalidation_reason_from_uniform(0.25), "mapping_reference_mismatch")
        self.assertEqual(invalidation_reason_from_uniform(0.50), "duplicate_submission")
        self.assertEqual(invalidation_reason_from_uniform(0.75), "late_exclusion_trigger")


class PopulationBlockTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.protocol = protocol()

    def test_complete_population_block_has_exact_slot_ledger(self) -> None:
        block = build_population_block(self.protocol, replicate_index=0)
        self.assertEqual(block.consumption.expected_draw_count, 1032)
        self.assertEqual(block.consumption.observed_draw_count, 1032)
        self.assertEqual(block.purposes[0], "family:preference:SMSG-0001")
        self.assertEqual(
            block.purposes[-1], "treatment-context:STREAT-0008:SMSG-0022"
        )
        self.assertEqual(len(block.purposes), len(set(block.purposes)))

    def test_population_blocks_are_reproducible_but_indices_differ(self) -> None:
        zero_left = build_population_block(self.protocol, replicate_index=0)
        zero_right = build_population_block(self.protocol, replicate_index=0)
        one = build_population_block(self.protocol, replicate_index=1)
        self.assertEqual(zero_left, zero_right)
        self.assertNotEqual(zero_left.block_hash, one.block_hash)
        self.assertNotEqual(
            zero_left.normal("family:preference:SMSG-0001"),
            one.normal("family:preference:SMSG-0001"),
        )

    def test_target_selection_redraws_only_declared_component_classes(self) -> None:
        frozen = build_population_block(self.protocol, replicate_index=0)
        redrawn = build_population_block(self.protocol, replicate_index=7)
        cases = {
            ("T-FIXED-FIXED", "fixed_messages_fixed_panel"): (0, 0, 0),
            ("T-NEW-MESSAGE", "new_messages_fixed_panel"): (7, 0, 7),
            ("T-NEW-RATER", "fixed_messages_rater_population"): (0, 7, 7),
            ("T-NEW-RATER-MESSAGE", "new_messages_rater_population"): (7, 7, 7),
        }
        for (target_id, target_kind), expected in cases.items():
            with self.subTest(target_id=target_id):
                scenario_value = scenario(
                    self.protocol,
                    target_id=target_id,
                    target_population_kind=target_kind,
                )
                selected = select_population_effects(scenario_value, frozen, redrawn)
                self.assertEqual(
                    (
                        selected.family_source_index,
                        selected.rater_source_index,
                        selected.interaction_source_index,
                    ),
                    expected,
                )

    def test_dependence_zero_is_an_exact_negative_control(self) -> None:
        frozen = build_population_block(self.protocol, replicate_index=0)
        redrawn = build_population_block(self.protocol, replicate_index=1)
        independent = select_population_effects(
            scenario(self.protocol, dependence_profile="D0-INDEPENDENT"),
            frozen,
            redrawn,
        )
        self.assertEqual(independent.crossed("preference", 1, 1), 0.0)
        moderate = select_population_effects(scenario(self.protocol), frozen, redrawn)
        expected = (
            0.35 * frozen.normal("family:preference:SMSG-0001")
            + 0.25 * frozen.normal("rater:preference:SRATER-0001")
            + 0.15
            * frozen.normal("interaction:preference:SRATER-0001:SMSG-0001")
        )
        self.assertEqual(moderate.crossed("preference", 1, 1), expected)


class SubmittedOutcomeTests(unittest.TestCase):
    def test_baseline_and_degenerate_probability_vectors_are_exact(self) -> None:
        baseline = five_category_probabilities("P0-BALANCED")
        self.assertAlmostEqual(sum(baseline), 1.0, places=15)
        for observed, expected in zip(
            baseline, (0.35, 0.35, 0.10, 0.10, 0.10), strict=True
        ):
            self.assertAlmostEqual(observed, expected, places=15)
        self.assertEqual(
            five_category_probabilities("P6-DEGENERATE-A"),
            (1.0, 0.0, 0.0, 0.0, 0.0),
        )
        self.assertEqual(
            five_category_probabilities("P7-DEGENERATE-TIE"),
            (0.0, 0.0, 1.0, 0.0, 0.0),
        )

    def test_canonical_contrast_moves_a_and_b_in_opposite_directions(self) -> None:
        neutral = five_category_probabilities("P0-BALANCED")
        shifted = five_category_probabilities(
            "P0-BALANCED", canonical_preference_contrast=1.0
        )
        self.assertGreater(shifted[0], neutral[0])
        self.assertLess(shifted[1], neutral[1])
        self.assertAlmostEqual(sum(shifted), 1.0, places=15)

    def test_category_sampling_uses_frozen_order_and_half_open_bins(self) -> None:
        probabilities = (0.35, 0.35, 0.10, 0.10, 0.10)
        self.assertEqual(sample_latent_category(probabilities, 0.00), "A")
        self.assertEqual(sample_latent_category(probabilities, 0.35), "B")
        self.assertEqual(
            sample_latent_category(probabilities, 0.70), "indistinguishable"
        )
        self.assertEqual(
            sample_latent_category(probabilities, 0.80), "both_unacceptable"
        )
        self.assertEqual(
            sample_latent_category(probabilities, 0.90), "insufficient_context"
        )

    def test_raw_left_right_is_separate_from_derived_a_b(self) -> None:
        schedule = small_schedule()
        a_right = next(item for item in schedule.assignments if not item.a_displayed_left)
        a_left = next(item for item in schedule.assignments if item.a_displayed_left)

        right_record = generate_raw_response(a_right, "A")
        self.assertEqual(right_record.raw_display_outcome, "RIGHT")
        right_mapping = map_raw_response(a_right, right_record)
        self.assertEqual(right_mapping.raw_display_outcome, "RIGHT")
        self.assertEqual(right_mapping.derived_canonical_outcome, "A")

        left_record = generate_raw_response(a_left, "B")
        self.assertEqual(left_record.raw_display_outcome, "RIGHT")
        left_mapping = map_raw_response(a_left, left_record)
        self.assertEqual(left_mapping.derived_canonical_outcome, "B")

    def test_nondecisive_categories_remain_distinct(self) -> None:
        assignment = small_schedule().assignments[0]
        for category in (
            "indistinguishable",
            "both_unacceptable",
            "insufficient_context",
        ):
            with self.subTest(category=category):
                raw = generate_raw_response(assignment, category)
                mapped = map_raw_response(assignment, raw)
                self.assertEqual(raw.raw_display_outcome, category)
                self.assertEqual(mapped.derived_canonical_outcome, category)


class GraphFixtureOutcomeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.protocol = protocol()
        cls.graph = build_graph_schedule(
            scenario(
                cls.protocol,
                graph_profile="G2-DIRECTED-CYCLE",
                card_count={"id": "CARD1", "value": 1},
            )
        )

    def test_decisive_draw_always_selects_the_listed_arc_source(self) -> None:
        probabilities = (0.35, 0.35, 0.10, 0.10, 0.10)
        for assignment in (
            next(row for row in self.graph.assignments if row.a_displayed_left),
            next(row for row in self.graph.assignments if not row.a_displayed_left),
        ):
            with self.subTest(assignment_id=assignment.assignment_id):
                raw = generate_graph_fixture_response(
                    "G2-DIRECTED-CYCLE", assignment, probabilities, 0.69
                )
                mapping = map_raw_response(assignment, raw)
                self.assertEqual(mapping.derived_canonical_outcome, "A")
                self.assertEqual(
                    raw.raw_display_outcome,
                    "LEFT" if assignment.a_displayed_left else "RIGHT",
                )

    def test_nondecisive_bins_remain_three_separate_categories(self) -> None:
        assignment = self.graph.assignments[0]
        probabilities = (0.35, 0.35, 0.10, 0.10, 0.10)
        cases = (
            (0.75, "indistinguishable"),
            (0.85, "both_unacceptable"),
            (0.95, "insufficient_context"),
        )
        for draw, expected in cases:
            with self.subTest(draw=draw):
                raw = generate_graph_fixture_response(
                    "G2-DIRECTED-CYCLE", assignment, probabilities, draw
                )
                self.assertEqual(raw.raw_display_outcome, expected)
                self.assertEqual(
                    map_raw_response(assignment, raw).derived_canonical_outcome,
                    expected,
                )

    def test_round_robin_and_nonfixture_profiles_cannot_use_forced_direction(self) -> None:
        assignment = self.graph.assignments[0]
        for profile in ("G-NONE", "G0-CURRENT-DYADS", "G6-ROUND-ROBIN"):
            with self.subTest(profile=profile):
                with self.assertRaises(ValueError):
                    generate_graph_fixture_response(
                        profile,
                        assignment,
                        (0.35, 0.35, 0.10, 0.10, 0.10),
                        0.5,
                    )


class OrdinalBandTests(unittest.TestCase):
    def test_all_profiles_form_valid_five_band_vectors(self) -> None:
        for profile in (
            "OM0-CORRECT-PO",
            "OM1-NONPROPORTIONAL",
            "OM2-ADJACENT",
            "OM3-SPARSE",
        ):
            with self.subTest(profile=profile):
                values = ordinal_probabilities(profile, latent_fit=0.25)
                self.assertEqual(len(values), 5)
                self.assertTrue(all(value >= 0.0 for value in values))
                self.assertAlmostEqual(sum(values), 1.0, places=15)

    def test_proportional_odds_zero_fit_is_symmetric(self) -> None:
        values = ordinal_probabilities("OM0-CORRECT-PO", latent_fit=0.0)
        self.assertAlmostEqual(values[0], values[-1], places=15)
        self.assertAlmostEqual(values[1], values[-2], places=15)

    def test_insufficient_context_has_null_bands_but_other_outcomes_do_not(self) -> None:
        null_bands = generate_ordinal_bands(
            "insufficient_context", "OM0-CORRECT-PO", 0.0, 0.0, 0.1, 0.9
        )
        self.assertIsNone(null_bands.display_left_band)
        self.assertIsNone(null_bands.display_right_band)
        observed = generate_ordinal_bands(
            "indistinguishable", "OM0-CORRECT-PO", 0.0, 0.0, 0.1, 0.9
        )
        self.assertIsInstance(observed.display_left_band, int)
        self.assertIsInstance(observed.display_right_band, int)

    def test_display_bands_map_to_candidate_identity_without_changing_values(self) -> None:
        schedule = small_schedule()
        assignment = next(
            item for item in schedule.assignments if not item.a_displayed_left
        )
        raw = generate_ordinal_bands(
            "LEFT", "OM0-CORRECT-PO", 0.0, 0.0, 0.01, 0.99
        )
        mapped = map_ordinal_bands(assignment, raw)
        self.assertEqual(mapped.candidate_a_band, raw.display_right_band)
        self.assertEqual(mapped.candidate_b_band, raw.display_left_band)
        self.assertEqual(
            {mapped.candidate_a_band, mapped.candidate_b_band},
            {raw.display_left_band, raw.display_right_band},
        )

    def test_adapters_are_exact_and_do_not_relabel_the_raw_band(self) -> None:
        self.assertEqual(ordinal_adapters(0), (1, 0.0))
        self.assertEqual(ordinal_adapters(2), (3, 0.5))
        self.assertEqual(ordinal_adapters(4), (5, 1.0))


if __name__ == "__main__":
    unittest.main()
