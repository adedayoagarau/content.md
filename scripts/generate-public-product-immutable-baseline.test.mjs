import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { generateImmutableBaseline, verifyImmutableBaseline } from "./generate-public-product-immutable-baseline.mjs";

test("binds every existing batch file and detects mutation or addition", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "contentmd-immutable-baseline-"));
  const batch = path.join(root, "2026-08-24-batch-01");
  await mkdir(batch);
  await writeFile(path.join(batch, "sources.jsonl"), '{"source_id":"source-1"}\n');
  await writeFile(path.join(batch, "observations.jsonl"), '{"observation_id":"observation-1"}\n');
  try {
    const baseline = await generateImmutableBaseline(root);
    assert.equal(baseline.entries.length, 2);
    assert.equal(await verifyImmutableBaseline(root, baseline), true);
    await writeFile(path.join(batch, "sources.jsonl"), '{"source_id":"changed"}\n');
    await assert.rejects(verifyImmutableBaseline(root, baseline), /immutable_batch_mismatch/u);
    await writeFile(path.join(batch, "new.json"), '{}\n');
    await assert.rejects(verifyImmutableBaseline(root, baseline), /immutable_batch_mismatch/u);
  } finally { await rm(root, { recursive: true, force: true }); }
});
