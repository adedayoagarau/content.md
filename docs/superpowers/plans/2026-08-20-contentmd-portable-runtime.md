# content.md Portable Runtime 0.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Use `superpowers:test-driven-development` for every production change and `superpowers:verification-before-completion` before claiming the runtime complete.

**Goal:** Build the host-adaptive portable runtime SDK, complete local Node/SQLite reference profile, read-only host detection, governed runtime binding, and synthetic canonical-first replica protocol required by Live Intelligence + Learning 0.1.

**Architecture:** `@contentmd/runtime-sdk` defines vendor-neutral, authorization-bearing interfaces and canonical records. `@contentmd/runtime-local` implements those interfaces with Node 24.14, SQLite, adopter-controlled local files, and an authoritative operation verifier; hosted bytes cannot become durable replica state until the local canonical replica stores and acknowledges the complete transitive artifact closure. Host detection can recognize existing stacks, including Cloudflare evidence, but this plan binds only the conforming local profile.

**Tech Stack:** Node.js 24.14.x, pnpm 11.9.0, TypeScript 7.0.2, Vitest 4.1.11, AJV 8.20.0, Commander 15.0.0, Node `crypto`, Node `fs`, and Node `sqlite`. ESM only. Apache-2.0 target. No new third-party runtime dependency.

**Specs:** [`2026-08-20-contentmd-live-intelligence-learning-design.md`](../specs/2026-08-20-contentmd-live-intelligence-learning-design.md) and [`2026-08-20-contentmd-universal-agent-design.md`](../specs/2026-08-20-contentmd-universal-agent-design.md).

**Program prerequisite:** Follow [`2026-08-20-contentmd-program-execution-order.md`](./2026-08-20-contentmd-program-execution-order.md). Portable-runtime implementation starts only after governed-live and recursive-learning record semantics and the public-corpus shared-package changes are integrated and verified. The program coordinator owns and serializes all edits to shared root files, including `package.json`, `pnpm-lock.yaml`, root `tsconfig.json`, `README.md`, and `scripts/verify-foundation.mjs`; portable-runtime task workers do not edit those files concurrently with another plan.

## Global Constraints

1. The supported execution boundary remains `node >=24.14.0 <25`. Every constructor that opens `node:sqlite` calls `assertSupportedSqliteRuntime()` before opening a file. Tests invoke `process.execPath`, and the command runner must establish that it is the pinned bundled Node path before the test starts; test code does not substitute another executable.
2. Keep `@contentmd/runtime-sdk` provider- and host-neutral. It must not import Cloudflare, OpenAI, Vercel, framework, database-vendor, or deployment-platform types.
3. Do not create `packages/runtime-cloudflare`, install `agents`, add Wrangler configuration, contact a control plane, deploy, or migrate host infrastructure.
4. Cloudflare evidence may appear only as a detected candidate with availability `adapter_unavailable_pending_plan_4`. Attempting to bind that candidate fails with `runtime_capability_unsupported`.
5. Runtime detection is read-only. It never reads credential values, executes package scripts, opens the network, installs packages, edits configuration, or treats repository configuration as proof of a live deployment.
6. The local profile is always available when the Node boundary passes and is the reference adopter-controlled canonical replica.
7. A hosted-produced event or artifact remains `ephemeral_uncommitted_preview` until the canonical replica stores and independently rehashes the event and every permitted required artifact, then issues an acknowledgement bound to the full manifest.
8. Before canonical acknowledgement, no hosted preview byte may appear in SQLite, a blob path, a projection, a job payload, an export, or another durable record.
9. Every runtime method receives an opaque `AuthorizedRuntimeOperation`. Each adapter resolves and claims it immediately before the read or effect. An authenticated ingress session never replaces an operation capability.
10. Operation tokens are single-use in 0.1. Event append idempotency is a separate record-level guarantee: identical event ID plus identical bytes returns the existing event; identical ID plus different bytes fails.
11. JSON schemas use Draft 2020-12 and `additionalProperties: false`. Canonical JSON, identifiers, and lowercase SHA-256 behavior continue to come from `@contentmd/core`.
12. Runtime bindings contain exact interface versions, semantics, adapter digests, conformance receipts, locations, retention, encryption, identity, authentication, secret, retry, telemetry, export, health, cleanup, and replica behavior. Capability booleans are insufficient.
13. No runtime adapter may widen model, data, connector, mutation, publication, release, or learning authority.
14. Use temporary directories for every test. Never mutate `fixtures/synthetic-web-app` in place.
15. Every task ends with the narrow tests, a direct bundled-Node TypeScript typecheck and package-boundary lint, the direct bundled-Node build where the task calls for it, the retained foundation verifier where applicable, and one focused commit.
16. Every executable Node command in this plan uses `/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node`. Every package-manager command uses `/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm` and is immediately preceded by the Node-version guard shown below. Do not invoke workspace test, build, typecheck, or lint scripts through the package manager: their child-process shebangs can resolve the system Node 26 runtime instead of the supported Node 24 runtime.

## Pinned Execution Toolchain

Before each package-manager call, run this guard as the immediately preceding command:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major, minor] = process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) { console.error(`unsupported_node_runtime:${process.versions.node}`); process.exit(1); }'
```

Tests run with the bundled Node directly against `node_modules/vitest/vitest.mjs`. Builds and typechecks run with the bundled Node directly against `node_modules/typescript/bin/tsc`. Linting runs the boundary checker with the bundled Node and then the direct TypeScript typecheck. These command forms are normative for every task below.

---

## Delivery Boundary

This plan creates two workspace packages:

```text
@contentmd/runtime-sdk
@contentmd/runtime-local
```

The package dependency graph after this plan is:

```text
@contentmd/schemas -> ajv
@contentmd/core -> @contentmd/schemas
@contentmd/governance -> @contentmd/core
@contentmd/memory -> @contentmd/core
@contentmd/runtime-sdk -> @contentmd/core + @contentmd/governance
@contentmd/runtime-local -> @contentmd/core + @contentmd/governance + @contentmd/memory + @contentmd/runtime-sdk
@contentmd/learning -> @contentmd/core + @contentmd/governance + @contentmd/runtime-sdk
@contentmd/agent -> @contentmd/runtime-sdk + @contentmd/runtime-local + existing portable packages
@contentmd/cli -> @contentmd/agent + @contentmd/core
```

Remove the currently unused `@contentmd/memory` dependency from governance. After the migration in Task 2, production code outside `@contentmd/runtime-local` must not construct `SqliteEventStore`; `scripts/check-package-boundaries.mjs` enforces that edge.

Local runtime state is laid out as:

```text
.contentmd/runtime/events.sqlite
.contentmd/runtime/runtime.sqlite
.contentmd/runtime/blobs/sha256/<first-two-hex>/<digest>
.contentmd/runtime/proposals/<proposal-id>.json
.contentmd/runtime/current-runtime-binding.json
.contentmd/runtime/exports/<export-id>/manifest.json
```

`events.sqlite` contains canonical project events. `runtime.sqlite` contains replaceable operational ledgers such as nonce claims, jobs, approval pauses, progress, schedules, outbox/inbox receipts, and health metadata. Content-addressed blobs belong to the canonical local replica only when their governing memory and export dispositions permit retention.

The implementation order is strict:

```text
schemas and SDK contracts
  -> operation authority and authorized event store
  -> idempotent events, blobs, sync, canonical acknowledgement
  -> local workflow capabilities
  -> local boundary capabilities
  -> read-only detection and proposals
  -> governed binding and CLI
  -> independent release verification
```

The source tasks have no semantic dependency among Tasks 4, 5, and 6 after Tasks 1–3 pass, but the mandatory program execution order still dispatches them one at a time. Task 7 waits for Tasks 1–6 because binding issuance requires conformance evidence for every claimed interface.

## Execution Preflight and Dirty-Worktree Baseline

Before Task 1 changes any plan-owned file, first create or update `.superpowers/sdd/2026-08-20-contentmd-portable-runtime/progress.md`, then record the current commit plus the complete, verbatim output of:

```bash
git rev-parse HEAD
git status --porcelain=v1 --untracked-files=all
```

Label that output `initial_portable_runtime_status`. The ledger is execution metadata and is not staged by the task commits. No task may modify a pre-existing dirty path unless that exact path is both declared in this plan and allocated to the task by the program coordinator. Task 8 compares the final status to this baseline; it accepts only baseline paths and declared portable-runtime outputs and rejects every unexpected path.

---

### Task 1: Add canonical runtime records and portable SDK contracts

**Files:**

- Create: `packages/schemas/src/runtime-records.schema.json`
- Modify: `packages/schemas/src/schema-registry.ts`
- Modify: `packages/schemas/src/index.ts`
- Modify: `packages/schemas/test/schema-registry.test.ts`
- Create: `packages/runtime-sdk/package.json`
- Create: `packages/runtime-sdk/tsconfig.json`
- Create: `packages/runtime-sdk/src/descriptor.ts`
- Create: `packages/runtime-sdk/src/operation.ts`
- Create: `packages/runtime-sdk/src/event-store.ts`
- Create: `packages/runtime-sdk/src/services.ts`
- Create: `packages/runtime-sdk/src/replica.ts`
- Create: `packages/runtime-sdk/src/detection.ts`
- Create: `packages/runtime-sdk/src/conformance.ts`
- Create: `packages/runtime-sdk/src/errors.ts`
- Create: `packages/runtime-sdk/src/index.ts`
- Create: `packages/runtime-sdk/test/descriptor.test.ts`
- Create: `packages/runtime-sdk/test/operation-contract.test.ts`
- Create: `packages/runtime-sdk/test/schema-contract.test.ts`
- Create: `packages/runtime-sdk/test/smoke.test.ts`
- Create: `packages/runtime-local/package.json`
- Create: `packages/runtime-local/tsconfig.json`
- Create: `packages/runtime-local/src/index.ts`
- Create: `packages/runtime-local/test/smoke.test.ts`
- Modify: `packages/governance/package.json`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `tsconfig.json`

**Interfaces:**

- Consumes: `canonicalJson()`, `sha256Canonical()`, `ResourceLimits`, and the digest-rich governance record references stabilized by the governed-live-intelligence plan.
- Produces: every portable type and interface used by Tasks 2–8, with no Node, SQLite, filesystem, or vendor type in `@contentmd/runtime-sdk`.

- [ ] **Step 1: Write failing schema and SDK contract tests**

Add schema tests that validate one complete record of each new schema family and reject an unknown field, a malformed digest, a capability boolean in place of an interface binding, and a binding without a conformance receipt.

The schema registry receives these exact IDs:

```ts
runtimeDetectionReport: "contentmd.runtime-detection-report",
runtimeProposal: "contentmd.runtime-proposal-record",
runtimeBindingDecision: "contentmd.runtime-binding-decision-record",
runtimeBinding: "contentmd.runtime-binding-record",
runtimeConformanceReceipt: "contentmd.runtime-conformance-receipt",
replicaArtifactManifest: "contentmd.replica-artifact-manifest",
replicaAck: "contentmd.replica-ack-record",
```

In `packages/runtime-sdk/test/operation-contract.test.ts`, assert the required claims explicitly:

```ts
import { describe, expect, it } from "vitest";
import type {
  AuthorizedRuntimeOperation,
  RuntimeOperationClaims,
} from "@contentmd/runtime-sdk";

describe("runtime operation contract", () => {
  it("binds authority to exact identity, resources, controls, limits, and runtime", () => {
    const claims = {
      capability_id: "capability.fixture.runtime.001",
      tenant_ref: "tenant.fixture",
      principal_ref: "actor.fixture.user",
      workload_ref: "workload.contentmd",
      project_ref: "project.fixture",
      action: "runtime.event.append",
      resources: [{ resource_id: "stream.fixture", content_digest: "a".repeat(64) }],
      data_classes: ["public-synthetic"],
      policy_refs: [{ record_id: "policy.fixture", record_version: 1, content_digest: "b".repeat(64) }],
      capability_grant_ref: { record_id: "grant.fixture", record_version: 1, content_digest: "c".repeat(64) },
      control_refs: [{ record_id: "control.memory.fixture", record_version: 1, content_digest: "d".repeat(64) }],
      resource_limits: { calls: 1, bytes: 4096, duration_ms: 2000, records: 2, model_tokens: 0, browser_actions: 0, retries: 0 },
      issued_at: "2026-08-20T18:00:00.000Z",
      expires_at: "2026-08-20T18:15:00.000Z",
      revocation_checkpoint: { stream_id: "stream.governance.fixture", sequence: 8, head_digest: "e".repeat(64) },
      nonce: "nonce.fixture.runtime.001",
      nonce_mode: "single_use",
      runtime_binding_digest: "f".repeat(64),
      audit_target: { stream_id: "stream.audit.fixture", data_class: "project-metadata" },
    } satisfies RuntimeOperationClaims;

    expect(claims.nonce_mode).toBe("single_use");
    expect(claims.control_refs).toHaveLength(1);
    expectTypeOf<AuthorizedRuntimeOperation>().toBeObject();
  });
});
```

- [ ] **Step 2: Run the tests and verify they fail before the packages exist**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/schemas/test/schema-registry.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/runtime-sdk/test
```

Expected: the schema test fails because the runtime schema IDs are unknown, and the direct Vitest run reports that the `packages/runtime-sdk/test` target does not exist yet.

- [ ] **Step 3: Add the two workspace package manifests and project references**

Use these exact package manifests:

```json
{
  "name": "@contentmd/runtime-sdk",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": { ".": { "types": "./src/index.ts", "development": "./src/index.ts", "default": "./dist/index.js" } },
  "scripts": { "test": "vitest run", "build": "tsc -b" },
  "dependencies": {
    "@contentmd/core": "workspace:*",
    "@contentmd/governance": "workspace:*"
  }
}
```

```json
{
  "name": "@contentmd/runtime-local",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": { ".": { "types": "./src/index.ts", "development": "./src/index.ts", "default": "./dist/index.js" } },
  "scripts": { "test": "vitest run", "build": "tsc -b" },
  "dependencies": {
    "@contentmd/core": "workspace:*",
    "@contentmd/governance": "workspace:*",
    "@contentmd/memory": "workspace:*",
    "@contentmd/runtime-sdk": "workspace:*"
  }
}
```

Remove `@contentmd/memory` from `packages/governance/package.json`; current governance source does not import it. Add project references in dependency order to root `tsconfig.json`. Add `verify:runtime` to root scripts with the path-agnostic package-script value `node scripts/verify-portable-runtime.mjs`; this value remains portable for adopters, but plan execution never invokes the package script and instead calls the verifier with the pinned bundled Node path.

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major, minor] = process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) { console.error(`unsupported_node_runtime:${process.versions.node}`); process.exit(1); }'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm install --lockfile-only
```

Expected: the lockfile gains workspace importers for both new packages and no new registry package.

- [ ] **Step 4: Implement the exact portable types**

`operation.ts` exports an opaque branded token, digest-bound record references, claims, effect request, verifier, and authenticated session token:

```ts
declare const authorizedRuntimeOperationBrand: unique symbol;
declare const authenticatedRuntimeSessionBrand: unique symbol;

export type AuthorizedRuntimeOperation = Readonly<{
  capability_ref: string;
  capability_digest: string;
  verifier_id: string;
  [authorizedRuntimeOperationBrand]: true;
}>;

export type AuthenticatedRuntimeSession = Readonly<{
  session_ref: string;
  session_digest: string;
  verifier_id: string;
  [authenticatedRuntimeSessionBrand]: true;
}>;

export interface BoundRuntimeRecordRef {
  record_id: string;
  record_version: number;
  content_digest: string;
}

export interface BoundRuntimeResource {
  resource_id: string;
  content_digest: string | null;
}

export interface RuntimeOperationClaims {
  capability_id: string;
  tenant_ref: string;
  principal_ref: string;
  workload_ref: string;
  project_ref: string;
  action: string;
  resources: readonly BoundRuntimeResource[];
  data_classes: readonly string[];
  policy_refs: readonly BoundRuntimeRecordRef[];
  capability_grant_ref: BoundRuntimeRecordRef;
  control_refs: readonly BoundRuntimeRecordRef[];
  resource_limits: ResourceLimits;
  issued_at: string;
  expires_at: string;
  revocation_checkpoint: { stream_id: string; sequence: number; head_digest: string };
  nonce: string;
  nonce_mode: "single_use";
  runtime_binding_digest: string;
  audit_target: { stream_id: string; data_class: string };
}

export interface RuntimeEffectRequest {
  interface_id: string;
  method: string;
  action: string;
  resources: readonly BoundRuntimeResource[];
  data_classes: readonly string[];
  requested_limits: ResourceLimits;
  runtime_binding_digest: string;
  effect_digest: string;
}

export interface RuntimeOperationVerifier {
  resolveAndClaim(operation: AuthorizedRuntimeOperation, effect: RuntimeEffectRequest): Promise<RuntimeOperationClaims>;
}
```

`descriptor.ts` declares `RuntimeDescriptor`, `RuntimeInterfaceBinding`, `RuntimeBinding`, and `RuntimeProfile`. Every supported interface entry contains `interface_id`, `interface_version`, `implementation_id`, `implementation_version`, `implementation_digest`, `semantics_digest`, and `conformance_receipt_ref`. Unsupported entries contain their exact failure code.

`event-store.ts` exports:

```ts
export interface AuthorizedAppendOnlyEventStore {
  append(command: AppendEventCommand, operation: AuthorizedRuntimeOperation): Promise<StoredEvent>;
  appendTransaction(transaction: AppendEventTransaction, operation: AuthorizedRuntimeOperation): Promise<EventTransactionReceipt>;
  readStream(query: EventStreamQuery, operation: AuthorizedRuntimeOperation): Promise<readonly StoredEvent[]>;
  getHead(streamId: string, operation: AuthorizedRuntimeOperation): Promise<StreamHead | null>;
  rebuild<T>(projector: Projector<T>, operation: AuthorizedRuntimeOperation): Promise<T>;
  exportCanonical(request: EventExportRequest, operation: AuthorizedRuntimeOperation): Promise<VerifiedBytes>;
  close(operation: AuthorizedRuntimeOperation): Promise<void>;
}

export interface RuntimeEventStoreFactory {
  open(binding: RuntimeBinding, operation: AuthorizedRuntimeOperation): Promise<AuthorizedAppendOnlyEventStore>;
}
```

`services.ts` exports the approved focused interfaces with these exact signatures:

```ts
export interface RuntimeJobRunner {
  start(job: GovernedJob, operation: AuthorizedRuntimeOperation): Promise<JobReceipt>;
  inspect(jobId: string, operation: AuthorizedRuntimeOperation): Promise<JobStatus>;
  cancel(jobId: string, reason: string, operation: AuthorizedRuntimeOperation): Promise<JobStatus>;
}

export interface RuntimeApprovalPause {
  pause(request: ApprovalPauseRequest, operation: AuthorizedRuntimeOperation): Promise<ApprovalPauseReceipt>;
  resolve(decision: ApprovalResolution, operation: AuthorizedRuntimeOperation): Promise<ApprovalPauseStatus>;
}

export interface RuntimeProgressPublisher {
  publish(event: ProgressEvent, operation: AuthorizedRuntimeOperation): Promise<void>;
}

export interface RuntimeExporter {
  exportSnapshot(request: ExportRequest, operation: AuthorizedRuntimeOperation): Promise<ExportReceipt>;
}

export interface RuntimeBlobStore {
  put(blob: AuthorizedBlob, operation: AuthorizedRuntimeOperation): Promise<BlobReceipt>;
  get(ref: BlobRef, operation: AuthorizedRuntimeOperation): Promise<VerifiedBlob>;
  expire(request: BlobExpiryRequest, operation: AuthorizedRuntimeOperation): Promise<BlobExpiryReceipt>;
}

export interface RuntimeScheduler {
  schedule(job: ScheduledGovernedJob, operation: AuthorizedRuntimeOperation): Promise<ScheduleReceipt>;
  inspect(scheduleId: string, operation: AuthorizedRuntimeOperation): Promise<ScheduleStatus>;
  cancel(scheduleId: string, reason: string, operation: AuthorizedRuntimeOperation): Promise<ScheduleStatus>;
}

export interface RuntimeIngress {
  authenticate(request: RuntimeIngressRequest): Promise<AuthenticatedRuntimeSession>;
  invoke(session: AuthenticatedRuntimeSession, request: SchemaValidatedRpcRequest, operation: AuthorizedRuntimeOperation): Promise<RpcReceipt>;
  subscribe(session: AuthenticatedRuntimeSession, request: AuthorizedSubscription, operation: AuthorizedRuntimeOperation): Promise<ReadonlyEventChannel>;
}

export interface RuntimeSecretResolver {
  resolve(ref: SecretRef, operation: AuthorizedRuntimeOperation): Promise<SecretLease>;
}

export interface RuntimeHealth {
  inspect(binding: RuntimeBinding, operation: AuthorizedRuntimeOperation): Promise<RuntimeHealthReport>;
}

export interface RuntimeCleanup {
  clean(request: CleanupRequest, operation: AuthorizedRuntimeOperation): Promise<CleanupReceipt>;
}
```

Define every request, receipt, and status named above as a closed readonly interface in the same file. Each carries `schema_version`, stable ID, project/binding reference, subject/input digest, lifecycle status, timestamps supplied by the injected clock, and its own receipt/content digest. `SecretLease` is the sole exception: it is an opaque non-record object whose enumerable fields never include secret bytes.

`replica.ts` exports `ReplicaArtifactManifest`, `ReplicaArtifactManifestEntry`, `ReplicaCheckpoint`, `ReplicaAck`, `EventBatch`, `SyncReceipt`, `SyncCursor`, `VerifiedEventBatch`, and:

```ts
export interface RuntimeSynchronizer {
  push(batch: EventBatch, operation: AuthorizedRuntimeOperation): Promise<SyncReceipt>;
  pull(cursor: SyncCursor, operation: AuthorizedRuntimeOperation): Promise<VerifiedEventBatch>;
  acknowledge(checkpoint: ReplicaCheckpoint, operation: AuthorizedRuntimeOperation): Promise<ReplicaAck>;
}
```

`detection.ts` exports `RuntimeDetectionEvidence`, `RuntimeDetectionReport`, `RuntimeProposalRecord`, and:

```ts
export interface RuntimeDetector {
  inspect(projectRoot: string): Promise<RuntimeDetectionReport>;
  propose(report: RuntimeDetectionReport, descriptors: readonly RuntimeDescriptor[]): Promise<RuntimeProposalRecord>;
}
```

`errors.ts` exports a closed `RuntimeErrorCode` union containing every runtime code from design section 16.

- [ ] **Step 5: Add the closed JSON schemas**

Every new record uses the existing base-record envelope where it represents durable state. Require exact digests with pattern `^[a-f0-9]{64}$`. Require sorted unique arrays where the TypeScript constructor canonicalizes them. The binding schema requires:

```text
binding_id
binding_version
project_id
status
proposal_ref and proposal_digest
decision_ref and decision_digest
descriptor_ref and descriptor_digest
integration_mode
canonical_replica
interface_bindings
consistency_model
transaction_boundary
idempotency_behavior
retry_behavior
ambiguous_outcome_behavior
identity_provider
authentication_provider
secret_resolver
data_locations
retention
encryption
telemetry
health_checks
cleanup
export
adapter_digests
conformance_receipts
issued_at
predecessor_binding_digest
```

Do not accept fields named only `supports_jobs`, `supports_sync`, or another capability boolean.

The proposal payload requires `detection_report_ref`, `detection_report_digest`, exact candidate descriptor refs/digests, availability, bindability, requirements, trade-offs, conflicts, unknowns, recommended runtime ID, and `authority_effect: "none"`. The binding-decision payload requires proposal ref/digest, selected descriptor ref/digest, canonical-replica selection, decision status, actor/principal/workload, rationale, decision time, authorization ref/digest, conformance receipt refs/digests, and applicable control refs/digests. It cannot omit authorization or synthesize it from the proposal.

- [ ] **Step 6: Run focused and workspace verification**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/schemas/test/schema-registry.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/runtime-sdk/test
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/runtime-local/test/smoke.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
```

Expected: all commands exit 0; the boundary checker reports 15 workspace packages; no Cloudflare or `agents` import exists.

- [ ] **Step 7: Commit the contract foundation**

```bash
git add package.json pnpm-lock.yaml tsconfig.json packages/governance/package.json packages/schemas packages/runtime-sdk packages/runtime-local
git commit -m "feat: add portable runtime contracts"
```

---

### Task 2: Enforce opaque runtime authority and remove direct event-store bypasses

**Files:**

- Create: `packages/runtime-local/src/paths.ts`
- Create: `packages/runtime-local/src/sqlite-ledger.ts`
- Create: `packages/runtime-local/src/operation-authority.ts`
- Create: `packages/runtime-local/src/authorized-event-store.ts`
- Create: `packages/runtime-local/test/operation-bypass.test.ts`
- Create: `packages/runtime-local/test/event-store-conformance.test.ts`
- Modify: `packages/runtime-local/src/index.ts`
- Modify: `packages/learning/package.json`
- Modify: `packages/learning/tsconfig.json`
- Modify: `packages/learning/src/feedback.ts`
- Modify: `packages/learning/test/feedback.test.ts`
- Modify: `packages/agent/package.json`
- Modify: `packages/agent/tsconfig.json`
- Modify: `packages/agent/src/decision-workflow.ts`
- Modify: `packages/agent/src/local-runtime.ts`
- Modify: `packages/agent/test/decision-workflow.test.ts`
- Modify: `scripts/check-package-boundaries.mjs`

**Interfaces:**

- Consumes: Task 1's `RuntimeOperationClaims`, `RuntimeEffectRequest`, `RuntimeOperationVerifier`, event-store interfaces, current governance authorization records, and the raw `SqliteEventStore` primitive.
- Produces: `LocalRuntimeOperationAuthority`, `LocalAuthorizedEventStoreFactory`, and authorized event-store use in learning and agent workflows.

- [ ] **Step 1: Write failing forgery, replay, currentness, and direct-import tests**

Create a test authority with a canonical authorization resolver and a revocation-checkpoint resolver. Assert denial for:

```text
unknown capability_ref
fabricated capability_digest
expired capability
revoked grant
unknown revocation currentness
wrong principal or workload
wrong project
wrong action
wrong resource ID or digest
undeclared data class
resource-limit excess
wrong runtime-binding digest
second nonce claim
unavailable audit append
```

The replay test is exact:

```ts
const operation = await authority.issue(validAuthorizationRef, validClaims);
await store.append(command, operation);
await expect(store.append(command, operation)).rejects.toThrow("runtime_operation_nonce_replayed");
```

Add a static boundary test that scans production imports and fails if `SqliteEventStore` appears outside `packages/runtime-local/src/` or `packages/memory/src/`.

- [ ] **Step 2: Run the tests and confirm the authorization boundary is absent**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/runtime-local/test/operation-bypass.test.ts packages/runtime-local/test/event-store-conformance.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
```

Expected: runtime-local tests fail because the authority and wrapper do not exist. The existing boundary script still passes because its new forbidden-edge rule is added with the production migration in Step 5.

- [ ] **Step 3: Implement the authoritative capability and nonce ledger**

`LocalRuntimeOperationAuthority` accepts only resolvers, a clock, and the local ledger. Its issuer resolves the authorization record by ID and digest; callers cannot pass an `allow` boolean.

```ts
export interface RuntimeAuthorizationResolver {
  resolve(ref: BoundRuntimeRecordRef): Promise<{
    disposition: "allow" | "deny" | "review";
    claims_digest: string;
    authorization_digest: string;
  }>;
  recheckCurrentness(claims: RuntimeOperationClaims): Promise<"current" | "revoked" | "unknown">;
}

export class LocalRuntimeOperationAuthority implements RuntimeOperationVerifier {
  issue(authorizationRef: BoundRuntimeRecordRef, claims: RuntimeOperationClaims): Promise<AuthorizedRuntimeOperation>;
  resolveAndClaim(operation: AuthorizedRuntimeOperation, effect: RuntimeEffectRequest): Promise<RuntimeOperationClaims>;
}
```

The SQLite ledger contains `runtime_capabilities`, `runtime_nonce_claims`, and `runtime_audit_attempts`. `resolveAndClaim()` performs one `BEGIN IMMEDIATE` transaction: load capability, compare its digest, recheck currentness, verify the complete effect, insert the unique nonce claim, append the minimized audit attempt, commit, and only then return claims. Any error rolls back the nonce and audit transaction and no adapter effect occurs.

`paths.ts` resolves only paths below the canonical real project root and rejects absolute, `..`, symlink-escaping, and NUL-containing paths.

- [ ] **Step 4: Implement the authorized event-store wrapper**

Every method builds a canonical `RuntimeEffectRequest` from its actual arguments, calls `resolveAndClaim()` immediately before touching the raw store, then executes exactly that method. The wrapper never exposes the underlying database or path.

Use distinct actions:

```text
runtime.event-store.open
runtime.event.append
runtime.event.transaction
runtime.event.read
runtime.event.head
runtime.event.project
runtime.event.export
runtime.event-store.close
```

The requested limits are calculated from actual canonical input bytes and requested record counts, never copied from the capability.

- [ ] **Step 5: Migrate production callers to the authorized interface**

Change `ContentDecisionInput` and `DecisionWorkflowInput` to receive:

```ts
store: AuthorizedAppendOnlyEventStore;
operation: AuthorizedRuntimeOperation;
```

Pass the operation to `store.append()`. Change the local agent to open the store through `LocalAuthorizedEventStoreFactory` and issue exact open, head, append, and close capabilities through the local authority. Tests use a fixture authorization resolver and one token per method.

Remove `@contentmd/memory` from learning and agent dependencies when no production source imports it. Add `@contentmd/runtime-sdk` to learning and `@contentmd/runtime-sdk` plus `@contentmd/runtime-local` to agent.

- [ ] **Step 6: Verify direct-import and retained decision behavior**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/runtime-local/test/operation-bypass.test.ts packages/runtime-local/test/event-store-conformance.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/learning/test/feedback.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/agent/test/decision-workflow.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-foundation.mjs
```

Expected: every command exits 0; forged and replayed operations cause no database change; the retained decision path still appends one event through the authorized wrapper.

- [ ] **Step 7: Commit the authority boundary**

```bash
git add packages/runtime-local packages/learning packages/agent scripts/check-package-boundaries.mjs
git commit -m "feat: enforce portable runtime authority"
```

---

### Task 3: Add idempotent events, canonical blobs, synchronization, and replica acknowledgement

**Files:**

- Modify: `packages/memory/src/event-store.ts`
- Modify: `packages/memory/src/sqlite-event-store.ts`
- Modify: `packages/memory/src/export.ts`
- Modify: `packages/memory/test/sqlite-event-store.test.ts`
- Create: `packages/runtime-local/src/blob-store.ts`
- Create: `packages/runtime-local/src/synchronizer.ts`
- Create: `packages/runtime-local/src/replica-coordinator.ts`
- Create: `packages/runtime-local/test/blob-store.test.ts`
- Create: `packages/runtime-local/test/replica-protocol.test.ts`
- Modify: `packages/runtime-local/src/index.ts`
- Create: `fixtures/runtime-traces/canonical-replica.jsonl`

**Interfaces:**

- Consumes: Task 2's operation authority and authorized event store.
- Produces: payload-digest events, atomic append transactions, `LocalBlobStore`, `LocalRuntimeSynchronizer`, and `CanonicalFirstReplicaCoordinator`.

- [ ] **Step 1: Write failing event-idempotency and atomic-transaction tests**

Replace the old unconditional duplicate-ID assertion with:

```ts
const first = await store.append(command);
const replay = await store.append(command);
expect(replay).toEqual(first);

await expect(store.append({ ...command, payload: { changed: true } }))
  .rejects.toThrow("event_id_digest_conflict");
```

Add tests that `payload_digest` equals `sha256Canonical(payload)`, a two-event transaction commits both events in order, and any invalid command rolls the whole transaction back.

- [ ] **Step 2: Write failing artifact-closure and pre-ack persistence tests**

Build a synthetic in-memory preview with one event referencing two blobs and one policy record. Assert:

```ts
expect(await syntheticHost.durableRecordCount()).toBe(0);
await expect(syntheticHost.persist(preview, null, operation))
  .rejects.toThrow("runtime_host_persistence_before_canonical_ack");
expect(await syntheticHost.durableRecordCount()).toBe(0);
```

Add cases for missing blob, forbidden export, corrupt bytes, incomplete recursion, manifest mismatch, canonical replica unavailable, gap, fork, conflict, acknowledgement replay, and host-loss restoration.

- [ ] **Step 3: Run the narrow tests and verify they fail**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/memory/test/sqlite-event-store.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/runtime-local/test/blob-store.test.ts packages/runtime-local/test/replica-protocol.test.ts
```

Expected: memory tests fail on the missing payload digest/idempotent behavior; runtime-local tests fail on missing blob and replica classes.

- [ ] **Step 4: Implement event payload digests and idempotent append**

Extend `StoredEvent` with `payload_digest`. Before insert, calculate the complete candidate event and digest. When an event ID exists:

1. load its complete canonical bytes;
2. return it only when every field and digest matches;
3. otherwise throw `event_id_digest_conflict:<event_id>`.

Add `getEvent(eventId)` and `appendTransaction({ transaction_id, commands })`. Implement the transaction with one `BEGIN IMMEDIATE`; do not call the public `append()` method from inside an open transaction. Export/import verifies payload, predecessor, event, and document digests.

For an existing database, add the nullable `payload_digest` column once and backfill it from canonical `payload_json` in one migration transaction. `payload_digest` remains a separately verified field; preserving it does not change the pre-existing event-digest preimage, which already contains the complete payload.

- [ ] **Step 5: Implement the content-addressed local blob store**

Store bytes at `.contentmd/runtime/blobs/sha256/<first-two-hex>/<digest>`. Write to a mode-`0600` temporary sibling, fsync it, independently rehash it, then atomically rename. Metadata records the blob ID, digest, bytes, media/schema type, data class, disposition, export permission, parents, retention, and receipt digest.

`put`, `get`, and `expire` each resolve and claim an exact operation. `expire` rejects any blob referenced by a current event, manifest, acknowledgement, approval, dataset, model artifact, or binding.

- [ ] **Step 6: Implement the complete manifest and canonical acknowledgement**

Use this exact entry shape:

```ts
export interface ReplicaArtifactManifestEntry {
  artifact_id: string;
  media_type: string;
  schema_id: string | null;
  sha256_digest: string;
  byte_count: number;
  disposition: "required" | "optional";
  export_permission: "permitted" | "forbidden";
  parent_refs: readonly string[];
  expected_receipt_class: string;
}
```

The coordinator traverses every parent/reference edge to closure, rejects a missing or repeated inconsistent definition, sorts entries by UTF-8 artifact ID, and freezes `manifest_digest`. For hosted-produced bytes, a required `forbidden` artifact blocks replication because the host cannot export its bytes to the adopter-controlled replica.

The canonical sequence is:

```text
push event batch and permitted artifacts
-> independently store and rehash every byte
-> append events idempotently
-> write monotonic checkpoint
-> issue per-entry receipts
-> acknowledge checkpoint plus manifest digest plus receipts
-> mint a committed-replica receipt accepted by replaceable host persistence
```

The synthetic host class stays inside `replica-protocol.test.ts`; production exports only the coordinator and portable interfaces.

- [ ] **Step 7: Add ordered outbox/inbox and conflict behavior**

`LocalRuntimeSynchronizer` maintains ordered outbox/inbox rows, content-addressed batch receipts, monotonic per-stream checkpoints, and resumption cursors. Reject a predecessor gap with `runtime_replica_gap_detected` and a divergent predecessor with `runtime_replica_fork_detected`. Concurrent semantic decisions or authority records create a conflict event; never select by last-write time.

Freeze the successful trace in `fixtures/runtime-traces/canonical-replica.jsonl`. It must contain only public synthetic metadata and digest-addressed payloads. Plan 4 will reuse this trace for adapter equivalence without changing it.

- [ ] **Step 8: Verify canonical restoration and retained memory behavior**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/memory/test
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/runtime-local/test/blob-store.test.ts packages/runtime-local/test/replica-protocol.test.ts packages/runtime-local/test/event-store-conformance.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-foundation.mjs
```

Expected: all commands exit 0; deleting the synthetic hosted replica and restoring it from canonical state reproduces the event, manifest, checkpoint, and receipt digests byte-for-byte.

- [ ] **Step 9: Commit canonical storage and replication**

```bash
git add packages/memory packages/runtime-local fixtures/runtime-traces/canonical-replica.jsonl
git commit -m "feat: add canonical-first runtime replication"
```

---

### Task 4: Implement local jobs, approval pauses, progress, and schedules

**Files:**

- Create: `packages/runtime-local/src/job-runner.ts`
- Create: `packages/runtime-local/src/approval-pause.ts`
- Create: `packages/runtime-local/src/progress-publisher.ts`
- Create: `packages/runtime-local/src/scheduler.ts`
- Create: `packages/runtime-local/test/workflow-services.test.ts`
- Create: `packages/runtime-local/src/runtime.ts`
- Modify: `packages/runtime-local/src/index.ts`

**Interfaces:**

- Consumes: operation authority, operational SQLite ledger, exact `GovernedJob`, approval, progress, and schedule contracts from the SDK.
- Produces: the four persistent local workflow capabilities claimed by the local descriptor.

- [ ] **Step 1: Write failing workflow-capability tests**

Test exact job transitions:

```text
queued -> running -> completed
queued -> cancelled
running -> approval_paused -> running -> completed
```

Also assert duplicate job IDs with different digests fail, cancellation requires a separate capability, an expired/revoked resolution leaves a pause unresolved, progress sequences are monotonic, and a cancelled schedule cannot be inspected as active.

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/runtime-local/test/workflow-services.test.ts
```

Expected: FAIL because the four services do not exist.

- [ ] **Step 3: Implement the governed job runner**

The runner accepts registered handler IDs supplied when `LocalRuntime` is created; it never evaluates code or a module path from a job record. Persist job input references and digests, not arbitrary callback closures. `start`, `inspect`, and `cancel` independently verify operations. A retry reuses the original attempt and resource ledger, and a job marked `remote_outcome_unknown` is never retried automatically.

- [ ] **Step 4: Implement approval pause and resolution**

Persist the pause subject ID/digest, requested actor/principal/workload, action, scope, grant/control bindings, expiry, attempt ledger, and resource budget. `resolve()` reruns governance and exact-subject checks. Rejection, timeout, changed subject, expired/revoked authority, or unknown currentness produces a terminal fail-closed status and no effect continuation.

- [ ] **Step 5: Implement ordered progress and scheduling**

Progress events use a unique `(operation_id, sequence)` and digest-link predecessors. The scheduler persists only a governed job reference, schedule expression/instant, timezone, next occurrence, status, and digest. It supports `schedule`, `inspect`, and `cancel`; this release starts no hidden background daemon. An explicit caller may inspect due schedules and start a separately authorized job.

- [ ] **Step 6: Verify the workflow capability slice**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/runtime-local/test/workflow-services.test.ts packages/runtime-local/test/operation-bypass.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
```

Expected: all commands exit 0; every state transition has an audit event and a replayed token changes no state.

- [ ] **Step 7: Commit workflow capabilities**

```bash
git add packages/runtime-local/src/job-runner.ts packages/runtime-local/src/approval-pause.ts packages/runtime-local/src/progress-publisher.ts packages/runtime-local/src/scheduler.ts packages/runtime-local/src/runtime.ts packages/runtime-local/src/index.ts packages/runtime-local/test/workflow-services.test.ts
git commit -m "feat: add local runtime workflow capabilities"
```

---

### Task 5: Implement local ingress, secrets, export, health, and cleanup

**Files:**

- Create: `packages/runtime-local/src/ingress.ts`
- Create: `packages/runtime-local/src/secret-resolver.ts`
- Create: `packages/runtime-local/src/exporter.ts`
- Create: `packages/runtime-local/src/health.ts`
- Create: `packages/runtime-local/src/cleanup.ts`
- Create: `packages/runtime-local/test/boundary-services.test.ts`
- Modify: `packages/runtime-local/src/runtime.ts`
- Modify: `packages/runtime-local/src/index.ts`

**Interfaces:**

- Consumes: SDK session, RPC, subscription, secret, export, health, cleanup, blob, event, and replica contracts.
- Produces: the remaining local capability implementations without creating a network server.

- [ ] **Step 1: Write failing local-boundary tests**

Assert:

- guessed or expired session references fail;
- a valid session without an operation capability cannot invoke or subscribe;
- malformed RPC payloads fail before handler execution;
- a session for one tenant/project cannot route another;
- a secret lease does not serialize its value;
- resolving an undeclared environment source fails;
- exports omit forbidden blobs and include every required receipt;
- health inspection does not expose paths, content, or secrets beyond permitted relative locators;
- cleanup cannot delete canonical events, approvals, bindings, acknowledgements, or referenced blobs.

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/runtime-local/test/boundary-services.test.ts
```

Expected: FAIL because ingress, resolver, exporter, health, and cleanup classes are absent.

- [ ] **Step 3: Implement local in-process ingress**

`authenticate()` resolves an exact local identity attestation and returns an opaque session reference stored in the authoritative ledger. `invoke()` validates the RPC schema before resolving its separately supplied operation. `subscribe()` returns a read-only async event channel scoped to the authorized project and resource. No HTTP listener or WebSocket dependency is introduced.

- [ ] **Step 4: Implement the named-environment secret resolver**

Accept only `SecretRef` records with resolver `runtime.local.environment`, an exact environment variable name, allowed adapter IDs, project, purpose, issue time, and expiry. Do not enumerate environment keys or read `.env` files. Return a lease object whose enumerable fields contain only lease ID, secret-ref ID, fingerprint, issue/expiry time, and resolver ID; the value is accessible only through a bounded callback and is zeroed from its `Uint8Array` after the callback returns.

- [ ] **Step 5: Implement verifiable exports**

Write a temporary mode-`0700` export directory, then atomically rename it to `.contentmd/runtime/exports/<export-id>`. Include canonical events, checkpoints, conflict records, artifact manifests, acknowledgements, permitted blobs, and a verification manifest containing each relative path, SHA-256 digest, and byte count. A required forbidden blob makes the export incomplete and fails; it is not silently omitted and labelled successful.

- [ ] **Step 6: Implement minimized health and conservative cleanup**

Health checks the Node boundary, SQLite integrity, canonical head continuity, blob rehash samples, outbox/inbox checkpoint state, and conformance receipt currentness. Cleanup removes only expired nonce, session, progress, completed-job, and cancelled-schedule operational rows explicitly authorized by the cleanup request. It reports retained canonical objects and reasons rather than deleting them.

- [ ] **Step 7: Verify the boundary capability slice**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/runtime-local/test/boundary-services.test.ts packages/runtime-local/test/operation-bypass.test.ts packages/runtime-local/test/replica-protocol.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
```

Expected: all commands exit 0; JSON-stringifying a secret lease reveals no secret bytes; cleanup leaves canonical digests unchanged.

- [ ] **Step 8: Commit local boundary capabilities**

```bash
git add packages/runtime-local/src/ingress.ts packages/runtime-local/src/secret-resolver.ts packages/runtime-local/src/exporter.ts packages/runtime-local/src/health.ts packages/runtime-local/src/cleanup.ts packages/runtime-local/src/runtime.ts packages/runtime-local/src/index.ts packages/runtime-local/test/boundary-services.test.ts
git commit -m "feat: add local runtime boundary capabilities"
```

---

### Task 6: Add read-only host detection and bounded runtime proposals

**Files:**

- Create: `packages/runtime-local/src/detector.ts`
- Create: `packages/runtime-local/test/detection.test.ts`
- Create: `fixtures/runtime-hosts/node-local/package.json`
- Create: `fixtures/runtime-hosts/cloudflare-candidate/package.json`
- Create: `fixtures/runtime-hosts/cloudflare-candidate/wrangler.jsonc`
- Create: `fixtures/runtime-hosts/conflicting/package.json`
- Modify: `packages/runtime-local/src/index.ts`

**Interfaces:**

- Consumes: SDK detection/proposal contracts and local descriptor/conformance receipt.
- Produces: `LocalRuntimeDetector.inspect()` and `LocalRuntimeDetector.propose()` with no host effect.

- [ ] **Step 1: Write failing no-write, no-network, no-secret-read tests**

Before and after `inspect()`, recursively hash the complete fixture tree and assert equality. Monkeypatch `fetch`, `node:http`, `node:https`, `node:net`, `node:tls`, and DNS connection functions to throw `contentmd_test_network_denied`.

Create a temporary `.env` with synthetic canary `CONTENTMD_DETECTION_MUST_NOT_READ=secret-canary-value`, deny read access to that exact path through an instrumented filesystem reader, and assert the report contains neither the variable name nor value.

Test these outcomes:

```text
node-local -> local sidecar supported and recommended
cloudflare-candidate -> Cloudflare evidence observed; adapter unavailable; local sidecar remains supported
conflicting engines/config -> runtime_detection_inconclusive with evidence and unknowns
repository config alone -> live_deployment_status unknown
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/runtime-local/test/detection.test.ts
```

Expected: FAIL because `LocalRuntimeDetector` does not exist.

- [ ] **Step 3: Implement the allowlisted evidence reader**

Read only:

```text
package.json name, engines, packageManager, dependency names, devDependency names, and script names
lockfile presence
known runtime/config filename presence
framework, database, queue, serverless, container, and agent package declarations
```

Do not read script values, `.env*`, credential/token/key/certificate files, user home configuration, Git credential files, or files outside the real project root. Configuration presence is evidence only; do not parse secrets or infer deployment.

Each evidence item contains a stable evidence ID, kind, relative locator, permitted digest or `null`, observation, confidence, conflict state, and `authority_effect: "none"`.

- [ ] **Step 4: Implement deterministic proposals**

Always include the local profile when the current Node runtime satisfies `>=24.14.0 <25`. Recommend embedded mode only when the project's declared Node range is compatible; otherwise recommend the local sidecar. For Cloudflare evidence, emit:

```ts
{
  runtime_id: "runtime.cloudflare-agents",
  availability: "adapter_unavailable_pending_plan_4",
  bindable: false,
  failure_code: "runtime_capability_unsupported",
}
```

Sort evidence, conflicts, unknowns, candidates, requirements, and trade-offs by stable IDs before calculating the proposal digest.

- [ ] **Step 5: Verify detection causes no external effect**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/runtime-local/test/detection.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
```

Expected: all commands exit 0; the full pre/post tree digest is unchanged; the network guard records zero attempts; the secret canary is absent from reports and errors.

- [ ] **Step 6: Commit detection and proposal logic**

```bash
git add packages/runtime-local/src/detector.ts packages/runtime-local/src/index.ts packages/runtime-local/test/detection.test.ts fixtures/runtime-hosts
git commit -m "feat: detect host runtime without side effects"
```

---

### Task 7: Add conformance-gated runtime binding and CLI commands

**Files:**

- Modify: `packages/runtime-local/src/runtime.ts`
- Create: `packages/runtime-local/test/conformance.test.ts`
- Create: `packages/agent/src/runtime-workflow.ts`
- Create: `packages/agent/test/runtime-workflow.test.ts`
- Modify: `packages/agent/src/index.ts`
- Create: `packages/cli/src/commands/runtime.ts`
- Create: `packages/cli/test/runtime.test.ts`
- Modify: `packages/cli/src/main.ts`
- Modify: `packages/cli/src/commands/shared.ts`
- Modify: `packages/cli/test/vertical-slice.test.ts`

**Interfaces:**

- Consumes: all local capabilities, detection/proposal records, canonical proposal and decision events, digest-rich authorization, and current conformance receipts.
- Produces: a complete `LocalRuntime`, independently verified binding workflow, and `contentmd runtime inspect|propose|bind`.

- [ ] **Step 1: Write the failing local conformance suite**

Use one frozen fixture trace per interface and assert the local descriptor's claimed semantics match observed receipts for:

```text
event persistence and transactions
blob retention and expiry refusal
jobs and cancellation
approval pause and resolution
progress ordering
scheduling
in-process ingress and sessions
secret leases
sync, checkpoints, and acknowledgements
export and restoration
health
cleanup
```

The receipt includes interface ID/version, implementation ID/version/digest, fixture-trace digest, passed check IDs, failed check IDs, Node version, issued time, and receipt digest. A local descriptor cannot claim an interface without a current passing receipt.

- [ ] **Step 2: Write failing binding workflow tests**

Test that binding fails for:

```text
proposal file missing, malformed, or digest-mismatched
proposal digest mismatch
decision missing from canonical events
decision digest mismatch
decision not current or not approved
decision subject not the exact proposal digest
authorization absent, expired, revoked, unknown, or over-scope
connection/data/memory/telemetry/mutation/release control absent when applicable
missing or failed conformance receipt
stale predecessor binding digest
Cloudflare/unavailable descriptor
independent readback mismatch
```

Test a successful local bind appends exactly one `runtime_binding_activated` event, reads it back, verifies its digest, and then atomically updates only `.contentmd/runtime/current-runtime-binding.json`.

- [ ] **Step 3: Write failing CLI tests**

Test exact commands:

```text
contentmd runtime inspect --root <path> --json
contentmd runtime propose --root <path> --json
contentmd runtime bind --root <path> --proposal <record-path> --decision <record-path> --json
```

`inspect` writes nothing. `propose` may write only its tool-owned record beneath `.contentmd/runtime/proposals/`; it creates no binding or authorization. `bind` never creates its own decision or repairs an invalid one.

- [ ] **Step 4: Run the focused tests and verify they fail**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/runtime-local/test/conformance.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/agent/test/runtime-workflow.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/cli/test/runtime.test.ts
```

Expected: FAIL because the composite runtime, workflow, and CLI command group do not exist.

- [ ] **Step 5: Assemble the complete local runtime**

`createLocalRuntime()` accepts the real project root, authorization/currentness resolvers, identity resolver, registered job/RPC handlers, clock, and exact local descriptor. It verifies Node before opening SQLite and returns focused capability objects through:

```ts
export interface RuntimeProfile {
  descriptor: RuntimeDescriptor;
  eventStore: RuntimeEventStoreFactory;
  jobs: RuntimeJobRunner;
  approvals: RuntimeApprovalPause;
  progress: RuntimeProgressPublisher;
  exporter: RuntimeExporter;
  blobs: RuntimeBlobStore;
  scheduler: RuntimeScheduler;
  ingress: RuntimeIngress;
  secrets: RuntimeSecretResolver;
  sync: RuntimeSynchronizer;
  health: RuntimeHealth;
  cleanup: RuntimeCleanup;
}
```

Test `assertSupportedSqliteRuntime("24.13.9")` and `assertSupportedSqliteRuntime("25.0.0")` fail, while `24.14.0` and a later 24.x minor pass.

- [ ] **Step 6: Implement the binding workflow**

Export:

```ts
export async function inspectRuntime(projectRoot: string): Promise<RuntimeDetectionReport>;
export async function proposeRuntime(projectRoot: string): Promise<RuntimeProposalRecord>;
export async function bindRuntime(input: {
  project_root: string;
  proposal_path: string;
  decision_path: string;
}): Promise<RuntimeBindingReceipt>;
```

`proposeRuntime()` persists a content-addressed proposal file under `.contentmd/runtime/proposals/` using atomic mode-`0600` write and returns its path/ref in the record. `bindRuntime()` validates that file and resolves the separately issued decision, authorization, controls, conformance receipts, and current binding from canonical storage. It creates separate operation capabilities for open, append, readback, projection write, and close. It appends only the binding event; it never creates its own proposal decision or authorization.

- [ ] **Step 7: Register the CLI and exact status mappings**

Register one `runtime` command group in `main.ts`. `runtime.ts` uses `withRoot()` and stable command IDs:

```text
runtime.inspect
runtime.propose
runtime.bind
```

Update `shared.ts` error classification:

```text
runtime_capability_unsupported -> unsupported_capability
runtime_binding_not_authorized -> denied_by_governance
runtime_detection_inconclusive -> blocked_by_evidence
runtime_canonical_commit_unavailable -> blocked_by_evidence
runtime_replica_acknowledgement_missing -> blocked_by_evidence
runtime_replica_fork_detected -> blocked_by_evidence
malformed proposal/decision/binding -> invalid_input
```

Do not add `--yes` or a flag that implies approval.

- [ ] **Step 8: Verify conformance, CLI behavior, and the retained vertical slice**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/runtime-local/test/conformance.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/agent/test/runtime-workflow.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/cli/test/runtime.test.ts packages/cli/test/vertical-slice.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-foundation.mjs
```

Expected: all commands exit 0. Runtime inspection changes no bytes. Cloudflare binding exits with code 23. Unauthorized local binding exits with code 21. A valid local binding exits 0 and readback matches its canonical digest.

- [ ] **Step 9: Commit conformance-gated binding**

```bash
git add packages/runtime-local packages/agent packages/cli
git commit -m "feat: bind conforming local runtime profiles"
```

---

### Task 8: Add independent portable-runtime verification and release evidence

**Files:**

- Create: `scripts/verify-portable-runtime.mjs`
- Create: `docs/verification/portable-runtime.md`
- Modify: `scripts/verify-foundation.mjs`
- Modify: `README.md`

**Interfaces:**

- Consumes: every preceding task, frozen runtime host fixtures, canonical-replica trace, and current lockfile.
- Produces: a cross-process verification receipt and an evidence-bounded release status for Portable Runtime 0.1.

- [ ] **Step 1: Write the independent verifier before updating documentation**

The verifier runs in fresh temporary directories and records a typed check for each requirement. It must independently:

1. verify Node is `>=24.14.0 <25`;
2. assert `process.execPath` resolves to `/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node` and satisfies `>=24.14.0 <25`, then, as the immediately following child process, run a clean `/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm install --frozen-lockfile --ignore-scripts --prefer-offline` from copied manifests;
3. assert `agents`, `wrangler`, and `@cloudflare/*` are absent from every dependency and import;
4. verify the two runtime packages and schema closure;
5. run the package-boundary checker;
6. activate a network-denial preload before detection tests;
7. compare complete fixture tree hashes before and after `runtime inspect`;
8. prove `.env` canary bytes were never read or emitted;
9. call every local capability with a forged operation and observe the expected denial with no state change;
10. replay a valid single-use token and observe denial;
11. run the canonical replica trace, force pre-ack host persistence, and observe denial;
12. remove the replaceable host copy and restore byte-identical digests from canonical state;
13. prove a Cloudflare candidate is detected but cannot bind;
14. bind the local profile with exact canonical proposal, decision, controls, authorization, and conformance receipts;
15. independently read back the binding event and projection;
16. export and reverify the complete permitted bundle;
17. run the retained foundation verifier; and
18. load `initial_portable_runtime_status` from `.superpowers/sdd/2026-08-20-contentmd-portable-runtime/progress.md`, compare it to final `git status --porcelain=v1 --untracked-files=all`, and fail with `portable_runtime_unexpected_workspace_mutation` when a final dirty path belongs to neither the initial baseline nor the Tasks 1–8 file inventory, or when a non-owned baseline path changed state.

Write its canonical JSON receipt to a temporary path during execution and print a one-line summary plus receipt JSON to stdout. It must not claim Cloudflare equivalence or production-host verification.

- [ ] **Step 2: Run the verifier and fix only implementation defects it exposes**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major, minor] = process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) { console.error(`unsupported_node_runtime:${process.versions.node}`); process.exit(1); }'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm install --frozen-lockfile --ignore-scripts --prefer-offline
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-foundation.mjs
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-portable-runtime.mjs --sdd-ledger .superpowers/sdd/2026-08-20-contentmd-portable-runtime/progress.md
```

Expected: all commands exit 0. The portable verifier reports zero failed checks and a non-zero check count. If a command fails, repair the responsible production or test file from Tasks 1–7, rerun its narrow test, then repeat this full sequence.

- [ ] **Step 3: Make the foundation verifier extension-safe**

`verify-foundation.mjs` currently asserts exactly 13 packages. Replace that assertion with an exact subset check for the original package names while continuing to validate every discovered package manifest and dependency. Its verification record remains a foundation claim; it must not count runtime tests as evidence for the earlier slice.

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-foundation.mjs
```

Expected: PASS with both runtime packages present and every original foundation check retained.

- [ ] **Step 4: Record bounded verification and update current status**

`docs/verification/portable-runtime.md` records:

```text
commit under test
Node and pnpm versions
commands and exit codes
check count and check IDs
fixture and trace digests
supported local interfaces
detection/no-effect evidence
authorization-bypass evidence
canonical-first replica evidence
binding/readback evidence
retained foundation result
explicit production Cloudflare exclusion
remaining limitations
```

Update README implementation status to state that the portable local runtime is verified against synthetic fixtures. Preserve the distinctions between designed, implemented, verified, production-live, and generally effective. Do not describe Cloudflare as implemented or the runtime as production-host verified.

- [ ] **Step 5: Run final diff and placeholder checks**

Run:

```bash
git diff --check
rg -n "TBD|TODO|implement later|fill in|runtime-cloudflare|from ['\"]agents['\"]|@cloudflare/" packages scripts README.md docs/verification/portable-runtime.md
git status --porcelain=v1 --untracked-files=all
```

Expected: `git diff --check` exits 0. The scan finds no placeholder or forbidden production package/import; documentation may mention the explicit Cloudflare exclusion but no runtime-cloudflare source path exists. Compare the final porcelain output against `initial_portable_runtime_status` in the SDD ledger and the complete file inventory declared by Tasks 1–8. A final dirty path is permitted only when it was present in the initial baseline or is a declared portable-runtime output. A pre-existing dirty path not owned by this plan must retain its baseline state. Any other addition or status change is an unexpected workspace mutation and blocks the release; do not require the worktree to contain only plan files or to be globally clean.

- [ ] **Step 6: Commit verified Portable Runtime 0.1**

```bash
git add README.md scripts/verify-foundation.mjs scripts/verify-portable-runtime.mjs docs/verification/portable-runtime.md
git commit -m "test: verify portable contentmd runtime"
```

---

## Plan Self-Review Checklist

Before execution handoff, verify these mappings:

| Approved requirement | Implementing task |
| --- | --- |
| Portable focused runtime interfaces | Task 1 |
| Opaque current authorization at every method | Task 2 |
| No raw database handle or production direct import | Task 2 |
| Event payload digest, transaction, and idempotency | Task 3 |
| Full transitive artifact closure and canonical acknowledgement | Task 3 |
| No durable hosted bytes before acknowledgement | Task 3 |
| Host loss restoration and conflict/fork handling | Task 3 |
| Local job, approval, progress, and schedule conformance | Task 4 |
| Local ingress, secret, export, health, and cleanup conformance | Task 5 |
| Read-only host detection and no automatic installation/deployment | Task 6 |
| Adaptation to existing stack evidence | Task 6 |
| Proposal plus separate decision plus exact controls | Task 7 |
| Binding only after conformance and independent readback | Task 7 |
| Local runtime complete without a hosted account | Tasks 3–7 |
| Cloudflare absent except detected unavailable candidate | Tasks 6 and 8 |
| Clean install, retained foundation, and independent verification | Task 8 |

Plan execution is complete only after all eight task commits exist and the final command sequence in Task 8 passes from the frozen lockfile under Node 24.14.x.
