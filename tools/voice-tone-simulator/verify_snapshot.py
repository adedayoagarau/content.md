#!/usr/bin/env python3
"""Dependency-minimal executable verifier for one bounded stdin snapshot."""

from __future__ import annotations

from pathlib import Path
import sys


PACKAGE_ROOT = Path(__file__).resolve().parent
SOURCE_ROOT = PACKAGE_ROOT / "src"
if str(SOURCE_ROOT) not in sys.path:
    sys.path.insert(0, str(SOURCE_ROOT))


from vt_simulator.canonical import canonical_bytes  # noqa: E402
from vt_simulator.grid_oracle import (  # noqa: E402
    IndependentGridReport,
    verify_grid_independently,
)
from vt_simulator.manifest import ApprovedRoots, load_validated_protocol  # noqa: E402
from vt_simulator.verify import VerificationError, verify_stream  # noqa: E402


__all__ = ["IndependentGridReport", "verify_grid_independently", "main"]


def main() -> int:
    if len(sys.argv) != 1:
        sys.stderr.write("usage error: verifier accepts stdin only\n")
        return 2
    try:
        protocol = load_validated_protocol(
            ApprovedRoots(
                protocol_root=PACKAGE_ROOT / "protocol",
                paper_source_root=PACKAGE_ROOT.parents[1],
            )
        )
        result = verify_stream(sys.stdin.buffer, protocol, PACKAGE_ROOT)
    except VerificationError as error:
        sys.stderr.write(f"{error}\n")
        return 3
    except Exception:
        sys.stderr.write("internal invariant failure\n")
        return 70
    sys.stdout.buffer.write(canonical_bytes(result))
    sys.stdout.buffer.write(b"\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
