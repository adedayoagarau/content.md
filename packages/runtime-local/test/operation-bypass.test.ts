import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { AuthorizedRuntimeOperation, RuntimeOperationClaims } from "@contentmd/runtime-sdk";
import {
  AUTHORIZATION_REF,
  authorityFixture,
  runtimeClaims,
  runtimeEffect,
} from "./runtime-test-fixtures.js";

async function temporaryRoot(): Promise<string> {
  return mkdtemp(join(tmpdir(), "contentmd-runtime-authority-"));
}

describe("local runtime operation authority", () => {
  it("resolves an exact authorization and claims a single-use nonce once", async () => {
    const fixture = authorityFixture(await temporaryRoot());
    const claims = runtimeClaims();
    fixture.resolver.accept(claims);
    const operation = await fixture.authority.issue(AUTHORIZATION_REF, claims);

    await expect(fixture.authority.resolveAndClaim(operation, runtimeEffect(claims)))
      .resolves.toEqual(claims);
    await expect(fixture.authority.resolveAndClaim(operation, runtimeEffect(claims)))
      .rejects.toThrow("runtime_operation_nonce_replayed");
  });

  it.each([
    ["unknown capability", (operation: AuthorizedRuntimeOperation) => ({ ...operation, capability_ref: "capability.unknown" })],
    ["fabricated digest", (operation: AuthorizedRuntimeOperation) => ({ ...operation, capability_digest: "0".repeat(64) })],
    ["wrong verifier", (operation: AuthorizedRuntimeOperation) => ({ ...operation, verifier_id: "runtime.other" })],
  ] as const)("rejects a %s token", async (_label, mutate) => {
    const fixture = authorityFixture(await temporaryRoot());
    const claims = runtimeClaims();
    fixture.resolver.accept(claims);
    const operation = await fixture.authority.issue(AUTHORIZATION_REF, claims);
    await expect(fixture.authority.resolveAndClaim(
      mutate(operation) as AuthorizedRuntimeOperation,
      runtimeEffect(claims),
    )).rejects.toThrow("runtime_binding_not_authorized");
  });

  it.each([
    ["principal", { principal_ref: "principal.other" }],
    ["workload", { workload_ref: "workload.other" }],
    ["project", { project_ref: "project.other" }],
    ["capability", { capability_id: "capability.other" }],
  ] as const)("rejects claims with a mismatched %s identity", async (_label, mutation) => {
    const fixture = authorityFixture(await temporaryRoot());
    const authorized = runtimeClaims();
    fixture.resolver.accept(authorized);
    await expect(fixture.authority.issue(
      AUTHORIZATION_REF,
      runtimeClaims(mutation as Partial<RuntimeOperationClaims>),
    )).rejects.toThrow("runtime_binding_not_authorized");
  });

  it.each([
    ["action", { action: "runtime.event.read" }],
    ["resource", { resources: [{ resource_id: "stream.other", content_digest: null }] }],
    ["data class", { data_classes: ["private-product-data"] }],
    ["runtime binding", { runtime_binding_digest: "0".repeat(64) }],
    ["limit", { requested_limits: { calls: 2, bytes: 8192, duration_ms: 3000, records: 3, model_tokens: 1, browser_actions: 1, retries: 1 } }],
  ] as const)("denies effect %s drift", async (_label, mutation) => {
    const fixture = authorityFixture(await temporaryRoot());
    const claims = runtimeClaims();
    fixture.resolver.accept(claims);
    const operation = await fixture.authority.issue(AUTHORIZATION_REF, claims);
    await expect(fixture.authority.resolveAndClaim(
      operation,
      runtimeEffect(claims, mutation),
    )).rejects.toThrow("runtime_binding_not_authorized");
  });

  it.each(["revoked", "unknown"] as const)("denies %s authorization currentness", async (state) => {
    const fixture = authorityFixture(await temporaryRoot());
    const claims = runtimeClaims();
    fixture.resolver.accept(claims);
    const operation = await fixture.authority.issue(AUTHORIZATION_REF, claims);
    fixture.resolver.currentness = state;
    await expect(fixture.authority.resolveAndClaim(operation, runtimeEffect(claims)))
      .rejects.toThrow("runtime_binding_not_authorized");
  });

  it("denies an expired capability", async () => {
    const fixture = authorityFixture(await temporaryRoot());
    const claims = runtimeClaims();
    fixture.resolver.accept(claims);
    const operation = await fixture.authority.issue(AUTHORIZATION_REF, claims);
    fixture.setNow("2026-08-23T12:16:00.000Z");
    await expect(fixture.authority.resolveAndClaim(operation, runtimeEffect(claims)))
      .rejects.toThrow("runtime_binding_not_authorized");
  });

  it("keeps raw SqliteEventStore construction inside memory and runtime-local", async () => {
    const offenders: string[] = [];
    for (const path of [
      "packages/agent/src/local-runtime.ts",
      "packages/learning/src/feedback.ts",
      "packages/governance/src/attempt-ledger.ts",
    ]) {
      const source = await readFile(path, "utf8");
      if (/\bSqliteEventStore\b/.test(source)) offenders.push(path);
    }
    expect(offenders).toEqual([]);
  });
});
