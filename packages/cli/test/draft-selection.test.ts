import { describe, expect, it } from "vitest";
import { buildProgram } from "../src/main.js";

describe("governed draft selection CLI", () => {
  it("requires a complete selection replay without a provider grant", () => {
    const program = buildProgram();
    const command = program.commands.find((candidate) => candidate.name() === "draft-select");

    expect(command?.options.map((option) => option.long)).toEqual([
      "--root",
      "--json",
      "--input",
    ]);
    expect(command?.options.find((option) => option.long === "--input")?.required).toBe(true);
  });
});
