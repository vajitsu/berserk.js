// import registerEntries from './helpers/register-entries.txt'
// import compileEntries from './helpers/compile-entries.txt'
// import processEntries from './helpers/process-entries.txt'
// import findEntries from './helpers/find-entries.txt'
import swcrc from './swc-config'
import swc from '@swc/core'

export async function minify(code: string, typescript = false) {
  const output = await swc.minify(code, {
    mangle: true,
    keep_classnames: false,
    keep_fnames: false,
    module: typescript,
  })
  return output.code
}

export async function parse(code: string, typescript = false) {
  const output = await swc.parse(code, {
    syntax: typescript ? 'typescript' : 'ecmascript',
    comments: false,
    script: true,
    target: 'es2020',
    isModule: false,
  })
  return output
}

export async function transform(code: string, typescript = false) {
  const config = await swcrc({ typescript })
  const output = await swc.transform(code, config)
  return output.code
}

// export async function compileBuild(cwd: string) {
//   var _: any = {
//     found: await findEntries(cwd),
//     registered: await registerEntries(_.found),
//     processed: await processEntries(_.registered),
//     compilied: compileEntries(cwd, _.processed, 'build'),
//   }
// }

// export async function compileDev(cwd: string) {
//   var _ = {
//     found: await findEntries(cwd),
//     registered: await registerEntries(_.found),
//     processed: await processEntries(_.registered),
//     compilied: compileEntries(cwd, _.processed, 'cache'),
//   }
// }
