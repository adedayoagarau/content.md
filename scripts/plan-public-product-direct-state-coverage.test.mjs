import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

test("derives exact missing coverage slots from eligible direct UI evidence", async () => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "contentmd-coverage-plan-"));
  const corpusRoot = path.join(temporaryRoot, "corpus");
  const batchRoot = path.join(corpusRoot, "2026-08-27-batch-77");
  await mkdir(batchRoot, { recursive: true });
  await writeFile(path.join(corpusRoot, "experience-taxonomy.json"), JSON.stringify({
    mappings: [
      { raw_signature: { journey: "entry", event_state: "open", content_slot_type: "heading", surface_channel: "web" }, normalized_signature: { coverage_slot_id: "entry_onboarding" } },
      { raw_signature: { journey: "task", event_state: "ready", content_slot_type: "button", surface_channel: "web" }, normalized_signature: { coverage_slot_id: "core_task_commitment" } },
      { raw_signature: { journey: "support", event_state: "help", content_slot_type: "link", surface_channel: "web" }, normalized_signature: { coverage_slot_id: "destructive_permission_support" } },
    ],
  }));
  await writeFile(path.join(batchRoot, "sources.jsonl"), `${JSON.stringify({ source_id: "source.actual", source_class: "actual UI" })}\n${JSON.stringify({ source_id: "source.guidance", source_class: "official content guidance" })}\n`);
  const observation = (sourceId, observed, journey, eventState, slot) => ({
    company: "Example Co", product_system: "Example Product", source_id: sourceId,
    observed_vs_inferred: observed, journey, event_state: eventState,
    content_slot_type: slot, surface_channel: "web",
  });
  await writeFile(path.join(batchRoot, "observations.jsonl"), [
    observation("source.actual", "observed_ui", "entry", "open", "heading"),
    observation("source.actual", "observed_ui", "task", "ready", "button"),
    observation("source.actual", "observed_ui", "support", "help", "link"),
    observation("source.guidance", "observed_ui", "entry", "open", "heading"),
  ].map((value) => JSON.stringify(value)).join("\n") + "\n");
  const reportPath = path.join(temporaryRoot, "report.json");
  const outputPath = path.join(temporaryRoot, "backlog.json");
  await writeFile(reportPath, JSON.stringify({
    v2_diagnostic: {
      as_of: "2026-08-27",
      report_digest: "digest",
      errors: [{ code: "insufficient_direct_states", location: "Example Co / Example Product", detail: "3 is below target 5" }],
    },
  }));

  await execFileAsync(process.execPath, [
    path.resolve("scripts/plan-public-product-direct-state-coverage.mjs"),
    "--root", corpusRoot, "--report", reportPath, "--output", outputPath,
  ]);
  const backlog = JSON.parse(await readFile(outputPath, "utf8"));
  assert.deepEqual(backlog.items[0].covered_slot_ids, [
    "entry_onboarding", "core_task_commitment", "destructive_permission_support",
  ]);
  assert.deepEqual(backlog.items[0].missing_slot_ids, [
    "pending_progress", "success", "error_recovery",
  ]);
  assert.deepEqual(backlog.items[0].next_collection_slot_ids, ["pending_progress", "success"]);

  const projectionOutputPath = path.join(temporaryRoot, "projection-backlog.json");
  await execFileAsync(process.execPath, [
    path.resolve("scripts/plan-public-product-direct-state-coverage.mjs"),
    "--root", corpusRoot, "--report", reportPath, "--output", projectionOutputPath,
    "--projection-batch-root", batchRoot,
  ]);
  const projectionBacklog = JSON.parse(await readFile(projectionOutputPath, "utf8"));
  assert.deepEqual(projectionBacklog.items, backlog.items);

  const repeatedProjectionOutputPath = path.join(temporaryRoot, "repeated-projection-backlog.json");
  const emptyBatchRoot = path.join(temporaryRoot, "empty-projection");
  await mkdir(emptyBatchRoot);
  await writeFile(path.join(emptyBatchRoot, "sources.jsonl"), `${JSON.stringify({ source_id: "source.guidance.two", source_class: "official content guidance" })}\n`);
  await writeFile(path.join(emptyBatchRoot, "observations.jsonl"), `${JSON.stringify(observation("source.guidance.two", "observed_ui", "entry", "open", "heading"))}\n`);
  await execFileAsync(process.execPath, [
    path.resolve("scripts/plan-public-product-direct-state-coverage.mjs"),
    "--root", corpusRoot, "--report", reportPath, "--output", repeatedProjectionOutputPath,
    "--projection-batch-root", batchRoot,
    "--projection-batch-root", emptyBatchRoot,
  ]);
  const repeatedProjectionBacklog = JSON.parse(await readFile(repeatedProjectionOutputPath, "utf8"));
  assert.deepEqual(repeatedProjectionBacklog.items, backlog.items);
});
