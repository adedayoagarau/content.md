# Post-reconciliation mapping approval guide

Assignments:

- `ade-post-reconciliation-mapping-approval.json` — `qualified_content_designer`
- `ola-post-reconciliation-mapping-approval.json` — `taxonomy_steward`

Each assignment contains the same 343 resolved mappings and is bound to
reconciliation digest
`05cfe1a596b8922225be88d070d481386417165d8d595cf461fed820080794f7`.
Complete the assignments independently; do not inspect the other reviewer's
returned decisions before submitting your own.

For every work unit:

1. Inspect all immutable `evidence_refs` and the supplied reconciliation context.
2. Verify every field in `proposed_normalized_signature` against the evidence
   and closed taxonomy definitions.
3. Set each ordered checklist result to `pass`, `fail`, or `insufficient`.
4. Record a concise rights-safe rationale and any opaque counterexample refs.
5. Set `decision` to `pass` only when all ten checklist items pass. Use `fail`
   when any item fails and `insufficient` when evidence cannot support approval.

Do not rewrite raw evidence or copy public UI wording. If a source correction is
required, assess the mapping while preserving `source_disposition` and the
immutable evidence history.

Set top-level `review_state` to `completed` only after all 343 units are decided,
then recompute `assignment_digest` as SHA-256 of compact `JSON.stringify` over
the complete top-level object with `assignment_digest` omitted.

These approvals close the mapping-review gate only. They do not issue portable
receipts, prove reviewer qualification, complete taxonomy-version review, or
activate v0.2.
