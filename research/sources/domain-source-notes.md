---
title: Domain, risk, voice, tone, and terminology source notes
status: working-research
started: 2026-08-17
updated: 2026-08-17
accessed: 2026-08-17
scope: Cross-industry content-design constraints in the United States, United Kingdom, European Union, and selected international standards
legal_notice: Research material only; not legal, regulatory, medical, financial, or safety advice
---

# Domain source notes

## How to read this corpus

These notes support the working syntheses in `research/03-domain-matrix/`. They do not establish that a rule applies to a particular product. Applicability depends on facts including the product, audience, transaction, regulated role, location of the organization and user, channel, and effective date. Counsel, compliance, clinical, policy, safety, security, accessibility, and localization owners must validate requirements in their areas.

Source-type tags used in these notes (separate from the synthesis's canonical claim labels):

- **[LAW]** — enacted law, regulation, regulator rule, or official legal text. Applicability still requires expert determination.
- **[STANDARD]** — normative or consensus specification; it may become legally or contractually binding only through adoption or incorporation.
- **[OFFICIAL GUIDANCE]** — a regulator's, public body's, or standards body's explanation or recommended practice. It may be non-binding.
- **[MODEL LAW]** — model legislative text offered for jurisdictional adoption. It is not binding unless and to the extent an applicable jurisdiction adopts it.
- **[DISCUSSION PAPER]** — official analysis intended to inform debate or future work, not compliance guidance or a legal finding.
- **[DOCUMENTED PRACTICE]** — a named organization's published practice. It is evidence of that practice, not a universal rule.
- **[ENFORCEMENT]** — an enforcement action or case. It is evidence of a concrete risk pattern, not a complete statement of generally applicable law.

The canonical synthesis claim label **[Inference]** marks a recommendation inferred from multiple sources and requiring validation; it is not a source type.

All sources below were read directly as an official web page or official PDF unless a limitation says otherwise. Mutable pages were checked on 2026-08-17.

## Cross-domain accessibility, language, and localization

### U-ACC-1 — WCAG 2.2

- **Source:** W3C, *Web Content Accessibility Guidelines (WCAG) 2.2*, W3C Recommendation, 12 December 2024. https://www.w3.org/TR/WCAG22/
- **Type:** [STANDARD]
- **Scope:** Web content; international; technology-neutral.
- **Supports:** Text alternatives; meaningful structure and sequence; language metadata; consistent labels and help; error identification and suggestion; error prevention for legal, financial, and data submissions; accessible authentication; programmatically determinable status messages.
- **Content implication:** Accessibility is not a copyediting pass. A string must be evaluated with its semantic label, location, state change, focus behavior, error recovery, and assistive-technology announcement.
- **Limitations:** WCAG does not cover every cognitive, language, learning, cultural, or disability need. Conformance level and legally required version differ by jurisdiction.

### U-I18N-1 — Internationalization and localization

- **Source:** W3C Internationalization, *Localization vs. Internationalization*. https://www.w3.org/International/questions/qa-i18n
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** Products, applications, and documents across languages, scripts, regions, and cultures.
- **Supports:** Localization includes formats, currency, names, addresses, symbols, colors, legal requirements, and sometimes business logic—not translation alone. Internationalization must be designed in early; concatenated strings and UI-string-dependent code create barriers.
- **Content implication:** Locale cannot be modeled as a suffix on an English string. The system needs locale facts, grammatical context, and product-behavior dependencies.
- **Limitations:** High-level guidance, not a complete engineering standard or locale-specific cultural authority.

### U-I18N-2 — Language and direction metadata

- **Source:** W3C Internationalization Working Group, *Strings on the Web: Language and Direction Metadata*, Group Note, 17 October 2024. https://www.w3.org/TR/string-meta/
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** Natural-language strings in JSON, WebIDL, stored data, and web interfaces.
- **Supports:** The language and base direction of natural-language strings should be determinable from metadata rather than guessed; syntactic values should be distinguished from display text.
- **Content implication:** A repository content contract needs per-string language/direction capability and must not expose internal identifiers as user-facing labels.
- **Limitations:** W3C Group Note, not a W3C Recommendation.

### U-I18N-3 — Localization notes

- **Source:** W3C, *Internationalization and Localization Markup Requirements*, section 3.17. https://www.w3.org/International/its/requirements/
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** Structured content and localization workflows.
- **Supports:** Authors need an unambiguous way to tell localizers what a string means, where it appears, what variables refer to, and whether text must remain untranslated.
- **Content implication:** String records need purpose, surface, state, variable semantics, screenshot or rendered context, do-not-translate spans, and character/format constraints.
- **Limitations:** Older XML-oriented requirements; the principles transfer, but implementations should use current repository and localization formats.

### U-EAA-1 — European Accessibility Act

- **Source:** European Union, Directive (EU) 2019/882, adopted 17 April 2019; many covered products and services placed on the market or provided after 28 June 2025. https://eur-lex.europa.eu/eli/dir/2019/882/oj
- **Type:** [LAW]
- **Scope:** Covered EU products and services, including areas of consumer banking, payment, e-commerce, electronic communications, e-books, and passenger transport.
- **Supports:** Information must be perceivable and understandable through accessible channels; covered service websites and apps must be perceivable, operable, understandable, and robust; identification, security, and payment interactions are expressly relevant in covered services.
- **Content implication:** Accessibility obligations can cross several industries and extend to service information, support, authentication, payment, and terms—not only page markup.
- **Limitations:** A directive implemented through Member State law, with scope, exemptions, transitions, enforcement, and disproportionate-burden rules requiring local analysis.

## Financial services, fintech, payments, and insurance

### FIN-US-1 — Electronic Fund Transfers / Regulation E

- **Source:** US Consumer Financial Protection Bureau, *12 CFR Part 1005 — Electronic Fund Transfers (Regulation E)*, current interactive regulation; page states most recently amended 19 April 2023. https://www.consumerfinance.gov/rules-policy/regulations/1005/
- **Type:** [LAW]
- **Scope:** Covered US consumer electronic fund and remittance transfers.
- **Supports:** Required disclosures cover fees, limits, liability, cancellation, receipts, and error-resolution procedures. Section 1005.11 defines covered errors and requires an investigation-result explanation and notice of document-request rights in specified cases.
- **Content implication:** Do not invent the meaning of `pending`, `reversed`, `unauthorized`, `error`, `refund`, or reporting deadlines. Transaction status and recourse copy must bind to the correct rail, account type, actor, and regulatory procedure.
- **Limitations:** CFPB's interactive version says it is not the official legal edition; consult eCFR/Federal Register and counsel. It does not cover every payment product or jurisdiction.

### FIN-US-2 — Adverse action and complex algorithms

- **Source:** US Consumer Financial Protection Bureau, *Consumer Financial Protection Circular 2022-03: Adverse action notification requirements in connection with credit decisions based on complex algorithms*, 2022. https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** US creditors using complex algorithms in covered credit decisions.
- **Supports:** Technology does not remove ECOA/Regulation B notice duties; notices must disclose specific principal reasons for adverse action.
- **Content implication:** A generic `We could not approve you` message cannot be treated as sufficient merely because the decision came from a model. Reason codes, model outputs, approved regulatory mappings, and appeal/reconsideration paths are controlled inputs.
- **Limitations:** Circular explains the CFPB's view; applicability and later case law or agency action require legal review.

### FIN-UK-1 — FCA Consumer Duty, consumer understanding

- **Source:** UK Financial Conduct Authority Handbook, PRIN 2A, especially 2A.5, current page last updated 26 June 2026. https://handbook.fca.org.uk/handbook/PRIN/2A/
- **Type:** [LAW]
- **Scope:** Firms and communications within the Consumer Duty's retail-market scope; before, during, and after sale, across channels.
- **Supports:** Communications should meet information needs, be likely to be understood, and equip customers for effective, timely, properly informed decisions; information must be clear, fair, and not misleading. Guidance addresses logical presentation, plain language, key-information prominence, unnecessary disclaimers, customer vulnerability, product complexity, channel, and testing.
- **Content implication:** Readability alone is insufficient. The content system must assess timing, prominence, completeness, customer characteristics, comprehension evidence, and whether the choice environment produces understanding.
- **Limitations:** UK-specific and scope-dependent. Handbook rules and guidance have different force; regulated firms need compliance interpretation.

### FIN-EU-1 — Payment Services Directive 2

- **Source:** European Union, Directive (EU) 2015/2366 on payment services (PSD2), 25 November 2015. https://eur-lex.europa.eu/eli/dir/2015/2366/oj
- **Type:** [LAW]
- **Scope:** Payment services within the directive and Member State implementations.
- **Supports:** Pre-contract and transaction information, rights and obligations, execution, charges, exchange rates, unauthorized transactions, refunds, and strong customer authentication all depend on defined payment roles and events.
- **Content implication:** Payment copy must derive from the correct payment-service role, authentication state, timing, fee/exchange-rate facts, and failure cause. A security-safe generic error still needs an actionable next step.
- **Limitations:** Implemented through national law and subject to amendments, regulatory technical standards, and the evolving EU payments framework. Do not encode a universal EU payment rule from this summary.

### INS-US-1 — Insurance policy language simplification model law

- **Source:** National Association of Insurance Commissioners, *Life and Health Insurance Policy Language Simplification Model Act (MO-575)*, model text dated 1995. https://content.naic.org/sites/default/files/model-law-575.pdf
- **Type:** [MODEL LAW]
- **Scope:** Model language for potential adoption by US states; life and health insurance policy forms.
- **Supports:** The stated purpose is minimum language standards that facilitate insured people's reading and understanding while recognizing that some medical, statutory, and insurance terms may be necessary.
- **Content implication:** Preserve defined terms where required, explain them at first use, and show coverage, exclusions, duties, dates, and exceptions in a comparable structure.
- **Limitations:** NAIC model law is not itself binding state law; adoption and wording vary. The model is old and narrowly scoped.

### INS-EU-1 — Insurance Product Information Document

- **Source:** European Commission, Implementing Regulation (EU) 2017/1469, 11 August 2017. https://eur-lex.europa.eu/eli/reg_impl/2017/1469/oj
- **Type:** [LAW]
- **Scope:** Standardized presentation of the non-life Insurance Product Information Document under the Insurance Distribution Directive.
- **Supports:** A prescribed question-based structure separates what is insured, what is not, restrictions, geographic coverage, obligations, payment, duration, and cancellation.
- **Content implication:** Insurance content architecture must keep benefits, exclusions, restrictions, duties, dates, and cancellation distinct. Rewriting cannot alter coverage scope or imply `complete` coverage.
- **Limitations:** Applies to a specific EU document and product category, not every insurance surface; national rules may add requirements.

## Healthcare and health communication

### HEALTH-US-1 — HIPAA Notice of Privacy Practices

- **Source:** US eCFR, 45 CFR § 164.520, current regulation. https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.520
- **Type:** [LAW]
- **Scope:** Covered entities and notices within the HIPAA Privacy Rule.
- **Supports:** The notice must be written in plain language and contain specified descriptions of uses, disclosures, duties, rights, complaints, contacts, and effective date.
- **Content implication:** Required notice content and protected-health-information terminology are controlled; plain-language redesign cannot omit mandatory elements or silently broaden uses.
- **Limitations:** HIPAA coverage is role- and activity-specific; many consumer health products fall outside HIPAA but may face other federal or state rules.

### HEALTH-US-2 — Section 1557 language access

- **Source:** US Department of Health and Human Services Office for Civil Rights, *Language Access Provisions of the Final Rule Implementing Section 1557*, letter dated 5 December 2024. https://www.hhs.gov/sites/default/files/ocr-dcl-section-1557-language-access.pdf
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** Covered US health programs and activities; meaningful access for people with limited English proficiency.
- **Supports:** Language assistance and meaningful access are civil-rights concerns, not optional brand enhancements.
- **Content implication:** Determine coverage, preferred language, qualified interpreter/translator needs, notice obligations, and channel availability before relying on machine translation.
- **Limitations:** HHS explicitly notes that provisions of the 2024 rule have been stayed or enjoined. Current legal status must be checked for the exact provision and jurisdiction.

### HEALTH-US-3 — CDC Clear Communication Index

- **Source:** US Centers for Disease Control and Prevention, *CDC Clear Communication Index: User Guide* and score sheet, revised 2014. https://www.cdc.gov/ccindex/pdf/clear-communication-user-guide.pdf and https://www.cdc.gov/ccindex/pdf/full-index-score-sheet.pdf
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** Public-health communication materials.
- **Supports:** Before scoring, identify primary audience, health-literacy characteristics, communication objective, and main message. Numbers need meaning and context. Translated versions may need separate audience-based assessment.
- **Content implication:** `Plain` is not enough: the workflow needs a main-message decision, behavioral objective, numeracy/risk presentation, and comprehension testing with the intended audience.
- **Limitations:** A communication-assessment tool, not a clinical standard or substitute for usability testing; the core guide predates current digital patterns.

### HEALTH-UK-1 — NHS Accessible Information Standard

- **Source:** NHS England, *Accessible Information Standard — requirements (DAPB1605)*, published 30 June 2025. https://www.england.nhs.uk/long-read/accessible-information-standard-requirements-dapb1605/
- **Type:** [STANDARD]
- **Scope:** NHS and publicly funded adult social care in England; disability-, impairment-, and sensory-loss-related information and communication needs.
- **Supports:** Organizations identify, record, flag, share, meet, and review communication needs; formats and support may include Braille, large print, Easy Read, audio, British Sign Language, advocates, and communication professionals.
- **Content implication:** Accessibility preferences are operational data that must survive referrals, handoffs, and communications—not a one-time content variant.
- **Limitations:** England-specific; the standard says community-language translation is outside its scope and must be handled separately.

### HEALTH-US-4 — Prescription-drug promotion

- **Source:** US Food and Drug Administration, *OPDP Frequently Asked Questions (FAQs)*. https://www.fda.gov/about-fda/center-drug-evaluation-and-research-cder/opdp-frequently-asked-questions-faqs
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** FDA-regulated prescription-drug advertising.
- **Supports:** Product-claim promotion cannot be false or misleading and is subject to risk-disclosure and fair-balance requirements tied to approved labeling.
- **Content implication:** Benefits, indication, limitations, risks, and material facts require medical/legal/regulatory review and approved source language; brand enthusiasm cannot outrank risk communication.
- **Limitations:** Promotion rules differ from clinical-care UI, patient education, device communication, and unbranded disease-awareness material.

## Government, public services, and legal/privacy communication

### GOV-US-1 — Plain Writing Act

- **Source:** United States, Public Law 111-274, *Plain Writing Act of 2010*, 13 October 2010. https://www.govinfo.gov/content/pkg/PLAW-111publ274/pdf/PLAW-111publ274.pdf
- **Type:** [LAW]
- **Scope:** Covered US federal agency documents.
- **Supports:** Federal agencies must use clear government communication the public can understand and use, subject to the act's definitions and implementation.
- **Content implication:** Public-service content should be task-oriented and usable, but policy, eligibility, evidence, appeal, and procedural rights remain controlled facts.
- **Limitations:** Does not apply to all governments or private products and is not a complete UX-content method.

### GOV-UK-1 — GOV.UK content and service design practice

- **Sources:** UK Government Digital Service, *What each role does in a service team*. https://www.gov.uk/service-manual/the-team/what-each-role-does-in-service-team ; *Learning about users and their needs*. https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs ; and *Designing good government services: an introduction*. https://www.gov.uk/service-manual/design/introduction-designing-government-services
- **Type:** [DOCUMENTED PRACTICE]
- **Scope:** UK government services using the Service Standard.
- **Supports:** The documented content-designer role develops content plans and strategies from user needs, writes and reviews usable accessible content, contributes to service design, and challenges requests that do not support user needs. The Service Manual treats user needs as research-backed problems rather than prescribed solutions and treats clear outcomes, recovery, human help, naming, cross-channel consistency, and decision explanations as service concerns.
- **Content implication:** A public-service content agent must discover the end-to-end service, offline routes, assisted-digital paths, policy owners, evidence requirements, and failure/appeal states before drafting.
- **Limitations:** Strong public-sector practice, not a universal statutory rule or a substitute for department-specific policy.

### GOV-EU-1 — Web Accessibility Directive

- **Source:** European Union, Directive (EU) 2016/2102 on accessibility of public-sector websites and mobile applications, 26 October 2016. https://eur-lex.europa.eu/eli/dir/2016/2102/oj
- **Type:** [LAW]
- **Scope:** Covered EU public-sector websites and mobile applications through Member State implementation.
- **Supports:** Public digital content is organized around perceivability, operability, understandability, and robustness, with monitoring and accessibility-statement mechanisms.
- **Content implication:** A public-service inventory must include documents, forms, authentication, status messages, archived-content exceptions, accessibility statements, and feedback channels.
- **Limitations:** Coverage and exceptions are specific; national transposition and the harmonized standard version must be checked.

### LEGAL-EU-1 — GDPR transparency and rights

- **Source:** European Union, Regulation (EU) 2016/679, especially Articles 5 and 12–22, 27 April 2016. https://eur-lex.europa.eu/eli/reg/2016/679/oj
- **Type:** [LAW]
- **Scope:** Personal-data processing within GDPR territorial and material scope.
- **Supports:** Information and rights communications must be concise, transparent, intelligible, easily accessible, and in clear and plain language, particularly for children; controllers must facilitate rights. The legal basis, purpose, recipients, retention, and rights are distinct controlled facts.
- **Content implication:** A privacy notice, consent choice, deletion flow, and rights-response status cannot be generated from brand voice alone. They need a verified data map, role, purpose, legal basis, recipient categories, retention, identity requirements, deadlines, and escalation path.
- **Limitations:** Legal bases and notice/consent requirements are fact-specific; plain language does not convert a non-compliant practice into a lawful one.

### LEGAL-US-1 — California privacy regulations

- **Source:** California Privacy Protection Agency, *California Consumer Privacy Act Regulations*, current regulations portal. https://cppa.ca.gov/regulations/
- **Type:** [LAW]
- **Scope:** Businesses and processing within CCPA/CPRA applicability.
- **Supports:** Consumer notices and request methods use prescribed concepts and must be designed so consumers can understand and exercise rights; dark-pattern restrictions affect choice architecture as well as wording.
- **Content implication:** Terms such as `sell`, `share`, `sensitive personal information`, `request to know`, and `opt-out preference signal` are jurisdiction-specific controlled terms; user-facing labels must map to actual processing and mechanisms.
- **Limitations:** California-specific and mutable. Confirm the consolidated regulation, effective dates, statutory changes, and applicability with privacy counsel.

## Education

### EDU-US-1 — FERPA and education technology

- **Source:** US Department of Education Student Privacy Policy Office, *Privacy and Education Technology*. https://studentprivacy.ed.gov/privacy-and-education-technology
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** US educational agencies and institutions, education records, online educational services, and vendors as applicable.
- **Supports:** Education technology raises student-privacy questions involving FERPA, school-official arrangements, terms of service, cloud services, and information sharing.
- **Content implication:** Before writing student, parent, teacher, or administrator flows, establish who holds the education record, who can consent or inspect, the learner's age, institutional role, data use, and whether the product is instructional, administrative, or consumer-directed.
- **Limitations:** FERPA applicability is role- and funding-dependent; state student-privacy laws, COPPA, disability law, institutional policy, and non-US education law may add or differ.

### EDU-X-1 — Accessibility and multilingual learning boundary

- **Source:** W3C WCAG 2.2 (U-ACC-1), W3C internationalization guidance (U-I18N-1), and US Department of Education FERPA guidance (EDU-US-1).
- **Record role:** cross-source synthesis
- **Canonical claim label:** [Inference]
- **Source types represented:** normative standard and official guidance; see the three linked source records above
- **Scope:** Digital learning across age, language, and ability.
- **Supports:** A learning product simultaneously has instructional objectives, learner developmental level, assessment stakes, accessibility needs, language/script requirements, and privacy roles.
- **Content implication:** `Simpler` wording is not automatically instructionally correct. Preserve the learning objective and construct being assessed; separate teaching feedback from grading, discipline, and administrative notices.
- **Limitations:** This is a cross-source synthesis. It requires education specialists and learners; it is not a substitute for pedagogy or local curriculum standards.

## Ecommerce, marketplaces, and travel

### COM-US-1 — Digital advertising disclosures

- **Source:** US Federal Trade Commission, *.com Disclosures: How to Make Effective Disclosures in Digital Advertising*, March 2013. https://www.ftc.gov/system/files/documents/plain-language/bus41-dot-com-disclosures-information-about-online-advertising.pdf
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** US digital advertising and disclosures across devices.
- **Supports:** Advertising must be truthful, substantiated, and not unfair; qualifying disclosures must be clear and conspicuous, close to the claim, understandable, and functional on the relevant device.
- **Content implication:** A footnote or `Terms apply` link cannot repair a misleading headline or price hierarchy. Claim, qualifier, evidence, placement, prominence, and device must be reviewed together.
- **Limitations:** Published in 2013 and subject to later law, enforcement, and technology; not every statement is a binding rule.

### COM-US-2 — Dark patterns

- **Source:** US Federal Trade Commission, *Bringing Dark Patterns to Light*, staff report, September 2022. https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** Consumer digital interfaces.
- **Supports:** Risk patterns include hidden costs, drip pricing, disguised ads, hidden subscriptions, false hierarchy, unauthorized transactions, nagging, forced registration, and privacy-choice interference.
- **Content implication:** Content review must inspect choice architecture, defaults, visual prominence, timing, repeated prompts, cancellation parity, and the result of a CTA—not strings in isolation.
- **Limitations:** Staff report and taxonomy, not a single generally applicable statute; particular practices require legal analysis.

### COM-EU-1 — Digital Services Act marketplace duties

- **Source:** European Union, Regulation (EU) 2022/2065, including Article 30 on traceability of traders. https://eur-lex.europa.eu/eli/reg/2022/2065/oj
- **Type:** [LAW]
- **Scope:** Intermediary services and online platforms within the DSA; certain marketplace obligations.
- **Supports:** Platform roles, trader identity, product/service information, notice-and-action, content restrictions, statements of reasons, and redress are distinct content systems.
- **Content implication:** Marketplaces must distinguish platform, trader, buyer, listing, advertisement, verification signal, report, restriction, and appeal. Do not imply the platform verified more than its actual process.
- **Limitations:** Duties vary by service type and size; other consumer, product-safety, tax, and national laws also apply.

### COM-UK-1 — Online choice architecture discussion paper

- **Source:** UK Competition and Markets Authority, *Online Choice Architecture: How digital design can harm competition and consumers*, discussion paper, April 2022. https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/1066524/Online_choice_architecture_discussion_paper.pdf
- **Type:** [DISCUSSION PAPER]
- **Scope:** Digital choice environments and potential UK consumer/competition harm.
- **Supports:** A taxonomy of practices such as defaults, scarcity and popularity claims, sludge, and choice framing can affect decisions.
- **Content implication:** Audit the whole decision environment and the evidence behind urgency, scarcity, ranking, social-proof, and personalized claims.
- **Limitations:** The paper expressly says it is discussion material, not business guidance and not a finding that each example broke law.

### TRAVEL-US-1 — Airline refunds

- **Source:** US Department of Transportation, *Refunds and Other Consumer Protections*, final rule, 24 April 2024. https://www.transportation.gov/sites/dot.gov/files/2024-04/Final%20Rule%20Refunds%20and%20Other%20Consumer%20Protections%20%282105-AF04%29_0.pdf
- **Type:** [LAW]
- **Scope:** Covered US air-carrier and ticket-agent cancellations, significant changes, and refunds.
- **Supports:** Refund eligibility depends on who changed or cancelled the itinerary, whether an alternative was accepted or rejected, response deadlines, form of payment, and timing.
- **Content implication:** Disruption copy must state what changed, who is acting, choices, monetary consequence, deadline, refund form/timing, itinerary impact, and accessible support. `Credit` and `refund` must never be interchangeable.
- **Limitations:** Air-specific; current litigation, amendments, enforcement policy, and applicability to an itinerary or seller must be checked.

### TRAVEL-EU-1 — EU passenger rights

- **Source:** European Commission, *EU passenger rights* portal. https://transport.ec.europa.eu/transport-themes/passenger-rights_en
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** EU air, rail, bus/coach, and waterborne passenger-rights regimes.
- **Supports:** Rights and assistance vary by mode, disruption, delay, cause, itinerary, and passenger needs.
- **Content implication:** Do not write a generic `travel disruption` policy. Determine mode, operating carrier, ticket/booking role, origin/destination, event time, passenger circumstances, available rerouting/refund/assistance, and claim channel.
- **Limitations:** Portal summary; the underlying regulation and case law control. Territorial and mode-specific rules differ.

### TRAVEL-UK-1 — Airline accessibility

- **Source:** UK Civil Aviation Authority, *Airline Accessibility Guidance (CAP 2990)*, August 2024. https://www.caa.co.uk/publication/download/22653
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** UK airline passenger accessibility, including pre-journey information.
- **Supports:** Special-assistance information should be easy to find, clear, jargon-free, accessible, and available in formats users need; access should be integrated rather than segregated.
- **Content implication:** Assistance labels, request timing, equipment/mobility-device facts, airport versus airline responsibility, confirmation, handoff, and disruption recovery need explicit ownership.
- **Limitations:** UK aviation guidance; airport, airline, booking-agent, and destination duties differ.

## B2B software, developer tools, cybersecurity, social products, and gaming

### TECH-X-1 — Secure by Design

- **Source:** CISA and international partners, *Shifting the Balance of Cybersecurity Risk: Principles and Approaches for Security-by-Design and -Default*, 2023. https://www.cisa.gov/sites/default/files/2023-06/principles_approaches_for_security-by-design-default_508c.pdf
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** Software manufacturers and enterprise technology.
- **Supports:** Security burden should not fall solely on customers; safe configurations should be default; manufacturers should be transparent about vulnerabilities and provide usable security capabilities and logging.
- **Content implication:** Security warnings cannot compensate for unsafe defaults. Setup, permission, secret, destructive-operation, audit-log, and incident content must reflect the security model and roles precisely.
- **Limitations:** Voluntary guidance, not a universal software-content standard.

### TECH-US-2 — Cybersecurity incident response

- **Source:** US National Institute of Standards and Technology, *SP 800-61 Rev. 3: Incident Response Recommendations and Considerations for Cybersecurity Risk Management*, April 2025. https://csrc.nist.gov/pubs/sp/800/61/r3/final
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** Organizational cybersecurity-risk and incident-response programs.
- **Supports:** Incident response spans preparation, detection, response, recovery, communication, coordination, documentation, and continual improvement.
- **Content implication:** Incident banners and status pages need incident source-of-truth, affected scope, timestamps/time zone, known/unknown distinction, user action, next update, and recovery/resolution criteria.
- **Limitations:** Risk-management guidance; it does not prescribe one public-message template or supersede breach-notification law.

### SOC-EU-1 — DSA moderation explanations and redress

- **Source:** European Commission, *DSA Transparency Database: Questions and Answers*, current. https://digital-strategy.ec.europa.eu/en/faqs/dsa-transparency-database-questions-and-answers
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** Hosting services and online platforms subject to the DSA statement-of-reasons and transparency framework.
- **Supports:** Users affected by content removal or restriction receive clear, specific reasons including the restriction, ground, and relevant facts/circumstances; redress mechanisms support challenge.
- **Content implication:** Moderation content needs decision, affected object, policy or legal ground, enforcement duration/scope, automation involvement where required, and review/appeal path. Playful community voice should not obscure enforcement.
- **Limitations:** The FAQ summarizes law and database fields; exact obligations come from the DSA and implementing acts.

### SOC-UK-1 — Online Safety Act child duties

- **Source:** Ofcom, *Protection of children duties under the Online Safety Act*, published 18 February 2026, updated 1 April 2026. https://www.ofcom.org.uk/online-safety/protecting-children/protection-of-children-duties-under-the-online-safety-act
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** In-scope UK user-to-user and search services likely to be accessed by children.
- **Supports:** Providers need access and risk assessments, protection measures, clear terms/public statements, content moderation, reporting and complaints, age assurance where applicable, and records.
- **Content implication:** Safety copy must derive from the service risk assessment and policy implementation. `Report`, `block`, `mute`, `restrict`, `remove`, `appeal`, and crisis-support paths need distinct outcomes.
- **Limitations:** Applicability and proportionate measures depend on service type, size, features, and risk. Codes and guidance may continue to change.

### GAME-US-1 — In-game purchase enforcement example

- **Source:** US Federal Trade Commission, *Genshin Impact game developer settlement*, 17 January 2025. https://www.ftc.gov/news-events/news/press-releases/2025/01/genshin-impact-game-developer-will-be-banned-selling-lootboxes-teens-under-16-without-parental
- **Type:** [ENFORCEMENT]
- **Scope:** Alleged US COPPA, purchase, odds, virtual-currency, and child/teen harms resolved by settlement.
- **Supports:** Multiple virtual-currency conversions, unclear real-money cost, odds representations, time pressure, and child-directed presentation can combine into consumer harm.
- **Content implication:** Show real-world price or a reliable conversion, odds and guarantees, cumulative/recurring cost, parental controls, and what a purchase actually grants. Entertainment tone cannot blur spend or chance.
- **Limitations:** Settlement allegations are not a universal adjudicated rule; gambling, loot-box, and age rules differ substantially by jurisdiction.

## AI assistants and agentic products

### AI-EU-1 — EU AI Act as amended in 2026

- **Sources:** European Union, Regulation (EU) 2024/1689 (AI Act), 13 June 2024. https://eur-lex.europa.eu/eli/reg/2024/1689/oj ; Regulation (EU) 2026/1744 of 8 July 2026 amending the AI Act and related legislation. https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32026R1744
- **Type:** [LAW]
- **Scope:** Providers, deployers, importers, distributors, and affected persons within the act's risk- and role-based scope.
- **Supports:** Role, use case, risk category, human oversight, instructions, recordkeeping, and transparency duties differ. Article 50 covers specified interactions and synthetic-content situations; high-risk instructions require capabilities, limits, and oversight information.
- **Content implication:** AI copy must identify what is AI, what it can and cannot do, when output is uncertain, what data/action it uses, and how a person can review or obtain recourse—according to the actual system and applicable role.
- **Limitations:** Application remains phased, and Regulation (EU) 2026/1744 changed material implementation provisions and timing. Check the current consolidated text, guidelines, classification, and Member State enforcement; do not infer obligations from product labels such as `copilot` or `agent`.

### AI-EU-2 — Article 50 transparency guidance

- **Source:** European Commission, *Guidelines on transparency obligations for providers and deployers of AI systems*, published 20 July 2026 and updated 31 July 2026. https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** EU AI Act Article 50 transparency duties applying from 2 August 2026, subject to the guidelines' scope.
- **Supports:** People may need to be informed when directly interacting with AI; specified AI-generated or manipulated content needs machine-readable marking or disclosure depending on actor and context.
- **Content implication:** Disclosure must be attached to the correct interaction/content lifecycle and cannot be replaced by a global footer. Preserve provenance and human-review status.
- **Limitations:** Very recent and legally sensitive; confirm the downloaded guideline version and current law when determining applicability.

### AI-US-1 — Generative AI risk profile

- **Source:** US National Institute of Standards and Technology, *NIST AI 600-1: Artificial Intelligence Risk Management Framework — Generative Artificial Intelligence Profile*, 26 July 2024. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** Voluntary generative-AI risk management.
- **Supports:** Risks include confabulation, human-AI configuration, information integrity, privacy, harmful bias, and over-reliance; confident false output and fabricated citations can mislead users, especially in consequential domains.
- **Content implication:** Agent output needs uncertainty handling, evidence/provenance, consequence-sensitive review, capability boundaries, and safe failure. Human-sounding fluency is not evidence of truth.
- **Limitations:** Voluntary profile, not a product-copy standard or certification.

### AI-US-2 — AI marketing claims and substantiation

- **Sources:** US Federal Trade Commission, *Advertising FAQs: A Guide for Small Business*. https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business ; and *Content at Scale AI* (Workado case record), last updated 28 August 2025. https://www.ftc.gov/legal-library/browse/cases-proceedings/2323092-content-scale-ai
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** US advertising claims about AI products and performance.
- **Supports:** Express and implied material claims need an adequate evidentiary basis. The Workado matter applies that principle to claimed AI-detector accuracy and requires competent and reliable evidence for covered efficacy representations.
- **Content implication:** Terms such as `understands`, `decides`, `detects`, `guarantees`, `autonomous`, and `human-like` are claims requiring substantiation and scope. Prefer observable behavior and constraints.
- **Limitations:** The FAQ is general business guidance, and the Workado consent matter concerns a particular company, product, and order. Neither alone defines every AI-product claim or jurisdiction.

## Children and families

### CHILD-US-1 — Amended COPPA Rule

- **Source:** US Federal Trade Commission, *Children's Online Privacy Protection Rule*, final amendments published 22 April 2025; effective 23 June 2025; general compliance date 22 April 2026 with specified exceptions. https://www.govinfo.gov/content/pkg/FR-2025-04-22/pdf/2025-05904.pdf
- **Type:** [LAW]
- **Scope:** Operators covered by COPPA and personal information collected online from children under 13.
- **Supports:** Clear policies and direct parent notice, verifiable parental consent, separate consent for specified third-party disclosures, data minimization/retention, security, and parent review/deletion rights; the amendments include biometric and government identifier changes.
- **Content implication:** The system must distinguish child, parent/guardian, school, operator, third party, consent purpose, data category, collection timing, deletion, and revocation. A child-friendly explanation does not replace the parent notice.
- **Limitations:** US federal rule for under-13 coverage; state laws, mixed audiences, schools, teens, and international rules differ. Check current enforcement statements and exact exceptions.

### CHILD-UK-1 — Age Appropriate Design Code

- **Source:** UK Information Commissioner's Office, *Age appropriate design: a code of practice for online services*. https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** Information-society services likely to be accessed by children within UK data-protection scope.
- **Supports:** The child's best interests, age-appropriate transparency, high-privacy defaults, data minimization, parental controls, profiling, nudge techniques, and connected toys/features are linked design concerns.
- **Content implication:** Test explanations with relevant age groups; distinguish what the child sees from what a parent controls; never use reassuring or playful language to disguise surveillance, sharing, spend, or safety consequences.
- **Limitations:** UK data-protection code, not a general child-development standard; age bands and other safety/consumer laws require separate work.

### CHILD-EU-1 — DSA protection-of-minors guidelines

- **Source:** European Commission, *Guidelines on measures to ensure a high level of privacy, safety and security for minors online*, announced 14 July 2025. https://digital-strategy.ec.europa.eu/en/policies/dsa-guidelines
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** Online platforms accessible to minors within the DSA framework.
- **Supports:** Privacy, safety, and security for minors span recommender systems, accounts, reporting, moderation, age assurance, and interface design.
- **Content implication:** Child safety cannot live only in terms. Content for defaults, reporting, blocking, recommendations, contact, and support must correspond to implemented protections.
- **Limitations:** DSA guidance with service-specific proportionality; use the full multilingual guidelines and current enforcement context.

## Nonprofits, emergencies, and crises

### NPO-US-1 — Online charitable giving portals

- **Source:** US Federal Trade Commission, *Online Charitable Giving Portals*, 2018. https://www.ftc.gov/business-guidance/resources/online-charitable-giving-portals
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** US online charitable giving portals.
- **Supports:** Before donating, people should clearly understand who receives the money, intermediary roles, fees, delivery timing, what happens if funds cannot be delivered, screening, and data sharing.
- **Content implication:** Mission-led warmth cannot obscure recipient, fee, tax receipt, restricted/unrestricted use, timing, privacy, recurring-gift, refund, or failure facts.
- **Limitations:** Portal-focused FTC guidance; nonprofit registration, fundraising, tax, sanctions, grant, and country requirements differ.

### CRISIS-US-1 — CDC Crisis and Emergency Risk Communication

- **Source:** US Centers for Disease Control and Prevention, *Crisis & Emergency Risk Communication (CERC) Manual*; index updated 20 November 2024, core introduction last updated 2018. https://www.cdc.gov/cerc/php/cerc-manual/index.html
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** Communication during public-health and other major emergencies.
- **Supports:** Be first, right, and credible; express empathy; promote action; show respect. State what is known, unknown, and being done to learn more.
- **Content implication:** Life-safety content should lead with affected place/time, hazard, immediate action, who is issuing it, and when the next update will come. Brand cleverness and unsupported certainty are unsafe.
- **Limitations:** US public-health framework; the actual incident command and competent authority control facts and release approval.

### CRISIS-X-1 — WHO emergency risk communication

- **Source:** World Health Organization, *Communicating risk in public health emergencies: a WHO guideline for emergency risk communication policy and practice*, 2018. https://www.who.int/publications/i/item/9789241550208
- **Type:** [OFFICIAL GUIDANCE]
- **Scope:** International public-health emergencies.
- **Supports:** Accurate information should arrive early and often in languages and channels people understand, trust, and use; communication should acknowledge uncertainty, engage communities, and enable protective action.
- **Content implication:** Translation, trusted local channels, community feedback, rumor monitoring, offline access, and update cadence are part of crisis content operations.
- **Limitations:** Public-health emergency guidance, not a substitute for hazard-, locale-, or agency-specific alert protocols.

## Corpus-level limitations and gaps

- This pass emphasizes US, UK, EU, and international standards because current primary sources were accessible in English. It does **not** justify treating those regimes as global defaults.
- India, Canada, Australia/New Zealand, Latin America, the Caribbean, the Middle East, Africa, and East/Southeast Asia need dedicated legal, cultural, linguistic, and practitioner work.
- English-language access biases the corpus. Local-language primary texts and local counsel should outrank English summaries for local decisions.
- Industry categories overlap. A children's health-insurance chatbot may simultaneously trigger child, health, finance, privacy, accessibility, advertising, AI, and platform constraints.
- Public guidance often shows a minimum or one organization's practice; it does not prove users understand the resulting content.
- No source supports a single inherent `financial voice`, `healthcare voice`, or other industry personality. The sources constrain truth, disclosure, timing, structure, accessibility, safety, and redress. Brand voice remains organization-specific; situational tone follows user context and consequence.
- Practitioner interviews are still needed with content designers, translators/localizers, accessibility specialists, regulators/compliance partners, lawyers, clinicians, educators, trust-and-safety teams, crisis communicators, and users with lived experience.
- This corpus must be rechecked before implementation because regulations, official interpretations, court orders, standards, and enforcement positions change.
