"""Independent verifier for the bounded canonical conformance record stream.

This module deliberately does not import the primary grid, schedule, process,
generator, estimator, interval, decision, report, runner, or Pydantic record
implementations.
"""

from __future__ import annotations

from collections import Counter
import hashlib
from pathlib import Path
import re
from typing import BinaryIO

from .canonical import (
    CanonicalizationError,
    canonical_bytes,
    content_hash,
    load_json_strict,
    verify_record_hash,
)
from .grid_oracle import verify_grid_independently
from .manifest import ApprovedRoots, ValidatedProtocol, verify_source_locks


_MAX_LINE_BYTES = 2_000_000
_MAX_RECORDS = 400_000
_SHA256 = re.compile(r"^[0-9a-f]{64}$")
_REPLICATE_ID = re.compile(r"^REPL-([0-9]{6})-([0-9a-f]{64})$")
_BASELINE_HASH = "99174ca8571c01f2decac14e6247398bf5dad82e879a92c4d08fab8883925066"
_BASELINE_ID = "SIM-99174ca8571c01f2deca"
_BASELINE_REPLICATE_HASH = "2bb33e013546f7043e3616b8b48540b4856d4cb9ea5b9587a2807772876db57a"


class VerificationError(ValueError):
    """A bounded record stream fails independent verification."""


class _RecordReader:
    """Strict one-pass reader with backward-only reference closure."""

    def __init__(
        self,
        source: BinaryIO,
        shapes: dict[str, tuple[str, set[str]]],
        expected_hashes: dict[str, str],
    ) -> None:
        self._source = source
        self._shapes = shapes
        self._expected_hashes = expected_hashes
        self._digest = hashlib.sha256()
        self._known_hashes: set[str] = set()
        self._stream_id: str | None = None
        self.record_count = 0

    @property
    def stream_id(self) -> str:
        if self._stream_id is None:
            raise VerificationError("record stream has no stream_id")
        return self._stream_id

    @property
    def raw_sha256(self) -> str:
        return self._digest.hexdigest()

    def next(self) -> dict[str, object] | None:
        raw = self._source.readline(_MAX_LINE_BYTES + 1)
        if not raw:
            return None
        self._digest.update(raw)
        if len(raw) > _MAX_LINE_BYTES:
            raise VerificationError("record line exceeds the bounded byte limit")
        if not raw.endswith(b"\n"):
            raise VerificationError("record stream must end every record with LF")
        line = raw[:-1]
        if not line:
            raise VerificationError("blank record lines are prohibited")
        try:
            parsed = load_json_strict(line)
        except CanonicalizationError as error:
            raise VerificationError(f"invalid strict JSON record: {error}") from error
        if not isinstance(parsed, dict):
            raise VerificationError("every record line must be a JSON object")
        if canonical_bytes(parsed) != line:
            raise VerificationError("record line is not RFC 8785 canonical JSON")
        record_type = parsed.get("record_type")
        if not isinstance(record_type, str) or record_type not in self._shapes:
            raise VerificationError("record type is absent or unknown")
        schema_version, keys = self._shapes[record_type]
        if set(parsed) != keys:
            raise VerificationError(f"{record_type} does not match its closed schema keys")
        if parsed.get("schema_version") != schema_version:
            raise VerificationError(f"{record_type} schema version mismatch")
        try:
            verify_record_hash(parsed)
        except CanonicalizationError as error:
            raise VerificationError(f"record hash verification failed: {error}") from error
        if parsed.get("record_ordinal") != self.record_count:
            raise VerificationError("record ordinals must be one contiguous zero-based sequence")
        candidate_stream = parsed.get("stream_id")
        if not isinstance(candidate_stream, str) or not candidate_stream:
            raise VerificationError("record stream_id must be a non-empty string")
        if self._stream_id is None:
            self._stream_id = candidate_stream
        elif candidate_stream != self._stream_id:
            raise VerificationError("record stream must use one stream_id")
        for key, expected in self._expected_hashes.items():
            if parsed.get(key) != expected:
                raise VerificationError(f"{key} does not match the current candidate")
        if parsed.get("record_hash_algorithm") != "sha256":
            raise VerificationError("record hash algorithm must be sha256")
        refs = _require_hash_list(parsed.get("input_refs"), "input_refs")
        if refs != sorted(set(refs)):
            raise VerificationError("input_refs must be a sorted unique array")
        if set(refs) - self._known_hashes:
            raise VerificationError("record stream contains an unresolved or forward input reference")
        record_hash = parsed.get("record_hash")
        if not isinstance(record_hash, str) or record_hash in self._known_hashes:
            raise VerificationError("record stream contains a duplicate record hash")
        self._known_hashes.add(record_hash)
        self.record_count += 1
        if self.record_count > _MAX_RECORDS:
            raise VerificationError("record stream exceeds the bounded record limit")
        return parsed


def _file_set_hash(package_root: Path, paths: tuple[Path, ...]) -> str:
    rows: list[dict[str, str]] = []
    root = package_root.resolve(strict=True)
    for path in sorted(paths, key=lambda item: item.relative_to(package_root).as_posix()):
        resolved = path.resolve(strict=True)
        if path.is_symlink() or not resolved.is_relative_to(root):
            raise VerificationError("implementation source path escaped its root")
        rows.append(
            {
                "path": path.relative_to(package_root).as_posix(),
                "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
            }
        )
    return content_hash({"files": rows})


def _expected_hashes(
    protocol: ValidatedProtocol, package_root: Path
) -> dict[str, str]:
    sources = tuple((package_root / "src" / "vt_simulator").glob("*.py"))
    return {
        "protocol_hash": protocol.manifest_hash,
        "implementation_hash": _file_set_hash(
            package_root, (*sources, package_root / "verify_snapshot.py")
        ),
        "runtime_manifest_hash": _file_set_hash(
            package_root,
            (package_root / "pyproject.toml", package_root / "requirements-build.txt"),
        ),
        "source_manifest_hash": content_hash(
            {
                "source_locks": [
                    {"path": path, "sha256": digest}
                    for path, digest in sorted(protocol.source_locks.items())
                ]
            }
        ),
    }


def _load_schema_shapes(package_root: Path) -> dict[str, tuple[str, set[str]]]:
    shapes: dict[str, tuple[str, set[str]]] = {}
    schema_root = package_root / "protocol" / "schemas"
    for path in sorted(schema_root.glob("*.schema.json")):
        parsed = load_json_strict(path.read_bytes())
        if not isinstance(parsed, dict):
            raise VerificationError("record schema is not an object")
        properties = parsed.get("properties")
        required = parsed.get("required")
        if not isinstance(properties, dict) or not isinstance(required, list):
            raise VerificationError("record schema shape is incomplete")
        record_shape = properties.get("record_type")
        version_shape = properties.get("schema_version")
        if not isinstance(record_shape, dict) or not isinstance(version_shape, dict):
            raise VerificationError("record schema identity is incomplete")
        record_type = record_shape.get("const")
        schema_version = version_shape.get("const")
        if not isinstance(record_type, str) or not isinstance(schema_version, str):
            raise VerificationError("record schema identity is not constant")
        if set(required) != set(properties):
            raise VerificationError("record schema does not require every closed property")
        shapes[record_type] = (schema_version, set(required))
    if len(shapes) != 14:
        raise VerificationError("expected 14 closed record schema shapes")
    return shapes


def _require_hash_list(value: object, label: str) -> list[str]:
    if not isinstance(value, list) or any(
        not isinstance(item, str) or not _SHA256.fullmatch(item) for item in value
    ):
        raise VerificationError(f"{label} must contain lowercase SHA-256 refs")
    return value


def _verify_replicate_group(
    replicate_index: int,
    assignments: list[dict[str, object]],
    ratings: list[dict[str, object]],
    mappings: list[dict[str, object]],
    replicate: dict[str, object],
    run: dict[str, object],
) -> None:
    assignment_by_hash = {item["record_hash"]: item for item in assignments}
    rating_by_hash = {item["record_hash"]: item for item in ratings}
    if len(assignment_by_hash) != 120 or len(rating_by_hash) != 120:
        raise VerificationError("replicate contains duplicate assignment or rating records")
    expected_index = str(replicate_index)
    if any(item.get("replicate_index") != expected_index for item in assignments):
        raise VerificationError("assignment replicate index mismatch")
    if replicate.get("replicate_index") != expected_index:
        raise VerificationError("ReplicateRecord index mismatch")

    for assignment, rating in zip(assignments, ratings, strict=True):
        if rating.get("assignment_ref") != assignment.get("record_hash"):
            raise VerificationError("rating assignment_ref mismatch")
        if rating.get("input_refs") != [assignment.get("record_hash")]:
            raise VerificationError("rating input_refs mismatch")
        disposition = assignment.get("disposition")
        status = rating.get("response_status")
        expected_status = {
            "submitted": "submitted",
            "invalidated": "invalid",
            "abstained": "abstained",
            "nonstarted": "not_observed",
            "nonlocked": "not_observed",
        }.get(disposition)
        if status != expected_status:
            raise VerificationError("assignment/rating terminal status mismatch")
        if disposition == "submitted":
            raw = rating.get("display_pairwise_outcome")
            if raw not in {
                "LEFT",
                "RIGHT",
                "indistinguishable",
                "both_unacceptable",
                "insufficient_context",
            }:
                raise VerificationError("submitted rating has an invalid raw outcome")
            has_bands = type(rating.get("display_left_band")) is int and type(
                rating.get("display_right_band")
            ) is int
            if (raw == "insufficient_context") == has_bands:
                raise VerificationError("submitted rating band union is contradictory")
            if has_bands and any(
                not 0 <= int(rating[key]) <= 4
                for key in ("display_left_band", "display_right_band")
            ):
                raise VerificationError("submitted rating band is outside 0..4")
        else:
            if any(
                rating.get(key) is not None
                for key in (
                    "display_pairwise_outcome",
                    "display_left_band",
                    "display_right_band",
                )
            ):
                raise VerificationError("non-submitted rating retained response data")
        expected_eligible = disposition != "nonstarted"
        if assignment.get("eligible") is not expected_eligible:
            raise VerificationError("assignment eligibility contradicts its disposition")
        reason = assignment.get("disposition_reason")
        if (disposition == "submitted") != (reason is None):
            raise VerificationError("assignment disposition/reason union is contradictory")
        if rating.get("locked") is not (disposition == "submitted"):
            raise VerificationError("rating lock state contradicts its disposition")
        procedural = rating.get("procedural_reason")
        if (status == "submitted") != (procedural is None):
            raise VerificationError("rating status/reason union is contradictory")

    mapped_assignments: set[str] = set()
    for mapping in mappings:
        assignment_ref = mapping.get("assignment_ref")
        rating_ref = mapping.get("rating_ref")
        if assignment_ref not in assignment_by_hash or rating_ref not in rating_by_hash:
            raise VerificationError("mapping reference does not resolve within its replicate")
        if mapped_assignments and assignment_ref in mapped_assignments:
            raise VerificationError("submitted assignment has duplicate mappings")
        mapped_assignments.add(assignment_ref)  # type: ignore[arg-type]
        rating = rating_by_hash[rating_ref]
        if rating.get("assignment_ref") != assignment_ref:
            raise VerificationError("mapping rating and assignment do not match")
        if mapping.get("raw_display_outcome") != rating.get("display_pairwise_outcome"):
            raise VerificationError("mapping raw outcome differs from rating")
        left = mapping.get("display_left_candidate_id")
        right = mapping.get("display_right_candidate_id")
        if not isinstance(left, str) or not isinstance(right, str):
            raise VerificationError("mapping candidates must be strings")
        if {left[-2:], right[-2:]} != {"-A", "-B"} or left[:-2] != right[:-2]:
            raise VerificationError("mapping candidates are not one declared A/B pair")
        raw = mapping.get("raw_display_outcome")
        derived = mapping.get("derived_canonical_outcome")
        if raw == "LEFT":
            expected = left[-1]
        elif raw == "RIGHT":
            expected = right[-1]
        else:
            expected = raw
        if derived != expected:
            raise VerificationError("raw-to-canonical mapping is inconsistent")
    submitted_refs = {
        assignment["record_hash"]
        for assignment, rating in zip(assignments, ratings, strict=True)
        if rating.get("response_status") == "submitted"
    }
    if mapped_assignments != submitted_refs:
        raise VerificationError("mapping set does not equal submitted assignments")

    counts = replicate.get("counts")
    if not isinstance(counts, dict):
        raise VerificationError("ReplicateRecord counts are absent")
    expected_counts = {
        "eligible": sum(bool(item.get("eligible")) for item in assignments),
        "submitted": sum(item.get("response_status") == "submitted" for item in ratings),
        "invalid": sum(item.get("response_status") == "invalid" for item in ratings),
    }
    if counts != expected_counts:
        raise VerificationError("ReplicateRecord counts do not match assignment records")
    run_hash = run.get("record_hash")
    if replicate.get("run_ref") != run_hash:
        raise VerificationError("ReplicateRecord run_ref mismatch")
    expected_inputs = sorted(
        {
            run_hash,
            *(item["record_hash"] for item in assignments),
            *(item["record_hash"] for item in ratings),
            *(item["record_hash"] for item in mappings),
        }
    )
    if replicate.get("input_refs") != expected_inputs:
        raise VerificationError("ReplicateRecord input_refs do not cover its complete group")
    match = _REPLICATE_ID.fullmatch(str(replicate.get("replicate_id")))
    if match is None or int(match.group(1)) != replicate_index:
        raise VerificationError("ReplicateRecord ID is malformed")
    if replicate_index == 1:
        if match.group(2) != _BASELINE_REPLICATE_HASH:
            raise VerificationError("baseline replicate commitment does not match the frozen vector")
        if Counter(item.get("disposition") for item in assignments) != Counter(
            {"submitted": 115, "abstained": 5}
        ):
            raise VerificationError("baseline disposition vector mismatch")
        if Counter(item.get("derived_canonical_outcome") for item in mappings) != Counter(
            {
                "A": 37,
                "B": 36,
                "both_unacceptable": 15,
                "indistinguishable": 15,
                "insufficient_context": 12,
            }
        ):
            raise VerificationError("baseline outcome vector mismatch")


def _require_type(record: dict[str, object] | None, expected: str) -> dict[str, object]:
    if record is None or record.get("record_type") != expected:
        raise VerificationError(f"record stream expected {expected}")
    return record


def _verify_streaming_scenario(
    design: dict[str, object],
    scenario: dict[str, object],
    package_root: Path,
) -> None:
    if design.get("execution_status") != "candidate_conformance_only" or design.get(
        "authority"
    ) != "none":
        raise VerificationError("design record widened the candidate boundary")
    if scenario.get("scenario_parameter_hash") != _BASELINE_HASH or scenario.get(
        "scenario_id"
    ) != _BASELINE_ID:
        raise VerificationError("scenario is not the exact bounded baseline")
    preimage = scenario.get("scenario_parameter_preimage")
    if not isinstance(preimage, dict) or content_hash(preimage) != _BASELINE_HASH:
        raise VerificationError("scenario preimage does not match the baseline hash")
    membership_map = dict(
        verify_grid_independently(package_root / "protocol").memberships_by_hash
    )
    if scenario.get("arm_memberships") != list(membership_map[_BASELINE_HASH]):
        raise VerificationError("scenario memberships differ from the independent grid")
    if scenario.get("input_refs") != [design.get("record_hash")]:
        raise VerificationError("scenario input_refs mismatch")


def _verify_streaming_header(
    design: dict[str, object],
    scenario: dict[str, object],
    run: dict[str, object],
    package_root: Path,
) -> None:
    _verify_streaming_scenario(design, scenario, package_root)
    if run.get("input_refs") != [scenario.get("record_hash")]:
        raise VerificationError("run input_refs mismatch")
    if run.get("run_validity_status") != "valid" or run.get("run_completion_status") != "complete":
        raise VerificationError("bounded run terminal state is not valid/complete")
    if run.get("prohibited_capability_attestation") is not True:
        raise VerificationError("bounded run lacks prohibited-capability attestation")


def _verify_rating_union(rating: dict[str, object]) -> None:
    status = rating.get("response_status")
    if status == "submitted":
        raw = rating.get("display_pairwise_outcome")
        if raw not in {
            "LEFT",
            "RIGHT",
            "indistinguishable",
            "both_unacceptable",
            "insufficient_context",
        }:
            raise VerificationError("submitted rating has an invalid raw outcome")
        has_bands = type(rating.get("display_left_band")) is int and type(
            rating.get("display_right_band")
        ) is int
        if (raw == "insufficient_context") == has_bands:
            raise VerificationError("submitted rating band union is contradictory")
    elif any(
        rating.get(key) is not None
        for key in ("display_pairwise_outcome", "display_left_band", "display_right_band")
    ):
        raise VerificationError("non-submitted rating retained response data")


def _verify_metric_values(
    metric: dict[str, object],
    replicate_hashes: list[str],
    canonical_a_count: int,
    submitted_mapping_count: int,
) -> None:
    ledger_refs = sorted(replicate_hashes)
    denominator = submitted_mapping_count
    if not denominator:
        raise VerificationError("bounded metric denominator is zero")
    if metric.get("denominator_ledger_refs") != ledger_refs or metric.get(
        "input_refs"
    ) != ledger_refs:
        raise VerificationError("metric denominator ledger does not equal replicate commitments")
    if metric.get("numerator") != canonical_a_count:
        raise VerificationError("metric numerator does not equal canonical A mappings")
    if metric.get("denominator") != denominator:
        raise VerificationError("metric denominator does not equal submitted mappings")
    if metric.get("estimate_value") != canonical_a_count / denominator:
        raise VerificationError("metric value does not equal its exact fraction")


def _verify_streaming_terminal(
    *,
    reader: _RecordReader,
    design: dict[str, object],
    scenario: dict[str, object],
    run: dict[str, object],
    metric: dict[str, object],
    interval: dict[str, object],
    decision: dict[str, object],
    provenance: dict[str, object],
    replicate_hashes: list[str],
    canonical_a_count: int,
    submitted_mapping_count: int,
    replicate_count: int,
    protocol: ValidatedProtocol,
    package_root: Path,
) -> None:
    if not 1 <= replicate_count <= 1000:
        raise VerificationError("bounded stream must contain 1..1000 replicates")
    if design.get("execution_status") != "candidate_conformance_only" or design.get(
        "authority"
    ) != "none":
        raise VerificationError("design record widened the candidate boundary")
    expected_stream_id = f"VT-CONFORMANCE-{_BASELINE_ID[4:]}-R{replicate_count:04d}"
    if reader.stream_id != expected_stream_id:
        raise VerificationError("stream_id does not match its bounded replicate count")
    if scenario.get("scenario_parameter_hash") != _BASELINE_HASH or scenario.get(
        "scenario_id"
    ) != _BASELINE_ID:
        raise VerificationError("scenario is not the exact bounded baseline")
    preimage = scenario.get("scenario_parameter_preimage")
    if not isinstance(preimage, dict) or content_hash(preimage) != _BASELINE_HASH:
        raise VerificationError("scenario preimage does not match the baseline hash")
    membership_map = dict(
        verify_grid_independently(package_root / "protocol").memberships_by_hash
    )
    if scenario.get("arm_memberships") != list(membership_map[_BASELINE_HASH]):
        raise VerificationError("scenario memberships differ from the independent grid")
    if scenario.get("input_refs") != [design.get("record_hash")]:
        raise VerificationError("scenario input_refs mismatch")
    if run.get("input_refs") != [scenario.get("record_hash")]:
        raise VerificationError("run input_refs mismatch")
    if run.get("run_validity_status") != "valid" or run.get("run_completion_status") != "complete":
        raise VerificationError("bounded run terminal state is not valid/complete")
    if run.get("run_id") != f"RUN-{_BASELINE_ID[4:]}-R{replicate_count:04d}":
        raise VerificationError("run ID does not match the bounded envelope")
    if run.get("prohibited_capability_attestation") is not True:
        raise VerificationError("bounded run lacks prohibited-capability attestation")

    ledger_refs = sorted(replicate_hashes)
    denominator = submitted_mapping_count
    if not denominator:
        raise VerificationError("bounded metric denominator is zero")
    if metric.get("denominator_ledger_refs") != ledger_refs or metric.get(
        "input_refs"
    ) != ledger_refs:
        raise VerificationError("metric denominator ledger does not equal replicate commitments")
    if metric.get("numerator") != canonical_a_count:
        raise VerificationError("metric numerator does not equal canonical A mappings")
    if metric.get("denominator") != denominator:
        raise VerificationError("metric denominator does not equal submitted mappings")
    if metric.get("estimate_value") != canonical_a_count / denominator:
        raise VerificationError("metric value does not equal its exact fraction")
    if metric.get("estimate_status") != "estimated" or metric.get(
        "estimate_reason_codes"
    ) != []:
        raise VerificationError("bounded metric estimate union is contradictory")
    if metric.get("synthetic_truth_status") != "not_applicable" or metric.get(
        "synthetic_truth_reason_codes"
    ) != ["descriptive_only"]:
        raise VerificationError("bounded metric invented a synthetic truth")
    if metric.get("terminal_status") != "requires_pilot_data":
        raise VerificationError("bounded metric terminal status was promoted")
    if interval.get("metric_ref") != metric.get("record_hash") or interval.get(
        "input_refs"
    ) != [metric.get("record_hash")]:
        raise VerificationError("interval does not bind the metric")
    if interval.get("interval_status") != "unsupported_scope" or interval.get(
        "interval_reason_codes"
    ) != ["unsupported_target_scope"]:
        raise VerificationError("fixed-target interval gap was not preserved")
    if decision.get("completed_valid_replicates") != replicate_count:
        raise VerificationError("decision replicate denominator mismatch")
    if decision.get("operating_decision") != "requires_simulation" or decision.get(
        "authority"
    ) != "none":
        raise VerificationError("bounded decision was promoted or granted authority")
    if decision.get("operating_reason_codes") != [
        "candidate_conformance_only",
        "fixed_target_interval_method_gap",
    ]:
        raise VerificationError("bounded decision reasons are not the exact closed set")
    expected_decision_refs = sorted(
        [str(run["record_hash"]), str(metric["record_hash"]), str(interval["record_hash"])]
    )
    if decision.get("input_refs") != expected_decision_refs:
        raise VerificationError("decision input refs are incomplete")
    if provenance.get("parent_record_hash") != decision.get("record_hash") or provenance.get(
        "input_refs"
    ) != [decision.get("record_hash")]:
        raise VerificationError("provenance does not bind the terminal decision")
    if provenance.get("capability_envelope") != "offline_synthetic_only" or provenance.get(
        "data_class"
    ) != "synthetic_only":
        raise VerificationError("provenance widened the data/capability envelope")
    if protocol.interpretation_boundary.get("phase_advancement") != "none":
        raise VerificationError("protocol interpretation boundary unexpectedly changed")


def verify_stream(
    source: BinaryIO,
    protocol: ValidatedProtocol,
    package_root: Path,
) -> dict[str, object]:
    """Verify one canonical bounded stream without trusting engine summaries."""

    source_report = verify_source_locks(
        protocol,
        ApprovedRoots(
            protocol_root=package_root / "protocol",
            paper_source_root=package_root.parents[1],
        ),
    )
    if source_report.mismatches or source_report.verified_count != 9:
        raise VerificationError("paper source locks do not match")
    shapes = _load_schema_shapes(package_root)
    reader = _RecordReader(
        source, shapes, _expected_hashes(protocol, package_root)
    )
    design = _require_type(reader.next(), "SimulationDesignRecord")
    scenario = _require_type(reader.next(), "ScenarioRecord")
    _verify_streaming_scenario(design, scenario, package_root)
    run = _require_type(reader.next(), "SimulationRunRecord")
    _verify_streaming_header(design, scenario, run, package_root)

    replicate_hashes: list[str] = []
    canonical_a_count = 0
    submitted_mapping_count = 0
    replicate_count = 0
    pending = reader.next()
    while pending is not None and pending.get("record_type") != "MetricRecord":
        assignments: list[dict[str, object]] = []
        ratings: list[dict[str, object]] = []
        mappings: list[dict[str, object]] = []
        for assignment_index in range(120):
            assignment = _require_type(
                pending if assignment_index == 0 else reader.next(),
                "AssignmentDispositionRecord",
            )
            rating = _require_type(reader.next(), "SyntheticRatingRecord")
            _verify_rating_union(rating)
            assignments.append(assignment)
            ratings.append(rating)
            if rating.get("response_status") == "submitted":
                mapping = _require_type(reader.next(), "SyntheticMappingRecord")
                mappings.append(mapping)
                canonical_a_count += mapping.get("derived_canonical_outcome") == "A"
                submitted_mapping_count += 1
            pending = None
        replicate = _require_type(reader.next(), "ReplicateRecord")
        replicate_count += 1
        _verify_replicate_group(
            replicate_count,
            assignments,
            ratings,
            mappings,
            replicate,
            run,
        )
        replicate_hashes.append(str(replicate["record_hash"]))
        if replicate_count > 1000:
            raise VerificationError("bounded stream exceeds 1000 replicates")
        pending = reader.next()

    metric = _require_type(pending, "MetricRecord")
    _verify_metric_values(
        metric,
        replicate_hashes,
        canonical_a_count,
        submitted_mapping_count,
    )
    interval = _require_type(reader.next(), "IntervalRecord")
    decision = _require_type(reader.next(), "CellDecisionRecord")
    provenance = _require_type(reader.next(), "ProvenanceRecord")
    if reader.next() is not None:
        raise VerificationError("records appear after terminal provenance")
    _verify_streaming_terminal(
        reader=reader,
        design=design,
        scenario=scenario,
        run=run,
        metric=metric,
        interval=interval,
        decision=decision,
        provenance=provenance,
        replicate_hashes=replicate_hashes,
        canonical_a_count=canonical_a_count,
        submitted_mapping_count=submitted_mapping_count,
        replicate_count=replicate_count,
        protocol=protocol,
        package_root=package_root,
    )

    result: dict[str, object] = {
        "schema_version": "vt-sim-record-stream-verification/0.1",
        "record_type": "RecordStreamVerificationRecord",
        "candidate_id": protocol.implementation_candidate_id,
        "protocol_id": protocol.protocol_id,
        "protocol_manifest_hash": protocol.manifest_hash,
        "stream_id": reader.stream_id,
        "input_stream_hash": reader.raw_sha256,
        "record_count": reader.record_count,
        "replicate_count": replicate_count,
        "source_locks_verified": source_report.verified_count,
        "independent_grid_membership_verified": True,
        "status": "pass",
        "authority": "none",
        "record_hash": "0" * 64,
    }
    result["record_hash"] = content_hash(result, omit=frozenset({"record_hash"}))
    return result
