from __future__ import annotations

import ast
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import tomllib
import unittest


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


def run_cli(*args: str, cwd: Path | None = None) -> subprocess.CompletedProcess[str]:
    environment = os.environ.copy()
    inherited = environment.get("PYTHONPATH", "")
    environment["PYTHONPATH"] = os.pathsep.join(
        part for part in (str(SOURCE_ROOT), inherited) if part
    )
    return subprocess.run(
        [sys.executable, "-m", "vt_simulator.cli", *args],
        cwd=cwd or PACKAGE_ROOT,
        env=environment,
        check=False,
        capture_output=True,
        text=True,
    )


def run_cli_with_input(
    *args: str, input_text: str, cwd: Path | None = None
) -> subprocess.CompletedProcess[str]:
    environment = os.environ.copy()
    inherited = environment.get("PYTHONPATH", "")
    environment["PYTHONPATH"] = os.pathsep.join(
        part for part in (str(SOURCE_ROOT), inherited) if part
    )
    return subprocess.run(
        [sys.executable, "-m", "vt_simulator.cli", *args],
        cwd=cwd or PACKAGE_ROOT,
        env=environment,
        check=False,
        capture_output=True,
        text=True,
        input=input_text,
    )


class VersionCommandTests(unittest.TestCase):
    def test_version_emits_one_exact_json_record(self) -> None:
        result = run_cli("--version")

        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stderr, "")
        self.assertEqual(result.stdout.count("\n"), 1)
        self.assertEqual(
            json.loads(result.stdout),
            {
                "candidate_id": "vt-sim/0.1.0-candidate",
                "execution_boundary": "validation-and-bounded-conformance-only",
                "protocol_id": "VT-MSP/design-0.1",
                "python_version": "3.12.13",
                "record_type": "SimulatorVersionRecord",
                "schema_version": "vt-sim-version/0.1",
            },
        )


class CommandBoundaryTests(unittest.TestCase):
    def test_unknown_command_returns_usage_error(self) -> None:
        result = run_cli("unknown-command")

        self.assertEqual(result.returncode, 2)
        self.assertEqual(result.stdout, "")


class DeterministicVerificationCommandTests(unittest.TestCase):
    def test_validate_protocol_emits_source_verified_record(self) -> None:
        result = run_cli("validate-protocol")

        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stderr, "")
        payload = json.loads(result.stdout)
        self.assertEqual(payload["record_type"], "ProtocolValidationRecord")
        self.assertEqual(payload["status"], "accepted")
        self.assertEqual(payload["source_locks_verified"], 9)
        self.assertEqual(payload["profile_count"], 4)
        self.assertEqual(payload["schema_ref_count"], 14)
        self.assertEqual(payload["leakage_guard_cases_verified"], 64)
        self.assertEqual(payload["leakage_clean_cases_accepted"], 4)
        self.assertEqual(payload["leakage_injected_cases_rejected"], 60)
        self.assertRegex(payload["record_hash"], r"^[0-9a-f]{64}$")

    def test_verify_prng_emits_exact_vector_pass(self) -> None:
        result = run_cli("verify-prng")

        self.assertEqual(result.returncode, 0, result.stderr)
        payload = json.loads(result.stdout)
        self.assertEqual(payload["record_type"], "PrngVerificationRecord")
        self.assertEqual(payload["status"], "pass")
        self.assertEqual(
            payload["first_output_words_hex"],
            ["62130e4c", "598a535f", "7354a9c3", "84fdecb0"],
        )

    def test_verify_grid_emits_primary_and_independent_match(self) -> None:
        result = run_cli("verify-grid")

        self.assertEqual(result.returncode, 0, result.stderr)
        payload = json.loads(result.stdout)
        self.assertEqual(payload["record_type"], "GridVerificationRecord")
        self.assertEqual(payload["status"], "pass")
        self.assertTrue(payload["independent_set_match"])
        self.assertTrue(payload["independent_membership_match"])
        self.assertEqual(payload["prededup_rows"], 33012)
        self.assertEqual(payload["unique_scenarios"], 32858)
        self.assertEqual(payload["duplicate_memberships"], 154)
        self.assertEqual(payload["multi_arm_bundles"], 133)

    def test_full_run_command_is_explicitly_prohibited(self) -> None:
        result = run_cli("run-all")

        self.assertEqual(result.returncode, 7)
        self.assertEqual(result.stdout, "")
        self.assertIn("full-grid execution is not available", result.stderr)

    def test_url_argument_is_rejected_without_creating_files(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            working_directory = Path(directory)
            before = tuple(working_directory.iterdir())

            result = run_cli(
                "conformance",
                "--scenario-id",
                "https://example.com/scenario",
                "--replicates",
                "1",
                cwd=working_directory,
            )

            self.assertEqual(result.returncode, 7)
            self.assertEqual(result.stdout, "")
            self.assertIn("scenario ID is not allowlisted", result.stderr)
            self.assertEqual(tuple(working_directory.iterdir()), before)

    def test_output_path_argument_is_not_exposed(self) -> None:
        result = run_cli("validate-protocol", "--output", "result.json")

        self.assertEqual(result.returncode, 2)
        self.assertEqual(result.stdout, "")

    def test_bounded_conformance_is_stdout_only_and_independently_verifiable(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            working_directory = Path(directory)
            result = run_cli(
                "conformance",
                "--scenario-id",
                "SIM-99174ca8571c01f2deca",
                "--replicates",
                "1",
                cwd=working_directory,
            )

            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(result.stderr, "")
            self.assertEqual(len(result.stdout.splitlines()), 363)
            self.assertEqual(tuple(working_directory.iterdir()), ())

            verified = run_cli_with_input(
                "verify-records",
                "-",
                input_text=result.stdout,
                cwd=working_directory,
            )
            self.assertEqual(verified.returncode, 0, verified.stderr)
            self.assertEqual(verified.stderr, "")
            payload = json.loads(verified.stdout)
            self.assertEqual(payload["record_type"], "RecordStreamVerificationRecord")
            self.assertEqual(payload["status"], "pass")
            self.assertEqual(payload["record_count"], 363)
            self.assertEqual(tuple(working_directory.iterdir()), ())

            environment = os.environ.copy()
            inherited = environment.get("PYTHONPATH", "")
            environment["PYTHONPATH"] = os.pathsep.join(
                part for part in (str(SOURCE_ROOT), inherited) if part
            )
            standalone = subprocess.run(
                [sys.executable, str(PACKAGE_ROOT / "verify_snapshot.py")],
                cwd=working_directory,
                env=environment,
                check=False,
                capture_output=True,
                text=True,
                input=result.stdout,
            )
            self.assertEqual(standalone.returncode, 0, standalone.stderr)
            self.assertEqual(json.loads(standalone.stdout)["status"], "pass")
            self.assertEqual(tuple(working_directory.iterdir()), ())

    def test_conformance_bounds_remain_fail_closed(self) -> None:
        for count in (0, 1001):
            with self.subTest(replicates=count):
                result = run_cli(
                    "conformance",
                    "--scenario-id",
                    "SIM-99174ca8571c01f2deca",
                    "--replicates",
                    str(count),
                )
                self.assertEqual(result.returncode, 7)
                self.assertEqual(result.stdout, "")


class RuntimeImportBoundaryTests(unittest.TestCase):
    def test_runtime_source_has_no_prohibited_import_or_dynamic_execution(self) -> None:
        prohibited_imports = {
            "aiohttp",
            "anthropic",
            "boto3",
            "browser",
            "google",
            "httpx",
            "openai",
            "pickle",
            "playwright",
            "requests",
            "selenium",
            "socket",
            "subprocess",
            "urllib",
            "yaml",
        }
        prohibited_calls = {"eval", "exec", "__import__"}
        violations: list[str] = []

        source_files = sorted((SOURCE_ROOT / "vt_simulator").glob("*.py"))
        self.assertGreater(len(source_files), 0, "runtime source package is missing")

        for source_file in source_files:
            tree = ast.parse(source_file.read_text(encoding="utf-8"), source_file.as_posix())
            for node in ast.walk(tree):
                if isinstance(node, ast.Import):
                    for alias in node.names:
                        root = alias.name.split(".", 1)[0]
                        if root in prohibited_imports:
                            violations.append(f"{source_file.name}: import {alias.name}")
                elif isinstance(node, ast.ImportFrom) and node.module:
                    root = node.module.split(".", 1)[0]
                    if root in prohibited_imports:
                        violations.append(f"{source_file.name}: from {node.module}")
                elif isinstance(node, ast.Call) and isinstance(node.func, ast.Name):
                    if node.func.id in prohibited_calls:
                        violations.append(f"{source_file.name}: call {node.func.id}")

        self.assertEqual(violations, [])

    def test_independent_verifier_does_not_import_primary_scientific_modules(self) -> None:
        prohibited_modules = {
            "analysis",
            "calibration",
            "counterfactual",
            "decisions",
            "dispatch",
            "estimators",
            "grid",
            "intervals",
            "ml",
            "process",
            "records",
            "replicate",
            "report",
            "runner",
            "schedule",
        }
        tree = ast.parse(
            (SOURCE_ROOT / "vt_simulator" / "verify.py").read_text(encoding="utf-8")
        )
        imported: set[str] = set()
        for node in ast.walk(tree):
            if isinstance(node, ast.ImportFrom) and node.module:
                imported.add(node.module.rsplit(".", 1)[-1])
            elif isinstance(node, ast.Import):
                imported.update(alias.name.rsplit(".", 1)[-1] for alias in node.names)
        self.assertEqual(imported & prohibited_modules, set())


class PackageMetadataTests(unittest.TestCase):
    def test_build_backend_is_explicitly_disabled_until_sim_i1(self) -> None:
        metadata = tomllib.loads((PACKAGE_ROOT / "pyproject.toml").read_text(encoding="utf-8"))
        self.assertEqual(metadata["build-system"]["requires"], [])
        self.assertEqual(
            metadata["build-system"]["build-backend"],
            "vt_simulator.build_disabled",
        )
        self.assertEqual(metadata["build-system"]["backend-path"], ["src"])

        from vt_simulator.build_disabled import BuildNotAuthorizedError, build_wheel

        with self.assertRaises(BuildNotAuthorizedError):
            build_wheel("unused")

    def test_build_requirements_pin_the_complete_candidate_dependency_set(self) -> None:
        requirements_path = PACKAGE_ROOT / "requirements-build.txt"
        self.assertTrue(requirements_path.is_file(), "build requirements are missing")
        requirements = requirements_path.read_text(encoding="utf-8")
        required_pins = {
            "annotated-types==0.7.0",
            "numpy==2.3.5",
            "pydantic==2.13.4",
            "pydantic-core==2.46.4",
            "rfc8785==0.1.4",
            "typing-extensions==4.16.0",
            "typing-inspection==0.4.2",
        }

        actual_pins = {
            line.strip().split(" --hash=", 1)[0]
            for line in requirements.splitlines()
            if line.strip() and not line.startswith("#")
        }
        self.assertEqual(actual_pins, required_pins)
        self.assertIn(
            "rfc8785==0.1.4 --hash=sha256:520d690b448ecf0703691c76e1a34a24ddcd4fc5bc41d589cb7c58ec651bcd48",
            requirements,
        )


if __name__ == "__main__":
    unittest.main()
