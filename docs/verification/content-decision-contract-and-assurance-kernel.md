# Content Decision Contract and Universal Assurance Kernel

Status: implemented `0.1.0` development contract; English-only; shadow/proposal authority; not production approval

Date: 2026-09-21

## Decision

Content design should not move directly from a product description to generated copy. It should produce an explicit, evidence-bound decision contract, perform the stage work against that contract, and evaluate the result with criterion-level assurance before transitioning.

```text
evidence and product context
            |
            v
CLASSIFY — what is known, proposed, unknown, conflicting, or not applicable?
            |
            v
DECIDE — what intervention is justified?
            |
            +--> no content change
            +--> remove or restructure content
            +--> change the interaction or product behavior
            +--> research, policy, or specialist decision required
            `--> create or revise content
            |
            v
CONTRACT — preserve needs, facts, invariants, actions, expression policy, and acceptance criteria
            |
            v
STAGE WORK — discover, frame, model, decide, specify, design, write, review, implement,
             verify, measure, maintain, or retire
            |
            v
ASSURE — evaluate each applicable criterion; do not average unlike failures
            |
            v
proceed | revise | reject | test | abstain | escalate
```

The same loop can run at every stage. Classification tells the stage what rules and evidence apply; assurance determines whether the stage output can transition. A later stage can supersede an earlier contract without silently rewriting its provenance.

## What content design classifies

The contract requires one explicit result for each of 14 independent dimensions:

| Dimension | Decision it informs |
| --- | --- |
| `work_intent` | What kind of content-design work is being requested? |
| `product_context` | Which product, capability, state model, and constraints matter? |
| `evidence_authority` | What is documented, observed, proposed, approved, implemented, or unknown? |
| `user_context` | Who is acting, under what conditions, with what prior knowledge or constraints? |
| `user_need` | What must the user understand, decide, do, or recover from? |
| `product_need` | What product outcome, behavior, or operational condition is needed? |
| `content_need` | What communication job, if any, remains after product and interaction decisions? |
| `experience` | Which journey, task, state, pattern, and scope coordinate applies? |
| `content_object` | What artifact, slot, component, system, or body of content is affected? |
| `risk` | What harm, consequence, reversibility, or uncertainty changes the review path? |
| `governance` | Who owns, decides, approves, implements, and maintains the result? |
| `voice_profile` | Is an eligible, scoped voice profile approved, proposed, missing, or irrelevant? |
| `tone_context` | What situation-specific expression constraints may apply after hard gates pass? |
| `lifecycle` | Is the artifact being introduced, changed, measured, maintained, or retired? |

Every dimension is present even when the result is `unknown` or `not_applicable`. This prevents missing context from disappearing into a confident-looking composite label.

Each result preserves:

- status: `established`, `proposed`, `unknown`, `conflicting`, or `not_applicable`
- one selected label or, for conflict, competing candidate labels
- evidence references and rationale
- method: deterministic rule, model, human, or hybrid
- the versioned method reference

A model may propose a classification or intervention. It cannot mark one `established` or `decided` by itself. That is a contract invariant, not a prompt instruction.

## What happens after classification

Classification is not the decision. The next operation is intervention selection:

1. Reconcile user, product, and content needs separately.
2. Determine whether content is the right lever.
3. Select the intervention and preserve its evidence and authority state.
4. If content work is justified, specify the semantic contract before expression.
5. Bind the work to assurance criteria, overlays, and acceptance evidence.

The intervention vocabulary deliberately includes:

- `no_content_change`
- `remove_content`
- `restructure_content`
- `change_interaction`
- `change_product_behavior`
- `create_or_revise_content`
- `research_required`
- `policy_decision_required`
- `specialist_review_required`
- `undecided`

This avoids a common failure mode: treating every intake as a copy request and polishing language around an unresolved product or interaction problem.

## Content Decision Contract

The machine-readable contract is implemented in `packages/evaluation/src/content-decision-contract.ts`.

| Contract section | Preserved decision material |
| --- | --- |
| Stage and subject | Stage, product, surface, channel, and canonical English locale |
| Classifications | All 14 dimensions with status, provenance, rationale, and method |
| Needs | Separate user, product, and content need statements |
| Intervention | The selected or proposed lever, including non-content outcomes |
| Semantic contract | Intended outcome, required facts, invariants, prohibited claims, action contracts, and ordered information requirements |
| Expression policy | Eligible voice state, tone-policy references, controlled terminology, accessibility requirements, and channel constraints |
| Assurance plan | Core criterion IDs, contextual overlays, acceptance criteria, and specialist requirements |
| Decision state | Unresolved questions and an optional superseded-contract digest |

Content-producing work at `specify`, `design`, `write`, `review`, `implement`, or `verify` cannot proceed with an empty fact set or no semantic invariant. A product-change decision can remain valid without inventing a copy specification.

The constructor:

- accepts only `en` or an English BCP 47 variant such as `en-US` or `en-GB`
- normalizes semantically unordered arrays before hashing
- preserves the order of information requirements because sequence can carry meaning
- rejects duplicate IDs and incomplete dimension sets
- emits a deterministic ID and SHA-256 contract digest
- deeply freezes the output
- sets `authority_effect: "none"`

`verifyContentDecisionContract` replays construction and detects structural or digest tampering.

## Universal Assurance Kernel

“Universal” means a stable set of questions that every content-design system can route, not a claim that one threshold, metric, or reviewer works for every product. Contextual overlays still add legal, safety, domain, product, channel, market, and organization-specific requirements.

The kernel is implemented in `packages/evaluation/src/universal-assurance-kernel.ts`.

| Criterion | Plane | Default review type | Core question |
| --- | --- | --- | --- |
| Evidence and authority | Hard | Human judgment | Are claims and decisions supported at the authority level asserted? |
| Need and intervention fit | Hard | Human judgment | Is content the right intervention for the evidenced needs? |
| Product and state truth | Hard | Deterministic | Is the artifact true for the represented behavior and state? |
| Semantic sufficiency | Hard | Human judgment | Are all material facts, distinctions, and consequences preserved? |
| Structure and findability | Advisory | Human judgment | Can users find and scan the information at the point of need? |
| Material comprehension | Hard | Research | Is there evidence of required understanding rather than readability alone? |
| Actionability and recovery | Hard | Deterministic | Can the user act or recover safely without ambiguity or unsafe repetition? |
| Agency and ethics | Hard | Specialist | Are choices informed, voluntary, fair, and free of manipulative framing? |
| Accessibility and inclusion | Hard | Specialist | Is meaning and action available across the applicable access needs? |
| Channel and system fit | Hard | Deterministic | Will the artifact remain complete and usable in the delivery system? |
| Voice, tone, and terminology fit | Advisory | Preference | After hard gates pass, is expression eligible and contextually appropriate? |
| Governance and lifecycle | Hard | Specialist | Are ownership, approval, implementation, maintenance, and retirement explicit? |

The plane is a minimum treatment. A contextual overlay may strengthen an advisory concern into a hard requirement for a particular task; it must not weaken a hard kernel criterion.

### Why hard and advisory planes are separate

Truth, meaning, recovery, accessibility, and agency are not interchangeable with stylistic preference. A warm, concise, on-brand message cannot compensate for an unsupported outcome claim or an unsafe retry instruction. The evaluator therefore emits no aggregate score.

Voice and tone are evaluated only after the hard plane passes. This does not make expression unimportant. It prevents expression quality from hiding a more consequential defect.

### Criterion results preserve missingness

Each applicable criterion returns one of:

- `pass`
- `fail`
- `unknown`
- `not_observed`
- `conflicting_evidence`
- `unable_to_evaluate`

The stage router adds `not_applicable` for criteria outside the current stage. Missing assessments become `not_observed`; they are never silently treated as passes. Passes, failures, and conflicting-evidence results require evidence references. A failure also requires an explicit `revise` or `reject` disposition.

### Deterministic transition policy

| Condition | Transition |
| --- | --- |
| A hard failure is explicitly unrecoverable or impermissible | `reject` |
| Any other hard failure | `revise` |
| A hard specialist criterion remains unresolved | `escalate` |
| Another hard criterion remains unresolved | `abstain` |
| Hard plane passes and an advisory criterion fails | `revise` |
| Hard plane passes and an advisory criterion remains unresolved | `test` |
| Every applicable criterion passes | `proceed` |

Advisory evaluation is reported as `not_evaluated` while the hard plane is failed or unresolved. Criterion-level observations are retained for audit, but the system does not use them to compensate for the block.

## Stage routing

Not every criterion is meaningful at every stage. The code stores explicit stage applicability and `requiredAssuranceCriterionIds(stage)` returns the ordered minimum set. Examples:

- `discover` emphasizes evidence, needs, and governance.
- `model` adds product truth, semantic structure, findability, agency, accessibility, and system fit.
- `decide` adds intervention fit, material comprehension, action/recovery, and specialist gates.
- `specify` through `review` invokes the full kernel.
- `implement` and `verify` recheck rendered-system fit and preserved semantics.
- `measure` asks whether the intervention worked, including comprehension and accessibility.
- `maintain` checks whether facts, systems, expression policies, and approvals remain current.
- `retire` checks findability, recovery, ownership, and the consequences of removal.

The Content Decision Contract must declare every core criterion required for its current stage. The evaluator rejects an incomplete plan before interpreting assessments.

## Contextual overlays

The kernel is necessary but not sufficient. The first independently versioned overlay registry is implemented in `packages/evaluation/src/contextual-assurance-overlays.ts`:

```text
universal kernel
  + product and state overlay
  + interaction-pattern overlay
  + consequence-risk overlay
  + accessibility or specialist overlay
  + channel and component overlay
  + approved organization voice and terminology overlay
  = task assurance plan
```

An overlay may add criteria, evidence requirements, reviewers, or stricter transition rules. It must preserve kernel results rather than replace them with one opaque quality score.

The `0.1.0` registry covers product outcome uncertainty, irreversible actions, commitment interactions, out-of-app channels, dynamic status accessibility, and approval-bound governance. Classifications route overlays; they do not pass their criteria. Unknown trigger inputs stay unresolved, selected overlays must appear in the contract's assurance plan, and missing specialist observations escalate rather than becoming implicit passes.

All six registry entries remain `proposed` with `authority_effect: "none"`. They therefore bind as provisional evaluation requirements, not as production policy or approval. The combined evaluator preserves both universal and contextual criterion results and applies the stricter transition without computing an aggregate score.

## Tone-construct reconciliation

The supplied sources are now recorded in `packages/research/src/tone-construct-reconciliation.ts` as candidate construct inputs, not adopted as universal dimensions or approval evidence:

- [Nielsen Norman Group, “The Four Dimensions of Tone of Voice”](https://www.nngroup.com/articles/tone-of-voice-dimensions/) describes four paired spectra: formal–casual, serious–funny, respectful–irreverent, and matter-of-fact–enthusiastic. It distinguishes a relatively stable brand personality from tone that varies by context and reports a bounded study with 50 US participants. This is useful for candidate-feature generation and counterexamples, not sufficient to establish cross-product or cross-variant calibration.
- [Rachael Harwood, “Voice chart: put one in your UX writing toolkit”](https://medium.com/@rachaelharwood_ux/voice-chart-put-one-in-your-ux-writing-toolkit-08965f0e3b3a) is a practitioner source for operationalizing voice attributes through concepts, vocabulary, wordiness, grammar, punctuation, and capitalization. It is an operational writing aid, not an independent validation study.
- [UX Design Institute, “How to define your tone of voice in UX writing”](https://www.uxdesigninstitute.com/blog/tone-of-voice-for-ux-writing/) is a secondary orientation that distinguishes stable voice from situational tone and summarizes the NN/g dimensions. It is useful for terminology comparison, not independent validation of the construct.
- [The repository's cross-dataset verification](../../research/09-experimental/voice-tone-cross-dataset-verification-2026-08-27/README.md) supports qualitative compatibility with the current nine-feature vocabulary across four first-party guidance systems. It does not establish feature independence, numeric calibration, organization approval, or production fitness.

The reconciliation retains the nine feature IDs for compatibility while recording proposed changes: formality, expressiveness, and information density need rename-or-split review; reassurance remains situation-dependent; actual urgency must be separated from urgency expression; and truthful authority moves to the hard plane before any advisory authority style is considered. Respect for a person and their agency is also kept on the hard plane rather than reduced to the NN/g respectful–irreverent style scale.

Voice profiles, context-bound tone policies, terminology, mechanics, semantic contracts, and assurance remain separate systems. Grammar, punctuation, capitalization, emoji, length, and word choice are candidate observables, not feature scores or ground truth. No numeric values, weights, thresholds, feature promotion, or organization-level claim are introduced.

See [Contextual Assurance Overlays and Tone Construct Reconciliation](contextual-assurance-overlays-and-tone-reconciliation.md) for the routing rules, source-to-construct map, feature dispositions, and validation backlog.

## Verification and limits

Focused tests cover:

- canonical replay and deep immutability
- complete dimension presence and English-only scope
- model proposal boundaries
- semantic requirements for content-producing work
- valid non-content interventions
- contract tamper detection
- hard-before-advisory evaluation
- missingness, abstention, and specialist escalation
- revision, rejection, testing, and proceed transitions
- order-independent assurance replay
- rejection of incomplete assurance plans
- deterministic overlay selection from classifications and structural contract fields
- unresolved, missing, and unexpected overlay routing
- contextual specialist escalation and non-compensable combined decisions
- source-role and construct-mapping integrity for the English tone reconciliation
- rejection of altered reconciliation artifacts

Passing these tests establishes deterministic contract behavior. It does not establish taxonomy completeness, criterion validity, human reliability, user comprehension, English-variant parity, product approval, or production readiness. Those require calibrated examples, qualified adjudication, task-specific evidence, and prospective validation.
