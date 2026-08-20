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
  invariant(accepted.includes(result.code), `cli.${args.join(".")}.exit`, `exit ${result.code}; accepted ${accepted.join(",")}`);
  invariant(parsed.exit_code === result.code, `cli.${args.join(".")}.envelope`, "process and envelope exit codes match");
  invariant(parsed.schema_version === "contentmd.command-result/0.1.0", `cli.${args.join(".")}.schema`, "stable command envelope");
  return parsed;
}

async function verifyPackageInventory(verificationRoot) {
  const rootManifest = JSON.parse(await readFile(join(workspaceRoot, "package.json"), "utf8"));
  invariant(rootManifest.packageManager === "pnpm@11.9.0", "inventory.package-manager", "pnpm is exactly pinned");
  invariant(rootManifest.engines?.node === ">=24.14.0 <25", "inventory.node-range", "Node runtime range is exact");
  const packageDirectories = (await readdir(join(workspaceRoot, "packages"), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  invariant(packageDirectories.length === 13, "inventory.package-count", `found ${packageDirectories.length} packages`);
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
  const cleanInstall = await run("pnpm", [
    "install",
    "--frozen-lockfile",
    "--ignore-scripts",
    "--prefer-offline",
    "--store-dir",
    join(verificationRoot, "pnpm-store"),
  ], { cwd: installRoot });
  invariant(cleanInstall.code === 0, "inventory.clean-install", cleanInstall.stderr.trim() || "clean frozen-lockfile install passed");
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

function authorization(transaction, kind) {
  const rollback = kind === "rollback";
  const action = rollback ? "filesystem.rollback" : "filesystem.write";
  const operation = rollback ? "operation.fixture.rollback" : "operation.fixture.apply";
  const approvalId = rollback ? "apr_fixture_delete_workspace_rollback_v1" : "apr_fixture_delete_workspace_v1";
  const limits = { calls: 1, bytes: 4096, duration_ms: 2000, records: 2, model_tokens: 0, browser_actions: 0, retries: 0 };
  return {
    now: "2026-08-20T18:10:00.000Z",
    request: {
      operation_id: operation,
      intent: "apply",
      action,
      adapter_id: "adapter.filesystem",
      resource_scope: ["src/components/CheckoutSummary.tsx"],
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
      resource_scope: ["src/components/CheckoutSummary.tsx"],
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
    verification_plan_ref: "verify_fixture_delete_workspace_v1",
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

  const deterministicCommands = [
    ["doctor"],
    ["discover"],
    ["model"],
    ["research", "ingest", "--packet", patternPacket],
    ["review"],
    ["strategy", "--provider", "recorded"],
    ["draft", "--provider", "recorded"],
    ["rewrite", "--provider", "recorded"],
  ];

  const firstInit = await runCli(projectA, verificationRoot, networkGuard, ["init", "--yes"]);
  const hostAfterFirstInit = await treeSnapshot(projectA, (path) => !path.startsWith(".contentmd/") && path !== "CONTENT.md");
  invariant(canonical(initialProduct) === canonical(hostAfterFirstInit), "adoption.host-preservation", "init preserved every host file byte");
  const secondInit = await runCli(projectA, verificationRoot, networkGuard, ["init", "--yes"]);
  invariant(secondInit.data.created_paths.length === 0, "adoption.idempotence", "second init created no files");
  await runCli(projectB, verificationRoot, networkGuard, ["init", "--yes"]);
  invariant(firstInit.data.created_paths.length === 4, "adoption.first-write", "first init created only four approved files");

  const outputsA = [];
  const outputsB = [];
  for (const command of deterministicCommands) {
    const accepted = command[0] === "review" ? [10] : [0];
    outputsA.push(await runCli(projectA, verificationRoot, networkGuard, command, accepted));
    outputsB.push(await runCli(projectB, verificationRoot, networkGuard, command, accepted));
  }
  const deterministicDigests = outputsA.map((output, index) => {
    const left = sha256(canonical(portable(output.data, projectA)));
    const right = sha256(canonical(portable(outputsB[index].data, projectB)));
    invariant(left === right, `determinism.${deterministicCommands[index].join(".")}`, `digests ${left} and ${right}`);
    return left;
  });
  invariant(
    outputsA.slice(-3).every((output) => output.data.model_trace?.deterministic_status === "recorded_exact"),
    "provider.recorded-exact",
    "strategy, draft, and rewrite matched exact recorded requests",
  );

  const decisionPath = join(projectA, ".contentmd-test/decision-verifier.json");
  await writeFile(decisionPath, `${JSON.stringify(decisionInput(), null, 2)}\n`);
  await runCli(projectA, verificationRoot, networkGuard, ["decision", "record", "--file", decisionPath]);
  const learn = await runCli(projectA, verificationRoot, networkGuard, ["learn"], [20]);
  invariant(learn.data.disposition === "not_authorized", "learning.fail-closed", "CLI does not infer learning permission");
  await runCli(projectA, verificationRoot, networkGuard, ["diff", "--proposal", "prop_fixture_delete_workspace_v1"]);

  const beforePreview = await treeSnapshot(projectA, (path) => !path.startsWith(".contentmd/"));
  await runCli(projectA, verificationRoot, networkGuard, ["apply", "--transaction", "txn_fixture_delete_workspace_v1", "--preview"]);
  const afterPreview = await treeSnapshot(projectA, (path) => !path.startsWith(".contentmd/"));
  invariant(canonical(beforePreview) === canonical(afterPreview), "mutation.preview-non-effect", "preview changed no product or host file");
  const approvalPath = join(projectA, ".contentmd/governance/approvals/apr_fixture_delete_workspace_v1.json");
  let missingApproval = false;
  try { await stat(approvalPath); } catch { missingApproval = true; }
  invariant(missingApproval, "mutation.no-auto-approval", "preview did not create approval");

  const denied = await runCli(projectA, verificationRoot, networkGuard, ["apply", "--transaction", "txn_fixture_delete_workspace_v1"], [21]);
  invariant(denied.status === "denied_by_governance", "mutation.unauthorized-denied", "apply without approval is denied");
  const transaction = JSON.parse(await readFile(join(projectA, ".contentmd/runtime/transactions/txn_fixture_delete_workspace_v1.json"), "utf8"));
  await mkdir(dirname(approvalPath), { recursive: true });
  await writeFile(approvalPath, `${JSON.stringify(authorization(transaction, "apply"), null, 2)}\n`);
  const beforeApply = await treeSnapshot(projectA, (path) => !path.startsWith(".contentmd/"));
  await runCli(projectA, verificationRoot, networkGuard, ["apply", "--transaction", transaction.transaction_id, "--approval", "apr_fixture_delete_workspace_v1"]);
  await runCli(projectA, verificationRoot, networkGuard, ["verify", "--transaction", transaction.transaction_id]);
  const afterApply = await treeSnapshot(projectA, (path) => !path.startsWith(".contentmd/"));
  const changedFiles = Object.keys(afterApply).filter((path) => beforeApply[path] !== afterApply[path]);
  invariant(changedFiles.length === 1 && changedFiles[0] === "src/components/CheckoutSummary.tsx", "mutation.exact-one-file", `changed: ${changedFiles.join(",")}`);
  invariant((await readFile(join(projectA, changedFiles[0]), "utf8")).includes("Delete this workspace"), "mutation.readback", "approved bytes are present");

  const rollbackPath = join(projectA, ".contentmd/governance/approvals/apr_fixture_delete_workspace_rollback_v1.json");
  await writeFile(rollbackPath, `${JSON.stringify(authorization(transaction, "rollback"), null, 2)}\n`);
  await runCli(projectA, verificationRoot, networkGuard, ["rollback", "--transaction", transaction.transaction_id, "--approval", "apr_fixture_delete_workspace_rollback_v1"]);
  const afterRollback = await treeSnapshot(projectA, (path) => !path.startsWith(".contentmd/"));
  invariant(canonical(afterRollback) === canonical(beforeApply), "mutation.rollback", "rollback restored exact pre-apply bytes");

  const uninstall = await runCli(projectA, verificationRoot, networkGuard, ["uninstall", "--preview"]);
  invariant(uninstall.data.removed === false, "uninstall.preview-only", "uninstall preview performed no removal");
  invariant(
    canonical(uninstall.data.owned_files) === canonical([
      ".contentmd/governance/starter-policy.yaml",
      ".contentmd/manifest.json",
      ".contentmd/product/open-questions.json",
      "CONTENT.md",
    ]),
    "uninstall.owned-only",
    "preview listed only installer-owned manifest files",
  );
  invariant(uninstall.data.host_files_affected.length === 0, "uninstall.host-non-effect", "no host file is listed");
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
  const build = await run("pnpm", ["build"]);
  invariant(build.code === 0, "runtime.build", build.stderr.trim() || "compiled JavaScript build passed");
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
