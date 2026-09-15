export const BENCHMARK_REVIEW_CLIENT = `(() => {
  "use strict";
  const byId = (id) => document.getElementById(id);
  const lines = (value) => value.split("\n").map((item) => item.trim()).filter(Boolean);
  const rfc3339 = (value) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) && Number.isFinite(Date.parse(value));
  let data;
  let submission;
  let index = 0;
  const save = () => localStorage.setItem("contentmd-review:" + data.packet.packet_digest, JSON.stringify({ index, submission }));
  const download = (value, filename) => { const blob = new Blob([JSON.stringify(value, null, 2) + "\n"], { type: "application/json" }); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = filename; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 0); };
  const packetBoundProgress = (value) => value && typeof value === "object" && value.contract_version === data.template.contract_version && value.authority_effect === "none" && value.packet_ref?.packet_digest === data.packet.packet_digest && value.packet_ref?.sample_count === data.packet.sample_count && value.reviewer && typeof value.reviewer === "object" && Array.isArray(value.responses) && value.responses.length === data.packet.sample_count && value.responses.every((response, responseIndex) => response && typeof response === "object" && response.work_unit_id === data.packet.review_work_units[responseIndex].work_unit_id && response.hard_dimension_results && typeof response.hard_dimension_results === "object" && response.quality_dimension_scores && typeof response.quality_dimension_scores === "object");
  const field = (label, control) => { const wrapper = document.createElement("label"); const title = document.createElement("span"); title.textContent = label; wrapper.append(title, control); return wrapper; };
  const select = (values, selected) => { const element = document.createElement("select"); for (const [value, label] of values) { const option = document.createElement("option"); option.value = value; option.textContent = label; option.selected = selected === value; element.append(option); } return element; };
  const render = () => {
    const unit = data.packet.review_work_units[index];
    const response = submission.responses[index];
    byId("progress").textContent = (index + 1) + " of " + data.packet.sample_count;
    byId("ability").textContent = unit.ability.id.replaceAll("_", " ");
    byId("objective").textContent = unit.ability.objective;
    byId("goal").textContent = unit.context.user_goal;
    byId("state").textContent = unit.context.state;
    byId("action").textContent = unit.context.action_expression;
    byId("consequence").textContent = unit.context.consequence_expression;
    byId("risk").textContent = unit.context.risk;
    byId("evidence").textContent = unit.context.evidence.material_fact_status === "missing"
      ? unit.context.evidence.unresolved_question
      : "Scenario facts are available for this evaluation.";
    byId("surface").textContent = unit.context.surface_context + " · " + unit.context.channel;
    byId("locale").textContent = unit.context.source_locale + " → " + unit.context.target_locale + " · " + unit.context.direction;
    byId("candidate").textContent = unit.candidate.text;
    byId("supporting").textContent = unit.candidate.supporting_text || "No supporting text";
    byId("voice-tone").textContent = "Target: " + unit.context.voice_profile.replaceAll("_", " ") + " · " + unit.context.situational_tone.replaceAll("_", " ");
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
  const completeResponse = (response) => {
    const decisive = response.disposition && response.disposition !== "abstain" && response.disposition !== "escalate";
    const qualityComplete = !decisive || Object.values(response.quality_dimension_scores).every((score) => Number.isInteger(score) && score >= 1 && score <= 5);
    return response.disposition && Object.values(response.hard_dimension_results).every(Boolean) && qualityComplete && typeof response.rationale === "string" && response.rationale.length >= 20 && response.acceptable_meaning_invariants?.length > 0 && response.review_evidence_refs?.length > 0 && (response.disposition !== "revise" || response.recommended_revision);
  };
  const renderStatus = () => {
    const complete = submission.responses.filter(completeResponse).length;
    const reviewerReady = typeof submission.reviewer.reviewer_id === "string" && submission.reviewer.reviewer_id.trim().length > 0 && rfc3339(submission.reviewer.reviewed_at) && submission.reviewer.independent_review_attested && submission.reviewer.qualification_bundle && typeof submission.reviewer.qualification_bundle === "object";
    byId("completion").textContent = complete + " of " + submission.responses.length + " reviews complete";
    byId("item-status").textContent = completeResponse(submission.responses[index]) ? "Current review complete" : "Current review incomplete";
    byId("reviewer-id").setAttribute("aria-invalid", String(!submission.reviewer.reviewer_id?.trim()));
    byId("reviewed-at").setAttribute("aria-invalid", String(!rfc3339(submission.reviewer.reviewed_at)));
    byId("qualification-json").setAttribute("aria-invalid", String(!submission.reviewer.qualification_bundle));
    byId("export").disabled = complete !== submission.responses.length || !reviewerReady;
  };
  const reviewerInput = (id, key) => byId(id).addEventListener("input", (event) => { submission.reviewer[key] = event.target.type === "checkbox" ? event.target.checked : event.target.value; save(); renderStatus(); });
  fetch("/review-data.json").then((response) => response.json()).then((loaded) => {
    data = loaded; submission = data.template;
    const saved = localStorage.getItem("contentmd-review:" + data.packet.packet_digest);
    if (saved) { try { const parsed = JSON.parse(saved); submission = parsed.submission; index = parsed.index || 0; } catch {} }
    byId("reviewer-id").value = submission.reviewer.reviewer_id || ""; byId("reviewed-at").value = submission.reviewer.reviewed_at || ""; byId("attest").checked = submission.reviewer.independent_review_attested; byId("qualification-json").value = submission.reviewer.qualification_bundle ? JSON.stringify(submission.reviewer.qualification_bundle, null, 2) : "";
    reviewerInput("reviewer-id", "reviewer_id"); reviewerInput("reviewed-at", "reviewed_at"); reviewerInput("attest", "independent_review_attested");
    byId("qualification-json").addEventListener("input", (event) => { try { const parsed = JSON.parse(event.target.value); submission.reviewer.qualification_bundle = parsed && typeof parsed === "object" ? parsed : null; } catch { submission.reviewer.qualification_bundle = null; } save(); renderStatus(); });
    byId("previous").addEventListener("click", () => { if (index > 0) { index -= 1; save(); render(); } });
    byId("next").addEventListener("click", () => { if (index < data.packet.sample_count - 1) { index += 1; save(); render(); } });
    byId("next-incomplete").addEventListener("click", () => { const offset = submission.responses.findIndex((response, candidateIndex) => candidateIndex > index && !completeResponse(response)); const wrapped = offset < 0 ? submission.responses.findIndex((response) => !completeResponse(response)) : offset; if (wrapped >= 0) { index = wrapped; save(); render(); } });
    byId("export-progress").addEventListener("click", () => { submission.submission_state = "incomplete"; save(); download(submission, "contentmd-review-progress.json"); });
    byId("import-progress").addEventListener("click", () => byId("import-file").click());
    byId("import-file").addEventListener("change", async (event) => { const file = event.target.files?.[0]; event.target.value = ""; if (!file) return; try { const imported = JSON.parse(await file.text()); if (!packetBoundProgress(imported)) throw new Error("packet mismatch"); submission = imported; index = Math.max(0, submission.responses.findIndex((response) => !completeResponse(response))); save(); byId("reviewer-id").value = submission.reviewer?.reviewer_id || ""; byId("reviewed-at").value = submission.reviewer?.reviewed_at || ""; byId("attest").checked = submission.reviewer?.independent_review_attested === true; byId("qualification-json").value = submission.reviewer?.qualification_bundle ? JSON.stringify(submission.reviewer.qualification_bundle, null, 2) : ""; render(); } catch { byId("item-status").textContent = "Progress file rejected: it does not match this review packet"; } });
    byId("export").addEventListener("click", () => { submission.submission_state = "complete"; save(); download(submission, "contentmd-review-submission.json"); });
    render();
  }).catch(() => { byId("completion").textContent = "Review packet could not be loaded"; });
})();`;
