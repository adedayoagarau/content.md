import vm from "node:vm";
import { describe, expect, it } from "vitest";
import { WEBMCP_MODULE, WEBMCP_TOOL_NAMES } from "../src/index.js";

interface RegisteredTool {
  name: string;
  annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
  execute(input: Record<string, unknown>): Promise<Record<string, unknown>>;
}

const model = {
  project_id: "project.contentmd",
  identity: { proposed_name: "content.md", confidence: "high", authority_effect: "none" },
  graph: {
    nodes: [
      { node_id: "route.checkout", node_type: "route", label: "Checkout recovery", lifecycle_state: "proposed", authority_effect: "none" },
      { node_id: "message.retry", node_type: "semantic_message", label: "Retry payment", lifecycle_state: "proposed", authority_effect: "none" },
    ],
    edges: [{ edge_id: "edge.1", from_node_id: "route.checkout", to_node_id: "message.retry", relation: "contains" }],
  },
  sources: [{ source_id: "source.1", locator: "src/checkout.tsx:12", content_digest: "a".repeat(64) }],
  coverage: { status: "partial" },
  conflicts: [],
  interpretation: {
    personas: [],
    voice_dimensions: [],
    terminology: [],
    open_questions: ["Who approves checkout recovery content?"],
  },
  governance: { guidance_status: "provisional", decision_status: "proposed", authority_effect: "none" },
};

const task = {
  task_digest: "b".repeat(64),
  decision_status: "proposed",
  authority_effect: "none",
  preview_diff: { source_artifact: "src/checkout.tsx", line: 12, before: "Try again", after: "Check your payment details and try again" },
};

async function registeredTools(): Promise<RegisteredTool[]> {
  const tools: RegisteredTool[] = [];
  const context = vm.createContext({
    AbortController,
    Set,
    console,
    document: {
      modelContext: {
        async registerTool(tool: RegisteredTool): Promise<void> {
          tools.push(tool);
        },
      },
    },
    async fetch(path: string): Promise<{ ok: boolean; status: number; json(): Promise<unknown> }> {
      const value = path === "/model.json" ? model : task;
      return { ok: true, status: 200, json: async () => value };
    },
    addEventListener() {},
  });
  vm.runInContext(WEBMCP_MODULE, context);
  for (let attempt = 0; attempt < 20 && tools.length < WEBMCP_TOOL_NAMES.length; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  return tools;
}

describe("content.md WebMCP tools", () => {
  it("registers the governed read-only surface and returns bounded projections", async () => {
    const tools = await registeredTools();
    expect(tools.map((tool) => tool.name)).toEqual(WEBMCP_TOOL_NAMES);
    expect(tools.every((tool) => tool.annotations.readOnlyHint && tool.annotations.untrustedContentHint)).toBe(true);

    const overview = await tools[0]!.execute({});
    expect(overview).toMatchObject({
      project_id: "project.contentmd",
      source_count: 1,
      conflict_count: 0,
      governance: { authority_effect: "none", mutation_available: false },
    });

    const context = await tools[1]!.execute({ target: "checkout" });
    expect(context).toMatchObject({ target: "checkout", match_count: 1 });
    expect((context.matches as Array<{ node_id: string }>)[0]?.node_id).toBe("route.checkout");
    expect((context.relations as unknown[])).toHaveLength(1);

    const reviewedTask = await tools[2]!.execute({});
    expect(reviewedTask).toMatchObject({ status: "reviewed", task: { decision_status: "proposed" } });

    const governance = await tools[3]!.execute({});
    expect(governance).toMatchObject({
      governance: { authority_effect: "none", mutation_available: false },
      task_decision_status: "proposed",
    });
  });

  it("rejects an invalid context query inside the handler", async () => {
    const tools = await registeredTools();
    await expect(tools[1]!.execute({ target: "" })).resolves.toMatchObject({
      error: "invalid_target",
      governance: { authority_effect: "none" },
    });
  });
});
