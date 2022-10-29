import { exec } from "child_process";
import { chalk } from ".";

export default async function compileDev() {
  try {
    const { stdout } = await exec(
      "tsup ./index.ts --outDir .riku --clean --minify --watch --sourcemap --format cjs"
    );
    var first = 0;
    process.stdout.write(
      `${chalk.msg.compiler(
        chalk.colors.yellow("Watching for changes in your code...")
      )}\n\n`
    );
    stdout?.on("data", (data) => {
      if (!data.toString().includes("Build success")) return;
      process.stdout.write(
        `${chalk.msg.compiler(`Compilied ${first !== 0 ? "new" : ""}
          `)}code successfully.\n\n`
      );
      first++;
    });
  } catch (error) {
    process.stdout.clearLine(0);
    console.log(chalk.colors.red(error));
  }
}
