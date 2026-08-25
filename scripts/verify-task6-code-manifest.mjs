import { createHash } from "node:crypto";
import { lstat, readFile, realpath } from "node:fs/promises";
import { resolve, sep } from "node:path";

const ROOT = resolve(process.cwd());
const MANIFEST_PATH = "fixtures/learning-ranking/task6-code-manifest.json";
const RELEASE_PROFILE_PATH = "packages/learning/src/task6-release-profile.ts";
const EXPECTED_PATHS = [
  "docs/superpowers/specs/2026-08-20-contentmd-evaluation-shadow-governance-contracts-design.md",
  "packages/core/src/canonical-dag.ts",
  "packages/core/src/canonical-json.ts",
  "packages/core/src/records.ts",
  "packages/learning/src/binding.ts",
  "packages/learning/src/bootstrap.ts",
  "packages/learning/src/drift.ts",
  "packages/learning/src/evaluation.ts",
  "packages/learning/src/index.ts",
  "packages/learning/src/numeric.ts",
  "packages/learning/src/pairwise-logistic.ts",
  "packages/learning/src/rank.ts",
  "packages/learning/src/records.ts",
  "packages/learning/src/rollback.ts",
  "packages/learning/src/shadow.ts",
  "packages/memory/src/event-store.ts",
  "packages/schemas/src/learning-records.schema.json",
  "scripts/verify-task6-code-manifest.mjs",
];

function fail(detail) {
  throw new Error(`task6 code manifest invalid: ${detail}`);
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
    if (Array.isArray(value)) {
      return `[${value.map((item) => canonicalize(item, ancestors)).join(",")}]`;
    }
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

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function exactKeys(value, keys, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)
    || Object.getPrototypeOf(value) !== Object.prototype) fail(`${label} shape`);
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    fail(`${label} keys`);
  }
}

async function boundedRead(path) {
  const absolute = resolve(ROOT, path);
  const resolved = await realpath(absolute);
  if (resolved !== ROOT && !resolved.startsWith(`${ROOT}${sep}`)) fail(`${path} escapes workspace`);
  const metadata = await lstat(absolute);
  if (!metadata.isFile()) fail(`${path} is not a regular file`);
  return readFile(absolute);
}

const manifestBytes = await boundedRead(MANIFEST_PATH);
const releaseProfileBytes = await boundedRead(RELEASE_PROFILE_PATH);
let manifest;
try {
  manifest = JSON.parse(manifestBytes.toString("utf8"));
} catch {
  fail("manifest JSON");
}
exactKeys(manifest, ["contract_version", "package_id", "package_version", "entries"], "manifest");
if (manifest.contract_version !== "contentmd.task6-code-manifest/0.1.0"
  || manifest.package_id !== "@contentmd/learning"
  || manifest.package_version !== "0.1.0"
  || !Array.isArray(manifest.entries)
  || manifest.entries.length !== EXPECTED_PATHS.length) fail("manifest header");
if (!manifestBytes.equals(Buffer.from(canonicalJson(manifest), "utf8"))) {
  fail("manifest bytes are not canonical");
}

for (const [index, entry] of manifest.entries.entries()) {
  exactKeys(entry, ["path", "raw_bytes_digest", "byte_count"], `entry ${index}`);
  if (entry.path !== EXPECTED_PATHS[index]
    || !/^[a-f0-9]{64}$/.test(entry.raw_bytes_digest)
    || !Number.isSafeInteger(entry.byte_count)
    || entry.byte_count < 1) fail(`entry ${index} fields`);
  const sourceBytes = await boundedRead(entry.path);
  if (sourceBytes.byteLength !== entry.byte_count || sha256(sourceBytes) !== entry.raw_bytes_digest) {
    fail(`entry ${index} bytes`);
  }
}

const manifestDigest = sha256(manifestBytes);
const releaseText = releaseProfileBytes.toString("utf8");
const rawPin = /manifest_raw_bytes_digest:\s*"([a-f0-9]{64})"/.exec(releaseText)?.[1];
const semanticPin = /\n\s*manifest_digest:\s*"([a-f0-9]{64})"/.exec(releaseText)?.[1];
const runtimePinsText = /admitted_runtime_profile_digests:\s*(\[[\s\S]*?\])/.exec(releaseText)?.[1];
const releaseDigest = /release_profile_contract_digest:\s*sha256Canonical\(TASK6_RELEASE_PROFILE_PREIMAGE\)/
  .test(releaseText);
let runtimePins;
try {
  runtimePins = runtimePinsText === undefined
    ? null
    : JSON.parse(runtimePinsText.replace(/,\s*\]$/, "]"));
} catch {
  fail("release runtime pins");
}
if (rawPin !== manifestDigest || semanticPin !== manifestDigest
  || !Array.isArray(runtimePins) || runtimePins.length === 0
  || runtimePins.some((digest) => typeof digest !== "string" || !/^[a-f0-9]{64}$/.test(digest))
  || new Set(runtimePins).size !== runtimePins.length
  || runtimePins.some((digest, index) => index > 0 && runtimePins[index - 1] >= digest)
  || !releaseDigest) fail("release profile pins");

process.stdout.write(`task6 code manifest verified: ${manifest.entries.length} entries\n`);
