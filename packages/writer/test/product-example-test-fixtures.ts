import { finalizeRecord } from "@contentmd/core";
import {
  createContentTaskPacket,
  createReviewFindingPromptContext,
} from "@contentmd/writer";
import { reviewFindingFixture } from "./review-finding-test-fixtures.js";

const projectId = "project.fixture";
const evaluatedAt = "2026-08-22T12:00:00Z";

const task = createContentTaskPacket({
  task_id: "task.product-example.fixture",
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
  recovery: "Check payment status before another attempt.",
  channel: "web",
  locale: "en-US",
  risk: "high",
  evidence_refs: ["evidence.product"],
  acceptance_criteria: ["Preserve the unknown outcome."],
});

const sourceRecord = finalizeRecord({
  record_id: "source.product-example.fixture",
  schema_id: "contentmd.source-record",
  schema_version: "0.1.0" as const,
  record_version: 1,
  scope: {
    memory_scope: "project" as const,
    project_id: projectId,
    resource_refs: ["resource.checkout"],
    data_classes: ["project_owned_expression_source"],
  },
  provenance: [],
  lifecycle_state: "active" as const,
  payload: {
    source_type: "repository",
    locator: "src/CheckoutRecovery.tsx:14",
    access_mode: "local_read",
    captured_at: "2026-08-20T12:00:00Z",
    rights_status: "project_owned",
    evidence_strength: "authoritative",
  },
});

const sourceProvenance = [{
  record_id: sourceRecord.record_id,
  relationship: "derived_from",
  content_digest: sourceRecord.content_digest,
}];

const semanticMessage = finalizeRecord({
  record_id: task.semantic_message_ref,
  schema_id: "contentmd.semantic-message-record",
  schema_version: "0.1.0" as const,
  record_version: 1,
  scope: {
    memory_scope: "project" as const,
    project_id: projectId,
    resource_refs: ["resource.checkout"],
    data_classes: ["semantic_message"],
  },
  provenance: sourceProvenance,
  lifecycle_state: "active" as const,
  payload: {
    intent: "State the unknown payment outcome and provide the safe recovery action.",
    required_facts: [...task.required_fact_refs],
    prohibited_claims: [...task.prohibited_claims],
    journey_state_refs: [...task.journey_state_refs],
  },
});

const expressionSlot = finalizeRecord({
  record_id: "slot.payment-recovery.fixture",
  schema_id: "contentmd.expression-slot-record",
  schema_version: "0.1.0" as const,
  record_version: 1,
  scope: {
    memory_scope: "project" as const,
    project_id: projectId,
    resource_refs: ["resource.checkout"],
    data_classes: ["expression_slot"],
  },
  provenance: sourceProvenance,
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

const approvalId = "approval.product-example.fixture";
const expressionVersion = finalizeRecord({
  record_id: "expression.product-example.fixture",
  schema_id: "contentmd.expression-version-record",
  schema_version: "0.1.0" as const,
  record_version: 1,
  scope: {
    memory_scope: "project" as const,
    project_id: projectId,
    resource_refs: ["resource.checkout"],
    data_classes: ["approved_example"],
  },
  provenance: sourceProvenance,
  lifecycle_state: "active" as const,
  payload: {
    expression_slot_ref: expressionSlot.record_id,
    expression_payload: "We couldn't confirm this payment. Check its status before trying again.",
    variables: [],
    decision_ref: approvalId,
  },
});

const approvalRecord = finalizeRecord({
  record_id: approvalId,
  schema_id: "contentmd.approval-record",
  schema_version: "0.1.0" as const,
  record_version: 1,
  scope: {
    memory_scope: "project" as const,
    project_id: projectId,
    resource_refs: ["resource.checkout"],
    data_classes: ["semantic_approval"],
  },
  provenance: sourceProvenance,
  lifecycle_state: "active" as const,
  payload: {
    approval_class: "semantic_decision" as const,
    subject_ref: expressionVersion.record_id,
    subject_digest: expressionVersion.content_digest,
    scope: [
      `channel:${task.channel}`,
      "data_class:approved_example",
      `locale:${task.locale}`,
      `project:${projectId}`,
      "rights:prompt_permitted",
      `semantic_message:${semanticMessage.record_id}`,
      "source_class:project_owned",
      "state:state.payment-outcome-unknown",
      `task:${task.task_id}`,
    ],
    status: "issued" as const,
    issued_at: "2026-08-20T12:00:00Z",
    expires_at: null,
    revocation_state: "current" as const,
  },
});

export function approvedExampleFixture() {
  return {
    projectId,
    task,
    expression: expressionVersion.payload.expression_payload,
    sourceLocator: sourceRecord.payload.locator,
    input: {
      project_id: projectId,
      evaluation_at: evaluatedAt,
      data_class: "approved_example" as const,
      task,
      expression_version: expressionVersion,
      expression_slot: expressionSlot,
      semantic_message: semanticMessage,
      approval_record: approvalRecord,
      lineage_records: [sourceRecord],
      review_finding_context: null,
    },
  };
}

export function counterexampleFixture() {
  const approved = approvedExampleFixture();
  const review = reviewFindingFixture(approved.task, approved.projectId);
  const reviewContext = createReviewFindingPromptContext(review.input);
  const counterexampleApprovalId = "approval.counterexample.fixture";
  const { content_digest: _expressionDigest, ...expressionInput } = approved.input.expression_version;
  const expressionVersion = finalizeRecord({
    ...expressionInput,
    record_id: "expression.counterexample.fixture",
    scope: {
      ...expressionInput.scope,
      data_classes: ["counterexample"],
    },
    payload: {
      ...expressionInput.payload,
      expression_payload: review.reviewInput.occurrences[0]!.expression_payload,
      decision_ref: counterexampleApprovalId,
    },
  });
  const { content_digest: _approvalDigest, ...approvalInput } = approved.input.approval_record;
  const approvalRecord = finalizeRecord({
    ...approvalInput,
    record_id: counterexampleApprovalId,
    payload: {
      ...approvalInput.payload,
      subject_ref: expressionVersion.record_id,
      subject_digest: expressionVersion.content_digest,
      scope: approvalInput.payload.scope
        .map((value) => value === "data_class:approved_example" ? "data_class:counterexample" : value)
        .concat(`finding:${review.finding.finding_id}`),
    },
  });
  return {
    ...approved,
    expression: expressionVersion.payload.expression_payload,
    finding: review.finding,
    input: {
      ...approved.input,
      data_class: "counterexample" as const,
      expression_version: expressionVersion,
      approval_record: approvalRecord,
      review_finding_context: reviewContext,
    },
  };
}
