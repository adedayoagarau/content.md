import { createHash } from "node:crypto";
import { lstat, readFile, realpath } from "node:fs/promises";
import { resolve, sep } from "node:path";

const ROOT = resolve(process.cwd());
const PATHS = {
  comparisons: "fixtures/voice-tone-research/project-owned-comparisons.jsonl",
  leakage_groups: "fixtures/voice-tone-research/leakage-groups.jsonl",
  rights_records: "fixtures/voice-tone-research/rights-register.jsonl",
  manifest: "fixtures/voice-tone-research/comparison-manifest.json",
  recorded_capture: "fixtures/voice-tone-research/govuk-passport-recorded-capture.json",
};
const FEATURES = [
  "directness",
  "formality",
  "warmth",
  "reassurance",
  "expressiveness",
  "humor",
  "urgency",
  "information_density",
  "authority_stance",
];
const THRESHOLD = 0.72;

function fail(detail) {
  throw new Error(`voice research verification failed: ${detail}`);
}

function canonicalize(value, ancestors = new Set()) {
  if (value === null) return "null";
  if (typeof value === "string" || typeof value === "boolean") return JSON.stringify(value);
  if (typeof value === "number") {
    if (!Number.isFinite(value)) fail("nonfinite number");
    return JSON.stringify(Object.is(value, -0) ? 0 : value);
  }
  if (typeof value !== "object" || ancestors.has(value)) fail("noncanonical value");
  ancestors.add(value);
  try {
    if (Array.isArray(value)) return `[${value.map((item) => canonicalize(item, ancestors)).join(",")}]`;
    if (Object.getPrototypeOf(value) !== Object.prototype) fail("non-plain object");
    return `{${Object.keys(value).sort().map((key) =>
      `${JSON.stringify(key)}:${canonicalize(value[key], ancestors)}`).join(",")}}`;
  } finally {
    ancestors.delete(value);
  }
}

function canonicalJson(value) {
  return `${canonicalize(value)}\n`;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function boundedRead(path) {
  const absolute = resolve(ROOT, path);
  const resolved = await realpath(absolute);
  if (resolved !== ROOT && !resolved.startsWith(`${ROOT}${sep}`)) fail(`${path} escapes workspace`);
  const metadata = await lstat(absolute);
  if (!metadata.isFile()) fail(`${path} is not a regular file`);
  return readFile(absolute, "utf8");
}

function parseJsonl(bytes, label) {
  if (!bytes.endsWith("\n")) fail(`${label} missing LF`);
  const records = bytes.trim().split("\n").map((line) => {
    let value;
    try { value = JSON.parse(line); } catch { fail(`${label} JSON`); }
    if (canonicalJson(value) !== `${line}\n`) fail(`${label} noncanonical record`);
    return value;
  });
  return records;
}

function digestObject(value, digestField, label) {
  const { [digestField]: received, ...preimage } = value;
  if (!/^[a-f0-9]{64}$/.test(received) || received !== sha256(canonicalJson(preimage))) {
    fail(`${label} digest`);
  }
}

function normalize(value) {
  return [...value.normalize("NFKC").toLowerCase().matchAll(/[\p{L}\p{N}]+/gu)]
    .map((match) => match[0]).join(" ");
}

function shingles(value) {
  const padded = `  ${value}  `;
  const output = [];
  for (let index = 0; index <= padded.length - 3; index += 1) output.push(padded.slice(index, index + 3));
  return output;
}

function jaccard(left, right) {
  const a = new Set(left);
  const b = new Set(right);
  const union = new Set([...a, ...b]);
  let intersection = 0;
  for (const value of a) if (b.has(value)) intersection += 1;
  return union.size === 0 ? 0 : intersection / union.size;
}

function similarity(leftValue, rightValue) {
  const left = normalize(leftValue);
  const right = normalize(rightValue);
  if (left === right) return 1;
  return Math.max(jaccard(left.split(" "), right.split(" ")), jaccard(shingles(left), shingles(right)));
}

function collectBoundedSpans(value, output = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectBoundedSpans(item, output);
  } else if (value !== null && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (key === "bounded_span" && typeof item === "string" && item.length > 0) output.push(item);
      else collectBoundedSpans(item, output);
    }
  }
  return output;
}

const [comparisonBytes, leakageBytes, rightsBytes, manifestBytes, captureBytes] = await Promise.all([
  boundedRead(PATHS.comparisons),
  boundedRead(PATHS.leakage_groups),
  boundedRead(PATHS.rights_records),
  boundedRead(PATHS.manifest),
  boundedRead(PATHS.recorded_capture),
]);
const comparisons = parseJsonl(comparisonBytes, "comparisons");
const leakageGroups = parseJsonl(leakageBytes, "leakage groups");
const rightsRecords = parseJsonl(rightsBytes, "rights records");
let manifest;
let capture;
try {
  manifest = JSON.parse(manifestBytes);
  capture = JSON.parse(captureBytes);
} catch {
  fail("manifest or capture JSON");
}
if (canonicalJson(manifest) !== manifestBytes) fail("manifest noncanonical");
digestObject(manifest, "manifest_digest", "manifest");
if (manifest.contract_version !== "contentmd.voice-comparison-manifest/0.1.0"
  || manifest.corpus_id !== "voice-comparison.project-owned.v1"
  || manifest.pair_count !== 100
  || manifest.leakage_group_count !== 30
  || manifest.candidate_count !== 200
  || manifest.source_class !== "project_owned_synthetic"
  || manifest.similarity_threshold !== THRESHOLD
  || manifest.authority_effect !== "none") fail("manifest fields");

const artifactBytes = { comparisons: comparisonBytes, leakage_groups: leakageBytes, rights_records: rightsBytes };
for (const [key, bytes] of Object.entries(artifactBytes)) {
  const witness = manifest.files[key];
  if (witness.path !== PATHS[key]
    || witness.byte_count !== Buffer.byteLength(bytes, "utf8")
    || witness.raw_bytes_digest !== sha256(bytes)) fail(`${key} witness`);
}

if (comparisons.length !== 100) fail("pair count");
const comparisonIds = new Set();
const candidateIds = new Set();
const expressions = [];
for (const comparison of comparisons) {
  if (comparison.contract_version !== "contentmd.project-owned-voice-comparison/0.1.0"
    || comparison.project_id !== "project.synthetic.voice-comparison"
    || comparison.objective !== "clear_actionable_recovery"
    || comparison.authority_effect !== "none"
    || !Array.isArray(comparison.third_party_evidence_refs)
    || comparison.third_party_evidence_refs.length !== 0
    || comparisonIds.has(comparison.comparison_id)) fail("comparison fields");
  comparisonIds.add(comparison.comparison_id);
  for (const candidate of [comparison.candidate_a, comparison.candidate_b]) {
    if (candidate.candidate_kind !== "project_owned_synthetic"
      || candidate.hard_rule_status !== "pass"
      || candidate.failed_rule_ids.length !== 0
      || candidate.expression_digest !== sha256(candidate.expression)
      || candidateIds.has(candidate.candidate_id)
      || candidate.voice_tone_features.length !== FEATURES.length
      || candidate.voice_tone_features.some((feature, index) =>
        feature.feature_name !== FEATURES[index]
        || !Number.isFinite(feature.value)
        || feature.value < 0
        || feature.value > 1)) fail("candidate fields");
    digestObject(candidate, "candidate_digest", "candidate");
    candidateIds.add(candidate.candidate_id);
    expressions.push(candidate.expression);
  }
  digestObject(comparison, "comparison_digest", "comparison");
}

if (leakageGroups.length !== 30) fail("leakage group count");
const memberships = new Map();
for (const group of leakageGroups) {
  if (group.grouping_basis !== "shared_semantic_message_and_context"
    || group.member_comparison_ids.length < 3
    || new Set(group.member_comparison_ids).size !== group.member_comparison_ids.length) {
    fail("leakage group fields");
  }
  digestObject(group, "group_digest", "leakage group");
  for (const comparisonId of group.member_comparison_ids) {
    if (!comparisonIds.has(comparisonId)) fail("dangling leakage member");
    memberships.set(comparisonId, (memberships.get(comparisonId) ?? 0) + 1);
    const comparison = comparisons.find((item) => item.comparison_id === comparisonId);
    if (comparison.leakage_group_id !== group.leakage_group_id) fail("leakage binding");
  }
}
if ([...comparisonIds].some((id) => memberships.get(id) !== 1)) fail("leakage coverage");

if (rightsRecords.length !== 200) fail("rights count");
const rightsCandidates = new Set();
for (const record of rightsRecords) {
  if (record.rights_status !== "project_owned_synthetic"
    || record.source_kind !== "deterministic_project_generator"
    || record.third_party_ancestor_refs.length !== 0
    || record.prompt_eligibility !== "project_owned_only"
    || record.training_eligibility !== "project_owned_only"
    || record.authority_effect !== "none"
    || !candidateIds.has(record.candidate_id)
    || rightsCandidates.has(record.candidate_id)) fail("rights fields");
  digestObject(record, "rights_digest", "rights record");
  rightsCandidates.add(record.candidate_id);
}
if (rightsCandidates.size !== candidateIds.size) fail("rights coverage");

const boundedSpans = collectBoundedSpans(capture);
for (const expression of expressions) {
  for (const span of boundedSpans) {
    if (similarity(expression, span) >= THRESHOLD) fail("third_party_expression_similarity_blocked");
  }
}

process.stdout.write(
  `voice research verified: ${comparisons.length} project-owned pairs, ${leakageGroups.length} leakage groups, ${rightsRecords.length} rights records, authority none\n`,
);
