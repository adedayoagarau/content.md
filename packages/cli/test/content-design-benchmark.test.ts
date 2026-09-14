import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { buildProgram } from "../src/main.js";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const packet = join(root, "docs/tests/fixtures/content-design-scenarios/review-sample-100.json");
const temporary: string[] = [];

afterEach(async () => {
  await Promise.all(temporary.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

describe("contentmd benchmark content-design", () => {
  it("writes a packet-bound prediction set to a new path", async () => {
    const directory = await mkdtemp(join(tmpdir(), "contentmd-benchmark-cli-"));
    temporary.push(directory);
    const output = join(directory, "predictions.json");
    await buildProgram().parseAsync(["node", "contentmd", "benchmark", "content-design", "--packet", packet, "--out", output]);
    const result = JSON.parse(await readFile(output, "utf8"));
    expect(result.prediction_count).toBe(100);
    expect(result.evaluation_status).toBe("unscored_pending_qualified_gold");
  });
});
