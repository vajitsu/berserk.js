#!/usr/bin/env node
import { getProjectDir } from '../lib/get-project-dir'
import { cliCommand } from '../lib/commands'
import { printAndExit } from '../lib/utils'
import isError from '../lib/is-error'
import { existsSync } from 'fs'
import build from '../build'
// eslint-disable-next-line import/no-extraneous-dependencies
import arg from 'berserk/dist/compiled/arg/index.js'
import loadConfig from '../server/config'
import { PHASE_PRODUCTION_BUILD } from '../lib/constants'
import * as Log from '../build/output/log'
import { BerserkConfig } from '../types'

const berserkBuild: cliCommand = (argv) => {
  const validArgs: arg.Spec = {
    // Types
    '--help': Boolean,
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
    printAndExit(
      `
      Description
        Compiles the application for production deployment
      Usage
        $ berserk build <dir>
      <dir> represents the directory of the Berserk.js application.
      If no directory is provided, the current directory will be used.
    `,
      0
    )
  }

  const dir = getProjectDir(args._[0])

  async function validateBerserkConfig() {
    const { defaultConfig } =
      require('../server/config-shared') as typeof import('../server/config-shared')
    const { interopDefault } =
      require('../lib/interop-default') as typeof import('../lib/interop-default')

    let hasNonDefaultConfig
    let rawBerserkConfig: BerserkConfig = {}

    try {
      rawBerserkConfig = interopDefault(
        await loadConfig(PHASE_PRODUCTION_BUILD, dir, undefined, true)
      ) as BerserkConfig

      if (typeof rawBerserkConfig === 'function') {
        rawBerserkConfig = (rawBerserkConfig as any)(PHASE_PRODUCTION_BUILD, {
          defaultConfig,
        })
      }

      if (!rawBerserkConfig.discord?.token)
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
      hasNonDefaultConfig = Object.keys(rawBerserkConfig).some((key) =>
        checkUnsupportedCustomConfig(key, rawBerserkConfig, defaultConfig)
      )
    } catch (e) {
      console.error('Unexpected error occurred while checking config', e)
    }

    return rawBerserkConfig
  }

  validateBerserkConfig()

  // Check if the provided directory exists
  if (!existsSync(dir)) {
    printAndExit(`> No such directory exists as the project root: ${dir}`)
  }

  return build(dir).catch((err) => {
    console.error('')
    if (
      isError(err) &&
      (err.code === 'INVALID_RESOLVE_ALIAS' ||
        err.code === 'WEBPACK_ERRORS' ||
        err.code === 'BUILD_OPTIMIZATION_FAILED' ||
        err.code === 'EDGE_RUNTIME_UNSUPPORTED_API')
    ) {
      printAndExit(`> ${err.message}`)
    } else {
      console.error('> Build error occurred')
      printAndExit(err)
    }
  })
}

export { berserkBuild }
