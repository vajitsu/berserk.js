const { relative } = require('path')

require('taskr')
const externals = {
  'node-fetch': 'node-fetch',
  chokidar: 'chokidar',
  undici: 'undici',
}

// eslint-disable-next-line camelcase
externals['ws'] = '@berserk/discord-js/dist/compiled/ws'
export async function ncc_ws(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('ws')))
    .ncc({ packageName: 'ws', externals })
    .target('compiled/ws')
}

// eslint-disable-next-line camelcase
externals['erlpack'] = '@berserk/discord-js/dist/compiled/erlpack'
export async function ncc_erlpack(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('erlpack')))
    .ncc({ packageName: 'erlpack', externals })
    .target('compiled/erlpack')
}

// eslint-disable-next-line camelcase
externals['chalk'] = '@berserk/discord-js/dist/compiled/chalk'
export async function ncc_chalk(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('chalk')))
    .ncc({ packageName: 'chalk', externals })
    .target('compiled/chalk')
}

// eslint-disable-next-line camelcase
externals['lodash'] = '@berserk/discord-js/dist/compiled/lodash'
export async function ncc_lodash(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('lodash')))
    .ncc({ packageName: 'lodash', externals })
    .target('compiled/lodash')
}

// eslint-disable-next-line camelcase
externals['zod'] = '@berserk/discord-js/dist/compiled/zod'
export async function ncc_zod(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('zod')))
    .ncc({ packageName: 'zod', externals })
    .target('compiled/zod')
}

// eslint-disable-next-line camelcase
externals['title'] = '@berserk/discord-js/dist/compiled/title'
export async function ncc_title(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('title')))
    .ncc({ packageName: 'title', externals })
    .target('compiled/title')
}

export async function lib(task, opts) {
  await task
    .source(opts.src || 'lib/**/*.+(js|ts|tsx)')
    .swc('lib', { dev: opts.dev })
    .target('dist/lib')
}

export async function lib_esm(task, opts) {
  await task
    .source(opts.src || 'lib/**/*.+(js|ts|tsx)')
    .swc('lib', { dev: opts.dev, esm: true })
    .target('dist/esm/lib')
}

export async function precompile(task, opts) {
  await task.parallel(['copy_ncced'], opts)
}

export async function build(task, opts) {
  await task.serial(['precompile', 'compile'], opts)
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
        'ncc_chalk',
        'ncc_erlpack',
        'ncc_title',
        'ncc_ws',
        'ncc_zod',
        'ncc_lodash',
      ],
      opts
    )
}

export async function compile(task, opts) {
  await task.parallel(['lib', 'lib_esm'], opts)
}

// eslint-disable-next-line func-names, import/no-default-export
export default async function (task) {
  const opts = { dev: true }
  await task.clear('dist')
  await task.start('build', opts)
  await task.watch('lib/**/*.+(js|ts|tsx)', 'lib', opts)
  await task.watch('lib/**/*.+(js|ts|tsx)', 'lib_esm', opts)
}

export async function release(task) {
  await task.clear('dist').start('build')
}
