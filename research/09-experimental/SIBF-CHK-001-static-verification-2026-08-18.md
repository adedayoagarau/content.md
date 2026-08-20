---
title: "SIBF-CHK-001 open-development static verification"
status: working-note
created: 2026-08-18
updated: 2026-08-18
record_id: SIBF-CHK-001-STATIC-VERIFY-2026-08-18-01
verification_disposition: pass-static-relational-and-safety-only
authority_effect: none
subject_fixture_id: SIBF-CHK-001
subject_design_revision: design-0.1-open-development
subject_tree_fingerprint_algorithm: fixture-relative-sha256-ledger-v1
subject_tree_fingerprint: fd3e5f3139d6338b0f39202070edb747840f7d1305d0ef5cab2c11db28889c00
subject_file_count: 31
evidence_cutoff: 2026-08-18
scope: "Read-only static file, count, identity, reference, status, and safety verification of the exact public open-development fixture bytes"
source_documents:
  - fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/README.md
  - fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/status.json
  - fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/manifest.draft.json
  - fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/evaluator-open-development/denominator-ledger.json
  - fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/evaluator-open-development/provisional-occurrence-annotations.jsonl
  - fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/evaluator-open-development/expression-message-links.jsonl
  - fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/evaluator-open-development/expression-denominator-falsification-and-remap.json
---

# SIBF-CHK-001 open-development static verification

## Result and boundary

**[Research finding]** Two read-only implementations independently reproduced the current fixture's static counts and relationship invariants. The more complete verifier evaluated 1,512 assertions with zero failures; a separate implementation independently reproduced the principal denominators, full identity joins, file inventory, reference coverage, and tree fingerprint.

This is a static research verification record only. It does not edit the fixture's deliberately null result fields, convert provisional labels to gold, complete a qualified review, resolve rights, sign or release a package, create a private holdout, establish B1 eligibility, validate runtime behavior, or authorize any operation. The fixture remains public-development-only, non-executable, noncanonical, unsigned, unreviewed, license-unresolved, never holdout-eligible, and `not_run`.

## Exact subject binding

| Field | Verified value |
| --- | --- |
| Fixture root | `research/09-experimental/fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development` |
| Fixture ID | `SIBF-CHK-001` |
| Design revision | `design-0.1-open-development` |
| Regular files | `31` |
| Fingerprint algorithm | `fixture-relative-sha256-ledger-v1` |
| Fingerprint | `fd3e5f3139d6338b0f39202070edb747840f7d1305d0ef5cab2c11db28889c00` |
| Verification time | `2026-08-18T10:10:53-07:00` |

The fingerprint preimage is exactly 31 UTF-8 lines sorted by fixture-relative POSIX path. Each line is:

```text
<64-lowercase-hex file SHA-256><two ASCII spaces><relative path><LF>
```

The concatenated preimage is 3,697 bytes. SHA-256 is then taken over those exact bytes. The fingerprint is audit-only: the draft manifest still has `manifest_hash: null`, and this record is neither a manifest signature nor a release signature.

## Methods

| Method record | Read-only procedure | Scope | Result |
| --- | --- | --- | --- |
| `SIBF-STATIC-VER-A` | Parsed every JSON/JSONL record; joined source, annotation, occurrence, expression, message, role, remap, behavior, conflict, accessibility, critical, security, and mutation IDs; compared full expression tuples; recomputed source-class and aggregate denominators | 1,512 assertions | `PASS`; zero failures |
| `SIBF-STATIC-VER-B` | Independently parsed the same current bytes; reproduced the principal counts, unique-ID sets, source-to-annotation paths, annotation-to-link tuples, expression/message coverage, manifest inventory, file parsing, and fingerprint | Independent selected invariant set | `PASS`; zero discrepancies |
| `SIBF-STATIC-SAFE-A` | Inspected filesystem types/modes, manifest and authorship inventories, status fields, URL literals, secret/PII signatures, adversarial flags, authority claims, result fields, and executable/runtime indicators | 31 files | `PASS` for the declared inert public-research boundary |

The methods were performed independently of the original fixture-authoring pass but are not authenticated qualified-review records. They do not satisfy the fixture's missing accountable-owner, rights-reviewer, locale-specialist, accessibility-specialist, adjudicator, release-approver, or signed-manifest requirements.

## Recomputed denominators

| Unit | Recomputed count | Relationship result |
| --- | ---: | --- |
| Source candidates | 90 | Unique; every source candidate has exactly one annotation |
| Included user-facing occurrences | 61 | 57 static plus 4 runtime-only; occurrence IDs unique |
| Exclusions | 29 | Non-user-facing and carry no occurrence/expression/message identity |
| Expression slots | 56 | Unique full identity tuples |
| Expression versions | 56 | One current version per normalized slot in this snapshot |
| Semantic messages | 22 | Every linked expression resolves to one declared message |
| Behavior facts | 10 | `BF-01`–`BF-10`; all referenced IDs resolve |
| Unknowns | 5 | `U-01`–`U-05`; deliberately unresolved |
| Conflicts | 6 | `C-01`–`C-06`; candidate/control references resolve |
| Accessibility defects | 6 | `A11Y-D01`–`A11Y-D06`; candidate/occurrence references resolve |
| Critical probes | 8 | `CRIT-01`–`CRIT-08`; references resolve |
| Security probes | 10 | `S-01`–`S-10`; reverse source mapping resolves |
| Mutation probes | 12 | `M-01`–`M-12`; every record states `authorizes_mutation: false` |
| Communication-role records | 22 | Cover all 22 messages and all 56 expression versions exactly once |

The 61 occurrences map to 56 expressions because 51 expression links contain one occurrence and five links contain two occurrences. The 34 historical expression IDs crosswalk to all 56 normalized slots/versions. This verifies that the historical 34-expression target does not represent the current full identity model.

## Source-class reproduction

| Source class | Candidates | Static | Runtime-only | Exclusions |
| --- | ---: | ---: | ---: | ---: |
| React visible children | 10 | 8 | 0 | 2 |
| Standard copy/accessibility attributes | 8 | 6 | 0 | 2 |
| Custom wrapper call sites | 10 | 8 | 0 | 2 |
| ICU locale catalogs | 20 | 18 | 0 | 2 |
| Email/SMS templates | 8 | 6 | 0 | 2 |
| API problem details | 5 | 3 | 0 | 2 |
| CMS export | 6 | 4 | 0 | 2 |
| Design-node export | 6 | 4 | 0 | 2 |
| Computed runtime-only map | 5 | 0 | 4 | 1 |
| Tests/stories/internal docs/logs/dead branches | 12 | 0 | 0 | 12 |
| **Total** | **90** | **57** | **4** | **29** |

## Identity and reference results

**[Research finding]** All current source candidates, annotations, and expression-message links reconcile under the declared full tuple. Source `expression_context.expression_payload`—or `candidate_text` when no structured source payload exists—matches the annotation payload. Annotation identity fields match the linked expression fields, including locale, resolved locale, channel, modality, surface, component/pattern, slot, state event, runtime condition, variant, experiment, feature flag, jurisdiction, applicability, fallback, payload kind, payload, and structure signature.

Every occurrence and candidate appears exactly once across link reference sets. Every communication-role record retains sender, addressee/recipient and the declared subject/affected-party/beneficiary/decision-maker/approver fields; real decision-maker and approver remain `not_established`. Fixture-only synthetic control records do not grant project authority.

One low-severity interoperability limitation remains: five links carry two-element `candidate_refs` and `occurrence_refs` arrays as independently ordered sets. Their exact pairing resolves through annotations, but consumers must not zip the arrays positionally. A future schema should declare unordered-set semantics or emit explicit candidate-occurrence pairs.

The operator and evaluator records each carry `U-01`–`U-05`. Their states agree, but their prose is intentionally paraphrased rather than byte-identical; a future normalized schema should designate one source record or enforce a drift check.

## Static safety and status results

| Check | Observed result |
| --- | --- |
| File forms | 3 Markdown, 14 JSON, 14 JSONL; every JSON/JSONL record parses |
| Filesystem boundary | 31 regular files; zero symlinks, executables, device objects, binaries, archives, package/runtime manifests, or runnable artifact types |
| External strings | Six unique URL literals, all under reserved `https://example.invalid/`; none fetched, resolved, or enrolled |
| Sensitive data scan | No common secret signature, private key, JWT, credential-like token, payment-card number, SSN, or IP address detected |
| Synthetic examples | Fixture-only reserved identifiers, one synthetic email, one synthetic phone, and inert canary fingerprints remain explicitly nonfunctional |
| Adversarial material | 17 records are explicitly synthetic, nonfunctional, inert, and unrun |
| Runtime/results | Actual-result fields remain `null`; run, calibration, annotation, adjudication, and specialist-review fields remain unrun |
| Authority | Synthetic scenario decisions/approvals/releases state `fixture_scenario_only: true`, `applies_to_real_product: false`, and `grants_project_authority: false` |
| Exposure | Public development only; private-holdout eligibility `never`; comparative score eligibility false; B1 readiness false |

The secret/PII check was a static pattern-and-format scan, not a dedicated secret-scanning product or privacy review.

## Per-file SHA-256 ledger

| Fixture-relative path | SHA-256 |
| --- | --- |
| `README.md` | `10028a37245c2837cb3c01d603460bf93aa46ab878d2b867a5a47329a9fe4c50` |
| `evaluator-open-development/README.md` | `df20484106144510f562c21bd66c018d66f029d8c6d7d22d5420f071b298c137` |
| `evaluator-open-development/accessibility-defects.json` | `8b3d395a908e4e36e4dc6df598aa08cabbc9de60414214777bcd58ff966169bb` |
| `evaluator-open-development/conflicts-and-unknowns.json` | `f6cb2175430204349c25698fbfe81a63caddc24d74ab80afe989c0c4cb1b901c` |
| `evaluator-open-development/critical-probes.json` | `b4acb5ad67c50ec4cfb345a5f64b959b699c181077bf34caeb218265c5f75701` |
| `evaluator-open-development/denominator-ledger.json` | `4b64a9b674b6c1f0878efee4e714580ac855dfb69be65bdc3e4891898c662c8e` |
| `evaluator-open-development/expression-denominator-falsification-and-remap.json` | `23e710acee83868f7cd2ec31ac91bdbf9254984fa8fdfd6b35d3f2056127d22a` |
| `evaluator-open-development/expression-message-links.jsonl` | `377bf1063a2496f84d2e7ca5ba2fd15d07331ecf7fa1f927b61cb2aab2020501` |
| `evaluator-open-development/mutation-probes.json` | `a3d330200f686729b42473dc7c14623634b48f037dbf06b1071121efc0542ed1` |
| `evaluator-open-development/provisional-occurrence-annotations.jsonl` | `3b293860d4f902730c5d1a3db8e1cfd1b739997ca9362e34ee715dd0bcce9f9a` |
| `evaluator-open-development/security-probes.json` | `a833c95765ed5cd3aad9168fa27ddc846ebc71fdb99c17be034a6b78eb8aeea5` |
| `manifest.draft.json` | `5f9eb36b5eebf146afbff55bcd0ea6f47b7ab0bf6f18ec62a06e3f3998c65184` |
| `operator-design-open/README.md` | `d3788eb9d8d27c4ae8835245b9097e9db72170bb89803c05745f5a50db22512e` |
| `operator-design-open/behavior-and-unknowns.json` | `93b72cd3228182ea7431c3042a77e3a9a86bc8f6fbdd3493031dd2bf2186994b` |
| `operator-design-open/fixture-clock-and-seed.json` | `b6594659f17e81066836fd348ff792cef91c837de29c69d9a2bb2d36f890d66d` |
| `operator-design-open/run-boundary.json` | `3d90d4c512bd8c97654a7548553c5e2b15b41e032312c85a1d49072049b7ee19` |
| `operator-design-open/source-artifacts/01-react-visible-children.jsonl` | `8e261a5253866047a902dee2d12b652b455d38aced432cf82ccd895ad8db42e7` |
| `operator-design-open/source-artifacts/02-standard-copy-and-accessibility-attributes.jsonl` | `12a50f2c9430bca9e30fafaa49d1030f5c28dd6c9f669a2f30c91cc7be3f0bb5` |
| `operator-design-open/source-artifacts/03-custom-wrapper-call-sites.jsonl` | `2cb21522d96594a078802484fcd9e4d7444dc85c0d2f89659df662efdad42527` |
| `operator-design-open/source-artifacts/04-icu-locale-catalogs.jsonl` | `b03f32234875a9f78a261f6c1b31ad0a28ec624c422ae66f34d02847479fb6c1` |
| `operator-design-open/source-artifacts/05-email-and-sms-templates.jsonl` | `cbd0f04f0467aab8e19c3e7307ce504b67effecc7992aa968450e366b913e10e` |
| `operator-design-open/source-artifacts/06-api-problem-details.jsonl` | `f79541ebe7318d1851d104b52c9b655d30fdb55f5b48f079d772d0d1f9cd2a80` |
| `operator-design-open/source-artifacts/07-cms-export.jsonl` | `88ce3548f0d6ad9789411228dce969e67657fa89518127177ffd408e415513d4` |
| `operator-design-open/source-artifacts/08-design-node-export.jsonl` | `5f8a038816d7c13edf8f9a72f189e0c2801300901152195a75a5ee0cd914791f` |
| `operator-design-open/source-artifacts/09-computed-runtime-only-map.jsonl` | `edd400cc678d5c9625b0c39502b8d35b75f36d5ec9e6f67cbef0880a294428e2` |
| `operator-design-open/source-artifacts/10-tests-stories-internal-docs-logs-dead-branches.jsonl` | `fd22dcdbcc359325d76b463a7407635851839444f6065464883321fd29d0b6a2` |
| `provenance/authorship-origin.jsonl` | `9907c44798a36f09e2157e808ece0bcc5cb903535e1bcfe3d57355afcd43d4a6` |
| `provenance/rights-and-permissions-open.json` | `d6ea37e0b7af2522c7c0cc5a40b40312abbc53b7cbdadde5525422e32996eb3c` |
| `provenance/synthetic-data-register.jsonl` | `b82bbed1aa1966a5a1953ce60a47eced3a162088441c9043acd5db855185d2dc` |
| `provenance/third-party-exclusion-register.json` | `22068125334fc8503689b5aed90eba0c3bf24463cb608490a8ceb0c354d7fd56` |
| `status.json` | `69596a8f56c9b36bb600a5ff4ee597502ae79325474afd943626f1b3b0a6e6bd` |

## Limitations and unresolved blockers

This verification does not establish:

- signed manifest or per-file signature integrity;
- a Git commit or other version-control binding;
- accountable repository, fixture, rights, review, security/privacy, locale, accessibility, or release owners;
- license compatibility, notices, redistribution permission, translation permission, or publication authority;
- independent qualified annotation, adjudication, specialist review, rendered evidence, locale quality, accessibility behavior, or user outcome;
- runtime execution, deterministic clean-start behavior, resource containment, browser behavior, network behavior, model behavior, or harness correctness;
- private-holdout validity, B1 eligibility, comparative score validity, or product ranking; or
- any semantic, mutation/change, release, capability, study, or execution authorization.

The fixture's embedded `actual_counts`, count-verification, referential-integrity, independent-review, and result fields remain unchanged and `null/not_run`. A future release process must create its own signed records rather than treating this external working note as an in-package result.

## Bounded conclusion

**[Research finding]** The current public Track A bytes are internally coherent enough to serve as disclosed development, normalization, parser, schema, and falsification evidence. They are not suitable as private gold, a B1 comparator, an approved harness input, or evidence that the future system works.

**[Inference]** The verified 34-to-56 identity failure supports the proposed dual-track design's requirement that Track B counts be independently derived rather than copied from Track A. It does not support any particular Track B count.
