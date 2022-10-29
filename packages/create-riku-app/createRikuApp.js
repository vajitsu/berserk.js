#!/usr/bin/env node

const path = require("path");
const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);
const chalk = require("chalk");

async function runCmd(command) {
  try {
    const { stdout, stderr } = await exec(command);
    // console.log(stdout);
    // console.log(stderr);
  } catch {
    (error) => {
      console.log("\x1b[31m", error, "\x1b[0m");
    };
  }
}

if (process.argv.length < 3) {
  console.log(chalk.yellow("You have to provide a name to your app."));
  console.log();
  console.log(
    chalk.blue(
      `${chalk.bold.blackBright("Example:")} npx create-riku-app riku-app`
    )
  );
  process.exit(1);
}

const ownPath = process.cwd();
const folderName = process.argv[2];
const appPath = path.join(ownPath, folderName);
const repo = "https://github.com/rikujs/create-riku-app.git";

try {
  fs.mkdirSync(appPath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log(
      chalk.red(
        `The file ${folderName} already exist in the current directory, please give it another name.`
      )
    );
  } else {
    console.log(err);
  }
  process.exit(1);
}

async function setup() {
  try {
    console.log(chalk.yellow("Downloading the project structure..."));
    await runCmd(`git clone --depth 1 ${repo} ${folderName}`);

    process.chdir(appPath);

    generateEnv();
    generateConfig();

    console.log(chalk.blue("Installing dependencies..."));
    await runCmd("npm install --silent");

    // await runCmd("npx rimraf ./.git");

    console.log(chalk.green("Installation has finished."));
    console.log();

    console.log(chalk.blue("You can start by typing:"));
    console.log(`    cd ${folderName}`);
    console.log("    npm run dev", "\x1b[0m");
  } catch (error) {
    console.log(error);
  }
}

setup();

function generateEnv() {
  fs.writeFileSync(
    `${process.cwd()}/.env`,
    `ALLOW_CONFIG_MUTATIONS="true"`,
    "utf-8"
  );
}

function generateConfig() {
  const content = `
import * as Discord from "discord.js";

export default {
  discord: {
    client: {
      token: "token",
      application: {
        id: "application_id",
      },
      options: {
        intents: [
          Discord.GatewayIntentBits.Guilds,
          Discord.GatewayIntentBits.GuildMessages
        ],
      },
    },
  },
};
  `;
  fs.mkdirSync(path.join(process.cwd(), "config"), { recursive: true });
  fs.writeFileSync(`${process.cwd()}/config/default.ts`, content, "utf-8");
}
