#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const outputDirectory = path.join(root, "docs/tests/fixtures/content-design-scenarios");

const abilities = [
  ["context_framing", "Identify the user task, actors, risk, evidence, and unresolved questions"],
  ["semantic_fidelity", "Preserve material facts, actors, states, options, timing, and consequences"],
  ["interaction_state", "Match content to the current state and the next available action"],
  ["recovery", "Provide safe verification, correction, reversal, alternatives, or support"],
  ["agency_trust", "Expose material choice, commitment, automation, uncertainty, and control"],
  ["structure_navigation", "Maintain coherent hierarchy, terminology, and destination promises"],
  ["controls_forms", "Create labels, instructions, validation, progress, and confirmation in context"],
  ["accessibility", "Support meaningful accessible names, announcements, and non-text context"],
  ["localization", "Preserve meaning across locale, direction, expansion, formats, and specialist review"],
  ["voice_tone", "Choose an appropriate voice and situational tone only after hard requirements pass"],
];

const situations = [
  ["payment_unknown", "A payment submission timed out and its outcome is not confirmed", "high", "Verify payment status before another attempt", "We couldn't confirm your payment", "Check payment status", "Paying again could result in a duplicate charge"],
  ["subscription_renewal", "A trial converts to a paid recurring subscription", "high", "Show price, timing, refusal, and cancellation", "Your 14-day trial will renew at $12 a month", "Review or cancel subscription", "You'll be charged unless you cancel before renewal"],
  ["destructive_delete", "Deleting the item permanently removes shared work", "critical", "Name the object, impact, and irreversible result", "Deleting this project permanently removes it for everyone", "Delete project", "This can't be undone"],
  ["permission_request", "The product requests access to sensitive device data", "high", "Explain purpose, scope, choice, and settings recovery", "Location access shows nearby pickup options", "Choose location access", "You can change this later in Settings"],
  ["validation_error", "Submitted information fails a known field requirement", "medium", "Bind the error to the field and explain correction", "Enter a valid expiry date", "Review expiry date", "We can't submit the form until this is corrected"],
  ["empty_state", "No items exist yet and the user can create the first one", "low", "Explain the state and available first action", "No projects yet", "Create project", "Your projects will appear here"],
  ["service_interruption", "A temporary outage blocks completion and timing is unknown", "high", "Represent uncertainty and preserve completed work", "We can't complete this right now", "Try again later", "Your saved work is still here"],
  ["automated_assistant", "An automated assistant can explain but cannot change the account", "medium", "Disclose automation, limits, and human handoff", "I'm an automated assistant and can explain billing, but I can't change your account", "Contact support", "A support agent can help with account changes"],
  ["navigation_destination", "Several entry points lead to the same account-security destination", "medium", "Use one governed destination promise", "Manage your password and sign-in options in Security", "Go to Security", "This opens Security settings"],
  ["successful_update", "A requested profile change completed successfully", "low", "Confirm the completed result without extra claims", "Profile updated", "View profile", "Your changes are saved"],
];

const surfaces = [
  ["button", "compact control label", "web"],
  ["form_error", "inline validation message", "web"],
  ["banner", "persistent page-level notice", "web"],
  ["dialog", "interruptive decision dialog", "web"],
  ["empty_state", "page-level zero state", "web"],
  ["notification", "out-of-product notification", "push"],
  ["email", "transactional email", "email"],
  ["help_article", "support guidance", "help"],
  ["chat", "assistant response", "web_chat"],
  ["screen_reader_status", "non-visual status announcement", "assistive_technology"],
];

const variants = [
  { id: "plain_direct", voice: "plain", tone: "direct", defect: null, disposition: "human_preference_review" },
  { id: "concise_calm", voice: "concise", tone: "calm", defect: null, disposition: "human_preference_review" },
  { id: "warm_supportive", voice: "warm", tone: "supportive", defect: null, disposition: "human_preference_review" },
  { id: "formal_serious", voice: "formal", tone: "serious", defect: null, disposition: "human_preference_review" },
  { id: "false_certainty", voice: "confident", tone: "reassuring", defect: "unsupported_certainty", disposition: "revise" },
  { id: "vague_action", voice: "minimal", tone: "neutral", defect: "unclear_action_or_object", disposition: "revise" },
  { id: "missing_consequence", voice: "concise", tone: "neutral", defect: "material_consequence_omitted", disposition: "revise" },
  { id: "blameful", voice: "blunt", tone: "accusatory", defect: "user_blame", disposition: "human_preference_review" },
  { id: "overloaded", voice: "technical", tone: "verbose", defect: "poor_hierarchy_and_economy", disposition: "human_preference_review" },
  { id: "urgent_pressure", voice: "promotional", tone: "urgent", defect: "unsupported_urgency_or_pressure", disposition: "revise" },
];

const localeSlices = ["en-US", "en-GB", "es-US", "fr-FR", "de-DE", "ar-SA", "he-IL", "ja-JP", "pt-BR", "en-IN"];

function baseCandidate(situation, surface) {
  const [situationId, , , , state, action, consequence] = situation;
  const surfaceId = surface[0];
  if (surfaceId === "button") return { text: action, supporting_text: `${state}. ${consequence}.` };
  if (surfaceId === "form_error") return { text: `${state}. ${action}.`, supporting_text: consequence };
  if (surfaceId === "dialog") return { text: `${state}. ${consequence}.`, supporting_text: action };
  if (surfaceId === "notification") return { text: `${state}. ${action}.`, supporting_text: consequence };
  if (surfaceId === "email") return { text: `${state}. ${consequence}. ${action}.`, supporting_text: `Regarding ${situationId.replaceAll("_", " ")}` };
  if (surfaceId === "help_article") return { text: `${state}. ${consequence}. ${action}.`, supporting_text: `Help with ${situationId.replaceAll("_", " ")}` };
  if (surfaceId === "chat") return { text: `${state}. ${action}.`, supporting_text: consequence };
  if (surfaceId === "screen_reader_status") return { text: state, supporting_text: `${consequence}. ${action}.` };
  return { text: `${state}. ${action}.`, supporting_text: consequence };
}

function candidateText(situation, surface, variant) {
  const [situationId, , , , state, action, consequence] = situation;
  const base = baseCandidate(situation, surface);
  if (variant.defect === "unsupported_certainty") return { text: `Everything is complete for ${situationId.replaceAll("_", " ")}. ${action}.`, supporting_text: null };
  if (variant.defect === "unclear_action_or_object") return { text: `Continue with ${situationId.replaceAll("_", " ")}.`, supporting_text: "Something happened." };
  if (variant.defect === "material_consequence_omitted") return { text: `${state}. ${action}.`, supporting_text: null };
  if (variant.defect === "user_blame") return { text: `You caused this ${situationId.replaceAll("_", " ")} issue. ${action}.`, supporting_text: consequence };
  if (variant.defect === "poor_hierarchy_and_economy") return { text: `System information about ${situationId.replaceAll("_", " ")}: ${state}. Please carefully review all available information before determining whether to proceed. ${consequence}. ${action}.`, supporting_text: null };
  if (variant.defect === "unsupported_urgency_or_pressure") return { text: `Act now—don't miss out on ${situationId.replaceAll("_", " ")}. ${action}.`, supporting_text: consequence };
  if (variant.id === "warm_supportive") return { text: `We're here to help. ${base.text}`, supporting_text: base.supporting_text };
  if (variant.id === "formal_serious") return { text: `Important: ${base.text}`, supporting_text: base.supporting_text };
  if (variant.id === "concise_calm") return { text: base.text.replace(/\.$/u, ""), supporting_text: base.supporting_text };
  return base;
}

function provisionalExpectation(variant, locale) {
  if (variant.defect !== null) {
    return {
      disposition: variant.disposition,
      basis: variant.defect,
      status: "generator_label_not_human_gold",
    };
  }
  if (locale !== "en-US") {
    return {
      disposition: "escalate",
      basis: "source_language_candidate_requires_in_locale_review",
      status: "generator_label_not_human_gold",
    };
  }
  return {
    disposition: "human_preference_review",
    basis: "hard_requirements_assumed_satisfied_preference_unresolved",
    status: "generator_label_not_human_gold",
  };
}

function digest(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

export function generateScenarios() {
  const scenarios = [];
  for (const [abilityIndex, ability] of abilities.entries()) {
    for (const [situationIndex, situation] of situations.entries()) {
      for (const [surfaceIndex, surface] of surfaces.entries()) {
        for (const [variantIndex, variant] of variants.entries()) {
          const ordinal = (((abilityIndex * situations.length + situationIndex) * surfaces.length + surfaceIndex) * variants.length) + variantIndex + 1;
          const locale = localeSlices[(abilityIndex + situationIndex + surfaceIndex + variantIndex) % localeSlices.length];
          const expression = candidateText(situation, surface, variant);
          const scenario = {
            contract_version: "contentmd.content-design-evaluation-scenario/0.1.0",
            scenario_id: `cdes-${String(ordinal).padStart(5, "0")}`,
            provenance: {
              source_type: "synthetic_combinatorial",
              generator: "scripts/generate-content-design-evaluation-scenarios.mjs",
              rights_basis: "project_authored_synthetic",
              evidence_status: "not_product_evidence",
              review_status: "candidate_unreviewed",
            },
            ability: { id: ability[0], objective: ability[1] },
            context: {
              situation: situation[0],
              state: situation[1],
              risk: situation[2],
              user_goal: situation[3],
              state_expression: situation[4],
              action_expression: situation[5],
              consequence_expression: situation[6],
              surface: surface[0],
              surface_context: surface[1],
              channel: surface[2],
              source_locale: "en-US",
              target_locale: locale,
              direction: locale === "ar-SA" || locale === "he-IL" ? "rtl" : "ltr",
            },
            candidate: {
              variant: variant.id,
              text: expression.text,
              supporting_text: expression.supporting_text,
              voice: variant.voice,
              tone: variant.tone,
              injected_defect: variant.defect,
              language: "en",
              localization_status: locale === "en-US" ? "target_language_candidate" : "source_language_candidate_requires_localization",
            },
            provisional_expectation: provisionalExpectation(variant, locale),
            rubric: {
              evaluation_order: ["evidence_authority", "truth_state", "action_consequence_recovery", "semantic_completeness", "accessibility_locale", "comprehension_structure", "voice_tone_economy"],
              hard_dimensions: ["factual_accuracy", "state_accuracy", "semantic_fidelity", "agency", "recovery", "authority_boundary"],
              quality_dimensions: ["clarity", "specificity", "hierarchy", "accessibility_readiness", "locale_readiness", "voice_fit", "tone_fit", "economy"],
            },
            human_gold: null,
          };
          scenarios.push({ ...scenario, scenario_digest: digest(scenario) });
        }
      }
    }
  }
  return scenarios;
}

export function buildManifest(scenarios) {
  const count = (selector) => Object.fromEntries([...new Set(scenarios.map(selector))].sort().map((key) => [key, scenarios.filter((scenario) => selector(scenario) === key).length]));
  const scenarioDigests = scenarios.map((scenario) => scenario.scenario_digest);
  return {
    contract_version: "contentmd.content-design-evaluation-manifest/0.1.0",
    generated_count: scenarios.length,
    qualification_status: "synthetic_candidates_not_gold_or_training_eligible",
    distributions: {
      ability: count((scenario) => scenario.ability.id),
      situation: count((scenario) => scenario.context.situation),
      surface: count((scenario) => scenario.context.surface),
      target_locale: count((scenario) => scenario.context.target_locale),
      candidate_variant: count((scenario) => scenario.candidate.variant),
    },
    scenario_set_digest: digest(scenarioDigests),
  };
}

async function main() {
  const scenarios = generateScenarios();
  const manifest = buildManifest(scenarios);
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, "scenarios.jsonl"), `${scenarios.map((scenario) => JSON.stringify(scenario)).join("\n")}\n`);
  await writeFile(path.join(outputDirectory, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ output_directory: outputDirectory, ...manifest }, null, 2));
}

if (process.argv[1] !== undefined && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
