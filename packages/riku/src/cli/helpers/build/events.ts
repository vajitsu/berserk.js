import { exec } from "child_process";
import events from "events";
import Chalk from "chalk";
import path from "path";
import fs from "fs";
import { chalk } from "../.";

function next(e: events.EventEmitter) {
  e.emit("index");
}

export default function buildEvents(e: events.EventEmitter) {
  var events = fs
    .readdirSync(path.join(process.cwd(), "events"))
    .filter((a) => a.endsWith(".js") || a.endsWith(".ts"));

  if (!events || events.length === 0) return next(e);

  events = events.map((a) => {
    const b = a.replace(process.cwd(), "");
    return `events/${b.slice(1)}`;
  });

  const { stdout } = exec(
    `tsup ${events.join(
      " "
    )} --clean --minify --format cjs --outDir .riku/build/events`
  );
  stdout?.once("end", () => {
    console.log();
    console.log(chalk.msg.riku(Chalk.blue(`Compilied events successfully.`)));
    next(e);
  });
}
