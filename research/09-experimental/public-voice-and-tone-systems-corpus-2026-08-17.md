---
title: Public voice and tone systems corpus
status: working-note
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
research_mode: public-web-read-only
desktop_evidence: none
scope: Official public voice, tone, writing, localization, and governance systems across materially different domains
---

# Public voice and tone systems corpus

## Result and evidence boundary

This is a dated evidence snapshot of real public voice-and-tone systems across government, regulated public services, health, emergency communication, finance, banking, commerce, enterprise software, developer documentation, education, travel, media, community, creative software, multi-brand portfolios, and white-label products.

It is not an industry-tone cookbook. A domain does not have one natural voice. The evidence shows that voice is owned by a particular organization or product, while tone changes with the audience, task, journey state, emotional context, channel, risk, and locale. Mechanics, terminology, accessibility, localization, governance, and legal or safety constraints remain separate layers even when a public guide presents them together.

The review used official organization, product, design-system, handbook, or maintained-repository pages available without an account. No account was created, no login or authorization flow was entered, no form was submitted, no file was downloaded, no package was installed, and no organization was contacted. This is public-web evidence only. It does not prove that an organization follows its guide in production, that every rule is current, or that a guide is safe to reuse in another product.

### Claim notation

This note uses the canonical vocabulary in the [research protocol](../00-method/research-protocol.md#canonical-claim-and-source-vocabulary):

- **[Sourced fact]** — a proposition directly supported by the cited official source within its scope.
- **[Documented practice]** — what a named organization says it does; it is not an industry rule or verified runtime behavior.
- **[Cross-source finding]** — a pattern supported by multiple independent public systems.
- **[Inference]** — an interpretation for the proposed content system, not a source assertion.
- **[Open question]** — an uncertainty that the reviewed public material does not resolve.

“No public rule found” means only that the reviewed official pages did not expose one. Public availability is not a reuse license. Licenses for documentation, code, fonts, assets, trademarks, and brand expression can differ and must not be conflated.

## Coverage map

| ID | System | Materially different domain | Primary official source | What is actually public | Principal boundary |
| --- | --- | --- | --- | --- | --- |
| S01 | GOV.UK | Central government and public services | [Writing for user interfaces](https://www.gov.uk/service-manual/design/writing-for-user-interfaces) | UI tone, mechanics, legal-content cautions, accessibility, and service standards | It is government-service guidance, not a generic “government voice” for every jurisdiction |
| S02 | UK Home Office | Immigration, identity, casework, and internal public administration | [Voice and tone](https://design.homeoffice.gov.uk/design-and-content/content/voice-and-tone) | Stable voice traits plus channel- and task-specific tone examples | High-power and vulnerable-user contexts require more than brand adjectives |
| S03 | NHS England | Clinical health and patient communication | [Voice and tone](https://service-manual.nhs.uk/content/voice-and-tone) | Health voice, emotional-context shifts, patient-message and channel guidance | Public guide is England-specific and does not replace clinical-safety review |
| S04 | Canada.ca and CDC CERC | Crisis, emergency, and public-risk communication | [Canada crisis checklist](https://design.canada.ca/crisis/content.html) and [CDC CERC manual](https://www.cdc.gov/cerc/php/cerc-manual/index.html) | Operational structure, timing, audience, crisis-phase, translation, and removal practices | These are response frameworks, not a playful brand-voice system |
| S05 | Visa Product Design System | Global payments and financial products | [Voice and tone](https://design.visa.com/content/voice-and-tone/) | Product voice pillars, tone types and contexts, mechanics, and component content | Illustrative guidance is not financial, legal, tax, or regulatory advice |
| S06 | Monzo | Consumer banking | [Monzo Writing Principles](https://monzo.com/tone-of-voice) | Brand principles, explicit channel calibration, terminology, apology, inclusion, and humor limits | A regulated bank still uses brand expression, but suppresses it in sensitive operational moments |
| S07 | Shopify App Design Guidelines | Commerce platform and merchant applications | [Content](https://shopify.dev/docs/apps/design/content) | Merchant-centered plain language, accessibility, UI patterns, and platform requirements | Current guidance points into a changing Polaris documentation surface |
| S08 | Atlassian Design System | Enterprise collaboration software | [Voice and tone](https://atlassian.design/foundations/content/voice-tone/) | Public UI/app voice, emotional-state calibration, component guidance, and inclusive language | Broader brand voice and the official vocabulary are partly employee-only |
| S09 | GitLab | DevSecOps, technical marketing, and handbook-led enterprise work | [Content style guide](https://handbook.gitlab.com/handbook/marketing/brand-and-product-marketing/brand/content-style-guide/) | Brand traits, mechanics, vocabulary, owners, and a versioned handbook process | Marketing voice, product UI, documentation, and internal communication are different scopes |
| S10 | GitHub Docs | Developer documentation and open-source contribution | [Style guide source](https://github.com/github/docs/blob/main/content/contributing/style-guide-and-content-model/style-guide.md) | Voice, global-audience constraints, accessibility, content models, and contribution history | Documentation voice is not the entire GitHub brand or product voice |
| S11 | Johns Hopkins University | Higher education and research communications | [Voice and tone](https://brand.jhu.edu/messaging/voice-tone/) | Audience-first promotional voice, evidence and accuracy expectations, and editorial mechanics | This is communications guidance, not a learner-product interaction-state model |
| S12 | Alaska Airlines Auro | Airline travel and disruption-sensitive journeys | [Voice and tone](https://auro.alaskaair.com/core/voice-and-tone) | Journey-stage tone policy, day-of-travel constraints, UX mechanics, and risky terminology | The public voice page is Alaska-specific even though Auro now exposes multiple visual themes |
| S13 | Mailchimp | Marketing platform, email, and customer communications | [Content Style Guide](https://styleguide.mailchimp.com/) | Voice, emotional tone, channels, legal/social/accessibility/translation guidance, and a public license | The older public guide and current Intuit product guidance are overlapping authorities that need version adjudication |
| S14 | The Conversation | Research journalism, media, and public knowledge | [Tone and voice](https://brand.theconversation.com/docs/tone-and-voice/) | Evidence-led brand voice, editorial boundaries, accessibility, messaging, and call-to-action rules | Brand communications and independent editorial content have related but distinct authorities |
| S15 | Adobe Spectrum | Creative and professional software | [Voice and tone](https://spectrum.adobe.com/page/voice-and-tone/) | A stable product voice and an explicit situational tone spectrum with frequency guidance | Open-source implementations do not automatically license restricted fonts or all brand material |
| S16 | Intuit Content Design | Multi-brand finance, tax, accounting, marketing, and AI | [Portfolio voice and tone](https://contentdesign.intuit.com/voice-tone/) and [AI voice and tone](https://contentdesign.intuit.com/ai/voice-tone/) | Portfolio, product, and shared-AI layers plus employee-only implementation resources | A shared framework explicitly does not erase product-level voices |
| S17 | CRIF NEXT | White-label financial and enterprise software | [NEXT Design System](https://www.crif.digital/design-system/design-system/) | White-label, adjustment, and customization tiers plus a public tone-of-voice rationale | Public material does not define a complete verbal inheritance or override contract |
| S18 | Google and Microsoft global writing systems | Multilingual developer and software content | [Google global-audience guidance](https://developers.google.com/style/translation) and [Microsoft localization guidance](https://learn.microsoft.com/en-us/globalization/localization/localization-overview) | Source-language rules, locale guides, terminology, translation memory, context, and validation | Global-ready source text is not equivalent to a validated localized experience |

The seventeen organizational systems above span more than ten materially different domains. S18 is included as multilingual infrastructure rather than as another brand voice.

## System evidence profiles

### S01 — GOV.UK: central government and public services

- **Sources and freshness.** The primary UI-writing page is [Writing for user interfaces](https://www.gov.uk/service-manual/design/writing-for-user-interfaces). At the 17 August 2026 evidence cutoff, the current [content and publishing guidance](https://guidance.publishing.service.gov.uk/) displayed an 11 August 2026 style-guide update. The older [content-principles research background](https://www.gov.uk/government/publications/govuk-content-principles-conventions-and-research-background/govuk-content-principles-conventions-and-research-background) was published 10 June 2013 and is useful as rationale, not as the sole current rule source.
- **[Documented practice]** The UI tone is approachable and helpful without being overly familiar. Serious service failure can warrant an apology; ordinary validation does not automatically warrant one. The guide treats clarity, user language, and cognitive load as service-performance and inclusion concerns, not just style preferences.
- **Mechanics and terminology.** The service manual points to the maintained A-to-Z style guide for spelling, punctuation, dates, times, acronyms, and conventions. It discourages redundant helper words and requires intuitive service naming in the language users recognize.
- **Accessibility and localization.** The guide connects concise, direct wording to people who struggle with reading or use limited English. That is an inclusion constraint, not a brand-personality score.
- **Governance and risk.** Services must follow a shared style guide and service standard, while legal content still needs legal expertise and must be made understandable. The historical research note itself warns that a tone intended as friendly can sound false or patronizing in benefits and transactional contexts.
- **Access and license.** GOV.UK is public to read. Its [terms and conditions](https://www.gov.uk/help/terms-conditions) apply the Open Government Licence unless an exception is stated; third-party material, departmental logos, crests, and personal data remain separate.
- **Reusable structure.** Separate a stable public-service stance from event rules such as `validation_error`, `service_outage`, `application_complete`, and `legal_explanation`.

### S02 — Home Office: immigration, identity, and casework

- **Sources and freshness.** The official [voice-and-tone page](https://design.homeoffice.gov.uk/design-and-content/content/voice-and-tone) was publicly readable on 17 August 2026; no page-level update date was visible in the reviewed rendering.
- **[Documented practice]** The Home Office declares four voice traits: human, empowering, respectful, and clear. Its examples operationalize the traits by replacing bureaucratic or accusatory wording with natural language, user agency, consideration, and concrete terms.
- **Situational tone.** The page distinguishes a direct task-focused case-management tone, a conversational but professional HR-chat tone, an empathetic and reassuring research-recruitment tone, and a short, responsibility-focused data-handling tone.
- **Mechanics and terminology.** Concrete public language can replace institutional language; for example, the guide treats familiar descriptions of fingerprints and photographs as preferable to unexplained specialist terminology.
- **Accessibility and localization.** One documented tone case explicitly addresses psychological safety for neurodivergent research participants. Another reduces cognitive load for people handling large datasets.
- **Governance and risk.** The same organization speaks to applicants, employees, caseworkers, research participants, and data users. Power imbalance, legal consequence, vulnerability, and data responsibility must therefore be explicit context fields.
- **Access and license.** The page is public to read. No separate blanket reuse license was established for its brand examples in this pass; Crown and third-party rights must be checked at use time.
- **Reusable structure.** Model `audience_role`, `power_relation`, `task_type`, `sensitivity`, and `channel` as tone inputs rather than deriving a single “government” vector.

### S03 — NHS England: clinical health and patient communication

- **Sources and freshness.** The [voice-and-tone page](https://service-manual.nhs.uk/content/voice-and-tone) says it was updated in November 2019. The current [patient-message guidance](https://service-manual.nhs.uk/content/writing-nhs-messages) incorporates clinical safety, governance, delivery, user research, and channel advice; it was checked on 17 August 2026.
- **[Documented practice]** The NHS voice is neutral and factual, authoritative yet calm and reassuring, empowering rather than patronizing, and personal rather than formal. It addresses the reader directly and warns that `should` can sound patronizing.
- **Situational tone.** Diagnosis content can be direct, serious, and reassuring; exercise or diet content can be encouraging and conversational. Patient-message greeting, name form, structure, and formality change with purpose and context.
- **Mechanics and terminology.** The messaging guide prioritizes the most important information, short descriptive titles, one primary action, purposeful links, and channel-specific formatting. It records a user-research preference for familiar relationship terms over technical proxy terminology.
- **Accessibility and localization.** Messages should use plain language, be tailored instead of copied unchanged across app, text, email, and letter channels, and be tested with users.
- **Governance and risk.** Clinical-safety requirements, trustworthy sending domains, phishing avoidance, privacy, and patient identity sit alongside voice. Tone cannot authorize or validate medical advice.
- **Access and license.** NHS England's [service-manual terms](https://service-manual.nhs.uk/terms-and-conditions) make its content available under the Open Government Licence v3.0; service descriptions remain England-specific.
- **Reusable structure.** Health tone needs at least `clinical_severity`, `message_purpose`, `patient_relationship`, `channel`, `identity_risk`, `action_urgency`, and `clinical_owner`.

### S04 — Canada.ca and CDC CERC: crisis and emergency communication

- **Sources and freshness.** Canada.ca's [crisis content checklist](https://design.canada.ca/crisis/content.html) identifies a modification date of 21 December 2021. The CDC [CERC manual index](https://www.cdc.gov/cerc/php/cerc-manual/index.html) is dated 20 November 2024; its listed chapters retain separate 2014, 2018, and 2019 update years.
- **[Documented practice]** Canada treats mobile-first structure, timestamps, direction-first writing, answer headings, short sentences, shared terminology, translation speed, and removal of stale content as crisis-content controls. CDC organizes communication by crisis phase, audience needs, psychological response, spokesperson practice, rumors, and community engagement.
- **Voice versus operational mode.** Neither system begins with a set of playful personality adjectives. Credibility, immediacy, actionability, and uncertainty management dominate because consequences and time pressure are high.
- **Mechanics and terminology.** Common wording and terms must be tracked; updated information needs dates and times; alerts and warnings have specific structures; content removal is part of publishing.
- **Accessibility and localization.** Low-prose mobile presentation helps under constrained attention and reduces approval and translation time. Audience differences are an explicit CERC input.
- **Governance and risk.** Source authority, update cadence, stale-content withdrawal, phase ownership, and rumor correction are first-class controls. A friendly sentence with the wrong timestamp is still unsafe.
- **Access and license.** Both sources are public to read. [Canada.ca terms](https://www.canada.ca/en/transparency/terms.html) and CDC content-specific notices must be checked for reuse, official symbols, third-party items, and attribution.
- **Reusable structure.** Add `incident_phase`, `source_authority`, `issued_at`, `effective_at`, `expires_at`, `supersedes`, `instruction_priority`, `uncertainty`, and `withdrawal_state`; these cannot be represented by tone alone.

### S05 — Visa Product Design System: payments and financial products

- **Sources and freshness.** The [voice-and-tone page](https://design.visa.com/content/voice-and-tone/) and [grammar guidance](https://design.visa.com/content/grammar/) were publicly readable on 17 August 2026; no page-level update date was visible in the reviewed rendering.
- **[Documented practice]** Visa defines product voice as active, readable, and human. It recommends a neutral default tone and names celebratory, supportive, professional, and welcoming modes tied to task contexts.
- **Tone exclusions.** The guide explicitly avoids accusatory, complex, patronizing, and robotic effects. Error and alert examples use a professional rather than celebratory mode.
- **Mechanics and terminology.** Product guidance covers sentence case, acronyms, contractions, symbols, honorifics, parallel structure, lists, component labels, and a sixth-grade reading-level convention. It warns against unexplained abbreviations and English social-title assumptions.
- **Accessibility and localization.** “Active” includes actionable global wording that translates well; component guidance also separates visual semantic color from the clear language needed to communicate state.
- **Governance and risk.** The component pages state that examples are illustrative and not financial, legal, tax, or regulatory advice. Brand and legal teams remain authorities for trademarks and regulated language.
- **Access and license.** Public reading is available without an account. No blanket license to reuse Visa brand language was identified; the site's AS-IS and advice disclaimer remains part of the boundary.
- **Reusable structure.** A categorical `tone_mode` plus `interaction_state` is more faithful than treating tone as one continuous positivity score.

### S06 — Monzo: consumer banking

- **Sources and freshness.** [Monzo Writing Principles](https://monzo.com/tone-of-voice) was publicly readable on 17 August 2026; no page-level update date was visible.
- **[Documented practice]** Monzo uses three named principles: straightforward kindness, everyday magic, and warm wit. Straightforward kindness applies everywhere; the other two are intentionally constrained by channel and risk.
- **Situational tone map.** The guide publishes qualitative channel settings. Operational communications maximize clarity and kindness with no wit; customer service also excludes wit; marketing raises magic and wit; campaigns, paid social, and organic social allow the strongest personality expression.
- **Mechanics and terminology.** It front-loads customer impact, uses normal rather than formal language, gives sincere apologies only when responsibility warrants them, prefers active voice, explains financial jargon, and treats labels as consequential framing.
- **Accessibility and localization.** The guide cautions against idioms, colloquialisms, ableist or gendered language, cultural appropriation, and references that exclude people who do not use English as a first language.
- **Governance and risk.** Humor cannot target people, trivialize money stress, or undermine perceived competence. Sensitive financial and mental-health themes may require vulnerable-customer specialists or customers' own words.
- **Access and license.** Public reading is available. No explicit reuse license was found on the reviewed page; its examples and brand expression should be treated as reference evidence, not copy stock.
- **Reusable structure.** Monzo provides a real precedent for a sparse, channel-conditioned vector with ordinal settings, but its three axes and levels are organization-specific and cannot be copied as universal scales.

### S07 — Shopify: commerce platform and merchant applications

- **Sources and freshness.** The current [app content guidance](https://shopify.dev/docs/apps/design/content), [App Design Guidelines](https://shopify.dev/docs/apps/design/index), and [Built for Shopify requirements](https://shopify.dev/docs/apps/launch/built-for-shopify/requirements) were checked on 17 August 2026. The former `polaris-react` repository was [archived on 11 August 2026](https://github.com/Shopify/polaris-react-archive), showing that implementation and documentation citations can age differently.
- **[Documented practice]** Voice is consistent across contexts while tone changes by audience and current context. Product content should be useful, accessible, readable, nonduplicative, plain, and scannable for merchants around the world.
- **Mechanics and terminology.** The current guidance covers headings, bullets, short sentences, clear actions, errors with a recovery path, grammatical UI labels, content hierarchy, and realistic rather than placeholder content.
- **Accessibility and localization.** Shopify explicitly notes varied literacy and English proficiency. Current component documentation includes right-to-left text and screen-reader-only context and warns against communicating state with color alone.
- **Governance and risk.** “Built for Shopify” turns some writing and design expectations into product-review requirements. This is a different authority level from optional brand advice.
- **Access and license.** Developer documentation is public; Shopify terms and API terms apply. Repository-specific MIT or other licenses do not automatically grant rights to all documentation, imagery, or Shopify marks.
- **[Open question]** The current content page points readers to Polaris voice-and-tone guidance while older Polaris content routes and the deprecated React implementation have changed. A pinned source snapshot is needed before encoding exact Shopify voice rules.
- **Reusable structure.** Record `rule_authority` such as guidance, program requirement, component contract, or legal requirement separately from the wording of the rule.

### S08 — Atlassian: enterprise collaboration software

- **Sources and freshness.** The public [voice-and-tone page](https://atlassian.design/foundations/content/voice-tone/) and [content overview](https://atlassian.design/get-started/content-design) were checked on 17 August 2026; no page-level update date was visible.
- **[Documented practice]** The UI/app voice is bold, optimistic, and practical with a wink. Each trait is dialed up or down based on user state and journey context.
- **Situational tone map.** Boldness and optimism recede during apprehension, confusion, annoyance, fear, or anger. Practicality rises when users are blocked or stressed. A “wink” is reserved for success, relief, social moments, and carefully timed delight.
- **Mechanics and terminology.** The design system connects voice to consistent vocabulary across apps, component guidance, grammar, inclusive language, and date/time rules.
- **Accessibility and localization.** Content should be understandable across cultures and languages; delight must be tested against a global audience and repeated exposure.
- **Governance and risk.** The public page is specifically for UI and app experiences. Broader brand voice and the official Atlassian vocabulary are employee-only, while team and AI standards can add another layer.
- **Access and license.** Public UI guidance is readable without an account, but the visible access gates prove that the public corpus is incomplete. No blanket reuse license was established in this pass.
- **Reusable structure.** Model trait intensity and tone permission by `user_emotion`, `user_experience_level`, `task_blocked`, `success_state`, and `exposure_frequency`.

### S09 — GitLab: DevSecOps and handbook-led enterprise work

- **Sources and freshness.** The [GitLab Content Style Guide](https://handbook.gitlab.com/handbook/marketing/brand-and-product-marketing/brand/content-style-guide/) was checked on 17 August 2026 and publicly displays named maintainers. The broader [communication guidance](https://handbook.gitlab.com/handbook/communication/) is actively maintained and versioned in GitLab.
- **[Documented practice]** GitLab's brand traits are visionary, empathetic, and intentional. Each trait has “we are / we are not” boundaries and supporting tactics rather than standalone adjectives.
- **Scope separation.** Marketing brand voice, product documentation voice, internal simple-language practice, and product UI should not be collapsed. GitLab documentation separately emphasizes concise, direct, precise, searchable, and translatable content.
- **Mechanics and terminology.** The public guide governs vocabulary, grammar, punctuation, formatting, capitalization, dates, time, currencies, and percentages. Simple-language guidance rejects idioms and ambiguous corporate shorthand.
- **Accessibility and localization.** Clear, direct wording and avoidance of culture-bound idioms support an all-remote, global audience and translation.
- **Governance and risk.** Named maintainers, source history, contribution paths, and handbook ownership make provenance unusually visible. Publicness still does not make every internal authority or approval rule visible.
- **Access and license.** The [handbook usage page](https://handbook.gitlab.com/handbook/about/handbook-usage/) states that the handbook uses Creative Commons Attribution-ShareAlike 4.0. GitLab trademarks and product code have separate rules and licenses.
- **Reusable structure.** A source record should retain `scope`, `maintainer`, `version_ref`, `last_changed`, `contribution_path`, and `superseding_source` alongside each rule.

### S10 — GitHub Docs: developer documentation and open-source contribution

- **Sources and freshness.** The official [style-guide source](https://github.com/github/docs/blob/main/content/contributing/style-guide-and-content-model/style-guide.md) and [content-design principles](https://docs.github.com/en/contributing/writing-for-github-docs/content-design-principles) were read from the mutable `main` branch on 17 August 2026; no immutable commit was pinned in this snapshot.
- **[Documented practice]** GitHub Docs calls for clear, simple, approachable, authentic, empathetic, and confident writing for readers with different levels of technical expertise.
- **Mechanics and terminology.** The system favors active voice, direct address, controlled jargon, content models, just-enough documentation, and consistency grounded in the reader's goal rather than grammar for its own sake.
- **Accessibility and localization.** Region-specific idioms and slang are discouraged for a global developer community. Video must not replace written information and needs accessibility treatment.
- **Governance and risk.** The public repository exposes change history, issues, pull requests, source files, contribution rules, and content-model decisions. This improves auditability but does not prove every published page is current or correct.
- **Access and license.** The repository's [LICENSE](https://github.com/github/docs/blob/main/LICENSE) is Creative Commons Attribution 4.0 for the licensed documentation. GitHub trademarks, code, examples, and third-party material can have separate terms.
- **Reusable structure.** Treat a versioned style source and its rendered site as separate artifacts connected by provenance, rather than assuming a URL identifies an immutable rule set.

### S11 — Johns Hopkins University: higher education and research communications

- **Sources and freshness.** The official [voice-and-tone page](https://brand.jhu.edu/messaging/voice-tone/) was checked on 17 August 2026 and displayed a 2014–2026 copyright footer; no content-level update date was visible.
- **[Documented practice]** Johns Hopkins organizes voice around strong, bright, useful, and true, with instructions such as being declarative, succinct, optimistic, active, curious, audience-specific, factual, and free of hype.
- **Tone and audience.** The page says writers should first align on the communication goal and primary audience. It provides brand expression but not a state-by-state tone policy for admissions, learning, research participation, billing, safety, or student support.
- **Mechanics and terminology.** Short sentences, active voice, strong verbs, limited jargon, precise capitalization, grammar, fact checking, and source attribution operationalize the voice.
- **Accessibility and localization.** Public voice guidance offers limited locale-specific instruction in the reviewed page. Broader accessibility, student-service, and international-audience standards would need separate sources.
- **Governance and risk.** Accuracy and sourced claims are explicit brand-credibility controls. Academic and research communications also have legal, ethical, scientific, and participant-safety authorities beyond this page.
- **Access and license.** The page is public to read; no blanket reuse license was found. University marks, claims, imagery, and examples remain protected or separately governed.
- **Reusable structure.** Promotional brand guidance must be tagged `surface_scope: communications`; it cannot silently govern high-stakes learner or research-product interactions.

### S12 — Alaska Airlines Auro: travel and disruption-sensitive journeys

- **Sources and freshness.** The official [Auro voice-and-tone page](https://auro.alaskaair.com/core/voice-and-tone) and current [Auro system home](https://auro.alaskaair.com/) were checked on 17 August 2026; no page-level update date was visible.
- **[Documented practice]** Alaska's product voice conveys competence, confidence, and transparency through genuine, expressive, thoughtful, optimistic, and engaging qualities.
- **Journey tone map.** Inspiration permits subtle play and editorial risk. Shopping and purchase require direct action and payment language, with limited fun. Day-of-travel requires pilot-like confidence, clarity, transparency, information, and direction; disruptions remove personality flourishes.
- **Mechanics and terminology.** The guide recommends front-loading, short scannable structures, reading aloud, iterative editing, and close control of airline terms whose ordinary meanings can mislead travelers.
- **Accessibility and localization.** Content structure accounts for constrained attention and scanning. The reviewed voice page does not publish a complete locale-by-locale verbal model.
- **Governance and risk.** Marketing coordination is allowed during inspiration, while disruption communication prioritizes wayfinding and recovery. Journey phase and operational state can override expressive brand opportunity.
- **Access and license.** Auro guidance and open repositories are publicly accessible, but each repository and asset has its own license. Alaska brand language and marks are not made reusable merely because component code is open.
- **[Open question]** The current Auro site exposes Alaska, Hawaiian, and Atmos visual themes, but the reviewed public voice page is Alaska-specific. No public verbal inheritance contract across those themes was found.
- **Reusable structure.** `journey_phase` and `operational_disruption` should be explicit tone-policy inputs with higher priority than generic delight.

### S13 — Mailchimp: marketing platform and customer communications

- **Sources and freshness.** The public [Content Style Guide](https://styleguide.mailchimp.com/), [voice-and-tone page](https://styleguide.mailchimp.com/voice-and-tone/), and [translation guidance](https://styleguide.mailchimp.com/writing-for-translation/) were checked on 17 August 2026. The current Intuit [Mailchimp product voice page](https://contentdesign.intuit.com/voice-tone/mailchimp/) was also checked because it is a newer overlapping authority.
- **[Documented practice]** The older public guide describes a plainspoken, genuine, translating, dry-humor voice. Tone changes with the reader's emotional state; clarity outranks entertainment, and humor is optional.
- **Channels and mechanics.** The system has separate guidance for UI, educational content, legal content, newsletters, social, accessibility, translation, structured content, grammar, and a word list. It also constrains mascot personification.
- **Accessibility and localization.** Translation guidance can override general style: active and unambiguous syntax, consistent terms, limited idioms, careful contractions, and locale-appropriate formality take precedence. Informality that works in English may offend in another culture.
- **Governance and risk.** The public guide was created for employees but invited external adaptation. Current Intuit guidance says product data favors clear human conversation over sly humor, showing that authority and surface matter.
- **Access and license.** The public style-guide home states a Creative Commons Attribution-NonCommercial 4.0 license and asks for credit. Intuit's current product page has a separate copyright and employee-only brand resources.
- **[Open question]** The public corpus does not expose an explicit precedence rule between every older Mailchimp guide entry and the current Intuit product page. A harness must not merge them without source dates and owners.
- **Reusable structure.** Add `authority_scope`, `publication_generation`, and `surface` so a translated product string does not inherit a marketing-humor rule by accident.

### S14 — The Conversation: research journalism, media, and public knowledge

- **Sources and freshness.** The official [tone-and-voice page](https://brand.theconversation.com/docs/tone-and-voice/) identifies version 1.4 and an update date of 5 February 2026; it was checked on 17 August 2026. The current [accessibility guidance](https://brand.theconversation.com/docs/accessibility/) identifies version 1.4 and an update date of 4 June 2026.
- **[Documented practice]** The system uses informed, accessible, and engaging qualities. Communications should be factual and evidence-led, simple enough for a nonspecialist, professional without distance, and interesting without sensationalism.
- **Tone and channels.** Brand communications may be somewhat more informal and persuasive than editorial articles, but the guide rejects clickbait, hard-sell manipulation, false urgency, unsupported superlatives, and emotional exaggeration.
- **Mechanics and terminology.** Claims should cite evidence where appropriate; complex material should use short sentences, subheadings, bullets, and concise paragraphs. Calls to action should use consistent verbs and invite curiosity rather than manufacture fear of missing out.
- **Accessibility and localization.** The public accessibility system covers WCAG 2.2, European Accessibility Act expectations, meaningful alt text, captions and transcripts, descriptive links, heading structure, helpful errors, keyboard access, reduced motion, and screen-reader testing.
- **Governance and risk.** Brand messaging, editorial independence, expert authorship, fact checking, source attribution, and accessibility are related but separate controls. Matching an “informed” tone cannot prove a claim is accurate or editorially independent.
- **Access and license.** The brand kit is public to read. No blanket license for adapting its brand language was found on the reviewed pages; article-republication permissions and editorial policies do not automatically license the brand system or marks.
- **Reusable structure.** Media content needs `claim_source`, `editorial_or_brand_scope`, `evidence_status`, `author_role`, `fact_check_state`, `sensationalism_risk`, and `accessibility_review` in addition to a voice profile.

### S15 — Adobe Spectrum: creative and professional software

- **Sources and freshness.** The official [voice-and-tone page](https://spectrum.adobe.com/page/voice-and-tone/), [Spectrum home](https://spectrum.adobe.com/), and [font guidance](https://spectrum.adobe.com/page/fonts/) were checked on 17 August 2026; no page-level update date was visible on the voice page.
- **[Documented practice]** Spectrum defines a rational, human, and focused product voice: clear and research-informed; friendly, honest, and responsible; concise and free of unnecessary concepts.
- **Situational tone spectrum.** It names motivational, helpful, instructive, reassuring, and supportive modes and pairs each with an attitude and intended frequency. Instructive is common; the emotional extremes are rarer.
- **Mechanics and terminology.** Grammar decisions should be research-informed and tested; new concepts and names should be created only when needed. Component pages map tone to UI purposes such as cards.
- **Accessibility and localization.** The system connects human language to user emotion and supports multiple scripts in its typography system, but font coverage is not a complete linguistic or cultural voice model.
- **Governance and risk.** Frequency guidance limits overuse of emotional tone. “Supportive” is not a license for the system to claim feelings it cannot know.
- **Access and license.** Spectrum guidance is publicly readable and official implementations such as [Spectrum Web Components](https://github.com/adobe/spectrum-web-components) use Apache-2.0. Adobe Clean font families are explicitly restricted to Adobe products; brand and documentation rights are separate.
- **Reusable structure.** A tone mode can have `attitude`, `allowed_contexts`, `prohibited_contexts`, and `expected_frequency`; frequency is a corpus and exposure property, not just a sentence property.

### S16 — Intuit: multi-brand portfolio and shared AI voice

- **Sources and freshness.** The [portfolio voice-and-tone page](https://contentdesign.intuit.com/voice-tone/), [Intuit AI voice-and-tone page](https://contentdesign.intuit.com/ai/voice-tone/), [QuickBooks page](https://contentdesign.intuit.com/voice-tone/quickbooks/), and [Mailchimp page](https://contentdesign.intuit.com/voice-tone/mailchimp/) were checked on 17 August 2026. The site home displayed February 2026 AI updates and a 2026 copyright.
- **[Documented practice]** Intuit has a portfolio strategy that flexes for QuickBooks, TurboTax, Mailchimp, and Intuit Accountant. Each product exposes a distinct character and voice while relating to an Intuit-level customer-champion strategy.
- **Shared AI layer.** Intuit describes AI as a knowledgeable, approachable guide, with plainspoken and genuine attributes. The page explicitly says this does not replace product-level voice and tone.
- **Situational tone.** The AI default is neutral and professional because money and business are high-stakes and models cannot reliably read the room. Breezy humor did not test well in that context; Mailchimp is an explicit exception with its own history and rules.
- **Mechanics, terminology, and evaluation.** The public system contains a word list for tax and money terms, emotional design, testing, patterns, formatting, anti-racist language, and AI prompting/evaluation links. Some implementation material is employee-only.
- **Accessibility and localization.** A shared framework must still yield to product audience, locale, risk, and established product rules. Public pages do not expose every locale-specific realization.
- **Governance and risk.** Portfolio, product, AI, and surface authorities form an inheritance graph, not a flat style sheet. Human content designers remain responsible for quality and evaluation.
- **Access and license.** Much of the content system is publicly readable; voice examples, Figma boards, prompting, evaluation, and product resources can be employee-only. The public copyright does not grant a general adaptation license.
- **Reusable structure.** Use typed `inherits_from` and `overrides` edges with explicit precedence: portfolio → product → experience type → surface/context → locale, while regulatory and safety controls can supersede every brand layer.

### S17 — CRIF NEXT: white-label financial and enterprise software

- **Sources and freshness.** The official CRIF Digital [NEXT Design System page](https://www.crif.digital/design-system/design-system/) was checked on 17 August 2026; no page-level update date was visible.
- **[Documented practice]** NEXT aims to standardize CRIF products, starts its tone of voice from CRIF identity, and offers white-label, adjustment, and customization modes for customer-branded solutions.
- **White-label boundary.** The page says the base white-label experience reflects CRIF identity and that customer branding can alter the experience within system guidance. It provides far more detail about visual and component adaptation than verbal adaptation.
- **Accessibility and platform mechanics.** The public page references WCAG 2.1 AA, responsive cross-platform behavior, reusable components, and design-team support.
- **Governance and risk.** Co-design and adherence to NEXT rules are named, but no public rule hierarchy identifies who owns customer terminology, regulated disclosures, tone exceptions, localization, or conflict resolution.
- **Access and license.** The page is public to read; no public license granting adaptation of CRIF brand copy or assets was identified.
- **[Open question]** A real white-label content contract still needs evidence for base semantics, customer voice tokens, protected product terms, regulatory text, locale ownership, override validation, and approval rights.
- **Reusable structure.** Do not infer that visual theme tokens imply verbal theme tokens. White-label content needs a separate inheritance and protected-constraint model.

### S18 — Google and Microsoft: multilingual writing infrastructure

- **Sources and freshness.** Google's [global-audience guidance](https://developers.google.com/style/translation) says it was last updated 11 June 2026 UTC. Microsoft's [global communications guide](https://learn.microsoft.com/en-us/style-guide/global-communications/) says it was last updated 8 January 2025; its [localization overview](https://learn.microsoft.com/en-us/globalization/localization/localization-overview) and [language-specific style-guide index](https://learn.microsoft.com/en-us/globalization/reference/microsoft-style-guides) were checked on 17 August 2026.
- **[Documented practice]** Google treats global writing as clear, concise, unambiguous, consistent, inclusive, and free of culture-bound idioms, slang, humor, and seasonal assumptions. Microsoft separates translation, localization, and internationalization and calls for a style guide per target language.
- **Mechanics and terminology.** Both systems emphasize stable terms, standard syntax, resource separation, local formats, translator context, and validation. Microsoft names translation memories and termbases as maintained assets rather than incidental notes.
- **Accessibility and localization.** Text direction, expansion, calendars, numbers, currency, names, images, input, keyboard, legal requirements, and local cultural expectations can change the product experience.
- **Governance and risk.** Linguistic correctness without in-context review does not prove appropriateness. Locale experts, product teams, legal reviewers, translators, and QA have different decision rights.
- **Access and license.** Google states that the page text is Creative Commons Attribution 4.0 unless otherwise noted and code samples are Apache 2.0. Microsoft Learn is public to read, but Microsoft terms and the licenses attached to individual samples or resources apply separately.
- **Reusable structure.** Voice realization must be locale-specific and context-tested. A source-English embedding or translation score is not sufficient evidence of preserved intent, tone, safety, or accessibility.

## Cross-source findings

### 1. Industry is a context prior, not a voice owner

**[Cross-source finding]** Organizations in the same broad domain make materially different voice choices. [Visa](https://design.visa.com/content/voice-and-tone/) uses a neutral global product default; [Monzo](https://monzo.com/tone-of-voice) permits warm wit in bounded marketing contexts; [Intuit's AI guidance](https://contentdesign.intuit.com/ai/voice-tone/) suppresses breezy humor for money and business while the portfolio system preserves [Mailchimp](https://contentdesign.intuit.com/voice-tone/mailchimp/) as a product-level exception. These are not contradictions to average away. They prove that brand, product, audience, and moment must stay explicit.

**[Inference]** An agent may use domain to select risks, governing sources, reviewers, and expected user states. It must not generate a brand voice from `industry = finance`.

### 2. Stable voice and situational tone are different records

**[Cross-source finding]** [GOV.UK](https://www.gov.uk/service-manual/design/writing-for-user-interfaces), [NHS England](https://service-manual.nhs.uk/content/voice-and-tone), [Visa](https://design.visa.com/content/voice-and-tone/), [Monzo](https://monzo.com/tone-of-voice), [Atlassian](https://atlassian.design/foundations/content/voice-tone/), [Alaska Auro](https://auro.alaskaair.com/core/voice-and-tone), [Mailchimp](https://styleguide.mailchimp.com/voice-and-tone/), [Adobe Spectrum](https://spectrum.adobe.com/page/voice-and-tone/), and [Intuit](https://contentdesign.intuit.com/voice-tone/) all distinguish a relatively stable voice from a context-dependent tone. They differ in how they model the context:

| System | Public tone structure | Main conditioning variables |
| --- | --- | --- |
| NHS | Named tone combinations | Health subject, emotional state, message purpose |
| Visa | Named modes | Onboarding, instruction, support, success, error, alert |
| Monzo | Three trait levels by channel | Operational, service, marketing, campaign, paid and organic social |
| Atlassian | More or less expression of traits | Emotion, journey, experience level, blocked or successful state |
| Alaska | Journey-phase policy | Inspiration, shopping/purchase, day of travel, disruption |
| Spectrum | Ordered categorical spectrum plus frequency | Need for motivation, instruction, reassurance, or support |
| Intuit | Portfolio, product, and AI inheritance | Product, generated versus authored content, risk, audience, emotional context |
| Canada/CDC | Incident operations rather than brand modulation | Crisis phase, urgency, authority, update status, audience, translation |

**[Inference]** `tone = f(voice, audience, task, journey_state, user_state, channel, consequence, locale, exposure)` is a useful conceptual boundary. It is not yet a fitted mathematical model and should not be assigned universal weights from this corpus.

### 3. Risk can suppress brand expression

**[Cross-source finding]** [GOV.UK](https://www.gov.uk/service-manual/design/writing-for-user-interfaces) reduces familiarity in government service moments; [NHS England](https://service-manual.nhs.uk/content/voice-and-tone) combines authority with reassurance; [Monzo](https://monzo.com/tone-of-voice) removes wit from customer service and negative operational news; [Atlassian](https://atlassian.design/foundations/content/voice-tone/) limits its wink during stress and errors; [Alaska Auro](https://auro.alaskaair.com/core/voice-and-tone) removes playful expression during travel disruption; [Intuit](https://contentdesign.intuit.com/ai/voice-tone/) keeps AI neutral and professional around money and business.

**[Inference]** Risk policy should act as a constraint or override, not as another equally weighted voice trait. A high-risk constraint can veto otherwise on-brand humor, celebration, ambiguity, or persuasion.

### 4. Mechanics and terminology are not tone

**[Cross-source finding]** [GOV.UK's A-to-Z style guide](https://www.gov.uk/guidance/style-guide/a-to-z), [Visa's grammar guidance](https://design.visa.com/content/grammar/), [GitLab's Content Style Guide](https://handbook.gitlab.com/handbook/marketing/brand-and-product-marketing/brand/content-style-guide/), [GitHub Docs' style guide](https://github.com/github/docs/blob/main/content/contributing/style-guide-and-content-model/style-guide.md), [Atlassian's language-and-grammar guidance](https://atlassian.design/foundations/content/language-and-grammar), and Intuit's [formatting](https://contentdesign.intuit.com/style-and-usage/formatting/) and [word-list](https://contentdesign.intuit.com/word-list/) guidance maintain rules distinct from voice and tone for sentence case, active voice, dates, acronyms, labels, reading level, formality, apologies, source attribution, and preferred or prohibited terms.

**[Inference]** A sentence can score as warm or confident and still fail because it uses the wrong product term, obscures responsibility, violates a legal phrase, creates a localization defect, or gives no recovery action.

### 5. Localization can override source-language personality tactics

**[Cross-source finding]** [Mailchimp's translation guidance](https://styleguide.mailchimp.com/writing-for-translation/) can supersede its general voice rules; [Google's global-audience guide](https://developers.google.com/style/translation) removes idioms and humor from global developer writing; Microsoft's [localization overview](https://learn.microsoft.com/en-us/globalization/localization/localization-overview) and [language-specific style-guide index](https://learn.microsoft.com/en-us/globalization/reference/microsoft-style-guides) call for target-language style guides, terminology, translation memories, context, and in-product linguistic validation; [Shopify](https://shopify.dev/docs/apps/design/content) and [Atlassian](https://atlassian.design/foundations/content/inclusive-writing) write for people across languages and cultures.

**[Inference]** Store `voice_intent` separately from `locale_realization`. The goal is equivalent relationship and task support, not lexical or syntactic sameness.

### 6. Governance is part of the content system

**[Cross-source finding]** [GitLab](https://handbook.gitlab.com/handbook/marketing/brand-and-product-marketing/brand/content-style-guide/) and [GitHub Docs](https://github.com/github/docs/blob/main/content/contributing/style-guide-and-content-model/style-guide.md) expose version history and contribution paths; GOV.UK separates [writing guidance](https://www.gov.uk/service-manual/design/writing-for-user-interfaces) from the [Service Standard](https://www.gov.uk/service-manual/service-standard), while Shopify separates [app content guidance](https://shopify.dev/docs/apps/design/content) from [Built for Shopify requirements](https://shopify.dev/docs/apps/launch/built-for-shopify/requirements); [NHS patient-message guidance](https://service-manual.nhs.uk/content/writing-nhs-messages) names clinical safety and governance; [Intuit](https://contentdesign.intuit.com/voice-tone/) exposes portfolio and product authorities; public pages in [Atlassian](https://atlassian.design/get-started/content-design) and [Intuit](https://contentdesign.intuit.com/) also reveal employee-only layers.

**[Inference]** A voice graph without ownership, provenance, precedence, approval, effective dates, and deprecation cannot safely govern agent decisions.

## Multi-brand and white-label evidence

### Intuit: explicit verbal inheritance with product exceptions

**[Documented practice]** Intuit is the strongest public multi-brand verbal example in this pass. Its shared strategy flexes across QuickBooks, TurboTax, Mailchimp, and Intuit Accountant. The AI guide supplies another shared layer but explicitly preserves product-level voice.

**[Inference]** The minimum graph needs typed nodes for `organization`, `portfolio`, `product`, `experience_type`, `surface`, `context`, and `locale`; edges need `inherits`, `specializes`, `overrides`, `prohibits`, and `requires_review` semantics.

### Auro: multiple themes without a public verbal inheritance contract

**[Sourced fact]** The [Auro site](https://auro.alaskaair.com/) exposes Alaska, Hawaiian, and Atmos site themes, while its official [design-token API reference](https://auro.alaskaair.com/getting-started/developers/design-tokens/docs/api-reference) documents package outputs organized by theme, including Alaska, Hawaiian, and Auro Classic. The public [voice-and-tone guidance](https://auro.alaskaair.com/core/voice-and-tone) reviewed here describes Alaska.

**[Open question]** Whether the other themes inherit, replace, or supplement Alaska's verbal model is not established publicly. Visual multi-brand support must not be treated as evidence of content multi-brand support.

### CRIF NEXT: white-label claims with an incomplete public content contract

**[Documented practice]** NEXT distinguishes a CRIF-based white-label starting point, customer adjustments, and deeper customization. Its public material does not reveal how customer voice, protected terms, locale rules, regulated copy, or approval rights compose.

**[Inference]** A white-label voice system needs three separate layers:

1. invariant product semantics and safety rules;
2. vendor defaults and protected product terminology;
3. customer brand, locale, and channel overrides with explicit validation and ownership.

## Multilingual evidence

### What the public systems consistently require

| Layer | Public evidence | Implication for a content agent |
| --- | --- | --- |
| Source-language preparation | Google, Microsoft, Mailchimp, Shopify, GitHub, and Atlassian favor unambiguous syntax and consistent terms | Lint the source before translation; do not grade only the target |
| Locale voice and formality | Mailchimp notes formal/informal address differences; Microsoft calls for target-language style guides | Store locale-specific register and address rules, not a universal formality number |
| Terminology | Microsoft calls for termbases; multiple product systems maintain word lists | Terms need concept IDs, locale realizations, status, owner, and do-not-translate rules |
| Translation memory | Microsoft treats translation memory as maintained production infrastructure | Preserve approved segment provenance and freshness without allowing stale reuse to override new meaning |
| Layout and interaction | Microsoft covers expansion and right-to-left behavior; Shopify demonstrates RTL components | Evaluate strings in rendered context, not as isolated text |
| Culture | Google removes culture-bound idioms and humor; Mailchimp asks translators to advise on offense and formality | Cultural appropriateness needs locale expertise, not automated translation confidence alone |
| Accessibility | Images, text direction, screen-reader context, labels, and cognitive load recur across systems | Accessibility rules apply before and after localization |
| Validation | Microsoft distinguishes linguistic correctness from contextual appropriateness | Require in-context linguistic review and functional QA for consequential surfaces |

**[Open question]** None of the reviewed public systems provides a complete, validated cross-locale numerical mapping that would let an agent convert “warm = 0.7 in English” into an equivalent score in Arabic, Japanese, Spanish, or another language. Such a mapping must be studied with locale specialists and users rather than invented.

## Measurement-ready structures supported by the corpus

The following structures are an evidence-grounded extraction target, not a finished scoring model.

### A. Typed voice profile

| Field | Type | Evidence basis | Important boundary |
| --- | --- | --- | --- |
| `voice_trait_id` | Stable identifier | Named traits in every brand system | Names are organization-specific |
| `definition` | Text plus source reference | Trait explanations and “means” statements | Adjectives without operational definitions are insufficient |
| `positive_markers` | Examples or testable features | “Do” examples and mechanics | Surface and locale must be retained |
| `negative_markers` | Examples or prohibited effects | “Not,” “avoid,” and exclusion guidance | Absence is not proof of prohibition |
| `scope` | Organization, product, surface, channel | Atlassian, GitLab, GitHub, Intuit | Never default silently to organization-wide |
| `owner` | Role or team | Named maintainers and brand/content teams | Public sources often omit the owner |
| `effective_from` and `supersedes` | Provenance | Versioned guides and dated updates | URL alone is not a version |

### B. Contextual tone policy

| Field | Suggested representation | Public precedent |
| --- | --- | --- |
| `tone_mode` | Categorical | Visa and Spectrum modes |
| `trait_intensity` | Sparse ordinal scale with verbal anchors | Monzo high/medium/low/none and Atlassian more/less |
| `journey_phase` | Controlled category | Alaska inspiration, purchase, day-of-travel |
| `interaction_state` | Controlled category | Error, warning, success, onboarding, support |
| `user_state` | Observed, reported, or hypothesized plus confidence | NHS and Atlassian emotional-context questions |
| `channel` | Controlled category | Monzo, NHS, Mailchimp |
| `severity` and `consequence` | Ordinal plus explicit harm class | Crisis, health, finance, disruption |
| `expression_permission` | Allow, limit, prohibit, review | Humor, delight, apology, persuasion constraints |
| `expected_frequency` | Corpus-level band | Spectrum's rare/occasional/often guidance |
| `exposure_frequency` | Observed count or range | Atlassian's warning that repetition changes delight |

### C. Deterministic constraint layers

The public corpus supports direct or rule-based checks for:

- preferred, prohibited, deprecated, and do-not-translate terms;
- sentence case, punctuation, symbols, acronyms, numerals, dates, and time;
- person and pronoun policy;
- active/passive constructions where responsibility matters;
- maximum component lengths and structural patterns;
- required action, recovery, source, timestamp, legal, privacy, or safety content;
- reading-level targets when the owning system explicitly sets one;
- locale, script, direction, placeholder, and interpolation integrity;
- source authority, approval, effective date, expiry, and supersession.

These are not all “voice scores.” They should fail independently and expose the controlling rule.

### D. Human-judgment dimensions

The sources repeatedly invoke qualities that cannot be reduced safely to a lexical counter:

- contextual appropriateness;
- respect and non-patronization;
- reassurance without false certainty;
- empathy without claiming to know a person's feelings;
- credibility and responsibility;
- humor that includes rather than targets;
- brand recognition without obstruction;
- cultural and locale fit;
- user comprehension, recovery, and trust;
- harm from omission, ambiguity, stale information, or misplaced persuasion.

**[Inference]** These require adjudicated examples, blinded human review, inter-rater agreement, and outcome testing. An LLM judge can assist but must not become the uncalibrated source of truth.

### E. Candidate observable axes

The corpus supports testing the usefulness of these axes, but not universal weights or thresholds:

| Axis | Low anchor | High anchor | Why it cannot stand alone |
| --- | --- | --- | --- |
| Directness | Indirect, layered | Explicit next action first | Direct wording can still be rude, wrong, or unsafe |
| Formality | Conversational | Institutional or ceremonial | Appropriate formality varies by locale and power relation |
| Warmth | Detached | Personally considerate | Warmth can become false familiarity |
| Reassurance | Purely informational | Explicitly calming and supportive | Reassurance without evidence can mislead |
| Expressiveness | Plain | Vivid or distinctive | Brand expression can obstruct task completion |
| Humor | None | Salient comic framing | Even “good” humor can be unsafe in the wrong state |
| Celebration | Neutral acknowledgment | Enthusiastic recognition | Success magnitude and repetition matter |
| Urgency | No time pressure | Immediate action | Urgency must be factually warranted |
| Density | Layered and expansive | Highly compressed | Compression can remove qualifications or recovery |
| Authority | Suggestive | Directive | Authority must match the sender's actual power and evidence |

**[Open question]** Whether these axes are independent, ordinal, culturally stable, and reliably judgeable remains unproven. Factor analysis, item-response work, or another mathematical model should begin only after a diverse annotated corpus exists.

## Counterexamples and non-transfer rules

1. **Friendly is not universally safe.** GOV.UK warns against over-familiar government language; NHS combines personal language with authority; crisis systems prioritize directions and timestamps.
2. **Humor is not a general engagement feature.** Monzo allows it mainly in marketing, Atlassian limits its wink during stress, Alaska removes it during disruptions, and Intuit's AI testing disfavors breezy humor around money and business.
3. **A promotional voice is not a product-state policy.** Johns Hopkins offers strong communications guidance but does not define tone for every learner, billing, research, or safety interaction.
4. **A global English rule is not a localized voice.** Google and Microsoft improve source readiness; neither substitutes for target-locale voice, terminology, context, and validation.
5. **Open-source code is not open brand language.** Adobe, Shopify, GitHub, and GitLab all demonstrate separable code, documentation, font, trademark, and brand rights.
6. **Visual theming is not verbal inheritance.** Auro and CRIF expose multi-theme or white-label design behavior without a complete public content override model.
7. **Public guidance is not complete governance.** Atlassian and Intuit expose employee-only vocabulary, Figma, prompting, evaluation, or broader brand resources.
8. **A current URL is not a version.** GitHub `main`, live handbooks, and changing Polaris routes require dated snapshots or commit references before benchmark use.
9. **Tone match cannot rescue semantic failure.** Wrong eligibility, amount, deadline, medical direction, recovery step, or crisis timestamp remains wrong even if the sentence sounds on-brand.
10. **Similar adjectives do not prove similar systems.** “Clear,” “human,” and “confident” recur, but their definitions, constraints, examples, audiences, and authorities differ.

## Access, license, and freshness register

Exact source dates in this register were rechecked against the linked official pages at the 17 August 2026 evidence cutoff. A “checked” date records access during this review; it is not a publisher-supplied update date.

| System | Public access observed | Explicit reuse or restriction evidence | Freshness evidence captured | Safe use in this project |
| --- | --- | --- | --- | --- |
| GOV.UK | No account | [OGL-based terms](https://www.gov.uk/help/terms-conditions), with stated exceptions | Publishing guidance showed an 11 August 2026 update at the evidence cutoff | Cite and adapt only within the license and applicability boundaries |
| Home Office | No account | No separate blanket license verified in this pass | Checked 17 August 2026; no visible page date | Reference as documented practice; verify rights before copying examples |
| NHS | No account | [OGL v3.0](https://service-manual.nhs.uk/terms-and-conditions) | Voice page updated November 2019; messaging guide checked 17 August 2026 | Cite with England and clinical-governance scope intact |
| Canada.ca / CDC | No account | [Canada.ca terms](https://www.canada.ca/en/transparency/terms.html); CDC page-specific notices may vary | Canada checklist modified 21 December 2021; CERC index dated 20 November 2024 | Reference methods; recheck current incident and jurisdiction guidance |
| Visa | No account | Public pages carry AS-IS and non-advice boundaries; no blanket brand-copy license found | Checked 17 August 2026; no visible page date | Use as evidence, not regulated advice or copy inventory |
| Monzo | No account | No explicit reuse license found on the reviewed page | Checked 17 August 2026; no visible page date | Extract structures, not Monzo expressions |
| Shopify | No account | Developer and API terms plus repository-specific licenses | Current docs checked 17 August 2026; React repo archived 11 August 2026 | Pin exact current sources before encoding rules |
| Atlassian | Public UI page; employee-only deeper assets | No blanket reuse license verified | Checked 17 August 2026; no visible page date | Record public and gated authorities separately |
| GitLab | No account | [CC BY-SA 4.0 handbook](https://handbook.gitlab.com/handbook/about/handbook-usage/) | Mutable handbook checked 17 August 2026 | Preserve attribution, share-alike duties, scope, and version reference |
| GitHub Docs | No account | [CC BY 4.0 repository license](https://github.com/github/docs/blob/main/LICENSE) | Mutable `main` checked 17 August 2026 | Pin commit before fixture use and preserve attribution |
| Johns Hopkins | No account | No blanket reuse license found | Footer showed 2014–2026; checked 17 August 2026 | Reference structure; do not reuse brand claims or examples as defaults |
| Alaska Auro | No account | Repository and brand assets have separate terms | Checked 17 August 2026; no visible voice-page date | Pin page and relevant repository licenses separately |
| Mailchimp | No account | Public guide states [CC BY-NC 4.0](https://styleguide.mailchimp.com/) | Public guide and current Intuit page checked 17 August 2026 | Preserve attribution/noncommercial boundary and adjudicate authority |
| The Conversation | No account | No blanket adaptation license for the brand kit was found; editorial-republication terms are a separate scope | Tone version 1.4 updated 5 February 2026; accessibility version 1.4 updated 4 June 2026 | Reference its evidence-led structure without treating brand or editorial claims as reusable defaults |
| Adobe Spectrum | No account; some assets require Adobe ID/terms | Open implementations can be Apache-2.0; [Adobe Clean fonts are restricted](https://spectrum.adobe.com/page/fonts/) | Checked 17 August 2026; no visible voice-page date | Separate documentation, implementation, font, and brand rights |
| Intuit | Public core; employee-only deeper resources | Copyrighted public site; no general adaptation license found | Site displayed February 2026 updates and 2026 copyright | Treat public rules as documented practice and gated material as unavailable |
| CRIF NEXT | No account | No public adaptation license found | Checked 17 August 2026; no visible page date | Use only as partial white-label evidence |
| Google / Microsoft | No account | Google page: CC BY 4.0 text and Apache-2.0 samples; Microsoft resource-specific terms | Google updated 11 June 2026; Microsoft global guide 8 January 2025 | Reuse only under the stated resource license and retain locale scope |

## Unresolved gaps and acquisition needs

### Evidence gaps

- **[Open question]** Which public guides correspond to implemented production strings rather than aspirational brand guidance?
- **[Open question]** Which rules are enforced automatically, reviewed by humans, or merely advisory?
- **[Open question]** What source precedence is used when brand, product, component, legal, policy, locale, and accessibility guidance conflict?
- **[Open question]** How often do owners update a voice system, and how are deprecated terms and rules withdrawn from tools and models?
- **[Open question]** Which organizations measure comprehension, task success, trust, localization quality, support burden, or harm after a tone change?
- **[Open question]** How do regulated teams distinguish approved, designed, implemented, and live content states?
- **[Open question]** How do white-label systems preserve product semantics while allowing customer voice and locale variation?
- **[Open question]** What constitutes evidence that generated content is human-appropriate rather than merely statistically style-similar?

### Materials needed before mathematical calibration

1. Version-pinned, rights-cleared guide excerpts with stable source IDs.
2. Paired acceptable/unacceptable examples labeled by source, surface, state, locale, and rationale.
3. Authentic journey samples spanning ordinary, success, warning, error, disruption, vulnerability, and recovery states.
4. Practitioner adjudication from content designers, locale specialists, accessibility specialists, and domain-risk owners.
5. Independent user evidence for comprehension, trust, action success, and perceived appropriateness.
6. Locale-specific examples that preserve intent without forcing English syntax, humor, or formality.
7. Conflict cases in which brand expression loses to legal, clinical, safety, privacy, accessibility, or user-outcome requirements.
8. A gold set with disagreements retained, not erased, so inter-rater reliability and uncertainty can be measured honestly.

### Stop condition for this snapshot

This corpus is sufficient to define candidate graph entities, context fields, constraint layers, and research fixtures. It is not sufficient to assign universal voice coordinates, industry defaults, cross-locale conversion weights, or pass/fail thresholds. Those require practitioner evidence and a rights-cleared annotated corpus.
