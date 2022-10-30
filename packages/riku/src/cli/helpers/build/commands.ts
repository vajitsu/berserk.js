import { exec } from "child_process";
import events from "events";
import path from "path";
import fs from "fs";
import { chalk } from "../.";
import { UserConfig } from "index";

import dotenv from "dotenv";
dotenv.config();

function next(e: events.EventEmitter) {
  e.emit("events");
}

export default function buildCommands(
  e: events.EventEmitter,
  config: UserConfig
) {
  if (!fs.existsSync(path.join(process.cwd(), "commands/"))) return next(e);

  var commands = fs
    .readdirSync(path.join(process.cwd(), "commands"))
    .filter((a) => a.endsWith(".js") || a.endsWith(".ts"));

  if (!commands || commands.length === 0) return next(e);

  commands = commands.map((a) => {
    const b = a.replace(process.cwd(), "");
    return `commands/${b.slice(1)}`;
  });

  let vars;
  if (config && config.env && config.env.length > 0) {
    vars = config.env.map((v) => `--env.${v} ${process.env[v]}`);
  }

  const { stdout } = exec(
    `tsup ${commands.join(
      " "
    )} --clean --minify --format cjs --outDir .riku/build/commands ${
      vars ? vars.join(" ") : ""
    }`
  );
  stdout?.once("end", () => {
    console.log();
    console.log(chalk.msg.riku(`Compilied commands successfully.`));
    next(e);
  });
}
