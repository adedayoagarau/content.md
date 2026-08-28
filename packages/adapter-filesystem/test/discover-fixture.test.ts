import { cp, mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { FilesystemContentAdapter } from "@contentmd/adapter-filesystem";
import type { DiscoveryProgressEvent } from "@contentmd/adapter-sdk";

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
    expect(result.occurrences.filter((item) => [
      "public/index.html",
      "src/App.tsx",
      "src/components/CheckoutSummary.tsx",
      "src/messages/fr-CA.json",
      "src/routes.ts",
    ].includes(item.source_artifact) && [
      "The smartest way to buy anything",
      "Unlock a seamless experience that empowers your journey.",
      "Action",
      "Payment failed. Try again.",
      "Hub",
    ].includes(item.expression_payload)).map((item) => item.occurrence_id)).toEqual([
      "occurrence.135fb5c15917add5cff7cdaa",
      "occurrence.730b395d263e52ac61683e8e",
      "occurrence.afb5aeb56b2e70391a8099ca",
      "occurrence.bc8aa288c70c16e396415fd2",
      "occurrence.3165c4299af9aae4ef7bba24",
    ]);
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

  it("does not emit empty static strings as content occurrences", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-empty-content-fixture-"));
    temporaryDirectories.push(root);
    await writeFile(join(root, "package.json"), '{"name":"empty-content-fixture"}\n');
    await writeFile(
      join(root, "messages.ts"),
      'export const messages = { title: "", body: "   ", label: "Continue" };\n',
    );

    const result = await new FilesystemContentAdapter().discover({ project_root: root });

    expect(result.occurrences.map((item) => item.expression_payload)).toEqual(["Continue"]);
  });

  it("preserves source coordinates when multiline JSX whitespace is normalized", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-multiline-jsx-fixture-"));
    temporaryDirectories.push(root);
    await writeFile(join(root, "package.json"), '{"name":"multiline-jsx-fixture"}\n');
    await writeFile(
      join(root, "Page.tsx"),
      [
        "export function Page() {",
        "  return <p>",
        "    Review the order",
        "    before continuing.",
        "  </p>;",
        "}",
      ].join("\n"),
    );

    const result = await new FilesystemContentAdapter().discover({ project_root: root });

    expect(result.coverage.failed).toBe(0);
    expect(result.occurrences).toEqual(expect.arrayContaining([
      expect.objectContaining({
        expression_payload: "Review the order before continuing.",
        line: 3,
        column: 5,
        end_line: 4,
      }),
    ]));
  });

  it("reassembles direct JSX text and interpolations as one contextual composition", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-jsx-composition-fixture-"));
    temporaryDirectories.push(root);
    await writeFile(join(root, "package.json"), '{"name":"jsx-composition-fixture"}\n');
    await writeFile(
      join(root, "Page.tsx"),
      [
        "export function Page({ current, total, account }: { current: number; total: number; account: string }) {",
        "  return <main>",
        "    <p>Page {current} of {total}.</p>",
        "    <p>Hello {account.toUpperCase()}!</p>",
        "  </main>;",
        "}",
      ].join("\n"),
    );

    const result = await new FilesystemContentAdapter().discover({ project_root: root });

    expect(result.occurrences).toEqual(expect.arrayContaining([
      expect.objectContaining({
        syntax_kind: "jsx_composition",
        expression_payload: "Page {current} of {total}.",
        semantic_context: "component:Page;element:p;composition:jsx_children",
      }),
      expect.objectContaining({
        syntax_kind: "jsx_composition",
        expression_payload: "Hello {value}!",
      }),
    ]));
    expect(result.occurrences.map((item) => item.expression_payload)).not.toEqual(
      expect.arrayContaining(["Page", "of", ".", "Hello", "!"]),
    );
  });

  it("advertises only the implemented governed capabilities", () => {
    const adapter = new FilesystemContentAdapter();

    expect(adapter.descriptor.capabilities).toEqual([
      "discover",
      "preview",
      "apply",
      "verify",
      "rollback",
    ]);
  });

  it("reports a shared scan lifecycle and can be cancelled between bounded work units", async () => {
    const events: DiscoveryProgressEvent[] = [];
    await new FilesystemContentAdapter().discover({
      project_root: fixtureRoot,
      on_progress: (event) => events.push(event),
    });

    expect(events[0]).toMatchObject({ stage: "scan_started", completed: 0 });
    expect(events.map((event) => event.stage)).toEqual(expect.arrayContaining([
      "inventory_started",
      "inventory_progress",
      "parsing_started",
      "parsing_progress",
    ]));

    const controller = new AbortController();
    await expect(new FilesystemContentAdapter().discover({
      project_root: fixtureRoot,
      signal: controller.signal,
      on_progress: (event) => {
        if (event.stage === "parsing_started") controller.abort();
      },
    })).rejects.toThrow("discovery_cancelled");
  });
});
