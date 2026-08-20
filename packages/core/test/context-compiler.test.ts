import { describe, expect, it } from "vitest";
import {
  compileContentContext,
  contentGraphBytes,
  type ContextCompilerInput,
} from "@contentmd/core";

const input: ContextCompilerInput = {
  project_id: "project.beacon",
  sources: [
    {
      source_id: "source.product",
      source_type: "product_document",
      locator: "PRODUCT.md",
      content_digest: "a".repeat(64),
      content:
        "# Beacon\n\nThe primary user is a merchant content designer. Merchant teams create workspaces and inspect simulated payment states. After a payment submission, the result can be unknown.\n",
    },
    {
      source_id: "source.design",
      source_type: "design_document",
      locator: "DESIGN.md",
      content_digest: "b".repeat(64),
      content: "# Design\n\nNavigation should use one stable label for each destination.\n",
    },
  ],
  discovery: {
    scan_digest: "c".repeat(64),
    occurrences: [
      {
        occurrence_id: "occurrence.route",
        source_artifact: "src/routes.ts",
        line: 2,
        column: 34,
        syntax_kind: "object_property",
        expression_payload: "Workspace",
        locale: "und",
        channel: "web",
        modality: "visible",
        component: null,
        route: "/workspaces",
        semantic_context: "property:label",
      },
      {
        occurrence_id: "occurrence.payment",
        source_artifact: "src/RecoveryPanel.tsx",
        line: 5,
        column: 10,
        syntax_kind: "jsx_text",
        expression_payload: "Payment failed. Try again.",
        locale: "und",
        channel: "web",
        modality: "visible",
        component: "RecoveryPanel",
        route: null,
        semantic_context: "component:RecoveryPanel;element:p",
      },
    ],
  },
};

describe("content context compiler", () => {
  it("creates the canonical model families without assigning authority", () => {
    const graph = compileContentContext(input);
    const types = new Set(graph.nodes.map((node) => node.node_type));

    expect(types).toEqual(
      new Set([
        "product",
        "audience",
        "job",
        "journey",
        "stage",
        "state",
        "route",
        "ia_node",
        "navigation_relation",
        "semantic_message",
        "expression_slot",
        "expression_version",
        "implementation_occurrence",
        "open_question",
      ]),
    );
    expect(graph.nodes.every((node) => node.lifecycle_state === "proposed")).toBe(true);
    expect(graph.nodes.every((node) => node.authority_effect === "none")).toBe(true);
  });

  it("keeps approval and observed behavior open without establishing sources", () => {
    const graph = compileContentContext(input);
    const questions = graph.nodes
      .filter((node) => node.node_type === "open_question")
      .map((node) => node.label);

    expect(questions).toEqual(
      expect.arrayContaining([
        "Who can approve content changes?",
        "Which discovered strings are observed in a live product?",
      ]),
    );
  });

  it("rebuilds to byte-identical canonical graph output", () => {
    expect(contentGraphBytes(compileContentContext(input))).toBe(
      contentGraphBytes(compileContentContext(structuredClone(input))),
    );
  });

  it("keeps a catalog message stable across locale expressions", () => {
    const localized = structuredClone(input);
    localized.discovery.occurrences = [
      {
        ...input.discovery.occurrences[0]!,
        occurrence_id: "occurrence.catalog.en",
        source_artifact: "src/messages/en-US.json",
        syntax_kind: "locale_message",
        expression_payload: "Your cart",
        locale: "en-US",
        route: null,
        semantic_context: "message_key:checkout.cartTitle",
      },
      {
        ...input.discovery.occurrences[0]!,
        occurrence_id: "occurrence.catalog.fr",
        source_artifact: "src/messages/fr-CA.json",
        syntax_kind: "locale_message",
        expression_payload: "Votre panier",
        locale: "fr-CA",
        route: null,
        semantic_context: "message_key:checkout.cartTitle",
      },
    ];

    const graph = compileContentContext(localized);
    const messageIds = graph.nodes
      .filter((node) => node.node_type === "expression_slot")
      .map((node) => node.attributes.semantic_message_id);

    expect(new Set(messageIds).size).toBe(1);
    expect(graph.nodes.filter((node) => node.node_type === "expression_slot")).toHaveLength(2);
  });
});
