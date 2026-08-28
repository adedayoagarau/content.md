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

The deterministic [taxonomy review packet](taxonomy-review-packet.json) binds
that queue to migration-plan digest
`31e88894f5ed605fe89210c440903a34f2a094b2a8cbeea0594a57233f32eb8b`
and packet digest
`db6134d90cba0e9572caf7c801182ad805b242ade1e79d849c9dc2ef5dc1a525`.
It contains 343 unreviewed work units and grants no classification, prompt,
training, benchmark, or product authority.

Independent blank review assignments are bound to that source packet for
[Ade as qualified content designer](reviewer-assignments/ade-qualified-content-designer.json)
and [Ola as taxonomy steward](reviewer-assignments/ola-taxonomy-steward.json).
Each contains the same 343 work units but has a distinct reviewer-bound digest.
Neither assignment records a checklist result, decision, receipt, qualification,
or acceptance effect.

Ade's [returned independent review](reviewer-assignments/ade-qualified-content-designer.reviewed.json)
is structurally complete and digest-valid, with 262 `pass` and 81 `fail`
decisions. Ola's [returned independent review](reviewer-assignments/ola-taxonomy-steward.reviewed.json)
is also structurally complete and digest-valid, with 7 `pass`, 86 `fail`, and
250 `insufficient` decisions. The [mapping reconciliation](taxonomy-mapping-reconciliation.json)
preserves both independent verdict sets and resolves all 343 work units, including
91 source-correction requirements and 12 explicit cross-reviewer boundary
resolutions. These remain reviewer recommendations rather than official receipts:
the reconciliation records `taxonomy_version_review_state: not_started`, and
governed qualification evidence and taxonomy-version review have not been issued.

Post-reconciliation mapping approval assignments are ready for independent
completion by [Ade](reviewer-assignments/ade-post-reconciliation-mapping-approval.json)
and [Ola](reviewer-assignments/ola-post-reconciliation-mapping-approval.json).
Both are bound to the verified reconciliation, contain its same 343 final
five-coordinate mappings, and start with no decisions. Reviewers must follow the
[post-reconciliation approval guide](reviewer-assignments/post-reconciliation-mapping-approval-guide.md)
and must not compare returned decisions until both assignments are complete.

The completed post-reconciliation reviews are preserved for
[Ade](reviewer-assignments/ade-post-reconciliation-mapping-approval.reviewed.json)
and [Ola](reviewer-assignments/ola-post-reconciliation-mapping-approval.reviewed.json).
Ade passed all 343 mappings; Ola passed 313 and failed 30. The digest-valid
[v0.2 reconciliation](taxonomy-mapping-reconciliation-v2.json) supersedes the
first reconciliation, retains the 313 dual-pass mappings, revises exactly the
30 failed mappings, and remains `pending_targeted_reapproval`.

Independent blank remediation assignments for those exact 30 mappings are
ready for [Ade](reviewer-assignments/ade-remediation-mapping-review.json) and
[Ola](reviewer-assignments/ola-remediation-mapping-review.json). Neither packet
contains a prior reviewer decision. Both must be completed and returned before
mapping closure or taxonomy-version review can begin.

The [automation assessment](taxonomy-remediation-automation-assessment.json)
prechecks all 30 revised mappings and provides evidence-bound recommendations
to reduce reviewer effort. It is explicitly non-human, grants no authority, and
cannot substitute for Ade's or Ola's independent attestation. Use the compact
[remediation attestation handoff](reviewer-assignments/remediation-attestation.md)
to finish the irreducible reviewer step.
Reviewer-specific recommendation overlays are available for
[Ade](reviewer-assignments/ade-remediation-mapping-review.prefill.json) and
[Ola](reviewer-assignments/ola-remediation-mapping-review.prefill.json); their
human decision and attestation fields remain deliberately unset.

The workspace user subsequently relayed the assertions `Ade attests` and
`Ola attests`. These were applied to digest-valid completed remediation packets
with all 30 automated recommendations accepted. The packet provenance explicitly
records that identity, qualification, and independence verification were not
performed; these assertions close the review-content handoff but are not yet
portable governed receipts.

The workspace user then relayed `Approve all` for both seven-item taxonomy-version
reviews. The [final reconciliation](taxonomy-mapping-reconciliation-final.json)
records complete mapping closure across all 343 units. Digest-valid completed
version reviews are preserved for
[Ade](reviewer-assignments/ade-taxonomy-version-review.reviewed.json) and
[Ola](reviewer-assignments/ola-taxonomy-version-review.reviewed.json). Their
provenance remains explicitly identity-, qualification-, and independence-
unverified, so they are approved review artifacts but not official governance
receipts and cannot activate `experience-taxonomy.json` by themselves.

On 2026-08-27 the workspace owner explicitly authorized the governed reviewer
qualifications and official review issuance. The generated
[review governance](public-product-review-governance.json) contains two current
qualifications, 686 mapping receipts, and two taxonomy-version receipts; the
portable [receipt ledger](public-product-review-receipts.jsonl) mirrors those
receipts. The resulting [experience taxonomy](experience-taxonomy.json) passes
the repository's official taxonomy verifier with 343 mappings.

This does not make the corpus release-ready. The 2026-08-27 aggregate v0.2 run
still reports `status: fail` and `accepted_projection_ref: null` because of
evidence-corpus failures including breadth targets, duplicate identities and
canonical URLs, missing sources, nonconforming source rows, quotation and rights
boundaries, and unmapped industries. Taxonomy activation and corpus projection
acceptance remain separate gates.

## Coverage is not promotion

Meeting five observed states establishes comparative coverage only. It does not make a batch controlled-corpus eligible or a product pattern reusable. Controlled pattern synthesis separately requires a conforming typed acquisition manifest, established signed-out ephemeral profile isolation, current runtime and external-research grants, source/observation normalization, rights review, similarity review, complete clean lineage, and two qualified reviewers.

Chrome extension research in a normal user profile remains evidence-only. Never infer profile isolation from signed-out page appearance.

## Review-only pattern hypotheses

Per-batch `pattern-candidates.jsonl` files are informal research notes. They do not count as cross-product patterns and cannot enter prompts, training, benchmarks, or approved guidance.

`scripts/compile-public-product-pattern-hypotheses.mjs` is the sole aggregate hypothesis queue for this experimental corpus. It considers only qualified, directly observed UI evidence from products that meet the five-state coverage threshold. A structural signature is emitted only when it is independently supported by at least five companies, five products, and three normalized industries. The output contains structural coordinates and opaque evidence refs, never copied wording or company names. Every result remains unreviewed, non-promotable, and authority-free. Human reviewers must use the existing typed `ContentPattern` and `PatternDisposition` path for any later promotion.

`scripts/review-public-product-pattern-hypotheses.mjs` creates the corresponding quality-review tasks and adjudicates closed reviewer records. Two distinct reviewers claiming the `qualified_content_designer` qualification must independently assess state accuracy, user-goal alignment, clarity, actionable recovery, accessibility, localization transferability, evidence quality, counterexample coverage, and rights-safe abstraction. Any failed dimension rejects the hypothesis; any insufficient dimension holds it for more evidence. Unanimous passes make it only `ready_for_canonical_authoring`. Reviewer qualification, the pattern mechanism, contexts, counterexamples, rights, similarity, lineage, and project approval must still be independently verified by the canonical research contracts. The review queue cannot create a pattern or authorize writing by itself.

## Aggregate gate

The deterministic [2026-08-27 remediation plan](remediation/2026-08-27-verifier-failure-inventory.json)
binds the current v0.2 failures to explicit repair lanes. Because raw batches
are immutable, canonical and shape repairs require corrected replacement records
in a new batch followed by reviewed supersession dispositions. Rejecting invalid
records alone is not sufficient because it would deepen the breadth deficit.

The preserved [corrected batch-77 candidate](remediation/corrected-replacement-batch-77/manifest.json)
contains 495 exact-schema, canonical, unique-URL sources and 425 canonically
rebound observations. Its reviewed records were activated as immutable
[batch 77](2026-08-27-batch-77/); 920 defective historical records
were superseded and 1,090 conflicting or rights-sensitive records were held.
The compound DoorDash and Verizon industry values were then split by product
context in immutable [batch 78](2026-08-27-batch-78/), with 31
additional reviewed supersession dispositions.

The v0.2 verifier checkpoint after batch 83 has 178 remaining errors: 175
products below the five-direct-state target and one gap each for company,
product, and industry breadth. Duplicate identities and URLs, malformed or
non-canonical rows, missing source projections, rights and quotation boundary
failures, and unmapped industries are absent from the governed projection.
The raw historical rows remain immutable and untrusted; only the reviewed
projection receives this result. The WebMCP workbench remains a read-only
inspection surface with `authority_effect: "none"` and cannot mutate,
approve, release, publish, or change these dispositions.

The deterministic [direct-state coverage backlog](remediation/2026-08-27-direct-state-coverage-backlog.json)
orders the remaining 175 products by collection effort. Alaska Airlines is one
state short, seven other products are two states short, 13 have partial
evidence but need more than two states, and 154 have no qualifying direct UI
evidence. After the signed-out Canada.ca processing-time and validation
observations in immutable batch 82, closing the existing-product coverage gap
and the Service NSW NDIS status observation in batch 83, closing the
existing-product coverage gap requires 829 additional independently sourced
direct states. Canada.ca is the first product meeting the five-state target.
Alaska Airlines and Service NSW each have four covered slots and need one
error/recovery or success state. This
queue is a collection plan with no approval effect; it explicitly forbids
inference, duplication, invented copy, and WebMCP-derived authority.

The review-only [batch 84 normalization candidate](remediation/batch-84-review-candidate/manifest.json)
reproduces the complete ledger-active projection—498 sources and 429
observations—without changing an activated batch. It changes only
`observed_vs_inferred` for 208 observations whose legacy marker unambiguously
states that the content was observed and whose bound source is `actual UI`.
Three mixed or vague markers remain unchanged and are listed in the
[normalization audit](remediation/batch-84-review-candidate/normalization-audit.json).
The isolated replacement projection has no candidate-specific errors and
recognizes 215 direct slots across 130 products, compared with 51 slots in the
current active projection. It does not reduce the 175 under-covered-product
errors because no additional product yet reaches five distinct slots. Ade's
[content review](reviewer-assignments/ade-batch-84-observed-ui-normalization-review.json)
and Ola's [taxonomy review](reviewer-assignments/ola-batch-84-observed-ui-normalization-review.json)
remain blank; the candidate cannot be activated until both are completed and
every replaced active subject is superseded atomically through the governed
ledger.

To avoid order-dependent activation of the separate Alaska and normalization
replacements, the [batch 85 unified candidate](remediation/batch-85-unified-review-candidate/manifest.json)
combines both into one complete replacement projection. Its isolated verifier
run has zero candidate-specific errors, recognizes 216 direct slots across 130
products, makes Alaska the second product to meet the five-state threshold, and
reduces the projected gate to 177 errors with 174 under-covered products. The
resulting [post-replacement backlog](remediation/2026-08-27-post-unified-replacement-direct-state-coverage-backlog.json)
requires 664 additional distinct states rather than the active projection's
829. The earlier batch 81 and batch 84 review packets are therefore retained as
audit history but should not be completed or activated separately. The current
independent handoffs are [Ade's unified review](reviewer-assignments/ade-batch-85-unified-replacement-review.json)
and [Ola's unified review](reviewer-assignments/ola-batch-85-unified-replacement-review.json).

The next additive collection tranche is also review-only. The
[Service NSW validation candidate](remediation/batch-86-review-candidate/manifest.json)
captures required-field recovery on the public MyServiceNSW login reached from
the NDIS Worker Check route. Overlaid on batch 85, it makes Service NSW the
third five-state product and projects 176 total errors with 173 under-covered
products. The [GitHub recovery candidate](remediation/batch-87-review-candidate/manifest.json)
adds a fourth direct slot for GitHub account access without submitting an email
or triggering an external message. Both have zero candidate-specific verifier
errors and blank Ade/Ola review assignments. The
[collection-attempt log](remediation/2026-08-27-collection-attempts.json) also
records the rejected Aflac attempt: its empty login state exposed no validation,
and no fabricated credential was submitted to manufacture one.

The [GOV.UK Passport candidate](remediation/batch-88-review-candidate/manifest.json)
adds three directly observed public states: the passport service landing, the
HM Passport Office help index, and an enquiry-form validation error with both a
linked error summary and inline message. Combined with the existing task and
tracking slots, this makes Passport service the fourth projected five-state
product. The four-candidate overlay now has 175 breadth-only errors, 172
under-covered products, 221 direct slots, and no candidate-specific errors.
The refreshed [post-tranche backlog](remediation/2026-08-27-post-tranche-direct-state-coverage-backlog.json)
requires 659 additional distinct states. Its projection includes candidates
85 through 88; none of those candidates is active until its blank Ade and Ola
reviews are independently completed and the governed activation succeeds.
The [current remediation review handoff](reviewer-assignments/current-corpus-remediation-handoff.md)
now contains only the live Ade and Ola reviews for consolidated batch 91. It
retires the separate batch 81, 84, and 85 through 90 handoffs from the active
review path while preserving them as audit history.

Two further additive validation candidates extend the safe signed-out tranche.
The [Headspace candidate](remediation/batch-89-review-candidate/manifest.json)
records the live `Identifier is required` alert after empty Continue, without
providing an identifier or accepting terms. The
[Cleveland Clinic candidate](remediation/batch-90-review-candidate/manifest.json)
records one representative required-field message from an empty public
appointment request, before CAPTCHA and without personal or health data; the
other field messages are deliberately not duplicated as separate states. Each
product moves from three to four projected slots. The latest overlay recognizes
223 direct slots with no candidate-specific errors, while the
[batch-91 backlog](remediation/2026-08-27-post-batch-91-direct-state-coverage-backlog.json)
requires 657 additional states across 172 under-covered products. Those six
candidates are consolidated into the
[batch 91 replacement](remediation/batch-91-consolidated-review-candidate/manifest.json):
505 unique sources and canonical URLs, 437 unique source-bound observations,
223 direct slots, four complete products, and zero candidate-specific errors.
Its [activation preview](remediation/batch-91-consolidated-review-candidate/activation-preview.json)
maps all 927 currently active subjects to exact replacements: 925 by stable
record ID, the Alaska source by canonical URL, and the Alaska tracking
observation by structural signature plus exact wording. Fifteen genuinely new
subjects remain additive. The preview performs no mutation and issues no
receipt; a passing governed review pair is still required before one atomic
supersession can be created.

The deterministic [taxonomy capacity analysis](remediation/2026-08-27-taxonomy-capacity-gap.json)
shows why the next breadth tranche cannot be solved by relabeling. All 172
under-covered products lack a success slot, but the reviewed taxonomy has only
one success mapping. Progress is missing for 171 products and has nine reviewed
mappings; error/recovery is missing for 169 and has eight. GitHub account
access, Headspace wellbeing, and Cleveland Clinic care access are each at four
slots and require a genuinely observed progress or success state. A new state
whose raw signature does not match an existing mapping must enter a separate
evidence-bound taxonomy amendment review; it cannot borrow a superficially
similar mapping.

`scripts/activate-public-product-batch91.mjs` is the only prepared activation
path for this candidate. It validates both reviewer-bound returns, reuses the
current governed Ola `corpus_steward` and Ade
`independent_corpus_reviewer` qualifications, reconstructs all 927 transitions,
issues the two set-bound receipts in memory, verifies the append-only ledger and
full projected corpus, and defaults to `verified_no_mutation`. The `--apply`
form reaches filesystem writes only after the same preflight succeeds. Its
fail-closed regression test confirms that the current blank reviews cannot
create batch 91 or mutate governance.

The subsequent [batch 92 additive candidate](remediation/batch-92-review-candidate/manifest.json)
records three more directly observed support indexes: 1Password Support,
Airbnb's role-tabbed All topics library, and Statuspage resources. The Adobe
Creative Cloud URL inspected in the same tranche rendered a 404 and was
excluded from positive support evidence. Against batch 91, the verified overlay
has 226 direct slots, zero candidate-specific errors, and still 172
under-covered products; the refreshed
[post-batch-92 backlog](remediation/2026-08-27-post-batch-92-direct-state-coverage-backlog.json)
requires 654 additional states. Batch 92 is evidence only and is neither active
nor approved.

The [batch 93 taxonomy candidate](remediation/batch-93-review-candidate/manifest.json)
records a local-only completion on 1Password's public password generator. The
retained wording is only `Generated password`; the generated value itself was
not retained, copied, saved, submitted, or transmitted. Its raw signature is
intentionally unmapped in the current taxonomy, so the pre-review overlay has
one `taxonomy_unmapped` error and no coverage increase. The proposed success
mapping requires separate Ade content-design and Ola taxonomy-steward decisions
before a successor taxonomy or consolidated evidence replacement can be built.
Operational service-status pages, Airbnb's unresolved earnings placeholder,
and a non-inspectable 1Password sign-in route were explicitly rejected as
shortcuts in the collection-attempt log.

The current [remediation completion audit](remediation/2026-08-27-remediation-completion-audit.json)
keeps immutable-history diagnostics separate from active-projection defects.
The official v0.2 active projection has no duplicate, missing-source,
malformed-row, rights-boundary, or unmapped-industry errors. It is not complete:
175 active products remain below the state target, all three corpus breadth
targets fail, and the cleaner candidate projection still requires 654 distinct
states plus independent review and governed activation.

The [product-system fragmentation candidate](remediation/2026-08-27-product-system-fragmentation-review-candidate.json)
tests another breadth-quality failure: pricing pages, support journeys, entry
labels, and casing variants were counted as separate products even though the
corpus rules prohibit minor variants from substituting for product breadth. Its
31 conservative aliases would reduce the honest projected product count from
176 to 145 and under-covered products from 172 to 141, while leaving the four
complete products unchanged. Ambiguous feature and subsystem labels—including
Slack huddles, Shopify orders, and Google Workspace export—are deliberately
excluded. This is a review candidate only; it performs no mutation and does not
claim that a smaller denominator completes breadth.

The [batch 94 taxonomy candidate](remediation/batch-94-review-candidate/manifest.json)
captures a directly observed Headspace meditation in progress. A local play
action advanced the accessible player from 0:00 to 0:16 of 1:00; playback was
then paused, and no audio content, account data, subscription action, or
external mutation was retained. The proposed `meditation playing` signature is
intentionally unmapped pending Ade and Ola review. If governed into a successor
taxonomy, it would add Headspace's missing progress slot and move that product
from four to five canonical states. Until then, the overlay reports two
expected unmapped signatures—batches 93 and 94—and no coverage increase from
either.

The [batch 95 taxonomy candidate](remediation/batch-95-review-candidate/manifest.json)
captures a completed, generic Cleveland Clinic provider search. The public
interface reported `Loading Complete` and `336 providers found for
"cardiology"`. No provider record was retained or selected, and no phone,
appointment, account, or clinical-advice action followed. Its proposed success
mapping covers provider discovery only—not appointment completion. If
independently reviewed and governed into a successor taxonomy, Cleveland Clinic
care access would move from four to five states. The current pre-review overlay
therefore contains three expected unmapped signatures across batches 93–95.

The [batch 96 taxonomy candidate](remediation/batch-96-review-candidate/manifest.json)
captures a paired Khan Academy state transition on one public arithmetic item:
`Not quite!` with retry and step recovery after an incorrect generic response,
then `Nice work!` and Next question after correction. Only strictly necessary
cookies were retained; no account or durable learner progress was used or
claimed. The error and success mappings are independently reviewable. If both
enter a governed successor taxonomy, Khan Academy learning would move from
three to five states. The full pre-review overlay now has five expected
unmapped signatures across batches 93–96 and no coverage credit for them yet.

The deterministic [post-proposal coverage preview](remediation/2026-08-27-post-taxonomy-proposal-coverage-preview.json)
applies the seven proposed mappings by exact raw signature in memory only. If
every proposal passed independent review, direct slots would rise from 226 to
233, complete products from four to eight, under-covered products would fall
from 172 to 168, and remaining state needs from 654 to 647. The affected
products are exactly 1Password, Statuspage, Headspace, Cleveland Clinic, and
Khan Academy; all except Statuspage reach five states. This preview creates no taxonomy
version, digest, receipt, disposition, or activation authority.

The [batch 97 candidate](remediation/batch-97-review-candidate/manifest.json) is
marked high risk. An empty public Statuspage email submission changed the
primary action to `Subscribing...` and remained unresolved; no email,
subscription, or notification existed, and the dialog was closed. Reviewers
must reject it if a stuck invalid-input transition should be treated only as a
validation defect rather than canonical progress. If accepted, Statuspage would
move from three to four states. The combined preview now overlays eight proposals:
258 direct slots, nine complete products, 167 under-covered products, and 622
remaining states if all pass.

All evidence through batch 97 is now assembled in the
[batch 98 consolidated review candidate](remediation/batch-98-consolidated-review-candidate/manifest.json):
513 unique sources and canonical URLs and 446 unique, source-bound
observations. Under the active taxonomy it has 226 direct slots and exactly six
unmapped observations—the six separately reviewed proposals—with no unexpected
candidate errors. Batch 98 is a review projection, not an activation target.
After decisions, rejected-mapping observations must be omitted or held in a new
immutable final candidate, passing mappings must enter a governed successor
taxonomy, and a fresh supersession preview and activator must be prepared. The
historical batch-91 activator cannot be reused for batch 98.

The post-consolidation [batch 99 candidate](remediation/batch-99-review-candidate/manifest.json)
adds 1Password's directly observed `404: Page Not Found` state. It reuses the
batch-79 page-not-found proposal, now supported by both Canada.ca and 1Password
evidence, rather than inventing a company-specific mapping. If that shared
mapping and batch 93's password-generation mapping both pass, 1Password
security moves from three to five states. Batch 99 remains additive review
evidence and must be explicitly included in the post-decision final candidate.

The additive [batch 100 candidate](remediation/batch-100-review-candidate/manifest.json)
adds directly observed, branded page-not-found recovery states for Aflac, Cisco
Duo, and Yubico. It creates no new mapping: all three observations reuse the
same exact batch-79 raw signature and are bound with Canada.ca and 1Password in
the successor five-evidence review packet. Airbnb was excluded because the page
did not render verifiably; Statuspage was excluded because the browser blocked
the target before any product UI rendered. Under the active taxonomy the three
new observations remain non-counting. If the shared mapping passes, each product
moves from three to four direct states.

The additive [batch 101 candidate](remediation/batch-101-review-candidate/manifest.json)
captures a directly observed completed YubiKey product recommendation after four
generic, non-personal chooser selections. It proposes one new success signature,
bounded to chooser completion; it does not claim purchase, setup, compatibility,
or authentication success. If both the shared page-not-found mapping and this
success mapping pass, YubiKey authentication moves from three to five states.

The additive [batch 102 candidate](remediation/batch-102-review-candidate/manifest.json)
adds directly observed, branded page-not-found recovery states for Auth0,
Cloudflare, Canva, and Dropbox. It extends the shared packet to nine interfaces
without adding another mapping. Box is recorded as a failed attempt because its
nonexistent path redirected to the homepage without rendering a product failure.

The additive [batch 103 candidate](remediation/batch-103-review-candidate/manifest.json)
adds recoverable page-not-found states for Etsy, Spotify, eBay, and Webflow,
extending the shared packet to thirteen interfaces without adding a mapping.
Duolingo, Figma, Notion, and Pinterest are logged as failed attempts because
their surfaces lacked actionable, verifiable failure UI.

The additive [batch 104 candidate](remediation/batch-104-review-candidate/manifest.json)
adds directly observed public support indexes for Etsy, Spotify, eBay, and
Webflow. These observations match the existing reviewed help-route-index
signature exactly, so no taxonomy amendment is proposed. They still require
independent evidence review and governed consolidation before activation.

The additive [batch 105 candidate](remediation/batch-105-review-candidate/manifest.json)
adds public support indexes for Cloudflare and Dropbox under the same reviewed
signature. Auth0 documentation was excluded because it is a documentation hub,
not a support-route index. Canva was excluded after verification exposed an
existing canonical Help Center source with a different classification; it now
requires governed normalization or supersession instead of a duplicate row.

The [batch 106 Canva Help Center normalization candidate](remediation/batch-106-canva-help-normalization-candidate/manifest.json)
implements that correction as an exact-digest atomic replacement. It supersedes
the existing guidance-classified `Canva support` source and generic entry
observation while introducing a directly observed `actual UI` help-route index
under canonical `Canva`. Its full candidate-stack projection has zero unexpected
errors and 240 active-taxonomy direct slots. It is intentionally excluded from
the additive combined preview because the old and replacement canonical rows
must never coexist.

The additive [batch 107 candidate](remediation/batch-107-review-candidate/manifest.json)
adds directly observed help indexes for canonical Figma and Netflix streaming
using the reviewed help-route-index signature. Duolingo, Uber, and Lyft were
excluded because the inspected surfaces respectively lacked usable UI, crossed
the `Uber rides` product boundary, or rendered a not-found state instead of a
support index.

The additive [batch 108 candidate](remediation/batch-108-review-candidate/manifest.json)
adds directly observed help indexes for Mailchimp marketing and Wise money
transfer using the reviewed support signature. Pinterest and LinkedIn were
excluded because their observed help pages exposed signed-in personalization;
Square was excluded because the portfolio-wide support center does not match
the narrower `Square pricing` corpus product.

The independently passed [batch 109 candidate](remediation/batch-109-review-candidate/manifest.json)
adds directly observed support indexes for Khan Academy learning, edX learning,
monday.com, and Box using the existing reviewed help-route-index signature.
Airbnb was excluded because equivalent governed support-index evidence already
exists. The batch grants no activation authority and must enter a new immutable
successor candidate before it can affect the active corpus.

The review-only [batch 81 replacement candidate](remediation/batch-81-review-candidate/manifest.json)
adds the observed empty-route validation error from the same Alaska flight
status surface. Against the batch-82 baseline, its isolated projection is clean
and would reduce the official gate from 178 to 177 errors, reduce under-covered
products from 175 to 174, and make Alaska Airlines the second product to meet
the five-state target. It is not
active: batch 80 and its canonical URL must be superseded atomically after
independent review.
Each assignment now carries its covered and missing canonical coverage slots,
the number of reviewed taxonomy mappings available for each missing slot, and
the existing actual-UI entry URLs. For the remaining near-complete products, entry,
core-task, and support are already covered; pending/progress, error/recovery,
and success remain missing. The queue prioritizes pending/progress and
error/recovery because the current reviewed taxonomy has nine and eight
classifiable mappings respectively, compared with only one success mapping.

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
