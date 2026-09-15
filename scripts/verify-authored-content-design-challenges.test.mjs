import { cp, mkdtemp, readFile, rm, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

import { verifyAuthoredContentDesignChallenges } from "./verify-authored-content-design-challenges.mjs";
import { prepareAuthoredChallengeReviews } from "./prepare-authored-content-design-reviews.mjs";

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

test("prepares two candidate-bound reviewer packets and refuses to overwrite them", async (context) => {
  const { temporary, root } = await fixture();
  context.after(() => rm(temporary, { recursive: true, force: true }));
  const challenge = path.join(root, "001-interrupted-application-upload");
  await unlink(path.join(challenge, "outputs/claude/review-packet.json"));
  await unlink(path.join(challenge, "outputs/cursor/review-packet.json"));
  const result = await prepareAuthoredChallengeReviews(challenge);
  assert.equal(result.packets.length, 2);
  assert.notEqual(result.packets[0].packet_digest, result.packets[1].packet_digest);
  assert.equal((await verifyAuthoredContentDesignChallenges(root)).verification_status, "passed");
  await assert.rejects(
    prepareAuthoredChallengeReviews(challenge),
    /authored_content_design_review_prepare_failed:output_exists/u,
  );
});

test("supports scenario-specific content fields instead of assuming a dialog", async (context) => {
  const { temporary, root } = await fixture();
  context.after(() => rm(temporary, { recursive: true, force: true }));
  const challenge = path.join(root, "001-interrupted-application-upload");
  const scenarioFile = path.join(challenge, "scenario.json");
  const candidateFile = path.join(challenge, "outputs/contentmd/candidate.json");
  const scenario = JSON.parse(await readFile(scenarioFile, "utf8"));
  const candidate = JSON.parse(await readFile(candidateFile, "utf8"));
  scenario.current_content = {
    subject: scenario.current_content.headline,
    body: scenario.current_content.body,
  };
  scenario.constraints.fields = {
    subject: { required: true, max_characters: 50 },
    body: { required: true, max_characters: 140 },
  };
  scenario.required_output.candidate_fields = ["subject", "body"];
  candidate.candidate = {
    subject: candidate.candidate.headline,
    body: `${candidate.candidate.body} Continue editing is also available.`,
  };
  candidate.character_counts = {
    subject: [...candidate.candidate.subject].length,
    body: [...candidate.candidate.body].length,
  };
  scenario.constraints.fields.body.max_characters = candidate.character_counts.body;
  for (const entry of candidate.meaning_map) {
    entry.expressed_in = entry.expressed_in.map((field) => field === "headline" ? "subject" : "body");
    entry.expressed_in = [...new Set(entry.expressed_in)];
  }
  await writeFile(scenarioFile, `${JSON.stringify(scenario, null, 2)}\n`);
  await writeFile(candidateFile, `${JSON.stringify(candidate, null, 2)}\n`);
  await unlink(path.join(challenge, "outputs/claude/review-packet.json"));
  await unlink(path.join(challenge, "outputs/cursor/review-packet.json"));
  await prepareAuthoredChallengeReviews(challenge);
  assert.equal((await verifyAuthoredContentDesignChallenges(root)).verification_status, "passed");
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

test("rejects a reviewer packet that is not bound to the frozen candidate", async (context) => {
  const { temporary, root } = await fixture();
  context.after(() => rm(temporary, { recursive: true, force: true }));
  const file = path.join(root, "001-interrupted-application-upload/outputs/claude/review-packet.json");
  const packet = JSON.parse(await readFile(file, "utf8"));
  packet.candidate_ref.content_digest = "0".repeat(64);
  await writeFile(file, `${JSON.stringify(packet, null, 2)}\n`);
  await assert.rejects(
    verifyAuthoredContentDesignChallenges(root),
    /authored_content_design_challenge_invalid:001-interrupted-application-upload:review_packet_binding:claude/u,
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
