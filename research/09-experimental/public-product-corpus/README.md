# Public product corpus

This directory is the evidence-only comparative research lane for content.md. It records public product content without granting product truth, approval, publication, prompt, training, or benchmark authority.

## World-scale breadth target

- 5,000 independently identifiable companies or public organizations
- 20,000 distinct named products or product systems
- 250 normalized industries and sub-industries
- 5 distinct directly observed UI states per product

Rows, pages, raw industry labels, translations, and minor product variants do not substitute for organizational, product, industry, or state breadth.

## Batch boundary

Every batch lives in `YYYY-MM-DD-batch-N/` and contains LF-terminated `sources.jsonl` and `observations.jsonl`. Existing batches are immutable evidence versions; corrections create a new batch and an explicit supersession note.

Public evidence always retains:

```text
authority_effect: none
prompt_eligibility: never
training_eligibility: never
benchmark_eligibility: false
```

Only an observation with `observed_vs_inferred: observed_ui` bound to a source with `source_class: actual UI` counts as direct UI coverage. Marketing descriptions, documentation, official examples, search snippets, and inferred journey labels remain supporting evidence only.

## Industry taxonomy

`industry-taxonomy.json` is the only breadth-counting taxonomy. Source and observation industry labels must match one registered alias exactly. Synonyms do not create new industries. Compound labels that span unrelated industries must be replaced with a defensible primary industry or split into separately evidenced products; they are not admitted merely to improve breadth.

Adding a normalized industry is a reviewed taxonomy change. It requires a distinct market activity and cannot be a stylistic rename, product category, interaction pattern, company department, or content surface.

## Governed v0.2 taxonomy and supersession

The historical v0.1 aggregate report remains the default diagnostic during migration. The v0.2 projection is accepted only when `experience-taxonomy.json` contains one digest-valid, effective taxonomy whose mappings and version have complete governed review evidence. Review material is portable through `public-product-review-receipts.jsonl` plus the complete reviewer-qualification and authorization replay evidence in `public-product-review-governance.json`. A claimed reviewer role is not qualification.

Corrections never edit acquired evidence: raw batches remain immutable and are bound by `immutable-batch-baseline.json`. Proposed transitions live in `evidence-disposition-sets.jsonl`; only reviewed, append-ordered events may enter `evidence-dispositions.jsonl`. Held, rejected, and superseded subjects remain in raw counts while receiving no active projection or coverage credit.

Coverage in v0.2 uses reviewed exact mappings to six stable coordinates. A product meets the release sampling threshold only with five distinct canonical coverage slots. Rephrasings of one raw state count once. Unmapped signatures receive no canonical coverage and remain review candidates rather than guessed classifications.

Run both versions side by side without changing the default:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  scripts/verify-public-product-corpus.mjs \
  --root research/09-experimental/public-product-corpus \
  --as-of 2026-08-24 \
  --compare-v2
```

Until the taxonomy and reviews exist, `v2_diagnostic.status` remains `fail` and `accepted_projection_ref` remains `null`. Neither migration proposals nor reviewer queues can grant authority, prompt use, training use, benchmark use, or promotion.

The [experience taxonomy reviewer brief](taxonomy-reviewer-brief.md) is the
handoff for the current 343-signature mapping queue. It describes the exact
two-role qualified review and version-review gates without issuing a taxonomy,
receipt, or mapping.

## Coverage is not promotion

Meeting five observed states establishes comparative coverage only. It does not make a batch controlled-corpus eligible or a product pattern reusable. Controlled pattern synthesis separately requires a conforming typed acquisition manifest, established signed-out ephemeral profile isolation, current runtime and external-research grants, source/observation normalization, rights review, similarity review, complete clean lineage, and two qualified reviewers.

Chrome extension research in a normal user profile remains evidence-only. Never infer profile isolation from signed-out page appearance.

## Review-only pattern hypotheses

Per-batch `pattern-candidates.jsonl` files are informal research notes. They do not count as cross-product patterns and cannot enter prompts, training, benchmarks, or approved guidance.

`scripts/compile-public-product-pattern-hypotheses.mjs` is the sole aggregate hypothesis queue for this experimental corpus. It considers only qualified, directly observed UI evidence from products that meet the five-state coverage threshold. A structural signature is emitted only when it is independently supported by at least five companies, five products, and three normalized industries. The output contains structural coordinates and opaque evidence refs, never copied wording or company names. Every result remains unreviewed, non-promotable, and authority-free. Human reviewers must use the existing typed `ContentPattern` and `PatternDisposition` path for any later promotion.

`scripts/review-public-product-pattern-hypotheses.mjs` creates the corresponding quality-review tasks and adjudicates closed reviewer records. Two distinct reviewers claiming the `qualified_content_designer` qualification must independently assess state accuracy, user-goal alignment, clarity, actionable recovery, accessibility, localization transferability, evidence quality, counterexample coverage, and rights-safe abstraction. Any failed dimension rejects the hypothesis; any insufficient dimension holds it for more evidence. Unanimous passes make it only `ready_for_canonical_authoring`. Reviewer qualification, the pattern mechanism, contexts, counterexamples, rights, similarity, lineage, and project approval must still be independently verified by the canonical research contracts. The review queue cannot create a pattern or authorize writing by itself.

## Aggregate gate

Run from the repository root:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  scripts/verify-public-product-corpus.mjs \
  --root research/09-experimental/public-product-corpus \
  --as-of 2026-08-23 \
  --min-companies 5000 \
  --min-products 20000 \
  --min-industries 250 \
  --min-direct-states-per-product 5
```

The report distinguishes raw rows from qualified evidence. Future timestamps, duplicate identities or canonical URLs, broken source projections, unmapped industries, non-UI evidence presented as UI, and authority-boundary violations never receive breadth credit.

Generate the review-only structural queue with the same release targets:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  scripts/compile-public-product-pattern-hypotheses.mjs \
  --root research/09-experimental/public-product-corpus \
  --as-of 2026-08-23 \
  --min-companies 5000 \
  --min-products 20000 \
  --min-industries 250 \
  --min-direct-states-per-product 5 \
  --min-support-companies 5 \
  --min-support-products 5 \
  --min-support-industries 3
```

The command still emits a transparent partial report when the corpus gate fails, but exits nonzero and keeps `promotion_eligibility: false`.

Generate a deterministic operator backlog for the concurrent collection lane:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  scripts/plan-public-product-corpus-expansion.mjs \
  --root research/09-experimental/public-product-corpus \
  --as-of 2026-08-24 \
  --min-companies 5000 \
  --min-products 20000 \
  --min-industries 250 \
  --min-direct-states-per-product 5
```

The plan separates quick state-completion work from products that need their first direct-UI evidence, reports normalized-industry coverage, and remains `collection_operator_only`. It intentionally contains product identities so a bounded research operator can navigate to the right public surface, but it is barred from prompts, learning, benchmarks, approvals, and publication. An incomplete corpus still produces the backlog and exits nonzero so orchestration cannot misread collection planning as a passed release gate.

## Concurrent collection assignments

One coordinator partitions the current backlog before any concurrent collector starts. The coordinator owns the batch-number range and runs:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  scripts/partition-public-product-corpus-workers.mjs \
  --root research/09-experimental/public-product-corpus \
  --as-of 2026-08-24 \
  --workers 4 \
  --start-batch 65
```

The resulting `contentmd.public-product-corpus-worker-plan/0.1.0` manifest assigns every company to exactly one worker and reserves one exclusive `YYYY-MM-DD-batch-N/` write root per worker. Workers may read the full corpus but may write only their assigned batch root. A worker must never exchange, split, or expand its company partition without a new coordinator plan. The integrated corpus verifier, not worker self-report, decides whether the resulting batches are accepted.

Use the reusable [concurrent collection worker prompt](concurrent-collection-worker-prompt.md) for every assigned worker. It binds each run to its frozen assignment, requires demonstrable signed-out profile isolation before any retention, and prevents a transient browser failure or profile contamination from being misreported as evidence or a valid block.

The currently reserved plan is `worker-plans/2026-08-24-batches-65-68.json`, digest `2a677a805bf0475a87b4a24a7d1bfe98f48f35edbcefbae6626f9a274d0ee4d9`. It is the immutable ownership authority for batches 65–68. Do not regenerate or overwrite it after collection begins.

The assignment manifest is runtime-portable. A local coordinator can execute it directly; a future Agents SDK adapter may schedule one durable workflow per assignment and persist progress, but it must not reinterpret the tasks, enlarge browser authority, change batch ownership, or promote evidence. The manifest and its source expansion plan are digest-bound, append-only, operator-only, and always retain:

```text
authority_effect: none
prompt_eligibility: never
training_eligibility: never
benchmark_eligibility: false
```

The worker plan partitions products already present in the verified evidence graph. Discovery of previously unseen companies remains a separate coordinator-owned sampling activity; newly discovered products enter a new evidence batch before they can appear in a later worker plan.

## New-company discovery seeds

Discovery candidates are kept outside evidence batches under `discovery-seeds/`. They identify a public entry URL for collection planning, but they are not observations, sources, product facts, or corpus breadth. Validate a seed set with:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  scripts/verify-public-product-discovery-seeds.mjs \
  --root research/09-experimental/public-product-corpus \
  --seeds research/09-experimental/public-product-corpus/discovery-seeds/2026-08-24-seeds-01.jsonl \
  --as-of 2026-08-24
```

The verifier rejects duplicate seed, product, or URL identities; candidates already present in the qualified corpus; unmapped industries; future discovery timestamps; and any prompt, training, benchmark, or product-authority grant. A passing report creates an operator-only priority queue weighted toward industries with fewer existing products. It still reports `corpus_products_added: 0`: only a later, directly observed and independently verified evidence batch can add a company or product to the corpus.

The first seed set contains 31 previously unseen candidate companies and products across eight normalized industries. It is a collection backlog, not proof that the URLs are accessible, current product experiences, or suitable pattern evidence. Browser safety blocks, redirects, changed products, and inaccessible public states remain explicit outcomes and cannot be converted into positive evidence.

Partition a passing discovery report into exclusive evidence-acquisition assignments with:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  scripts/partition-public-product-discovery-workers.mjs \
  --root research/09-experimental/public-product-corpus \
  --seeds research/09-experimental/public-product-corpus/discovery-seeds/2026-08-24-seeds-01.jsonl \
  --as-of 2026-08-24 \
  --workers 4 \
  --start-batch 69
```

The frozen discovery plan is `worker-plans/2026-08-24-discovery-batches-69-72.json`, digest `c09cb45a2fb5dff8db63ce65d91dc99593d04eb2cca39b50c9500bf6005421e8`. It assigns all 31 candidate companies to one owner each across batches 69–72. The `contentmd.public-product-discovery-worker-plan/0.1.0` manifest has the same append-only, signed-out Chrome, no-login, evidence-only authority boundary as the known-product worker plan. A scheduler may persist or resume its assignments but cannot treat a seed as evidence, change company ownership, or enlarge collection authority.

The second seed set expands the operator backlog by 36 distinct unverified candidate companies and products across 18 additional normalized industries. Together, the two seed sets contain 67 collection candidates across 26 normalized industry aliases. This is still only a scheduling input: no seed contributes a source, observation, breadth count, pattern, prompt, training, benchmark, or product fact.

Validate and partition this independently reserved tranche with:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  scripts/verify-public-product-discovery-seeds.mjs \
  --root research/09-experimental/public-product-corpus \
  --seeds research/09-experimental/public-product-corpus/discovery-seeds/2026-08-24-seeds-02.jsonl \
  --as-of 2026-08-24

/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  scripts/partition-public-product-discovery-workers.mjs \
  --root research/09-experimental/public-product-corpus \
  --seeds research/09-experimental/public-product-corpus/discovery-seeds/2026-08-24-seeds-02.jsonl \
  --as-of 2026-08-24 \
  --workers 4 \
  --start-batch 73
```

The frozen plan is `worker-plans/2026-08-24-discovery-batches-73-76.json`, digest `f794a8ef88c9249cba67e3f9b0080c4e9d9fa85fff1b81428d7810937085c5f1`. It assigns each of the 36 companies to exactly one worker and exclusive batch root. Do not regenerate, overlap, or alter that allocation after any assigned collection begins. The same signed-out, no-login, append-only and evidence-only constraints apply; it can run concurrently with batches 69–72 only when each worker has an admissible isolated browser profile.

After every assigned batch is returned, the coordinator runs the ownership gate before the aggregate corpus gate:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  scripts/verify-public-product-corpus-worker-batches.mjs \
  --root research/09-experimental/public-product-corpus \
  --as-of 2026-08-24 \
  --plan /absolute/path/to/worker-plan.json
```

The verifier rejects missing or unreserved batches, evidence written under another worker's company or product, cross-batch duplicate identities, broken source projections, and assigned products with no retained observation or valid blocked disposition. A genuinely inaccessible public product may be represented in its assigned batch by `blocked-attempts.jsonl` using the digest-bound `contentmd.public-product-discovery-blocked-attempt/0.1.0` contract. The record requires the exact plan, batch, worker, company, product, URL, timestamp, closed block class, explanation, `bypass_attempted: false`, `retained_as_product_evidence: false`, and all authority and learning fields disabled. It completes only worker ownership accounting: it creates no source, observation, breadth, product-state, prompt, benchmark, or training credit. Passing this ownership gate is necessary but not sufficient: the command then runs the aggregate corpus verifier, and the overall command exits nonzero until both ownership and corpus release gates pass.

While the other exclusive workers are still collecting, a worker may validate only its own complete assigned root with:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  scripts/verify-public-product-corpus-worker-batches.mjs \
  --root research/09-experimental/public-product-corpus \
  --as-of 2026-08-24 \
  --plan /absolute/path/to/worker-plan.json \
  --assignment corpus-worker-01
```

That emits `contentmd.public-product-corpus-worker-assignment-report/0.1.0` for exactly one digest-bound assignment. It verifies exclusive ownership, completed or explicitly blocked tasks, and disabled authority/learning fields; it deliberately never runs the aggregate corpus verifier or grants corpus credit. The final coordinator command above remains mandatory after every assignment returns.
