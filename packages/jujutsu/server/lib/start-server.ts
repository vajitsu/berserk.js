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
import { existsSync, readFileSync } from 'jujutsu/dist/compiled/fs-extra'
import json5 from 'jujutsu/dist/compiled/json5'
import { printAndExit } from './utils'

export default async function startServer(
  options: JujutsuServerOptions,
  debug = false
) {
  const distDir = join(
    options.dir || process.cwd(),
    options.conf?.distDir || '.jujutsu'
  )

  if (
    !options.dev &&
    (!existsSync(join(distDir, 'server')) ||
      !existsSync(join(distDir, 'app-build-manifest.json')) ||
      !existsSync(join(distDir, 'build-manifest.json')))
  )
    printAndExit(
      `> Missing production build of your application, did you run \`jujutsu build\`?`
    )

  const abm = json5.parse(
    readFileSync(join(distDir, 'app-build-manifest.json'), 'utf8')
  )
  const bm = json5.parse(
    readFileSync(join(distDir, 'build-manifest.json'), 'utf8')
  )

  if ((abm.mode === 'development' || bm.mode === 'development') && !options.dev)
    printAndExit(
      '> The current build of your project is the development build, run `jujutsu build` to create a build for production.'
    )

  const events = new EventEmitter()

  events.once('ready', (client: Client) => {
    Log.ready(`located at ${client.user?.tag}`)
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

  const startBot = () => {
    const event_files = [
      ...(Object.entries(bm.events) as unknown as [string, string][]),
      ...(Object.entries(abm.events) as unknown as [string, string][]),
    ].map((f) => ({
      name: f[0],
      absolutePath: join(distDir, f[1]),
    }))

    const subcommand_files = [
      ...(Object.entries(abm.subcommands) as unknown as [
        string,
        { parent: string; path: string }
      ][]),
    ].map((f) => ({
      name: f[0],
      parent: f[1].parent,
      absolutePath: join(distDir, f[1].path),
    }))

    const command_files = [
      ...(Object.entries(bm.commands) as unknown as [string, string][]),
      ...(Object.entries(abm.commands) as unknown as [string, string][]),
    ].map((f) => ({
      name: f[0],
      subcommands: subcommand_files.filter((sub) => sub.parent === f[0]),
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
