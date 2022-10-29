#!/usr/bin/env node

import chalk from "chalk";
import { exec } from "child_process";

async function runDev() {
  try {
    const { stdout } = exec(
      "ts-node-dev --watch --respawn --transpile-only --ignore-watch .gitignore -- index.ts"
    );
    var first = 0;
    stdout?.on("data", (data) => {
      if (first === 0) {
        process.stdout.write(
          `${chalk.bgBlack.hex("#ff7700")(" NODE ")} ${chalk.green(
            "Development node has started!"
          )}.\n\n`
        );
        first++;
      }
      if (data.toString().includes("ts-node-dev ver")) return;
      else if (data.toString().includes("Restarting")) {
        const str = data.toString();
        const fileRegex = /^(.+)\\([^\\]+)$/gim;
        const filePath = (fileRegex.exec(str) as any)[0];
        if (filePath) {
          const folders = filePath.split("\\");
          const file = folders[folders.length - 1];
          console.log(
            `\n${chalk.bgBlack.whiteBright(" RESTART ")} ${chalk.red(file)}`
          );
        } else {
          console.log(
            `\n${chalk.bgBlack.whiteBright(" RESTART ")} ${
              str.split("Restarting: ")[1]
            }`
          );
        }
      } else if (data.toString().includes("[ERROR]")) {
        var str = data.toString().replace(/\[ERROR\]\s\d\d:\d\d:\d\d\s/gim, "");

        var err = (/\[[[aA-zZ].+\]/gim.exec(str) as string[])[0].replace(
          /\[|\]/gim,
          ""
        );
        err = chalk.redBright(`${err}: `);

        var message = (/:.*/gim.exec(str) as string[])[0].replace(": ", "");

        console.log(
          `${chalk.bgBlack.yellowBright(" ERROR ")} ${err}${message}`
        );
      } else
        console.log(
          `${chalk.bgBlack.magentaBright(" DEV ")} ${data.toString()}`
        );
    });
    stdout?.on("error", (err) => {
      console.log(`${chalk.bgBlack.yellowBright(" ERROR ")} ${err.toString()}`);
    });
    stdout?.on("pause", () => {
      console.log(
        `${chalk.bgBlack.yellowBright(
          " PAUSED "
        )} Development node has been paused.`
      );
      console.log();
    });
    stdout?.on("resume", () => {
      if (first === 0) return;
      console.log(
        `${chalk.bgBlack.yellowBright(
          " RESUMED "
        )} Development node has been resumed.`
      );
      console.log();
    });
    stdout?.on("end", () => {
      console.log(
        `${chalk.bgBlack.blackBright(
          " ENDED "
        )} Development node has been ended.`
      );
      console.log();
    });
  } catch (error) {
    console.log(chalk.red(error));
  }
}

async function watchCompiler() {
  try {
    const { stdout } = await exec(
      "tsup ./index.ts --outDir .riku --clean --minify --watch --sourcemap --format cjs"
    );
    var first = 0;
    process.stdout.write(
      `${chalk.bgBlack.cyanBright(" COMPILER ")} ${chalk.yellow(
        "Watching for changes in your code..."
      )}\n\n`
    );
    stdout?.on("data", (data) => {
      if (!data.toString().includes("Build success")) return;
      process.stdout.write(
        `${chalk.bgBlack.cyanBright(" COMPILER ")} Compilied ${
          first !== 0 ? "new" : ""
        }code successfully.\n\n`
      );
      first++;
    });
  } catch (error) {
    process.stdout.clearLine(0);
    console.log(chalk.red(error));
  }
}

function clear() {
  process.stdout.clearLine(1);
  process.stdout.cursorTo(0);
}

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
        `${chalk.bgBlack.red(" RIKU ")} ${chalk.blue(
          "Compiling your code..."
        )}\n\n`
      );
      watchCompiler();
    }

    process.stdout.write(
      `${chalk.bgBlack.red(" RIKU ")} ${chalk.blue(
        "Starting development node..."
      )}\n\n`
    );
    runDev();
  });

program.parse();
