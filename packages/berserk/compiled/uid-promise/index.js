;(() => {
  var e = {
    475: (e, r) => {
      Object.defineProperty(r, '__esModule', { value: true })
      const t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      r['default'] = t
      e.exports = t
    },
    705: function (e, r, t) {
      var u =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e }
        }
      Object.defineProperty(r, '__esModule', { value: true })
      const n = t(113)
      const o = u(t(475))
      const uuid = (e) =>
        new Promise((r, t) => {
          if (!Number.isInteger(e)) {
            t(
              new TypeError(
                'You must supply a length integer to `uid-promise`.'
              )
            )
            return
          }
          if (e <= 0) {
            t(new Error('You must supply a length integer greater than zero'))
            return
          }
          n.randomBytes(e, (e, u) => {
            if (e) {
              return t(e)
            }
            const _ = []
            let i
            for (let r = 0; r < u.length; r++) {
              i = u[r]
              while (i > 248) {
                try {
                  i = n.randomBytes(1)[0]
                } catch (e) {
                  t(e)
                }
              }
              _.push(o.default[i % o.default.length])
            }
            r(_.join(''))
          })
        })
      r['default'] = uuid
      e.exports = uuid
    },
    113: (e) => {
      e.exports = require('crypto')
    },
  }
  var r = {}
  function __nccwpck_require__(t) {
    var u = r[t]
    if (u !== undefined) {
      return u.exports
    }
    var n = (r[t] = { exports: {} })
    var o = true
    try {
      e[t].call(n.exports, n, n.exports, __nccwpck_require__)
      o = false
    } finally {
      if (o) delete r[t]
    }
    return n.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var t = __nccwpck_require__(705)
  module.exports = t
})()
