import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { startContentDesignReviewWorkbench } from "@contentmd/workbench";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const packet = join(root, "docs/tests/fixtures/content-design-scenarios/review-sample-100.json");
const calibrationPacket = join(root, "docs/tests/fixtures/content-design-scenarios/calibration-cohort-500.json");

describe("content-design review workbench", () => {
  it("serves a blinded, loopback-only review experience", async () => {
    const server = await startContentDesignReviewWorkbench({ packet, port: 0 });
    try {
      const [page, data, client] = await Promise.all([
        fetch(server.url).then((response) => response.text()),
        fetch(`${server.url}review-data.json`).then((response) => response.json()),
        fetch(`${server.url}review.js`).then((response) => response.text()),
      ]);
      expect(page).toContain("Judge the meaning, not the generator");
      expect(page).toContain("id=\"state\"");
      expect(page).toContain("id=\"consequence\"");
      expect(page).toContain("id=\"evidence\"");
      expect(page).toContain("id=\"next-incomplete\"");
      expect(page).toContain("id=\"qualification-json\"");
      expect(data.packet.sample_count).toBe(100);
      expect(data.template.submission_state).toBe("incomplete");
      expect(data.template.reviewer.qualification_bundle).toBeNull();
      for (const unit of data.packet.review_work_units) {
        expect(unit.candidate).not.toHaveProperty("injected_defect");
        expect(unit.candidate).not.toHaveProperty("voice");
        expect(unit.candidate).not.toHaveProperty("tone");
        expect(unit).not.toHaveProperty("provisional_expectation");
      }
      expect(client).toContain("localStorage");
      expect(client).toContain("unit.context.voice_profile");
      expect(client).not.toContain("unit.candidate.voice");
      expect(client).toContain("Current review incomplete");
      expect(client).toContain("qualityComplete");
      expect(client).toContain("rfc3339");
      expect(client).toContain("qualification_bundle");
      expect(page).toContain("Export completed review");
      expect(client).toContain("contentmd-review-submission.json");
    } finally {
      await server.close();
    }
  });

  it("serves the repository calibration cohort without changing its authority", async () => {
    const server = await startContentDesignReviewWorkbench({ packet: calibrationPacket, port: 0 });
    try {
      const data = await fetch(`${server.url}review-data.json`).then((response) => response.json());
      expect(data.packet.sample_count).toBe(500);
      expect(data.packet.authority_effect).toBe("none");
      expect(data.template.responses).toHaveLength(500);
      expect(data.template.authority_effect).toBe("none");
    } finally {
      await server.close();
    }
  });

  it("rejects non-loopback binding", async () => {
    await expect(startContentDesignReviewWorkbench({ packet, host: "0.0.0.0", port: 0 }))
      .rejects.toThrow("benchmark_review_host_not_local");
  });
});
