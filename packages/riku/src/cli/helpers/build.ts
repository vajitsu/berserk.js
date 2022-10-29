import { exec } from "child_process";
import * as fs from "fs";
import events from "events";
import { chalk } from ".";

function getFilesSync(fPath: any, ignore: any, response: string[] = []) {
  if (!response) {
    response = [];
  }
  if (!ignore) {
    ignore = [];
  }

  var files = fs.readdirSync(fPath);
  for (var i = 0; i < files.length; i++) {
    if (fs.statSync(fPath + "/" + files[i]).isDirectory()) {
      var ign = false;
      for (var j = 0; j < ignore.length; j++) {
        if (ignore[j] == files[i]) {
          ign = true;
          break;
        }
      }
      if (!ign) {
        response.concat(getFilesSync(fPath + "/" + files[i], ignore, response));
      }
    } else {
      response.push(fPath + "/" + files[i]);
    }
  }
  return response;
}
function emptyBuildDir(Events: events.EventEmitter) {
  const { stdout } = exec("rm -rf .riku/build && mkdir -p .riku/build");
  stdout?.once("end", () => {
    console.log();
    console.log(chalk.msg.riku(chalk.colors.blue(`Emptied build directory.`)));
    Events.emit("emptied");
  });
}
function tsup(Events: events.EventEmitter) {
  let files = getFilesSync(process.cwd(), ["node_modules", ".riku"]).filter(
    (t) => t.endsWith(".ts")
  );

  files = files.map((a) => {
    const b = a.replace(process.cwd(), "");
    return b.slice(1);
  });

  const { stdout } = exec(
    `tsup ${files.join(
      " "
    )} --outDir .riku/build --clean --minify --format cjs --sourcemap`
  );
  stdout?.once("end", () => {
    console.log();
    console.log(
      chalk.msg.riku(chalk.colors.blue(`Compilied files successfully.`))
    );
    Events.emit("compilied");
  });
}
function removeTypescriptFromBuildDir(Events: events.EventEmitter) {
  const { stdout } = exec(
    "rm -r .riku/build/*.ts && rm -r .riku/build/**/*.ts"
  );
  stdout?.once("end", () => {
    console.log();
    console.log(
      chalk.msg.riku(chalk.colors.yellow(`Removed unnecessary typescript.`))
    );
    Events.emit("done");
  });
}

export default async function build() {
  const Events = new events.EventEmitter();
  Events.once("done", () => {
    console.log();
    console.log(
      chalk.msg.riku(chalk.colors.green("Successfully compilied your project!"))
    );
  });
  Events.once("emptied", () => {
    tsup(Events);
  });
  Events.once("compilied", () => removeTypescriptFromBuildDir(Events));
  emptyBuildDir(Events);
}
