import { isPlainObject } from './is-plain-object'

// We allow some additional attached properties for Errors
export interface JujutsuError extends Error {
  type?: string
  from?: string
  code?: string | number
  cancelled?: boolean
}

export default function isError(err: unknown): err is JujutsuError {
  return (
    typeof err === 'object' && err !== null && 'name' in err && 'message' in err
  )
}

export function getProperError(err: unknown): Error {
  if (isError(err)) {
    return err
  }

  if (process.env.NODE_ENV === 'development') {
    // provide better error for case where `throw undefined`
    // is called in development
    if (typeof err === 'undefined') {
      return new Error(
        'An undefined error was thrown, ' +
          'please report the issue here: https://github.com/vajitsu/jujutsu.js/issues'
      )
    }

    if (err === null) {
      return new Error(
        'A null error was thrown, ' +
          'please report the issue here: https://github.com/vajitsu/jujutsu.js/issues'
      )
    }
  }

  return new Error(isPlainObject(err) ? JSON.stringify(err) : err + '')
}
