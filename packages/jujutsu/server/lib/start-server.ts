/* eslint-disable import/no-extraneous-dependencies */
import * as Log from '../../build/output/log'
import bot from '../../discord/bot'
import { DevServerOptions } from './options'
import { EventEmitter } from 'jujutsu/dist/compiled/ws'
import { DiscordConfig } from '../config-shared'
import { Client } from 'jujutsu/dist/compiled/discord.js'
import { join } from 'path'
import JujutsuDevServer from '../dev/jujutsu-dev-server'
import { JujutsuServerOptions } from '../jujutsu'
import { readFileSync } from 'jujutsu/dist/compiled/fs-extra'
import json5 from 'jujutsu/dist/compiled/json5'

export default async function startServer(
  options: JujutsuServerOptions,
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
    options.conf?.distDir || '.jujutsu'
  )

  const startBot = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const abm = json5.parse(
      readFileSync(join(distDir, 'app-build-manifest.json'), 'utf8')
    )
    const bm = json5.parse(
      readFileSync(join(distDir, 'build-manifest.json'), 'utf8')
    )

    const event_files = (
      Object.entries(bm.events) as unknown as [string, string]
    ).map((f) => ({
      name: f[0],
      absolutePath: join(distDir, f[1]),
    }))

    const command_files = (
      Object.entries(bm.commands) as unknown as [string, string]
    ).map((f) => ({
      name: f[0],
      absolutePath: join(distDir, f[1]),
    }))

    for (let file of command_files)
      instance.slashCommandManager.addCommand(file)
    for (let file of event_files) instance.eventManager.registerEvent(file)

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
  }

  startBot()
}
