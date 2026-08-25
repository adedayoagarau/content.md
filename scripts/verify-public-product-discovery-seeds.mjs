#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

import { verifyPublicProductCorpus } from "./verify-public-product-corpus.mjs";

const SEED_KEYS = [
  "seed_id",
  "company",
  "product_system",
  "industry_alias",
  "entry_url",
  "region",
  "priority_reason",
  "discovered_at",
  "status",
  "authority_effect",
  "prompt_eligibility",
  "training_eligibility",
  "benchmark_eligibility",
];

function invalid(code) {
  throw new TypeError(`public_product_discovery_invalid:${code}`);
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

function deepFreeze(value, seen = new Set()) {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const child of Object.values(value)) deepFreeze(child, seen);
  return Object.freeze(value);
}

function exactKeys(value, expected) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const keys = Object.keys(value).sort(compareUnicodeScalar);
  const wanted = [...expected].sort(compareUnicodeScalar);
  return keys.length === wanted.length && keys.every((key, index) => key === wanted[index]);
}

function nonemptyScalarText(value) {
  if (typeof value !== "string" || value.trim() === "") return false;
  for (const point of value) {
    const scalar = point.codePointAt(0);
    if (scalar >= 0xD800 && scalar <= 0xDFFF) return false;
  }
  return true;
}

function canonicalHttpsUrl(value) {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hash === "" && url.href === value;
  } catch {
    return false;
  }
}

function asOfMilliseconds(asOf) {
  const value = /^\d{4}-\d{2}-\d{2}$/u.test(asOf ?? "")
    ? Date.parse(`${asOf}T23:59:59.999-12:00`)
    : Date.parse(asOf);
  if (!Number.isFinite(value)) invalid("as_of");
  return value;
}

function taxonomyAliases(industryTaxonomy) {
  if (!exactKeys(industryTaxonomy, ["authority_effect", "contract_version", "industries"])
    || industryTaxonomy.contract_version
      !== "contentmd.public-product-industry-taxonomy/0.1.0"
    || industryTaxonomy.authority_effect !== "none"
    || !Array.isArray(industryTaxonomy.industries)) {
    invalid("taxonomy");
  }
  const aliases = new Map();
  for (const industry of industryTaxonomy.industries) {
    if (!exactKeys(industry, ["aliases", "industry_id", "name"])
      || !nonemptyScalarText(industry.industry_id)
      || !nonemptyScalarText(industry.name)
      || !Array.isArray(industry.aliases)
      || industry.aliases.length === 0) {
      invalid("taxonomy");
    }
    for (const alias of industry.aliases) {
      if (!nonemptyScalarText(alias) || aliases.has(alias)) invalid("taxonomy");
      aliases.set(alias, industry.industry_id);
    }
  }
  return aliases;
}

function addError(errors, code, location, detail) {
  errors.push({ code, location, detail });
}

function countDuplicates(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return new Set([...counts].filter(([, count]) => count > 1).map(([value]) => value));
}

function productKey(value) {
  return `${value.company}\0${value.product_system}`;
}

export function verifyPublicProductDiscoverySeeds({
  seeds,
  existingSources,
  industryTaxonomy,
  asOf,
}) {
  if (!Array.isArray(seeds) || !Array.isArray(existingSources)) invalid("input_shape");
  const asOfMs = asOfMilliseconds(asOf);
  const aliases = taxonomyAliases(industryTaxonomy);
  const errors = [];
  const duplicateSeedIds = countDuplicates(seeds.map((seed) => seed?.seed_id));
  const duplicateProducts = countDuplicates(seeds.map((seed) => (
    seed === null || typeof seed !== "object" ? "" : productKey(seed)
  )));
  const duplicateUrls = countDuplicates(seeds.map((seed) => seed?.entry_url));
  const existingProducts = new Set();
  const existingUrls = new Set();
  const industryProducts = new Map();
  for (const source of existingSources) {
    if (!nonemptyScalarText(source.company)
      || !nonemptyScalarText(source.product_system)
      || !nonemptyScalarText(source.normalized_industry_id)
      || !canonicalHttpsUrl(source.canonical_url)) {
      invalid("existing_source_shape");
    }
    const identity = productKey(source);
    existingProducts.add(identity);
    existingUrls.add(source.canonical_url);
    const products = industryProducts.get(source.normalized_industry_id) ?? new Set();
    products.add(identity);
    industryProducts.set(source.normalized_industry_id, products);
  }

  const validSeeds = [];
  for (const [index, seed] of seeds.entries()) {
    const location = `seeds.jsonl:${index + 1}`;
    if (!exactKeys(seed, SEED_KEYS)
      || SEED_KEYS.filter((key) => key !== "benchmark_eligibility")
        .some((key) => !nonemptyScalarText(seed[key]))) {
      addError(errors, "seed_shape", location, "seed must have the exact closed shape");
      continue;
    }
    let rowValid = true;
    if (!canonicalHttpsUrl(seed.entry_url)) {
      addError(errors, "entry_url", location, seed.entry_url);
      rowValid = false;
    }
    const discoveredAt = Date.parse(seed.discovered_at);
    if (!Number.isFinite(discoveredAt)) {
      addError(errors, "seed_timestamp", location, seed.discovered_at);
      rowValid = false;
    } else if (discoveredAt > asOfMs) {
      addError(errors, "future_seed", location, seed.discovered_at);
      rowValid = false;
    }
    if (seed.status !== "unverified_candidate") {
      addError(errors, "seed_status", location, seed.status);
      rowValid = false;
    }
    if (seed.authority_effect !== "none"
      || seed.prompt_eligibility !== "never"
      || seed.training_eligibility !== "never"
      || seed.benchmark_eligibility !== false) {
      addError(errors, "authority_boundary", location,
        "discovery seeds cannot grant product, prompt, training, or benchmark authority");
      rowValid = false;
    }
    const industryId = aliases.get(seed.industry_alias);
    if (industryId === undefined) {
      addError(errors, "unmapped_industry", location, seed.industry_alias);
      rowValid = false;
    }
    if (duplicateSeedIds.has(seed.seed_id)) {
      addError(errors, "duplicate_seed_id", location, seed.seed_id);
      rowValid = false;
    }
    const identity = productKey(seed);
    if (duplicateProducts.has(identity)) {
      addError(errors, "duplicate_candidate_product", location,
        `${seed.company} / ${seed.product_system}`);
      rowValid = false;
    }
    if (duplicateUrls.has(seed.entry_url)) {
      addError(errors, "duplicate_entry_url", location, seed.entry_url);
      rowValid = false;
    }
    if (existingProducts.has(identity)) {
      addError(errors, "existing_product", location,
        `${seed.company} / ${seed.product_system}`);
      rowValid = false;
    }
    if (existingUrls.has(seed.entry_url)) {
      addError(errors, "existing_canonical_url", location, seed.entry_url);
      rowValid = false;
    }
    if (rowValid) {
      validSeeds.push({
        seed_ref: `public-product-discovery-seed.sha256.${sha256Canonical(seed)}`,
        ...seed,
        normalized_industry_id: industryId,
      });
    }
  }
  errors.sort((left, right) => compareUnicodeScalar(
    `${left.code}\0${left.location}\0${left.detail}`,
    `${right.code}\0${right.location}\0${right.detail}`,
  ));
  validSeeds.sort((left, right) => (
    (industryProducts.get(left.normalized_industry_id)?.size ?? 0)
      - (industryProducts.get(right.normalized_industry_id)?.size ?? 0)
      || compareUnicodeScalar(left.region, right.region)
      || compareUnicodeScalar(left.company, right.company)
      || compareUnicodeScalar(left.product_system, right.product_system)
  ));
  const discoveryQueue = errors.length === 0
    ? validSeeds.map((seed, priorityRank) => ({ priority_rank: priorityRank, ...seed }))
    : [];
  const preimage = {
    contract_version: "contentmd.public-product-discovery-report/0.1.0",
    as_of: asOf,
    status: errors.length === 0 ? "pass" : "fail",
    counts: {
      candidate_companies: new Set(validSeeds.map((seed) => seed.company)).size,
      candidate_products: validSeeds.length,
      candidate_industries: new Set(validSeeds.map((seed) => seed.normalized_industry_id)).size,
      corpus_products_added: 0,
    },
    errors,
    discovery_queue: discoveryQueue,
    scheduling_eligible: errors.length === 0,
    evidence_eligibility: "never_until_direct_observation",
    collection_operator_only: true,
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  };
  return deepFreeze({ ...preimage, report_digest: sha256Canonical(preimage) });
}

async function readJsonLines(file) {
  const raw = await readFile(file, "utf8");
  if (raw === "" || !raw.endsWith("\n")) invalid("seed_file");
  return raw.trimEnd().split("\n").map((line) => JSON.parse(line));
}

export function parseArguments(argv) {
  let root = "research/09-experimental/public-product-corpus";
  let seedsFile;
  let asOf;
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--root") root = argv[++index];
    else if (argument === "--seeds") seedsFile = argv[++index];
    else if (argument === "--as-of") asOf = argv[++index];
    else throw new Error(`Unknown argument: ${argument}`);
  }
  if (!nonemptyScalarText(seedsFile)) throw new Error("--seeds is required");
  if (!nonemptyScalarText(asOf)) throw new Error("--as-of is required");
  return { root, seedsFile, asOf };
}

async function main() {
  try {
    const options = parseArguments(process.argv.slice(2));
    const [seeds, industryTaxonomy, corpus] = await Promise.all([
      readJsonLines(options.seedsFile),
      readFile(path.join(options.root, "industry-taxonomy.json"), "utf8")
        .then((raw) => JSON.parse(raw)),
      verifyPublicProductCorpus({
        root: options.root,
        asOf: options.asOf,
        includeQualifiedEvidence: true,
      }),
    ]);
    const discoveryReport = verifyPublicProductDiscoverySeeds({
      seeds,
      existingSources: corpus.qualified_evidence.sources,
      industryTaxonomy,
      asOf: options.asOf,
    });
    process.stdout.write(`${JSON.stringify({
      source_corpus_status: corpus.status,
      source_corpus_error_count: corpus.errors.length,
      discovery_report: discoveryReport,
    }, null, 2)}\n`);
    if (discoveryReport.status !== "pass") process.exitCode = 1;
  } catch (error) {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    process.exitCode = 1;
  }
}

if (process.argv[1] !== undefined
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await main();
}
