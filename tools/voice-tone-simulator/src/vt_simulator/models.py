"""Strict immutable base records for the simulator candidate."""

from __future__ import annotations

from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field


LowercaseSha256 = Annotated[str, Field(pattern=r"^[0-9a-f]{64}$")]


class StrictRecord(BaseModel):
    """Base model that rejects coercion, mutation, and undeclared fields."""

    model_config = ConfigDict(
        extra="forbid",
        frozen=True,
        strict=True,
        validate_default=True,
    )


class HashedRecord(StrictRecord):
    """Base model for records with a canonical SHA-256 identity."""

    record_hash: LowercaseSha256
