#!/usr/bin/env node
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { canonicalJson } from "../packages/core/dist/index.js";

const root = "research/09-experimental/public-product-corpus";
const outputRoot = `${root}/remediation/corrected-replacement-batch-77`;
const sourceKeys = ["source_id", "company", "product_system", "industry", "source_url", "canonical_url", "accessed_at", "source_class", "title", "publisher", "access_method", "rights_boundary", "freshness"];
const observationKeys = ["observation_id", "source_id", "company", "product_system", "industry_stratum", "product_area", "journey", "event_state", "trigger", "user_goal", "system_status", "consequence_risk", "surface_channel", "locale_market", "content_slot_type", "exact_wording_span", "visible_action_recovery", "terminology_entities", "content_object_schema_hypothesis", "accessibility_localization_evidence", "provenance_freshness", "access_rights_boundary", "observed_vs_inferred", "evidence_strength", "authority_effect", "prompt_eligibility", "training_eligibility", "benchmark_eligibility"];
const hash = (value) => createHash("sha256").update(value).digest("hex");
const pick = (row, keys) => Object.fromEntries(keys.map((key) => [key, row[key]]));
const wordCount = (value) => typeof value === "string" ? value.trim().split(/\s+/u).filter(Boolean).length : Infinity;
const subject = (record, batch, kind, exactLine) => ({ batch_id: batch, record_kind: kind, record_id: record[kind === "source" ? "source_id" : "observation_id"], record_digest: hash(exactLine) });

const entries = (await readdir(root, { withFileTypes: true })).filter((entry) => entry.isDirectory() && /^2026-\d{2}-\d{2}-batch-\d+$/u.test(entry.name)).map((entry) => entry.name).sort();
const sources = [], observations = [];
for (const batch of entries) {
  for (const [file, kind, target] of [["sources.jsonl", "source", sources], ["observations.jsonl", "observation", observations]]) {
    const bytes = await readFile(path.join(root, batch, file), "utf8");
    for (const line of bytes.match(/[^\n]*\n/gu) ?? []) {
      const record = JSON.parse(line);
      target.push({ batch, kind, record, line, subject_ref: subject(record, batch, kind, line) });
    }
  }
}
const observationsBySource = new Map();
for (const item of observations) {
  const list = observationsBySource.get(item.record.source_id) ?? [];
  list.push(item); observationsBySource.set(item.record.source_id, list);
}
const byUrl = new Map();
for (const item of sources) { const list = byUrl.get(item.record.canonical_url) ?? []; list.push(item); byUrl.set(item.record.canonical_url, list); }
const selected = [];
const sourceActions = [];
for (const [url, candidates] of [...byUrl.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const ranked = [...candidates].sort((a, b) => {
    const aCount = (observationsBySource.get(a.record.source_id) ?? []).filter((item) => item.record.company === a.record.company && item.record.product_system === a.record.product_system && item.record.industry_stratum === a.record.industry).length;
    const bCount = (observationsBySource.get(b.record.source_id) ?? []).filter((item) => item.record.company === b.record.company && item.record.product_system === b.record.product_system && item.record.industry_stratum === b.record.industry).length;
    return bCount - aCount || a.batch.localeCompare(b.batch) || a.record.source_id.localeCompare(b.record.source_id);
  });
  const winner = ranked[0];
  const rightsSafe = winner.record.rights_boundary === "public page; evidence only";
  if (rightsSafe) selected.push(winner);
  for (const item of candidates) sourceActions.push({ subject_ref: item.subject_ref, action: item === winner && rightsSafe ? "supersede_with_corrected_candidate" : rightsSafe ? "hold_duplicate_canonical_url" : "hold_rights_review", canonical_url: url });
}
const usedSourceIds = new Set(), correctedSources = [], sourceMap = new Map(), sourceReplacementByDigest = new Map();
for (const item of selected) {
  let id = item.record.source_id;
  if (usedSourceIds.has(id)) id = `${id}-r77-${item.subject_ref.record_digest.slice(0, 8)}`;
  usedSourceIds.add(id);
  const corrected = pick({ ...item.record, source_id: id }, sourceKeys);
  correctedSources.push(corrected);
  sourceMap.set(item.record.source_id, { corrected, origin: item });
  sourceReplacementByDigest.set(item.subject_ref.record_digest, id);
}
const usedObservationIds = new Set(), correctedObservations = [], observationActions = [];
for (const item of observations) {
  const mapped = sourceMap.get(item.record.source_id);
  const projectionMatches = mapped && mapped.corrected.company === item.record.company && mapped.corrected.product_system === item.record.product_system && mapped.corrected.industry === item.record.industry_stratum;
  const rightsSafe = item.record.access_rights_boundary === "public page; evidence only" && wordCount(item.record.exact_wording_span) <= 25;
  if (!projectionMatches || !rightsSafe) {
    observationActions.push({ subject_ref: item.subject_ref, action: !projectionMatches ? "hold_source_projection_conflict" : "hold_rights_or_quotation_review" });
    continue;
  }
  let id = item.record.observation_id;
  if (usedObservationIds.has(id)) id = `${id}-r77-${item.subject_ref.record_digest.slice(0, 8)}`;
  usedObservationIds.add(id);
  correctedObservations.push(pick({ ...item.record, observation_id: id, source_id: mapped.corrected.source_id }, observationKeys));
  observationActions.push({ subject_ref: item.subject_ref, action: "supersede_with_corrected_candidate", replacement_record_id: id });
}
for (const action of sourceActions) {
  if (action.action === "supersede_with_corrected_candidate") action.replacement_record_id = sourceReplacementByDigest.get(action.subject_ref.record_digest);
}
correctedSources.sort((a, b) => a.source_id.localeCompare(b.source_id));
correctedObservations.sort((a, b) => a.observation_id.localeCompare(b.observation_id));
const sourceText = correctedSources.map(canonicalJson).join("");
const observationText = correctedObservations.map(canonicalJson).join("");
const manifestPreimage = { contract_version: "contentmd.public-product-corpus-corrected-batch-candidate/0.1.0", candidate_batch_id: "2026-08-27-batch-77", source_count: correctedSources.length, observation_count: correctedObservations.length, source_actions: sourceActions, observation_actions: observationActions, source_bytes_digest: hash(sourceText), observation_bytes_digest: hash(observationText), review_state: "unreviewed", authority_effect: "none", prompt_eligibility: "never", training_eligibility: "never", benchmark_eligibility: false };
const manifest = { ...manifestPreimage, manifest_digest: hash(JSON.stringify(manifestPreimage)) };
await mkdir(outputRoot, { recursive: true });
await writeFile(`${outputRoot}/sources.jsonl`, sourceText);
await writeFile(`${outputRoot}/observations.jsonl`, observationText);
await writeFile(`${outputRoot}/manifest.json`, `${JSON.stringify(manifest, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ source_count: correctedSources.length, observation_count: correctedObservations.length, held_sources: sourceActions.filter((item) => item.action.startsWith("hold")).length, held_observations: observationActions.filter((item) => item.action.startsWith("hold")).length, manifest_digest: manifest.manifest_digest })}\n`);
