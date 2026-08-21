---
title: "content.md Leakage and Dataset Contracts 0.1"
status: approved-for-implementation
created: 2026-08-20
updated: 2026-08-20
design_id: CONTENTMD-LEAKAGE-DATASET-CONTRACTS-0.1
parent_design_id: CONTENTMD-LIVE-INTELLIGENCE-LEARNING-0.1
approval_basis: explicit-user-approval-in-task
implementation_authority: bounded-local-implementation
authority_effect: implementation-within-written-scope
source_documents:
  - docs/superpowers/specs/2026-08-20-contentmd-live-intelligence-learning-design.md
  - docs/superpowers/specs/2026-08-20-contentmd-learning-record-contracts-design.md
  - docs/superpowers/specs/2026-08-20-contentmd-feedback-qualification-contracts-design.md
  - docs/superpowers/plans/2026-08-20-contentmd-recursive-learning-ranking.md
---

# content.md Leakage and Dataset Contracts 0.1

## 1. Purpose and boundary

This addendum freezes the executable contract for Recursive Learning Task 3 in the [parent design](2026-08-20-contentmd-live-intelligence-learning-design.md), [record contract](2026-08-20-contentmd-learning-record-contracts-design.md), [Task 2 contract](2026-08-20-contentmd-feedback-qualification-contracts-design.md), and [implementation plan](../plans/2026-08-20-contentmd-recursive-learning-ranking.md). It resolves the eight Task 3 preflight blockers: singleton edges, structurally empty diagnostic splits, feature-source checkpoints, resolver-free leakage evidence, leakage-group identity, dataset semantics, record issuance, and observable Unicode 17 behavior.

The user approved the design and directed implementation to continue without another approval pause. This document authorizes bounded local code, frozen Unicode artifacts, fixtures, tests, and the one official-Unicode acquisition operation in section 5.1. It does not authorize browser or provider access, credentials, any other network destination, model calls, training, evaluation, test opening, promotion, deployment, publication, product mutation, or a hosted write.

Task 3 produces immutable grouping and dataset evidence with `authority_effect: none`. A `training_eligible` or `sealed` development fixture is not approved training data and is never a promotion or deployment authority.

The executable 0.1 constructors issue `development_fixture` records only. After validating the closed top-level shape sufficiently to read `record_mode`, any `official` request throws `task3_contract_invalid:official_mode_not_supported`. Official issuance remains reserved for an authenticated resolver, canonical store, revocation, and operation-authority contract.

Browser-observed, competitor, and other third-party wording remains blocking-only. It cannot become a candidate expression used by normalization, a leakage-group member, a split member, a feature source, a label, an exemplar, or training material. A bounded ref may survive only as exclusion provenance, never as evidence that qualifies an example.

Vendored Unicode standard data is an executable runtime dependency, not product or competitor wording. It is permitted only through the source-locked artifact path in section 5 and never becomes a label, expression, or exemplar.

## 2. Normative dependencies and reconciliations

The implementation preserves these contracts:

- [`finalizeRecord()` and `verifyRecordDigest()`](../../../packages/core/src/records.ts) remain the only outer durable-record digest implementation.
- [`sha256Canonical()`](../../../packages/core/src/canonical-json.ts) remains the canonical JSON digest implementation.
- [`StoredEvent`](../../../packages/memory/src/event-store.ts) remains the append receipt used inside a checkpoint prefix.
- `PreferenceExampleRecord`, `LeakageGroupRecord`, and `LearningDatasetManifest` retain the exact closed public shapes in [`records.ts`](../../../packages/learning/src/records.ts) and `learning-records.schema.json`.
- Task 2 continues to bind a bare `feature_source_checkpoint_set_ref`; Task 3 resolves and validates the complete checkpoint set without changing the Task 2 record.

Two Task 1 structural constraints require explicit Task 3 dispositions:

1. `LeakageGroupRecord.edges` is empty-allowed. A one-example connected component has `edges: []`; its lexically first valid `message_lineage` relation remains committed as component evidence, a relation commitment, and provenance, never as an artificial self-edge. Every serialized edge has distinct endpoints.
2. A `LearningDatasetManifest` requires nonempty train, validation, and test example arrays and nonempty group arrays. When deterministic buckets leave any split empty, Task 3 returns a digest-bound non-record diagnostic and `manifest: null`; it does not counterfeit sentinel examples or an invalid schema object. A `diagnostics_only` durable manifest is issued only when all three splits are structurally nonempty but one or more promotion thresholds fail.

No current Task 3 function issues `dataset_state: "invalid"` or `"test_opened"`. Those enum members remain reserved for later immutable state-transition contracts. Integrity failures throw without a durable record.

## 3. Common primitives and collection rules

This addendum reuses the Task 2 `Digest`, `DigestRef`, `ArtifactRef`, `RawUtf8Artifact`, `VerificationReceiptRecord`, `EvidenceSnapshot`, and closed canonical-value rules. Complete durable records are rechecked with `verifyRecordDigest()`. Complete Task 2 snapshots are rehashed using the exact Task 2 snapshot preimage.

```ts
type Split = "train" | "validation" | "test";
type AllowedLearningSourceClass = "project_owned" | "project_owned_synthetic";
type BlockingOnlySourceClass = "browser_observed" | "competitor" | "third_party";

interface RefKey {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  content_digest: Digest;
}
```

All Task 3 objects are closed. Unknown, inherited, accessor, symbol, cyclic, non-enumerable, non-finite, or non-canonical values are malformed. Required strings are nonempty. RFC 3339 values use the repository's strict timestamp rule but never prove append order.

Set-valued arrays are unique and sorted by canonical JSON bytes. Text-key arrays explicitly described as lexical sets are unique and sorted by Unicode scalar value, not host locale. Ordered tuples, the event prefix, and Unicode mapping sequences retain their declared order. Provenance is unique and sorted by `(record_id, relationship, content_digest)`.

Every `DigestRef` comparison is equality over all four fields. Every complete object referenced by a `DigestRef` must reproduce that ref exactly. A content digest alone never resolves a subject or supplies permission.

When an `ArtifactRef` becomes durable-record provenance, its exact projection is `{ record_id: "artifact." + artifact_id + "." + artifact_version, relationship, content_digest: artifact_digest }`. No artifact path, table digest, source-lock digest, or display label substitutes for this projection.

## 4. Task 3 producer witness

Task 3 never accepts unexplained caller-supplied schema or code digests.

```ts
interface Task3ProducerArtifactWitness {
  contract_version: "contentmd.task3-producer-witness/0.1.0";
  producer_id: "leakage-group" | "learning-dataset" | "dataset-seal";
  schema_artifact: RawUtf8Artifact;
  source_artifacts: [RawUtf8Artifact, ...RawUtf8Artifact[]];
  verification_mode: "development_fixture" | "build_verified";
  verification_receipt: VerificationReceiptRecord | null;
}
```

The schema artifact path is exactly `packages/schemas/src/learning-records.schema.json`. Source paths and membership are exact:

| Producer | Required source paths |
| --- | --- |
| `leakage-group` | `packages/learning/src/leakage.ts`, `packages/learning/src/unicode-normalization.ts` |
| `learning-dataset` | `packages/learning/src/dataset.ts`, `packages/learning/src/leakage.ts`, `packages/learning/src/unicode-normalization.ts` |
| `dataset-seal` | `packages/learning/src/dataset.ts` |

For every artifact, `raw_bytes_digest = sha256(UTF8(bytes_utf8))`. Paths are workspace-relative POSIX paths. Source artifacts are unique and sorted by path.

The output `schema_digest` is the verified schema raw digest. The output `code_digest` is:

```text
sha256Canonical({
  contract_version: "contentmd.task3-code-manifest/0.1.0",
  producer_id,
  entries: source_artifacts.map(({ path, raw_bytes_digest }) => ({ path, raw_bytes_digest }))
})
```

The producer-manifest digest is:

```text
sha256Canonical({
  contract_version: "contentmd.task3-producer-manifest/0.1.0",
  producer_id,
  schema: { path: schema_artifact.path, raw_bytes_digest: schema_digest },
  code_digest
})
```

`buildLearningDataset` requires `group_producer.producer_id: leakage-group` and `dataset_producer.producer_id: learning-dataset`; `sealLearningDataset` requires `producer_id: dataset-seal`. A producer ID cannot be substituted across constructors.

`development_fixture` requires a null receipt. `build_verified` requires a complete digest-valid receipt with record ID `verification-receipt.task3-producer.<producer_id>.<producer_manifest_digest>`, schema/version `contentmd.verification-receipt-record@0.1.0`, record version `1`, lifecycle `active`, exact scope `{ memory_scope: "task", project_id: null, resource_refs: [target_path], data_classes: ["verification_metadata"] }`, and empty provenance. Its payload has status `passed`, transaction ref `producer-manifest.<producer_manifest_digest>`, target path `contentmd://task3/producer-manifest/<producer_id>`, expected and observed digests equal to the producer-manifest digest, a strict descriptive `verified_at`, and method `sha256-canonical-readback`. The receipt is excluded from the manifest preimage. It verifies bytes; it does not authorize official issuance.

## 5. Frozen Unicode 17 artifacts

### 5.1 Required artifacts and source lock

Task 3 creates and verifies these exact artifacts:

| Artifact ID | File | Observable purpose |
| --- | --- | --- |
| `unicode-normalization` | `fixtures/learning-ranking/unicode-17-normalization.json` | NFKC decomposition, canonical ordering, and composition |
| `unicode-casefold` | `fixtures/learning-ranking/unicode-17-casefold.json` | locale-neutral full default case folding |
| `unicode-whitespace` | `fixtures/learning-ranking/unicode-17-whitespace.json` | Unicode `White_Space` membership |
| `unicode-word-break` | `fixtures/learning-ranking/unicode-17-word-break.json` | Task 4 tokenizer tables |
| `unicode-grapheme-break` | `fixtures/learning-ranking/unicode-17-grapheme-break.json` | later length and benchmark segmentation tables |

All use `artifact_version: "17.0.0"`. The group payload's `normalization_artifact_refs` contains exactly the normalization, case-fold, and whitespace refs, sorted by artifact ID. Word-break and grapheme-break artifacts are staged and verified in Task 3 but are not read by the leakage similarity algorithm.

Generation uses `scripts/generate-unicode-17-artifacts.mjs` and the checked-in `fixtures/learning-ranking/unicode-17-source-lock.json`. The source lock contains exact path, Unicode public URL, byte count, and SHA-256 for these Unicode 17.0.0 inputs:

```text
UnicodeData.txt
CompositionExclusions.txt
DerivedNormalizationProps.txt
CaseFolding.txt
PropList.txt
auxiliary/WordBreakProperty.txt
auxiliary/GraphemeBreakProperty.txt
auxiliary/WordBreakTest.txt
auxiliary/GraphemeBreakTest.txt
DerivedCoreProperties.txt
emoji/emoji-data.txt
ReadMe.txt
reports/tr29-47.html
```

The source-lock file is the closed object `{ contract_version: "contentmd.unicode-source-lock/0.1.0", unicode_version: "17.0.0", license: SourceLockEntry, sources: SourceLockEntry[], artifact_inputs: ArtifactInputEntry[] }`. `SourceLockEntry` is exactly `{ path, public_url, raw_bytes_digest, byte_count }`. `ArtifactInputEntry` is exactly `{ artifact_id, algorithm_id, source_paths, rule_source_path, conformance_test_path, expected_rules_digest }`; the final three fields are null for normalization, case-fold, and whitespace and are `reports/tr29-47.html`, the exact auxiliary test path, and a digest for word and grapheme breaking. Artifact IDs and algorithm IDs are the five exact values below. The raw source files, UAX source, and Unicode license are vendored under `fixtures/learning-ranking/unicode-17-sources/`; the license entry path is exactly `license.txt`. Every UCD data-source URL begins exactly `https://www.unicode.org/Public/17.0.0/`; the rule-source URL is exactly `https://www.unicode.org/reports/tr29/tr29-47.html`; the license URL is exactly `https://www.unicode.org/license.txt`. No redirect or alternate origin is accepted by the offline generator. Source entries are sorted by path; artifact-input entries use the artifact order in the table above.

Per-artifact `source_paths` membership and order are exact:

| Artifact ID | Ordered source paths | Rule source | Conformance test |
| --- | --- | --- | --- |
| `unicode-normalization` | `UnicodeData.txt`, `CompositionExclusions.txt`, `DerivedNormalizationProps.txt` | null | null |
| `unicode-casefold` | `CaseFolding.txt` | null | null |
| `unicode-whitespace` | `PropList.txt` | null | null |
| `unicode-word-break` | `auxiliary/WordBreakProperty.txt`, `emoji/emoji-data.txt` | `reports/tr29-47.html` | `auxiliary/WordBreakTest.txt` |
| `unicode-grapheme-break` | `auxiliary/GraphemeBreakProperty.txt`, `DerivedCoreProperties.txt`, `emoji/emoji-data.txt` | `reports/tr29-47.html` | `auxiliary/GraphemeBreakTest.txt` |

`ReadMe.txt`, `reports/tr29-47.html`, and the license are release/rule provenance inputs bound by the source lock and acquisition receipt; they do not appear in an artifact's `source_entries`. The two conformance-test files are likewise bound by the lock and named by `conformance_test_path`, not copied into `source_entries`.

If these vendored bytes are absent, `scripts/acquire-unicode-17-sources.mjs` with no arguments may perform one bounded acquisition. It requires the source directory, source lock, and receipt all to be absent; a partial or existing target fails closed and is never overwritten. Any argument is rejected. Its URL list is the exact twelve UCD paths above under `https://www.unicode.org/Public/17.0.0/ucd/`, including the four already-prefixed `auxiliary/` paths and `emoji/emoji-data.txt`, followed by the exact rule-source URL and `https://www.unicode.org/license.txt`. The script uses credential-free HTTPS GET, no query, no cookies, no proxy override, no redirect, a 30-second per-response timeout, a 32 MiB total cap, and exact host `www.unicode.org`. It fetches each file twice into separate temporary files and requires byte equality, valid UTF-8, the declared Unicode 17 release marker in `ReadMe.txt`, the Unicode 17/revision 47 markers in the rule source, and the expected parseable file header before any write. It then writes only `fixtures/learning-ranking/unicode-17-sources/`, the source lock, and `fixtures/learning-ranking/unicode-17-acquisition-receipt.json` atomically. Any partial, redirected, mismatched, oversized, malformed, or non-200 response deletes the temporary files and writes nothing.

The acquisition receipt is exact:

```ts
interface UnicodeAcquisitionEntry {
  path: string;
  public_url: string;
  first_fetch: { byte_count: number; raw_bytes_digest: Digest };
  second_fetch: { byte_count: number; raw_bytes_digest: Digest };
}

interface UnicodeAcquisitionReceipt {
  contract_version: "contentmd.unicode-acquisition-receipt/0.1.0";
  unicode_version: "17.0.0";
  exact_host: "www.unicode.org";
  acquisition_script: { path: "scripts/acquire-unicode-17-sources.mjs"; raw_bytes_digest: Digest };
  entries: [UnicodeAcquisitionEntry, ...UnicodeAcquisitionEntry[]];
  source_lock_raw_bytes_digest: Digest;
  acquired_at: string;
  status: "development_fixture_verified";
  authority_effect: "none";
  receipt_digest: Digest;
}
```

Receipt entries are in source-lock path order with the license last; both fetches must have the same nonzero byte count and digest, and their URL/path pair must equal the corresponding source-lock entry. `source_lock_raw_bytes_digest` is SHA-256 over the exact canonical source-lock JSON bytes. `receipt_digest = sha256Canonical()` over every receipt field except itself. The receipt is serialized with the canonical JSON encoding below and grants no authority.

The acquisition script imports the generator's side-effect-free `buildBoundaryMachines()` export, recomputes both machine digests, and writes those values into the two `expected_rules_digest` fields. Importing the generator performs no read, write, fetch, or generation. The same export is called during generation and `--check`; a source-lock/machine mismatch fails before artifact construction. Thus the source lock cannot silently bless a second rule implementation.

After the first successful acquisition, normal generation and every verification run are offline. The generator performs no network call and accepts only source bytes whose length and SHA-256 match the committed lock. Input must be valid UTF-8 without a BOM; line endings are normalized to LF only for parsing, while the lock digest remains over raw bytes. For semicolon-delimited UCD and conformance data, it removes text after `#`, trims ASCII space and tab around fields or tokens, parses hexadecimal scalars and inclusive ranges, and rejects duplicates, overlaps, descending ranges, surrogates, values above `10FFFF`, unknown properties, or unsorted generated output. `ReadMe.txt` and the report HTML are marker-validated provenance bytes and are never parsed as property tables.

With no arguments the generator atomically writes only the five declared JSON targets after all five outputs validate. With exact flag `--check`, it generates entirely in memory, byte-compares all five expected files, reports the first mismatched path, and writes nothing. Any other argument is rejected. The source lock, acquisition receipt, and artifacts use the repository `canonicalJson()` encoding: recursively key-sorted compact JSON, UTF-8, and exactly one trailing LF. Generated arrays retain only the order specified here; object insertion order is not an input.

Generation rules are exact:

- `UnicodeData.txt` is parsed as 15 semicolon-separated fields. Paired `<..., First>` and `<..., Last>` rows expand one inclusive range and must agree on every non-name field. Canonical combining classes come from nonzero field 4 values. Field 6 decompositions without a leading angle-bracket tag are canonical; tagged decompositions are compatibility mappings with the tag removed.
- `composition_exclusions` is exactly the `Full_Composition_Exclusion` set from `DerivedNormalizationProps.txt`; every scalar in `CompositionExclusions.txt` must be a member. `composition_pairs` contains each canonical two-scalar decomposition whose composite is not in that full-exclusion set and whose first scalar has canonical combining class zero, sorted by `(starter, combining, composite)`.
- `CaseFolding.txt` emits status `C` and `F` mappings only. A status-`F` mapping replaces status `C` for the same scalar; every status `S` and `T` line is ignored, and conflicting duplicate mappings fail generation.
- `PropList.txt` contributes exactly the `White_Space` ranges. Gaps are non-whitespace.
- `WordBreakProperty.txt` and `GraphemeBreakProperty.txt` contribute their named, nonoverlapping ranges; uncovered scalars derive property `Other`. `emoji-data.txt` contributes exactly `Extended_Pictographic`. `DerivedCoreProperties.txt` contributes exactly `InCB` values `Consonant`, `Extend`, and `Linker`. An absent required property, an unexpected non-comment field count, or an overlap within one property partition fails generation.
- The generator parses every non-comment line of `WordBreakTest.txt` and `GraphemeBreakTest.txt` as alternating `÷`/`×` boundary markers and hexadecimal scalars, rejecting unknown tokens or malformed endpoints. It executes the embedded rule machine on every boundary and requires exact agreement with every test marker before writing either auxiliary artifact.

Every generated JSON file is a closed object with this common envelope:

```ts
interface UnicodeArtifactEnvelope<TTables> {
  contract_version: "contentmd.unicode-artifact/0.1.0";
  artifact_id:
    | "unicode-normalization"
    | "unicode-casefold"
    | "unicode-whitespace"
    | "unicode-word-break"
    | "unicode-grapheme-break";
  artifact_version: "17.0.0";
  unicode_version: "17.0.0";
  algorithm_id: string;
  source_lock: { path: "fixtures/learning-ranking/unicode-17-source-lock.json"; raw_bytes_digest: Digest };
  source_entries: [{ path: string; raw_bytes_digest: Digest; byte_count: number }, ...Array<{ path: string; raw_bytes_digest: Digest; byte_count: number }>];
  generator: { path: "scripts/generate-unicode-17-artifacts.mjs"; raw_bytes_digest: Digest };
  tables: TTables;
  tables_digest: Digest;
}
```

The five `algorithm_id` values are exact: `unicode-normalization/17.0.0-nfkc-v1`, `unicode-casefold/17.0.0-full-default-v1`, `unicode-whitespace/17.0.0-white-space-v1`, `unicode-word-break/17.0.0-uax29-default-v1`, and `unicode-grapheme-break/17.0.0-uax29-extended-v1`.

The runtime receives a closed bundle:

```ts
interface FrozenUnicodeArtifactWitness {
  path: string;
  bytes_utf8: string;
  raw_bytes_digest: Digest;
  artifact_ref: ArtifactRef;
}

interface UnicodeArtifactBundle {
  contract_version: "contentmd.unicode-artifact-bundle/0.1.0";
  source_lock: RawUtf8Artifact;
  acquisition_receipt: RawUtf8Artifact;
  generator: RawUtf8Artifact;
  normalization: FrozenUnicodeArtifactWitness;
  casefold: FrozenUnicodeArtifactWitness;
  whitespace: FrozenUnicodeArtifactWitness;
  word_break: FrozenUnicodeArtifactWitness;
  grapheme_break: FrozenUnicodeArtifactWitness;
  bundle_digest: Digest;
}
```

Witness paths are the five exact paths in the table. The source-lock, acquisition-receipt, and generator paths are exactly `fixtures/learning-ranking/unicode-17-source-lock.json`, `fixtures/learning-ranking/unicode-17-acquisition-receipt.json`, and `scripts/generate-unicode-17-artifacts.mjs`. Each raw digest equals SHA-256 over its `bytes_utf8`; each generated-artifact digest also equals its artifact ref digest, whose ID comes from the table and version is `17.0.0`. The parsed lock and receipt must satisfy section 5.1 and cross-bind the same source bytes. `bundle_digest` hashes every bundle field except itself. The source-lock and generator raw digests must equal the values embedded in every artifact envelope.

The parsed normalization tables are exactly `{ canonical_combining_class_ranges, decomposition_mappings, composition_exclusions, composition_pairs, hangul }`. A combining-class range is `{ start, end, value }`; a decomposition is `{ scalar, kind: "canonical" | "compatibility", mapping: number[] }`; a composition pair is `{ starter, combining, composite }`; exclusions are scalar integers; and `hangul` is `{ s_base: 44032, l_base: 4352, v_base: 4449, t_base: 4519, l_count: 19, v_count: 21, t_count: 28, n_count: 588, s_count: 11172 }`. Mappings are nonempty ordered scalar arrays. Keys and ranges are unique, ascending, nonoverlapping, and scalar-valid.

The parsed case-fold tables are exactly `{ mappings }`, where each entry is `{ scalar, mapping }`, keys are unique ascending scalars, and mappings are nonempty ordered scalar arrays. Whitespace tables are exactly `{ ranges }`, using sorted nonoverlapping `{ start, end }` inclusive scalar ranges.

The embedded boundary-rule machine uses this closed AST:

```ts
type BoundaryPropertyDomain =
  | "word_break"
  | "grapheme_cluster_break"
  | "extended_pictographic"
  | "indic_conjunct_break"
  | "word_macro"
  | "universal";

type BoundaryExpression =
  | { op: "property"; domain: BoundaryPropertyDomain; values: [string, ...string[]] }
  | { op: "empty" }
  | { op: "sot" }
  | { op: "eot" }
  | { op: "sequence"; terms: [BoundaryExpression, ...BoundaryExpression[]] }
  | { op: "choice"; terms: [BoundaryExpression, ...BoundaryExpression[]] }
  | { op: "repeat"; minimum: number; maximum: number | null; term: BoundaryExpression }
  | { op: "not"; term: BoundaryExpression }
  | { op: "regional_indicator_prefix"; parity: "odd" | "even" }
  | { op: "extended_pictographic_extend_zwj_prefix" }
  | { op: "indic_conjunct_prefix" };

interface BoundaryRule {
  step_kind: "boundary";
  rule_id: string;
  priority: number;
  decision: "break" | "no_break";
  left: BoundaryExpression;
  right: BoundaryExpression;
}

interface BoundaryIgnoreRewrite {
  step_kind: "ignore_rewrite";
  rule_id: "WB4";
  priority: number;
  ignored_properties: ["Extend", "Format", "ZWJ"];
  except_after: ["sot", "CR", "LF", "Newline"];
  later_rule_view: "remove_ignored_and_project_boundaries";
}

type BoundaryMachineStep = BoundaryRule | BoundaryIgnoreRewrite;

interface BoundaryRuleMachine {
  contract_version: "contentmd.unicode-boundary-machine/0.1.0";
  machine_id: "unicode-word-break/17.0.0-uax29-default-v1" | "unicode-grapheme-break/17.0.0-uax29-extended-v1";
  unicode_version: "17.0.0";
  uax29_revision: 47;
  conformance_profile: "UAX29-C2-1-default-word" | "UAX29-C1-1-extended-grapheme";
  scan_direction: "left_to_right";
  rule_order: [string, ...string[]];
  steps: [BoundaryMachineStep, ...BoundaryMachineStep[]];
  default_decision: "break";
  machine_digest: Digest;
}
```

Rule priority is a zero-based contiguous integer and equals its position. `rule_order` is a positional bijection with `steps[].rule_id`. The exact word order is `WB1`, `WB2`, `WB3`, `WB3a`, `WB3b`, `WB3c`, `WB3d`, `WB4`, `WB5`, `WB6`, `WB7`, `WB7a`, `WB7b`, `WB7c`, `WB8`, `WB9`, `WB10`, `WB11`, `WB12`, `WB13`, `WB13a`, `WB13b`, `WB15`, `WB16`, `WB999`; the exact grapheme order is `GB1`, `GB2`, `GB3`, `GB4`, `GB5`, `GB6`, `GB7`, `GB8`, `GB9`, `GB9a`, `GB9b`, `GB9c`, `GB11`, `GB12`, `GB13`, `GB999`. Word macros are exactly `AHLetter = {ALetter, Hebrew_Letter}` and `MidNumLetQ = {MidNumLet, Single_Quote}`.

Property domains and values are not interchangeable. A `word_break` expression may contain only the word-property vocabulary below; a `grapheme_cluster_break` expression may contain only the grapheme-property vocabulary; `extended_pictographic` has the sole value `Yes`; `indic_conjunct_break` has exactly `Consonant`, `Extend`, and `Linker`; `word_macro` has exactly `AHLetter` and `MidNumLetQ`; and `universal` has the sole value `Any`. The word machine may use only `word_break`, `extended_pictographic`, `word_macro`, and `universal`; the grapheme machine may use only `grapheme_cluster_break`, `extended_pictographic`, `indic_conjunct_break`, and `universal`. Thus the right operands of WB3c and GB11 encode `domain: "extended_pictographic", values: ["Yes"]`, and the right operand of GB9c encodes `domain: "indic_conjunct_break", values: ["Consonant"]`; an unqualified string such as `Extend` is invalid. `not` must enclose exactly one `property` expression. Property-value sets are unique in their declared domain order. Sequence and choice order is significant. Repeat bounds are nonnegative integers with `maximum === null` for unbounded or `maximum >= minimum`.

A boundary expression is a regular-language predicate: its left side must match a suffix ending at the candidate boundary and its right side a prefix starting there; `empty` consumes nothing, `property` consumes one scalar, `sequence` concatenates, `choice` unions, `repeat` uses its declared bounds, and `not` complements the one-scalar property set it encloses. Matching is existential, so greediness does not affect a result. The three specialized prefix operations implement, respectively, regional-indicator parity, Extended-Pictographic/Extend/ZWJ lookbehind, and Indic-Conjunct-Break consonant/linker lookbehind. `WB4` is the only rewrite step: after `WB1` through `WB3d` have been tested on original scalar positions, eligible `Extend`, `Format`, and `ZWJ` scalars are removed from the logical view for later rules and the resulting decisions are projected back to original offsets; a run at start of text or immediately after `CR`, `LF`, or `Newline` is not removed. Boundaries from a retained base into an eligible ignored run and inside that run are `no_break`. No arbitrary expression, callback, regex, tailoring, dictionary, or host segmenter is permitted.

`machine_digest = sha256Canonical()` over every machine field except itself. The generator embeds the complete revision-47 word and grapheme machines as closed data, writes them into their respective artifact tables, requires the digest to equal `expected_rules_digest` in the source lock, and requires complete conformance-test agreement. The rule machine is therefore observable and byte-frozen rather than identified only by a version string.

Word-break tables are exactly `{ rule_machine, rules_digest, property_order, property_ranges, extended_pictographic_ranges }`; grapheme-break tables are exactly `{ rule_machine, rules_digest, property_order, property_ranges, extended_pictographic_ranges, indic_conjunct_break_ranges }`. `rules_digest` equals `rule_machine.machine_digest`. Property ranges are closed `{ start, end, property }` entries. The word property vocabulary is `Other`, `CR`, `LF`, `Newline`, `Extend`, `ZWJ`, `Regional_Indicator`, `Format`, `Katakana`, `Hebrew_Letter`, `ALetter`, `Single_Quote`, `Double_Quote`, `MidNumLet`, `MidLetter`, `MidNum`, `Numeric`, `ExtendNumLet`, and `WSegSpace`. The grapheme property vocabulary is `Other`, `CR`, `LF`, `Control`, `Extend`, `ZWJ`, `Regional_Indicator`, `Prepend`, `SpacingMark`, `L`, `V`, `T`, `LV`, and `LVT`; Indic conjunct values are `Consonant`, `Extend`, and `Linker`. The property-order arrays use the vocabularies in the order just listed.

`tables_digest = sha256Canonical(tables)`. The `ArtifactRef.artifact_digest` is SHA-256 over the exact raw JSON file bytes, not `tables_digest`. Source entries follow the exact source-file order declared for that artifact by the source lock. Numeric scalars are integers.

Normalization tables contain sorted unique canonical-combining-class ranges, canonical and compatibility decomposition mappings, composition exclusions, and canonical composition pairs. Hangul decomposition and composition use the Unicode 17 constants and algorithm and are not expanded into mappings. Case-fold tables contain the full default mapping obtained from status `C` and `F`; `F` wins where both simple and full forms exist, status `S` is not separately applied, status `T` is excluded, and an absent scalar maps to itself. Whitespace tables contain only the `White_Space` ranges from `PropList.txt`.

Word-break tables bind the Unicode 17 default word-boundary rule-machine version, `WordBreakProperty.txt`, and the Extended Pictographic data required by that rule machine. Grapheme-break tables bind the Unicode 17 extended-grapheme-cluster rule-machine version, `GraphemeBreakProperty.txt`, `Extended_Pictographic` from `emoji-data.txt`, and `Indic_Conjunct_Break` from `DerivedCoreProperties.txt`. The generator and artifact verifier execute both frozen machines against every official conformance case. The Task 3 leakage-group runtime does not use word or grapheme segmentation as a scoring feature in 0.1.

### 5.2 Exact leakage normalization

`normalizeForLeakage(input)` performs these steps in order:

1. Validate the JavaScript string's UTF-16 code units. A high surrogate must be immediately followed by a low surrogate, and a low surrogate must be preceded by a high surrogate. Any lone surrogate throws; replacement with U+FFFD is forbidden.
2. Decode the string into Unicode scalar values.
3. Apply Unicode 17 NFKC using only the frozen tables: recursive compatibility decomposition, algorithmic Hangul decomposition, stable canonical ordering by canonical combining class within each starter segment, and canonical composition using the blocking rule plus algorithmic Hangul composition.
4. Apply the frozen Unicode 17 full default case-fold mapping independently to each resulting scalar. Turkic status `T`, locale APIs, and locale-sensitive casing are forbidden. No implicit post-fold normalization is performed.
5. Replace each maximal nonempty run of scalars in the frozen `White_Space` property with one U+0020 SPACE.
6. Remove one leading and one trailing U+0020 if present after collapse. Internal U+0020 values remain one each.

Recursive decomposition is depth-first in mapping order, rejects a recursion cycle, and expands Hangul syllables algorithmically before table lookup. Canonical ordering is a stable sort of nonstarters by ascending combining class within each starter segment. Composition scans left to right with the current starter and last nonzero combining class; a table or Hangul pair composes exactly when it exists and is unblocked (`last_class === 0 || last_class < current_class`), after which the composite remains the starter. Otherwise the scalar remains in order; a class-zero scalar becomes the new starter and resets the last class, while a nonzero scalar updates the last class.

The implementation must not call `String.prototype.normalize`, `toLocaleLowerCase`, `toLocaleUpperCase`, `Intl`, a Unicode property escape, or regular-expression `\s` for these steps. Host ICU and the host Unicode version are not observable inputs.

The normalized result is a Unicode-scalar sequence. An empty normalized candidate is not assigned a similarity score and yields the per-example exclusion `normalized_expression_empty`.

For a normalized sequence of at least three scalars, `scalarTrigramSet()` returns the distinct consecutive three-scalar tuples. A tuple key is the three scalar values rendered as six lowercase hexadecimal digits and joined by `.`; for example, U+0061 U+1F600 U+0062 becomes `000061.01f600.000062`. Iteration is by Unicode scalar, never UTF-16 code unit or UTF-8 byte.

Two normalized strings are near duplicates when:

- either string has fewer than three scalars and the two complete normalized scalar sequences are exactly equal; or
- both have at least three scalars and `intersection_size * 20 >= union_size * 17` for their trigram sets.

The Jaccard threshold is therefore the exact rational `17/20`. The implementation evaluates `BigInt(intersection_size) * 20n >= BigInt(union_size) * 17n`; no binary floating-point or overflow-prone number multiplication is permitted. If one sequence is shorter than three and the other is not, they are not near duplicates.

Each preference supplies canonical candidate A and B expressions. Two distinct preference examples receive a `near_duplicate` relation if any of their four cross-example candidate combinations is near duplicate. Candidate order and the preference label are never rewritten.

## 6. Feature-source checkpoint contract

### 6.1 Store binding and feature material

Task 3 validates temporal eligibility from an append commitment, not a caller timestamp.

```ts
interface StoreBindingWitness {
  contract_version: "contentmd.feature-store-binding/0.1.0";
  binding_id: string;
  store_kind: "sqlite_append_only_event_store" | "synthetic_append_only_event_store";
  project_id: string;
  store_instance_id: string;
  instance_nonce_digest: Digest;
  store_schema: StoreArtifactWitness;
  runtime_profile: StoreArtifactWitness;
  binding_digest: Digest;
}

interface StoreArtifactWitness {
  path:
    | "fixtures/learning-ranking/feature-source-store-schema.json"
    | "fixtures/learning-ranking/feature-source-runtime-profile.json";
  bytes_utf8: string;
  raw_bytes_digest: Digest;
  artifact_ref: ArtifactRef;
}

type FeatureSourceRole =
  | "task"
  | "context"
  | "fact_set"
  | "policy"
  | "candidate_a"
  | "candidate_b"
  | "retrieval_snapshot"
  | "approved_pattern"
  | "approved_exemplar"
  | "acceptance_criteria";

type ExpressionFreeFeatureRole =
  | "retrieval_snapshot"
  | "approved_pattern"
  | "acceptance_criteria";

type ExpressionFreeFeatureConstraint =
  | { constraint_kind: "none" }
  | { constraint_kind: "grapheme_count"; minimum: number | null; maximum: number | null };

interface ExpressionFreeFeaturePayload {
  contract_version: "contentmd.expression-free-feature/0.1.0";
  feature_role: ExpressionFreeFeatureRole;
  project_id: string;
  source_class: AllowedLearningSourceClass;
  rights_state: "training_permitted";
  permission_snapshot_ref: DigestRef;
  eligibility_checks_snapshot_ref: DigestRef;
  ordered_feature_refs: [DigestRef, ...DigestRef[]];
  constraint: ExpressionFreeFeatureConstraint;
  state: "current";
  content_form: "expression_free_ref_and_numeric_metadata";
  set_digest: Digest;
}

type ClosedTask2FeatureSnapshot =
  | EvidenceSnapshot<"task", TaskPayload>
  | EvidenceSnapshot<"context", ContextPayload>
  | EvidenceSnapshot<"fact-set", StableSetPayload>
  | EvidenceSnapshot<"review-policy", StableSetPayload>
  | EvidenceSnapshot<"candidate", CandidatePayload>
  | EvidenceSnapshot<"retrieval", ExpressionFreeFeaturePayload>
  | EvidenceSnapshot<"approved-pattern", ExpressionFreeFeaturePayload>
  | EvidenceSnapshot<"acceptance-criteria", ExpressionFreeFeaturePayload>;

type CompleteFeatureMaterial =
  | { material_kind: "durable_record"; source_ref: DigestRef; value: ExemplarRecord }
  | { material_kind: "task2_evidence_snapshot"; source_ref: DigestRef; value: ClosedTask2FeatureSnapshot };

interface FeatureSourceManifestEntry {
  source_ref: DigestRef;
  source_role: FeatureSourceRole;
  source_class: AllowedLearningSourceClass;
  rights_state: "training_permitted";
  material: CompleteFeatureMaterial;
  stream_id: string;
  event_id: string;
  sequence: number;
  event_digest: Digest;
  event: StoredEvent;
}

interface FeatureSourceManifest {
  contract_version: "contentmd.feature-source-manifest/0.1.0";
  manifest_id: string;
  project_id: string;
  entries: [FeatureSourceManifestEntry, ...FeatureSourceManifestEntry[]];
  manifest_digest: Digest;
}
```

The store-schema artifact is canonical JSON for the exact closed object `{ contract_version: "contentmd.feature-source-store-schema/0.1.0", allowed_store_kinds: ["sqlite_append_only_event_store", "synthetic_append_only_event_store"], allowed_event_type: "feature_source_recorded", allowed_data_class: "learning_feature_source", sequence_origin: 1, sequence_step: 1, first_predecessor: null, later_predecessor: "prior_event_digest", event_digest_algorithm: "sha256-canonical", append_order_authority: "sequence_and_digest_chain" }`. Its artifact ref has `artifact_id: "contentmd.feature-source-store-schema"` and `artifact_version: "0.1.0"`.

The runtime-profile artifact is canonical JSON for `{ contract_version: "contentmd.feature-source-runtime-profile/0.1.0", node_version: "24.14.0", hash_algorithm: "sha256", text_encoding: "utf-8-fatal", canonical_json_algorithm: "contentmd.core-canonical-json/0.1.0", timestamp_role: "descriptive_only", network_access: "none" }`. Its artifact ref has `artifact_id: "contentmd.feature-source-runtime-profile"` and `artifact_version: "0.1.0"`. Both witnesses use their exact paths above, canonical JSON bytes with one trailing LF, and `raw_bytes_digest = artifact_ref.artifact_digest = sha256(UTF8(bytes_utf8))`; the parsed bytes must equal the exact object for that path.

`store_instance_id` is a nonempty valid record ID selected once before the first append and reused for one fixture store only. Its checkable commitment is `instance_nonce_digest = sha256Canonical({ contract_version: "contentmd.feature-store-instance/0.1.0", store_instance_id, store_kind, project_id })`; no timestamp, credential, path, or unresolved random value participates. The store-binding identity preimage contains `contract_version`, store kind, project ID, store instance ID, instance nonce digest, and both complete artifact witnesses. `binding_id = "feature-store-binding." + sha256Canonical(identity_preimage)`. `binding_digest = sha256Canonical()` over every store-binding field except itself. The selected store kind must occur in the verified schema artifact.

The feature-manifest identity preimage contains `contract_version`, project ID, and entries, excluding its ID and digest. `manifest_id = "feature-source-manifest." + sha256Canonical(identity_preimage)`. `manifest_digest = sha256Canonical()` over every manifest field except itself. Manifest entries are unique and sorted by `source_ref`; each complete material rehashes to its exact ref. Duplicate material, locator, event ID, or source ref is malformed.

For every entry, `entry.source_ref` must equal `entry.material.source_ref` over all four ref fields, and the complete `material.value` must reproduce that same ref. Role compatibility is exact:

| Role | Material kind | Exact schema ID | Required binding |
| --- | --- | --- | --- |
| `task` | `task2_evidence_snapshot` | `contentmd.task2-task-snapshot` | Snapshot kind is `task`; object and ref equal the example's qualification and preference task snapshot/ref |
| `context` | `task2_evidence_snapshot` | `contentmd.task2-context-snapshot` | Snapshot kind is `context`; object and ref equal the example's qualification and preference context snapshot/ref |
| `fact_set` | `task2_evidence_snapshot` | `contentmd.task2-fact-set-snapshot` | Snapshot kind is `fact-set`; object and ref equal the example's qualification fact-set snapshot/ref |
| `policy` | `task2_evidence_snapshot` | `contentmd.task2-review-policy-snapshot` | Snapshot kind is `review-policy`; object and ref equal the example's qualification review-policy snapshot/ref |
| `candidate_a` | `task2_evidence_snapshot` | `contentmd.task2-candidate-snapshot` | Snapshot kind is `candidate`; object and ref equal canonical candidate A in qualification and preference inputs |
| `candidate_b` | `task2_evidence_snapshot` | `contentmd.task2-candidate-snapshot` | Snapshot kind is `candidate`; object and ref equal canonical candidate B in qualification and preference inputs |
| `retrieval_snapshot` | `task2_evidence_snapshot` | `contentmd.task2-retrieval-snapshot` | Snapshot kind is `retrieval`; payload role is `retrieval_snapshot`; feature refs resolve only to `approved_pattern` or `approved_exemplar` entries |
| `approved_pattern` | `task2_evidence_snapshot` | `contentmd.task2-approved-pattern-snapshot` | Snapshot kind is `approved-pattern`; payload role is `approved_pattern`; feature refs resolve only to active mechanism `approved_exemplar` entries |
| `approved_exemplar` | `durable_record` | `contentmd.exemplar-record` | Complete record is active, has `approved_current` and `current`, and has matching project scope; its `permission_ref` equals `eligibility_input.permission.payload.permission_ref`, its subject ref is covered by that permission's `subject_refs`, and its `rights_ref` occurs in `eligibility_input.checks.payload.rights.evidence_refs` |
| `acceptance_criteria` | `task2_evidence_snapshot` | `contentmd.task2-acceptance-criteria-snapshot` | Snapshot kind is `acceptance-criteria`; payload role is `acceptance_criteria`; feature refs resolve only to the one `fact_set` or `policy` entry |

Task, context, fact set, policy, candidate A, and candidate B occur exactly once. Optional roles may repeat only with distinct refs. The material kind, schema ID, snapshot kind, and example binding must satisfy the same table row; no cross-row substitution is allowed. A role/schema mismatch is `task3_contract_invalid:checkpoint_binding`, never an exclusion that can qualify another source.

The three optional snapshot kinds use only the closed `ExpressionFreeFeaturePayload`; they do not accept `unknown`, an extension object, free-form criteria, source excerpts, expression text, expression digests, labels, rationales, or browser/competitor/third-party values. The payload role and outer snapshot kind mapping is exactly `retrieval_snapshot -> retrieval`, `approved_pattern -> approved-pattern`, and `acceptance_criteria -> acceptance-criteria`. `permission_snapshot_ref` and `eligibility_checks_snapshot_ref` reproduce, respectively, the complete non-null `eligibility_input.permission` and `eligibility_input.checks` snapshot refs. The permission is current and effective under section 7.1, and its payload project list contains the payload project. The checks snapshot is the same digest-valid snapshot replayed by Task 2 and its rights state is `pass`.

`ordered_feature_refs` is nonempty, unique, and order-significant. Every ref resolves byte-identically to a different entry in the same feature manifest; self-reference and role cycles are impossible under the table's role graph. For an `approved_pattern`, every target is an active `approved_exemplar` whose `exemplar_kind` is `mechanism`. For a `retrieval_snapshot`, each target is either such an exemplar or an `approved_pattern` snapshot that recursively resolves only to such exemplars. For `acceptance_criteria`, every target is the one `fact_set` or `policy` entry, whose stable set is current. Define the payload's `resolved_subject_refs` as the unique sorted union of each target exemplar's `payload.subject_ref`, recursively through an approved-pattern target, or each targeted stable set's `payload.item_refs`. Define `resolved_rights_refs` as the corresponding unique sorted union of each exemplar's `payload.rights_ref` or each targeted stable set's `payload.item_refs`. Every resolved subject ref occurs in the exact permission payload's `subject_refs`, and every resolved rights ref occurs in the exact eligibility rights check's `evidence_refs`.

The constraint is exactly `{ constraint_kind: "none" }` for retrieval and approved-pattern payloads. Acceptance criteria may also use `{ constraint_kind: "grapheme_count", minimum, maximum }`; each non-null bound is a nonnegative JavaScript safe integer, at least one bound is non-null, and when both are present `minimum <= maximum`. This constraint contains no text and is not a segmentation result. The outer optional snapshot's `source_refs` is exactly the unique sorted union of `permission_snapshot_ref`, `eligibility_checks_snapshot_ref`, and `ordered_feature_refs`. The payload set digest is:

```text
sha256Canonical({
  contract_version: "contentmd.expression-free-feature-set/0.1.0",
  feature_role,
  project_id,
  source_class,
  rights_state,
  permission_snapshot_ref,
  eligibility_checks_snapshot_ref,
  ordered_feature_refs,
  constraint,
  state,
  content_form
})
```

The payload project equals the feature manifest, store binding, and example project. Its source class and rights state equal the manifest entry and every recursively resolved target. The snapshot envelope is rehashed by the Task 2 rule, including this complete closed payload and its exact `source_refs`; its verification mode and receipt obey the Task 2 snapshot contract. These equations make the optional metadata resolver-free and prevent a caller from laundering quarantined wording through an asserted project-owned snapshot.

Each referenced append event has exact event type `feature_source_recorded` and this exact closed payload:

```ts
interface FeatureSourceRecordedPayload {
  contract_version: "contentmd.feature-source-append/0.1.0";
  project_id: string;
  source_ref: DigestRef;
  source_role: FeatureSourceRole;
  source_class: AllowedLearningSourceClass;
  rights_state: "training_permitted";
}
```

The event payload project must equal the manifest and store-binding project. The entry's stream ID, event ID, sequence, event digest, source ref, role, class, and rights must equal the complete event and its payload. Event schema version is `0.1.0`, data class is `learning_feature_source`, and `actor_ref` is the non-authorizing literal `contentmd.task3-development-fixture-recorder`. Stream and event IDs are derived, never caller labels:

```text
stream_id = "feature-source-stream." + sha256Canonical({
  contract_version: "contentmd.feature-source-stream-identity/0.1.0",
  store_binding_digest,
  project_id,
  source_role
})

event_id = "feature-source-recorded." + sha256Canonical({
  contract_version: "contentmd.feature-source-event-identity/0.1.0",
  store_binding_digest,
  stream_id,
  source_ref,
  source_role,
  source_class,
  rights_state
})
```

Each manifest entry's locator must use these derived values. Browser, competitor, third-party, nonconforming, unknown, blocking-only, prohibited, or unknown-rights material is invalid as a feature-source manifest entry.

### 6.2 Prefix, receipt, and checkpoint set

```ts
interface StreamCheckpointReceipt {
  contract_version: "contentmd.stream-checkpoint-receipt/0.1.0";
  store_binding_digest: Digest;
  stream_id: string;
  maximum_sequence: number;
  head_event_id: string | null;
  head_event_digest: Digest | null;
  prefix_digest: Digest;
  feature_source_manifest_digest: Digest;
  verification_method: "complete-prefix-sha256-chain";
  verified_at: string;
  receipt_digest: Digest;
}

interface FeatureSourceStreamCheckpoint {
  stream_id: string;
  maximum_sequence: number;
  head_event_id: string | null;
  head_event_digest: Digest | null;
  complete_prefix: StoredEvent[];
  prefix_digest: Digest;
  receipt: StreamCheckpointReceipt;
}

interface FeatureSourceCheckpointSet {
  contract_version: "contentmd.feature-source-checkpoint-set/0.1.0";
  checkpoint_set_id: string;
  record_mode: "development_fixture" | "official";
  store_binding: StoreBindingWitness;
  feature_source_manifest: FeatureSourceManifest;
  streams: [FeatureSourceStreamCheckpoint, ...FeatureSourceStreamCheckpoint[]];
  checkpoint_set_digest: Digest;
}

interface PostCheckpointStreamObservation {
  stream_id: string;
  checkpoint_maximum_sequence: number;
  checkpoint_head_event_digest: Digest | null;
  observed_head_sequence: number;
  observed_head_event_id: string;
  observed_head_event_digest: Digest;
  complete_suffix: [StoredEvent, ...StoredEvent[]];
  suffix_digest: Digest;
}

interface FeatureSourcePostCheckpointObservation {
  contract_version: "contentmd.feature-source-post-checkpoint-observation/0.1.0";
  observation_id: string;
  store_binding_digest: Digest;
  observed_at: string;
  streams: [PostCheckpointStreamObservation, ...PostCheckpointStreamObservation[]];
  observed_entries: [FeatureSourceManifestEntry, ...FeatureSourceManifestEntry[]];
  observation_digest: Digest;
}
```

Event sequences are positive JavaScript safe integers; checkpoint maximum sequences are nonnegative JavaScript safe integers. For one stream, `maximum_sequence === 0` if and only if `complete_prefix` is empty and both head fields are null. For a positive maximum, the complete prefix begins at sequence `1`, increases by exactly one through the declared maximum, uses one stream ID, has null predecessor at sequence `1`, and otherwise has predecessor equal to the prior event digest; both head fields are non-null and equal the final event. Every event satisfies the store schema, project, derived stream role, event-ID derivation, and closed payload contract, and every event digest is recomputed from every `StoredEvent` field except `event_digest`. Event IDs and event digests are unique across all checkpoint prefixes.

The prefix digest is exactly:

```text
sha256Canonical({
  contract_version: "contentmd.feature-source-prefix/0.1.0",
  stream_id,
  maximum_sequence,
  complete_prefix
})
```

The receipt digest is `sha256Canonical()` over every receipt field except `receipt_digest`. The receipt must bind the same store, stream, maximum sequence, head, prefix digest, and feature-source manifest digest. `verified_at` is descriptive and not an ordering proof.

Checkpoint streams are unique and sorted by `stream_id`. They are exactly the ten stream IDs obtained by applying the section 6.1 derivation to every `FeatureSourceRole` in its declared order and then sorting the resulting IDs. A role with no event at the checkpoint therefore has an explicit zero-head stream. Every feature-manifest entry resolves to exactly one byte-identical complete event in its role stream's prefix at a sequence less than or equal to that stream's maximum. A manifest entry above the maximum, absent from the prefix, or mismatched at its sequence is an integrity failure. Prefixes may contain other valid project-owned feature-source events in the same role stream; they are append-history witnesses, not an instruction to use every event. Manifest completeness for admission is proved by the exact presentation-to-manifest set comparison in section 6.3.

`FeatureSourcePostCheckpointObservation` is a separate negative temporal witness. It is never a checkpoint-set field, never changes a checkpoint ref or receipt, and is never included in a presentation snapshot. Its store-binding digest equals the supplied checkpoint set. Streams and observed entries are unique and sorted by `stream_id` and `source_ref`, respectively. Each observation stream corresponds to exactly one checkpoint stream and copies its maximum and head digest. Its nonempty suffix begins at `checkpoint_maximum_sequence + 1`, increases by exactly one through the observed head sequence, uses the same derived stream, and chains from the checkpoint head; when the checkpoint head is null, the first suffix event has sequence `1` and a null predecessor. The observed head ID and digest equal the final suffix event. Every suffix event passes the same store/event/payload checks as a prefix event. Event IDs and event digests are unique across all prefixes and suffixes in the example.

Observation streams are exactly the stream set required by `observed_entries`. Every observed entry resolves to one byte-identical suffix event, has a sequence above its copied checkpoint maximum, is absent from the checkpoint manifest, and passes the section 6.1 material, role, source-class, rights, locator, project, and optional-feature equations. Intermediate suffix events need not be observed entries but must be valid project-owned feature-source events. The suffix digest is exact:

```text
sha256Canonical({
  contract_version: "contentmd.feature-source-post-checkpoint-suffix/0.1.0",
  stream_id,
  checkpoint_maximum_sequence,
  checkpoint_head_event_digest,
  observed_head_sequence,
  complete_suffix
})
```

The observation identity preimage contains `contract_version`, `store_binding_digest`, `observed_at`, `streams`, and `observed_entries`, excluding only its ID and digest. `observation_id = "feature-source-post-checkpoint-observation." + sha256Canonical(identity_preimage)`. `observation_digest = sha256Canonical()` over every observation field except itself, including the derived ID. `observed_at` is a strict descriptive timestamp and is never ordering authority. The observation's exact non-record ref uses schema ID `contentmd.feature-source-post-checkpoint-observation` and version `0.1.0`.

The checkpoint-set identity preimage excludes both its ID and digest:

```text
{
  contract_version: "contentmd.feature-source-checkpoint-set-identity/0.1.0",
  record_mode,
  store_binding,
  feature_source_manifest,
  streams
}
```

`checkpoint_set_id = "feature-source-checkpoint-set." + sha256Canonical(identity_preimage)`. The content preimage then contains every checkpoint-set field except `checkpoint_set_digest`; `checkpoint_set_digest = sha256Canonical(content_preimage)`. Its exact ref uses schema ID `contentmd.feature-source-checkpoint-set` and version `0.1.0`.

### 6.3 Before-presentation proof

For one preference example, the complete checkpoint-set ref must equal `PreferenceExampleRecord.payload.feature_source_checkpoint_set_ref`. The same ref must appear exactly once in the complete Task 2 presentation snapshot's outer `source_refs`. A well-formed, digest-valid but unequal/missing binding excludes the example as `presentation_checkpoint_mismatch`; a malformed or unresolved ref is an integrity failure. This digest dependency proves the checkpoint set existed as an input to the finalized presentation snapshot; comparing `created_at`, `captured_at`, `occurred_at`, or caller time is neither required nor sufficient.

Let `presented_feature_refs` be the presentation snapshot's `source_refs` after removing its one checkpoint-set ref, and let `checkpointed_feature_refs` be the manifest entry refs. Task, context, fact set, policy, candidate A, and candidate B refs must occur in both sets with their exact roles; any additional manifested ref requires one of the other closed roles. For admission the two sets must be equal.

`post_checkpoint_observation` is null unless it proves at least one ref in `presented_feature_refs - checkpointed_feature_refs`. When non-null, its observed-entry refs are a nonempty subset of that difference, every observed entry passes section 6.2, and it contains no other ref. The difference ref is classified `feature_source_after_checkpoint` exactly when it equals an observed-entry ref; every other difference ref is `feature_source_not_manifested`. A ref in `checkpointed_feature_refs - presented_feature_refs` is also `feature_source_not_manifested`. If both conditions apply, `feature_source_after_checkpoint` has the earlier exclusion precedence. A malformed, duplicate, dangling, role-incompatible, cross-project, or invalid observation is an integrity failure; the absence of an optional valid later observation is not authority to infer append time and leaves the ref `feature_source_not_manifested`.

When the sets are equal, `post_checkpoint_observation` must be null and the feature-as-of digest is:

```text
sha256Canonical({
  contract_version: "contentmd.feature-as-of/0.1.0",
  checkpoint_set_ref,
  presentation_ref,
  feature_source_manifest_digest
})
```

It is included in the dataset input preimage and admission diagnostics, not added to the Task 1 payload. No feature-as-of digest is derived for an excluded example.

A source event appended later has a sequence beyond the frozen maximum and cannot be in the prefix. Giving that later event an earlier `occurred_at` does not change its sequence, predecessor, head, prefix, receipt, or checkpoint-set commitments. A complete post-checkpoint suffix can therefore prove `feature_source_after_checkpoint` without changing the checkpoint; the later or backdated event remains excluded and never becomes a feature.

## 7. Resolver-free leakage evidence universe

### 7.1 Complete example evidence

Every submitted preference has one closed, resolver-free bundle:

```ts
interface DatasetExampleEvidence {
  qualification_input: FeedbackQualificationInput;
  qualification: FeedbackQualificationRecord;
  eligibility_input: LearningEligibilityInput;
  eligibility: LearningEligibilityRecord;
  preference_input: PreferenceExampleInput;
  preference: PreferenceExampleRecord;
  feature_checkpoint_set: FeatureSourceCheckpointSet;
  post_checkpoint_observation: FeatureSourcePostCheckpointObservation | null;
  blocking_evidence: BlockingEvidenceRef[];
}

interface BlockingEvidenceRef {
  evidence_ref: DigestRef;
  source_class: BlockingOnlySourceClass;
  purpose: "dataset_exclusion_only";
  contains_expression: false;
}
```

The bundle carries the complete original input closure for all three Task 2 constructors. `qualification_input` therefore includes the proposal, decision event, durable decision, decision boundary, pairwise review, rubric, reviewer set, fact set, review policy, task, context, candidates, presentation, candidate lineages, adjudication, and Task 2 producer witness. `eligibility_input` includes its complete policy, permission, checks, lineages, reviewer set, decision, qualification, and producer witness. `preference_input` includes its complete decision, task, context, candidates, presentation, bare checkpoint ref, qualification, eligibility, and producer witness.

Task 3 reruns the three pure Task 2 constructors in dependency order and requires the `canonicalJson()` bytes of each reproduced durable record to equal the supplied output, including ID, scope, provenance, payload, input digest, and outer content digest. All duplicate records and snapshots appearing across the three inputs must likewise have identical canonical bytes. This independently replays the Task 2 decision rather than trusting a qualified or eligible state bit. The complete checkpoint set is then validated under section 6 and must reproduce the bare checkpoint ref. The nullable post-checkpoint observation is validated independently and used only for the negative temporal classification in section 6.3.

Both `qualification_input` lineage graphs must be transitive-complete, acyclic, fully resolved, reachable from the corresponding candidate root, and contain only `project_owned` or `project_owned_synthetic` nodes with `training_permitted` rights. The `eligibility_input.permission` must be non-null, issued, current, effective at `evaluation_at`, unexpired, unrevoked, objective/kind compatible, and cover the exact project, target scope, two candidate refs, and decision ref. Qualification must remain `qualified`, eligibility `eligible`, and preference `admitted`; all three durable records must be active and use `record_mode: development_fixture`.

`blocking_evidence` is unique and sorted. It may explain only an exclusion. It cannot be referenced by a relation node, checkpoint manifest, post-checkpoint observation, group, split, permission, feature-as-of digest, or included-example provenance. It contains no expression and does not carry a candidate expression digest. A post-checkpoint observation likewise cannot supply a feature, relation, label, permission, group input, or split input; it contains only project-owned negative append evidence for the exact presented refs that missed the checkpoint.

### 7.2 Relationship witness

Task 2 snapshots do not contain all leakage relationship families. Task 3 therefore requires an explicit complete relationship witness rather than inferring relationships from bare names.

```ts
type DeclaredLeakageReason =
  | "message_lineage"
  | "supersession"
  | "task_family"
  | "template_family"
  | "source_occurrence"
  | "locale_variant"
  | "channel_variant";

type RelationMembershipEvidencePayload =
  | { evidence_kind: "message_lineage"; semantic_subject_ref: DigestRef; member_candidate_refs: [DigestRef, ...DigestRef[]] }
  | { evidence_kind: "supersession"; predecessor_candidate_ref: DigestRef; successor_candidate_ref: DigestRef }
  | { evidence_kind: "task_family"; family_id: string; member_task_refs: [DigestRef, ...DigestRef[]] }
  | { evidence_kind: "template_family"; family_id: string; member_candidate_refs: [DigestRef, ...DigestRef[]] }
  | { evidence_kind: "source_occurrence"; occurrence_id: string; member_candidate_refs: [DigestRef, ...DigestRef[]] }
  | { evidence_kind: "locale_variant"; variant_family_id: string; context_values: [{ context_ref: DigestRef; observed_value: string }, ...Array<{ context_ref: DigestRef; observed_value: string }>] }
  | { evidence_kind: "channel_variant"; variant_family_id: string; context_values: [{ context_ref: DigestRef; observed_value: string }, ...Array<{ context_ref: DigestRef; observed_value: string }>] };

interface RelationMembershipEvidence {
  contract_version: "contentmd.relation-membership-evidence/0.1.0";
  evidence_id: string;
  evidence_version: "0.1.0";
  verification_mode: "development_fixture";
  authority_effect: "none";
  source_class: AllowedLearningSourceClass;
  rights_state: "training_permitted";
  evidence: RelationMembershipEvidencePayload;
  evidence_digest: Digest;
}

interface CompleteRelationMaterial {
  material_kind: "relation_membership_evidence";
  material_ref: DigestRef;
  source_class: AllowedLearningSourceClass;
  rights_state: "training_permitted";
  value: RelationMembershipEvidence;
}

interface RelationCandidateBinding {
  example_ref: DigestRef;
  candidate_sides: ["A"] | ["B"] | ["A", "B"];
  candidate_refs: [DigestRef, ...DigestRef[]];
}

interface RelationTaskBinding {
  example_ref: DigestRef;
  task_ref: DigestRef;
}

interface RelationContextBinding {
  example_ref: DigestRef;
  context_ref: DigestRef;
  observed_value: string;
}

type LeakageRelationBasis =
  | { basis_kind: "message_lineage"; semantic_subject_ref: DigestRef; bindings: [RelationCandidateBinding, ...RelationCandidateBinding[]]; membership_evidence_ref: DigestRef }
  | { basis_kind: "supersession"; predecessor: { example_ref: DigestRef; candidate_ref: DigestRef }; successor: { example_ref: DigestRef; candidate_ref: DigestRef }; membership_evidence_ref: DigestRef }
  | { basis_kind: "task_family"; family_id: string; bindings: [RelationTaskBinding, ...RelationTaskBinding[]]; membership_evidence_ref: DigestRef }
  | { basis_kind: "template_family"; family_id: string; bindings: [RelationCandidateBinding, ...RelationCandidateBinding[]]; membership_evidence_ref: DigestRef }
  | { basis_kind: "source_occurrence"; occurrence_id: string; bindings: [RelationCandidateBinding, ...RelationCandidateBinding[]]; membership_evidence_ref: DigestRef }
  | { basis_kind: "locale_variant"; variant_family_id: string; message_lineage_relation_id: string; bindings: [RelationContextBinding, ...RelationContextBinding[]]; membership_evidence_ref: DigestRef }
  | { basis_kind: "channel_variant"; variant_family_id: string; message_lineage_relation_id: string; bindings: [RelationContextBinding, ...RelationContextBinding[]]; membership_evidence_ref: DigestRef };

interface LeakageRelationNode {
  contract_version: "contentmd.leakage-relation/0.1.0";
  relation_id: string;
  reason: DeclaredLeakageReason;
  basis: LeakageRelationBasis;
  member_example_refs: [DigestRef, ...DigestRef[]];
  evidence_refs: [DigestRef, ...DigestRef[]];
  source_class: AllowedLearningSourceClass;
  rights_state: "training_permitted";
  relation_digest: Digest;
}

interface LeakageSubjectWitness {
  example: DatasetExampleEvidence;
  relation_ids: [string, ...string[]];
}

interface LeakageEvidenceSnapshot {
  contract_version: "contentmd.leakage-evidence-snapshot/0.1.0";
  snapshot_id: string;
  snapshot_version: "0.1.0";
  record_mode: "development_fixture" | "official";
  cohort_scope: { memory_scope: MemoryScope; project_id: string | null };
  enumeration_state: "complete";
  subjects: [LeakageSubjectWitness, ...LeakageSubjectWitness[]];
  relation_nodes: [LeakageRelationNode, ...LeakageRelationNode[]];
  additional_materials: CompleteRelationMaterial[];
  snapshot_digest: Digest;
}
```

The relation identity preimage is exactly:

```text
{
  contract_version: "contentmd.leakage-relation-identity/0.1.0",
  reason,
  basis,
  member_example_refs,
  evidence_refs,
  source_class,
  rights_state
}
```

`relation_digest = sha256Canonical(identity_preimage)` and `relation_id = "leakage-relation." + reason.replaceAll("_", "-") + "." + relation_digest`. The seven resulting reason segments are exactly `message-lineage`, `supersession`, `task-family`, `template-family`, `source-occurrence`, `locale-variant`, and `channel-variant`. `reason`, `basis.basis_kind`, and the membership evidence's `evidence_kind` must be identical. Relationship members, evidence refs, and binding arrays are sorted sets; candidate-side tuples retain A-then-B order. `evidence_refs` is exactly the one `membership_evidence_ref`. `supersession` has exactly two distinct members. Other relationship nodes may have one or more members.

The membership-evidence identity preimage is exactly `{ contract_version, evidence_version, verification_mode, authority_effect, source_class, rights_state, evidence }`. Its ID is `relation-membership-evidence.<sha256Canonical(identity_preimage)>`; its digest is `sha256Canonical()` over every evidence field except `evidence_digest`, including the derived ID. `material_ref` must reproduce that ID and digest with schema ID `contentmd.task3-relation-membership-evidence` and version `0.1.0`. This is a digest-bound non-record input witness, not a canonical project-memory record, approval, permission, or independent claim of semantic truth. It has no official variant, lifecycle, mutable state, or producer authority.

For every basis, `member_example_refs` is exactly the unique example-ref set named by its bindings or predecessor/successor pair. The membership evidence ref resolves to one complete material whose source class and rights equal the node. No caller-supplied member, family, occurrence, locale, channel, candidate, task, or context value is accepted without these set equations.

Reason-specific validation is executable and exact:

| Reason | Required equations |
| --- | --- |
| `message_lineage` | Each binding resolves one subject and names exact A/B candidate refs from its `qualification_input`; `candidate_sides` and `candidate_refs` are a positional bijection. The exact `semantic_subject_ref` occurs as a node in every named candidate's complete lineage snapshot. The evidence payload repeats that subject ref and the exact unique candidate-ref union. |
| `supersession` | The predecessor and successor examples and candidates are distinct and are the exact two node members. The successor candidate's complete lineage root has the predecessor candidate ref as a direct parent. The evidence payload repeats the ordered predecessor and successor refs. |
| `task_family` | Every binding uses its subject's exact Task 2 task snapshot ref. The evidence payload repeats `family_id` and the exact unique task-ref set. |
| `template_family` | Every binding names exact candidate refs from its subject. The evidence payload repeats `family_id` and the exact unique candidate-ref union. |
| `source_occurrence` | Every binding names exact candidate refs from its subject. The evidence payload repeats `occurrence_id` and the exact unique candidate-ref union. |
| `locale_variant` | `message_lineage_relation_id` resolves to a valid message-lineage node containing every member. Each binding uses its exact context snapshot ref and `observed_value` equals that context payload's locale. Evidence `context_values` is the exact unique `(context_ref, observed_value)` projection of the bindings, sorted by context ref. A node with two or more members has at least two distinct locales. |
| `channel_variant` | The same message-lineage rule applies; each observed value instead equals the exact context channel, and a multi-member node has at least two distinct channels. Evidence `context_values` is the exact unique `(context_ref, observed_value)` projection, sorted by context ref. |

Family and occurrence IDs are opaque stable identifiers, never raw expression text. Their only accepted proof is the complete digest-valid membership-evidence witness above. Development fixtures can test the mechanism but confer no truth authority; official relation issuance remains unavailable.

Subjects are unique and sorted by preference ref. Relation nodes are unique and sorted by relation ID. Additional materials are unique and sorted by material ref. Each additional membership witness rehashes to its exact ref, has matching wrapper and evidence source class/rights, and satisfies the reason-specific equations above. Every relation member resolves to exactly one subject; every relation evidence ref resolves to exactly one `additional_materials` witness; every subject relation ID resolves to one node that contains that subject; and the reverse node-to-subject membership is exact. Every subject belongs to at least one valid `message_lineage` node. Dangling endpoints, basis IDs, material refs, or one-sided memberships are malformed.

The snapshot identity preimage contains `contract_version`, `snapshot_version`, `record_mode`, `cohort_scope`, `enumeration_state`, `subjects`, `relation_nodes`, and `additional_materials`, but excludes `snapshot_id` and `snapshot_digest`. `snapshot_id = "leakage-evidence." + sha256Canonical(identity_preimage)`. The content digest is SHA-256 canonical JSON over every snapshot field except `snapshot_digest`. Its exact ref uses schema ID `contentmd.task3-leakage-evidence-snapshot` and version `0.1.0`.

`cohort_scope` is an input boundary, not caller authority: every admitted example must already carry that exact memory scope and project ID. A mismatch excludes the example and can never widen it. `enumeration_state: "complete"` asserts that the supplied subjects are the entire bounded candidate universe and that the nodes enumerate every known declared relation among them. This assertion has no authority in development mode. Official mode remains unavailable until a canonical resolver can prove the enumeration.

## 8. Transitive groups, edges, identity, and split

### 8.1 Graph derivation

Only examples admitted by section 9.1 participate in graph construction. Examples excluded by a pre-normalization condition are never normalized; an example found empty by normalization is removed before pair comparison. No excluded example can bridge components.

For each declared relation node, generate an undirected direct relation for every unordered pair of distinct admitted members. Then evaluate near-duplicate similarity for every unordered pair of admitted examples. Union all direct relations with union-find. Processing order cannot affect the final partition.

An output edge is one `(left_ref, right_ref, reason)` triple per distinct reason connecting a pair:

- orient distinct endpoints so the lower canonical JSON bytes are `left_ref`;
- retain separate edges when the same pair has multiple reasons;
- collapse duplicate assertions with the same endpoints and reason;
- sort edges by canonical bytes of `left_ref`, then `right_ref`, then this exact reason order: `message_lineage`, `supersession`, `task_family`, `template_family`, `source_occurrence`, `locale_variant`, `channel_variant`, `near_duplicate`.

All direct edges for a component are stored; transitive closure edges are not invented.

For a singleton component, `edges` is exactly empty. The subject's lexically first valid `message_lineage` relation must still contain that subject, pass every evidence check, and appear in the component's contributing relation nodes, relation commitments, and provenance. It is not serialized as an edge because no pair of distinct examples exists. Every serialized edge has distinct endpoints; reflexive edges are always forbidden.

The partition equations are exact:

- every admitted example appears in exactly one component;
- component member sets are pairwise disjoint;
- the union of component member sets equals the admitted-example set;
- every edge has two distinct endpoints that are members of the same component;
- every singleton component has an empty edge set;
- every component with more than one member is connected by its stored direct edges; and
- no excluded example, blocking-only ref, browser/competitor/third-party material, or candidate ref appears as a member.

### 8.2 Group identity without split circularity

The group identity preimage is exactly:

```text
{
  contract_version: "contentmd.leakage-group-identity/0.1.0",
  rule_version: "contentmd.leakage-group/0.1.0",
  ranking_objective: "expression_preference",
  candidate_kind: "expression",
  producer_manifest_digest,
  normalization_artifact_refs,
  member_refs,
  relation_commitments,
  edges
}
```

`relation_commitments` is the unique sorted set `{ relation_id, relation_digest, evidence_refs }` for every contributing declared relation node; `evidence_refs` is its exact sorted ref set. Computed similarity is already committed by member refs, normalization refs, producer manifest, and its stored `near_duplicate` edge. All arrays are in their canonical orders from this addendum. `group_identity_digest = sha256Canonical(preimage)` and the record ID is exactly `leakage-group.<group_identity_digest>`.

The producer-manifest digest is recomputed from the complete leakage-group producer witness under section 4. The identity excludes bucket, split, outer record envelope, outer `content_digest`, the raw producer witness, verification receipt, capture time, and unrelated components. Adding an unrelated component or refreshing a receipt for identical producer bytes therefore does not rename or reassign this group. Changing producer bytes, membership, a contributing relation/evidence commitment, an edge, the rule version, or one of the three normalization artifacts creates a new identity. If one bounded call derives the same group ID twice with different content, Task 3 fails with `task3_contract_invalid:group_identity`; it never overwrites or increments the record version. A later store contract must independently enforce the same ID/content collision rule on append and require a rule-version change before semantically different producer logic can issue the same identity.

Only after the full group ID exists is the split calculated. The raw split preimage is the UTF-8 byte concatenation:

```text
contentmd.learning-split/0.1.0\0<full leakage-group record ID>
```

The separator is one zero byte, not the two printable characters `\` and `0`; there is no trailing LF or NUL. Let `h` be the SHA-256 bytes interpreted as one unsigned 256-bit big-endian integer. Compute `bucket = floor(h * 100 / 2^256)` using exact integer arithmetic. Buckets `0..79` map to train, `80..89` to validation, and `90..99` to test. Modulo, floating point, platform integer truncation, signed interpretation, and hashing only the identity digest are forbidden.

### 8.3 Group record input and output

The component evidence projection is the exact closed object below. It excludes unrelated subjects and relations.

```ts
interface CandidateSimilarityTrace {
  left_side: "A" | "B";
  right_side: "A" | "B";
  left_normalized_scalars: number[];
  right_normalized_scalars: number[];
  left_trigram_keys: string[];
  right_trigram_keys: string[];
  intersection_size: number;
  union_size: number;
  near_duplicate: boolean;
}

interface ExamplePairSimilarityTrace {
  left_example_ref: DigestRef;
  right_example_ref: DigestRef;
  comparisons: [CandidateSimilarityTrace, CandidateSimilarityTrace, CandidateSimilarityTrace, CandidateSimilarityTrace];
  near_duplicate: boolean;
  trace_digest: Digest;
}

interface AdmittedGroupingEvidence {
  qualification_input: FeedbackQualificationInput;
  qualification: FeedbackQualificationRecord;
  eligibility_input: LearningEligibilityInput;
  eligibility: LearningEligibilityRecord;
  preference_input: PreferenceExampleInput;
  preference: PreferenceExampleRecord;
  feature_checkpoint_set: FeatureSourceCheckpointSet;
}

interface ComponentSubjectProjection {
  example: AdmittedGroupingEvidence;
  contributing_relation_ids: string[];
}

interface ComponentEvidenceProjection {
  contract_version: "contentmd.leakage-component-evidence/0.1.0";
  projection_id: string;
  subjects: [ComponentSubjectProjection, ...ComponentSubjectProjection[]];
  contributing_relation_nodes: LeakageRelationNode[];
  contributing_additional_materials: CompleteRelationMaterial[];
  normalization_artifacts: {
    normalization: FrozenUnicodeArtifactWitness;
    casefold: FrozenUnicodeArtifactWitness;
    whitespace: FrozenUnicodeArtifactWitness;
  };
  pair_similarity_traces: ExamplePairSimilarityTrace[];
  projection_digest: Digest;
}
```

Subjects are exactly the sorted component members. `AdmittedGroupingEvidence` is the byte-identical field projection of the submitted `DatasetExampleEvidence` after removing `post_checkpoint_observation` and `blocking_evidence`; admission guarantees the latter is empty and the former is null. These negative-only fields can never change group identity or content. Each contributing-relation ID is the sorted intersection of that subject's full relation IDs and the nodes that contributed a stored edge or, for a singleton, the required lexically first committed message-lineage relation; it may be empty for a component connected only by near duplication. Relation nodes are exactly those contributing nodes. Additional materials are exactly the sorted closure of those nodes' non-subject evidence. Section 9.1's fixed-point closure guarantees that every contributing node contains admitted members only; a node or evidence payload naming an excluded example or its candidate/task/context ref is forbidden in a component projection. Pair traces contain every unordered distinct member pair, endpoints canonically oriented and sorted. Each trace's four comparisons retain the exact order `A/A`, `A/B`, `B/A`, `B/B`; scalar arrays are ordered, trigram arrays are lexical sets, and integer sizes are recomputed. `trace_digest = sha256Canonical()` over every pair-trace field except itself, and its evidence ID is `near-duplicate-trace.<trace_digest>`. A singleton has an empty pair trace.

The projection identity preimage contains every projection field except `projection_id` and `projection_digest`. `projection_id = "leakage-component-evidence." + sha256Canonical(identity_preimage)`. `projection_digest = sha256Canonical()` over every projection field except itself, now including the derived ID. Its exact ref uses schema ID `contentmd.task3-leakage-component-evidence` and version `0.1.0`. It deliberately contains no whole-universe snapshot ref, capture time, unrelated subject, or unrelated relation, so adding an unrelated component cannot change an existing group's input digest or provenance.

The group input digest is:

```text
sha256Canonical({
  contract_version: "contentmd.leakage-group-input/0.1.0",
  record_mode,
  producer_manifest_digest,
  derived_output_scope,
  component_evidence_projection,
  group_identity_digest,
  bucket,
  split
})
```

The `LeakageGroupRecord` uses record version `1`, lifecycle `active`, `record_mode: development_fixture`, objective `expression_preference`, kind `expression`, authority `none`, the producer schema/code digests, and this input digest. Its payload maps the exact rule version, three normalization refs, sorted member refs, sorted edges, bucket, split, and `group_state: frozen`.

All member preferences must have identical `memory_scope` and `project_id`. Group scope uses those values, sorted member record IDs as `resource_refs`, and the sorted union of member `data_classes`. A cross-scope edge is an integrity failure, not a widening operation.

Group provenance contains the component evidence projection as `leakage_component_evidence`; every member preference as `member_example`; every contributing declared relation node as `leakage_relationship`; every contributing membership witness as `leakage_relationship_evidence`; every true near-duplicate trace as `leakage_relationship`; the three Unicode artifacts as `normalization_artifact`; and each distinct member checkpoint set as `feature_source_checkpoint_set`. Declared-relation provenance uses `(relation_id, relation_digest)`; membership-evidence provenance uses `(evidence_id, evidence_digest)`; computed-relation provenance uses `(near-duplicate-trace.<trace_digest>, trace_digest)`. The producer witness and any verification receipt are validated before issuance, but only the stable producer-manifest/schema/code digests enter the group; a descriptive receipt cannot create same-ID/different-content drift. No whole-universe snapshot, candidate expression, unrelated subject, or blocking-only ref is copied into group provenance.

## 9. Dataset admission, exclusions, and exact equations

### 9.1 Per-example admission and exclusion precedence

After structural and cryptographic validation, Task 3 re-evaluates each submitted example at `evaluation_at`. An example is included only when every condition below passes:

- qualification is active and `qualified` with A or B;
- eligibility is active and `eligible`;
- preference is active and `admitted`, with its label still matching its preferred side;
- objective and candidate kind are exact across all records and witnesses;
- decision, task, context, candidates, presentation, reviewer set, lineages, policy, permission, and checks reproduce the Task 2 bindings;
- memory scope and project are compatible with the exact dataset cohort;
- permission is current and effective under section 7.1;
- both lineages remain complete, project-owned or project-owned-synthetic, and training-permitted;
- no blocking-only source occurs in candidates, relations, features, or lineage;
- the checkpoint set, feature manifest, zero-head or complete event prefixes, receipts, before-presentation membership, null post-checkpoint observation, and feature-as-of digest all validate; and
- both candidate expressions normalize to nonempty scalar sequences.

An included example therefore has an empty `blocking_evidence` array. A nonempty blocking array deterministically excludes it as `forbidden_source_class`.

Admission then closes over declared relations before pair comparison. First derive every non-normalization failure. Normalize only the remaining provisional admissions and add `normalized_expression_empty` where applicable. If any declared relation node then contains both a provisionally admitted member and an excluded member, add `leakage_relation_not_closed` to every provisionally admitted member of that node; recompute until a fixed point. Initial failures retain their own earlier reason; a member excluded only by propagation stores `leakage_relation_not_closed`. This conservative closure makes every declared relation node either wholly admitted or wholly excluded, prevents an excluded subject from changing a surviving group's evidence/content under the same semantic group ID, and prevents excluded refs from entering group provenance. Computed near-duplicate relations are evaluated only after this closure and do not propagate exclusion.

The top-level input, the three Task 2 derivation inputs, every Task 2 durable output, the checkpoint set, and the leakage snapshot must use `development_fixture`; a mismatch is a reference-integrity failure. Task 2 evidence snapshots do not have `record_mode`: each snapshot instead satisfies its own exact Task 2 `development_fixture` or `resolver_verified` verification-mode and receipt rules during constructor replay. Digest, shape, reference, event-chain, receipt, Unicode-artifact, relation-universe, or canonical-order failures are integrity failures and stop the whole call without records. Verified substantive failures exclude only that example. Because `DatasetExclusion` has one reason string, the first applicable reason in this exact precedence is stored:

```text
record_not_active
preference_not_admitted
qualification_not_qualified
eligibility_not_eligible
objective_or_candidate_kind_mismatch
scope_or_project_mismatch
permission_not_current
permission_not_effective
permission_scope_or_subject_mismatch
lineage_not_learning_eligible
forbidden_source_class
presentation_checkpoint_mismatch
feature_source_after_checkpoint
feature_source_not_manifested
normalized_expression_empty
leakage_relation_not_closed
```

Each submitted preference appears at most once in exclusions. Additional applicable reasons remain in the non-record diagnostic trace, ordered by this vocabulary. Browser, competitor, and third-party failures use `forbidden_source_class`; only their bounded `blocking_evidence` refs may appear in exclusion provenance. Their expressions, expression digests, candidate refs, and feature refs do not appear in a group or split.

### 9.2 Manifest set equations

For an issued manifest:

- `example_refs` is exactly the unique sorted set of included preference refs, not all submissions;
- `exclusions` is exactly one entry for every submitted preference not in `example_refs`, sorted by example ref, and contains no included preference;
- submitted preference refs equal the disjoint union of `example_refs` and exclusion example refs;
- `leakage_group_refs` is exactly the group records produced from included examples;
- every included example is a member of exactly one referenced group;
- every referenced group has at least one included member and contains no excluded member;
- train, validation, and test example refs are pairwise disjoint and their union equals `example_refs`;
- an included example appears in the split of its one leakage group;
- every declared relation or computed near-duplicate between included examples has both endpoints in the same referenced group and therefore the same split;
- `permission_refs` is the unique sorted set of outer learning-permission snapshot refs for included examples only; and
- `feature_source_checkpoint_refs` is the unique sorted set of complete checkpoint-set refs for included examples only.

`DatasetCounts` is recomputed exactly:

```text
examples = example_refs.length
groups = leakage_group_refs.length
train_examples = train_example_refs.length
train_groups = distinct referenced groups assigned train
validation_examples = validation_example_refs.length
validation_groups = distinct referenced groups assigned validation
test_examples = test_example_refs.length
test_groups = distinct referenced groups assigned test
```

Every count is a nonnegative JavaScript safe integer. Caller-supplied counts, split membership, or state are not accepted.

### 9.3 Thresholds, diagnostics, and states

An unsealed dataset is `training_eligible` exactly when all predicates pass:

```text
examples >= 100
groups >= 30
train_examples >= 1
train_groups >= 1
validation_examples >= 20
validation_groups >= 5
test_examples >= 20
test_groups >= 5
```

If all three splits and their group sets are nonempty but at least one threshold fails, the issued manifest is `diagnostics_only`. `training_eligible` and `diagnostics_only` both use `test_open_state: not_applicable`.

If there is no included example, no group, or any split has zero examples or zero groups, a Task 1 manifest cannot represent the result. The function returns `manifest: null` plus a non-record `DatasetBuildDiagnostics`; it does not insert sentinels or emit a malformed durable record. The closed diagnostic reason order is:

```text
no_included_examples
no_leakage_groups
train_split_empty
validation_split_empty
test_split_empty
training_pair_threshold
training_group_threshold
validation_pair_threshold
validation_group_threshold
test_pair_threshold
test_group_threshold
```

```ts
interface DatasetBuildDiagnostics {
  contract_version: "contentmd.dataset-build-diagnostics/0.1.0";
  diagnostics_id: string;
  input_digest: Digest;
  submitted_examples: number;
  included_examples: number;
  excluded_examples: number;
  counts: DatasetCounts;
  threshold_results: [{ predicate: string; passed: boolean }, ...Array<{ predicate: string; passed: boolean }>];
  reason_codes: string[];
  issuance_disposition: "manifest_issued" | "manifest_unissued_structural_empty";
  diagnostics_digest: Digest;
}
```

`input_digest` equals the one dataset-input digest derived by section 9.4 for the same validated call, whether or not a manifest is representable. `submitted_examples = leakage_evidence.subjects.length`; `included_examples = counts.examples`; `excluded_examples` equals both the derived exclusion-array length and `submitted_examples - included_examples`. The same section 9.2 count equations are evaluated even when no manifest is issued. `issuance_disposition` is `manifest_issued` if and only if `manifest` is non-null; it is `manifest_unissued_structural_empty` if and only if at least one structural-empty predicate applies and `manifest` is null. The diagnostics identity preimage is every field except `diagnostics_id` and `diagnostics_digest`; the ID is `dataset-diagnostics.<sha256Canonical(identity_preimage)>`. The diagnostics digest then hashes every field except itself. Diagnostics have no durable-record envelope, no authority, and are not a dataset ref.

`threshold_results` uses these exact predicate names and order: `examples_at_least_100`, `groups_at_least_30`, `train_examples_at_least_1`, `train_groups_at_least_1`, `validation_examples_at_least_20`, `validation_groups_at_least_5`, `test_examples_at_least_20`, and `test_groups_at_least_5`. A training-eligible issued result has no diagnostic reasons. A diagnostics-only issued result carries exactly its failed threshold reason codes. A structurally empty result carries the applicable structural-empty reasons followed by the applicable threshold reasons, all in the order above.

Reason predicates are exact: `no_included_examples` iff `examples === 0`; `no_leakage_groups` iff `groups === 0`; each `<split>_split_empty` iff either that split's example count or group count is zero; `training_pair_threshold` iff `examples < 100`; `training_group_threshold` iff `groups < 30`; and the validation/test pair/group reasons correspond to their `< 20` and `< 5` predicates. Failed train nonempty predicates are represented only by `train_split_empty`, not a duplicate threshold reason. A zero-example result therefore reports every applicable structural and threshold reason rather than stopping after the first.

State pairs are exact:

| `dataset_state` | `test_open_state` | Issued by Task 3 | Meaning |
| --- | --- | --- | --- |
| `diagnostics_only` | `not_applicable` | yes | structurally complete, below at least one threshold, never promotable |
| `training_eligible` | `not_applicable` | yes | thresholds pass, not yet sealed |
| `sealed` | `sealed` | yes, only by `sealLearningDataset` | exact membership frozen; test remains unopened |
| `test_opened` | `opened` | no | reserved for the one-shot later evaluation contract |
| `invalid` | `not_applicable` | no | reserved for a later immutable invalidation record |

The only Task 3 transitions are `no manifest -> diagnostics_only`, `no manifest -> training_eligible`, and `training_eligible -> sealed`. Each arrow issues a new immutable record except the structurally empty diagnostics result, which issues no manifest. Task 3 never changes or deletes an earlier record, never seals `diagnostics_only`, and never transitions from `sealed`. Later revocation or corrected evidence requires a new dataset build; it does not rewrite the prior manifest.

### 9.4 Dataset build input, identity, scope, and provenance

```ts
interface BuildLearningDatasetInput {
  record_mode: "development_fixture" | "official";
  evaluation_at: string;
  group_producer: Task3ProducerArtifactWitness;
  dataset_producer: Task3ProducerArtifactWitness;
  unicode_artifacts: UnicodeArtifactBundle;
  leakage_evidence: LeakageEvidenceSnapshot;
}

interface LearningDatasetBuildResult {
  groups: LeakageGroupRecord[];
  manifest: LearningDatasetManifest | null;
  diagnostics: DatasetBuildDiagnostics;
}
```

The builder derives pre-normalization exclusions, normalized-empty exclusions, and the declared-relation fixed point before pair comparison and grouping, invokes the one Task 3 grouping algorithm over the included examples, and revalidates every returned group before constructing the manifest.

The manifest input digest is exactly:

```text
sha256Canonical({
  contract_version: "contentmd.learning-dataset-input/0.1.0",
  record_mode,
  evaluation_at,
  dataset_producer,
  group_producer_manifest_digest,
  unicode_artifact_refs,
  leakage_evidence,
  derived_output_scope,
  derived_feature_as_of_entries
})
```

`group_producer_manifest_digest` is recomputed from the complete group producer witness under section 4. `unicode_artifact_refs` is the exact five-ref set from the verified bundle, sorted by artifact ID. `derived_feature_as_of_entries` is the exact sorted set of `{ example_ref, feature_as_of_digest }` for included examples only; excluded examples contribute no entry. `derived_output_scope` is the exact included-example scope below; when no example is included, it is the diagnostic-only object `{ memory_scope: leakage_evidence.cohort_scope.memory_scope, project_id: leakage_evidence.cohort_scope.project_id, resource_refs: [], data_classes: [] }` and is never used to issue a record. Derived output fields and the outer content digest are excluded. This derived digest is also `DatasetBuildDiagnostics.input_digest`. The record ID is `learning-dataset.<input_digest>`.

All included preferences must share exact memory scope and project ID. Dataset scope uses those values, the sorted included preference record IDs as `resource_refs`, and the sorted union of their data classes. The manifest uses record version `1`, lifecycle `active`, development-fixture mode, objective `expression_preference`, candidate kind `expression`, authority `none`, and schema/code digests from the dataset producer.

Manifest provenance contains the leakage-evidence snapshot as `leakage_evidence_snapshot`; every group as `leakage_group`; every included preference as `preference_example`; every excluded preference as `excluded_example`; every included permission snapshot as `learning_permission`; every included checkpoint set as `feature_source_checkpoint_set`; every non-null excluded-example observation as `post_checkpoint_observation`; every bounded exclusion-only ref as `blocking_evidence`; the normalization, case-fold, and whitespace artifacts as `normalization_artifact`; the word-break artifact as `word_break_artifact`; the grapheme-break artifact as `grapheme_break_artifact`; and a dataset-producer receipt as `producer_verification` only when that witness carries one. Observation provenance uses `(observation_id, observation_digest)` and cannot have another relationship. Blocking evidence cannot have another relationship. Neither negative witness is copied into a group or included-example provenance.

## 10. Sealing without test opening

Task 3 sealing is a deterministic immutable commitment, not approval and not test access.

```ts
interface DatasetSealWitness {
  contract_version: "contentmd.dataset-seal-witness/0.1.0";
  source_dataset_ref: DigestRef;
  sealed_at: string;
  membership_digest: Digest;
  verification_mode: "development_fixture" | "readback_verified";
  verification_receipt: VerificationReceiptRecord | null;
  seal_digest: Digest;
}

interface SealLearningDatasetInput {
  record_mode: "development_fixture" | "official";
  producer: Task3ProducerArtifactWitness;
  source_manifest: LearningDatasetManifest;
  witness: DatasetSealWitness;
}
```

The membership digest is:

```text
sha256Canonical({
  contract_version: "contentmd.learning-dataset-membership/0.1.0",
  example_refs,
  exclusions,
  leakage_group_refs,
  train_example_refs,
  validation_example_refs,
  test_example_refs,
  permission_refs,
  feature_source_checkpoint_refs,
  counts
})
```

The seal digest hashes `contract_version`, exact source manifest ref, `sealed_at`, membership digest, and verification mode; it excludes the verification receipt and itself. Development-fixture verification requires a null receipt. `readback_verified` requires a digest-valid passed receipt with record ID `verification-receipt.dataset-seal.<seal_digest>`, schema/version `contentmd.verification-receipt-record@0.1.0`, record version `1`, lifecycle `active`, empty provenance, and exact scope `{ memory_scope: "task", project_id: null, resource_refs: [target_path], data_classes: ["verification_metadata"] }`. Its transaction is `dataset-seal.<seal_digest>`, target path is `contentmd://task3/dataset-seal/${source_manifest.record_id}`, expected and observed digests equal the membership digest, `verified_at` is a strict descriptive timestamp, and method is `sha256-canonical-readback`. It still cannot authorize official issuance.

The source must be a complete digest-valid active `training_eligible` manifest with `test_open_state: not_applicable`. The sealed output copies membership, exclusions, refs, counts, scope, objective, and kind byte-for-byte, changes only the shared producer/input identity fields plus `dataset_state: sealed` and `test_open_state: sealed`, and uses the exact union of the source manifest's provenance plus the source manifest as `prior_dataset_manifest`, the seal witness as `dataset_seal`, and a current producer receipt as `producer_verification` only when the witness carries one. The seal-witness provenance ID is `dataset-seal.<seal_digest>` and its provenance content digest is `seal_digest`. The union is deduplicated and canonically sorted.

The seal input digest is:

```text
sha256Canonical({
  contract_version: "contentmd.learning-dataset-seal-input/0.1.0",
  record_mode,
  producer,
  source_manifest,
  witness,
  derived_output_scope
})
```

The sealed record ID is `learning-dataset.<input_digest>`, record version is `1`, lifecycle is `active`, and authority is `none`. The source record is never mutated. Task 3 exposes no function that opens the test set or changes `test_open_state` to `opened`.

## 11. Error and non-issuance contract

```ts
class Task3ContractError extends TypeError {
  readonly code: string;
  constructor(code: string) {
    super(code);
    this.name = "Task3ContractError";
    this.code = code;
  }
}
```

Task 3 descriptor-prevalidates the complete Task 2 input/output closure before replay. It then catches only a `Task2ContractError`, reads its exact `code`, and throws a new `Task3ContractError` using this total translation:

| Task 2 code or suffix | Task 3 suffix |
| --- | --- |
| `task2_contract_invalid:input_shape` | `input_shape` |
| `task2_contract_invalid:canonical_value` | `canonical_value` |
| `task2_contract_invalid:timestamp` | `timestamp` |
| `task2_contract_invalid:record_id` | `record_id` |
| `task2_contract_invalid:schema_id` | `schema_id` |
| `task2_contract_invalid:digest`, `task2_contract_invalid:event_digest`, `task2_contract_invalid:boundary_digest`, or `task2_contract_invalid:expression_digest` | `digest` |
| `task2_contract_invalid:durable_record_digest` | `durable_record_digest` |
| `task2_contract_invalid:snapshot_digest` | `snapshot_digest` |
| `task2_contract_invalid:receipt_digest` | `receipt_digest` |
| `task2_contract_invalid:receipt_binding` | `receipt_binding` |
| `task2_contract_invalid:producer_artifact` | `producer_artifact` |
| `task2_contract_invalid:producer_manifest` | `producer_manifest` |
| `task2_contract_invalid:reference_integrity` or `task2_contract_invalid:lineage_graph` | `reference_integrity` |
| `task2_contract_invalid:set_uniqueness_or_order` | `set_uniqueness_or_order` |
| `task2_contract_invalid:official_mode_not_supported` | `official_mode_not_supported` |
| any closed `learning_example_not_eligible:<suffix>` | `reference_integrity` |

Task 2 defines no other contract code. A Task 2 admission error cannot be downgraded to a Task 3 exclusion because the caller supplied a purportedly existing admitted preference that the authoritative pure constructor cannot reproduce. Task 3 never matches an error message or accepts a caller-provided error-like object. A non-`Task2ContractError` exception is an implementation failure outside the input contract and is not converted into a record or diagnostic.

Integrity failures use `task3_contract_invalid:<suffix>`. Validation stops at the first applicable check in this exact order:

```text
input_shape
official_mode_not_supported
canonical_value
timestamp
record_id
schema_id
digest
durable_record_digest
snapshot_digest
receipt_digest
receipt_binding
producer_artifact
producer_manifest
unicode_artifact
unicode_scalar
reference_integrity
set_uniqueness_or_order
scope_mismatch
checkpoint_chain
checkpoint_binding
leakage_universe
leakage_relationship
group_identity
split_assignment
dataset_partition
dataset_counts
dataset_state
provenance
```

The top-level object is checked for a readable closed shape before `official_mode_not_supported`; a malformed object cannot bypass shape validation by setting `official`. Cryptographic, closed-shape, Unicode, chain, receipt, reference, partition, or state errors are never downgraded into exclusions or diagnostics. Substantive per-example failures use the exclusion precedence in section 9.1. Structurally unrepresentable but otherwise valid dataset results use the non-record diagnostics in section 9.3.

No function catches an integrity error and emits a partial group, manifest, or sealed record. If multiple output records would be produced, the pure runtime function derives and validates all of them before returning any result to a caller. Runtime constructors perform no append or filesystem write. The build-time Unicode generator writes only the declared Unicode artifact targets and source-lock readback outputs when explicitly invoked; it never writes project memory or a learning record.

## 12. TDD and acceptance contract

Task 3 implementation begins with failing tests and is complete only when tests prove:

1. a singleton component emits `edges: []`, no self-loop, and no invented member while retaining its lexically first valid `message_lineage` witness as relation commitment, component evidence, and provenance;
2. declared multi-reason edges retain every reason, have deterministic orientation/order, and union transitively independent of input order;
3. every graph endpoint, subject, relation ID, basis ID/value, and relation-evidence ref resolves inside the closed snapshot, and dangling or incomplete relation universes fail; bounded exclusion-only blocking refs remain the sole non-resolving exception;
4. every admitted preference maps to exactly one component and partition equations hold;
5. group identity excludes bucket/split, remains stable when an unrelated component is added, and detects same-ID/different-content conflicts;
6. split fixtures verify the exact NUL byte, full group ID, unsigned big-endian integer, floor scaling, boundary buckets, and stable train/validation/test assignment;
7. Unicode fixtures cover compatibility decomposition, canonical ordering/composition, Hangul, full multi-scalar case folding, default-not-Turkic behavior, every frozen whitespace range, trimming, astral scalars, and lone-surrogate rejection;
8. trigram fixtures prove scalar rather than UTF-16 iteration, exact short-string equality, set deduplication, and integer `17/20` boundary behavior;
9. all five Unicode artifacts verify raw bytes, source-lock membership, acquisition receipt, generator digest, tables digest, range order, domain-qualified revision-47 rule order/digest, full auxiliary-property coverage, and every official word/grapheme conformance case without calling host normalization, locale casing, `Intl`, property regexes, or `\s`;
10. valid positive and zero-head complete prefixes, store binding, manifest, receipts, checkpoint set, presentation source-ref membership, and preference ref admit an example;
11. tampered heads, gaps, forks, predecessor mismatch, partial manifests, unmanifested sources, mismatched stores, and a separately bound complete post-checkpoint observation prove later and backdated-later appends without changing the frozen checkpoint ref;
12. qualification, eligibility, permission, scope, currentness, lineage, ownership, optional expression-free feature payload equations, and checkpoint conditions are independently rechecked rather than trusted from a bare preference or feature ref;
13. browser, competitor, third-party, nonconforming, prohibited, unknown, and incomplete lineage never enters normalization, a group, a split, a feature source, or an included-example provenance path, and mixed admitted/excluded declared relations close to exclusion at a deterministic fixed point;
14. submitted refs equal included plus excluded refs, split sets are disjoint and exhaustive, every example follows its group, and all counts are recomputed;
15. per-example exclusion precedence is exact and integrity failures stop the entire call;
16. zero included examples or an empty deterministic split returns `manifest: null` with digest-valid diagnostics and no sentinel data;
17. structurally nonempty below-threshold data yields `diagnostics_only`, threshold-complete data yields `training_eligible`, and neither claims sealing or promotion;
18. sealing copies exact membership, verifies its preimage and optional readback, creates a new immutable `sealed` record, and never opens the test set;
19. every output ID, scope, lifecycle, provenance relationship, schema/code/input digest, outer content digest, state pair, and error precedence matches this addendum;
20. every official request fails closed; the explicitly invoked source-acquisition script can contact only the bounded Unicode URLs in section 5.1, while constructors, generation, `--check`, and tests perform no browser, network, provider, model, training, evaluation, promotion, deployment, publication, product mutation, or store-write work.

Verification uses the repository's pinned Node 24.14.0 runtime and includes focused tests, the full suite, TypeScript build, package-boundary check, foundation verifier, artifact regeneration/readback comparison, and `git diff --check`.

## 13. Explicit deferrals

Task 3 does not:

- compute model features or use the word/grapheme artifacts for scoring;
- fit, evaluate, shadow, promote, deploy, monitor, or roll back a ranker;
- open or consume the sealed test set;
- create official records or authenticate a store, resolver, actor, or operation;
- infer approval or permission from a receipt, source class, role, timestamp, or record state;
- call a browser, model provider, Cloudflare boundary, or remote service other than the explicitly invoked bounded Unicode acquisition in section 5.1;
- copy browser, competitor, or third-party wording into any learning artifact; or
- mutate a source event, Task 2 record, prior dataset, active binding, product, or codebase outside the bounded implementation files.
