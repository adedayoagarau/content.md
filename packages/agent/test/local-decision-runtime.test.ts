import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import type { AuthorizationInput, GovernancePolicy, ResourceLimits } from "@contentmd/governance";
import { recordLocalDecision } from "@contentmd/agent";
import {
  eventStoreEffectClaims,
  finalizeGovernedRuntimeAuthorizationRecord,
} from "@contentmd/runtime-local";
import type {
  BoundRuntimeResource,
  RuntimeBinding,
  RuntimeOperationClaims,
} from "@contentmd/runtime-sdk";
import {
  NOW,
  runtimeBindingFixture,
  runtimeClaims,
} from "../../runtime-local/test/runtime-test-fixtures.js";

const DATA_CLASS = "project_feedback";
const PROJECT_ID = "project.beacon";
const STREAM_ID = "decision-stream.project.beacon";

function decisionInput() {
  return {
    expected_head_digest: null,
    decision_id: "decision.fixture.local-authorized",
    status: "accepted",
    actor_ref: "actor.fixture-reviewer",
    actor_role: "content_owner",
    rationale: "The exact recovery sequence matches the reviewed product evidence.",
    proposal_ref: "proposal.rewrite.fixture",
    selected_expression: "Check the payment status before trying again.",
    edited_expression: null,
    evidence_reviewed: ["source.product", "review.fixture"],
    scope: "project",
    project_id: PROJECT_ID,
    occurred_at: "2026-08-20T17:00:00.000Z",
    data_class: DATA_CLASS,
  } as const;
}

function decisionCommand() {
  const input = decisionInput();
  return {
    event_id: `event.${input.decision_id}`,
    stream_id: STREAM_ID,
    event_type: "content_decision_recorded",
    occurred_at: input.occurred_at,
    actor_ref: input.actor_ref,
    data_class: input.data_class,
    payload: {
      schema_version: "contentmd.content-decision/0.1.0",
      decision_id: input.decision_id,
      status: input.status,
      actor_ref: input.actor_ref,
      actor_role: input.actor_role,
      rationale: input.rationale,
      proposal_ref: input.proposal_ref,
      selected_expression: input.selected_expression,
      edited_expression: input.edited_expression,
      evidence_reviewed: ["review.fixture", "source.product"],
      scope: input.scope,
      project_id: input.project_id,
      occurred_at: input.occurred_at,
      mutation_approval_effect: "none",
    },
    expected_head_digest: input.expected_head_digest,
  };
}

function operationRecord(input: {
  readonly ordinal: number;
  readonly action: string;
  readonly resources: readonly BoundRuntimeResource[];
  readonly effect_input: unknown;
  readonly records: number;
  readonly binding: RuntimeBinding;
}) {
  const limits: ResourceLimits = eventStoreEffectClaims(
    input.action,
    input.resources,
    [DATA_CLASS],
    input.effect_input,
    input.records,
  );
  const policy: GovernancePolicy = {
    policy_id: `policy.runtime.local-decision.${input.ordinal}`,
    policy_version: 1,
    status: "current",
    effective_at: "2026-08-23T11:00:00.000Z",
    expires_at: "2026-08-23T13:00:00.000Z",
    allowed_actions: [input.action],
    denied_actions: [],
    review_actions: [],
    allowed_adapters: ["runtime.local"],
    denied_adapters: [],
    permitted_data_classes: [DATA_CLASS],
    denied_data_classes: [],
    permitted_egress: ["none"],
    max_limits: limits,
    human_approval_actions: [],
    required_control_types: [],
  };
  const grant = {
    grant_id: `grant.runtime.local-decision.${input.ordinal}`,
    principal_ref: "principal.fixture-reviewer",
    workload_ref: "workload.contentmd",
    action: input.action,
    adapter_id: "runtime.local",
    resource_scope: input.resources.map((resource) => resource.resource_id),
    data_classes: [DATA_CLASS],
    egress: "none" as const,
    max_limits: limits,
    issued_at: "2026-08-23T11:55:00.000Z",
    expires_at: "2026-08-23T12:15:00.000Z",
    revocation_state: "current" as const,
  };
  const claims: RuntimeOperationClaims = runtimeClaims({
    capability_id: `capability.runtime.local-decision.${input.ordinal}`,
    principal_ref: grant.principal_ref,
    project_ref: PROJECT_ID,
    action: input.action,
    resources: input.resources,
    data_classes: [DATA_CLASS],
    policy_refs: [{
      record_id: policy.policy_id,
      record_version: policy.policy_version,
      content_digest: sha256Canonical(policy),
    }],
    capability_grant_ref: {
      record_id: grant.grant_id,
      record_version: 1,
      content_digest: sha256Canonical(grant),
    },
    control_refs: [],
    resource_limits: limits,
    issued_at: grant.issued_at,
    expires_at: grant.expires_at,
    nonce: `nonce.runtime.local-decision.${input.ordinal}`,
    runtime_binding_digest: input.binding.descriptor_digest,
  });
  const authorization: AuthorizationInput = {
    now: NOW,
    request: {
      operation_id: claims.capability_id,
      intent: "apply",
      action: input.action,
      adapter_id: "runtime.local",
      resource_scope: input.resources.map((resource) => resource.resource_id),
      data_classes: [DATA_CLASS],
      egress: "none",
      requested_limits: limits,
      approval_class: null,
      requires_readback: false,
    },
    policies: [policy],
    capability_grant: grant,
    approval: null,
    control_dispositions: [],
    verification_plan_ref: null,
    reliability_evidence: null,
  };
  return finalizeGovernedRuntimeAuthorizationRecord({ authorization, claims });
}

function authorityBundle(appendStreamId = STREAM_ID) {
  const binding = runtimeBindingFixture(PROJECT_ID);
  const command = decisionCommand();
  return {
    contract_version: "contentmd.local-decision-runtime-authority/0.1.0",
    runtime_binding: binding,
    authorization_records: [
      operationRecord({
        ordinal: 1,
        action: "runtime.event-store.open",
        resources: [{ resource_id: binding.binding_id, content_digest: null }],
        effect_input: { binding_id: binding.binding_id },
        records: 1,
        binding,
      }),
      operationRecord({
        ordinal: 2,
        action: "runtime.event.head",
        resources: [{ resource_id: STREAM_ID, content_digest: null }],
        effect_input: { stream_id: STREAM_ID },
        records: 1,
        binding,
      }),
      operationRecord({
        ordinal: 3,
        action: "runtime.event.append",
        resources: [{ resource_id: appendStreamId, content_digest: null }],
        effect_input: command,
        records: 1,
        binding,
      }),
      operationRecord({
        ordinal: 4,
        action: "runtime.event-store.close",
        resources: [{ resource_id: binding.binding_id, content_digest: null }],
        effect_input: { binding_id: binding.binding_id },
        records: 1,
        binding,
      }),
    ],
  } as const;
}

async function writeJson(path: string, value: unknown): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`);
}

describe("local decision runtime authority", () => {
  it("fails closed when the project has no explicit runtime authorization bundle", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-local-decision-missing-authority-"));
    const decisionPath = join(root, "decision.json");
    await writeJson(decisionPath, decisionInput());

    await expect(recordLocalDecision(root, decisionPath, { clock: () => NOW }))
      .rejects.toThrow("runtime_binding_not_authorized");
  });

  it("records through exact open, head, append, and close capabilities", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-local-decision-authorized-"));
    const decisionPath = join(root, "decision.json");
    await writeJson(decisionPath, decisionInput());
    await writeJson(
      join(root, ".contentmd/governance/runtime-decision-authority.json"),
      authorityBundle(),
    );

    const result = await recordLocalDecision(root, decisionPath, { clock: () => NOW }) as {
      decision_id: string;
      sequence: number;
    };

    expect(result).toMatchObject({
      decision_id: "decision.fixture.local-authorized",
      sequence: 1,
    });
    expect(JSON.parse(await readFile(
      join(root, ".contentmd/runtime/latest-decision.json"),
      "utf8",
    ))).toEqual(result);
  });

  it("does not append when the authorization names a different stream", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-local-decision-wrong-stream-"));
    const decisionPath = join(root, "decision.json");
    await writeJson(decisionPath, decisionInput());
    await writeJson(
      join(root, ".contentmd/governance/runtime-decision-authority.json"),
      authorityBundle("decision-stream.other"),
    );

    await expect(recordLocalDecision(root, decisionPath, { clock: () => NOW }))
      .rejects.toThrow("runtime_binding_not_authorized");
    await expect(readFile(join(root, ".contentmd/runtime/latest-decision.json"), "utf8"))
      .rejects.toThrow();
  });
});
