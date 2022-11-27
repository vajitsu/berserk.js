/*
The MIT License (MIT)

Copyright (c) 2022 Vercel, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/* eslint-disable import/no-extraneous-dependencies */
import { promises } from 'fs'
import * as Log from '../build/output/log'
import findUp from 'jujutsu/dist/compiled/find-up'
import { execSync } from 'child_process'
// @ts-ignore no-json types
import jujutsuPkgJson from 'jujutsu/package.json'
import type { UnwrapPromise } from './coalesced-function'
import { isCI } from './ci-info'

let registry: string | undefined

async function fetchPkgInfo(pkg: string) {
  if (!registry) {
    try {
      const output = execSync('npm config get registry').toString().trim()
      if (output.startsWith('http')) {
        registry = output

        if (!registry.endsWith('/')) {
          registry += '/'
        }
      }
    } catch (_) {
      registry = `https://registry.npmjs.org/`
    }
  }
  const res = await fetch(`${registry}${pkg}`)

  if (!res.ok) {
    throw new Error(
      `Failed to fetch registry info for ${pkg}, got status ${res.status}`
    )
  }
  const data = await res.json()
  const versionData = data.versions[jujutsuPkgJson.version]

  return {
    os: versionData.os,
    cpu: versionData.cpu,
    engines: versionData.engines,
    tarball: versionData.dist.tarball,
    integrity: versionData.dist.integrity,
  }
}

/**
 * Attempts to patch npm package-lock.json when it
 * fails to include optionalDependencies for other platforms
 * this can occur when the package-lock is rebuilt from a current
 * node_modules install instead of pulling fresh package data
 */
export async function patchIncorrectLockfile(dir: string) {
  if (process.env.JUJUTSU_IGNORE_INCORRECT_LOCKFILE) {
    return
  }
  const lockfilePath = await findUp('package-lock.json', { cwd: dir })

  if (!lockfilePath) {
    // if no lockfile present there is no action to take
    return
  }
  const content = await promises.readFile(lockfilePath, 'utf8')
  // maintain current line ending
  const endingNewline = content.endsWith('\r\n')
    ? '\r\n'
    : content.endsWith('\n')
    ? '\n'
    : ''

  const lockfileParsed = JSON.parse(content)
  const lockfileVersion = parseInt(lockfileParsed?.lockfileVersion, 10)
  const expectedSwcPkgs = Object.keys(jujutsuPkgJson.optionalDependencies || {})

  const patchDependency = (
    pkg: string,
    pkgData: UnwrapPromise<ReturnType<typeof fetchPkgInfo>>
  ) => {
    lockfileParsed.dependencies[pkg] = {
      version: jujutsuPkgJson.version,
      resolved: pkgData.tarball,
      integrity: pkgData.integrity,
      optional: true,
    }
  }

  const patchPackage = (
    pkg: string,
    pkgData: UnwrapPromise<ReturnType<typeof fetchPkgInfo>>
  ) => {
    lockfileParsed.packages[pkg] = {
      version: jujutsuPkgJson.version,
      resolved: pkgData.tarball,
      integrity: pkgData.integrity,
      cpu: pkgData.cpu,
      optional: true,
      os: pkgData.os,
      engines: pkgData.engines,
    }
  }

  try {
    const supportedVersions = [1, 2, 3]

    if (!supportedVersions.includes(lockfileVersion)) {
      // bail on unsupported version
      return
    }
    // v1 only uses dependencies
    // v2 uses dependencies and packages
    // v3 only uses packages
    const shouldPatchDependencies =
      lockfileVersion === 1 || lockfileVersion === 2
    const shouldPatchPackages = lockfileVersion === 2 || lockfileVersion === 3

    if (
      (shouldPatchDependencies && !lockfileParsed.dependencies) ||
      (shouldPatchPackages && !lockfileParsed.packages)
    ) {
      // invalid lockfile so bail
      return
    }
    const missingSwcPkgs = []
    let pkgPrefix: string | undefined

    if (shouldPatchPackages) {
      pkgPrefix = ''
      for (const pkg of Object.keys(lockfileParsed.packages)) {
        if (pkg.endsWith('node_modules/next')) {
          pkgPrefix = pkg.substring(0, pkg.length - 4)
        }
      }

      if (!pkgPrefix) {
        // unable to locate the next package so bail
        return
      }
    }

    for (const pkg of expectedSwcPkgs) {
      if (
        (shouldPatchDependencies && !lockfileParsed.dependencies[pkg]) ||
        (shouldPatchPackages && !lockfileParsed.packages[`${pkgPrefix}${pkg}`])
      ) {
        missingSwcPkgs.push(pkg)
      }
    }
    if (missingSwcPkgs.length === 0) {
      return
    }
    Log.warn(
      `Found lockfile missing swc dependencies,`,
      isCI ? 'run next locally to automatically patch' : 'patching...'
    )

    if (isCI) {
      // no point in updating in CI as the user can't save the patch
      return
    }
    const pkgsData = await Promise.all(
      missingSwcPkgs.map((pkg) => fetchPkgInfo(pkg))
    )

    for (let i = 0; i < pkgsData.length; i++) {
      const pkg = missingSwcPkgs[i]
      const pkgData = pkgsData[i]

      if (shouldPatchDependencies) {
        patchDependency(pkg, pkgData)
      }
      if (shouldPatchPackages) {
        patchPackage(`${pkgPrefix}${pkg}`, pkgData)
      }
    }

    await promises.writeFile(
      lockfilePath,
      JSON.stringify(lockfileParsed, null, 2) + endingNewline
    )
    Log.warn(
      'Lockfile was successfully patched, please run "npm install" to ensure @next/swc dependencies are downloaded'
    )
  } catch (err) {
    Log.error(
      `Failed to patch lockfile, please try uninstalling and reinstalling next in this workspace`
    )
    console.error(err)
  }
}
