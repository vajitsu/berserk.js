;(() => {
  'use strict'
  var __webpack_modules__ = {
    841: (e, r) => {
      Object.defineProperty(r, '__esModule', { value: true })
      r.PARENT_MESSAGE_CUSTOM =
        r.PARENT_MESSAGE_SETUP_ERROR =
        r.PARENT_MESSAGE_CLIENT_ERROR =
        r.PARENT_MESSAGE_OK =
        r.CHILD_MESSAGE_END =
        r.CHILD_MESSAGE_CALL =
        r.CHILD_MESSAGE_INITIALIZE =
          void 0
      const t = 0
      r.CHILD_MESSAGE_INITIALIZE = t
      const _ = 1
      r.CHILD_MESSAGE_CALL = _
      const n = 2
      r.CHILD_MESSAGE_END = n
      const o = 0
      r.PARENT_MESSAGE_OK = o
      const s = 1
      r.PARENT_MESSAGE_CLIENT_ERROR = s
      const i = 2
      r.PARENT_MESSAGE_SETUP_ERROR = i
      const a = 3
      r.PARENT_MESSAGE_CUSTOM = a
    },
    267: (e) => {
      e.exports = require('worker_threads')
    },
  }
  var __webpack_module_cache__ = {}
  function __nccwpck_require__(e) {
    var r = __webpack_module_cache__[e]
    if (r !== undefined) {
      return r.exports
    }
    var t = (__webpack_module_cache__[e] = { exports: {} })
    var _ = true
    try {
      __webpack_modules__[e](t, t.exports, __nccwpck_require__)
      _ = false
    } finally {
      if (_) delete __webpack_module_cache__[e]
    }
    return t.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var __webpack_exports__ = {}
  ;(() => {
    function _worker_threads() {
      const e = __nccwpck_require__(267)
      _worker_threads = function () {
        return e
      }
      return e
    }
    function _types() {
      const e = __nccwpck_require__(841)
      _types = function () {
        return e
      }
      return e
    }
    let file = null
    let setupArgs = []
    let initialized = false
    const messageListener = (e) => {
      switch (e[0]) {
        case _types().CHILD_MESSAGE_INITIALIZE:
          const r = e
          file = r[2]
          setupArgs = e[3]
          break
        case _types().CHILD_MESSAGE_CALL:
          const t = e
          execMethod(t[2], t[3])
          break
        case _types().CHILD_MESSAGE_END:
          end()
          break
        default:
          throw new TypeError('Unexpected request from parent process: ' + e[0])
      }
    }
    _worker_threads().parentPort.on('message', messageListener)
    function reportSuccess(e) {
      if (_worker_threads().isMainThread) {
        throw new Error('Child can only be used on a forked process')
      }
      _worker_threads().parentPort.postMessage([_types().PARENT_MESSAGE_OK, e])
    }
    function reportClientError(e) {
      return reportError(e, _types().PARENT_MESSAGE_CLIENT_ERROR)
    }
    function reportInitializeError(e) {
      return reportError(e, _types().PARENT_MESSAGE_SETUP_ERROR)
    }
    function reportError(e, r) {
      if (_worker_threads().isMainThread) {
        throw new Error('Child can only be used on a forked process')
      }
      if (e == null) {
        e = new Error('"null" or "undefined" thrown')
      }
      _worker_threads().parentPort.postMessage([
        r,
        e.constructor && e.constructor.name,
        e.message,
        e.stack,
        typeof e === 'object' ? { ...e } : e,
      ])
    }
    function end() {
      const main = eval('require')(file)
      if (!main.teardown) {
        exitProcess()
        return
      }
      execFunction(main.teardown, main, [], exitProcess, exitProcess)
    }
    function exitProcess() {
      _worker_threads().parentPort.removeListener('message', messageListener)
    }
    function execMethod(method, args) {
      const main = eval('require')(file)
      let fn
      if (method === 'default') {
        fn = main.__esModule ? main['default'] : main
      } else {
        fn = main[method]
      }
      function execHelper() {
        execFunction(fn, main, args, reportSuccess, reportClientError)
      }
      if (initialized || !main.setup) {
        execHelper()
        return
      }
      initialized = true
      execFunction(
        main.setup,
        main,
        setupArgs,
        execHelper,
        reportInitializeError
      )
    }
    const isPromise = (e) =>
      !!e &&
      (typeof e === 'object' || typeof e === 'function') &&
      typeof e.then === 'function'
    function execFunction(e, r, t, _, n) {
      let o
      try {
        o = e.apply(r, t)
      } catch (e) {
        n(e)
        return
      }
      if (isPromise(o)) {
        o.then(_, n)
      } else {
        _(o)
      }
    }
  })()
  module.exports = __webpack_exports__
})()
