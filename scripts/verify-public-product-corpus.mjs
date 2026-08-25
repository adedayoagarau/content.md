#!/usr/bin/env node

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import {
  verifyPublicProductCorpusV2,
} from "../packages/research/dist/index.js";
import { createHash } from "node:crypto";

const DEFAULT_TARGETS = Object.freeze({
  companies: 5_000,
  products: 20_000,
  industries: 250,
  directStatesPerProduct: 5,
});

function sha256CanonicalAdapter(value) {
  const canonical = `${JSON.stringify(value, Object.keys(value).sort())}\n`;
  return createHash("sha256").update(canonical).digest("hex");
}

function splitExactLines(bytes, location) {
  if (bytes.length === 0 || bytes.at(-1) !== 0x0a) throw new Error(`${location}: JSONL must be nonempty and LF-terminated`);
  const lines = [];
  let start = 0;
  for (let index = 0; index < bytes.length; index += 1) {
    if (bytes[index] !== 0x0a) continue;
    if (index === start) throw new Error(`${location}: blank JSONL line`);
    lines.push(bytes.slice(start, index + 1));
    start = index + 1;
  }
  return lines;
}

async function readOptionalJson(file, fallback) {
  try { return JSON.parse(await readFile(file, "utf8")); }
  catch (error) { if (error?.code === "ENOENT") return fallback; throw error; }
}

async function readOptionalJsonl(file) {
  try {
    const bytes = await readFile(file);
    return splitExactLines(bytes, file).map((line) => JSON.parse(new TextDecoder().decode(line)));
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

function emptyGovernance(asOf) {
  const preimage = {
    contract_version: "contentmd.public-product-review-governance/0.1.0",
    as_of: asOf,
    qualifications: [],
    qualification_replays: [],
    receipts: [],
  };
  return { ...preimage, governance_digest: sha256CanonicalAdapter(preimage) };
}

function normalizeAsOf(asOf) {
  return /^\d{4}-\d{2}-\d{2}$/u.test(asOf)
    ? `${asOf}T23:59:59.999-12:00`
    : asOf;
}

export async function readPublicProductCorpusV2Input({
  root,
  asOf,
  targets = DEFAULT_TARGETS,
  verificationMode = "official",
}) {
  const normalizedAsOf = normalizeAsOf(asOf);
  const entries = await readdir(root, { withFileTypes: true });
  const batchNames = entries
    .filter((entry) => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}-batch-\d+$/u.test(entry.name))
    .map((entry) => entry.name)
    .sort();
  const batches = [];
  for (const batchId of batchNames) {
    const batchRoot = path.join(root, batchId);
    const sourceBytes = await readFile(path.join(batchRoot, "sources.jsonl"));
    const observationBytes = await readFile(path.join(batchRoot, "observations.jsonl"));
    batches.push({
      batch_id: batchId,
      source_lines: splitExactLines(sourceBytes, `${batchId}/sources.jsonl`),
      observation_lines: splitExactLines(observationBytes, `${batchId}/observations.jsonl`),
    });
  }
  const governance = await readOptionalJson(
    path.join(root, "public-product-review-governance.json"),
    emptyGovernance(normalizedAsOf),
  );
  return {
    batches,
    industry_taxonomy_bytes: await readFile(path.join(root, "industry-taxonomy.json")),
    taxonomy: await readOptionalJson(path.join(root, "experience-taxonomy.json"), null),
    disposition_sets: await readOptionalJsonl(path.join(root, "evidence-disposition-sets.jsonl")),
    disposition_events: await readOptionalJsonl(path.join(root, "evidence-dispositions.jsonl")),
    review_governance: governance,
    as_of: normalizedAsOf,
    targets: {
      companies: targets.companies,
      products: targets.products,
      industries: targets.industries,
      direct_states_per_product: targets.directStatesPerProduct ?? targets.direct_states_per_product,
    },
    verification_mode: verificationMode,
  };
}

export async function verifyPublicProductCorpusV2FromDisk(options) {
  return verifyPublicProductCorpusV2(await readPublicProductCorpusV2Input(options));
}

export async function verifyPublicProductCorpusFromDisk(options) {
  if (options.contractVersion === "0.2.0") return verifyPublicProductCorpusV2FromDisk(options);
  const primary = await verifyPublicProductCorpus(options);
  return options.compareV2
    ? { primary, v2_diagnostic: await verifyPublicProductCorpusV2FromDisk(options) }
    : primary;
}

const SOURCE_CLASSES = new Set([
  "actual UI",
  "official content guidance",
  "official community",
]);

const EVIDENCE_STRENGTHS = new Set(["high", "medium", "low"]);

function productKey(value) {
  return `${value.company}\0${value.product_system}`;
}

function wordCount(value) {
  return value.trim() === "" ? 0 : value.trim().split(/\s+/u).length;
}

function isNonemptyText(value) {
  return typeof value === "string" && value.trim() !== "";
}

function isHttpsUrl(value) {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hash === "";
  } catch {
    return false;
  }
}

function compareUnicodeScalar(left, right) {
  const leftPoints = [...String(left)].map((value) => value.codePointAt(0));
  const rightPoints = [...String(right)].map((value) => value.codePointAt(0));
  const length = Math.min(leftPoints.length, rightPoints.length);
  for (let index = 0; index < length; index += 1) {
    if (leftPoints[index] !== rightPoints[index]) return leftPoints[index] - rightPoints[index];
  }
  return leftPoints.length - rightPoints.length;
}

function countBy(values, key) {
  const counts = new Map();
  for (const value of values) {
    const item = value[key];
    counts.set(item, (counts.get(item) ?? 0) + 1);
  }
  return [...counts.entries()].sort(([left], [right]) =>
    compareUnicodeScalar(left, right));
}

function duplicateValues(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([value, count]) => ({ value, count }))
    .sort((left, right) => compareUnicodeScalar(left.value, right.value));
}

async function readJsonLines(file) {
  const raw = await readFile(file, "utf8");
  if (raw === "" || !raw.endsWith("\n")) {
    throw new Error(`${file}: JSONL must be nonempty and LF-terminated`);
  }
  return raw.trimEnd().split("\n").map((line, index) => {
    try {
      return JSON.parse(line);
    } catch (error) {
      throw new Error(`${file}:${index + 1}: ${error.message}`);
    }
  });
}

function exactKeys(value, expected) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const keys = Object.keys(value).sort(compareUnicodeScalar);
  const wanted = [...expected].sort(compareUnicodeScalar);
  return keys.length === wanted.length && keys.every((key, index) => key === wanted[index]);
}

async function readIndustryTaxonomy(root) {
  const file = path.join(root, "industry-taxonomy.json");
  const raw = await readFile(file, "utf8");
  if (raw === "" || !raw.endsWith("\n")) {
    throw new Error("industry-taxonomy.json must be nonempty and LF-terminated");
  }
  const value = JSON.parse(raw);
  if (!exactKeys(value, ["authority_effect", "contract_version", "industries"])
    || value.contract_version !== "contentmd.public-product-industry-taxonomy/0.1.0"
    || value.authority_effect !== "none"
    || !Array.isArray(value.industries)
    || value.industries.length === 0) {
    throw new Error("industry taxonomy root is invalid");
  }
  const byAlias = new Map();
  const ids = new Set();
  let previousId = null;
  for (const [index, industry] of value.industries.entries()) {
    if (!exactKeys(industry, ["aliases", "industry_id", "name"])
      || !/^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/u.test(industry.industry_id ?? "")
      || !isNonemptyText(industry.name)
      || !Array.isArray(industry.aliases)
      || industry.aliases.length === 0
      || industry.aliases.some((alias) => !isNonemptyText(alias))) {
      throw new Error(`industry taxonomy entry ${index} is invalid`);
    }
    if (ids.has(industry.industry_id)
      || (previousId !== null && compareUnicodeScalar(previousId, industry.industry_id) >= 0)) {
      throw new Error("industry taxonomy IDs must be unique and scalar-sorted");
    }
    ids.add(industry.industry_id);
    previousId = industry.industry_id;
    let previousAlias = null;
    for (const alias of industry.aliases) {
      if (byAlias.has(alias)
        || (previousAlias !== null && compareUnicodeScalar(previousAlias, alias) >= 0)) {
        throw new Error("industry taxonomy aliases must be globally unique and scalar-sorted per industry");
      }
      byAlias.set(alias, industry.industry_id);
      previousAlias = alias;
    }
  }
  return { byAlias, industryCount: ids.size };
}

function addError(errors, code, location, detail) {
  errors.push({ code, location, detail });
}

function validateSource(source, location, asOfMs, errors) {
  const initialErrorCount = errors.length;
  for (const key of [
    "source_id", "company", "product_system", "industry", "source_url",
    "canonical_url", "accessed_at", "source_class", "title", "publisher",
    "access_method", "rights_boundary", "freshness",
  ]) {
    if (!isNonemptyText(source[key])) addError(errors, "source_shape", location, `${key} must be nonempty text`);
  }
  if (!isHttpsUrl(source.source_url) || !isHttpsUrl(source.canonical_url)) {
    addError(errors, "source_url", location, "source and canonical URLs must be fragment-free HTTPS URLs");
  }
  const accessedAtMs = Date.parse(source.accessed_at);
  if (!Number.isFinite(accessedAtMs)) {
    addError(errors, "source_timestamp", location, "accessed_at must be an RFC3339 timestamp");
  } else if (accessedAtMs > asOfMs) {
    addError(errors, "future_access", location, `${source.accessed_at} is later than the declared as-of time`);
  }
  if (!SOURCE_CLASSES.has(source.source_class)) {
    addError(errors, "source_class", location, `unsupported source_class ${JSON.stringify(source.source_class)}`);
  }
  if (source.rights_boundary !== "public page; evidence only") {
    addError(errors, "rights_boundary", location, "public sources must remain evidence-only");
  }
  return errors.length === initialErrorCount;
}

function validateObservation(observation, location, sourcesById, errors) {
  const initialErrorCount = errors.length;
  for (const key of [
    "observation_id", "source_id", "company", "product_system", "industry_stratum",
    "product_area", "journey", "event_state", "trigger", "user_goal",
    "system_status", "consequence_risk", "surface_channel", "locale_market",
    "content_slot_type", "exact_wording_span", "visible_action_recovery",
    "content_object_schema_hypothesis", "accessibility_localization_evidence",
    "provenance_freshness", "access_rights_boundary", "observed_vs_inferred",
    "evidence_strength", "authority_effect", "prompt_eligibility", "training_eligibility",
  ]) {
    if (!isNonemptyText(observation[key])) addError(errors, "observation_shape", location, `${key} must be nonempty text`);
  }
  if (!Array.isArray(observation.terminology_entities)
    || observation.terminology_entities.some((value) => !isNonemptyText(value))) {
    addError(errors, "observation_shape", location, "terminology_entities must be an array of nonempty strings");
  }
  if (wordCount(observation.exact_wording_span ?? "") > 25) {
    addError(errors, "quotation_limit", location, "exact_wording_span exceeds 25 words");
  }
  if (!EVIDENCE_STRENGTHS.has(observation.evidence_strength)) {
    addError(errors, "evidence_strength", location, "evidence_strength must be high, medium, or low");
  }
  if (observation.authority_effect !== "none"
    || observation.prompt_eligibility !== "never"
    || observation.training_eligibility !== "never"
    || observation.benchmark_eligibility !== false) {
    addError(errors, "authority_boundary", location, "public evidence cannot affect authority, prompts, training, or benchmarks");
  }
  const source = sourcesById.get(observation.source_id);
  if (source === undefined) {
    addError(errors, "missing_source", location, `unknown source_id ${JSON.stringify(observation.source_id)}`);
  } else if (source.company !== observation.company
    || source.product_system !== observation.product_system
    || source.industry !== observation.industry_stratum) {
    addError(errors, "source_projection", location, "company, product, and industry must exactly project the source record");
  }
  return errors.length === initialErrorCount;
}

export async function verifyPublicProductCorpus({
  root,
  asOf,
  targets = DEFAULT_TARGETS,
  includeQualifiedEvidence = false,
}) {
  if (!isNonemptyText(root)) throw new TypeError("root must be a nonempty path");
  const asOfMs = /^\d{4}-\d{2}-\d{2}$/u.test(asOf)
    ? Date.parse(`${asOf}T23:59:59.999-12:00`)
    : Date.parse(asOf);
  if (!Number.isFinite(asOfMs)) throw new TypeError("asOf must be an RFC3339 timestamp");
  for (const key of ["companies", "products", "industries", "directStatesPerProduct"]) {
    if (!Number.isSafeInteger(targets[key]) || targets[key] < 1) {
      throw new TypeError(`targets.${key} must be a positive safe integer`);
    }
  }

  const errors = [];
  let taxonomy = { byAlias: new Map(), industryCount: 0 };
  try {
    taxonomy = await readIndustryTaxonomy(root);
  } catch (error) {
    addError(errors, "taxonomy_invalid", "industry-taxonomy.json", error.message);
  }
  const entries = await readdir(root, { withFileTypes: true });
  const batchNames = entries
    .filter((entry) => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}-batch-\d+$/u.test(entry.name))
    .map((entry) => entry.name)
    .sort();
  const sources = [];
  const observations = [];

  for (const batch of batchNames) {
    const batchRoot = path.join(root, batch);
    let batchSources;
    let batchObservations;
    try {
      [batchSources, batchObservations] = await Promise.all([
        readJsonLines(path.join(batchRoot, "sources.jsonl")),
        readJsonLines(path.join(batchRoot, "observations.jsonl")),
      ]);
    } catch (error) {
      addError(errors, "incomplete_batch", batch, error.message);
      continue;
    }
    batchSources.forEach((value, index) => sources.push({ ...value, __location: `${batch}/sources.jsonl:${index + 1}` }));
    batchObservations.forEach((value, index) => observations.push({ ...value, __location: `${batch}/observations.jsonl:${index + 1}` }));
  }

  const validSources = new Set(sources.filter((source) => (
    validateSource(source, source.__location, asOfMs, errors)
  )));
  const duplicateSourceIds = duplicateValues(sources.map((source) => source.source_id));
  const duplicateCanonicalUrls = duplicateValues(sources.map((source) => source.canonical_url));
  const duplicateSourceIdSet = new Set(duplicateSourceIds.map((duplicate) => duplicate.value));
  const duplicateCanonicalUrlSet = new Set(duplicateCanonicalUrls.map((duplicate) => duplicate.value));
  for (const duplicate of duplicateSourceIds) {
    addError(errors, "duplicate_source_id", "corpus", `${JSON.stringify(duplicate.value)} occurs ${duplicate.count} times`);
  }
  for (const duplicate of duplicateCanonicalUrls) {
    addError(errors, "duplicate_canonical_url", "corpus", `${JSON.stringify(duplicate.value)} occurs ${duplicate.count} times`);
  }
  const qualifiedSources = sources.filter((source) => validSources.has(source)
    && !duplicateSourceIdSet.has(source.source_id)
    && !duplicateCanonicalUrlSet.has(source.canonical_url)
    && taxonomy.byAlias.has(source.industry));
  const qualifiedSourceSet = new Set(qualifiedSources);
  const sourcesById = new Map(sources.map((source) => [source.source_id, source]));
  const validObservations = new Set(observations.filter((observation) => (
    validateObservation(observation, observation.__location, sourcesById, errors)
  )));
  const duplicateObservationIds = duplicateValues(
    observations.map((observation) => observation.observation_id),
  );
  const duplicateObservationIdSet = new Set(
    duplicateObservationIds.map((duplicate) => duplicate.value),
  );
  for (const duplicate of duplicateObservationIds) {
    addError(errors, "duplicate_observation_id", "corpus", `${JSON.stringify(duplicate.value)} occurs ${duplicate.count} times`);
  }
  const qualifiedObservations = observations.filter((observation) => {
    const source = sourcesById.get(observation.source_id);
    return validObservations.has(observation)
      && !duplicateObservationIdSet.has(observation.observation_id)
      && source !== undefined
      && qualifiedSourceSet.has(source);
  });

  const companySet = new Set(qualifiedSources.map((source) => source.company));
  const productSet = new Set(qualifiedSources.map(productKey));
  const rawIndustries = new Set([
    ...sources.map((source) => source.industry),
    ...observations.map((observation) => observation.industry_stratum),
  ]);
  for (const industry of [...rawIndustries].sort(compareUnicodeScalar)) {
    if (!taxonomy.byAlias.has(industry)) {
      addError(errors, "unmapped_industry", "corpus", JSON.stringify(industry));
    }
  }
  const industrySet = new Set(qualifiedObservations
    .map((observation) => taxonomy.byAlias.get(observation.industry_stratum))
    .filter((industry) => industry !== undefined));
  const directStatesByProduct = new Map();
  for (const observation of qualifiedObservations) {
    const source = sourcesById.get(observation.source_id);
    if (observation.observed_vs_inferred !== "observed_ui"
      || source?.source_class !== "actual UI") continue;
    const key = productKey(observation);
    const states = directStatesByProduct.get(key) ?? new Set();
    states.add(`${observation.journey}\0${observation.event_state}`);
    directStatesByProduct.set(key, states);
  }

  for (const [code, actual, expected] of [
    ["company_target", companySet.size, targets.companies],
    ["product_target", productSet.size, targets.products],
    ["industry_target", industrySet.size, targets.industries],
  ]) {
    if (actual < expected) addError(errors, code, "corpus", `${actual} is below target ${expected}`);
  }
  let productsBelowDirectStateTarget = 0;
  for (const key of [...productSet].sort(compareUnicodeScalar)) {
    const count = directStatesByProduct.get(key)?.size ?? 0;
    if (count < targets.directStatesPerProduct) {
      productsBelowDirectStateTarget += 1;
      addError(errors, "insufficient_direct_states", key.replace("\0", " / "), `${count} is below target ${targets.directStatesPerProduct}`);
    }
  }
  const productsMeetingDirectStateTarget = productSet.size - productsBelowDirectStateTarget;

  errors.sort((left, right) => compareUnicodeScalar(
    `${left.code}\0${left.location}\0${left.detail}`,
    `${right.code}\0${right.location}\0${right.detail}`,
  ));
  const report = {
    status: errors.length === 0 ? "pass" : "fail",
    as_of: asOf,
    targets: { ...targets },
    counts: {
      batches: batchNames.length,
      sources: sources.length,
      observations: observations.length,
      qualified_sources: qualifiedSources.length,
      qualified_observations: qualifiedObservations.length,
      companies: companySet.size,
      products: productSet.size,
      industries: industrySet.size,
      direct_observed_states: [...directStatesByProduct.values()].reduce((sum, states) => sum + states.size, 0),
      products_with_direct_observations: directStatesByProduct.size,
      products_meeting_direct_state_target: productsMeetingDirectStateTarget,
    },
    gaps: {
      companies_remaining: Math.max(0, targets.companies - companySet.size),
      products_remaining: Math.max(0, targets.products - productSet.size),
      industries_remaining: Math.max(0, targets.industries - industrySet.size),
      products_below_direct_state_target: productsBelowDirectStateTarget,
    },
    distributions: {
      source_class: countBy(sources, "source_class"),
      evidence_strength: countBy(observations, "evidence_strength"),
      observation_class: countBy(observations, "observed_vs_inferred"),
      normalized_industry: countBy(observations.map((observation) => ({
        normalized_industry: taxonomy.byAlias.get(observation.industry_stratum) ?? "unmapped",
      })), "normalized_industry"),
    },
    errors,
  };
  if (includeQualifiedEvidence) {
    const stripLocation = ({ __location: _location, ...value }) => value;
    report.qualified_evidence = {
      sources: qualifiedSources
        .map((source) => ({
          ...stripLocation(source),
          normalized_industry_id: taxonomy.byAlias.get(source.industry),
        }))
        .sort((left, right) => compareUnicodeScalar(left.source_id, right.source_id)),
      observations: qualifiedObservations
        .map((observation) => {
          const source = sourcesById.get(observation.source_id);
          const key = productKey(observation);
          return {
            ...stripLocation(observation),
            normalized_industry_id: taxonomy.byAlias.get(observation.industry_stratum),
            direct_ui: observation.observed_vs_inferred === "observed_ui"
              && source?.source_class === "actual UI",
            product_meets_direct_state_target:
              (directStatesByProduct.get(key)?.size ?? 0) >= targets.directStatesPerProduct,
          };
        })
        .sort((left, right) => compareUnicodeScalar(
          left.observation_id,
          right.observation_id,
        )),
    };
  }
  return report;
}

function readPositiveInteger(argument, value) {
  if (!/^\d+$/u.test(value ?? "")) {
    throw new Error(`${argument} requires a positive integer`);
  }
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1) {
    throw new Error(`${argument} requires a positive safe integer`);
  }
  return parsed;
}

export function parseArguments(argv) {
  if (argv.length === 1 && argv[0] === "--help") return { help: true };
  let root = "research/09-experimental/public-product-corpus";
  let asOf;
  const targets = { ...DEFAULT_TARGETS };
  let contractVersion;
  let compareV2;
  let verificationMode;
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === "--root") root = argv[++index];
    else if (argv[index] === "--as-of") asOf = argv[++index];
    else if (argv[index] === "--min-companies") {
      targets.companies = readPositiveInteger(argv[index], argv[++index]);
    } else if (argv[index] === "--min-products") {
      targets.products = readPositiveInteger(argv[index], argv[++index]);
    } else if (argv[index] === "--min-industries") {
      targets.industries = readPositiveInteger(argv[index], argv[++index]);
    } else if (argv[index] === "--min-direct-states-per-product") {
      targets.directStatesPerProduct = readPositiveInteger(argv[index], argv[++index]);
    } else if (argv[index] === "--contract-version") {
      contractVersion = argv[++index];
      if (contractVersion !== "0.1.0" && contractVersion !== "0.2.0") throw new Error("--contract-version must be 0.1.0 or 0.2.0");
    } else if (argv[index] === "--compare-v2") compareV2 = true;
    else if (argv[index] === "--verification-mode") {
      verificationMode = argv[++index];
      if (verificationMode !== "development_fixture" && verificationMode !== "official") throw new Error("--verification-mode must be development_fixture or official");
    }
    else throw new Error(`Unknown argument: ${argv[index]}`);
  }
  if (asOf === undefined) throw new Error("--as-of is required for deterministic freshness verification");
  return {
    root, asOf, targets,
    ...(contractVersion === undefined ? {} : { contractVersion }),
    ...(compareV2 === undefined ? {} : { compareV2 }),
    ...(verificationMode === undefined ? {} : { verificationMode }),
  };
}

async function main() {
  try {
    const options = parseArguments(process.argv.slice(2));
    if (options.help) {
      process.stdout.write("Usage: verify-public-product-corpus --as-of <RFC3339|YYYY-MM-DD> [--contract-version 0.1.0|0.2.0] [--compare-v2] [--verification-mode development_fixture|official]\n");
      return;
    }
    const report = await verifyPublicProductCorpusFromDisk(options);
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    const primary = report.primary ?? report;
    if (primary.status !== "pass") process.exitCode = 1;
  } catch (error) {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    process.exitCode = 1;
  }
}

if (process.argv[1] !== undefined
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await main();
}
