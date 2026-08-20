"""Strict JSON decoding, RFC 8785 bytes, and SHA-256 record identities."""

from __future__ import annotations

import hashlib
import json
import math
import re
from collections.abc import Mapping, Sequence
from typing import Any

import rfc8785


class CanonicalizationError(ValueError):
    """Input cannot participate in the candidate's canonical identity."""


class DuplicateKeyError(CanonicalizationError):
    """A decoded JSON object repeats a key."""


_LOWER_SHA256 = re.compile(r"^[0-9a-f]{64}$")


def _object_without_duplicates(pairs: list[tuple[str, Any]]) -> dict[str, Any]:
    result: dict[str, Any] = {}
    for key, value in pairs:
        if key in result:
            raise DuplicateKeyError(f"duplicate JSON object key: {key}")
        result[key] = value
    return result


def _parse_int(token: str) -> int:
    if token == "-0":
        raise CanonicalizationError("negative zero is prohibited")
    return int(token)


def _parse_float(token: str) -> float:
    value = float(token)
    if value == 0.0 and token.startswith("-"):
        raise CanonicalizationError("negative zero is prohibited")
    if not math.isfinite(value):
        raise CanonicalizationError("non-finite number is prohibited")
    return value


def _parse_constant(token: str) -> None:
    raise CanonicalizationError(f"non-finite JSON constant is prohibited: {token}")


def load_json_strict(raw: bytes) -> object:
    """Decode UTF-8 JSON while rejecting duplicate keys and invalid numbers."""

    try:
        return json.loads(
            raw.decode("utf-8"),
            object_pairs_hook=_object_without_duplicates,
            parse_int=_parse_int,
            parse_float=_parse_float,
            parse_constant=_parse_constant,
        )
    except (UnicodeDecodeError, json.JSONDecodeError) as error:
        raise CanonicalizationError(str(error)) from error


def _validate_value(value: object, path: str = "$") -> None:
    if value is None or isinstance(value, (bool, str, int)):
        return
    if isinstance(value, float):
        if not math.isfinite(value):
            raise CanonicalizationError(f"{path}: non-finite number is prohibited")
        if value == 0.0 and math.copysign(1.0, value) < 0:
            raise CanonicalizationError(f"{path}: negative zero is prohibited")
        return
    if isinstance(value, Mapping):
        for key, child in value.items():
            if not isinstance(key, str):
                raise CanonicalizationError(f"{path}: object keys must be strings")
            _validate_value(child, f"{path}.{key}")
        return
    if isinstance(value, Sequence) and not isinstance(value, (str, bytes, bytearray)):
        for index, child in enumerate(value):
            _validate_value(child, f"{path}[{index}]")
        return
    raise CanonicalizationError(f"{path}: unsupported type {type(value).__name__}")


def canonical_bytes(value: object) -> bytes:
    """Return RFC 8785 canonical UTF-8 bytes after candidate-domain checks."""

    _validate_value(value)
    try:
        return rfc8785.dumps(value)
    except rfc8785.CanonicalizationError as error:
        raise CanonicalizationError(str(error)) from error


def content_hash(
    value: dict[str, object],
    omit: frozenset[str] = frozenset(),
) -> str:
    """Hash a mapping after omitting only explicitly named top-level fields."""

    preimage = {key: child for key, child in value.items() if key not in omit}
    return hashlib.sha256(canonical_bytes(preimage)).hexdigest()


def verify_record_hash(record: dict[str, object]) -> None:
    """Verify a record's lowercase SHA-256 over its own-hash-omitted bytes."""

    digest = record.get("record_hash")
    if not isinstance(digest, str) or not _LOWER_SHA256.fullmatch(digest):
        raise CanonicalizationError("record_hash must be 64 lowercase hexadecimal characters")
    expected = content_hash(record, omit=frozenset({"record_hash"}))
    if digest != expected:
        raise CanonicalizationError("record_hash does not match canonical record bytes")
