#!/usr/bin/env node

const path = require('path');
const util = require('util');
const packageJson = require('./package.json');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const chalk = require("chalk");

async function runCmd(command) {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log(stderr);
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

    console.log(chalk.blue("Installing dependencies..."));
    await runCmd("npm install");

    await runCmd("npx rimraf ./.git");

    fs.rmSync(path.join(appPath, "createRikuApp.js"), { recursive: true });
    fs.unlinkSync(path.join(appPath, "package.json"));

    buildPackageJson(packageJson, folderName);
    buildTsConfig();

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

function buildPackageJson(packageJson, folderName) {
  const { ...newPackage } =
    packageJson;

  Object.assign(newPackage, {
    name: folderName,
    version: "1.0.0",
    scripts: {
      dev: "npx ts-node-dev -- ./index.ts",
    },
    dependencies: {
      config: "3.3.8",
      riku: "latest",
      dotenv: "16.0.3",
      "discord.js": "latest"
    },
    devDependencies: {
      "@babel/core": "^7.0.0",
      "@types/config": "3.3.0",
      "@types/node": "^17.0.12",
      eslint: "^7.32.0",
      "eslint-config-custom": "*",
      tsconfig: "*",
      typescript: "^4.5.3",
    },
  });

  delete newPackage.bin;
  delete newPackage.description;

  fs.writeFileSync(
    `${process.cwd()}/package.json`,
    JSON.stringify(newPackage, null, 2),
    "utf8"
  );
}

function buildTsConfig() {
  const tsConfig = {};
  Object.assign(tsConfig, {
    include: ["."],
    exclude: ["node_modules"],
    compilerOptions: {
      target: "ESNext",
      strict: true,
      forceConsistentCasingInFileNames: true,
      moduleResolution: "node",
    },
  });
  fs.writeFileSync(
    `${process.cwd()}/tsconfig.json`,
    JSON.stringify(tsConfig, null, 2),
    "utf8"
  );
}