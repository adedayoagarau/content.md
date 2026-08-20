import { createHash } from "node:crypto";
import { readFile, realpath } from "node:fs/promises";
import { basename, extname, isAbsolute, relative, resolve, sep } from "node:path";
import fastGlob from "fast-glob";
import ts from "typescript-compiler";
import { sha256Canonical } from "@contentmd/core";
import type {
  ContentModality,
  ContentSyntaxKind,
  DiscoverRequest,
  DiscoverResult,
  DiscoveredContentOccurrence,
} from "@contentmd/adapter-sdk";
import { coordinatesFromOffsets, offsetCoordinates } from "./coordinates.js";

const ADAPTER_ID = "adapter.filesystem";
const ADAPTER_VERSION = "0.1.0";
const SCAN_PATTERNS = ["src/**/*.{ts,tsx,json}", "public/**/*.html"];
const IGNORED_PATTERNS = [
  "**/node_modules/**",
  "**/dist/**",
  "**/build/**",
  "**/coverage/**",
  "**/.contentmd-test/**",
  "**/.contentmd/cache/**",
  "**/.contentmd/local/**",
  "**/.contentmd/runtime/**",
];
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

interface OccurrenceDraft {
  source_artifact: string;
  line: number;
  column: number;
  end_line: number;
  end_column: number;
  syntax_kind: ContentSyntaxKind;
  expression_payload: string;
  locale: string;
  modality: ContentModality;
  component: string | null;
  route: string | null;
  semantic_context: string;
}

interface ScannedArtifact {
  path: string;
  digest: string;
}

function sha256Text(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function normalizeVisibleText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function propertyName(node: ts.PropertyName, sourceFile: ts.SourceFile): string {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) {
    return node.text;
  }
  return node.getText(sourceFile);
}

function enclosingComponent(node: ts.Node): string | null {
  let current: ts.Node | undefined = node;
  while (current !== undefined) {
    if (ts.isFunctionDeclaration(current) && current.name !== undefined) {
      return current.name.text;
    }
    if (
      (ts.isArrowFunction(current) || ts.isFunctionExpression(current)) &&
      ts.isVariableDeclaration(current.parent) &&
      ts.isIdentifier(current.parent.name)
    ) {
      return current.parent.name.text;
    }
    current = current.parent;
  }
  return null;
}

function enclosingJsxElementName(node: ts.Node, sourceFile: ts.SourceFile): string {
  let current: ts.Node | undefined = node;
  while (current !== undefined) {
    if (ts.isJsxElement(current)) {
      return current.openingElement.tagName.getText(sourceFile);
    }
    if (ts.isJsxSelfClosingElement(current)) {
      return current.tagName.getText(sourceFile);
    }
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
        ) {
          return property.initializer.text;
        }
      }
      return null;
    }
    current = current.parent;
  }
  return null;
}

function createDraft(
  sourceFile: ts.SourceFile,
  sourceArtifact: string,
  start: number,
  end: number,
  syntaxKind: ContentSyntaxKind,
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
    ts.isJsxExpression(initializer) &&
    initializer.expression !== undefined &&
    ts.isStringLiteralLike(initializer.expression)
  ) {
    return initializer;
  }
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

function discoverTypeScript(source: string, sourceArtifact: string): OccurrenceDraft[] {
  const scriptKind = extname(sourceArtifact) === ".tsx" ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sourceFile = ts.createSourceFile(
    sourceArtifact,
    source,
    ts.ScriptTarget.Latest,
    true,
    scriptKind,
  );
  const drafts: OccurrenceDraft[] = [];

  const visit = (node: ts.Node): void => {
    if (ts.isJsxText(node)) {
      const value = normalizeVisibleText(node.getText(sourceFile));
      if (value.length > 0) {
        const start = source.indexOf(value, node.getFullStart());
        drafts.push(
          createDraft(sourceFile, sourceArtifact, start, start + value.length, "jsx_text", value, {
            locale: "und",
            modality: "visible",
            component: enclosingComponent(node),
            route: null,
            semantic_context: `component:${enclosingComponent(node) ?? "unknown"};element:${enclosingJsxElementName(node, sourceFile)}`,
          }),
        );
      }
    } else if (ts.isJsxAttribute(node)) {
      const name = node.name.getText(sourceFile);
      if (JSX_CONTENT_ATTRIBUTES.has(name)) {
        const initializer = stringInitializer(node.initializer);
        const parsed = initializer === null ? null : initializerValue(initializer);
        if (parsed !== null && parsed.value.length > 0) {
          drafts.push(
            createDraft(sourceFile, sourceArtifact, parsed.start, parsed.end, "jsx_attribute", parsed.value, {
              locale: "und",
              modality: name === "aria-label" || name === "alt" ? "assistive" : "visible",
              component: enclosingComponent(node),
              route: null,
              semantic_context: `component:${enclosingComponent(node) ?? "unknown"};element:${enclosingJsxElementName(node, sourceFile)};attribute:${name}`,
            }),
          );
        }
      }
    } else if (
      ts.isPropertyAssignment(node) &&
      OBJECT_CONTENT_PROPERTIES.has(propertyName(node.name, sourceFile)) &&
      ts.isStringLiteralLike(node.initializer)
    ) {
      const value = node.initializer.text;
      drafts.push(
        createDraft(
          sourceFile,
          sourceArtifact,
          node.initializer.getStart(sourceFile) + 1,
          node.initializer.getEnd() - 1,
          "object_property",
          value,
          {
            locale: "und",
            modality: "visible",
            component: null,
            route: objectRoute(node, sourceFile),
            semantic_context: `property:${propertyName(node.name, sourceFile)}`,
          },
        ),
      );
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
        drafts.push(
          createDraft(
            sourceFile,
            sourceArtifact,
            node.initializer.getStart(sourceFile) + 1,
            node.initializer.getEnd() - 1,
            "locale_message",
            node.initializer.text,
            {
              locale,
              modality: "visible",
              component: null,
              route: null,
              semantic_context: `message_key:${[...keyPath, key].join(".")}`,
            },
          ),
        );
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
  const titlePattern = /<title\b[^>]*>([^<]+)<\/title>/giu;
  for (const match of source.matchAll(titlePattern)) {
    const value = normalizeVisibleText(match[1] ?? "");
    if (value.length === 0 || match.index === undefined) continue;
    const start = source.indexOf(value, match.index);
    drafts.push({
      source_artifact: sourceArtifact,
      ...offsetCoordinates(source, start, start + value.length),
      syntax_kind: "html_title",
      expression_payload: value,
      locale: "und",
      modality: "metadata",
      component: null,
      route: null,
      semantic_context: "element:title",
    });
  }

  const tagPattern = /<(meta|input|img)\b[^>]*>/giu;
  for (const tagMatch of source.matchAll(tagPattern)) {
    if (tagMatch.index === undefined) continue;
    const tag = tagMatch[0];
    const tagName = (tagMatch[1] ?? "unknown").toLowerCase();
    const attributePattern = /\b(content|aria-label|alt|placeholder|title)=(['"])(.*?)\2/giu;
    for (const attributeMatch of tag.matchAll(attributePattern)) {
      if (attributeMatch.index === undefined) continue;
      const attributeName = (attributeMatch[1] ?? "").toLowerCase();
      const value = attributeMatch[3] ?? "";
      if (value.length === 0) continue;
      const valueOffset = attributeMatch[0].indexOf(value);
      const start = tagMatch.index + attributeMatch.index + valueOffset;
      const isMetadata = tagName === "meta" && attributeName === "content";
      drafts.push({
        source_artifact: sourceArtifact,
        ...offsetCoordinates(source, start, start + value.length),
        syntax_kind: isMetadata ? "html_metadata" : "html_attribute",
        expression_payload: value,
        locale: "und",
        modality: isMetadata
          ? "metadata"
          : attributeName === "aria-label" || attributeName === "alt"
            ? "assistive"
            : "visible",
        component: null,
        route: null,
        semantic_context: `element:${tagName};attribute:${attributeName}`,
      });
    }
  }
  return drafts;
}

function withinRoot(projectRoot: string, filePath: string): boolean {
  const pathFromRoot = relative(projectRoot, filePath);
  return pathFromRoot !== "" && !pathFromRoot.startsWith(`..${sep}`) && pathFromRoot !== ".." && !isAbsolute(pathFromRoot);
}

function finalizeDraft(draft: OccurrenceDraft): DiscoveredContentOccurrence {
  const identity = {
    adapter_id: ADAPTER_ID,
    source_artifact: draft.source_artifact,
    line: draft.line,
    column: draft.column,
    syntax_kind: draft.syntax_kind,
    expression_payload: draft.expression_payload,
    locale: draft.locale,
    modality: draft.modality,
    component: draft.component,
    route: draft.route,
    semantic_context: draft.semantic_context,
  };
  const occurrenceDigest = sha256Canonical(identity);
  const candidateDigest = sha256Canonical({
    expression_payload: draft.expression_payload,
    locale: draft.locale,
    modality: draft.modality,
    semantic_context: draft.semantic_context,
  });
  return {
    occurrence_id: `occurrence.${occurrenceDigest.slice(0, 24)}`,
    candidate_id: `candidate.${candidateDigest.slice(0, 24)}`,
    ...draft,
    channel: "web",
  };
}

export async function discoverFilesystemContent(request: DiscoverRequest): Promise<DiscoverResult> {
  const requestedRoot = resolve(request.project_root);
  const projectRoot = await realpath(requestedRoot);
  const relativePaths = await fastGlob(SCAN_PATTERNS, {
    cwd: projectRoot,
    onlyFiles: true,
    unique: true,
    followSymbolicLinks: false,
    ignore: IGNORED_PATTERNS,
  });
  relativePaths.sort((left, right) => left.localeCompare(right));

  const occurrences: DiscoveredContentOccurrence[] = [];
  const scannedArtifacts: ScannedArtifact[] = [];
  const warnings: string[] = [];

  for (const relativePath of relativePaths) {
    const absolutePath = resolve(projectRoot, relativePath);
    const resolvedPath = await realpath(absolutePath);
    if (!withinRoot(projectRoot, resolvedPath)) {
      warnings.push(`outside_project_root:${relativePath}`);
      continue;
    }
    const source = await readFile(resolvedPath, "utf8");
    scannedArtifacts.push({ path: relativePath, digest: sha256Text(source) });
    const extension = extname(relativePath);
    const drafts = extension === ".json"
      ? discoverJson(source, relativePath)
      : extension === ".html"
        ? discoverHtml(source, relativePath)
        : discoverTypeScript(source, relativePath);
    occurrences.push(...drafts.map(finalizeDraft));
  }

  occurrences.sort((left, right) =>
    left.source_artifact.localeCompare(right.source_artifact) ||
    left.line - right.line ||
    left.column - right.column ||
    left.expression_payload.localeCompare(right.expression_payload),
  );

  return {
    adapter_id: ADAPTER_ID,
    adapter_version: ADAPTER_VERSION,
    project_root: projectRoot,
    scan_digest: sha256Canonical(scannedArtifacts),
    scanned_artifacts: scannedArtifacts.map((artifact) => artifact.path),
    occurrences,
    warnings,
  };
}
