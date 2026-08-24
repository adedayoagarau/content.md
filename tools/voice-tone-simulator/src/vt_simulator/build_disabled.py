"""PEP 517 boundary that fails closed until the SIM-I1 artifact gate is satisfied."""

from __future__ import annotations


class BuildNotAuthorizedError(RuntimeError):
    """A wheel or source distribution was requested before SIM-I1 closed."""


_MESSAGE = (
    "vt-sim build is disabled: SIM-I1 requires approved local distribution "
    "filenames, hashes, licenses, and a separately authorized clean build"
)


def get_requires_for_build_wheel(
    config_settings: dict[str, object] | None = None,
) -> list[str]:
    return []


def get_requires_for_build_sdist(
    config_settings: dict[str, object] | None = None,
) -> list[str]:
    return []


def build_wheel(
    wheel_directory: str,
    config_settings: dict[str, object] | None = None,
    metadata_directory: str | None = None,
) -> str:
    raise BuildNotAuthorizedError(_MESSAGE)


def build_sdist(
    sdist_directory: str,
    config_settings: dict[str, object] | None = None,
) -> str:
    raise BuildNotAuthorizedError(_MESSAGE)
