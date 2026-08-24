import { createHash } from "node:crypto";
import { finalizeRecord, sha256Canonical } from "@contentmd/core";
import { describe, expect, it } from "vitest";
import type {
  ArtifactRef,
  BenchmarkAttemptRecord,
  DigestRef,
  ProviderOperationPlanEntry,
} from "../src/records.js";
import {
  consumeBenchmarkAttemptSimulation,
  createBenchmarkAttemptSimulatorRegistry,
  createBenchmarkAttemptSimulatorVault,
  inspectBenchmarkAttemptSimulation,
  interruptBenchmarkAttemptSimulation,
  resumeBenchmarkAttemptSimulation,
  sealBenchmarkAttemptSimulation,
  verifyBenchmarkAttemptDraft,
  WritingBenchmarkError,
} from "../src/writing-benchmark.js";

const sha256 = (value: string): string =>
  createHash("sha256").update(value, "utf8").digest("hex");

const digestRef = (label: string): DigestRef => ({
  record_id: `fixture.${label}`,
  schema_id: "contentmd.synthetic-reference-record",
  schema_version: "0.1.0",
  content_digest: sha256(`contentmd.writing-benchmark-attempt-test/0.1.0\n${label}\n`),
});

const artifactRef = (label: string): ArtifactRef => ({
  artifact_id: `fixture.${label}`,
  artifact_version: "0.1.0",
  artifact_digest: sha256(`contentmd.writing-benchmark-attempt-artifact/0.1.0\n${label}\n`),
});

function planSet(): ProviderOperationPlanEntry[] {
  return Array.from({ length: 60 }, (_, index) => ({
    task_id: `writing-benchmark-task.${String(index).padStart(2, "0")}`,
    plan_id: `provider-execution-plan.${String(index).padStart(2, "0")}`,
    plan_digest: sha256(`provider-plan:${index}`),
  }));
}

function planSetDigest(entries: readonly ProviderOperationPlanEntry[]): string {
  return sha256Canonical({
    contract: "contentmd.benchmark-provider-operation-plan-set/0.1.0",
    entries,
  });
}

function attemptFixture(entries = planSet()): {
  attempt: BenchmarkAttemptRecord;
  expectedPlanSet: ProviderOperationPlanEntry[];
  manifestRef: DigestRef;
} {
  const manifestRef = digestRef("manifest.lil-write-001");
  const attempt = finalizeRecord({
    record_id: "benchmark-attempt.synthetic.001",
    schema_id: "contentmd.benchmark-attempt-record" as const,
    schema_version: "0.1.0" as const,
    record_version: 1,
    scope: {
      memory_scope: "project" as const,
      project_id: "project.synthetic.lil-write-001",
      resource_refs: [manifestRef.record_id],
      data_classes: ["project-owned-synthetic"],
    },
    provenance: [{
      record_id: manifestRef.record_id,
      relationship: "derived_from",
      content_digest: manifestRef.content_digest,
    }],
    lifecycle_state: "proposed" as const,
    payload: {
      contract_version: "contentmd.learning-record-contract/0.1.0" as const,
      record_mode: "development_fixture" as const,
      ranking_objective: "expression_preference" as const,
      candidate_kind: "expression" as const,
      schema_digest: sha256("benchmark-attempt-schema"),
      code_digest: sha256("benchmark-attempt-code"),
      input_digest: sha256("benchmark-attempt-input"),
      authority_effect: "none" as const,
      candidate_model_ref: digestRef("candidate-model"),
      manifest_ref: manifestRef,
      reviewer_allocation_ref: digestRef("reviewer-allocation"),
      rubric_ref: artifactRef("rubric"),
      randomization_ref: digestRef("randomization"),
      analysis_code_ref: artifactRef("analysis-code"),
      provider_operation_plan_set: entries,
      provider_operation_plan_set_digest: planSetDigest(entries),
      sealed_at: null,
      readback_receipt_ref: null,
      resume_count: 0,
      consumed_at: null,
      consumption_reason: null,
      attempt_state: "draft" as const,
    },
  }) as BenchmarkAttemptRecord;
  return { attempt, expectedPlanSet: planSet(), manifestRef };
}

function rehashAttempt(attempt: BenchmarkAttemptRecord): BenchmarkAttemptRecord {
  const { content_digest: _contentDigest, ...withoutDigest } = attempt;
  return finalizeRecord(withoutDigest) as BenchmarkAttemptRecord;
}

describe("LIL-WRITE-001 attempt preregistration", () => {
  it("verifies the exact ordered 60-plan set before synthetic sealing", () => {
    const fixture = attemptFixture();
    const verified = verifyBenchmarkAttemptDraft({
      record_mode: "development_fixture",
      attempt: fixture.attempt,
      manifest_ref: fixture.manifestRef,
      expected_plan_set: fixture.expectedPlanSet,
    });

    expect(verified.plan_count).toBe(60);
    expect(verified.ready_to_seal).toBe(true);
    expect(verified.attempt_ref.record_id).toBe(fixture.attempt.record_id);
  });

  it("rejects reordered plan entries when the ordered-set digest is stale", () => {
    const fixture = attemptFixture();
    const mutated = structuredClone(fixture.attempt);
    [mutated.payload.provider_operation_plan_set[0], mutated.payload.provider_operation_plan_set[1]] = [
      mutated.payload.provider_operation_plan_set[1],
      mutated.payload.provider_operation_plan_set[0],
    ];
    const rehashed = rehashAttempt(mutated);

    expect(() => verifyBenchmarkAttemptDraft({
      record_mode: "development_fixture",
      attempt: rehashed,
      manifest_ref: fixture.manifestRef,
      expected_plan_set: fixture.expectedPlanSet,
    })).toThrowError(new WritingBenchmarkError("attempt_plan_set_mismatch"));
  });

  it("rejects a self-consistent but unregistered replacement plan", () => {
    const fixture = attemptFixture();
    const mutated = structuredClone(fixture.attempt);
    mutated.payload.provider_operation_plan_set[0].plan_digest = "f".repeat(64);
    mutated.payload.provider_operation_plan_set_digest = planSetDigest(
      mutated.payload.provider_operation_plan_set,
    );
    const rehashed = rehashAttempt(mutated);

    expect(() => verifyBenchmarkAttemptDraft({
      record_mode: "development_fixture",
      attempt: rehashed,
      manifest_ref: fixture.manifestRef,
      expected_plan_set: fixture.expectedPlanSet,
    })).toThrowError(new WritingBenchmarkError("attempt_plan_set_mismatch"));
  });
});

describe("synthetic one-shot attempt lifecycle", () => {
  it("claims one candidate-model and manifest pair once and requires readback", () => {
    const fixture = attemptFixture();
    const verifiedDraft = verifyBenchmarkAttemptDraft({
      record_mode: "development_fixture",
      attempt: fixture.attempt,
      manifest_ref: fixture.manifestRef,
      expected_plan_set: fixture.expectedPlanSet,
    });
    const registry = createBenchmarkAttemptSimulatorRegistry();
    const first = createBenchmarkAttemptSimulatorVault({
      registry,
      verified_draft: verifiedDraft,
    });
    const duplicate = createBenchmarkAttemptSimulatorVault({
      registry,
      verified_draft: verifiedDraft,
    });

    expect(sealBenchmarkAttemptSimulation({
      vault: first,
      sealed_at: "2026-08-23T21:00:00.000Z",
      readback_receipt_ref: digestRef("attempt-readback"),
    })).toMatchObject({
      attempt_state: "sealed",
      resume_count: 0,
      official_attempt_effect: "none",
    });
    expect(() => sealBenchmarkAttemptSimulation({
      vault: duplicate,
      sealed_at: "2026-08-23T21:00:01.000Z",
      readback_receipt_ref: digestRef("duplicate-readback"),
    })).toThrowError(new WritingBenchmarkError("attempt_already_claimed"));
  });

  it("resumes only the same interrupted run and makes invalid consumption terminal", () => {
    const fixture = attemptFixture();
    const verifiedDraft = verifyBenchmarkAttemptDraft({
      record_mode: "development_fixture",
      attempt: fixture.attempt,
      manifest_ref: fixture.manifestRef,
      expected_plan_set: fixture.expectedPlanSet,
    });
    const vault = createBenchmarkAttemptSimulatorVault({
      registry: createBenchmarkAttemptSimulatorRegistry(),
      verified_draft: verifiedDraft,
    });
    sealBenchmarkAttemptSimulation({
      vault,
      sealed_at: "2026-08-23T21:00:00.000Z",
      readback_receipt_ref: digestRef("attempt-readback"),
    });
    interruptBenchmarkAttemptSimulation({
      vault,
      interrupted_at: "2026-08-23T21:05:00.000Z",
    });
    expect(resumeBenchmarkAttemptSimulation({
      vault,
      resumed_at: "2026-08-23T21:06:00.000Z",
    })).toMatchObject({ attempt_state: "in_progress", resume_count: 1 });
    expect(consumeBenchmarkAttemptSimulation({
      vault,
      consumed_at: "2026-08-23T21:10:00.000Z",
      reason: "invalid_run",
    })).toMatchObject({
      attempt_state: "invalid_run",
      resume_count: 1,
      official_attempt_effect: "none",
    });
    expect(() => resumeBenchmarkAttemptSimulation({
      vault,
      resumed_at: "2026-08-23T21:11:00.000Z",
    })).toThrowError(new WritingBenchmarkError("attempt_terminal"));
    expect(inspectBenchmarkAttemptSimulation(vault).attempt_state).toBe("invalid_run");
  });
});
