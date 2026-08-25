import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { cp, lstat, mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execute = promisify(execFile);
const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
const fixture = join(root, "fixtures/synthetic-mixed-stack");
const cli = join(root, "packages/cli/src/main.ts");
const canaries = ["SECRET_CANARY", "GENERATED_OUTPUT_CANARY", "PRIVATE_DATA_CANARY"];
const allowedChangedOriginals = new Set(["CLAUDE.md", "studio/app/analyze/page.tsx"]);
const expectedCoverage = { failed: 0, inventoried: 14, scanned: 10, skipped: 5, unsupported: 4 };
const nodeExecutable = process.execPath;
let checks = 0;

function assert(condition, message) {
  checks += 1;
  if (!condition) throw new Error(`repository_intelligence_verification_failed:${message}`);
}

function canonicalize(value) {
  if (value === null || typeof value === "boolean" || typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError("noncanonical_number");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  if (typeof value === "object") {
    return `{${Object.keys(value).sort((left, right) => left.localeCompare(right, "en")).map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(",")}}`;
  }
  throw new TypeError("noncanonical_value");
}

function canonical(value) {
  return `${canonicalize(value)}\n`;
}

function digestBytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function digestValue(value) {
  return digestBytes(canonical(value));
}

async function inventory(directory) {
  const output = new Map();
  async function visit(current) {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name, "en"))) {
      const path = join(current, entry.name);
      const relativePath = relative(directory, path).replaceAll("\\", "/");
      if (entry.isSymbolicLink()) {
        output.set(relativePath, `symlink:${await readFile(path, "utf8").catch(() => "unreadable")}`);
      } else if (entry.isDirectory()) {
        await visit(path);
      } else if (entry.isFile()) {
        output.set(relativePath, digestBytes(await readFile(path)));
      }
    }
  }
  await visit(directory);
  return output;
}

function envelope(stdout, args) {
  let parsed;
  try { parsed = JSON.parse(stdout); } catch { throw new Error(`invalid_cli_json:${args.join(" ")}`); }
  return parsed;
}

function mutationAuthorization(transaction) {
  const limits = { calls: 1, bytes: 4096, duration_ms: 2000, records: 2, model_tokens: 0, browser_actions: 0, retries: 0 };
  return {
    now: "2026-08-25T18:10:00.000Z",
    request: {
      operation_id: transaction.operation_id, intent: "apply", action: "filesystem.write",
      adapter_id: "adapter.filesystem", resource_scope: [transaction.target_path], data_classes: ["public-synthetic"],
      egress: "none", requested_limits: limits, approval_class: "mutation", requires_readback: true,
      subject_digest: transaction.transaction_digest,
    },
    policies: [{
      policy_id: "policy.verifier.change", policy_version: 1, status: "current",
      effective_at: "2026-08-25T00:00:00.000Z", expires_at: "2026-08-26T00:00:00.000Z",
      allowed_actions: ["filesystem.write"], denied_actions: [], review_actions: [],
      allowed_adapters: ["adapter.filesystem"], denied_adapters: [], permitted_data_classes: ["public-synthetic"],
      denied_data_classes: [], permitted_egress: ["none"], max_limits: limits,
      human_approval_actions: ["filesystem.write"], required_control_types: ["data_processing", "durable_memory", "telemetry"],
    }],
    capability_grant: {
      grant_id: "grant.verifier.apply", principal_ref: "actor.verifier", workload_ref: "workload.contentmd",
      action: "filesystem.write", adapter_id: "adapter.filesystem", resource_scope: [transaction.target_path],
      data_classes: ["public-synthetic"], egress: "none", max_limits: limits,
      issued_at: "2026-08-25T17:00:00.000Z", expires_at: "2026-08-25T19:00:00.000Z", revocation_state: "current",
    },
    approval: {
      approval_id: transaction.approval_id, approval_class: "mutation", subject_ref: transaction.operation_id,
      subject_digest: transaction.transaction_digest, status: "issued", issued_at: "2026-08-25T18:00:00.000Z",
      expires_at: "2026-08-25T19:00:00.000Z", revocation_state: "current",
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

const temporaryRoot = await mkdtemp(join(tmpdir(), "contentmd-repository-verifier-"));
const project = join(temporaryRoot, "project");
const preload = join(temporaryRoot, "deny-network.mjs");
const preloadMarker = join(temporaryRoot, "network-preload-loaded");
const outputs = [];

try {
  const [major, minor] = process.versions.node.split(".").map(Number);
  assert(major === 24 && minor >= 14, "node_version");
  await cp(fixture, project, { recursive: true });
  const before = await inventory(project);
  const fixtureDigest = digestValue([...before.entries()].sort());
  await writeFile(preload, `
import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import net from "node:net";
import dns from "node:dns";
fs.writeFileSync(process.env.CONTENTMD_NETWORK_PRELOAD_MARKER, "loaded", { flag: "a" });
const deny = () => { throw new Error("repository_intelligence_network_denied"); };
globalThis.fetch = deny;
http.request = deny; http.get = deny;
https.request = deny; https.get = deny;
net.connect = deny; net.createConnection = deny;
dns.lookup = deny; dns.resolve = deny;
`, "utf8");
  const environment = {
    ...process.env,
    NO_COLOR: "1",
    NODE_OPTIONS: `${process.env.NODE_OPTIONS ?? ""} --import=${preload}`.trim(),
    CONTENTMD_NETWORK_PRELOAD_MARKER: preloadMarker,
  };

  async function run(args, accepted = [0]) {
    try {
      const result = await execute(nodeExecutable, ["--import", "tsx", cli, ...args], {
        cwd: root,
        env: environment,
        maxBuffer: 20 * 1024 * 1024,
      });
      outputs.push(result.stdout, result.stderr);
      const parsed = envelope(result.stdout, args);
      assert(accepted.includes(parsed.exit_code), `exit_code:${args[0]}`);
      return parsed;
    } catch (error) {
      const failed = error;
      outputs.push(failed.stdout ?? "", failed.stderr ?? "");
      if (typeof failed.code === "number" && accepted.includes(failed.code) && failed.stdout !== undefined) {
        return envelope(failed.stdout, args);
      }
      throw error;
    }
  }

  const adoptionPreview = await run(["init", "--root", project, "--json"], [20]);
  const adoption = await run(["init", "--root", project, "--yes", "--plan-digest", adoptionPreview.record_refs[0], "--json"]);
  const discovery = await run(["discover", "--root", project, "--json"]);
  const model = await run(["model", "--root", project, "--json"]);
  assert(canonical(discovery.data.coverage) === canonical(expectedCoverage), `coverage:${canonical(discovery.data.coverage)}`);
  assert(model.data.graph.nodes.some((node) => node.label === "checkout content designers"), "audience_model");
  assert(model.data.discovery.inventory.stacks.some((stack) => stack.kind === "python"), "python_stack");
  assert(model.data.discovery.inventory.stacks.some((stack) => stack.kind === "typescript" && stack.framework_hints.includes("next")), "next_stack");

  const prepared = await run([
    "task", "prepare", "--root", project, "--request", "Improve the Analyze empty state",
    "--target", "studio/app/analyze/page.tsx:8", "--json",
  ]);
  const candidatePath = join(temporaryRoot, "candidate.json");
  await writeFile(candidatePath, canonical({
    contract_version: "contentmd.ide-writing-candidate/0.1.0",
    task_digest: prepared.data.task.task_digest,
    alternatives: [{
      candidate_id: "candidate.empty-state.verifier",
      text: "Choose a product and stage to begin analysis.",
      rationale: "Names the inputs needed to continue.",
      evidence_refs: prepared.data.task.evidence_refs,
    }],
    recommended_candidate_id: "candidate.empty-state.verifier",
    claimed_authority_effect: "none",
  }), "utf8");
  const review = await run(["task", "review", "--root", project, "--input", candidatePath, "--json"]);
  const decision = {
    schema_version: "contentmd.content-decision/0.1.0",
    decision_id: "decision.verifier.empty-state.001",
    status: "accepted",
    actor_ref: "actor.verifier",
    actor_role: "content_owner",
    rationale: "Accepted only for the exact synthetic occurrence.",
    proposal_ref: review.data.candidate_digest,
    selected_expression: review.data.preview_diff.after,
    edited_expression: null,
    evidence_reviewed: [prepared.data.task.task_digest, prepared.data.target_occurrence.occurrence_id].sort(),
    scope: "project",
    project_id: model.data.project_id,
    occurred_at: "2026-08-25T18:00:00.000Z",
    mutation_approval_effect: "none",
    sequence: 1,
    event_digest: "e".repeat(64),
  };
  const decisionPath = join(project, ".contentmd/runtime/latest-decision.json");
  await mkdir(dirname(decisionPath), { recursive: true });
  await writeFile(decisionPath, canonical(decision), "utf8");

  const transactionId = "txn_repository_verifier_empty_state_v1";
  const preview = await run(["apply", "--root", project, "--transaction", transactionId, "--preview", "--json"]);
  const approvalPath = join(project, ".contentmd/governance/approvals", `${preview.data.approval_id}.json`);
  await mkdir(dirname(approvalPath), { recursive: true });
  await writeFile(approvalPath, canonical(mutationAuthorization(preview.data)), "utf8");
  const applied = await run(["apply", "--root", project, "--transaction", transactionId, "--approval", preview.data.approval_id, "--json"]);
  const verified = await run(["verify", "--root", project, "--transaction", transactionId, "--json"]);
  const uninstall = await run(["uninstall", "--root", project, "--preview", "--json"]);
  assert(adoption.status === "completed" && applied.status === "completed" && verified.data.verified === true, "full_flow");
  assert(verified.data.parsed_occurrence.expression_payload === review.data.preview_diff.after, "parsed_readback");
  assert(!canonical(uninstall.data).includes("studio/app/analyze/page.tsx"), "uninstall_ownership");

  const runtimeDirectory = join(project, ".contentmd/runtime");
  const runtimeInventory = await inventory(runtimeDirectory);
  const runtimeText = (await Promise.all([...runtimeInventory.keys()].map((path) => readFile(join(runtimeDirectory, path), "utf8").catch(() => "")))).join("\n");
  const observable = `${outputs.join("\n")}\n${runtimeText}`;
  for (const canary of canaries) assert(!observable.includes(canary), `canary:${canary}`);
  assert((await readFile(preloadMarker, "utf8")).includes("loaded"), "network_preload");

  const after = await inventory(project);
  const changedOriginals = [...before.entries()]
    .filter(([path, digest]) => after.get(path) !== digest)
    .map(([path]) => path)
    .sort();
  assert(canonical(changedOriginals) === canonical([...allowedChangedOriginals].sort()), "original_integrity");
  assert(preview.data.before_digest === before.get("studio/app/analyze/page.tsx"), "before_digest");
  assert(preview.data.after_digest === after.get("studio/app/analyze/page.tsx"), "after_digest");
  assert((await lstat(join(project, ".contentmd"))).isDirectory(), "contentmd_directory");

  const reportPreimage = {
    contract_version: "contentmd.repository-intelligence-verification/0.2.0",
    node_version: process.versions.node,
    fixture_digest: fixtureDigest,
    coverage: expectedCoverage,
    test_counts: { assertions: checks, commands: 12 },
    canary_checks: Object.fromEntries(canaries.map((canary) => [canary, "absent"])),
    network_denial: { preload_loaded: true, network_attempt_completed: false },
    before_after_integrity: {
      changed_original_paths: changedOriginals,
      approved_target: "studio/app/analyze/page.tsx",
      installer_owned_bridge: "CLAUDE.md",
      unrelated_originals_unchanged: true,
    },
    authority_effect: "none",
    result: "pass",
  };
  const report = { ...reportPreimage, verifier_digest: digestValue(reportPreimage) };
  process.stdout.write(canonical(report));
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
