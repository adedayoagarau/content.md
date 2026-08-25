# content.md Public Product Taxonomy and Evidence Supersession Design

**Date:** 2026-08-24
**Status:** Proposed for written-spec review
**Scope:** Experimental public-product corpus normalization, immutable evidence disposition, review orchestration, pattern compilation, and recursive-learning admission
**Runtime boundary:** Portable core first; optional Agents SDK orchestration; no Cloudflare deployment or adopter approval implied

## 1. Purpose

content.md needs enough public-product evidence to recognize transferable content-design structures across companies, products, industries, markets, and interface states. The current corpus preserves evidence and authority boundaries, but its raw journey and state labels are too fragmented for reliable cross-product comparison. At the same time, immutable historical batches contain duplicate or invalid evidence that the aggregate verifier can detect but cannot supersede.

This design adds two independent, versioned control planes:

1. a reviewed experience taxonomy that maps exact raw structural signatures to canonical coverage and comparison coordinates; and
2. an append-only evidence-disposition ledger that determines which immutable source and observation rows are active in the aggregate projection.

Raw batches remain immutable. A classification or disposition never changes product facts, organization policy, approval, publication state, or the original captured bytes.

## 2. Current evidence and problem statement

The verified corpus snapshot on 2026-08-24 contains:

- 68 batches;
- 982 source rows and 1,028 observation rows;
- 341 qualified sources and 383 qualified observations;
- 107 companies or public organizations;
- 137 product systems;
- 26 normalized industries;
- 184 directly observed states;
- 26 products meeting the current five-state threshold;
- 92 distinct raw journey labels;
- 326 distinct raw event-state labels;
- 60 distinct raw content-slot labels; and
- one raw surface channel.

Exact raw-signature grouping produces sparse, mostly single-product structural groups. It cannot recognize that differently worded labels such as `help search`, `support search entry`, and `needs-based help hub` may occupy a common recovery or support structure.

The aggregate verifier also reports 288 errors:

- 141 duplicate canonical URLs;
- 111 products below the direct-state target;
- 18 rights-boundary failures;
- 5 duplicate observation identities;
- 4 source-projection failures;
- 3 unmapped industries;
- 2 duplicate source identities;
- 1 quotation-limit failure; and
- 3 world-target shortfalls.

The README says corrections create new batches and explicit supersession notes, but the verifier has no machine-readable supersession contract. Therefore a corrected replacement row cannot remove an invalid historical row from the active projection.

## 3. Goals

The implementation must:

1. preserve every existing batch byte-for-byte;
2. distinguish raw evidence from derived classification;
3. make five-state coverage comparable and resistant to label inflation;
4. retain enough structural precision for cross-industry pattern discovery;
5. provide a deterministic, reviewable mapping from raw signatures to canonical coordinates;
6. let an append-only reviewed decision hold, reject, or supersede immutable evidence without deleting it;
7. construct one deterministic active and qualified evidence projection;
8. bind taxonomy and disposition identities into every downstream report and hypothesis;
9. keep raw web wording, observations, and machine suggestions out of prompts, training examples, benchmarks, approvals, and publication;
10. allow ML to propose classifications and patterns while preventing it from approving them;
11. allow Agents SDK Workflows and schedules to orchestrate work without becoming evidence, identity, or approval authority; and
12. preserve the existing canonical `ContentPattern` and `PatternDisposition` promotion path.

## 4. Non-goals

This design does not:

- claim that a public interface is good content design;
- infer product truth, user outcomes, accessibility quality, localization quality, policy, approval, or legal reuse rights from public visibility;
- translate or rewrite captured third-party wording;
- create training examples from public observations;
- make industry a voice owner;
- authorize browser login, account creation, purchase, form submission, personal-data entry, bot bypass, or other third-party mutation;
- deploy a Cloudflare Agent or create a production Cloudflare account binding;
- treat an Agents SDK approval event as a reviewer credential or canonical approval record;
- mutate, truncate, or silently exclude an immutable batch; or
- promote a pattern directly from the experimental hypothesis queue.

## 5. Authority model

The following planes remain separate:

| Plane | Owner | Effect |
| --- | --- | --- |
| Raw public evidence | Corpus batch | Evidence only |
| Evidence activation/disposition | Reviewed corpus governance | Aggregate corpus projection only |
| Experience classification | Reviewed taxonomy | Comparative analytics only |
| Structural hypothesis | Experimental compiler | Review queue only |
| Canonical content pattern | Existing research governance | Pattern retrieval eligibility only after all reviews |
| Product facts and policy | Product or organization authority | Product truth |
| Writing approval/publication | Product or organization authority | Delivery and publication |
| Recursive-learning labels | Project-owned evaluation workflow | Ranking improvement within admitted scope |

Every raw evidence, taxonomy proposal, mapping review, disposition event, structural hypothesis, and review task carries:

```text
authority_effect: none
prompt_eligibility: never
training_eligibility: never
benchmark_eligibility: false
```

The taxonomy additionally carries `classification_effect: corpus_projection_only`. A disposition carries `disposition_effect: corpus_projection_only`.

Most-restrictive-wins applies across all planes. A record cannot become eligible because a later classification, review, replacement, or workflow omits an earlier restriction.

### 5.1 Portable review receipts

Taxonomy mappings and disposition sets use the same closed portable receipt family:

```ts
interface PublicProductReviewReceipt {
  contract_version: "contentmd.public-product-review-receipt/0.1.0";
  receipt_id: string;
  review_kind:
    | "taxonomy_mapping"
    | "taxonomy_version"
    | "evidence_disposition_set"
    | "pattern_hypothesis";
  subject_ref: DigestRef;
  reviewer_ref: DigestRef;
  reviewer_role:
    | "qualified_content_designer"
    | "taxonomy_steward"
    | "corpus_steward"
    | "rights_reviewer"
    | "independent_corpus_reviewer";
  qualification_ref: DigestRef;
  checklist_version: string;
  checklist_results: readonly ReviewChecklistResult[];
  decision: "pass" | "fail" | "insufficient";
  reviewed_at: string;
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  receipt_digest: string;
}
```

`subject_ref` resolves to `mapping_material_digest`, `taxonomy_material_digest`, `set_digest`, or a complete v0.2 hypothesis ref and digest, never to an identity that already includes the receipt. `receipt_id` is derived from every field except `receipt_id` and `receipt_digest`; `receipt_digest` covers every field except itself. The checklist version selects an exact closed item set and order for the review kind. Missing, duplicate, extra, or non-pass required results invalidate a passing receipt.

The verifier resolves `reviewer_ref` and `qualification_ref` against current supplied governance evidence at `as_of`. Two required receipts must have different reviewer refs. Each referenced qualification must have been current at `reviewed_at` and remain unrevoked at `as_of`. Receipt roles are ordered, not interchangeable: taxonomy tuples are `[qualified_content_designer, taxonomy_steward]`; disposition tuples are `[corpus_steward, rights_reviewer]` or `[corpus_steward, independent_corpus_reviewer]` according to the reason family. Pattern-hypothesis review requires two distinct `qualified_content_designer` reviewers and canonically orders their receipts by reviewer ref.

### 5.2 Reviewer qualification evidence

`@contentmd/governance` owns one shared `ReviewerQualificationRecord` rather than letting research or learning accept a role string. The record binds:

- reviewer ref;
- exact eligible roles;
- exact review objectives and resource scopes;
- effective and expiry times;
- issuer principal ref;
- issuance policy, capability-grant, semantic-decision approval, control-disposition, and audit refs;
- current, expired, revoked, or unknown currentness;
- `qualification_effect: review_eligibility_only`;
- `authority_effect: none`; and
- a complete record digest.

Issuance verification replays the existing `@contentmd/governance` authorization input and decision with action `issue_reviewer_qualification`, approval class `semantic_decision`, the qualification material digest as the operation subject, and exact corpus/taxonomy/hypothesis resource scopes. Revocation uses the corresponding governed action and is most-restrictive-wins. A missing policy, grant, approval, control, currentness proof, or matching audit record makes the qualification unusable. Bootstrap governance may propose this record but cannot issue it, and a development fixture cannot validate an official review.

The portable public-product verifier receives the complete qualification records and their replay inputs. Its report identity binds the governance-evidence digest. This creates no research-to-learning dependency; both packages may consume the shared governance primitive.

## 6. Canonical experience taxonomy

### 6.1 File and identity

The sole active taxonomy is:

```text
research/09-experimental/public-product-corpus/experience-taxonomy.json
```

It is canonical JSON with one trailing LF. Its closed root contract is `contentmd.public-product-experience-taxonomy/0.1.0`.

```ts
interface PublicProductExperienceTaxonomy {
  contract_version: "contentmd.public-product-experience-taxonomy/0.1.0";
  taxonomy_id: string;
  taxonomy_version: string;
  previous_taxonomy_ref: TaxonomyRef | null;
  effective_at: string;
  coverage_slots: readonly CoverageSlot[];
  journey_families: readonly JourneyFamily[];
  state_classes: readonly StateClass[];
  content_slot_classes: readonly ContentSlotClass[];
  surface_channels: readonly SurfaceChannel[];
  mappings: readonly ExperienceMapping[];
  mapping_review_receipt_refs: readonly ReviewReceiptRef[];
  taxonomy_review_receipt_refs: readonly [ReviewReceiptRef, ReviewReceiptRef];
  taxonomy_material_digest: string;
  classification_effect: "corpus_projection_only";
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  taxonomy_digest: string;
}
```

`taxonomy_material_digest` is SHA-256 over canonical JSON containing the contract version, taxonomy version, previous taxonomy ref, effective time, all definition arrays, and the complete finalized mapping records. It excludes `taxonomy_id`, both root review-ref fields, `taxonomy_material_digest`, and `taxonomy_digest`. `mapping_review_receipt_refs` is the exact unique Unicode-scalar-sorted union of every mapping's two review receipt refs. Two additional taxonomy-version receipts bind `taxonomy_material_digest` and review the complete definitions, mappings, version transition, and effective time in the fixed order `[qualified_content_designer, taxonomy_steward]`. `taxonomy_id` is derived from `taxonomy_material_digest`, the mapping-review union, and the taxonomy-version receipt pair. `taxonomy_digest` covers every field except itself. This order makes every review subject available before any identity that includes the review.

All arrays are unique and Unicode-scalar sorted by their declared identity field unless an exact order is specified below.

### 6.2 Coverage slots

Coverage uses exactly these six ordered slots:

1. `entry_onboarding`
2. `core_task_commitment`
3. `pending_progress`
4. `success`
5. `error_recovery`
6. `destructive_permission_support`

The slot order is identity-bearing. A product meets the five-state target only when qualified direct-UI evidence covers at least five distinct canonical coverage slots. Rewording one state five ways cannot satisfy coverage.

The coverage slot is a research coordinate. It does not claim that every product should implement all six slots.

### 6.3 Comparison coordinates

Coverage slots are intentionally broad. Pattern comparison uses more precise independent coordinates:

- `journey_family_id`: the user-goal and task family;
- `state_class_id`: the system condition or decision state;
- `content_slot_class_id`: the structural content object;
- `surface_channel_id`: the delivery channel; and
- `coverage_slot_id`: the broad sampling coordinate.

Definitions contain an ID, display name, bounded description, inclusion rule, exclusion rule, and zero or more counterexample refs. Definition IDs are stable. A rename changes the display name, not the ID. A semantic change requires a new ID and a new taxonomy version.

Industry is not part of an experience signature. It remains an independent support-diversity coordinate.

### 6.4 Exact raw signature

An `ExperienceMapping` maps one exact raw structural signature:

```ts
interface RawStructuralSignature {
  journey: string;
  event_state: string;
  content_slot_type: string;
  surface_channel: string;
}

interface NormalizedStructuralSignature {
  coverage_slot_id: string;
  journey_family_id: string;
  state_class_id: string;
  content_slot_class_id: string;
  surface_channel_id: string;
}

interface ExperienceMapping {
  mapping_id: string;
  raw_signature: RawStructuralSignature;
  normalized_signature: NormalizedStructuralSignature;
  rationale: string;
  counterexample_refs: readonly PublicEvidenceRef[];
  mapping_material_digest: string;
  review_receipt_refs: readonly [ReviewReceiptRef, ReviewReceiptRef];
  mapping_digest: string;
}
```

`mapping_material_digest` is SHA-256 over canonical JSON containing the raw signature, normalized signature, rationale, and counterexample refs. Both review receipts bind this digest. `mapping_id` is derived from the mapping material digest and the two canonically ordered receipt refs. `mapping_digest` covers every field except itself. Review receipts never hash a mapping identity that already contains those same receipts.

Runtime normalization performs exact string lookup only. It does not trim, case-fold, translate, tokenize, embed, fuzzy-match, infer, or use an LLM. Unknown signatures return `unmapped` and receive no canonical coverage or pattern support.

Two mappings may not claim the same raw signature. Every normalized ID must exist in the same taxonomy. Mapping and definition arrays are Unicode-scalar sorted and unique.

### 6.5 Taxonomy review

Each mapping requires two distinct reviewers:

- one reviewer claiming `qualified_content_designer`; and
- one reviewer claiming `taxonomy_steward`.

The portable verifier resolves current reviewer qualifications from supplied governance evidence. Self-declared strings, an Agents SDK user identity, a workflow approval boolean, or an LLM assertion do not prove qualification.

Both reviewers must pass:

- raw-state accuracy;
- coverage-slot fit;
- journey-family fit;
- state-class fit;
- content-slot fit;
- channel fit;
- counterexample sufficiency;
- industry neutrality;
- localization transferability; and
- rights-safe abstraction.

A failure rejects the proposal. `insufficient` holds it. Only unanimous passes may enter a new taxonomy version.

After every mapping has its own valid pair, the complete `taxonomy_material_digest` receives a second fixed checklist covering definition completeness, semantic ID stability, mapping-set completeness, previous-version compatibility, effective-time validity, review closure, and absence of authority or learning widening. One qualified content designer and one taxonomy steward must both pass before the version may become active. Mapping approval alone cannot activate a taxonomy version.

## 7. Taxonomy proposal lane

Machine and human suggestions are stored separately in:

```text
research/09-experimental/public-product-corpus/taxonomy-proposals.jsonl
```

Each canonical proposal binds:

- the exact active taxonomy ref and digest;
- one previously unmapped raw signature;
- one proposed normalized signature;
- opaque supporting evidence refs;
- optional counterexample refs;
- proposer kind: `deterministic_rule`, `human`, or `ml_suggestion`;
- model/code/input digests when proposer kind is `ml_suggestion`;
- a confidence value used only for queue ordering;
- `review_state: unreviewed`;
- `classification_effect: none`; and
- all authority and learning fields disabled.

Confidence never changes eligibility. An ML proposal cannot write the taxonomy, approve itself, create a pattern, enter a prompt, or become a training label.

Rejected and held proposals remain in the append-only proposal history. A revised proposal receives a new identity and references the earlier proposal.

## 8. Immutable evidence-disposition ledger

### 8.1 File and subject identity

Disposition events live in:

```text
research/09-experimental/public-product-corpus/evidence-dispositions.jsonl
```

Reviewed proposal sets and their portable receipts live in:

```text
research/09-experimental/public-product-corpus/evidence-disposition-sets.jsonl
research/09-experimental/public-product-corpus/public-product-review-receipts.jsonl
```

The ledger is canonical JSONL with one trailing LF and contract `contentmd.public-product-evidence-disposition/0.1.0`.

Because existing source and observation rows do not carry their own content digests, the verifier derives an immutable subject ref:

```ts
interface PublicEvidenceSubjectRef {
  batch_id: string;
  record_kind: "source" | "observation";
  record_id: string;
  record_digest: string;
}
```

`record_digest` is SHA-256 over the exact UTF-8 bytes of the immutable JSONL line including its required trailing LF. The verifier separately requires that those bytes are canonical JSON. `batch_id`, `record_kind`, and `record_id` prevent a byte-identical row in a different batch from becoming the same subject. Reformatting a row would therefore change its subject identity and is forbidden for existing batches.

### 8.2 Proposal-set preimage

A reviewable disposition set exists before any effective event:

```ts
interface PublicEvidenceDispositionSet {
  contract_version: "contentmd.public-product-evidence-disposition-set/0.1.0";
  disposition_set_id: string;
  base_ledger_head: DigestRef | null;
  as_of: string;
  proposed_transitions: readonly ProposedEvidenceTransition[];
  set_digest: string;
}

interface ProposedEvidenceTransition {
  subject_ref: PublicEvidenceSubjectRef;
  expected_previous_event_digest: string | null;
  expected_next_sequence: number;
  state: "active" | "held" | "rejected" | "superseded";
  reason_code: EvidenceDispositionReason;
  replacement_refs: readonly PublicEvidenceSubjectRef[];
  bounded_note: string | null;
  effective_at: string;
}
```

The proposed-transition array is unique and Unicode-scalar sorted by subject-ref identity. `set_digest` covers every field except itself; `disposition_set_id` is derived from the base ledger head, `as_of`, and complete proposed-transition array. Review receipts bind `set_digest`. Issued events subsequently bind the set and receipts, so no review, set, or event preimage is circular.

### 8.3 Event contract

```ts
interface PublicEvidenceDispositionEvent {
  contract_version: "contentmd.public-product-evidence-disposition/0.1.0";
  disposition_event_id: string;
  disposition_set_ref: DigestRef;
  subject_ref: PublicEvidenceSubjectRef;
  previous_event_digest: string | null;
  sequence: number;
  state: "active" | "held" | "rejected" | "superseded";
  reason_code: EvidenceDispositionReason;
  replacement_refs: readonly PublicEvidenceSubjectRef[];
  bounded_note: string | null;
  decided_at: string;
  effective_at: string;
  review_receipt_refs: readonly [ReviewReceiptRef, ReviewReceiptRef];
  disposition_effect: "corpus_projection_only";
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  event_digest: string;
}
```

`disposition_event_id` is derived from every event field except `disposition_event_id` and `event_digest`. `event_digest` covers every field except itself. `disposition_set_ref` must resolve to the exact reviewed proposal set, and every effective event field must equal its corresponding proposed transition plus the deterministic ledger predecessor and sequence.

The event's `review_receipt_refs` are the exact required ordered pair for the set. `decided_at` is the later of the two receipt `reviewed_at` timestamps. This removes clock choice from event issuance.

Allowed reasons are closed:

- `duplicate_record_id`
- `duplicate_canonical_url`
- `source_projection_mismatch`
- `rights_boundary_invalid`
- `quotation_limit_exceeded`
- `industry_unmapped`
- `record_shape_invalid`
- `record_content_incorrect`
- `superseded_by_corrected_evidence`
- `review_pending`
- `review_cleared`

No free-form reason changes behavior. `bounded_note` may explain a decision but is identity-bound and cannot introduce another reason class.

### 8.4 State machine

Evidence with no disposition event defaults to `active`.

Allowed transitions are:

```text
implicit active -> held | rejected | superseded
held            -> active | rejected | superseded
active event    -> held | rejected | superseded
rejected        -> terminal
superseded      -> terminal
```

An explicit `active` event is allowed only as `held -> active` with reason `review_cleared`.

Sequence begins at 1. Every later event must increment by one and bind the previous event digest. Forks, gaps, duplicate sequence numbers, conflicting terminal events, future effective times, and unknown subjects fail the ledger.

### 8.5 Replacement rules

`superseded` requires one or more replacement refs. Each replacement must:

- exist in an immutable batch;
- be different from the subject;
- be active at the verifier's `as_of` time;
- pass every shape, rights, projection, and taxonomy check applicable to its record kind;
- not transitively resolve back to the subject; and
- preserve the same company and product identity unless the disposition explicitly corrects a projection error and both reviews approve the corrected identity.

`rejected` and `held` require an empty replacement set. `active` requires an empty replacement set.

Supersession chains are resolved transitively and must be acyclic. The active projection includes only terminal active replacements, never the superseded ancestors.

### 8.6 Disposition review

Every disposition event belongs to a digest-bound disposition set reviewed by two distinct qualified people.

For rights, quotation, or content-correctness reasons, the required roles are:

- `corpus_steward`; and
- `rights_reviewer`.

For duplicate, projection, shape, or taxonomy reasons, the required roles are:

- `corpus_steward`; and
- `independent_corpus_reviewer`.

The review receipt binds the complete set digest, the verifier report that motivated the set, reviewer qualifications, decision time, and decision. Because the set digest binds every subject and proposed transition, partial set approval is invalid; a changed item creates a new set and new reviews.

Automation may generate a proposed set. It cannot issue an effective disposition event.

### 8.7 Ledger head

The effective ledger ref is derived from:

```ts
interface PublicEvidenceDispositionLedgerHead {
  contract_version: "contentmd.public-product-evidence-ledger-head/0.1.0";
  ledger_id: string;
  event_digests_in_append_order: readonly string[];
  event_count: number;
  ledger_digest: string;
}
```

The JSONL line order is append order and is identity-bearing. `ledger_id` is derived from the contract version and complete event-digest sequence; `ledger_digest` covers every field except itself. The verifier rejects truncation, insertion before an acknowledged head, duplicate event digests, subject-sequence disorder, or a supplied prior head that is not an exact prefix. Reports bind this complete ledger head, not only the last event for one subject.

## 9. Aggregate verification pipeline

The aggregate verifier becomes a staged projection:

1. enumerate immutable batch files in canonical path order;
2. parse each JSONL line sufficiently to derive its subject ref;
3. read and independently validate the complete disposition ledger and review receipts;
4. resolve each subject's state at `as_of`;
5. retain only active subjects for aggregate qualification;
6. fully validate active source and observation shapes;
7. validate source/observation projection and source existence;
8. validate rights, quotation, time, identity, URL, and industry constraints;
9. load and verify the active experience taxonomy;
10. map each qualified observation's exact raw structural signature;
11. report unmapped signatures without granting canonical coverage;
12. compute company, product, industry, canonical state-slot, and coverage counts;
13. emit the active qualified evidence projection; and
14. bind the disposition-ledger head and taxonomy ref into the report identity.

Disposition validation must not depend on an active row passing the very rule that the disposition is intended to correct. The verifier first binds the immutable raw bytes, applies a valid reviewed disposition, then validates only the active projection. Invalid or unparseable disposition state fails closed and leaves the raw subject active for error reporting.

When any taxonomy, review, set, ledger, or replacement integrity check fails, the verifier may still emit a diagnostic report that treats affected subjects as active so the original errors remain visible. That diagnostic has `status: fail`, no accepted active-projection ref, and is ineligible for coverage planning, hypothesis compilation, prompts, learning, benchmarks, or authority. “Fails the whole projection” means no downstream consumer may accept that diagnostic projection.

The report uses contract `contentmd.public-product-corpus-report/0.2.0`. It adds:

- `taxonomy_ref`
- `disposition_ledger_ref`
- `review_governance_ref`
- raw and active source/observation counts
- active, held, rejected, and superseded subject counts
- mapped and unmapped observation counts
- canonical coverage-slot counts
- journey-family, state-class, content-slot-class, and channel counts
- unresolved disposition errors
- unresolved taxonomy review counts

The existing raw-row counts remain visible. Disposition never rewrites history.

## 10. Coverage semantics

A state contributes to the five-state product target only when:

- its source and observation are active;
- the source and observation pass all existing qualification rules;
- `observed_vs_inferred` is `observed_ui`;
- source class is `actual UI`;
- the exact raw signature has a reviewed active taxonomy mapping; and
- the canonical coverage slot has not already been counted for that product.

Marketing pages, documentation, official examples, search snippets, inferred labels, held evidence, rejected evidence, superseded ancestors, and unmapped signatures receive no state credit.

The verifier reports both raw distinct signature count and canonical coverage count so normalization cannot conceal sampling concentration.

## 11. Pattern hypothesis compiler

The compiler consumes only the verifier's active, qualified, normalized projection. It does not read batches independently.

The hypothesis contract advances to `contentmd.public-product-pattern-hypothesis/0.2.0`. Its structural signature is:

```ts
interface CanonicalPatternSignature {
  coverage_slot_id: string;
  journey_family_id: string;
  state_class_id: string;
  content_slot_class_id: string;
  surface_channel_id: string;
}
```

Each hypothesis additionally binds:

- taxonomy ref and digest;
- disposition-ledger ref and digest;
- active corpus-report ref and digest;
- company, product, and normalized-industry support counts;
- opaque active evidence refs;
- counterexample coverage count; and
- the existing disabled authority, prompt, training, benchmark, and promotion fields.

The minimum support remains five companies, five products, and three normalized industries unless a later reviewed contract version changes it.

The compiler rejects:

- any unreviewed or inactive mapping;
- any held, rejected, or superseded evidence;
- copied wording or company/product names in a signature;
- incomplete evidence refs;
- taxonomy or disposition digest drift;
- same-company support presented as independent-product breadth;
- fewer than five canonical coverage slots for any contributing product; or
- a hypothesis descended from a nonconforming or quarantined research lineage.

The compiler cannot promote a result. The pattern-review queue and adjudicator advance to v0.2 and consume the same portable review-receipt family plus current governance evidence. A self-declared reviewer ID or qualification string is insufficient. Two distinct qualified-content-designer passes over the exact frozen hypothesis checklist may produce only `ready_for_canonical_authoring`; any failure rejects, and any missing or insufficient result holds.

## 12. Recursive-learning and writing boundary

Public evidence follows this one-way path:

```text
raw public evidence
  -> active qualified normalized projection
  -> structural hypothesis
  -> two-person hypothesis review
  -> separately authored canonical ContentPattern
  -> PatternDisposition, rights, similarity, lineage, and project approval
  -> project-owned application of the abstract mechanism
  -> project-owned candidate pair and evaluation
  -> admitted recursive-learning example
```

There is no direct edge from a public source, observation, taxonomy mapping, ML suggestion, hypothesis, or experimental review to:

- a writer prompt;
- a ranking feature vector;
- a preference label;
- a benchmark example;
- a model coefficient;
- organization voice authority;
- project fact or policy; or
- publication.

Learning can improve which approved, project-owned candidate best satisfies the approved pattern and context. It cannot learn third-party wording or infer that frequency means quality.

## 13. Agents SDK orchestration

The portable taxonomy, disposition, verifier, and compiler functions remain pure Node-compatible modules. Agents SDK is an optional orchestration adapter.

### 13.1 Coordinator Agent

`CorpusCoordinatorAgent` state may retain only:

- project and corpus refs;
- active taxonomy ref and digest;
- disposition-ledger ref and digest;
- verifier report ref and digest;
- immutable assignment-plan refs and digests;
- workflow IDs and statuses;
- bounded progress counts;
- pending review-task refs; and
- last acknowledged canonical-replica head.

It may not retain sole copies of evidence, raw browser text, credentials, reviewer authority, product policy, approvals, or publication decisions.

Client `setState` is disabled. Every callable method parses a closed input, authenticates before instance resolution, resolves a current authorized operation, and records an append-only audit event.

### 13.2 Durable Workflows

`CorpusAcquisitionWorkflow` executes one immutable worker assignment:

1. verify assignment plan and browser/research grants;
2. record the attempt claim;
3. run bounded public collection through an authorized adapter;
4. write only the reserved append-only batch root;
5. run the worker verifier;
6. record blocked or completed disposition; and
7. report canonical refs and counts to the coordinator.

It cannot enlarge the company/product set, change batch ownership, bypass access controls, or convert blocked access into evidence.

`TaxonomyReviewWorkflow`:

1. binds one proposal-set digest;
2. waits for two independently authenticated reviewer records;
3. verifies roles and complete decisions through the portable governance layer;
4. emits a proposed taxonomy-version artifact; and
5. waits for canonical-replica acknowledgement.

`EvidenceDispositionWorkflow` follows the same pattern for a disposition set.

An SDK `waitForApproval` event only resumes execution. It does not mint the portable review receipt.

### 13.3 Scheduling

Recurring schedules may:

- run the aggregate verifier;
- create a deterministic collection backlog;
- identify unmapped signatures;
- create taxonomy or disposition proposal queues;
- detect stale reviews or evidence; and
- remind qualified reviewers of pending work.

Schedules are idempotent over callback name plus digest-bound payload. They cannot start browser work without current external-research authorization and an exclusive assignment.

### 13.4 Canonical-first persistence

Workflow and Agent state are acknowledged projections. Before reporting completion, the adapter writes the complete portable artifact closure to the adopter-controlled canonical replica, reads it back, verifies canonical bytes and digests, and records the acknowledged head. Host loss before acknowledgement cannot create an accepted taxonomy version, disposition event, evidence batch, or pattern hypothesis.

## 14. Governance enforcement

The implementation uses a declarative, serializable policy with most-restrictive-wins semantics.

Required controls include:

- closed tool allowlists per workflow phase;
- explicit browser route/origin allowlists;
- no login, purchase, submission, personal data, credential, or bypass tools;
- separate read, collect, classify, review, and publish capabilities;
- per-assignment and per-domain rate limits;
- human review for taxonomy and disposition issuance;
- append-only audit records for every allow, deny, hold, and error;
- fail-closed behavior on missing policy, currentness, reviewer, taxonomy, disposition, or replica evidence;
- no trust score as a substitute for authorization; and
- no LLM-generated policy widening.

Trust or reliability scores may prioritize which proposals receive manual review. They cannot authorize tools, mappings, dispositions, patterns, learning, or publication.

## 15. Error and conflict handling

The portable APIs expose closed errors. At minimum:

- `input_shape`
- `canonical_value`
- `digest`
- `reference_binding`
- `taxonomy_invalid`
- `taxonomy_unmapped`
- `taxonomy_review_invalid`
- `disposition_invalid`
- `disposition_conflict`
- `disposition_cycle`
- `replacement_invalid`
- `reviewer_qualification`
- `rights_boundary`
- `source_projection`
- `evidence_quarantined`
- `authority_violation`
- `replica_acknowledgement`

Shape and canonical failures precede semantic and authority checks. Within valid graphs, most-restrictive evidence state wins: rejected or superseded is terminal; held outranks active. No error fallback admits evidence.

Multiple active taxonomy files, multiple active taxonomy versions for the same effective time, disposition forks, replacement cycles, or conflicting reviewer decisions fail the whole projection. The verifier never guesses which one to use.

## 16. Migration

Migration is additive and does not rewrite existing batches.

### Phase 1: definitions and proposal inventory

1. Add the six fixed coverage slots and reviewed comparison definitions.
2. Generate proposals for every exact raw signature in the current active corpus.
3. Bootstrap mappings only for signatures whose journey already exactly matches one of the six frozen plan slots and whose full normalized coordinates receive two reviews.
4. Report all other signatures as unmapped.

### Phase 2: historical evidence dispositions

1. Generate a mechanical proposal set for duplicate source IDs, observation IDs, and canonical URLs.
2. Select one retained active subject using a frozen deterministic policy: valid qualified evidence first, then earliest access time, then canonical batch path, then record ID.
3. Require two reviews before issuing supersession events.
4. Create separate reviewed sets for source-projection, rights, quotation, and industry failures.
5. Where corrected evidence is needed, reserve a new correction batch through a coordinator plan; do not edit any existing batch directory.

### Phase 3: verifier and compiler cutover

1. Run v0.1 and v0.2 reports side by side.
2. Require the v0.2 report to expose every excluded subject and reason.
3. Verify that no raw row disappears from historical counts.
4. Switch expansion planning and hypothesis compilation to the v0.2 active normalized projection.
5. Retain the v0.1 report as a historical diagnostic only.

### Phase 4: orchestration adapter

1. Keep local portable commands authoritative.
2. Add an Agents SDK adapter only after the portable functions and tests are green.
3. Verify the adapter in a local emulator against the same frozen trace.
4. Do not deploy without the separate Cloudflare adopter approval required by the runtime plan.

## 17. Files and interfaces

The implementation plan may refine file grouping but must preserve these surfaces.

Repository integration is fixed as follows:

- `@contentmd/research` owns the portable taxonomy, disposition, and projection implementations and exports their public APIs from its package root;
- command-line `.mjs` files are thin adapters over freshly built `packages/research/dist` modules and may not retain a second canonicalizer or second semantic implementation;
- package build precedes direct script verification in every acceptance command;
- the existing per-batch `journey-state-taxonomy.json` files remain immutable historical research artifacts and are never treated as the active v0.2 taxonomy;
- these contracts are verified research artifacts, not new durable-record schema families, unless a later reviewed design explicitly promotes one into the durable record registry; and
- `packages/runtime-cloudflare` remains a separately planned destination but does not exist and is not created by the portable implementation tranche.

Create:

- `research/09-experimental/public-product-corpus/experience-taxonomy.json`
- `research/09-experimental/public-product-corpus/taxonomy-proposals.jsonl`
- `research/09-experimental/public-product-corpus/evidence-disposition-sets.jsonl`
- `research/09-experimental/public-product-corpus/evidence-dispositions.jsonl`
- `research/09-experimental/public-product-corpus/public-product-review-receipts.jsonl`
- `packages/governance/src/reviewer-qualification.ts`
- focused governance qualification tests
- `packages/research/src/public-product-taxonomy.ts`
- `packages/research/src/public-product-review.ts`
- `packages/research/src/public-evidence-disposition.ts`
- `packages/research/src/public-product-projection.ts`
- focused tests for all three modules
- `scripts/verify-public-product-experience-taxonomy.mjs`
- `scripts/verify-public-product-evidence-dispositions.mjs`
- corresponding Node test files

Modify:

- `packages/governance/src/index.ts`
- `packages/research/package.json`
- `packages/research/src/index.ts`
- `scripts/verify-public-product-corpus.mjs`
- `scripts/compile-public-product-pattern-hypotheses.mjs`
- `scripts/review-public-product-pattern-hypotheses.mjs`
- `scripts/plan-public-product-corpus-expansion.mjs`
- their existing tests
- `research/09-experimental/public-product-corpus/README.md`
- package exports and boundary checks only when required by the implementation plan

The optional Agents SDK adapter belongs in the already-planned `packages/runtime-cloudflare` package and may not be pulled into the portable research package.

## 18. Testing strategy

### 18.1 Taxonomy tests

Tests must prove:

- exact closed shape and canonical bytes;
- Unicode-scalar ordering and duplicate rejection;
- exact six-slot order;
- stable IDs and digests;
- previous-version binding;
- exact lookup only;
- unknown-signature fail-closed behavior;
- nonexistent normalized ID rejection;
- duplicate raw-signature rejection;
- two distinct qualified reviewers;
- taxonomy-version review of the complete material digest;
- held, failed, stale, forged, or self-approved review rejection;
- replay of the exact governance policy, grant, semantic-decision approval, controls, and audit evidence;
- bootstrap or development-fixture qualification cannot validate an official review;
- ML proposals remain ineligible; and
- taxonomy changes alter downstream identities.

### 18.2 Disposition tests

Tests must prove:

- immutable subject-ref derivation from path, kind, ID, and row bytes;
- default-active behavior;
- legal and illegal transitions;
- predecessor, sequence, and head checks;
- fork, gap, and cycle rejection;
- terminal-state enforcement;
- replacement existence, activity, validity, and acyclicity;
- complete two-review set binding;
- role-specific reviewer requirements;
- future, stale, revoked, forged, or conflicting review rejection;
- an invalid historical row can be rejected without being treated as valid evidence;
- an invalid disposition leaves the subject active and visible as an error; and
- raw historical counts never decrease.

### 18.3 Aggregate projection tests

Tests must prove:

- inactive evidence cannot qualify;
- superseded ancestors do not create duplicate URL or identity errors;
- active replacements do;
- held evidence produces no breadth or state credit;
- exact source-observation projection after disposition;
- only reviewed mapped direct UI receives canonical state credit;
- five raw paraphrases in one slot count once;
- five distinct canonical slots count five;
- unmapped evidence remains visible but ineligible;
- taxonomy and ledger digests bind the report;
- permutations produce byte-identical reports; and
- every authority and learning field remains disabled.

### 18.4 Compiler and learning tests

Tests must prove:

- grouping uses normalized signatures rather than raw labels;
- support thresholds count distinct companies, products, and industries;
- copied wording and company/product names are absent;
- inactive evidence and unreviewed mappings cannot support a hypothesis;
- hypothesis identities change with taxonomy or disposition state;
- self-declared hypothesis-review qualification is rejected;
- two current independent qualification refs and complete review receipts are required;
- review cannot directly create a `ContentPattern`;
- no public evidence enters writer prompts, feature vectors, preferences, golden fixtures, or benchmarks; and
- only project-owned, independently reviewed pattern applications may reach learning qualification.

### 18.5 Agents SDK adapter tests

Local-emulator tests must prove:

- authentication before Agent instance routing;
- direct client state writes are denied;
- duplicate schedules are idempotent;
- workflow retries do not duplicate batch claims or reviews;
- ambiguous external outcomes stop with `remote_outcome_unknown`;
- approval timeouts and rejections fail closed;
- an approval event without a valid portable review receipt has no effect;
- host loss before canonical acknowledgement yields no accepted artifact;
- restored workflows resume from canonical refs without widening scope; and
- adapter output is byte-equivalent to the portable implementation.

## 19. Acceptance criteria

This design is implemented only when all of the following are freshly demonstrated:

1. all existing batch files retain their original bytes;
2. one active, digest-valid experience taxonomy exists;
3. every active mapping has two valid independent reviews;
4. one append-only, digest-valid disposition ledger resolves without forks or cycles;
5. the v0.2 aggregate verifier derives one deterministic active projection;
6. all 285 current errors other than the three world-scale target shortfalls are either still reported or resolved by reviewed dispositions and valid replacements—none are ignored—and the three target shortfalls remain separately reported until the actual targets are met;
7. canonical five-state coverage cannot be satisfied by label paraphrases;
8. the compiler groups reviewed normalized signatures and still emits authority-free hypotheses only at frozen support thresholds;
9. raw public wording is absent from prompts, training, benchmarks, and model fixtures;
10. project and organization authority remain unchanged;
11. focused tests, corpus tool tests, research package tests, full repository tests, typecheck, boundaries, foundation verification, and diff hygiene pass under pinned Node 24.14.0;
12. the portable runtime verifier receives a newly reviewed ownership ledger rather than a silently widened historical ledger; and
13. any Agents SDK adapter passes local equivalence but makes no deployment or production-live claim.

## 20. Completion meaning

Completion establishes a deterministic, reviewed and auditable bridge from immutable public evidence to cross-product structural hypotheses. It enables content.md to learn from approved project-owned applications of reviewed abstractions while keeping raw public material outside prompts and training.

It does not prove that the corpus is world-scale, that any observed pattern is good, that writing quality improved in production, that a model may be promoted, or that an organization approved content. Those claims require their separate evidence, reviews, experiments, current authority, and publication decisions.

## 21. External design references

The optional orchestration boundary is based on current Cloudflare Agents documentation for [durable Workflows](https://developers.cloudflare.com/agents/concepts/workflows/), [Agent state](https://developers.cloudflare.com/agents/runtime/lifecycle/state/), and [persistent schedules](https://github.com/cloudflare/agents/blob/main/docs/agents/scheduling.md). These references support adapter mechanics only; they do not supply evidence, reviewer qualification, authorization, or product authority.
