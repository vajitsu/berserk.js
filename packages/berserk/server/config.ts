import { basename, extname } from 'path'
import { pathToFileURL } from 'url'
// eslint-disable-next-line import/no-extraneous-dependencies
import findUp from 'berserk/dist/compiled/find-up'
import * as Log from '../build/output/log'
import { CONFIG_FILES } from '../lib/constants'
import {
  defaultConfig,
  normalizeConfig,
  BerserkConfigComplete,
  validateConfig,
} from './config-shared'

export { BerserkConfig, normalizeConfig } from './config-shared'

function assignDefaults(_dir: string, userConfig: { [key: string]: any }) {
  const config = Object.keys(userConfig).reduce<{ [key: string]: any }>(
    (currentConfig, key) => {
      const value = userConfig[key]

      if (value === undefined || value === null) {
        return currentConfig
      }

      if (key === 'discord') {
        if (value === undefined) {
          throw new Error(
            `Missing "discord" object in Berserk.js configuration file. This is required for your application.`
          )
        }
      }

      if (key === 'distDir') {
        if (typeof value !== 'string') {
          throw new Error(
            `Specified distDir is not a string, found type "${typeof value}"`
          )
        }
        const userDistDir = value.trim()

        // make sure distDir isn't an empty string as it can result in the provided
        // directory being deleted in development mode
        if (userDistDir.length === 0) {
          throw new Error(
            `Invalid distDir provided, distDir can not be an empty string. Please remove this config or set it to undefined`
          )
        }
      }

      if (!!value && value.constructor === Object) {
        currentConfig[key] = {
          ...defaultConfig[key],
          ...Object.keys(value).reduce<any>((c, k) => {
            const v = value[k]
            if (v !== undefined && v !== null) {
              c[k] = v
            }
            return c
          }, {}),
        }
      } else {
        currentConfig[key] = value
      }

      return currentConfig
    },
    {}
  )

  const result = { ...defaultConfig, ...config }

  return result
}

export default async function loadConfig(
  phase: string,
  dir: string,
  customConfig?: object | null,
  rawConfig?: boolean
): Promise<BerserkConfigComplete> {
  let configFileName = 'berserk.config.js'

  if (customConfig) {
    return assignDefaults(dir, customConfig) as BerserkConfigComplete
  }

  const path = await findUp(CONFIG_FILES, { cwd: dir })

  // If config file was found
  if (path?.length) {
    configFileName = basename(path)
    let userConfigModule: any

    try {
      userConfigModule = await import(pathToFileURL(path).href)

      if (rawConfig) {
        return userConfigModule
      }
    } catch (err) {
      Log.error(`Failed to load ${configFileName}`)
      throw err
    }
    const userConfig = await normalizeConfig(
      phase,
      userConfigModule.default || userConfigModule
    )

    const validateResult = validateConfig(userConfig)

    if (validateResult.errors) {
      Log.warn(`Invalid berserk.config.js options detected: `)

      // Only load @segment/ajv-human-errors when invalid config is detected
      const { AggregateAjvError } =
        // eslint-disable-next-line import/no-extraneous-dependencies
        require('berserk/dist/compiled/@segment/ajv-human-errors') as typeof import('berserk/dist/compiled/@segment/ajv-human-errors')
      const aggregatedAjvErrors = new AggregateAjvError(validateResult.errors, {
        fieldLabels: 'js',
      })
      for (const error of aggregatedAjvErrors) {
        console.error(`  - ${error.message}`)
      }
    }

    if (Object.keys(userConfig).length === 0) {
      Log.warn(`Detected ${configFileName}, no exported configuration found.`)
    }

    if (userConfig.amp?.canonicalBase) {
      const { canonicalBase } = userConfig.amp || ({} as any)
      userConfig.amp = userConfig.amp || {}
      userConfig.amp.canonicalBase =
        (canonicalBase.endsWith('/')
          ? canonicalBase.slice(0, -1)
          : canonicalBase) || ''
    }

    const completeConfig = assignDefaults(dir, {
      configFile: path,
      configFileName,
      ...userConfig,
    }) as BerserkConfigComplete
    return completeConfig
  } else {
    const configBaseName = basename(CONFIG_FILES[0], extname(CONFIG_FILES[0]))
    const nonJsPath = findUp.sync(
      [`${configBaseName}.ts`, `${configBaseName}.json`],
      { cwd: dir }
    )
    if (nonJsPath?.length) {
      throw new Error(
        `Configuring Berserk.js via '${basename(
          nonJsPath
        )}' is not supported. Please replace the file with 'berserk.config.js' or 'berserk.config.mjs'.`
      )
    }
  }

  // always call assignDefaults to ensure settings like
  // reactRoot can be updated correctly even with no next.config.js
  const completeConfig = assignDefaults(
    dir,
    defaultConfig
  ) as BerserkConfigComplete
  completeConfig.configFileName = configFileName
  return completeConfig
}
