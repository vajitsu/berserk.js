import { exec } from "child_process";
import events from "events";
import Chalk from "chalk";
import path from "path";
import fs from "fs";
import { chalk } from "../.";

function next(e: events.EventEmitter) {
  e.emit("removeTypescript");
}

export default function buildIndex(e: events.EventEmitter) {
  var indexTs = fs.existsSync(path.join(process.cwd(), "index.ts"));
  var indexJs = fs.existsSync(path.join(process.cwd(), "index.js"));

  if (!indexJs && !indexTs) return next(e);

  const { stdout } = exec(
    `tsup ${
      indexTs ? "index.js" : "index.js"
    } --clean --minify --format cjs --outDir .riku/build`
  );
  stdout?.once("end", () => {
    console.log();
    console.log(
      chalk.msg.riku(
        Chalk.blue(
          `Compilied ${Chalk.green(
            indexTs ? "index.js" : "index.js"
          )} successfully.`
        )
      )
    );
    next(e);
  });
}
