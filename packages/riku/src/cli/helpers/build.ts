import getFilesSync from "./get-file-sync";
import { exec } from "child_process";
import events from "events";
import { chalk } from ".";
import path from "path";
import fs from "fs";

function emptyBuildDir(e: events.EventEmitter) {
  const { stdout } = exec("rm -rf .riku/build && mkdir -p .riku/build");
  stdout?.once("end", () => {
    console.log(chalk.msg.riku(chalk.colors.blue(`Emptied build directory.`)));
    e.emit("emptied");
  });
}
function copyConfig(e: events.EventEmitter) {
  const { stdout } = exec(
    `tsup config/production.js config/production.ts --outDir .riku/build/config --clean --minify --sourcemap`
  );
  stdout?.once("end", () => {
    console.log();
    console.log(
      chalk.msg.riku(chalk.colors.blue(`Copied configuration file.`))
    );
    e.emit("copied");
  });
}
function tsup(e: events.EventEmitter) {
  let files = getFilesSync(process.cwd(), [
    "node_modules",
    ".riku",
    "config",
  ]).filter((t) => t.endsWith(".ts") || t.endsWith(".js"));

  files = files.map((a) => {
    const b = a.replace(process.cwd(), "");
    return b.slice(1);
  });

  const { stdout } = exec(
    `tsup ${files.join(
      " "
    )} --outDir .riku/build --clean --minify --format cjs --sourcemap`
  );
  stdout?.once("end", () => {
    console.log();
    console.log(
      chalk.msg.riku(chalk.colors.blue(`Compilied files successfully.`))
    );
    e.emit("compilied");
  });
}
function removeTypescriptFromBuildDir(e: events.EventEmitter) {
  const { stdout } = exec(
    "rm -r .riku/build/*.ts && rm -r .riku/build/**/*.ts"
  );
  stdout?.once("end", () => {
    console.log();
    console.log(
      chalk.msg.riku(chalk.colors.yellow(`Removed unnecessary typescript.`))
    );
    e.emit("done");
  });
}

export default async function build() {
  // const tsConfig = fs.existsSync(path.join(process.cwd(), "tsconfig.json"));

  const e = new events.EventEmitter();
  e.once("done", () => {
    console.log();
    console.log(
      chalk.msg.riku(chalk.colors.green("Successfully compilied your project!"))
    );
  });
  e.once("emptied", () => {
    tsup(e);
  });
  //e.once("copied", () => removeTypescriptFromBuildDir(e));
  e.once("compilied", () => copyConfig(e));
  emptyBuildDir(e);
}
