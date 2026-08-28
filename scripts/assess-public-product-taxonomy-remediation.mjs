#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

const digest = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const recordDigest = (value) => createHash("sha256").update(`${JSON.stringify(value)}\n`).digest("hex");
const CHECKS = ["raw_state_accuracy", "coverage_slot_fit", "journey_family_fit", "state_class_fit", "content_slot_fit", "channel_fit", "counterexample_sufficiency", "industry_neutrality", "localization_transferability", "rights_safe_abstraction"];

async function loadRef(root, ref) {
  const kind = ref.record_kind === "observation" ? "observations.jsonl" : "sources.jsonl";
  const idKey = ref.record_kind === "observation" ? "observation_id" : "source_id";
  const rows = (await readFile(path.join(root, ref.batch_id, kind), "utf8")).trimEnd().split("\n").map(JSON.parse);
  const row = rows.find((item) => item[idKey] === ref.record_id);
  return { exists: row !== undefined, digest_valid: row !== undefined && recordDigest(row) === ref.record_digest, row };
}

export async function assessTaxonomyRemediation({ root, reconciliationPath }) {
  const reconciliation = JSON.parse(await readFile(reconciliationPath, "utf8"));
  const targets = reconciliation.work_units.filter((unit) => unit.resolution_status === "resolved_pending_targeted_reapproval");
  const ids = Object.fromEntries(Object.entries(reconciliation.taxonomy_definitions).map(([group, definitions]) => [group, new Set(definitions.map((item) => item.definition_id))]));
  const units = [];
  for (const unit of targets) {
    const evidence = await Promise.all(unit.evidence_refs.map((ref) => loadRef(root, ref)));
    const counterexamples = await Promise.all(unit.counterexample_refs.map((ref) => loadRef(root, ref)));
    const primary = evidence[0]?.row;
    const signature = unit.final_normalized_signature;
    const checks = {
      evidence_refs_exist: evidence.every((item) => item.exists),
      evidence_digests_valid: evidence.every((item) => item.digest_valid),
      raw_signature_matches_primary_evidence: primary !== undefined && ["journey", "event_state", "content_slot_type", "surface_channel"].every((key) => primary[key] === unit.raw_signature[key]),
      normalized_ids_closed: ids.coverage_slots.has(signature.coverage_slot_id) && ids.journey_families.has(signature.journey_family_id) && ids.state_classes.has(signature.state_class_id) && ids.content_slot_classes.has(signature.content_slot_class_id) && ids.surface_channels.has(signature.surface_channel_id),
      counterexample_refs_valid: counterexamples.every((item) => item.exists && item.digest_valid),
      remediation_is_targeted: unit.resolution_basis === "post_reconciliation_boundary_remediation" && unit.corrected_fields_from_ola_packet.length > 0,
      no_remaining_evidence_gap: unit.remaining_evidence_gap === null,
      authority_boundary_preserved: reconciliation.authority_effect === "none" && reconciliation.prompt_eligibility === "never" && reconciliation.training_eligibility === "never" && reconciliation.benchmark_eligibility === false,
    };
    const supported = Object.values(checks).every(Boolean);
    units.push({
      work_unit_id: unit.work_unit_id,
      proposed_normalized_signature: signature,
      automated_checks: checks,
      recommended_checklist_results: CHECKS.map((item) => ({ item, status: supported ? "pass" : "insufficient" })),
      recommended_decision: supported ? "pass" : "insufficient",
      recommended_rationale: `${unit.rationale} Automated verification confirmed immutable evidence bindings, closed taxonomy IDs, targeted remediation lineage, counterexample integrity, and unchanged authority boundaries. Human semantic judgment and reviewer attestation remain outstanding.`,
      counterexample_refs: unit.counterexample_refs,
      source_correction_required: unit.source_correction_required,
    });
  }
  const preimage = {
    contract_version: "contentmd.public-product-taxonomy-remediation-automation-assessment/0.1.0",
    source_packet_digest: reconciliation.source_packet_digest,
    reconciliation_digest: reconciliation.reconciliation_digest,
    assessment_scope: "thirty_revised_mappings_only",
    assessment_method: "deterministic_integrity_and_closed_taxonomy_validation",
    work_units: units,
    summary: { work_unit_count: units.length, recommended_pass_count: units.filter((unit) => unit.recommended_decision === "pass").length, recommended_insufficient_count: units.filter((unit) => unit.recommended_decision === "insufficient").length },
    human_attestation_required: true,
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  };
  return { ...preimage, assessment_digest: digest(preimage) };
}

export async function buildReviewerPrefill({ assignmentPath, assessment }) {
  const assignment = JSON.parse(await readFile(assignmentPath, "utf8"));
  const recommendations = new Map(assessment.work_units.map((unit) => [unit.work_unit_id, unit]));
  const preimage = {
    contract_version: "contentmd.public-product-taxonomy-remediation-reviewer-prefill/0.1.0",
    reviewer_id: assignment.reviewer_id,
    reviewer_role: assignment.reviewer_role,
    assignment_id: assignment.assignment_id,
    assignment_digest: assignment.assignment_digest,
    automation_assessment_digest: assessment.assessment_digest,
    work_units: assignment.work_units.map((unit) => {
      const recommendation = recommendations.get(unit.work_unit_id);
      if (recommendation === undefined) throw new Error(`missing_assessment:${unit.work_unit_id}`);
      return {
        work_unit_id: unit.work_unit_id,
        recommended_checklist_results: recommendation.recommended_checklist_results,
        recommended_decision: recommendation.recommended_decision,
        recommended_rationale: recommendation.recommended_rationale,
        counterexample_refs: recommendation.counterexample_refs,
        reviewer_attestation: null,
      };
    }),
    prefill_state: "pending_independent_reviewer_attestation",
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  };
  return { ...preimage, prefill_digest: digest(preimage) };
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const value = (flag) => { const index = process.argv.indexOf(flag); return index < 0 ? undefined : process.argv[index + 1]; };
  const output = value("--out");
  const assessment = await assessTaxonomyRemediation({
    root: value("--root") ?? "research/09-experimental/public-product-corpus",
    reconciliationPath: value("--reconciliation") ?? "research/09-experimental/public-product-corpus/taxonomy-mapping-reconciliation-v2.json",
  });
  if (output) await writeFile(output, `${JSON.stringify(assessment, null, 2)}\n`);
  const assignmentPath = value("--assignment");
  const prefillOutput = value("--prefill-out");
  if ((assignmentPath === undefined) !== (prefillOutput === undefined)) throw new Error("assignment_and_prefill_out_must_be_supplied_together");
  if (assignmentPath !== undefined) {
    const prefill = await buildReviewerPrefill({ assignmentPath, assessment });
    await writeFile(prefillOutput, `${JSON.stringify(prefill, null, 2)}\n`);
  }
  process.stdout.write(`${JSON.stringify({ assessment_digest: assessment.assessment_digest, ...assessment.summary })}\n`);
}
