import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { verifyPublicProductEvidenceDispositionsFromDisk } from "./verify-public-product-evidence-dispositions.mjs";

test("verifies a zero-event ledger over exact immutable corpus lines", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "contentmd-disposition-adapter-"));
  const batch = path.join(root, "2026-08-24-batch-01");
  await mkdir(batch);
  await writeFile(path.join(root, "industry-taxonomy.json"), '{"contract_version":"contentmd.public-product-industry-taxonomy/0.1.0","industries":[{"industry_id":"test","name":"Test","aliases":["test"]}],"authority_effect":"none"}\n');
  await writeFile(path.join(batch, "sources.jsonl"), '{"source_id":"source-1"}\n');
  await writeFile(path.join(batch, "observations.jsonl"), '{"observation_id":"observation-1"}\n');
  try {
    const verified = await verifyPublicProductEvidenceDispositionsFromDisk({
      root, asOf: "2026-08-24T20:00:00.000Z",
      targets: { companies: 1, products: 1, industries: 1, directStatesPerProduct: 1 },
      verificationMode: "development_fixture",
    });
    assert.equal(verified.head.event_count, 0);
    assert.equal(verified.state_by_subject.size, 2);
  } finally { await rm(root, { recursive: true, force: true }); }
});
