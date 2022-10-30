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
  if (fs.existsSync(path.join(process.cwd(), ".riku", "build"))) e.emit("done");
  else e.emit("done-nothing");
}

export default function buildIndex(e: events.EventEmitter, config: UserConfig) {
  var indexTs = fs.existsSync(path.join(process.cwd(), "index.ts"));
  var indexJs = fs.existsSync(path.join(process.cwd(), "index.js"));

  if (!indexJs && !indexTs) return next(e);

  let vars;
  if (config && config.env && config.env.length > 0) {
    vars = config.env.map((v) => `--env.${v} ${process.env[v]}`);
  }

  console.log(config);

  const { stdout } = exec(
    `tsup ${
      indexTs ? "index.ts" : "index.js"
    } --clean --minify --format cjs --outDir .riku/build ${
      vars ? vars.join(" ") : ""
    }`
  );
  stdout?.once("end", () => {
    console.log();
    console.log(
      chalk.msg.riku(
        `Compilied ${Chalk.cyan(
          indexTs ? "index.ts" : "index.js"
        )} successfully.`
      )
    );
    next(e);
  });
}
