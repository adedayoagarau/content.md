"""Closed command surface for the bounded offline simulator candidate."""

from __future__ import annotations

import argparse
from pathlib import Path
import platform
import sys
from collections.abc import Sequence

from . import CANDIDATE_ID, EXECUTION_BOUNDARY, PROTOCOL_ID
from .errors import ProhibitedCapabilityError, SimulatorError, ValidationError


BASELINE_SCENARIO_ID = "SIM-99174ca8571c01f2deca"


class QuietArgumentParser(argparse.ArgumentParser):
    """Argument parser whose failures remain ordinary return codes."""

    def error(self, message: str) -> None:
        raise ValueError(message)


def version_record() -> dict[str, object]:
    """Return the immutable candidate version boundary."""

    return {
        "candidate_id": CANDIDATE_ID,
        "execution_boundary": EXECUTION_BOUNDARY,
        "protocol_id": PROTOCOL_ID,
        "python_version": platform.python_version(),
        "record_type": "SimulatorVersionRecord",
        "schema_version": "vt-sim-version/0.1",
    }


def _emit(record: dict[str, object]) -> None:
    from .canonical import canonical_bytes

    sys.stdout.buffer.write(canonical_bytes(record))
    sys.stdout.buffer.write(b"\n")


def _package_roots() -> tuple[Path, Path]:
    package_root = Path(__file__).resolve().parents[2]
    repository_root = package_root.parents[1]
    return package_root, repository_root


def _load_protocol():
    from .manifest import ApprovedRoots, load_validated_protocol

    package_root, repository_root = _package_roots()
    roots = ApprovedRoots(
        protocol_root=package_root / "protocol",
        paper_source_root=repository_root,
    )
    return load_validated_protocol(roots), roots


def _hashed_record(fields: dict[str, object]) -> dict[str, object]:
    from .canonical import content_hash

    record = {**fields, "record_hash": "0" * 64}
    record["record_hash"] = content_hash(record, omit=frozenset({"record_hash"}))
    return record


def _validate_protocol_command() -> dict[str, object]:
    from .leakage import evaluate_leakage_case, expand_leakage_matrix
    from .manifest import verify_source_locks

    protocol, roots = _load_protocol()
    report = verify_source_locks(protocol, roots)
    if report.mismatches or report.verified_count != 9:
        raise ValidationError("paper source lock verification failed")
    leakage_results = tuple(
        evaluate_leakage_case(case) for case in expand_leakage_matrix(protocol)
    )
    clean_accepted = sum(
        result.input_guard_status == "accepted" and not result.reason_codes
        for result in leakage_results
    )
    injected_rejected = sum(
        result.input_guard_status == "rejected_input"
        and bool(result.reason_codes)
        and not result.unexpected_acceptance
        for result in leakage_results
    )
    if clean_accepted != 4 or injected_rejected != 60:
        raise ValidationError("leakage negative-control verification failed")
    return _hashed_record(
        {
            "schema_version": "vt-sim-protocol-validation/0.1",
            "record_type": "ProtocolValidationRecord",
            "candidate_id": protocol.implementation_candidate_id,
            "protocol_id": protocol.protocol_id,
            "protocol_manifest_hash": protocol.manifest_hash,
            "source_locks_verified": report.verified_count,
            "profile_count": 4,
            "schema_ref_count": len(protocol.schema_refs),
            "factor_count": len(protocol.factor_order),
            "target_count": len(protocol.targets),
            "estimand_count": len(protocol.estimands),
            "leakage_case_count": len(protocol.leakage_cases),
            "leakage_guard_cases_verified": len(leakage_results),
            "leakage_clean_cases_accepted": clean_accepted,
            "leakage_injected_cases_rejected": injected_rejected,
            "status": "accepted",
            "authority": "none",
        }
    )


def _verify_prng_command() -> dict[str, object]:
    from .streams import StreamCoordinates, derive_stream

    protocol, _ = _load_protocol()
    vector = protocol.prng_conformance_vector
    try:
        key = tuple(int(word, 16) for word in vector["key_words_hex"])
        counter = tuple(int(word, 16) for word in vector["counter_words_hex"])
        expected_output = tuple(
            int(word, 16) for word in vector["first_output_words_hex"]
        )
        coordinates = StreamCoordinates(
            protocol_id=protocol.protocol_id,
            master_seed_hex=protocol.master_seed_hex,
            scenario_parameter_hash=str(vector["scenario_parameter_hash"]),
            population_block_hash=protocol.population_block_hash,
            replicate_index=str(vector["replicate_index"]),
            stream_name=str(vector["stream_name"]),
            target_id="T-FIXED-FIXED",
            expected_purposes=(),
        )
    except (KeyError, TypeError, ValueError) as error:
        raise ValidationError("PRNG conformance vector is malformed") from error
    stream = derive_stream(coordinates)
    output = stream.next_block()
    checks = (
        stream.coordinate_digest_hex == vector["digest_hex"],
        stream.key == key,
        stream.initial_counter == counter,
        output == expected_output,
        stream.stream_fingerprint == vector["stream_fingerprint"],
    )
    if not all(checks):
        raise ValidationError("PRNG conformance vector mismatch")
    return _hashed_record(
        {
            "schema_version": "vt-sim-prng-verification/0.1",
            "record_type": "PrngVerificationRecord",
            "candidate_id": protocol.implementation_candidate_id,
            "protocol_manifest_hash": protocol.manifest_hash,
            "prng_id": protocol.prng_id,
            "coordinate_digest_hex": stream.coordinate_digest_hex,
            "key_words_hex": [f"{word:08x}" for word in stream.key],
            "counter_words_hex": [f"{word:08x}" for word in stream.initial_counter],
            "first_output_words_hex": [f"{word:08x}" for word in output],
            "stream_fingerprint": stream.stream_fingerprint,
            "status": "pass",
            "authority": "none",
        }
    )


def _verify_grid_command() -> dict[str, object]:
    from .grid import deduplicate_scenarios, expand_prededup_rows
    from .grid_oracle import verify_grid_independently

    protocol, roots = _load_protocol()
    primary = deduplicate_scenarios(tuple(expand_prededup_rows(protocol)))
    independent = verify_grid_independently(roots.protocol_root)
    primary_hashes = tuple(sorted(primary.scenarios_by_hash))
    primary_memberships = tuple(
        (digest, primary.scenarios_by_hash[digest].arm_memberships)
        for digest in primary_hashes
    )
    set_match = independent.scenario_hashes == primary_hashes
    membership_match = independent.memberships_by_hash == primary_memberships
    expected = protocol.expected_counts
    count_match = (
        primary.prededup_count == expected["prededup_rows"]
        and primary.unique_count == expected["unique_scenarios"]
        and primary.duplicate_membership_count == expected["duplicate_memberships"]
        and primary.multi_arm_bundle_count == expected["multi_arm_bundles"]
        and not primary.short_id_collisions
        and independent.prededup_count == primary.prededup_count
        and independent.unique_count == primary.unique_count
    )
    if not (count_match and set_match and membership_match):
        raise ValidationError("primary and independent grid verification did not match")
    summary = primary.summary_record()
    return _hashed_record(
        {
            "schema_version": "vt-sim-grid-verification/0.1",
            "record_type": "GridVerificationRecord",
            "candidate_id": protocol.implementation_candidate_id,
            "protocol_manifest_hash": protocol.manifest_hash,
            "prededup_rows": primary.prededup_count,
            "unique_scenarios": primary.unique_count,
            "duplicate_memberships": primary.duplicate_membership_count,
            "multi_arm_bundles": primary.multi_arm_bundle_count,
            "short_id_collision_count": len(primary.short_id_collisions),
            "scenario_hash_set_hash": summary["scenario_hash_set_hash"],
            "membership_map_hash": summary["membership_map_hash"],
            "independent_set_match": set_match,
            "independent_membership_match": membership_match,
            "status": "pass",
            "authority": "none",
        }
    )


def _parser() -> QuietArgumentParser:
    parser = QuietArgumentParser(prog="vt-sim", add_help=True)
    parser.add_argument("--version", action="store_true")
    subparsers = parser.add_subparsers(dest="command")
    subparsers.add_parser("validate-protocol")
    subparsers.add_parser("verify-prng")
    subparsers.add_parser("verify-grid")

    conformance = subparsers.add_parser("conformance")
    conformance.add_argument("--scenario-id", required=True)
    conformance.add_argument("--replicates", required=True, type=int)

    verify_records = subparsers.add_parser("verify-records")
    verify_records.add_argument("source", choices=["-"])
    return parser


def _dispatch(namespace: argparse.Namespace) -> int:
    if namespace.version and namespace.command is None:
        _emit(version_record())
        return 0
    if namespace.version or namespace.command is None:
        raise ValueError("exactly one command is required")

    if namespace.command == "conformance":
        if namespace.scenario_id != BASELINE_SCENARIO_ID:
            raise ProhibitedCapabilityError("scenario ID is not allowlisted")
        if not 1 <= namespace.replicates <= 1000:
            raise ProhibitedCapabilityError("replicate count must be between 1 and 1000")
        from .manifest import verify_source_locks
        from .report import render_jsonl
        from .runner import ConformanceEnvelope, RunnerValidationError, run_conformance

        protocol, roots = _load_protocol()
        source_report = verify_source_locks(protocol, roots)
        if source_report.mismatches or source_report.verified_count != 9:
            raise ValidationError("paper source lock verification failed")
        package_root, _ = _package_roots()
        envelope = ConformanceEnvelope(
            package_root=package_root,
            protocol=protocol,
            scenario_id=namespace.scenario_id,
            replicates=namespace.replicates,
        )
        try:
            # Complete a deterministic dry pass before emitting any scientific
            # record, then stream the identical second pass without retaining a
            # persistent or in-memory result store.
            for _ in run_conformance(envelope):
                pass
        except RunnerValidationError as error:
            raise ValidationError(str(error)) from error
        render_jsonl(run_conformance(envelope), sys.stdout.buffer)
        return 0

    if namespace.command == "validate-protocol":
        _emit(_validate_protocol_command())
        return 0
    if namespace.command == "verify-prng":
        _emit(_verify_prng_command())
        return 0
    if namespace.command == "verify-grid":
        _emit(_verify_grid_command())
        return 0
    if namespace.command == "verify-records":
        from .verify import VerificationError, verify_stream

        protocol, _ = _load_protocol()
        package_root, _ = _package_roots()
        try:
            record = verify_stream(sys.stdin.buffer, protocol, package_root)
        except VerificationError as error:
            raise ValidationError(str(error)) from error
        _emit(record)
        return 0

    raise ValidationError(f"{namespace.command} is not implemented")


def main(argv: Sequence[str] | None = None) -> int:
    """Run the closed candidate CLI and return its stable exit code."""

    arguments = list(sys.argv[1:] if argv is None else argv)
    if arguments and arguments[0] in {"run", "run-all", "full-run"}:
        sys.stderr.write("full-grid execution is not available in vt-sim/0.1.0-candidate\n")
        return 7

    try:
        namespace = _parser().parse_args(arguments)
        return _dispatch(namespace)
    except ValueError as error:
        sys.stderr.write(f"usage error: {error}\n")
        return 2
    except SimulatorError as error:
        sys.stderr.write(f"{error}\n")
        return error.exit_code
    except Exception:
        sys.stderr.write("internal invariant failure\n")
        return 70


if __name__ == "__main__":
    raise SystemExit(main())
