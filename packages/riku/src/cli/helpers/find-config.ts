import path from "path";
import fs from "fs";

import JoyCon from "joycon";
import TypescriptLoader from "joycon-ts-loader";

const joycon = new JoyCon();
joycon.addLoader(TypescriptLoader);

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export function findConfigPath(dir: string, key: string): string | undefined {
  // If we didn't find the configuration in `package.json`, we should look for
  // known filenames.
  const possible = [
    `.${key}rc.json`,
    `${key}.config.json`,
    `.${key}rc.js`,
    `${key}.config.js`,
    `${key}.config.cjs`,
    `${key}.config.ts`,
  ];

  const found = [];

  for (let file of possible) {
    const exists = fs.existsSync(path.join(process.cwd(), file));
    if (exists) found.push(path.join(process.cwd(), file));
  }
  return found.length > 0 ? found[0] : undefined;
}

function findPackageJson(dir: string): string | undefined {
  const exists = fs.existsSync(path.join(dir, "package.json"));
  if (!exists) return undefined;

  return path.join(dir, "package.json");
}

// We'll allow configuration to be typed, but we force everything provided to
// become optional. We do not perform any schema validation. We should maybe
// force all the types to be `unknown` as well.
export async function findConfig<T>(
  directory: string,
  key: string,
  _returnFile?: boolean
): Promise<RecursivePartial<T> | null> {
  // `package.json` configuration always wins. Let's check that first.
  const packageJsonPath = findPackageJson(directory);
  if (packageJsonPath) {
    const packageJson = require(packageJsonPath);
    if (packageJson[key] != null && typeof packageJson[key] === "object") {
      return packageJson[key];
    }
  }

  const filePath = findConfigPath(directory, key);
  console.log(filePath);

  if (filePath) {
    if (filePath.endsWith(".ts")) {
      const result = await joycon.load([filePath]);
      return result.data;
    }

    if (filePath.endsWith(".js") || filePath.endsWith(".cjs")) {
      return require(filePath);
    }

    // We load JSON contents with JSON5 to allow users to comment in their
    // configuration file. This pattern was popularized by TypeScript.
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  }

  return null;
}
