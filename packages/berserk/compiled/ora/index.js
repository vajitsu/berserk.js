;(() => {
  var e = {
    511: (e) => {
      e.exports = ({ onlyFirst: e = false } = {}) => {
        const t = [
          '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
          '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
        ].join('|')
        return new RegExp(t, e ? undefined : 'g')
      }
    },
    581: (e, t, r) => {
      const s = r(154)
      let i = false
      t.show = (e = process.stderr) => {
        if (!e.isTTY) {
          return
        }
        i = false
        e.write('[?25h')
      }
      t.hide = (e = process.stderr) => {
        if (!e.isTTY) {
          return
        }
        s()
        i = true
        e.write('[?25l')
      }
      t.toggle = (e, r) => {
        if (e !== undefined) {
          i = e
        }
        if (i) {
          t.show(r)
        } else {
          t.hide(r)
        }
      }
    },
    592: (e, t, r) => {
      const s = Object.assign({}, r(213))
      const i = Object.keys(s)
      Object.defineProperty(s, 'random', {
        get() {
          const e = Math.floor(Math.random() * i.length)
          const t = i[e]
          return s[t]
        },
      })
      e.exports = s
    },
    578: (e) => {
      var t = (function () {
        function clone(e, t, r, s) {
          var i
          if (typeof t === 'object') {
            r = t.depth
            s = t.prototype
            i = t.filter
            t = t.circular
          }
          var n = []
          var o = []
          var a = typeof Buffer != 'undefined'
          if (typeof t == 'undefined') t = true
          if (typeof r == 'undefined') r = Infinity
          function _clone(e, r) {
            if (e === null) return null
            if (r == 0) return e
            var i
            var l
            if (typeof e != 'object') {
              return e
            }
            if (clone.__isArray(e)) {
              i = []
            } else if (clone.__isRegExp(e)) {
              i = new RegExp(e.source, __getRegExpFlags(e))
              if (e.lastIndex) i.lastIndex = e.lastIndex
            } else if (clone.__isDate(e)) {
              i = new Date(e.getTime())
            } else if (a && Buffer.isBuffer(e)) {
              if (Buffer.allocUnsafe) {
                i = Buffer.allocUnsafe(e.length)
              } else {
                i = new Buffer(e.length)
              }
              e.copy(i)
              return i
            } else {
              if (typeof s == 'undefined') {
                l = Object.getPrototypeOf(e)
                i = Object.create(l)
              } else {
                i = Object.create(s)
                l = s
              }
            }
            if (t) {
              var _ = n.indexOf(e)
              if (_ != -1) {
                return o[_]
              }
              n.push(e)
              o.push(i)
            }
            for (var f in e) {
              var u
              if (l) {
                u = Object.getOwnPropertyDescriptor(l, f)
              }
              if (u && u.set == null) {
                continue
              }
              i[f] = _clone(e[f], r - 1)
            }
            return i
          }
          return _clone(e, r)
        }
        clone.clonePrototype = function clonePrototype(e) {
          if (e === null) return null
          var c = function () {}
          c.prototype = e
          return new c()
        }
        function __objToStr(e) {
          return Object.prototype.toString.call(e)
        }
        clone.__objToStr = __objToStr
        function __isDate(e) {
          return typeof e === 'object' && __objToStr(e) === '[object Date]'
        }
        clone.__isDate = __isDate
        function __isArray(e) {
          return typeof e === 'object' && __objToStr(e) === '[object Array]'
        }
        clone.__isArray = __isArray
        function __isRegExp(e) {
          return typeof e === 'object' && __objToStr(e) === '[object RegExp]'
        }
        clone.__isRegExp = __isRegExp
        function __getRegExpFlags(e) {
          var t = ''
          if (e.global) t += 'g'
          if (e.ignoreCase) t += 'i'
          if (e.multiline) t += 'm'
          return t
        }
        clone.__getRegExpFlags = __getRegExpFlags
        return clone
      })()
      if (true && e.exports) {
        e.exports = t
      }
    },
    983: (e, t, r) => {
      var s = r(578)
      e.exports = function (e, t) {
        e = e || {}
        Object.keys(t).forEach(function (r) {
          if (typeof e[r] === 'undefined') {
            e[r] = s(t[r])
          }
        })
        return e
      }
    },
    934: (e) => {
      e.exports = ({ stream: e = process.stdout } = {}) =>
        Boolean(
          e && e.isTTY && process.env.TERM !== 'dumb' && !('CI' in process.env)
        )
    },
    663: (e, t, r) => {
      const s = r(287)
      const i =
        process.platform !== 'win32' ||
        process.env.CI ||
        process.env.TERM === 'xterm-256color'
      const n = {
        info: s.blue('ℹ'),
        success: s.green('✔'),
        warning: s.yellow('⚠'),
        error: s.red('✖'),
      }
      const o = {
        info: s.blue('i'),
        success: s.green('√'),
        warning: s.yellow('‼'),
        error: s.red('×'),
      }
      e.exports = i ? n : o
    },
    469: (e) => {
      const mimicFn = (e, t) => {
        for (const r of Reflect.ownKeys(t)) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r))
        }
        return e
      }
      e.exports = mimicFn
      e.exports['default'] = mimicFn
    },
    502: (e, t, r) => {
      var s = r(781)
      e.exports = MuteStream
      function MuteStream(e) {
        s.apply(this)
        e = e || {}
        this.writable = this.readable = true
        this.muted = false
        this.on('pipe', this._onpipe)
        this.replace = e.replace
        this._prompt = e.prompt || null
        this._hadControl = false
      }
      MuteStream.prototype = Object.create(s.prototype)
      Object.defineProperty(MuteStream.prototype, 'constructor', {
        value: MuteStream,
        enumerable: false,
      })
      MuteStream.prototype.mute = function () {
        this.muted = true
      }
      MuteStream.prototype.unmute = function () {
        this.muted = false
      }
      Object.defineProperty(MuteStream.prototype, '_onpipe', {
        value: onPipe,
        enumerable: false,
        writable: true,
        configurable: true,
      })
      function onPipe(e) {
        this._src = e
      }
      Object.defineProperty(MuteStream.prototype, 'isTTY', {
        get: getIsTTY,
        set: setIsTTY,
        enumerable: true,
        configurable: true,
      })
      function getIsTTY() {
        return this._dest
          ? this._dest.isTTY
          : this._src
          ? this._src.isTTY
          : false
      }
      function setIsTTY(e) {
        Object.defineProperty(this, 'isTTY', {
          value: e,
          enumerable: true,
          writable: true,
          configurable: true,
        })
      }
      Object.defineProperty(MuteStream.prototype, 'rows', {
        get: function () {
          return this._dest
            ? this._dest.rows
            : this._src
            ? this._src.rows
            : undefined
        },
        enumerable: true,
        configurable: true,
      })
      Object.defineProperty(MuteStream.prototype, 'columns', {
        get: function () {
          return this._dest
            ? this._dest.columns
            : this._src
            ? this._src.columns
            : undefined
        },
        enumerable: true,
        configurable: true,
      })
      MuteStream.prototype.pipe = function (e, t) {
        this._dest = e
        return s.prototype.pipe.call(this, e, t)
      }
      MuteStream.prototype.pause = function () {
        if (this._src) return this._src.pause()
      }
      MuteStream.prototype.resume = function () {
        if (this._src) return this._src.resume()
      }
      MuteStream.prototype.write = function (e) {
        if (this.muted) {
          if (!this.replace) return true
          if (e.match(/^\u001b/)) {
            if (e.indexOf(this._prompt) === 0) {
              e = e.substr(this._prompt.length)
              e = e.replace(/./g, this.replace)
              e = this._prompt + e
            }
            this._hadControl = true
            return this.emit('data', e)
          } else {
            if (
              this._prompt &&
              this._hadControl &&
              e.indexOf(this._prompt) === 0
            ) {
              this._hadControl = false
              this.emit('data', this._prompt)
              e = e.substr(this._prompt.length)
            }
            e = e.toString().replace(/./g, this.replace)
          }
        }
        this.emit('data', e)
      }
      MuteStream.prototype.end = function (e) {
        if (this.muted) {
          if (e && this.replace) {
            e = e.toString().replace(/./g, this.replace)
          } else {
            e = null
          }
        }
        if (e) this.emit('data', e)
        this.emit('end')
      }
      function proxy(e) {
        return function () {
          var t = this._dest
          var r = this._src
          if (t && t[e]) t[e].apply(t, arguments)
          if (r && r[e]) r[e].apply(r, arguments)
        }
      }
      MuteStream.prototype.destroy = proxy('destroy')
      MuteStream.prototype.destroySoon = proxy('destroySoon')
      MuteStream.prototype.close = proxy('close')
    },
    430: (e, t, r) => {
      const s = r(469)
      const i = new WeakMap()
      const onetime = (e, t = {}) => {
        if (typeof e !== 'function') {
          throw new TypeError('Expected a function')
        }
        let r
        let n = 0
        const o = e.displayName || e.name || '<anonymous>'
        const onetime = function (...s) {
          i.set(onetime, ++n)
          if (n === 1) {
            r = e.apply(this, s)
            e = null
          } else if (t.throw === true) {
            throw new Error(`Function \`${o}\` can only be called once`)
          }
          return r
        }
        s(onetime, e)
        i.set(onetime, n)
        return onetime
      }
      e.exports = onetime
      e.exports['default'] = onetime
      e.exports.callCount = (e) => {
        if (!i.has(e)) {
          throw new Error(
            `The given function \`${e.name}\` is not wrapped by the \`onetime\` package`
          )
        }
        return i.get(e)
      }
    },
    327: (e, t, r) => {
      const s = r(521)
      const i = r(287)
      const n = r(581)
      const o = r(592)
      const a = r(663)
      const l = r(81)
      const _ = r(457)
      const f = r(934)
      const u = r(502)
      const p = Symbol('text')
      const h = Symbol('prefixText')
      const m = 3
      class StdinDiscarder {
        constructor() {
          this.requests = 0
          this.mutedStream = new u()
          this.mutedStream.pipe(process.stdout)
          this.mutedStream.mute()
          const e = this
          this.ourEmit = function (t, r, ...s) {
            const { stdin: i } = process
            if (e.requests > 0 || i.emit === e.ourEmit) {
              if (t === 'keypress') {
                return
              }
              if (t === 'data' && r.includes(m)) {
                process.emit('SIGINT')
              }
              Reflect.apply(e.oldEmit, this, [t, r, ...s])
            } else {
              Reflect.apply(process.stdin.emit, this, [t, r, ...s])
            }
          }
        }
        start() {
          this.requests++
          if (this.requests === 1) {
            this.realStart()
          }
        }
        stop() {
          if (this.requests <= 0) {
            throw new Error('`stop` called more times than `start`')
          }
          this.requests--
          if (this.requests === 0) {
            this.realStop()
          }
        }
        realStart() {
          if (process.platform === 'win32') {
            return
          }
          this.rl = s.createInterface({
            input: process.stdin,
            output: this.mutedStream,
          })
          this.rl.on('SIGINT', () => {
            if (process.listenerCount('SIGINT') === 0) {
              process.emit('SIGINT')
            } else {
              this.rl.close()
              process.kill(process.pid, 'SIGINT')
            }
          })
        }
        realStop() {
          if (process.platform === 'win32') {
            return
          }
          this.rl.close()
          this.rl = undefined
        }
      }
      const d = new StdinDiscarder()
      class Ora {
        constructor(e) {
          if (typeof e === 'string') {
            e = { text: e }
          }
          this.options = {
            text: '',
            color: 'cyan',
            stream: process.stderr,
            discardStdin: true,
            ...e,
          }
          this.spinner = this.options.spinner
          this.color = this.options.color
          this.hideCursor = this.options.hideCursor !== false
          this.interval = this.options.interval || this.spinner.interval || 100
          this.stream = this.options.stream
          this.id = undefined
          this.isEnabled =
            typeof this.options.isEnabled === 'boolean'
              ? this.options.isEnabled
              : f({ stream: this.stream })
          this.text = this.options.text
          this.prefixText = this.options.prefixText
          this.linesToClear = 0
          this.indent = this.options.indent
          this.discardStdin = this.options.discardStdin
          this.isDiscardingStdin = false
        }
        get indent() {
          return this._indent
        }
        set indent(e = 0) {
          if (!(e >= 0 && Number.isInteger(e))) {
            throw new Error(
              'The `indent` option must be an integer from 0 and up'
            )
          }
          this._indent = e
        }
        _updateInterval(e) {
          if (e !== undefined) {
            this.interval = e
          }
        }
        get spinner() {
          return this._spinner
        }
        set spinner(e) {
          this.frameIndex = 0
          if (typeof e === 'object') {
            if (e.frames === undefined) {
              throw new Error('The given spinner must have a `frames` property')
            }
            this._spinner = e
          } else if (process.platform === 'win32') {
            this._spinner = o.line
          } else if (e === undefined) {
            this._spinner = o.dots
          } else if (o[e]) {
            this._spinner = o[e]
          } else {
            throw new Error(
              `There is no built-in spinner named '${e}'. See https://github.com/sindresorhus/cli-spinners/blob/master/spinners.json for a full list.`
            )
          }
          this._updateInterval(this._spinner.interval)
        }
        get text() {
          return this[p]
        }
        get prefixText() {
          return this[h]
        }
        get isSpinning() {
          return this.id !== undefined
        }
        updateLineCount() {
          const e = this.stream.columns || 80
          const t = typeof this[h] === 'string' ? this[h] + '-' : ''
          this.lineCount = l(t + '--' + this[p])
            .split('\n')
            .reduce((t, r) => t + Math.max(1, Math.ceil(_(r) / e)), 0)
        }
        set text(e) {
          this[p] = e
          this.updateLineCount()
        }
        set prefixText(e) {
          this[h] = e
          this.updateLineCount()
        }
        frame() {
          const { frames: e } = this.spinner
          let t = e[this.frameIndex]
          if (this.color) {
            t = i[this.color](t)
          }
          this.frameIndex = ++this.frameIndex % e.length
          const r =
            typeof this.prefixText === 'string' && this.prefixText !== ''
              ? this.prefixText + ' '
              : ''
          const s = typeof this.text === 'string' ? ' ' + this.text : ''
          return r + t + s
        }
        clear() {
          if (!this.isEnabled || !this.stream.isTTY) {
            return this
          }
          for (let e = 0; e < this.linesToClear; e++) {
            if (e > 0) {
              this.stream.moveCursor(0, -1)
            }
            this.stream.clearLine()
            this.stream.cursorTo(this.indent)
          }
          this.linesToClear = 0
          return this
        }
        render() {
          this.clear()
          this.stream.write(this.frame())
          this.linesToClear = this.lineCount
          return this
        }
        start(e) {
          if (e) {
            this.text = e
          }
          if (!this.isEnabled) {
            if (this.text) {
              this.stream.write(`- ${this.text}\n`)
            }
            return this
          }
          if (this.isSpinning) {
            return this
          }
          if (this.hideCursor) {
            n.hide(this.stream)
          }
          if (this.discardStdin && process.stdin.isTTY) {
            this.isDiscardingStdin = true
            d.start()
          }
          this.render()
          this.id = setInterval(this.render.bind(this), this.interval)
          return this
        }
        stop() {
          if (!this.isEnabled) {
            return this
          }
          clearInterval(this.id)
          this.id = undefined
          this.frameIndex = 0
          this.clear()
          if (this.hideCursor) {
            n.show(this.stream)
          }
          if (
            this.discardStdin &&
            process.stdin.isTTY &&
            this.isDiscardingStdin
          ) {
            d.stop()
            this.isDiscardingStdin = false
          }
          return this
        }
        succeed(e) {
          return this.stopAndPersist({ symbol: a.success, text: e })
        }
        fail(e) {
          return this.stopAndPersist({ symbol: a.error, text: e })
        }
        warn(e) {
          return this.stopAndPersist({ symbol: a.warning, text: e })
        }
        info(e) {
          return this.stopAndPersist({ symbol: a.info, text: e })
        }
        stopAndPersist(e = {}) {
          const t = e.prefixText || this.prefixText
          const r = typeof t === 'string' && t !== '' ? t + ' ' : ''
          const s = e.text || this.text
          const i = typeof s === 'string' ? ' ' + s : ''
          this.stop()
          this.stream.write(`${r}${e.symbol || ' '}${i}\n`)
          return this
        }
      }
      const oraFactory = function (e) {
        return new Ora(e)
      }
      e.exports = oraFactory
      e.exports.promise = (e, t) => {
        if (typeof e.then !== 'function') {
          throw new TypeError('Parameter `action` must be a Promise')
        }
        const r = new Ora(t)
        r.start()
        ;(async () => {
          try {
            await e
            r.succeed()
          } catch (e) {
            r.fail()
          }
        })()
        return r
      }
    },
    154: (e, t, r) => {
      const s = r(430)
      const i = r(234)
      e.exports = s(() => {
        i(
          () => {
            process.stderr.write('[?25h')
          },
          { alwaysLast: true }
        )
      })
    },
    234: (e, t, r) => {
      var s = global.process
      const processOk = function (e) {
        return (
          e &&
          typeof e === 'object' &&
          typeof e.removeListener === 'function' &&
          typeof e.emit === 'function' &&
          typeof e.reallyExit === 'function' &&
          typeof e.listeners === 'function' &&
          typeof e.kill === 'function' &&
          typeof e.pid === 'number' &&
          typeof e.on === 'function'
        )
      }
      if (!processOk(s)) {
        e.exports = function () {
          return function () {}
        }
      } else {
        var i = r(491)
        var n = r(986)
        var o = /^win/i.test(s.platform)
        var a = r(361)
        if (typeof a !== 'function') {
          a = a.EventEmitter
        }
        var l
        if (s.__signal_exit_emitter__) {
          l = s.__signal_exit_emitter__
        } else {
          l = s.__signal_exit_emitter__ = new a()
          l.count = 0
          l.emitted = {}
        }
        if (!l.infinite) {
          l.setMaxListeners(Infinity)
          l.infinite = true
        }
        e.exports = function (e, t) {
          if (!processOk(global.process)) {
            return function () {}
          }
          i.equal(
            typeof e,
            'function',
            'a callback must be provided for exit handler'
          )
          if (p === false) {
            h()
          }
          var r = 'exit'
          if (t && t.alwaysLast) {
            r = 'afterexit'
          }
          var remove = function () {
            l.removeListener(r, e)
            if (
              l.listeners('exit').length === 0 &&
              l.listeners('afterexit').length === 0
            ) {
              _()
            }
          }
          l.on(r, e)
          return remove
        }
        var _ = function unload() {
          if (!p || !processOk(global.process)) {
            return
          }
          p = false
          n.forEach(function (e) {
            try {
              s.removeListener(e, u[e])
            } catch (e) {}
          })
          s.emit = v
          s.reallyExit = m
          l.count -= 1
        }
        e.exports.unload = _
        var f = function emit(e, t, r) {
          if (l.emitted[e]) {
            return
          }
          l.emitted[e] = true
          l.emit(e, t, r)
        }
        var u = {}
        n.forEach(function (e) {
          u[e] = function listener() {
            if (!processOk(global.process)) {
              return
            }
            var t = s.listeners(e)
            if (t.length === l.count) {
              _()
              f('exit', null, e)
              f('afterexit', null, e)
              if (o && e === 'SIGHUP') {
                e = 'SIGINT'
              }
              s.kill(s.pid, e)
            }
          }
        })
        e.exports.signals = function () {
          return n
        }
        var p = false
        var h = function load() {
          if (p || !processOk(global.process)) {
            return
          }
          p = true
          l.count += 1
          n = n.filter(function (e) {
            try {
              s.on(e, u[e])
              return true
            } catch (e) {
              return false
            }
          })
          s.emit = g
          s.reallyExit = d
        }
        e.exports.load = h
        var m = s.reallyExit
        var d = function processReallyExit(e) {
          if (!processOk(global.process)) {
            return
          }
          s.exitCode = e || 0
          f('exit', s.exitCode, null)
          f('afterexit', s.exitCode, null)
          m.call(s, s.exitCode)
        }
        var v = s.emit
        var g = function processEmit(e, t) {
          if (e === 'exit' && processOk(global.process)) {
            if (t !== undefined) {
              s.exitCode = t
            }
            var r = v.apply(this, arguments)
            f('exit', s.exitCode, null)
            f('afterexit', s.exitCode, null)
            return r
          } else {
            return v.apply(this, arguments)
          }
        }
      }
    },
    986: (e) => {
      e.exports = ['SIGABRT', 'SIGALRM', 'SIGHUP', 'SIGINT', 'SIGTERM']
      if (process.platform !== 'win32') {
        e.exports.push(
          'SIGVTALRM',
          'SIGXCPU',
          'SIGXFSZ',
          'SIGUSR2',
          'SIGTRAP',
          'SIGSYS',
          'SIGQUIT',
          'SIGIOT'
        )
      }
      if (process.platform === 'linux') {
        e.exports.push('SIGIO', 'SIGPOLL', 'SIGPWR', 'SIGSTKFLT', 'SIGUNUSED')
      }
    },
    81: (e, t, r) => {
      const s = r(511)
      e.exports = (e) => (typeof e === 'string' ? e.replace(s(), '') : e)
    },
    567: (e) => {
      e.exports = [
        [768, 879],
        [1155, 1158],
        [1160, 1161],
        [1425, 1469],
        [1471, 1471],
        [1473, 1474],
        [1476, 1477],
        [1479, 1479],
        [1536, 1539],
        [1552, 1557],
        [1611, 1630],
        [1648, 1648],
        [1750, 1764],
        [1767, 1768],
        [1770, 1773],
        [1807, 1807],
        [1809, 1809],
        [1840, 1866],
        [1958, 1968],
        [2027, 2035],
        [2305, 2306],
        [2364, 2364],
        [2369, 2376],
        [2381, 2381],
        [2385, 2388],
        [2402, 2403],
        [2433, 2433],
        [2492, 2492],
        [2497, 2500],
        [2509, 2509],
        [2530, 2531],
        [2561, 2562],
        [2620, 2620],
        [2625, 2626],
        [2631, 2632],
        [2635, 2637],
        [2672, 2673],
        [2689, 2690],
        [2748, 2748],
        [2753, 2757],
        [2759, 2760],
        [2765, 2765],
        [2786, 2787],
        [2817, 2817],
        [2876, 2876],
        [2879, 2879],
        [2881, 2883],
        [2893, 2893],
        [2902, 2902],
        [2946, 2946],
        [3008, 3008],
        [3021, 3021],
        [3134, 3136],
        [3142, 3144],
        [3146, 3149],
        [3157, 3158],
        [3260, 3260],
        [3263, 3263],
        [3270, 3270],
        [3276, 3277],
        [3298, 3299],
        [3393, 3395],
        [3405, 3405],
        [3530, 3530],
        [3538, 3540],
        [3542, 3542],
        [3633, 3633],
        [3636, 3642],
        [3655, 3662],
        [3761, 3761],
        [3764, 3769],
        [3771, 3772],
        [3784, 3789],
        [3864, 3865],
        [3893, 3893],
        [3895, 3895],
        [3897, 3897],
        [3953, 3966],
        [3968, 3972],
        [3974, 3975],
        [3984, 3991],
        [3993, 4028],
        [4038, 4038],
        [4141, 4144],
        [4146, 4146],
        [4150, 4151],
        [4153, 4153],
        [4184, 4185],
        [4448, 4607],
        [4959, 4959],
        [5906, 5908],
        [5938, 5940],
        [5970, 5971],
        [6002, 6003],
        [6068, 6069],
        [6071, 6077],
        [6086, 6086],
        [6089, 6099],
        [6109, 6109],
        [6155, 6157],
        [6313, 6313],
        [6432, 6434],
        [6439, 6440],
        [6450, 6450],
        [6457, 6459],
        [6679, 6680],
        [6912, 6915],
        [6964, 6964],
        [6966, 6970],
        [6972, 6972],
        [6978, 6978],
        [7019, 7027],
        [7616, 7626],
        [7678, 7679],
        [8203, 8207],
        [8234, 8238],
        [8288, 8291],
        [8298, 8303],
        [8400, 8431],
        [12330, 12335],
        [12441, 12442],
        [43014, 43014],
        [43019, 43019],
        [43045, 43046],
        [64286, 64286],
        [65024, 65039],
        [65056, 65059],
        [65279, 65279],
        [65529, 65531],
        [68097, 68099],
        [68101, 68102],
        [68108, 68111],
        [68152, 68154],
        [68159, 68159],
        [119143, 119145],
        [119155, 119170],
        [119173, 119179],
        [119210, 119213],
        [119362, 119364],
        [917505, 917505],
        [917536, 917631],
        [917760, 917999],
      ]
    },
    457: (e, t, r) => {
      var s = r(983)
      var i = r(567)
      var n = { nul: 0, control: 0 }
      e.exports = function wcwidth(e) {
        return wcswidth(e, n)
      }
      e.exports.config = function (e) {
        e = s(e || {}, n)
        return function wcwidth(t) {
          return wcswidth(t, e)
        }
      }
      function wcswidth(e, t) {
        if (typeof e !== 'string') return wcwidth(e, t)
        var r = 0
        for (var s = 0; s < e.length; s++) {
          var i = wcwidth(e.charCodeAt(s), t)
          if (i < 0) return -1
          r += i
        }
        return r
      }
      function wcwidth(e, t) {
        if (e === 0) return t.nul
        if (e < 32 || (e >= 127 && e < 160)) return t.control
        if (bisearch(e)) return 0
        return (
          1 +
          (e >= 4352 &&
            (e <= 4447 ||
              e == 9001 ||
              e == 9002 ||
              (e >= 11904 && e <= 42191 && e != 12351) ||
              (e >= 44032 && e <= 55203) ||
              (e >= 63744 && e <= 64255) ||
              (e >= 65040 && e <= 65049) ||
              (e >= 65072 && e <= 65135) ||
              (e >= 65280 && e <= 65376) ||
              (e >= 65504 && e <= 65510) ||
              (e >= 131072 && e <= 196605) ||
              (e >= 196608 && e <= 262141)))
        )
      }
      function bisearch(e) {
        var t = 0
        var r = i.length - 1
        var s
        if (e < i[0][0] || e > i[r][1]) return false
        while (r >= t) {
          s = Math.floor((t + r) / 2)
          if (e > i[s][1]) t = s + 1
          else if (e < i[s][0]) r = s - 1
          else return true
        }
        return false
      }
    },
    491: (e) => {
      e.exports = require('assert')
    },
    361: (e) => {
      e.exports = require('events')
    },
    287: (e) => {
      e.exports = require('berserk/dist/compiled/chalk')
    },
    521: (e) => {
      e.exports = require('readline')
    },
    781: (e) => {
      e.exports = require('stream')
    },
    213: (e) => {
      e.exports = JSON.parse(
        '{"dots":{"interval":80,"frames":["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"]},"dots2":{"interval":80,"frames":["⣾","⣽","⣻","⢿","⡿","⣟","⣯","⣷"]},"dots3":{"interval":80,"frames":["⠋","⠙","⠚","⠞","⠖","⠦","⠴","⠲","⠳","⠓"]},"dots4":{"interval":80,"frames":["⠄","⠆","⠇","⠋","⠙","⠸","⠰","⠠","⠰","⠸","⠙","⠋","⠇","⠆"]},"dots5":{"interval":80,"frames":["⠋","⠙","⠚","⠒","⠂","⠂","⠒","⠲","⠴","⠦","⠖","⠒","⠐","⠐","⠒","⠓","⠋"]},"dots6":{"interval":80,"frames":["⠁","⠉","⠙","⠚","⠒","⠂","⠂","⠒","⠲","⠴","⠤","⠄","⠄","⠤","⠴","⠲","⠒","⠂","⠂","⠒","⠚","⠙","⠉","⠁"]},"dots7":{"interval":80,"frames":["⠈","⠉","⠋","⠓","⠒","⠐","⠐","⠒","⠖","⠦","⠤","⠠","⠠","⠤","⠦","⠖","⠒","⠐","⠐","⠒","⠓","⠋","⠉","⠈"]},"dots8":{"interval":80,"frames":["⠁","⠁","⠉","⠙","⠚","⠒","⠂","⠂","⠒","⠲","⠴","⠤","⠄","⠄","⠤","⠠","⠠","⠤","⠦","⠖","⠒","⠐","⠐","⠒","⠓","⠋","⠉","⠈","⠈"]},"dots9":{"interval":80,"frames":["⢹","⢺","⢼","⣸","⣇","⡧","⡗","⡏"]},"dots10":{"interval":80,"frames":["⢄","⢂","⢁","⡁","⡈","⡐","⡠"]},"dots11":{"interval":100,"frames":["⠁","⠂","⠄","⡀","⢀","⠠","⠐","⠈"]},"dots12":{"interval":80,"frames":["⢀⠀","⡀⠀","⠄⠀","⢂⠀","⡂⠀","⠅⠀","⢃⠀","⡃⠀","⠍⠀","⢋⠀","⡋⠀","⠍⠁","⢋⠁","⡋⠁","⠍⠉","⠋⠉","⠋⠉","⠉⠙","⠉⠙","⠉⠩","⠈⢙","⠈⡙","⢈⠩","⡀⢙","⠄⡙","⢂⠩","⡂⢘","⠅⡘","⢃⠨","⡃⢐","⠍⡐","⢋⠠","⡋⢀","⠍⡁","⢋⠁","⡋⠁","⠍⠉","⠋⠉","⠋⠉","⠉⠙","⠉⠙","⠉⠩","⠈⢙","⠈⡙","⠈⠩","⠀⢙","⠀⡙","⠀⠩","⠀⢘","⠀⡘","⠀⠨","⠀⢐","⠀⡐","⠀⠠","⠀⢀","⠀⡀"]},"dots13":{"interval":80,"frames":["⣼","⣹","⢻","⠿","⡟","⣏","⣧","⣶"]},"dots8Bit":{"interval":80,"frames":["⠀","⠁","⠂","⠃","⠄","⠅","⠆","⠇","⡀","⡁","⡂","⡃","⡄","⡅","⡆","⡇","⠈","⠉","⠊","⠋","⠌","⠍","⠎","⠏","⡈","⡉","⡊","⡋","⡌","⡍","⡎","⡏","⠐","⠑","⠒","⠓","⠔","⠕","⠖","⠗","⡐","⡑","⡒","⡓","⡔","⡕","⡖","⡗","⠘","⠙","⠚","⠛","⠜","⠝","⠞","⠟","⡘","⡙","⡚","⡛","⡜","⡝","⡞","⡟","⠠","⠡","⠢","⠣","⠤","⠥","⠦","⠧","⡠","⡡","⡢","⡣","⡤","⡥","⡦","⡧","⠨","⠩","⠪","⠫","⠬","⠭","⠮","⠯","⡨","⡩","⡪","⡫","⡬","⡭","⡮","⡯","⠰","⠱","⠲","⠳","⠴","⠵","⠶","⠷","⡰","⡱","⡲","⡳","⡴","⡵","⡶","⡷","⠸","⠹","⠺","⠻","⠼","⠽","⠾","⠿","⡸","⡹","⡺","⡻","⡼","⡽","⡾","⡿","⢀","⢁","⢂","⢃","⢄","⢅","⢆","⢇","⣀","⣁","⣂","⣃","⣄","⣅","⣆","⣇","⢈","⢉","⢊","⢋","⢌","⢍","⢎","⢏","⣈","⣉","⣊","⣋","⣌","⣍","⣎","⣏","⢐","⢑","⢒","⢓","⢔","⢕","⢖","⢗","⣐","⣑","⣒","⣓","⣔","⣕","⣖","⣗","⢘","⢙","⢚","⢛","⢜","⢝","⢞","⢟","⣘","⣙","⣚","⣛","⣜","⣝","⣞","⣟","⢠","⢡","⢢","⢣","⢤","⢥","⢦","⢧","⣠","⣡","⣢","⣣","⣤","⣥","⣦","⣧","⢨","⢩","⢪","⢫","⢬","⢭","⢮","⢯","⣨","⣩","⣪","⣫","⣬","⣭","⣮","⣯","⢰","⢱","⢲","⢳","⢴","⢵","⢶","⢷","⣰","⣱","⣲","⣳","⣴","⣵","⣶","⣷","⢸","⢹","⢺","⢻","⢼","⢽","⢾","⢿","⣸","⣹","⣺","⣻","⣼","⣽","⣾","⣿"]},"sand":{"interval":80,"frames":["⠁","⠂","⠄","⡀","⡈","⡐","⡠","⣀","⣁","⣂","⣄","⣌","⣔","⣤","⣥","⣦","⣮","⣶","⣷","⣿","⡿","⠿","⢟","⠟","⡛","⠛","⠫","⢋","⠋","⠍","⡉","⠉","⠑","⠡","⢁"]},"line":{"interval":130,"frames":["-","\\\\","|","/"]},"line2":{"interval":100,"frames":["⠂","-","–","—","–","-"]},"pipe":{"interval":100,"frames":["┤","┘","┴","└","├","┌","┬","┐"]},"simpleDots":{"interval":400,"frames":[".  ",".. ","...","   "]},"simpleDotsScrolling":{"interval":200,"frames":[".  ",".. ","..."," ..","  .","   "]},"star":{"interval":70,"frames":["✶","✸","✹","✺","✹","✷"]},"star2":{"interval":80,"frames":["+","x","*"]},"flip":{"interval":70,"frames":["_","_","_","-","`","`","\'","´","-","_","_","_"]},"hamburger":{"interval":100,"frames":["☱","☲","☴"]},"growVertical":{"interval":120,"frames":["▁","▃","▄","▅","▆","▇","▆","▅","▄","▃"]},"growHorizontal":{"interval":120,"frames":["▏","▎","▍","▌","▋","▊","▉","▊","▋","▌","▍","▎"]},"balloon":{"interval":140,"frames":[" ",".","o","O","@","*"," "]},"balloon2":{"interval":120,"frames":[".","o","O","°","O","o","."]},"noise":{"interval":100,"frames":["▓","▒","░"]},"bounce":{"interval":120,"frames":["⠁","⠂","⠄","⠂"]},"boxBounce":{"interval":120,"frames":["▖","▘","▝","▗"]},"boxBounce2":{"interval":100,"frames":["▌","▀","▐","▄"]},"triangle":{"interval":50,"frames":["◢","◣","◤","◥"]},"arc":{"interval":100,"frames":["◜","◠","◝","◞","◡","◟"]},"circle":{"interval":120,"frames":["◡","⊙","◠"]},"squareCorners":{"interval":180,"frames":["◰","◳","◲","◱"]},"circleQuarters":{"interval":120,"frames":["◴","◷","◶","◵"]},"circleHalves":{"interval":50,"frames":["◐","◓","◑","◒"]},"squish":{"interval":100,"frames":["╫","╪"]},"toggle":{"interval":250,"frames":["⊶","⊷"]},"toggle2":{"interval":80,"frames":["▫","▪"]},"toggle3":{"interval":120,"frames":["□","■"]},"toggle4":{"interval":100,"frames":["■","□","▪","▫"]},"toggle5":{"interval":100,"frames":["▮","▯"]},"toggle6":{"interval":300,"frames":["ဝ","၀"]},"toggle7":{"interval":80,"frames":["⦾","⦿"]},"toggle8":{"interval":100,"frames":["◍","◌"]},"toggle9":{"interval":100,"frames":["◉","◎"]},"toggle10":{"interval":100,"frames":["㊂","㊀","㊁"]},"toggle11":{"interval":50,"frames":["⧇","⧆"]},"toggle12":{"interval":120,"frames":["☗","☖"]},"toggle13":{"interval":80,"frames":["=","*","-"]},"arrow":{"interval":100,"frames":["←","↖","↑","↗","→","↘","↓","↙"]},"arrow2":{"interval":80,"frames":["⬆️ ","↗️ ","➡️ ","↘️ ","⬇️ ","↙️ ","⬅️ ","↖️ "]},"arrow3":{"interval":120,"frames":["▹▹▹▹▹","▸▹▹▹▹","▹▸▹▹▹","▹▹▸▹▹","▹▹▹▸▹","▹▹▹▹▸"]},"bouncingBar":{"interval":80,"frames":["[    ]","[=   ]","[==  ]","[=== ]","[ ===]","[  ==]","[   =]","[    ]","[   =]","[  ==]","[ ===]","[====]","[=== ]","[==  ]","[=   ]"]},"bouncingBall":{"interval":80,"frames":["( ●    )","(  ●   )","(   ●  )","(    ● )","(     ●)","(    ● )","(   ●  )","(  ●   )","( ●    )","(●     )"]},"smiley":{"interval":200,"frames":["😄 ","😝 "]},"monkey":{"interval":300,"frames":["🙈 ","🙈 ","🙉 ","🙊 "]},"hearts":{"interval":100,"frames":["💛 ","💙 ","💜 ","💚 ","❤️ "]},"clock":{"interval":100,"frames":["🕛 ","🕐 ","🕑 ","🕒 ","🕓 ","🕔 ","🕕 ","🕖 ","🕗 ","🕘 ","🕙 ","🕚 "]},"earth":{"interval":180,"frames":["🌍 ","🌎 ","🌏 "]},"material":{"interval":17,"frames":["█▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","███▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","████▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","██████▁▁▁▁▁▁▁▁▁▁▁▁▁▁","██████▁▁▁▁▁▁▁▁▁▁▁▁▁▁","███████▁▁▁▁▁▁▁▁▁▁▁▁▁","████████▁▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","██████████▁▁▁▁▁▁▁▁▁▁","███████████▁▁▁▁▁▁▁▁▁","█████████████▁▁▁▁▁▁▁","██████████████▁▁▁▁▁▁","██████████████▁▁▁▁▁▁","▁██████████████▁▁▁▁▁","▁██████████████▁▁▁▁▁","▁██████████████▁▁▁▁▁","▁▁██████████████▁▁▁▁","▁▁▁██████████████▁▁▁","▁▁▁▁█████████████▁▁▁","▁▁▁▁██████████████▁▁","▁▁▁▁██████████████▁▁","▁▁▁▁▁██████████████▁","▁▁▁▁▁██████████████▁","▁▁▁▁▁██████████████▁","▁▁▁▁▁▁██████████████","▁▁▁▁▁▁██████████████","▁▁▁▁▁▁▁█████████████","▁▁▁▁▁▁▁█████████████","▁▁▁▁▁▁▁▁████████████","▁▁▁▁▁▁▁▁████████████","▁▁▁▁▁▁▁▁▁███████████","▁▁▁▁▁▁▁▁▁███████████","▁▁▁▁▁▁▁▁▁▁██████████","▁▁▁▁▁▁▁▁▁▁██████████","▁▁▁▁▁▁▁▁▁▁▁▁████████","▁▁▁▁▁▁▁▁▁▁▁▁▁███████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁██████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████","█▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████","██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███","██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███","███▁▁▁▁▁▁▁▁▁▁▁▁▁▁███","████▁▁▁▁▁▁▁▁▁▁▁▁▁▁██","█████▁▁▁▁▁▁▁▁▁▁▁▁▁▁█","█████▁▁▁▁▁▁▁▁▁▁▁▁▁▁█","██████▁▁▁▁▁▁▁▁▁▁▁▁▁█","████████▁▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","███████████▁▁▁▁▁▁▁▁▁","████████████▁▁▁▁▁▁▁▁","████████████▁▁▁▁▁▁▁▁","██████████████▁▁▁▁▁▁","██████████████▁▁▁▁▁▁","▁██████████████▁▁▁▁▁","▁██████████████▁▁▁▁▁","▁▁▁█████████████▁▁▁▁","▁▁▁▁▁████████████▁▁▁","▁▁▁▁▁████████████▁▁▁","▁▁▁▁▁▁███████████▁▁▁","▁▁▁▁▁▁▁▁█████████▁▁▁","▁▁▁▁▁▁▁▁█████████▁▁▁","▁▁▁▁▁▁▁▁▁█████████▁▁","▁▁▁▁▁▁▁▁▁█████████▁▁","▁▁▁▁▁▁▁▁▁▁█████████▁","▁▁▁▁▁▁▁▁▁▁▁████████▁","▁▁▁▁▁▁▁▁▁▁▁████████▁","▁▁▁▁▁▁▁▁▁▁▁▁███████▁","▁▁▁▁▁▁▁▁▁▁▁▁███████▁","▁▁▁▁▁▁▁▁▁▁▁▁▁███████","▁▁▁▁▁▁▁▁▁▁▁▁▁███████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁"]},"moon":{"interval":80,"frames":["🌑 ","🌒 ","🌓 ","🌔 ","🌕 ","🌖 ","🌗 ","🌘 "]},"runner":{"interval":140,"frames":["🚶 ","🏃 "]},"pong":{"interval":80,"frames":["▐⠂       ▌","▐⠈       ▌","▐ ⠂      ▌","▐ ⠠      ▌","▐  ⡀     ▌","▐  ⠠     ▌","▐   ⠂    ▌","▐   ⠈    ▌","▐    ⠂   ▌","▐    ⠠   ▌","▐     ⡀  ▌","▐     ⠠  ▌","▐      ⠂ ▌","▐      ⠈ ▌","▐       ⠂▌","▐       ⠠▌","▐       ⡀▌","▐      ⠠ ▌","▐      ⠂ ▌","▐     ⠈  ▌","▐     ⠂  ▌","▐    ⠠   ▌","▐    ⡀   ▌","▐   ⠠    ▌","▐   ⠂    ▌","▐  ⠈     ▌","▐  ⠂     ▌","▐ ⠠      ▌","▐ ⡀      ▌","▐⠠       ▌"]},"shark":{"interval":120,"frames":["▐|\\\\____________▌","▐_|\\\\___________▌","▐__|\\\\__________▌","▐___|\\\\_________▌","▐____|\\\\________▌","▐_____|\\\\_______▌","▐______|\\\\______▌","▐_______|\\\\_____▌","▐________|\\\\____▌","▐_________|\\\\___▌","▐__________|\\\\__▌","▐___________|\\\\_▌","▐____________|\\\\▌","▐____________/|▌","▐___________/|_▌","▐__________/|__▌","▐_________/|___▌","▐________/|____▌","▐_______/|_____▌","▐______/|______▌","▐_____/|_______▌","▐____/|________▌","▐___/|_________▌","▐__/|__________▌","▐_/|___________▌","▐/|____________▌"]},"dqpb":{"interval":100,"frames":["d","q","p","b"]},"weather":{"interval":100,"frames":["☀️ ","☀️ ","☀️ ","🌤 ","⛅️ ","🌥 ","☁️ ","🌧 ","🌨 ","🌧 ","🌨 ","🌧 ","🌨 ","⛈ ","🌨 ","🌧 ","🌨 ","☁️ ","🌥 ","⛅️ ","🌤 ","☀️ ","☀️ "]},"christmas":{"interval":400,"frames":["🌲","🎄"]},"grenade":{"interval":80,"frames":["،  ","′  "," ´ "," ‾ ","  ⸌","  ⸊","  |","  ⁎","  ⁕"," ෴ ","  ⁓","   ","   ","   "]},"point":{"interval":125,"frames":["∙∙∙","●∙∙","∙●∙","∙∙●","∙∙∙"]},"layer":{"interval":150,"frames":["-","=","≡"]},"betaWave":{"interval":80,"frames":["ρββββββ","βρβββββ","ββρββββ","βββρβββ","ββββρββ","βββββρβ","ββββββρ"]},"fingerDance":{"interval":160,"frames":["🤘 ","🤟 ","🖖 ","✋ ","🤚 ","👆 "]},"fistBump":{"interval":80,"frames":["🤜　　　　🤛 ","🤜　　　　🤛 ","🤜　　　　🤛 ","　🤜　　🤛　 ","　　🤜🤛　　 ","　🤜✨🤛　　 ","🤜　✨　🤛　 "]},"soccerHeader":{"interval":80,"frames":[" 🧑⚽️       🧑 ","🧑  ⚽️      🧑 ","🧑   ⚽️     🧑 ","🧑    ⚽️    🧑 ","🧑     ⚽️   🧑 ","🧑      ⚽️  🧑 ","🧑       ⚽️🧑  ","🧑      ⚽️  🧑 ","🧑     ⚽️   🧑 ","🧑    ⚽️    🧑 ","🧑   ⚽️     🧑 ","🧑  ⚽️      🧑 "]},"mindblown":{"interval":160,"frames":["😐 ","😐 ","😮 ","😮 ","😦 ","😦 ","😧 ","😧 ","🤯 ","💥 ","✨ ","　 ","　 ","　 "]},"speaker":{"interval":160,"frames":["🔈 ","🔉 ","🔊 ","🔉 "]},"orangePulse":{"interval":100,"frames":["🔸 ","🔶 ","🟠 ","🟠 ","🔶 "]},"bluePulse":{"interval":100,"frames":["🔹 ","🔷 ","🔵 ","🔵 ","🔷 "]},"orangeBluePulse":{"interval":100,"frames":["🔸 ","🔶 ","🟠 ","🟠 ","🔶 ","🔹 ","🔷 ","🔵 ","🔵 ","🔷 "]},"timeTravel":{"interval":100,"frames":["🕛 ","🕚 ","🕙 ","🕘 ","🕗 ","🕖 ","🕕 ","🕔 ","🕓 ","🕒 ","🕑 ","🕐 "]},"aesthetic":{"interval":80,"frames":["▰▱▱▱▱▱▱","▰▰▱▱▱▱▱","▰▰▰▱▱▱▱","▰▰▰▰▱▱▱","▰▰▰▰▰▱▱","▰▰▰▰▰▰▱","▰▰▰▰▰▰▰","▰▱▱▱▱▱▱"]}}'
      )
    },
  }
  var t = {}
  function __nccwpck_require__(r) {
    var s = t[r]
    if (s !== undefined) {
      return s.exports
    }
    var i = (t[r] = { exports: {} })
    var n = true
    try {
      e[r](i, i.exports, __nccwpck_require__)
      n = false
    } finally {
      if (n) delete t[r]
    }
    return i.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var r = __nccwpck_require__(327)
  module.exports = r
})()
