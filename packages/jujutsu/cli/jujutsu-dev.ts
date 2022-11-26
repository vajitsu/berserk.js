#!/usr/bin/env node
import { startedDevelopmentServer } from '../build/output'
import { getProjectDir } from '../lib/get-project-dir'
import { CONFIG_FILES } from '../lib/constants'
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
    '--turbo': Boolean,

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

  async function validateJujutsuConfig(isCustomTurbopack: boolean) {
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

    // To regenerate the TURBOPACK gradient require('gradient-string')('blue', 'red')('>>> TURBOPACK')
    const isTTY = process.stdout.isTTY

    const turbopackGradient = `${chalk.bold(
      isTTY
        ? '\x1B[38;2;0;0;255m>\x1B[39m\x1B[38;2;23;0;232m>\x1B[39m\x1B[38;2;46;0;209m>\x1B[39m \x1B[38;2;70;0;185mT\x1B[39m\x1B[38;2;93;0;162mU\x1B[39m\x1B[38;2;116;0;139mR\x1B[39m\x1B[38;2;139;0;116mB\x1B[39m\x1B[38;2;162;0;93mO\x1B[39m\x1B[38;2;185;0;70mP\x1B[39m\x1B[38;2;209;0;46mA\x1B[39m\x1B[38;2;232;0;23mC\x1B[39m\x1B[38;2;255;0;0mK\x1B[39m'
        : '>>> TURBOPACK'
    )} ${chalk.dim('(alpha)')}\n\n`

    let thankYouMsg = `Thank you for trying Next.js v13 with Turbopack! As a reminder,\nTurbopack is currently in alpha and not yet ready for production.\nWe appreciate your ongoing support as we work to make it ready\nfor everyone.\n`

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

    const hasWarningOrError = hasNonDefaultConfig
    if (!hasWarningOrError) {
      thankYouMsg = chalk.dim(thankYouMsg)
    }
    console.log(turbopackGradient + thankYouMsg)

    return rawJujutsuConfig
  }

  validateJujutsuConfig(false)

  //const

  //   startServer({
  //     conf: findConfig<JujutsuConfig>(process.cwd(), 'jujutsu'),
  //     ...devServerOptions,
  //   })

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
