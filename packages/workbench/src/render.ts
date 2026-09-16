import type { ProjectModelResult, ReviewedIdeCandidate } from "@contentmd/agent";
import { createContentImprovementBrief, rankContentReviewFindings } from "@contentmd/core";

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
  content_inventory: ProjectModelResult["content_inventory"]["summary"];
  top_findings: Array<{
    finding_id: string;
    severity: string;
    title: string;
    rationale: string;
    expression: string;
    source_artifact: string;
    required_facts: string[];
  }>;
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

export interface WorkbenchAdoptionState {
  status: "not_adopted" | "adopted";
  plan_digest: string | null;
  project_root: string;
  creates: string[];
}

function shellQuote(value: string): string {
  return `'${value.replaceAll("'", `'\\''`)}'`;
}

function adoptionNotice(state: WorkbenchAdoptionState | null): string {
  if (state === null || state.status === "adopted") return "";
  const command = `npx contentmd init --yes --plan-digest ${state.plan_digest} --root ${shellQuote(state.project_root)}`;
  const creates = state.creates.length === 0
    ? "No new contract files"
    : state.creates.map(escapeHtml).join(" · ");
  return `<aside class="setup" aria-labelledby="setup-title"><div><p class="eyebrow">Preview mode</p><h2 id="setup-title">Use the workbench now. Adopt when you are ready.</h2><p>This scan has not changed the repository. Adoption creates the listed local contract files only after you approve this exact plan digest.</p></div><div><p><strong>Planned files</strong><br>${creates}</p><p><strong>Approve in your terminal</strong></p><code>${escapeHtml(command)}</code></div></aside>`;
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
  const topFindings = rankContentReviewFindings(model.content_inventory.units, 10);
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
    content_inventory: model.content_inventory.summary,
    top_findings: topFindings.map((finding) => {
      const unit = model.content_inventory.units.find((item) => item.qualification_id === finding.qualification_ref);
      if (unit === undefined) throw new Error("workbench_finding_qualification_missing");
      const brief = createContentImprovementBrief(finding, unit);
      return {
        finding_id: finding.finding_id,
        severity: finding.severity,
        title: finding.title,
        rationale: finding.rationale,
        expression: finding.expression,
        source_artifact: finding.source_artifact,
        required_facts: brief.required_facts,
      };
    }),
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

function topFindingList(model: WorkbenchModelProjection): string {
  if (model.top_findings.length === 0) return '<p class="muted">No prioritized deterministic findings in this scan.</p>';
  return `<ol class="proof-list">${model.top_findings.map((finding, index) => `<li class="proof">
    <details${index === 0 ? " open" : ""}>
      <summary><span class="proof-number">${String(index + 1).padStart(2, "0")}</span><span><strong><span class="severity">${escapeHtml(finding.severity)}</span> ${escapeHtml(finding.title)}</strong><small>${escapeHtml(finding.source_artifact)}</small></span></summary>
      <blockquote>${escapeHtml(finding.expression)}</blockquote>
      <p>${escapeHtml(finding.rationale)}</p>
      <form class="improvement-form" data-finding-id="${escapeHtml(finding.finding_id)}">
        <fieldset><legend>Establish the missing facts</legend>
          ${finding.required_facts.map((fact) => `<label>${escapeHtml(fact)}<input required data-fact="${escapeHtml(fact)}" autocomplete="off"></label>`).join("")}
        </fieldset>
        <label>Candidate expression<textarea required name="candidate" rows="3" placeholder="Write a candidate grounded in the facts above"></textarea></label>
        <label class="check"><input type="checkbox" name="preview_patch"> Verify an exact patch preview</label>
        <label class="check"><input type="checkbox" name="confirm_apply"> I reviewed this exact patch and authorize one local source change</label>
        <div class="form-actions"><button type="submit">Compare candidate</button><button type="button" class="apply-improvement" disabled>Apply reviewed patch</button><button type="button" class="undo-improvement" disabled>Undo change</button></div>
        <output class="improvement-result" role="status" aria-live="polite"></output>
      </form>
    </details>
  </li>`).join("")}</ol>`;
}

export function renderWorkbench(
  model: ProjectModelResult,
  taskReview: WorkbenchReview | null,
  adoptionState: WorkbenchAdoptionState | null = null,
): string {
  const view = projectWorkbenchModel(model);
  const personas = view.interpretation.personas.length === 0
    ? '<p class="muted">Persona guidance is not established.</p>'
    : `<ul>${view.interpretation.personas.map((item) => `<li><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.description)}</span></li>`).join("")}</ul>`;
  const uncertainty = taskReview?.uncertainty ?? view.interpretation.open_questions;
  const hasFindings = view.top_findings.length > 0;
  const hasReviewedProposal = taskReview !== null;
  const startTitle = hasFindings
    ? "Improve the highest-priority content issue"
    : hasReviewedProposal ? "Review the proposed content change" : "Your repository scan is ready";
  const startDescription = hasFindings
    ? "content.md finds product copy in context, explains what is weak or uncertain, and keeps every change reviewable."
    : hasReviewedProposal
      ? "A candidate has been reviewed against repository evidence. Inspect the exact diff and remaining uncertainty before deciding what happens next."
      : "content.md found no deterministic review issue in this scan. Inspect the evidence model below before deciding what needs attention.";
  const startSteps = hasFindings
    ? ["Review the finding", "Add the missing product facts and compare", "Preview, approve, and apply one exact patch"]
    : hasReviewedProposal
      ? ["Inspect the exact before-and-after diff", "Review the evidence and uncertainty", "Continue through the governed decision workflow"]
      : ["Review the content inventory", "Inspect product, journey, and message evidence", "Run another scan after the repository changes"];
  const primaryTitle = hasFindings ? "Top review findings" : hasReviewedProposal ? "Reviewed proposal" : "Top review findings";
  const primaryIntro = hasFindings
    ? "Begin with the open finding. Nothing changes until you preview the exact patch and explicitly approve it."
    : hasReviewedProposal
      ? "This is a review result, not publication or approval authority."
      : "No deterministic issue was promoted from this scan. That is a bounded result, not a claim that every expression is good.";
  const primaryContent = hasFindings ? topFindingList(view) : hasReviewedProposal ? proposal(taskReview) : topFindingList(view);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(view.identity.proposed_name)} · content.md workbench</title>
  <style>
    :root{color-scheme:light;--ink:#19231f;--muted:#66716c;--paper:#ede8dc;--card:#fffdf7;--line:#cec7b7;--green:#185c45;--amber:#9b5d13;--red:#8d382d}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 12% 4%,#faf7ef 0,transparent 34%),linear-gradient(120deg,rgba(24,92,69,.035) 1px,transparent 1px),var(--paper);background-size:auto,18px 18px,auto;color:var(--ink);font:15px/1.55 "Avenir Next",Avenir,"Segoe UI",sans-serif}header,main{max-width:1240px;margin:auto}header{padding:42px 24px 24px;border-bottom:1px solid var(--line)}h1{font:600 clamp(32px,6vw,64px)/.98 "Iowan Old Style","Palatino Linotype",Palatino,serif;letter-spacing:-.035em;margin:8px 0}h2{font:600 20px/1.2 "Iowan Old Style","Palatino Linotype",Palatino,serif;margin:0 0 14px}h3{font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:var(--muted)}p{margin:8px 0}.skip-link{position:fixed;left:12px;top:12px;z-index:10;background:var(--ink);color:var(--card);padding:10px 14px;transform:translateY(-180%)}.skip-link:focus{transform:none}.status,.eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:var(--green)}.severity{text-transform:uppercase;letter-spacing:.1em;color:var(--amber);font-size:10px;display:inline}main{padding:22px 24px 64px}.start{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(280px,.7fr);gap:28px;background:var(--ink);color:var(--card);padding:28px;margin-bottom:12px;border-radius:3px;box-shadow:0 12px 34px rgba(25,35,31,.13)}.start h2{font-size:clamp(25px,4vw,38px);letter-spacing:-.02em}.start p{max-width:62ch;color:#d8ddd8}.steps{list-style:none;padding:0;margin:0;counter-reset:step}.steps li{counter-increment:step;display:grid;grid-template-columns:30px 1fr;gap:8px;align-items:start;margin:10px 0;color:#eef0ec}.steps li::before{content:counter(step);display:grid;place-items:center;width:24px;height:24px;border:1px solid #82948b;border-radius:50%;font:600 11px/1 ui-monospace,monospace}.primary-work{background:var(--card);border:1px solid var(--green);border-top:5px solid var(--green);padding:26px;box-shadow:0 10px 30px rgba(25,35,31,.07)}.primary-work>p{max-width:68ch}.panes{display:grid;grid-template-columns:1.15fr 1.5fr 1fr;gap:12px;margin-top:12px}.pane,.section{background:color-mix(in srgb,var(--card) 94%,transparent);border:1px solid var(--line);border-radius:3px;padding:22px;box-shadow:0 8px 28px rgba(25,35,31,.035)}.sections{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:12px}.wide{grid-column:1/-1}.muted,small{color:var(--muted)}ul,ol{padding-left:20px}li{margin:8px 0}li span{display:block;color:var(--muted);font-size:13px}.proof-list{list-style:none;padding:0;margin:0}.proof{margin:0;border-top:1px solid var(--line)}.proof:first-child{border-top:0}.proof summary{display:grid;grid-template-columns:42px 1fr;gap:10px;padding:14px 0;cursor:pointer}.proof summary::marker{color:var(--green)}.proof-number{font:500 12px/1.4 ui-monospace,monospace;color:var(--green)}blockquote{margin:8px 0 12px;padding:12px 14px;border-left:3px solid var(--green);background:#f5f1e7;font:500 17px/1.4 "Iowan Old Style",serif}.improvement-form{display:grid;gap:14px;padding:16px 0 6px}.improvement-form fieldset{border:1px solid var(--line);padding:12px;display:grid;gap:10px}.improvement-form legend{font-weight:600;padding:0 6px}.improvement-form label{display:grid;gap:5px;font-size:12px;font-weight:600;color:var(--muted)}.improvement-form input,.improvement-form textarea{width:100%;border:1px solid var(--line);background:#fffefb;color:var(--ink);padding:10px;font:14px/1.45 inherit;border-radius:2px}.improvement-form input:focus,.improvement-form textarea:focus{outline:3px solid rgba(24,92,69,.2);border-color:var(--green)}.improvement-form .check{display:flex;align-items:center;gap:8px}.improvement-form .check input{width:auto}.form-actions{display:flex;flex-wrap:wrap;gap:8px}.improvement-form button{justify-self:start;border:0;background:var(--ink);color:var(--card);padding:10px 15px;font:600 12px/1 inherit;letter-spacing:.05em;text-transform:uppercase;cursor:pointer}.improvement-form button:hover{background:var(--green)}.improvement-form button:disabled{opacity:.55;cursor:not-allowed}.improvement-form button:focus-visible,.proof summary:focus-visible,.skip-link:focus-visible{outline:3px solid var(--amber);outline-offset:3px}.improvement-result{white-space:pre-wrap;font:12px/1.5 ui-monospace,monospace;background:#f4efe3;padding:12px;border-left:3px solid var(--amber);min-height:0}.improvement-result:empty{display:none}.diff{display:grid;gap:8px;margin:14px 0}.diff del,.diff ins{padding:10px;border-radius:2px;text-decoration:none}.diff del{background:#f7e5e0}.diff ins{background:#dff0e8}.meter-row{display:grid;grid-template-columns:1fr auto minmax(120px,2fr) auto;gap:8px;align-items:center;margin:12px 0}.meter-row small{grid-column:1/-1}meter{width:100%}svg{width:100%;height:auto;margin-top:8px}svg line{stroke:var(--line);stroke-width:2}svg circle{fill:var(--green)}svg text{font-size:10px;fill:var(--muted)}code{overflow-wrap:anywhere}@media(max-width:850px){.start,.panes,.sections{grid-template-columns:1fr}.wide{grid-column:auto}header{padding-top:28px}}
  .proof summary small{display:block;margin-top:3px}.setup{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,1.15fr);gap:24px;margin-bottom:12px;padding:22px;border:1px solid var(--amber);background:#f8efe0}.setup code{display:block;padding:10px 12px;background:var(--card);border:1px solid var(--line);font:12px/1.5 ui-monospace,monospace}@media(max-width:850px){.setup{grid-template-columns:1fr}}
  </style></head><body><a class="skip-link" href="#main-content">Skip to content</a><header><p class="status">Guidance status: provisional</p><h1>${escapeHtml(view.identity.proposed_name)}</h1><p>Evidence-linked repository intelligence for accountable content decisions.</p></header><main id="main-content" tabindex="-1">
  <section class="start" aria-labelledby="start-title"><div><p class="eyebrow">Start here</p><h2 id="start-title">${startTitle}</h2><p>${startDescription}</p></div><ol class="steps">${startSteps.map((step) => `<li>${step}</li>`).join("")}</ol></section>
  ${adoptionNotice(adoptionState)}
  <section class="primary-work" aria-labelledby="findings-title"><p class="eyebrow">Current work</p><h2 id="findings-title">${primaryTitle}</h2><p>${primaryIntro}</p>${primaryContent}</section>
  <div class="panes"><section class="pane"><h2>Task and context</h2><p><strong>Project</strong><br>${escapeHtml(view.project_id)}</p><p><strong>Task</strong><br>${escapeHtml(taskReview?.task_digest ?? (hasFindings ? "Start with the top finding above" : "Inspect the repository evidence below"))}</p></section>
  <section class="pane"><h2>Proposal and diff</h2>${proposal(taskReview)}</section>
  <section class="pane"><h2>Evidence and control</h2><p><strong>${view.sources.length}</strong> ranked sources · <strong>${view.conflicts.length}</strong> conflicts</p><p>Decision: ${escapeHtml(taskReview?.decision_status ?? "proposed")} · Authority effect: none</p></section></div>
  <div class="sections"><section class="section"><h2>Content inventory</h2><p><strong>${view.content_inventory.qualified_count}</strong> qualified · <strong>${view.content_inventory.microcopy_count}</strong> microcopy</p><p>${view.content_inventory.uncertain_count} need context · ${view.content_inventory.rejected_count} excluded</p></section>
  <section class="section"><h2>Scan summary</h2><p>The workbench ranks findings using repository evidence. Review the source and context before accepting any recommendation.</p></section>
  <section class="section"><h2>Product and audience</h2>${nodeList(view,["product","audience","job"])}</section>
  <section class="section"><h2>Journeys</h2>${journeyVisual(view)}</section>
  <section class="section"><h2>Information architecture</h2>${nodeList(view,["ia_node","navigation_relation","route"])}</section>
  <section class="section"><h2>Messages</h2>${nodeList(view,["semantic_message","expression_slot","expression_version"])}</section>
  <section class="section"><h2>Voice and personas</h2><h3>Voice dimensions</h3>${voice(view)}<h3>Personas</h3>${personas}</section>
  <section class="section"><h2>Evidence and conflicts</h2>${nodeList(view,["evidence_claim","conflict","open_question"])}</section>
  <section class="section wide"><h2>Decisions and control</h2><p>Comparison and patch preview do not write. A solo user may explicitly confirm one exact local source patch and undo it. The workbench cannot approve guidance, publish, release, or grant organizational authority.</p><h3>Open uncertainty</h3>${uncertainty.length === 0 ? '<p class="muted">No explicit uncertainty recorded.</p>' : `<ul>${uncertainty.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`}</section></div>
  </main><script src="/workbench.js" defer></script><script src="/webmcp.js" defer></script></body></html>`;
}
