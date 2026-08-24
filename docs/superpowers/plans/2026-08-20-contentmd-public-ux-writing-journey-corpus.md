# content.md Public UX-Writing Journey Corpus and Voice/Tone Graph Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task by task. Use `superpowers:test-driven-development` for production changes, `research-ops` for every evidence artifact, `agentic-eval` for evaluation design, `computer-use:computer-use` for public UI observation, and `superpowers:verification-before-completion` before claiming the slice complete.

**Goal:** Build a rights-bounded, evidence-traceable corpus of end-to-end public UX-writing journeys and compile those observations into proposed voice/tone map and graph snapshots that content.md can use for deterministic analysis and reviewed pattern retrieval without copying competitor wording or treating public behavior as approved guidance.

**Architecture:** Computer Use collects bounded public observations under a frozen acquisition manifest. Typed source, observation, expression-evidence, claim, and disposition records preserve evidence and rights boundaries. A deterministic projection compiles only reviewed abstractions into candidate voice/tone maps and graphs. Browser wording remains evidence-only and is barred from prompts, learning labels, and ranker features. Project-owned synthetic examples are the only initial comparison material.

**Tech stack:** Node.js 24.14.0, pnpm 11.9.0, TypeScript 7.0.2, Vitest 4.1.11, AJV 8.20.0, Computer Use through `@oai/sky`, canonical JSON, SHA-256, Markdown research records, and the retained content.md workspace packages.

**Specs:** [Universal agent architecture](../specs/2026-08-20-contentmd-universal-agent-design.md) and [Live Intelligence and Learning 0.1](../specs/2026-08-20-contentmd-live-intelligence-learning-design.md).

## Global constraints

1. “Best UX writing” is a research question, not a source attribute. The corpus records publicly inspectable candidate systems; qualified comparative evaluation must establish performance.
2. No login, account creation, purchase, personal data, credential use, subscription, submission, support contact, or third-party mutation is authorized by this plan.
3. Computer Use operates only through a dedicated signed-out ephemeral research profile whose isolation, exact route/origin allowlist, capture/redaction/cleanup plan, and current `verify.runtime` SEC-P0-G plus `research.external` SEC-P0-B results and exact grants are recorded before navigation. A fresh tab inside a personal profile is never conforming corpus evidence. The operator does not inspect unrelated tabs, history, bookmarks, cookies, profiles, downloads, extensions, or local storage.
4. A public page does not establish reuse rights. Default third-party expression disposition is `evidence_only`, `prompt_eligibility: never`, `training_eligibility: never`, `authority_effect: none`, and `benchmark_eligibility: false`.
5. Retain only the smallest wording span needed to substantiate a claim. Prefer locators, digests, structured features, and project-authored abstractions over copied passages.
6. Implemented wording is evidence of behavior, not proof of quality, approval, ownership, governing applicability, accessibility, localization quality, or outcome.
7. Voice, situational tone, mechanics, terminology, accessibility, localization, safety, product truth, and governance remain separate record families and measurement planes.
8. Industry is a context prior, never a voice owner. No graph edge may derive approval or voice authority from an industry label.
9. Browser observations never become preference examples. Only qualified, project-owned candidate pairs can enter recursive learning.
10. The graph is a reproducible projection over canonical records, not the source of truth.
11. Browser unavailability, inaccessible states, redirects, and rights uncertainty are recorded as `not_observed` or blocking evidence; they are never filled by inference.
12. Every production change starts with a failing test and ends with the narrow test, full Node 24 test suite, typecheck, lint, and retained foundation verification.

## Frozen sampling frame

### Pilot VTM-01

The first bounded pilot contains four high-contrast strata, two official systems per stratum, three source classes per system, and six journey-state slots. It permits at most 24 public pages and 48 state observations.

| Stratum | System A | System B |
| --- | --- | --- |
| Public service | GOV.UK | Home Office |
| Health and crisis | NHS England | CDC or Canada.ca |
| Finance and payments | Visa Product Design System | Monzo |
| Enterprise and developer tools | Atlassian Design System | GitHub Docs |

The three source classes are:

1. official voice, content, or style guidance;
2. actual public product UI or canonical design-system examples;
3. official accessibility, localization, terminology, or governance guidance.

The six state slots are:

1. entry or onboarding;
2. core task or commitment;
3. pending or progress;
4. success;
5. error or recovery;
6. destructive, permission, or support moment.

The first Computer Use observation is GOV.UK passport application entry, eligibility question, date-of-birth input, and empty-submit validation on 20 August 2026. It is public, unauthenticated, synthetic, directly exercised, profile-isolation-unestablished, and nonconforming for the controlled corpus. It is retained only to design the record contract.

### Expansion VTM-02

Expansion starts only after the record validator, rights disposition, similarity guard, and graph projection pass VTM-01. It adds the remaining systems already identified by the public systems corpus:

- Shopify and Mailchimp for commerce and customer communications;
- GitLab for handbook-led DevSecOps;
- Johns Hopkins and The Conversation for education, research, and media;
- Alaska Auro plus a second primary travel system for travel;
- Adobe and Intuit for creative, multi-product, and AI-assisted software;
- CRIF NEXT for white-label financial software;
- Google and Microsoft as multilingual infrastructure controls.

The expansion target is 18 systems across 10 materially different strata, no more than three public pages per system, and the same six state slots. Missing states remain `not_observed`. This target does not claim exhaustive industry coverage.

---

## Task 1: Reconcile the canonical pattern wire contract

**Files:**

- Create: `packages/research/src/pattern-packet-v01.ts`
- Create: `packages/research/src/pattern-converter.ts`
- Create: `packages/research/test/pattern-converter.test.ts`
- Modify: `packages/research/src/pattern-record.ts`
- Modify: `packages/research/src/ingest.ts`
- Modify: `packages/research/src/retrieve.ts`
- Modify: `packages/research/src/index.ts`
- Modify: `packages/research/test/ingest.test.ts`
- Modify: `packages/research/test/retrieve.test.ts`
- Modify: `packages/schemas/src/content-records.schema.json`
- Create: `packages/schemas/test/content-records.test.ts`

**Step 1: Write the failing parity tests**

Assert that the retained frozen packet DTO and TypeScript record currently disagree, then freeze `PatternPacketRecordV01` as the legacy input and `ContentPatternRecord = DurableRecord<ContentPatternPayload>` as the canonical internal record. The canonical payload is exact:

    interface ContentPatternPayload {
      evidence_strength: string;
      problem: string;
      contexts: PatternContext[];
      mechanism: string;
      source_refs: string[];
      counterexamples: string[];
      failure_modes: string[];
      transfer_conditions: PatternTransferCondition[];
      non_transferable_details: string[];
      rights_boundary: string;
    }

The JSON Schema must use the same structured `PatternContext` and `PatternTransferCondition` shapes, not string encodings of either structure. Unknown keys and empty required arrays fail.

Run:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/research/test/pattern-converter.test.ts

Expected: FAIL because the explicit converter and parity contract do not exist.

**Step 2: Implement an explicit converter**

The converter must map packet contexts, counterexamples, failure modes, transfer conditions, and rights boundaries without dropping or inventing fields. It wraps the packet's singular `context`, `counterexample`, `failure_mode`, and `non_transferable_detail` values into one-element canonical arrays; copies structured transfer conditions; maps `prohibited_imitation_boundary` to `rights_boundary`; and maps `pattern_id` to `record_id`. It requires an explicit conversion envelope for `scope`, `provenance`, and `lifecycle_state`; there are no defaults for those authority-bearing fields.

    export function convertPatternPacketV01(
      packet: PatternPacketRecordV01,
      envelope: Pick<
        DurableRecordInput<ContentPatternPayload>,
        "scope" | "provenance" | "lifecycle_state"
      >,
    ): ContentPatternRecord;

The converter fixes `schema_id: "contentmd.content-pattern-record"`, `schema_version: "0.1.0"`, and `record_version: 1`, then uses `finalizeRecord`. Unknown fields fail. Canonical conversion is recursively key-sorted and digest-stable. The frozen packet bytes remain unchanged. Retrieval reads only `record.payload`; no consumer may silently continue treating the legacy DTO as canonical.

**Step 3: Verify backward compatibility**

Run the focused test, retained research tests, schema tests, and `verify:foundation`.

Expected: the frozen packet ingests to the same four pattern identities while canonical records validate independently.

**Step 4: Commit**

    git add packages/research packages/schemas
    git commit -m "fix: reconcile canonical pattern records"

---

## Task 2: Add typed research, observation, voice/tone, and disposition schemas

**Files:**

- Create: `packages/schemas/src/research-records.schema.json`
- Create: `packages/schemas/src/voice-tone-records.schema.json`
- Create: `packages/research/src/source-record.ts`
- Create: `packages/research/src/browser-observation.ts`
- Create: `packages/research/src/claim-record.ts`
- Create: `packages/research/src/observed-expression.ts`
- Create: `packages/research/src/research-batch.ts`
- Create: `packages/research/src/pattern-disposition.ts`
- Create: `packages/research/test/research-records.test.ts`
- Create: `packages/research/test/voice-tone-records.test.ts`
- Modify: `packages/schemas/src/schema-registry.ts`
- Modify: `packages/schemas/src/index.ts`
- Modify: `packages/research/src/index.ts`

**Step 1: Freeze the record vocabulary in failing tests**

Add closed schemas for:

- `ResearchAcquisitionManifest`
- `ResearchSourceRecord`
- `BrowserObservationRecord`
- `ResearchClaimRecord`
- `ObservedExpressionEvidenceRecord`
- `PatternDispositionRecord`
- `ResearchBatchManifest`
- `OrganizationVoiceProfileCandidate`
- `VoicePrincipleRecord`
- `TonePolicyRecord`
- `DomainOverlayRecord`
- `VoiceToneFeatureDefinition`
- `VoiceToneMapSnapshot`
- `VoiceToneGraphSnapshot`

Required source fields include requested, canonical, and effective URL; publisher; title; access timestamp; access method; body-retention state; retained-content digest or `body_not_retained`; access and rights disposition; profile-isolation state; privacy class; redirects; and limitations.

Required observation fields include surface, journey, state, channel, locale, locator or capture reference, bounded span or digest, direct-exercise state, observation strength, five orthogonal evidence dimensions, taint flags, and limitations.

**Step 2: Enforce immutable third-party defaults**

Every other-product `ObservedExpressionEvidenceRecord` must validate only when:

    reuse_disposition: evidence_only
    prompt_eligibility: never
    training_eligibility: never
    authority_effect: none
    benchmark_eligibility: false

Reject any record that treats public availability as a license, omits rights state, or combines source, observation, claim, decision, approval, delivery, or evaluation.

**Step 3: Register and verify schemas**

Run:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/research/test/research-records.test.ts packages/research/test/voice-tone-records.test.ts

Expected: PASS with unknown-field, invalid-enum, missing-rights, authority-collapse, and browser-to-training negative cases.

**Step 4: Commit**

    git add packages/schemas packages/research
    git commit -m "feat: add public research and voice graph records"

---

## Task 3: Implement the browser-evidence normalization adapter

**Files:**

- Create: `packages/adapter-web/package.json`
- Create: `packages/adapter-web/tsconfig.json`
- Create: `packages/adapter-web/src/acquisition-manifest.ts`
- Create: `packages/adapter-web/src/computer-use-capture.ts`
- Create: `packages/adapter-web/src/adapter.ts`
- Create: `packages/adapter-web/src/index.ts`
- Create: `packages/adapter-web/test/acquisition-manifest.test.ts`
- Create: `packages/adapter-web/test/computer-use-capture.test.ts`
- Create: `packages/adapter-web/test/adapter.test.ts`
- Create: `fixtures/voice-tone-research/govuk-passport-recorded-capture.json`
- Modify: `pnpm-workspace.yaml`
- Modify: `tsconfig.json`
- Modify: `scripts/check-package-boundaries.mjs`

**Step 1: Write failing pure-normalization tests**

The package accepts recorded capture data only. It must not depend on `@oai/sky`, Playwright, Chrome, networking, or a model provider.

    export interface BrowserEvidenceAdapter {
      normalize(
        manifest: ResearchAcquisitionManifest,
        capture: RecordedComputerUseCapture,
      ): NormalizedResearchBatch;
    }

Tests must prove URL and redirect preservation, timestamp validation, source/observation separation, `body_not_retained`, exact locator retention, bounded-span limits, personal-profile isolation downgrade, and stable canonical digests.

**Step 2: Normalize the GOV.UK recorded fixture**

The fixture is a project-owned synthetic normalization fixture modeled on the bounded fields in the nonconforming pilot. It is labeled `controlled_corpus_eligibility: false`, `benchmark_eligibility: false`, and `source_evidence_effect: none`; passing its tests cannot convert the pilot into conforming evidence. The fixture represents:

- the public GOV.UK passport start page;
- the UK-residence question;
- the date-of-birth input;
- the empty-submit validation summary and inline error.

It contains no personal data, cookie values, unrelated tab data, screenshot, credential, or retained page body.

**Step 3: Add package-boundary enforcement**

Only the CLI or a future explicitly authorized orchestration package may translate live Computer Use output into the recorded capture DTO. Tests and core packages remain UI- and network-free.

**Step 4: Verify and commit**

Run focused tests, typecheck, lint, all tests, and retained verification.

    git add packages/adapter-web fixtures/voice-tone-research pnpm-workspace.yaml tsconfig.json scripts/check-package-boundaries.mjs
    git commit -m "feat: normalize bounded browser evidence"

---

## Task 4: Compile deterministic voice/tone maps and graphs

**Files:**

- Create: `packages/research/src/voice-tone-map.ts`
- Create: `packages/research/src/voice-tone-graph.ts`
- Create: `packages/research/src/pattern-synthesis.ts`
- Create: `packages/research/src/similarity.ts`
- Create: `packages/research/test/voice-tone-map.test.ts`
- Create: `packages/research/test/voice-tone-graph.test.ts`
- Create: `packages/research/test/pattern-synthesis.test.ts`
- Create: `packages/core/src/record-graph.ts`
- Modify: `packages/core/src/content-graph.ts`
- Modify: `packages/core/src/index.ts`
- Modify: `packages/research/src/index.ts`

**Step 1: Write failing graph-invariant tests**

The deterministic projection supports:

    ResearchSourceRecord -> SUPPORTS | CHALLENGES -> ResearchClaimRecord
    BrowserObservationRecord -> OBSERVES -> ObservedExpressionEvidenceRecord
    ContentPatternRecord -> DERIVED_FROM -> evidence record
    VoiceProfileCandidate | TonePolicyRecord -> SUPPORTED_BY -> evidence record
    ApprovalDecisionRecord -> APPROVES | RETURNS | REJECTS -> candidate record

Tests reject dangling edges, duplicate edges, cycles where prohibited, superseded active sources, invalid precedence, missing evidence, and any edge that makes industry, public visibility, source type, or observation imply approval. They also walk complete provenance transitively and reject every map, graph, pattern, or snapshot that descends from `protocol_conformance: nonconforming-*`, `controlled_corpus_eligibility: false`, `source_evidence_effect: none`, or a browser profile whose isolation is not established and current. Review cannot erase or override this lineage quarantine.

**Step 2: Implement the map snapshot**

The map keeps a vector rather than one universal scalar:

- directness;
- formality;
- warmth;
- reassurance;
- expressiveness;
- humor;
- urgency;
- information density;
- authority stance.

Each feature carries definition version, scope, evidence refs, allowed interval or categorical policy, uncertainty state, and applicability. Product truth, terminology, accessibility, localization, and safety remain separate hard planes.

**Step 3: Add distinctive-wording and transfer guards**

Compute normalized exact and fuzzy fingerprints for observed third-party wording. A pattern candidate may retain only a transferable mechanism plus prohibited-imitation boundary from conforming eligible evidence. It fails when it contains distinctive third-party wording, exceeds the bounded similarity threshold, lacks a rights review, hides an unresolved counterexample, or has any quarantined/nonconforming ancestor. The GOV.UK pilot and every descendant remain permanently ineligible for compilation regardless of later editorial or content review.

**Step 4: Verify and commit**

    git add packages/core packages/research
    git commit -m "feat: compile evidence-bound voice and tone graphs"

---

## Task 5: Adopt, gate, and review the VTM-01 public journey pilot

**Files:**

- Read-only input: `research/09-experimental/public-ux-writing-journey-observations-2026-08-20.md` (pre-existing nonconforming pilot; never staged by this task)
- Create: `research/09-experimental/public-ux-writing-journey-pilot-adoption-VTM-01.md`
- Create: `research/09-experimental/public-ux-writing-acquisition-manifest-VTM-01.md`
- Create: `research/09-experimental/public-ux-writing-source-register-VTM-01.jsonl`
- Create: `research/09-experimental/public-ux-writing-observation-register-VTM-01.jsonl`
- Create: `research/09-experimental/public-ux-writing-claim-register-VTM-01.jsonl`
- Create: `research/09-experimental/public-ux-writing-pattern-dispositions-VTM-01.jsonl`

**Step 1: Freeze the acquisition and authorization manifest before the next navigation**

The manifest binds VTM-01 systems, source classes, state slots, page and observation ceilings, direct public URLs, no-login/no-personal-data boundaries, capture minimization, redaction, teardown, stop conditions, and `not_observed` behavior. A conforming batch additionally requires a dedicated signed-out ephemeral profile, exact route/origin allowlist, current `verify.runtime` SEC-P0-G result and exact grant, current `research.external` SEC-P0-B result and exact grant, and recorded connection, data-processing, persistence, retention, telemetry, and cleanup dispositions. Missing, expired, revoked, mismatched, or unknown currentness blocks navigation.

**Step 2: Adopt the existing GOV.UK observation by exact digest**

Verify the pre-existing pilot is exactly 12,926 bytes with SHA-256 `5dd1a9fa24ab90f7e5b98b78db0c3ca6f9f1eede556885b7932b5f0f7654c980`. A mismatch stops adoption for review; do not overwrite, edit, stage, or silently normalize the file. Record the adoption in `public-ux-writing-journey-pilot-adoption-VTM-01.md`, binding that exact path, digest, byte length, nonconforming status, and evidence-only exclusions. Any later editorial change is a separate reviewed source version with its own digest and explicit relationship to this input.

Record the 20 August 2026 direct UI observation with:

- canonical access mode `direct full text` and separate observation method `operator-directed-computer-use-public-web`;
- profile isolation `not_established`;
- no screenshot or page-body retention;
- exact URLs and visible locators;
- bounded strings necessary to support the validation-pattern claim;
- direct exercise state for the empty submit;
- five evidence dimensions;
- Open Government Licence link as a source, not a blanket decision;
- no approval, owner, delivery, evaluation, prompt, training, or benchmark effect.

**Step 3: Continue only after the isolation and authorization gate passes**

The existing personal-profile pilot cannot satisfy this step. After the dedicated-profile and exact-control records pass, open only allowlisted direct official public URLs, capture no more than three pages per system, stop before account or personal-data entry, perform the declared teardown, and record unavailable states as `not_observed`. No fallback to a personal profile is permitted.

If this gate is not current and passing, Task 5 may still land the schemas, manifest template, exact denial state, and digest-bound pilot adoption. The conforming acquisition remains `not_started`, no controlled source/observation/pattern records are minted from the pilot, and the implementation sequence may proceed to project-owned synthetic Tasks 6–8. The public-corpus completion claim remains blocked until a separately authorized conforming acquisition and review finish.

**Step 4: Independent review**

One reviewer checks source/claim accuracy, rights, privacy, abstraction, and graph non-collapse. A second qualified content reviewer is required before any pattern candidate can be called reviewed. Neither review makes an organization voice profile approved for a project.

**Step 5: Commit the evidence batch**

    git add research/09-experimental/public-ux-writing-journey-pilot-adoption-VTM-01.md research/09-experimental/public-ux-writing-acquisition-manifest-VTM-01.md research/09-experimental/public-ux-writing-source-register-VTM-01.jsonl research/09-experimental/public-ux-writing-observation-register-VTM-01.jsonl research/09-experimental/public-ux-writing-claim-register-VTM-01.jsonl research/09-experimental/public-ux-writing-pattern-dispositions-VTM-01.jsonl
    git commit -m "research: add bounded UX journey gate records"

---

## Task 6: Build the project-owned ranking comparison packet

**Files:**

- Create: `fixtures/voice-tone-research/project-owned-comparisons.jsonl`
- Create: `fixtures/voice-tone-research/comparison-manifest.json`
- Create: `fixtures/voice-tone-research/leakage-groups.jsonl`
- Create: `fixtures/voice-tone-research/rights-register.jsonl`
- Create: `scripts/verify-voice-tone-research.mjs`
- Create: `packages/research/test/ranking-boundary.test.ts`

**Step 1: Generate project-owned pairs**

Create synthetic or project-owned candidates only. The packet contains at least 100 comparison pairs and 30 transitive leakage groups. Each pair binds one semantic message, context, objective, candidate kind, hard-rule results, voice/tone feature snapshot, and blind side/order assignment.

**Step 2: Prove corpus separation**

Tests scan prompts, candidates, features, and comparison payloads for exact or fuzzy overlap with third-party evidence fingerprints. Any overlap over the frozen threshold fails with `third_party_expression_similarity_blocked`. A transitive lineage scan separately fails with `nonconforming_evidence_lineage_blocked` for the pilot or any other record descended from nonconforming observation, `controlled_corpus_eligibility: false`, `source_evidence_effect: none`, or unestablished profile isolation.

**Step 3: Prove learning isolation**

No browser source, observation, expression, claim, or proposed pattern record may satisfy the preference-example schema. The only bridge is a separately reviewed abstract pattern derived exclusively from conforming, controlled-corpus-eligible evidence whose project-authored application produces new project-owned candidate text. Review never launders a quarantined ancestor; the nonconforming GOV.UK pilot and all descendants are barred from comparisons, calibration, learning, and benchmarks forever.

**Step 4: Verify and commit**

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-voice-tone-research.mjs
    git add fixtures/voice-tone-research packages/research scripts/verify-voice-tone-research.mjs
    git commit -m "test: add rights-safe voice ranking comparisons"

---

## Task 7: Integrate reviewed graph snapshots with writing and evaluation

**Prerequisite:** Task 3 of the governed live-intelligence plan must have created and verified `packages/writer/src/prompt-compiler.ts`. This task modifies that exact implementation and may not be dispatched concurrently with it.

**Files:**

- Create: `packages/evaluation/src/voice-tone-profile.ts`
- Create: `packages/evaluation/src/voice-tone-evaluator.ts`
- Create: `packages/evaluation/test/voice-tone-evaluator.test.ts`
- Create: `packages/writer/src/voice-context.ts`
- Create: `packages/writer/test/voice-context.test.ts`
- Modify: `packages/writer/src/prompt-compiler.ts`
- Modify: `packages/evaluation/src/index.ts`
- Modify: `packages/writer/src/index.ts`

**Step 1: Write failing eligibility tests**

Writer/evaluator input accepts only a digest-bound snapshot whose project scope, decision state, owner, approval, effective period, locale, channel, and context match the task. A candidate public profile, observation, industry overlay, or snapshot with any quarantined/nonconforming ancestor is rejected.

**Step 2: Add hard-before-soft evaluation**

Product truth, meaning preservation, actionable recovery, safety, controlled terminology, accessibility, and locale applicability must pass before voice/tone ranking. Soft results remain a vector and never rescue a hard failure.

**Step 3: Keep model input bounded**

The prompt compiler receives project-approved principles, tone rules, feature definitions, and selected abstract patterns. It never receives raw competitor expressions, hidden browser captures, or any record with quarantined/nonconforming provenance.

**Step 4: Verify and commit**

    git add packages/evaluation packages/writer
    git commit -m "feat: bind approved voice graphs to writing evaluation"

---

## Task 8: Run independent corpus and graph verification

**Files:**

- Create: `docs/verification/public-ux-writing-corpus-0.1.md`
- Modify: `package.json`
- Modify: `README.md`
- Modify: `scripts/verify-foundation.mjs`

**Step 1: Add the verification entry point**

Add `verify:voice-research` invoking `scripts/verify-voice-tone-research.mjs`. Change the retained foundation package-count assertion to require the original package set as a subset while validating every added package.

**Step 2: Run the complete suite with the supported runtime**

Use the bundled Node executable directly so Vitest workers inherit Node 24.14.0:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm install --frozen-lockfile
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --reporter=dot
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-foundation.mjs
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-voice-tone-research.mjs
    git diff --check

Expected:

- all retained tests pass;
- all new research/graph tests pass;
- every source and observation resolves;
- every third-party expression stays evidence-only;
- zero browser records are prompt- or training-eligible;
- zero industry nodes confer authority;
- every graph snapshot is deterministic;
- every ranking comparison is project-owned and leakage-grouped;
- no map, graph, pattern, prompt, comparison, calibration, learning, or benchmark record has a transitive quarantined/nonconforming ancestor;
- incomplete state coverage is explicit;
- no claim says the sampled systems are objectively best.

**Step 3: Record limitations**

The verification record must distinguish static contract passage from human review, cognitive validation, calibrated measurement, product outcome, and production effectiveness. Those remain separate future evidence.

**Step 4: Commit**

    git add package.json README.md scripts/verify-foundation.mjs docs/verification/public-ux-writing-corpus-0.1.md
    git commit -m "docs: verify public UX writing research boundary"

## Execution order

Within this plan: `Task 1 -> Task 2 -> Task 3 and Task 4 in parallel -> Task 5 -> Task 6 -> Task 7 -> Task 8`. Cross-plan dispatch must additionally satisfy the shared [program execution order](2026-08-20-contentmd-program-execution-order.md); in particular, Task 6 waits for recursive-learning Task 1, and Task 7 waits for governed-live Task 3.

Computer Use may continue VTM-01 only after Task 2 record validation and the full Task 5 isolation/authorization gate pass. The single GOV.UK observation already taken is retained as a bounded pre-manifest, personal-profile, nonconforming pilot and explicitly marked non-benchmark; it does not authorize further navigation or controlled-corpus use.

## Completion meaning

This plan is complete when the public evidence corpus, candidate graph projection, rights/similarity controls, project-owned comparison packet, and independent verifier pass. Completion means content.md has a defensible candidate map to analyze against. It does not mean the map is an approved project voice, the sampled systems are “best,” the ranker is effective, human calibration has passed, or automated publication is authorized.
