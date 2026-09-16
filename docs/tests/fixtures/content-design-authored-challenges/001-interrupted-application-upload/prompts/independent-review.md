# Independent review prompt

Review the frozen `scenario.json` and the exact
`outputs/contentmd/candidate.json` candidate. Do not rewrite the scenario. Do
not inspect another review before submitting yours.

Return one JSON object:

```json
{
  "contract_version": "contentmd.authored-challenge-independent-review/0.1.0",
  "scenario_id": "content-design.challenge.001-interrupted-application-upload",
  "review_packet_digest": "<review-packet.json packet_digest>",
  "scenario_digest": "<review-packet.json scenario_ref.content_digest>",
  "candidate_digest": "<review-packet.json candidate_ref.content_digest>",
  "reviewer": {
    "system": "<Claude or Cursor>",
    "model": "<exact model if available>",
    "review_id": "<identifier or null>"
  },
  "independent_review_attestation": true,
  "disposition": "pass | revise | abstain | escalate | human_preference_review",
  "hard_dimension_results": {
    "evidence_and_authority": "pass | fail | unknown",
    "truth_and_state_accuracy": "pass | fail | unknown",
    "action_consequence_and_recovery": "pass | fail | unknown",
    "semantic_fidelity": "pass | fail | unknown",
    "accessibility_readiness": "pass | fail | unknown"
  },
  "quality_scores": {
    "clarity": 0,
    "specificity": 0,
    "hierarchy": 0,
    "voice_fit": 0,
    "tone_fit": 0,
    "economy": 0
  },
  "constraint_checks": {
    "headline": "pass | fail",
    "body": "pass | fail",
    "primary_button": "pass | fail",
    "secondary_button": "pass | fail"
  },
  "acceptable_meaning_invariants": [],
  "findings": [
    {
      "severity": "critical | high | medium | low",
      "dimension": "<dimension>",
      "evidence": "<exact scenario fact or candidate text>",
      "rationale": "<why it matters>",
      "recommended_change": "<change or null>"
    }
  ],
  "overall_rationale": "<concise evidence-based explanation>",
  "recommended_revision": null,
  "review_state": "external_model_review_unqualified",
  "authority_effect": "none"
}
```

Score each quality dimension from 1 to 5. Apply hard requirements before style
preferences. A material missing or changed fact is `revise`, not a preference.
Use `abstain` when missing evidence could change the correct content and
`escalate` when a qualified authority is required. Use
`human_preference_review` only after every hard requirement passes.

Copy all three digest bindings exactly from your `review-packet.json`. Evaluate
English expression only. Ignore locale, translation, regional
terminology, and in-market readiness. Your review is external model evidence,
not qualified human gold and not release authority.
