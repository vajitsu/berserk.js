import { platform, arch } from 'os'
import { platformArchTriples } from 'jujutsu/dist/compiled/@napi-rs/triples'
import * as Log from 'jujutsu/dist/build/output/log'

const ArchName = arch()
const PlatformName = platform()
const triples = platformArchTriples[PlatformName][ArchName] || []

let nativeBindings
let pendingBindings
export const lockfilePatchPromise = {}

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
      bindings = require(`./native/jujutsu-discord.${triple.platformArchABI}.node`)
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
    nativeBindings = bindings
    return nativeBindings
  }

  throw attempts
}

export async function loadBindings() {
  if (pendingBindings) {
    return pendingBindings
  }
  pendingBindings = new Promise(async (resolve, _reject) => {
    let attempts = []

    try {
      return resolve(loadNative())
    } catch (a) {
      attempts = attempts.concat(a)
    }

    logLoadFailure(attempts)
  })
  return pendingBindings
}
