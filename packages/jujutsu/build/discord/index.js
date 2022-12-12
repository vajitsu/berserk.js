/* eslint-disable no-shadow */
/* eslint-disable no-func-assign */
Object.defineProperty(exports, '__esModule', {
  value: true,
})
function _export(target, all) {
  for (var name in all)
    Object.defineProperty(target, name, {
      enumerable: true,
      get: all[name],
    })
}
_export(exports, {
  lockfilePatchPromise: function () {
    return lockfilePatchPromise
  },
  loadBindings: function () {
    return loadBindings
  },
})
var _os = require('os')
var _triples = require('jujutsu/dist/compiled/@napi-rs/triples')
var _log = /*#__PURE__*/ _interopRequireWildcard(
  // eslint-disable-next-line import/no-extraneous-dependencies
  require('jujutsu/dist/build/output/log')
)
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg)
    var value = info.value
  } catch (error) {
    reject(error)
    return
  }
  if (info.done) {
    resolve(value)
  } else {
    Promise.resolve(value).then(_next, _throw)
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args)
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value)
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err)
      }
      _next(undefined)
    })
  }
}
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null
  var cacheBabelInterop = new WeakMap()
  var cacheNodeInterop = new WeakMap()
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop
  })(nodeInterop)
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return {
      default: obj,
    }
  }
  var cache = _getRequireWildcardCache(nodeInterop)
  if (cache && cache.has(obj)) {
    return cache.get(obj)
  }
  var newObj = {}
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc)
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  newObj.default = obj
  if (cache) {
    cache.set(obj, newObj)
  }
  return newObj
}
var __generator =
  (void 0 && (void 0).__generator) ||
  function (thisArg, body) {
    var f,
      y,
      t,
      g,
      _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      }
    return (
      (g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2),
      }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return {
                value: op[1],
                done: false,
              }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return {
        value: op[0] ? op[1] : void 0,
        done: true,
      }
    }
  }
var ArchName = (0, _os.arch)()
var PlatformName = (0, _os.platform)()
var triples = _triples.platformArchTriples[PlatformName][ArchName] || []
var nativeBindings
var pendingBindings
var lockfilePatchPromise = {}
var loggingLoadFailure = false
function logLoadFailure(attempts) {
  // make sure we only emit the event and log the failure once
  if (loggingLoadFailure) return
  loggingLoadFailure = true
  var _iteratorNormalCompletion = true,
    _didIteratorError = false,
    _iteratorError = undefined
  try {
    for (
      var _iterator = attempts[Symbol.iterator](), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      var attempt = _step.value
      _log.warn(attempt)
    }
  } catch (err) {
    _didIteratorError = true
    _iteratorError = err
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return()
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError
      }
    }
  }
}
function loadNative() {
  if (nativeBindings) {
    return nativeBindings
  }
  var bindings
  var attempts = []
  var _iteratorNormalCompletion = true,
    _didIteratorError = false,
    _iteratorError = undefined
  try {
    for (
      var _iterator = triples[Symbol.iterator](), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      var triple = _step.value
      try {
        bindings = require('./native/jujutsu-discord.'.concat(
          triple.platformArchABI,
          '.node'
        ))
        _log.info('Using locally built binary of @jujutsu/discord')
        break
      } catch (e) {}
    }
  } catch (err) {
    _didIteratorError = true
    _iteratorError = err
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return()
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError
      }
    }
  }
  if (!bindings) {
    var _iteratorNormalCompletion1 = true,
      _didIteratorError1 = false,
      _iteratorError1 = undefined
    try {
      for (
        var _iterator1 = triples[Symbol.iterator](), _step1;
        !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done);
        _iteratorNormalCompletion1 = true
      ) {
        var triple1 = _step1.value
        var pkg = '@jujutsu/discord-'.concat(triple1.platformArchABI)
        try {
          bindings = require(pkg)
          break
        } catch (e1) {
          if (
            (e1 === null || e1 === void 0 ? void 0 : e1.code) ===
            'MODULE_NOT_FOUND'
          ) {
            attempts.push(
              'Attempted to load '.concat(pkg, ', but it was not installed')
            )
          } else {
            var _e_message
            attempts.push(
              'Attempted to load '
                .concat(pkg, ', but an error occurred: ')
                .concat(
                  (_e_message = e1.message) !== null && _e_message !== void 0
                    ? _e_message
                    : e1
                )
            )
          }
        }
      }
    } catch (err) {
      _didIteratorError1 = true
      _iteratorError1 = err
    } finally {
      try {
        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
          _iterator1.return()
        }
      } finally {
        if (_didIteratorError1) {
          throw _iteratorError1
        }
      }
    }
  }
  if (bindings) {
    nativeBindings = bindings
    return nativeBindings
  }
  throw attempts
}
function loadBindings() {
  return _loadBindings.apply(this, arguments)
}
function _loadBindings() {
  _loadBindings = _asyncToGenerator(function () {
    return __generator(this, function (_state) {
      if (pendingBindings) {
        return [2, pendingBindings]
      }
      pendingBindings = new Promise(
        (function () {
          var _ref = _asyncToGenerator(function (resolve, _reject) {
            var attempts
            return __generator(this, function (_state) {
              attempts = []
              try {
                return [2, resolve(loadNative())]
              } catch (a) {
                attempts = attempts.concat(a)
              }
              logLoadFailure(attempts)
              return [2]
            })
          })
          return function (resolve, _reject) {
            return _ref.apply(this, arguments)
          }
        })()
      )
      return [2, pendingBindings]
    })
  })
  return _loadBindings.apply(this, arguments)
}

//# sourceMappingURL=bindings.js.map
