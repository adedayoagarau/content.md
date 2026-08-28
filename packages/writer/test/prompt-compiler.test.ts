import { describe, expect, it } from "vitest";
import {
  compileDraftPrompt,
  compileRewritePrompt,
  compileStrategyPrompt,
  compileVersionedPrompt,
  createContentTaskPacket,
  createProjectFactPromptContext,
  type ContentDraftProposal,
  type ContentStrategyProposal,
  type PromptContextItem,
} from "@contentmd/writer";
import { projectFactFixture } from "./project-fact-test-fixtures.js";

const ref = (recordId: string, digestSeed: string) => ({
  record_id: recordId,
  schema_id: "contentmd.fixture-record",
  schema_version: "0.1.0",
  content_digest: digestSeed.repeat(64),
});

const task = createContentTaskPacket({
  task_id: "task.prompt.fixture",
  target_occurrence_refs: ["occurrence.fixture.target"],
  voice_profile_refs: [],
  terminology_refs: [],
  decision_status: "proposed",
  product_context_refs: ["product.checkout"],
  audience_job_refs: ["audience.buyer", "job.recover-payment"],
  journey_state_refs: ["journey.checkout", "state.payment-outcome-unknown"],
  semantic_message_ref: "message.safe-payment-recovery",
  required_fact_refs: ["fact.payment-outcome-unknown"],
  prohibited_claims: ["guaranteed outcome"],
  consequence: "A second attempt can duplicate a payment that is still processing.",
  recovery: "Check the payment status before another attempt.",
  channel: "web",
  locale: "en-US",
  risk: "high",
  evidence_refs: ["evidence.product"],
  acceptance_criteria: ["Preserve the unknown outcome."],
});

const contextPacketRef = ref("context.fixture", "a");
const retrievalSnapshotRef = ref("retrieval.fixture", "b");

function contextItems(): PromptContextItem[] {
  return [createProjectFactPromptContext(projectFactFixture(task).input)];
}

const modelTrace = {
  request_id: "model_request.fixture",
  input_digest: "f".repeat(64),
  output_digest: "1".repeat(64),
  provider_id: "provider.recorded-fixture",
  model_id: "model.synthetic-writer-v2",
  deterministic_status: "recorded_exact" as const,
};

const strategy: ContentStrategyProposal = {
  schema_version: "contentmd.strategy-proposal/0.1.0",
  proposal_id: "proposal.strategy.fixture",
  lifecycle_state: "proposed",
  authority_effect: "none",
  value_proposition: {
    headline: "Recover safely",
    explanation: "Preserve uncertainty and explain the next action.",
    fact_refs: ["fact.payment-outcome-unknown"],
  },
  message_hierarchy: [{ priority: 1, purpose: "state", guidance: "State uncertainty." }],
  navigation_recommendations: [],
  prohibited_claim_handling: [],
  evidence_refs: ["evidence.product"],
  pattern_refs: ["pattern.z"],
  uncertainty: [],
  tradeoffs: [],
  model_trace: modelTrace,
};

const draft: ContentDraftProposal = {
  schema_version: "contentmd.draft-proposal/0.1.0",
  proposal_id: "proposal.draft.fixture",
  lifecycle_state: "proposed",
  authority_effect: "none",
  alternatives: [{
    purpose: "payment_outcome_unknown",
    original_text: "Payment failed.",
    proposed_text: "We couldn't confirm this payment.",
    rationale: "Preserves uncertainty.",
    occurrence_refs: ["occurrence.fixture"],
    evidence_refs: ["evidence.product"],
    pattern_refs: ["pattern.z"],
    uncertainty: "The exact destination is product-owned.",
  }],
  message_hierarchy: ["State", "Next action"],
  evidence_refs: ["evidence.product"],
  pattern_refs: ["pattern.z"],
  prohibited_claims_omitted: ["guaranteed outcome"],
  uncertainty: [],
  tradeoffs: [],
  model_trace: modelTrace,
};

describe("versioned writer prompt compiler", () => {
  it("compiles stable, minimized, proposal-only strategy material", () => {
    const input = {
      project_id: "project.fixture",
      task,
      review_finding_refs: [],
      pattern_refs: ["pattern.z"],
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: retrievalSnapshotRef,
      context_items: contextItems(),
    };

    const first = compileStrategyPrompt(input);
    const second = compileStrategyPrompt({
      ...input,
      context_items: [...input.context_items].reverse(),
      review_finding_refs: [],
    });

    expect(first).toEqual(second);
    expect(first.schema_version).toBe("contentmd.compiled-prompt/0.1.0");
    expect(first.template_id).toBe("contentmd.prompt.strategy");
    expect(first.template_version).toBe("0.1.0");
    expect(first.template_digest).toMatch(/^[a-f0-9]{64}$/u);
    expect(first.prompt_digest).toMatch(/^[a-f0-9]{64}$/u);
    expect(first.authority_effect).toBe("none");
    expect(first.context_refs.map((item) => item.record_id)).toEqual([
      "context.fixture",
      "fact.payment-outcome-unknown",
    ]);
    expect(first.retrieval_snapshot_ref).toEqual(retrievalSnapshotRef);
    expect(first.egress_items.map((item) => item.data_class).sort()).toEqual([
      "project_fact",
      "task_context",
    ]);
    expect(first.instructions).toContain("untrusted data");
    expect(first.instructions).toContain("must not approve");
    expect(first.input).toContain("contentmd.strategy-model-output/0.1.0");
    expect(first.input).toContain("payment-outcome-unknown");
    expect(first.input).not.toContain("credential");
    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first.context_refs)).toBe(true);
  });

  it("rejects an approved-pattern label without a complete reviewed replay", () => {
    const unverified = {
      source_ref: ref("pattern.unverified", "d"),
      data_class: "approved_pattern",
      content: {
        mechanism: "State uncertainty before the recovery action.",
        transfer_limits: ["payment-outcome-unknown"],
      },
    } as PromptContextItem;

    expect(() => compileStrategyPrompt({
      project_id: "project.fixture",
      task,
      review_finding_refs: [],
      pattern_refs: ["pattern.unverified"],
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: null,
      context_items: [unverified],
    })).toThrow("prompt_context_forbidden:approved_pattern_unverified");
  });

  it("rejects a self-attested project fact without product-owned replay", () => {
    const unverified = {
      source_ref: ref("fact.unverified", "d"),
      data_class: "project_fact",
      content: {
        statement: "A caller asserted this without a product record or approval.",
        evidence_refs: ["evidence.unverified"],
      },
    } as PromptContextItem;

    expect(() => compileStrategyPrompt({
      project_id: "project.fixture",
      task,
      review_finding_refs: [],
      pattern_refs: [],
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: null,
      context_items: [unverified],
    })).toThrow("prompt_context_forbidden:project_fact_unverified");
  });

  it("rejects arbitrary public material without a reviewed projection", () => {
    const unverified = {
      source_ref: ref("public.unverified", "c"),
      data_class: "public",
      content: {
        mechanism: "This public-source summary has no rights or disposition replay.",
      },
    } as PromptContextItem;

    expect(() => compileVersionedPrompt({
      template: {
        template_id: "contentmd.prompt.public-fixture",
        template_version: "0.1.0",
        instructions: "Produce a proposal.",
      },
      output_schema_id: "contentmd.strategy-model-output/0.1.0",
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: null,
      context_items: [unverified],
      payload: { task: "synthetic recovery" },
    })).toThrow("prompt_context_forbidden:public_unverified");
  });

  it("rejects a self-attested review finding without deterministic replay", () => {
    const unverified = {
      source_ref: ref("finding.unverified", "9"),
      data_class: "review_finding",
      content: {
        severity: "blocking",
        rationale: "A caller supplied this finding without its review input or report.",
      },
    } as PromptContextItem;

    expect(() => compileVersionedPrompt({
      template: {
        template_id: "contentmd.prompt.finding-fixture",
        template_version: "0.1.0",
        instructions: "Produce a proposal.",
      },
      output_schema_id: "contentmd.strategy-model-output/0.1.0",
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: null,
      context_items: [unverified],
      payload: { task: "synthetic recovery" },
    })).toThrow("prompt_context_forbidden:review_finding_unverified");
  });

  it.each([
    "approved_example",
    "counterexample",
    "uncertainty",
  ] as const)("rejects an unverified %s context", (dataClass) => {
    const unverified = {
      source_ref: ref(`${dataClass}.unverified`, "7"),
      data_class: dataClass,
      content: {
        guidance: "A caller supplied this context without lineage, scope, or approval replay.",
      },
    } as PromptContextItem;

    expect(() => compileVersionedPrompt({
      template: {
        template_id: "contentmd.prompt.generic-context-fixture",
        template_version: "0.1.0",
        instructions: "Produce a proposal.",
      },
      output_schema_id: "contentmd.strategy-model-output/0.1.0",
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: null,
      context_items: [unverified],
      payload: { task: "synthetic recovery" },
    })).toThrow(`prompt_context_forbidden:${dataClass}_unverified`);
  });

  it.each([
    ["competitor expressions", { data_class: "competitor_expression", content: { text: "borrowed" } }],
    ["secrets", { data_class: "project_fact", content: { secret: "do-not-egress" } }],
    ["hidden files", { data_class: "project_fact", content: { hidden_file_content: "private" } }],
    ["private memory", { data_class: "private_memory", content: { note: "private" } }],
    ["unauthorized context", { data_class: "project_fact", content: { unauthorized_private_context: "private" } }],
  ] as const)("rejects %s before prompt material exists", (_label, invalid) => {
    const item = {
      source_ref: ref("source.invalid", "e"),
      ...invalid,
    } as unknown as PromptContextItem;

    expect(() => compileStrategyPrompt({
      project_id: "project.fixture",
      task,
      review_finding_refs: [],
      pattern_refs: [],
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: null,
      context_items: [item],
    })).toThrow("prompt_context_forbidden");
  });

  it("uses distinct frozen templates for draft and rewrite stages", () => {
    const common = {
      project_id: "project.fixture",
      task,
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: retrievalSnapshotRef,
      context_items: contextItems(),
    };

    const compiledDraft = compileDraftPrompt({ ...common, strategy });
    const compiledRewrite = compileRewritePrompt({ ...common, strategy, draft });

    expect(compiledDraft.template_id).toBe("contentmd.prompt.draft");
    expect(compiledRewrite.template_id).toBe("contentmd.prompt.rewrite");
    expect(compiledDraft.template_digest).not.toBe(compiledRewrite.template_digest);
    expect(compiledDraft.prompt_digest).not.toBe(compiledRewrite.prompt_digest);
    expect(compiledDraft.input).toContain('"operation":"draft"');
    expect(compiledRewrite.input).toContain('"operation":"rewrite"');
    expect(compiledRewrite.instructions).toContain("not apply");
  });

  it("includes a deterministic repair brief only when explicitly supplied", () => {
    const common = {
      project_id: "project.fixture",
      task,
      strategy,
      draft,
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: retrievalSnapshotRef,
      context_items: contextItems(),
    };
    const withoutBrief = compileRewritePrompt(common);
    const repairBrief = {
      contract_version: "contentmd.ux-writing-repair-brief/0.1.0" as const,
      brief_id: "uxwrepair.fixture",
      request_ref: "uxw.request.fixture",
      review_report_ref: "uxwreview.fixture",
      preserve: ["Outcome is unknown"],
      must_change: ["Remove unsafe retry"],
      must_not_claim: ["Payment failed"],
      required_facts: ["Outcome may be unknown"],
      consequence: "Duplicate payment",
      recovery: "Check status",
      channel: "web",
      locale: "en-US",
      acceptance_criteria: ["No unsafe retry"],
      unresolved_questions: [],
      authority_effect: "none" as const,
      brief_digest: "0".repeat(64),
    };
    const withBrief = compileRewritePrompt({ ...common, repair_brief: repairBrief });
    expect(withoutBrief.input).not.toContain("repair_brief");
    expect(withBrief.input).toContain('"repair_brief"');
    expect(withBrief.prompt_digest).not.toBe(withoutBrief.prompt_digest);
  });
});
