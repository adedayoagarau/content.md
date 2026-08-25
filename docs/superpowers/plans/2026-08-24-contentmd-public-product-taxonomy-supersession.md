# content.md Public Product Taxonomy and Evidence Supersession Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the portable, governed bridge from immutable public-product evidence to reviewed normalized experience patterns, active evidence projections, and authority-free hypotheses without allowing public wording into prompts, learning, benchmarks, or product authority.

**Architecture:** `@contentmd/governance` gains the shared reviewer-qualification primitive. `@contentmd/research` owns closed review, taxonomy, disposition, and active-projection modules; command-line scripts become filesystem adapters over freshly built package code. Existing batches remain byte-immutable, v0.1 and v0.2 verification run side by side until two-person reviews issue an active taxonomy and dispositions, and the separately planned Cloudflare Agents SDK adapter consumes only canonical refs after the portable tranche passes.

**Tech Stack:** TypeScript 5.9 project references, Node 24.14.0 ESM, Vitest, Node test runner for `.mjs` adapters, canonical JSON and SHA-256 helpers from `@contentmd/core`, existing `@contentmd/governance` authorization replay, JSON/JSONL research artifacts.

**Spec:** `docs/superpowers/specs/2026-08-24-contentmd-public-product-taxonomy-supersession-design.md` (approved SHA-256 `d1660a5c981fbceb896aacc6c5eccf188fcd2b3978766a8e20e2392009b4a9a2`)

## Global Constraints

- Preserve every existing `research/09-experimental/public-product-corpus/*batch-*` byte; corrections use new reserved batch roots and reviewed disposition events.
- Public collection remains signed-out, read-only, and evidence-only: no login, account creation, purchase, submission, personal data, credentials, support contact, or access-control bypass.
- Every public evidence, proposal, review, disposition, hypothesis, and diagnostic keeps `authority_effect: "none"`, `prompt_eligibility: "never"`, `training_eligibility: "never"`, and `benchmark_eligibility: false`.
- Runtime taxonomy lookup is exact only: no trimming, case-folding, translation, embeddings, fuzzy matching, inference, or LLM classification.
- Products and organizations retain fact, policy, approval, and publication authority; reviewer qualification grants only bounded review eligibility.
- No production Cloudflare package, Wrangler configuration, deployment, credentials, or control-plane call belongs to this plan. `packages/runtime-cloudflare` remains separately gated.
- Use pinned Node `/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node` v24.14.0.
- Do not commit or push. Each task ends with a diff/hash/status checkpoint instead of a commit.
- Preserve unrelated dirty and untracked files. Before each task, hash owned files and stop on unassigned drift.
- Use strict RED before production changes, minimal GREEN, then focused and broader regression gates.

---

### Task 1: Shared Governed Reviewer Qualification

**Files:**
- Create: `packages/governance/src/reviewer-qualification.ts`
- Create: `packages/governance/test/reviewer-qualification.test.ts`
- Modify: `packages/governance/src/index.ts`

**Interfaces:**
- Consumes: `authorizeOperation(input: AuthorizationInput): AuthorizationDecision`, `canonicalJson`, and `sha256Canonical`.
- Produces:

```ts
export type ReviewerRole =
  | "qualified_content_designer"
  | "taxonomy_steward"
  | "corpus_steward"
  | "rights_reviewer"
  | "independent_corpus_reviewer";

export interface GovernanceObjectRef {
  object_id: string;
  object_digest: string;
}

export interface ReviewerQualificationMaterial {
  record_mode: "development_fixture" | "governed";
  reviewer_ref: GovernanceObjectRef;
  eligible_roles: readonly ReviewerRole[];
  qualified_objectives: readonly string[];
  authorized_resource_scopes: readonly string[];
  effective_at: string;
  expires_at: string | null;
  issuer_principal_ref: string;
}

export interface AuthorizationReplay {
  input: AuthorizationInput;
  expected_decision: AuthorizationDecision;
}

export interface ReviewerQualificationRecord extends ReviewerQualificationMaterial {
  contract_version: "contentmd.reviewer-qualification/0.1.0";
  qualification_id: string;
  material_digest: string;
  issuance_replay_digest: string;
  revocation_replay_digest: string | null;
  qualification_status: "current" | "expired" | "revoked" | "unknown";
  qualification_effect: "review_eligibility_only";
  authority_effect: "none";
  qualification_digest: string;
}

export function issueReviewerQualification(input: {
  material: ReviewerQualificationMaterial;
  issuance: AuthorizationReplay;
  revocation: AuthorizationReplay | null;
  as_of: string;
}): ReviewerQualificationRecord;

export function verifyReviewerQualification(input: {
  qualification: ReviewerQualificationRecord;
  issuance: AuthorizationReplay;
  revocation: AuthorizationReplay | null;
  as_of: string;
  verification_mode: "development_fixture" | "official";
}): ReviewerQualificationRecord;
```

- [ ] **Step 1: Write the failing qualification tests**

Add fixtures that replay the existing governance plane and assert exact identity plus fail-closed behavior:

```ts
it("issues only an exactly authorized semantic reviewer qualification", () => {
  const record = issueReviewerQualification(governedQualificationInput());
  expect(record).toMatchObject({
    contract_version: "contentmd.reviewer-qualification/0.1.0",
    qualification_status: "current",
    qualification_effect: "review_eligibility_only",
    authority_effect: "none",
  });
  expect(verifyReviewerQualification({
    ...governedQualificationInput(),
    qualification: record,
    verification_mode: "official",
  })).toEqual(record);
});

it.each([
  "policy", "capability", "semantic approval", "control", "audit", "subject digest",
])("rejects a missing, stale, or mismatched %s", (fault) => {
  expect(() => verifyReviewerQualification(faultedQualificationInput(fault)))
    .toThrow("reviewer_qualification_invalid");
});

it("never accepts a development fixture for official review", () => {
  expect(() => verifyReviewerQualification({
    ...developmentQualificationInput(),
    verification_mode: "official",
  })).toThrow("reviewer_qualification_invalid:development_fixture");
});
```

- [ ] **Step 2: Run the focused RED gate**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  node_modules/vitest/vitest.mjs run packages/governance/test/reviewer-qualification.test.ts --reporter=dot
```

Expected: FAIL because `reviewer-qualification.js` and its exports do not exist.

- [ ] **Step 3: Implement exact authorization replay and identity**

Use `sha256Canonical` for the material and replay digests. Replay `authorizeOperation`, require canonical equality with `expected_decision`, require `disposition === "allow"`, action `issue_reviewer_qualification`, approval class `semantic_decision`, request `subject_digest === material_digest`, grant principal equal to `issuer_principal_ref`, exact sorted resource scopes, and a matching allowed audit event. Derive status from `as_of`, expiry, and a separately authorized revocation replay; unknown currentness is never current.

```ts
const materialDigest = sha256Canonical(input.material);
const actualDecision = authorizeOperation(input.issuance.input);
if (canonicalJson(actualDecision) !== canonicalJson(input.issuance.expected_decision)
  || actualDecision.disposition !== "allow"
  || input.issuance.input.request.action !== "issue_reviewer_qualification"
  || input.issuance.input.request.approval_class !== "semantic_decision"
  || input.issuance.input.request.subject_digest !== materialDigest
  || input.issuance.input.capability_grant?.principal_ref !== input.material.issuer_principal_ref) {
  throw new TypeError("reviewer_qualification_invalid:issuance");
}
```

- [ ] **Step 4: Export and run focused GREEN plus governance regression**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  node_modules/vitest/vitest.mjs run packages/governance/test/reviewer-qualification.test.ts packages/governance/test/authorize.test.ts --reporter=dot
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  node_modules/typescript/bin/tsc -b packages/governance/tsconfig.json --pretty false
```

Expected: both commands exit 0.

- [ ] **Step 5: Record the no-commit checkpoint**

Run `git diff --check`, `shasum -a 256` on the three owned files, and `git status --short` for those paths. Do not commit.

---

### Task 2: Portable Public-Product Review Receipts

**Files:**
- Create: `packages/research/src/public-product-contracts.ts`
- Create: `packages/research/src/public-product-review.ts`
- Create: `packages/research/test/public-product-review.test.ts`
- Modify: `packages/research/package.json`
- Modify: `packages/research/tsconfig.json`
- Modify: `packages/research/src/index.ts`
- Modify: `pnpm-lock.yaml`

**Interfaces:**
- Consumes: `ReviewerQualificationRecord`, `AuthorizationReplay`, and `verifyReviewerQualification` from `@contentmd/governance`.
- Produces:

```ts
export interface PublicProductDigestRef {
  object_id: string;
  object_digest: string;
}

export type PublicProductContractErrorCode =
  | "input_shape"
  | "canonical_value"
  | "digest"
  | "reference_binding"
  | "taxonomy_invalid"
  | "taxonomy_unmapped"
  | "taxonomy_review_invalid"
  | "disposition_invalid"
  | "disposition_conflict"
  | "disposition_cycle"
  | "replacement_invalid"
  | "reviewer_qualification"
  | "rights_boundary"
  | "source_projection"
  | "evidence_quarantined"
  | "authority_violation"
  | "replica_acknowledgement";

export class PublicProductContractError extends TypeError {
  readonly code: PublicProductContractErrorCode;
}

export const PUBLIC_PRODUCT_ERROR_PRECEDENCE = [
  "input_shape",
  "canonical_value",
  "digest",
  "reference_binding",
  "reviewer_qualification",
  "taxonomy_invalid",
  "taxonomy_review_invalid",
  "disposition_invalid",
  "disposition_conflict",
  "disposition_cycle",
  "replacement_invalid",
  "rights_boundary",
  "source_projection",
  "evidence_quarantined",
  "authority_violation",
  "replica_acknowledgement",
] as const satisfies readonly PublicProductContractErrorCode[];

export function compareUnicodeScalar(left: string, right: string): number;
export function sha256Bytes(bytes: Uint8Array): string;
export function immutableClone<T>(value: T): Readonly<T>;
export function assertClosedPlainRecord(
  value: unknown,
  expectedKeys: readonly string[],
  path: string,
): asserts value is Record<string, unknown>;

export type PublicProductReviewKind =
  | "taxonomy_mapping"
  | "taxonomy_version"
  | "evidence_disposition_set"
  | "pattern_hypothesis";

export interface PublicProductReviewReceipt {
  contract_version: "contentmd.public-product-review-receipt/0.1.0";
  receipt_id: string;
  record_mode: "development_fixture" | "official";
  review_kind: PublicProductReviewKind;
  subject_ref: PublicProductDigestRef;
  reviewer_ref: PublicProductDigestRef;
  reviewer_role: ReviewerRole;
  qualification_ref: PublicProductDigestRef;
  checklist_version: string;
  checklist_results: readonly { item: string; status: "pass" | "fail" | "insufficient" }[];
  decision: "pass" | "fail" | "insufficient";
  reviewed_at: string;
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  receipt_digest: string;
}

export interface PublicProductReviewGovernanceEvidence {
  contract_version: "contentmd.public-product-review-governance/0.1.0";
  as_of: string;
  qualifications: readonly ReviewerQualificationRecord[];
  qualification_replays: readonly {
    qualification_id: string;
    issuance: AuthorizationReplay;
    revocation: AuthorizationReplay | null;
  }[];
  receipts: readonly PublicProductReviewReceipt[];
  governance_digest: string;
}

export function createPublicProductReviewReceipt(input: {
  record_mode: "development_fixture" | "official";
  review_kind: PublicProductReviewKind;
  subject_ref: PublicProductDigestRef;
  qualification: ReviewerQualificationRecord;
  reviewer_role: ReviewerRole;
  checklist_version: string;
  checklist_results: PublicProductReviewReceipt["checklist_results"];
  decision: PublicProductReviewReceipt["decision"];
  reviewed_at: string;
}): PublicProductReviewReceipt;

export function verifyPublicProductReviewPair(input: {
  kind: PublicProductReviewKind;
  subject_ref: PublicProductDigestRef;
  receipt_refs: readonly [PublicProductDigestRef, PublicProductDigestRef];
  required_roles: readonly [ReviewerRole, ReviewerRole];
  governance: PublicProductReviewGovernanceEvidence;
  verification_mode: "development_fixture" | "official";
}): readonly [PublicProductReviewReceipt, PublicProductReviewReceipt];
```

- [ ] **Step 1: Write RED tests for exact checklists and qualification binding**

Cover all four review kinds, exact checklist versions and item order, subject drift, changed review result, wrong role order, duplicate reviewer, stale/revoked qualification, self-declared qualification, official use of development fixtures, extra keys/accessors/symbols, and disabled authority/learning fields.

```ts
it("rejects duplicate reviewers even when both receipts are digest-valid", () => {
  const fixture = reviewFixture();
  expect(() => verifyPublicProductReviewPair({
    ...fixture.pairInput,
    receipt_refs: [fixture.firstReceiptRef, fixture.firstReceiptRef],
  })).toThrow("public_product_review_invalid:duplicate_reviewer");
});
```

- [ ] **Step 2: Run the focused RED gate**

Run the new research test with pinned Vitest. Expected: missing module/export failure.

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  node_modules/vitest/vitest.mjs run packages/research/test/public-product-review.test.ts --reporter=dot
```

- [ ] **Step 3: Implement closed receipt and governance verification**

Use descriptor-safe closed-object traversal before reading nested values. Freeze exact checklist arrays per review kind. Derive receipt IDs from the review subject, reviewer, role, checklist, results, decision, and time; derive receipt digest from every field except itself. Verify qualification replay before accepting a receipt. Canonically sort governance arrays and reject duplicates.

```ts
const CHECKLISTS = Object.freeze({
  taxonomy_mapping: Object.freeze([
    "raw_state_accuracy", "coverage_slot_fit", "journey_family_fit", "state_class_fit",
    "content_slot_fit", "channel_fit", "counterexample_sufficiency",
    "industry_neutrality", "localization_transferability", "rights_safe_abstraction",
  ]),
  taxonomy_version: Object.freeze([
    "definition_completeness", "semantic_id_stability", "mapping_set_completeness",
    "previous_version_compatibility", "effective_time_validity", "review_closure",
    "no_authority_or_learning_widening",
  ]),
  evidence_disposition_set: Object.freeze([
    "subject_accuracy", "transition_legality", "reason_fit", "replacement_validity",
    "rights_or_projection_safety", "complete_set_review",
  ]),
  pattern_hypothesis: Object.freeze([
    "state_accuracy", "user_goal_alignment", "clarity", "actionable_recovery",
    "accessibility", "localization_transferability", "evidence_quality",
    "counterexample_coverage", "rights_abstraction",
  ]),
} as const);
```

Expose one internal stage-plan runner over `PUBLIC_PRODUCT_ERROR_PRECEDENCE`. Every public verifier must exhaust a category across its complete supplied graph before any later category. Add pairwise dual-fault tests for every reachable adjacent category; do not rely on operation order or nested helper throw order.

`taxonomy_unmapped` is a per-observation diagnostic produced only after all integrity stages; it grants no coverage and is not inserted into the thrown-error stage array.

- [ ] **Step 4: Add the governance dependency and run GREEN**

Add `"@contentmd/governance": "workspace:*"` to research dependencies and its TypeScript project reference. Export only public types/functions from `packages/research/src/index.ts`. Run focused governance/research tests and both package builds.

Update the existing research importer in `pnpm-lock.yaml` using the workspace's offline pnpm runtime; do not regenerate unrelated importer resolutions.

```bash
PATH="/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:$PATH" \
  /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm \
  install --lockfile-only --offline
```

- [ ] **Step 5: Record the no-commit checkpoint**

Run diff-check, path-scoped hashes, and status. Do not commit.

---

### Task 3: Versioned Experience Taxonomy and Proposal Queue

**Files:**
- Create: `packages/research/src/public-product-taxonomy.ts`
- Create: `packages/research/test/public-product-taxonomy.test.ts`
- Modify: `packages/research/src/index.ts`

**Interfaces:**
- Consumes: public-product refs/reviews and governance evidence from Task 2.
- Produces:

```ts
export const PUBLIC_PRODUCT_COVERAGE_SLOTS = [
  "entry_onboarding",
  "core_task_commitment",
  "pending_progress",
  "success",
  "error_recovery",
  "destructive_permission_support",
] as const;

export interface RawStructuralSignature {
  journey: string;
  event_state: string;
  content_slot_type: string;
  surface_channel: string;
}

export interface NormalizedStructuralSignature {
  coverage_slot_id: typeof PUBLIC_PRODUCT_COVERAGE_SLOTS[number];
  journey_family_id: string;
  state_class_id: string;
  content_slot_class_id: string;
  surface_channel_id: string;
}

export interface PublicProductTaxonomyDefinition {
  definition_id: string;
  display_name: string;
  description: string;
  inclusion_rule: string;
  exclusion_rule: string;
  counterexample_refs: readonly PublicProductDigestRef[];
  definition_digest: string;
}

export interface ExperienceMapping {
  mapping_id: string;
  raw_signature: RawStructuralSignature;
  normalized_signature: NormalizedStructuralSignature;
  rationale: string;
  counterexample_refs: readonly PublicProductDigestRef[];
  mapping_material_digest: string;
  review_receipt_refs: readonly [PublicProductDigestRef, PublicProductDigestRef];
  mapping_digest: string;
}

export interface PublicProductExperienceTaxonomy {
  contract_version: "contentmd.public-product-experience-taxonomy/0.1.0";
  taxonomy_id: string;
  taxonomy_version: string;
  previous_taxonomy_ref: PublicProductDigestRef | null;
  effective_at: string;
  coverage_slots: readonly PublicProductTaxonomyDefinition[];
  journey_families: readonly PublicProductTaxonomyDefinition[];
  state_classes: readonly PublicProductTaxonomyDefinition[];
  content_slot_classes: readonly PublicProductTaxonomyDefinition[];
  surface_channels: readonly PublicProductTaxonomyDefinition[];
  mappings: readonly ExperienceMapping[];
  mapping_review_receipt_refs: readonly PublicProductDigestRef[];
  taxonomy_review_receipt_refs: readonly [PublicProductDigestRef, PublicProductDigestRef];
  taxonomy_material_digest: string;
  classification_effect: "corpus_projection_only";
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  taxonomy_digest: string;
}

export interface PublicProductTaxonomyProposal {
  contract_version: "contentmd.public-product-taxonomy-proposal/0.1.0";
  proposal_id: string;
  active_taxonomy_ref: PublicProductDigestRef | null;
  raw_signature: RawStructuralSignature;
  proposed_signature: NormalizedStructuralSignature;
  evidence_refs: readonly PublicProductDigestRef[];
  counterexample_refs: readonly PublicProductDigestRef[];
  proposer_kind: "deterministic_rule" | "human" | "ml_suggestion";
  proposer_artifact_refs: readonly PublicProductDigestRef[];
  confidence: number;
  review_state: "unreviewed";
  classification_effect: "none";
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  proposal_digest: string;
}

export interface VerifiedExperienceTaxonomy {
  taxonomy: PublicProductExperienceTaxonomy;
  by_raw_signature_digest: ReadonlyMap<string, ExperienceMapping>;
  taxonomy_ref: PublicProductDigestRef;
}

export function verifyPublicProductExperienceTaxonomy(input: {
  taxonomy: PublicProductExperienceTaxonomy;
  governance: PublicProductReviewGovernanceEvidence;
  as_of: string;
  verification_mode: "development_fixture" | "official";
}): VerifiedExperienceTaxonomy;

export function normalizePublicProductSignature(
  taxonomy: VerifiedExperienceTaxonomy,
  raw: RawStructuralSignature,
): NormalizedStructuralSignature | null;

export function createTaxonomyProposal(input: {
  active_taxonomy_ref: PublicProductDigestRef | null;
  raw_signature: RawStructuralSignature;
  proposed_signature: NormalizedStructuralSignature;
  evidence_refs: readonly PublicProductDigestRef[];
  counterexample_refs: readonly PublicProductDigestRef[];
  proposer_kind: "deterministic_rule" | "human" | "ml_suggestion";
  proposer_artifact_refs: readonly PublicProductDigestRef[];
  confidence: number;
}): PublicProductTaxonomyProposal;
```

- [ ] **Step 1: Write taxonomy RED tests**

Test the exact six-slot order, closed definition arrays, scalar ordering, stable IDs/digests, previous-version binding, duplicate raw signatures, nonexistent normalized IDs, exact lookup, unknown lookup returning `null`, mapping review pairs, whole-taxonomy version review, ML proposal isolation, and taxonomy identity changes when any reviewed material changes.

```ts
it("uses exact lookup and gives unknown signatures no mapping", () => {
  const verified = verifyPublicProductExperienceTaxonomy(taxonomyFixture());
  expect(normalizePublicProductSignature(verified, rawSignature("start")))
    .toEqual(normalizedSignature("entry_onboarding"));
  expect(normalizePublicProductSignature(verified, rawSignature("Start"))).toBeNull();
});
```

- [ ] **Step 2: Run RED and capture the missing-module failure**

Run pinned Vitest on `public-product-taxonomy.test.ts`. Expected: FAIL before production code.

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  node_modules/vitest/vitest.mjs run packages/research/test/public-product-taxonomy.test.ts --reporter=dot
```

- [ ] **Step 3: Implement descriptor-safe taxonomy verification**

Build `mapping_material_digest` before reviews, verify mapping receipt pairs, derive finalized mapping IDs/digests, derive `taxonomy_material_digest`, verify the taxonomy-version receipt pair, then derive taxonomy ID/digest. Exact lookup hashes canonical `RawStructuralSignature`; it performs no normalization beyond canonical serialization.

```ts
const rawKey = sha256Canonical(raw);
const mapping = taxonomy.by_raw_signature_digest.get(rawKey);
return mapping === undefined
  ? null
  : immutableClone(mapping.normalized_signature);
```

- [ ] **Step 4: Implement proposal creation without activation authority**

Require all proposal authority/learning fields to remain disabled. `ml_suggestion` requires exact model/code/input refs but changes only queue order through confidence; it cannot enter the taxonomy verifier.

```ts
const preimage = {
  contract_version: "contentmd.public-product-taxonomy-proposal/0.1.0" as const,
  ...input,
  review_state: "unreviewed" as const,
  classification_effect: "none" as const,
  authority_effect: "none" as const,
  prompt_eligibility: "never" as const,
  training_eligibility: "never" as const,
  benchmark_eligibility: false as const,
};
return immutableClone({ ...preimage, proposal_digest: sha256Canonical(preimage) });
```

- [ ] **Step 5: Run GREEN, research regression, typecheck, and checkpoint**

Run the new test, all `packages/research/test/*.test.ts`, both governance/research builds, diff-check, hashes, and status. Do not commit.

---

### Task 4: Immutable Evidence Disposition Sets and Ledger

**Files:**
- Create: `packages/research/src/public-evidence-disposition.ts`
- Create: `packages/research/test/public-evidence-disposition.test.ts`
- Modify: `packages/research/src/index.ts`

**Interfaces:**
- Consumes: public-product refs, review pairs, and governance evidence.
- Produces:

```ts
export interface PublicEvidenceSubjectRef {
  batch_id: string;
  record_kind: "source" | "observation";
  record_id: string;
  record_digest: string;
}

export interface PublicEvidenceDispositionSet {
  contract_version: "contentmd.public-product-evidence-disposition-set/0.1.0";
  disposition_set_id: string;
  base_ledger_head: PublicProductDigestRef | null;
  as_of: string;
  proposed_transitions: readonly ProposedEvidenceTransition[];
  set_digest: string;
}

export type EvidenceDispositionReason =
  | "duplicate_record_id"
  | "duplicate_canonical_url"
  | "source_projection_mismatch"
  | "rights_boundary_invalid"
  | "quotation_limit_exceeded"
  | "industry_unmapped"
  | "record_shape_invalid"
  | "record_content_incorrect"
  | "superseded_by_corrected_evidence"
  | "review_pending"
  | "review_cleared";

export interface ProposedEvidenceTransition {
  subject_ref: PublicEvidenceSubjectRef;
  expected_previous_event_digest: string | null;
  expected_next_sequence: number;
  state: "active" | "held" | "rejected" | "superseded";
  reason_code: EvidenceDispositionReason;
  replacement_refs: readonly PublicEvidenceSubjectRef[];
  bounded_note: string | null;
  effective_at: string;
}

export interface PublicEvidenceDispositionEvent {
  contract_version: "contentmd.public-product-evidence-disposition/0.1.0";
  disposition_event_id: string;
  disposition_set_ref: PublicProductDigestRef;
  subject_ref: PublicEvidenceSubjectRef;
  previous_event_digest: string | null;
  sequence: number;
  state: "active" | "held" | "rejected" | "superseded";
  reason_code: EvidenceDispositionReason;
  replacement_refs: readonly PublicEvidenceSubjectRef[];
  bounded_note: string | null;
  decided_at: string;
  effective_at: string;
  review_receipt_refs: readonly [PublicProductDigestRef, PublicProductDigestRef];
  disposition_effect: "corpus_projection_only";
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  event_digest: string;
}

export interface PublicEvidenceDispositionLedgerHead {
  contract_version: "contentmd.public-product-evidence-ledger-head/0.1.0";
  ledger_id: string;
  event_digests_in_append_order: readonly string[];
  event_count: number;
  ledger_digest: string;
}

export interface VerifiedDispositionLedger {
  head: PublicEvidenceDispositionLedgerHead;
  state_by_subject: ReadonlyMap<string, ResolvedEvidenceDisposition>;
}

export interface ResolvedEvidenceDisposition {
  subject_ref: PublicEvidenceSubjectRef;
  state: "active" | "held" | "rejected" | "superseded";
  head_event_ref: PublicProductDigestRef | null;
  terminal_replacement_refs: readonly PublicEvidenceSubjectRef[];
}

export function derivePublicEvidenceSubjectRef(input: {
  batch_id: string;
  record_kind: "source" | "observation";
  record_id: string;
  exact_line_bytes: Uint8Array;
}): PublicEvidenceSubjectRef;

export function verifyPublicEvidenceDispositionLedger(input: {
  known_subjects: readonly PublicEvidenceSubjectRef[];
  sets: readonly PublicEvidenceDispositionSet[];
  events_in_append_order: readonly PublicEvidenceDispositionEvent[];
  governance: PublicProductReviewGovernanceEvidence;
  as_of: string;
  verification_mode: "development_fixture" | "official";
}): VerifiedDispositionLedger;
```

- [ ] **Step 1: Write RED tests for byte identity and state transitions**

Test exact UTF-8 line-plus-LF hashing, path/kind/ID separation, default active, held/active/rejected/superseded transitions, explicit-active restriction, predecessor and sequence checks, append-head prefix verification, forks, gaps, cycles, terminal states, replacement existence/activity/type applicability, same product identity, role-specific review pairs, invalid set/event identity, and unchanged raw counts.

```ts
it("defaults undisposed subjects to active and rejects replacement cycles", () => {
  const fixture = dispositionFixture();
  expect(verifyPublicEvidenceDispositionLedger(fixture.emptyLedger)
    .state_by_subject.get(fixture.subjectKey)?.state).toBe("active");
  expect(() => verifyPublicEvidenceDispositionLedger(fixture.cyclicLedger))
    .toThrow("public_evidence_disposition_invalid:cycle");
});
```

- [ ] **Step 2: Run the disposition RED gate**

Run pinned Vitest on the new test. Expected: missing module/export failure.

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  node_modules/vitest/vitest.mjs run packages/research/test/public-evidence-disposition.test.ts --reporter=dot
```

- [ ] **Step 3: Implement proposal-set and event preimages**

Derive subject digests from exact line bytes, not reparsed JSON. Canonically sort proposal transitions by the full subject identity. Verify set reviews before events. Derive `decided_at` as the later review time and require every issued event to equal its reviewed proposal plus deterministic predecessor and sequence.

```ts
export function derivePublicEvidenceSubjectRef(input: {
  batch_id: string;
  record_kind: "source" | "observation";
  record_id: string;
  exact_line_bytes: Uint8Array;
}): PublicEvidenceSubjectRef {
  if (input.exact_line_bytes.at(-1) !== 0x0a) {
    throw new TypeError("public_evidence_disposition_invalid:line_termination");
  }
  return {
    batch_id: input.batch_id,
    record_kind: input.record_kind,
    record_id: input.record_id,
    record_digest: sha256Bytes(input.exact_line_bytes),
  };
}
```

- [ ] **Step 4: Implement ledger resolution and supersession closure**

Walk events in physical append order, verify per-subject chains, reject forks/gaps/duplicate digests, resolve replacements transitively, detect cycles, and expose terminal active replacements while retaining every raw subject. A malformed ledger returns a typed failure and never an accepted active projection.

```ts
for (const event of input.events_in_append_order) {
  const key = subjectIdentity(event.subject_ref);
  const previous = heads.get(key) ?? null;
  if (event.previous_event_digest !== previous?.event_digest
    || event.sequence !== (previous?.sequence ?? 0) + 1) {
    throw new TypeError("public_evidence_disposition_invalid:chain");
  }
  heads.set(key, event);
}
const eventDigests = input.events_in_append_order.map((event) => event.event_digest);
const ledgerId = `public_product_evidence_ledger.${sha256Canonical({
  contract_version: "contentmd.public-product-evidence-ledger-head-identity/0.1.0",
  event_digests_in_append_order: eventDigests,
})}`;
```

- [ ] **Step 5: Run GREEN and checkpoint**

Run disposition/review/taxonomy tests together, research typecheck, diff-check, hashes, and status. Do not commit.

---

### Task 5: Pure v0.2 Active Corpus Projection

**Files:**
- Create: `packages/research/src/public-product-projection.ts`
- Create: `packages/research/test/public-product-projection.test.ts`
- Create: `packages/research/test/public-product-corpus-fixtures.ts`
- Modify: `packages/research/src/index.ts`

**Interfaces:**
- Consumes: exact batch bytes, industry taxonomy, verified review governance, taxonomy, disposition sets/events, `as_of`, and breadth targets.
- Produces:

```ts
export interface PublicProductBatchBytes {
  batch_id: string;
  source_lines: readonly Uint8Array[];
  observation_lines: readonly Uint8Array[];
}

export interface PublicProductCorpusTargets {
  companies: number;
  products: number;
  industries: number;
  direct_states_per_product: number;
}

export interface VerifyPublicProductCorpusV2Input {
  batches: readonly PublicProductBatchBytes[];
  industry_taxonomy_bytes: Uint8Array;
  taxonomy: PublicProductExperienceTaxonomy | null;
  disposition_sets: readonly PublicEvidenceDispositionSet[];
  disposition_events: readonly PublicEvidenceDispositionEvent[];
  review_governance: PublicProductReviewGovernanceEvidence;
  as_of: string;
  targets: PublicProductCorpusTargets;
  verification_mode: "development_fixture" | "official";
}

export interface PublicProductRawCounts {
  batches: number;
  sources: number;
  observations: number;
}

export interface PublicProductActiveCounts {
  active_sources: number;
  active_observations: number;
  held_subjects: number;
  rejected_subjects: number;
  superseded_subjects: number;
  qualified_sources: number;
  qualified_observations: number;
  companies: number;
  products: number;
  industries: number;
}

export interface PublicProductCoverageCounts {
  mapped_observations: number;
  unmapped_observations: number;
  raw_distinct_signatures: number;
  normalized_distinct_signatures: number;
  direct_observed_slots: number;
  products_with_direct_observations: number;
  products_meeting_direct_state_target: number;
}

export interface PublicProductCorpusError {
  code: string;
  location: string;
  detail: string;
}

export interface PublicProductCorpusReportV2 {
  contract_version: "contentmd.public-product-corpus-report/0.2.0";
  status: "pass" | "fail";
  accepted_projection_ref: PublicProductDigestRef | null;
  taxonomy_ref: PublicProductDigestRef | null;
  disposition_ledger_ref: PublicProductDigestRef;
  review_governance_ref: PublicProductDigestRef;
  raw_counts: PublicProductRawCounts;
  active_counts: PublicProductActiveCounts;
  coverage_counts: PublicProductCoverageCounts;
  active_qualified_evidence: readonly NormalizedPublicProductEvidence[];
  errors: readonly PublicProductCorpusError[];
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  report_digest: string;
}

export interface NormalizedPublicProductEvidence {
  observation_subject_ref: PublicEvidenceSubjectRef;
  source_subject_ref: PublicEvidenceSubjectRef;
  company: string;
  product_system: string;
  normalized_industry_id: string;
  raw_signature: RawStructuralSignature;
  normalized_signature: NormalizedStructuralSignature;
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
}

export function verifyPublicProductCorpusV2(
  input: VerifyPublicProductCorpusV2Input,
): PublicProductCorpusReportV2;
```

- [ ] **Step 1: Write the projection RED matrix**

Build a synthetic two-batch fixture and prove: raw subjects remain counted; valid dispositions remove only active projection members; invalid dispositions leave subjects diagnostic-active and make `accepted_projection_ref` null; active replacements revalidate; source/observation projection is exact; only `observed_ui` plus `actual UI` qualifies; unmapped signatures are reported but receive no coverage; paraphrases in one canonical slot count once; five distinct slots count five; taxonomy/ledger/governance drift changes the report; permutations are byte-identical where arrays are semantic sets.

```ts
it("does not let five raw paraphrases satisfy five-state coverage", () => {
  const report = verifyPublicProductCorpusV2(
    projectionFixture({ rawStates: fiveEntryParaphrases(), mappedSlot: "entry_onboarding" }),
  );
  expect(report.coverage_counts.raw_distinct_signatures).toBe(5);
  expect(report.coverage_counts.direct_observed_slots).toBe(1);
  expect(report.coverage_counts.products_meeting_direct_state_target).toBe(0);
});
```

- [ ] **Step 2: Run RED**

Run pinned Vitest on `public-product-projection.test.ts`. Expected: missing module/export failure.

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  node_modules/vitest/vitest.mjs run packages/research/test/public-product-projection.test.ts --reporter=dot
```

- [ ] **Step 3: Move semantic validation into the package**

Port source/observation/industry validation from `scripts/verify-public-product-corpus.mjs` into pure functions without filesystem reads. Parse each exact LF-terminated line, retain its byte-derived subject ref, apply a valid disposition before active-row validation, then run existing rights, quotation, time, identity, URL, industry, and projection checks on active rows.

```ts
const subjects = parseAndBindSubjects(input.batches);
const ledger = verifyPublicEvidenceDispositionLedger({
  known_subjects: subjects.map((subject) => subject.ref),
  sets: input.disposition_sets,
  events_in_append_order: input.disposition_events,
  governance: input.review_governance,
  as_of: input.as_of,
  verification_mode: input.verification_mode,
});
const active = subjects.filter((subject) =>
  (ledger.state_by_subject.get(subjectIdentity(subject.ref))?.state ?? "active") === "active");
```

- [ ] **Step 4: Add exact taxonomy mapping and canonical coverage**

Map only qualified active observations. Count raw distinct signatures separately from normalized signatures and distinct coverage slots per product. Keep company, product, and normalized-industry support independent. Report every held/rejected/superseded/unmapped ref without copying observed wording into the normalized projection.

```ts
for (const observation of qualifiedActiveObservations) {
  const normalized = normalizePublicProductSignature(verifiedTaxonomy, signatureFor(observation));
  if (normalized === null) {
    errors.push(unmappedError(observation.subject_ref));
    continue;
  }
  coverageByProduct.getOrInsert(productKey(observation)).add(normalized.coverage_slot_id);
  normalizedEvidence.push(projectNormalizedEvidence(observation, normalized));
}
```

- [ ] **Step 5: Implement diagnostic-only failure behavior**

If taxonomy, reviews, sets, ledger, replacements, or governance fail, return `status: "fail"`, `accepted_projection_ref: null`, no downstream-eligible projection, and original raw errors. Never guess an active taxonomy or silently drop a subject.

```ts
const finalPreimage = {
  ...reportPreimage,
  status: integrityErrors.length === 0 && targetErrors.length === 0 ? "pass" : "fail",
  accepted_projection_ref: integrityErrors.length === 0 ? derivedProjectionRef : null,
  active_qualified_evidence: integrityErrors.length === 0 ? normalizedEvidence : [],
  errors: [...integrityErrors, ...targetErrors].sort(compareCorpusErrors),
};
return immutableClone({ ...finalPreimage, report_digest: sha256Canonical(finalPreimage) });
```

- [ ] **Step 6: Run GREEN, research regression, and checkpoint**

Run all public-product research tests, all existing research tests, package builds, diff-check, hashes, and status. Do not commit.

---

### Task 6: Filesystem and CLI Verification Adapters

**Files:**
- Create: `scripts/verify-public-product-experience-taxonomy.mjs`
- Create: `scripts/verify-public-product-experience-taxonomy.test.mjs`
- Create: `scripts/verify-public-product-evidence-dispositions.mjs`
- Create: `scripts/verify-public-product-evidence-dispositions.test.mjs`
- Modify: `scripts/verify-public-product-corpus.mjs`
- Modify: `scripts/verify-public-product-corpus.test.mjs`

**Interfaces:**
- Consumes freshly built `packages/research/dist/index.js`; performs filesystem enumeration and exact-byte loading only.
- Produces these script exports:

```js
export async function readPublicProductCorpusV2Input({ root, asOf, targets, verificationMode }) {}
export async function verifyPublicProductCorpusV2FromDisk(options) {}
export async function verifyPublicProductExperienceTaxonomyFromDisk(options) {}
export async function verifyPublicProductEvidenceDispositionsFromDisk(options) {}
```

- [ ] **Step 1: Write RED adapter tests**

Use temporary corpora to test exact LF handling, zero-event ledgers, append order, taxonomy/review/governance file discovery, multiple active taxonomy rejection, v0.1/v0.2 side-by-side output, explicit `--as-of`, frozen VTM-03 defaults, missing artifact diagnostics, and stdout JSON with nonzero exit on failed release status.

```js
test("emits v0.1 and v0.2 side by side without accepting missing reviews", async () => {
  await withCorpusFixture(async (root) => {
    const result = await verifyPublicProductCorpusV2FromDisk({
      root, asOf: "2026-08-24", targets: WORLD_TARGETS, verificationMode: "official",
    });
    assert.equal(result.status, "fail");
    assert.equal(result.accepted_projection_ref, null);
    assert.ok(result.errors.some((error) => error.code === "taxonomy_review_invalid"));
  });
});
```

- [ ] **Step 2: Run Node test RED**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test \
  scripts/verify-public-product-experience-taxonomy.test.mjs \
  scripts/verify-public-product-evidence-dispositions.test.mjs \
  scripts/verify-public-product-corpus.test.mjs
```

Expected: new adapter imports/exports are missing.

- [ ] **Step 3: Convert scripts into thin adapters**

Import the built research package by relative `../packages/research/dist/index.js`. Keep only argument parsing, canonical path enumeration, byte loading, and output/exit handling in `.mjs`. Delete duplicated semantic validators and canonicalizers after parity tests prove package behavior.

```js
import { verifyPublicProductCorpusV2 } from "../packages/research/dist/index.js";

export async function verifyPublicProductCorpusV2FromDisk(options) {
  const input = await readPublicProductCorpusV2Input(options);
  return verifyPublicProductCorpusV2(input);
}
```

- [ ] **Step 4: Preserve explicit side-by-side migration modes**

Support `--contract-version 0.1.0` and `--contract-version 0.2.0`. Until an official reviewed taxonomy exists, keep the CLI default at v0.1 and print a machine-readable v0.2 diagnostic beside it when `--compare-v2` is supplied. Do not switch the default in this task.

```js
const contractVersion = options.contractVersion ?? "0.1.0";
if (contractVersion === "0.2.0") return verifyPublicProductCorpusV2FromDisk(options);
const v1 = await verifyPublicProductCorpusV1FromDisk(options);
return options.compareV2
  ? { primary: v1, v2_diagnostic: await verifyPublicProductCorpusV2FromDisk(options) }
  : v1;
```

- [ ] **Step 5: Build before script tests and run GREEN**

Run research/governance builds first, then the three Node tests and existing verifier tests. Verify CLI `--help`, invalid-argument exits, and exact report contracts.

- [ ] **Step 6: Record the no-commit checkpoint**

Run diff-check, hashes, and path-scoped status. Do not commit.

---

### Task 7: Normalized Hypothesis Compiler and Governed Review v0.2

**Files:**
- Modify: `scripts/compile-public-product-pattern-hypotheses.mjs`
- Modify: `scripts/compile-public-product-pattern-hypotheses.test.mjs`
- Modify: `scripts/review-public-product-pattern-hypotheses.mjs`
- Modify: `scripts/review-public-product-pattern-hypotheses.test.mjs`
- Create: `packages/research/src/public-product-hypothesis.ts`
- Create: `packages/research/test/public-product-hypothesis.test.ts`
- Modify: `packages/research/src/index.ts`

**Interfaces:**
- Consumes only `PublicProductCorpusReportV2` with a non-null accepted projection ref.
- Produces:

```ts
export interface CanonicalPatternSignature {
  coverage_slot_id: string;
  journey_family_id: string;
  state_class_id: string;
  content_slot_class_id: string;
  surface_channel_id: string;
}

export interface PublicProductPatternHypothesisV2 {
  contract_version: "contentmd.public-product-pattern-hypothesis/0.2.0";
  hypothesis_id: string;
  structural_signature: CanonicalPatternSignature;
  taxonomy_ref: PublicProductDigestRef;
  disposition_ledger_ref: PublicProductDigestRef;
  corpus_report_ref: PublicProductDigestRef;
  support: {
    company_count: number;
    product_count: number;
    industry_count: number;
    evidence_refs: readonly PublicEvidenceSubjectRef[];
  };
  counterexample_coverage_count: number;
  review_state: "unreviewed";
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  promotion_eligibility: false;
  hypothesis_digest: string;
}

export interface PublicProductPatternHypothesisReportV2 {
  contract_version: "contentmd.public-product-pattern-hypothesis-report/0.2.0";
  source_report_ref: PublicProductDigestRef;
  hypotheses: readonly PublicProductPatternHypothesisV2[];
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  promotion_eligibility: false;
  report_digest: string;
}

export interface PublicProductPatternAdjudicationV2 {
  contract_version: "contentmd.public-product-pattern-adjudication/0.2.0";
  hypothesis_ref: PublicProductDigestRef;
  review_receipt_refs: readonly [PublicProductDigestRef, PublicProductDigestRef];
  decision_state: "ready_for_canonical_authoring" | "hold_for_more_evidence" | "rejected";
  required_next_records: readonly ["ContentPattern", "PatternDisposition"];
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  promotion_eligibility: false;
  adjudication_digest: string;
}

export function compilePublicProductPatternHypothesesV2(input: {
  report: PublicProductCorpusReportV2;
  thresholds: {
    min_support_companies: 5;
    min_support_products: 5;
    min_support_industries: 3;
    min_direct_states_per_product: 5;
  };
}): PublicProductPatternHypothesisReportV2;

export function adjudicatePublicProductPatternReviewsV2(input: {
  hypothesis: PublicProductPatternHypothesisV2;
  receipt_refs: readonly [PublicProductDigestRef, PublicProductDigestRef];
  governance: PublicProductReviewGovernanceEvidence;
  as_of: string;
  verification_mode: "development_fixture" | "official";
}): PublicProductPatternAdjudicationV2;
```

- [ ] **Step 1: Write compiler/review RED tests**

Prove grouping uses only normalized signatures; support counts distinct companies/products/industries; each contributing product has five canonical slots; inactive/unmapped evidence is absent; names and wording do not enter output; taxonomy, ledger, governance, and report refs bind identity; support remains exactly 5/5/3; report failure blocks compilation; self-declared reviewers fail; two current independent qualification records and exact nine-dimension passes yield only `ready_for_canonical_authoring`.

```ts
it("cannot compile raw labels or review with a claimed role string", () => {
  const report = acceptedProjectionFixture();
  const compiled = compilePublicProductPatternHypothesesV2({ report, thresholds: FROZEN_THRESHOLDS });
  expect(JSON.stringify(compiled)).not.toContain(reportFixtureObservedWording());
  expect(() => adjudicatePublicProductPatternReviewsV2(claimedRoleOnlyReview(compiled)))
    .toThrow("public_product_review_invalid:qualification");
});
```

- [ ] **Step 2: Run RED**

Run package Vitest and the two Node tests. Expected: v0.2 functions/contracts missing.

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  node_modules/vitest/vitest.mjs run packages/research/test/public-product-hypothesis.test.ts --reporter=dot
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test \
  scripts/compile-public-product-pattern-hypotheses.test.mjs \
  scripts/review-public-product-pattern-hypotheses.test.mjs
```

- [ ] **Step 3: Implement the pure package compiler/adjudicator**

Move semantic compilation and review into `public-product-hypothesis.ts`. Keep scripts as adapters. Structural signatures contain only normalized IDs. Evidence support is opaque subject refs. All output keeps authority/prompt/training/benchmark/promotion disabled.

```ts
const groups = new Map<string, NormalizedPublicProductEvidence[]>();
for (const evidence of input.report.active_qualified_evidence) {
  const key = sha256Canonical(evidence.normalized_signature);
  groups.set(key, [...(groups.get(key) ?? []), evidence]);
}
return createHypothesisReport(
  [...groups.values()].filter((support) =>
    distinct(support, "company") >= 5
    && distinctBy(support, (item) => `${item.company}\0${item.product_system}`) >= 5
    && distinct(support, "normalized_industry_id") >= 3),
  input.report,
);
```

- [ ] **Step 4: Preserve v0.1 diagnostics without allowing cross-version mixing**

Retain old verify functions for historical artifacts, but require exact report/hypothesis contract agreement. A v0.1 review cannot adjudicate a v0.2 hypothesis and vice versa.

```ts
if (hypothesis.contract_version !== "contentmd.public-product-pattern-hypothesis/0.2.0") {
  throw new TypeError("public_product_hypothesis_invalid:contract_version");
}
```

- [ ] **Step 5: Run GREEN and checkpoint**

Run package tests, compiler/review Node tests, research build, diff-check, hashes, and status. Do not commit.

---

### Task 8: Expansion Planning from the Active Normalized Projection

**Files:**
- Modify: `scripts/plan-public-product-corpus-expansion.mjs`
- Modify: `scripts/plan-public-product-corpus-expansion.test.mjs`
- Create: `packages/research/src/public-product-expansion.ts`
- Create: `packages/research/test/public-product-expansion.test.ts`
- Modify: `packages/research/src/index.ts`

**Interfaces:**
- Consumes only an accepted v0.2 report plus the frozen 5,000-company, 20,000-product, 250-industry, five-canonical-slot target.
- Produces:

```ts
export function planPublicProductCorpusExpansionV2(input: {
  report: PublicProductCorpusReportV2;
  maximum_assignments: number;
}): PublicProductExpansionPlanV2;

export interface ExpansionProductAssignment {
  company: string;
  product_system: string;
  normalized_industry_id: string;
  covered_slot_ids: readonly string[];
  missing_slot_ids: readonly string[];
  active_evidence_refs: readonly PublicEvidenceSubjectRef[];
}

export interface PublicProductExpansionPlanV2 {
  contract_version: "contentmd.public-product-corpus-expansion-plan/0.2.0";
  corpus_report_ref: PublicProductDigestRef;
  taxonomy_ref: PublicProductDigestRef;
  disposition_ledger_ref: PublicProductDigestRef;
  review_governance_ref: PublicProductDigestRef;
  near_complete_products: readonly ExpansionProductAssignment[];
  first_evidence_products: readonly ExpansionProductAssignment[];
  gaps: {
    companies_remaining: number;
    products_remaining: number;
    industries_remaining: number;
    products_below_direct_state_target: number;
  };
  effect: "collection_operator_only";
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  plan_digest: string;
}
```

- [ ] **Step 1: Write expansion RED tests**

Assert nearest-to-five products rank by missing canonical slots, not raw label count; no-evidence products prioritize normalized-industry scarcity; held/rejected/superseded/unmapped evidence provides no credit; duplicate aliases do not inflate industry count; assignment identity binds taxonomy/ledger/report/governance refs; and the plan remains `collection_operator_only` with no model-input authority.

```ts
it("prioritizes canonical coverage gaps instead of raw-state count", () => {
  const plan = planPublicProductCorpusExpansionV2({
    report: expansionFixture({ rawStateCounts: [20, 4], canonicalSlotCounts: [1, 4] }),
    maximum_assignments: 2,
  });
  expect(plan.near_complete_products[0]?.covered_slot_ids).toHaveLength(4);
  expect(plan.effect).toBe("collection_operator_only");
});
```

- [ ] **Step 2: Run RED**

Run the new package test and existing planner Node test. Expected: missing v0.2 API.

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  node_modules/vitest/vitest.mjs run packages/research/test/public-product-expansion.test.ts --reporter=dot
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test \
  scripts/plan-public-product-corpus-expansion.test.mjs
```

- [ ] **Step 3: Implement pure planning and thin script adaptation**

Move queue semantics into the package. Retain filesystem/CLI handling in the script. Keep exact worker-plan ownership and reserved-batch rules unchanged.

```ts
const nearComplete = products
  .filter((product) => product.canonical_coverage_slots.length > 0
    && product.canonical_coverage_slots.length < 5)
  .map((product) => ({ ...product, missing_slot_count: 5 - product.canonical_coverage_slots.length }))
  .sort((left, right) => left.missing_slot_count - right.missing_slot_count
    || compareUnicodeScalar(productKey(left), productKey(right)));

export async function planFromDisk(options) {
  const report = await verifyPublicProductCorpusV2FromDisk(options);
  return planPublicProductCorpusExpansionV2({
    report,
    maximum_assignments: options.maximumAssignments,
  });
}
```

- [ ] **Step 4: Run GREEN and checkpoint**

Run expansion tests, all public-product Node tests, research build, diff-check, hashes, and status. Do not commit.

---

### Task 9: Immutable Baseline and Reviewable Migration Artifacts

**Files:**
- Create: `scripts/generate-public-product-immutable-baseline.mjs`
- Create: `scripts/generate-public-product-immutable-baseline.test.mjs`
- Create: `scripts/plan-public-product-taxonomy-migration.mjs`
- Create: `scripts/plan-public-product-taxonomy-migration.test.mjs`
- Create: `research/09-experimental/public-product-corpus/immutable-batch-baseline.json`
- Create: `research/09-experimental/public-product-corpus/taxonomy-proposals.jsonl`
- Create: `research/09-experimental/public-product-corpus/evidence-disposition-sets.jsonl`
- Create only after real reviews exist: `research/09-experimental/public-product-corpus/public-product-review-receipts.jsonl`
- Create only after real reviews issue events: `research/09-experimental/public-product-corpus/evidence-dispositions.jsonl`
- Create only after mapping and version reviews pass: `research/09-experimental/public-product-corpus/experience-taxonomy.json`

**Interfaces:**
- Consumes current immutable batch bytes and the v0.1 diagnostic report.
- Produces deterministic proposal artifacts only; it never fabricates review receipts, reviewer qualifications, effective dispositions, or an active taxonomy.

- [ ] **Step 1: Write RED tests for immutable inventory and deterministic proposals**

Test path-sorted SHA-256 inventory, exact baseline self-digest, mutation/addition detection, one proposal per distinct raw signature, exact deterministic-rule bootstrap only for full signatures that meet the six-slot rule, proposal isolation fields, mechanical disposition proposals for duplicate IDs/URLs and current integrity errors, retained-subject selection order, and zero effective authority.

```js
test("detects any mutation to an existing batch byte", async () => {
  await withImmutableCorpus(async ({ root, baseline, mutate }) => {
    await mutate("2026-08-23-batch-01/sources.jsonl", (bytes) => Buffer.concat([bytes, Buffer.from(" ")]));
    await assert.rejects(() => verifyImmutableBaseline(root, baseline), /immutable_batch_mismatch/);
  });
});
```

- [ ] **Step 2: Run RED**

Run both new Node tests. Expected: generators missing.

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test \
  scripts/generate-public-product-immutable-baseline.test.mjs \
  scripts/plan-public-product-taxonomy-migration.test.mjs
```

- [ ] **Step 3: Implement baseline generation and verification**

Hash every existing batch file byte-for-byte. The generated baseline records batch path, file path, byte length, and SHA-256, then binds the complete list with `contentmd.public-product-immutable-batch-baseline/0.1.0`. New future batches require a reviewed successor baseline; existing entries can never change.

```js
const files = await enumerateBatchFiles(root);
const entries = await Promise.all(files.map(async (file) => {
  const bytes = await readFile(file);
  return {
    path: path.relative(root, file),
    byte_length: bytes.byteLength,
    sha256: createHash("sha256").update(bytes).digest("hex"),
  };
}));
entries.sort((left, right) => compareUnicodeScalar(left.path, right.path));
```

- [ ] **Step 4: Implement taxonomy and disposition proposal generation**

Generate all exact raw-signature proposals and reviewed-set candidates from current diagnostics. Do not auto-select semantic normalized IDs beyond the exact six-slot bootstrap rule. Do not issue receipts/events/taxonomy. Include the prior report ref and evidence subject refs in every proposal.

```js
const proposals = distinctRawSignatures(report.raw_observations)
  .map((raw) => proposalForExactBootstrap(raw, report))
  .sort((left, right) => compareUnicodeScalar(left.proposal_id, right.proposal_id));
const dispositionSets = groupDispositionProposalsByReason(report.errors)
  .map((group) => createDispositionSetProposal(group, report.report_ref));
```

- [ ] **Step 5: Run generators against the real corpus**

First capture hashes of every existing batch. Generate the immutable baseline and proposals. Rehash all batch files afterward and require exact equality. Recount JSONL rows rather than trusting batch-status notes.

- [ ] **Step 6: Produce the human review checkpoint**

Emit a concise review summary containing unmapped signature count, proposed mapping count, disposition-set count, affected subjects by reason, required reviewer roles, and exact artifact digests. Stop before active issuance if two distinct governed reviewers are unavailable; this is an honest governance dependency, not a failed implementation.

- [ ] **Step 7: Run GREEN and checkpoint**

Run generator tests, taxonomy/disposition verifiers over proposal-only state, immutable baseline verification, diff-check, hashes, and status. Do not commit.

---

### Task 10: Documentation, Ownership Ledger, and Full Portable Acceptance

**Files:**
- Modify: `research/09-experimental/public-product-corpus/README.md`
- Modify: `docs/superpowers/plans/2026-08-20-contentmd-public-ux-writing-journey-corpus.md`
- Create: `.superpowers/sdd/2026-08-24-contentmd-public-product-taxonomy-supersession/progress.md`
- Modify only for declared package/file inventory: `scripts/check-package-boundaries.mjs`
- Modify only for new package exports/verification commands: `scripts/verify-foundation.mjs`

**Interfaces:**
- Documents v0.1/v0.2 coexistence, exact review procedures, immutable correction flow, CLI commands, failure meanings, and the separately gated Agents SDK handoff.

- [ ] **Step 1: Write documentation assertions before prose changes**

Add tests or verifier assertions requiring README references to the active taxonomy path, disposition proposal/set/event files, review governance, exact five-slot counting rule, raw-history preservation, v0.1/v0.2 migration, no-public-wording learning boundary, and absence of any Cloudflare-live claim.

```js
test("documents the governed v0.2 boundary", async () => {
  const readme = await readFile(CORPUS_README, "utf8");
  for (const required of [
    "experience-taxonomy.json", "evidence-disposition-sets.jsonl",
    "public-product-review-receipts.jsonl", "five distinct canonical coverage slots",
    "raw batches remain immutable", "prompt_eligibility: never",
  ]) assert.match(readme, new RegExp(escapeRegExp(required)));
  assert.doesNotMatch(readme, /production[_ -]live/i);
});
```

- [ ] **Step 2: Run the documentation/verification RED gate**

Expected: missing references and undeclared owned paths fail.

- [ ] **Step 3: Update docs and create a new ownership ledger**

Do not widen the old portable-runtime ledger. Record the exact initial and final owned-file inventory for this tranche in the new SDD progress ledger. Preserve every unrelated dirty path and document that `packages/runtime-cloudflare` remains uncreated.

- [ ] **Step 4: Run focused acceptance**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  node_modules/vitest/vitest.mjs run packages/governance/test/reviewer-qualification.test.ts \
  packages/research/test/public-product-review.test.ts \
  packages/research/test/public-product-taxonomy.test.ts \
  packages/research/test/public-evidence-disposition.test.ts \
  packages/research/test/public-product-projection.test.ts \
  packages/research/test/public-product-hypothesis.test.ts \
  packages/research/test/public-product-expansion.test.ts --reporter=dot
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test \
  scripts/verify-public-product-*.test.mjs \
  scripts/compile-public-product-pattern-hypotheses.test.mjs \
  scripts/review-public-product-pattern-hypotheses.test.mjs \
  scripts/plan-public-product-corpus-expansion.test.mjs
```

Expected: all focused tests pass.

- [ ] **Step 5: Run package, repository, and invariant gates**

Run in this order:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  node_modules/vitest/vitest.mjs run --reporter=dot
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  scripts/check-package-boundaries.mjs
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  scripts/verify-foundation.mjs
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  scripts/verify-public-product-corpus.mjs --as-of 2026-08-24 \
  --min-companies 5000 --min-products 20000 --min-industries 250 \
  --min-direct-states-per-product 5 --compare-v2
git diff --check
```

Expected: typecheck, tests, boundaries, and foundation pass. The corpus command may retain `status: fail` only for explicitly reported unresolved scale/integrity/review gaps; it must emit no accepted v0.2 projection until official reviews exist.

- [ ] **Step 6: Run completion audit against all 13 acceptance criteria in spec Section 19**

For each criterion, record the exact command/file evidence and classify it `proved`, `not yet proved`, or `externally gated`. Do not claim the full architecture complete while taxonomy/disposition reviews, world-scale acquisition, or the separate Agents SDK adopter gate remain outstanding.

- [ ] **Step 7: Freeze hashes and record the no-commit handoff**

Hash the spec, plan, every owned source/test/script/artifact, and the immutable batch baseline. Capture `git status --short` and confirm unrelated paths retain their entry state. Do not commit or push.

---

## Separate Agents SDK Handoff

After Task 10 proves the portable tranche and an adopter explicitly approves the Cloudflare environment, execute the existing separate plan:

```text
docs/superpowers/plans/2026-08-20-contentmd-runtime-cloudflare.md
```

That adapter may map `CorpusCoordinatorAgent`, `CorpusAcquisitionWorkflow`, `TaxonomyReviewWorkflow`, `EvidenceDispositionWorkflow`, and idempotent schedules onto the portable APIs created here. It must authenticate before Agent routing, disable direct client state writes, persist only acknowledged refs/digests/status, replay portable governance after approval resume, and read back the complete adopter-controlled canonical replica before reporting acceptance. This plan neither installs nor deploys it.

## Spec Coverage Map

| Spec sections | Implemented by |
| --- | --- |
| 1–5 Purpose, boundaries, authority, portable reviews | Tasks 1–2 and Task 10 |
| 6 Canonical experience taxonomy | Task 3 |
| 7 Taxonomy proposal lane | Task 3 and Task 9 |
| 8 Immutable evidence disposition | Task 4 and Task 9 |
| 9 Aggregate verification | Tasks 5–6 |
| 10 Coverage semantics | Task 5 and Task 8 |
| 11 Pattern hypothesis compiler | Task 7 |
| 12 Learning and writing boundary | Task 7, Task 10, and existing `ContentPattern`/`PatternDisposition` gates |
| 13 Agents SDK orchestration | Separate adopter-gated handoff after Task 10 |
| 14 Governance enforcement | Tasks 1–2 and Task 10 |
| 15 Errors and conflicts | Tasks 1–7 negative matrices |
| 16 Migration | Tasks 6 and 9 |
| 17 Files and interfaces | Tasks 1–10 |
| 18 Testing | Every task's RED/GREEN cycle |
| 19 Acceptance criteria | Task 10 completion audit |
| 20 Completion meaning | Task 10 handoff classifications |
| 21 External design references | Separate Agents SDK handoff |
