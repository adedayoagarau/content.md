import { describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import {
  resolveRequestOutputSchema,
  type GovernedModelRequest,
  type GovernedModelResponse,
  type ModelExecutionPort,
  type ModelExecutionResult,
  type ModelProviderDescriptor,
} from "@contentmd/model-provider-sdk";
import {
  compileStrategyPrompt,
  createContentTaskPacket,
  createProjectFactPromptContext,
  executeCompiledWriterPrompt,
  proposeContentDraft,
  proposeContentRewrite,
  proposeContentStrategy,
  type WriterModelExecutionContext,
} from "@contentmd/writer";
import { projectFactFixture } from "./project-fact-test-fixtures.js";

const ref = (recordId: string, digestSeed: string) => ({
  record_id: recordId,
  schema_id: "contentmd.fixture-record",
  schema_version: "0.1.0",
  content_digest: digestSeed.repeat(64),
});

const task = createContentTaskPacket({
  task_id: "task.writer-governed.fixture",
  target_occurrence_refs: ["occurrence.fixture.target"],
  voice_profile_refs: [],
  terminology_refs: [],
  decision_status: "proposed",
  product_context_refs: ["product.checkout"],
  audience_job_refs: ["audience.buyer"],
  journey_state_refs: ["journey.checkout", "state.payment-outcome-unknown"],
  semantic_message_ref: "message.safe-payment-recovery",
  required_fact_refs: ["fact.payment-outcome-unknown"],
  prohibited_claims: ["guaranteed outcome"],
  consequence: "A second attempt can duplicate a payment that is still processing.",
  recovery: "Check payment status before another attempt.",
  channel: "web",
  locale: "en-US",
  risk: "high",
  evidence_refs: ["evidence.product"],
  acceptance_criteria: ["Preserve uncertainty."],
});

function executionContext(): WriterModelExecutionContext {
  return {
    project_id: "project.fixture",
    surface: "checkout",
    memory_scope: "project",
    requested_provider_id: "provider.fixture",
    requested_model_profile_ref: ref("model-profile.fixture", "e"),
    requested_model_id: "model.writer.fixture",
    context_packet_ref: ref("context.fixture", "a"),
    retrieval_snapshot_ref: ref("retrieval.fixture", "b"),
    context_items: [createProjectFactPromptContext(projectFactFixture(task).input)],
    resource_limits: {
      maximum_calls: 1,
      maximum_retries: 0,
      maximum_input_bytes: 131_072,
      maximum_output_bytes: 65_536,
      maximum_input_tokens: 8_000,
      maximum_output_tokens: 2_000,
      timeout_ms: 30_000,
    },
  };
}

function strategyOutput() {
  return {
    authority_effect: "none",
    value_proposition: {
      headline: "Recover safely",
      explanation: "Preserve uncertainty and give the safest next action.",
      fact_refs: ["fact.payment-outcome-unknown"],
    },
    message_hierarchy: [{ priority: 1, purpose: "state", guidance: "State uncertainty." }],
    navigation_recommendations: [],
    prohibited_claim_handling: [{
      claim: "guaranteed outcome",
      disposition: "remove",
      rationale: "The product cannot establish that claim.",
    }],
    evidence_refs: ["evidence.product"],
    pattern_refs: ["pattern.safe-recovery"],
    uncertainty: ["The exact status destination remains product-owned."],
    tradeoffs: ["The safer recovery instruction is slightly longer."],
  };
}

function draftOutput() {
  return {
    authority_effect: "none",
    alternatives: [{
      purpose: "payment_outcome_unknown",
      original_text: "Payment failed. Try again.",
      proposed_text: "We couldn't confirm this payment. Check its status before trying again.",
      rationale: "Preserves uncertainty and makes status verification the next action.",
      occurrence_refs: ["occurrence.fixture"],
      evidence_refs: ["evidence.product"],
      pattern_refs: ["pattern.safe-recovery"],
      uncertainty: "The exact status destination remains product-owned.",
    }],
    message_hierarchy: ["State the known condition.", "Give the safe next action."],
    evidence_refs: ["evidence.product"],
    pattern_refs: ["pattern.safe-recovery"],
    prohibited_claims_omitted: ["guaranteed outcome"],
    uncertainty: ["No wording is approved or implemented."],
    tradeoffs: ["The safer recovery instruction is slightly longer."],
  };
}

function rewriteOutput() {
  return {
    authority_effect: "none",
    approval_status: "not_requested",
    diffs: [{
      source_artifact: "src/Checkout.tsx",
      line: 10,
      column: 4,
      before: "Payment failed. Try again.",
      after: "We couldn't confirm this payment. Check its status before trying again.",
      rationale: "Preserves the unknown product state.",
      evidence_refs: ["evidence.product"],
      pattern_refs: ["pattern.safe-recovery"],
      acceptance_criteria: ["Do not imply confirmed failure."],
      mutation_status: "not_applied",
    }],
    evidence_refs: ["evidence.product"],
    pattern_refs: ["pattern.safe-recovery"],
    uncertainty: ["Rendered behavior is not established."],
    tradeoffs: ["The message is longer to preserve safety."],
    verification_plan: ["Verify the exact source coordinate before any authorized apply."],
    rollback_plan: "Restore the captured source bytes under separate authorization.",
  };
}

class StaticExecutionPort implements ModelExecutionPort {
  readonly descriptor: ModelProviderDescriptor = {
    provider_id: "provider.fixture",
    provider_version: "0.2.0",
    adapter_id: "adapter.fixture",
    adapter_version: "0.2.0",
    execution_mode: "recorded",
    deterministic_status: "recorded_exact",
    network_required: false,
    remote_authorization_required: false,
    supported_request_versions: ["contentmd.model-request/0.2.0"],
    strict_schema_output: true,
  };
  readonly requests: GovernedModelRequest[] = [];

  constructor(
    private readonly output: unknown,
    private readonly responseState: GovernedModelResponse["response_state"] = "completed",
  ) {}

  async execute(request: GovernedModelRequest): Promise<ModelExecutionResult> {
    this.requests.push(request);
    const projection = resolveRequestOutputSchema(request.output_schema_id).provider_projection;
    const outputDigest = sha256Canonical(this.output);
    return {
      response: {
        schema_version: "contentmd.model-response/0.2.0",
        request_id: request.request_id,
        provider_id: request.requested_provider_id,
        adapter_id: "adapter.fixture",
        adapter_version: "0.2.0",
        model_profile_ref: request.requested_model_profile_ref,
        requested_model_id: request.requested_model_id,
        model_id: request.requested_model_id,
        provider_response_id: "response.fixture",
        provider_created_at: null,
        response_state: this.responseState,
        incomplete_reason: this.responseState === "incomplete" ? "fixture" : null,
        refusal_reason: this.responseState === "refused" ? "fixture" : null,
        input_digest: request.input_digest,
        provider_output_digest: outputDigest,
        parsed_output_digest: outputDigest,
        canonical_output_digest: outputDigest,
        output_digest: outputDigest,
        schema_projection_id: projection.projection_id,
        schema_projection_digest: projection.projection_digest,
        token_accounting: {
          input_tokens: 10,
          output_tokens: 20,
          total_tokens: 30,
          cached_input_tokens: 0,
        },
        timeout_observed: false,
        retry_count: 0,
        service_tier: null,
        provider_storage_requested: false,
        output_ref: null,
        retention_disposition: "transient_only",
        deterministic_status: "recorded_exact",
        authority_effect: "none",
        output: this.output,
      },
      canonical_output: this.output,
    };
  }
}

describe("governed writer output boundary", () => {
  it("uses the 0.2 execution port and materializes only a proposal", async () => {
    const port = new StaticExecutionPort(strategyOutput());

    const proposal = await proposeContentStrategy(port, {
      task,
      review_finding_refs: [],
      pattern_refs: ["pattern.safe-recovery"],
      execution: executionContext(),
    });

    expect(port.requests).toHaveLength(1);
    expect(port.requests[0]).toEqual(expect.objectContaining({
      schema_version: "contentmd.model-request/0.2.0",
      operation: "strategy",
      output_schema_id: "contentmd.strategy-model-output/0.1.0",
      provider_application_state: "none",
      authority_effect: "none",
    }));
    expect(port.requests[0]?.prompt_template.template_id).toBe("contentmd.prompt.strategy");
    expect(port.requests[0]?.egress_item_digests.length).toBe(2);
    expect(proposal.lifecycle_state).toBe("proposed");
    expect(proposal.authority_effect).toBe("none");
    expect(proposal).not.toHaveProperty("approval_id");
  });

  it("rejects unknown output fields before creating a proposal", async () => {
    const port = new StaticExecutionPort({
      ...strategyOutput(),
      approval_id: "approval.must-not-exist",
    });

    await expect(proposeContentStrategy(port, {
      task,
      review_finding_refs: [],
      pattern_refs: [],
      execution: executionContext(),
    })).rejects.toThrow("model_output_invalid");
  });

  it("rejects a non-completed response before creating a proposal", async () => {
    const port = new StaticExecutionPort(strategyOutput(), "refused");

    await expect(proposeContentStrategy(port, {
      task,
      review_finding_refs: [],
      pattern_refs: [],
      execution: executionContext(),
    })).rejects.toThrow("writer_model_response_not_completed");
  });

  it.each([
    "approved_example",
    "counterexample",
    "uncertainty",
  ] as const)("rejects fabricated %s context before provider execution", async (dataClass) => {
    const execution = executionContext();
    const prompt = compileStrategyPrompt({
      project_id: execution.project_id,
      task,
      review_finding_refs: [],
      pattern_refs: [],
      context_packet_ref: execution.context_packet_ref,
      retrieval_snapshot_ref: execution.retrieval_snapshot_ref,
      context_items: execution.context_items,
    });
    const sourceRef = ref(`${dataClass}.fabricated`, "7");
    const content = { guidance: "No qualification proof exists." };
    const forgedPrompt = structuredClone(prompt);
    forgedPrompt.egress_items.push({
      source_ref: sourceRef,
      data_class: dataClass,
      item_digest: sha256Canonical({
        source_ref: sourceRef,
        data_class: dataClass,
        content,
      }),
    });
    const port = new StaticExecutionPort(strategyOutput());

    await expect(executeCompiledWriterPrompt(port, {
      operation: "strategy",
      output_schema_id: "contentmd.strategy-model-output/0.1.0",
      task,
      prompt: forgedPrompt,
      execution: {
        ...execution,
        context_items: [...execution.context_items, {
          source_ref: sourceRef,
          data_class: dataClass,
          content,
        }],
      },
    })).rejects.toThrow(`writer_unverified_context_forbidden:${dataClass}`);
    expect(port.requests).toHaveLength(0);
  });

  it("runs draft and rewrite through distinct governed schemas without applying changes", async () => {
    const execution = executionContext();
    const strategy = await proposeContentStrategy(new StaticExecutionPort(strategyOutput()), {
      task,
      review_finding_refs: [],
      pattern_refs: ["pattern.safe-recovery"],
      execution,
    });
    const draftPort = new StaticExecutionPort(draftOutput());
    const draft = await proposeContentDraft(draftPort, { task, strategy, execution });
    const rewritePort = new StaticExecutionPort(rewriteOutput());
    const rewrite = await proposeContentRewrite(rewritePort, { task, strategy, draft, execution });

    expect(draftPort.requests[0]?.output_schema_id).toBe("contentmd.draft-model-output/0.1.0");
    expect(rewritePort.requests[0]?.output_schema_id).toBe("contentmd.rewrite-model-output/0.1.0");
    expect(draft.lifecycle_state).toBe("proposed");
    expect(rewrite.lifecycle_state).toBe("proposed");
    expect(rewrite.approval_status).toBe("not_requested");
    expect(rewrite.diffs[0]?.mutation_status).toBe("not_applied");
  });
});
