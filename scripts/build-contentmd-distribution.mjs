#!/usr/bin/env node

import { chmod, copyFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { build } from "esbuild";

const root = fileURLToPath(new URL("../", import.meta.url));
const distribution = path.join(root, "distribution/contentmd");
const output = path.join(distribution, "dist/contentmd.cjs");

await mkdir(path.dirname(output), { recursive: true });
await build({
  stdin: {
    contents: [
      'import { main } from "./packages/cli/src/main.ts";',
      "main(process.argv).catch((error) => {",
      "  console.error(error instanceof Error ? error.message : String(error));",
      "  process.exitCode = 1;",
      "});",
    ].join("\n"),
    resolveDir: root,
    sourcefile: "contentmd-distribution-entry.ts",
    loader: "ts",
  },
  outfile: output,
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node24",
  define: { "import.meta.url": "undefined" },
  banner: { js: "#!/usr/bin/env node" },
  legalComments: "none",
});
await chmod(output, 0o755);
await copyFile(path.join(root, "README.md"), path.join(distribution, "README.md"));
await copyFile(path.join(root, "LICENSE"), path.join(distribution, "LICENSE"));

console.log(JSON.stringify({ output, package: "contentmd", version: "0.1.0" }, null, 2));
