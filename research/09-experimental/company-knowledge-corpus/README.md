---
title: Company knowledge corpus
status: collection-contract-ready
date: 2026-08-27
authority_effect: none
---

# Company knowledge corpus

This is the company-centric collection lane for the 5,000-company content.md
industry-knowledge goal. One packet represents one independently identifiable
company and binds its products, IA, content style, voice/tone hypotheses,
terminology, representative strings, sources, and rights/training state.

The packet contract is implemented in `packages/research/src/company-knowledge.ts`
and registered as `contentmd.company-knowledge-packet`. The JSONL public-product
corpus remains evidence-only; it may be referenced by packets, but its strings
cannot enter the training view merely because they are public.

## Required company packet

- `products`: named products, normalized industries, surface references, IA
  nodes/edges, content patterns, terminology, and representative strings;
- `voice_tone`: qualitative feature hypotheses, stable principles, and
  context-sensitive tone policies with evidence references;
- `content_style`: mechanics, terminology notes, and reusable pattern metadata;
- `training`: rights basis, eligibility state, approved/excluded example IDs,
  review references, and limitations.

## Eligibility boundary

Packets normally enter as `proposed` or `reviewed` with `training.eligibility`
set to `never` or `pending_review`. `trainingEligibleCompanyKnowledge()` only
admits an `approved` packet whose examples are explicitly `project_owned`,
`licensed`, or `consented`, with a non-empty approved-example list and review
references. Evidence-only public strings fail closed.

Training is therefore a separate, later projection from the evidence graph. A
company packet is not a brand-cloning profile, and qualitative voice hypotheses
are not numeric truth about an organization.

## Scale manifest

See `collection-manifest.json` for the 5,000-company target, minimum per-company
coverage, current baseline, and collection lanes. Run the verifier from the
repository root after each append-only batch:

```bash
node scripts/verify-company-knowledge-corpus.mjs \
  --root research/09-experimental/company-knowledge-corpus/packets \
  --target-companies 5000
```

The verifier reports partial progress but exits nonzero until the target and
packet gates pass. It never changes training eligibility or activates a model.

Export training rows only after explicit rights approval:

```bash
node scripts/export-company-knowledge-training.mjs \
  research/09-experimental/company-knowledge-corpus/packets
```

Evidence-only public packets export zero rows.
