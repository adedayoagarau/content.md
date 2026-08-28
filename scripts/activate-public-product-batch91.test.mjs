import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

test("fails closed before mutation while either consolidated review is incomplete", async (context) => {
  const destination = path.resolve("research/09-experimental/public-product-corpus/2026-08-27-batch-91");
  const reviews = await Promise.all([
    "ade-batch-91-consolidated-review.json",
    "ola-batch-91-consolidated-review.json",
  ].map((file) => readFile(path.resolve("research/09-experimental/public-product-corpus/reviewer-assignments", file), "utf8").then(JSON.parse)));
  if (reviews.every(({ decision }) => decision === "pass")) {
    context.skip("consolidated reviews are complete; incomplete-review boundary no longer applies");
    return;
  }
  await assert.rejects(access(destination), { code: "ENOENT" });
  await assert.rejects(
    execFileAsync(process.execPath, [path.resolve("scripts/activate-public-product-batch91.mjs")]),
    (error) => {
      assert.match(error.stderr, /review is incomplete, non-passing, or invalid/u);
      return true;
    },
  );
  await assert.rejects(access(destination), { code: "ENOENT" });
});
