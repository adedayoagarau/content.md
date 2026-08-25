# Experience taxonomy review brief

## Purpose

This is the handoff for reviewing the **343 exact raw structural signatures**
currently present in the immutable public-product corpus. It does not create a
taxonomy, mapping, review receipt, disposition, pattern, prompt input, or
learning input.

The review task is to determine whether a proposed normalization is defensible
from the supplied opaque evidence references and, when it is not, to hold or
reject it. Public-product evidence remains comparative only:

```text
authority_effect: none
prompt_eligibility: never
training_eligibility: never
benchmark_eligibility: false
```

## Inputs and frozen queue

Generate the current queue from the repository root. The command is
deterministic and must be rerun if the immutable baseline or migration plan is
superseded.

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  scripts/generate-public-product-taxonomy-review-packet.mjs \
  --root research/09-experimental/public-product-corpus \
  --out /absolute/path/to/taxonomy-review-packet.json
```

The current packet is expected to bind migration-plan digest
`31e88894f5ed605fe89210c440903a34f2a094b2a8cbeea0594a57233f32eb8b`
and contain 343 work units. Its deterministic coverage-slot candidates only
preserve an exact raw-journey match; they do **not** propose the other four
normalized coordinates and are not an approval shortcut.

Treat the packet as a work queue, not as evidence of a mapping. Each unit
contains its exact raw signature and opaque evidence references. Do not copy
public wording into the decision material or add product/company claims that
the evidence does not support.

## Required reviewers

Every proposed `ExperienceMapping` needs exactly two independently qualified
reviews, in this fixed role order:

1. `qualified_content_designer`
2. `taxonomy_steward`

The reviewer identities must differ. A stated role, model output, workflow
approval, or SDK identity is not a qualification. The eventual receipt must
resolve each reviewer's current, unrevoked qualification and the related
governance replay at the review time and the projection `as_of` time.

If either qualified reviewer is unavailable, the work unit remains
`unreviewed` or `held`; do not substitute a self-review or invent a receipt.

## Per-signature decision

For each raw signature, the coordinator may prepare a proposal containing:

- the unchanged `raw_signature`;
- a proposed five-coordinate `normalized_signature` only when supported;
- a concise abstraction rationale, without third-party wording;
- opaque counterexample references where they limit the mapping; and
- an explicit recommendation to pass, fail, or mark insufficient.

Reviewers independently assess the following ordered mapping checklist:

1. `raw_state_accuracy`
2. `coverage_slot_fit`
3. `journey_family_fit`
4. `state_class_fit`
5. `content_slot_fit`
6. `channel_fit`
7. `counterexample_sufficiency`
8. `industry_neutrality`
9. `localization_transferability`
10. `rights_safe_abstraction`

For a passing review, every item is `pass`. Any `fail` rejects the proposal;
any `insufficient` holds it for more evidence. Do not infer a normalized ID
through trimming, case-folding, translation, embeddings, fuzzy matching, or an
LLM. Runtime matching remains exact raw-string lookup.

## Receipt handoff

The authorised governance coordinator, not a reviewer brief or an automation,
creates the portable receipt. It must bind the mapping material digest—not a
mapping ID that already includes its receipts—and use:

```text
review_kind: taxonomy_mapping
checklist_version: contentmd.public-product-review-checklist.taxonomy-mapping/0.1.0
decision: pass | fail | insufficient
```

The receipt also binds the reviewer and qualification refs, ordered checklist
results, review time, and its derived ID/digest. Store only issued, digest-valid
receipts in `public-product-review-receipts.jsonl` with the complete governing
qualification evidence and authorization replays. A proposal, note, or approval
event is not a receipt and has no taxonomy effect.

## Taxonomy version gate

After every mapping has a valid passing pair, the entire proposed taxonomy
requires two further independent reviews in the same role order. The fixed
version checklist is:

1. `definition_completeness`
2. `semantic_id_stability`
3. `mapping_set_completeness`
4. `previous_version_compatibility`
5. `effective_time_validity`
6. `review_closure`
7. `no_authority_or_learning_widening`

Only then may the governed coordinator issue an effective
`experience-taxonomy.json`. Mapping reviews alone do not activate v0.2.

## Out of scope and next handoff

This review does not resolve the existing corpus findings. Those move through
immutable reviewed disposition sets and append-only disposition events after
the taxonomy is effective. It also does not build the product exploration or
search interface; that work starts only from a verified active v0.2 projection.

Return to the coordinator:

- the packet digest reviewed;
- a proposal or hold/reject result for each assigned work-unit ID;
- the reviewer identity and qualified role used for each independent review;
- opaque evidence and counterexample refs actually inspected; and
- explicit missing-evidence or governance blockers.

Never return copied UI text as a taxonomy label, training datum, benchmark,
prompt material, or product requirement.
