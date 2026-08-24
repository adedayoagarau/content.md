---
title: Cross-industry content-design domain and risk matrix
status: working-research
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
geographic_coverage:
  - United States
  - United Kingdom
  - European Union
  - selected international standards and public-health guidance
legal_notice: Research material only; not legal, regulatory, medical, financial, clinical, security, or safety advice
source_notes: ../sources/domain-source-notes.md
---

# Cross-industry content-design domain and risk matrix

## Conclusion first: industries do not have inherent voices

There is no defensible single `finance voice`, `healthcare voice`, `government voice`, or `gaming voice`.

An industry's laws and conventions may constrain **facts, terms, disclosures, sequence, prominence, consent, recourse, recordkeeping, and approvals**. They do not determine a brand personality. A bank can be warm or reserved; a hospital can be conversational or formal; a game can be exuberant during play and neutral during enforcement. In every case, tone must change when the user's context changes.

The working model is:

> **Rendered content = approved brand voice + situational tone + domain conventions + verified product facts + locale/culture adaptation + accessibility requirements + risk controls + surface constraints.**

This is an [Inference], not a legal formula. It prevents a repository agent from using an industry label as permission to invent voice or regulated language.

## What this matrix is—and is not

This matrix identifies information and controls a content designer or agent should seek before proposing content. It is deliberately broader than UX writing. It covers content architecture, terminology, choice design, notifications, support, appeals, recovery, and lifecycle maintenance.

It is not:

- a global legal checklist;
- permission for an agent to decide policy, coverage, eligibility, diagnosis, liability, pricing, consent, safety, or rights;
- proof that a cited rule applies to a product;
- a substitute for user research, local-language review, accessibility testing, security review, or professional approval;
- a claim that a whole domain should sound alike.

Source IDs refer to [domain source notes](../sources/domain-source-notes.md). Labels distinguish sourced material from recommendations.

## The axes that must remain separate

| Axis | Question | Repository evidence | Failure if collapsed |
| --- | --- | --- | --- |
| Brand voice | What stable relationship does this organization intend to have with people? | Approved voice principles, examples, counterexamples, owner | An industry stereotype is mistaken for brand identity. |
| Situational tone | What does this person need in this moment? | State, consequence, urgency, evidenced event context, possible cognitive/emotional load, knowledge, channel | Celebration appears during loss; warmth obscures a warning; the product claims to know an individual's emotion. |
| Domain convention | What concepts and structures help people operate in this field? | Domain glossary, standard document structures, expert decisions | Necessary concepts are removed as `jargon`, or internal jargon is exposed. |
| Controlled fact | What claim must be exactly true? | Policy, product behavior, price, data map, approved claim, effective date | The agent writes plausible but false behavior or rights. |
| Regulation/policy | Which jurisdiction-, role-, product-, and date-specific requirements apply? | Applicability memo, counsel/compliance decision, source version | A US rule is generalized globally or obsolete text is reused. |
| Risk | What happens if the content is wrong, missed, late, or misunderstood? | Risk classification, harm scenarios, rollback/recourse | A high-consequence decision is treated like routine microcopy. |
| Locale and culture | How do language, script, formats, institutions, and norms change meaning? | Locale profile, translator notes, local review | English structure is translated literally; law and cultural meaning drift. |
| Accessibility | Can people perceive, understand, operate, and recover across abilities and assistive technology? | Accessibility target, semantic context, alternative formats, test evidence | A readable sentence remains inaccessible in the interaction. |
| Surface and channel | Where, when, and how is the content received? | Rendered screen, trigger, delivery rules, limits, fallback | A disclosure is separated from the claim or a push alert leaks private data. |
| Record integrity | What are the orthogonal evidence dimensions, independent decision/delivery states, and evaluation records? | Evidence provenance/dimensions; accountable owner and approval record; independent state histories; timestamps | Existing code is mistaken for approved canon or verified delivery is mistaken for release. |

## Risk model for content decisions

This provisional scale is an [Inference] for triage, not a universal compliance classification.

| Level | If wrong or misunderstood | Typical examples | Minimum content control proposed |
| --- | --- | --- | --- |
| R0 — informational | Low consequence; no meaningful decision or personal data | Decorative empty-state guidance, non-transactional tips | Repository context, style checks, accessibility review. |
| R1 — routine/reversible | Minor friction; action is easy to inspect and undo | Filters, preferences, draft deletion with recovery | Verify behavior and undo; test labels and state confirmation. |
| R2 — consequential/recoverable | Time, money, access, reputation, or data may be affected but recourse exists | Subscription change, marketplace listing, account-role change | Product/operations owner; explicit consequence, timing, confirmation, recovery. |
| R3 — high consequence | Financial, health, legal, eligibility, privacy, security, education, or safety harm | Credit decline, coverage exclusion, diagnosis-adjacent guidance, consent, moderation suspension | Controlled facts; named specialist approval; versioned sources; redress; human review; end-to-end verification. |
| R4 — immediate/irreversible | Life safety, imminent crisis, permanent loss, or action that cannot reasonably be recalled | Evacuation alert, emergency instruction, destructive production operation, imminent self-harm escalation | The applicable incident protocol and accountable incident owner govern approval and release; use two-person review only where that protocol requires or permits it; provide accessible delivery, time/source/area/action, and post-release monitoring. |

Risk is compositional. A playful low-risk game becomes high-risk at purchase, child safety, account sanctions, or crisis reporting. An ordinary settings screen becomes high-risk when it changes consent, security, public visibility, or data deletion.

### Automatic escalation signals

A content agent should stop autonomous application when it encounters any of the following and request the missing typed controls separately: a fit evidence source with observation/challenge/freshness/lineage/epistemic dimensions; an applicable governing instrument and applicability determination where relevant; the accountable owner for the declared fact or decision class; and the authorized approver plus exact approval record required for the scope. An evidence source cannot substitute for accountable ownership or approval, and an owner cannot substitute for evidence or governing applicability. **[Inference]**

- a new or changed price, fee, rate, tax, exchange rate, renewal, refund, odds, benefit, or coverage claim;
- eligibility, denial, adverse action, suspension, diagnosis, treatment, dosage, legal right, duty, liability, or deadline;
- consent, privacy purpose, data recipient, retention, age assurance, identity verification, or biometric use;
- an irreversible action, loss of access/data/money, security incident, physical danger, self-harm, abuse, or emergency;
- a contradiction between policy, code, design, localization, support material, or current law;
- material uncertainty about the actor, jurisdiction, regulated role, audience age, or language when it changes meaning, rights, safety, or the required decision path;
- an accessibility need that the current pattern cannot meet through approved inclusive defaults or supported user preferences; do not block routine drafting merely because an individual need is unknown;
- required exact wording, prescribed ordering, or approved claim for which the source and version are absent.

## Universal pre-writing evidence packet

Before writing any meaningful product content, the system should attempt to resolve these fields. `Unknown` is a valid result; invention is not.

1. **User and role:** person, administrator, buyer, seller, patient, caregiver, student, parent, donor, traveler, developer, regulator, or another actor.
2. **Job and decision:** what the person is trying to do, decide, understand, prevent, or recover from.
3. **Entry point:** how they arrived—marketing, search, invitation, deep link, notification, support, error, external mandate, or agent action.
4. **Journey and state:** prior state, trigger, current state, available next states, exit, re-entry, expiry, and cross-channel handoff.
5. **Behavioral truth:** what the product will do now; what has already happened; what remains pending; what cannot happen.
6. **Consequence:** effects on money, rights, health, safety, access, privacy, learning, reputation, other people, and downstream systems.
7. **Reversibility and recovery:** undo, edit, cancel, appeal, dispute, retry, alternative route, human support, and service-level expectation.
8. **Controlled facts:** prices, dates, thresholds, eligibility, policy, claims, data uses, recipients, retention, coverage, limitations, supporting evidence, governing applicability, accountable owner, and approver.
9. **Jurisdiction and regulated role:** user and organization locations, market, legal entity, licensed/regulated capacity, product category, and effective date.
10. **Audience capability and context:** expertise, literacy/numeracy, stress, urgency, device, connectivity, privacy, disability, and assistance needs.
11. **Language and culture:** locale, script, direction, plural/gender needs, name/address/date/number formats, legal translation, and local institutional vocabulary.
12. **Surface:** screen, CLI, API, email, SMS, push, document, voice, chatbot, status page, help center, or offline material.
13. **Evidence, control, and state:** evidence sources plus orthogonal observation-strength, challenge, freshness, lineage, and epistemic dimensions; applicable governing instruments; accountable owner; authorized approvers and approval records; independent decision and delivery states; evaluation links; review date; and live verification.
14. **Measurement:** comprehension, completion, error, abandonment, support, complaint, appeal, harm, accessibility, localization, and qualitative feedback signals.

## Entry-point risk changes

| Entry point | What must be known before content | Domain-sensitive failure |
| --- | --- | --- |
| Marketing/search | Audience, claim evidence, targeting, price basis, sponsorship, destination state | Claim or urgency creates an expectation the product cannot meet. |
| Onboarding/application | Eligibility, required data, purpose, time, save/resume, decision process | People provide sensitive data without understanding why or cannot recover progress. |
| Invitation/delegation | Inviter, recipient role, permissions, expiry, organization boundary | Recipient accepts authority they did not understand. |
| Transaction/commit | Item/service, quantity, total, fees/tax, timing, recurrence, cancellation, final CTA effect | CTA label hides a charge, commitment, or irreversible transfer. |
| Automated recommendation/decision | Inputs, output status, limitations, reason, human role, contest route | Suggestion is presented as fact or a machine denial has no meaningful explanation. |
| Error/interruption | Cause safe to reveal, persisted state, retry safety, alternative, support | Repeated action duplicates payment, loses data, or exposes security information. |
| Notification/deep link | Trigger, recipient/device privacy, urgency, expiry, destination authentication | Sensitive content appears on a lock screen or stale alert leads to wrong action. |
| Support/escalation | Case ownership, wait time, evidence to provide, channel, accessibility/language support | `Contact support` becomes a dead end. |
| Appeal/dispute/complaint | Decision, grounds, deadline, evidence, reviewer, status, possible outcomes | The existence of redress is implied without an operable path. |
| Closure/deletion/offboarding | Scope, dependencies, retention, export, billing, recovery window | `Delete` is ambiguous about account, content, data, or billing. |

## Cross-jurisdiction gate

Before applying a domain rule, answer [Inference]:

- Where is the user, and which language/locale do they use?
- Which legal entity provides the product and in what role?
- What product, account, transaction, content, or data category is involved?
- Which version of the rule or policy is effective on the event date?
- Is the cited material law, a standard, guidance, enforcement evidence, or one organization's practice?
- Does national/state/provincial law add to or conflict with the general source?
- Has a court, regulator, or later instrument stayed, amended, superseded, or reinterpreted it?
- Who is authorized to decide applicability and approve the content?

The US, UK, and EU are not interchangeable. The EU itself is not one language or one complete implementation context; directives require national implementation, regulations may still depend on national procedure, and official translations can carry legal force. The UK is not an EU Member State. US federal rules interact with state law. Global products need a locale-and-jurisdiction matrix, not one `international` variant.

# Domain playbooks

Unless a sentence is tied to a source ID, the `Voice, tone, approvals, and recovery` bullets below are **conditional synthesis**, not an industry rule. They describe candidate controls for the named moment and consequence. A low-risk, reversible moment can support more brand expression; a high-risk, irreversible, uncertain, or vulnerable moment generally requires greater specificity and less flourish. Teams must test counterexamples and follow applicable incident, legal, clinical, policy, locale, and accessibility decisions.

## 1. Financial services, fintech, and payments

### What changes before writing

Determine the regulated entity and role, consumer versus business account, account/credit/payment product, payment rail, funding source, transaction state, currency and exchange-rate basis, fee and tax facts, authorization method, settlement timing, reversibility, dispute/error path, and applicable market.

For credit, determine whether content is marketing, prequalification, application, approval, pricing, adverse action, servicing, collection, or hardship. For payments, separate `authorized`, `submitted`, `processing`, `completed`, `failed`, `declined`, `reversed`, `refunded`, `disputed`, and `unauthorized`; these are not stylistic synonyms.

### Controlled terminology and facts

- Amount, currency, fee, rate/APR, exchange rate, repayment total, due date, availability, limit, and tax.
- Parties and rails: sender, recipient, merchant, issuer, acquirer, bank, wallet, card, ACH, remittance, and cash-equivalent terms.
- Decision and recourse: eligibility, credit check, reason code, adverse action, dispute, error, unauthorized transfer, chargeback, refund, reversal.
- Promise language: `instant`, `guaranteed`, `approved`, `safe`, `free`, `no fee`, and `final` require scope and evidence.

### Voice, tone, approvals, and recovery

- **Voice:** organization-specific. Regulation does not mandate `formal` or `friendly` as a personality.
- **Tone [conditional synthesis]:** when money, denial, fraud, debt, dispute, or loss creates material consequence, prioritize exact state, consequence, timing, and recovery over playfulness; use urgency only for a verified time-bound action. A routine reversible preference inside a financial product may use the wider approved brand range. Do not celebrate borrowing, loss, or high-risk spending as an inherently positive outcome.
- **Approval:** product/operations for behavior; finance/pricing for numbers; compliance/legal for regulated claims and notices; risk/fraud/security for safe disclosure; localization for market terms.
- **Recovery:** tell people whether money moved, whether retry can duplicate it, when status will change, what they can do now, what evidence is needed, and what recourse exists.

### Accessibility, localization, and evidence

Amounts must not rely on color or sign alone; screen-reader output should distinguish credits/debits and masked account identifiers. Number, currency, date, and decimal conventions are locale-specific. Required notices may need approved legal translations, not on-demand machine translation. [LAW: FIN-US-1, FIN-US-2, FIN-UK-1, FIN-EU-1; cross-domain U-ACC-1, U-EAA-1]

### Domain limits and open questions

Banking, lending, investments, crypto-assets, remittances, payroll, benefits, and payments need separate rule packs. This pass does not map securities promotion, debt collection, AML/KYC notices, open banking, tax, or every payment rail.

## 2. Insurance

### What changes before writing

Identify product type, policy jurisdiction, insurer/intermediary role, insured person/property, term, premium, deductible/excess, limits, benefits, exclusions, restrictions, waiting periods, obligations, underwriting status, claim stage, evidence, and appeal/complaint path.

### Controlled terminology and facts

`Quote`, `estimate`, `premium`, `coverage/cover`, `benefit`, `limit`, `deductible/excess`, `exclusion`, `restriction`, `claim`, `authorization`, `settlement`, `renewal`, and `cancellation` must retain their approved market-specific meanings. Examples must not imply coverage outside policy wording.

### Voice, tone, approvals, and recovery

- **Voice:** brand-specific; trust is produced through accuracy, comparability, and follow-through, not a `reassuring` adjective.
- **Tone:** direct during purchase; empathetic but factual after loss; neutral and specific at denial or partial coverage. Never use empathy to soften away the reason, evidence, right, or next step.
- **Approval:** underwriting/product, claims operations, compliance/legal, and market localization; clinical review when medical facts are involved.
- **Recovery:** status, missing evidence, coverage basis, payable/non-payable amount, timeline, complaint/appeal, emergency support, and accessible contact routes.

### Accessibility, localization, and evidence

Keep insured/not insured/restrictions/obligations/duration/cancellation structurally distinct. Explain necessary terms without changing legal scope. [MODEL LAW: INS-US-1; LAW: INS-EU-1; OFFICIAL GUIDANCE: FIN-UK-1 where applicable]

### Domain limits and open questions

NAIC models are not state law. Life, health, property/casualty, travel, embedded, and commercial insurance require separate jurisdiction and product analysis.

## 3. Healthcare and health products

### What changes before writing

Identify whether the surface is clinical care, patient administration, insurance, wellness, medical device, pharmaceutical promotion, education, or crisis communication. Resolve intended audience, health-literacy and numeracy context, clinical source, evidence date, benefits/risks, uncertainty, urgency, privacy regime, care relationship, communication needs, language assistance, and escalation to a qualified professional or emergency service.

### Controlled terminology and facts

Diagnosis, symptom, screening, treatment, dosage, contraindication, side effect, prognosis, result ranges, appointment status, consent, health record, and emergency language require clinical or regulatory authority. `Normal`, `safe`, `negative`, and `positive` can be dangerously ambiguous without context.

### Voice, tone, approvals, and recovery

- **Voice:** organization-specific; `clinical` should not mean cold, and `friendly` should not imply certainty.
- **Tone:** respectful, non-judgmental, calm, and concrete; acknowledge distress without diagnosing emotion. Separate `what this result says` from `what it does not say` and `what to do next`.
- **Approval:** clinical/medical, privacy, legal/regulatory, patient-safety, accessibility/language-access, and operations, depending on content type.
- **Recovery:** urgent versus routine action, red flags, qualified contact, appointment alternatives, result correction, complaint, accessible format, interpreter, and caregiver permissions.

### Accessibility, localization, and evidence

Test the main message, behavioral objective, numeracy, and comprehension with intended users. Record and honor communication needs across handoffs. Machine translation alone is not a safe default for clinical or rights-bearing content. [LAW: HEALTH-US-1; OFFICIAL GUIDANCE with litigation caveat: HEALTH-US-2; OFFICIAL GUIDANCE: HEALTH-US-3, HEALTH-US-4; STANDARD: HEALTH-UK-1]

### Domain limits and open questions

HIPAA is not a synonym for all health privacy. Medical-device, telehealth, reproductive-health, mental-health, pharmacy, research, and country-specific consent rules require dedicated research.

## 4. Government and public services

### What changes before writing

Identify the competent authority, service mandate, policy owner, eligibility, evidence requirements, deadlines, legal effect, public-record consequences, digital and non-digital channels, assisted-digital route, language access, accessibility, identity needs, case status, decision reasons, review/appeal, and dependency on other agencies.

### Controlled terminology and facts

`Eligible`, `entitled`, `required`, `must`, `may`, `evidence`, `deadline`, `application`, `decision`, `sanction`, `benefit`, `permit`, and `appeal` must map to policy and law. Agency names and levels of government matter. Do not convert an internal process stage into a citizen promise.

### Voice, tone, approvals, and recovery

- **Voice:** public institutions may choose different voices, but authority must not become intimidation or false certainty.
- **Tone:** task-first and respectful; neutral for eligibility/decisions; calm and humane for bereavement, hardship, immigration, justice, or crisis. Avoid institutional self-congratulation.
- **Approval:** policy/service owner, legal, operations/casework, accessibility, language-access/localization, and records/security where relevant.
- **Recovery:** save/resume, alternative evidence, offline or assisted route, missed deadline, correction, complaint, review/appeal, and agency handoff.

### Accessibility, localization, and evidence

Plain language is a public-service duty in some regimes, but `plain` does not permit policy simplification that changes meaning. Complete processes, documents, forms, authentication, and status communication need accessibility—not the homepage alone. [LAW: GOV-US-1, GOV-EU-1; DOCUMENTED PRACTICE: GOV-UK-1; STANDARD: U-ACC-1]

### Domain limits and open questions

Federal, national, state/provincial, local, and supranational services differ. Immigration, tax, elections, benefits, policing, courts, and identity need separate high-risk packs.

## 5. Legal services, rights, contracts, privacy, and consent

### What changes before writing

Determine the legal service/provider role, jurisdiction, user relationship, represented/unrepresented status, legal effect, rights/duties, deadline, evidence, confidentiality, privilege limits, data-processing role, consent versus other legal basis, withdrawal effect, and available professional help or remedy.

### Controlled terminology and facts

Do not freely substitute `consent`, `agree`, `authorize`, `acknowledge`, `waive`, `represent`, `warrant`, `liable`, `legal advice`, `confidential`, `anonymous`, `delete`, or jurisdiction-specific rights terms. Layering and plain-language summaries must remain traceable to controlling text and disclose the summary boundary.

### Voice, tone, approvals, and recovery

- **Voice:** brand-specific; legal accuracy does not require archaic prose.
- **Tone:** neutral, non-coercive, and explicit at commitment; compassionate without promising outcomes in distressing matters.
- **Approval:** qualified counsel and the accountable policy/data owner; privacy/security and localization where relevant.
- **Recovery:** correction, withdrawal/revocation where available, copy/export, deadline, complaint, appeal/judicial route, and human legal assistance.

### Accessibility, localization, and evidence

Rights must be operable, not buried in notices. Clear language cannot cure an unlawful or manipulative process. Official translations, defined terms, and legal equivalence require local legal-linguistic review. [LAW: LEGAL-EU-1, LEGAL-US-1; STANDARD: U-ACC-1]

### Domain limits and open questions

Unauthorized-practice, attorney advertising, court procedure, arbitration, contract formation, electronic signatures, consumer terms, and privilege vary widely. This corpus cannot authorize an agent to provide legal advice.

## 6. Education and learning technology

### What changes before writing

Identify learner age/development, learner/parent/teacher/admin role, learning objective, prerequisite knowledge, curriculum/institution, instructional versus assessment state, stakes, grading authority, accommodations, accessibility, language of instruction, student data, safeguarding, and human educator role.

### Controlled terminology and facts

Distinguish `practice`, `feedback`, `hint`, `score`, `grade`, `pass`, `complete`, `certificate`, `credit`, `accreditation`, `attendance`, `discipline`, and `academic integrity`. Do not claim a learning outcome or credential the product cannot establish.

### Voice, tone, approvals, and recovery

- **Voice:** institution/product-specific; age-appropriate does not mean childish.
- **Tone [conditional synthesis]:** encouragement may support low-stakes learning when it does not praise an incorrect fact or prescribe emotion. For private failure, grading, discipline, or integrity decisions, increase specificity, evidence, and recourse while reducing performative praise. A playful practice exercise and a high-stakes assessment therefore need different modulation.
- **Approval:** subject-matter/curriculum owner, educator/assessment expert, student privacy, safeguarding, accessibility/accommodations, and localization.
- **Recovery:** retry rules, feedback without revealing the assessed construct, regrade/appeal, instructor help, accommodation, save/resume, and parent/institution escalation.

### Accessibility, localization, and evidence

Simplification must not invalidate the learning objective or assessment. A translated learning experience may need adaptation to the target learners, not sentence substitution. [OFFICIAL GUIDANCE: EDU-US-1; SYNTHESIS: EDU-X-1; STANDARD: U-ACC-1]

### Domain limits and open questions

K–12, higher education, workplace learning, credentialing, special education, and child-directed consumer apps have different authority and privacy structures.

## 7. Ecommerce and marketplaces

### What changes before writing

Identify seller/platform role, product/service and availability, jurisdiction, price basis, taxes/mandatory fees, subscription/renewal, delivery, returns/refunds, warranty, ranking/recommendation basis, sponsorship, reviews, trader verification, safety/recall, inventory/urgency evidence, and dispute owner.

### Controlled terminology and facts

`Free`, `sale`, `was/now`, `limited`, `only X left`, `best`, `recommended`, `verified`, `sponsored`, `total`, `subscription`, `trial`, `renew`, `cancel`, `refund`, `return`, and delivery promises are claims. Marketplace role language must not imply the platform is the seller or verifier when it is not.

### Voice, tone, approvals, and recovery

- **Voice:** brand-specific; conversion goals do not authorize pressure or omission.
- **Tone:** helpful and comparable during selection; explicit at commitment; matter-of-fact during delay, cancellation, dispute, and refund.
- **Approval:** commerce/product, pricing/tax, legal/consumer protection, marketplace trust/safety, operations/logistics, and localization.
- **Recovery:** edit order, cancel, return, refund method/timing, failed delivery, seller contact, platform dispute, charge issue, recall, and accountless support.

### Accessibility, localization, and evidence

Review claim, qualifier, price hierarchy, CTA consequence, defaults, and cancellation parity together. EU accessibility requirements can reach e-commerce, identification, security, and payment. [OFFICIAL GUIDANCE: COM-US-1, COM-US-2; DISCUSSION PAPER: COM-UK-1; LAW: COM-EU-1, U-EAA-1]

### Domain limits and open questions

Price, subscription, warranty, product-safety, platform, tax, and trader rules differ by country and product. Food, medicine, financial products, alcohol, and regulated goods add domain layers.

## 8. Travel and hospitality

### What changes before writing

Identify travel mode, operator/carrier/property/agent/platform roles, origin/destination, itinerary and time zone, ticket/rate conditions, fees/taxes, accessibility/assistance, passport/visa source, disruption event and cause, alternative, refund/credit, loyalty impact, and support ownership across handoffs.

### Controlled terminology and facts

`Confirmed`, `ticketed`, `reserved`, `guaranteed`, `non-refundable`, `cancelled`, `delayed`, `significant change`, `reroute`, `rebook`, `refund`, `credit`, `compensation`, `check-in`, and local time must reflect actual systems and applicable rights.

### Voice, tone, approvals, and recovery

- **Voice:** brand-specific; hospitality warmth is inappropriate when it delays disruption facts.
- **Tone [conditional synthesis]:** expressive discovery content may fit a low-risk aspirational context only when claims remain accurate. At booking, commitment and price require precision. During disruption, lead with what changed, available action, consequence, and timing; acknowledge difficulty without guessing emotion. Serious incidents and safety instructions displace promotional hospitality language.
- **Approval:** inventory/revenue, operations, carrier/property partner, accessibility, customer care, legal/regulatory, and localization.
- **Recovery:** what changed, affected segments/guests, local timestamps, available choices, monetary consequence, deadline, assistance, baggage/property status, and next update.

### Accessibility, localization, and evidence

Names, addresses, dates, time zones, currencies, measurement units, documents, and assistance terms localize structurally. Do not hide assistance behind a generic contact route. [LAW: TRAVEL-US-1; OFFICIAL GUIDANCE: TRAVEL-EU-1, TRAVEL-UK-1; LAW: U-EAA-1 where applicable]

### Domain limits and open questions

Passenger rights differ by mode and itinerary. Immigration/visa, package travel, short-term rental, accessibility, and force-majeure rules need local sources.

## 9. B2B SaaS, developer tools, and cybersecurity

### What changes before writing

Identify technical audience and expertise, tenant/account/project/resource hierarchy, role/permission, environment, data sensitivity, integration, API/CLI contract, operation idempotency, blast radius, auditability, default configuration, security threat, incident status, support tier, and rollback.

### Controlled terminology and facts

Resource names, IDs, states, commands, flags, permissions, quotas, regions, retention, encryption, availability, incident severity, and deprecation dates require technical truth. Distinguish authentication from authorization and `delete`, `disable`, `revoke`, `rotate`, `remove`, and `destroy`.

### Voice, tone, approvals, and recovery

- **Voice:** product-specific; expert audiences need precision, not unexplained density.
- **Tone:** concise in routine work; explicit at high blast radius; calm and timestamped during incidents. Humor should not enter destructive, security, or outage states.
- **Approval:** engineering/system owner, security, SRE/incident command, privacy/legal, developer education, and support.
- **Recovery:** preview/dry run, affected resources, permissions, persisted state, retry/idempotency, rollback, logs, correlation ID safe to expose, status page, and next update.

### Accessibility, localization, and evidence

CLI and logs need screen-reader and copy/paste usability; color cannot be the sole status signal. Keep code/syntax unlocalized while localizing explanatory content with explicit translator notes. Security-safe errors may withhold enumeration detail but must still provide legitimate users a recovery route. [OFFICIAL GUIDANCE: TECH-X-1, TECH-US-2; STANDARD: U-ACC-1]

### Domain limits and open questions

Developer documentation, API design, command-line UX, cloud infrastructure, enterprise procurement, incident disclosure, and cybersecurity products each warrant deeper protocols.

## 10. Social, community, and gaming

### What changes before writing

Identify audience age, public/private visibility, identity model, community norms, recommender behavior, creator/platform/advertiser roles, moderation policy and legal ground, safety risks, report/block/mute outcomes, enforcement decision, automation, appeal, monetization, virtual currency, odds, and parental controls.

### Controlled terminology and facts

`Public`, `private`, `friends`, `followers`, `anonymous`, `encrypted`, `report`, `block`, `mute`, `remove`, `restrict`, `suspend`, `ban`, `appeal`, `verified`, `sponsored`, `currency`, `odds`, and `guaranteed` must match behavior.

### Voice, tone, approvals, and recovery

- **Voice:** community/game-specific.
- **Tone [conditional synthesis]:** expression may fit creation or play when no spend, safety, enforcement, or account consequence is being obscured. Peer conflict requires non-escalatory language; enforcement requires neutral specifics and recourse rather than taunting. Credible abuse, grooming, self-harm, or threat contexts require the applicable safety protocol, concrete help, and verified urgency—not a generic `supportive gaming voice`.
- **Approval:** trust and safety, policy/legal, moderation operations, child safety, privacy/security, monetization, and localization/community expertise.
- **Recovery:** immediate safety tools, report receipt, confidentiality limits, expected process, status where safe, appeal, evidence preservation, account recovery, purchase/refund, and crisis resources appropriate to locale.

### Accessibility, localization, and evidence

Moderation explanations need affected object, rule/legal ground, action scope/duration, and redress without exposing reporters or enabling evasion. Real-money value, chance, and purchase consequence must not be hidden behind playful currencies. Sources: law/official guidance `SOC-EU-1`, `SOC-UK-1`; enforcement action `GAME-US-1`; official guidance `COM-US-2`.

### Domain limits and open questions

Speech law, platform duties, child safety, gambling/loot boxes, harassment, crisis intervention, and law-enforcement requests differ sharply by country and service.

## 11. AI assistants and agentic products

### What changes before writing

Identify model/provider/deployer roles, intended task, input and data destinations, tools and permissions, action boundary, autonomy level, memory, source grounding, model limitations, evaluation evidence, affected people, high-consequence domain, human review, audit log, reversal, escalation, and AI/synthetic-content disclosure requirements.

### Controlled terminology and facts

`AI`, `assistant`, `copilot`, `agent`, `autonomous`, `understands`, `knows`, `decides`, `detects`, `verified`, `accurate`, `safe`, `private`, `human-reviewed`, and `source` are capability or process claims. Do not imply sentience, human identity, guaranteed correctness, or completed action from fluent output.

### Voice, tone, approvals, and recovery

- **Voice:** the product's approved voice, with explicit limits on anthropomorphism and relationship cues.
- **Tone:** transparent and appropriately uncertain; not obsequious, overconfident, or falsely empathetic. Consequence should reduce expressiveness and increase evidence, preview, and confirmation.
- **Approval:** AI/model risk, product, security/privacy, relevant domain specialist, legal/compliance, safety, and accessibility/localization.
- **Recovery:** preview before material action, scope/target, confirmation at commitment, cancel/interrupt, undo or compensating action, audit trail, source inspection, correction, feedback, human escalation, and clear partial-failure status.

### Accessibility, localization, and evidence

Disclose the AI interaction at the right time where required; preserve generated/human-edited status and provenance. Models may confabulate facts and citations, so high-consequence output needs source verification and bounded authority. Agent actions should say `I drafted` versus `I sent`, `I requested` versus `completed`, and `I could not verify` versus guessing. [LAW: AI-EU-1; very recent OFFICIAL GUIDANCE: AI-EU-2; OFFICIAL GUIDANCE: AI-US-1, AI-US-2]

### Domain limits and open questions

The EU AI Act is phased and was amended by Regulation (EU) 2026/1744; US regulation is sectoral and state-sensitive; other markets differ. Agentic action UX, memory consent, multi-agent attribution, delegated authority, and machine-readable provenance need more research and evaluation. [LAW: AI-EU-1]

## 12. Children and family products

### What changes before writing

Identify actual and intended age bands, mixed audience, child/teen/parent/guardian/school roles, developmental and literacy needs, family structures, safeguarding, privacy/data use, consent and control allocation, spending, social contact, location, accessibility, and how a child gets help without unsafe disclosure.

### Controlled terminology and facts

`Child`, `teen`, `parent`, `guardian`, `family`, `consent`, `permission`, `private`, `visible`, `share`, `location`, `parental control`, and `delete` vary legally and behaviorally. Do not assume one caregiver, household, surname, gender, or safe family relationship.

### Voice, tone, approvals, and recovery

- **Voice:** product-specific and age-aware; child-friendly does not mean manipulative, infantile, or vague.
- **Tone:** direct and supportive; never use a mascot, reward, shame, scarcity, streak, or peer pressure to secure consent, data, spend, or unsafe engagement.
- **Approval:** child safety/safeguarding, privacy/legal, age-appropriate design, educator or clinical expert where relevant, accessibility, local culture/language, and research with children/parents under ethical protocols.
- **Recovery:** child-safe report/block/help, guardian notification rules, account/data correction and deletion, purchase controls, crisis path, and safe exit that does not expose the child.

### Accessibility, localization, and evidence

Test separate child- and adult-facing explanations. Age thresholds and concepts differ across COPPA, UK data protection, EU platform rules, state laws, schools, and products. [LAW: CHILD-US-1; OFFICIAL GUIDANCE: CHILD-UK-1, CHILD-EU-1; STANDARD: U-ACC-1]

### Domain limits and open questions

Research is needed across developmental bands, teen autonomy, family diversity, domestic-abuse safety, parental control conflicts, age assurance, schools, and non-Western legal/cultural contexts.

## 13. Nonprofits, charities, and mutual-aid products

### What changes before writing

Identify entity and registration, beneficiary and donor relationship, restricted versus unrestricted gift, intermediary/payment role, fee, delivery timing, tax-receipt status, recurring commitment, screening/verification, impact evidence, safeguarding, sanctions, privacy, and what happens if funds cannot reach the intended recipient.

### Controlled terminology and facts

`Donation`, `gift`, `tax-deductible`, `100%`, `direct`, `verified`, `matched`, `impact`, `fund`, `beneficiary`, `volunteer`, `grant`, and `anonymous` are factual claims. A beneficiary story needs informed and revocable governance appropriate to the context.

### Voice, tone, approvals, and recovery

- **Voice:** mission-specific; moral urgency does not justify guilt, savior framing, or loss of dignity.
- **Tone:** respectful and specific; center affected people's agency; distinguish an urgent need from artificial campaign pressure.
- **Approval:** program/field owner, finance/fundraising compliance, safeguarding, privacy/legal, communications, local partner, and affected-community review where feasible.
- **Recovery:** donation correction/refund where available, receipt, recurring cancellation, failed disbursement, beneficiary protection, complaint, and data/story withdrawal.

### Accessibility, localization, and evidence

State who receives funds, fees, timing, failure handling, privacy, and screening before commitment. Avoid universalizing Western nonprofit vocabulary; local civil-society structures and trust signals vary. [OFFICIAL GUIDANCE: NPO-US-1; cross-domain COM-US-1, U-ACC-1]

### Domain limits and open questions

Fundraising, tax, sanctions, grantmaking, mutual aid, political activity, humanitarian neutrality, and safeguarding require jurisdiction- and organization-specific research.

## 14. Emergency, disaster, and crisis communication

### What changes before writing

Identify competent incident authority, hazard, affected location/population, event and update time with time zone, severity and uncertainty, immediate protective action, safe destination/channel, accessibility and language needs, rumor/misinformation environment, operational capacity, expiry, next update, and all-clear criteria.

### Controlled terminology and facts

`Warning`, `watch`, `evacuate`, `shelter`, `all clear`, hazard names, geographic boundaries, severity levels, emergency numbers, doses/distances, time, and official-source identity must use the incident authority's definitions. Do not translate a controlled alert without an approved process.

### Voice, tone, approvals, and recovery

- **Voice:** brand voice yields to incident authority and life-safety clarity.
- **Tone:** urgent without panic; empathetic without delaying action; transparent about known, unknown, and next update. No humor, celebration, marketing, or reputational defense.
- **Approval:** incident command/competent authority owns facts; safety, clinical/technical expert, accessibility/language-access, local operations, and public information officer as applicable.
- **Recovery:** immediate action, alternative for people who cannot comply, accessible transport/shelter/support, update cadence, correction/versioning, all-clear, and post-event assistance.

### Accessibility, localization, and evidence

Lead with **source + area + hazard + time + action**, then consequence, exceptions, assistance, and next update. Use multiple trusted channels and languages people actually use; support sensory alternatives and low-connectivity/offline routes. [OFFICIAL GUIDANCE: CRISIS-US-1, CRISIS-X-1; STANDARD: U-ACC-1]

### Domain limits and open questions

Hazard protocols differ across weather, fire, earthquake, conflict, disease, chemical/radiological events, product incidents, cybersecurity, and self-harm. Local emergency management and community experts control.

# Cross-domain compound-risk examples

| Product moment | Domains that combine | Why one domain template fails |
| --- | --- | --- |
| AI denies a pay-later application | AI + credit + payments + privacy + accessibility | Requires model limitations and AI transparency plus specific credit reason, recourse, financial terminology, and accessible explanation. |
| Child buys a randomized game item | Children + gaming + ecommerce/payments + privacy | Real-money cost, odds, parental consent/control, data use, and age-specific manipulation risk interact. |
| Patient receives an insurance denial | Health + insurance + legal/rights + accessibility/language access | Clinical facts, coverage basis, reasons, evidence, appeal, time, interpreter, and accessible format must align. |
| Marketplace recalls a connected toy | Marketplace + product safety + children + privacy + crisis | Seller/platform roles, affected model, immediate action, refund, data/security, caregiver communication, and urgency combine. |
| Airline disruption affects a wheelchair user | Travel + accessibility + payments + public rights | Rerouting/refund and assistance ownership cannot be handled as a generic delay message. |
| Agent rotates a production secret | Agentic AI + devtools + cybersecurity | Authorization, blast radius, preview, audit, partial failure, rollback, and incident escalation outrank conversational fluency. |

# What a repository-native content system should encode from this research

The following are working [Proposal] requirements, not yet a `CONTENT.md` specification:

1. **Domain rules must be composable.** A product moment can load several domain packs; one industry label is insufficient.
2. **Facts and expression must be separate.** Controlled facts, behavior, policies, and legal text require fit evidence, applicable governing instruments where relevant, accountable owners, authorized approval routes, and versions; voice/tone transform expression only within those boundaries.
3. **Risk attaches to a decision and state, not an app.** The same codebase contains R0 through R4 content.
4. **Approval is typed.** `Approved` must identify what was approved—fact, legal wording, translation, interaction, or final render—by whom, for which locale/surface/version.
5. **Unknowns remain visible.** Missing jurisdiction, evidence source, governing applicability, accountable owner, authorized approver or approval record, actor, deadline, or recovery path blocks high-risk application.
6. **Rendered context is evidence.** Content must be checked with hierarchy, CTA result, visual prominence, state, semantic accessibility, variables, and adjacent claims.
7. **Recovery is part of content architecture.** Error, dispute, appeal, undo, human support, and alternative channel are planned before the happy path ships.
8. **Locale is structural.** Language/script direction, grammar, names, addresses, dates, numbers, currencies, institutions, laws, formats, and channels are first-class fields.
9. **Current law remains an external governing instrument.** The repository can store applicability decisions and source versions but must not claim to be self-updating legal counsel.
10. **Evidence and control records travel with the decision.** Every high-risk string or pattern needs evidence sources and orthogonal evidence dimensions, applicable governing instruments, accountable owner, authorized approver/approval record, decision state, delivery state, evaluation links, effective date, scope, and review/expiry metadata as applicable.

# Research gaps

Priority gaps before turning this matrix into executable policy:

- Validate the risk and approval model with practicing content designers and domain specialists.
- Add local-language primary research and practitioner interviews outside US/UK/EU.
- Build dedicated packs for employment/HR, housing/real estate, utilities, telecom, identity, elections, immigration, tax, transportation beyond passenger travel, physical safety/IoT, news/media, dating, adult services, food, climate/environmental claims, and regulated goods.
- Map conflict rules when law, policy, design-system guidance, brand voice, and implemented behavior disagree.
- Define how an agent determines jurisdiction and regulated role without over-collecting user data.
- Research approved-translation governance, legal equivalence, community review, and emergency multilingual release under time pressure.
- Test how risk controls work across UI, API, CLI, notification, voice, generated conversation, and offline channels.
- Develop red-team cases for misleading omission, false recovery, inaccessible state, manipulative choice architecture, fabricated authority, and culturally unsafe adaptation.

Until those gaps are closed, this document is a research corpus and decision-support map—not a universal domain engine.
