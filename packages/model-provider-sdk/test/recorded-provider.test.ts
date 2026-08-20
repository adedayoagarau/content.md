import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  RecordedModelProvider,
  createModelRequest,
  modelRequestDigest,
} from "@contentmd/model-provider-sdk";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

describe("RecordedModelProvider", () => {
  it("returns an exact digest-bound recorded response", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-recorded-provider-"));
    temporaryDirectories.push(root);
    const request = createModelRequest({
      operation: "draft",
      output_schema_id: "contentmd.test-output/0.1.0",
      input: { task: "fixture" },
    });
    const cassette = {
      schema_version: "contentmd.recorded-model-entry/0.1.0",
      request_digest: modelRequestDigest(request),
      provider_id: "provider.recorded-fixture",
      model_id: "model.synthetic-writer-v1",
      output: { text: "Recorded output" },
      input_tokens: 11,
      output_tokens: 4,
      deterministic_status: "recorded_exact",
    };
    const path = join(root, "cassette.jsonl");
    await writeFile(path, `${JSON.stringify(cassette)}\n`);
    const provider = await RecordedModelProvider.fromFile(path);

    const response = await provider.generate(request);

    expect(response.input_digest).toBe(modelRequestDigest(request));
    expect(response.output).toEqual({ text: "Recorded output" });
    expect(response.output_digest).toMatch(/^[a-f0-9]{64}$/);
    expect(response.deterministic_status).toBe("recorded_exact");
    expect(response.provider_id).toBe("provider.recorded-fixture");
  });

  it("fails closed when the exact request digest is absent", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-recorded-provider-"));
    temporaryDirectories.push(root);
    const path = join(root, "cassette.jsonl");
    await writeFile(path, "");
    const provider = await RecordedModelProvider.fromFile(path);
    const request = createModelRequest({
      operation: "rewrite",
      output_schema_id: "contentmd.test-output/0.1.0",
      input: { task: "not-recorded" },
    });

    await expect(provider.generate(request)).rejects.toThrow(
      `recorded_response_not_found:${modelRequestDigest(request)}`,
    );
  });
});
