#!/usr/bin/env node

import arg from 'jujutsu/dist/compiled/arg/index.js'
import startServer from '../client/lib/start-server'
import * as Log from '../build/output/log'
import isError from '../lib/is-error'
import { getProjectDir } from '../lib/get-project-dir'
import { cliCommand } from '../lib/commands'
import { printAndExit } from '../lib/utils'
import { PHASE_PRODUCTION_SERVER } from '../lib/constants'
import loadConfig from '../client/config'

const jujutsuStart: cliCommand = async (argv) => {
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
    console.log(`
      Description
        Starts the application in production mode.
        The application should be compiled with \`jujutsu build\` first.
      Usage
        $ jujutsu start <dir>
      <dir> represents the directory of the Jujutsu.js application.
      If no directory is provided, the current directory will be used.
      Options
        --help, -h      Displays this message
    `)
    process.exit(0)
  }

  const dir = getProjectDir(args._[0])
  const conf = await loadConfig(PHASE_PRODUCTION_SERVER, dir)

  startServer({
      dir,
      conf
  }).catch((err: any) => {
    console.error(err)
    process.exit(1)
  })
}

export { jujutsuStart }
