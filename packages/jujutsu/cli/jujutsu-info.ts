#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */
import os from 'os'
import childProcess from 'child_process'

import chalk from 'jujutsu/dist/compiled/chalk'
import arg from 'jujutsu/dist/compiled/arg/index.js'
import fetch from 'jujutsu/dist/compiled/node-fetch'
import { printAndExit } from '../server/lib/utils'
import { cliCommand } from '../lib/commands'
import isError from '../lib/is-error'

function getPackageVersion(packageName: string) {
  try {
    return require(`${packageName}/package.json`).version
  } catch {
    return 'N/A'
  }
}

function getBinaryVersion(binaryName: string) {
  try {
    return childProcess
      .execFileSync(binaryName, ['--version'], {
        shell:
          process.platform === 'win32'
            ? 'C:\\Windows\\SysWOW64\\WindowsPowerShell\\v1.0\\powershell.exe'
            : undefined,
      })
      .toString()
      .trim()
  } catch {
    return 'N/A'
  }
}

const jujutsuInfo: cliCommand = async (argv) => {
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
    console.log(
      `
      Description
        Prints relevant details about the current system which can be used to report Jujutsu.js bugs
        
      Usage
        $ jujutsu info
      Learn more: ${chalk.cyan(
        'https://vajitsu.com/jujutsu/docs/api-reference/cli#info'
      )}`
    )
    return
  }

  const installedRelease = getPackageVersion('jujutsu')

  console.log(`
    Operating System:
      Platform: ${os.platform()}
      Arch: ${os.arch()}
      Version: ${os.version()}
    Binaries:
      Node: ${process.versions.node}
      npm: ${getBinaryVersion('npm')}
      Yarn: ${getBinaryVersion('yarn')}
      pnpm: ${getBinaryVersion('pnpm')}
    Relevant packages:
      jujutsu: ${installedRelease}
      discord.js: ${getPackageVersion('discord.js')}
`)

  try {
    const res = await fetch(
      'https://api.github.com/repos/vajitsu/jujutsu.js/releases'
    )
    const releases = (await res.json()) as any
    const newestRelease = releases[0].tag_name.replace(/^v/, '')

    if (installedRelease !== newestRelease) {
      console.warn(
        `${chalk.yellow(
          chalk.bold('warn')
        )}  - Latest canary version not detected, detected: "${installedRelease}", newest: "${newestRelease}".
        Please try the latest canary version (\`npm install jujutsu@canary\`) to confirm the issue still exists before creating a new issue.
        ${
          /*Read more - https://vajitsu.com/jujutsu/docs/messages/opening-an-issue*/ ''
        }`
      )
    }
  } catch (e) {
    console.warn(
      `${chalk.yellow(
        chalk.bold('warn')
      )}  - Failed to fetch latest canary version. (Reason: ${
        (e as Error).message
      }.)
      Detected "${installedRelease}". Visit https://github.com/vajitsu/jujutsu.js/releases.
      Make sure to try the latest canary version (eg.: \`npm install jujutsu@canary\`) to confirm the issue still exists before creating a new issue.
      ${
        /*Read more - https://vajitsu.com/jujutsu/docs/messages/opening-an-issue*/ ''
      }`
    )
  }
}

export { jujutsuInfo }
