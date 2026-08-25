import type { PreparedOpenAIResponsesRequest } from "./serialize.js";

export interface ResolveOpenAIDestinationInput {
  prepared: PreparedOpenAIResponsesRequest;
  test_mode: boolean;
  test_origin?: string;
}

export interface ResolvedOpenAIDestination {
  authorized_origin: "https://api.openai.com";
  effective_origin: string;
  path: "/v1/responses";
  url: string;
  redirect: "error";
}

function invalid(detail: string): never {
  throw new TypeError(`openai_destination_invalid:${detail}`);
}

function reservedTestOrigin(value: string): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return invalid("test_origin");
  }
  if (url.protocol !== "https:"
    || url.username !== ""
    || url.password !== ""
    || url.port !== ""
    || url.pathname !== "/"
    || url.search !== ""
    || url.hash !== ""
    || !(url.hostname.endsWith(".test") || url.hostname.endsWith(".invalid"))) {
    return invalid("test_origin");
  }
  return url.origin;
}

export function resolveOpenAIDestination(
  input: ResolveOpenAIDestinationInput,
): Readonly<ResolvedOpenAIDestination> {
  if (input.prepared.destination_origin !== "https://api.openai.com"
    || input.prepared.destination_path !== "/v1/responses"
    || input.prepared.method !== "POST") {
    return invalid("prepared_request");
  }
  if (!input.test_mode && input.test_origin !== undefined) {
    return invalid("test_origin_in_production");
  }
  const effectiveOrigin = input.test_mode && input.test_origin !== undefined
    ? reservedTestOrigin(input.test_origin)
    : "https://api.openai.com";
  return Object.freeze({
    authorized_origin: "https://api.openai.com",
    effective_origin: effectiveOrigin,
    path: "/v1/responses",
    url: `${effectiveOrigin}/v1/responses`,
    redirect: "error",
  });
}
