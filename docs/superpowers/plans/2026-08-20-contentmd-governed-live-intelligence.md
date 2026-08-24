# content.md Governed Live Intelligence 0.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` task by task. Use `superpowers:test-driven-development` for every production change and `superpowers:verification-before-completion` before any completion claim.

**Goal:** Add one governed OpenAI Responses adapter to the retained content.md foundation while preserving provider-neutral core contracts, proposal-only writer behavior, strict structured output, exact egress authorization, no hidden conversation state, no automatic retries, and fail-closed audit/quarantine behavior.

**Architecture:** Canonical output schemas and a versioned prompt compiler produce exact immutable request material. A provider-neutral SDK prepares requests and an authenticated execution plan binds the exact bytes, destination, model, data classes, grant, controls, expiry, revocation checkpoint, and single-use attempt. The OpenAI package owns all OpenAI types. Agent orchestration receives an adapter by dependency injection, audits before and after transport, validates the returned model and output, and releases only canonical proposals.

**Tech stack:** Node.js 24.14.0, pnpm 11.9.0, TypeScript 7.0.2, Vitest 4.1.11, AJV 8.20.0, `openai@7.5.0`, SHA-256 canonical records, and the retained content.md packages.

**Spec:** [Live Intelligence and Learning 0.1](../specs/2026-08-20-contentmd-live-intelligence-learning-design.md), especially sections 6–8, 15–17, and 19.

## Global constraints

1. Only `packages/model-provider-openai` imports OpenAI types; only the CLI composition root imports that package.
2. Tests never call the public OpenAI endpoint. Production-live status requires a separately authorized smoke record.
3. No command accepts a secret value. Durable records store only typed `SecretRef` identities.
4. Request preparation completes before authorization. The authenticated plan binds exact body bytes, header template, destination, model, schema, controls, expiry, revocation checkpoint, and nonce.
5. The adapter sets `store: false`, `background: false`, `tools: []`, and strict JSON Schema output; it omits conversation, file, vector-store, and previous-response state.
6. `store: false` is a stateless-request setting, not a zero-retention claim. Provider data handling remains a separate current record.
7. `maxRetries: 0`; timeout or ambiguous outcome is `provider_outcome_unknown` and is never retried automatically.
8. Returned-model drift, refusal, incomplete output, malformed output, oversize output, audit failure, or currentness failure cannot create a proposal or learning input.
9. Model output has `authority_effect: none`; it cannot create approvals, grants, policy, promotion, publication, or runtime binding.
10. Use the bundled Node executable directly for Vitest so workers inherit Node 24.14.0.

---

## Task 1: Add the strict model-output schema registry

**Files:**

- Create: `packages/schemas/src/model-output/strategy.schema.json`
- Create: `packages/schemas/src/model-output/draft.schema.json`
- Create: `packages/schemas/src/model-output/rewrite.schema.json`
- Create: `packages/schemas/src/model-output/classification.schema.json`
- Create: `packages/schemas/src/model-output/evaluation.schema.json`
- Create: `packages/schemas/src/model-output/candidate-ranking.schema.json`
- Create: `packages/schemas/src/model-output-registry.ts`
- Create: `packages/schemas/test/model-output-registry.test.ts`
- Modify: `packages/schemas/src/index.ts`

**Step 1: Write and run failing registry tests**

Test the six exact schema IDs, required fields, enums, nullability, array bounds, closed objects, unknown-field rejection, stable canonicalization, provider projection, and `model_schema_not_projectable`.

Run:

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/schemas/test/model-output-registry.test.ts

Expected: FAIL because the registry does not exist.

**Step 2: Implement the minimum registry**

    export type ModelOutputSchemaId =
      | "contentmd.strategy-model-output/0.1.0"
      | "contentmd.draft-model-output/0.1.0"
      | "contentmd.rewrite-model-output/0.1.0"
      | "contentmd.classification-model-output/0.1.0"
      | "contentmd.evaluation-model-output/0.1.0"
      | "contentmd.candidate-ranking-model-output/0.1.0";

    export function resolveModelOutputSchema(
      schemaId: ModelOutputSchemaId,
    ): ModelOutputSchemaDefinition;

Every schema uses `additionalProperties: false`. Validation returns typed findings and never coerces input.

**Step 3: Verify and commit**

Run the focused test, schema suite, typecheck, and lint. Commit:

    git add packages/schemas
    git commit -m "feat: add strict model output schemas"

---

## Task 2: Upgrade provider-neutral contracts and migrate the recorded provider

**Files:**

- Create: `packages/model-provider-sdk/src/contracts.ts`
- Create: `packages/model-provider-sdk/src/schema-resolution.ts`
- Create: `packages/model-provider-sdk/src/execution.ts`
- Create: `packages/model-provider-sdk/src/errors.ts`
- Create: `packages/model-provider-sdk/test/contracts.test.ts`
- Create: `packages/model-provider-sdk/test/schema-resolution.test.ts`
- Modify: `packages/model-provider-sdk/src/provider.ts`
- Modify: `packages/model-provider-sdk/src/recorded-provider.ts`
- Modify: `packages/model-provider-sdk/src/index.ts`
- Modify: `packages/model-provider-sdk/package.json`
- Modify: `packages/model-provider-sdk/tsconfig.json`
- Modify: `packages/model-provider-sdk/test/recorded-provider.test.ts`
- Modify: `scripts/generate-writer-cassette.mts`
- Modify: `fixtures/synthetic-web-app/.contentmd-test/recorded-model-responses.jsonl`

**Step 1: Write failing 0.2 contract tests**

Freeze `contentmd.model-request/0.2.0`, `contentmd.model-response/0.2.0`, provider descriptor, canonical request/output digests, model-profile refs, context refs, output schema identity, token ceilings, locality/data classes, and transient-versus-durable fields.

**Step 2: Implement the execution seam**

    export interface ModelExecutionPort {
      descriptor: ModelProviderDescriptor;
      execute(request: ModelRequest): Promise<ModelExecutionResult>;
    }

    export interface AuthorizedProviderAdapter {
      descriptor: ModelProviderDescriptor;
      prepare(input: PrepareProviderRequestInput): Promise<PreparedProviderRequest>;
      executeAuthorized(
        prepared: PreparedProviderRequest,
        planRef: AuthenticatedExecutionPlanRef,
        ports: ProviderRuntimePorts,
      ): Promise<ModelExecutionResult>;
    }

The recorded provider implements `ModelExecutionPort`, remains network-free, and does not require a remote-provider grant.

**Step 3: Regenerate the cassette and prove byte stability**

Run focused tests twice and compare canonical response digests. Then run retained writer tests.

**Step 4: Commit**

    git add packages/model-provider-sdk scripts/generate-writer-cassette.mts fixtures/synthetic-web-app/.contentmd-test/recorded-model-responses.jsonl
    git commit -m "refactor: version provider neutral model contracts"

---

## Task 3: Add a versioned prompt compiler and validate output before proposals

**Files:**

- Create: `packages/writer/src/prompt-compiler.ts`
- Create: `packages/writer/src/prompts/common.ts`
- Create: `packages/writer/src/prompts/strategy.ts`
- Create: `packages/writer/src/prompts/draft.ts`
- Create: `packages/writer/src/prompts/rewrite.ts`
- Create: `packages/writer/test/prompt-compiler.test.ts`
- Create: `packages/writer/test/model-output-validation.test.ts`
- Modify: `packages/writer/src/strategy.ts`
- Modify: `packages/writer/src/draft.ts`
- Modify: `packages/writer/src/rewrite.ts`
- Modify: `packages/writer/src/index.ts`
- Modify: `packages/writer/test/writer-fixture.test.ts`

**Step 1: Write failing deterministic prompt tests**

Assert stable template IDs, versions, template digests, context ordering, retrieval snapshot refs, egress items, prompt digest, and `authority_effect: none`. Assert that raw competitor expressions, secrets, hidden files, and unauthorized private context cannot enter the prompt.

**Step 2: Implement `CompiledPrompt`**

    export interface CompiledPrompt {
      schema_version: "contentmd.compiled-prompt/0.1.0";
      template_id: string;
      template_version: "0.1.0";
      template_digest: string;
      instructions: string;
      input: string;
      context_refs: DigestRef[];
      retrieval_snapshot_ref: DigestRef | null;
      egress_items: EgressItemRef[];
      prompt_digest: string;
      authority_effect: "none";
    }

Split request construction from proposal materialization. Validate the canonical output through the Task 1 registry before creating any strategy, draft, or rewrite proposal.

**Step 3: Verify and commit**

    git add packages/writer
    git commit -m "feat: compile versioned model prompts"

---

## Task 4: Add provider records, preflight, plans, and a single-use attempt ledger

**Files:**

- Create: `packages/governance/src/provider-records.ts`
- Create: `packages/governance/src/provider-preflight.ts`
- Create: `packages/governance/src/provider-execution-plan.ts`
- Create: `packages/governance/src/plan-authentication.ts`
- Create: `packages/governance/src/attempt-ledger.ts`
- Create: `packages/governance/test/provider-preflight.test.ts`
- Create: `packages/governance/test/provider-execution-plan.test.ts`
- Create: `packages/governance/test/attempt-ledger.test.ts`
- Modify: `packages/governance/src/index.ts`
- Modify: `packages/governance/package.json`
- Modify: `packages/governance/tsconfig.json`

**Step 1: Write failing fail-closed authorization tests**

Cover missing/expired/revoked grants, policy mismatch, undeclared data class, missing connection or provider-data record, body/header/destination/model/schema drift, stale revocation checkpoint, nonce replay, audit unavailability, resource ceiling violation, and one successful exact binding.

**Step 2: Implement typed records**

Add `ModelProfile`, `ProviderDataHandlingProfile`, `ProviderConnectionRecord`, `SecretRef`, `RequestHeaderTemplate`, `ProviderCapabilityGrant`, `ProviderExecutionPlan`, and `ProviderReceipt`.

Use the retained `authorizeOperation()` for outer `model.generate` authority, then provider-specific exact checks.

    export function authorizeProviderExecution(
      input: ProviderAuthorizationInput,
    ): ProviderAuthorizationDecision;

    export async function issueProviderExecutionPlan(
      input: ProviderExecutionPlanInput,
      signer: ExecutionPlanSigner,
    ): Promise<AuthenticatedProviderExecutionPlan>;

The nonce claim is atomic immediately before transport. Replay, expiry, revocation, or drift rejects before any network attempt.

**Step 3: Verify and commit**

    git add packages/governance
    git commit -m "feat: govern exact provider executions"

---

## Task 5: Implement the OpenAI Responses adapter behind guarded transport

**Files:**

- Create: `packages/model-provider-openai/package.json`
- Create: `packages/model-provider-openai/tsconfig.json`
- Create: `packages/model-provider-openai/src/index.ts`
- Create: `packages/model-provider-openai/src/adapter.ts`
- Create: `packages/model-provider-openai/src/serialize.ts`
- Create: `packages/model-provider-openai/src/header-template.ts`
- Create: `packages/model-provider-openai/src/destination.ts`
- Create: `packages/model-provider-openai/src/guarded-fetch.ts`
- Create: `packages/model-provider-openai/src/response-parser.ts`
- Create: `packages/model-provider-openai/src/redaction.ts`
- Create: `packages/model-provider-openai/test/serialize.test.ts`
- Create: `packages/model-provider-openai/test/header-template.test.ts`
- Create: `packages/model-provider-openai/test/guarded-fetch.test.ts`
- Create: `packages/model-provider-openai/test/response-parser.test.ts`
- Create: `packages/model-provider-openai/test/openai-adapter.test.ts`
- Modify: `pnpm-workspace.yaml`
- Modify: `pnpm-lock.yaml`
- Modify: `tsconfig.json`

**Step 1: Write failing serializer and transport tests**

Prove exact method/origin/path, body bytes/digest/count, strict output schema, stateless fields, header template, `maxRetries: 0`, secret non-persistence, test-origin remap, and rejection of production secrets in tests.

**Step 2: Implement immutable preparation**

    export interface PreparedProviderRequest {
      adapter_id: "adapter.openai.responses";
      adapter_version: "0.1.0";
      request_id: string;
      method: "POST";
      origin: "https://api.openai.com";
      path: "/v1/responses";
      body_bytes: Uint8Array;
      body_sha256: string;
      body_byte_count: number;
      header_template: RequestHeaderTemplate;
      schema_projection: ProviderSchemaProjection;
    }

The guarded fetch compares actual SDK URL, headers, and body with the authenticated plan immediately before dispatch.

**Step 3: Parse every terminal boundary**

Fixtures and tests cover completed, refused, incomplete, malformed, oversized, and returned-model mismatch responses. Only completed, model-allowed, schema-valid output yields `canonical_output`.

**Step 4: Verify and commit**

    git add packages/model-provider-openai pnpm-workspace.yaml pnpm-lock.yaml tsconfig.json
    git commit -m "feat: add guarded OpenAI Responses adapter"

---

## Task 6: Add the governed live executor and audit quarantine

**Files:**

- Create: `packages/agent/src/local-artifacts.ts`
- Create: `packages/agent/src/provider-configuration.ts`
- Create: `packages/agent/src/live-model-executor.ts`
- Create: `packages/agent/src/provider-audit.ts`
- Create: `packages/agent/test/provider-configuration.test.ts`
- Create: `packages/agent/test/live-model-executor.test.ts`
- Create: `packages/agent/test/provider-quarantine.test.ts`
- Modify: `packages/agent/src/local-runtime.ts`
- Modify: `packages/agent/src/index.ts`

**Step 1: Write failing orchestration-order tests**

Instrument ports and assert this exact order: resolve records; compile and manifest; prepare bytes; authorize/authenticate; append pre-attempt audit; claim nonce; recheck currentness; execute; validate model/output; append outcome audit; release output.

**Step 2: Implement dependency-injected execution**

    export interface GovernedLiveModelExecutorInput {
      project_root: string;
      adapter: AuthorizedProviderAdapter;
      model_profile_ref: string;
      connection_ref: string;
      grant_ref: string;
      control_refs: string[];
    }

The agent package never imports OpenAI. If outcome audit cannot append, return `provider_output_quarantined`; no proposal or learning record is created.

**Step 3: Verify and commit**

    git add packages/agent
    git commit -m "feat: execute live models through governance"

---

## Task 7: Add CLI composition and live proposal workflows

**Files:**

- Create: `packages/cli/src/commands/connect.ts`
- Create: `packages/cli/src/openai-composition.ts`
- Create: `packages/cli/test/connect.test.ts`
- Create: `packages/cli/test/live-intelligence.test.ts`
- Modify: `packages/cli/src/main.ts`
- Modify: `packages/cli/src/commands/model.ts`
- Modify: `packages/cli/src/commands/strategy.ts`
- Modify: `packages/cli/src/commands/draft.ts`
- Modify: `packages/cli/src/commands/rewrite.ts`
- Modify: `packages/cli/src/commands/shared.ts`
- Modify: `packages/cli/package.json`
- Modify: `packages/cli/tsconfig.json`

**Step 1: Write failing command tests**

Implement exact commands:

    contentmd connect inspect
    contentmd connect openai --propose --model <id>
    contentmd model authorize --provider openai --operations strategy,draft,rewrite
    contentmd strategy --provider openai --grant <record>
    contentmd draft --provider openai --grant <record>
    contentmd rewrite --provider openai --grant <record>

Tests prove proposals have no connection effect, secrets cannot be accepted or printed, a grant is mandatory, JSON emits stable reason codes and refs, unauthorized calls create zero transport attempts, and all writing remains proposal-only.

**Step 2: Compose OpenAI only at the CLI root**

`openai-composition.ts` is the sole workspace consumer of `@contentmd/model-provider-openai`. Connection proposal accepts only credential-source identity, exact account/project scope, model, policy, operations, and data-handling record refs.

**Step 3: Verify and commit**

    git add packages/cli
    git commit -m "feat: add governed live intelligence CLI"

---

## Task 8: Add offline fixtures, independent verification, and production-smoke boundary

**Files:**

- Create: `fixtures/openai-responses/completed.json`
- Create: `fixtures/openai-responses/refused.json`
- Create: `fixtures/openai-responses/incomplete.json`
- Create: `fixtures/openai-responses/malformed.json`
- Create: `fixtures/openai-responses/oversized.json`
- Create: `fixtures/openai-responses/returned-model-mismatch.json`
- Create: `scripts/verify-live-intelligence.mjs`
- Create: `docs/verification/live-intelligence-0.1.md`
- Create: `docs/verification/openai-production-smoke-runbook.md`
- Modify: `package.json`
- Modify: `README.md`
- Modify: `scripts/verify-foundation.mjs`

**Step 1: Add independent negative checks**

The verifier independently proves zero unauthorized transports; exact request/header conformance; refusal/incomplete/invalid/oversized/model-mismatch quarantine; zero secret bytes in project artifacts; nonce replay and wire drift rejection; post-preflight revocation; unknown-outcome no-retry; audit failure quarantine; deterministic recorded-provider regression; and proposal-only outputs.

**Step 2: Make foundation verification extension-safe**

Replace the exact 13-package count with an exact required-foundation-package subset check while validating every discovered workspace package.

**Step 3: Run the full supported-runtime sequence**

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm install --frozen-lockfile
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --reporter=dot
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-foundation.mjs
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-live-intelligence.mjs
    git diff --check

Expected: all commands exit 0, all retained 95 tests remain green, no public endpoint is called, and the verification record says `production_live_verified: false`.

**Step 4: Commit**

    git add fixtures/openai-responses scripts/verify-live-intelligence.mjs docs/verification package.json README.md scripts/verify-foundation.mjs
    git commit -m "test: verify governed live intelligence"

## Execution order

Within this plan: `Task 1 -> Task 2 -> Task 3 -> Task 4 -> Task 5 -> Task 6 -> Task 7 -> Task 8`. Cross-plan dispatch and shared-file ownership follow the mandatory [program execution order](2026-08-20-contentmd-program-execution-order.md).

Task 1 and public UX-writing corpus schema work use distinct schema IDs but may not edit the registry concurrently; the program order serializes them. Browser access is never exposed as an OpenAI tool in this release.

## Completion meaning

Completion means a locally verified, provider-neutral, governed adapter can execute an explicitly authorized OpenAI Responses request through captured test transport and preserve all retained behavior. It does not mean credentials were configured, the production endpoint was called, writing quality improved, the model is generally effective, or publication is authorized.
