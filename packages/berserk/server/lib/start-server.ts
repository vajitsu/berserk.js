/* eslint-disable import/no-extraneous-dependencies */
import * as Log from '../../build/output/log'
import bot from '../../discord/bot'
import { DevServerOptions } from './options'
import { EventEmitter } from 'berserk/dist/compiled/ws'
import { DiscordConfig } from '../config-shared'
import { Client } from 'berserk/dist/compiled/discord.js'
import { recursiveReadDirSync } from './recursive-readdir-sync'
import { join, relative } from 'path'
import fs from 'fs-extra'
import build, { interopForCommand, interopForEvent } from '../../build/legacy'
import BerserkDevServer from '../dev/berserk-dev-server'
import { BerserkServerOptions } from '../berserk'
import { SERVER_DIRECTORY } from '../../lib/constants'
import { exists } from 'berserk/dist/compiled/find-up'

export function identifyBundle(path: string, dir: string) {
  const command_buf = Buffer.from(`"use command"`)
  const event_buf = Buffer.from(`"use event"`)
  const data = fs.readFileSync(join(dir, path))

  const command = data.includes(command_buf)
  const event = data.includes(event_buf)

  if (event) return 'event'
  else if (command) return 'command'
  else return 'unknown'
}

export default async function startServer(
  options: BerserkServerOptions,
  debug = false
) {
  const events = new EventEmitter()

  events.once('ready', (client: Client) => {
    Log.ready(`Bot is located at ${client.user?.tag}`)
  })

  const instance = new bot(
    {
      ...(options.conf?.discord as DiscordConfig),
      quiet: options.quiet !== undefined ? options.quiet : false,
    },
    events,
    options.dev || false,
    debug
  )

  const distDir = join(
    options.dir || process.cwd(),
    options.conf?.distDir || '.berserk'
  )

  const buildDir = join(distDir, SERVER_DIRECTORY)

  const startBot = () => {
    const files = recursiveReadDirSync(buildDir).map((f) => ({
      type: identifyBundle(f, buildDir),
      absolute: join(buildDir, f),
    }))

    const event_files = files
      .filter((file) => file.type === 'event')
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
      .filter((file) => file.type === 'command')
      .map((f) => ({
        mod: require(relative(__dirname, f.absolute)),
        absolute: f.absolute,
      }))
      .map((f) => ({
        name: f.mod.__name,
        ...interopForCommand(f.mod),
        absolutePath: f.absolute,
      }))

    for (let file of command_files)
      instance.slashCommandManager.addCommand(file)
    for (let file of event_files) instance.eventManager.registerEvent(file)

    if (!options.quiet) instance.hookServerEvents()

    if (options.dev || options.isBerserkDevCommand) {
      const devServer = new BerserkDevServer(
        options as DevServerOptions,
        instance
      )
      devServer.prepare()
      instance.init()
    } else {
      instance.init()
    }
  }

  if (await exists(buildDir)) {
    startBot()
  } else {
    build(options.dir || process.cwd(), null, true).then(() => startBot())
  }
}
