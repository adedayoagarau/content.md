# content.md rewrite prompt

Use only `scenario.json` as product evidence. Rewrite the supplied email and
return one JSON object using the `contentmd.authored-challenge-candidate/0.1.0`
contract demonstrated by Challenge 001, with these candidate and
`character_counts` fields:

```json
{
  "subject": "<text>",
  "heading": "<text>",
  "body": "<text>",
  "primary_link": "<text>"
}
```

Include disclosed generator system, version, execution path, host, and run ID;
a meaning map for every preserved fact, choice, consequence, and recovery; the
five required rationale fields; unresolved questions; self-checks; unreviewed
state; and no authority effect.

Keep every field within its declared limit. The email must stand alone, name
the Billing destination, preserve the cancellation choice, and distinguish the
current price from the future renewal price. Do not add benefits, urgency,
approval, or policy. Evaluate English expression only; do not add or infer
locale requirements.
