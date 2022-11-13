import fs from "fs";
import json5 from "json5";
import path from "path";
import mkdirp from "mkdirp";
import { transformFileCode } from "./swc";
import { camelCase } from "lodash";

function slashCommandTemplate(
  name: string,
  executeKey: `${string}_execute_${string}`,
  dataKey: `${string}_data_${string}`
) {
  const random = Math.random().toString(36).slice(2).replace(/[0-9]/g, "");
  const template = `const SlashCommand = require("jujutsu/builders/slash-command").default;
const ${executeKey} = require("./execute");
const ${dataKey} = require("./data");

class ${camelCase(name)}_${random} extends SlashCommand {
  data = ${dataKey}.default ? ${dataKey}.default.setName(${json5.stringify(
    name
  )}).toJSON() : ${dataKey}.setName(${json5.stringify(name)}).toJSON();
  run = ${executeKey}.default || ${executeKey};
}

module.exports = ${camelCase(name)}_${random};`;

  return template;
}

function eventTemplate(
  name: string,
  executeKey: `${string}_execute_${string}`
) {
  const random = Math.random().toString(36).slice(2).replace(/[0-9]/g, "");
  const template = `const Event = require("jujutsu/builders/event");
const ${executeKey} = require("./execute");

class ${camelCase(name)}_${random} extends Event {
  constructor(instance) {
    super(instance, ${json5.stringify(name)});
  }

  run = ${executeKey}.default || ${executeKey};
}

module.exports = ${camelCase(name)}_${random};`;

  return template;
}

function buttonTemplate(
  name: string,
  executeKey: `${string}_execute_${string}`,
  dataKey: `${string}_data_${string}`
) {
  const random = Math.random().toString(36).slice(2).replace(/[0-9]/g, "");
  const template = `const InteractiveButton = require("jujutsu/builders/interactive-button").default;
const ${executeKey} = require("./execute");
const ${dataKey} = require("./data");

${dataKey}.default ? ${dataKey}.default.custom_id = ${json5.stringify(
    name
  )} : ${dataKey}.custom_id = ${json5.stringify(name)}

class ${camelCase(name)}_${random} extends InteractiveButton {
  data = ${dataKey}.default ? ${dataKey}.default : ${dataKey};
  run = ${executeKey}.default || ${executeKey};
}

module.exports = ${camelCase(name)}_${random};`;
  return template;
}

async function compileEntries(
  cwd: string,
  entries: {
    commands: {
      name: string;
      data: string;
      execute: string;
    }[];
    buttons: {
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
    outDir: string;
    value: `const ${string} = require(${string});`;
    path: string;
  }[] = [];
  const events: {
    key: string;
    outDir: string;
    value: `const ${string} = require(${string});`;
    path: string;
  }[] = [];
  const buttons: {
    key: string;
    outDir: string;
    value: `const ${string} = require(${string});`;
    path: string;
  }[] = [];

  for (const command of entries.commands) {
    const camel = camelCase(command.name);
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
      `${camel}_execute_${randomExec}`,
      `${camel}_data_${randomData}`
    );

    mkdirp.sync(path.dirname(new_path));
    fs.writeFileSync(new_path, code, "utf8");

    const _ = Math.random().toString(36).slice(2).replace(/[0-9]/g, "");

    commands.push({
      key: `${camel}_${_}`,
      outDir: command.name,
      value: `const ${camel}_${_} = require("./commands/${command.name}/index");`,
      path: new_path,
    });
  }

  for (const event of entries.events) {
    const camel = camelCase(event.name);
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

    const code = eventTemplate(event.name, `${camel}_execute_${randomExec}`);

    mkdirp.sync(path.dirname(new_path));
    fs.writeFileSync(new_path, code, "utf8");

    const _ = Math.random().toString(36).slice(2).replace(/[0-9]/g, "");

    events.push({
      key: `${camel}_${_}`,
      outDir: event.name,
      value: `const ${camel}_${_} = require("./events/${event.name}/index");`,
      path: new_path,
    });
  }

  for (const button of entries.buttons) {
    const data_path = path.join(cwd, "buttons", button.name, button.data);
    const execute_path = path.join(cwd, "buttons", button.name, button.execute);

    const transformed_data = transformFileCode(data_path);
    const transformed_execute = transformFileCode(execute_path);

    const camel = camelCase(button.name);

    const new_data_path = path.join(
      cwd,
      ".jujutsu",
      outDir,
      "buttons",
      button.name,
      "data.js"
    );

    const new_execute_path = path.join(
      cwd,
      ".jujutsu",
      outDir,
      "buttons",
      button.name,
      "execute.js"
    );

    const new_path = path.join(
      cwd,
      ".jujutsu",
      outDir,
      "buttons",
      button.name,
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

    const code = buttonTemplate(
      button.name,
      `${camel}_execute_${randomExec}`,
      `${camel}_data_${randomData}`
    );

    mkdirp.sync(path.dirname(new_path));
    fs.writeFileSync(new_path, code, "utf8");

    const _ = Math.random().toString(36).slice(2).replace(/[0-9]/g, "");

    buttons.push({
      key: `${camel}_${_}`,
      outDir: button.name,
      value: `const ${camel}_${_} = require("./buttons/${button.name}/index");`,
      path: new_path,
    });
  }

  return {
    commands,
    events,
    buttons,
  };
}

export default compileEntries;
