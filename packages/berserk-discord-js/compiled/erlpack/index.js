;(() => {
  var e = {
    60: (e, r, _) => {
      e.exports = require(_.ab + 'build/Release/erlpack.node')
    },
  }
  var r = {}
  function __nccwpck_require__(_) {
    var a = r[_]
    if (a !== undefined) {
      return a.exports
    }
    var i = (r[_] = { exports: {} })
    var u = true
    try {
      e[_](i, i.exports, __nccwpck_require__)
      u = false
    } finally {
      if (u) delete r[_]
    }
    return i.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var _ = __nccwpck_require__(60)
  module.exports = _
})()
