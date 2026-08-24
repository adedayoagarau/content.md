import type ts from "typescript-compiler";

export interface SourceCoordinates {
  line: number;
  column: number;
  end_line: number;
  end_column: number;
}

export function coordinatesFromOffsets(
  sourceFile: ts.SourceFile,
  start: number,
  end: number,
): SourceCoordinates {
  const startPosition = sourceFile.getLineAndCharacterOfPosition(start);
  const endPosition = sourceFile.getLineAndCharacterOfPosition(end);
  return {
    line: startPosition.line + 1,
    column: startPosition.character + 1,
    end_line: endPosition.line + 1,
    end_column: endPosition.character + 1,
  };
}

export function offsetCoordinates(
  source: string,
  start: number,
  end: number,
): SourceCoordinates {
  const beforeStart = source.slice(0, start);
  const beforeEnd = source.slice(0, end);
  const startLines = beforeStart.split("\n");
  const endLines = beforeEnd.split("\n");
  return {
    line: startLines.length,
    column: (startLines.at(-1)?.length ?? 0) + 1,
    end_line: endLines.length,
    end_column: (endLines.at(-1)?.length ?? 0) + 1,
  };
}
