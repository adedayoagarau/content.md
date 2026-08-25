import { describe, expect, it } from "vitest";
import {
  canonicalJson,
  decodeCanonicalDag,
  encodeCanonicalDag,
  sha256Canonical,
} from "../src/index.js";

describe("canonical content-addressed DAG", () => {
  it("stores repeated evidence once and reconstructs the exact canonical value", () => {
    const evidence = {
      record_id: "evidence.shared",
      facts: ["amount", "currency", "status"],
      policy: { state: "current", publication_effect: "none" },
    };
    const input = {
      contract_version: "contentmd.test-replay/0.1.0",
      candidates: Array.from({ length: 100 }, (_, index) => ({
        candidate_id: `candidate.${String(index).padStart(3, "0")}`,
        evidence,
      })),
    };

    const dag = encodeCanonicalDag(input);
    const decoded = decodeCanonicalDag(dag);
    const evidenceDigest = encodeCanonicalDag(evidence).root_digest;

    expect(canonicalJson(decoded)).toBe(canonicalJson(input));
    expect(dag.nodes.filter(({ node_digest }) => node_digest === evidenceDigest)).toHaveLength(1);
    expect(dag.nodes.length).toBeLessThan(250);
    expect(dag.manifest_digest).toBe(sha256Canonical({
      contract_version: dag.contract_version,
      root_digest: dag.root_digest,
      nodes: dag.nodes,
    }));
    expect(Object.isFrozen(decoded)).toBe(true);
  });

  it("rejects tampered, dangling, and unreachable node tables", () => {
    const dag = encodeCanonicalDag({ stable: { value: "approved" } });
    const tampered = structuredClone(dag);
    const node = tampered.nodes.find((candidate) => candidate.kind === "string")!;
    if (node.kind !== "string") throw new Error("expected string node");
    node.value = "changed";
    expect(() => decodeCanonicalDag(tampered)).toThrow("canonical_dag_node_digest_mismatch");

    const dangling = structuredClone(dag);
    const objectNode = dangling.nodes.find((candidate) => candidate.kind === "object")!;
    if (objectNode.kind !== "object") throw new Error("expected object node");
    objectNode.entries[0]![1] = "f".repeat(64);
    const { node_digest: _digest, ...preimage } = objectNode;
    objectNode.node_digest = sha256Canonical(preimage);
    dangling.root_digest = objectNode.node_digest;
    dangling.nodes.sort((left, right) => left.node_digest.localeCompare(right.node_digest));
    dangling.manifest_digest = sha256Canonical({
      contract_version: dangling.contract_version,
      root_digest: dangling.root_digest,
      nodes: dangling.nodes,
    });
    expect(() => decodeCanonicalDag(dangling)).toThrow("canonical_dag_dangling_ref");

    const injected = structuredClone(dag);
    const extra = encodeCanonicalDag("unreachable").nodes[0]!;
    injected.nodes.push(extra);
    injected.nodes.sort((left, right) => left.node_digest.localeCompare(right.node_digest));
    injected.manifest_digest = sha256Canonical({
      contract_version: injected.contract_version,
      root_digest: injected.root_digest,
      nodes: injected.nodes,
    });
    expect(() => decodeCanonicalDag(injected)).toThrow("canonical_dag_unreachable_node");
  });

  it("rejects accessors and cyclic input before reading an accessor", () => {
    let reads = 0;
    const trapped = {} as Record<string, unknown>;
    Object.defineProperty(trapped, "secret", {
      enumerable: true,
      get() {
        reads += 1;
        return "do-not-read";
      },
    });
    expect(() => encodeCanonicalDag(trapped)).toThrow("canonical_dag_input_invalid");
    expect(reads).toBe(0);

    const cyclic: { self?: unknown } = {};
    cyclic.self = cyclic;
    expect(() => encodeCanonicalDag(cyclic)).toThrow("canonical_dag_cycle");
  });
});
