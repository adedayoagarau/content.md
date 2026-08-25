import { createHash } from "node:crypto";

export interface PublicProductDigestRef {
  object_id: string;
  object_digest: string;
}

export type PublicProductContractErrorCode =
  | "input_shape"
  | "canonical_value"
  | "digest"
  | "reference_binding"
  | "taxonomy_invalid"
  | "taxonomy_unmapped"
  | "taxonomy_review_invalid"
  | "disposition_invalid"
  | "disposition_conflict"
  | "disposition_cycle"
  | "replacement_invalid"
  | "reviewer_qualification"
  | "rights_boundary"
  | "source_projection"
  | "evidence_quarantined"
  | "authority_violation"
  | "replica_acknowledgement";

export class PublicProductContractError extends TypeError {
  readonly code: PublicProductContractErrorCode;

  constructor(code: PublicProductContractErrorCode, detail?: string) {
    super(`public_product_contract_invalid:${code}${detail === undefined ? "" : `:${detail}`}`);
    this.name = "PublicProductContractError";
    this.code = code;
  }
}

export const PUBLIC_PRODUCT_ERROR_PRECEDENCE = Object.freeze([
  "input_shape",
  "canonical_value",
  "digest",
  "reference_binding",
  "reviewer_qualification",
  "taxonomy_invalid",
  "taxonomy_review_invalid",
  "disposition_invalid",
  "disposition_conflict",
  "disposition_cycle",
  "replacement_invalid",
  "rights_boundary",
  "source_projection",
  "evidence_quarantined",
  "authority_violation",
  "replica_acknowledgement",
] as const satisfies readonly PublicProductContractErrorCode[]);

export function compareUnicodeScalar(left: string, right: string): number {
  const leftPoints = [...left].map((value) => value.codePointAt(0)!);
  const rightPoints = [...right].map((value) => value.codePointAt(0)!);
  const length = Math.min(leftPoints.length, rightPoints.length);
  for (let index = 0; index < length; index += 1) {
    const difference = leftPoints[index]! - rightPoints[index]!;
    if (difference !== 0) return difference;
  }
  return leftPoints.length - rightPoints.length;
}

export function sha256Bytes(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function preflight(value: unknown, ancestors = new Set<object>()): void {
  if (value === null || typeof value !== "object") return;
  if (ancestors.has(value)) throw new PublicProductContractError("input_shape", "cycle");
  const isArray = Array.isArray(value);
  const prototype = Object.getPrototypeOf(value);
  if (!isArray && prototype !== Object.prototype && prototype !== null) {
    throw new PublicProductContractError("input_shape", "prototype");
  }
  ancestors.add(value);
  try {
    const keys = Reflect.ownKeys(value);
    if (isArray) {
      const indexes = keys.filter((key) => key !== "length");
      if (indexes.length !== value.length
        || indexes.some((key, index) => key !== String(index))) {
        throw new PublicProductContractError("input_shape", "array");
      }
    }
    for (const key of keys) {
      if (isArray && key === "length") continue;
      if (typeof key !== "string") throw new PublicProductContractError("input_shape", "symbol");
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        throw new PublicProductContractError("input_shape", "descriptor");
      }
      preflight(descriptor.value, ancestors);
    }
  } finally {
    ancestors.delete(value);
  }
}

export function assertClosedPlainRecord(
  value: unknown,
  expectedKeys: readonly string[],
  path: string,
): asserts value is Record<string, unknown> {
  preflight(value);
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new PublicProductContractError("input_shape", path);
  }
  const actual = Reflect.ownKeys(value);
  if (actual.length !== expectedKeys.length
    || expectedKeys.some((key) => !actual.includes(key))) {
    throw new PublicProductContractError("input_shape", path);
  }
}

function deepFreeze<T>(value: T, seen = new Set<object>()): T {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value, seen);
  }
  return Object.freeze(value);
}

export function immutableClone<T>(value: T): Readonly<T> {
  preflight(value);
  return deepFreeze(structuredClone(value));
}

export type PublicProductStagePlan = Partial<
  Record<PublicProductContractErrorCode, () => void>
>;

/** @internal */
export function runPublicProductStagePlan(plan: PublicProductStagePlan): void {
  for (const code of PUBLIC_PRODUCT_ERROR_PRECEDENCE) plan[code]?.();
}
