var e = {}
;(() => {
  e.d = (t, r) => {
    for (var n in r) {
      if (e.o(r, n) && !e.o(t, n)) {
        Object.defineProperty(t, n, { enumerable: true, get: r[n] })
      }
    }
  }
})()
;(() => {
  e.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)
})()
if (typeof e !== 'undefined')
  e.ab =
    new URL('.', import.meta.url).pathname.slice(
      import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0,
      -1
    ) + '/'
var t = {}
e.d(t, { Z: () => stripAnsi })
function ansiRegex({ onlyFirst: e = false } = {}) {
  const t = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
  ].join('|')
  return new RegExp(t, e ? undefined : 'g')
}
function stripAnsi(e) {
  if (typeof e !== 'string') {
    throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``)
  }
  return e.replace(ansiRegex(), '')
}
var r = t.Z
export { r as default }
