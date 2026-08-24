import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  canonicalJson,
  finalizeRecord,
  sha256Canonical,
  type DurableRecord,
  type MemoryScope,
} from "@contentmd/core";
import type { StoredEvent } from "@contentmd/memory";

const WORKFLOW_SCHEMA_BYTES = readFileSync(
  new URL("../../schemas/src/workflow-records.schema.json", import.meta.url),
  "utf8",
);
const LEARNING_SCHEMA_BYTES = readFileSync(
  new URL("../../schemas/src/learning-records.schema.json", import.meta.url),
  "utf8",
);

export const EVALUATION_AT = "2026-08-20T18:00:00.000Z";
export const PROJECT_ID = "project.task2.fixture";
export const EXPRESSION_A = "Use a clear next step.";
export const EXPRESSION_B = "Continue";

export function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

export function clone<T>(value: T): T {
  return structuredClone(value);
}

export function bareRef(name: string) {
  return {
    record_id: `fixture.${name}`,
    schema_id: "contentmd.fixture-record",
    schema_version: "0.1.0" as const,
    content_digest: sha256Canonical({ fixture: name }),
  };
}

export function recordRef(record: {
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

function compareCanonical(left: unknown, right: unknown): number {
  return Buffer.compare(
    Buffer.from(canonicalJson(left), "utf8"),
    Buffer.from(canonicalJson(right), "utf8"),
  );
}

export function canonicalSet<T>(values: readonly T[]): T[] {
  return [...values].sort(compareCanonical);
}

function rawArtifact(path: string, bytes_utf8: string) {
  return {
    path,
    bytes_utf8,
    raw_bytes_digest: sha256Utf8(bytes_utf8),
  };
}

export type FixtureProducerId =
  | "content-decision-adapter"
  | "feedback-qualification"
  | "learning-eligibility"
  | "preference-example";

export function producer(producer_id: FixtureProducerId) {
  const schemaPath = producer_id === "content-decision-adapter"
    ? "packages/schemas/src/workflow-records.schema.json"
    : "packages/schemas/src/learning-records.schema.json";
  const schemaBytes = producer_id === "content-decision-adapter"
    ? WORKFLOW_SCHEMA_BYTES
    : LEARNING_SCHEMA_BYTES;
  const sources = canonicalSet([
    rawArtifact(
      `packages/learning/src/${producer_id}.fixture.ts`,
      `content.md Task 2 frozen fixture producer: ${producer_id}\n`,
    ),
  ]);
  return {
    contract_version: "contentmd.task2-producer-witness/0.1.0" as const,
    producer_id,
    schema_artifact: rawArtifact(schemaPath, schemaBytes),
    source_artifacts: sources as [ReturnType<typeof rawArtifact>, ...ReturnType<typeof rawArtifact>[]],
    verification_mode: "development_fixture" as const,
    verification_receipt: null,
  };
}

function verificationReceipt(
  record_id: string,
  transaction_ref: string,
  target_path: string,
  digest: string,
) {
  return finalizeRecord({
    record_id,
    schema_id: "contentmd.verification-receipt-record" as const,
    schema_version: "0.1.0" as const,
    record_version: 1,
    scope: {
      memory_scope: "project" as const,
      project_id: PROJECT_ID,
      resource_refs: [target_path],
      data_classes: ["public-synthetic"],
    },
    provenance: [],
    lifecycle_state: "active" as const,
    payload: {
      transaction_ref,
      target_path,
      expected_digest: digest,
      observed_digest: digest,
      status: "passed" as const,
      verified_at: "2026-08-20T17:55:00.000Z",
      method: "sha256-canonical-readback",
    },
  });
}

export function buildVerifiedProducer(producer_id: FixtureProducerId) {
  const witness = producer(producer_id);
  const schemaDigest = witness.schema_artifact.raw_bytes_digest;
  const codeDigest = sha256Canonical({
    contract_version: "contentmd.task2-code-manifest/0.1.0",
    producer_id,
    entries: witness.source_artifacts.map(({ path, raw_bytes_digest }) => ({ path, raw_bytes_digest })),
  });
  const manifestDigest = sha256Canonical({
    contract_version: "contentmd.task2-producer-manifest/0.1.0",
    producer_id,
    schema: { path: witness.schema_artifact.path, raw_bytes_digest: schemaDigest },
    code_digest: codeDigest,
  });
  return {
    ...witness,
    verification_mode: "build_verified" as const,
    verification_receipt: verificationReceipt(
      `receipt.producer.${producer_id}`,
      `producer-manifest.${manifestDigest}`,
      `contentmd://task2/producer-manifest/${producer_id}`,
      manifestDigest,
    ),
  };
}

export function resolverVerifiedSnapshot<T extends {
  snapshot_id: string;
  snapshot_digest: string;
}>(snapshot: T): T & {
  verification_mode: "resolver_verified";
  verification_receipt: ReturnType<typeof verificationReceipt>;
} {
  return {
    ...snapshot,
    verification_mode: "resolver_verified",
    verification_receipt: verificationReceipt(
      `receipt.snapshot.${snapshot.snapshot_id}`,
      `evidence-snapshot.${snapshot.snapshot_digest}`,
      `contentmd://task2/evidence-snapshot/${snapshot.snapshot_id}`,
      snapshot.snapshot_digest,
    ),
  };
}

export function proposalRecord() {
  return finalizeRecord({
    record_id: "proposal.task2.fixture",
    schema_id: "contentmd.proposal-record" as const,
    schema_version: "0.1.0" as const,
    record_version: 1,
    scope: {
      memory_scope: "project" as const,
      project_id: PROJECT_ID,
      resource_refs: ["task.task2.fixture"],
      data_classes: ["project_feedback"],
    },
    provenance: [],
    lifecycle_state: "active" as const,
    payload: {
      task_packet_ref: "task-packet.task2.fixture",
      operation: "rewrite" as const,
      alternatives: [EXPRESSION_B],
      evidence_refs: ["evidence.task2.fixture"],
      pattern_refs: ["pattern.task2.fixture"],
      tradeoffs: ["Clarity over brevity."],
    },
  });
}

export interface DecisionFixtureOptions {
  status?: "accepted" | "edited" | "rejected" | "abstained";
  selectedSide?: "A" | "B";
  expressionA?: string;
  expressionB?: string;
}

export function decisionAdapterInput(options: DecisionFixtureOptions = {}) {
  const proposal = proposalRecord();
  const status = options.status ?? "accepted";
  const expressionA = options.expressionA ?? EXPRESSION_A;
  const expressionB = options.expressionB ?? EXPRESSION_B;
  const selectedExpression = options.selectedSide === "B" ? expressionB : expressionA;
  const payload = {
    schema_version: "contentmd.content-decision/0.1.0" as const,
    decision_id: `decision.task2.${status}.${(options.selectedSide ?? "A").toLowerCase()}`,
    status,
    actor_ref: "actor.task2.reviewer",
    actor_role: "content_designer",
    rationale: "The selected expression best satisfies the frozen rubric.",
    proposal_ref: proposal.record_id,
    selected_expression: status === "accepted" ? selectedExpression : null,
    edited_expression: status === "edited" ? selectedExpression : null,
    evidence_reviewed: ["evidence.task2.fixture", "review.task2.fixture"],
    scope: "project" as const,
    project_id: PROJECT_ID,
    occurred_at: "2026-08-20T17:45:00.000Z",
    mutation_approval_effect: "none" as const,
  };
  const preimage = {
    event_id: `event.${payload.decision_id}`,
    stream_id: "decision-stream.task2.fixture",
    sequence: 1,
    schema_version: "0.1.0" as const,
    event_type: "content_decision_recorded",
    occurred_at: payload.occurred_at,
    actor_ref: payload.actor_ref,
    data_class: "project_feedback",
    payload,
    predecessor_digest: null,
  };
  const event: StoredEvent = {
    ...preimage,
    event_digest: sha256Canonical(preimage),
  };
  return {
    event,
    proposal,
    producer: producer("content-decision-adapter"),
  };
}

export function snapshotRef(snapshot: {
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

export function makeSnapshot<K extends string, P>(
  snapshot_kind: K,
  snapshot_id: string,
  payload: P,
  sourceRefs: ReturnType<typeof bareRef>[],
) {
  const source_refs = canonicalSet(sourceRefs) as [ReturnType<typeof bareRef>, ...ReturnType<typeof bareRef>[]];
  const preimage = {
    contract_version: "contentmd.task2-evidence-snapshot/0.1.0" as const,
    snapshot_id,
    snapshot_kind,
    snapshot_version: "0.1.0" as const,
    captured_at: "2026-08-20T17:30:00.000Z",
    source_refs,
    payload,
  };
  return {
    ...preimage,
    verification_mode: "development_fixture" as const,
    verification_receipt: null,
    snapshot_digest: sha256Canonical(preimage),
  };
}

export function rehashSnapshot<T extends {
  contract_version: string;
  snapshot_id: string;
  snapshot_kind: string;
  snapshot_version: string;
  captured_at: string;
  source_refs: unknown;
  payload: unknown;
  snapshot_digest: string;
}>(snapshot: T): T {
  const {
    verification_mode: _verificationMode,
    verification_receipt: _verificationReceipt,
    snapshot_digest: _snapshotDigest,
    ...preimage
  } = snapshot as T & {
    verification_mode: unknown;
    verification_receipt: unknown;
  };
  return { ...snapshot, snapshot_digest: sha256Canonical(preimage) };
}

export function refinalizeRecord<T extends DurableRecord<unknown>>(record: T): T {
  const { content_digest: _contentDigest, ...preimage } = record;
  return finalizeRecord(preimage) as T;
}

export interface QualificationFixtureOptions {
  outcome?: "A" | "B" | "tie" | "abstain";
  status?: "accepted" | "edited" | "rejected" | "abstained";
  presentedOrder?: ["A", "B"] | ["B", "A"];
  blindedStatus?: "pass" | "fail";
  randomizedStatus?: "pass" | "fail";
  conflictState?: "none" | "declared" | "unresolved";
  adjudicationDisposition?: "A" | "B" | "tie" | "unresolved";
  adjudicationStatus?: "complete" | "invalid" | "revoked";
  factState?: "current" | "superseded" | "revoked" | "unknown";
  policyState?: "current" | "superseded" | "revoked" | "unknown";
  rubricStatus?: "current" | "superseded" | "revoked";
  reviewerQualification?: "current" | "expired" | "revoked" | "unknown";
  reviewerConflict?: "none" | "declared" | "resolved" | "unresolved";
  lineageClass?:
    | "project_owned"
    | "project_owned_synthetic"
    | "browser_observed"
    | "competitor"
    | "third_party"
    | "nonconforming"
    | "unknown";
  lineageRights?: "training_permitted" | "blocking_only" | "prohibited" | "unknown";
  transitiveComplete?: boolean;
  observedFactsChanged?: boolean;
  observedPolicyChanged?: boolean;
  observedRequirementsChanged?: boolean;
  observedTaskChanged?: boolean;
  observedContextChanged?: boolean;
  expressionA?: string;
  expressionB?: string;
}

export type AdaptFunction = (
  input: ReturnType<typeof decisionAdapterInput>,
) => {
  decision: DurableRecord<Record<string, unknown>> & {
    schema_id: "contentmd.content-decision-record";
  };
  boundary: Record<string, unknown>;
};

export function qualificationFixture(
  adapt: AdaptFunction,
  options: QualificationFixtureOptions = {},
) {
  const reviewOutcome = options.outcome ?? "A";
  const effectiveOutcome = options.adjudicationDisposition === "A" || options.adjudicationDisposition === "B" || options.adjudicationDisposition === "tie"
    ? options.adjudicationDisposition
    : reviewOutcome;
  const status = options.status
    ?? (effectiveOutcome === "tie" ? "rejected" : effectiveOutcome === "abstain" ? "abstained" : "accepted");
  const selectedSide = effectiveOutcome === "B" ? "B" : "A";
  const expressionA = options.expressionA ?? EXPRESSION_A;
  const expressionB = options.expressionB ?? EXPRESSION_B;
  const adapted = adapt(decisionAdapterInput({ status, selectedSide, expressionA, expressionB }));
  const proposal = proposalRecord();

  const factItem = bareRef("fact.item");
  const factItems = canonicalSet([factItem]) as [typeof factItem, ...typeof factItem[]];
  const fact_set = makeSnapshot(
    "fact-set",
    "snapshot.fact-set.task2",
    {
      item_refs: factItems,
      set_digest: sha256Canonical({
        contract_version: "contentmd.task2-stable-set/0.1.0",
        item_refs: factItems,
      }),
      state: options.factState ?? "current",
    },
    [factItem],
  );

  const policyItem = bareRef("policy.item");
  const policyItems = canonicalSet([policyItem]) as [typeof policyItem, ...typeof policyItem[]];
  const policy = makeSnapshot(
    "review-policy",
    "snapshot.review-policy.task2",
    {
      item_refs: policyItems,
      set_digest: sha256Canonical({
        contract_version: "contentmd.task2-stable-set/0.1.0",
        item_refs: policyItems,
      }),
      state: options.policyState ?? "current",
    },
    [policyItem],
  );

  const context = makeSnapshot(
    "context",
    "snapshot.context.task2",
    {
      context_key: "checkout.confirmation",
      product_area: "checkout",
      journey_state: "confirmation",
      channel: "web",
      locale: "en-US",
      surface: "checkout-sheet",
      audience: "consumer",
      content_slot: "primary_action",
    },
    [bareRef("context.source")],
  );
  const requirementsDigest = sha256Canonical({ requirements: ["Clear next action"] });
  const task = makeSnapshot(
    "task",
    "snapshot.task.task2",
    {
      task_key: "checkout.confirmation.primary-action",
      fact_set_ref: snapshotRef(fact_set),
      policy_ref: snapshotRef(policy),
      context_ref: snapshotRef(context),
      requirements_digest: requirementsDigest,
      content_slot: "primary_action",
      ranking_objective: "expression_preference" as const,
      candidate_kind: "expression" as const,
    },
    [bareRef("task.source")],
  );

  const candidate_a = makeSnapshot(
    "candidate",
    "snapshot.candidate-a.task2",
    {
      task_ref: snapshotRef(task),
      context_ref: snapshotRef(context),
      content_slot: "primary_action",
      author_refs: [] as ReturnType<typeof bareRef>[],
      expression: expressionA,
      expression_digest: sha256Utf8(expressionA),
    },
    [bareRef("candidate-a.source")],
  );
  const candidate_b = makeSnapshot(
    "candidate",
    "snapshot.candidate-b.task2",
    {
      task_ref: snapshotRef(task),
      context_ref: snapshotRef(context),
      content_slot: "primary_action",
      author_refs: [] as ReturnType<typeof bareRef>[],
      expression: expressionB,
      expression_digest: sha256Utf8(expressionB),
    },
    [bareRef("candidate-b.source")],
  );

  const reviewer = bareRef("reviewer.primary");
  const adjudicator = bareRef("reviewer.adjudicator");
  const hasAdjudication = options.adjudicationDisposition !== undefined;
  const participantRefs = canonicalSet(hasAdjudication ? [reviewer, adjudicator] : [reviewer]);
  const entries = canonicalSet([
    {
      reviewer_ref: reviewer,
      role: "content_designer" as const,
      qualified_objectives: ["expression_preference"] as ["expression_preference"],
      authorized_scopes: ["project"] as [MemoryScope, ...MemoryScope[]],
      independent_of_candidate_authorship: true,
      independence_evidence_refs: [bareRef("reviewer.primary.independence")] as [ReturnType<typeof bareRef>, ...ReturnType<typeof bareRef>[]],
      conflict_state: options.reviewerConflict ?? "none",
      qualification_status: options.reviewerQualification ?? "current",
      effective_at: "2026-08-20T00:00:00.000Z",
      expires_at: "2026-08-21T00:00:00.000Z",
    },
    ...(hasAdjudication
      ? [{
          reviewer_ref: adjudicator,
          role: "adjudicator" as const,
          qualified_objectives: ["expression_preference"] as ["expression_preference"],
          authorized_scopes: ["project"] as [MemoryScope, ...MemoryScope[]],
          independent_of_candidate_authorship: true,
          independence_evidence_refs: [bareRef("reviewer.adjudicator.independence")] as [ReturnType<typeof bareRef>, ...ReturnType<typeof bareRef>[]],
          conflict_state: "resolved" as const,
          qualification_status: "current" as const,
          effective_at: "2026-08-20T00:00:00.000Z",
          expires_at: "2026-08-21T00:00:00.000Z",
        }]
      : []),
  ]);
  const reviewer_set = makeSnapshot(
    "reviewer-set",
    "snapshot.reviewer-set.task2",
    {
      entries: entries as [typeof entries[number], ...typeof entries[number][]],
      set_digest: sha256Canonical({
        contract_version: "contentmd.task2-reviewer-set/0.1.0",
        entries,
      }),
    },
    participantRefs as [ReturnType<typeof bareRef>, ...ReturnType<typeof bareRef>[]],
  );

  const rubricArtifact = {
    artifact_id: "artifact.review-rubric.task2",
    artifact_version: "0.1.0",
    artifact_digest: sha256Canonical({ rubric: "expression preference v1" }),
  };
  const rubric = makeSnapshot(
    "review-rubric",
    "snapshot.review-rubric.task2",
    {
      artifact_ref: rubricArtifact,
      ranking_objective: "expression_preference" as const,
      candidate_kind: "expression" as const,
      allowed_outcomes: ["A", "B", "tie", "abstain"] as ["A", "B", "tie", "abstain"],
      requires_blinding: true as const,
      requires_randomization: true as const,
      requires_rationale: true as const,
      stable_dimensions: ["facts", "requirements", "context"] as ["facts", "requirements", "context"],
      status: options.rubricStatus ?? "current",
    },
    [bareRef("rubric.source")],
  );

  const presented_order = options.presentedOrder ?? (["B", "A"] as ["B", "A"]);
  const assignmentPreimage = {
    contract_version: "contentmd.task2-presentation-assignment/0.1.0",
    task_ref: snapshotRef(task),
    context_ref: snapshotRef(context),
    candidate_a_ref: snapshotRef(candidate_a),
    candidate_b_ref: snapshotRef(candidate_b),
    canonical_order: ["A", "B"] as ["A", "B"],
    presented_order,
    seed_commitment_digest: sha256Canonical({ seed: "task2 fixture" }),
  };
  const comparison_kind = status === "edited" ? "accepted_edit_vs_original" : "explicit_pairwise";
  const original_proposal_side = status === "edited" ? (selectedSide === "A" ? "B" : "A") : null;
  const presentation = makeSnapshot(
    "presentation",
    "snapshot.presentation.task2",
    {
      task_ref: snapshotRef(task),
      context_ref: snapshotRef(context),
      candidate_a_ref: snapshotRef(candidate_a),
      candidate_b_ref: snapshotRef(candidate_b),
      canonical_order: ["A", "B"] as ["A", "B"],
      presented_order,
      comparison_kind,
      original_proposal_side,
      blinding_proof: {
        status: options.blindedStatus ?? "pass",
        reviewer_refs: participantRefs as [ReturnType<typeof bareRef>, ...ReturnType<typeof bareRef>[]],
        hidden_fields: ["candidate_identity", "provider_identity", "author_identity"] as ["candidate_identity", "provider_identity", "author_identity"],
        evidence_refs: [bareRef("blinding.evidence")] as [ReturnType<typeof bareRef>, ...ReturnType<typeof bareRef>[]],
      },
      randomization_proof: {
        status: options.randomizedStatus ?? "pass",
        algorithm: "sha256-counter-v1" as const,
        seed_commitment_digest: assignmentPreimage.seed_commitment_digest,
        assignment_digest: sha256Canonical(assignmentPreimage),
        evidence_refs: [bareRef("randomization.evidence")] as [ReturnType<typeof bareRef>, ...ReturnType<typeof bareRef>[]],
      },
      fact_set_ref: snapshotRef(fact_set),
      policy_ref: snapshotRef(policy),
      requirements_digest: requirementsDigest,
    },
    [bareRef("presentation.source")],
  );

  const reviewPayload = {
    decision_ref: recordRef(adapted.decision),
    presentation_ref: snapshotRef(presentation),
    reviewer_set_ref: snapshotRef(reviewer_set),
    reviewer_refs: [reviewer] as [ReturnType<typeof bareRef>, ...ReturnType<typeof bareRef>[]],
    rubric_ref: rubricArtifact,
    outcome: reviewOutcome,
    rationale_codes: ["clear_next_action", "specific_object"] as [string, ...string[]],
    conflict_state: options.conflictState ?? (hasAdjudication ? "declared" : "none"),
    observed_fact_set_ref: options.observedFactsChanged
      ? { ...bareRef("fact-set.changed"), schema_id: "contentmd.task2-fact-set-snapshot" }
      : snapshotRef(fact_set),
    observed_policy_ref: options.observedPolicyChanged
      ? { ...bareRef("policy.changed"), schema_id: "contentmd.task2-review-policy-snapshot" }
      : snapshotRef(policy),
    observed_task_ref: options.observedTaskChanged
      ? { ...bareRef("task.changed"), schema_id: "contentmd.task2-task-snapshot" }
      : snapshotRef(task),
    observed_context_ref: options.observedContextChanged
      ? { ...bareRef("context.changed"), schema_id: "contentmd.task2-context-snapshot" }
      : snapshotRef(context),
    observed_requirements_digest: options.observedRequirementsChanged
      ? sha256Canonical({ requirements: ["Changed requirement"] })
      : requirementsDigest,
  };
  const review = makeSnapshot(
    "pairwise-review",
    "snapshot.pairwise-review.task2",
    reviewPayload,
    [bareRef("review.source")],
  );

  const adjudication = hasAdjudication
    ? makeSnapshot(
        "adjudication",
        "snapshot.adjudication.task2",
        {
          review_ref: snapshotRef(review),
          adjudicator_ref: adjudicator,
          disposition: options.adjudicationDisposition,
          rationale_codes: ["resolved_conflict"] as [string, ...string[]],
          status: options.adjudicationStatus ?? "complete",
        },
        [bareRef("adjudication.source")],
      )
    : null;

  const lineagePayload = (
    candidate: typeof candidate_a | typeof candidate_b,
  ) => ({
    candidate_ref: snapshotRef(candidate),
    nodes: [{
      subject_ref: snapshotRef(candidate),
      parent_refs: [] as ReturnType<typeof bareRef>[],
      source_class: options.lineageClass ?? "project_owned_synthetic",
      rights_state: options.lineageRights ?? "training_permitted",
    }] as [{
      subject_ref: ReturnType<typeof snapshotRef>;
      parent_refs: ReturnType<typeof bareRef>[];
      source_class: NonNullable<QualificationFixtureOptions["lineageClass"]>;
      rights_state: NonNullable<QualificationFixtureOptions["lineageRights"]>;
    }],
    transitive_complete: options.transitiveComplete ?? true,
  });
  const lineage_a = makeSnapshot(
    "candidate-lineage",
    "snapshot.lineage-a.task2",
    lineagePayload(candidate_a),
    [bareRef("lineage-a.source")],
  );
  const lineage_b = makeSnapshot(
    "candidate-lineage",
    "snapshot.lineage-b.task2",
    lineagePayload(candidate_b),
    [bareRef("lineage-b.source")],
  );

  const input = {
    record_mode: "development_fixture" as const,
    evaluation_at: EVALUATION_AT,
    producer: producer("feedback-qualification"),
    decision_event: decisionAdapterInput({ status, selectedSide, expressionA, expressionB }).event,
    proposal,
    decision: adapted.decision,
    decision_boundary: adapted.boundary,
    review,
    rubric,
    reviewer_set,
    fact_set,
    policy,
    task,
    context,
    candidate_a,
    candidate_b,
    presentation,
    lineage_a,
    lineage_b,
    adjudication,
  };
  return {
    input,
    adapted,
    evidence: {
      qualification_input: input,
      review,
      rubric,
      reviewer_set,
      fact_set,
      policy,
      task,
      context,
      candidate_a,
      candidate_b,
      presentation,
      lineage_a,
      lineage_b,
      adjudication,
    },
  };
}

export interface EligibilityFixtureOptions {
  targetScope?: MemoryScope;
  permission?: "valid" | "missing" | "revoked" | "expired" | "future" | "unknown";
  failedCheck?: "rights" | "privacy" | "factual" | "policy" | "incident" | "context";
  unknownCheck?: "rights" | "privacy" | "factual" | "policy" | "incident" | "context";
  policyStatus?: "current" | "superseded" | "revoked" | "unknown";
  minimumReviewers?: number;
}

export function eligibilityFixture(
  qualification: DurableRecord<Record<string, unknown>>,
  qualificationEvidence: ReturnType<typeof qualificationFixture>["evidence"],
  decision: DurableRecord<Record<string, unknown>>,
  options: EligibilityFixtureOptions = {},
) {
  const targetScope = options.targetScope ?? "project";
  const policyRef = bareRef("learning-policy.subject");
  const scopeOrder: MemoryScope[] = ["task", "personal", "project", "organization", "public"];
  const minimum = {
    task: 1,
    personal: 1,
    project: 1,
    organization: 2,
    public: 2,
    ...(options.minimumReviewers === undefined ? {} : { [targetScope]: options.minimumReviewers }),
  };
  const learning_policy = makeSnapshot(
    "learning-policy",
    "snapshot.learning-policy.task2",
    {
      policy_ref: policyRef,
      status: options.policyStatus ?? "current",
      ranking_objective: "expression_preference" as const,
      candidate_kind: "expression" as const,
      allowed_memory_scopes: canonicalSet(scopeOrder) as [MemoryScope, ...MemoryScope[]],
      allowed_scope_transitions: canonicalSet(scopeOrder.map((to) => ({ from: "project" as MemoryScope, to }))) as [{ from: MemoryScope; to: MemoryScope }, ...{ from: MemoryScope; to: MemoryScope }[]],
      minimum_independent_reviewers: minimum,
      allowed_lineage_classes: ["project_owned", "project_owned_synthetic"] as ["project_owned", "project_owned_synthetic"],
      required_checks: ["rights", "privacy", "factual", "policy", "incident", "context"] as ["rights", "privacy", "factual", "policy", "incident", "context"],
      edited_content_requires_unchanged_facts_requirements_context: true as const,
    },
    [policyRef],
  );

  const candidateARef = snapshotRef(qualificationEvidence.candidate_a);
  const candidateBRef = snapshotRef(qualificationEvidence.candidate_b);
  const decisionRef = recordRef(decision);
  const permissionSubject = bareRef("learning-permission.subject");
  const permissionState = options.permission ?? "valid";
  const permission = permissionState === "missing"
    ? null
    : makeSnapshot(
        "learning-permission",
        "snapshot.learning-permission.task2",
        {
          permission_ref: permissionSubject,
          permission_class: "learning_data" as const,
          status: permissionState === "revoked" || permissionState === "unknown" ? "revoked" as const : "issued" as const,
          revocation_state: permissionState === "revoked" ? "revoked" as const : permissionState === "unknown" ? "unknown" as const : "current" as const,
          ranking_objective: "expression_preference" as const,
          candidate_kind: "expression" as const,
          allowed_memory_scopes: [targetScope] as [MemoryScope, ...MemoryScope[]],
          project_ids: [PROJECT_ID] as [string, ...string[]],
          subject_refs: canonicalSet([candidateARef, candidateBRef, decisionRef]) as [ReturnType<typeof recordRef>, ...ReturnType<typeof recordRef>[]],
          issued_at: permissionState === "future" ? "2026-08-21T00:00:00.000Z" : "2026-08-19T00:00:00.000Z",
          expires_at: permissionState === "expired" ? "2026-08-20T17:59:59.000Z" : "2026-08-21T00:00:00.000Z",
        },
        [permissionSubject],
      );

  const checkNames = ["rights", "privacy", "factual", "policy", "incident", "context"] as const;
  const check = (name: typeof checkNames[number]) => ({
    state: options.failedCheck === name ? "fail" as const : options.unknownCheck === name ? "unknown" as const : "pass" as const,
    evidence_refs: [bareRef(`check.${name}.evidence`)] as [ReturnType<typeof bareRef>, ...ReturnType<typeof bareRef>[]],
    rationale_codes: [`${name}_verified`] as [string, ...string[]],
  });
  const checks = makeSnapshot(
    "eligibility-checks",
    "snapshot.eligibility-checks.task2",
    {
      qualification_ref: recordRef(qualification),
      decision_ref: decisionRef,
      task_ref: snapshotRef(qualificationEvidence.task),
      context_ref: snapshotRef(qualificationEvidence.context),
      candidate_a_ref: candidateARef,
      candidate_b_ref: candidateBRef,
      target_memory_scope: targetScope,
      project_id: PROJECT_ID,
      evaluated_at: EVALUATION_AT,
      rights: check("rights"),
      privacy: check("privacy"),
      factual: check("factual"),
      policy: check("policy"),
      incident: check("incident"),
      context: check("context"),
    },
    [bareRef("checks.source")],
  );

  return {
    record_mode: "development_fixture" as const,
    evaluation_at: EVALUATION_AT,
    producer: producer("learning-eligibility"),
    qualification,
    qualification_input: qualificationEvidence.qualification_input,
    decision,
    learning_policy,
    permission,
    checks,
    lineage_a: qualificationEvidence.lineage_a,
    lineage_b: qualificationEvidence.lineage_b,
    reviewer_set: qualificationEvidence.reviewer_set,
    target_memory_scope: targetScope,
  };
}

export function preferenceFixture(
  qualification: DurableRecord<Record<string, unknown>>,
  eligibility: DurableRecord<Record<string, unknown>>,
  eligibilityInput: ReturnType<typeof eligibilityFixture>,
  decision: DurableRecord<Record<string, unknown>>,
  evidence: ReturnType<typeof qualificationFixture>["evidence"],
) {
  return {
    record_mode: "development_fixture" as const,
    evaluation_at: EVALUATION_AT,
    producer: producer("preference-example"),
    qualification,
    eligibility,
    eligibility_input: eligibilityInput,
    decision,
    task: evidence.task,
    context: evidence.context,
    candidate_a: evidence.candidate_a,
    candidate_b: evidence.candidate_b,
    presentation: evidence.presentation,
    feature_source_checkpoint_set_ref: bareRef("feature-source-checkpoint-set"),
  };
}
