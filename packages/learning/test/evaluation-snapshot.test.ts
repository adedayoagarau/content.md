import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const RUNNER = fileURLToPath(new URL("./task6-snapshot-runner.ts", import.meta.url));

describe("Task 6 complete snapshot transfer", () => {
  it("transfers a complete sealed replay without expanding repeated evidence", () => {
    const raw = execFileSync(process.execPath, [
      "--max-old-space-size=4096",
      "--import",
      "tsx",
      RUNNER,
    ], {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 1024 * 1024,
      timeout: 600_000,
    });
    const result = JSON.parse(raw) as {
      contract_version: string;
      authority_effect: string;
      state_encoding: string;
      state_byte_count: number;
      first_transfer_generation: number;
      successor_transfer_generation: number;
      root_lineage_preserved: boolean;
      handle_reauthenticated: boolean;
      snapshot_digest: string;
      successor_snapshot_digest: string;
    };

    expect(result).toMatchObject({
      contract_version: "contentmd.task6-snapshot-acceptance/0.1.0",
      authority_effect: "none",
      state_encoding: "base64-canonical-dag-json-utf8",
      first_transfer_generation: 1,
      successor_transfer_generation: 2,
      root_lineage_preserved: true,
      handle_reauthenticated: true,
    });
    expect(result.state_byte_count).toBeLessThan(20_000_000);
    expect(result.snapshot_digest).toMatch(/^[a-f0-9]{64}$/u);
    expect(result.successor_snapshot_digest).toMatch(/^[a-f0-9]{64}$/u);
  }, 600_000);
});
