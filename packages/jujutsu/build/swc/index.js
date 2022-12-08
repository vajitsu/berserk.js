/*
The MIT License (MIT)

Copyright (c) 2022 Vercel, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
// eslint-disable-next-line import/no-extraneous-dependencies
import { platformArchTriples } from 'jujutsu/dist/compiled/@napi-rs/triples'
import { patchIncorrectLockfile } from '../../lib/patch-incorrect-lockfile'
import { getParserOptions } from './options'
import * as Log from '../output/log'
import { platform, arch } from 'os'
import { getPkgManager } from '../../lib/helpers/get-pkg-manager'
import { getOnline } from '../../lib/helpers/get-online'
import { install } from '../../lib/helpers/install'
import { checkPackageExists } from 'check-package-exists'
import chalk from 'jujutsu/dist/compiled/chalk'

const ArchName = arch()
const PlatformName = platform()
const triples = platformArchTriples[PlatformName][ArchName] || []

let nativeBindings
let pendingBindings
let swcTraceFlushGuard
let swcCrashReporterFlushGuard
export const lockfilePatchPromise = {}

export async function loadBindings() {
  if (pendingBindings) {
    return pendingBindings
  }
  pendingBindings = new Promise(async (resolve, reject) => {
    if (!lockfilePatchPromise.cur) {
      // always run lockfile check once so that it gets patched
      // even if it doesn't fail to load locally
      lockfilePatchPromise.cur = patchIncorrectLockfile(process.cwd()).catch(
        console.error
      )
    }

    let attempts = []

    try {
      return resolve(loadNative())
    } catch (a) {
      attempts = attempts.concat(a)
    }

    logLoadFailure(attempts, true)
  })
  return pendingBindings
}

function loadBindingsSync() {
  let attempts = []
  try {
    return loadNative()
  } catch (a) {
    attempts = attempts.concat(a)
  }

  logLoadFailure(attempts)
}

let loggingLoadFailure = false

function logLoadFailure(attempts) {
  // make sure we only emit the event and log the failure once
  if (loggingLoadFailure) return
  loggingLoadFailure = true

  for (let attempt of attempts) {
    Log.warn(attempt)
  }
}

function loadNative() {
  if (nativeBindings) {
    return nativeBindings
  }

  let bindings
  let attempts = []

  for (const triple of triples) {
    try {
      bindings = require(`@next/swc/native/next-swc.${triple.platformArchABI}.node`)
      Log.info('Using locally built binary of @next/swc')
      break
    } catch (e) {
      const packageManager = getPkgManager()
      const isOnline = getOnline()
      const devDependencies = []
      const pkg = `@next/swc-${triple.platformArchABI}`
      if (checkPackageExists(pkg)) {
        Log.info(
          `Attempting to install ${chalk.bold(pkg)} for your operating system`
        )
        try {
          install(process.cwd(), [pkg], {
            packageManager,
            isOnline,
            devDependencies,
          })
        } catch {}
      }
    }
  }

  if (!bindings) {
    for (const triple of triples) {
      let pkg = `@next/swc-${triple.platformArchABI}`
      try {
        bindings = require(pkg)
        break
      } catch (e) {
        if (e?.code === 'MODULE_NOT_FOUND') {
          attempts.push(`Attempted to load ${pkg}, but it was not installed`)
        } else {
          attempts.push(
            `Attempted to load ${pkg}, but an error occurred: ${e.message ?? e}`
          )
        }
      }
    }
  }

  if (bindings) {
    // Initialize crash reporter, as earliest as possible from any point of import.
    // The first-time import to next-swc is not predicatble in the import tree of next.js, which makes
    // we can't rely on explicit manual initialization as similar to trace reporter.
    if (!swcCrashReporterFlushGuard) {
      // Crash reports in next-swc should be treated in the same way we treat telemetry to opt out.
      /* TODO: temporarily disable initialization while confirming logistics.
                  let telemetry = new Telemetry({ distDir: process.cwd() })
                  if (telemetry.isEnabled) {
                    swcCrashReporterFlushGuard = bindings.initCrashReporter?.()
                  }*/
    }

    nativeBindings = {
      transform(src, options) {
        const isModule =
          typeof src !== undefined &&
          typeof src !== 'string' &&
          !Buffer.isBuffer(src)
        options = options || {}

        if (options?.jsc?.parser) {
          options.jsc.parser.syntax = options.jsc.parser.syntax ?? 'ecmascript'
        }

        return bindings.transform(
          isModule ? JSON.stringify(src) : src,
          isModule,
          toBuffer(options)
        )
      },

      transformSync(src, options) {
        if (typeof src === undefined) {
          throw new Error(
            "transformSync doesn't implement reading the file from filesystem"
          )
        } else if (Buffer.isBuffer(src)) {
          throw new Error(
            "transformSync doesn't implement taking the source code as Buffer"
          )
        }
        const isModule = typeof src !== 'string'
        options = options || {}

        if (options?.jsc?.parser) {
          options.jsc.parser.syntax = options.jsc.parser.syntax ?? 'ecmascript'
        }

        return bindings.transformSync(
          isModule ? JSON.stringify(src) : src,
          isModule,
          toBuffer(options)
        )
      },

      minify(src, options) {
        return bindings.minify(toBuffer(src), toBuffer(options ?? {}))
      },

      minifySync(src, options) {
        return bindings.minifySync(toBuffer(src), toBuffer(options ?? {}))
      },

      parse(src, options) {
        return bindings.parse(src, toBuffer(options ?? {}))
      },

      getTargetTriple: bindings.getTargetTriple,
      initCustomTraceSubscriber: bindings.initCustomTraceSubscriber,
      teardownTraceSubscriber: bindings.teardownTraceSubscriber,
      teardownCrashReporter: bindings.teardownCrashReporter,

      turbo: {
        startDev: (options) => {
          const devOptions = {
            ...options,
            noOpen: options.noOpen ?? true,
          }

          bindings.startTurboDev(toBuffer(devOptions))

          bindings.startTurboDev(toBuffer(devOptions))
        },
        startTrace: (options = {}) =>
          bindings.runTurboTracing(toBuffer({ exact: true, ...options })),
      },
    }

    return nativeBindings
  }

  throw attempts
}

function toBuffer(t) {
  return Buffer.from(JSON.stringify(t))
}

export async function transform(src, options) {
  let bindings = await loadBindings()
  return bindings.transform(src, options)
}

export function transformSync(src, options) {
  let bindings = loadBindingsSync()
  return bindings.transformSync(src, options)
}

export async function minify(src, options) {
  let bindings = await loadBindings()
  return bindings.minify(src, options)
}

export function minifySync(src, options) {
  let bindings = loadBindingsSync()
  return bindings.minifySync(src, options)
}

export async function parse(src, options) {
  let bindings = await loadBindings()
  let parserOptions = getParserOptions(options)
  return bindings.parse(src, parserOptions).then((astStr) => JSON.parse(astStr))
}

export function getBinaryMetadata() {
  let bindings
  try {
    bindings = loadNative()
  } catch (e) {
    // Suppress exceptions, this fn allows to fail to load native bindings
  }

  return {
    target: bindings?.getTargetTriple?.(),
  }
}

/**
 * Initialize trace subscriber to emit traces.
 *
 */
export const initCustomTraceSubscriber = (() => {
  return (filename) => {
    if (!swcTraceFlushGuard) {
      // Wasm binary doesn't support trace emission
      let bindings = loadNative()
      swcTraceFlushGuard = bindings.initCustomTraceSubscriber(filename)
    }
  }
})()

/**
 * Teardown swc's trace subscriber if there's an initialized flush guard exists.
 *
 * This is workaround to amend behavior with process.exit
 * (https://github.com/vercel/next.js/blob/4db8c49cc31e4fc182391fae6903fb5ef4e8c66e/packages/next/bin/next.ts#L134=)
 * seems preventing napi's cleanup hook execution (https://github.com/swc-project/swc/blob/main/crates/node/src/util.rs#L48-L51=),
 *
 * instead parent process manually drops guard when process gets signal to exit.
 */
export const teardownTraceSubscriber = (() => {
  let flushed = false
  return () => {
    if (!flushed) {
      flushed = true
      try {
        let bindings = loadNative()
        if (swcTraceFlushGuard) {
          bindings.teardownTraceSubscriber(swcTraceFlushGuard)
        }
      } catch (e) {
        // Suppress exceptions, this fn allows to fail to load native bindings
      }
    }
  }
})()

export const teardownCrashReporter = (() => {
  let flushed = false
  return () => {
    if (!flushed) {
      flushed = true
      try {
        let bindings = loadNative()
        if (swcCrashReporterFlushGuard) {
          bindings.teardownCrashReporter(swcCrashReporterFlushGuard)
        }
      } catch (e) {
        // Suppress exceptions, this fn allows to fail to load native bindings
      }
    }
  }
})()
