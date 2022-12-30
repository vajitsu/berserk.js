const { relative, join } = require('path')
// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs-extra')

require('taskr')

const externals = {
  'node-fetch': 'node-fetch',
}

// eslint-disable-next-line camelcase
externals['node-fetch'] = 'jujutsu/dist/compiled/node-fetch'
export async function ncc_node_fetch(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('node-fetch')))
    .ncc({ packageName: 'node-fetch', externals })
    .target('compiled/node-fetch')
}
// eslint-disable-next-line camelcase
externals['zod'] = 'jujutsu/dist/compiled/zod'
export async function ncc_zod(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('zod')))
    .ncc({ packageName: 'zod', externals })
    .target('compiled/zod')
}
// eslint-disable-next-line camelcase
externals['nanoid'] = 'jujutsu/dist/compiled/nanoid'
export async function ncc_nanoid(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('nanoid')))
    .ncc({ packageName: 'nanoid', externals })
    .target('compiled/nanoid')
}
// eslint-disable-next-line camelcase
externals['title'] = 'jujutsu/dist/compiled/title'
export async function ncc_title(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('title')))
    .ncc({ packageName: 'title', externals })
    .target('compiled/title')
}
// eslint-disable-next-line camelcase
externals['fs-extra'] = 'jujutsu/dist/compiled/fs-extra'
export async function ncc_fs_extra(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('fs-extra')))
    .ncc({ packageName: 'fs-extra', externals })
    .target('compiled/fs-extra')
}
// eslint-disable-next-line camelcase
externals['gradient-string'] = 'jujutsu/dist/compiled/gradient-string'
export async function ncc_gradient_string(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('gradient-string')))
    .ncc({ packageName: 'gradient-string', externals })
    .target('compiled/gradient-string')
}
externals['dotenv'] = 'jujutsu/dist/compiled/dotenv'
export async function ncc_dotenv(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('dotenv')))
    .ncc({ packageName: 'dotenv', externals })
    .target('compiled/dotenv')
}
externals['dotenv-expand'] = 'jujutsu/dist/compiled/dotenv-expand'
export async function ncc_dotenv_expand(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('dotenv-expand')))
    .ncc({ packageName: 'dotenv-expand', externals })
    .target('compiled/dotenv-expand')
}
// eslint-disable-next-line camelcase
externals['chalk'] = 'jujutsu/dist/compiled/chalk'
export async function ncc_chalk(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('chalk')))
    .ncc({ packageName: 'chalk', externals })
    .target('compiled/chalk')
}
// eslint-disable-next-line camelcase
externals['discord.js'] = 'jujutsu/dist/compiled/discord.js'
export async function ncc_discordjs(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('discord.js')))
    .ncc({ packageName: 'discord.js', externals })
    .target('compiled/discord.js')
}
// eslint-disable-next-line camelcase
externals['watchpack'] = 'jujutsu/dist/compiled/watchpack'
export async function ncc_watchpack(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('watchpack')))
    .ncc({ packageName: 'watchpack', externals })
    .target('compiled/watchpack')
}
// eslint-disable-next-line camelcase
externals['fflate'] = 'jujutsu/dist/compiled/fflate'
export async function ncc_fflate(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('fflate')))
    .ncc({ packageName: 'fflate', externals })
    .target('compiled/fflate')
}
export async function ncc_events(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('events/')))
    .ncc({
      packageName: 'events',
      externals,
      mainFields: ['browser', 'main'],
      target: 'es5',
    })
    .target('compiled/events')
}
// eslint-disable-next-line camelcase
externals['arg'] = 'jujutsu/dist/compiled/arg'
export async function ncc_arg(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('arg')))
    .ncc({ packageName: 'arg' })
    .target('compiled/arg')
}
// eslint-disable-next-line camelcase
externals['ci-info'] = 'jujutsu/dist/compiled/ci-info'
export async function ncc_ci_info(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('ci-info')))
    .ncc({ packageName: 'ci-info', externals })
    .target('compiled/ci-info')
}
// eslint-disable-next-line camelcase
externals['@vercel/nft'] = 'jujutsu/dist/compiled/@vercel/nft'
export async function ncc_nft(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('@vercel/nft')))
    .ncc({ packageName: '@vercel/nft', externals })
    .target('compiled/@vercel/nft')
}
// eslint-disable-next-line camelcase
externals['@napi-rs/triples'] = 'jujutsu/dist/compiled/@napi-rs/triples'
export async function ncc_napirs_triples(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('@napi-rs/triples'))
    )
    .ncc({ packageName: '@napi-rs/triples', externals })
    .target('compiled/@napi-rs/triples')
}
// eslint-disable-next-line camelcase
externals['unistore'] = 'jujutsu/dist/compiled/unistore'
export async function ncc_unistore(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('unistore')))
    .ncc({ packageName: 'unistore', externals })
    .target('compiled/unistore')
}
// eslint-disable-next-line camelcase
externals['strip-ansi'] = 'jujutsu/dist/compiled/strip-ansi'
export async function ncc_strip_ansi(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('strip-ansi')))
    .ncc({ packageName: 'strip-ansi', externals })
    .target('compiled/strip-ansi')
}
// eslint-disable-next-line camelcase
externals['lodash'] = 'jujutsu/dist/compiled/lodash'
export async function ncc_lodash(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('lodash')))
    .ncc({ packageName: 'lodash', externals })
    .target('compiled/lodash')
}
// eslint-disable-next-line camelcase
externals['cross-spawn'] = 'jujutsu/dist/compiled/cross-spawn'
export async function ncc_cross_spawn(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('cross-spawn')))
    .ncc({ packageName: 'cross-spawn', externals })
    .target('compiled/cross-spawn')
}
// eslint-disable-next-line camelcase
externals['semver'] = 'jujutsu/dist/compiled/semver'
export async function ncc_semver(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('semver')))
    .ncc({ packageName: 'semver', externals })
    .target('compiled/semver')
}
// eslint-disable-next-line camelcase
externals['find-cache-dir'] = 'jujutsu/dist/compiled/find-cache-dir'
export async function ncc_find_cache_dir(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('find-cache-dir')))
    .ncc({ packageName: 'find-cache-dir', externals })
    .target('compiled/find-cache-dir')
}
// eslint-disable-next-line camelcase
externals['ws'] = 'jujutsu/dist/compiled/ws'
export async function ncc_ws(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('ws')))
    .ncc({ packageName: 'ws', externals })
    .target('compiled/ws')
}
// eslint-disable-next-line camelcase
externals['find-up'] = 'jujutsu/dist/compiled/find-up'
export async function ncc_find_up(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('find-up')))
    .ncc({ packageName: 'find-up', externals })
    .target('compiled/find-up')
}
// eslint-disable-next-line camelcase
externals['json5'] = 'jujutsu/dist/compiled/json5'
export async function ncc_json5(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('json5')))
    .ncc({ packageName: 'json5', externals })
    .target('compiled/json5')
}
// eslint-disable-next-line camelcase
externals['require-from-string'] = 'jujutsu/dist/compiled/require-from-string'
export async function ncc_require_from_string(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('require-from-string'))
    )
    .ncc({ packageName: 'require-from-string', externals })
    .target('compiled/require-from-string')
}
// eslint-disable-next-line camelcase
externals['ora'] = 'jujutsu/dist/compiled/ora'
export async function ncc_ora(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('ora')))
    .ncc({ packageName: 'ora', externals })
    .target('compiled/ora')
}
// eslint-disable-next-line camelcase
export async function ncc_segment_ajv_human_errors(task, opts) {
  await task
    .source(
      opts.src ||
        relative(__dirname, require.resolve('@segment/ajv-human-errors/'))
    )
    .ncc({
      packageName: '@segment/ajv-human-errors/',
      externals,
    })
    .target('compiled/@segment/ajv-human-errors')
}

// eslint-disable-next-line camelcase
export async function compile_config_schema(task, opts) {
  const { configSchema } = require('./dist/server/config-schema')
  // eslint-disable-next-line
  const Ajv = require('ajv')
  // eslint-disable-next-line
  const standaloneCode = require('ajv/dist/standalone').default
  // eslint-disable-next-line
  const ajv = new Ajv({
    code: { source: true },
    allErrors: true,
    verbose: true,
  })

  // errorMessage keyword will be consumed by @segment/ajv-human-errors to provide a custom error message
  ajv.addKeyword('errorMessage')

  ajv.addKeyword({
    keyword: 'isFunction',
    schemaType: 'boolean',
    compile() {
      return (data) => data instanceof Function
    },
    code(ctx) {
      const { data } = ctx
      ctx.fail(Ajv._`!(${data} instanceof Function)`)
    },
    metaSchema: {
      anyOf: [{ type: 'boolean' }],
    },
  })

  const compiled = ajv.compile(configSchema)
  const validateCode = standaloneCode(ajv, compiled)
  const preNccFilename = join(__dirname, 'dist', 'jujutsu-config-validate.js')
  await fs.writeFile(preNccFilename, validateCode)
  await task
    .source(opts.src || './dist/jujutsu-config-validate.js')
    .ncc({})
    .target('dist/jujutsu-config-validate')

  await fs.unlink(preNccFilename)
  await fs.rename(
    join(__dirname, 'dist/jujutsu-config-validate/jujutsu-config-validate.js'),
    join(__dirname, 'dist/jujutsu-config-validate.js')
  )
  await fs.rmdir(join(__dirname, 'dist/jujutsu-config-validate'))
}

export async function bin(task, opts) {
  await task
    .source(opts.src || 'bin/*')
    .swc('server', { stripExtension: true, dev: opts.dev })
    .target('dist/bin', { mode: '0755' })
  notify('Compiled binaries')
}

export async function cli(task, opts) {
  await task
    .source('cli/**/*.+(js|ts|tsx)')
    .swc('server', { dev: opts.dev })
    .target('dist/cli')
  notify('Compiled cli files')
}

export async function client(task, opts) {
  await task
    .source(opts.src || 'client/**/*.+(js|ts|tsx)')
    .swc('client', { dev: opts.dev, interopClientDefaultExport: true })
    .target('dist/client')
}

export async function client_esm(task, opts) {
  await task
    .source(opts.src || 'client/**/*.+(js|ts|tsx)')
    .swc('client', { dev: opts.dev, esm: true })
    .target('dist/esm/client')
}

export async function lib(task, opts) {
  await task
    .source(opts.src || 'lib/**/*.+(js|ts|tsx)')
    .swc('server', { dev: opts.dev })
    .target('dist/lib')
  notify('Compiled lib files')
}

// eslint-disable-next-line camelcase
export async function lib_esm(task, opts) {
  await task
    .source(opts.src || 'lib/**/*.+(js|ts|tsx)')
    .swc('server', { dev: opts.dev, esm: true })
    .target('dist/esm/lib')
}

export async function jujutsubuild(task, opts) {
  await task
    .source(opts.src || 'build/**/*.+(js|ts|tsx)', {
      ignore: ['**/fixture/**', '**/tests/**', '**/jest/**'],
    })
    .swc('server', { dev: opts.dev })
    .target('dist/build')
}

// eslint-disable-next-line camelcase
export async function jujutsubuild_esm(task, opts) {
  await task
    .source(opts.src || 'build/**/*.+(js|ts|tsx)', {
      ignore: ['**/fixture/**', '**/tests/**', '**/jest/**'],
    })
    .swc('server', { dev: opts.dev, esm: true })
    .target('dist/esm/build')
}
export async function server(task, opts) {
  await task
    .source(opts.src || 'server/**/*.+(js|ts|tsx)')
    .swc('server', { dev: opts.dev })
    .target('dist/server')
}

export async function server_esm(task, opts) {
  await task
    .source(opts.src || 'server/**/*.+(js|ts|tsx)')
    .swc('server', { dev: opts.dev, esm: true })
    .target('dist/esm/server')
}

export async function trace(task, opts) {
  await task
    .source(opts.src || 'trace/**/*.+(js|ts|tsx)')
    .swc('server', { dev: opts.dev })
    .target('dist/trace')
}

export async function discord_esm(task, opts) {
  await task
    .source(opts.src || 'discord/**/*.+(js|ts|tsx)')
    .swc('discord', { dev: opts.dev, esm: true })
    .target('dist/esm/discord')
}

export async function discord(task, opts) {
  await task
    .source(opts.src || 'discord/**/*.+(js|ts|tsx)')
    .swc('discord', { dev: opts.dev })
    .target('dist/discord')
}

export async function precompile(task, opts) {
  await task.parallel(['copy_ncced'], opts)
}

export async function build(task, opts) {
  await task.serial(['precompile', 'compile', 'compile_config_schema'], opts)
}

// eslint-disable-next-line camelcase
export async function copy_ncced(task) {
  // we don't ncc every time we build since these won't change
  // that often and can be committed to the repo saving build time
  await task.source('compiled/**/*').target('dist/compiled')
}

export async function ncc(task, opts) {
  await task
    .clear('compiled')
    .parallel(
      [
        'ncc_require_from_string',
        'ncc_zod',
        'ncc_dotenv',
        'ncc_dotenv_expand',
        'ncc_watchpack',
        'ncc_chalk',
        'ncc_node_fetch',
        'ncc_arg',
        'ncc_fflate',
        'ncc_events',
        'ncc_ci_info',
        'ncc_gradient_string',
        'ncc_lodash',
        'ncc_cross_spawn',
        'ncc_discordjs',
        'ncc_find_cache_dir',
        'ncc_find_up',
        'ncc_json5',
        'ncc_strip_ansi',
        'ncc_unistore',
        'ncc_fs_extra',
        'ncc_ora',
        'ncc_semver',
        'ncc_segment_ajv_human_errors',
        'ncc_napirs_triples',
        'ncc_title',
        'ncc_nft',
        'ncc_ws',
        'ncc_nanoid',
      ],
      opts
    )
}

export async function compile(task, opts) {
  await task.parallel(
    [
      'cli',
      'bin',
      'server',
      'server_esm',
      'jujutsubuild',
      'jujutsubuild_esm',
      'lib',
      'lib_esm',
      'trace',
      'discord',
      'discord_esm',
    ],
    opts
  )
}

// eslint-disable-next-line func-names, import/no-default-export
export default async function (task) {
  const opts = { dev: true }
  await task.clear('dist')
  await task.start('build', opts)
  await task.watch('bin/*', 'bin', opts)
  await task.watch('build/**/*.+(js|ts|tsx)', 'jujutsubuild', opts)
  await task.watch('build/**/*.+(js|ts|tsx)', 'jujutsubuild_esm', opts)
  await task.watch('lib/**/*.+(js|ts|tsx)', 'lib', opts)
  await task.watch('lib/**/*.+(js|ts|tsx)', 'lib_esm', opts)
  await task.watch('cli/**/*.+(js|ts|tsx)', 'cli', opts)
  await task.watch('trace/**/*.+(js|ts|tsx)', 'trace', opts)
  await task.watch('discord/**/*.+(js|ts|tsx)', 'discord', opts)
  await task.watch('discord/**/*.+(js|ts|tsx)', 'discord_esm', opts)
}

export async function release(task) {
  await task.clear('dist').start('build')
}

export async function Externals() {
  return externals
}
// notification helper
function notify() {}
