import { extname } from "node:path";
import { offsetCoordinates } from "../coordinates.js";
import type { ArtifactParser, OccurrenceDraft, ParserResult } from "./types.js";

const ROUTE_DECORATOR = /^[ \t]*@(app|router)\.(get|post|put|patch|delete|options|head)\s*\(/gmu;
const APPROVED_DICTIONARY_KEYS = new Set([
  "body", "confirmation", "description", "detail", "error", "heading", "label",
  "message", "recovery", "text", "title",
]);

interface CallArgument {
  text: string;
  start: number;
}

interface StaticString {
  value: string;
  value_start: number;
  value_end: number;
}

interface RouteRange {
  start: number;
  end: number;
  route: string;
}

function lineAt(source: string, offset: number): number {
  return source.slice(0, offset).split("\n").length;
}

function closingParenthesis(source: string, openOffset: number): number | null {
  let depth = 0;
  let quote: "\"" | "'" | null = null;
  let triple = false;
  let escaped = false;
  for (let index = openOffset; index < source.length; index += 1) {
    const character = source[index] ?? "";
    if (quote !== null) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (character === "\\") {
        escaped = true;
        continue;
      }
      if (triple && source.slice(index, index + 3) === quote.repeat(3)) {
        quote = null;
        triple = false;
        index += 2;
      } else if (!triple && character === quote) {
        quote = null;
      }
      continue;
    }
    if (character === "\"" || character === "'") {
      quote = character;
      triple = source.slice(index, index + 3) === character.repeat(3);
      if (triple) index += 2;
    } else if (character === "(") {
      depth += 1;
    } else if (character === ")") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return null;
}

function splitTopLevel(source: string, absoluteStart: number): CallArgument[] {
  const result: CallArgument[] = [];
  let segmentStart = 0;
  let depth = 0;
  let quote: "\"" | "'" | null = null;
  let escaped = false;
  for (let index = 0; index <= source.length; index += 1) {
    const character = source[index] ?? ",";
    if (quote !== null) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === "\"" || character === "'") quote = character;
    else if (character === "(" || character === "[" || character === "{") depth += 1;
    else if (character === ")" || character === "]" || character === "}") depth -= 1;
    else if (character === "," && depth === 0) {
      const raw = source.slice(segmentStart, index);
      const leading = raw.length - raw.trimStart().length;
      if (raw.trim().length > 0) {
        result.push({ text: raw.trim(), start: absoluteStart + segmentStart + leading });
      }
      segmentStart = index + 1;
    }
  }
  return result;
}

function staticString(argument: CallArgument): StaticString | null {
  const match = /^(?![fF])(?:[rRuUbB]{0,2})?("|')([\s\S]*)\1$/u.exec(argument.text);
  if (match === null) return null;
  const quoteOffset = argument.text.indexOf(match[1] ?? "\"");
  const value = match[2] ?? "";
  return {
    value,
    value_start: argument.start + quoteOffset + 1,
    value_end: argument.start + quoteOffset + 1 + value.length,
  };
}

function keywordArgument(argumentsList: CallArgument[], name: string): CallArgument | null {
  for (const argument of argumentsList) {
    const match = new RegExp(`^${name}\\s*=\\s*`, "u").exec(argument.text);
    if (match !== null) {
      return { text: argument.text.slice(match[0].length), start: argument.start + match[0].length };
    }
  }
  return null;
}

function occurrence(
  source: string,
  sourceArtifact: string,
  parsed: StaticString,
  syntaxKind: OccurrenceDraft["syntax_kind"],
  route: string | null,
  semanticContext: string,
  modality: OccurrenceDraft["modality"] = "visible",
): OccurrenceDraft {
  return {
    source_artifact: sourceArtifact,
    ...offsetCoordinates(source, parsed.value_start, parsed.value_end),
    syntax_kind: syntaxKind,
    expression_payload: parsed.value,
    locale: "und",
    channel: syntaxKind === "html_text" ? "web" : "api",
    modality,
    component: null,
    route,
    semantic_context: semanticContext,
  };
}

function routeForOffset(ranges: RouteRange[], offset: number): string | null {
  return ranges.find((range) => offset >= range.start && offset < range.end)?.route ?? null;
}

function functionRange(source: string, afterDecorator: number, route: string): RouteRange | null {
  const remainder = source.slice(afterDecorator);
  const match = /(?:\r?\n[ \t]*)+(?:async\s+)?def\s+[A-Za-z_]\w*\s*\(/u.exec(remainder);
  if (match === null || match.index > 500) return null;
  const start = afterDecorator + match.index;
  const lineStart = source.lastIndexOf("\n", start) + 1;
  const indentation = /^[ \t]*/u.exec(source.slice(lineStart, start))?.[0].length ?? 0;
  const lines = source.slice(lineStart).split(/\r?\n/u);
  let offset = lineStart + (lines[0]?.length ?? 0) + 1;
  let end = source.length;
  for (const line of lines.slice(1)) {
    const trimmed = line.trim();
    const lineIndentation = /^[ \t]*/u.exec(line)?.[0].length ?? 0;
    if (trimmed.length > 0 && !trimmed.startsWith("#") && lineIndentation <= indentation) {
      end = offset;
      break;
    }
    offset += line.length + 1;
  }
  return { start: lineStart, end, route };
}

function supportedCalls(source: string, name: string): Array<{ start: number; arguments: CallArgument[] }> {
  const calls: Array<{ start: number; arguments: CallArgument[] }> = [];
  const pattern = new RegExp(`\\b${name}\\s*\\(`, "gu");
  for (const match of source.matchAll(pattern)) {
    if (match.index === undefined) continue;
    const linePrefix = source.slice(source.lastIndexOf("\n", match.index) + 1, match.index).trimStart();
    if (linePrefix.startsWith("#")) continue;
    const open = source.indexOf("(", match.index);
    const close = closingParenthesis(source, open);
    if (close === null) continue;
    calls.push({ start: match.index, arguments: splitTopLevel(source.slice(open + 1, close), open + 1) });
  }
  return calls;
}

function isUserFacingDictionary(source: string, entryOffset: number): boolean {
  const open = source.lastIndexOf("{", entryOffset);
  if (open < 0) return false;
  const lineStart = source.lastIndexOf("\n", open) + 1;
  const declaration = source.slice(lineStart, open).trim();
  if (declaration.startsWith("#")) return false;
  return /\breturn\s*$/u.test(declaration) ||
    /\b(?:response|responses|message|messages|error|errors|content)\w*\s*=\s*$/iu.test(declaration);
}

function parsePython(source: string, sourceArtifact: string): ParserResult {
  const occurrences: OccurrenceDraft[] = [];
  const warnings: string[] = [];
  const routes: RouteRange[] = [];

  for (const match of source.matchAll(ROUTE_DECORATOR)) {
    if (match.index === undefined) continue;
    const open = source.indexOf("(", match.index);
    const close = closingParenthesis(source, open);
    if (close === null) continue;
    const argumentsList = splitTopLevel(source.slice(open + 1, close), open + 1);
    const routeLiteral = argumentsList[0] === undefined ? null : staticString(argumentsList[0]);
    if (routeLiteral === null) {
      warnings.push(`unsupported_dynamic_python_expression:${sourceArtifact}:${lineAt(source, open + 1)}`);
      continue;
    }
    occurrences.push(occurrence(
      source, sourceArtifact, routeLiteral, "route_declaration", routeLiteral.value,
      `fastapi_route:${match[2] ?? "unknown"}`, "machine",
    ));
    const range = functionRange(source, close + 1, routeLiteral.value);
    if (range !== null) routes.push(range);
    for (const name of ["summary", "description"]) {
      const argument = keywordArgument(argumentsList, name);
      if (argument === null) continue;
      const parsed = staticString(argument);
      if (parsed === null) {
        warnings.push(`unsupported_dynamic_python_expression:${sourceArtifact}:${lineAt(source, argument.start)}`);
      } else {
        occurrences.push(occurrence(
          source, sourceArtifact, parsed, "route_metadata", routeLiteral.value,
          `fastapi_route_metadata:${name}`, "metadata",
        ));
      }
    }
  }

  for (const call of supportedCalls(source, "HTTPException")) {
    const argument = keywordArgument(call.arguments, "detail");
    if (argument === null) continue;
    const parsed = staticString(argument);
    if (parsed === null) {
      warnings.push(`unsupported_dynamic_python_expression:${sourceArtifact}:${lineAt(source, argument.start)}`);
    } else {
      occurrences.push(occurrence(source, sourceArtifact, parsed, "user_facing_literal", routeForOffset(routes, call.start), "fastapi_http_exception:detail"));
    }
  }

  for (const call of supportedCalls(source, "Field")) {
    for (const name of ["title", "description"]) {
      const argument = keywordArgument(call.arguments, name);
      if (argument === null) continue;
      const parsed = staticString(argument);
      if (parsed === null) {
        warnings.push(`unsupported_dynamic_python_expression:${sourceArtifact}:${lineAt(source, argument.start)}`);
      } else {
        occurrences.push(occurrence(source, sourceArtifact, parsed, "user_facing_literal", null, `pydantic_field:${name}`));
      }
    }
  }

  const dictionaryEntry = /(["'])([A-Za-z_][\w-]*)\1\s*:\s*((?![fF])(?:[rRuUbB]{0,2})?(["'])(?:\\.|(?!\4)[\s\S])*\4)/gu;
  for (const match of source.matchAll(dictionaryEntry)) {
    if (
      match.index === undefined ||
      !APPROVED_DICTIONARY_KEYS.has(match[2] ?? "") ||
      !isUserFacingDictionary(source, match.index)
    ) continue;
    const expression = match[3] ?? "";
    const expressionStart = match.index + (match[0]?.lastIndexOf(expression) ?? 0);
    const parsed = staticString({ text: expression, start: expressionStart });
    if (parsed !== null) {
      occurrences.push(occurrence(
        source, sourceArtifact, parsed, "user_facing_literal", routeForOffset(routes, match.index),
        `python_dictionary:${match[2] ?? "unknown"}`,
      ));
    }
  }

  return { occurrences, claims: [], warnings: [...new Set(warnings)], unsupported: [] };
}

function parseTemplate(source: string, sourceArtifact: string): ParserResult {
  const occurrences: OccurrenceDraft[] = [];
  let excludedElement: "script" | "style" | null = null;
  for (const match of source.matchAll(/<!--[\s\S]*?-->|<[^>]+>|[^<]+/gu)) {
    if (match.index === undefined) continue;
    const token = match[0];
    const closing = /^<\/(script|style)\b/iu.exec(token)?.[1]?.toLowerCase();
    const opening = /^<(script|style)\b/iu.exec(token)?.[1]?.toLowerCase();
    if (closing === excludedElement) {
      excludedElement = null;
      continue;
    }
    if (opening === "script" || opening === "style") {
      excludedElement = opening;
      continue;
    }
    if (excludedElement !== null || token.startsWith("<") || token.trim().length === 0) continue;
    let chunkStart = 0;
    for (const directive of token.matchAll(/\{%[\s\S]*?%\}|\{#[\s\S]*?#\}/gu)) {
      const directiveStart = directive.index ?? 0;
      const chunks = [[chunkStart, directiveStart]] as Array<[number, number]>;
      for (const [start, end] of chunks) {
        const chunk = token.slice(start, end);
        if (chunk.trim().length === 0) continue;
        const leading = chunk.length - chunk.trimStart().length;
        const trailing = chunk.length - chunk.trimEnd().length;
        occurrences.push(occurrence(source, sourceArtifact, {
          value: chunk.trim().replace(/\s+/gu, " "),
          value_start: match.index + start + leading,
          value_end: match.index + end - trailing,
        }, "html_text", null, "template_visible_text"));
      }
      chunkStart = directiveStart + directive[0].length;
    }
    const chunk = token.slice(chunkStart);
    if (chunk.trim().length > 0) {
      const leading = chunk.length - chunk.trimStart().length;
      const trailing = chunk.length - chunk.trimEnd().length;
      occurrences.push(occurrence(source, sourceArtifact, {
        value: chunk.trim().replace(/\s+/gu, " "),
        value_start: match.index + chunkStart + leading,
        value_end: match.index + token.length - trailing,
      }, "html_text", null, "template_visible_text"));
    }
  }
  return { occurrences, claims: [], warnings: [], unsupported: [] };
}

export const pythonArtifactParser: ArtifactParser = {
  parser_id: "parser.filesystem.python-template",
  supports({ artifact }) {
    const extension = extname(artifact.relative_path).toLowerCase();
    return extension === ".py" || extension === ".jinja" || extension === ".jinja2" ||
      (extension === ".html" && /(^|\/)templates\//u.test(artifact.relative_path));
  },
  parse({ artifact, source }) {
    return artifact.extension === ".py"
      ? parsePython(source, artifact.relative_path)
      : parseTemplate(source, artifact.relative_path);
  },
};
