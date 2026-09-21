#!/usr/bin/env node

const expectedNode = "24.20.0";
const expectedPnpm = "11.9.0";
const userAgent = process.env.npm_config_user_agent ?? "";
const pnpmMatch = /(?:^|\s)pnpm\/([^\s]+)/u.exec(userAgent);
const errors = [];

if (process.versions.node !== expectedNode) {
  errors.push(`Node ${expectedNode} is required for repository development; received ${process.versions.node}`);
}

if (process.argv.includes("--install") && pnpmMatch?.[1] !== expectedPnpm) {
  errors.push(`pnpm ${expectedPnpm} is required for dependency installation; received ${pnpmMatch?.[1] ?? "a non-pnpm package manager"}`);
}

if (errors.length > 0) {
  console.error([
    "contentmd_development_toolchain_invalid",
    ...errors,
    "Run `nvm use` (or another .node-version-aware manager), then `corepack prepare pnpm@11.9.0 --activate`.",
  ].join("\n"));
  process.exitCode = 24;
} else {
  console.log(JSON.stringify({
    status: "pass",
    node: process.versions.node,
    pnpm: pnpmMatch?.[1] ?? "not_checked",
    scope: "repository_development",
  }));
}
