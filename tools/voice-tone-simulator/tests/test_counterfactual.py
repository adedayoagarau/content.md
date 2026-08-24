from __future__ import annotations

from dataclasses import replace
from copy import deepcopy
from collections import Counter
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
from vt_simulator.counterfactual import (  # noqa: E402
    CounterfactualValidationError,
    apply_counterfactual_profile,
    build_counterfactual_schedule,
    generate_counterfactual_replicate,
)
from vt_simulator.grid import ScenarioBundle, build_scenario_preimage  # noqa: E402
from vt_simulator.manifest import ApprovedRoots, load_validated_protocol  # noqa: E402


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
        arm_memberships=("ARM-K-COUNTERFACTUAL",),
    )


def counterfactual_scenario(protocol_value, **overrides: object) -> ScenarioBundle:
    values: dict[str, object] = {
        "procedural_rate": {"id": "M00", "value": "0.00"},
        "missingness_mechanism": "MCAR",
    }
    values.update(overrides)
    return scenario(protocol_value, **values)


class CounterfactualScheduleTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.protocol = protocol()

    def test_each_ordinary_assignment_becomes_one_exact_two_member_pair(self) -> None:
        result = build_counterfactual_schedule(
            self.protocol,
            counterfactual_scenario(
                self.protocol, counterfactual_profile="CF1-THRESHOLD-SHIFT"
            ),
        )
        self.assertEqual(len(result.pairs), 120)
        self.assertEqual(len(result.members), 240)
        self.assertEqual(len({pair.pair_id for pair in result.pairs}), 120)
        self.assertEqual(len({member.member_id for member in result.members}), 240)

        for pair in result.pairs:
            with self.subTest(pair_id=pair.pair_id):
                base, counterfactual = pair.members
                self.assertEqual(base.member_role, "BASE")
                self.assertEqual(counterfactual.member_role, "CF")
                self.assertEqual(base.member_id, f"{pair.ordinary_assignment_id}-BASE")
                self.assertEqual(counterfactual.member_id, f"{pair.ordinary_assignment_id}-CF")
                self.assertEqual(base.ordinary_assignment, counterfactual.ordinary_assignment)
                self.assertEqual(
                    {
                        base.ordinary_assignment.rater_id,
                        counterfactual.ordinary_assignment.rater_id,
                    },
                    {base.ordinary_assignment.rater_id},
                )

    def test_presentation_order_is_parity_balanced_but_storage_is_base_then_cf(self) -> None:
        result = build_counterfactual_schedule(
            self.protocol,
            counterfactual_scenario(
                self.protocol, counterfactual_profile="CF0-INVARIANT"
            ),
        )
        observed = {"BASE": 0, "CF": 0}
        for pair in result.pairs:
            base, counterfactual = pair.members
            assignment = base.ordinary_assignment
            card = int(assignment.card_id.removeprefix("SCARD-"))
            family = int(assignment.family_id.removeprefix("SMSG-"))
            rater = int(assignment.rater_id.removeprefix("SRATER-"))
            expected_first = "BASE" if (card + family + rater) % 2 == 0 else "CF"
            self.assertEqual(pair.presentation_order[0], expected_first)
            self.assertEqual(pair.presentation_order[1], "CF" if expected_first == "BASE" else "BASE")
            self.assertEqual((base.member_role, counterfactual.member_role), ("BASE", "CF"))
            observed[expected_first] += 1
        self.assertEqual(observed, {"BASE": 60, "CF": 60})

    def test_profile_admissibility_is_explicit_and_schedule_hash_is_self_consistent(self) -> None:
        for profile in (
            "CF0-INVARIANT",
            "CF1-THRESHOLD-SHIFT",
            "CF2-CONSTRUCT-SHIFT",
            "CF3-ITEM-DIF",
            "CF4-INVALID-OPERATION",
        ):
            with self.subTest(profile=profile):
                result = build_counterfactual_schedule(
                    self.protocol,
                    counterfactual_scenario(
                        self.protocol, counterfactual_profile=profile
                    ),
                )
                self.assertEqual(result.counterfactual_profile, profile)
                self.assertEqual(
                    result.operation.operation_id,
                    "SCFOP-0001",
                )
                self.assertEqual(
                    result.operation.declared_changed_fields,
                    ("synthetic_surface_token",),
                )
                self.assertEqual(
                    result.operation.admissibility_status,
                    "rejected" if profile == "CF4-INVALID-OPERATION" else "admissible",
                )
                self.assertEqual(
                    result.schedule_hash,
                    content_hash(result.hash_preimage()),
                )

    def test_arm_k_validation_rejects_out_of_arm_and_tampered_scenarios(self) -> None:
        with self.assertRaises(CounterfactualValidationError):
            build_counterfactual_schedule(
                self.protocol,
                counterfactual_scenario(
                    self.protocol,
                    counterfactual_profile="CF1-THRESHOLD-SHIFT",
                    prevalence_profile="P2-TIE-RICH",
                ),
            )

        valid = counterfactual_scenario(
            self.protocol,
            counterfactual_profile="CF1-THRESHOLD-SHIFT",
        )
        with self.assertRaises(CounterfactualValidationError):
            build_counterfactual_schedule(
                self.protocol,
                replace(valid, scenario_parameter_hash="0" * 64),
            )

        profile_tamper = deepcopy(valid.preimage)
        profile_tamper["analysis_profile_id"] = "UNDECLARED-ANALYSIS"
        profile_digest = content_hash(profile_tamper)
        with self.assertRaises(CounterfactualValidationError):
            build_counterfactual_schedule(
                self.protocol,
                ScenarioBundle(
                    scenario_parameter_hash=profile_digest,
                    scenario_id=f"SIM-{profile_digest[:20]}",
                    preimage=profile_tamper,
                    arm_memberships=("ARM-K-COUNTERFACTUAL",),
                ),
            )

        with self.assertRaises(CounterfactualValidationError):
            build_counterfactual_schedule(
                self.protocol,
                counterfactual_scenario(
                    self.protocol,
                    counterfactual_profile="CF1-THRESHOLD-SHIFT",
                    target_id="T-NEW-RATER",
                    target_population_kind="fixed_messages_rater_population",
                ),
            )


class CounterfactualTransformTests(unittest.TestCase):
    def test_profile_transforms_are_exact_and_stratum_bounded(self) -> None:
        base = dict(
            canonical_preference_contrast=1.25,
            display_left_latent_fit=0.75,
            display_right_latent_fit=-0.25,
            threshold_location=0.10,
        )
        invariant = apply_counterfactual_profile("CF0-INVARIANT", "SLOC-1", **base)
        threshold = apply_counterfactual_profile(
            "CF1-THRESHOLD-SHIFT", "SLOC-1", **base
        )
        reversed_construct = apply_counterfactual_profile(
            "CF2-CONSTRUCT-SHIFT", "SLOC-1", **base
        )
        dif_outside = apply_counterfactual_profile("CF3-ITEM-DIF", "SLOC-1", **base)
        dif_inside = apply_counterfactual_profile("CF3-ITEM-DIF", "SLOC-2", **base)

        self.assertEqual(invariant, invariant.__class__(1.25, 0.75, -0.25, 0.10))
        self.assertEqual(threshold, threshold.__class__(1.25, 0.75, -0.25, 0.60))
        self.assertEqual(
            reversed_construct,
            reversed_construct.__class__(-1.25, -0.75, 0.25, 0.10),
        )
        self.assertEqual(dif_outside, invariant)
        self.assertEqual(dif_inside, dif_inside.__class__(2.00, 1.25, 0.25, 0.10))

    def test_invalid_operation_never_falls_through_as_a_transform(self) -> None:
        with self.assertRaises(CounterfactualValidationError):
            apply_counterfactual_profile(
                "CF4-INVALID-OPERATION",
                "SLOC-1",
                canonical_preference_contrast=0.0,
                display_left_latent_fit=0.0,
                display_right_latent_fit=0.0,
                threshold_location=0.0,
            )


class CounterfactualReplicateTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.protocol = protocol()
        cls.invariant_scenario = counterfactual_scenario(
            cls.protocol,
            counterfactual_profile="CF0-INVARIANT",
        )
        cls.invariant = generate_counterfactual_replicate(
            cls.protocol,
            cls.invariant_scenario,
            replicate_index=1,
        )

    def test_exact_stream_ownership_and_full_reserved_allotments(self) -> None:
        self.assertEqual(
            [
                (row.stream_name, row.target_id, row.observed_draw_count)
                for row in self.invariant.stream_receipts
            ],
            [
                ("finite-effects", "POPULATION-SHARED", 1032),
                ("finite-effects", "POPULATION-SHARED", 1032),
                ("nonstart", "T-FIXED-FIXED", 120),
                ("nonlock", "T-FIXED-FIXED", 240),
                ("procedural-abstention", "T-FIXED-FIXED", 240),
                ("procedural-reason", "T-FIXED-FIXED", 240),
                ("invalidation", "T-FIXED-FIXED", 480),
                ("submitted-outcome", "T-FIXED-FIXED", 120),
                ("ordinal-band", "T-FIXED-FIXED", 240),
                ("evidence-span", "T-FIXED-FIXED", 1920),
                ("counterfactual", "T-FIXED-FIXED", 360),
            ],
        )
        self.assertTrue(
            all(
                row.status == "complete"
                and row.expected_draw_count == row.observed_draw_count
                for row in self.invariant.stream_receipts
            )
        )

    def test_cf0_has_same_latent_law_but_independent_response_noise(self) -> None:
        self.assertEqual(len(self.invariant.pair_results), 120)
        differing_outcomes = 0
        for pair in self.invariant.pair_results:
            base = pair.base
            counterfactual = pair.counterfactual
            self.assertEqual(base.category_probabilities, counterfactual.category_probabilities)
            self.assertEqual(
                base.canonical_preference_contrast,
                counterfactual.canonical_preference_contrast,
            )
            self.assertEqual(base.threshold_location, counterfactual.threshold_location)
            if (
                base.derived_canonical_outcome is not None
                and counterfactual.derived_canonical_outcome is not None
                and base.derived_canonical_outcome
                != counterfactual.derived_canonical_outcome
            ):
                differing_outcomes += 1
        self.assertGreater(differing_outcomes, 0)

    def test_denominator_ledger_partitions_every_pair(self) -> None:
        ledger = self.invariant.denominators
        self.assertEqual(ledger.scheduled_pairs, 120)
        self.assertEqual(
            ledger.both_valid
            + ledger.base_only
            + ledger.counterfactual_only
            + ledger.neither_valid
            + ledger.invalid_operation_rejected,
            120,
        )
        self.assertEqual(ledger.transition_denominator, ledger.both_valid)
        self.assertLessEqual(ledger.paired_band_denominator, ledger.both_valid)
        self.assertEqual(self.invariant.estimate_status, "not_run")
        self.assertIsNone(self.invariant.estimate_reason_code)

    def test_missingness_members_diverge_without_changing_pair_identity(self) -> None:
        result = generate_counterfactual_replicate(
            self.protocol,
            counterfactual_scenario(
                self.protocol,
                counterfactual_profile="CF3-ITEM-DIF",
                procedural_rate={"id": "M15", "value": "0.15"},
                missingness_mechanism="MAR-ORDER-CONTEXT",
                locale_stratum="SLOC-2",
            ),
            replicate_index=1,
        )
        self.assertGreater(
            result.denominators.base_only + result.denominators.counterfactual_only,
            0,
        )
        for pair in result.pair_results:
            self.assertEqual(
                pair.base.ordinary_assignment_id,
                pair.counterfactual.ordinary_assignment_id,
            )

    def test_profile_transforms_are_applied_to_generated_cf_members(self) -> None:
        expectations = {
            "CF1-THRESHOLD-SHIFT": ("SLOC-1", 1.0, 1.0, 0.50),
            "CF2-CONSTRUCT-SHIFT": ("SLOC-1", -1.0, -1.0, 0.00),
            "CF3-ITEM-DIF": ("SLOC-2", None, None, 0.00),
        }
        for profile, (locale, contrast_scale, fit_scale, location_shift) in expectations.items():
            with self.subTest(profile=profile):
                result = generate_counterfactual_replicate(
                    self.protocol,
                    counterfactual_scenario(
                        self.protocol,
                        counterfactual_profile=profile,
                        locale_stratum=locale,
                        heterogeneity_profile="H3-INTERPRETATION-MIX",
                    ),
                    replicate_index=1,
                )
                for pair in result.pair_results:
                    base = pair.base
                    cf = pair.counterfactual
                    self.assertEqual(base.disposition, "submitted")
                    self.assertEqual(cf.disposition, "submitted")
                    assert base.canonical_preference_contrast is not None
                    assert cf.canonical_preference_contrast is not None
                    assert base.display_left_latent_fit is not None
                    assert cf.display_left_latent_fit is not None
                    assert base.display_right_latent_fit is not None
                    assert cf.display_right_latent_fit is not None
                    assert base.threshold_location is not None
                    assert cf.threshold_location is not None
                    if profile == "CF3-ITEM-DIF":
                        self.assertAlmostEqual(
                            cf.canonical_preference_contrast,
                            base.canonical_preference_contrast + 0.75,
                        )
                        self.assertAlmostEqual(
                            cf.display_left_latent_fit,
                            base.display_left_latent_fit + 0.50,
                        )
                        self.assertAlmostEqual(
                            cf.display_right_latent_fit,
                            base.display_right_latent_fit + 0.50,
                        )
                    else:
                        assert contrast_scale is not None
                        assert fit_scale is not None
                        self.assertAlmostEqual(
                            cf.canonical_preference_contrast,
                            contrast_scale * base.canonical_preference_contrast,
                        )
                        self.assertAlmostEqual(
                            cf.display_left_latent_fit,
                            fit_scale * base.display_left_latent_fit,
                        )
                        self.assertAlmostEqual(
                            cf.display_right_latent_fit,
                            fit_scale * base.display_right_latent_fit,
                        )
                    self.assertAlmostEqual(
                        cf.threshold_location,
                        base.threshold_location + location_shift,
                    )

    def test_invalid_operation_consumes_every_slot_but_emits_no_rating(self) -> None:
        result = generate_counterfactual_replicate(
            self.protocol,
            counterfactual_scenario(
                self.protocol,
                counterfactual_profile="CF4-INVALID-OPERATION",
            ),
            replicate_index=1,
        )
        self.assertEqual(result.estimate_status, "unsupported")
        self.assertEqual(result.estimate_reason_code, "unsupported_estimand_scope")
        self.assertEqual(result.denominators.invalid_operation_rejected, 120)
        self.assertEqual(result.denominators.transition_denominator, 0)
        self.assertEqual(result.process_hazards, ())
        for pair in result.pair_results:
            for member in (pair.base, pair.counterfactual):
                self.assertEqual(member.disposition, "invalid_operation_rejected")
                self.assertIsNone(member.raw_display_outcome)
                self.assertIsNone(member.derived_canonical_outcome)
                self.assertIsNone(member.candidate_a_band)
                self.assertIsNone(member.candidate_b_band)
        self.assertEqual(
            [row.observed_draw_count for row in result.stream_receipts],
            [1032, 1032, 120, 240, 240, 240, 480, 120, 240, 1920, 360],
        )

    def test_repeat_hash_and_input_validation_fail_closed(self) -> None:
        repeated = generate_counterfactual_replicate(
            self.protocol,
            self.invariant_scenario,
            replicate_index=1,
        )
        self.assertEqual(self.invariant, repeated)
        self.assertEqual(
            self.invariant.record_hash,
            content_hash(self.invariant.hash_preimage()),
        )
        for invalid in (0, 1001, True):
            with self.subTest(replicate_index=invalid):
                with self.assertRaises(CounterfactualValidationError):
                    generate_counterfactual_replicate(
                        self.protocol,
                        self.invariant_scenario,
                        replicate_index=invalid,
                    )

    def test_cf0_replicate_matches_the_frozen_independent_vector(self) -> None:
        vector = json.loads(
            (
                PACKAGE_ROOT
                / "tests"
                / "fixtures"
                / "counterfactual-cf0-replicate-vector.json"
            ).read_text(encoding="utf-8")
        )
        self.assertEqual(
            vector["vector_id"],
            "VT-MSP-COUNTERFACTUAL-CF0-REPLICATE-1/design-0.1",
        )
        self.assertEqual(
            self.invariant.scenario_parameter_hash,
            vector["scenario_parameter_hash"],
        )
        self.assertEqual(self.invariant.schedule_hash, vector["schedule_hash"])
        self.assertEqual(self.invariant.record_hash, vector["replicate_record_hash"])
        self.assertEqual(len(self.invariant.pair_results), vector["pair_count"])
        self.assertEqual(
            Counter(row.pair_disposition for row in self.invariant.pair_results),
            vector["pair_disposition_counts"],
        )
        self.assertEqual(
            Counter(row.base.derived_canonical_outcome for row in self.invariant.pair_results),
            vector["base_outcome_counts"],
        )
        self.assertEqual(
            Counter(
                row.counterfactual.derived_canonical_outcome
                for row in self.invariant.pair_results
            ),
            vector["counterfactual_outcome_counts"],
        )
        self.assertEqual(self.invariant.denominators.__dict__, vector["denominators"])
        self.assertEqual(
            [
                [row.stage, row.risk_set_count, row.event_count, row.solver_status, row.iterations]
                for row in self.invariant.process_hazards
            ],
            vector["hazards"],
        )
        self.assertEqual(
            [
                [row.stream_name, row.stream_fingerprint, row.observed_draw_count]
                for row in self.invariant.stream_receipts
            ],
            vector["stream_receipts"],
        )


if __name__ == "__main__":
    unittest.main()
