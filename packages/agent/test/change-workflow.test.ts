import { cp, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { previewFilesystemChange } from "@contentmd/adapter-filesystem";
import { executeGovernedChange } from "@contentmd/agent";
import type { AuthorizationInput, GovernancePolicy } from "@contentmd/governance";

const fixtureRoot = fileURLToPath(new URL("../../../fixtures/synthetic-web-app/", import.meta.url));
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
