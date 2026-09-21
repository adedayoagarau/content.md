import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["packages/**/*.test.ts"],
    testTimeout: 15_000,
    maxWorkers: 1,
    maxConcurrency: 1,
    execArgv: ["--max-old-space-size=6144"],
  },
});
