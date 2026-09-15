# English content-design disagreement pilot

Status: generator and reviewer handoff are ready; qualified human review has
not started.

This pilot selects 100 English-expression cases where the returned Claude and
Cursor audits disagreed. It is for calibrating decision rules, not for measuring
`content.md` effectiveness. All selected source scenarios were already exposed
to external models, so this pilot can never become a formal held-out set.

Generate the pilot from the unchanged returned audit folder:

```bash
pnpm analyze:content-design-external-audit \
  /path/to/contentmd-content-design-external-audit-10000 \
  --pilot-out /isolated/reviewer-copy/review-packet.json \
  --pilot-manifest-out /operator-only/selection-manifest.json
```

The writes are create-only. Keep the two outputs separate:

- Give each reviewer an isolated copy of `review-packet.json` and
  `REVIEWER-PROMPT.md`.
- Keep `selection-manifest.json` operator-only until both original submissions
  are frozen. It reveals the candidate variants and model dispositions used to
  select the pilot.
- Do not give either reviewer repository access for this task. The repository
  contains the synthetic controls and source matrix.
- Do not let reviewers inspect or coordinate with each other.

The current evidence produces packet digest
`039de50636f99db3733f01f34ab45ea0fac4eed33f3d5943c42d43d1e1e23cf5`
and operator-manifest digest
`957390801d2065883ed00e9993bfa166e50156b0ef6e9e7237215b2471c3a254`.
Any different digest is a different pilot and must not be merged with these
review records.

## Selection contract

- 25 cases each from `concise_calm`, `warm_supportive`, `plain_direct`, and
  `missing_consequence` disagreements.
- All nine English abilities, ten situations, and ten surfaces represented.
- Regional, translation, direction, and readiness variables absent from the
  reviewer packet by construction.
- Claude/Cursor judgments, synthetic controls, candidate-variant labels, and
  provisional expectations absent from the reviewer packet.
- `authority_effect: none`, `retrieval_eligibility: never`,
  `training_eligibility: never`, and `effectiveness_claim_eligibility: false`.

Two qualified content designers must review independently. Their submissions
remain candidate calibration evidence until identity, scope, packet digest,
completeness, and independence are verified and disagreements are adjudicated.
