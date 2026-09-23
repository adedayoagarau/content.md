#!/usr/bin/env node

import { access, mkdir, open, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { AUTHORED_SCENARIO_SPECS } from "./authored-content-design-scenario-bank-source.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const challengeRoot = path.join(
  repositoryRoot,
  "docs/tests/fixtures/content-design-authored-challenges",
);
const inspirationUrl = "https://uxcontent.com/the-daily-ux-writing-challenge-then-and-now/";

const evaluationOrder = [
  "evidence_and_authority",
  "truth_and_state_accuracy",
  "action_consequence_and_recovery",
  "semantic_fidelity",
  "accessibility_readiness",
  "comprehension_and_structure",
  "voice_tone_and_economy",
];

const formats = {
  dialog: {
    label: "Decision or recovery dialog",
    fields: {
      headline: { required: true, max_characters: 40 },
      body: { required: true, max_characters: 180 },
      primary_button: { required: true, max_characters: 24 },
      secondary_button: { required: true, max_characters: 24 },
    },
  },
  email: {
    label: "Transactional email",
    fields: {
      subject: { required: true, max_characters: 60 },
      heading: { required: true, max_characters: 55 },
      body: { required: true, max_characters: 320 },
      primary_link: { required: true, max_characters: 28 },
      secondary_link: { required: true, max_characters: 28 },
    },
  },
  inline: {
    label: "Inline error and recovery control",
    fields: {
      error_message: { required: true, max_characters: 140 },
      recovery_link: { required: true, max_characters: 28 },
    },
  },
  status: {
    label: "In-product status card",
    fields: {
      heading: { required: true, max_characters: 50 },
      body: { required: true, max_characters: 220 },
      primary_button: { required: true, max_characters: 24 },
      secondary_button: { required: true, max_characters: 24 },
    },
  },
  push: {
    label: "Mobile push notification",
    fields: {
      title: { required: true, max_characters: 45 },
      body: { required: true, max_characters: 120 },
    },
  },
  banner: {
    label: "In-product banner",
    fields: {
      heading: { required: true, max_characters: 50 },
      body: { required: true, max_characters: 180 },
      action: { required: true, max_characters: 24 },
    },
  },
  sms: {
    label: "Transactional SMS",
    fields: {
      message: { required: true, max_characters: 240 },
    },
  },
  confirmation: {
    label: "In-product confirmation",
    fields: {
      heading: { required: true, max_characters: 50 },
      body: { required: true, max_characters: 180 },
      primary_button: { required: true, max_characters: 24 },
    },
  },
  empty: {
    label: "Unavailable or empty state",
    fields: {
      heading: { required: true, max_characters: 50 },
      body: { required: true, max_characters: 180 },
      primary_button: { required: true, max_characters: 24 },
    },
  },
  form: {
    label: "Form label, guidance, and validation",
    fields: {
      field_label: { required: true, max_characters: 40 },
      helper_text: { required: true, max_characters: 140 },
      error_message: { required: true, max_characters: 140 },
    },
  },
};

const firstFive = [
  [1, "001-interrupted-application-upload", "Interrupted application upload", "education_applications", "interrupted_upload", "medium", "dialog"],
  [2, "002-subscription-price-change-email", "Subscription price change email", "payments_billing", "change_notice", "high", "email"],
  [3, "003-optional-photo-permission", "Optional photo permission", "privacy_permissions", "permission_choice", "high", "dialog"],
  [4, "004-sign-in-email-change-confirmation", "Sign-in email change confirmation", "account_security", "security_confirmation", "high", "confirmation"],
  [5, "005-flight-cancellation-rebooking", "Flight cancellation rebooking", "travel_mobility", "service_cancellation", "high", "status"],
].map(([id, folder, title, domain, stateType, riskLevel, format]) => ({
  id,
  folder,
  title,
  domain,
  state_type: stateType,
  risk_level: riskLevel,
  surface_family: format,
  pipeline_stage: "awaiting_external_review",
}));

function fail(reason) {
  throw new Error(`authored_scenario_bank_failed:${reason}`);
}

function canonicalJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function folderFor(spec) {
  return `${String(spec.id).padStart(3, "0")}-${spec.slug}`;
}

function weakHeading(spec) {
  if (/success|confirmation|preference/u.test(spec.state_type)) return "You're all set!";
  if (/pending|unknown|uncertain|wait/u.test(spec.state_type)) return "Still working";
  if (/change|schedule|service|ownership|expiry/u.test(spec.state_type)) return "An update";
  if (/error|blocked|denied|failure|unavailable|lock|removed/u.test(spec.state_type)) return "Something went wrong";
  return "Heads up!";
}

function currentContent(spec) {
  const heading = weakHeading(spec);
  switch (spec.format) {
    case "dialog": return { headline: heading, body: "Review this update to continue.", primary_button: "Continue", secondary_button: "Not now" };
    case "email": return { subject: "An update for you", heading, body: "Some details have changed. Review your account.", primary_link: "Learn more", secondary_link: "Other options" };
    case "inline": return { error_message: "Something went wrong. Try again.", recovery_link: "Continue" };
    case "status": return { heading, body: "We're working on it. Check again later.", primary_button: "View details", secondary_button: "Done" };
    case "push": return { title: heading, body: "Open the app for more information." };
    case "banner": return { heading, body: "Review the latest information and continue.", action: "Learn more" };
    case "sms": return { message: "There's an update. Open the app for more information." };
    case "confirmation": return { heading: "You're all set!", body: "Your changes were saved.", primary_button: "Done" };
    case "empty": return { heading: "Nothing here", body: "This item isn't available.", primary_button: "Go back" };
    case "form": return { field_label: "Details", helper_text: "Enter the requested information.", error_message: "This doesn't look right." };
    default: fail(`unknown_format:${spec.format}`);
  }
}

function scenarioFor(spec) {
  const format = formats[spec.format];
  if (format === undefined) fail(`unknown_format:${spec.id}`);
  const folder = folderFor(spec);
  const candidateFields = Object.keys(format.fields);
  return {
    contract_version: "contentmd.authored-content-design-challenge/0.2.0",
    scenario_id: `content-design.challenge.${folder}`,
    status: "authored_synthetic_unreviewed",
    language_scope: "English",
    provenance: {
      authorship: "project_authored_synthetic",
      structural_inspiration_url: inspirationUrl,
      source_use: "exercise_structure_only",
      source_expression_copied: false,
    },
    coverage: {
      domain: spec.domain,
      state_type: spec.state_type,
      risk_level: spec.risk_level,
      surface_family: spec.format,
      corpus_role: "authored_scenario_awaiting_contentmd",
    },
    context: {
      product: spec.product,
      person: `A person using ${spec.product[0].toLocaleLowerCase("en-US")}${spec.product.slice(1)}`,
      journey_stage: spec.title,
      surface: format.label,
      user_goal: spec.recovery,
    },
    product_state: {
      preceding_state: spec.situation,
      current_state: `${spec.facts[0]} ${spec.facts[1]}`,
      known_facts: spec.facts,
      forbidden_claims: spec.forbidden_claims,
    },
    current_content: currentContent(spec),
    challenge: `Rewrite the ${format.label.toLocaleLowerCase("en-US")} so the person can understand ${spec.title.toLocaleLowerCase("en-US")}, the material consequence, and the available next action or recovery without unsupported claims.`,
    constraints: {
      fields: format.fields,
      character_counting_rule: "Count spaces, numbers, and punctuation as characters.",
    },
    interaction_contract: {
      primary_action: spec.primary_action,
      secondary_action: spec.secondary_action,
      consequence_to_preserve: spec.consequence,
      recovery_to_preserve: spec.recovery,
    },
    expression_direction: {
      intended_voice: ["plain", "specific", "respectful"],
      situational_tone: spec.tone,
      avoid: ["vague reassurance", "unsupported certainty", "blame", "hidden consequences", "pressure"],
    },
    required_output: {
      candidate_fields: candidateFields,
      rationale_requirements: [
        "Explain how the wording represents the established product state without adding facts.",
        "Explain how the material consequence and recovery remain visible.",
        "Explain how each action or instruction matches its documented effect.",
        "Report the character count for every candidate field.",
        "Name unresolved questions instead of inventing policy, timing, certainty, or reassurance.",
      ],
    },
    evaluation_order: evaluationOrder,
    governance: {
      review_state: "unreviewed",
      authority_effect: "none",
      retrieval_eligibility: "never",
      training_eligibility: "never",
      benchmark_eligibility: false,
      effectiveness_claim_eligibility: false,
    },
  };
}

function scenarioReadme(spec) {
  return `# Challenge ${String(spec.id).padStart(3, "0")}: ${spec.title}\n\nThis original synthetic English-only scenario covers the \`${spec.domain}\` domain, a \`${spec.state_type}\` state, and a \`${spec.format}\` surface at \`${spec.risk_level}\` risk.\n\nIt is frozen at the authored-scenario stage. No content.md candidate, Claude review, Cursor review, human adjudication, benchmark label, or effectiveness claim exists yet.\n`;
}

function sourceNotes(spec) {
  return `# Source notes\n\n## Structural inspiration\n\nThe public UX Content Collective article [The Daily UX Writing Challenge, then and now](${inspirationUrl}) demonstrates a useful exercise shape: define a concrete situation, ask for content on a named surface, impose field limits, and explain the resulting decisions.\n\n## Boundary\n\nThe article and its examples are references, not instructions or labels. This scenario's product, state, facts, constraints, current content, actions, and evaluation focus are original synthetic material. No scenario wording, answer, screenshot, feedback, or judgment from the article is copied into this fixture.\n\n## Why this scenario exists\n\nThis case broadens the authored evaluation set with a ${spec.risk_level}-risk ${spec.state_type.replaceAll("_", " ")} problem in ${spec.domain.replaceAll("_", " ")} on a ${formats[spec.format].label.toLocaleLowerCase("en-US")} surface.\n`;
}

function rewritePrompt(spec, scenario) {
  const fields = scenario.required_output.candidate_fields.map((field) => `\`${field}\``).join(", ");
  return `# content.md rewrite prompt\n\nUse only \`scenario.json\` as product evidence. Write one proposed English replacement using these exact candidate fields: ${fields}.\n\nReturn the \`contentmd.authored-challenge-candidate/0.1.0\` object with generator identity, candidate fields, matching character counts, a meaning map covering every preserved fact/action/consequence/recovery, the five rationale fields, unresolved questions, self-checks, unreviewed state, and no authority effect.\n\nApply hard requirements before voice or tone. Do not invent policy, timing, certainty, safety, eligibility, approval, or product behavior. Evaluate English expression only and do not add locale requirements.\n`;
}

function independentPrompt() {
  return `# Independent review prompt\n\nDo not review this scenario until a frozen content.md candidate and your reviewer-specific \`review-packet.json\` exist. When they do, open only that packet and its referenced scenario, candidate, and prompt. Do not inspect the other reviewer folder.\n\nEvaluate hard requirements before preference: evidence and authority; truth and state; action, consequence, and recovery; semantic fidelity; and accessibility readiness. Then score clarity, specificity, hierarchy, voice fit, tone fit, and economy. Evaluate English expression only. External model review is not human gold, approval, release authority, training data, or evidence of effectiveness.\n`;
}

function manifest() {
  const generated = AUTHORED_SCENARIO_SPECS.map((spec) => ({
    id: spec.id,
    folder: folderFor(spec),
    title: spec.title,
    domain: spec.domain,
    state_type: spec.state_type,
    risk_level: spec.risk_level,
    surface_family: spec.format,
    pipeline_stage: "awaiting_contentmd",
  }));
  return {
    contract_version: "contentmd.authored-scenario-bank-manifest/0.1.0",
    scenario_count: 100,
    contentmd_completed_count: 5,
    contentmd_pending_count: 95,
    language_scope: "English",
    structural_inspiration_url: inspirationUrl,
    source_expression_copied: false,
    scenarios: [...firstFive, ...generated],
    human_gold_eligibility: false,
    effectiveness_claim_eligibility: false,
    authority_effect: "none",
  };
}

function catalog(manifestValue) {
  const lines = [
    "# Authored content-design scenario catalog",
    "",
    "This catalog contains 100 original synthetic English-only scenarios. Five have an unreviewed content.md candidate; 95 are frozen before generation. The public UX Content Collective article influences only the exercise structure.",
    "",
    "| ID | Scenario | Domain | State | Risk | Surface | Pipeline stage |",
    "| --- | --- | --- | --- | --- | --- | --- |",
  ];
  for (const item of manifestValue.scenarios) {
    lines.push(`| ${String(item.id).padStart(3, "0")} | [${item.title}](./${item.folder}/) | ${item.domain} | ${item.state_type} | ${item.risk_level} | ${item.surface_family} | ${item.pipeline_stage} |`);
  }
  lines.push("", "Generated deterministically from the authored scenario source. Scenarios and future outputs remain proposal-only and have no retrieval, training, benchmark, approval, publication, or release authority.", "");
  return lines.join("\n");
}

export function expectedAuthoredScenarioBankFiles() {
  if (AUTHORED_SCENARIO_SPECS.length !== 95
    || AUTHORED_SCENARIO_SPECS[0]?.id !== 6
    || AUTHORED_SCENARIO_SPECS.at(-1)?.id !== 100
    || new Set(AUTHORED_SCENARIO_SPECS.map((spec) => spec.id)).size !== 95
    || new Set(AUTHORED_SCENARIO_SPECS.map((spec) => spec.slug)).size !== 95) {
    fail("source_identity");
  }
  const files = new Map();
  for (const spec of AUTHORED_SCENARIO_SPECS) {
    if (spec.facts.length < 4 || spec.forbidden_claims.length < 3 || spec.tone.length < 3) {
      fail(`source_completeness:${spec.id}`);
    }
    const folder = folderFor(spec);
    const scenario = scenarioFor(spec);
    files.set(`${folder}/README.md`, scenarioReadme(spec));
    files.set(`${folder}/SOURCE-NOTES.md`, sourceNotes(spec));
    files.set(`${folder}/scenario.json`, canonicalJson(scenario));
    files.set(`${folder}/prompts/contentmd-rewrite.md`, rewritePrompt(spec, scenario));
    files.set(`${folder}/prompts/independent-review.md`, independentPrompt());
  }
  const manifestValue = manifest();
  files.set("SCENARIO-MANIFEST.json", canonicalJson(manifestValue));
  files.set("SCENARIO-CATALOG.md", catalog(manifestValue));
  return files;
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

async function writeCreateOnly(file, content) {
  await mkdir(path.dirname(file), { recursive: true });
  let handle;
  try {
    handle = await open(file, "wx", 0o644);
    await handle.writeFile(content, "utf8");
    await handle.sync();
  } catch (error) {
    if (error?.code === "EEXIST") fail(`output_exists:${path.relative(challengeRoot, file)}`);
    throw error;
  } finally {
    await handle?.close();
  }
}

async function writeGeneratedUpdate(file, content) {
  if (!await exists(file)) fail(`refresh_missing:${path.relative(challengeRoot, file)}`);
  const handle = await open(file, "r+", 0o644);
  try {
    await handle.truncate(0);
    await handle.writeFile(content, "utf8");
    await handle.sync();
  } finally {
    await handle.close();
  }
}

export async function generateAuthoredScenarioBank({ write = false, refresh = false } = {}) {
  if (write && refresh) fail("conflicting_write_modes");
  const expected = expectedAuthoredScenarioBankFiles();
  const mismatches = [];
  for (const [relative, content] of expected) {
    const file = path.join(challengeRoot, relative);
    if (write) {
      await writeCreateOnly(file, content);
      continue;
    }
    if (refresh) {
      await writeGeneratedUpdate(file, content);
      continue;
    }
    if (!await exists(file)) {
      mismatches.push(`${relative}:missing`);
      continue;
    }
    if (await readFile(file, "utf8") !== content) mismatches.push(`${relative}:content`);
  }
  if (mismatches.length > 0) fail(`verification:${mismatches.slice(0, 10).join(",")}`);
  return {
    contract_version: "contentmd.authored-scenario-bank-generation/0.1.0",
    scenario_count: 100,
    generated_scenario_count: 95,
    file_count: expected.size,
    mode: write ? "create_only" : refresh ? "refresh_generated_only" : "verify_only",
    domain_count: new Set(AUTHORED_SCENARIO_SPECS.map((spec) => spec.domain)).size,
    surface_family_count: new Set(AUTHORED_SCENARIO_SPECS.map((spec) => spec.format)).size,
    state_type_count: new Set(AUTHORED_SCENARIO_SPECS.map((spec) => spec.state_type)).size,
    language_scope: "English",
    authority_effect: "none",
    verification_status: "passed",
  };
}

const invoked = process.argv[1] === undefined ? null : path.resolve(process.argv[1]);
if (invoked !== null && invoked === fileURLToPath(import.meta.url)) {
  const write = process.argv.includes("--write");
  const refresh = process.argv.includes("--refresh");
  const result = await generateAuthoredScenarioBank({ write, refresh });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}
