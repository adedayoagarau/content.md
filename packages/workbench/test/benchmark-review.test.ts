import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { startContentDesignReviewWorkbench } from "@contentmd/workbench";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const packet = join(root, "docs/tests/fixtures/content-design-scenarios/review-sample-100.json");

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
      expect(data.packet.sample_count).toBe(100);
      expect(data.template.submission_state).toBe("incomplete");
      for (const unit of data.packet.review_work_units) {
        expect(unit.candidate).not.toHaveProperty("injected_defect");
        expect(unit).not.toHaveProperty("provisional_expectation");
      }
      expect(client).toContain("localStorage");
      expect(page).toContain("Export completed review");
      expect(client).toContain("contentmd-review-submission.json");
    } finally {
      await server.close();
    }
  });

  it("rejects non-loopback binding", async () => {
    await expect(startContentDesignReviewWorkbench({ packet, host: "0.0.0.0", port: 0 }))
      .rejects.toThrow("benchmark_review_host_not_local");
  });
});
