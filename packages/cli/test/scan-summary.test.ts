import { execFile } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";

const execute = promisify(execFile);
const workspaceRoot = fileURLToPath(new URL("../../../", import.meta.url));
const fixtureSource = join(workspaceRoot, "fixtures/synthetic-web-app");
const cliSource = join(workspaceRoot, "packages/cli/src/main.ts");
const cliBuilt = join(workspaceRoot, "packages/cli/dist/main.js");
const temporaryDirectories: string[] = [];

async function run(args: string[], cwd = workspaceRoot) {
  return execute(process.execPath, ["--import", "tsx", cliSource, ...args], {
    cwd,
    env: { ...process.env, NO_COLOR: "1" },
  });
}

async function runBuilt(args: string[], cwd: string) {
  return execute(process.execPath, [cliBuilt, ...args], {
    cwd,
    env: { ...process.env, NO_COLOR: "1" },
  });
}

async function runAllowingFailure(args: string[]) {
  try {
    return await run(args);
  } catch (error) {
    const failure = error as Error & { stdout?: string; stderr?: string };
    return { stdout: failure.stdout ?? "", stderr: failure.stderr ?? "" };
  }
}

async function absent(path: string): Promise<boolean> {
  try {
    await readFile(path);
    return false;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return true;
    throw error;
  }
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })));
});

describe("regular-user scan summary", () => {
  it("reports qualified content separately and leaves the repository unchanged", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-scan-summary-"));
    temporaryDirectories.push(root);
    await cp(fixtureSource, root, { recursive: true });

    const result = await run(["scan", "--summary", "--root", root, "--json"]);
    const envelope = JSON.parse(result.stdout) as {
      command_id: string;
      audit_ref: string | null;
      data: Record<string, unknown>;
    };

    expect(envelope.command_id).toBe("scan.summary");
    expect(envelope.audit_ref).toBeNull();
    expect(envelope.data).toMatchObject({ write_effect: "none" });
    expect(envelope.data.occurrence_count).toBeTypeOf("number");
    expect(envelope.data.qualified_count).toBeTypeOf("number");
    expect(envelope.data.microcopy_count).toBeTypeOf("number");
    expect(envelope.data.top_findings).toBeInstanceOf(Array);
    expect(Number(envelope.data.qualified_count)).toBeGreaterThan(0);
    expect(await absent(join(root, ".contentmd/runtime/discovery.json"))).toBe(true);
    expect(result.stderr).not.toContain("contentmd:");
  });

  it("renders a compact human-readable summary", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-scan-summary-"));
    temporaryDirectories.push(root);
    await cp(fixtureSource, root, { recursive: true });

    const result = await run(["scan", "--summary", "--root", root]);

    expect(result.stdout).toContain("qualified content:");
    expect(result.stdout).toContain("microcopy:");
    expect(result.stdout).toContain("write effect: none (preview only)");
    expect(result.stdout.length).toBeLessThan(2_000);
    expect(result.stderr).toContain("contentmd: scan started");
    expect(result.stderr).toContain("contentmd: completed");
  });

  it("uses the safe summary scan as the no-argument npx golden path", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-default-scan-"));
    temporaryDirectories.push(root);
    await cp(fixtureSource, root, { recursive: true });

    const result = await runBuilt([], root);

    expect(result.stdout).toContain("scan.summary: completed");
    expect(result.stdout).toContain("write effect: none (preview only)");
    expect(await absent(join(root, ".contentmd/runtime/discovery.json"))).toBe(true);
  });

  it("keeps discover preview-only unless --save is explicit", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-discover-preview-"));
    temporaryDirectories.push(root);
    await cp(fixtureSource, root, { recursive: true });

    const preview = await run(["discover", "--root", root, "--json"]);
    expect(JSON.parse(preview.stdout)).toMatchObject({ audit_ref: null });
    expect(await absent(join(root, ".contentmd/runtime/discovery.json"))).toBe(true);

    const saved = await run(["discover", "--save", "--root", root, "--json"]);
    expect(JSON.parse(saved.stdout).audit_ref).toBeTypeOf("string");
    expect(await absent(join(root, ".contentmd/runtime/discovery.json"))).toBe(false);
  });

  it("selects one application workspace, excludes siblings, and inherits root context", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-monorepo-scan-"));
    temporaryDirectories.push(root);
    await writeFile(join(root, "package.json"), JSON.stringify({ name: "suite", workspaces: ["apps/*", "packages/*"] }));
    await writeFile(join(root, "PRODUCT.md"), "# Suite\n\nSuite helps teams review content.\n");
    await mkdir(join(root, "apps/web"), { recursive: true });
    await writeFile(join(root, "apps/web/package.json"), JSON.stringify({ name: "web", scripts: { dev: "next dev" } }));
    await writeFile(join(root, "apps/web/Page.tsx"), "export const Page = () => <button>Review content</button>;\n");
    await mkdir(join(root, "packages/tokens"), { recursive: true });
    await writeFile(join(root, "packages/tokens/package.json"), JSON.stringify({ name: "tokens", scripts: { build: "tsc" } }));
    await writeFile(join(root, "packages/tokens/demo.tsx"), "export const Demo = () => <p>Library demo content</p>;\n");

    const result = await run(["scan", "--summary", "--root", root, "--json"]);
    const envelope = JSON.parse(result.stdout) as { data: Record<string, unknown> };

    expect(envelope.data).toMatchObject({
      workspace_selection: "automatic_single_application",
      inherited_context_sources: ["repository-root:PRODUCT.md"],
      occurrence_count: 1,
    });
    expect(String(envelope.data.scanned_root)).toContain("/apps/web");
  });

  it("requires a workspace choice when a monorepo has multiple applications", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-monorepo-choice-"));
    temporaryDirectories.push(root);
    await writeFile(join(root, "package.json"), JSON.stringify({ name: "suite", workspaces: ["apps/*"] }));
    for (const app of ["admin", "web"]) {
      await mkdir(join(root, "apps", app), { recursive: true });
      await writeFile(join(root, "apps", app, "package.json"), JSON.stringify({ name: app, scripts: { dev: "next dev" } }));
      await writeFile(join(root, "apps", app, "Page.tsx"), `export const Page = () => <p>${app}</p>;\n`);
    }

    const blocked = await runAllowingFailure(["scan", "--summary", "--root", root, "--json"]);
    const envelope = JSON.parse(blocked.stdout) as { status: string; next_actions: string[] };
    expect(envelope).toMatchObject({ status: "invalid_input" });
    expect(envelope.next_actions[0]).toContain("apps/admin,apps/web");

    const selected = await run(["scan", "--summary", "--root", root, "--workspace", "apps/web", "--json"]);
    expect(JSON.parse(selected.stdout).data).toMatchObject({ workspace_selection: "explicit", occurrence_count: 1 });
  });

  it("inspects a ranked finding and prepares a non-mutating improvement brief", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-finding-journey-"));
    temporaryDirectories.push(root);
    await cp(fixtureSource, root, { recursive: true });

    const inspected = await run(["scan", "--inspect", "1", "--root", root, "--json"]);
    const inspection = JSON.parse(inspected.stdout) as { command_id: string; data: Record<string, any> };
    expect(inspection.command_id).toBe("scan.inspect");
    expect(inspection.data.inspection).toMatchObject({
      finding: { severity: "high", rule_id: "content.error_missing_recovery" },
      content_unit: { qualification: "qualified" },
    });

    const improved = await run(["scan", "--improve", "1", "--root", root, "--json"]);
    const improvement = JSON.parse(improved.stdout) as { command_id: string; data: Record<string, any> };
    expect(improvement.command_id).toBe("scan.improve");
    expect(improvement.data.improvement_brief).toMatchObject({
      proposal_status: "context_required",
      mutation_effect: "none",
      authority_effect: "none",
    });
    expect(improvement.data.improvement_brief).not.toHaveProperty("proposed_expression");
    expect(await absent(join(root, ".contentmd/runtime/discovery.json"))).toBe(true);

    const contextPath = join(root, "improvement-context.json");
    const requiredFacts = improvement.data.improvement_brief.required_facts as string[];
    await writeFile(contextPath, JSON.stringify({
      finding_ref: inspection.data.inspection.finding.finding_id,
      facts: Object.fromEntries(requiredFacts.map((fact) => [fact, `User established: ${fact}`])),
      provenance: "user_supplied",
      authority_effect: "none",
    }));
    const sourcePath = join(root, "src/components/RecoveryPanel.tsx");
    const before = await readFile(sourcePath, "utf8");
    const previewed = await run([
      "scan", "--improve", "1", "--root", root,
      "--context", contextPath,
      "--candidate", "We couldn’t confirm the payment. Check your orders before trying again.",
      "--preview-patch", "--json",
    ]);
    const preview = JSON.parse(previewed.stdout) as { data: Record<string, any> };
    expect(preview.data.improvement_comparison).toMatchObject({ status: "ready_for_patch_preview" });
    expect(preview.data.patch_preview).toMatchObject({
      target_path: "src/components/RecoveryPanel.tsx",
      mutation_status: "previewed_not_applied",
      authority_effect: "none",
    });
    expect(preview.data.patch_preview).not.toHaveProperty("rollback_bytes_base64");
    expect(await readFile(sourcePath, "utf8")).toBe(before);

    const unconfirmed = await runAllowingFailure([
      "scan", "--improve", "1", "--root", root,
      "--context", contextPath,
      "--candidate", "We couldn’t confirm the payment. Check your orders before trying again.",
      "--apply-patch", preview.data.patch_preview.transaction_digest, "--json",
    ]);
    expect(JSON.parse(unconfirmed.stdout)).toMatchObject({ status: "denied_by_governance" });
    expect(await readFile(sourcePath, "utf8")).toBe(before);

    const applied = await run([
      "scan", "--improve", "1", "--root", root,
      "--context", contextPath,
      "--candidate", "We couldn’t confirm the payment. Check your orders before trying again.",
      "--apply-patch", preview.data.patch_preview.transaction_digest, "--yes", "--json",
    ]);
    const appliedEnvelope = JSON.parse(applied.stdout) as { command_id: string; data: Record<string, any> };
    expect(appliedEnvelope.command_id).toBe("scan.apply-improvement");
    expect(appliedEnvelope.data.applied_change).toMatchObject({
      target_path: "src/components/RecoveryPanel.tsx",
      transaction_digest: preview.data.patch_preview.transaction_digest,
      changed: true,
      readback_verified: true,
      undo_status: "available",
      authority_effect: "local_source_mutation_only",
    });
    expect(appliedEnvelope.data.write_effect).toBe("local_source_mutation");
    expect(await readFile(sourcePath, "utf8")).toContain(
      "We couldn’t confirm the payment. Check your orders before trying again.",
    );

    const undone = await run([
      "undo", "--transaction", preview.data.patch_preview.transaction_digest,
      "--root", root, "--yes", "--json",
    ]);
    expect(JSON.parse(undone.stdout)).toMatchObject({
      command_id: "undo.regular-user-improvement",
      data: { restored: true, readback_verified: true, undo_status: "completed" },
    });
    expect(await readFile(sourcePath, "utf8")).toBe(before);
  });

  it("creates and evaluates an explicit independent qualification review packet", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-qualification-review-"));
    temporaryDirectories.push(root);
    await cp(fixtureSource, root, { recursive: true });
    const packetPath = join(root, "qualification-review.json");

    const sampled = await run([
      "scan", "--root", root, "--review-sample", "10", "--review-output", packetPath, "--json",
    ]);
    const sampleEnvelope = JSON.parse(sampled.stdout) as { command_id: string; data: Record<string, any> };
    const packet = JSON.parse(await readFile(packetPath, "utf8")) as Record<string, any>;

    expect(sampleEnvelope.command_id).toBe("scan.review-sample");
    expect(sampleEnvelope.data).toMatchObject({ write_effect: "none", review_packet_output: packetPath });
    expect(packet).toMatchObject({
      sample_method: "deterministic_stratified_round_robin",
      review_status: "awaiting_independent_review",
      authority_effect: "none",
    });
    expect(packet.items.length).toBeGreaterThan(0);
    expect(packet.items.length).toBeLessThanOrEqual(10);
    expect(packet.items.every((item: Record<string, unknown>) =>
      item.reviewer_qualification === null
      && item.reviewer_role === null
      && item.reviewer_notes === null)).toBe(true);

    const incomplete = await runAllowingFailure([
      "scan", "--root", root, "--evaluate-review", packetPath, "--json",
    ]);
    expect(JSON.parse(incomplete.stdout)).toMatchObject({
      status: "blocked_by_evidence",
      findings: [{ code: "qualification_review_incomplete" }],
    });

    for (const [index, item] of packet.items.entries()) {
      item.reviewer_qualification = item.proposed_qualification;
      item.reviewer_role = index % 2 === 0 ? "qualified_content_designer" : "taxonomy_steward";
      item.reviewer_notes = "Independently reviewed against the source context.";
    }
    await writeFile(packetPath, JSON.stringify(packet));

    const evaluated = await run([
      "scan", "--root", root, "--evaluate-review", packetPath, "--json",
    ]);
    const evaluationEnvelope = JSON.parse(evaluated.stdout) as { command_id: string; data: Record<string, any> };
    expect(evaluationEnvelope.command_id).toBe("scan.review-evaluation");
    expect(evaluationEnvelope.data.review_evaluation).toMatchObject({
      completed_item_count: packet.items.length,
      reviewer_roles: ["qualified_content_designer", "taxonomy_steward"],
      review_status: "independently_reviewed",
      authority_effect: "none",
      evaluation: {
        exact_disposition_accuracy: 1,
        qualified: { precision: 1, recall: 1 },
        mismatches: [],
      },
    });
    expect(await absent(join(root, ".contentmd/runtime/discovery.json"))).toBe(true);

    const refusedOverwrite = await runAllowingFailure([
      "scan", "--root", root, "--review-sample", "2", "--review-output", packetPath, "--json",
    ]);
    expect(JSON.parse(refusedOverwrite.stdout)).toMatchObject({ status: "invalid_input" });
  });
});
