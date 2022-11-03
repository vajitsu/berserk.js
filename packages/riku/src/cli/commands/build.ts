import getFilesSync from "../helpers/get-file-sync";
import { exec } from "child_process";
import events from "events";
import { chalk } from "../helpers";
import Chalk from "chalk";
import path from "path";
import fs from "fs";
import findEntries from "../helpers/find-entries";
import { UserConfig } from "index";

function emptyBuildDir(e: events.EventEmitter) {
  const { stdout } = exec("rm -rf .riku/build && mkdir -p .riku/build");
  stdout?.once("end", () => {
    console.log(chalk.msg.riku(`Emptied build directory.`));
    e.emit("bundle");
  });
}

function removeTypescriptFromBuildDir(e: events.EventEmitter) {
  if (
    !fs
      .readdirSync(path.join(process.cwd(), ".riku/build"))
      .find((a) => a.includes(".ts"))
  )
    return e.emit("done");

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

function bundle(e: events.EventEmitter, config: UserConfig) {
  const entries = findEntries(process.cwd(), ["ui", "commands", "events"]);

  if (!entries) {
    console.log();
    console.log(
      chalk.msg.error(`No files found to bundle... exiting build process`)
    );
    return process.exit(0);
  }

  const entry = entries?.join(" ");
  const env = config.env?.map((v) => `--env.${v} ${process.env[v]}`);

  const { stdout, stderr } = exec(
    `tsup-node ${entry} --outDir .riku/build --minify --clean --format cjs --treeshake  ${env} `
  );
  stderr?.on("data", (d) => console.log(d.toString()));
  stdout?.on("data", (d) => console.log(d.toString()));
  stdout?.once("end", () => {
    console.log();
    console.log(chalk.msg.riku(`Bundled app successfully.`));
    e.emit("done");
  });
}

export default async function build(e: events.EventEmitter, config: any) {
  e.once("done", () => {
    console.log();
    console.log(
      chalk.msg.riku(chalk.colors.green("Successfully compilied your project!"))
    );
    console.log();
    e.emit("next");
  });
  e.once("done-nothing", () => {
    console.log();
    console.log(
      chalk.msg.riku(
        chalk.colors.yellow(
          "The necessary files from your project have not been found."
        )
      )
    );
    console.log();
    console.log(chalk.msg.riku(Chalk.blackBright("Exiting build process...")));
    process.exit(1);
  });

  // Chores
  e.on("empty", () => emptyBuildDir(e));
  e.on("removeTypescript", () => removeTypescriptFromBuildDir(e));

  // Compiliers
  e.on("bundle", () => bundle(e, config));

  emptyBuildDir(e);
}
