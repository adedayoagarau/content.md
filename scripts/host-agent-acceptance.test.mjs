import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  HOST_ACCEPTANCE_COMMANDS,
  HOST_ACCEPTANCE_COMMAND_IDS,
  HOST_ACCEPTANCE_CONTRACT,
  HOST_ACCEPTANCE_EVIDENCE_FILES,
  canonicalJson,
  sha256Bytes,
  sha256Canonical,
  verifyHostAgentAcceptanceBundle,
} from "./host-agent-acceptance.mjs";

async function fixture(host = "codex") {
  const directory = await mkdtemp(path.join(tmpdir(), "contentmd-host-agent-acceptance-"));
  const prompt = "Run the three bounded contentmd commands.\n";
  const snapshot = [
    { path: "package-lock.json", byte_count: 3, raw_bytes_digest: sha256Bytes("{}\n") },
    { path: "package.json", byte_count: 3, raw_bytes_digest: sha256Bytes("{}\n") },
    { path: "src/App.tsx", byte_count: 8, raw_bytes_digest: sha256Bytes("fixture\n") },
  ];
  const invocations = HOST_ACCEPTANCE_COMMANDS.map((argv, index) => ({
    sequence: index + 1,
    argv,
    cwd: ".",
    exit_code: 0,
    command_id: HOST_ACCEPTANCE_COMMAND_IDS[index],
    status: "completed",
    write_effect: "none",
  }));
  const files = {
    "contentmd.tgz": Buffer.from("tarball"),
    "prompt.md": prompt,
    "host.stdout.jsonl": "{\"type\":\"result\"}\n",
    "host.stderr.txt": "",
    "contentmd-invocations.jsonl": `${invocations.map((value) => JSON.stringify(value)).join("\n")}\n`,
    "repository-before.json": `${canonicalJson(snapshot)}\n`,
    "repository-after.json": `${canonicalJson(snapshot)}\n`,
  };
  for (const [name, contents] of Object.entries(files)) await writeFile(path.join(directory, name), contents);
  const evidence = {};
  for (const name of HOST_ACCEPTANCE_EVIDENCE_FILES) {
    const bytes = await readFile(path.join(directory, name));
    evidence[name] = { byte_count: bytes.byteLength, raw_bytes_digest: sha256Bytes(bytes) };
  }
  const hostCommand = host === "codex"
    ? [
      "codex", "exec", "--sandbox", "workspace-write", "--ephemeral", "--ignore-user-config", "--ignore-rules",
      "--skip-git-repo-check", "--json", prompt,
    ]
    : [
      "claude", "-p", "--safe-mode", "--no-session-persistence", "--permission-mode", "dontAsk",
      "--tools", "Bash,Read,Glob,Grep", "--allowedTools", "Bash(contentmd *)",
      "--output-format", "stream-json", "--max-budget-usd", "1", prompt,
    ];
  const manifest = {
    contract_version: HOST_ACCEPTANCE_CONTRACT,
    run_id: "host-agent-acceptance.fixture",
    started_at: "2026-09-19T12:00:00.000Z",
    completed_at: "2026-09-19T12:01:00.000Z",
    host: { kind: host, version: host === "codex" ? "codex-cli 0.144.6" : "2.1.215 (Claude Code)" },
    package: {
      name: "contentmd",
      version: "0.1.0",
      tarball_byte_count: Buffer.byteLength("tarball"),
      tarball_sha256: sha256Bytes("tarball"),
    },
    host_invocation: {
      argv: hostCommand,
      exit_code: 0,
      prompt_sha256: evidence["prompt.md"].raw_bytes_digest,
      stdout_sha256: evidence["host.stdout.jsonl"].raw_bytes_digest,
      stderr_sha256: evidence["host.stderr.txt"].raw_bytes_digest,
    },
    repository: {
      before_digest: sha256Canonical(snapshot),
      after_digest: sha256Canonical(snapshot),
      mutated: false,
    },
    evidence,
    acceptance: {
      status: "passed_live_host_acceptance",
      expected_command_count: 3,
      invocation_count: 3,
      compatibility_claim_eligible: true,
    },
    credential_handling: "existing_host_auth_not_recorded",
    authority_effect: "none",
  };
  await writeFile(path.join(directory, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  return { directory, manifest };
}

test("verifies digest-bound Codex and Claude Code live-host bundles", async () => {
  for (const host of ["codex", "claude-code"]) {
    const value = await fixture(host);
    try {
      const result = await verifyHostAgentAcceptanceBundle(value.directory, { expectedHost: host });
      assert.equal(result.verification_status, "passed");
      assert.equal(result.command_count, 3);
      assert.equal(result.repository_mutated, false);
      assert.equal(result.compatibility_claim_eligible, true);
    } finally {
      await rm(value.directory, { recursive: true, force: true });
    }
  }
});

test("rejects transcript tampering and repository mutation", async () => {
  const tampered = await fixture();
  try {
    await writeFile(path.join(tampered.directory, "host.stdout.jsonl"), "tampered\n");
    await assert.rejects(verifyHostAgentAcceptanceBundle(tampered.directory), /host\.stdout\.jsonl_(?:byte_count|digest)_mismatch/);
  } finally {
    await rm(tampered.directory, { recursive: true, force: true });
  }

  const mutated = await fixture();
  try {
    mutated.manifest.repository.mutated = true;
    await writeFile(path.join(mutated.directory, "manifest.json"), `${JSON.stringify(mutated.manifest)}\n`);
    await assert.rejects(verifyHostAgentAcceptanceBundle(mutated.directory), /repository_mutated/);
  } finally {
    await rm(mutated.directory, { recursive: true, force: true });
  }
});

test("rejects missing commands, unsafe host flags, and recorded credentials", async () => {
  const missing = await fixture();
  try {
    const logPath = path.join(missing.directory, "contentmd-invocations.jsonl");
    const lines = (await readFile(logPath, "utf8")).trim().split("\n").slice(0, 2);
    await writeFile(logPath, `${lines.join("\n")}\n`);
    const bytes = await readFile(logPath);
    missing.manifest.evidence["contentmd-invocations.jsonl"] = { byte_count: bytes.byteLength, raw_bytes_digest: sha256Bytes(bytes) };
    await writeFile(path.join(missing.directory, "manifest.json"), `${JSON.stringify(missing.manifest)}\n`);
    await assert.rejects(verifyHostAgentAcceptanceBundle(missing.directory), /contentmd_invocation_count/);
  } finally {
    await rm(missing.directory, { recursive: true, force: true });
  }

  const unsafe = await fixture();
  try {
    unsafe.manifest.host_invocation.argv.push("--dangerously-bypass-approvals-and-sandbox");
    await writeFile(path.join(unsafe.directory, "manifest.json"), `${JSON.stringify(unsafe.manifest)}\n`);
    await assert.rejects(verifyHostAgentAcceptanceBundle(unsafe.directory), /host_command_unsafe_flag/);
  } finally {
    await rm(unsafe.directory, { recursive: true, force: true });
  }

  const credential = await fixture();
  try {
    credential.manifest.host.api_key = "must-not-be-recorded";
    await writeFile(path.join(credential.directory, "manifest.json"), `${JSON.stringify(credential.manifest)}\n`);
    await assert.rejects(verifyHostAgentAcceptanceBundle(credential.directory), /credential_material/);
  } finally {
    await rm(credential.directory, { recursive: true, force: true });
  }
});
