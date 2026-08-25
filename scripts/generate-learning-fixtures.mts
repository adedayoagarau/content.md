import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalJson } from "../packages/core/src/index.js";
import {
  task5DatasetBuildInput,
  task5DatasetExpectedBuildResult,
  task5DatasetReplayFixture,
  task5FeatureMatrixFixture,
} from "../packages/learning/test/task5-fixtures.js";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const FIXTURE_ROOT = join(ROOT, "fixtures/learning-ranking");
const checkOnly = process.argv.includes("--check");

function jsonLines(values: readonly unknown[]): string {
  return `${values.map((value) => canonicalJson(value).trimEnd()).join("\n")}\n`;
}

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function materialize(relativePath: string, bytes: string): void {
  const path = join(FIXTURE_ROOT, relativePath);
  if (checkOnly) {
    if (readFileSync(path, "utf8") !== bytes) {
      throw new Error(`learning_fixture_out_of_date:${relativePath}`);
    }
    return;
  }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, bytes, "utf8");
}

const buildInput = task5DatasetBuildInput();
const buildResult = task5DatasetExpectedBuildResult();
const datasetReplay = task5DatasetReplayFixture();
const featureMatrix = task5FeatureMatrixFixture();
const task6Golden = JSON.parse(readFileSync(
  join(FIXTURE_ROOT, "task6-simulator-golden.json"),
  "utf8",
)) as { shadow: { plan: unknown } };

if (buildResult.manifest === null) throw new Error("learning_fixture_manifest_missing");

const outputs = new Map<string, string>([
  ["preferences.jsonl", jsonLines(
    buildInput.leakage_evidence.subjects.map((subject) => subject.example.preference),
  )],
  ["leakage-groups.jsonl", jsonLines(buildResult.groups)],
  ["dataset-manifest.json", canonicalJson(datasetReplay.expected_dataset_record)],
  ["feature-profile.json", canonicalJson(featureMatrix.replay.profile.expected_profile)],
  ["shadow-plan.json", canonicalJson(task6Golden.shadow.plan)],
]);

for (const [relativePath, bytes] of outputs) materialize(relativePath, bytes);

const summary = Object.fromEntries([...outputs].map(([path, bytes]) => [path, sha256(bytes)]));
process.stdout.write(`${checkOnly ? "learning fixtures verified" : "learning fixtures generated"}: ${canonicalJson(summary)}`);
