"""Fail-closed loading for the frozen VT-MSP protocol projection."""

from __future__ import annotations

from dataclasses import dataclass
import hashlib
from itertools import product
from pathlib import Path, PurePosixPath
import re
from typing import Any

from .canonical import CanonicalizationError, content_hash, load_json_strict, verify_record_hash
from .errors import ValidationError


class ManifestValidationError(ValidationError):
    """The manifest, a referenced profile, or a paper source is invalid."""


@dataclass(frozen=True)
class ApprovedRoots:
    """The two explicit read roots accepted by this candidate."""

    protocol_root: Path
    paper_source_root: Path


@dataclass(frozen=True)
class SourceLockMismatch:
    path: str
    reason: str
    expected_sha256: str
    observed_sha256: str | None


@dataclass(frozen=True)
class SourceLockReport:
    verified_count: int
    mismatches: tuple[SourceLockMismatch, ...]


@dataclass(frozen=True)
class ValidatedProtocol:
    protocol_id: str
    implementation_candidate_id: str
    manifest_hash: str
    source_locks: dict[str, str]
    factor_order: tuple[str, ...]
    factors: dict[str, object]
    baseline: dict[str, object]
    targets: tuple[dict[str, object], ...]
    arms: tuple[dict[str, object], ...]
    estimands: tuple[str, ...]
    method_ids: tuple[str, ...]
    interval_ids: tuple[str, ...]
    status_unions: dict[str, object]
    reason_codes: dict[str, object]
    leakage_cases: tuple[dict[str, str], ...]
    expected_counts: dict[str, int]
    baseline_scenario_parameter_hash: str
    population_block_hash: str
    master_seed_hex: str
    prng_id: str
    stream_names: tuple[str, ...]
    prng_conformance_vector: dict[str, object]
    schema_refs: tuple[str, ...]
    negative_control_refs: tuple[str, ...]
    runtime_constraints: dict[str, object]
    interpretation_boundary: dict[str, object]


_SHA256 = re.compile(r"^[0-9a-f]{64}$")
_ROOT_MANIFEST = "manifest.vt-msp-design-0.1.json"
_ROOT_KEYS = {
    "schema_version",
    "protocol_id",
    "implementation_candidate_id",
    "source_locks",
    "profile_refs",
    "schema_refs",
    "negative_control_refs",
    "expected_counts",
    "runtime_constraints",
    "interpretation_boundary",
    "record_hash",
}
_PROFILE_KEYS = {"factors", "leakage", "methods", "statuses"}
_FACTOR_PROFILE_KEYS = {
    "schema_version",
    "profile_id",
    "factor_order",
    "factors",
    "baseline",
    "targets",
    "arms",
    "baseline_scenario_parameter_hash",
    "baseline_scenario_id",
    "population_block_preimage",
    "population_block_hash",
    "master_seed_hex",
    "prng_id",
    "stream_names",
    "prng_conformance_vector",
    "source_clause",
    "record_hash",
}
_METHOD_PROFILE_KEYS = {
    "schema_version",
    "profile_id",
    "method_ids",
    "interval_ids",
    "solver_profile",
    "intercept_bisection",
    "bootstrap",
    "estimand_ids",
    "source_clause",
    "record_hash",
}
_STATUS_PROFILE_KEYS = {
    "schema_version",
    "profile_id",
    "status_unions",
    "reason_codes",
    "source_clause",
    "record_hash",
}
_LEAKAGE_PROFILE_KEYS = {
    "schema_version",
    "profile_id",
    "axes",
    "sort_order",
    "expected_case_count",
    "eligible_count_by_coverage",
    "clean_case_expected_status",
    "injected_case_expected_status",
    "source_clause",
    "record_hash",
}
_EXPECTED_COUNTS = {
    "duplicate_memberships": 154,
    "estimands": 11,
    "factor_keys": 26,
    "multi_arm_bundles": 133,
    "prededup_rows": 33012,
    "unique_scenarios": 32858,
    "deterministic_leakage_cases": 64,
}


def _require_mapping(value: object, label: str) -> dict[str, Any]:
    if not isinstance(value, dict):
        raise ManifestValidationError(f"{label} must be a JSON object")
    return value


def _require_list(value: object, label: str) -> list[Any]:
    if not isinstance(value, list):
        raise ManifestValidationError(f"{label} must be a JSON array")
    return value


def _require_exact_keys(value: dict[str, Any], expected: set[str], label: str) -> None:
    actual = set(value)
    if actual != expected:
        missing = sorted(expected - actual)
        extra = sorted(actual - expected)
        raise ManifestValidationError(
            f"{label} has a closed shape; missing={missing!r}, extra={extra!r}"
        )


def _require_string(value: object, label: str) -> str:
    if not isinstance(value, str) or not value:
        raise ManifestValidationError(f"{label} must be a non-empty string")
    return value


def _require_sha256(value: object, label: str) -> str:
    digest = _require_string(value, label)
    if not _SHA256.fullmatch(digest):
        raise ManifestValidationError(f"{label} must be lowercase SHA-256")
    return digest


def _safe_relative_path(value: object, label: str) -> PurePosixPath:
    raw = _require_string(value, label)
    path = PurePosixPath(raw)
    if path.is_absolute() or not path.parts or ".." in path.parts or "." in path.parts:
        raise ManifestValidationError(f"{label} must be a normalized relative POSIX path")
    if str(path) != raw:
        raise ManifestValidationError(f"{label} must use canonical POSIX spelling")
    return path


def _has_symlink_component(root: Path, relative: PurePosixPath) -> bool:
    current = root
    if current.is_symlink():
        return True
    for part in relative.parts:
        current = current / part
        if current.is_symlink():
            return True
    return False


def _approved_path(root: Path, relative: PurePosixPath, label: str) -> Path:
    root_resolved = root.resolve(strict=True)
    if _has_symlink_component(root, relative):
        raise ManifestValidationError(f"{label} contains a prohibited symlink")
    candidate = root / Path(*relative.parts)
    try:
        resolved = candidate.resolve(strict=True)
    except (FileNotFoundError, NotADirectoryError) as error:
        raise ManifestValidationError(f"{label} is missing") from error
    if not resolved.is_relative_to(root_resolved):
        raise ManifestValidationError(f"{label} escapes its approved root")
    if not resolved.is_file():
        raise ManifestValidationError(f"{label} must be a regular file")
    return resolved


def _read_record(path: Path, label: str) -> dict[str, Any]:
    if path.is_symlink():
        raise ManifestValidationError(f"{label} is a prohibited symlink")
    try:
        parsed = load_json_strict(path.read_bytes())
        record = _require_mapping(parsed, label)
        verify_record_hash(record)
    except (OSError, CanonicalizationError) as error:
        raise ManifestValidationError(f"{label}: {error}") from error
    return record


def _parse_source_locks(value: object) -> dict[str, str]:
    locks: dict[str, str] = {}
    for index, item in enumerate(_require_list(value, "source_locks")):
        record = _require_mapping(item, f"source_locks[{index}]")
        _require_exact_keys(record, {"path", "sha256"}, f"source_locks[{index}]")
        path = str(_safe_relative_path(record["path"], f"source_locks[{index}].path"))
        if path in locks:
            raise ManifestValidationError(f"duplicate source lock path: {path}")
        locks[path] = _require_sha256(record["sha256"], f"source_locks[{index}].sha256")
    if len(locks) != 9:
        raise ManifestValidationError("source_locks must contain exactly nine records")
    if list(locks) != sorted(locks):
        raise ManifestValidationError("source_locks must be sorted by path")
    return locks


def _verify_source_lock_mapping(
    locks: dict[str, str], roots: ApprovedRoots
) -> SourceLockReport:
    verified = 0
    mismatches: list[SourceLockMismatch] = []
    for raw_path, expected in locks.items():
        relative = _safe_relative_path(raw_path, f"source lock {raw_path}")
        try:
            if _has_symlink_component(roots.paper_source_root, relative):
                raise ManifestValidationError("source_symlink_prohibited")
            source = _approved_path(
                roots.paper_source_root, relative, f"source lock {raw_path}"
            )
            observed = hashlib.sha256(source.read_bytes()).hexdigest()
        except ManifestValidationError as error:
            reason = (
                "source_symlink_prohibited"
                if "symlink" in str(error)
                else "source_missing_or_outside_root"
            )
            mismatches.append(SourceLockMismatch(raw_path, reason, expected, None))
            continue
        except OSError:
            mismatches.append(
                SourceLockMismatch(raw_path, "source_read_failed", expected, None)
            )
            continue
        if observed != expected:
            mismatches.append(
                SourceLockMismatch(raw_path, "source_hash_mismatch", expected, observed)
            )
        else:
            verified += 1
    return SourceLockReport(verified, tuple(mismatches))


def _load_profiles(
    manifest: dict[str, Any], roots: ApprovedRoots
) -> dict[str, dict[str, Any]]:
    refs = _require_mapping(manifest["profile_refs"], "profile_refs")
    _require_exact_keys(refs, _PROFILE_KEYS, "profile_refs")
    profiles: dict[str, dict[str, Any]] = {}
    for profile_id in sorted(refs):
        ref = _require_mapping(refs[profile_id], f"profile_refs.{profile_id}")
        _require_exact_keys(ref, {"path", "record_hash"}, f"profile_refs.{profile_id}")
        relative = _safe_relative_path(ref["path"], f"profile_refs.{profile_id}.path")
        if len(relative.parts) != 1:
            raise ManifestValidationError("profile files must be direct protocol-root children")
        expected_hash = _require_sha256(
            ref["record_hash"], f"profile_refs.{profile_id}.record_hash"
        )
        path = _approved_path(
            roots.protocol_root, relative, f"profile_refs.{profile_id}.path"
        )
        profile = _read_record(path, f"profile {profile_id}")
        if profile["record_hash"] != expected_hash:
            raise ManifestValidationError(f"profile {profile_id} digest does not match manifest")
        profiles[profile_id] = profile
    return profiles


def _unique_ids(records: list[Any], key: str, label: str) -> None:
    values: list[str] = []
    for index, item in enumerate(records):
        record = _require_mapping(item, f"{label}[{index}]")
        values.append(_require_string(record.get(key), f"{label}[{index}].{key}"))
    if len(values) != len(set(values)):
        raise ManifestValidationError(f"{label} contains duplicate {key} values")


def _expand_leakage_cases(profile: dict[str, Any]) -> tuple[dict[str, str], ...]:
    axes = _require_mapping(profile["axes"], "leakage.axes")
    order = tuple(_require_list(profile["sort_order"], "leakage.sort_order"))
    if set(order) != set(axes) or len(order) != len(axes):
        raise ManifestValidationError("leakage sort_order must name every axis exactly once")
    levels: list[list[str]] = []
    for axis in order:
        if not isinstance(axis, str):
            raise ManifestValidationError("leakage sort_order values must be strings")
        axis_levels = _require_list(axes[axis], f"leakage.axes.{axis}")
        if not axis_levels or any(not isinstance(item, str) for item in axis_levels):
            raise ManifestValidationError(f"leakage.axes.{axis} must contain strings")
        if len(axis_levels) != len(set(axis_levels)):
            raise ManifestValidationError(f"leakage.axes.{axis} contains duplicates")
        levels.append(axis_levels)
    cases = tuple(dict(zip(order, values, strict=True)) for values in product(*levels))
    expected = profile["expected_case_count"]
    if isinstance(expected, bool) or not isinstance(expected, int) or expected != len(cases):
        raise ManifestValidationError("leakage expected_case_count does not match expansion")
    return cases


def load_validated_protocol(roots: ApprovedRoots) -> ValidatedProtocol:
    """Load a source-verified, closed protocol projection from approved roots."""

    try:
        manifest_path = _approved_path(
            roots.protocol_root, PurePosixPath(_ROOT_MANIFEST), "root manifest"
        )
    except (OSError, ManifestValidationError) as error:
        if isinstance(error, ManifestValidationError):
            raise
        raise ManifestValidationError(str(error)) from error
    manifest = _read_record(manifest_path, "root manifest")
    _require_exact_keys(manifest, _ROOT_KEYS, "root manifest")
    if manifest["schema_version"] != "vt-sim-protocol-manifest/0.1":
        raise ManifestValidationError("unsupported root manifest schema_version")
    if manifest["protocol_id"] != "VT-MSP/design-0.1":
        raise ManifestValidationError("unexpected protocol_id")
    if manifest["implementation_candidate_id"] != "vt-sim/0.1.0-candidate":
        raise ManifestValidationError("unexpected implementation_candidate_id")

    source_locks = _parse_source_locks(manifest["source_locks"])
    source_report = _verify_source_lock_mapping(source_locks, roots)
    if source_report.mismatches:
        first = source_report.mismatches[0]
        raise ManifestValidationError(f"{first.path}: {first.reason}")

    profiles = _load_profiles(manifest, roots)
    factors = profiles["factors"]
    methods = profiles["methods"]
    statuses = profiles["statuses"]
    leakage = profiles["leakage"]
    _require_exact_keys(factors, _FACTOR_PROFILE_KEYS, "factor profile")
    _require_exact_keys(methods, _METHOD_PROFILE_KEYS, "method profile")
    _require_exact_keys(statuses, _STATUS_PROFILE_KEYS, "status profile")
    _require_exact_keys(leakage, _LEAKAGE_PROFILE_KEYS, "leakage profile")

    factor_order_list = _require_list(factors["factor_order"], "factor_order")
    factor_order = tuple(_require_string(item, "factor_order member") for item in factor_order_list)
    if len(factor_order) != 26 or len(set(factor_order)) != 26:
        raise ManifestValidationError("factor_order must contain 26 unique IDs")
    factor_definitions = _require_mapping(factors["factors"], "factors")
    baseline = _require_mapping(factors["baseline"], "baseline")
    if set(factor_order) != set(factor_definitions) or set(factor_order) != set(baseline):
        raise ManifestValidationError("factor definitions and baseline must exactly match factor_order")

    targets = _require_list(factors["targets"], "targets")
    arms = _require_list(factors["arms"], "arms")
    _unique_ids(targets, "target_id", "targets")
    _unique_ids(arms, "arm_id", "arms")
    if len(targets) != 4 or len(arms) != 9:
        raise ManifestValidationError("projection must contain four targets and nine arms")

    estimands_list = _require_list(methods["estimand_ids"], "estimand_ids")
    methods_list = _require_list(methods["method_ids"], "method_ids")
    intervals_list = _require_list(methods["interval_ids"], "interval_ids")
    for label, values in (
        ("estimand_ids", estimands_list),
        ("method_ids", methods_list),
        ("interval_ids", intervals_list),
    ):
        if any(not isinstance(item, str) or not item for item in values):
            raise ManifestValidationError(f"{label} must contain non-empty strings")
        if len(values) != len(set(values)):
            raise ManifestValidationError(f"{label} contains duplicates")
    if len(estimands_list) != 11:
        raise ManifestValidationError("projection must contain 11 estimands")

    counts = _require_mapping(manifest["expected_counts"], "expected_counts")
    if counts != _EXPECTED_COUNTS:
        raise ManifestValidationError("expected_counts does not match the frozen protocol")
    arm_count = sum(
        item["prededup_count"]
        for item in arms
        if isinstance(item.get("prededup_count"), int)
        and not isinstance(item.get("prededup_count"), bool)
    )
    if arm_count != counts["prededup_rows"]:
        raise ManifestValidationError("arm prededup counts do not match expected_counts")

    leakage_cases = _expand_leakage_cases(leakage)
    if len(leakage_cases) != counts["deterministic_leakage_cases"]:
        raise ManifestValidationError("leakage case count does not match expected_counts")

    schema_refs_raw = _require_list(manifest["schema_refs"], "schema_refs")
    schema_refs = tuple(
        str(_safe_relative_path(value, "schema_refs member")) for value in schema_refs_raw
    )
    if len(schema_refs) != 14 or len(set(schema_refs)) != 14 or list(schema_refs) != sorted(schema_refs):
        raise ManifestValidationError("schema_refs must contain 14 sorted unique paths")

    controls_raw = _require_list(manifest["negative_control_refs"], "negative_control_refs")
    controls = tuple(_require_string(value, "negative_control_refs member") for value in controls_raw)
    if len(controls) != len(set(controls)) or list(controls) != sorted(controls):
        raise ManifestValidationError("negative_control_refs must be sorted and unique")

    runtime_constraints = _require_mapping(
        manifest["runtime_constraints"], "runtime_constraints"
    )
    interpretation_boundary = _require_mapping(
        manifest["interpretation_boundary"], "interpretation_boundary"
    )
    if any(
        runtime_constraints.get(key) is not False
        for key in (
            "arbitrary_paths",
            "browser",
            "external_models",
            "full_grid_execution",
            "network",
            "persistent_result_store",
            "subprocess",
        )
    ) or runtime_constraints.get("output") != "stdout_canonical_jsonl_only":
        raise ManifestValidationError("runtime constraints widen the offline candidate")
    if interpretation_boundary != {
        "approval_authority": "none",
        "current_execution_scope": "candidate_conformance_only",
        "may_claim_construct_validity": False,
        "may_claim_pilot_readiness": False,
        "may_claim_product_effectiveness": False,
        "phase_advancement": "none",
    }:
        raise ManifestValidationError("interpretation boundary does not match the candidate")

    baseline_hash = _require_sha256(
        factors["baseline_scenario_parameter_hash"],
        "baseline_scenario_parameter_hash",
    )
    if factors["baseline_scenario_id"] != f"SIM-{baseline_hash[:20]}":
        raise ManifestValidationError("baseline scenario ID does not match its full hash")
    population_preimage = _require_mapping(
        factors["population_block_preimage"], "population_block_preimage"
    )
    population_hash = _require_sha256(
        factors["population_block_hash"], "population_block_hash"
    )
    if content_hash(population_preimage) != population_hash:
        raise ManifestValidationError("population block hash does not match its preimage")
    master_seed = _require_sha256(factors["master_seed_hex"], "master_seed_hex")
    prng_id = _require_string(factors["prng_id"], "prng_id")
    if prng_id != "Philox-4x32-10":
        raise ManifestValidationError("unexpected PRNG ID")
    stream_names_raw = _require_list(factors["stream_names"], "stream_names")
    stream_names = tuple(_require_string(item, "stream_names member") for item in stream_names_raw)
    if len(stream_names) != 15 or len(set(stream_names)) != 15:
        raise ManifestValidationError("stream_names must contain the 15 unique declared streams")
    prng_vector = _require_mapping(
        factors["prng_conformance_vector"], "prng_conformance_vector"
    )

    return ValidatedProtocol(
        protocol_id=manifest["protocol_id"],
        implementation_candidate_id=manifest["implementation_candidate_id"],
        manifest_hash=manifest["record_hash"],
        source_locks=source_locks,
        factor_order=factor_order,
        factors=factor_definitions,
        baseline=baseline,
        targets=tuple(targets),
        arms=tuple(arms),
        estimands=tuple(estimands_list),
        method_ids=tuple(methods_list),
        interval_ids=tuple(intervals_list),
        status_unions=_require_mapping(statuses["status_unions"], "status_unions"),
        reason_codes=_require_mapping(statuses["reason_codes"], "reason_codes"),
        leakage_cases=leakage_cases,
        expected_counts={key: int(value) for key, value in counts.items()},
        baseline_scenario_parameter_hash=baseline_hash,
        population_block_hash=population_hash,
        master_seed_hex=master_seed,
        prng_id=prng_id,
        stream_names=stream_names,
        prng_conformance_vector=prng_vector,
        schema_refs=schema_refs,
        negative_control_refs=controls,
        runtime_constraints=runtime_constraints,
        interpretation_boundary=interpretation_boundary,
    )


def verify_source_locks(
    protocol: ValidatedProtocol, roots: ApprovedRoots
) -> SourceLockReport:
    """Re-read and compare all nine approved paper sources without parsing them."""

    return _verify_source_lock_mapping(protocol.source_locks, roots)
