import { createHash } from "node:crypto";
import {
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  realpath,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import {
  LocalRuntimeDetector,
  type DetectionFileSystem,
} from "@contentmd/runtime-local";
import type { RuntimeDescriptor } from "@contentmd/runtime-sdk";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = resolve(HERE, "../../..");
const FIXTURES_ROOT = join(REPOSITORY_ROOT, "fixtures/runtime-hosts");
const NOW = "2026-08-23T12:00:00.000Z";

function sortText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

async function treeDigest(root: string): Promise<string> {
  const entries: Array<{ path: string; bytes_digest: string }> = [];
  async function walk(directory: string): Promise<void> {
    const names = (await readdir(directory)).sort(sortText);
    for (const name of names) {
      const absolute = join(directory, name);
      const metadata = await lstat(absolute);
      if (metadata.isDirectory()) {
        await walk(absolute);
      } else if (metadata.isFile()) {
        entries.push({
          path: relative(root, absolute),
          bytes_digest: createHash("sha256").update(await readFile(absolute)).digest("hex"),
        });
      }
    }
  }
  await walk(root);
  return sha256Canonical(entries);
}

async function fixture(name: string): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), `contentmd-detection-${name}-`));
  await cp(join(FIXTURES_ROOT, name), root, { recursive: true });
  return root;
}

function localDescriptor(integrationMode: "embedded" | "sidecar" = "sidecar"): RuntimeDescriptor {
  const digest = "a".repeat(64);
  return {
    descriptor_id: `runtime.descriptor.local.${integrationMode}`,
    descriptor_version: "0.1.0",
    descriptor_digest: digest,
    runtime_id: "runtime.local",
    runtime_version: "0.1.0",
    integration_mode: integrationMode,
    environment_family: "node-local",
    supported_host_versions: [">=24.14.0 <25"],
    interface_bindings: [],
    consistency_model: "single_writer_strong",
    retry_semantics: "explicit_authorized_only",
    data_locations: ["adopter-controlled-local"],
    retention_behavior: "policy_bound",
    encryption_behavior: "platform-filesystem",
    identity_provider: "runtime.local.identity",
    authentication_provider: "runtime.local.authentication",
    telemetry_behavior: "minimized",
    package_requirements: [],
    infrastructure_requirements: [],
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("read-only local runtime detection", () => {
  it("recommends embedded local runtime for a compatible Node project without host effects", async () => {
    const root = await fixture("node-local");
    const envPath = join(root, ".env");
    await writeFile(envPath, "CONTENTMD_DETECTION_MUST_NOT_READ=secret-canary-value\n", "utf8");
    const before = await treeDigest(root);
    const reads: string[] = [];
    const filesystem: DetectionFileSystem = {
      realpath,
      lstat,
      async readFile(path) {
        reads.push(path);
        if (path === envPath) throw new Error("contentmd_test_secret_read_denied");
        return readFile(path, "utf8");
      },
    };
    let networkAttempts = 0;
    vi.stubGlobal("fetch", () => {
      networkAttempts += 1;
      throw new Error("contentmd_test_network_denied");
    });

    const detector = new LocalRuntimeDetector({ filesystem, clock: () => NOW });
    const report = await detector.inspect(root);
    const proposal = await detector.propose(report, [
      localDescriptor("sidecar"),
      localDescriptor("embedded"),
    ]);

    expect(report.authority_effect).toBe("none");
    expect(report.unknowns).toContain("live_deployment_status");
    expect(report.conflicts).toEqual([]);
    expect(proposal.recommended_runtime_id).toBe("runtime.local");
    expect(proposal.candidates[0]).toMatchObject({
      runtime_id: "runtime.local",
      availability: "available",
      bindable: true,
      requirements: ["node>=24.14.0 <25"],
    });
    expect(proposal.candidates[0]?.descriptor_ref).toContain("embedded");
    const { report_digest: reportDigest, ...reportPreimage } = report;
    const { proposal_digest: proposalDigest, ...proposalPreimage } = proposal;
    expect(reportDigest).toBe(sha256Canonical(reportPreimage));
    expect(proposalDigest).toBe(sha256Canonical(proposalPreimage));
    expect(reads).toEqual([join(await realpath(root), "package.json")]);
    expect(JSON.stringify({ report, proposal })).not.toContain("CONTENTMD_DETECTION_MUST_NOT_READ");
    expect(JSON.stringify({ report, proposal })).not.toContain("secret-canary-value");
    expect(networkAttempts).toBe(0);
    expect(await treeDigest(root)).toBe(before);
  });

  it("keeps proposals byte-identical when descriptor input order changes", async () => {
    const root = await fixture("node-local");
    const detector = new LocalRuntimeDetector({ clock: () => NOW });
    const report = await detector.inspect(root);
    const embedded = localDescriptor("embedded");
    const sidecar = localDescriptor("sidecar");

    expect(await detector.propose(report, [embedded, sidecar]))
      .toEqual(await detector.propose(report, [sidecar, embedded]));
  });

  it("observes Cloudflare evidence without claiming a live deployment or bindable adapter", async () => {
    const root = await fixture("cloudflare-candidate");
    const before = await treeDigest(root);
    const detector = new LocalRuntimeDetector({ clock: () => NOW });
    const report = await detector.inspect(root);
    const proposal = await detector.propose(report, [localDescriptor("sidecar")]);

    expect(report.evidence).toEqual(expect.arrayContaining([
      expect.objectContaining({ kind: "runtime_config_presence", relative_locator: "wrangler.jsonc" }),
      expect.objectContaining({ kind: "package_declaration", observation: "package:@cloudflare/workers-types" }),
    ]));
    expect(report.unknowns).toContain("live_deployment_status");
    expect(report.conflicts).toEqual([]);
    expect(proposal.candidates).toEqual(expect.arrayContaining([
      expect.objectContaining({ runtime_id: "runtime.local", availability: "available", bindable: true }),
      expect.objectContaining({
        runtime_id: "runtime.cloudflare-agents",
        availability: "adapter_unavailable_pending_plan_4",
        bindable: false,
        failure_code: "runtime_capability_unsupported",
      }),
    ]));
    expect(proposal.recommended_runtime_id).toBe("runtime.local");
    expect(proposal.candidates.find((candidate) => candidate.runtime_id === "runtime.local")?.descriptor_ref)
      .toContain("sidecar");
    expect(JSON.stringify({ report, proposal })).not.toContain("fixture-only");
    expect(JSON.stringify({ report, proposal })).not.toContain("Presence is evidence only");
    expect(await treeDigest(root)).toBe(before);
  });

  it("reports conflicting runtime evidence as inconclusive rather than inferring deployment", async () => {
    const root = await fixture("conflicting");
    const detector = new LocalRuntimeDetector({ clock: () => NOW });
    const report = await detector.inspect(root);
    const proposal = await detector.propose(report, [localDescriptor("sidecar")]);

    expect(report.conflicts).toContain("runtime_detection_inconclusive");
    expect(report.unknowns).toEqual(expect.arrayContaining([
      "live_deployment_status",
      "declared_node_runtime_compatibility",
    ]));
    expect(proposal.candidates[0]?.conflicts).toContain("runtime_detection_inconclusive");
    expect(report.evidence.every((item) => item.authority_effect === "none")).toBe(true);
  });

  it("rejects a forged report before producing a proposal", async () => {
    const root = await fixture("node-local");
    const detector = new LocalRuntimeDetector({ clock: () => NOW });
    const report = await detector.inspect(root);

    await expect(detector.propose({ ...report, report_digest: "0".repeat(64) }, [localDescriptor()]))
      .rejects.toThrow("runtime_detection_inconclusive:report_digest_invalid");
  });

  it("has no network-capable imports in the detector boundary", async () => {
    const source = await readFile(join(REPOSITORY_ROOT, "packages/runtime-local/src/detector.ts"), "utf8");
    for (const forbidden of ["node:http", "node:https", "node:net", "node:tls", "node:dns"]) {
      expect(source).not.toContain(forbidden);
    }
  });
});
