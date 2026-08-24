import { createHmac, timingSafeEqual } from "node:crypto";
import { canonicalJson } from "@contentmd/core";

export interface ExecutionPlanSigner {
  readonly key_id: string;
  readonly algorithm: "hmac-sha256";
  sign(planDigest: string): Promise<string>;
  verify(planDigest: string, tag: string): Promise<boolean>;
}

export interface HmacExecutionPlanSignerInput {
  key_id: string;
  secret: Uint8Array;
}

const DIGEST = /^[a-f0-9]{64}$/u;

function authenticationBytes(keyId: string, planDigest: string): string {
  return canonicalJson({
    contract: "contentmd.provider-execution-plan-authentication/0.1.0",
    key_id: keyId,
    plan_digest: planDigest,
  });
}

export function createHmacExecutionPlanSigner(
  input: HmacExecutionPlanSignerInput,
): ExecutionPlanSigner {
  if (typeof input.key_id !== "string" || input.key_id.length === 0) {
    throw new TypeError("invalid_execution_plan_signer:key_id");
  }
  if (!(input.secret instanceof Uint8Array) || input.secret.byteLength < 32) {
    throw new TypeError("invalid_execution_plan_signer:secret");
  }
  const secret = Buffer.from(input.secret);
  const compute = (planDigest: string): string => {
    if (!DIGEST.test(planDigest)) return "";
    return createHmac("sha256", secret)
      .update(authenticationBytes(input.key_id, planDigest), "utf8")
      .digest("hex");
  };
  return Object.freeze({
    key_id: input.key_id,
    algorithm: "hmac-sha256" as const,
    async sign(planDigest: string): Promise<string> {
      const tag = compute(planDigest);
      if (tag.length === 0) throw new TypeError("invalid_execution_plan_digest");
      return tag;
    },
    async verify(planDigest: string, tag: string): Promise<boolean> {
      const expected = compute(planDigest);
      if (!DIGEST.test(tag) || expected.length !== tag.length) return false;
      return timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(tag, "hex"));
    },
  });
}
