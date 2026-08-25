# Public Product Corpus Acquisition Manifest

Batch: 2026-08-23-batch-01
Purpose: collect current public product-content evidence for content.md corpus modeling.

Scope:
- public pages only
- no login, account creation, purchase, submission, support contact, credential use, or mutation
- no copy beyond the smallest necessary observed span
- no reuse claims, approval claims, or training prompts

Sampling frame:
- 12 systems in this batch
- 10 industries represented
- up to 2 public pages per system in this batch
- journey-state slots attempted: entry/onboarding, core task/commitment, pending/progress, success, error/recovery, destructive/permission/support

Rights boundary:
- source class is evidence only
- authority_effect: none
- prompt_eligibility: never
- training_eligibility: never
- benchmark_eligibility: false

Systems in this batch:
- GOV.UK
- NHS
- GitHub
- Atlassian Design System
- Stripe
- PayPal
- Shopify
- Canva
- Figma
- Slack
- Airbnb
- Uber

Limitations:
- direct browser runtime was not available in this session, so public evidence was collected from official public pages using read-only web access
- states that were not safely observable are recorded as `not_observed`
