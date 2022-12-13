#!/usr/bin/env node

const path = require('path')
const execa = require('execa')
const { copy } = require('fs-extra')
const { Sema } = require('async-sema')
const { readFile, readdir, writeFile } = require('fs/promises')

const cwd = process.cwd()

;(async function () {
  try {
    const publishSema = new Sema(2)

    let version = JSON.parse(
      await readFile(path.join(cwd, 'lerna.json'))
    ).version

    // Copy binaries to package folders, update version, and publish
    let nativePackagesDir = path.join(cwd, 'packages/jujutsu-discord/npm')
    let platforms = (await readdir(nativePackagesDir)).filter(
      (name) => !name.startsWith('.')
    )

    await Promise.all(
      platforms.map(async (platform) => {
        await publishSema.acquire()

        try {
          let binaryName = `jujutsu-discord.${platform}.node`
          await copy(
            path.join(cwd, 'packages/jujutsu-discord/native', binaryName),
            path.join(nativePackagesDir, platform, binaryName)
          )
          let pkg = JSON.parse(
            await readFile(
              path.join(nativePackagesDir, platform, 'package.json')
            )
          )
          pkg.version = version
          await writeFile(
            path.join(nativePackagesDir, platform, 'package.json'),
            JSON.stringify(pkg, null, 2)
          )
          await execa(
            `npm`,
            [
              `publish`,
              `${path.join(nativePackagesDir, platform)}`,
              `--access`,
              `public`,
              ...(version.includes('canary') ? ['--tag', 'canary'] : []),
            ],
            { stdio: 'inherit' }
          )
        } catch (err) {
          // don't block publishing other versions on single platform error
          console.error(`Failed to publish`, platform, err)

          if (
            err.message &&
            err.message.includes(
              'You cannot publish over the previously published versions'
            )
          ) {
            console.error('Ignoring already published error', platform, err)
          } else {
            // throw err
          }
        } finally {
          publishSema.release()
        }
        // lerna publish in next step sill fail if git status is not clean
        await execa(
          `git`,
          [
            'update-index',
            '--skip-worktree',
            `${path.join(nativePackagesDir, platform, 'package.json')}`,
          ],
          { stdio: 'inherit' }
        )
      })
    )

    // Update optional dependencies versions
    let nextPkg = JSON.parse(
      await readFile(path.join(cwd, 'packages/jujutsu/package.json'))
    )
    for (let platform of platforms) {
      let optionalDependencies = nextPkg.optionalDependencies || {}
      optionalDependencies['@jujutsu/discord-' + platform] = version
      nextPkg.optionalDependencies = optionalDependencies
    }
    await writeFile(
      path.join(path.join(cwd, 'packages/jujutsu/package.json')),
      JSON.stringify(nextPkg, null, 2)
    )
    // lerna publish in next step will fail if git status is not clean
    await execa(
      'git',
      ['update-index', '--skip-worktree', 'packages/next/package.json'],
      {
        stdio: 'inherit',
      }
    )
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
