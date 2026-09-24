# Corpus adjudication launch contract

## Outcome

The 140-unit English UX-content adjudication pilot now has a deterministic,
read-only remote-launch preflight. It converts the exact corpus plan, selected
classifier and evaluator, provider target, request limits, and data-use boundary
into one content-addressed authorization subject before any remote model can be
invoked.

The preparation command does not connect a provider, grant a capability, create
an authorization, write project state, or send corpus text:

```bash
contentmd usecase prepare-corpus-run \
  --root /absolute/path/to/content.md \
  --classifier-model <exact-model-id> \
  --evaluator-model <exact-model-id> \
  --maximum-refinement-rounds 2 \
  --json
```

It re-creates and verifies plan
`corpus_adjudication_plan.84be84e286488331f70663ef190da7a7` at digest
`84be84e286488331f70663ef190da7a72f2afd864b44c5bbd271a993c4ab0275`,
then inspects only the local digest-verified provider configuration.

## What the authorization subject binds

The subject fixes all of the following:

- the exact plan ID and digest;
- the provider, adapter, HTTPS origin, provider-configuration ID, and
  configuration digest;
- exact classifier and evaluator model IDs;
- distinct requests and evaluator blinding, plus whether the models differ;
- English-only classification and evaluation;
- the four request data classes and both strict output schemas;
- memory scope `none`, provider application state `none`, transient processing,
  no durable raw-source storage, no prompt reuse, no training, no benchmark
  scoring, and no content-authority effect;
- per-request byte, token, retry, and time limits; and
- the complete worst-case batch ceiling.

At two allowed refinement rounds, one unit can make at most six requests: one
initial classification, three evaluations, and two corrected classifications.
For 140 units, the authorization ceiling is therefore 420 classifier calls,
420 evaluator calls, and 840 total calls. These are safety ceilings, not an
estimate of expected use. The launch record also exposes aggregate byte, token,
and duration upper bounds instead of hiding cost and operational risk.

## Fail-closed provider checks

Preparation remains blocked until a single verified local provider bundle
matches the launch subject. The preflight checks:

- current model, data-handling, connection, and capability-grant state;
- exact project, provider, adapter, destination, and model binding;
- `classify` and `evaluate` support and grants;
- both strict output schemas;
- every request data class;
- sufficient per-request token and timeout limits;
- zero retries;
- training opt-out; and
- enabled zero-data-retention status, disabled abuse-monitoring retention, and
  disabled prompt caching.

The existing provider proposal commands now accept `classify` and `evaluate`
as explicit operations, for example:

```bash
contentmd connect openai \
  --root /absolute/path/to/content.md \
  --propose \
  --model <exact-model-id> \
  --operations classify,evaluate \
  --json

contentmd model authorize \
  --root /absolute/path/to/content.md \
  --provider openai \
  --operations classify,evaluate \
  --json
```

Both commands still produce proposals only. They do not connect a provider,
store a credential, issue a grant, or authorize corpus processing.

The current provider bundle contains one model profile. A classifier and
evaluator may use that same exact model through separate, blinded requests. If
different model IDs are selected, preparation correctly remains blocked until
the provider-configuration layer supports and binds both profiles.

## Explicit authority still required

When every configuration check passes, the request changes only to
`ready_for_explicit_authorization`. It is not authorized. A separate authority
must affirm remote processing of the bounded public-product evidence and bind
that approval to the exact subject ID and digest, including the call ceiling
and all no-reuse/no-training boundaries.

No such provider configuration or processing-and-egress authorization exists
in this checkout. Consequently, no remote corpus call was made as part of this
change.

## Verification

```bash
pnpm exec tsc -b packages/agent packages/cli --pretty false --force
pnpm exec vitest run \
  packages/agent/test/corpus-adjudication-launch.test.ts \
  packages/agent/test/provider-configuration.test.ts \
  packages/cli/test/usecase-shadow.test.ts
```

The tests prove deterministic plan/model/workload binding, missing-provider
blocking, exact ready-state requirements, model/operation/data/retention/limit
mismatch blocking, request-tamper detection, proposal-only provider operations,
and a CLI preparation path with no network, write, or authority effect.
