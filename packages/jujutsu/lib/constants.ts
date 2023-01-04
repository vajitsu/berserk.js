/* eslint-disable import/no-extraneous-dependencies */
import { Events as DiscordEvents } from 'jujutsu/dist/compiled/discord.js'
import { z } from 'jujutsu/dist/compiled/zod'

export const DISCORD_EVENTS = Object.values(DiscordEvents) as string[]

export const SWC_CONFIG = {
  minify: true,
  jsc: {
    loose: true,
    parser: {
      syntax: 'ecmascript',
    },
    target: 'es5',
    externalHelpers: true,
    experimental: {
      keepImportAssertions: true,
      optimizeHygiene: true,
      plugins: [
        [
          'transform-imports',
          {
            jujutsu: {
              transform: 'jujutsu/dist/{{member}}',
            },
          },
        ],
      ],
    },
    minify: {
      compress: {
        arguments: false,
        arrows: true,
        booleans: true,
        booleans_as_integers: false,
        collapse_vars: true,
        comparisons: true,
        computed_props: true,
        conditionals: true,
        dead_code: true,
        directives: true,
        drop_console: false,
        drop_debugger: true,
        evaluate: true,
        expression: false,
        hoist_funs: false,
        hoist_props: true,
        hoist_vars: false,
        if_return: true,
        join_vars: true,
        keep_classnames: false,
        keep_fargs: true,
        keep_fnames: false,
        keep_infinity: false,
        loops: true,
        negate_iife: true,
        properties: true,
        reduce_funcs: false,
        reduce_vars: false,
        side_effects: true,
        switches: true,
        typeofs: true,
        unsafe: false,
        unsafe_arrows: false,
        unsafe_comps: false,
        unsafe_Function: false,
        unsafe_math: false,
        unsafe_symbols: false,
        unsafe_methods: false,
        unsafe_proto: false,
        unsafe_regexp: false,
        unsafe_undefined: false,
        unused: true,
        const_to_let: true,
        pristine_globals: true,
      } as any,
      mangle: {
        toplevel: false,
        keep_classnames: false,
        keep_fnames: false,
        keep_private_props: false,
        ie8: false,
        safari10: false,
      },
    },
  },
  module: {
    type: 'commonjs',
    noInterop: false,
    importInterop: 'swc',
    ignoreDynamic: true,
    lazy: true,
    preserveImportMeta: false,
  },
  isModule: true,
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
export const BUILD_MANIFEST = 'build-manifest.json'
export const SLASH_COMMAND = z
  .string()
  .regex(/^[\p{Ll}\p{Lm}\p{Lo}\p{N}\p{sc=Devanagari}\p{sc=Thai}_-]+$/u)
  .min(1, 'Must be longer than or equal to 1 character')
  .max(32, 'Must be less than or equal to 32 characters')
export const NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against.`
