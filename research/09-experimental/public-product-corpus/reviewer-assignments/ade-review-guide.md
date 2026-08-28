# Ade taxonomy mapping review guide

Assignment: `ade-qualified-content-designer.json`

Role: `qualified_content_designer`

The assignment contains 343 independently reviewable work units. Of these,
202 contain a deterministic coverage-slot candidate derived only from an exact
raw-journey match. The other 141 have no proposed coordinate. No journey-family,
state-class, content-slot-class, or surface-channel ID has been inferred.

For each work unit:

1. Inspect every `evidence_ref` in the immutable corpus.
2. Confirm or replace the proposed `coverage_slot_id` when present.
3. Complete all five fields in `proposed_normalized_signature` only when the
   inspected evidence supports the mapping.
4. Set each ordered checklist result to `pass`, `fail`, or `insufficient`.
5. Record a concise rights-safe abstraction in `rationale` and add opaque
   `counterexample_refs` when they constrain the mapping.
6. Set `decision` to `pass` only when all ten checklist results pass; use
   `fail` for any failed item and `insufficient` when evidence is missing.

Do not copy public UI wording into taxonomy identifiers or rationale. Do not
infer a mapping from spelling similarity, translation, embeddings, or product
identity. A held or failed unit is a valid result.

Completing this assignment records Ade's independent recommendation only. It
does not issue a review receipt or activate the taxonomy. Ola's separate review
and the later version-level reviews remain required.
