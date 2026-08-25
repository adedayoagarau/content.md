# Public product IA inventory manifest

## Purpose

This append-only lane maps the publicly observable information architecture of
products already represented in the public-product corpus. It complements,
but never upgrades, the corpus's bounded content evidence.

## Observation boundary

- Signed-out, read-only public pages only.
- No login, account creation, search submission, purchase, personal data,
  support contact, credentials, consent changes, or other mutations.
- Capture only labels, route targets, hierarchy, and page titles needed to
  describe the observed IA. Do not retain long passages of third-party copy.
- Treat unavailable, gated, redirected, dynamic, and blocked paths explicitly
  as coverage states. Do not infer their structure.

## Record families

- `ia-pages.jsonl`: a public page observed as an IA surface.
- `ia-nodes.jsonl`: a visible global, local, utility, or footer navigation
  item, landmark, or route grouping on an observed page.
- `ia-edges.jsonl`: an observed relationship from a page or grouping to a
  visible route target.
- `coverage.jsonl`: product-level progress toward a complete public IA map.
- `access-log.jsonl`: pages and routes that could not be safely observed.

## Rights and use

Every third-party UI expression remains public evidence only:
`authority_effect: none`, `prompt_eligibility: never`,
`training_eligibility: never`, and `benchmark_eligibility: false`.

## Completion definition

A product may be marked `complete_public_ia` only when its observed public
entry points and visible navigation layers have been mapped to stable route
destinations, with inaccessible areas recorded in `access-log.jsonl`. This is
not a claim about authenticated, personalized, or otherwise unavailable IA.
