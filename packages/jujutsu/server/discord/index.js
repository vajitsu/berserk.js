import path from 'path'
import { pathToFileURL } from 'url'
import { platform, arch } from 'os'
// eslint-disable-next-line import/no-extraneous-dependencies
import { platformArchTriples } from 'jujutsu/dist/compiled/@napi-rs/triples'
import * as Log from '../output/log'
import { patchIncorrectLockfile } from '../../lib/patch-incorrect-lockfile'
import { downloadWasmdiscord } from '../../lib/download-wasm-discord'
// eslint-disable-next-line import/no-extraneous-dependencies
import { version as nextVersion } from 'jujutsu/package.json'

const ArchName = arch()
const PlatformName = platform()
const triples = platformArchTriples[PlatformName][ArchName] || []

// These are the platforms we'll try to load wasm bindings first,
// only try to load native bindings if loading wasm binding somehow fails.
// Fallback to native binding is for migration period only,
// once we can verify loading-wasm-first won't cause visible regressions,
// we'll not include native bindings for these platform at all.
const knownDefaultWasmFallbackTriples = [
  'aarch64-linux-android',
  'x86_64-unknown-freebsd',
  'aarch64-pc-windows-msvc',
  'arm-linux-androideabi',
  'armv7-unknown-linux-gnueabihf',
  'i686-pc-windows-msvc',
]

let nativeBindings
let wasmBindings
let downloadWasmPromise
let pendingBindings
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
    const shouldLoadWasmFallbackFirst = triples.some(
      (triple) =>
        !!triple?.raw && knownDefaultWasmFallbackTriples.includes(triple.raw)
    )

    if (shouldLoadWasmFallbackFirst) {
      const fallbackBindings = await tryLoadWasmWithFallback(attempts)
      if (fallbackBindings) {
        return resolve(fallbackBindings)
      }
    }

    try {
      return resolve(loadNative())
    } catch (a) {
      attempts = attempts.concat(a)
    }

    // For these platforms we already tried to load wasm and failed, skip reattempt
    if (!shouldLoadWasmFallbackFirst) {
      const fallbackBindings = await tryLoadWasmWithFallback(attempts)
      if (fallbackBindings) {
        return resolve(fallbackBindings)
      }
    }

    logLoadFailure(attempts, true)
  })
  return pendingBindings
}

async function tryLoadWasmWithFallback(attempts) {
  try {
    let bindings = await loadWasm()
    return bindings
  } catch (a) {
    attempts = attempts.concat(a)
  }

  try {
    // if not installed already download wasm package on-demand
    // we download to a custom directory instead of to node_modules
    // as node_module import attempts are cached and can't be re-attempted
    // x-ref: https://github.com/nodejs/modules/issues/307
    const wasmDirectory = path.join(
      path.dirname(require.resolve('jujutsu/package.json')),
      'wasm'
    )
    if (!downloadWasmPromise) {
      downloadWasmPromise = downloadWasmdiscord(nextVersion, wasmDirectory)
    }
    await downloadWasmPromise
    let bindings = await loadWasm(pathToFileURL(wasmDirectory).href)

    // still log native load attempts so user is
    // aware it failed and should be fixed
    for (const attempt of attempts) {
      Log.warn(attempt)
    }
    return bindings
  } catch (a) {
    attempts = attempts.concat(a)
  }
}

function loadBindingsSync() {
  let attempts = []
  try {
    return loadNative()
  } catch (a) {
    attempts = attempts.concat(a)
  }

  // we can leverage the wasm bindings if they are already
  // loaded
  if (wasmBindings) {
    return wasmBindings
  }

  logLoadFailure(attempts)
}

let loggingLoadFailure = false

function logLoadFailure(attempts, triedWasm = false) {
  // make sure we only emit the event and log the failure once
  if (loggingLoadFailure) return
  loggingLoadFailure = true

  for (let attempt of attempts) {
    Log.warn(attempt)
  }
}

async function loadWasm(importPath = '') {
  if (wasmBindings) {
    return wasmBindings
  }

  let attempts = []
  for (let pkg of [
    '@jujutsu/discord-wasm-nodejs',
    '@jujutsu/discord-wasm-web',
  ]) {
    try {
      let pkgPath = pkg

      if (importPath) {
        // the import path must be exact when not in node_modules
        pkgPath = path.join(importPath, pkg, 'wasm.js')
      }
      let bindings = await import(pkgPath)
      if (pkg === '@jujutsu/discord-wasm-web') {
        bindings = await bindings.default()
      }
      Log.info('Using wasm build of jujutsu-discord')

      // Note wasm binary does not support async intefaces yet, all async
      // interface coereces to sync interfaces.
      wasmBindings = {
        isWasm: true,
        transform(src, options) {
          // TODO: we can remove fallback to sync interface once new stable version of jujutsu-discord gets published (current v12.2)
          return bindings?.transform
            ? bindings.transform(src.toString(), options)
            : Promise.resolve(bindings.transformSync(src.toString(), options))
        },
        transformSync(src, options) {
          return bindings.transformSync(src.toString(), options)
        },
        minify(src, options) {
          return bindings?.minify
            ? bindings.minify(src.toString(), options)
            : Promise.resolve(bindings.minifySync(src.toString(), options))
        },
        minifySync(src, options) {
          return bindings.minifySync(src.toString(), options)
        },
        parse(src, options) {
          return bindings?.parse
            ? bindings.parse(src.toString(), options)
            : Promise.resolve(bindings.parseSync(src.toString(), options))
        },
        parseSync(src, options) {
          const astStr = bindings.parseSync(src.toString(), options)
          return astStr
        },
        getTargetTriple() {
          return undefined
        },
        turbo: {
          startDev: () => {
            Log.error('Wasm binding does not support --turbo yet')
          },
          startTrace: () => {
            Log.error('Wasm binding does not support trace yet')
          },
        },
        mdx: {
          compile: (src, options) => bindings.mdxCompile(src, options),
          compileSync: (src, options) => bindings.mdxCompileSync(src, options),
        },
      }
      return wasmBindings
    } catch (e) {
      // Only log attempts for loading wasm when loading as fallback
      if (importPath) {
        if (e?.code === 'ERR_MODULE_NOT_FOUND') {
          attempts.push(`Attempted to load ${pkg}, but it was not installed`)
        } else {
          attempts.push(
            `Attempted to load ${pkg}, but an error occurred: ${e.message ?? e}`
          )
        }
      }
    }
  }

  throw attempts
}

function loadNative() {
  if (nativeBindings) {
    return nativeBindings
  }

  let bindings
  let attempts = []

  for (const triple of triples) {
    try {
      bindings = require(`@jujutsu/discord/native/jujutsu-discord.${triple.platformArchABI}.node`)
      Log.info('Using locally built binary of @jujutsu/discord')
      break
    } catch (e) {}
  }

  if (!bindings) {
    for (const triple of triples) {
      let pkg = `@jujutsu/discord-${triple.platformArchABI}`
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
    nativeBindings = {
      isWasm: false,
    }
    return nativeBindings
  }

  throw attempts
}

export async function isWasm() {
  let bindings = await loadBindings()
  return bindings.isWasm
}

export async function createClient(options) {
  let bindings = await loadBindings()
  return bindings.createClient(options)
}

export function createClientSync() {
  let bindings = loadBindingsSync()
  return bindings.createClientSync()
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
