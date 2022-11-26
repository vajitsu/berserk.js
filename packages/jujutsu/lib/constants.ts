import { Config as SwcConfig } from '@swc/core'
import { Events as DiscordEvents } from 'jujutsu/dist/compiled/discord.js'
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

export const CONFIG_FILES = ['jujutsu.config.js', 'jujutsu.config.mjs']

export const PHASE_PRODUCTION_BUILD = 'phase-production-build'
export const PHASE_PRODUCTION_SERVER = 'phase-production-server'
export const PHASE_DEVELOPMENT_SERVER = 'phase-development-server'

export const DOT_JUJUTSU_ALIAS = 'private-dot-jujutsu'
export const ROOT_DIR_ALIAS = 'private-jujutsu-root-dir'
export const APP_DIR_ALIAS = 'private-jujutsu-app-dir'

export const SLASH_COMMAND_REGEX = new RegExp(
  '^[-_p{L}p{N}p{sc=Deva}p{sc=Thai}]{1,32}$',
  'gu'
)

//export const ENV_

export const NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against.`
