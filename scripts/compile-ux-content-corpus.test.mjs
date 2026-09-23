import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  buildUxContentCorpusArtifacts,
  canonicalJson,
  compareGeneratedArtifacts,
  sha256,
  writeGeneratedArtifacts,
} from "./lib/ux-content-corpus.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function withoutField(value, field) {
  const { [field]: ignored, ...rest } = value;
  return rest;
}

function verifyRecordDigest(record, field) {
  assert.match(record[field], /^[a-f0-9]{64}$/u);
  assert.equal(record[field], sha256(canonicalJson(withoutField(record, field))));
}

function allKeys(value, output = []) {
  if (Array.isArray(value)) {
    for (const item of value) allKeys(item, output);
  } else if (value !== null && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      output.push(key);
      allKeys(item, output);
    }
  }
  return output;
}

test("build is deterministic, complete, product-grouped, and fail-closed", async () => {
  const first = await buildUxContentCorpusArtifacts({ repositoryRoot: ROOT });
  const second = await buildUxContentCorpusArtifacts({ repositoryRoot: ROOT });
  assert.deepEqual([...first.output], [...second.output]);

  assert.equal(first.product_records.length, 200);
  assert.equal(first.section_records.length, 2_799);
  assert.equal(first.review_queue.length, 2_799);
  assert.equal(first.projection_manifest.counts.product_count, 200);
  assert.deepEqual(first.projection_manifest.counts.split_counts, {
    calibration: 30,
    discovery: 140,
    sealed_evaluation_candidate: 30,
    unassigned: 0,
  });

  const domainCounts = new Map();
  const productSplits = new Map();
  for (const product of first.product_records) {
    domainCounts.set(product.domain, (domainCounts.get(product.domain) ?? 0) + 1);
    productSplits.set(product.product_id, product.split.split);
    assert.equal(product.authority_effect, "none");
    assert.equal(product.benchmark_eligibility, false);
    assert.equal(product.governance.prompt_eligibility, "never");
    assert.equal(product.governance.training_eligibility, "never");
    verifyRecordDigest(product, "product_projection_digest");
  }
  assert.deepEqual([...domainCounts.values()].sort((left, right) => left - right), Array(10).fill(20));

  for (const unit of first.review_queue) {
    assert.equal(unit.split, productSplits.get(unit.product_id));
    assert.equal(unit.leakage_group_id, unit.product_id);
    assert.equal(unit.expected_labels, null);
    assert.equal(unit.eligible_for_metrics, false);
    assert.equal(unit.adjudication_required, true);
    verifyRecordDigest(unit, "review_unit_digest");
  }
  const metricEligible = first.review_queue.filter((unit) => unit.eligible_for_metrics);
  assert.deepEqual(metricEligible, []);
});

test("audit preserves known missingness, language boundaries, and rights exclusions", async () => {
  const artifacts = await buildUxContentCorpusArtifacts({ repositoryRoot: ROOT });
  const { audit } = artifacts;
  assert.equal(audit.controlled_corpus_eligibility, false);
  assert.equal(audit.counts.product_count, 200);
  assert.equal(audit.counts.taxonomy_section_expected_count, 2_800);
  assert.equal(audit.counts.taxonomy_section_count, 2_799);
  assert.equal(audit.counts.structural_error_count, 7);

  const missingMetadata = audit.issues.filter((issue) => issue.code === "REQUIRED_METADATA_MISSING");
  assert.equal(missingMetadata.length, 6);
  assert.ok(missingMetadata.every((issue) => issue.field === "Auth state"));
  assert.deepEqual(
    audit.issues.filter((issue) => issue.code === "TAXONOMY_SECTION_MISSING")
      .map((issue) => [issue.product_rank, issue.taxonomy_id]),
    [[86, "T4"]],
  );
  assert.deepEqual(
    audit.issues.filter((issue) => issue.code === "PRODUCT_EXCLUDED_PENDING_LEGAL_REVIEW")
      .map((issue) => issue.product_rank),
    [114, 115],
  );
  assert.deepEqual(
    audit.issues.filter((issue) => issue.code === "ENGLISH_SCOPE_REQUIRES_REVIEW")
      .map((issue) => issue.product_rank),
    [49, 113],
  );
  assert.equal(audit.issue_counts_by_code.HARVEST_COMPLETENESS_NONCANONICAL, 7);
  assert.ok(audit.issue_counts_by_code.LONG_BLOCKQUOTE_REQUIRES_QUOTATION_REVIEW > 1_000);

  const excludedProducts = artifacts.product_records.filter((product) =>
    product.governance.rights_status === "excluded_pending_legal_review");
  assert.deepEqual(excludedProducts.map((product) => product.corpus_rank), [114, 115]);
  assert.ok(artifacts.review_queue
    .filter((unit) => new Set(["uxcorpus.product.114", "uxcorpus.product.115"]).has(unit.product_id))
    .every((unit) => unit.review_status === "excluded_pending_legal_review"
      && unit.blocked_by.includes("rights_review")));
});

test("projections contain locators and metadata, not copied dossier prose", async () => {
  const artifacts = await buildUxContentCorpusArtifacts({ repositoryRoot: ROOT });
  const projectionRecords = [
    ...artifacts.section_records,
    ...artifacts.pattern_records,
    ...artifacts.review_queue,
  ];
  const forbiddenKeys = new Set(["body", "content", "copy", "excerpt", "expression", "quote", "text"]);
  const observedForbidden = new Set(allKeys(projectionRecords).filter((key) => forbiddenKeys.has(key)));
  assert.deepEqual([...observedForbidden], []);

  assert.ok(artifacts.pattern_records.length > 0);
  assert.ok(artifacts.pattern_records.every((record) =>
    typeof record.source_ref.digest === "string"
    && Number.isInteger(record.source_ref.line)
    && !Object.hasOwn(record, "pattern")));
  assert.ok(artifacts.source_records.every((record) =>
    record.research_source_record_status === "insufficient_metadata_not_coerced"
    && record.access_status === "not_retrieved_or_verified_by_compiler"));
  assert.ok(artifacts.overlap_records.length >= 80);
  assert.ok(artifacts.overlap_records.every((record) =>
    record.deduplication_action === "cross_reference_existing_evidence_do_not_copy"));
});

test("crosswalk covers T1-T14 while keeping voice separate from use-case identity", async () => {
  const artifacts = await buildUxContentCorpusArtifacts({ repositoryRoot: ROOT });
  const entries = artifacts.taxonomy_crosswalk.entries;
  assert.deepEqual(entries.map((entry) => entry.taxonomy_id),
    Array.from({ length: 14 }, (_, index) => `T${index + 1}`));
  assert.ok(entries.every((entry) => entry.non_equivalence.length > 0));
  const voice = entries.find((entry) => entry.taxonomy_id === "T14");
  assert.equal(voice.voice_usecase_relation, "constraint_or_observation_not_usecase_label");
  assert.match(voice.non_equivalence, /not substitutes/iu);
});

test("manifest witnesses every generated artifact and check mode detects tampering", async () => {
  const artifacts = await buildUxContentCorpusArtifacts({ repositoryRoot: ROOT });
  assert.equal(artifacts.projection_manifest.compiler_dependency.node_version, "24.20.0");
  assert.deepEqual(
    artifacts.projection_manifest.compiler_dependency.files.map((file) => file.path),
    ["scripts/compile-ux-content-corpus.mjs", "scripts/lib/ux-content-corpus.mjs"],
  );
  for (const witness of artifacts.projection_manifest.files) {
    const bytes = artifacts.output.get(witness.path);
    assert.equal(typeof bytes, "string");
    assert.equal(witness.byte_count, Buffer.byteLength(bytes, "utf8"));
    assert.equal(witness.raw_bytes_digest, sha256(bytes));
  }
  verifyRecordDigest(artifacts.projection_manifest, "projection_manifest_digest");

  const temporaryRoot = await mkdtemp(join(tmpdir(), "contentmd-ux-corpus-test-"));
  try {
    const written = await writeGeneratedArtifacts({ artifacts, repositoryRoot: temporaryRoot });
    assert.equal(written.ok, true);
    const target = "ux-content-corpus/_generated/products.jsonl";
    const absolute = join(temporaryRoot, target);
    const original = await readFile(absolute, "utf8");
    await writeFile(absolute, `${original}tamper\n`, "utf8");
    const comparison = await compareGeneratedArtifacts({ artifacts, repositoryRoot: temporaryRoot });
    assert.equal(comparison.ok, false);
    assert.deepEqual(comparison.changed, [target]);
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});
