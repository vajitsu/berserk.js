#!/usr/bin/env node
import { startedDevelopmentServer } from '../build/output'
import { getProjectDir } from '../lib/get-project-dir'
import { CONFIG_FILES, PHASE_DEVELOPMENT_SERVER } from '../lib/constants'
import arg from 'jujutsu/dist/compiled/arg/index.js'
import { printAndExit } from '../client/lib/utils'
import { traceGlobals } from '../trace/shared'
import { JujutsuConfig } from '../types'
import { cliCommand } from '../lib/commands'
import * as Log from '../build/output/log'
import { existsSync, watchFile } from 'fs'
import isError from '../lib/is-error'
import path from 'path'
import startServer from '../client/lib/start-server'
import { findConfig } from '../lib/find-config'
import { EventEmitter } from 'jujutsu/dist/compiled/ws'
import { Client } from 'jujutsu/dist/compiled/discord.js'
import loadConfig from '../client/config'
import build from '../build'

let sessionStopHandled = false
let sessionStarted = Date.now()

const handleSessionStop = async () => {
  if (sessionStopHandled) return
  process.exit(0)
}

process.on('SIGINT', handleSessionStop)
process.on('SIGTERM', handleSessionStop)

const jujutsuDev: cliCommand = async (argv) => {
  const validArgs: arg.Spec = {
    // Types
    '--help': Boolean,
    '--quiet': Boolean,

    // Aliases
    '-h': '--help',
  }
  let args: arg.Result<arg.Spec>
  try {
    args = arg(validArgs, { argv })
  } catch (error) {
    if (isError(error) && error.code === 'ARG_UNKNOWN_OPTION') {
      return printAndExit(error.message, 1)
    }
    throw error
  }
  if (args['--help']) {
    console.log(`
      Description
        Starts the application in development mode (hot-code reloading, error
        reporting, etc.)
      Usage
        $ jujutsu dev <dir>
      <dir> represents the directory of the Next.js application.
      If no directory is provided, the current directory will be used.
      Options
        --help, -h      Displays this message
    `)
    process.exit(0)
  }

  const dir = getProjectDir(args._[0])

  // Check if pages dir exists and warn if not
  if (!existsSync(dir)) {
    printAndExit(`> No such directory exists as the project root: ${dir}`)
  }

  const devServerOptions = {
    dev: true,
    dir,
    isJujutsuDevCommand: true,
  }

  async function validateJujutsuConfig() {
    const { getPkgManager } =
      require('../lib/helpers/get-pkg-manager') as typeof import('../lib/helpers/get-pkg-manager')
    const { defaultConfig } =
      require('../client/config-shared') as typeof import('../client/config-shared')
    const { default: loadConfig } =
      require('../client/config') as typeof import('../client/config')
    const { PHASE_DEVELOPMENT_SERVER } =
      require('../lib/constants') as typeof import('../lib/constants')
    const chalk =
      require('jujutsu/dist/compiled/chalk') as typeof import('jujutsu/dist/compiled/chalk')
    const { interopDefault } =
      require('../lib/interop-default') as typeof import('../lib/interop-default')

    let hasNonDefaultConfig
    let rawJujutsuConfig: JujutsuConfig = {}

    try {
      rawJujutsuConfig = interopDefault(
        await loadConfig(PHASE_DEVELOPMENT_SERVER, dir, undefined, true)
      ) as JujutsuConfig

      if (typeof rawJujutsuConfig === 'function') {
        rawJujutsuConfig = (rawJujutsuConfig as any)(PHASE_DEVELOPMENT_SERVER, {
          defaultConfig,
        })
      }

      if (!rawJujutsuConfig.discord.token)
        Log.error(`"discord.token" is required for your application to run.`)

      const checkUnsupportedCustomConfig = (
        configKey = '',
        parentUserConfig: any,
        parentDefaultConfig: any
      ): boolean => {
        try {
          // these should not error
          if (
            configKey === 'serverComponentsExternalPackages' ||
            configKey === 'appDir' ||
            configKey === 'transpilePackages' ||
            configKey === 'reactStrictMode' ||
            configKey === 'swcMinify' ||
            configKey === 'configFileName'
          ) {
            return false
          }
          let userValue = parentUserConfig?.[configKey]
          let defaultValue = parentDefaultConfig?.[configKey]

          if (typeof defaultValue !== 'object') {
            return defaultValue !== userValue
          }
          return Object.keys(userValue || {}).some((key: string) => {
            return checkUnsupportedCustomConfig(key, userValue, defaultValue)
          })
        } catch (e) {
          console.error(
            `Unexpected error occurred while checking ${configKey}`,
            e
          )
          return false
        }
      }

      hasNonDefaultConfig = Object.keys(rawJujutsuConfig).some((key) =>
        checkUnsupportedCustomConfig(key, rawJujutsuConfig, defaultConfig)
      )
    } catch (e) {
      console.error('Unexpected error occurred while checking config', e)
    }

    return rawJujutsuConfig
  }

  validateJujutsuConfig()

  //const

  //   startServer({
  //     conf: findConfig<JujutsuConfig>(process.cwd(), 'jujutsu'),
  //     ...devServerOptions,
  //   })

  const conf = await loadConfig(PHASE_DEVELOPMENT_SERVER, dir)

  build(dir, null, true).then(() => {
    startServer({
      conf,
      ...devServerOptions,
      quiet: !!args['--quiet'],
    }).catch((err: any) => {
      console.error(err)
      process.exit(1)
    })
  })

  for (const CONFIG_FILE of CONFIG_FILES) {
    watchFile(path.join(dir, CONFIG_FILE), (cur: any, prev: any) => {
      if (cur.size > 0 || prev.size > 0) {
        console.log(
          `\n> Found a change in ${CONFIG_FILE}. Restart the server to see the changes in effect.`
        )
      }
    })
  }
}

export { jujutsuDev }
