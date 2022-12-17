import { ClientOptions } from 'jujutsu/dist/compiled/discord.js'

export type JujutsuConfigComplete = Required<JujutsuConfig> & {
  typescript: Required<TypeScriptConfig>
  configOrigin?: string
  configFile?: string
  configFileName: string
}

export interface TypeScriptConfig {
  /** Do not run TypeScript during production builds (`jujutsu build`). */
  ignoreBuildErrors?: boolean
  /** Relative path to a custom tsconfig file */
  tsconfigPath?: string
}

export interface DiscordConfig {
  token?: string
  options?: ClientOptions
}

export interface ExperimentalConfig {
  /**
   * Enables use of the `app` directory in your Jujutsu.js application
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

export interface JujutsuConfig extends Record<string, any> {
  /**
   * Jujutsu.js comes with built-in support for environment variables
   */
  env?: Record<string, string>
  /**
   * Configure TypeScript behaviors
   */
  typescript?: TypeScriptConfig
  /**
   * Configure your Discord application
   */
  discord?: DiscordConfig
  /**
   * Destination directory (defaults to `.jujutsu`)
   */
  distDir?: string
  /**
   * The build output directory (defaults to `.jujutsu`) is now cleared by default except for the Jujutsu.js caches.
   */
  cleanDistDir?: boolean
  commandExtensions?: string[]
  eventExtensions?: string[]
  /**
   * Enable experimental features. Note that all experimental features are subject to breaking changes in the future.
   */
  experimental?: ExperimentalConfig
}

export const defaultConfig: JujutsuConfig = {
  env: {},
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: 'tsconfig.json',
  },
  distDir: '.jujutsu',
  cleanDistDir: true,
  commandExtensions: ['js', 'ts'],
  eventExtensions: ['js', 'ts'],
  discord: {
    token: '',
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

export function validateConfig(userConfig: JujutsuConfig): {
  errors?: Array<any> | null
} {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const configValidator = require('jujutsu/dist/jujutsu-config-validate.js')
  configValidator(userConfig)
  return {
    errors: configValidator.errors,
  }
}
