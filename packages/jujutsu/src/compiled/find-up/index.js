;(() => {
  'use strict'
  var e = {
    578: (e, t, r) => {
      const n = r(17)
      const s = r(910)
      const c = r(61)
      const o = Symbol('findUp.stop')
      e.exports = async (e, t = {}) => {
        let r = n.resolve(t.cwd || '')
        const { root: c } = n.parse(r)
        const i = [].concat(e)
        const runMatcher = async (t) => {
          if (typeof e !== 'function') {
            return s(i, t)
          }
          const r = await e(t.cwd)
          if (typeof r === 'string') {
            return s([r], t)
          }
          return r
        }
        while (true) {
          const e = await runMatcher({ ...t, cwd: r })
          if (e === o) {
            return
          }
          if (e) {
            return n.resolve(r, e)
          }
          if (r === c) {
            return
          }
          r = n.dirname(r)
        }
      }
      e.exports.sync = (e, t = {}) => {
        let r = n.resolve(t.cwd || '')
        const { root: c } = n.parse(r)
        const i = [].concat(e)
        const runMatcher = (t) => {
          if (typeof e !== 'function') {
            return s.sync(i, t)
          }
          const r = e(t.cwd)
          if (typeof r === 'string') {
            return s.sync([r], t)
          }
          return r
        }
        while (true) {
          const e = runMatcher({ ...t, cwd: r })
          if (e === o) {
            return
          }
          if (e) {
            return n.resolve(r, e)
          }
          if (r === c) {
            return
          }
          r = n.dirname(r)
        }
      }
      e.exports.exists = c
      e.exports.sync.exists = c.sync
      e.exports.stop = o
    },
    910: (e, t, r) => {
      const n = r(17)
      const s = r(147)
      const { promisify: c } = r(837)
      const o = r(679)
      const i = c(s.stat)
      const a = c(s.lstat)
      const u = { directory: 'isDirectory', file: 'isFile' }
      function checkType({ type: e }) {
        if (e in u) {
          return
        }
        throw new Error(`Invalid type specified: ${e}`)
      }
      const matchType = (e, t) => e === undefined || t[u[e]]()
      e.exports = async (e, t) => {
        t = { cwd: process.cwd(), type: 'file', allowSymlinks: true, ...t }
        checkType(t)
        const r = t.allowSymlinks ? i : a
        return o(
          e,
          async (e) => {
            try {
              const s = await r(n.resolve(t.cwd, e))
              return matchType(t.type, s)
            } catch (e) {
              return false
            }
          },
          t
        )
      }
      e.exports.sync = (e, t) => {
        t = { cwd: process.cwd(), allowSymlinks: true, type: 'file', ...t }
        checkType(t)
        const r = t.allowSymlinks ? s.statSync : s.lstatSync
        for (const s of e) {
          try {
            const e = r(n.resolve(t.cwd, s))
            if (matchType(t.type, e)) {
              return s
            }
          } catch (e) {}
        }
      }
    },
    742: (e, t, r) => {
      const n = r(857)
      const pLimit = (e) => {
        if (!((Number.isInteger(e) || e === Infinity) && e > 0)) {
          return Promise.reject(
            new TypeError('Expected `concurrency` to be a number from 1 and up')
          )
        }
        const t = []
        let r = 0
        const next = () => {
          r--
          if (t.length > 0) {
            t.shift()()
          }
        }
        const run = (e, t, ...s) => {
          r++
          const c = n(e, ...s)
          t(c)
          c.then(next, next)
        }
        const enqueue = (n, s, ...c) => {
          if (r < e) {
            run(n, s, ...c)
          } else {
            t.push(run.bind(null, n, s, ...c))
          }
        }
        const generator = (e, ...t) => new Promise((r) => enqueue(e, r, ...t))
        Object.defineProperties(generator, {
          activeCount: { get: () => r },
          pendingCount: { get: () => t.length },
          clearQueue: {
            value: () => {
              t.length = 0
            },
          },
        })
        return generator
      }
      e.exports = pLimit
      e.exports['default'] = pLimit
    },
    679: (e, t, r) => {
      const n = r(742)
      class EndError extends Error {
        constructor(e) {
          super()
          this.value = e
        }
      }
      const testElement = async (e, t) => t(await e)
      const finder = async (e) => {
        const t = await Promise.all(e)
        if (t[1] === true) {
          throw new EndError(t[0])
        }
        return false
      }
      const pLocate = async (e, t, r) => {
        r = { concurrency: Infinity, preserveOrder: true, ...r }
        const s = n(r.concurrency)
        const c = [...e].map((e) => [e, s(testElement, e, t)])
        const o = n(r.preserveOrder ? 1 : Infinity)
        try {
          await Promise.all(c.map((e) => o(finder, e)))
        } catch (e) {
          if (e instanceof EndError) {
            return e.value
          }
          throw e
        }
      }
      e.exports = pLocate
      e.exports['default'] = pLocate
    },
    857: (e) => {
      const pTry = (e, ...t) =>
        new Promise((r) => {
          r(e(...t))
        })
      e.exports = pTry
      e.exports['default'] = pTry
    },
    61: (e, t, r) => {
      const n = r(147)
      const { promisify: s } = r(837)
      const c = s(n.access)
      e.exports = async (e) => {
        try {
          await c(e)
          return true
        } catch (e) {
          return false
        }
      }
      e.exports.sync = (e) => {
        try {
          n.accessSync(e)
          return true
        } catch (e) {
          return false
        }
      }
    },
    147: (e) => {
      e.exports = require('fs')
    },
    17: (e) => {
      e.exports = require('path')
    },
    837: (e) => {
      e.exports = require('util')
    },
  }
  var t = {}
  function __nccwpck_require__(r) {
    var n = t[r]
    if (n !== undefined) {
      return n.exports
    }
    var s = (t[r] = { exports: {} })
    var c = true
    try {
      e[r](s, s.exports, __nccwpck_require__)
      c = false
    } finally {
      if (c) delete t[r]
    }
    return s.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var r = __nccwpck_require__(578)
  module.exports = r
})()
