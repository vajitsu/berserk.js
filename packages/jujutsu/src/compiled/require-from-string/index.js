;(() => {
  'use strict'
  var e = {
    631: (e, r, t) => {
      e = t.nmd(e)
      var a = t(188)
      var n = t(17)
      e.exports = function requireFromString(r, t, i) {
        if (typeof t === 'object') {
          i = t
          t = undefined
        }
        i = i || {}
        t = t || ''
        i.appendPaths = i.appendPaths || []
        i.prependPaths = i.prependPaths || []
        if (typeof r !== 'string') {
          throw new Error('code must be a string, not ' + typeof r)
        }
        var p = a._nodeModulePaths(n.dirname(t))
        var _ = e.parent
        var d = new a(t, _)
        d.filename = t
        d.paths = [].concat(i.prependPaths).concat(p).concat(i.appendPaths)
        d._compile(r, t)
        var o = d.exports
        _ && _.children && _.children.splice(_.children.indexOf(d), 1)
        return o
      }
    },
    188: (e) => {
      e.exports = require('module')
    },
    17: (e) => {
      e.exports = require('path')
    },
  }
  var r = {}
  function __nccwpck_require__(t) {
    var a = r[t]
    if (a !== undefined) {
      return a.exports
    }
    var n = (r[t] = { id: t, loaded: false, exports: {} })
    var i = true
    try {
      e[t](n, n.exports, __nccwpck_require__)
      i = false
    } finally {
      if (i) delete r[t]
    }
    n.loaded = true
    return n.exports
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
  var t = __nccwpck_require__(631)
  module.exports = t
})()
