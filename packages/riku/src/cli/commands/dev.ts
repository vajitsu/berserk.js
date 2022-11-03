import { exec } from "child_process";
import { colors, msg } from "../helpers/chalk";

export default async function dev() {
  try {
    const { stdout } = exec(
      "ts-node-dev --watch --respawn --transpile-only --ignore-watch .gitignore -- index.ts"
    );

    var first = 0;
    stdout?.on("data", (data) => {
      if (!data) return;
      if (first === 0) {
        process.stdout.write(
          `${msg.riku(colors.green("Development node has started!"))}\n\n`
        );
        first++;
      }
      if (data.toString().includes("ts-node-dev ver")) return;
      else if (data.toString().includes("Restarting")) {
        const str = data.toString();
        const fileRegex = /^(.+)\\([^\\]+)$/gim;
        const filePath = (fileRegex.exec(str) as any)[0];
        if (filePath) {
          const folders = filePath.split("\\");
          const file = folders[folders.length - 1];
          console.log(`\n${msg.restart(colors.red(file))}`);
        } else {
          console.log(`\n${msg.restart(str.split("Restarting: ")[1])}`);
        }
      } else if (data.toString().includes("[ERROR]")) {
        var str = data.toString().replace(/\[ERROR\]\s\d\d:\d\d:\d\d\s/gim, "");

        var message = (/:.*/gim.exec(str) as string[])[0].replace(": ", "");

        console.log(msg.error(`${message}`));
      } else console.log(msg.dev(data.toString()));
    });
    stdout?.on("error", (err) => {
      if (!err) return;
      console.log(`${msg.error(err.toString())}`);
    });
    stdout?.on("pause", () => {
      console.log(`${msg.paused("Development node has been paused.")}`);
      console.log();
    });
    stdout?.on("resume", () => {
      if (first === 0) return;
      console.log(`${msg.resumed("Development node has been resumed.")}`);
      console.log();
    });
    stdout?.on("end", () => {
      console.log(`${msg.ended("Development node has ended.")}`);
      console.log();
    });
  } catch (error) {
    console.log(`\n${msg.error(colors.red(error))}`);
  }
}
