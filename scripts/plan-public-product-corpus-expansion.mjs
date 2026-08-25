#!/usr/bin/env node

import { createHash } from "node:crypto";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

import { verifyPublicProductCorpus } from "./verify-public-product-corpus.mjs";
import { planPublicProductCorpusExpansionV2 } from "../packages/research/dist/index.js";
import { verifyPublicProductCorpusV2FromDisk } from "./verify-public-product-corpus.mjs";

export async function planPublicProductCorpusExpansionV2FromDisk(options) {
  const report = await verifyPublicProductCorpusV2FromDisk(options);
  return planPublicProductCorpusExpansionV2({
    report,
    maximum_assignments: options.maximumAssignments,
  });
}

const DEFAULT_TARGETS = Object.freeze({
  companies: 5_000,
  products: 20_000,
  industries: 250,
  directStatesPerProduct: 5,
});

function invalid(code) {
  throw new TypeError(`corpus_expansion_invalid:${code}`);
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

function canonicalJson(value) {
  if (value === null || typeof value === "boolean" || typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) invalid("canonical_value");
    return JSON.stringify(Object.is(value, -0) ? 0 : value);
  }
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (typeof value !== "object" || Object.getPrototypeOf(value) !== Object.prototype) {
    invalid("canonical_value");
  }
  return `{${Object.keys(value)
    .sort(compareUnicodeScalar)
    .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`)
    .join(",")}}`;
}

function sha256Canonical(value) {
  return createHash("sha256").update(`${canonicalJson(value)}\n`, "utf8").digest("hex");
}

function nonemptyScalarText(value, code) {
  if (typeof value !== "string" || value.trim() === "") invalid(code);
  for (const point of value) {
    const scalar = point.codePointAt(0);
    if (scalar >= 0xD800 && scalar <= 0xDFFF) invalid(code);
  }
  return value;
}

function assertTargets(targets) {
  for (const key of ["companies", "products", "industries", "directStatesPerProduct"]) {
    if (!Number.isSafeInteger(targets[key]) || targets[key] < 1) invalid("targets");
  }
}

function productKey(value) {
  return `${value.company}\0${value.product_system}`;
}

function assertUnique(values, field, code) {
  const seen = new Set();
  for (const value of values) {
    const identity = nonemptyScalarText(value[field], code);
    if (seen.has(identity)) invalid(code);
    seen.add(identity);
  }
}

function deepFreeze(value, seen = new Set()) {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const child of Object.values(value)) deepFreeze(child, seen);
  return Object.freeze(value);
}

export function planPublicProductCorpusExpansion({
  sources,
  observations,
  targets = DEFAULT_TARGETS,
}) {
  if (!Array.isArray(sources) || !Array.isArray(observations)) invalid("input_shape");
  assertTargets(targets);
  assertUnique(sources, "source_id", "duplicate_source_id");
  assertUnique(observations, "observation_id", "duplicate_observation_id");

  const sourceById = new Map();
  const products = new Map();
  for (const source of sources) {
    for (const field of [
      "source_id", "company", "product_system", "source_class", "normalized_industry_id",
    ]) {
      nonemptyScalarText(source[field], "source_shape");
    }
    sourceById.set(source.source_id, source);
    const key = productKey(source);
    const existing = products.get(key);
    if (existing !== undefined
      && existing.normalized_industry_id !== source.normalized_industry_id) {
      invalid("product_industry_projection");
    }
    const product = existing ?? {
      company: source.company,
      product_system: source.product_system,
      normalized_industry_id: source.normalized_industry_id,
      source_ids: new Set(),
    };
    product.source_ids.add(source.source_id);
    products.set(key, product);
  }

  const directStatesByProduct = new Map();
  for (const observation of observations) {
    for (const field of [
      "observation_id", "source_id", "company", "product_system",
      "normalized_industry_id", "journey", "event_state",
    ]) {
      nonemptyScalarText(observation[field], "observation_shape");
    }
    if (typeof observation.direct_ui !== "boolean") invalid("observation_shape");
    const source = sourceById.get(observation.source_id);
    if (source === undefined
      || source.company !== observation.company
      || source.product_system !== observation.product_system
      || source.normalized_industry_id !== observation.normalized_industry_id) {
      invalid("source_projection");
    }
    if (!observation.direct_ui || source.source_class !== "actual UI") continue;
    const key = productKey(observation);
    const states = directStatesByProduct.get(key) ?? new Map();
    const stateKey = `${observation.journey}\0${observation.event_state}`;
    states.set(stateKey, {
      journey: observation.journey,
      event_state: observation.event_state,
    });
    directStatesByProduct.set(key, states);
  }

  const industryStats = new Map();
  for (const [key, product] of products) {
    const stats = industryStats.get(product.normalized_industry_id) ?? {
      companies: new Set(),
      products: new Set(),
      directUiProducts: new Set(),
    };
    stats.companies.add(product.company);
    stats.products.add(key);
    if ((directStatesByProduct.get(key)?.size ?? 0) > 0) stats.directUiProducts.add(key);
    industryStats.set(product.normalized_industry_id, stats);
  }

  const stateCompletion = [];
  const directUiStart = [];
  let productsMeetingTarget = 0;
  for (const [key, product] of products) {
    const states = directStatesByProduct.get(key) ?? new Map();
    if (states.size >= targets.directStatesPerProduct) {
      productsMeetingTarget += 1;
      continue;
    }
    const common = {
      company: product.company,
      product_system: product.product_system,
      normalized_industry_id: product.normalized_industry_id,
      source_ids: [...product.source_ids].sort(compareUnicodeScalar),
      observed_state_count: states.size,
      missing_state_count: targets.directStatesPerProduct - states.size,
      observed_states: [...states.values()].sort((left, right) => compareUnicodeScalar(
        `${left.journey}\0${left.event_state}`,
        `${right.journey}\0${right.event_state}`,
      )),
      collection_action: states.size === 0
        ? "establish_direct_ui_evidence"
        : "observe_additional_direct_ui_states",
    };
    if (states.size === 0) directUiStart.push(common);
    else stateCompletion.push(common);
  }

  stateCompletion.sort((left, right) => (
    left.missing_state_count - right.missing_state_count
      || compareUnicodeScalar(left.normalized_industry_id, right.normalized_industry_id)
      || compareUnicodeScalar(left.company, right.company)
      || compareUnicodeScalar(left.product_system, right.product_system)
  ));
  directUiStart.sort((left, right) => (
    industryStats.get(left.normalized_industry_id).directUiProducts.size
      - industryStats.get(right.normalized_industry_id).directUiProducts.size
      || compareUnicodeScalar(left.normalized_industry_id, right.normalized_industry_id)
      || compareUnicodeScalar(left.company, right.company)
      || compareUnicodeScalar(left.product_system, right.product_system)
  ));
  const stateCompletionQueue = stateCompletion.map((item, priorityRank) => ({
    priority_rank: priorityRank,
    ...item,
  }));
  const directUiStartQueue = directUiStart.map((item, priorityRank) => ({
    priority_rank: priorityRank,
    ...item,
  }));
  const companies = new Set([...products.values()].map((product) => product.company));
  const industries = new Set(
    [...products.values()].map((product) => product.normalized_industry_id),
  );
  const industryCoverage = [...industryStats]
    .map(([industryId, stats]) => ({
      industry_id: industryId,
      company_count: stats.companies.size,
      product_count: stats.products.size,
      direct_ui_product_count: stats.directUiProducts.size,
    }))
    .sort((left, right) => compareUnicodeScalar(left.industry_id, right.industry_id));
  const preimage = {
    contract_version: "contentmd.public-product-corpus-expansion-plan/0.1.0",
    targets: { ...targets },
    counts: {
      companies: companies.size,
      products: products.size,
      industries: industries.size,
      products_meeting_direct_state_target: productsMeetingTarget,
      products_with_direct_ui: directStatesByProduct.size,
    },
    gaps: {
      companies_remaining: Math.max(0, targets.companies - companies.size),
      products_remaining: Math.max(0, targets.products - products.size),
      industries_remaining: Math.max(0, targets.industries - industries.size),
      products_below_direct_state_target: products.size - productsMeetingTarget,
    },
    industry_coverage: industryCoverage,
    state_completion_queue: stateCompletionQueue,
    direct_ui_start_queue: directUiStartQueue,
    collection_operator_only: true,
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  };
  return deepFreeze({ ...preimage, plan_digest: sha256Canonical(preimage) });
}

function readPositiveInteger(argument, value) {
  if (!/^\d+$/u.test(value ?? "")) invalid("cli_argument");
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1) invalid("cli_argument");
  return parsed;
}

export function parseArguments(argv) {
  let root = "research/09-experimental/public-product-corpus";
  let asOf;
  const targets = { ...DEFAULT_TARGETS };
  const targetFlags = new Map([
    ["--min-companies", "companies"],
    ["--min-products", "products"],
    ["--min-industries", "industries"],
    ["--min-direct-states-per-product", "directStatesPerProduct"],
  ]);
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--root") root = argv[++index];
    else if (argument === "--as-of") asOf = argv[++index];
    else if (targetFlags.has(argument)) {
      targets[targetFlags.get(argument)] = readPositiveInteger(argument, argv[++index]);
    } else throw new Error(`Unknown argument: ${argument}`);
  }
  if (asOf === undefined) throw new Error("--as-of is required");
  return { root, asOf, targets };
}

async function main() {
  try {
    const options = parseArguments(process.argv.slice(2));
    const corpus = await verifyPublicProductCorpus({
      ...options,
      includeQualifiedEvidence: true,
    });
    const expansionPlan = planPublicProductCorpusExpansion({
      ...corpus.qualified_evidence,
      targets: options.targets,
    });
    process.stdout.write(`${JSON.stringify({
      source_corpus_status: corpus.status,
      source_corpus_error_count: corpus.errors.length,
      expansion_plan: expansionPlan,
    }, null, 2)}\n`);
    if (corpus.status !== "pass") process.exitCode = 1;
  } catch (error) {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    process.exitCode = 1;
  }
}

if (process.argv[1] !== undefined
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await main();
}
