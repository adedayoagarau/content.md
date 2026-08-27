import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { compileProjectModel } from "@contentmd/agent";
import { renderWorkbench } from "../src/index.js";

const fixture = fileURLToPath(new URL("../../../fixtures/synthetic-mixed-stack/", import.meta.url));

describe("local task-first workbench rendering", () => {
  it("renders the governed model and proposal without exposing raw private content", async () => {
    const compiled = await compileProjectModel({ project_root: fixture });
    const model = {
      ...compiled,
      graph: {
        ...compiled.graph,
        nodes: [
          ...compiled.graph.nodes,
          { ...compiled.graph.nodes[0]!, node_id: "node.escape", label: "<script>unsafe()</script>" },
        ],
      },
      proposed_interpretation: {
        voice_dimensions: [{ dimension: "Warmth", position: 72, rationale: "Friendly but direct" }],
        persona_candidates: [{ name: "Content designer", description: "Reviews product messages" }],
        terminology_candidates: [],
        conflicts: [],
        open_questions: [],
      },
    };
    const review = {
      task_digest: "a".repeat(64),
      recommended_candidate_id: "candidate.1",
      findings: [],
      explanation: "Ready for accountable review.",
      uncertainty: ["Voice remains provisional."],
      trade_offs: ["More explicit and slightly longer."],
      preview_diff: {
        source_artifact: "studio/app/analyze/page.tsx",
        line: 7,
        column: 11,
        before: "Nothing to analyze yet",
        after: "Choose a product and stage to begin analysis.",
      },
      decision_status: "proposed",
      authority_effect: "none",
    };

    const html = renderWorkbench(model as any, review as any);

    expect(html).toContain("Task and context");
    expect(html).toContain("Proposal and diff");
    expect(html).toContain("Evidence and control");
    expect(html).toContain("Guidance status: provisional");
    expect(html).toContain("<meter");
    expect(html).toContain("<ol");
    expect(html).toContain("<svg");
    expect(html).toContain('<script src="/webmcp.js" defer></script>');
    expect(html).not.toContain("<script>unsafe()</script>");
    expect(html).not.toContain("PRIVATE_DATA_CANARY");
  });
});
