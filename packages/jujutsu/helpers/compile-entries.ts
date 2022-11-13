import fs from "fs";
import json5 from "json5";
import path from "path";
import mkdirp from "mkdirp";
import { transformCode, transformFileCode } from "./swc";

function slashCommandTemplate(
  name: string,
  executeKey: `${string}_execute_${string}`,
  dataKey: `${string}_data_${string}`
) {
  const random = Math.random().toString(36).slice(2).replace(/[0-9]/g, "");
  const template = `const SlashCommand = require("jujutsu/builders/slash-command");
const ${executeKey} = require("./execute");
const ${dataKey} = require("./data");

class ${name}_${random} extends SlashCommand {
  data = ${dataKey}.default ? ${dataKey}.default.setName(${json5.stringify(
    name
  )}).toJSON() : ${dataKey}.setName(${json5.stringify(name)}).toJSON();
  run = ${executeKey}.default || ${executeKey};
}

module.exports = ${name}_${random};`;

  return transformCode(template);
}

function eventTemplate(
  name: string,
  executeKey: `${string}_execute_${string}`
) {
  const random = Math.random().toString(36).slice(2).replace(/[0-9]/g, "");
  const template = `const Event = require("jujutsu/builders/event");
const ${executeKey} = require("./execute");

class ${name}_${random} extends Event {
  constructor(instance) {
    super(instance, ${json5.stringify(name)});
  }

  run = ${executeKey}.default || ${executeKey};
}

module.exports = ${name}_${random};`;

  return transformCode(template);
}

async function compileEntries(
  cwd: string,
  entries: {
    commands: {
      name: string;
      data: string;
      execute: string;
    }[];
    events: {
      name: string;
      execute: string;
    }[];
  },
  outDir: string
) {
  const commands: {
    key: string;
    value: `const ${string} = require(${string});`;
  }[] = [];
  const events: {
    key: string;
    value: `const ${string} = require(${string});`;
  }[] = [];

  for (const command of entries.commands) {
    const data_path = path.join(cwd, "commands", command.name, command.data);
    const execute_path = path.join(
      cwd,
      "commands",
      command.name,
      command.execute
    );

    const transformed_data = transformFileCode(data_path);
    const transformed_execute = transformFileCode(execute_path);

    const new_data_path = path.join(
      cwd,
      ".jujutsu",
      outDir,
      "commands",
      command.name,
      "data.js"
    );

    const new_execute_path = path.join(
      cwd,
      ".jujutsu",
      outDir,
      "commands",
      command.name,
      "execute.js"
    );

    const new_path = path.join(
      cwd,
      ".jujutsu",
      outDir,
      "commands",
      command.name,
      "index.js"
    );

    mkdirp.sync(path.dirname(new_data_path));
    fs.writeFileSync(new_data_path, transformed_data, "utf8");
    fs.writeFileSync(new_execute_path, transformed_execute, "utf8");

    const randomData = Math.random()
      .toString(36)
      .slice(2)
      .replace(/[0-9]/g, "");
    const randomExec = Math.random()
      .toString(36)
      .slice(2)
      .replace(/[0-9]/g, "");

    const code = slashCommandTemplate(
      command.name,
      `${command.name}_execute_${randomExec}`,
      `${command.name}_data_${randomData}`
    );

    mkdirp.sync(path.dirname(new_path));
    fs.writeFileSync(new_path, code, "utf8");

    const _ = Math.random().toString(36).slice(2).replace(/[0-9]/g, "");

    commands.push({
      key: `${command.name}_${_}`,
      value: `const ${command.name}_${_} = require("./commands/${command.name}/index");`,
    });
  }

  for (const event of entries.events) {
    const execute_path = path.join(cwd, "events", event.execute);

    const transformed_execute = transformFileCode(execute_path);

    const new_execute_path = path.join(
      cwd,
      ".jujutsu",
      outDir,
      "events",
      event.name,
      "execute.js"
    );

    const new_path = path.join(
      cwd,
      ".jujutsu",
      outDir,
      "events",
      event.name,
      "index.js"
    );

    mkdirp.sync(path.dirname(new_execute_path));
    fs.writeFileSync(new_execute_path, transformed_execute, "utf8");

    const randomExec = Math.random()
      .toString(36)
      .slice(2)
      .replace(/[0-9]/g, "");

    const code = eventTemplate(
      event.name,
      `${event.name}_execute_${randomExec}`
    );

    mkdirp.sync(path.dirname(new_path));
    fs.writeFileSync(new_path, code, "utf8");

    const _ = Math.random().toString(36).slice(2).replace(/[0-9]/g, "");

    events.push({
      key: `${event.name}_${_}`,
      value: `const ${event.name}_${_} = require("./events/${event.name}/index");`,
    });
  }

  return {
    commands,
    events,
  };
}

export default compileEntries;
