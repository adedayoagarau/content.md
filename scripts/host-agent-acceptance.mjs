import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const HOST_ACCEPTANCE_CONTRACT = "contentmd.host-agent-acceptance/0.1.0";
export const HOST_ACCEPTANCE_HOSTS = ["codex", "claude-code"];
export const HOST_ACCEPTANCE_COMMANDS = [
  ["scan", "--summary", "--root", ".", "--json"],
  ["scan", "--inspect", "1", "--root", ".", "--json"],
  ["scan", "--improve", "1", "--root", ".", "--json"],
];
export const HOST_ACCEPTANCE_COMMAND_IDS = ["scan.summary", "scan.inspect", "scan.improve"];
export const HOST_ACCEPTANCE_EVIDENCE_FILES = [
  "contentmd.tgz",
  "prompt.md",
  "host.stdout.jsonl",
  "host.stderr.txt",
  "contentmd-invocations.jsonl",
  "repository-before.json",
  "repository-after.json",
];

export function canonicalJson(value) {
  if (value === null || typeof value === "boolean" || typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError("canonical JSON requires finite numbers");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (typeof value !== "object" || Object.getPrototypeOf(value) !== Object.prototype) {
    throw new TypeError("canonical JSON requires plain JSON records");
  }
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
}

export function sha256Bytes(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function sha256Canonical(value) {
  return sha256Bytes(`${canonicalJson(value)}\n`);
}

function fail(reason) {
  throw new Error(`contentmd_host_agent_acceptance_invalid:${reason}`);
}

function plainRecord(value, field) {
  if (value === null || typeof value !== "object" || Array.isArray(value) || Object.getPrototypeOf(value) !== Object.prototype) {
    fail(field);
  }
  return value;
}

function exactKeys(value, expected, field) {
  const actual = Object.keys(plainRecord(value, field)).sort();
  const wanted = [...expected].sort();
  if (JSON.stringify(actual) !== JSON.stringify(wanted)) fail(`${field}_keys`);
}

function nonEmptyString(value, field) {
  if (typeof value !== "string" || value.trim().length === 0) fail(field);
  return value;
}

function sha256(value, field) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/u.test(value)) fail(field);
  return value;
}

function nonNegativeInteger(value, field) {
  if (!Number.isSafeInteger(value) || value < 0) fail(field);
  return value;
}

function parseRfc3339(value, field) {
  nonEmptyString(value, field);
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/u.test(value) || Number.isNaN(Date.parse(value))) fail(field);
  return Date.parse(value);
}

function assertNoCredentialMaterial(value, location = "manifest") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertNoCredentialMaterial(item, `${location}[${index}]`));
    return;
  }
  if (value === null || typeof value !== "object") return;
  for (const [key, item] of Object.entries(value)) {
    if (/^(?:api[_-]?key|access[_-]?token|refresh[_-]?token|authorization|cookie|password|secret)$/iu.test(key)) {
      fail(`credential_material_${location}.${key}`);
    }
    assertNoCredentialMaterial(item, `${location}.${key}`);
  }
}

function parseJsonLines(bytes, field) {
  const text = bytes.toString("utf8");
  const lines = text.split(/\r?\n/u).filter((line) => line.trim().length > 0);
  try {
    return lines.map((line) => JSON.parse(line));
  } catch {
    fail(`${field}_jsonl`);
  }
}

function verifySnapshot(bytes, expectedDigest, field) {
  let value;
  try {
    value = JSON.parse(bytes.toString("utf8"));
  } catch {
    fail(`${field}_json`);
  }
  if (!Array.isArray(value)) fail(`${field}_array`);
  let previous = "";
  for (const [index, entry] of value.entries()) {
    exactKeys(entry, ["byte_count", "path", "raw_bytes_digest"], `${field}_${index}`);
    const entryPath = nonEmptyString(entry.path, `${field}_${index}_path`);
    if (path.isAbsolute(entryPath) || entryPath.includes("..") || entryPath.includes("\\")) fail(`${field}_${index}_path_scope`);
    if (entryPath <= previous) fail(`${field}_order`);
    previous = entryPath;
    nonNegativeInteger(entry.byte_count, `${field}_${index}_byte_count`);
    sha256(entry.raw_bytes_digest, `${field}_${index}_raw_bytes_digest`);
  }
  if (sha256Canonical(value) !== expectedDigest) fail(`${field}_digest`);
  return value;
}

function verifyHostCommand(host, argv) {
  if (!Array.isArray(argv) || argv.some((item) => typeof item !== "string")) fail("host_command_argv");
  const joined = argv.join(" ");
  if (/dangerously|bypassPermissions|--plugin-url|--add-dir/u.test(joined)) fail("host_command_unsafe_flag");
  if (host === "codex") {
    const expected = [
      "codex", "exec", "--sandbox", "workspace-write", "--ephemeral", "--ignore-user-config", "--ignore-rules",
      "--skip-git-repo-check", "--json",
    ];
    if (argv.length !== expected.length + 1 || JSON.stringify(argv.slice(0, -1)) !== JSON.stringify(expected)) fail("codex_command_shape");
  } else {
    const expectedBeforeBudget = [
      "claude", "-p", "--safe-mode", "--no-session-persistence", "--permission-mode", "dontAsk",
      "--tools", "Bash,Read,Glob,Grep", "--allowedTools", "Bash(contentmd *)",
      "--output-format", "stream-json", "--max-budget-usd",
    ];
    const budget = Number(argv.at(-2));
    if (argv.length !== expectedBeforeBudget.length + 2
      || JSON.stringify(argv.slice(0, expectedBeforeBudget.length)) !== JSON.stringify(expectedBeforeBudget)
      || !Number.isFinite(budget) || budget <= 0) fail("claude_command_shape");
  }
}

export async function verifyHostAgentAcceptanceBundle(bundleDirectory, { expectedHost } = {}) {
  const manifestPath = path.join(bundleDirectory, "manifest.json");
  let manifest;
  try {
    manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  } catch {
    fail("manifest_json");
  }
  exactKeys(manifest, [
    "acceptance", "authority_effect", "completed_at", "contract_version", "credential_handling",
    "evidence", "host", "host_invocation", "package", "repository", "run_id", "started_at",
  ], "manifest");
  if (manifest.contract_version !== HOST_ACCEPTANCE_CONTRACT) fail("contract_version");
  nonEmptyString(manifest.run_id, "run_id");
  const started = parseRfc3339(manifest.started_at, "started_at");
  const completed = parseRfc3339(manifest.completed_at, "completed_at");
  if (completed < started) fail("time_order");
  if (manifest.authority_effect !== "none") fail("authority_effect");
  if (manifest.credential_handling !== "existing_host_auth_not_recorded") fail("credential_handling");
  assertNoCredentialMaterial(manifest);

  exactKeys(manifest.host, ["kind", "version"], "host");
  if (!HOST_ACCEPTANCE_HOSTS.includes(manifest.host.kind)) fail("host_kind");
  if (expectedHost !== undefined && manifest.host.kind !== expectedHost) fail("unexpected_host");
  nonEmptyString(manifest.host.version, "host_version");

  exactKeys(manifest.package, ["name", "tarball_byte_count", "tarball_sha256", "version"], "package");
  if (manifest.package.name !== "contentmd") fail("package_name");
  nonEmptyString(manifest.package.version, "package_version");
  nonNegativeInteger(manifest.package.tarball_byte_count, "package_tarball_byte_count");
  sha256(manifest.package.tarball_sha256, "package_tarball_sha256");

  exactKeys(manifest.host_invocation, ["argv", "exit_code", "prompt_sha256", "stderr_sha256", "stdout_sha256"], "host_invocation");
  verifyHostCommand(manifest.host.kind, manifest.host_invocation.argv);
  if (manifest.host_invocation.exit_code !== 0) fail("host_exit_code");
  sha256(manifest.host_invocation.prompt_sha256, "prompt_sha256");
  sha256(manifest.host_invocation.stdout_sha256, "host_stdout_sha256");
  sha256(manifest.host_invocation.stderr_sha256, "host_stderr_sha256");

  exactKeys(manifest.repository, ["after_digest", "before_digest", "mutated"], "repository");
  sha256(manifest.repository.before_digest, "repository_before_digest");
  sha256(manifest.repository.after_digest, "repository_after_digest");
  if (manifest.repository.mutated !== false || manifest.repository.before_digest !== manifest.repository.after_digest) {
    fail("repository_mutated");
  }

  exactKeys(manifest.acceptance, ["compatibility_claim_eligible", "expected_command_count", "invocation_count", "status"], "acceptance");
  if (manifest.acceptance.status !== "passed_live_host_acceptance") fail("acceptance_status");
  if (manifest.acceptance.compatibility_claim_eligible !== true) fail("compatibility_claim_eligibility");
  if (manifest.acceptance.expected_command_count !== HOST_ACCEPTANCE_COMMANDS.length) fail("expected_command_count");
  if (manifest.acceptance.invocation_count !== HOST_ACCEPTANCE_COMMANDS.length) fail("invocation_count");

  exactKeys(manifest.evidence, HOST_ACCEPTANCE_EVIDENCE_FILES, "evidence");
  const evidenceBytes = {};
  for (const evidencePath of HOST_ACCEPTANCE_EVIDENCE_FILES) {
    const descriptor = manifest.evidence[evidencePath];
    exactKeys(descriptor, ["byte_count", "raw_bytes_digest"], `evidence_${evidencePath}`);
    nonNegativeInteger(descriptor.byte_count, `evidence_${evidencePath}_byte_count`);
    sha256(descriptor.raw_bytes_digest, `evidence_${evidencePath}_raw_bytes_digest`);
    const bytes = await readFile(path.join(bundleDirectory, evidencePath)).catch(() => fail(`evidence_${evidencePath}_missing`));
    if (bytes.byteLength !== descriptor.byte_count) fail(`evidence_${evidencePath}_byte_count_mismatch`);
    if (sha256Bytes(bytes) !== descriptor.raw_bytes_digest) fail(`evidence_${evidencePath}_digest_mismatch`);
    evidenceBytes[evidencePath] = bytes;
  }
  if (manifest.host_invocation.prompt_sha256 !== manifest.evidence["prompt.md"].raw_bytes_digest) fail("prompt_binding");
  if (manifest.host_invocation.stdout_sha256 !== manifest.evidence["host.stdout.jsonl"].raw_bytes_digest) fail("stdout_binding");
  if (manifest.host_invocation.stderr_sha256 !== manifest.evidence["host.stderr.txt"].raw_bytes_digest) fail("stderr_binding");
  if (manifest.host_invocation.argv.at(-1) !== evidenceBytes["prompt.md"].toString("utf8")) fail("prompt_transport_binding");
  if (manifest.package.tarball_byte_count !== manifest.evidence["contentmd.tgz"].byte_count
    || manifest.package.tarball_sha256 !== manifest.evidence["contentmd.tgz"].raw_bytes_digest) fail("package_tarball_binding");

  const before = verifySnapshot(evidenceBytes["repository-before.json"], manifest.repository.before_digest, "repository_before");
  const after = verifySnapshot(evidenceBytes["repository-after.json"], manifest.repository.after_digest, "repository_after");
  if (canonicalJson(before) !== canonicalJson(after)) fail("repository_snapshot_difference");

  const invocations = parseJsonLines(evidenceBytes["contentmd-invocations.jsonl"], "contentmd_invocations");
  if (invocations.length !== HOST_ACCEPTANCE_COMMANDS.length) fail("contentmd_invocation_count");
  invocations.forEach((invocation, index) => {
    exactKeys(invocation, ["argv", "command_id", "cwd", "exit_code", "sequence", "status", "write_effect"], `invocation_${index}`);
    if (invocation.sequence !== index + 1) fail(`invocation_${index}_sequence`);
    if (JSON.stringify(invocation.argv) !== JSON.stringify(HOST_ACCEPTANCE_COMMANDS[index])) fail(`invocation_${index}_argv`);
    if (invocation.command_id !== HOST_ACCEPTANCE_COMMAND_IDS[index]) fail(`invocation_${index}_command_id`);
    if (invocation.cwd !== ".") fail(`invocation_${index}_cwd`);
    if (invocation.exit_code !== 0 || invocation.status !== "completed") fail(`invocation_${index}_result`);
    if (invocation.write_effect !== "none") fail(`invocation_${index}_write_effect`);
  });

  return {
    contract_version: HOST_ACCEPTANCE_CONTRACT,
    run_id: manifest.run_id,
    host: manifest.host,
    package: manifest.package,
    command_count: invocations.length,
    repository_mutated: false,
    compatibility_claim_eligible: true,
    authority_effect: "none",
    verification_status: "passed",
  };
}
