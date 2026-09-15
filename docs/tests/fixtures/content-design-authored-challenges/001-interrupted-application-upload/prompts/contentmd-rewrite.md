# content.md rewrite prompt

Use only `scenario.json` as product evidence.

Rewrite the supplied recovery dialog. Return one JSON object using this shape:

```json
{
  "contract_version": "contentmd.authored-challenge-candidate/0.1.0",
  "scenario_id": "content-design.challenge.001-interrupted-application-upload",
  "generator": {
    "system": "content.md",
    "version": "<exact version>",
    "run_id": "<exact run identifier or null>"
  },
  "candidate": {
    "headline": "<text>",
    "body": "<text>",
    "primary_button": "<text>",
    "secondary_button": "<text>"
  },
  "character_counts": {
    "headline": 0,
    "body": 0,
    "primary_button": 0,
    "secondary_button": 0
  },
  "meaning_map": [
    {
      "required_meaning": "<fact, action, consequence, or recovery>",
      "expressed_in": ["<candidate field>"],
      "explanation": "<brief explanation>"
    }
  ],
  "rationale": {
    "state_accuracy": "<why>",
    "actions": "<why>",
    "hierarchy": "<why>",
    "voice_and_tone": "<why>",
    "economy": "<why>"
  },
  "unresolved_questions": [],
  "self_check": {
    "all_constraints_met": true,
    "all_required_meanings_mapped": true,
    "forbidden_claims_absent": true
  },
  "review_state": "unreviewed",
  "authority_effect": "none"
}
```

Requirements:

- Preserve every material fact, action, consequence, and recovery path in the
  complete expression.
- Do not add product behavior, reassurance, approval, or certainty that the
  scenario does not establish.
- Make each button name the action it performs.
- Keep every field within its declared character limit.
- Treat the result as a proposal. Do not claim approval or effectiveness.
- Evaluate English expression only. Do not add or infer locale requirements.
