#!/usr/bin/env node

import { exec } from "child_process";
import { chalk } from "./helpers";
import { Command } from "commander";
import path from "path";
import fs from "fs";
import Chalk from "chalk";
import events from "events";
import packageJson from "../../package.json";
import build from "./commands/build";
import dev from "./commands/dev";
import start from "./commands/start";
import { findConfig } from "./helpers/find-config";

import dotenv from "dotenv";
dotenv.config();

const program = new Command();

program
  .name(packageJson.name)
  .description("Build, test and deploy your Riku.js app")
  .version(packageJson.version)
  .addHelpCommand("help [command]", "Display help for [command]");

program
  .command("dev")
  .description("Run your Riku.js app")
  .action(() => {
    console.log(
      `${chalk.msg.riku(chalk.colors.blue("Starting development node..."))}`
    );
    console.log();
    try {
      dev();
    } catch (e) {
      console.log(e);
    }
  });

program
  .command("build")
  .description("Build your Riku.js app for production")
  .action(() => {
    build(new events.EventEmitter(), findConfig(process.cwd(), "riku"));
  });

program
  .command("start")
  .description("Run your production build of your Riku.js app")
  .action(() => {
    if (!fs.existsSync(path.join(process.cwd(), ".riku", "build"))) {
      console.log(
        chalk.msg.error(Chalk.red(`Your project has not been bundled yet.`))
      );
      console.log();
      console.log(
        `Run ${chalk.colors.green(
          "npm run build"
        )} prior to runnig this command`
      );
    } else start();
  });

program.parse(process.argv);
