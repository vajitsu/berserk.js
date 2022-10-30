import { exec } from "child_process";
import events from "events";
import Chalk from "chalk";
import path from "path";
import fs from "fs";
import { chalk } from "../.";

function next(e: events.EventEmitter) {
  e.emit("events");
}

export default function buildCommands(e: events.EventEmitter) {
  var commands = fs
    .readdirSync(path.join(process.cwd(), "commands"))
    .filter((a) => a.endsWith(".js") || a.endsWith(".ts"));

  if (!commands || commands.length === 0) return next(e);

  commands = commands.map((a) => {
    const b = a.replace(process.cwd(), "");
    return `commands/${b.slice(1)}`;
  });

  const { stdout } = exec(
    `tsup ${commands.join(
      " "
    )} --clean --minify --format cjs --outDir .riku/build/commands`
  );
  stdout?.once("end", () => {
    console.log();
    console.log(chalk.msg.riku(Chalk.blue(`Compilied commands successfully.`)));
    next(e);
  });
}
