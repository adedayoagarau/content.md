export const BENCHMARK_REVIEW_CLIENT = `(() => {
  "use strict";
  const byId = (id) => document.getElementById(id);
  const lines = (value) => value.split("\n").map((item) => item.trim()).filter(Boolean);
  let data;
  let submission;
  let index = 0;
  const save = () => localStorage.setItem("contentmd-review:" + data.packet.packet_digest, JSON.stringify({ index, submission }));
  const field = (label, control) => { const wrapper = document.createElement("label"); const title = document.createElement("span"); title.textContent = label; wrapper.append(title, control); return wrapper; };
  const select = (values, selected) => { const element = document.createElement("select"); for (const [value, label] of values) { const option = document.createElement("option"); option.value = value; option.textContent = label; option.selected = selected === value; element.append(option); } return element; };
  const render = () => {
    const unit = data.packet.review_work_units[index];
    const response = submission.responses[index];
    byId("progress").textContent = (index + 1) + " of " + data.packet.sample_count;
    byId("ability").textContent = unit.ability.id.replaceAll("_", " ");
    byId("objective").textContent = unit.ability.objective;
    byId("state").textContent = unit.context.state;
    byId("action").textContent = unit.context.action_expression;
    byId("consequence").textContent = unit.context.consequence_expression;
    byId("surface").textContent = unit.context.surface_context + " · " + unit.context.channel;
    byId("locale").textContent = unit.context.source_locale + " → " + unit.context.target_locale + " · " + unit.context.direction;
    byId("candidate").textContent = unit.candidate.text;
    byId("supporting").textContent = unit.candidate.supporting_text || "No supporting text";
    byId("voice-tone").textContent = unit.candidate.voice + " voice · " + unit.candidate.tone + " tone";
    const form = byId("review-fields"); form.replaceChildren();
    const disposition = select([["", "Choose a disposition"], ["pass", "Pass"], ["revise", "Revise"], ["abstain", "Abstain"], ["escalate", "Escalate"], ["human_preference_review", "Human preference review"]], response.disposition || "");
    disposition.addEventListener("change", () => { response.disposition = disposition.value || null; save(); renderStatus(); });
    form.append(field("Disposition", disposition));
    const hard = document.createElement("fieldset"); const hardLegend = document.createElement("legend"); hardLegend.textContent = "Hard requirements"; hard.append(hardLegend);
    for (const dimension of unit.rubric.hard_dimensions) { const control = select([["", "Choose"], ["pass", "Pass"], ["fail", "Fail"], ["unknown", "Unknown"], ["not_applicable", "Not applicable"]], response.hard_dimension_results[dimension] || ""); control.addEventListener("change", () => { response.hard_dimension_results[dimension] = control.value || null; save(); renderStatus(); }); hard.append(field(dimension.replaceAll("_", " "), control)); }
    form.append(hard);
    const quality = document.createElement("fieldset"); const qualityLegend = document.createElement("legend"); qualityLegend.textContent = "Quality judgment"; quality.append(qualityLegend);
    for (const dimension of unit.rubric.quality_dimensions) { const current = response.quality_dimension_scores[dimension]; const control = select([["", "Not scored"], ["1", "1 · poor"], ["2", "2"], ["3", "3 · adequate"], ["4", "4"], ["5", "5 · excellent"]], current === null ? "" : String(current)); control.addEventListener("change", () => { response.quality_dimension_scores[dimension] = control.value === "" ? null : Number(control.value); save(); }); quality.append(field(dimension.replaceAll("_", " "), control)); }
    form.append(quality);
    for (const [key, label, rows] of [["rationale", "Why this judgment?", 4], ["acceptable_meaning_invariants", "Meaning that must be preserved · one per line", 3], ["recommended_revision", "Recommended revision · required when revising", 3], ["review_evidence_refs", "Review evidence references · one per line", 2]]) { const area = document.createElement("textarea"); area.rows = rows; const value = response[key]; area.value = Array.isArray(value) ? value.join("\n") : value || ""; area.addEventListener("input", () => { response[key] = key === "acceptable_meaning_invariants" || key === "review_evidence_refs" ? lines(area.value) : area.value.trim() || null; save(); renderStatus(); }); form.append(field(label, area)); }
    byId("previous").disabled = index === 0;
    byId("next").disabled = index === data.packet.sample_count - 1;
    renderStatus();
  };
  const completeResponse = (response) => response.disposition && Object.values(response.hard_dimension_results).every(Boolean) && typeof response.rationale === "string" && response.rationale.length >= 20 && response.acceptable_meaning_invariants?.length > 0 && response.review_evidence_refs?.length > 0 && (response.disposition !== "revise" || response.recommended_revision);
  const renderStatus = () => { const complete = submission.responses.filter(completeResponse).length; byId("completion").textContent = complete + " of " + submission.responses.length + " reviews complete"; byId("export").disabled = complete !== submission.responses.length || !submission.reviewer.reviewer_id || !submission.reviewer.reviewed_at || !submission.reviewer.independent_review_attested; };
  const reviewerInput = (id, key) => byId(id).addEventListener("input", (event) => { submission.reviewer[key] = event.target.type === "checkbox" ? event.target.checked : event.target.value; save(); renderStatus(); });
  fetch("/review-data.json").then((response) => response.json()).then((loaded) => {
    data = loaded; submission = data.template;
    const saved = localStorage.getItem("contentmd-review:" + data.packet.packet_digest);
    if (saved) { try { const parsed = JSON.parse(saved); submission = parsed.submission; index = parsed.index || 0; } catch {} }
    byId("reviewer-id").value = submission.reviewer.reviewer_id || ""; byId("reviewed-at").value = submission.reviewer.reviewed_at || ""; byId("attest").checked = submission.reviewer.independent_review_attested;
    reviewerInput("reviewer-id", "reviewer_id"); reviewerInput("reviewed-at", "reviewed_at"); reviewerInput("attest", "independent_review_attested");
    byId("previous").addEventListener("click", () => { if (index > 0) { index -= 1; save(); render(); } });
    byId("next").addEventListener("click", () => { if (index < data.packet.sample_count - 1) { index += 1; save(); render(); } });
    byId("export").addEventListener("click", () => { submission.submission_state = "complete"; const blob = new Blob([JSON.stringify(submission, null, 2) + "\n"], { type: "application/json" }); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "contentmd-review-submission.json"; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 0); });
    render();
  }).catch(() => { byId("completion").textContent = "Review packet could not be loaded"; });
})();`;
