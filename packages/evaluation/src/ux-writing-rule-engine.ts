import { canonicalJson, sha256Canonical } from "@contentmd/core";

export type UxWritingFactValue = string | number | boolean | null | string[];
export type UxWritingFacts = Readonly<Record<string, UxWritingFactValue>>;
export type UxWritingRuleClassification = "hard" | "advisory";
export type UxWritingRuleReviewType = "deterministic" | "specialist" | "research" | "human_judgment" | "preference";

export interface UxWritingRuleCondition {
  fact_path: string;
  operator: "exists" | "equals" | "not_equals" | "in" | "contains" | "matches";
  value?: UxWritingFactValue;
}

export interface UxWritingDeclarativeRule {
  rule_id: string;
  rule_version: "0.1.0";
  title: string;
  classification: UxWritingRuleClassification;
  dimension: string;
  review_type: UxWritingRuleReviewType;
  applies_when: UxWritingRuleCondition[];
  assertion: UxWritingRuleCondition;
  failure_status: "fail" | "unknown";
  reason: string;
  consequence: string;
  repair: string;
  required_fact_paths: string[];
  source_refs: string[];
  fixture_refs: string[];
  override_policy: "core_immutable" | "project_may_suppress_advisory";
}

export interface UxWritingRulePack {
  contract_version: "contentmd.ux-writing-rule-pack/0.1.0";
  pack_id: string;
  pack_version: number;
  layer: "core" | "project";
  status: "proposed" | "approved" | "retired";
  scope: {
    surfaces: string[];
    channels: string[];
    locales: string[];
    risk_levels: Array<"low" | "medium" | "high" | "critical">;
  };
  rules: UxWritingDeclarativeRule[];
  suppressed_rule_ids: string[];
  supersedes_pack_ref: string | null;
  approval_refs: string[];
  authority_effect: "none";
}

export interface UxWritingRuleFinding {
  finding_id: string;
  rule_id: string;
  classification: UxWritingRuleClassification;
  dimension: string;
  status: "fail" | "unknown";
  review_type: UxWritingRuleReviewType;
  reason: string;
  consequence: string;
  repair: string;
  evidence_refs: string[];
}

export interface UxWritingRuleEvaluation {
  contract_version: "contentmd.ux-writing-rule-evaluation/0.1.0";
  input_digest: string;
  rule_pack_digests: string[];
  applicable_rule_ids: string[];
  findings: UxWritingRuleFinding[];
  hard_plane_status: "pass" | "fail" | "unknown";
  advisory_status: "pass" | "findings_present" | "not_evaluated";
  recommended_disposition: "abstain" | "escalate" | "revise" | "human_review" | "bounded_approval" | "reject";
  evaluation_digest: string;
}

const FACT_PATH = /^[a-z][a-z0-9_]*(?:\.[a-z][a-z0-9_]*)*$/u;
const RULE_ID = /^uxw\.[a-z0-9_.-]+$/u;

function invalid(reason: string): never {
  throw new TypeError(`ux_writing_rule_invalid:${reason}`);
}

function uniqueSorted(values: readonly string[], field: string): string[] {
  if (!Array.isArray(values) || values.some((value) => typeof value !== "string" || value.length === 0)) invalid(field);
  return [...new Set(values)].sort((a, b) => Buffer.compare(Buffer.from(a), Buffer.from(b)));
}

function validateCondition(condition: UxWritingRuleCondition, field: string): void {
  if (condition === null || typeof condition !== "object" || !FACT_PATH.test(condition.fact_path)) invalid(field);
  if (!["exists", "equals", "not_equals", "in", "contains", "matches"].includes(condition.operator)) invalid(field);
  if (condition.operator === "exists") {
    if (Object.hasOwn(condition, "value")) invalid(`${field}.value`);
  } else if (!Object.hasOwn(condition, "value")) invalid(`${field}.value`);
  if (condition.operator === "matches") {
    if (typeof condition.value !== "string" || condition.value.length > 128 || /\(\?|\\[1-9]/u.test(condition.value)) {
      invalid(`${field}.value`);
    }
    try { new RegExp(condition.value, "u"); } catch { invalid(`${field}.value`); }
  }
}

export function validateUxWritingRulePack(pack: UxWritingRulePack): UxWritingRulePack {
  if (pack.contract_version !== "contentmd.ux-writing-rule-pack/0.1.0"
    || !/^uxw-pack\.[a-z0-9_.-]+$/u.test(pack.pack_id)
    || !Number.isSafeInteger(pack.pack_version) || pack.pack_version < 1
    || !["core", "project"].includes(pack.layer)
    || !["proposed", "approved", "retired"].includes(pack.status)
    || pack.authority_effect !== "none"
    || !Array.isArray(pack.rules) || pack.rules.length === 0) invalid("pack");
  uniqueSorted(pack.scope.surfaces, "scope.surfaces");
  uniqueSorted(pack.scope.channels, "scope.channels");
  uniqueSorted(pack.scope.locales, "scope.locales");
  uniqueSorted(pack.suppressed_rule_ids, "suppressed_rule_ids");
  uniqueSorted(pack.approval_refs, "approval_refs");
  if (pack.layer === "project" && pack.status === "approved" && pack.approval_refs.length === 0) invalid("approval_refs");
  const ids = new Set<string>();
  for (const rule of pack.rules) {
    if (!RULE_ID.test(rule.rule_id) || ids.has(rule.rule_id) || rule.rule_version !== "0.1.0") invalid("rules.rule_id");
    ids.add(rule.rule_id);
    if (rule.classification === "hard" && rule.override_policy !== "core_immutable") invalid(`${rule.rule_id}.override_policy`);
    if (rule.classification === "advisory" && rule.override_policy !== "project_may_suppress_advisory") invalid(`${rule.rule_id}.override_policy`);
    for (const [index, condition] of rule.applies_when.entries()) validateCondition(condition, `${rule.rule_id}.applies_when[${index}]`);
    validateCondition(rule.assertion, `${rule.rule_id}.assertion`);
    uniqueSorted(rule.required_fact_paths, `${rule.rule_id}.required_fact_paths`);
    uniqueSorted(rule.source_refs, `${rule.rule_id}.source_refs`);
    uniqueSorted(rule.fixture_refs, `${rule.rule_id}.fixture_refs`);
    if (rule.required_fact_paths.length === 0 || rule.source_refs.length === 0 || rule.fixture_refs.length === 0) invalid(rule.rule_id);
  }
  return pack;
}

export function resolveUxWritingRulePacks(
  corePacks: readonly UxWritingRulePack[],
  projectPacks: readonly UxWritingRulePack[],
): UxWritingRulePack[] {
  const core = corePacks.map(validateUxWritingRulePack).filter((pack) => pack.layer === "core" && pack.status === "approved");
  if (core.length !== corePacks.length) invalid("core_pack_eligibility");
  const project = projectPacks.map(validateUxWritingRulePack).filter((pack) => pack.layer === "project" && pack.status === "approved");
  if (project.length !== projectPacks.length) invalid("project_pack_eligibility");
  const coreRules = new Map(core.flatMap((pack) => pack.rules.map((rule) => [rule.rule_id, rule] as const)));
  const projectRuleIds = new Set<string>();
  for (const pack of project) {
    for (const rule of pack.rules) {
      if (coreRules.has(rule.rule_id) || projectRuleIds.has(rule.rule_id)) invalid(`project_rule_collision:${rule.rule_id}`);
      projectRuleIds.add(rule.rule_id);
    }
    for (const ruleId of pack.suppressed_rule_ids) {
      const target = coreRules.get(ruleId);
      if (target === undefined || target.classification !== "advisory" || target.override_policy !== "project_may_suppress_advisory") {
        invalid(`suppression_forbidden:${ruleId}`);
      }
    }
  }
  return [...core, ...project].sort((a, b) => a.pack_id.localeCompare(b.pack_id) || a.pack_version - b.pack_version);
}

type Tri = true | false | "unknown";

function conditionResult(condition: UxWritingRuleCondition, facts: UxWritingFacts): Tri {
  const present = Object.hasOwn(facts, condition.fact_path) && facts[condition.fact_path] !== null;
  if (condition.operator === "exists") return present;
  if (!present) return "unknown";
  const actual = facts[condition.fact_path];
  const expected = condition.value;
  if (condition.operator === "equals") return canonicalJson(actual) === canonicalJson(expected);
  if (condition.operator === "not_equals") return canonicalJson(actual) !== canonicalJson(expected);
  if (condition.operator === "in") return Array.isArray(expected) && expected.some((item) => canonicalJson(item) === canonicalJson(actual));
  if (condition.operator === "contains") {
    if (Array.isArray(actual)) return typeof expected === "string" && actual.includes(expected);
    return typeof actual === "string" && typeof expected === "string" && actual.includes(expected);
  }
  return typeof actual === "string" && typeof expected === "string" && new RegExp(expected, "u").test(actual);
}

function finding(rule: UxWritingDeclarativeRule, status: "fail" | "unknown", evidenceRefs: string[]): UxWritingRuleFinding {
  const preimage = {
    rule_id: rule.rule_id,
    rule_version: rule.rule_version,
    status,
    evidence_refs: evidenceRefs,
  };
  return {
    finding_id: `uxwfinding.${sha256Canonical(preimage).slice(0, 32)}`,
    rule_id: rule.rule_id,
    classification: rule.classification,
    dimension: rule.dimension,
    status,
    review_type: rule.review_type,
    reason: rule.reason,
    consequence: rule.consequence,
    repair: rule.repair,
    evidence_refs: evidenceRefs,
  };
}

export function evaluateUxWritingRules(input: {
  facts: UxWritingFacts;
  evidence_refs: string[];
  core_packs: UxWritingRulePack[];
  project_packs?: UxWritingRulePack[];
}): UxWritingRuleEvaluation {
  const packs = resolveUxWritingRulePacks(input.core_packs, input.project_packs ?? []);
  const suppressed = new Set(packs.filter((pack) => pack.layer === "project").flatMap((pack) => pack.suppressed_rule_ids));
  const evidenceRefs = uniqueSorted(input.evidence_refs, "evidence_refs");
  const rules = packs.flatMap((pack) => pack.rules)
    .filter((rule) => !suppressed.has(rule.rule_id))
    .sort((a, b) => a.rule_id.localeCompare(b.rule_id));
  const findings: UxWritingRuleFinding[] = [];
  const applicableRuleIds: string[] = [];
  for (const rule of rules) {
    const applicability = rule.applies_when.map((condition) => conditionResult(condition, input.facts));
    if (applicability.includes(false)) continue;
    applicableRuleIds.push(rule.rule_id);
    const missing = rule.required_fact_paths.some((path) => !Object.hasOwn(input.facts, path) || input.facts[path] === null);
    const assertion = conditionResult(rule.assertion, input.facts);
    if (missing || applicability.includes("unknown") || assertion === "unknown") findings.push(finding(rule, "unknown", evidenceRefs));
    else if (!assertion) findings.push(finding(rule, rule.failure_status, evidenceRefs));
  }
  findings.sort((a, b) => a.rule_id.localeCompare(b.rule_id) || a.finding_id.localeCompare(b.finding_id));
  const hard = findings.filter((item) => item.classification === "hard");
  const hardStatus: UxWritingRuleEvaluation["hard_plane_status"] = hard.some((item) => item.status === "fail") ? "fail" : hard.length > 0 ? "unknown" : "pass";
  const advisory = findings.filter((item) => item.classification === "advisory");
  const specialist = hard.some((item) => item.review_type === "specialist");
  const disposition: UxWritingRuleEvaluation["recommended_disposition"] = hardStatus === "fail" ? "revise" : specialist ? "escalate" : hardStatus === "unknown" ? "abstain" : "bounded_approval";
  const packDigests = packs.map((pack) => sha256Canonical(pack)).sort();
  const preimage = {
    contract_version: "contentmd.ux-writing-rule-evaluation/0.1.0" as const,
    input_digest: sha256Canonical({ facts: input.facts, evidence_refs: evidenceRefs }),
    rule_pack_digests: packDigests,
    applicable_rule_ids: applicableRuleIds,
    findings,
    hard_plane_status: hardStatus,
    advisory_status: hardStatus === "pass" ? (advisory.length > 0 ? "findings_present" as const : "pass" as const) : "not_evaluated" as const,
    recommended_disposition: disposition,
  };
  return { ...preimage, evaluation_digest: sha256Canonical(preimage) };
}
