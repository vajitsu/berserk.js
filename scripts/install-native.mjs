import os from 'os'
import path from 'path'
import execa from 'execa'
import fs from 'fs-extra'
;(async function () {
  if (process.env.JUJUTSU_SKIP_NATIVE_POSTINSTALL) {
    console.log(
      `Skipping jujutsu-swc postinstall due to JUJUTSU_SKIP_NATIVE_POSTINSTALL env`
    )
    return
  }
  let cwd = process.cwd()
  const { version: jujutsuVersion } = await fs.readJSON(
    path.join(cwd, 'packages', 'jujutsu', 'package.json')
  )

  try {
    // if installed swc package version matches monorepo version
    // we can skip re-installing
    for (const pkg of await fs.readdir(
      path.join(cwd, 'node_modules', '@jujutsu')
    )) {
      if (
        pkg.startsWith('discord-') &&
        (
          await fs.readJSON(
            path.join(cwd, 'node_modules', '@jujutsu', pkg, 'package.json')
          )
        ).version === jujutsuVersion
      ) {
        console.log(`@jujutsu/${pkg}@${jujutsuVersion} already installed skipping`)
        return
      }
    }
  } catch (_) {}

  try {
    let tmpdir = path.join(os.tmpdir(), `jujutsu-discord-${Date.now()}`)
    await fs.ensureDir(tmpdir)
    let pkgJson = {
      name: 'dummy-package',
      version: '1.0.0',
      optionalDependencies: {
        '@jujutsu/discord-android-arm64': 'canary',
        '@jujutsu/discord-android-arm-eabi': 'canary',
        '@jujutsu/discord-darwin-arm64': 'canary',
        '@jujutsu/discord-darwin-x64': 'canary',
        '@jujutsu/discord-linux-arm-gnueabihf': 'canary',
        '@jujutsu/discord-linux-arm64-gnu': 'canary',
        '@jujutsu/discord-linux-arm64-musl': 'canary',
        '@jujutsu/discord-linux-x64-gnu': 'canary',
        '@jujutsu/discord-linux-x64-musl': 'canary',
        '@jujutsu/discord-win32-arm64-msvc': 'canary',
        '@jujutsu/discord-win32-ia32-msvc': 'canary',
        '@jujutsu/discord-win32-x64-msvc': 'canary',
      },
    }
    await fs.writeFile(
      path.join(tmpdir, 'package.json'),
      JSON.stringify(pkgJson)
    )
    let { stdout } = await execa('pnpm', ['--force', 'i'], { cwd: tmpdir })
    console.log(stdout)
    let pkgs = await fs.readdir(path.join(tmpdir, 'node_modules/@jujutsu'))
    await fs.ensureDir(path.join(cwd, 'node_modules/@jujutsu'))

    await Promise.all(
      pkgs.map((pkg) =>
        fs.move(
          path.join(tmpdir, 'node_modules/@jujutsu', pkg),
          path.join(cwd, 'node_modules/@jujutsu', pkg),
          { overwrite: true }
        )
      )
    )
    await fs.remove(tmpdir)
    console.log('Installed the following binary packages:', pkgs)
  } catch (e) {
    console.error(e)
    console.error('Failed to load @jujutsu/discord binary packages')
  }
})()