import Chalk from "chalk";
import events from "events";
import { exec } from "child_process";
import { chalk } from ".";

export default function start() {
  const e = new events.EventEmitter();
  const { stdout, stderr } = exec(
    "cd .riku/build && nodemon index.js -q --exitcrash"
  );
  console.log(
    chalk.msg.riku(
      Chalk.green(
        `Node (${process.version}) instance has been started successfully!`
      )
    )
  );
  console.log();
  stderr?.on("data", (data) => {
    e.emit("start");
    console.log(`${Chalk.bgBlack.cyan(" CONSOLE ")} ${data.toString()}`);
  });
  stderr?.on("error", (error) => {
    console.error(
      chalk.msg.error(`${Chalk.red(`${error.name}:`)} ${error.message}`)
    );
  });
  stdout?.on("data", (data) => {
    console.log(`${Chalk.bgBlack.cyan(" CONSOLE ")} ${data.toString()}`);
  });
  stdout?.on("error", (error) => {
    console.error(
      chalk.msg.error(`${Chalk.red(`${error.name}:`)} ${error.message}`)
    );
  });
  stdout?.on("end", () => {
    console.log(
      chalk.msg.ended(`Node (${process.version}) instance has stopped running.`)
    );
  });
}
