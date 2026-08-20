from __future__ import annotations

import json
from pathlib import Path
import shutil
import sys
import tempfile
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
REPOSITORY_ROOT = PACKAGE_ROOT.parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.canonical import content_hash, load_json_strict  # noqa: E402
from vt_simulator.manifest import (  # noqa: E402
    ApprovedRoots,
    ManifestValidationError,
    load_validated_protocol,
    verify_source_locks,
)


EXPECTED_FACTOR_KEYS = {
    "base_rate",
    "calibration_profile",
    "card_count",
    "counterfactual_profile",
    "coverage",
    "dependence_profile",
    "graph_profile",
    "heldout_count",
    "heterogeneity_profile",
    "invalidation_rate",
    "locale_stratum",
    "minimum_event_count",
    "missing_prediction_rate",
    "missingness_mechanism",
    "nonlock_rate",
    "nonstart_rate",
    "order_design",
    "order_effect",
    "ordinal_profile",
    "prevalence_profile",
    "procedural_rate",
    "rater_count",
    "session_profile",
    "side_design",
    "side_effect",
    "treatment_context",
}

EXPECTED_SOURCE_HASHES = {
    "research/09-experimental/voice-tone-measurement-estimand-and-coverage-specification.md": "46cb3198471bffe0e1159f005d56c83db881a5ca054f502a6d63f227288361d7",
    "research/09-experimental/voice-tone-measurement-primary-research-notes-2026-08-17.md": "f4d8c21a1ffebf7048dbdf441030f487aaf12cedca3a257bcec0d63f63a3d35c",
    "research/09-experimental/voice-tone-human-calibration-instrument.md": "cd72336240fa79afed74ad0892967439f231051c6ca49a6e296d8018c767ca8e",
    "research/09-experimental/voice-tone-graph-and-measurement.md": "b2d9512c904038faf7fb113fa15f98d9a50a4f0e7c713f6e2f53cb3d622b3384",
    "research/09-experimental/product-study-and-judge-agent-system.md": "1f2782f10d180c120798746e267e4b58e40e1b3f6b870d1a98e5d5ec91720946",
    "research/09-experimental/voice-tone-synthetic-calibration-development-bundle.md": "21dd80efb1c2190b75f6367fe4fbcfa7a2dd4ac7762ac1e184074b52c7285f12",
    "research/09-experimental/materials-and-access-register.md": "51121966ef93d68ccc83fbced3a2e8f1bc0254c64c3a01edda97471aa70a6292",
    "research/00-method/research-protocol.md": "ed9ba9bc2714a53cf107043e00eee6433ab453d9425a58842adc50abdf685ac4",
    "research/05-technology/security-privacy-and-trust-boundaries.md": "7841c183b42c0cbb9c921b93644e68e9120b9b8f1fef3e8820257458057c6da6",
}


def approved_roots(protocol_root: Path | None = None, paper_root: Path | None = None) -> ApprovedRoots:
    return ApprovedRoots(
        protocol_root=protocol_root or (PACKAGE_ROOT / "protocol"),
        paper_source_root=paper_root or REPOSITORY_ROOT,
    )


class ProtocolManifestTests(unittest.TestCase):
    def test_root_manifest_and_projection_have_exact_frozen_identity(self) -> None:
        protocol = load_validated_protocol(approved_roots())

        self.assertEqual(protocol.protocol_id, "VT-MSP/design-0.1")
        self.assertEqual(protocol.implementation_candidate_id, "vt-sim/0.1.0-candidate")
        self.assertEqual(set(protocol.factor_order), EXPECTED_FACTOR_KEYS)
        self.assertEqual(len(protocol.factor_order), 26)
        self.assertEqual(len(protocol.targets), 4)
        self.assertEqual(len(protocol.estimands), 11)
        self.assertEqual(len(protocol.arms), 9)
        self.assertEqual(len(protocol.leakage_cases), 64)
        self.assertEqual(
            protocol.expected_counts,
            {
                "duplicate_memberships": 154,
                "estimands": 11,
                "factor_keys": 26,
                "multi_arm_bundles": 133,
                "prededup_rows": 33012,
                "unique_scenarios": 32858,
                "deterministic_leakage_cases": 64,
            },
        )
        self.assertEqual(
            protocol.baseline_scenario_parameter_hash,
            "99174ca8571c01f2decac14e6247398bf5dad82e879a92c4d08fab8883925066",
        )
        self.assertEqual(
            protocol.population_block_hash,
            "ccf7463f2c6c3344ff06421e0e32ceecab30103333eaa82fdd012e8350182e20",
        )
        self.assertEqual(
            protocol.master_seed_hex,
            "0936b9edacae71a576b398b17e36ea1db4d4f0162706559ce5cd3444f0b3e0cc",
        )
        self.assertEqual(protocol.prng_id, "Philox-4x32-10")
        self.assertEqual(len(protocol.stream_names), 15)
        self.assertEqual(
            protocol.prng_conformance_vector["first_output_words_hex"],
            ["62130e4c", "598a535f", "7354a9c3", "84fdecb0"],
        )

    def test_every_projection_file_has_a_valid_own_hash(self) -> None:
        for path in sorted((PACKAGE_ROOT / "protocol").glob("*.json")):
            with self.subTest(path=path.name):
                parsed = load_json_strict(path.read_bytes())
                self.assertIsInstance(parsed, dict)
                self.assertEqual(
                    parsed["record_hash"],
                    content_hash(parsed, omit=frozenset({"record_hash"})),
                )

    def test_source_lock_set_matches_current_paper_manifest(self) -> None:
        protocol = load_validated_protocol(approved_roots())

        self.assertEqual(protocol.source_locks, EXPECTED_SOURCE_HASHES)
        report = verify_source_locks(protocol, approved_roots())
        self.assertEqual(report.verified_count, 9)
        self.assertEqual(report.mismatches, ())

    def test_unknown_manifest_member_is_rejected(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            copied_root = Path(directory) / "protocol"
            shutil.copytree(PACKAGE_ROOT / "protocol", copied_root)
            manifest_path = copied_root / "manifest.vt-msp-design-0.1.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["unexpected"] = True
            manifest["record_hash"] = content_hash(
                manifest, omit=frozenset({"record_hash"})
            )
            manifest_path.write_text(
                json.dumps(manifest, ensure_ascii=False, separators=(",", ":"), sort_keys=True),
                encoding="utf-8",
            )

            with self.assertRaises(ManifestValidationError):
                load_validated_protocol(approved_roots(protocol_root=copied_root))

    def test_source_byte_drift_is_reported_before_use(self) -> None:
        protocol = load_validated_protocol(approved_roots())
        with tempfile.TemporaryDirectory() as directory:
            paper_root = Path(directory)
            for relative_path in EXPECTED_SOURCE_HASHES:
                source = REPOSITORY_ROOT / relative_path
                target = paper_root / relative_path
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(source, target)
            drifted = paper_root / next(iter(EXPECTED_SOURCE_HASHES))
            drifted.write_bytes(drifted.read_bytes() + b"\n")

            report = verify_source_locks(protocol, approved_roots(paper_root=paper_root))

            self.assertEqual(report.verified_count, 8)
            self.assertEqual(len(report.mismatches), 1)
            self.assertEqual(report.mismatches[0].reason, "source_hash_mismatch")

    def test_source_symlink_is_rejected(self) -> None:
        protocol = load_validated_protocol(approved_roots())
        with tempfile.TemporaryDirectory() as directory:
            paper_root = Path(directory)
            paths = list(EXPECTED_SOURCE_HASHES)
            for relative_path in paths:
                source = REPOSITORY_ROOT / relative_path
                target = paper_root / relative_path
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(source, target)
            target = paper_root / paths[0]
            target.unlink()
            target.symlink_to(REPOSITORY_ROOT / paths[0])

            report = verify_source_locks(protocol, approved_roots(paper_root=paper_root))

            self.assertEqual(report.verified_count, 8)
            self.assertEqual(report.mismatches[0].reason, "source_symlink_prohibited")


if __name__ == "__main__":
    unittest.main()
