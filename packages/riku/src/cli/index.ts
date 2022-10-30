#!/usr/bin/env node

import { chalk, dev, build, start } from "./helpers";
import { Command } from "commander";
import path from "path";
import fs from "fs";
import Chalk from "chalk";
import events from "events";

const program = new Command();

program
  .name("riku")
  .description("Build, test and deploy your Riku.js app")
  .version("0.0.1")
  .addHelpCommand("help [command]", "Display help for [command]");

program
  .command("dev")
  .description("Run your Riku.js app")
  .action(() => {
    process.stdout.write(
      `${chalk.msg.riku(chalk.colors.blue("Starting development node..."))}\n\n`
    );
    dev();
  });

program
  .command("build")
  .description("Build your Riku.js app for production")
  .action(() => {
    build(new events.EventEmitter());
  });

program
  .command("start")
  .description("Run your production build of your Riku.js app")
  .option("-B, --build", "Builds your project simultaneously to starting it")
  .action((_, options) => {
    const Build = options.options.find((a: any) => a.long === "--build");

    if (!fs.existsSync(path.join(process.cwd(), ".riku/build")) && !Build) {
      console.log(
        chalk.msg.riku(
          chalk.msg.error(Chalk.red(`Your project has not been bundled yet.`))
        )
      );
      console.log();
      console.log(
        `${Chalk.hidden(" RIKU  ")}Run ${chalk.colors.green(
          "npm run dev"
        )} before prior to this command`
      );
      console.log();
      console.log(
        `${Chalk.hidden(" RIKU  ")}You could also add the ${Chalk.green(
          "--build"
        )} option:\n${Chalk.hidden(" RIKU  ")}${Chalk.blue(
          "Builds your project simultaneously."
        )}`
      );
    } else if (Build) {
      const e = new events.EventEmitter();
      e.once("next", () => start());
      build(e);
    } else start();
  });

program.parse(process.argv);
