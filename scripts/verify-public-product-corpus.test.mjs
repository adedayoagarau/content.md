import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  governedBatchNames,
  parseArguments,
  readPublicProductCorpusV2Input,
  verifyPublicProductCorpus,
  verifyPublicProductCorpusV2FromDisk,
} from "./verify-public-product-corpus.mjs";

const SOURCE = {
  source_id: "source.alpha",
  company: "Alpha Org",
  product_system: "Alpha Product",
  industry: "public services",
  source_url: "https://example.com/start",
  canonical_url: "https://example.com/start",
  accessed_at: "2026-08-23T12:00:00-07:00",
  source_class: "actual UI",
  title: "Start",
  publisher: "Alpha Org",
  access_method: "public page",
  rights_boundary: "public page; evidence only",
  freshness: "observed 2026-08-23",
};

const OBSERVATION = {
  observation_id: "observation.alpha.start",
  source_id: SOURCE.source_id,
  company: SOURCE.company,
  product_system: SOURCE.product_system,
  industry_stratum: SOURCE.industry,
  product_area: "application",
  journey: "entry/onboarding",
  event_state: "start",
  trigger: "user starts",
  user_goal: "begin",
  system_status: "open",
  consequence_risk: "none",
  surface_channel: "web",
  locale_market: "en-US",
  content_slot_type: "headline",
  exact_wording_span: "Start your application",
  visible_action_recovery: "continue",
  terminology_entities: ["application"],
  content_object_schema_hypothesis: "entry headline",
  accessibility_localization_evidence: "visible public text",
  provenance_freshness: "observed 2026-08-23",
  access_rights_boundary: "public page; evidence only",
  observed_vs_inferred: "observed_ui",
  evidence_strength: "high",
  authority_effect: "none",
  prompt_eligibility: "never",
  training_eligibility: "never",
  benchmark_eligibility: false,
};

const TAXONOMY = {
  contract_version: "contentmd.public-product-industry-taxonomy/0.1.0",
  industries: [{
    industry_id: "government_and_public_services",
    name: "Government and public services",
    aliases: ["public services"],
  }],
  authority_effect: "none",
};

async function withCorpus(records, action, taxonomy = TAXONOMY) {
  const root = await mkdtemp(path.join(os.tmpdir(), "contentmd-public-corpus-"));
  const batch = path.join(root, "2026-08-23-batch-01");
  await mkdir(batch);
  await writeFile(
    path.join(root, "industry-taxonomy.json"),
    `${JSON.stringify(taxonomy)}\n`,
  );
  await writeFile(
    path.join(batch, "sources.jsonl"),
    `${records.sources.map((value) => JSON.stringify(value)).join("\n")}\n`,
  );
  await writeFile(
    path.join(batch, "observations.jsonl"),
    `${records.observations.map((value) => JSON.stringify(value)).join("\n")}\n`,
  );
  try {
    return await action(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test("accepts a bounded evidence-only corpus at its declared target", async () => {
  await withCorpus({ sources: [SOURCE], observations: [OBSERVATION] }, async (root) => {
    const report = await verifyPublicProductCorpus({
      root,
      asOf: "2026-08-23T23:59:59-07:00",
      targets: { companies: 1, products: 1, industries: 1, directStatesPerProduct: 1 },
    });
    assert.equal(report.status, "pass");
    assert.deepEqual(report.counts, {
      batches: 1,
      sources: 1,
      observations: 1,
      qualified_sources: 1,
      qualified_observations: 1,
      companies: 1,
      products: 1,
      industries: 1,
      direct_observed_states: 1,
      products_with_direct_observations: 1,
      products_meeting_direct_state_target: 1,
    });
    assert.deepEqual(report.gaps, {
      companies_remaining: 0,
      products_remaining: 0,
      industries_remaining: 0,
      products_below_direct_state_target: 0,
    });
  });
});

test("loads an all-unavailable batch with empty evidence files", async () => {
  await withCorpus({ sources: [SOURCE], observations: [OBSERVATION] }, async (root) => {
    const batch = path.join(root, "2026-08-23-batch-01");
    await writeFile(path.join(batch, "sources.jsonl"), "");
    await writeFile(path.join(batch, "observations.jsonl"), "");
    const input = await readPublicProductCorpusV2Input({
      root,
      asOf: "2026-08-23",
      targets: { companies: 1, products: 1, industries: 1, directStatesPerProduct: 1 },
    });
    assert.equal(input.batches.length, 1);
    assert.deepEqual(input.batches[0].source_lines, []);
    assert.deepEqual(input.batches[0].observation_lines, []);
  });
});

test("official v0.2 input excludes candidate batches outside governed lineage", async () => {
  await withCorpus({ sources: [SOURCE], observations: [OBSERVATION] }, async (root) => {
    await writeFile(path.join(root, "immutable-batch-baseline.json"), `${JSON.stringify({
      entries: [{ path: "2026-08-23-batch-01/sources.jsonl" }],
    })}\n`);
    const candidate = path.join(root, "2026-08-25-batch-77");
    await mkdir(candidate);
    await writeFile(path.join(candidate, "sources.jsonl"), "candidate-not-json\n");
    await writeFile(path.join(candidate, "observations.jsonl"), "candidate-not-json\n");

    assert.deepEqual(governedBatchNames({
      baseline: { entries: [{ path: "2026-08-23-batch-01/sources.jsonl" }] },
      dispositionSets: [{ proposed_transitions: [{
        subject_ref: { batch_id: "2026-08-23-batch-01" },
        replacement_refs: [{ batch_id: "2026-08-27-batch-77" }],
      }] }],
      dispositionEvents: [],
    }), ["2026-08-23-batch-01", "2026-08-27-batch-77"]);

    const input = await readPublicProductCorpusV2Input({
      root,
      asOf: "2026-08-23",
      targets: { companies: 1, products: 1, industries: 1, directStatesPerProduct: 1 },
      verificationMode: "official",
    });
    assert.deepEqual(input.batches.map((batch) => batch.batch_id), ["2026-08-23-batch-01"]);
  });
});

test("official v0.2 input prefers the digest-bound governed batch registry", async () => {
  await withCorpus({ sources: [SOURCE], observations: [OBSERVATION] }, async (root) => {
    const preimage = {
      contract_version: "contentmd.public-product-governed-batch-registry/0.1.0",
      as_of: "2026-08-23T23:59:59.999-12:00",
      batch_names: ["2026-08-23-batch-01"],
      authority_effect: "none",
    };
    const { createHash } = await import("node:crypto");
    await writeFile(path.join(root, "governed-batch-registry.json"), `${JSON.stringify({
      ...preimage,
      registry_digest: createHash("sha256").update(JSON.stringify(preimage)).digest("hex"),
    })}\n`);
    const candidate = path.join(root, "2026-08-25-batch-77");
    await mkdir(candidate);
    await writeFile(path.join(candidate, "sources.jsonl"), "candidate-not-json\n");
    await writeFile(path.join(candidate, "observations.jsonl"), "candidate-not-json\n");

    const input = await readPublicProductCorpusV2Input({
      root,
      asOf: "2026-08-23",
      targets: { companies: 1, products: 1, industries: 1, directStatesPerProduct: 1 },
      verificationMode: "official",
    });
    assert.deepEqual(input.batches.map((batch) => batch.batch_id), ["2026-08-23-batch-01"]);

    const registry = JSON.parse(await readFile(path.join(root, "governed-batch-registry.json"), "utf8"));
    registry.batch_names = ["2026-08-25-batch-77"];
    await writeFile(path.join(root, "governed-batch-registry.json"), `${JSON.stringify(registry)}\n`);
    await assert.rejects(() => readPublicProductCorpusV2Input({
      root,
      asOf: "2026-08-23",
      targets: { companies: 1, products: 1, industries: 1, directStatesPerProduct: 1 },
      verificationMode: "official",
    }), /governed_batch_registry_invalid/);
  });
});

test("fails closed on duplicated evidence, future timestamps, and inferred states", async () => {
  const duplicate = { ...SOURCE, source_id: "source.beta" };
  const inferred = {
    ...OBSERVATION,
    observation_id: "observation.beta.start",
    source_id: duplicate.source_id,
    company: duplicate.company,
    product_system: duplicate.product_system,
    observed_vs_inferred: "observed headline; inferred journey",
  };
  const future = { ...SOURCE, accessed_at: "2026-08-24T00:00:00-07:00" };
  await withCorpus(
    { sources: [future, duplicate], observations: [OBSERVATION, inferred] },
    async (root) => {
      const report = await verifyPublicProductCorpus({
        root,
        asOf: "2026-08-23T23:59:59-07:00",
        targets: { companies: 1, products: 1, industries: 1, directStatesPerProduct: 2 },
      });
      assert.equal(report.status, "fail");
      assert.ok(report.errors.some((error) => error.code === "future_access"));
      assert.ok(report.errors.some((error) => error.code === "duplicate_canonical_url"));
      assert.ok(report.errors.some((error) => error.code === "product_target"));
    },
  );
});

test("never admits public observations to prompts, training, authority, or benchmarks", async () => {
  const eligible = {
    ...OBSERVATION,
    authority_effect: "write",
    prompt_eligibility: "allowed",
    training_eligibility: "allowed",
    benchmark_eligibility: true,
  };
  await withCorpus({ sources: [SOURCE], observations: [eligible] }, async (root) => {
    const report = await verifyPublicProductCorpus({
      root,
      asOf: "2026-08-23T23:59:59-07:00",
      targets: { companies: 1, products: 1, industries: 1, directStatesPerProduct: 1 },
    });
    assert.equal(report.status, "fail");
    assert.ok(report.errors.some((error) => error.code === "authority_boundary"));
  });
});

test("accepts explicit CLI breadth and direct-state targets", () => {
  assert.deepEqual(parseArguments([
    "--root", "research/corpus",
    "--as-of", "2026-08-23T23:59:59-07:00",
    "--min-companies", "300",
    "--min-products", "600",
    "--min-industries", "60",
    "--min-direct-states-per-product", "3",
  ]), {
    root: "research/corpus",
    asOf: "2026-08-23T23:59:59-07:00",
    targets: {
      companies: 300,
      products: 600,
      industries: 60,
      directStatesPerProduct: 3,
    },
  });
});

test("accepts explicit side-by-side v0.2 migration flags", () => {
  assert.deepEqual(parseArguments([
    "--as-of", "2026-08-23T23:59:59-07:00",
    "--contract-version", "0.2.0",
    "--compare-v2",
    "--verification-mode", "development_fixture",
  ]), {
    root: "research/09-experimental/public-product-corpus",
    asOf: "2026-08-23T23:59:59-07:00",
    targets: {
      companies: 5_000,
      products: 20_000,
      industries: 250,
      directStatesPerProduct: 5,
    },
    contractVersion: "0.2.0",
    compareV2: true,
    verificationMode: "development_fixture",
  });
});

test("exposes deterministic CLI help without requiring as-of", () => {
  assert.deepEqual(parseArguments(["--help"]), { help: true });
});

test("loads exact JSONL bytes and emits a v0.2 diagnostic when reviewed taxonomy is absent", async () => {
  await withCorpus({ sources: [SOURCE], observations: [OBSERVATION] }, async (root) => {
    const options = {
      root,
      asOf: "2026-08-23T23:59:59-07:00",
      targets: { companies: 1, products: 1, industries: 1, directStatesPerProduct: 1 },
      verificationMode: "official",
    };
    const input = await readPublicProductCorpusV2Input(options);
    const report = await verifyPublicProductCorpusV2FromDisk(options);

    assert.equal(input.batches[0].source_lines[0].at(-1), 0x0a);
    assert.equal(report.status, "fail");
    assert.equal(report.accepted_projection_ref, null);
    assert.ok(report.errors.some((error) => error.code === "taxonomy_invalid"));
  });
});

test("documents the governed v0.2 taxonomy and supersession boundary", async () => {
  const readme = await readFile("research/09-experimental/public-product-corpus/README.md", "utf8");
  for (const required of [
    "experience-taxonomy.json", "evidence-disposition-sets.jsonl",
    "public-product-review-receipts.jsonl", "five distinct canonical coverage slots",
    "raw batches remain immutable", "prompt_eligibility: never", "v0.1", "v0.2",
  ]) assert.match(readme, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&")));
  assert.doesNotMatch(readme, /production[_ -]live/iu);
});

test("defaults the CLI to the expanded world-scale breadth target", () => {
  assert.deepEqual(parseArguments(["--as-of", "2026-08-23"]).targets, {
    companies: 5_000,
    products: 20_000,
    industries: 250,
    directStatesPerProduct: 5,
  });
});

test("exports only qualified evidence with normalized industry and coverage metadata when requested", async () => {
  const futureSource = {
    ...SOURCE,
    source_id: "source.future",
    product_system: "Future Product",
    source_url: "https://example.com/future",
    canonical_url: "https://example.com/future",
    accessed_at: "2026-08-24T12:00:00-07:00",
  };
  const futureObservation = {
    ...OBSERVATION,
    observation_id: "observation.future.start",
    source_id: futureSource.source_id,
    product_system: futureSource.product_system,
  };
  await withCorpus(
    {
      sources: [SOURCE, futureSource],
      observations: [OBSERVATION, futureObservation],
    },
    async (root) => {
      const report = await verifyPublicProductCorpus({
        root,
        asOf: "2026-08-23",
        targets: { companies: 1, products: 1, industries: 1, directStatesPerProduct: 1 },
        includeQualifiedEvidence: true,
      });
      assert.equal(report.qualified_evidence.sources.length, 1);
      assert.equal(report.qualified_evidence.sources[0].source_id, SOURCE.source_id);
      assert.equal(
        report.qualified_evidence.sources[0].normalized_industry_id,
        "government_and_public_services",
      );
      assert.equal(report.qualified_evidence.observations.length, 1);
      assert.deepEqual(
        {
          observation_id: report.qualified_evidence.observations[0].observation_id,
          normalized_industry_id:
            report.qualified_evidence.observations[0].normalized_industry_id,
          direct_ui: report.qualified_evidence.observations[0].direct_ui,
          product_meets_direct_state_target:
            report.qualified_evidence.observations[0].product_meets_direct_state_target,
        },
        {
          observation_id: OBSERVATION.observation_id,
          normalized_industry_id: "government_and_public_services",
          direct_ui: true,
          product_meets_direct_state_target: true,
        },
      );
      assert.equal(Object.hasOwn(report.qualified_evidence.sources[0], "__location"), false);
      assert.equal(Object.hasOwn(report.qualified_evidence.observations[0], "__location"), false);
    },
  );
});

test("treats a date-only as-of value as inclusive of that calendar date", async () => {
  await withCorpus({ sources: [SOURCE], observations: [OBSERVATION] }, async (root) => {
    const report = await verifyPublicProductCorpus({
      root,
      asOf: "2026-08-23",
      targets: { companies: 1, products: 1, industries: 1, directStatesPerProduct: 1 },
    });
    assert.equal(report.status, "pass");
  });
});

test("does not count documentation as a directly observed UI state", async () => {
  const documentedSource = {
    ...SOURCE,
    source_class: "official content guidance",
  };
  await withCorpus(
    { sources: [documentedSource], observations: [OBSERVATION] },
    async (root) => {
      const report = await verifyPublicProductCorpus({
        root,
        asOf: "2026-08-23",
        targets: { companies: 1, products: 1, industries: 1, directStatesPerProduct: 1 },
      });
      assert.equal(report.status, "fail");
      assert.equal(report.counts.direct_observed_states, 0);
      assert.ok(report.errors.some((error) => error.code === "insufficient_direct_states"));
    },
  );
});

test("counts normalized industries instead of inflating breadth with aliases", async () => {
  const secondSource = {
    ...SOURCE,
    source_id: "source.beta",
    product_system: "Beta Product",
    source_url: "https://example.com/beta",
    canonical_url: "https://example.com/beta",
    industry: "government/public services",
  };
  const secondObservation = {
    ...OBSERVATION,
    observation_id: "observation.beta.start",
    source_id: secondSource.source_id,
    product_system: secondSource.product_system,
    industry_stratum: secondSource.industry,
  };
  const taxonomy = {
    ...TAXONOMY,
    industries: [{
      ...TAXONOMY.industries[0],
      aliases: ["government/public services", "public services"],
    }],
  };
  await withCorpus(
    { sources: [SOURCE, secondSource], observations: [OBSERVATION, secondObservation] },
    async (root) => {
      const report = await verifyPublicProductCorpus({
        root,
        asOf: "2026-08-23",
        targets: { companies: 1, products: 2, industries: 2, directStatesPerProduct: 1 },
      });
      assert.equal(report.status, "fail");
      assert.equal(report.counts.industries, 1);
      assert.ok(report.errors.some((error) => error.code === "industry_target"));
    },
    taxonomy,
  );
});

test("does not export an observation as qualified when its industry is unmapped", async () => {
  const unrelatedTaxonomy = {
    ...TAXONOMY,
    industries: [{
      industry_id: "other_industry",
      name: "Other industry",
      aliases: ["other industry"],
    }],
  };
  await withCorpus(
    { sources: [SOURCE], observations: [OBSERVATION] },
    async (root) => {
      const report = await verifyPublicProductCorpus({
        root,
        asOf: "2026-08-23",
        targets: { companies: 1, products: 1, industries: 1, directStatesPerProduct: 1 },
        includeQualifiedEvidence: true,
      });
      assert.equal(report.status, "fail");
      assert.equal(report.counts.qualified_sources, 0);
      assert.equal(report.counts.qualified_observations, 0);
      assert.deepEqual(report.qualified_evidence.observations, []);
      assert.ok(report.errors.some((error) => error.code === "unmapped_industry"));
    },
    unrelatedTaxonomy,
  );
});

test("does not credit invalid evidence toward organization or product breadth", async () => {
  const futureSource = {
    ...SOURCE,
    accessed_at: "2026-08-24T12:00:00-07:00",
  };
  await withCorpus(
    { sources: [futureSource], observations: [OBSERVATION] },
    async (root) => {
      const report = await verifyPublicProductCorpus({
        root,
        asOf: "2026-08-23",
        targets: { companies: 1, products: 1, industries: 1, directStatesPerProduct: 1 },
      });
      assert.equal(report.status, "fail");
      assert.equal(report.counts.sources, 1);
      assert.equal(report.counts.qualified_sources, 0);
      assert.equal(report.counts.companies, 0);
      assert.equal(report.counts.products, 0);
      assert.equal(report.counts.direct_observed_states, 0);
    },
  );
});
