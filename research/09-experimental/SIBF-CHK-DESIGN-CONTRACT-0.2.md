---
title: "SIBF checkout fixture successor design contract 0.2"
status: proposed
created: 2026-08-18
updated: 2026-08-18
execution_status: not-for-use
document_id: SIBF-CHK-DESIGN-CONTRACT-0.2
contract_revision: "0.2.1"
release_family_id: SIBF-CHK-FAMILY-0.2
authority_class: design-proposal-only
canonical_claim_label: proposal
track_a_fixture_id: SIBF-CHK-001
track_a_release_id: SIBF-CHK-001-DEV-0.2.0
track_a_role: public-development-calibration-control-only
track_a_private_holdout_eligibility: never
track_a_b1_comparator_eligibility: never
track_b_fixture_id: SIBF-CHK-002
track_b_release_id: not-established
track_b_role: future-sealed-evaluation
track_b_b1_eligibility: blocked-until-all-gates-pass
license_status: unresolved-before-any-release-or-b1-use
scope: "Proposed dual-track successor family for the synthetic checkout-recovery benchmark fixture"
source_documents:
  - ../00-method/research-protocol.md
  - ../05-technology/security-privacy-and-trust-boundaries.md
  - ../06-evaluation/evaluation-and-benchmarks.md
  - ../08-synthesis/candidate-system-model.md
  - shared-benchmark-fixture-specification.md
  - materials-and-access-register.md
  - product-desktop-study-protocol.md
  - product-study-and-judge-agent-system.md
  - CDM-V0-ARCH-DECISION-r2.md
  - SIBF-CHK-001-static-verification-2026-08-18.md
  - fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/README.md
  - fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/manifest.draft.json
  - fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/evaluator-open-development/denominator-ledger.json
  - fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/evaluator-open-development/expression-denominator-falsification-and-remap.json
  - fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/operator-design-open/README.md
  - fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/evaluator-open-development/README.md
  - v0-architecture-and-build-decision-packet.md
---

# SIBF checkout fixture successor design contract 0.2

## Result and authority boundary

**[Proposal]** Adopt a dual-track `design-0.2` release family that preserves the verified public checkout pressure test as a development asset and requires any evaluation holdout to be a separately authored fixture under a new fixture ID.

Current disposition: `proposed` and `not-for-use`. This document is a design contract only. It creates no fixture package, gold, private holdout, signed manifest, license, approval, implementation plan, executable, benchmark result, owner assignment, or gate closure. The approved act represented by this file is limited to drafting this proposal; it is not approval of the proposed design, either track, any count as canonical, or any later operation.

Current proposal revision `0.2.1` repairs review-discovered current-contract inconsistencies in the original `0.2` draft. It remains within the `design-0.2` release family and has no approval effect. Any disposition must bind this exact revision and digest rather than the earlier draft bytes.

Nothing in this document authorizes a runnable harness, product study, practitioner study, outreach, recruitment, participant interaction, account or workspace creation, purchase, install, connector, token, credential, browser or desktop operation, external model call, network access, capture, persistence, mutation, publication, redistribution, release, or B1 run. Every such action remains separately gated by its applicable protocol, accountable owner, evidence, control record, exact task grant, and action-time authorization.

## Canonical claim records

The `canonical_claim_label` values below use the repository vocabulary in the [research protocol](../00-method/research-protocol.md#canonical-claim-and-source-vocabulary). Source type, authorship, implementation, approval, release, and evaluation state are separate fields; none is inferred from Markdown typography.

| claim_id | canonical_claim_label | proposition | evidence or decision state |
| --- | --- | --- | --- |
| `SIBF-02-CF-01` | `sourced_fact` | The current open-development snapshot contains 90 candidates, 61 user-facing occurrences comprising 57 static and 4 runtime-only/unresolvable-static occurrences, 29 exclusions, 56 normalized expression slots, 56 current expression versions, and 22 semantic messages. | Supported by the [open-development README](fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/README.md#what-is-represented), [denominator ledger](fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/evaluator-open-development/denominator-ledger.json), occurrence annotations, expression-message links, and the external [static verification record](SIBF-CHK-001-static-verification-2026-08-18.md). This is verified static open-development evidence, not qualified review, release, or approval. |
| `SIBF-02-CF-02` | `sourced_fact` | The historical 34-expression target is falsified because it merged identity dimensions that the normalized full tuple keeps separate. | Supported by the [denominator falsification record](fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/evaluator-open-development/expression-denominator-falsification-and-remap.json). |
| `SIBF-02-CF-03` | `sourced_fact` | The current operator and evaluator development records are exposed, unreviewed, unsigned, license-unresolved, non-executable, and permanently ineligible as private holdout material. | Supported by the [fixture status boundary](fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/README.md), [operator role](fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/operator-design-open/README.md#operator-boundary), and [evaluator role](fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/evaluator-open-development/README.md). |
| `SIBF-02-CF-04` | `sourced_fact` | Architecture predecessor `r1` is revision-required; current successor `r2` remains an L0 proposal with no approved Track B binding and no planning or build authority. | Supported by the [r1 disposition](v0-architecture-and-build-decision-packet.md#decision-requested) and [current r2 authority boundary](CDM-V0-ARCH-DECISION-r2.md#authority-and-disposition). |
| `SIBF-02-CP-01` | `proposal` | Freeze the verified open-development evidence into Track A and require a distinct, sealed Track B under `SIBF-CHK-002`; do not promote or reseal the exposed material. | Proposed by this contract; not approved or implemented. |
| `SIBF-02-CP-02` | `proposal` | Recompute every Track B denominator from its authored and independently reviewed content; no Track A count, including 56, is a Track B quota. | Proposed by this contract; future values remain `not-established`. |
| `SIBF-02-OQ-01` | `open_question` | Which accountable repository owner, fixture owner, evaluation owner, rights reviewer, and specialist reviewers may approve the future packages and their exact scopes? | No identities, assignments, or authority evidence are established here. |
| `SIBF-02-OQ-02` | `open_question` | Which compatible licenses and notices apply separately to source, synthetic content/data, annotations/gold, translations, rendered references, and any later code? | `license_status: unresolved-before-any-release-or-b1-use`. |

## Binding design outcome if separately approved

The proposed family contains two non-interchangeable tracks. A version change cannot convert one into the other.

| Contract dimension | Track A — public development | Track B — sealed evaluation |
| --- | --- | --- |
| Fixture ID | `SIBF-CHK-001` | `SIBF-CHK-002` |
| Intended first release | `SIBF-CHK-001-DEV-0.2.0` | `not-established`; mint only after authorship and denominator gates pass |
| Lineage | Direct successor snapshot of `SIBF-CHK-001/design-0.1-open-development` | New sibling in `SIBF-CHK-FAMILY-0.2`; never a revision or hidden copy of Track A |
| Content role | Public development, parser calibration, regression, falsification, and static control | Withheld operator fixture plus private evaluator gold for future scored evaluation |
| Fixed evidence | 90 candidates; 61 occurrences = 57 static + 4 runtime-only; 29 exclusions; 56 expression slots; 56 expression versions; 22 semantic messages | Every count is `not-established` until separately enumerated, normalized, reviewed, and sealed |
| Exposure | Operator and evaluator-development labels are public/open | Operator package withheld until an authorized run; evaluator/gold withheld from operators, products, development tooling, and model context |
| Holdout status | Permanently `never` | Candidate only after seal, leakage audit, access test, and all entry gates pass |
| B1 role | Permanently not a B1 comparator; development/control results are noncomparative | The only member of this family that may later become B1-eligible |
| Approval state | Proposed release contract; no release artifact exists | Not authored, not reviewed, not sealed, not approved, not B1-ready |

For Track A, `control` means a public development control for parser, schema, normalization, and regression work. It does not mean a product-comparison condition, hidden test, B1 comparator, or substitute for a base-host condition.

For Track B, B1 eligibility is a possible future state, not an entitlement. It requires both the current [desktop B1 gate](product-desktop-study-protocol.md#batch-b1-entry-gate) and the current [fixture entry criterion](shared-benchmark-fixture-specification.md#batch-b1-fixture-entry-criteria). Both now derive tasks, counts, roles, locale/channel scope, gold, and evaluator requirements from one exact approved Track B release and its signed manifest; neither permits a Track A count or legacy packet to become a Track B quota.

## Lineage, identity, and versioning contract

### Stable identifiers

| Object | Required pattern or value | Rule |
| --- | --- | --- |
| Design contract | `SIBF-CHK-DESIGN-CONTRACT-0.2` | Identifies this proposal, not a fixture release. |
| Release family | `SIBF-CHK-FAMILY-0.2` | Groups tracks for governance and reporting only; it does not merge their data or exposure states. |
| Track A fixture | `SIBF-CHK-001` | Retains the public fixture lineage. |
| Track A release | `SIBF-CHK-001-DEV-0.2.0` | May be minted only from the exact verified snapshot after hashes, rights, and review state are recorded. |
| Track B fixture | `SIBF-CHK-002` | New ID required because holdout identity cannot be created by hiding or renaming public material. |
| Track B release | `SIBF-CHK-002-EVAL-<semver>` | Mint only after content freeze; `<semver>` is a placeholder, not an assigned version. |
| Package | `PKG-<fixture-id>-<role>-<version>` | `role` is one of `operator`, `evaluator`, `rendered-reference`, or `provenance`. |
| Manifest | `MANIFEST-<fixture-id>-<role>-<version>` | One immutable manifest per package version. |
| Annotation set | `ANN-<fixture-id>-<version>` | Original labels, adjudication, and disagreement remain versioned and linked. |
| Denominator ledger | `DENOM-<fixture-id>-<version>` | Carries independently verified units, counts, formulas, and exclusions. |

`<fixture-id>`, `<role>`, `<semver>`, and `<version>` are literal placeholders. A parser or operator must reject them as unresolved rather than minting an identifier automatically. Where a pattern defines allowed substitutions, the resolved value must also pass that pattern's fixture and role constraints.

### Lineage rules

1. Track A's lineage record must point to the exact open-development source paths, source hashes, denominator falsification record, and freeze event. Freezing does not upgrade `unreviewed`, `unsigned`, `license-unresolved`, or `not-run` evidence.
2. Track A preserves the public labels and their development history. It must not redact history, reset exposure status, call provisional labels gold, or claim that its 56 denominator is universally canonical.
3. Track B must have a new root, new fixture ID, new artifact IDs, new candidate/occurrence/expression/message IDs, new synthetic entities and values, new provenance records, and new manifests.
4. Track B may reuse abstract schema names, record-family distinctions, task shapes, and hard-safety dimensions. It may not copy or lightly paraphrase Track A strings, source artifacts, annotations, message inventory, answer ranges, trap placements, source coordinates, or gold rationales.
5. Track B authorship, annotation, specialist review, rights review, adjudication, and seal events must be recorded as distinct contributions. Authors may not self-attest independent review.
6. Any Track B contributor's prior access to Track A or Track B material must be declared. Public Track A exposure cannot be undone; contamination is handled through disclosure, independent review, difference testing, and, when material, replacement—not a claim of ignorance.
7. Cross-track comparisons must name the exact track and release. A report must not aggregate or average Track A development results with Track B holdout results.

### Version-change rules

| Change | Required version action | Evaluation consequence |
| --- | --- | --- |
| Metadata correction with no payload, identity, coordinate, annotation, rubric, task, or count effect | New package patch version and manifest/hash | Existing results may remain comparable only after a written no-effect review. |
| Candidate, occurrence, expression, message, state, trap, task, answer range, rubric, or denominator change | New fixture minor or major release plus annotation and denominator versions | Pre-change and post-change results are separate; rerun policy required. |
| Gold correction after seal | Never edit in place; issue a new evaluator/annotation version and incident/rerun decision | Affected results remain `invalid` or version-bounded until dispositioned. |
| Confirmed Track B operator or gold leakage before or during use | Retire the compromised release from holdout use | Material leakage requires newly authored replacement material; renaming or rehashing is insufficient. |
| Public release of Track B operator content or gold | Permanently convert that exposed release to development-only | It can never regain private-holdout or B1-comparator eligibility. |

## Artifact and field contracts

### Required package families

| Package | Minimum contents | Track A exposure | Track B exposure |
| --- | --- | --- | --- |
| Operator | Synthetic source artifacts, behavior/unknown packet, task packets, fixed clock/seed, run boundary, allowed roots, and unsupported-operation declarations | Public development | Withheld until an exact authorized run; never contains gold |
| Evaluator | Operator manifest reference, gold inventory, conflicts/unknowns, probes, rubric, answer ranges, original annotations, adjudication, and denominator ledger | Public evaluator-development only | Private, access-controlled, and unavailable to operators/products |
| Rendered reference | Exact build/profile, routes/states, viewport, locale, accessibility method, clock/seed, source hashes, and capture limitations | Public only after rights/release decision | Withheld with evaluation material unless a run plan explicitly permits a bounded operator subset |
| Provenance and rights | Authorship/origin, transformation history, synthetic-data register, third-party exclusion, contributor permissions, licenses/notices, access classification, and content hashes | Public after release approval | Access-separated; publish only through a separate post-study release decision |

### Manifest fields

Every package manifest must carry these explicit fields. Absence is an error; `null` is permitted only where the field contract below allows `not-established`.

| Field group | Required fields | Validation rule |
| --- | --- | --- |
| Identity | `schema_version`, `manifest_id`, `release_family_id`, `track_id`, `fixture_id`, `fixture_release`, `package_id`, `package_role` | IDs and roles match the enrolled root and do not collide across tracks. |
| Lineage | `parent_refs`, `source_hashes`, `creation_event_id`, `transformation_history`, `supersedes`, `exposure_history` | No hidden parent, copied payload, or rewritten exposure history. |
| Status | `design_status`, `review_status`, `approval_status`, `execution_status`, `release_status`, `holdout_status`, `b1_eligibility` | States remain separate; no status is inferred from another. |
| Counts | `candidate_count`, `occurrence_count`, `static_occurrence_count`, `runtime_only_occurrence_count`, `exclusion_count`, `expression_slot_count`, `expression_version_count`, `semantic_message_count` | Values resolve to the signed denominator ledger for that release. |
| Content | `artifact_path`, `artifact_id`, `source_class`, `content_hash`, `media_type`, `size_bytes`, `coordinate_profile` | Path stays inside the enrolled root; hash and coordinate resolve exactly. |
| Provenance | `creator_role_id`, `contributor_role_ids`, `created_at`, `source_type`, `origin_class`, `third_party_status`, `synthetic_data_refs` | Role references do not appoint people or prove permission. |
| Rights | `license_status`, `license_ref`, `notice_refs`, `contributor_permission_refs`, `redistribution_status`, `terms_review_status` | Any unresolved or incompatible right blocks release and B1. |
| Review | `reviewer_role_ids`, `independent_annotation_refs`, `specialist_review_refs`, `adjudication_ref`, `disagreement_ref`, `reviewed_at` | Required roles and independence are evidenced, not self-declared. |
| Exposure and security | `classification`, `allowed_role_ids`, `access_log_ref`, `leakage_audit_ref`, `prohibited_egress`, `canary_profile_ref` | Track B gold is denied to operator/product/development roles; real secrets are forbidden. |
| Integrity | `canonical_serialization_profile`, `digest_algorithm`, `manifest_hash`, `package_hash`, `signature_algorithm`, `signer_identity_ref`, `signer_trust_root_ref`, `signed_scope`, `signature_created_at`, `trusted_timestamp_ref`, `signature_ref`, `verification_policy_ref`, `signature_status`, `verified_at`, `expires_at`, `revocation_status`, `revocation_checked_at`, `revocation_route`, `referential_integrity_status`, `count_verification_status` | Canonical bytes, signed field scope, signer/trust root, timestamp, verification, expiry, and revocation are explicit. Missing, stale, mismatched, expired, revoked, ambiguously serialized, or unsigned required evidence fails closed. |
| Lifecycle | `effective_at`, `expires_at`, `revocation_ref`, `correction_policy_ref`, `rerun_policy_ref`, `retirement_status` | Any change trigger has an explicit disposition; no silent in-place repair. |
| Authority | `decision_record_refs`, `task_grant_ref`, `mutation_approval_ref`, `release_approval_ref` | A value may be `null`; no record substitutes for another or authorizes an unlisted action. |

### Relationship records

Each occurrence relationship must preserve these separate identifiers:

`candidate_id -> occurrence_id -> expression_slot_id -> expression_version_id -> semantic_message_id`

The relationship record must also carry `source_coordinate`, `source_hash`, `disposition`, `runtime_resolvability`, `evidence_refs`, `decision_state`, `delivery_state`, `communication_attempt_id`, independent eligibility/suppression-control references, repeatable dispatch/provider/client-event references, optional recipient-engagement-event references, event timestamps, provenance and limitations, `evaluation_record_refs`, and any applicable owner/approval references. Communication controls and repeatable events must not be collapsed into one linear attempt status or into product delivery. A literal, file location, timestamp, implementation frequency, provider event, recipient engagement, or observed-live state never proves semantic identity, comprehension, outcome, or approval.

## Semantic identity normalization

The ordered Track A expression-slot key is the verified open-development full tuple:

```yaml
expression_slot_key:
  - semantic_message_id
  - requested_locale
  - requested_language
  - requested_script
  - requested_direction
  - resolved_content_locale
  - content_language
  - content_script
  - content_direction
  - fallback_status
  - channel
  - modality
  - semantic_surface_id
  - component_pattern_id
  - slot
  - state_event_id
  - runtime_condition_id
  - variant_id
  - experiment_arm_id
  - feature_flag_id
  - jurisdiction_scope
  - applicability_scope
expression_version_additional_key:
  - expression_payload_kind
  - expression_payload
  - structure_signature
```

Normalization rules:

1. Literal text alone is never identity.
2. The source container is occurrence provenance, not expression identity.
3. Requested locale and resolved content locale are independent.
4. Channel, modality, semantic surface, component, slot, state/event, runtime condition, variant, experiment arm, feature flag, jurisdiction, and applicability are atomic identity dimensions.
5. One slot can have successive expression versions; a version changes when payload kind, payload, or structure signature changes.
6. One semantic message may have multiple expressions, and identical literals may belong to different semantic messages.
7. `runtime-only/unresolvable-static` is an occurrence property, not permission to execute or infer the value.
8. Track B must apply the same normalization procedure to its independently authored material, then retain every unique tuple. It must not target, truncate, pad, merge, or split records to equal 56.

## Denominator contracts

### Track A frozen development evidence

| Unit | Count | Contract state |
| --- | ---: | --- |
| Annotated candidates | 90 | Verified open-development evidence; proposed for exact snapshot freeze |
| User-facing occurrences | 61 | Verified open-development evidence |
| Static occurrences | 57 | Verified open-development evidence |
| Runtime-only/unresolvable-static occurrences | 4 | Verified open-development evidence; no runtime authorization |
| Exclusions | 29 | Verified open-development evidence |
| Normalized expression slots | 56 | Verified open-development evidence; not canonical approval |
| Current expression versions | 56 | Verified open-development evidence; not a Track B target |
| Semantic messages | 22 | Verified open-development evidence |

The Track A release gate must reproduce these counts and every relationship from the exact source snapshot. A mismatch blocks the proposed freeze; it does not authorize adjusting source data or denominator labels.

### Track B independent denominator

All Track B counts begin as `not-established`. The authoring plan must not declare target totals copied from Track A. After operator content freezes, two independent annotators enumerate candidate dispositions and occurrences, normalize expression slots and versions with the full tuple, map semantic messages, reconcile disagreements through a separate adjudicator, and produce a signed denominator ledger. Specialist review follows for checkout behavior, accessibility, security/privacy, `fr-CA`, and `ar-EG` wherever those scopes are retained.

The ledger must report at least:

- candidate count and disposition partition;
- user-facing occurrence count, split into static and runtime-only/unresolvable-static;
- exclusion count by source class and reason;
- unique expression-slot and expression-version counts;
- semantic-message count and many-to-many relationship counts;
- counts by state, channel, locale, modality, surface, severity, and trap family;
- conflicts, unknowns, accessibility defects, critical probes, security probes, and mutation probes;
- annotation agreement, disagreement, adjudication, unsupported units, and limitations; and
- machine-recomputed counts, manifest-declared counts, and equality results.

Missing outputs remain in their applicable denominator. Unsupported product capability is a run result, not a reason to remove a fixture unit after scoring begins. Thresholds and denominator formulas must be frozen before product results are visible.

## Track B authoring, difference, and exposure controls

### Originality and material difference

Track B passes the material-difference gate only when independent reviewers establish all of the following:

- every synthetic product entity, value set, artifact payload, source coordinate, candidate ID, occurrence ID, expression ID, message ID, and trap instance is newly authored;
- no Track A user-facing expression, annotation, answer range, rationale, source artifact, rendered reference, or trap placement is copied or lightly paraphrased;
- the state graph, cross-channel dependencies, evidence conflicts, lifecycle traps, accessibility/localization defects, and adversarial placements create meaningfully different inference paths;
- any shared term is limited to necessary domain or schema vocabulary and is documented in a similarity-exception record;
- an automated similarity report and independent semantic review both complete before seal, with thresholds and reviewers fixed before results are inspected; and
- failing or ambiguous material is replaced and re-reviewed rather than waived by the author.

The contract does not prescribe a Track B count or a one-to-one replacement for Track A cases. Difference is assessed on content, relationships, reasoning paths, and trap mechanisms—not filename churn or synonym substitution.

### Separation of duties

| Role class | Permitted Track B material | Prohibited combination or action |
| --- | --- | --- |
| Operator-material author | Authoring brief and controlled operator source | Cannot approve own originality, rights, denominator, gold, or seal. |
| Independent annotator | Frozen operator source without another annotator's labels | Cannot see prior labels before lock or self-adjudicate disagreement. |
| Specialist reviewer | Minimum material needed for declared expertise | Cannot convert test-material review into production approval or universal compliance. |
| Adjudicator | Locked original labels and evidence after independent submission | Cannot erase original disagreement or invent missing authority. |
| Evaluation custodian | Evaluator/gold packages and access records | Cannot operate a scored product condition or expose gold to it. |
| Benchmark operator | Authorized operator package and exact task only | Cannot access evaluator/gold, expand scope, or alter fixture material. |
| Repository/release owner | Decision packet, rights evidence, manifests, and release candidate | Cannot substitute file custody or authorship for specialist or evaluation approval. |

Role strings are capacity classes, not assignments. Actual identities, authority bases, conflicts, scopes, effective periods, and decisions remain `not-established` until recorded in an approved system.

### Exposure controls

1. Track A is classified `public-development`; its evaluator labels are assumed known to products and model providers.
2. Track B operator, evaluator, provenance, and rendered-reference roots must be physically or logically separate from Track A and from ordinary development roots.
3. Before an authorized scored run, only approved authoring, review, and custody roles receive least-privilege access. Access is logged, time-bounded, revocable, and reviewed.
4. Products, benchmark operators, development prompts, retrieval indexes, shared model context, public issues, logs, screenshots, and reports receive no Track B evaluator/gold content.
5. During a scored run, the product receives only the exact versioned Track B operator package and task packet. Any retained copy or model-memory path must be expressly approved or the run stops.
6. Canary values must be fictional and nonfunctional. A canary hit records possible leakage without revealing a real secret.
7. A leakage audit occurs before seal, before each run, after each run, and before any report release. Unresolved leakage blocks or invalidates the affected release.

## Licensing and provenance contract

Both tracks must be independently traceable even when their licensing outcomes differ.

1. Each artifact records creator/contributor role, creation date, origin class, transformation history, source class, content hash, and review state.
2. The synthetic-data register proves that names, contacts, identifiers, amounts, credentials, URLs, and endpoints are fictional, nonfunctional, and drawn from reserved or fixture-controlled ranges.
3. The third-party exclusion register covers vendor strings, repositories, schemas, documentation, screenshots, logos, trade dress, icons, fonts, brand assets, customer or participant data, real secrets, and production endpoints.
4. Separate rights records are required for fixture source, synthetic content/data, annotations/gold, translations, rendered references/media, and any later executable code.
5. `fr-CA`, `ar-EG`, accessibility, and media contributors require explicit contribution terms, data-handling scope, and permission before separately authorized contribution begins; redistribution permission must also be established before their work enters a releasable package.
6. External standards may be cited as design evidence but are not copied into the fixture or treated as automatically applicable policy.
7. An accountable owner must choose exact compatible licenses and notices. This proposal grants no license.
8. `unresolved`, missing, incompatible, or unreviewed rights keep the affected release private, unscored, unreleased, and B1-blocked.

## Validation and release gates

Every gate defaults to `not-run`. A later gate cannot cure or imply an earlier gate.

| Gate | Required evidence | Failure disposition |
| --- | --- | --- |
| `G00-design-integrity` | Parser-clean frontmatter; unique IDs; valid internal links/anchors; complete tables/fences; no unresolved placeholder treated as a value; canonical claim labels valid | Keep contract `proposed/not-for-use`; correct through a new document revision. |
| `G01-track-a-snapshot` | Exact source hashes; 90/61/57/4/29/56/56/22 count reproduction; all links resolve; exposure history preserved | Do not mint `SIBF-CHK-001-DEV-0.2.0`. |
| `G02-track-a-rights-review` | Authorship, rights, notices, contributor permissions, review states, and release decision | Keep Track A local/open-development under its current status; no formal release. |
| `G03-track-b-authorship` | New root/IDs/content; contributor access declarations; original provenance; third-party exclusion; material-difference review | Replace affected material or restart under a new authoring candidate; no seal. |
| `G04-track-b-normalization` | Independent annotations; full-tuple normalization; machine/human count agreement; referential integrity; denominator ledger | Keep counts `not-established`; no evaluator candidate. |
| `G05-track-b-gold-review` | Independent labels, specialist reviews, original disagreement, adjudication, rubric and answer ranges, hard probes, rerun policy | No seal or scoring. |
| `G06-render-locale-accessibility` | Exact build/profile evidence; supported static/rendered boundary; qualified accessibility and locale review as test material | Mark unsupported dimensions and keep B1 blocked. |
| `G07-security-privacy-rights` | Inert adversarial fixtures; no real secret/PII/external target; data classification; access controls; licenses/permissions; leakage tests | Stop, quarantine affected material, and keep release blocked. |
| `G08-seal-and-package` | Immutable packages; exact manifests/hashes/signatures under the subordinate integrity contract; operator/evaluator separation test; access log; correction policy | No sealed package. |
| `G08b-exact-release-decision` | Exact sealed-package digest; release candidate dossier; rights/review/security evidence; authenticated release decision, scope, conditions, effective period, expiry/review trigger, revocation route, delivery/readback, and separate publication capability if any | Keep the package sealed but unapproved and unreleased; no architecture binding or B1 eligibility. |
| `G09-reset-and-reproducibility` | Fixed clock/seed/state; two clean resets; canonical start hashes; no residual, credential, gold, cache, connector, or model memory | No B1 entry. |
| `G10-b1-contract-alignment` | Exact current desktop-B1 and fixture-entry contract IDs/versions/digests; task/rubric versions derived from the approved Track B manifest; comparable-condition plan; proof that no legacy Track A count or packet entered the binding | `b1_eligibility: blocked`. |
| `G11-run-authorization` | Current applicable P0 results, exact task/runtime grants, connection/data/memory/telemetry dispositions, limits, capture/redaction, stop and cleanup owners | No execution, account, credential, model, product, or persistence action. |

Passing `G00` validates only document structure. Passing `G01`–`G02` may support a public development release only after a separate release decision. Passing `G03`–`G08` produces at most a sealed Track B candidate; only `G08b` may approve the exact release, and that release still requires `G09`–`G10` before it can become B1-eligible. None runs B1. Only a separate `G11` record for an exact operation can authorize that operation.

## Release-state model

| State | Meaning | Entry evidence | Permitted claim |
| --- | --- | --- | --- |
| `design-proposed-not-for-use` | This document exists as a proposal | Document integrity only | A dual-track design has been proposed. |
| `track-a-source-verified-open` | Existing snapshot counts and relationships reproduce | `G01` pass | Verified public development evidence exists. |
| `track-a-release-candidate` | Snapshot, manifests, rights, and review packet assembled | `G01` and `G02` pass; separate decision pending | Candidate public development release exists. |
| `track-a-public-development-released` | Exact Track A package released through approved route | Separate release approval and delivery evidence | Public development/calibration/control release exists; never holdout/B1 comparator. |
| `track-b-private-authoring` | New operator material is being created in isolation | Authorized authoring plan outside this document | No quality, gold, holdout, or B1 claim. |
| `track-b-review-candidate` | Content frozen; normalization and independent reviews complete | `G03`–`G07` pass | Candidate evaluator package exists; not sealed or B1-ready. |
| `track-b-sealed` | Immutable separated packages and access controls verified | `G08` pass | Sealed evaluation fixture exists; no run or result claim. |
| `track-b-release-candidate` | Exact sealed package and release dossier are frozen for a separate decision | `G08` pass; `G08b` decision pending | Release candidate exists; it is not approved, B1-eligible, or architecture-bindable. |
| `track-b-release-approved` | An authenticated exact release decision accepts the sealed package for the stated internal evaluation role | `G08b` pass plus delivery/readback evidence | Approved Track B release exists and may be presented for exact architecture binding; it is not automatically B1-eligible or run-authorized. |
| `track-b-b1-eligible` | The exact approved release also passes fixture, reset, protocol-alignment, and comparable-access prerequisites | `track-b-release-approved`; `G09` and `G10` pass plus applicable external gate records | Fixture may be considered in a separately authorized B1 run. |
| `track-b-run-authorized` | One exact run has current controls and task grant | `G11` pass for that operation | Only the named run may proceed within its exact boundary. |
| `retired-development-only` | Exposure, defect, scope change, or expiry removes holdout eligibility | Retirement/incident record and manifest update | Release may be retained for disclosed development use only. |

Approval, implementation, delivery, observed-live state, evaluation result, and release remain independent. A `sealed` package is not `release-approved`, `B1-eligible`, `architecture-bindable`, `run-authorized`, or `validated` by implication; an approved release still grants no task capability.

## Failure and stop conditions

Stop the affected work, preserve evidence, and keep or return the release to `blocked`, `invalid`, or `retired-development-only` when any of these occurs:

- an ID collision, unresolved cross-reference, missing artifact, count mismatch, normalization ambiguity, stale hash, signature failure, path escape, or undeclared version difference;
- Track A material is called private gold, used as a B1 comparator, or represented as canonical approval;
- Track B reuses or lightly transforms Track A content, labels, traps, answer ranges, rationales, coordinates, or IDs;
- authorship, access history, independent review, disagreement, provenance, rights, or contributor permission is missing or contradicted;
- Track B operator or gold appears in an unauthorized root, prompt, retrieval index, product context, model memory, log, screenshot, report, or recipient;
- a real person, customer, credential, secret, payment instrument, vendor asset, production endpoint, executable payload, unsafe archive, or live external target appears;
- an unresolved behavior, legal applicability, owner, approver, approval, support promise, locale judgment, accessibility result, implementation, release, or outcome is inferred;
- an author, annotator, reviewer, adjudicator, custodian, operator, or owner exceeds the separately evidenced role boundary;
- a required license, notice, specialist review, security/privacy review, reset, leakage audit, cleanup record, or gate is missing, expired, revoked, or failed;
- fixture or gold content changes after seal without a new version and rerun disposition; or
- any process attempts an unauthorized harness run, product study, outreach, account, credential, network/model call, capture, persistence, mutation, publication, or release.

A stop does not authorize cleanup outside exact approved targets, deletion of evidence, silent correction, narrower relabeling, or continuation as a lower-quality comparative run. Investigation and disposition require their own owners and records.

## Exact non-authority statements

This design contract:

- does not make the 56-slot Track A denominator canonical beyond the exact open-development snapshot;
- does not establish any Track B denominator, content, message set, author, reviewer, owner, approver, license, package, gold, seal, or release;
- does not approve `SIBF-CHK-001-DEV-0.2.0`, create `SIBF-CHK-002`, or supersede the current fixture specification, materials register, desktop protocol, security controls, or architecture packet;
- does not repair or approve revision-required `r1`, bind or approve current L0 proposal `r2`, or authorize an implementation plan;
- does not authorize use of Track A as a private holdout, a B1 comparator, or evidence of product quality;
- does not authorize use of Track B before every applicable gate and exact operation record passes;
- does not appoint a repository owner, fixture owner, evaluation owner, reviewer, annotator, adjudicator, data steward, release owner, security/privacy owner, or rights reviewer;
- does not grant semantic approval, mutation approval, publication approval, release approval, capability, access, consent, processing permission, or legal applicability; and
- does not prove production behavior, user comprehension, accessibility conformance, linguistic/cultural quality, legal or regulatory compliance, security, privacy, product superiority, or real-world outcome.

The next valid step is a separate review decision on this proposal. If it is returned for revision or rejected, no track advances. If it is approved as a design, the approval must still name exact scope, authenticated decision capacities, authority bases, conditions, effective period, revocation/change triggers, and the next permitted artifact. Design approval alone may authorize only the separately named design artifact—not fixture authoring, materialization, execution, study operation, or release.
