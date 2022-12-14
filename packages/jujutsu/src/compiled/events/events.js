;(function () {
  'use strict'
  var e = {
    864: function (e) {
      var t = typeof Reflect === 'object' ? Reflect : null
      var n =
        t && typeof t.apply === 'function'
          ? t.apply
          : function ReflectApply(e, t, n) {
              return Function.prototype.apply.call(e, t, n)
            }
      var r
      if (t && typeof t.ownKeys === 'function') {
        r = t.ownKeys
      } else if (Object.getOwnPropertySymbols) {
        r = function ReflectOwnKeys(e) {
          return Object.getOwnPropertyNames(e).concat(
            Object.getOwnPropertySymbols(e)
          )
        }
      } else {
        r = function ReflectOwnKeys(e) {
          return Object.getOwnPropertyNames(e)
        }
      }
      function ProcessEmitWarning(e) {
        if (console && console.warn) console.warn(e)
      }
      var i =
        Number.isNaN ||
        function NumberIsNaN(e) {
          return e !== e
        }
      function EventEmitter() {
        EventEmitter.init.call(this)
      }
      e.exports = EventEmitter
      e.exports.once = once
      EventEmitter.EventEmitter = EventEmitter
      EventEmitter.prototype._events = undefined
      EventEmitter.prototype._eventsCount = 0
      EventEmitter.prototype._maxListeners = undefined
      var s = 10
      function checkListener(e) {
        if (typeof e !== 'function') {
          throw new TypeError(
            'The "listener" argument must be of type Function. Received type ' +
              typeof e
          )
        }
      }
      Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
        enumerable: true,
        get: function () {
          return s
        },
        set: function (e) {
          if (typeof e !== 'number' || e < 0 || i(e)) {
            throw new RangeError(
              'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                e +
                '.'
            )
          }
          s = e
        },
      })
      EventEmitter.init = function () {
        if (
          this._events === undefined ||
          this._events === Object.getPrototypeOf(this)._events
        ) {
          this._events = Object.create(null)
          this._eventsCount = 0
        }
        this._maxListeners = this._maxListeners || undefined
      }
      EventEmitter.prototype.setMaxListeners = function setMaxListeners(e) {
        if (typeof e !== 'number' || e < 0 || i(e)) {
          throw new RangeError(
            'The value of "n" is out of range. It must be a non-negative number. Received ' +
              e +
              '.'
          )
        }
        this._maxListeners = e
        return this
      }
      function _getMaxListeners(e) {
        if (e._maxListeners === undefined)
          return EventEmitter.defaultMaxListeners
        return e._maxListeners
      }
      EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this)
      }
      EventEmitter.prototype.emit = function emit(e) {
        var t = []
        for (var r = 1; r < arguments.length; r++) t.push(arguments[r])
        var i = e === 'error'
        var s = this._events
        if (s !== undefined) i = i && s.error === undefined
        else if (!i) return false
        if (i) {
          var o
          if (t.length > 0) o = t[0]
          if (o instanceof Error) {
            throw o
          }
          var f = new Error(
            'Unhandled error.' + (o ? ' (' + o.message + ')' : '')
          )
          f.context = o
          throw f
        }
        var u = s[e]
        if (u === undefined) return false
        if (typeof u === 'function') {
          n(u, this, t)
        } else {
          var a = u.length
          var c = arrayClone(u, a)
          for (var r = 0; r < a; ++r) n(c[r], this, t)
        }
        return true
      }
      function _addListener(e, t, n, r) {
        var i
        var s
        var o
        checkListener(n)
        s = e._events
        if (s === undefined) {
          s = e._events = Object.create(null)
          e._eventsCount = 0
        } else {
          if (s.newListener !== undefined) {
            e.emit('newListener', t, n.listener ? n.listener : n)
            s = e._events
          }
          o = s[t]
        }
        if (o === undefined) {
          o = s[t] = n
          ++e._eventsCount
        } else {
          if (typeof o === 'function') {
            o = s[t] = r ? [n, o] : [o, n]
          } else if (r) {
            o.unshift(n)
          } else {
            o.push(n)
          }
          i = _getMaxListeners(e)
          if (i > 0 && o.length > i && !o.warned) {
            o.warned = true
            var f = new Error(
              'Possible EventEmitter memory leak detected. ' +
                o.length +
                ' ' +
                String(t) +
                ' listeners ' +
                'added. Use emitter.setMaxListeners() to ' +
                'increase limit'
            )
            f.name = 'MaxListenersExceededWarning'
            f.emitter = e
            f.type = t
            f.count = o.length
            ProcessEmitWarning(f)
          }
        }
        return e
      }
      EventEmitter.prototype.addListener = function addListener(e, t) {
        return _addListener(this, e, t, false)
      }
      EventEmitter.prototype.on = EventEmitter.prototype.addListener
      EventEmitter.prototype.prependListener = function prependListener(e, t) {
        return _addListener(this, e, t, true)
      }
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn)
          this.fired = true
          if (arguments.length === 0) return this.listener.call(this.target)
          return this.listener.apply(this.target, arguments)
        }
      }
      function _onceWrap(e, t, n) {
        var r = {
          fired: false,
          wrapFn: undefined,
          target: e,
          type: t,
          listener: n,
        }
        var i = onceWrapper.bind(r)
        i.listener = n
        r.wrapFn = i
        return i
      }
      EventEmitter.prototype.once = function once(e, t) {
        checkListener(t)
        this.on(e, _onceWrap(this, e, t))
        return this
      }
      EventEmitter.prototype.prependOnceListener = function prependOnceListener(
        e,
        t
      ) {
        checkListener(t)
        this.prependListener(e, _onceWrap(this, e, t))
        return this
      }
      EventEmitter.prototype.removeListener = function removeListener(e, t) {
        var n, r, i, s, o
        checkListener(t)
        r = this._events
        if (r === undefined) return this
        n = r[e]
        if (n === undefined) return this
        if (n === t || n.listener === t) {
          if (--this._eventsCount === 0) this._events = Object.create(null)
          else {
            delete r[e]
            if (r.removeListener)
              this.emit('removeListener', e, n.listener || t)
          }
        } else if (typeof n !== 'function') {
          i = -1
          for (s = n.length - 1; s >= 0; s--) {
            if (n[s] === t || n[s].listener === t) {
              o = n[s].listener
              i = s
              break
            }
          }
          if (i < 0) return this
          if (i === 0) n.shift()
          else {
            spliceOne(n, i)
          }
          if (n.length === 1) r[e] = n[0]
          if (r.removeListener !== undefined)
            this.emit('removeListener', e, o || t)
        }
        return this
      }
      EventEmitter.prototype.off = EventEmitter.prototype.removeListener
      EventEmitter.prototype.removeAllListeners = function removeAllListeners(
        e
      ) {
        var t, n, r
        n = this._events
        if (n === undefined) return this
        if (n.removeListener === undefined) {
          if (arguments.length === 0) {
            this._events = Object.create(null)
            this._eventsCount = 0
          } else if (n[e] !== undefined) {
            if (--this._eventsCount === 0) this._events = Object.create(null)
            else delete n[e]
          }
          return this
        }
        if (arguments.length === 0) {
          var i = Object.keys(n)
          var s
          for (r = 0; r < i.length; ++r) {
            s = i[r]
            if (s === 'removeListener') continue
            this.removeAllListeners(s)
          }
          this.removeAllListeners('removeListener')
          this._events = Object.create(null)
          this._eventsCount = 0
          return this
        }
        t = n[e]
        if (typeof t === 'function') {
          this.removeListener(e, t)
        } else if (t !== undefined) {
          for (r = t.length - 1; r >= 0; r--) {
            this.removeListener(e, t[r])
          }
        }
        return this
      }
      function _listeners(e, t, n) {
        var r = e._events
        if (r === undefined) return []
        var i = r[t]
        if (i === undefined) return []
        if (typeof i === 'function') return n ? [i.listener || i] : [i]
        return n ? unwrapListeners(i) : arrayClone(i, i.length)
      }
      EventEmitter.prototype.listeners = function listeners(e) {
        return _listeners(this, e, true)
      }
      EventEmitter.prototype.rawListeners = function rawListeners(e) {
        return _listeners(this, e, false)
      }
      EventEmitter.listenerCount = function (e, t) {
        if (typeof e.listenerCount === 'function') {
          return e.listenerCount(t)
        } else {
          return listenerCount.call(e, t)
        }
      }
      EventEmitter.prototype.listenerCount = listenerCount
      function listenerCount(e) {
        var t = this._events
        if (t !== undefined) {
          var n = t[e]
          if (typeof n === 'function') {
            return 1
          } else if (n !== undefined) {
            return n.length
          }
        }
        return 0
      }
      EventEmitter.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? r(this._events) : []
      }
      function arrayClone(e, t) {
        var n = new Array(t)
        for (var r = 0; r < t; ++r) n[r] = e[r]
        return n
      }
      function spliceOne(e, t) {
        for (; t + 1 < e.length; t++) e[t] = e[t + 1]
        e.pop()
      }
      function unwrapListeners(e) {
        var t = new Array(e.length)
        for (var n = 0; n < t.length; ++n) {
          t[n] = e[n].listener || e[n]
        }
        return t
      }
      function once(e, t) {
        return new Promise(function (n, r) {
          function errorListener(n) {
            e.removeListener(t, resolver)
            r(n)
          }
          function resolver() {
            if (typeof e.removeListener === 'function') {
              e.removeListener('error', errorListener)
            }
            n([].slice.call(arguments))
          }
          eventTargetAgnosticAddListener(e, t, resolver, { once: true })
          if (t !== 'error') {
            addErrorHandlerIfEventEmitter(e, errorListener, { once: true })
          }
        })
      }
      function addErrorHandlerIfEventEmitter(e, t, n) {
        if (typeof e.on === 'function') {
          eventTargetAgnosticAddListener(e, 'error', t, n)
        }
      }
      function eventTargetAgnosticAddListener(e, t, n, r) {
        if (typeof e.on === 'function') {
          if (r.once) {
            e.once(t, n)
          } else {
            e.on(t, n)
          }
        } else if (typeof e.addEventListener === 'function') {
          e.addEventListener(t, function wrapListener(i) {
            if (r.once) {
              e.removeEventListener(t, wrapListener)
            }
            n(i)
          })
        } else {
          throw new TypeError(
            'The "emitter" argument must be of type EventEmitter. Received type ' +
              typeof e
          )
        }
      }
    },
  }
  var t = {}
  function __nccwpck_require__(n) {
    var r = t[n]
    if (r !== undefined) {
      return r.exports
    }
    var i = (t[n] = { exports: {} })
    var s = true
    try {
      e[n](i, i.exports, __nccwpck_require__)
      s = false
    } finally {
      if (s) delete t[n]
    }
    return i.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var n = __nccwpck_require__(864)
  module.exports = n
})()
