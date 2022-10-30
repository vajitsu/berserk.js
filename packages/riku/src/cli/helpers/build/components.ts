import { exec } from "child_process";
import events from "events";
import Chalk from "chalk";
import path from "path";
import fs from "fs";
import { chalk } from "../.";
import { UserConfig } from "index";

import dotenv from "dotenv";
dotenv.config();

function next(e: events.EventEmitter) {
  e.emit("commands");
}

export default function buildComponents(
  e: events.EventEmitter,
  config: UserConfig
) {
  if (!fs.existsSync(path.join(process.cwd(), "components/"))) return next(e);

  var components = fs
    .readdirSync(path.join(process.cwd(), "components"))
    .filter((a) => a.endsWith(".js") || a.endsWith(".ts"));

  if (!components || components.length === 0) return next(e);

  components = components.map((a) => {
    const b = a.replace(process.cwd(), "");
    return `components/${b.slice(1)}`;
  });

  let vars;
  if (config && config.env && config.env.length > 0) {
    vars = config.env.map((v) => `--env.${v} ${process.env[v]}`);
  }

  const { stdout } = exec(
    `tsup ${components.join(
      " "
    )} --clean --minify --format cjs --outDir .riku/build/components ${
      vars ? vars.join(" ") : ""
    }}`
  );
  stdout?.once("end", () => {
    console.log();
    console.log(chalk.msg.riku(`Compilied components successfully.`));
    next(e);
  });
}
