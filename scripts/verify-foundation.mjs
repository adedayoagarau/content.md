import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  realpath,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promisify } from "node:util";

const execute = promisify(execFile);
const workspaceRoot = fileURLToPath(new URL("../", import.meta.url));
const fixtureSource = join(workspaceRoot, "fixtures/synthetic-web-app");
const patternPacket = join(workspaceRoot, "fixtures/frozen-pattern-packet");
const cliSource = join(workspaceRoot, "packages/cli/dist/main.js");
const checks = [];
const failures = [];

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function canonical(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
}

function portable(value, projectRoot) {
  if (typeof value === "string") return value.split(projectRoot).join("<PROJECT_ROOT>");
  if (Array.isArray(value)) return value.map((item) => portable(item, projectRoot));
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, portable(item, projectRoot)]));
  }
  return value;
}

function record(checkId, passed, detail) {
  checks.push({ check_id: checkId, status: passed ? "pass" : "fail", detail });
  if (!passed) failures.push(`${checkId}: ${detail}`);
}

function invariant(condition, checkId, detail) {
  record(checkId, Boolean(condition), detail);
  if (!condition) throw new Error(`${checkId}:${detail}`);
}

async function walkFiles(root, directory = root) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walkFiles(root, path));
    else if (entry.isFile()) files.push(relative(root, path).split(sep).join("/"));
  }
  return files.sort();
}

async function treeSnapshot(root, filter = () => true) {
  const snapshot = {};
  for (const relativePath of (await walkFiles(root)).filter(filter)) {
    snapshot[relativePath] = sha256(await readFile(join(root, relativePath)));
  }
  return snapshot;
}

async function stableTreeDigest(root) {
  const lines = [];
  for (const relativePath of await walkFiles(root)) {
    lines.push(`${sha256(await readFile(join(root, relativePath)))}  ${relativePath}\n`);
  }
  return sha256(lines.join(""));
}

async function run(command, args, options = {}) {
  try {
    const result = await execute(command, args, {
      cwd: options.cwd ?? workspaceRoot,
      env: options.env ?? process.env,
      maxBuffer: 32 * 1024 * 1024,
    });
    return { code: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    return {
      code: typeof error.code === "number" ? error.code : 1,
      stdout: error.stdout ?? "",
      stderr: error.stderr ?? error.message,
    };
  }
}

async function writeNetworkGuard(path) {
  const source = `
import net from "node:net";
import tls from "node:tls";
import http from "node:http";
import https from "node:https";
import dns from "node:dns";
const deny = () => { throw new Error("contentmd_verifier_network_denied"); };
for (const module of [net, tls, http, https]) {
  for (const key of ["connect", "createConnection", "request", "get"]) {
    if (typeof module[key] === "function") module[key] = deny;
  }
}
for (const key of ["lookup", "resolve", "resolve4", "resolve6", "resolveAny"]) {
  if (typeof dns[key] === "function") dns[key] = deny;
}
globalThis.fetch = async () => { throw new Error("contentmd_verifier_network_denied"); };
process.env.CONTENTMD_NETWORK_GUARD_ACTIVE = "1";
`;
  await writeFile(path, source, "utf8");
}

function permissionArgs(projectRoot, verificationRoot, networkGuard) {
  return [
    "--permission",
    `--allow-fs-read=${workspaceRoot}`,
    `--allow-fs-read=${verificationRoot}`,
    `--allow-fs-read=${projectRoot}`,
    `--allow-fs-write=${projectRoot}`,
    "--import",
    networkGuard,
  ];
}

async function runCli(projectRoot, verificationRoot, networkGuard, args, accepted = [0]) {
  const result = await run(process.execPath, [
    ...permissionArgs(projectRoot, verificationRoot, networkGuard),
    cliSource,
    ...args,
    "--root",
    projectRoot,
    "--json",
  ]);
  let parsed;
  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    throw new Error(`cli_non_json:${args.join(" ")}:${result.stdout}:${result.stderr}`);
  }
  invariant(
    accepted.includes(result.code),
    `cli.${args.join(".")}.exit`,
    `exit ${result.code}; accepted ${accepted.join(",")}; findings ${canonical(parsed.findings ?? [])}`,
  );
  invariant(parsed.exit_code === result.code, `cli.${args.join(".")}.envelope`, "process and envelope exit codes match");
  invariant(parsed.schema_version === "contentmd.command-result/0.1.0", `cli.${args.join(".")}.schema`, "stable command envelope");
  return parsed;
}

async function verifyPackageInventory(verificationRoot) {
  const rootManifest = JSON.parse(await readFile(join(workspaceRoot, "package.json"), "utf8"));
  invariant(rootManifest.packageManager === "pnpm@11.9.0", "inventory.package-manager", "pnpm is exactly pinned");
  invariant(rootManifest.engines?.node === ">=24.14.0 <25", "inventory.node-range", "Node runtime range is exact");
  invariant(
    rootManifest.scripts?.["generate:learning-fixtures"] === "node --import tsx scripts/generate-learning-fixtures.mts",
    "inventory.learning-fixture-generator",
    "deterministic learning-fixture generator is exposed",
  );
  invariant(
    rootManifest.scripts?.["verify:learning"] === "node scripts/verify-learning.mjs",
    "inventory.learning-verifier",
    "independent learning verifier is exposed",
  );
  invariant(
    rootManifest.scripts?.["verify:repository-intelligence"] === "node scripts/verify-repository-intelligence.mjs",
    "inventory.repository-intelligence-verifier",
    "independent repository-intelligence verifier is exposed",
  );
  for (const relativePath of [
    "scripts/generate-learning-fixtures.mts",
    "scripts/verify-learning.mjs",
    "fixtures/learning-ranking/preferences.jsonl",
    "fixtures/learning-ranking/leakage-groups.jsonl",
    "fixtures/learning-ranking/dataset-manifest.json",
    "fixtures/learning-ranking/feature-profile.json",
    "fixtures/learning-ranking/shadow-plan.json",
  ]) {
    const artifact = await stat(join(workspaceRoot, relativePath));
    invariant(artifact.isFile() && artifact.size > 0, `inventory.learning-release.${relativePath}`, "release artifact is present and nonempty");
  }
  const packageDirectories = (await readdir(join(workspaceRoot, "packages"), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const requiredPackageDirectories = [
    "adapter-filesystem",
    "adapter-sdk",
    "agent",
    "cli",
    "core",
    "evaluation",
    "governance",
    "learning",
    "memory",
    "model-provider-openai",
    "model-provider-sdk",
    "research",
    "schemas",
    "workbench",
    "writer",
  ];
  invariant(
    packageDirectories.length >= requiredPackageDirectories.length,
    "inventory.package-count",
    `found ${packageDirectories.length} packages`,
  );
  for (const directory of requiredPackageDirectories) {
    invariant(
      packageDirectories.includes(directory),
      `inventory.required-package.${directory}`,
      "required retained package is present",
    );
  }
  for (const directory of packageDirectories) {
    const manifest = JSON.parse(await readFile(join(workspaceRoot, "packages", directory, "package.json"), "utf8"));
    invariant(manifest.version === "0.1.0", `inventory.${directory}.version`, "package version is 0.1.0");
    for (const [name, version] of Object.entries({ ...manifest.dependencies, ...manifest.devDependencies })) {
      const exact = String(version).startsWith("workspace:") || /^(?:npm:[^@]+@)?\d+\.\d+\.\d+$/u.test(String(version));
      invariant(exact, `inventory.${directory}.dependency.${name}`, `dependency is exact: ${version}`);
    }
  }

  const boundary = await run(process.execPath, [join(workspaceRoot, "scripts/check-package-boundaries.mjs")]);
  invariant(boundary.code === 0, "inventory.boundaries", boundary.stdout.trim() || boundary.stderr.trim());

  const installRoot = join(verificationRoot, "clean-install");
  await mkdir(join(installRoot, "packages"), { recursive: true });
  for (const file of ["package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml"]) {
    await cp(join(workspaceRoot, file), join(installRoot, file));
  }
  for (const directory of packageDirectories) {
    await mkdir(join(installRoot, "packages", directory), { recursive: true });
    await cp(
      join(workspaceRoot, "packages", directory, "package.json"),
      join(installRoot, "packages", directory, "package.json"),
    );
  }
  const modulesMetadata = await readFile(join(workspaceRoot, "node_modules/.modules.yaml"), "utf8");
  const activeStoreMatch = modulesMetadata.match(/^\s*["']?storeDir["']?:\s*["']([^"']+)["']\s*,?\s*$/mu);
  invariant(activeStoreMatch !== null, "inventory.offline-store", "active pnpm store is recorded");
  const activeStoreVersionRoot = await realpath(activeStoreMatch[1]);
  const activeStoreRoot = dirname(activeStoreVersionRoot);
  const pnpmCli = resolve(dirname(process.execPath), "../node_modules/pnpm/bin/pnpm.mjs");
  const pnpmVersion = await run(process.execPath, [pnpmCli, "--version"]);
  invariant(
    pnpmVersion.code === 0 && pnpmVersion.stdout.trim() === "11.9.0",
    "inventory.pnpm-runtime",
    pnpmVersion.stderr.trim() || pnpmVersion.stdout.trim() || "pinned pnpm CLI unavailable",
  );
  const cleanInstall = await run(process.execPath, [pnpmCli,
    "install",
    "--frozen-lockfile",
    "--trust-lockfile",
    "--frozen-store",
    "--ignore-scripts",
    "--offline",
    "--store-dir",
    activeStoreRoot,
  ], { cwd: installRoot });
  invariant(
    cleanInstall.code === 0,
    "inventory.clean-install",
    cleanInstall.stderr.trim() || cleanInstall.stdout.trim() || "clean frozen-lockfile install passed",
  );
  return { package_count: packageDirectories.length, package_manager: rootManifest.packageManager };
}

function resolveJsonPointer(document, fragment) {
  if (fragment === "" || fragment === "#") return document;
  const path = fragment.replace(/^#/u, "").split("/").slice(1).map((part) => part.replace(/~1/gu, "/").replace(/~0/gu, "~"));
  return path.reduce((value, key) => value?.[key], document);
}

async function verifySchemaClosure() {
  const schemaDirectory = join(workspaceRoot, "packages/schemas/src");
  const schemaPaths = (await readdir(schemaDirectory)).filter((name) => name.endsWith(".schema.json")).sort();
  const documents = new Map();
  for (const name of schemaPaths) {
    const document = JSON.parse(await readFile(join(schemaDirectory, name), "utf8"));
    documents.set(document.$id, document);
  }
  let referenceCount = 0;
  function visit(value, document) {
    if (Array.isArray(value)) return value.forEach((item) => visit(item, document));
    if (value === null || typeof value !== "object") return;
    if (typeof value.$ref === "string") {
      referenceCount += 1;
      const [targetId, fragment = ""] = value.$ref.split("#", 2);
      const target = targetId.length === 0 ? document : documents.get(targetId);
      invariant(target !== undefined && resolveJsonPointer(target, `#${fragment}`) !== undefined, `schemas.ref.${referenceCount}`, `resolved ${value.$ref}`);
    }
    for (const child of Object.values(value)) visit(child, document);
  }
  for (const document of documents.values()) visit(document, document);
  invariant(referenceCount > 0, "schemas.reference-count", `resolved ${referenceCount} schema references`);
  return { schema_count: documents.size, reference_count: referenceCount };
}

function decisionInput() {
  return {
    expected_head_digest: null,
    decision_id: "decision.fixture.accepted.verifier",
    status: "accepted",
    actor_ref: "actor.fixture-independent-verifier",
    actor_role: "content_owner",
    rationale: "The exact destructive action remains accurate and testable.",
    proposal_ref: "prop_fixture_delete_workspace_v1",
    selected_expression: "Delete this workspace",
    edited_expression: null,
    evidence_reviewed: ["source.product", "source.design"],
    scope: "project",
    project_id: "project.beacon-checkout-lab-fixture",
    occurred_at: "2026-08-20T18:00:00.000Z",
    data_class: "project_feedback",
  };
}

async function runtimeDecisionAuthority(decision) {
  const { sha256Canonical: runtimeSha256Canonical } = await import(pathToFileURL(join(
    workspaceRoot,
    "packages/core/dist/index.js",
  )).href);
  const {
    eventStoreEffectClaims,
    finalizeGovernedRuntimeAuthorizationRecord,
  } = await import(pathToFileURL(join(
    workspaceRoot,
    "packages/runtime-local/dist/index.js",
  )).href);
  const digest = "f".repeat(64);
  const binding = {
    contract_version: "contentmd.runtime-binding/0.1.0",
    binding_id: `runtime.binding.${decision.project_id}`,
    binding_version: 1,
    project_id: decision.project_id,
    status: "active",
    proposal_ref: "runtime.proposal.fixture",
    proposal_digest: digest,
    decision_ref: "runtime.binding-decision.fixture",
    decision_digest: digest,
    descriptor_ref: "runtime.descriptor.local",
    descriptor_digest: digest,
    integration_mode: "sidecar",
    canonical_replica: { runtime_id: "runtime.local", data_location_id: "runtime.local.canonical" },
    interface_bindings: [],
    consistency_model: "single_writer_strong",
    transaction_boundary: "sqlite_immediate_transaction",
    idempotency_behavior: "event_id_plus_digest",
    retry_behavior: "explicit_authorized_only",
    ambiguous_outcome_behavior: "read_before_retry",
    identity_provider: "runtime.local.identity",
    authentication_provider: "runtime.local.authentication",
    secret_resolver: "runtime.local.environment",
    data_locations: [{ location_id: "runtime.local.canonical", data_class: "runtime-metadata", role: "canonical_replica" }],
    retention: { mode: "policy_bound", policy_ref: "policy.runtime.retention" },
    encryption: { at_rest: "platform-filesystem", in_transit: "not_applicable" },
    telemetry: { mode: "minimized", data_classes: ["runtime-metadata"] },
    health_checks: ["runtime.node", "runtime.sqlite"],
    cleanup: { mode: "explicit_authorized" },
    export: { mode: "canonical_verified" },
    adapter_digests: [{ adapter_id: "runtime.local", adapter_digest: digest }],
    conformance_receipts: [{ record_id: "runtime.conformance.fixture", record_version: 1, content_digest: digest }],
    issued_at: "2026-08-23T12:00:00.000Z",
    predecessor_binding_digest: null,
  };
  const streamId = `decision-stream.${decision.project_id}`;
  const command = {
    event_id: `event.${decision.decision_id}`,
    stream_id: streamId,
    event_type: "content_decision_recorded",
    occurred_at: decision.occurred_at,
    actor_ref: decision.actor_ref,
    data_class: decision.data_class,
    payload: {
      schema_version: "contentmd.content-decision/0.1.0",
      decision_id: decision.decision_id,
      status: decision.status,
      actor_ref: decision.actor_ref,
      actor_role: decision.actor_role,
      rationale: decision.rationale,
      proposal_ref: decision.proposal_ref,
      selected_expression: decision.selected_expression,
      edited_expression: decision.edited_expression,
      evidence_reviewed: [...new Set(decision.evidence_reviewed)].sort(),
      scope: decision.scope,
      project_id: decision.project_id,
      occurred_at: decision.occurred_at,
      mutation_approval_effect: "none",
    },
    expected_head_digest: decision.expected_head_digest,
  };
  const operationInputs = [
    {
      action: "runtime.event-store.open",
      resources: [{ resource_id: binding.binding_id, content_digest: null }],
      effect_input: { binding_id: binding.binding_id },
    },
    {
      action: "runtime.event.head",
      resources: [{ resource_id: streamId, content_digest: null }],
      effect_input: { stream_id: streamId },
    },
    {
      action: "runtime.event.append",
      resources: [{ resource_id: streamId, content_digest: decision.expected_head_digest }],
      effect_input: command,
    },
    {
      action: "runtime.event-store.close",
      resources: [{ resource_id: binding.binding_id, content_digest: null }],
      effect_input: { binding_id: binding.binding_id },
    },
  ];
  const authorizationRecords = operationInputs.map((operation, index) => {
    const ordinal = index + 1;
    const limits = eventStoreEffectClaims(
      operation.action,
      operation.resources,
      [decision.data_class],
      operation.effect_input,
      1,
    );
    const policy = {
      policy_id: `policy.runtime.local-decision.${ordinal}`,
      policy_version: 1,
      status: "current",
      effective_at: "2020-01-01T00:00:00.000Z",
      expires_at: "2099-01-01T00:00:00.000Z",
      allowed_actions: [operation.action],
      denied_actions: [],
      review_actions: [],
      allowed_adapters: ["runtime.local"],
      denied_adapters: [],
      permitted_data_classes: [decision.data_class],
      denied_data_classes: [],
      permitted_egress: ["none"],
      max_limits: limits,
      human_approval_actions: [],
      required_control_types: [],
    };
    const grant = {
      grant_id: `grant.runtime.local-decision.${ordinal}`,
      principal_ref: "principal.fixture-reviewer",
      workload_ref: "workload.contentmd",
      action: operation.action,
      adapter_id: "runtime.local",
      resource_scope: operation.resources.map((resource) => resource.resource_id),
      data_classes: [decision.data_class],
      egress: "none",
      max_limits: limits,
      issued_at: "2020-01-01T00:00:00.000Z",
      expires_at: "2099-01-01T00:00:00.000Z",
      revocation_state: "current",
    };
    const capabilityId = `capability.runtime.local-decision.${ordinal}`;
    const claims = {
      capability_id: capabilityId,
      tenant_ref: "tenant.runtime.fixture",
      principal_ref: grant.principal_ref,
      workload_ref: grant.workload_ref,
      project_ref: decision.project_id,
      action: operation.action,
      resources: operation.resources,
      data_classes: [decision.data_class],
      policy_refs: [{ record_id: policy.policy_id, record_version: 1, content_digest: runtimeSha256Canonical(policy) }],
      capability_grant_ref: { record_id: grant.grant_id, record_version: 1, content_digest: runtimeSha256Canonical(grant) },
      control_refs: [],
      resource_limits: limits,
      issued_at: grant.issued_at,
      expires_at: grant.expires_at,
      revocation_checkpoint: { stream_id: "stream.governance.fixture", sequence: 8, head_digest: "e".repeat(64) },
      nonce: `nonce.runtime.local-decision.${ordinal}`,
      nonce_mode: "single_use",
      runtime_binding_digest: binding.descriptor_digest,
      audit_target: { stream_id: "stream.audit.fixture", data_class: "runtime-metadata" },
    };
    const authorization = {
      now: "2026-08-23T12:00:00.000Z",
      request: {
        operation_id: capabilityId,
        intent: "apply",
        action: operation.action,
        adapter_id: "runtime.local",
        resource_scope: operation.resources.map((resource) => resource.resource_id),
        data_classes: [decision.data_class],
        egress: "none",
        requested_limits: limits,
        approval_class: null,
        requires_readback: false,
      },
      policies: [policy],
      capability_grant: grant,
      approval: null,
      control_dispositions: [],
      verification_plan_ref: null,
      reliability_evidence: null,
    };
    return finalizeGovernedRuntimeAuthorizationRecord({ authorization, claims });
  });
  return {
    contract_version: "contentmd.local-decision-runtime-authority/0.1.0",
    runtime_binding: binding,
    authorization_records: authorizationRecords,
  };
}

function authorization(transaction, kind) {
  const rollback = kind === "rollback";
  const action = rollback ? "filesystem.rollback" : "filesystem.write";
  const operation = rollback ? `operation.rollback.${transaction.transaction_id}` : transaction.operation_id;
  const approvalId = rollback ? `apr.rollback.${transaction.transaction_id}` : transaction.approval_id;
  const targetPath = transaction.target_path;
  const limits = { calls: 1, bytes: 4096, duration_ms: 2000, records: 2, model_tokens: 0, browser_actions: 0, retries: 0 };
  return {
    now: "2026-08-20T18:10:00.000Z",
    request: {
      operation_id: operation,
      intent: "apply",
      action,
      adapter_id: "adapter.filesystem",
      resource_scope: [targetPath],
      data_classes: ["public-synthetic"],
      egress: "none",
      requested_limits: limits,
      approval_class: "mutation",
      requires_readback: true,
      subject_digest: transaction.transaction_digest,
    },
    policies: [{
      policy_id: `policy.fixture.${kind}`,
      policy_version: 1,
      status: "current",
      effective_at: "2026-08-20T00:00:00.000Z",
      expires_at: "2026-08-21T00:00:00.000Z",
      allowed_actions: [action],
      denied_actions: [],
      review_actions: [],
      allowed_adapters: ["adapter.filesystem"],
      denied_adapters: [],
      permitted_data_classes: ["public-synthetic"],
      denied_data_classes: [],
      permitted_egress: ["none"],
      max_limits: limits,
      human_approval_actions: [action],
      required_control_types: ["data_processing", "durable_memory", "telemetry"],
    }],
    capability_grant: {
      grant_id: `grant.fixture.${kind}`,
      principal_ref: "actor.fixture.agent",
      workload_ref: "workload.contentmd",
      action,
      adapter_id: "adapter.filesystem",
      resource_scope: [targetPath],
      data_classes: ["public-synthetic"],
      egress: "none",
      max_limits: limits,
      issued_at: "2026-08-20T17:00:00.000Z",
      expires_at: "2026-08-20T19:00:00.000Z",
      revocation_state: "current",
    },
    approval: {
      approval_id: approvalId,
      approval_class: "mutation",
      subject_ref: operation,
      subject_digest: transaction.transaction_digest,
      status: "issued",
      issued_at: "2026-08-20T18:00:00.000Z",
      expires_at: "2026-08-20T19:00:00.000Z",
      revocation_state: "current",
    },
    control_dispositions: [
      { control_type: "connection_authorization", applicability: "not_applicable", record_ref: null, status: "not_applicable", rationale: "No connector." },
      { control_type: "data_processing", applicability: "applicable", record_ref: "control.processing", status: "current", rationale: "Synthetic fixture." },
      { control_type: "durable_memory", applicability: "applicable", record_ref: "control.memory", status: "current", rationale: "Local audit." },
      { control_type: "telemetry", applicability: "applicable", record_ref: "control.telemetry", status: "current", rationale: "Local verification." },
    ],
    verification_plan_ref: transaction.verification_id,
    reliability_evidence: null,
  };
}

async function verifyMemoryAndLearning(projectRoot, verificationRoot, networkGuard) {
  const memoryUrl = pathToFileURL(join(workspaceRoot, "packages/memory/dist/index.js")).href;
  const learningUrl = pathToFileURL(join(workspaceRoot, "packages/learning/dist/index.js")).href;
  const script = `
    import { createHash } from "node:crypto";
    import { SqliteEventStore } from ${JSON.stringify(memoryUrl)};
    import { createLearningCandidate } from ${JSON.stringify(learningUrl)};
    const root = process.env.CONTENTMD_VERIFY_PROJECT;
    const source = new SqliteEventStore(root + "/.contentmd/runtime/events.sqlite", { permitted_data_classes: ["project_feedback"] });
    const projector = { initial: () => [], apply: (state, event) => [...state, event.event_digest] };
    const first = await source.rebuild(projector);
    const second = await source.rebuild(projector);
    const bytes = await source.exportCanonical();
    source.close();
    const imported = await SqliteEventStore.importCanonical(root + "/.contentmd/runtime/events-imported.sqlite", bytes, { permitted_data_classes: ["project_feedback"] });
    const importedBytes = await imported.exportCanonical();
    const importedProjection = await imported.rebuild(projector);
    imported.close();
    const candidate = createLearningCandidate({
      hypothesis: "Accepted destructive-action labels may prefer explicit affected objects.",
      expected_benefit: "Make the destructive consequence more scannable.",
      supporting_decision_refs: ["decision.fixture.accepted.verifier"],
      contradicting_decision_refs: [],
      data_scope: "project",
      project_id: "project.beacon-checkout-lab-fixture",
      rights_privacy_disposition: "permitted_for_candidate",
      evaluation_plan: "Evaluate on a separately frozen synthetic set.",
      rollback_plan: "Reject the candidate without changing approved content.",
      learning_data_permission_ref: "permission.fixture.learning-candidate-only"
    });
    console.log(JSON.stringify({
      projections_match: JSON.stringify(first) === JSON.stringify(second) && JSON.stringify(first) === JSON.stringify(importedProjection),
      export_import_match: Buffer.compare(bytes, importedBytes) === 0,
      export_digest: createHash("sha256").update(bytes).digest("hex"),
      event_count: first.length,
      candidate
    }));
  `;
  const result = await run(process.execPath, [
    ...permissionArgs(projectRoot, verificationRoot, networkGuard),
    "--input-type=module",
    "--eval",
    script,
  ], { env: { ...process.env, CONTENTMD_VERIFY_PROJECT: projectRoot } });
  invariant(result.code === 0, "memory.execution", result.stderr.trim() || "memory verification ran");
  const data = JSON.parse(result.stdout);
  invariant(data.projections_match, "memory.projection-rebuild", "two rebuilds and imported rebuild match");
  invariant(data.export_import_match, "memory.export-import", "canonical event export/import is byte-identical");
  invariant(data.event_count === 1, "memory.event-count", "one verifier decision retained");
  invariant(data.candidate.lifecycle_state === "proposed", "learning.lifecycle", "candidate remains proposed");
  invariant(data.candidate.promotion_status === "not_requested", "learning.promotion", "promotion was not requested");
  invariant(data.candidate.authority_effect === "none", "learning.authority", "candidate has no authority effect");
  return { event_export_digest: data.export_digest, learning_candidate_id: data.candidate.candidate_id };
}

async function verifyCliWorkflow(verificationRoot) {
  const projectA = join(verificationRoot, "project-a");
  const projectB = join(verificationRoot, "project-b");
  await mkdir(projectA);
  await mkdir(projectB);
  await cp(fixtureSource, projectA, { recursive: true });
  await cp(fixtureSource, projectB, { recursive: true });
  const networkGuard = join(verificationRoot, "deny-network.mjs");
  await writeNetworkGuard(networkGuard);
  const initialProduct = await treeSnapshot(projectA);

  const adopt = async (projectRoot) => {
    const preview = await runCli(projectRoot, verificationRoot, networkGuard, ["init"], [20]);
    const planDigest = preview.data?.adoption?.plan_digest;
    invariant(typeof planDigest === "string" && planDigest.length > 0, "adoption.plan-digest", "preview returned a plan digest");
    return runCli(projectRoot, verificationRoot, networkGuard, ["init", "--yes", "--plan-digest", planDigest]);
  };

  const deterministicCommands = [
    ["doctor"],
    ["discover"],
    ["model"],
    ["research", "ingest", "--packet", patternPacket],
    ["review"],
  ];

  const firstInit = await adopt(projectA);
  const hostAfterFirstInit = await treeSnapshot(projectA, (path) => !path.startsWith(".contentmd/") && path !== "CONTENT.md");
  invariant(
    Object.entries(initialProduct).every(([path, fileDigest]) => hostAfterFirstInit[path] === fileDigest),
    "adoption.host-preservation",
    "init preserved every pre-existing host file byte",
  );
  const secondInit = await adopt(projectA);
  invariant(secondInit.data.created_paths.length === 0, "adoption.idempotence", "second init created no files");
  await adopt(projectB);
  invariant(
    canonical(firstInit.data.created_paths) === canonical([
      ".contentmd/governance/starter-policy.yaml",
      ".contentmd/manifest.json",
      ".contentmd/product/open-questions.json",
      ".contentmd/records/repository-model.json",
      "CONTENT.md",
    ]),
    "adoption.first-write",
    "first init created exactly the five approved contentmd files",
  );
  invariant(
    canonical(firstInit.data.bridged_paths) === canonical(["AGENTS.md"]),
    "adoption.first-bridge",
    "first init created exactly the approved host bridge",
  );

  const prepareArgs = [
    "task", "prepare",
    "--request", "Improve the checkout summary action",
    "--target", "src/components/CheckoutSummary.tsx:9",
  ];
  const preparedA = await runCli(projectA, verificationRoot, networkGuard, prepareArgs);
  const preparedB = await runCli(projectB, verificationRoot, networkGuard, prepareArgs);
  const taskSemantics = (prepared) => ({
    request: prepared.data.request,
    target: prepared.data.target,
    expression_payload: prepared.data.target_occurrence.expression_payload,
    prohibited_claims: prepared.data.task.prohibited_claims,
    consequence: prepared.data.task.consequence,
    recovery: prepared.data.task.recovery,
    channel: prepared.data.task.channel,
    locale: prepared.data.task.locale,
    risk: prepared.data.task.risk,
    acceptance_criteria: prepared.data.task.acceptance_criteria,
    authority_effect: prepared.data.authority_effect,
  });
  invariant(
    canonical(taskSemantics(preparedA)) === canonical(taskSemantics(preparedB)),
    "determinism.task.prepare",
    "repository-derived task semantics match across identical projects while identities remain root-bound",
  );
  const candidate = (prepared) => ({
    contract_version: "contentmd.ide-writing-candidate/0.1.0",
    task_digest: prepared.data.task.task_digest,
    alternatives: [{
      candidate_id: "candidate.foundation.checkout-action",
      text: "Delete this workspace",
      rationale: "Names the affected object while preserving the established action.",
      evidence_refs: prepared.data.task.evidence_refs,
    }],
    recommended_candidate_id: "candidate.foundation.checkout-action",
    claimed_authority_effect: "none",
  });
  const candidatePathA = join(projectA, ".contentmd-test/foundation-ide-candidate.json");
  const candidatePathB = join(projectB, ".contentmd-test/foundation-ide-candidate.json");
  await writeFile(candidatePathA, canonical(candidate(preparedA)), "utf8");
  await writeFile(candidatePathB, canonical(candidate(preparedB)), "utf8");
  const reviewedA = await runCli(projectA, verificationRoot, networkGuard, ["task", "review", "--input", candidatePathA]);
  const reviewedB = await runCli(projectB, verificationRoot, networkGuard, ["task", "review", "--input", candidatePathB]);
  const reviewSemantics = (reviewed) => ({
    recommended_candidate_id: reviewed.data.recommended_candidate_id,
    findings: reviewed.data.findings,
    explanation: reviewed.data.explanation,
    uncertainty: reviewed.data.uncertainty,
    trade_offs: reviewed.data.trade_offs,
    preview_diff: reviewed.data.preview_diff === null ? null : {
      source_artifact: reviewed.data.preview_diff.source_artifact,
      line: reviewed.data.preview_diff.line,
      column: reviewed.data.preview_diff.column,
      before: reviewed.data.preview_diff.before,
      after: reviewed.data.preview_diff.after,
    },
    decision_status: reviewed.data.decision_status,
    authority_effect: reviewed.data.authority_effect,
  });
  invariant(
    canonical(reviewSemantics(reviewedA)) === canonical(reviewSemantics(reviewedB)),
    "determinism.task.review",
    "candidate reviews match across identical projects",
  );
  invariant(reviewedA.data.authority_effect === "none", "task.review.authority", "candidate review grants no authority");

  const outputsA = [];
  const outputsB = [];
  for (const command of deterministicCommands) {
    const accepted = command[0] === "review" ? [10] : [0];
    outputsA.push(await runCli(projectA, verificationRoot, networkGuard, command, accepted));
    outputsB.push(await runCli(projectA, verificationRoot, networkGuard, command, accepted));
  }
  const deterministicDigests = outputsA.map((output, index) => {
    const left = sha256(canonical(portable(output.data, projectA)));
    const right = sha256(canonical(portable(outputsB[index].data, projectA)));
    invariant(left === right, `determinism.${deterministicCommands[index].join(".")}`, `same-root replay digests ${left} and ${right}`);
    return left;
  });

  const decisionPath = join(projectA, ".contentmd-test/decision-verifier.json");
  const exactDecisionInput = decisionInput();
  await writeFile(decisionPath, `${JSON.stringify(exactDecisionInput, null, 2)}\n`);
  const runtimeDecisionAuthorityPath = join(projectA, ".contentmd/governance/runtime-decision-authority.json");
  await mkdir(dirname(runtimeDecisionAuthorityPath), { recursive: true });
  await writeFile(
    runtimeDecisionAuthorityPath,
    `${JSON.stringify(await runtimeDecisionAuthority(exactDecisionInput), null, 2)}\n`,
  );
  await runCli(projectA, verificationRoot, networkGuard, ["decision", "record", "--file", decisionPath]);
  const learn = await runCli(projectA, verificationRoot, networkGuard, ["learn"], [20]);
  invariant(learn.data.disposition === "not_authorized", "learning.fail-closed", "CLI does not infer learning permission");

  const taskDecision = {
    schema_version: "contentmd.content-decision/0.1.0",
    decision_id: "decision.foundation.checkout-action.001",
    status: "accepted",
    actor_ref: "actor.fixture-independent-verifier",
    actor_role: "content_owner",
    rationale: "Accepted only for the exact synthetic checkout action occurrence.",
    proposal_ref: reviewedA.data.candidate_digest,
    selected_expression: reviewedA.data.preview_diff.after,
    edited_expression: null,
    evidence_reviewed: [preparedA.data.task.task_digest, preparedA.data.target_occurrence.occurrence_id].sort(),
    scope: "project",
    project_id: preparedA.data.project_id,
    occurred_at: "2026-08-25T18:00:00.000Z",
    mutation_approval_effect: "none",
    sequence: 1,
    event_digest: "e".repeat(64),
  };
  await writeFile(join(projectA, ".contentmd/runtime/latest-decision.json"), `${canonical(taskDecision)}\n`, "utf8");

  const beforePreview = await treeSnapshot(projectA, (path) => !path.startsWith(".contentmd/"));
  const transactionId = "txn_foundation_checkout_action_v1";
  const preview = await runCli(projectA, verificationRoot, networkGuard, ["apply", "--transaction", transactionId, "--preview"]);
  const afterPreview = await treeSnapshot(projectA, (path) => !path.startsWith(".contentmd/"));
  invariant(canonical(beforePreview) === canonical(afterPreview), "mutation.preview-non-effect", "preview changed no product or host file");
  const approvalPath = join(projectA, `.contentmd/governance/approvals/${preview.data.approval_id}.json`);
  let missingApproval = false;
  try { await stat(approvalPath); } catch { missingApproval = true; }
  invariant(missingApproval, "mutation.no-auto-approval", "preview did not create approval");

  const denied = await runCli(projectA, verificationRoot, networkGuard, ["apply", "--transaction", transactionId], [21]);
  invariant(denied.status === "denied_by_governance", "mutation.unauthorized-denied", "apply without approval is denied");
  const transaction = JSON.parse(await readFile(join(projectA, `.contentmd/runtime/transactions/${transactionId}.json`), "utf8"));
  await mkdir(dirname(approvalPath), { recursive: true });
  await writeFile(approvalPath, `${JSON.stringify(authorization(transaction, "apply"), null, 2)}\n`);
  const beforeApply = await treeSnapshot(projectA, (path) => !path.startsWith(".contentmd/"));
  await runCli(projectA, verificationRoot, networkGuard, ["apply", "--transaction", transaction.transaction_id, "--approval", transaction.approval_id]);
  await runCli(projectA, verificationRoot, networkGuard, ["verify", "--transaction", transaction.transaction_id]);
  const afterApply = await treeSnapshot(projectA, (path) => !path.startsWith(".contentmd/"));
  const changedFiles = Object.keys(afterApply).filter((path) => beforeApply[path] !== afterApply[path]);
  invariant(changedFiles.length === 1 && changedFiles[0] === "src/components/CheckoutSummary.tsx", "mutation.exact-one-file", `changed: ${changedFiles.join(",")}`);
  invariant((await readFile(join(projectA, changedFiles[0]), "utf8")).includes("Delete this workspace"), "mutation.readback", "approved bytes are present");

  const rollbackApprovalId = `apr.rollback.${transaction.transaction_id}`;
  const rollbackPath = join(projectA, `.contentmd/governance/approvals/${rollbackApprovalId}.json`);
  await writeFile(rollbackPath, `${JSON.stringify(authorization(transaction, "rollback"), null, 2)}\n`);
  await runCli(projectA, verificationRoot, networkGuard, ["rollback", "--transaction", transaction.transaction_id, "--approval", rollbackApprovalId]);
  const afterRollback = await treeSnapshot(projectA, (path) => !path.startsWith(".contentmd/"));
  invariant(canonical(afterRollback) === canonical(beforeApply), "mutation.rollback", "rollback restored exact pre-apply bytes");

  const uninstall = await runCli(projectA, verificationRoot, networkGuard, ["uninstall", "--preview"]);
  invariant(uninstall.data.removed === false, "uninstall.preview-only", "uninstall preview performed no removal");
  invariant(
    canonical(uninstall.data.owned_files) === canonical([
      ".contentmd/governance/starter-policy.yaml",
      ".contentmd/manifest.json",
      ".contentmd/product/open-questions.json",
      ".contentmd/records/repository-model.json",
      "CONTENT.md",
    ]),
    "uninstall.owned-only",
    "preview listed only installer-owned manifest files",
  );
  invariant(
    canonical(uninstall.data.host_files_affected) === canonical([{
      relative_path: "AGENTS.md",
      operation: "remove_exact_marker_block",
      created_by_contentmd: true,
      start_marker_prefix: "<!-- contentmd:bridge:start",
      end_marker: "<!-- contentmd:bridge:end -->",
    }]),
    "uninstall.host-bounded",
    "preview lists only the exact installer-owned AGENTS.md bridge block",
  );
  record("runtime.network-guard", true, "all retained CLI commands ran with socket APIs denied and project-root-only write permission");
  record("runtime.write-boundary", true, `permission model allowed writes only inside ${basename(projectA)} or ${basename(projectB)}`);

  const memory = await verifyMemoryAndLearning(projectA, verificationRoot, networkGuard);
  return {
    fixture_digest: await stableTreeDigest(fixtureSource),
    deterministic_record_digests: deterministicDigests,
    ...memory,
  };
}

async function main() {
  const startedAt = new Date().toISOString();
  invariant(process.versions.node === "24.14.0", "runtime.node", `running Node ${process.versions.node}`);
  const build = await run(process.execPath, [
    join(workspaceRoot, "node_modules/typescript/bin/tsc"),
    "-b",
    "tsconfig.json",
  ]);
  invariant(
    build.code === 0,
    "runtime.build",
    build.stderr.trim() || build.stdout.trim() || "compiled JavaScript build passed",
  );
  const verificationRoot = await realpath(await mkdtemp(join(tmpdir(), "contentmd-foundation-verifier-")));
  try {
    const packageInventory = await verifyPackageInventory(verificationRoot);
    const schemas = await verifySchemaClosure();
    const workflow = await verifyCliWorkflow(verificationRoot);
    const verifierDigest = sha256(await readFile(fileURLToPath(import.meta.url)));
    const result = {
      schema_version: "contentmd.foundation-verification/0.1.0",
      status: failures.length === 0 ? "passed" : "failed",
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      runtime: { node: process.versions.node, platform: process.platform, architecture: process.arch },
      package_inventory: packageInventory,
      schemas,
      workflow,
      verifier_digest: verifierDigest,
      check_count: checks.length,
      checks,
      failures,
      nonclaims: [
        "No live model writing quality was tested.",
        "No live registry supply-chain policy service was contacted; clean installation used the frozen lock and active content-addressed offline pnpm store.",
        "No browser or desktop research was performed.",
        "No hosted runtime or external connector was exercised.",
        "No real-product safety or user outcome was established.",
        "No human, cognitive, qualified-rater, or ML validation was performed.",
      ],
    };
    process.stdout.write(`${canonical(result)}\n`);
    if (failures.length > 0) process.exitCode = 1;
  } finally {
    await rm(verificationRoot, { recursive: true, force: true });
  }
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exitCode = 1;
});
