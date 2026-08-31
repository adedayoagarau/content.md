import { readFile, readdir } from "node:fs/promises";
import { join, relative } from "node:path";

export async function inventoryFiles(directory, digestBytes) {
  const output = new Map();
  const pending = [directory];

  while (pending.length > 0) {
    const current = pending.pop();
    const entries = await readdir(current, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name, "en"));
    for (let index = entries.length - 1; index >= 0; index -= 1) {
      const entry = entries[index];
      const entryPath = join(current, entry.name);
      const relativePath = relative(directory, entryPath).replaceAll("\\", "/");
      if (entry.isDirectory()) pending.push(entryPath);
      else if (entry.isSymbolicLink()) {
        output.set(relativePath, `symlink:${await readFile(entryPath, "utf8").catch(() => "unreadable")}`);
      } else if (entry.isFile()) output.set(relativePath, digestBytes(await readFile(entryPath)));
    }
  }

  return new Map([...output.entries()].sort(([left], [right]) => left.localeCompare(right, "en")));
}
