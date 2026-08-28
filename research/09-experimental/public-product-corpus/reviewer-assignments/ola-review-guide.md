# Ola taxonomy steward review guide

Assignment: `ola-taxonomy-steward.json`

Role: `taxonomy_steward`

Review all 343 work units independently. Do not inspect or copy Ade's returned
decisions until this assignment has been completed and returned.

For each work unit:

1. Inspect every `evidence_ref` in the immutable corpus.
2. Confirm or replace the proposed `coverage_slot_id` when present.
3. Complete all five fields in `proposed_normalized_signature` only when the
   evidence supports a stable mapping.
4. Assess taxonomy consistency, semantic-ID stability, category boundaries,
   cross-industry applicability, counterexamples, and localization transfer.
5. Set every checklist result to `pass`, `fail`, or `insufficient`.
6. Add a concise rights-safe `rationale`, relevant opaque
   `counterexample_refs`, and the derived final `decision`.

Use `pass` only when all ten checklist items pass. Use `fail` when any item
fails and `insufficient` when evidence does not support a stable mapping.

Do not copy public UI wording into identifiers or rationale. Do not infer a
mapping through spelling similarity, translation, embeddings, product identity,
or Ade's choices. A held or failed unit is a valid independent result.

Completing this packet produces Ola's recommendation only. Official receipts,
taxonomy assembly, version-level review, and activation remain later steps.
