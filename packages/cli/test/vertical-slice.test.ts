import { execFile } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { runtimeDecisionAuthorityFixture } from "./runtime-decision-authority-fixture.js";

const execute = promisify(execFile);
const workspaceRoot = fileURLToPath(new URL("../../../", import.meta.url));
const fixtureSource = join(workspaceRoot, "fixtures/synthetic-mixed-stack");
const cliSource = join(workspaceRoot, "packages/cli/src/main.ts");
let root = "";

interface CommandEnvelope {
  command_id: string;
  status: string;
  exit_code: number;
  record_refs: string[];
  data: any;
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

function mutationAuthorization(transaction: any) {
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
      policy_id: "policy.mixed-stack.change", policy_version: 1, status: "current",
      effective_at: "2026-08-25T00:00:00.000Z", expires_at: "2026-08-26T00:00:00.000Z",
      allowed_actions: ["filesystem.write"], denied_actions: [], review_actions: [],
      allowed_adapters: ["adapter.filesystem"], denied_adapters: [], permitted_data_classes: ["public-synthetic"],
      denied_data_classes: [], permitted_egress: ["none"], max_limits: limits,
      human_approval_actions: ["filesystem.write"], required_control_types: ["data_processing", "durable_memory", "telemetry"],
    }],
    capability_grant: {
      grant_id: "grant.mixed-stack.apply", principal_ref: "actor.fixture.agent", workload_ref: "workload.contentmd",
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

beforeAll(async () => {
  root = await mkdtemp(join(tmpdir(), "contentmd-cli-mixed-stack-"));
  await cp(fixtureSource, root, { recursive: true });
});

afterAll(async () => {
  await rm(root, { recursive: true, force: true });
});

describe("mixed-stack repository intelligence vertical slice", () => {
  it("adopts, models, prepares, reviews, approves, applies, verifies, and previews uninstall", async () => {
    const initPreview = await run(["init", "--root", root, "--json"], [20]);
    await run(["init", "--root", root, "--yes", "--plan-digest", initPreview.record_refs[0]!, "--json"]);
    const discovered = await run(["discover", "--root", root, "--json"]);
    const modeled = await run(["model", "--root", root, "--json"]);
    expect(discovered.data.coverage.failed).toBe(0);
    expect(modeled.data.graph.nodes.some((node: { label: string }) => node.label === "checkout content designers")).toBe(true);

    const prepared = await run([
      "task", "prepare", "--root", root, "--request", "Improve the Analyze empty state",
      "--target", "studio/app/analyze/page.tsx:8", "--json",
    ]);
    expect(prepared.status).toBe("completed");
    const candidatePath = join(root, ".contentmd-test/ide-candidate.json");
    await mkdir(dirname(candidatePath), { recursive: true });
    await writeFile(candidatePath, `${JSON.stringify({
      contract_version: "contentmd.ide-writing-candidate/0.1.0",
      task_digest: prepared.data.task.task_digest,
      alternatives: [{
        candidate_id: "candidate.empty-state.001",
        text: "Choose a product and stage to begin analysis.",
        rationale: "Names the inputs needed to continue.",
        evidence_refs: prepared.data.task.evidence_refs,
      }],
      recommended_candidate_id: "candidate.empty-state.001",
      claimed_authority_effect: "none",
    }, null, 2)}\n`, "utf8");
    const reviewed = await run(["task", "review", "--root", root, "--input", candidatePath, "--json"]);

    const decisionPath = join(root, ".contentmd-test/decision.json");
    const decisionInput = {
      expected_head_digest: null,
      decision_id: "decision.mixed-stack.empty-state.001",
      status: "accepted" as const,
      actor_ref: "actor.fixture-reviewer",
      actor_role: "content_owner",
      rationale: "The proposal gives an exact next action without inventing product behavior.",
      proposal_ref: reviewed.data.candidate_digest,
      selected_expression: reviewed.data.preview_diff.after,
      edited_expression: null,
      evidence_reviewed: [prepared.data.task.task_digest, prepared.data.target_occurrence.occurrence_id],
      scope: "project" as const,
      project_id: modeled.data.project_id,
      occurred_at: "2026-08-25T18:00:00.000Z",
      data_class: "project_feedback",
    };
    await writeFile(decisionPath, `${JSON.stringify(decisionInput, null, 2)}\n`, "utf8");
    const runtimeAuthorityPath = join(root, ".contentmd/governance/runtime-decision-authority.json");
    await mkdir(dirname(runtimeAuthorityPath), { recursive: true });
    await writeFile(runtimeAuthorityPath, `${JSON.stringify(runtimeDecisionAuthorityFixture(decisionInput), null, 2)}\n`, "utf8");
    await run(["decision", "record", "--root", root, "--file", decisionPath, "--json"]);

    const transactionId = "txn_mixed_stack_empty_state_v1";
    const preview = await run(["apply", "--root", root, "--transaction", transactionId, "--preview", "--json"]);
    expect(preview.data).toMatchObject({
      operation_id: `operation.task.${prepared.data.task.task_digest.slice(0, 24)}`,
      proposal_id: `candidate.${reviewed.data.candidate_digest}`,
      decision_id: decisionInput.decision_id,
      target_path: "studio/app/analyze/page.tsx",
      before: "Nothing to analyze yet",
      after: "Choose a product and stage to begin analysis.",
    });
    expect(preview.data.verification_id).toContain(prepared.data.target_occurrence.occurrence_id);

    const approvalPath = join(root, `.contentmd/governance/approvals/${preview.data.approval_id}.json`);
    await mkdir(dirname(approvalPath), { recursive: true });
    await writeFile(approvalPath, `${JSON.stringify(mutationAuthorization(preview.data), null, 2)}\n`, "utf8");
    await run(["apply", "--root", root, "--transaction", transactionId, "--approval", preview.data.approval_id, "--json"]);
    const verified = await run(["verify", "--root", root, "--transaction", transactionId, "--json"]);
    expect(verified.data).toMatchObject({
      verified: true,
      parsed_occurrence: {
        source_artifact: "studio/app/analyze/page.tsx",
        line: 7,
        column: 11,
        expression_payload: "Choose a product and stage to begin analysis.",
      },
    });
    expect(await readFile(join(root, "studio/app/analyze/page.tsx"), "utf8"))
      .toContain("Choose a product and stage to begin analysis.");

    const uninstall = await run(["uninstall", "--root", root, "--preview", "--json"]);
    expect(uninstall.status).toBe("completed");
    expect(JSON.stringify(uninstall.data)).not.toContain("studio/app/analyze/page.tsx");
  }, 30_000);
});
