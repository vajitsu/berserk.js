#!/usr/bin/env node
/* Based on https://github.com/vercel/next.js/blob/canary/packages/next/bin/next.ts */
import { commands } from '../lib/commands'
import * as log from '../build/output/log'
import arg from 'arg'
;['discord.js'].forEach((dependency) => {
  try {
    // When 'npm link' is used it checks the clone location. Not the project.
    require.resolve(dependency)
  } catch (err) {
    console.warn(
      `The module '${dependency}' was not found. Jujutsu.js requires that you include it in 'dependencies' of your 'package.json'. To add it, run 'npm install ${dependency}'`
    )
  }
})

const defaultCommand = 'dev'
const args = arg(
  {
    // Types
    '--version': Boolean,
    '--help': Boolean,
    '--inspect': Boolean,

    // Aliases
    '-v': '--version',
    '-h': '--help',
  },
  {
    permissive: true,
  }
)

if (args['--version']) {
  console.log(`Jujutsu.js v${process.env.__JUJUTSU_VERSION}`)
  process.exit(0)
}

const foundCommand = Boolean(commands[args._[0]])

// Makes sure the `jujutsu --help` case is covered
// This help message is only showed for `jujutsu --help`
// `jujutsu <subcommand> --help` falls through to be handled later
if (!foundCommand && args['--help']) {
  console.log(`
    Usage
      $ jujutsu <command>
    Available commands
      ${Object.keys(commands).join(', ')}
    Options
      --version, -v   Version number
      --help, -h      Displays this message
    For more information run a command with the --help flag
      $ jujutsu build --help
  `)
  process.exit(0)
}

const command = foundCommand ? args._[0] : defaultCommand
const forwardedArgs = foundCommand ? args._.slice(1) : args._

// Make sure the `next <subcommand> --help` case is covered
if (args['--help']) {
  forwardedArgs.push('--help')
}

const defaultEnv = command === 'dev' ? 'development' : 'production'

const standardEnv = ['production', 'development', 'test']

if (process.env.NODE_ENV) {
  const isNotStandard = !standardEnv.includes(process.env.NODE_ENV)
  const shouldWarnCommands =
    process.env.NODE_ENV === 'development'
      ? ['start', 'build']
      : process.env.NODE_ENV === 'production'
      ? ['dev']
      : []

  if (isNotStandard || shouldWarnCommands.includes(command)) {
    log.warn(
      `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against.`
    )
  }
}

;(process.env as any).NODE_ENV = process.env.NODE_ENV || defaultEnv
;(process.env as any).JUJUTSU_RUNTIME = 'nodejs'

if (process.versions.pnp === '3') {
  const nodeVersionParts = process.versions.node
    .split('.')
    .map((v) => Number(v))

  if (
    nodeVersionParts[0] < 16 ||
    (nodeVersionParts[0] === 16 && nodeVersionParts[1] < 14)
  ) {
    log.warn(
      'Node.js 16.14+ is required for Yarn PnP 3.20+. More info: https://github.com/vercel/next.js/pull/34688#issuecomment-1047994505'
    )
  }
}

commands[command]()
  .then((exec) => exec(forwardedArgs))
  .then(() => {
    if (command === 'build') {
      // ensure process exits after build completes so open handles/connections
      // don't cause process to hang
      process.exit(0)
    }
  })
