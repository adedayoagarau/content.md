---
title: Security, privacy, and trust source notes
status: working-research
started: 2026-08-17
updated: 2026-08-17
accessed: 2026-08-17
evidence_cutoff: 2026-08-17
scope: Repository-native content agent, model context, connectors, supply chain, privacy, writes, audit, and incident response
legal_notice: Research material only; not a security certification, privacy assessment, or legal advice
---

# Security source notes

## How to read these notes

These records support [security, privacy, and trust boundaries](../05-technology/security-privacy-and-trust-boundaries.md). They distinguish standards and official guidance from the architecture proposed for `content.md`.

Source-type tags used in these notes (separate from the synthesis's canonical claim labels):

- **[LAW]** — enacted legal text. Applicability depends on role, activity, people, data, location, and effective law.
- **[STANDARD]** — published normative or consensus specification within its stated scope.
- **[FRAMEWORK]** — risk, governance, or verification framework; not a certification by itself.
- **[OFFICIAL GUIDANCE]** — guidance maintained by a public body, standards project, or security project; force and maturity vary.
- **[PROJECT SPECIFICATION]** — normative requirements for an identified protocol or ecosystem, not every connector.
- **[DOCUMENTED PRACTICE]** — a named platform or project’s documented implementation.
- **[EMERGING]** — draft, concept paper, or developing work that should not be represented as final.

The canonical synthesis claim labels used below are **[Sourced fact]**, **[Inference]**, and **[Proposal]**. `Product hypothesis` is a proposal subtype stated in prose when relevant, never a combined record label. A claim label is not a source type.

Within each `SEC-*` record, **Source**, **Scope**, and **Supports** report source-grounded material; **Product implication** is an inference for this product; **Limitations** bounds what the record can establish.

All listed sources were opened directly as an official page, official repository, official standards page, or official PDF/DOI record on **2026-08-17**. Dates below are publication dates or version dates where the source states them. Mutable pages require rechecking before implementation or a public assurance claim.

### Record semantics used by the synthesis

These source notes are **evidence-source records**. A cited standard, law, contract, or approved policy may also be modeled separately as a **governing instrument** when its applicability to a claim and scope is established. Neither a source nor an instrument identifies its **accountable owner** or **approver** automatically; those are separate scoped records.

Evidence, decisions, and delivery use independent records. Evidence has orthogonal observation (`unobserved`/`observed`/`corroborated`), challenge (`undisputed`/`disputed`), freshness (`current`/`stale`), lineage (`active`/`superseded`), and epistemic (`none`/`inferred`/`assumed`) dimensions. Decisions and delivery use their own branching state systems. An **evaluation record** separately states its object, question or hypothesis, method, sample, result, and limitation. The notes below do not, by themselves, approve a product decision, establish implementation, or demonstrate an evaluation result.

## AI and agent risk management

### SEC-001 — NIST AI Risk Management Framework 1.0

- **Source:** National Institute of Standards and Technology, *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*, NIST AI 100-1, 26 January 2023. https://doi.org/10.6028/NIST.AI.100-1
- **Type:** [FRAMEWORK]
- **Access:** `direct/read` through NIST publication and AIRC HTML excerpts.
- **Scope:** Voluntary, rights-preserving, non-sector-specific AI risk management across organizations and lifecycle roles.
- **Supports:** Context-specific risk; trustworthy characteristics; Govern, Map, Measure, and Manage; documented, repeatable test/evaluation/verification/validation; go/no-go decisions and continual monitoring.
- **Product implication:** The agent needs an explicit context, risk owner, measurement evidence, and deployment decision. “Trustworthy” cannot be inferred from fluent output or one checklist.
- **Limitations:** Voluntary and non-prescriptive. NIST states that AI RMF 1.0 is being revised. It is not an agent-security control catalog or certification.

### SEC-002 — NIST Generative AI Profile

- **Source:** NIST, *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile*, NIST AI 600-1, 26 July 2024. https://doi.org/10.6028/NIST.AI.600-1
- **Type:** [FRAMEWORK]
- **Access:** `direct/read` through the official PDF search representation and NIST publication record.
- **Scope:** Voluntary companion profile for identifying and managing risks distinctive to generative AI.
- **Supports:** Mapping data sources and intended use; information security, data privacy, human-AI configuration, and value-chain risks; third-party monitoring; incident ownership, rehearsal, communication, and retrospective improvement.
- **Product implication:** Provider, model, adapter, connector, and data-source changes are third-party/lifecycle risks. Incident preparation and evaluation belong before deployment.
- **Limitations:** A profile of suggested actions, not a mandatory control baseline or assurance that a particular implementation is safe.

### SEC-003 — OWASP Top 10 for Agentic Applications 2026

- **Source:** OWASP GenAI Security Project, *OWASP Top 10 for Agentic Applications for 2026*, published 9 December 2025. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
- **Type:** [FRAMEWORK]
- **Access:** `direct/read` of the official landing page and the official downloadable document’s indexed text.
- **Scope:** Awareness taxonomy for autonomous and agentic applications.
- **Supports:** ASI01 Agent Goal Hijack; ASI02 Tool Misuse and Exploitation; ASI03 Identity and Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution; ASI06 Memory and Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents.
- **Product implication:** The threat model must cover authority, tools, identity, executable dependencies, persistent context, delegation, failure propagation, approval manipulation, and containment—not only prompt injection.
- **Limitations:** A prioritized risk taxonomy, not a complete security architecture, legal standard, conformance scheme, or proof of risk treatment.

### SEC-004 — OWASP LLM01:2025 Prompt Injection

- **Source:** OWASP GenAI Security Project, *LLM01:2025 Prompt Injection*. https://genai.owasp.org/llmrisk/llm01-prompt-injection/
- **Type:** [OFFICIAL GUIDANCE]
- **Access:** `direct/read`.
- **Scope:** LLM applications receiving direct prompts or indirect inputs including external files, websites, images, and retrieved content.
- **Supports:** Prompt injection may be direct, indirect, imperceptible, multimodal, encoded, or split across inputs. RAG and fine-tuning do not fully mitigate it; foolproof prevention is unclear. Mitigations include bounded behavior, deterministic output formats, least privilege, human approval, separation of untrusted content, and adversarial testing.
- **Product implication:** Every repository and connector is an indirect-injection surface. Detection or prompt wording cannot be the authorization boundary.
- **Limitations:** Guidance and examples evolve. It does not specify one sufficient detector or guarantee that the listed mitigations stop all attacks.

### SEC-005 — OWASP LLM02:2025 Sensitive Information Disclosure

- **Source:** OWASP GenAI Security Project, *LLM02:2025 Sensitive Information Disclosure*. https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/
- **Type:** [OFFICIAL GUIDANCE]
- **Access:** `direct/read`.
- **Scope:** Sensitive information in the LLM, application context, data sources, and output.
- **Supports:** Risk categories include personal, financial, health, confidential business, credential, legal, model, and source information. Suggested mitigations include minimization/sanitization, access controls, restricted data sources, clear retention/use/deletion policies, and transparency.
- **Product implication:** “It was already in the repo” does not authorize sending it to a model. Source access, model egress, storage, and output disclosure are separate decisions.
- **Limitations:** Some advanced mitigations are context-dependent and not substitutes for data governance or legal analysis. System-prompt restrictions may be bypassed.

### SEC-006 — OWASP LLM05:2025 Improper Output Handling

- **Source:** OWASP GenAI Security Project, *LLM05:2025 Improper Output Handling*. https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/
- **Type:** [OFFICIAL GUIDANCE]
- **Access:** `direct/read`.
- **Scope:** Passing LLM-generated material to downstream components and interpreters.
- **Supports:** Model output can lead to XSS, CSRF, SSRF, privilege escalation, path traversal, or remote code execution if it is not validated and encoded for its sink. OWASP recommends treating the model as an untrusted user.
- **Product implication:** A patch, path, command, URL, query, template, Markdown fragment, or connector argument must be typed and independently validated before use.
- **Limitations:** General secure-output principles; each target format and platform still needs its own parser, encoder, and tests.

### SEC-007 — OWASP LLM06:2025 Excessive Agency

- **Source:** OWASP GenAI Security Project, *LLM06:2025 Excessive Agency*. https://genai.owasp.org/llmrisk/llm062025-excessive-agency/
- **Type:** [OFFICIAL GUIDANCE]
- **Access:** `direct/read`.
- **Scope:** LLM systems with tools, plugins, skills, extensions, repeated calls, and downstream system access.
- **Supports:** Root causes are excessive functionality, permissions, or autonomy. Guidance includes minimizing extensions/functions/permissions, user-context execution, granular tools rather than open-ended shell or URL tools, user approval, downstream authorization, monitoring, and rate limits.
- **Product implication:** Read and write capability phases need different tool construction and credentials. An operating-mode label does not grant capability, and the model cannot grant itself permission or approve a consequential action.
- **Limitations:** Risk guidance, not a complete identity system, permission model, or human-factors specification.

### SEC-008 — OWASP Artificial Intelligence Security Verification Standard 1.0

- **Source:** OWASP, *Artificial Intelligence Security Verification Standard (AISVS)*, stable version 1.0 listed on the official repository when accessed. https://github.com/OWASP/AISVS
- **Type:** [FRAMEWORK]
- **Access:** `direct/read` of official repository overview and version structure.
- **Scope:** Testable security requirements for AI-enabled systems, including input, lifecycle, access control, supply chain, output, memory, orchestration, MCP, adversarial robustness, and monitoring.
- **Supports:** Version-qualified control references; risk-based verification levels; separation between technical verification, governance, and risk-management frameworks.
- **Product implication:** Use versioned, testable requirements and evidence rather than asserting “OWASP compliance” from Top 10 coverage.
- **Limitations:** Community-driven technical verification standard. The repository itself says AISVS is not a governance or risk-management framework. Requirements and identifiers can change between versions.

## Identity, authorization, connectors, and trust

### SEC-009 — NIST least privilege

- **Source:** NIST Computer Security Resource Center, *least privilege* glossary entry, drawing from NIST SP 800-53 Rev. 5 and related sources. https://csrc.nist.gov/glossary/term/least_privilege
- **Type:** [OFFICIAL GUIDANCE]
- **Access:** `direct/read`.
- **Scope:** General security architecture; users and processes acting on their behalf.
- **Supports:** Grant the minimum resources and authorizations required to perform the assigned function.
- **Product implication:** Each mode, tool, connector, actor, target, field, and operation needs the minimum capability; an omnibus `full access` connector is contrary to the principle.
- **Limitations:** Definition, not an implementation or assessment procedure. The product must select and enforce concrete controls.

### SEC-010 — NIST SP 800-53 Revision 5 controls

- **Source:** NIST, *Security and Privacy Controls for Information Systems and Organizations*, SP 800-53 Rev. 5; official derivative database listed as current version 5.1 at access. https://csrc.nist.gov/Projects/risk-management/sp800-53-controls/downloads
- **Type:** [FRAMEWORK]
- **Access:** `direct/read` of official publication/database page and control references.
- **Scope:** Broad catalog of security and privacy controls, primarily for US federal systems but widely used as a reference.
- **Supports:** Access control and least privilege, separation of duties, audit/accountability, identification/authentication, configuration, incident response, system integrity, privacy, and supply-chain control families.
- **Product implication:** The security specification should map concrete controls and evidence to a chosen deployment profile rather than copy an entire catalog into `CONTENT.md`.
- **Limitations:** Requires tailoring. Presence of a mapping does not establish that a control is implemented or effective.

### SEC-011 — NIST Zero Trust Architecture

- **Source:** NIST, *Zero Trust Architecture*, SP 800-207, August 2020. https://csrc.nist.gov/pubs/sp/800/207/final
- **Type:** [FRAMEWORK]
- **Access:** `direct/read` of official publication record and abstract.
- **Scope:** Enterprise resource protection and access architecture.
- **Supports:** No implicit trust based solely on network location or asset ownership; authenticate and authorize subjects and devices before resource access; focus controls on resources.
- **Product implication:** Local files, localhost services, organization accounts, installed connectors, and “trusted” repositories still require resource- and operation-specific authorization.
- **Limitations:** Enterprise zero-trust architecture, not an agent-specific authorization protocol or direct prescription for a local CLI.

### SEC-012 — NIST concept paper on software-agent identity and authority

- **Source:** NIST NCCoE, *New Concept Paper on Identity and Authority of Software Agents*, released 5 February 2026. https://www.nist.gov/news-events/news/2026/02/new-concept-paper-identity-and-authority-software-agents
- **Type:** [EMERGING]
- **Access:** `direct/read` of NIST announcement and concept scope.
- **Scope:** Potential NCCoE project applying identity standards and practices to software and AI agents.
- **Supports:** Agent access to diverse data, tools, and applications creates identification/authorization risk; the concept asks about identification, authorization, auditing, non-repudiation, and prompt-injection controls.
- **Product implication:** Agent/workload identity, delegated authority, and audit should be explicit first-class design concerns.
- **Limitations:** Concept paper and call for feedback, not a final NIST standard, reference architecture, or required control set.

### SEC-013 — MCP Authorization, 2026-07-28

- **Source:** Model Context Protocol, *Authorization*, protocol version 2026-07-28. https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization
- **Release record:** Model Context Protocol, *The 2026-07-28 Specification*, published 28 July 2026. https://blog.modelcontextprotocol.io/posts/2026-07-28/
- **Type:** [PROJECT SPECIFICATION]
- **Access:** `direct/read`.
- **Scope:** Authorization for HTTP-based MCP transports; it does not automatically cover every local or alternate transport.
- **Supports:** Protected-resource and authorization metadata discovery; resource indicators; intended-audience validation; bearer-token handling; HTTPS; PKCE; exact redirects; authorization-response issuer validation under RFC 9207 rules; issuer-bound credentials; runtime insufficient-scope challenges and step-up authorization; prohibition on accepting or transiting unrelated tokens; preference for Client ID Metadata Documents with Dynamic Client Registration deprecated and retained for compatibility.
- **Product implication:** MCP connectors need declared protocol-era conformance, resource/audience and issuer binding, granular scope challenges, safe token storage, no token passthrough, and an explicit migration path away from DCR.
- **Limitations:** Authorization is optional in MCP overall, applies to specific transports, and builds partly on OAuth 2.1 and CIMD draft work. Protocol conformance does not secure tool semantics or a malicious server by itself. Version 2026-07-28 contains breaking core changes; 2025-11-25 remains compatibility evidence only and must be tested as a separate protocol era if supported.

### SEC-014 — MCP Security Best Practices, 2026-07-28

- **Source:** Model Context Protocol, *Security Best Practices*, documentation version 2026-07-28. https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices
- **Type:** [OFFICIAL GUIDANCE]
- **Access:** `direct/read`.
- **Scope:** MCP clients, servers, proxy authorization, local MCP servers, URLs, sessions, and scopes.
- **Supports:** Confused-deputy defenses and per-client consent; token-passthrough prohibition; SSRF defenses; authorization-state protection; mix-up-attack defenses; CIMD trust policies; risks of local server execution; exact-command consent; sandboxing; URL-scheme and shell-opening controls; progressive scope minimization.
- **Product implication:** A connector-rich content agent must treat local servers as executable supply-chain components, remote metadata as untrusted, and scopes as operation-specific. One-click setup cannot obscure commands or privileges.
- **Limitations:** MCP-specific implementation guidance rather than a complete application threat model. Its applicability varies by transport and authorization architecture; versioned behavior must be rechecked before implementation.

### SEC-015 — OAuth 2.0 Security Best Current Practice

- **Source:** IETF, *Best Current Practice for OAuth 2.0 Security*, RFC 9700 / BCP 240, January 2025. https://www.rfc-editor.org/rfc/rfc9700.html
- **Type:** [STANDARD]
- **Access:** `direct/read`.
- **Scope:** OAuth 2.0 deployments and updated threats/mitigations; updates RFCs 6749, 6750, and 6819.
- **Supports:** Current security practice for redirect-based flows, token replay, privilege restriction, client authentication, and attacks discovered through deployment experience; deprecates insecure modes.
- **Product implication:** Connector OAuth must follow the current BCP rather than an old generic OAuth recipe.
- **Limitations:** OAuth secures authorization protocol elements, not product-level permission design, connector behavior, content approval, or data minimization.

### SEC-016 — OAuth Resource Indicators

- **Source:** IETF, *Resource Indicators for OAuth 2.0*, RFC 8707, February 2020. https://www.rfc-editor.org/rfc/rfc8707.html
- **Type:** [STANDARD]
- **Access:** `direct/read` through RFC and its normative use in the MCP specification.
- **Scope:** Identifying the protected resource for which an access token is requested.
- **Supports:** Binding authorization/token requests to an intended resource to reduce token misuse across services.
- **Product implication:** A token for one MCP server or connector resource must not be accepted for another. Use the most specific stable resource identifier the ecosystem supports.
- **Limitations:** Resource binding does not by itself constrain individual operations, fields, tenants, or content targets.

## Privacy, personal data, retention, and residency

### SEC-017 — NIST Privacy Framework

- **Source:** NIST, *Privacy Framework* project and *Using Privacy Framework 1.1*. https://www.nist.gov/privacy-framework and https://www.nist.gov/privacy-framework/using-privacy-framework-11
- **Type:** [FRAMEWORK] and [EMERGING]
- **Access:** `direct/read`.
- **Scope:** Voluntary privacy-risk management across organizations and data-processing ecosystems.
- **Supports:** Identify and govern data processing and privacy risk; current/target profiles; system and data lifecycle alignment; requirements for providers; validation before deployment and reassessment during operation.
- **Product implication:** Model providers, connector vendors, telemetry, support, and subprocessors are one data-processing ecosystem with explicit requirements and verification.
- **Limitations:** The project page displayed Privacy Framework 1.1 as an **Initial Public Draft** at the evidence cutoff. Do not call 1.1 final. The framework is not a legal basis or universal compliance standard.

### SEC-018 — NIST guide to protecting PII

- **Source:** NIST, *Guide to Protecting the Confidentiality of Personally Identifiable Information (PII)*, SP 800-122, April 2010. https://csrc.nist.gov/pubs/sp/800/122/final
- **Type:** [OFFICIAL GUIDANCE]
- **Access:** `direct/read` of official publication record and indexed official PDF.
- **Scope:** US federal-agency information systems; practical context-based PII protection.
- **Supports:** Identify PII, assess confidentiality impact by context, apply safeguards, train personnel, use retention/disposal controls, and prepare for PII incidents.
- **Product implication:** A fixed list of regexes cannot determine all personal-data sensitivity; combinations, context, volume, and harm matter.
- **Limitations:** Published in 2010 and scoped to US federal agencies. It does not replace current jurisdictional or sector-specific privacy analysis.

### SEC-019 — EU General Data Protection Regulation

- **Source:** European Union, Regulation (EU) 2016/679, official consolidated text. https://eur-lex.europa.eu/eli/reg/2016/679/oj
- **Type:** [LAW]
- **Access:** `direct/read` of official legal text.
- **Scope:** Processing of personal data where the Regulation applies; controller/processor roles and cross-border conditions are fact-specific.
- **Supports:** Article 5 principles including purpose limitation, data minimization, storage limitation, integrity/confidentiality, and accountability; Article 25 data protection by design/default; Article 28 processor obligations; Article 30 records; Articles 33–34 breach notification/communication; Chapter V international transfers.
- **Product implication:** An EU-relevant deployment needs a full data-flow, role, purpose, processor, retention, rights, transfer, security, and incident analysis—not a generic “GDPR mode.”
- **Limitations:** This note does not decide applicability, lawful basis, roles, safeguards, notification obligations, or Member State/sector overlays. Legal review is required.

### SEC-020 — OWASP Logging Cheat Sheet

- **Source:** OWASP Cheat Sheet Series, *Logging Cheat Sheet*. https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
- **Type:** [OFFICIAL GUIDANCE]
- **Access:** `direct/read`.
- **Scope:** Application and security logging design, implementation, operation, attacks, and disposal.
- **Supports:** Useful event fields and security events; exclusion/masking of tokens, passwords, keys, connection strings, source code, and sensitive personal data; sanitization; restricted log access; integrity/tamper detection; secure transport; monitoring; bounded retention and disposal.
- **Product implication:** Auditability does not justify recording whole prompts, source files, or credentials. Use metadata, hashes, protected references, and selective incident evidence.
- **Limitations:** General application guidance. Exact events, retention, access, and integrity controls depend on deployment and obligations.

### SEC-021 — OWASP Secrets Management Cheat Sheet

- **Source:** OWASP Cheat Sheet Series, *Secrets Management Cheat Sheet*. https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
- **Type:** [OFFICIAL GUIDANCE]
- **Access:** `direct/read`.
- **Scope:** Secret storage, provisioning, access, automation, auditing, lifecycle, CI/CD, detection, and incident handling.
- **Supports:** Fine-grained least privilege; dynamic/short-lived credentials; creation, rotation, revocation, expiration; metadata and auditing; avoiding plaintext logs; incident rotation and removal.
- **Product implication:** The model never needs the secret. A broker issues the smallest credential to the connector/executor and maintains lifecycle metadata outside the repository.
- **Limitations:** Technology-neutral guidance, not a credential broker implementation or product-specific key-management standard.

## Secure development and software supply chain

### SEC-022 — NIST Secure Software Development Framework 1.1

- **Source:** NIST, *Secure Software Development Framework (SSDF) Version 1.1*, SP 800-218, 3 February 2022; current SSDF publications page. https://csrc.nist.gov/Projects/ssdf/publications
- **Type:** [FRAMEWORK]
- **Access:** `direct/read` of official project/publications record.
- **Scope:** Secure software-development practices for producers and acquirers.
- **Supports:** Prepare the organization, protect software, produce well-secured software, and respond to vulnerabilities; integration through the software lifecycle.
- **Product implication:** Threat modeling, protected releases, review, vulnerability handling, and update/incident procedures must be part of product development, not post-launch additions.
- **Limitations:** NIST lists SP 800-218 Rev. 1 / SSDF 1.2 as a **draft** released 17 December 2025. This corpus uses final SSDF 1.1 as the current normative baseline and treats the draft as a change signal.

### SEC-023 — NIST SSDF Community Profile for Generative AI

- **Source:** NIST, *Secure Software Development Practices for Generative AI and Dual-Use Foundation Models: An SSDF Community Profile*, SP 800-218A, 26 July 2024. https://doi.org/10.6028/NIST.SP.800-218A
- **Type:** [FRAMEWORK]
- **Access:** `direct/read` of official publication record.
- **Scope:** AI model producers, AI-system producers using models, and acquirers; used with SSDF 1.1.
- **Supports:** AI-specific practices across the development lifecycle and value chain; secure development applies to model and system acquisition as well as in-house production.
- **Product implication:** The base model, hosted provider, embeddings, prompts/rules, adapters, and evaluation assets are supply-chain components requiring provenance and change control.
- **Limitations:** Oriented substantially to generative AI/model development and acquisition, not a full control set for repository permissions or connector writes.

### SEC-024 — SLSA 1.2

- **Source:** Supply-chain Levels for Software Artifacts, *SLSA specification*, version 1.2, status Approved. https://slsa.dev/spec/v1.2/
- **Type:** [STANDARD]
- **Access:** `direct/read`.
- **Scope:** Incremental source- and build-supply-chain security guarantees, provenance, verification, and attestations.
- **Supports:** Source and build tracks, increasing assurance levels, build provenance, artifact verification, and verification summaries.
- **Product implication:** Release provenance should let adopters verify which source and build process produced the CLI or plugin; promotion gates should verify rather than merely publish attestations.
- **Limitations:** SLSA provenance and level attainment do not prove application behavior is non-malicious, privacy-preserving, or free of vulnerabilities.

### SEC-025 — Sigstore signing and verification

- **Sources:** Sigstore, *Signing Overview* and *Verifying Signatures*. https://docs.sigstore.dev/cosign/signing/overview/ and https://docs.sigstore.dev/cosign/verifying/verify/
- **Type:** [PROJECT SPECIFICATION] and [OFFICIAL GUIDANCE]
- **Access:** `direct/read`.
- **Scope:** Identity-based/keyless signing, artifact signatures, certificates, and transparency-log verification.
- **Supports:** Associate an identity with an artifact signature; record signing events in the Rekor transparency log; verify signer identity, artifact, and transparency inclusion.
- **Product implication:** Verification policy must bind the expected repository/workflow/publisher identity, not simply accept any valid signature.
- **Limitations:** A valid signature proves a signing event under a verified identity; it does not prove code quality, safety, review, or intended permissions.

### SEC-026 — npm package provenance

- **Source:** npm, *Generating provenance statements*. https://docs.npmjs.com/generating-provenance-statements/
- **Type:** [DOCUMENTED PRACTICE]
- **Access:** `direct/read`.
- **Scope:** npm packages published through supported CI environments; exact support and CLI requirements are mutable.
- **Supports:** Provenance and publish attestations; source/build linkage; Sigstore signing and public transparency; verification through npm tooling; trusted publishing can reduce long-lived publishing tokens.
- **Product implication:** If the CLI is distributed through npm, publish with verified provenance and trusted publishing where available, then document consumer verification.
- **Limitations:** npm explicitly says provenance does not guarantee absence of malicious code. Supported platforms, versions, and private-repository constraints must be rechecked at release time.

### SEC-027 — SPDX

- **Source:** SPDX project, *Specifications*. https://spdx.dev/use/specifications/
- **Type:** [STANDARD]
- **Access:** `direct/read`.
- **Scope:** Open BOM information model and serialization formats; SPDX is also ISO/IEC 5962:2021.
- **Supports:** The project page listed SPDX 3.0 as current at access; the model covers software composition and can represent AI models, datasets, creators/suppliers, provenance, integrity, licenses, vulnerabilities, relationships, and lifecycle information.
- **Product implication:** Publish a machine-readable SBOM for the CLI, adapters, bundled binaries, and relevant AI/data assets; link it to the release.
- **Limitations:** An SBOM is an inventory and exchange format, not proof of security, license compliance, vulnerability absence, or runtime loading.

### SEC-028 — The Update Framework

- **Sources:** TUF, *Specification* and *Security*. https://theupdateframework.io/spec/ and https://theupdateframework.io/docs/security/
- **Type:** [STANDARD] and [OFFICIAL GUIDANCE]
- **Access:** `direct/read`.
- **Scope:** Secure software update systems and signed metadata roles.
- **Supports:** The project listed specification v1.0.33 as latest at access. Its threat model includes arbitrary software/package attacks, rollback, fast-forward, freeze, mix-and-match, key compromise, and download/resource attacks.
- **Product implication:** An auto-updater or rule-pack updater needs expiry, version, trusted roles/keys, rollback/freeze resistance, bounded downloads, and recovery—not only a package checksum.
- **Limitations:** Adopting the threat model or library requires careful integration. It does not define content-agent permission diffs or user-facing update consent.

### SEC-029 — OpenSSF source-control platform guidance

- **Source:** OpenSSF Best Practices Working Group, *Source Code Management Platform Configuration Best Practices*, 29 August 2023. https://best.openssf.org/SCM-BestPractices/
- **Type:** [OFFICIAL GUIDANCE]
- **Access:** `direct/read`.
- **Scope:** GitHub/GitLab organization and repository configuration.
- **Supports:** Protected default branches, required review and checks, restricted push/force-push, signed commits, code owners, limited workflow permissions, trusted actions, audit review, security alerts, and incident planning.
- **Product implication:** The agent should fit repository review controls and must not route around them through direct pushes or self-approval.
- **Limitations:** Platform-specific recommendations and examples; organizations must select applicable controls and account for other SCM hosts.

### SEC-030 — CISA secure by design and default

- **Source:** CISA and international partners, *Shifting the Balance of Cybersecurity Risk: Principles and Approaches for Security-by-Design and -Default*, 2023. https://www.cisa.gov/resources-tools/resources/secure-by-design
- **Type:** [OFFICIAL GUIDANCE]
- **Access:** `direct/read` of official resource and PDF search representation.
- **Scope:** Software manufacturers and product security responsibility.
- **Supports:** Security should be a core product requirement; products should be secure by default; manufacturers should reduce customer burden and provide capabilities such as secure logging.
- **Product implication:** Read-only, no connectors, no raw telemetry, and minimal permissions should be defaults rather than setup expertise demanded from every adopter.
- **Limitations:** High-level manufacturer guidance; it does not define the exact sandbox, authorization, or privacy architecture for this agent.

## Logging, detection, response, and recovery

### SEC-031 — NIST Cybersecurity Framework 2.0

- **Source:** NIST, *The NIST Cybersecurity Framework (CSF) 2.0*, CSWP 29, 26 February 2024. https://csrc.nist.gov/pubs/cswp/29/the-nist-cybersecurity-framework-csf-20/final
- **Type:** [FRAMEWORK]
- **Access:** `direct/read` of official publication record and official framework excerpts.
- **Scope:** Voluntary, sector- and organization-neutral cybersecurity risk outcomes.
- **Supports:** Govern, Identify, Protect, Detect, Respond, and Recover; profiles and prioritized outcomes; governance and supply-chain emphasis.
- **Product implication:** Prevention is incomplete. Monitoring, response, recovery, owner accountability, and supply-chain governance need equal design status.
- **Limitations:** High-level outcomes, not a technical implementation checklist or agent-specific threat model.

### SEC-032 — NIST incident response guidance

- **Source:** NIST, *Incident Response Recommendations and Considerations for Cybersecurity Risk Management: A CSF 2.0 Community Profile*, SP 800-61 Revision 3, April 2025. https://csrc.nist.gov/pubs/sp/800/61/r3/final
- **Type:** [FRAMEWORK]
- **Access:** `direct/read` of official publication record and NIST announcement.
- **Scope:** Integrating incident response throughout cybersecurity risk management; supersedes SP 800-61 Rev. 2.
- **Supports:** Prepare across CSF functions, reduce incident likelihood/impact, and improve detection, response, recovery, and ongoing risk management.
- **Product implication:** Token revocation, write kill switches, affected-scope queries, rollback, communications, evidence protection, and rehearsals are release requirements.
- **Limitations:** Organization-level profile; exact playbooks, severity, notification, forensics, and recovery objectives remain deployment-specific.

## Cross-source synthesis

### What the sources jointly establish

- **[Sourced fact]** External files and connector results can carry indirect prompt injection; model and retrieval techniques do not eliminate the risk (SEC-004).
- **[Sourced fact]** Excessive functionality, permissions, and autonomy raise impact; narrow tools, downstream authorization, and human approval reduce it (SEC-007, SEC-009).
- **[Sourced fact]** Model output requires downstream validation and context-specific handling (SEC-006).
- **[Sourced fact]** MCP and OAuth specify concrete audience, token, redirect, transport, and scope controls, while MCP security guidance covers malicious local servers, SSRF, token passthrough, and scope inflation (SEC-013–SEC-016).
- **[Sourced fact]** Privacy risk covers the whole processing ecosystem and lifecycle; applicable law can impose purpose, minimization, retention, processor, transfer, security, and incident obligations (SEC-017–SEC-021).
- **[Sourced fact]** Source/build provenance, signed artifacts, SBOMs, secure SCM controls, and update protection answer different supply-chain questions; none alone proves software is safe (SEC-022–SEC-030).
- **[Sourced fact]** Governance, monitoring, response, and recovery are lifecycle activities, not a final launch check (SEC-001, SEC-002, SEC-031, SEC-032).

### Product inferences and proposals

- **[Inference]** A repository must be simultaneously useful evidence and an untrusted input zone. A content contract may be enrolled as an evidence source or, where justified for a declared claim and scope, as a governing instrument. That role neither appoints an owner or approver nor grants operating-system or connector capability.
- **[Proposal]** The first executable release should be local and statically read-only. Model egress, connector reads, drafting, local writes, and remote writes are later capability phases with independent gates.
- **[Proposal]** A safe write path needs a control plane outside the model: deterministic policy, capability construction, credential brokerage, typed validation, authenticated approval, concurrency checks, audit, and readback.
- **[Proposal]** Connection consent, data processing, change approval, publication, memory, and telemetry are represented as different decisions.
- **[Proposal]** Security evidence is versioned and testable. Mapping to OWASP/NIST is useful, but the project does not claim certification or compliance without a defined scheme, scope, assessor, and evidence.

## Research limitations and refresh triggers

- This is desk research, not a penetration test, privacy impact assessment, code review, legal analysis, or connector certification.
- No executable `content.md` architecture exists yet, so no proposed control has implementation evidence.
- Sources are concentrated in NIST, OWASP, IETF, MCP, EU, CISA, and Linux Foundation ecosystems. Product launch regions and sectors require additional authorities.
- OAuth and MCP behavior, model-provider terms, package-registry features, supported CI identities, and standards versions are mutable.
- Refresh these notes before selecting a model provider, connector, authentication architecture, package registry, telemetry service, or update mechanism.
- Refresh after any material capability change, security incident, provider/subprocessor change, new data class, new jurisdiction, new autonomous action, or change to the release/update chain.
- Obtain hands-on evidence from malicious-repository fixtures, connector sandboxes, authorization traces, egress captures, package verification, approval usability, and incident drills before approving a decision, claiming a control is implemented, advancing delivery to `verified`, or recording an evaluation as passing.
