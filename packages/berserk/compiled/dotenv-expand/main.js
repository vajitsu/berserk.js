;(() => {
  var e = {
    55: (e) => {
      function _interpolate(e, r, t) {
        const n = e.match(/(.?\${*[\w]*(?::-[\w/]*)?}*)/g) || []
        return n.reduce(function (e, o, a) {
          const p = /(.?)\${*([\w]*(?::-[\w/]*)?)?}*/g.exec(o)
          if (!p || p.length === 0) {
            return e
          }
          const s = p[1]
          let c, _
          if (s === '\\') {
            _ = p[0]
            c = _.replace('\\$', '$')
          } else {
            const o = p[2].split(':-')
            const i = o[0]
            _ = p[0].substring(s.length)
            c = Object.prototype.hasOwnProperty.call(r, i)
              ? r[i]
              : t.parsed[i] || o[1] || ''
            if (o.length > 1 && c) {
              const r = n[a + 1]
              n[a + 1] = ''
              e = e.replace(r, '')
            }
            c = _interpolate(c, r, t)
          }
          return e.replace(_, c)
        }, e)
      }
      function expand(e) {
        const r = e.ignoreProcessEnv ? {} : process.env
        for (const t in e.parsed) {
          const n = Object.prototype.hasOwnProperty.call(r, t)
            ? r[t]
            : e.parsed[t]
          e.parsed[t] = _interpolate(n, r, e)
        }
        for (const t in e.parsed) {
          r[t] = e.parsed[t]
        }
        return e
      }
      e.exports.expand = expand
    },
  }
  var r = {}
  function __nccwpck_require__(t) {
    var n = r[t]
    if (n !== undefined) {
      return n.exports
    }
    var o = (r[t] = { exports: {} })
    var a = true
    try {
      e[t](o, o.exports, __nccwpck_require__)
      a = false
    } finally {
      if (a) delete r[t]
    }
    return o.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var t = __nccwpck_require__(55)
  module.exports = t
})()
