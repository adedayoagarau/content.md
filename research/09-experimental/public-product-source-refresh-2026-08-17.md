---
title: Public product source refresh for the B0 comparison set
status: working-note
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
research_mode: public-web-read-only
desktop_evidence: none
scope: Current official public-source evidence for seven products in the B0 comparison queue
---

# Public product source refresh for the B0 comparison set

## Result and evidence boundary

This is a dated source map for the seven systems in the proposed B0 queue: Ditto, VOICE.md, ContentRX, UX Writing Skill, Frontitude, GitCMS `CONTENT.md`, and content-md.

It establishes what each vendor or maintainer publicly documents as of **17 August 2026, America/Los_Angeles**. It does **not** establish that a documented capability works, that a workflow is safe, that an export is complete, or that a system performs well on the shared benchmark fixture.

No product account was opened, no login or authorization flow was entered, no package or binary was installed or downloaded, no repository was cloned, no token was created, and no product data was submitted. This was ordinary public-web research only. It produced no direct desktop-behavior evidence, must not be scored as desktop behavior, and must not be scored as a DT-01 through DT-12 result under the [product desktop study protocol](product-desktop-study-protocol.md).

### Evidence-role notation

The canonical claim vocabulary remains the one in the [research protocol](../00-method/research-protocol.md#canonical-claim-and-source-vocabulary). This snapshot keeps the canonical claim label separate from a parenthetical evidence role so three different things do not blur together:

- **[Sourced fact]** *(vendor-documented claim)* means the cited vendor or maintainer asserts the proposition. It is not independent verification.
- **[Sourced fact]** *(public-source observation)* means the named public page directly displayed a version, date, status, command, artifact, access gate, or other inspectable item during this refresh. It is still web evidence, not desktop-product behavior.
- **[Inference]** means an interpretation of those sources. It is not a vendor claim or an observed product result.
- **[Open question]** means the reviewed sources did not settle the issue. “Not found in the reviewed sources” never means the feature, policy, or control does not exist.

Mutable repository counts, marketplace metadata, pricing, plan gates, setup steps, and privacy terms can change after the evidence cutoff. Every hands-on run must pin the tested artifact and recheck the applicable terms at action time.

## Current public-source snapshot

| System | Primary current URL | Visible status, version, or date | Publicly documented distribution boundary | What this row proves |
| --- | --- | --- | --- | --- |
| Ditto | [Developer introduction](https://developer.dittowords.com/introduction) | [Changelog](https://developer.dittowords.com/feedback-support/changelog) displayed an API update dated 17 August 2026 and CLI `5.7.1` dated 13 August 2026; [Specs overview](https://developer.dittowords.com/ditto-specs-cli-reference/overview) labels Specs alpha | Hosted Ditto account/API plus local CLI/MCP/agent package and repository-local spec files | Current documented surfaces and named versions only |
| VOICE.md | [Maintainer repository](https://github.com/efeoncepro/voice.md) | [Latest release page](https://github.com/efeoncepro/voice.md/releases/tag/v0.1.0-alpha.3) displayed `v0.1.0-alpha.3` and alpha status; the visible release date was 16 May | Public repository and npm package; local Markdown specification and CLI | Maintainer-declared format, commands, and release status only |
| ContentRX | [VS Code Marketplace listing](https://marketplace.visualstudio.com/items?itemName=ContentRX.contentrx) | Separate public packages displayed CLI `0.4.2` dated 8 May 2026, LSP `0.1.0` dated 24 April 2026, and MCP `0.7.0` dated 28 April 2026 | Editor extension, Python CLI/LSP/MCP clients, hosted ContentRX API, API key, and per-check quota | Published surface metadata and declared request boundaries only |
| UX Writing Skill | [Maintainer repository](https://github.com/content-designer/ux-writing-skill) | README and changelog displayed `1.6.0`, March 2026, while GitHub Releases still labeled `v1.5.0` as latest | Public Agent Skill installed through the Skills CLI; optional host-to-Figma MCP connection | Repository contents and a version-channel inconsistency, not activation or output quality |
| Frontitude | [Product site](https://www.frontitude.com/) | Product site displayed a latest update dated 30 July 2026; [product updates](https://www.frontitude.com/product-updates) documented Developer CLI `v1.5.0` on 26 June 2026 | Hosted workspace/account plus Figma/Sketch plugins, web app, Developer CLI, exports, and webhooks | Vendor-declared current workflow and plan clues only |
| GitCMS `CONTENT.md` | [`CONTENT.md` documentation](https://gitcms.dev/docs/ai-mcp/content-instructions/) | [Changelog](https://gitcms.dev/changelog/) displayed GitCMS `v1.3.0` dated 4 June 2026 | Hosted GitCMS account and licensed site, connected Git repository, `.gitcms`, root `CONTENT.md`, onboarding CLI, and MCP | Current documented GitCMS semantics for the filename and workflow only |
| content-md | [Specification site](https://contentmd.org/) | Site displayed **Open Specification · Draft**; [CLI release](https://github.com/OneOffTech/contentmd/releases/tag/v0.1.0) displayed `v0.1.0` and 17 May | Public web specification plus downloadable cross-platform CLI and server/content-negotiation integrations | Current draft status and CLI surface only |

The dates shown without a year on a GitHub release page are recorded exactly as visible in this refresh. The surrounding 2026 source chronology supports—but does not independently prove—the implied year, so the product sections preserve the visible form and cite a separate dated source where available.

## 1. Ditto

### Current official sources

| Source | Exact URL | Directly visible in this refresh | Limitation |
| --- | --- | --- | --- |
| Developer introduction | [https://developer.dittowords.com/introduction](https://developer.dittowords.com/introduction) | Product-text positioning; API, CLI, MCP, Specs CLI, webhooks, and PR Review Bot | Vendor overview, not a tested capability inventory |
| Agent setup package | [https://developer.dittowords.com/agent-setup-package/overview](https://developer.dittowords.com/agent-setup-package/overview) | MCP, session instructions, five named skills, host setup, authentication, optional Specs setup | Documents Claude Code, Claude Desktop, and Cursor paths; no Codex setup path was visible on this page |
| Public package repository | [https://github.com/dittowords/ditto-agent-setup](https://github.com/dittowords/ditto-agent-setup) | Public repository, `main`, 58-commit history, package directories and README | Branch state and counts are mutable; no release tag was visible in the reviewed repository page |
| Specs overview | [https://developer.dittowords.com/ditto-specs-cli-reference/overview](https://developer.dittowords.com/ditto-specs-cli-reference/overview) | Alpha status, file purpose, agent/CLI/human consumers | Alpha interface may change |
| Specs agent skills | [https://developer.dittowords.com/ditto-specs-cli-reference/agent-skills](https://developer.dittowords.com/ditto-specs-cli-reference/agent-skills) | Installed slash commands, read/write distinctions, overwrite warning | Described workflows were not run |
| CLI authentication | [https://developer.dittowords.com/cli-reference/authentication](https://developer.dittowords.com/cli-reference/authentication) | Node requirement, browser login, token precedence, credential path, logout | Does not by itself settle all product retention or workspace-deletion questions |
| Changelog | [https://developer.dittowords.com/feedback-support/changelog](https://developer.dittowords.com/feedback-support/changelog) | API update on 17 August 2026; CLI `5.7.1` on 13 August; CLI `5.7.0` on 5 August | Changelog is mutable and covers multiple Ditto surfaces |

### Documented artifacts, commands, and integrations

- **[Sourced fact]** *(vendor-documented claim)* Ditto describes itself as managing product text across draft, design, and development, with strings, keys, interpolation, plurals, localization, variations, and formats such as JSON, ICU, iOS, and Android ([introduction](https://developer.dittowords.com/introduction)).
- **[Sourced fact]** *(public-source observation)* The agent setup page displayed an MCP server, always-on session instructions, `/ditto-review`, `/ditto-audit [path]`, `/ditto-spec-audit [component]`, `/ditto-spec-component <component>`, and `/ditto-spec-gaps [component]` ([agent setup](https://developer.dittowords.com/agent-setup-package/overview)).
- **[Sourced fact]** *(public-source observation)* The same page displayed repository-local artifacts `*.ditto.md`, `dittospec.config.json`, and `workspace.ditto.md`. It says `/ditto-spec-setup` can install the Specs CLI, create the config and workspace files, and scaffold component specs after confirmation ([agent setup](https://developer.dittowords.com/agent-setup-package/overview)).
- **[Sourced fact]** *(vendor-documented claim)* A `.ditto.md` file declares a component's text surfaces; agents read it, the CLI synchronizes matching platform style-guide rules into it, and humans can review the file in pull requests. The page says the file is metadata and is not imported at runtime ([Specs overview](https://developer.dittowords.com/ditto-specs-cli-reference/overview)).
- **[Sourced fact]** *(public-source observation)* `ditto-spec init --agent` is documented as installing three commands in `.claude/commands/`. The page distinguishes `/ditto-spec-audit` as read-only and `/ditto-spec-gaps` as the only listed Specs skill that writes approved rules to the Ditto platform ([Specs agent skills](https://developer.dittowords.com/ditto-specs-cli-reference/agent-skills)).
- **[Sourced fact]** *(public-source observation)* The MCP overview listed read tools and hosted mutations: get/search style rules and text, create/update/delete style-guide rules, and create/update/delete text items. It also displayed repository scoping through `ditto/config.yml` or `ditto/config.yaml` ([MCP overview](https://developer.dittowords.com/mcp-reference/overview)).

### Access, installation, account, and network boundary

- **[Sourced fact]** *(public-source observation)* The agent package documents host installation for Claude Code, Claude Desktop, and Cursor, followed by MCP approval and browser authentication to a Ditto account ([agent setup](https://developer.dittowords.com/agent-setup-package/overview)).
- **[Sourced fact]** *(public-source observation)* Optional Specs setup needs `DITTO_TOKEN`; the general CLI supports browser login from `5.7.0`, while CI or other headless use can supply an API key in `DITTO_TOKEN` ([agent setup repository](https://github.com/dittowords/ditto-agent-setup), [CLI authentication](https://developer.dittowords.com/cli-reference/authentication)).
- **[Sourced fact]** *(public-source observation)* The CLI page requires Node.js 20 or later as of CLI `5.6.0`, documents installation as `@dittowords/cli`, and stores sessions and saved keys in `$HOME/.config/ditto`. Credential precedence starts with `DITTO_TOKEN`, then saved browser session, earlier saved API key, and finally a prompt ([CLI authentication](https://developer.dittowords.com/cli-reference/authentication)).
- **[Sourced fact]** *(vendor-documented claim)* The MCP server runs locally but its listed tools fetch from and mutate a Ditto workspace. The CLI also accesses the Ditto API; therefore “runs locally” is not a claim of offline operation ([MCP overview](https://developer.dittowords.com/mcp-reference/overview), [CLI authentication](https://developer.dittowords.com/cli-reference/authentication)).
- **[Sourced fact]** *(public-source observation)* The changelog says `scan <path> --list-directories` prints candidate counts and exits without uploading, while an actual scan can upload candidates after the plan-limit check ([changelog](https://developer.dittowords.com/feedback-support/changelog)).

### Export, cleanup, and unresolved gaps

- **[Sourced fact]** *(public-source observation)* `logout` is documented as forgetting the local browser session and revoking it with Ditto. Replacing an older saved API key is documented as deleting `$HOME/.config/ditto`; `DITTO_TOKEN` must be unset or replaced separately ([CLI authentication](https://developer.dittowords.com/cli-reference/authentication)).
- **[Sourced fact]** *(public-source observation)* Re-running `npx ditto-spec init --agent` overwrites current skill templates and removes legacy skill files; customized files require a commit/merge workflow ([Specs agent skills](https://developer.dittowords.com/ditto-specs-cli-reference/agent-skills)).
- **[Sourced fact]** *(public-source observation)* Public documentation exposes delete operations for text items and style-guide rules through MCP and, in the 13 August changelog entry, a `DELETE /v2/components` API endpoint. These are object mutations, not proof of complete account/workspace cleanup ([MCP overview](https://developer.dittowords.com/mcp-reference/overview), [changelog](https://developer.dittowords.com/feedback-support/changelog)).
- **[Open question]** The reviewed pages did not establish complete workspace export, account/workspace deletion, telemetry, server-side retention after disconnect, self-hosting, entitlement by plan for every agent capability, or a verified uninstall residual-data inventory.
- **[Inference]** Ditto has the broadest documented write surface in this comparison. Its public-source lead is a reason to test it first, not a reason to treat it as safer, more complete, or higher quality.

## 2. VOICE.md

### Current official sources

| Source | Exact URL | Directly visible in this refresh | Limitation |
| --- | --- | --- | --- |
| Maintainer repository | [https://github.com/efeoncepro/voice.md](https://github.com/efeoncepro/voice.md) | Public repository; hybrid YAML/Markdown format; CLI commands; alpha status | Maintainer description, not host-conformance evidence |
| Latest release | [https://github.com/efeoncepro/voice.md/releases/tag/v0.1.0-alpha.3](https://github.com/efeoncepro/voice.md/releases/tag/v0.1.0-alpha.3) | `v0.1.0-alpha.3`, “Foundation release,” visible 16 May release date, alpha warning | GitHub page displayed day/month without a year |
| Package manifest | [https://raw.githubusercontent.com/efeoncepro/voice.md/main/package.json](https://raw.githubusercontent.com/efeoncepro/voice.md/main/package.json) | Package `@efeonce/voice.md`, version `0.1.0-alpha.3`, binaries `voice-md` and `voicemd`, Node `>=18` | `main` is mutable; this is not a registry install result |

### Documented artifacts, commands, and integrations

- **[Sourced fact]** *(vendor-documented claim)* VOICE.md defines a `VOICE.md` artifact with YAML tokens and Markdown rationale for language, personality, register, beliefs, lexicon, audiences, surfaces, tones, organizational units, formatting, components, and UX-writing rules ([repository](https://github.com/efeoncepro/voice.md)).
- **[Sourced fact]** *(public-source observation)* The repository displayed these commands: `lint`, `lint-string`, `diff`, `export`, and `spec`. It documents structured findings and a nonzero diff exit when a new version adds errors or warnings ([repository](https://github.com/efeoncepro/voice.md)).
- **[Sourced fact]** *(public-source observation)* Export targets displayed on the repository page were a prompt block, ESLint configuration, and flat JSON. The package manifest exposes `voice-md` and `voicemd` command aliases ([repository](https://github.com/efeoncepro/voice.md), [package manifest](https://raw.githubusercontent.com/efeoncepro/voice.md/main/package.json)).
- **[Sourced fact]** *(public-source observation)* The release page describes a deterministic linter, Spanish stemming, string sanitization, UX-writing rules, six named locale variants, and exporters. These are release claims; no benchmark or runtime behavior was reproduced in this refresh ([release](https://github.com/efeoncepro/voice.md/releases/tag/v0.1.0-alpha.3)).

### Access, installation, account, and network boundary

- **[Sourced fact]** *(public-source observation)* The release page documents `npm install @efeonce/voice.md` or `pnpm add @efeonce/voice.md`; the package manifest requires Node 18 or later and lists `yaml` as a runtime dependency ([release](https://github.com/efeoncepro/voice.md/releases/tag/v0.1.0-alpha.3), [package manifest](https://raw.githubusercontent.com/efeoncepro/voice.md/main/package.json)).
- **[Sourced fact]** *(public-source observation)* No hosted VOICE.md account, API key, connector authorization, or paid entitlement was named in the reviewed repository, release, or package manifest ([repository](https://github.com/efeoncepro/voice.md), [release](https://github.com/efeoncepro/voice.md/releases/tag/v0.1.0-alpha.3), [package manifest](https://raw.githubusercontent.com/efeoncepro/voice.md/main/package.json)).
- **[Inference]** Package acquisition normally crosses a package-registry network boundary, but the reviewed sources do not establish whether all linter/export commands are guaranteed offline after dependencies are present. “No account named” is not an offline certification.
- **[Inference]** The repository says an agent reads `VOICE.md` at session start. That is a product design claim, not evidence that Claude, Codex, Cursor, or another host natively discovers the file without an adapter or explicit instruction.

### Export, cleanup, and unresolved gaps

- **[Sourced fact]** *(public-source observation)* Prompt, ESLint-config, and JSON exports are explicit. Apache-2.0 licensing is explicit for the project ([repository](https://github.com/efeoncepro/voice.md)).
- **[Open question]** The reviewed sources did not document an uninstall command, generated-file manifest, cleanup verifier, telemetry policy, model-egress policy, content retention because of execution, migration guarantees across alpha schema changes, or a host-conformance matrix.
- **[Open question]** The release claims roughly 85% rule enforcement but does not expose, on the reviewed page, a reproducible corpus and denominator sufficient to verify that percentage.
- **[Inference]** VOICE.md is the closest open baseline for structured voice rules and deterministic checking. Its documented scope does not itself cover product-state discovery, content IA, source authority, approval, release state, or user-outcome evaluation.

## 3. ContentRX

### Current official sources

| Surface | Exact URL | Visible version or status | Directly visible boundary |
| --- | --- | --- | --- |
| VS Code/Cursor extension | [https://marketplace.visualstudio.com/items?itemName=ContentRX.contentrx](https://marketplace.visualstudio.com/items?itemName=ContentRX.contentrx) | Marketplace page exposed no version/date in the fetched overview | Extension launches `contentrx-lsp`; API key stored in editor SecretStorage; known JSX/TSX/JS/TS copy locations only |
| CLI | [https://pypi.org/project/contentrx-cli/](https://pypi.org/project/contentrx-cli/) | `0.4.2`, 8 May 2026; classifier `4 - Beta` | Thin HTTP client; API key; batch/CI use; `CONTENTRX_API_URL` override |
| LSP | [https://pypi.org/project/contentrx-lsp/](https://pypi.org/project/contentrx-lsp/) | `0.1.0`, 24 April 2026; classifier `4 - Beta` | Parses TSX locally, sends each extracted string to `/api/check` |
| MCP | [https://pypi.org/project/contentrx-mcp/](https://pypi.org/project/contentrx-mcp/) | `0.7.0`, 28 April 2026; classifier `4 - Beta` | Stdio MCP client backed by the public ContentRX API; API key and quota |

### Documented artifacts, commands, and integrations

- **[Sourced fact]** *(vendor-documented claim)* The extension provides inline diagnostics for JSX/TSX/JS/TS text children and allowlisted copy attributes including accessible names, labels, placeholders, titles, tooltips, and descriptions. It deliberately excludes arbitrary string literals because of false-positive risk ([Marketplace listing](https://marketplace.visualstudio.com/items?itemName=ContentRX.contentrx)).
- **[Sourced fact]** *(public-source observation)* The extension page displayed commands to set the API key, clear the stored API key, and restart the language server. Code actions call a suggestion endpoint, open standard rationale, or record a false-positive override ([Marketplace listing](https://marketplace.visualstudio.com/items?itemName=ContentRX.contentrx)).
- **[Sourced fact]** *(public-source observation)* The CLI displayed `contentrx`, `--content-type`, `--moment`, and `--batch` examples for terminal, pre-commit, and CI use. Its page says it posts strings to the ContentRX API and uses exit code 1 for violations in the example CI flow ([CLI package](https://pypi.org/project/contentrx-cli/)).
- **[Sourced fact]** *(public-source observation)* The LSP page displayed a local Tree-sitter extraction step followed by one `/api/check` request per extracted string. It lists three client surfaces sharing that API: MCP, LSP, and CLI ([LSP package](https://pypi.org/project/contentrx-lsp/)).
- **[Sourced fact]** *(public-source observation)* The MCP page displayed `evaluate_copy`, `evaluate_copy_batch`, and `classify_moment`, plus a `/review_ui_copy` prompt. It says full evaluations consume quota, batch dry-run reports prospective quota use, and `classify_moment` is quota-free but rate-limited ([MCP package](https://pypi.org/project/contentrx-mcp/)).

### Access, installation, account, and network boundary

- **[Sourced fact]** *(public-source observation)* All three published client packages require a ContentRX API key minted in the hosted dashboard. The CLI reads `CONTENTRX_API_KEY` from the environment and says it creates no global config file; the editor stores a supplied key in VS Code SecretStorage ([CLI package](https://pypi.org/project/contentrx-cli/), [Marketplace listing](https://marketplace.visualstudio.com/items?itemName=ContentRX.contentrx)).
- **[Sourced fact]** *(public-source observation)* The extension can use a preinstalled `contentrx-lsp` or fall back to `uvx contentrx-lsp`, which downloads and runs the server on demand. Published Python clients require Python 3.10 or later ([Marketplace listing](https://marketplace.visualstudio.com/items?itemName=ContentRX.contentrx), [LSP package](https://pypi.org/project/contentrx-lsp/)).
- **[Sourced fact]** *(public-source observation)* The current public package descriptions conflict on free-tier quota: CLI `0.4.2` says 10 checks per month in its scenario, while MCP `0.7.0` says Free 25, Pro 5,000, and Team 5,000 per seat. Pricing and quota are mutable; neither value should be treated as authoritative for a benchmark until checked in an authorized account ([CLI package](https://pypi.org/project/contentrx-cli/), [MCP package](https://pypi.org/project/contentrx-mcp/)).
- **[Sourced fact]** *(public-source observation)* The CLI and LSP pages expose `CONTENTRX_API_URL` overrides. The CLI calls this useful for self-hosted or test deployments, but the reviewed pages do not document how a user obtains or operates a supported self-hosted service ([CLI package](https://pypi.org/project/contentrx-cli/), [LSP package](https://pypi.org/project/contentrx-lsp/)).

### Export, cleanup, and unresolved gaps

- **[Sourced fact]** *(public-source observation)* The extension exposes `ContentRX: Clear stored API key`. The CLI says the key lives only in the environment and not in a ContentRX config file. These are credential-cleanup claims, not proof that server-side request or override data is deleted ([Marketplace listing](https://marketplace.visualstudio.com/items?itemName=ContentRX.contentrx), [CLI package](https://pypi.org/project/contentrx-cli/)).
- **[Sourced fact]** *(public-source observation)* CLI terminal output and MCP structured response schemas are documented ([CLI package](https://pypi.org/project/contentrx-cli/), [MCP package](https://pypi.org/project/contentrx-mcp/)).
- **[Open question]** No complete standards-library, override-history, account-data, or request-history export was found across the reviewed extension, CLI, LSP, and MCP pages; whether such an export exists elsewhere remains unresolved ([Marketplace listing](https://marketplace.visualstudio.com/items?itemName=ContentRX.contentrx), [CLI package](https://pypi.org/project/contentrx-cli/), [LSP package](https://pypi.org/project/contentrx-lsp/), [MCP package](https://pypi.org/project/contentrx-mcp/)).
- **[Open question]** Server-side request retention, false-positive override retention/deletion, telemetry, API-key revocation mechanics, account deletion, exact extension version/date, supported self-hosting, and residual files after extension/MCP/LSP uninstall remain unresolved.
- **[Open question]** The public channels use independent CLI, LSP, MCP, and extension versions. The reviewed pages do not identify one synchronized product version or compatibility matrix.
- **[Inference]** ContentRX is a bounded hosted-evaluation baseline, not a local-rules baseline. A valid fixture run must measure both extraction coverage and the consequences of transmitting each selected string to its API.

## 4. UX Writing Skill

### Current official sources

| Source | Exact URL | Directly visible in this refresh | Limitation |
| --- | --- | --- | --- |
| Maintainer repository | [https://github.com/content-designer/ux-writing-skill](https://github.com/content-designer/ux-writing-skill) | Public repository; status “Production-ready”; version `1.6.0`; updated March 2026 | README declaration, not independent quality proof |
| Changelog | [https://raw.githubusercontent.com/content-designer/ux-writing-skill/main/CHANGELOG.md](https://raw.githubusercontent.com/content-designer/ux-writing-skill/main/CHANGELOG.md) | `1.6.0` dated `2026-03`; `1.5.0` dated `2026-01` | `main` is mutable |
| GitHub Releases | [https://github.com/content-designer/ux-writing-skill/releases](https://github.com/content-designer/ux-writing-skill/releases) | `v1.5.0` still carried the Latest label; visible release date 17 January | Release channel conflicts with README/changelog version |
| Skill entrypoint | [https://raw.githubusercontent.com/content-designer/ux-writing-skill/main/SKILL.md](https://raw.githubusercontent.com/content-designer/ux-writing-skill/main/SKILL.md) | Skill trigger and guidance for UI copy, voice/tone, accessibility, and audits | Guidance was not invoked or evaluated here |
| Figma integration guide | [https://raw.githubusercontent.com/content-designer/ux-writing-skill/main/docs/figma-integration.md](https://raw.githubusercontent.com/content-designer/ux-writing-skill/main/docs/figma-integration.md) | Remote/desktop Figma MCP setup for Claude Code; remote setup for Codex and Cursor | Setup claims can drift with host and Figma versions |

### Documented artifacts, commands, and integrations

- **[Sourced fact]** *(vendor-documented claim)* The project packages a `SKILL.md` with progressive reference material, examples, templates, accessibility guidance, a voice chart, a content-usability checklist, UI patterns, and a four-part quality framework: purposeful, concise, conversational, and clear ([repository](https://github.com/content-designer/ux-writing-skill)).
- **[Sourced fact]** *(public-source observation)* The repository displayed `docs/`, `examples/`, `references/`, `templates/`, `SKILL.md`, `CHANGELOG.md`, and a build script. The build script is documented as producing `dist/ux-writing-skill.zip` containing only skill files ([repository](https://github.com/content-designer/ux-writing-skill)).
- **[Sourced fact]** *(public-source observation)* Installation is documented as `npx skills add content-designer/ux-writing-skill`, followed by a host/IDE restart. Project installation uses the same command and can commit the installed files to the repository ([repository](https://github.com/content-designer/ux-writing-skill)).
- **[Sourced fact]** *(vendor-documented claim)* The repository names Claude Desktop, Claude Code, Codex CLI/IDE, and Cursor, and describes model-invoked activation. It also documents explicit `$ux-writing` invocation in Codex and `@ux-writing` in Cursor ([repository](https://github.com/content-designer/ux-writing-skill)).
- **[Sourced fact]** *(public-source observation)* The Figma guide documents a separate Figma MCP connection, frame-link review prompts, and whole-flow audits. That connector is not bundled evidence that the writing skill itself can access Figma ([Figma guide](https://raw.githubusercontent.com/content-designer/ux-writing-skill/main/docs/figma-integration.md)).

### Access, installation, account, and network boundary

- **[Sourced fact]** *(public-source observation)* Base installation uses the networked Skills CLI to retrieve public repository files. The reviewed base skill instructions name no proprietary product account or API key ([repository](https://github.com/content-designer/ux-writing-skill), [skill entrypoint](https://raw.githubusercontent.com/content-designer/ux-writing-skill/main/SKILL.md)).
- **[Inference]** The base package is guidance interpreted by the selected agent/model; any model network, retention, or telemetry boundary belongs to that host and deployment. The skill repository does not establish those host controls.
- **[Sourced fact]** *(public-source observation)* The optional remote Figma routes require a Figma account, internet access, host MCP configuration, and browser authorization. The Claude Code desktop route instead documents Figma Desktop, Dev Mode access, a local endpoint, and the Figma app remaining open ([Figma guide](https://raw.githubusercontent.com/content-designer/ux-writing-skill/main/docs/figma-integration.md)).
- **[Open question]** Exact Figma OAuth scopes, write permissions, host-specific file visibility, and data retained by the host/model are not established by this skill's integration guide.

### Export, cleanup, and unresolved gaps

- **[Sourced fact]** *(public-source observation)* The repository is MIT-licensed and the package contents are inspectable files. The build script can create a portable ZIP. This is source/package portability, not an export of decisions, evaluations, or product content ([repository](https://github.com/content-designer/ux-writing-skill)).
- **[Sourced fact]** *(public-source observation)* The Figma troubleshooting section documents reconnecting or re-authenticating an MCP server; it does not document token revocation, account disconnection, or retained-data cleanup ([Figma guide](https://raw.githubusercontent.com/content-designer/ux-writing-skill/main/docs/figma-integration.md)).
- **[Open question]** The reviewed sources do not provide an uninstall procedure, generated-file manifest after Skills CLI installation, telemetry statement, activation log, deterministic version pin in the install command, or evidence that a named host actually invoked the skill.
- **[Open question]** README/changelog `1.6.0` and GitHub Releases “Latest” `v1.5.0` are inconsistent. A benchmark must pin a commit or immutable archive and record which version contract it uses.
- **[Inference]** This is a portable general-practice baseline. It does not by itself provide organization-specific authority, product behavior, terminology ownership, release state, or evidence lineage.

## 5. Frontitude

### Current official sources

| Source | Exact URL | Directly visible in this refresh | Limitation |
| --- | --- | --- | --- |
| Product site | [https://www.frontitude.com/](https://www.frontitude.com/) | Multilingual UX-content platform; latest product update dated 30 July 2026 | Marketing and vendor security claims are not independent assurance |
| Product updates | [https://www.frontitude.com/product-updates](https://www.frontitude.com/product-updates) | Developer CLI `v1.5.0` documented on 26 June 2026 | Product-wide release numbering is not shown |
| Developer quick start | [https://developer.frontitude.com/quick-start](https://developer.frontitude.com/quick-start) | Starter-plan trial, CLI install, account access, initialization, pull | Page says last updated nine months ago in the current docs shell |
| CLI authentication | [https://developer.frontitude.com/deverloper-cli/authentication](https://developer.frontitude.com/deverloper-cli/authentication) | Browser OAuth, workspace token, login/logout and token config commands | URL retains the site's `deverloper-cli` spelling; page says last updated two years ago |
| CLI commands | [https://developer.frontitude.com/deverloper-cli/commands](https://developer.frontitude.com/deverloper-cli/commands) | `init`, `source set/list`, `pull`, filters, translations, metadata, dry-run | Page snapshot may lag `v1.5.0` additions |
| JSON export guide | [https://www.frontitude.com/guides/export-project-content-as-json](https://www.frontitude.com/guides/export-project-content-as-json) | Scoped JSON export, metadata, translations, stable generated keys | Hands-on export completeness not tested |
| Figma Dev Mode plugin | [https://www.frontitude.com/guides/using-figma-dev-mode-plugin](https://www.frontitude.com/guides/using-figma-dev-mode-plugin) | Read-only developer view and premium-plan gate | Applies only to the Dev Mode plugin path |

### Documented artifacts, commands, and integrations

- **[Sourced fact]** *(vendor-documented claim)* Frontitude describes a hosted platform connecting a copy library, Figma and Sketch plugins, localization, translation, reviews, a writing assistant, Developer CLI, and webhooks ([product site](https://www.frontitude.com/)).
- **[Sourced fact]** *(public-source observation)* The Developer CLI documents `frontitude init`, `frontitude source set`, `frontitude source list`, and `frontitude pull`. Pull options include status, tags, page, screen, key presence, metadata, translations, nested JSON, token override, and `--dry-run` ([CLI commands](https://developer.frontitude.com/deverloper-cli/commands)).
- **[Sourced fact]** *(public-source observation)* The June product update displayed Developer CLI `v1.5.0`, a `--config` path option for monorepos, fuller design-hierarchy metadata, and a global-install update command ([product updates](https://www.frontitude.com/product-updates)).
- **[Sourced fact]** *(vendor-documented claim)* Figma workflows can push copy/design into Frontitude and pull Frontitude changes into Figma. The Dev Mode plugin is described as read-only and displays source content, translations, variables, plurals, keys, and status ([Figma sync guide](https://www.frontitude.com/guides/changes-tab-figma-plugin), [Dev Mode guide](https://www.frontitude.com/guides/using-figma-dev-mode-plugin)).
- **[Sourced fact]** *(public-source observation)* Webhooks are documented for component creation, deletion, value change, status change, and key change; the Developer CLI and file exports are documented for handoff to code and localization systems ([webhooks](https://developer.frontitude.com/webhooks/events), [JSON export](https://www.frontitude.com/guides/export-project-content-as-json)).

### Access, installation, account, entitlement, and network boundary

- **[Sourced fact]** *(public-source observation)* The quick start documents global installation of `@frontitude/cli`, a Frontitude workspace, the Developer CLI integration enabled in workspace settings, and either browser sign-in or an access token ([quick start](https://developer.frontitude.com/quick-start)).
- **[Sourced fact]** *(public-source observation)* Browser sign-in uses Google, Microsoft Azure, or SAML SSO through OAuth 2.0; CI can use a workspace-level access token. The page displays `frontitude login`, `frontitude logout`, `frontitude config set access-token`, and `frontitude config del access-token` ([CLI authentication](https://developer.frontitude.com/deverloper-cli/authentication)).
- **[Sourced fact]** *(public-source observation)* The quick start says the Developer CLI can be installed and tested on the free Starter plan. Another current product page says web-app export and developer handoff are paid-plan features, while the Dev Mode guide says that plugin requires a premium plan ([quick start](https://developer.frontitude.com/quick-start), [content consistency](https://www.frontitude.com/content-consistency), [Dev Mode guide](https://www.frontitude.com/guides/using-figma-dev-mode-plugin)).
- **[Inference]** Those statements may describe different surfaces rather than a contradiction. Exact entitlement for the fixture's CLI, web export, plugin, writing, translation, and review tasks remains an account-level fact to capture before execution.
- **[Sourced fact]** *(vendor-documented claim)* Frontitude's writing-assistant pricing page says selected text and onboarding context are used to generate suggestions and are not used to train or improve the service. The localization page separately describes sharing source text, design data, guidelines, and approved translations with its AI solution and makes the same no-training claim ([writing-assistant pricing](https://write.frontitude.com/pricing), [localization](https://www.frontitude.com/localization)).

### Export, cleanup, and unresolved gaps

- **[Sourced fact]** *(public-source observation)* The web app documents CSV and JSON exports; JSON options include filters, keyed-only output, metadata, translations, and final-only translations. The CLI can pull content into a configured output file and can preview output through `--dry-run` ([JSON export](https://www.frontitude.com/guides/export-project-content-as-json), [CLI commands](https://developer.frontitude.com/deverloper-cli/commands)).
- **[Sourced fact]** *(public-source observation)* CLI token removal and browser logout commands are documented. Copy-library component deletion is documented as detaching instances and losing component properties, not deleting the design instances themselves ([CLI authentication](https://developer.frontitude.com/deverloper-cli/authentication), [copy-library guide](https://www.frontitude.com/guides/setting-up-your-copy-library)).
- **[Open question]** The reviewed sources did not settle whole-workspace/account deletion, retention after deletion, complete revision/comment/approval export, plugin uninstall residue, webhook-secret cleanup, token expiry/revocation semantics, exact AI provider/subprocessor routing for each feature, or self-hosting.
- **[Inference]** Frontitude is the strongest design/localization/content-operations comparison in the set, but its plan-dependent and multi-surface boundary makes a public-page-only capability total especially misleading.

## 6. GitCMS `CONTENT.md`

### Current official sources

| Source | Exact URL | Directly visible in this refresh | Limitation |
| --- | --- | --- | --- |
| `CONTENT.md` documentation | [https://gitcms.dev/docs/ai-mcp/content-instructions/](https://gitcms.dev/docs/ai-mcp/content-instructions/) | Filename purpose, suggested content, exclusions, visual-editor behavior | GitCMS-specific semantics, not a cross-agent standard |
| AI/MCP overview | [https://gitcms.dev/docs/ai-mcp/ai-overview/](https://gitcms.dev/docs/ai-mcp/ai-overview/) | Supported clients, task-first flow, MCP tool names, safety limits | Vendor-documented workflow, not a tested connector result |
| CLI onboarding | [https://gitcms.dev/docs/getting-started/cli-onboarding/](https://gitcms.dev/docs/getting-started/cli-onboarding/) | `create-gitcms`, dry-run/force, generated artifacts | No package version visible on the page |
| ChatGPT setup | [https://gitcms.dev/docs/ai-mcp/chatgpt-setup/](https://gitcms.dev/docs/ai-mcp/chatgpt-setup/) | Account, license, subscription, connector URL, OAuth flow | Applies to ChatGPT path; no login performed |
| Changelog | [https://gitcms.dev/changelog/](https://gitcms.dev/changelog/) | `v1.3.0`, 4 June 2026 | Product changes after cutoff are possible |
| Privacy policy | [https://gitcms.dev/privacy/](https://gitcms.dev/privacy/) | Last updated 4 June 2026; repository, MCP token, retention, export, deletion claims | Policy claim, not an audited implementation result |
| Terms | [https://gitcms.dev/terms/](https://gitcms.dev/terms/) | GitHub access/revocation and preview/paid license claims | Legal/vendor statement; applicability must be reviewed at use time |

### Documented artifacts, commands, and integrations

- **[Sourced fact]** *(vendor-documented claim)* GitCMS defines `CONTENT.md` as site-wide writing instructions for target audience, tone, reading level, terminology, formatting, examples, and do/don't rules. It explicitly excludes secrets, temporary tasks, repository configuration, and per-article outlines ([`CONTENT.md` documentation](https://gitcms.dev/docs/ai-mcp/content-instructions/)).
- **[Sourced fact]** *(public-source observation)* The documentation says GitCMS reads `CONTENT.md` before AI-assisted writing flows and lets users create or edit it in the visual editor. It does not require a strict schema ([`CONTENT.md` documentation](https://gitcms.dev/docs/ai-mcp/content-instructions/)).
- **[Sourced fact]** *(public-source observation)* Onboarding documents `npm init gitcms@latest` and `npx create-gitcms@latest --yes`, plus `--mode`, repeated `--site-root`, `--website-url`, `--dry-run`, and `--force`. Output locations are `.gitcms/sites.jsonc`, `.gitcms/sites/<site_key>/config.jsonc`, and `<site-root>/CONTENT.md` ([CLI onboarding](https://gitcms.dev/docs/getting-started/cli-onboarding/)).
- **[Sourced fact]** *(public-source observation)* The MCP overview listed site/config reads, content-task creation and reads, content entry reads, `write_content`, review submission, and reviewable edit suggestions. It describes a brainstorm → task → draft → revise → review sequence ([AI/MCP overview](https://gitcms.dev/docs/ai-mcp/ai-overview/)).
- **[Sourced fact]** *(vendor-documented claim)* GitCMS says every save is a real repository commit and that the repository remains the source of truth; the AI overview says schema and review rules still apply and MCP is not autonomous publishing ([documentation index](https://gitcms.dev/docs/), [AI/MCP overview](https://gitcms.dev/docs/ai-mcp/ai-overview/)).

### Access, installation, account, entitlement, and network boundary

- **[Sourced fact]** *(public-source observation)* AI/MCP use requires a GitCMS account, a connected repository/site, initialized `.gitcms`, and a licensed site. Preview mode does not unlock saving, publishing, or MCP ([AI/MCP overview](https://gitcms.dev/docs/ai-mcp/ai-overview/), [terms](https://gitcms.dev/terms/)).
- **[Sourced fact]** *(public-source observation)* The documented ChatGPT route additionally requires ChatGPT Plus, Team, or Enterprise, Developer Mode, the connector URL `https://mcp.gitcms.blog/sse`, and Google or GitHub sign-in to GitCMS ([ChatGPT setup](https://gitcms.dev/docs/ai-mcp/chatgpt-setup/)).
- **[Sourced fact]** *(public-source observation)* The AI overview names ChatGPT and Claude OAuth paths and static personal access tokens for other MCP clients. The privacy policy says raw MCP token values are shown once and stored only as hashes, with label, prefix, scopes, expiry, last-used time, and revocation status retained as metadata ([AI/MCP overview](https://gitcms.dev/docs/ai-mcp/ai-overview/), [privacy policy](https://gitcms.dev/privacy/)).
- **[Sourced fact]** *(vendor-documented claim)* The privacy policy says the AI client connects to GitCMS's MCP server, GitCMS does not itself send repository content to an AI provider, and MCP request data is not logged or stored beyond processing, access enforcement, and basic token metadata. This does not describe what the chosen AI client does with content ([privacy policy](https://gitcms.dev/privacy/)).

### Export, cleanup, and unresolved gaps

- **[Sourced fact]** *(vendor-documented claim)* GitCMS says repository content is fetched from GitHub on demand rather than persistently stored and calls `git clone` the content export path. It says account deletion removes account data within 30 days, token metadata persists until revocation/expiry/account deletion, and individual-level analytics are not retained beyond 90 days ([privacy policy](https://gitcms.dev/privacy/)).
- **[Sourced fact]** *(vendor-documented claim)* The terms say a user can revoke GitCMS GitHub App access through GitHub settings and that GitCMS does not modify a repository without an explicit user/team action ([terms](https://gitcms.dev/terms/)).
- **[Open question]** The reviewed sources do not establish a one-command uninstall, a generated-file cleanup verifier, rollback behavior for every MCP write, whether task/comment/review metadata is fully present in the Git repository export, or how already-created commits should be reverted during benchmark cleanup.
- **[Inference]** GitCMS is an exact filename collision but a narrower semantic precedent: its `CONTENT.md` is an editorial brief for Markdown-site content inside GitCMS, not a demonstrated whole-product content-design decision graph.

## 7. content-md

### Current official sources

| Source | Exact URL | Directly visible in this refresh | Limitation |
| --- | --- | --- | --- |
| Specification site | [https://contentmd.org/](https://contentmd.org/) | “Open Specification · Draft”; individual web-resource positioning | No numbered general specification version visible |
| Format reference | [https://contentmd.org/specification/](https://contentmd.org/specification/) | Required/encouraged frontmatter and custom blocks | Draft specification, not deployed-site conformance evidence |
| CLI reference | [https://contentmd.org/cli/](https://contentmd.org/cli/) | Browse, validate with optional saved JSON report, Markdown/JSON output, and Skill conversion | Describes commands; `--save` is report persistence for later comparison, not a snapshot/diff subcommand; no binary was downloaded or run |
| Maintainer repository | [https://github.com/OneOffTech/contentmd](https://github.com/OneOffTech/contentmd) | Public repository; Rust CLI; Apache-2.0 code and CC-BY-4.0 docs | `main` is mutable |
| CLI release | [https://github.com/OneOffTech/contentmd/releases/tag/v0.1.0](https://github.com/OneOffTech/contentmd/releases/tag/v0.1.0) | `v0.1.0`; visible release date 17 May; prebuilt Linux/macOS/Windows assets | GitHub page displayed day/month without a year |
| Privacy policy | [https://contentmd.org/privacy/](https://contentmd.org/privacy/) | Six-month web-log retention, no analytics/cookies, local session-mode preference | Applies to contentmd.org, not every site implementing the specification |

### Documented artifacts, commands, and integrations

- **[Sourced fact]** *(vendor-documented claim)* content-md is a draft format for representing one web resource as YAML frontmatter plus CommonMark or GitHub-Flavored Markdown. `title` and `description` are required; date, license, and author are encouraged ([specification](https://contentmd.org/specification/)).
- **[Sourced fact]** *(public-source observation)* The format reference displayed custom navigation, figure, abstract, and advertisement blocks. The homepage explicitly distinguishes content-md from `llms.txt`, AGENTS.md, and Agent Skills and says it does not target coding agents ([specification](https://contentmd.org/specification/), [homepage](https://contentmd.org/)).
- **[Sourced fact]** *(public-source observation)* The CLI default sends `Accept: text/markdown`, can fetch one or multiple URLs or a sitemap, can request frontmatter only, and can write fetched pages to an output folder. Redirect following is opt-in in the documented interface ([CLI reference](https://contentmd.org/cli/)).
- **[Sourced fact]** *(public-source observation)* `contentmd validate` checks content negotiation, headers, frontmatter, heading structure, HTML correspondence, robots and sitemap signals, and returns a 0–100 compliance score. It can emit JSON or Markdown, save a baseline, and compare later reports ([CLI reference](https://contentmd.org/cli/)).
- **[Sourced fact]** *(public-source observation)* `contentmd skill` converts a fetched content-md page into `SKILL.md`, and the CLI detects named coding-agent environment variables to change output mode. The release page lists prebuilt binaries for Linux, macOS, and Windows ([CLI reference](https://contentmd.org/cli/), [release](https://github.com/OneOffTech/contentmd/releases/tag/v0.1.0)).

### Access, installation, account, and network boundary

- **[Sourced fact]** *(public-source observation)* No contentmd.org product account, API key, paid plan, or OAuth connector is named in the reviewed specification, CLI, repository, or release pages ([specification](https://contentmd.org/specification/), [CLI reference](https://contentmd.org/cli/), [repository](https://github.com/OneOffTech/contentmd), [release](https://github.com/OneOffTech/contentmd/releases/tag/v0.1.0)).
- **[Sourced fact]** *(public-source observation)* CLI browse/validate/skill commands take web URLs and therefore make network requests to target sites. `--output` and Skill conversion write local files when invoked ([CLI reference](https://contentmd.org/cli/)).
- **[Sourced fact]** *(public-source observation)* The site links server integrations for content negotiation, including a Caddy module and a WordPress plugin, but those are separate projects with their own installation and security boundaries ([homepage](https://contentmd.org/)).
- **[Inference]** A site can implement the draft format without using the official CLI. Conversely, installing the CLI does not cause a site to serve content-md.

### Export, cleanup, and unresolved gaps

- **[Sourced fact]** *(public-source observation)* The CLI can save fetched Markdown pages, JSON validation reports, Markdown reports, saved baselines, and generated `SKILL.md` files. Those are explicit local output artifacts ([CLI reference](https://contentmd.org/cli/)).
- **[Sourced fact]** *(public-source observation)* contentmd.org says it keeps server logs for six months, uses no analytics or tracking cookies, stores the human/agent view preference only in browser session storage, and protects transit with TLS. These statements apply only to the reference site ([privacy policy](https://contentmd.org/privacy/)).
- **[Open question]** The reviewed sources do not document CLI uninstall/cleanup, local cache behavior, a machine-readable manifest of files written during sitemap/Skill operations, a general spec version separate from CLI `v0.1.0`, or security/privacy requirements binding third-party implementations.
- **[Inference]** content-md is principally a naming and interoperability collision for this project. Its document payload and audience are different from a repository-native content-design governance contract.

## Cross-system boundary matrix

This is an evidence-presence matrix, not a capability or quality score. “Documented” means the named public source addresses the field; “partial” means it addresses only one surface or object; “not found” is confined to this source set.

| System | Account or hosted service | Local repository artifact | Hosted content/model call in normal documented use | Explicit export | Explicit credential cleanup | Complete product/account cleanup found |
| --- | --- | --- | --- | --- | --- | --- |
| Ditto | Required for MCP/CLI workspace use | `*.ditto.md`, `workspace.ditto.md`, config, agent commands | Yes, Ditto API/platform | Partial: formatted string delivery and API/CLI outputs are described | Yes: CLI logout; replace/remove saved credential file | Not found |
| VOICE.md | Not named | `VOICE.md` plus generated prompt/JSON/ESLint config | Not established for runtime linter/export | Yes: prompt, JSON, ESLint config | Not applicable in reviewed base workflow | Not found |
| ContentRX | Dashboard/API key required | Client/editor configuration; no local standards corpus documented | Yes, each selected string is sent to ContentRX API | Partial: terminal/structured evaluation output | Yes: editor clear-key command; CLI environment variable | Not found |
| UX Writing Skill | Not for base skill; optional Figma account for integration | `SKILL.md`, references, examples, templates | Depends on host/model; Figma integration crosses MCP boundary | Package ZIP/source files only | Figma re-authentication documented; revocation not found | Not found |
| Frontitude | Required | CLI config and pulled output files | Yes, hosted workspace and optional AI features | Yes: JSON, CSV, CLI pull | Yes: CLI logout/token delete | Not found |
| GitCMS `CONTENT.md` | Required for product/MCP | `.gitcms`, `CONTENT.md`, repository content | Yes, hosted GitCMS MCP; downstream AI-client boundary is separate | Repository clone; repository content remains source of truth | GitHub App revocation and PAT revocation are documented | Account deletion claim found; workflow-metadata completeness unresolved |
| content-md | Not named | Served Markdown; optional local fetched pages/reports/Skill output | CLI makes requests to target websites; no model service named | Yes: Markdown, JSON/Markdown reports, `SKILL.md` | Not applicable in reviewed workflow | Not found |

## Version and status issues that must be pinned before B0

| System | Pinning issue | Required run record |
| --- | --- | --- |
| Ditto | Product, CLI, agent package, MCP, and alpha Specs do not share one visible version | CLI version, package commit, Specs CLI version, MCP version if exposed, workspace plan, documentation snapshot date |
| VOICE.md | Alpha schema and CLI can change; repository `main` is mutable | Exact `v0.1.0-alpha.3` tag or later immutable tag, package integrity, Node version |
| ContentRX | CLI/LSP/MCP/extension versions are separate; extension version was not exposed in the fetched overview | Exact extension/CLI/LSP/MCP versions, API schema, quota plan, API origin |
| UX Writing Skill | README/changelog say `1.6.0`; GitHub Releases labels `v1.5.0` latest | Commit SHA or immutable package plus declared semantic version and host version |
| Frontitude | CLI `v1.5.0` is visible; SaaS, plugins, and AI features have separate rolling release/entitlement surfaces | CLI version, plugin version, workspace plan, enabled integrations, product update date |
| GitCMS `CONTENT.md` | GitCMS `v1.3.0` is visible but onboarding CLI and MCP do not expose one shared version in reviewed docs | GitCMS product version, `create-gitcms` version, MCP server/client versions, license and site configuration |
| content-md | Draft specification has no visible numbered general version; CLI is `v0.1.0` | Spec snapshot/commit, CLI tag and binary hash, target-site response capture |

## Claims this refresh does not support

The source evidence above does not support any of these statements:

- that one product is the best content-design system;
- that a documented command completed successfully;
- that a product discovered all expected strings or excluded all decoys;
- that a voice, tone, accessibility, localization, or risk judgment is correct;
- that “local” means offline, private, or free of telemetry;
- that a deletion endpoint removes every copy, log, credential, backup, or derived record;
- that a repository is the only authoritative store merely because files are version-controlled;
- that an AI integration invoked its skill or instruction file;
- that a vendor status label such as alpha, beta, production-ready, or stable is comparable across products;
- that a public privacy, security, or no-training statement has been independently audited;
- that content-md and GitCMS `CONTENT.md` solve the repository-native whole-product content-design problem proposed by this project.

## Source-driven next evidence actions

1. Pin one immutable revision per open package and one visible version per hosted surface before any fixture execution.
2. Record exact account plan and connector scope for Ditto, ContentRX, Frontitude, and GitCMS before authentication.
3. Run DT-01 installation preview without installing; enumerate every file, process, origin, credential store, permission, and implicit download.
4. Obtain vendor documentation or authorized account evidence for export completeness, retention, account deletion, disconnect, and uninstall gaps listed above.
5. Use the synthetic checkout-recovery fixture only after a dedicated profile, run-scoped authorization, capture/retention decision, and cleanup owner are recorded.
6. Keep public-source evidence in a separate evidence class from Computer Use captures and measured fixture outcomes. A source refresh can update the test plan; it cannot satisfy the test.
