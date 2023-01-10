;(() => {
  var e = {
    660: (e) => {
      e.exports = function (e, t) {
        if (typeof e !== 'string') {
          throw new TypeError('Expected a string')
        }
        var i = String(e)
        var s = ''
        var r = t ? !!t.extended : false
        var n = t ? !!t.globstar : false
        var c = false
        var a = t && typeof t.flags === 'string' ? t.flags : ''
        var o
        for (var h = 0, f = i.length; h < f; h++) {
          o = i[h]
          switch (o) {
            case '/':
            case '$':
            case '^':
            case '+':
            case '.':
            case '(':
            case ')':
            case '=':
            case '!':
            case '|':
              s += '\\' + o
              break
            case '?':
              if (r) {
                s += '.'
                break
              }
            case '[':
            case ']':
              if (r) {
                s += o
                break
              }
            case '{':
              if (r) {
                c = true
                s += '('
                break
              }
            case '}':
              if (r) {
                c = false
                s += ')'
                break
              }
            case ',':
              if (c) {
                s += '|'
                break
              }
              s += '\\' + o
              break
            case '*':
              var l = i[h - 1]
              var u = 1
              while (i[h + 1] === '*') {
                u++
                h++
              }
              var d = i[h + 1]
              if (!n) {
                s += '.*'
              } else {
                var p =
                  u > 1 &&
                  (l === '/' || l === undefined) &&
                  (d === '/' || d === undefined)
                if (p) {
                  s += '((?:[^/]*(?:/|$))*)'
                  h++
                } else {
                  s += '([^/]*)'
                }
              }
              break
            default:
              s += o
          }
        }
        if (!a || !~a.indexOf('g')) {
          s = '^' + s + '$'
        }
        return new RegExp(s, a)
      }
    },
    444: (e) => {
      'use strict'
      e.exports = clone
      var t =
        Object.getPrototypeOf ||
        function (e) {
          return e.__proto__
        }
      function clone(e) {
        if (e === null || typeof e !== 'object') return e
        if (e instanceof Object) var i = { __proto__: t(e) }
        else var i = Object.create(null)
        Object.getOwnPropertyNames(e).forEach(function (t) {
          Object.defineProperty(i, t, Object.getOwnPropertyDescriptor(e, t))
        })
        return i
      }
    },
    165: (e, t, i) => {
      var s = i(147)
      var r = i(986)
      var n = i(78)
      var c = i(444)
      var a = i(837)
      var o
      var h
      if (typeof Symbol === 'function' && typeof Symbol.for === 'function') {
        o = Symbol.for('graceful-fs.queue')
        h = Symbol.for('graceful-fs.previous')
      } else {
        o = '___graceful-fs.queue'
        h = '___graceful-fs.previous'
      }
      function noop() {}
      function publishQueue(e, t) {
        Object.defineProperty(e, o, {
          get: function () {
            return t
          },
        })
      }
      var f = noop
      if (a.debuglog) f = a.debuglog('gfs4')
      else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
        f = function () {
          var e = a.format.apply(a, arguments)
          e = 'GFS4: ' + e.split(/\n/).join('\nGFS4: ')
          console.error(e)
        }
      if (!s[o]) {
        var l = global[o] || []
        publishQueue(s, l)
        s.close = (function (e) {
          function close(t, i) {
            return e.call(s, t, function (e) {
              if (!e) {
                resetQueue()
              }
              if (typeof i === 'function') i.apply(this, arguments)
            })
          }
          Object.defineProperty(close, h, { value: e })
          return close
        })(s.close)
        s.closeSync = (function (e) {
          function closeSync(t) {
            e.apply(s, arguments)
            resetQueue()
          }
          Object.defineProperty(closeSync, h, { value: e })
          return closeSync
        })(s.closeSync)
        if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
          process.on('exit', function () {
            f(s[o])
            i(491).equal(s[o].length, 0)
          })
        }
      }
      if (!global[o]) {
        publishQueue(global, s[o])
      }
      e.exports = patch(c(s))
      if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !s.__patched) {
        e.exports = patch(s)
        s.__patched = true
      }
      function patch(e) {
        r(e)
        e.gracefulify = patch
        e.createReadStream = createReadStream
        e.createWriteStream = createWriteStream
        var t = e.readFile
        e.readFile = readFile
        function readFile(e, i, s) {
          if (typeof i === 'function') (s = i), (i = null)
          return go$readFile(e, i, s)
          function go$readFile(e, i, s, r) {
            return t(e, i, function (t) {
              if (t && (t.code === 'EMFILE' || t.code === 'ENFILE'))
                enqueue([
                  go$readFile,
                  [e, i, s],
                  t,
                  r || Date.now(),
                  Date.now(),
                ])
              else {
                if (typeof s === 'function') s.apply(this, arguments)
              }
            })
          }
        }
        var i = e.writeFile
        e.writeFile = writeFile
        function writeFile(e, t, s, r) {
          if (typeof s === 'function') (r = s), (s = null)
          return go$writeFile(e, t, s, r)
          function go$writeFile(e, t, s, r, n) {
            return i(e, t, s, function (i) {
              if (i && (i.code === 'EMFILE' || i.code === 'ENFILE'))
                enqueue([
                  go$writeFile,
                  [e, t, s, r],
                  i,
                  n || Date.now(),
                  Date.now(),
                ])
              else {
                if (typeof r === 'function') r.apply(this, arguments)
              }
            })
          }
        }
        var s = e.appendFile
        if (s) e.appendFile = appendFile
        function appendFile(e, t, i, r) {
          if (typeof i === 'function') (r = i), (i = null)
          return go$appendFile(e, t, i, r)
          function go$appendFile(e, t, i, r, n) {
            return s(e, t, i, function (s) {
              if (s && (s.code === 'EMFILE' || s.code === 'ENFILE'))
                enqueue([
                  go$appendFile,
                  [e, t, i, r],
                  s,
                  n || Date.now(),
                  Date.now(),
                ])
              else {
                if (typeof r === 'function') r.apply(this, arguments)
              }
            })
          }
        }
        var c = e.copyFile
        if (c) e.copyFile = copyFile
        function copyFile(e, t, i, s) {
          if (typeof i === 'function') {
            s = i
            i = 0
          }
          return go$copyFile(e, t, i, s)
          function go$copyFile(e, t, i, s, r) {
            return c(e, t, i, function (n) {
              if (n && (n.code === 'EMFILE' || n.code === 'ENFILE'))
                enqueue([
                  go$copyFile,
                  [e, t, i, s],
                  n,
                  r || Date.now(),
                  Date.now(),
                ])
              else {
                if (typeof s === 'function') s.apply(this, arguments)
              }
            })
          }
        }
        var a = e.readdir
        e.readdir = readdir
        var o = /^v[0-5]\./
        function readdir(e, t, i) {
          if (typeof t === 'function') (i = t), (t = null)
          var s = o.test(process.version)
            ? function go$readdir(e, t, i, s) {
                return a(e, fs$readdirCallback(e, t, i, s))
              }
            : function go$readdir(e, t, i, s) {
                return a(e, t, fs$readdirCallback(e, t, i, s))
              }
          return s(e, t, i)
          function fs$readdirCallback(e, t, i, r) {
            return function (n, c) {
              if (n && (n.code === 'EMFILE' || n.code === 'ENFILE'))
                enqueue([s, [e, t, i], n, r || Date.now(), Date.now()])
              else {
                if (c && c.sort) c.sort()
                if (typeof i === 'function') i.call(this, n, c)
              }
            }
          }
        }
        if (process.version.substr(0, 4) === 'v0.8') {
          var h = n(e)
          ReadStream = h.ReadStream
          WriteStream = h.WriteStream
        }
        var f = e.ReadStream
        if (f) {
          ReadStream.prototype = Object.create(f.prototype)
          ReadStream.prototype.open = ReadStream$open
        }
        var l = e.WriteStream
        if (l) {
          WriteStream.prototype = Object.create(l.prototype)
          WriteStream.prototype.open = WriteStream$open
        }
        Object.defineProperty(e, 'ReadStream', {
          get: function () {
            return ReadStream
          },
          set: function (e) {
            ReadStream = e
          },
          enumerable: true,
          configurable: true,
        })
        Object.defineProperty(e, 'WriteStream', {
          get: function () {
            return WriteStream
          },
          set: function (e) {
            WriteStream = e
          },
          enumerable: true,
          configurable: true,
        })
        var u = ReadStream
        Object.defineProperty(e, 'FileReadStream', {
          get: function () {
            return u
          },
          set: function (e) {
            u = e
          },
          enumerable: true,
          configurable: true,
        })
        var d = WriteStream
        Object.defineProperty(e, 'FileWriteStream', {
          get: function () {
            return d
          },
          set: function (e) {
            d = e
          },
          enumerable: true,
          configurable: true,
        })
        function ReadStream(e, t) {
          if (this instanceof ReadStream) return f.apply(this, arguments), this
          else
            return ReadStream.apply(
              Object.create(ReadStream.prototype),
              arguments
            )
        }
        function ReadStream$open() {
          var e = this
          open(e.path, e.flags, e.mode, function (t, i) {
            if (t) {
              if (e.autoClose) e.destroy()
              e.emit('error', t)
            } else {
              e.fd = i
              e.emit('open', i)
              e.read()
            }
          })
        }
        function WriteStream(e, t) {
          if (this instanceof WriteStream) return l.apply(this, arguments), this
          else
            return WriteStream.apply(
              Object.create(WriteStream.prototype),
              arguments
            )
        }
        function WriteStream$open() {
          var e = this
          open(e.path, e.flags, e.mode, function (t, i) {
            if (t) {
              e.destroy()
              e.emit('error', t)
            } else {
              e.fd = i
              e.emit('open', i)
            }
          })
        }
        function createReadStream(t, i) {
          return new e.ReadStream(t, i)
        }
        function createWriteStream(t, i) {
          return new e.WriteStream(t, i)
        }
        var p = e.open
        e.open = open
        function open(e, t, i, s) {
          if (typeof i === 'function') (s = i), (i = null)
          return go$open(e, t, i, s)
          function go$open(e, t, i, s, r) {
            return p(e, t, i, function (n, c) {
              if (n && (n.code === 'EMFILE' || n.code === 'ENFILE'))
                enqueue([go$open, [e, t, i, s], n, r || Date.now(), Date.now()])
              else {
                if (typeof s === 'function') s.apply(this, arguments)
              }
            })
          }
        }
        return e
      }
      function enqueue(e) {
        f('ENQUEUE', e[0].name, e[1])
        s[o].push(e)
        retry()
      }
      var u
      function resetQueue() {
        var e = Date.now()
        for (var t = 0; t < s[o].length; ++t) {
          if (s[o][t].length > 2) {
            s[o][t][3] = e
            s[o][t][4] = e
          }
        }
        retry()
      }
      function retry() {
        clearTimeout(u)
        u = undefined
        if (s[o].length === 0) return
        var e = s[o].shift()
        var t = e[0]
        var i = e[1]
        var r = e[2]
        var n = e[3]
        var c = e[4]
        if (n === undefined) {
          f('RETRY', t.name, i)
          t.apply(null, i)
        } else if (Date.now() - n >= 6e4) {
          f('TIMEOUT', t.name, i)
          var a = i.pop()
          if (typeof a === 'function') a.call(null, r)
        } else {
          var h = Date.now() - c
          var l = Math.max(c - n, 1)
          var d = Math.min(l * 1.2, 100)
          if (h >= d) {
            f('RETRY', t.name, i)
            t.apply(null, i.concat([n]))
          } else {
            s[o].push(e)
          }
        }
        if (u === undefined) {
          u = setTimeout(retry, 0)
        }
      }
    },
    78: (e, t, i) => {
      var s = i(781).Stream
      e.exports = legacy
      function legacy(e) {
        return { ReadStream: ReadStream, WriteStream: WriteStream }
        function ReadStream(t, i) {
          if (!(this instanceof ReadStream)) return new ReadStream(t, i)
          s.call(this)
          var r = this
          this.path = t
          this.fd = null
          this.readable = true
          this.paused = false
          this.flags = 'r'
          this.mode = 438
          this.bufferSize = 64 * 1024
          i = i || {}
          var n = Object.keys(i)
          for (var c = 0, a = n.length; c < a; c++) {
            var o = n[c]
            this[o] = i[o]
          }
          if (this.encoding) this.setEncoding(this.encoding)
          if (this.start !== undefined) {
            if ('number' !== typeof this.start) {
              throw TypeError('start must be a Number')
            }
            if (this.end === undefined) {
              this.end = Infinity
            } else if ('number' !== typeof this.end) {
              throw TypeError('end must be a Number')
            }
            if (this.start > this.end) {
              throw new Error('start must be <= end')
            }
            this.pos = this.start
          }
          if (this.fd !== null) {
            process.nextTick(function () {
              r._read()
            })
            return
          }
          e.open(this.path, this.flags, this.mode, function (e, t) {
            if (e) {
              r.emit('error', e)
              r.readable = false
              return
            }
            r.fd = t
            r.emit('open', t)
            r._read()
          })
        }
        function WriteStream(t, i) {
          if (!(this instanceof WriteStream)) return new WriteStream(t, i)
          s.call(this)
          this.path = t
          this.fd = null
          this.writable = true
          this.flags = 'w'
          this.encoding = 'binary'
          this.mode = 438
          this.bytesWritten = 0
          i = i || {}
          var r = Object.keys(i)
          for (var n = 0, c = r.length; n < c; n++) {
            var a = r[n]
            this[a] = i[a]
          }
          if (this.start !== undefined) {
            if ('number' !== typeof this.start) {
              throw TypeError('start must be a Number')
            }
            if (this.start < 0) {
              throw new Error('start must be >= zero')
            }
            this.pos = this.start
          }
          this.busy = false
          this._queue = []
          if (this.fd === null) {
            this._open = e.open
            this._queue.push([
              this._open,
              this.path,
              this.flags,
              this.mode,
              undefined,
            ])
            this.flush()
          }
        }
      }
    },
    986: (e, t, i) => {
      var s = i(57)
      var r = process.cwd
      var n = null
      var c = process.env.GRACEFUL_FS_PLATFORM || process.platform
      process.cwd = function () {
        if (!n) n = r.call(process)
        return n
      }
      try {
        process.cwd()
      } catch (e) {}
      if (typeof process.chdir === 'function') {
        var a = process.chdir
        process.chdir = function (e) {
          n = null
          a.call(process, e)
        }
        if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, a)
      }
      e.exports = patch
      function patch(e) {
        if (
          s.hasOwnProperty('O_SYMLINK') &&
          process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)
        ) {
          patchLchmod(e)
        }
        if (!e.lutimes) {
          patchLutimes(e)
        }
        e.chown = chownFix(e.chown)
        e.fchown = chownFix(e.fchown)
        e.lchown = chownFix(e.lchown)
        e.chmod = chmodFix(e.chmod)
        e.fchmod = chmodFix(e.fchmod)
        e.lchmod = chmodFix(e.lchmod)
        e.chownSync = chownFixSync(e.chownSync)
        e.fchownSync = chownFixSync(e.fchownSync)
        e.lchownSync = chownFixSync(e.lchownSync)
        e.chmodSync = chmodFixSync(e.chmodSync)
        e.fchmodSync = chmodFixSync(e.fchmodSync)
        e.lchmodSync = chmodFixSync(e.lchmodSync)
        e.stat = statFix(e.stat)
        e.fstat = statFix(e.fstat)
        e.lstat = statFix(e.lstat)
        e.statSync = statFixSync(e.statSync)
        e.fstatSync = statFixSync(e.fstatSync)
        e.lstatSync = statFixSync(e.lstatSync)
        if (e.chmod && !e.lchmod) {
          e.lchmod = function (e, t, i) {
            if (i) process.nextTick(i)
          }
          e.lchmodSync = function () {}
        }
        if (e.chown && !e.lchown) {
          e.lchown = function (e, t, i, s) {
            if (s) process.nextTick(s)
          }
          e.lchownSync = function () {}
        }
        if (c === 'win32') {
          e.rename =
            typeof e.rename !== 'function'
              ? e.rename
              : (function (t) {
                  function rename(i, s, r) {
                    var n = Date.now()
                    var c = 0
                    t(i, s, function CB(a) {
                      if (
                        a &&
                        (a.code === 'EACCES' || a.code === 'EPERM') &&
                        Date.now() - n < 6e4
                      ) {
                        setTimeout(function () {
                          e.stat(s, function (e, n) {
                            if (e && e.code === 'ENOENT') t(i, s, CB)
                            else r(a)
                          })
                        }, c)
                        if (c < 100) c += 10
                        return
                      }
                      if (r) r(a)
                    })
                  }
                  if (Object.setPrototypeOf) Object.setPrototypeOf(rename, t)
                  return rename
                })(e.rename)
        }
        e.read =
          typeof e.read !== 'function'
            ? e.read
            : (function (t) {
                function read(i, s, r, n, c, a) {
                  var o
                  if (a && typeof a === 'function') {
                    var h = 0
                    o = function (f, l, u) {
                      if (f && f.code === 'EAGAIN' && h < 10) {
                        h++
                        return t.call(e, i, s, r, n, c, o)
                      }
                      a.apply(this, arguments)
                    }
                  }
                  return t.call(e, i, s, r, n, c, o)
                }
                if (Object.setPrototypeOf) Object.setPrototypeOf(read, t)
                return read
              })(e.read)
        e.readSync =
          typeof e.readSync !== 'function'
            ? e.readSync
            : (function (t) {
                return function (i, s, r, n, c) {
                  var a = 0
                  while (true) {
                    try {
                      return t.call(e, i, s, r, n, c)
                    } catch (e) {
                      if (e.code === 'EAGAIN' && a < 10) {
                        a++
                        continue
                      }
                      throw e
                    }
                  }
                }
              })(e.readSync)
        function patchLchmod(e) {
          e.lchmod = function (t, i, r) {
            e.open(t, s.O_WRONLY | s.O_SYMLINK, i, function (t, s) {
              if (t) {
                if (r) r(t)
                return
              }
              e.fchmod(s, i, function (t) {
                e.close(s, function (e) {
                  if (r) r(t || e)
                })
              })
            })
          }
          e.lchmodSync = function (t, i) {
            var r = e.openSync(t, s.O_WRONLY | s.O_SYMLINK, i)
            var n = true
            var c
            try {
              c = e.fchmodSync(r, i)
              n = false
            } finally {
              if (n) {
                try {
                  e.closeSync(r)
                } catch (e) {}
              } else {
                e.closeSync(r)
              }
            }
            return c
          }
        }
        function patchLutimes(e) {
          if (s.hasOwnProperty('O_SYMLINK') && e.futimes) {
            e.lutimes = function (t, i, r, n) {
              e.open(t, s.O_SYMLINK, function (t, s) {
                if (t) {
                  if (n) n(t)
                  return
                }
                e.futimes(s, i, r, function (t) {
                  e.close(s, function (e) {
                    if (n) n(t || e)
                  })
                })
              })
            }
            e.lutimesSync = function (t, i, r) {
              var n = e.openSync(t, s.O_SYMLINK)
              var c
              var a = true
              try {
                c = e.futimesSync(n, i, r)
                a = false
              } finally {
                if (a) {
                  try {
                    e.closeSync(n)
                  } catch (e) {}
                } else {
                  e.closeSync(n)
                }
              }
              return c
            }
          } else if (e.futimes) {
            e.lutimes = function (e, t, i, s) {
              if (s) process.nextTick(s)
            }
            e.lutimesSync = function () {}
          }
        }
        function chmodFix(t) {
          if (!t) return t
          return function (i, s, r) {
            return t.call(e, i, s, function (e) {
              if (chownErOk(e)) e = null
              if (r) r.apply(this, arguments)
            })
          }
        }
        function chmodFixSync(t) {
          if (!t) return t
          return function (i, s) {
            try {
              return t.call(e, i, s)
            } catch (e) {
              if (!chownErOk(e)) throw e
            }
          }
        }
        function chownFix(t) {
          if (!t) return t
          return function (i, s, r, n) {
            return t.call(e, i, s, r, function (e) {
              if (chownErOk(e)) e = null
              if (n) n.apply(this, arguments)
            })
          }
        }
        function chownFixSync(t) {
          if (!t) return t
          return function (i, s, r) {
            try {
              return t.call(e, i, s, r)
            } catch (e) {
              if (!chownErOk(e)) throw e
            }
          }
        }
        function statFix(t) {
          if (!t) return t
          return function (i, s, r) {
            if (typeof s === 'function') {
              r = s
              s = null
            }
            function callback(e, t) {
              if (t) {
                if (t.uid < 0) t.uid += 4294967296
                if (t.gid < 0) t.gid += 4294967296
              }
              if (r) r.apply(this, arguments)
            }
            return s ? t.call(e, i, s, callback) : t.call(e, i, callback)
          }
        }
        function statFixSync(t) {
          if (!t) return t
          return function (i, s) {
            var r = s ? t.call(e, i, s) : t.call(e, i)
            if (r) {
              if (r.uid < 0) r.uid += 4294967296
              if (r.gid < 0) r.gid += 4294967296
            }
            return r
          }
        }
        function chownErOk(e) {
          if (!e) return true
          if (e.code === 'ENOSYS') return true
          var t = !process.getuid || process.getuid() !== 0
          if (t) {
            if (e.code === 'EINVAL' || e.code === 'EPERM') return true
          }
          return false
        }
      }
    },
    377: (e, t, i) => {
      'use strict'
      const s = i(361).EventEmitter
      const r = i(165)
      const n = i(17)
      const c = i(384)
      const a = Object.freeze({})
      let o = 2e3
      const h = i(37).platform() === 'darwin'
      const f = process.env.WATCHPACK_POLLING
      const l = `${+f}` === f ? +f : !!f && f !== 'false'
      function withoutCase(e) {
        return e.toLowerCase()
      }
      function needCalls(e, t) {
        return function () {
          if (--e === 0) {
            return t()
          }
        }
      }
      class Watcher extends s {
        constructor(e, t, i) {
          super()
          this.directoryWatcher = e
          this.path = t
          this.startTime = i && +i
        }
        checkStartTime(e, t) {
          const i = this.startTime
          if (typeof i !== 'number') return !t
          return i <= e
        }
        close() {
          this.emit('closed')
        }
      }
      class DirectoryWatcher extends s {
        constructor(e, t, i) {
          super()
          if (l) {
            i.poll = l
          }
          this.watcherManager = e
          this.options = i
          this.path = t
          this.files = new Map()
          this.filesWithoutCase = new Map()
          this.directories = new Map()
          this.lastWatchEvent = 0
          this.initialScan = true
          this.ignored = i.ignored || (() => false)
          this.nestedWatching = false
          this.polledWatching =
            typeof i.poll === 'number' ? i.poll : i.poll ? 5007 : false
          this.timeout = undefined
          this.initialScanRemoved = new Set()
          this.initialScanFinished = undefined
          this.watchers = new Map()
          this.parentWatcher = null
          this.refs = 0
          this._activeEvents = new Map()
          this.closed = false
          this.scanning = false
          this.scanAgain = false
          this.scanAgainInitial = false
          this.createWatcher()
          this.doScan(true)
        }
        createWatcher() {
          try {
            if (this.polledWatching) {
              this.watcher = {
                close: () => {
                  if (this.timeout) {
                    clearTimeout(this.timeout)
                    this.timeout = undefined
                  }
                },
              }
            } else {
              if (h) {
                this.watchInParentDirectory()
              }
              this.watcher = c.watch(this.path)
              this.watcher.on('change', this.onWatchEvent.bind(this))
              this.watcher.on('error', this.onWatcherError.bind(this))
            }
          } catch (e) {
            this.onWatcherError(e)
          }
        }
        forEachWatcher(e, t) {
          const i = this.watchers.get(withoutCase(e))
          if (i !== undefined) {
            for (const e of i) {
              t(e)
            }
          }
        }
        setMissing(e, t, i) {
          if (this.initialScan) {
            this.initialScanRemoved.add(e)
          }
          const s = this.directories.get(e)
          if (s) {
            if (this.nestedWatching) s.close()
            this.directories.delete(e)
            this.forEachWatcher(e, (e) => e.emit('remove', i))
            if (!t) {
              this.forEachWatcher(this.path, (s) =>
                s.emit('change', e, null, i, t)
              )
            }
          }
          const r = this.files.get(e)
          if (r) {
            this.files.delete(e)
            const s = withoutCase(e)
            const r = this.filesWithoutCase.get(s) - 1
            if (r <= 0) {
              this.filesWithoutCase.delete(s)
              this.forEachWatcher(e, (e) => e.emit('remove', i))
            } else {
              this.filesWithoutCase.set(s, r)
            }
            if (!t) {
              this.forEachWatcher(this.path, (s) =>
                s.emit('change', e, null, i, t)
              )
            }
          }
        }
        setFileTime(e, t, i, s, r) {
          const n = Date.now()
          if (this.ignored(e)) return
          const c = this.files.get(e)
          let a, h
          if (i) {
            a = Math.min(n, t) + o
            h = o
          } else {
            a = n
            h = 0
            if (c && c.timestamp === t && t + o < n) {
              return
            }
          }
          if (s && c && c.timestamp === t) return
          this.files.set(e, { safeTime: a, accuracy: h, timestamp: t })
          if (!c) {
            const s = withoutCase(e)
            const n = this.filesWithoutCase.get(s)
            this.filesWithoutCase.set(s, (n || 0) + 1)
            if (n !== undefined) {
              this.doScan(false)
            }
            this.forEachWatcher(e, (e) => {
              if (!i || e.checkStartTime(a, i)) {
                e.emit('change', t, r)
              }
            })
          } else if (!i) {
            this.forEachWatcher(e, (e) => e.emit('change', t, r))
          }
          this.forEachWatcher(this.path, (t) => {
            if (!i || t.checkStartTime(a, i)) {
              t.emit('change', e, a, r, i)
            }
          })
        }
        setDirectory(e, t, i, s) {
          if (this.ignored(e)) return
          if (e === this.path) {
            if (!i) {
              this.forEachWatcher(this.path, (r) =>
                r.emit('change', e, t, s, i)
              )
            }
          } else {
            const r = this.directories.get(e)
            if (!r) {
              const r = Date.now()
              if (this.nestedWatching) {
                this.createNestedWatcher(e)
              } else {
                this.directories.set(e, true)
              }
              let n
              if (i) {
                n = Math.min(r, t) + o
              } else {
                n = r
              }
              this.forEachWatcher(e, (e) => {
                if (!i || e.checkStartTime(n, false)) {
                  e.emit('change', t, s)
                }
              })
              this.forEachWatcher(this.path, (t) => {
                if (!i || t.checkStartTime(n, i)) {
                  t.emit('change', e, n, s, i)
                }
              })
            }
          }
        }
        createNestedWatcher(e) {
          const t = this.watcherManager.watchDirectory(e, 1)
          t.on('change', (e, t, i, s) => {
            this.forEachWatcher(this.path, (r) => {
              if (!s || r.checkStartTime(t, s)) {
                r.emit('change', e, t, i, s)
              }
            })
          })
          this.directories.set(e, t)
        }
        setNestedWatching(e) {
          if (this.nestedWatching !== !!e) {
            this.nestedWatching = !!e
            if (this.nestedWatching) {
              for (const e of this.directories.keys()) {
                this.createNestedWatcher(e)
              }
            } else {
              for (const [e, t] of this.directories) {
                t.close()
                this.directories.set(e, true)
              }
            }
          }
        }
        watch(e, t) {
          const i = withoutCase(e)
          let s = this.watchers.get(i)
          if (s === undefined) {
            s = new Set()
            this.watchers.set(i, s)
          }
          this.refs++
          const r = new Watcher(this, e, t)
          r.on('closed', () => {
            if (--this.refs <= 0) {
              this.close()
              return
            }
            s.delete(r)
            if (s.size === 0) {
              this.watchers.delete(i)
              if (this.path === e) this.setNestedWatching(false)
            }
          })
          s.add(r)
          let n
          if (e === this.path) {
            this.setNestedWatching(true)
            n = this.lastWatchEvent
            for (const e of this.files.values()) {
              fixupEntryAccuracy(e)
              n = Math.max(n, e.safeTime)
            }
          } else {
            const t = this.files.get(e)
            if (t) {
              fixupEntryAccuracy(t)
              n = t.safeTime
            } else {
              n = 0
            }
          }
          if (n) {
            if (n >= t) {
              process.nextTick(() => {
                if (this.closed) return
                if (e === this.path) {
                  r.emit('change', e, n, 'watch (outdated on attach)', true)
                } else {
                  r.emit('change', n, 'watch (outdated on attach)', true)
                }
              })
            }
          } else if (this.initialScan) {
            if (this.initialScanRemoved.has(e)) {
              process.nextTick(() => {
                if (this.closed) return
                r.emit('remove')
              })
            }
          } else if (
            !this.directories.has(e) &&
            r.checkStartTime(this.initialScanFinished, false)
          ) {
            process.nextTick(() => {
              if (this.closed) return
              r.emit('initial-missing', 'watch (missing on attach)')
            })
          }
          return r
        }
        onWatchEvent(e, t) {
          if (this.closed) return
          if (!t) {
            this.doScan(false)
            return
          }
          const i = n.join(this.path, t)
          if (this.ignored(i)) return
          if (this._activeEvents.get(t) === undefined) {
            this._activeEvents.set(t, false)
            const checkStats = () => {
              if (this.closed) return
              this._activeEvents.set(t, false)
              r.lstat(i, (s, c) => {
                if (this.closed) return
                if (this._activeEvents.get(t) === true) {
                  process.nextTick(checkStats)
                  return
                }
                this._activeEvents.delete(t)
                if (s) {
                  if (
                    s.code !== 'ENOENT' &&
                    s.code !== 'EPERM' &&
                    s.code !== 'EBUSY'
                  ) {
                    this.onStatsError(s)
                  } else {
                    if (t === n.basename(this.path)) {
                      if (!r.existsSync(this.path)) {
                        this.onDirectoryRemoved('stat failed')
                      }
                    }
                  }
                }
                this.lastWatchEvent = Date.now()
                if (!c) {
                  this.setMissing(i, false, e)
                } else if (c.isDirectory()) {
                  this.setDirectory(i, +c.birthtime || 1, false, e)
                } else if (c.isFile() || c.isSymbolicLink()) {
                  if (c.mtime) {
                    ensureFsAccuracy(c.mtime)
                  }
                  this.setFileTime(
                    i,
                    +c.mtime || +c.ctime || 1,
                    false,
                    false,
                    e
                  )
                }
              })
            }
            process.nextTick(checkStats)
          } else {
            this._activeEvents.set(t, true)
          }
        }
        onWatcherError(e) {
          if (this.closed) return
          if (e) {
            if (e.code !== 'EPERM' && e.code !== 'ENOENT') {
              console.error('Watchpack Error (watcher): ' + e)
            }
            this.onDirectoryRemoved('watch error')
          }
        }
        onStatsError(e) {
          if (e) {
            console.error('Watchpack Error (stats): ' + e)
          }
        }
        onScanError(e) {
          if (e) {
            console.error('Watchpack Error (initial scan): ' + e)
          }
          this.onScanFinished()
        }
        onScanFinished() {
          if (this.polledWatching) {
            this.timeout = setTimeout(() => {
              if (this.closed) return
              this.doScan(false)
            }, this.polledWatching)
          }
        }
        onDirectoryRemoved(e) {
          if (this.watcher) {
            this.watcher.close()
            this.watcher = null
          }
          this.watchInParentDirectory()
          const t = `directory-removed (${e})`
          for (const e of this.directories.keys()) {
            this.setMissing(e, null, t)
          }
          for (const e of this.files.keys()) {
            this.setMissing(e, null, t)
          }
        }
        watchInParentDirectory() {
          if (!this.parentWatcher) {
            const e = n.dirname(this.path)
            if (n.dirname(e) === e) return
            this.parentWatcher = this.watcherManager.watchFile(this.path, 1)
            this.parentWatcher.on('change', (e, t) => {
              if (this.closed) return
              if ((!h || this.polledWatching) && this.parentWatcher) {
                this.parentWatcher.close()
                this.parentWatcher = null
              }
              if (!this.watcher) {
                this.createWatcher()
                this.doScan(false)
                this.forEachWatcher(this.path, (i) =>
                  i.emit('change', this.path, e, t, false)
                )
              }
            })
            this.parentWatcher.on('remove', () => {
              this.onDirectoryRemoved('parent directory removed')
            })
          }
        }
        doScan(e) {
          if (this.scanning) {
            if (this.scanAgain) {
              if (!e) this.scanAgainInitial = false
            } else {
              this.scanAgain = true
              this.scanAgainInitial = e
            }
            return
          }
          this.scanning = true
          if (this.timeout) {
            clearTimeout(this.timeout)
            this.timeout = undefined
          }
          process.nextTick(() => {
            if (this.closed) return
            r.readdir(this.path, (t, i) => {
              if (this.closed) return
              if (t) {
                if (t.code === 'ENOENT' || t.code === 'EPERM') {
                  this.onDirectoryRemoved('scan readdir failed')
                } else {
                  this.onScanError(t)
                }
                this.initialScan = false
                this.initialScanFinished = Date.now()
                if (e) {
                  for (const e of this.watchers.values()) {
                    for (const t of e) {
                      if (t.checkStartTime(this.initialScanFinished, false)) {
                        t.emit(
                          'initial-missing',
                          'scan (parent directory missing in initial scan)'
                        )
                      }
                    }
                  }
                }
                if (this.scanAgain) {
                  this.scanAgain = false
                  this.doScan(this.scanAgainInitial)
                } else {
                  this.scanning = false
                }
                return
              }
              const s = new Set(
                i.map((e) => n.join(this.path, e.normalize('NFC')))
              )
              for (const t of this.files.keys()) {
                if (!s.has(t)) {
                  this.setMissing(t, e, 'scan (missing)')
                }
              }
              for (const t of this.directories.keys()) {
                if (!s.has(t)) {
                  this.setMissing(t, e, 'scan (missing)')
                }
              }
              if (this.scanAgain) {
                this.scanAgain = false
                this.doScan(e)
                return
              }
              const c = needCalls(s.size + 1, () => {
                if (this.closed) return
                this.initialScan = false
                this.initialScanRemoved = null
                this.initialScanFinished = Date.now()
                if (e) {
                  const e = new Map(this.watchers)
                  e.delete(withoutCase(this.path))
                  for (const t of s) {
                    e.delete(withoutCase(t))
                  }
                  for (const t of e.values()) {
                    for (const e of t) {
                      if (e.checkStartTime(this.initialScanFinished, false)) {
                        e.emit(
                          'initial-missing',
                          'scan (missing in initial scan)'
                        )
                      }
                    }
                  }
                }
                if (this.scanAgain) {
                  this.scanAgain = false
                  this.doScan(this.scanAgainInitial)
                } else {
                  this.scanning = false
                  this.onScanFinished()
                }
              })
              for (const t of s) {
                r.lstat(t, (i, s) => {
                  if (this.closed) return
                  if (i) {
                    if (
                      i.code === 'ENOENT' ||
                      i.code === 'EPERM' ||
                      i.code === 'EACCES' ||
                      i.code === 'EBUSY'
                    ) {
                      this.setMissing(t, e, 'scan (' + i.code + ')')
                    } else {
                      this.onScanError(i)
                    }
                    c()
                    return
                  }
                  if (s.isFile() || s.isSymbolicLink()) {
                    if (s.mtime) {
                      ensureFsAccuracy(s.mtime)
                    }
                    this.setFileTime(
                      t,
                      +s.mtime || +s.ctime || 1,
                      e,
                      true,
                      'scan (file)'
                    )
                  } else if (s.isDirectory()) {
                    if (!e || !this.directories.has(t))
                      this.setDirectory(t, +s.birthtime || 1, e, 'scan (dir)')
                  }
                  c()
                })
              }
              c()
            })
          })
        }
        getTimes() {
          const e = Object.create(null)
          let t = this.lastWatchEvent
          for (const [i, s] of this.files) {
            fixupEntryAccuracy(s)
            t = Math.max(t, s.safeTime)
            e[i] = Math.max(s.safeTime, s.timestamp)
          }
          if (this.nestedWatching) {
            for (const i of this.directories.values()) {
              const s = i.directoryWatcher.getTimes()
              for (const i of Object.keys(s)) {
                const r = s[i]
                t = Math.max(t, r)
                e[i] = r
              }
            }
            e[this.path] = t
          }
          if (!this.initialScan) {
            for (const t of this.watchers.values()) {
              for (const i of t) {
                const t = i.path
                if (!Object.prototype.hasOwnProperty.call(e, t)) {
                  e[t] = null
                }
              }
            }
          }
          return e
        }
        collectTimeInfoEntries(e, t) {
          let i = this.lastWatchEvent
          for (const [t, s] of this.files) {
            fixupEntryAccuracy(s)
            i = Math.max(i, s.safeTime)
            e.set(t, s)
          }
          if (this.nestedWatching) {
            for (const s of this.directories.values()) {
              i = Math.max(i, s.directoryWatcher.collectTimeInfoEntries(e, t))
            }
            e.set(this.path, a)
            t.set(this.path, { safeTime: i })
          } else {
            for (const i of this.directories.keys()) {
              e.set(i, a)
              if (!t.has(i)) t.set(i, a)
            }
            e.set(this.path, a)
            t.set(this.path, a)
          }
          if (!this.initialScan) {
            for (const t of this.watchers.values()) {
              for (const i of t) {
                const t = i.path
                if (!e.has(t)) {
                  e.set(t, null)
                }
              }
            }
          }
          return i
        }
        close() {
          this.closed = true
          this.initialScan = false
          if (this.watcher) {
            this.watcher.close()
            this.watcher = null
          }
          if (this.nestedWatching) {
            for (const e of this.directories.values()) {
              e.close()
            }
            this.directories.clear()
          }
          if (this.parentWatcher) {
            this.parentWatcher.close()
            this.parentWatcher = null
          }
          this.emit('closed')
        }
      }
      e.exports = DirectoryWatcher
      e.exports.EXISTANCE_ONLY_TIME_ENTRY = a
      function fixupEntryAccuracy(e) {
        if (e.accuracy > o) {
          e.safeTime = e.safeTime - e.accuracy + o
          e.accuracy = o
        }
      }
      function ensureFsAccuracy(e) {
        if (!e) return
        if (o > 1 && e % 1 !== 0) o = 1
        else if (o > 10 && e % 10 !== 0) o = 10
        else if (o > 100 && e % 100 !== 0) o = 100
        else if (o > 1e3 && e % 1e3 !== 0) o = 1e3
      }
    },
    73: (e, t, i) => {
      'use strict'
      const s = i(147)
      const r = i(17)
      const n = new Set(['EINVAL', 'ENOENT'])
      if (process.platform === 'win32') n.add('UNKNOWN')
      class LinkResolver {
        constructor() {
          this.cache = new Map()
        }
        resolve(e) {
          const t = this.cache.get(e)
          if (t !== undefined) {
            return t
          }
          const i = r.dirname(e)
          if (i === e) {
            const t = Object.freeze([e])
            this.cache.set(e, t)
            return t
          }
          const c = this.resolve(i)
          let a = e
          if (c[0] !== i) {
            const t = r.basename(e)
            a = r.resolve(c[0], t)
          }
          try {
            const t = s.readlinkSync(a)
            const i = r.resolve(c[0], t)
            const n = this.resolve(i)
            let o
            if (n.length > 1 && c.length > 1) {
              const e = new Set(n)
              e.add(a)
              for (let t = 1; t < c.length; t++) {
                e.add(c[t])
              }
              o = Object.freeze(Array.from(e))
            } else if (c.length > 1) {
              o = c.slice()
              o[0] = n[0]
              o.push(a)
              Object.freeze(o)
            } else if (n.length > 1) {
              o = n.slice()
              o.push(a)
              Object.freeze(o)
            } else {
              o = Object.freeze([n[0], a])
            }
            this.cache.set(e, o)
            return o
          } catch (t) {
            if (!n.has(t.code)) {
              throw t
            }
            const i = c.slice()
            i[0] = a
            Object.freeze(i)
            this.cache.set(e, i)
            return i
          }
        }
      }
      e.exports = LinkResolver
    },
    653: (e, t, i) => {
      'use strict'
      const s = i(17)
      const r = i(377)
      class WatcherManager {
        constructor(e) {
          this.options = e
          this.directoryWatchers = new Map()
        }
        getDirectoryWatcher(e) {
          const t = this.directoryWatchers.get(e)
          if (t === undefined) {
            const t = new r(this, e, this.options)
            this.directoryWatchers.set(e, t)
            t.on('closed', () => {
              this.directoryWatchers.delete(e)
            })
            return t
          }
          return t
        }
        watchFile(e, t) {
          const i = s.dirname(e)
          if (i === e) return null
          return this.getDirectoryWatcher(i).watch(e, t)
        }
        watchDirectory(e, t) {
          return this.getDirectoryWatcher(e).watch(e, t)
        }
      }
      const n = new WeakMap()
      e.exports = (e) => {
        const t = n.get(e)
        if (t !== undefined) return t
        const i = new WatcherManager(e)
        n.set(e, i)
        return i
      }
      e.exports.WatcherManager = WatcherManager
    },
    535: (e, t, i) => {
      'use strict'
      const s = i(17)
      e.exports = (e, t) => {
        const i = new Map()
        for (const [t, s] of e) {
          i.set(t, {
            filePath: t,
            parent: undefined,
            children: undefined,
            entries: 1,
            active: true,
            value: s,
          })
        }
        let r = i.size
        for (const e of i.values()) {
          const t = s.dirname(e.filePath)
          if (t !== e.filePath) {
            let s = i.get(t)
            if (s === undefined) {
              s = {
                filePath: t,
                parent: undefined,
                children: [e],
                entries: e.entries,
                active: false,
                value: undefined,
              }
              i.set(t, s)
              e.parent = s
            } else {
              e.parent = s
              if (s.children === undefined) {
                s.children = [e]
              } else {
                s.children.push(e)
              }
              do {
                s.entries += e.entries
                s = s.parent
              } while (s)
            }
          }
        }
        while (r > t) {
          const e = r - t
          let s = undefined
          let n = Infinity
          for (const r of i.values()) {
            if (r.entries <= 1 || !r.children || !r.parent) continue
            if (r.children.length === 0) continue
            if (r.children.length === 1 && !r.value) continue
            const i =
              r.entries - 1 >= e
                ? r.entries - 1 - e
                : e - r.entries + 1 + t * 0.3
            if (i < n) {
              s = r
              n = i
            }
          }
          if (!s) break
          const c = s.entries - 1
          s.active = true
          s.entries = 1
          r -= c
          let a = s.parent
          while (a) {
            a.entries -= c
            a = a.parent
          }
          const o = new Set(s.children)
          for (const e of o) {
            e.active = false
            e.entries = 0
            if (e.children) {
              for (const t of e.children) o.add(t)
            }
          }
        }
        const n = new Map()
        for (const e of i.values()) {
          if (!e.active) continue
          const t = new Map()
          const i = new Set([e])
          for (const s of i) {
            if (s.active && s !== e) continue
            if (s.value) {
              if (Array.isArray(s.value)) {
                for (const e of s.value) {
                  t.set(e, s.filePath)
                }
              } else {
                t.set(s.value, s.filePath)
              }
            }
            if (s.children) {
              for (const e of s.children) {
                i.add(e)
              }
            }
          }
          n.set(e.filePath, t)
        }
        return n
      }
    },
    384: (e, t, i) => {
      'use strict'
      const s = i(147)
      const r = i(17)
      const { EventEmitter: n } = i(361)
      const c = i(535)
      const a = i(37).platform() === 'darwin'
      const o = i(37).platform() === 'win32'
      const h = a || o
      const f = +process.env.WATCHPACK_WATCHER_LIMIT || (a ? 2e3 : 1e4)
      const l = !!process.env.WATCHPACK_RECURSIVE_WATCHER_LOGGING
      let u = false
      let d = 0
      const p = new Map()
      const m = new Map()
      const g = new Map()
      const y = new Map()
      class DirectWatcher {
        constructor(e) {
          this.filePath = e
          this.watchers = new Set()
          this.watcher = undefined
          try {
            const t = s.watch(e)
            this.watcher = t
            t.on('change', (e, t) => {
              for (const i of this.watchers) {
                i.emit('change', e, t)
              }
            })
            t.on('error', (e) => {
              for (const t of this.watchers) {
                t.emit('error', e)
              }
            })
          } catch (e) {
            process.nextTick(() => {
              for (const t of this.watchers) {
                t.emit('error', e)
              }
            })
          }
          d++
        }
        add(e) {
          y.set(e, this)
          this.watchers.add(e)
        }
        remove(e) {
          this.watchers.delete(e)
          if (this.watchers.size === 0) {
            g.delete(this.filePath)
            d--
            if (this.watcher) this.watcher.close()
          }
        }
        getWatchers() {
          return this.watchers
        }
      }
      class RecursiveWatcher {
        constructor(e) {
          this.rootPath = e
          this.mapWatcherToPath = new Map()
          this.mapPathToWatchers = new Map()
          this.watcher = undefined
          try {
            const t = s.watch(e, { recursive: true })
            this.watcher = t
            t.on('change', (e, t) => {
              if (!t) {
                if (l) {
                  process.stderr.write(
                    `[watchpack] dispatch ${e} event in recursive watcher (${this.rootPath}) to all watchers\n`
                  )
                }
                for (const t of this.mapWatcherToPath.keys()) {
                  t.emit('change', e)
                }
              } else {
                const i = r.dirname(t)
                const s = this.mapPathToWatchers.get(i)
                if (l) {
                  process.stderr.write(
                    `[watchpack] dispatch ${e} event in recursive watcher (${
                      this.rootPath
                    }) for '${t}' to ${s ? s.size : 0} watchers\n`
                  )
                }
                if (s === undefined) return
                for (const i of s) {
                  i.emit('change', e, r.basename(t))
                }
              }
            })
            t.on('error', (e) => {
              for (const t of this.mapWatcherToPath.keys()) {
                t.emit('error', e)
              }
            })
          } catch (e) {
            process.nextTick(() => {
              for (const t of this.mapWatcherToPath.keys()) {
                t.emit('error', e)
              }
            })
          }
          d++
          if (l) {
            process.stderr.write(
              `[watchpack] created recursive watcher at ${e}\n`
            )
          }
        }
        add(e, t) {
          y.set(t, this)
          const i = e.slice(this.rootPath.length + 1) || '.'
          this.mapWatcherToPath.set(t, i)
          const s = this.mapPathToWatchers.get(i)
          if (s === undefined) {
            const e = new Set()
            e.add(t)
            this.mapPathToWatchers.set(i, e)
          } else {
            s.add(t)
          }
        }
        remove(e) {
          const t = this.mapWatcherToPath.get(e)
          if (!t) return
          this.mapWatcherToPath.delete(e)
          const i = this.mapPathToWatchers.get(t)
          i.delete(e)
          if (i.size === 0) {
            this.mapPathToWatchers.delete(t)
          }
          if (this.mapWatcherToPath.size === 0) {
            m.delete(this.rootPath)
            d--
            if (this.watcher) this.watcher.close()
            if (l) {
              process.stderr.write(
                `[watchpack] closed recursive watcher at ${this.rootPath}\n`
              )
            }
          }
        }
        getWatchers() {
          return this.mapWatcherToPath
        }
      }
      class Watcher extends n {
        close() {
          if (p.has(this)) {
            p.delete(this)
            return
          }
          const e = y.get(this)
          e.remove(this)
          y.delete(this)
        }
      }
      const createDirectWatcher = (e) => {
        const t = g.get(e)
        if (t !== undefined) return t
        const i = new DirectWatcher(e)
        g.set(e, i)
        return i
      }
      const createRecursiveWatcher = (e) => {
        const t = m.get(e)
        if (t !== undefined) return t
        const i = new RecursiveWatcher(e)
        m.set(e, i)
        return i
      }
      const execute = () => {
        const e = new Map()
        const addWatcher = (t, i) => {
          const s = e.get(i)
          if (s === undefined) {
            e.set(i, t)
          } else if (Array.isArray(s)) {
            s.push(t)
          } else {
            e.set(i, [s, t])
          }
        }
        for (const [e, t] of p) {
          addWatcher(e, t)
        }
        p.clear()
        if (!h || f - d >= e.size) {
          for (const [t, i] of e) {
            const e = createDirectWatcher(t)
            if (Array.isArray(i)) {
              for (const t of i) e.add(t)
            } else {
              e.add(i)
            }
          }
          return
        }
        for (const e of m.values()) {
          for (const [t, i] of e.getWatchers()) {
            addWatcher(t, r.join(e.rootPath, i))
          }
        }
        for (const e of g.values()) {
          for (const t of e.getWatchers()) {
            addWatcher(t, e.filePath)
          }
        }
        const t = c(e, f * 0.9)
        for (const [e, i] of t) {
          if (i.size === 1) {
            for (const [e, t] of i) {
              const i = createDirectWatcher(t)
              const s = y.get(e)
              if (s === i) continue
              i.add(e)
              if (s !== undefined) s.remove(e)
            }
          } else {
            const t = new Set(i.values())
            if (t.size > 1) {
              const t = createRecursiveWatcher(e)
              for (const [e, s] of i) {
                const i = y.get(e)
                if (i === t) continue
                t.add(s, e)
                if (i !== undefined) i.remove(e)
              }
            } else {
              for (const e of t) {
                const t = createDirectWatcher(e)
                for (const e of i.keys()) {
                  const i = y.get(e)
                  if (i === t) continue
                  t.add(e)
                  if (i !== undefined) i.remove(e)
                }
              }
            }
          }
        }
      }
      t.watch = (e) => {
        const t = new Watcher()
        const i = g.get(e)
        if (i !== undefined) {
          i.add(t)
          return t
        }
        let s = e
        for (;;) {
          const i = m.get(s)
          if (i !== undefined) {
            i.add(e, t)
            return t
          }
          const n = r.dirname(s)
          if (n === s) break
          s = n
        }
        p.set(t, e)
        if (!u) execute()
        return t
      }
      t.batch = (e) => {
        u = true
        try {
          e()
        } finally {
          u = false
          execute()
        }
      }
      t.getNumberOfWatchers = () => d
    },
    747: (e, t, i) => {
      'use strict'
      const s = i(653)
      const r = i(73)
      const n = i(361).EventEmitter
      const c = i(660)
      const a = i(384)
      const o = []
      const h = {}
      function addWatchersToSet(e, t) {
        for (const i of e) {
          const e = i.watcher
          if (!t.has(e.directoryWatcher)) {
            t.add(e.directoryWatcher)
          }
        }
      }
      const stringToRegexp = (e) => {
        const t = c(e, { globstar: true, extended: true }).source
        const i = t.slice(0, t.length - 1) + '(?:$|\\/)'
        return i
      }
      const ignoredToFunction = (e) => {
        if (Array.isArray(e)) {
          const t = new RegExp(e.map((e) => stringToRegexp(e)).join('|'))
          return (e) => t.test(e.replace(/\\/g, '/'))
        } else if (typeof e === 'string') {
          const t = new RegExp(stringToRegexp(e))
          return (e) => t.test(e.replace(/\\/g, '/'))
        } else if (e instanceof RegExp) {
          return (t) => e.test(t.replace(/\\/g, '/'))
        } else if (e instanceof Function) {
          return e
        } else if (e) {
          throw new Error(`Invalid option for 'ignored': ${e}`)
        } else {
          return () => false
        }
      }
      const normalizeOptions = (e) => ({
        followSymlinks: !!e.followSymlinks,
        ignored: ignoredToFunction(e.ignored),
        poll: e.poll,
      })
      const f = new WeakMap()
      const cachedNormalizeOptions = (e) => {
        const t = f.get(e)
        if (t !== undefined) return t
        const i = normalizeOptions(e)
        f.set(e, i)
        return i
      }
      class WatchpackFileWatcher {
        constructor(e, t, i) {
          this.files = Array.isArray(i) ? i : [i]
          this.watcher = t
          t.on('initial-missing', (t) => {
            for (const i of this.files) {
              if (!e._missing.has(i)) e._onRemove(i, i, t)
            }
          })
          t.on('change', (t, i) => {
            for (const s of this.files) {
              e._onChange(s, t, s, i)
            }
          })
          t.on('remove', (t) => {
            for (const i of this.files) {
              e._onRemove(i, i, t)
            }
          })
        }
        update(e) {
          if (!Array.isArray(e)) {
            if (this.files.length !== 1) {
              this.files = [e]
            } else if (this.files[0] !== e) {
              this.files[0] = e
            }
          } else {
            this.files = e
          }
        }
        close() {
          this.watcher.close()
        }
      }
      class WatchpackDirectoryWatcher {
        constructor(e, t, i) {
          this.directories = Array.isArray(i) ? i : [i]
          this.watcher = t
          t.on('initial-missing', (t) => {
            for (const i of this.directories) {
              e._onRemove(i, i, t)
            }
          })
          t.on('change', (t, i, s) => {
            for (const r of this.directories) {
              e._onChange(r, i, t, s)
            }
          })
          t.on('remove', (t) => {
            for (const i of this.directories) {
              e._onRemove(i, i, t)
            }
          })
        }
        update(e) {
          if (!Array.isArray(e)) {
            if (this.directories.length !== 1) {
              this.directories = [e]
            } else if (this.directories[0] !== e) {
              this.directories[0] = e
            }
          } else {
            this.directories = e
          }
        }
        close() {
          this.watcher.close()
        }
      }
      class Watchpack extends n {
        constructor(e) {
          super()
          if (!e) e = h
          this.options = e
          this.aggregateTimeout =
            typeof e.aggregateTimeout === 'number' ? e.aggregateTimeout : 200
          this.watcherOptions = cachedNormalizeOptions(e)
          this.watcherManager = s(this.watcherOptions)
          this.fileWatchers = new Map()
          this.directoryWatchers = new Map()
          this._missing = new Set()
          this.startTime = undefined
          this.paused = false
          this.aggregatedChanges = new Set()
          this.aggregatedRemovals = new Set()
          this.aggregateTimer = undefined
          this._onTimeout = this._onTimeout.bind(this)
        }
        watch(e, t, i) {
          let s, n, c, h
          if (!t) {
            ;({
              files: s = o,
              directories: n = o,
              missing: c = o,
              startTime: h,
            } = e)
          } else {
            s = e
            n = t
            c = o
            h = i
          }
          this.paused = false
          const f = this.fileWatchers
          const l = this.directoryWatchers
          const u = this.watcherOptions.ignored
          const filter = (e) => !u(e)
          const addToMap = (e, t, i) => {
            const s = e.get(t)
            if (s === undefined) {
              e.set(t, i)
            } else if (Array.isArray(s)) {
              s.push(i)
            } else {
              e.set(t, [s, i])
            }
          }
          const d = new Map()
          const p = new Map()
          const m = new Set()
          if (this.watcherOptions.followSymlinks) {
            const e = new r()
            for (const t of s) {
              if (filter(t)) {
                for (const i of e.resolve(t)) {
                  if (t === i || filter(i)) {
                    addToMap(d, i, t)
                  }
                }
              }
            }
            for (const t of c) {
              if (filter(t)) {
                for (const i of e.resolve(t)) {
                  if (t === i || filter(i)) {
                    m.add(t)
                    addToMap(d, i, t)
                  }
                }
              }
            }
            for (const t of n) {
              if (filter(t)) {
                let i = true
                for (const s of e.resolve(t)) {
                  if (filter(s)) {
                    addToMap(i ? p : d, s, t)
                  }
                  i = false
                }
              }
            }
          } else {
            for (const e of s) {
              if (filter(e)) {
                addToMap(d, e, e)
              }
            }
            for (const e of c) {
              if (filter(e)) {
                m.add(e)
                addToMap(d, e, e)
              }
            }
            for (const e of n) {
              if (filter(e)) {
                addToMap(p, e, e)
              }
            }
          }
          for (const [e, t] of f) {
            const i = d.get(e)
            if (i === undefined) {
              t.close()
              f.delete(e)
            } else {
              t.update(i)
              d.delete(e)
            }
          }
          for (const [e, t] of l) {
            const i = p.get(e)
            if (i === undefined) {
              t.close()
              l.delete(e)
            } else {
              t.update(i)
              p.delete(e)
            }
          }
          a.batch(() => {
            for (const [e, t] of d) {
              const i = this.watcherManager.watchFile(e, h)
              if (i) {
                f.set(e, new WatchpackFileWatcher(this, i, t))
              }
            }
            for (const [e, t] of p) {
              const i = this.watcherManager.watchDirectory(e, h)
              if (i) {
                l.set(e, new WatchpackDirectoryWatcher(this, i, t))
              }
            }
          })
          this._missing = m
          this.startTime = h
        }
        close() {
          this.paused = true
          if (this.aggregateTimer) clearTimeout(this.aggregateTimer)
          for (const e of this.fileWatchers.values()) e.close()
          for (const e of this.directoryWatchers.values()) e.close()
          this.fileWatchers.clear()
          this.directoryWatchers.clear()
        }
        pause() {
          this.paused = true
          if (this.aggregateTimer) clearTimeout(this.aggregateTimer)
        }
        getTimes() {
          const e = new Set()
          addWatchersToSet(this.fileWatchers.values(), e)
          addWatchersToSet(this.directoryWatchers.values(), e)
          const t = Object.create(null)
          for (const i of e) {
            const e = i.getTimes()
            for (const i of Object.keys(e)) t[i] = e[i]
          }
          return t
        }
        getTimeInfoEntries() {
          const e = new Map()
          this.collectTimeInfoEntries(e, e)
          return e
        }
        collectTimeInfoEntries(e, t) {
          const i = new Set()
          addWatchersToSet(this.fileWatchers.values(), i)
          addWatchersToSet(this.directoryWatchers.values(), i)
          const s = { value: 0 }
          for (const r of i) {
            r.collectTimeInfoEntries(e, t, s)
          }
        }
        getAggregated() {
          if (this.aggregateTimer) {
            clearTimeout(this.aggregateTimer)
            this.aggregateTimer = undefined
          }
          const e = this.aggregatedChanges
          const t = this.aggregatedRemovals
          this.aggregatedChanges = new Set()
          this.aggregatedRemovals = new Set()
          return { changes: e, removals: t }
        }
        _onChange(e, t, i, s) {
          i = i || e
          if (!this.paused) {
            this.emit('change', i, t, s)
            if (this.aggregateTimer) clearTimeout(this.aggregateTimer)
            this.aggregateTimer = setTimeout(
              this._onTimeout,
              this.aggregateTimeout
            )
          }
          this.aggregatedRemovals.delete(e)
          this.aggregatedChanges.add(e)
        }
        _onRemove(e, t, i) {
          t = t || e
          if (!this.paused) {
            this.emit('remove', t, i)
            if (this.aggregateTimer) clearTimeout(this.aggregateTimer)
            this.aggregateTimer = setTimeout(
              this._onTimeout,
              this.aggregateTimeout
            )
          }
          this.aggregatedChanges.delete(e)
          this.aggregatedRemovals.add(e)
        }
        _onTimeout() {
          this.aggregateTimer = undefined
          const e = this.aggregatedChanges
          const t = this.aggregatedRemovals
          this.aggregatedChanges = new Set()
          this.aggregatedRemovals = new Set()
          this.emit('aggregated', e, t)
        }
      }
      e.exports = Watchpack
    },
    491: (e) => {
      'use strict'
      e.exports = require('assert')
    },
    57: (e) => {
      'use strict'
      e.exports = require('constants')
    },
    361: (e) => {
      'use strict'
      e.exports = require('events')
    },
    147: (e) => {
      'use strict'
      e.exports = require('fs')
    },
    37: (e) => {
      'use strict'
      e.exports = require('os')
    },
    17: (e) => {
      'use strict'
      e.exports = require('path')
    },
    781: (e) => {
      'use strict'
      e.exports = require('stream')
    },
    837: (e) => {
      'use strict'
      e.exports = require('util')
    },
  }
  var t = {}
  function __nccwpck_require__(i) {
    var s = t[i]
    if (s !== undefined) {
      return s.exports
    }
    var r = (t[i] = { exports: {} })
    var n = true
    try {
      e[i](r, r.exports, __nccwpck_require__)
      n = false
    } finally {
      if (n) delete t[i]
    }
    return r.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var i = __nccwpck_require__(747)
  module.exports = i
})()
