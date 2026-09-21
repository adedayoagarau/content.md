import { readFile } from "node:fs/promises";
import {
  classifyUxWritingCoordinate,
  evaluateUxWritingBenchmark,
  resolveUxWritingPolicy,
  type UxWritingBenchmarkAdjudication,
  type UxWritingBenchmarkCase,
  type UxWritingCoordinateInput,
} from "@contentmd/evaluation";

export interface LocalUxWritingUseCaseRequest {
  input: UxWritingCoordinateInput;
  facts: Record<string, string>;
}

export interface LocalUxWritingUseCaseResult {
  contract_version: "contentmd.local-ux-writing-usecase-result/0.1.0";
  mode: "shadow";
  authority_effect: "none";
  write_effect: "none";
  classification: ReturnType<typeof classifyUxWritingCoordinate>;
  resolution: ReturnType<typeof resolveUxWritingPolicy>;
}

function invariant(condition: unknown, code: string): asserts condition {
  if (!condition) throw new Error(`ux_writing_usecase_input_invalid:${code}`);
}

function plainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    && Object.getPrototypeOf(value) === Object.prototype;
}

function parseRequest(value: unknown): LocalUxWritingUseCaseRequest {
  invariant(plainObject(value), "request_shape");
  const keys = Object.keys(value).sort();
  invariant(keys.length === 2 && keys[0] === "facts" && keys[1] === "input", "request_keys");
  invariant(plainObject(value.input), "input_shape");
  invariant(plainObject(value.facts), "facts_shape");
  for (const [key, fact] of Object.entries(value.facts)) {
    invariant(key.trim().length > 0 && typeof fact === "string" && fact.trim().length > 0, `fact:${key}`);
  }
  return { input: value.input as UxWritingCoordinateInput, facts: value.facts as Record<string, string> };
}

function parseJsonl<T>(raw: string, label: string): T[] {
  invariant(raw.endsWith("\n") && !raw.endsWith("\n\n"), `${label}:final_lf`);
  try {
    return raw.trimEnd().split("\n").map((line) => JSON.parse(line) as T);
  } catch {
    throw new Error(`ux_writing_usecase_input_invalid:${label}:jsonl`);
  }
}

export async function classifyLocalUxWritingUseCase(path: string): Promise<LocalUxWritingUseCaseResult> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(await readFile(path, "utf8")) as unknown;
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error("ux_writing_usecase_input_invalid:request_json");
    throw error;
  }
  const request = parseRequest(parsed);
  const classification = classifyUxWritingCoordinate(request.input);
  const resolution = resolveUxWritingPolicy({ classification, facts: request.facts });
  return {
    contract_version: "contentmd.local-ux-writing-usecase-result/0.1.0",
    mode: "shadow",
    authority_effect: "none",
    write_effect: "none",
    classification,
    resolution,
  };
}

export async function evaluateLocalUxWritingUseCaseBenchmark(
  benchmarkPath: string,
  adjudicationPath: string,
): Promise<ReturnType<typeof evaluateUxWritingBenchmark>> {
  const [benchmarkRaw, adjudicationRaw] = await Promise.all([
    readFile(benchmarkPath, "utf8"),
    readFile(adjudicationPath, "utf8"),
  ]);
  return evaluateUxWritingBenchmark({
    cases: parseJsonl<UxWritingBenchmarkCase>(benchmarkRaw, "benchmark"),
    adjudications: parseJsonl<UxWritingBenchmarkAdjudication>(adjudicationRaw, "adjudication"),
  });
}
