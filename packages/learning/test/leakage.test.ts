import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { canonicalJson, finalizeRecord, sha256Canonical } from "@contentmd/core";
import { describe, expect, it } from "vitest";
import {
  FEATURE_SOURCE_ROLES,
  Task3ContractError,
  deriveFeatureSourceEventId,
  deriveFeatureSourceStreamId,
  deriveLearningSplit,
  task3CheckpointSetRef,
  verifyFeatureSourceCheckpointSet,
  verifyLeakageGroupRecord,
  verifyTask3Producer,
  type FeatureSourceCheckpointSet,
  type FeatureSourceManifestEntry,
  type StoreArtifactWitness,
  type StoreBindingWitness,
  type Task3ProducerArtifactWitness,
} from "../src/leakage.js";
import { LEARNING_SCHEMA_IDS, type LeakageGroupRecord } from "../src/records.js";

const PROJECT_ID = "project.task3.fixture";
const EVALUATED_AT = "2026-08-20T19:00:00.000Z";

function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function rawArtifact(path: string, bytes_utf8: string) {
  return { path, bytes_utf8, raw_bytes_digest: sha256Utf8(bytes_utf8) };
}

function storeArtifact(
  path: StoreArtifactWitness["path"],
  artifactId: string,
): StoreArtifactWitness {
  const bytes_utf8 = readFileSync(new URL(`../../../${path}`, import.meta.url), "utf8");
  const raw_bytes_digest = sha256Utf8(bytes_utf8);
  return {
    path,
    bytes_utf8,
    raw_bytes_digest,
    artifact_ref: {
      artifact_id: artifactId,
      artifact_version: "0.1.0",
      artifact_digest: raw_bytes_digest,
    },
  };
}

function storeBinding(): StoreBindingWitness {
  const store_schema = storeArtifact(
    "fixtures/learning-ranking/feature-source-store-schema.json",
    "contentmd.feature-source-store-schema",
  );
  const runtime_profile = storeArtifact(
    "fixtures/learning-ranking/feature-source-runtime-profile.json",
    "contentmd.feature-source-runtime-profile",
  );
  const store_instance_id = "feature-store.task3.fixture";
  const store_kind = "synthetic_append_only_event_store" as const;
  const instance_nonce_digest = sha256Canonical({
    contract_version: "contentmd.feature-store-instance/0.1.0",
    store_instance_id,
    store_kind,
    project_id: PROJECT_ID,
  });
  const identity = {
    contract_version: "contentmd.feature-store-binding/0.1.0" as const,
    store_kind,
    project_id: PROJECT_ID,
    store_instance_id,
    instance_nonce_digest,
    store_schema,
    runtime_profile,
  };
  const binding_id = `feature-store-binding.${sha256Canonical(identity)}`;
  const withoutDigest = { ...identity, binding_id };
  return { ...withoutDigest, binding_digest: sha256Canonical(withoutDigest) };
}

function sourceRef(name: string) {
  return {
    record_id: `snapshot.${name}`,
    schema_id: "contentmd.task2-task-snapshot",
    schema_version: "0.1.0" as const,
    content_digest: sha256Canonical({ name }),
  };
}

function checkpointFixture(): FeatureSourceCheckpointSet {
  const binding = storeBinding();
  const source_ref = sourceRef("task3-feature");
  const snapshotPreimage = {
    contract_version: "contentmd.task2-evidence-snapshot/0.1.0" as const,
    snapshot_id: source_ref.record_id,
    snapshot_kind: "task" as const,
    snapshot_version: "0.1.0" as const,
    captured_at: EVALUATED_AT,
    source_refs: [sourceRef("task3-feature-source")],
    payload: {
      task_key: "task.task3-feature",
      fact_set_ref: sourceRef("task3-feature-fact-set"),
      policy_ref: sourceRef("task3-feature-policy"),
      context_ref: sourceRef("task3-feature-context"),
      requirements_digest: sha256Canonical({ fixture: "task3-feature-requirements" }),
      content_slot: "body",
      ranking_objective: "expression_preference" as const,
      candidate_kind: "expression" as const,
    },
  };
  const snapshot = {
    ...snapshotPreimage,
    verification_mode: "development_fixture" as const,
    verification_receipt: null,
    snapshot_digest: sha256Canonical(snapshotPreimage),
  };
  source_ref.content_digest = snapshot.snapshot_digest;
  const stream_id = deriveFeatureSourceStreamId(binding.binding_digest, PROJECT_ID, "task");
  const event_id = deriveFeatureSourceEventId(
    binding.binding_digest,
    stream_id,
    source_ref,
    "task",
    "project_owned_synthetic",
  );
  const eventPreimage = {
    event_id,
    stream_id,
    sequence: 1,
    schema_version: "0.1.0" as const,
    event_type: "feature_source_recorded",
    occurred_at: EVALUATED_AT,
    actor_ref: "contentmd.task3-development-fixture-recorder",
    data_class: "learning_feature_source",
    payload: {
      contract_version: "contentmd.feature-source-append/0.1.0" as const,
      project_id: PROJECT_ID,
      source_ref,
      source_role: "task" as const,
      source_class: "project_owned_synthetic" as const,
      rights_state: "training_permitted" as const,
    },
    predecessor_digest: null,
  };
  const event = { ...eventPreimage, event_digest: sha256Canonical(eventPreimage) };
  const entry: FeatureSourceManifestEntry = {
    source_ref,
    source_role: "task",
    source_class: "project_owned_synthetic",
    rights_state: "training_permitted",
    material: {
      material_kind: "task2_evidence_snapshot",
      source_ref,
      value: snapshot,
    },
    stream_id,
    event_id,
    sequence: 1,
    event_digest: event.event_digest,
    event,
  };
  const manifestIdentity = {
    contract_version: "contentmd.feature-source-manifest/0.1.0" as const,
    project_id: PROJECT_ID,
    entries: [entry] as [FeatureSourceManifestEntry, ...FeatureSourceManifestEntry[]],
  };
  const manifest_id = `feature-source-manifest.${sha256Canonical(manifestIdentity)}`;
  const manifestWithoutDigest = { ...manifestIdentity, manifest_id };
  const feature_source_manifest = {
    ...manifestWithoutDigest,
    manifest_digest: sha256Canonical(manifestWithoutDigest),
  };
  const streams = FEATURE_SOURCE_ROLES.map((role) => {
    const currentStreamId = deriveFeatureSourceStreamId(binding.binding_digest, PROJECT_ID, role);
    const complete_prefix = role === "task" ? [event] : [];
    const maximum_sequence = complete_prefix.length;
    const head = complete_prefix.at(-1) ?? null;
    const prefix_digest = sha256Canonical({
      contract_version: "contentmd.feature-source-prefix/0.1.0",
      stream_id: currentStreamId,
      maximum_sequence,
      complete_prefix,
    });
    const receiptWithoutDigest = {
      contract_version: "contentmd.stream-checkpoint-receipt/0.1.0" as const,
      store_binding_digest: binding.binding_digest,
      stream_id: currentStreamId,
      maximum_sequence,
      head_event_id: head?.event_id ?? null,
      head_event_digest: head?.event_digest ?? null,
      prefix_digest,
      feature_source_manifest_digest: feature_source_manifest.manifest_digest,
      verification_method: "complete-prefix-sha256-chain" as const,
      verified_at: EVALUATED_AT,
    };
    return {
      stream_id: currentStreamId,
      maximum_sequence,
      head_event_id: head?.event_id ?? null,
      head_event_digest: head?.event_digest ?? null,
      complete_prefix,
      prefix_digest,
      receipt: { ...receiptWithoutDigest, receipt_digest: sha256Canonical(receiptWithoutDigest) },
    };
  }).sort((left, right) => left.stream_id.localeCompare(right.stream_id, "en")) as FeatureSourceCheckpointSet["streams"];
  const checkpointIdentity = {
    contract_version: "contentmd.feature-source-checkpoint-set-identity/0.1.0",
    record_mode: "development_fixture" as const,
    store_binding: binding,
    feature_source_manifest,
    streams,
  };
  const checkpoint_set_id = `feature-source-checkpoint-set.${sha256Canonical(checkpointIdentity)}`;
  const withoutDigest = {
    contract_version: "contentmd.feature-source-checkpoint-set/0.1.0" as const,
    checkpoint_set_id,
    record_mode: "development_fixture" as const,
    store_binding: binding,
    feature_source_manifest,
    streams,
  };
  return { ...withoutDigest, checkpoint_set_digest: sha256Canonical(withoutDigest) };
}

function task3Producer(producer_id: Task3ProducerArtifactWitness["producer_id"]): Task3ProducerArtifactWitness {
  const sourcePaths = {
    "leakage-group": ["packages/learning/src/leakage.ts", "packages/learning/src/unicode-normalization.ts"],
    "learning-dataset": ["packages/learning/src/dataset.ts", "packages/learning/src/leakage.ts", "packages/learning/src/unicode-normalization.ts"],
    "dataset-seal": ["packages/learning/src/dataset.ts"],
  }[producer_id].sort();
  return {
    contract_version: "contentmd.task3-producer-witness/0.1.0",
    producer_id,
    schema_artifact: rawArtifact(
      "packages/schemas/src/learning-records.schema.json",
      readFileSync(new URL("../../schemas/src/learning-records.schema.json", import.meta.url), "utf8"),
    ),
    source_artifacts: sourcePaths.map((path) => rawArtifact(
      path,
      readFileSync(new URL(`../../../${path}`, import.meta.url), "utf8"),
    )) as Task3ProducerArtifactWitness["source_artifacts"],
    verification_mode: "development_fixture",
    verification_receipt: null,
  };
}

function singletonGroupFixture(): LeakageGroupRecord {
  const record_id = `leakage-group.${"a".repeat(64)}`;
  const member = {
    record_id: "preference.task3.group-fixture",
    schema_id: LEARNING_SCHEMA_IDS.preferenceExample,
    schema_version: "0.1.0" as const,
    content_digest: sha256Canonical({ fixture: "group-member" }),
  };
  const { bucket, split } = deriveLearningSplit(record_id);
  return finalizeRecord({
    record_id,
    schema_id: LEARNING_SCHEMA_IDS.leakageGroup,
    schema_version: "0.1.0",
    record_version: 1,
    scope: {
      memory_scope: "project",
      project_id: PROJECT_ID,
      resource_refs: [member.record_id],
      data_classes: ["learning_data"],
    },
    provenance: [{
      record_id: "leakage-component-evidence.task3-group-fixture",
      relationship: "leakage_component_evidence",
      content_digest: sha256Canonical({ fixture: "group-provenance" }),
    }],
    lifecycle_state: "active",
    payload: {
      contract_version: "contentmd.learning-record-contract/0.1.0",
      record_mode: "development_fixture",
      ranking_objective: "expression_preference",
      candidate_kind: "expression",
      schema_digest: sha256Canonical({ fixture: "schema" }),
      code_digest: sha256Canonical({ fixture: "code" }),
      input_digest: sha256Canonical({ fixture: "input" }),
      authority_effect: "none",
      rule_version: "contentmd.leakage-group/0.1.0",
      normalization_artifact_refs: [
        { artifact_id: "unicode-casefold", artifact_version: "17.0.0", artifact_digest: sha256Canonical({ fixture: "casefold" }) },
        { artifact_id: "unicode-normalization", artifact_version: "17.0.0", artifact_digest: sha256Canonical({ fixture: "normalization" }) },
        { artifact_id: "unicode-whitespace", artifact_version: "17.0.0", artifact_digest: sha256Canonical({ fixture: "whitespace" }) },
      ],
      member_refs: [member],
      edges: [],
      bucket,
      split,
      group_state: "frozen",
    },
  }) as unknown as LeakageGroupRecord;
}

describe("Task 3 leakage primitives", () => {
  it.each([
    ["leakage-group.0", 62, "train"],
    ["leakage-group.boundary-52", 0, "train"],
    ["leakage-group.boundary-22", 79, "train"],
    ["leakage-group.boundary-162", 80, "validation"],
    ["leakage-group.3", 82, "validation"],
    ["leakage-group.boundary-19", 89, "validation"],
    ["leakage-group.boundary-27", 90, "test"],
    ["leakage-group.2", 93, "test"],
    ["leakage-group.boundary-6", 99, "test"],
  ] as const)("uses the NUL-delimited full group ID for %s", (groupId, bucket, split) => {
    expect(deriveLearningSplit(groupId)).toEqual({ bucket, split });
  });

  it("exposes stable Task 3 error codes", () => {
    const error = new Task3ContractError("task3_contract_invalid:checkpoint_chain");
    expect(error).toBeInstanceOf(TypeError);
    expect(error.name).toBe("Task3ContractError");
    expect(error.code).toBe("task3_contract_invalid:checkpoint_chain");
  });

  it("derives the exact checkpoint-set ref", () => {
    expect(task3CheckpointSetRef({
      checkpoint_set_id: "feature-source-checkpoint-set.fixture",
      checkpoint_set_digest: "a".repeat(64),
    })).toEqual({
      record_id: "feature-source-checkpoint-set.fixture",
      schema_id: "contentmd.feature-source-checkpoint-set",
      schema_version: "0.1.0",
      content_digest: "a".repeat(64),
    });
  });

  it("verifies a positive stream plus every required zero-head stream", () => {
    const checkpoint = checkpointFixture();
    expect(() => verifyFeatureSourceCheckpointSet(checkpoint)).not.toThrow();
    expect(checkpoint.streams).toHaveLength(10);
    expect(checkpoint.streams.filter((stream) => stream.maximum_sequence === 0)).toHaveLength(9);
  });

  it("rejects a tampered checkpoint head before accepting the outer commitment", () => {
    const checkpoint = structuredClone(checkpointFixture());
    const positive = checkpoint.streams.find((stream) => stream.maximum_sequence === 1)!;
    positive.head_event_digest = "f".repeat(64);
    expect(() => verifyFeatureSourceCheckpointSet(checkpoint)).toThrow(
      "task3_contract_invalid:digest",
    );
  });

  it("descriptor-preflights a directly verified checkpoint without invoking nested accessors", () => {
    let reads = 0;
    const checkpoint = checkpointFixture();
    Object.defineProperty(checkpoint.store_binding, "project_id", {
      enumerable: true,
      get() {
        reads += 1;
        return PROJECT_ID;
      },
    });

    expect(() => verifyFeatureSourceCheckpointSet(checkpoint)).toThrow(
      "task3_contract_invalid:canonical_value",
    );
    expect(reads).toBe(0);
  });

  it("applies checkpoint mode and shape precedence before recursive canonical checks", () => {
    let reads = 0;
    const official = checkpointFixture();
    official.record_mode = "official";
    Object.defineProperty(official.store_binding, "project_id", {
      enumerable: true,
      get() {
        reads += 1;
        return PROJECT_ID;
      },
    });
    expect(() => verifyFeatureSourceCheckpointSet(official)).toThrow(
      "task3_contract_invalid:official_mode_not_supported",
    );
    expect(reads).toBe(0);

    const invalidMode = checkpointFixture();
    invalidMode.record_mode = "invalid" as never;
    Object.defineProperty(invalidMode.store_binding, "project_id", {
      enumerable: true,
      get() {
        reads += 1;
        return PROJECT_ID;
      },
    });
    expect(() => verifyFeatureSourceCheckpointSet(invalidMode)).toThrow(
      "task3_contract_invalid:input_shape",
    );
    expect(reads).toBe(0);

    const nestedShape = checkpointFixture() as FeatureSourceCheckpointSet & {
      store_binding: StoreBindingWitness & { extra?: boolean };
    };
    nestedShape.store_binding.extra = true;
    Object.defineProperty(nestedShape.feature_source_manifest, "project_id", {
      enumerable: true,
      get() {
        reads += 1;
        return PROJECT_ID;
      },
    });
    expect(() => verifyFeatureSourceCheckpointSet(nestedShape)).toThrow(
      "task3_contract_invalid:input_shape",
    );
    expect(reads).toBe(0);

    const nestedStreamShape = checkpointFixture() as FeatureSourceCheckpointSet & {
      streams: [FeatureSourceCheckpointSet["streams"][number] & { extra?: boolean }, ...FeatureSourceCheckpointSet["streams"]];
    };
    nestedStreamShape.streams[0]!.extra = true;
    Object.defineProperty(nestedStreamShape.store_binding, "project_id", {
      enumerable: true,
      get() {
        reads += 1;
        return PROJECT_ID;
      },
    });
    expect(() => verifyFeatureSourceCheckpointSet(nestedStreamShape)).toThrow(
      "task3_contract_invalid:input_shape",
    );
    expect(reads).toBe(0);
  });

  it("derives producer digests only from the exact source manifest", () => {
    const producer = task3Producer("leakage-group");
    const verified = verifyTask3Producer(producer, "leakage-group");
    expect(verified.schema_digest).toBe(producer.schema_artifact.raw_bytes_digest);
    expect(verified.producer_manifest_digest).toMatch(/^[a-f0-9]{64}$/);

    const substituted = structuredClone(producer);
    substituted.source_artifacts[0]!.path = "packages/learning/src/dataset.ts";
    expect(() => verifyTask3Producer(substituted, "leakage-group")).toThrow(
      "task3_contract_invalid:producer_artifact",
    );
  });

  it("descriptor-preflights a directly verified producer without invoking accessors", () => {
    let reads = 0;
    const producer = task3Producer("leakage-group") as unknown as Record<string, unknown>;
    Object.defineProperty(producer, "producer_id", {
      enumerable: true,
      get() {
        reads += 1;
        return "leakage-group";
      },
    });

    expect(() => verifyTask3Producer(
      producer as unknown as Task3ProducerArtifactWitness,
      "leakage-group",
    )).toThrow("task3_contract_invalid:input_shape");
    expect(reads).toBe(0);
  });

  it("rejects extra fields in a rehashed producer verification receipt", () => {
    const producer = task3Producer("leakage-group");
    const manifestDigest = verifyTask3Producer(producer, "leakage-group").producer_manifest_digest;
    const targetPath = "contentmd://task3/producer-manifest/leakage-group";
    const receipt = finalizeRecord({
      record_id: `verification-receipt.task3-producer.leakage-group.${manifestDigest}`,
      schema_id: "contentmd.verification-receipt-record",
      schema_version: "0.1.0",
      record_version: 1,
      scope: {
        memory_scope: "task",
        project_id: null,
        resource_refs: [targetPath],
        data_classes: ["verification_metadata"],
      },
      provenance: [],
      lifecycle_state: "active",
      payload: {
        transaction_ref: `producer-manifest.${manifestDigest}`,
        target_path: targetPath,
        expected_digest: manifestDigest,
        observed_digest: manifestDigest,
        status: "passed",
        verified_at: EVALUATED_AT,
        method: "sha256-canonical-readback",
      },
    });
    producer.verification_mode = "build_verified";
    producer.verification_receipt = receipt;
    expect(() => verifyTask3Producer(producer, "leakage-group")).not.toThrow();

    const malformed = structuredClone(receipt) as typeof receipt & { payload: typeof receipt.payload & { extra?: boolean } };
    malformed.payload.extra = true;
    const { content_digest: _digest, ...preimage } = malformed;
    producer.verification_receipt = finalizeRecord(preimage);
    expect(() => verifyTask3Producer(producer, "leakage-group")).toThrow(
      "task3_contract_invalid:input_shape",
    );
  });

  it("requires closed group scope, provenance, and exact member schemas", () => {
    const group = singletonGroupFixture();
    expect(() => verifyLeakageGroupRecord(group)).not.toThrow();

    const extraScope = structuredClone(group) as typeof group & { scope: typeof group.scope & { extra?: boolean } };
    extraScope.scope.extra = true;
    const { content_digest: _scopeDigest, ...scopePreimage } = extraScope;
    expect(() => verifyLeakageGroupRecord(
      finalizeRecord(scopePreimage) as unknown as LeakageGroupRecord,
    )).toThrow("task3_contract_invalid:input_shape");

    const wrongMemberSchema = structuredClone(group);
    wrongMemberSchema.payload.member_refs[0]!.schema_id = LEARNING_SCHEMA_IDS.leakageGroup;
    const { content_digest: _memberDigest, ...memberPreimage } = wrongMemberSchema;
    expect(() => verifyLeakageGroupRecord(
      finalizeRecord(memberPreimage) as unknown as LeakageGroupRecord,
    )).toThrow("task3_contract_invalid:reference_integrity");

    const extraProvenance = structuredClone(group) as typeof group & {
      provenance: [typeof group.provenance[number] & { extra?: boolean }, ...typeof group.provenance[number][]];
    };
    extraProvenance.provenance[0]!.extra = true;
    const { content_digest: _provenanceDigest, ...provenancePreimage } = extraProvenance;
    expect(() => verifyLeakageGroupRecord(
      finalizeRecord(provenancePreimage) as unknown as LeakageGroupRecord,
    )).toThrow("task3_contract_invalid:input_shape");

    const staleNestedArtifact = structuredClone(group) as typeof group & {
      payload: typeof group.payload & {
        normalization_artifact_refs: [
          typeof group.payload.normalization_artifact_refs[number] & { extra?: boolean },
          ...typeof group.payload.normalization_artifact_refs[number][],
        ];
      };
    };
    staleNestedArtifact.payload.normalization_artifact_refs[0]!.extra = true;
    expect(() => verifyLeakageGroupRecord(staleNestedArtifact)).toThrow(
      "task3_contract_invalid:input_shape",
    );

    let reads = 0;
    const dualFault = structuredClone(group) as typeof group & {
      scope: typeof group.scope & { extra?: boolean };
    };
    dualFault.scope.extra = true;
    Object.defineProperty(dualFault.payload, "code_digest", {
      enumerable: true,
      get() {
        reads += 1;
        return group.payload.code_digest;
      },
    });
    expect(() => verifyLeakageGroupRecord(dualFault)).toThrow(
      "task3_contract_invalid:input_shape",
    );
    expect(reads).toBe(0);

    const nestedProvenance = structuredClone(group) as typeof group & {
      provenance: [typeof group.provenance[number] & { extra?: boolean }, ...typeof group.provenance[number][]];
    };
    nestedProvenance.provenance[0]!.extra = true;
    Object.defineProperty(nestedProvenance.payload, "code_digest", {
      enumerable: true,
      get() {
        reads += 1;
        return group.payload.code_digest;
      },
    });
    expect(() => verifyLeakageGroupRecord(nestedProvenance)).toThrow(
      "task3_contract_invalid:input_shape",
    );
    expect(reads).toBe(0);
  });

  it("checks a group durable commitment before split semantics", () => {
    const group = structuredClone(singletonGroupFixture());
    group.payload.split = group.payload.split === "train" ? "test" : "train";
    expect(() => verifyLeakageGroupRecord(group)).toThrow(
      "task3_contract_invalid:durable_record_digest",
    );
  });
});

describe("frozen feature-store artifacts", () => {
  it("contains the exact closed append-only store schema", () => {
    const bytes = readFileSync(
      new URL("../../../fixtures/learning-ranking/feature-source-store-schema.json", import.meta.url),
      "utf8",
    );
    expect(bytes.endsWith("\n")).toBe(true);
    expect(JSON.parse(bytes)).toEqual({
      contract_version: "contentmd.feature-source-store-schema/0.1.0",
      allowed_store_kinds: ["sqlite_append_only_event_store", "synthetic_append_only_event_store"],
      allowed_event_type: "feature_source_recorded",
      allowed_data_class: "learning_feature_source",
      sequence_origin: 1,
      sequence_step: 1,
      first_predecessor: null,
      later_predecessor: "prior_event_digest",
      event_digest_algorithm: "sha256-canonical",
      append_order_authority: "sequence_and_digest_chain",
    });
  });

  it("pins the exact Node 24 offline runtime profile", () => {
    const bytes = readFileSync(
      new URL("../../../fixtures/learning-ranking/feature-source-runtime-profile.json", import.meta.url),
      "utf8",
    );
    expect(bytes.endsWith("\n")).toBe(true);
    expect(JSON.parse(bytes)).toEqual({
      contract_version: "contentmd.feature-source-runtime-profile/0.1.0",
      node_version: "24.14.0",
      hash_algorithm: "sha256",
      text_encoding: "utf-8-fatal",
      canonical_json_algorithm: "contentmd.core-canonical-json/0.1.0",
      timestamp_role: "descriptive_only",
      network_access: "none",
    });
  });
});
