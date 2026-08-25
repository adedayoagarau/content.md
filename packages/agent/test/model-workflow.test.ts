import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { compileProjectModel } from "@contentmd/agent";
import { contentGraphBytes } from "@contentmd/core";

const fixtureRoot = fileURLToPath(
  new URL("../../../fixtures/synthetic-web-app/", import.meta.url),
);
const mixedRoot = fileURLToPath(
  new URL("../../../fixtures/synthetic-mixed-stack/", import.meta.url),
);

describe("project model workflow", () => {
  it("compiles the fixture into a deterministic content graph", async () => {
    const first = await compileProjectModel({ project_root: fixtureRoot });
    const second = await compileProjectModel({ project_root: fixtureRoot });
    const types = new Set(first.graph.nodes.map((node) => node.node_type));

    expect(first.sources.map((source) => source.locator)).toEqual(["DESIGN.md", "PRODUCT.md"]);
    expect(first.discovery.occurrences.length).toBeGreaterThan(10);
    for (const required of [
      "product",
      "audience",
      "job",
      "journey",
      "stage",
      "state",
      "route",
      "ia_node",
      "navigation_relation",
      "semantic_message",
      "expression_slot",
      "expression_version",
      "implementation_occurrence",
      "open_question",
    ] as const) {
      expect(types.has(required), required).toBe(true);
    }
    expect(contentGraphBytes(first.graph)).toBe(contentGraphBytes(second.graph));
    expect(first.graph.nodes.some((node) => node.label === "merchant content designer")).toBe(true);
    expect(first.graph.nodes.some((node) => node.label === "/workspaces")).toBe(true);
  });

  it("compiles a mixed-stack repository from evidence instead of required filenames", async () => {
    const result = await compileProjectModel({ project_root: mixedRoot });

    expect(result.project_id).toBe("project.synthetic-content-studio");
    expect(result.identity).toMatchObject({
      proposed_name: "synthetic-content-studio",
      confidence: "high",
      authority_effect: "none",
    });
    expect(result.sources.map((source) => source.locator)).toContain(
      "docs/context/PRODUCT-IDENTITY.md",
    );
    expect(result.graph.nodes).toEqual(expect.arrayContaining([
      expect.objectContaining({ node_type: "product", label: "Synthetic Studio" }),
      expect.objectContaining({ node_type: "audience", label: "checkout content designers" }),
      expect.objectContaining({ node_type: "journey", label: "Explore → Analyze → Review → Deliver → Track" }),
      expect.objectContaining({
        node_type: "conflict",
        attributes: expect.objectContaining({ status: "resolved_provisionally" }),
      }),
    ]));
    expect(result.graph.nodes.every((node) => node.lifecycle_state === "proposed")).toBe(true);
    expect(result.graph.nodes.every((node) => node.authority_effect === "none")).toBe(true);
  });
});
