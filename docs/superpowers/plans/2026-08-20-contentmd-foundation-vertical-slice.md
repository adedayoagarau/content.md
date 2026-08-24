# content.md Foundation Vertical Slice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task by task. Also use `superpowers:test-driven-development` for every production change and `superpowers:verification-before-completion` before claiming the slice complete.

**Goal:** Build the first retained, local-first `content.md` implementation that adopts an ordinary web repository, discovers and models user-facing content, ingests frozen research patterns, reviews and rewrites content, records human decisions, creates a non-promoted learning candidate, and applies only an approved synthetic change with independent readback.

**Architecture:** A TypeScript monorepo exposes one `contentmd` CLI over canonical JSON Schema 2020-12 records. Durable truth is an append-only SQLite event log plus reproducible projections under `.contentmd/`. Model output is provider-neutral and cannot grant authority. The first slice uses a deterministic recorded provider so every non-model plane is reproducible; live model providers, browser research, Computer Use, Cloudflare Agents SDK, and the workbench are later plans.

**Tech stack:** Node.js 24.14.0, pnpm 11.9.0, TypeScript 7.0.2, Vitest 4.1.11, AJV 8.20.0, Commander 15.0.0, YAML 2.9.0, fast-glob 3.3.3, Node `crypto`, Node `fs`, and Node `sqlite`. ESM only. Apache-2.0 target.

**Approved design:** [`2026-08-20-contentmd-universal-agent-design.md`](../specs/2026-08-20-contentmd-universal-agent-design.md). The approval authorizes implementation planning; execution begins only after the user selects the execution mode below.

## Delivery boundary

This plan implements only the first retained local vertical slice. It must not add network access, browser control, desktop Computer Use, Figma/CMS publication, cloud deployment, autonomous policy mutation, model training, or automatic learning promotion.

The retained acceptance path is:

```text
init
  -> doctor
  -> discover
  -> model
  -> research ingest
  -> deterministic review
  -> recorded-provider strategy/draft/rewrite
  -> human decision capture
  -> scoped learning candidate
  -> preview
  -> explicit fixture approval
  -> apply
  -> independent readback
  -> deterministic clean rerun
```

Every task below ends in a focused commit. If this directory is not yet a Git repository, Task 1 initializes one before any production file is added. Existing `research/` and `docs/` files are preserved.

## Repository structure created by this plan

```text
LICENSE
README.md
package.json
pnpm-lock.yaml
pnpm-workspace.yaml
tsconfig.base.json
tsconfig.json
packages/
  schemas/
  core/
  memory/
  governance/
  adapter-sdk/
  adapter-filesystem/
  research/
  evaluation/
  model-provider-sdk/
  writer/
  learning/
  agent/
  cli/
fixtures/
  synthetic-web-app/
  frozen-pattern-packet/
scripts/
  verify-foundation.mjs
```

Each package contains `package.json`, `tsconfig.json`, `src/`, and `test/`. Packages use workspace dependencies and export only their public `src/index.ts` surface.

The package dependency graph is fixed for this slice:

| Package | Runtime dependencies |
| --- | --- |
| `@contentmd/schemas` | `ajv@8.20.0` |
| `@contentmd/core` | `@contentmd/schemas@workspace:*` |
| `@contentmd/memory` | `@contentmd/core@workspace:*` |
| `@contentmd/governance` | `@contentmd/core@workspace:*`, `@contentmd/memory@workspace:*` |
| `@contentmd/adapter-sdk` | `@contentmd/core@workspace:*`, `@contentmd/governance@workspace:*` |
| `@contentmd/adapter-filesystem` | `@contentmd/adapter-sdk@workspace:*`, `@contentmd/core@workspace:*`, `@contentmd/governance@workspace:*`, `fast-glob@3.3.3` |
| `@contentmd/research` | `@contentmd/core@workspace:*`, `@contentmd/schemas@workspace:*` |
| `@contentmd/evaluation` | `@contentmd/core@workspace:*`, `@contentmd/research@workspace:*` |
| `@contentmd/model-provider-sdk` | `@contentmd/core@workspace:*` |
| `@contentmd/writer` | `@contentmd/core@workspace:*`, `@contentmd/evaluation@workspace:*`, `@contentmd/model-provider-sdk@workspace:*`, `@contentmd/research@workspace:*` |
| `@contentmd/learning` | `@contentmd/core@workspace:*`, `@contentmd/governance@workspace:*`, `@contentmd/memory@workspace:*` |
| `@contentmd/agent` | every local package except `@contentmd/cli`, plus `yaml@2.9.0` |
| `@contentmd/cli` | `@contentmd/agent@workspace:*`, `@contentmd/core@workspace:*`, `commander@15.0.0` |

Package `tsconfig.json` references mirror those runtime edges. A package may use a type-only dependency only when that package is also declared in `devDependencies` with `workspace:*`.

## Global implementation rules

1. Write the failing test before production code.
2. Use `apply_patch` for every handwritten file change.
3. Run the narrow test first, then `pnpm test`, `pnpm typecheck`, and `pnpm lint` at each task boundary.
4. Use stable lowercase identifiers with explicit namespaces; never derive authority from an identifier.
5. Canonical JSON is recursively key-sorted UTF-8 without insignificant whitespace and with a final newline. Digests are lowercase SHA-256 hex over those exact bytes.
6. JSON schemas set `additionalProperties: false` unless a field is explicitly an open metadata bag.
7. Never store credentials, raw private context, or model secrets in `.contentmd/`.
8. All mutating CLI commands preview by default. `apply` requires an exact approved transaction identifier and subject digest.
9. Tests use temporary directories created under the operating-system temp directory; they never mutate the workspace fixture in place.
10. The recorded model provider is test data, not a claim of writing intelligence or quality.
11. The `node:sqlite` store is accepted only under the pinned Node 24.14 runtime for this slice. Its adapter rejects other runtimes with `unsupported_runtime`; a later storage-compatibility plan must graduate it before broad distribution.

---

## Task 1: Initialize the executable TypeScript workspace

**Files:**

- Create: `.gitignore`
- Create: `LICENSE`
- Create: `README.md`
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `tsconfig.base.json`
- Create: `tsconfig.json`
- Create: `scripts/check-package-boundaries.mjs`
- Create: `packages/*/package.json`
- Create: `packages/*/tsconfig.json`
- Create: `packages/*/src/index.ts`
- Create: `packages/*/test/smoke.test.ts`

**Step 1: Initialize Git only if absent**

Run:

```bash
test -d .git || git init --initial-branch=main
git status --short
```

Expected: an existing repository is left unchanged, or a new `main` repository is created. Existing files remain unmodified.

**Step 2: Write the failing workspace smoke test**

In every package, add a smoke test importing its public package name and asserting its frozen package identifier. The root test command must discover all package tests.

Run:

```bash
pnpm test
```

Expected: FAIL because the root workspace and package exports do not exist yet.

**Step 3: Add the workspace configuration**

Root `package.json` must contain:

- `private: true`;
- `packageManager: pnpm@11.9.0`;
- `engines.node: ">=24.14.0 <25"`;
- scripts `build`, `typecheck`, `test`, `test:watch`, `lint`, and `verify:foundation`;
- dev dependencies pinned exactly to TypeScript 7.0.2, Vitest 4.1.11, `@types/node` 26.2.0, and `tsx` 4.23.12.

The exact root scripts are:

```json
{
  "build": "tsc -b tsconfig.json",
  "typecheck": "tsc -b tsconfig.json --pretty false",
  "test": "vitest run",
  "test:watch": "vitest",
  "lint": "node scripts/check-package-boundaries.mjs && tsc -b tsconfig.json --pretty false",
  "verify:foundation": "node scripts/verify-foundation.mjs"
}
```

`LICENSE` contains the complete Apache License 2.0 text and the repository README states the distribution target without claiming rights over third-party research sources.

Create a root `tsconfig.json` whose `references` list all packages in dependency order. `tsconfig.base.json` must set `composite`, `declaration`, `declarationMap`, `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `module: NodeNext`, `moduleResolution: NodeNext`, `target: ES2024`, `lib: ["ES2024"]`, `types: ["node"]`, `resolveJsonModule: true`, `verbatimModuleSyntax`, and `skipLibCheck: false`.

`.gitignore` covers only generated or local material: `node_modules/`, `dist/`, `*.tsbuildinfo`, coverage output, `.contentmd/local/`, `.contentmd/cache/`, `.contentmd/runtime/`, and operating-system editor files. It must not ignore approved project records under `.contentmd/`.

Package names are:

```text
@contentmd/schemas
@contentmd/core
@contentmd/memory
@contentmd/governance
@contentmd/adapter-sdk
@contentmd/adapter-filesystem
@contentmd/research
@contentmd/evaluation
@contentmd/model-provider-sdk
@contentmd/writer
@contentmd/learning
@contentmd/agent
@contentmd/cli
```

`scripts/check-package-boundaries.mjs` fails when one package imports another package that is absent from its declared `dependencies`.

**Step 4: Install and verify**

Run:

```bash
pnpm install --frozen-lockfile=false
pnpm test
pnpm typecheck
pnpm lint
```

Expected: all package smoke tests pass, TypeScript project references build, and package-boundary validation exits 0.

**Step 5: Commit**

```bash
git add .gitignore LICENSE README.md package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json tsconfig.json scripts packages
git commit -m "build: initialize contentmd TypeScript workspace"
```

---

## Task 2: Implement canonical records, identity, and schemas

**Files:**

- Create: `packages/schemas/src/base-record.schema.json`
- Create: `packages/schemas/src/content-records.schema.json`
- Create: `packages/schemas/src/governance-records.schema.json`
- Create: `packages/schemas/src/workflow-records.schema.json`
- Create: `packages/schemas/src/schema-registry.ts`
- Create: `packages/schemas/test/schema-registry.test.ts`
- Create: `packages/core/src/canonical-json.ts`
- Create: `packages/core/src/identity.ts`
- Create: `packages/core/src/records.ts`
- Create: `packages/core/test/canonical-json.test.ts`
- Create: `packages/core/test/records.test.ts`

**Step 1: Write failing canonicalization and schema tests**

Test that:

- logically equivalent objects produce byte-identical canonical JSON;
- array order is preserved;
- undefined, non-finite numbers, duplicate record IDs, and ambiguous unions fail;
- digests are 64-character lowercase SHA-256 hex;
- every durable record requires `record_id`, `schema_id`, `schema_version`, `record_version`, `content_digest`, `scope`, `provenance`, and `lifecycle_state`;
- unknown top-level fields fail closed.

Run:

```bash
pnpm --filter @contentmd/core test -- canonical-json records
pnpm --filter @contentmd/schemas test -- schema-registry
```

Expected: FAIL on missing modules.

**Step 2: Implement the exact public interfaces**

```ts
export type LifecycleState =
  | "proposed"
  | "approved"
  | "active"
  | "superseded"
  | "retired"
  | "rejected";

export interface DurableRecord<TPayload> {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  record_version: number;
  content_digest: string;
  scope: RecordScope;
  provenance: ProvenanceRef[];
  lifecycle_state: LifecycleState;
  payload: TPayload;
}

export function canonicalJson(value: unknown): string;
export function sha256Canonical(value: unknown): string;
export function finalizeRecord<T>(input: Omit<DurableRecord<T>, "content_digest">): DurableRecord<T>;
export function validateRecord(schemaId: string, value: unknown): ValidationResult;
```

The schema registry uses AJV 2020 mode. Schemas cover source/evidence, product/audience/journey/state, IA node/navigation relation, semantic message/expression/occurrence, content pattern, finding/proposal/decision, learning candidate, policy decision, approval, change transaction, verification receipt, and audit event.

**Step 3: Verify and commit**

```bash
pnpm --filter @contentmd/core test
pnpm --filter @contentmd/schemas test
pnpm typecheck
git add packages/core packages/schemas
git commit -m "feat: add canonical contentmd record contracts"
```

---

## Task 3: Add append-only event memory and graph projections

**Files:**

- Create: `packages/memory/src/event-store.ts`
- Create: `packages/memory/src/sqlite-event-store.ts`
- Create: `packages/memory/src/projector.ts`
- Create: `packages/memory/src/export.ts`
- Create: `packages/memory/test/sqlite-event-store.test.ts`
- Create: `packages/memory/test/projector.test.ts`

**Step 1: Write failing append-only tests**

Tests must prove:

- a stream starts at sequence 1;
- each event binds the prior event digest;
- duplicate event IDs, wrong predecessor digests, and non-monotonic sequence numbers fail;
- records can be superseded only through a new event;
- projections are identical after two rebuilds;
- export/import preserves event bytes and final chain head;
- private payloads are rejected unless an explicit permitted data class is present.

**Step 2: Implement the event store**

Use `node:sqlite` behind this interface:

```ts
export interface AppendOnlyEventStore {
  append(command: AppendEventCommand): Promise<StoredEvent>;
  readStream(streamId: string, afterSequence?: number): Promise<StoredEvent[]>;
  getHead(streamId: string): Promise<StreamHead | null>;
  rebuild<T>(projector: Projector<T>): Promise<T>;
  exportCanonical(): Promise<Uint8Array>;
}
```

Create tables `events`, `stream_heads`, and `projection_checkpoints`. SQLite transactions must atomically insert the event and advance its stream head. No update or delete API is exported.

**Step 3: Implement graph projection**

The first graph projection supports nodes, typed edges, lifecycle state, source provenance, and unresolved references. It rejects dangling required references and reports optional unresolved references explicitly.

**Step 4: Verify and commit**

```bash
pnpm --filter @contentmd/memory test
pnpm typecheck
git add packages/memory
git commit -m "feat: add append-only memory and graph projections"
```

---

## Task 4: Implement fail-closed governance and audit

**Files:**

- Create: `packages/governance/src/policy.ts`
- Create: `packages/governance/src/compose.ts`
- Create: `packages/governance/src/authorize.ts`
- Create: `packages/governance/src/audit.ts`
- Create: `packages/governance/test/compose.test.ts`
- Create: `packages/governance/test/authorize.test.ts`

**Step 1: Write failing policy tests**

Cover exact decisions `allow`, `deny`, and `review`. Prove:

- most-restrictive-wins across project, task, adapter, data, and action scopes;
- operating mode never grants a capability;
- missing policy, expired grant, revoked approval, excess resource ceiling, disallowed egress, or missing readback fails closed;
- historical success and model confidence never affect authorization;
- every decision creates a privacy-minimized audit event.

**Step 2: Implement public contracts**

```ts
export type PolicyDisposition = "allow" | "deny" | "review";

export interface OperationRequest {
  operation_id: string;
  intent: "discover" | "advise" | "draft" | "apply" | "enforce";
  action: string;
  adapter_id: string;
  resource_scope: string[];
  data_classes: string[];
  requested_limits: ResourceLimits;
}

export function composePolicies(input: ComposePolicyInput): ComposedPolicy;
export function authorizeOperation(input: AuthorizationInput): AuthorizationDecision;
```

Starter policy permits reads inside the declared project root, local proposed record creation, deterministic review, and patch preview. It requires review for fixture writes and denies network, external publication, credential access, arbitrary command execution, and learning promotion.

**Step 3: Verify and commit**

```bash
pnpm --filter @contentmd/governance test
pnpm typecheck
git add packages/governance
git commit -m "feat: add fail-closed governance policy engine"
```

---

## Task 5: Implement repository adoption and governance bootstrap

**Files:**

- Create: `packages/agent/src/adoption.ts`
- Create: `packages/agent/src/content-contract.ts`
- Create: `packages/agent/src/host-bridge.ts`
- Create: `packages/agent/src/doctor.ts`
- Create: `packages/agent/test/adoption.test.ts`
- Create: `packages/agent/test/host-bridge.test.ts`
- Create: `packages/agent/test/doctor.test.ts`

**Step 1: Write failing adoption tests**

Test empty, existing-product, and already-adopted repositories. Assert that initialization:

- never overwrites `PRODUCT.md`, `DESIGN.md`, `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, Gemini, or Copilot instructions;
- creates `CONTENT.md`, `.contentmd/manifest.json`, and the approved directory tree;
- records detected sources as evidence, not authority;
- installs a proposed low-risk policy with external publication denied;
- identifies unresolved owner roles and product facts;
- is idempotent on a second run;
- previews host-bridge changes before any write;
- emits the reminder once per task and suppresses it after acknowledgement.

**Step 2: Implement adoption contracts**

```ts
export interface AdoptionPlan {
  project_root: string;
  existing_sources: DetectedSource[];
  creates: ProposedFile[];
  bridge_previews: HostBridgePreview[];
  unresolved_questions: OpenQuestion[];
  governance_bootstrap: GovernanceBootstrap;
}

export function planAdoption(projectRoot: string): Promise<AdoptionPlan>;
export function executeAdoption(plan: AdoptionPlan, approval: LocalWriteApproval): Promise<AdoptionReceipt>;
export function runDoctor(projectRoot: string): Promise<DoctorReport>;
```

`CONTENT.md` contains product scope, users/jobs, principles, sources, boundaries, risks, review routes, and links only. Generated inventories stay in structured records.

**Step 3: Verify and commit**

```bash
pnpm --filter @contentmd/agent test -- adoption host-bridge doctor
pnpm typecheck
git add packages/agent
git commit -m "feat: add portable repository adoption"
```

---

## Task 6: Create the synthetic application and filesystem adapter

**Files:**

- Create: `fixtures/synthetic-web-app/package.json`
- Create: `fixtures/synthetic-web-app/PRODUCT.md`
- Create: `fixtures/synthetic-web-app/DESIGN.md`
- Create: `fixtures/synthetic-web-app/src/App.tsx`
- Create: `fixtures/synthetic-web-app/src/routes.ts`
- Create: `fixtures/synthetic-web-app/src/messages/en-US.json`
- Create: `fixtures/synthetic-web-app/src/messages/fr-CA.json`
- Create: `fixtures/synthetic-web-app/src/components/CheckoutSummary.tsx`
- Create: `fixtures/synthetic-web-app/src/components/RecoveryPanel.tsx`
- Create: `packages/adapter-sdk/src/adapter.ts`
- Create: `packages/adapter-filesystem/src/discover.ts`
- Create: `packages/adapter-filesystem/src/coordinates.ts`
- Create: `packages/adapter-filesystem/test/discover-fixture.test.ts`

**Step 1: Materialize exact fixture defects**

The fixture contains stable examples of:

- unsupported claim: `The smartest way to buy anything.`;
- AI-like generic abstraction: `Unlock a seamless experience that empowers your journey.`;
- state error after an unknown payment outcome: `Payment failed. Try again.`;
- inaccessible icon-only removal control with `aria-label="Action"`;
- inconsistent terms `cart`, `bag`, and `basket`;
- navigation labels `Workspace`, `Hub`, and `Center` for the same destination;
- missing recovery guidance;
- a fr-CA English fallback;
- a valid destructive action labeled `Delete workspace` that becomes the only apply target.

The fixture is wholly synthetic, contains no secrets, and is licensed with the repository.

**Step 2: Write failing discovery tests**

The adapter must return exact file, line, column, syntax kind, route, locale, channel, component, literal or pattern, and surrounding semantic context for React text, JSX attributes, HTML metadata, routes, and JSON catalogs. It must not scan ignored paths, `.contentmd-test/`, build output, dependencies, or symlinks outside the root.

**Step 3: Implement the adapter interface**

```ts
export interface ContentAdapter {
  descriptor: AdapterDescriptor;
  discover(request: DiscoverRequest): Promise<DiscoverResult>;
  preview(request: ChangePreviewRequest): Promise<ChangePreview>;
  apply(request: ApprovedChangeRequest): Promise<ApplyReceipt>;
  verify(request: VerificationRequest): Promise<VerificationReceipt>;
}
```

The filesystem adapter implements discovery first. `apply` and `verify` remain typed `unsupported_capability` until Task 12.

**Step 4: Verify and commit**

```bash
pnpm --filter @contentmd/adapter-filesystem test
pnpm typecheck
git add fixtures/synthetic-web-app packages/adapter-sdk packages/adapter-filesystem
git commit -m "feat: discover content in a synthetic web application"
```

---

## Task 7: Compile product context, journeys, IA, messages, and occurrences

**Files:**

- Create: `packages/core/src/context-compiler.ts`
- Create: `packages/core/src/content-graph.ts`
- Create: `packages/core/src/message-identity.ts`
- Create: `packages/core/test/context-compiler.test.ts`
- Create: `packages/core/test/message-identity.test.ts`
- Create: `packages/agent/src/model-workflow.ts`
- Create: `packages/agent/test/model-workflow.test.ts`

**Step 1: Write failing model tests**

Test that the fixture yields explicit product, audience, job, journey, stage, state, route, IA node, navigation relation, semantic message, expression slot, expression version, and implementation occurrence records. Prove that:

- the same literal may realize different messages;
- the same message may have different locale/channel expressions;
- locale, channel, modality, surface, slot, and state participate in expression identity;
- product questions remain open when no source establishes an answer;
- graph rebuilds are byte-deterministic.

**Step 2: Implement compilation**

The compiler consumes source records and discovered occurrences. It never infers approval or observed behavior from source presence. It creates proposed context records plus explicit unknowns.

**Step 3: Verify and commit**

```bash
pnpm --filter @contentmd/core test -- context-compiler message-identity
pnpm --filter @contentmd/agent test -- model-workflow
pnpm typecheck
git add packages/core packages/agent
git commit -m "feat: compile the content context graph"
```

---

## Task 8: Ingest governed product-pattern research

**Files:**

- Create: `fixtures/frozen-pattern-packet/manifest.json`
- Create: `fixtures/frozen-pattern-packet/patterns.jsonl`
- Create: `fixtures/frozen-pattern-packet/sources.jsonl`
- Create: `fixtures/frozen-pattern-packet/LICENSES.md`
- Create: `packages/research/src/pattern-record.ts`
- Create: `packages/research/src/ingest.ts`
- Create: `packages/research/src/retrieve.ts`
- Create: `packages/research/test/ingest.test.ts`
- Create: `packages/research/test/retrieve.test.ts`

**Step 1: Write failing packet tests**

The frozen packet contains synthetic observations of recovery, commitment, navigation, and category-language mechanisms. Tests require source locator, access mode, captured-at time, rights status, evidence strength, problem, context, mechanism, counterexample, failure mode, transfer condition, non-transferable detail, and prohibited imitation boundary.

Reject missing provenance, unknown rights status, copied distinctive expression, stale manifest digest, and a pattern whose transfer conditions do not match the current task.

**Step 2: Implement ingest and deterministic retrieval**

```ts
export function ingestPatternPacket(packetRoot: string): Promise<PatternIngestResult>;
export function retrievePatterns(query: PatternQuery, corpus: ContentPatternRecord[]): PatternMatch[];
```

Retrieval is deterministic weighted matching over declared context fields. It records reasons and nonmatches. It does not use embeddings in this slice.

**Step 3: Verify and commit**

```bash
pnpm --filter @contentmd/research test
pnpm typecheck
git add fixtures/frozen-pattern-packet packages/research
git commit -m "feat: ingest governed content pattern research"
```

---

## Task 9: Add deterministic content review and evaluation

**Files:**

- Create: `packages/evaluation/src/rules.ts`
- Create: `packages/evaluation/src/review.ts`
- Create: `packages/evaluation/src/report.ts`
- Create: `packages/evaluation/test/review-fixture.test.ts`
- Create: `packages/evaluation/test/refusal.test.ts`

**Step 1: Write failing rule tests**

Create frozen rule IDs for unsupported superlatives, vague value claims, generic abstraction, state mismatch, unsafe retry, weak accessible name, terminology inconsistency, duplicate destination labels, missing recovery, and locale fallback.

Each finding must include finding ID, rule version, severity, hard/advisory class, exact occurrence refs, evidence refs, rationale, uncertainty, suggested next action, and whether automatic rewriting is allowed.

Test that unknown product behavior yields `product_behavior_unknown`, not a guessed rewrite. Test that `reads_like_ai` never appears as an authorship claim; the report names observable writing qualities.

**Step 2: Implement the review pipeline**

```ts
export function reviewContent(input: ReviewInput): ReviewReport;
export function summarizeReview(report: ReviewReport): HumanReviewSummary;
```

Hard outcomes remain separate from advisory dimensions. No universal scalar is emitted.

**Step 3: Verify and commit**

```bash
pnpm --filter @contentmd/evaluation test
pnpm typecheck
git add packages/evaluation
git commit -m "feat: add deterministic content review"
```

---

## Task 10: Add the provider-neutral writer and recorded provider

**Files:**

- Create: `packages/model-provider-sdk/src/provider.ts`
- Create: `packages/model-provider-sdk/src/recorded-provider.ts`
- Create: `packages/model-provider-sdk/test/recorded-provider.test.ts`
- Create: `packages/writer/src/task-packet.ts`
- Create: `packages/writer/src/strategy.ts`
- Create: `packages/writer/src/draft.ts`
- Create: `packages/writer/src/rewrite.ts`
- Create: `packages/writer/test/writer-fixture.test.ts`
- Create: `fixtures/synthetic-web-app/.contentmd-test/recorded-model-responses.jsonl`

**Step 1: Write failing provider and writer tests**

The provider contract accepts a versioned request and returns a versioned output plus provider/model identity, input digest, output digest, token accounting, and declared deterministic status. The recorded provider rejects any request whose digest is absent from the fixture cassette.

Writer tests require:

- a value proposition;
- a message hierarchy;
- navigation recommendations;
- contextual alternatives for the synthetic defects;
- evidence and retrieved-pattern references;
- prohibited-claim handling;
- uncertainty and trade-offs;
- a structured diff proposal.

**Step 2: Implement exact interfaces**

```ts
export interface ModelProvider {
  descriptor: ModelProviderDescriptor;
  generate(request: ModelRequest): Promise<ModelResponse>;
}

export interface ContentTaskPacket {
  task_id: string;
  product_context_refs: string[];
  audience_job_refs: string[];
  journey_state_refs: string[];
  semantic_message_ref: string;
  required_fact_refs: string[];
  prohibited_claims: string[];
  consequence: string;
  recovery: string | null;
  channel: string;
  locale: string;
  risk: string;
  evidence_refs: string[];
  acceptance_criteria: string[];
}
```

Strategy, draft, and rewrite are separate operations. Model output creates proposals only; it never creates a decision, approval, policy, or applied change.

**Step 3: Verify and commit**

```bash
pnpm --filter @contentmd/model-provider-sdk test
pnpm --filter @contentmd/writer test
pnpm typecheck
git add packages/model-provider-sdk packages/writer fixtures/synthetic-web-app/.contentmd-test
git commit -m "feat: add recorded content strategy and writing flow"
```

---

## Task 11: Record human decisions and create scoped learning candidates

**Files:**

- Create: `packages/learning/src/feedback.ts`
- Create: `packages/learning/src/candidate.ts`
- Create: `packages/learning/src/promotion.ts`
- Create: `packages/learning/test/feedback.test.ts`
- Create: `packages/learning/test/candidate.test.ts`
- Create: `packages/agent/src/decision-workflow.ts`
- Create: `packages/agent/test/decision-workflow.test.ts`

**Step 1: Write failing decision tests**

Use exact statuses `accepted`, `edited`, `rejected`, and `abstained`. A decision records actor role, rationale, proposal ref, selected expression or edit, evidence reviewed, scope, and timestamp. It does not imply mutation approval.

Learning tests prove:

- feedback is appended, never overwrites a proposal;
- candidates deduplicate by hypothesis and scope;
- project feedback cannot promote to organization or public scope;
- one decision is insufficient to claim a learned preference;
- new candidates start `proposed`, with promotion `not_requested`;
- absent learning-data permission returns `learning_data_not_authorized`;
- no policy file or prior event is rewritten.

**Step 2: Implement the learning boundary**

```ts
export function recordContentDecision(input: ContentDecisionInput): Promise<ContentDecisionRecord>;
export function createLearningCandidate(input: LearningCandidateInput): LearningCandidateRecord;
export function evaluatePromotionReadiness(candidate: LearningCandidateRecord, policy: LearningPolicy): PromotionReadiness;
```

The candidate contains hypothesis, expected benefit, supporting and contradicting decisions, data scope, rights/privacy disposition, evaluation plan, rollback plan, and current non-promoted state.

**Step 3: Verify and commit**

```bash
pnpm --filter @contentmd/learning test
pnpm --filter @contentmd/agent test -- decision-workflow
pnpm typecheck
git add packages/learning packages/agent
git commit -m "feat: record decisions and learning candidates"
```

---

## Task 12: Implement governed preview, apply, readback, and rollback

**Files:**

- Create: `packages/adapter-filesystem/src/preview.ts`
- Create: `packages/adapter-filesystem/src/apply.ts`
- Create: `packages/adapter-filesystem/src/verify.ts`
- Create: `packages/adapter-filesystem/src/rollback.ts`
- Create: `packages/adapter-filesystem/test/change-transaction.test.ts`
- Create: `packages/governance/test/change-authorization.test.ts`
- Create: `packages/agent/src/change-workflow.ts`
- Create: `packages/agent/test/change-workflow.test.ts`

**Step 1: Write failing mutation tests**

The only positive case targets the copied fixture expression `Delete workspace` and replaces it with `Delete this workspace` in one exact JSX coordinate.

Freeze these identifiers in the test:

```text
proposal_id: prop_fixture_delete_workspace_v1
decision_id: dec_fixture_delete_workspace_v1
approval_id: apr_fixture_delete_workspace_v1
transaction_id: txn_fixture_delete_workspace_v1
verification_id: verify_fixture_delete_workspace_v1
```

Test rejection of missing approval, wrong subject digest, expired approval, path escape, symlink escape, multi-file widening, changed source bytes, unsupported encoding, failed readback, and unverified rollback. Test that a proposal acceptance is not mutation approval.

**Step 2: Implement the transaction protocol**

```ts
export interface ChangeTransaction {
  transaction_id: string;
  proposal_id: string;
  decision_id: string;
  approval_id: string;
  target_path: string;
  before_digest: string;
  after_digest: string;
  unified_diff: string;
  rollback_bytes_digest: string;
}
```

Apply writes a temporary sibling file, fsyncs it, performs an atomic rename, reads the target through a new file descriptor, validates exact expected bytes, and appends the receipt. Rollback uses captured original bytes and requires its own governed operation and readback.

**Step 3: Verify and commit**

```bash
pnpm --filter @contentmd/adapter-filesystem test -- change-transaction
pnpm --filter @contentmd/governance test -- change-authorization
pnpm --filter @contentmd/agent test -- change-workflow
pnpm typecheck
git add packages/adapter-filesystem packages/governance packages/agent
git commit -m "feat: apply only approved verified content changes"
```

---

## Task 13: Build the CLI and close the vertical workflow

**Files:**

- Create: `packages/cli/src/main.ts`
- Create: `packages/cli/src/output.ts`
- Create: `packages/cli/src/exit-codes.ts`
- Create: `packages/cli/src/commands/init.ts`
- Create: `packages/cli/src/commands/doctor.ts`
- Create: `packages/cli/src/commands/discover.ts`
- Create: `packages/cli/src/commands/model.ts`
- Create: `packages/cli/src/commands/research.ts`
- Create: `packages/cli/src/commands/review.ts`
- Create: `packages/cli/src/commands/strategy.ts`
- Create: `packages/cli/src/commands/draft.ts`
- Create: `packages/cli/src/commands/rewrite.ts`
- Create: `packages/cli/src/commands/decision.ts`
- Create: `packages/cli/src/commands/diff.ts`
- Create: `packages/cli/src/commands/apply.ts`
- Create: `packages/cli/src/commands/verify.ts`
- Create: `packages/cli/src/commands/learn.ts`
- Create: `packages/cli/test/vertical-slice.test.ts`
- Create: `packages/cli/test/exit-codes.test.ts`
- Modify: `packages/cli/package.json`

**Step 1: Write the failing end-to-end test**

Copy `fixtures/synthetic-web-app` to a temporary directory and execute the CLI as a subprocess. The test must run:

```bash
contentmd init --yes --root "$CONTENTMD_FIXTURE_ROOT" --json
contentmd doctor --root "$CONTENTMD_FIXTURE_ROOT" --json
contentmd discover --root "$CONTENTMD_FIXTURE_ROOT" --json
contentmd model --root "$CONTENTMD_FIXTURE_ROOT" --json
contentmd research ingest --root "$CONTENTMD_FIXTURE_ROOT" --packet "$CONTENTMD_PATTERN_PACKET" --json
contentmd review --root "$CONTENTMD_FIXTURE_ROOT" --json
contentmd strategy --root "$CONTENTMD_FIXTURE_ROOT" --provider recorded --json
contentmd draft --root "$CONTENTMD_FIXTURE_ROOT" --provider recorded --json
contentmd rewrite --root "$CONTENTMD_FIXTURE_ROOT" --provider recorded --json
contentmd decision record --root "$CONTENTMD_FIXTURE_ROOT" --file "$CONTENTMD_DECISION_FILE" --json
contentmd learn --root "$CONTENTMD_FIXTURE_ROOT" --json
contentmd diff --root "$CONTENTMD_FIXTURE_ROOT" --proposal prop_fixture_delete_workspace_v1 --json
contentmd apply --root "$CONTENTMD_FIXTURE_ROOT" --transaction txn_fixture_delete_workspace_v1 --preview --json
contentmd apply --root "$CONTENTMD_FIXTURE_ROOT" --transaction txn_fixture_delete_workspace_v1 --approval apr_fixture_delete_workspace_v1 --json
contentmd verify --root "$CONTENTMD_FIXTURE_ROOT" --transaction txn_fixture_delete_workspace_v1 --json
```

The test harness writes the exact decision and approval records before the last three commands. No production command auto-creates approval.

**Step 2: Freeze exit codes and JSON envelope**

```text
0 completed
10 findings_present
20 blocked_by_evidence
21 denied_by_governance
22 invalid_input
23 unsupported_capability
30 internal_failure
```

Every JSON response uses `contentmd.command-result/0.1.0`, command ID, status, exit code, record refs, findings, warnings, next actions, and audit ref. Human output is rendered from the same envelope.

**Step 3: Implement CLI composition**

Commander parses commands only. Business logic stays in package APIs. The CLI passes explicit project roots and never uses the caller's home directory for project state. `packages/cli/package.json` exposes `contentmd` as `./dist/main.js`; `main.ts` begins with the Node shebang and invokes `main(process.argv)` only after module initialization succeeds.

**Step 4: Verify and commit**

```bash
pnpm --filter @contentmd/cli test
pnpm test
pnpm typecheck
pnpm lint
git add packages/cli
git commit -m "feat: close the local contentmd vertical workflow"
```

---

## Task 14: Independently verify retention, determinism, and non-effects

**Files:**

- Create: `scripts/verify-foundation.mjs`
- Create: `docs/verification/foundation-vertical-slice.md`
- Modify: `README.md`
- Modify: `research/INDEX.md`
- Modify: `research/09-experimental/materials-and-access-register.md`

**Step 1: Write the failing independent verifier**

The verifier must run outside Vitest and fail unless it proves:

- clean install from the lockfile;
- package boundaries and exact dependency versions;
- schema and reference closure;
- two independent event-projection rebuilds match;
- two clean non-model runs produce matching canonical record digests;
- the recorded-provider cassette matches exact requests;
- initialization is idempotent and preserves host files;
- no network socket is opened: every retained CLI subprocess is launched with Node's `--permission`, project/runtime read allowlists, a temporary-root write allowlist, and no `--allow-net`;
- no file outside the temporary project root is written;
- preview creates no product mutation;
- unauthorized apply fails;
- authorized fixture apply changes one declared file and passes readback;
- rollback restores exact original bytes;
- learning remains proposed and non-promoted;
- event export/import preserves the chain;
- uninstall preview lists only installer-owned artifacts.

**Step 2: Add a package inventory and current-state report**

`docs/verification/foundation-vertical-slice.md` records commands, environment, package versions, fixture digest, test totals, verifier digest, known warnings, and explicit nonclaims. It must say the slice does not establish live-model writing quality, browser/desktop research, hosted runtime, real-product safety, human validation, or ML improvement.

Update the central research status only after the independent verifier passes. Preserve existing gate semantics and label the implementation as a bounded local synthetic slice, not an end-to-end released agent.

**Step 3: Run the final suite from a clean dependency state**

Use a temporary pnpm store rather than deleting user data:

```bash
CONTENTMD_PNPM_STORE="$(mktemp -d)"
pnpm install --frozen-lockfile --store-dir "$CONTENTMD_PNPM_STORE"
pnpm test
pnpm typecheck
pnpm lint
pnpm verify:foundation
git status --short
```

Expected: all commands exit 0. `git status --short` contains only the deliberate verification/status documentation changes before the final commit.

**Step 4: Commit the verified slice**

```bash
git add README.md docs/verification scripts/verify-foundation.mjs research/INDEX.md research/09-experimental/materials-and-access-register.md
git commit -m "test: verify retained contentmd foundation slice"
git status --short
```

Expected: clean working tree.

---

## Slice completion checklist

- [ ] A new repository can adopt `CONTENT.md` without host-file overwrite.
- [ ] Governance is useful but explicitly proposed when organizational authority is absent.
- [ ] React, HTML, route, metadata, accessibility, and localization content is discovered with exact coordinates.
- [ ] Product context, journey/state, IA, semantic message, expression, and occurrence identities remain distinct.
- [ ] Frozen product patterns retain provenance, rights, transfer, and imitation boundaries.
- [ ] Deterministic review finds factual, behavioral, IA, accessibility, terminology, locale, recovery, voice, and generic-writing issues.
- [ ] Recorded writing produces strategy, value proposition, hierarchy, navigation, and contextual microcopy proposals.
- [ ] Accepted, edited, rejected, and abstained decisions are independently recordable.
- [ ] A learning candidate is created but not promoted.
- [ ] Only a separately approved fixture transaction can mutate one declared target.
- [ ] Readback and rollback are independently verified.
- [ ] A clean rerun is deterministic for all non-model planes.
- [ ] No network, browser, desktop, publication, cloud, training, or autonomous-policy effect occurs.

## Required follow-on plans

The following remain separate plans after this slice is retained:

1. live model-provider adapters and model-output evaluation;
2. automated public-browser research and separately authorized Computer Use;
3. learned retrieval ranking, dataset governance, model registry, shadow evaluation, promotion, drift, and rollback;
4. optional Cloudflare Agents SDK and Workflows runtime with local-equivalence tests;
5. local workbench;
6. Figma, CMS, localization, analytics, support, experiment, and publication adapters;
7. domain packs and independent adoption in unrelated products; and
8. cognitive validation, qualified content-designer review, representative-user studies, and controlled product benchmarks.

Passing this plan establishes a retained local foundation, not completion of the overall universal-agent goal.
