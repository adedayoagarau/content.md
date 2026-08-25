import { reviewContent, type ReviewInput } from "@contentmd/evaluation";
import { createContentTaskPacket, type ContentTaskPacket } from "@contentmd/writer";

function defaultTask() {
  return createContentTaskPacket({
    task_id: "task.review-finding.fixture",
    product_context_refs: ["product.checkout"],
    audience_job_refs: ["audience.buyer", "job.recover-payment"],
    journey_state_refs: ["journey.checkout", "state.payment-outcome-unknown"],
    semantic_message_ref: "message.safe-payment-recovery",
    required_fact_refs: ["fact.payment-outcome-unknown"],
    prohibited_claims: ["guaranteed outcome"],
    consequence: "Another attempt can duplicate a payment that is still processing.",
    recovery: "Check the payment status before another attempt.",
    channel: "web",
    locale: "en-US",
    risk: "high",
    evidence_refs: ["source.product.payment-status"],
    acceptance_criteria: ["Preserve the unknown outcome."],
  });
}

export function reviewFindingFixture(
  task: ContentTaskPacket = defaultTask(),
  projectId = "project.fixture",
) {
  const reviewInput: ReviewInput = {
    project_id: projectId,
    occurrences: [{
      occurrence_id: "occurrence.payment-error",
      source_artifact: "src/Checkout.tsx",
      line: 12,
      column: 4,
      syntax_kind: "jsx_text",
      expression_payload: "Payment failed. Try again.",
      locale: task.locale,
      channel: task.channel,
      modality: "visual",
      component: "PaymentError",
      route: "/checkout",
      semantic_context: "payment-status",
    }],
    evidence_refs: [task.evidence_refs[0]!],
    product_facts: {
      payment_outcome_after_submission: "unknown_possible",
      workspace_delete_effect: "local_only",
    },
  };
  const reviewReport = reviewContent(reviewInput);
  const finding = reviewReport.findings.find((candidate) => (
    candidate.rule_id === "content.unsafe-retry"
  ));
  if (finding === undefined) throw new Error("review finding fixture is incomplete");
  return {
    projectId,
    task,
    reviewInput,
    reviewReport,
    finding,
    input: {
      project_id: projectId,
      task,
      review_input: reviewInput,
      review_report: reviewReport,
      finding_id: finding.finding_id,
    },
  };
}
