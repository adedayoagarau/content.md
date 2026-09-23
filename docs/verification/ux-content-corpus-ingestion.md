# Governed UX content corpus ingestion

## Outcome

The 200 contributed product dossiers now have a deterministic, metadata-only
ingestion path. The raw Markdown remains the canonical collection. A compiler
builds traceable projections and reports defects without modifying source files,
copying their prose into a second store, or promoting observations into product
rules.

This implements the corpus boundary needed by the layered content-design loop:

```text
raw public-product evidence
  -> validate structure, language, rights, provenance, and missingness
  -> project metadata and line-bounded candidates
  -> crosswalk candidate classification questions
  -> queue AI classification plus independent AI evaluation
  -> accept | revise | abstain | route a genuine authority/failure exception
  -> remain ineligible for prompts, training, benchmarks, and metrics
```

## What labels already exist

The dossiers are not label-free. Product metadata and T1–T14 placement are
source labels; split and leakage-group assignments are deterministic derived
labels. They are useful evidence, but T1–T14 are collection categories rather
than substitutes for user intent, event state, action, risk, voice, tone, or
outcome. The crosswalk therefore names coordinate axes the AI should decide and
keeps a non-equivalence warning for every category.

Every review unit now carries explicit `source_labels`, `derived_labels`, an
empty `ai_labels` layer, and an empty `human_override` layer. Its primary
adjudicator is AI; its ordinary state is `pending_ai_adjudication`. Voice and
tone remain expression constraints, so T14 still cannot stand in for use-case
classification. Records outside the English-only scope are excluded before any
provider call.

## AI adjudication boundary

The runner performs a strict classifier–evaluator loop:

```text
source + existing labels
  -> classify requested coordinate axes
  -> deterministic ontology/evidence checks
  -> independent evaluator checks six fixed criteria
  -> accept | revise (bounded) | abstain | authority exception
```

An evaluator pass creates an AI-accepted semantic label decision; it does not
wait for routine human approval. The evaluator is sent the proposed values,
evidence references, and uncertainty but is blinded to the classifier's
rationale. An unchanged revision digest stops the loop instead of spending
indefinitely.

Human involvement is an exception route for external legal, policy,
publication, or implementation authority; exhausted or stalled revisions; or
invalid model behavior. Missing evidence produces abstention, not automatic
human labeling.

Model processing is also distinct from model reuse. Eligible source text may be
read only for classification and evaluation under an explicit per-run
authorization, with transient retention and provider storage disabled. Prompt
grounding for generation, retrieval reuse, training, benchmark scoring, and
publication remain prohibited.

## Deterministic controls

- Every canonical input and generated artifact has a SHA-256 witness.
- The manifest binds both compiler source files and requires Node 24.20.0.
- JSON objects are recursively key-sorted; JSONL records are canonical and
  newline-terminated.
- No wall-clock time, machine path, or network result enters a digest.
- The compiler verifies all 200 ranks and ten 20-product domain strata.
- Product is the leakage group. A product and all fourteen of its sections are
  assigned together to discovery, calibration, or sealed-evaluation-candidate.
- The split is 140/30/30, stratified as 14/3/3 within every domain.
- Existing public-product source records are matched by normalized primary host
  or exact normalized company name, then cross-referenced rather than copied.
- The source index is explicitly insufficient to become a governed
  `ResearchSourceRecord`: collection timestamps, access methods, redirects,
  freshness checks, and source-level rights are not complete.

## Current fail-closed findings

The generated audit is authoritative for exact counts. At initial ingestion it
reports:

- six products missing the required `Auth state` field;
- KAYAK missing T4;
- two non-English collections (Nubank pt-BR and Doctolib fr-FR) outside the
  current English-only project scope;
- seven noncanonical harvest-completeness declarations;
- Mayo Clinic and Cleveland Clinic excluded pending legal review;
- many blockquote groups requiring quotation review before any reuse; and
- stale/nonexclusive summary counts in `corpus-index.md`.

These findings deliberately do not stop deterministic projection generation.
They do keep `controlled_corpus_eligibility` false. Fixing structure alone also
cannot change benchmark, prompt, or training eligibility; those states require
separate evidence, calibration, and authority decisions. AI label acceptance
does not change them.

## Commands

```bash
node scripts/compile-ux-content-corpus.mjs
node scripts/compile-ux-content-corpus.mjs --check
node --test scripts/compile-ux-content-corpus.test.mjs
```

`compile` updates `_generated/`. `verify` rebuilds in memory and fails if any
checked-in generated byte is missing, changed, or unexpected. The tests also
prove deterministic rebuilds, split isolation, fail-closed rights/language
handling, digest replay, no copied prose fields, and tamper detection.
