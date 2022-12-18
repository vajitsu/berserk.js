#!/usr/bin/env node
import { getProjectDir } from '../lib/get-project-dir'
import { cliCommand } from '../lib/commands'
import { printAndExit } from '../lib/utils'
import isError from '../lib/is-error'
import { existsSync } from 'fs'
import build from '../build'
// eslint-disable-next-line import/no-extraneous-dependencies
import arg from 'berserk/dist/compiled/arg/index.js'

const jujutsuBuild: cliCommand = (argv) => {
  const validArgs: arg.Spec = {
    // Types
    '--help': Boolean,
    // Aliases
    '-h': '--help',
  }

  let args: arg.Result<arg.Spec>
  try {
    args = arg(validArgs, { argv })
  } catch (error) {
    if (isError(error) && error.code === 'ARG_UNKNOWN_OPTION') {
      return printAndExit(error.message, 1)
    }
    throw error
  }
  if (args['--help']) {
    printAndExit(
      `
      Description
        Compiles the application for production deployment
      Usage
        $ berserk build <dir>
      <dir> represents the directory of the Berserk.js application.
      If no directory is provided, the current directory will be used.
    `,
      0
    )
  }
  const dir = getProjectDir(args._[0])

  // Check if the provided directory exists
  if (!existsSync(dir)) {
    printAndExit(`> No such directory exists as the project root: ${dir}`)
  }

  return build(dir, null).catch((err) => {
    console.error('')
    if (
      isError(err) &&
      (err.code === 'INVALID_RESOLVE_ALIAS' ||
        err.code === 'WEBPACK_ERRORS' ||
        err.code === 'BUILD_OPTIMIZATION_FAILED' ||
        err.code === 'EDGE_RUNTIME_UNSUPPORTED_API')
    ) {
      printAndExit(`> ${err.message}`)
    } else {
      console.error('> Build error occurred')
      printAndExit(err)
    }
  })
}

export { jujutsuBuild }
