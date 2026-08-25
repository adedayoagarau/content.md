# Host-Agnostic Repository Intelligence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `content.md` correctly adopt, inventory, model, and support a governed IDE writing task in Python-only, Node-only, documentation-first, and mixed-stack repositories, with Carter as the first live acceptance repository.

**Architecture:** Replace the hard-coded root `package.json` plus `DESIGN.md`/`PRODUCT.md` workflow with a deterministic repository inventory, stack/source detector, parser federation, evidence-claim and authority layer, and provisional model compiler. Keep the existing adapter, graph, governance, writer, and CLI boundaries; add a minimal local sidecar that renders the same content-addressed records rather than maintaining separate state.

**Tech Stack:** Node.js 24.14.x, TypeScript project references, Vitest, TypeScript 5.9 parser alias for TS/TSX, `fast-glob`, `yaml`, Commander, Node HTTP, canonical JSON and SHA-256 identities.

**Spec:** `docs/superpowers/specs/2026-08-25-contentmd-host-agnostic-repository-intelligence-design.md`

## Global Constraints

- Preserve unrelated dirty and untracked public-corpus work; every commit stages only files named by its task.
- Use the bundled Node 24.14.x runtime for every command. Do not use the system Node runtime.
- Repository inventory, adoption, deterministic modeling, and bridge installation perform no network request.
- Never read `.env`, credentials, `data/`, `outputs/`, browser profiles, generated corpora, caches, or symlink targets outside the authorized root.
- Do not execute target-repository scripts, import target code, install target dependencies, or read environment values.
- Source presence never grants approval, publication authority, deployment status, or live-observation status.
- Model-assisted claims remain proposed, citation-bound, and unable to widen their own context.
- `CONTENT.md` remains concise; inventories and model state stay in `.contentmd/` records.
- A material finding defaults to draft + explain + approval. Only current, narrowly scoped deterministic policies can permit automatic edits.
- Existing host instructions remain intact outside exact content.md marker blocks.
- Carter-specific doctrine must not enter portable production code or committed public fixtures.
- Maintain backwards compatibility for the existing synthetic JavaScript fixture and existing CLI JSON envelope.

## File Structure

### Existing files to modify

- `packages/adapter-sdk/src/adapter.ts` — versioned repository inventory, source-candidate, claim, coverage, and expanded occurrence contracts.
- `packages/adapter-filesystem/src/discover.ts` — orchestrate inventory and parser federation; retain deterministic finalization.
- `packages/adapter-filesystem/src/index.ts` — export new inventory and parser contracts.
- `packages/adapter-filesystem/package.json` — add the already-workspace-pinned `yaml` parser dependency.
- `packages/core/src/context-compiler.ts` — compile claims and occurrences rather than two filename-specific regexes.
- `packages/core/src/content-graph.ts` — add evidence/conflict/voice/persona node types needed by the provisional projection.
- `packages/core/src/index.ts` — export new repository-evidence modules.
- `packages/agent/src/model-workflow.ts` — remove required `package.json`, `DESIGN.md`, and `PRODUCT.md`; orchestrate the new pipeline.
- `packages/agent/src/adoption.ts` — build adoption from detected sources and combine approved owned files with bridge previews.
- `packages/agent/src/content-contract.ts` — render provisional, evidence-linked `CONTENT.md`.
- `packages/agent/src/local-runtime.ts` — replace fixture task construction with repository-derived task preparation.
- `packages/agent/src/index.ts` — export new workflows.
- `packages/writer/src/task-packet.ts` — add voice, terminology, decision-status, and target-occurrence bindings.
- `packages/cli/src/commands/init.ts` — preview by default; require exact plan digest for non-interactive approval.
- `packages/cli/src/commands/model.ts` — emit/ingest bounded IDE interpretation packets.
- `packages/cli/src/index.ts` and `packages/cli/src/main.ts` — register `task` and `serve` commands.
- `packages/cli/package.json`, root `package.json`, `pnpm-lock.yaml`, and root `tsconfig.json` — register the workbench package and commands without replacing existing scripts.
- `scripts/verify-foundation.mjs` — include mixed-stack and workbench acceptance checks.
- `README.md` — document one-command adoption and the provider-neutral IDE path.

### New focused production files

- `packages/adapter-filesystem/src/inventory.ts` — safe repository file inventory and default exclusions.
- `packages/adapter-filesystem/src/stack-detection.ts` — manifest-only stack/workspace detection.
- `packages/adapter-filesystem/src/source-candidates.ts` — source classification and project-identity proposal.
- `packages/adapter-filesystem/src/parsers/types.ts` — common parser input/output contract.
- `packages/adapter-filesystem/src/parsers/typescript.ts` — current TS/TSX/JSON/HTML extraction moved behind the federation.
- `packages/adapter-filesystem/src/parsers/python.ts` — conservative FastAPI/Python literal and route extraction.
- `packages/adapter-filesystem/src/parsers/documents.ts` — Markdown/MDX/YAML document metadata, sections, and explicit claims.
- `packages/core/src/evidence-claims.ts` — canonical claims, evidence classes, lifecycle, conflict, and authority assessment.
- `packages/agent/src/repository-interpretation.ts` — bounded IDE interpretation packet and validated proposed-claim ingestion.
- `packages/agent/src/task-workflow.ts` — task request, packet preparation, candidate review, and decision handoff.
- `packages/cli/src/commands/task.ts` — provider-neutral IDE task commands.
- `packages/cli/src/commands/serve.ts` — local workbench command.
- `packages/workbench/package.json`, `packages/workbench/tsconfig.json`, `packages/workbench/src/index.ts`, `packages/workbench/src/server.ts`, `packages/workbench/src/render.ts` — dependency-light local sidecar.

### New committed fixture

- `fixtures/synthetic-mixed-stack/` — public synthetic Python/FastAPI + nested Next/React repository with explicit current/draft conflicts and safe excluded canaries.

---

### Task 1: Safe repository inventory and mixed-stack fixture

**Files:**
- Create: `fixtures/synthetic-mixed-stack/pyproject.toml`
- Create: `fixtures/synthetic-mixed-stack/CLAUDE.md`
- Create: `fixtures/synthetic-mixed-stack/docs/context/PRODUCT-IDENTITY.md`
- Create: `fixtures/synthetic-mixed-stack/docs/adr/0001-current-product-shape.md`
- Create: `fixtures/synthetic-mixed-stack/PRD.md`
- Create: `fixtures/synthetic-mixed-stack/studio/package.json`
- Create: `fixtures/synthetic-mixed-stack/studio/app/page.tsx`
- Create: `fixtures/synthetic-mixed-stack/studio/app/analyze/page.tsx`
- Create: `fixtures/synthetic-mixed-stack/api/main.py`
- Create: `fixtures/synthetic-mixed-stack/templates/recovery.html`
- Create: `fixtures/synthetic-mixed-stack/outputs/generated.tsx`
- Create: `fixtures/synthetic-mixed-stack/data/private.json`
- Create: `fixtures/synthetic-mixed-stack/.env`
- Create: `packages/adapter-filesystem/src/inventory.ts`
- Modify: `packages/adapter-sdk/src/adapter.ts`
- Modify: `packages/adapter-filesystem/src/index.ts`
- Test: `packages/adapter-filesystem/test/inventory.test.ts`

**Interfaces:**
- Produces: `inventoryRepository(request: DiscoverRequest): Promise<RepositoryInventory>`
- Produces: `RepositoryInventory`, `InventoryArtifact`, `InventoryExclusion`, `StackFact`, `DiscoveryCoverage`
- Consumes: canonical JSON and SHA-256 helpers from `@contentmd/core`

- [ ] **Step 1: Create the failing mixed-stack inventory test**

```ts
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { inventoryRepository } from "@contentmd/adapter-filesystem";

const root = fileURLToPath(new URL("../../../fixtures/synthetic-mixed-stack/", import.meta.url));

describe("repository inventory", () => {
  it("detects safe mixed-stack artifacts and excludes private/generated paths", async () => {
    const result = await inventoryRepository({ project_root: root });
    expect(result.artifacts.map((item) => item.relative_path)).toEqual(expect.arrayContaining([
      "pyproject.toml",
      "studio/package.json",
      "studio/app/page.tsx",
      "api/main.py",
      "docs/context/PRODUCT-IDENTITY.md",
    ]));
    expect(result.exclusions).toEqual(expect.arrayContaining([
      expect.objectContaining({ relative_path: ".env", reason: "credential_or_environment" }),
      expect.objectContaining({ relative_path: "data", reason: "private_or_bulk_data" }),
      expect.objectContaining({ relative_path: "outputs", reason: "generated_output" }),
    ]));
    expect(JSON.stringify(result)).not.toContain("SECRET_CANARY");
    expect(result.inventory_digest).toMatch(/^[a-f0-9]{64}$/u);
  });
});
```

Add focused adversarial cases in the same file for a symlink escaping the root, a nested `.git` repository, a malformed manifest, a binary file, a file above 2 MiB, and each default excluded directory. Each case asserts an exclusion or warning code, zero leaked canary bytes, and stable digest ordering. Create temporary test roots with `mkdtemp`; skip only the symlink case when the operating system explicitly returns `EPERM` while creating the link.

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/adapter-filesystem/test/inventory.test.ts
```

Expected: FAIL because `inventoryRepository` and the fixture do not exist.

- [ ] **Step 3: Add the fixture with explicit synthetic content**

Use these exact identity anchors:

```toml
# fixtures/synthetic-mixed-stack/pyproject.toml
[project]
name = "synthetic-content-studio"
version = "0.1.0"
description = "Synthetic content-design studio fixture"
requires-python = ">=3.11"
dependencies = ["fastapi>=0.110"]
```

```markdown
<!-- fixtures/synthetic-mixed-stack/docs/context/PRODUCT-IDENTITY.md -->
# Synthetic Studio — Product identity

**Status:** Canonical
**Date:** 2026-08-25

## One sentence

Synthetic Studio is where checkout content designers review and improve product messages.

## Primary user

Checkout content designers who need evidence, recovery context, and an approval-ready diff.

## Workflow

Explore → Analyze → Review → Deliver → Track, with Library and Flow as supporting views.
```

```markdown
<!-- fixtures/synthetic-mixed-stack/PRD.md -->
# Synthetic Studio PRD

**Status:** Draft
**Date:** 2026-01-10

The original concept is a generic copy chatbot with automatic publication.
```

The `.env` value is exactly `CONTENTMD_SECRET=SECRET_CANARY`; `outputs/generated.tsx` contains `GENERATED_OUTPUT_CANARY`; `data/private.json` contains `PRIVATE_DATA_CANARY`. No test may emit any of those values.

- [ ] **Step 4: Add the versioned inventory contracts**

Add to `packages/adapter-sdk/src/adapter.ts`:

```ts
export type InventoryExclusionReason =
  | "credential_or_environment"
  | "private_or_bulk_data"
  | "generated_output"
  | "dependency_or_cache"
  | "binary_or_oversize"
  | "outside_project_root"
  | "user_excluded";

export interface InventoryArtifact {
  relative_path: string;
  content_digest: string;
  byte_length: number;
  extension: string;
}

export interface InventoryExclusion {
  relative_path: string;
  reason: InventoryExclusionReason;
}

export interface StackFact {
  stack_id: string;
  kind: "python" | "javascript" | "typescript" | "static_web" | "documentation";
  workspace_root: string;
  manifest_ref: string;
  framework_hints: string[];
  confidence: "high" | "medium" | "low";
}

export interface DiscoveryCoverage {
  inventoried: number;
  scanned: number;
  skipped: number;
  unsupported: number;
  failed: number;
}

export interface RepositoryInventory {
  contract_version: "contentmd.repository-inventory/0.2.0";
  project_root: string;
  artifacts: InventoryArtifact[];
  exclusions: InventoryExclusion[];
  stacks: StackFact[];
  coverage: DiscoveryCoverage;
  bytes_read: number;
  resource_ceiling: { max_file_bytes: number };
  authority_effect: "none";
  inventory_digest: string;
}
```

- [ ] **Step 5: Implement bounded inventory**

In `inventory.ts`, resolve the root once, use `fast-glob` with `followSymbolicLinks: false`, classify exclusions before reads, reject resolved paths outside the root, read only text files below a fixed 2 MiB per-file ceiling, UTF-8 sort paths, and hash this preimage:

```ts
const preimage = {
  contract_version: "contentmd.repository-inventory/0.2.0" as const,
  project_root: canonicalProjectRoot,
  artifacts,
  exclusions,
  stacks: [],
  coverage,
  authority_effect: "none" as const,
};
return { ...preimage, inventory_digest: sha256Canonical(preimage) };
```

- [ ] **Step 6: Run focused tests and verify GREEN**

Run the Task 1 Vitest command again. Expected: PASS with no canary bytes in output.

- [ ] **Step 7: Commit Task 1**

```bash
git add fixtures/synthetic-mixed-stack packages/adapter-sdk/src/adapter.ts packages/adapter-filesystem/src/inventory.ts packages/adapter-filesystem/src/index.ts packages/adapter-filesystem/test/inventory.test.ts
git commit -m "feat: inventory mixed-stack repositories safely"
```

### Task 2: Stack detection, source candidates, and portable project identity

**Files:**
- Create: `packages/adapter-filesystem/src/stack-detection.ts`
- Create: `packages/adapter-filesystem/src/source-candidates.ts`
- Modify: `packages/adapter-filesystem/src/inventory.ts`
- Modify: `packages/adapter-filesystem/src/index.ts`
- Modify: `packages/agent/src/adoption.ts`
- Test: `packages/adapter-filesystem/test/stack-source-detection.test.ts`
- Test: `packages/agent/test/adoption.test.ts`

**Interfaces:**
- Consumes: `RepositoryInventory`
- Produces: `detectStacks(inventory): Promise<StackFact[]>`
- Produces: `discoverSourceCandidates(inventory): Promise<SourceCandidate[]>`
- Produces: `readSourceDocuments(root, candidates): Promise<ContextSourceDocument[]>`
- Produces: `proposeProjectIdentity(root, inventory): Promise<ProjectIdentityProposal>`

- [ ] **Step 1: Write failing detector tests**

```ts
const inventory = await inventoryRepository({ project_root: root });
const stacks = detectStacks(inventory);
expect(stacks).toEqual(expect.arrayContaining([
  expect.objectContaining({ kind: "python", workspace_root: "", manifest_ref: "pyproject.toml" }),
  expect.objectContaining({ kind: "typescript", workspace_root: "studio", manifest_ref: "studio/package.json" }),
]));

const sources = await discoverSourceCandidates(inventory);
expect(sources.map((item) => item.relative_path)).toEqual(expect.arrayContaining([
  "CLAUDE.md",
  "PRD.md",
  "docs/context/PRODUCT-IDENTITY.md",
  "docs/adr/0001-current-product-shape.md",
]));
expect(sources.find((item) => item.relative_path.endsWith("PRODUCT-IDENTITY.md"))).toMatchObject({
  source_type: "product_identity",
  lifecycle: "canonical",
  evidence_class: "documented",
  authority_effect: "none",
});
```

Add a table-driven shape test with temporary repositories containing exactly these roots:

| Shape | Files | Expected stack/source result |
| --- | --- | --- |
| Python-only | `pyproject.toml`, `app.py` | Python stack; no required Node manifest or product document |
| Node-only | `package.json`, `src/index.ts` | TypeScript/JavaScript stack; no required Python manifest or fixed design filename |
| Documentation-first | `README.md`, `docs/product.md` | Documentation stack and source candidates; no manifest requirement |
| Mixed | committed synthetic fixture | Python root plus nested TypeScript workspace |

Each case must produce a stable proposed project identity, complete coverage, and no invented source filename.

- [ ] **Step 2: Verify RED**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/adapter-filesystem/test/stack-source-detection.test.ts packages/agent/test/adoption.test.ts
```

Expected: FAIL because the detector/source contracts are absent and adoption only checks fixed root filenames.

- [ ] **Step 3: Add source and identity contracts**

Add to `adapter-sdk/src/adapter.ts`:

```ts
export type SourceLifecycle = "canonical" | "active" | "draft" | "historical" | "superseded" | "rejected" | "unknown";
export type EvidenceClass = "documented" | "implemented" | "tested" | "observed" | "approved" | "historical";

export interface SourceCandidate {
  source_id: string;
  relative_path: string;
  source_type: string;
  adapter_id: string;
  adapter_version: string;
  content_digest: string;
  lifecycle: SourceLifecycle;
  evidence_class: EvidenceClass;
  declared_date: string | null;
  declared_owner: string | null;
  scope: {
    products: string[];
    services: string[];
    markets: string[];
    locales: string[];
    surfaces: string[];
    versions: string[];
  };
  discovery_reason: string;
  limitations: string[];
  authority_effect: "none";
}

export interface ProjectIdentityProposal {
  contract_version: "contentmd.project-identity-proposal/0.2.0";
  proposed_project_id: string;
  proposed_name: string;
  evidence_refs: string[];
  confidence: "high" | "medium" | "low";
  authority_effect: "none";
  proposal_digest: string;
}
```

- [ ] **Step 4: Implement manifest-only stack detection**

Parse manifest bytes as data. `pyproject.toml` extraction is limited to `[project].name`, `[project].dependencies`, and tool headings; nested `package.json` extraction is limited to name and dependency/script names. Never execute a package manager.

Use exact framework hints:

```ts
const PYTHON_HINTS = new Map([["fastapi", "fastapi"], ["flask", "flask"], ["django", "django"]]);
const JS_HINTS = new Map([["next", "next"], ["react", "react"], ["vite", "vite"]]);
```

- [ ] **Step 5: Implement source classification and identity proposal**

Classification uses path, document metadata, and content headings as discovery evidence only. The project identity priority is existing valid `.contentmd` record, unambiguous root manifest, unambiguous aggregate, then basename. Normalize to `project.<lowercase-kebab>` and bind the proposal digest to all evidence refs.

`readSourceDocuments()` reads only source-candidate paths already present in the safe inventory, rechecks each current digest, applies the same per-file byte ceiling, and returns the existing `ContextSourceDocument` shape. A changed digest fails with `source_candidate_changed:<relative_path>`.

- [ ] **Step 6: Replace root-only adoption source discovery**

Make `planAdoption()` call inventory, stack detection, source discovery, and identity proposal. Preserve existing `ExistingSource` fields and add optional evidence metadata without changing old JSON assertions.

- [ ] **Step 7: Run focused tests and commit**

Expected: both focused files PASS and existing adoption tests remain GREEN.

```bash
git add packages/adapter-sdk/src/adapter.ts packages/adapter-filesystem/src/inventory.ts packages/adapter-filesystem/src/stack-detection.ts packages/adapter-filesystem/src/source-candidates.ts packages/adapter-filesystem/src/index.ts packages/adapter-filesystem/test/stack-source-detection.test.ts packages/agent/src/adoption.ts packages/agent/test/adoption.test.ts
git commit -m "feat: detect repository stacks and context sources"
```

### Task 3: Parser federation for TypeScript, Next routes, catalogs, and documents

**Files:**
- Create: `packages/adapter-filesystem/src/parsers/types.ts`
- Create: `packages/adapter-filesystem/src/parsers/typescript.ts`
- Create: `packages/adapter-filesystem/src/parsers/documents.ts`
- Modify: `packages/adapter-sdk/src/adapter.ts`
- Modify: `packages/adapter-filesystem/src/discover.ts`
- Modify: `packages/adapter-filesystem/package.json`
- Modify: `pnpm-lock.yaml`
- Test: `packages/adapter-filesystem/test/discover-fixture.test.ts`
- Test: `packages/adapter-filesystem/test/mixed-stack-discovery.test.ts`

**Interfaces:**
- Consumes: `InventoryArtifact`, `SourceCandidate`
- Produces: `RepositoryClaimDraft`, `ArtifactParser`, `ParserResult`, expanded `DiscoveredContentOccurrence`
- Preserves: existing TS/TSX/JSON/HTML occurrence identities for the synthetic web fixture

- [ ] **Step 1: Add failing backwards-compatibility and Next/document tests**

```ts
const result = await new FilesystemContentAdapter().discover({ project_root: mixedRoot });
expect(result.scanned_artifacts).toContain("studio/app/analyze/page.tsx");
expect(result.occurrences).toEqual(expect.arrayContaining([
  expect.objectContaining({ route: "/analyze", expression_payload: "Nothing to analyze yet" }),
  expect.objectContaining({ modality: "assistive", expression_payload: "Open analysis help" }),
]));
expect(result.source_candidates).toEqual(expect.arrayContaining([
  expect.objectContaining({ relative_path: "docs/context/PRODUCT-IDENTITY.md" }),
]));
expect(result.coverage.failed).toBe(0);
```

Retain the existing five representative JS/HTML/catalog assertions byte-for-byte.

- [ ] **Step 2: Verify RED**

Run both adapter discovery tests. Expected: mixed-stack assertions FAIL while the legacy fixture still passes.

- [ ] **Step 3: Add the portable claim-draft and parser federation contracts**

Add `RepositoryClaimDraft` to `packages/adapter-sdk/src/adapter.ts`; it is adapter-neutral and must not import from the filesystem adapter:

```ts
export interface RepositoryClaimDraft {
  claim_kind:
    | "product_identity"
    | "audience_job"
    | "workflow_stage"
    | "product_scope"
    | "architecture_decision"
    | "implemented_behavior"
    | "content_expression"
    | "voice_guidance"
    | "terminology_guidance";
  subject: string;
  value: string | string[];
  source_ref: string;
  source_span: { start_line: number; end_line: number };
  source_links: Array<{ label: string; target: string; line: number }>;
  confidence: "high" | "medium" | "low";
  limitations: string[];
  authority_effect: "none";
}
```

Add the parser-only contracts to `packages/adapter-filesystem/src/parsers/types.ts` and import `RepositoryClaimDraft` from the SDK:

```ts
export interface ParserInput {
  project_root: string;
  artifact: InventoryArtifact;
  source: string;
  stack_facts: StackFact[];
}

export interface ParserResult {
  occurrences: OccurrenceDraft[];
  claims: RepositoryClaimDraft[];
  warnings: string[];
  unsupported: string[];
}

export interface ArtifactParser {
  parser_id: string;
  supports(input: ParserInput): boolean;
  parse(input: ParserInput): ParserResult;
}
```

- [ ] **Step 4: Move current extraction behind `typescript.ts`**

Move, do not rewrite, the existing TS AST, JSX attribute, object-property, JSON catalog, and HTML extraction functions. Add Next App Router route derivation:

```ts
export function nextRouteFromPath(path: string): string | null {
  const match = /^(.+\/)?app\/(.+\/)?page\.tsx$/u.exec(path);
  if (match === null) return null;
  const segments = (match[2] ?? "").split("/").filter((segment) => segment.length > 0 && !/^\(.+\)$/u.test(segment));
  return `/${segments.join("/")}`.replace(/\/$/u, "") || "/";
}
```

- [ ] **Step 5: Implement document parsing**

Parse Markdown headings, bold metadata lines (`Status`, `Date`, `Owner`), explicit links, tables, and ordered workflow arrows. Parse YAML with `yaml@2.9.0` using `parseDocument` and reject duplicate keys. Emit section-level claims with exact line coordinates; do not treat free prose as an approved fact.

- [ ] **Step 6: Orchestrate parsers from the safe inventory**

`discoverFilesystemContent()` must iterate only `inventory.artifacts`, select all supporting parsers, merge results deterministically, and report scanned/skipped/unsupported/failed counts. A parser exception increments `failed` and emits `parser_failed:<parser_id>:<path>`; it never marks the artifact scanned successfully.

Expand `DiscoverResult` explicitly at this point so later tasks do not depend on undeclared fields:

```ts
export interface DiscoverResult {
  adapter_id: string;
  adapter_version: string;
  project_root: string;
  scan_digest: string;
  inventory: RepositoryInventory;
  source_candidates: SourceCandidate[];
  parser_claims: RepositoryClaimDraft[];
  coverage: DiscoveryCoverage;
  scanned_artifacts: string[];
  occurrences: DiscoveredContentOccurrence[];
  warnings: string[];
}
```

Include `parser_claims` in `scan_digest`. Task 5 adds canonical `evidence_claims` after deterministic draft finalization. Add all new Task 3 fields to the existing synthetic fixture assertions so compatibility is explicit rather than supplied by hidden defaults.

- [ ] **Step 7: Update lockfile and run tests**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/corepack pnpm install --offline
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/adapter-filesystem/test/discover-fixture.test.ts packages/adapter-filesystem/test/mixed-stack-discovery.test.ts
```

Expected: legacy and mixed-stack tests PASS; no canary appears.

- [ ] **Step 8: Commit Task 3**

```bash
git add packages/adapter-filesystem packages/adapter-sdk/src/adapter.ts pnpm-lock.yaml
git commit -m "feat: federate document and TypeScript discovery"
```

### Task 4: Conservative Python, FastAPI, and template discovery

**Files:**
- Create: `packages/adapter-filesystem/src/parsers/python.ts`
- Modify: `packages/adapter-filesystem/src/discover.ts`
- Test: `packages/adapter-filesystem/test/python-discovery.test.ts`

**Interfaces:**
- Consumes: `ParserInput`
- Produces: Python `route_declaration`, `route_metadata`, `user_facing_literal`, and template occurrences
- Does not execute or import Python

- [ ] **Step 1: Write failing Python extraction and false-positive tests**

```ts
const result = await new FilesystemContentAdapter().discover({ project_root: mixedRoot });
expect(result.occurrences).toEqual(expect.arrayContaining([
  expect.objectContaining({
    source_artifact: "api/main.py",
    route: "/api/analysis",
    syntax_kind: "route_metadata",
    expression_payload: "Analyze product content",
  }),
  expect.objectContaining({
    source_artifact: "templates/recovery.html",
    syntax_kind: "html_text",
    expression_payload: "Try another product or stage.",
  }),
]));
expect(result.occurrences.map((item) => item.expression_payload)).not.toContain("database connection failed");
```

- [ ] **Step 2: Verify RED**

Run the new test. Expected: FAIL with missing Python/template occurrences.

- [ ] **Step 3: Implement a non-executing Python scanner**

Extend `ContentSyntaxKind` additively with `route_declaration`, `route_metadata`, `user_facing_literal`, and `html_text`; retain every existing member and update exhaustive switches.

Recognize only statically quoted values in:

- FastAPI decorators `@app.<method>("/path", summary="...", description="...")`;
- `HTTPException(detail="...")`;
- Pydantic `Field(description="...", title="...")`; and
- named response/message dictionaries with approved content keys.

Dynamic expressions produce `unsupported_dynamic_python_expression:<path>:<line>` and no occurrence. Exclude logger calls, exception class names, SQL, telemetry, and arbitrary assignments.

- [ ] **Step 4: Add template extraction**

Reuse safe HTML extraction for `.html`/`.jinja`/`.jinja2` files. Preserve template variables as variables and normalize only visible whitespace.

- [ ] **Step 5: Run focused and legacy tests**

Run Python discovery plus legacy discovery. Expected: PASS.

- [ ] **Step 6: Commit Task 4**

```bash
git add packages/adapter-filesystem/src/parsers/python.ts packages/adapter-filesystem/src/discover.ts packages/adapter-filesystem/test/python-discovery.test.ts
git commit -m "feat: discover Python and template content safely"
```

### Task 5: Evidence claims, contextual authority, conflict, and supersession

**Files:**
- Create: `packages/core/src/evidence-claims.ts`
- Modify: `packages/core/src/index.ts`
- Modify: `packages/adapter-sdk/src/adapter.ts`
- Modify: `packages/adapter-filesystem/src/parsers/documents.ts`
- Test: `packages/core/test/evidence-claims.test.ts`
- Test: `packages/adapter-filesystem/test/mixed-stack-discovery.test.ts`

**Interfaces:**
- Produces: `EvidenceClaim`, `ClaimKind`, `AuthorityAssessment`, `resolveAuthority(claims)`
- Consumes: source candidates and exact source spans

- [ ] **Step 1: Write failing authority tests**

```ts
function claim(input: {
  id: string;
  kind: ClaimKind;
  lifecycle?: SourceLifecycle;
  value?: JsonValue;
  date?: string | null;
  evidence_class?: EvidenceClass;
}): EvidenceClaim {
  const preimage = {
    claim_id: input.id,
    claim_kind: input.kind,
    subject: "synthetic-subject",
    value: input.value ?? "synthetic-value",
    evidence_class: input.evidence_class ?? "documented",
    source_ref: `source.${input.id}`,
    source_span: { start_line: 1, end_line: 1 },
    lifecycle: input.lifecycle ?? "unknown",
    effective_date: input.date ?? null,
    scope: ["synthetic-fixture"],
    confidence: "high" as const,
    limitations: [],
    authority_effect: "none" as const,
  };
  return { ...preimage, claim_digest: sha256Canonical(preimage) };
}

const assessments = resolveAuthority([
  claim({ id: "current", kind: "product_identity", lifecycle: "canonical", value: "Evidence-first studio", date: "2026-08-25" }),
  claim({ id: "draft", kind: "product_identity", lifecycle: "draft", value: "Generic chatbot", date: "2026-01-10" }),
]);
expect(assessments).toContainEqual(expect.objectContaining({
  claim_kind: "product_identity",
  selected_claim_ref: "current",
  conflicting_claim_refs: ["draft"],
  resolution: "explicit_lifecycle_and_scope",
  authority_effect: "none",
}));

expect(() => resolveAuthority([
  claim({ id: "a", kind: "organizational_approval", evidence_class: "implemented" }),
])).not.toThrow();
expect(resolveAuthority([claim({ id: "a", kind: "organizational_approval", evidence_class: "implemented" })])[0])
  .toMatchObject({ resolution: "unresolved", selected_claim_ref: null });
```

- [ ] **Step 2: Verify RED**

Run the new core test. Expected: FAIL because claim contracts do not exist.

- [ ] **Step 3: Define the canonical claim contracts**

```ts
export type ClaimKind =
  | "product_identity"
  | "audience_job"
  | "workflow_stage"
  | "product_scope"
  | "architecture_decision"
  | "organizational_policy"
  | "implemented_behavior"
  | "live_behavior"
  | "content_expression"
  | "voice_guidance"
  | "terminology_guidance"
  | "organizational_approval";

export interface EvidenceClaim {
  claim_id: string;
  claim_kind: ClaimKind;
  subject: string;
  value: JsonValue;
  evidence_class: EvidenceClass;
  source_ref: string;
  source_span: { start_line: number; end_line: number };
  lifecycle: SourceLifecycle;
  effective_date: string | null;
  scope: string[];
  confidence: "high" | "medium" | "low";
  limitations: string[];
  authority_effect: "none";
  claim_digest: string;
}
```

- [ ] **Step 4: Implement claim-kind-specific resolution**

Use explicit applicability rules, not one global score. Organizational approvals select only `approved` evidence from a configured authority source; live behavior selects only observed evidence; implemented behavior can select implemented/tested evidence; product identity and decisions can use explicit canonical/active documented evidence. Unresolved ties preserve all claims.

- [ ] **Step 5: Emit explicit document claims**

The document parser emits parser drafts only from structured metadata, section labels, table rows, and arrow workflows. Add `finalizeEvidenceClaim(draft, candidate)` to bind the source candidate, lifecycle, evidence class, exact span, scope, and canonical digest. Import `EvidenceClaim` into the SDK as a type-only dependency from `@contentmd/core`, extend `DiscoverResult` with `evidence_claims: EvidenceClaim[]`, populate it with finalized claims, and include it in `scan_digest`. Free prose is available to the later interpretation packet but does not silently become a deterministic claim.

- [ ] **Step 6: Run tests and commit**

```bash
git add packages/core/src/evidence-claims.ts packages/core/src/index.ts packages/core/test/evidence-claims.test.ts packages/adapter-sdk/src/adapter.ts packages/adapter-filesystem/src/parsers/documents.ts packages/adapter-filesystem/test/mixed-stack-discovery.test.ts
git commit -m "feat: resolve repository evidence contextually"
```

### Task 6: Evidence-linked provisional model compiler

**Files:**
- Modify: `packages/core/src/content-graph.ts`
- Modify: `packages/core/src/context-compiler.ts`
- Modify: `packages/agent/src/model-workflow.ts`
- Test: `packages/core/test/context-compiler.test.ts`
- Test: `packages/agent/test/model-workflow.test.ts`

**Interfaces:**
- Consumes: `project_id`, `SourceCandidate[]`, `EvidenceClaim[]`, `AuthorityAssessment[]`, discovery occurrences
- Produces: deterministic `ProjectModelResult` without required filenames
- Preserves: existing graph determinism and occurrence identities

- [ ] **Step 1: Replace filename assumptions in failing tests**

Add a mixed-stack model test:

```ts
const result = await compileProjectModel({ project_root: mixedRoot });
expect(result.project_id).toBe("project.synthetic-content-studio");
expect(result.sources.map((source) => source.locator)).toContain("docs/context/PRODUCT-IDENTITY.md");
expect(result.graph.nodes).toEqual(expect.arrayContaining([
  expect.objectContaining({ node_type: "product", label: "Synthetic Studio" }),
  expect.objectContaining({ node_type: "audience", label: "checkout content designers" }),
  expect.objectContaining({ node_type: "journey", label: "Explore → Analyze → Review → Deliver → Track" }),
  expect.objectContaining({ node_type: "conflict", attributes: expect.objectContaining({ status: "resolved_provisionally" }) }),
]));
```

Keep the original synthetic-web-app determinism assertions.

- [ ] **Step 2: Verify RED**

Run core and agent model tests. Expected: mixed-stack test fails with missing root `package.json` before implementation.

- [ ] **Step 3: Extend graph node types**

Add `evidence_claim`, `authority_assessment`, `conflict`, `persona`, `voice_dimension`, and `coverage_gap` to `ContentGraphNodeType`. All remain `lifecycle_state: "proposed"` and `authority_effect: "none"` in this projection.

- [ ] **Step 4: Rewrite `compileProjectModel()` orchestration**

```ts
export async function compileProjectModel(request: CompileProjectModelRequest): Promise<ProjectModelResult> {
  const projectRoot = await realpath(request.project_root);
  const discovery = await new FilesystemContentAdapter().discover({ project_root: projectRoot });
  const identity = await proposeProjectIdentity(projectRoot, discovery.inventory);
  const sources = await readSourceDocuments(projectRoot, discovery.source_candidates);
  const assessments = resolveAuthority(discovery.evidence_claims);
  const graph = compileContentContext({
    project_id: identity.proposed_project_id,
    sources,
    claims: discovery.evidence_claims,
    authority_assessments: assessments,
    discovery: { scan_digest: discovery.scan_digest, occurrences: discovery.occurrences },
  });
  return { project_id: identity.proposed_project_id, identity, sources, discovery, assessments, graph };
}
```

- [ ] **Step 5: Replace the two phrase-specific compiler heuristics**

Remove `primaryAudience()`, `primaryJob()`, and the fixture-specific product-fact parsing path from model compilation. Build nodes from selected or unresolved claims; build message/occurrence nodes from discovery. When no claim establishes a value, emit an evidence-linked open question rather than a generic invented audience/job.

- [ ] **Step 6: Run model tests and commit**

```bash
git add packages/core/src/content-graph.ts packages/core/src/context-compiler.ts packages/core/test/context-compiler.test.ts packages/agent/src/model-workflow.ts packages/agent/test/model-workflow.test.ts
git commit -m "feat: compile evidence-linked repository models"
```

### Task 7: Bounded IDE interpretation and proposed guidance ingestion

**Files:**
- Create: `packages/agent/src/repository-interpretation.ts`
- Modify: `packages/agent/src/index.ts`
- Modify: `packages/cli/src/commands/model.ts`
- Test: `packages/agent/test/repository-interpretation.test.ts`
- Test: `packages/cli/test/model-interpretation.test.ts`

**Interfaces:**
- Produces: `createRepositoryInterpretationPacket(model): RepositoryInterpretationPacket`
- Produces: `ingestRepositoryInterpretation(root, response): Promise<ProposedInterpretationReceipt>`
- CLI: `contentmd model packet --root <path> --json`
- CLI: `contentmd model ingest --root <path> --input <file> --json`

- [ ] **Step 1: Write failing bounded-context tests**

```ts
const packet = createRepositoryInterpretationPacket(model);
expect(packet.context_items.every((item) => model.sources.some((source) => source.source_id === item.source_ref))).toBe(true);
expect(JSON.stringify(packet)).not.toContain("PRIVATE_DATA_CANARY");
expect(packet.requested_claim_kinds).toEqual([
  "product_identity",
  "audience_job",
  "workflow_stage",
  "voice_guidance",
  "terminology_guidance",
]);
```

Add rejection tests for nonexistent refs, out-of-span citations, `approved` status, publication authority, unknown claim kinds, extra keys, and changed source digests.

- [ ] **Step 2: Verify RED**

Run the new agent and CLI tests. Expected: FAIL because interpretation operations are absent.

- [ ] **Step 3: Define packet and response schemas in TypeScript**

```ts
export interface RepositoryInterpretationPacket {
  contract_version: "contentmd.repository-interpretation-packet/0.1.0";
  project_id: string;
  inventory_ref: string;
  context_items: Array<{ source_ref: string; locator: string; content_digest: string; bounded_text: string }>;
  requested_claim_kinds: ClaimKind[];
  output_contract: "contentmd.repository-interpretation-response/0.1.0";
  authority_effect: "none";
  packet_digest: string;
}
```

The response may add only proposed claims, persona candidates, voice dimensions, terminology candidates, conflicts, and open questions. It cannot submit approvals, grants, mutations, publication status, or observed-live claims.

- [ ] **Step 4: Implement validation and local receipt**

Replay every citation against current source bytes and exact line ranges. Write accepted proposed claims atomically to `.contentmd/records/repository-interpretation.json`; write a receipt to `.contentmd/runtime/repository-interpretation-receipt.json`. Reject a changed source with `interpretation_source_changed`.

- [ ] **Step 5: Add provider-neutral CLI commands**

`model packet` emits the exact packet for the current IDE agent. `model ingest` accepts a response file and never invokes a provider. Existing `contentmd model` remains deterministic and merges valid previously ingested proposed claims.

- [ ] **Step 6: Run tests and commit**

```bash
git add packages/agent/src/repository-interpretation.ts packages/agent/src/index.ts packages/agent/test/repository-interpretation.test.ts packages/cli/src/commands/model.ts packages/cli/test/model-interpretation.test.ts
git commit -m "feat: add bounded IDE repository interpretation"
```

### Task 8: Provisional `CONTENT.md` and atomic one-command adoption

**Files:**
- Modify: `packages/agent/src/content-contract.ts`
- Modify: `packages/agent/src/adoption.ts`
- Modify: `packages/agent/src/host-bridge.ts`
- Modify: `packages/cli/src/commands/init.ts`
- Modify: `packages/cli/src/commands/start.ts`
- Test: `packages/agent/test/adoption.test.ts`
- Test: `packages/agent/test/host-bridge.test.ts`
- Test: `packages/cli/test/start.test.ts`
- Test: `packages/cli/test/init.test.ts`

**Interfaces:**
- Produces: one `AdoptionPlan` covering owned files and all host bridges
- Executes: `executeAdoption(plan, approval)` atomically with rollback
- CLI preview: `contentmd init --root <path> --json`
- CLI apply: `contentmd init --root <path> --yes --plan-digest <digest> --json`

- [ ] **Step 1: Write failing CLI plan-digest and combined-bridge tests**

```ts
const preview = await run(["init", "--root", root, "--json"], [20]);
expect(preview.data).toMatchObject({
  adoption: {
    identity: { proposed_project_id: "project.synthetic-content-studio" },
    bridge_previews: [expect.objectContaining({ host: "claude", relative_path: "CLAUDE.md" })],
  },
});
await expect(run(["init", "--root", root, "--yes", "--json"], [22]))
  .resolves.toMatchObject({ status: "invalid_input" });
const applied = await run([
  "init", "--root", root, "--yes", "--plan-digest", preview.record_refs[0], "--json",
]);
expect(applied.status).toBe("completed");
expect(await readFile(join(root, "CLAUDE.md"), "utf8")).toContain("<!-- contentmd:bridge:start -->");
```

- [ ] **Step 2: Verify RED**

Run the four focused test files. Expected: FAIL because init currently requires `--yes`, accepts no plan digest, and executes bridges separately.

- [ ] **Step 3: Render a provisional evidence-linked contract**

`renderContentContract()` receives identity, selected claims, conflicts, source candidates, and open questions. Render these headings exactly:

```markdown
# CONTENT.md

> Guidance status: provisional. Review structured records before treating a proposal as approved.

## Product and scope
## Users and jobs
## Journeys and content principles
## Voice and terminology
## Sources, evidence, and conflicts
## Operating boundaries
## Review and approval routes
## Structured records
```

Keep the file below 250 lines in the fixture test; link detailed records by relative path.

- [ ] **Step 4: Make adoption one exact transaction**

Include new owned files, manifest, policy, open questions, provisional model records, `CONTENT.md`, and every detected host bridge in one plan digest. Before writes, re-read every target digest. Use temporary files plus atomic rename; on failure, restore original host bytes and remove newly created owned files.

- [ ] **Step 5: Implement preview-first CLI semantics**

In JSON/non-interactive mode, no `--yes` returns the plan with exit 20. `--yes` requires `--plan-digest`. In an interactive TTY, show the same preview and prompt once; the affirmative answer binds the displayed digest. No network call or provider operation occurs.

- [ ] **Step 6: Verify uninstall ownership remains exact**

Add a test that previews uninstall after combined adoption and confirms only installer-created `CONTENT.md`, managed `.contentmd` files, and exact marker blocks are affected. A user edit outside markers remains byte-identical.

- [ ] **Step 7: Run tests and commit**

```bash
git add packages/agent/src/content-contract.ts packages/agent/src/adoption.ts packages/agent/src/host-bridge.ts packages/agent/test/adoption.test.ts packages/agent/test/host-bridge.test.ts packages/cli/src/commands/init.ts packages/cli/src/commands/start.ts packages/cli/test/start.test.ts packages/cli/test/init.test.ts
git commit -m "feat: adopt repositories in one reviewed transaction"
```

### Task 9: Repository-derived IDE task packet and governed candidate review

**Files:**
- Modify: `packages/writer/src/task-packet.ts`
- Create: `packages/agent/src/task-workflow.ts`
- Modify: `packages/agent/src/local-runtime.ts`
- Modify: `packages/agent/src/index.ts`
- Create: `packages/cli/src/commands/task.ts`
- Modify: `packages/cli/src/index.ts`
- Test: `packages/writer/test/task-packet.test.ts`
- Test: `packages/agent/test/task-workflow.test.ts`
- Test: `packages/cli/test/task.test.ts`

**Interfaces:**
- Produces: `prepareContentTask(root, request): Promise<PreparedContentTask>`
- Produces: `reviewIdeCandidate(root, input): Promise<ReviewedIdeCandidate>`
- CLI: `contentmd task prepare --request <text> --target <path:line> --root <path> --json`
- CLI: `contentmd task review --input <candidate.json> --root <path> --json`

- [ ] **Step 1: Write failing task binding tests**

```ts
const prepared = await prepareContentTask(mixedRoot, {
  request: "Improve the Analyze empty state",
  target: "studio/app/analyze/page.tsx:8",
});
expect(prepared.task).toMatchObject({
  target_occurrence_refs: [expect.stringMatching(/^occurrence\./u)],
  voice_profile_refs: expect.any(Array),
  terminology_refs: expect.any(Array),
  decision_status: "proposed",
  authority_effect: "none",
});
expect(prepared.context_items.every((item) => prepared.task.evidence_refs.includes(item.source_ref.record_id))).toBe(true);
```

Add candidate-review tests that reject invented product behavior, absent source refs, extra target files, claimed approval, forbidden keys, and stale task digests.

- [ ] **Step 2: Verify RED**

Run writer, agent, and CLI task tests. Expected: FAIL because the packet lacks the new fields and local runtime still constructs `fixtureTask()`.

- [ ] **Step 3: Extend `ContentTaskPacket` additively**

Add these required fields and bind them into `task_digest`:

```ts
target_occurrence_refs: string[];
voice_profile_refs: string[];
terminology_refs: string[];
decision_status: "proposed" | "reviewed" | "approved";
```

`target_occurrence_refs` remains a non-empty canonical set. `voice_profile_refs` and `terminology_refs` are canonical sets that may be empty when guidance is not established; the packet's context and review output must then expose the corresponding uncertainty. Update every existing fixture explicitly; do not supply hidden defaults.

- [ ] **Step 4: Prepare tasks from the repository model**

Resolve the exact target occurrence, applicable route/state, selected evidence, conflicts, product constraints, prohibited claims, voice/terminology candidates, risk, and acceptance criteria. If product behavior that changes meaning is missing, return `product_behavior_unknown` with the missing claim kind; do not manufacture a packet.

- [ ] **Step 5: Validate IDE candidate output**

The candidate schema is:

```ts
interface IdeWritingCandidate {
  contract_version: "contentmd.ide-writing-candidate/0.1.0";
  task_digest: string;
  alternatives: Array<{ candidate_id: string; text: string; rationale: string; evidence_refs: string[] }>;
  recommended_candidate_id: string | null;
  claimed_authority_effect: "none";
}
```

Run existing deterministic review plus task-specific fact, recovery, accessibility, terminology, and voice checks. Output explanation, uncertainty, trade-offs, and an exact preview diff; never apply.

- [ ] **Step 6: Add provider-neutral CLI commands**

`task prepare` emits the packet for the current IDE model. `task review` ingests the model's structured response and writes only a local runtime review receipt. Existing provider-backed draft commands remain optional and use the same task contract.

- [ ] **Step 7: Run tests and commit**

```bash
git add packages/writer/src/task-packet.ts packages/writer/test/task-packet.test.ts packages/agent/src/task-workflow.ts packages/agent/src/local-runtime.ts packages/agent/src/index.ts packages/agent/test/task-workflow.test.ts packages/cli/src/commands/task.ts packages/cli/src/index.ts packages/cli/test/task.test.ts
git commit -m "feat: prepare governed IDE writing tasks"
```

### Task 10: Local task-first sidecar

**Files:**
- Create: `packages/workbench/package.json`
- Create: `packages/workbench/tsconfig.json`
- Create: `packages/workbench/src/index.ts`
- Create: `packages/workbench/src/render.ts`
- Create: `packages/workbench/src/server.ts`
- Create: `packages/workbench/test/render.test.ts`
- Create: `packages/workbench/test/server.test.ts`
- Create: `packages/cli/src/commands/serve.ts`
- Modify: `packages/cli/src/index.ts`
- Modify: `packages/cli/package.json`
- Modify: `tsconfig.json`
- Modify: `pnpm-lock.yaml`
- Test: `packages/cli/test/serve.test.ts`

**Interfaces:**
- Produces: `renderWorkbench(model, taskReview): string`
- Produces: `startWorkbench({ root, host, port }): Promise<WorkbenchServer>`
- CLI: `contentmd serve --root <path> --host 127.0.0.1 --port 4178`

- [ ] **Step 1: Write failing rendering and local-server tests**

```ts
const html = renderWorkbench(modelFixture, reviewFixture);
expect(html).toContain("Task and context");
expect(html).toContain("Proposal and diff");
expect(html).toContain("Evidence and control");
expect(html).toContain("Guidance status: provisional");
expect(html).not.toContain("PRIVATE_DATA_CANARY");

const server = await startWorkbench({ root, host: "127.0.0.1", port: 0 });
const response = await fetch(server.url);
expect(response.headers.get("content-security-policy")).toContain("default-src 'self'");
await server.close();
```

- [ ] **Step 2: Verify RED**

Run the workbench and CLI serve tests. Expected: FAIL because the package and command do not exist.

- [ ] **Step 3: Create a dependency-light workbench package**

Use Node HTTP and escaped server-rendered HTML. No framework or CDN. The page renders three primary panes and secondary sections for product, journeys, IA, messages, voice/personas, evidence/conflicts, decisions, and governance. Voice dimensions render as accessible `<meter>` elements with textual endpoints; journey relationships render as semantic ordered lists and inline SVG generated from escaped labels.

- [ ] **Step 4: Add strict local-server behavior**

Bind to `127.0.0.1` by default. Serve only `/`, `/model.json`, and `/task.json`. Add CSP `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'none'; frame-ancestors 'none'`, `X-Content-Type-Options: nosniff`, and `Cache-Control: no-store`. Never serve arbitrary filesystem paths or raw source contents.

- [ ] **Step 5: Add `contentmd serve`**

The command runs doctor first, loads `.contentmd/runtime/model.json` and optional task review, starts the local server, and prints the URL. Missing model returns `blocked_by_evidence` with `Run contentmd model first.` It does not open a GUI automatically in noninteractive mode.

- [ ] **Step 6: Register package references and lockfile**

Add `packages/workbench` after `packages/agent` and before `packages/cli` in `tsconfig.json`; declare only workspace dependencies needed by imports. Update lockfile offline.

- [ ] **Step 7: Run tests and commit**

```bash
git add packages/workbench packages/cli/src/commands/serve.ts packages/cli/src/index.ts packages/cli/package.json packages/cli/test/serve.test.ts tsconfig.json pnpm-lock.yaml
git commit -m "feat: add local content task sidecar"
```

### Task 11: End-to-end CLI adoption, modeling, task, and readback fixture

**Files:**
- Modify: `packages/cli/test/vertical-slice.test.ts`
- Modify: `packages/cli/src/main.ts`
- Modify: `packages/agent/src/change-workflow.ts`
- Modify: `packages/agent/src/doctor.ts`
- Modify: `packages/agent/src/local-artifacts.ts`
- Test: `packages/agent/test/change-workflow.test.ts`
- Test: `packages/agent/test/doctor.test.ts`

**Interfaces:**
- Consumes all prior task interfaces
- Produces a complete local fixture flow with adoption, interpretation, task preparation, candidate review, decision, apply, verification, and uninstall preview

- [ ] **Step 1: Write the failing mixed-stack vertical flow**

The test copies `fixtures/synthetic-mixed-stack` to a temp directory and performs:

```ts
const preview = await run(["init", "--root", root, "--json"], [20]);
await run(["init", "--root", root, "--yes", "--plan-digest", preview.record_refs[0], "--json"]);
const discovered = await run(["discover", "--root", root, "--json"]);
const modeled = await run(["model", "--root", root, "--json"]);
const task = await run([
  "task", "prepare", "--root", root,
  "--request", "Improve the Analyze empty state",
  "--target", "studio/app/analyze/page.tsx:8",
  "--json",
]);
expect(discovered.data.coverage.failed).toBe(0);
expect(modeled.data.graph.nodes.some((node: { label: string }) => node.label === "checkout content designers")).toBe(true);
expect(task.status).toBe("completed");
```

Then write a valid synthetic IDE candidate, review it, record approval, preview/apply the exact target, verify readback, and confirm uninstall preview owns no original fixture source.

- [ ] **Step 2: Verify RED**

Run the vertical-slice test. Expected: FAIL at the first missing integrated behavior.

- [ ] **Step 3: Route all CLI commands through repository-derived artifacts**

Remove remaining use of `fixtureTask()` and filename-specific source parsing from production paths. Doctor reports inventory/model coverage, source conflicts, missing owner, host bridge state, and permission status separately.

- [ ] **Step 4: Enforce target-specific apply and readback**

Change preview binds task digest, reviewed candidate digest, target occurrence ID, before bytes, after bytes, and policy decision. Apply rejects changed source bytes. Verify reparses the target and confirms the expected expression and coordinates. No other path may change.

- [ ] **Step 5: Run the vertical slice and all touched package tests**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/adapter-filesystem/test packages/core/test packages/agent/test packages/writer/test packages/workbench/test packages/cli/test
```

Expected: PASS.

- [ ] **Step 6: Commit Task 11**

```bash
git add packages/cli/src/main.ts packages/cli/test/vertical-slice.test.ts packages/agent/src/change-workflow.ts packages/agent/src/doctor.ts packages/agent/src/local-artifacts.ts packages/agent/test/change-workflow.test.ts packages/agent/test/doctor.test.ts
git commit -m "feat: complete mixed-stack content task loop"
```

### Task 12: Verification gates, documentation, and live Carter acceptance packet

**Files:**
- Modify: `README.md`
- Modify: `scripts/verify-foundation.mjs`
- Create: `scripts/verify-repository-intelligence.mjs`
- Create: `docs/verification/host-agnostic-repository-intelligence-0.2.md`
- Create: `docs/pilot/carter-repository-intelligence-acceptance.md`
- Modify: `package.json`

**Interfaces:**
- Produces: `pnpm verify:repository-intelligence`
- Produces: privacy-minimized live Carter acceptance instructions and receipt format
- Does not authorize Carter mutation

- [ ] **Step 1: Add the failing verifier contract**

The verifier must run the mixed-stack fixture flow in a fresh temp directory, assert exact coverage, scan stdout/stderr/runtime JSON for all three canaries, confirm no network attempt through a denial preload, and confirm fixture bytes before/after except approved target and installer-owned paths.

Register:

```json
"verify:repository-intelligence": "node scripts/verify-repository-intelligence.mjs"
```

- [ ] **Step 2: Run verifier and verify RED**

Run:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-repository-intelligence.mjs
```

Expected: FAIL until the verifier script and evidence document are complete.

- [ ] **Step 3: Implement verification script**

Use `mkdtemp`, `cp`, `execFile`, and SHA-256 inventory. Never use shell interpolation. Print one final canonical JSON line containing Node version, fixture digest, test counts, canary checks, network-denial result, before/after integrity, and verifier digest.

- [ ] **Step 4: Document one-command and IDE usage**

README commands:

```bash
npx contentmd init
contentmd model packet --json
contentmd task prepare --request "Review this empty state" --target path/to/file.tsx:42 --json
contentmd task review --input ide-candidate.json --json
contentmd serve
```

Explain that package acquisition may use the package manager, while the content.md runtime performs no repository-intelligence network request.

- [ ] **Step 5: Write the live Carter acceptance packet**

The packet names the exact read-only preflight, exclusions, expected stack/source/model assertions, privacy-minimized receipt fields, and separate approval required before any Carter adoption or source mutation. It explicitly states that repository evidence does not prove live deployment or organizational approval.

- [ ] **Step 6: Run complete verification gates**

Run in this order:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-repository-intelligence.mjs
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/corepack pnpm exec tsc -b tsconfig.json --pretty false
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-foundation.mjs
git diff --check
```

Expected: all pass. If the foundation clean-install gate fails for external network/cache reasons, report its exact child output and do not claim the gate passed.

- [ ] **Step 7: Run the read-only Carter preflight**

Run the committed CLI against Carter with `start`, `discover`, and `model packet` only. Confirm:

- Python plus nested Next stacks;
- current product identity, audience, and workflow candidates;
- no scan of `outputs/`, `data/`, `.env`, caches, or unrelated dirty files;
- explicit draft/current conflicts;
- no write, network, Figma, GCH, ECM, GitHub, or Confluence effect.

Do not run `init --yes`, task apply, or any connector write without a separate Carter-specific approval.

- [ ] **Step 8: Prepare—but do not cross—the Carter mutation gate**

After the read-only preflight, generate a privacy-minimized Carter acceptance proposal containing the exact adoption-plan digest, exact target occurrence, before digest, proposed candidate, expected after digest, verification command, rollback ownership, and all intended file paths. Record acceptance criterion 14 as `pending_separate_carter_approval`. Only a new, explicit approval of that exact proposal authorizes running Carter adoption, apply, verified readback, and rollback/uninstall preview; the implementation-spec approval does not authorize those mutations.

- [ ] **Step 9: Commit Task 12**

```bash
git add README.md package.json scripts/verify-foundation.mjs scripts/verify-repository-intelligence.mjs docs/verification/host-agnostic-repository-intelligence-0.2.md docs/pilot/carter-repository-intelligence-acceptance.md
git commit -m "docs: verify host-agnostic repository intelligence"
```

## Final Review Gate

### Spec coverage matrix

| Design spec sections | Implementation tasks |
| --- | --- |
| 1–6 context, goals, non-goals, principles, architecture | Global constraints and Tasks 1–12 |
| 7 repository boundary, exclusions, inventory, identity | Tasks 1–2 |
| 8–9 stack detection and source candidates | Task 2 |
| 10 evidence, lifecycle, conflicts, approval boundary | Tasks 5–6 and 9 |
| 11 adapter federation and common output | Tasks 3–5 |
| 12 provisional model, status, confidence | Tasks 6–7 |
| 13 generated `CONTENT.md` | Task 8 |
| 14 voice, personas, visual sidecar | Tasks 7–10 |
| 15 IDE handoff and provider neutrality | Tasks 7 and 9 |
| 16 one-command adoption, ownership, uninstall | Task 8 |
| 17 task lifecycle | Tasks 9 and 11 |
| 18 Carter acceptance journey | Task 12 |
| 19–21 refusal, security, privacy, determinism, performance | Tasks 1–9 and 12 verification gates |
| 22 compatibility and migration | Tasks 3, 8, and 11 |
| 23 testing strategy | Every task, with full gates in Task 12 |
| 24 acceptance criteria and 25 delivery boundary | Task 12 and this final review gate |

Before execution is called complete:

- confirm every requirement in the design spec maps to a task or an explicitly deferred non-goal;
- confirm no committed fixture contains Carter, PayPal, private, or third-party protected expression;
- confirm no target-repository script or import executed during discovery;
- confirm old synthetic-web-app identities and tests still pass;
- confirm `CONTENT.md` remains below the fixture line ceiling and contains provisional status;
- confirm all host bridges are marker-bounded and uninstall-safe;
- confirm task candidates cannot claim approval or mutate before a recorded decision;
- confirm workbench data comes only from content-addressed runtime records;
- confirm the live Carter pass was read-only; and
- record exact command outputs, test counts, hashes, and any external gate limitation in the verification document.
