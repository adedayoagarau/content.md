#!/usr/bin/env node

import { createHash } from "node:crypto";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

import { verifyPublicProductCorpus } from "./verify-public-product-corpus.mjs";
import { compilePublicProductPatternHypothesesV2 } from "../packages/research/dist/index.js";

export function compilePublicProductPatternHypothesesV2FromReport(report) {
  return compilePublicProductPatternHypothesesV2({
    report,
    thresholds: {
      min_support_companies: 5,
      min_support_products: 5,
      min_support_industries: 3,
      min_direct_states_per_product: 5,
    },
  });
}

const DEFAULT_CORPUS_TARGETS = Object.freeze({
  companies: 5_000,
  products: 20_000,
  industries: 250,
  directStatesPerProduct: 5,
});

const DEFAULT_HYPOTHESIS_THRESHOLDS = Object.freeze({
  minSupportCompanies: 5,
  minSupportProducts: 5,
  minSupportIndustries: 3,
  minDirectStatesPerProduct: 5,
});

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
    if (!Number.isFinite(value)) throw new TypeError("canonical values must be finite");
    return JSON.stringify(Object.is(value, -0) ? 0 : value);
  }
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (typeof value !== "object" || Object.getPrototypeOf(value) !== Object.prototype) {
    throw new TypeError("canonical values must be plain JSON records");
  }
  return `{${Object.keys(value)
    .sort(compareUnicodeScalar)
    .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`)
    .join(",")}}`;
}

function sha256Canonical(value) {
  return createHash("sha256").update(`${canonicalJson(value)}\n`, "utf8").digest("hex");
}

function exactKeys(value, expected) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const actual = Object.keys(value).sort(compareUnicodeScalar);
  const wanted = [...expected].sort(compareUnicodeScalar);
  return actual.length === wanted.length
    && actual.every((key, index) => key === wanted[index]);
}

function nonemptyScalarText(value, field) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new TypeError(`${field} must be nonempty text`);
  }
  for (const point of value) {
    const codePoint = point.codePointAt(0);
    if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
      throw new TypeError(`${field} must contain only Unicode scalar values`);
    }
  }
  return value;
}

function positiveInteger(value, field) {
  if (!Number.isSafeInteger(value) || value < 1) {
    throw new TypeError(`${field} must be a positive safe integer`);
  }
  return value;
}

function productKey(value) {
  return `${value.company}\0${value.product_system}`;
}

function signatureFor(observation) {
  return {
    journey: observation.journey,
    event_state: observation.event_state,
    content_slot_type: observation.content_slot_type,
    surface_channel: observation.surface_channel,
  };
}

function signatureContainsSupportingName(signature, supportObservations) {
  const structuralText = Object.values(signature).join("\0").toLowerCase();
  const names = new Set();
  for (const observation of supportObservations) {
    names.add(observation.company.toLowerCase());
    names.add(observation.product_system.toLowerCase());
  }
  return [...names].some((name) => name.length >= 2 && structuralText.includes(name));
}

function assertUnique(values, field) {
  const seen = new Set();
  for (const value of values) {
    const identity = nonemptyScalarText(value[field], field);
    if (seen.has(identity)) throw new TypeError(`duplicate ${field}: ${identity}`);
    seen.add(identity);
  }
}

export function verifyPublicProductPatternHypothesis(value) {
  try {
    if (!exactKeys(value, [
      "authority_effect", "benchmark_eligibility", "contract_version", "decision_state",
      "hypothesis_digest", "hypothesis_id", "prompt_eligibility", "review_state",
      "structural_signature", "support", "training_eligibility",
    ])
      || value.contract_version !== "contentmd.public-product-pattern-hypothesis/0.1.0"
      || value.review_state !== "unreviewed"
      || value.decision_state !== "cross_product_hypothesis"
      || value.authority_effect !== "none"
      || value.prompt_eligibility !== "never"
      || value.training_eligibility !== "never"
      || value.benchmark_eligibility !== false
      || !exactKeys(value.structural_signature, [
        "content_slot_type", "event_state", "journey", "surface_channel",
      ])
      || !exactKeys(value.support, [
        "company_count", "evidence_refs", "industry_count", "product_count",
      ])) return false;
    for (const field of ["content_slot_type", "event_state", "journey", "surface_channel"]) {
      nonemptyScalarText(value.structural_signature[field], `structural_signature.${field}`);
    }
    for (const field of ["company_count", "industry_count", "product_count"]) {
      positiveInteger(value.support[field], `support.${field}`);
    }
    if (!Array.isArray(value.support.evidence_refs)
      || value.support.evidence_refs.length === 0
      || value.support.evidence_refs.some((ref) => (
        typeof ref !== "string" || !/^public-evidence\.[0-9a-f]{64}$/u.test(ref)
      ))
      || new Set(value.support.evidence_refs).size !== value.support.evidence_refs.length
      || value.support.evidence_refs.some((ref, index) => (
        index > 0 && compareUnicodeScalar(value.support.evidence_refs[index - 1], ref) >= 0
      ))) return false;
    const identityPreimage = {
      contract_version: "contentmd.public-product-pattern-hypothesis-identity/0.1.0",
      structural_signature: value.structural_signature,
    };
    const expectedId = `public-product-pattern-hypothesis.${sha256Canonical(identityPreimage)}`;
    const { hypothesis_digest: receivedDigest, ...preimage } = value;
    return value.hypothesis_id === expectedId
      && typeof receivedDigest === "string"
      && receivedDigest === sha256Canonical(preimage);
  } catch {
    return false;
  }
}

function validateEvidence(sources, observations) {
  if (!Array.isArray(sources) || !Array.isArray(observations)) {
    throw new TypeError("sources and observations must be arrays");
  }
  assertUnique(sources, "source_id");
  assertUnique(observations, "observation_id");
  const sourceById = new Map();
  for (const source of sources) {
    for (const field of ["source_id", "company", "product_system", "source_class"]) {
      nonemptyScalarText(source[field], `source.${field}`);
    }
    sourceById.set(source.source_id, source);
  }
  for (const observation of observations) {
    for (const field of [
      "observation_id", "source_id", "company", "product_system",
      "normalized_industry_id", "journey", "event_state", "content_slot_type",
      "surface_channel",
    ]) {
      nonemptyScalarText(observation[field], `observation.${field}`);
    }
    if (typeof observation.direct_ui !== "boolean") {
      throw new TypeError("observation.direct_ui must be boolean");
    }
    const source = sourceById.get(observation.source_id);
    if (source === undefined) {
      throw new TypeError(`unknown source_id: ${observation.source_id}`);
    }
    if (source.company !== observation.company
      || source.product_system !== observation.product_system) {
      throw new TypeError(`source projection mismatch: ${observation.observation_id}`);
    }
  }
  return sourceById;
}

export function compilePublicProductPatternHypotheses({
  corpusStatus,
  sources,
  observations,
  thresholds = DEFAULT_HYPOTHESIS_THRESHOLDS,
}) {
  if (corpusStatus !== "pass" && corpusStatus !== "fail") {
    throw new TypeError("corpusStatus must be pass or fail");
  }
  for (const field of [
    "minSupportCompanies", "minSupportProducts", "minSupportIndustries",
    "minDirectStatesPerProduct",
  ]) {
    positiveInteger(thresholds[field], `thresholds.${field}`);
  }
  const sourceById = validateEvidence(sources, observations);
  const directStatesByProduct = new Map();
  for (const observation of observations) {
    if (!observation.direct_ui
      || sourceById.get(observation.source_id)?.source_class !== "actual UI") continue;
    const key = productKey(observation);
    const states = directStatesByProduct.get(key) ?? new Set();
    states.add(`${observation.journey}\0${observation.event_state}`);
    directStatesByProduct.set(key, states);
  }
  const eligibleProducts = new Set(
    [...directStatesByProduct]
      .filter(([, states]) => states.size >= thresholds.minDirectStatesPerProduct)
      .map(([key]) => key),
  );
  const observationsBySignature = new Map();
  for (const observation of observations) {
    if (!observation.direct_ui
      || sourceById.get(observation.source_id)?.source_class !== "actual UI"
      || !eligibleProducts.has(productKey(observation))) continue;
    const signature = signatureFor(observation);
    const signatureBytes = canonicalJson(signature);
    const group = observationsBySignature.get(signatureBytes) ?? { signature, observations: [] };
    group.observations.push(observation);
    observationsBySignature.set(signatureBytes, group);
  }

  const hypotheses = [];
  for (const { signature, observations: supportObservations } of observationsBySignature.values()) {
    const companies = new Set(supportObservations.map((value) => value.company));
    const products = new Set(supportObservations.map(productKey));
    const industries = new Set(
      supportObservations.map((value) => value.normalized_industry_id),
    );
    if (companies.size < thresholds.minSupportCompanies
      || products.size < thresholds.minSupportProducts
      || industries.size < thresholds.minSupportIndustries) continue;
    if (signatureContainsSupportingName(signature, supportObservations)) continue;
    const evidenceRefs = supportObservations
      .map((observation) => `public-evidence.${sha256Canonical({
        contract_version: "contentmd.public-product-evidence-ref/0.1.0",
        observation_id: observation.observation_id,
        source_id: observation.source_id,
      })}`)
      .sort(compareUnicodeScalar);
    const identityPreimage = {
      contract_version: "contentmd.public-product-pattern-hypothesis-identity/0.1.0",
      structural_signature: signature,
    };
    const preimage = {
      contract_version: "contentmd.public-product-pattern-hypothesis/0.1.0",
      hypothesis_id: `public-product-pattern-hypothesis.${sha256Canonical(identityPreimage)}`,
      structural_signature: signature,
      support: {
        company_count: companies.size,
        product_count: products.size,
        industry_count: industries.size,
        evidence_refs: evidenceRefs,
      },
      review_state: "unreviewed",
      decision_state: "cross_product_hypothesis",
      authority_effect: "none",
      prompt_eligibility: "never",
      training_eligibility: "never",
      benchmark_eligibility: false,
    };
    hypotheses.push({ ...preimage, hypothesis_digest: sha256Canonical(preimage) });
  }
  hypotheses.sort((left, right) => compareUnicodeScalar(left.hypothesis_id, right.hypothesis_id));

  return {
    contract_version: "contentmd.public-product-pattern-hypothesis-report/0.1.0",
    corpus_status: corpusStatus,
    thresholds: { ...thresholds },
    counts: {
      eligible_products: eligibleProducts.size,
      structural_signatures: observationsBySignature.size,
      hypotheses: hypotheses.length,
    },
    hypotheses,
    promotion_eligibility: false,
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  };
}

function readPositiveInteger(argument, value) {
  if (!/^\d+$/u.test(value ?? "")) throw new Error(`${argument} requires a positive integer`);
  return positiveInteger(Number(value), argument);
}

export function parseArguments(argv) {
  let root = "research/09-experimental/public-product-corpus";
  let asOf;
  const corpusTargets = { ...DEFAULT_CORPUS_TARGETS };
  const hypothesisThresholds = { ...DEFAULT_HYPOTHESIS_THRESHOLDS };
  const corpusFlags = new Map([
    ["--min-companies", "companies"],
    ["--min-products", "products"],
    ["--min-industries", "industries"],
    ["--min-direct-states-per-product", "directStatesPerProduct"],
  ]);
  const hypothesisFlags = new Map([
    ["--min-support-companies", "minSupportCompanies"],
    ["--min-support-products", "minSupportProducts"],
    ["--min-support-industries", "minSupportIndustries"],
  ]);
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--root") root = argv[++index];
    else if (argument === "--as-of") asOf = argv[++index];
    else if (corpusFlags.has(argument)) {
      corpusTargets[corpusFlags.get(argument)] = readPositiveInteger(argument, argv[++index]);
    } else if (hypothesisFlags.has(argument)) {
      hypothesisThresholds[hypothesisFlags.get(argument)] = readPositiveInteger(
        argument,
        argv[++index],
      );
    } else throw new Error(`Unknown argument: ${argument}`);
  }
  if (asOf === undefined) throw new Error("--as-of is required");
  hypothesisThresholds.minDirectStatesPerProduct = corpusTargets.directStatesPerProduct;
  return { root, asOf, corpusTargets, hypothesisThresholds };
}

async function main() {
  try {
    const { root, asOf, corpusTargets, hypothesisThresholds } = parseArguments(
      process.argv.slice(2),
    );
    const corpus = await verifyPublicProductCorpus({
      root,
      asOf,
      targets: corpusTargets,
      includeQualifiedEvidence: true,
    });
    const patternHypotheses = compilePublicProductPatternHypotheses({
      corpusStatus: corpus.status,
      ...corpus.qualified_evidence,
      thresholds: hypothesisThresholds,
    });
    process.stdout.write(`${JSON.stringify({
      corpus: {
        status: corpus.status,
        as_of: corpus.as_of,
        targets: corpus.targets,
        counts: corpus.counts,
        gaps: corpus.gaps,
        error_count: corpus.errors.length,
      },
      pattern_hypotheses: patternHypotheses,
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
