# Contributing to content.md

content.md is a governed content-design agent. Contributions must preserve the
distinction between evidence, proposals, human decisions, local mutations, and
organizational authority.

## Development setup

Use the repository-pinned toolchain:

```bash
nvm use
corepack prepare pnpm@11.9.0 --activate
pnpm install --frozen-lockfile
pnpm verify:toolchain
```

The repository development runtime is Node 24.14.0. The published CLI supports
Node `>=24.14.0 <25`; exact-runtime historical fixtures must not be silently
regenerated under a different runtime.

## Before submitting a change

```bash
pnpm test
pnpm lint
pnpm test:distribution
pnpm verify:release
```

Add focused tests for changed behavior. Preserve unrelated work in a dirty
checkout. Do not update generated evidence, model fixtures, digests, or corpus
authority fields merely to make a verifier pass.

## Evidence and corpus contributions

Public-product research is a separate evidence lane. Collection must remain
public, signed-out, read-only, rights-bounded, and attributable. Never submit
credentials, private product material, bypassed access controls, transaction
data, or third-party copy as training material. Candidate records receive no
prompt, training, benchmark, approval, or product-truth authority until their
specific review gates pass.

## Pull requests

Describe the user journey changed, the authority boundary affected, commands
run, and any unverified behavior. A passing test is evidence for the behavior it
covers, not a claim of universal effectiveness, accessibility, legal compliance,
or production approval.
