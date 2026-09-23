# UX content corpus normalized projections

The 200 Markdown dossiers in `products/` are the canonical raw collection. The
compiler never rewrites them and never copies their prose into generated
projections. It emits metadata, hashes, source locators, line ranges, candidate
crosswalks, and review state under `_generated/`.

## Trust boundary

- The collection is public-product evidence and candidate discovery material.
- It has no product, policy, legal, voice, benchmark, training, or publication
  authority.
- `prompt_eligibility` and `training_eligibility` are always `never`.
- Bounded model processing is a separate permission from prompt reuse. A source
  may be inspected for classification and evaluation only when its record is
  eligible and the run supplies an explicit authorization reference. Model
  retention is transient only.
- `benchmark_eligibility` and `eligible_for_metrics` are always `false` until a
  separate calibration and benchmark-governance artifact changes that state.
- Mayo Clinic (114) and Cleveland Clinic (115) remain excluded pending legal
  review, as declared in `RIGHTS-POLICY.json`.
- Records whose declared observation is outside English remain excluded from
  model processing under the current project scope.
- A taxonomy crosswalk proposes questions to classify. It does not assign an
  observed product's labels to another product or prove that a pattern works.

## Generated artifacts

| Artifact | Purpose |
| --- | --- |
| `raw-manifest.json` | Exact path, byte count, LF count, and SHA-256 for every canonical input. |
| `audit.json` | Structural errors, missingness, evidence-marker gaps, quotation-review candidates, stale-index checks, and eligibility state. |
| `products.jsonl` | One metadata-only product projection per dossier. |
| `sections.jsonl` | One line-bounded projection per present T1–T14 section. |
| `source-index.jsonl` | Deduplicated public URL locators with product and line references; not a verified research-source record. |
| `pattern-candidates.jsonl` | Hashes and line references for transferable-pattern candidates; no copied pattern text. |
| `overlap-crosswalk.jsonl` | Host/company matches to the older public-product evidence corpus so the repositories do not become competing truths. |
| `review-queue.jsonl` | AI-first section-level adjudication units with product-level leakage groups, explicit label layers, and human-exception routing. |
| `taxonomy-crosswalk.json` | Validated candidate mapping from T1–T14 to classifier and Content Decision Contract dimensions. |
| `projection-manifest.json` | Digest witness for every generated artifact and the older corpus dependency. |

The deterministic split is stratified within each domain: 14 products for
discovery, 3 for calibration, and 3 sealed evaluation candidates. The product is
the leakage group, so sections from one product can never appear in multiple
splits. “Sealed evaluation candidate” is a storage partition, not a gold label or
permission to score a system.

## Label layers and adjudication

The corpus did not start label-free. Each dossier and section already carries
source labels such as product metadata and T1–T14 taxonomy placement, while the
compiler derives routing labels such as split and leakage group. Generated
records preserve four non-interchangeable layers:

1. `source_labels` — labels explicitly present in the collected artifact;
2. `derived_labels` — deterministic compiler labels;
3. `ai_labels` — null until the classifier and independent evaluator agree;
4. `human_override` — null unless an authorized person later overrides an AI
   decision or supplies external legal, policy, or publication authority.

The primary semantic adjudicator is AI. The evaluator applies six fixed checks:
evidence relation, requested-axis coverage, source-label compatibility,
ontology conformance, internal consistency, and honest uncertainty. A pass can
produce an AI-accepted label decision without routine human approval. Revision
loops are bounded; missing evidence produces abstention; humans are reserved for
external authority, repeated conflict, convergence failure, or invalid model
behavior.

AI acceptance grants only semantic-label authority for that task. It does not
make the source an approved example, generation prompt, retrieval asset,
training item, benchmark gold label, product rule, or publishable claim.

Run `node scripts/compile-ux-content-corpus.mjs` to rebuild the projections and
`node scripts/compile-ux-content-corpus.mjs --check` to prove that checked-in
output matches the raw bytes and compiler rules.
