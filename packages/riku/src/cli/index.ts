#!/usr/bin/env node

import { chalk, dev, build, start } from "./helpers";

import { Command } from "commander";

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
    build();
  });

program
  .command("start")
  .description("Run your production build of your Riku.js app")
  .action(() => {
    start();
  });

program.parse();
