import Chalk from "chalk";
import { exec } from "child_process";
import { chalk } from "../helpers";

export default function start() {
  const { stdout, stderr } = exec(
    "cd .riku/build && nodemon index.js -q --exit-crash"
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

    console.log(`${Chalk.bgBlack.yellow("error - ")} ${name} ${message}`);
    console.log();
    console.log(
      `${Chalk.hidden("error - ")}${Chalk.yellow(
        "This may be an issue on your end."
      )}`
    );
    console.log();
    console.log(
      `${Chalk.hidden("error - ")}${Chalk.blue(
        "If you think its on our end: "
      )}\n${Chalk.hidden("error - ")}Create an issue on our github`
    );
    console.log(
      `${Chalk.hidden("error - ")}${Chalk.green(
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
  stdout?.on("data", (data) => {
    console.log(`${Chalk.bgBlack.cyan("event -")} ${data.toString()}`);
  });
  stdout?.on("error", (error) => {
    console.error(
      chalk.msg.error(`${Chalk.red(`${error.name}:`)} ${error.message}`)
    );
  });
}
