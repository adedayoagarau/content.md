import { basename, extname } from "node:path";
import ts from "typescript-compiler";
import { coordinatesFromOffsets, offsetCoordinates } from "../coordinates.js";
import type { ArtifactParser, OccurrenceDraft, ParserResult } from "./types.js";

const JSX_CONTENT_ATTRIBUTES = new Set(["aria-label", "alt", "placeholder", "title"]);
const OBJECT_CONTENT_PROPERTIES = new Set([
  "body",
  "confirmation",
  "description",
  "error",
  "heading",
  "label",
  "message",
  "recovery",
  "tagline",
  "text",
  "title",
  "valueProposition",
]);

function emptyResult(occurrences: OccurrenceDraft[]): ParserResult {
  return { occurrences, claims: [], warnings: [], unsupported: [] };
}

function normalizeVisibleText(value: string): string {
  return value.replace(/\s+/gu, " ").trim();
}

function propertyName(node: ts.PropertyName, sourceFile: ts.SourceFile): string {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return node.text;
  return node.getText(sourceFile);
}

function enclosingComponent(node: ts.Node): string | null {
  let current: ts.Node | undefined = node;
  while (current !== undefined) {
    if (ts.isFunctionDeclaration(current) && current.name !== undefined) return current.name.text;
    if (
      (ts.isArrowFunction(current) || ts.isFunctionExpression(current)) &&
      ts.isVariableDeclaration(current.parent) &&
      ts.isIdentifier(current.parent.name)
    ) return current.parent.name.text;
    current = current.parent;
  }
  return null;
}

function enclosingJsxElementName(node: ts.Node, sourceFile: ts.SourceFile): string {
  let current: ts.Node | undefined = node;
  while (current !== undefined) {
    if (ts.isJsxElement(current)) return current.openingElement.tagName.getText(sourceFile);
    if (ts.isJsxSelfClosingElement(current)) return current.tagName.getText(sourceFile);
    current = current.parent;
  }
  return "unknown";
}

function objectRoute(node: ts.Node, sourceFile: ts.SourceFile): string | null {
  let current: ts.Node | undefined = node;
  while (current !== undefined) {
    if (ts.isObjectLiteralExpression(current)) {
      for (const property of current.properties) {
        if (
          ts.isPropertyAssignment(property) &&
          propertyName(property.name, sourceFile) === "path" &&
          ts.isStringLiteralLike(property.initializer)
        ) return property.initializer.text;
      }
      return null;
    }
    current = current.parent;
  }
  return null;
}

export function nextRouteFromPath(path: string): string | null {
  const marker = path.startsWith("app/") ? 0 : path.lastIndexOf("/app/");
  if (marker < 0 || !path.endsWith("/page.tsx")) return null;
  const start = marker === 0 ? "app/".length : marker + "/app/".length;
  const routePart = path.slice(start, -"/page.tsx".length);
  const segments = routePart.split("/").filter((segment) =>
    segment.length > 0 && !/^\(.+\)$/u.test(segment) && !segment.startsWith("@")
  );
  return segments.length === 0 ? "/" : `/${segments.join("/")}`;
}

function createDraft(
  sourceFile: ts.SourceFile,
  sourceArtifact: string,
  start: number,
  end: number,
  syntaxKind: OccurrenceDraft["syntax_kind"],
  expressionPayload: string,
  context: Omit<OccurrenceDraft, keyof ReturnType<typeof coordinatesFromOffsets> | "source_artifact" | "syntax_kind" | "expression_payload">,
): OccurrenceDraft {
  return {
    source_artifact: sourceArtifact,
    ...coordinatesFromOffsets(sourceFile, start, end),
    syntax_kind: syntaxKind,
    expression_payload: expressionPayload,
    ...context,
  };
}

function stringInitializer(
  initializer: ts.JsxAttributeValue | undefined,
): ts.StringLiteral | ts.JsxExpression | null {
  if (initializer === undefined) return null;
  if (ts.isStringLiteral(initializer)) return initializer;
  if (
    ts.isJsxExpression(initializer) && initializer.expression !== undefined &&
    ts.isStringLiteralLike(initializer.expression)
  ) return initializer;
  return null;
}

function initializerValue(initializer: ts.StringLiteral | ts.JsxExpression): {
  value: string;
  start: number;
  end: number;
} | null {
  if (ts.isStringLiteral(initializer)) {
    return { value: initializer.text, start: initializer.getStart() + 1, end: initializer.getEnd() - 1 };
  }
  const expression = initializer.expression;
  if (expression !== undefined && ts.isStringLiteralLike(expression)) {
    return { value: expression.text, start: expression.getStart() + 1, end: expression.getEnd() - 1 };
  }
  return null;
}

function expressionPlaceholder(expression: ts.Expression, sourceFile: ts.SourceFile): string {
  if (ts.isStringLiteralLike(expression) || ts.isNumericLiteral(expression)) return expression.text;
  const text = expression.getText(sourceFile);
  return /^[\p{L}_$][\p{L}\p{N}_$]*(?:\.[\p{L}_$][\p{L}\p{N}_$]*)*$/u.test(text)
    ? `{${text}}`
    : "{value}";
}

function jsxComposition(
  node: ts.JsxElement,
  sourceFile: ts.SourceFile,
): { payload: string; start: number; end: number; textNodes: ts.JsxText[] } | null {
  if (node.children.some((child) => ts.isJsxElement(child) || ts.isJsxSelfClosingElement(child))) return null;
  const segments: string[] = [];
  const contributingNodes: ts.Node[] = [];
  const textNodes: ts.JsxText[] = [];
  let hasExpression = false;
  for (const child of node.children) {
    if (ts.isJsxText(child)) {
      const text = normalizeVisibleText(child.getFullText(sourceFile));
      if (text.length === 0) continue;
      segments.push(text);
      contributingNodes.push(child);
      textNodes.push(child);
      continue;
    }
    if (ts.isJsxExpression(child) && child.expression !== undefined) {
      segments.push(expressionPlaceholder(child.expression, sourceFile));
      contributingNodes.push(child);
      hasExpression = true;
    }
  }
  if (!hasExpression || contributingNodes.length < 2 || textNodes.length === 0) return null;
  const payload = normalizeVisibleText(segments.join(" "))
    .replace(/\s+([.,!?;:%)\]])/gu, "$1")
    .replace(/([(\[])\s+/gu, "$1");
  if (payload.length === 0) return null;
  return {
    payload,
    start: contributingNodes[0]!.getStart(sourceFile),
    end: contributingNodes.at(-1)!.getEnd(),
    textNodes,
  };
}

function discoverTypeScript(source: string, sourceArtifact: string): OccurrenceDraft[] {
  const scriptKind = extname(sourceArtifact) === ".tsx" ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sourceFile = ts.createSourceFile(sourceArtifact, source, ts.ScriptTarget.Latest, true, scriptKind);
  const drafts: OccurrenceDraft[] = [];
  const composedTextNodes = new WeakSet<ts.JsxText>();
  const nextRoute = nextRouteFromPath(sourceArtifact);
  const visit = (node: ts.Node): void => {
    if (ts.isJsxElement(node)) {
      const composition = jsxComposition(node, sourceFile);
      if (composition !== null) {
        for (const textNode of composition.textNodes) composedTextNodes.add(textNode);
        drafts.push(createDraft(
          sourceFile,
          sourceArtifact,
          composition.start,
          composition.end,
          "jsx_composition",
          composition.payload,
          {
            locale: "und",
            channel: "web",
            modality: "visible",
            component: enclosingComponent(node),
            route: nextRoute,
            semantic_context: `component:${enclosingComponent(node) ?? "unknown"};element:${node.openingElement.tagName.getText(sourceFile)};composition:jsx_children`,
          },
        ));
      }
    } else if (ts.isJsxText(node) && !composedTextNodes.has(node)) {
      const rawValue = node.getFullText(sourceFile);
      const value = normalizeVisibleText(rawValue);
      if (value.length > 0) {
        const leadingWhitespace = rawValue.length - rawValue.trimStart().length;
        const trailingWhitespace = rawValue.length - rawValue.trimEnd().length;
        const start = node.getFullStart() + leadingWhitespace;
        const end = node.getFullStart() + rawValue.length - trailingWhitespace;
        drafts.push(createDraft(sourceFile, sourceArtifact, start, end, "jsx_text", value, {
          locale: "und",
          channel: "web",
          modality: "visible",
          component: enclosingComponent(node),
          route: nextRoute,
          semantic_context: `component:${enclosingComponent(node) ?? "unknown"};element:${enclosingJsxElementName(node, sourceFile)}`,
        }));
      }
    } else if (ts.isJsxAttribute(node)) {
      const name = node.name.getText(sourceFile);
      if (JSX_CONTENT_ATTRIBUTES.has(name)) {
        const initializer = stringInitializer(node.initializer);
        const parsed = initializer === null ? null : initializerValue(initializer);
        if (parsed !== null && parsed.value.length > 0) {
          drafts.push(createDraft(sourceFile, sourceArtifact, parsed.start, parsed.end, "jsx_attribute", parsed.value, {
            locale: "und",
            channel: "web",
            modality: name === "aria-label" || name === "alt" ? "assistive" : "visible",
            component: enclosingComponent(node),
            route: nextRoute,
            semantic_context: `component:${enclosingComponent(node) ?? "unknown"};element:${enclosingJsxElementName(node, sourceFile)};attribute:${name}`,
          }));
        }
      }
    } else if (
      ts.isPropertyAssignment(node) &&
      OBJECT_CONTENT_PROPERTIES.has(propertyName(node.name, sourceFile)) &&
      ts.isStringLiteralLike(node.initializer)
    ) {
      drafts.push(createDraft(
        sourceFile,
        sourceArtifact,
        node.initializer.getStart(sourceFile) + 1,
        node.initializer.getEnd() - 1,
        "object_property",
        node.initializer.text,
        {
          locale: "und",
          channel: "web",
          modality: "visible",
          component: null,
          route: objectRoute(node, sourceFile) ?? nextRoute,
          semantic_context: `property:${propertyName(node.name, sourceFile)}`,
        },
      ));
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return drafts;
}

function discoverJson(source: string, sourceArtifact: string): OccurrenceDraft[] {
  const sourceFile = ts.parseJsonText(sourceArtifact, source);
  const locale = basename(sourceArtifact, ".json");
  const drafts: OccurrenceDraft[] = [];
  const visit = (node: ts.Node, keyPath: string[]): void => {
    if (ts.isPropertyAssignment(node)) {
      const key = propertyName(node.name, sourceFile);
      if (ts.isStringLiteralLike(node.initializer)) {
        drafts.push(createDraft(
          sourceFile,
          sourceArtifact,
          node.initializer.getStart(sourceFile) + 1,
          node.initializer.getEnd() - 1,
          "locale_message",
          node.initializer.text,
          {
            locale,
            channel: "web",
            modality: "visible",
            component: null,
            route: null,
            semantic_context: `message_key:${[...keyPath, key].join(".")}`,
          },
        ));
      } else {
        ts.forEachChild(node.initializer, (child) => visit(child, [...keyPath, key]));
      }
      return;
    }
    ts.forEachChild(node, (child) => visit(child, keyPath));
  };
  visit(sourceFile, []);
  return drafts;
}

function discoverHtml(source: string, sourceArtifact: string): OccurrenceDraft[] {
  const drafts: OccurrenceDraft[] = [];
  for (const match of source.matchAll(/<title\b[^>]*>([^<]+)<\/title>/giu)) {
    const value = normalizeVisibleText(match[1] ?? "");
    if (value.length === 0 || match.index === undefined) continue;
    const start = source.indexOf(value, match.index);
    drafts.push({
      source_artifact: sourceArtifact,
      ...offsetCoordinates(source, start, start + value.length),
      syntax_kind: "html_title",
      expression_payload: value,
      locale: "und",
      channel: "web",
      modality: "metadata",
      component: null,
      route: null,
      semantic_context: "element:title",
    });
  }
  for (const tagMatch of source.matchAll(/<(meta|input|img)\b[^>]*>/giu)) {
    if (tagMatch.index === undefined) continue;
    const tag = tagMatch[0];
    const tagName = (tagMatch[1] ?? "unknown").toLowerCase();
    for (const attributeMatch of tag.matchAll(/\b(content|aria-label|alt|placeholder|title)=(['"])(.*?)\2/giu)) {
      if (attributeMatch.index === undefined) continue;
      const attributeName = (attributeMatch[1] ?? "").toLowerCase();
      const value = attributeMatch[3] ?? "";
      if (value.length === 0) continue;
      const start = tagMatch.index + attributeMatch.index + attributeMatch[0].indexOf(value);
      const isMetadata = tagName === "meta" && attributeName === "content";
      drafts.push({
        source_artifact: sourceArtifact,
        ...offsetCoordinates(source, start, start + value.length),
        syntax_kind: isMetadata ? "html_metadata" : "html_attribute",
        expression_payload: value,
        locale: "und",
        channel: "web",
        modality: isMetadata ? "metadata" : attributeName === "aria-label" || attributeName === "alt" ? "assistive" : "visible",
        component: null,
        route: null,
        semantic_context: `element:${tagName};attribute:${attributeName}`,
      });
    }
  }
  return drafts;
}

function isMessageCatalog(path: string): boolean {
  return path.endsWith(".json") && /(?:^|\/)(?:i18n|locales|messages)(?:\/|$)/iu.test(path);
}

export const typescriptArtifactParser: ArtifactParser = {
  parser_id: "parser.filesystem.typescript",
  supports({ artifact }) {
    const extension = artifact.extension;
    return extension === ".ts" || extension === ".tsx" || extension === ".html" || isMessageCatalog(artifact.relative_path);
  },
  parse({ artifact, source }) {
    if (artifact.extension === ".json") return emptyResult(discoverJson(source, artifact.relative_path));
    if (artifact.extension === ".html") return emptyResult(discoverHtml(source, artifact.relative_path));
    return emptyResult(discoverTypeScript(source, artifact.relative_path));
  },
};
