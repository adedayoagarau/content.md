import { cp, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { modelLocalProject, prepareContentTask, reviewIdeCandidate } from "@contentmd/agent";
import { startWorkbench } from "../src/index.js";

const fixture = fileURLToPath(new URL("../../../fixtures/synthetic-mixed-stack/", import.meta.url));
const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

describe("local workbench server", () => {
  it("serves only governed projections on loopback with strict response controls", async () => {
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

    const server = await startWorkbench({ root, host: "127.0.0.1", port: 0 });
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
});
