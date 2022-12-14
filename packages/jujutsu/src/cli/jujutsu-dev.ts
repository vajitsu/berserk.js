#!/usr/bin/env node
import { getProjectDir } from '../lib/get-project-dir'
import { CONFIG_FILES, PHASE_DEVELOPMENT_SERVER } from '../lib/constants'
// eslint-disable-next-line import/no-extraneous-dependencies
import arg from 'jujutsu/dist/compiled/arg/index.js'
import { printAndExit } from '../server/lib/utils'
import { JujutsuConfig } from '../server/config'
import { cliCommand } from '../lib/commands'
import * as Log from '../build/output/log'
import { existsSync, watchFile } from 'fs'
import isError from '../lib/is-error'
import path from 'path'
import startServer from '../server/lib/start-server'
import loadConfig from '../server/config'
import build from '../build'
import { flushAllTraces } from '../trace'

let sessionStopHandled = false

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
    '--debug': Boolean,
    '--quiet': Boolean,
    '--force': Boolean,
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
        --debug         Log extra information (provided by Discord.js)
        --quiet         Disables logging of any kind
        --force         Generates a fresh build
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
    const { defaultConfig } =
      require('../server/config-shared') as typeof import('../server/config-shared')
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

      if (!rawJujutsuConfig.discord?.token)
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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      hasNonDefaultConfig = Object.keys(rawJujutsuConfig).some((key) =>
        checkUnsupportedCustomConfig(key, rawJujutsuConfig, defaultConfig)
      )
    } catch (e) {
      console.error('Unexpected error occurred while checking config', e)
    }

    return rawJujutsuConfig
  }

  validateJujutsuConfig()

  const conf = await loadConfig(PHASE_DEVELOPMENT_SERVER, dir)

  return await build(dir, args['--force'], true).finally(async () => {
    await flushAllTraces()

    startServer(
      {
        conf,
        ...devServerOptions,
        quiet: !!args['--quiet'],
      },
      !!args['--debug']
    ).catch((err: any) => {
      console.error(err)
      process.exit(1)
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
  })
}

export { jujutsuDev }
