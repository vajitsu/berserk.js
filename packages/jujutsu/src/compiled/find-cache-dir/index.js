import { createRequire as e } from 'module'
import * as r from 'jujutsu/dist/compiled/find-up'
var t = {
  447: (e, r, t) => {
    const { sep: n } = t(17)
    const determineSeparator = (e) => {
      for (const r of e) {
        const e = /(\/|\\)/.exec(r)
        if (e !== null) return e[0]
      }
      return n
    }
    e.exports = function commonPathPrefix(e, r = determineSeparator(e)) {
      const [t = '', ...n] = e
      if (t === '' || n.length === 0) return ''
      const o = t.split(r)
      let c = o.length
      for (const e of n) {
        const t = e.split(r)
        for (let e = 0; e < c; e++) {
          if (t[e] !== o[e]) {
            c = e
          }
        }
        if (c === 0) return ''
      }
      const i = o.slice(0, c).join(r)
      return i.endsWith(r) ? i : i + r
    }
  },
  17: (r) => {
    r.exports = e(import.meta.url)('path')
  },
}
var n = {}
function __nccwpck_require__(e) {
  var r = n[e]
  if (r !== undefined) {
    return r.exports
  }
  var o = (n[e] = { exports: {} })
  var c = true
  try {
    t[e](o, o.exports, __nccwpck_require__)
    c = false
  } finally {
    if (c) delete n[e]
  }
  return o.exports
}
;(() => {
  __nccwpck_require__.d = (e, r) => {
    for (var t in r) {
      if (__nccwpck_require__.o(r, t) && !__nccwpck_require__.o(e, t)) {
        Object.defineProperty(e, t, { enumerable: true, get: r[t] })
      }
    }
  }
})()
;(() => {
  __nccwpck_require__.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r)
})()
if (typeof __nccwpck_require__ !== 'undefined')
  __nccwpck_require__.ab =
    new URL('.', import.meta.url).pathname.slice(
      import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0,
      -1
    ) + '/'
var o = {}
;(() => {
  __nccwpck_require__.d(o, { Z: () => findCacheDirectory })
  const t = e(import.meta.url)('node:process')
  const n = e(import.meta.url)('node:path')
  const c = e(import.meta.url)('node:fs')
  var i = __nccwpck_require__(447)
  var x = (e) => {
    var r = {}
    __nccwpck_require__.d(r, e)
    return r
  }
  var y = (e) => () => e
  const a = x({ ['findUpSync']: () => r.findUpSync })
  async function packageDirectory({ cwd: e } = {}) {
    const r = await findUp('package.json', { cwd: e })
    return r && path.dirname(r)
  }
  function packageDirectorySync({ cwd: e } = {}) {
    const r = (0, a.findUpSync)('package.json', { cwd: e })
    return r && n.dirname(r)
  }
  const { env: u, cwd: s } = t
  const isWritable = (e) => {
    try {
      c.accessSync(e, c.constants.W_OK)
      return true
    } catch {
      return false
    }
  }
  function useDirectory(e, r) {
    if (r.create) {
      c.mkdirSync(e, { recursive: true })
    }
    if (r.thunk) {
      return (...r) => n.join(e, ...r)
    }
    return e
  }
  function getNodeModuleDirectory(e) {
    const r = n.join(e, 'node_modules')
    if (!isWritable(r) && (c.existsSync(r) || !isWritable(n.join(e)))) {
      return
    }
    return r
  }
  function findCacheDirectory(e = {}) {
    if (u.CACHE_DIR && !['true', 'false', '1', '0'].includes(u.CACHE_DIR)) {
      return useDirectory(n.join(u.CACHE_DIR, e.name), e)
    }
    let { cwd: r = s() } = e
    if (e.files) {
      r = i(e.files.map((e) => n.resolve(r, e)))
    }
    r = packageDirectorySync({ cwd: r })
    if (!r) {
      return
    }
    const t = getNodeModuleDirectory(r)
    if (!t) {
      return
    }
    return useDirectory(n.join(r, 'node_modules', '.cache', e.name), e)
  }
})()
var c = o.Z
export { c as default }
