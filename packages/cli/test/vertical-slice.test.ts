import { execFile } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const execute = promisify(execFile);
const workspaceRoot = fileURLToPath(new URL("../../../", import.meta.url));
const fixtureSource = join(workspaceRoot, "fixtures/synthetic-web-app");
const patternPacket = join(workspaceRoot, "fixtures/frozen-pattern-packet");
const cliSource = join(workspaceRoot, "packages/cli/src/main.ts");
let root = "";

interface CommandEnvelope {
  schema_version: "contentmd.command-result/0.1.0";
  command_id: string;
  status: string;
  exit_code: number;
  record_refs: string[];
  findings: unknown[];
  warnings: string[];
  next_actions: string[];
  audit_ref: string | null;
  data: unknown;
}

async function run(args: string[], acceptedCodes: number[] = [0]): Promise<CommandEnvelope> {
  try {
    const { stdout } = await execute(process.execPath, ["--import", "tsx", cliSource, ...args], {
      cwd: workspaceRoot,
      env: { ...process.env, NO_COLOR: "1" },
      maxBuffer: 10 * 1024 * 1024,
    });
    const parsed = JSON.parse(stdout) as CommandEnvelope;
    expect(acceptedCodes).toContain(parsed.exit_code);
    return parsed;
  } catch (error) {
    const failed = error as Error & { code?: number; stdout?: string; stderr?: string };
    if (failed.code !== undefined && acceptedCodes.includes(failed.code) && failed.stdout !== undefined) {
      return JSON.parse(failed.stdout) as CommandEnvelope;
    }
    throw new Error(`CLI failed: ${args.join(" ")}\n${failed.stdout ?? ""}\n${failed.stderr ?? failed.message}`);
  }
}

beforeAll(async () => {
  root = await mkdtemp(join(tmpdir(), "contentmd-cli-fixture-"));
  await cp(fixtureSource, root, { recursive: true });
});

afterAll(async () => {
  await rm(root, { recursive: true, force: true });
});

describe("local CLI vertical slice", () => {
  it("runs adoption through verified exact mutation without auto-creating mutation approval", async () => {
    const init = await run(["init", "--yes", "--root", root, "--json"]);
    expect(init.status).toBe("completed");
    expect(await readFile(join(root, "CONTENT.md"), "utf8")).toContain("# CONTENT.md");

    expect((await run(["doctor", "--root", root, "--json"])).command_id).toBe("doctor");
    expect((await run(["discover", "--root", root, "--json"])).record_refs.length).toBeGreaterThan(0);
    expect((await run(["model", "--root", root, "--json"])).record_refs.length).toBeGreaterThan(0);
    expect((await run(["research", "ingest", "--root", root, "--packet", patternPacket, "--json"])).status).toBe("completed");
    expect((await run(["review", "--root", root, "--json"], [10])).status).toBe("findings_present");
    expect((await run(["strategy", "--root", root, "--provider", "recorded", "--json"])).status).toBe("completed");
    expect((await run(["draft", "--root", root, "--provider", "recorded", "--json"])).status).toBe("completed");
    expect((await run(["rewrite", "--root", root, "--provider", "recorded", "--json"])).status).toBe("completed");

    const decisionFile = join(root, ".contentmd-test", "decision.json");
    await writeFile(decisionFile, `${JSON.stringify({
      decision_id: "decision.fixture.accepted.cli",
      status: "accepted",
      actor_ref: "actor.fixture-reviewer",
      actor_role: "content_owner",
      rationale: "The exact destructive action remains accurate and testable.",
      proposal_ref: "prop_fixture_delete_workspace_v1",
      selected_expression: "Delete this workspace",
      edited_expression: null,
      evidence_reviewed: ["source.product", "source.design"],
      scope: "project",
      project_id: "project.beacon-checkout-lab-fixture",
      occurred_at: "2026-08-20T18:00:00.000Z",
      data_class: "project_feedback"
    }, null, 2)}\n`);
    expect((await run(["decision", "record", "--root", root, "--file", decisionFile, "--json"])).status).toBe("completed");
    expect((await run(["learn", "--root", root, "--json"], [20])).status).toBe("blocked_by_evidence");
    expect((await run(["diff", "--root", root, "--proposal", "prop_fixture_delete_workspace_v1", "--json"])).status).toBe("completed");

    expect((await run(["apply", "--root", root, "--transaction", "txn_fixture_delete_workspace_v1", "--preview", "--json"])).status).toBe("completed");
    const approvalDirectory = join(root, ".contentmd", "governance", "approvals");
    const approvalPath = join(approvalDirectory, "apr_fixture_delete_workspace_v1.json");
    await expect(readFile(approvalPath, "utf8")).rejects.toThrow();
    const transactionPath = join(root, ".contentmd", "runtime", "transactions", "txn_fixture_delete_workspace_v1.json");
    const transaction = JSON.parse(await readFile(transactionPath, "utf8")) as { transaction_digest: string };
    await mkdir(dirname(approvalPath), { recursive: true });
    const limits = { calls: 1, bytes: 4096, duration_ms: 2000, records: 2, model_tokens: 0, browser_actions: 0, retries: 0 };
    await writeFile(approvalPath, `${JSON.stringify({
      now: "2026-08-20T18:10:00.000Z",
      request: {
        operation_id: "operation.fixture.apply", intent: "apply", action: "filesystem.write", adapter_id: "adapter.filesystem",
        resource_scope: ["src/components/CheckoutSummary.tsx"], data_classes: ["public-synthetic"], egress: "none",
        requested_limits: limits, approval_class: "mutation", requires_readback: true, subject_digest: transaction.transaction_digest
      },
      policies: [{
        policy_id: "policy.fixture.change", policy_version: 1, status: "current", effective_at: "2026-08-20T00:00:00.000Z", expires_at: "2026-08-21T00:00:00.000Z",
        allowed_actions: ["filesystem.write"], denied_actions: [], review_actions: [], allowed_adapters: ["adapter.filesystem"], denied_adapters: [],
        permitted_data_classes: ["public-synthetic"], denied_data_classes: [], permitted_egress: ["none"], max_limits: limits,
        human_approval_actions: ["filesystem.write"], required_control_types: ["data_processing", "durable_memory", "telemetry"]
      }],
      capability_grant: {
        grant_id: "grant.fixture.apply", principal_ref: "actor.fixture.agent", workload_ref: "workload.contentmd", action: "filesystem.write",
        adapter_id: "adapter.filesystem", resource_scope: ["src/components/CheckoutSummary.tsx"], data_classes: ["public-synthetic"], egress: "none",
        max_limits: limits, issued_at: "2026-08-20T17:00:00.000Z", expires_at: "2026-08-20T19:00:00.000Z", revocation_state: "current"
      },
      approval: {
        approval_id: "apr_fixture_delete_workspace_v1", approval_class: "mutation", subject_ref: "operation.fixture.apply",
        subject_digest: transaction.transaction_digest, status: "issued", issued_at: "2026-08-20T18:00:00.000Z",
        expires_at: "2026-08-20T19:00:00.000Z", revocation_state: "current"
      },
      control_dispositions: [
        { control_type: "connection_authorization", applicability: "not_applicable", record_ref: null, status: "not_applicable", rationale: "No connector." },
        { control_type: "data_processing", applicability: "applicable", record_ref: "control.processing", status: "current", rationale: "Synthetic fixture." },
        { control_type: "durable_memory", applicability: "applicable", record_ref: "control.memory", status: "current", rationale: "Local audit." },
        { control_type: "telemetry", applicability: "applicable", record_ref: "control.telemetry", status: "current", rationale: "Local verification." }
      ],
      verification_plan_ref: "verify_fixture_delete_workspace_v1",
      reliability_evidence: null
    }, null, 2)}\n`);

    expect((await run(["apply", "--root", root, "--transaction", "txn_fixture_delete_workspace_v1", "--approval", "apr_fixture_delete_workspace_v1", "--json"])).status).toBe("completed");
    expect((await run(["verify", "--root", root, "--transaction", "txn_fixture_delete_workspace_v1", "--json"])).status).toBe("completed");
    expect(await readFile(join(root, "src/components/CheckoutSummary.tsx"), "utf8")).toContain("Delete this workspace");

    const rollbackAuthorization = JSON.parse(await readFile(approvalPath, "utf8")) as Record<string, any>;
    rollbackAuthorization.request.operation_id = "operation.fixture.rollback";
    rollbackAuthorization.request.action = "filesystem.rollback";
    rollbackAuthorization.policies[0].allowed_actions = ["filesystem.rollback"];
    rollbackAuthorization.policies[0].human_approval_actions = ["filesystem.rollback"];
    rollbackAuthorization.capability_grant.action = "filesystem.rollback";
    rollbackAuthorization.approval.approval_id = "apr_fixture_delete_workspace_rollback_v1";
    rollbackAuthorization.approval.subject_ref = "operation.fixture.rollback";
    const rollbackApprovalPath = join(approvalDirectory, "apr_fixture_delete_workspace_rollback_v1.json");
    await writeFile(rollbackApprovalPath, `${JSON.stringify(rollbackAuthorization, null, 2)}\n`);
    expect((await run([
      "rollback", "--root", root, "--transaction", "txn_fixture_delete_workspace_v1",
      "--approval", "apr_fixture_delete_workspace_rollback_v1", "--json",
    ])).status).toBe("completed");
    expect(await readFile(join(root, "src/components/CheckoutSummary.tsx"), "utf8")).toContain("Delete workspace");

    const uninstall = await run(["uninstall", "--root", root, "--preview", "--json"]);
    expect(uninstall.status).toBe("completed");
    expect(JSON.stringify(uninstall.data)).not.toContain("PRODUCT.md");
  }, 30_000);
});
