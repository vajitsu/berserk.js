import { info, ready, warn } from '../../build/output/log'
import bot from '../../discord/bot'
import { DevServerOptions } from './options'
import { EventEmitter } from 'jujutsu/dist/compiled/ws'
import { DiscordConfig } from '../config-shared'
import { Client } from 'jujutsu/dist/compiled/discord.js'
import { recursiveReadDirSync } from './recursive-readdir-sync'
import { join, relative } from 'path'
import fs from 'fs-extra'
import { interopForCommand, interopForEvent } from '../../build'
import { JujutsuDevServer } from '../jujutsu'

function identifyBundle(path: string, dir: string) {
  const command_buf = Buffer.from(`"use command"`)
  const event_buf = Buffer.from(`"use event"`)
  const data = fs.readFileSync(join(dir, path))

  const command = data.includes(command_buf)
  const event = data.includes(event_buf)

  if (event) return 'event'
  else if (command) return 'command'
  else return 'unknown'
}

export type JujutsuServerOptions = Partial<DevServerOptions> | DevServerOptions

export default async function startServer(options: JujutsuServerOptions) {
  const events = new EventEmitter()

  events.once('ready', (client: Client) => {
    ready(`Bot is ready at ${client.user?.tag}`)
  })

  const instance = new bot(
    {
      ...(options.conf?.discord as DiscordConfig),
      quiet: options.quiet !== undefined ? options.quiet : false,
    },
    events
  )

  const distDir = join(
    options.dir || process.cwd(),
    options.conf?.distDir || '.jujutsu'
  )

  const buildDir = join(distDir, options.isJujutsuDevCommand ? 'dev' : 'build')

  const files = recursiveReadDirSync(join(distDir, buildDir)).map((f) => ({
    type: identifyBundle(f, join(distDir, buildDir)),
    absolute: join(join(distDir, buildDir, f)),
  }))

  const event_files = files
    .filter((_) => _.type === 'event')
    .map((f) => ({
      mod: require(relative(__dirname, f.absolute)),
      absolute: f.absolute,
    }))
    .map((f) => ({
      name: f.mod.__name,
      ...interopForEvent(f.mod),
      absolutePath: f.absolute,
    }))

  const command_files = files
    .filter((_) => _.type === 'command')
    .map((f) => ({
      mod: require(relative(__dirname, f.absolute)),
      absolute: f.absolute,
    }))
    .map((f) => ({
      name: f.mod.__name,
      ...interopForCommand(f.mod),
      absolutePath: f.absolute,
    }))

  for (let _ of command_files) instance.slashCommandManager.addCommand(_)
  for (let _ of event_files) instance.eventManager.registerEvent(_)

  if (!options.quiet) instance.hookServerEvents()

  if (options.dev || options.isJujutsuDevCommand) {
    const devServer = new JujutsuDevServer(
      options as DevServerOptions,
      instance
    )
    devServer.prepare()
    instance.init()
  } else {
    instance.init()
  }

  // if (options.dev)
  //   warn(
  //     'Making changes too quickly to your bot may potentially rate-limit itself.'
  //   )
}
