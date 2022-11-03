import fs from "fs";
import path from "path";

export default function findEntries(cwd: string, dirs: string[]) {
  const files = [];

  for (let dir of dirs) {
    if (!fs.existsSync(path.join(cwd, dir))) return;
    const _files = fs
      .readdirSync(path.join(cwd, dir))
      .filter((a) => a.endsWith(".ts") || a.endsWith(".js"));
    for (let _file of _files) files.push(path.join(dir, _file));
  }

  if (files.length === 0) return void 0;

  return files;
}
