"""Stable candidate error classes and exit codes."""

from __future__ import annotations


class SimulatorError(Exception):
    """Base class for expected simulator failures."""

    exit_code = 70


class UsageError(SimulatorError):
    """The command does not match the closed candidate surface."""

    exit_code = 2


class ValidationError(SimulatorError):
    """A source, manifest, schema, hash, or identity check failed."""

    exit_code = 3


class ProhibitedCapabilityError(SimulatorError):
    """The request asks for a capability outside the candidate boundary."""

    exit_code = 7
