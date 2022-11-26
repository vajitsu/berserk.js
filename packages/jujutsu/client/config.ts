import { basename, extname } from 'path'
import { pathToFileURL } from 'url'
import findUp from 'jujutsu/dist/compiled/find-up'
import * as Log from '../build/output/log'
import { CONFIG_FILES } from '../lib/constants'
import {
  defaultConfig,
  normalizeConfig,
  JujutsuConfigComplete,
  validateConfig,
} from './config-shared'
import { gte as semverGte } from 'jujutsu/dist/compiled/semver'
import { JujutsuError } from '../lib/is-error'

export { JujutsuConfig, normalizeConfig } from './config-shared'

const NODE_16_VERSION = '16.8.0'
const NODE_18_VERSION = '18.0.0'
const isAboveNodejs16 = semverGte(process.version, NODE_16_VERSION)
const isAboveNodejs18 = semverGte(process.version, NODE_18_VERSION)

function assignDefaults(dir: string, userConfig: { [key: string]: any }) {
  const config = Object.keys(userConfig).reduce<{ [key: string]: any }>(
    (currentConfig, key) => {
      const value = userConfig[key]

      if (value === undefined || value === null) {
        return currentConfig
      }

      if (key === 'discord') {
        if (value === undefined) {
          throw new Error(
            `Missing "discord" object in Jujutsu.js configuration file. This is required for your application.`
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

      if (key === 'commandExtensions') {
        if (!Array.isArray(value)) {
          throw new Error(
            `Specified commandExtensions is not an array of strings, found "${value}". Please update this config or remove it.`
          )
        }

        if (!value.length) {
          throw new Error(
            `Specified commandExtensions is an empty array. Please update it with the relevant extensions or remove it.`
          )
        }

        value.forEach((ext) => {
          if (typeof ext !== 'string') {
            throw new Error(
              `Specified commandExtensions   is not an array of strings, found "${ext}" of type "${typeof ext}". Please update this config or remove it.`
            )
          }
        })
      }

      if (key === 'eventExtensions') {
        if (!Array.isArray(value)) {
          throw new Error(
            `Specified eventExtensions is not an array of strings, found "${value}". Please update this config or remove it.`
          )
        }

        if (!value.length) {
          throw new Error(
            `Specified eventExtensions is an empty array. Please update it with the relevant extensions or remove it.`
          )
        }

        value.forEach((ext) => {
          if (typeof ext !== 'string') {
            throw new Error(
              `Specified eventExtensions   is not an array of strings, found "${ext}" of type "${typeof ext}". Please update this config or remove it.`
            )
          }
        })
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
): Promise<JujutsuConfigComplete> {
  let configFileName = 'jujutsu.config.js'

  if (customConfig) {
    return assignDefaults(dir, customConfig) as JujutsuConfigComplete
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
      Log.warn(`Invalid jujutsu.config.js options detected: `)

      // Only load @segment/ajv-human-errors when invalid config is detected
      const { AggregateAjvError } =
        require('jujutsu/dist/compiled/@segment/ajv-human-errors') as typeof import('jujutsu/dist/compiled/@segment/ajv-human-errors')
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
    }) as JujutsuConfigComplete
    return completeConfig
  } else {
    const configBaseName = basename(CONFIG_FILES[0], extname(CONFIG_FILES[0]))
    const nonJsPath = findUp.sync(
      [
        `${configBaseName}.jsx`,
        `${configBaseName}.ts`,
        `${configBaseName}.tsx`,
        `${configBaseName}.json`,
      ],
      { cwd: dir }
    )
    if (nonJsPath?.length) {
      throw new Error(
        `Configuring Next.js via '${basename(
          nonJsPath
        )}' is not supported. Please replace the file with 'next.config.js' or 'next.config.mjs'.`
      )
    }
  }

  // always call assignDefaults to ensure settings like
  // reactRoot can be updated correctly even with no next.config.js
  const completeConfig = assignDefaults(
    dir,
    defaultConfig
  ) as JujutsuConfigComplete
  completeConfig.configFileName = configFileName
  return completeConfig
}
