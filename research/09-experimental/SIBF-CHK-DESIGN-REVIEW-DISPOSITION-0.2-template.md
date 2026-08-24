---
title: "SIBF checkout fixture design 0.2 review-disposition template"
status: proposed
created: 2026-08-18
updated: 2026-08-18
document_id: SIBF-CHK-DESIGN-REVIEW-DISPOSITION-TEMPLATE-0.2
template_revision: "0.2.6"
template_status: proposed
decision_status: not-decided
issuance_status: not-issued
validation_status: not-run
authority_effect: none
effective_at: null
subject_document_id: SIBF-CHK-DESIGN-CONTRACT-0.2
subject_contract_revision: "0.2.1"
subject_digest_algorithm: sha256
subject_digest: b4f2aa0f67efe73e44c0eb5be5fce69c8838f6982c1492a8cef348e6c73a9c6b
subject_byte_length: 40114
scope: "Unissued drafting aid for a future design-only disposition on the exact SIBF-CHK-DESIGN-CONTRACT-0.2 bytes"
source_documents:
  - ../00-method/research-protocol.md
  - ../05-technology/security-privacy-and-trust-boundaries.md
  - ../08-synthesis/candidate-system-model.md
  - SIBF-CHK-DESIGN-CONTRACT-0.2.md
  - SIBF-CHK-DESIGN-CONTRACT-0.2.1-review-evidence-2026-08-18.md
  - materials-and-access-register.md
  - shared-benchmark-fixture-specification.md
---

# SIBF checkout fixture design 0.2 review-disposition template

> **TEMPLATE — PROPOSED / NOT ISSUED / NO AUTHORITY.** This file is a drafting aid. Its creation, presence, completion, review, acknowledgement, or inclusion in a task changes no decision or authorization state. Unbound language—including “continue,” “proceed,” “go ahead,” “looks good,” or “approved”—is not a disposition or authorization. Authority exists only when a separately completed record binds the exact subject digest and scope, identifies authenticated authorized decision-makers and their authority bases, contains an allowed typed decision, passes prerequisite, signature, expiry, revocation, and independent-readback validation, and is issued in the designated authority system. Until then, `authority_effect: none`; every unspecified action is denied.

## Purpose and current state

**[Proposal]** Use this template to prepare—but not infer or issue—the design-only decision required before any later Track B fixture-work authorization may even be drafted.

The bound subject is the exact proposed [SIBF checkout fixture successor design contract 0.2](SIBF-CHK-DESIGN-CONTRACT-0.2.md). This template records no decision. The design remains `proposed/not-for-use`; Track A remains public-development-only; Track B remains uncreated; architecture `r2` remains unbound and unapproved.

| Current field | Required current value |
| --- | --- |
| Template status | `proposed` |
| Decision status | `not-decided` |
| Issuance status | `not-issued` |
| Validation status | `not-run` |
| Authority effect | `none` |
| Effective time | `null` |

These values may change only in a separately issued record. Editing this template cannot change them.

## Exact subject binding

| Subject field | Bound value |
| --- | --- |
| Document ID | `SIBF-CHK-DESIGN-CONTRACT-0.2` |
| Contract revision | `0.2.1` |
| Repository path | `research/09-experimental/SIBF-CHK-DESIGN-CONTRACT-0.2.md` |
| Digest algorithm | `sha256` |
| Digest | `b4f2aa0f67efe73e44c0eb5be5fce69c8838f6982c1492a8cef348e6c73a9c6b` |
| Byte length | `40114` |
| Digest verified for template preparation | `2026-08-18T10:18:00-07:00` |

Any byte change, revision change, scope change, or replacement of the subject requires a new digest verification and a new disposition record. A disposition must not silently bind “the latest version.”

## Allowed dispositions and effects

| Typed disposition | Resulting design state if validly issued | Maximum effect |
| --- | --- | --- |
| `not-decided` | `proposed` | None. |
| `accept-design-only` | `approved` for the exact design and scope | Accepts only the hash-bound dual-track design. It may permit drafting exactly one separately named proposed/not-issued next artifact. It creates no fixture or operational authority. |
| `return-for-revision` | `proposed` | Returns the exact subject with bounded revision requests. No later artifact may advance. |
| `reject` | `rejected` | Rejects the exact subject. No later artifact may advance unless a separately authorized replacement direction is named. |
| `defer` | `proposed` | Records why no decision is being made and the exact evidence or event required for reconsideration. |

There is no `conditional-approval`, `approved-for-materialization`, `approved-for-release`, `approved-for-architecture`, or `approved-for-build` value. Conditions constrain an allowed disposition; they cannot rewrite the bound design or widen its effect.

## Unissued record shape

The following block is a record schema/example with deliberately unresolved values. It is not a record instance and must not be copied into an authority system without independent verification.

```yaml
schema_version: design-review-disposition/0.2
template_id: SIBF-CHK-DESIGN-REVIEW-DISPOSITION-TEMPLATE-0.2
record_id: null
record_version: null
record_lifecycle_status: proposed
decision_status: not-decided
issuance_status: not-issued
validation_status: not-run
authority_effect: none

review_recommendations:
  - recommendation_ref: SIBF-CHK-DESIGN-REVIEW-EVIDENCE-2026-08-18-01
    evidence_record_version: not-established
    evidence_digest_algorithm: sha256
    evidence_digest: 3f1b27e866888b53aa296a157e8947b35471a22d560053056a0b20630fa5be9d
    recommended_disposition: accept-design-only
    evidence_class: independent-read-only-design-evidence
    evidence_cutoff: 2026-08-18
    source_review_completion_status: complete
    admissibility_status: not-reviewed
    authority_effect: none

subject:
  document_id: SIBF-CHK-DESIGN-CONTRACT-0.2
  contract_revision: "0.2.1"
  artifact_path: research/09-experimental/SIBF-CHK-DESIGN-CONTRACT-0.2.md
  digest_algorithm: sha256
  digest: b4f2aa0f67efe73e44c0eb5be5fce69c8838f6982c1492a8cef348e6c73a9c6b
  byte_length: 40114
  hash_verified_at: null
  independent_hash_verification_ref: null

decision:
  disposition: not-decided
  resulting_design_state: proposed
  exact_scope: null
  rationale: null
  conditions: []
  exclusions:
    - track-a-release
    - track-b-creation
    - track-b-authoring
    - track-b-materialization
    - annotation-or-gold-creation
    - fixture-seal-or-release
    - role-or-owner-appointment
    - architecture-binding-or-approval
    - implementation-planning
    - scaffolding-build-or-test-execution
    - browser-product-or-participant-study
    - publication-or-external-delivery
    - capability-or-task-grant
  unresolved_risks: []

review_basis:
  evidence_cutoff: null
  reviewed_scope: null
  supporting_evidence_records: []
  supporting_evidence_disposition: not-reviewed
  supporting_evidence_disposition_rationale: null
  counterevidence_records: []
  counterevidence_disposition: not-reviewed
  counterevidence_disposition_rationale: null
  conflict_records: []
  conflict_disposition: not-reviewed
  conflict_disposition_rationale: null
  unresolved_question_records: []
  unresolved_question_disposition: not-reviewed
  unresolved_question_disposition_rationale: null
  compatibility_check_records: []
  compatibility_disposition: not-reviewed
  compatibility_disposition_rationale: null
  limitation_records: []
  limitation_disposition: not-reviewed
  limitation_disposition_rationale: null
  source_review_completion_status: complete
  decision_review_completion_status: not-run

decision_policy:
  decision_policy_ref: null
  policy_version: null
  policy_digest_algorithm: null
  policy_digest: null
  policy_currentness_checked_at: null
  policy_defined_required_capacity_classes: []
  policy_defined_dual_role_rule: not-established
  policy_defined_specialist_review_requirements: []
  policy_defined_record_signature_requirements: []
  policy_defined_use_check_signature_requirements: []
  policy_defined_state_event_signature_requirements: []
  policy_defined_state_ledger_snapshot_signature_requirements: []

authority_decisions: []

specialist_review_requirements: []

validity:
  effective_at: null
  expires_at: null
  review_at: null
  revocation_route: null
  revocation_state_at_issuance: not-established
  revocation_checked_at_issuance: null
  change_triggers:
    - subject-digest-change
    - subject-scope-change
    - authority-loss-or-revocation
    - track-identity-role-exposure-or-denominator-change
    - conflicting-rights-security-privacy-or-review-evidence

next_permitted_artifact:
  artifact_id: null
  artifact_revision: null
  artifact_class: none
  permitted_action: none
  scope_profile_id: none
  exact_scope: null
  exact_scope_digest_algorithm: sha256
  exact_scope_digest: null
  authority_class: none
  required_target_states:
    template_status: proposed
    decision_status: not-decided
    issuance_status: not-issued
    validation_status: not-run
    authority_effect: none
  prohibited_effects:
    - fixture-authoring
    - fixture-materialization
    - package-minting
    - release
    - architecture-binding-or-approval
    - implementation
    - execution
    - study

non_authority:
  task_grant_ref: null
  mutation_change_approval_ref: null
  release_approval_ref: null
  fixture_work_authorization_ref: null
  architecture_planning_authority: none
  build_authority: none
  execution_authority: none
  desktop_or_product_study_authority: none
  participant_research_authority: none
  b1_eligibility_or_run_authority: none
  security_privacy_legal_or_rights_certification: none

recording:
  designated_authority_system: null
  controlled_record_id_issuer: null
  recorded_by_identity_ref: null
  recorded_at: null
  issuance_receipt_ref: null
  supersedes_ref: null

record_integrity:
  canonical_serialization: RFC8785-JCS-UTF8
  digest_algorithm: sha256
  digest_preimage_rule: "RFC 8785 canonical JSON of the complete immutable disposition payload with record_integrity.record_digest, the complete record_integrity.record_signatures array, and recording.issuance_receipt_ref omitted; signatures and receipt are append-only issuance evidence outside the signed payload and may not change any payload field"
  record_digest: null
  record_signatures: []
  signature_covers:
    - record_digest
    - subject.digest
```

The empty `authority_decisions`, `specialist_review_requirements`, and `record_signatures` arrays above are deliberate fail-closed values. A future issued record uses the following nested entry shapes; it may not substitute opaque strings or a single generic approval reference:

```yaml
authority_decision_entry_schema:
  authority_decision_id: null
  capacity_class: null
  authenticated_identity_ref: null
  authentication_evidence_ref: null
  authority_basis_ref: null
  authority_basis_version: null
  authority_basis_digest_algorithm: sha256
  authority_basis_digest: null
  authority_scope: null
  conflict_declaration_ref: null
  conflict_disposition: not-reviewed
  disposition: not-decided
  decided_at: null
  capacity_signature_id: null

specialist_review_requirement_entry_schema:
  requirement_id: null
  specialist_class: null
  policy_requirement_disposition: not-reviewed
  appointment_or_authority_ref: null
  appointment_or_authority_version: null
  appointment_or_authority_digest_algorithm: sha256
  appointment_or_authority_digest: null
  reviewer_identity_ref: null
  authentication_evidence_ref: null
  qualification_evidence_ref: null
  qualification_evidence_version: null
  qualification_evidence_digest_algorithm: sha256
  qualification_evidence_digest: null
  independence_and_conflict_ref: null
  independence_and_conflict_version: null
  independence_and_conflict_digest_algorithm: sha256
  independence_and_conflict_digest: null
  review_ref: null
  review_version: null
  review_digest_algorithm: sha256
  review_digest: null
  reviewed_scope: null
  review_result: not-reviewed
  blocking_finding_refs: []
  disposition_rationale: null

review_evidence_entry_schema:
  evidence_record_ref: null
  evidence_record_version: null
  evidence_digest_algorithm: sha256
  evidence_digest: null
  evidence_class: null
  exact_scope: null
  source_review_completion_status: not-run
  admissibility_status: not-reviewed
  review_item_disposition: not-reviewed
  disposition_rationale: null

review_item_entry_schema:
  review_item_ref: null
  review_item_version: null
  review_item_digest_algorithm: sha256
  review_item_digest: null
  review_item_class: null
  exact_scope: null
  admissibility_status: not-reviewed
  review_item_disposition: not-reviewed
  disposition_rationale: null

compatibility_check_entry_schema:
  compatibility_check_id: null
  contract_ref: null
  contract_version: null
  contract_digest_algorithm: sha256
  contract_digest: null
  checked_scope: null
  check_result: not-reviewed
  admissibility_status: not-reviewed
  review_item_disposition: not-reviewed
  limitation_refs: []
  disposition_rationale: null

limitation_entry_schema:
  limitation_id: null
  limitation_version: null
  limitation_digest_algorithm: sha256
  limitation_digest: null
  exact_statement: null
  affected_scope: null
  admissibility_status: not-reviewed
  review_item_disposition: not-reviewed
  disposition_rationale: null

record_signature_entry_schema:
  signature_id: null
  signature_requirement_id: null
  signer_identity_ref: null
  signer_capacity_class: null
  authority_decision_ref: null
  signature_algorithm: null
  signed_record_digest_algorithm: sha256
  signed_record_digest: null
  signed_subject_digest_algorithm: sha256
  signed_subject_digest: null
  signer_key_ref: null
  trust_root_ref: null
  signature_verification_profile_ref: null
  signed_at: null
  signature_value_ref: null
  signer_key_status: not-checked
  signer_key_currentness_checked_at: null
  signer_key_revocation_state: not-established
  signer_key_revocation_checked_at: null
  trust_root_status: not-checked
  trust_root_currentness_checked_at: null
  trust_root_revocation_state: not-established
  trust_root_revocation_checked_at: null
  verification_status: not-checked
  verified_at: null
  verifier_identity_ref: null

record_signature_requirement_entry_schema:
  signature_requirement_id: null
  required_signer_capacity_class: null
  exact_signer_count: 1
  linked_authority_capacity_class: null
  allowed_signature_algorithms: []
  trust_root_set_ref: null
  trust_root_set_version: null
  trust_root_set_digest_algorithm: sha256
  trust_root_set_digest: null
  verification_profile_ref: null
  verification_profile_version: null
  verification_profile_digest_algorithm: sha256
  verification_profile_digest: null
  signer_independence_rule: null

use_check_signature_requirement_entry_schema:
  signature_requirement_id: null
  required_signer_capacity_class: independent-use-check-verifier
  exact_signer_count: 1
  allowed_signature_algorithms: []
  trust_root_set_ref: null
  trust_root_set_version: null
  trust_root_set_digest_algorithm: sha256
  trust_root_set_digest: null
  verification_profile_ref: null
  verification_profile_version: null
  verification_profile_digest_algorithm: sha256
  verification_profile_digest: null
  independence_rule: different-from-every-disposition-decision-maker-and-recorder

state_event_signature_requirement_entry_schema:
  signature_requirement_id: null
  required_signer_capacity_class: governance-state-change-authority
  exact_signer_count: 1
  allowed_signature_algorithms: []
  trust_root_set_ref: null
  trust_root_set_version: null
  trust_root_set_digest_algorithm: sha256
  trust_root_set_digest: null
  verification_profile_ref: null
  verification_profile_version: null
  verification_profile_digest_algorithm: sha256
  verification_profile_digest: null
  independence_rule: policy-defined

state_ledger_snapshot_signature_requirement_entry_schema:
  signature_requirement_id: null
  required_signer_capacity_class: governance-state-ledger-checkpoint-authority
  exact_signer_count: 1
  allowed_signature_algorithms: []
  trust_root_set_ref: null
  trust_root_set_version: null
  trust_root_set_digest_algorithm: sha256
  trust_root_set_digest: null
  verification_profile_ref: null
  verification_profile_version: null
  verification_profile_digest_algorithm: sha256
  verification_profile_digest: null
  independence_rule: policy-defined
```

The issued disposition is immutable. Action-time currentness, revocation, digest, signature, and next-artifact checks must never update it. Each use instead creates a separate append-only verification record with its own ID, digest, receipt, and binding to the immutable disposition digest:

```yaml
schema_version: design-review-disposition-use-check/0.1
use_check_id: null
use_check_version: null
use_check_status: not-issued
use_check_result: not-run
designated_authority_system: null
controlled_record_id_issuer: null
disposition_binding:
  record_id: null
  record_version: null
  record_digest_algorithm: sha256
  record_digest: null
decision_policy_binding:
  decision_policy_ref: null
  policy_version: null
  policy_digest_algorithm: sha256
  policy_digest: null
subject_binding:
  document_id: SIBF-CHK-DESIGN-CONTRACT-0.2
  digest_algorithm: sha256
  digest: b4f2aa0f67efe73e44c0eb5be5fce69c8838f6982c1492a8cef348e6c73a9c6b
checked_at: null
issued_at: null
maximum_check_age_seconds: 300
designated_system_readback_ref: null
state_event_ledger_snapshot_binding:
  snapshot_id: null
  snapshot_version: null
  snapshot_status: not-issued
  snapshot_digest_algorithm: sha256
  snapshot_digest: null
  ledger_id: null
  target_record_type: design-review-disposition
  target_record_id: null
  target_record_version: null
  target_record_digest_algorithm: sha256
  target_record_digest: null
  as_of: null
  checked_at: null
  issued_at: null
  entry_count: null
  head_sequence_number: null
  head_event_digest_algorithm: sha256
  head_event_digest: null
  ordered_event_digests_digest_algorithm: sha256
  ordered_event_digests_digest: null
  authoritative_system_cursor: null
  results:
    target_partition_match: not-run
    genesis_and_predecessor_chain_valid: not-run
    contiguous_monotonic_sequence_valid: not-run
    entry_count_and_head_match: not-run
    no_duplicate_sequence_or_event_digest: not-run
    no_fork_detected: not-run
    complete_through_authoritative_cursor: not-run
  signature_verification_status: not-checked
  issuance_receipt_ref: null
independent_checker_identity_ref: null
independent_checker_authentication_evidence_ref: null
independent_checker_authority_basis_ref: null
independent_checker_authority_basis_version: null
independent_checker_authority_basis_digest_algorithm: sha256
independent_checker_authority_basis_digest: null
checks:
  subject_digest_match: not-checked
  disposition_record_digest_match: not-checked
  disposition_signature_valid: not-checked
  decision_status_is_decided: not-checked
  decision_disposition_is_accept_design_only: not-checked
  issuance_status_is_issued: not-checked
  validation_status_is_passed: not-checked
  authority_effect_is_design_only: not-checked
  decision_policy_current: not-checked
  required_capacity_signature_set_current: not-checked
  required_specialist_review_set_current: not-checked
  signer_keys_current_and_unrevoked: not-checked
  trust_roots_current_and_unrevoked: not-checked
  effective_time_has_begun: not-checked
  expiry_not_elapsed: not-checked
  review_not_overdue: not-checked
  revocation_state_current_and_unrevoked: not-checked
  state_event_ledger_snapshot_current_complete_ordered_unforked: not-checked
  authoritative_system_cursor_atomic_match_at_action: not-checked
  no_effective_revocation_or_supersession_event: not-checked
  next_artifact_exact_match: not-checked
next_artifact_binding:
  artifact_id: null
  artifact_revision: null
  artifact_class: none
  permitted_action: none
  scope_profile_id: none
  exact_scope: null
  exact_scope_digest_algorithm: sha256
  exact_scope_digest: null
  authority_class: none
  required_target_states:
    template_status: proposed
    decision_status: not-decided
    issuance_status: not-issued
    validation_status: not-run
    authority_effect: none
  prohibited_effects:
    - fixture-authoring
    - fixture-materialization
    - package-minting
    - release
    - architecture-binding-or-approval
    - implementation
    - execution
    - study
use_check_integrity:
  canonical_serialization: RFC8785-JCS-UTF8
  digest_algorithm: sha256
  digest_preimage_rule: "RFC 8785 canonical JSON of the complete immutable use-check payload with use_check_integrity.record_digest, the complete use_check_integrity.use_check_signatures array, use_check_integrity.signature_verification_status, and use_check_integrity.issuance_receipt_ref omitted; signatures, aggregate verification result, and receipt are append-only issuance evidence outside the signed payload and may not change any payload field"
  record_digest: null
  signature_requirement_refs: []
  use_check_signatures: []
  signature_verification_status: not-checked
  issuance_receipt_ref: null
```

Each `use_check_signatures` member must use this exact nested shape; an opaque signature string is invalid:

```yaml
use_check_signature_entry_schema:
  signature_id: null
  signature_requirement_id: null
  signer_identity_ref: null
  signer_capacity_class: independent-use-check-verifier
  authentication_evidence_ref: null
  authority_basis_ref: null
  authority_basis_version: null
  authority_basis_digest_algorithm: sha256
  authority_basis_digest: null
  signature_algorithm: null
  signed_use_check_digest_algorithm: sha256
  signed_use_check_digest: null
  signed_disposition_digest_algorithm: sha256
  signed_disposition_digest: null
  signed_subject_digest_algorithm: sha256
  signed_subject_digest: null
  signer_key_ref: null
  trust_root_ref: null
  signature_verification_profile_ref: null
  signed_at: null
  signature_value_ref: null
  signer_key_status: not-checked
  signer_key_currentness_checked_at: null
  signer_key_revocation_state: not-established
  signer_key_revocation_checked_at: null
  trust_root_status: not-checked
  trust_root_currentness_checked_at: null
  trust_root_revocation_state: not-established
  trust_root_revocation_checked_at: null
  verification_status: not-checked
  verified_at: null
  verifier_identity_ref: null
```

Neither an issued disposition nor an issued use-check is mutated to express revocation or supersession. A later change is a separate append-only, digest-bound, signed, receipt-backed state event. The original payload and signatures remain unchanged. A current-state projection is derived only by verifying the complete ordered event ledger for the bound record:

```yaml
schema_version: governance-record-state-event/0.1
event_id: null
event_version: null
event_status: not-issued
event_type: null
ledger_binding:
  ledger_id: null
  sequence_number: null
  predecessor_event_digest_algorithm: sha256
  predecessor_event_digest: null
target_record:
  record_type: null
  record_id: null
  record_version: null
  record_digest_algorithm: sha256
  record_digest: null
effective_at: null
reason: null
superseding_record_binding:
  record_type: null
  record_id: null
  record_version: null
  record_digest_algorithm: sha256
  record_digest: null
decision_policy_binding:
  decision_policy_ref: null
  policy_version: null
  policy_digest_algorithm: sha256
  policy_digest: null
state_change_authority:
  authenticated_identity_ref: null
  authentication_evidence_ref: null
  authority_basis_ref: null
  authority_basis_version: null
  authority_basis_digest_algorithm: sha256
  authority_basis_digest: null
  authority_scope: null
  decided_at: null
recording:
  designated_authority_system: null
  controlled_record_id_issuer: null
  recorded_at: null
  issuance_receipt_ref: null
event_integrity:
  canonical_serialization: RFC8785-JCS-UTF8
  digest_algorithm: sha256
  digest_preimage_rule: "RFC 8785 canonical JSON of the immutable state-event payload with event_integrity.event_digest, the complete event_integrity.event_signatures array, event_integrity.signature_verification_status, and recording.issuance_receipt_ref omitted"
  event_digest: null
  signature_requirement_refs: []
  event_signatures: []
  signature_verification_status: not-checked
```

For this contract, `event_status` is `not-issued` or `issued`; `event_type` is `revoked` or `superseded`; and `target_record.record_type` is exactly `design-review-disposition`. Use-checks are short-lived, single action-time verification records rather than durable authority records and are not state-event targets. Event sequence numbers are positive integers unique within one target-bound `ledger_id`; sequence 1 requires a null predecessor digest, and every later event requires the exact prior event digest. A `superseded` event requires every `superseding_record_binding` field and a verified successor digest; a `revoked` event requires all successor identity/digest values `null` while keeping `record_digest_algorithm: sha256`. Issuance requires the current policy's exact state-event signature set, passed signature/key/trust-root verification, authenticated scoped state-change authority, and a receipt binding the ledger/sequence/predecessor, event digest, and signature set. An effective verified event makes the bound disposition unusable; it does not edit the bound record. Missing, forked, stale, unordered, unverified, or incomplete ledger evidence fails closed.

Each `event_signatures` member uses this exact nested shape:

```yaml
state_event_signature_entry_schema:
  signature_id: null
  signature_requirement_id: null
  signer_identity_ref: null
  signer_capacity_class: governance-state-change-authority
  authentication_evidence_ref: null
  authority_basis_ref: null
  authority_basis_version: null
  authority_basis_digest_algorithm: sha256
  authority_basis_digest: null
  signature_algorithm: null
  signed_event_digest_algorithm: sha256
  signed_event_digest: null
  signed_target_record_digest_algorithm: sha256
  signed_target_record_digest: null
  signer_key_ref: null
  trust_root_ref: null
  signature_verification_profile_ref: null
  signed_at: null
  signature_value_ref: null
  signer_key_status: not-checked
  signer_key_currentness_checked_at: null
  signer_key_revocation_state: not-established
  signer_key_revocation_checked_at: null
  trust_root_status: not-checked
  trust_root_currentness_checked_at: null
  trust_root_revocation_state: not-established
  trust_root_revocation_checked_at: null
  verification_status: not-checked
  verified_at: null
  verifier_identity_ref: null
```

The action-time absence of a revocation/supersession event is established only by this typed checkpoint. An opaque ledger reference or an independently supplied subset of events is invalid:

```yaml
schema_version: governance-record-state-ledger-snapshot/0.1
snapshot_id: null
snapshot_version: null
snapshot_status: not-issued
ledger_id: null
target_record:
  record_type: null
  record_id: null
  record_version: null
  record_digest_algorithm: sha256
  record_digest: null
as_of: null
checked_at: null
issued_at: null
maximum_snapshot_age_seconds: 300
entry_count: null
head_sequence_number: null
head_event_digest_algorithm: sha256
head_event_digest: null
ordered_event_digests: []
ordered_event_digests_digest_algorithm: sha256
ordered_event_digests_digest: null
authoritative_system_cursor: null
designated_system_readback_ref: null
results:
  target_partition_match: not-run
  genesis_and_predecessor_chain_valid: not-run
  contiguous_monotonic_sequence_valid: not-run
  entry_count_and_head_match: not-run
  no_duplicate_sequence_or_event_digest: not-run
  no_fork_detected: not-run
  complete_through_authoritative_cursor: not-run
decision_policy_binding:
  decision_policy_ref: null
  policy_version: null
  policy_digest_algorithm: sha256
  policy_digest: null
recording:
  designated_authority_system: null
  controlled_record_id_issuer: null
  recorded_at: null
  issuance_receipt_ref: null
snapshot_integrity:
  canonical_serialization: RFC8785-JCS-UTF8
  digest_algorithm: sha256
  digest_preimage_rule: "RFC 8785 canonical JSON of the immutable ledger-snapshot payload with snapshot_integrity.snapshot_digest, the complete snapshot_integrity.snapshot_signatures array, snapshot_integrity.signature_verification_status, and recording.issuance_receipt_ref omitted"
  snapshot_digest: null
  signature_requirement_refs: []
  snapshot_signatures: []
  signature_verification_status: not-checked
```

For a nonempty ledger, `sequence_number` values are exactly the integers `1..entry_count`; event 1 has `predecessor_event_digest: null`; every later predecessor digest equals the prior event digest; `ordered_event_digests` contains exactly those event digests in sequence order; and its last item equals `head_event_digest` at `head_sequence_number: entry_count`. For an empty ledger, `entry_count: 0`, `head_sequence_number: 0`, `head_event_digest: null`, and `ordered_event_digests: []` are mandatory. `ordered_event_digests_digest` is the SHA-256 of RFC 8785 canonical JSON for that exact array, preserving array order. The designated authority system must prove that the returned target partition is complete through its monotonic `authoritative_system_cursor` and that no alternate event occupies a sequence or predecessor edge. Every `results` value must be `passed`. `snapshot_status` must be `issued`; `as_of`, `checked_at`, and `issued_at` must not be in the future and must each be no more than 300 seconds old at action time. The set and count of `snapshot_signatures.signature_requirement_id` values must equal the current policy's checkpoint requirements exactly; every signature must bind the snapshot digest, target-record digest, and authoritative cursor and pass signer identity, scoped authority, algorithm, key, trust-root, profile, currentness, and revocation verification. The receipt binds the snapshot digest, authoritative cursor, ordered digest list and its digest, and exact verified signature set. The 300-second limit is only an upper bound: use-check issuance and the permitted draft must occur in one guarded compare-and-consume transaction whose precondition is that the authority system's current cursor still equals the signed checkpoint cursor. Any cursor/head change before the draft begins denies use and requires a new snapshot and use-check.

Each `snapshot_signatures` member uses this exact nested shape:

```yaml
state_ledger_snapshot_signature_entry_schema:
  signature_id: null
  signature_requirement_id: null
  signer_identity_ref: null
  signer_capacity_class: governance-state-ledger-checkpoint-authority
  authentication_evidence_ref: null
  authority_basis_ref: null
  authority_basis_version: null
  authority_basis_digest_algorithm: sha256
  authority_basis_digest: null
  signature_algorithm: null
  signed_snapshot_digest_algorithm: sha256
  signed_snapshot_digest: null
  signed_target_record_digest_algorithm: sha256
  signed_target_record_digest: null
  signed_authoritative_system_cursor: null
  signer_key_ref: null
  trust_root_ref: null
  signature_verification_profile_ref: null
  signed_at: null
  signature_value_ref: null
  signer_key_status: not-checked
  signer_key_currentness_checked_at: null
  signer_key_revocation_state: not-established
  signer_key_revocation_checked_at: null
  trust_root_status: not-checked
  trust_root_currentness_checked_at: null
  trust_root_revocation_state: not-established
  trust_root_revocation_checked_at: null
  verification_status: not-checked
  verified_at: null
  verifier_identity_ref: null
```

## Available non-authoritative review evidence

The [dated design-review evidence record](SIBF-CHK-DESIGN-CONTRACT-0.2.1-review-evidence-2026-08-18.md) recommends `accept-design-only` for the exact `0.2.1` subject digest and records supporting evidence, prior counterevidence, compatibility checks, limitations, and unresolved risks. It is an unauthenticated, non-authoritative working note—not an issued disposition, qualified appointment, authority basis, signature, or currentness check.

A future decision process may inspect and independently verify that record, then explicitly enroll it in `review_basis` if the governing decision policy accepts its evidence class. Its mere presence or link here does not populate any unissued field, satisfy any required capacity, or change the design state.

## Closed vocabularies and non-equivalence rules

The issued record must use the exact closed values below. Free-text aliases, capitalization variants, combined states, or empty strings are invalid.

| Field family | Allowed values | Non-equivalence rule |
| --- | --- | --- |
| `record_lifecycle_status` | `proposed`, `issued` | The immutable disposition payload never changes to `revoked` or `superseded`; later current-state changes are separate state events. |
| `decision_status` | `not-decided`, `decided` | A recommendation, review completion, acknowledgement, or signature attempt is not `decided`. |
| `issuance_status` | `not-issued`, `issued` | Storage or publication is not issuance; revocation/supersession is not a mutation of this field. |
| `validation_status` | `not-run`, `passed`, `failed` | Source-review completion is not disposition validation. |
| `authority_effect` | `none`, `design-only` | `design-only` is available only to a currently valid issued `accept-design-only` record; it is never capability authority. |
| `decision.disposition` and each capacity decision | `not-decided`, `accept-design-only`, `return-for-revision`, `reject`, `defer` | `recommended_disposition` is a separate non-authoritative field and must never populate this field automatically. |
| `resulting_design_state` | `proposed`, `approved`, `rejected` | This state is derived from the typed disposition by the exact matrix below; it is not free choice. |
| `policy_defined_dual_role_rule` | `not-established`, `prohibited`, `permitted-with-separate-capacity-evidence` | One identity never satisfies multiple capacities merely because the same person holds both titles. |
| Review-item disposition | `not-reviewed`, `none-found`, `resolved`, `unresolved-nonblocking`, `unresolved-blocking`, `excluded-with-rationale` | An empty evidence array is valid only with `none-found` plus reviewed scope and rationale. |
| `source_review_completion_status` | `not-run`, `incomplete`, `complete` | `complete` means only that the source working note finished its own review procedure. |
| `decision_review_completion_status` | `not-run`, `passed`, `failed` | There is no automatic crosswalk from source `complete` to decision `passed`; the authority process must verify admissibility and record the result. |
| `admissibility_status` | `not-reviewed`, `admitted`, `excluded-with-rationale` | Admitting evidence does not adopt its recommendation. |
| `policy_requirement_disposition` | `not-reviewed`, `required`, `not-required-by-policy` | `not-required-by-policy` requires the exact current policy reference; silence is not a waiver. |
| Specialist `review_result` | `not-reviewed`, `passed`, `failed`, `unresolved` | A specialist result never substitutes for an authority decision or another specialist class. |
| Compatibility `check_result` | `not-reviewed`, `passed`, `failed`, `unresolved` | A claimed compatibility conclusion is invalid without its own versioned, digest-bound check record. |
| `revocation_state_at_issuance` and signature key/trust-root revocation state | `not-established`, `current-unrevoked`, `revoked`, `superseded` | Unknown or unchecked revocation is never current. |
| Signature key/trust-root status | `not-checked`, `current`, `expired`, `revoked`, `unknown` | Only `current` plus `current-unrevoked` passes. |
| Signature `verification_status`, `signature_verification_status`, and individual use-check values | `not-checked`, `passed`, `failed` | Missing, stale, unknown, or partially checked values fail closed. |
| `use_check_status` | `not-issued`, `issued` | A stored or locally computed check is not an issued check; later invalidation is a separate state event. |
| `use_check_result` | `not-run`, `passed`, `failed` | Only `passed` may support the exact action named in that check. |
| State-event `event_status` | `not-issued`, `issued` | Only a separately issued, verified event changes the derived current-state projection. |
| State-event `event_type` | `revoked`, `superseded` | The event does not mutate its target; `superseded` must bind the exact successor. |
| State-event `target_record.record_type` | `design-review-disposition` | An event cannot silently apply to another record class. |
| Ledger-snapshot `snapshot_status` | `not-issued`, `issued` | A local event list or opaque pointer is not an issued completeness checkpoint. |
| Ledger-snapshot `results.*` | `not-run`, `passed`, `failed` | Every result must be `passed`; absent or partial ordering/completeness evidence fails closed. |
| `next_permitted_artifact.artifact_class` | `none`, `fixture-work-authorization-template` | No package, fixture, gold, architecture, plan, test, or implementation class is allowed here. |
| `next_permitted_artifact.permitted_action` | `none`, `draft-proposed-not-issued-only` | Drafting is not approval, authorization, materialization, implementation, or execution. |
| `next_permitted_artifact.scope_profile_id` | `none`, `fixture-work-authorization-template-draft-only/0.1` | A free-text scope cannot widen the closed profile. |
| `next_permitted_artifact.authority_class` | `none`, `draft-proposed-not-issued-fixture-work-template-only` | The class grants no fixture-work authority and no later-gate effect. |

The existing evidence record's `review_completion_status: complete` maps only to `source_review_completion_status: complete`. It does not satisfy `decision_review_completion_status: passed`, `validation_status: passed`, or any decision/issuance predicate.

### Exact cross-field state matrix

Every record must match exactly one row. `not-decided` is an unissued draft state, not an issuable decision.

| Typed disposition | Required `decision_status` | Required design state | Required authority effect | Permitted next-artifact state |
| --- | --- | --- | --- | --- |
| `not-decided` | `not-decided` | `proposed` | `none` | Closed no-artifact state; record remains `proposed` and `not-issued` |
| `accept-design-only` | `decided` | `approved` | `design-only` only while the issued record remains current, effective, unexpired, unrevoked, unsuperseded, and valid | Either the closed no-artifact state, or exactly one named `fixture-work-authorization-template` under the closed draft-only profile |
| `return-for-revision` | `decided` | `proposed` | `none` | Closed no-artifact state |
| `reject` | `decided` | `rejected` | `none` | Closed no-artifact state |
| `defer` | `decided` | `proposed` | `none` | Closed no-artifact state |

A current valid issued record has `record_lifecycle_status: issued`, `decision_status: decided`, a non-`not-decided` typed disposition, `issuance_status: issued`, `validation_status: passed`, and the exact state/effect mapping above. A currently effective accepted-design record additionally has `decision.disposition: accept-design-only`, `resulting_design_state: approved`, `authority_effect: design-only`, and no effective verified revocation or supersession event in the complete ordered state-event ledger. These are separate predicates: a validly issued return, rejection, or deferral has `authority_effect: none`. An effective state event changes the derived current authority effect to `none` without changing the original immutable payload.

### Closed next-artifact profile

When `accept-design-only` names a next artifact, all of these values are mandatory and exact:

- `artifact_id` and `artifact_revision` are non-null stable identifiers for one artifact;
- `artifact_class: fixture-work-authorization-template`;
- `permitted_action: draft-proposed-not-issued-only`;
- `scope_profile_id: fixture-work-authorization-template-draft-only/0.1`;
- `authority_class: draft-proposed-not-issued-fixture-work-template-only`;
- `exact_scope` is exactly: `Draft and review only one inert fixture-work authorization template. The artifact must remain proposed, not-decided, not-issued, not-run, and authority-effect none. It may not populate real identities, authorize fixture work, create or materialize Track B, bind architecture, plan implementation, execute anything, or advance any gate.`;
- `exact_scope_digest` is the SHA-256 of the RFC 8785 canonical JSON scope-profile object defined below;
- `required_target_states` equals `template_status: proposed`, `decision_status: not-decided`, `issuance_status: not-issued`, `validation_status: not-run`, and `authority_effect: none`; and
- `prohibited_effects` equals the fixed set in the record shape, with no omission or substitution.

The scope-profile digest preimage is one JSON object with exactly these nine keys and types: string `artifact_id`; string `artifact_revision`; string `artifact_class`; string `permitted_action`; string `scope_profile_id`; string `authority_class`; string `exact_scope`; object `required_target_states`; and array `prohibited_effects`. `required_target_states` has exactly the five keys and values listed above. `prohibited_effects` preserves this exact array order: `fixture-authoring`, `fixture-materialization`, `package-minting`, `release`, `architecture-binding-or-approval`, `implementation`, `execution`, `study`. The recursive `exact_scope_digest_algorithm` and `exact_scope_digest` fields are not in the preimage. RFC 8785 determines object-key order; the array order is fixed here.

If no artifact is permitted, the closed no-artifact state is exact: `artifact_id`, `artifact_revision`, `exact_scope`, and `exact_scope_digest` are `null`; `artifact_class`, `permitted_action`, `scope_profile_id`, and `authority_class` are `none`; `exact_scope_digest_algorithm` remains `sha256`; and the fixed `required_target_states` object and `prohibited_effects` array remain populated exactly as shown in the record shape. Mixed states are invalid.

## Decision validation rules

A future record is invalid unless all applicable rules pass:

1. The subject bytes, byte length, revision, path, and digest are independently reverified at decision time and exactly match the record. Any drift requires a new subject revision and disposition.
2. A generic current issued decision requires resolved `record_id`/version/system/receipt, `record_lifecycle_status: issued`, `decision_status: decided`, a non-`not-decided` disposition, `issuance_status: issued`, `validation_status: passed`, the exact disposition/state/effect matrix, and a current issued ledger snapshot that is target-bound, digest-/receipt-/signature-verified, complete, contiguous, ordered, unforked, and no more than 300 seconds old, with no effective revocation or supersession event. Only the additional accepted-design-effective predicate may carry `authority_effect: design-only`; return, reject, and defer records may be validly issued only with `authority_effect: none`. Contradictory payload combinations, an invalid/stale checkpoint, or an effective verified state event fails closed without mutating the original record.
3. A current external decision policy is bound by ID, version, digest, and currentness timestamp. It declares exact unique sets for required decision capacity classes, specialist requirement IDs, disposition-record signature requirement IDs, use-check signature requirement IDs, state-event signature requirement IDs, and state-ledger-snapshot signature requirement IDs, plus the dual-role rule. Missing or self-declared policy data, an empty required-capacity or disposition-record-signature set, an unknown dual-role rule, or a stale/mismatched policy invalidates issuance. An empty specialist set is valid only when the current policy explicitly requires none; an empty use-check-signature set is valid only when no next artifact is permitted and therefore no use-check can occur. State-event and checkpoint signature requirement sets must be nonempty before either record class may issue.
4. The set of `authority_decisions.capacity_class` values equals the policy-required capacity set exactly, with unique capacity and decision IDs and no missing or extra entry. Every entry has authenticated identity, hash-bound authority basis, exact scope, conflict evidence and a nonblocking disposition, top-level-matching typed decision, time, and unique capacity-signature ID. If one identity occupies multiple capacities, the policy must say `permitted-with-separate-capacity-evidence`, and each capacity still needs a separate authority basis, scope, decision entry, and signature; otherwise dual-hatting is invalid. Authorship, title, custody, chat participation, or generic user status proves none of these.
5. The set of `specialist_review_requirements.requirement_id` values equals the policy-declared specialist set exactly, with no missing, duplicate, or extra entry. Each policy-required review has authenticated reviewer identity, hash-bound appointment/authority, qualification, independence/conflict evidence, exact reviewed scope, versioned digest-matching review record, `policy_requirement_disposition: required`, `review_result: passed`, and no `blocking_finding_refs`. A policy-declared `not-required-by-policy` entry must bind that exact current policy result and grants no waiver. `accept-design-only` is invalid if any required specialist is absent, unauthenticated, unqualified, non-independent, stale, mismatched, `not-reviewed`, `failed`, `unresolved`, or blocking.
6. Recommendations never populate decisions. Every supporting-evidence entry uses `review_evidence_entry_schema`; every counterevidence, conflict, and unresolved-question entry uses `review_item_entry_schema`; compatibility and limitation entries use their typed shapes. All referenced versions/digests must resolve and match. Every aggregate and entry has explicit admissibility and disposition, and empty arrays require aggregate `none-found`, exact reviewed scope, and a non-null rationale. `accept-design-only` requires `decision_review_completion_status: passed`, at least one digest-matching admitted supporting-evidence entry, admitted compatibility evidence where claimed, and no aggregate or entry that is `not-reviewed` or `unresolved-blocking`; authority conflicts must also be nonblocking. Excluded evidence, compatibility items, or limitations require rationale and cannot be silently ignored.
7. `accept-design-only` binds the complete exact dual-track design. Partial, track-selective, conditional, or materially altered acceptance is invalid and requires a revised design, digest, and new disposition process.
8. The next-artifact object must satisfy the closed profile exactly. Non-accepting dispositions require the exact closed no-artifact state. An acceptance may also choose that closed no-artifact state, or name exactly one stable fixture-work-authorization-template ID/revision with the exact draft-only class, action, scope profile, canonical scope-profile digest, required target states, and prohibited effects. The later use-check must carry the identical complete object, including `prohibited_effects`. Any broader/free-text/mixed value, noncanonical digest preimage, or mismatch denies use.
9. Validity requires effective time, at least one expiry or review time, revocation route, `revocation_state_at_issuance: current-unrevoked`, a current issuance-time revocation check, evaluation of every change trigger, and the current issued ledger snapshot. The snapshot's target, digest, receipt, signatures, authoritative cursor, entry count, head, ordered digest list, predecessor chain, sequence uniqueness, fork result, completeness result, and age must all verify. An ineffective, expired, overdue, trigger-invalidated record—or a record bound by an effective verified revocation/supersession event—has no current design effect; the original signed payload is never edited.
10. The immutable disposition payload is canonicalized and hashed under the declared noncircular preimage rule. The exact set of `record_signatures.signature_requirement_id` values and counts equals the current policy requirements; every authority decision's `capacity_signature_id` resolves to exactly one matching signature and capacity, with no reuse unless the policy explicitly requires it. Every signature's explicit signed-record and signed-subject digests equal the payload and subject digests and has authenticated signer, current permitted algorithm, current unrevoked key and trust root, hash-bound verification profile, `verification_status: passed`, timestamp, and verifier. Missing, stale, mismatched, extra, unverifiable, multiply interpreted, or ambiguously serialized integrity data invalidates issuance.
11. The issuance receipt binds the immutable payload digest and exact verified signature set in the designated system. The receipt and signature-verification evidence are append-only issuance evidence outside the signed payload; neither may alter payload fields. A controlled-system readback must reproduce the identical original payload digest, signature set, record ID/version, lifecycle, decision, issuance, validation, and declared effect fields, then separately verify the current checkpoint and every event digest/edge in its complete target-bound partition before deriving current effect.
12. A next-artifact draft requires a separate append-only use-check whose `checked_at` and `issued_at` are both no more than 300 seconds old and not in the future at action time. It must bind the exact disposition digest, subject digest, current policy digest, identical complete next-artifact object, and the current checkpoint's ID/version/status/digest/target/as-of/check/issue times/count/head/ordered-list digest/authoritative cursor/results/signature status/receipt; have `use_check_status: issued`, `use_check_result: passed`, a designated controlled system, controlled ID/version/receipt, and every `checks` value `passed`, including `decision_disposition_is_accept_design_only`, `state_event_ledger_snapshot_current_complete_ordered_unforked`, `authoritative_system_cursor_atomic_match_at_action`, and `no_effective_revocation_or_supersession_event`. The checkpoint and use-check must each be no more than 300 seconds old, and the authority system must atomically compare-and-consume the signed cursor before the draft begins; any cursor or head change denies and restarts the checkpoint/use-check sequence. The use-check's signature-requirement ID set/counts must exactly equal the policy's requirements, and every typed signature must bind the matching use-check, disposition, and subject digests and authenticate an authorized independent checker under a hash-bound authority basis, current permitted algorithm, current unrevoked key/trust root, and passed verification profile. The use-check signer must satisfy the policy independence rule. No use-check is valid when the disposition names no next artifact. Stale, state-event-invalidated, checkpoint-incomplete, forked, mutable, mismatched, unsigned, self-verified, or unissued checks deny use.

If any rule fails, the record remains `not-issued` or is rejected as invalid; the design remains `proposed/not-for-use`.

## Explicit non-authority

Even a validly issued `accept-design-only` record would not:

- mint or release Track A;
- create, reveal, author, materialize, annotate, review, seal, release, or run Track B;
- appoint a fixture owner, author, reviewer, approver, operator, or evaluator;
- authorize a fixture-work packet, task grant, file write, process, tool, model, browser, account, connector, network route, persistence, or telemetry;
- bind or approve architecture `r2`;
- authorize implementation planning, scaffolding, dependencies, build, candidate verification, operational testing, B0, B1, practitioner research, publication, or release; or
- certify security, privacy, accessibility, localization, rights, legality, product quality, or user outcomes.

The next artifact remains prohibited until an issued design disposition explicitly names and permits that exact proposed/not-issued artifact. Any later fixture-work authorization remains a separate decision and still does not approve the resulting fixture or grant execution capability.

## Current closure

```text
subject_digest_match_for_template: confirmed-at-template-preparation
decision_status: not-decided
issuance_status: not-issued
validation_status: not-run
authority_effect: none
next_permitted_artifact: none
```

This template closes only the missing record-shape gap. It closes no research, governance, fixture, architecture, implementation, or execution gate.
