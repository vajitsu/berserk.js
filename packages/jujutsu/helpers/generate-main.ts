import fs from "fs";
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
    }[];
    events: {
      key: string;
      value: `const ${string} = require(${string});`;
    }[];
  },
  outDir: string
) {
  const dir = path.join(cwd, ".jujutsu", outDir);

  var extra: string[] = [];

  if (entries.commands.length > 0) {
    const pre = entries.commands
      .map(
        (c) =>
          `${c.value}bot.slashCommandManager.registerCommand(new ${c.key}(bot));`
      )
      .join();
    extra.push(`${pre}bot.slashCommandManager.loadCommands();`);
  }

  if (entries.events.length > 0) {
    const pre = entries.events
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
