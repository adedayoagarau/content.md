import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { verifyPublicProductExperienceTaxonomyFromDisk } from "./verify-public-product-experience-taxonomy.mjs";

test("fails closed when the active reviewed taxonomy artifact is absent", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "contentmd-taxonomy-adapter-"));
  try {
    await assert.rejects(
      verifyPublicProductExperienceTaxonomyFromDisk({ root, asOf: "2026-08-24T20:00:00.000Z" }),
      /experience-taxonomy\.json/u,
    );
  } finally { await rm(root, { recursive: true, force: true }); }
});
