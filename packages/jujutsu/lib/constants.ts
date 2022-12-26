/* eslint-disable import/no-extraneous-dependencies */
import { Config as SwcConfig } from '@swc/core'
import { Events as DiscordEvents } from 'jujutsu/dist/compiled/discord.js'
import { z } from 'jujutsu/dist/compiled/zod'

export const DISCORD_EVENTS = Object.values(DiscordEvents) as string[]

export const SWC_CONFIG: SwcConfig = {
  minify: true,
  env: {
    forceAllTransforms: true,
    mode: 'usage',
    targets: {
      node: process.versions.node,
    },
  },
  jsc: {
    loose: true,
    parser: {
      syntax: 'typescript',
    },
    target: 'es5',
    externalHelpers: true,
  },
  module: {
    type: 'commonjs',
    lazy: true,
    noInterop: true,
    strict: true,
    strictMode: true,
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
export const BUILD_MANIFEST = 'build-manifest.json'
export const SLASH_COMMAND = z
  .string()
  .regex(/^[\p{Ll}\p{Lm}\p{Lo}\p{N}\p{sc=Devanagari}\p{sc=Thai}_-]+$/u)
  .min(1, 'Must be longer than or equal to 1 character')
  .max(32, 'Must be less than or equal to 32 characters')
export const NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against.`
