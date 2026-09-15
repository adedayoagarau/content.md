#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));

const manifests = [
  {
    output: "fixtures/learning-ranking/pairwise-training-code-manifest.json",
    contract_version: "contentmd.pairwise-code-manifest/0.1.0",
    package_id: "@contentmd/learning",
    package_version: "0.1.0",
    paths: [
      "docs/superpowers/specs/2026-08-20-contentmd-pairwise-training-ranking-contracts-design.md",
      "packages/core/src/canonical-json.ts",
      "packages/core/src/records.ts",
      "packages/learning/src/index.ts",
      "packages/learning/src/numeric.ts",
      "packages/learning/src/pairwise-logistic.ts",
      "packages/learning/src/rank.ts",
      "packages/learning/src/records.ts",
      "packages/schemas/src/learning-records.schema.json",
      "packages/schemas/src/model-training-statistics.schema.json",
      "packages/schemas/src/schema-registry.ts",
      "scripts/verify-pairwise-code-manifest.mjs",
    ],
  },
  {
    output: "fixtures/learning-ranking/task6-code-manifest.json",
    contract_version: "contentmd.task6-code-manifest/0.1.0",
    package_id: "@contentmd/learning",
    package_version: "0.1.0",
    paths: [
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
    ],
  },
];

function canonicalize(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(",")}}`;
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

for (const definition of manifests) {
  const entries = [];
  for (const sourcePath of definition.paths) {
    const bytes = await readFile(path.join(root, sourcePath));
    entries.push({ byte_count: bytes.byteLength, path: sourcePath, raw_bytes_digest: sha256(bytes) });
  }
  const value = {
    contract_version: definition.contract_version,
    entries,
    package_id: definition.package_id,
    package_version: definition.package_version,
  };
  const bytes = `${canonicalize(value)}\n`;
  await writeFile(path.join(root, definition.output), bytes);
  process.stdout.write(`${definition.output} ${sha256(bytes)}\n`);
}
