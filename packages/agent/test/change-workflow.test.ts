import { cp, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { previewFilesystemChange } from "@contentmd/adapter-filesystem";
import {
  executeGovernedChange,
  prepareContentTask,
  previewGovernedTaskChange,
  reviewIdeCandidate,
} from "@contentmd/agent";
import type { AuthorizationInput, GovernancePolicy } from "@contentmd/governance";

const fixtureRoot = fileURLToPath(new URL("../../../fixtures/synthetic-web-app/", import.meta.url));
const mixedFixtureRoot = fileURLToPath(new URL("../../../fixtures/synthetic-mixed-stack/", import.meta.url));
const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

async function setup() {
  const root = await mkdtemp(join(tmpdir(), "contentmd-agent-change-"));
  temporaryDirectories.push(root);
  await cp(fixtureRoot, root, { recursive: true });
  const transaction = await previewFilesystemChange({
    project_root: root,
    operation_id: "operation.fixture.apply",
    transaction_id: "txn_fixture_delete_workspace_v1",
    proposal_id: "prop_fixture_delete_workspace_v1",
    decision_id: "dec_fixture_delete_workspace_v1",
    approval_id: "apr_fixture_delete_workspace_v1",
    verification_id: "verify_fixture_delete_workspace_v1",
    target_path: "src/components/CheckoutSummary.tsx",
    additional_target_paths: [],
    line: 9,
    column: 29,
    before: "Delete workspace",
    after: "Delete this workspace",
  });
  return { root, transaction };
}

function auth(transactionDigest: string, approvalClass: "mutation" | "semantic_decision"): AuthorizationInput {
  const limits = { calls: 1, bytes: 4096, duration_ms: 2000, records: 2, model_tokens: 0, browser_actions: 0, retries: 0 };
  const policy: GovernancePolicy = {
    policy_id: "policy.fixture.change",
    policy_version: 1,
    status: "current",
    effective_at: "2026-08-20T00:00:00.000Z",
    expires_at: "2026-08-21T00:00:00.000Z",
    allowed_actions: ["filesystem.write"],
    denied_actions: [],
    review_actions: [],
    allowed_adapters: ["adapter.filesystem"],
    denied_adapters: [],
    permitted_data_classes: ["public-synthetic"],
    denied_data_classes: [],
    permitted_egress: ["none"],
    max_limits: limits,
    human_approval_actions: ["filesystem.write"],
    required_control_types: ["data_processing", "durable_memory", "telemetry"],
  };
  return {
    now: "2026-08-20T18:00:00.000Z",
    request: {
      operation_id: "operation.fixture.apply",
      intent: "apply",
      action: "filesystem.write",
      adapter_id: "adapter.filesystem",
      resource_scope: ["src/components/CheckoutSummary.tsx"],
      data_classes: ["public-synthetic"],
      egress: "none",
      requested_limits: limits,
      approval_class: "mutation",
      requires_readback: true,
      subject_digest: transactionDigest,
    },
    policies: [policy],
    capability_grant: {
      grant_id: "grant.fixture.apply",
      principal_ref: "actor.fixture.agent",
      workload_ref: "workload.contentmd",
      action: "filesystem.write",
      adapter_id: "adapter.filesystem",
      resource_scope: ["src/components/CheckoutSummary.tsx"],
      data_classes: ["public-synthetic"],
      egress: "none",
      max_limits: limits,
      issued_at: "2026-08-20T17:00:00.000Z",
      expires_at: "2026-08-20T19:00:00.000Z",
      revocation_state: "current",
    },
    approval: {
      approval_id: "apr_fixture_delete_workspace_v1",
      approval_class: approvalClass,
      subject_ref: "operation.fixture.apply",
      subject_digest: transactionDigest,
      status: "issued",
      issued_at: "2026-08-20T17:30:00.000Z",
      expires_at: "2026-08-20T19:00:00.000Z",
      revocation_state: "current",
    },
    control_dispositions: [
      { control_type: "connection_authorization", applicability: "not_applicable", record_ref: null, status: "not_applicable", rationale: "No connector." },
      { control_type: "data_processing", applicability: "applicable", record_ref: "control.processing", status: "current", rationale: "Synthetic fixture." },
      { control_type: "durable_memory", applicability: "applicable", record_ref: "control.memory", status: "current", rationale: "Local audit." },
      { control_type: "telemetry", applicability: "applicable", record_ref: "control.telemetry", status: "current", rationale: "Local verification." },
    ],
    verification_plan_ref: "verify_fixture_delete_workspace_v1",
    reliability_evidence: null,
  };
}

describe("governed change workflow", () => {
  it("binds a repository task, reviewed candidate, decision, occurrence, and exact bytes", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-agent-task-change-"));
    temporaryDirectories.push(root);
    await cp(mixedFixtureRoot, root, { recursive: true });
    const prepared = await prepareContentTask(root, {
      request: "Improve the Analyze empty state",
      target: "studio/app/analyze/page.tsx:8",
    });
    const review = await reviewIdeCandidate(root, {
      contract_version: "contentmd.ide-writing-candidate/0.1.0",
      task_digest: prepared.task.task_digest,
      alternatives: [{
        candidate_id: "candidate.empty-state.001",
        text: "Choose a product and stage to begin analysis.",
        rationale: "Names the inputs needed to continue.",
        evidence_refs: prepared.task.evidence_refs,
      }],
      recommended_candidate_id: "candidate.empty-state.001",
      claimed_authority_effect: "none",
    });
    const decision = {
      schema_version: "contentmd.content-decision/0.1.0" as const,
      decision_id: "decision.mixed-stack.empty-state.001",
      status: "accepted" as const,
      actor_ref: "actor.fixture-reviewer",
      actor_role: "content_owner",
      rationale: "Approved for this exact occurrence.",
      proposal_ref: review.candidate_digest,
      selected_expression: review.preview_diff!.after,
      edited_expression: null,
      evidence_reviewed: [prepared.task.task_digest, prepared.target_occurrence.occurrence_id],
      scope: "project" as const,
      project_id: prepared.project_id,
      occurred_at: "2026-08-25T18:00:00.000Z",
      mutation_approval_effect: "none" as const,
      sequence: 1,
      event_digest: "e".repeat(64),
    };

    const transaction = await previewGovernedTaskChange({
      project_root: root,
      transaction_id: "txn_mixed_stack_empty_state_v1",
      prepared,
      review,
      decision,
    });

    expect(transaction).toMatchObject({
      operation_id: `operation.task.${prepared.task.task_digest.slice(0, 24)}`,
      proposal_id: `candidate.${review.candidate_digest}`,
      decision_id: decision.decision_id,
      target_path: "studio/app/analyze/page.tsx",
      before: "Nothing to analyze yet",
      after: "Choose a product and stage to begin analysis.",
    });
    await expect(previewGovernedTaskChange({
      project_root: root,
      transaction_id: "txn_invalid",
      prepared,
      review,
      decision: { ...decision, proposal_ref: "candidate.stale" },
    })).rejects.toThrow("task_change_binding_invalid:decision_candidate");
  });

  it("rejects a semantic proposal decision as mutation authority", async () => {
    const { root, transaction } = await setup();

    await expect(executeGovernedChange({
      project_root: root,
      transaction,
      authorization_input: auth(transaction.transaction_digest, "semantic_decision"),
    })).rejects.toThrow("change_not_authorized:approval_class_mismatch");
    expect(await readFile(join(root, transaction.target_path), "utf8")).toContain("Delete workspace");
  });

  it("applies and independently verifies an exactly authorized mutation", async () => {
    const { root, transaction } = await setup();
    const result = await executeGovernedChange({
      project_root: root,
      transaction,
      authorization_input: auth(transaction.transaction_digest, "mutation"),
    });

    expect(result.authorization.disposition).toBe("allow");
    expect(result.apply_receipt.readback_verified).toBe(true);
    expect(result.verification_receipt.verified).toBe(true);
    expect(await readFile(join(root, transaction.target_path), "utf8")).toContain("Delete this workspace");
  });
});
