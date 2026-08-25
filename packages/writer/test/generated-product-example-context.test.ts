import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  compileStrategyPrompt,
  createContentTaskPacket,
  verifyAndProjectProductExamplePromptContext,
  type ProductExamplePromptContextItem,
  type WriterModelExecutionContext,
} from "@contentmd/writer";

const executionContextPath = fileURLToPath(new URL(
  "../../../fixtures/synthetic-web-app/.contentmd-test/writer-execution-context.json",
  import.meta.url,
));

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

describe("generated product-example execution context", () => {
  it("replays one approved example and one counterexample without exposing their source proof", async () => {
    const execution = JSON.parse(
      await readFile(executionContextPath, "utf8"),
    ) as WriterModelExecutionContext;
    const examples = execution.context_items.filter((item) => (
      item.data_class === "approved_example" || item.data_class === "counterexample"
    )) as ProductExamplePromptContextItem[];

    expect(examples.map((item) => item.data_class).sort()).toEqual([
      "approved_example",
      "counterexample",
    ]);
    const projected = examples.map(verifyAndProjectProductExamplePromptContext);
    expect(projected.every((item) => item.content.project_id === execution.project_id)).toBe(true);

    const prompt = compileStrategyPrompt({
      project_id: execution.project_id,
      task,
      review_finding_refs: execution.context_items
        .filter((item) => item.data_class === "review_finding")
        .map((item) => item.source_ref.record_id),
      pattern_refs: [
        "pattern.navigation.stable-destination-name",
        "pattern.recovery.unknown-outcome",
      ],
      context_packet_ref: execution.context_packet_ref,
      retrieval_snapshot_ref: execution.retrieval_snapshot_ref,
      context_items: execution.context_items,
    });

    expect(prompt.input).toContain("We couldn't confirm this payment. Check its status before trying again.");
    expect(prompt.input).toContain("Payment failed.");
    expect(prompt.input).not.toContain("fixture://product/example-source");
    expect(prompt.input).not.toContain("lineage_records");
    expect(prompt.input).not.toContain('"review_input":');
  });
});
