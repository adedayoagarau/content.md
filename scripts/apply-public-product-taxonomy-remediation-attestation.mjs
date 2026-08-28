#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import process from "node:process";

const digest = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const value = (flag) => { const index = process.argv.indexOf(flag); return index < 0 ? undefined : process.argv[index + 1]; };

const assignmentPath = value("--assignment");
const prefillPath = value("--prefill");
const outputPath = value("--out");
if (!assignmentPath || !prefillPath || !outputPath) throw new Error("assignment_prefill_and_out_are_required");

const assignment = JSON.parse(await readFile(assignmentPath, "utf8"));
const prefill = JSON.parse(await readFile(prefillPath, "utf8"));
if (assignment.assignment_id !== prefill.assignment_id || assignment.assignment_digest !== prefill.assignment_digest) throw new Error("prefill_assignment_binding_mismatch");
const recommendations = new Map(prefill.work_units.map((unit) => [unit.work_unit_id, unit]));
const completed = structuredClone(assignment);
delete completed.assignment_digest;
completed.work_units = completed.work_units.map((unit) => {
  const recommendation = recommendations.get(unit.work_unit_id);
  if (!recommendation || recommendation.recommended_decision !== "pass") throw new Error(`unsupported_recommendation:${unit.work_unit_id}`);
  return {
    ...unit,
    checklist_results: recommendation.recommended_checklist_results,
    decision: recommendation.recommended_decision,
    rationale: recommendation.recommended_rationale,
    counterexample_refs: recommendation.counterexample_refs,
  };
});
completed.review_state = "completed";
completed.attestation_provenance = {
  assertion: `${completed.reviewer_id} attests`,
  relayed_by: "workspace_user",
  recorded_on: "2026-08-26",
  identity_verification: "not_performed",
  qualification_verification: "not_performed",
  independence_verification: "not_performed",
  automation_prefill_digest: prefill.prefill_digest,
};
completed.assignment_digest = digest(completed);
await writeFile(outputPath, `${JSON.stringify(completed, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ reviewer_id: completed.reviewer_id, assignment_digest: completed.assignment_digest, pass_count: completed.work_units.length, attestation_provenance: completed.attestation_provenance })}\n`);
