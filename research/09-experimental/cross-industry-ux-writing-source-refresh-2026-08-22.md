---
title: Cross-industry UX-writing source refresh
status: partial-current
started: 2026-08-22
updated: 2026-08-22
evidence_cutoff: 2026-08-22
execution_status: public-web-source-only
---

# Cross-industry UX-writing source refresh

## Evidence boundary

This pass reviews current public guidance from primary design-system and product-documentation sources. It is landscape evidence about what those publishers currently recommend. It is not direct observation of a complete product journey, proof that the guidance is implemented, evidence of user outcomes, or permission to reproduce another product's expression.

The Chrome extension connected, but browser navigation permission was declined; direct Computer Use also remained unapproved for Google Chrome. No desktop-observed claim is made. No account was opened, no form was submitted, no software was installed, and no external state was changed.

Published examples remain source-bound evidence. They are excluded from labels, model fitting, prompt context, and generated copy. Only reviewed mechanisms may be proposed for transfer, and product facts, policy, approvals, and publication authority remain with the adopting product or organization.

## Current primary-source map

| Domain | Primary source | Sourced guidance | Transferable mechanism | Limitation |
| --- | --- | --- | --- | --- |
| Government services | [GOV.UK error message](https://design-system.service.gov.uk/components/error-message/) | Validation errors belong next to the affected field and in a summary; eligibility, permission, capacity, and service failures require different patterns. Entered information is retained, labels and errors use matching language, and an assistive-technology prefix is localized. | Classify the state before drafting. Bind message, field, summary, focus/announcement behavior, retained input, and recovery as one pattern rather than treating the string as the whole experience. | Guidance is a service-design standard, not proof of implementation or outcomes in every government service. |
| Healthcare | [NHS error message](https://service-manual.nhs.uk/design-system/components/error-message) and [NHS error summary](https://service-manual.nhs.uk/design-system/components/error-summary) | The NHS separates validation from eligibility/permission, waits until the person attempts to continue, preserves entered data, links summary errors to fields, moves focus to the summary, and uses the same message in both places. The page reports an update in June 2026. | A recovery pattern needs timing, placement, focus, announcement, persistence, and exit behavior in addition to wording. Sensitive-service content should minimize surprise and repeated work. | NHS guidance inherits GOV.UK patterns and is not an independent outcome comparison. |
| Payments and financial products | [Visa messaging](https://design.visa.com/content/messaging/) and [feedback/status](https://design.visa.com/patterns/feedback-and-status/) | Visa distinguishes informational, success, warning, and error states; connects component disruption to urgency; asks messages to explain the state and next action without jargon or blame; and treats apology and tone as context-sensitive. | Encode message type, urgency, responsibility, consequence, recovery, alternative, and interruption level as separate fields. Security-specific disclosure limits must override otherwise helpful detail. | Public guidance does not establish how any issuer, merchant, or payment flow implements it. |
| Commerce and merchant tools | [Shopify app content](https://shopify.dev/docs/apps/design/content) | Shopify separates a consistent voice from context-dependent tone, emphasizes plain language for a global merchant audience, recommends scannable structure and consistent terminology, and warns against duplicate content, jargon, idioms, and synonyms for the same action. | Voice is a stable product profile; tone is selected from the person's task and state. Terminology should be an identity-bound project lexicon, not model preference. | The page describes app-design guidance, not all Shopify surfaces or merchant outcomes. |
| Enterprise collaboration software | [Atlassian error messages](https://atlassian.design/foundations/content/designing-messages/error-messages) | Atlassian separates errors that already occurred from warnings about future conditions. It asks messages to cover the problem, consequence, action, and—when useful—cause or recurrence, while refusing to invent an unknown cause. It recommends a primary recovery and a backup path. | Store cause knowledge and uncertainty explicitly. A writer may omit an unknown cause but may not fabricate one. Recovery should include a primary path and an optional verified fallback. | Guidance is product-system documentation, not a measured comparison of Atlassian experiences. |
| Developer platforms | [GitHub Primer content](https://primer-docs-preview.github.com/product/getting-started/foundations/content/) and [degraded experiences](https://primer.github.io/design/ui-patterns/degraded-experiences/) | Primer emphasizes clear, consistent, human-readable product language, stable action terms, restrained humor, and non-blaming errors. Its degraded-state guidance warns that an empty state can falsely imply data loss and recommends preserving the primary experience where possible while explaining unavailable content in context. | Distinguish empty, loading, unavailable, missing, and deleted states. Never let a generic empty-state template contradict known object history or system status. | Some linked GitHub content guidance is internal; only the public pages are evidence here. |
| Travel | [Skyscanner Backpack language](https://www.skyscanner.design/latest/content/language-yNrQ6pSc), [grammar](https://www.skyscanner.design/latest/content/grammar-Ed8c4IqH), and [accessibility for content designers](https://www.skyscanner.design/latest/accessibility/for-content-designers-Xts9ZQlB) | Backpack emphasizes traveller-first information order, plain language, low cognitive load, globally understandable terminology, consistent narrative perspective, and accessible visible and hidden content. It distinguishes apology for the product's fault from empathy when another party caused the problem. | Bind actor/responsibility and affected journey to tone. Apology is a consequence of verified responsibility and severity—not a universal brand-style switch. Visible and assistive content are authored and reviewed together. | This is design-system guidance, not a desktop observation of booking, disruption, payment, or refund journeys. |
| Education | [Department for Education plain-language standard announcement](https://design.education.gov.uk/news/plain-language) | DfE frames plain language as clarity, concision, accessibility, and simplification without losing important detail. The standard was developed with content designers and subject-matter experts, reviewed with the wider government content community, and is intended to be updated as needs and accessibility guidance change. | Readability is a governed transformation with a preservation constraint: reduce linguistic complexity while retaining the facts, qualifications, and actions the learner or educator needs. Bind the rule version and review date instead of treating “simple” as a permanent model preference. | This is public service guidance, not evidence from a completed learner, parent, teacher, or administrator journey or proof of improved comprehension. |
| Insurance | [Bradesco Seguros Base Design System](https://www.bradescoseguros.com.br/clientes/base-design-system/) | Bradesco Seguros describes an insurance-specific design system that combines tone-and-voice manuals, component documentation with content-design examples, reusable implementation resources, onboarding, and journey-review support. It explicitly distinguishes the insurer's patterns from the bank's separate design system. | Bind language guidance to organization, sector, product, component, and journey coordinates. A shared parent brand does not authorize copying terminology or patterns across products; contribution, review, and versioning are part of the content mechanism. | The public Portuguese overview establishes governance structure, not the detailed internal writing rules, implementation quality, or customer outcomes across insurance products. |
| Telecommunications | [Bouygues Telecom Trilogy content design](https://design.bouyguestelecom.fr/getting-started/content-design) | Trilogy separates content principles, component-specific formulations, a product glossary, an example library indexed by relational stance, and five voice traits. It treats UX writing as a coherent conversation supported by accessibility, spelling, typography, terminology, and component rules. | Represent terminology, component behavior, relationship stance, and brand voice as separate inputs. Example libraries may support reviewed abstraction, but they must not become a phrase bank for generation. | The public overview is in French and does not expose every linked rule or demonstrate complete telecom journeys, localization performance, or outcomes. |
| Social and community communication | [LINE Voice](https://designsystem.line.me/about/line-voice-en) and [LINE Messenger UX guidelines](https://designsystem.line.me/LDSM/ux) | LINE emphasizes clear, conversational, considerate writing: remove unimportant information, use the audience's language, label buttons as the person's intended action, avoid blame, and prepare concrete recovery. Its UX guidance treats confirmation, feedback, selection, modal, and navigation as recurring cross-screen patterns rather than isolated strings. | Bind action labels to verified intent and pair error causes with recovery when the cause is known. Community-language guidance should be evaluated across the whole interaction and locale, not applied as a generic “friendly” tone. | These are public LINE design-system pages, not observation of current Messenger behavior, safety enforcement, moderation flows, or outcomes. |
| Industrial software and operations | [Siemens Industrial Experience UX writer role](https://ix.siemens.io/docs/guidelines/language/support-and-resources/ux-writer-role) and [Siemens UX text basics](https://element.siemens.io/fundamentals/ux-text-style-guide/basics/) | Siemens places writers throughout research, design, implementation, review, and maintenance; uses approved terminology and component templates; and updates guidance from research, feedback, product change, and accessibility needs. Its public basics favor simple, specific, consistent, scannable language for industrial workflows. | A reusable industrial pattern needs an owner, approved terminology version, component contract, review state, and maintenance trigger. Complex-domain clarity comes from verified object/action names and workflow state, not from stripping operational detail. | Siemens' public guidance includes organization-specific English conventions—including a broad anti-apology rule—that cannot be generalized to other industries, locales, or responsibility states. |

## Cross-industry synthesis

The common mechanism is not “write shorter copy.” Strong guidance repeatedly treats interface content as a stateful recovery system:

1. classify the event before choosing a component or tone;
2. distinguish validation, eligibility, permission, service failure, warning, degraded state, empty state, and confirmed success;
3. preserve work and explain what remains true;
4. state the verified consequence and the simplest available next action;
5. provide a verified alternative when the primary recovery may fail;
6. bind visible wording to placement, focus, announcement, persistence, and dismissal behavior;
7. use stable product terminology while adapting tone to risk, responsibility, urgency, locale, and journey state;
8. omit unknown causes instead of inventing system behavior;
9. measure error exposure, recovery completion, abandonment, repeated attempts, and support escalation; and
10. treat accessibility and localization as part of the message contract, not post-writing edits.

## Important conflicts

The sources do not support one universal style rule.

- GOV.UK generally rejects apology in validation messages because it does not help resolve the input problem.
- Visa permits restrained apology for serious errors requiring major recovery.
- Skyscanner ties apology to verified product responsibility and otherwise recommends empathy.
- Siemens' industrial guidance broadly avoids apology as an organization-specific convention.

content.md should therefore compile apology from `responsibility`, `severity`, `recoverability`, and project policy. It must not learn “always apologize” or “never apologize” as a global writing preference.

Likewise, passive voice is not globally good or bad. Visa uses it selectively to avoid blame in sensitive failures, while other systems generally favor active, direct instructions. The correct rule is to preserve actor truth and avoid unsupported blame, then choose the clearest construction allowed by the product's policy and locale.

## Proposed content.md representation

Every reusable message pattern should require these independently sourced fields before expression generation:

```json
{
  "state_class": "validation | eligibility | permission | warning | service_failure | degraded | empty | success",
  "trigger": "verified event or attempted transition",
  "actor_and_responsibility": "verified actor or unknown",
  "what_remains_true": "preserved work, completed steps, or known object state",
  "consequence": "verified user-relevant effect",
  "primary_recovery": "verified action or null",
  "fallback_recovery": "verified alternative or null",
  "persistence_and_dismissal": "component behavior",
  "focus_and_announcement": "accessibility behavior",
  "terminology_refs": ["project-owned lexicon refs"],
  "locale_and_channel": "exact product coordinates",
  "authority_refs": ["current product policy and approval refs"]
}
```

This is a proposed mechanism schema, not an approved product contract. Industry guidance may inform candidate rules only after provenance, rights, scope, conflict, and transfer review. It cannot supply product facts or authority.

## Remaining evidence

1. Complete the authorized Computer Use study on rendered, public product journeys when the Chrome permission is available.
2. Deepen the new education, insurance, telecommunications, social/community, and industrial coverage with complete public journey observation; add primary-source coverage for automotive, media, logistics, and civic/community platforms without using secondary “best copy” lists as substitutes.
3. Observe complete state transitions, including loading, partial failure, permission, destructive confirmation, recovery, success, and cleanup—not only static guidance pages.
4. Collect qualified human judgments and outcome evidence before claiming that these mechanisms improve writing quality.
