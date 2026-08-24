import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { finalizeRecord, sha256Canonical } from "@contentmd/core";
import {
  createProviderReceipt,
  type ProviderExecutionAttemptClaim,
  type ProviderExecutionPlan,
  type ProviderReceipt,
} from "@contentmd/governance";
import { describe, expect, it } from "vitest";
import type {
  DigestRef,
  BenchmarkCandidateSetRecord,
  WritingBenchmarkManifest,
  WritingBenchmarkTaskRecord,
} from "../src/records.js";
import {
  analyzeWritingBenchmarkTaskReview,
  meanOriginalReviewEditEffort,
  normalizedWritingBenchmarkEditDistance,
  selectBenchmarkCandidate,
  verifyBenchmarkCandidateControls,
  verifyWritingBenchmarkManifest,
  WritingBenchmarkError,
  type WritingBenchmarkTrainingPartition,
} from "../src/writing-benchmark.js";
import type { Task4UnicodeRuntime } from "../src/retrieval.js";
import type { UnicodeArtifactBundle } from "../src/unicode-normalization.js";

interface CandidateChainFixture {
  task: WritingBenchmarkTaskRecord;
  plan: ProviderExecutionPlan;
  nonce_claim: ProviderExecutionAttemptClaim;
  provider_receipt: ProviderReceipt;
  candidate_set: BenchmarkCandidateSetRecord;
}

interface CandidateEvaluationFixture {
  candidate_id: string;
  expression_digest: string;
  score: number;
  hard_eligible: boolean;
  exclusions: string[];
}

interface ReviewObservationFixture {
  reviewer_id: string;
  qualified: boolean;
  blinded: boolean;
  independent_from: string[];
  hard_results: Record<string, "pass" | "fail">;
  advisory_scores: Record<string, number>;
  preference: "baseline" | "learned" | "tie" | "abstain";
}

const PRODUCTS = [
  ["finance", "payments"],
  ["health", "care"],
  ["public-service", "civic-services"],
  ["commerce", "retail"],
  ["education", "learning"],
  ["transport", "mobility"],
] as const;

const SLOTS = [
  ["strategy", "web", "en-US", "value-proposition"],
  ["strategy", "web", "en-GB", "category-positioning"],
  ["contextual_microcopy", "web", "en-US", "first-run"],
  ["contextual_microcopy", "web", "en-GB", "validation-error"],
  ["contextual_microcopy", "web", "en-US", "destructive-confirmation"],
  ["contextual_microcopy", "web", "en-GB", "empty-state"],
  ["contextual_microcopy", "web", "en-US", "recovery"],
  ["contextual_microcopy", "web", "en-GB", "permission-request"],
  ["contextual_microcopy", "notification", "en-US", "status-notification"],
  ["contextual_microcopy", "notification", "en-GB", "reminder-notification"],
] as const;

const sha256 = (value: string): string =>
  createHash("sha256").update(value, "utf8").digest("hex");

const digestRef = (label: string): DigestRef => ({
  record_id: `fixture.${label}`,
  schema_id: "contentmd.synthetic-reference-record",
  schema_version: "0.1.0",
  content_digest: sha256(`contentmd.writing-benchmark-test/0.1.0\n${label}\n`),
});

const artifactRef = (label: string) => ({
  artifact_id: `fixture.${label}`,
  artifact_version: "0.1.0",
  artifact_digest: sha256(`contentmd.writing-benchmark-artifact/0.1.0\n${label}\n`),
});

function unicodeBytes(path: string): string {
  return readFileSync(new URL(`../../../${path}`, import.meta.url), "utf8");
}

function unicodeRaw(path: string) {
  const bytes_utf8 = unicodeBytes(path);
  return { path, bytes_utf8, raw_bytes_digest: sha256(bytes_utf8) };
}

function unicodeArtifact(path: string) {
  const witness = unicodeRaw(path);
  const parsed = JSON.parse(witness.bytes_utf8) as {
    artifact_id: string;
    artifact_version: string;
  };
  return {
    ...witness,
    artifact_ref: {
      artifact_id: parsed.artifact_id,
      artifact_version: parsed.artifact_version,
      artifact_digest: witness.raw_bytes_digest,
    },
  };
}

function unicodeStoreArtifact(path: string, artifact_id: string) {
  const witness = unicodeRaw(path);
  return {
    ...witness,
    artifact_ref: {
      artifact_id,
      artifact_version: "0.1.0",
      artifact_digest: witness.raw_bytes_digest,
    },
  };
}

function unicodeRuntime(): Task4UnicodeRuntime {
  const bundlePreimage = {
    contract_version: "contentmd.unicode-artifact-bundle/0.1.0" as const,
    source_lock: unicodeRaw("fixtures/learning-ranking/unicode-17-source-lock.json"),
    acquisition_receipt: unicodeRaw("fixtures/learning-ranking/unicode-17-acquisition-receipt.json"),
    generator: unicodeRaw("scripts/generate-unicode-17-artifacts.mjs"),
    normalization: unicodeArtifact("fixtures/learning-ranking/unicode-17-normalization.json"),
    casefold: unicodeArtifact("fixtures/learning-ranking/unicode-17-casefold.json"),
    whitespace: unicodeArtifact("fixtures/learning-ranking/unicode-17-whitespace.json"),
    word_break: unicodeArtifact("fixtures/learning-ranking/unicode-17-word-break.json"),
    grapheme_break: unicodeArtifact("fixtures/learning-ranking/unicode-17-grapheme-break.json"),
  };
  const unicode_bundle: UnicodeArtifactBundle = {
    ...bundlePreimage,
    bundle_digest: sha256Canonical(bundlePreimage),
  };
  const runtime_profile = unicodeStoreArtifact(
    "fixtures/learning-ranking/feature-source-runtime-profile.json",
    "contentmd.feature-source-runtime-profile",
  );
  const preimage = {
    contract_version: "contentmd.task4-unicode-runtime/0.1.0" as const,
    unicode_bundle,
    runtime_profile,
  };
  return { ...preimage, runtime_digest: sha256Canonical(preimage) };
}

const recordRef = (record: {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  content_digest: string;
}): DigestRef => ({
  record_id: record.record_id,
  schema_id: record.schema_id,
  schema_version: record.schema_version,
  content_digest: record.content_digest,
});

const commonPayload = () => ({
  contract_version: "contentmd.learning-record-contract/0.1.0" as const,
  record_mode: "development_fixture" as const,
  ranking_objective: "expression_preference" as const,
  candidate_kind: "expression" as const,
  schema_digest: sha256("writing-benchmark-schema"),
  code_digest: sha256("writing-benchmark-code"),
  input_digest: sha256("writing-benchmark-input"),
  authority_effect: "none" as const,
});

function benchmarkFixture(): {
  manifest: WritingBenchmarkManifest;
  tasks: WritingBenchmarkTaskRecord[];
  trainingPartition: WritingBenchmarkTrainingPartition;
} {
  const tasks = PRODUCTS.flatMap(([productId, domain]) =>
    SLOTS.map(([taskType, channel, locale, familyId], slotIndex) =>
      finalizeRecord({
        record_id: `writing-benchmark-task.${productId}.${String(slotIndex + 1).padStart(2, "0")}`,
        schema_id: "contentmd.writing-benchmark-task-record" as const,
        schema_version: "0.1.0" as const,
        record_version: 1,
        scope: {
          memory_scope: "project" as const,
          project_id: "project.synthetic.lil-write-001",
          resource_refs: [`fixture.${productId}.${slotIndex + 1}`],
          data_classes: ["project-owned-synthetic"],
        },
        provenance: [{
          record_id: `fixture.source.${productId}.${slotIndex + 1}`,
          relationship: "derived_from",
          content_digest: sha256(`source:${productId}:${slotIndex + 1}`),
        }],
        lifecycle_state: "proposed" as const,
        payload: {
          ...commonPayload(),
          benchmark_id: "LIL-WRITE-001" as const,
          product_id: productId,
          domain,
          channel,
          locale,
          task_type: taskType,
          family_id: familyId,
          task_packet_ref: digestRef(`task-packet.${productId}.${slotIndex + 1}`),
          context_evidence_ref: digestRef(`context.${productId}.${slotIndex + 1}`),
          semantic_lineage_ids: [`lineage.${productId}.${slotIndex + 1}`],
          template_ids: [`template.${productId}.${slotIndex + 1}`],
          leakage_group_ids: [`leakage.${productId}.${slotIndex + 1}`],
          required_facts: [],
          required_actions: [],
          acceptance_criteria: ["Preserve the supplied synthetic facts."],
          ownership: "project_owned_synthetic" as const,
          generation_config_ref: digestRef(`generation.${productId}.${slotIndex + 1}`),
          task_state: "frozen" as const,
        },
      }) as WritingBenchmarkTaskRecord),
  );

  const trainingManifestRef = digestRef("training-manifest");
  const taskRefs = tasks.map((task) => ({
    record_id: task.record_id,
    schema_id: task.schema_id,
    schema_version: task.schema_version,
    content_digest: task.content_digest,
  }));
  const manifest = finalizeRecord({
    record_id: "writing-benchmark-manifest.lil-write-001",
    schema_id: "contentmd.writing-benchmark-manifest" as const,
    schema_version: "0.1.0" as const,
    record_version: 1,
    scope: {
      memory_scope: "project" as const,
      project_id: "project.synthetic.lil-write-001",
      resource_refs: ["fixture.lil-write-001"],
      data_classes: ["project-owned-synthetic"],
    },
    provenance: [{
      record_id: "fixture.source.lil-write-001",
      relationship: "derived_from",
      content_digest: sha256("source:lil-write-001"),
    }],
    lifecycle_state: "proposed" as const,
    payload: {
      ...commonPayload(),
      benchmark_id: "LIL-WRITE-001" as const,
      task_refs: taskRefs,
      product_counts: PRODUCTS.map(([productId]) => ({ key: productId, count: 10 })),
      domain_counts: PRODUCTS.map(([, domain]) => ({ key: domain, count: 10 })),
      channel_counts: [{ key: "notification", count: 12 }, { key: "web", count: 48 }],
      locale_counts: [{ key: "en-GB", count: 30 }, { key: "en-US", count: 30 }],
      task_type_counts: [
        { key: "contextual_microcopy", count: 48 },
        { key: "strategy", count: 12 },
      ],
      family_counts: SLOTS.map(([, , , familyId]) => ({ key: familyId, count: 6 })),
      intersection_counts: tasks.map((task) => ({
        keys: [
          task.payload.product_id,
          task.payload.domain,
          task.payload.channel,
          task.payload.locale,
          task.payload.task_type,
          task.payload.family_id,
        ],
        count: 1,
      })),
      training_manifest_ref: trainingManifestRef,
      disjointness_check_ref: digestRef("disjointness-check"),
      generation_control_ref: digestRef("generation-control"),
      metric_contract_ref: digestRef("metric-contract"),
      missingness_contract_ref: digestRef("missingness-contract"),
      bootstrap_contract_ref: digestRef("bootstrap-contract"),
      quality_gate_ref: digestRef("quality-gate"),
      manifest_state: "draft" as const,
    },
  }) as WritingBenchmarkManifest;

  return {
    manifest,
    tasks,
    trainingPartition: {
      training_manifest_ref: trainingManifestRef,
      pattern_family_ids: [],
      semantic_lineage_ids: [],
      template_ids: [],
      leakage_group_ids: [],
    },
  };
}

function generationControl() {
  return {
    provider_id: "provider.synthetic.recorded",
    provider_profile_ref: digestRef("provider-profile"),
    returned_model_id: "model.synthetic.recorded-1",
    prompt_template_ref: artifactRef("prompt-template"),
    alternatives_count: 4 as const,
    output_token_budget: 512 as const,
  };
}

function planForTask(
  task: WritingBenchmarkTaskRecord,
  position: number,
): ProviderExecutionPlan {
  const control = generationControl();
  const nonce = `nonce.lil-write-001.${String(position).padStart(2, "0")}`;
  const nonceDigest = sha256Canonical({
    contract: "contentmd.provider-execution-nonce/0.1.0",
    nonce,
  });
  const base = {
    schema_version: "contentmd.provider-execution-plan/0.1.0" as const,
    issued_at: "2026-08-23T20:00:00.000Z",
    expires_at: "2026-08-23T21:00:00.000Z",
    nonce,
    maximum_attempts: 1 as const,
    principal_ref: "actor.synthetic.benchmark",
    workload_ref: "workload.contentmd.lil-write-001",
    project_id: task.scope.project_id,
    task_id: task.record_id,
    operation_id: `operation.lil-write-001.${position}`,
    request_id: `request.lil-write-001.${position}`,
    request_digest: sha256(`request:${position}`),
    input_digest: task.payload.input_digest,
    prompt_template: {
      template_id: control.prompt_template_ref.artifact_id,
      template_version: control.prompt_template_ref.artifact_version,
      template_digest: control.prompt_template_ref.artifact_digest,
    },
    context_packet_ref: { ...task.payload.context_evidence_ref },
    retrieval_snapshot_ref: null,
    egress_item_digests: [task.payload.context_evidence_ref.content_digest],
    provider_id: control.provider_id,
    model_id: control.returned_model_id,
    model_profile_ref: { ...control.provider_profile_ref },
    output_schema_id: "contentmd.model-content-output",
    output_schema_version: "0.1.0",
    output_schema_digest: sha256("model-content-output-schema"),
    adapter_id: "recorded-provider",
    adapter_version: "0.1.0",
    method: "POST" as const,
    destination_origin: "https://recorded-provider.invalid",
    destination_path: "/v1/generate",
    redirect_policy: "deny" as const,
    body_digest: sha256(`body:${position}`),
    body_byte_count: 128,
    header_template_ref: { ...digestRef("header-template") },
    secret_ref: { ...digestRef("secret") },
    connection_ref: { ...digestRef("connection") },
    data_handling_profile_ref: { ...digestRef("data-handling-profile") },
    provider_capability_grant_ref: { ...digestRef("provider-grant") },
    policy_refs: ["policy.synthetic.benchmark@1"],
    policy_set_digest: sha256("policy-set"),
    authorization_envelope_digest: sha256(`authorization:${position}`),
    control_dispositions: [{
      control_type: "benchmark_generation",
      record_ref: task.record_id,
      status: "allow",
      disposition_digest: sha256(`control:${position}`),
    }],
    verification_plan_ref: "verification.synthetic.benchmark",
    resource_limits: {
      calls: 1 as const,
      attempts: 1 as const,
      retries: 0 as const,
      request_bytes: 32_768,
      response_bytes: 32_768,
      duration_ms: 30_000,
      input_tokens: 8_000,
      output_tokens: control.output_token_budget,
    },
    attempt_ledger_stream_id: `provider-attempt.${nonceDigest}`,
    outcome_audit_stream_id: `provider-outcome.${sha256(`outcome:${position}`)}`,
    revocation_checkpoint: {
      checkpoint_id: "checkpoint.synthetic.current",
      checkpoint_digest: sha256("checkpoint:current"),
      observed_at: "2026-08-23T19:59:00.000Z",
    },
    authorization_audit: {
      event_id: `audit.synthetic.${position}`,
      details_digest: sha256(`audit:${position}`),
    },
    authority_effect: "none" as const,
  };
  const identityDigest = sha256Canonical({
    contract: "contentmd.provider-execution-plan-identity/0.1.0",
    ...base,
  });
  const withId = {
    ...base,
    plan_id: `provider-execution-plan.${identityDigest.slice(0, 32)}`,
  };
  return {
    ...withId,
    plan_digest: sha256Canonical(withId),
  };
}

function candidateChain(
  task: WritingBenchmarkTaskRecord,
  position: number,
): CandidateChainFixture {
  const control = generationControl();
  const plan = planForTask(task, position);
  const planRef = {
    record_id: plan.plan_id,
    schema_id: plan.schema_version,
    schema_version: "0.1.0",
    content_digest: plan.plan_digest,
  };
  const nonceDigest = sha256Canonical({
    contract: "contentmd.provider-execution-nonce/0.1.0",
    nonce: plan.nonce,
  });
  const claim: ProviderExecutionAttemptClaim = {
    schema_version: "contentmd.provider-execution-attempt-claim/0.1.0",
    disposition: "claimed",
    stream_id: plan.attempt_ledger_stream_id,
    event_id: `provider-attempt-claim.${String(position).padStart(2, "0")}`,
    event_digest: sha256(`attempt-claim:${position}`),
    sequence: 1,
    plan_ref: planRef,
    nonce_digest: nonceDigest,
    claimed_at: "2026-08-23T20:00:01.000Z",
    authority_effect: "none",
  };
  const claimRef = {
    record_id: claim.event_id,
    schema_id: claim.schema_version,
    schema_version: "0.1.0",
    content_digest: claim.event_digest,
  };
  const receipt = createProviderReceipt({
    receipt_id: `provider-receipt.lil-write-001.${String(position).padStart(2, "0")}`,
    plan_ref: planRef,
    attempt_claim_ref: claimRef,
    request_id: plan.request_id,
    provider_id: plan.provider_id,
    requested_model_id: plan.model_id,
    returned_model_id: control.returned_model_id,
    provider_response_id: `recorded-response-${position}`,
    provider_created_at: "2026-08-23T20:00:02.000Z",
    outcome_state: "completed",
    http_status: 200,
    response_body_digest: sha256(`response-body:${position}`),
    response_body_byte_count: 512,
    provider_output_digest: sha256(`provider-output:${position}`),
    model_response_digest: sha256(`model-response:${position}`),
    token_accounting: {
      input_tokens: 100,
      output_tokens: 40,
      total_tokens: 140,
      cached_input_tokens: 0,
    },
    sent_at: "2026-08-23T20:00:01.000Z",
    completed_at: "2026-08-23T20:00:03.000Z",
    outcome_audit_stream_id: plan.outcome_audit_stream_id,
    retention_disposition: "authorized_durable",
    authority_effect: "none",
  });
  const candidates = ([0, 1, 2, 3] as const).map((candidatePosition) => ({
    position: candidatePosition,
    candidate_id: `candidate.${task.record_id}.${candidatePosition}`,
    expression_digest: candidatePosition.toString(16).repeat(64),
  })) as BenchmarkCandidateSetRecord["payload"]["candidates"];
  const candidateSetDigest = sha256Canonical({
    contract: "contentmd.writing-benchmark-candidate-set/0.1.0",
    task_ref: recordRef(task),
    provider_operation_plan_id: plan.plan_id,
    provider_operation_plan_digest: plan.plan_digest,
    nonce_claim_receipt_ref: claimRef,
    provider_receipt_ref: {
      record_id: receipt.receipt_id,
      schema_id: receipt.schema_version,
      schema_version: "0.1.0",
      content_digest: receipt.receipt_digest,
    },
    provider_output_digest: receipt.provider_output_digest,
    provider_profile_ref: control.provider_profile_ref,
    returned_model_id: control.returned_model_id,
    prompt_template_ref: control.prompt_template_ref,
    context_ref: task.payload.context_evidence_ref,
    alternatives_count: 4,
    output_token_budget: 512,
    candidates,
  });
  const candidateSet = finalizeRecord({
    record_id: `benchmark-candidate-set.${String(position).padStart(2, "0")}`,
    schema_id: "contentmd.benchmark-candidate-set-record" as const,
    schema_version: "0.1.0" as const,
    record_version: 1,
    scope: structuredClone(task.scope),
    provenance: [{
      record_id: receipt.receipt_id,
      relationship: "derived_from",
      content_digest: receipt.receipt_digest,
    }],
    lifecycle_state: "proposed" as const,
    payload: {
      ...commonPayload(),
      task_ref: recordRef(task),
      provider_operation_plan_id: plan.plan_id,
      provider_operation_plan_digest: plan.plan_digest,
      nonce_claim_receipt_ref: claimRef,
      provider_receipt_ref: {
        record_id: receipt.receipt_id,
        schema_id: receipt.schema_version,
        schema_version: "0.1.0" as const,
        content_digest: receipt.receipt_digest,
      },
      provider_output_digest: receipt.provider_output_digest!,
      provider_profile_ref: control.provider_profile_ref,
      returned_model_id: control.returned_model_id,
      prompt_template_ref: control.prompt_template_ref,
      context_ref: task.payload.context_evidence_ref,
      alternatives_count: 4 as const,
      output_token_budget: 512 as const,
      candidates,
      candidate_set_digest: candidateSetDigest,
      candidate_set_state: "completed_verified_nonquarantined" as const,
    },
  }) as BenchmarkCandidateSetRecord;
  return {
    task,
    plan,
    nonce_claim: claim,
    provider_receipt: receipt,
    candidate_set: candidateSet,
  };
}

function candidateChains(tasks: readonly WritingBenchmarkTaskRecord[]): CandidateChainFixture[] {
  return tasks.map((task, index) => candidateChain(task, index));
}

describe("sealed LIL-WRITE-001 benchmark manifest", () => {
  it("verifies the exact 60-task preregistered grid and held-out families", () => {
    const fixture = benchmarkFixture();
    const verified = verifyWritingBenchmarkManifest({
      record_mode: "development_fixture",
      manifest: fixture.manifest,
      tasks: fixture.tasks,
      training_partition: fixture.trainingPartition,
    });

    expect(verified.benchmark_id).toBe("LIL-WRITE-001");
    expect(verified.task_count).toBe(60);
    expect(verified.product_count).toBe(6);
    expect(verified.held_out_family_count).toBe(10);
  });

  it("rejects a missing task instead of analyzing a partial run", () => {
    const fixture = benchmarkFixture();
    expect(() => verifyWritingBenchmarkManifest({
      record_mode: "development_fixture",
      manifest: fixture.manifest,
      tasks: fixture.tasks.slice(1),
      training_partition: fixture.trainingPartition,
    })).toThrowError(new WritingBenchmarkError("task_set_mismatch"));
  });

  it("rejects any held-out family overlap with the training partition", () => {
    const fixture = benchmarkFixture();
    expect(() => verifyWritingBenchmarkManifest({
      record_mode: "development_fixture",
      manifest: fixture.manifest,
      tasks: fixture.tasks,
      training_partition: {
        ...fixture.trainingPartition,
        pattern_family_ids: ["recovery"],
      },
    })).toThrowError(new WritingBenchmarkError("training_overlap"));
  });
});

describe("same-candidate generation controls", () => {
  it("verifies one unique provider chain and one frozen four-expression set per task", () => {
    const fixture = benchmarkFixture();
    const verifiedManifest = verifyWritingBenchmarkManifest({
      record_mode: "development_fixture",
      manifest: fixture.manifest,
      tasks: fixture.tasks,
      training_partition: fixture.trainingPartition,
    });
    const verified = verifyBenchmarkCandidateControls({
      record_mode: "development_fixture",
      verified_manifest: verifiedManifest,
      generation_control: generationControl(),
      chains: candidateChains(fixture.tasks),
    });

    expect(verified.chain_count).toBe(60);
    expect(verified.candidate_set_refs).toHaveLength(60);
    expect(new Set(verified.candidate_set_refs.map((ref) => ref.record_id)).size).toBe(60);
  });

  it("rejects a duplicate chain even when the array still has sixty entries", () => {
    const fixture = benchmarkFixture();
    const verifiedManifest = verifyWritingBenchmarkManifest({
      record_mode: "development_fixture",
      manifest: fixture.manifest,
      tasks: fixture.tasks,
      training_partition: fixture.trainingPartition,
    });
    const chains = candidateChains(fixture.tasks);
    chains[1] = structuredClone(chains[0]);

    expect(() => verifyBenchmarkCandidateControls({
      record_mode: "development_fixture",
      verified_manifest: verifiedManifest,
      generation_control: generationControl(),
      chains,
    })).toThrowError(new WritingBenchmarkError("candidate_bijection"));
  });

  it("rejects a provider-model mismatch in an otherwise complete chain", () => {
    const fixture = benchmarkFixture();
    const verifiedManifest = verifyWritingBenchmarkManifest({
      record_mode: "development_fixture",
      manifest: fixture.manifest,
      tasks: fixture.tasks,
      training_partition: fixture.trainingPartition,
    });
    const chains = candidateChains(fixture.tasks);
    const receipt = chains[0].provider_receipt;
    const { schema_version: _schemaVersion, receipt_digest: _receiptDigest, ...receiptInput } = receipt;
    chains[0].provider_receipt = createProviderReceipt({
      ...receiptInput,
      returned_model_id: "model.synthetic.unapproved",
    });

    expect(() => verifyBenchmarkCandidateControls({
      record_mode: "development_fixture",
      verified_manifest: verifiedManifest,
      generation_control: generationControl(),
      chains,
    })).toThrowError(new WritingBenchmarkError("candidate_chain_invalid"));
  });
});

describe("deterministic same-candidate selection", () => {
  it("removes hard-ineligible candidates and resolves a score tie by expression digest", () => {
    const fixture = benchmarkFixture();
    const chain = candidateChain(fixture.tasks[0], 0);
    const evaluations: CandidateEvaluationFixture[] = [
      { ...chain.candidate_set.payload.candidates[0], score: 0.9, hard_eligible: true, exclusions: [] },
      { ...chain.candidate_set.payload.candidates[1], score: 0.9, hard_eligible: true, exclusions: [] },
      { ...chain.candidate_set.payload.candidates[2], score: 1, hard_eligible: false, exclusions: ["hard_rule_failed"] },
      { ...chain.candidate_set.payload.candidates[3], score: 0.2, hard_eligible: true, exclusions: [] },
    ];

    const result = selectBenchmarkCandidate({
      record_mode: "development_fixture",
      selection_path: "learned",
      candidate_set: chain.candidate_set,
      evaluations,
    });

    expect(result.selected_candidate_id).toBe(chain.candidate_set.payload.candidates[0].candidate_id);
    expect(result.selected_expression_digest).toBe("0".repeat(64));
    expect(result.ordered_candidate_ids).toEqual([
      chain.candidate_set.payload.candidates[0].candidate_id,
      chain.candidate_set.payload.candidates[1].candidate_id,
      chain.candidate_set.payload.candidates[3].candidate_id,
    ]);
    expect(result.tie_break_trace).toEqual({
      applied: true,
      tied_expression_digests: ["0".repeat(64), "1".repeat(64)],
    });
  });

  it("rejects a filtered evaluation set instead of silently ranking three candidates", () => {
    const fixture = benchmarkFixture();
    const chain = candidateChain(fixture.tasks[0], 0);
    const evaluations = chain.candidate_set.payload.candidates.slice(1).map((candidate, index) => ({
      ...candidate,
      score: 0.8 - index * 0.1,
      hard_eligible: true,
      exclusions: [],
    }));

    expect(() => selectBenchmarkCandidate({
      record_mode: "development_fixture",
      selection_path: "baseline",
      candidate_set: chain.candidate_set,
      evaluations,
    })).toThrowError(new WritingBenchmarkError("candidate_set_mismatch"));
  });
});

describe("Unicode 17 accepted-edit effort", () => {
  it("normalizes NFC and LF before grapheme-cluster Levenshtein distance", () => {
    const result = normalizedWritingBenchmarkEditDistance({
      selected_expression: "a\u0301b\r\n",
      accepted_expression: "\u00E1c\n",
      unicode_runtime: unicodeRuntime(),
    });

    expect(result).toEqual({
      selected_cluster_count: 3,
      accepted_cluster_count: 3,
      edit_count: 1,
      normalized_distance: 1 / 3,
      normalized_distance_bits: "3fd5555555555555",
    });
  });

  it("averages exactly the two original-reviewer distances", () => {
    expect(meanOriginalReviewEditEffort({
      original_review_distances: [
        { normalized_distance: 0.5, normalized_distance_bits: "3fe0000000000000" },
        { normalized_distance: 0, normalized_distance_bits: "0000000000000000" },
      ],
    })).toEqual({ value: 0.25, bits: "3fd0000000000000" });
  });
});

function review(
  reviewerId: string,
  otherReviewerIds: string[],
  preference: ReviewObservationFixture["preference"],
): ReviewObservationFixture {
  return {
    reviewer_id: reviewerId,
    qualified: true,
    blinded: true,
    independent_from: otherReviewerIds,
    hard_results: { factual_accuracy: "pass", behavioral_accuracy: "pass" },
    advisory_scores: { comprehension: 3, accessibility_quality: 4 },
    preference,
  };
}

describe("qualified independent benchmark review", () => {
  it("accepts two independent decisive original reviews without adjudication", () => {
    const result = analyzeWritingBenchmarkTaskReview({
      record_mode: "development_fixture",
      original_reviews: [
        review("reviewer.a", ["reviewer.b"], "learned"),
        review("reviewer.b", ["reviewer.a"], "learned"),
      ],
      adjudication_review: null,
    });

    expect(result).toEqual({
      review_state: "valid",
      adjudication_required: false,
      blind_preference: "learned",
      decisive_review_count: 2,
      original_review_count: 2,
    });
  });

  it("requires a third independent adjudication for a hard-result conflict", () => {
    const originalReviews: [ReviewObservationFixture, ReviewObservationFixture] = [
      review("reviewer.a", ["reviewer.b", "reviewer.c"], "baseline"),
      review("reviewer.b", ["reviewer.a", "reviewer.c"], "learned"),
    ];
    originalReviews[1].hard_results.factual_accuracy = "fail";

    expect(() => analyzeWritingBenchmarkTaskReview({
      record_mode: "development_fixture",
      original_reviews: originalReviews,
      adjudication_review: null,
    })).toThrowError(new WritingBenchmarkError("adjudication_required"));

    const result = analyzeWritingBenchmarkTaskReview({
      record_mode: "development_fixture",
      original_reviews: originalReviews,
      adjudication_review: review("reviewer.c", ["reviewer.a", "reviewer.b"], "learned"),
    });
    expect(result).toMatchObject({
      review_state: "valid",
      adjudication_required: true,
      blind_preference: "learned",
      decisive_review_count: 3,
      original_review_count: 2,
    });
  });

  it("rejects reviewer reuse or missing qualification", () => {
    const first = review("reviewer.a", ["reviewer.a"], "learned");
    const second = review("reviewer.a", ["reviewer.a"], "learned");
    second.qualified = false;

    expect(() => analyzeWritingBenchmarkTaskReview({
      record_mode: "development_fixture",
      original_reviews: [first, second],
      adjudication_review: null,
    })).toThrowError(new WritingBenchmarkError("review_invalid"));
  });
});
