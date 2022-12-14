;(() => {
  var e = {
    557: (e, n, r) => {
      const o = r(233)
      const t = r(135)
      const a = '[^\\s\'’\\(\\)!?;:"-]'
      const s = new RegExp(
        `(?:(?:(\\s?(?:^|[.\\(\\)!?;:"-])\\s*)(${a}))|(${a}))(${a}*[’']*${a}*)`,
        'g'
      )
      const convertToRegExp = (e) =>
        e.map((e) => [new RegExp(`\\b${e}\\b`, 'gi'), e])
      function parseMatch(e) {
        const n = e[0]
        if (/\s/.test(n)) {
          return e.slice(1)
        }
        if (/[\(\)]/.test(n)) {
          return null
        }
        return e
      }
      e.exports = (e, n = {}) => {
        e = e.toLowerCase().replace(s, (e, n = '', r, t, a, s, i) => {
          const c = e.length + s >= i.length
          const p = parseMatch(e)
          if (!p) {
            return e
          }
          if (!r) {
            const e = t + a
            if (o.has(e) && !c) {
              return p
            }
          }
          return n + (t || r).toUpperCase() + a
        })
        const r = n.special || []
        const a = [...t, ...r]
        const i = convertToRegExp(a)
        i.forEach(([n, r]) => {
          e = e.replace(n, r)
        })
        return e
      }
    },
    233: (e) => {
      const n = ['for', 'and', 'nor', 'but', 'or', 'yet', 'so']
      const r = ['a', 'an', 'the']
      const o = [
        'aboard',
        'about',
        'above',
        'across',
        'after',
        'against',
        'along',
        'amid',
        'among',
        'anti',
        'around',
        'as',
        'at',
        'before',
        'behind',
        'below',
        'beneath',
        'beside',
        'besides',
        'between',
        'beyond',
        'but',
        'by',
        'concerning',
        'considering',
        'despite',
        'down',
        'during',
        'except',
        'excepting',
        'excluding',
        'following',
        'for',
        'from',
        'in',
        'inside',
        'into',
        'like',
        'minus',
        'near',
        'of',
        'off',
        'on',
        'onto',
        'opposite',
        'over',
        'past',
        'per',
        'plus',
        'regarding',
        'round',
        'save',
        'since',
        'than',
        'through',
        'to',
        'toward',
        'towards',
        'under',
        'underneath',
        'unlike',
        'until',
        'up',
        'upon',
        'versus',
        'via',
        'with',
        'within',
        'without',
      ]
      e.exports = new Set([...n, ...r, ...o])
    },
    135: (e) => {
      const n = [
        'ZEIT',
        'ZEIT Inc.',
        'Vercel',
        'Vercel Inc.',
        'CLI',
        'API',
        'HTTP',
        'HTTPS',
        'JSX',
        'DNS',
        'URL',
        'now.sh',
        'now.json',
        'vercel.app',
        'vercel.json',
        'CI',
        'CD',
        'CDN',
        'package.json',
        'package.lock',
        'yarn.lock',
        'GitHub',
        'GitLab',
        'CSS',
        'Sass',
        'JS',
        'JavaScript',
        'TypeScript',
        'HTML',
        'WordPress',
        'Next.js',
        'Node.js',
        'Webpack',
        'Docker',
        'Bash',
        'Kubernetes',
        'SWR',
        'TinaCMS',
        'UI',
        'UX',
        'TS',
        'TSX',
        'iPhone',
        'iPad',
        'watchOS',
        'iOS',
        'iPadOS',
        'macOS',
        'PHP',
        'composer.json',
        'composer.lock',
        'CMS',
        'SQL',
        'C',
        'C#',
        'GraphQL',
        'GraphiQL',
        'JWT',
        'JWTs',
      ]
      e.exports = n
    },
  }
  var n = {}
  function __nccwpck_require__(r) {
    var o = n[r]
    if (o !== undefined) {
      return o.exports
    }
    var t = (n[r] = { exports: {} })
    var a = true
    try {
      e[r](t, t.exports, __nccwpck_require__)
      a = false
    } finally {
      if (a) delete n[r]
    }
    return t.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var r = __nccwpck_require__(557)
  module.exports = r
})()
