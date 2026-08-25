import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { finalizeRecord } from "../packages/core/src/index.ts";
import { reviewContent } from "../packages/evaluation/src/index.ts";
import {
  canonicalizeModelOutput,
  modelRequestDigest,
  resolveRequestOutputSchema,
  type GovernedModelRequest,
  type ModelExecutionPort,
  type ModelExecutionResult,
  type ModelProviderDescriptor,
} from "../packages/model-provider-sdk/src/index.ts";
import {
  createContentTaskPacket,
  createProductExamplePromptContext,
  createProjectFactPromptContext,
  createReviewFindingPromptContext,
  proposeContentDraft,
  proposeContentRewrite,
  proposeContentStrategy,
  type WriterModelExecutionContext,
} from "../packages/writer/src/index.ts";

const task = createContentTaskPacket({
  task_id: "task.fixture.checkout-content",
  product_context_refs: ["product.beacon"],
  audience_job_refs: ["audience.merchant-content-designer", "job.inspect-payment-states"],
  journey_state_refs: ["journey.checkout", "state.payment-outcome-unknown"],
  semantic_message_ref: "message.safe-payment-recovery",
  required_fact_refs: ["fact.payment-outcome-can-be-unknown", "fact.workspace-delete-local-only"],
  prohibited_claims: ["smartest", "guaranteed outcome", "external publication authority"],
  consequence: "A second payment attempt may duplicate a still-processing attempt.",
  recovery: "Check the submitted payment status before another attempt.",
  channel: "web",
  locale: "en-US",
  risk: "high",
  evidence_refs: ["source.product", "source.design", "review.fixture"],
  acceptance_criteria: [
    "Do not declare failure when the outcome is unknown.",
    "Do not invite another payment before status verification.",
    "Name destructive actions and their affected object.",
  ],
});

function projectFactContext(input: {
  fact_ref: string;
  source_ref: string;
  claim: string;
  locator: string;
  limitation: string;
}) {
  const scope = {
    memory_scope: "project" as const,
    project_id: "project.synthetic-web-app",
    resource_refs: ["product.beacon"],
    data_classes: ["project_fact"],
  };
  const source = finalizeRecord({
    record_id: input.source_ref,
    schema_id: "contentmd.source-record",
    schema_version: "0.1.0" as const,
    record_version: 1,
    scope,
    provenance: [],
    lifecycle_state: "active" as const,
    payload: {
      source_type: "product_fixture",
      locator: input.locator,
      access_mode: "read_only",
      captured_at: "2026-08-20T10:00:00Z",
      rights_status: "product_owned",
      evidence_strength: "authoritative",
    },
  });
  const fact = finalizeRecord({
    record_id: input.fact_ref,
    schema_id: "contentmd.evidence-record",
    schema_version: "0.1.0" as const,
    record_version: 1,
    scope,
    provenance: [{
      record_id: source.record_id,
      relationship: "supported_by",
      content_digest: source.content_digest,
    }],
    lifecycle_state: "active" as const,
    payload: {
      source_refs: [source.record_id],
      claim: input.claim,
      observation_strength: "authoritative",
      limitations: [input.limitation],
    },
  });
  const approval = finalizeRecord({
    record_id: `approval.${input.fact_ref}`,
    schema_id: "contentmd.approval-record",
    schema_version: "0.1.0" as const,
    record_version: 1,
    scope,
    provenance: [{
      record_id: fact.record_id,
      relationship: "approves",
      content_digest: fact.content_digest,
    }],
    lifecycle_state: "active" as const,
    payload: {
      approval_class: "semantic_decision" as const,
      subject_ref: fact.record_id,
      subject_digest: fact.content_digest,
      scope: ["data_class:project_fact", "project:project.synthetic-web-app"],
      status: "issued" as const,
      issued_at: "2026-08-20T12:00:00Z",
      expires_at: null,
      revocation_state: "current" as const,
    },
  });
  return createProjectFactPromptContext({
    project_id: "project.synthetic-web-app",
    evaluation_at: "2026-08-22T20:00:00Z",
    task,
    fact_record: fact,
    source_records: [source],
    approval_record: approval,
  });
}

const reviewInput = {
  project_id: "project.synthetic-web-app",
  occurrences: [
    {
      occurrence_id: "occurrence.review.payment-failed",
      source_artifact: "src/components/CheckoutSummary.tsx",
      line: 5,
      column: 5,
      syntax_kind: "jsx_text",
      expression_payload: "Payment failed.",
      locale: "en-US",
      channel: "web",
      modality: "visual",
      component: "CheckoutSummary",
      route: "/checkout",
      semantic_context: "payment-status",
    },
    {
      occurrence_id: "occurrence.review.smartest",
      source_artifact: "src/components/CheckoutSummary.tsx",
      line: 2,
      column: 5,
      syntax_kind: "jsx_text",
      expression_payload: "The smartest checkout.",
      locale: "en-US",
      channel: "web",
      modality: "visual",
      component: "CheckoutSummary",
      route: "/checkout",
      semantic_context: "value-proposition",
    },
    {
      occurrence_id: "occurrence.review.try-again",
      source_artifact: "src/components/CheckoutSummary.tsx",
      line: 6,
      column: 5,
      syntax_kind: "jsx_text",
      expression_payload: "Try again.",
      locale: "en-US",
      channel: "web",
      modality: "visual",
      component: "CheckoutSummary",
      route: "/checkout",
      semantic_context: "payment-recovery",
    },
  ],
  evidence_refs: ["review.fixture"],
  product_facts: {
    payment_outcome_after_submission: "unknown_possible" as const,
    workspace_delete_effect: "local_only" as const,
  },
};
const reviewReport = reviewContent(reviewInput);
const reviewRuleIds = new Set([
  "content.unsupported-superlative",
  "content.state-mismatch",
  "content.unsafe-retry",
]);
const reviewFindingContexts = reviewReport.findings
  .filter((finding) => reviewRuleIds.has(finding.rule_id))
  .map((finding) => createReviewFindingPromptContext({
    project_id: reviewInput.project_id,
    task,
    review_input: reviewInput,
    review_report: reviewReport,
    finding_id: finding.finding_id,
  }));
if (reviewFindingContexts.length !== reviewRuleIds.size) {
  throw new Error("review finding fixture is incomplete");
}
const reviewFindingRefs = reviewFindingContexts
  .map((context) => context.source_ref.record_id)
  .sort();

function productExampleContext(input: {
  data_class: "approved_example" | "counterexample";
  expression_id: string;
  expression_payload: string;
  approval_id: string;
  review_finding_context: (typeof reviewFindingContexts)[number] | null;
}) {
  const projectId = "project.synthetic-web-app";
  const source = finalizeRecord({
    record_id: "source.product-example",
    schema_id: "contentmd.source-record",
    schema_version: "0.1.0" as const,
    record_version: 1,
    scope: {
      memory_scope: "project" as const,
      project_id: projectId,
      resource_refs: ["product.beacon"],
      data_classes: ["project_owned_expression_source"],
    },
    provenance: [],
    lifecycle_state: "active" as const,
    payload: {
      source_type: "product_fixture",
      locator: "fixture://product/example-source",
      access_mode: "read_only",
      captured_at: "2026-08-20T10:00:00Z",
      rights_status: "project_owned",
      evidence_strength: "authoritative",
    },
  });
  const provenance = [{
    record_id: source.record_id,
    relationship: "derived_from",
    content_digest: source.content_digest,
  }];
  const semanticMessage = finalizeRecord({
    record_id: task.semantic_message_ref,
    schema_id: "contentmd.semantic-message-record",
    schema_version: "0.1.0" as const,
    record_version: 1,
    scope: {
      memory_scope: "project" as const,
      project_id: projectId,
      resource_refs: ["product.beacon"],
      data_classes: ["semantic_message"],
    },
    provenance,
    lifecycle_state: "active" as const,
    payload: {
      intent: "State the unknown payment outcome and provide the safe recovery action.",
      required_facts: [...task.required_fact_refs],
      prohibited_claims: [...task.prohibited_claims],
      journey_state_refs: [...task.journey_state_refs],
    },
  });
  const expressionSlot = finalizeRecord({
    record_id: "slot.payment-recovery.product-example",
    schema_id: "contentmd.expression-slot-record",
    schema_version: "0.1.0" as const,
    record_version: 1,
    scope: {
      memory_scope: "project" as const,
      project_id: projectId,
      resource_refs: ["product.beacon"],
      data_classes: ["expression_slot"],
    },
    provenance,
    lifecycle_state: "active" as const,
    payload: {
      semantic_message_ref: semanticMessage.record_id,
      channel: task.channel,
      modality: "visual",
      surface: "checkout",
      slot: "payment-recovery-message",
      locale: task.locale,
      state_ref: "state.payment-outcome-unknown",
    },
  });
  const expressionVersion = finalizeRecord({
    record_id: input.expression_id,
    schema_id: "contentmd.expression-version-record",
    schema_version: "0.1.0" as const,
    record_version: 1,
    scope: {
      memory_scope: "project" as const,
      project_id: projectId,
      resource_refs: ["product.beacon"],
      data_classes: [input.data_class],
    },
    provenance,
    lifecycle_state: "active" as const,
    payload: {
      expression_slot_ref: expressionSlot.record_id,
      expression_payload: input.expression_payload,
      variables: [],
      decision_ref: input.approval_id,
    },
  });
  const approvalScope = [
    `channel:${task.channel}`,
    `data_class:${input.data_class}`,
    `locale:${task.locale}`,
    `project:${projectId}`,
    "rights:prompt_permitted",
    `semantic_message:${semanticMessage.record_id}`,
    "source_class:project_owned",
    "state:state.payment-outcome-unknown",
    `task:${task.task_id}`,
  ];
  if (input.review_finding_context !== null) {
    approvalScope.push(`finding:${input.review_finding_context.source_ref.record_id}`);
  }
  const approval = finalizeRecord({
    record_id: input.approval_id,
    schema_id: "contentmd.approval-record",
    schema_version: "0.1.0" as const,
    record_version: 1,
    scope: {
      memory_scope: "project" as const,
      project_id: projectId,
      resource_refs: ["product.beacon"],
      data_classes: ["semantic_approval"],
    },
    provenance,
    lifecycle_state: "active" as const,
    payload: {
      approval_class: "semantic_decision" as const,
      subject_ref: expressionVersion.record_id,
      subject_digest: expressionVersion.content_digest,
      scope: approvalScope.sort(),
      status: "issued" as const,
      issued_at: "2026-08-20T12:00:00Z",
      expires_at: null,
      revocation_state: "current" as const,
    },
  });
  return createProductExamplePromptContext({
    project_id: projectId,
    evaluation_at: "2026-08-22T20:00:00Z",
    data_class: input.data_class,
    task,
    expression_version: expressionVersion,
    expression_slot: expressionSlot,
    semantic_message: semanticMessage,
    approval_record: approval,
    lineage_records: [source],
    review_finding_context: input.review_finding_context,
  });
}

const stateMismatchFinding = reviewFindingContexts.find((context) => (
  context.content.rule_id === "content.state-mismatch"
));
if (stateMismatchFinding === undefined) {
  throw new Error("counterexample finding fixture is incomplete");
}
const productExampleContexts = [
  productExampleContext({
    data_class: "approved_example",
    expression_id: "expression.product-example.safe-recovery",
    expression_payload: "We couldn't confirm this payment. Check its status before trying again.",
    approval_id: "approval.product-example.safe-recovery",
    review_finding_context: null,
  }),
  productExampleContext({
    data_class: "counterexample",
    expression_id: "expression.counterexample.payment-failed",
    expression_payload: "Payment failed.",
    approval_id: "approval.counterexample.payment-failed",
    review_finding_context: stateMismatchFinding,
  }),
];

const execution: WriterModelExecutionContext = {
  project_id: "project.synthetic-web-app",
  surface: "checkout",
  memory_scope: "project",
  requested_provider_id: "provider.recorded-fixture",
  requested_model_profile_ref: {
    record_id: "model-profile.synthetic-writer-v2",
    schema_id: "contentmd.model-profile",
    schema_version: "0.1.0",
    content_digest: "e".repeat(64),
  },
  requested_model_id: "model.synthetic-writer-v2",
  context_packet_ref: {
    record_id: "context.synthetic-checkout",
    schema_id: "contentmd.context-packet",
    schema_version: "0.1.0",
    content_digest: "a".repeat(64),
  },
  retrieval_snapshot_ref: {
    record_id: "retrieval.synthetic-approved-patterns",
    schema_id: "contentmd.retrieval-snapshot",
    schema_version: "0.1.0",
    content_digest: "b".repeat(64),
  },
  context_items: [
    projectFactContext({
      fact_ref: "fact.payment-outcome-can-be-unknown",
      source_ref: "source.product",
      claim: "A submitted payment can remain in an unknown processing state.",
      locator: "fixture://product/checkout/payment-status",
      limitation: "The exact status destination remains product-owned.",
    }),
    projectFactContext({
      fact_ref: "fact.workspace-delete-local-only",
      source_ref: "source.design",
      claim: "Deleting a fixture workspace changes local state only and does not cancel or reverse a provider attempt.",
      locator: "fixture://design/workspace-delete",
      limitation: "Live provider behavior is outside the synthetic fixture.",
    }),
    ...productExampleContexts,
    ...reviewFindingContexts,
  ],
  resource_limits: {
    maximum_calls: 1,
    maximum_retries: 0,
    maximum_input_bytes: 262_144,
    maximum_output_bytes: 65_536,
    maximum_input_tokens: 16_000,
    maximum_output_tokens: 4_000,
    timeout_ms: 30_000,
  },
};

const strategyOutput = {
  authority_effect: "none",
  value_proposition: {
    headline: "Design safer checkout content before it ships.",
    explanation: "Map product states, message intent, and recovery paths so content designers can find risk and draft evidence-grounded alternatives.",
    fact_refs: ["fact.payment-outcome-can-be-unknown", "fact.workspace-delete-local-only"],
  },
  message_hierarchy: [
    { priority: 1, purpose: "state", guidance: "State only what the product currently knows." },
    { priority: 2, purpose: "next_action", guidance: "Give the safest available next action." },
    { priority: 3, purpose: "consequence_and_recovery", guidance: "Explain the consequence and when recovery is safe." },
  ],
  navigation_recommendations: [
    { destination: "/workspaces", preferred_label: "Workspace", rationale: "Use one concept name for one destination." },
    { destination: "/checkout", preferred_label: "Checkout", rationale: "Keep the category term stable across routes and messages." },
  ],
  prohibited_claim_handling: [
    { claim: "smartest", disposition: "remove", rationale: "No comparative substantiation is established." },
    { claim: "guaranteed outcome", disposition: "hold_for_evidence", rationale: "The fixture explicitly denies a guaranteed outcome." },
    { claim: "external publication authority", disposition: "hold_for_evidence", rationale: "No publication grant exists." },
  ],
  evidence_refs: ["source.product", "source.design", "review.fixture"],
  pattern_refs: ["pattern.navigation.stable-destination-name", "pattern.recovery.unknown-outcome"],
  uncertainty: ["The preferred checkout concept term still requires an accountable owner decision."],
  tradeoffs: ["More explicit recovery is slightly longer but prevents an unsafe duplicate-payment instruction."],
};

const draftOutput = {
  authority_effect: "none",
  alternatives: [
    {
      purpose: "value_proposition",
      original_text: "Unlock a seamless experience that empowers your journey.",
      proposed_text: "Create and review checkout messages for simulated payment states.",
      rationale: "Names the fixture capability and user task instead of an abstract benefit.",
      occurrence_refs: ["occurrence.730b395d263e52ac61683e8e"],
      evidence_refs: ["source.product"],
      pattern_refs: ["pattern.category-language.concept-term-binding"],
      uncertainty: "The final product positioning requires owner approval.",
    },
    {
      purpose: "payment_outcome_unknown",
      original_text: "Payment failed. Try again.",
      proposed_text: "We couldn’t confirm this payment. Check its status before trying again.",
      rationale: "Preserves the unknown outcome and makes status verification precede another attempt.",
      occurrence_refs: ["occurrence.c5a5933b27777ae418e344bb", "occurrence.91043cbd0d2cd16b48b3fddc"],
      evidence_refs: ["source.product", "review.fixture"],
      pattern_refs: ["pattern.recovery.unknown-outcome"],
      uncertainty: "The exact status destination and attempt reference remain product-owned facts.",
    },
    {
      purpose: "accessible_remove_action",
      original_text: "Action",
      proposed_text: "Remove item from order",
      rationale: "Names the action and affected object for assistive technology.",
      occurrence_refs: ["occurrence.afb5aeb56b2e70391a8099ca"],
      evidence_refs: ["review.fixture"],
      pattern_refs: ["pattern.commitment.name-consequence"],
      uncertainty: "The exact object term must match the selected checkout terminology.",
    },
    {
      purpose: "navigation_destination",
      original_text: "Hub",
      proposed_text: "Workspace",
      rationale: "Uses one label for the /workspaces destination.",
      occurrence_refs: [],
      evidence_refs: ["source.design", "review.fixture"],
      pattern_refs: ["pattern.navigation.stable-destination-name"],
      uncertainty: "The final noun requires an information-architecture owner decision.",
    },
  ],
  message_hierarchy: [
    "State the known product condition.",
    "Give the safe next action.",
    "Explain consequence and recovery.",
  ],
  evidence_refs: ["source.product", "source.design", "review.fixture"],
  pattern_refs: ["pattern.category-language.concept-term-binding", "pattern.commitment.name-consequence", "pattern.navigation.stable-destination-name", "pattern.recovery.unknown-outcome"],
  prohibited_claims_omitted: ["external publication authority", "guaranteed outcome", "smartest"],
  uncertainty: ["No draft is approved, implemented, or observed in a rendered product."],
  tradeoffs: ["The recovery alternative adds words to preserve a safety-critical state distinction."],
};

const rewriteOutput = {
  authority_effect: "none",
  approval_status: "not_requested",
  diffs: [
    {
      source_artifact: "src/components/CheckoutSummary.tsx",
      line: 9,
      column: 29,
      before: "Delete workspace",
      after: "Delete this workspace",
      rationale: "Names the affected object at the exact destructive action while keeping provider-attempt effects out of scope.",
      evidence_refs: ["fact.workspace-delete-local-only", "source.product", "source.design"],
      pattern_refs: ["pattern.commitment.name-consequence"],
      acceptance_criteria: [
        "Change exactly one JSX text occurrence.",
        "Do not imply provider cancellation or reversal.",
        "Preserve the accessible and visible action name relationship.",
      ],
      mutation_status: "not_applied",
    },
  ],
  evidence_refs: ["source.product", "source.design", "review.fixture"],
  pattern_refs: ["pattern.commitment.name-consequence"],
  uncertainty: ["Rendered behavior and owner approval are not established."],
  tradeoffs: ["The demonstrative is slightly longer but makes the current object explicit."],
  verification_plan: [
    "Verify the exact before bytes and coordinate.",
    "Read back the exact changed bytes after an independently authorized apply.",
    "Re-run discovery and the deterministic review.",
  ],
  rollback_plan: "Restore the captured original bytes and independently read them back under a separate governed rollback operation.",
};

const outputs = [strategyOutput, draftOutput, rewriteOutput];
const entries: unknown[] = [];

class CapturingProvider implements ModelExecutionPort {
  readonly descriptor: ModelProviderDescriptor = {
    provider_id: "provider.recorded-fixture",
    provider_version: "0.2.0",
    adapter_id: "adapter.recorded",
    adapter_version: "0.2.0",
    execution_mode: "recorded",
    deterministic_status: "recorded_exact",
    network_required: false,
    remote_authorization_required: false,
    supported_request_versions: ["contentmd.model-request/0.2.0"],
    strict_schema_output: true,
  };
  #index = 0;

  async execute(request: GovernedModelRequest): Promise<ModelExecutionResult> {
    const output = outputs[this.#index];
    if (output === undefined) throw new Error("fixture_output_exhausted");
    this.#index += 1;
    const inputDigest = modelRequestDigest(request);
    const canonical = canonicalizeModelOutput(request.output_schema_id, output);
    const projection = resolveRequestOutputSchema(request.output_schema_id).provider_projection;
    entries.push({
      schema_version: "contentmd.recorded-model-entry/0.2.0",
      request_digest: inputDigest,
      provider_id: "provider.recorded-fixture",
      adapter_id: "adapter.recorded",
      adapter_version: "0.2.0",
      model_id: execution.requested_model_id,
      provider_response_id: `recorded.response.${this.#index}`,
      provider_created_at: null,
      output,
      input_tokens: 100 + this.#index * 10,
      output_tokens: 50 + this.#index * 10,
      cached_input_tokens: 0,
      service_tier: null,
      deterministic_status: "recorded_exact",
    });
    return {
      response: {
        schema_version: "contentmd.model-response/0.2.0",
        request_id: request.request_id,
        provider_id: "provider.recorded-fixture",
        adapter_id: "adapter.recorded",
        adapter_version: "0.2.0",
        model_profile_ref: request.requested_model_profile_ref,
        requested_model_id: request.requested_model_id,
        model_id: execution.requested_model_id,
        provider_response_id: `recorded.response.${this.#index}`,
        provider_created_at: null,
        response_state: "completed",
        incomplete_reason: null,
        refusal_reason: null,
        input_digest: request.input_digest,
        provider_output_digest: canonical.canonical_output_digest,
        parsed_output_digest: canonical.canonical_output_digest,
        canonical_output_digest: canonical.canonical_output_digest,
        output_digest: canonical.canonical_output_digest,
        schema_projection_id: projection.projection_id,
        schema_projection_digest: projection.projection_digest,
        token_accounting: {
          input_tokens: 100 + this.#index * 10,
          output_tokens: 50 + this.#index * 10,
          total_tokens: 150 + this.#index * 20,
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
      },
      canonical_output: output,
    };
  }
}

const provider = new CapturingProvider();
const strategy = await proposeContentStrategy(provider, {
  task,
  review_finding_refs: reviewFindingRefs,
  pattern_refs: ["pattern.recovery.unknown-outcome", "pattern.navigation.stable-destination-name"],
  execution,
});
const postStrategyExecution = {
  ...execution,
  context_items: execution.context_items.filter((item) => item.data_class !== "review_finding"),
};
const draft = await proposeContentDraft(provider, {
  task,
  strategy,
  execution: postStrategyExecution,
});
await proposeContentRewrite(provider, {
  task,
  strategy,
  draft,
  execution: postStrategyExecution,
});

const target = resolve("fixtures/synthetic-web-app/.contentmd-test/recorded-model-responses.jsonl");
const contextTarget = resolve("fixtures/synthetic-web-app/.contentmd-test/writer-execution-context.json");
await writeFile(contextTarget, `${JSON.stringify(execution, null, 2)}\n`, "utf8");
await writeFile(target, `${entries.map((entry) => JSON.stringify(entry)).join("\n")}\n`, "utf8");
console.log(`Wrote replay-verified execution context to ${contextTarget}`);
console.log(`Wrote ${entries.length} deterministic entries to ${target}`);
