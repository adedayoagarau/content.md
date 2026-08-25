export type Binary64Hex = string;

export type PairwiseRankingErrorCode =
  | "ranking_input_shape_invalid"
  | "ranking_official_mode_not_supported"
  | "ranking_digest_invalid"
  | "ranking_reference_invalid"
  | "ranking_objective_mismatch"
  | "ranking_mode_mismatch"
  | "ranking_scope_mismatch"
  | "learning_data_not_authorized"
  | "ranking_source_quarantined"
  | "learning_dataset_insufficient"
  | "ranking_dataset_state_invalid"
  | "ranking_test_state_invalid"
  | "ranking_feature_profile_mismatch"
  | "ranking_feature_order_invalid"
  | "ranking_runtime_profile_unsupported"
  | "ranking_code_manifest_invalid"
  | "ranking_non_finite"
  | "ranking_training_invalid"
  | "ranking_training_nonconverged"
  | "ranking_model_invalid"
  | "ranking_model_quarantined"
  | "ranking_candidate_ineligible";

export interface PairwiseRankingErrorShape {
  code: PairwiseRankingErrorCode;
  message: `task5_contract_invalid:${PairwiseRankingErrorCode}`;
  retryable: false;
}

export class PairwiseRankingError extends TypeError {
  readonly code: PairwiseRankingErrorCode;
  readonly retryable = false as const;

  constructor(code: PairwiseRankingErrorCode) {
    super(`task5_contract_invalid:${code}`);
    this.name = "PairwiseRankingError";
    this.code = code;
  }
}

export function task5Fail(code: PairwiseRankingErrorCode): never {
  throw new PairwiseRankingError(code);
}

const BINARY64_HEX = /^[a-f0-9]{16}$/;

function canonicalZero(value: number): number {
  return value === 0 ? 0 : value;
}

function finiteInput(value: unknown): number {
  if (typeof value !== "number") task5Fail("ranking_input_shape_invalid");
  if (!Number.isFinite(value) || Object.is(value, -0)) task5Fail("ranking_non_finite");
  return value;
}

function finiteIntermediate(value: number): number {
  if (!Number.isFinite(value)) task5Fail("ranking_non_finite");
  return canonicalZero(value);
}

function denseNumberArray(value: unknown): number[] {
  try {
    if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) {
      task5Fail("ranking_input_shape_invalid");
    }
    const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length");
    if (lengthDescriptor === undefined || !("value" in lengthDescriptor)
      || typeof lengthDescriptor.value !== "number"
      || !Number.isSafeInteger(lengthDescriptor.value) || lengthDescriptor.value < 0) {
      task5Fail("ranking_input_shape_invalid");
    }
    const length = lengthDescriptor.value;
    const expectedKeys = new Set([
      "length",
      ...Array.from({ length }, (_, index) => String(index)),
    ]);
    const keys = Reflect.ownKeys(value);
    if (keys.length !== expectedKeys.size
      || keys.some((key) => typeof key !== "string" || !expectedKeys.has(key))) {
      task5Fail("ranking_input_shape_invalid");
    }
    const values: number[] = [];
    for (let index = 0; index < length; index += 1) {
      const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)
        || typeof descriptor.value !== "number") {
        task5Fail("ranking_input_shape_invalid");
      }
      values.push(descriptor.value);
    }
    return values;
  } catch (error) {
    if (error instanceof PairwiseRankingError) throw error;
    return task5Fail("ranking_input_shape_invalid");
  }
}

export function binary64ToHex(value: number): Binary64Hex {
  const finite = finiteInput(value);
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, canonicalZero(finite), false);
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function binary64FromHex(bits: Binary64Hex): number {
  if (typeof bits !== "string" || !BINARY64_HEX.test(bits)) {
    task5Fail("ranking_input_shape_invalid");
  }
  const buffer = new ArrayBuffer(8);
  const bytes = new Uint8Array(buffer);
  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Number.parseInt(bits.slice(index * 2, index * 2 + 2), 16);
  }
  return finiteInput(new DataView(buffer).getFloat64(0, false));
}

export function kahanSum(values: readonly number[]): number {
  const suppliedValues = denseNumberArray(values);
  let sum = 0;
  let compensation = 0;
  for (const supplied of suppliedValues) {
    const value = finiteInput(supplied);
    const y = finiteIntermediate(value - compensation);
    const nextSum = finiteIntermediate(sum + y);
    const sumDelta = finiteIntermediate(nextSum - sum);
    compensation = finiteIntermediate(sumDelta - y);
    sum = nextSum;
  }
  return canonicalZero(sum);
}

export function stableSigmoid(value: number): number {
  const z = finiteInput(value);
  if (z >= 0) {
    const exponential = finiteIntermediate(Math.exp(-z));
    const denominator = finiteIntermediate(1 + exponential);
    return finiteIntermediate(1 / denominator);
  }
  const exponential = finiteIntermediate(Math.exp(z));
  const denominator = finiteIntermediate(1 + exponential);
  return finiteIntermediate(exponential / denominator);
}

export function stableSoftplus(value: number): number {
  const z = finiteInput(value);
  if (z > 0) {
    const exponential = finiteIntermediate(Math.exp(-z));
    const logarithm = finiteIntermediate(Math.log1p(exponential));
    return finiteIntermediate(z + logarithm);
  }
  const exponential = finiteIntermediate(Math.exp(z));
  return finiteIntermediate(Math.log1p(exponential));
}
