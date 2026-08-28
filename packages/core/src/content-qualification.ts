import { sha256Canonical } from "./canonical-json.js";

export type ContentQualificationState = "qualified" | "uncertain" | "rejected";

export type ContentPracticeDomain =
  | "product_ux"
  | "marketing"
  | "brand"
  | "transactional"
  | "support"
  | "instructional"
  | "policy_legal"
  | "technical"
  | "editorial"
  | "internal_operational";

export type ContentFunction =
  | "orient"
  | "identify"
  | "explain"
  | "instruct"
  | "prompt_action"
  | "support_choice"
  | "set_expectation"
  | "communicate_consequence"
  | "request_consent"
  | "communicate_status"
  | "confirm_outcome"
  | "warn"
  | "identify_error"
  | "enable_recovery"
  | "establish_trust"
  | "persuade_convert"
  | "retain_reengage"
  | "teach"
  | "provide_reference";

export type ContentFormat =
  | "accessible_name"
  | "alt_text"
  | "button"
  | "confirmation"
  | "description"
  | "error"
  | "field_label"
  | "heading"
  | "helper_text"
  | "instruction"
  | "link"
  | "metadata"
  | "navigation_label"
  | "notification"
  | "placeholder"
  | "status"
  | "text"
  | "title"
  | "tooltip"
  | "warning";

export type ContentSourceLayer =
  | "product"
  | "api"
  | "documentation"
  | "marketing"
  | "support"
  | "test"
  | "fixture"
  | "demo"
  | "generated"
  | "dependency"
  | "unknown";

export interface ContentOccurrenceForQualification {
  occurrence_id: string;
  source_artifact: string;
  syntax_kind: string;
  expression_payload: string;
  channel: string;
  modality: string;
  component: string | null;
  route: string | null;
  semantic_context: string;
  line?: number;
  column?: number;
  end_line?: number;
  end_column?: number;
}

export interface QualifiedContentUnit {
  qualification_id: string;
  occurrence_id: string;
  source_artifact: string;
  component: string | null;
  route: string | null;
  semantic_context: string;
  channel: string;
  modality: string;
  syntax_kind: string;
  line: number | null;
  column: number | null;
  end_line: number | null;
  end_column: number | null;
  expression: string;
  scale: "primitive";
  practice_domains: ContentPracticeDomain[];
  functions: ContentFunction[];
  formats: ContentFormat[];
  source_layer: ContentSourceLayer;
  qualification: ContentQualificationState;
  confidence: "high" | "medium" | "low";
  classification_reasons: string[];
  rejection_reason: string | null;
  microcopy: boolean;
  authority_effect: "none";
}

export interface ContentQualificationSummary {
  occurrence_count: number;
  qualified_count: number;
  uncertain_count: number;
  rejected_count: number;
  microcopy_count: number;
  by_practice_domain: Partial<Record<ContentPracticeDomain, number>>;
  by_function: Partial<Record<ContentFunction, number>>;
  by_source_layer: Partial<Record<ContentSourceLayer, number>>;
}

const CONNECTOR_ONLY = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "of", "on", "or", "the", "to", "with",
]);

function uniqueSorted<T extends string>(values: T[]): T[] {
  return [...new Set(values)].sort();
}

function sourceLayer(path: string, channel: string): ContentSourceLayer {
  const normalized = path.toLowerCase().replaceAll("\\", "/");
  if (/(^|\/)(node_modules|vendor)(\/|$)/u.test(normalized)) return "dependency";
  if (/(^|\/)(dist|build|coverage|generated|__generated__)(\/|$)/u.test(normalized)) return "generated";
  if (/(^|\/)(__tests__|tests?|specs?)(\/|$)/u.test(normalized) || /\.(test|spec)\.[^.]+$/u.test(normalized)) return "test";
  if (/(^|\/)(fixtures?|mocks?|__fixtures__)(\/|$)/u.test(normalized)) return "fixture";
  if (/(^|\/)(storybook|stories|examples?|demos?|playground|shadcn-studio)(\/|$)/u.test(normalized) || /\.stories\.[^.]+$/u.test(normalized)) return "demo";
  if (/(^|\/)app\/design-system(\/|$)/u.test(normalized)) return "demo";
  if (/(^|\/)components\/design-system\/.*(directions|prototype)/u.test(normalized)) return "demo";
  if (/(^|\/)(docs?|documentation)(\/|$)/u.test(normalized) || /(^|\/)(readme|content|product|design)\.md$/u.test(normalized)) return "documentation";
  if (/(^|\/)(marketing|campaigns?|landing)(\/|$)/u.test(normalized)) return "marketing";
  if (/(^|\/)(help|support)(\/|$)/u.test(normalized)) return "support";
  if (channel === "api" || /(^|\/)api(\/|$)/u.test(normalized)) return "api";
  return "product";
}

function formatFor(input: ContentOccurrenceForQualification): ContentFormat[] {
  const context = input.semantic_context.toLowerCase();
  const payload = input.expression_payload.toLowerCase();
  const formats: ContentFormat[] = [];
  if (input.modality === "metadata" || input.syntax_kind.includes("metadata")) formats.push("metadata");
  if (/attribute:aria-label|attribute:aria-labelledby/u.test(context)) formats.push("accessible_name");
  if (/attribute:alt/u.test(context)) formats.push("alt_text");
  if (/attribute:placeholder/u.test(context)) formats.push("placeholder");
  if (/attribute:title/u.test(context)) formats.push("tooltip");
  if (/property:title/u.test(context) || input.syntax_kind === "html_title") formats.push("title");
  if (/element:h[1-6]\b|property:heading/u.test(context)) formats.push("heading");
  if (/element:button\b|property:(action|cta)|component:.*button/u.test(context)) formats.push("button");
  if (/element:a\b|component:.*link/u.test(context)) formats.push("link");
  if (input.route !== null && (
    input.syntax_kind === "route_declaration"
    || /property:(label|navigation|nav_label)|element:(a|nav)\b/u.test(context)
  )) formats.push("navigation_label");
  if (/property:(label|name)|element:(label|th|dt)\b/u.test(context)) formats.push("field_label");
  if (/property:(description|body|tagline)|element:p\b/u.test(context)) formats.push("description");
  if (/property:(instruction|helper|hint|recovery)/u.test(context)) formats.push("instruction");
  if (/property:error/u.test(context) || /\b(error|failed|invalid|couldn['’]?t|cannot|can['’]?t|unable)\b/u.test(payload)) formats.push("error");
  if (/\b(warning|caution|careful|cannot be undone|can['’]?t be undone)\b/u.test(payload)) formats.push("warning");
  if (/\b(saved|complete|completed|success|confirmed|sent|updated)\b/u.test(payload)) formats.push("confirmation");
  if (/\b(loading|processing|pending|queued|progress|checking|fetching)\b/u.test(payload)) formats.push("status");
  return uniqueSorted(formats.length === 0 ? ["text"] : formats);
}

function functionsFor(expression: string, formats: ContentFormat[]): ContentFunction[] {
  const payload = expression.toLowerCase();
  const functions: ContentFunction[] = [];
  if (formats.some((format) => ["heading", "title", "navigation_label"].includes(format))) functions.push("orient");
  if (formats.some((format) => ["accessible_name", "alt_text", "field_label"].includes(format))) functions.push("identify");
  if (formats.some((format) => ["description", "helper_text", "metadata", "text", "tooltip"].includes(format))) functions.push("explain");
  if (formats.includes("instruction") || /\b(enter|select|choose|follow|use|required|must)\b/u.test(payload)) functions.push("instruct");
  if (formats.some((format) => ["button", "link", "navigation_label"].includes(format))) functions.push("prompt_action");
  if (/\b(option|recommended|compare|instead)\b/u.test(payload)) functions.push("support_choice");
  if (/\b(will|takes?|within|expected|next)\b/u.test(payload)) functions.push("set_expectation");
  if (/\b(delete|remove|permanent|cannot be undone|can['’]?t be undone|charge|cost)\b/u.test(payload)) functions.push("communicate_consequence");
  if (/\b(consent|permission|allow|agree|accept terms|cookies?)\b/u.test(payload)) functions.push("request_consent");
  if (formats.includes("status")) functions.push("communicate_status");
  if (formats.includes("confirmation")) functions.push("confirm_outcome");
  if (formats.includes("warning")) functions.push("warn");
  if (formats.includes("error")) functions.push("identify_error");
  if (/\b(try again|retry|go back|contact support|check|recover|reset|restore)\b/u.test(payload)) functions.push("enable_recovery");
  if (/\b(verified|secure|privacy|source|last updated|accurate)\b/u.test(payload)) functions.push("establish_trust");
  if (/\b(buy|upgrade|subscribe|start free|sign up|get started)\b/u.test(payload)) functions.push("persuade_convert");
  if (/\b(come back|welcome back|renew|continue)\b/u.test(payload)) functions.push("retain_reengage");
  return uniqueSorted(functions.length === 0 ? ["explain"] : functions);
}

function domainsFor(
  input: ContentOccurrenceForQualification,
  layer: ContentSourceLayer,
  functions: ContentFunction[],
): ContentPracticeDomain[] {
  const searchable = `${input.expression_payload} ${input.semantic_context} ${input.source_artifact}`.toLowerCase();
  const domains: ContentPracticeDomain[] = [];
  if (layer === "product" && input.channel === "web") domains.push("product_ux");
  if (layer === "marketing" || functions.includes("persuade_convert")) domains.push("marketing");
  if (/\b(brand|tagline|value proposition|mission|voice)\b/u.test(searchable)) domains.push("brand");
  if (/(payment|checkout|order|booking|invoice|account|security|verification|receipt)/u.test(searchable)) domains.push("transactional");
  if (layer === "support" || functions.includes("enable_recovery")) domains.push("support");
  if (functions.includes("instruct") || functions.includes("teach")) domains.push("instructional");
  if (/\b(privacy|policy|terms|legal|consent|disclosure|rights)\b/u.test(searchable)) domains.push("policy_legal");
  if (layer === "api" || /\b(api|developer|sdk|webhook|endpoint)\b/u.test(searchable)) domains.push("technical");
  if (/\b(article|editorial|news|story|blog)\b/u.test(searchable)) domains.push("editorial");
  if (/\b(admin|moderation|operator|internal)\b/u.test(searchable)) domains.push("internal_operational");
  return uniqueSorted(domains.length === 0 ? ["product_ux"] : domains);
}

export function qualifyContentOccurrence(input: ContentOccurrenceForQualification): QualifiedContentUnit {
  const expression = input.expression_payload.trim().replace(/\s+/gu, " ");
  const layer = sourceLayer(input.source_artifact, input.channel);
  const formats = formatFor(input);
  const standaloneSemanticFormat = formats.some((format) => [
    "accessible_name", "alt_text", "button", "field_label", "heading", "navigation_label", "placeholder", "title", "tooltip",
  ].includes(format));
  const reasons: string[] = [`source_layer:${layer}`];
  let qualification: ContentQualificationState = "qualified";
  let confidence: QualifiedContentUnit["confidence"] = "medium";
  let rejectionReason: string | null = null;

  if (expression.length === 0) {
    qualification = "rejected";
    confidence = "high";
    rejectionReason = "empty_expression";
  } else if (!/[\p{L}\p{N}]/u.test(expression)) {
    qualification = "rejected";
    confidence = "high";
    rejectionReason = "punctuation_or_symbol_only";
  } else if (!/\p{L}/u.test(expression)) {
    qualification = "rejected";
    confidence = "high";
    rejectionReason = "numeric_only";
  } else if (["dependency", "generated", "test", "fixture", "demo"].includes(layer)) {
    qualification = "rejected";
    confidence = "high";
    rejectionReason = `excluded_source_layer:${layer}`;
  } else if (CONNECTOR_ONLY.has(expression.toLowerCase()) && !standaloneSemanticFormat) {
    qualification = "uncertain";
    confidence = "high";
    rejectionReason = "isolated_connector_fragment";
  } else if (expression.length === 1) {
    qualification = "uncertain";
    confidence = "medium";
    rejectionReason = "single_character_fragment";
  } else {
    reasons.push("meaningful_lexical_content", `content_bearing_context:${input.semantic_context}`);
  }

  const functions = functionsFor(expression, formats);
  const practiceDomains = domainsFor(input, layer, functions);
  const microcopy = qualification === "qualified"
    && layer === "product"
    && practiceDomains.includes("product_ux")
    && input.modality !== "metadata"
    && (formats.some((format) => !["description", "metadata", "text", "title"].includes(format))
      || expression.length <= 160);
  if (microcopy) reasons.push("interaction_bound_small_content_unit");
  if (rejectionReason !== null) reasons.push(rejectionReason);

  const preimage = {
    occurrence_id: input.occurrence_id,
    source_artifact: input.source_artifact,
    component: input.component,
    route: input.route,
    semantic_context: input.semantic_context,
    channel: input.channel,
    modality: input.modality,
    syntax_kind: input.syntax_kind,
    line: input.line ?? null,
    column: input.column ?? null,
    end_line: input.end_line ?? null,
    end_column: input.end_column ?? null,
    expression,
    scale: "primitive" as const,
    practice_domains: practiceDomains,
    functions,
    formats,
    source_layer: layer,
    qualification,
    confidence,
    classification_reasons: uniqueSorted(reasons),
    rejection_reason: rejectionReason,
    microcopy,
    authority_effect: "none" as const,
  };
  return {
    qualification_id: `qualification.${sha256Canonical(preimage).slice(0, 32)}`,
    ...preimage,
  };
}

function increment<T extends string>(record: Partial<Record<T, number>>, key: T): void {
  record[key] = (record[key] ?? 0) + 1;
}

export function summarizeContentQualifications(units: QualifiedContentUnit[]): ContentQualificationSummary {
  const byPracticeDomain: Partial<Record<ContentPracticeDomain, number>> = {};
  const byFunction: Partial<Record<ContentFunction, number>> = {};
  const bySourceLayer: Partial<Record<ContentSourceLayer, number>> = {};
  for (const unit of units) {
    if (unit.qualification === "qualified") {
      for (const domain of unit.practice_domains) increment(byPracticeDomain, domain);
      for (const contentFunction of unit.functions) increment(byFunction, contentFunction);
    }
    increment(bySourceLayer, unit.source_layer);
  }
  return {
    occurrence_count: units.length,
    qualified_count: units.filter((unit) => unit.qualification === "qualified").length,
    uncertain_count: units.filter((unit) => unit.qualification === "uncertain").length,
    rejected_count: units.filter((unit) => unit.qualification === "rejected").length,
    microcopy_count: units.filter((unit) => unit.microcopy).length,
    by_practice_domain: byPracticeDomain,
    by_function: byFunction,
    by_source_layer: bySourceLayer,
  };
}

export function qualifyContentOccurrences(
  occurrences: ContentOccurrenceForQualification[],
): { units: QualifiedContentUnit[]; summary: ContentQualificationSummary } {
  const units = [...occurrences]
    .sort((left, right) => left.occurrence_id.localeCompare(right.occurrence_id))
    .map(qualifyContentOccurrence);
  return { units, summary: summarizeContentQualifications(units) };
}
