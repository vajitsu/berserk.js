;(() => {
  var __webpack_modules__ = {
    697: (e, t, r) => {
      e = r.nmd(e)
      const n = (function () {
          return this || Function('return this')()
        })(),
        { apply: _, defineProperty: o } = Reflect,
        { freeze: l } = Object,
        { hasOwnProperty: a } = Object.prototype,
        u = Symbol.for,
        { type: i, versions: c } = process,
        { filename: s, id: p, parent: d } = e,
        f = x(c, 'electron'),
        m = f && 'renderer' === i
      let b = ''
      'string' == typeof p &&
        p.startsWith('internal/') &&
        (b = q('internal/esm/loader'))
      const h = r(188),
        { Script: w } = r(144),
        {
          createCachedData: y,
          runInNewContext: k,
          runInThisContext: v,
        } = w.prototype,
        { sep: g } = r(17),
        { readFileSync: C } = r(147),
        F = new h(p)
      function q(e) {
        let t
        try {
          const { internalBinding: n } = r(901),
            _ = n('natives')
          x(_, e) && (t = _[e])
        } catch (e) {}
        return 'string' == typeof t ? t : ''
      }
      function x(e, t) {
        return null != e && _(a, e, [t])
      }
      function D() {
        return R(require, F, W), F.exports
      }
      function O(e, t) {
        return D()(e, t)
      }
      function j(e, t) {
        try {
          return C(e, t)
        } catch (e) {}
        return null
      }
      let I, S
      ;(F.filename = s), (F.parent = d)
      let M = '',
        T = ''
      '' !== b
        ? ((T = b), (S = { __proto__: null, filename: 'esm.js' }))
        : ((M = __dirname + g + 'node_modules' + g + '.cache' + g + 'esm'),
          (I = j(M + g + '.data.blob')),
          (T = j(r.ab + 'loader.js', 'utf8')),
          null === I && (I = void 0),
          null === T && (T = ''),
          (S = {
            __proto__: null,
            cachedData: I,
            filename: s,
            produceCachedData: 'function' != typeof y,
          }))
      const P = new w(
        'const __global__ = this;(function (require, module, __shared__) { ' +
          T +
          '\n});',
        S
      )
      let R, W
      if (
        ((R = m
          ? _(v, P, [{ __proto__: null, filename: s }])
          : _(k, P, [
              { __proto__: null, global: n },
              { __proto__: null, filename: s },
            ])),
        (W = D()),
        '' !== M)
      ) {
        const { dir: e } = W.package
        let t = e.get(M)
        if (void 0 === t) {
          let r = I
          void 0 === r && (r = null),
            (t = {
              buffer: I,
              compile: new Map([
                [
                  'esm',
                  {
                    circular: 0,
                    code: null,
                    codeWithTDZ: null,
                    filename: null,
                    firstAwaitOutsideFunction: null,
                    firstReturnOutsideFunction: null,
                    mtime: -1,
                    scriptData: r,
                    sourceType: 1,
                    transforms: 0,
                    yieldIndex: -1,
                  },
                ],
              ]),
              meta: new Map(),
            }),
            e.set(M, t)
        }
        const { pendingScripts: r } = W
        let n = r.get(M)
        void 0 === n && ((n = new Map()), r.set(M, n)), n.set('esm', P)
      }
      o(O, W.symbol.package, { __proto__: null, value: !0 }),
        o(O, W.customInspectKey, {
          __proto__: null,
          value: () => 'esm enabled',
        }),
        o(O, u('esm:package'), { __proto__: null, value: !0 }),
        l(O),
        (e.exports = O)
    },
    901: (module) => {
      module.exports = eval('require')('internal/bootstrap/loaders')
    },
    147: (e) => {
      e.exports = require('fs')
    },
    188: (e) => {
      e.exports = require('module')
    },
    17: (e) => {
      e.exports = require('path')
    },
    144: (e) => {
      e.exports = require('vm')
    },
  }
  var __webpack_module_cache__ = {}
  function __nccwpck_require__(e) {
    var t = __webpack_module_cache__[e]
    if (t !== undefined) {
      return t.exports
    }
    var r = (__webpack_module_cache__[e] = {
      id: e,
      loaded: false,
      exports: {},
    })
    var n = true
    try {
      __webpack_modules__[e](r, r.exports, __nccwpck_require__)
      n = false
    } finally {
      if (n) delete __webpack_module_cache__[e]
    }
    r.loaded = true
    return r.exports
  }
  ;(() => {
    __nccwpck_require__.nmd = (e) => {
      e.paths = []
      if (!e.children) e.children = []
      return e
    }
  })()
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var __webpack_exports__ = __nccwpck_require__(697)
  module.exports = __webpack_exports__
})()
