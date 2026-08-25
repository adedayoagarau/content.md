import { canonicalJson, sha256Canonical, type JsonValue } from "./canonical-json.js";

const DIGEST = /^[a-f0-9]{64}$/u;

export type CanonicalDagNode =
  | { kind: "null"; node_digest: string }
  | { kind: "boolean"; value: boolean; node_digest: string }
  | { kind: "number"; value: number; node_digest: string }
  | { kind: "string"; value: string; node_digest: string }
  | { kind: "array"; items: string[]; node_digest: string }
  | { kind: "object"; entries: Array<[string, string]>; node_digest: string };

type CanonicalDagNodePreimage<T extends CanonicalDagNode = CanonicalDagNode> =
  T extends unknown ? Omit<T, "node_digest"> : never;

export interface CanonicalDag {
  contract_version: "contentmd.canonical-dag/0.1.0";
  root_digest: string;
  nodes: CanonicalDagNode[];
  manifest_digest: string;
}

function fail(code: string): never {
  throw new TypeError(code);
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function exactDataKeys(value: unknown, expected: readonly string[]): asserts value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail("canonical_dag_input_invalid");
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) fail("canonical_dag_input_invalid");
  const keys = Reflect.ownKeys(value);
  if (keys.length !== expected.length
    || keys.some((key) => typeof key !== "string")
    || expected.some((key) => !keys.includes(key))) fail("canonical_dag_input_invalid");
  for (const key of expected) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      fail("canonical_dag_input_invalid");
    }
  }
}

function immutable<T>(value: T, seen = new Set<object>()): T {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) immutable(descriptor.value, seen);
  }
  Object.freeze(value);
  return value;
}

function nodePreimage(node: CanonicalDagNode): CanonicalDagNodePreimage {
  const { node_digest: _digest, ...preimage } = node;
  return preimage;
}

export function encodeCanonicalDag(value: unknown): CanonicalDag {
  const nodes = new Map<string, CanonicalDagNode>();
  const ancestors = new Set<object>();
  const intern = (preimage: CanonicalDagNodePreimage): string => {
    const nodeDigest = sha256Canonical(preimage);
    const node = { ...preimage, node_digest: nodeDigest } as CanonicalDagNode;
    const existing = nodes.get(nodeDigest);
    if (existing !== undefined && canonicalJson(existing) !== canonicalJson(node)) {
      fail("canonical_dag_digest_collision");
    }
    nodes.set(nodeDigest, node);
    return nodeDigest;
  };
  const visit = (current: unknown): string => {
    if (current === null) return intern({ kind: "null" });
    if (typeof current === "boolean") return intern({ kind: "boolean", value: current });
    if (typeof current === "string") return intern({ kind: "string", value: current });
    if (typeof current === "number") {
      if (!Number.isFinite(current)) fail("canonical_dag_input_invalid");
      return intern({ kind: "number", value: Object.is(current, -0) ? 0 : current });
    }
    if (typeof current !== "object") fail("canonical_dag_input_invalid");
    if (ancestors.has(current)) fail("canonical_dag_cycle");
    ancestors.add(current);
    try {
      if (Array.isArray(current)) {
        if (Object.getPrototypeOf(current) !== Array.prototype
          || Reflect.ownKeys(current).some((key) => key !== "length"
            && (typeof key !== "string" || !/^(0|[1-9][0-9]*)$/u.test(key)))) {
          fail("canonical_dag_input_invalid");
        }
        const items = current.map((item, index) => {
          const descriptor = Object.getOwnPropertyDescriptor(current, String(index));
          if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
            return fail("canonical_dag_input_invalid");
          }
          return visit(item);
        });
        return intern({ kind: "array", items });
      }
      const prototype = Object.getPrototypeOf(current);
      if (prototype !== Object.prototype && prototype !== null) fail("canonical_dag_input_invalid");
      const keys = Reflect.ownKeys(current);
      if (keys.some((key) => typeof key !== "string")) fail("canonical_dag_input_invalid");
      const entries = (keys as string[]).sort(compareText).map((key): [string, string] => {
        const descriptor = Object.getOwnPropertyDescriptor(current, key);
        if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
          return fail("canonical_dag_input_invalid");
        }
        return [key, visit(descriptor.value)];
      });
      return intern({ kind: "object", entries });
    } finally {
      ancestors.delete(current);
    }
  };
  const rootDigest = visit(value);
  const orderedNodes = [...nodes.values()].sort((left, right) => (
    compareText(left.node_digest, right.node_digest)
  ));
  const preimage = {
    contract_version: "contentmd.canonical-dag/0.1.0" as const,
    root_digest: rootDigest,
    nodes: orderedNodes,
  };
  return immutable({ ...preimage, manifest_digest: sha256Canonical(preimage) });
}

export function decodeCanonicalDag(input: CanonicalDag): JsonValue {
  exactDataKeys(input, ["contract_version", "root_digest", "nodes", "manifest_digest"]);
  if (input.contract_version !== "contentmd.canonical-dag/0.1.0"
    || !DIGEST.test(input.root_digest)
    || !DIGEST.test(input.manifest_digest)
    || !Array.isArray(input.nodes)) fail("canonical_dag_input_invalid");
  const nodes = new Map<string, CanonicalDagNode>();
  let previousDigest: string | null = null;
  for (const node of input.nodes) {
    if (node === null || typeof node !== "object" || Array.isArray(node)) {
      fail("canonical_dag_input_invalid");
    }
    const kind = (node as { kind?: unknown }).kind;
    if (kind === "null") exactDataKeys(node, ["kind", "node_digest"]);
    else if (kind === "boolean" || kind === "number" || kind === "string") {
      exactDataKeys(node, ["kind", "value", "node_digest"]);
    } else if (kind === "array") exactDataKeys(node, ["kind", "items", "node_digest"]);
    else if (kind === "object") exactDataKeys(node, ["kind", "entries", "node_digest"]);
    else fail("canonical_dag_input_invalid");
    const typed = node as CanonicalDagNode;
    if (!DIGEST.test(typed.node_digest)) fail("canonical_dag_input_invalid");
    if (typed.kind === "boolean" && typeof typed.value !== "boolean") {
      fail("canonical_dag_input_invalid");
    }
    if (typed.kind === "number"
      && (typeof typed.value !== "number" || !Number.isFinite(typed.value)
        || Object.is(typed.value, -0))) fail("canonical_dag_input_invalid");
    if (typed.kind === "string" && typeof typed.value !== "string") {
      fail("canonical_dag_input_invalid");
    }
    if (typed.kind === "array"
      && (!Array.isArray(typed.items) || typed.items.some((digest) => !DIGEST.test(digest)))) {
      fail("canonical_dag_input_invalid");
    }
    if (typed.kind === "object") {
      if (!Array.isArray(typed.entries)) fail("canonical_dag_input_invalid");
      let priorKey: string | null = null;
      for (const entry of typed.entries) {
        if (!Array.isArray(entry) || entry.length !== 2
          || typeof entry[0] !== "string" || !DIGEST.test(entry[1])
          || (priorKey !== null && compareText(priorKey, entry[0]) >= 0)) {
          fail("canonical_dag_input_invalid");
        }
        priorKey = entry[0];
      }
    }
    if (typed.node_digest !== sha256Canonical(nodePreimage(typed))) {
      fail("canonical_dag_node_digest_mismatch");
    }
    if (previousDigest !== null && compareText(previousDigest, typed.node_digest) >= 0) {
      fail("canonical_dag_node_order_invalid");
    }
    previousDigest = typed.node_digest;
    nodes.set(typed.node_digest, typed);
  }
  if (input.manifest_digest !== sha256Canonical({
    contract_version: input.contract_version,
    root_digest: input.root_digest,
    nodes: input.nodes,
  })) fail("canonical_dag_manifest_digest_mismatch");
  const memo = new Map<string, JsonValue>();
  const visiting = new Set<string>();
  const reachable = new Set<string>();
  const build = (digest: string): JsonValue => {
    const existing = memo.get(digest);
    if (existing !== undefined) return existing;
    if (visiting.has(digest)) fail("canonical_dag_cycle");
    const node = nodes.get(digest);
    if (node === undefined) fail("canonical_dag_dangling_ref");
    visiting.add(digest);
    reachable.add(digest);
    let value: JsonValue;
    if (node.kind === "null") value = null;
    else if (node.kind === "boolean" || node.kind === "number" || node.kind === "string") {
      value = node.value;
    } else if (node.kind === "array") {
      value = node.items.map(build);
    } else {
      const record: Record<string, JsonValue> = {};
      for (const [key, childDigest] of node.entries) {
        Object.defineProperty(record, key, {
          value: build(childDigest),
          enumerable: true,
          configurable: false,
          writable: false,
        });
      }
      value = record;
    }
    visiting.delete(digest);
    immutable(value);
    memo.set(digest, value);
    return value;
  };
  const result = build(input.root_digest);
  if (reachable.size !== nodes.size) fail("canonical_dag_unreachable_node");
  return result;
}
