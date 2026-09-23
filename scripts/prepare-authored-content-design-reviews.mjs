#!/usr/bin/env node

import { createHash } from "node:crypto";
import { open, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { canonicalJson, sha256Canonical } from "../packages/core/dist/index.js";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const defaultChallenge = path.join(
  repositoryRoot,
  "docs/tests/fixtures/content-design-authored-challenges/001-interrupted-application-upload",
);

function fail(reason) {
  throw new Error(`authored_content_design_review_prepare_failed:${reason}`);
}

async function readJson(file, reason) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch {
    fail(reason);
  }
}

function textDigest(value) {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

export function createAuthoredChallengeReviewPacket(input) {
  if (!["Claude", "Cursor"].includes(input.reviewer_system)) fail("reviewer_system");
  const preimage = {
    contract_version: "contentmd.authored-challenge-review-packet/0.1.0",
    reviewer_system: input.reviewer_system,
    scenario_ref: {
      path: "../../scenario.json",
      scenario_id: input.scenario.scenario_id,
      content_digest: sha256Canonical(input.scenario),
    },
    candidate_ref: {
      path: "../contentmd/candidate.json",
      contract_version: input.candidate.contract_version,
      content_digest: sha256Canonical(input.candidate),
    },
    review_prompt_ref: {
      path: "../../prompts/independent-review.md",
      content_digest: textDigest(input.review_prompt),
    },
    language_scope: "English",
    independent_review_required: true,
    other_reviewer_output_access: "forbidden",
    review_state: "awaiting_external_model_review",
    human_gold_eligibility: false,
    effectiveness_claim_eligibility: false,
    authority_effect: "none",
  };
  return { ...preimage, packet_digest: sha256Canonical(preimage) };
}

async function writeCreateOnly(file, value) {
  let handle;
  try {
    handle = await open(file, "wx", 0o600);
    await handle.writeFile(canonicalJson(value), "utf8");
    await handle.sync();
  } catch (error) {
    if (error?.code === "EEXIST") fail(`output_exists:${file}`);
    throw error;
  } finally {
    await handle?.close();
  }
}

export async function prepareAuthoredChallengeReviews(challengeDirectory = defaultChallenge) {
  const scenario = await readJson(path.join(challengeDirectory, "scenario.json"), "scenario");
  const candidate = await readJson(
    path.join(challengeDirectory, "outputs/contentmd/candidate.json"),
    "candidate",
  );
  const reviewPrompt = await readFile(
    path.join(challengeDirectory, "prompts/independent-review.md"),
    "utf8",
  );
  if (scenario.language_scope !== "English"
    || candidate.scenario_id !== scenario.scenario_id
    || candidate.review_state !== "unreviewed"
    || candidate.authority_effect !== "none") fail("input_binding");

  const packets = [];
  for (const reviewerSystem of ["Claude", "Cursor"]) {
    const packet = createAuthoredChallengeReviewPacket({
      reviewer_system: reviewerSystem,
      scenario,
      candidate,
      review_prompt: reviewPrompt,
    });
    const reviewer = reviewerSystem.toLowerCase();
    const output = path.join(challengeDirectory, `outputs/${reviewer}/review-packet.json`);
    await writeCreateOnly(output, packet);
    packets.push({ reviewer_system: reviewerSystem, output, packet_digest: packet.packet_digest });
  }
  return {
    contract_version: "contentmd.authored-challenge-review-preparation/0.1.0",
    scenario_id: scenario.scenario_id,
    packets,
    write_effect: "create_only",
    review_state: "awaiting_external_model_review",
    authority_effect: "none",
  };
}

const invoked = process.argv[1] === undefined ? null : path.resolve(process.argv[1]);
if (invoked !== null && invoked === fileURLToPath(import.meta.url)) {
  const result = await prepareAuthoredChallengeReviews(process.argv[2] === undefined
    ? defaultChallenge
    : path.resolve(process.argv[2]));
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}
