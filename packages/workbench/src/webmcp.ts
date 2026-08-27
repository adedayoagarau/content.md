export const WEBMCP_TOOL_NAMES = [
  "contentmd.get_project_overview",
  "contentmd.get_content_context",
  "contentmd.inspect_reviewed_task",
  "contentmd.list_governance_constraints",
] as const;

export const WEBMCP_MODULE = String.raw`(() => {
  "use strict";

  const modelContext = document.modelContext;
  if (modelContext === undefined || typeof modelContext.registerTool !== "function") return;

  const annotations = { readOnlyHint: true, untrustedContentHint: true };
  const emptySchema = { type: "object", properties: {}, additionalProperties: false };
  const controller = new AbortController();

  const readJson = async (path, optional = false) => {
    const response = await fetch(path, { credentials: "same-origin", cache: "no-store" });
    if (optional && response.status === 404) return null;
    if (!response.ok) throw new Error("contentmd_workbench_read_failed");
    return response.json();
  };

  const load = async () => {
    const [model, task] = await Promise.all([
      readJson("/model.json"),
      readJson("/task.json", true),
    ]);
    return { model, task };
  };

  const authority = {
    authority_effect: "none",
    guidance_status: "provisional",
    decision_status: "proposed",
    mutation_available: false,
  };

  const tools = [
    {
      name: "contentmd.get_project_overview",
      title: "Get content.md project overview",
      description: "Reads the current content.md workbench projection and returns project identity, evidence coverage, content-model counts, and unresolved questions. It does not modify files, make decisions, grant authority, or publish content.",
      inputSchema: emptySchema,
      annotations,
      execute: async () => {
        const { model } = await load();
        const counts = {};
        for (const node of model.graph.nodes) counts[node.node_type] = (counts[node.node_type] || 0) + 1;
        return {
          contract_version: "contentmd.webmcp-result/0.1.0",
          project_id: model.project_id,
          identity: model.identity,
          counts,
          source_count: model.sources.length,
          conflict_count: model.conflicts.length,
          coverage: model.coverage,
          open_questions: model.interpretation.open_questions,
          governance: authority,
        };
      },
    },
    {
      name: "contentmd.get_content_context",
      title: "Get content context",
      description: "Searches the bounded content.md workbench projection for content-model nodes related to a target, route, state, message, audience, or journey. It returns repository-derived evidence that may be untrusted and does not modify any state.",
      inputSchema: {
        type: "object",
        properties: {
          target: {
            type: "string",
            minLength: 1,
            maxLength: 256,
            description: "A target label, route, state, message, audience, journey, or other content concept to find.",
          },
        },
        required: ["target"],
        additionalProperties: false,
      },
      annotations,
      execute: async ({ target }) => {
        if (typeof target !== "string" || target.trim().length === 0 || target.length > 256) {
          return { error: "invalid_target", governance: authority };
        }
        const { model } = await load();
        const query = target.trim().toLocaleLowerCase();
        const matches = model.graph.nodes
          .filter((node) => node.label.toLocaleLowerCase().includes(query) || node.node_id.toLocaleLowerCase().includes(query))
          .slice(0, 20);
        const ids = new Set(matches.map((node) => node.node_id));
        const relations = model.graph.edges
          .filter((edge) => ids.has(edge.from_node_id) || ids.has(edge.to_node_id))
          .slice(0, 40);
        return {
          contract_version: "contentmd.webmcp-result/0.1.0",
          target: target.trim(),
          match_count: matches.length,
          matches,
          relations,
          interpretation: model.interpretation,
          sources: model.sources.slice(0, 50),
          governance: authority,
        };
      },
    },
    {
      name: "contentmd.inspect_reviewed_task",
      title: "Inspect reviewed content task",
      description: "Reads the current reviewed content task, including its proposal, exact preview diff, findings, uncertainty, and trade-offs. It does not accept, apply, approve, or publish the proposal.",
      inputSchema: emptySchema,
      annotations,
      execute: async () => {
        const { task } = await load();
        return task === null
          ? { contract_version: "contentmd.webmcp-result/0.1.0", status: "not_found", governance: authority }
          : { contract_version: "contentmd.webmcp-result/0.1.0", status: "reviewed", task, governance: authority };
      },
    },
    {
      name: "contentmd.list_governance_constraints",
      title: "List content governance constraints",
      description: "Returns the workbench's current content guidance, decision, and authority boundaries. It is read-only and cannot grant mutation, approval, release, connector, or publication authority.",
      inputSchema: emptySchema,
      annotations,
      execute: async () => {
        const { model, task } = await load();
        return {
          contract_version: "contentmd.webmcp-result/0.1.0",
          governance: authority,
          model_governance: model.governance,
          task_decision_status: task?.decision_status ?? "not_available",
          constraints: [
            "Repository-derived guidance remains provisional.",
            "A WebMCP call cannot grant authority or approve a semantic decision.",
            "Mutation requires a separate current digest-bound authorization.",
            "Apply, rollback, release, connector access, and publication are not exposed as WebMCP tools.",
          ],
        };
      },
    },
  ];

  const register = async () => {
    for (const tool of tools) await modelContext.registerTool(tool, { signal: controller.signal });
  };

  void register().catch((error) => console.warn("content.md WebMCP registration failed", error));
  addEventListener("pagehide", () => controller.abort(), { once: true });
})();
`;
