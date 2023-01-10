;(() => {
  var e = {
    321: (e, r, n) => {
      'use strict'
      const t = n(81)
      const s = n(947)
      const o = n(237)
      function spawn(e, r, n) {
        const c = s(e, r, n)
        const i = t.spawn(c.command, c.args, c.options)
        o.hookChildProcess(i, c)
        return i
      }
      function spawnSync(e, r, n) {
        const c = s(e, r, n)
        const i = t.spawnSync(c.command, c.args, c.options)
        i.error = i.error || o.verifyENOENTSync(i.status, c)
        return i
      }
      e.exports = spawn
      e.exports.spawn = spawn
      e.exports.sync = spawnSync
      e.exports._parse = s
      e.exports._enoent = o
    },
    237: (e) => {
      'use strict'
      const r = process.platform === 'win32'
      function notFoundError(e, r) {
        return Object.assign(new Error(`${r} ${e.command} ENOENT`), {
          code: 'ENOENT',
          errno: 'ENOENT',
          syscall: `${r} ${e.command}`,
          path: e.command,
          spawnargs: e.args,
        })
      }
      function hookChildProcess(e, n) {
        if (!r) {
          return
        }
        const t = e.emit
        e.emit = function (r, s) {
          if (r === 'exit') {
            const r = verifyENOENT(s, n, 'spawn')
            if (r) {
              return t.call(e, 'error', r)
            }
          }
          return t.apply(e, arguments)
        }
      }
      function verifyENOENT(e, n) {
        if (r && e === 1 && !n.file) {
          return notFoundError(n.original, 'spawn')
        }
        return null
      }
      function verifyENOENTSync(e, n) {
        if (r && e === 1 && !n.file) {
          return notFoundError(n.original, 'spawnSync')
        }
        return null
      }
      e.exports = {
        hookChildProcess: hookChildProcess,
        verifyENOENT: verifyENOENT,
        verifyENOENTSync: verifyENOENTSync,
        notFoundError: notFoundError,
      }
    },
    947: (e, r, n) => {
      'use strict'
      const t = n(17)
      const s = n(726)
      const o = n(970)
      const c = n(614)
      const i = n(290)
      const a = n(798)
      const u = process.platform === 'win32'
      const f = /\.(?:com|exe)$/i
      const l = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i
      const p =
        s(() =>
          a.satisfies(process.version, '^4.8.0 || ^5.7.0 || >= 6.0.0', true)
        ) || false
      function detectShebang(e) {
        e.file = o(e)
        const r = e.file && i(e.file)
        if (r) {
          e.args.unshift(e.file)
          e.command = r
          return o(e)
        }
        return e.file
      }
      function parseNonShell(e) {
        if (!u) {
          return e
        }
        const r = detectShebang(e)
        const n = !f.test(r)
        if (e.options.forceShell || n) {
          const n = l.test(r)
          e.command = t.normalize(e.command)
          e.command = c.command(e.command)
          e.args = e.args.map((e) => c.argument(e, n))
          const s = [e.command].concat(e.args).join(' ')
          e.args = ['/d', '/s', '/c', `"${s}"`]
          e.command = process.env.comspec || 'cmd.exe'
          e.options.windowsVerbatimArguments = true
        }
        return e
      }
      function parseShell(e) {
        if (p) {
          return e
        }
        const r = [e.command].concat(e.args).join(' ')
        if (u) {
          e.command =
            typeof e.options.shell === 'string'
              ? e.options.shell
              : process.env.comspec || 'cmd.exe'
          e.args = ['/d', '/s', '/c', `"${r}"`]
          e.options.windowsVerbatimArguments = true
        } else {
          if (typeof e.options.shell === 'string') {
            e.command = e.options.shell
          } else if (process.platform === 'android') {
            e.command = '/system/bin/sh'
          } else {
            e.command = '/bin/sh'
          }
          e.args = ['-c', r]
        }
        return e
      }
      function parse(e, r, n) {
        if (r && !Array.isArray(r)) {
          n = r
          r = null
        }
        r = r ? r.slice(0) : []
        n = Object.assign({}, n)
        const t = {
          command: e,
          args: r,
          options: n,
          file: undefined,
          original: { command: e, args: r },
        }
        return n.shell ? parseShell(t) : parseNonShell(t)
      }
      e.exports = parse
    },
    614: (e) => {
      'use strict'
      const r = /([()\][%!^"`<>&|;, *?])/g
      function escapeCommand(e) {
        e = e.replace(r, '^$1')
        return e
      }
      function escapeArgument(e, n) {
        e = `${e}`
        e = e.replace(/(\\*)"/g, '$1$1\\"')
        e = e.replace(/(\\*)$/, '$1$1')
        e = `"${e}"`
        e = e.replace(r, '^$1')
        if (n) {
          e = e.replace(r, '^$1')
        }
        return e
      }
      e.exports.command = escapeCommand
      e.exports.argument = escapeArgument
    },
    290: (e, r, n) => {
      'use strict'
      const t = n(147)
      const s = n(629)
      function readShebang(e) {
        const r = 150
        let n
        if (Buffer.alloc) {
          n = Buffer.alloc(r)
        } else {
          n = new Buffer(r)
          n.fill(0)
        }
        let o
        try {
          o = t.openSync(e, 'r')
          t.readSync(o, n, 0, r, 0)
          t.closeSync(o)
        } catch (e) {}
        return s(n.toString())
      }
      e.exports = readShebang
    },
    970: (e, r, n) => {
      'use strict'
      const t = n(17)
      const s = n(423)
      const o = n(838)()
      function resolveCommandAttempt(e, r) {
        const n = process.cwd()
        const c = e.options.cwd != null
        if (c) {
          try {
            process.chdir(e.options.cwd)
          } catch (e) {}
        }
        let i
        try {
          i = s.sync(e.command, {
            path: (e.options.env || process.env)[o],
            pathExt: r ? t.delimiter : undefined,
          })
        } catch (e) {
        } finally {
          process.chdir(n)
        }
        if (i) {
          i = t.resolve(c ? e.options.cwd : '', i)
        }
        return i
      }
      function resolveCommand(e) {
        return resolveCommandAttempt(e) || resolveCommandAttempt(e, true)
      }
      e.exports = resolveCommand
    },
    745: (e, r, n) => {
      var t = n(147)
      var s
      if (process.platform === 'win32' || global.TESTING_WINDOWS) {
        s = n(554)
      } else {
        s = n(138)
      }
      e.exports = isexe
      isexe.sync = sync
      function isexe(e, r, n) {
        if (typeof r === 'function') {
          n = r
          r = {}
        }
        if (!n) {
          if (typeof Promise !== 'function') {
            throw new TypeError('callback not provided')
          }
          return new Promise(function (n, t) {
            isexe(e, r || {}, function (e, r) {
              if (e) {
                t(e)
              } else {
                n(r)
              }
            })
          })
        }
        s(e, r || {}, function (e, t) {
          if (e) {
            if (e.code === 'EACCES' || (r && r.ignoreErrors)) {
              e = null
              t = false
            }
          }
          n(e, t)
        })
      }
      function sync(e, r) {
        try {
          return s.sync(e, r || {})
        } catch (e) {
          if ((r && r.ignoreErrors) || e.code === 'EACCES') {
            return false
          } else {
            throw e
          }
        }
      }
    },
    138: (e, r, n) => {
      e.exports = isexe
      isexe.sync = sync
      var t = n(147)
      function isexe(e, r, n) {
        t.stat(e, function (e, t) {
          n(e, e ? false : checkStat(t, r))
        })
      }
      function sync(e, r) {
        return checkStat(t.statSync(e), r)
      }
      function checkStat(e, r) {
        return e.isFile() && checkMode(e, r)
      }
      function checkMode(e, r) {
        var n = e.mode
        var t = e.uid
        var s = e.gid
        var o = r.uid !== undefined ? r.uid : process.getuid && process.getuid()
        var c = r.gid !== undefined ? r.gid : process.getgid && process.getgid()
        var i = parseInt('100', 8)
        var a = parseInt('010', 8)
        var u = parseInt('001', 8)
        var f = i | a
        var l =
          n & u ||
          (n & a && s === c) ||
          (n & i && t === o) ||
          (n & f && o === 0)
        return l
      }
    },
    554: (e, r, n) => {
      e.exports = isexe
      isexe.sync = sync
      var t = n(147)
      function checkPathExt(e, r) {
        var n = r.pathExt !== undefined ? r.pathExt : process.env.PATHEXT
        if (!n) {
          return true
        }
        n = n.split(';')
        if (n.indexOf('') !== -1) {
          return true
        }
        for (var t = 0; t < n.length; t++) {
          var s = n[t].toLowerCase()
          if (s && e.substr(-s.length).toLowerCase() === s) {
            return true
          }
        }
        return false
      }
      function checkStat(e, r, n) {
        if (!e.isSymbolicLink() && !e.isFile()) {
          return false
        }
        return checkPathExt(r, n)
      }
      function isexe(e, r, n) {
        t.stat(e, function (t, s) {
          n(t, t ? false : checkStat(s, e, r))
        })
      }
      function sync(e, r) {
        return checkStat(t.statSync(e), e, r)
      }
    },
    726: (e) => {
      'use strict'
      e.exports = function (e) {
        try {
          return e()
        } catch (e) {}
      }
    },
    838: (e) => {
      'use strict'
      e.exports = (e) => {
        e = e || {}
        const r = e.env || process.env
        const n = e.platform || process.platform
        if (n !== 'win32') {
          return 'PATH'
        }
        return Object.keys(r).find((e) => e.toUpperCase() === 'PATH') || 'Path'
      }
    },
    629: (e, r, n) => {
      'use strict'
      var t = n(129)
      e.exports = function (e) {
        var r = e.match(t)
        if (!r) {
          return null
        }
        var n = r[0].replace(/#! ?/, '').split(' ')
        var s = n[0].split('/').pop()
        var o = n[1]
        return s === 'env' ? o : s + (o ? ' ' + o : '')
      }
    },
    129: (e) => {
      'use strict'
      e.exports = /^#!.*/
    },
    423: (e, r, n) => {
      e.exports = which
      which.sync = whichSync
      var t =
        process.platform === 'win32' ||
        process.env.OSTYPE === 'cygwin' ||
        process.env.OSTYPE === 'msys'
      var s = n(17)
      var o = t ? ';' : ':'
      var c = n(745)
      function getNotFoundError(e) {
        var r = new Error('not found: ' + e)
        r.code = 'ENOENT'
        return r
      }
      function getPathInfo(e, r) {
        var n = r.colon || o
        var s = r.path || process.env.PATH || ''
        var c = ['']
        s = s.split(n)
        var i = ''
        if (t) {
          s.unshift(process.cwd())
          i = r.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM'
          c = i.split(n)
          if (e.indexOf('.') !== -1 && c[0] !== '') c.unshift('')
        }
        if (e.match(/\//) || (t && e.match(/\\/))) s = ['']
        return { env: s, ext: c, extExe: i }
      }
      function which(e, r, n) {
        if (typeof r === 'function') {
          n = r
          r = {}
        }
        var t = getPathInfo(e, r)
        var o = t.env
        var i = t.ext
        var a = t.extExe
        var u = []
        ;(function F(t, f) {
          if (t === f) {
            if (r.all && u.length) return n(null, u)
            else return n(getNotFoundError(e))
          }
          var l = o[t]
          if (l.charAt(0) === '"' && l.slice(-1) === '"') l = l.slice(1, -1)
          var p = s.join(l, e)
          if (!l && /^\.[\\\/]/.test(e)) {
            p = e.slice(0, 2) + p
          }
          ;(function E(e, s) {
            if (e === s) return F(t + 1, f)
            var o = i[e]
            c(p + o, { pathExt: a }, function (t, c) {
              if (!t && c) {
                if (r.all) u.push(p + o)
                else return n(null, p + o)
              }
              return E(e + 1, s)
            })
          })(0, i.length)
        })(0, o.length)
      }
      function whichSync(e, r) {
        r = r || {}
        var n = getPathInfo(e, r)
        var t = n.env
        var o = n.ext
        var i = n.extExe
        var a = []
        for (var u = 0, f = t.length; u < f; u++) {
          var l = t[u]
          if (l.charAt(0) === '"' && l.slice(-1) === '"') l = l.slice(1, -1)
          var p = s.join(l, e)
          if (!l && /^\.[\\\/]/.test(e)) {
            p = e.slice(0, 2) + p
          }
          for (var d = 0, m = o.length; d < m; d++) {
            var h = p + o[d]
            var v
            try {
              v = c.sync(h, { pathExt: i })
              if (v) {
                if (r.all) a.push(h)
                else return h
              }
            } catch (e) {}
          }
        }
        if (r.all && a.length) return a
        if (r.nothrow) return null
        throw getNotFoundError(e)
      }
    },
    81: (e) => {
      'use strict'
      e.exports = require('child_process')
    },
    147: (e) => {
      'use strict'
      e.exports = require('fs')
    },
    798: (e) => {
      'use strict'
      e.exports = require('jujutsu/dist/compiled/semver')
    },
    17: (e) => {
      'use strict'
      e.exports = require('path')
    },
  }
  var r = {}
  function __nccwpck_require__(n) {
    var t = r[n]
    if (t !== undefined) {
      return t.exports
    }
    var s = (r[n] = { exports: {} })
    var o = true
    try {
      e[n](s, s.exports, __nccwpck_require__)
      o = false
    } finally {
      if (o) delete r[n]
    }
    return s.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var n = __nccwpck_require__(321)
  module.exports = n
})()
