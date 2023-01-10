import { join } from 'path'
import { findDir } from '../lib/find-dirs'

import BaseServer from './base-server'
import * as Log from '../build/output/log'
import { loadEnvConfig } from '../lib/env'
import { APP_PATHS_MANIFEST, SERVER_DIRECTORY } from '../lib/constants'
import { AppManifest } from './require'

export * from './base-server'

export default class JujutsuNodeServer extends BaseServer {
  serverDistDir = join(this.distDir, SERVER_DIRECTORY)

  protected loadEnvConfig({
    dev,
    forceReload,
  }: {
    dev: boolean
    forceReload?: boolean
  }) {
    loadEnvConfig(this.dir, dev, Log, forceReload)
  }

  protected getAppPathsManifest(): AppManifest | undefined {
    if (this.hasAppDir) {
      const appPathsManifestPath = join(this.serverDistDir, APP_PATHS_MANIFEST)
      return require(appPathsManifestPath)
    }
  }

  protected getHasAppDir(dev: boolean): boolean {
    return Boolean(findDir(dev ? this.dir : this.serverDistDir, 'app'))
  }
}
