import { exec } from "child_process";
import { chalk } from ".";
import getFilesSync from "./get-file-sync";

export default async function compileDev() {
  try {
    let files = getFilesSync(process.cwd(), ["node_modules", ".riku"]).filter(
      (t) => t.endsWith(".ts")
    );

    files = files.map((a) => {
      const b = a.replace(process.cwd(), "");
      return b.slice(1);
    });

    const { stdout } = await exec(
      `tsup ${files.join(
        " "
      )} --outDir .riku/build --clean --minify --format cjs --sourcemap`
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
        `${chalk.msg.compiler(
          chalk.colors.green(`Compilied${first !== 0 ? " updated" : ""}`)
        )} code successfully.\n\n`
      );
      first++;
    });
  } catch (error) {
    process.stdout.clearLine(0);
    console.log(chalk.colors.red(error));
  }
}
