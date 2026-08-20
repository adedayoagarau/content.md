---
title: "content.md Feedback Qualification Contracts 0.1"
status: approved-for-implementation
created: 2026-08-20
updated: 2026-08-20
design_id: CONTENTMD-FEEDBACK-QUALIFICATION-CONTRACTS-0.1
parent_design_id: CONTENTMD-LIVE-INTELLIGENCE-LEARNING-0.1
approval_basis: explicit-user-approval-in-task
implementation_authority: bounded-local-implementation
authority_effect: implementation-within-written-scope
source_documents:
  - docs/superpowers/specs/2026-08-20-contentmd-live-intelligence-learning-design.md
  - docs/superpowers/specs/2026-08-20-contentmd-learning-record-contracts-design.md
  - docs/superpowers/plans/2026-08-20-contentmd-recursive-learning-ranking.md
---

# content.md Feedback Qualification Contracts 0.1

## 1. Purpose and boundary

This addendum freezes the executable contract for Recursive Learning Task 2 in the [parent design](2026-08-20-contentmd-live-intelligence-learning-design.md), [record contract](2026-08-20-contentmd-learning-record-contracts-design.md), and [implementation plan](../plans/2026-08-20-contentmd-recursive-learning-ranking.md). It resolves the legacy decision-event boundary, complete resolver-free inputs, digest preimages, qualification and eligibility states, candidate lineage, and preference-label construction.

The user approved the design and directed implementation to continue without another approval pause. This document authorizes bounded local code and tests only. It does not authorize browser or provider access, credential use, model calls, deployment, promotion, publication, product mutation, or learning from browser-observed, competitor, or other third-party expressions.

Task 2 creates evidence about whether a decision is fit for later learning. It grants no learning, training, ranking, mutation, or release authority. Its three learning outputs always carry `authority_effect: none`.

The executable 0.1 constructors issue `development_fixture` records only. Passing `record_mode: official` throws `task2_contract_invalid:official_mode_not_supported`. The public record schemas reserve official mode for a later authenticated resolver/store and authority contract; Task 2 does not counterfeit that missing boundary.

## 2. Normative dependencies

The implementation must preserve these existing contracts:

- [`recordContentDecision()`](../../../packages/learning/src/feedback.ts) remains backward compatible and continues to append one immutable memory event.
- [`StoredEvent`](../../../packages/memory/src/event-store.ts) remains the event receipt type.
- [`finalizeRecord()` and `verifyRecordDigest()`](../../../packages/core/src/records.ts) remain the durable-record digest implementation.
- [`sha256Canonical()`](../../../packages/core/src/canonical-json.ts) remains the canonical JSON digest implementation.
- the registered `contentmd.proposal-record` and `contentmd.content-decision-record` shapes remain those in the [workflow schema](../../../packages/schemas/src/workflow-records.schema.json).
- the three Task 2 output records remain the exact closed shapes in [`records.ts`](../../../packages/learning/src/records.ts) and the learning schema.

No implementation may treat the legacy event's `event_digest` as a durable record's `content_digest`.

## 3. Common primitives

```ts
type Digest = string; // exactly 64 lowercase hexadecimal characters
type Rfc3339 = string; // the repository's strict RFC 3339 date-time contract
type RecordMode = "development_fixture" | "official";
type MemoryScope = "task" | "personal" | "project" | "organization" | "public";

interface DigestRef {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  content_digest: Digest;
}

interface ArtifactRef {
  artifact_id: string;
  artifact_version: string;
  artifact_digest: Digest;
}

type VerificationReceiptRecord = DurableRecord<{
  transaction_ref: string;
  target_path: string;
  expected_digest: Digest;
  observed_digest: Digest;
  status: "passed" | "failed" | "incomplete";
  verified_at: Rfc3339;
  method: string;
}> & { schema_id: "contentmd.verification-receipt-record" };

interface ProposalPayload {
  task_packet_ref: string;
  operation: "strategy" | "draft" | "rewrite";
  alternatives: [string, ...string[]];
  evidence_refs: string[];
  pattern_refs: string[];
  tradeoffs: string[];
}

type ProposalRecord = DurableRecord<ProposalPayload> & {
  schema_id: "contentmd.proposal-record";
};

interface DurableContentDecisionPayload {
  proposal_ref: string;
  status: "accepted" | "edited" | "rejected" | "abstained";
  actor_role: string;
  rationale: string;
  selected_expression: string | null;
  evidence_reviewed: string[];
  decided_at: Rfc3339;
}

type DurableContentDecisionRecord = DurableRecord<DurableContentDecisionPayload> & {
  schema_id: "contentmd.content-decision-record";
};
```

All input objects are closed. Unknown, inherited, accessor, symbol, cyclic, non-enumerable, non-finite, or non-canonical values are malformed. Arrays whose contract says set are unique and sorted by their canonical JSON bytes before hashing. Ordered arrays retain their declared order. The legacy `ContentDecisionRecord` name remains reserved for the event-return DTO; this addendum always uses `DurableContentDecisionRecord` for the canonical durable record.

Every complete durable record supplied to Task 2 is rechecked with `verifyRecordDigest()` before any semantic derivation. Every reference made from one input to another must equal the referenced record's exact `record_id`, `schema_id`, `schema_version`, and `content_digest`.

## 4. Producer artifact witness

Task 2 must not accept unexplained caller-supplied `schema_digest` or `code_digest` strings. Each producer receives this closed witness:

```ts
interface RawUtf8Artifact {
  path: string;
  bytes_utf8: string;
  raw_bytes_digest: Digest;
}

interface ProducerArtifactWitness {
  contract_version: "contentmd.task2-producer-witness/0.1.0";
  producer_id:
    | "content-decision-adapter"
    | "feedback-qualification"
    | "learning-eligibility"
    | "preference-example";
  schema_artifact: RawUtf8Artifact;
  source_artifacts: [RawUtf8Artifact, ...RawUtf8Artifact[]];
  verification_mode: "development_fixture" | "build_verified";
  verification_receipt: VerificationReceiptRecord | null;
}
```

For every artifact, `raw_bytes_digest = sha256(UTF8(bytes_utf8))`. Paths are nonempty, workspace-relative POSIX paths and unique. Source artifacts are sorted by path. The schema artifact path is exactly `packages/schemas/src/workflow-records.schema.json` for `content-decision-adapter` and exactly `packages/schemas/src/learning-records.schema.json` for the three learning producers. The implementation rejects a witness if any raw digest fails, an entry is duplicated or unsorted, or the producer ID is wrong.

The output `schema_digest` is the schema artifact's verified raw digest. The output `code_digest` is:

```text
sha256Canonical({
  contract_version: "contentmd.task2-code-manifest/0.1.0",
  producer_id,
  entries: source_artifacts.map(({ path, raw_bytes_digest }) => ({ path, raw_bytes_digest }))
})
```

The producer-manifest digest is:

```text
sha256Canonical({
  contract_version: "contentmd.task2-producer-manifest/0.1.0",
  producer_id,
  schema: { path: schema_artifact.path, raw_bytes_digest: schema_digest },
  code_digest
})
```

The current constructors issue development fixtures only. `development_fixture` verification requires a null receipt. `build_verified` requires one complete digest-valid receipt with status `passed`, transaction ref `producer-manifest.<producer_manifest_digest>`, target path `contentmd://task2/producer-manifest/<producer_id>`, expected and observed digests both equal to the producer-manifest digest, and method `sha256-canonical-readback`. The reserved future official path additionally needs an authenticated resolver/authority contract; this generic receipt is deliberately insufficient for official issuance. The manifest preimage excludes the receipt, avoiding a self-reference. The witness bytes are verification inputs; output records retain the derived digests and receipt provenance.

## 5. Legacy event to canonical decision boundary

### 5.1 Existing event stays unchanged

`recordContentDecision()` retains its current return DTO and append behavior. The adapter is a new pure function; it does not append, overwrite, or reinterpret the original event.

```ts
interface CanonicalContentDecisionBoundary {
  contract_version: "contentmd.content-decision-boundary/0.1.0";
  event_id: string;
  event_digest: Digest;
  decision_ref: DigestRef;
  producer_manifest_digest: Digest;
  boundary_digest: Digest;
}

interface AdaptedContentDecision {
  decision: DurableContentDecisionRecord;
  boundary: CanonicalContentDecisionBoundary;
}

interface AdaptContentDecisionInput {
  event: StoredEvent;
  proposal: ProposalRecord;
  producer: ProducerArtifactWitness;
}

declare function adaptContentDecisionEvent(
  input: AdaptContentDecisionInput,
): AdaptedContentDecision;
```

The adapter accepts the complete `StoredEvent`, the complete verified `contentmd.proposal-record`, and a producer witness. It must recompute the event digest from every event field except `event_digest`; require event type `content_decision_recorded`; require event ID `event.<decision_id>`; require the exact closed legacy payload; and require event/payload identity, actor, time, proposal, project, and scope agreement. Accepted events require a nonempty selected expression and null edited expression; edited events require a null selected expression and nonempty edited expression; rejected and abstained events require both expression fields to be null. The adapter rejects other combinations without changing the legacy append API.

The event payload's `proposal_ref` must equal the proposal record ID. The proposal digest must verify, proposal `scope.memory_scope` must equal the event payload scope, and proposal `scope.project_id` must equal the event payload project ID. The durable decision mapping is exact:

| Durable field | Source or rule |
|---|---|
| `record_id` | event payload `decision_id` |
| `schema_id` / `schema_version` | `contentmd.content-decision-record` / `0.1.0` |
| `record_version` / `lifecycle_state` | `1` / `active` |
| `scope.memory_scope` | event payload `scope` |
| `scope.project_id` | event payload `project_id` |
| `scope.resource_refs` | proposal record ID only |
| `scope.data_classes` | event `data_class` only |
| `payload.proposal_ref` | proposal record ID |
| `payload.status` | event payload status |
| `payload.actor_role` / `rationale` | event payload values |
| `payload.selected_expression` | accepted: `selected_expression`; edited: `edited_expression`; rejected or abstained: `null` |
| `payload.evidence_reviewed` | event payload's already unique, sorted, nonempty set |
| `payload.decided_at` | event `occurred_at` |

Provenance contains the proposal record (`decision_subject`) and stored event (`decision_event`), plus a non-null producer receipt as `producer_verification`; it is sorted under section 10. Using the event digest as the event provenance digest does not turn it into the decision content digest.

After `finalizeRecord()`, the boundary preimage is exactly:

```text
{
  contract_version: "contentmd.content-decision-boundary/0.1.0",
  event_id,
  event_digest,
  decision_ref,
  producer_manifest_digest
}
```

`boundary_digest = sha256Canonical(preimage)`. A qualification input must carry the complete decision, complete event, and boundary; all three are reverified.

## 6. Resolver-free evidence bundle

Task 2 performs no network, database, browser, or implicit global lookup. Each call carries a complete closed evidence bundle. A snapshot has this common envelope:

```ts
interface EvidenceSnapshot<K extends string, P> {
  contract_version: "contentmd.task2-evidence-snapshot/0.1.0";
  snapshot_id: string;
  snapshot_kind: K;
  snapshot_version: "0.1.0";
  captured_at: Rfc3339;
  verification_mode: "development_fixture" | "resolver_verified";
  verification_receipt: VerificationReceiptRecord | null;
  source_refs: [DigestRef, ...DigestRef[]];
  payload: P;
  snapshot_digest: Digest;
}
```

`snapshot_digest = sha256Canonical({ contract_version, snapshot_id, snapshot_kind, snapshot_version, captured_at, source_refs, payload })`; the verification mode, receipt, and digest itself are excluded. Snapshot IDs are valid record IDs. Source refs are unique and sorted. Snapshots are immutable input witnesses, not approvals or new canonical project-memory records. Output `DigestRef`s for snapshot-backed fields use the snapshot ID, schema ID `contentmd.task2-<snapshot_kind>-snapshot`, version `0.1.0`, and snapshot digest. `development_fixture` verification requires a null receipt. `resolver_verified` requires one complete digest-valid receipt with status `passed`, transaction ref `evidence-snapshot.<snapshot_digest>`, target path `contentmd://task2/evidence-snapshot/<snapshot_id>`, expected and observed digests both equal to the snapshot digest, and method `sha256-canonical-readback`. Resolver/store authentication and canonical retrievability belong to the reserved future official path, which the current constructors reject. This split avoids receipt/hash self-reference. A generic receipt never supplies a decision or permission.

The qualification bundle contains exactly:

```ts
interface FeedbackQualificationInput {
  record_mode: RecordMode;
  evaluation_at: Rfc3339;
  producer: ProducerArtifactWitness;
  decision_event: StoredEvent;
  proposal: ProposalRecord;
  decision: DurableContentDecisionRecord;
  decision_boundary: CanonicalContentDecisionBoundary;
  review: EvidenceSnapshot<"pairwise-review", PairwiseReviewPayload>;
  rubric: EvidenceSnapshot<"review-rubric", ReviewRubricPayload>;
  reviewer_set: EvidenceSnapshot<"reviewer-set", ReviewerSetPayload>;
  fact_set: EvidenceSnapshot<"fact-set", StableSetPayload>;
  policy: EvidenceSnapshot<"review-policy", StableSetPayload>;
  task: EvidenceSnapshot<"task", TaskPayload>;
  context: EvidenceSnapshot<"context", ContextPayload>;
  candidate_a: EvidenceSnapshot<"candidate", CandidatePayload>;
  candidate_b: EvidenceSnapshot<"candidate", CandidatePayload>;
  presentation: EvidenceSnapshot<"presentation", PresentationPayload>;
  lineage_a: EvidenceSnapshot<"candidate-lineage", CandidateLineagePayload>;
  lineage_b: EvidenceSnapshot<"candidate-lineage", CandidateLineagePayload>;
  adjudication: EvidenceSnapshot<"adjudication", AdjudicationPayload> | null;
}
```

The closed payloads are:

```ts
interface StableSetPayload {
  item_refs: [DigestRef, ...DigestRef[]];
  set_digest: Digest;
  state: "current" | "superseded" | "revoked" | "unknown";
}

interface TaskPayload {
  task_key: string;
  fact_set_ref: DigestRef;
  policy_ref: DigestRef;
  context_ref: DigestRef;
  requirements_digest: Digest;
  content_slot: string;
  ranking_objective: "expression_preference";
  candidate_kind: "expression";
}

interface ContextPayload {
  context_key: string;
  product_area: string;
  journey_state: string;
  channel: string;
  locale: string;
  surface: string;
  audience: string;
  content_slot: string;
}

interface CandidatePayload {
  task_ref: DigestRef;
  context_ref: DigestRef;
  content_slot: string;
  author_refs: DigestRef[];
  expression: string;
  expression_digest: Digest;
}

interface BlindingProof {
  status: "pass" | "fail";
  reviewer_refs: [DigestRef, ...DigestRef[]];
  hidden_fields: ["candidate_identity", "provider_identity", "author_identity"];
  evidence_refs: [DigestRef, ...DigestRef[]];
}

interface RandomizationProof {
  status: "pass" | "fail";
  algorithm: "sha256-counter-v1";
  seed_commitment_digest: Digest;
  assignment_digest: Digest;
  evidence_refs: [DigestRef, ...DigestRef[]];
}

interface PresentationPayload {
  task_ref: DigestRef;
  context_ref: DigestRef;
  candidate_a_ref: DigestRef;
  candidate_b_ref: DigestRef;
  canonical_order: ["A", "B"];
  presented_order: ["A", "B"] | ["B", "A"];
  comparison_kind: "explicit_pairwise" | "accepted_edit_vs_original";
  original_proposal_side: "A" | "B" | null;
  blinding_proof: BlindingProof;
  randomization_proof: RandomizationProof;
  fact_set_ref: DigestRef;
  policy_ref: DigestRef;
  requirements_digest: Digest;
}

interface PairwiseReviewPayload {
  decision_ref: DigestRef;
  presentation_ref: DigestRef;
  reviewer_set_ref: DigestRef;
  reviewer_refs: [DigestRef, ...DigestRef[]];
  rubric_ref: ArtifactRef;
  outcome: "A" | "B" | "tie" | "abstain";
  rationale_codes: [string, ...string[]];
  conflict_state: "none" | "declared" | "unresolved";
  observed_fact_set_ref: DigestRef;
  observed_policy_ref: DigestRef;
  observed_task_ref: DigestRef;
  observed_context_ref: DigestRef;
  observed_requirements_digest: Digest;
}

interface ReviewRubricPayload {
  artifact_ref: ArtifactRef;
  ranking_objective: "expression_preference";
  candidate_kind: "expression";
  allowed_outcomes: ["A", "B", "tie", "abstain"];
  requires_blinding: true;
  requires_randomization: true;
  requires_rationale: true;
  stable_dimensions: ["facts", "requirements", "context"];
  status: "current" | "superseded" | "revoked";
}

interface ReviewerEntry {
  reviewer_ref: DigestRef;
  role: "content_reviewer" | "content_designer" | "subject_matter_expert" | "adjudicator";
  qualified_objectives: ["expression_preference"];
  authorized_scopes: [MemoryScope, ...MemoryScope[]];
  independent_of_candidate_authorship: boolean;
  independence_evidence_refs: [DigestRef, ...DigestRef[]];
  conflict_state: "none" | "declared" | "resolved" | "unresolved";
  qualification_status: "current" | "expired" | "revoked" | "unknown";
  effective_at: Rfc3339;
  expires_at: Rfc3339 | null;
}

interface ReviewerSetPayload {
  entries: [ReviewerEntry, ...ReviewerEntry[]];
  set_digest: Digest;
}

type LineageSourceClass =
  | "project_owned"
  | "project_owned_synthetic"
  | "browser_observed"
  | "competitor"
  | "third_party"
  | "nonconforming"
  | "unknown";

interface LineageNode {
  subject_ref: DigestRef;
  parent_refs: DigestRef[];
  source_class: LineageSourceClass;
  rights_state: "training_permitted" | "blocking_only" | "prohibited" | "unknown";
}

interface CandidateLineagePayload {
  candidate_ref: DigestRef;
  nodes: [LineageNode, ...LineageNode[]];
  transitive_complete: boolean;
}

interface AdjudicationPayload {
  review_ref: DigestRef;
  adjudicator_ref: DigestRef;
  disposition: "A" | "B" | "tie" | "unresolved";
  rationale_codes: [string, ...string[]];
  status: "complete" | "invalid" | "revoked";
}
```

Candidate expressions are nonempty and `expression_digest = sha256(UTF8(expression))`. Candidates are distinct by reference and digest, but must share the exact task, context, and content slot. Reviewer entries are unique by reviewer ref. Lineage nodes are unique by subject ref, every parent resolves inside the node set, all nodes are reachable from the candidate root, and the graph is acyclic.

`StableSetPayload.set_digest = sha256Canonical({ contract_version: "contentmd.task2-stable-set/0.1.0", item_refs })`. `ReviewerSetPayload.set_digest = sha256Canonical({ contract_version: "contentmd.task2-reviewer-set/0.1.0", entries })`. Both input arrays are unique and sorted before recomputation.

The pairwise-review snapshot is the immutable pre-adjudication review. It never contains an adjudication ref or the state `adjudicated`; this makes the evidence graph acyclic. A later adjudication snapshot points one way to that already-finalized review through `AdjudicationPayload.review_ref`. The reviewer-set snapshot contains participants only, never merely eligible nonparticipants. With no adjudication, the pairwise review's reviewer refs must equal both the reviewer-set entry refs and the blinding-proof reviewer refs. With valid adjudication, the union of pairwise-review reviewer refs and the one adjudicator ref must equal both the reviewer-set entry refs and the blinding-proof reviewer refs. Thus an adjudicator whose disposition becomes the effective outcome must be covered by the same passing presentation-blinding proof. None may occur in either candidate's author refs. Every entry must carry nonempty independence evidence and `independent_of_candidate_authorship: true` before it counts toward policy minima. Eligibility counts this exact participant set.

The randomization assignment digest is recomputed as `sha256Canonical({ contract_version: "contentmd.task2-presentation-assignment/0.1.0", task_ref, context_ref, candidate_a_ref, candidate_b_ref, canonical_order, presented_order, seed_commitment_digest })`. `blinded` is derived true only from a passing proof with the exact three hidden fields and matching reviewers; `randomized` is derived true only from a passing proof with a matching assignment digest.

Only `project_owned` and `project_owned_synthetic` nodes with `training_permitted` rights are learning-eligible. A browser, competitor, third-party, nonconforming, unknown, incomplete, cyclic, or dangling lineage is blocking evidence only and can never produce a qualified preference.

## 7. Qualification derivation

Malformed bytes, shapes, timestamps, digests, refs, producer witnesses, or boundary records throw `Task2ContractError` and issue no learning record. Verified but substantively deficient evidence produces a qualification record.

The implementation derives all booleans and states; callers do not supply `blinded`, `randomized`, drift flags, qualification state, or reason codes directly.

State precedence is `invalid` over `abstained` over `not_qualified` over `qualified`:

| Condition | State | Required reason code |
|---|---|---|
| any task/context/candidate/presentation/decision ref mismatch | `invalid` | `cross_record_reference_mismatch` |
| fact-set ref or digest changed | `invalid` | `facts_changed` |
| review-policy ref or digest changed | `invalid` | `policy_changed` |
| requirements digest changed | `invalid` | `requirements_changed` |
| task or context changed | `invalid` | `context_changed` |
| review conflict is `unresolved`, or a supplied adjudication is inconsistent/invalid | `invalid` | `conflict_unresolved` or `adjudication_invalid` |
| review outcome is `abstain` and no invalid condition exists | `abstained` | `reviewer_abstained` |
| review outcome is `tie` | `not_qualified` | `non_decisive_tie` |
| blinding or randomization proof fails | `not_qualified` | `blinding_required` or `randomization_required` |
| rubric is not current or mismatches objective/kind | `not_qualified` | `rubric_not_current_or_mismatched` |
| reviewer set is expired, revoked, unknown, conflicted, or unqualified | `not_qualified` | `reviewer_set_not_qualified` |
| either lineage is not fully eligible | `not_qualified` | `candidate_lineage_not_learning_eligible` |
| review conflict is `declared` and `adjudication === null` | `not_qualified` | `conflict_requires_adjudication` |
| fact-set state is not `current` | `not_qualified` | `fact_set_not_current` |
| review-policy state is not `current` | `not_qualified` | `review_policy_not_current` |
| every required condition passes and outcome is A or B | `qualified` | `qualified_decisive_review` |

Conflict handling is total and acyclic. A review state of `none` requires a null adjudication, produces output conflict state `none`, and uses the review outcome. A review state of `declared` with a null adjudication produces output conflict state `declared` and cannot qualify. A review state of `declared` with a non-null adjudication whose `review_ref` matches the already-finalized pairwise-review snapshot, whose status is `complete`, whose adjudicator is a current independent reviewer-set entry with role `adjudicator`, and whose disposition is A, B, or tie produces output conflict state `adjudicated`; that disposition becomes the effective outcome. A review state of `unresolved` requires a null adjudication and is invalid. An adjudication supplied for `none` or `unresolved`, or a non-null mismatched, invalid, revoked, or `unresolved` adjudication supplied with `declared`, is invalid. The pairwise-review snapshot never points back to the adjudication snapshot, so the two snapshot digests have a finite construction order: finalize review, then finalize adjudication.

For an effective A or B outcome, the durable decision must be `accepted` or `edited`, and its selected expression must exactly equal the selected candidate expression. An accepted decision requires `comparison_kind: explicit_pairwise` and null original-proposal side. An edited decision requires `comparison_kind: accepted_edit_vs_original`; its selected candidate is the accepted edit, `original_proposal_side` names the other candidate, and that other candidate expression must exactly equal one entry in the verified proposal's alternatives. A tie requires a `rejected` decision with no selected expression. An abstention requires an `abstained` decision with no selected expression. Other status/outcome combinations are `invalid` with `decision_outcome_mismatch`; a malformed edited comparison is invalid with `edited_comparison_invalid`.

The output fields are exact projections of verified inputs. `facts_changed`, `requirements_changed`, and `context_changed` are recomputed comparisons. Reason codes are unique and lexicographically sorted, except the single success code. Rationale codes are the review's unique sorted nonempty set.

The payload mapping is exact:

| Qualification field | Value |
|---|---|
| `decision_ref` | canonical durable decision ref |
| `rubric_ref` | review-rubric payload artifact ref |
| `reviewer_qualification_ref` | reviewer-set snapshot ref |
| `fact_set_ref` / `policy_ref` | fact-set and review-policy snapshot refs |
| `task_ref` / `context_ref` | task and context snapshot refs |
| `candidate_a_ref` / `candidate_b_ref` | canonical A and B snapshot refs |
| `presentation_ref` | presentation snapshot ref |
| `blinded` / `randomized` | actual derived presentation/proof results; qualified records require both true |
| `outcome` | effective outcome: pairwise-review outcome without adjudication, otherwise the valid adjudication disposition |
| `conflict_state` | derived `none`, `declared`, `unresolved`, or `adjudicated` state from the total transition above |
| `adjudication_ref` | adjudication snapshot ref only when the derived conflict state is `adjudicated`; otherwise null |
| drift flags, state, reason codes | deterministic derivation in this section |

The closed qualification reason-code vocabulary is:

```text
qualified_decisive_review
cross_record_reference_mismatch
facts_changed
policy_changed
requirements_changed
context_changed
conflict_unresolved
adjudication_invalid
decision_outcome_mismatch
edited_comparison_invalid
reviewer_abstained
non_decisive_tie
blinding_required
randomization_required
rubric_not_current_or_mismatched
reviewer_set_not_qualified
candidate_lineage_not_learning_eligible
conflict_requires_adjudication
fact_set_not_current
review_policy_not_current
```

No other qualification reason is schema-valid for a Task 2 producer. Invalid conditions are accumulated before precedence is applied, so an abstention with changed facts remains `invalid` and carries the applicable invalid reasons rather than `reviewer_abstained`.

## 8. Learning eligibility derivation

```ts
interface LearningEligibilityInput {
  record_mode: RecordMode;
  evaluation_at: Rfc3339;
  producer: ProducerArtifactWitness;
  qualification: FeedbackQualificationRecord;
  decision: DurableContentDecisionRecord;
  learning_policy: EvidenceSnapshot<"learning-policy", LearningPolicyPayload>;
  permission: EvidenceSnapshot<"learning-permission", LearningPermissionPayload> | null;
  checks: EvidenceSnapshot<"eligibility-checks", EligibilityChecksPayload>;
  lineage_a: EvidenceSnapshot<"candidate-lineage", CandidateLineagePayload>;
  lineage_b: EvidenceSnapshot<"candidate-lineage", CandidateLineagePayload>;
  reviewer_set: EvidenceSnapshot<"reviewer-set", ReviewerSetPayload>;
  target_memory_scope: MemoryScope;
}
```

```ts
interface LearningPolicyPayload {
  policy_ref: DigestRef;
  status: "current" | "superseded" | "revoked" | "unknown";
  ranking_objective: "expression_preference";
  candidate_kind: "expression";
  allowed_memory_scopes: [MemoryScope, ...MemoryScope[]];
  allowed_scope_transitions: [ScopeTransition, ...ScopeTransition[]];
  minimum_independent_reviewers: Record<MemoryScope, number>;
  allowed_lineage_classes: ["project_owned", "project_owned_synthetic"];
  required_checks: ["rights", "privacy", "factual", "policy", "incident", "context"];
  edited_content_requires_unchanged_facts_requirements_context: true;
}

interface ScopeTransition {
  from: MemoryScope;
  to: MemoryScope;
}

interface LearningPermissionPayload {
  permission_ref: DigestRef;
  permission_class: "learning_data";
  status: "issued" | "revoked" | "expired" | "superseded";
  revocation_state: "current" | "revoked" | "unknown";
  ranking_objective: "expression_preference";
  candidate_kind: "expression";
  allowed_memory_scopes: [MemoryScope, ...MemoryScope[]];
  project_ids: [string, ...string[]];
  subject_refs: [DigestRef, ...DigestRef[]];
  issued_at: Rfc3339;
  expires_at: Rfc3339 | null;
}

type CheckState = "pass" | "fail" | "unknown";
interface EligibilityCheck {
  state: CheckState;
  evidence_refs: [DigestRef, ...DigestRef[]];
  rationale_codes: [string, ...string[]];
}
interface EligibilityChecksPayload {
  qualification_ref: DigestRef;
  decision_ref: DigestRef;
  task_ref: DigestRef;
  context_ref: DigestRef;
  candidate_a_ref: DigestRef;
  candidate_b_ref: DigestRef;
  target_memory_scope: MemoryScope;
  project_id: string | null;
  evaluated_at: Rfc3339;
  rights: EligibilityCheck;
  privacy: EligibilityCheck;
  factual: EligibilityCheck;
  policy: EligibilityCheck;
  incident: EligibilityCheck;
  context: EligibilityCheck;
}
```

Eligibility is `eligible` only when all of the following are true:

- qualification digest verifies and state is `qualified` with outcome A or B;
- decision ref equals the qualification decision ref;
- learning policy is current and matches objective, kind, target scope, and the exact six-check set;
- the exact qualification-scope to target-scope pair appears in `allowed_scope_transitions`;
- permission is present, issued, current, effective, unexpired, objective/kind compatible, covers the target scope and project, and covers both candidate refs plus the decision ref;
- each of the six checks is `pass`;
- the checks snapshot's qualification, decision, task, context, candidates, target scope, project, and evaluation time exactly match this eligibility input;
- both candidate lineages remain complete and learning-eligible;
- both lineage roots match the qualification candidate refs, and the reviewer-set snapshot ref equals the qualification reviewer-qualification ref;
- the current reviewer set has the policy-required number of qualified independent reviewers for the target scope; and
- edited content has unchanged facts, requirements, and context.

One qualified reviewer may satisfy `personal` or named `project` observational eligibility when policy says one. `organization` or `public` eligibility requires at least two qualified independent reviewers and any higher exact policy-defined count. Policy minima are integers at least one for task/personal/project and at least two for organization/public. A role title or authorship assertion alone never qualifies a reviewer.

Any failed condition yields `ineligible` and a unique sorted reason set. Missing, expired, revoked, future, or unknown permission yields a specific permission reason. Each failed or unknown check yields `<check>_check_fail` or `<check>_check_unknown`. A qualified record yields only `all_eligibility_checks_passed`.

The eligibility payload maps `qualification_ref` and `decision_ref` to their complete verified records; `learning_policy_ref` and `permission_ref` to their outer snapshot refs, never the snapshots' nested subject refs; the six check fields to their namesake check states; and target scope, state, and reason codes to the deterministic derivation above. A null permission input always produces a null permission ref and an ineligible record. Policy scopes and transitions are unique, canonical-sorted sets; reviewer entries are unique by reviewer ref and reviewer scopes are unique canonical-sorted sets.

The closed eligibility reason-code vocabulary is:

```text
all_eligibility_checks_passed
feedback_not_qualified
decision_ref_mismatch
learning_policy_not_current_or_mismatched
scope_transition_not_allowed
permission_missing
permission_not_current
permission_not_yet_effective
permission_expired
permission_revoked_or_unknown
permission_objective_or_kind_mismatch
permission_scope_mismatch
permission_project_mismatch
permission_subject_mismatch
eligibility_checks_binding_mismatch
rights_check_fail
rights_check_unknown
privacy_check_fail
privacy_check_unknown
factual_check_fail
factual_check_unknown
policy_check_fail
policy_check_unknown
incident_check_fail
incident_check_unknown
context_check_fail
context_check_unknown
candidate_lineage_not_learning_eligible
reviewer_set_insufficient_or_unqualified
edited_content_changed
```

No other eligibility reason is emitted. All deficiencies are accumulated and lexicographically sorted. Only the single success code is emitted for an eligible record.

## 9. Preference example derivation

```ts
interface PreferenceExampleInput {
  record_mode: RecordMode;
  evaluation_at: Rfc3339;
  producer: ProducerArtifactWitness;
  qualification: FeedbackQualificationRecord;
  eligibility: LearningEligibilityRecord;
  decision: DurableContentDecisionRecord;
  task: EvidenceSnapshot<"task", TaskPayload>;
  context: EvidenceSnapshot<"context", ContextPayload>;
  candidate_a: EvidenceSnapshot<"candidate", CandidatePayload>;
  candidate_b: EvidenceSnapshot<"candidate", CandidatePayload>;
  presentation: EvidenceSnapshot<"presentation", PresentationPayload>;
  feature_source_checkpoint_set_ref: DigestRef;
}
```

The constructor issues a record only if qualification is `qualified`, eligibility is `eligible`, outcome is A or B, every complete record digest verifies, and every qualification/eligibility/decision/task/context/candidate/presentation ref agrees. Otherwise it throws `Task2ContractError("learning_example_not_eligible:<reason>")` and issues no preference record.

Candidate identity is never rewritten winner-first. `candidate_a_ref` and `candidate_b_ref` retain canonical A/B assignment, `presented_order` retains the randomized display order, `preferred_side` is the qualified outcome, and `label` is `1` for A or `0` for B. Initial `preference_state` is always `admitted`; `invalidated` and `revoked` are later immutable state transitions outside this constructor.

The presentation digest is:

```text
sha256Canonical({
  contract_version: "contentmd.preference-presentation/0.1.0",
  presentation_ref,
  task_ref,
  context_ref,
  candidate_a_ref,
  candidate_b_ref,
  canonical_order: ["A", "B"],
  presented_order,
  blinded: true,
  randomized: true
})
```

Task 2 binds the supplied feature-checkpoint-set ref but does not inspect stream sequences or temporal membership. Task 3 performs that temporal validation before dataset admission.

The closed preference-admission reason suffixes are:

```text
qualification_state
eligibility_state
non_decisive_outcome
record_mode
cross_record_reference_mismatch
candidate_identity
task_context_or_slot_mismatch
decision_selection_mismatch
presentation_proof
checkpoint_ref_malformed
```

The first failing condition in this listed order is emitted as `learning_example_not_eligible:<suffix>`; the constructor never emits a partially valid preference record.

## 10. Input digests, IDs, scope, and provenance

Each function computes `input_digest = sha256Canonical(preimage)`. The exact preimages are:

```ts
const qualificationPreimage = {
  contract_version: "contentmd.feedback-qualification-input/0.1.0",
  record_mode,
  evaluation_at,
  derived_output_scope,
  producer,
  decision_event,
  proposal,
  decision,
  decision_boundary,
  evidence: {
    review, rubric, reviewer_set, fact_set, policy, task, context,
    candidate_a, candidate_b, presentation, lineage_a, lineage_b, adjudication,
  },
};

const eligibilityPreimage = {
  contract_version: "contentmd.learning-eligibility-input/0.1.0",
  record_mode,
  evaluation_at,
  derived_output_scope,
  producer,
  qualification,
  decision,
  evidence: { learning_policy, permission, checks, lineage_a, lineage_b, reviewer_set },
  target_memory_scope,
};

const preferencePreimage = {
  contract_version: "contentmd.preference-example-input/0.1.0",
  record_mode,
  evaluation_at,
  derived_output_scope,
  producer,
  qualification,
  eligibility,
  decision,
  evidence: { task, context, candidate_a, candidate_b, presentation },
  feature_source_checkpoint_set_ref,
};
```

Every key is required and no other key is permitted. Complete witnesses and receipts are included exactly as supplied after validation. The output envelope, derived output payload, and output `content_digest` are excluded.

Issued records use:

| Record | ID | Lifecycle | Authority |
|---|---|---|---|
| qualification | `feedback-qualification.<input_digest>` | `active` | `none` |
| eligibility | `learning-eligibility.<input_digest>` | `active` | `none` |
| preference | `preference-example.<input_digest>` | `active` | `none` |

All use `record_version: 1`, `schema_version: 0.1.0`, `ranking_objective: expression_preference`, and `candidate_kind: expression`. Qualification scope is exactly the canonical decision scope. Eligibility scope keeps the qualification project, resources, and data classes and changes only `memory_scope` to the policy- and permission-approved target scope. Preference scope is exactly the eligibility scope. Callers cannot supply or widen an output scope directly. Changing any input byte changes the input digest, record ID, and content digest.

Provenance membership and relationship names are exact:

| Output | Required provenance relationships |
|---|---|
| decision | proposal `decision_subject`; event `decision_event` |
| qualification | proposal `proposal`; event `decision_event`; boundary `decision_boundary`; decision `decision`; review `pairwise_review`; rubric `review_rubric`; reviewer set `reviewer_set`; fact set `fact_set`; policy `review_policy`; task `task`; context `context`; candidates `candidate_a` and `candidate_b`; presentation `presentation`; lineages `lineage_a` and `lineage_b`; non-null adjudication `adjudication` |
| eligibility | qualification `qualification`; decision `decision`; policy `learning_policy`; non-null permission `learning_permission`; checks `eligibility_checks`; lineages `lineage_a` and `lineage_b`; reviewer set `reviewer_set` |
| preference | qualification `qualification`; eligibility `eligibility`; decision `decision`; task `task`; context `context`; candidates `candidate_a` and `candidate_b`; presentation `presentation`; checkpoint `feature_source_checkpoint_set` |

A non-null producer receipt is added as `producer_verification`. Each non-null snapshot receipt is added as `<snapshot relationship>_verification`. The boundary provenance ID is `content-decision-boundary.<boundary_digest>` with the boundary digest. Every provenance item is unique and sorted by `(record_id, relationship, content_digest)`.

Canonical collection semantics are also exact. Producer source/code artifacts are sorted by their `path` string, as required by the code-manifest preimage. Proposal alternatives and the two A/B order tuples are ordered. The rubric's allowed outcomes, stable dimensions, required checks, and allowed lineage classes retain their literal declared tuple order. All other semantically set-valued arrays—source/evidence refs, stable-set items, authors, reviewers, reviewer entries and scopes, independence evidence, lineage nodes and parents, rationale codes, policy scopes and transitions, permission project/subject refs, check evidence/reasons, and provenance—are unique and sorted by canonical JSON bytes. Reason codes use the state-specific ordering rules above.

## 11. Error contract

`Task2ContractError` has a stable `code` and message equal to that code. Integrity and shape failures begin `task2_contract_invalid:`. Preference admission failures begin `learning_example_not_eligible:`. The implementation never catches and downgrades a cryptographic, canonicalization, schema, timestamp, or closed-shape failure into an ordinary ineligible state.

```ts
class Task2ContractError extends TypeError {
  readonly code: string;
  constructor(code: string) {
    super(code);
    this.name = "Task2ContractError";
    this.code = code;
  }
}
```

The closed integrity suffixes are:

```text
input_shape
canonical_value
timestamp
record_id
schema_id
digest
event_digest
durable_record_digest
snapshot_digest
receipt_digest
receipt_binding
producer_artifact
producer_manifest
boundary_digest
reference_integrity
expression_digest
lineage_graph
set_uniqueness_or_order
official_mode_not_supported
```

No other `task2_contract_invalid:` suffix is emitted. When more than one integrity failure exists, validation stops at the first check in this listed order.

Substantive qualification and eligibility failures remain inspectable records. Preference creation is different: an ineligible pair has no valid preference identity, so no `PreferenceExampleRecord` is issued.

## 12. Explicit deferrals

Task 2 does not:

- validate feature-source stream sequence, head, receipt, or as-of membership; Task 3 does;
- build leakage groups or dataset splits; Task 3 does;
- compute features or fit a model; Tasks 4 and 5 do;
- create promotion, deployment, rollback, or mutation authority;
- call a browser, provider, remote service, or runtime adapter;
- import competitor or browser wording into a label, prompt, feature, exemplar, or dataset; or
- reinterpret event time as proof that evidence existed before presentation.

## 13. Acceptance tests

Task 2 is complete only when tests prove:

1. event and durable decision digests are distinct, both recompute, and the boundary binds both;
2. the legacy decision API remains byte-for-byte compatible at its public return boundary;
3. every complete input record, event, snapshot, boundary, producer artifact, and receipt digest is recomputed; bare source/evidence refs are checked for closed shape, syntax, uniqueness, and binding only, while checkpoint resolution remains explicitly deferred;
4. A and B decisive reviews qualify only with current rubric, reviewer set, stable facts/requirements/context, blinding, randomization, and eligible lineage;
5. tie, abstention, declared/unresolved conflict, valid adjudication, and every invalid precedence case produce their exact states and reasons;
6. browser, competitor, third-party, nonconforming, incomplete, cyclic, and dangling lineage never qualifies;
7. every permission state, target scope, reviewer-count rule, and six-check pass/fail/unknown branch is exercised;
8. edited content qualifies only when facts, requirements, and context are unchanged;
9. candidate A/B identity and presented order remain unchanged, with labels exactly A → 1 and B → 0;
10. mutated records, snapshots, boundaries, producer bytes, and output records fail verification;
11. every `official` Task 2 request fails closed with `task2_contract_invalid:official_mode_not_supported`; and
12. no test or implementation path grants authority or performs network, browser, provider, mutation, training, or promotion work.
