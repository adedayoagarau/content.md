import type { ProjectModelResult, ReviewedIdeCandidate } from "@contentmd/agent";

type WorkbenchReview = Pick<ReviewedIdeCandidate,
  | "task_digest"
  | "recommended_candidate_id"
  | "findings"
  | "explanation"
  | "uncertainty"
  | "trade_offs"
  | "preview_diff"
  | "decision_status"
  | "authority_effect"
>;

export interface WorkbenchModelProjection {
  contract_version: "contentmd.workbench-model/0.1.0";
  project_id: string;
  identity: {
    proposed_name: string;
    confidence: string;
    authority_effect: "none";
  };
  graph: {
    nodes: Array<{
      node_id: string;
      node_type: string;
      label: string;
      lifecycle_state: string;
      authority_effect: string;
    }>;
    edges: Array<{
      edge_id: string;
      from_node_id: string;
      to_node_id: string;
      relation: string;
    }>;
  };
  sources: Array<{ source_id: string; locator: string; content_digest: string }>;
  coverage: unknown;
  conflicts: Array<{ assessment_id: string; conflicting_claim_refs: string[] }>;
  interpretation: {
    personas: Array<{ name: string; description: string }>;
    voice_dimensions: Array<{ dimension: string; position: number; rationale: string }>;
    terminology: Array<{ term: string; guidance: string }>;
    open_questions: string[];
  };
  governance: {
    guidance_status: "provisional";
    decision_status: "proposed";
    authority_effect: "none";
  };
}

function text(value: unknown, fallback = "Not established"): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function number(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 50;
}

function object(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function array(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

export function projectWorkbenchModel(model: ProjectModelResult): WorkbenchModelProjection {
  const interpretation = object(model.proposed_interpretation);
  return {
    contract_version: "contentmd.workbench-model/0.1.0",
    project_id: model.project_id,
    identity: {
      proposed_name: model.identity.proposed_name,
      confidence: model.identity.confidence,
      authority_effect: "none",
    },
    graph: {
      nodes: model.graph.nodes.map((node) => ({
        node_id: node.node_id,
        node_type: node.node_type,
        label: node.label,
        lifecycle_state: node.lifecycle_state,
        authority_effect: node.authority_effect,
      })),
      edges: model.graph.edges.map((edge) => ({
        edge_id: edge.edge_id,
        from_node_id: edge.from_node_id,
        to_node_id: edge.to_node_id,
        relation: edge.relation,
      })),
    },
    sources: model.sources.map((source) => ({
      source_id: source.source_id,
      locator: source.locator,
      content_digest: source.content_digest,
    })),
    coverage: model.discovery.coverage,
    conflicts: model.assessments
      .filter((assessment) => assessment.conflicting_claim_refs.length > 0)
      .map((assessment) => ({
        assessment_id: assessment.assessment_id,
        conflicting_claim_refs: [...assessment.conflicting_claim_refs],
      })),
    interpretation: {
      personas: array(interpretation.persona_candidates).map((entry) => {
        const item = object(entry);
        return { name: text(item.name), description: text(item.description) };
      }),
      voice_dimensions: array(interpretation.voice_dimensions).map((entry) => {
        const item = object(entry);
        return {
          dimension: text(item.dimension),
          position: number(item.position),
          rationale: text(item.rationale),
        };
      }),
      terminology: array(interpretation.terminology_candidates).map((entry) => {
        const item = object(entry);
        return { term: text(item.term), guidance: text(item.guidance) };
      }),
      open_questions: array(interpretation.open_questions).map((entry) => text(object(entry).question)),
    },
    governance: {
      guidance_status: "provisional",
      decision_status: "proposed",
      authority_effect: "none",
    },
  };
}

function escapeHtml(value: unknown): string {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function nodeList(model: WorkbenchModelProjection, types: string[]): string {
  const nodes = model.graph.nodes.filter((node) => types.includes(node.node_type));
  if (nodes.length === 0) return '<p class="muted">Not established from repository evidence.</p>';
  return `<ul>${nodes.slice(0, 20).map((node) => (
    `<li><strong>${escapeHtml(node.label)}</strong><span>${escapeHtml(node.node_type.replaceAll("_", " "))}</span></li>`
  )).join("")}</ul>`;
}

function journeyVisual(model: WorkbenchModelProjection): string {
  const nodes = model.graph.nodes
    .filter((node) => ["journey", "stage", "state", "route"].includes(node.node_type))
    .slice(0, 6);
  if (nodes.length === 0) return '<p class="muted">No journey evidence established.</p>';
  const list = `<ol>${nodes.map((node) => `<li>${escapeHtml(node.label)}</li>`).join("")}</ol>`;
  const svgWidth = 760;
  const step = nodes.length > 1 ? Math.floor((svgWidth - 80) / (nodes.length - 1)) : 0;
  const lines = nodes.slice(1).map((_node, index) => (
    `<line x1="${40 + index * step}" y1="32" x2="${40 + (index + 1) * step}" y2="32" />`
  )).join("");
  const labels = nodes.map((node, index) => (
    `<g><circle cx="${40 + index * step}" cy="32" r="7"/><text x="${40 + index * step}" y="58" text-anchor="middle">${escapeHtml(node.label.slice(0, 18))}</text></g>`
  )).join("");
  return `${list}<svg viewBox="0 0 ${svgWidth} 76" role="img" aria-label="Evidence-linked journey sequence">${lines}${labels}</svg>`;
}

function voice(model: WorkbenchModelProjection): string {
  const dimensions = model.interpretation.voice_dimensions;
  if (dimensions.length === 0) return '<p class="muted">Voice dimensions are not established. Invite review before locking guidance.</p>';
  return dimensions.map((item) => `<div class="meter-row">
    <label for="voice-${escapeHtml(item.dimension)}">${escapeHtml(item.dimension)}</label>
    <span>Low</span><meter id="voice-${escapeHtml(item.dimension)}" min="0" max="100" value="${item.position}">${item.position}</meter><span>High</span>
    <small>${escapeHtml(item.rationale)}</small>
  </div>`).join("");
}

function proposal(review: WorkbenchReview | null): string {
  if (review?.preview_diff === null || review?.preview_diff === undefined) {
    return '<p class="muted">Prepare and review an IDE writing candidate to see an exact diff.</p>';
  }
  return `<p class="eyebrow">${escapeHtml(review.preview_diff.source_artifact)}:${review.preview_diff.line}</p>
    <div class="diff"><del>${escapeHtml(review.preview_diff.before)}</del><ins>${escapeHtml(review.preview_diff.after)}</ins></div>
    <p>${escapeHtml(review.explanation)}</p>`;
}

export function renderWorkbench(model: ProjectModelResult, taskReview: WorkbenchReview | null): string {
  const view = projectWorkbenchModel(model);
  const personas = view.interpretation.personas.length === 0
    ? '<p class="muted">Persona guidance is not established.</p>'
    : `<ul>${view.interpretation.personas.map((item) => `<li><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.description)}</span></li>`).join("")}</ul>`;
  const uncertainty = taskReview?.uncertainty ?? view.interpretation.open_questions;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(view.identity.proposed_name)} · content.md workbench</title>
  <style>
    :root{color-scheme:light;--ink:#19231f;--muted:#66716c;--paper:#f4f1e9;--card:#fffdf8;--line:#d9d5ca;--green:#185c45;--amber:#9b5d13}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:15px/1.5 ui-sans-serif,system-ui,sans-serif}header,main{max-width:1240px;margin:auto}header{padding:36px 24px 20px}h1{font:600 clamp(28px,5vw,52px)/1.05 Georgia,serif;margin:6px 0}h2{font-size:18px;margin:0 0 14px}h3{font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}p{margin:8px 0}.status,.eyebrow{font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:var(--green)}main{padding:0 24px 48px}.panes{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.pane,.section{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px}.sections{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:14px}.wide{grid-column:1/-1}.muted,small{color:var(--muted)}ul,ol{padding-left:20px}li{margin:8px 0}li span{display:block;color:var(--muted);font-size:13px}.diff{display:grid;gap:8px;margin:14px 0}.diff del,.diff ins{padding:10px;border-radius:8px;text-decoration:none}.diff del{background:#f7e5e0}.diff ins{background:#dff0e8}.meter-row{display:grid;grid-template-columns:1fr auto minmax(120px,2fr) auto;gap:8px;align-items:center;margin:12px 0}.meter-row small{grid-column:1/-1}meter{width:100%}svg{width:100%;height:auto;margin-top:8px}svg line{stroke:var(--line);stroke-width:2}svg circle{fill:var(--green)}svg text{font-size:10px;fill:var(--muted)}code{overflow-wrap:anywhere}@media(max-width:850px){.panes,.sections{grid-template-columns:1fr}.wide{grid-column:auto}}
  </style></head><body><header><p class="status">Guidance status: provisional</p><h1>${escapeHtml(view.identity.proposed_name)}</h1><p>Evidence-linked repository intelligence for accountable content decisions.</p></header><main>
  <div class="panes"><section class="pane"><h2>Task and context</h2><p><strong>Project</strong><br>${escapeHtml(view.project_id)}</p><p><strong>Task</strong><br>${escapeHtml(taskReview?.task_digest ?? "No reviewed task yet")}</p></section>
  <section class="pane"><h2>Proposal and diff</h2>${proposal(taskReview)}</section>
  <section class="pane"><h2>Evidence and control</h2><p><strong>${view.sources.length}</strong> ranked sources · <strong>${view.conflicts.length}</strong> conflicts</p><p>Decision: ${escapeHtml(taskReview?.decision_status ?? "proposed")} · Authority effect: none</p></section></div>
  <div class="sections"><section class="section"><h2>Product and audience</h2>${nodeList(view,["product","audience","job"])}</section>
  <section class="section"><h2>Journeys</h2>${journeyVisual(view)}</section>
  <section class="section"><h2>Information architecture</h2>${nodeList(view,["ia_node","navigation_relation","route"])}</section>
  <section class="section"><h2>Messages</h2>${nodeList(view,["semantic_message","expression_slot","expression_version"])}</section>
  <section class="section"><h2>Voice and personas</h2><h3>Voice dimensions</h3>${voice(view)}<h3>Personas</h3>${personas}</section>
  <section class="section"><h2>Evidence and conflicts</h2>${nodeList(view,["evidence_claim","conflict","open_question"])}</section>
  <section class="section wide"><h2>Decisions and governance</h2><p>Everything shown remains <strong>proposed</strong>. The workbench cannot edit source files, approve guidance, publish content, or grant authority.</p><h3>Open uncertainty</h3>${uncertainty.length === 0 ? '<p class="muted">No explicit uncertainty recorded.</p>' : `<ul>${uncertainty.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`}</section></div>
  </main><script src="/webmcp.js" defer></script></body></html>`;
}
