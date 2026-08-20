import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { RecordedModelProvider } from "@contentmd/model-provider-sdk";
import {
  createContentTaskPacket,
  proposeContentDraft,
  proposeContentRewrite,
  proposeContentStrategy,
} from "@contentmd/writer";

const cassettePath = fileURLToPath(
  new URL("../../../fixtures/synthetic-web-app/.contentmd-test/recorded-model-responses.jsonl", import.meta.url),
);

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

describe("recorded strategy and writing flow", () => {
  it("creates proposal-only strategy, draft, and exact rewrite artifacts", async () => {
    const provider = await RecordedModelProvider.fromFile(cassettePath);
    const strategy = await proposeContentStrategy(provider, {
      task,
      review_finding_refs: [
        "finding.unsupported-claim",
        "finding.state-mismatch",
        "finding.unsafe-retry",
      ],
      pattern_refs: [
        "pattern.recovery.unknown-outcome",
        "pattern.navigation.stable-destination-name",
      ],
    });
    const draft = await proposeContentDraft(provider, { task, strategy });
    const rewrite = await proposeContentRewrite(provider, { task, strategy, draft });

    expect(strategy.authority_effect).toBe("none");
    expect(strategy.lifecycle_state).toBe("proposed");
    expect(strategy.value_proposition.headline).toBe("Design safer checkout content before it ships.");
    expect(strategy.message_hierarchy.length).toBeGreaterThanOrEqual(3);
    expect(strategy.navigation_recommendations).toContainEqual(
      expect.objectContaining({ destination: "/workspaces", preferred_label: "Workspace" }),
    );
    expect(strategy.prohibited_claim_handling).toContainEqual(
      expect.objectContaining({ claim: "smartest", disposition: "remove" }),
    );
    expect(strategy.uncertainty.length).toBeGreaterThan(0);
    expect(strategy.tradeoffs.length).toBeGreaterThan(0);

    expect(draft.alternatives).toContainEqual(
      expect.objectContaining({
        purpose: "payment_outcome_unknown",
        proposed_text: "We couldn’t confirm this payment. Check its status before trying again.",
      }),
    );
    expect(draft.evidence_refs).toEqual(expect.arrayContaining(task.evidence_refs));
    expect(draft.pattern_refs).toContain("pattern.recovery.unknown-outcome");

    expect(rewrite.diffs).toEqual([
      expect.objectContaining({
        source_artifact: "src/components/CheckoutSummary.tsx",
        before: "Delete workspace",
        after: "Delete this workspace",
        mutation_status: "not_applied",
      }),
    ]);
    expect(rewrite.authority_effect).toBe("none");
    expect(rewrite.approval_status).toBe("not_requested");
    expect(rewrite).not.toHaveProperty("decision_id");
    expect(rewrite).not.toHaveProperty("approval_id");
  });
});
