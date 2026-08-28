import { cp, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it, type TestContext } from "vitest";
import { compileProjectModel, modelLocalProject, prepareContentTask, reviewIdeCandidate } from "@contentmd/agent";
import { startWorkbench } from "../src/index.js";

const fixture = fileURLToPath(new URL("../../../fixtures/synthetic-mixed-stack/", import.meta.url));
const regularUserFixture = fileURLToPath(new URL("../../../fixtures/synthetic-web-app/", import.meta.url));
const temporaryDirectories: string[] = [];

async function startWorkbenchOnAvailableLoopback(
  context: TestContext,
  options: Parameters<typeof startWorkbench>[0],
) {
  try {
    return await startWorkbench(options);
  } catch (error) {
    if (error instanceof Error
      && error.message.includes("listen EPERM: operation not permitted 127.0.0.1")) {
      context.skip("This managed test host forbids opening loopback listeners.");
    }
    throw error;
  }
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

describe("local workbench server", () => {
  it("serves only governed projections on loopback with strict response controls", async (context) => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-workbench-"));
    temporaryDirectories.push(root);
    await cp(fixture, root, { recursive: true });
    await modelLocalProject(root);
    const prepared = await prepareContentTask(root, {
      request: "Improve the Analyze empty state",
      target: "studio/app/analyze/page.tsx:8",
    });
    await reviewIdeCandidate(root, {
      contract_version: "contentmd.ide-writing-candidate/0.1.0",
      task_digest: prepared.task.task_digest,
      alternatives: [{
        candidate_id: "candidate.empty-state.001",
        text: "Choose a product and stage to begin analysis.",
        rationale: "Names the inputs needed to continue.",
        evidence_refs: prepared.task.evidence_refs,
      }],
      recommended_candidate_id: "candidate.empty-state.001",
      claimed_authority_effect: "none",
    });

    const server = await startWorkbenchOnAvailableLoopback(context, { root, host: "127.0.0.1", port: 0 });
    try {
      const response = await fetch(server.url);
      expect(response.status).toBe(200);
      expect(response.headers.get("content-security-policy")).toContain("default-src 'self'");
      expect(response.headers.get("content-security-policy")).toContain("script-src 'self'");
      expect(response.headers.get("x-content-type-options")).toBe("nosniff");
      expect(response.headers.get("cache-control")).toBe("no-store");
      expect(response.headers.get("origin-agent-cluster")).toBe("?1");
      expect(response.headers.get("permissions-policy")).toBe("tools=(self)");
      expect(await response.text()).toContain('<script src="/webmcp.js" defer></script>');

      const modelResponse = await fetch(`${server.url}model.json`);
      const modelText = await modelResponse.text();
      expect(modelText).not.toContain('"content":');
      expect(modelText).not.toContain("PRIVATE_DATA_CANARY");
      const webmcpResponse = await fetch(`${server.url}webmcp.js`);
      const webmcpModule = await webmcpResponse.text();
      expect(webmcpResponse.headers.get("content-type")).toBe("text/javascript; charset=utf-8");
      expect(webmcpModule).toContain("document.modelContext");
      expect(webmcpModule).toContain("contentmd.get_project_overview");
      expect(webmcpModule).toContain("contentmd.get_content_context");
      expect(webmcpModule).toContain("contentmd.inspect_reviewed_task");
      expect(webmcpModule).toContain("contentmd.list_governance_constraints");
      expect(webmcpModule).toContain("readOnlyHint: true");
      expect(webmcpModule).toContain("untrustedContentHint: true");
      expect(webmcpModule).not.toContain("PRIVATE_DATA_CANARY");
      expect((await fetch(`${server.url}docs/context/PRODUCT-IDENTITY.md`)).status).toBe(404);
    } finally {
      await server.close();
    }
  });

  it("rejects non-loopback binding", async () => {
    await expect(startWorkbench({ root: fixture, host: "0.0.0.0", port: 0 }))
      .rejects.toThrow("workbench_host_not_local");
  });

  it("serves an in-memory regular-user model without requiring persisted runtime state", async (context) => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-workbench-preview-"));
    temporaryDirectories.push(root);
    await cp(fixture, root, { recursive: true });
    const model = await compileProjectModel({ project_root: root });

    const server = await startWorkbenchOnAvailableLoopback(context, { root, model, host: "127.0.0.1", port: 0 });
    try {
      const html = await (await fetch(server.url)).text();
      expect(html).toContain("Content inventory");
      expect(html).toContain("Top review findings");
      expect(html).toContain("qualified");
      expect((await fetch(`${server.url}model.json`)).status).toBe(200);
    } finally {
      await server.close();
    }
  });

  it("compares a candidate and previews a patch through the same-origin non-mutating UI action", async (context) => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-workbench-improve-"));
    temporaryDirectories.push(root);
    await cp(regularUserFixture, root, { recursive: true });
    const model = await compileProjectModel({ project_root: root });
    const sourcePath = join(root, "src/components/RecoveryPanel.tsx");
    const original = await readFile(sourcePath, "utf8");

    const server = await startWorkbenchOnAvailableLoopback(context, { root, model, host: "127.0.0.1", port: 0 });
    try {
      const html = await (await fetch(server.url)).text();
      expect(html).toContain('class="improvement-form"');
      expect(html).toContain("<fieldset><legend>Establish the missing facts</legend>");
      expect(html).toContain('role="status" aria-live="polite"');
      expect(html).toContain('type="submit">Compare candidate</button>');
      expect(html).toContain('class="apply-improvement" disabled>Apply reviewed patch</button>');
      expect(html).toContain('class="undo-improvement" disabled>Undo change</button>');
      expect(html).toContain("I reviewed this exact patch and authorize one local source change");
      expect(html).toContain('<script src="/workbench.js" defer></script>');
      const client = await (await fetch(`${server.url}workbench.js`)).text();
      expect(client).toContain("/api/improvement/compare");
      expect(client).toContain("/api/improvement/apply");
      expect(client).toContain("/api/improvement/undo");

      const projection = await (await fetch(`${server.url}model.json`)).json() as {
        top_findings: Array<{ finding_id: string; required_facts: string[] }>;
      };
      const selected = projection.top_findings[0]!;
      const requestBody = {
        finding_id: selected.finding_id,
        facts: Object.fromEntries(selected.required_facts.map((fact) => [fact, `User established: ${fact}`])),
        candidate_expression: "We couldn’t confirm the payment. Check your orders before trying again.",
        preview_patch: true,
      };
      const rejected = await fetch(`${server.url}api/improvement/compare`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      expect(rejected.status).toBe(403);

      const origin = server.url.slice(0, -1);
      const response = await fetch(`${server.url}api/improvement/compare`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Origin: origin },
        body: JSON.stringify(requestBody),
      });
      expect(response.status).toBe(200);
      const preview = await response.json() as Record<string, any>;
      expect(preview).toMatchObject({
        comparison: { status: "ready_for_patch_preview", mutation_effect: "none" },
        patch_preview: { mutation_status: "previewed_not_applied", authority_effect: "none" },
      });
      expect(await readFile(sourcePath, "utf8")).toBe(original);

      const unconfirmed = await fetch(`${server.url}api/improvement/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Origin: origin },
        body: JSON.stringify({
          ...requestBody,
          transaction_digest: preview.patch_preview.transaction_digest,
          confirmed: false,
        }),
      });
      expect(unconfirmed.status).toBe(400);
      expect(await readFile(sourcePath, "utf8")).toBe(original);

      const applied = await fetch(`${server.url}api/improvement/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Origin: origin },
        body: JSON.stringify({
          ...requestBody,
          transaction_digest: preview.patch_preview.transaction_digest,
          confirmed: true,
        }),
      });
      expect(applied.status).toBe(200);
      expect(await applied.json()).toMatchObject({
        changed: true,
        readback_verified: true,
        undo_status: "available",
        write_effect: "local_source_mutation",
        authority_effect: "local_source_mutation_only",
      });
      expect(await readFile(sourcePath, "utf8")).toContain(requestBody.candidate_expression);

      const undone = await fetch(`${server.url}api/improvement/undo`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Origin: origin },
        body: JSON.stringify({ transaction_digest: preview.patch_preview.transaction_digest, confirmed: true }),
      });
      expect(undone.status).toBe(200);
      expect(await undone.json()).toMatchObject({
        restored: true,
        readback_verified: true,
        undo_status: "completed",
      });
      expect(await readFile(sourcePath, "utf8")).toBe(original);
    } finally {
      await server.close();
    }
  });
});
