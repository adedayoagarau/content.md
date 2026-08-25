# Carter repository-intelligence acceptance

Date: 2026-08-25  
Mode: read-only preflight and mutation preview  
Mutation status: not applied  
Authority effect: none

## Result

The host-agnostic repository-intelligence flow completed against `/Users/aagarau/Desktop/Carter` without writing to Carter.

The preflight invoked the filesystem adapter, model compiler, adoption planner, and change-preview builder directly from the isolated content.md worktree. It did not invoke Carter code, `init --yes`, task apply, a connector, Figma, GCH, ECM, GitHub, Confluence, or any network request. The receipt retained counts, relative paths, record IDs, and digests; it did not persist Carter source text or runtime artifacts.

- Proposed identity: `project.carter`, high confidence.
- Detected stacks: root Python/FastAPI, `studio` TypeScript/Next.js/React, and `figma-plugin/carter-write-bridge` TypeScript.
- Coverage: 17,022 inventoried; 2,473 scanned; 4,958 explicitly skipped; 17,200 parser/format instances unsupported; 0 failed.
- Content occurrences: 2,780 with exact source coordinates.
- Evidence/model result: 8,950 proposed graph nodes and 8,949 edges. The product identity is a high-confidence proposal, but no audience, workflow, or voice claim is selected as established; four conflict nodes remain explicit rather than silently resolved.
- Warnings: 178 unsupported dynamic Python expressions and 5 empty static strings ignored; neither category was promoted into content evidence.
- Adoption status: `ready_for_local_approval`.
- Adoption plan digest: `528b78ba0848ee4c397d8cd8374c4543155a2429c931be9364a8ee87b5ef3eae`.

Discovery excludes generated outputs, dependency/cache directories, nested `.worktrees`, bulk/private `content-repos`, out-of-root symlinks, and unavailable symlinks before their contents can enter the model. Repository evidence is not evidence of live deployment, application ownership, or organizational approval.

## Proposed adoption

No adoption files were created. The reviewed plan would create only:

- `.contentmd/governance/starter-policy.yaml`
- `.contentmd/manifest.json`
- `.contentmd/product/open-questions.json`
- `.contentmd/records/repository-model.json`
- `CONTENT.md`

It would also propose one marker-owned bridge in `CLAUDE.md`; the current file digest is `1ab9acce7d4cb8fb34edef009bb01e8f4126bbbf76ff9a2ffdc8b5a1d9ab4642` and the proposed bridged digest is `35ed865879f3370861c9ab828d34d61a595e1ca80367ac944c3c59b12206cfbb`. Local drafting would be allowed, local mutation would require review, external publication would be denied, and owner status would remain unestablished.

Open decisions remain: product owner, release approver, product-behavior authority, and voice authority.

## Exact content-change preview

This preview demonstrates the product-facing loop; it is not a recommendation that has been approved.

- Target occurrence: `occurrence.a5e0d907f9ea9a886904cdee`.
- Target: `studio/features/library/LibraryView.tsx:583:28`.
- Current expression: `No matches`.
- Proposed expression: `No content matches your search`.
- Rationale: name the object and preserve the existing search context without adding product behavior.
- Uncertainty: Carter voice guidance and the semantic owner for this expression are not established by the repository scan.
- Before digest: `1032cf1ae56c9ee64d792645101bafb3ed15a482b0bae59dd2b493595ae965e8`.
- Expected after digest: `dd87551ec0c402c6aa032921ea88d861d8d5bba13c5bbf424cf72d32af4ee31d`.
- Rollback digest: `1032cf1ae56c9ee64d792645101bafb3ed15a482b0bae59dd2b493595ae965e8`.
- Transaction digest: `01940f746b2d471decb2b8dee922db79a3fd66437609c726020f9029e5d392d5`.
- State: `previewed_not_applied`.
- Acceptance criterion 14: `pending_separate_carter_approval`.

If the user later approves this semantic decision and a separate current mutation authorization is issued, the governed apply path can write that one target. Readback would then be checked with:

```bash
contentmd verify --transaction transaction.carter-library-empty-state.preview --root /Users/aagarau/Desktop/Carter --json
```

Rollback remains a separate user-approved governed operation. No Carter file was changed during this acceptance run.
