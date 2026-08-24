import { describe, expect, it } from "vitest";
import {
  SCHEMA_IDS,
  validateRecord,
  validateRecordSet,
} from "@contentmd/schemas";

function validSourceRecord() {
  return {
    record_id: "src_fixture_product_001",
    schema_id: SCHEMA_IDS.source,
    schema_version: "0.1.0" as const,
    record_version: 1,
    content_digest: "0".repeat(64),
    scope: {
      memory_scope: "project" as const,
      project_id: "project_fixture_checkout",
      resource_refs: ["PRODUCT.md"],
      data_classes: ["public-synthetic"],
    },
    provenance: [],
    lifecycle_state: "proposed" as const,
    payload: {
      source_type: "product_document",
      locator: "PRODUCT.md",
      access_mode: "local_file",
      captured_at: "2026-08-20T16:00:00.000Z",
      rights_status: "project_owned_synthetic",
      evidence_strength: "direct_read",
    },
  };
}

function validRepeatedCoefficientRankingModel() {
  const digest = "0".repeat(64);
  const digestRef = (recordId: string) => ({
    record_id: recordId,
    schema_id: "contentmd.synthetic-reference-record",
    schema_version: "0.1.0",
    content_digest: digest,
  });
  return {
    record_id: "ranking.model.fixture.repeated.zero",
    schema_id: SCHEMA_IDS.rankingModel,
    schema_version: "0.1.0",
    record_version: 1,
    content_digest: digest,
    scope: {
      memory_scope: "project",
      project_id: "project.synthetic.learning",
      resource_refs: ["fixture.input.synthetic"],
      data_classes: ["project-owned-synthetic"],
    },
    provenance: [{
      record_id: "fixture.source.synthetic",
      relationship: "derived_from",
      content_digest: digest,
    }],
    lifecycle_state: "proposed",
    payload: {
      contract_version: "contentmd.learning-record-contract/0.1.0",
      record_mode: "development_fixture",
      ranking_objective: "expression_preference",
      candidate_kind: "expression",
      schema_digest: digest,
      code_digest: digest,
      input_digest: digest,
      authority_effect: "none",
      algorithm: "pairwise_logistic_l2",
      dataset_ref: digestRef("fixture.dataset"),
      feature_profile_ref: digestRef("fixture.feature.profile"),
      hyperparameters: {
        lambda: 1,
        learning_rate: 0.05,
        maximum_iterations: 2000,
        convergence_delta: 1e-9,
        convergence_patience: 10,
        standardized_clip_lower: -10,
        standardized_clip_upper: 10,
      },
      feature_order: ["project_match", "product_area_match"],
      standardization: [
        { feature_name: "project_match", mean: 0, population_standard_deviation: 1 },
        { feature_name: "product_area_match", mean: 0, population_standard_deviation: 1 },
      ],
      coefficient_bits: ["0000000000000000", "0000000000000000"],
      training_statistics_ref: digestRef("fixture.training.statistics"),
      runtime_profile_ref: {
        artifact_id: "fixture.pairwise.runtime",
        artifact_version: "0.1.0",
        artifact_digest: digest,
      },
      model_artifact_digest: digest,
      model_state: "trained",
    },
  };
}

function validModelTrainingStatisticsRecord() {
  const digest = "0".repeat(64);
  const digestRef = (recordId: string) => ({
    record_id: recordId,
    schema_id: "contentmd.synthetic-reference-record",
    schema_version: "0.1.0",
    content_digest: digest,
  });
  return {
    record_id: "model_training_statistics.fixture",
    schema_id: "contentmd.model-training-statistics-record",
    schema_version: "0.1.0",
    record_version: 1,
    content_digest: digest,
    scope: {
      memory_scope: "project",
      project_id: "project.synthetic.learning",
      resource_refs: ["fixture.dataset"],
      data_classes: ["learning_model_training_statistics"],
    },
    provenance: [
      { record_id: "fixture.dataset", relationship: "trained_from_dataset", content_digest: digest },
      { record_id: "fixture.feature_profile", relationship: "used_feature_profile", content_digest: digest },
    ],
    lifecycle_state: "active",
    payload: {
      contract_version: "contentmd.model-training-statistics/0.1.0",
      record_mode: "development_fixture",
      ranking_objective: "expression_preference",
      candidate_kind: "expression",
      schema_digest: digest,
      dataset_ref: digestRef("fixture.dataset"),
      feature_profile_ref: digestRef("fixture.feature_profile"),
      purpose: "candidate",
      training_input_digest: digest,
      code_digest: digest,
      runtime_profile_ref: {
        artifact_id: "contentmd.pairwise-runtime-profile",
        artifact_version: "0.1.0",
        artifact_digest: digest,
      },
      pair_count: 80,
      feature_count: 21,
      iterations_completed: 10,
      convergence_streak: 10,
      converged: true,
      initial_loss_bits: "3fe62e42fefa39ef",
      final_loss_bits: "3fd0000000000000",
      coefficient_set_digest: digest,
      statistics_state: "completed",
      invalid_stage: null,
      error_code: null,
      authority_effect: "none",
    },
  };
}

type RuntimeSchemaKey =
  | "runtimeDetectionReport"
  | "runtimeProposal"
  | "runtimeBindingDecision"
  | "runtimeBinding"
  | "runtimeConformanceReceipt"
  | "replicaArtifactManifest"
  | "replicaAck";

function runtimeSchemaId(key: RuntimeSchemaKey): string {
  return (SCHEMA_IDS as unknown as Record<RuntimeSchemaKey, string>)[key];
}

function runtimeRecord(schemaKey: RuntimeSchemaKey, recordId: string, payload: unknown) {
  return {
    record_id: recordId,
    schema_id: runtimeSchemaId(schemaKey),
    schema_version: "0.1.0",
    record_version: 1,
    content_digest: "0".repeat(64),
    scope: {
      memory_scope: "project",
      project_id: "project.runtime.fixture",
      resource_refs: ["runtime.fixture"],
      data_classes: ["runtime-metadata"],
    },
    provenance: [{
      record_id: "source.runtime.fixture",
      relationship: "derived_from",
      content_digest: "1".repeat(64),
    }],
    lifecycle_state: "active",
    payload,
  };
}

function runtimeRef(recordId: string, digest = "2".repeat(64)) {
  return { record_id: recordId, record_version: 1, content_digest: digest };
}

function validRuntimeRecords() {
  const digest = "2".repeat(64);
  const detection = runtimeRecord(
    "runtimeDetectionReport",
    "runtime.detection.fixture",
    {
      contract_version: "contentmd.runtime-detection-report/0.1.0",
      project_root_digest: digest,
      evidence: [{
        evidence_id: "evidence.runtime.node",
        kind: "package_manifest",
        relative_locator: "package.json",
        content_digest: digest,
        observation: "Node runtime range is compatible.",
        confidence: "high",
        conflict_state: "none",
        authority_effect: "none",
      }],
      conflicts: [],
      unknowns: ["live_deployment_status"],
      inspected_at: "2026-08-23T10:00:00.000Z",
      authority_effect: "none",
    },
  );
  const proposal = runtimeRecord(
    "runtimeProposal",
    "runtime.proposal.fixture",
    {
      contract_version: "contentmd.runtime-proposal/0.1.0",
      detection_report_ref: runtimeRef(detection.record_id),
      detection_report_digest: digest,
      candidates: [{
        runtime_id: "runtime.local",
        descriptor_ref: "runtime.descriptor.local",
        descriptor_digest: digest,
        availability: "available",
        bindable: true,
        requirements: ["node>=24.14.0 <25"],
        trade_offs: ["adopter-controlled local process"],
        conflicts: [],
        unknowns: [],
      }],
      recommended_runtime_id: "runtime.local",
      authority_effect: "none",
    },
  );
  const conformance = runtimeRecord(
    "runtimeConformanceReceipt",
    "runtime.conformance.fixture",
    {
      contract_version: "contentmd.runtime-conformance-receipt/0.1.0",
      interface_id: "runtime.event-store",
      interface_version: "0.1.0",
      implementation_id: "runtime.local.event-store",
      implementation_version: "0.1.0",
      implementation_digest: digest,
      fixture_trace_digest: digest,
      passed_check_ids: ["runtime.event-store.append"],
      failed_check_ids: [],
      node_version: "24.14.0",
      issued_at: "2026-08-23T10:00:00.000Z",
      receipt_digest: digest,
    },
  );
  const decision = runtimeRecord(
    "runtimeBindingDecision",
    "runtime.binding-decision.fixture",
    {
      contract_version: "contentmd.runtime-binding-decision/0.1.0",
      proposal_ref: runtimeRef(proposal.record_id),
      proposal_digest: digest,
      selected_descriptor_ref: "runtime.descriptor.local",
      selected_descriptor_digest: digest,
      canonical_replica: {
        runtime_id: "runtime.local",
        data_location_id: "runtime.local.canonical",
      },
      decision_status: "approved",
      actor_ref: "actor.runtime.fixture",
      principal_ref: "principal.runtime.fixture",
      workload_ref: "workload.contentmd",
      rationale: "Use the adopter-controlled reference runtime.",
      decided_at: "2026-08-23T10:00:00.000Z",
      authorization_ref: runtimeRef("authorization.runtime.fixture"),
      authorization_digest: digest,
      conformance_receipt_refs: [runtimeRef(conformance.record_id)],
      conformance_receipt_digests: [digest],
      applicable_control_refs: [runtimeRef("control.runtime.fixture")],
      applicable_control_digests: [digest],
    },
  );
  const binding = runtimeRecord(
    "runtimeBinding",
    "runtime.binding.fixture",
    {
      contract_version: "contentmd.runtime-binding/0.1.0",
      binding_id: "runtime.binding.fixture",
      binding_version: 1,
      project_id: "project.runtime.fixture",
      status: "active",
      proposal_ref: proposal.record_id,
      proposal_digest: digest,
      decision_ref: decision.record_id,
      decision_digest: digest,
      descriptor_ref: "runtime.descriptor.local",
      descriptor_digest: digest,
      integration_mode: "sidecar",
      canonical_replica: {
        runtime_id: "runtime.local",
        data_location_id: "runtime.local.canonical",
      },
      interface_bindings: [{
        interface_id: "runtime.event-store",
        interface_version: "0.1.0",
        status: "supported",
        implementation_id: "runtime.local.event-store",
        implementation_version: "0.1.0",
        implementation_digest: digest,
        semantics_digest: digest,
        conformance_receipt_ref: runtimeRef(conformance.record_id),
      }],
      consistency_model: "single_writer_strong",
      transaction_boundary: "sqlite_immediate_transaction",
      idempotency_behavior: "event_id_plus_digest",
      retry_behavior: "explicit_authorized_only",
      ambiguous_outcome_behavior: "read_before_retry",
      identity_provider: "runtime.local.identity",
      authentication_provider: "runtime.local.authentication",
      secret_resolver: "runtime.local.environment",
      data_locations: [{
        location_id: "runtime.local.canonical",
        data_class: "runtime-metadata",
        role: "canonical_replica",
      }],
      retention: { mode: "policy_bound", policy_ref: "policy.runtime.retention" },
      encryption: { at_rest: "platform_filesystem", in_transit: "not_applicable" },
      telemetry: { mode: "minimized", data_classes: ["runtime-metadata"] },
      health_checks: ["runtime.node", "runtime.sqlite"],
      cleanup: { mode: "explicit_authorized" },
      export: { mode: "canonical_verified" },
      adapter_digests: [{ adapter_id: "runtime.local", adapter_digest: digest }],
      conformance_receipts: [runtimeRef(conformance.record_id)],
      issued_at: "2026-08-23T10:00:00.000Z",
      predecessor_binding_digest: null,
    },
  );
  const manifest = runtimeRecord(
    "replicaArtifactManifest",
    "runtime.replica-manifest.fixture",
    {
      contract_version: "contentmd.replica-artifact-manifest/0.1.0",
      manifest_id: "runtime.replica-manifest.fixture",
      event_ref: runtimeRef("event.runtime.fixture"),
      checkpoint_ref: runtimeRef("checkpoint.runtime.fixture"),
      entries: [{
        artifact_id: "artifact.runtime.fixture",
        media_type: "application/json",
        schema_id: "contentmd.runtime-binding-record",
        sha256_digest: digest,
        byte_count: 128,
        disposition: "required",
        export_permission: "permitted",
        parent_refs: ["event.runtime.fixture"],
        expected_receipt_class: "runtime.local.verified-storage",
      }],
      manifest_digest: digest,
      created_at: "2026-08-23T10:00:00.000Z",
    },
  );
  const acknowledgement = runtimeRecord(
    "replicaAck",
    "runtime.replica-ack.fixture",
    {
      contract_version: "contentmd.replica-ack/0.1.0",
      ack_id: "runtime.replica-ack.fixture",
      checkpoint: {
        stream_id: "stream.runtime.fixture",
        sequence: 1,
        head_digest: digest,
      },
      manifest_ref: runtimeRef(manifest.record_id),
      manifest_digest: digest,
      entry_receipts: [{
        artifact_id: "artifact.runtime.fixture",
        receipt_ref: runtimeRef("receipt.runtime.fixture"),
        receipt_digest: digest,
      }],
      acknowledged_at: "2026-08-23T10:00:00.000Z",
      ack_digest: digest,
    },
  );
  return { detection, proposal, decision, binding, conformance, manifest, acknowledgement };
}

describe("schema registry", () => {
  it("validates a source record with no unknown fields", () => {
    const result = validateRecord(SCHEMA_IDS.source, validSourceRecord());

    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("rejects unknown fields and malformed digests", () => {
    const invalid = {
      ...validSourceRecord(),
      content_digest: "not-a-digest",
      unexpected: true,
    };

    const result = validateRecord(SCHEMA_IDS.source, invalid);

    expect(result.valid).toBe(false);
    expect(result.errors.join("\n")).toMatch(/additional properties|content_digest/i);
  });

  it("rejects a schema selector that disagrees with the record", () => {
    const result = validateRecord(SCHEMA_IDS.finding, validSourceRecord());

    expect(result).toEqual({
      valid: false,
      errors: [
        "schema_id mismatch: expected contentmd.finding-record, received contentmd.source-record",
      ],
    });
  });

  it("rejects duplicate record identities", () => {
    const record = validSourceRecord();
    const result = validateRecordSet([record, record]);

    expect(result).toEqual({
      valid: false,
      errors: ["duplicate record_id: src_fixture_product_001"],
    });
  });

  it("accepts repeated coefficient encodings at distinct feature positions", () => {
    expect(validateRecord(
      SCHEMA_IDS.rankingModel,
      validRepeatedCoefficientRankingModel(),
    )).toEqual({ valid: true, errors: [] });
  });

  it("validates the closed auxiliary model-training statistics record", () => {
    expect(validateRecord(
      SCHEMA_IDS.modelTrainingStatistics,
      validModelTrainingStatisticsRecord(),
    )).toEqual({ valid: true, errors: [] });
  });

  it("validates every closed portable-runtime record family", () => {
    for (const record of Object.values(validRuntimeRecords())) {
      expect(validateRecord(record.schema_id as never, record)).toEqual({
        valid: true,
        errors: [],
      });
    }
  });

  it("rejects weak portable-runtime binding shapes", () => {
    const { binding } = validRuntimeRecords();
    const unknownField = structuredClone(binding);
    Object.assign(unknownField.payload, { unexpected: true });
    expect(validateRecord(unknownField.schema_id as never, unknownField).valid).toBe(false);

    const malformedDigest = structuredClone(binding);
    malformedDigest.payload.descriptor_digest = "not-a-digest";
    expect(validateRecord(malformedDigest.schema_id as never, malformedDigest).valid).toBe(false);

    const capabilityBoolean = structuredClone(binding);
    Object.assign(capabilityBoolean.payload.interface_bindings[0]!, { supports_jobs: true });
    expect(validateRecord(capabilityBoolean.schema_id as never, capabilityBoolean).valid).toBe(false);

    const missingConformance = structuredClone(binding);
    delete (missingConformance.payload.interface_bindings[0] as Partial<{
      conformance_receipt_ref: unknown;
    }>).conformance_receipt_ref;
    expect(validateRecord(missingConformance.schema_id as never, missingConformance).valid).toBe(false);
  });

  it("rejects a finding whose hard/advisory union is ambiguous", () => {
    const invalidFinding = {
      record_id: "finding_fixture_001",
      schema_id: SCHEMA_IDS.finding,
      schema_version: "0.1.0" as const,
      record_version: 1,
      content_digest: "0".repeat(64),
      scope: {
        memory_scope: "project" as const,
        project_id: "project_fixture_checkout",
        resource_refs: ["occ_fixture_001"],
        data_classes: ["public-synthetic"],
      },
      provenance: [],
      lifecycle_state: "proposed" as const,
      payload: {
        rule_id: "rule.unsupported-claim.v1",
        severity: "high",
        classification: "hard",
        hard_outcome: "truthfulness",
        advisory_dimension: "clarity",
        occurrence_refs: ["occ_fixture_001"],
        evidence_refs: [],
        rationale: "The superlative has no supporting fact.",
        uncertainty: "none",
        next_action: "Supply evidence or remove the claim.",
        automatic_rewrite_allowed: false,
      },
    };

    const result = validateRecord(SCHEMA_IDS.finding, invalidFinding);

    expect(result.valid).toBe(false);
    expect(result.errors.join("\n")).toMatch(/oneOf/i);
  });
});
