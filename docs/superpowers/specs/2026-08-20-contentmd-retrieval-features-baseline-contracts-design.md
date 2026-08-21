---
title: "content.md Retrieval, Feature, and Baseline Contracts 0.1"
status: approved-for-implementation
created: 2026-08-20
updated: 2026-08-20
design_id: CONTENTMD-RETRIEVAL-FEATURES-BASELINE-CONTRACTS-0.1
parent_design_id: CONTENTMD-LIVE-INTELLIGENCE-LEARNING-0.1
approval_basis: explicit-user-approval-in-task
implementation_authority: bounded-local-implementation
authority_effect: implementation-within-written-scope
source_documents:
  - docs/superpowers/specs/2026-08-20-contentmd-live-intelligence-learning-design.md
  - docs/superpowers/specs/2026-08-20-contentmd-learning-record-contracts-design.md
  - docs/superpowers/specs/2026-08-20-contentmd-feedback-qualification-contracts-design.md
  - docs/superpowers/specs/2026-08-20-contentmd-leakage-dataset-contracts-design.md
  - docs/superpowers/plans/2026-08-20-contentmd-recursive-learning-ranking.md
---

# content.md Retrieval, Feature, and Baseline Contracts 0.1

## 1. Purpose, authority, and boundary

This addendum freezes the executable contract for Recursive Learning Task 4. It resolves the previously open retrieval query/candidate/snapshot contract, the resolver-free values needed to calculate every feature, contextual-specificity and baseline identity, and development-fixture versus official-mode behavior.

The user approved this bounded design and directed implementation to continue. It authorizes only the Task 4 files named in the implementation plan. It does not authorize a network call, browser or provider access, model training, test-set opening, evaluation, promotion, deployment, publication, product mutation, or use of competitor wording.

All Task 4 outputs have authority effect "none". They can support development fixtures, deterministic retrieval diagnostics, feature calculation, and the frozen baseline. They do not approve a pattern, make a learning example eligible, open a held-out set, or activate a ranker.

Task 4 consumes committed Task 1 through Task 3 contracts. It does not change their schemas or reinterpret their records. In particular, a Task 3 checkpoint proves that a source reference existed before presentation; Task 4 must still receive and verify the complete value for every reference it uses.

## 2. Explicit record-model decision

Task 1 registered exactly 23 durable learning records. Task 4 does not add a twenty-fourth record.

Only FeatureProfile is a registered DurableRecord. It keeps schema ID "contentmd.feature-profile", schema version "0.1.0", feature-profile version "rank-features/0.1.0", profile state "frozen", record mode "development_fixture", and authority effect "none".

The following are resolver-free auxiliary digest objects, not DurableRecord values and not schema-registry entries:

| Object | Exact auxiliary schema ID |
| --- | --- |
| RetrievalSnapshot | contentmd.task4-retrieval-snapshot |
| RetrievalProjection | contentmd.task4-retrieval-projection |
| RetrievalProjectionEvidence | contentmd.task4-retrieval-projection-evidence |
| RetrievalDispositionEvidence | contentmd.task4-retrieval-disposition-evidence |
| ScopeMaterial | contentmd.task4-scope-material |
| FeatureMaterial | contentmd.task4-feature-material |
| FeatureUniverseManifest | contentmd.task4-feature-universe-manifest |
| CandidateRuleSet | contentmd.task4-candidate-rule-set |
| CandidateEligibilityGate | contentmd.task4-candidate-eligibility-gate |
| CandidateFeatureVector | contentmd.task4-candidate-feature-vector |
| DeterministicBaseline | contentmd.task4-deterministic-baseline |

Each auxiliary object is closed, canonical-JSON digest-bearing, immutable, resolver-free, and authority-free. A DigestRef may point to one by using the exact schema ID above, schema version "0.1.0", its derived ID as record_id, and its object digest as content_digest. Such a ref is an integrity pointer, not evidence that the object was registered, approved, or stored. LearningEvaluationRun.baseline_ref and GenerationRunRecord.retrieval_snapshot_ref may use these refs without changing either registered record schema.

## 3. Common primitives and public surface

Task 4 reuses Digest, DigestRef, ArtifactRef, RawUtf8Artifact, EvidenceSnapshot, FeatureSourceCheckpointSet, FeatureProfile, ContentPatternRecord, canonicalJson(), sha256Canonical(), finalizeRecord(), and verifyRecordDigest() from the committed contracts. The implementation may duplicate the closed structural TypeScript shape of ContentPatternRecord inside retrieval.ts to avoid adding a learning-to-research package dependency; runtime verification must still require schema ID "contentmd.content-pattern-record", schema version "0.1.0", record version 1, an active lifecycle, the exact closed payload, and a valid outer digest.

~~~ts
type Task4RecordMode = "development_fixture" | "official";
type AllowedSourceClass = "project_owned" | "project_owned_synthetic";
type QuarantinedSourceClass =
  | "browser_observed"
  | "competitor"
  | "third_party"
  | "nonconforming"
  | "unknown";

type Task4Relationship =
  | "query_source"
  | "pattern_subject"
  | "scope_projection"
  | "projection_evidence"
  | "approval_evidence"
  | "rights_evidence"
  | "freshness_evidence"
  | "dispute_evidence"
  | "checkpoint_binding"
  | "feature_universe"
  | "feature_material"
  | "feature_profile"
  | "candidate_subject"
  | "runtime_artifact"
  | "producer_verification";

type Task4ProvenanceRef =
  | {
      subject_kind: "digest_ref";
      ref: DigestRef;
      relationship: Exclude<Task4Relationship, "runtime_artifact">;
    }
  | {
      subject_kind: "artifact_ref";
      ref: ArtifactRef;
      relationship: "runtime_artifact" | "feature_universe";
    };
~~~

All objects are closed. Unknown, inherited, accessor, symbol, cyclic, non-enumerable, non-finite, or non-canonical values fail. Required strings are nonempty. Digests are exactly 64 lowercase hexadecimal characters. RFC 3339 timestamps use the repository's strict rule and are descriptive unless an explicit comparison is declared. JavaScript numbers are finite binary64 values; counts and positions are nonnegative safe integers.

Set arrays are unique and sorted by canonical JSON bytes. Token and identifier sets are unique and sorted by Unicode scalar value. Ordered tuples, feature order, score order, and producer source-path order retain their declared order. Ref equality compares all four DigestRef fields. Provenance is unique and sorted by the canonical bytes of { subject_kind, ref, relationship }.

Every auxiliary identity follows the same two-stage rule:

1. id = declared prefix plus sha256Canonical(identity preimage), where the preimage excludes both id and object digest;
2. object digest = sha256Canonical(every field except the object digest), including the derived id.

Task 4 adds these public exports from packages/learning/src/index.ts:

~~~ts
export * from "./retrieval.js";
export * from "./features.js";
export * from "./baseline.js";
~~~

The exact public functions are:

~~~ts
declare function retrieveApprovedPatterns(input: RetrievalInput): RetrievalSnapshot;
declare function verifyRetrievalSnapshot(input: VerifyRetrievalSnapshotInput): void;
declare function createFeatureProfile(input: CreateFeatureProfileInput): FeatureProfile;
declare function vectorizeCandidate(input: CandidateVectorizationInput): CandidateFeatureResult;
declare function createDeterministicBaseline(input: CreateBaselineInput): DeterministicBaseline;
declare function scoreDeterministicBaseline(input: BaselineScoreInput): BaselineCandidateScore;
declare function compareDeterministicBaseline(input: BaselinePairInput): BaselinePairResult;
declare function orderBaselineCandidates(
  input: BaselineOrderingInput,
): BaselineOrderedCandidate[];
~~~

No public Task 4 function reads a file, database, browser, process-global registry, clock, environment variable, or network resource implicitly. Complete bytes, records, checkpoint closure, and evaluation time are explicit inputs.

## 4. Producer and runtime witnesses

~~~ts
interface Task4DependencyManifestEntry {
  path: string;
  raw_bytes_digest: Digest;
  runtime_dependency_paths: string[];
}

interface Task4DependencyManifest {
  contract_version: "contentmd.task4-dependency-manifest/0.1.0";
  producer_id: Task4ProducerArtifactWitness["producer_id"];
  entry_paths: [string, ...string[]];
  resolution_profile:
    "node24-typescript59-esm-runtime-import-export-literal-dynamic-closure/0.1.0";
  resolution_artifacts: [{ path: string; raw_bytes_digest: Digest }, ...Array<{
    path: string;
    raw_bytes_digest: Digest;
  }>];
  entries: [Task4DependencyManifestEntry, ...Task4DependencyManifestEntry[]];
  dependency_manifest_digest: Digest;
}

interface Task4ProducerArtifactWitness {
  contract_version: "contentmd.task4-producer-witness/0.1.0";
  producer_id:
    | "retrieval-snapshot"
    | "feature-profile"
    | "candidate-feature-vector"
    | "deterministic-baseline";
  contract_artifact: RawUtf8Artifact;
  schema_artifact: RawUtf8Artifact | null;
  source_artifacts: [RawUtf8Artifact, ...RawUtf8Artifact[]];
  resolution_artifacts: [RawUtf8Artifact, ...RawUtf8Artifact[]];
  dependency_manifest: Task4DependencyManifest;
  verification_mode: "development_fixture" | "build_verified";
  verification_receipt: VerificationReceiptRecord | null;
}

interface Task4UnicodeRuntime {
  contract_version: "contentmd.task4-unicode-runtime/0.1.0";
  unicode_bundle: UnicodeArtifactBundle;
  runtime_profile: StoreArtifactWitness;
  runtime_digest: Digest;
}
~~~

The contract artifact path is exactly docs/superpowers/specs/2026-08-20-contentmd-retrieval-features-baseline-contracts-design.md. Feature-profile production alone requires schema_artifact at packages/schemas/src/learning-records.schema.json; every other producer requires null.

Required entry-path membership is exact:

| Producer | Entry paths |
| --- | --- |
| retrieval-snapshot | packages/learning/src/retrieval.ts |
| feature-profile | packages/learning/src/features.ts |
| candidate-feature-vector | packages/learning/src/features.ts |
| deterministic-baseline | packages/learning/src/baseline.ts |

Artifact paths are workspace-relative POSIX paths. Raw digest is sha256 over exact UTF-8 bytes. resolution_artifacts is the exact path-sorted set package.json, pnpm-lock.yaml, tsconfig.json, tsconfig.base.json, packages/core/package.json, packages/core/tsconfig.json, packages/learning/package.json, and packages/learning/tsconfig.json. source_artifacts is the unique path-sorted exact transitive behavior-affecting module closure, not merely the entry paths. Starting at the table's entry paths, the declared resolution profile parses the supplied UTF-8 module bytes with the repository-pinned TypeScript 5.9.3 grammar and follows every non-type static import, non-type re-export, and string-literal dynamic import. Relative imports and workspace-package exports resolve only under the supplied resolution_artifacts bytes; node: built-ins terminate traversal; computed dynamic imports, require(), unresolved specifiers, path aliases without supplied resolution metadata, and runtime imports outside the supplied closure fail. Every resolved local module is present exactly once, and every non-entry source module must be reachable; omission, addition, alias duplication, substituted bytes, or an import edge unequal to runtime_dependency_paths fails. This necessarily binds the Task 3 checkpoint/Unicode implementation and its core canonical-record dependencies whenever the Task 4 entry imports them. No constructor consults the live filesystem to complete this closure.

dependency_manifest.entry_paths equals the table entry exactly; dependency_manifest.resolution_artifacts is the path/digest projection of the exact supplied resolution_artifacts; and entries is the path-sorted projection of source_artifacts with the derived path-sorted runtime dependency paths. dependency_manifest_digest is sha256Canonical over every manifest field except itself. The code digest is:

~~~text
sha256Canonical({
  contract_version: "contentmd.task4-code-manifest/0.2.0",
  producer_id,
  entry_paths: dependency_manifest.entry_paths,
  resolution_artifacts: dependency_manifest.resolution_artifacts,
  dependency_manifest_digest,
  entries: dependency_manifest.entries
})
~~~

The producer manifest digest is:

~~~text
sha256Canonical({
  contract_version: "contentmd.task4-producer-manifest/0.1.0",
  producer_id,
  contract: {
    path: contract_artifact.path,
    raw_bytes_digest: contract_artifact.raw_bytes_digest
  },
  schema: schema_artifact === null ? null : {
    path: schema_artifact.path,
    raw_bytes_digest: schema_artifact.raw_bytes_digest
  },
  dependency_manifest_digest,
  code_digest
})
~~~

Development-fixture verification requires a null receipt. Build-verified requires the same complete passed readback-receipt pattern as Tasks 2 and 3, with transaction ref "producer-manifest.<digest>" and target "contentmd://task4/producer-manifest/<producer_id>". A receipt verifies bytes but does not enable official issuance.

producer_verification_ref is null when verification_receipt is null and otherwise is the exact four-field DigestRef derived from that complete receipt. Any output that carries the receipt in provenance also binds producer_verification_ref, including null, in its declared identity or input preimage. The ref is never inferred from record_id alone. This prevents a development-fixture witness, a build-verified witness, or two receipts with different descriptive verified_at values from producing the same object ID with different content.

The Unicode runtime carries the complete committed Task 3 UnicodeArtifactBundle, including source lock, acquisition receipt, generator, normalization, case-fold, whitespace, word-break, and grapheme-break witnesses, plus the exact Task 3 StoreArtifactWitness for the feature-source runtime profile. Every Task 3 bundle equation, path, raw digest, artifact envelope, source-lock/receipt/generator cross-binding, rule-machine digest, conformance proof, and Node version 24.14.0 is reverified. The runtime-profile bytes reproduce the exact Task 3 object and ArtifactRef. runtime_digest is sha256Canonical over every runtime field except itself. Retrieval and vectorization use these supplied bytes; host Intl, locale-sensitive case conversion, regular-expression word boundaries, and host Unicode tables are forbidden.

The shared text pipeline is exact. Decode the already supplied JavaScript string as Unicode scalar values, rejecting an unpaired surrogate. Apply artifact-backed NFKC, artifact-backed full default case folding, then artifact-backed NFKC again. Run the Task 3 Unicode 17 word-boundary machine over the result. A word token is one complete boundary segment containing at least one scalar whose Word_Break value is ALetter, Hebrew_Letter, Numeric, or Katakana; every other segment is discarded. Token content is the complete normalized segment, including any punctuation retained inside that Unicode word boundary. A token sequence is order-sensitive. Grapheme count is the number of segments emitted by the Task 3 Unicode 17 extended-grapheme-cluster machine over the original, unnormalized expression. Empty input emits neither tokens nor graphemes.

## 5. Deterministic approved-pattern retrieval

### 5.1 Query, projection, and input

~~~ts
type MemoryScope = "task" | "personal" | "project" | "organization" | "public";

interface RetrievalQuery {
  project_id: string;
  memory_scope: MemoryScope;
  product_area: string;
  journey_state: string;
  channel: string;
  locale: string;
  market: string;
  risk: string;
  query_terms: [string, ...string[]];
  query_source_refs: [DigestRef, ...DigestRef[]];
  registry_versions: [ArtifactRef, ...ArtifactRef[]];
  query_digest: Digest;
}

interface RetrievalTransferCondition {
  field:
    | "project_id"
    | "memory_scope"
    | "product_area"
    | "journey_state"
    | "channel"
    | "locale"
    | "market"
    | "risk";
  allowed_values: [string, ...string[]];
}

interface RetrievalDispositionEvidenceBase {
  contract_version: "contentmd.task4-retrieval-disposition-evidence/0.1.0";
  evidence_id: string;
  pattern_ref: DigestRef;
  verification_mode: "development_fixture";
  source_class: AllowedSourceClass;
  source_refs: [DigestRef, ...DigestRef[]];
  authority_effect: "none";
  evidence_digest: Digest;
}

type RetrievalDispositionEvidence =
  | (RetrievalDispositionEvidenceBase & {
      evidence_kind: "approval";
      approval_state: "approved_current" | "not_approved" | "expired" | "revoked";
    })
  | (RetrievalDispositionEvidenceBase & {
      evidence_kind: "rights";
      rights_state: "retrieval_permitted" | "blocking_only" | "prohibited" | "unknown";
    })
  | (RetrievalDispositionEvidenceBase & {
      evidence_kind: "freshness";
      freshness_state: "current" | "stale" | "unknown";
      evaluated_at: string;
      expires_at: string | null;
    })
  | (RetrievalDispositionEvidenceBase & {
      evidence_kind: "dispute";
      dispute_state: "none" | "resolved" | "unresolved";
      resolution_ref: DigestRef | null;
    });

interface RetrievalProjectionEvidence {
  contract_version: "contentmd.task4-retrieval-projection-evidence/0.1.0";
  evidence_id: string;
  pattern_ref: DigestRef;
  project_id: string;
  memory_scope: MemoryScope;
  product_area: string;
  journey_state: string;
  channel: string;
  locale: string;
  market: string;
  risk: string;
  evidence_strength:
    | "direct_project_evidence"
    | "qualified_project_review"
    | "project_owned_synthetic";
  outcome_text: [string, ...string[]];
  transfer_conditions: RetrievalTransferCondition[];
  approval_ref: DigestRef;
  rights_ref: DigestRef;
  verification_mode: "development_fixture";
  source_class: AllowedSourceClass;
  source_refs: [DigestRef, ...DigestRef[]];
  authority_effect: "none";
  evidence_digest: Digest;
}

interface RetrievalProjection {
  contract_version: "contentmd.task4-retrieval-projection/0.1.0";
  projection_id: string;
  pattern_ref: DigestRef;
  project_id: string;
  memory_scope: MemoryScope;
  product_area: string;
  journey_state: string;
  channel: string;
  locale: string;
  market: string;
  risk: string;
  lifecycle_state:
    | "proposed"
    | "approved"
    | "active"
    | "superseded"
    | "retired"
    | "rejected"
    | "expired"
    | "revoked";
  approval_state: "approved_current" | "not_approved" | "expired" | "revoked";
  rights_state: "retrieval_permitted" | "blocking_only" | "prohibited" | "unknown";
  freshness_state: "current" | "stale" | "unknown";
  dispute_state: "none" | "resolved" | "unresolved";
  expires_at: string | null;
  source_class: AllowedSourceClass;
  evidence_strength:
    | "direct_project_evidence"
    | "qualified_project_review"
    | "project_owned_synthetic";
  mechanism_text: [string, ...string[]];
  problem_text: [string, ...string[]];
  context_text: [string, ...string[]];
  outcome_text: [string, ...string[]];
  failure_mode_text: [string, ...string[]];
  transfer_conditions: RetrievalTransferCondition[];
  projection_evidence_ref: DigestRef;
  approval_ref: DigestRef;
  rights_ref: DigestRef;
  freshness_ref: DigestRef;
  dispute_ref: DigestRef;
  authority_effect: "none";
  projection_digest: Digest;
}

interface ApprovedRetrievalCandidate {
  source_class: AllowedSourceClass;
  pattern: ContentPatternRecord;
  projection: RetrievalProjection;
  projection_evidence: RetrievalProjectionEvidence;
  approval_evidence: RetrievalDispositionEvidence & { evidence_kind: "approval" };
  rights_evidence: RetrievalDispositionEvidence & { evidence_kind: "rights" };
  freshness_evidence: RetrievalDispositionEvidence & { evidence_kind: "freshness" };
  dispute_evidence: RetrievalDispositionEvidence & { evidence_kind: "dispute" };
}

interface QuarantinedRetrievalCandidate {
  source_class: QuarantinedSourceClass;
  evidence_ref: DigestRef;
  purpose: "retrieval_exclusion_only";
  contains_expression: false;
}

interface RetrievalInput {
  record_mode: Task4RecordMode;
  evaluation_at: string;
  producer: Task4ProducerArtifactWitness;
  unicode_runtime: Task4UnicodeRuntime;
  query: RetrievalQuery;
  candidates: Array<ApprovedRetrievalCandidate | QuarantinedRetrievalCandidate>;
}

interface VerifyRetrievalSnapshotInput {
  record_mode: Task4RecordMode;
  retrieval_input: RetrievalInput;
  snapshot: RetrievalSnapshot;
}
~~~

query_terms are project-authored descriptors, never copied competitor text. Each is normalized with the shared Unicode pipeline. Empty normalized token output is invalid. normalized_query_term_sequences is the ordered array of the resulting nonempty token sequences. query_terms and normalized_query_term_sequences are positionally paired and form a canonical set sorted by the canonical bytes of each normalized token sequence; duplicate normalized sequences or a noncanonical order is invalid rather than silently repaired. normalized_query_tokens is the unique Unicode-scalar-sorted union of every term's tokens. query_source_refs and registry_versions are nonempty canonical sets. query_digest binds the exact retained raw query as well as both normalized projections, so two raw spellings or term groupings cannot share a query identity. It is:

~~~text
sha256Canonical({
  contract_version: "contentmd.task4-retrieval-query/0.1.0",
  project_id,
  memory_scope,
  product_area,
  journey_state,
  channel,
  locale,
  market,
  risk,
  query_terms,
  normalized_query_term_sequences,
  normalized_query_tokens,
  query_source_refs,
  registry_versions
})
~~~

The complete pattern reproduces projection.pattern_ref, has active outer lifecycle, and uses the canonical ContentPatternRecord schema. mechanism_text, problem_text, context_text, and failure_mode_text must equal the exact ordered strings projected from the pattern payload: mechanism; problem; each PatternContext field in payload order and fixed field order journeys, stages, states, channels, modalities, locales, risk_levels; and failure_modes. outcome_text is the approved project-authored outcome abstraction absent from the canonical pattern payload. Its approval and rights are bound by the projection digest; raw browser or competitor wording is forbidden.

Projection project and memory scope equal the pattern record scope. projection_evidence reproduces projection_evidence_ref using the auxiliary schema ID in section 2 and matches the pattern ref, all eight scope fields, evidence strength, outcome text, transfer conditions, approval ref, rights ref, and source class byte-for-byte. It uses prefix "retrieval-projection-evidence." and the common two-stage rule. Its source refs are complete project-owned approval inputs for metadata absent from ContentPatternRecord; in development mode they bind what was asserted but confer no authority. mechanism, problem, context, and failure-mode text remain derived directly from the verified pattern payload and cannot be replaced by projection evidence.

The four complete disposition objects reproduce the projection's approval_ref, rights_ref, freshness_ref, and dispute_ref using the auxiliary schema ID in section 2. Each names the same pattern ref and source class; approval and rights evidence refs also equal projection_evidence.approval_ref and rights_ref. Projection state values and expires_at equal the corresponding complete evidence fields; freshness evaluated_at equals RetrievalInput.evaluation_at. Dispute state resolved requires a non-null resolution_ref, while none and unresolved require null. Every disposition identity uses prefix "retrieval-disposition-evidence." and the common two-stage rule. expires_at and evaluated_at are strict RFC 3339. Every declared dimension and transfer value is compared as an exact scalar string after closed-shape validation; locale, market, and risk fallback or inference is forbidden.

Transfer conditions are unique and sorted by field; allowed_values is a unique Unicode-scalar-sorted set. The projection identity preimage contains every field except projection_id and projection_digest. projection_id is "retrieval-projection." plus its hash. projection_digest includes the ID. The projection ref uses the table's exact auxiliary schema ID. candidates is an order-insensitive input bag: duplicate approved pattern refs or duplicate quarantined evidence refs are invalid, while the constructor canonicalizes valid membership for the candidate-set digest.

### 5.2 Filters, scoring, exclusions, and snapshot

Approved candidates pass these hard filters: exact project, memory, product area, journey state, channel, locale, market, and risk; active lifecycle; approved_current approval; retrieval_permitted rights; current freshness; evaluation_at strictly before expires_at when non-null; not revoked; dispute none or resolved; allowed source class; and every declared transfer condition contains the query's exact value. Scope and transfer values come from the reverified projection evidence; approval, rights, freshness, expiry, and dispute values come from the four reverified disposition objects. A bare projection state is never sufficient. Recency is represented only by freshness and expiry and cannot override another filter.

Malformed records, refs, projections, digests, or timestamps throw. A well-formed but inapplicable candidate is excluded. Exactly one exclusion is stored, using the first applicable reason in this precedence:

~~~ts
type RetrievalExclusionReason =
  | "quarantined_source_class"
  | "project_mismatch"
  | "memory_scope_mismatch"
  | "product_area_mismatch"
  | "journey_state_mismatch"
  | "channel_mismatch"
  | "locale_mismatch"
  | "market_mismatch"
  | "risk_mismatch"
  | "revoked"
  | "expired"
  | "lifecycle_not_active"
  | "approval_not_current"
  | "rights_not_permitted"
  | "freshness_not_current"
  | "unresolved_dispute"
  | "transfer_incompatible";
~~~

revoked applies when either lifecycle or approval is revoked. expired applies when either is expired or when non-null expires_at is less than or equal to evaluation_at. The later generic lifecycle and approval reasons therefore remain reachable only for other noncurrent states.

For eligible candidates, tokenize each of the five fields with the supplied Unicode runtime. Let Q be the unique query-token set. For a field F, coverage(F) is |Q intersect unique(F)| / |Q|. The lexical score is:

~~~text
0.30 * coverage(mechanism)
+ 0.25 * coverage(problem)
+ 0.20 * coverage(context)
+ 0.15 * coverage(outcome)
+ 0.10 * coverage(failure_mode)
~~~

Evidence strength maps direct_project_evidence to 1, qualified_project_review to 0.75, and project_owned_synthetic to 0.5. transfer_condition_score is 1 when no condition exists; otherwise it is passing condition count divided by condition count. A failed condition was already excluded, so every ranked candidate has transfer_condition_score 1. total_score is:

~~~text
0.70 * lexical_score
+ 0.20 * evidence_strength_score
+ 0.10 * transfer_condition_score
~~~

Every component and total is finite and clipped to [0,1]. Results sort by descending total, descending lexical, descending evidence strength, then ascending canonical bytes of pattern_ref. Input order never breaks a tie.

~~~ts
interface RetrievalScore {
  mechanism_coverage: number;
  problem_coverage: number;
  context_coverage: number;
  outcome_coverage: number;
  failure_mode_coverage: number;
  lexical_score: number;
  evidence_strength_score: number;
  transfer_condition_score: number;
  total_score: number;
}

interface RetrievalHit {
  rank: number;
  pattern_ref: DigestRef;
  projection_ref: DigestRef;
  score: RetrievalScore;
}

interface RetrievalExclusion {
  subject_ref: DigestRef;
  reason: RetrievalExclusionReason;
}

interface RetrievalSnapshot {
  contract_version: "contentmd.task4-retrieval-snapshot/0.1.0";
  snapshot_id: string;
  record_mode: "development_fixture";
  query: RetrievalQuery;
  query_digest: Digest;
  candidate_set_digest: Digest;
  candidates: RetrievalHit[];
  exclusions: RetrievalExclusion[];
  registry_versions: [ArtifactRef, ...ArtifactRef[]];
  producer_manifest_digest: Digest;
  producer_verification_ref: DigestRef | null;
  unicode_runtime_digest: Digest;
  provenance: [Task4ProvenanceRef, ...Task4ProvenanceRef[]];
  authority_effect: "none";
  snapshot_digest: Digest;
}
~~~

candidate_set_digest is exact:

~~~text
sha256Canonical({
  contract_version: "contentmd.task4-retrieval-candidate-set/0.1.0",
  approved_candidates,
  quarantined_candidates
})
~~~

approved_candidates and quarantined_candidates are separately canonical-byte-sorted arrays of the complete closed inputs. Exclusions sort by subject_ref; candidates retain score order. The snapshot identity preimage contains every snapshot field except snapshot_id and snapshot_digest, including the complete retained query, exact ranked candidates with component scores, exclusions, registry versions, dependency-bound producer manifest digest, producer_verification_ref, Unicode runtime digest, provenance, and authority_effect. snapshot_id is "retrieval-snapshot." plus its hash. snapshot_digest includes every field except itself. Thus neither a changed hit, score, exclusion, provenance entry, nor dependency closure can retain the same snapshot ID. producer_verification_ref equals the producer-derived value in section 4 and equals the sole producer_verification provenance ref when non-null; null permits no such provenance entry. A zero-hit snapshot is valid and cannot be treated as approval to broaden scope.

verifyRetrievalSnapshot() applies the common mode gate, reverifies the complete retrieval input, dependency manifest, producer, Unicode runtime, snapshot identity/digest/ref/provenance, reruns retrieveApprovedPatterns() from the complete input, and requires byte-identical output. A self-consistent snapshot digest or a bare snapshot ID is never sufficient, and no downstream consumer may accept a RetrievalSnapshot without this replay evidence.

Retrieval ranks are zero-based and contiguous. A quarantined exclusion's subject_ref is its bounded evidence_ref; an approved exclusion's subject_ref is its pattern_ref.

Snapshot provenance is exactly: every query_source_ref as query_source; every approved input pattern ref as pattern_subject; every approved projection ref as scope_projection; every projection-evidence ref as projection_evidence; each projection approval, rights, freshness, and dispute ref with its matching evidence relationship; every registry-version and Unicode/runtime ArtifactRef as runtime_artifact; and the producer verification receipt ref as producer_verification when one exists. A quarantined evidence ref appears only in exclusions and is not reusable provenance.

## 6. Resolver-free scope, feature materials, and lexicon

### 6.1 Scope and feature materials

~~~ts
interface ScopeMaterial {
  contract_version: "contentmd.task4-scope-material/0.1.0";
  scope_material_id: string;
  scope_role: "target" | "candidate_origin";
  project_id: string;
  memory_scope: MemoryScope;
  product_area: string;
  journey_state: string;
  channel: string;
  locale: string;
  market: string;
  risk: string;
  source_class: AllowedSourceClass;
  rights_state: "training_permitted";
  source_refs: [DigestRef, ...DigestRef[]];
  authority_effect: "none";
  material_digest: Digest;
}

type ReferenceFeatureMaterialKind =
  | "required_fact"
  | "recovery_action"
  | "supporting_evidence";

type TextFeatureMaterialKind =
  | "approved_terminology"
  | "context_entity"
  | "context_action";

interface FeatureMaterialBase {
  contract_version: "contentmd.task4-feature-material/0.1.0";
  material_id: string;
  project_id: string;
  locale: string;
  source_class: AllowedSourceClass;
  rights_state: "training_permitted";
  source_refs: [DigestRef, ...DigestRef[]];
  authority_effect: "none";
  material_digest: Digest;
}

type FeatureMaterial =
  | (FeatureMaterialBase & {
      material_kind: ReferenceFeatureMaterialKind;
      match_forms: [];
    })
  | (FeatureMaterialBase & {
      material_kind: TextFeatureMaterialKind;
      match_forms: [string, ...string[]];
    });

interface FeatureContextBinding {
  context_ref: DigestRef;
  project_id: string;
  checkpoint_set_ref: DigestRef;
  target_scope_ref: DigestRef;
  target_scope_role: "target";
  runtime_profile_ref: ArtifactRef;
  unicode_runtime_digest: Digest;
  permitted_candidate_scope_refs: [DigestRef, ...DigestRef[]];
  feature_material_refs: DigestRef[];
  acceptance_criteria_refs: [DigestRef, ...DigestRef[]];
  candidate_rule_set_refs: [DigestRef, ...DigestRef[]];
  candidate_rule_set_artifact_refs: [ArtifactRef, ...ArtifactRef[]];
}

interface FeatureUniverseManifest {
  contract_version: "contentmd.task4-feature-universe-manifest/0.1.0";
  manifest_id: string;
  project_id: string;
  feature_profile_version: "rank-features/0.1.0";
  runtime_profile_ref: ArtifactRef;
  unicode_runtime_digest: Digest;
  context_bindings: [FeatureContextBinding, ...FeatureContextBinding[]];
  checkpoint_set_refs: [DigestRef, ...DigestRef[]];
  target_scope_refs: [DigestRef, ...DigestRef[]];
  permitted_candidate_scope_refs: [DigestRef, ...DigestRef[]];
  feature_material_refs: DigestRef[];
  generic_lexicon_ref: ArtifactRef;
  unicode_artifact_refs: [ArtifactRef, ...ArtifactRef[]];
  acceptance_criteria_refs: [DigestRef, ...DigestRef[]];
  hard_rule_set_refs: [DigestRef, ...DigestRef[]];
  hard_rule_set_artifact_refs: [ArtifactRef, ...ArtifactRef[]];
  authority_effect: "none";
  manifest_digest: Digest;
}
~~~

These three auxiliary objects use the common two-stage ID and digest rule with prefixes "scope-material.", "feature-material.", and "feature-universe-manifest.". Scope and feature material refs use their table schema IDs. The feature-universe manifest is serialized as canonical JSON with one trailing LF; its ArtifactRef uses artifact_id "contentmd.task4-feature-universe-manifest.<manifest_digest>", artifact_version "0.1.0", and artifact_digest equal to sha256 of the exact bytes.

context_bindings are unique and sorted by context_ref. Within each binding, ref sets are canonical; feature_material_refs may be empty. Every binding.project_id equals manifest.project_id, every target_scope_role is target, and every binding runtime_profile_ref and unicode_runtime_digest equals the manifest values. The manifest's checkpoint_set_refs, target_scope_refs, permitted_candidate_scope_refs, feature_material_refs, acceptance_criteria_refs, hard_rule_set_refs, and hard_rule_set_artifact_refs are exactly the unique sorted unions of the corresponding binding fields. These manifest fields are global unions only: except in a one-binding universe, they are not required to equal any one binding's local set. No global ref may be unused and no binding ref may be absent globally.

FeatureContextBinding is the sole owner of context_ref. ScopeMaterial has no context ref and its identity binds only the listed project and scope coordinates, source closure, rights, role, and authority effect. createFeatureProfile() receives one canonical complete scope_material_sources array. Its derived-ref projection equals exactly the unique sorted union of every binding.target_scope_ref and every binding.permitted_candidate_scope_refs; no source is missing or unused. Every ref resolves to exactly one complete ScopeMaterial that reproduces that ref. A ref required as both target and candidate_origin, or complete objects with the same ref but different bytes, is invalid.

Every context binding, including one not selected by a later vectorization call, is fully validated at profile construction. Its target_scope_ref resolves to scope_role target; each permitted candidate ref resolves to scope_role candidate_origin. Every scope project equals the binding project, checkpoint store project, manifest project, and profile scope project; source_class is project_owned or project_owned_synthetic, rights_state is training_permitted, and locale equals the complete Task 2 context payload selected by binding.context_ref. The target scope's product_area, journey_state, channel, and locale equal that context payload exactly. target memory_scope, market, and risk are complete digest-bound ScopeMaterial coordinates because Task 2 does not contain them. Candidate-origin memory_scope, product_area, journey_state, channel, market, and risk remain the complete committed origin coordinates and are not forced to the target values; this preserves meaningful scope-match features. Every memory_scope is an exact valid enum and every coordinate is nonempty and identity-bound. No coordinate is inferred from expression text, locale, or another field.

ScopeMaterial.source_refs bind only pre-existing evidence in that binding's exact checkpoint closure. The committed context snapshot's outer source_refs contains target_scope_ref, while the target ScopeMaterial contains neither binding.context_ref nor any feature-universe/profile ref; this one-way edge is mandatory. Each permitted candidate-scope ref occurs in a corresponding committed candidate snapshot's outer source_refs or in an approved-pattern/approved-exemplar closure reachable at that binding's checkpoint. That candidate snapshot's payload.context_ref equals binding.context_ref, while the candidate ScopeMaterial contains neither that candidate snapshot ref, binding.context_ref, nor any feature-universe/profile ref. No ScopeMaterial may point to itself or to another scope source in a way that creates a cycle. Thus all target and candidate sources, including sources owned only by an otherwise unused second binding, satisfy the complete source-closure and no-back-reference rules before a FeatureProfile is issued. The binding and manifest runtime_profile_ref equal unicode_runtime.runtime_profile.artifact_ref and the profile payload/binding; their unicode_runtime_digest equals the complete reverified runtime. No locale, project, context, target role, or runtime value is inferred from another field.

Hard-rule completeness is derived independently for each FeatureContextBinding from that binding's exact checkpoint, never from FeatureUniverseManifest membership or a caller-supplied applicability subset. For one binding, deterministically enumerate every entry in its complete checkpoint feature_source_manifest whose source_role is acceptance_criteria and whose complete Task 2 acceptance-criteria snapshot has payload.state current, payload.project_id exactly equal to the checkpoint store project, source_class project_owned or project_owned_synthetic, and rights_state training_permitted. Every such entry is applicable to that binding; context_ref and outer source_refs are not applicability filters. The canonical-ref-sorted nonempty set of all such snapshot refs is derived_binding_acceptance_criteria_refs.

For each snapshot in derived_binding_acceptance_criteria_refs, every ordered_feature_refs member resolves inside that binding's checkpoint manifest exactly as Task 3 requires. Fact-set targets remain admissible closure inputs but do not declare rules. Every policy target must be a complete current same-project Task 2 review-policy snapshot with StableSetPayload, and the canonical item_refs of all those policy payloads form that binding's complete rule-set declaration. At least one policy target and one item ref must exist across the binding-local acceptance-criteria set. Every item_ref is a DigestRef with schema_id contentmd.task4-candidate-rule-set and schema_version 0.1.0; their canonical unique union is derived_binding_candidate_rule_set_refs. The corresponding ArtifactRef is derived, never supplied as an index, as { artifact_id: "contentmd.task4-candidate-rule-set." + rule_set_ref.content_digest, artifact_version: "0.1.0", artifact_digest: sha256(exact canonical rule-set bytes plus LF) }. The sorted union is derived_binding_candidate_rule_set_artifact_refs. Each binding's acceptance_criteria_refs, candidate_rule_set_refs, and candidate_rule_set_artifact_refs equal its three independently derived local sets exactly. The manifest acceptance_criteria_refs, hard_rule_set_refs, and hard_rule_set_artifact_refs are the exact unique sorted unions across all bindings; profile hard-rule sources and artifact bindings cover those global unions exactly. A global union is never compared for equality with one selected binding's local set unless the universe has exactly one binding. A universe that consistently omits an applicable checkpoint-bound acceptance criterion, policy item, or rule set fails checkpoint_binding.

Feature-material completeness is likewise derived independently per binding. Starting from that binding's exact Task 3 checkpoint, deterministically traverse the complete feature-source transitive closure: the outer source_refs of the committed task, context, candidate A, and candidate B snapshots; fact-set and policy item_refs; optional expression-free ordered_feature_refs; active approved-exemplar subject refs; and recursively resolved approved-pattern refs. derived_binding_feature_material_refs is the canonical unique sorted set of every reached ref whose schema_id is contentmd.task4-feature-material and schema_version is 0.1.0. Caller manifest membership is not an enumeration filter. createFeatureProfile() receives exactly one complete FeatureMaterial for every ref in the unique union of these binding-local sets and no other material; each object must reproduce its ref. For a binding, every derived material has project_id exactly equal to the binding and checkpoint project, rights_state training_permitted, source_class project_owned or project_owned_synthetic, and locale exactly equal to the complete Task 2 context payload selected by binding.context_ref. A reachable material with a different project or locale does not silently fall out of the set; it fails scope_mismatch. binding.feature_material_refs equals derived_binding_feature_material_refs exactly and may be empty if and only if that checkpoint closure contains no ref with the exact FeatureMaterial schema and version. The manifest feature_material_refs and the profile's complete material sources equal the exact unique union across bindings. A missing, extra, substituted, or duplicate material ref fails checkpoint_binding; a selected or supplied material whose locale differs from its binding's target context fails scope_mismatch. A ref committed before presentation but supplied with different bytes fails integrity. A complete value supplied after presentation without a committed ref is not a feature.

Role compatibility is exact: required facts come from the fact-set or acceptance-criteria closure; recovery actions and approved terminology come from policy, approved-pattern, approved-exemplar, or acceptance-criteria closure; contextual entities and actions come from target context, policy, or acceptance-criteria closure; supporting evidence comes from fact-set, approved-exemplar, or acceptance-criteria closure. Every source is project-owned or project-owned-synthetic with training-permitted rights. Browser, competitor, third-party, nonconforming, unknown, blocking-only, prohibited, or unknown-rights material cannot appear.

Each text material match form normalizes to a nonempty Unicode 17 token sequence. Forms are unique after normalization. Approved terminology, contextual entity, and contextual action material is satisfied when at least one normalized form occurs as a contiguous token subsequence of the candidate expression. Required fact, recovery action, and supporting evidence material has match_forms exactly empty and is satisfied when either its material ref or one of its source_refs occurs in the candidate snapshot's digest-bound source_refs. Thus the three reference-coverage features never infer a citation from wording. Matching is exact after NFKC and full default case folding; stemming, fuzzy similarity, embeddings, locale-sensitive folding, and substring-within-token matches are forbidden.

### 6.2 Frozen generic-language lexicon

fixtures/learning-ranking/generic-language-lexicon.json is the following exact semantic object, serialized with the repository canonicalJson() encoding as compact recursively key-sorted JSON plus one trailing LF:

~~~json
{
  "authority_effect": "none",
  "contract_version": "contentmd.generic-language-lexicon/0.1.0",
  "entries": [
    { "entry_id": "generic.all_in_one", "tokens": ["all", "in", "one"] },
    { "entry_id": "generic.empower_your_journey", "tokens": ["empower", "your", "journey"] },
    { "entry_id": "generic.game_changer", "tokens": ["game", "changer"] },
    { "entry_id": "generic.next_level", "tokens": ["next", "level"] },
    { "entry_id": "generic.seamless_experience", "tokens": ["seamless", "experience"] },
    { "entry_id": "generic.unlock_possibilities", "tokens": ["unlock", "possibilities"] }
  ],
  "locale": "en",
  "rights_state": "training_permitted",
  "source_class": "project_owned_synthetic"
}
~~~

Its ArtifactRef is { artifact_id: "contentmd.generic-language-lexicon.en", artifact_version: "0.1.0", artifact_digest: sha256(exact canonical UTF-8 bytes) }. Entry IDs and token arrays are unique and in the order shown. Tokens are already normalized and each is exactly one Unicode 17 word token. For every binding admitted to one feature profile, the parsed generic lexicon locale equals the complete Task 2 context payload locale selected by binding.context_ref. At vectorization, target_scope.locale and candidate_scope.locale also equal that same selected context locale; candidate.payload.context_ref is the binding mechanism and no locale is inferred from expression text. A mismatch fails scope_mismatch. No locale fallback is implicit. A new locale requires a separately versioned, project-owned lexicon artifact, feature universe, and feature profile.

Generic density is the number of candidate token positions covered by at least one contiguous lexicon-entry match divided by candidate token count. Overlapping matches count a token position once. It is clipped to [0,1].

## 7. Feature profile and candidate vector

### 7.1 Exact feature order

FeatureProfile.features has exactly these 21 definitions and positions:

| Pos | Name | Type | Nullable | Missing indicator | Transformation |
| ---: | --- | --- | --- | --- | --- |
| 0 | project_match | boolean | false | null | exact equality |
| 1 | product_area_match | boolean | false | null | exact equality |
| 2 | journey_state_match | boolean | false | null | exact equality |
| 3 | channel_match | boolean | false | null | exact equality |
| 4 | locale_match | boolean | false | null | exact equality |
| 5 | risk_match | boolean | false | null | exact equality |
| 6 | required_fact_coverage | number | true | required_fact_coverage_missing | distinct satisfied / applicable |
| 7 | required_fact_coverage_missing | boolean | false | null | applicable set empty |
| 8 | recovery_action_coverage | number | true | recovery_action_coverage_missing | distinct satisfied / applicable |
| 9 | recovery_action_coverage_missing | boolean | false | null | applicable set empty |
| 10 | approved_terminology_ratio | number | true | approved_terminology_ratio_missing | distinct satisfied / applicable |
| 11 | approved_terminology_ratio_missing | boolean | false | null | applicable set empty |
| 12 | contextual_entity_coverage | number | true | contextual_entity_coverage_missing | distinct satisfied / applicable |
| 13 | contextual_entity_coverage_missing | boolean | false | null | applicable set empty |
| 14 | contextual_action_coverage | number | true | contextual_action_coverage_missing | distinct satisfied / applicable |
| 15 | contextual_action_coverage_missing | boolean | false | null | applicable set empty |
| 16 | supporting_evidence_coverage | number | true | supporting_evidence_coverage_missing | distinct satisfied / applicable |
| 17 | supporting_evidence_coverage_missing | boolean | false | null | applicable set empty |
| 18 | generic_language_density | number | false | null | covered generic token positions / tokens |
| 19 | length_distance | number | true | length_distance_missing | normalized distance to grapheme range |
| 20 | length_distance_missing | boolean | false | null | no length range |

Booleans encode as 0 or 1 in vectors. For a nullable ratio with no applicable items, the value is 0 and missing indicator is 1; otherwise the indicator is 0. Ratios use distinct material IDs, not form-hit counts. All ratios are clipped to [0,1].

Contextual specificity is a baseline projection, not a twenty-second feature. It is the arithmetic mean of project_match, product_area_match, journey_state_match, channel_match, locale_match, risk_match, plus contextual_entity_coverage when its missing indicator is 0, plus contextual_action_coverage when its missing indicator is 0. The denominator is the number of included values and is therefore at least six.

Length uses supplied Unicode 17 extended-grapheme-cluster segmentation. For one vector, collect every grapheme_count constraint from the selected binding's independently enumerated applicable acceptance-criteria snapshots in derived_binding_acceptance_criteria_refs order. The effective minimum is the maximum of all non-null minimum values; the effective maximum is the minimum of all non-null maximum values. If neither bound exists, length_distance is 0 and length_distance_missing is 1. If both exist and effective minimum is greater than effective maximum, the inputs contain a conflicting hard constraint: aggregate hard-rule status is fail, the exact ineligible reason is hard_rule_failed, and no vector is emitted. Otherwise length_distance_missing is 0; within the effective range distance is 0; below minimum it is (minimum - count) / max(1, minimum, maximum or 0); above maximum it is (count - maximum) / max(1, minimum or 0, maximum); clip to [0,1]. CandidateRuleSet grapheme rules remain independently replayed gates and do not replace this acceptance-criteria intersection. The canonical-ref-sorted selected-binding acceptance-criteria refs that contribute grapheme constraints are exact checkpoint_binding provenance; that binding's full sorted acceptance-criteria set is bound in eligible input identity and every ineligible diagnostic.

An expression yielding zero word tokens or zero extended grapheme clusters is hard-ineligible. No vector is emitted.

### 7.2 Profile construction

~~~ts
interface FeatureArtifactBinding {
  role:
    | "feature_universe"
    | "generic_lexicon"
    | "unicode_normalization"
    | "unicode_casefold"
    | "unicode_whitespace"
    | "unicode_word_break"
    | "unicode_grapheme_break"
    | "runtime_profile"
    | "hard_rule_set";
  artifact_ref: ArtifactRef;
}

interface CreateFeatureProfileInput {
  record_mode: Task4RecordMode;
  project_id: string;
  producer: Task4ProducerArtifactWitness;
  unicode_runtime: Task4UnicodeRuntime;
  feature_universe: FeatureUniverseManifest;
  feature_universe_artifact: RawUtf8Artifact;
  checkpoint_sets: [FeatureSourceCheckpointSet, ...FeatureSourceCheckpointSet[]];
  scope_material_sources: [ScopeMaterial, ...ScopeMaterial[]];
  feature_material_sources: FeatureMaterial[];
  hard_rule_sources: [{
    candidate_rule_set: CandidateRuleSet;
    candidate_rule_set_artifact: RawUtf8Artifact;
  }, ...Array<{
    candidate_rule_set: CandidateRuleSet;
    candidate_rule_set_artifact: RawUtf8Artifact;
  }>];
  generic_lexicon: RawUtf8Artifact;
  artifact_bindings: [FeatureArtifactBinding, ...FeatureArtifactBinding[]];
  runtime_profile_ref: ArtifactRef;
}
~~~

The profile input digest is:

~~~text
sha256Canonical({
  contract_version: "contentmd.task4-feature-profile-input/0.1.0",
  project_id,
  producer_manifest_digest,
  producer_verification_ref,
  unicode_runtime_digest,
  feature_universe_manifest_digest,
  checkpoint_set_refs,
  global_scope_material_refs,
  global_feature_material_refs,
  global_acceptance_criteria_refs,
  global_hard_rule_set_refs,
  global_hard_rule_set_artifact_refs,
  artifact_bindings
})
~~~

The five global_* arrays in this preimage are the canonical unique sorted unions independently derived across all context bindings; they are not caller aliases for the manifest fields. global_scope_material_refs is the exact unique sorted union of all binding target and permitted-candidate refs and the exact derived-ref projection of scope_material_sources. global_feature_material_refs is the exact ref projection of feature_material_sources, global_acceptance_criteria_refs is covered by the complete acceptance-criteria snapshots inside checkpoint_sets, and the two global hard-rule arrays are the exact ref projections of hard_rule_sources and its paired canonical artifacts.

checkpoint_sets is unique and sorted by exact checkpoint ref, each complete set is reverified under Task 3, and its derived ref set equals feature_universe.checkpoint_set_refs exactly. scope_material_sources is unique and canonical-ref sorted; createFeatureProfile() fully reverifies every complete object and every section 6.1 ref, role, project, coordinate, locale, rights, source-closure, and acyclic no-back-reference equation for every binding before issuing a profile. Its ref set equals both global_scope_material_refs and the unique union of feature_universe.target_scope_refs plus feature_universe.permitted_candidate_scope_refs exactly. This validation is universe-wide and does not stop after a first or currently selected binding. For every universe context binding, createFeatureProfile() also selects its supplied checkpoint and complete Task 2 context, then independently performs the section 6.1 feature-material and acceptance/policy/rule enumerations. Each binding's four local fields equal its own independently derived sets. The manifest global fields are checked only against the unique unions across all bindings. feature_material_sources is canonical-ref sorted, contains exactly one complete object for every member of the derived global material union and no other object, and every object reproduces its ref; its ref set equals feature_universe.feature_material_refs exactly, including the empty case. hard_rule_sources is unique and canonical-ref sorted; every complete rule set and exact canonical artifact bytes reproduce one member of the derived global rule union, and its ref/artifact-ref sets equal that union exactly. Two bindings may therefore use distinct checkpoints and disjoint local scope, feature-material, acceptance-criteria, and rule sets while the profile inputs cover their exact unions. artifact_bindings are unique and sorted by role then artifact ref. They contain exactly one feature_universe, generic_lexicon, each of the five Task 3 Unicode artifacts, and runtime_profile, plus the nonempty checkpoint-derived global hard-rule-set artifact union, not merely the set declared by the feature universe. FeatureProfile.source_artifact_refs is the unique artifact-ref set from these bindings. project_id equals feature_universe.project_id and every context-binding project; runtime_profile_ref equals unicode_runtime.runtime_profile.artifact_ref, feature_universe.runtime_profile_ref, every context-binding runtime ref, and the unique runtime_profile binding; feature_universe.unicode_runtime_digest and every binding digest equal unicode_runtime.runtime_digest. The parsed generic lexicon locale equals every binding-selected complete Task 2 context locale; target and candidate scope locale equality has already been validated across scope_material_sources and is rechecked for the selected pair at vectorization. feature_universe.unicode_artifact_refs equals, as a set, the five generated ArtifactRefs in unicode_runtime.unicode_bundle. The feature-universe artifact and profile input digest bind every material, acceptance-criteria, checkpoint, and scope DigestRef without adding fields to the registered FeatureProfile payload shape.

feature_universe_artifact bytes must parse to the byte-identical supplied manifest, use canonicalJson() plus one LF, and reproduce the manifest's declared ArtifactRef. The generic-lexicon bytes must reproduce the exact object and ArtifactRef in section 6.2. The hard-rule-set bindings equal both feature_universe.hard_rule_set_artifact_refs and the checkpoint-derived global union in section 6.1; their DigestRef counterparts remain the runtime/checkpoint subjects. No ArtifactRef stands in for a DigestRef or vice versa.

The profile record ID is "feature-profile." plus sha256Canonical of { contract_version: "contentmd.task4-feature-profile-identity/0.1.0", project_id, input_digest }. The outer record is exactly schema ID "contentmd.feature-profile", schema version "0.1.0", record version 1, lifecycle_state "active", and the existing closed Task 1 payload. Scope is { memory_scope: "project", project_id, resource_refs: [feature_universe.manifest_id], data_classes: ["learning_feature_profile"] }.

For each FeatureArtifactBinding, provenance contains the Task 3 projection { record_id: "artifact." + artifact_id + "." + artifact_version, relationship: "task4_feature_artifact_" + role, content_digest: artifact_digest }. A non-null producer verification receipt contributes the committed-core projection { record_id: producer_verification_ref.record_id, relationship: "producer_verification", content_digest: producer_verification_ref.content_digest }. No other provenance entry is permitted; entries use the committed three-field core shape and sort by record_id, relationship, then content_digest. producer_verification_ref in input_digest is the exact four-field receipt ref from section 4; when non-null, its record_id and content_digest equal that sole producer_verification provenance projection and its schema_id and schema_version equal the complete reverified receipt, while null permits no such entry. schema_digest and code_digest come from the verified producer witness. input_digest is the exact profile preimage above. Payload record_mode is development_fixture, ranking_objective expression_preference, candidate_kind expression, authority_effect none, feature_profile_version rank-features/0.1.0, profile_state frozen, features the exact table, source_artifact_refs the exact binding-ref set, and runtime_profile_ref the one runtime-profile binding. forbidden_input_fields is exactly this order:

~~~text
actor_identity
author_identity
protected_class
inferred_emotion
inferred_vulnerability
presentation_side
presentation_order
provider_alternative_order
decision
post_decision_outcome
browser_expression
competitor_expression
third_party_expression
~~~

### 7.3 Vectorization

~~~ts
interface CandidateRuleBase {
  rule_id: string;
  failure_class: "hard_rule" | "prohibited_claim";
}

type CandidateRule =
  | (CandidateRuleBase & {
      rule_kind: "forbidden_token_sequence";
      tokens: [string, ...string[]];
    })
  | (CandidateRuleBase & {
      rule_kind: "required_token_sequence";
      failure_class: "hard_rule";
      tokens: [string, ...string[]];
    })
  | (CandidateRuleBase & {
      rule_kind: "grapheme_count";
      failure_class: "hard_rule";
      minimum: number | null;
      maximum: number | null;
    })
  | (CandidateRuleBase & {
      rule_kind: "required_source_ref";
      failure_class: "hard_rule";
      source_ref: DigestRef;
    })
  | (CandidateRuleBase & {
      rule_kind: "forbidden_source_ref";
      source_ref: DigestRef;
    });

interface CandidateRuleSet {
  contract_version: "contentmd.task4-candidate-rule-set/0.1.0";
  rule_set_id: string;
  project_id: string;
  locale: string;
  source_class: AllowedSourceClass;
  rights_state: "training_permitted";
  source_refs: [DigestRef, ...DigestRef[]];
  rules: [CandidateRule, ...CandidateRule[]];
  rule_set_state: "current";
  authority_effect: "none";
  rule_set_digest: Digest;
}

interface CandidateRuleFinding {
  rule_id: string;
  failure_class: "hard_rule" | "prohibited_claim";
}

interface CandidateEligibilityGate {
  contract_version: "contentmd.task4-candidate-eligibility-gate/0.1.0";
  gate_id: string;
  candidate_ref: DigestRef;
  rule_set_ref: DigestRef;
  rule_set_artifact_ref: ArtifactRef;
  unicode_runtime_digest: Digest;
  findings: CandidateRuleFinding[];
  hard_rule_status: "pass" | "fail";
  prohibited_claim_status: "clear" | "hit";
  authority_effect: "none";
  gate_digest: Digest;
}

interface CandidateRuleEvaluation {
  candidate_rule_set: CandidateRuleSet;
  candidate_rule_set_artifact: RawUtf8Artifact;
  eligibility_gate: CandidateEligibilityGate;
}

interface CandidateVectorizationInput {
  record_mode: Task4RecordMode;
  producer: Task4ProducerArtifactWitness;
  unicode_runtime: Task4UnicodeRuntime;
  profile: FeatureProfile;
  feature_universe: FeatureUniverseManifest;
  feature_universe_artifact: RawUtf8Artifact;
  checkpoint_set: FeatureSourceCheckpointSet;
  scope_material_sources: [ScopeMaterial, ...ScopeMaterial[]];
  target_scope: ScopeMaterial;
  candidate_scope: ScopeMaterial;
  candidate: EvidenceSnapshot<"candidate", CandidatePayload>;
  materials: FeatureMaterial[];
  generic_lexicon: RawUtf8Artifact;
  acceptance_criteria_sources: [EvidenceSnapshot<
    "acceptance-criteria",
    ExpressionFreeFeaturePayload
  >, ...Array<EvidenceSnapshot<"acceptance-criteria", ExpressionFreeFeaturePayload>>];
  rule_evaluations: [CandidateRuleEvaluation, ...CandidateRuleEvaluation[]];
  blocking_evidence: Array<{
    candidate_ref: DigestRef;
    evidence_ref: DigestRef;
    source_class: QuarantinedSourceClass;
    purpose: "feature_exclusion_only";
    contains_expression: false;
  }>;
}

type CandidateFeatureExclusion =
  | "quarantined_source_class"
  | "hard_rule_failed"
  | "prohibited_claim_hit"
  | "empty_word_tokens"
  | "empty_grapheme_clusters";

interface CandidateFeatureVector {
  contract_version: "contentmd.task4-candidate-feature-vector/0.1.0";
  vector_id: string;
  record_mode: "development_fixture";
  project_id: string;
  candidate_ref: DigestRef;
  context_ref: DigestRef;
  target_scope_ref: DigestRef;
  target_scope_role: "target";
  checkpoint_set_ref: DigestRef;
  feature_profile_ref: DigestRef;
  feature_universe_ref: DigestRef;
  runtime_profile_ref: ArtifactRef;
  unicode_runtime_digest: Digest;
  input_digest: Digest;
  feature_order: [
    "project_match",
    "product_area_match",
    "journey_state_match",
    "channel_match",
    "locale_match",
    "risk_match",
    "required_fact_coverage",
    "required_fact_coverage_missing",
    "recovery_action_coverage",
    "recovery_action_coverage_missing",
    "approved_terminology_ratio",
    "approved_terminology_ratio_missing",
    "contextual_entity_coverage",
    "contextual_entity_coverage_missing",
    "contextual_action_coverage",
    "contextual_action_coverage_missing",
    "supporting_evidence_coverage",
    "supporting_evidence_coverage_missing",
    "generic_language_density",
    "length_distance",
    "length_distance_missing"
  ];
  values: [
    number, number, number, number, number, number, number,
    number, number, number, number, number, number, number,
    number, number, number, number, number, number, number
  ];
  satisfied_material_refs: DigestRef[];
  grapheme_constraint_refs: DigestRef[];
  grapheme_count: number;
  token_count: number;
  provenance: [Task4ProvenanceRef, ...Task4ProvenanceRef[]];
  authority_effect: "none";
  vector_digest: Digest;
}

type CandidateFeatureResult =
  | { status: "eligible"; vector: CandidateFeatureVector }
  | {
      status: "ineligible";
      candidate_ref: DigestRef;
      reason: CandidateFeatureExclusion;
      grapheme_constraint_refs: DigestRef[];
      diagnostic_digest: Digest;
    };
~~~

Each gate is pre-decision and replayed, not trusted. CandidateRuleSet uses the common two-stage identity rule with prefix "candidate-rule-set." and the auxiliary schema ID in section 2. Its project and locale equal the selected target scope. Rules are unique and sorted by rule_id. Token sequences are already normalized tokens under the shared pipeline. A grapheme rule has safe nonnegative bounds, at least one non-null bound, and minimum no greater than maximum when both exist. Every rule-set ref and every source_ref occur in the checkpointed policy or acceptance-criteria closure. All are project-owned or project-owned-synthetic, training-permitted, and nonquarantined. Each candidate_rule_set_artifact is its paired rule set's exact canonicalJson() bytes plus one LF; its ArtifactRef uses artifact_id "contentmd.task4-candidate-rule-set.<rule_set_digest>", version "0.1.0", and the raw-byte digest.

rule_evaluations is nonempty, unique by complete rule-set ref, and sorted by canonical bytes of that ref. Before consulting universe membership, vectorizeCandidate() performs the section 6.1 enumeration against the selected binding's complete checkpoint and derives that binding's local acceptance-criteria, rule-set, and rule-set-artifact sets. rule_evaluations and the selected binding fields equal those independently derived local sets exactly. Separately, the universe global fields must remain the exact unique unions of all declared binding fields and the profile artifact bindings must cover the global rule-set artifact union; neither global collection is compared for equality with the selected local set unless there is exactly one binding. Neither membership-only validation nor caller selection of a universe-shaped or binding-shaped subset is permitted. Each entry's rule-set ref, derived artifact ref, complete artifact bytes, and gate rule_set_ref/rule_set_artifact_ref pair exactly. Missing, extra, duplicate, substituted, or cross-paired entries are integrity failures.

Re-evaluate every rule in every rule_evaluations entry against only the supplied pre-decision candidate snapshot, its outer source_refs, and the supplied Unicode runtime. forbidden_token_sequence fails on one contiguous occurrence; required_token_sequence fails when absent; grapheme_count fails outside its closed bounds; required_source_ref fails when absent from candidate.source_refs; forbidden_source_ref fails when present. Each gate's findings contains exactly that rule set's failing rules in rule-set order. hard_rule_status is fail exactly when its findings contains hard_rule, otherwise pass. prohibited_claim_status is hit exactly when its findings contains prohibited_claim, otherwise clear. Any unequal supplied finding or status is an integrity error.

Each gate identity preimage contains contract version, candidate ref, its rule-set ref, its paired rule-set ArtifactRef, Unicode runtime digest, findings, both derived statuses, and authority effect. gate_id is "candidate-eligibility-gate." plus its hash. gate_digest hashes every gate field except itself. A gate uses the auxiliary schema ID in section 2 and is a deterministic pre-ranking result binding, not approval or a feature.

The aggregate hard-rule status is fail when any gate has hard_rule_status fail or the acceptance-criteria grapheme intersection is conflicting, and otherwise pass. The aggregate prohibited-claim status is hit when any gate has prohibited_claim_status hit and otherwise clear. Eligibility precedence uses those aggregates: quarantine, aggregate hard-rule fail, aggregate prohibited-claim hit, empty word tokens, empty grapheme clusters. Thus a hard failure in any bound rule set or a contradictory checkpoint-bound length range wins even if every other set is clear, and a caller cannot obtain a vector by presenting only a permissive subset.

The candidate snapshot is rehashed and its payload.context_ref selects exactly one feature_universe.context_bindings entry. The supplied feature_universe_artifact bytes parse to the byte-identical manifest, use canonicalJson() plus one LF, and reproduce its exact derived ArtifactRef. The supplied checkpoint ref equals the selected binding's checkpoint_set_ref and its complete checkpoint is reverified under Task 3. scope_material_sources is the canonical complete profile-bound global source array: its derived refs equal the exact union of all universe target_scope_refs and permitted_candidate_scope_refs and equal global_scope_material_refs bound by the profile input digest. Every complete object rehashes to that ref. target_scope and candidate_scope must be canonical-byte-equal to, respectively, the selected binding's target object and one permitted candidate object in scope_material_sources; a separately supplied object, membership-only ref check, or changed bytes cannot introduce new scope truth. Reproducing the same four-field ref after complete-object rehash is the commitment to the exact profile-construction source because the ref's content_digest binds those canonical bytes.

The checkpoint store project, universe project, profile scope project, binding project, target-scope project, candidate-scope project, every selected material/rule project, and emitted vector project are exactly equal. target_scope.scope_role and binding.target_scope_role are target; candidate_scope.scope_role is candidate_origin. Neither ScopeMaterial contains context_ref. The target-scope ref equals the selected binding's target_scope_ref; the candidate-scope ref is a member of its permitted_candidate_scope_refs. The canonical sorted supplied acceptance_criteria_sources refs equal derived_binding_acceptance_criteria_refs for the selected binding and checkpoint only; their policy StableSet item refs produce that binding's complete derived local rule-set and artifact sets under section 6.1. The canonical sorted set of supplied complete material refs equals derived_binding_feature_material_refs and the selected binding's feature_material_refs exactly, including the empty case. Omission, addition, substitution, or duplication is an integrity failure, not missingness. Candidate, scopes, the selected local acceptance criteria, every selected local rule set, and every selected local material ref are in that checkpoint's declared transitive pre-presentation closure. candidate.payload.context_ref, selected binding.context_ref, and the complete checkpoint context snapshot ref are equal. target_scope.locale, candidate_scope.locale, every selected material.locale, every selected rule-set locale, and the parsed generic_lexicon.locale equal the selected complete Task 2 context payload.locale exactly; a supplied wrong-locale material or lexicon fails scope_mismatch. No acceptance-criteria source_refs test participates in applicability. The universe global scope, material, acceptance-criteria, rule-set, and rule-set-artifact fields remain exact unique unions across all bindings and may be strict supersets of the selected local sets. unicode_runtime.runtime_digest and runtime_profile.artifact_ref equal the universe, binding, profile source/payload, vector, and scoring-time baseline checks exactly. The candidate expression digest is rechecked. Profile digest and schema are rechecked. Profile source artifacts equal the feature-universe artifact bindings, including the supplied feature-universe ArtifactRef and global hard-rule artifact union.

Forbidden input fields are rejected by recursive key scan before calculation. Each blocking_evidence candidate_ref equals the input candidate ref. blocking_evidence remains bounded and expression-free; it can produce only the quarantined exclusion. If any blocking entry contains an expression or expression digest, integrity fails.

An ineligible result contains no vector or feature values.

The ineligible diagnostic digest is exactly:

~~~text
sha256Canonical({
  contract_version: "contentmd.task4-candidate-feature-diagnostic/0.1.0",
  candidate_ref,
  reason,
  profile_ref,
  checkpoint_set_ref,
  feature_universe_ref,
  feature_universe_artifact_ref,
  global_scope_material_refs,
  selected_binding_feature_material_refs,
  selected_binding_acceptance_criteria_refs,
  grapheme_constraint_refs,
  selected_binding_candidate_rule_set_refs,
  selected_binding_candidate_rule_set_artifact_refs,
  selected_binding_eligibility_gate_refs,
  blocking_evidence,
  producer_manifest_digest,
  producer_verification_ref,
  unicode_runtime_digest
})
~~~

blocking_evidence is the canonical-byte-sorted set of complete bounded no-expression entries and is empty unless the reason is quarantined_source_class. No candidate expression, feature value, or post-decision value enters this diagnostic preimage.

global_scope_material_refs is the complete profile-bound universe union even when only one binding and candidate scope are selected for calculation. selected_binding_feature_material_refs is the complete local derived ref set even when it is empty. selected_binding_acceptance_criteria_refs, selected_binding_candidate_rule_set_refs, selected_binding_candidate_rule_set_artifact_refs, and selected_binding_eligibility_gate_refs are the selected binding's complete local sets, never the manifest unions. grapheme_constraint_refs is always the canonical-ref-sorted unique subset of selected_binding_acceptance_criteria_refs whose payload.constraint is grapheme_count. It appears byte-identically in an ineligible result and its diagnostic preimage. For an eligible result it appears in the vector and is also the exact acceptance-criteria subset represented as checkpoint_binding provenance. This exposes and binds the exact sources of the effective range without introducing a new resolver or a scope/context back-reference.

For an eligible candidate, input_digest is exact:

~~~text
sha256Canonical({
  contract_version: "contentmd.task4-candidate-feature-input/0.1.0",
  candidate_ref,
  context_ref,
  target_scope_ref,
  candidate_scope_ref,
  checkpoint_set_ref,
  feature_profile_ref,
  feature_universe_ref,
  feature_universe_artifact_ref,
  global_scope_material_refs,
  feature_materials,
  selected_binding_feature_material_refs,
  generic_lexicon_ref,
  selected_binding_acceptance_criteria_refs,
  selected_binding_candidate_rule_set_refs,
  selected_binding_candidate_rule_set_artifact_refs,
  selected_binding_eligibility_gate_refs,
  producer_manifest_digest,
  producer_verification_ref,
  unicode_runtime_digest
})
~~~

feature_universe_artifact_ref is the exact ArtifactRef derived from the supplied canonical feature-universe bytes and equals the profile's feature_universe artifact binding. global_scope_material_refs is the canonical derived-ref projection of scope_material_sources and the exact profile-bound universe scope union; target_scope_ref and candidate_scope_ref select canonical-byte-equal objects from it. feature_materials is the canonical-ref-sorted array of the selected binding's complete FeatureMaterial objects, and its ref projection equals selected_binding_feature_material_refs exactly. selected_binding_candidate_rule_set_refs, selected_binding_candidate_rule_set_artifact_refs, and selected_binding_eligibility_gate_refs retain rule_evaluations order; every entry is derived from its supplied, fully reverified complete object, and each eligibility-gate ref uses the gate auxiliary schema ID and digest. All selected_binding fields in the input preimage are locally derived from the selected binding and its exact checkpoint; no manifest-global union is substituted. An eligible input requires blocking_evidence exactly empty.

The vector identity preimage is exact:

~~~text
sha256Canonical({
  contract_version: "contentmd.task4-candidate-feature-vector-identity/0.1.0",
  record_mode,
  project_id,
  candidate_ref,
  context_ref,
  target_scope_ref,
  target_scope_role,
  checkpoint_set_ref,
  feature_profile_ref,
  feature_universe_ref,
  runtime_profile_ref,
  unicode_runtime_digest,
  input_digest,
  feature_order,
  values,
  satisfied_material_refs,
  grapheme_constraint_refs,
  grapheme_count,
  token_count,
  provenance,
  authority_effect
})
~~~

vector_id is "candidate-feature-vector." plus the identity hash. vector_digest is sha256Canonical over every vector field except vector_digest, including the derived ID. Any mutation to a value, count, satisfied ref, grapheme-constraint ref, provenance entry, scope/runtime binding, or other derived output therefore changes both vector_id and vector_digest; same-ID/different-content vectors are invalid.

Vector provenance is exactly: the candidate ref as candidate_subject; selected checkpoint-set ref, every independently enumerated selected-binding acceptance-criteria ref, and every derived selected-binding candidate-rule-set ref as checkpoint_binding; profile ref as feature_profile; target and candidate scope refs as scope_projection; the universe DigestRef and its exact supplied ArtifactRef as feature_universe; every selected-binding material ref as feature_material; every Unicode/runtime and lexicon ArtifactRef as runtime_artifact; and the producer verification receipt ref as producer_verification when one exists. Manifest-global refs belonging only to other bindings do not enter this vector's provenance. The selected-binding acceptance-criteria and rule-set provenance subsets are canonical-ref sorted, and the full provenance array retains the common canonical ordering. Bounded blocking evidence appears only in an ineligible diagnostic and never in an eligible vector.

## 8. Deterministic baseline

~~~ts
interface BaselineComponent {
  name:
    | "required_facts"
    | "recovery"
    | "terminology"
    | "contextual_specificity"
    | "evidence"
    | "one_minus_generic"
    | "one_minus_length";
  weight: number;
}

interface CreateBaselineInput {
  record_mode: Task4RecordMode;
  producer: Task4ProducerArtifactWitness;
  feature_profile: FeatureProfile;
  runtime_profile: StoreArtifactWitness;
}

interface DeterministicBaseline {
  contract_version: "contentmd.task4-deterministic-baseline/0.1.0";
  baseline_id: string;
  record_mode: "development_fixture";
  baseline_version: "expression-fit-baseline/0.1.0";
  ranking_objective: "expression_preference";
  candidate_kind: "expression";
  project_id: string;
  feature_profile_ref: DigestRef;
  components: [
    { name: "required_facts"; weight: 0.25 },
    { name: "recovery"; weight: 0.15 },
    { name: "terminology"; weight: 0.15 },
    { name: "contextual_specificity"; weight: 0.15 },
    { name: "evidence"; weight: 0.15 },
    { name: "one_minus_generic"; weight: 0.10 },
    { name: "one_minus_length"; weight: 0.05 }
  ];
  contextual_specificity_projection:
    "mean_6_scope_matches_plus_applicable_entity_and_action";
  missing_component_rule: "omit_and_renormalize";
  pair_sigmoid_scale: 4;
  probability_clip_lower: 0.000001;
  probability_clip_upper: 0.999999;
  tie_rule: "exact_score_tie_probability_0.5";
  ordering_tie_break: "ascending_candidate_content_digest";
  producer_manifest_digest: Digest;
  producer_verification_ref: DigestRef | null;
  runtime_profile_ref: ArtifactRef;
  provenance: [Task4ProvenanceRef, ...Task4ProvenanceRef[]];
  authority_effect: "none";
  baseline_digest: Digest;
}
~~~

createDeterministicBaseline() validates only static inputs available at construction: the dependency-closed deterministic-baseline producer, the complete active development-fixture FeatureProfile and its exact digest/schema/21-feature definition, and the complete Task 3 StoreArtifactWitness for the runtime profile. It reverifies the exact frozen runtime-profile path, UTF-8 bytes, raw digest, semantic object, Node 24.14.0 value, and ArtifactRef. The derived runtime ArtifactRef equals feature_profile.payload.runtime_profile_ref and the profile's exact runtime-artifact provenance projection. baseline.project_id is derived only from feature_profile.scope.project_id, baseline.feature_profile_ref is derived from the complete profile, and baseline.runtime_profile_ref is derived from the verified witness. Feature universe, checkpoint sets, acceptance criteria, rule sets, candidate material, context, target role, Unicode tables/runtime aggregate, and vectorization results are deliberately absent from CreateBaselineInput and are neither resolved nor replayed by this constructor. Supplying any such extra field violates the closed input shape.

The baseline identity preimage contains every baseline field except baseline_id and baseline_digest, including project, feature-profile ref, components, dependency-bound producer manifest digest, producer_verification_ref, runtime-profile ref, provenance, and authority effect. baseline_id is "deterministic-baseline." plus its hash. baseline_digest includes every field except itself. Provenance is exactly the feature-profile ref as feature_profile, runtime-profile ArtifactRef as runtime_artifact, and the producer verification receipt ref as producer_verification when one exists. producer_verification_ref equals that provenance ref when present and is null exactly when no such entry exists. No unavailable universe, checkpoint, rule-set, context, or Unicode-runtime ref appears in the baseline identity.

~~~ts
interface BaselineScoreInput {
  record_mode: Task4RecordMode;
  baseline: DeterministicBaseline;
  feature_profile: FeatureProfile;
  vectorization_input: CandidateVectorizationInput;
  vector: CandidateFeatureVector;
}

interface BaselineCandidateScore {
  candidate_ref: DigestRef;
  vector_ref: DigestRef;
  baseline_ref: DigestRef;
  applicable_components: Array<{
    name: BaselineComponent["name"];
    raw_value: number;
    declared_weight: number;
    normalized_weight: number;
    contribution: number;
  }>;
  omitted_components: Array<
    "required_facts" | "recovery" | "terminology" | "evidence" | "one_minus_length"
  >;
  score: number;
  score_digest: Digest;
}
~~~

Raw values map as follows: required facts, recovery, terminology, and evidence use their named coverage; contextual specificity uses section 7.1; one-minus-generic is 1 minus generic density; one-minus-length is 1 minus length distance. A coverage or length component is omitted exactly when its missing indicator is 1. Contextual specificity and one-minus-generic are always applicable for an eligible vector. Declared weights of applicable components are divided by their finite positive sum. score is the finite sum of normalized weight times raw value, clipped to [0,1]. score_digest hashes every score field except itself.

~~~ts
interface BaselinePairInput {
  record_mode: Task4RecordMode;
  baseline: DeterministicBaseline;
  feature_profile: FeatureProfile;
  candidate_a_vectorization_input: CandidateVectorizationInput;
  candidate_a: CandidateFeatureVector;
  candidate_b_vectorization_input: CandidateVectorizationInput;
  candidate_b: CandidateFeatureVector;
}

interface BaselinePairResult {
  baseline_ref: DigestRef;
  candidate_a_ref: DigestRef;
  candidate_b_ref: DigestRef;
  candidate_a_vector_ref: DigestRef;
  candidate_b_vector_ref: DigestRef;
  score_a: number;
  score_b: number;
  score_difference: number;
  probability_a: number;
  probability_b: number;
  pair_digest: Digest;
}

interface BaselineOrderingInput {
  record_mode: Task4RecordMode;
  baseline: DeterministicBaseline;
  feature_profile: FeatureProfile;
  candidates: [{
    vectorization_input: CandidateVectorizationInput;
    vector: CandidateFeatureVector;
  }, ...Array<{
    vectorization_input: CandidateVectorizationInput;
    vector: CandidateFeatureVector;
  }>];
}

interface BaselineOrderedCandidate {
  rank: number;
  candidate_ref: DigestRef;
  vector_ref: DigestRef;
  score: number;
}
~~~

All three scoring functions first reverify the complete baseline and supplied FeatureProfile. For every vector they then call vectorizeCandidate() with its complete paired vectorization_input, require an eligible result, and require the returned CandidateFeatureVector to equal the supplied vector byte-for-byte. This scoring-time replay, not createDeterministicBaseline(), rechecks the dependency manifest, feature-universe artifact, profile-bound global scope-source ref union, selected target/candidate source byte equality, candidate and selected-binding material/acceptance-criteria/checkpoint bytes, the independently enumerated complete selected-binding policy-item rule-set collection, the manifest/profile global-union equations, every local gate and aggregate, effective grapheme intersection, Unicode/runtime behavior, exact derived values, counts, satisfied refs, provenance, identity, digest, and ref; a self-consistent caller-authored vector is insufficient. baseline.feature_profile_ref equals the exact supplied profile ref. baseline.project_id equals the replayed vector project, profile scope project, universe project, selected binding project, both scope projects, and checkpoint store project. baseline.runtime_profile_ref equals the replayed vector, profile payload, universe, selected binding, Unicode-runtime StoreArtifactWitness, and baseline runtime_artifact provenance refs. The replay also requires target_scope_role target. Universe, context, checkpoint, and Unicode-runtime equality are established from the complete paired vectorization input/result and, for pair or ordering operations, across every replayed candidate; they are not baseline fields. Each vector.feature_order equals, position for position, profile.payload.features ordered by position and therefore equals the exact 21-name tuple in section 7.3. values has exactly 21 finite entries; boolean and missing-indicator positions are exactly 0 or 1, numeric positions obey their declared [0,1] and missing-value rules. A mismatch fails before scoring as feature_profile_binding.

baseline_ref is the exact auxiliary ref { record_id: baseline_id, schema_id: "contentmd.task4-deterministic-baseline", schema_version: "0.1.0", content_digest: baseline_digest }. vector_ref is the exact auxiliary ref { record_id: vector_id, schema_id: "contentmd.task4-candidate-feature-vector", schema_version: "0.1.0", content_digest: vector_digest }. BaselineCandidateScore binds vector_ref and baseline_ref, and score_digest hashes every score field except itself. A candidate ref alone is never treated as the identity of the calculated vector.

Pair vectors must be distinct by both candidate ref and vector ref and bind the same project, profile, context_ref, target_scope_ref/target role, feature_universe_ref, checkpoint_set_ref, runtime_profile_ref, and Unicode-runtime digest. Each vector equals the eligible replay of its paired vectorization input. BaselinePairResult binds both exact vector refs. Let d = score_a - score_b. Probability A is clip(sigmoid(4d), 0.000001, 0.999999), except exact binary64 d = 0 returns exactly 0.5. Probability B is exactly 1 - probability A. Sigmoid uses the overflow-safe positive/negative branch. Pair digest hashes every field except itself.

Ordering input bindings are unique by candidate ref and vector ref; every vector equals the eligible replay of its paired vectorization input; and all bind the same project, profile, context_ref, target_scope_ref/target role, feature_universe_ref, checkpoint_set_ref, runtime_profile_ref, and Unicode-runtime digest. Ordering sorts descending score, then ascending candidate_ref.content_digest. Each row binds its exact vector_ref. Equal candidate content digests for distinct candidate refs are invalid. Rank is zero-based. No host sort instability or input order can affect the result.

## 9. Mode, quarantine, and error precedence

All eight public functions use the same gate:

1. Without reading any nested value, descriptor-validate the closed top-level object and its own enumerable data-property record_mode sufficiently to establish the exact literal "development_fixture" or "official". A missing or extra top-level key, inherited/accessor/symbol/non-enumerable top-level property, non-object top level, or invalid record_mode throws "task4_contract_invalid:input_shape".
2. If record_mode is official, throw "task4_contract_invalid:official_mode_not_supported" before producer, subject, or semantic work. No output, receipt, snapshot, profile, vector, score, or baseline is emitted.
3. Only for development_fixture, validate every nested closed shape and domain, canonical structure, raw bytes, producer, runtime, refs, digests, complete objects, checkpoint closure, profile bindings, and provenance. Failure throws the first exact integrity code below.
4. Apply bounded quarantine and semantic exclusion rules.
5. Calculate and require finite deterministic results.

~~~ts
type Task4ContractErrorCode =
  | "task4_contract_invalid:input_shape"
  | "task4_contract_invalid:official_mode_not_supported"
  | "task4_contract_invalid:canonical_value"
  | "task4_contract_invalid:producer_witness"
  | "task4_contract_invalid:unicode_runtime"
  | "task4_contract_invalid:digest"
  | "task4_contract_invalid:reference_binding"
  | "task4_contract_invalid:scope_mismatch"
  | "task4_contract_invalid:checkpoint_binding"
  | "task4_contract_invalid:feature_profile_binding"
  | "task4_contract_invalid:provenance"
  | "task4_contract_invalid:quarantined_expression_present"
  | "task4_contract_invalid:forbidden_input_field"
  | "task4_contract_invalid:numeric_nonfinite";
~~~

Within step 3, codes have the order shown beginning with canonical_value; input_shape and official_mode_not_supported are exhausted by steps 1 and 2 and are not reconsidered. The earliest applicable code wins; traversal is canonical-key order and array order. Semantic exclusions never hide an integrity failure. A quarantined candidate is accepted only in its bounded no-expression shape and produces "quarantined_source_class". Its evidence_ref, including content_digest, is permitted only in that bounded shape. Browser, competitor, or third-party text, tokens, expression digests, projections, feature materials, match forms, lexicon entries, candidate expressions, or scoring inputs are an integrity failure, not a low score.

Integrity-code mapping is exhaustive. After the official-mode short circuit, canonical_value applies to every otherwise-unmapped nested structural or domain failure: missing, extra, unknown, inherited, accessor, symbol, cyclic, non-enumerable, or non-plain nested values; wrong JSON type; invalid literal or enum; empty required string; invalid RFC 3339 timestamp; unsafe or out-of-range integer; invalid tuple length; and set duplication or noncanonical order. The following conditions are classified only by their more specific code and therefore do not also become canonical_value: malformed digest syntax or an object's own claimed digest or derived-ID mismatch uses digest; quarantined expression or expression-digest presence uses quarantined_expression_present; a recursively forbidden input key uses forbidden_input_field; and a nonfinite input or derived calculation uses numeric_nonfinite. Producer, dependency-closure/import-edge, dependency-manifest, code-digest, and producer-manifest equations use producer_witness; Unicode bundle/runtime equations use unicode_runtime; every other complete-object/ref equality, including selected scope-object canonical-byte equality to scope_material_sources, retrieval-projection/evidence equality, complete rule-set artifact pairing, deterministic rule replay, supplied finding/status replay, or cross-object state mismatch uses reference_binding unless a more specific rule below applies. A FeatureContextBinding or complete scope source mismatch among its Task 2 context locale/project, target/candidate role, project/coordinate/locale, candidate context, or acyclic no-back-reference rule uses scope_mismatch whether or not that binding is selected by a vector; complete FeatureMaterial project/locale, CandidateRuleSet project/locale, and parsed generic-lexicon locale mismatches use the same code. In particular, a validly shaped supplied wrong-locale scope or material selects scope_mismatch before set comparison. Any Task 3 closure, temporal prefix, context-binding membership, exact global scope-source ref-set mismatch, scope source outside its exact checkpoint closure, exact local material-set mismatch, independently enumerated binding-local acceptance/rule-set equality, other global-union equality, or incomplete rule-set membership uses checkpoint_binding. Any FeatureProfile schema, source-artifact, definition, project/universe/context/target-role/runtime equality outside that binding/source scope rule, vector replay/identity/value-domain, or baseline/profile/vector mismatch uses feature_profile_binding; provenance membership/order uses provenance. This mapping has no unspecified integrity catch-all. When more than one nonexclusive mapping applies, the declared code order still selects the first.

Official mode is deliberately unavailable in 0.1. Supporting it later requires authenticated resolution, canonical-store readback, revocation/currentness authority, operation authorization, and error-precedence reconciliation in a new approved contract.

## 10. Node 24 TDD acceptance

Implementation follows red-green-refactor under exact Node v24.14.0. No Task 4 test may use the host Unicode implementation, current time, randomness, filesystem discovery, network, browser, database, model, or unresolved registry.

Each suite includes dependency-closure mutation tests: omit or add a transitive module, alter one dependency byte, alter one derived import edge, alias one path, substitute a package-resolution artifact, or keep entry bytes fixed while changing a Task 3 Unicode/checkpoint/core dependency. Every case fails producer_witness, and the valid closure produces one stable dependency-manifest, code, and producer-manifest digest.

retrieval.test.ts must first fail, then prove:

- closed query/projection/input shapes and exact digest preimages, including exact raw query terms, normalized term sequences, and normalized-token union;
- every exact scope/state filter and the fixed first-exclusion precedence;
- quarantined candidates carry no expression and never score;
- outcome projection is required and bound;
- exact Unicode tokenization, field weights, evidence mapping, transfer rule, and stable ties;
- expired, revoked, unresolved, rights-blocked, stale, mismatched, and zero-hit cases;
- approved and quarantined candidate input permutation produces byte-identical snapshot output;
- snapshot ref, identity, digest, registry binding, and provenance;
- verifyRetrievalSnapshot() replay, with one-at-a-time hit score, ordering, exclusion, provenance, producer dependency, and snapshot-ID mutations rejected;
- raw spelling or term-grouping changes cannot create same-ID/different-content snapshots, and null versus non-null or differing producer receipts are identity-bound;
- nested shape/domain failures exercise the exhaustive code table, while official mode still fails before nested integrity and semantic work.

features.test.ts must first fail, then prove:

- exact 21 definitions, positions, types, transformations, nullability, missing links, forbidden field order, and public exports;
- complete Task 3 checkpoint replay and independent enumeration of every exact-schema FeatureMaterial ref in each binding's transitive checkpoint closure;
- canonical complete scope_material_sources equals the exact unique union of every binding target and permitted-candidate ref; every object rehashes, uses the required role/project/locale/coordinates/rights, belongs to its checkpoint closure, and satisfies the no-back-reference graph for all bindings;
- acyclic scope/context binding: ScopeMaterial has no context_ref, target coordinates match the binding-selected context, the context-to-target-scope source edge is one-way, candidate.payload.context_ref equals binding.context_ref, and vector target/candidate objects are byte-equal to their selected profile sources rather than new scope assertions;
- altered post-presentation bytes, uncommitted refs, wrong project/rights/source class, and quarantined material fail; a validly shaped wrong-locale supplied material, candidate scope, or generic lexicon fails scope_mismatch;
- exact scope matches, contiguous token matching, distinct-item ratios, missing indicators, generic overlap counting, grapheme range formula, and clipping;
- a one-binding universe whose checkpoint closure contains no exact FeatureMaterial-schema ref has empty binding, profile-source, and global feature_material_refs unions, remains well-typed, and produces the declared missing indicators without weakening checkpoint or rule completeness; any closure material omission/addition/substitution and an empty declaration over a nonempty derived set fail;
- every current exact-project acceptance_criteria manifest entry is applicable to its own binding without a context-ref/source_refs filter; all of that binding's policy StableSet item refs form its complete local rule set, while caller/universe subsets, omitted policy items, and context-filtered enumeration fail;
- two bindings with distinct checkpoints and disjoint scope, material, acceptance-criteria, and rule-set collections retain different exact local sets; manifest/profile scope, material, and hard-rule sources equal only their unique global unions, and vectorization plus score/pair/order replay consumes only the selected binding's complete local set;
- with only the first of two bindings selected for vectorization, omission or one-at-a-time mutation of the unused second binding's target/candidate source object, ref, role, project, coordinate, locale, rights, closure edge, or forbidden back-reference still makes createFeatureProfile() fail; a selected standalone scope mutation or non-byte-equal replacement fails vectorization;
- omitting or adding one binding member in a manifest global union or profile global source fails, while comparing a valid multi-binding global union for equality to either local set is rejected by the mutation oracle;
- zero, one, and multiple acceptance-criteria grapheme constraints produce respectively missing length, the declared range, and the deterministic max-min/min-max intersection; conflicting intersections return hard_rule_failed with no vector and exact sorted acceptance-criteria provenance;
- zero-token, zero-grapheme, hard-rule, prohibited-claim, and bounded quarantine negative results emit no vector;
- two-or-more selected-checkpoint applicable rule sets are all replayed, findings aggregate deterministically, and a selected binding plus universe/profile that jointly omits one still fails alongside missing, extra, duplicate, cross-paired, or permissive caller subsets;
- feature-universe/profile/vector identity and digest preimages, including global_scope_material_refs and producer_verification_ref null/non-null identity binding with its exact three-field Task 1 provenance projection;
- one-at-a-time feature-universe artifact byte/ref plus vector value, count, satisfied-ref, grapheme-constraint-ref, provenance, project, context, target-role, runtime-profile, Unicode-runtime, dependency-manifest, import-edge, and dependency-byte mutations change identity or fail replay;
- expression, material, and array permutations that are semantically ordered or unordered behave exactly as declared;
- official mode and error precedence.

baseline.test.ts must first fail, then prove:

- the exact auxiliary baseline identity and ref, with no schema-registry addition;
- construction validates only the static profile, complete frozen runtime-profile StoreArtifactWitness, and dependency-closed producer; closed-shape tests reject universe, checkpoint, scope-source, rule, context, vector, Unicode-table-bundle, and Unicode-runtime-aggregate construction fields;
- exact component values, contextual-specificity projection, omission, renormalization, and finite score;
- all-missing optional components still have positive denominator from contextual specificity and generic density;
- exact tie 0.5, A/B reversal, probability complement, clipping, overflow-safe sigmoid, and score digest;
- deterministic ordering ties by candidate content digest;
- baseline/profile/project/runtime and scoring-time universe/context/checkpoint/target-role/Unicode bindings, plus vector/profile/feature-order mismatches, fail before scoring;
- pair and ordering context, universe, checkpoint, candidate-ref, and vector-ref mismatches fail, while score, pair, and ordering outputs bind the exact vector refs;
- score, pair, and ordering perform the full artifact/hard-rule replay unavailable at baseline construction and reject a digest-valid self-authored vector or any vector whose paired full vectorization replay differs in profile-bound scope-source union/selected-source bytes, values, counts, satisfied refs, provenance, selected-binding material/acceptance-criteria enumeration, selected-binding policy-item rule sets, manifest/profile global-union equations, grapheme intersection, gates, or dependencies;
- nested error-code fixtures and non-finite values select the declared first code;
- official mode fails closed.

The focused acceptance commands are:

~~~text
NODE24=/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node
test "$("$NODE24" --version)" = "v24.14.0"
"$NODE24" node_modules/vitest/vitest.mjs run \
  packages/learning/test/retrieval.test.ts \
  packages/learning/test/features.test.ts \
  packages/learning/test/baseline.test.ts
~~~

After focused green, run the committed Task 1 through Task 3 learning tests, the full suite, TypeScript build, package-boundary check, foundation verifier, and diff check. Unicode artifact generation remains offline and runs in check mode. Exact commands are in the amended Task 4 plan.

## 11. Non-goals and implementation stop conditions

Task 4 does not add embeddings, learned retrieval, generation, training, standardization, model fitting, test opening, evaluation gates, shadow routing, promotion, or deployment. It does not alter Task 1 schemas or Task 3 checkpoints. It does not infer market or risk from locale, project from a title, approval from lifecycle, freshness from recency, rights from availability, or evidence from a bare ref.

Implementation stops rather than inventing behavior if a committed upstream public type conflicts with an exact type here, if Task 3 does not export enough committed checkpoint material to verify the declared closure without editing Task 3, or if the exact pinned Unicode artifacts are unavailable. Such a conflict requires a separately reviewed contract amendment, not a permissive fallback.
