import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { constants as fsConstants } from "node:fs";
import {
  cp,
  copyFile,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readlink,
  readdir,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promisify } from "node:util";
import { DatabaseSync } from "node:sqlite";
import { canonicalJson, sha256Canonical } from "../packages/core/dist/index.js";
import {
  RUNTIME_INTERFACE_IDS,
  RuntimeError,
} from "../packages/runtime-sdk/dist/index.js";
import {
  LocalRuntimeDetector,
  LocalRuntimeOperationAuthority,
  LocalRuntimeSqliteLedger,
  createLocalRuntime,
} from "../packages/runtime-local/dist/index.js";

const execute = promisify(execFile);
const workspaceRoot = fileURLToPath(new URL("../", import.meta.url));
const nodePath = "/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node";
const pnpmPath = "/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm";
const cliPath = join(workspaceRoot, "packages/cli/dist/main.js");
const planPath = join(workspaceRoot, "docs/superpowers/plans/2026-08-20-contentmd-portable-runtime.md");
const startedAt = new Date().toISOString();
const checks = [];
const failures = [];
const fixtureDigests = {};
const temporaryRoots = [];

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function record(checkId, passed, detail) {
  const check = Object.freeze({ check_id: checkId, status: passed ? "pass" : "fail", detail });
  checks.push(check);
  if (!passed) failures.push(`${checkId}:${detail}`);
  return passed;
}

function invariant(condition, checkId, detail) {
  if (!record(checkId, Boolean(condition), detail)) throw new Error(`${checkId}:${detail}`);
}

async function run(command, args, options = {}) {
  try {
    const result = await execute(command, args, {
      cwd: options.cwd ?? workspaceRoot,
      env: options.env ?? process.env,
      maxBuffer: options.maxBuffer ?? 64 * 1024 * 1024,
      ...(options.timeout === undefined ? {} : { timeout: options.timeout }),
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

async function freshRoot(prefix) {
  const root = await mkdtemp(join(tmpdir(), prefix));
  temporaryRoots.push(root);
  return root;
}

async function walk(root, directory = root) {
  const output = [];
  for (const entry of (await readdir(directory, { withFileTypes: true }))
    .sort((left, right) => left.name < right.name ? -1 : left.name > right.name ? 1 : 0)) {
    const absolute = join(directory, entry.name);
    const path = relative(root, absolute).split(sep).join("/");
    if (entry.isDirectory()) output.push(...await walk(root, absolute));
    else if (entry.isFile()) output.push({ path, kind: "file", digest: sha256(await readFile(absolute)) });
    else if (entry.isSymbolicLink()) output.push({ path, kind: "symlink", digest: sha256(await readlink(absolute)) });
  }
  return output;
}

async function treeDigest(root) {
  return sha256Canonical(await walk(root));
}

async function copyWorkspaceManifests(target) {
  for (const file of ["package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml"]) {
    await cp(join(workspaceRoot, file), join(target, file));
  }
  for (const entry of await readdir(join(workspaceRoot, "packages"), { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const source = join(workspaceRoot, "packages", entry.name, "package.json");
    try {
      await mkdir(join(target, "packages", entry.name), { recursive: true });
      await cp(source, join(target, "packages", entry.name, "package.json"));
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
}

async function cloneTree(sourceRoot, targetRoot) {
  const files = [];
  async function inventory(source, target) {
    await mkdir(target, { recursive: true });
    for (const entry of await readdir(source, { withFileTypes: true })) {
      const sourcePath = join(source, entry.name);
      const targetPath = join(target, entry.name);
      if (entry.isDirectory()) await inventory(sourcePath, targetPath);
      else if (entry.isFile()) files.push([sourcePath, targetPath]);
    }
  }
  await inventory(sourceRoot, targetRoot);
  for (let index = 0; index < files.length; index += 64) {
    await Promise.all(files.slice(index, index + 64).map(([source, target]) => (
      copyFile(source, target, fsConstants.COPYFILE_FICLONE)
    )));
  }
}

async function verifyRuntimeAndCleanInstall() {
  const [major, minor] = process.versions.node.split(".").map(Number);
  invariant(major === 24 && minor >= 14, "runtime.node-range", `Node ${process.versions.node}`);
  invariant(await realpath(process.execPath) === await realpath(nodePath), "runtime.exec-path", process.execPath);

  // This is intentionally the immediately following child process after the exec-path assertion.
  const installRoot = await freshRoot("contentmd-portable-install-");
  await copyWorkspaceManifests(installRoot);
  process.stderr.write("portable-runtime clean-install: manifests copied\n");
  const modulesMetadata = await readFile(join(workspaceRoot, "node_modules/.modules.yaml"), "utf8");
  const storeMatch = /^\s*["']?storeDir["']?:\s*["']([^"']+)["']\s*,?\s*$/mu.exec(modulesMetadata);
  invariant(storeMatch !== null, "runtime.clean-install-store", "active content-addressed store is recorded");
  const activeStoreRoot = dirname(await realpath(storeMatch[1]));
  const isolatedStoreRoot = join(installRoot, ".pnpm-store");
  await cloneTree(activeStoreRoot, isolatedStoreRoot);
  process.stderr.write("portable-runtime clean-install: store cloned\n");
  await writeFile(
    join(installRoot, ".npmrc"),
    `store-dir=${isolatedStoreRoot}\noffline=true\n`,
    "utf8",
  );
  const pnpmCli = resolve(dirname(process.execPath), "../node_modules/pnpm/bin/pnpm.mjs");
  const pnpmVersion = await run(process.execPath, [pnpmCli, "--version"]);
  invariant(
    pnpmVersion.code === 0 && pnpmVersion.stdout.trim() === "11.9.0",
    "runtime.pnpm-version",
    pnpmVersion.stderr.trim() || pnpmVersion.stdout.trim(),
  );
  const installed = await run(pnpmPath, [
    "install", "--frozen-lockfile", "--ignore-scripts", "--prefer-offline",
  ], {
    cwd: installRoot,
    timeout: 30_000,
    env: {
      ...process.env,
      npm_config_offline: "true",
      npm_config_store_dir: isolatedStoreRoot,
      npm_config_trust_lockfile: "true",
      npm_config_frozen_store: "true",
      PNPM_CONFIG_OFFLINE: "true",
      PNPM_CONFIG_STORE_DIR: isolatedStoreRoot,
      PNPM_CONFIG_TRUST_LOCKFILE: "true",
      PNPM_CONFIG_FROZEN_STORE: "true",
    },
  });
  invariant(installed.code === 0, "runtime.clean-install", installed.stderr || installed.stdout);
  invariant(/downloaded 0|Already up to date/u.test(installed.stdout), "runtime.clean-install-offline-evidence", "no package download was required");
}

async function verifyDependencyExclusion() {
  const manifestPaths = [join(workspaceRoot, "package.json")];
  for (const entry of await readdir(join(workspaceRoot, "packages"), { withFileTypes: true })) {
    if (entry.isDirectory()) manifestPaths.push(join(workspaceRoot, "packages", entry.name, "package.json"));
  }
  const forbiddenDependencies = [];
  for (const path of manifestPaths) {
    let manifest;
    try { manifest = JSON.parse(await readFile(path, "utf8")); } catch { continue; }
    for (const group of ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"]) {
      for (const name of Object.keys(manifest[group] ?? {})) {
        if (name === "agents" || name === "wrangler" || name.startsWith("@cloudflare/")) {
          forbiddenDependencies.push(`${relative(workspaceRoot, path)}:${group}:${name}`);
        }
      }
    }
  }
  const forbiddenImports = [];
  for (const { path, kind } of await walk(join(workspaceRoot, "packages"))) {
    if (kind !== "file") continue;
    if (!/\/src\/.*\.(?:c|m)?(?:j|t)s$/u.test(`/${path}`)) continue;
    const source = await readFile(join(workspaceRoot, "packages", path), "utf8");
    const specs = [...source.matchAll(/(?:from\s*|import\s*\(|require\s*\()\s*["']([^"']+)["']/gu)]
      .map((match) => match[1]);
    for (const spec of specs) {
      if (spec === "agents" || spec === "wrangler" || spec.startsWith("@cloudflare/")) {
        forbiddenImports.push(`${path}:${spec}`);
      }
    }
  }
  invariant(forbiddenDependencies.length === 0, "supply-chain.forbidden-dependencies", JSON.stringify(forbiddenDependencies));
  invariant(forbiddenImports.length === 0, "supply-chain.forbidden-imports", JSON.stringify(forbiddenImports));
}

async function verifyPackageAndSchemaClosure() {
  const packages = [
    ["runtime-sdk", "@contentmd/runtime-sdk"],
    ["runtime-local", "@contentmd/runtime-local"],
  ];
  for (const [directory, packageName] of packages) {
    const manifest = JSON.parse(await readFile(join(workspaceRoot, "packages", directory, "package.json"), "utf8"));
    invariant(manifest.name === packageName && manifest.version === "0.1.0", `packages.${directory}.manifest`, `${manifest.name}@${manifest.version}`);
    const sourceIndex = await readFile(join(workspaceRoot, "packages", directory, "src/index.ts"), "utf8");
    invariant(sourceIndex.length > 0, `packages.${directory}.source-closure`, "public source index exists");
    invariant((await lstat(join(workspaceRoot, "packages", directory, "dist/index.js"))).isFile(), `packages.${directory}.build-closure`, "compiled public index exists");
  }
  const schema = JSON.parse(await readFile(join(workspaceRoot, "packages/schemas/src/runtime-records.schema.json"), "utf8"));
  const requiredFamilies = [
    "runtimeDetectionReportRecord", "runtimeProposalRecord", "runtimeBindingDecisionRecord",
    "runtimeBindingRecord", "runtimeConformanceReceiptRecord", "replicaArtifactManifestRecord",
    "replicaAckRecord",
  ];
  invariant(requiredFamilies.every((key) => schema.$defs?.[key] !== undefined), "schemas.runtime-family-closure", requiredFamilies.join(","));
  const schemaTest = await run(nodePath, [
    "node_modules/vitest/vitest.mjs", "run", "packages/runtime-sdk/test/schema-contract.test.ts",
    "packages/schemas/test/schema-registry.test.ts", "--maxWorkers=1",
  ]);
  invariant(schemaTest.code === 0, "schemas.runtime-validation", schemaTest.stderr || schemaTest.stdout);
}

async function verifyBoundaries() {
  const result = await run(nodePath, ["scripts/check-package-boundaries.mjs"]);
  invariant(result.code === 0, "packages.boundaries", result.stderr || result.stdout.trim());
}

async function writeNetworkGuard(path) {
  await writeFile(path, `
import net from "node:net";
import tls from "node:tls";
import http from "node:http";
import https from "node:https";
import dns from "node:dns";
const deny = () => { throw new Error("portable_runtime_network_denied"); };
for (const module of [net, tls, http, https]) for (const key of ["connect", "createConnection", "request", "get"]) {
  if (typeof module[key] === "function") module[key] = deny;
}
for (const key of ["lookup", "resolve", "resolve4", "resolve6", "resolveAny"]) if (typeof dns[key] === "function") dns[key] = deny;
globalThis.fetch = async () => { throw new Error("portable_runtime_network_denied"); };
process.env.CONTENTMD_PORTABLE_RUNTIME_NETWORK_DENIED = "1";
`, "utf8");
}

async function runCli(projectRoot, guardPath, args, accepted = [0]) {
  const result = await run(nodePath, [
    "--import", guardPath,
    cliPath, ...args, "--root", projectRoot, "--json",
  ]);
  let envelope;
  try { envelope = JSON.parse(result.stdout); } catch {
    throw new Error(`runtime_cli_non_json:${result.stdout}:${result.stderr}`);
  }
  if (!accepted.includes(result.code)) throw new Error(`runtime_cli_exit:${result.code}:${result.stderr}:${result.stdout}`);
  return { ...result, envelope };
}

function localConformance(now = "2026-08-23T12:00:00.000Z") {
  const receipts = RUNTIME_INTERFACE_IDS.map((interfaceId) => {
    const implementationDigest = sha256Canonical({ contract_version: "contentmd.local-implementation/0.1.0", interface_id: interfaceId });
    const preimage = {
      schema_version: "0.1.0",
      receipt_id: `runtime.conformance.${interfaceId.slice("runtime.".length).replaceAll("-", ".")}`,
      interface_id: interfaceId,
      interface_version: "0.1.0",
      implementation_id: `runtime.local.${interfaceId.slice("runtime.".length)}`,
      implementation_version: "0.1.0",
      implementation_digest: implementationDigest,
      fixture_trace_digest: sha256Canonical({ contract_version: "contentmd.local-conformance-trace/0.1.0", interface_id: interfaceId, check_ids: [`${interfaceId}.conformance`] }),
      passed_check_ids: [`${interfaceId}.conformance`],
      failed_check_ids: [],
      node_version: "24.14.0",
      issued_at: now,
    };
    return { ...preimage, receipt_digest: sha256Canonical(preimage) };
  });
  const byInterface = new Map(receipts.map((item) => [item.interface_id, item]));
  const descriptorPreimage = {
    descriptor_id: "runtime.descriptor.local.complete",
    descriptor_version: "0.1.0",
    runtime_id: "runtime.local",
    runtime_version: "0.1.0",
    integration_mode: "sidecar",
    environment_family: "node-local",
    supported_host_versions: [">=24.14.0 <25"],
    interface_bindings: RUNTIME_INTERFACE_IDS.map((interfaceId) => {
      const item = byInterface.get(interfaceId);
      return {
        interface_id: interfaceId,
        interface_version: "0.1.0",
        status: "supported",
        implementation_id: item.implementation_id,
        implementation_version: item.implementation_version,
        implementation_digest: item.implementation_digest,
        semantics_digest: sha256Canonical({ contract_version: "contentmd.local-semantics/0.1.0", interface_id: interfaceId }),
        conformance_receipt_ref: { record_id: item.receipt_id, record_version: 1, content_digest: item.receipt_digest },
      };
    }),
    consistency_model: "single_writer_strong",
    retry_semantics: "explicit_authorized_only",
    data_locations: ["adopter-controlled-local"],
    retention_behavior: "policy_bound",
    encryption_behavior: "platform-filesystem",
    identity_provider: "runtime.local.identity",
    authentication_provider: "runtime.local.authentication",
    telemetry_behavior: "minimized",
    package_requirements: [],
    infrastructure_requirements: [],
  };
  return { receipts, descriptor: { ...descriptorPreimage, descriptor_digest: sha256Canonical(descriptorPreimage) } };
}

async function installLocalProfile(projectRoot) {
  const conformance = localConformance();
  const path = join(projectRoot, ".contentmd/runtime/local-runtime-profile.json");
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, canonicalJson({ contract_version: "contentmd.local-runtime-profile/0.1.0", descriptors: [conformance.descriptor] }), { mode: 0o600 });
  return conformance;
}

async function verifyDetection() {
  const verificationRoot = await freshRoot("contentmd-portable-detection-");
  const guard = join(verificationRoot, "network-denial.mjs");
  await writeNetworkGuard(guard);
  const secretRoot = await freshRoot("contentmd-portable-secret-");
  const secretCanary = "CONTENTMD_PORTABLE_RUNTIME_MUST_NOT_READ=secret-canary-bytes\n";
  await writeFile(join(secretRoot, "environment.canary"), secretCanary, { mode: 0o600 });
  const localRoot = join(verificationRoot, "node-local");
  await cp(join(workspaceRoot, "fixtures/runtime-hosts/node-local"), localRoot, { recursive: true });
  await import("node:fs/promises").then(({ symlink }) => symlink(join(secretRoot, "environment.canary"), join(localRoot, ".env")));
  const before = await treeDigest(localRoot);
  const inspected = await runCli(localRoot, guard, ["runtime", "inspect"]);
  const after = await treeDigest(localRoot);
  invariant(inspected.envelope.data.authority_effect === "none", "detection.authority-effect", "inspect is authority-free");
  invariant(before === after, "detection.fixture-non-effect", `${before}:${after}`);
  invariant(!`${inspected.stdout}${inspected.stderr}`.includes("secret-canary-bytes"), "detection.env-canary", "canary bytes were neither read nor emitted");
  invariant(inspected.envelope.data.unknowns.includes("live_deployment_status"), "detection.live-status-unknown", "deployment state remains unknown");
  const inspectedReads = [];
  const detector = new LocalRuntimeDetector({
    filesystem: {
      realpath,
      lstat,
      async readFile(path) {
        inspectedReads.push(path);
        if (path.endsWith(`${sep}.env`)) throw new Error("portable_runtime_env_canary_read");
        return readFile(path, "utf8");
      },
    },
    clock: () => "2026-08-23T12:00:00.000Z",
  });
  await detector.inspect(localRoot);
  invariant(
    inspectedReads.length === 1 && inspectedReads[0] === join(await realpath(localRoot), "package.json"),
    "detection.env-canary-read-boundary",
    JSON.stringify(inspectedReads),
  );
  fixtureDigests.node_local = before;

  const cloudflareRoot = join(verificationRoot, "cloudflare-candidate");
  await cp(join(workspaceRoot, "fixtures/runtime-hosts/cloudflare-candidate"), cloudflareRoot, { recursive: true });
  const cloudflareBefore = await treeDigest(cloudflareRoot);
  await installLocalProfile(cloudflareRoot);
  const proposal = await runCli(cloudflareRoot, guard, ["runtime", "propose"]);
  const candidate = proposal.envelope.data.candidates.find((item) => item.runtime_id === "runtime.cloudflare-agents");
  invariant(candidate?.bindable === false && candidate?.availability === "adapter_unavailable_pending_plan_4", "detection.cloudflare-nonbindable", JSON.stringify(candidate));
  invariant(proposal.envelope.data.recommended_runtime_id === "runtime.local", "detection.cloudflare-local-fallback", proposal.envelope.data.recommended_runtime_id);
  fixtureDigests.cloudflare_candidate_before_profile = cloudflareBefore;
}

function seal(preimage, digestKey) {
  return { ...preimage, [digestKey]: sha256Canonical(preimage) };
}

function localBinding(conformance) {
  const descriptor = conformance.descriptor;
  return {
    contract_version: "contentmd.runtime-binding/0.1.0",
    binding_id: "runtime.binding.project.runtime.verifier",
    binding_version: 1,
    project_id: "project.runtime.verifier",
    status: "active",
    proposal_ref: "runtime.proposal.verifier",
    proposal_digest: "a".repeat(64),
    decision_ref: "runtime.binding-decision.verifier",
    decision_digest: "b".repeat(64),
    descriptor_ref: descriptor.descriptor_id,
    descriptor_digest: descriptor.descriptor_digest,
    integration_mode: descriptor.integration_mode,
    canonical_replica: { runtime_id: "runtime.local", data_location_id: "runtime.local.canonical" },
    interface_bindings: descriptor.interface_bindings,
    consistency_model: "single_writer_strong",
    transaction_boundary: "sqlite_immediate_transaction",
    idempotency_behavior: "event_id_plus_digest",
    retry_behavior: "explicit_authorized_only",
    ambiguous_outcome_behavior: "read_before_retry",
    identity_provider: descriptor.identity_provider,
    authentication_provider: descriptor.authentication_provider,
    secret_resolver: "runtime.local.environment",
    data_locations: [{ location_id: "runtime.local.canonical", data_class: "runtime-metadata", role: "canonical_replica" }],
    retention: { mode: "policy_bound", policy_ref: "policy.runtime.retention" },
    encryption: { at_rest: "platform-filesystem", in_transit: "not_applicable" },
    telemetry: { mode: "minimized", data_classes: ["runtime-metadata"] },
    health_checks: ["runtime.node", "runtime.sqlite"],
    cleanup: { mode: "explicit_authorized" },
    export: { mode: "canonical_verified" },
    adapter_digests: [{ adapter_id: "runtime.local", adapter_digest: descriptor.descriptor_digest }],
    conformance_receipts: conformance.receipts.map((item) => ({ record_id: item.receipt_id, record_version: 1, content_digest: item.receipt_digest })),
    issued_at: "2026-08-23T12:00:00.000Z",
    predecessor_binding_digest: null,
  };
}

async function expectDenied(label, call, root, baseline) {
  let errorText = "";
  try { await call(); } catch (error) { errorText = String(error?.message ?? error); }
  invariant(errorText.includes("runtime_binding_not_authorized"), `authority.forged.${label}`, errorText || "operation unexpectedly succeeded");
  invariant(await runtimeStateDigest(root) === baseline, `authority.no-state-change.${label}`, "forged operation changed no runtime state");
}

async function runtimeStateDigest(root) {
  const files = await walk(root);
  const ordinary = files
    .filter((item) => item.kind === "file" && !/\.sqlite(?:-wal|-shm)?$/u.test(item.path))
    .map((item) => ({ path: item.path, digest: item.digest }));
  const databases = [];
  for (const item of files.filter((entry) => entry.kind === "file" && /\.sqlite$/u.test(entry.path))) {
    const database = new DatabaseSync(join(root, item.path), { readOnly: true });
    const tables = database.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
    const counts = tables.map(({ name }) => ({ table: name, count: Number(database.prepare(`SELECT COUNT(*) AS count FROM \"${String(name).replaceAll('"', '""')}\"`).get().count) }));
    database.close();
    databases.push({ path: item.path, counts });
  }
  return sha256Canonical({ ordinary, databases });
}

async function verifyForgedCapabilityDenial() {
  const root = await freshRoot("contentmd-portable-authority-");
  const conformance = localConformance();
  const binding = localBinding(conformance);
  const authority = { async resolveAndClaim() { throw new RuntimeError("runtime_binding_not_authorized", "forged_operation"); } };
  const runtime = createLocalRuntime({
    project_root: root,
    descriptor: conformance.descriptor,
    conformance_receipts: conformance.receipts,
    binding,
    authority,
    identity_resolver: { async resolve() { return { status: "current", tenant_ref: "tenant.verifier", principal_ref: "principal.verifier", workload_ref: "workload.contentmd", project_ref: binding.project_id, expires_at: "2026-08-23T13:00:00.000Z", identity_digest: "c".repeat(64) }; } },
    job_handlers: { verify: async () => ({ output_ref: null, output_digest: null }) },
    rpc_input_schemas: { "schema.verify": () => true },
    rpc_handlers: { verify: async () => ({ output_ref: null, output_digest: null }) },
    allowed_secret_source_names: ["CONTENTMD_VERIFY_SECRET"],
    read_environment: () => undefined,
    permitted_data_classes: ["runtime-metadata"],
    blob_reference_resolver: { async currentReferences() { return []; } },
    replica_artifact_repository: { async verify() { return null; } },
    snapshot_provider: { async collect() { return []; } },
    health_checks: {},
    clock: () => "2026-08-23T12:00:00.000Z",
    node_version: "24.14.0",
  });
  const forged = Object.freeze({ capability_ref: "capability.forged", capability_digest: "0".repeat(64), verifier_id: "runtime.local.operation-authority" });
  const ingressPreimage = { schema_version: "0.1.0", request_id: "ingress.verifier", tenant_ref: "tenant.verifier", principal_attestation_ref: "attestation.verifier", workload_ref: "workload.contentmd", project_ref: binding.project_id, connection_ref: "connection.verifier", requested_at: "2026-08-23T12:00:00.000Z" };
  const session = await runtime.ingress.authenticate(seal(ingressPreimage, "request_digest"));
  const baseline = await runtimeStateDigest(root);
  const job = seal({ schema_version: "0.1.0", job_id: "job.verifier", project_id: binding.project_id, runtime_binding_digest: binding.descriptor_digest, handler_id: "verify", input_ref: "input.verifier", input_digest: "d".repeat(64), requested_at: "2026-08-23T12:00:00.000Z" }, "job_digest");
  const approval = seal({ schema_version: "0.1.0", pause_id: "pause.verifier", project_id: binding.project_id, runtime_binding_digest: binding.descriptor_digest, subject_ref: "subject.verifier", subject_digest: "e".repeat(64), approval_class: "runtime", requested_at: "2026-08-23T12:00:00.000Z", expires_at: "2026-08-23T13:00:00.000Z" }, "request_digest");
  const progress = seal({ schema_version: "0.1.0", event_id: "progress.verifier", operation_id: "operation.verifier", project_id: binding.project_id, runtime_binding_digest: binding.descriptor_digest, sequence: 1, predecessor_digest: null, status: "running", message: "Verifying", occurred_at: "2026-08-23T12:00:00.000Z" }, "event_digest");
  const exportRequest = seal({ schema_version: "0.1.0", export_id: "export.verifier", project_id: binding.project_id, runtime_binding_digest: binding.descriptor_digest, checkpoint_ref: "checkpoint.verifier", checkpoint_digest: "f".repeat(64), requested_at: "2026-08-23T12:00:00.000Z" }, "request_digest");
  const schedule = seal({ schema_version: "0.1.0", schedule_id: "schedule.verifier", project_id: binding.project_id, runtime_binding_digest: binding.descriptor_digest, governed_job_ref: job.job_id, governed_job_digest: job.job_digest, schedule_expression: "0 0 * * *", timezone: "UTC", next_occurrence: "2026-08-24T00:00:00.000Z" }, "schedule_digest");
  const rpc = { schema_version: "0.1.0", request_id: "rpc.verifier", project_id: binding.project_id, runtime_binding_digest: binding.descriptor_digest, method: "verify", input_schema_id: "schema.verify", input: {}, input_digest: sha256Canonical({}) };
  const secret = seal({ schema_version: "0.1.0", secret_ref_id: "secret.verifier", project_id: binding.project_id, resolver_id: "runtime.local.environment", source_name: "CONTENTMD_VERIFY_SECRET", allowed_adapter_ids: ["runtime.local"], purpose: "verification", issued_at: "2026-08-23T11:59:00.000Z", expires_at: "2026-08-23T13:00:00.000Z" }, "ref_digest");
  const cleanup = seal({ schema_version: "0.1.0", request_id: "cleanup.verifier", project_id: binding.project_id, runtime_binding_digest: binding.descriptor_digest, object_classes: ["progress"], older_than: "2026-08-23T11:00:00.000Z", requested_at: "2026-08-23T12:00:00.000Z" }, "request_digest");
  const batch = { schema_version: "0.1.0", batch_id: "batch.verifier", project_id: binding.project_id, runtime_binding_digest: binding.descriptor_digest, events: [], manifest: { entries: [] }, batch_digest: "1".repeat(64) };
  const bytes = new TextEncoder().encode("portable-runtime-verifier");
  const blob = { schema_version: "0.1.0", blob_id: "blob.verifier", project_id: binding.project_id, runtime_binding_digest: binding.descriptor_digest, media_type: "text/plain", schema_id: null, data_class: "runtime-metadata", disposition: "required", export_permission: "permitted", parent_refs: [], retention_ref: "policy.runtime.retention", bytes, sha256_digest: sha256(bytes) };
  const calls = [
    ["event-store", () => runtime.eventStore.open(binding, forged)],
    ["jobs", () => runtime.jobs.start(job, forged)],
    ["approval-pause", () => runtime.approvals.pause(approval, forged)],
    ["progress", () => runtime.progress.publish(progress, forged)],
    ["export", () => runtime.exporter.exportSnapshot(exportRequest, forged)],
    ["blob-store", () => runtime.blobs.put(blob, forged)],
    ["scheduler", () => runtime.scheduler.schedule(schedule, forged)],
    ["ingress", () => runtime.ingress.invoke(session, rpc, forged)],
    ["secrets", () => runtime.secrets.resolve(secret, forged)],
    ["sync", () => runtime.sync.push(batch, forged)],
    ["health", () => runtime.health.inspect(binding, forged)],
    ["cleanup", () => runtime.cleanup.clean(cleanup, forged)],
  ];
  for (const [label, call] of calls) await expectDenied(label, call, root, baseline);
  runtime.close();
}

async function verifySingleUseReplay() {
  const root = await freshRoot("contentmd-portable-replay-");
  const ledger = new LocalRuntimeSqliteLedger(join(root, "runtime.sqlite"));
  const authorizationRef = { record_id: "authorization.verifier", record_version: 1, content_digest: "a".repeat(64) };
  const claims = {
    capability_id: "capability.verifier", tenant_ref: "tenant.verifier", principal_ref: "principal.verifier", workload_ref: "workload.contentmd", project_ref: "project.runtime.verifier",
    action: "runtime.event.append", resources: [{ resource_id: "stream.verifier", content_digest: null }], data_classes: ["runtime-metadata"],
    policy_refs: [{ record_id: "policy.verifier", record_version: 1, content_digest: "b".repeat(64) }], capability_grant_ref: { record_id: "grant.verifier", record_version: 1, content_digest: "c".repeat(64) }, control_refs: [],
    resource_limits: { calls: 1, bytes: 1024, duration_ms: 1000, records: 1, model_tokens: 0, browser_actions: 0, retries: 0 },
    issued_at: "2026-08-23T11:59:00.000Z", expires_at: "2026-08-23T13:00:00.000Z", revocation_checkpoint: { stream_id: "governance.verifier", sequence: 1, head_digest: "d".repeat(64) }, nonce: "nonce.verifier", nonce_mode: "single_use", runtime_binding_digest: "e".repeat(64), audit_target: { stream_id: "audit.verifier", data_class: "runtime-metadata" },
  };
  const resolver = { async resolve(ref) { if (canonicalJson(ref) !== canonicalJson(authorizationRef)) throw new Error("missing"); return { disposition: "allow", claims_digest: sha256Canonical(claims), authorization_digest: authorizationRef.content_digest }; }, async recheckCurrentness() { return "current"; } };
  const authority = new LocalRuntimeOperationAuthority({ ledger, authorization_resolver: resolver, clock: () => "2026-08-23T12:00:00.000Z", verifier_id: "runtime.local.operation-authority" });
  const operation = await authority.issue(authorizationRef, claims);
  const effectPreimage = { interface_id: "runtime.event-store", method: "append", action: claims.action, resources: claims.resources, data_classes: claims.data_classes, requested_limits: claims.resource_limits, runtime_binding_digest: claims.runtime_binding_digest };
  const effect = { ...effectPreimage, effect_digest: sha256Canonical(effectPreimage) };
  await authority.resolveAndClaim(operation, effect);
  let replayError = "";
  try { await authority.resolveAndClaim(operation, effect); } catch (error) { replayError = String(error?.message ?? error); }
  invariant(replayError.includes("runtime_operation_nonce_replayed"), "authority.single-use-replay", replayError);
  ledger.close();
}

async function verifyReplicaAndExport() {
  const tracePath = join(workspaceRoot, "fixtures/runtime-traces/canonical-replica.jsonl");
  const traceBytes = await readFile(tracePath);
  fixtureDigests.canonical_replica_trace = sha256(traceBytes);
  const traceLines = traceBytes.toString("utf8").trim().split("\n").map((line) => JSON.parse(line));
  invariant(traceLines.length === 4, "replica.trace-shape", `${traceLines.length} canonical steps`);
  const traceCheck = await run(nodePath, ["--import", "tsx", "scripts/generate-runtime-replica-trace.mts", "--check"]);
  invariant(traceCheck.code === 0, "replica.trace-replay", traceCheck.stderr || traceCheck.stdout);
  const replicaTests = await run(nodePath, [
    "node_modules/vitest/vitest.mjs", "run", "packages/runtime-local/test/replica-protocol.test.ts",
    "-t", "prevents host persistence until canonical storage|restores event, manifest, checkpoint, acknowledgement, and blob bytes after host loss",
    "--maxWorkers=1",
  ]);
  invariant(replicaTests.code === 0, "replica.canonical-first-and-host-loss", replicaTests.stderr || replicaTests.stdout);
  const exportTest = await run(nodePath, [
    "node_modules/vitest/vitest.mjs", "run", "packages/runtime-local/test/boundary-services.test.ts",
    "-t", "writes a mode-0700 verified export with an independently hashed manifest",
    "--maxWorkers=1",
  ]);
  invariant(exportTest.code === 0, "export.permitted-bundle-reverification", exportTest.stderr || exportTest.stdout);
}

async function writeBindingFixtureTool(path) {
  const fixtureUrl = pathToFileURL(join(workspaceRoot, "packages/agent/test/runtime-binding-authority-fixture.ts")).href;
  const memoryUrl = pathToFileURL(join(workspaceRoot, "packages/memory/src/sqlite-event-store.ts")).href;
  const coreUrl = pathToFileURL(join(workspaceRoot, "packages/core/src/index.ts")).href;
  await writeFile(path, `
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { canonicalJson } from ${JSON.stringify(coreUrl)};
import { BINDING_DATA_CLASSES, completeLocalConformance, governedBindingFixture } from ${JSON.stringify(fixtureUrl)};
import { SqliteEventStore } from ${JSON.stringify(memoryUrl)};
const [mode, root, proposalPath, now] = process.argv.slice(2);
const conformance = completeLocalConformance(now);
if (mode === "profile") {
  const profilePath = join(root, ".contentmd/runtime/local-runtime-profile.json");
  await mkdir(dirname(profilePath), { recursive: true });
  await writeFile(profilePath, canonicalJson({ contract_version: "contentmd.local-runtime-profile/0.1.0", descriptors: [conformance.descriptor] }), { mode: 0o600 });
  process.stdout.write(JSON.stringify({ descriptor_digest: conformance.descriptor.descriptor_digest }));
} else {
  const proposal = JSON.parse(await readFile(proposalPath, "utf8"));
  const fixture = governedBindingFixture({ proposal, descriptor: conformance.descriptor, receipts: conformance.receipts, now });
  const decisionPath = join(root, ".contentmd/governance/runtime-binding-decisions", fixture.decision.decision_id + ".json");
  const authorityPath = join(root, ".contentmd/governance/runtime-binding-authority.json");
  await mkdir(dirname(decisionPath), { recursive: true });
  await writeFile(decisionPath, canonicalJson(fixture.decision), { mode: 0o600 });
  await writeFile(authorityPath, canonicalJson(fixture.authority_bundle), { mode: 0o600 });
  const store = new SqliteEventStore(join(root, ".contentmd/runtime/events.sqlite"), { permitted_data_classes: BINDING_DATA_CLASSES, runtime_version: "24.14.0" });
  await store.append(fixture.decision_command);
  store.close();
  process.stdout.write(JSON.stringify({ decision_path: decisionPath, binding: fixture.binding, binding_digest: fixture.binding_digest, activation_event_id: fixture.activation_command.event_id, projection: fixture.projection }));
}
`, "utf8");
}

async function verifyGovernedBinding() {
  const root = await freshRoot("contentmd-portable-binding-");
  await cp(join(workspaceRoot, "fixtures/runtime-hosts/node-local"), root, { recursive: true });
  const guard = join(root, "network-denial.mjs");
  await writeNetworkGuard(guard);
  const tool = join(root, "binding-fixture.mts");
  await writeBindingFixtureTool(tool);
  const now = "2026-08-23T12:00:00.000Z";
  const profile = await run(nodePath, ["--import", "tsx", tool, "profile", root, "unused", now]);
  invariant(profile.code === 0, "binding.profile-fixture", profile.stderr || profile.stdout);
  const proposed = await runCli(root, guard, ["runtime", "propose"]);
  const proposalPath = join(root, ".contentmd/runtime/proposals", `${proposed.envelope.data.proposal_id}.json`);
  const prepared = await run(nodePath, ["--import", "tsx", tool, "authority", root, proposalPath, now]);
  invariant(prepared.code === 0, "binding.authority-fixture", prepared.stderr || prepared.stdout);
  const expected = JSON.parse(prepared.stdout);
  const bound = await runCli(root, guard, ["runtime", "bind", "--proposal", proposalPath, "--decision", expected.decision_path]);
  invariant(bound.envelope.data.status === "activated" && bound.envelope.data.binding_digest === expected.binding_digest, "binding.governed-activation", JSON.stringify(bound.envelope.data));
  const projectionPath = join(root, ".contentmd/runtime/current-runtime-binding.json");
  const projection = JSON.parse(await readFile(projectionPath, "utf8"));
  const { projection_digest: suppliedProjectionDigest, ...projectionPreimage } = projection;
  invariant(suppliedProjectionDigest === sha256Canonical(projectionPreimage), "binding.projection-digest", suppliedProjectionDigest);
  invariant(canonicalJson(projection) === canonicalJson(expected.projection), "binding.projection-readback", projection.activation_event_ref);
  const database = new DatabaseSync(join(root, ".contentmd/runtime/events.sqlite"), { readOnly: true });
  const row = database.prepare("SELECT event_id, stream_id, sequence, event_type, occurred_at, actor_ref, data_class, payload_json, payload_digest, predecessor_digest, event_digest FROM events WHERE event_id = ?").get(expected.activation_event_id);
  database.close();
  invariant(row !== undefined, "binding.activation-event-readback", expected.activation_event_id);
  const payload = JSON.parse(row.payload_json);
  invariant(row.payload_digest === sha256Canonical(payload), "binding.activation-payload-digest", row.payload_digest);
  const eventPreimage = { event_id: row.event_id, stream_id: row.stream_id, sequence: row.sequence, schema_version: "0.1.0", event_type: row.event_type, occurred_at: row.occurred_at, actor_ref: row.actor_ref, data_class: row.data_class, payload, predecessor_digest: row.predecessor_digest };
  invariant(row.event_digest === sha256Canonical(eventPreimage), "binding.activation-event-digest", row.event_digest);
  invariant(projection.activation_event_digest === row.event_digest && projection.activation_sequence === row.sequence, "binding.event-projection-binding", row.event_digest);
  fixtureDigests.binding_projection = sha256(await readFile(projectionPath));
}

async function verifyFoundation() {
  const result = await run(nodePath, ["scripts/verify-foundation.mjs"]);
  let receipt;
  try { receipt = JSON.parse(result.stdout.trim().split("\n").at(-1)); } catch { receipt = null; }
  invariant(result.code === 0 && receipt?.status === "passed", "foundation.retained", result.stderr || result.stdout.slice(-4000));
  invariant(receipt.check_count > 0, "foundation.nonzero-checks", `${receipt.check_count}`);
  fixtureDigests.foundation_verifier = receipt.verifier_digest;
}

function parseStatus(text) {
  const entries = new Map();
  for (const line of text.split("\n")) {
    if (line.length < 4) continue;
    entries.set(line.slice(3), line.slice(0, 2));
  }
  return entries;
}

async function verifyWorkspaceMutationBoundary(ledgerPath) {
  const ledger = await readFile(ledgerPath, "utf8");
  const baselineMatch = /## initial_portable_runtime_status[\s\S]*?### git status --porcelain=v1 --untracked-files=all\s*```text\n([\s\S]*?)\n```/u.exec(ledger);
  invariant(baselineMatch !== null, "workspace.initial-status-present", relative(workspaceRoot, ledgerPath));
  const baseline = parseStatus(baselineMatch[1]);
  const plan = await readFile(planPath, "utf8");
  const inventory = new Set([...plan.matchAll(/^- (?:Create|Modify): `([^`]+)`/gmu)].map((match) => match[1]));
  const runtimeOwnedPrefixes = ["packages/runtime-sdk/", "packages/runtime-local/", "fixtures/runtime-hosts/", "fixtures/runtime-traces/"];
  const runtimeOwnedExtras = new Set([
    "packages/agent/test/runtime-binding-authority-fixture.ts",
    "packages/agent/test/local-decision-runtime.test.ts",
    "packages/cli/test/runtime-decision-authority-fixture.ts",
    "scripts/generate-runtime-replica-trace.mts",
    relative(workspaceRoot, ledgerPath).split(sep).join("/"),
  ]);
  const status = await run("git", ["status", "--porcelain=v1", "--untracked-files=all"]);
  invariant(status.code === 0, "workspace.status-readable", status.stderr || "porcelain status read");
  const current = parseStatus(status.stdout);
  const unexpected = [];
  for (const [path, code] of current) {
    if (baseline.has(path)) {
      if (baseline.get(path) !== code) unexpected.push(`${path}:baseline=${baseline.get(path)}:current=${code}`);
      continue;
    }
    if (inventory.has(path) || runtimeOwnedExtras.has(path) || runtimeOwnedPrefixes.some((prefix) => path.startsWith(prefix))) continue;
    unexpected.push(`${path}:not-portable-runtime-owned`);
  }
  for (const [path, code] of baseline) {
    if (!current.has(path)) unexpected.push(`${path}:baseline=${code}:current=clean`);
  }
  invariant(unexpected.length === 0, "workspace.portable-runtime-boundary", unexpected.length === 0 ? "no unexpected workspace mutation" : `portable_runtime_unexpected_workspace_mutation:${JSON.stringify(unexpected)}`);
}

function parseArguments() {
  const index = process.argv.indexOf("--sdd-ledger");
  if (index < 0 || process.argv[index + 1] === undefined) throw new Error("portable_runtime_sdd_ledger_required");
  return resolve(workspaceRoot, process.argv[index + 1]);
}

async function main() {
  const ledgerPath = parseArguments();
  const stages = [
    ["runtime-install", verifyRuntimeAndCleanInstall],
    ["dependency-exclusion", verifyDependencyExclusion],
    ["package-schema-closure", verifyPackageAndSchemaClosure],
    ["package-boundaries", verifyBoundaries],
    ["read-only-detection", verifyDetection],
    ["forged-capability-denial", verifyForgedCapabilityDenial],
    ["single-use-replay", verifySingleUseReplay],
    ["replica-and-export", verifyReplicaAndExport],
    ["governed-binding", verifyGovernedBinding],
    ["retained-foundation", verifyFoundation],
    ["workspace-boundary", () => verifyWorkspaceMutationBoundary(ledgerPath)],
  ];
  for (const [stage, runStage] of stages) {
    const failedBefore = checks.filter((check) => check.status === "fail").length;
    process.stderr.write(`portable-runtime stage start: ${stage}\n`);
    try {
      await runStage();
      process.stderr.write(`portable-runtime stage complete: ${stage}\n`);
    } catch (error) {
      process.stderr.write(`portable-runtime stage failed: ${stage}: ${String(error?.message ?? error)}\n`);
      if (checks.filter((check) => check.status === "fail").length === failedBefore) {
        record(`stage.${stage}`, false, String(error?.message ?? error));
      }
    }
  }
  const commit = await run("git", ["rev-parse", "HEAD"]);
  const completedAt = new Date().toISOString();
  const preimage = {
    schema_version: "contentmd.portable-runtime-verification/0.1.0",
    release_id: "portable-runtime/0.1",
    status: failures.length === 0 ? "verified_synthetic_local" : "failed",
    commit_under_test: commit.code === 0 ? commit.stdout.trim() : "unknown",
    started_at: startedAt,
    completed_at: completedAt,
    runtime: { node: process.versions.node, exec_path: process.execPath, platform: process.platform, architecture: process.arch },
    check_count: checks.length,
    failed_check_count: checks.filter((check) => check.status === "fail").length,
    checks,
    fixture_digests: fixtureDigests,
    supported_local_interfaces: [...RUNTIME_INTERFACE_IDS],
    limitations: [
      "Verification used synthetic local host fixtures.",
      "Cloudflare was detected only as a non-bindable candidate; no Cloudflare adapter or deployment was verified.",
      "No production host, live connector, hosted account, or production user outcome was verified.",
      "No claim of general writing effectiveness is made by this runtime receipt.",
    ],
  };
  const receipt = { ...preimage, receipt_digest: sha256Canonical(preimage) };
  const receiptRoot = await freshRoot("contentmd-portable-receipt-");
  const receiptPath = join(receiptRoot, "portable-runtime-verification.json");
  await writeFile(receiptPath, canonicalJson(receipt), { mode: 0o600 });
  if (sha256(await readFile(receiptPath)) !== sha256(Buffer.from(canonicalJson(receipt)))) {
    throw new Error("portable_runtime_receipt_readback_mismatch");
  }
  process.stdout.write(`portable runtime verification ${failures.length === 0 ? "passed" : "failed"}: ${checks.length} checks, ${checks.filter((check) => check.status === "fail").length} failed\n`);
  process.stdout.write(canonicalJson(receipt));
  if (failures.length > 0) process.exitCode = 1;
}

try {
  await main();
} finally {
  await Promise.all(temporaryRoots.map((root) => rm(root, { recursive: true, force: true })));
}
