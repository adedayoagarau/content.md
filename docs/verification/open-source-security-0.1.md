# Open-source package security verification 0.1

Date: 2026-09-14  
Status: passed locally; production publication and external security review not performed

## Demonstrated boundary

Run:

```bash
pnpm build
pnpm verify:security
```

The deterministic verifier performs 27 checks over the generated four-file npm
candidate, both local workbench servers, and the repository security policy. It
fails when:

- the public package gains runtime dependencies, optional dependencies, peer
  dependencies, or lifecycle scripts;
- the bundle contains a private-key header, high-confidence GitHub, provider,
  or AWS credential pattern, an absolute macOS user path, or the internal npm
  registry hostname used during development;
- either workbench accepts a non-loopback host, weakens its script or framing
  policy, enables `unsafe-eval`, or emits wildcard CORS;
- the mutating workbench loses exact-origin, JSON-content-type, or 64 KiB
  request-size enforcement;
- the benchmark review server stops being GET/HEAD-only; or
- the security policy loses private-reporting, disclosure, or untrusted-input
  guidance.

The negative tests inject a package lifecycle script, private-key marker,
missing origin check, and `unsafe-eval`; every mutation is rejected.

Observed result:

```json
{
  "contract_version": "contentmd.security-verification/0.1.0",
  "check_count": 27,
  "verification_status": "passed",
  "authority_effect": "none"
}
```

## Boundaries and nonclaims

- Pattern checks reduce accidental credential or workstation-path publication;
  they are not a general secret scanner or proof that no sensitive information
  exists.
- The bundled AJV implementation contains a Node-side `new Function` code
  generator. Browser CSP does not allow `unsafe-eval`, and the served browser
  clients contain no dynamic-code sink found by the scoped review.
- Inline CSS currently requires `style-src 'unsafe-inline'`; scripts remain
  restricted to same-origin external resources. This local-only exception is
  documented, not described as a hardened hosted-service policy.
- The review workbench stores unfinished review state in browser local storage.
  Reviewers should use a private local browser profile when review content or
  qualification metadata is sensitive.
- No dependency vulnerability feed, penetration test, malicious-package test,
  Windows security test, hosted deployment, TLS boundary, external identity
  authentication, or third-party security assessment was performed.
- A passing verifier grants no deployment, publication, organizational, or
  product-security authority.
