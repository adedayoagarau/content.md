---
title: Cross-dataset voice and tone verification
status: evidence-only-current-pass
date: 2026-08-27
research_mode: in-app-browser-read-only
authority_effect: none
prompt_eligibility: never
training_eligibility: never
benchmark_eligibility: false
---

# Cross-dataset voice and tone verification

## Result

This pass binds current first-party writing guidance to related evidence already
held in the public-product corpus and project-owned synthetic comparison set. It
does not turn public wording into a voice profile, assign numeric feature values,
claim organization fidelity, or authorize prompts, training, benchmarks, or
publication.

The pass verified current guidance for GOV.UK, Atlassian, Microsoft, and
Mailchimp. It also re-observed one public product surface for GOV.UK, Microsoft,
and Mailchimp. Shopify's former Polaris voice-and-tone URL now redirects to a
generic API reference and is recorded as stale rather than silently replaced.

Every visited document was checked for page-defined WebMCP tools. None exposed a
callable tool. Page content was therefore read from the rendered accessibility
tree through the requested in-app browser.

## Dataset boundary

| Dataset | Role in this pass | Boundary |
|---|---|---|
| public-product corpus | previously captured public UI evidence and source identities | evidence only; existing duplicates and classification defects remain |
| voice-tone research | existing candidate dimensions, measurement cautions, and GOV.UK paper profile | proposal/research only; no owner approval |
| project-owned comparisons | feature vocabulary and synthetic calibration cases | project-owned synthetic; no third-party organization claim |
| current browser verification | source freshness and bounded guidance/product observations | read-only snapshot; mutable upstream pages are not hash-pinned |

## Method

1. Match an existing dataset organization or source to a current first-party
   writing-guidance URL.
2. Read the rendered page and record whether WebMCP is available.
3. Where an existing public-product source exists, revisit one related public
   product surface.
4. Map only explicit or strongly supported qualitative tendencies to the nine
   existing feature names. Do not manufacture numeric scores.
5. Distinguish documented guidance, observed UI, cross-dataset inference, stale
   source, and unresolved scope.

## Current synthesis

- Voice is consistently described as relatively stable while tone responds to
  user state and context across the four available guidance sources.
- Directness and information selection recur across all four sources, but their
  expression differs by product, surface, and consequence.
- Humor or delight is conditional rather than globally positive: GOV.UK largely
  suppresses it in stressful services; Atlassian and Mailchimp reserve it for
  appropriate contexts.
- Public marketing surfaces cannot validate transactional UI tone. Microsoft and
  Mailchimp show higher promotional expressiveness on marketing pages without
  invalidating their context-sensitive guidance.
- Current evidence supports qualitative feature hypotheses and context policies,
  not organization-level numeric intervals.

## Files

- `sources.jsonl` — current source and WebMCP availability receipts.
- `observations.jsonl` — bounded guidance, UI, cross-dataset, and stale-source observations.
- `coverage.json` — explicit coverage and unresolved gaps.
- `manifest.json` — file digests and immutable collection boundaries.

## Uncertainty and next collection slice

The current pass covers four guidance systems, three related public surfaces,
one stale source, English-language web content, and no authenticated product
states. Next collection should add current transactional/error/success states,
local-language guidance, accessibility review, and independent human feature
coding before any numeric voice/tone interval is proposed.
