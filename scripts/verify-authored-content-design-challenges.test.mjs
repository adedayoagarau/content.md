import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

import { verifyAuthoredContentDesignChallenges } from "./verify-authored-content-design-challenges.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const sourceRoot = path.join(repositoryRoot, "docs/tests/fixtures/content-design-authored-challenges");

async function fixture() {
  const temporary = await mkdtemp(path.join(tmpdir(), "contentmd-authored-challenges-"));
  const root = path.join(temporary, "challenges");
  await cp(sourceRoot, root, { recursive: true });
  return { temporary, root };
}

test("verifies the committed English-only authored challenge", async () => {
  const report = await verifyAuthoredContentDesignChallenges(sourceRoot);
  assert.equal(report.verification_status, "passed");
  assert.equal(report.challenge_count, 1);
  assert.equal(report.challenges[0].candidate_status, "present_unreviewed");
  assert.equal(report.challenges[0].contentmd_diagnosis, "revise");
  assert.equal(report.challenges[0].contentmd_finding_count, 3);
  assert.equal(report.challenges[0].locale_evaluation, false);
});

test("rejects a generated candidate that exceeds a field limit", async (context) => {
  const { temporary, root } = await fixture();
  context.after(() => rm(temporary, { recursive: true, force: true }));
  const file = path.join(root, "001-interrupted-application-upload/outputs/contentmd/candidate.json");
  const candidate = JSON.parse(await readFile(file, "utf8"));
  candidate.candidate.headline = "This generated recovery headline is intentionally far too long";
  candidate.character_counts.headline = [...candidate.candidate.headline].length;
  await writeFile(file, `${JSON.stringify(candidate, null, 2)}\n`);
  await assert.rejects(
    verifyAuthoredContentDesignChallenges(root),
    /authored_content_design_challenge_invalid:001-interrupted-application-upload:candidate_field:headline/u,
  );
});

test("rejects a scenario that widens the language scope", async (context) => {
  const { temporary, root } = await fixture();
  context.after(() => rm(temporary, { recursive: true, force: true }));
  const file = path.join(root, "001-interrupted-application-upload/scenario.json");
  const scenario = JSON.parse(await readFile(file, "utf8"));
  scenario.language_scope = "Multilingual";
  await writeFile(file, `${JSON.stringify(scenario, null, 2)}\n`);
  await assert.rejects(
    verifyAuthoredContentDesignChallenges(root),
    /authored_content_design_challenge_invalid:001-interrupted-application-upload:identity_or_language_scope/u,
  );
});

test("rejects a content.md diagnosis that does not replay", async (context) => {
  const { temporary, root } = await fixture();
  context.after(() => rm(temporary, { recursive: true, force: true }));
  const file = path.join(root, "001-interrupted-application-upload/outputs/contentmd/review.json");
  const review = JSON.parse(await readFile(file, "utf8"));
  review.recommended_disposition = "bounded_approval";
  await writeFile(file, `${JSON.stringify(review, null, 2)}\n`);
  await assert.rejects(
    verifyAuthoredContentDesignChallenges(root),
    /authored_content_design_challenge_invalid:001-interrupted-application-upload:contentmd_review_replay/u,
  );
});
