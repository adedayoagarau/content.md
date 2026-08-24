---
title: Foundations source notes
status: research-notes
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
scope: Discipline, competencies, workflow, artifacts, collaboration, and organizational models
---

# Foundations source notes

## Method and access labels

These notes support:

- [discipline-and-competencies.md](../01-discipline/discipline-and-competencies.md)
- [end-to-end-workflow.md](../02-workflow/end-to-end-workflow.md)
- [artifacts-and-collaboration.md](../02-workflow/artifacts-and-collaboration.md)

The research followed the hierarchy in the project [research protocol](../00-method/research-protocol.md): standards and official specifications first where applicable, then primary organizational guidance, peer-reviewed research or professional bodies, and attributed practitioner sources. A named organization's practice is evidence about that organization, not a universal rule.

Access modes mean:

- **`direct/read`** — the relevant page, paper, or transcript was opened and its substantive content reviewed.
- **`abstract/metadata only`** — only the publisher's title, status, and abstract or metadata were available or used; the source cannot support detailed method claims.

All sources were accessed on **2026-08-17**. Publication or update dates below are those displayed by the source when available; “not stated” means the page did not expose a reliable date in the material reviewed.

## Standards and official specifications

### F01 — Web Content Accessibility Guidelines (WCAG) 2.2

- **Citation:** W3C, *Web Content Accessibility Guidelines (WCAG) 2.2*, W3C Recommendation; current page dated 2024-12-12.
- **URL:** https://www.w3.org/TR/WCAG22/
- **Source type / evidentiary role:** International web standard; normative within its defined technologies, success criteria, levels, and conformance scope.
- **Access:** `direct/read`
- **Scope:** Web content and applications; global; technology-neutral criteria with supporting guidance; not a complete usability or inclusion framework.
- **Supports:** Content-relevant requirements for page titles, headings and labels, link purpose, language, consistent navigation and identification, error identification and suggestion, instructions, accessible names, programmatic status, redundant entry, and error prevention for specified consequential actions.
- **Practices/artifacts:** Criteria mapping, accessibility content specification, state and error inventory, built conformance review.
- **Limits:** Applying one criterion requires its exact conditions and conformance level. WCAG conformance does not establish that the whole journey is usable, understandable, equitable, or suitable for every disability.
- **Questions:** How should `content.md` encode applicability, conformance level, test method, and evidence without turning WCAG into generic style advice?

### F02 — Involving Users in Evaluating Web Accessibility

- **Citation:** W3C Web Accessibility Initiative, *Involving Users in Evaluating Web Accessibility*; date not stated on reviewed page.
- **URL:** https://www.w3.org/WAI/planning/involving-users/
- **Source type / evidentiary role:** Standards-body supporting guidance; informative rather than a normative WCAG success criterion.
- **Access:** `direct/read`
- **Scope:** Web accessibility evaluation; involving disabled people throughout design and evaluation.
- **Supports:** Combine standards-based review with user involvement; include people with disabilities early, use workflows, scenarios, personas, prototypes, and representative tasks.
- **Practices/artifacts:** Inclusive research plan, participant/access-needs profile, scenario and workflow evaluation, findings linked to standards and lived experience.
- **Limits:** User evaluation with a small sample cannot establish conformance or represent every disability; standards review also remains necessary.
- **Questions:** What minimum disabled-user evidence is proportionate for different product and risk classes?

### F03 — Internationalization Quick Tips for the Web

- **Citation:** W3C Internationalization Activity, *Internationalization Quick Tips for the Web*; date not stated on reviewed page.
- **URL:** https://www.w3.org/International/quicktips/index
- **Source type / evidentiary role:** Standards-body implementation guidance.
- **Access:** `direct/read`
- **Scope:** Web internationalization; global languages, scripts, direction, formats, encoding, and localizable text.
- **Supports:** Use Unicode; identify language; support bidirectional text; use local formats; avoid cultural assumptions; design clear, simple text; compose strings carefully and avoid structures that prevent translators from reordering meaning.
- **Practices/artifacts:** Internationalization checklist, localizable-string specification, variable and format schema, locale test plan.
- **Limits:** Quick tips are orientation, not complete language, locale, cultural, or legal guidance. They do not replace local expertise.
- **Questions:** Which rules can be linted safely, and which require runtime, design, or locale-human evaluation?

### F04 — Internationalization best practices for specifications and schemas

- **Citation:** W3C Internationalization Working Group, *Internationalization Best Practices for Spec Developers*, W3C Group Note dated 2026-08-07, and *W3C I18N Schema Development Techniques*.
- **URL:** https://www.w3.org/TR/international-specs/ and https://www.w3.org/International/techniques/developing-schemas.en.html
- **Source type / evidentiary role:** Standards-body notes and technical guidance.
- **Access:** `direct/read`
- **Scope:** Specifications and schemas carrying localizable content and language/direction metadata.
- **Supports:** Localizable content needs explicit language and direction metadata, translatability decisions, segmentation care, and contextual notes; syntactic or user-provided data should be distinguished from localizable content.
- **Practices/artifacts:** Schema annotations, localization notes, field-level translatability and direction metadata, content-model review.
- **Limits:** Technical specification guidance does not decide product tone, terminology, cultural suitability, or translation quality.
- **Questions:** What repository-neutral schema can preserve these properties across code, CMS, and translation systems?

### F05 — ISO 9241-210:2019

- **Citation:** ISO, *Ergonomics of human-system interaction — Part 210: Human-centred design for interactive systems*, Edition 2, 2019-07; ISO records the edition as confirmed in 2025.
- **URL:** https://www.iso.org/standard/77520.html
- **Source type / evidentiary role:** International standard.
- **Access:** `abstract/metadata only`
- **Scope:** Human-centred design principles and lifecycle activities for interactive systems.
- **Supports:** Only the high-level boundary that human-centred design is a lifecycle concern for interactive systems; no detailed requirements from the paywalled standard are used in this corpus.
- **Practices/artifacts:** None derived beyond using the standard as a pointer for later licensed review.
- **Limits:** Full text was not read. Detailed claims, compliance assertions, or checklists must not be attributed to this source from the abstract.
- **Questions:** Obtain licensed practitioner access if `content.md` will claim conformance or map its workflow to ISO requirements.

### F06 — Government Functional Standard GovS 005: Digital

- **Citation:** UK Government, *Government Functional Standard GovS 005: Digital*; live HTML edition accessed 2026-08-17.
- **URL:** https://www.gov.uk/government/publications/government-functional-standard-govs-005-digital/government-functional-standard-govs-005-digital-html
- **Source type / evidentiary role:** UK government functional standard with a stated government scope; not evidence of global applicability.
- **Access:** `direct/read`
- **Scope:** Management of UK government digital work and services.
- **Supports:** User needs are distinct from a proposed solution; work should preserve traceability; validation concerns whether intended use or need is met, while verification concerns whether specified requirements are fulfilled.
- **Practices/artifacts:** User-need trace, requirements mapping, separate validation and implementation-verification evidence.
- **Limits:** Government governance and terminology may not map directly to private, nonprofit, open-source, or non-UK organizations.
- **Questions:** Which lifecycle terms should `content.md` adopt directly and which should remain configurable?

## Primary government and public-service practice

### F07 — Government Digital and Data: Content designer capability framework

- **Citation:** UK Government, *Content designer* capability profile; page updated 2026-05-29.
- **URL:** https://ddat-capability-framework.service.gov.uk/role/content-designer
- **Source type / evidentiary role:** Primary organizational capability framework.
- **Access:** `direct/read`
- **Scope:** UK government digital and data profession; career levels from associate through head of content design.
- **Supports:** Content design starts in discovery, spans digital and offline journeys, combines content architecture and management, evidence, inclusive and strategic design, collaboration, iteration, and leadership. More senior levels address workflow, reuse, constraints, risks, and decision documentation.
- **Practices/artifacts:** Research and hypotheses, content organization and metadata, prototypes, patterns, journey-wide evaluation, documented risks and unresolved decisions.
- **Limits:** Civil-service grades, responsibilities, and vocabulary are organization-specific. The framework is normative for its professional context, not every content team.
- **Questions:** Which competencies are foundational across sectors, and which are government-specific or level-specific?

### F08 — Government Digital and Data: Content strategist capability framework

- **Citation:** UK Government, *Content strategist* capability profile; page updated 2025-02-28.
- **URL:** https://ddat-capability-framework.service.gov.uk/role/content-strategist
- **Source type / evidentiary role:** Primary organizational capability framework.
- **Access:** `direct/read`
- **Scope:** UK government content strategy roles.
- **Supports:** Strategy takes a systemic view of what content exists and how it is produced, with explicit governance, workflow, taxonomy, architecture, and senior stakeholder responsibilities.
- **Practices/artifacts:** Governance and workflow design, taxonomies, content architecture, strategy, team and capability development.
- **Limits:** Other organizations treat these as senior content-design responsibilities or distribute them among operations, IA, and product roles.
- **Questions:** Should `content.md` model strategy as a capability layer, a separate persona, or both?

### F09 — Government Digital and Data: Technical writer capability framework

- **Citation:** UK Government, *Technical writer* capability profile; page updated 2025-02-28.
- **URL:** https://ddat-capability-framework.service.gov.uk/role/technical-writer
- **Source type / evidentiary role:** Primary organizational capability framework.
- **Access:** `direct/read`
- **Scope:** UK government specialist technical documentation roles.
- **Supports:** Technical writing is user-centered but focused on specialist technologist audiences, complex concepts, software documentation, multichannel lifecycle, and technical tooling and standardization.
- **Practices/artifacts:** Developer and software documentation, content lifecycle management, documentation tooling and standards.
- **Limits:** Does not establish a universal boundary between technical writing and content design; many organizations combine or rename roles.
- **Questions:** What specialist knowledge and test methods should trigger a technical-writing rather than general product-content path?

### F10 — What each role does in a service team

- **Citation:** UK Government Service Manual, *What each role does in a service team*; date not stated on reviewed page.
- **URL:** https://www.gov.uk/service-manual/the-team/what-each-role-does-in-service-team
- **Source type / evidentiary role:** Primary organizational service-delivery guidance.
- **Access:** `direct/read`
- **Scope:** UK government multidisciplinary service teams.
- **Supports:** Product management prioritizes and accepts work; the service owner has end-to-end accountability, approvals, and risk responsibility; user research plans evidence work; content design plans and produces user-centered, accessible content; developers build and maintain; performance analysts provide evidence; quality is shared.
- **Practices/artifacts:** Role and decision map, multidisciplinary delivery, explicit service ownership.
- **Limits:** Titles and authorities vary; the source does not prescribe detailed decision matrices for every organization.
- **Questions:** How should a repository discover local equivalents when titles differ or one person holds several roles?

### F11 — Have a multidisciplinary team

- **Citation:** UK Government Service Manual, *Have a multidisciplinary team*; page updated 2026-01-29.
- **URL:** https://www.gov.uk/service-manual/service-standard/point-6-have-a-multidisciplinary-team
- **Source type / evidentiary role:** Primary organizational service standard guidance.
- **Access:** `direct/read`
- **Scope:** UK government service-standard assessment.
- **Supports:** Team composition changes by service phase; decision-makers should be embedded and accountable; teams need access to legal, policy, and industry expertise; AI-enabled services need relevant AI understanding and impact awareness.
- **Practices/artifacts:** Phase-based capability plan, specialist-access and decision-maker map.
- **Limits:** Specifies assessment expectations in a government setting, not universal headcount ratios or team shapes.
- **Questions:** What content-specific capability minimums apply by phase, risk, and adoption mode?

### F12 — Start by learning user needs

- **Citation:** UK Government Service Manual, *Start by learning user needs*; date not stated on reviewed page.
- **URL:** https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs
- **Source type / evidentiary role:** Primary organizational user-research guidance.
- **Access:** `direct/read`
- **Scope:** Government service discovery and continuous research.
- **Supports:** Research actual or likely users and relevant frontline or support roles; treat non-user opinions as assumptions; write needs as problems in user language with evidence; validate and refine needs; trace them into stories and acceptance criteria.
- **Practices/artifacts:** Evidence-backed user needs, maps/personas where useful, research plan, acceptance trace.
- **Limits:** The need-statement format is an organizational tool; it should not replace richer jobs, contexts, or systems evidence.
- **Questions:** How should the agent represent competing, minority, accessibility, or non-user stakeholder needs without flattening them?

### F13 — GOV.UK transition guidance for agencies

- **Citation:** UK Government, *GOV.UK transition guidance for agencies*; date not stated on reviewed page.
- **URL:** https://www.gov.uk/guidance/govuk-transition-guidance-for-agencies
- **Source type / evidentiary role:** Primary organizational migration guidance.
- **Access:** `direct/read`
- **Scope:** Moving agency web content to GOV.UK; public information, not transactional-product UI.
- **Supports:** Audit content using traffic, impact, staleness, duplication, research, contact-center and forum evidence; validate user needs; plan relevance, exclusions, gaps, formats, and owners; allow “no content” or another channel as outcomes.
- **Practices/artifacts:** Inventory, audit, user-need validation, content plan, migration and exclusion decisions.
- **Limits:** Government website transition is narrower than product takeover, source-code migration, notifications, or app state inventories.
- **Questions:** Which audit fields generalize to products, and which additional state, behavior, variable, and provenance fields are required?

### F14 — Manage existing GOV.UK content

- **Citation:** Government Digital Service, *Manage existing GOV.UK content*; current publishing guidance accessed 2026-08-17.
- **URL:** https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/plan-manage-content/manage-existing-govuk-content/
- **Source type / evidentiary role:** Primary organizational publishing guidance.
- **Access:** `direct/read`
- **Scope:** GOV.UK publishing and maintenance.
- **Supports:** Existing content needs auditing, metadata and regular monitoring for findability and usefulness; teams update, fix, improve, or retire it and coordinate across co-owning organizations.
- **Practices/artifacts:** Maintenance inventory, metadata, content health review, co-owner coordination, retirement.
- **Limits:** Publishing workflows do not cover every application, runtime state, release system, or regulated retention duty.
- **Questions:** What event- and risk-based review triggers are better than uniform calendar review?

### F15 — GOV.UK content principles and research background

- **Citation:** UK Government, *GOV.UK content principles: conventions and research background*; date not stated on reviewed page.
- **URL:** https://www.gov.uk/government/publications/govuk-content-principles-conventions-and-research-background/govuk-content-principles-conventions-and-research-background
- **Source type / evidentiary role:** Primary organizational guidance and research rationale.
- **Access:** `direct/read`
- **Scope:** GOV.UK content conventions and the research basis for online government guidance.
- **Supports:** Distinguishes interaction and reading effects of online use from editorial house style while acknowledging overlap; emphasizes content that helps people act.
- **Practices/artifacts:** Evidence-backed content principles, online reading and task conventions.
- **Limits:** GOV.UK audience, channel, and public-sector conventions should not be exported unchanged to other domains, cultures, or product modes.
- **Questions:** How should `content.md` separate evidence-based interaction guidance from brand, house style, and organization-specific convention?

### F16 — DfE quality and assurance

- **Citation:** Department for Education design manual, *Quality and assurance*; date not stated on reviewed page.
- **URL:** https://design.education.gov.uk/content-design/quality-and-assurance
- **Source type / evidentiary role:** Primary organizational content-design guidance.
- **Access:** `direct/read`
- **Scope:** UK Department for Education service content.
- **Supports:** Critiques need context and a clear feedback request; final second-person assurance should happen in context, after factual SME review, with clearance and go-live planning; checks vary by content type and may include taxonomy and change notes.
- **Practices/artifacts:** Critique brief, fact check, second-person review, realistic preview, clearance and release plan.
- **Limits:** “2i” terminology and ordering are local practices; other teams use different assurance models.
- **Questions:** Which review types and ordering should be configurable by organization, content type, and risk?

### F17 — Home Office designer role standard

- **Citation:** Home Office Design System, *Designer role standard*; date not stated on reviewed page.
- **URL:** https://design.homeoffice.gov.uk/design-and-content/professional-standards/designer-role-standard
- **Source type / evidentiary role:** Primary organizational professional standard.
- **Access:** `direct/read`
- **Scope:** UK Home Office service designers, interaction designers, and content designers.
- **Supports:** Discovery covers problem, users, policy, journeys, and user language; alpha explores approaches, hypotheses, prototypes, and messages; beta tests and iterates, audits accessibility, and sets success measures; live work uses analytics, feedback, and new needs. It also documents varying levels of designer integration and a detailed definition of done.
- **Practices/artifacts:** Prototypes, decision history, research links, basic HTML fluency for content designers, user testing, SME/product sign-off, development-environment review.
- **Limits:** Home Office operating context and role expectations are not universal. Its “integrated” scale is diagnostic, not an industry maturity certification.
- **Questions:** Can the integration model predict where an agent will lack context or authority?

### F18 — Content crits: they're not scary

- **Citation:** UK Government Design Notes, *Content crits: they're not scary*, 2022-08-09.
- **URL:** https://designnotes.blog.gov.uk/2022/08/09/content-crits-theyre-not-scary/
- **Source type / evidentiary role:** First-person government practitioner account.
- **Access:** `direct/read`
- **Scope:** Peer critique practice in UK government content teams.
- **Supports:** Share unfinished work early, create psychological safety, ask for useful peer feedback, and adapt cadence to context.
- **Practices/artifacts:** Critique session, framing question, unfinished work, facilitated feedback.
- **Limits:** Practitioner experience, not controlled research or mandatory service policy; team culture and facilitation affect outcomes.
- **Questions:** What critique protocol works asynchronously and with agent-generated proposals without anchoring reviewers?

### F19 — Using hypotheses to improve content review

- **Citation:** Defra digital, data, technology and security blog, *Using hypotheses to improve our content review process*, 2024-12-23.
- **URL:** https://defradigital.blog.gov.uk/2024/12/23/using-hypotheses-to-improve-our-content-review-process/
- **Source type / evidentiary role:** Primary organizational practitioner case study.
- **Access:** `direct/read`
- **Scope:** Improving a UK government content team's review operation.
- **Supports:** A universal second-content-designer review rule can create load and inconsistency; process changes can be framed as hypotheses with expected effects and measures; ticket templates and training can support change.
- **Practices/artifacts:** Workflow hypothesis, expected measure, ticket template, training, review-process experiment.
- **Limits:** Local operational case; does not prove that second-person review should be removed or retained elsewhere.
- **Questions:** How should review depth scale with risk, reviewer supply, and recurring defect evidence?

### F20 — Scottish Government guidance for content designers

- **Citation:** Scottish Government Service Manual, *Guidance for Content Designers*; date not stated on reviewed index.
- **URL:** https://servicemanual.gov.scot/browse/designing-your-service/content-standards/guidance-for-content-designers
- **Source type / evidentiary role:** Primary organizational content standard index.
- **Access:** `direct/read`
- **Scope:** Scottish Government and organizations within its Technology Assurance Framework.
- **Supports:** Content-design guidance covers discovery, user needs, stakeholder/SME involvement, cross-channel content planning, keyword research, writing, review and fact checking, and web archiving.
- **Practices/artifacts:** Discovery evidence, content plan, stakeholder map, fact check, archive decision.
- **Limits:** The reviewed index summarizes linked practices; each detailed rule needs its own page review before enforcement. Government publishing context is narrower than all product channels.
- **Questions:** Which Scottish lifecycle guidance adds evidence beyond GOV.UK, especially archiving and publishing ownership?

### F21 — Content design at the Canadian Digital Service

- **Citation:** Canadian Digital Service, *Content design at CDS*, 2025-03-05.
- **URL:** https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/
- **Source type / evidentiary role:** Primary organizational practice documentation.
- **Access:** `direct/read`
- **Scope:** Former internal onboarding and alignment guidance for CDS; bilingual English/French Canadian public-service products.
- **Supports:** Content design concerns information need, meaning, mental models, relevance, minimum sufficient interface, accessibility, and iteration. CDS documents responsibility across strategy, scope, structure/skeleton, and surface, plus an eight-step workflow: investigate, set up, draft/design, reach language parity, test/iterate, review, finalize, implement/evaluate.
- **Practices/artifacts:** User and terminology research, legal/technical constraints, content audit, assumption log, version control, side-by-side bilingual design, hierarchy, critique, product demo, user test, fact check, inclusive review, code review, release evaluation.
- **Limits:** The page explicitly says it is not a complete overview and records material previously used for internal alignment. Bilingual official-language requirements and some writing checklist items are context-specific.
- **Questions:** How should language parity work for many locales, non-equivalent service rules, and bidirectional scripts?

### F22 — Service design at the Canadian Digital Service

- **Citation:** Canadian Digital Service, *Service design at CDS*, 2025-03-05.
- **URL:** https://digital.canada.ca/service-digital-toolkit/user-centred-design/service-design-at-cds/
- **Source type / evidentiary role:** Primary organizational practice documentation.
- **Access:** `direct/read`
- **Scope:** Former CDS internal onboarding guidance for Canadian public services.
- **Supports:** Service design plans and organizes people, infrastructure, communication, and service components across touchpoints; CDS describes it as human-centered, collaborative, iterative, sequential, real, and holistic, with overlapping—not substitutive—multidisciplinary skills.
- **Practices/artifacts:** Ecosystem and journey maps, service blueprints, facilitation, co-creation, prototypes, systems synthesis.
- **Limits:** Explicitly not a complete field overview; some definitions derive from established practitioner traditions rather than original empirical work.
- **Questions:** What is the cleanest responsibility seam between content and service design in a repository-native agent?

### F23 — Digital.gov plain-language guide

- **Citation:** US General Services Administration, *Plain Language Guide* and its audience, design, writing, and testing modules; live guidance accessed 2026-08-17.
- **URL:** https://digital.gov/guides/plain-language, https://digital.gov/guides/plain-language/principles/write-for-reader, https://digital.gov/guides/plain-language/design, and https://digital.gov/guides/plain-language/test
- **Source type / evidentiary role:** Official US federal government guidance; its law-related obligations apply only within the stated US federal scope.
- **Access:** `direct/read`
- **Scope:** Public-facing US government information and digital content.
- **Supports:** Plain language is tailored to a reader, not reduced to a fixed grade; learn audiences through research, questions, contact, and metrics; use information hierarchy and design; test early and more than once; use comprehension and usability methods rather than preference alone.
- **Practices/artifacts:** Audience evidence, content outline/hierarchy, paraphrase and usability tests, controlled comparisons.
- **Limits:** Government information guidance is not a complete interactive-product, brand, localization, or domain-risk model. Legal jurisdiction is limited.
- **Questions:** Which methods are suitable for small interface strings versus full guidance, forms, and high-consequence decisions?

## Research and professional-body sources

### F24 — Designing Words: The Language Work and Expertise of UX Writers

- **Citation:** Lara Portmann, “Designing Words: The Language Work and Expertise of UX Writers,” in *The Cultural Politics of Digital User Experience Writing*, Cambridge University Press, 2025, DOI 10.1017/9781009540605.004.
- **URL:** https://doi.org/10.1017/9781009540605.004 and https://www.cambridge.org/core/services/aop-cambridge-core/content/view/BD1FF1E1A0AEE632108443160A56C4B7/9781009540582c2_29-54.pdf/designing-words.pdf
- **Source type / evidentiary role:** Scholarly qualitative research chapter.
- **Access:** `direct/read`
- **Scope:** Twenty-one semi-structured interviews conducted from 2020-11 to 2021-04, largely with practitioners at medium-to-large international technology companies and geographically concentrated in the United States/California; supplemented by professional texts and later fieldwork.
- **Supports:** UX-writer/content-designer boundaries are fuzzy; work includes interface text, research, voice, narrative flow, and artifacts such as tone maps, story maps, style guides, and contextual copy documents. Production is distributed across people, time, design, tools, technical constraints, and code; digital text remains malleable and action-oriented.
- **Practices/artifacts:** Contextual copy documents with screenshots, versions, rationales and open questions; tone maps, story maps, style guides; collaboration and implementation tracing.
- **Limits:** Qualitative and historically bounded; not globally or statistically representative; company-size and technology-sector bias. It studies practitioners' accounts and professional politics, not causal product outcomes.
- **Questions:** Do these artifacts and boundaries hold in small teams, public services, non-US languages, regulated sectors, and open source?

### F25 — Understanding Collaborative Practices and Tools of Professional UX Practitioners in Software Organizations

- **Citation:** K. J. Kevin Feng, Tony W. Li, and Amy X. Zhang, *Understanding Collaborative Practices and Tools of Professional UX Practitioners in Software Organizations*, CHI 2023; DOI 10.1145/3544548.3581273; arXiv version revised 2023-02-26.
- **URL:** https://doi.org/10.1145/3544548.3581273 and https://arxiv.org/abs/2302.11845
- **Source type / evidentiary role:** Peer-reviewed empirical survey research.
- **Access:** `direct/read`
- **Scope:** Survey of 114 UX practitioners working in the US software industry; UX broadly, not specifically content design.
- **Supports:** Collaboration occurs across development stages and shared tools; UX designers and product managers are frequent close collaborators; handoff practices persist; collaboration patterns vary with team size, and UX practitioners often initiate collaboration.
- **Practices/artifacts:** Cross-stage collaboration, shared tools, consultation with domain experts, attention to team-size context.
- **Limits:** US-only, self-reported, general UX sample; cannot establish content-specific responsibilities or global organizational norms.
- **Questions:** How do content practitioners' closest collaborators, authority, and handoff failure modes differ from the broader UX sample?

### F26 — Information Architecture Institute overview

- **Citation:** Information Architecture Institute, *What is IA?*, PDF copyright 2013.
- **URL:** https://www.iainstitute.org/sites/default/files/what_is_ia.pdf
- **Source type / evidentiary role:** Established professional-body overview.
- **Access:** `direct/read`
- **Scope:** General information architecture for shared information environments.
- **Supports:** IA centers structural design and organizing and labeling websites, intranets, software, and other shared information environments for usability and findability; it is interdisciplinary.
- **Practices/artifacts:** Structures, navigation, organization and labeling systems.
- **Limits:** Short and old overview, not a current competency standard, method guide, or evidence review. Contemporary data, search, ontology, and AI-mediated retrieval need additional sources.
- **Questions:** What modern professional and research sources should define IA's seam with content modeling, search, knowledge graphs, and agent retrieval?

## Practitioner frameworks and organizational case studies

### F27 — What is content design?

- **Citation:** Sarah Winters, Content Design London, *What is content design?*; reviewed 2024-09-05.
- **URL:** https://contentdesign.london/blog/what-is-content-design
- **Source type / evidentiary role:** First-person practitioner and commercial consultancy guidance.
- **Access:** `direct/read`
- **Scope:** Cross-sector content-design method as taught by a specialist consultancy; rooted in UK public-service practice.
- **Supports:** Content design answers an evidenced need in the best-consumed way; the process includes research, user needs, channel and journey mapping, language and emotion, creation, sharing, and iteration. Journey context includes motivation, cognitive capacity, work, and information need; content designers may not own every channel but need to understand it.
- **Practices/artifacts:** User need, journey map, channel map, content creation and iterative sharing.
- **Limits:** Practitioner synthesis with commercial training incentive; not peer-reviewed or a universal job description.
- **Questions:** Which steps are consistently practiced outside UK government-influenced teams?

### F28 — The discipline of content strategy

- **Citation:** Kristina Halvorson, *The Discipline of Content Strategy*, A List Apart, 2008-12-16.
- **URL:** https://alistapart.com/article/thedisciplineofcontentstrategy/
- **Source type / evidentiary role:** Foundational practitioner essay.
- **Access:** `direct/read`
- **Scope:** Web content strategy as the discipline was being formalized in 2008.
- **Supports:** Strategy addresses why content exists and plans useful, usable content creation, publication, and governance; connects audience and business goals to analysis, messaging, metadata, editorial strategy, workflow, management, and distribution; notes that the scope exceeds one person's expertise.
- **Practices/artifacts:** Audit, analysis, messaging and topic strategy, editorial strategy, voice and tone, legal and user-generated-content policy, calendar, metadata, lifecycle, distribution.
- **Limits:** Historically important but old; predates contemporary product-content practice, design systems, modern localization operations, and agent-mediated interfaces. Practitioner argument, not empirical standard.
- **Questions:** Which foundational distinctions remain useful, and which require updated technical and organizational evidence?

### F29 — The Content Strategy Quad

- **Citation:** Brain Traffic, *Brain Traffic Lands the Quad* / Content Strategy Quad; updated account published 2018.
- **URL:** https://www.braintraffic.com/blog/brain-traffic-lands-the-quad
- **Source type / evidentiary role:** Commercial practitioner framework.
- **Access:** `direct/read`
- **Scope:** Content strategy consulting model.
- **Supports:** Content strategy work spans substance, structure, workflow, and governance around user and business goals.
- **Practices/artifacts:** Substance and messaging, structure/modeling, workflow, governance and ownership.
- **Limits:** Memorable analytic model, not a competency standard or tested causal framework; categories overlap in practice.
- **Questions:** Can the quad act as a completeness check without forcing all organizations into four teams or documents?

### F30 — Maturing content disciplines at Atlassian

- **Citation:** Brain Traffic podcast, *Episode 37: John Collins — Atlassian: Maturing Content Disciplines*, 2021.
- **URL:** https://www.braintraffic.com/podcast/episode-37-john-collins-atlassian-maturing-content-disciplines
- **Source type / evidentiary role:** Transcript-reviewed first-person practitioner interview, hosted by a commercial consultancy.
- **Access:** `direct/read` (transcript)
- **Scope:** One practitioner's account of content roles and organizational development at a large technology company.
- **Supports:** Content design, strategy, engineering, and operations are overlapping capabilities needed to ship; job titles and combinations vary; strategy balances user and business needs; operations sustains day-to-day lifecycle; structured content validation can encode editorial policy.
- **Practices/artifacts:** Capability mapping, operations, content modeling and validation, role design.
- **Limits:** Interview narrative, not Atlassian's binding policy or independent study; large-company context and retrospective interpretation.
- **Questions:** Which capabilities need separate specialists at which scale, and which can be safely combined?

### F31 — Kinneret Yifrah interview on UX writing and microcopy

- **Citation:** UX Content Collective interview with Kinneret Yifrah, publication date not reliably stated on reviewed page.
- **URL:** https://uxcontent.com/interview-kinneret-yifrah/
- **Source type / evidentiary role:** First-person practitioner interview on a commercial community site.
- **Access:** `direct/read`
- **Scope:** Product UX writing/microcopy practice.
- **Supports:** Practitioners debate and overlap terms such as UX writing, content design, and microcopy; microcopy can be understood as an output while the work also involves early involvement, user research, brand and product research, flow, and usability testing.
- **Practices/artifacts:** Product/brand research, flow design, microcopy, usability testing.
- **Limits:** Individual viewpoint and terminology preference; not a professional standard or representative study.
- **Questions:** Which role labels have locally meaningful authority versus being interchangeable recruiting language?

### F32 — Spotify organizational and design-system case studies

- **Citation:** Spotify Design, *Scaling Design Ops*; *The paradox of design systems*; and *Reimagining design systems at Spotify*; publication dates vary by article.
- **URL:** https://spotify.design/article/scaling-design-ops, https://spotify.design/article/the-paradox-of-design-systems, and https://spotify.design/article/reimagining-design-systems-at-spotify
- **Source type / evidentiary role:** First-party organizational case studies.
- **Access:** `direct/read`
- **Scope:** A large global technology company's design operations, UX writing, and design-system evolution.
- **Supports:** Operations can move from centralized to federated forms; UX writing can combine centralized craft with embedded product contexts; a central design-system team can become a bottleneck in an aligned-autonomy organization, prompting a system-of-systems model.
- **Practices/artifacts:** Federated operations, embedded and central roles, shared documentation, contribution and system governance.
- **Limits:** Selective company-authored narratives; Spotify's product architecture, culture, and scale are distinctive. They do not prove federation is best elsewhere.
- **Questions:** Which signals indicate that a central, embedded, or federated content model is failing?

### F33 — Content marketing definition

- **Citation:** Content Marketing Institute, *What Is Content Marketing?*; live page accessed 2026-08-17.
- **URL:** https://contentmarketinginstitute.com/what-is-content-marketing
- **Source type / evidentiary role:** Commercial trade/community organization definition.
- **Access:** `direct/read`
- **Scope:** Marketing practice focused on attracting and retaining a defined audience and driving profitable action.
- **Supports:** Establishes a useful center-of-gravity boundary: content marketing is explicitly tied to strategic creation and distribution for audience attraction, retention, and commercial action.
- **Practices/artifacts:** Content marketing strategy and distribution.
- **Limits:** Commercial and promotional incentive; not a neutral professional standard. Product content may also support acquisition or business outcomes, so the boundary is porous.
- **Questions:** How should one terminology and promise system govern acquisition, product, lifecycle messaging, and support without collapsing their distinct goals?

### F34 — Baymard UX writing overview

- **Citation:** Baymard Institute, *UX Writing: Study Guide*; live page accessed 2026-08-17.
- **URL:** https://baymard.com/learn/ux-writing
- **Source type / evidentiary role:** Commercial UX research organization overview.
- **Access:** `direct/read`
- **Scope:** Primarily e-commerce digital products and Baymard's research corpus.
- **Supports:** UX writing concerns text in digital-product interfaces, should begin early, and may include voice and style; organizations use different role names.
- **Practices/artifacts:** Interface labels, instructions, errors and product language considered with design.
- **Limits:** Explicit e-commerce scope; commercial subscription incentive; overview claims must not be generalized to public services, enterprise tools, health, or other domains without evidence.
- **Questions:** Which interface-writing patterns are domain-specific and which survive cross-domain evaluation?

## Material conflicts and boundary conditions

1. **Role labels are not a stable ontology.** UK government separates content design, content strategy, and technical writing; CDS places strategy-through-surface responsibilities within content design; Portmann and practitioner interviews document fuzzy naming. `content.md` must discover local responsibilities instead of assigning authority from titles.
2. **“Own all the words” conflicts with shared authority.** CDS gives content designers responsibility for user-facing words, while government service models assign facts, product behavior, overall risk, and approvals across a multidisciplinary team. Full content responsibility cannot mean unilateral factual or release control.
3. **Peer review is valuable but not one universal gate.** DfE and CDS document final fresh-eyes checks; Defra documents operational problems with a blanket second-review rule and tests process changes. Review depth should scale with risk, evidence, and organizational capacity.
4. **Content work can be broad or interface-centered.** Government and Content Design London traditions extend across journeys and offline channels; some UX writing sources center digital interface text. The system should model both surface work and end-to-end work without declaring one label superior.
5. **Central consistency and embedded context trade off.** Spotify and Home Office accounts show multiple organizational shapes. A central team can protect systems and craft but become a queue; embedding improves context but can fragment decisions. Governance should match architecture and accountability.
6. **Conformance and user success differ.** WCAG provides normative, testable web criteria; W3C also recommends involving disabled users. Neither standards-only review nor small-sample usability alone establishes complete accessibility.
7. **Plain language is not a fixed readability score.** Digital.gov frames it relative to the reader and task. Organization-specific sentence rules may be useful heuristics but should not override audience, domain, or locale evidence.
8. **Localization is not a final translation step.** W3C technical guidance and CDS bilingual practice both require earlier structural and contextual work, but CDS's English/French parity sequence is not automatically suitable for every market, script, or asymmetric service.
9. **Implemented is not approved; approved is not effective.** The sources distribute design, review, implementation, release, and measurement across different steps and roles. The corpus therefore preserves orthogonal evidence dimensions, independent decision and delivery state systems, and versioned evaluation records.
10. **Historic influence is not current authority.** Halvorson's 2008 strategy essay and the IA Institute's 2013 overview are useful disciplinary landmarks; current implementation and governance requirements need newer evidence too.

## Evidence gaps and next research

- Direct practitioner research across regions, languages, small organizations, agencies, open source, and sectors outside government and large technology.
- Current professional standards for technical communication, editorial practice, localization quality, content operations, knowledge management, and records/archival practice.
- Domain-specific authority and review models for health, finance, insurance, public benefits, safety, education, employment, marketplaces, and child-directed products.
- Content-design methods for conversational agents, voice, multimodal systems, notifications, transactional email/SMS, support tooling, and agent-to-agent interactions.
- Empirical outcome evidence connecting artifacts, workflows, team models, and competency levels to comprehension, task success, errors, trust, equity, support burden, and maintenance cost.
- Non-English-first and culturally plural voice, tone, terminology, content modeling, and governance practice.
- Repository, CMS, design, localization, and analytics interoperability models that preserve one decision's provenance without forcing one vendor.
- Safe agent-autonomy research: authority delegation, privacy, auditability, human attestation, rollback, conflict handling, prompt and source injection, and enforcement boundaries.
- Methods for assessing observable “AI-like” content defects—unsupported claims, genericness, repetition, false certainty, voice drift, and missing context—without pretending to detect authorship reliably.
