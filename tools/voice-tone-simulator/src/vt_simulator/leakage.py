"""Deterministic split-overlap and held-out label-leakage guards."""

from __future__ import annotations

from dataclasses import dataclass, replace
from decimal import Decimal
import math

from .canonical import content_hash
from .manifest import ValidatedProtocol


class LeakageValidationError(ValueError):
    """A leakage fixture is outside the frozen 64-case input matrix."""


@dataclass(frozen=True)
class LeakageInputRecord:
    record_id: str
    coverage: str
    profile_id: str
    family_id: str
    card_id: str
    rater_id: str
    candidate_suffix: str
    event_label: int
    split: str
    case_content_hash: str
    feature_leaked_event: int | None = None


@dataclass(frozen=True)
class LeakageCaseResult:
    case_id: str
    coverage: str
    profile: str
    split_overlap_rate: str
    label_leakage_rate: str
    eligible_count: int
    split_overlap_injected_count: int
    split_overlap_detected_count: int
    label_leakage_injected_count: int
    label_leakage_detected_count: int
    injected_union_count: int
    detected_union_count: int
    input_guard_status: str
    reason_codes: tuple[str, ...]
    unexpected_acceptance: bool
    case_result_hash: str


_RATES = ("0.00", "0.01", "0.05", "0.20")
_COVERAGE_FAMILIES = {
    "C10": tuple(range(7, 11)),
    "C22": tuple(range(15, 23)),
}
_PROFILES = ("K0-CALIBRATED", "K3-OVERCONFIDENT")


def _content_fields(
    *,
    candidate_suffix: str,
    card_id: str,
    event_label: int,
    family_id: str,
    profile_id: str,
    rater_id: str,
) -> dict[str, object]:
    return {
        "candidate_suffix": candidate_suffix,
        "card_id": card_id,
        "event_label": event_label,
        "family_id": family_id,
        "profile_id": profile_id,
        "rater_id": rater_id,
    }


def build_clean_universe(coverage: str, profile: str) -> tuple[LeakageInputRecord, ...]:
    """Build the exact lexicographic public-test universe for one fixture."""

    if coverage not in _COVERAGE_FAMILIES:
        raise LeakageValidationError("coverage must be C10 or C22")
    if profile not in _PROFILES:
        raise LeakageValidationError("profile is outside the leakage matrix")
    records: list[LeakageInputRecord] = []
    for family_number in _COVERAGE_FAMILIES[coverage]:
        family_id = f"SMSG-{family_number:04d}"
        for card_number in range(1, 5):
            card_id = f"SCARD-{card_number:04d}"
            for rater_number in range(1, 4):
                rater_id = f"SRATER-{rater_number:04d}"
                for suffix in ("A", "B"):
                    index = len(records) + 1
                    event_label = 1 if ((index - 1) % 10) < 3 else 0
                    preimage = _content_fields(
                        candidate_suffix=suffix,
                        card_id=card_id,
                        event_label=event_label,
                        family_id=family_id,
                        profile_id=profile,
                        rater_id=rater_id,
                    )
                    records.append(
                        LeakageInputRecord(
                            record_id=(
                                f"LGREC-{coverage}-{profile}-{family_number:04d}-"
                                f"{card_number:04d}-{rater_number:04d}-{suffix}"
                            ),
                            coverage=coverage,
                            profile_id=profile,
                            family_id=family_id,
                            card_id=card_id,
                            rater_id=rater_id,
                            candidate_suffix=suffix,
                            event_label=event_label,
                            split="public_test",
                            case_content_hash=content_hash(preimage),
                        )
                    )
    expected = 96 if coverage == "C10" else 192
    if len(records) != expected:
        raise LeakageValidationError("clean universe denominator mismatch")
    return tuple(records)


def expand_leakage_matrix(protocol: ValidatedProtocol) -> tuple[dict[str, str], ...]:
    """Return the already source-verified matrix in frozen sort order."""

    cases = tuple(dict(case) for case in protocol.leakage_cases)
    if len(cases) != 64:
        raise LeakageValidationError("leakage matrix must contain 64 cases")
    return cases


def _selected_count(rate: str, eligible_count: int) -> int:
    if rate not in _RATES:
        raise LeakageValidationError("leakage rate is outside the frozen matrix")
    if rate == "0.00":
        return 0
    return max(1, math.ceil(Decimal(rate) * eligible_count))


def evaluate_leakage_case(case: dict[str, str]) -> LeakageCaseResult:
    """Inject exact first-k relations, detect them, and fail closed before generation."""

    if set(case) != {
        "coverage",
        "profile",
        "split_overlap_rate",
        "label_leakage_rate",
    }:
        raise LeakageValidationError("leakage case must contain exactly four fields")
    coverage = case["coverage"]
    profile = case["profile"]
    overlap_rate = case["split_overlap_rate"]
    label_rate = case["label_leakage_rate"]
    clean = build_clean_universe(coverage, profile)
    eligible = len(clean)
    overlap_count = _selected_count(overlap_rate, eligible)
    label_count = _selected_count(label_rate, eligible)

    public_records = list(clean)
    for index in range(label_count):
        source = public_records[index]
        public_records[index] = replace(
            source, feature_leaked_event=source.event_label
        )
    shadows = tuple(
        replace(
            clean[index],
            record_id=f"LGSHADOW-{clean[index].record_id}",
            split="calibration",
        )
        for index in range(overlap_count)
    )
    all_records = tuple(public_records) + shadows

    memberships: dict[tuple[str, str], set[str]] = {}
    overlap_record_ids: set[str] = set()
    label_record_ids: set[str] = set()
    for record in all_records:
        key = (record.family_id, record.case_content_hash)
        memberships.setdefault(key, set()).add(record.split)
        if (
            record.feature_leaked_event is not None
            and record.feature_leaked_event == record.event_label
        ):
            label_record_ids.add(
                record.record_id.removeprefix("LGSHADOW-")
            )
    overlapping_keys = {
        key for key, splits in memberships.items() if {"calibration", "public_test"} <= splits
    }
    for record in clean:
        if (record.family_id, record.case_content_hash) in overlapping_keys:
            overlap_record_ids.add(record.record_id)

    injected_overlap_ids = {record.record_id for record in clean[:overlap_count]}
    injected_label_ids = {record.record_id for record in clean[:label_count]}
    injected_union = injected_overlap_ids | injected_label_ids
    detected_union = overlap_record_ids | label_record_ids
    reasons: list[str] = []
    if label_count:
        reasons.append("held_out_leakage")
    if overlap_count:
        reasons.append("split_overlap")
    clean_case = overlap_count == 0 and label_count == 0
    status = "accepted" if clean_case else "rejected_input"
    unexpected = (
        overlap_record_ids != injected_overlap_ids
        or label_record_ids != injected_label_ids
        or detected_union != injected_union
        or (clean_case and status != "accepted")
        or (not clean_case and status != "rejected_input")
    )
    case_id = f"LGCASE-{coverage}-{profile}-{overlap_rate}-{label_rate}"
    preimage = {
        "case_id": case_id,
        "coverage": coverage,
        "profile": profile,
        "split_overlap_rate": overlap_rate,
        "label_leakage_rate": label_rate,
        "eligible_count": eligible,
        "split_overlap_injected_count": overlap_count,
        "split_overlap_detected_count": len(overlap_record_ids),
        "label_leakage_injected_count": label_count,
        "label_leakage_detected_count": len(label_record_ids),
        "injected_union_count": len(injected_union),
        "detected_union_count": len(detected_union),
        "input_guard_status": status,
        "reason_codes": reasons,
        "unexpected_acceptance": unexpected,
    }
    return LeakageCaseResult(
        case_id=case_id,
        coverage=coverage,
        profile=profile,
        split_overlap_rate=overlap_rate,
        label_leakage_rate=label_rate,
        eligible_count=eligible,
        split_overlap_injected_count=overlap_count,
        split_overlap_detected_count=len(overlap_record_ids),
        label_leakage_injected_count=label_count,
        label_leakage_detected_count=len(label_record_ids),
        injected_union_count=len(injected_union),
        detected_union_count=len(detected_union),
        input_guard_status=status,
        reason_codes=tuple(reasons),
        unexpected_acceptance=unexpected,
        case_result_hash=content_hash(preimage),
    )
