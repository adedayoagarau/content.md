# content.md Recursive Learning and Pairwise Ranking 0.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` task by task. Use `superpowers:test-driven-development`, `agentic-eval`, and `superpowers:verification-before-completion`.

**Goal:** Build a deterministic, interpretable expression-preference ranker that learns only from qualified, project-owned comparisons, evaluates against a frozen baseline without leakage, runs in shadow with no output influence, and changes active bindings only through a separate human promotion decision with monitored rollback.

**Architecture:** Immutable qualification and eligibility records create pairwise examples. Transitive leakage groups determine deterministic train/validation/test splits. A frozen feature profile produces inference-time-only vectors. L2-regularized pairwise logistic regression trains deterministically under Node 24.14. A sealed held-out evaluation and no-influence shadow run precede compare-and-swap promotion. Drift, revocation, and rollback append new events without rewriting history.

**Tech stack:** Node.js 24.14.0, pnpm 11.9.0, TypeScript 7.0.2, Vitest 4.1.11, AJV 8.20.0, SHA-256, IEEE-754 binary64 identity, Unicode 17.0 frozen tables, canonical JSON, and the retained event store.

**Specs:** [Live Intelligence and Learning 0.1](../specs/2026-08-20-contentmd-live-intelligence-learning-design.md), sections 9–12 and 17.2, plus the normative [Recursive Learning Record Contracts 0.1](../specs/2026-08-20-contentmd-learning-record-contracts-design.md) and [Feedback Qualification Contracts 0.1](../specs/2026-08-20-contentmd-feedback-qualification-contracts-design.md).

## Prerequisite and ownership boundary

The canonical pattern-contract reconciliation in Task 1 of [the public UX-writing corpus plan](2026-08-20-contentmd-public-ux-writing-journey-corpus.md) must be complete first. This plan consumes the resulting `ContentPatternRecord`; it does not re-edit the frozen packet DTO or converter.

The shared-file dependency and ownership rules in [the program execution-order DAG](2026-08-20-contentmd-program-execution-order.md) are normative. Mutations to `packages/schemas/src/schema-registry.ts`, package exports, root manifests, root TypeScript configuration, `README.md`, and foundation verification are serialized by that DAG rather than edited concurrently. In particular, this plan's Task 1 follows public-corpus Task 1, and public-corpus Task 6 consumes the learning schemas produced by this plan's Task 1.

Browser and competitor records are never learning examples. The only permitted bridge is:

    reviewed evidence -> approved abstract pattern -> project-authored candidate text

Ranking labels come from a separate path:

    project-owned same-context pair -> qualified blinded review
      -> eligibility -> preference example -> leakage-safe dataset

## Global constraints

1. Version 0.1 implements exactly `ranking_objective: expression_preference` and `candidate_kind: expression`.
2. The ranker reorders already eligible expressions. It never generates text and never compensates for a hard-rule failure.
3. Accepted or edited copy is observational until qualification establishes rubric, reviewer qualification, stable context, blinding, randomized side/order, rationale, conflict, and objective.
4. Ties and abstentions remain distinct. A rejection without a selected comparator cannot create a pairwise label.
5. One reviewer may support only personal or named-project observation. Active organizational/public promotion requires the exact policy-defined reviewer set, independence, conflicts, and adjudication.
6. Features use only frozen, inference-time-available data. Identity, protected class, inferred emotion/vulnerability, presentation side/order, decision, and post-decision outcomes are prohibited.
7. Competitor expression digests and browser evidence may be used only to block copying; they cannot enter prompts, labels, feature vectors, or model fitting.
8. Test data is sealed before candidate fitting and can be opened once per candidate. Reuse requires a new model and forward holdout.
9. No promotion, binding, drift suspension, or rollback can silently mutate prior records.
10. Fine-tuning, reinforcement learning, online weight updates, automatic prompt mutation, embeddings, and cross-organization learning are outside 0.1.

---

## Task 1: Add canonical learning record schemas

**Files:**

- Create: `packages/schemas/src/learning-records.schema.json`
- Create: `packages/learning/src/records.ts`
- Create: `packages/learning/test/records.test.ts`
- Modify: `packages/schemas/src/schema-registry.ts`
- Modify: `packages/schemas/src/index.ts`
- Modify: `packages/learning/src/index.ts`
- Modify: `packages/learning/package.json`
- Modify: `pnpm-lock.yaml`

**Step 1: Write failing closed-schema tests**

Implement the exact shared fields, nullability, schema IDs, local states, authority-effect branches, and structural/runtime boundary in [Recursive Learning Record Contracts 0.1](../specs/2026-08-20-contentmd-learning-record-contracts-design.md). Add exact schemas and TypeScript parity checks for:

- `GenerationRunRecord`
- `FeedbackQualificationRecord`
- `LearningEligibilityRecord`
- `PreferenceExampleRecord`
- `ExemplarRecord`
- `LeakageGroupRecord`
- `LearningDatasetManifest`
- `FeatureProfile`
- `RankingModelRecord`
- `LearningEvaluationRun`
- `ShadowEvaluationPlan`
- `ShadowBindingRecord`
- `LearningPromotionDecision`
- `LearningDeploymentBinding`
- `LearningDriftReport`
- `LearningRollbackRecord`
- `WritingBenchmarkManifest`
- `WritingBenchmarkTaskRecord`
- `BenchmarkCandidateSetRecord`
- `BenchmarkSelectionRecord`
- `BenchmarkReviewRecord`
- `BenchmarkAttemptRecord`
- `WritingBenchmarkRun`

Run:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/learning/test/records.test.ts

Expected: FAIL because the schemas and types do not exist.

**Step 2: Implement exact identity and state unions**

Every record binds the addendum's exact objective, candidate kind, schema/code/input digests, canonical scope and lineage, local state, record mode, and authority effect. `BenchmarkAttemptRecord` additionally requires an ordered `provider_operation_plan_set` of exactly 60 closed `{ task_id, plan_id, plan_digest }` entries plus its canonical set digest. Task 1 enforces shape and whole-entry uniqueness; Task 8 enforces semantic ID uniqueness, manifest-set equality, ordering, and digest recomputation before issuance. `BenchmarkCandidateSetRecord` requires the exact plan-to-nonce-to-provider-receipt/output-to-candidate-set chain and its completed, verified, nonquarantined state. Unknown fields fail. Decision, approval, deployment, evaluation, and attempt states remain independent.

Add `@contentmd/schemas: workspace:*` as a learning-package development dependency so the parity tests exercise the public schema API without introducing a schemas-to-learning dependency cycle. The lockfile change is part of this task.

**Step 3: Verify and commit**

    NODE24=/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node
    PNPM=/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm
    test "$("$NODE24" --version)" = "v24.14.0"
    test "$("$PNPM" --version)" = "11.9.0"
    "$PNPM" install --lockfile-only --offline
    "$NODE24" node_modules/vitest/vitest.mjs run packages/learning/test/records.test.ts packages/schemas/test/schema-registry.test.ts
    "$NODE24" node_modules/vitest/vitest.mjs run
    "$NODE24" node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
    "$NODE24" scripts/check-package-boundaries.mjs
    PATH="/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:$PATH" "$NODE24" scripts/verify-foundation.mjs
    git diff --check
    git add packages/schemas packages/learning pnpm-lock.yaml
    git commit -m "feat: add recursive learning record contracts"

---

## Task 2: Qualify feedback and build valid same-context preferences

**Files:**

- Create: `packages/learning/src/qualification.ts`
- Create: `packages/learning/src/eligibility.ts`
- Create: `packages/learning/src/preference.ts`
- Create: `packages/learning/test/qualification.test.ts`
- Create: `packages/learning/test/eligibility.test.ts`
- Create: `packages/learning/test/preference.test.ts`
- Modify: `packages/learning/src/feedback.ts`
- Modify: `packages/learning/src/index.ts`
- Modify: `packages/learning/src/records.ts`
- Modify: `packages/schemas/src/learning-records.schema.json`
- Modify: `packages/learning/test/records.test.ts`

Implement the exact adapter, complete-input, digest, state, lineage, permission, and preference contract in [Feedback Qualification Contracts 0.1](../specs/2026-08-20-contentmd-feedback-qualification-contracts-design.md). Preserve the legacy event-return API. Never relabel its event digest as a durable decision digest.

**Step 1: Correct the qualification observability fields and write failing tests**

Change `FeedbackQualificationRecord.blinded` and `.randomized` from literal-true fields to required booleans. This is the narrow cross-task reconciliation that lets failed proof remain an inspectable `not_qualified` record; a `qualified` state still requires both true. Add schema/type parity tests for true and false before writing behavioral tests.

Then cover event-to-durable-decision adaptation, independent event/record/boundary digest recomputation, blinded A/B review, randomized side/order, stable task/context digests, exact rubric and reviewer qualification, rationale codes, tie, abstention, conflict, adjudication, changed fact/requirement, rights/privacy incident, resolver/producer receipts, and browser/competitor source rejection. Start RED.

**Step 2: Implement fail-closed qualification**

    export function qualifyFeedback(
      input: FeedbackQualificationInput,
    ): FeedbackQualificationRecord;

    export function determineLearningEligibility(
      input: LearningEligibilityInput,
    ): LearningEligibilityRecord;

    export function createPreferenceExample(
      input: PreferenceExampleInput,
    ): PreferenceExampleRecord;

Edited content may compare against the proposal only when the eligibility record proves the edit reflects content quality under unchanged facts and requirements. Candidate order remains A/B; do not rewrite winner-first.

Malformed/corrupt inputs throw without issuing a learning record. Verified substantive failures remain qualification or eligibility records. `createPreferenceExample` emits only an admitted qualified decisive and eligible pair; it rejects every other input without creating a preference identity. Task 2 binds, but does not temporally validate, the feature-source checkpoint; Task 3 owns that check.

**Step 3: Verify and commit**

    NODE24=/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node
    test "$("$NODE24" --version)" = "v24.14.0"
    "$NODE24" node_modules/vitest/vitest.mjs run packages/learning/test/records.test.ts packages/learning/test/feedback.test.ts packages/learning/test/qualification.test.ts packages/learning/test/eligibility.test.ts packages/learning/test/preference.test.ts packages/schemas/test/schema-registry.test.ts
    "$NODE24" node_modules/vitest/vitest.mjs run
    "$NODE24" node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
    "$NODE24" scripts/check-package-boundaries.mjs
    PATH="/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:$PATH" "$NODE24" scripts/verify-foundation.mjs
    git diff --check
    git add packages/learning packages/schemas/src/learning-records.schema.json docs/superpowers/specs/2026-08-20-contentmd-feedback-qualification-contracts-design.md docs/superpowers/specs/2026-08-20-contentmd-learning-record-contracts-design.md docs/superpowers/plans/2026-08-20-contentmd-recursive-learning-ranking.md research/INDEX.md
    git commit -m "feat: qualify content preference evidence"

---

## Task 3: Build transitive leakage groups and sealed datasets

Implement against the exact [Leakage and Dataset Contracts 0.1](../specs/2026-08-20-contentmd-leakage-dataset-contracts-design.md). That addendum is normative for resolver-free evidence, checkpoints, Unicode behavior, group identity, singleton and diagnostic dispositions, dataset state, issuance, and test acceptance.

**Files:**

- Create: `docs/superpowers/specs/2026-08-20-contentmd-leakage-dataset-contracts-design.md`
- Create: `packages/learning/src/leakage.ts`
- Create: `packages/learning/src/dataset.ts`
- Create: `packages/learning/src/unicode-normalization.ts`
- Modify: `packages/learning/src/index.ts`
- Create: `packages/learning/test/leakage.test.ts`
- Create: `packages/learning/test/dataset.test.ts`
- Create: `packages/learning/test/unicode-normalization.test.ts`
- Create: `scripts/generate-unicode-17-artifacts.mjs`
- Create: `scripts/acquire-unicode-17-sources.mjs`
- Create: `fixtures/learning-ranking/feature-source-store-schema.json`
- Create: `fixtures/learning-ranking/feature-source-runtime-profile.json`
- Create: `fixtures/learning-ranking/unicode-17-source-lock.json`
- Create: `fixtures/learning-ranking/unicode-17-acquisition-receipt.json`
- Create: `fixtures/learning-ranking/unicode-17-sources/`
- Create: `fixtures/learning-ranking/unicode-17-normalization.json`
- Create: `fixtures/learning-ranking/unicode-17-casefold.json`
- Create: `fixtures/learning-ranking/unicode-17-whitespace.json`
- Create: `fixtures/learning-ranking/unicode-17-word-break.json`
- Create: `fixtures/learning-ranking/unicode-17-grapheme-break.json`

**Step 1: Write failing transitive grouping tests**

If the vendored Unicode 17 source directory is absent, run the contract's one bounded, credential-free `www.unicode.org` acquisition and commit its source lock and development-fixture receipt before generating artifacts. The lock includes exact Unicode 17 UCD inputs, UAX #29 revision 47, and the official word/grapheme conformance files. Every normal build and test run remains offline.

Union the complete resolver-free semantic-message lineage, supersession, task/template family, source-occurrence, locale/channel-variant, and computed near-duplicate evidence. Normalize only with the source-locked Unicode 17 NFKC, full default case-fold, and `White_Space` artifacts. Generate the word/grapheme tables from the exact addendum algorithms and require every vendored UAX #29 conformance case to pass. Use consecutive Unicode-scalar trigram sets and the exact integer threshold `intersection * 20 >= union * 17`. Strings under three scalars group only on exact equality. Preserve the addendum's canonical multi-reason edges and fixed-point admitted-relation closure. A singleton has `edges: []`; retain its evidence-backed message-lineage relation only as a commitment/component-evidence/provenance binding.

**Step 2: Implement deterministic splits**

The split preimage is UTF-8 `contentmd.learning-split/0.1.0\0` plus leakage-group ID. Interpret SHA-256 as unsigned big-endian; buckets 0–79 train, 80–89 validation, and 90–99 test.

Freeze and completely validate the addendum's store binding, closed expression-free optional feature payloads, all ten role streams including zero heads, append prefixes, receipts, checkpoint-set preimages, and presentation digest dependency. Keep later-event suffixes outside the immutable checkpoint in the separate post-checkpoint observation witness. Reject later or backdated feature sources by sequence/head commitment and that witness; reject unmanifested inputs and cross-split lineage independently.

**Step 3: Enforce dataset thresholds**

Training eligibility requires at least 100 decisive pairs and 30 leakage groups, with nonempty train, validation, and test splits and at least 20 pairs and 5 groups in both validation and test. Below threshold, emit only the exact diagnostics disposition in the addendum. When a deterministic split is structurally empty, return non-record diagnostics and no manifest because the Task 1 schema forbids empty split arrays. Seal only a threshold-complete manifest; do not open its test set.

**Step 4: Verify and commit**

    NODE24=/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node
    test "$("$NODE24" --version)" = "v24.14.0"
    "$NODE24" node_modules/vitest/vitest.mjs run packages/learning/test/records.test.ts packages/learning/test/qualification.test.ts packages/learning/test/eligibility.test.ts packages/learning/test/preference.test.ts packages/learning/test/unicode-normalization.test.ts packages/learning/test/leakage.test.ts packages/learning/test/dataset.test.ts packages/schemas/test/schema-registry.test.ts
    "$NODE24" scripts/generate-unicode-17-artifacts.mjs --check
    "$NODE24" node_modules/vitest/vitest.mjs run
    "$NODE24" node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
    "$NODE24" scripts/check-package-boundaries.mjs
    PATH="/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:$PATH" "$NODE24" scripts/verify-foundation.mjs
    git diff --check
    git add packages/learning fixtures/learning-ranking scripts/acquire-unicode-17-sources.mjs scripts/generate-unicode-17-artifacts.mjs docs/superpowers/specs/2026-08-20-contentmd-leakage-dataset-contracts-design.md docs/superpowers/plans/2026-08-20-contentmd-recursive-learning-ranking.md
    git commit -m "feat: build leakage safe learning datasets"

---

## Task 4: Freeze features, deterministic retrieval, and the baseline

**Files:**

- Create: `docs/superpowers/specs/2026-08-20-contentmd-retrieval-features-baseline-contracts-design.md`
- Create: `packages/learning/src/retrieval.ts`
- Create: `packages/learning/src/features.ts`
- Create: `packages/learning/src/baseline.ts`
- Create: `packages/learning/test/retrieval.test.ts`
- Create: `packages/learning/test/features.test.ts`
- Create: `packages/learning/test/baseline.test.ts`
- Create: `fixtures/learning-ranking/generic-language-lexicon.json`
- Modify: `packages/learning/src/index.ts`

**Normative contract:** [Retrieval, Feature, and Baseline Contracts 0.1](../specs/2026-08-20-contentmd-retrieval-features-baseline-contracts-design.md). Its closed types, public functions, digest preimages, exclusion and error precedence, Unicode behavior, quarantine rules, official-mode failure, formulas, and TDD acceptance are exact. `RetrievalSnapshot`, feature material/vector objects, and the deterministic baseline are resolver-free auxiliary digest objects; this task does not add a twenty-fourth Task 1 record. `FeatureProfile` remains the one registered durable record.

**Step 1: Write failing retrieval contract tests**

Test the exact closed query and projection, raw query-term plus normalized-sequence/token identity binding, complete canonical-pattern binding, all scope/state filters, fixed exclusion precedence, five-field Unicode lexical score, evidence strength, transfer conditions, stable ties, quarantined no-expression input, zero-hit behavior, full-output snapshot identity/digest/provenance and verification replay, null/non-null and differing producer-receipt identity, exact transitive dependency-manifest closure, one-at-a-time hit/score/exclusion/provenance/dependency mutations, exhaustive nested error mapping, and the top-level official fail-closed path. Run the focused test and require the initial failure to be missing Task 4 behavior, not a syntax or fixture error.

**Step 2: Implement deterministic retrieval**

Implement only `retrieveApprovedPatterns()`, `verifyRetrievalSnapshot()`, and their closed exported types. Consume complete resolver-free inputs, a deterministically re-enumerated transitive runtime dependency manifest, and the committed Task 3 Unicode 17 artifacts; bind exact raw and normalized query identity, every derived snapshot field, and producer_verification_ref before issuance. Verification reruns retrieval and requires byte identity; do not read a registry, file, clock, browser, network, or host Unicode table implicitly. Browser, competitor, and third-party material remains bounded exclusion provenance and never enters tokens, projections, scores, or output wording.

**Step 3: Write failing profile and vector tests**

Test the exact 21-position `rank-features/0.1.0` profile, feature-universe and checkpoint closure, acyclic scope/material refs with context_ref owned only by FeatureContextBinding, match semantics, all coverage and missing formulas, generic lexicon overlap rule, Unicode grapheme length, forbidden fields, and per-binding deterministic enumeration. Require canonical complete scope_material_sources to cover the exact unique union of every binding target and permitted-candidate ref, bind that union in profile/vector preimages, and validate every object/ref/project/role/coordinate/locale/right/source-closure/no-back-reference equation at profile construction, including an unused second binding. Require vector target/candidate objects to be canonical-byte-equal to the selected profile sources. For every binding, independently enumerate every exact-schema FeatureMaterial ref in its checkpoint transitive closure and every current exact-project acceptance-criteria entry without a context/source-ref filter; require exact local material, acceptance-criteria, policy StableSet item-ref rule, and rule-artifact sets. Test a truly empty derived material set, omission/addition/substitution, wrong project/rights/source class, exact candidate/material/lexicon-to-target-context locale binding with wrong locale selecting `scope_mismatch`, two distinct checkpoints with disjoint local sets, exact unique manifest/profile global unions across bindings, selected-local-only vector replay, complete multi-rule-set aggregation, and jointly omitted-universe/profile plus missing/extra/duplicate/cross-paired/subset rejection. Add one-at-a-time unused-second-binding scope-source mutations and selected standalone scope replacements. Also test zero/one/multiple/conflicting grapheme-range intersections with exact sorted provenance, hard-ineligible no-vector results, exact local/global-set/value/count/satisfied-ref/provenance preimage identity, project/runtime/context/target-role equality, transitive dependency mutations, public exports, exhaustive nested error mapping, and official/error precedence.

**Step 4: Implement the frozen profile and vectorizer**

Implement only `createFeatureProfile()` and `vectorizeCandidate()` plus their closed exported types. Issue a development-fixture `FeatureProfile` through the existing Task 1 schema and `finalizeRecord()`. Keep `ScopeMaterial`, `FeatureMaterial`, `FeatureUniverseManifest`, and `CandidateFeatureVector` as resolver-free auxiliary digest objects. ScopeMaterial contains no context_ref; FeatureContextBinding owns it. createFeatureProfile() receives the canonical complete scope_material_sources union and verifies every binding, including unused ones, before profile issuance: exact target/permitted refs, complete objects, project/role/coordinate/locale/rights, checkpoint source closure, and one-way no-back-reference graph. Bind the exact global scope refs in profile input_digest. At vectorization, require target_scope and candidate_scope to be canonical-byte-equal to selected objects from that same profile-bound union; never accept standalone scope truth. For each binding and its exact checkpoint, independently enumerate the complete transitive-closure FeatureMaterial ref set and every current exact-project acceptance-criteria entry without using context or caller universe membership as an applicability filter; derive that binding's complete local policy StableSet rule/ref/artifact sets and require its declarations to match. Require createFeatureProfile()'s complete scope, material, and hard-rule sources plus the manifest/profile fields to cover the exact unique unions across bindings. At vectorization and scoring replay, consume only the selected binding's complete local scope/material/acceptance/rule/gate/grapheme set; do not compare a multi-binding global union to one local set. Bind candidate scope, every selected material, every selected rule, and the parsed generic lexicon to the selected Task 2 context locale, with wrong locale failing `scope_mismatch`. Intersect every selected-local grapheme constraint by maximum minimum and minimum maximum, treat no bound as missing, and return hard_rule_failed with no vector for a conflicting intersection. Bind every local and global preimage set, term, fact, recovery action, entity, action, evidence, lexicon, tokenizer, Unicode, grapheme constraint/provenance, gate, value, count, satisfied ref, provenance entry, project/context/target role, runtime, producer verification state, and transitive dependency. No caller-selected, binding-selected, or jointly self-declared scope/material/hard-rule subset is conforming. Create the exact project-owned synthetic lexicon bytes specified by the addendum.

**Step 5: Write failing baseline tests**

Test the exact auxiliary baseline identity/ref and static baseline/profile/project/complete-runtime-witness/dependency binding; reject unavailable universe/checkpoint/scope-source/rule/context/vector/Unicode-table fields at construction. At score, pair, and order time, test exact vector refs, complete paired vectorization replay of feature-universe artifacts, profile-bound scope-source union and selected-source bytes, every selected-binding exact-project acceptance criterion, selected-binding policy-item rule sets, manifest/profile global-union equations, grapheme intersections, gates and dependencies, component projection, contextual-specificity formula, omission and renormalization, finite score, pair symmetry, exact tie, clipping, overflow-safe sigmoid, deterministic digest tie-break, pair/ordering context/universe/checkpoint mismatch, one-at-a-time vector value/count/satisfied-ref/grapheme-constraint-ref/provenance/gate/dependency mutations, nested error precedence, public exports, and official fail-closed path.

**Step 6: Implement the deterministic baseline**

Use applicable weights: facts 0.25, recovery 0.15, terminology 0.15, contextual specificity 0.15, evidence 0.15, one-minus-generic-density 0.10, and one-minus-length-distance 0.05; omit inapplicable components and renormalize. Pair probability is `clip(sigmoid(4 * score_difference), 1e-6, 1 - 1e-6)`.

Implement only `createDeterministicBaseline()`, `scoreDeterministicBaseline()`, `compareDeterministicBaseline()`, and `orderBaselineCandidates()` plus their closed exported types. `createDeterministicBaseline()` reverifies only its dependency-closed producer, the complete static FeatureProfile and project, and the complete frozen Task 3 runtime-profile StoreArtifactWitness; it accepts no feature universe, checkpoint, scope source, hard-rule, context, vector, Unicode-table bundle, or Unicode-runtime aggregate. At scoring time, reverify and cross-bind the baseline and FeatureProfile, then rerun `vectorizeCandidate()` from each complete paired input/result to verify the feature-universe artifact, profile-bound scope-source union and selected-source byte equality, selected-binding materials, acceptance criteria and policy-item rules, manifest/profile global-union equations, Unicode runtime, exact 21-position vector order/value domains, target role, and common context/universe/checkpoint semantics. Require byte-identical eligible output; every score, pair, and ordered row binds the replayed exact vector ref. The baseline remains resolver-free and authority-free; `LearningEvaluationRun.baseline_ref` can bind it without a schema-registry addition.

**Step 7: Verify and commit**

    NODE24=/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node
    test "$("$NODE24" --version)" = "v24.14.0"
    "$NODE24" scripts/generate-unicode-17-artifacts.mjs --check
    "$NODE24" node_modules/vitest/vitest.mjs run packages/learning/test/retrieval.test.ts packages/learning/test/features.test.ts packages/learning/test/baseline.test.ts
    "$NODE24" node_modules/vitest/vitest.mjs run packages/learning/test/records.test.ts packages/learning/test/qualification.test.ts packages/learning/test/eligibility.test.ts packages/learning/test/preference.test.ts packages/learning/test/leakage.test.ts packages/learning/test/dataset.test.ts packages/learning/test/unicode-normalization.test.ts
    "$NODE24" node_modules/vitest/vitest.mjs run
    "$NODE24" node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
    "$NODE24" scripts/check-package-boundaries.mjs
    PATH="/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:$PATH" "$NODE24" scripts/verify-foundation.mjs
    git diff --check
    git add docs/superpowers/specs/2026-08-20-contentmd-retrieval-features-baseline-contracts-design.md docs/superpowers/plans/2026-08-20-contentmd-recursive-learning-ranking.md packages/learning/src/retrieval.ts packages/learning/src/features.ts packages/learning/src/baseline.ts packages/learning/src/index.ts packages/learning/test/retrieval.test.ts packages/learning/test/features.test.ts packages/learning/test/baseline.test.ts fixtures/learning-ranking/generic-language-lexicon.json
    git commit -m "feat: freeze content ranking features"

---

## Task 5: Train deterministic pairwise logistic regression

**Spec:** [Pairwise Training and Ranking Contracts 0.1](../specs/2026-08-20-contentmd-pairwise-training-ranking-contracts-design.md)

**Files:**

- Modify: `packages/schemas/src/learning-records.schema.json`
- Create: `packages/schemas/src/model-training-statistics.schema.json`
- Modify: `packages/schemas/src/schema-registry.ts`
- Modify: `packages/schemas/test/schema-registry.test.ts`
- Create: `packages/learning/src/numeric.ts`
- Create: `packages/learning/src/pairwise-logistic.ts`
- Create: `packages/learning/src/rank.ts`
- Create: `packages/learning/src/pairwise-release-profile.ts`
- Modify: `packages/learning/src/index.ts`
- Create: `packages/learning/test/numeric.test.ts`
- Create: `packages/learning/test/pairwise-logistic.test.ts`
- Create: `packages/learning/test/rank.test.ts`
- Modify: `packages/learning/test/records.test.ts`
- Create: `scripts/verify-pairwise-code-manifest.mjs`
- Create: `fixtures/learning-ranking/pairwise-training-code-manifest.json`
- Create: `fixtures/learning-ranking/golden-model.json`
- Create: `fixtures/learning-ranking/golden-model.sha256`

**Interfaces:**

- Consumes: the exact committed Task 3 `BuildLearningDatasetInput`/`buildLearningDataset()` and `SealLearningDatasetInput`/`sealLearningDataset()` contracts, Task 4 `CreateFeatureProfileInput`/`createFeatureProfile()` and `CandidateVectorizationInput`/`vectorizeCandidate()` contracts, Task 1 `RankingModelRecord`, exact code/runtime manifests, and no bare ref/digest/vector or caller-asserted verification boolean.
- Produces: the exact `PairwiseRankingError`, five numeric helpers, `verifyPairwiseCodeManifest`, `admitPairwiseRuntime`, `verifyLearningDatasetForTraining`, `verifyPairwiseFeatureMatrix`, `verifyPairwiseCandidate`, `trainPairwiseLogistic`, `verifyRankingModel`, `predictPairwise`, and `rankEligibleExpressions` exports and every closed replay/result type in the Task 5 contract.
- Depends on: `@contentmd/core`, existing learning-record types, Node/ECMAScript primitives, and Vitest only. Add no third-party runtime package.

- [ ] **Step 0: Correct repeated-coefficient schema semantics**

Write failing registry and learning-record tests proving a RankingModelRecord with two or more identical `0000000000000000` coefficient strings is valid by position. Remove only `uniqueItems: true` from `rankingModelPayload.properties.coefficient_bits` in `learning-records.schema.json`; retain the nonempty array, 16-lowercase-hex item pattern, feature-order uniqueness, equal-length runtime invariant, and every other Task 1 field. Run both focused suites and require PASS before trainer work.

Run:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/schemas/test/schema-registry.test.ts packages/learning/test/records.test.ts

- [ ] **Step 1: Write failing complete replay-handoff tests**

Test `verifyLearningDatasetForTraining`, `verifyPairwiseFeatureMatrix`, and `verifyPairwiseCandidate` from the exact closed section 3 inputs. Rerun Task 3 build plus internally derived seal, require the same exact Task 3 thresholds for all three Task 5 purposes, rerun Task 4 profile creation and candidate vectorization, derive rows/labels/sides/groups/checkpoints from the replayed subjects, and require byte-equal outputs. Add one-field mutations for every build/seal/profile/vector input and derived output, full caller-rehash attempts, below-threshold and diagnostics-only rejection, bare-ref/digest/vector/receipt/boolean rejection, WeakSet/direct-import bypass, exact stored train order, and unconditional top-level official short-circuit before nested proxy/accessor traps.

Run:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/learning/test/pairwise-logistic.test.ts

Expected before implementation: FAIL because the three Task 5 replay verifier exports do not exist.

- [ ] **Step 2: Write and run the failing binary64 tests**

Cover big-endian encodings for positive zero, positive one, and the smallest positive subnormal; negative-zero and non-finite rejection; both stable sigmoid and softplus branches; exact classic-Kahan state order; semantic-array raw UTF-8 ordering; repository `canonicalJson()` object-key compatibility; and non-finite intermediates.

Run:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/learning/test/numeric.test.ts

Expected before implementation: FAIL because the five numeric exports do not exist.

- [ ] **Step 3: Implement only the numeric contract and make its tests pass**

Implement section 4 exactly: binary64 big-endian encoding, canonical positive zero, preserved subnormals, classic Kahan, overflow-safe sigmoid, and softplus. Do not add rounding, quantization, locale collation, randomness, native math, or a dependency.

Run the Step 2 command and require PASS.

- [ ] **Step 4: Write and run the failing standardization and trainer tests**

Use independently calculated fixtures for Task 4's exact 21 positions one-to-one, explicit missing-indicator reuse with no second expansion, all value domains, exact stored train-row order, the exact `2N` population, candidate-wise standardization and clipping before `A - B`, zero variance, train-only statistics, duplicate rejection, one-step loss and gradient, A/B reversal, no intercept, simultaneous full-batch updates, the strict convergence boundary, update 2,000 nonconvergence, and every exact invalid stage/non-finite path.

Run:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/learning/test/pairwise-logistic.test.ts

Expected before implementation: FAIL at the missing trainer API, not at fixture setup.

- [ ] **Step 5: Add the statistics schema and failing identity/state tests**

Add the exact closed `contentmd.model-training-statistics-record` schema from section 7.2 and its focused registry tests. In `pairwise-logistic.test.ts`, cover the exact schema/code/input/statistics/coefficient/model/replay preimages; purpose and both distinct runtime bindings; every record ID, outer digest, scope, and provenance equation; exact 21-entry equalities; repeated big-endian coefficient bits; caller-rehashed coefficient/model-state attacks; deterministic retraining; the closed completed/nonconverged/invalid statistics table; no invalid model issuance; and exhaustive dual-fault error precedence.

Run:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/schemas/test/schema-registry.test.ts packages/learning/test/pairwise-logistic.test.ts

Expected before implementation: FAIL because the schema registration, record producer, and identity verifier are absent.

- [ ] **Step 6: Implement the pure fitter, statistics record, model record, and verifier**

Implement sections 3 and 5–7 without reading a file, store, clock, environment variable, random source, subprocess, or network inside runtime APIs. Implement the three replay verifiers first, with module-private WeakSets and copied/frozen complete values. `admitPairwiseRuntime` alone reads the immutable Node/V8/ICU/Unicode/platform/architecture/endianness tuple. Derive every row/label/side/group/checkpoint/value from replay; never trust a structural cast. Issue a model record only for finite trained or finite nonconverged output. Any invalid path emits no model and uses the exact statistics table. `verifyRankingModel` reruns the complete request including purpose, accepts only a byte-identical trained result, and quarantines a byte-identical nonconverged result.

Run the Step 5 command and require PASS.

- [ ] **Step 7: Write failing rank tests, then implement ranking**

Test complete candidate/profile/vector replay; exact model/profile/project/context/target/checkpoint/universe compatibility; distinct Task 4 feature and Task 5 numeric runtime refs; hard-rule/blocking eligibility with no invented copying/ownership verdict; pairwise reversal; exact development-fixture/authority-none output binding; exact score, unclipped, and clipped bit evidence; finite scores; nonempty rank input; descending order; exact expression-digest ties and tie buckets; duplicate rejection; candidate bijection; and one-field mutations against the exact prediction input/prediction/rank input/tie-trace/output preimages.

Run:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/learning/test/rank.test.ts

Expected before `rank.ts`: FAIL at the missing rank exports. Implement section 8, add the Task 5 exports to `packages/learning/src/index.ts`, rerun, and require PASS.

- [ ] **Step 8: Seal the independently fixed golden and official/quarantine negatives**

Write canonical `pairwise-training-code-manifest.json`, implement the bounded read-only `verify-pairwise-code-manifest.mjs` raw-byte gate, and generate its pinned manifest/runtime values into `pairwise-release-profile.ts`. Write the closed canonical `golden-model.json` and separate exact `golden-model.sha256` lock from section 7.6; keep both golden digests out of the release-profile/input/model preimages. Expected one-step values must be calculated independently of production functions. Add two fresh-process comparisons for byte-identical statistics, coefficients, predictions, ranking, semantic digest, model-artifact digest, and outer record digest under the admitted Node `24.14.0` runtime.

Add negative cases for the unconditional official short-circuit before nested traps; unsealed/insufficient/opened-test data; scope, permission, rights, or currentness drift; Task 4 feature-runtime versus Task 5 numeric-runtime substitution; code/schema/manifest/lock substitution; browser/competitor feature or label input; blocking-only leakage; raw structural casts; direct-import bypass; invalid/nonconverged model use; and every exhaustive condition-to-code/precedence boundary.

Run:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-pairwise-code-manifest.mjs
    shasum -a 256 -c fixtures/learning-ranking/golden-model.sha256
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/learning/test/numeric.test.ts packages/learning/test/pairwise-logistic.test.ts packages/learning/test/rank.test.ts packages/learning/test/records.test.ts packages/schemas/test/schema-registry.test.ts

Expected: PASS with no network or mutable external dependency.

- [ ] **Step 9: Run complete verification and commit**

Run, in order:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/generate-unicode-17-artifacts.mjs --check
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-pairwise-code-manifest.mjs
    shasum -a 256 -c fixtures/learning-ranking/golden-model.sha256
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
    PATH="/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-foundation.mjs
    git diff --check

Require two clean golden subprocesses and stable hashes before claiming completion.

    git add packages/learning packages/schemas scripts/verify-pairwise-code-manifest.mjs fixtures/learning-ranking/pairwise-training-code-manifest.json fixtures/learning-ranking/golden-model.json fixtures/learning-ranking/golden-model.sha256 docs/superpowers/specs/2026-08-20-contentmd-pairwise-training-ranking-contracts-design.md docs/superpowers/plans/2026-08-20-contentmd-recursive-learning-ranking.md
    git commit -m "feat: train deterministic pairwise ranker"

---

## Task 6: Evaluate, bootstrap, shadow, promote, monitor, and roll back

**Files:**

- Create: `packages/learning/src/bootstrap.ts`
- Create: `packages/learning/src/evaluation.ts`
- Create: `packages/learning/src/shadow.ts`
- Create: `packages/learning/src/binding.ts`
- Create: `packages/learning/src/drift.ts`
- Create: `packages/learning/src/rollback.ts`
- Create: `packages/learning/test/bootstrap.test.ts`
- Create: `packages/learning/test/evaluation.test.ts`
- Create: `packages/learning/test/shadow.test.ts`
- Create: `packages/learning/test/binding.test.ts`
- Create: `packages/learning/test/drift.test.ts`
- Create: `packages/learning/test/rollback.test.ts`

**Step 1: Write failing sealed-evaluation tests**

Cover one-shot test opening, full decisive-pair coverage, accuracy/log-loss definitions, required slices, 10,000 group-bootstrap resamples, deterministic SHA-256 counter draws with rejection sampling, nearest-rank intervals, and promotion predicates.

Promotion requires positive lower bound for accuracy difference, negative upper bound for log-loss difference, each required slice at least 20 pairs/5 groups, slice bounds no worse than -0.05 accuracy and +0.05 log loss, current permissions/rights, zero hard-rule regression, completed shadow, and separate promotion decision.

**Step 2: Implement no-influence shadow**

Freeze minimum 50 decisive pairs, 20 leakage groups, 14 calendar days, slices, metrics, and gates. Compute active and shadow on the same inputs but return only active ordering. Store input/output digests proving no shadow influence.

**Step 3: Implement compare-and-swap binding and rollback**

Promotion and rollback compare against the current binding event digest and require independent readback. Revalidate rollback target. If no model is valid, bind the deterministic baseline.

**Step 4: Implement drift and revocation propagation**

Use non-overlapping 30-day windows, early close at 100 pairs, evaluable at 50 pairs/20 groups, two-window degradation/insufficiency suspension, 60-day continuous-insufficiency suspension, and immediate suspension for hard-rule, copying, rights, privacy, authority, permission, or lineage revocation.

**Step 5: Verify and commit**

    git add packages/learning
    git commit -m "feat: evaluate and govern learned rankers"

---

## Task 7: Integrate the learning workflow and CLI

**Files:**

- Create: `packages/agent/src/learning-workflow.ts`
- Create: `packages/agent/test/learning-workflow.test.ts`
- Modify: `packages/cli/src/commands/learn.ts`
- Create: `packages/cli/test/learn.test.ts`
- Modify: `packages/agent/src/local-runtime.ts`
- Modify: `packages/agent/src/index.ts`
- Modify: `packages/cli/src/main.ts`
- Modify: `packages/cli/src/commands/shared.ts`

**Step 1: Write failing end-to-end workflow tests**

Test qualification through diagnostics, dataset build, training, evaluation, shadow, promotion, status, drift, suspension, and rollback. Every effect requires its own current operation authority and durable audit. No command may infer approval from `--yes`.

**Step 2: Add exact commands**

    contentmd learn examples
    contentmd learn dataset
    contentmd learn train
    contentmd learn evaluate
    contentmd learn shadow
    contentmd learn promote
    contentmd learn status
    contentmd learn drift
    contentmd learn rollback

Commands output stable reason codes, digests, denominators, exclusions, and record refs. Training and evaluation are offline. Promotion requires a separate exact decision path.

**Step 3: Verify and commit**

    git add packages/agent packages/cli
    git commit -m "feat: add governed recursive learning workflow"

---

## Task 8: Implement and self-test the sealed `LIL-WRITE-001` benchmark engine

**Execution boundary:** The local schemas, selectors, analyzers, CLI states, negative fixtures, and independent verifier may be implemented under the approved plan. The official one-shot attempt may be sealed or populated only after a separate action-time record establishes the exact candidate model/provider permission, approved wholly synthetic task packet, reviewer qualification and independence, reviewer allocation, processing/retention controls, and authorized benchmark operator. Until then the official attempt state is `not_started`, review/result files remain absent rather than fabricated, and no benchmark-pass or writing-effectiveness claim exists. Test fixtures use explicitly synthetic invalid/pass-shaped examples and are never the official `LIL-WRITE-001` result.

**Files:**

- Create: `packages/learning/src/writing-benchmark.ts`
- Create: `packages/learning/test/writing-benchmark.test.ts`
- Create: `packages/learning/test/writing-benchmark-bootstrap.test.ts`
- Create: `packages/learning/test/writing-benchmark-attempt.test.ts`
- Create: `packages/cli/test/learn-benchmark.test.ts`
- Create: `fixtures/learning-ranking/lil-write-001-development/manifest.json`
- Create: `fixtures/learning-ranking/lil-write-001-development/tasks.jsonl`
- Create: `fixtures/learning-ranking/lil-write-001-development/candidate-sets.jsonl`
- Create: `fixtures/learning-ranking/lil-write-001-development/selections.jsonl`
- Create: `fixtures/learning-ranking/lil-write-001-development/rubric.json`
- Create: `fixtures/learning-ranking/lil-write-001-development/reviewer-allocations.json`
- Create: `fixtures/learning-ranking/lil-write-001-development/randomization.json`
- Create: `fixtures/learning-ranking/lil-write-001-development/attempt.json`
- Create: `fixtures/learning-ranking/lil-write-001-development/reviews.jsonl`
- Create: `fixtures/learning-ranking/lil-write-001-development/task-dispositions.jsonl`
- Create: `fixtures/learning-ranking/lil-write-001-development/result.json`
- Create: `scripts/verify-lil-write-001.mjs`
- Create: `docs/verification/lil-write-001-engine-0.1.md`
- Modify: `packages/learning/src/index.ts`
- Modify: `packages/cli/src/commands/learn.ts`
- Modify: `packages/cli/src/main.ts`

Every development fixture record is wholly project-authored and offline, uses the deterministic recorded-provider test profile, and is marked `fixture_status: synthetic_test_only`, `official_attempt_effect: none`, and `benchmark_claim_eligibility: false`. It requires no secret, credential, network access, or live provider. The verifier rejects a development fixture passed as the official result.

**Step 1: Write failing manifest, candidate-control, and held-out-family tests**

Freeze benchmark ID `LIL-WRITE-001` with exactly 60 tasks across these six wholly synthetic products: finance, health, public-service, commerce, education, and transport. Each product has exactly the same ten-slot preregistered grid:

| Slot | Task type | Channel | Locale | Held-out pattern family |
| --- | --- | --- | --- | --- |
| 1 | strategy | web | `en-US` | value proposition |
| 2 | strategy | web | `en-GB` | category positioning |
| 3 | contextual microcopy | web | `en-US` | first run |
| 4 | contextual microcopy | web | `en-GB` | validation error |
| 5 | contextual microcopy | web | `en-US` | destructive confirmation |
| 6 | contextual microcopy | web | `en-GB` | empty state |
| 7 | contextual microcopy | web | `en-US` | recovery |
| 8 | contextual microcopy | web | `en-GB` | permission request |
| 9 | contextual microcopy | push notification | `en-US` | status notification |
| 10 | contextual microcopy | push notification | `en-GB` | reminder notification |

The manifest therefore freezes exactly 10 tasks per product, 6 products, 6 domains, 48 web tasks, 12 push-notification tasks, 30 tasks per locale, 12 strategy tasks, 48 contextual-microcopy tasks, and 6 tasks in each held-out pattern family. It stores every product/domain/channel/locale/task-type/family intersection count. A disjointness check binds the training-dataset manifest and rejects the entire run if any benchmark pattern-family ID, semantic-message lineage, template family, or leakage group appears in candidate fitting, validation, or test data.

For every task, generate one four-expression candidate set exactly once under a frozen provider, returned model ID, model profile, prompt-template version, task/context-evidence digest, alternatives count of `4`, and output-token budget of `512`. Each `BenchmarkCandidateSetRecord` forms a digest-bound chain `task -> ProviderExecutionPlan -> unique nonce-claim receipt -> ProviderReceipt/provider-output digest -> candidate-set digest`. Exactly 60 unique task/plan/nonce/receipt/candidate chains must form a bijection with the manifest tasks and sealed operation-plan set. Baseline and learned paths receive the same ordered candidate IDs and lowercase SHA-256 expression digests; neither path may regenerate, filter, or add an expression. A missing, duplicate, mismatched, quarantined, incomplete, refused, transport-failed, unknown-outcome, or unverified chain, provider mismatch, returned-model mismatch, profile mismatch, template mismatch, context mismatch, alternatives mismatch, budget mismatch, missing candidate, or candidate-set mismatch makes the full run `invalid_run`.

Run the focused test with the bundled Node 24 runtime:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/learning/test/writing-benchmark.test.ts

Expected: FAIL because the benchmark validator and selector do not exist.

**Step 2: Implement deterministic paired selection and immutable traces**

Each path first rejects hard-ineligible candidates, then selects the highest score. An exact score tie resolves to the lexicographically smallest lowercase SHA-256 expression digest. Freeze the selected expression ID and digest, complete score vector, hard-eligibility result, exclusions, candidate ordering, and tie-break trace before blinding. Missing traces invalidate the full run. The implementation compares only ranker selection over the one frozen candidate set; it must not attribute prompt or retrieval effects to the ranker.

Add exact CLI transitions:

    contentmd learn benchmark seal
    contentmd learn benchmark ingest-review
    contentmd learn benchmark open-result
    contentmd learn benchmark verify

`seal` validates, stores, and independently reads back one `BenchmarkAttemptRecord` binding the candidate-model, benchmark-manifest, reviewer-allocation, rubric, randomization, analysis-code digests, and the ordered exact 60-entry provider-operation-plan set and set digest before any generation or outcome is observed. Tests reject a missing, extra, duplicate, reordered-without-rehash, task-mismatched, or digest-mismatched plan entry. A technical interruption may resume only that run ID, retaining all completed assignments and reviews. Inputs, plans, reviewers, allocations, outcomes, and dispositions cannot be reset. `invalid_run` consumes the attempt immediately; opening a valid quality-gate result also consumes it. The same candidate and manifest cannot be retried under another run ID. Every failed or invalid task disposition remains durable.

**Step 3: Write failing independent-review and edit-effort tests**

Present the baseline-selected and learned-selected expressions as a randomized blind pair. Require two independently allocated, qualified, blinded reviewers for every task under one frozen rubric and randomization schedule. Trigger a third independently blinded adjudication on any hard-result conflict or any advisory-score-dimension difference greater than one point. Store adjudication separately; it replaces neither original review. Blind preference is the majority of decisive reviews; an unresolved split is a tie. Ties and abstentions remain in all denominators but not the decisive-preference numerator.

For each path's selected expression, each original reviewer independently either accepts it as-is or supplies an accepted edit. Compute normalized edit distance as Levenshtein distance over Unicode 17.0 extended-grapheme-cluster sequences after NFC and LF normalization, divided by `max(1, selected_cluster_count, accepted_cluster_count)`. Preserve case, punctuation, and internal whitespace. Task edit effort for each path is the arithmetic mean of its two original-reviewer distances; adjudication never replaces it.

Run:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/learning/test/writing-benchmark.test.ts packages/learning/test/writing-benchmark-attempt.test.ts

Expected: FAIL on missing qualification, independence, adjudication, sealing, or edit-distance behavior before implementation, then PASS after the smallest conforming implementation.

**Step 4: Write failing hierarchical-bootstrap and exact-gate tests**

Accept analysis only when `valid_task_count = 60`, `invalidation_rate = 0`, every product has exactly 10 valid tasks, and every preregistered slice/intersection count exactly matches the manifest. One missing review, changed context, candidate or model mismatch, or other invalid task invalidates the full run; the analyzer cannot drop the task and continue.

For every reported interval, run exactly 10,000 deterministic hierarchical paired-bootstrap replicates by first sampling six products with replacement and then sampling ten paired tasks with replacement within each sampled product. Bind the manifest, attempt, candidate-model, baseline, selected-expression, review, metric-rule, and analysis-code digests into the seed; use SHA-256 counter draws with rejection sampling and nearest-rank 2.5th and 97.5th percentiles. Report factual accuracy, behavioral accuracy, task support, recovery support, comprehension, accessibility quality, blind preference with reasons, accepted-edit effort, voice/category fit, localization, similarity/copying, each hard-failure class, and review time.

The result passes only if all of these machine-evaluable predicates are true:

- learned has zero additional truthfulness, behavioral-accuracy, deception, consent, accessibility, autonomy, safety, or copying failures;
- the lower 95 percent bound for learned-minus-baseline recovery, comprehension, accessibility-quality, voice/category-fit, and localization scores on the frozen `0–4` scale is at least `-0.10` for every named metric;
- the upper 95 percent bound for learned-minus-baseline normalized accepted-edit distance is at most `0.02`;
- the upper 95 percent bound for the learned-to-baseline geometric-mean review-time ratio is at most `1.10`; and
- at least one preregistered positive utility gate passes: blind-choice-probability lower bound above `0.50`, accepted-edit-distance-difference upper bound below `0`, or task/recovery-score-difference lower bound above `0`.

Run:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/learning/test/writing-benchmark-bootstrap.test.ts

Expected: FAIL before the hierarchical sampler and exact predicates exist; then PASS for a qualifying golden result and for negative fixtures covering each independent gate.

**Step 5: Self-test the engine and prove the official state is absent**

`scripts/verify-lil-write-001.mjs --self-test fixtures/learning-ranking/lil-write-001-development` independently rehashes the explicitly synthetic test artifacts, proves the attempt's exact ordered 60-entry task/plan set and set digest, proves exact counts and intersections, proves held-out-family disjointness, proves same-candidate controls and deterministic selection, recomputes review/adjudication and edit-effort rules, regenerates all 10,000 hierarchical paired-bootstrap replicates, and exercises every hard, non-inferiority, and positive-utility predicate. Negative cases cover missing, extra, duplicate, task-mismatched, and digest-mismatched plan-set entries. Self-test is invariant to the later existence of official artifacts. A separate pre-run mode proves that the official benchmark state is currently `not_started`.

Run:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-lil-write-001.mjs --self-test fixtures/learning-ranking/lil-write-001-development
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-lil-write-001.mjs --assert-official-not-started fixtures/learning-ranking/lil-write-001

Expected: exit 0 only when the engine reproduces the pass-shaped and independent negative cases and no official attempt exists. This is mechanism verification, not benchmark passage.

**Step 6: Record the bounded implementation claim and commit**

`docs/verification/lil-write-001-engine-0.1.md` records the implementation and test-fixture digests, exact synthetic counts, negative cases, bootstrap reproducibility, and `official_attempt_status: not_started`. It explicitly records that no qualified review, one-shot result, benchmark pass, writing-effectiveness result, or longitudinal evidence exists.

    git add packages/learning packages/cli fixtures/learning-ranking/lil-write-001-development scripts/verify-lil-write-001.mjs docs/verification/lil-write-001-engine-0.1.md
    git commit -m "feat: implement sealed writing benchmark engine"

---

## Task 9: Materialize synthetic ranker fixtures and independent release verification

**Files:**

- Create: `fixtures/learning-ranking/preferences.jsonl`
- Create: `fixtures/learning-ranking/leakage-groups.jsonl`
- Create: `fixtures/learning-ranking/dataset-manifest.json`
- Create: `fixtures/learning-ranking/feature-profile.json`
- Create: `fixtures/learning-ranking/shadow-plan.json`
- Create: `scripts/verify-learning.mjs`
- Create: `docs/verification/recursive-learning-ranking-0.1.md`
- Modify: `package.json`
- Modify: `README.md`
- Modify: `scripts/verify-foundation.mjs`

**Step 1: Build wholly synthetic coverage**

Create at least 100 project-owned pairs and 30 transitive leakage groups with non-empty threshold-compliant train/validation/test splits. Include A/B reversals, ties/abstentions as non-pair records, changed-context exclusions, hard failures, near duplicates, locales/channels, missing features, and browser/competitor ineligibility fixtures.

**Step 2: Add independent checks**

The verifier recomputes group closure, splits, feature vectors, baseline probabilities, coefficient bits, predictions, model digest, bootstrap seed/intervals, shadow no-influence, promotion predicate, binding CAS, drift, revocation, and rollback.

**Step 3: Run the full supported-runtime suite**

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm install --frozen-lockfile
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --reporter=dot
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-foundation.mjs
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-learning.mjs
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-lil-write-001.mjs --self-test fixtures/learning-ranking/lil-write-001-development
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-lil-write-001.mjs --assert-official-not-started fixtures/learning-ranking/lil-write-001
    git diff --check

The direct TypeScript typecheck plus `check-package-boundaries.mjs` commands are the repository's complete lint contract, executed without falling back to the ambient Node runtime.

Expected: all commands exit 0; the verifier reports zero leakage, byte-identical golden model output, zero browser/competitor training examples, and no active learned binding without a qualifying reviewer set, shadow run, and promotion decision.

**Step 4: Record bounded status and commit**

The verification record distinguishes the deterministic mechanism fixture from the absent official `LIL-WRITE-001` attempt and records `official_attempt_status: not_started`. Tasks 1–9 establish an implementation candidate only. Qualified-rater benchmark passage and longitudinal adopter evidence remain separate gates.

    git add fixtures/learning-ranking scripts/verify-learning.mjs docs/verification/recursive-learning-ranking-0.1.md package.json README.md scripts/verify-foundation.mjs
    git commit -m "test: verify recursive expression ranking"

---

## Task 10: Run the separately authorized official `LIL-WRITE-001` attempt

**Prerequisite:** Tasks 1–9 and governed-live Tasks 1–8 are committed and green. Immediately before sealing, a typed action-time authorization must bind the exact candidate model, provider/model profile and returned-model rule, synthetic task-packet digest, rubric, analysis code, two qualified independent reviewers per task, adjudicator pool, reviewer allocations, operator, data-processing/retention controls, and one-shot attempt scope. Official generation additionally requires a current exact `SecretRef` identity, current provider connection record, current scoped capability grant, authenticated `ProviderExecutionPlan`, exact destination/model/tool/resource constraints, and current preflight/readback required by the live-intelligence contract. Benchmark approval never authorizes credential discovery, credential entry, secret-value persistence, or use of an ambient credential. Missing, expired, revoked, mismatched, or unverified inputs leave the attempt `not_started`.

**Conditional run artifacts — create only after the prerequisite passes:**

- `fixtures/learning-ranking/lil-write-001/manifest.json`
- `fixtures/learning-ranking/lil-write-001/tasks.jsonl`
- `fixtures/learning-ranking/lil-write-001/candidate-sets.jsonl`
- `fixtures/learning-ranking/lil-write-001/selections.jsonl`
- `fixtures/learning-ranking/lil-write-001/rubric.json`
- `fixtures/learning-ranking/lil-write-001/reviewer-allocations.json`
- `fixtures/learning-ranking/lil-write-001/randomization.json`
- `fixtures/learning-ranking/lil-write-001/attempt.json`
- `fixtures/learning-ranking/lil-write-001/reviews.jsonl`
- `fixtures/learning-ranking/lil-write-001/task-dispositions.jsonl`
- `fixtures/learning-ranking/lil-write-001/result.json`
- `docs/verification/lil-write-001.md`

**Step 1: Seal before outcomes**

Freeze the exact 60-task manifest and every required intersection, candidate model, reviewer allocation, randomization, rubric, analysis code, and the complete ordered set of 60 single-use provider-operation plan IDs and digests without generating a candidate. Atomically append one `BenchmarkAttemptRecord` that binds all of those inputs, then independently read back its digest and current one-shot state. Only after that readback passes may the executor claim each bound provider operation once and generate its four-expression candidate set. Freeze each candidate set and both deterministic selections beneath the already-sealed attempt, recording one unique digest-bound `task -> plan -> nonce-claim receipt -> provider receipt/output -> candidate set` chain. Any missing, duplicate, mismatched, quarantined, incomplete, refused, transport-failed, unknown-outcome, unverified, generation, returned-model, candidate, selection, persistence, or readback condition durably consumes that same attempt as `invalid_run`; do not discard, regenerate, replace, or reseal it.

Immediately before the first seal write, prove no prior official attempt exists:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-lil-write-001.mjs --assert-official-not-started fixtures/learning-ranking/lil-write-001

**Step 2: Collect the fixed qualified reviews**

Ingest exactly two independent qualified blinded reviews for every task and every triggered third adjudication. Preserve original reviews, ties, abstentions, edits, timing, conflicts, and dispositions. Do not fill, replace, or synthesize a missing human review.

**Step 3: Open once and verify independently**

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-lil-write-001.mjs --self-test fixtures/learning-ranking/lil-write-001-development
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-lil-write-001.mjs --official fixtures/learning-ranking/lil-write-001

The verifier exits 0 only for one valid, consumed, exact 60-task attempt that proves a bijection across exactly 60 unique task, sealed plan digest, nonce-claim receipt, provider receipt/output digest, and candidate-set digest chains; reproduces all candidate controls, review/adjudication rules, edit-distance values, 10,000 hierarchical bootstrap replicates, zero-additional-hard-failure gates, every non-inferiority gate, and at least one positive utility gate. Missing, duplicate, mismatched, quarantined, or unknown-outcome links invalidate the attempt. A failed or invalid result remains durable and blocks bounded release.

**Step 4: Record only the bounded result**

`docs/verification/lil-write-001.md` records exact digests, counts, qualifications and independence without personal data, invalidation state, intervals, hard-failure deltas, positive gate, consumed-attempt state, and verifier output. A pass supports bounded synthetic writing-effectiveness readiness only.

    git add fixtures/learning-ranking/lil-write-001 docs/verification/lil-write-001.md
    git commit -m "test: record official sealed writing benchmark"

## Execution order

Follow the shared-file serialization in the [program execution-order DAG](2026-08-20-contentmd-program-execution-order.md): prerequisite public-corpus Task 1, then offline `Tasks 1–6`; governed-live Tasks 1–8; then `Task 7 -> Task 8 -> Task 9`. Public-corpus Task 6 may start after this plan's Task 1 schema commit is integrated. Task 10 runs only when its separate action-time prerequisite passes and is not required to continue bounded implementation work.

Governed live intelligence is not required for offline Tasks 1–6, but it precedes CLI integration and the official provider-bound benchmark. Portable runtime work may begin after Task 9 because the learning and governance record identities used by runtime bindings are then stable; overall release acceptance still waits for Task 10.

## Completion meaning

Implementation through Task 9 means the deterministic synthetic ranker lifecycle and benchmark engine are reproducible, leakage-safe, shadowable, promotable only through explicit governance, monitorable, reversible, and independently verified as mechanisms. Full plan completion additionally requires one valid Task 10 sealed `LIL-WRITE-001` attempt and establishes only bounded synthetic non-inferiority plus at least one preregistered utility gain. It does not mean the ranker writes text, improves real product outcomes, is calibrated for an organization, supports a longitudinal “better over time” claim, or may learn from browser observations.
