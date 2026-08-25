# Public Product Corpus Readiness Audit

Audit date: 2026-08-23

## Scope

This is a project-authored, read-only audit of the existing public-product corpus. It does not reclassify, correct, promote, or reuse any third-party expression.

## Current breadth

- batches: 57 (`2026-08-23-batch-01` through `2026-08-23-batch-57`)
- source records: 812
- observation records: 826
- distinct companies: 66
- distinct company/product systems: 139
- observed industry strings: 62

The requested broad-sampling threshold of 60 systems across at least 15 industries has been exceeded numerically. Further acquisition is not justified until the existing records are normalized and validated.

## Verification performed

`scripts/verify-public-product-corpus.mjs` was run with an explicit as-of value of `2026-08-24T23:59:59-07:00` and the requested breadth targets: 60 companies, 60 products, 15 industries, and three direct states per product.

The result was `fail`.

## Promotion blockers

1. The verifier recognized zero direct observations because every `observed_vs_inferred` value is descriptive text such as `observed headline` or `observed body text`, while the verifier requires the canonical value `observed_ui`. Consequently, all 139 product systems fail the minimum three directly observed states gate.
2. There are 141 duplicate canonical-URL groups. This includes repeated public pages within and across system slices.
3. There are two duplicate source IDs: `src-shopify-home` and `src-uber-home`.
4. There are five duplicate observation IDs: `obs-auth0-docs-success`, `obs-canva-home-entry`, `obs-reddit-home-entry`, `obs-shopify-home-entry`, and `obs-uber-home-entry`.
5. Four observations do not exactly project their company, product, and industry fields from their referenced source record.
6. Source access timestamps range from `2026-08-24T00:10:00-07:00` to `2026-08-25T00:41:00-07:00`; 44 records are later than the verifier's explicit 24 August as-of value and later than this audit date.
7. Industry strings are not normalized. Only 16 of 62 recorded industry strings contain four or more distinct systems, so the intended `four systems per industry` distribution is not currently demonstrated by the raw labels.

## Required repair sequence

1. Freeze the evidence files and establish the truthful acquisition window from independently retained capture metadata before changing timestamps.
2. Introduce a controlled normalization mapping for observation modality and state evidence; do not overwrite raw `observed_vs_inferred` prose. The mapping must distinguish direct UI observation from inference and must be separately reviewed.
3. De-duplicate source and observation identities without deleting evidence blindly; retain a clear canonical-to-duplicate disposition.
4. Reconcile the four source-projection conflicts against the underlying source records.
5. Normalize the industry taxonomy into the requested strata, preserve each raw label, and remeasure the four-systems-per-industry requirement.
6. Re-run the verifier with a truthful RFC3339 as-of value, then review source rights and profile-isolation limitations before any controlled-corpus promotion.

## Boundary

All browser-derived material remains evidence-only: `authority_effect: none`, `prompt_eligibility: never`, `training_eligibility: never`, and `benchmark_eligibility: false`. Existing profile isolation is unestablished, so passing structural checks alone would not make the corpus conforming for controlled-corpus promotion.
