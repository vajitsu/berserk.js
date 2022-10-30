import getFilesSync from "../helpers/get-file-sync";
import { exec } from "child_process";
import events from "events";
import { chalk } from "../helpers";
import Chalk from "chalk";
import path from "path";
import fs from "fs";

import buildComponents from "../helpers/build/components";
import buildCommands from "../helpers/build/commands";
import buildEvents from "../helpers/build/events";
import buildIndex from "../helpers/build";

function emptyBuildDir(e: events.EventEmitter) {
  const { stdout } = exec("rm -rf .riku/build && mkdir -p .riku/build");
  stdout?.once("end", () => {
    console.log(chalk.msg.riku(`Emptied build directory.`));
    e.emit("components");
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
  e.on("components", () => buildComponents(e, config));
  e.on("commands", () => buildCommands(e, config));
  e.on("events", () => buildEvents(e, config));
  e.on("index", () => buildIndex(e, config));

  emptyBuildDir(e);
}
