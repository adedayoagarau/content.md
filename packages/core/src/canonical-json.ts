import { createHash } from "node:crypto";

export type JsonPrimitive = null | boolean | number | string;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

function fail(path: string, detail: string): never {
  throw new TypeError(`Value at ${path} is not canonical JSON: ${detail}`);
}

function canonicalize(value: unknown, path: string, ancestors: Set<object>): string {
  if (value === null) return "null";

  if (typeof value === "string" || typeof value === "boolean") {
    return JSON.stringify(value);
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) fail(path, "numbers must be finite");
    return JSON.stringify(Object.is(value, -0) ? 0 : value);
  }

  if (typeof value !== "object") {
    fail(path, `unsupported ${typeof value} value`);
  }

  if (ancestors.has(value)) {
    throw new TypeError(`Canonical JSON cycle detected at ${path}`);
  }

  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      return `[${value
        .map((item, index) => canonicalize(item, `${path}[${index}]`, ancestors))
        .join(",")}]`;
    }

    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      fail(path, "objects must be plain records");
    }

    const ownKeys = Reflect.ownKeys(value);
    if (ownKeys.some((key) => typeof key !== "string")) {
      fail(path, "symbol keys are not supported");
    }

    const entries = (ownKeys as string[])
      .sort((left, right) => left.localeCompare(right, "en"))
      .map((key) => {
        const descriptor = Object.getOwnPropertyDescriptor(value, key);
        if (!descriptor?.enumerable || !("value" in descriptor)) {
          fail(`${path}.${key}`, "properties must be enumerable data properties");
        }
        return `${JSON.stringify(key)}:${canonicalize(descriptor.value, `${path}.${key}`, ancestors)}`;
      });

    return `{${entries.join(",")}}`;
  } finally {
    ancestors.delete(value);
  }
}

function streamCanonical(
  value: unknown,
  path: string,
  ancestors: Set<object>,
  write: (chunk: string) => void,
): void {
  if (value === null) {
    write("null");
    return;
  }

  if (typeof value === "string" || typeof value === "boolean") {
    write(JSON.stringify(value));
    return;
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) fail(path, "numbers must be finite");
    write(JSON.stringify(Object.is(value, -0) ? 0 : value));
    return;
  }

  if (typeof value !== "object") {
    fail(path, `unsupported ${typeof value} value`);
  }

  if (ancestors.has(value)) {
    throw new TypeError(`Canonical JSON cycle detected at ${path}`);
  }

  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      write("[");
      value.forEach((item, index) => {
        if (index > 0) write(",");
        streamCanonical(item, `${path}[${index}]`, ancestors, write);
      });
      write("]");
      return;
    }

    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      fail(path, "objects must be plain records");
    }

    const ownKeys = Reflect.ownKeys(value);
    if (ownKeys.some((key) => typeof key !== "string")) {
      fail(path, "symbol keys are not supported");
    }

    const keys = (ownKeys as string[]).sort((left, right) => left.localeCompare(right, "en"));
    write("{");
    keys.forEach((key, index) => {
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor?.enumerable || !("value" in descriptor)) {
        fail(`${path}.${key}`, "properties must be enumerable data properties");
      }
      if (index > 0) write(",");
      write(JSON.stringify(key));
      write(":");
      streamCanonical(descriptor.value, `${path}.${key}`, ancestors, write);
    });
    write("}");
  } finally {
    ancestors.delete(value);
  }
}

export function canonicalJson(value: unknown): string {
  return `${canonicalize(value, "$", new Set())}\n`;
}

export function sha256Canonical(value: unknown): string {
  const hash = createHash("sha256");
  let buffered = "";
  const write = (chunk: string): void => {
    if (buffered.length + chunk.length <= 65_536) {
      buffered += chunk;
      return;
    }
    if (buffered.length > 0) {
      hash.update(buffered, "utf8");
      buffered = "";
    }
    if (chunk.length > 65_536) {
      hash.update(chunk, "utf8");
    } else {
      buffered = chunk;
    }
  };

  streamCanonical(value, "$", new Set(), write);
  write("\n");
  if (buffered.length > 0) hash.update(buffered, "utf8");
  return hash.digest("hex");
}
