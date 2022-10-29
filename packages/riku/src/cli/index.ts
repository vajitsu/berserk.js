#!/usr/bin/env node

import { chalk, dev, build } from "./helpers";

import { Command } from "commander";

const program = new Command();

program
  .name("riku")
  .description("Build, test and deploy your Riku.js app")
  .version("0.0.1")
  .addHelpCommand("help [command]", "Display information for [command]");

program
  .command("dev")
  .alias("start")
  .description("Run your Riku.js app")
  .action(() => {
    // if (options.watch) {
    //   process.stdout.write(
    //     `${chalk.msg.riku(chalk.colors.blue(
    //       "Compiling your code..."
    //     ))}\n\n`
    //   );
    //   compileDev();
    // }

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

program.parse();
