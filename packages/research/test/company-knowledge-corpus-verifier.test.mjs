import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createCompanyKnowledgePacket } from "./company-knowledge-fixture.mjs";
import { verifyCompanyKnowledgeCorpus } from "../../../scripts/verify-company-knowledge-corpus.mjs";

test("verifies packet progress and stays incomplete below the company target", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "contentmd-company-knowledge-"));
  try {
    await mkdir(root, { recursive: true });
    await writeFile(path.join(root, "fixture.json"), JSON.stringify(createCompanyKnowledgePacket()), "utf8");
    const result = await verifyCompanyKnowledgeCorpus({ root, targetCompanies: 5000 });
    assert.equal(result.summary.companies, 1);
    assert.equal(result.summary.status, "incomplete");
    assert.equal(result.training_eligibility, "pending_review");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
