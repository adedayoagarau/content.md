#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

function digest(value) { return createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex"); }
function compareUnicodeScalar(left, right) {
  const leftPoints = Array.from(left, (character) => character.codePointAt(0));
  const rightPoints = Array.from(right, (character) => character.codePointAt(0));
  const limit = Math.min(leftPoints.length, rightPoints.length);
  for (let index = 0; index < limit; index += 1) {
    if (leftPoints[index] !== rightPoints[index]) return leftPoints[index] < rightPoints[index] ? -1 : 1;
  }
  return leftPoints.length === rightPoints.length ? 0 : leftPoints.length < rightPoints.length ? -1 : 1;
}
const compare = compareUnicodeScalar;

export async function planPublicProductTaxonomyMigration({ root }) {
  const batches = (await readdir(root, { withFileTypes: true })).filter((entry) => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}-batch-\d+$/u.test(entry.name)).map((entry) => entry.name).sort(compare);
  const signatures = new Map();
  for (const batch of batches) {
    let raw;
    try { raw = await readFile(path.join(root, batch, "observations.jsonl"), "utf8"); } catch { continue; }
    if (!raw.endsWith("\n")) throw new Error(`${batch}/observations.jsonl is not LF-terminated`);
    for (const line of raw.trimEnd().split("\n")) {
      const value = JSON.parse(line);
      const signature = { journey: value.journey, event_state: value.event_state, content_slot_type: value.content_slot_type, surface_channel: value.surface_channel };
      const key = JSON.stringify(signature);
      const evidence = { batch_id: batch, record_kind: "observation", record_id: value.observation_id, record_digest: digest(`${line}\n`) };
      const existing = signatures.get(key) ?? { raw_signature: signature, evidence_refs: [] };
      existing.evidence_refs.push(evidence); signatures.set(key, existing);
    }
  }
  const reviewCandidates = [...signatures.values()].map((item) => ({
    contract_version: "contentmd.public-product-taxonomy-migration-candidate/0.1.0",
    candidate_id: `taxonomy-migration-candidate.${digest(item.raw_signature)}`,
    raw_signature: item.raw_signature,
    proposed_signature: null,
    evidence_refs: item.evidence_refs.sort((a, b) => compare(`${a.batch_id}\0${a.record_id}`, `${b.batch_id}\0${b.record_id}`)),
    review_state: "unreviewed",
    classification_effect: "none", authority_effect: "none", prompt_eligibility: "never", training_eligibility: "never", benchmark_eligibility: false,
  })).sort((a, b) => compare(a.candidate_id, b.candidate_id));
  const preimage = { contract_version: "contentmd.public-product-taxonomy-migration-plan/0.1.0", raw_signature_count: reviewCandidates.length, review_candidates: reviewCandidates, authority_effect: "none", prompt_eligibility: "never", training_eligibility: "never", benchmark_eligibility: false };
  return { ...preimage, plan_digest: digest(preimage) };
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const rootIndex = process.argv.indexOf("--root");
  try { process.stdout.write(`${JSON.stringify(await planPublicProductTaxonomyMigration({ root: rootIndex < 0 ? "research/09-experimental/public-product-corpus" : process.argv[rootIndex + 1] }), null, 2)}\n`); }
  catch (error) { process.stderr.write(`${error.stack ?? error.message}\n`); process.exitCode = 1; }
}
