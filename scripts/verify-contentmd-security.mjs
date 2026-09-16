#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));

function fail(reason) {
  throw new Error(`contentmd_security_invalid:${reason}`);
}

export function verifySecurityInputs({ manifest, bundle, workbench, benchmarkWorkbench, securityPolicy }) {
  let checks = 0;
  const check = (condition, reason) => { checks += 1; if (!condition) fail(reason); };
  check(manifest.dependencies === undefined && manifest.optionalDependencies === undefined
    && manifest.peerDependencies === undefined, "runtime_dependencies");
  check(manifest.scripts === undefined, "package_lifecycle_scripts");
  check(manifest.bin?.contentmd === "dist/contentmd.cjs", "package_binary");
  check(manifest.publishConfig?.access === "public", "package_access");

  const forbiddenBundlePatterns = [
    [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/u, "private_key"],
    [/(?:^|[^A-Za-z0-9])gh[pousr]_[A-Za-z0-9]{20,}/u, "github_token"],
    [/(?:^|[^A-Za-z0-9])sk-[A-Za-z0-9]{20,}/u, "provider_key"],
    [/(?:^|[^A-Z0-9])AKIA[0-9A-Z]{16}(?:[^A-Z0-9]|$)/u, "aws_access_key"],
    [/\/Users\/[A-Za-z0-9._-]+\//u, "absolute_user_path"],
    [/npm\.dev\.paypalinc\.com/iu, "internal_registry"],
  ];
  for (const [pattern, reason] of forbiddenBundlePatterns) check(!pattern.test(bundle), `bundle_${reason}`);

  for (const [name, source] of [["workbench", workbench], ["benchmark", benchmarkWorkbench]]) {
    check(source.includes('host !== "127.0.0.1" && host !== "::1"'), `${name}_loopback_only`);
    check(source.includes("frame-ancestors 'none'"), `${name}_frame_ancestors`);
    check(source.includes("script-src 'self'"), `${name}_script_policy`);
    check(!source.includes("unsafe-eval"), `${name}_unsafe_eval`);
    check(!/Access-Control-Allow-Origin["']?\s*[:,]\s*["']\*/u.test(source), `${name}_wildcard_cors`);
  }
  check(workbench.includes("request.headers.origin !== allowedOrigin"), "workbench_origin_check");
  check(workbench.includes('startsWith("application/json")'), "workbench_json_content_type");
  check(workbench.includes("bytes > 64 * 1024"), "workbench_request_limit");
  check(benchmarkWorkbench.includes('method !== "GET" && method !== "HEAD"'), "benchmark_read_only_http");

  check(/GitHub's private vulnerability reporting/u.test(securityPolicy), "private_reporting");
  check(/Do not open a\s+public issue containing exploit details/u.test(securityPolicy), "public_disclosure_warning");
  check(/Provider configuration and repository content must be treated as untrusted/u.test(securityPolicy), "untrusted_input_boundary");
  return { check_count: checks, verification_status: "passed", authority_effect: "none" };
}

async function main() {
  const [manifest, bundle, workbench, benchmarkWorkbench, securityPolicy] = await Promise.all([
    readFile(path.join(root, "distribution/contentmd/package.json"), "utf8").then(JSON.parse),
    readFile(path.join(root, "distribution/contentmd/dist/contentmd.cjs"), "utf8"),
    readFile(path.join(root, "packages/workbench/src/server.ts"), "utf8"),
    readFile(path.join(root, "packages/workbench/src/benchmark-review.ts"), "utf8"),
    readFile(path.join(root, "SECURITY.md"), "utf8"),
  ]);
  process.stdout.write(`${JSON.stringify({
    contract_version: "contentmd.security-verification/0.1.0",
    ...verifySecurityInputs({ manifest, bundle, workbench, benchmarkWorkbench, securityPolicy }),
  }, null, 2)}\n`);
}

if (process.argv[1] !== undefined && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
