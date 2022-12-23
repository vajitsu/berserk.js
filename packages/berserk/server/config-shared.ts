// eslint-disable-next-line import/no-extraneous-dependencies
import { ClientOptions } from 'berserk/dist/compiled/discord.js'

export type BerserkConfigComplete = Required<BerserkConfig> & {
  typescript: Required<TypeScriptConfig>
  configOrigin?: string
  configFile?: string
  configFileName: string
}

export interface TypeScriptConfig {
  /** Do not run TypeScript during production builds (`berserk build`). */
  ignoreBuildErrors?: boolean
  /** Relative path to a custom tsconfig file */
  tsconfigPath?: string
}

export interface BerserkDiscordConfig {
  token?: string
  library: '@berserk/discord'
  options?: {
    intents: number[]
  }
}

export interface DiscordJsConfig {
  token?: string
  library: 'discord.js'
  options?: ClientOptions
}

export interface DiscordConfig {
  token?: string
  library: '@berserk/discord' | 'discord.js'
  options?:
    | {
        intents: number[]
      }
    | ClientOptions
}

export interface ExperimentalConfig {
  /**
   * Enables use of the `app` directory in your Berserk.js application
   */
  appDir?: boolean
  /**
   * Use [SWC compiler](https://swc.rs) to compress the generated JavaScript
   */
  compress?: boolean
  /**
   * Use [SWC compiler](https://swc.rs) to minify the generated JavaScript
   *
   * @see [SWC Minification](https://nextjs.org/docs/advanced-features/compiler#minification)
   */
  swcMinify?: boolean
}

export interface BerserkConfig extends Record<string, any> {
  /**
   * Berserk.js comes with built-in support for environment variables
   */
  env?: Record<string, string>
  /**
   * Configure TypeScript behaviors
   */
  typescript?: TypeScriptConfig
  /**
   * Configure your Discord application
   */
  discord?: DiscordJsConfig | BerserkDiscordConfig
  /**
   * Destination directory (defaults to `.berserk`)
   */
  distDir?: string
  /**
   * The build output directory (defaults to `.berserk`) is now cleared by default except for the Berserk.js caches.
   */
  cleanDistDir?: boolean
  commandExtensions?: string[]
  eventExtensions?: string[]
  /**
   * Enable experimental features. Note that all experimental features are subject to breaking changes in the future.
   */
  experimental?: ExperimentalConfig
}

export const defaultConfig: BerserkConfig = {
  env: {},
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: 'tsconfig.json',
  },
  distDir: '.berserk',
  cleanDistDir: true,
  commandExtensions: ['js', 'ts'],
  eventExtensions: ['js', 'ts'],
  discord: {
    token: '',
    library: 'discord.js',
    options: {
      intents: [1],
    },
  },
  experimental: {
    compress: true,
    swcMinify: true,
    appDir: false,
  },
}

export async function normalizeConfig(phase: string, config: any) {
  if (typeof config === 'function') {
    config = config(phase, { defaultConfig })
  }
  // Support `new Promise` and `async () =>` as return values of the config export
  return await config
}

export function validateConfig(userConfig: BerserkConfig): {
  errors?: Array<any> | null
} {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const configValidator = require('berserk/dist/berserk-config-validate.js')
  configValidator(userConfig)
  return {
    errors: configValidator.errors,
  }
}
