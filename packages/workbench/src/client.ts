export const WORKBENCH_CLIENT_MODULE = `(() => {
  "use strict";
  for (const form of document.querySelectorAll(".improvement-form")) {
    const output = form.querySelector(".improvement-result");
    const compareButton = form.querySelector("button[type=submit]");
    const applyButton = form.querySelector(".apply-improvement");
    const undoButton = form.querySelector(".undo-improvement");
    const confirmation = form.querySelector("[name=confirm_apply]");
    const requestBody = (previewPatch) => {
      const facts = {};
      for (const input of form.querySelectorAll("[data-fact]")) {
        if (input instanceof HTMLInputElement) facts[input.dataset.fact] = input.value;
      }
      const candidate = form.querySelector("[name=candidate]");
      if (!(candidate instanceof HTMLTextAreaElement)) throw new Error("Candidate input unavailable");
      return { finding_id: form.dataset.findingId, facts, candidate_expression: candidate.value, preview_patch: previewPatch };
    };
    const post = async (path, body) => {
      const response = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Request failed");
      return result;
    };
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const preview = form.querySelector("[name=preview_patch]");
      if (!(output instanceof HTMLOutputElement) || !(compareButton instanceof HTMLButtonElement) || !(preview instanceof HTMLInputElement)) return;
      compareButton.disabled = true;
      if (applyButton instanceof HTMLButtonElement) applyButton.disabled = true;
      if (undoButton instanceof HTMLButtonElement) undoButton.disabled = true;
      form.dataset.transactionDigest = "";
      output.textContent = "Comparing against the current source…";
      try {
        const result = await post("/api/improvement/compare", requestBody(preview.checked));
        const lines = ["Status: " + result.comparison.status];
        for (const check of result.comparison.checks) lines.push((check.passed ? "✓ " : "○ ") + check.check + " — " + check.rationale);
        if (result.patch_preview) {
          lines.push("", "Patch preview — not applied", result.patch_preview.unified_diff);
          form.dataset.transactionDigest = result.patch_preview.transaction_digest;
          if (applyButton instanceof HTMLButtonElement) applyButton.disabled = false;
        }
        output.textContent = lines.join("\n");
      } catch (error) {
        output.textContent = error instanceof Error ? error.message : "Comparison failed";
      } finally {
        compareButton.disabled = false;
      }
    });
    if (applyButton instanceof HTMLButtonElement) applyButton.addEventListener("click", async () => {
      if (!(output instanceof HTMLOutputElement) || !(confirmation instanceof HTMLInputElement)) return;
      const transactionDigest = form.dataset.transactionDigest;
      if (!transactionDigest || !confirmation.checked) {
        output.textContent = "Review the exact patch and select the confirmation checkbox before applying.";
        return;
      }
      applyButton.disabled = true;
      output.textContent = "Applying and verifying one local source change…";
      try {
        const result = await post("/api/improvement/apply", {
          ...requestBody(true), transaction_digest: transactionDigest, confirmed: true,
        });
        output.textContent = "Applied and verified: " + result.target_path + "\nUndo is available for this exact change.";
        if (undoButton instanceof HTMLButtonElement) undoButton.disabled = false;
      } catch (error) {
        output.textContent = error instanceof Error ? error.message : "Apply failed";
        applyButton.disabled = false;
      }
    });
    if (undoButton instanceof HTMLButtonElement) undoButton.addEventListener("click", async () => {
      if (!(output instanceof HTMLOutputElement)) return;
      const transactionDigest = form.dataset.transactionDigest;
      if (!transactionDigest) return;
      undoButton.disabled = true;
      output.textContent = "Restoring and verifying the previous source bytes…";
      try {
        const result = await post("/api/improvement/undo", { transaction_digest: transactionDigest, confirmed: true });
        output.textContent = "Restored and verified: " + result.target_path;
        form.dataset.transactionDigest = "";
        if (confirmation instanceof HTMLInputElement) confirmation.checked = false;
      } catch (error) {
        output.textContent = error instanceof Error ? error.message : "Undo failed";
        undoButton.disabled = false;
      }
    });
  }
})();`;
