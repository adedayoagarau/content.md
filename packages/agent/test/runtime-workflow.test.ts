import { createHash } from "node:crypto";
import {
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";
import { describe, expect, it } from "vitest";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import { SqliteEventStore } from "@contentmd/memory";
import type {
  RuntimeBindingDecision,
  RuntimeDescriptor,
  RuntimeProposalRecord,
} from "@contentmd/runtime-sdk";
import {
  bindRuntime,
  inspectRuntime,
  proposeRuntime,
} from "@contentmd/agent";
import {
  BINDING_DATA_CLASSES,
  completeLocalConformance,
  governedBindingFixture,
} from "./runtime-binding-authority-fixture.js";

const REPOSITORY_ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const HOST_FIXTURES = join(REPOSITORY_ROOT, "fixtures/runtime-hosts");
const NOW = "2026-08-23T12:00:00.000Z";

function sortText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

async function treeState(root: string): Promise<readonly { path: string; digest: string }[]> {
  const result: Array<{ path: string; digest: string }> = [];
  async function walk(directory: string): Promise<void> {
    for (const name of (await readdir(directory)).sort(sortText)) {
      const absolute = join(directory, name);
      const metadata = await lstat(absolute);
      if (metadata.isDirectory()) await walk(absolute);
      else if (metadata.isFile()) {
        result.push({
          path: relative(root, absolute),
          digest: createHash("sha256").update(await readFile(absolute)).digest("hex"),
        });
      }
    }
  }
  await walk(root);
  return result;
}

function descriptor(mode: "embedded" | "sidecar"): RuntimeDescriptor {
  const preimage = {
    descriptor_id: `runtime.descriptor.local.${mode}`,
    descriptor_version: "0.1.0",
    runtime_id: "runtime.local",
    runtime_version: "0.1.0",
    integration_mode: mode,
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
  } as const;
  return { ...preimage, descriptor_digest: sha256Canonical(preimage) };
}

async function hostFixture(name: "node-local" | "cloudflare-candidate"): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), `contentmd-runtime-workflow-${name}-`));
  await cp(join(HOST_FIXTURES, name), root, { recursive: true });
  return root;
}

async function installLocalProfile(
  root: string,
  descriptors: readonly RuntimeDescriptor[] = [descriptor("embedded"), descriptor("sidecar")],
): Promise<void> {
  const path = join(root, ".contentmd/runtime/local-runtime-profile.json");
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, canonicalJson({
    contract_version: "contentmd.local-runtime-profile/0.1.0",
    descriptors,
  }), { mode: 0o600 });
}

function decisionFor(
  proposal: RuntimeProposalRecord,
  overrides: Partial<Omit<RuntimeBindingDecision, "decision_digest">> = {},
): RuntimeBindingDecision {
  const candidate = proposal.candidates.find((item) => item.runtime_id === "runtime.local")!;
  const preimage = {
    schema_version: "0.1.0" as const,
    decision_id: "runtime.binding-decision.fixture",
    project_id: "project.runtime.fixture",
    proposal_ref: {
      record_id: proposal.proposal_id,
      record_version: 1,
      content_digest: proposal.proposal_digest,
    },
    proposal_digest: proposal.proposal_digest,
    selected_descriptor_ref: candidate.descriptor_ref,
    selected_descriptor_digest: candidate.descriptor_digest,
    canonical_replica_runtime_id: candidate.runtime_id,
    decision_status: "approved" as const,
    actor_ref: "actor.runtime-owner",
    principal_ref: "principal.runtime-owner",
    workload_ref: "workload.contentmd",
    rationale: "Use the adopter-controlled local canonical replica.",
    decided_at: NOW,
    authorization_ref: {
      record_id: "runtime-authorization.binding.fixture",
      record_version: 1,
      content_digest: "b".repeat(64),
    },
    authorization_digest: "b".repeat(64),
    conformance_receipt_refs: [{
      record_id: "runtime.conformance.fixture",
      record_version: 1,
      content_digest: "c".repeat(64),
    }],
    applicable_control_refs: [{
      record_id: "control.runtime.binding.fixture",
      record_version: 1,
      content_digest: "d".repeat(64),
    }],
    ...overrides,
  };
  return { ...preimage, decision_digest: sha256Canonical(preimage) };
}

async function writeDecision(root: string, decision: RuntimeBindingDecision): Promise<string> {
  const path = join(
    root,
    ".contentmd/governance/runtime-binding-decisions",
    `${decision.decision_id}.json`,
  );
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, canonicalJson(decision), { mode: 0o600 });
  return path;
}

async function activatedBindingProject() {
  const root = await hostFixture("node-local");
  const conformance = completeLocalConformance(NOW);
  await installLocalProfile(root, [conformance.descriptor]);
  const proposal = await proposeRuntime(root, { clock: () => NOW });
  const proposalPath = join(root, ".contentmd/runtime/proposals", `${proposal.proposal_id}.json`);
  const fixture = governedBindingFixture({
    proposal,
    descriptor: conformance.descriptor,
    receipts: conformance.receipts,
    now: NOW,
    decision_id: "runtime.binding-decision.initial",
  });
  const decisionPath = await writeDecision(root, fixture.decision);
  const authorityPath = join(root, ".contentmd/governance/runtime-binding-authority.json");
  await mkdir(dirname(authorityPath), { recursive: true });
  await writeFile(authorityPath, canonicalJson(fixture.authority_bundle), { mode: 0o600 });
  const eventPath = join(root, ".contentmd/runtime/events.sqlite");
  await mkdir(dirname(eventPath), { recursive: true });
  const seed = new SqliteEventStore(eventPath, {
    permitted_data_classes: BINDING_DATA_CLASSES,
    runtime_version: "24.14.0",
  });
  const decisionEvent = await seed.append(fixture.decision_command);
  seed.close();
  await bindRuntime({
    project_root: root,
    proposal_path: proposalPath,
    decision_path: decisionPath,
  });
  return {
    root,
    conformance,
    proposal,
    proposalPath,
    fixture,
    authorityPath,
    eventPath,
    decisionEvent,
  };
}

describe("runtime inspection and proposal workflow", () => {
  it("inspects without changing any project byte", async () => {
    const root = await hostFixture("node-local");
    const before = await treeState(root);

    const report = await inspectRuntime(root, { clock: () => NOW });

    expect(report.authority_effect).toBe("none");
    expect(await treeState(root)).toEqual(before);
  });

  it("persists only one content-addressed proposal with no authority effect", async () => {
    const root = await hostFixture("node-local");
    await installLocalProfile(root);

    const proposal = await proposeRuntime(root, { clock: () => NOW });
    const path = join(root, ".contentmd/runtime/proposals", `${proposal.proposal_id}.json`);
    const bytes = await readFile(path, "utf8");

    expect(JSON.parse(bytes)).toEqual(proposal);
    expect((await stat(path)).mode & 0o777).toBe(0o600);
    expect(proposal.authority_effect).toBe("none");
    expect(await treeState(join(root, ".contentmd/runtime"))).toEqual([
      expect.objectContaining({ path: "local-runtime-profile.json" }),
      expect.objectContaining({ path: `proposals/${proposal.proposal_id}.json` }),
    ]);
  });

  it("keeps Cloudflare evidence unavailable and never creates a binding", async () => {
    const root = await hostFixture("cloudflare-candidate");
    await installLocalProfile(root);

    const proposal = await proposeRuntime(root, { clock: () => NOW });

    expect(proposal.candidates).toEqual(expect.arrayContaining([
      expect.objectContaining({
        runtime_id: "runtime.cloudflare-agents",
        bindable: false,
        availability: "adapter_unavailable_pending_plan_4",
      }),
    ]));
    await expect(readFile(join(root, ".contentmd/runtime/current-runtime-binding.json"), "utf8"))
      .rejects.toThrow();
    await expect(readFile(join(root, ".contentmd/governance/runtime-binding-authority.json"), "utf8"))
      .rejects.toThrow();
  });
});

describe("runtime binding preflight", () => {
  it("rejects a missing proposal before reading a decision", async () => {
    const root = await hostFixture("node-local");
    await expect(bindRuntime({
      project_root: root,
      proposal_path: join(root, "missing-proposal.json"),
      decision_path: join(root, "missing-decision.json"),
    })).rejects.toThrow("runtime_binding_input_invalid:proposal_file_missing_or_malformed");
  });

  it("rejects a malformed proposal before creating runtime state", async () => {
    const root = await hostFixture("node-local");
    const proposalPath = join(root, "proposal.json");
    await writeFile(proposalPath, "{}\n", "utf8");

    await expect(bindRuntime({
      project_root: root,
      proposal_path: proposalPath,
      decision_path: join(root, "missing-decision.json"),
    })).rejects.toThrow("runtime_binding_input_invalid:proposal_contract_invalid");
    await expect(readFile(join(root, ".contentmd/runtime/current-runtime-binding.json"), "utf8"))
      .rejects.toThrow();
  });

  it("rejects a digest-altered proposal before decision or authority resolution", async () => {
    const root = await hostFixture("node-local");
    await installLocalProfile(root);
    const proposal = await proposeRuntime(root, { clock: () => NOW });
    const proposalPath = join(root, ".contentmd/runtime/proposals", `${proposal.proposal_id}.json`);
    await writeFile(proposalPath, canonicalJson({
      ...proposal,
      recommended_runtime_id: "runtime.changed",
    }), "utf8");

    await expect(bindRuntime({
      project_root: root,
      proposal_path: proposalPath,
      decision_path: join(root, "missing-decision.json"),
    })).rejects.toThrow("runtime_binding_input_invalid:proposal_digest_invalid");
  });

  it("rejects a missing or malformed decision after a valid proposal", async () => {
    const root = await hostFixture("node-local");
    await installLocalProfile(root);
    const proposal = await proposeRuntime(root, { clock: () => NOW });
    const proposalPath = join(root, ".contentmd/runtime/proposals", `${proposal.proposal_id}.json`);

    await expect(bindRuntime({
      project_root: root,
      proposal_path: proposalPath,
      decision_path: join(root, "missing-decision.json"),
    })).rejects.toThrow("runtime_binding_input_invalid:decision_file_missing_or_malformed");

    const malformed = join(root, "malformed-decision.json");
    await writeFile(malformed, "{}\n", "utf8");
    await expect(bindRuntime({
      project_root: root,
      proposal_path: proposalPath,
      decision_path: malformed,
    })).rejects.toThrow("runtime_binding_input_invalid:decision_contract_invalid");
  });

  it("rejects a stale decision digest and a decision for another proposal", async () => {
    const root = await hostFixture("node-local");
    await installLocalProfile(root);
    const proposal = await proposeRuntime(root, { clock: () => NOW });
    const proposalPath = join(root, ".contentmd/runtime/proposals", `${proposal.proposal_id}.json`);
    const stale = await writeDecision(root, {
      ...decisionFor(proposal),
      rationale: "Altered after approval.",
    });
    await expect(bindRuntime({ project_root: root, proposal_path: proposalPath, decision_path: stale }))
      .rejects.toThrow("runtime_binding_input_invalid:decision_digest_invalid");

    const wrongSubject = decisionFor(proposal, { proposal_digest: "e".repeat(64) });
    const wrongSubjectPath = await writeDecision(root, wrongSubject);
    await expect(bindRuntime({
      project_root: root,
      proposal_path: proposalPath,
      decision_path: wrongSubjectPath,
    })).rejects.toThrow("runtime_binding_not_authorized:decision_proposal_mismatch");
  });

  it("rejects rejected decisions and unavailable Cloudflare selections", async () => {
    const localRoot = await hostFixture("node-local");
    await installLocalProfile(localRoot);
    const localProposal = await proposeRuntime(localRoot, { clock: () => NOW });
    const localProposalPath = join(
      localRoot,
      ".contentmd/runtime/proposals",
      `${localProposal.proposal_id}.json`,
    );
    const rejected = decisionFor(localProposal, { decision_status: "rejected" });
    await expect(bindRuntime({
      project_root: localRoot,
      proposal_path: localProposalPath,
      decision_path: await writeDecision(localRoot, rejected),
    })).rejects.toThrow("runtime_binding_not_authorized:decision_not_approved");

    const cloudflareRoot = await hostFixture("cloudflare-candidate");
    await installLocalProfile(cloudflareRoot);
    const cloudflareProposal = await proposeRuntime(cloudflareRoot, { clock: () => NOW });
    const cloudflareCandidate = cloudflareProposal.candidates.find(
      (item) => item.runtime_id === "runtime.cloudflare-agents",
    )!;
    const cloudflareDecision = decisionFor(cloudflareProposal, {
      selected_descriptor_ref: cloudflareCandidate.descriptor_ref,
      selected_descriptor_digest: cloudflareCandidate.descriptor_digest,
      canonical_replica_runtime_id: cloudflareCandidate.runtime_id,
    });
    await expect(bindRuntime({
      project_root: cloudflareRoot,
      proposal_path: join(
        cloudflareRoot,
        ".contentmd/runtime/proposals",
        `${cloudflareProposal.proposal_id}.json`,
      ),
      decision_path: await writeDecision(cloudflareRoot, cloudflareDecision),
    })).rejects.toThrow("runtime_capability_unsupported:runtime.cloudflare-agents");
  });

  it("fails closed when an approved local decision has no separate binding authority", async () => {
    const root = await hostFixture("node-local");
    await installLocalProfile(root);
    const proposal = await proposeRuntime(root, { clock: () => NOW });
    const proposalPath = join(root, ".contentmd/runtime/proposals", `${proposal.proposal_id}.json`);
    const decision = decisionFor(proposal);

    await expect(bindRuntime({
      project_root: root,
      proposal_path: proposalPath,
      decision_path: await writeDecision(root, decision),
    })).rejects.toThrow("runtime_binding_not_authorized:runtime_binding_authority_missing");
    await expect(readFile(join(root, ".contentmd/runtime/current-runtime-binding.json"), "utf8"))
      .rejects.toThrow();
  });

  it("appends one activation, verifies readback, then atomically projects the local binding", async () => {
    const root = await hostFixture("node-local");
    const conformance = completeLocalConformance(NOW);
    await installLocalProfile(root, [conformance.descriptor]);
    const proposal = await proposeRuntime(root, { clock: () => NOW });
    const proposalPath = join(root, ".contentmd/runtime/proposals", `${proposal.proposal_id}.json`);
    const fixture = governedBindingFixture({
      proposal,
      descriptor: conformance.descriptor,
      receipts: conformance.receipts,
      now: NOW,
    });
    const decisionPath = await writeDecision(root, fixture.decision);
    const authorityPath = join(root, ".contentmd/governance/runtime-binding-authority.json");
    await mkdir(dirname(authorityPath), { recursive: true });
    await writeFile(authorityPath, canonicalJson(fixture.authority_bundle), { mode: 0o600 });
    const eventPath = join(root, ".contentmd/runtime/events.sqlite");
    await mkdir(dirname(eventPath), { recursive: true });
    const seed = new SqliteEventStore(eventPath, {
      permitted_data_classes: BINDING_DATA_CLASSES,
      runtime_version: "24.14.0",
    });
    await seed.append(fixture.decision_command);
    seed.close();
    const immutableInputs = await Promise.all([
      readFile(proposalPath, "utf8"),
      readFile(decisionPath, "utf8"),
      readFile(authorityPath, "utf8"),
    ]);

    const receipt = await bindRuntime({
      project_root: root,
      proposal_path: proposalPath,
      decision_path: decisionPath,
    });

    const projection = JSON.parse(await readFile(
      join(root, ".contentmd/runtime/current-runtime-binding.json"),
      "utf8",
    ));
    const readback = new SqliteEventStore(eventPath, {
      permitted_data_classes: BINDING_DATA_CLASSES,
      runtime_version: "24.14.0",
    });
    const activationEvents = await readback.readStream(
      `runtime-bindings.${fixture.decision.project_id}`,
    );
    const decisionEvents = await readback.readStream(
      `runtime-binding-decisions.${fixture.decision.project_id}`,
    );
    readback.close();

    expect(receipt).toMatchObject({
      status: "activated",
      binding_id: fixture.binding.binding_id,
      binding_digest: fixture.binding_digest,
      activation_event_ref: fixture.activation_command.event_id,
      projection_digest: fixture.projection.projection_digest,
    });
    const { receipt_digest: suppliedReceiptDigest, ...receiptPreimage } = receipt;
    expect(suppliedReceiptDigest).toBe(sha256Canonical(receiptPreimage));
    expect(activationEvents).toHaveLength(1);
    expect(activationEvents[0]).toMatchObject({
      event_id: receipt.activation_event_ref,
      event_digest: receipt.activation_event_digest,
      event_type: "runtime_binding_activated",
      payload: expect.objectContaining({
        binding_digest: fixture.binding_digest,
        decision_event_ref: fixture.decision_command.event_id,
      }),
    });
    expect(decisionEvents).toHaveLength(1);
    expect(projection).toEqual(fixture.projection);
    expect(await Promise.all([
      readFile(proposalPath, "utf8"),
      readFile(decisionPath, "utf8"),
      readFile(authorityPath, "utf8"),
    ])).toEqual(immutableInputs);
  });

  it("rejects an approved decision that is no longer the canonical decision-stream head", async () => {
    const root = await hostFixture("node-local");
    const conformance = completeLocalConformance(NOW);
    await installLocalProfile(root, [conformance.descriptor]);
    const proposal = await proposeRuntime(root, { clock: () => NOW });
    const proposalPath = join(root, ".contentmd/runtime/proposals", `${proposal.proposal_id}.json`);
    const fixture = governedBindingFixture({
      proposal,
      descriptor: conformance.descriptor,
      receipts: conformance.receipts,
      now: NOW,
    });
    const decisionPath = await writeDecision(root, fixture.decision);
    const authorityPath = join(root, ".contentmd/governance/runtime-binding-authority.json");
    await mkdir(dirname(authorityPath), { recursive: true });
    await writeFile(authorityPath, canonicalJson(fixture.authority_bundle), { mode: 0o600 });
    const eventPath = join(root, ".contentmd/runtime/events.sqlite");
    await mkdir(dirname(eventPath), { recursive: true });
    const seed = new SqliteEventStore(eventPath, {
      permitted_data_classes: BINDING_DATA_CLASSES,
      runtime_version: "24.14.0",
    });
    const first = await seed.append(fixture.decision_command);
    const { decision_digest: _oldDigest, ...oldPreimage } = fixture.decision;
    const replacementPreimage = {
      ...oldPreimage,
      decision_id: "runtime.binding-decision.replacement",
      rationale: "A later owner decision superseded the earlier local-runtime selection.",
    };
    const replacement = {
      ...replacementPreimage,
      decision_digest: sha256Canonical(replacementPreimage),
    };
    await seed.append({
      event_id: `event.${replacement.decision_id}`,
      stream_id: fixture.decision_command.stream_id,
      event_type: "runtime_binding_decided",
      occurred_at: NOW,
      actor_ref: replacement.actor_ref,
      data_class: "runtime_binding_decision",
      payload: replacement,
      expected_head_digest: first.event_digest,
    });
    seed.close();

    await expect(bindRuntime({
      project_root: root,
      proposal_path: proposalPath,
      decision_path: decisionPath,
    })).rejects.toThrow("runtime_binding_not_authorized:decision_not_current");
    await expect(readFile(join(root, ".contentmd/runtime/current-runtime-binding.json"), "utf8"))
      .rejects.toThrow();
  });

  it("binds the newest canonical decision without rewriting earlier decision history", async () => {
    const root = await hostFixture("node-local");
    const conformance = completeLocalConformance(NOW);
    await installLocalProfile(root, [conformance.descriptor]);
    const proposal = await proposeRuntime(root, { clock: () => NOW });
    const proposalPath = join(root, ".contentmd/runtime/proposals", `${proposal.proposal_id}.json`);
    const earlier = governedBindingFixture({
      proposal,
      descriptor: conformance.descriptor,
      receipts: conformance.receipts,
      now: NOW,
      decision_id: "runtime.binding-decision.earlier",
    });
    const eventPath = join(root, ".contentmd/runtime/events.sqlite");
    await mkdir(dirname(eventPath), { recursive: true });
    const seed = new SqliteEventStore(eventPath, {
      permitted_data_classes: BINDING_DATA_CLASSES,
      runtime_version: "24.14.0",
    });
    const first = await seed.append(earlier.decision_command);
    const current = governedBindingFixture({
      proposal,
      descriptor: conformance.descriptor,
      receipts: conformance.receipts,
      now: NOW,
      decision_id: "runtime.binding-decision.current",
      decision_event_predecessor_digest: first.event_digest,
      decision_event_sequence: 2,
    });
    await seed.append(current.decision_command);
    seed.close();
    const decisionPath = await writeDecision(root, current.decision);
    const authorityPath = join(root, ".contentmd/governance/runtime-binding-authority.json");
    await mkdir(dirname(authorityPath), { recursive: true });
    await writeFile(authorityPath, canonicalJson(current.authority_bundle), { mode: 0o600 });

    const receipt = await bindRuntime({
      project_root: root,
      proposal_path: proposalPath,
      decision_path: decisionPath,
    });

    expect(receipt).toMatchObject({
      status: "activated",
      binding_id: current.binding.binding_id,
      binding_digest: current.binding_digest,
    });
    const readback = new SqliteEventStore(eventPath, {
      permitted_data_classes: BINDING_DATA_CLASSES,
      runtime_version: "24.14.0",
    });
    expect(await readback.readStream(current.decision_command.stream_id)).toHaveLength(2);
    readback.close();
  });

  it("does not project when independent activation readback is digest-corrupt", async () => {
    const root = await hostFixture("node-local");
    const conformance = completeLocalConformance(NOW);
    await installLocalProfile(root, [conformance.descriptor]);
    const proposal = await proposeRuntime(root, { clock: () => NOW });
    const proposalPath = join(root, ".contentmd/runtime/proposals", `${proposal.proposal_id}.json`);
    const fixture = governedBindingFixture({
      proposal,
      descriptor: conformance.descriptor,
      receipts: conformance.receipts,
      now: NOW,
    });
    const decisionPath = await writeDecision(root, fixture.decision);
    const authorityPath = join(root, ".contentmd/governance/runtime-binding-authority.json");
    await mkdir(dirname(authorityPath), { recursive: true });
    await writeFile(authorityPath, canonicalJson(fixture.authority_bundle), { mode: 0o600 });
    const eventPath = join(root, ".contentmd/runtime/events.sqlite");
    await mkdir(dirname(eventPath), { recursive: true });
    const seed = new SqliteEventStore(eventPath, {
      permitted_data_classes: BINDING_DATA_CLASSES,
      runtime_version: "24.14.0",
    });
    await seed.append(fixture.decision_command);
    seed.close();
    const database = new DatabaseSync(eventPath);
    database.exec(`
      CREATE TRIGGER corrupt_runtime_binding_readback
      AFTER INSERT ON events
      WHEN NEW.event_type = 'runtime_binding_activated'
      BEGIN
        UPDATE events
        SET event_digest = '${"0".repeat(64)}'
        WHERE event_id = NEW.event_id;
      END;
    `);
    database.close();

    await expect(bindRuntime({
      project_root: root,
      proposal_path: proposalPath,
      decision_path: decisionPath,
    })).rejects.toThrow(
      "runtime_replica_acknowledgement_missing:binding_activation_readback_mismatch",
    );
    await expect(readFile(join(root, ".contentmd/runtime/current-runtime-binding.json"), "utf8"))
      .rejects.toThrow();
  });

  it("rejects a second activation whose authority is bound to a stale predecessor", async () => {
    const activated = await activatedBindingProject();
    const stale = governedBindingFixture({
      proposal: activated.proposal,
      descriptor: activated.conformance.descriptor,
      receipts: activated.conformance.receipts,
      now: NOW,
      decision_id: "runtime.binding-decision.stale-predecessor",
      decision_event_predecessor_digest: activated.decisionEvent.event_digest,
      decision_event_sequence: 2,
    });
    const eventStore = new SqliteEventStore(activated.eventPath, {
      permitted_data_classes: BINDING_DATA_CLASSES,
      runtime_version: "24.14.0",
    });
    await eventStore.append(stale.decision_command);
    eventStore.close();
    const decisionPath = await writeDecision(activated.root, stale.decision);
    await writeFile(
      activated.authorityPath,
      canonicalJson(stale.authority_bundle),
      { mode: 0o600 },
    );

    await expect(bindRuntime({
      project_root: activated.root,
      proposal_path: activated.proposalPath,
      decision_path: decisionPath,
    })).rejects.toThrow("runtime_binding_not_authorized:stale_predecessor_binding_digest");
    expect(JSON.parse(await readFile(
      join(activated.root, ".contentmd/runtime/current-runtime-binding.json"),
      "utf8",
    ))).toEqual(activated.fixture.projection);
  });

  it("advances a second binding by exact predecessor CAS without rewriting the first event", async () => {
    const activated = await activatedBindingProject();
    const next = governedBindingFixture({
      proposal: activated.proposal,
      descriptor: activated.conformance.descriptor,
      receipts: activated.conformance.receipts,
      now: NOW,
      decision_id: "runtime.binding-decision.second",
      decision_event_predecessor_digest: activated.decisionEvent.event_digest,
      decision_event_sequence: 2,
      current_projection: activated.fixture.projection,
    });
    const eventStore = new SqliteEventStore(activated.eventPath, {
      permitted_data_classes: BINDING_DATA_CLASSES,
      runtime_version: "24.14.0",
    });
    await eventStore.append(next.decision_command);
    eventStore.close();
    const decisionPath = await writeDecision(activated.root, next.decision);
    await writeFile(
      activated.authorityPath,
      canonicalJson(next.authority_bundle),
      { mode: 0o600 },
    );

    const receipt = await bindRuntime({
      project_root: activated.root,
      proposal_path: activated.proposalPath,
      decision_path: decisionPath,
    });

    expect(receipt).toMatchObject({
      status: "activated",
      binding_id: next.binding.binding_id,
      binding_digest: next.binding_digest,
      activation_event_ref: next.activation_command.event_id,
    });
    const projection = JSON.parse(await readFile(
      join(activated.root, ".contentmd/runtime/current-runtime-binding.json"),
      "utf8",
    ));
    expect(projection.binding).toMatchObject({
      binding_version: 2,
      predecessor_binding_digest: activated.fixture.binding_digest,
    });
    const readback = new SqliteEventStore(activated.eventPath, {
      permitted_data_classes: BINDING_DATA_CLASSES,
      runtime_version: "24.14.0",
    });
    const activations = await readback.readStream(next.activation_command.stream_id);
    readback.close();
    expect(activations.map((event) => event.event_id)).toEqual([
      activated.fixture.activation_command.event_id,
      next.activation_command.event_id,
    ]);
  });
});
