import { finalizeRecord } from "@contentmd/core";
import { createContentTaskPacket } from "@contentmd/writer";

export function projectFactTask(requiredFactRefs = ["fact.payment-outcome-unknown"]) {
  return createContentTaskPacket({
    task_id: "task.project-fact.fixture",
    product_context_refs: ["product.checkout"],
    audience_job_refs: ["audience.buyer", "job.recover-payment"],
    journey_state_refs: ["journey.checkout", "state.payment-outcome-unknown"],
    semantic_message_ref: "message.safe-payment-recovery",
    required_fact_refs: requiredFactRefs,
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

export function projectFactFixture(
  task = projectFactTask(),
  options: {
    project_id?: string;
    fact_ref?: string;
    source_ref?: string;
    claim?: string;
    locator?: string;
  } = {},
) {
  const projectId = options.project_id ?? "project.fixture";
  const factRef = options.fact_ref ?? task.required_fact_refs[0]!;
  const sourceRef = options.source_ref ?? task.evidence_refs[0]!;
  const scope = {
    memory_scope: "project" as const,
    project_id: projectId,
    resource_refs: [task.product_context_refs[0]!],
    data_classes: ["project_fact"],
  };
  const source = finalizeRecord({
    record_id: sourceRef,
    schema_id: "contentmd.source-record",
    schema_version: "0.1.0" as const,
    record_version: 1,
    scope,
    provenance: [],
    lifecycle_state: "active" as const,
    payload: {
      source_type: "product_specification",
      locator: options.locator ?? "internal://product/checkout/payment-status",
      access_mode: "read_only",
      captured_at: "2026-08-20T10:00:00Z",
      rights_status: "product_owned",
      evidence_strength: "authoritative",
    },
  });
  const fact = finalizeRecord({
    record_id: factRef,
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
      claim: options.claim ?? "A submitted payment can remain in an unknown processing state.",
      observation_strength: "authoritative",
      limitations: ["The final status destination remains product-owned."],
    },
  });
  const approval = finalizeRecord({
    record_id: `approval.${factRef}`,
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
      scope: ["data_class:project_fact", `project:${projectId}`],
      status: "issued" as const,
      issued_at: "2026-08-20T12:00:00Z",
      expires_at: null,
      revocation_state: "current" as const,
    },
  });
  return {
    task,
    input: {
      project_id: projectId,
      evaluation_at: "2026-08-22T12:00:00Z",
      task,
      fact_record: fact,
      source_records: [source],
      approval_record: approval,
    },
    source,
    fact,
    approval,
  };
}
