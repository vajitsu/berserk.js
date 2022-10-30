import getFilesSync from "../helpers/get-file-sync";
import { exec } from "child_process";
import events from "events";
import { chalk } from "../helpers";
import Chalk from "chalk";

import buildComponents from "../helpers/build/components";
import buildCommands from "../helpers/build/commands";
import buildEvents from "../helpers/build/events";
import buildIndex from "../helpers/build";

function emptyBuildDir(e: events.EventEmitter) {
  const { stdout } = exec("rm -rf .riku/build && mkdir -p .riku/build");
  stdout?.once("end", () => {
    console.log(chalk.msg.riku(chalk.colors.blue(`Emptied build directory.`)));
    e.emit("components");
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

export default async function build(e: events.EventEmitter) {
  e.once("done", () => {
    console.log();
    console.log(
      chalk.msg.riku(chalk.colors.green("Successfully compilied your project!"))
    );
    console.log();
    console.log(
      `${Chalk.bgBlack.yellowBright(" WARNING ")} Make sure to add ${Chalk.bold(
        "DISCORD_TOKEN"
      )} to your environemntal variables`
    );
    console.log();
    e.emit("next");
  });

  // Chores
  e.on("empty", () => emptyBuildDir(e));
  e.on("removeTypescript", () => removeTypescriptFromBuildDir(e));

  // Compiliers
  e.on("components", () => buildComponents(e));
  e.on("commands", () => buildCommands(e));
  e.on("events", () => buildEvents(e));
  e.on("index", () => buildIndex(e));

  emptyBuildDir(e);
}
