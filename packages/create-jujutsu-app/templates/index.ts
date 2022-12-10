import { install } from '../helpers/install'

import cpy from 'cpy'
import os from 'os'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

import { GetTemplateFileArgs, InstallTemplateArgs } from './types'

// @ts-ignore
import { platformArchTriples } from 'jujutsu/dist/compiled/@napi-rs/triples'
import { platform, arch } from 'os'

const ArchName = arch()
const PlatformName = platform()
const triples = platformArchTriples[PlatformName][ArchName] || []

/**
 * Get the file path for a given file in a template, e.g. "jujutsu.config.js".
 */
export const getTemplateFile = ({
  template,
  mode,
  file,
}: GetTemplateFileArgs): string => {
  return path.join(__dirname, template, mode, file)
}

/**
 * Install a Jujutsu.js internal template to a given `root` directory.
 */
export const installTemplate = async ({
  appName,
  root,
  packageManager,
  isOnline,
  template,
  mode,
  eslint,
}: InstallTemplateArgs) => {
  console.log(chalk.bold(`Using ${packageManager}.`))

  /**
   * Create a package.json for the new project.
   */
  const packageJson = {
    name: appName,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'jujutsu dev',
      build: 'jujutsu build',
      start: 'jujutsu start',
    },
  }
  /**
   * Write it to disk.
   */
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  )
  /**
   * These flags will be passed to `install()`, which calls the package manager
   * install process.
   */
  const installFlags = { packageManager, isOnline }
  /**
   * Default dependencies.
   */
  const dependencies = ['discord.js', 'jujutsu']
  /**
   * TypeScript projects will have type definitions and other devDependencies.
   */
  if (mode === 'ts') {
    dependencies.push('typescript', '@types/node')
  }

  /**
   * Default eslint dependencies.
   */
  /*if (eslint) {
    dependencies.push('eslint', 'eslint-config-jujutsu')
  }/*

  /**
   * Install package.json dependencies if they exist.
   */
  if (dependencies.length) {
    console.log()
    console.log('Installing dependencies:')
    for (const dependency of dependencies) {
      console.log(`- ${chalk.cyan(dependency)}`)
    }
    console.log()

    await install(root, dependencies, installFlags)
  }
  /**
   * Copy the template files to the target directory.
   */
  console.log('\nInitializing project with template:', template, '\n')
  const templatePath = path.join(__dirname, template, mode)
  await cpy('**', root, {
    parents: true,
    cwd: templatePath,
    rename: (name) => {
      switch (name) {
        case 'gitignore':
        case 'eslintrc.json': {
          return '.'.concat(name)
        }
        // README.md is ignored by webpack-asset-relocator-loader used by ncc:
        // https://github.com/vercel/webpack-asset-relocator-loader/blob/e9308683d47ff507253e37c9bcbb99474603192b/src/asset-relocator.js#L227
        case 'README-template.md': {
          return 'README.md'
        }
        default: {
          return name
        }
      }
    },
  })

  if (!eslint) {
    // remove un-necessary template file if eslint is not desired
    // await fs.promises.unlink(path.join(root, '.eslintrc.json'))
  }
}

export * from './types'
