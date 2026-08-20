import { cp, mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import {
  AdapterCapabilityError,
  FilesystemContentAdapter,
} from "@contentmd/adapter-filesystem";

const fixtureRoot = fileURLToPath(
  new URL("../../../fixtures/synthetic-web-app/", import.meta.url),
);
const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

describe("FilesystemContentAdapter discovery", () => {
  it("discovers content with exact source and context coordinates", async () => {
    const adapter = new FilesystemContentAdapter();
    const result = await adapter.discover({ project_root: fixtureRoot });

    expect(result.adapter_id).toBe("adapter.filesystem");
    expect(result.occurrences).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source_artifact: "src/App.tsx",
          line: 8,
          column: 12,
          syntax_kind: "jsx_text",
          expression_payload: "Unlock a seamless experience that empowers your journey.",
          channel: "web",
          modality: "visible",
          component: "App",
        }),
        expect.objectContaining({
          source_artifact: "src/components/CheckoutSummary.tsx",
          syntax_kind: "jsx_attribute",
          expression_payload: "Action",
          modality: "assistive",
          component: "CheckoutSummary",
        }),
        expect.objectContaining({
          source_artifact: "public/index.html",
          syntax_kind: "html_title",
          expression_payload: "The smartest way to buy anything",
        }),
        expect.objectContaining({
          source_artifact: "src/routes.ts",
          syntax_kind: "object_property",
          expression_payload: "Hub",
          route: "/workspaces",
        }),
        expect.objectContaining({
          source_artifact: "src/messages/fr-CA.json",
          syntax_kind: "locale_message",
          expression_payload: "Payment failed. Try again.",
          locale: "fr-CA",
        }),
      ]),
    );
    expect(result.occurrences.every((item) => item.line >= 1 && item.column >= 1)).toBe(true);
    expect(result.scan_digest).toMatch(/^[a-f0-9]{64}$/);
  });

  it("does not scan ignored paths or follow a symlink outside the project root", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-discovery-fixture-"));
    temporaryDirectories.push(root);
    await cp(fixtureRoot, root, { recursive: true });
    const outside = await mkdtemp(join(tmpdir(), "contentmd-discovery-outside-"));
    temporaryDirectories.push(outside);
    await writeFile(join(outside, "secret.tsx"), "export const Secret = () => <p>PRIVATE OUTSIDE TEXT</p>;\n");
    await symlink(outside, join(root, "src", "outside-link"));
    await writeFile(join(root, ".contentmd-test", "ignored.tsx"), "export const Ignored = () => <p>IGNORED CASSETTE TEXT</p>;\n");
    await mkdir(join(root, "dist"), { recursive: true });
    await writeFile(join(root, "dist", "ignored.tsx"), "export const Built = () => <p>IGNORED BUILD TEXT</p>;\n");

    const result = await new FilesystemContentAdapter().discover({ project_root: root });
    const allText = result.occurrences.map((item) => item.expression_payload).join("\n");

    expect(allText).not.toContain("PRIVATE OUTSIDE TEXT");
    expect(allText).not.toContain("IGNORED CASSETTE TEXT");
    expect(allText).not.toContain("IGNORED BUILD TEXT");
  });

  it("keeps mutation methods unsupported until the governed change task", async () => {
    const adapter = new FilesystemContentAdapter();

    await expect(
      adapter.apply({ operation_id: "operation.fixture.unsupported", transaction_ref: "none" }),
    ).rejects.toEqual(
      new AdapterCapabilityError("unsupported_capability", "filesystem.apply"),
    );
  });
});
