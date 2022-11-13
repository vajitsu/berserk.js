import fs from "fs-extra";
import json5 from "json5";
import path from "path";
import { transformCode } from "./swc";

export default function generateMain(
  cwd: string,
  config: any,
  entries: {
    commands: {
      key: string;
      value: `const ${string} = require(${string});`;
      path: string;
    }[];
    events: {
      key: string;
      value: `const ${string} = require(${string});`;
      path: string;
    }[];
  },
  outDir: string
) {
  const dir = path.join(cwd, ".jujutsu", outDir);

  var extra: string[] = [];

  if (entries.commands.length > 0) {
    const OF = entries.commands.filter((c) => {
      const exec = require(path.join(
        cwd,
        ".jujutsu",
        outDir,
        "commands",
        c.key.split(/_/g)[0],
        "execute.js"
      ));
      const data = require(path.join(
        cwd,
        ".jujutsu",
        outDir,
        "commands",
        c.key.split(/_/g)[0],
        "data.js"
      ));
      return (
        Object.values(exec).length === 0 || Object.values(data).length === 0
      );
    });

    for (let _ of OF) {
      if (_)
        fs.rm(path.dirname(_.path), {
          recursive: true,
        });
    }

    const filtered = entries.commands.filter((c) => {
      const exec = require(path.join(
        cwd,
        ".jujutsu",
        outDir,
        "commands",
        c.key.split(/_/g)[0],
        "execute.js"
      ));
      const data = require(path.join(
        cwd,
        ".jujutsu",
        outDir,
        "commands",
        c.key.split(/_/g)[0],
        "data.js"
      ));
      return Object.values(exec).length > 0 || Object.values(data).length > 0;
    });

    const pre = filtered
      .map(
        (c) =>
          `${c.value}bot.slashCommandManager.registerCommand(new ${c.key}(bot));`
      )
      .join();
    extra.push(`${pre}bot.slashCommandManager.loadCommands();`);
  }

  if (entries.events.length > 0) {
    const OF = entries.events.filter((c) => {
      const exec = require(path.join(
        cwd,
        ".jujutsu",
        outDir,
        "events",
        c.key.split(/_/g)[0],
        "execute.js"
      ));
      return Object.values(exec).length === 0;
    });

    for (let _ of OF) {
      if (_)
        fs.rm(path.dirname(_.path), {
          recursive: true,
        });
    }

    const filtered = entries.events.filter((c) => {
      const exec = require(path.join(
        cwd,
        ".jujutsu",
        outDir,
        "events",
        c.key.split(/_/g)[0],
        "execute.js"
      ));
      return Object.values(exec).length > 0;
    });
    const pre = filtered
      .map(
        (c) => `${c.value}bot.eventManager.registerEvent(new ${c.key}(bot));`
      )
      .join();
    extra.push(pre);
  }

  const code = `const Jujutsu = require("jujutsu");
const bot = new Jujutsu.Bot(${json5.stringify(config.discord)});
${extra.join("\n")}
module.exports = bot;`;

  fs.writeFileSync(
    path.join(dir.toString(), "index.js"),
    transformCode(code),
    "utf8"
  );
}
