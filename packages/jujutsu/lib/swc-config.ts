import { fileExists } from './file-exists';
import Discord from 'discord.js';
import Swc from '@swc/core';
import path from 'path';

if (parseInt(Discord.version) < 14) {
  throw new Error('Jujutsu.js requires discord.js >= 14.6.0 to be installed.');
}

const SWC_CONFIG_FILES = ['.swcrc'];

export const getSwcConfigFile = async (dir: string) => {
  const swcConfigFile = await SWC_CONFIG_FILES.reduce(
    async (memo: Promise<string | undefined>, filename) => {
      const configFilePath = path.join(dir, filename);
      return (
        (await memo) ||
        ((await fileExists(configFilePath)) ? configFilePath : undefined)
      );
    },
    Promise.resolve(undefined),
  );
  return swcConfigFile;
};

export default async function getBaseSwcConfig({
  dev = false,
  typescript = false,
}: {
  dev?: boolean;
  typescript?: boolean;
}) {
  var Base = {
    module: {
      type: 'commonjs',
      noInterop: false,
      strict: true,
      strictMode: true,
    } as Swc.CommonJsConfig,
    jsc: {
      target: 'es2020',
    } as Swc.JscConfig,
    test: '.(js|ts|json)$',
    sourceMaps: undefined as Swc.Config['sourceMaps'],
  };

  dev = Boolean(dev);
  typescript = Boolean(typescript);

  if (dev) {
    Base.jsc.keepClassNames = true;
    Base.sourceMaps = false;
    Base.module.lazy = true;
    Base.module.allowTopLevelThis = true;
    Base.jsc.experimental = {
      cacheRoot: '.jujutsu',
      keepImportAssertions: true,
      optimizeHygiene: true,
    };
  } else if (!dev) {
    Base.module.lazy = false;
    Base.module.allowTopLevelThis = false;
    Base.jsc.keepClassNames = false;
    Base.jsc.externalHelpers = false;
    Base.jsc.minify = {
      compress: false,
      mangle: true,
      keep_classnames: false,
      keep_fnames: false,
    };
  }

  if (typescript) {
    Base.jsc.parser = {
      syntax: 'typescript',
      tsx: false,
    };
  } else if (!typescript) {
    Base.jsc.parser = {
      syntax: 'ecmascript',
      jsx: false,
      importAssertions: true,
      functionBind: true,
    };
  }

  return Base;
}
