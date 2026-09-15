#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { validateReviewSample } from "./prepare-content-design-review-sample.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const defaultPacket = path.join(root, "docs/tests/fixtures/content-design-scenarios/review-sample-100.json");
const defaultOutput = path.join(root, "docs/tests/fixtures/content-design-scenarios/contentmd-baseline-predictions.json");

function digest(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function includesState(unit) {
  return unit.candidate.text.toLocaleLowerCase("en-US").includes(unit.context.state.toLocaleLowerCase("en-US"));
}

function predictUnit(unit) {
  const text = unit.candidate.text;
  const combinedText = [unit.candidate.supporting_text, text].filter(Boolean).join(" ");
  const lower = combinedText.toLocaleLowerCase("en-US");
  const falseCertainty = /\beverything is complete\b/u.test(lower) && !/completed successfully/u.test(unit.context.state.toLocaleLowerCase("en-US"));
  const vague = /\bsomething happened\b/u.test(lower) || /^continue\.?$/iu.test(text.trim());
  const blame = /\byou (?:did|entered|chose|caused)\b.*\b(?:incorrect|wrong|failed|mistake|issue)/iu.test(text);
  const pressure = /\bact now\b|\bdon't miss out\b|\bhurry\b/iu.test(text);
  const stylisticNearMiss = /^(?:we're here to help\.|important:)/iu.test(text.trim());
  const overloaded = text.trim().split(/\s+/u).length > 28;
  const stateRepresented = lower.includes(unit.context.state_expression.toLocaleLowerCase("en-US"));
  const consequenceRepresented = lower.includes(unit.context.consequence_expression.toLocaleLowerCase("en-US"));
  const localeMismatch = unit.context.target_locale !== unit.context.source_locale
    && unit.candidate.localization_status === "source_language_candidate_requires_localization";
  const materialEvidenceMissing = unit.context.evidence?.material_fact_status === "missing";
  const authorityUnresolved = /\b(?:approved|authorized|guaranteed)\b/iu.test(text);
  const paymentRecovery = unit.context.situation !== "payment_unknown"
    ? "not_applicable"
    : /\b(?:check|verify)\b.*\b(?:payment|status|order)\b/iu.test(combinedText) ? "pass" : "fail";
  const hard = {
    factual_accuracy: materialEvidenceMissing ? "unknown" : falseCertainty ? "fail" : "pass",
    state_accuracy: falseCertainty || vague || !stateRepresented ? "fail" : "pass",
    semantic_fidelity: vague || !stateRepresented || !consequenceRepresented ? "fail" : "pass",
    agency: pressure ? "fail" : "pass",
    recovery: paymentRecovery,
    authority_boundary: authorityUnresolved ? "unknown" : "pass",
  };
  const quality = {
    clarity: vague ? 1 : overloaded ? 2 : 4,
    specificity: vague ? 1 : stateRepresented ? 4 : 2,
    hierarchy: overloaded ? 1 : unit.context.surface === "button" && text.split(/\s+/u).length > 8 ? 2 : 3,
    accessibility_readiness: unit.context.surface === "screen_reader_status" ? (overloaded ? 2 : 3) : null,
    locale_readiness: localeMismatch ? 1 : 4,
    voice_fit: blame || pressure ? 1 : 3,
    tone_fit: blame || pressure ? 1 : 3,
    economy: overloaded ? 1 : vague ? 2 : text.split(/\s+/u).length > 20 ? 2 : 4,
  };
  const hardFailure = Object.values(hard).includes("fail");
  const allHardResolved = Object.values(hard).every((result) => result === "pass" || result === "not_applicable");
  const disposition = materialEvidenceMissing
    ? "abstain"
    : hardFailure || blame || pressure
    ? "revise"
    : authorityUnresolved
      ? "escalate"
    : localeMismatch
      ? "escalate"
      : allHardResolved && !stylisticNearMiss ? "pass" : "human_preference_review";
  const rationaleCodes = [
    falseCertainty && "unsupported_certainty",
    vague && "unclear_action_or_state",
    !stateRepresented && "state_not_represented",
    !consequenceRepresented && "consequence_not_represented",
    blame && "user_blame",
    pressure && "unsupported_urgency_or_pressure",
    overloaded && "poor_economy",
    materialEvidenceMissing && "material_evidence_missing",
    localeMismatch && "in_locale_review_required",
    authorityUnresolved && "authority_claim_requires_verification",
  ].filter(Boolean);
  return {
    work_unit_id: unit.work_unit_id,
    disposition,
    hard_dimension_results: hard,
    quality_dimension_scores: quality,
    rationale_codes: rationaleCodes.length === 0
      ? disposition === "pass" ? ["hard_checks_passed"] : ["hard_checks_passed_preference_unresolved"]
      : rationaleCodes,
    evaluator_version: "contentmd.deterministic-content-design-baseline/0.2.0",
    authority_effect: "none",
  };
}

export function predictContentDesignPacket(packet) {
  validateReviewSample(packet);
  const predictions = packet.review_work_units.map(predictUnit);
  const preimage = {
    contract_version: "contentmd.content-design-predictions/0.3.0",
    packet_digest: packet.packet_digest,
    evaluator_version: "contentmd.deterministic-content-design-baseline/0.2.0",
    prediction_count: predictions.length,
    predictions,
    quality_dimension_coverage: Object.fromEntries([...new Set(predictions.flatMap((prediction) => Object.keys(prediction.quality_dimension_scores)))].sort().map((dimension) => {
      const opportunityCount = predictions.filter((prediction) => Object.hasOwn(prediction.quality_dimension_scores, dimension)).length;
      const predictionCount = predictions.filter((prediction) => typeof prediction.quality_dimension_scores[dimension] === "number").length;
      return [dimension, { prediction_count: predictionCount, opportunity_count: opportunityCount, coverage: opportunityCount === 0 ? 0 : predictionCount / opportunityCount }];
    })),
    hard_dimension_result_distribution: Object.fromEntries([...new Set(predictions.flatMap((prediction) => Object.keys(prediction.hard_dimension_results)))].sort().map((dimension) => {
      const results = predictions.flatMap((prediction) => Object.hasOwn(prediction.hard_dimension_results, dimension) ? [prediction.hard_dimension_results[dimension]] : []);
      return [dimension, {
        opportunity_count: results.length,
        pass: results.filter((result) => result === "pass").length,
        fail: results.filter((result) => result === "fail").length,
        unknown: results.filter((result) => result === "unknown").length,
        not_applicable: results.filter((result) => result === "not_applicable").length,
      }];
    })),
    evaluation_status: "unscored_pending_qualified_gold",
    label_access: "blind_packet_only",
    authority_effect: "none",
  };
  return { ...preimage, prediction_set_digest: digest(preimage) };
}

async function main() {
  const packetIndex = process.argv.indexOf("--packet");
  const outputIndex = process.argv.indexOf("--out");
  const packetPath = packetIndex >= 0 ? process.argv[packetIndex + 1] : defaultPacket;
  const outputPath = outputIndex >= 0 ? process.argv[outputIndex + 1] : defaultOutput;
  if (packetPath === undefined || outputPath === undefined) throw new Error("content_design_prediction_invalid:arguments");
  const packet = JSON.parse(await readFile(packetPath, "utf8"));
  const result = predictContentDesignPacket(packet);
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify({ output: outputPath, prediction_count: result.prediction_count, prediction_set_digest: result.prediction_set_digest, evaluation_status: result.evaluation_status }, null, 2));
}

if (process.argv[1] !== undefined && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
