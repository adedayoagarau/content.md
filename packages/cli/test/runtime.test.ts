import { execFile } from "node:child_process";
import {
  access,
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";
import { canonicalJson } from "@contentmd/core";
import type { RuntimeProposalRecord } from "@contentmd/runtime-sdk";
import { SqliteEventStore } from "../../memory/src/sqlite-event-store.js";
import {
  BINDING_DATA_CLASSES,
  completeLocalConformance,
  governedBindingFixture,
} from "../../agent/test/runtime-binding-authority-fixture.js";

const execute = promisify(execFile);
const workspaceRoot = fileURLToPath(new URL("../../../", import.meta.url));
const cliSource = join(workspaceRoot, "packages/cli/src/main.ts");
const hostFixtureRoot = join(workspaceRoot, "fixtures/runtime-hosts/node-local");
const now = "2026-08-23T12:00:00.000Z";
const temporaryDirectories: string[] = [];

async function run(args: string[], acceptedCodes: readonly number[] = [0]) {
  try {
    const result = await execute(process.execPath, ["--import", "tsx", cliSource, ...args], {
      cwd: workspaceRoot,
      env: { ...process.env, NO_COLOR: "1" },
    });
    return { envelope: JSON.parse(result.stdout), stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    const failed = error as Error & { code?: number; stdout?: string; stderr?: string };
    if (failed.code !== undefined
      && acceptedCodes.includes(failed.code)
      && failed.stdout !== undefined) {
      return {
        envelope: JSON.parse(failed.stdout),
        stdout: failed.stdout,
        stderr: failed.stderr ?? "",
      };
    }
    throw error;
  }
}

async function projectFixture(): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), "contentmd-runtime-cli-"));
  temporaryDirectories.push(root);
  await cp(hostFixtureRoot, root, { recursive: true });
  return root;
}

async function fileTree(root: string): Promise<readonly string[]> {
  const files: string[] = [];
  async function walk(directory: string): Promise<void> {
    for (const name of (await readdir(directory)).sort()) {
      const path = join(directory, name);
      const metadata = await lstat(path);
      if (metadata.isDirectory()) await walk(path);
      else if (metadata.isFile()) files.push(relative(root, path));
    }
  }
  await walk(root);
  return files;
}

async function installProfile(root: string) {
  const conformance = completeLocalConformance(now);
  const path = join(root, ".contentmd/runtime/local-runtime-profile.json");
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, canonicalJson({
    contract_version: "contentmd.local-runtime-profile/0.1.0",
    descriptors: [conformance.descriptor],
  }), { mode: 0o600 });
  return conformance;
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => (
    rm(directory, { recursive: true, force: true })
  )));
});

describe("portable runtime CLI", () => {
  it("inspects without writes and proposes only one authority-free runtime record", async () => {
    const root = await projectFixture();
    const before = await fileTree(root);

    const inspected = await run(["runtime", "inspect", "--root", root, "--json"]);

    expect(inspected.envelope).toMatchObject({
      command_id: "runtime.inspect",
      status: "completed",
      data: { authority_effect: "none" },
    });
    expect(await fileTree(root)).toEqual(before);

    await installProfile(root);
    const proposed = await run(["runtime", "propose", "--root", root, "--json"]);
    const proposal = proposed.envelope.data as RuntimeProposalRecord;
    expect(proposed.envelope).toMatchObject({
      command_id: "runtime.propose",
      status: "completed",
      data: { authority_effect: "none" },
    });
    expect(JSON.parse(await readFile(
      join(root, ".contentmd/runtime/proposals", `${proposal.proposal_id}.json`),
      "utf8",
    ))).toEqual(proposal);
    await expect(access(join(root, ".contentmd/runtime/current-runtime-binding.json")))
      .rejects.toThrow();
  });

  it("maps a valid local bind without separate authority to governance denial", async () => {
    const root = await projectFixture();
    const conformance = await installProfile(root);
    const proposed = await run(["runtime", "propose", "--root", root, "--json"]);
    const proposal = proposed.envelope.data as RuntimeProposalRecord;
    const fixture = governedBindingFixture({
      proposal,
      descriptor: conformance.descriptor,
      receipts: conformance.receipts,
      now,
    });
    const decisionPath = join(
      root,
      ".contentmd/governance/runtime-binding-decisions",
      `${fixture.decision.decision_id}.json`,
    );
    await mkdir(dirname(decisionPath), { recursive: true });
    await writeFile(decisionPath, canonicalJson(fixture.decision), { mode: 0o600 });

    const denied = await run([
      "runtime", "bind",
      "--root", root,
      "--proposal", join(
        root,
        ".contentmd/runtime/proposals",
        `${proposal.proposal_id}.json`,
      ),
      "--decision", decisionPath,
      "--json",
    ], [21]);

    expect(denied.envelope).toMatchObject({
      command_id: "command.error",
      status: "denied_by_governance",
      exit_code: 21,
      findings: [{ code: "runtime_binding_not_authorized" }],
      data: null,
    });
    await expect(access(join(root, ".contentmd/runtime/current-runtime-binding.json")))
      .rejects.toThrow();
  });

  it("exits zero only after canonical activation readback and projection", async () => {
    const root = await projectFixture();
    const conformance = await installProfile(root);
    const proposed = await run(["runtime", "propose", "--root", root, "--json"]);
    const proposal = proposed.envelope.data as RuntimeProposalRecord;
    const fixture = governedBindingFixture({
      proposal,
      descriptor: conformance.descriptor,
      receipts: conformance.receipts,
      now,
    });
    const proposalPath = join(
      root,
      ".contentmd/runtime/proposals",
      `${proposal.proposal_id}.json`,
    );
    const decisionPath = join(
      root,
      ".contentmd/governance/runtime-binding-decisions",
      `${fixture.decision.decision_id}.json`,
    );
    const authorityPath = join(root, ".contentmd/governance/runtime-binding-authority.json");
    await mkdir(dirname(decisionPath), { recursive: true });
    await writeFile(decisionPath, canonicalJson(fixture.decision), { mode: 0o600 });
    await writeFile(authorityPath, canonicalJson(fixture.authority_bundle), { mode: 0o600 });
    const eventPath = join(root, ".contentmd/runtime/events.sqlite");
    const seed = new SqliteEventStore(eventPath, {
      permitted_data_classes: BINDING_DATA_CLASSES,
      runtime_version: "24.14.0",
    });
    await seed.append(fixture.decision_command);
    seed.close();

    const activated = await run([
      "runtime", "bind",
      "--root", root,
      "--proposal", proposalPath,
      "--decision", decisionPath,
      "--json",
    ]);

    expect(activated.envelope).toMatchObject({
      command_id: "runtime.bind",
      status: "completed",
      exit_code: 0,
      audit_ref: fixture.activation_command.event_id,
      data: {
        status: "activated",
        binding_id: fixture.binding.binding_id,
        binding_digest: fixture.binding_digest,
        activation_event_ref: fixture.activation_command.event_id,
        projection_digest: fixture.projection.projection_digest,
      },
    });
    expect(JSON.parse(await readFile(
      join(root, ".contentmd/runtime/current-runtime-binding.json"),
      "utf8",
    ))).toEqual(fixture.projection);
  });
});
