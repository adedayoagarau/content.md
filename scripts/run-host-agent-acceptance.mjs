#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import {
  chmod,
  mkdir,
  readFile,
  readdir,
  realpath,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  HOST_ACCEPTANCE_COMMANDS,
  HOST_ACCEPTANCE_COMMAND_IDS,
  HOST_ACCEPTANCE_CONTRACT,
  HOST_ACCEPTANCE_EVIDENCE_FILES,
  HOST_ACCEPTANCE_HOSTS,
  canonicalJson,
  sha256Bytes,
  sha256Canonical,
  verifyHostAgentAcceptanceBundle,
} from "./host-agent-acceptance.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const distribution = path.join(root, "distribution/contentmd");
const toolchainPath = `${path.dirname(process.execPath)}${path.delimiter}${process.env.PATH ?? ""}`;

function fail(reason) {
  throw new Error(`contentmd_host_agent_acceptance_run_failed:${reason}`);
}

function parseArguments(argv) {
  const options = { confirm: false, host: undefined, maxBudgetUsd: undefined, output: undefined };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--confirm-live-account-run") {
      options.confirm = true;
      continue;
    }
    if (["--host", "--max-budget-usd", "--output"].includes(arg)) {
      const value = argv[index + 1];
      if (value === undefined || value.startsWith("--")) fail(`missing_${arg.slice(2).replaceAll("-", "_")}`);
      options[arg.slice(2).replaceAll("-", "_")] = value;
      index += 1;
      continue;
    }
    fail(`unknown_argument_${arg}`);
  }
  if (!HOST_ACCEPTANCE_HOSTS.includes(options.host)) fail("host_must_be_codex_or_claude_code");
  if (typeof options.output !== "string" || options.output.length === 0) fail("output_required");
  if (options.host === "claude-code" && options.confirm) {
    const budget = Number(options.max_budget_usd);
    if (!Number.isFinite(budget) || budget <= 0) fail("positive_max_budget_usd_required_for_claude_code");
    options.maxBudgetUsd = String(budget);
  } else if (options.max_budget_usd !== undefined) {
    fail("max_budget_usd_only_applies_to_claude_code_live_runs");
  }
  return options;
}

function run(command, args, cwd, { allowFailure = false, env = {} } = {}) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, PATH: toolchainPath, ...env },
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.error) fail(`${path.basename(command)}_spawn_${result.error.message}`);
  if (!allowFailure && result.status !== 0) {
    fail(`${path.basename(command)}_${args[0] ?? "command"}_exit_${result.status}\n${result.stdout}\n${result.stderr}`);
  }
  return result;
}

function hostPrompt(host) {
  const label = host === "codex" ? "Codex" : "Claude Code";
  return `You are ${label} running a bounded content.md host-acceptance test in a synthetic repository.\n\n` +
    "Do not edit, create, delete, rename, or format repository files. Do not use network tools. " +
    "Do not run package installation, git mutation, npx, pnpm, npm, or any command other than the three contentmd commands below.\n\n" +
    "Run exactly these commands, once each, in this order:\n\n" +
    HOST_ACCEPTANCE_COMMANDS.map((args) => `contentmd ${args.join(" ")}`).join("\n") +
    "\n\nAfter all three commands finish, state briefly whether they completed. " +
    "Do not propose or apply replacement copy. The command evidence, not your final statement, determines the result.\n";
}

function shimSource(entry, logPath, repositoryRoot) {
  return `#!/usr/bin/env node
const { appendFileSync } = require("node:fs");
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const entry = ${JSON.stringify(entry)};
const logPath = ${JSON.stringify(logPath)};
const repositoryRoot = ${JSON.stringify(repositoryRoot)};
const args = process.argv.slice(2);
const result = spawnSync(process.execPath, [entry, ...args], {
  cwd: process.cwd(),
  encoding: "utf8",
  env: process.env,
  maxBuffer: 64 * 1024 * 1024,
});
if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
let envelope = null;
try { envelope = JSON.parse(result.stdout); } catch {}
const data = envelope && envelope.data && typeof envelope.data === "object" ? envelope.data : {};
const writeEffect = data.write_effect ?? data.inspection?.write_effect ?? data.improvement_brief?.mutation_effect ?? null;
let sequence = 1;
try { sequence = require("node:fs").readFileSync(logPath, "utf8").split(/\\r?\\n/).filter(Boolean).length + 1; } catch {}
appendFileSync(logPath, JSON.stringify({
  sequence,
  argv: args,
  cwd: path.relative(repositoryRoot, process.cwd()).split(path.sep).join("/") || ".",
  exit_code: result.status ?? 1,
  command_id: envelope?.command_id ?? null,
  status: envelope?.status ?? null,
  write_effect: writeEffect,
}) + "\\n", { encoding: "utf8", mode: 0o600 });
process.exit(result.status ?? 1);
`;
}

async function repositorySnapshot(directory) {
  const entries = [];
  async function visit(current, relative) {
    const children = await readdir(current, { withFileTypes: true });
    children.sort((a, b) => a.name.localeCompare(b.name, "en"));
    for (const child of children) {
      const childRelative = relative ? `${relative}/${child.name}` : child.name;
      if (relative === "" && [".git", ".contentmd-host-acceptance", "node_modules"].includes(child.name)) continue;
      const absolute = path.join(current, child.name);
      if (child.isDirectory()) {
        await visit(absolute, childRelative);
      } else if (child.isFile()) {
        const bytes = await readFile(absolute);
        entries.push({ path: childRelative, byte_count: bytes.byteLength, raw_bytes_digest: sha256Bytes(bytes) });
      } else if (child.isSymbolicLink()) {
        fail(`unsupported_repository_symlink_${childRelative}`);
      }
    }
  }
  await visit(directory, "");
  return entries;
}

function hostExecutable(host) {
  return host === "codex" ? "codex" : "claude";
}

function hostArguments(host, prompt, maxBudgetUsd) {
  if (host === "codex") {
    return [
      "exec", "--sandbox", "workspace-write", "--ephemeral", "--ignore-user-config", "--ignore-rules",
      "--skip-git-repo-check", "--json", prompt,
    ];
  }
  return [
    "-p", "--safe-mode", "--no-session-persistence", "--permission-mode", "dontAsk",
    "--tools", "Bash,Read,Glob,Grep", "--allowedTools", "Bash(contentmd *)",
    "--output-format", "stream-json", "--max-budget-usd", maxBudgetUsd ?? "<required-positive-dollar-cap>", prompt,
  ];
}

async function evidenceDescriptor(filePath) {
  const bytes = await readFile(filePath);
  return { byte_count: bytes.byteLength, raw_bytes_digest: sha256Bytes(bytes) };
}

function packageVersionSupported() {
  const match = process.versions.node.match(/^(\d+)\.(\d+)\.(\d+)/u);
  if (!match) return false;
  const [, major, minor, patch] = match.map(Number);
  return major === 24 && (minor > 14 || (minor === 14 && patch >= 0));
}

const options = parseArguments(process.argv.slice(2));
if (!packageVersionSupported()) fail(`node_24_14_or_newer_required_received_${process.versions.node}`);
const output = path.resolve(options.output);
if (output === path.resolve(root) || output.startsWith(`${path.resolve(root)}${path.sep}`)) {
  fail("output_must_be_outside_source_checkout");
}
await mkdir(output, { recursive: false }).catch((error) => fail(`output_must_not_exist_${error.code ?? error.message}`));
const npmCache = path.join(output, ".npm-cache");
await mkdir(npmCache);
const workspace = path.join(output, "workspace");
const harness = path.join(workspace, ".contentmd-host-acceptance");
const shimDirectory = path.join(harness, "bin");
await mkdir(path.join(workspace, "src"), { recursive: true });
await mkdir(shimDirectory, { recursive: true });

await writeFile(path.join(workspace, "package.json"), `${JSON.stringify({ name: "contentmd-host-agent-acceptance", private: true }, null, 2)}\n`);
await writeFile(path.join(workspace, "src/App.tsx"), "export function App() { return <main><p>Payment failed.</p></main>; }\n");
run("git", ["init", "--quiet"], workspace);

run(process.execPath, [path.join(root, "scripts/build-contentmd-distribution.mjs")], root);
const pack = run("npm", ["pack", distribution, "--json", "--pack-destination", output], root, {
  env: { NPM_CONFIG_CACHE: npmCache },
});
let packed;
try {
  packed = JSON.parse(pack.stdout)[0];
} catch {
  fail("npm_pack_json");
}
const packedTarballPath = path.join(output, packed.filename);
const tarballPath = path.join(output, "contentmd.tgz");
await rename(packedTarballPath, tarballPath);
const tarballBytes = await readFile(tarballPath);
run("npm", ["install", "--ignore-scripts", "--no-audit", "--no-fund", tarballPath], workspace, {
  env: { NPM_CONFIG_CACHE: npmCache },
});
await rm(npmCache, { recursive: true, force: true });
const installedManifest = JSON.parse(await readFile(path.join(workspace, "node_modules/contentmd/package.json"), "utf8"));
const installedEntry = await realpath(path.join(workspace, "node_modules/contentmd/dist/contentmd.cjs"));
const invocationLog = path.join(harness, "contentmd-invocations.jsonl");
const shimPath = path.join(shimDirectory, "contentmd");
await writeFile(shimPath, shimSource(installedEntry, invocationLog, workspace), { mode: 0o700 });
await chmod(shimPath, 0o700);

const prompt = hostPrompt(options.host);
await writeFile(path.join(output, "prompt.md"), prompt);
const before = await repositorySnapshot(workspace);
await writeFile(path.join(output, "repository-before.json"), `${canonicalJson(before)}\n`);
const executable = hostExecutable(options.host);
const versionResult = run(executable, ["--version"], workspace);
const hostVersion = versionResult.stdout.trim() || versionResult.stderr.trim();
const hostArgs = hostArguments(options.host, prompt, options.maxBudgetUsd);

if (!options.confirm) {
  const prepared = {
    contract_version: HOST_ACCEPTANCE_CONTRACT,
    preparation_status: "awaiting_explicit_live_account_run",
    host: { kind: options.host, version: hostVersion },
    package: {
      name: installedManifest.name,
      version: installedManifest.version,
      tarball_byte_count: tarballBytes.byteLength,
      tarball_sha256: sha256Bytes(tarballBytes),
    },
    workspace,
    proposed_host_invocation: [executable, ...hostArgs],
    expected_commands: HOST_ACCEPTANCE_COMMANDS,
    compatibility_claim_eligible: false,
    authority_effect: "none",
  };
  await writeFile(path.join(output, "prepared-run.json"), `${JSON.stringify(prepared, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(prepared, null, 2)}\n`);
  process.exit(20);
}

const startedAt = new Date().toISOString();
const hostResult = run(executable, hostArgs, workspace, {
  allowFailure: true,
  env: { PATH: `${shimDirectory}${path.delimiter}${toolchainPath}` },
});
const completedAt = new Date().toISOString();
await writeFile(path.join(output, "host.stdout.jsonl"), hostResult.stdout ?? "");
await writeFile(path.join(output, "host.stderr.txt"), hostResult.stderr ?? "");
let invocationBytes = Buffer.alloc(0);
try {
  invocationBytes = await readFile(invocationLog);
} catch {
  // A missing log is retained as empty evidence and fails closed below.
}
await writeFile(path.join(output, "contentmd-invocations.jsonl"), invocationBytes);
const after = await repositorySnapshot(workspace);
await writeFile(path.join(output, "repository-after.json"), `${canonicalJson(after)}\n`);

const evidence = {};
for (const evidenceFile of HOST_ACCEPTANCE_EVIDENCE_FILES) {
  evidence[evidenceFile] = await evidenceDescriptor(path.join(output, evidenceFile));
}
let parsedInvocations = [];
try {
  parsedInvocations = invocationBytes.toString("utf8").split(/\r?\n/u).filter(Boolean).map((line) => JSON.parse(line));
} catch {
  parsedInvocations = [];
}
const beforeDigest = sha256Canonical(before);
const afterDigest = sha256Canonical(after);
const passed = hostResult.status === 0
  && parsedInvocations.length === HOST_ACCEPTANCE_COMMANDS.length
  && parsedInvocations.every((invocation, index) => invocation.sequence === index + 1
    && JSON.stringify(invocation.argv) === JSON.stringify(HOST_ACCEPTANCE_COMMANDS[index])
    && invocation.command_id === HOST_ACCEPTANCE_COMMAND_IDS[index]
    && invocation.cwd === "." && invocation.exit_code === 0 && invocation.status === "completed"
    && invocation.write_effect === "none")
  && beforeDigest === afterDigest;
const manifest = {
  contract_version: HOST_ACCEPTANCE_CONTRACT,
  run_id: `host-agent-acceptance.${randomUUID()}`,
  started_at: startedAt,
  completed_at: completedAt,
  host: { kind: options.host, version: hostVersion },
  package: {
    name: installedManifest.name,
    version: installedManifest.version,
    tarball_byte_count: tarballBytes.byteLength,
    tarball_sha256: sha256Bytes(tarballBytes),
  },
  host_invocation: {
    argv: [executable, ...hostArgs],
    exit_code: hostResult.status ?? 1,
    prompt_sha256: evidence["prompt.md"].raw_bytes_digest,
    stdout_sha256: evidence["host.stdout.jsonl"].raw_bytes_digest,
    stderr_sha256: evidence["host.stderr.txt"].raw_bytes_digest,
  },
  repository: { before_digest: beforeDigest, after_digest: afterDigest, mutated: beforeDigest !== afterDigest },
  evidence,
  acceptance: {
    status: passed ? "passed_live_host_acceptance" : "failed_live_host_acceptance",
    expected_command_count: HOST_ACCEPTANCE_COMMANDS.length,
    invocation_count: parsedInvocations.length,
    compatibility_claim_eligible: passed,
  },
  credential_handling: "existing_host_auth_not_recorded",
  authority_effect: "none",
};
await writeFile(path.join(output, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, { mode: 0o600 });
if (!passed) fail(`live_run_did_not_pass_evidence_retained_at_${output}`);
let verification;
try {
  verification = await verifyHostAgentAcceptanceBundle(output, { expectedHost: options.host });
} catch (error) {
  manifest.acceptance.status = "failed_live_host_acceptance";
  manifest.acceptance.compatibility_claim_eligible = false;
  await writeFile(path.join(output, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, { mode: 0o600 });
  throw error;
}
process.stdout.write(`${JSON.stringify(verification, null, 2)}\n`);
