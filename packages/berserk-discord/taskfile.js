const { relative } = require('path')

const externals = {
  'node-fetch': 'node-fetch',
  chokidar: 'chokidar',
  undici: 'undici',
}

// eslint-disable-next-line camelcase
externals['ws'] = 'berserk/dist/compiled/ws'
export async function ncc_ws(task, opts) {
  await task
    .source(opts.src || relative(__dirname, require.resolve('ws')))
    .ncc({ packageName: 'ws', externals })
    .target('compiled/ws')
}

export async function source(task, opts) {
  await task
    .source(opts.src || 'src/**/*.+(js|ts|tsx)')
    .swc('server', { dev: opts.dev })
    .target('dist')
}

export async function source_esm(task, opts) {
  await task
    .source(opts.src || 'src/**/*.+(js|ts|tsx)')
    .swc('server', { dev: opts.dev, esm: true })
    .target('dist/esm')
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
  await task.clear('compiled').parallel(['ncc_Ws'], opts)
}

export async function compile(task, opts) {
  await task.parallel(['source', 'source_esm'], opts)
}

// eslint-disable-next-line func-names, import/no-default-export
export default async function (task) {
  const opts = { dev: true }
  await task.clear('dist')
  await task.start('build', opts)
  await task.watch('server/**/*.+(js|ts|tsx)', 'server', opts)
  await task.watch('server/**/*.+(js|ts|tsx)', 'server', opts)
}

export async function release(task) {
  await task.clear('dist').start('build')
}

export async function Externals() {
  return externals
}
// notification helper
function notify() {}
