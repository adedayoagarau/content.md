import { describe, expect, it } from "vitest";
import { canonicalJson, sha256Canonical } from "@contentmd/core";

describe("canonicalJson", () => {
  it("sorts object keys recursively while preserving array order", () => {
    const left = { z: [{ b: 2, a: 1 }, "first"], a: { y: true, x: null } };
    const right = { a: { x: null, y: true }, z: [{ a: 1, b: 2 }, "first"] };

    expect(canonicalJson(left)).toBe(
      '{"a":{"x":null,"y":true},"z":[{"a":1,"b":2},"first"]}\n',
    );
    expect(canonicalJson(right)).toBe(canonicalJson(left));
    expect(sha256Canonical(left)).toBe(
      "22ec4946058b65d54dfe26598ea5f7eb2e74128b4f526c5f5261bbbfce66029b",
    );
  });

  it.each([
    ["undefined object value", { value: undefined }],
    ["undefined array value", [undefined]],
    ["NaN", { value: Number.NaN }],
    ["Infinity", { value: Number.POSITIVE_INFINITY }],
    ["bigint", { value: 1n }],
    ["date object", { value: new Date("2026-08-20T00:00:00Z") }],
  ])("rejects %s instead of silently changing meaning", (_name, value) => {
    expect(() => canonicalJson(value)).toThrow(/not canonical JSON/i);
  });

  it("rejects cyclic objects", () => {
    const value: Record<string, unknown> = {};
    value.self = value;

    expect(() => canonicalJson(value)).toThrow(/cycle/i);
  });
});
