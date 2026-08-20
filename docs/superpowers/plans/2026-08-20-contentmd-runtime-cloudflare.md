# content.md Cloudflare Runtime Adapter Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task by task. Use `superpowers:test-driven-development` for every behavior change and `superpowers:verification-before-completion` before any completion claim.

**Goal:** Implement an optional `@contentmd/runtime-cloudflare` adapter that preserves the portable runtime contracts on Cloudflare's local Workers emulator, without deploying, opening credentials, or making Cloudflare the sole copy of project memory, approvals, learning data, or promotion decisions.

**Architecture:** The portable SDK remains the authority boundary. An authenticated edge request is resolved before any Agent instance route, and each runtime effect independently resolves a current `AuthorizedRuntimeOperation`. One Agents SDK Agent instance holds only acknowledged, replaceable SQLite projections. Callable RPC, read-only WebSockets, Workflows, schedules, and MCP carry canonical references and digests; durable hosted state is written only after the adopter-controlled canonical replica acknowledges the complete transitive artifact closure. The same frozen trace runs against the local reference runtime and the Cloudflare emulator.

**Tech stack:** TypeScript 7, Node 24.14, pnpm 11.9, Vitest 4.1, Cloudflare Workers local emulator, `agents@0.21.0`, `wrangler@4.125.0`, Durable Object SQLite, Workflows, `@modelcontextprotocol/server@2.0.0`, and Zod 4.4.

---

## Execution admission and fixed boundaries

This plan is Plan 4 from `docs/superpowers/specs/2026-08-20-contentmd-live-intelligence-learning-design.md` section 20 and is sequenced by `docs/superpowers/plans/2026-08-20-contentmd-program-execution-order.md`. It may begin only after both conditions are true:

1. The exact Node 24 guard below passes, then `/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-portable-runtime.mjs` passes from a clean install and returns a canonical `contentmd.runtime-conformance-receipt` covering every interface claimed by the Cloudflare binding.
2. An adopter has separately approved the exact Cloudflare environment, account reference, project reference, runtime binding, Agent and Workflow binding names, identity policy, canonical replica, data location, retention, telemetry, export, cleanup, and secret references.

This plan therefore begins only after both the portable conformance receipt and the separate adopter approval exist and validate. Mutations to shared files such as `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, schema registries, root verifiers, and README are serialized through the program execution-order plan; no Cloudflare task may edit one concurrently with another plan.

The repository contains a synthetic approval record for local-emulator tests. That fixture proves validation logic only. It is not approval for any production account. A production approval record, account identifier, route, domain, credential, secret value, deployment, migration, or control-plane call is outside this plan.

The implementation must stop with `runtime_cloudflare_prerequisite_missing` before constructing an Agent namespace or Workflow binding when either admission condition is absent, stale, digest-mismatched, expired, revoked, or not scoped to the selected environment.

### Version lock verified 2026-08-20

Use exact versions:

```json
{
  "dependencies": {
    "@contentmd/core": "workspace:*",
    "@contentmd/governance": "workspace:*",
    "@contentmd/runtime-sdk": "workspace:*",
    "@modelcontextprotocol/client": "2.0.0",
    "@modelcontextprotocol/sdk": "1.30.0",
    "@modelcontextprotocol/server": "2.0.0",
    "agents": "0.21.0",
    "zod": "4.4.3"
  },
  "devDependencies": {
    "@cloudflare/vitest-pool-workers": "0.22.0",
    "@cloudflare/workers-types": "5.20260820.1",
    "wrangler": "4.125.0"
  }
}
```

Do not use a caret, tilde, tag, workspace catalog alias, or floating version for these packages. `wrangler@4.125.0` requires Node 22 or later; this repository invokes it only through the stricter root boundary `>=24.14.0 <25`.

### Node invocation boundary

The bundled runtime paths are normative for this implementation environment:

```text
Bundled Node 24: /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node
Fallback pnpm 11: /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm
```

Every package-manager, test, build, lint, Wrangler, or verifier command block begins with the version guard as its first executable command. Only after it exits 0 may that block access the package manager or another JavaScript entrypoint:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) process.exit(24)'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --version
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm --version
```

Expected: the boundary command exits 0, Node reports `v24.14.0` or a later 24.x release, and pnpm reports `11.9.0`. If the check exits 24, stop before package-manager access. Do not use PATH-resolved `node`, `pnpm`, `npx`, `wrangler`, `tsc`, or `vitest`; invoke the bundled Node, fallback pnpm, or the relevant JavaScript entrypoint under the bundled Node exactly as shown in this plan.

### Non-negotiable host rules

- Authentication precedes instance lookup or routing and runs again for HTTP, RPC, and WebSocket connection handling.
- Agent instance names are deterministic routing keys derived from authenticated tenant, project, shard, and approved instance policy. They never prove identity or authority.
- Direct client `setState` is rejected. Only server-side, schema-validated, operation-authorized methods can change acknowledged projections.
- Durable Object SQLite, Agent state, Workflow inputs/results, schedules, WebSocket buffers, and MCP state never hold a sole durable copy.
- Before canonical acknowledgement, content bytes are an `ephemeral_uncommitted_preview` and may exist only in a bounded response or transport buffer.
- No non-idempotent external effect is automatically retried after an ambiguous response. Record `remote_outcome_unknown` and fail closed.
- MCP uses the current stateless `createMcpHandler` path from `agents/mcp/server`. Do not use `McpAgent`, `createLegacyMcpHandler`, or legacy SSE.
- Missing browser `Origin` is not authentication. OAuth and exact tool scope remain mandatory.
- The highest status this plan may emit is `cloudflare_adapter_local_verified`. It may not emit `production_live_verified`.

### Current primary implementation references

- [Agents API](https://developers.cloudflare.com/agents/runtime/agents-api/)
- [Agent routing and authentication hooks](https://developers.cloudflare.com/agents/runtime/communication/routing/)
- [Callable methods](https://developers.cloudflare.com/agents/runtime/lifecycle/callable-methods/)
- [WebSockets](https://developers.cloudflare.com/agents/runtime/communication/websockets/)
- [Agent state and SQLite](https://developers.cloudflare.com/agents/runtime/lifecycle/state/)
- [Scheduled tasks](https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/)
- [Agents and Workflows](https://developers.cloudflare.com/agents/concepts/workflows/)
- [Human approval in Workflows](https://developers.cloudflare.com/agents/concepts/agentic-patterns/human-in-the-loop/)
- [Workflow retry and idempotency rules](https://developers.cloudflare.com/workflows/build/rules-of-workflows/)
- [Stateless MCP handler](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/)
- [MCP authorization](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/)

Recheck these pages and exact package versions on the day implementation starts. If an API or package has changed, stop and amend this plan before changing code.

---

### Task 1: Gate the adapter and create the emulator-only package

**Files:**

- Create: `packages/runtime-cloudflare/package.json`
- Create: `packages/runtime-cloudflare/tsconfig.json`
- Create: `packages/runtime-cloudflare/vitest.config.ts`
- Create: `packages/runtime-cloudflare/wrangler.test.jsonc`
- Create: `packages/runtime-cloudflare/src/env.ts`
- Create: `packages/runtime-cloudflare/src/adopter-gate.ts`
- Create: `packages/runtime-cloudflare/src/index.ts`
- Create: `packages/runtime-cloudflare/test/adopter-gate.test.ts`
- Create: `fixtures/runtime-cloudflare/adopter-approval.valid.json`
- Create: `fixtures/runtime-cloudflare/adopter-approval.expired.json`
- Modify: `packages/schemas/src/runtime-records.schema.json`
- Modify: `packages/schemas/src/schema-registry.ts`
- Modify: `packages/schemas/src/index.ts`
- Modify: `packages/schemas/test/schema-registry.test.ts`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `tsconfig.json`

**Interfaces:**

- Consumes: portable `RuntimeBinding`, `RuntimeConformanceReceipt`, digest and canonical record validators.
- Produces: a closed adopter-approval record, an admitted emulator configuration, and a package that cannot deploy.

- [ ] **Step 1: Write failing schema and gate tests**

Add tests that accept only this closed record:

```ts
export interface CloudflareAdopterApprovalRecord {
  schema_version: "1.0.0";
  record_type: "contentmd.cloudflare-adopter-approval";
  approval_id: string;
  tenant_ref: string;
  project_ref: string;
  environment_ref: string;
  cloudflare_account_ref: string;
  portable_conformance_receipt_ref: string;
  portable_conformance_receipt_digest: string;
  runtime_binding_ref: string;
  runtime_binding_digest: string;
  identity_policy_ref: string;
  identity_policy_digest: string;
  instance_policy: {
    workspace_shards: number;
    routing_version: "sha256-v1";
  };
  agent_binding_name: "CONTENTMD_AGENT";
  workflow_binding_name: "CONTENTMD_WORKFLOW";
  canonical_replica_ref: string;
  canonical_replica_digest: string;
  allowed_hostnames: readonly string[];
  allowed_origin_hostnames: readonly string[];
  data_location_ref: string;
  retention_control_ref: string;
  telemetry_control_ref: string;
  export_control_ref: string;
  cleanup_control_ref: string;
  secret_refs: readonly string[];
  issued_at: string;
  expires_at: string;
  status: "approved" | "revoked";
  content_digest: string;
}
```

Reject unknown properties, raw secret values, account tokens, wildcard hosts, wildcard origins, zero shards, stale receipt digests, mismatched project/runtime binding, expired approval, revoked approval, and an approval digest that does not match canonical bytes.

- [ ] **Step 2: Prove the tests fail before implementation**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) process.exit(24)'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/schemas/test/schema-registry.test.ts --reporter=dot
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --config packages/runtime-cloudflare/vitest.config.ts packages/runtime-cloudflare/test/adopter-gate.test.ts --reporter=dot
```

Expected: the schema test fails because the record is unregistered; the Cloudflare Vitest command fails because its package and config do not exist.

- [ ] **Step 3: Add exact package pins and local-only configuration**

Create the manifest using the version lock above. Add:

```json
{
  "scripts": {
    "build": "/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e \"const [major,minor]=process.versions.node.split('.').map(Number); if (major !== 24 || minor < 14) process.exit(24)\" && /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node ../../node_modules/typescript/bin/tsc -b tsconfig.json",
    "test": "/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e \"const [major,minor]=process.versions.node.split('.').map(Number); if (major !== 24 || minor < 14) process.exit(24)\" && /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node ../../node_modules/vitest/vitest.mjs run",
    "typecheck": "/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e \"const [major,minor]=process.versions.node.split('.').map(Number); if (major !== 24 || minor < 14) process.exit(24)\" && /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node ../../node_modules/typescript/bin/tsc -b tsconfig.json --pretty false",
    "cf:test": "/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e \"const [major,minor]=process.versions.node.split('.').map(Number); if (major !== 24 || minor < 14) process.exit(24)\" && /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node ../../node_modules/vitest/vitest.mjs run --config vitest.config.ts"
  }
}
```

Create `wrangler.test.jsonc` with name `contentmd-runtime-cloudflare-local`, main `src/worker.ts`, compatibility date `2026-08-20`, `nodejs_compat`, SQLite Durable Object class `ContentMdCloudflareAgent` bound as `CONTENTMD_AGENT`, migration tag `v1`, and Workflow class `ContentMdGovernedWorkflow` bound as `CONTENTMD_WORKFLOW`.

Do not create a root `wrangler.jsonc`, deploy script, route, domain, account ID, `.dev.vars`, secret command, or CI deployment job. Configure Vitest to load only `wrangler.test.jsonc` through `@cloudflare/vitest-pool-workers`.

- [ ] **Step 4: Implement the prerequisite gate**

Export:

```ts
export interface CloudflareAdapterAdmission {
  approval: CloudflareAdopterApprovalRecord;
  portable_receipt: RuntimeConformanceReceipt;
  binding: RuntimeBinding;
  checked_at: string;
}

export function assertCloudflareAdapterAdmission(input: {
  approval: unknown;
  portable_receipt: unknown;
  binding: unknown;
  now: string;
}): CloudflareAdapterAdmission;
```

Validate schema, digests, project, binding, claimed interfaces, issue/expiry, current approval status, canonical-replica identity, and exact binding names. Require the portable receipt to show zero failed checks and a passing check for every portable interface claimed by the Cloudflare descriptor.

- [ ] **Step 5: Run the narrow tests**

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) process.exit(24)'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm install --lockfile-only
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm install --frozen-lockfile
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/schemas/test/schema-registry.test.ts --reporter=dot
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --config packages/runtime-cloudflare/vitest.config.ts packages/runtime-cloudflare/test/adopter-gate.test.ts --reporter=dot
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b packages/runtime-cloudflare/tsconfig.json --pretty false
```

Expected: all commands exit 0; the lockfile contains the exact pinned versions; invalid approval and receipt cases fail before any binding lookup.

- [ ] **Step 6: Commit the admission boundary**

```bash
git add package.json pnpm-lock.yaml tsconfig.json packages/schemas packages/runtime-cloudflare/package.json packages/runtime-cloudflare/tsconfig.json packages/runtime-cloudflare/vitest.config.ts packages/runtime-cloudflare/wrangler.test.jsonc packages/runtime-cloudflare/src/env.ts packages/runtime-cloudflare/src/adopter-gate.ts packages/runtime-cloudflare/src/index.ts packages/runtime-cloudflare/test/adopter-gate.test.ts fixtures/runtime-cloudflare
git commit -m "feat: gate cloudflare runtime adapter"
```

---

### Task 2: Enforce auth-before-routing and acknowledged Agent projections

**Files:**

- Create: `packages/runtime-cloudflare/src/identity.ts`
- Create: `packages/runtime-cloudflare/src/agent-state.ts`
- Create: `packages/runtime-cloudflare/src/agent.ts`
- Create: `packages/runtime-cloudflare/src/worker.ts`
- Create: `packages/runtime-cloudflare/test/auth-routing.test.ts`
- Create: `packages/runtime-cloudflare/test/agent-state.test.ts`
- Modify: `packages/runtime-cloudflare/src/index.ts`

**Interfaces:**

- Implements: edge authentication, exact instance derivation, Agent connection reauthentication, and replaceable projection storage.
- Preserves: `AuthenticatedRuntimeSession` and `AuthorizedRuntimeOperation` as separate, independently verified capabilities.

- [ ] **Step 1: Write failing routing and state tests**

Cover:

1. unauthenticated request creates no Agent instance;
2. guessed instance name is ignored and denied;
3. authenticated tenant A cannot route to tenant B;
4. wrong project, workload, shard, binding digest, expired session, and revoked session fail;
5. instance derivation is stable for the same authenticated tuple and different across tuples;
6. direct client `setState` is rejected;
7. a server projection without a verified `ReplicaAck` is rejected;
8. acknowledged projection rows are restorable and disposable;
9. raw content, approval bodies, secret bytes, and model output never appear in Agent state or SQLite.

- [ ] **Step 2: Run the tests and observe the missing boundary**

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) process.exit(24)'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --config packages/runtime-cloudflare/vitest.config.ts packages/runtime-cloudflare/test/auth-routing.test.ts packages/runtime-cloudflare/test/agent-state.test.ts --reporter=dot
```

Expected: FAIL because identity derivation, Agent class, and worker routing do not exist.

- [ ] **Step 3: Implement identity without trusting route input**

Export:

```ts
export interface CloudflareIdentityClaims {
  tenant_ref: string;
  principal_ref: string;
  workload_ref: string;
  project_ref: string;
  session_ref: string;
  session_digest: string;
  runtime_binding_digest: string;
  expires_at: string;
  revocation_checkpoint_digest: string;
}

export interface CloudflareIdentityVerifier {
  authenticate(request: Request): Promise<AuthenticatedRuntimeSession>;
  resolve(session: AuthenticatedRuntimeSession): Promise<CloudflareIdentityClaims>;
}

export function deriveAgentInstanceName(input: {
  claims: CloudflareIdentityClaims;
  workspace_shard: number;
  policy: CloudflareAdopterApprovalRecord["instance_policy"];
}): string;
```

Hash a length-prefixed canonical encoding of tenant, project, shard, routing version, and binding digest with SHA-256. Prefix the lower-case result with `contentmd-v1-`. Do not include principal in the stable storage key; principal and workload are checked on every request.

- [ ] **Step 4: Authenticate before namespace lookup**

`worker.ts` must execute this order:

```text
parse bounded route
validate adapter admission
authenticate request
resolve current session claims
verify tenant/project/workload/binding scope
derive approved instance name
get Agent instance by derived name
forward the request with a non-forgeable verified-session context
```

No call to `getAgentByName`, `routeAgentRequest`, Durable Object namespace methods, or Workflow binding methods occurs before authentication and scope validation.

- [ ] **Step 5: Implement the acknowledged projection**

Use:

```ts
export interface CloudflareAgentProjectionState {
  schema_version: "1.0.0";
  project_ref: string;
  runtime_binding_digest: string;
  canonical_replica_ref: string;
  canonical_checkpoint_digest: string;
  replica_ack_digest: string;
  projection_digest: string;
  progress_cursor: string | null;
  status: "idle" | "running" | "approval_paused" | "blocked" | "complete";
}
```

`ContentMdCloudflareAgent extends Agent<Env, CloudflareAgentProjectionState>`. Its `validateStateChange` returns true only for SDK source `"server"` after the proposed state matches a verified current acknowledgement held in the same transaction context. All connection-originated changes fail.

Create explicit SQLite tables only for acknowledged event headers, projection rows, replica acknowledgements, operation attempt headers, and progress cursors. Store IDs, digests, sequence numbers, reason codes, and timestamps; never raw artifact bytes. Every transaction checks canonical acknowledgement first.

Use `onBeforeRequest` and `onBeforeConnect` as defense-in-depth reauthentication. `onConnect` resolves current claims again from the original request and closes with code 4001 or 4003 when authentication or scope is invalid.

- [ ] **Step 6: Run focused tests and commit**

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) process.exit(24)'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --config packages/runtime-cloudflare/vitest.config.ts packages/runtime-cloudflare/test/auth-routing.test.ts packages/runtime-cloudflare/test/agent-state.test.ts --reporter=dot
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b packages/runtime-cloudflare/tsconfig.json --pretty false
git add packages/runtime-cloudflare/src/identity.ts packages/runtime-cloudflare/src/agent-state.ts packages/runtime-cloudflare/src/agent.ts packages/runtime-cloudflare/src/worker.ts packages/runtime-cloudflare/src/index.ts packages/runtime-cloudflare/test/auth-routing.test.ts packages/runtime-cloudflare/test/agent-state.test.ts
git commit -m "feat: secure cloudflare agent identity and state"
```

Expected: tests pass; the routing spy proves no namespace lookup before auth; direct `setState` changes no bytes.

---

### Task 3: Add schema-validated callable RPC and read-only WebSockets

**Files:**

- Create: `packages/runtime-cloudflare/src/rpc.ts`
- Create: `packages/runtime-cloudflare/src/websocket.ts`
- Create: `packages/runtime-cloudflare/test/rpc.test.ts`
- Create: `packages/runtime-cloudflare/test/websocket.test.ts`
- Modify: `packages/runtime-cloudflare/src/agent.ts`
- Modify: `packages/runtime-cloudflare/src/index.ts`

**Interfaces:**

- Implements: `RuntimeIngress.invoke` through callable methods and `RuntimeIngress.subscribe` through read-only WebSockets.
- Exposes: closed wire schemas and stable receipts; it never trusts TypeScript annotations as runtime validation.

- [ ] **Step 1: Write failing RPC tests**

Test malformed JSON, unknown fields, oversized payload, unsupported schema version, unknown action, forged session, forged operation reference, resource mismatch, data-class mismatch, stale binding, reused single-use nonce, and unacknowledged subject. Assert zero handler calls and zero durable writes.

Test a valid call returns one `RpcReceipt` with the canonical input digest, capability reference, result reference, result digest, and stable reason code.

- [ ] **Step 2: Write failing WebSocket tests**

Test authentication at upgrade and again in `onConnect`, cross-project subscription denial, expired/revoked reconnect denial, cursor resume without duplication, bounded backpressure, and cancellation. Assert frames expose only:

```ts
export interface CloudflareProgressFrame {
  schema_version: "1.0.0";
  project_ref: string;
  job_ref: string;
  progress_cursor: string;
  sequence: number;
  status: string;
  reason_code: string | null;
  event_digest: string;
}
```

No frame contains content text, prompt text, evidence bodies, approval rationale, identity tokens, capability bytes, or secret values.

- [ ] **Step 3: Prove the tests fail**

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) process.exit(24)'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --config packages/runtime-cloudflare/vitest.config.ts packages/runtime-cloudflare/test/rpc.test.ts packages/runtime-cloudflare/test/websocket.test.ts --reporter=dot
```

Expected: FAIL because callable methods and progress channels are absent.

- [ ] **Step 4: Implement the wire registry and callable methods**

Export:

```ts
export interface CloudflareRpcEnvelope {
  schema_version: "1.0.0";
  session_ref: string;
  session_digest: string;
  capability_ref: string;
  capability_digest: string;
  method: string;
  input: unknown;
  input_digest: string;
}

export interface CloudflareRpcRegistry {
  invoke(envelope: unknown, request: Request): Promise<RpcReceipt>;
}
```

Each `@callable()` method accepts `unknown`, parses a closed Zod schema, recomputes the canonical input digest, resolves current session and operation objects from their references, calls `resolveAndClaim` immediately before the handler, and returns a portable receipt. Do not deserialize branded operation/session objects from the client.

- [ ] **Step 5: Implement resumable, read-only sockets**

Use WebSockets only for `RuntimeIngress.subscribe` and progress acknowledgements. Disable unnecessary Agents protocol messages with `shouldSendProtocolMessages` so internal identity, state, and MCP frames are not broadcast. Resolve a cursor against acknowledged SQLite headers; reject a gap, fork, stale cursor, or project mismatch. Close slow consumers after the declared frame/byte budget.

WebSocket messages from clients may contain only heartbeat, acknowledgement, and cancellation-request envelopes. A cancellation request still requires a fresh operation capability through the callable RPC path.

- [ ] **Step 6: Run focused tests and commit**

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) process.exit(24)'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --config packages/runtime-cloudflare/vitest.config.ts packages/runtime-cloudflare/test/rpc.test.ts packages/runtime-cloudflare/test/websocket.test.ts --reporter=dot
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b packages/runtime-cloudflare/tsconfig.json --pretty false
git add packages/runtime-cloudflare/src/rpc.ts packages/runtime-cloudflare/src/websocket.ts packages/runtime-cloudflare/src/agent.ts packages/runtime-cloudflare/src/index.ts packages/runtime-cloudflare/test/rpc.test.ts packages/runtime-cloudflare/test/websocket.test.ts
git commit -m "feat: add governed cloudflare rpc and progress"
```

Expected: all focused tests pass and malformed inputs cause no operation resolution, handler call, or storage mutation.

---

### Task 4: Map governed jobs and approval pauses to Workflows

**Files:**

- Create: `packages/runtime-cloudflare/src/workflow.ts`
- Create: `packages/runtime-cloudflare/src/attempt-ledger.ts`
- Create: `packages/runtime-cloudflare/test/workflow.test.ts`
- Create: `packages/runtime-cloudflare/test/workflow-retry.test.ts`
- Modify: `packages/runtime-cloudflare/src/agent.ts`
- Modify: `packages/runtime-cloudflare/src/index.ts`

**Interfaces:**

- Implements: `RuntimeJobRunner` and `RuntimeApprovalPause`.
- Preserves: canonical-first inputs/results, current governance after resume, bounded retry, cancellation, and explicit unknown outcome.

- [ ] **Step 1: Write failing lifecycle tests**

Cover start, inspect, cancel, pause, approve, reject, timeout, repeated approval, approval for the wrong subject, approval after subject change, post-approval revocation, changed controls, changed binding, exhausted resource budget, and cancelled resume. Assert only one terminal transition.

- [ ] **Step 2: Write failing retry tests**

Use a deterministic effect adapter and prove:

- a pure idempotent step may retry within the original attempt and resource ledgers;
- duplicate delivery with the same idempotency key emits no second effect;
- a changed payload under the same idempotency key fails;
- a failed non-idempotent call before dispatch may be retried only by a separately authorized new attempt;
- a timeout or connection loss after possible dispatch becomes `remote_outcome_unknown`;
- `remote_outcome_unknown` is terminal and never automatically retried.

- [ ] **Step 3: Run the tests and observe failure**

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) process.exit(24)'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --config packages/runtime-cloudflare/vitest.config.ts packages/runtime-cloudflare/test/workflow.test.ts packages/runtime-cloudflare/test/workflow-retry.test.ts --reporter=dot
```

Expected: FAIL because Workflow entrypoint and attempt ledger do not exist.

- [ ] **Step 4: Define reference-only workflow records**

```ts
export interface GovernedWorkflowInput {
  schema_version: "1.0.0";
  job_ref: string;
  job_digest: string;
  project_ref: string;
  runtime_binding_digest: string;
  capability_ref: string;
  capability_digest: string;
  subject_ref: string;
  subject_digest: string;
  replica_ack: ReplicaAck;
  attempt_ledger_ref: string;
  attempt_ledger_digest: string;
  resource_budget_digest: string;
}

export interface GovernedApprovalPayload {
  approval_ref: string;
  approval_digest: string;
  actor_ref: string;
  principal_ref: string;
  workload_ref: string;
  operation_ref: string;
  subject_ref: string;
  subject_digest: string;
  scope_digest: string;
  expires_at: string;
  grant_ref: string;
  controls_digest: string;
  attempt_ledger_digest: string;
  resource_budget_digest: string;
}
```

Reject raw content fields recursively. Verify `ReplicaAck` before creating a Workflow instance. Workflow input and step results contain only references, digests, compact status, and canonical acknowledgements.

- [ ] **Step 5: Implement Workflow pause and resume governance**

`ContentMdGovernedWorkflow` uses `step.waitForApproval("governance-approval", { timeout: "7 days" })` only after recording an acknowledged pause reference. The Agent's approve/reject callable methods validate actor and scope before forwarding a decision.

Immediately after resume and again before the effect:

1. reload the canonical subject and verify its digest;
2. resolve current grant, controls, binding, actor, principal, and workload;
3. claim the operation nonce or authorized idempotency attempt;
4. reload attempt and resource ledgers;
5. verify cancellation and deadline;
6. dispatch only if every value still matches.

Return an acknowledged canonical result reference from every durable Workflow step. Do not return generated text or artifact bytes into Workflow persistence.

- [ ] **Step 6: Implement retry and unknown-outcome controls**

`AttemptLedger` records attempt number, idempotency key, effect digest, dispatch state, budget consumption, and terminal reason. Pure steps use bounded Workflow retry. External effects use the provider's declared idempotency behavior from `RuntimeBinding`. If dispatch may have occurred and remote outcome cannot be proven, persist only an acknowledged `remote_outcome_unknown` event and stop.

- [ ] **Step 7: Run focused tests and commit**

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) process.exit(24)'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --config packages/runtime-cloudflare/vitest.config.ts packages/runtime-cloudflare/test/workflow.test.ts packages/runtime-cloudflare/test/workflow-retry.test.ts --reporter=dot
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b packages/runtime-cloudflare/tsconfig.json --pretty false
git add packages/runtime-cloudflare/src/workflow.ts packages/runtime-cloudflare/src/attempt-ledger.ts packages/runtime-cloudflare/src/agent.ts packages/runtime-cloudflare/src/index.ts packages/runtime-cloudflare/test/workflow.test.ts packages/runtime-cloudflare/test/workflow-retry.test.ts
git commit -m "feat: add governed cloudflare workflows"
```

Expected: all tests pass; replay, revocation, timeout, cancellation, and ambiguous effect cases fail closed without duplicate effects.

---

### Task 5: Add schedules and remaining portable runtime services

**Files:**

- Create: `packages/runtime-cloudflare/src/scheduler.ts`
- Create: `packages/runtime-cloudflare/src/services.ts`
- Create: `packages/runtime-cloudflare/test/scheduler.test.ts`
- Create: `packages/runtime-cloudflare/test/services.test.ts`
- Modify: `packages/runtime-cloudflare/src/agent.ts`
- Modify: `packages/runtime-cloudflare/src/index.ts`

**Interfaces:**

- Implements: `RuntimeScheduler`, `RuntimeProgressPublisher`, `RuntimeSecretResolver`, `RuntimeHealth`, and `RuntimeCleanup`.
- Leaves blob storage and event authority canonical; Cloudflare stores only acknowledged headers and projections.

- [ ] **Step 1: Write failing schedule tests**

Test exact-time and interval schedules, registered callback allowlist, invalid callback, duplicate schedule, inspect, cancel, late alarm, stale binding, revoked grant, changed subject, exhausted budget, and disabled environment. A wake-up must rerun governance and may not inherit authority from schedule creation.

- [ ] **Step 2: Write failing service tests**

Test:

- progress publication requires current operation scope and acknowledged event digest;
- secret resolution accepts only an approval-listed Env binding reference;
- `SecretLease` cannot serialize, enumerate, log, persist, or cross a Workflow/RPC boundary;
- health returns interface/version/digest/checkpoint status without environment secrets;
- cleanup removes replaceable projections only after export/retention controls and canonical verification;
- cleanup cannot delete canonical records, approvals, or learning data.

- [ ] **Step 3: Prove the tests fail**

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) process.exit(24)'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --config packages/runtime-cloudflare/vitest.config.ts packages/runtime-cloudflare/test/scheduler.test.ts packages/runtime-cloudflare/test/services.test.ts --reporter=dot
```

Expected: FAIL because schedule and boundary services are absent.

- [ ] **Step 4: Implement an allowlisted scheduler**

Export:

```ts
export type CloudflareScheduledMethod = "runFreshnessCheck" | "runDriftCheck";

export interface CloudflareScheduleEnvelope {
  schema_version: "1.0.0";
  schedule_ref: string;
  schedule_digest: string;
  method: CloudflareScheduledMethod;
  project_ref: string;
  subject_ref: string;
  subject_digest: string;
  runtime_binding_digest: string;
  capability_ref: string;
  replica_ack_digest: string;
}
```

Map portable scheduling to Agent scheduling with a static method registry. Do not accept an arbitrary method string, module path, URL, or code. On wake-up, reconstruct no authority from payload bytes; resolve current canonical records and a fresh operation capability before any read or effect.

- [ ] **Step 5: Implement bounded services**

`CloudflareSecretResolver` maps an approved `SecretRef` to one exact Env binding. Its returned lease exposes a callback that uses the secret in memory and clears its reference afterward; it has no `toJSON` path and throws on structured clone.

Progress writes an acknowledged header then fans out a minimized frame. Health compares binding, schema migrations, acknowledgement checkpoint, Workflow availability, and schedule registry. Cleanup marks and deletes only reconstructible Agent rows after a verified export receipt; it never calls canonical deletion.

- [ ] **Step 6: Run focused tests and commit**

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) process.exit(24)'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --config packages/runtime-cloudflare/vitest.config.ts packages/runtime-cloudflare/test/scheduler.test.ts packages/runtime-cloudflare/test/services.test.ts --reporter=dot
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b packages/runtime-cloudflare/tsconfig.json --pretty false
git add packages/runtime-cloudflare/src/scheduler.ts packages/runtime-cloudflare/src/services.ts packages/runtime-cloudflare/src/agent.ts packages/runtime-cloudflare/src/index.ts packages/runtime-cloudflare/test/scheduler.test.ts packages/runtime-cloudflare/test/services.test.ts
git commit -m "feat: complete cloudflare runtime services"
```

Expected: tests pass; schedule execution has a fresh authority check and service output contains no secret bytes.

---

### Task 6: Add governed MCP client interoperability and a stateless MCP server

**Files:**

- Create: `packages/runtime-cloudflare/src/mcp-client.ts`
- Create: `packages/runtime-cloudflare/src/mcp-server.ts`
- Create: `packages/runtime-cloudflare/test/mcp-client.test.ts`
- Create: `packages/runtime-cloudflare/test/mcp-server.test.ts`
- Modify: `packages/runtime-cloudflare/src/worker.ts`
- Modify: `packages/runtime-cloudflare/src/index.ts`
- Modify: `scripts/check-package-boundaries.mjs`

**Interfaces:**

- Produces: governed outbound MCP calls and a stateless inbound `/mcp` handler.
- Requires: OAuth authentication, exact client/tool scopes, Host and Origin allowlists, runtime operation verification, and canonical-first results.

- [ ] **Step 1: Write failing server-security tests**

Cover missing OAuth, invalid token, wrong audience, expired/revoked token, missing tool scope, wrong client, disallowed Host, disallowed Origin, absent Origin, malformed JSON-RPC, legacy protocol request, unknown tool, over-limit input, forged operation, and cross-project subject.

The absent-Origin case may continue only after OAuth and all non-browser policy checks pass. It never gains trust because Origin is absent.

- [ ] **Step 2: Write failing client-governance tests**

Prove outbound calls require approved endpoint reference, server identity, tool name, exact input digest, data classes, egress control, operation capability, resource budget, and idempotency rule. Reject redirect, endpoint drift, unexpected tool schema, unapproved data, and ambiguous non-idempotent retry.

- [ ] **Step 3: Run tests and observe failure**

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) process.exit(24)'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --config packages/runtime-cloudflare/vitest.config.ts packages/runtime-cloudflare/test/mcp-client.test.ts packages/runtime-cloudflare/test/mcp-server.test.ts --reporter=dot
```

Expected: FAIL because neither MCP boundary exists.

- [ ] **Step 4: Implement the stateless server path**

Import `createMcpHandler` from `agents/mcp/server` and create a fresh MCP server per request:

```ts
export function createGovernedMcpHandler(input: {
  authenticateOAuth(request: Request): Promise<McpPrincipal>;
  allowedHostnames: readonly string[];
  allowedOriginHostnames: readonly string[];
  tools: GovernedMcpToolRegistry;
}): (request: Request, env: Env, ctx: ExecutionContext) => Promise<Response>;
```

Configure route `/mcp`, `corsOptions: false`, exact allowed hostnames and origin hostnames, `legacy: "reject"`, and JSON response mode. Authenticate OAuth before invoking the handler. Each tool parses a closed schema and resolves a matching current operation immediately before execution.

The boundary checker must fail production imports of `McpAgent`, `createLegacyMcpHandler`, `serveSSE`, or a server import other than `agents/mcp/server`.

- [ ] **Step 5: Implement the governed client**

Use `@modelcontextprotocol/client` for the current client path. Wrap discovery and tool calls in:

```ts
export interface GovernedMcpClient {
  listTools(request: GovernedMcpDiscovery, operation: AuthorizedRuntimeOperation): Promise<GovernedMcpToolList>;
  callTool(request: GovernedMcpCall, operation: AuthorizedRuntimeOperation): Promise<GovernedMcpReceipt>;
}
```

Verify server and schema digests before use. Canonicalize and digest tool inputs. Apply egress and budget controls. Commit the complete permitted result closure to the canonical replica before storing any hosted result reference. Treat an ambiguous non-idempotent outcome as terminal.

- [ ] **Step 6: Run security tests and commit**

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) process.exit(24)'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --config packages/runtime-cloudflare/vitest.config.ts packages/runtime-cloudflare/test/mcp-client.test.ts packages/runtime-cloudflare/test/mcp-server.test.ts --reporter=dot
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b packages/runtime-cloudflare/tsconfig.json --pretty false
git add packages/runtime-cloudflare/src/mcp-client.ts packages/runtime-cloudflare/src/mcp-server.ts packages/runtime-cloudflare/src/worker.ts packages/runtime-cloudflare/src/index.ts packages/runtime-cloudflare/test/mcp-client.test.ts packages/runtime-cloudflare/test/mcp-server.test.ts scripts/check-package-boundaries.mjs
git commit -m "feat: add governed cloudflare mcp boundaries"
```

Expected: all commands exit 0; unauthenticated and over-scope requests invoke no tool; the legacy path scan is empty.

---

### Task 7: Enforce canonical-first synchronization, export, restoration, and equivalence

**Files:**

- Create: `packages/runtime-cloudflare/src/replica.ts`
- Create: `packages/runtime-cloudflare/src/exporter.ts`
- Create: `packages/runtime-cloudflare/src/runtime.ts`
- Create: `packages/runtime-cloudflare/test/canonical-first.test.ts`
- Create: `packages/runtime-cloudflare/test/export-restore.test.ts`
- Create: `packages/runtime-cloudflare/test/local-equivalence.test.ts`
- Create: `fixtures/runtime-cloudflare/equivalence-trace.jsonl`
- Modify: `packages/runtime-cloudflare/src/agent.ts`
- Modify: `packages/runtime-cloudflare/src/index.ts`

**Interfaces:**

- Implements: `RuntimeSynchronizer`, `RuntimeExporter`, `RuntimeBlobStore`, `RuntimeEventStoreFactory`, and the complete `RuntimeProfile`.
- Produces: canonical acknowledgement before hosted persistence, complete export receipts, host-loss restoration, and local/Cloudflare trace equivalence.

- [ ] **Step 1: Write the failing pre-ack persistence matrix**

For each host surface—Agent state, Agent SQLite, Workflow input, Workflow step result, schedule payload, progress buffer, RPC result cache, WebSocket replay row, MCP client cache, and MCP server session state—force a write before canonical acknowledgement.

Expected for every case:

```text
error code: runtime_host_persistence_before_canonical_ack
host durable row delta: 0
canonical event delta: 0
authority delta: 0
preview disposition: ephemeral_uncommitted_preview
```

Also test unavailable replica, missing artifact, forbidden export, corrupt blob, digest mismatch, incomplete manifest traversal, checkpoint gap, fork, and acknowledgement replay with different bytes.

- [ ] **Step 2: Write failing export and restoration tests**

Export must include permitted events, event payloads, artifact manifests, blobs, checkpoints, acknowledgements, conflicts, projections, binding, schema manifest, and verification manifest. A forbidden blob remains an explicit non-exportable entry and causes restoration to fail if required for interpretation.

Delete all replaceable Agent state in the emulator, restore from canonical export, and assert byte-identical event IDs, sequence, predecessor digests, payload digests, manifests, checkpoints, projection digest, and binding digest.

- [ ] **Step 3: Freeze one shared equivalence trace**

`equivalence-trace.jsonl` contains exact commands and expected receipts for:

1. admission;
2. identity and authorization;
3. idempotent ordered append;
4. canonical closure acknowledgement;
5. RPC;
6. progress and reconnect;
7. approval pause and resume;
8. retry and duplicate delivery;
9. cancellation;
10. schedule wake;
11. export;
12. rollback;
13. host-loss restoration.

Run the unchanged trace through `createLocalRuntime()` and `createCloudflareRuntime()`. Normalize only declared host transport fields. Compare record identity, digest, ordering, authorization result, approval status, attempt ledger, cancellation, export manifest, reconnect cursor, rollback target, and restored projection.

- [ ] **Step 4: Run tests and observe failure**

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) process.exit(24)'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --config packages/runtime-cloudflare/vitest.config.ts packages/runtime-cloudflare/test/canonical-first.test.ts packages/runtime-cloudflare/test/export-restore.test.ts packages/runtime-cloudflare/test/local-equivalence.test.ts --reporter=dot
```

Expected: FAIL because the canonical coordinator and complete runtime are absent.

- [ ] **Step 5: Implement the canonical replica port**

```ts
export interface CanonicalReplicaBinding {
  commitClosure(request: CanonicalCommitRequest): Promise<ReplicaAck>;
  readBatch(request: CanonicalReadRequest): Promise<VerifiedEventBatch>;
  exportBundle(request: CanonicalExportRequest): Promise<VerifiedBytes>;
  verifyAck(ack: ReplicaAck): Promise<ReplicaAck>;
}

export interface CloudflarePersistencePermit {
  event_ref: string;
  event_digest: string;
  artifact_manifest_digest: string;
  checkpoint_digest: string;
  replica_ack_digest: string;
  runtime_binding_digest: string;
}
```

The binding is an approved adopter-controlled service boundary, not Cloudflare state authority. Before any host write, traverse the full `ReplicaArtifactManifest`, commit every permitted byte, require independently rehashed per-entry receipts, verify the returned acknowledgement, and issue a one-effect persistence permit. Consume that permit atomically with the host write. Do not cache unused permits.

`RuntimeBlobStore.put` commits to canonical storage and stores only an acknowledged blob header in SQLite. `get` reads and verifies canonical bytes. `expire` changes hosted cache eligibility only; canonical retention follows its own authorized control.

- [ ] **Step 6: Assemble the runtime profile**

```ts
export function createCloudflareRuntime(input: {
  admission: CloudflareAdapterAdmission;
  env: Env;
  identity: CloudflareIdentityVerifier;
  operation_verifier: RuntimeOperationVerifier;
  canonical_replica: CanonicalReplicaBinding;
  clock: RuntimeClock;
}): RuntimeProfile;
```

Implement every focused portable interface. Unsupported methods fail with `runtime_capability_unsupported` and may not silently fall back. Bind interface versions, implementation digests, semantics digests, and the portable receipt into the Cloudflare descriptor.

- [ ] **Step 7: Run equivalence and commit**

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) process.exit(24)'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --config packages/runtime-cloudflare/vitest.config.ts packages/runtime-cloudflare/test/canonical-first.test.ts packages/runtime-cloudflare/test/export-restore.test.ts packages/runtime-cloudflare/test/local-equivalence.test.ts --reporter=dot
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/runtime-local/test --reporter=dot
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b packages/runtime-cloudflare/tsconfig.json --pretty false
git add packages/runtime-cloudflare/src/replica.ts packages/runtime-cloudflare/src/exporter.ts packages/runtime-cloudflare/src/runtime.ts packages/runtime-cloudflare/src/agent.ts packages/runtime-cloudflare/src/index.ts packages/runtime-cloudflare/test/canonical-first.test.ts packages/runtime-cloudflare/test/export-restore.test.ts packages/runtime-cloudflare/test/local-equivalence.test.ts fixtures/runtime-cloudflare/equivalence-trace.jsonl
git commit -m "feat: enforce canonical cloudflare runtime equivalence"
```

Expected: both adapters produce equivalent canonical records and governance outcomes; host deletion followed by restore is byte-identical.

---

### Task 8: Independently verify the emulator adapter and record the bounded status

**Files:**

- Create: `scripts/verify-runtime-cloudflare.mjs`
- Create: `docs/verification/runtime-cloudflare.md`
- Modify: `scripts/verify-foundation.mjs`
- Modify: `scripts/verify-portable-runtime.mjs`
- Modify: `README.md`
- Modify: `package.json`

**Interfaces:**

- Consumes: clean lockfile install, portable conformance receipt, synthetic adopter approval, Workers emulator, frozen equivalence trace, and all retained verifiers.
- Produces: an independent canonical receipt with status `cloudflare_adapter_local_verified` only.

- [ ] **Step 1: Write the independent verifier before status documentation**

`verify-runtime-cloudflare.mjs` must use fresh temporary directories and independently:

1. spawn `/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) process.exit(24)'` as its first child process and stop on any non-zero result;
2. only after that guard succeeds, run `/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm install --frozen-lockfile --ignore-scripts` from copied manifests;
3. run the retained foundation and portable verifiers;
4. validate the portable receipt digest and every claimed interface check;
5. validate the synthetic adopter approval and prove expired/revoked/mismatched fixtures stop before binding lookup;
6. assert exact package versions from the lockfile;
7. assert no root deployment configuration, route, domain, account ID, credential, or deployment script exists;
8. start only the local Workers test pool;
9. prove authentication precedes instance routing and connection reauthentication occurs;
10. prove guessed instance, cross-tenant, direct `setState`, malformed RPC, and unauthorized subscription fail without mutation;
11. run Workflow approval, replay, revocation, timeout, cancellation, duplicate-effect, and unknown-outcome cases;
12. run schedule and governed MCP cases;
13. force the complete pre-ack persistence matrix;
14. execute export, host loss, restoration, reconnect, rollback, and shared local-equivalence trace;
15. scan emulator storage and logs for fixture canaries representing raw content, OAuth tokens, capability bytes, and secret values;
16. rerun package boundaries, build, typecheck, and all tests; and
17. write a canonical JSON receipt with command, version, fixture digest, check ID, status, and evidence digest for every check.

Every verifier subprocess must use the full bundled Node or fallback-pnpm path rather than PATH resolution. The verifier must disable external network access except in-process emulator traffic. It must not invoke `wrangler deploy`, `wrangler login`, `wrangler secret`, a Cloudflare API, or DNS.

- [ ] **Step 2: Add root command and make retained verifiers extension-safe**

Add:

```json
{
  "scripts": {
    "verify:runtime:cloudflare": "/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e \"const [major,minor]=process.versions.node.split('.').map(Number); if (major !== 24 || minor < 14) process.exit(24)\" && /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-runtime-cloudflare.mjs"
  }
}
```

Retained verifiers must check their original package subsets and all discovered manifests without treating the optional package as prior-slice evidence. The portable verifier changes its Cloudflare disposition from `adapter_unavailable_pending_plan_4` only when given this verifier's passing receipt; its local conformance result remains independently valid without Cloudflare.

- [ ] **Step 3: Run the complete verification sequence**

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major !== 24 || minor < 14) process.exit(24)'
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm install --frozen-lockfile
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/wrangler/bin/wrangler.js --version
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --reporter=dot
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --config packages/runtime-cloudflare/vitest.config.ts --reporter=dot
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-foundation.mjs
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-portable-runtime.mjs
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-runtime-cloudflare.mjs
```

Expected: all commands exit 0. The Cloudflare verifier reports zero failed checks, the exact pinned package versions, a non-zero check count, and `cloudflare_adapter_local_verified`. No command requests authentication or contacts a Cloudflare control plane.

- [ ] **Step 4: Record evidence without overstating readiness**

`docs/verification/runtime-cloudflare.md` records:

```text
commit under test
Node and pnpm versions
exact Cloudflare and MCP package versions
portable receipt reference and digest
synthetic adopter approval reference and digest
commands and exit codes
check IDs and evidence digests
auth-before-routing results
Agent SQLite and setState results
RPC and WebSocket results
Workflow approval and retry results
schedule results
MCP auth and governance results
canonical-first matrix results
export and restoration results
local-equivalence trace digest and result
retained verifier results
no-deployment and no-credential evidence
remaining production-adopter and live-control-plane limitations
status cloudflare_adapter_local_verified
```

Update README with that exact bounded status. State that production activation still requires a real, separately approved adopter environment, production authentication integration, live control-plane verification, data-location verification, observability review, and a deployment-specific plan.

- [ ] **Step 5: Run final diff, security, and scope checks**

```bash
git diff --check
rg -n '"(agents|wrangler|@cloudflare/vitest-pool-workers|@cloudflare/workers-types|@modelcontextprotocol/server|zod)": "[\^~]|wrangler (deploy|login|secret)|account_id|routes?":' package.json packages/runtime-cloudflare pnpm-lock.yaml scripts README.md docs/verification/runtime-cloudflare.md
rg -n 'McpAgent|createLegacyMcpHandler|serveSSE|from "agents/mcp"' packages/runtime-cloudflare/src scripts/check-package-boundaries.mjs
git status --short
```

Expected: `git diff --check` exits 0. The first scan finds no floating version, deploy/login/secret command, account ID, or route. The second scan finds only boundary-test forbidden-symbol literals and no production import. Status contains only files assigned by Tasks 1–8 plus pre-existing user changes.

- [ ] **Step 6: Commit bounded verification evidence**

```bash
git add package.json README.md scripts/verify-foundation.mjs scripts/verify-portable-runtime.mjs scripts/verify-runtime-cloudflare.mjs docs/verification/runtime-cloudflare.md
git commit -m "test: verify cloudflare runtime locally"
```

---

## Dependency and execution order

Tasks are intentionally sequential:

```text
Portable Runtime 0.1 passing receipt
  -> separate adopter-environment approval
  -> Task 1 admission and exact pins
  -> Task 2 identity, routing, and acknowledged state
  -> Task 3 callable RPC and WebSockets
  -> Task 4 Workflows and human approval
  -> Task 5 schedules and services
  -> Task 6 governed MCP
  -> Task 7 canonical-first equivalence
  -> Task 8 independent local-emulator verification
  -> separate production deployment plan and approval
```

Do not parallelize Tasks 2–7: they share `agent.ts`, `worker.ts`, and the same authority/persistence invariants. Within one task, failing test files may be authored together, but production code begins only after those tests fail for the expected missing behavior.

Do not start Task 8 documentation before the independent verifier passes. Do not deploy after Task 8. A future deployment plan must name the exact adopter environment and repeat upstream-version, authentication, data-location, retention, telemetry, rollback, export, and credential-handling review.

## Requirement-to-test map

| Approved requirement | Primary implementation | Required proof |
| --- | --- | --- |
| Passing portable conformance receipt | Task 1 | missing/stale/digest mismatch stops before host lookup |
| Separately approved adopter environment | Task 1 | closed approval schema and expiry/revocation tests |
| Agent identity separate from human/workload identity | Task 2 | guessed-instance and cross-tenant denial |
| Auth before routing and again on connection | Tasks 2–3 | namespace spy plus WebSocket reconnect tests |
| Durable Object SQLite only for replaceable projections | Task 2 | raw-content scan and host-loss restoration |
| Direct client `setState` rejected | Task 2 | zero-byte mutation assertion |
| Runtime-schema-validated callable RPC | Task 3 | malformed and forged envelope matrix |
| Read-only resumable WebSockets | Task 3 | minimized frames, cursor resume, backpressure |
| Workflows for long work and approval pause | Task 4 | approval, reject, timeout, replay, revocation |
| Retry and unknown-outcome controls | Task 4 | duplicate-effect and ambiguous dispatch tests |
| Freshness and drift scheduling | Task 5 | allowlisted callbacks and fresh authorization |
| Secret, progress, health, cleanup boundaries | Task 5 | no-secret serialization and canonical preservation |
| Governed MCP clients | Task 6 | endpoint/tool/data/egress/budget checks |
| Stateless OAuth-protected MCP server | Task 6 | Host/Origin/scope/legacy-path tests |
| Canonical first, full transitive closure | Task 7 | forced pre-ack persistence matrix |
| Export and local restoration | Task 7 | byte-identical loss/restore test |
| Local runtime equivalence | Task 7 | one frozen trace across both profiles |
| No deploy or credentials | Tasks 1 and 8 | repository scan and network-denied verifier |
| Bounded status only | Task 8 | exact `cloudflare_adapter_local_verified` receipt |

## Completion criteria

This plan is complete only when:

1. all eight task commits exist in order;
2. the clean lockfile install, build, typecheck, lint, full tests, retained verifiers, and Cloudflare verifier pass under Node 24.14 or later 24.x;
3. every portable interface claimed by the Cloudflare descriptor has a passing conformance check;
4. forced pre-ack writes leave every host durability surface unchanged;
5. the frozen trace is equivalent across the local runtime and Workers emulator;
6. host-state deletion restores byte-identical canonical identities and digests;
7. MCP uses only the current stateless server path with OAuth and exact scopes;
8. no deployment configuration, credential, secret value, route, account ID, or control-plane mutation was added; and
9. documentation claims only `cloudflare_adapter_local_verified`.

Passing these criteria means the adapter is implemented and locally verified against synthetic fixtures. It does not mean a production Cloudflare environment is approved, deployed, observed, or effective.
