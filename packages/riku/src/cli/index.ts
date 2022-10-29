#!/usr/bin/env node

//import chalk from "chalk";
import { exec } from "child_process";

import {
  chalk,
  dev,
  compileDev
} from "./helpers"

import { Command } from "commander";

const program = new Command();

program
  .name("riku")
  .description("Build, test and deploy your Riku.js app")
  .version("0.0.1")
  .addHelpCommand("help [command]", "Display information for [command]");

program
  .command("dev")
  .description("Test your Riku.js app")
  .option("-w, --watch", "Compiles code as user makes changes.")
  .action((options) => {
    if (options.watch) {
      process.stdout.write(
        `${chalk.msg.riku(chalk.colors.blue(
          "Compiling your code..."
        ))}\n\n`
      );
      compileDev();
    }

    process.stdout.write(
      `${chalk.msg.riku(chalk.colors.blue(
        "Starting development node..."
      ))}\n\n`
    );
    dev()
  });

program.parse();
