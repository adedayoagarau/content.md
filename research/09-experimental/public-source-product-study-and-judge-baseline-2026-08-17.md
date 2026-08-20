---
title: Public-source product-study and judge baseline
status: working-note
decision_state: proposed
started: 2026-08-17
updated: 2026-08-18
evidence_cutoff: 2026-08-17
post_cutoff_correction: 2026-08-18-fixture-expression-denominator-only
post_cutoff_source_supplement: public-source-material-acquisition-supplement-2026-08-18.md
study_mode: public-source-only
execution_status: source-judgment-only-no-product-run
product_ranking: prohibited
scope: Public-documentation evidence fitness for seven named content-system comparators
---

# Public-source product-study and judge baseline

## Result and evidence boundary

This working note converts the dated [public product source refresh](public-product-source-refresh-2026-08-17.md) into a source-only baseline for the [product-study and judge model](product-study-and-judge-agent-system.md). It judges the fitness of public documentation for bounded research claims about Ditto, VOICE.md, ContentRX, UX Writing Skill, Frontitude, GitCMS `CONTENT.md`, and content-md. It is **not a product ranking**.

The matrix below preserves the 17 August cutoff. A [dated 18 August acquisition supplement](public-source-material-acquisition-supplement-2026-08-18.md) adds immutable pins, publisher asset digests, operational documentation, and retained contradictions. That supplement keeps all seven packets `public-source-incomplete` and adds no product-behavior evidence.

The result is narrow:

- **[Cross-source finding]** No source packet is `public-source-ready`. The [VOICE.md packet](#voicemd--public-source-incomplete) is `public-source-incomplete`: its public tag and package version align, but the reviewed [repository](https://github.com/efeoncepro/voice.md), [`v0.1.0-alpha.3` release](https://github.com/efeoncepro/voice.md/releases/tag/v0.1.0-alpha.3), and [package manifest](https://raw.githubusercontent.com/efeoncepro/voice.md/main/package.json) do not settle the host-loading, runtime-network/data, telemetry, output-residue, or cleanup facts required by `PSF-06`.
- **[Cross-source finding]** Seven source packets are `public-source-incomplete`: [Ditto](#ditto--public-source-incomplete), [VOICE.md](#voicemd--public-source-incomplete), [ContentRX](#contentrx--public-source-incomplete), [UX Writing Skill](#ux-writing-skill--public-source-incomplete), [Frontitude](#frontitude--public-source-incomplete), [GitCMS `CONTENT.md`](#gitcms-contentmd--public-source-incomplete), and [content-md](#content-md--public-source-incomplete). Each exact packet links its direct public sources and preserves the criterion that is unresolved, contradicted, or explicitly not applicable.
- **[Cross-source finding]** No packet is `public-source-blocked`. The [source packet register](#source-packet-register) retains direct primary locators for every product, and the [claim packet register](#claim-packet-register) retains a bounded primary-job, workflow, and access/data-boundary proposition for each. This does not mean that product access, fixture execution, or cleanup is unblocked.

No product account was opened; no login, OAuth, API key, paid entitlement, installation, download, repository clone, host invocation, product task, upload, write, browser Computer Use session, or runtime observation occurred. No behavior, UX, integration, safety, privacy implementation, content quality, fixture performance, or user outcome was tested. Every capability proposition below therefore has `relation_to_tested_behavior: not-exercised`; server-side handling that cannot be inspected from public material is `not-observable`.

This note is not the proposed `PSJ-B0-001` run. It creates no schema-valid `ProductStudyEvidenceRecord`, `CriterionJudgmentRecord`, append receipt, audit-chain record, locked hash, or pairwise comparison. It does not satisfy B0's newly captured evidence requirement and cannot move the [shared benchmark fixture](shared-benchmark-fixture-specification.md) into B1. The fixture remains a design contract, not a materialized or executed benchmark.

## Claim and record convention

The canonical claim vocabulary comes from the [research protocol](../00-method/research-protocol.md#canonical-claim-and-source-vocabulary):

- **[Sourced fact]** *(vendor-documented claim)* records what a vendor or maintainer says.
- **[Sourced fact]** *(public-source observation)* records what a named public page displayed during the 17 August 2026 refresh.
- **[Cross-source finding]** records a synthesis that requires more than one named source or product packet.
- **[Inference]** records a bounded interpretation of those materials.
- **[Open question]** records evidence that the reviewed public set does not settle.

Those labels remain separate from source type, access mode, and evidence basis. Public documentation may directly support a documentation claim without verifying the product behavior it describes. An omitted fact is `unknown`, not evidence that a feature or control does not exist.

The packet tables below are **record-style seeds**, not emitted interchange records. They preserve the fields needed to materialize the judge model's Source, Claim, Evidence, and Judgment records, while refusing to invent missing capture hashes, timestamps, run IDs, receipts, or locks.

## Source-only rubric `PSF-r1`

### Criteria

**[Proposal]** Each criterion uses the judge model's hard-plane statuses: `pass`, `fail`, `unknown`, or `not_applicable`. There is no numeric score, weighting, total, or tie-breaker.

| Criterion | Source-only pass condition | `fail` or `unknown` condition | Prohibited interpretation |
| --- | --- | --- | --- |
| `PSF-01` Freshness, access mode, and provenance | Current primary origin, publisher or maintainer, public access mode, cutoff, and material limitation are explicit | Origin is indirect, material is inaccessible, or currency/provenance cannot be bounded | The product itself is current, secure, or supported |
| `PSF-02` Claim completeness | Direct sources support the three B0-style claims: primary job; repository/agent/code/design workflow; and access/install/data boundary, with conflicts and limitations retained | One required claim lacks direct support or material counterevidence is omitted | The documented workflow works |
| `PSF-03` Versionability | The evaluated artifact or documentation surface can be frozen to an immutable tag/revision or one internally coherent visible version | Versions conflict, a required surface has no pin, or rolling SaaS and clients cannot be reconciled | A visible version equals the executed version |
| `PSF-04` Task and fixture compatibility | At least one exact proposed Stage 3, Stage 5, or Stage 6 task is inside the source-declared target/unit/audience and can be mapped without invented behavior; declared noncoverage of other task areas does not by itself prevent `pass` | `fail` only when a direct source excludes the exact study task, target unit, or audience and no in-scope fixture mapping remains; `unknown` only when the reviewed sources establish neither inclusion nor exclusion without guessing | Benchmark compatibility or task success |
| `PSF-05` Inspectability | Relevant format, package, command, source boundary, or output contract is publicly inspectable enough to define a future observation | A consequential component remains opaque or only marketing-level | Runtime, algorithm, or output quality |
| `PSF-06` Access-gap accounting | For the exact proposed observation, every required account, plan, credential, host-loading, network/data, retention, export, output-residue, and cleanup condition is stated, or explicitly `not_applicable` with a scope rationale | `fail` only when a direct source establishes that required access is unavailable inside the declared study boundary; `unknown` when any required operational fact remains conflicting or unspecified; `not_applicable` only when another criterion excludes product observation from this study scope | Access is authorized or safe |

### Deterministic dispositions

| Disposition | Exact rule | What it authorizes |
| --- | --- | --- |
| `public-source-ready` | All applicable `PSF-01`–`PSF-06` results are `pass`; a `not_applicable` result has an explicit scope rationale | Freezing a source-only claim packet after capture/hash controls are added |
| `public-source-incomplete` | At least one criterion is `fail` or `unknown`, but direct primary material supports a bounded claim packet and a named acquisition action | Gap-directed research only |
| `public-source-blocked` | Direct public material is inaccessible or too incomplete to support the three required source-only claim classes without guessing | Nothing beyond recording the block |

`public-source-ready` is not `HG-01`–`HG-04: pass`, B0 eligibility, B1 entry, tested compatibility, implementation readiness, or purchase guidance. A `fail` here is a failure of the stated source-only pass condition, not a finding that the product is defective.

## Typed packet seeds

### Source packet register

Every row is `source_type: vendor_documentation`, `evidence_basis: direct_material`, `evidentiary_role: direct_support`, and `accessed_on: 2026-08-17`. A later formal record must split distinct URLs into distinct `ProductStudySourceRecord`s and add the exact access timestamp and content hash. The public data classification belongs on the later Evidence record, not on the Source record.

| Source family ID | Product | Material and access mode | Current primary locators | Version/date scope | Material limitation |
| --- | --- | --- | --- | --- | --- |
| `SRC-PSF-DITTO` | Ditto | Web pages, repository; `direct_full_text` | [Developer introduction](https://developer.dittowords.com/introduction), [agent setup](https://developer.dittowords.com/agent-setup-package/overview), [setup repository](https://github.com/dittowords/ditto-agent-setup), [Specs overview](https://developer.dittowords.com/ditto-specs-cli-reference/overview), [changelog](https://developer.dittowords.com/feedback-support/changelog) | API update 17 Aug 2026; CLI `5.7.1` 13 Aug; Specs alpha; setup repository `main` | Product, CLI, MCP, Specs, and setup package do not expose one coherent immutable version |
| `SRC-PSF-VOICE` | VOICE.md | Repository, release, configuration; `direct_artifact_inspection` | [Maintainer repository](https://github.com/efeoncepro/voice.md), [`v0.1.0-alpha.3` release](https://github.com/efeoncepro/voice.md/releases/tag/v0.1.0-alpha.3), [package manifest](https://raw.githubusercontent.com/efeoncepro/voice.md/main/package.json) | Release and manifest both show `0.1.0-alpha.3`; alpha | Host discovery, offline execution, telemetry, cleanup, and the claimed enforcement percentage remain unverified |
| `SRC-PSF-CRX` | ContentRX | Marketplace and package pages; `direct_full_text` | [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ContentRX.contentrx), [CLI](https://pypi.org/project/contentrx-cli/), [LSP](https://pypi.org/project/contentrx-lsp/), [MCP](https://pypi.org/project/contentrx-mcp/) | CLI `0.4.2`; LSP `0.1.0`; MCP `0.7.0`; extension version not exposed | Independent versions, conflicting quota statements, and no public compatibility matrix |
| `SRC-PSF-UXWS` | UX Writing Skill | Repository and raw documents; `direct_artifact_inspection` | [Maintainer repository](https://github.com/content-designer/ux-writing-skill), [changelog](https://raw.githubusercontent.com/content-designer/ux-writing-skill/main/CHANGELOG.md), [releases](https://github.com/content-designer/ux-writing-skill/releases), [`SKILL.md`](https://raw.githubusercontent.com/content-designer/ux-writing-skill/main/SKILL.md) | README/changelog `1.6.0`; Releases marks `v1.5.0` latest | Version channels conflict; host invocation and install/uninstall residue were not observed |
| `SRC-PSF-FRONT` | Frontitude | Product and developer pages; `direct_full_text` | [Product site](https://www.frontitude.com/), [product updates](https://www.frontitude.com/product-updates), [quick start](https://developer.frontitude.com/quick-start), [CLI commands](https://developer.frontitude.com/deverloper-cli/commands), [JSON export](https://www.frontitude.com/guides/export-project-content-as-json) | Product update 30 Jul 2026; CLI `1.5.0`; several developer pages report older update ages | Hosted product, plugins, CLI, AI, and plan surfaces do not share one version or entitlement statement |
| `SRC-PSF-GITCMS` | GitCMS `CONTENT.md` | Product documentation and policy pages; `direct_full_text` | [`CONTENT.md` documentation](https://gitcms.dev/docs/ai-mcp/content-instructions/), [AI/MCP overview](https://gitcms.dev/docs/ai-mcp/ai-overview/), [CLI onboarding](https://gitcms.dev/docs/getting-started/cli-onboarding/), [changelog](https://gitcms.dev/changelog/), [privacy policy](https://gitcms.dev/privacy/) | GitCMS `1.3.0` dated 4 Jun 2026; onboarding CLI and MCP unpinned | Hosted workflow is documented, but component versions and full metadata/export/rollback boundaries are unresolved |
| `SRC-PSF-CMD` | content-md | Specification, repository, release, policy; `direct_artifact_inspection` | [Specification site](https://contentmd.org/), [format reference](https://contentmd.org/specification/), [CLI reference](https://contentmd.org/cli/), [repository](https://github.com/OneOffTech/contentmd), [`v0.1.0` release](https://github.com/OneOffTech/contentmd/releases/tag/v0.1.0) | General specification is Draft and unnumbered; CLI `0.1.0` | The format targets individual web resources and explicitly does not target coding agents; general-spec pin is missing |

### Claim packet register

These are the 21 B0-style claim seeds: one primary-job claim (`JOB`), one workflow claim (`FLOW`), and one access/data-boundary claim (`BOUND`) per product. `supporting_evidence_refs` remains unmaterialized because this note has no formal Evidence records.

| Claim seed IDs | Product | Canonical label | Source-supported propositions | Source refs | Relation to tested behavior |
| --- | --- | --- | --- | --- | --- |
| `CL-DITTO-JOB`, `CL-DITTO-FLOW`, `CL-DITTO-BOUND` | Ditto | `sourced_fact` | Manages product text; documents MCP/agent/Specs/CLI and repository-local spec files; documented workspace paths require account/API access and credentials | `SRC-PSF-DITTO` | `not-exercised` |
| `CL-VOICE-JOB`, `CL-VOICE-FLOW`, `CL-VOICE-BOUND` | VOICE.md | `sourced_fact` | Defines a structured voice artifact; documents lint/diff/export/spec commands; public package sources name no hosted account for the base workflow | `SRC-PSF-VOICE` | `not-exercised` |
| `CL-CRX-JOB`, `CL-CRX-FLOW`, `CL-CRX-BOUND` | ContentRX | `sourced_fact` | Evaluates selected UI copy; documents editor, CLI, LSP, and MCP clients; hosted API use requires a key and transmits selected strings | `SRC-PSF-CRX` | `not-exercised` |
| `CL-UXWS-JOB`, `CL-UXWS-FLOW`, `CL-UXWS-BOUND` | UX Writing Skill | `sourced_fact` | Packages general UX-writing guidance; documents Skills CLI installation and optional Figma MCP guidance; base package names no proprietary account while the optional connector does | `SRC-PSF-UXWS` | `not-exercised` |
| `CL-FRONT-JOB`, `CL-FRONT-FLOW`, `CL-FRONT-BOUND` | Frontitude | `sourced_fact` | Documents hosted content operations across design, localization, review, handoff, and AI assistance; documents CLI/export/plugin flows; workspace/account and plan-dependent access apply | `SRC-PSF-FRONT` | `not-exercised` |
| `CL-GITCMS-JOB`, `CL-GITCMS-FLOW`, `CL-GITCMS-BOUND` | GitCMS `CONTENT.md` | `sourced_fact` | Defines site-wide editorial instructions; documents onboarding, repository commits, task/review, and MCP write flows; account, connected repository/site, license, and client-specific authorization apply | `SRC-PSF-GITCMS` | `not-exercised` |
| `CL-CMD-JOB`, `CL-CMD-FLOW`, `CL-CMD-BOUND` | content-md | `sourced_fact` | Defines a draft representation for one web resource; documents browse, validate with optional saved JSON report, and Skill conversion; public CLI use needs no named account but fetches URLs and can write local outputs | `SRC-PSF-CMD` | `not-exercised` |

### Evidence packet disposition

| Evidence-record field | Disposition in this baseline | Reason |
| --- | --- | --- |
| `study_id`, `run_id`, `task_id`, `condition_id` | Not emitted | No preregistered judge-system run occurred |
| `evidence_kind` | Not emitted | Ordinary public-source review is not a desktop observation, capture, deterministic result, effect, or cleanup record |
| Content hash and immutable locator | Missing | The source refresh did not retain judge-system capture hashes or append receipts |
| Five evidence dimensions | Retained narratively only | Public sources are current to the cutoff, but no locked Evidence records exist |
| Behavior relation | `not-exercised` | No documented capability was run |
| Server/privacy implementation relation | `not-observable` where applicable | Policy text is a vendor claim, not an implementation observation |

Creating a formal Evidence record from these notes by filling unknown identifiers or hashes would violate `HG-03 Evidence integrity`. The correct next action is a separately authorized, preregistered capture, not retrospective record fabrication.

## Source-only judgment matrix

These are working `CriterionJudgment`-style dispositions under `PSF-r1`; they are not locked `CriterionJudgmentRecord`s and do not satisfy `HG-01`–`HG-04`.

| Candidate source packet | `PSF-01` | `PSF-02` | `PSF-03` | `PSF-04` | `PSF-05` | `PSF-06` | Deterministic disposition |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Ditto | pass | pass | unknown | pass | unknown | unknown | `public-source-incomplete` |
| VOICE.md | pass | pass | pass | pass | pass | unknown | `public-source-incomplete` |
| ContentRX | pass | pass | unknown | pass | unknown | unknown | `public-source-incomplete` |
| UX Writing Skill | pass | pass | fail | pass | pass | unknown | `public-source-incomplete` |
| Frontitude | pass | pass | unknown | pass | unknown | unknown | `public-source-incomplete` |
| GitCMS `CONTENT.md` | pass | pass | unknown | pass | unknown | unknown | `public-source-incomplete` |
| content-md | pass | pass | unknown | fail | pass | not_applicable | `public-source-incomplete` |

The rows are deliberately non-aggregated. A `pass` for `PSF-04` means only that at least one exact proposed task is inside the source-declared target and supports a bounded mapping; declared noncoverage of other task areas remains visible but does not itself fail the criterion. For content-md, `PSF-04: fail` is mutually exclusive: its [homepage](https://contentmd.org/) excludes coding agents from the format's target, so no candidate-execution mapping remains inside this repository-native fixture. It is still useful naming and interoperability evidence outside that product-observation condition.

VOICE.md and the UX Writing Skill receive `PSF-06: unknown`, not `pass`: public retrieval and inspectable source do not settle the host-loading, runtime-network/data, output-residue, telemetry, and cleanup facts needed for their proposed observations. The UX Writing Skill's optional Figma connection remains outside the base-skill condition and unresolved for any connected condition. content-md receives `PSF-06: not_applicable` because `PSF-04` excludes product observation from this repository-native study; a separately chartered web-resource study must evaluate its access and cleanup boundary afresh.

## Candidate judgment packets

### Ditto — `public-source-incomplete`

- **[Sourced fact]** *(vendor-documented claim)* Ditto documents strings, keys, interpolation, plurals, localization, formats, an MCP server, agent commands, Specs files, and API/CLI workflows ([developer introduction](https://developer.dittowords.com/introduction), [agent setup](https://developer.dittowords.com/agent-setup-package/overview)).
- **[Sourced fact]** *(public-source observation)* The current pages expose CLI `5.7.1`, a separately mutable setup repository, an alpha Specs surface, account authentication, and both read and mutation operations ([changelog](https://developer.dittowords.com/feedback-support/changelog), [setup repository](https://github.com/dittowords/ditto-agent-setup), [Specs overview](https://developer.dittowords.com/ditto-specs-cli-reference/overview), [CLI authentication](https://developer.dittowords.com/cli-reference/authentication)).
- **[Inference]** The documentation can support a bounded future Stage 3 discovery and Stage 5 constraint-mapping plan, but the package/MCP/Specs/product versions and hosted operational boundary cannot yet be frozen as one source packet.
- **[Open question]** Exact MCP and package revisions, plan entitlements, complete export, retention, workspace/account deletion, telemetry, and uninstall residue remain unresolved.
- **Abstain:** discovery recall, spec enforcement, host loading, write safety, export completeness, privacy implementation, content quality, and all fixture outcomes.

### VOICE.md — `public-source-incomplete`

- **[Sourced fact]** *(vendor-documented claim)* The project defines a hybrid YAML/Markdown voice artifact covering voice, lexicon, audiences, surfaces, tones, formatting, components, and UX-writing rules ([repository](https://github.com/efeoncepro/voice.md)).
- **[Sourced fact]** *(public-source observation)* The tagged release and package manifest both expose `0.1.0-alpha.3`; public materials document lint, string lint, diff, prompt/ESLint/JSON export, and spec commands ([release](https://github.com/efeoncepro/voice.md/releases/tag/v0.1.0-alpha.3), [package manifest](https://raw.githubusercontent.com/efeoncepro/voice.md/main/package.json)).
- **[Inference]** Those sources support a bounded candidate packet for structured voice-rule and deterministic-checking claims, but the packet is not source-ready until the `PSF-06` operational gaps are resolved. The potential fixture envelope is narrow: parts of Stage 5 and string-level checks, not whole-product inventory, IA, authority, release, or outcome evaluation.
- **[Open question]** Host-native discovery, actual offline and runtime-network/data behavior, telemetry, generated-output residue, uninstall/cleanup, alpha migration, and the release's enforcement-percentage denominator remain unresolved.
- **Abstain:** installation success, host invocation, lint correctness, enforcement coverage, content quality, and all fixture outcomes.

### ContentRX — `public-source-incomplete`

- **[Sourced fact]** *(vendor-documented claim)* ContentRX documents diagnostics for selected JSX/TSX/JS/TS copy locations and API-backed CLI, LSP, MCP, and editor paths ([Marketplace listing](https://marketplace.visualstudio.com/items?itemName=ContentRX.contentrx), [LSP package](https://pypi.org/project/contentrx-lsp/)).
- **[Sourced fact]** *(public-source observation)* The visible packages have independent versions; the extension version was not exposed, every documented client needs an API key, and the CLI and MCP pages state conflicting free-tier quotas ([CLI package](https://pypi.org/project/contentrx-cli/), [MCP package](https://pypi.org/project/contentrx-mcp/)).
- **[Inference]** Public material supports a bounded extraction/evaluation source claim, but not one coherent versioned product packet or inspectable standards/backend contract.
- **[Open question]** Extension revision, API/schema compatibility, supported self-hosting, request and override retention, export, revocation, account deletion, telemetry, and uninstall residue remain unresolved.
- **Abstain:** extraction coverage, diagnostic accuracy, quota behavior, API retention, suggestion quality, and all fixture outcomes.

### UX Writing Skill — `public-source-incomplete`

- **[Sourced fact]** *(vendor-documented claim)* The repository packages `SKILL.md`, references, templates, accessibility guidance, voice/tone material, examples, and a Skills CLI installation path ([repository](https://github.com/content-designer/ux-writing-skill), [`SKILL.md`](https://raw.githubusercontent.com/content-designer/ux-writing-skill/main/SKILL.md)).
- **[Sourced fact]** *(public-source observation)* README/changelog identify `1.6.0`, while GitHub Releases marks `v1.5.0` as latest ([changelog](https://raw.githubusercontent.com/content-designer/ux-writing-skill/main/CHANGELOG.md), [releases](https://github.com/content-designer/ux-writing-skill/releases)).
- **[Inference]** Its inspectable guidance can support a bounded Stage 5 practice baseline, but the unresolved version channel prevents an immutable source packet until a commit or archive is selected.
- **[Open question]** Exact installed revision, generated-file manifest, base-host activation, runtime-network/data behavior, telemetry, uninstall/cleanup, and optional Figma scope/revocation remain unresolved.
- **Abstain:** host invocation, model behavior, guidance effectiveness, Figma access, content quality, and all fixture outcomes.

### Frontitude — `public-source-incomplete`

- **[Sourced fact]** *(vendor-documented claim)* Frontitude documents a hosted content-operations system spanning design plugins, copy library, localization, review, exports, CLI, webhooks, and AI-assisted writing ([product site](https://www.frontitude.com/), [JSON export](https://www.frontitude.com/guides/export-project-content-as-json)).
- **[Sourced fact]** *(public-source observation)* CLI `1.5.0` is visible, but SaaS, plugin, AI, export, and entitlement surfaces are rolling or separately dated; public pages give different plan clues for different surfaces ([product updates](https://www.frontitude.com/product-updates), [quick start](https://developer.frontitude.com/quick-start), [Dev Mode guide](https://www.frontitude.com/guides/using-figma-dev-mode-plugin)).
- **[Inference]** The pages support a bounded design/localization/content-operations mapping, but not an internally coherent version/plan packet or full operational-inspectability claim.
- **[Open question]** Exact workspace plan, plugin and SaaS revisions, export completeness, retention/deletion, token revocation, plugin residue, webhook-secret cleanup, AI provider routing, and self-hosting remain unresolved.
- **Abstain:** synchronization, plugin behavior, AI quality, export completeness, privacy implementation, and all fixture outcomes.

### GitCMS `CONTENT.md` — `public-source-incomplete`

- **[Sourced fact]** *(vendor-documented claim)* GitCMS defines `CONTENT.md` as site-wide editorial guidance and documents onboarding, repository-backed saves, tasks/reviews, and MCP read/write operations ([`CONTENT.md` documentation](https://gitcms.dev/docs/ai-mcp/content-instructions/), [AI/MCP overview](https://gitcms.dev/docs/ai-mcp/ai-overview/)).
- **[Sourced fact]** *(public-source observation)* GitCMS `1.3.0` is dated, but the onboarding CLI and MCP service do not expose one shared version in the reviewed pages; AI/MCP use also requires an account, connected site/repository, and license ([changelog](https://gitcms.dev/changelog/), [CLI onboarding](https://gitcms.dev/docs/getting-started/cli-onboarding/), [terms](https://gitcms.dev/terms/)).
- **[Inference]** The public corpus supports a bounded filename and Markdown-editorial precedent. It does not establish a whole-product content-decision graph or a coherent executable version set.
- **[Open question]** CLI/MCP revisions, full task/comment/review export, one-command uninstall, cleanup verification, and rollback for every MCP write remain unresolved.
- **Abstain:** agent loading, save/commit behavior, OAuth/PAT behavior, data handling, review quality, and all fixture outcomes.

### content-md — `public-source-incomplete`

- **[Sourced fact]** *(vendor-documented claim)* content-md defines a draft YAML-frontmatter-plus-Markdown representation for one web resource and documents browse, validate with optional saved JSON report, and Skill-conversion paths ([format reference](https://contentmd.org/specification/), [CLI reference](https://contentmd.org/cli/)). The saved report supports later comparison but is not a separate snapshot/diff command.
- **[Sourced fact]** *(public-source observation)* The general specification is Draft without a numbered version, the CLI release is `0.1.0`, and the homepage explicitly distinguishes the format from repository agent instructions and says it does not target coding agents ([specification site](https://contentmd.org/), [CLI release](https://github.com/OneOffTech/contentmd/releases/tag/v0.1.0)).
- **[Inference]** The sources are inspectable and useful for naming, content negotiation, and interoperability research, but their documented unit and audience do not match the repository-native benchmark task. The unversioned general spec also prevents a complete freeze.
- **[Open question]** General-spec snapshot/revision, CLI cache and cleanup behavior, output manifest, and requirements binding third-party implementations remain unresolved.
- **Abstain:** target-site conformance, validation accuracy, generated Skill quality, third-party privacy/security, and all fixture outcomes.

## Fixture compatibility envelope

At this baseline's 17 August cutoff, the shared fixture was not materialized and its historical target design contained 90 annotated candidates: 61 user-facing occurrences, 29 decoys, 34 expressions, and 22 semantic messages across code, resource, template, API, CMS, design, locale, accessibility, state, and channel contexts. Those were targets, not observed artifacts or results ([original proposed universe](shared-benchmark-fixture-specification.md#original-proposed-annotation-universe-for-revision-1--expression-target-falsified)).

**[Research finding]** Dated correction (18 August 2026): the later non-executable open-development pressure test falsified the 34-expression target and independently recomputed 56 normalized expression slots/versions across the same 61 occurrences and 22 semantic messages. This correction does not rewrite the 17 August product-source baseline, create an approved successor fixture, or add product-behavior evidence; see the [materialization finding](shared-benchmark-fixture-specification.md#18-august-2026-materialization-finding).

| Product | Source-documented mapping that may inform a future task | Required abstention before a run |
| --- | --- | --- |
| Ditto | Repository scan, audit, product-text, style-rule, and component-spec concepts may inform Stage 3 and Stage 5 task setup | Actual supported source classes, decoy rejection, state/channel/locale coverage, and Stage 6 output |
| VOICE.md | Structured voice/lexicon/tone rules and string lint may inform a narrow Stage 5/rule-check condition | Repository discovery, product-state/IA reconstruction, approval/authority, and Stage 6 output |
| ContentRX | Documented selected-string extraction and evaluation may inform a bounded Stage 3/source-class condition | Coverage beyond declared locations, decoys, API judgment accuracy, and strategy/hypothesis work |
| UX Writing Skill | General guidance may inform a Stage 5 reference condition | Host invocation, repository discovery, product grounding, authority, and deterministic output |
| Frontitude | Design, localization, review, export, and CLI concepts may inform cross-surface Stage 3/5 setup | Plan-specific access, exact source breadth, structural preservation, and Stage 6 output |
| GitCMS `CONTENT.md` | Site-wide editorial instructions and repository-backed Markdown workflow may inform a narrow Stage 5/file-precedent condition | Non-Markdown product strings, host-native discovery, broader content IA/governance, and Stage 6 output |
| content-md | Naming and web-resource interoperability can inform collision analysis | Candidate execution in this repository-native fixture; the public source states a different target |

No row is a compatibility certification. Only an executed, version-pinned, common fixture condition with valid evidence could produce a product compatibility result.

## Hard abstentions and nonclaims

This baseline must not be used to state or imply:

- that any product installed, loaded, invoked, authenticated, synchronized, exported, deleted, or cleaned up successfully;
- that any source class, string, state, channel, locale, accessible name, decoy, conflict, or malicious input was discovered or handled;
- that any writing, terminology, voice, tone, IA, accessibility, localization, risk, or governance judgment was correct;
- that a public privacy, retention, deletion, security, offline, local, or no-training statement was independently verified;
- that an open repository proves a runtime is inspectable, offline, safe, or free of telemetry;
- that a documented write path was authorized, safe, reversible, approved, implemented, released, or observed live;
- that a source disposition is a product capability, quality, usability, market, procurement, or build-versus-buy score.

These abstentions preserve the separation among evidence, governing instruments, ownership, approval, decision state, delivery state, evaluation, capability phase, and task authorization required by the [candidate system model](../08-synthesis/candidate-system-model.md) and [security boundary](../05-technology/security-privacy-and-trust-boundaries.md).

## Evidence acquisition gates

| Product | Minimum action to resolve source incompleteness | Still required before any product observation |
| --- | --- | --- |
| Ditto | Pin agent-package commit, CLI and Specs versions, MCP surface, documentation snapshot, and plan | Separate applicable phase results/grants, account authorization, exact scopes, isolated profile, and cleanup plan |
| VOICE.md | Capture and hash the immutable tag/package/docs; obtain an exact host-loading contract plus runtime-network/data, telemetry, output-residue, uninstall, and cleanup documentation for the proposed observation | Separately authorized install/run controls; observed host invocation, effects, and verified cleanup |
| ContentRX | Obtain exact extension version, client/API compatibility statement, quota/plan, and API origin | Authorized test key, transmitted-data decision, retention/cleanup evidence, and common fixture scope |
| UX Writing Skill | Select one immutable commit/archive, reconcile `1.6.0` versus `v1.5.0`, and obtain the base skill's host-loading, runtime-network/data, telemetry, generated-file, uninstall, and cleanup contract | Separately authorized install/run controls; observed install manifest, host invocation, effects, and verified cleanup; optional Figma authorization remains separate |
| Frontitude | Record exact SaaS date, plugin/CLI versions, workspace plan, enabled integrations, and export boundary | Authorized sandbox account, scopes/data decision, reset/export/cleanup owner |
| GitCMS `CONTENT.md` | Pin product, onboarding CLI, MCP server/client, docs snapshot, license, and site configuration | Authorized sandbox repository/account, OAuth or PAT scope, commit rollback and cleanup |
| content-md | Pin the general specification to a snapshot/commit plus CLI tag and binary hash; retain `PSF-06: not_applicable` for this repository-native study | Only a separately justified web-resource study with its own access/cleanup assessment; do not silently place it in the repository-agent fixture |

For all seven, a formal judge packet also needs immutable source captures and hashes, exact access timestamps, claim-to-evidence links, limitations, run/control identifiers, and validated append receipts. Any later comparison must follow the judge model's abstention, hard-gate, blinding, and no-total rules. Product interaction remains separately gated by the [desktop protocol](product-desktop-study-protocol.md), and benchmark execution remains blocked until every [B1 fixture entry criterion](shared-benchmark-fixture-specification.md#batch-b1-fixture-entry-criteria) passes.

## Source basis and limitations

This synthesis relies on the same-day primary-source review recorded in [public product source refresh](public-product-source-refresh-2026-08-17.md), the [research protocol](../00-method/research-protocol.md), the proposed [product-study and judge system](product-study-and-judge-agent-system.md), the design-only [shared fixture](shared-benchmark-fixture-specification.md), the [candidate system model](../08-synthesis/candidate-system-model.md), the [security/privacy boundary](../05-technology/security-privacy-and-trust-boundaries.md), and the [evaluation framework](../06-evaluation/evaluation-and-benchmarks.md).

All mutable facts have an evidence cutoff of 17 August 2026. Public pages, branches, releases, plans, and policies can change after that date. Direct source links are retained above; the refresh's limitations carry forward. This note adds a proposed source-fitness rubric and dispositions. It adds no new product observation.
