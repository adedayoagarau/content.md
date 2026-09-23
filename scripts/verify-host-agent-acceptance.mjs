#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  HOST_ACCEPTANCE_COMMANDS,
  HOST_ACCEPTANCE_CONTRACT,
  HOST_ACCEPTANCE_HOSTS,
  verifyHostAgentAcceptanceBundle,
} from "./host-agent-acceptance.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const args = process.argv.slice(2);
const bundleIndex = args.indexOf("--bundle");
const hostIndex = args.indexOf("--host");
const bundle = bundleIndex >= 0 ? args[bundleIndex + 1] : undefined;
const host = hostIndex >= 0 ? args[hostIndex + 1] : undefined;
if ((bundleIndex >= 0 && !bundle) || (hostIndex >= 0 && !host) || args.some((arg, index) => arg.startsWith("--") && ![bundleIndex, hostIndex].includes(index))) {
  throw new Error("usage: verify-host-agent-acceptance.mjs [--bundle <directory> --host <codex|claude-code>]");
}

if (bundle === undefined) {
  process.stdout.write(`${JSON.stringify({
    contract_version: HOST_ACCEPTANCE_CONTRACT,
    verification_status: "protocol_verified_live_runs_not_required_in_ci",
    supported_host_protocols: HOST_ACCEPTANCE_HOSTS,
    required_commands: HOST_ACCEPTANCE_COMMANDS,
    compatibility_claims: Object.fromEntries(HOST_ACCEPTANCE_HOSTS.map((item) => [item, "not_certified_without_verified_live_bundle"])),
    authority_effect: "none",
  }, null, 2)}\n`);
} else {
  if (!HOST_ACCEPTANCE_HOSTS.includes(host)) throw new Error(`unsupported host: ${host ?? "missing"}`);
  const resolved = path.resolve(root, bundle);
  process.stdout.write(`${JSON.stringify(await verifyHostAgentAcceptanceBundle(resolved, { expectedHost: host }), null, 2)}\n`);
}
