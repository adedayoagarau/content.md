"""Direct unsigned-32-bit Philox-4x32-10 implementation."""

from __future__ import annotations


_MASK32 = 0xFFFFFFFF
_M0 = 0xD2511F53
_M1 = 0xCD9E8D57
_W0 = 0x9E3779B9
_W1 = 0xBB67AE85


def _uint32(value: object, label: str) -> int:
    if isinstance(value, bool) or not isinstance(value, int) or not 0 <= value <= _MASK32:
        raise ValueError(f"{label} must be an unsigned 32-bit integer")
    return value


def _multiply_high_low(left: int, right: int) -> tuple[int, int]:
    product = left * right
    return (product >> 32) & _MASK32, product & _MASK32


def philox4x32_10(
    counter: tuple[int, int, int, int], key: tuple[int, int]
) -> tuple[int, int, int, int]:
    """Return one Philox-4x32-10 block in c0,c1,c2,c3 word order."""

    if not isinstance(counter, tuple) or len(counter) != 4:
        raise ValueError("counter must contain exactly four words")
    if not isinstance(key, tuple) or len(key) != 2:
        raise ValueError("key must contain exactly two words")
    c0, c1, c2, c3 = (
        _uint32(value, f"counter[{index}]") for index, value in enumerate(counter)
    )
    k0, k1 = (_uint32(value, f"key[{index}]") for index, value in enumerate(key))

    for round_index in range(10):
        hi0, lo0 = _multiply_high_low(_M0, c0)
        hi1, lo1 = _multiply_high_low(_M1, c2)
        c0, c1, c2, c3 = (
            (hi1 ^ c1 ^ k0) & _MASK32,
            lo1,
            (hi0 ^ c3 ^ k1) & _MASK32,
            lo0,
        )
        if round_index != 9:
            k0 = (k0 + _W0) & _MASK32
            k1 = (k1 + _W1) & _MASK32
    return c0, c1, c2, c3


def increment_counter(counter: tuple[int, int, int, int]) -> tuple[int, int, int, int]:
    """Increment a four-word counter as one unsigned big-endian integer."""

    if not isinstance(counter, tuple) or len(counter) != 4:
        raise ValueError("counter must contain exactly four words")
    words = [_uint32(value, f"counter[{index}]") for index, value in enumerate(counter)]
    carry = 1
    for index in range(3, -1, -1):
        if not carry:
            break
        value = words[index] + carry
        words[index] = value & _MASK32
        carry = value >> 32
    return tuple(words)  # type: ignore[return-value]


def word_to_uniform(word: int) -> float:
    """Map a uint32 to the protocol's open-interval midpoint uniform."""

    value = _uint32(word, "word")
    return (value + 0.5) / (2**32)
