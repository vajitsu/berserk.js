import { exec } from "child_process";
import _events from "events";
import Chalk from "chalk";
import path from "path";
import fs from "fs";
import { chalk } from "../.";
import { UserConfig } from "index";

import dotenv from "dotenv";
dotenv.config();

function next(e: _events.EventEmitter) {
  e.emit("index");
}

export default function buildEvents(
  e: _events.EventEmitter,
  config: UserConfig
) {
  if (!fs.existsSync(path.join(process.cwd(), "events/"))) return next(e);

  var events = fs
    .readdirSync(path.join(process.cwd(), "events"))
    .filter((a) => a.endsWith(".js") || a.endsWith(".ts"));

  if (!events || events.length === 0) return next(e);

  events = events.map((a) => {
    const b = a.replace(process.cwd(), "");
    return `events/${b.slice(1)}`;
  });

  let vars;
  if (config && config.env && config.env.length > 0) {
    vars = config.env.map((v) => `--env.${v} ${process.env[v]}`);
  }

  const { stdout } = exec(
    `tsup ${events.join(
      " "
    )} --clean --minify --format cjs --outDir .riku/build/events ${
      vars ? vars.join(" ") : ""
    }}`
  );
  stdout?.once("end", () => {
    console.log();
    console.log(chalk.msg.riku(`Compilied events successfully.`));
    next(e);
  });
}
