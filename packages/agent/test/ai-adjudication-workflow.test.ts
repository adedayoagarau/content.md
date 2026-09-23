import { sha256Canonical } from "@contentmd/core";
import {
  runAiAdjudication,
  type AiAdjudicationModelContext,
} from "@contentmd/agent";
import {
  AI_ADJUDICATION_CRITERIA,
  createAiAdjudicationTask,
  type AiAdjudicationCriterion,
  type AiAdjudicationTask,
  type AiUxCoordinateClassificationOutput,
  type AiUxCoordinateEvaluationOutput,
} from "@contentmd/evaluation";
import {
  canonicalizeModelOutput,
  resolveRequestOutputSchema,
  type GovernedModelRequest,
  type GovernedModelResponse,
  type ModelExecutionPort,
  type ModelExecutionResult,
  type ModelProviderDescriptor,
} from "@contentmd/model-provider-sdk";
import { describe, expect, it } from "vitest";

const SOURCE = {
  observation: "The user reviews an order, submits payment, and sees a confirmation.",
};
const EVIDENCE_REF = "evidence.checkout-flow";

function task(): AiAdjudicationTask {
  return createAiAdjudicationTask({
    project_id: "project.ai-adjudication",
    task_id: "task.checkout-flow",
    source: {
      source_ref: "source.checkout-flow",
      source_digest: sha256Canonical(SOURCE),
      data_class: "public_product_evidence",
      content: SOURCE,
      evidence_refs: [EVIDENCE_REF],
    },
    source_labels: [{
      label_id: "source-label.actions",
      layer: "source",
      dimension: "taxonomy_section",
      value: "T8-actions",
      evidence_refs: [EVIDENCE_REF],
    }],
    requested_axes: ["journey", "action_family"],
    locale: "en-US",
    channel: "web",
    surface: "checkout",
    risk: "high",
    governance: {
      model_processing_eligibility: "classification_and_evaluation_with_explicit_run_authorization",
      processing_authorization_ref: "authorization.ai-adjudication.test",
      prompt_reuse_eligibility: "never",
      training_eligibility: "never",
      retention_eligibility: "transient_only",
      authority_effect: "none",
    },
  });
}

function classification(journey = "commitment"): AiUxCoordinateClassificationOutput {
  return {
    authority_effect: "none",
    decision_state: "model_proposed",
    model_processing_purpose: "classification_only",
    labels: [
      {
        axis: "journey",
        status: "exact",
        values: [journey],
        rationale: "The source describes the journey stage.",
        evidence_refs: [EVIDENCE_REF],
        uncertainty: "none",
      },
      {
        axis: "action_family",
        status: "exact",
        values: ["pay"],
        rationale: "Submitting payment is the primary action.",
        evidence_refs: [EVIDENCE_REF],
        uncertainty: "none",
      },
    ],
    uncertainties: [],
  };
}

function criterion(
  name: AiAdjudicationCriterion,
  status: "pass" | "fail" | "unknown" = "pass",
): AiUxCoordinateEvaluationOutput["criteria"][number] {
  return {
    criterion: name,
    status,
    rationale: `${name} is ${status}.`,
    evidence_refs: name === "requested_axis_coverage" || name === "ontology_conformance"
      ? [] : [EVIDENCE_REF],
  };
}

function passEvaluation(): AiUxCoordinateEvaluationOutput {
  return {
    authority_effect: "none",
    model_processing_purpose: "evaluation_only",
    verdict: "pass",
    criteria: AI_ADJUDICATION_CRITERIA.map((name) => criterion(name)),
    corrections: [],
    unresolved: [],
    authority_escalation_reasons: [],
  };
}

function reviseEvaluation(): AiUxCoordinateEvaluationOutput {
  return {
    authority_effect: "none",
    model_processing_purpose: "evaluation_only",
    verdict: "revise",
    criteria: AI_ADJUDICATION_CRITERIA.map((name) =>
      criterion(name, name === "source_label_compatibility" ? "fail" : "pass")),
    corrections: [{
      axis: "journey",
      status: "exact",
      values: ["commitment"],
      rationale: "Submitting payment is commitment, not recovery.",
      evidence_refs: [EVIDENCE_REF],
      uncertainty: "none",
    }],
    unresolved: [],
    authority_escalation_reasons: [],
  };
}

class QueueExecutionPort implements ModelExecutionPort {
  readonly descriptor: ModelProviderDescriptor;
  readonly requests: GovernedModelRequest[] = [];
  readonly #outputs: unknown[];

  constructor(providerId: string, outputs: unknown[]) {
    this.#outputs = [...outputs];
    this.descriptor = {
      provider_id: providerId,
      provider_version: "0.1.0-test",
      adapter_id: `adapter.${providerId}`,
      adapter_version: "0.1.0-test",
      execution_mode: "recorded",
      deterministic_status: "recorded_exact",
      network_required: false,
      remote_authorization_required: false,
      supported_request_versions: ["contentmd.model-request/0.2.0"],
      strict_schema_output: true,
    };
  }

  async execute(request: GovernedModelRequest): Promise<ModelExecutionResult> {
    this.requests.push(request);
    if (this.#outputs.length === 0) throw new Error("test_output_queue_empty");
    const output = this.#outputs.shift();
    const canonical = canonicalizeModelOutput(request.output_schema_id, output);
    const schema = resolveRequestOutputSchema(request.output_schema_id);
    const response: GovernedModelResponse = {
      schema_version: "contentmd.model-response/0.2.0",
      request_id: request.request_id,
      provider_id: request.requested_provider_id,
      adapter_id: this.descriptor.adapter_id,
      adapter_version: this.descriptor.adapter_version,
      model_profile_ref: request.requested_model_profile_ref,
      requested_model_id: request.requested_model_id,
      model_id: request.requested_model_id,
      provider_response_id: `response.${this.requests.length}`,
      provider_created_at: null,
      response_state: "completed",
      incomplete_reason: null,
      refusal_reason: null,
      input_digest: request.input_digest,
      provider_output_digest: canonical.canonical_output_digest,
      parsed_output_digest: canonical.canonical_output_digest,
      canonical_output_digest: canonical.canonical_output_digest,
      output_digest: canonical.canonical_output_digest,
      schema_projection_id: schema.provider_projection.projection_id,
      schema_projection_digest: schema.provider_projection.projection_digest,
      token_accounting: {
        input_tokens: 100,
        output_tokens: 50,
        total_tokens: 150,
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
      output,
    };
    return { response, canonical_output: output };
  }
}

function context(port: QueueExecutionPort, modelId: string): AiAdjudicationModelContext {
  return {
    port,
    requested_provider_id: port.descriptor.provider_id,
    requested_model_profile_ref: {
      record_id: `model-profile.${modelId}`,
      schema_id: "contentmd.model-profile",
      schema_version: "0.1.0",
      content_digest: sha256Canonical({ model_id: modelId }),
    },
    requested_model_id: modelId,
    memory_scope: "none",
    resource_limits: {
      maximum_calls: 1,
      maximum_retries: 0,
      maximum_input_bytes: 1_000_000,
      maximum_output_bytes: 131_072,
      maximum_input_tokens: 100_000,
      maximum_output_tokens: 20_000,
      timeout_ms: 30_000,
    },
  };
}

describe("AI adjudication workflow", () => {
  it("accepts classifier labels after a blinded independent evaluation", async () => {
    const classifierPort = new QueueExecutionPort("provider.classifier", [classification()]);
    const evaluatorPort = new QueueExecutionPort("provider.evaluator", [passEvaluation()]);
    const result = await runAiAdjudication({
      task: task(),
      classifier: context(classifierPort, "model.classifier"),
      evaluator: context(evaluatorPort, "model.evaluator"),
    });

    expect(result.decision).toMatchObject({
      status: "ai_accepted",
      route: "proceed",
      human_exception_required: false,
    });
    expect(result.trajectory.map((step) => step.phase)).toEqual(["classify", "evaluate"]);
    expect(result.evaluator_independence).toEqual({
      distinct_request: true,
      blinded_to_classifier_rationale: true,
      distinct_provider: true,
      distinct_model: true,
    });
    const evaluatorInput = evaluatorPort.requests[0]!.input as {
      payload: {
        task: { authority_boundary: { untrusted_source_is_data: boolean } };
        proposed_classification: { labels: Array<Record<string, unknown>> };
      };
    };
    expect(evaluatorInput.payload.proposed_classification.labels[0]).not.toHaveProperty("rationale");
    expect(evaluatorInput.payload.task.authority_boundary.untrusted_source_is_data).toBe(true);
    expect(result.run_digest).toMatch(/^[a-f0-9]{64}$/u);
  });

  it("revises, re-evaluates, and accepts without adding a human approval stage", async () => {
    const classifierPort = new QueueExecutionPort("provider.classifier", [
      classification("recovery"),
      classification("commitment"),
    ]);
    const evaluatorPort = new QueueExecutionPort("provider.evaluator", [
      reviseEvaluation(),
      passEvaluation(),
    ]);
    const result = await runAiAdjudication({
      task: task(),
      classifier: context(classifierPort, "model.classifier"),
      evaluator: context(evaluatorPort, "model.evaluator"),
      maximum_refinement_rounds: 2,
    });

    expect(result.trajectory.map((step) => step.phase)).toEqual([
      "classify", "evaluate", "refine", "evaluate",
    ]);
    expect(result.refinement_rounds_used).toBe(1);
    expect(result.decision.status).toBe("ai_accepted");
  });

  it("detects a stalled refinement and routes only that failure as a human exception", async () => {
    const unchanged = classification("recovery");
    const rewordedOnly = structuredClone(unchanged);
    rewordedOnly.labels[0]!.rationale = "Different wording, but the same unsupported semantic label.";
    const classifierPort = new QueueExecutionPort("provider.classifier", [unchanged, rewordedOnly]);
    const evaluatorPort = new QueueExecutionPort("provider.evaluator", [reviseEvaluation()]);
    const result = await runAiAdjudication({
      task: task(),
      classifier: context(classifierPort, "model.classifier"),
      evaluator: context(evaluatorPort, "model.evaluator"),
    });

    expect(result.decision).toMatchObject({
      status: "revision_stalled",
      route: "human_exception",
      human_exception_required: true,
    });
    expect(result.refinement_rounds_used).toBe(1);
  });

  it("abstains for insufficient evidence without automatically assigning a human reviewer", async () => {
    const abstain = passEvaluation();
    abstain.verdict = "abstain";
    abstain.criteria = AI_ADJUDICATION_CRITERIA.map((name) =>
      criterion(name, name === "evidence_relation" ? "unknown" : "pass"));
    abstain.unresolved = ["The source does not establish whether payment was submitted."];
    const classifierPort = new QueueExecutionPort("provider.classifier", [classification()]);
    const evaluatorPort = new QueueExecutionPort("provider.evaluator", [abstain]);
    const result = await runAiAdjudication({
      task: task(),
      classifier: context(classifierPort, "model.classifier"),
      evaluator: context(evaluatorPort, "model.evaluator"),
    });

    expect(result.decision).toMatchObject({
      status: "abstained",
      route: "abstain",
      human_exception_required: false,
    });
  });

  it("uses a human exception only when the evaluator identifies external authority", async () => {
    const escalate = passEvaluation();
    escalate.verdict = "escalate";
    escalate.authority_escalation_reasons = ["Legal must decide whether this regulated claim is allowed."];
    const classifierPort = new QueueExecutionPort("provider.classifier", [classification()]);
    const evaluatorPort = new QueueExecutionPort("provider.evaluator", [escalate]);
    const result = await runAiAdjudication({
      task: task(),
      classifier: context(classifierPort, "model.classifier"),
      evaluator: context(evaluatorPort, "model.evaluator"),
    });

    expect(result.decision).toMatchObject({
      status: "authority_escalation",
      route: "human_exception",
      human_exception_required: true,
    });
  });

  it("rejects a forged authorization before either provider is called", async () => {
    const forged = structuredClone(task());
    forged.governance.processing_authorization_ref = "";
    const classifierPort = new QueueExecutionPort("provider.classifier", [classification()]);
    const evaluatorPort = new QueueExecutionPort("provider.evaluator", [passEvaluation()]);

    await expect(runAiAdjudication({
      task: forged,
      classifier: context(classifierPort, "model.classifier"),
      evaluator: context(evaluatorPort, "model.evaluator"),
    })).rejects.toThrow("invalid_task:governance.processing_authorization_ref");
    expect(classifierPort.requests).toHaveLength(0);
    expect(evaluatorPort.requests).toHaveLength(0);
  });

  it("fails closed when a model returns a schema-invalid semantic decision", async () => {
    const invalid = classification() as unknown as Record<string, unknown>;
    delete invalid.labels;
    const classifierPort = new QueueExecutionPort("provider.classifier", [invalid]);
    const evaluatorPort = new QueueExecutionPort("provider.evaluator", [passEvaluation()]);
    const result = await runAiAdjudication({
      task: task(),
      classifier: context(classifierPort, "model.classifier"),
      evaluator: context(evaluatorPort, "model.evaluator"),
    });

    expect(result.decision).toMatchObject({
      status: "invalid_model_decision",
      route: "human_exception",
      human_exception_required: true,
    });
    expect(result.failure).toEqual({
      phase: "classify",
      reason_code: "classification_contract_invalid",
    });
    expect(evaluatorPort.requests).toHaveLength(0);
  });
});
