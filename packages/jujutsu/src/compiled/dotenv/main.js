;(() => {
  var e = {
    756: (e, s, n) => {
      const t = n(147)
      const r = n(17)
      const o = n(37)
      const i = n(889)
      const a = i.version
      const c =
        /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm
      function parse(e) {
        const s = {}
        let n = e.toString()
        n = n.replace(/\r\n?/gm, '\n')
        let t
        while ((t = c.exec(n)) != null) {
          const e = t[1]
          let n = t[2] || ''
          n = n.trim()
          const r = n[0]
          n = n.replace(/^(['"`])([\s\S]*)\1$/gm, '$2')
          if (r === '"') {
            n = n.replace(/\\n/g, '\n')
            n = n.replace(/\\r/g, '\r')
          }
          s[e] = n
        }
        return s
      }
      function _log(e) {
        console.log(`[dotenv@${a}][DEBUG] ${e}`)
      }
      function _resolveHome(e) {
        return e[0] === '~' ? r.join(o.homedir(), e.slice(1)) : e
      }
      function config(e) {
        let s = r.resolve(process.cwd(), '.env')
        let n = 'utf8'
        const o = Boolean(e && e.debug)
        const i = Boolean(e && e.override)
        if (e) {
          if (e.path != null) {
            s = _resolveHome(e.path)
          }
          if (e.encoding != null) {
            n = e.encoding
          }
        }
        try {
          const e = l.parse(t.readFileSync(s, { encoding: n }))
          Object.keys(e).forEach(function (s) {
            if (!Object.prototype.hasOwnProperty.call(process.env, s)) {
              process.env[s] = e[s]
            } else {
              if (i === true) {
                process.env[s] = e[s]
              }
              if (o) {
                if (i === true) {
                  _log(
                    `"${s}" is already defined in \`process.env\` and WAS overwritten`
                  )
                } else {
                  _log(
                    `"${s}" is already defined in \`process.env\` and was NOT overwritten`
                  )
                }
              }
            }
          })
          return { parsed: e }
        } catch (e) {
          if (o) {
            _log(`Failed to load ${s} ${e.message}`)
          }
          return { error: e }
        }
      }
      const l = { config: config, parse: parse }
      e.exports.config = l.config
      e.exports.parse = l.parse
      e.exports = l
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
    889: (e) => {
      'use strict'
      e.exports = JSON.parse(
        '{"name":"dotenv","version":"16.0.3","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"require":"./lib/main.js","types":"./lib/main.d.ts","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","lint-readme":"standard-markdown","pretest":"npm run lint && npm run dts-check","test":"tap tests/*.js --100 -Rspec","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@types/node":"^17.0.9","decache":"^4.6.1","dtslint":"^3.7.0","sinon":"^12.0.1","standard":"^16.0.4","standard-markdown":"^7.1.0","standard-version":"^9.3.2","tap":"^15.1.6","tar":"^6.1.11","typescript":"^4.5.4"},"engines":{"node":">=12"}}'
      )
    },
  }
  var s = {}
  function __nccwpck_require__(n) {
    var t = s[n]
    if (t !== undefined) {
      return t.exports
    }
    var r = (s[n] = { exports: {} })
    var o = true
    try {
      e[n](r, r.exports, __nccwpck_require__)
      o = false
    } finally {
      if (o) delete s[n]
    }
    return r.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var n = __nccwpck_require__(756)
  module.exports = n
})()
