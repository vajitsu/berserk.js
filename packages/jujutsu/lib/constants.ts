/* eslint-disable import/no-extraneous-dependencies */
import { Config as SwcConfig } from '@swc/core'
import { Events as DiscordEvents } from 'jujutsu/dist/compiled/discord.js'
import { s } from 'jujutsu/dist/compiled/@sapphire/shapeshift'
import { builtinModules } from 'module'

export const BUILT_IN_MODULES = builtinModules
  .filter(
    (mod) =>
      !mod.startsWith('_http') &&
      !mod.startsWith('_tls') &&
      !mod.startsWith('_stream') &&
      mod !== 'sys'
  )
  .map((mod) => 'node:'.concat(mod))
  .filter((mod) => !!require(mod))

export const DISCORD_EVENTS = Object.values(DiscordEvents) as string[]

export const SWC_CONFIG: SwcConfig = {
  env: {
    targets: {
      node: 14,
    },
  },
  jsc: {
    parser: {
      syntax: 'ecmascript',
      jsx: false,
      functionBind: true,
      exportDefaultFrom: true,
      decorators: false,
      decoratorsBeforeExport: false,
      topLevelAwait: true,
      importMeta: true,
    },
    experimental: {
      keepImportAssertions: true,
    },
    minify: {
      compress: {
        unused: true,
      },
    },
    transform: {},
    preserveAllComments: false,
    target: 'es2020',
    loose: true,
    externalHelpers: false,
    keepClassNames: true,
  },
  module: {
    type: 'commonjs',
    importInterop: 'node',
    strict: true,
    lazy: true,
  },
}

export const BUILD_ID_FILE = 'BUILD_ID'
export const SERVER_DIRECTORY = 'server'
export const CONFIG_FILES = ['jujutsu.config.js', 'jujutsu.config.mjs']
export const PHASE_PRODUCTION_BUILD = 'phase-production-build'
export const PHASE_PRODUCTION_SERVER = 'phase-production-server'
export const PHASE_DEVELOPMENT_SERVER = 'phase-development-server'
export const DOT_JUJUTSU_ALIAS = 'private-dot-jujutsu'
export const ROOT_DIR_ALIAS = 'private-jujutsu-root-dir'
export const APP_DIR_ALIAS = 'private-jujutsu-app-dir'
export const APP_PATHS_MANIFEST = 'app-paths-manifest.json'

export const SLASH_COMMAND_REGEX = s.string
  .lengthGreaterThanOrEqual(1)
  .lengthLessThanOrEqual(32)
  .regex(/^[\p{Ll}\p{Lm}\p{Lo}\p{N}\p{sc=Devanagari}\p{sc=Thai}_-]+$/u)

export const NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against.`
