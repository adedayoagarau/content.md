"""Canonical stdout-only rendering for finalized simulator records."""

from __future__ import annotations

from collections.abc import Iterable
from typing import BinaryIO

from pydantic import BaseModel

from .canonical import canonical_bytes


def render_jsonl(
    records: Iterable[BaseModel | dict[str, object]], sink: BinaryIO
) -> None:
    """Write immutable records as RFC 8785 JSON Lines to a binary sink."""

    for record in records:
        value = record.model_dump(mode="json") if isinstance(record, BaseModel) else record
        sink.write(canonical_bytes(value))
        sink.write(b"\n")
