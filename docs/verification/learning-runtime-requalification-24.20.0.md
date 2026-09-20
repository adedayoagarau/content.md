# Learning runtime requalification: Node 24.20.0

Status: exact-profile requalification for Task 5 pairwise ranking and Task 6 evaluation simulation.

Date: 2026-09-20

## Decision

Task 5 and Task 6 now admit Node `24.20.0` only. The former Node `24.14.0` runtime-profile digests are superseded and rejected. This is not a claim that every Node 24 patch, operating system, or architecture is reproducible.

Two exact release profiles are admitted:

| Platform | Node | V8 | ICU | Unicode | Endianness | Pairwise profile digest | Task 6 profile digest |
| --- | --- | --- | --- | --- | --- | --- | --- |
| macOS arm64 | `24.20.0` | `13.6.233.17-node.53` | `78.3` | `17.0` | `LE` | `dd9d25f4943345f872b5d4c1f13aea12d1b87bcd1f4d2bc39edb3920ad86b08c` | `e08c1f54731db0ade599ad63b97edbbf06caae7c84e5f5160a5e154ab4428fb7` |
| Linux x64 | `24.20.0` | `13.6.233.17-node.53` | `78.3` | `17.0` | `LE` | `7cfc66ff0829849d1c71a52ec49b4fe0807f60f40c82ade52eebd17b88dc86f8` | `9e6043132165513ea090e92540f5d3f4c4aa4c0f98a23784f6ed683f2b4c9656` |

The profile digest is `sha256Canonical` over the contract version and complete seven-field runtime tuple, excluding only `profile_digest`. Runtime admission still compares every field with the live process and requires the digest in the release-owned sorted allowlist.

## Runtime acquisition evidence

The platform archives came from the official Node.js v24.20.0 distribution and were checked against the official `SHASUMS256.txt` before execution:

| Archive | SHA-256 |
| --- | --- |
| `node-v24.20.0-darwin-arm64.tar.gz` | `40e5607e5ecb3db9192723776da2d75d966260fc74a7a9e731c1bd67dda96bc8` |
| `node-v24.20.0-linux-x64.tar.gz` | `855d581f8a4eb1a8117e3426de25fe02770592febcfb31369aee1ffbfee9e8ec` |

No TLS verification was disabled. The Linux x64 archive was exercised locally in an arm64 Colima VM through registered QEMU binfmt support and a temporary root containing signed Ubuntu 24.04 amd64 runtime libraries. That emulated run is bounded replay evidence, not a claim that emulation is a release platform. Native Linux x64 generation and checks remain the CI authority for Linux fixture bytes.

## Bound artifacts

The release profile binds these regenerated code-manifest digests:

- Task 5: `ec83fc950ead31057d1bd3cbf07ce7d0b695973772f300618e5a7282cc804def`
- Task 6: `72e6cb75e9d938bffac47163c6289e02090df43c2c452568326297c95eac63fe`

Platform-specific external locks are retained separately:

- macOS arm64: `golden-model.json` and `task6-simulator-golden.json`
- Linux x64: `golden-model.linux-x64.json` and `task6-simulator-golden.linux-x64.json`

The runner selects only the two supported `process.platform`/`process.arch` pairs and fails closed everywhere else. The legacy filenames remain the macOS arm64 fixtures to avoid rewriting unrelated historical consumers. `shadow-plan.json` continues to derive from that explicitly named canonical development fixture; it does not erase the Linux profile distinction.

## Verification contract

Run under an official Node `24.20.0` binary whose tuple matches one admitted profile:

```bash
node scripts/verify-pairwise-code-manifest.mjs
node scripts/verify-task6-code-manifest.mjs
node --import tsx scripts/generate-pairwise-golden.mts --check
node --import tsx scripts/generate-task6-simulator-golden.mts --check
node node_modules/vitest/vitest.mjs run packages/learning/test/pairwise-golden.test.ts
node node_modules/vitest/vitest.mjs run packages/learning/test/task6-simulator-golden.test.ts
pnpm test
pnpm lint
git diff --check
```

The golden tests independently rerun each fixture twice in fresh processes. Passing this contract establishes byte-identical replay for the exact admitted tuple and committed source manifests. It does not establish product effectiveness, official learning authority, production promotion, or portability to another tuple.
