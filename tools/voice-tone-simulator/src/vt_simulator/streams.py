"""Owned deterministic random streams with exact coordinate and draw ledgers."""

from __future__ import annotations

from dataclasses import dataclass
import hashlib
import re

from .philox import increment_counter, philox4x32_10, word_to_uniform


class StreamOwnershipError(ValueError):
    """A stream coordinate or consumption request violates the ownership contract."""


_SHA256 = re.compile(r"^[0-9a-f]{64}$")
_REPLICATE = re.compile(r"^(0|[1-9][0-9]*)$")
_STREAM_NAMES = (
    "finite-effects",
    "finite-effects-reference",
    "allocation",
    "nonstart",
    "nonlock",
    "procedural-abstention",
    "procedural-reason",
    "invalidation",
    "submitted-outcome",
    "ordinal-band",
    "evidence-span",
    "counterfactual",
    "event",
    "prediction",
    "resample",
)


@dataclass(frozen=True)
class StreamCoordinates:
    protocol_id: str
    master_seed_hex: str
    scenario_parameter_hash: str
    population_block_hash: str
    replicate_index: str
    stream_name: str
    target_id: str
    expected_purposes: tuple[str, ...]


@dataclass(frozen=True)
class ConsumptionRecord:
    coordinate_digest_hex: str
    stream_name: str
    target_id: str
    stream_fingerprint: str
    expected_draw_count: int
    observed_draw_count: int
    final_counter: tuple[int, int, int, int]
    status: str


class StreamRegistry:
    """Per-run ownership ledger preventing duplicate coordinate claims."""

    def __init__(self) -> None:
        self._claims: dict[str, StreamCoordinates] = {}

    def claim(self, digest: str, coordinates: StreamCoordinates) -> None:
        if digest in self._claims:
            raise StreamOwnershipError("random stream coordinate is already owned")
        self._claims[digest] = coordinates


class OwnedStream:
    """One Philox stream with a frozen purpose sequence and terminal ledger."""

    def __init__(
        self,
        coordinates: StreamCoordinates,
        coordinate_digest_hex: str,
        key: tuple[int, int],
        counter: tuple[int, int, int, int],
        stream_fingerprint: str,
    ) -> None:
        self.coordinates = coordinates
        self.coordinate_digest_hex = coordinate_digest_hex
        self.key = key
        self.initial_counter = counter
        self.stream_fingerprint = stream_fingerprint
        self._counter = counter
        self._buffer: tuple[int, ...] = ()
        self._buffer_index = 0
        self._purpose_index = 0
        self._closed = False

    def next_block(self) -> tuple[int, int, int, int]:
        """Emit and advance one raw block; conformance use only."""

        if self._closed:
            raise StreamOwnershipError("stream is closed")
        block = philox4x32_10(self._counter, self.key)
        self._counter = increment_counter(self._counter)
        return block

    def _next_word(self) -> int:
        if self._buffer_index >= len(self._buffer):
            self._buffer = self.next_block()
            self._buffer_index = 0
        word = self._buffer[self._buffer_index]
        self._buffer_index += 1
        return word

    def uniform(self, purpose: str) -> float:
        """Consume one draw only when its exact next purpose matches."""

        if self._closed:
            raise StreamOwnershipError("stream is closed")
        expected = self.coordinates.expected_purposes
        if self._purpose_index >= len(expected):
            raise StreamOwnershipError("stream draw allotment is exhausted")
        if purpose != expected[self._purpose_index]:
            raise StreamOwnershipError(
                f"draw purpose mismatch: expected {expected[self._purpose_index]!r}"
            )
        value = word_to_uniform(self._next_word())
        self._purpose_index += 1
        return value

    def close(self) -> ConsumptionRecord:
        """Close only after the full declared purpose allotment was consumed."""

        if self._closed:
            raise StreamOwnershipError("stream is already closed")
        expected = len(self.coordinates.expected_purposes)
        if self._purpose_index != expected:
            raise StreamOwnershipError(
                f"stream closed early: observed {self._purpose_index}, expected {expected}"
            )
        self._closed = True
        return ConsumptionRecord(
            coordinate_digest_hex=self.coordinate_digest_hex,
            stream_name=self.coordinates.stream_name,
            target_id=self.coordinates.target_id,
            stream_fingerprint=self.stream_fingerprint,
            expected_draw_count=expected,
            observed_draw_count=self._purpose_index,
            final_counter=self._counter,
            status="complete",
        )


def _validate_coordinates(coordinates: StreamCoordinates) -> tuple[str, int]:
    if coordinates.protocol_id != "VT-MSP/design-0.1":
        raise StreamOwnershipError("unexpected protocol_id")
    for label, value in (
        ("master_seed_hex", coordinates.master_seed_hex),
        ("scenario_parameter_hash", coordinates.scenario_parameter_hash),
        ("population_block_hash", coordinates.population_block_hash),
    ):
        if not _SHA256.fullmatch(value):
            raise StreamOwnershipError(f"{label} must be lowercase SHA-256")
    if coordinates.stream_name not in _STREAM_NAMES:
        raise StreamOwnershipError("unknown stream name")
    if not _REPLICATE.fullmatch(coordinates.replicate_index):
        raise StreamOwnershipError("replicate_index has invalid decimal grammar")
    replicate = int(coordinates.replicate_index)
    if coordinates.stream_name == "finite-effects":
        if not 0 <= replicate <= 100_000:
            raise StreamOwnershipError(
                "finite-effects replicate_index must be 0..100000"
            )
        subject_hash = coordinates.population_block_hash
    elif coordinates.stream_name == "finite-effects-reference":
        if not 1 <= replicate <= 10_000_000:
            raise StreamOwnershipError(
                "finite-effects-reference replicate_index must be 1..10000000"
            )
        subject_hash = coordinates.population_block_hash
    else:
        if not 1 <= replicate <= 100_000:
            raise StreamOwnershipError("stochastic replicate_index must be 1..100000")
        subject_hash = coordinates.scenario_parameter_hash
    if not coordinates.target_id:
        raise StreamOwnershipError("target_id must be non-empty")
    if any(not purpose for purpose in coordinates.expected_purposes):
        raise StreamOwnershipError("draw purposes must be non-empty")
    return subject_hash, replicate


def derive_stream(
    coordinates: StreamCoordinates, registry: StreamRegistry | None = None
) -> OwnedStream:
    """Derive and optionally claim one exact protocol-owned Philox stream."""

    subject_hash, _ = _validate_coordinates(coordinates)
    preimage = "\0".join(
        (
            coordinates.protocol_id,
            coordinates.master_seed_hex,
            subject_hash,
            coordinates.replicate_index,
            coordinates.stream_name,
        )
    ).encode("utf-8")
    digest = hashlib.sha256(preimage).digest()
    digest_hex = digest.hex()
    if registry is not None:
        registry.claim(digest_hex, coordinates)
    words = tuple(int.from_bytes(digest[index : index + 4], "big") for index in range(0, 24, 4))
    key = (words[0], words[1])
    counter = (words[2], words[3], words[4], words[5])
    fingerprint = digest[24:32].hex()
    return OwnedStream(coordinates, digest_hex, key, counter, fingerprint)
