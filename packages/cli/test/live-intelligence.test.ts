import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { AppendOnlyProviderAudit } from "@contentmd/agent";
import {
  createModelProfile,
  createProviderCapabilityGrant,
} from "../../governance/src/index.js";
import { SqliteEventStore } from "../../memory/src/index.js";
import {
  createProductExamplePromptContext,
  createProjectFactPromptContext,
  createReviewFindingPromptContext,
  proposeContentDraft,
  proposeContentRewrite,
  proposeContentStrategy,
  type WriterModelExecutionContext,
} from "../../writer/src/index.js";
import { projectFactFixture } from "../../writer/test/project-fact-test-fixtures.js";
import {
  approvedExampleFixture,
  counterexampleFixture,
} from "../../writer/test/product-example-test-fixtures.js";
import { reviewFindingFixture } from "../../writer/test/review-finding-test-fixtures.js";
import {
  PROVIDER_NOW,
  providerFixture,
  providerPlanSigner,
} from "../../governance/test/provider-fixtures.js";
import { createGovernedOpenAIModelExecutionPort } from "../src/openai-composition.js";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })));
});

describe("captured governed live intelligence", () => {
  it("produces a proposal-only strategy through the exact OpenAI execution path", async () => {
    const approvedExample = approvedExampleFixture();
    const counterexample = counterexampleFixture();
    const task = approvedExample.task;
    const directory = await mkdtemp(join(tmpdir(), "contentmd-live-intelligence-"));
    temporaryDirectories.push(directory);
    const store = new SqliteEventStore(join(directory, "provider-events.sqlite"), {
      permitted_data_classes: ["provider_attempt", "provider_audit"],
    });
    const base = providerFixture().authorization;
    const dataProfile = base.data_handling_profile!;
    const connection = base.connection!;
    const modelProfile = createModelProfile({
      profile_id: "model-profile.openai.strategy-fixture",
      provider_id: "provider.openai",
      requested_model_id: "gpt-fixture",
      permitted_returned_model_ids: ["gpt-fixture"],
      supported_operations: ["strategy", "draft", "rewrite"],
      supported_output_schema_ids: [
        "contentmd.strategy-model-output/0.1.0",
        "contentmd.draft-model-output/0.1.0",
        "contentmd.rewrite-model-output/0.1.0",
      ],
      maximum_input_tokens: 8_000,
      maximum_output_tokens: 2_000,
      timeout_ms: 30_000,
      maximum_retries: 0,
      structured_output: true,
      data_handling_profile_ref: {
        record_id: dataProfile.profile_id,
        schema_id: dataProfile.schema_version,
        schema_version: "0.1.0",
        content_digest: dataProfile.profile_digest,
      },
      status: "current",
    });
    const grant = createProviderCapabilityGrant({
      grant_id: "grant.provider.strategy-fixture",
      principal_ref: "actor.fixture",
      workload_ref: "workload.contentmd",
      action: "model.generate",
      adapter_id: "adapter.openai.responses",
      provider_id: "provider.openai",
      resource_scope: ["project.fixture", task.task_id],
      data_classes: [
        "approved_example",
        "counterexample",
        "project_fact",
        "review_finding",
        "task_context",
      ],
      egress: "network",
      operations: ["strategy", "draft", "rewrite"],
      output_schema_ids: [
        "contentmd.strategy-model-output/0.1.0",
        "contentmd.draft-model-output/0.1.0",
        "contentmd.rewrite-model-output/0.1.0",
      ],
      model_profile_ref: {
        record_id: modelProfile.profile_id,
        schema_id: modelProfile.schema_version,
        schema_version: "0.1.0",
        content_digest: modelProfile.profile_digest,
      },
      connection_ref: {
        record_id: connection.connection_id,
        schema_id: connection.schema_version,
        schema_version: "0.1.0",
        content_digest: connection.connection_digest,
      },
      max_limits: {
        calls: 1,
        bytes: 262_144,
        duration_ms: 30_000,
        records: 1,
        model_tokens: 10_000,
        browser_actions: 0,
        retries: 0,
      },
      issued_at: "2026-08-22T19:00:00.000Z",
      expires_at: "2026-08-22T21:00:00.000Z",
      revocation_state: "current",
    });
    const { now: _now, ...authorizationTemplate } = base.authorization;
    const authorization = {
      ...authorizationTemplate,
      policies: authorizationTemplate.policies.map((policy) => ({
        ...policy,
        permitted_data_classes: [
          "approved_example",
          "counterexample",
          "project_fact",
          "review_finding",
          "task_context",
        ],
      })),
      request: {
        ...authorizationTemplate.request,
        operation_id: "operation.strategy.fixture",
        resource_scope: ["project.fixture", task.task_id],
        data_classes: [
          "approved_example",
          "counterexample",
          "project_fact",
          "review_finding",
          "task_context",
        ],
      },
      capability_grant: grant,
    };
    const strategyOutput = {
      authority_effect: "none",
      value_proposition: {
        headline: "Make uncertain payment states safer to act on.",
        explanation: "State uncertainty before recovery so another attempt does not create avoidable risk.",
        fact_refs: ["fact.payment-outcome-can-be-unknown"],
      },
      message_hierarchy: [{
        priority: 1,
        purpose: "state",
        guidance: "State only what the product currently knows.",
      }],
      navigation_recommendations: [],
      prohibited_claim_handling: [{
        claim: "guaranteed outcome",
        disposition: "remove",
        rationale: "The source facts do not establish a guaranteed outcome.",
      }],
      evidence_refs: ["source.product"],
      pattern_refs: ["pattern.recovery.unknown-outcome"],
      uncertainty: ["The exact status destination remains product-owned."],
      tradeoffs: ["The safer recovery is longer but prevents an unsafe retry."],
    };
    const draftOutput = {
      authority_effect: "none",
      alternatives: [{
        purpose: "payment_outcome_unknown",
        original_text: "Payment failed. Try again.",
        proposed_text: "We couldn’t confirm this payment. Check its status before trying again.",
        rationale: "Preserves the unknown outcome and puts verification before recovery.",
        occurrence_refs: ["occurrence.checkout.payment-status"],
        evidence_refs: ["source.product"],
        pattern_refs: ["pattern.recovery.unknown-outcome"],
        uncertainty: "The exact status destination remains product-owned.",
      }],
      message_hierarchy: ["State the known condition.", "Give the safe next action."],
      evidence_refs: ["source.product"],
      pattern_refs: ["pattern.recovery.unknown-outcome"],
      prohibited_claims_omitted: ["guaranteed outcome"],
      uncertainty: ["No draft is approved or implemented."],
      tradeoffs: ["The safer message is longer."],
    };
    const rewriteOutput = {
      authority_effect: "none",
      approval_status: "not_requested",
      diffs: [{
        source_artifact: "src/Checkout.tsx",
        line: 12,
        column: 5,
        before: "Payment failed. Try again.",
        after: "We couldn’t confirm this payment. Check its status before trying again.",
        rationale: "Preserves state uncertainty before recovery.",
        evidence_refs: ["source.product"],
        pattern_refs: ["pattern.recovery.unknown-outcome"],
        acceptance_criteria: ["Do not declare failure when status is unknown."],
        mutation_status: "not_applied",
      }],
      evidence_refs: ["source.product"],
      pattern_refs: ["pattern.recovery.unknown-outcome"],
      uncertainty: ["Rendered behavior and approval are not established."],
      tradeoffs: ["The safer message is longer."],
      verification_plan: ["Verify the exact source bytes before any authorized apply."],
      rollback_plan: "Restore the captured original bytes under separate authority.",
    };
    const outputs = [strategyOutput, draftOutput, rewriteOutput];
    let sends = 0;
    const port = createGovernedOpenAIModelExecutionPort({
      project_root: directory,
      model_profile_ref: modelProfile.profile_id,
      connection_ref: connection.connection_id,
      grant_ref: grant.grant_id,
      control_refs: ["control.connection", "control.processing", "control.memory", "control.telemetry"],
      actor_ref: "actor.fixture",
      clock: { now: () => PROVIDER_NOW },
      signer: providerPlanSigner(),
      store,
      configuration: {
        async resolve() {
          return {
            authorization,
            adapter_id: "adapter.openai.responses",
            adapter_version: "0.1.0",
            model_profile: modelProfile,
            data_handling_profile: dataProfile,
            connection,
            secret_ref: base.secret_ref!,
            header_template: base.header_template!,
            provider_grant: grant,
            revocation_checkpoint: base.revocation_checkpoint,
            audit_available: true,
          };
        },
      },
      audit: new AppendOnlyProviderAudit(store),
      next_execution: (request) => ({
        expires_at: "2026-08-22T20:01:00.000Z",
        nonce: `nonce.openai.${request.operation}-writer.fixture`,
      }),
      openai: {
        environment: "test",
        test_origin: "https://captured-openai.test",
        secret_resolver: {
          async resolve(ref) {
            return {
              secret_ref_id: ref.secret_ref_id,
              environment: "test",
              async withSecret<T>(use: (secret: string) => Promise<T>): Promise<T> {
                return use("sk-captured-fixture-not-real");
              },
            };
          },
        },
        transport: {
          async send() {
            const output = outputs[sends];
            if (output === undefined) throw new Error("unexpected provider call");
            sends += 1;
            return {
              status: 200,
              headers: { "content-type": "application/json" },
              body_bytes: Buffer.from(JSON.stringify({
                id: "resp_strategy_fixture",
                created_at: 1787428801,
                status: "completed",
                model: "gpt-fixture",
                output: [{
                  type: "message",
                  role: "assistant",
                  content: [{ type: "output_text", text: JSON.stringify(output) }],
                }],
                service_tier: "default",
                store: false,
                usage: {
                  input_tokens: 200,
                  output_tokens: 80,
                  total_tokens: 280,
                  input_tokens_details: { cached_tokens: 0 },
                },
              }), "utf8"),
              received_at: "2026-08-22T20:00:00.100Z",
            };
          },
        },
      },
    });
    const execution: WriterModelExecutionContext = {
      project_id: "project.fixture",
      surface: "checkout",
      memory_scope: "project",
      requested_provider_id: "provider.openai",
      requested_model_profile_ref: {
        record_id: modelProfile.profile_id,
        schema_id: modelProfile.schema_version,
        schema_version: "0.1.0",
        content_digest: modelProfile.profile_digest,
      },
      requested_model_id: "gpt-fixture",
      context_packet_ref: {
        record_id: "context.fixture",
        schema_id: "contentmd.context-packet",
        schema_version: "0.1.0",
        content_digest: "2".repeat(64),
      },
      retrieval_snapshot_ref: null,
      context_items: [],
      resource_limits: {
        maximum_calls: 1,
        maximum_retries: 0,
        maximum_input_bytes: 131_072,
        maximum_output_bytes: 32_768,
        maximum_input_tokens: 8_000,
        maximum_output_tokens: 2_000,
        timeout_ms: 30_000,
      },
    };
    const reviewFixture = reviewFindingFixture(task, execution.project_id);
    const reviewContext = createReviewFindingPromptContext(reviewFixture.input);
    execution.context_items = [
      createProjectFactPromptContext(projectFactFixture(task).input),
      createProductExamplePromptContext(approvedExample.input),
      createProductExamplePromptContext(counterexample.input),
      reviewContext,
    ];

    const proposal = await proposeContentStrategy(port, {
      task,
      review_finding_refs: [reviewFixture.finding.finding_id],
      pattern_refs: ["pattern.recovery.unknown-outcome"],
      execution,
    });
    const postStrategyExecution = {
      ...execution,
      context_items: execution.context_items.filter((item) => (
        item.data_class !== "review_finding"
      )),
    };
    const draft = await proposeContentDraft(port, {
      task,
      strategy: proposal,
      execution: postStrategyExecution,
    });
    const rewrite = await proposeContentRewrite(port, {
      task,
      strategy: proposal,
      draft,
      execution: postStrategyExecution,
    });

    expect(proposal).toMatchObject({
      lifecycle_state: "proposed",
      authority_effect: "none",
      value_proposition: { headline: "Make uncertain payment states safer to act on." },
      model_trace: { provider_id: "provider.openai", model_id: "gpt-fixture" },
    });
    expect(proposal).not.toHaveProperty("decision_id");
    expect(proposal).not.toHaveProperty("approval_id");
    expect(draft).toMatchObject({
      lifecycle_state: "proposed",
      authority_effect: "none",
      alternatives: [{ purpose: "payment_outcome_unknown" }],
    });
    expect(rewrite).toMatchObject({
      lifecycle_state: "proposed",
      authority_effect: "none",
      approval_status: "not_requested",
      diffs: [{ mutation_status: "not_applied" }],
    });
    expect(rewrite).not.toHaveProperty("decision_id");
    expect(rewrite).not.toHaveProperty("approval_id");
    expect(sends).toBe(3);
    const audit = Buffer.from(await store.exportCanonical()).toString("utf8");
    expect(audit).not.toContain(strategyOutput.value_proposition.headline);
    expect(audit).not.toContain("sk-captured-fixture-not-real");
    store.close();
  });
});
