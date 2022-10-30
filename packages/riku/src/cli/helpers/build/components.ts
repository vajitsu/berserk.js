import { exec } from "child_process";
import events from "events";
import Chalk from "chalk";
import path from "path";
import fs from "fs";
import { chalk } from "../.";

function next(e: events.EventEmitter) {
  e.emit("commands");
}

export default function buildComponents(e: events.EventEmitter) {
  var components = fs
    .readdirSync(path.join(process.cwd(), "components"))
    .filter((a) => a.endsWith(".js") || a.endsWith(".ts"));

  if (!components || components.length === 0) return next(e);

  components = components.map((a) => {
    const b = a.replace(process.cwd(), "");
    return `components/${b.slice(1)}`;
  });

  const { stdout } = exec(
    `tsup ${components.join(
      " "
    )} --clean --minify --format cjs --outDir .riku/build/components`
  );
  stdout?.once("end", () => {
    console.log();
    console.log(
      chalk.msg.riku(Chalk.blue(`Compilied components successfully.`))
    );
    next(e);
  });
}
