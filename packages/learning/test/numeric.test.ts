import { describe, expect, it } from "vitest";
import { PairwiseRankingError } from "../src/pairwise-logistic.js";
import {
  binary64FromHex,
  binary64ToHex,
  kahanSum,
  stableSigmoid,
  stableSoftplus,
} from "../src/numeric.js";

function expectCode(operation: () => unknown, code: string): void {
  expect(operation).toThrowError(PairwiseRankingError);
  expect(operation).toThrow(`task5_contract_invalid:${code}`);
}

describe("Task 5 binary64 primitives", () => {
  it.each([
    [0, "0000000000000000"],
    [1, "3ff0000000000000"],
    [-1.5, "bff8000000000000"],
    [Number.MIN_VALUE, "0000000000000001"],
  ] as const)("encodes %s in big-endian binary64", (value, bits) => {
    expect(binary64ToHex(value)).toBe(bits);
    expect(binary64FromHex(bits)).toBe(value);
  });

  it("rejects malformed, non-finite, and negative-zero encodings", () => {
    for (const malformed of ["", "0".repeat(15), "0".repeat(17), "3FF0000000000000", "g".repeat(16)]) {
      expectCode(() => binary64FromHex(malformed), "ranking_input_shape_invalid");
    }
    for (const bits of ["7ff0000000000000", "fff0000000000000", "7ff8000000000000", "8000000000000000"]) {
      expectCode(() => binary64FromHex(bits), "ranking_non_finite");
    }
    for (const value of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, -0]) {
      expectCode(() => binary64ToHex(value), "ranking_non_finite");
    }
  });

  it("uses classic Kahan order and canonical positive zero", () => {
    expect(kahanSum([1e16, 1, -1e16])).toBe(0);
    expect(kahanSum([1e16, -1e16, 1])).toBe(1);
    expect(Object.is(kahanSum([]), -0)).toBe(false);
    expect(Object.is(kahanSum([-1, 1]), -0)).toBe(false);
  });

  it("rejects invalid Kahan inputs and non-finite intermediate sums", () => {
    expectCode(() => kahanSum([1, -0]), "ranking_non_finite");
    expectCode(() => kahanSum([Number.MAX_VALUE, Number.MAX_VALUE]), "ranking_non_finite");
    expectCode(() => kahanSum([1, Number.NaN]), "ranking_non_finite");
    expectCode(() => kahanSum([1, , 2] as never), "ranking_input_shape_invalid");
    expectCode(() => kahanSum("not-an-array" as never), "ranking_input_shape_invalid");
  });

  it("rejects accessor and trapping array inputs without invoking caller code", () => {
    let getterReads = 0;
    const accessor = [1, 2];
    Object.defineProperty(accessor, "0", {
      enumerable: true,
      configurable: true,
      get() {
        getterReads += 1;
        throw new Error("numeric accessors must remain unread");
      },
    });

    expectCode(() => kahanSum(accessor), "ranking_input_shape_invalid");
    expect(getterReads).toBe(0);

    let proxyReads = 0;
    const trapping = new Proxy([1, 2], {
      getPrototypeOf() {
        proxyReads += 1;
        throw new Error("numeric proxy trap");
      },
    });

    let thrown: unknown;
    try {
      kahanSum(trapping);
    } catch (error) {
      thrown = error;
    }
    expect(thrown).toBeInstanceOf(PairwiseRankingError);
    expect((thrown as Error).message).toBe(
      "task5_contract_invalid:ranking_input_shape_invalid",
    );
    expect(proxyReads).toBe(1);
  });

  it.each([
    [-1, 0.2689414213699951],
    [0, 0.5],
    [1, 0.7310585786300049],
    [-1000, 0],
    [1000, 1],
  ] as const)("computes stable sigmoid(%s)", (value, expected) => {
    const result = stableSigmoid(value);
    expect(result).toBe(expected);
    expect(Object.is(result, -0)).toBe(false);
  });

  it.each([
    [-1, 0.31326168751822286],
    [0, 0.6931471805599453],
    [1, 1.3132616875182228],
    [-1000, 0],
    [1000, 1000],
  ] as const)("computes stable softplus(%s)", (value, expected) => {
    const result = stableSoftplus(value);
    expect(result).toBe(expected);
    expect(Object.is(result, -0)).toBe(false);
  });

  it("rejects non-finite and negative-zero activation inputs", () => {
    for (const operation of [stableSigmoid, stableSoftplus]) {
      for (const value of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, -0]) {
        expectCode(() => operation(value), "ranking_non_finite");
      }
      expectCode(() => operation("1" as never), "ranking_input_shape_invalid");
    }
  });
});
