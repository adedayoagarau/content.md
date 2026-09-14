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
  ["payment_unknown", "A payment submission timed out and its outcome is not confirmed", "high", "Verify payment status before another attempt"],
  ["subscription_renewal", "A trial converts to a paid recurring subscription", "high", "Show price, timing, refusal, and cancellation"],
  ["destructive_delete", "Deleting the item permanently removes shared work", "critical", "Name the object, impact, and irreversible result"],
  ["permission_request", "The product requests access to sensitive device data", "high", "Explain purpose, scope, choice, and settings recovery"],
  ["validation_error", "Submitted information fails a known field requirement", "medium", "Bind the error to the field and explain correction"],
  ["empty_state", "No items exist yet and the user can create the first one", "low", "Explain the state and available first action"],
  ["service_interruption", "A temporary outage blocks completion and timing is unknown", "high", "Represent uncertainty and preserve completed work"],
  ["automated_assistant", "An automated assistant can explain but cannot change the account", "medium", "Disclose automation, limits, and human handoff"],
  ["navigation_destination", "Several entry points lead to the same account-security destination", "medium", "Use one governed destination promise"],
  ["successful_update", "A requested profile change completed successfully", "low", "Confirm the completed result without extra claims"],
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

function candidateText(situation, surface, variant) {
  const state = situation[1];
  const action = situation[3];
  if (variant.defect === "unsupported_certainty") return `Everything is complete. ${action}.`;
  if (variant.defect === "unclear_action_or_object") return "Something happened. Continue.";
  if (variant.defect === "material_consequence_omitted") return `${action}.`;
  if (variant.defect === "user_blame") return `You did this incorrectly. ${action}.`;
  if (variant.defect === "poor_hierarchy_and_economy") return `System operational information: ${state}. Please carefully review all available interface information before determining whether to proceed with the applicable workflow. ${action}.`;
  if (variant.defect === "unsupported_urgency_or_pressure") return `Act now—don't miss out. ${action}.`;
  const prefix = variant.id === "warm_supportive" ? "We can help. " : variant.id === "formal_serious" ? "Important: " : "";
  return `${prefix}${state}. ${action}.`;
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
              surface: surface[0],
              surface_context: surface[1],
              channel: surface[2],
              source_locale: "en-US",
              target_locale: locale,
              direction: locale === "ar-SA" || locale === "he-IL" ? "rtl" : "ltr",
            },
            candidate: {
              variant: variant.id,
              text: candidateText(situation, surface, variant),
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
