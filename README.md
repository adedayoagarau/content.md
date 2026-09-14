# content.md

`content.md` is a repository-native content-design agent. It finds product
language in your codebase, explains what needs attention, helps you improve it
with the facts you provide, and can apply one reviewed change at a time.

Run it in an existing repository without adopting a framework or uploading the
repository:

```bash
npx contentmd
```

The first run is a preview-only scan. It does not edit files, install repository
configuration, contact a model provider, or treat existing copy as approved.

## What you can do

- Find user-facing content with exact source locations.
- Inspect why a finding was selected and what context is missing.
- Compare a candidate against repository evidence and explicit constraints.
- Preview an exact patch before anything changes.
- Apply only the reviewed patch digest, then undo it if needed.
- Explore the same evidence in a loopback-only local workbench.
- Adopt a durable `CONTENT.md` contract and bridge existing agent instructions.

`content.md` assists with content decisions; it does not invent product facts or
grant approval, publication, policy, or release authority.

The supported open-source surface is the `contentmd` CLI and local workbench.
Read the [content-design standard](https://github.com/adedayoagarau/content.md/blob/main/docs/content-design-standard.md),
[public interface contract](https://github.com/adedayoagarau/content.md/blob/main/docs/public-api.md),
[contribution guide](https://github.com/adedayoagarau/content.md/blob/main/CONTRIBUTING.md),
[security policy](https://github.com/adedayoagarau/content.md/blob/main/SECURITY.md),
and [release-candidate verification](https://github.com/adedayoagarau/content.md/blob/main/docs/verification/open-source-release-candidate-0.1.md).
Workspace package exports and the public-product research corpus are not a
stable JavaScript SDK or implicit training data.

## Use it today

`content.md` is a local repository agent and CLI first; hosting is optional. From this source checkout, build once and run the safe regular-user scan:

```bash
pnpm install --frozen-lockfile
pnpm build
cd /absolute/path/to/project
/absolute/path/to/content.md/packages/cli/dist/main.js
```

The public distribution candidate now packages the CLI as one dependency-free
`contentmd@0.1.0` tarball. Its clean-install smoke test proves the installed
binary, bare-command scan, offline local `npx` journey, qualified-content
summary, packed loopback workbench, compare/preview/apply/undo cycle, fresh
digest-bound adoption, post-adoption diagnosis, bounded repository uninstall
preview, package removal, and the relevant non-mutation boundaries under Node
24. The synthetic adoption remains at `ready_with_governance_warnings` because
the test does not fabricate a content owner:

```bash
pnpm test:distribution
```

The intended regular-user registry entry point is `npx contentmd`, which runs a
preview-only qualified-content scan in the current repository. `npx contentmd init`
remains the explicit adoption path. No registry
publication has occurred yet, so use the source-checkout command or the locally
packed tarball until release ownership, npm authentication, provenance, and the
release gate are established. Package acquisition may use the package manager's
network access; the installed repository-intelligence runtime itself performs
no network request during the verified adoption preview.

The regular-user flow needs no adoption or persisted model:

```bash
npx contentmd                         # compact preview-only scan
npx contentmd scan --inspect 1        # inspect the first ranked finding
npx contentmd scan --improve 1        # see its missing facts and acceptance criteria
npx contentmd serve                   # open the local interactive proofing desk
```

To measure whether the qualification system is identifying meaningful content
rather than arbitrary strings, generate an explicit review packet. The packet
does not claim anyone reviewed it: reviewer fields begin blank and the command
refuses to overwrite an existing file.

```bash
npx contentmd scan --review-sample 100 --review-output qualification-review.json
# An independent reviewer fills reviewer_qualification, reviewer_role, and reviewer_notes.
npx contentmd scan --evaluate-review qualification-review.json
```

Evaluation verifies that the sampled source identities have not changed, then
reports exact agreement, qualification precision and recall, source-layer
metrics, and every mismatch. Reviewer role labels are recorded provenance; they
do not authenticate a person's identity or grant approval authority.

Supplying facts, comparing a candidate, and requesting an exact diff remain
non-mutating. A solo user can apply only the exact digest they just previewed,
with an explicit `--yes`, and can restore the captured previous bytes:

```bash
npx contentmd scan --improve 1 --context facts.json --candidate "…" --preview-patch --json
npx contentmd scan --improve 1 --context facts.json --candidate "…" \
  --apply-patch <reviewed-transaction-digest> --yes --json
npx contentmd undo --transaction <transaction-digest> --root . --yes --json
```

Apply rechecks the source and transaction digest, performs one atomic source
replacement, verifies readback, and writes a mode-restricted local undo record
under `.contentmd/regular-user-changes/`. If recording the undo material fails,
the source change is rolled back. The response declares
`write_effect: "local_source_mutation"`; preview continues to declare `none`.
This explicit solo-user confirmation does not grant release, publication, or
organizational approval authority. The existing governed team apply/rollback
workflow remains separate.

The preview returns an exact `plan_digest` and writes nothing. After reviewing it, approve only that plan:

```bash
pnpm contentmd init --yes --plan-digest <reviewed-digest> --root /absolute/path/to/project --json
pnpm contentmd model --root /absolute/path/to/project --json
pnpm contentmd model packet --root /absolute/path/to/project --json
```

Adoption preserves existing agent instructions and proposes a versioned,
marker-owned content.md bridge for every supported host file it finds. When a
repository has no recognized host instructions, the plan includes a minimal
root `AGENTS.md` bridge instead of silently leaving agent integration absent.
The bridge remains part of the digest-bound adoption approval and never grants
mutation, approval, release, or publication authority.

Bridge maintenance is independently previewable. `--path` scopes an
`AGENTS.md`, `CLAUDE.md`, `CODEX.md`, or `GEMINI.md` bridge to a subtree;
Copilot retains its repository-standard path. Current, outdated, and malformed
blocks are reported separately. Installation, reconciliation, and removal each
recheck the exact source digest before changing the host file:

```bash
contentmd bridge --host agents --path apps/web/AGENTS.md --root . --json
contentmd bridge --host agents --path apps/web/AGENTS.md --root . --yes --json
contentmd bridge --host agents --path apps/web/AGENTS.md --root . --remove --json
contentmd bridge --host agents --path apps/web/AGENTS.md --root . --remove --yes --json
```

Removal deletes only the single well-formed managed marker block. It fails
closed for missing, duplicate, or malformed markers and preserves host-authored
content outside the block.

Give the bounded model packet to the intelligent model already available in the IDE, then ingest its cited structured response with `model ingest`. For a specific content issue, prepare a source-bound task, let the IDE model return structured alternatives, and review them before any decision or edit:

```bash
pnpm contentmd task prepare --request "Improve this empty state" --target path/to/file.tsx:42 --root /absolute/path/to/project --json
pnpm contentmd task review --input /absolute/path/to/ide-candidate.json --root /absolute/path/to/project --json
pnpm contentmd serve --root /absolute/path/to/project
```

`serve` opens a loopback-only workbench. Comparison and patch preview remain
non-mutating. A solo user may select an explicit confirmation and apply only
the exact previewed digest, then undo that change; the same source-drift,
readback, and local undo-record controls used by the CLI apply. This does not
approve guidance or grant release, publication, connector, or organizational
authority. The workbench's WebMCP tools remain independently read-only.

### Use the workbench with WebMCP

The local workbench registers a small read-only WebMCP surface when the browser supports `document.modelContext`. Start the workbench normally, open the printed loopback URL, and inspect the page with a WebMCP-capable browser agent or the Chrome Model Context Tool Inspector:

```bash
pnpm contentmd serve --root /absolute/path/to/project
```

For local Chrome testing, enable `chrome://flags/#enable-webmcp-testing` and relaunch Chrome. The page registers these tools:

- `contentmd.get_project_overview`
- `contentmd.get_content_context`
- `contentmd.inspect_reviewed_task`
- `contentmd.list_governance_constraints`

All four tools read the same bounded projections shown by the workbench. They are marked read-only, treat repository-derived output as untrusted, and always report `authority_effect: "none"`. They cannot prepare or accept decisions, mutate files, grant approval, apply or roll back changes, access connectors, release, or publish content. Browsers without WebMCP support continue to receive the ordinary workbench without an error.

Recorded browser evidence is supported through a bounded adapter, but live browser acquisition is not implied by a record. The current public UX-writing corpus is project-owned and synthetic; it contains no competitor wording as model input.

The verified portable local runtime exposes 12 focused interfaces for authorized event storage, blobs, jobs, approvals, progress, export, scheduling, ingress, secrets, synchronization, health, and cleanup. Every operation is bound to a current opaque authorization, append-only audit, replay control, and independently verified binding readback. A Cloudflare-shaped host can be detected, but the candidate is deliberately non-bindable: this repository has no Cloudflare adapter, Agents SDK production dependency, deployment, or production-host verification.

## Run the local foundation

Requirements for repository development: Node.js `24.14.0` and `pnpm@11.9.0`.
The published CLI supports the broader Node.js `>=24.14.0 <25` range. Exact-runtime
learning fixtures are replayed under that same pinned profile and are never silently
regenerated under another runtime.

```bash
nvm use
corepack prepare pnpm@11.9.0 --activate
pnpm verify:toolchain
```

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm contentmd init --root /absolute/path/to/project --json
pnpm contentmd doctor --root /absolute/path/to/project --json
pnpm contentmd discover --root /absolute/path/to/project --json
```

The CLI supports recorded-provider replay and a governed OpenAI adapter. Provider configuration, execution planning, authorization, output-schema validation, and audit records are separate steps; model access never grants edit, approval, or publication authority. Apply and rollback require separate exact authorization records, and preview never creates them.

## Verify and use a local learning candidate

After a sealed project-owned training replay has completed, independently reverify the persisted model artifact before using it to rank alternatives:

```bash
pnpm contentmd learn verify-model --root /absolute/path/to/project --json
pnpm contentmd draft-select \
  --root /absolute/path/to/project \
  --input /absolute/path/to/complete-draft-selection-replay.json \
  --json
```

`learn verify-model` only replays and verifies the immutable local training artifact; it does not activate or promote a model. `draft-select` requires complete verified candidate replays and an admitted binding projection. If those conditions are not present, it returns the deterministic safe fallback instead of treating a learned ranking as authority.

## Start here

1. [Foundational findings](research/08-synthesis/foundational-findings.md) — the cross-workstream answer and current product implications.
2. [Candidate content-decision system model](research/08-synthesis/candidate-system-model.md) — the ontology, orthogonal evidence dimensions, independent decision and delivery states, typed control records, scope, and compiler boundary to test.
3. [Research gap register](research/08-synthesis/research-gap-register.md) — the evidence still required before a responsible public specification.
4. [Research index](research/INDEX.md) — every current artifact and source record in this working corpus.

## What the current synthesis supports

- Content design is an end-to-end decision discipline, not string polishing or a voice prompt.
- A leading candidate for the auditable aggregate is a **message in context**: a semantic content decision linked to user, journey, event, state, behavior, consequence, recovery, expressions, implementation occurrences, and evidence. Its minimum identity is not yet stabilized.
- Content modeling and information architecture belong before expression: concepts, objects, relationships, hierarchy, navigation, search, retrieval, and mappings to code, CMS, API, and component systems must remain distinguishable.
- Interaction patterns and channels are behavior, state, delivery, and recovery contracts—not containers to fill with generic copy.
- There is no defensible universal industry voice. Brand voice, situational tone, domain constraints, controlled terminology, locale, accessibility, and risk are separate inputs.
- Existing code, design, CMS, help, and live content are evidence, not automatic canon.
- The agent needs bounded Discover, Advise, Draft, Apply, and Enforce modes. A mode never grants capability; enforcement can act only on approved deterministic rules within the separately granted scope.
- Static discovery, model analysis, connected reads, isolated drafting, local edits, remote publication, controlled runtime verification, and enforcement are separate capability phases; each needs its own trust boundary, task-specific grant, and passing release gate.
- A portable system will likely need a compact `CONTENT.md` contract, structured working data, an on-demand skill, deterministic tooling, native host bridges, and external connectors.
- Accessibility, localization, verification, maintenance, and measurement belong in the architecture from the beginning.
- Cognitive ergonomics must be evidence- and context-bound: named effects are not universal writing rules, individual cognitive or emotional states must not be inferred from proxies, and business outcomes cannot compensate for failures in truthfulness, non-deception, material comprehension, valid consent, accessibility, user autonomy, or safety.

## What remains unproven or unavailable

This repository does not yet contain a published package installer, production skill distribution, hosted runtime, broad external-product adapters, production domain packs, or evidence of universal agent compatibility. The local workbench is implemented and verified, but it is not a hosted service. Official learning, promotion, deployment, and publication still require authenticated product-owned resolvers and authority that development fixtures do not provide. Public-product acquisition remains an evidence program rather than product authority, and inaccessible sites are recorded as unavailable without treating web research generally as blocked. Practitioner studies, qualified review, representative-user testing, multilingual calibration, and controlled product-outcome benchmarks remain open.

## Research question

What knowledge, evidence, decisions, artifacts, workflows, constraints, and verification methods would a capable content designer need in order to work responsibly across a software product—and how can those practices become a portable repository contract and agentic workflow?

## Research map

| Area | Primary question | Location |
| --- | --- | --- |
| Method | How will claims be sourced, classified, and reviewed? | `research/00-method/` |
| Discipline | What is content design, and where are its boundaries? | `research/01-discipline/` |
| Workflow | What happens before, during, and after a string is written? | `research/02-workflow/` |
| Domains | How do industry, risk, audience, culture, and regulation change decisions? | `research/03-domain-matrix/` |
| Surfaces | Where does product content appear, and through which states and channels? | `research/04-surfaces/` |
| Technology | How can repositories, design tools, localization systems, and agents interoperate safely? | `research/05-technology/` |
| Evaluation | How is content quality, safety, and effectiveness tested? | `research/06-evaluation/` |
| Landscape | What standards, tools, competitors, and naming collisions already exist? | `research/07-landscape/` |
| Synthesis | What should content.md become, based on the evidence? | `research/08-synthesis/` |
| Experimental | How will practitioner decisions, competing products, voice/tone measurement, judge agents, and a bounded journey be tested? | `research/09-experimental/` |
| Cognitive ergonomics | How should cognition, behavioral influence, accessibility, culture, manipulation risk, and scientific-claim hygiene change content decisions? | `research/10-cognitive-ergonomics/` |

## Evidence labels

- **Sourced fact:** directly supported by a cited source within its scope.
- **Documented practice:** a named organization or practitioner's account; not automatically universal.
- **Research finding:** a study result within its method, sample, and limitations.
- **Cross-source finding:** supported by more than one independent source with direct citations.
- **Inference:** a conclusion drawn from evidence and labeled as such.
- **Proposal:** a candidate design choice; not yet validated.
- **Product hypothesis:** a proposal subtype that states a behavior or outcome to test.
- **Open question:** an uncertainty that requires more evidence or a named decision path.

Labels such as law, standard, official guidance, research, practitioner, or vendor describe the source type. They do not by themselves prove that a requirement applies to a particular product. The canonical vocabulary and legacy-label mapping are in the [research protocol](research/00-method/research-protocol.md#canonical-claim-and-source-vocabulary).

## Current boundary

Research artifacts are working material with their stated evidence cutoffs. They are not production-ready content, psychology, behavioral-science, legal, clinical, regulatory, localization, accessibility, security, or safety guidance. The repository has a bounded local executable, governed provider adapters, a recorded browser-evidence adapter, and synthetic development fixtures. It has no granted real-product authority, authenticated official learning handoff, live public-product observation from the current session, remote publication authority, or demonstrated product outcome. The implemented controls establish deterministic development behavior—not organizational approval or effectiveness.

## Next evidence phase

The first conforming primary, product, calibration, fixture, and benchmark studies are designed but not yet executed. A synthetic field-kit tabletop and nonconforming environment reconnaissance have run only to test methods and boundaries; they provide no practitioner, product-comparison, or user-outcome evidence. The conforming studies will reconstruct recent content decisions with practitioners; review the cognitive-ergonomics claim register with qualified scientific and accessibility specialists; test the cognitive-context packet and influence boundaries with practitioners and affected users; model real multilingual and high-risk work; implement the first inherited-product checkout-recovery fixture; benchmark its specified discovery, proposal, and evaluation tasks; and recollect direct-product observations under the conforming desktop protocol. The current shared fixture independently covers workflow stages 3, 5, and 6. Greenfield fixtures, safe round-trip mutation, rendered implementation verification, instruction-host loading, and a complete discovery-to-release journey remain later experiments rather than current design coverage.

The executable sequence is defined by the [practitioner decision-reconstruction protocol](research/09-experimental/practitioner-decision-reconstruction-protocol.md), [field kit](research/09-experimental/practitioner-field-kit.md), [cognitive-ergonomics practitioner protocol](research/10-cognitive-ergonomics/practitioner-review-and-validation-protocol.md), [product desktop study protocol](research/09-experimental/product-desktop-study-protocol.md), [product-study and judge-agent system](research/09-experimental/product-study-and-judge-agent-system.md), [voice/tone graph and measurement model](research/09-experimental/voice-tone-graph-and-measurement.md), and [shared benchmark fixture specification](research/09-experimental/shared-benchmark-fixture-specification.md). The [field-kit tabletop rehearsal](research/09-experimental/practitioner-field-kit-tabletop-rehearsal-2026-08-17.md) traces the synthetic control paths without creating participant evidence. The [human calibration instrument](research/09-experimental/voice-tone-human-calibration-instrument.md) defines hard-before-style admission, pairwise judgments, uncertainty, held-out testing, and multilingual boundaries without assigning gold labels. The [materials and access register](research/09-experimental/materials-and-access-register.md) records what is present, missing, or authorization-gated across phases 1–6; the [dated public-product refresh](research/09-experimental/public-product-source-refresh-2026-08-17.md), [public-source product baseline](research/09-experimental/public-source-product-study-and-judge-baseline-2026-08-17.md), and [public voice-system corpus](research/09-experimental/public-voice-and-tone-systems-corpus-2026-08-17.md) keep official-source claims separate from desktop-observed behavior. The [browser-isolation options paper](research/09-experimental/desktop-research-browser-isolation-options-2026-08-17.md) defines the next action-time environment decision. The underlying priorities and unresolved evidence remain in the [practitioner research plan](research/00-method/practitioner-research-plan.md) and [gap register](research/08-synthesis/research-gap-register.md).

A bounded local foundation has been built and independently verified against its own synthetic fixture, but it is not the approved Track B static harness and does not close the Phase 4 or architecture-`r2` gates. The exact proposed experimental-harness boundary remains in the [v0 architecture and bounded-build decision packet](research/09-experimental/v0-architecture-and-build-decision-packet.md). That separate sequence still requires its named fixture, disposition, architecture, security/privacy, and task-specific controls.
