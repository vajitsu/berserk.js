#!/usr/bin/env node

import chalk from "chalk";
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
  .action(function () {
    console.log(chalk.blue("Starting your Riku.js app..."));
  });

program.parse();
