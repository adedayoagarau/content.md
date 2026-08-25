const REDACTED = "[REDACTED]" as const;
const CIRCULAR = "[CIRCULAR]" as const;

const SENSITIVE_KEYS = new Set([
  "authorization",
  "proxy-authorization",
  "x-api-key",
  "api-key",
  "openai-api-key",
  "secret",
  "secret_value",
  "credential",
  "credential_value",
  "access_token",
  "bearer_token",
  "cookie",
  "set-cookie",
]);

export interface RedactedOpenAIError {
  name: string;
  message: string;
  code: string | null;
}

function redactText(value: string, secretValues: readonly string[]): string {
  let result = value;
  for (const secret of [...new Set(secretValues)]
    .filter((candidate) => candidate.length > 0)
    .sort((left, right) => right.length - left.length)) {
    result = result.split(secret).join(REDACTED);
  }
  result = result
    .replace(/\bBearer\s+[A-Za-z0-9._~+/=-]+/giu, `Bearer ${REDACTED}`)
    .replace(/\b(?:sk|sess)-[A-Za-z0-9_-]{8,}\b/giu, REDACTED)
    .replace(/\bOPENAI_API_KEY\s*=\s*[^\s,;]+/giu, `OPENAI_API_KEY=${REDACTED}`);
  return result;
}

function freeze<T>(value: T, seen = new Set<object>()): T {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) freeze(descriptor.value, seen);
  }
  return Object.freeze(value);
}

export function redactOpenAIValue(
  value: unknown,
  secretValues: readonly string[] = [],
): unknown {
  const seen = new WeakSet<object>();
  const visit = (current: unknown, sensitive = false): unknown => {
    if (sensitive) return REDACTED;
    if (typeof current === "string") return redactText(current, secretValues);
    if (current === null || typeof current === "boolean") return current;
    if (typeof current === "number") return Number.isFinite(current) ? current : String(current);
    if (typeof current === "bigint" || typeof current === "symbol" || typeof current === "function"
      || current === undefined) return String(current);
    if (seen.has(current)) return CIRCULAR;
    seen.add(current);
    if (Array.isArray(current)) return current.map((item) => visit(item));
    const output: Record<string, unknown> = {};
    const keys = Reflect.ownKeys(current)
      .filter((key): key is string => typeof key === "string")
      .sort((left, right) => Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8")));
    for (const key of keys) {
      const descriptor = Object.getOwnPropertyDescriptor(current, key);
      if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) continue;
      output[key] = visit(descriptor.value, SENSITIVE_KEYS.has(key.toLowerCase()));
    }
    return output;
  };
  return freeze(visit(value));
}

export function redactOpenAIError(
  error: unknown,
  secretValues: readonly string[] = [],
): Readonly<RedactedOpenAIError> {
  const name = error instanceof Error && error.name.length > 0 ? error.name : "Error";
  const rawMessage = error instanceof Error ? error.message : String(error);
  const rawCode = error !== null && typeof error === "object"
    ? Object.getOwnPropertyDescriptor(error, "code")?.value
    : null;
  return freeze({
    name: redactText(name, secretValues).slice(0, 128),
    message: redactText(rawMessage, secretValues).slice(0, 1024),
    code: typeof rawCode === "string" ? redactText(rawCode, secretValues).slice(0, 128) : null,
  });
}
