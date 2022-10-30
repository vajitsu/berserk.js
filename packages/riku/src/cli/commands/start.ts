import Chalk from "chalk";
import { exec } from "child_process";
import { chalk } from "../helpers";

export default function start() {
  const { stdout, stderr } = exec(
    "cd .riku/build && nodemon index.js -q --exit-crash"
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
    let err = /Error\s\[.*\].*/g.exec(
      data.toString()
    ) as RegExpExecArray | null;
    if (!err) return;
    let name = (/\[.*\]/g.exec(err[0]) as RegExpExecArray)[0]
      .replace(/\[|\]/g, "")
      .trim();
    name = Chalk.red(`${name}:`);
    let message = (/:\s.*/g.exec(err[0]) as RegExpExecArray)[0]
      .replace(": ", "")
      .trim();

    console.log(
      `${Chalk.bgBlack.cyan(" CONSOLE ")} ${Chalk.bgBlack.yellow(
        " ERROR "
      )} ${name} ${message}`
    );
    console.log();
    console.log(
      `${Chalk.hidden(" CONSOLE  ERROR   ")}${Chalk.yellow(
        "This may be an issue on your end."
      )}`
    );
    console.log();
    console.log(
      `${Chalk.hidden(" CONSOLE  ERROR   ")}${Chalk.blue(
        "If you think its on our end: "
      )}\n${Chalk.hidden(" CONSOLE  ERROR   ")}Create an issue on our github`
    );
    console.log(
      `${Chalk.hidden(" CONSOLE  ERROR   ")}${Chalk.green(
        `https://github.com/vajitsu/riku/issues`
      )}`
    );
    process.exit();
  });
  stderr?.on("error", (error) => {
    console.error(
      chalk.msg.error(`${Chalk.red(`${error.name}:`)} ${error.message}`)
    );
  });
  stderr?.on("end", () => {
    console.log(
      chalk.msg.ended(`Node (${process.version}) instance has stopped running.`)
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
