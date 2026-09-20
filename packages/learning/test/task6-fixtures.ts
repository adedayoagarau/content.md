import { readFileSync } from "node:fs";
import { endianness } from "node:os";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  admitPairwiseRuntime,
  trainPairwiseLogistic,
  verifyLearningDatasetForTraining,
  verifyPairwiseCodeManifest,
  verifyPairwiseFeatureMatrix,
} from "../src/index.js";
import {
  task5OpposedFeatureMatrixFixture,
  task5OpposedSealedTestCandidateFixture,
  task5OpposedValidationCandidateFixture,
  task5FeatureMatrixFixture,
  task5SealedTestCandidateFixture,
  task5ValidationCandidateFixture,
} from "./task5-fixtures.js";

const OPENED_AT = "2026-08-20T20:00:00.000Z";

function recordRef(record: {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  content_digest: string;
}) {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

function snapshotRef(snapshot: {
  snapshot_id: string;
  snapshot_kind: string;
  snapshot_digest: string;
}) {
  return {
    record_id: snapshot.snapshot_id,
    schema_id: `contentmd.task2-${snapshot.snapshot_kind}-snapshot`,
    schema_version: "0.1.0" as const,
    content_digest: snapshot.snapshot_digest,
  };
}

function task5CodeManifest() {
  const preimage = JSON.parse(readFileSync(new URL(
    "../../../fixtures/learning-ranking/pairwise-training-code-manifest.json",
    import.meta.url,
  ), "utf8"));
  return verifyPairwiseCodeManifest({
    ...preimage,
    manifest_digest: sha256Canonical(preimage),
  });
}

function task5Runtime() {
  const identity = {
    contract_version: "contentmd.pairwise-runtime-profile/0.1.0" as const,
    node_version: "24.14.0" as const,
    v8_version: process.versions.v8,
    icu_version: process.versions.icu!,
    unicode_version: process.versions.unicode!,
    platform: process.platform,
    architecture: process.arch,
    endianness: endianness(),
  };
  return admitPairwiseRuntime({ ...identity, profile_digest: sha256Canonical(identity) });
}

function task6CodeManifest() {
  const preimage = JSON.parse(readFileSync(new URL(
    "../../../fixtures/learning-ranking/task6-code-manifest.json",
    import.meta.url,
  ), "utf8"));
  return { ...preimage, manifest_digest: sha256Canonical(preimage) };
}

function task6RuntimeProfile() {
  const identity = {
    contract_version: "contentmd.task6-runtime-profile/0.1.0" as const,
    node_version: "24.14.0" as const,
    v8_version: process.versions.v8,
    icu_version: process.versions.icu!,
    unicode_version: process.versions.unicode!,
    platform: process.platform,
    architecture: process.arch,
    endianness: endianness(),
  };
  return { ...identity, profile_digest: sha256Canonical(identity) };
}

function slice(
  dimension: "project" | "product_area" | "channel" | "locale" | "risk",
  value: string,
) {
  const key = { dimension, value };
  const identity = {
    contract_version: "contentmd.evaluation-slice-definition/0.1.0" as const,
    key,
  };
  const digest = sha256Canonical(identity);
  return {
    ...identity,
    slice_id: `evaluation_slice.${digest.slice(0, 32)}`,
    required_for_promotion: true,
    slice_digest: sha256Canonical({ ...identity, required_for_promotion: true }),
  };
}

function proposedScope(projectId: string) {
  const permitted_values = [
    { dimension: "project" as const, values: [projectId] as [string] },
    { dimension: "product_area" as const, values: ["checkout"] as [string] },
    { dimension: "channel" as const, values: ["web"] as [string] },
    { dimension: "locale" as const, values: ["en"] as [string] },
    { dimension: "risk" as const, values: ["standard"] as [string] },
  ] as const;
  const identity = {
    contract_version: "contentmd.proposed-binding-scope/0.1.0" as const,
    memory_scope: "project" as const,
    project_id: projectId,
    permitted_values,
  };
  const scope_digest = sha256Canonical(identity);
  return {
    ...identity,
    scope_id: `proposed_binding_scope.${scope_digest.slice(0, 32)}`,
    scope_digest,
  };
}

function auxiliaryRef(record_id: string) {
  return {
    record_id,
    schema_id: "contentmd.task6-fixture",
    schema_version: "0.1.0" as const,
    content_digest: sha256Canonical({ record_id }),
  };
}

function compareCanonical(left: unknown, right: unknown): number {
  return Buffer.compare(
    Buffer.from(canonicalJson(left), "utf8"),
    Buffer.from(canonicalJson(right), "utf8"),
  );
}

type Task6FixtureMode = "baseline_aligned" | "baseline_opposed";
const fixtureCache = new Map<Task6FixtureMode, ReturnType<typeof createTask6SealedReplayFixture>>();

function createTask6SealedReplayFixture(mode: Task6FixtureMode) {
  const matrixFixture = mode === "baseline_aligned"
    ? task5FeatureMatrixFixture()
    : task5OpposedFeatureMatrixFixture();
  const sealed = mode === "baseline_aligned"
    ? task5SealedTestCandidateFixture()
    : task5OpposedSealedTestCandidateFixture();
  const validation = mode === "baseline_aligned"
    ? task5ValidationCandidateFixture()
    : task5OpposedValidationCandidateFixture();
  const dataset = verifyLearningDatasetForTraining({
    record_mode: "development_fixture",
    replay: matrixFixture.datasetReplay,
  });
  const featureMatrix = verifyPairwiseFeatureMatrix({
    record_mode: "development_fixture",
    dataset,
    replay: matrixFixture.replay,
  });
  const training_request = {
    contract_version: "contentmd.pairwise-training-request/0.1.0" as const,
    record_mode: "development_fixture" as const,
    purpose: "candidate" as const,
    dataset,
    feature_matrix: featureMatrix,
    code_manifest: task5CodeManifest(),
    runtime_profile: task5Runtime(),
  };
  const trained = trainPairwiseLogistic(training_request);
  if (trained.state !== "trained") throw new Error(`task6_fixture_model_${trained.state}`);
  const projectId = sealed.profile.expected_profile.scope.project_id!;
  const scope = proposedScope(projectId);
  const slices = [
    slice("project", projectId),
    slice("product_area", "checkout"),
    slice("channel", "web"),
    slice("locale", "en"),
    slice("risk", "standard"),
  ] as const;
  const baselineIdentity = {
    contract_version: "contentmd.expression-fit-baseline/0.1.0" as const,
    feature_profile_ref: recordRef(sealed.profile.expected_profile),
    component_order: [
      "required_fact_coverage", "recovery_action_coverage", "approved_terminology_ratio",
      "contextual_specificity", "supporting_evidence_coverage",
      "one_minus_generic_language_density", "one_minus_length_distance",
    ] as const,
    weight_bits: [
      "3fd0000000000000", "3fc3333333333333", "3fc3333333333333",
      "3fc3333333333333", "3fc3333333333333", "3fb999999999999a",
      "3fa999999999999a",
    ] as const,
    probability_scale_bits: "4010000000000000" as const,
    probability_clip_lower_bits: "3eb0c6f7a0b5ed8d" as const,
    probability_clip_upper_bits: "3feffffde7210be9" as const,
  };
  const baseline_profile = {
    ...baselineIdentity,
    baseline_id: "expression-fit-baseline/0.1.0" as const,
    baseline_digest: sha256Canonical(baselineIdentity),
  };
  const subjectByExampleRef = new Map(
    matrixFixture.datasetReplay.build_input.leakage_evidence.subjects.map((subject) => [
      canonicalJson(recordRef(subject.example.preference)),
      subject,
    ] as const),
  );
  const task6Pair = (row: {
    example_ref: typeof sealed.rows[number]["example_ref"];
    leakage_group_ref: typeof sealed.rows[number]["leakage_group_ref"];
    candidate_a: typeof sealed.rows[number]["candidate_a"];
    candidate_b: typeof sealed.rows[number]["candidate_b"];
  }) => {
    const subject = subjectByExampleRef.get(canonicalJson(row.example_ref));
    if (subject === undefined) throw new Error("task6_fixture_shadow_subject_missing");
    const task_ref = snapshotRef(subject.example.qualification_input.task);
    const context_ref = snapshotRef(subject.example.qualification_input.context);
    const riskSourceRefs = [task_ref, context_ref].sort(compareCanonical) as [
      typeof task_ref,
      typeof context_ref,
    ];
    const riskIdentity = {
      contract_version: "contentmd.risk-slice-witness/0.1.0" as const,
      task_ref,
      context_ref,
      risk_value: "standard",
      source_refs: riskSourceRefs,
    };
    const witness_digest = sha256Canonical(riskIdentity);
    return {
      example_ref: row.example_ref,
      leakage_group_ref: row.leakage_group_ref,
      candidate_a: row.candidate_a,
      candidate_b: row.candidate_b,
      risk_slice_witness: {
        ...riskIdentity,
        witness_id: `risk_slice_witness.${witness_digest.slice(0, 32)}`,
        witness_digest,
      },
    };
  };
  const test_pairs = sealed.rows.map(task6Pair) as [typeof sealed.rows[number], ...typeof sealed.rows[number][]] extends never
    ? never
    : [
        {
          example_ref: typeof sealed.rows[number]["example_ref"];
          leakage_group_ref: typeof sealed.rows[number]["leakage_group_ref"];
          candidate_a: typeof sealed.rows[number]["candidate_a"];
          candidate_b: typeof sealed.rows[number]["candidate_b"];
          risk_slice_witness: {
            contract_version: "contentmd.risk-slice-witness/0.1.0";
            task_ref: ReturnType<typeof snapshotRef>;
            context_ref: ReturnType<typeof snapshotRef>;
            risk_value: string;
            source_refs: [ReturnType<typeof snapshotRef>, ReturnType<typeof snapshotRef>];
            witness_id: string;
            witness_digest: string;
          };
        },
        ...Array<{
          example_ref: typeof sealed.rows[number]["example_ref"];
          leakage_group_ref: typeof sealed.rows[number]["leakage_group_ref"];
          candidate_a: typeof sealed.rows[number]["candidate_a"];
          candidate_b: typeof sealed.rows[number]["candidate_b"];
          risk_slice_witness: {
            contract_version: "contentmd.risk-slice-witness/0.1.0";
            task_ref: ReturnType<typeof snapshotRef>;
            context_ref: ReturnType<typeof snapshotRef>;
            risk_value: string;
            source_refs: [ReturnType<typeof snapshotRef>, ReturnType<typeof snapshotRef>];
            witness_id: string;
            witness_digest: string;
          };
        }>
      ];
  const uniqueShadowRows = new Map<string, typeof matrixFixture.replay.rows[number]>();
  for (const row of matrixFixture.replay.rows) {
    const key = canonicalJson(row.leakage_group_ref);
    if (!uniqueShadowRows.has(key)) uniqueShadowRows.set(key, row);
  }
  const shadow_pairs = [...uniqueShadowRows.values()].slice(0, 20).map(task6Pair);
  if (shadow_pairs.length !== 20) throw new Error("task6_fixture_shadow_groups_insufficient");
  const drift_pairs = [
    ...matrixFixture.replay.rows,
    ...validation.rows,
    ...sealed.rows,
  ].map(task6Pair);
  if (drift_pairs.length !== matrixFixture.datasetReplay.build_input.leakage_evidence.subjects.length) {
    throw new Error("task6_fixture_drift_subjects_incomplete");
  }
  const qualificationMemberByRef = new Map<string, {
    qualification_input: typeof sealed.rows[number]["subject"]["example"]["qualification_input"];
    expected_qualification: typeof sealed.rows[number]["subject"]["example"]["qualification"];
    test_leakage_group_ref: typeof sealed.rows[number]["leakage_group_ref"];
  }>();
  for (const row of sealed.rows) {
    const key = canonicalJson(recordRef(row.subject.example.qualification));
    const prior = qualificationMemberByRef.get(key);
    if (prior !== undefined
      && canonicalJson(prior.test_leakage_group_ref) !== canonicalJson(row.leakage_group_ref)) {
      throw new Error("task6_fixture_qualification_group_mismatch");
    }
    qualificationMemberByRef.set(key, {
      qualification_input: row.subject.example.qualification_input,
      expected_qualification: row.subject.example.qualification,
      test_leakage_group_ref: row.leakage_group_ref,
    });
  }
  const qualificationMembers = [...qualificationMemberByRef.values()].sort((left, right) => compareCanonical(
    recordRef(left.expected_qualification),
    recordRef(right.expected_qualification),
  ));
  const source_refs = qualificationMembers.map(({ expected_qualification }) =>
    recordRef(expected_qualification)).sort(compareCanonical) as [
      ReturnType<typeof recordRef>,
      ...ReturnType<typeof recordRef>[],
    ];
  const denominatorIdentity = {
    contract_version: "contentmd.qualification-denominator-replay/0.1.0" as const,
    enumeration_state: "complete_development_fixture" as const,
    proposed_scope_ref: {
      record_id: scope.scope_id,
      schema_id: "contentmd.proposed-binding-scope",
      schema_version: "0.1.0" as const,
      content_digest: scope.scope_digest,
    },
    source_refs,
    members: qualificationMembers,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
  };
  const replay_digest = sha256Canonical(denominatorIdentity);
  const reviewerEntries = new Map<string, {
    reviewer_ref: ReturnType<typeof recordRef>;
    qualification_ref: ReturnType<typeof recordRef>;
  }>();
  for (const row of sealed.rows) {
    for (const entry of row.subject.example.qualification_input.reviewer_set.payload.entries) {
      reviewerEntries.set(canonicalJson(entry.reviewer_ref), {
        reviewer_ref: entry.reviewer_ref,
        qualification_ref: entry.independence_evidence_refs[0]!,
      });
    }
  }
  const orderedReviewers = [...reviewerEntries.values()].sort((left, right) =>
    compareCanonical(left.reviewer_ref, right.reviewer_ref));
  if (orderedReviewers.length === 0) throw new Error("task6_fixture_reviewers_empty");
  const reviewerRefs = orderedReviewers.map(({ reviewer_ref }) => reviewer_ref);
  const policyReviewers = orderedReviewers.map(({ reviewer_ref, qualification_ref }) => ({
    reviewer_ref,
    independent_from_reviewer_refs: reviewerRefs.filter((candidate) =>
      canonicalJson(candidate) !== canonicalJson(reviewer_ref)),
    conflict_state: "none" as const,
    qualification_ref,
  })) as [
    {
      reviewer_ref: ReturnType<typeof recordRef>;
      independent_from_reviewer_refs: ReturnType<typeof recordRef>[];
      conflict_state: "none";
      qualification_ref: ReturnType<typeof recordRef>;
    },
    ...Array<{
      reviewer_ref: ReturnType<typeof recordRef>;
      independent_from_reviewer_refs: ReturnType<typeof recordRef>[];
      conflict_state: "none";
      qualification_ref: ReturnType<typeof recordRef>;
    }>,
  ];
  const reviewerIdentity = {
    contract_version: "contentmd.simulated-reviewer-policy-witness/0.1.0" as const,
    proposed_scope_ref: denominatorIdentity.proposed_scope_ref,
    minimum_qualified_reviewers: policyReviewers.length,
    require_pairwise_independence: true as const,
    reviewers: policyReviewers,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
  };
  const reviewerDigest = sha256Canonical(reviewerIdentity);
  const generalChecks = ["permission", "rights", "privacy", "policy", "incident"] as const;
  const reviewerChecks = ["reviewer_qualification", "reviewer_independence"] as const;
  const currentnessEntries = [
    ...generalChecks.map((check) => ({ check, subject_ref: denominatorIdentity.proposed_scope_ref })),
    ...reviewerChecks.flatMap((check) => reviewerRefs.map((subject_ref) => ({ check, subject_ref }))),
  ];
  const currentnessIdentity = {
    contract_version: "contentmd.simulated-currentness-witness/0.1.0" as const,
    checked_at: OPENED_AT,
    entries: currentnessEntries.map(({ check, subject_ref }) => ({
      check,
      subject_ref,
      state: "pass" as const,
      effective_at: "2026-08-20T00:00:00.000Z",
      expires_at: "2026-08-21T00:00:00.000Z",
      evidence_refs: [auxiliaryRef(`currentness.task6.${check}`)] as [ReturnType<typeof auxiliaryRef>],
    })),
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
  };
  const currentnessDigest = sha256Canonical(currentnessIdentity);
  return {
    openedAt: OPENED_AT,
    driftPairs: JSON.parse(canonicalJson(drift_pairs)) as typeof drift_pairs,
    shadowPairs: JSON.parse(canonicalJson(shadow_pairs)) as typeof shadow_pairs,
    training: trained,
    replay: {
      contract_version: "contentmd.sealed-test-replay/0.1.0" as const,
      dataset_replay: sealed.datasetReplay,
      model_record: trained.model_record,
      model_dependencies: { training_request },
      feature_profile: sealed.profile,
      baseline_profile,
      proposed_scope: scope,
      declared_slices: slices,
      currentness: {
        ...currentnessIdentity,
        witness_id: `simulated_currentness.${currentnessDigest.slice(0, 32)}`,
        witness_digest: currentnessDigest,
      },
      reviewer_policy: {
        ...reviewerIdentity,
        witness_id: `simulated_reviewer_policy.${reviewerDigest.slice(0, 32)}`,
        witness_digest: reviewerDigest,
      },
      test_pairs,
      qualification_denominator: {
        ...denominatorIdentity,
        replay_id: `qualification_denominator.${replay_digest.slice(0, 32)}`,
        replay_digest,
      },
      evaluation_code_manifest: task6CodeManifest(),
      evaluation_runtime_profile: task6RuntimeProfile(),
    },
  };
}

export function task6SealedReplayFixture() {
  const mode = "baseline_aligned" as const;
  const cached = fixtureCache.get(mode) ?? createTask6SealedReplayFixture(mode);
  fixtureCache.set(mode, cached);
  return cached;
}

export function task6PassingSealedReplayFixture() {
  const mode = "baseline_opposed" as const;
  const cached = fixtureCache.get(mode) ?? createTask6SealedReplayFixture(mode);
  fixtureCache.set(mode, cached);
  return cached;
}
