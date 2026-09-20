import { sha256Canonical } from "@contentmd/core";

export type UxWritingUseCase =
  | "informational_status"
  | "action_prompt"
  | "action_success"
  | "action_failure"
  | "action_unknown"
  | "validation_error"
  | "empty_state";

/** @deprecated Use UxWritingCoordinateInput and classifyUxWritingCoordinate(). */
export interface UseCaseInput {
  text: string;
  surface: string;
  state: string;
  action?: string | null;
  outcome?: "confirmed" | "failed" | "unknown" | "not_applicable";
  hasRecovery?: boolean;
}

/** @deprecated Use UxWritingCoordinateClassification. */
export interface UseCaseClassification {
  contract_version: "contentmd.ux-writing-usecase-classification/0.1.0";
  classification_id: string;
  use_case: UxWritingUseCase | null;
  confidence: "exact" | "ambiguous" | "unclassified";
  matched_rules: string[];
  abstain_reason: "ambiguous_match" | "no_match" | "missing_state" | null;
}

type Rule = { id: string; matches: (input: UseCaseInput) => boolean; use_case: UxWritingUseCase };

const RULES: readonly Rule[] = [
  { id: "state.empty", use_case: "empty_state", matches: (i) => /empty|no[_ -]?items|zero/i.test(i.state) },
  { id: "state.validation", use_case: "validation_error", matches: (i) => /invalid|validation|error/i.test(i.state) && !i.action },
  { id: "outcome.confirmed", use_case: "action_success", matches: (i) => Boolean(i.action) && i.outcome === "confirmed" },
  { id: "outcome.failed", use_case: "action_failure", matches: (i) => Boolean(i.action) && i.outcome === "failed" },
  { id: "outcome.unknown", use_case: "action_unknown", matches: (i) => Boolean(i.action) && i.outcome === "unknown" },
  { id: "action.available", use_case: "action_prompt", matches: (i) => Boolean(i.action) && /ready|available|idle/i.test(i.state) },
  { id: "state.status", use_case: "informational_status", matches: (i) => !i.action && /status|loading|progress|complete/i.test(i.state) },
];

/** @deprecated Compatibility projection only; use classifyUxWritingCoordinate(). */
export function classifyUseCase(input: UseCaseInput): UseCaseClassification {
  const normalized: UseCaseInput = { ...input, text: input.text.trim(), surface: input.surface.trim(), state: input.state.trim() };
  const matches = RULES.filter((rule) => rule.matches(normalized));
  const missingState = normalized.state.length === 0;
  const matchedRule = matches[0];
  const useCase: UseCaseClassification["use_case"] = !missingState && matches.length === 1 && matchedRule !== undefined ? matchedRule.use_case : null;
  const confidence: UseCaseClassification["confidence"] = missingState ? "unclassified" : matches.length === 1 ? "exact" : matches.length > 1 ? "ambiguous" : "unclassified";
  const abstainReason: UseCaseClassification["abstain_reason"] = missingState ? "missing_state" : matches.length > 1 ? "ambiguous_match" : matches.length === 0 ? "no_match" : null;
  const preimage = { input: normalized, use_case: useCase, confidence, matched_rules: matches.map((m) => m.id).sort(), abstain_reason: abstainReason };
  const digest = sha256Canonical(preimage);
  return { contract_version: "contentmd.ux-writing-usecase-classification/0.1.0", classification_id: `uxwusecase.${digest.slice(0, 32)}`, ...preimage };
}

export interface CopyTemplate { template_id: string; use_case: UxWritingUseCase; required_facts: string[]; render: (facts: Record<string, string>) => string; }
export interface CopySelection { template_id: string | null; text: string | null; disposition: "selected" | "abstain"; reason: "classification_required" | "required_fact_missing" | null; }

/** @deprecated Use selectRouteTemplate() after resolveUxWritingPolicy(). */
export function selectCopyTemplate(classification: UseCaseClassification, facts: Record<string, string>, templates: readonly CopyTemplate[]): CopySelection {
  if (classification.confidence !== "exact" || classification.use_case === null) return { template_id: null, text: null, disposition: "abstain", reason: "classification_required" };
  const eligible = templates.filter((t) => t.use_case === classification.use_case && t.required_facts.every((key) => typeof facts[key] === "string" && facts[key].length > 0));
  if (eligible.length !== 1) return { template_id: null, text: null, disposition: "abstain", reason: "required_fact_missing" };
  const template = eligible[0];
  if (template === undefined) return { template_id: null, text: null, disposition: "abstain", reason: "required_fact_missing" };
  return { template_id: template.template_id, text: template.render(facts), disposition: "selected", reason: null };
}
