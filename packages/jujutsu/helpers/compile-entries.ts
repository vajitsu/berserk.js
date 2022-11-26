import fs from 'fs'
import json5 from 'json5'
import path from 'path'
import mkdirp from 'mkdirp'
import { transformCode, transformFileCode } from './swc'
import { camelCase } from 'lodash'

function slashCommandTemplate(
  name: string,
  executeKey: `${string}_execute_${string}`,
  dataKey: `${string}_data_${string}`
) {
  const random = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')
  const template = `const SlashCommand = require("jujutsu/builders/slash-command").default;
const ${executeKey} = require("./execute");
const ${dataKey} = require("./data");

class ${camelCase(name)}_${random} extends SlashCommand {
  data = ${dataKey}.default ? ${dataKey}.default.setName(${json5.stringify(
    name
  )}).toJSON() : ${dataKey}.setName(${json5.stringify(name)}).toJSON();
  run = ${executeKey}.default || ${executeKey};
}

module.exports = ${camelCase(name)}_${random};`

  return template
}

function eventTemplate(
  name: string,
  executeKey: `${string}_execute_${string}`
) {
  const random = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')
  const template = `const Event = require("jujutsu/builders/event");
const ${executeKey} = require("./execute");

class ${camelCase(name)}_${random} extends Event {
  constructor(instance) {
    super(instance, ${json5.stringify(name)});
  }

  run = ${executeKey}.default || ${executeKey};
}

module.exports = ${camelCase(name)}_${random};`

  return template
}

function buttonTemplate(
  name: string,
  executeKey: `${string}_execute_${string}`,
  dataKey: `${string}_data_${string}`
) {
  const random = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')
  const template = `const button_${random} = require("jujutsu/builders/interactive-button").default;
const ${executeKey}_${random} = require("./execute");
const ${dataKey}_${random} = require("./data");

${dataKey}_${random}.default ? ${dataKey}_${random}.default.custom_id = ${json5.stringify(
    name
  )} : ${dataKey}_${random}.custom_id = ${json5.stringify(name)}

class ${camelCase(name)}_${random} extends button_${random} {
  data = ${dataKey}_${random}.default ? ${dataKey}_${random}.default : ${dataKey}_${random};
  run = ${executeKey}_${random}.default || ${executeKey}_${random};
}

module.exports = ${camelCase(name)}_${random};`
  return template
}

function modalTemplate(
  name: string,
  executeKey: `${string}_execute_${string}`,
  dataKey: `${string}_data_${string}`
) {
  const random = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')
  const execK = `${executeKey}_${random}`
  const dataK = `$${datakey}_${random}`
  const template = `const modal_${random} = require("jujutsu/builders/modal").default
const ${execK} = require ("./execute)`
  return template
}

function contextMenuTemplate(
  name: string,
  executeKey: `${string}_execute_${string}`,
  dataKey: `${string}_data_${string}`
) {
  const random = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')
  const template = ``
  return template
}

function selectMenuTemplate(
  name: string,
  executeKey: `${string}_execute_${string}`,
  dataKey: `${string}_data_${string}`
) {
  const random = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')
  const template = `const selectMenu`
  return template
}

async function compileEntries(
  cwd: string,
  entries: {
    commands: {
      name: string
      data: string
      execute: string
    }[]
    buttons: {
      name: string
      data: string
      execute: string
    }[]
    context_menus: {
      name: string
      data: string
      execute: string
    }[]
    select_menus: {
      name: string
      data: string
      execute: string
    }[]
    modals: {
      name: string
      data: string
      execute: string
    }[]
    events: {
      name: string
      execute: string
    }[]
  },
  outDir: string
) {
  const commands: {
    key: string
    outDir: string
    value: `const ${string} = require(${string});`
    path: string
  }[] = []
  const events: {
    key: string
    outDir: string
    value: `const ${string} = require(${string});`
    path: string
  }[] = []
  const buttons: {
    key: string
    outDir: string
    value: `const ${string} = require(${string});`
    path: string
  }[] = []
  const modals: {
    key: string
    outDir: string
    value: `const ${string} = require(${string});`
    path: string
  }[] = []
  const context_menus: {
    key: string
    outDir: string
    value: `const ${string} = require(${string});`
    path: string
  }[] = []
  const select_menus: {
    key: string
    outDir: string
    value: `const ${string} = require(${string});`
    path: string
  }[] = []

  for (const command of entries.commands) {
    const camel = camelCase(command.name)
    const data_path = path.join(cwd, 'commands', command.name, command.data)
    const execute_path = path.join(
      cwd,
      'commands',
      command.name,
      command.execute
    )

    const transformed_data = transformFileCode(data_path).replace(
      'new(_discordJs()).default',
      'new(_discordJs())'
    )
    const transformed_execute = transformFileCode(execute_path).replace(
      'new(_discordJs()).default',
      'new(_discordJs())'
    )

    const new_data_path = path.join(
      cwd,
      '.jujutsu',
      outDir,
      'commands',
      command.name,
      'data.js'
    )

    const new_execute_path = path.join(
      cwd,
      '.jujutsu',
      outDir,
      'commands',
      command.name,
      'execute.js'
    )

    const new_path = path.join(
      cwd,
      '.jujutsu',
      outDir,
      'commands',
      command.name,
      'index.js'
    )

    mkdirp.sync(path.dirname(new_data_path))
    fs.writeFileSync(new_data_path, transformed_data, 'utf8')
    fs.writeFileSync(new_execute_path, transformed_execute, 'utf8')

    const randomData = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')
    const randomExec = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')

    const code = slashCommandTemplate(
      command.name,
      `${camel}_execute_${randomExec}`,
      `${camel}_data_${randomData}`
    )

    mkdirp.sync(path.dirname(new_path))
    fs.writeFileSync(new_path, transformCode(code), 'utf8')

    const _ = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')

    commands.push({
      key: `${camel}_${_}`,
      outDir: command.name,
      value: `const ${camel}_${_} = require("./commands/${command.name}/index");`,
      path: new_path,
    })
  }

  for (const event of entries.events) {
    const camel = camelCase(event.name)
    const execute_path = path.join(cwd, 'events', event.execute)

    const transformed_execute = transformFileCode(execute_path).replace(
      'new(_discordJs()).default',
      'new(_discordJs())'
    )

    const new_execute_path = path.join(
      cwd,
      '.jujutsu',
      outDir,
      'events',
      event.name,
      'execute.js'
    )

    const new_path = path.join(
      cwd,
      '.jujutsu',
      outDir,
      'events',
      event.name,
      'index.js'
    )

    mkdirp.sync(path.dirname(new_execute_path))
    fs.writeFileSync(new_execute_path, transformed_execute, 'utf8')

    const randomExec = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')

    const code = eventTemplate(event.name, `${camel}_execute_${randomExec}`)

    mkdirp.sync(path.dirname(new_path))
    fs.writeFileSync(new_path, transformCode(code), 'utf8')

    const _ = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')

    events.push({
      key: `${camel}_${_}`,
      outDir: event.name,
      value: `const ${camel}_${_} = require("./events/${event.name}/index");`,
      path: new_path,
    })
  }

  for (const button of entries.buttons) {
    const data_path = path.join(
      cwd,
      'interactions',
      'buttons',
      button.name,
      button.data
    )
    const execute_path = path.join(
      cwd,
      'interactions',
      'buttons',
      button.name,
      button.execute
    )

    const transformed_data = transformFileCode(data_path).replace(
      'new(_discordJs()).default',
      'new(_discordJs())'
    )
    const transformed_execute = transformFileCode(execute_path).replace(
      'new(_discordJs()).default',
      'new(_discordJs())'
    )

    const camel = camelCase(button.name)

    const new_data_path = path.join(
      cwd,
      '.jujutsu',
      outDir,
      'interactions',
      'buttons',
      button.name,
      'data.js'
    )

    const new_execute_path = path.join(
      cwd,
      '.jujutsu',
      outDir,
      'interactions',
      'buttons',
      button.name,
      'execute.js'
    )

    const new_path = path.join(
      cwd,
      '.jujutsu',
      outDir,
      'interactions',
      'buttons',
      button.name,
      'index.js'
    )

    mkdirp.sync(path.dirname(new_data_path))
    fs.writeFileSync(new_data_path, transformed_data, 'utf8')
    fs.writeFileSync(new_execute_path, transformed_execute, 'utf8')

    const randomData = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')
    const randomExec = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')

    const code = buttonTemplate(
      button.name,
      `${camel}_execute_${randomExec}`,
      `${camel}_data_${randomData}`
    )

    mkdirp.sync(path.dirname(new_path))
    fs.writeFileSync(new_path, transformCode(code), 'utf8')

    const _ = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')

    buttons.push({
      key: `${camel}_${_}`,
      outDir: button.name,
      value: `const ${camel}_${_} = require("./interactions/buttons/${button.name}/index");`,
      path: new_path,
    })
  }

  for (const modal of entries.modals) {
    const data_path = path.join(
      cwd,
      'interactions',
      'buttons',
      modal.name,
      modal.data
    )
    const execute_path = path.join(
      cwd,
      'interactions',
      'buttons',
      modal.name,
      modal.execute
    )

    const transformed_data = transformFileCode(data_path).replace(
      'new(_discordJs()).default',
      'new(_discordJs())'
    )
    const transformed_execute = transformFileCode(execute_path).replace(
      'new(_discordJs()).default',
      'new(_discordJs())'
    )

    const camel = camelCase(modal.name)

    const new_data_path = path.join(
      cwd,
      '.jujutsu',
      outDir,
      'interactions',
      'modals',
      modal.name,
      'data.js'
    )

    const new_execute_path = path.join(
      cwd,
      '.jujutsu',
      outDir,
      'interactions',
      'modals',
      modal.name,
      'execute.js'
    )

    const new_path = path.join(
      cwd,
      '.jujutsu',
      outDir,
      'interactions',
      'modals',
      modal.name,
      'index.js'
    )

    mkdirp.sync(path.dirname(new_data_path))
    fs.writeFileSync(new_data_path, transformed_data, 'utf8')
    fs.writeFileSync(new_execute_path, transformed_execute, 'utf8')

    const randomData = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')
    const randomExec = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')

    const code = modalTemplate(
      modal.name,
      `${camel}_execute_${randomExec}`,
      `${camel}_data_${randomData}`
    )

    mkdirp.sync(path.dirname(new_path))
    fs.writeFileSync(new_path, transformCode(code), 'utf8')

    const _ = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')

    modals.push({
      key: `${camel}_${_}`,
      outDir: modal.name,
      value: `const ${camel}_${_} = require("./interactions/modals/${modal.name}/index");`,
      path: new_path,
    })
  }

  for (const menu of entries.context_menus) {
    const data_path = path.join(
      cwd,
      'interactions',
      'context-menus',
      menu.name,
      menu.data
    )
    const execute_path = path.join(
      cwd,
      'interactions',
      'context-menus',
      menu.name,
      menu.execute
    )

    const transformed_data = transformFileCode(data_path).replace(
      'new(_discordJs()).default',
      'new(_discordJs())'
    )
    const transformed_execute = transformFileCode(execute_path).replace(
      'new(_discordJs()).default',
      'new(_discordJs())'
    )

    const camel = camelCase(menu.name)

    const new_data_path = path.join(
      cwd,
      '.jujutsu',
      outDir,
      'interactions',
      'context-menus',
      menu.name,
      'data.js'
    )

    const new_execute_path = path.join(
      cwd,
      '.jujutsu',
      outDir,
      'interactions',
      'context-menus',
      menu.name,
      'execute.js'
    )

    const new_path = path.join(
      cwd,
      '.jujutsu',
      outDir,
      'interactions',
      'context-menus',
      menu.name,
      'index.js'
    )

    mkdirp.sync(path.dirname(new_data_path))
    fs.writeFileSync(new_data_path, transformed_data, 'utf8')
    fs.writeFileSync(new_execute_path, transformed_execute, 'utf8')

    const randomData = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')
    const randomExec = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')

    const code = contextMenuTemplate(
      menu.name,
      `${camel}_execute_${randomExec}`,
      `${camel}_data_${randomData}`
    )

    mkdirp.sync(path.dirname(new_path))
    fs.writeFileSync(new_path, transformCode(code), 'utf8')

    const _ = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')

    context_menus.push({
      key: `${camel}_${_}`,
      outDir: menu.name,
      value: `const ${camel}_${_} = require("./interactions/context-menus/${menu.name}/index");`,
      path: new_path,
    })
  }

  for (const menu of entries.select_menus) {
    const data_path = path.join(
      cwd,
      'interactions',
      'select-menus',
      menu.name,
      menu.data
    )
    const execute_path = path.join(
      cwd,
      'interactions',
      'select-menus',
      menu.name,
      menu.execute
    )

    const transformed_data = transformFileCode(data_path).replace(
      'new(_discordJs()).default',
      'new(_discordJs())'
    )
    const transformed_execute = transformFileCode(execute_path).replace(
      'new(_discordJs()).default',
      'new(_discordJs())'
    )

    const camel = camelCase(menu.name)

    const new_data_path = path.join(
      cwd,
      '.jujutsu',
      outDir,
      'interactions',
      'select-menus',
      menu.name,
      'data.js'
    )

    const new_execute_path = path.join(
      cwd,
      '.jujutsu',
      outDir,
      'interactions',
      'select-menus',
      menu.name,
      'execute.js'
    )

    const new_path = path.join(
      cwd,
      '.jujutsu',
      outDir,
      'interactions',
      'select-menus',
      menu.name,
      'index.js'
    )

    mkdirp.sync(path.dirname(new_data_path))
    fs.writeFileSync(new_data_path, transformed_data, 'utf8')
    fs.writeFileSync(new_execute_path, transformed_execute, 'utf8')

    const randomData = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')
    const randomExec = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')

    const code = selectMenuTemplate(
      menu.name,
      `${camel}_execute_${randomExec}`,
      `${camel}_data_${randomData}`
    )

    mkdirp.sync(path.dirname(new_path))
    fs.writeFileSync(new_path, transformCode(code), 'utf8')

    const _ = Math.random().toString(36).slice(2).replace(/[0-9]/g, '')

    select_menus.push({
      key: `${camel}_${_}`,
      outDir: menu.name,
      value: `const ${camel}_${_} = require("./interactions/select-menus/${menu.name}/index");`,
      path: new_path,
    })
  }

  return {
    commands,
    events,
    buttons,
    modals,
    context_menus,
    select_menus,
  }
}

export default compileEntries
