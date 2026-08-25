import {
  providerRecordDigestValid,
  type RequestHeaderTemplate,
  type SecretRef,
} from "@contentmd/governance";

export interface OpenAISecretLease {
  readonly secret_ref_id: string;
  readonly environment: "test" | "production";
  withSecret<T>(use: (value: string) => Promise<T>): Promise<T>;
}

export interface OpenAISecretResolver {
  resolve(ref: SecretRef): Promise<OpenAISecretLease>;
}

export interface ResolveOpenAIHeadersInput {
  template: RequestHeaderTemplate;
  secret_ref: SecretRef;
  test_mode: boolean;
  resolver: OpenAISecretResolver;
}

function invalid(detail: string): never {
  throw new TypeError(`openai_secret_invalid:${detail}`);
}

function validateBindings(input: ResolveOpenAIHeadersInput): void {
  if (input.template.status !== "current"
    || input.template.provider_id !== "provider.openai"
    || input.template.adapter_id !== "adapter.openai.responses"
    || input.template.adapter_version !== "0.1.0"
    || !providerRecordDigestValid(
      input.template as unknown as Record<string, unknown>,
      "template_digest",
    )) invalid("header_template");
  if (input.secret_ref.status !== "current"
    || input.secret_ref.provider_id !== "provider.openai"
    || input.secret_ref.origin !== "https://api.openai.com"
    || input.secret_ref.endpoint_class !== "responses"
    || input.secret_ref.authorization_header_name !== "authorization"
    || !providerRecordDigestValid(
      input.secret_ref as unknown as Record<string, unknown>,
      "secret_ref_digest",
    )) invalid("secret_ref");
  if (input.template.derived_transport_headers.join(",") !== "content-length,host") {
    invalid("derived_transport_headers");
  }
  const placeholders = input.template.application_headers.filter(
    (header) => header.value.kind === "secret_ref",
  );
  if (placeholders.length !== 1
    || placeholders[0]?.name !== input.secret_ref.authorization_header_name
    || placeholders[0]?.value.kind !== "secret_ref"
    || placeholders[0].value.secret_ref_id !== input.secret_ref.secret_ref_id) {
    invalid("secret_placeholder");
  }
}

export async function withResolvedOpenAIHeaders<T>(
  input: ResolveOpenAIHeadersInput,
  use: (headers: Readonly<Record<string, string>>) => Promise<T>,
): Promise<T> {
  validateBindings(input);
  const lease = await input.resolver.resolve(input.secret_ref);
  if (lease.secret_ref_id !== input.secret_ref.secret_ref_id) invalid("lease_binding");
  if (input.test_mode && lease.environment === "production") {
    invalid("production_secret_in_test");
  }
  return lease.withSecret(async (secret) => {
    if (typeof secret !== "string" || secret.length === 0 || /[\r\n\0]/u.test(secret)) {
      return invalid("secret_value");
    }
    const headers: Record<string, string> = {};
    for (const header of input.template.application_headers) {
      headers[header.name] = header.value.kind === "literal"
        ? header.value.value
        : `Bearer ${secret}`;
    }
    return use(Object.freeze(headers));
  });
}
