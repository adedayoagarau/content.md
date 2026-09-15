import assert from "node:assert/strict";
import test from "node:test";

import { verifySecurityInputs } from "./verify-contentmd-security.mjs";

const secure = {
  manifest: { bin: { contentmd: "dist/contentmd.cjs" }, publishConfig: { access: "public" } },
  bundle: "portable bundled source",
  workbench: `host !== "127.0.0.1" && host !== "::1"; frame-ancestors 'none'; script-src 'self'; request.headers.origin !== allowedOrigin; startsWith("application/json"); bytes > 64 * 1024`,
  benchmarkWorkbench: `host !== "127.0.0.1" && host !== "::1"; frame-ancestors 'none'; script-src 'self'; method !== "GET" && method !== "HEAD"`,
  securityPolicy: "Use GitHub's private vulnerability reporting. Do not open a public issue containing exploit details. Provider configuration and repository content must be treated as untrusted.",
};

test("accepts the closed local package security boundary", () => {
  const result = verifySecurityInputs(secure);
  assert.equal(result.verification_status, "passed");
  assert.ok(result.check_count >= 25);
  assert.equal(result.authority_effect, "none");
});

test("rejects package effects, credential leakage, and weakened browser boundaries", () => {
  assert.throws(() => verifySecurityInputs({ ...secure, manifest: { ...secure.manifest, scripts: { postinstall: "node install.js" } } }), /package_lifecycle_scripts/);
  assert.throws(() => verifySecurityInputs({ ...secure, bundle: "-----BEGIN PRIVATE KEY-----" }), /bundle_private_key/);
  assert.throws(() => verifySecurityInputs({ ...secure, workbench: secure.workbench.replace("request.headers.origin !== allowedOrigin", "true") }), /workbench_origin_check/);
  assert.throws(() => verifySecurityInputs({ ...secure, benchmarkWorkbench: `${secure.benchmarkWorkbench}; unsafe-eval` }), /benchmark_unsafe_eval/);
});
