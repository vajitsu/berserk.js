;(() => {
  var r = {
    286: (r) => {
      r.exports = function (r, e) {
        if (!e) e = {}
        var n = e.hsep === undefined ? '  ' : e.hsep
        var t = e.align || []
        var a =
          e.stringLength ||
          function (r) {
            return String(r).length
          }
        var i = reduce(
          r,
          function (r, e) {
            forEach(e, function (e, n) {
              var t = dotindex(e)
              if (!r[n] || t > r[n]) r[n] = t
            })
            return r
          },
          []
        )
        var u = map(r, function (r) {
          return map(r, function (r, e) {
            var n = String(r)
            if (t[e] === '.') {
              var u = dotindex(n)
              var f = i[e] + (/\./.test(n) ? 1 : 2) - (a(n) - u)
              return n + Array(f).join(' ')
            } else return n
          })
        })
        var f = reduce(
          u,
          function (r, e) {
            forEach(e, function (e, n) {
              var t = a(e)
              if (!r[n] || t > r[n]) r[n] = t
            })
            return r
          },
          []
        )
        return map(u, function (r) {
          return map(r, function (r, e) {
            var n = f[e] - a(r) || 0
            var i = Array(Math.max(n + 1, 1)).join(' ')
            if (t[e] === 'r' || t[e] === '.') {
              return i + r
            }
            if (t[e] === 'c') {
              return (
                Array(Math.ceil(n / 2 + 1)).join(' ') +
                r +
                Array(Math.floor(n / 2 + 1)).join(' ')
              )
            }
            return r + i
          })
            .join(n)
            .replace(/\s+$/, '')
        }).join('\n')
      }
      function dotindex(r) {
        var e = /\.[^.]*$/.exec(r)
        return e ? e.index + 1 : r.length
      }
      function reduce(r, e, n) {
        if (r.reduce) return r.reduce(e, n)
        var t = 0
        var a = arguments.length >= 3 ? n : r[t++]
        for (; t < r.length; t++) {
          e(a, r[t], t)
        }
        return a
      }
      function forEach(r, e) {
        if (r.forEach) return r.forEach(e)
        for (var n = 0; n < r.length; n++) {
          e.call(r, r[n], n)
        }
      }
      function map(r, e) {
        if (r.map) return r.map(e)
        var n = []
        for (var t = 0; t < r.length; t++) {
          n.push(e.call(r, r[t], t))
        }
        return n
      }
    },
  }
  var e = {}
  function __nccwpck_require__(n) {
    var t = e[n]
    if (t !== undefined) {
      return t.exports
    }
    var a = (e[n] = { exports: {} })
    var i = true
    try {
      r[n](a, a.exports, __nccwpck_require__)
      i = false
    } finally {
      if (i) delete e[n]
    }
    return a.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var n = __nccwpck_require__(286)
  module.exports = n
})()
