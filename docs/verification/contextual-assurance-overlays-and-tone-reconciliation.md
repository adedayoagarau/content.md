# Contextual Assurance Overlays and Tone Construct Reconciliation

Status: implemented `0.1.0` development contracts; English-only; shadow/proposal authority; not production approval

Date: 2026-09-21

## Outcome

The Content Decision Contract can now compile classified context into a deterministic assurance plan and evaluate the selected contextual criteria alongside the Universal Assurance Kernel.

```text
Content Decision Contract
  classifications + semantic actions + channel + expression state
                              |
                              v
                    resolve applicable overlays
                              |
               +--------------+--------------+
               |                             |
       unresolved trigger             selected overlay
               |                             |
            abstain              compare with assurance plan
                                             |
                                 complete | missing | unexpected
                                             |
                                             v
                                  criterion-level evaluation
                                             |
                       universal result + contextual result
                                             |
                         proceed | revise | reject | test
                                  | abstain | escalate
```

Classification only determines which rules may apply. It does not establish that an output satisfies them. Every selected criterion still needs its own evidence-bearing assessment.

## Contextual overlay registry

The registry is implemented in `packages/evaluation/src/contextual-assurance-overlays.ts`. Each overlay has an ID and version, category, lifecycle state, stage applicability, conjunctive trigger clauses, atomic criteria, source references, and approval references.

| Category | Current trigger | Added assurance |
| --- | --- | --- |
| Product | Any action has `unknown` or `partial` outcome evidence | Verification before a consequential retry; truthful update expectation |
| Risk | Any action is irreversible or conditionally reversible | Material consequence before commitment; effective review, confirmation, undo, or recovery behavior |
| Interaction | `experience` is commitment, consent, destructive confirmation, or review-before-submit | Action-label contract; understandable, non-coercive choice hierarchy |
| Channel | Channel is email, SMS, push notification, or voice | Privacy-safe preview; current and consistent cross-channel destination |
| Accessibility | `content_object` is a dynamic status, error, progress indicator, or status message | Programmatic status announcement; nonvisual recovery path |
| Governance | `governance` requires approval, regulation, or specialist review | Current scope-bound approval; separation of approval and delivery state |

These are a bounded starter set, not an assertion that six overlays cover all content-design work. Legal, market, safety, domain, localization, component, and organization-specific overlays remain open work.

### Deterministic resolution

For each active overlay, every trigger clause must match. A definitive non-match excludes the overlay. An unknown or conflicting classification that could determine applicability produces `unresolved`; the resolver does not guess a label or silently exclude the overlay.

The resolver then compares selected overlays with `assurance_plan.overlay_refs`:

- exact coverage and no unresolved triggers → `complete`
- a selected overlay is missing, or an unselected/retired overlay is declared → `incomplete`
- any applicability trigger is unresolved → `blocked`

The resolution records required, provisional, selected, unresolved, missing, and unexpected references independently. Registry order does not affect the canonical result or digest.

All built-in overlays are currently `proposed`, have no approval references, and bind as `provisional`. An approved overlay must carry an approval reference before it can bind as `required`. Neither state grants publication or product authority: every artifact carries `authority_effect: "none"`.

### Criterion evaluation and combination

Contextual criteria use the same evidence statuses and hard/advisory planes as the Universal Assurance Kernel. Missing assessments become `not_observed`. A missing hard specialist assessment escalates; another unresolved hard result abstains; a hard failure revises or rejects. Advisory findings are considered only after the hard plane passes.

The combined decision applies non-compensable precedence:

1. Any hard rejection → `reject`.
2. Another hard failure → `revise`.
3. Unresolved hard specialist evidence → `escalate`.
4. Other unresolved hard evidence or routing → `abstain`.
5. Advisory failure → `revise`.
6. Other advisory finding → `test`.
7. Only complete, passing results → `proceed`.

No aggregate quality score is produced. A favorable voice result cannot offset false product state, missing consent, inaccessible recovery, or absent approval.

## Tone construct reconciliation

The English-only artifact is implemented in `packages/research/src/tone-construct-reconciliation.ts`. It reconciles, but does not merge or adopt, four evidence inputs:

| Source | Evidence role | Supported use | Important limit |
| --- | --- | --- | --- |
| [NN/g: Four Dimensions of Tone of Voice](https://www.nngroup.com/articles/tone-of-voice-dimensions/) | Bounded empirical practitioner source | Candidate dimensions and contextual voice/tone architecture | Small US-only impression study of authored examples; not universal construct or product-outcome validation |
| [Harwood: Voice chart](https://medium.com/@rachaelharwood_ux/voice-chart-put-one-in-your-ux-writing-toolkit-08965f0e3b3a) | Practitioner method | Operational categories and candidate expression markers | Illustrative method; no cross-product effectiveness or calibrated thresholds |
| [UX Design Institute: Tone of voice for UX writing](https://www.uxdesigninstitute.com/blog/tone-of-voice-for-ux-writing/) | Secondary synthesis | Terminology and expression-marker comparison | Repeats NN/g dimensions; not independent dimensional evidence |
| [content.md cross-dataset verification](../../research/09-experimental/voice-tone-cross-dataset-verification-2026-08-27/README.md) | Local evidence synthesis | Qualitative compatibility and architecture support | Four guidance systems, English web content, no human calibration or organization approval |

### Source-to-system mapping

- NN/g `formal–casual` closely corresponds to the current `formality` candidate, subject to clearer register and social-distance boundaries.
- NN/g `serious–funny` closely corresponds to `humor`, but attempted humor does not establish successful, respectful, or safe humor.
- NN/g `respectful–irreverent` remains an open construct. User dignity and agency are hard assurance requirements; stylistic irreverence toward subject matter is a different question.
- NN/g `matter-of-fact–enthusiastic` partially overlaps `expressiveness` and `warmth`; neither is equivalent to enthusiasm.
- Harwood's voice attributes stay in organization voice policy; concepts stay in semantics/content models; vocabulary stays in terminology governance.
- Harwood's wordiness partially informs information-density research, while grammar, punctuation, and capitalization remain separately governed mechanics and candidate observables.
- UX Design Institute's restatement is recorded as secondary evidence rather than counted as another validation of the four dimensions.
- The local cross-dataset study supports retaining the nine IDs for compatibility, not their independence, numeric calibration, or promotion.

### Nine-feature disposition

| Current feature | `0.1.0` disposition | Boundary to test |
| --- | --- | --- |
| Directness | Retain candidate | Direct wording cannot substitute for semantic completeness or a safe action |
| Formality | Rename-or-split review | Separate grammatical register, conversationality, familiarity, and social distance |
| Warmth | Retain candidate | Do not equate warmth with enthusiasm or emotional presumption |
| Reassurance | Situational-policy review | Reassurance must be supported by facts and recovery, not treated as universally positive |
| Expressiveness | Rename-or-split review | Separate energy, emotional intensity, figurative language, and personality |
| Humor | Retain candidate | Evaluate success, respect, consequence, and context—not mere detection |
| Urgency | Split fact from expression | Product evidence establishes real urgency; punctuation or style only expresses it |
| Information density | Rename-or-split review | Separate amount, complexity, redundancy, layering, and density |
| Authority stance | Move role truth to hard-plane review | Establish actor and decision authority before judging optional presentation style |

The artifact deliberately keeps the existing IDs to avoid breaking current records while the constructs are tested. Its status is `candidate_reconciliation_no_promotion`; numeric calibration and construct validity are both `not_established`.

## Validation backlog

Before feature promotion or automated tone decisions:

1. Write atomic definitions with inclusions, exclusions, and near-neighbor counterexamples.
2. Run cognitive interviews before creating numeric scales.
3. Build English scenario pairs across routine, error, pending, denial, consent, destructive, notification, and support contexts.
4. Collect qualified independent judgments while preserving ties, both-unacceptable, insufficient-context, and abstention outcomes.
5. Test candidate observables against human judgments without treating marker counts as ground truth.
6. Validate by context, surface, risk, and English variant.
7. Calibrate transition use separately from descriptive feature labeling.

## Verification boundary

Automated tests establish canonical ordering, digest replay, routing behavior, missingness, specialist escalation, hard-plane precedence, source-role integrity, and mapping references. They do not establish that the overlay taxonomy is complete, that a tone construct is valid, that reviewers agree, that users understand the resulting content, or that any organization has approved the model.
