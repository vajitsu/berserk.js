;(() => {
  var v = {
    411: (v, g, y) => {
      v = y.nmd(v)
      var x
      const E = v,
        R = {
          Array: global.Array,
          Buffer: global.Buffer,
          Error: global.Error,
          EvalError: global.EvalError,
          Function: global.Function,
          JSON: global.JSON,
          Object: global.Object,
          Promise: global.Promise,
          RangeError: global.RangeError,
          ReferenceError: global.ReferenceError,
          Reflect: global.Reflect,
          SyntaxError: global.SyntaxError,
          TypeError: global.TypeError,
          URIError: global.URIError,
          eval: global.eval,
        },
        _ = global.console
      v.exports = (function (v) {
        var g = {}
        function r(y) {
          if (g[y]) return g[y].exports
          var x = (g[y] = { i: y, l: !1, exports: {} })
          return v[y].call(x.exports, x, x.exports, r), (x.l = !0), x.exports
        }
        return (
          (r.d = function (v, g, y) {
            Reflect.defineProperty(v, g, {
              configurable: !0,
              enumerable: !0,
              get: y,
            })
          }),
          (r.n = function (v) {
            return (
              (v.a = v),
              function () {
                return v
              }
            )
          }),
          r((r.s = 2))
        )
      })([
        function (v, g) {
          var y
          ;(g = v.exports = $),
            'object' == typeof process && process,
            (y = function () {}),
            (g.SEMVER_SPEC_VERSION = '2.0.0')
          var x = 256,
            E = Number.MAX_SAFE_INTEGER || 9007199254740991,
            R = (g.re = []),
            _ = (g.src = []),
            P = 0,
            k = P++
          _[k] = '0|[1-9]\\d*'
          var I = P++
          _[I] = '[0-9]+'
          var A = P++
          _[A] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'
          var N = P++
          _[N] = '(' + _[k] + ')\\.(' + _[k] + ')\\.(' + _[k] + ')'
          var C = P++
          _[C] = '(' + _[I] + ')\\.(' + _[I] + ')\\.(' + _[I] + ')'
          var O = P++
          _[O] = '(?:' + _[k] + '|' + _[A] + ')'
          var T = P++
          _[T] = '(?:' + _[I] + '|' + _[A] + ')'
          var L = P++
          _[L] = '(?:-(' + _[O] + '(?:\\.' + _[O] + ')*))'
          var M = P++
          _[M] = '(?:-?(' + _[T] + '(?:\\.' + _[T] + ')*))'
          var D = P++
          _[D] = '[0-9A-Za-z-]+'
          var F = P++
          _[F] = '(?:\\+(' + _[D] + '(?:\\.' + _[D] + ')*))'
          var j = P++,
            V = 'v?' + _[N] + _[L] + '?' + _[F] + '?'
          _[j] = '^' + V + '$'
          var B = '[v=\\s]*' + _[C] + _[M] + '?' + _[F] + '?',
            G = P++
          _[G] = '^' + B + '$'
          var U = P++
          _[U] = '((?:<|>)?=?)'
          var W = P++
          _[W] = _[I] + '|x|X|\\*'
          var q = P++
          _[q] = _[k] + '|x|X|\\*'
          var z = P++
          _[z] =
            '[v=\\s]*(' +
            _[q] +
            ')(?:\\.(' +
            _[q] +
            ')(?:\\.(' +
            _[q] +
            ')(?:' +
            _[L] +
            ')?' +
            _[F] +
            '?)?)?'
          var K = P++
          _[K] =
            '[v=\\s]*(' +
            _[W] +
            ')(?:\\.(' +
            _[W] +
            ')(?:\\.(' +
            _[W] +
            ')(?:' +
            _[M] +
            ')?' +
            _[F] +
            '?)?)?'
          var he = P++
          _[he] = '^' + _[U] + '\\s*' + _[z] + '$'
          var fe = P++
          _[fe] = '^' + _[U] + '\\s*' + _[K] + '$'
          var de = P++
          _[de] =
            '(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])'
          var me = P++
          _[me] = '(?:~>?)'
          var ve = P++
          ;(_[ve] = '(\\s*)' + _[me] + '\\s+'), (R[ve] = RegExp(_[ve], 'g'))
          var ge = P++
          _[ge] = '^' + _[me] + _[z] + '$'
          var ye = P++
          _[ye] = '^' + _[me] + _[K] + '$'
          var xe = P++
          _[xe] = '(?:\\^)'
          var be = P++
          ;(_[be] = '(\\s*)' + _[xe] + '\\s+'), (R[be] = RegExp(_[be], 'g'))
          var we = P++
          _[we] = '^' + _[xe] + _[z] + '$'
          var Ee = P++
          _[Ee] = '^' + _[xe] + _[K] + '$'
          var Se = P++
          _[Se] = '^' + _[U] + '\\s*(' + B + ')$|^$'
          var Re = P++
          _[Re] = '^' + _[U] + '\\s*(' + V + ')$|^$'
          var _e = P++
          ;(_[_e] = '(\\s*)' + _[U] + '\\s*(' + B + '|' + _[z] + ')'),
            (R[_e] = RegExp(_[_e], 'g'))
          var Pe = P++
          _[Pe] = '^\\s*(' + _[z] + ')\\s+-\\s+(' + _[z] + ')\\s*$'
          var ke = P++
          _[ke] = '^\\s*(' + _[K] + ')\\s+-\\s+(' + _[K] + ')\\s*$'
          var Ie = P++
          _[Ie] = '(<|>)?=?\\s*\\*'
          for (var Ae = 0; Ae < 35; Ae++)
            y(Ae, _[Ae]), R[Ae] || (R[Ae] = RegExp(_[Ae]))
          function H(v, g) {
            if (
              ((g && 'object' == typeof g) ||
                (g = { loose: !!g, includePrerelease: !1 }),
              v instanceof $)
            )
              return v
            if ('string' != typeof v) return null
            if (v.length > x) return null
            var y = g.loose ? R[G] : R[j]
            if (!y.test(v)) return null
            try {
              return new $(v, g)
            } catch (v) {
              return null
            }
          }
          function $(v, g) {
            if (
              ((g && 'object' == typeof g) ||
                (g = { loose: !!g, includePrerelease: !1 }),
              v instanceof $)
            ) {
              if (v.loose === g.loose) return v
              v = v.version
            } else if ('string' != typeof v)
              throw new TypeError('Invalid Version: ' + v)
            if (v.length > x)
              throw new TypeError('version is longer than ' + x + ' characters')
            if (!(this instanceof $)) return new $(v, g)
            y('SemVer', v, g), (this.options = g), (this.loose = !!g.loose)
            var _ = v.trim().match(g.loose ? R[G] : R[j])
            if (!_) throw new TypeError('Invalid Version: ' + v)
            if (
              ((this.raw = v),
              (this.major = +_[1]),
              (this.minor = +_[2]),
              (this.patch = +_[3]),
              this.major > E || this.major < 0)
            )
              throw new TypeError('Invalid major version')
            if (this.minor > E || this.minor < 0)
              throw new TypeError('Invalid minor version')
            if (this.patch > E || this.patch < 0)
              throw new TypeError('Invalid patch version')
            ;(this.prerelease = _[4]
              ? _[4].split('.').map(function (v) {
                  if (/^[0-9]+$/.test(v)) {
                    var g = +v
                    if (g >= 0 && g < E) return g
                  }
                  return v
                })
              : []),
              (this.build = _[5] ? _[5].split('.') : []),
              this.format()
          }
          ;(g.parse = H),
            (g.valid = function (v, g) {
              var y = H(v, g)
              return y ? y.version : null
            }),
            (g.clean = function (v, g) {
              var y = H(v.trim().replace(/^[=v]+/, ''), g)
              return y ? y.version : null
            }),
            (g.SemVer = $),
            ($.prototype.format = function () {
              return (
                (this.version =
                  this.major + '.' + this.minor + '.' + this.patch),
                this.prerelease.length &&
                  (this.version += '-' + this.prerelease.join('.')),
                this.version
              )
            }),
            ($.prototype.toString = function () {
              return this.version
            }),
            ($.prototype.compare = function (v) {
              return (
                y('SemVer.compare', this.version, this.options, v),
                v instanceof $ || (v = new $(v, this.options)),
                this.compareMain(v) || this.comparePre(v)
              )
            }),
            ($.prototype.compareMain = function (v) {
              return (
                v instanceof $ || (v = new $(v, this.options)),
                J(this.major, v.major) ||
                  J(this.minor, v.minor) ||
                  J(this.patch, v.patch)
              )
            }),
            ($.prototype.comparePre = function (v) {
              if (
                (v instanceof $ || (v = new $(v, this.options)),
                this.prerelease.length && !v.prerelease.length)
              )
                return -1
              if (!this.prerelease.length && v.prerelease.length) return 1
              if (!this.prerelease.length && !v.prerelease.length) return 0
              var g = 0
              do {
                var x = this.prerelease[g],
                  E = v.prerelease[g]
                if (
                  (y('prerelease compare', g, x, E),
                  void 0 === x && void 0 === E)
                )
                  return 0
                if (void 0 === E) return 1
                if (void 0 === x) return -1
                if (x !== E) return J(x, E)
              } while (++g)
            }),
            ($.prototype.inc = function (v, g) {
              switch (v) {
                case 'premajor':
                  ;(this.prerelease.length = 0),
                    (this.patch = 0),
                    (this.minor = 0),
                    this.major++,
                    this.inc('pre', g)
                  break
                case 'preminor':
                  ;(this.prerelease.length = 0),
                    (this.patch = 0),
                    this.minor++,
                    this.inc('pre', g)
                  break
                case 'prepatch':
                  ;(this.prerelease.length = 0),
                    this.inc('patch', g),
                    this.inc('pre', g)
                  break
                case 'prerelease':
                  0 === this.prerelease.length && this.inc('patch', g),
                    this.inc('pre', g)
                  break
                case 'major':
                  ;(0 === this.minor &&
                    0 === this.patch &&
                    0 !== this.prerelease.length) ||
                    this.major++,
                    (this.minor = 0),
                    (this.patch = 0),
                    (this.prerelease = [])
                  break
                case 'minor':
                  ;(0 === this.patch && 0 !== this.prerelease.length) ||
                    this.minor++,
                    (this.patch = 0),
                    (this.prerelease = [])
                  break
                case 'patch':
                  0 === this.prerelease.length && this.patch++,
                    (this.prerelease = [])
                  break
                case 'pre':
                  if (0 === this.prerelease.length) this.prerelease = [0]
                  else {
                    for (var y = this.prerelease.length; --y >= 0; )
                      'number' == typeof this.prerelease[y] &&
                        (this.prerelease[y]++, (y = -2))
                    ;-1 === y && this.prerelease.push(0)
                  }
                  g &&
                    (this.prerelease[0] === g
                      ? isNaN(this.prerelease[1]) && (this.prerelease = [g, 0])
                      : (this.prerelease = [g, 0]))
                  break
                default:
                  throw Error('invalid increment argument: ' + v)
              }
              return this.format(), (this.raw = this.version), this
            }),
            (g.inc = function (v, g, y, x) {
              'string' == typeof y && ((x = y), (y = void 0))
              try {
                return new $(v, y).inc(g, x).version
              } catch (v) {
                return null
              }
            }),
            (g.diff = function (v, g) {
              if (Z(v, g)) return null
              var y = H(v),
                x = H(g),
                E = ''
              if (y.prerelease.length || x.prerelease.length) {
                E = 'pre'
                var R = 'prerelease'
              }
              for (var _ in y)
                if (
                  ('major' === _ || 'minor' === _ || 'patch' === _) &&
                  y[_] !== x[_]
                )
                  return E + _
              return R
            }),
            (g.compareIdentifiers = J)
          var Oe = /^[0-9]+$/
          function J(v, g) {
            var y = Oe.test(v),
              x = Oe.test(g)
            return (
              y && x && ((v = +v), (g = +g)),
              v === g ? 0 : y && !x ? -1 : x && !y ? 1 : v < g ? -1 : 1
            )
          }
          function Y(v, g, y) {
            return new $(v, y).compare(new $(g, y))
          }
          function X(v, g, y) {
            return Y(v, g, y) > 0
          }
          function Q(v, g, y) {
            return Y(v, g, y) < 0
          }
          function Z(v, g, y) {
            return 0 === Y(v, g, y)
          }
          function ee(v, g, y) {
            return 0 !== Y(v, g, y)
          }
          function te(v, g, y) {
            return Y(v, g, y) >= 0
          }
          function re(v, g, y) {
            return Y(v, g, y) <= 0
          }
          function ie(v, g, y, x) {
            switch (g) {
              case '===':
                return (
                  'object' == typeof v && (v = v.version),
                  'object' == typeof y && (y = y.version),
                  v === y
                )
              case '!==':
                return (
                  'object' == typeof v && (v = v.version),
                  'object' == typeof y && (y = y.version),
                  v !== y
                )
              case '':
              case '=':
              case '==':
                return Z(v, y, x)
              case '!=':
                return ee(v, y, x)
              case '>':
                return X(v, y, x)
              case '>=':
                return te(v, y, x)
              case '<':
                return Q(v, y, x)
              case '<=':
                return re(v, y, x)
              default:
                throw new TypeError('Invalid operator: ' + g)
            }
          }
          function ne(v, g) {
            if (
              ((g && 'object' == typeof g) ||
                (g = { loose: !!g, includePrerelease: !1 }),
              v instanceof ne)
            ) {
              if (v.loose === !!g.loose) return v
              v = v.value
            }
            if (!(this instanceof ne)) return new ne(v, g)
            y('comparator', v, g),
              (this.options = g),
              (this.loose = !!g.loose),
              this.parse(v),
              (this.value =
                this.semver === Te ? '' : this.operator + this.semver.version),
              y('comp', this)
          }
          ;(g.rcompareIdentifiers = function (v, g) {
            return J(g, v)
          }),
            (g.major = function (v, g) {
              return new $(v, g).major
            }),
            (g.minor = function (v, g) {
              return new $(v, g).minor
            }),
            (g.patch = function (v, g) {
              return new $(v, g).patch
            }),
            (g.compare = Y),
            (g.compareLoose = function (v, g) {
              return Y(v, g, !0)
            }),
            (g.rcompare = function (v, g, y) {
              return Y(g, v, y)
            }),
            (g.sort = function (v, y) {
              return v.sort(function (v, x) {
                return g.compare(v, x, y)
              })
            }),
            (g.rsort = function (v, y) {
              return v.sort(function (v, x) {
                return g.rcompare(v, x, y)
              })
            }),
            (g.gt = X),
            (g.lt = Q),
            (g.eq = Z),
            (g.neq = ee),
            (g.gte = te),
            (g.lte = re),
            (g.cmp = ie),
            (g.Comparator = ne)
          var Te = {}
          function ae(v, g) {
            if (
              ((g && 'object' == typeof g) ||
                (g = { loose: !!g, includePrerelease: !1 }),
              v instanceof ae)
            )
              return v.loose === !!g.loose &&
                v.includePrerelease === !!g.includePrerelease
                ? v
                : new ae(v.raw, g)
            if (v instanceof ne) return new ae(v.value, g)
            if (!(this instanceof ae)) return new ae(v, g)
            if (
              ((this.options = g),
              (this.loose = !!g.loose),
              (this.includePrerelease = !!g.includePrerelease),
              (this.raw = v),
              (this.set = v
                .split(/\s*\|\|\s*/)
                .map(function (v) {
                  return this.parseRange(v.trim())
                }, this)
                .filter(function (v) {
                  return v.length
                })),
              !this.set.length)
            )
              throw new TypeError('Invalid SemVer Range: ' + v)
            this.format()
          }
          function oe(v) {
            return !v || 'x' === v.toLowerCase() || '*' === v
          }
          function ue(v, g, y, x, E, R, _, P, k, I, A, N, C) {
            return (
              (g = oe(y)
                ? ''
                : oe(x)
                ? '>=' + y + '.0.0'
                : oe(E)
                ? '>=' + y + '.' + x + '.0'
                : '>=' + g),
              (P = oe(k)
                ? ''
                : oe(I)
                ? '<' + (+k + 1) + '.0.0'
                : oe(A)
                ? '<' + k + '.' + (+I + 1) + '.0'
                : N
                ? '<=' + k + '.' + I + '.' + A + '-' + N
                : '<=' + P),
              (g + ' ' + P).trim()
            )
          }
          function le(v, g, x) {
            for (var E = 0; E < v.length; E++) if (!v[E].test(g)) return !1
            if (g.prerelease.length && !x.includePrerelease) {
              for (E = 0; E < v.length; E++)
                if (
                  (y(v[E].semver),
                  v[E].semver !== Te && v[E].semver.prerelease.length > 0)
                ) {
                  var R = v[E].semver
                  if (
                    R.major === g.major &&
                    R.minor === g.minor &&
                    R.patch === g.patch
                  )
                    return !0
                }
              return !1
            }
            return !0
          }
          function ce(v, g, y) {
            try {
              g = new ae(g, y)
            } catch (v) {
              return !1
            }
            return g.test(v)
          }
          function pe(v, g, y, x) {
            var E, R, _, P, k
            switch (((v = new $(v, x)), (g = new ae(g, x)), y)) {
              case '>':
                ;(E = X), (R = re), (_ = Q), (P = '>'), (k = '>=')
                break
              case '<':
                ;(E = Q), (R = te), (_ = X), (P = '<'), (k = '<=')
                break
              default:
                throw new TypeError('Must provide a hilo val of "<" or ">"')
            }
            if (ce(v, g, x)) return !1
            for (var I = 0; I < g.set.length; ++I) {
              var A = g.set[I],
                N = null,
                C = null
              if (
                (A.forEach(function (v) {
                  v.semver === Te && (v = new ne('>=0.0.0')),
                    (N = N || v),
                    (C = C || v),
                    E(v.semver, N.semver, x)
                      ? (N = v)
                      : _(v.semver, C.semver, x) && (C = v)
                }),
                N.operator === P || N.operator === k)
              )
                return !1
              if ((!C.operator || C.operator === P) && R(v, C.semver)) return !1
              if (C.operator === k && _(v, C.semver)) return !1
            }
            return !0
          }
          ;(ne.prototype.parse = function (v) {
            var g = this.options.loose ? R[Se] : R[Re],
              y = v.match(g)
            if (!y) throw new TypeError('Invalid comparator: ' + v)
            ;(this.operator = y[1]),
              '=' === this.operator && (this.operator = ''),
              (this.semver = y[2] ? new $(y[2], this.options.loose) : Te)
          }),
            (ne.prototype.toString = function () {
              return this.value
            }),
            (ne.prototype.test = function (v) {
              return (
                y('Comparator.test', v, this.options.loose),
                this.semver === Te ||
                  ('string' == typeof v && (v = new $(v, this.options)),
                  ie(v, this.operator, this.semver, this.options))
              )
            }),
            (ne.prototype.intersects = function (v, g) {
              if (!(v instanceof ne))
                throw new TypeError('a Comparator is required')
              var y
              if (
                ((g && 'object' == typeof g) ||
                  (g = { loose: !!g, includePrerelease: !1 }),
                '' === this.operator)
              )
                return (y = new ae(v.value, g)), ce(this.value, y, g)
              if ('' === v.operator)
                return (y = new ae(this.value, g)), ce(v.semver, y, g)
              var x = !(
                  ('>=' !== this.operator && '>' !== this.operator) ||
                  ('>=' !== v.operator && '>' !== v.operator)
                ),
                E = !(
                  ('<=' !== this.operator && '<' !== this.operator) ||
                  ('<=' !== v.operator && '<' !== v.operator)
                ),
                R = this.semver.version === v.semver.version,
                _ = !(
                  ('>=' !== this.operator && '<=' !== this.operator) ||
                  ('>=' !== v.operator && '<=' !== v.operator)
                ),
                P =
                  ie(this.semver, '<', v.semver, g) &&
                  ('>=' === this.operator || '>' === this.operator) &&
                  ('<=' === v.operator || '<' === v.operator),
                k =
                  ie(this.semver, '>', v.semver, g) &&
                  ('<=' === this.operator || '<' === this.operator) &&
                  ('>=' === v.operator || '>' === v.operator)
              return x || E || (R && _) || P || k
            }),
            (g.Range = ae),
            (ae.prototype.format = function () {
              return (
                (this.range = this.set
                  .map(function (v) {
                    return v.join(' ').trim()
                  })
                  .join('||')
                  .trim()),
                this.range
              )
            }),
            (ae.prototype.toString = function () {
              return this.range
            }),
            (ae.prototype.parseRange = function (v) {
              var g = this.options.loose
              v = v.trim()
              var x = g ? R[ke] : R[Pe]
              ;(v = v.replace(x, ue)),
                y('hyphen replace', v),
                (v = v.replace(R[_e], '$1$2$3')),
                y('comparator trim', v, R[_e]),
                (v = v.replace(R[ve], '$1~')),
                (v = v.replace(R[be], '$1^')),
                (v = v.split(/\s+/).join(' '))
              var E = g ? R[Se] : R[Re],
                _ = v
                  .split(' ')
                  .map(function (v) {
                    return (function (v, g) {
                      return (
                        y('comp', v, g),
                        (v = (function (v, g) {
                          return v
                            .trim()
                            .split(/\s+/)
                            .map(function (v) {
                              return (function (v, g) {
                                y('caret', v, g)
                                var x = g.loose ? R[Ee] : R[we]
                                return v.replace(x, function (g, x, E, R, _) {
                                  var P
                                  return (
                                    y('caret', v, g, x, E, R, _),
                                    oe(x)
                                      ? (P = '')
                                      : oe(E)
                                      ? (P =
                                          '>=' +
                                          x +
                                          '.0.0 <' +
                                          (+x + 1) +
                                          '.0.0')
                                      : oe(R)
                                      ? (P =
                                          '0' === x
                                            ? '>=' +
                                              x +
                                              '.' +
                                              E +
                                              '.0 <' +
                                              x +
                                              '.' +
                                              (+E + 1) +
                                              '.0'
                                            : '>=' +
                                              x +
                                              '.' +
                                              E +
                                              '.0 <' +
                                              (+x + 1) +
                                              '.0.0')
                                      : _
                                      ? (y('replaceCaret pr', _),
                                        (P =
                                          '0' === x
                                            ? '0' === E
                                              ? '>=' +
                                                x +
                                                '.' +
                                                E +
                                                '.' +
                                                R +
                                                '-' +
                                                _ +
                                                ' <' +
                                                x +
                                                '.' +
                                                E +
                                                '.' +
                                                (+R + 1)
                                              : '>=' +
                                                x +
                                                '.' +
                                                E +
                                                '.' +
                                                R +
                                                '-' +
                                                _ +
                                                ' <' +
                                                x +
                                                '.' +
                                                (+E + 1) +
                                                '.0'
                                            : '>=' +
                                              x +
                                              '.' +
                                              E +
                                              '.' +
                                              R +
                                              '-' +
                                              _ +
                                              ' <' +
                                              (+x + 1) +
                                              '.0.0'))
                                      : (y('no pr'),
                                        (P =
                                          '0' === x
                                            ? '0' === E
                                              ? '>=' +
                                                x +
                                                '.' +
                                                E +
                                                '.' +
                                                R +
                                                ' <' +
                                                x +
                                                '.' +
                                                E +
                                                '.' +
                                                (+R + 1)
                                              : '>=' +
                                                x +
                                                '.' +
                                                E +
                                                '.' +
                                                R +
                                                ' <' +
                                                x +
                                                '.' +
                                                (+E + 1) +
                                                '.0'
                                            : '>=' +
                                              x +
                                              '.' +
                                              E +
                                              '.' +
                                              R +
                                              ' <' +
                                              (+x + 1) +
                                              '.0.0')),
                                    y('caret return', P),
                                    P
                                  )
                                })
                              })(v, g)
                            })
                            .join(' ')
                        })(v, g)),
                        y('caret', v),
                        (v = (function (v, g) {
                          return v
                            .trim()
                            .split(/\s+/)
                            .map(function (v) {
                              return (function (v, g) {
                                var x = g.loose ? R[ye] : R[ge]
                                return v.replace(x, function (g, x, E, R, _) {
                                  var P
                                  return (
                                    y('tilde', v, g, x, E, R, _),
                                    oe(x)
                                      ? (P = '')
                                      : oe(E)
                                      ? (P =
                                          '>=' +
                                          x +
                                          '.0.0 <' +
                                          (+x + 1) +
                                          '.0.0')
                                      : oe(R)
                                      ? (P =
                                          '>=' +
                                          x +
                                          '.' +
                                          E +
                                          '.0 <' +
                                          x +
                                          '.' +
                                          (+E + 1) +
                                          '.0')
                                      : _
                                      ? (y('replaceTilde pr', _),
                                        (P =
                                          '>=' +
                                          x +
                                          '.' +
                                          E +
                                          '.' +
                                          R +
                                          '-' +
                                          _ +
                                          ' <' +
                                          x +
                                          '.' +
                                          (+E + 1) +
                                          '.0'))
                                      : (P =
                                          '>=' +
                                          x +
                                          '.' +
                                          E +
                                          '.' +
                                          R +
                                          ' <' +
                                          x +
                                          '.' +
                                          (+E + 1) +
                                          '.0'),
                                    y('tilde return', P),
                                    P
                                  )
                                })
                              })(v, g)
                            })
                            .join(' ')
                        })(v, g)),
                        y('tildes', v),
                        (v = (function (v, g) {
                          return (
                            y('replaceXRanges', v, g),
                            v
                              .split(/\s+/)
                              .map(function (v) {
                                return (function (v, g) {
                                  v = v.trim()
                                  var x = g.loose ? R[fe] : R[he]
                                  return v.replace(
                                    x,
                                    function (g, x, E, R, _, P) {
                                      y('xRange', v, g, x, E, R, _, P)
                                      var k = oe(E),
                                        I = k || oe(R),
                                        A = I || oe(_),
                                        N = A
                                      return (
                                        '=' === x && N && (x = ''),
                                        k
                                          ? (g =
                                              '>' === x || '<' === x
                                                ? '<0.0.0'
                                                : '*')
                                          : x && N
                                          ? (I && (R = 0),
                                            (_ = 0),
                                            '>' === x
                                              ? ((x = '>='),
                                                I
                                                  ? ((E = +E + 1),
                                                    (R = 0),
                                                    (_ = 0))
                                                  : ((R = +R + 1), (_ = 0)))
                                              : '<=' === x &&
                                                ((x = '<'),
                                                I
                                                  ? (E = +E + 1)
                                                  : (R = +R + 1)),
                                            (g = x + E + '.' + R + '.' + _))
                                          : I
                                          ? (g =
                                              '>=' +
                                              E +
                                              '.0.0 <' +
                                              (+E + 1) +
                                              '.0.0')
                                          : A &&
                                            (g =
                                              '>=' +
                                              E +
                                              '.' +
                                              R +
                                              '.0 <' +
                                              E +
                                              '.' +
                                              (+R + 1) +
                                              '.0'),
                                        y('xRange return', g),
                                        g
                                      )
                                    }
                                  )
                                })(v, g)
                              })
                              .join(' ')
                          )
                        })(v, g)),
                        y('xrange', v),
                        (v = (function (v, g) {
                          return (
                            y('replaceStars', v, g), v.trim().replace(R[Ie], '')
                          )
                        })(v, g)),
                        y('stars', v),
                        v
                      )
                    })(v, this.options)
                  }, this)
                  .join(' ')
                  .split(/\s+/)
              return (
                this.options.loose &&
                  (_ = _.filter(function (v) {
                    return !!v.match(E)
                  })),
                (_ = _.map(function (v) {
                  return new ne(v, this.options)
                }, this)),
                _
              )
            }),
            (ae.prototype.intersects = function (v, g) {
              if (!(v instanceof ae)) throw new TypeError('a Range is required')
              return this.set.some(function (y) {
                return y.every(function (y) {
                  return v.set.some(function (v) {
                    return v.every(function (v) {
                      return y.intersects(v, g)
                    })
                  })
                })
              })
            }),
            (g.toComparators = function (v, g) {
              return new ae(v, g).set.map(function (v) {
                return v
                  .map(function (v) {
                    return v.value
                  })
                  .join(' ')
                  .trim()
                  .split(' ')
              })
            }),
            (ae.prototype.test = function (v) {
              if (!v) return !1
              'string' == typeof v && (v = new $(v, this.options))
              for (var g = 0; g < this.set.length; g++)
                if (le(this.set[g], v, this.options)) return !0
              return !1
            }),
            (g.satisfies = ce),
            (g.maxSatisfying = function (v, g, y) {
              var x = null,
                E = null
              try {
                var R = new ae(g, y)
              } catch (v) {
                return null
              }
              return (
                v.forEach(function (v) {
                  R.test(v) &&
                    ((x && -1 !== E.compare(v)) || ((x = v), (E = new $(x, y))))
                }),
                x
              )
            }),
            (g.minSatisfying = function (v, g, y) {
              var x = null,
                E = null
              try {
                var R = new ae(g, y)
              } catch (v) {
                return null
              }
              return (
                v.forEach(function (v) {
                  R.test(v) &&
                    ((x && 1 !== E.compare(v)) || ((x = v), (E = new $(x, y))))
                }),
                x
              )
            }),
            (g.minVersion = function (v, g) {
              v = new ae(v, g)
              var y = new $('0.0.0')
              if (v.test(y)) return y
              if (((y = new $('0.0.0-0')), v.test(y))) return y
              y = null
              for (var x = 0; x < v.set.length; ++x) {
                var E = v.set[x]
                E.forEach(function (v) {
                  var g = new $(v.semver.version)
                  switch (v.operator) {
                    case '>':
                      0 === g.prerelease.length
                        ? g.patch++
                        : g.prerelease.push(0),
                        (g.raw = g.format())
                    case '':
                    case '>=':
                      ;(y && !X(y, g)) || (y = g)
                      break
                    case '<':
                    case '<=':
                      break
                    default:
                      throw Error('Unexpected operation: ' + v.operator)
                  }
                })
              }
              return y && v.test(y) ? y : null
            }),
            (g.validRange = function (v, g) {
              try {
                return new ae(v, g).range || '*'
              } catch (v) {
                return null
              }
            }),
            (g.ltr = function (v, g, y) {
              return pe(v, g, '<', y)
            }),
            (g.gtr = function (v, g, y) {
              return pe(v, g, '>', y)
            }),
            (g.outside = pe),
            (g.prerelease = function (v, g) {
              var y = H(v, g)
              return y && y.prerelease.length ? y.prerelease : null
            }),
            (g.intersects = function (v, g, y) {
              return (v = new ae(v, y)), (g = new ae(g, y)), v.intersects(g)
            }),
            (g.coerce = function (v) {
              if (v instanceof $) return v
              if ('string' != typeof v) return null
              var g = v.match(R[de])
              return null == g
                ? null
                : H(g[1] + '.' + (g[2] || '0') + '.' + (g[3] || '0'))
            })
        },
        function (v, g, y) {
          var x = !0,
            E = -1,
            R = 0,
            _ = 1,
            P = 2,
            k = 3,
            I = 4,
            A = 5,
            N = 6,
            C = 7,
            O = 8,
            T = 9,
            L = 10,
            M = 11,
            D = 13,
            F = 0,
            j = []
          function b() {
            var v = j.pop()
            return (
              v || (v = { context: F, elements: null, element_array: null }), v
            )
          }
          function w(v) {
            j.push(v)
          }
          var V = []
          function S(v) {
            V.push(v)
          }
          var B = g
          ;(B.escape = function (v) {
            var g,
              y = ''
            if (!v) return v
            for (g = 0; g < v.length; g++)
              ('"' !== v[g] && '\\' !== v[g] && '`' !== v[g] && "'" !== v[g]) ||
                (y += '\\'),
                (y += v[g])
            return y
          }),
            (B.begin = function (v, g) {
              var y,
                j = { name: null, value_type: R, string: '', contains: null },
                B = { line: 1, col: 1 },
                G = 0,
                U = 0,
                W = !0,
                q = !1,
                z = null,
                K = void 0,
                he = [],
                fe = {
                  first: null,
                  last: null,
                  saved: null,
                  push(v) {
                    var g = this.saved
                    g
                      ? ((this.saved = g.next),
                        (g.node = v),
                        (g.next = null),
                        (g.prior = this.last))
                      : (g = { node: v, next: null, prior: this.last }),
                      this.last || (this.first = g),
                      (this.last = g)
                  },
                  pop() {
                    var v = this.last
                    return v
                      ? ((this.last = v.prior) || (this.first = null),
                        (v.next = this.saved),
                        (this.saved = v),
                        v.node)
                      : null
                  },
                },
                de = F,
                me = 0,
                ve = !1,
                ge = !1,
                ye = !1,
                xe = !1,
                be = !1,
                we = {
                  first: null,
                  last: null,
                  saved: null,
                  push(v) {
                    var g = this.saved
                    g
                      ? ((this.saved = g.next),
                        (g.node = v),
                        (g.next = null),
                        (g.prior = this.last))
                      : (g = { node: v, next: null, prior: this.last }),
                      this.last || (this.first = g),
                      (this.last = g)
                  },
                  shift() {
                    var v = this.first
                    return v
                      ? ((this.first = v.next) || (this.last = null),
                        (v.next = this.saved),
                        (this.saved = v),
                        v.node)
                      : null
                  },
                  unshift(v) {
                    var g = this.saved
                    g
                      ? ((this.saved = g.next),
                        (g.node = v),
                        (g.next = this.first),
                        (g.prior = null))
                      : (g = { node: v, next: this.first, prior: null }),
                      this.first || (this.last = g),
                      (this.first = g)
                  },
                },
                Ee = null,
                Se = !1,
                Re = !1,
                _e = !1,
                Pe = !1,
                ke = !1,
                Ie = !1,
                Ae = !1,
                Oe = 0,
                Te = 0,
                Me = !1,
                De = !1
              return {
                value() {
                  var v = z
                  return (z = void 0), v
                },
                reset() {
                  ;(U = 0),
                    (W = !0),
                    we.last && (we.last.next = we.save),
                    (we.save = we.first),
                    (we.first = we.last = null),
                    fe.last && (fe.last.next = fe.save),
                    (fe.save = we.first),
                    (fe.first = fe.last = null),
                    (he = null),
                    (K = void 0),
                    (de = F),
                    (j.value_type = R),
                    (j.name = null),
                    (j.string = ''),
                    (B.line = 1),
                    (B.col = 1),
                    (q = !1),
                    (me = 0),
                    (De = !1),
                    (Se = !1),
                    (_e = !1),
                    (Pe = !1)
                },
                write(y) {
                  var x
                  for (
                    'string' != typeof y && (y += ''), x = this._write(y, !1);
                    x > 0 &&
                    (z &&
                      ('function' == typeof g &&
                        (function e(v, y) {
                          var x,
                            E,
                            R = v[y]
                          if (R && 'object' == typeof R)
                            for (x in R)
                              Object.prototype.hasOwnProperty.call(R, x) &&
                                ((E = e(R, x)),
                                void 0 !== E ? (R[x] = E) : delete R[x])
                          return g.call(v, y, R)
                        })({ '': z }, ''),
                      v(z),
                      (z = void 0)),
                    !(x < 2));
                    x = this._write()
                  );
                },
                _write(v, g) {
                  var Fe,
                    je,
                    Ve,
                    Be = 0
                  function ie(v, g) {
                    throw Error(
                      `${v} '${String.fromCodePoint(
                        g
                      )}' unexpected at ${G} (near '${Ve.substr(
                        G > 4 ? G - 4 : 0,
                        G > 4 ? 3 : G - 1
                      )}[${String.fromCodePoint(g)}]${Ve.substr(G, 10)}') [${
                        B.line
                      }:${B.col}]`
                    )
                  }
                  function ne() {
                    ;(j.value_type = R), (j.string = '')
                  }
                  function se(v) {
                    return v.length > 1 &&
                      !ve &&
                      !ge &&
                      !ye &&
                      48 === v.charCodeAt(0)
                      ? (q ? -1 : 1) * +('0o' + v)
                      : (q ? -1 : 1) * +v
                  }
                  function ae() {
                    switch (j.value_type) {
                      case A:
                        he.push(x ? se(j.string) : (q ? -1 : 1) * +j.string)
                        break
                      case I:
                        he.push(j.string)
                        break
                      case P:
                        he.push(!0)
                        break
                      case k:
                        he.push(!1)
                        break
                      case O:
                      case T:
                        he.push(NaN)
                        break
                      case L:
                        he.push(-1 / 0)
                        break
                      case M:
                        he.push(1 / 0)
                        break
                      case _:
                        he.push(null)
                        break
                      case E:
                        he.push(void 0)
                        break
                      case D:
                        he.push(void 0), delete he[he.length - 1]
                        break
                      case N:
                      case C:
                        he.push(j.contains)
                    }
                  }
                  function oe() {
                    switch (j.value_type) {
                      case A:
                        K[j.name] = x ? se(j.string) : (q ? -1 : 1) * +j.string
                        break
                      case I:
                        K[j.name] = j.string
                        break
                      case P:
                        K[j.name] = !0
                        break
                      case k:
                        K[j.name] = !1
                        break
                      case O:
                      case T:
                        K[j.name] = NaN
                        break
                      case L:
                        K[j.name] = -1 / 0
                        break
                      case M:
                        K[j.name] = 1 / 0
                        break
                      case _:
                        K[j.name] = null
                        break
                      case E:
                        K[j.name] = void 0
                        break
                      case N:
                      case C:
                        K[j.name] = j.contains
                    }
                  }
                  function ue(v) {
                    for (var g = 0; 0 === g && G < Ve.length; ) {
                      y = Ve.charAt(G)
                      var x = Ve.codePointAt(G++)
                      if (
                        (x >= 65536 && ((y += Ve.charAt(G)), G++),
                        B.col++,
                        x === v)
                      )
                        _e
                          ? ((j.string += y), (_e = !1))
                          : ((g = -1),
                            Me
                              ? ie('Incomplete Octal sequence', x)
                              : Ae
                              ? ie('Incomplete hexidecimal sequence', x)
                              : Ie
                              ? ie('Incomplete unicode sequence', x)
                              : ke && ie('Incomplete long unicode sequence', x),
                            (g = 1))
                      else if (_e) {
                        if (Me) {
                          if (Te < 3 && x >= 48 && x <= 57) {
                            if (((Oe *= 8), (Oe += x - 48), Te++, 3 === Te)) {
                              ;(j.string += String.fromCodePoint(Oe)),
                                (Me = !1),
                                (_e = !1)
                              continue
                            }
                            continue
                          }
                          if (Oe > 255) {
                            ie(
                              '(escaped character, parsing octal escape val=%d) fault while parsing',
                              x
                            ),
                              (g = -1)
                            break
                          }
                          ;(j.string += String.fromCodePoint(Oe)),
                            (Me = !1),
                            (_e = !1)
                          continue
                        }
                        if (ke) {
                          if (125 === x) {
                            ;(j.string += String.fromCodePoint(Oe)),
                              (ke = !1),
                              (Ie = !1),
                              (_e = !1)
                            continue
                          }
                          if (((Oe *= 16), x >= 48 && x <= 57)) Oe += x - 48
                          else if (x >= 65 && x <= 70) Oe += x - 65 + 10
                          else {
                            if (!(x >= 97 && x <= 102)) {
                              ie('(escaped character, parsing hex of \\u)', x),
                                (g = -1),
                                (ke = !1),
                                (_e = !1)
                              continue
                            }
                            Oe += x - 97 + 10
                          }
                          continue
                        }
                        if (Ae || Ie) {
                          if (0 === Te && 123 === x) {
                            ke = !0
                            continue
                          }
                          if (Te < 2 || (Ie && Te < 4)) {
                            if (((Oe *= 16), x >= 48 && x <= 57)) Oe += x - 48
                            else if (x >= 65 && x <= 70) Oe += x - 65 + 10
                            else {
                              if (!(x >= 97 && x <= 102)) {
                                ie(
                                  Ie
                                    ? '(escaped character, parsing hex of \\u)'
                                    : '(escaped character, parsing hex of \\x)',
                                  x
                                ),
                                  (g = -1),
                                  (Ae = !1),
                                  (_e = !1)
                                continue
                              }
                              Oe += x - 97 + 10
                            }
                            Te++,
                              Ie
                                ? 4 === Te &&
                                  ((j.string += String.fromCodePoint(Oe)),
                                  (Ie = !1),
                                  (_e = !1))
                                : 2 === Te &&
                                  ((j.string += String.fromCodePoint(Oe)),
                                  (Ae = !1),
                                  (_e = !1))
                            continue
                          }
                        }
                        switch (x) {
                          case 13:
                            ;(Pe = !0), (B.col = 1)
                            continue
                          case 10:
                          case 2028:
                          case 2029:
                            B.line++
                            break
                          case 116:
                            j.string += '\t'
                            break
                          case 98:
                            j.string += '\b'
                            break
                          case 110:
                            j.string += '\n'
                            break
                          case 114:
                            j.string += '\r'
                            break
                          case 102:
                            j.string += '\f'
                            break
                          case 48:
                          case 49:
                          case 50:
                          case 51:
                            ;(Me = !0), (Oe = x - 48), (Te = 1)
                            continue
                          case 120:
                            ;(Ae = !0), (Te = 0), (Oe = 0)
                            continue
                          case 117:
                            ;(Ie = !0), (Te = 0), (Oe = 0)
                            continue
                          default:
                            j.string += y
                        }
                        _e = !1
                      } else if (92 === x)
                        _e ? ((j.string += '\\'), (_e = !1)) : (_e = !0)
                      else {
                        if (Pe) {
                          if (((Pe = !1), 10 === x)) {
                            B.line++, (B.col = 1), (_e = !1)
                            continue
                          }
                          B.line++, (B.col = 1)
                          continue
                        }
                        j.string += y
                      }
                    }
                    return g
                  }
                  function le() {
                    for (var v; (v = G) < Ve.length; ) {
                      y = Ve.charAt(v)
                      var x = Ve.codePointAt(G++)
                      if (
                        (x >= 65536 &&
                          (ie('fault while parsing number;', x),
                          (y += Ve.charAt(G)),
                          G++),
                        95 !== x)
                      )
                        if ((B.col++, x >= 48 && x <= 57))
                          ye && (be = !0), (j.string += y)
                        else if (45 === x || 43 === x) {
                          if (0 !== j.string.length && (!ye || xe || be)) {
                            ;(W = !1), ie('fault while parsing number;', x)
                            break
                          }
                          ;(j.string += y), (xe = !0)
                        } else if (46 === x) {
                          if (ge || ve || ye) {
                            ;(W = !1), ie('fault while parsing number;', x)
                            break
                          }
                          ;(j.string += y), (ge = !0)
                        } else if (
                          120 === x ||
                          98 === x ||
                          111 === x ||
                          88 === x ||
                          66 === x ||
                          79 === x
                        ) {
                          if (ve || '0' !== j.string) {
                            ;(W = !1), ie('fault while parsing number;', x)
                            break
                          }
                          ;(ve = !0), (j.string += y)
                        } else {
                          if (101 !== x && 69 !== x) {
                            if (
                              32 === x ||
                              13 === x ||
                              10 === x ||
                              9 === x ||
                              65279 === x ||
                              44 === x ||
                              125 === x ||
                              93 === x ||
                              58 === x
                            )
                              break
                            g &&
                              ((W = !1), ie('fault while parsing number;', x))
                            break
                          }
                          if (ye) {
                            ;(W = !1), ie('fault while parsing number;', x)
                            break
                          }
                          ;(j.string += y), (ye = !0)
                        }
                    }
                    ;(G = v),
                      g || G !== Ve.length
                        ? ((Re = !1), (j.value_type = A), de === F && (De = !0))
                        : (Re = !0)
                  }
                  if (!W) return -1
                  for (
                    v && v.length
                      ? ((je = (function () {
                          var v = V.pop()
                          return v ? (v.n = 0) : (v = { buf: null, n: 0 }), v
                        })()),
                        (je.buf = v),
                        we.push(je))
                      : Re &&
                        ((Re = !1),
                        (j.value_type = A),
                        de === F && (De = !0),
                        (Be = 1));
                    W && (je = we.shift());

                  ) {
                    if (((G = je.n), (Ve = je.buf), Se)) {
                      var Ge = ue(Ee)
                      Ge < 0
                        ? (W = !1)
                        : Ge > 0 && ((Se = !1), W && (j.value_type = I))
                    }
                    for (Re && le(); !De && W && G < Ve.length; ) {
                      if (
                        ((y = Ve.charAt(G)),
                        (Fe = Ve.codePointAt(G++)),
                        Fe >= 65536 && ((y += Ve.charAt(G)), G++),
                        B.col++,
                        me)
                      ) {
                        if (1 === me) {
                          if (42 === Fe) {
                            me = 3
                            continue
                          }
                          47 !== Fe
                            ? (ie('fault while parsing;', Fe), (W = !1))
                            : (me = 2)
                          continue
                        }
                        if (2 === me) {
                          if (10 === Fe) {
                            me = 0
                            continue
                          }
                          continue
                        }
                        if (3 === me) {
                          if (42 === Fe) {
                            me = 4
                            continue
                          }
                          continue
                        }
                        if (4 === me) {
                          if (47 === Fe) {
                            me = 0
                            continue
                          }
                          42 !== Fe && (me = 3)
                          continue
                        }
                      }
                      switch (Fe) {
                        case 47:
                          me || (me = 1)
                          break
                        case 123:
                          if (29 === U || 30 === U || (3 === de && 0 === U)) {
                            ie(
                              'fault while parsing; getting field name unexpected ',
                              Fe
                            ),
                              (W = !1)
                            break
                          }
                          var Ue = b()
                          j.value_type = N
                          var We = {}
                          de === F
                            ? (z = K = We)
                            : 4 === de && (K[j.name] = We),
                            (Ue.context = de),
                            (Ue.elements = K),
                            (Ue.element_array = he),
                            (Ue.name = j.name),
                            (K = We),
                            fe.push(Ue),
                            ne(),
                            (de = 3)
                          break
                        case 91:
                          if (3 === de || 29 === U || 30 === U) {
                            ie(
                              'Fault while parsing; while getting field name unexpected',
                              Fe
                            ),
                              (W = !1)
                            break
                          }
                          var qe = b()
                          j.value_type = C
                          var ze = []
                          de === F
                            ? (z = he = ze)
                            : 4 === de && (K[j.name] = ze),
                            (qe.context = de),
                            (qe.elements = K),
                            (qe.element_array = he),
                            (qe.name = j.name),
                            (he = ze),
                            fe.push(qe),
                            ne(),
                            (de = 1)
                          break
                        case 58:
                          if (3 === de) {
                            if (0 !== U && 29 !== U && 30 !== U) {
                              ;(W = FALSE),
                                thorwError(
                                  `fault while parsing; unquoted keyword used as object field name (state:${U})`,
                                  Fe
                                )
                              break
                            }
                            ;(U = 0),
                              (j.name = j.string),
                              (j.string = ''),
                              (de = 4),
                              (j.value_type = R)
                          } else
                            ie(
                              1 === de
                                ? '(in array, got colon out of string):parsing fault;'
                                : '(outside any object, got colon out of string):parsing fault;',
                              Fe
                            ),
                              (W = !1)
                          break
                        case 125:
                          if ((31 === U && (U = 0), 3 === de)) {
                            ne()
                            var He = fe.pop()
                            ;(de = He.context),
                              (K = He.elements),
                              (he = He.element_array),
                              w(He),
                              de === F && (De = !0)
                          } else if (4 === de) {
                            j.value_type !== R && oe(),
                              (j.value_type = N),
                              (j.contains = K)
                            var Ye = fe.pop()
                            ;(j.name = Ye.name),
                              (de = Ye.context),
                              (K = Ye.elements),
                              (he = Ye.element_array),
                              w(Ye),
                              de === F && (De = !0)
                          } else
                            ie('Fault while parsing; unexpected', Fe), (W = !1)
                          q = !1
                          break
                        case 93:
                          31 === U && (U = 0),
                            1 === de
                              ? (j.value_type !== R && ae(),
                                (j.value_type = C),
                                (j.contains = he),
                                (Ye = fe.pop()),
                                (j.name = Ye.name),
                                (de = Ye.context),
                                (K = Ye.elements),
                                (he = Ye.element_array),
                                w(Ye),
                                de === F && (De = !0))
                              : (ie(
                                  `bad context ${de}; fault while parsing`,
                                  Fe
                                ),
                                (W = !1)),
                            (q = !1)
                          break
                        case 44:
                          31 === U && (U = 0),
                            1 === de
                              ? (j.value_type === R && (j.value_type = D),
                                j.value_type !== R && (ae(), ne()))
                              : 4 === de
                              ? ((de = 3), j.value_type !== R && (oe(), ne()))
                              : ((W = !1),
                                ie(
                                  'bad context; excessive commas while parsing;',
                                  Fe
                                )),
                            (q = !1)
                          break
                        default:
                          if (3 === de)
                            switch (Fe) {
                              case 96:
                              case 34:
                              case 39:
                                if (0 === U) {
                                  var Xe = ue(Fe)
                                  Xe
                                    ? (j.value_type = I)
                                    : ((Ee = Fe), (Se = !0))
                                } else
                                  ie(
                                    'fault while parsing; quote not at start of field name',
                                    Fe
                                  )
                                break
                              case 10:
                                B.line++, (B.col = 1)
                              case 13:
                              case 32:
                              case 9:
                              case 65279:
                                if (31 === U) {
                                  ;(U = 0), de === F && (De = !0)
                                  break
                                }
                                if (0 === U || 30 === U) break
                                29 === U
                                  ? (U = 30)
                                  : ((W = !1),
                                    ie(
                                      'fault while parsing; whitepsace unexpected',
                                      Fe
                                    ))
                                break
                              default:
                                30 === U &&
                                  ((W = !1),
                                  ie(
                                    'fault while parsing; character unexpected',
                                    Fe
                                  )),
                                  0 === U && (U = 29),
                                  (j.string += y)
                            }
                          else
                            switch (Fe) {
                              case 96:
                              case 34:
                              case 39:
                                var Ze = ue(Fe)
                                Ze
                                  ? ((j.value_type = I), (U = 31))
                                  : ((Ee = Fe), (Se = !0))
                                break
                              case 10:
                                B.line++, (B.col = 1)
                              case 32:
                              case 9:
                              case 13:
                              case 65279:
                                if (31 === U) {
                                  ;(U = 0), de === F && (De = !0)
                                  break
                                }
                                if (0 === U) break
                                29 === U
                                  ? (U = 30)
                                  : ((W = !1),
                                    ie('fault parsing whitespace', Fe))
                                break
                              case 116:
                                0 === U
                                  ? (U = 1)
                                  : 27 === U
                                  ? (U = 28)
                                  : ((W = !1), ie('fault parsing', Fe))
                                break
                              case 114:
                                1 === U
                                  ? (U = 2)
                                  : ((W = !1), ie('fault parsing', Fe))
                                break
                              case 117:
                                2 === U
                                  ? (U = 3)
                                  : 9 === U
                                  ? (U = 10)
                                  : 0 === U
                                  ? (U = 12)
                                  : ((W = !1), ie('fault parsing', Fe))
                                break
                              case 101:
                                3 === U
                                  ? ((j.value_type = P), (U = 31))
                                  : 8 === U
                                  ? ((j.value_type = k), (U = 31))
                                  : 14 === U
                                  ? (U = 15)
                                  : 18 === U
                                  ? (U = 19)
                                  : ((W = !1), ie('fault parsing', Fe))
                                break
                              case 110:
                                0 === U
                                  ? (U = 9)
                                  : 12 === U
                                  ? (U = 13)
                                  : 17 === U
                                  ? (U = 18)
                                  : 22 === U
                                  ? (U = 23)
                                  : 25 === U
                                  ? (U = 26)
                                  : ((W = !1), ie('fault parsing', Fe))
                                break
                              case 100:
                                13 === U
                                  ? (U = 14)
                                  : 19 === U
                                  ? ((j.value_type = E), (U = 31))
                                  : ((W = !1), ie('fault parsing', Fe))
                                break
                              case 105:
                                16 === U
                                  ? (U = 17)
                                  : 24 === U
                                  ? (U = 25)
                                  : 26 === U
                                  ? (U = 27)
                                  : ((W = !1), ie('fault parsing', Fe))
                                break
                              case 108:
                                10 === U
                                  ? (U = 11)
                                  : 11 === U
                                  ? ((j.value_type = _), (U = 31))
                                  : 6 === U
                                  ? (U = 7)
                                  : ((W = !1), ie('fault parsing', Fe))
                                break
                              case 102:
                                0 === U
                                  ? (U = 5)
                                  : 15 === U
                                  ? (U = 16)
                                  : 23 === U
                                  ? (U = 24)
                                  : ((W = !1), ie('fault parsing', Fe))
                                break
                              case 97:
                                5 === U
                                  ? (U = 6)
                                  : 20 === U
                                  ? (U = 21)
                                  : ((W = !1), ie('fault parsing', Fe))
                                break
                              case 115:
                                7 === U
                                  ? (U = 8)
                                  : ((W = !1), ie('fault parsing', Fe))
                                break
                              case 73:
                                0 === U
                                  ? (U = 22)
                                  : ((W = !1), ie('fault parsing', Fe))
                                break
                              case 78:
                                0 === U
                                  ? (U = 20)
                                  : 21 === U
                                  ? ((j.value_type = q ? O : T), (U = 31))
                                  : ((W = !1), ie('fault parsing', Fe))
                                break
                              case 121:
                                28 === U
                                  ? ((j.value_type = q ? L : M), (U = 31))
                                  : ((W = !1), ie('fault parsing', Fe))
                                break
                              case 45:
                                0 === U
                                  ? (q = !q)
                                  : ((W = !1), ie('fault parsing', Fe))
                                break
                              default:
                                ;(Fe >= 48 && Fe <= 57) ||
                                43 === Fe ||
                                46 === Fe ||
                                45 === Fe
                                  ? ((ve = !1),
                                    (ye = !1),
                                    (xe = !1),
                                    (be = !1),
                                    (ge = !1),
                                    (j.string = y),
                                    (je.n = G),
                                    le())
                                  : ((W = !1), ie('fault parsing', Fe))
                            }
                      }
                      if (De) {
                        31 === U && (U = 0)
                        break
                      }
                    }
                    if (
                      (G === Ve.length
                        ? (S(je),
                          Se || Re || 3 === de
                            ? (Be = 0)
                            : de !== F ||
                              (j.value_type === R && !z) ||
                              ((De = !0), (Be = 1)))
                        : ((je.n = G), we.unshift(je), (Be = 2)),
                      De)
                    )
                      break
                  }
                  if (!W) return -1
                  if (De && j.value_type !== R) {
                    switch (j.value_type) {
                      case A:
                        z = x ? se(j.string) : (q ? -1 : 1) * +j.string
                        break
                      case I:
                        z = j.string
                        break
                      case P:
                        z = !0
                        break
                      case k:
                        z = !1
                        break
                      case _:
                        z = null
                        break
                      case E:
                        z = void 0
                        break
                      case T:
                      case O:
                        z = NaN
                        break
                      case M:
                        z = 1 / 0
                        break
                      case L:
                        z = -1 / 0
                        break
                      case N:
                      case C:
                        z = j.contains
                    }
                    ;(q = !1), (j.string = ''), (j.value_type = R)
                  }
                  return (De = !1), Be
                },
              }
            })
          var G = [Object.freeze(B.begin())],
            U = 0
          B.parse = function (v, g) {
            var y,
              x = U++
            if (
              (G.length <= x && G.push(Object.freeze(B.begin())),
              (y = G[x]),
              'string' != typeof v && (v += ''),
              y.reset(),
              y._write(v, !0) > 0)
            ) {
              var E = y.value()
              return (
                'function' == typeof g &&
                  (function e(v, y) {
                    var x,
                      E,
                      R = v[y]
                    if (R && 'object' == typeof R)
                      for (x in R)
                        Object.prototype.hasOwnProperty.call(R, x) &&
                          ((E = e(R, x)),
                          void 0 !== E ? (R[x] = E) : delete R[x])
                    return g.call(v, y, R)
                  })({ '': E }, ''),
                U--,
                E
              )
            }
          }
        },
        function (v, g, y) {
          var a = function (v) {
              return v + '‍'
            },
            P = Object.prototype.__defineGetter__,
            u = function (v, g, y) {
              return P.call(v, g, y), v
            },
            k = Object.prototype.__defineSetter__,
            c = function (v, g, y) {
              return k.call(v, g, y), v
            },
            I = {
              configurable: !0,
              enumerable: !0,
              value: void 0,
              writable: !0,
            },
            A = [],
            f = function (v, g, y) {
              return (
                u(v, g, function () {
                  return (
                    (this[g] = void 0), (this[g] = Reflect.apply(y, this, A))
                  )
                }),
                c(v, g, function (v) {
                  ;(I.value = v), Reflect.defineProperty(this, g, I)
                }),
                v
              )
            },
            N = ['index.js', 'esm.js', 'esm/loader.js'],
            C = {
              PACKAGE_DIRNAME: null,
              PACKAGE_FILENAMES: null,
              PACKAGE_PREFIX: a('esm'),
              PACKAGE_RANGE: '3.2.25',
              PACKAGE_VERSION: '3.2.25',
              STACK_TRACE_LIMIT: 30,
            },
            O = E,
            T = O.filename,
            L = O.parent,
            M = null != L && L.filename
          f(C, 'PACKAGE_DIRNAME', function () {
            var v = x.module.safePath
            return v.dirname(T)
          }),
            f(C, 'PACKAGE_FILENAMES', function () {
              for (
                var v = x.module.safePath,
                  g = v.sep,
                  y = this.PACKAGE_DIRNAME,
                  E = N.length;
                E--;

              )
                N[E] = y + g + N[E]
              return N
            }),
            f(C, 'PACKAGE_PARENT_NAME', function () {
              var v = x.module.safePath,
                g = v.sep,
                y =
                  'string' == typeof M
                    ? M.lastIndexOf(g + 'node_modules' + g)
                    : -1
              if (-1 === y) return ''
              var E = y + 14,
                R = M.indexOf(g, E)
              return -1 === R ? '' : M.slice(E, R)
            })
          var D = C,
            F = D.PACKAGE_PREFIX,
            j = D.PACKAGE_VERSION,
            V = Symbol.for(F + '@' + j + ':shared'),
            B = (function () {
              if (void 0 !== x) return (x.reloaded = !1), x
              try {
                return (x = require(V)), (x.reloaded = !0), x
              } catch (v) {}
              return (
                (v = Function.prototype.toString),
                (g = new Proxy(class {}, { [F]: 1 })),
                (y = {
                  wasm: 'object' == typeof WebAssembly && null !== WebAssembly,
                }),
                (E = {
                  _compile: Symbol.for(F + ':module._compile'),
                  entry: Symbol.for(F + ':entry'),
                  mjs: Symbol.for(F + ':Module._extensions[".mjs"]'),
                  namespace: Symbol.for(F + ':namespace'),
                  package: Symbol.for(F + ':package'),
                  proxy: Symbol.for(F + ':proxy'),
                  realGetProxyDetails: Symbol.for(F + ':realGetProxyDetails'),
                  realRequire: Symbol.for(F + ':realRequire'),
                  runtime: Symbol.for(F + ':runtime'),
                  shared: V,
                  wrapper: Symbol.for(F + ':wrapper'),
                }),
                (_ = {}),
                (P = {
                  bridged: new Map(),
                  customInspectKey: void 0,
                  defaultInspectOptions: void 0,
                  entry: { cache: new WeakMap() },
                  external: R,
                  inited: !1,
                  loader: new Map(),
                  memoize: {
                    builtinEntries: new Map(),
                    builtinModules: new Map(),
                    fsRealpath: new Map(),
                    moduleESMResolveFilename: new Map(),
                    moduleInternalFindPath: new Map(),
                    moduleInternalReadPackage: new Map(),
                    moduleStaticResolveFilename: new Map(),
                    shimFunctionPrototypeToString: new WeakMap(),
                    shimProcessBindingUtilGetProxyDetails: new Map(),
                    shimPuppeteerExecutionContextPrototypeEvaluateHandle:
                      new WeakMap(),
                    utilGetProxyDetails: new WeakMap(),
                    utilMaskFunction: new WeakMap(),
                    utilMaxSatisfying: new Map(),
                    utilParseURL: new Map(),
                    utilProxyExports: new WeakMap(),
                    utilSatisfies: new Map(),
                    utilUnwrapOwnProxy: new WeakMap(),
                    utilUnwrapProxy: new WeakMap(),
                  },
                  module: {},
                  moduleState: {
                    instantiating: !1,
                    parsing: !1,
                    requireDepth: 0,
                    statFast: null,
                    statSync: null,
                  },
                  package: { dir: new Map(), root: new Map() },
                  pendingScripts: new Map(),
                  pendingWrites: new Map(),
                  realpathNativeSync: void 0,
                  reloaded: !1,
                  safeGlobal: __global__,
                  support: y,
                  symbol: E,
                  unsafeGlobal: global,
                  utilBinding: _,
                }),
                f(P, 'circularErrorMessage', function () {
                  try {
                    var v = {}
                    ;(v.a = v), JSON.stringify(v)
                  } catch (v) {
                    var g = v.message
                    return g
                  }
                }),
                f(P, 'defaultGlobal', function () {
                  var v = P.module.safeVM
                  return new v.Script('this').runInThisContext()
                }),
                f(P, 'originalConsole', function () {
                  var v = P.module,
                    g = v.safeInspector,
                    y = v.safeVM,
                    x = v.utilGet,
                    E = x(g, 'console')
                  return 'function' == typeof E
                    ? E
                    : new y.Script('console').runInNewContext()
                }),
                f(P, 'proxyNativeSourceText', function () {
                  try {
                    return v.call(g)
                  } catch (v) {}
                  return ''
                }),
                f(P, 'runtimeName', function () {
                  var v = P.module.safeCrypto
                  return a(
                    '_' +
                      v
                        .createHash('md5')
                        .update('' + Date.now())
                        .digest('hex')
                        .slice(0, 3)
                  )
                }),
                f(P, 'unsafeContext', function () {
                  var v = P.module,
                    g = v.safeVM,
                    y = v.utilPrepareContext
                  return y(g.createContext(P.unsafeGlobal))
                }),
                f(y, 'await', function () {
                  var v = P.module.safeVM
                  try {
                    return (
                      new v.Script('async()=>await 1').runInThisContext(), !0
                    )
                  } catch (v) {}
                  return !1
                }),
                f(y, 'consoleOptions', function () {
                  var v = P.module,
                    g = v.safeProcess,
                    y = v.utilSatisfies
                  return y(g.version, '>=10')
                }),
                f(y, 'createCachedData', function () {
                  var v = P.module.safeVM
                  return (
                    'function' == typeof v.Script.prototype.createCachedData
                  )
                }),
                f(y, 'inspectProxies', function () {
                  var v = P.module.safeUtil,
                    y = v.inspect(g, { depth: 1, showProxy: !0 })
                  return -1 !== y.indexOf('Proxy [') && -1 !== y.indexOf(F)
                }),
                f(y, 'lookupShadowed', function () {
                  var v = { __proto__: { get a() {}, set a(v) {} }, a: 1 }
                  return (
                    void 0 === v.__lookupGetter__('a') &&
                    void 0 === v.__lookupSetter__('a')
                  )
                }),
                f(y, 'nativeProxyReceiver', function () {
                  var v = P.module,
                    g = v.SafeBuffer,
                    y = v.utilGet,
                    x = v.utilToString
                  try {
                    var E = new Proxy(g.alloc(0), {
                      get: function (v, g) {
                        return v[g]
                      },
                    })
                    return 'string' == typeof ('' + E)
                  } catch (v) {
                    return !/Illegal/.test(x(y(v, 'message')))
                  }
                }),
                f(y, 'realpathNative', function () {
                  var v = P.module,
                    g = v.safeProcess,
                    y = v.utilSatisfies
                  return y(g.version, '>=9.2')
                }),
                f(y, 'replShowProxy', function () {
                  var v = P.module,
                    g = v.safeProcess,
                    y = v.utilSatisfies
                  return y(g.version, '>=10')
                }),
                f(y, 'vmCompileFunction', function () {
                  var v = P.module,
                    g = v.safeProcess,
                    y = v.utilSatisfies
                  return y(g.version, '>=10.10')
                }),
                f(_, 'errorDecoratedSymbol', function () {
                  var v = P.module,
                    g = v.binding,
                    y = v.safeProcess,
                    x = v.utilSatisfies
                  return x(y.version, '<7')
                    ? 'node:decorated'
                    : g.util.decorated_private_symbol
                }),
                f(_, 'hiddenKeyType', function () {
                  return typeof _.errorDecoratedSymbol
                }),
                (x = P)
              )
              var v, g, y, E, _, P
            })(),
            G = B.inited
              ? B.module.utilUnapply
              : (B.module.utilUnapply = (function () {
                  return function (v) {
                    return function (g, ...y) {
                      return Reflect.apply(v, g, y)
                    }
                  }
                })()),
            U = B.inited
              ? B.module.GenericFunction
              : (B.module.GenericFunction = (function () {
                  return { bind: G(Function.prototype.bind) }
                })()),
            W = B.inited
              ? B.module.realRequire
              : (B.module.realRequire = (function () {
                  try {
                    var v = require(B.symbol.realRequire)
                    if ('function' == typeof v) return v
                  } catch (v) {}
                  return require
                })()),
            q = B.inited
              ? B.module.realProcess
              : (B.module.realProcess = W('process')),
            z = B.inited
              ? B.module.utilIsObjectLike
              : (B.module.utilIsObjectLike = (function () {
                  return function (v) {
                    var g = typeof v
                    return 'function' === g || ('object' === g && null !== v)
                  }
                })()),
            K = B.inited
              ? B.module.utilSetProperty
              : (B.module.utilSetProperty = (function () {
                  var v = {
                    configurable: !0,
                    enumerable: !0,
                    value: void 0,
                    writable: !0,
                  }
                  return function (g, y, x) {
                    return (
                      !!z(g) && ((v.value = x), Reflect.defineProperty(g, y, v))
                    )
                  }
                })()),
            he = B.inited
              ? B.module.utilSilent
              : (B.module.utilSilent = (function () {
                  return function (v) {
                    var g = Reflect.getOwnPropertyDescriptor(q, 'noDeprecation')
                    K(q, 'noDeprecation', !0)
                    try {
                      return v()
                    } finally {
                      void 0 === g
                        ? Reflect.deleteProperty(q, 'noDeprecation')
                        : Reflect.defineProperty(q, 'noDeprecation', g)
                    }
                  }
                })()),
            fe = B.inited
              ? B.module.utilGetSilent
              : (B.module.utilGetSilent = (function () {
                  return function (v, g) {
                    var y = he(function () {
                      try {
                        return v[g]
                      } catch (v) {}
                    })
                    return 'function' != typeof y
                      ? y
                      : function (...v) {
                          var g = this
                          return he(function () {
                            return Reflect.apply(y, g, v)
                          })
                        }
                  }
                })()),
            de = B.inited
              ? B.module.utilKeys
              : (B.module.utilKeys = (function () {
                  return function (v) {
                    return z(v) ? Object.keys(v) : []
                  }
                })()),
            me = B.inited
              ? B.module.utilHas
              : (B.module.utilHas = (function () {
                  var v = Object.prototype.hasOwnProperty
                  return function (g, y) {
                    return null != g && v.call(g, y)
                  }
                })()),
            ve = B.inited
              ? B.module.utilNoop
              : (B.module.utilNoop = (function () {
                  return function () {}
                })()),
            ge = B.inited
              ? B.module.utilIsObject
              : (B.module.utilIsObject = (function () {
                  return function (v) {
                    return 'object' == typeof v && null !== v
                  }
                })()),
            ye = B.inited
              ? B.module.utilOwnKeys
              : (B.module.utilOwnKeys = (function () {
                  return function (v) {
                    return z(v) ? Reflect.ownKeys(v) : []
                  }
                })()),
            xe = B.inited
              ? B.module.utilIsDataPropertyDescriptor
              : (B.module.utilIsDataPropertyDescriptor = (function () {
                  return function (v) {
                    return (
                      ge(v) &&
                      !0 === v.configurable &&
                      !0 === v.enumerable &&
                      !0 === v.writable &&
                      me(v, 'value')
                    )
                  }
                })()),
            be = B.inited
              ? B.module.utilSafeCopyProperty
              : (B.module.utilSafeCopyProperty = (function () {
                  return function (v, g, y) {
                    if (!z(v) || !z(g)) return v
                    var x = Reflect.getOwnPropertyDescriptor(g, y)
                    if (void 0 !== x) {
                      if (me(x, 'value')) {
                        var E = x.value
                        Array.isArray(E) && (x.value = Array.from(E))
                      }
                      xe(x)
                        ? (v[y] = x.value)
                        : ((x.configurable = !0),
                          me(x, 'writable') && (x.writable = !0),
                          Reflect.defineProperty(v, y, x))
                    }
                    return v
                  }
                })()),
            we = B.inited
              ? B.module.utilSafeAssignProperties
              : (B.module.utilSafeAssignProperties = (function () {
                  return function (v) {
                    for (var g = arguments.length, y = 0; ++y < g; )
                      for (
                        var x = arguments[y],
                          E = ye(x),
                          R = 0,
                          _ = null == E ? 0 : E.length;
                        R < _;
                        R++
                      ) {
                        var P = E[R]
                        be(v, x, P)
                      }
                    return v
                  }
                })()),
            Ee = B.inited
              ? B.module.utilSetPrototypeOf
              : (B.module.utilSetPrototypeOf = (function () {
                  return function (v, g) {
                    return z(v) && Reflect.setPrototypeOf(v, z(g) ? g : null)
                  }
                })()),
            Se = B.inited
              ? B.module.utilSafe
              : (B.module.utilSafe = (function () {
                  return function (v) {
                    if ('function' != typeof v)
                      return Array.isArray(v)
                        ? Array.from(v)
                        : ge(v)
                        ? we({}, v)
                        : v
                    for (
                      var g = v,
                        r = function (...v) {
                          var y = Reflect.construct(g, v)
                          return Ee(y, _), y
                        },
                        y = ye(g),
                        x = 0,
                        E = null == y ? 0 : y.length;
                      x < E;
                      x++
                    ) {
                      var R = y[x]
                      'prototype' !== R && be(r, g, R)
                    }
                    var _ = r.prototype
                    return Ee(_, null), we(_, g.prototype), r
                  }
                })()),
            Re = B.inited
              ? B.module.safeProcess
              : (B.module.safeProcess = (function () {
                  var v = Se(q),
                    g = Reflect.getOwnPropertyDescriptor(v, 'binding')
                  f(v, 'binding', function () {
                    if (void 0 === g) return ve
                    Reflect.defineProperty(v, 'binding', g)
                    var y = fe(v, 'binding'),
                      x = 'function' == typeof y ? U.bind(y, q) : ve
                    return K(v, 'binding', x), x
                  })
                  var y = v.config,
                    x = { variables: { v8_enable_inspector: 0 } }
                  return (
                    z(y) &&
                      me(y, 'variables') &&
                      z(y.variables) &&
                      me(y.variables, 'v8_enable_inspector') &&
                      y.variables.v8_enable_inspector &&
                      (x.variables.v8_enable_inspector = 1),
                    K(v, 'argv', Se(v.argv)),
                    K(v, 'config', x),
                    K(v, 'dlopen', U.bind(v.dlopen, q)),
                    K(v, 'emitWarning', U.bind(v.emitWarning, q)),
                    K(v, 'env', Se(v.env)),
                    K(v, 'execArgv', Se(v.execArgv)),
                    K(v, 'getMaxListeners', U.bind(q.getMaxListeners, q)),
                    K(v, 'once', U.bind(q.once, q)),
                    K(v, 'setMaxListeners', U.bind(q.setMaxListeners, q)),
                    K(v, 'versions', Se(v.versions)),
                    v
                  )
                })()),
            _e = Re.argv,
            Pe = Re.config,
            ke = Re.cwd,
            Ie = Re.dlopen,
            Ae = Re.emitWarning,
            Oe = Re.env,
            Te = Re.execArgv,
            Me = Re.getMaxListeners,
            De = Re.once,
            Fe = Re.platform,
            je = Re.setMaxListeners,
            Ve = Re.stdin,
            Be = Re.type,
            Ge = Re.versions,
            Ue = Re,
            We = B.inited
              ? B.module.binding
              : (B.module.binding = (function () {
                  for (
                    var v = ['fs', 'inspector', 'natives', 'util'],
                      g = new Map([
                        ['fs', ['internalModuleStat', 'realpath']],
                        ['inspector', ['consoleCall']],
                        ['natives', void 0],
                        [
                          'util',
                          [
                            'decorated_private_symbol',
                            'getProxyDetails',
                            'safeGetenv',
                            'setHiddenValue',
                          ],
                        ],
                      ]),
                      y = {},
                      i = function (v) {
                        f(y, v, function () {
                          var y = {},
                            x = Ue.binding(v)
                          if (!z(x)) return y
                          var E = g.get(v)
                          void 0 === E && (E = de(x))
                          for (
                            var s = function (v) {
                                f(y, v, function () {
                                  if ('consoleCall' === v)
                                    return he(function () {
                                      return x[v]
                                    })
                                  var g = fe(x, v)
                                  return 'function' == typeof g
                                    ? U.bind(g, x)
                                    : g
                                })
                              },
                              R = 0,
                              _ = E,
                              P = null == _ ? 0 : _.length;
                            R < P;
                            R++
                          ) {
                            var k = _[R]
                            s(k)
                          }
                          return y
                        })
                      },
                      x = 0,
                      E = null == v ? 0 : v.length;
                    x < E;
                    x++
                  ) {
                    var R = v[x]
                    i(R)
                  }
                  return y
                })()),
            qe = B.inited
              ? B.module.utilGetPrototypeOf
              : (B.module.utilGetPrototypeOf = (function () {
                  return function (v) {
                    return z(v) ? Reflect.getPrototypeOf(v) : null
                  }
                })()),
            ze = B.inited
              ? B.module.utilToExternalFunction
              : (B.module.utilToExternalFunction = (function () {
                  var v = B.external.Function,
                    g = qe(v),
                    y = qe(v.prototype)
                  return function (v) {
                    return Ee(v, g), me(v, 'prototype') && Ee(v.prototype, y), v
                  }
                })()),
            He = B.inited
              ? B.module.OwnProxy
              : (B.module.OwnProxy = (function () {
                  var v = {
                      value: ze(function () {
                        return '{}'
                      }),
                    },
                    g = { value: 1 }
                  class r {
                    constructor(y, x) {
                      var E = { __proto__: x },
                        R = new Proxy(y, E)
                      for (var _ in (Ee(x, null), x)) ze(x[_])
                      Reflect.defineProperty(E, B.customInspectKey, v),
                        Reflect.defineProperty(E, B.symbol.proxy, g),
                        r.instances.set(R, [y, E])
                      var P = {},
                        k = new Proxy(R, P)
                      return r.instances.set(k, [R, P]), k
                    }
                  }
                  return (r.instances = new WeakMap()), Ee(r.prototype, null), r
                })()),
            Ye = B.inited
              ? B.module.safeRequire
              : (B.module.safeRequire = (function () {
                  var v = W.resolve
                  function t(v) {
                    try {
                      return W(v)
                    } catch (v) {}
                  }
                  return (
                    (t.resolve = function (g) {
                      try {
                        return Reflect.apply(v, W, [g])
                      } catch (v) {}
                      return ''
                    }),
                    t
                  )
                })()),
            Xe = B.inited
              ? B.module.realGetProxyDetails
              : (B.module.realGetProxyDetails = (function () {
                  var v,
                    g = Ye(B.symbol.realGetProxyDetails)
                  return 'function' == typeof g
                    ? g
                    : ((g = function (g) {
                        if (
                          (void 0 === v &&
                            (v = 'function' == typeof We.util.getProxyDetails),
                          v && z(g))
                        )
                          try {
                            return We.util.getProxyDetails(g)
                          } catch (v) {}
                      }),
                      g)
                })()),
            Ze = B.inited
              ? B.module.utilGetProxyDetails
              : (B.module.utilGetProxyDetails = (function () {
                  return function (v) {
                    var g = B.memoize.utilGetProxyDetails,
                      y = g.get(v)
                    if (void 0 !== y) return y.details
                    if (z(v)) {
                      var x = He.instances.get(v) || Xe(v)
                      return g.set(v, { details: x }), x
                    }
                  }
                })()),
            et = B.inited
              ? B.module.utilUnwrapProxy
              : (B.module.utilUnwrapProxy = (function () {
                  return function (v) {
                    if (!z(v)) return v
                    var g,
                      y = B.memoize.utilUnwrapProxy,
                      x = y.get(v)
                    if (void 0 !== x) return x
                    for (var E = v; void 0 !== (g = Ze(E)); ) E = g[0]
                    return y.set(v, E), E
                  }
                })()),
            tt = B.inited
              ? B.module.realPath
              : (B.module.realPath = et(W('path'))),
            rt = B.inited ? B.module.safePath : (B.module.safePath = Se(tt)),
            it = rt.basename,
            st = rt.delimiter,
            ct = rt.dirname,
            pt = rt.extname,
            ht = rt.isAbsolute,
            ft = rt.normalize,
            dt = rt.resolve,
            mt = rt.sep,
            vt = rt.toNamespacedPath,
            gt = rt,
            bt = {},
            wt = {},
            St = B.inited
              ? B.module.utilAlwaysTrue
              : (B.module.utilAlwaysTrue = (function () {
                  return function () {
                    return !0
                  }
                })()),
            Rt = B.inited
              ? B.module.FastPath
              : (B.module.FastPath = (function () {
                  class e {
                    constructor(v) {
                      this.stack = [v]
                    }
                    call(v, g, y) {
                      var x = this.stack,
                        E = x[x.length - 1]
                      x.push(y, E[y])
                      var R = v[g](this)
                      return (x.length -= 2), R
                    }
                    each(v, g) {
                      for (
                        var y = this.stack,
                          x = y[y.length - 1],
                          E = x.length,
                          R = -1;
                        ++R < E;

                      )
                        y.push(R, x[R]), v[g](this), (y.length -= 2)
                    }
                    getNode(v, g) {
                      var y = this.stack,
                        x = y.length
                      for (
                        'function' != typeof g && (g = St),
                          void 0 !== v && (x = v < 0 ? x + v : v);
                        x-- > 0;

                      ) {
                        var E = y[x--]
                        if (ge(E) && !Array.isArray(E) && g(E)) return E
                      }
                      return null
                    }
                    getParentNode(v) {
                      return this.getNode(-2, v)
                    }
                    getValue() {
                      var v = this.stack
                      return v[v.length - 1]
                    }
                  }
                  return Ee(e.prototype, null), e
                })()),
            _t = B.inited
              ? B.module.MagicString
              : (B.module.MagicString = (function () {
                  class e {
                    constructor(v, g, y) {
                      ;(this.content = y),
                        (this.end = g),
                        (this.intro = ''),
                        (this.original = y),
                        (this.outro = ''),
                        (this.next = null),
                        (this.start = v)
                    }
                    appendLeft(v) {
                      this.outro += v
                    }
                    appendRight(v) {
                      this.intro += v
                    }
                    contains(v) {
                      return this.start < v && v < this.end
                    }
                    edit(v) {
                      ;(this.content = v), (this.intro = ''), (this.outro = '')
                    }
                    prependLeft(v) {
                      this.outro = v + this.outro
                    }
                    prependRight(v) {
                      this.intro = v + this.intro
                    }
                    split(v) {
                      var g = v - this.start,
                        y = this.original.slice(0, g),
                        x = this.original.slice(g),
                        E = new e(v, this.end, x)
                      return (
                        (E.outro = this.outro),
                        (E.next = this.next),
                        (this.original = y),
                        (this.end = v),
                        (this.content = y),
                        (this.outro = ''),
                        (this.next = E),
                        E
                      )
                    }
                    toString() {
                      return this.intro + this.content + this.outro
                    }
                  }
                  Ee(e.prototype, null)
                  class t {
                    constructor(v) {
                      var g = new e(0, v.length, v)
                      ;(this.original = v),
                        (this.intro = ''),
                        (this.outro = ''),
                        (this.firstChunk = g),
                        (this.lastSearchedChunk = g),
                        (this.byStart = new Map()),
                        this.byStart.set(0, g),
                        (this.byEnd = new Map()),
                        this.byEnd.set(v.length, g)
                    }
                    appendLeft(v, g) {
                      this._split(v)
                      var y = this.byEnd.get(v)
                      return (
                        void 0 === y ? (this.intro += g) : y.appendLeft(g), this
                      )
                    }
                    appendRight(v, g) {
                      this._split(v)
                      var y = this.byStart.get(v)
                      return (
                        void 0 === y ? (this.outro += g) : y.appendRight(g),
                        this
                      )
                    }
                    overwrite(v, g, y) {
                      this._split(v), this._split(g)
                      var x = this.byStart.get(v),
                        E = this.byEnd.get(g)
                      if (v === g) return y ? this.appendLeft(v, y) : this
                      if ((x.edit(y), x === E)) return this
                      for (var R = x.next; R !== E; ) R.edit(''), (R = R.next)
                      return R.edit(''), this
                    }
                    prependLeft(v, g) {
                      this._split(v)
                      var y = this.byEnd.get(v)
                      return (
                        void 0 === y
                          ? (this.intro = g + this.intro)
                          : y.prependLeft(g),
                        this
                      )
                    }
                    prependRight(v, g) {
                      this._split(v)
                      var y = this.byStart.get(v)
                      return (
                        void 0 === y
                          ? (this.outro = g + this.outro)
                          : y.prependRight(g),
                        this
                      )
                    }
                    _split(v) {
                      if (!this.byStart.has(v) && !this.byEnd.has(v))
                        for (
                          var g = this.lastSearchedChunk, y = v > g.end;
                          g;

                        ) {
                          if (g.contains(v)) return void this._splitChunk(g, v)
                          g = y
                            ? this.byStart.get(g.end)
                            : this.byEnd.get(g.start)
                        }
                    }
                    _splitChunk(v, g) {
                      var y = v.split(g)
                      this.byEnd.set(g, v),
                        this.byStart.set(g, y),
                        this.byEnd.set(y.end, y),
                        (this.lastSearchedChunk = v)
                    }
                    toString() {
                      for (var v = this.intro, g = this.firstChunk; g; )
                        (v += '' + g), (g = g.next)
                      return v + this.outro
                    }
                  }
                  return Ee(t.prototype, null), t
                })())
          class Ne {
            constructor(v, g = {}) {
              ;(this.label = v),
                (this.keyword = g.keyword),
                (this.beforeExpr = !!g.beforeExpr),
                (this.startsExpr = !!g.startsExpr),
                (this.isLoop = !!g.isLoop),
                (this.isAssign = !!g.isAssign),
                (this.prefix = !!g.prefix),
                (this.postfix = !!g.postfix),
                (this.binop = g.binop || null),
                (this.updateContext = null)
            }
          }
          function Ce(v, g) {
            return new Ne(v, { beforeExpr: !0, binop: g })
          }
          var Pt = { beforeExpr: !0 },
            It = { startsExpr: !0 },
            Nt = {}
          function Le(v, g = {}) {
            return (g.keyword = v), (Nt[v] = new Ne(v, g))
          }
          var Ot = {
              num: new Ne('num', It),
              regexp: new Ne('regexp', It),
              string: new Ne('string', It),
              name: new Ne('name', It),
              eof: new Ne('eof'),
              bracketL: new Ne('[', { beforeExpr: !0, startsExpr: !0 }),
              bracketR: new Ne(']'),
              braceL: new Ne('{', { beforeExpr: !0, startsExpr: !0 }),
              braceR: new Ne('}'),
              parenL: new Ne('(', { beforeExpr: !0, startsExpr: !0 }),
              parenR: new Ne(')'),
              comma: new Ne(',', Pt),
              semi: new Ne(';', Pt),
              colon: new Ne(':', Pt),
              dot: new Ne('.'),
              question: new Ne('?', Pt),
              arrow: new Ne('=>', Pt),
              template: new Ne('template'),
              invalidTemplate: new Ne('invalidTemplate'),
              ellipsis: new Ne('...', Pt),
              backQuote: new Ne('`', It),
              dollarBraceL: new Ne('${', { beforeExpr: !0, startsExpr: !0 }),
              eq: new Ne('=', { beforeExpr: !0, isAssign: !0 }),
              assign: new Ne('_=', { beforeExpr: !0, isAssign: !0 }),
              incDec: new Ne('++/--', {
                prefix: !0,
                postfix: !0,
                startsExpr: !0,
              }),
              prefix: new Ne('!/~', {
                beforeExpr: !0,
                prefix: !0,
                startsExpr: !0,
              }),
              logicalOR: Ce('||', 1),
              logicalAND: Ce('&&', 2),
              bitwiseOR: Ce('|', 3),
              bitwiseXOR: Ce('^', 4),
              bitwiseAND: Ce('&', 5),
              equality: Ce('==/!=/===/!==', 6),
              relational: Ce('</>/<=/>=', 7),
              bitShift: Ce('<</>>/>>>', 8),
              plusMin: new Ne('+/-', {
                beforeExpr: !0,
                binop: 9,
                prefix: !0,
                startsExpr: !0,
              }),
              modulo: Ce('%', 10),
              star: Ce('*', 10),
              slash: Ce('/', 10),
              starstar: new Ne('**', { beforeExpr: !0 }),
              _break: Le('break'),
              _case: Le('case', Pt),
              _catch: Le('catch'),
              _continue: Le('continue'),
              _debugger: Le('debugger'),
              _default: Le('default', Pt),
              _do: Le('do', { isLoop: !0, beforeExpr: !0 }),
              _else: Le('else', Pt),
              _finally: Le('finally'),
              _for: Le('for', { isLoop: !0 }),
              _function: Le('function', It),
              _if: Le('if'),
              _return: Le('return', Pt),
              _switch: Le('switch'),
              _throw: Le('throw', Pt),
              _try: Le('try'),
              _var: Le('var'),
              _const: Le('const'),
              _while: Le('while', { isLoop: !0 }),
              _with: Le('with'),
              _new: Le('new', { beforeExpr: !0, startsExpr: !0 }),
              _this: Le('this', It),
              _super: Le('super', It),
              _class: Le('class', It),
              _extends: Le('extends', Pt),
              _export: Le('export'),
              _import: Le('import'),
              _null: Le('null', It),
              _true: Le('true', It),
              _false: Le('false', It),
              _in: Le('in', { beforeExpr: !0, binop: 7 }),
              _instanceof: Le('instanceof', { beforeExpr: !0, binop: 7 }),
              _typeof: Le('typeof', {
                beforeExpr: !0,
                prefix: !0,
                startsExpr: !0,
              }),
              _void: Le('void', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
              _delete: Le('delete', {
                beforeExpr: !0,
                prefix: !0,
                startsExpr: !0,
              }),
            },
            Tt = {
              3: 'abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile',
              5: 'class enum extends super const export import',
              6: 'enum',
              strict:
                'implements interface let package private protected public static yield',
              strictBind: 'eval arguments',
            },
            Lt =
              'break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this',
            Mt = { 5: Lt, 6: Lt + ' const class extends export import super' },
            Dt = /^in(stanceof)?$/,
            Ft =
              'ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿯ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞹꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ',
            Vt =
              '‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ංඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ູົຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭ᳲ-᳴᳷-᳹᷀-᷹᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿',
            Gt = RegExp('[' + Ft + ']'),
            Wt = RegExp('[' + Ft + Vt + ']')
          Ft = Vt = null
          var $t = [
              0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28,
              4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157,
              19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3,
              0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21,
              11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28,
              36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14,
              50, 14, 35, 477, 28, 11, 0, 9, 21, 190, 52, 76, 44, 33, 24, 27,
              35, 30, 0, 12, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2,
              24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2,
              6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 54, 47, 21, 1,
              2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 86, 26, 230, 43, 117,
              63, 32, 0, 257, 0, 11, 39, 8, 0, 22, 0, 12, 39, 3, 3, 20, 0, 35,
              56, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26,
              5, 2, 1, 2, 31, 15, 0, 328, 18, 270, 921, 103, 110, 18, 195, 2749,
              1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20,
              6, 18, 689, 63, 129, 68, 12, 0, 67, 12, 65, 1, 31, 6129, 15, 754,
              9486, 286, 82, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70,
              2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2,
              6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2,
              24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 4149, 196, 60,
              67, 1213, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7,
              0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2,
              0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2,
              4, 2, 16, 4421, 42710, 42, 4148, 12, 221, 3, 5761, 15, 7472, 3104,
              541,
            ],
            zt = [
              509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0,
              166, 1, 574, 3, 9, 9, 525, 10, 176, 2, 54, 14, 32, 9, 16, 3, 46,
              10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3,
              4, 9, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2,
              10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9,
              214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9,
              243, 14, 166, 9, 280, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406,
              7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9,
              9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26,
              9, 1016, 45, 17, 3, 19723, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3,
              149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361,
              6, 2, 16, 3, 6, 2, 1, 2, 4, 2214, 6, 110, 6, 6, 9, 792487, 239,
            ]
          function $e(v, g) {
            for (var y = 65536, x = 0; x < g.length; x += 2) {
              if (((y += g[x]), y > v)) return !1
              if (((y += g[x + 1]), y >= v)) return !0
            }
          }
          function Ke(v, g) {
            return v < 65
              ? 36 === v
              : v < 91 ||
                  (v < 97
                    ? 95 === v
                    : v < 123 ||
                      (v <= 65535
                        ? v >= 170 && Gt.test(String.fromCharCode(v))
                        : !1 !== g && $e(v, $t)))
          }
          function Je(v, g) {
            return v < 48
              ? 36 === v
              : v < 58 ||
                  (!(v < 65) &&
                    (v < 91 ||
                      (v < 97
                        ? 95 === v
                        : v < 123 ||
                          (v <= 65535
                            ? v >= 170 && Wt.test(String.fromCharCode(v))
                            : !1 !== g && ($e(v, $t) || $e(v, zt))))))
          }
          var Ht = /\r\n?|\n|\u2028|\u2029/,
            Kt = RegExp(Ht.source, 'g')
          function Qe(v, g) {
            return 10 === v || 13 === v || (!g && (8232 === v || 8233 === v))
          }
          var Jt = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,
            Yt = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,
            Qt = Object.prototype,
            Xt = Qt.hasOwnProperty,
            Zt = Qt.toString
          function nt(v, g) {
            return Xt.call(v, g)
          }
          var er =
            Array.isArray ||
            function (v) {
              return '[object Array]' === Zt.call(v)
            }
          function at(v) {
            return RegExp('^(?:' + v.replace(/ /g, '|') + ')$')
          }
          class ot {
            constructor(v, g) {
              ;(this.line = v), (this.column = g)
            }
            offset(v) {
              return new ot(this.line, this.column + v)
            }
          }
          class ut {
            constructor(v, g, y) {
              ;(this.start = g),
                (this.end = y),
                null !== v.sourceFile && (this.source = v.sourceFile)
            }
          }
          function lt(v, g) {
            for (var y = 1, x = 0; ; ) {
              Kt.lastIndex = x
              var E = Kt.exec(v)
              if (!(E && E.index < g)) return new ot(y, g - x)
              ++y, (x = E.index + E[0].length)
            }
          }
          var tr = {
              ecmaVersion: 9,
              sourceType: 'script',
              onInsertedSemicolon: null,
              onTrailingComma: null,
              allowReserved: null,
              allowReturnOutsideFunction: !1,
              allowImportExportEverywhere: !1,
              allowAwaitOutsideFunction: !1,
              allowHashBang: !1,
              locations: !1,
              onToken: null,
              onComment: null,
              ranges: !1,
              program: null,
              sourceFile: null,
              directSourceFile: null,
              preserveParens: !1,
            },
            rr = 1,
            ir = 2,
            nr = rr | ir,
            sr = 4,
            ar = 8,
            or = 64,
            ur = 128
          function yt(v, g) {
            return ir | (v ? sr : 0) | (g ? ar : 0)
          }
          class xt {
            constructor(v, g, y) {
              ;(this.options = v =
                (function (v) {
                  var g = {}
                  for (var y in tr) g[y] = v && nt(v, y) ? v[y] : tr[y]
                  if (
                    (g.ecmaVersion >= 2015 && (g.ecmaVersion -= 2009),
                    null == g.allowReserved &&
                      (g.allowReserved = g.ecmaVersion < 5),
                    er(g.onToken))
                  ) {
                    var x = g.onToken
                    g.onToken = function (v) {
                      return x.push(v)
                    }
                  }
                  return (
                    er(g.onComment) &&
                      (g.onComment = (function (v, g) {
                        return function (y, x, E, R, _, P) {
                          var k = {
                            type: y ? 'Block' : 'Line',
                            value: x,
                            start: E,
                            end: R,
                          }
                          v.locations && (k.loc = new ut(this, _, P)),
                            v.ranges && (k.range = [E, R]),
                            g.push(k)
                        }
                      })(g, g.onComment)),
                    g
                  )
                })(v)),
                (this.sourceFile = v.sourceFile),
                (this.keywords = at(Mt[v.ecmaVersion >= 6 ? 6 : 5]))
              var x = ''
              if (!v.allowReserved) {
                for (var E = v.ecmaVersion; !(x = Tt[E]); E--);
                'module' === v.sourceType && (x += ' await')
              }
              this.reservedWords = at(x)
              var R = (x ? x + ' ' : '') + Tt.strict
              ;(this.reservedWordsStrict = at(R)),
                (this.reservedWordsStrictBind = at(R + ' ' + Tt.strictBind)),
                (this.input = g + ''),
                (this.containsEsc = !1),
                y
                  ? ((this.pos = y),
                    (this.lineStart = this.input.lastIndexOf('\n', y - 1) + 1),
                    (this.curLine = this.input
                      .slice(0, this.lineStart)
                      .split(Ht).length))
                  : ((this.pos = this.lineStart = 0), (this.curLine = 1)),
                (this.type = Ot.eof),
                (this.value = null),
                (this.start = this.end = this.pos),
                (this.startLoc = this.endLoc = this.curPosition()),
                (this.lastTokEndLoc = this.lastTokStartLoc = null),
                (this.lastTokStart = this.lastTokEnd = this.pos),
                (this.context = this.initialContext()),
                (this.exprAllowed = !0),
                (this.inModule = 'module' === v.sourceType),
                (this.strict = this.inModule || this.strictDirective(this.pos)),
                (this.potentialArrowAt = -1),
                (this.yieldPos = this.awaitPos = this.awaitIdentPos = 0),
                (this.labels = []),
                (this.undefinedExports = {}),
                0 === this.pos &&
                  v.allowHashBang &&
                  '#!' === this.input.slice(0, 2) &&
                  this.skipLineComment(2),
                (this.scopeStack = []),
                this.enterScope(rr),
                (this.regexpState = null)
            }
            parse() {
              var v = this.options.program || this.startNode()
              return this.nextToken(), this.parseTopLevel(v)
            }
            get inFunction() {
              return (this.currentVarScope().flags & ir) > 0
            }
            get inGenerator() {
              return (this.currentVarScope().flags & ar) > 0
            }
            get inAsync() {
              return (this.currentVarScope().flags & sr) > 0
            }
            get allowSuper() {
              return (this.currentThisScope().flags & or) > 0
            }
            get allowDirectSuper() {
              return (this.currentThisScope().flags & ur) > 0
            }
            get treatFunctionsAsVar() {
              return this.treatFunctionsAsVarInScope(this.currentScope())
            }
            inNonArrowFunction() {
              return (this.currentThisScope().flags & ir) > 0
            }
            static extend(...v) {
              for (var g = this, y = 0; y < v.length; y++) g = v[y](g)
              return g
            }
            static parse(v, g) {
              return new this(g, v).parse()
            }
            static parseExpressionAt(v, g, y) {
              var x = new this(y, v, g)
              return x.nextToken(), x.parseExpression()
            }
            static tokenizer(v, g) {
              return new this(g, v)
            }
          }
          var lr = xt.prototype,
            cr = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)")/
          function Et() {
            this.shorthandAssign =
              this.trailingComma =
              this.parenthesizedAssign =
              this.parenthesizedBind =
              this.doubleProto =
                -1
          }
          ;(lr.strictDirective = function (v) {
            for (;;) {
              ;(Yt.lastIndex = v), (v += Yt.exec(this.input)[0].length)
              var g = cr.exec(this.input.slice(v))
              if (!g) return !1
              if ('use strict' === (g[1] || g[2])) return !0
              ;(v += g[0].length),
                (Yt.lastIndex = v),
                (v += Yt.exec(this.input)[0].length),
                ';' === this.input[v] && v++
            }
          }),
            (lr.eat = function (v) {
              return this.type === v && (this.next(), !0)
            }),
            (lr.isContextual = function (v) {
              return (
                this.type === Ot.name && this.value === v && !this.containsEsc
              )
            }),
            (lr.eatContextual = function (v) {
              return !!this.isContextual(v) && (this.next(), !0)
            }),
            (lr.expectContextual = function (v) {
              this.eatContextual(v) || this.unexpected()
            }),
            (lr.canInsertSemicolon = function () {
              return (
                this.type === Ot.eof ||
                this.type === Ot.braceR ||
                Ht.test(this.input.slice(this.lastTokEnd, this.start))
              )
            }),
            (lr.insertSemicolon = function () {
              if (this.canInsertSemicolon())
                return (
                  this.options.onInsertedSemicolon &&
                    this.options.onInsertedSemicolon(
                      this.lastTokEnd,
                      this.lastTokEndLoc
                    ),
                  !0
                )
            }),
            (lr.semicolon = function () {
              this.eat(Ot.semi) || this.insertSemicolon() || this.unexpected()
            }),
            (lr.afterTrailingComma = function (v, g) {
              if (this.type === v)
                return (
                  this.options.onTrailingComma &&
                    this.options.onTrailingComma(
                      this.lastTokStart,
                      this.lastTokStartLoc
                    ),
                  g || this.next(),
                  !0
                )
            }),
            (lr.expect = function (v) {
              this.eat(v) || this.unexpected()
            }),
            (lr.unexpected = function (v) {
              this.raise(null != v ? v : this.start, 'Unexpected token')
            }),
            (lr.checkPatternErrors = function (v, g) {
              if (v) {
                v.trailingComma > -1 &&
                  this.raiseRecoverable(
                    v.trailingComma,
                    'Comma is not permitted after the rest element'
                  )
                var y = g ? v.parenthesizedAssign : v.parenthesizedBind
                y > -1 && this.raiseRecoverable(y, 'Parenthesized pattern')
              }
            }),
            (lr.checkExpressionErrors = function (v, g) {
              if (!v) return !1
              var y = v.shorthandAssign,
                x = v.doubleProto
              if (!g) return y >= 0 || x >= 0
              y >= 0 &&
                this.raise(
                  y,
                  'Shorthand property assignments are valid only in destructuring patterns'
                ),
                x >= 0 &&
                  this.raiseRecoverable(x, 'Redefinition of __proto__ property')
            }),
            (lr.checkYieldAwaitInDefaultParams = function () {
              this.yieldPos &&
                (!this.awaitPos || this.yieldPos < this.awaitPos) &&
                this.raise(
                  this.yieldPos,
                  'Yield expression cannot be a default value'
                ),
                this.awaitPos &&
                  this.raise(
                    this.awaitPos,
                    'Await expression cannot be a default value'
                  )
            }),
            (lr.isSimpleAssignTarget = function (v) {
              return 'ParenthesizedExpression' === v.type
                ? this.isSimpleAssignTarget(v.expression)
                : 'Identifier' === v.type || 'MemberExpression' === v.type
            })
          var pr = xt.prototype
          ;(pr.checkPropClash = function (v, g, y) {
            if (
              !(
                (this.options.ecmaVersion >= 9 && 'SpreadElement' === v.type) ||
                (this.options.ecmaVersion >= 6 &&
                  (v.computed || v.method || v.shorthand))
              )
            ) {
              var x,
                E = v.key
              switch (E.type) {
                case 'Identifier':
                  x = E.name
                  break
                case 'Literal':
                  x = E.value + ''
                  break
                default:
                  return
              }
              var R = v.kind
              if (this.options.ecmaVersion >= 6)
                '__proto__' === x &&
                  'init' === R &&
                  (g.proto &&
                    (y && y.doubleProto < 0
                      ? (y.doubleProto = E.start)
                      : this.raiseRecoverable(
                          E.start,
                          'Redefinition of __proto__ property'
                        )),
                  (g.proto = !0))
              else {
                x = '$' + x
                var _,
                  P = g[x]
                P
                  ? ((_ =
                      'init' === R
                        ? (this.strict && P.init) || P.get || P.set
                        : P.init || P[R]),
                    _ &&
                      this.raiseRecoverable(
                        E.start,
                        'Redefinition of property'
                      ))
                  : (P = g[x] = { init: !1, get: !1, set: !1 }),
                  (P[R] = !0)
              }
            }
          }),
            (pr.parseExpression = function (v, g) {
              var y = this.start,
                x = this.startLoc,
                E = this.parseMaybeAssign(v, g)
              if (this.type === Ot.comma) {
                var R = this.startNodeAt(y, x)
                for (R.expressions = [E]; this.eat(Ot.comma); )
                  R.expressions.push(this.parseMaybeAssign(v, g))
                return this.finishNode(R, 'SequenceExpression')
              }
              return E
            }),
            (pr.parseMaybeAssign = function (v, g, y) {
              if (this.isContextual('yield')) {
                if (this.inGenerator) return this.parseYield(v)
                this.exprAllowed = !1
              }
              var x = !1,
                E = -1,
                R = -1,
                _ = -1
              g
                ? ((E = g.parenthesizedAssign),
                  (R = g.trailingComma),
                  (_ = g.shorthandAssign),
                  (g.parenthesizedAssign =
                    g.trailingComma =
                    g.shorthandAssign =
                      -1))
                : ((g = new Et()), (x = !0))
              var P = this.start,
                k = this.startLoc
              ;(this.type !== Ot.parenL && this.type !== Ot.name) ||
                (this.potentialArrowAt = this.start)
              var I = this.parseMaybeConditional(v, g)
              if ((y && (I = y.call(this, I, P, k)), this.type.isAssign)) {
                var A = this.startNodeAt(P, k)
                return (
                  (A.operator = this.value),
                  (A.left =
                    this.type === Ot.eq ? this.toAssignable(I, !1, g) : I),
                  x || Et.call(g),
                  (g.shorthandAssign = -1),
                  this.checkLVal(I),
                  this.next(),
                  (A.right = this.parseMaybeAssign(v)),
                  this.finishNode(A, 'AssignmentExpression')
                )
              }
              return (
                x && this.checkExpressionErrors(g, !0),
                E > -1 && (g.parenthesizedAssign = E),
                R > -1 && (g.trailingComma = R),
                _ > -1 && (g.shorthandAssign = _),
                I
              )
            }),
            (pr.parseMaybeConditional = function (v, g) {
              var y = this.start,
                x = this.startLoc,
                E = this.parseExprOps(v, g)
              if (this.checkExpressionErrors(g)) return E
              if (this.eat(Ot.question)) {
                var R = this.startNodeAt(y, x)
                return (
                  (R.test = E),
                  (R.consequent = this.parseMaybeAssign()),
                  this.expect(Ot.colon),
                  (R.alternate = this.parseMaybeAssign(v)),
                  this.finishNode(R, 'ConditionalExpression')
                )
              }
              return E
            }),
            (pr.parseExprOps = function (v, g) {
              var y = this.start,
                x = this.startLoc,
                E = this.parseMaybeUnary(g, !1)
              return this.checkExpressionErrors(g)
                ? E
                : E.start === y && 'ArrowFunctionExpression' === E.type
                ? E
                : this.parseExprOp(E, y, x, -1, v)
            }),
            (pr.parseExprOp = function (v, g, y, x, E) {
              var R = this.type.binop
              if (null != R && (!E || this.type !== Ot._in) && R > x) {
                var _ =
                    this.type === Ot.logicalOR || this.type === Ot.logicalAND,
                  P = this.value
                this.next()
                var k = this.start,
                  I = this.startLoc,
                  A = this.parseExprOp(
                    this.parseMaybeUnary(null, !1),
                    k,
                    I,
                    R,
                    E
                  ),
                  N = this.buildBinary(g, y, v, A, P, _)
                return this.parseExprOp(N, g, y, x, E)
              }
              return v
            }),
            (pr.buildBinary = function (v, g, y, x, E, R) {
              var _ = this.startNodeAt(v, g)
              return (
                (_.left = y),
                (_.operator = E),
                (_.right = x),
                this.finishNode(_, R ? 'LogicalExpression' : 'BinaryExpression')
              )
            }),
            (pr.parseMaybeUnary = function (v, g) {
              var y,
                x = this.start,
                E = this.startLoc
              if (
                this.isContextual('await') &&
                (this.inAsync ||
                  (!this.inFunction && this.options.allowAwaitOutsideFunction))
              )
                (y = this.parseAwait()), (g = !0)
              else if (this.type.prefix) {
                var R = this.startNode(),
                  _ = this.type === Ot.incDec
                ;(R.operator = this.value),
                  (R.prefix = !0),
                  this.next(),
                  (R.argument = this.parseMaybeUnary(null, !0)),
                  this.checkExpressionErrors(v, !0),
                  _
                    ? this.checkLVal(R.argument)
                    : this.strict &&
                      'delete' === R.operator &&
                      'Identifier' === R.argument.type
                    ? this.raiseRecoverable(
                        R.start,
                        'Deleting local variable in strict mode'
                      )
                    : (g = !0),
                  (y = this.finishNode(
                    R,
                    _ ? 'UpdateExpression' : 'UnaryExpression'
                  ))
              } else {
                if (
                  ((y = this.parseExprSubscripts(v)),
                  this.checkExpressionErrors(v))
                )
                  return y
                for (; this.type.postfix && !this.canInsertSemicolon(); ) {
                  var P = this.startNodeAt(x, E)
                  ;(P.operator = this.value),
                    (P.prefix = !1),
                    (P.argument = y),
                    this.checkLVal(y),
                    this.next(),
                    (y = this.finishNode(P, 'UpdateExpression'))
                }
              }
              return !g && this.eat(Ot.starstar)
                ? this.buildBinary(
                    x,
                    E,
                    y,
                    this.parseMaybeUnary(null, !1),
                    '**',
                    !1
                  )
                : y
            }),
            (pr.parseExprSubscripts = function (v) {
              var g = this.start,
                y = this.startLoc,
                x = this.parseExprAtom(v),
                E =
                  'ArrowFunctionExpression' === x.type &&
                  ')' !== this.input.slice(this.lastTokStart, this.lastTokEnd)
              if (this.checkExpressionErrors(v) || E) return x
              var R = this.parseSubscripts(x, g, y)
              return (
                v &&
                  'MemberExpression' === R.type &&
                  (v.parenthesizedAssign >= R.start &&
                    (v.parenthesizedAssign = -1),
                  v.parenthesizedBind >= R.start && (v.parenthesizedBind = -1)),
                R
              )
            }),
            (pr.parseSubscripts = function (v, g, y, x) {
              for (
                var E =
                  this.options.ecmaVersion >= 8 &&
                  'Identifier' === v.type &&
                  'async' === v.name &&
                  this.lastTokEnd === v.end &&
                  !this.canInsertSemicolon() &&
                  'async' === this.input.slice(v.start, v.end);
                ;

              ) {
                var R = this.parseSubscript(v, g, y, x, E)
                if (R === v || 'ArrowFunctionExpression' === R.type) return R
                v = R
              }
            }),
            (pr.parseSubscript = function (v, g, y, x, E) {
              var R = this.eat(Ot.bracketL)
              if (R || this.eat(Ot.dot)) {
                var _ = this.startNodeAt(g, y)
                ;(_.object = v),
                  (_.property = R
                    ? this.parseExpression()
                    : this.parseIdent(!0)),
                  (_.computed = !!R),
                  R && this.expect(Ot.bracketR),
                  (v = this.finishNode(_, 'MemberExpression'))
              } else if (!x && this.eat(Ot.parenL)) {
                var P = new Et(),
                  k = this.yieldPos,
                  I = this.awaitPos,
                  A = this.awaitIdentPos
                ;(this.yieldPos = 0),
                  (this.awaitPos = 0),
                  (this.awaitIdentPos = 0)
                var N = this.parseExprList(
                  Ot.parenR,
                  this.options.ecmaVersion >= 8,
                  !1,
                  P
                )
                if (E && !this.canInsertSemicolon() && this.eat(Ot.arrow))
                  return (
                    this.checkPatternErrors(P, !1),
                    this.checkYieldAwaitInDefaultParams(),
                    this.awaitIdentPos > 0 &&
                      this.raise(
                        this.awaitIdentPos,
                        "Cannot use 'await' as identifier inside an async function"
                      ),
                    (this.yieldPos = k),
                    (this.awaitPos = I),
                    (this.awaitIdentPos = A),
                    this.parseArrowExpression(this.startNodeAt(g, y), N, !0)
                  )
                this.checkExpressionErrors(P, !0),
                  (this.yieldPos = k || this.yieldPos),
                  (this.awaitPos = I || this.awaitPos),
                  (this.awaitIdentPos = A || this.awaitIdentPos)
                var C = this.startNodeAt(g, y)
                ;(C.callee = v),
                  (C.arguments = N),
                  (v = this.finishNode(C, 'CallExpression'))
              } else if (this.type === Ot.backQuote) {
                var O = this.startNodeAt(g, y)
                ;(O.tag = v),
                  (O.quasi = this.parseTemplate({ isTagged: !0 })),
                  (v = this.finishNode(O, 'TaggedTemplateExpression'))
              }
              return v
            }),
            (pr.parseExprAtom = function (v) {
              this.type === Ot.slash && this.readRegexp()
              var g,
                y = this.potentialArrowAt === this.start
              switch (this.type) {
                case Ot._super:
                  return (
                    this.allowSuper ||
                      this.raise(
                        this.start,
                        "'super' keyword outside a method"
                      ),
                    (g = this.startNode()),
                    this.next(),
                    this.type !== Ot.parenL ||
                      this.allowDirectSuper ||
                      this.raise(
                        g.start,
                        'super() call outside constructor of a subclass'
                      ),
                    this.type !== Ot.dot &&
                      this.type !== Ot.bracketL &&
                      this.type !== Ot.parenL &&
                      this.unexpected(),
                    this.finishNode(g, 'Super')
                  )
                case Ot._this:
                  return (
                    (g = this.startNode()),
                    this.next(),
                    this.finishNode(g, 'ThisExpression')
                  )
                case Ot.name:
                  var x = this.start,
                    E = this.startLoc,
                    R = this.containsEsc,
                    _ = this.parseIdent(!1)
                  if (
                    this.options.ecmaVersion >= 8 &&
                    !R &&
                    'async' === _.name &&
                    !this.canInsertSemicolon() &&
                    this.eat(Ot._function)
                  )
                    return this.parseFunction(this.startNodeAt(x, E), 0, !1, !0)
                  if (y && !this.canInsertSemicolon()) {
                    if (this.eat(Ot.arrow))
                      return this.parseArrowExpression(
                        this.startNodeAt(x, E),
                        [_],
                        !1
                      )
                    if (
                      this.options.ecmaVersion >= 8 &&
                      'async' === _.name &&
                      this.type === Ot.name &&
                      !R
                    )
                      return (
                        (_ = this.parseIdent(!1)),
                        (!this.canInsertSemicolon() && this.eat(Ot.arrow)) ||
                          this.unexpected(),
                        this.parseArrowExpression(
                          this.startNodeAt(x, E),
                          [_],
                          !0
                        )
                      )
                  }
                  return _
                case Ot.regexp:
                  var P = this.value
                  return (
                    (g = this.parseLiteral(P.value)),
                    (g.regex = { pattern: P.pattern, flags: P.flags }),
                    g
                  )
                case Ot.num:
                case Ot.string:
                  return this.parseLiteral(this.value)
                case Ot._null:
                case Ot._true:
                case Ot._false:
                  return (
                    (g = this.startNode()),
                    (g.value =
                      this.type === Ot._null ? null : this.type === Ot._true),
                    (g.raw = this.type.keyword),
                    this.next(),
                    this.finishNode(g, 'Literal')
                  )
                case Ot.parenL:
                  var k = this.start,
                    I = this.parseParenAndDistinguishExpression(y)
                  return (
                    v &&
                      (v.parenthesizedAssign < 0 &&
                        !this.isSimpleAssignTarget(I) &&
                        (v.parenthesizedAssign = k),
                      v.parenthesizedBind < 0 && (v.parenthesizedBind = k)),
                    I
                  )
                case Ot.bracketL:
                  return (
                    (g = this.startNode()),
                    this.next(),
                    (g.elements = this.parseExprList(Ot.bracketR, !0, !0, v)),
                    this.finishNode(g, 'ArrayExpression')
                  )
                case Ot.braceL:
                  return this.parseObj(!1, v)
                case Ot._function:
                  return (
                    (g = this.startNode()),
                    this.next(),
                    this.parseFunction(g, 0)
                  )
                case Ot._class:
                  return this.parseClass(this.startNode(), !1)
                case Ot._new:
                  return this.parseNew()
                case Ot.backQuote:
                  return this.parseTemplate()
                default:
                  this.unexpected()
              }
            }),
            (pr.parseLiteral = function (v) {
              var g = this.startNode()
              return (
                (g.value = v),
                (g.raw = this.input.slice(this.start, this.end)),
                this.next(),
                this.finishNode(g, 'Literal')
              )
            }),
            (pr.parseParenExpression = function () {
              this.expect(Ot.parenL)
              var v = this.parseExpression()
              return this.expect(Ot.parenR), v
            }),
            (pr.parseParenAndDistinguishExpression = function (v) {
              var g,
                y = this.start,
                x = this.startLoc,
                E = this.options.ecmaVersion >= 8
              if (this.options.ecmaVersion >= 6) {
                this.next()
                var R,
                  _ = this.start,
                  P = this.startLoc,
                  k = [],
                  I = !0,
                  A = !1,
                  N = new Et(),
                  C = this.yieldPos,
                  O = this.awaitPos
                for (
                  this.yieldPos = 0, this.awaitPos = 0;
                  this.type !== Ot.parenR;

                ) {
                  if (
                    (I ? (I = !1) : this.expect(Ot.comma),
                    E && this.afterTrailingComma(Ot.parenR, !0))
                  ) {
                    A = !0
                    break
                  }
                  if (this.type === Ot.ellipsis) {
                    ;(R = this.start),
                      k.push(this.parseParenItem(this.parseRestBinding())),
                      this.type === Ot.comma &&
                        this.raise(
                          this.start,
                          'Comma is not permitted after the rest element'
                        )
                    break
                  }
                  k.push(this.parseMaybeAssign(!1, N, this.parseParenItem))
                }
                var T = this.start,
                  L = this.startLoc
                if (
                  (this.expect(Ot.parenR),
                  v && !this.canInsertSemicolon() && this.eat(Ot.arrow))
                )
                  return (
                    this.checkPatternErrors(N, !1),
                    this.checkYieldAwaitInDefaultParams(),
                    (this.yieldPos = C),
                    (this.awaitPos = O),
                    this.parseParenArrowList(y, x, k)
                  )
                ;(k.length && !A) || this.unexpected(this.lastTokStart),
                  R && this.unexpected(R),
                  this.checkExpressionErrors(N, !0),
                  (this.yieldPos = C || this.yieldPos),
                  (this.awaitPos = O || this.awaitPos),
                  k.length > 1
                    ? ((g = this.startNodeAt(_, P)),
                      (g.expressions = k),
                      this.finishNodeAt(g, 'SequenceExpression', T, L))
                    : (g = k[0])
              } else g = this.parseParenExpression()
              if (this.options.preserveParens) {
                var M = this.startNodeAt(y, x)
                return (
                  (M.expression = g),
                  this.finishNode(M, 'ParenthesizedExpression')
                )
              }
              return g
            }),
            (pr.parseParenItem = function (v) {
              return v
            }),
            (pr.parseParenArrowList = function (v, g, y) {
              return this.parseArrowExpression(this.startNodeAt(v, g), y)
            })
          var hr = []
          ;(pr.parseNew = function () {
            var v = this.startNode(),
              g = this.parseIdent(!0)
            if (this.options.ecmaVersion >= 6 && this.eat(Ot.dot)) {
              v.meta = g
              var y = this.containsEsc
              return (
                (v.property = this.parseIdent(!0)),
                ('target' !== v.property.name || y) &&
                  this.raiseRecoverable(
                    v.property.start,
                    'The only valid meta property for new is new.target'
                  ),
                this.inNonArrowFunction() ||
                  this.raiseRecoverable(
                    v.start,
                    'new.target can only be used in functions'
                  ),
                this.finishNode(v, 'MetaProperty')
              )
            }
            var x = this.start,
              E = this.startLoc
            return (
              (v.callee = this.parseSubscripts(this.parseExprAtom(), x, E, !0)),
              (v.arguments = this.eat(Ot.parenL)
                ? this.parseExprList(
                    Ot.parenR,
                    this.options.ecmaVersion >= 8,
                    !1
                  )
                : hr),
              this.finishNode(v, 'NewExpression')
            )
          }),
            (pr.parseTemplateElement = function ({ isTagged: v }) {
              var g = this.startNode()
              return (
                this.type === Ot.invalidTemplate
                  ? (v ||
                      this.raiseRecoverable(
                        this.start,
                        'Bad escape sequence in untagged template literal'
                      ),
                    (g.value = { raw: this.value, cooked: null }))
                  : (g.value = {
                      raw: this.input
                        .slice(this.start, this.end)
                        .replace(/\r\n?/g, '\n'),
                      cooked: this.value,
                    }),
                this.next(),
                (g.tail = this.type === Ot.backQuote),
                this.finishNode(g, 'TemplateElement')
              )
            }),
            (pr.parseTemplate = function ({ isTagged: v = !1 } = {}) {
              var g = this.startNode()
              this.next(), (g.expressions = [])
              var y = this.parseTemplateElement({ isTagged: v })
              for (g.quasis = [y]; !y.tail; )
                this.type === Ot.eof &&
                  this.raise(this.pos, 'Unterminated template literal'),
                  this.expect(Ot.dollarBraceL),
                  g.expressions.push(this.parseExpression()),
                  this.expect(Ot.braceR),
                  g.quasis.push(
                    (y = this.parseTemplateElement({ isTagged: v }))
                  )
              return this.next(), this.finishNode(g, 'TemplateLiteral')
            }),
            (pr.isAsyncProp = function (v) {
              return (
                !v.computed &&
                'Identifier' === v.key.type &&
                'async' === v.key.name &&
                (this.type === Ot.name ||
                  this.type === Ot.num ||
                  this.type === Ot.string ||
                  this.type === Ot.bracketL ||
                  this.type.keyword ||
                  (this.options.ecmaVersion >= 9 && this.type === Ot.star)) &&
                !Ht.test(this.input.slice(this.lastTokEnd, this.start))
              )
            }),
            (pr.parseObj = function (v, g) {
              var y = this.startNode(),
                x = !0,
                E = {}
              for (y.properties = [], this.next(); !this.eat(Ot.braceR); ) {
                if (x) x = !1
                else if (
                  (this.expect(Ot.comma), this.afterTrailingComma(Ot.braceR))
                )
                  break
                var R = this.parseProperty(v, g)
                v || this.checkPropClash(R, E, g), y.properties.push(R)
              }
              return this.finishNode(
                y,
                v ? 'ObjectPattern' : 'ObjectExpression'
              )
            }),
            (pr.parseProperty = function (v, g) {
              var y,
                x,
                E,
                R,
                _ = this.startNode()
              if (this.options.ecmaVersion >= 9 && this.eat(Ot.ellipsis))
                return v
                  ? ((_.argument = this.parseIdent(!1)),
                    this.type === Ot.comma &&
                      this.raise(
                        this.start,
                        'Comma is not permitted after the rest element'
                      ),
                    this.finishNode(_, 'RestElement'))
                  : (this.type === Ot.parenL &&
                      g &&
                      (g.parenthesizedAssign < 0 &&
                        (g.parenthesizedAssign = this.start),
                      g.parenthesizedBind < 0 &&
                        (g.parenthesizedBind = this.start)),
                    (_.argument = this.parseMaybeAssign(!1, g)),
                    this.type === Ot.comma &&
                      g &&
                      g.trailingComma < 0 &&
                      (g.trailingComma = this.start),
                    this.finishNode(_, 'SpreadElement'))
              this.options.ecmaVersion >= 6 &&
                ((_.method = !1),
                (_.shorthand = !1),
                (v || g) && ((E = this.start), (R = this.startLoc)),
                v || (y = this.eat(Ot.star)))
              var P = this.containsEsc
              return (
                this.parsePropertyName(_),
                !v &&
                !P &&
                this.options.ecmaVersion >= 8 &&
                !y &&
                this.isAsyncProp(_)
                  ? ((x = !0),
                    (y = this.options.ecmaVersion >= 9 && this.eat(Ot.star)),
                    this.parsePropertyName(_, g))
                  : (x = !1),
                this.parsePropertyValue(_, v, y, x, E, R, g, P),
                this.finishNode(_, 'Property')
              )
            }),
            (pr.parsePropertyValue = function (v, g, y, x, E, R, _, P) {
              if (
                ((y || x) && this.type === Ot.colon && this.unexpected(),
                this.eat(Ot.colon))
              )
                (v.value = g
                  ? this.parseMaybeDefault(this.start, this.startLoc)
                  : this.parseMaybeAssign(!1, _)),
                  (v.kind = 'init')
              else if (this.options.ecmaVersion >= 6 && this.type === Ot.parenL)
                g && this.unexpected(),
                  (v.kind = 'init'),
                  (v.method = !0),
                  (v.value = this.parseMethod(y, x))
              else if (
                g ||
                P ||
                !(this.options.ecmaVersion >= 5) ||
                v.computed ||
                'Identifier' !== v.key.type ||
                ('get' !== v.key.name && 'set' !== v.key.name) ||
                this.type === Ot.comma ||
                this.type === Ot.braceR
              )
                this.options.ecmaVersion >= 6 &&
                !v.computed &&
                'Identifier' === v.key.type
                  ? ((y || x) && this.unexpected(),
                    this.checkUnreserved(v.key),
                    'await' !== v.key.name ||
                      this.awaitIdentPos ||
                      (this.awaitIdentPos = E),
                    (v.kind = 'init'),
                    g
                      ? (v.value = this.parseMaybeDefault(E, R, v.key))
                      : this.type === Ot.eq && _
                      ? (_.shorthandAssign < 0 &&
                          (_.shorthandAssign = this.start),
                        (v.value = this.parseMaybeDefault(E, R, v.key)))
                      : (v.value = v.key),
                    (v.shorthand = !0))
                  : this.unexpected()
              else {
                ;(y || x) && this.unexpected(),
                  (v.kind = v.key.name),
                  this.parsePropertyName(v),
                  (v.value = this.parseMethod(!1))
                var k = 'get' === v.kind ? 0 : 1
                if (v.value.params.length !== k) {
                  var I = v.value.start
                  this.raiseRecoverable(
                    I,
                    'get' === v.kind
                      ? 'getter should have no params'
                      : 'setter should have exactly one param'
                  )
                } else
                  'set' === v.kind &&
                    'RestElement' === v.value.params[0].type &&
                    this.raiseRecoverable(
                      v.value.params[0].start,
                      'Setter cannot use rest params'
                    )
              }
            }),
            (pr.parsePropertyName = function (v) {
              if (this.options.ecmaVersion >= 6) {
                if (this.eat(Ot.bracketL))
                  return (
                    (v.computed = !0),
                    (v.key = this.parseMaybeAssign()),
                    this.expect(Ot.bracketR),
                    v.key
                  )
                v.computed = !1
              }
              return (v.key =
                this.type === Ot.num || this.type === Ot.string
                  ? this.parseExprAtom()
                  : this.parseIdent(!0))
            }),
            (pr.initFunction = function (v) {
              ;(v.id = null),
                this.options.ecmaVersion >= 6 &&
                  (v.generator = v.expression = !1),
                this.options.ecmaVersion >= 8 && (v.async = !1)
            }),
            (pr.parseMethod = function (v, g, y) {
              var x = this.startNode(),
                E = this.yieldPos,
                R = this.awaitPos,
                _ = this.awaitIdentPos
              return (
                this.initFunction(x),
                this.options.ecmaVersion >= 6 && (x.generator = v),
                this.options.ecmaVersion >= 8 && (x.async = !!g),
                (this.yieldPos = 0),
                (this.awaitPos = 0),
                (this.awaitIdentPos = 0),
                this.enterScope(yt(g, x.generator) | or | (y ? ur : 0)),
                this.expect(Ot.parenL),
                (x.params = this.parseBindingList(
                  Ot.parenR,
                  !1,
                  this.options.ecmaVersion >= 8
                )),
                this.checkYieldAwaitInDefaultParams(),
                this.parseFunctionBody(x, !1, !0),
                (this.yieldPos = E),
                (this.awaitPos = R),
                (this.awaitIdentPos = _),
                this.finishNode(x, 'FunctionExpression')
              )
            }),
            (pr.parseArrowExpression = function (v, g, y) {
              var x = this.yieldPos,
                E = this.awaitPos,
                R = this.awaitIdentPos
              return (
                this.enterScope(16 | yt(y, !1)),
                this.initFunction(v),
                this.options.ecmaVersion >= 8 && (v.async = !!y),
                (this.yieldPos = 0),
                (this.awaitPos = 0),
                (this.awaitIdentPos = 0),
                (v.params = this.toAssignableList(g, !0)),
                this.parseFunctionBody(v, !0, !1),
                (this.yieldPos = x),
                (this.awaitPos = E),
                (this.awaitIdentPos = R),
                this.finishNode(v, 'ArrowFunctionExpression')
              )
            }),
            (pr.parseFunctionBody = function (v, g, y) {
              var x = g && this.type !== Ot.braceL,
                E = this.strict,
                R = !1
              if (x)
                (v.body = this.parseMaybeAssign()),
                  (v.expression = !0),
                  this.checkParams(v, !1)
              else {
                var _ =
                  this.options.ecmaVersion >= 7 &&
                  !this.isSimpleParamList(v.params)
                ;(E && !_) ||
                  ((R = this.strictDirective(this.end)),
                  R &&
                    _ &&
                    this.raiseRecoverable(
                      v.start,
                      "Illegal 'use strict' directive in function with non-simple parameter list"
                    ))
                var P = this.labels
                ;(this.labels = []),
                  R && (this.strict = !0),
                  this.checkParams(
                    v,
                    !E && !R && !g && !y && this.isSimpleParamList(v.params)
                  ),
                  (v.body = this.parseBlock(!1)),
                  (v.expression = !1),
                  this.adaptDirectivePrologue(v.body.body),
                  (this.labels = P)
              }
              this.exitScope(),
                this.strict && v.id && this.checkLVal(v.id, 5),
                (this.strict = E)
            }),
            (pr.isSimpleParamList = function (v) {
              for (var g = 0, y = null == v ? 0 : v.length; g < y; g++) {
                var x = v[g]
                if ('Identifier' !== x.type) return !1
              }
              return !0
            }),
            (pr.checkParams = function (v, g) {
              for (
                var y = {}, x = 0, E = v.params, R = null == E ? 0 : E.length;
                x < R;
                x++
              ) {
                var _ = E[x]
                this.checkLVal(_, 1, g ? null : y)
              }
            }),
            (pr.parseExprList = function (v, g, y, x) {
              for (var E = [], R = !0; !this.eat(v); ) {
                if (R) R = !1
                else if (
                  (this.expect(Ot.comma), g && this.afterTrailingComma(v))
                )
                  break
                var _ = void 0
                y && this.type === Ot.comma
                  ? (_ = null)
                  : this.type === Ot.ellipsis
                  ? ((_ = this.parseSpread(x)),
                    x &&
                      this.type === Ot.comma &&
                      x.trailingComma < 0 &&
                      (x.trailingComma = this.start))
                  : (_ = this.parseMaybeAssign(!1, x)),
                  E.push(_)
              }
              return E
            }),
            (pr.checkUnreserved = function ({ start: v, end: g, name: y }) {
              if (
                (this.inGenerator &&
                  'yield' === y &&
                  this.raiseRecoverable(
                    v,
                    "Cannot use 'yield' as identifier inside a generator"
                  ),
                this.inAsync &&
                  'await' === y &&
                  this.raiseRecoverable(
                    v,
                    "Cannot use 'await' as identifier inside an async function"
                  ),
                this.keywords.test(y) &&
                  this.raise(v, `Unexpected keyword '${y}'`),
                !(
                  this.options.ecmaVersion < 6 &&
                  -1 !== this.input.slice(v, g).indexOf('\\')
                ))
              ) {
                var x = this.strict
                  ? this.reservedWordsStrict
                  : this.reservedWords
                x.test(y) &&
                  (this.inAsync ||
                    'await' !== y ||
                    this.raiseRecoverable(
                      v,
                      "Cannot use keyword 'await' outside an async function"
                    ),
                  this.raiseRecoverable(v, `The keyword '${y}' is reserved`))
              }
            }),
            (pr.parseIdent = function (v, g) {
              var y = this.startNode()
              return (
                v && 'never' === this.options.allowReserved && (v = !1),
                this.type === Ot.name
                  ? (y.name = this.value)
                  : this.type.keyword
                  ? ((y.name = this.type.keyword),
                    ('class' !== y.name && 'function' !== y.name) ||
                      (this.lastTokEnd === this.lastTokStart + 1 &&
                        46 === this.input.charCodeAt(this.lastTokStart)) ||
                      this.context.pop())
                  : this.unexpected(),
                this.next(),
                this.finishNode(y, 'Identifier'),
                v ||
                  (this.checkUnreserved(y),
                  'await' !== y.name ||
                    this.awaitIdentPos ||
                    (this.awaitIdentPos = y.start)),
                y
              )
            }),
            (pr.parseYield = function (v) {
              this.yieldPos || (this.yieldPos = this.start)
              var g = this.startNode()
              return (
                this.next(),
                this.type === Ot.semi ||
                this.canInsertSemicolon() ||
                (this.type !== Ot.star && !this.type.startsExpr)
                  ? ((g.delegate = !1), (g.argument = null))
                  : ((g.delegate = this.eat(Ot.star)),
                    (g.argument = this.parseMaybeAssign(v))),
                this.finishNode(g, 'YieldExpression')
              )
            }),
            (pr.parseAwait = function () {
              this.awaitPos || (this.awaitPos = this.start)
              var v = this.startNode()
              return (
                this.next(),
                (v.argument = this.parseMaybeUnary(null, !0)),
                this.finishNode(v, 'AwaitExpression')
              )
            })
          var fr = xt.prototype
          ;(fr.raise = function (v, g) {
            var y = lt(this.input, v)
            g += ' (' + y.line + ':' + y.column + ')'
            var x = new SyntaxError(g)
            throw ((x.pos = v), (x.loc = y), (x.raisedAt = this.pos), x)
          }),
            (fr.raiseRecoverable = fr.raise),
            (fr.curPosition = function () {
              if (this.options.locations)
                return new ot(this.curLine, this.pos - this.lineStart)
            })
          var dr = xt.prototype
          ;(dr.toAssignable = function (v, g, y) {
            if (this.options.ecmaVersion >= 6 && v)
              switch (v.type) {
                case 'Identifier':
                  this.inAsync &&
                    'await' === v.name &&
                    this.raise(
                      v.start,
                      "Cannot use 'await' as identifier inside an async function"
                    )
                  break
                case 'ObjectPattern':
                case 'ArrayPattern':
                case 'RestElement':
                  break
                case 'ObjectExpression':
                  ;(v.type = 'ObjectPattern'),
                    y && this.checkPatternErrors(y, !0)
                  for (
                    var x = 0, E = v.properties, R = null == E ? 0 : E.length;
                    x < R;
                    x++
                  ) {
                    var _ = E[x]
                    this.toAssignable(_, g),
                      'RestElement' !== _.type ||
                        ('ArrayPattern' !== _.argument.type &&
                          'ObjectPattern' !== _.argument.type) ||
                        this.raise(_.argument.start, 'Unexpected token')
                  }
                  break
                case 'Property':
                  'init' !== v.kind &&
                    this.raise(
                      v.key.start,
                      "Object pattern can't contain getter or setter"
                    ),
                    this.toAssignable(v.value, g)
                  break
                case 'ArrayExpression':
                  ;(v.type = 'ArrayPattern'),
                    y && this.checkPatternErrors(y, !0),
                    this.toAssignableList(v.elements, g)
                  break
                case 'SpreadElement':
                  ;(v.type = 'RestElement'),
                    this.toAssignable(v.argument, g),
                    'AssignmentPattern' === v.argument.type &&
                      this.raise(
                        v.argument.start,
                        'Rest elements cannot have a default value'
                      )
                  break
                case 'AssignmentExpression':
                  '=' !== v.operator &&
                    this.raise(
                      v.left.end,
                      "Only '=' operator can be used for specifying default value."
                    ),
                    (v.type = 'AssignmentPattern'),
                    delete v.operator,
                    this.toAssignable(v.left, g)
                case 'AssignmentPattern':
                  break
                case 'ParenthesizedExpression':
                  this.toAssignable(v.expression, g, y)
                  break
                case 'MemberExpression':
                  if (!g) break
                default:
                  this.raise(v.start, 'Assigning to rvalue')
              }
            else y && this.checkPatternErrors(y, !0)
            return v
          }),
            (dr.toAssignableList = function (v, g) {
              for (var y = v.length, x = 0; x < y; x++) {
                var E = v[x]
                E && this.toAssignable(E, g)
              }
              if (y) {
                var R = v[y - 1]
                6 === this.options.ecmaVersion &&
                  g &&
                  R &&
                  'RestElement' === R.type &&
                  'Identifier' !== R.argument.type &&
                  this.unexpected(R.argument.start)
              }
              return v
            }),
            (dr.parseSpread = function (v) {
              var g = this.startNode()
              return (
                this.next(),
                (g.argument = this.parseMaybeAssign(!1, v)),
                this.finishNode(g, 'SpreadElement')
              )
            }),
            (dr.parseRestBinding = function () {
              var v = this.startNode()
              return (
                this.next(),
                6 === this.options.ecmaVersion &&
                  this.type !== Ot.name &&
                  this.unexpected(),
                (v.argument = this.parseBindingAtom()),
                this.finishNode(v, 'RestElement')
              )
            }),
            (dr.parseBindingAtom = function () {
              if (this.options.ecmaVersion >= 6)
                switch (this.type) {
                  case Ot.bracketL:
                    var v = this.startNode()
                    return (
                      this.next(),
                      (v.elements = this.parseBindingList(Ot.bracketR, !0, !0)),
                      this.finishNode(v, 'ArrayPattern')
                    )
                  case Ot.braceL:
                    return this.parseObj(!0)
                }
              return this.parseIdent()
            }),
            (dr.parseBindingList = function (v, g, y) {
              for (var x = [], E = !0; !this.eat(v); )
                if (
                  (E ? (E = !1) : this.expect(Ot.comma),
                  g && this.type === Ot.comma)
                )
                  x.push(null)
                else {
                  if (y && this.afterTrailingComma(v)) break
                  if (this.type === Ot.ellipsis) {
                    var R = this.parseRestBinding()
                    this.parseBindingListItem(R),
                      x.push(R),
                      this.type === Ot.comma &&
                        this.raise(
                          this.start,
                          'Comma is not permitted after the rest element'
                        ),
                      this.expect(v)
                    break
                  }
                  var _ = this.parseMaybeDefault(this.start, this.startLoc)
                  this.parseBindingListItem(_), x.push(_)
                }
              return x
            }),
            (dr.parseBindingListItem = function (v) {
              return v
            }),
            (dr.parseMaybeDefault = function (v, g, y) {
              if (
                ((y = y || this.parseBindingAtom()),
                this.options.ecmaVersion < 6 || !this.eat(Ot.eq))
              )
                return y
              var x = this.startNodeAt(v, g)
              return (
                (x.left = y),
                (x.right = this.parseMaybeAssign()),
                this.finishNode(x, 'AssignmentPattern')
              )
            }),
            (dr.checkLVal = function (v, g = 0, y) {
              switch (v.type) {
                case 'Identifier':
                  this.strict &&
                    this.reservedWordsStrictBind.test(v.name) &&
                    this.raiseRecoverable(
                      v.start,
                      (g ? 'Binding ' : 'Assigning to ') +
                        v.name +
                        ' in strict mode'
                    ),
                    y &&
                      (nt(y, v.name) &&
                        this.raiseRecoverable(v.start, 'Argument name clash'),
                      (y[v.name] = !0)),
                    0 !== g && 5 !== g && this.declareName(v.name, g, v.start)
                  break
                case 'MemberExpression':
                  g &&
                    this.raiseRecoverable(v.start, 'Binding member expression')
                  break
                case 'ObjectPattern':
                  for (
                    var x = 0, E = v.properties, R = null == E ? 0 : E.length;
                    x < R;
                    x++
                  ) {
                    var _ = E[x]
                    this.checkLVal(_, g, y)
                  }
                  break
                case 'Property':
                  this.checkLVal(v.value, g, y)
                  break
                case 'ArrayPattern':
                  for (
                    var P = 0, k = v.elements, I = null == k ? 0 : k.length;
                    P < I;
                    P++
                  ) {
                    var A = k[P]
                    A && this.checkLVal(A, g, y)
                  }
                  break
                case 'AssignmentPattern':
                  this.checkLVal(v.left, g, y)
                  break
                case 'RestElement':
                  this.checkLVal(v.argument, g, y)
                  break
                case 'ParenthesizedExpression':
                  this.checkLVal(v.expression, g, y)
                  break
                default:
                  this.raise(
                    v.start,
                    (g ? 'Binding' : 'Assigning to') + ' rvalue'
                  )
              }
            })
          class kt {
            constructor(v, g, y) {
              ;(this.type = ''),
                (this.start = g),
                (this.end = 0),
                v.options.locations && (this.loc = new ut(v, y)),
                v.options.directSourceFile &&
                  (this.sourceFile = v.options.directSourceFile),
                v.options.ranges && (this.range = [g, 0])
            }
          }
          var mr = xt.prototype
          function At(v, g, y, x) {
            return (
              (v.type = g),
              (v.end = y),
              this.options.locations && (v.loc.end = x),
              this.options.ranges && (v.range[1] = y),
              v
            )
          }
          ;(mr.startNode = function () {
            return new kt(this, this.start, this.startLoc)
          }),
            (mr.startNodeAt = function (v, g) {
              return new kt(this, v, g)
            }),
            (mr.finishNode = function (v, g) {
              return At.call(this, v, g, this.lastTokEnd, this.lastTokEndLoc)
            }),
            (mr.finishNodeAt = function (v, g, y, x) {
              return At.call(this, v, g, y, x)
            })
          var vr = xt.prototype
          class Ct {
            constructor(v) {
              ;(this.flags = v),
                (this.var = []),
                (this.lexical = []),
                (this.functions = [])
            }
          }
          ;(vr.enterScope = function (v) {
            this.scopeStack.push(new Ct(v))
          }),
            (vr.exitScope = function () {
              this.scopeStack.pop()
            }),
            (vr.treatFunctionsAsVarInScope = function (v) {
              return v.flags & ir || (!this.inModule && v.flags & rr)
            }),
            (vr.declareName = function (v, g, y) {
              var x = !1
              if (2 === g) {
                var E = this.currentScope()
                ;(x =
                  E.lexical.indexOf(v) > -1 ||
                  E.functions.indexOf(v) > -1 ||
                  E.var.indexOf(v) > -1),
                  E.lexical.push(v),
                  this.inModule &&
                    E.flags & rr &&
                    delete this.undefinedExports[v]
              } else if (4 === g) {
                var R = this.currentScope()
                R.lexical.push(v)
              } else if (3 === g) {
                var _ = this.currentScope()
                ;(x = this.treatFunctionsAsVar
                  ? _.lexical.indexOf(v) > -1
                  : _.lexical.indexOf(v) > -1 || _.var.indexOf(v) > -1),
                  _.functions.push(v)
              } else
                for (var P = this.scopeStack.length - 1; P >= 0; --P) {
                  var k = this.scopeStack[P]
                  if (
                    (k.lexical.indexOf(v) > -1 &&
                      !(32 & k.flags && k.lexical[0] === v)) ||
                    (!this.treatFunctionsAsVarInScope(k) &&
                      k.functions.indexOf(v) > -1)
                  ) {
                    x = !0
                    break
                  }
                  if (
                    (k.var.push(v),
                    this.inModule &&
                      k.flags & rr &&
                      delete this.undefinedExports[v],
                    k.flags & nr)
                  )
                    break
                }
              x &&
                this.raiseRecoverable(
                  y,
                  `Identifier '${v}' has already been declared`
                )
            }),
            (vr.checkLocalExport = function (v) {
              ;-1 === this.scopeStack[0].lexical.indexOf(v.name) &&
                -1 === this.scopeStack[0].var.indexOf(v.name) &&
                (this.undefinedExports[v.name] = v)
            }),
            (vr.currentScope = function () {
              return this.scopeStack[this.scopeStack.length - 1]
            }),
            (vr.currentVarScope = function () {
              for (var v = this.scopeStack.length - 1; ; v--) {
                var g = this.scopeStack[v]
                if (g.flags & nr) return g
              }
            }),
            (vr.currentThisScope = function () {
              for (var v = this.scopeStack.length - 1; ; v--) {
                var g = this.scopeStack[v]
                if (g.flags & nr && !(16 & g.flags)) return g
              }
            })
          var gr = xt.prototype
          gr.parseTopLevel = function (v) {
            var g = {}
            for (v.body || (v.body = []); this.type !== Ot.eof; ) {
              var y = this.parseStatement(null, !0, g)
              v.body.push(y)
            }
            if (this.inModule)
              for (
                var x = 0,
                  E = Object.keys(this.undefinedExports),
                  R = null == E ? 0 : E.length;
                x < R;
                x++
              ) {
                var _ = E[x]
                this.raiseRecoverable(
                  this.undefinedExports[_].start,
                  `Export '${_}' is not defined`
                )
              }
            return (
              this.adaptDirectivePrologue(v.body),
              this.next(),
              this.options.ecmaVersion >= 6 &&
                (v.sourceType = this.options.sourceType),
              this.finishNode(v, 'Program')
            )
          }
          var yr = { kind: 'loop' },
            xr = { kind: 'switch' }
          ;(gr.isLet = function (v) {
            if (this.options.ecmaVersion < 6 || !this.isContextual('let'))
              return !1
            Yt.lastIndex = this.pos
            var g = Yt.exec(this.input),
              y = this.pos + g[0].length,
              x = this.input.charCodeAt(y)
            if (91 === x) return !0
            if (v) return !1
            if (123 === x) return !0
            if (Ke(x, !0)) {
              for (var E = y + 1; Je(this.input.charCodeAt(E), !0); ) ++E
              var R = this.input.slice(y, E)
              if (!Dt.test(R)) return !0
            }
            return !1
          }),
            (gr.isAsyncFunction = function () {
              if (this.options.ecmaVersion < 8 || !this.isContextual('async'))
                return !1
              Yt.lastIndex = this.pos
              var v = Yt.exec(this.input),
                g = this.pos + v[0].length
              return !(
                Ht.test(this.input.slice(this.pos, g)) ||
                'function' !== this.input.slice(g, g + 8) ||
                (g + 8 !== this.input.length && Je(this.input.charAt(g + 8)))
              )
            }),
            (gr.parseStatement = function (v, g, y) {
              var x,
                E = this.type,
                R = this.startNode()
              switch ((this.isLet(v) && ((E = Ot._var), (x = 'let')), E)) {
                case Ot._break:
                case Ot._continue:
                  return this.parseBreakContinueStatement(R, E.keyword)
                case Ot._debugger:
                  return this.parseDebuggerStatement(R)
                case Ot._do:
                  return this.parseDoStatement(R)
                case Ot._for:
                  return this.parseForStatement(R)
                case Ot._function:
                  return (
                    v &&
                      (this.strict || ('if' !== v && 'label' !== v)) &&
                      this.options.ecmaVersion >= 6 &&
                      this.unexpected(),
                    this.parseFunctionStatement(R, !1, !v)
                  )
                case Ot._class:
                  return v && this.unexpected(), this.parseClass(R, !0)
                case Ot._if:
                  return this.parseIfStatement(R)
                case Ot._return:
                  return this.parseReturnStatement(R)
                case Ot._switch:
                  return this.parseSwitchStatement(R)
                case Ot._throw:
                  return this.parseThrowStatement(R)
                case Ot._try:
                  return this.parseTryStatement(R)
                case Ot._const:
                case Ot._var:
                  return (
                    (x = x || this.value),
                    v && 'var' !== x && this.unexpected(),
                    this.parseVarStatement(R, x)
                  )
                case Ot._while:
                  return this.parseWhileStatement(R)
                case Ot._with:
                  return this.parseWithStatement(R)
                case Ot.braceL:
                  return this.parseBlock(!0, R)
                case Ot.semi:
                  return this.parseEmptyStatement(R)
                case Ot._export:
                case Ot._import:
                  return (
                    this.options.allowImportExportEverywhere ||
                      (g ||
                        this.raise(
                          this.start,
                          "'import' and 'export' may only appear at the top level"
                        ),
                      this.inModule ||
                        this.raise(
                          this.start,
                          "'import' and 'export' may appear only with 'sourceType: module'"
                        )),
                    E === Ot._import
                      ? this.parseImport(R)
                      : this.parseExport(R, y)
                  )
                default:
                  if (this.isAsyncFunction())
                    return (
                      v && this.unexpected(),
                      this.next(),
                      this.parseFunctionStatement(R, !0, !v)
                    )
                  var _ = this.value,
                    P = this.parseExpression()
                  return E === Ot.name &&
                    'Identifier' === P.type &&
                    this.eat(Ot.colon)
                    ? this.parseLabeledStatement(R, _, P, v)
                    : this.parseExpressionStatement(R, P)
              }
            }),
            (gr.parseBreakContinueStatement = function (v, g) {
              var y = 'break' === g
              this.next(),
                this.eat(Ot.semi) || this.insertSemicolon()
                  ? (v.label = null)
                  : this.type !== Ot.name
                  ? this.unexpected()
                  : ((v.label = this.parseIdent()), this.semicolon())
              for (var x = 0; x < this.labels.length; ++x) {
                var E = this.labels[x]
                if (null == v.label || E.name === v.label.name) {
                  if (null != E.kind && (y || 'loop' === E.kind)) break
                  if (v.label && y) break
                }
              }
              return (
                x === this.labels.length &&
                  this.raise(v.start, 'Unsyntactic ' + g),
                this.finishNode(v, y ? 'BreakStatement' : 'ContinueStatement')
              )
            }),
            (gr.parseDebuggerStatement = function (v) {
              return (
                this.next(),
                this.semicolon(),
                this.finishNode(v, 'DebuggerStatement')
              )
            }),
            (gr.parseDoStatement = function (v) {
              return (
                this.next(),
                this.labels.push(yr),
                (v.body = this.parseStatement('do')),
                this.labels.pop(),
                this.expect(Ot._while),
                (v.test = this.parseParenExpression()),
                this.options.ecmaVersion >= 6
                  ? this.eat(Ot.semi)
                  : this.semicolon(),
                this.finishNode(v, 'DoWhileStatement')
              )
            }),
            (gr.parseForStatement = function (v) {
              this.next()
              var g =
                this.options.ecmaVersion >= 9 &&
                (this.inAsync ||
                  (!this.inFunction &&
                    this.options.allowAwaitOutsideFunction)) &&
                this.eatContextual('await')
                  ? this.lastTokStart
                  : -1
              if (
                (this.labels.push(yr),
                this.enterScope(0),
                this.expect(Ot.parenL),
                this.type === Ot.semi)
              )
                return g > -1 && this.unexpected(g), this.parseFor(v, null)
              var y = this.isLet()
              if (this.type === Ot._var || this.type === Ot._const || y) {
                var x = this.startNode(),
                  E = y ? 'let' : this.value
                return (
                  this.next(),
                  this.parseVar(x, !0, E),
                  this.finishNode(x, 'VariableDeclaration'),
                  !(
                    this.type === Ot._in ||
                    (this.options.ecmaVersion >= 6 && this.isContextual('of'))
                  ) ||
                  1 !== x.declarations.length ||
                  ('var' !== E && x.declarations[0].init)
                    ? (g > -1 && this.unexpected(g), this.parseFor(v, x))
                    : (this.options.ecmaVersion >= 9 &&
                        (this.type === Ot._in
                          ? g > -1 && this.unexpected(g)
                          : (v.await = g > -1)),
                      this.parseForIn(v, x))
                )
              }
              var R = new Et(),
                _ = this.parseExpression(!0, R)
              return this.type === Ot._in ||
                (this.options.ecmaVersion >= 6 && this.isContextual('of'))
                ? (this.options.ecmaVersion >= 9 &&
                    (this.type === Ot._in
                      ? g > -1 && this.unexpected(g)
                      : (v.await = g > -1)),
                  this.toAssignable(_, !1, R),
                  this.checkLVal(_),
                  this.parseForIn(v, _))
                : (this.checkExpressionErrors(R, !0),
                  g > -1 && this.unexpected(g),
                  this.parseFor(v, _))
            }),
            (gr.parseFunctionStatement = function (v, g, y) {
              return (
                this.next(), this.parseFunction(v, wr | (y ? 0 : Er), !1, g)
              )
            }),
            (gr.parseIfStatement = function (v) {
              return (
                this.next(),
                (v.test = this.parseParenExpression()),
                (v.consequent = this.parseStatement('if')),
                (v.alternate = this.eat(Ot._else)
                  ? this.parseStatement('if')
                  : null),
                this.finishNode(v, 'IfStatement')
              )
            }),
            (gr.parseReturnStatement = function (v) {
              return (
                this.inFunction ||
                  this.options.allowReturnOutsideFunction ||
                  this.raise(this.start, "'return' outside of function"),
                this.next(),
                this.eat(Ot.semi) || this.insertSemicolon()
                  ? (v.argument = null)
                  : ((v.argument = this.parseExpression()), this.semicolon()),
                this.finishNode(v, 'ReturnStatement')
              )
            }),
            (gr.parseSwitchStatement = function (v) {
              var g
              this.next(),
                (v.discriminant = this.parseParenExpression()),
                (v.cases = []),
                this.expect(Ot.braceL),
                this.labels.push(xr),
                this.enterScope(0)
              for (var y = !1; this.type !== Ot.braceR; )
                if (this.type === Ot._case || this.type === Ot._default) {
                  var x = this.type === Ot._case
                  g && this.finishNode(g, 'SwitchCase'),
                    v.cases.push((g = this.startNode())),
                    (g.consequent = []),
                    this.next(),
                    x
                      ? (g.test = this.parseExpression())
                      : (y &&
                          this.raiseRecoverable(
                            this.lastTokStart,
                            'Multiple default clauses'
                          ),
                        (y = !0),
                        (g.test = null)),
                    this.expect(Ot.colon)
                } else
                  g || this.unexpected(),
                    g.consequent.push(this.parseStatement(null))
              return (
                this.exitScope(),
                g && this.finishNode(g, 'SwitchCase'),
                this.next(),
                this.labels.pop(),
                this.finishNode(v, 'SwitchStatement')
              )
            }),
            (gr.parseThrowStatement = function (v) {
              return (
                this.next(),
                Ht.test(this.input.slice(this.lastTokEnd, this.start)) &&
                  this.raise(this.lastTokEnd, 'Illegal newline after throw'),
                (v.argument = this.parseExpression()),
                this.semicolon(),
                this.finishNode(v, 'ThrowStatement')
              )
            })
          var br = []
          ;(gr.parseTryStatement = function (v) {
            if (
              (this.next(),
              (v.block = this.parseBlock()),
              (v.handler = null),
              this.type === Ot._catch)
            ) {
              var g = this.startNode()
              if ((this.next(), this.eat(Ot.parenL))) {
                g.param = this.parseBindingAtom()
                var y = 'Identifier' === g.param.type
                this.enterScope(y ? 32 : 0),
                  this.checkLVal(g.param, y ? 4 : 2),
                  this.expect(Ot.parenR)
              } else
                this.options.ecmaVersion < 10 && this.unexpected(),
                  (g.param = null),
                  this.enterScope(0)
              ;(g.body = this.parseBlock(!1)),
                this.exitScope(),
                (v.handler = this.finishNode(g, 'CatchClause'))
            }
            return (
              (v.finalizer = this.eat(Ot._finally) ? this.parseBlock() : null),
              v.handler ||
                v.finalizer ||
                this.raise(v.start, 'Missing catch or finally clause'),
              this.finishNode(v, 'TryStatement')
            )
          }),
            (gr.parseVarStatement = function (v, g) {
              return (
                this.next(),
                this.parseVar(v, !1, g),
                this.semicolon(),
                this.finishNode(v, 'VariableDeclaration')
              )
            }),
            (gr.parseWhileStatement = function (v) {
              return (
                this.next(),
                (v.test = this.parseParenExpression()),
                this.labels.push(yr),
                (v.body = this.parseStatement('while')),
                this.labels.pop(),
                this.finishNode(v, 'WhileStatement')
              )
            }),
            (gr.parseWithStatement = function (v) {
              return (
                this.strict && this.raise(this.start, "'with' in strict mode"),
                this.next(),
                (v.object = this.parseParenExpression()),
                (v.body = this.parseStatement('with')),
                this.finishNode(v, 'WithStatement')
              )
            }),
            (gr.parseEmptyStatement = function (v) {
              return this.next(), this.finishNode(v, 'EmptyStatement')
            }),
            (gr.parseLabeledStatement = function (v, g, y, x) {
              for (
                var E = 0, R = this.labels, _ = null == R ? 0 : R.length;
                E < _;
                E++
              ) {
                var P = R[E]
                P.name === g &&
                  this.raise(y.start, "Label '" + g + "' is already declared")
              }
              for (
                var k = this.type.isLoop
                    ? 'loop'
                    : this.type === Ot._switch
                    ? 'switch'
                    : null,
                  I = this.labels.length - 1;
                I >= 0;
                I--
              ) {
                var A = this.labels[I]
                if (A.statementStart !== v.start) break
                ;(A.statementStart = this.start), (A.kind = k)
              }
              return (
                this.labels.push({
                  name: g,
                  kind: k,
                  statementStart: this.start,
                }),
                (v.body = this.parseStatement(
                  x ? (-1 === x.indexOf('label') ? x + 'label' : x) : 'label'
                )),
                this.labels.pop(),
                (v.label = y),
                this.finishNode(v, 'LabeledStatement')
              )
            }),
            (gr.parseExpressionStatement = function (v, g) {
              return (
                (v.expression = g),
                this.semicolon(),
                this.finishNode(v, 'ExpressionStatement')
              )
            }),
            (gr.parseBlock = function (v = !0, g = this.startNode()) {
              for (
                g.body = [], this.expect(Ot.braceL), v && this.enterScope(0);
                !this.eat(Ot.braceR);

              ) {
                var y = this.parseStatement(null)
                g.body.push(y)
              }
              return v && this.exitScope(), this.finishNode(g, 'BlockStatement')
            }),
            (gr.parseFor = function (v, g) {
              return (
                (v.init = g),
                this.expect(Ot.semi),
                (v.test =
                  this.type === Ot.semi ? null : this.parseExpression()),
                this.expect(Ot.semi),
                (v.update =
                  this.type === Ot.parenR ? null : this.parseExpression()),
                this.expect(Ot.parenR),
                (v.body = this.parseStatement('for')),
                this.exitScope(),
                this.labels.pop(),
                this.finishNode(v, 'ForStatement')
              )
            }),
            (gr.parseForIn = function (v, g) {
              var y = this.type === Ot._in ? 'ForInStatement' : 'ForOfStatement'
              return (
                this.next(),
                'ForInStatement' === y &&
                  ('AssignmentPattern' === g.type ||
                    ('VariableDeclaration' === g.type &&
                      null != g.declarations[0].init &&
                      (this.strict ||
                        'Identifier' !== g.declarations[0].id.type))) &&
                  this.raise(g.start, 'Invalid assignment in for-in loop head'),
                (v.left = g),
                (v.right =
                  'ForInStatement' === y
                    ? this.parseExpression()
                    : this.parseMaybeAssign()),
                this.expect(Ot.parenR),
                (v.body = this.parseStatement('for')),
                this.exitScope(),
                this.labels.pop(),
                this.finishNode(v, y)
              )
            }),
            (gr.parseVar = function (v, g, y) {
              for (v.declarations = [], v.kind = y; ; ) {
                var x = this.startNode()
                if (
                  (this.parseVarId(x, y),
                  this.eat(Ot.eq)
                    ? (x.init = this.parseMaybeAssign(g))
                    : 'const' !== y ||
                      this.type === Ot._in ||
                      (this.options.ecmaVersion >= 6 && this.isContextual('of'))
                    ? 'Identifier' === x.id.type ||
                      (g && (this.type === Ot._in || this.isContextual('of')))
                      ? (x.init = null)
                      : this.raise(
                          this.lastTokEnd,
                          'Complex binding patterns require an initialization value'
                        )
                    : this.unexpected(),
                  v.declarations.push(this.finishNode(x, 'VariableDeclarator')),
                  !this.eat(Ot.comma))
                )
                  break
              }
              return v
            }),
            (gr.parseVarId = function (v, g) {
              ;('const' !== g && 'let' !== g) ||
                !this.isContextual('let') ||
                this.raiseRecoverable(
                  this.start,
                  'let is disallowed as a lexically bound name'
                ),
                (v.id = this.parseBindingAtom()),
                this.checkLVal(v.id, 'var' === g ? 1 : 2, !1)
            })
          var wr = 1,
            Er = 2
          ;(gr.parseFunction = function (v, g, y, x) {
            this.initFunction(v),
              (this.options.ecmaVersion >= 9 ||
                (this.options.ecmaVersion >= 6 && !x)) &&
                (this.type === Ot.star && g & Er && this.unexpected(),
                (v.generator = this.eat(Ot.star))),
              this.options.ecmaVersion >= 8 && (v.async = !!x),
              g & wr &&
                ((v.id =
                  4 & g && this.type !== Ot.name ? null : this.parseIdent()),
                !v.id ||
                  g & Er ||
                  this.checkLVal(
                    v.id,
                    this.strict || v.generator || v.async
                      ? this.treatFunctionsAsVar
                        ? 1
                        : 2
                      : 3
                  ))
            var E = this.yieldPos,
              R = this.awaitPos,
              _ = this.awaitIdentPos
            return (
              (this.yieldPos = 0),
              (this.awaitPos = 0),
              (this.awaitIdentPos = 0),
              this.enterScope(yt(v.async, v.generator)),
              g & wr ||
                (v.id = this.type === Ot.name ? this.parseIdent() : null),
              this.parseFunctionParams(v),
              this.parseFunctionBody(v, y, !1),
              (this.yieldPos = E),
              (this.awaitPos = R),
              (this.awaitIdentPos = _),
              this.finishNode(
                v,
                g & wr ? 'FunctionDeclaration' : 'FunctionExpression'
              )
            )
          }),
            (gr.parseFunctionParams = function (v) {
              this.expect(Ot.parenL),
                (v.params = this.parseBindingList(
                  Ot.parenR,
                  !1,
                  this.options.ecmaVersion >= 8
                )),
                this.checkYieldAwaitInDefaultParams()
            }),
            (gr.parseClass = function (v, g) {
              this.next()
              var y = this.strict
              ;(this.strict = !0),
                this.parseClassId(v, g),
                this.parseClassSuper(v)
              var x = this.startNode(),
                E = !1
              for (
                x.body = [], this.expect(Ot.braceL);
                !this.eat(Ot.braceR);

              ) {
                var R = this.parseClassElement(null !== v.superClass)
                R &&
                  (x.body.push(R),
                  'MethodDefinition' === R.type &&
                    'constructor' === R.kind &&
                    (E &&
                      this.raise(
                        R.start,
                        'Duplicate constructor in the same class'
                      ),
                    (E = !0)))
              }
              return (
                (v.body = this.finishNode(x, 'ClassBody')),
                (this.strict = y),
                this.finishNode(v, g ? 'ClassDeclaration' : 'ClassExpression')
              )
            }),
            (gr.parseClassElement = function (v) {
              var g = this
              if (this.eat(Ot.semi)) return null
              var y = this.startNode(),
                i = function (v, x = !1) {
                  var E = g.start,
                    R = g.startLoc
                  return !(
                    !g.eatContextual(v) ||
                    ((g.type === Ot.parenL || (x && g.canInsertSemicolon())) &&
                      (y.key && g.unexpected(),
                      (y.computed = !1),
                      (y.key = g.startNodeAt(E, R)),
                      (y.key.name = v),
                      g.finishNode(y.key, 'Identifier'),
                      1))
                  )
                }
              ;(y.kind = 'method'), (y.static = i('static'))
              var x = this.eat(Ot.star),
                E = !1
              x ||
                (this.options.ecmaVersion >= 8 && i('async', !0)
                  ? ((E = !0),
                    (x = this.options.ecmaVersion >= 9 && this.eat(Ot.star)))
                  : i('get')
                  ? (y.kind = 'get')
                  : i('set') && (y.kind = 'set')),
                y.key || this.parsePropertyName(y)
              var R = y.key,
                _ = !1
              return (
                y.computed ||
                y.static ||
                !(
                  ('Identifier' === R.type && 'constructor' === R.name) ||
                  ('Literal' === R.type && 'constructor' === R.value)
                )
                  ? y.static &&
                    'Identifier' === R.type &&
                    'prototype' === R.name &&
                    this.raise(
                      R.start,
                      'Classes may not have a static property named prototype'
                    )
                  : ('method' !== y.kind &&
                      this.raise(
                        R.start,
                        "Constructor can't have get/set modifier"
                      ),
                    x &&
                      this.raise(R.start, "Constructor can't be a generator"),
                    E &&
                      this.raise(
                        R.start,
                        "Constructor can't be an async method"
                      ),
                    (y.kind = 'constructor'),
                    (_ = v)),
                this.parseClassMethod(y, x, E, _),
                'get' === y.kind &&
                  0 !== y.value.params.length &&
                  this.raiseRecoverable(
                    y.value.start,
                    'getter should have no params'
                  ),
                'set' === y.kind &&
                  1 !== y.value.params.length &&
                  this.raiseRecoverable(
                    y.value.start,
                    'setter should have exactly one param'
                  ),
                'set' === y.kind &&
                  'RestElement' === y.value.params[0].type &&
                  this.raiseRecoverable(
                    y.value.params[0].start,
                    'Setter cannot use rest params'
                  ),
                y
              )
            }),
            (gr.parseClassMethod = function (v, g, y, x) {
              return (
                (v.value = this.parseMethod(g, y, x)),
                this.finishNode(v, 'MethodDefinition')
              )
            }),
            (gr.parseClassId = function (v, g) {
              this.type === Ot.name
                ? ((v.id = this.parseIdent()), g && this.checkLVal(v.id, 2, !1))
                : (!0 === g && this.unexpected(), (v.id = null))
            }),
            (gr.parseClassSuper = function (v) {
              v.superClass = this.eat(Ot._extends)
                ? this.parseExprSubscripts()
                : null
            }),
            (gr.parseExport = function (v, g) {
              if ((this.next(), this.eat(Ot.star)))
                return (
                  this.expectContextual('from'),
                  this.type !== Ot.string && this.unexpected(),
                  (v.source = this.parseExprAtom()),
                  this.semicolon(),
                  this.finishNode(v, 'ExportAllDeclaration')
                )
              if (this.eat(Ot._default)) {
                var y
                if (
                  (this.checkExport(g, 'default', this.lastTokStart),
                  this.type === Ot._function || (y = this.isAsyncFunction()))
                ) {
                  var x = this.startNode()
                  this.next(),
                    y && this.next(),
                    (v.declaration = this.parseFunction(x, 4 | wr, !1, y))
                } else if (this.type === Ot._class) {
                  var E = this.startNode()
                  v.declaration = this.parseClass(E, 'nullableID')
                } else
                  (v.declaration = this.parseMaybeAssign()), this.semicolon()
                return this.finishNode(v, 'ExportDefaultDeclaration')
              }
              if (this.shouldParseExportStatement())
                (v.declaration = this.parseStatement(null)),
                  'VariableDeclaration' === v.declaration.type
                    ? this.checkVariableExport(g, v.declaration.declarations)
                    : this.checkExport(
                        g,
                        v.declaration.id.name,
                        v.declaration.id.start
                      ),
                  (v.specifiers = []),
                  (v.source = null)
              else {
                if (
                  ((v.declaration = null),
                  (v.specifiers = this.parseExportSpecifiers(g)),
                  this.eatContextual('from'))
                )
                  this.type !== Ot.string && this.unexpected(),
                    (v.source = this.parseExprAtom())
                else {
                  for (
                    var R = 0, _ = v.specifiers, P = null == _ ? 0 : _.length;
                    R < P;
                    R++
                  ) {
                    var k = _[R]
                    this.checkUnreserved(k.local),
                      this.checkLocalExport(k.local)
                  }
                  v.source = null
                }
                this.semicolon()
              }
              return this.finishNode(v, 'ExportNamedDeclaration')
            }),
            (gr.checkExport = function (v, g, y) {
              v &&
                (nt(v, g) &&
                  this.raiseRecoverable(y, "Duplicate export '" + g + "'"),
                (v[g] = !0))
            }),
            (gr.checkPatternExport = function (v, g) {
              var y = g.type
              if ('Identifier' === y) this.checkExport(v, g.name, g.start)
              else if ('ObjectPattern' === y)
                for (
                  var x = 0, E = g.properties, R = null == E ? 0 : E.length;
                  x < R;
                  x++
                ) {
                  var _ = E[x]
                  this.checkPatternExport(v, _)
                }
              else if ('ArrayPattern' === y)
                for (
                  var P = 0, k = g.elements, I = null == k ? 0 : k.length;
                  P < I;
                  P++
                ) {
                  var A = k[P]
                  A && this.checkPatternExport(v, A)
                }
              else
                'Property' === y
                  ? this.checkPatternExport(v, g.value)
                  : 'AssignmentPattern' === y
                  ? this.checkPatternExport(v, g.left)
                  : 'RestElement' === y
                  ? this.checkPatternExport(v, g.argument)
                  : 'ParenthesizedExpression' === y &&
                    this.checkPatternExport(v, g.expression)
            }),
            (gr.checkVariableExport = function (v, g) {
              if (v)
                for (var y = 0, x = null == g ? 0 : g.length; y < x; y++) {
                  var E = g[y]
                  this.checkPatternExport(v, E.id)
                }
            }),
            (gr.shouldParseExportStatement = function () {
              return (
                'var' === this.type.keyword ||
                'const' === this.type.keyword ||
                'class' === this.type.keyword ||
                'function' === this.type.keyword ||
                this.isLet() ||
                this.isAsyncFunction()
              )
            }),
            (gr.parseExportSpecifiers = function (v) {
              var g = [],
                y = !0
              for (this.expect(Ot.braceL); !this.eat(Ot.braceR); ) {
                if (y) y = !1
                else if (
                  (this.expect(Ot.comma), this.afterTrailingComma(Ot.braceR))
                )
                  break
                var x = this.startNode()
                ;(x.local = this.parseIdent(!0)),
                  (x.exported = this.eatContextual('as')
                    ? this.parseIdent(!0)
                    : x.local),
                  this.checkExport(v, x.exported.name, x.exported.start),
                  g.push(this.finishNode(x, 'ExportSpecifier'))
              }
              return g
            }),
            (gr.parseImport = function (v) {
              return (
                this.next(),
                this.type === Ot.string
                  ? ((v.specifiers = br), (v.source = this.parseExprAtom()))
                  : ((v.specifiers = this.parseImportSpecifiers()),
                    this.expectContextual('from'),
                    (v.source =
                      this.type === Ot.string
                        ? this.parseExprAtom()
                        : this.unexpected())),
                this.semicolon(),
                this.finishNode(v, 'ImportDeclaration')
              )
            }),
            (gr.parseImportSpecifiers = function () {
              var v = [],
                g = !0
              if (this.type === Ot.name) {
                var y = this.startNode()
                if (
                  ((y.local = this.parseIdent()),
                  this.checkLVal(y.local, 2),
                  v.push(this.finishNode(y, 'ImportDefaultSpecifier')),
                  !this.eat(Ot.comma))
                )
                  return v
              }
              if (this.type === Ot.star) {
                var x = this.startNode()
                return (
                  this.next(),
                  this.expectContextual('as'),
                  (x.local = this.parseIdent()),
                  this.checkLVal(x.local, 2),
                  v.push(this.finishNode(x, 'ImportNamespaceSpecifier')),
                  v
                )
              }
              for (this.expect(Ot.braceL); !this.eat(Ot.braceR); ) {
                if (g) g = !1
                else if (
                  (this.expect(Ot.comma), this.afterTrailingComma(Ot.braceR))
                )
                  break
                var E = this.startNode()
                ;(E.imported = this.parseIdent(!0)),
                  this.eatContextual('as')
                    ? (E.local = this.parseIdent())
                    : (this.checkUnreserved(E.imported),
                      (E.local = E.imported)),
                  this.checkLVal(E.local, 2),
                  v.push(this.finishNode(E, 'ImportSpecifier'))
              }
              return v
            }),
            (gr.adaptDirectivePrologue = function (v) {
              for (
                var g = 0;
                g < v.length && this.isDirectiveCandidate(v[g]);
                ++g
              )
                v[g].directive = v[g].expression.raw.slice(1, -1)
            }),
            (gr.isDirectiveCandidate = function (v) {
              return (
                'ExpressionStatement' === v.type &&
                'Literal' === v.expression.type &&
                'string' == typeof v.expression.value &&
                ('"' === this.input[v.start] || "'" === this.input[v.start])
              )
            })
          class jt {
            constructor(v, g, y, x, E) {
              ;(this.token = v),
                (this.isExpr = !!g),
                (this.preserveSpace = !!y),
                (this.override = x),
                (this.generator = !!E)
            }
          }
          var Sr = {
              b_stat: new jt('{', !1),
              b_expr: new jt('{', !0),
              b_tmpl: new jt('${', !1),
              p_stat: new jt('(', !1),
              p_expr: new jt('(', !0),
              q_tmpl: new jt('`', !0, !0, function (v) {
                return v.tryReadTemplateToken()
              }),
              f_stat: new jt('function', !1),
              f_expr: new jt('function', !0),
              f_expr_gen: new jt('function', !0, !1, null, !0),
              f_gen: new jt('function', !1, !1, null, !0),
            },
            Rr = xt.prototype
          ;(Rr.initialContext = function () {
            return [Sr.b_stat]
          }),
            (Rr.braceIsBlock = function (v) {
              var g = this.curContext()
              return (
                g === Sr.f_expr ||
                g === Sr.f_stat ||
                (v !== Ot.colon || (g !== Sr.b_stat && g !== Sr.b_expr)
                  ? v === Ot._return || (v === Ot.name && this.exprAllowed)
                    ? Ht.test(this.input.slice(this.lastTokEnd, this.start))
                    : v === Ot._else ||
                      v === Ot.semi ||
                      v === Ot.eof ||
                      v === Ot.parenR ||
                      v === Ot.arrow ||
                      (v === Ot.braceL
                        ? g === Sr.b_stat
                        : v !== Ot._var &&
                          v !== Ot._const &&
                          v !== Ot.name &&
                          !this.exprAllowed)
                  : !g.isExpr)
              )
            }),
            (Rr.inGeneratorContext = function () {
              for (var v = this.context.length - 1; v >= 1; v--) {
                var g = this.context[v]
                if ('function' === g.token) return g.generator
              }
              return !1
            }),
            (Rr.updateContext = function (v) {
              var g,
                y = this.type
              y.keyword && v === Ot.dot
                ? (this.exprAllowed = !1)
                : (g = y.updateContext)
                ? g.call(this, v)
                : (this.exprAllowed = y.beforeExpr)
            }),
            (Ot.parenR.updateContext = Ot.braceR.updateContext =
              function () {
                if (1 !== this.context.length) {
                  var v = this.context.pop()
                  v === Sr.b_stat &&
                    'function' === this.curContext().token &&
                    (v = this.context.pop()),
                    (this.exprAllowed = !v.isExpr)
                } else this.exprAllowed = !0
              }),
            (Ot.braceL.updateContext = function (v) {
              this.context.push(this.braceIsBlock(v) ? Sr.b_stat : Sr.b_expr),
                (this.exprAllowed = !0)
            }),
            (Ot.dollarBraceL.updateContext = function () {
              this.context.push(Sr.b_tmpl), (this.exprAllowed = !0)
            }),
            (Ot.parenL.updateContext = function (v) {
              var g =
                v === Ot._if ||
                v === Ot._for ||
                v === Ot._with ||
                v === Ot._while
              this.context.push(g ? Sr.p_stat : Sr.p_expr),
                (this.exprAllowed = !0)
            }),
            (Ot.incDec.updateContext = function () {}),
            (Ot._function.updateContext = Ot._class.updateContext =
              function (v) {
                !v.beforeExpr ||
                v === Ot.semi ||
                v === Ot._else ||
                (v === Ot._return &&
                  Ht.test(this.input.slice(this.lastTokEnd, this.start))) ||
                ((v === Ot.colon || v === Ot.braceL) &&
                  this.curContext() === Sr.b_stat)
                  ? this.context.push(Sr.f_stat)
                  : this.context.push(Sr.f_expr),
                  (this.exprAllowed = !1)
              }),
            (Ot.backQuote.updateContext = function () {
              this.curContext() === Sr.q_tmpl
                ? this.context.pop()
                : this.context.push(Sr.q_tmpl),
                (this.exprAllowed = !1)
            }),
            (Ot.star.updateContext = function (v) {
              if (v === Ot._function) {
                var g = this.context.length - 1
                this.context[g] =
                  this.context[g] === Sr.f_expr ? Sr.f_expr_gen : Sr.f_gen
              }
              this.exprAllowed = !0
            }),
            (Ot.name.updateContext = function (v) {
              var g = !1
              this.options.ecmaVersion >= 6 &&
                v !== Ot.dot &&
                (('of' === this.value && !this.exprAllowed) ||
                  ('yield' === this.value && this.inGeneratorContext())) &&
                (g = !0),
                (this.exprAllowed = g)
            })
          class Bt {
            reset() {}
          }
          class Ut {
            constructor(v) {
              ;(this.type = v.type),
                (this.value = v.value),
                (this.start = v.start),
                (this.end = v.end),
                v.options.locations &&
                  (this.loc = new ut(v, v.startLoc, v.endLoc)),
                v.options.ranges && (this.range = [v.start, v.end])
            }
          }
          var _r = xt.prototype
          function qt(v) {
            return v <= 65535
              ? String.fromCharCode(v)
              : ((v -= 65536),
                String.fromCharCode(55296 + (v >> 10), 56320 + (1023 & v)))
          }
          ;(_r.next = function () {
            this.options.onToken && this.options.onToken(new Ut(this)),
              (this.lastTokEnd = this.end),
              (this.lastTokStart = this.start),
              (this.lastTokEndLoc = this.endLoc),
              (this.lastTokStartLoc = this.startLoc),
              this.nextToken()
          }),
            (_r.getToken = function () {
              return this.next(), new Ut(this)
            }),
            'undefined' != typeof Symbol &&
              (_r[Symbol.iterator] = function () {
                var v = this
                return {
                  next: function () {
                    var g = v.getToken()
                    return { done: g.type === Ot.eof, value: g }
                  },
                }
              }),
            (_r.curContext = function () {
              return this.context[this.context.length - 1]
            }),
            (_r.nextToken = function () {
              var v = this.curContext()
              return (
                (v && v.preserveSpace) || this.skipSpace(),
                (this.start = this.pos),
                this.options.locations && (this.startLoc = this.curPosition()),
                this.pos >= this.input.length
                  ? this.finishToken(Ot.eof)
                  : v.override
                  ? v.override(this)
                  : void this.readToken(this.fullCharCodeAtPos())
              )
            }),
            (_r.readToken = function (v) {
              return Ke(v, this.options.ecmaVersion >= 6) || 92 === v
                ? this.readWord()
                : this.getTokenFromCode(v)
            }),
            (_r.fullCharCodeAtPos = function () {
              var v = this.input.charCodeAt(this.pos)
              if (v <= 55295 || v >= 57344) return v
              var g = this.input.charCodeAt(this.pos + 1)
              return (v << 10) + g - 56613888
            }),
            (_r.skipBlockComment = function () {
              var v,
                g = this.options.onComment && this.curPosition(),
                y = this.pos,
                x = this.input.indexOf('*/', (this.pos += 2))
              if (
                (-1 === x && this.raise(this.pos - 2, 'Unterminated comment'),
                (this.pos = x + 2),
                this.options.locations)
              )
                for (
                  Kt.lastIndex = y;
                  (v = Kt.exec(this.input)) && v.index < this.pos;

                )
                  ++this.curLine, (this.lineStart = v.index + v[0].length)
              this.options.onComment &&
                this.options.onComment(
                  !0,
                  this.input.slice(y + 2, x),
                  y,
                  this.pos,
                  g,
                  this.curPosition()
                )
            }),
            (_r.skipLineComment = function (v) {
              for (
                var g = this.pos,
                  y = this.options.onComment && this.curPosition(),
                  x = this.input.charCodeAt((this.pos += v));
                this.pos < this.input.length && !Qe(x);

              )
                x = this.input.charCodeAt(++this.pos)
              this.options.onComment &&
                this.options.onComment(
                  !1,
                  this.input.slice(g + v, this.pos),
                  g,
                  this.pos,
                  y,
                  this.curPosition()
                )
            }),
            (_r.skipSpace = function () {
              e: for (; this.pos < this.input.length; ) {
                var v = this.input.charCodeAt(this.pos)
                switch (v) {
                  case 32:
                  case 160:
                    ++this.pos
                    break
                  case 13:
                    10 === this.input.charCodeAt(this.pos + 1) && ++this.pos
                  case 10:
                  case 8232:
                  case 8233:
                    ++this.pos,
                      this.options.locations &&
                        (++this.curLine, (this.lineStart = this.pos))
                    break
                  case 47:
                    switch (this.input.charCodeAt(this.pos + 1)) {
                      case 42:
                        this.skipBlockComment()
                        break
                      case 47:
                        this.skipLineComment(2)
                        break
                      default:
                        break e
                    }
                    break
                  default:
                    if (
                      !(
                        (v > 8 && v < 14) ||
                        (v >= 5760 && Jt.test(String.fromCharCode(v)))
                      )
                    )
                      break e
                    ++this.pos
                }
              }
            }),
            (_r.finishToken = function (v, g) {
              ;(this.end = this.pos),
                this.options.locations && (this.endLoc = this.curPosition())
              var y = this.type
              ;(this.type = v), (this.value = g), this.updateContext(y)
            }),
            (_r.readToken_dot = function () {
              var v = this.input.charCodeAt(this.pos + 1)
              if (v >= 48 && v <= 57) return this.readNumber(!0)
              var g = this.input.charCodeAt(this.pos + 2)
              return this.options.ecmaVersion >= 6 && 46 === v && 46 === g
                ? ((this.pos += 3), this.finishToken(Ot.ellipsis))
                : (++this.pos, this.finishToken(Ot.dot))
            }),
            (_r.readToken_slash = function () {
              var v = this.input.charCodeAt(this.pos + 1)
              return this.exprAllowed
                ? (++this.pos, this.readRegexp())
                : 61 === v
                ? this.finishOp(Ot.assign, 2)
                : this.finishOp(Ot.slash, 1)
            }),
            (_r.readToken_mult_modulo_exp = function (v) {
              var g = this.input.charCodeAt(this.pos + 1),
                y = 1,
                x = 42 === v ? Ot.star : Ot.modulo
              return (
                this.options.ecmaVersion >= 7 &&
                  42 === v &&
                  42 === g &&
                  (++y,
                  (x = Ot.starstar),
                  (g = this.input.charCodeAt(this.pos + 2))),
                61 === g ? this.finishOp(Ot.assign, y + 1) : this.finishOp(x, y)
              )
            }),
            (_r.readToken_pipe_amp = function (v) {
              var g = this.input.charCodeAt(this.pos + 1)
              return g === v
                ? this.finishOp(124 === v ? Ot.logicalOR : Ot.logicalAND, 2)
                : 61 === g
                ? this.finishOp(Ot.assign, 2)
                : this.finishOp(124 === v ? Ot.bitwiseOR : Ot.bitwiseAND, 1)
            }),
            (_r.readToken_caret = function () {
              var v = this.input.charCodeAt(this.pos + 1)
              return 61 === v
                ? this.finishOp(Ot.assign, 2)
                : this.finishOp(Ot.bitwiseXOR, 1)
            }),
            (_r.readToken_plus_min = function (v) {
              var g = this.input.charCodeAt(this.pos + 1)
              return g === v
                ? 45 !== g ||
                  this.inModule ||
                  62 !== this.input.charCodeAt(this.pos + 2) ||
                  (0 !== this.lastTokEnd &&
                    !Ht.test(this.input.slice(this.lastTokEnd, this.pos)))
                  ? this.finishOp(Ot.incDec, 2)
                  : (this.skipLineComment(3),
                    this.skipSpace(),
                    this.nextToken())
                : 61 === g
                ? this.finishOp(Ot.assign, 2)
                : this.finishOp(Ot.plusMin, 1)
            }),
            (_r.readToken_lt_gt = function (v) {
              var g = this.input.charCodeAt(this.pos + 1),
                y = 1
              return g === v
                ? ((y =
                    62 === v && 62 === this.input.charCodeAt(this.pos + 2)
                      ? 3
                      : 2),
                  61 === this.input.charCodeAt(this.pos + y)
                    ? this.finishOp(Ot.assign, y + 1)
                    : this.finishOp(Ot.bitShift, y))
                : 33 !== g ||
                  60 !== v ||
                  this.inModule ||
                  45 !== this.input.charCodeAt(this.pos + 2) ||
                  45 !== this.input.charCodeAt(this.pos + 3)
                ? (61 === g && (y = 2), this.finishOp(Ot.relational, y))
                : (this.skipLineComment(4), this.skipSpace(), this.nextToken())
            }),
            (_r.readToken_eq_excl = function (v) {
              var g = this.input.charCodeAt(this.pos + 1)
              return 61 === g
                ? this.finishOp(
                    Ot.equality,
                    61 === this.input.charCodeAt(this.pos + 2) ? 3 : 2
                  )
                : 61 === v && 62 === g && this.options.ecmaVersion >= 6
                ? ((this.pos += 2), this.finishToken(Ot.arrow))
                : this.finishOp(61 === v ? Ot.eq : Ot.prefix, 1)
            }),
            (_r.getTokenFromCode = function (v) {
              switch (v) {
                case 46:
                  return this.readToken_dot()
                case 40:
                  return ++this.pos, this.finishToken(Ot.parenL)
                case 41:
                  return ++this.pos, this.finishToken(Ot.parenR)
                case 59:
                  return ++this.pos, this.finishToken(Ot.semi)
                case 44:
                  return ++this.pos, this.finishToken(Ot.comma)
                case 91:
                  return ++this.pos, this.finishToken(Ot.bracketL)
                case 93:
                  return ++this.pos, this.finishToken(Ot.bracketR)
                case 123:
                  return ++this.pos, this.finishToken(Ot.braceL)
                case 125:
                  return ++this.pos, this.finishToken(Ot.braceR)
                case 58:
                  return ++this.pos, this.finishToken(Ot.colon)
                case 63:
                  return ++this.pos, this.finishToken(Ot.question)
                case 96:
                  if (this.options.ecmaVersion < 6) break
                  return ++this.pos, this.finishToken(Ot.backQuote)
                case 48:
                  var g = this.input.charCodeAt(this.pos + 1)
                  if (120 === g || 88 === g) return this.readRadixNumber(16)
                  if (this.options.ecmaVersion >= 6) {
                    if (111 === g || 79 === g) return this.readRadixNumber(8)
                    if (98 === g || 66 === g) return this.readRadixNumber(2)
                  }
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                  return this.readNumber(!1)
                case 34:
                case 39:
                  return this.readString(v)
                case 47:
                  return this.readToken_slash()
                case 37:
                case 42:
                  return this.readToken_mult_modulo_exp(v)
                case 124:
                case 38:
                  return this.readToken_pipe_amp(v)
                case 94:
                  return this.readToken_caret()
                case 43:
                case 45:
                  return this.readToken_plus_min(v)
                case 60:
                case 62:
                  return this.readToken_lt_gt(v)
                case 61:
                case 33:
                  return this.readToken_eq_excl(v)
                case 126:
                  return this.finishOp(Ot.prefix, 1)
              }
              this.raise(this.pos, "Unexpected character '" + qt(v) + "'")
            }),
            (_r.finishOp = function (v, g) {
              var y = this.input.slice(this.pos, this.pos + g)
              return (this.pos += g), this.finishToken(v, y)
            }),
            (_r.readRegexp = function () {
              for (var v, g, y = this.pos; ; ) {
                this.pos >= this.input.length &&
                  this.raise(y, 'Unterminated regular expression')
                var x = this.input.charAt(this.pos)
                if (
                  (Ht.test(x) &&
                    this.raise(y, 'Unterminated regular expression'),
                  v)
                )
                  v = !1
                else {
                  if ('[' === x) g = !0
                  else if (']' === x && g) g = !1
                  else if ('/' === x && !g) break
                  v = '\\' === x
                }
                ++this.pos
              }
              var E = this.input.slice(y, this.pos)
              ++this.pos
              var R = this.pos,
                _ = this.readWord1()
              this.containsEsc && this.unexpected(R)
              var P = this.regexpState || (this.regexpState = new Bt(this))
              P.reset(y, E, _),
                this.validateRegExpFlags(P),
                this.validateRegExpPattern(P)
              var k = null
              try {
                k = RegExp(E, _)
              } catch (v) {}
              return this.finishToken(Ot.regexp, {
                pattern: E,
                flags: _,
                value: k,
              })
            }),
            (_r.readInt = function (v, g) {
              for (
                var y = this.pos, x = 0, E = 0, R = null == g ? 1 / 0 : g;
                E < R;
                ++E
              ) {
                var _,
                  P = this.input.charCodeAt(this.pos)
                if (
                  ((_ =
                    P >= 97
                      ? P - 97 + 10
                      : P >= 65
                      ? P - 65 + 10
                      : P >= 48 && P <= 57
                      ? P - 48
                      : 1 / 0),
                  _ >= v)
                )
                  break
                ++this.pos, (x = x * v + _)
              }
              return this.pos === y || (null != g && this.pos - y !== g)
                ? null
                : x
            }),
            (_r.readRadixNumber = function (v) {
              this.pos += 2
              var g = this.readInt(v)
              return (
                null == g &&
                  this.raise(this.start + 2, 'Expected number in radix ' + v),
                Ke(this.fullCharCodeAtPos()) &&
                  this.raise(this.pos, 'Identifier directly after number'),
                this.finishToken(Ot.num, g)
              )
            }),
            (_r.readNumber = function (v) {
              var g = this.pos
              v || null !== this.readInt(10) || this.raise(g, 'Invalid number')
              var y = this.pos - g >= 2 && 48 === this.input.charCodeAt(g)
              y && this.strict && this.raise(g, 'Invalid number'),
                y && /[89]/.test(this.input.slice(g, this.pos)) && (y = !1)
              var x = this.input.charCodeAt(this.pos)
              46 !== x ||
                y ||
                (++this.pos,
                this.readInt(10),
                (x = this.input.charCodeAt(this.pos))),
                (69 !== x && 101 !== x) ||
                  y ||
                  ((x = this.input.charCodeAt(++this.pos)),
                  (43 !== x && 45 !== x) || ++this.pos,
                  null === this.readInt(10) && this.raise(g, 'Invalid number')),
                Ke(this.fullCharCodeAtPos()) &&
                  this.raise(this.pos, 'Identifier directly after number')
              var E = this.input.slice(g, this.pos),
                R = y ? parseInt(E, 8) : parseFloat(E)
              return this.finishToken(Ot.num, R)
            }),
            (_r.readCodePoint = function () {
              var v,
                g = this.input.charCodeAt(this.pos)
              if (123 === g) {
                this.options.ecmaVersion < 6 && this.unexpected()
                var y = ++this.pos
                ;(v = this.readHexChar(
                  this.input.indexOf('}', this.pos) - this.pos
                )),
                  ++this.pos,
                  v > 1114111 &&
                    this.invalidStringToken(y, 'Code point out of bounds')
              } else v = this.readHexChar(4)
              return v
            }),
            (_r.readString = function (v) {
              for (var g = '', y = ++this.pos; ; ) {
                this.pos >= this.input.length &&
                  this.raise(this.start, 'Unterminated string constant')
                var x = this.input.charCodeAt(this.pos)
                if (x === v) break
                92 === x
                  ? ((g += this.input.slice(y, this.pos)),
                    (g += this.readEscapedChar(!1)),
                    (y = this.pos))
                  : (Qe(x, this.options.ecmaVersion >= 10) &&
                      this.raise(this.start, 'Unterminated string constant'),
                    ++this.pos)
              }
              return (
                (g += this.input.slice(y, this.pos++)),
                this.finishToken(Ot.string, g)
              )
            })
          var Pr = {}
          ;(_r.tryReadTemplateToken = function () {
            this.inTemplateElement = !0
            try {
              this.readTmplToken()
            } catch (v) {
              if (v !== Pr) throw v
              this.readInvalidTemplateToken()
            }
            this.inTemplateElement = !1
          }),
            (_r.invalidStringToken = function (v, g) {
              if (this.inTemplateElement && this.options.ecmaVersion >= 9)
                throw Pr
              this.raise(v, g)
            }),
            (_r.readTmplToken = function () {
              for (var v = '', g = this.pos; ; ) {
                this.pos >= this.input.length &&
                  this.raise(this.start, 'Unterminated template')
                var y = this.input.charCodeAt(this.pos)
                if (
                  96 === y ||
                  (36 === y && 123 === this.input.charCodeAt(this.pos + 1))
                )
                  return this.pos !== this.start ||
                    (this.type !== Ot.template &&
                      this.type !== Ot.invalidTemplate)
                    ? ((v += this.input.slice(g, this.pos)),
                      this.finishToken(Ot.template, v))
                    : 36 === y
                    ? ((this.pos += 2), this.finishToken(Ot.dollarBraceL))
                    : (++this.pos, this.finishToken(Ot.backQuote))
                if (92 === y)
                  (v += this.input.slice(g, this.pos)),
                    (v += this.readEscapedChar(!0)),
                    (g = this.pos)
                else if (Qe(y)) {
                  switch (
                    ((v += this.input.slice(g, this.pos)), ++this.pos, y)
                  ) {
                    case 13:
                      10 === this.input.charCodeAt(this.pos) && ++this.pos
                    case 10:
                      v += '\n'
                      break
                    default:
                      v += String.fromCharCode(y)
                  }
                  this.options.locations &&
                    (++this.curLine, (this.lineStart = this.pos)),
                    (g = this.pos)
                } else ++this.pos
              }
            }),
            (_r.readInvalidTemplateToken = function () {
              for (; this.pos < this.input.length; this.pos++)
                switch (this.input[this.pos]) {
                  case '\\':
                    ++this.pos
                    break
                  case '$':
                    if ('{' !== this.input[this.pos + 1]) break
                  case '`':
                    return this.finishToken(
                      Ot.invalidTemplate,
                      this.input.slice(this.start, this.pos)
                    )
                }
              this.raise(this.start, 'Unterminated template')
            }),
            (_r.readEscapedChar = function (v) {
              var g = this.input.charCodeAt(++this.pos)
              switch ((++this.pos, g)) {
                case 110:
                  return '\n'
                case 114:
                  return '\r'
                case 120:
                  return String.fromCharCode(this.readHexChar(2))
                case 117:
                  return qt(this.readCodePoint())
                case 116:
                  return '\t'
                case 98:
                  return '\b'
                case 118:
                  return '\v'
                case 102:
                  return '\f'
                case 13:
                  10 === this.input.charCodeAt(this.pos) && ++this.pos
                case 10:
                  return (
                    this.options.locations &&
                      ((this.lineStart = this.pos), ++this.curLine),
                    ''
                  )
                default:
                  if (g >= 48 && g <= 55) {
                    var y = this.input
                        .substr(this.pos - 1, 3)
                        .match(/^[0-7]+/)[0],
                      x = parseInt(y, 8)
                    return (
                      x > 255 && ((y = y.slice(0, -1)), (x = parseInt(y, 8))),
                      (this.pos += y.length - 1),
                      (g = this.input.charCodeAt(this.pos)),
                      ('0' === y && 56 !== g && 57 !== g) ||
                        (!this.strict && !v) ||
                        this.invalidStringToken(
                          this.pos - 1 - y.length,
                          v
                            ? 'Octal literal in template string'
                            : 'Octal literal in strict mode'
                        ),
                      String.fromCharCode(x)
                    )
                  }
                  return Qe(g) ? '' : String.fromCharCode(g)
              }
            }),
            (_r.readHexChar = function (v) {
              var g = this.pos,
                y = this.readInt(16, v)
              return (
                null === y &&
                  this.invalidStringToken(g, 'Bad character escape sequence'),
                y
              )
            }),
            (_r.readWord1 = function () {
              this.containsEsc = !1
              for (
                var v = '',
                  g = !0,
                  y = this.pos,
                  x = this.options.ecmaVersion >= 6;
                this.pos < this.input.length;

              ) {
                var E = this.fullCharCodeAtPos()
                if (Je(E, x)) this.pos += E <= 65535 ? 1 : 2
                else {
                  if (92 !== E) break
                  ;(this.containsEsc = !0), (v += this.input.slice(y, this.pos))
                  var R = this.pos
                  117 !== this.input.charCodeAt(++this.pos) &&
                    this.invalidStringToken(
                      this.pos,
                      'Expecting Unicode escape sequence \\uXXXX'
                    ),
                    ++this.pos
                  var _ = this.readCodePoint()
                  ;(g ? Ke : Je)(_, x) ||
                    this.invalidStringToken(R, 'Invalid Unicode escape'),
                    (v += qt(_)),
                    (y = this.pos)
                }
                g = !1
              }
              return v + this.input.slice(y, this.pos)
            }),
            (_r.readWord = function () {
              var v = this.readWord1(),
                g = Ot.name
              return (
                this.keywords.test(v) &&
                  (this.containsEsc &&
                    this.raiseRecoverable(
                      this.start,
                      'Escape sequence in keyword ' + v
                    ),
                  (g = Nt[v])),
                this.finishToken(g, v)
              )
            })
          for (
            var kr = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)"|;)/,
              Ir = {
                Parser: xt,
                createWordsRegExp: at,
                getLineInfo: lt,
                isIdentifierChar: Je,
                isIdentifierStart: Ke,
                lineBreakRegExp: Ht,
                literalRegExp: kr,
                reservedWords: Tt,
                skipWhiteSpaceRegExp: Yt,
                tokTypes: Ot,
              },
              Ar = B.inited
                ? B.module.utilWrap
                : (B.module.utilWrap = (function () {
                    return function (v, g) {
                      return function (...y) {
                        return Reflect.apply(g, this, [v, y])
                      }
                    }
                  })()),
              Nr = B.inited
                ? B.module.acornParserBigInt
                : (B.module.acornParserBigInt = (function () {
                    var v = 110,
                      g = {
                        enable: (v) => (
                          (v.readNumber = Ar(v.readNumber, i)),
                          (v.readRadixNumber = Ar(v.readRadixNumber, n)),
                          v
                        ),
                      }
                    function r(g, y) {
                      var x = g.pos
                      return (
                        'number' == typeof y ? (g.pos += 2) : (y = 10),
                        null !== g.readInt(y) && g.input.charCodeAt(g.pos) === v
                          ? (++g.pos, g.finishToken(Ot.num, null))
                          : ((g.pos = x), null)
                      )
                    }
                    function i(v, g) {
                      var y = g[0]
                      if (!y) {
                        var x = r(this)
                        if (null !== x) return x
                      }
                      return Reflect.apply(v, this, g)
                    }
                    function n(v, g) {
                      var y = g[0],
                        x = r(this, y)
                      return null === x ? Reflect.apply(v, this, g) : x
                    }
                    return g
                  })()),
              Cr = B.inited
                ? B.module.parseBranch
                : (B.module.parseBranch = (function () {
                    var v
                    return function (g) {
                      return (
                        (void 0 !== v && v !== g) ||
                          (v = Kr.create('', {
                            allowAwaitOutsideFunction: !0,
                            allowReturnOutsideFunction: !0,
                            ecmaVersion: 10,
                          })),
                        (v.awaitIdentPos = g.awaitIdentPos),
                        (v.awaitPos = g.awaitPos),
                        (v.containsEsc = g.containsEsc),
                        (v.curLine = g.curLine),
                        (v.end = g.end),
                        (v.exprAllowed = g.exprAllowed),
                        (v.inModule = g.inModule),
                        (v.input = g.input),
                        (v.inTemplateElement = g.inTemplateElement),
                        (v.lastTokEnd = g.lastTokEnd),
                        (v.lastTokStart = g.lastTokStart),
                        (v.lineStart = g.lineStart),
                        (v.pos = g.pos),
                        (v.potentialArrowAt = g.potentialArrowAt),
                        (v.sourceFile = g.sourceFile),
                        (v.start = g.start),
                        (v.strict = g.strict),
                        (v.type = g.type),
                        (v.value = g.value),
                        (v.yieldPos = g.yieldPos),
                        v
                      )
                    }
                  })()),
              Or = B.inited
                ? B.module.acornParserClassFields
                : (B.module.acornParserClassFields = (function () {
                    var v = 35,
                      g = {
                        enable: (v) => (
                          (v.getTokenFromCode = Ar(v.getTokenFromCode, r)),
                          (v.parseClassElement = Ar(v.parseClassElement, i)),
                          v
                        ),
                      }
                    function r(g, y) {
                      var x = y[0]
                      return x !== v
                        ? Reflect.apply(g, this, y)
                        : (++this.pos,
                          this.finishToken(Ot.name, this.readWord1()))
                    }
                    function i(v, g) {
                      var y = this.type
                      if (y !== Ot.bracketL && y !== Ot.name)
                        return Reflect.apply(v, this, g)
                      var x = Cr(this),
                        E = this.startNode()
                      x.parsePropertyName(E)
                      var R = x.type
                      if (R === Ot.parenL) return Reflect.apply(v, this, g)
                      if (R !== Ot.braceR && R !== Ot.eq && R !== Ot.semi) {
                        if (
                          this.isContextual('async') ||
                          this.isContextual('get') ||
                          this.isContextual('set')
                        )
                          return Reflect.apply(v, this, g)
                        if (this.isContextual('static')) {
                          if (R === Ot.star) return Reflect.apply(v, this, g)
                          var _ = Cr(x)
                          _.parsePropertyName(E)
                          var P = _.type
                          if (P === Ot.parenL) return Reflect.apply(v, this, g)
                          if (
                            P !== Ot.braceR &&
                            P !== Ot.eq &&
                            P !== Ot.semi &&
                            (x.isContextual('async') ||
                              x.isContextual('get') ||
                              x.isContextual('set'))
                          )
                            return Reflect.apply(v, this, g)
                        }
                      }
                      var k = this.startNode()
                      return (
                        (k.static =
                          R !== Ot.braceR &&
                          R !== Ot.eq &&
                          this.eatContextual('static')),
                        this.parsePropertyName(k),
                        (k.value = this.eat(Ot.eq)
                          ? this.parseExpression()
                          : null),
                        this.finishNode(k, 'FieldDefinition'),
                        this.semicolon(),
                        k
                      )
                    }
                    return g
                  })()),
              Tr = B.inited
                ? B.module.parseErrors
                : (B.module.parseErrors = (function () {
                    function e(v) {
                      class t extends v {
                        constructor(v, g, y) {
                          super(y)
                          var x = lt(v.input, g),
                            E = x.column,
                            R = x.line
                          ;(this.column = E),
                            (this.inModule = v.inModule),
                            (this.line = R)
                        }
                      }
                      return (
                        Reflect.defineProperty(t, 'name', {
                          configurable: !0,
                          value: v.name,
                        }),
                        t
                      )
                    }
                    return {
                      ReferenceError: e(ReferenceError),
                      SyntaxError: e(SyntaxError),
                    }
                  })()),
              Lr = B.inited
                ? B.module.acornParserErrorMessages
                : (B.module.acornParserErrorMessages = (function () {
                    var v = 'Keyword must not contain escaped characters',
                      g = 'Invalid or unexpected token',
                      y = 'Unexpected end of input',
                      x = 'Unexpected token',
                      E = 'missing ) after argument list',
                      R = "Duplicate export of '",
                      _ = "Duplicate export '",
                      P =
                        "'import' and 'export' may only appear at the top level",
                      k =
                        "'import' and 'export' may appear only with 'sourceType: module'",
                      I = 'Escape sequence in keyword ',
                      A = new Set([
                        'await is only valid in async function',
                        'HTML comments are not allowed in modules',
                        "Cannot use 'import.meta' outside a module",
                        'new.target expression is not allowed here',
                        'Illegal return statement',
                        v,
                        g,
                        y,
                        'Unexpected eval or arguments in strict mode',
                        'Unexpected identifier',
                        'Unexpected reserved word',
                        'Unexpected strict mode reserved word',
                        'Unexpected string',
                        x,
                        E,
                        'Unterminated template literal',
                      ]),
                      N = new Map([
                        [
                          "'return' outside of function",
                          'Illegal return statement',
                        ],
                        [
                          'Binding arguments in strict mode',
                          'Unexpected eval or arguments in strict mode',
                        ],
                        [
                          'Binding await in strict mode',
                          'Unexpected reserved word',
                        ],
                        [
                          "Cannot use keyword 'await' outside an async function",
                          'await is only valid in async function',
                        ],
                        [
                          "The keyword 'await' is reserved",
                          'Unexpected reserved word',
                        ],
                        [
                          "The keyword 'yield' is reserved",
                          'Unexpected strict mode reserved word',
                        ],
                        ['Unterminated string constant', g],
                        [
                          'Unterminated template',
                          'Unterminated template literal',
                        ],
                        [
                          'new.target can only be used in functions',
                          'new.target expression is not allowed here',
                        ],
                      ]),
                      C = {
                        enable: (v) => (
                          (v.parseExprList = f),
                          (v.raise = d),
                          (v.raiseRecoverable = d),
                          (v.unexpected = m),
                          v
                        ),
                      }
                    function f(v, g, y, x) {
                      for (var R = [], _ = !0; !this.eat(v); ) {
                        if (_) _ = !1
                        else if (
                          (y || v !== Ot.parenR
                            ? this.expect(Ot.comma)
                            : this.eat(Ot.comma) || this.raise(this.start, E),
                          g && this.afterTrailingComma(v))
                        )
                          break
                        var P = void 0
                        y && this.type === Ot.comma
                          ? (P = null)
                          : this.type === Ot.ellipsis
                          ? ((P = this.parseSpread(x)),
                            x &&
                              this.type === Ot.comma &&
                              -1 === x.trailingComma &&
                              (x.trailingComma = this.start))
                          : (P = this.parseMaybeAssign(!1, x)),
                          R.push(P)
                      }
                      return R
                    }
                    function d(g, y) {
                      if (N.has(y)) y = N.get(y)
                      else if (y === P || y === k) y = x + ' ' + this.type.label
                      else if (y.startsWith(_)) y = y.replace(_, R)
                      else if (y.startsWith(I)) y = v
                      else if (!A.has(y) && !y.startsWith(x)) return
                      throw new Tr.SyntaxError(this, g, y)
                    }
                    function m(v) {
                      void 0 === v && (v = this.start)
                      var x = this.type === Ot.eof ? y : g
                      this.raise(v, x)
                    }
                    return C
                  })()),
              Mr = B.inited
                ? B.module.parseLookahead
                : (B.module.parseLookahead = (function () {
                    return function (v) {
                      var g = Cr(v)
                      return g.next(), g
                    }
                  })()),
              Dr = B.inited
                ? B.module.acornParserFirstAwaitOutSideFunction
                : (B.module.acornParserFirstAwaitOutSideFunction =
                    (function () {
                      var v = {
                        enable: (v) => (
                          (v.firstAwaitOutsideFunction = null),
                          (v.parseAwait = Ar(v.parseAwait, t)),
                          (v.parseForStatement = Ar(v.parseForStatement, r)),
                          v
                        ),
                      }
                      function t(v, g) {
                        return (
                          this.inAsync ||
                            this.inFunction ||
                            null !== this.firstAwaitOutsideFunction ||
                            (this.firstAwaitOutsideFunction = lt(
                              this.input,
                              this.start
                            )),
                          Reflect.apply(v, this, g)
                        )
                      }
                      function r(v, g) {
                        if (
                          this.inAsync ||
                          this.inFunction ||
                          null !== this.firstAwaitOutsideFunction
                        )
                          return Reflect.apply(v, this, g)
                        var y = g[0],
                          x = Mr(this),
                          E = x.start,
                          R = Reflect.apply(v, this, g)
                        return (
                          y.await &&
                            null === this.firstAwaitOutsideFunction &&
                            (this.firstAwaitOutsideFunction = lt(
                              this.input,
                              E
                            )),
                          R
                        )
                      }
                      return v
                    })()),
              Fr = B.inited
                ? B.module.acornParserFirstReturnOutSideFunction
                : (B.module.acornParserFirstReturnOutSideFunction =
                    (function () {
                      var v = {
                        enable: (v) => (
                          (v.firstReturnOutsideFunction = null),
                          (v.parseReturnStatement = Ar(
                            v.parseReturnStatement,
                            t
                          )),
                          v
                        ),
                      }
                      function t(v, g) {
                        return (
                          this.inFunction ||
                            null !== this.firstReturnOutsideFunction ||
                            (this.firstReturnOutsideFunction = lt(
                              this.input,
                              this.start
                            )),
                          Reflect.apply(v, this, g)
                        )
                      }
                      return v
                    })()),
              jr = B.inited
                ? B.module.acornParserFunctionParamsStart
                : (B.module.acornParserFunctionParamsStart = (function () {
                    var v = {
                      enable: (v) => (
                        (v.parseFunctionParams = Ar(v.parseFunctionParams, t)),
                        v
                      ),
                    }
                    function t(v, g) {
                      var y = g[0]
                      return (
                        (y.functionParamsStart = this.start),
                        Reflect.apply(v, this, g)
                      )
                    }
                    return v
                  })()),
              Vr = B.inited
                ? B.module.acornParserHTMLComment
                : (B.module.acornParserHTMLComment = (function () {
                    var v = 33,
                      g = 45,
                      y = 60,
                      x = 62,
                      E = 'HTML comments are not allowed in modules',
                      R = Ir.lineBreakRegExp,
                      _ = {
                        enable: (v) => (
                          (v.readToken_lt_gt = Ar(v.readToken_lt_gt, o)),
                          (v.readToken_plus_min = Ar(v.readToken_plus_min, u)),
                          v
                        ),
                      }
                    function o(x, R) {
                      if (this.inModule) {
                        var _ = R[0],
                          P = this.input,
                          k = this.pos,
                          I = P.charCodeAt(k + 1)
                        _ === y &&
                          I === v &&
                          P.charCodeAt(k + 2) === g &&
                          P.charCodeAt(k + 3) === g &&
                          this.raise(k, E)
                      }
                      return Reflect.apply(x, this, R)
                    }
                    function u(v, y) {
                      if (this.inModule) {
                        var _ = y[0],
                          P = this.input,
                          k = this.lastTokEnd,
                          I = this.pos,
                          A = P.charCodeAt(I + 1)
                        A !== _ ||
                          A !== g ||
                          P.charCodeAt(I + 2) !== x ||
                          (0 !== k && !R.test(P.slice(k, I))) ||
                          this.raise(I, E)
                      }
                      return Reflect.apply(v, this, y)
                    }
                    return _
                  })()),
              Br = B.inited
                ? B.module.acornParserImport
                : (B.module.acornParserImport = (function () {
                    var v = "Cannot use 'import.meta' outside a module",
                      g = 'Keyword must not contain escaped characters',
                      y = "'import.meta' is not a valid assignment target",
                      x = 'Invalid left-hand side in assignment',
                      E = 'Unexpected identifier',
                      R = 'Unexpected string',
                      _ = 'Unexpected token',
                      P = {
                        enable: (v) => (
                          (Ot._import.startsExpr = !0),
                          (v.checkLVal = Ar(v.checkLVal, u)),
                          (v.parseExport = Ar(v.parseExport, l)),
                          (v.parseExprAtom = Ar(v.parseExprAtom, c)),
                          (v.parseNew = Ar(v.parseNew, p)),
                          (v.parseStatement = Ar(v.parseStatement, f)),
                          (v.parseSubscript = Ar(v.parseSubscript, h)),
                          v
                        ),
                      }
                    function u(v, g) {
                      var E = g[0],
                        R = E.type,
                        _ = E.start
                      if ('CallExpression' === R && 'Import' === E.callee.type)
                        throw new Tr.ReferenceError(this, _, x)
                      if (
                        'MetaProperty' === R &&
                        'import' === E.meta.name &&
                        'meta' === E.property.name
                      ) {
                        var P = this.type,
                          k = Tr.SyntaxError
                        throw (
                          ((P !== Ot.eq && P !== Ot.incDec) ||
                            'meta' !==
                              this.input.slice(
                                this.lastTokStart,
                                this.lastTokEnd
                              ) ||
                            (k = Tr.ReferenceError),
                          new k(this, _, y))
                        )
                      }
                      return Reflect.apply(v, this, g)
                    }
                    function l(v, g) {
                      if (Mr(this).type !== Ot.star)
                        return Reflect.apply(v, this, g)
                      var y = g[0],
                        x = g[1]
                      this.next()
                      var E = this.start,
                        R = this.startLoc
                      this.next()
                      var _ = 'ExportAllDeclaration'
                      if (this.eatContextual('as')) {
                        var P = this.parseIdent(!0)
                        this.checkExport(x, P.name, P.start)
                        var k = this.startNodeAt(E, R)
                        ;(_ = 'ExportNamedDeclaration'),
                          (k.exported = P),
                          (y.declaration = null),
                          (y.specifiers = [
                            this.finishNode(k, 'ExportNamespaceSpecifier'),
                          ])
                      }
                      return (
                        this.expectContextual('from'),
                        this.type !== Ot.string && this.unexpected(),
                        (y.source = this.parseExprAtom()),
                        this.semicolon(),
                        this.finishNode(y, _)
                      )
                    }
                    function c(y, x) {
                      if (this.type === Ot._import) {
                        var R = Mr(this),
                          _ = R.type
                        if (_ === Ot.dot)
                          return (function (y) {
                            var x = y.startNode(),
                              R = y.parseIdent(!0)
                            ;(x.meta = R), y.expect(Ot.dot)
                            var _ = y.containsEsc,
                              P = y.parseIdent(!0)
                            return (
                              (x.property = P),
                              'meta' !== P.name
                                ? y.raise(P.start, E)
                                : _
                                ? y.raise(P.start, g)
                                : y.inModule || y.raise(R.start, v),
                              y.finishNode(x, 'MetaProperty')
                            )
                          })(this)
                        if (_ === Ot.parenL)
                          return (function (v) {
                            var g = v.startNode()
                            return (
                              v.expect(Ot._import), v.finishNode(g, 'Import')
                            )
                          })(this)
                        this.unexpected()
                      }
                      var P = Reflect.apply(y, this, x),
                        k = P.type
                      return (
                        (k !== Ot._false && k !== Ot._null && k !== Ot._true) ||
                          (P.raw = ''),
                        P
                      )
                    }
                    function p(v, g) {
                      var y = Mr(this)
                      return (
                        y.type === Ot._import &&
                          Mr(y).type === Ot.parenL &&
                          this.unexpected(),
                        Reflect.apply(v, this, g)
                      )
                    }
                    function h(v, g) {
                      var y = g[0],
                        x = g[1],
                        E = g[2]
                      if ('Import' === y.type && this.type === Ot.parenL) {
                        var R = this.startNodeAt(x, E)
                        this.expect(Ot.parenL),
                          (R.arguments = [this.parseMaybeAssign()]),
                          (R.callee = y),
                          this.expect(Ot.parenR),
                          this.finishNode(R, 'CallExpression'),
                          (g[0] = R)
                      }
                      return Reflect.apply(v, this, g)
                    }
                    function f(v, g) {
                      var y = g[1]
                      if (this.type === Ot._import) {
                        var x,
                          P = Mr(this),
                          k = P.start,
                          I = P.type
                        if (I === Ot.dot || I === Ot.parenL) {
                          var A = this.startNode(),
                            N = this.parseMaybeAssign()
                          return this.parseExpressionStatement(A, N)
                        }
                        ;(this.inModule &&
                          (y || this.options.allowImportExportEverywhere)) ||
                          ((x =
                            I === Ot.name
                              ? E
                              : I === Ot.string
                              ? R
                              : _ + ' ' + I.label),
                          this.raise(k, x))
                      }
                      return Reflect.apply(v, this, g)
                    }
                    return P
                  })()),
              Gr = B.inited
                ? B.module.acornParserNumericSeparator
                : (B.module.acornParserNumericSeparator = (function () {
                    var v = 48,
                      g = 57,
                      y = 97,
                      x = 95,
                      E = 65,
                      R = { enable: (v) => ((v.readInt = a), v) }
                    function a(R, _) {
                      for (
                        var P = this.pos,
                          k = 'number' == typeof _,
                          I = k ? _ : 1 / 0,
                          A = -1,
                          N = 0;
                        ++A < I;

                      ) {
                        var C = this.input.charCodeAt(this.pos)
                        if (C !== x) {
                          var O = 1 / 0
                          if (
                            (C >= y
                              ? (O = C - y + 10)
                              : C >= E
                              ? (O = C - E + 10)
                              : C >= v && C <= g && (O = C - v),
                            O >= R)
                          )
                            break
                          ++this.pos, (N = N * R + O)
                        } else ++this.pos
                      }
                      var T = this.pos
                      return T === P || (k && T - P !== _) ? null : N
                    }
                    return R
                  })()),
              Ur = B.inited
                ? B.module.acornParserLiteral
                : (B.module.acornParserLiteral = (function () {
                    var v = {
                      enable: (v) => (
                        (v.parseLiteral = t), (v.parseTemplateElement = r), v
                      ),
                    }
                    function t(v) {
                      var g = this.startNode()
                      return (
                        (g.raw = ''),
                        (g.value = v),
                        this.next(),
                        this.finishNode(g, 'Literal')
                      )
                    }
                    function r() {
                      var v = this.startNode()
                      return (
                        (v.value = { cooked: '', raw: '' }),
                        this.next(),
                        (v.tail = this.type === Ot.backQuote),
                        this.finishNode(v, 'TemplateElement')
                      )
                    }
                    return v
                  })()),
              Wr = B.inited
                ? B.module.utilAlwaysFalse
                : (B.module.utilAlwaysFalse = (function () {
                    return function () {
                      return !1
                    }
                  })()),
              qr = B.inited
                ? B.module.acornParserTolerance
                : (B.module.acornParserTolerance = (function () {
                    var v = new Map(),
                      g = {
                        enable: (v) => (
                          (v.isDirectiveCandidate = Wr),
                          (v.strictDirective = Wr),
                          (v.isSimpleParamList = St),
                          (v.adaptDirectivePrologue = ve),
                          (v.checkLocalExport = ve),
                          (v.checkParams = ve),
                          (v.checkPatternErrors = ve),
                          (v.checkPatternExport = ve),
                          (v.checkPropClash = ve),
                          (v.checkVariableExport = ve),
                          (v.checkYieldAwaitInDefaultParams = ve),
                          (v.declareName = ve),
                          (v.invalidStringToken = ve),
                          (v.validateRegExpFlags = ve),
                          (v.validateRegExpPattern = ve),
                          (v.checkExpressionErrors = r),
                          (v.enterScope = i),
                          v
                        ),
                      }
                    function r(v) {
                      return !!v && -1 !== v.shorthandAssign
                    }
                    function i(g) {
                      this.scopeStack.push(
                        (function (g) {
                          var y = v.get(g)
                          return (
                            void 0 === y &&
                              ((y = {
                                flags: g,
                                functions: [],
                                lexical: [],
                                var: [],
                              }),
                              v.set(g, y)),
                            y
                          )
                        })(g)
                      )
                    }
                    return g
                  })()),
              $r = B.inited
                ? B.module.parseGetIdentifiersFromPattern
                : (B.module.parseGetIdentifiersFromPattern = (function () {
                    return function (v) {
                      for (var g = [], y = [v], x = -1; ++x < y.length; ) {
                        var E = y[x]
                        if (null !== E)
                          switch (E.type) {
                            case 'Identifier':
                              g.push(E)
                              break
                            case 'Property':
                            case 'ObjectProperty':
                              y.push(E.value)
                              break
                            case 'AssignmentPattern':
                              y.push(E.left)
                              break
                            case 'ObjectPattern':
                              y.push(...E.properties)
                              break
                            case 'ArrayPattern':
                              y.push(...E.elements)
                              break
                            case 'RestElement':
                              y.push(E.argument)
                          }
                      }
                      return g
                    }
                  })()),
              zr = B.inited
                ? B.module.acornParserTopLevel
                : (B.module.acornParserTopLevel = (function () {
                    var v = { enable: (v) => ((v.parseTopLevel = t), v) }
                    function t(v) {
                      Array.isArray(v.body) || (v.body = [])
                      for (
                        var g = v.body,
                          y = {},
                          x = new Set(),
                          E = new Set(),
                          R = new Set(),
                          _ = this.inModule,
                          P = {
                            firstAwaitOutsideFunction: null,
                            firstReturnOutsideFunction: null,
                            identifiers: E,
                            importedBindings: R,
                            insertIndex: v.start,
                            insertPrefix: '',
                          },
                          k = !1;
                        this.type !== Ot.eof;

                      ) {
                        var I = this.parseStatement(null, !0, y),
                          A = I.expression,
                          N = I.type
                        k ||
                          ('ExpressionStatement' === N &&
                          'Literal' === A.type &&
                          'string' == typeof A.value
                            ? ((P.insertIndex = I.end), (P.insertPrefix = ';'))
                            : (k = !0))
                        var C = I
                        if (
                          (('ExportDefaultDeclaration' !== N &&
                            'ExportNamedDeclaration' !== N) ||
                            ((C = I.declaration), null !== C && (N = C.type)),
                          'VariableDeclaration' === N)
                        )
                          for (
                            var O = 0,
                              T = C.declarations,
                              L = null == T ? 0 : T.length;
                            O < L;
                            O++
                          )
                            for (
                              var M = T[O],
                                D = $r(M.id),
                                F = 0,
                                j = null == D ? 0 : D.length;
                              F < j;
                              F++
                            ) {
                              var V = D[F],
                                B = V.name
                              _ && x.has(B) && r(this, V.start, B), E.add(B)
                            }
                        else if ('ClassDeclaration' === N) {
                          var G = C,
                            U = G.id
                          null !== U && E.add(U.name)
                        } else if ('FunctionDeclaration' === N) {
                          var W = C,
                            q = W.id
                          if (null !== q) {
                            var z = q.name
                            _ && E.has(z) && r(this, q.start, z),
                              x.add(z),
                              E.add(z)
                          }
                        } else if ('ImportDeclaration' === N)
                          for (
                            var K = 0,
                              he = C.specifiers,
                              fe = null == he ? 0 : he.length;
                            K < fe;
                            K++
                          ) {
                            var de = he[K].local,
                              me = de.name
                            R.has(me) && r(this, de.start, me),
                              R.add(me),
                              E.add(me)
                          }
                        g.push(I)
                      }
                      return (
                        this.next(),
                        (P.firstAwaitOutsideFunction =
                          this.firstAwaitOutsideFunction),
                        (P.firstReturnOutsideFunction =
                          this.firstReturnOutsideFunction),
                        (v.top = P),
                        this.finishNode(v, 'Program')
                      )
                    }
                    function r(v, g, y) {
                      throw new Tr.SyntaxError(
                        v,
                        g,
                        "Identifier '" + y + "' has already been declared"
                      )
                    }
                    return v
                  })()),
              Hr = B.inited
                ? B.module.utilDefaults
                : (B.module.utilDefaults = (function () {
                    return function (v) {
                      for (var g = arguments.length, y = 0; ++y < g; ) {
                        var x = arguments[y]
                        for (var E in x)
                          !me(x, E) ||
                            (void 0 !== v[E] && me(v, E)) ||
                            (v[E] = x[E])
                      }
                      return v
                    }
                  })()),
              Kr = B.inited
                ? B.module.Parser
                : (B.module.Parser = (function () {
                    var v = at(Tt[6]),
                      g = new Map([
                        [2, 'module'],
                        [1, 'script'],
                      ]),
                      y = {
                        create: function (g, x) {
                          x = y.createOptions(x)
                          var E = x,
                            R = E.strict,
                            _ = new xt(x, g)
                          return (
                            Nr.enable(_),
                            Or.enable(_),
                            Lr.enable(_),
                            Dr.enable(_),
                            Fr.enable(_),
                            jr.enable(_),
                            Vr.enable(_),
                            Br.enable(_),
                            Gr.enable(_),
                            Ur.enable(_),
                            qr.enable(_),
                            zr.enable(_),
                            void 0 !== R &&
                              ((_.strict = !!R),
                              _.strict || (_.reservedWords = v)),
                            _
                          )
                        },
                        createOptions: function (v) {
                          var x = Hr({}, v, y.defaultOptions),
                            E = x.sourceType,
                            R = g.get(E)
                          return void 0 !== R && (E = R), (x.sourceType = E), x
                        },
                        defaultOptions: {
                          allowAwaitOutsideFunction: !0,
                          allowReturnOutsideFunction: !1,
                          ecmaVersion: 10,
                          sourceType: 'module',
                          strict: void 0,
                        },
                        parse(v, g) {
                          var x = y.create(v, g),
                            E = x.parse()
                          return (
                            (E.inModule = x.inModule), (E.strict = x.strict), E
                          )
                        },
                      }
                    return y
                  })()),
              Jr = B.inited
                ? B.module.utilAscendingComparator
                : (B.module.utilAscendingComparator = (function () {
                    return function (v, g) {
                      return v > g ? 1 : v < g ? -1 : 0
                    }
                  })()),
              Yr = B.inited
                ? B.module.Visitor
                : (B.module.Visitor = (function () {
                    var v = new Map(),
                      g = new Set([
                        'alternate',
                        'argument',
                        'arguments',
                        'block',
                        'body',
                        'callee',
                        'cases',
                        'consequent',
                        'declaration',
                        'declarations',
                        'discriminant',
                        'elements',
                        'expression',
                        'expressions',
                        'finalizer',
                        'handler',
                        'init',
                        'key',
                        'left',
                        'object',
                        'properties',
                        'right',
                        'superClass',
                        'test',
                        'update',
                        'value',
                      ])
                    class r {
                      visit(v, g) {
                        this.reset(g)
                        var y = this.possibleIndexes
                        Array.isArray(y) &&
                          0 !== y.length &&
                          ((this.possibleEnd = y.length),
                          (this.possibleStart = 0),
                          this.visitWithoutReset(v))
                      }
                      visitWithoutReset(v) {
                        var g = v.getValue()
                        if (ge(g))
                          if (Array.isArray(g))
                            v.each(this, 'visitWithoutReset')
                          else {
                            var y = 'visit' + g.type
                            'function' == typeof this[y]
                              ? this[y](v)
                              : this.visitChildren(v)
                          }
                      }
                      visitChildren(y) {
                        var x = y.getValue(),
                          E = x.end,
                          R = x.start,
                          _ = this.possibleIndexes,
                          P = this.possibleStart,
                          k = this.possibleEnd,
                          I = P,
                          A = k
                        if ('number' == typeof R && 'number' == typeof E) {
                          for (; I < A && _[I] < R; ) I += 1
                          for (; I < A && _[A - 1] > E; ) A -= 1
                        }
                        if (I < A) {
                          ;(this.possibleStart = I), (this.possibleEnd = A)
                          for (
                            var N = (function (y) {
                                var x = v.get(y)
                                if (void 0 !== x) return x
                                x = []
                                for (
                                  var E = de(y),
                                    R = 'Property' !== y.type || !y.computed,
                                    _ = 0,
                                    P = null == E ? 0 : E.length;
                                  _ < P;
                                  _++
                                ) {
                                  var k = E[_]
                                  ;(R && 'key' === k) ||
                                    (g.has(k) && ge(y[k]) && x.push(k))
                                }
                                return v.set(y, x), x
                              })(x),
                              C = 0,
                              O = null == N ? 0 : N.length;
                            C < O;
                            C++
                          ) {
                            var T = N[C]
                            y.call(this, 'visitWithoutReset', T)
                          }
                          ;(this.possibleStart = P), (this.possibleEnd = k)
                        }
                      }
                    }
                    return Ee(r.prototype, null), r
                  })()),
              Qr = B.inited
                ? B.module.parseGetNamesFromPattern
                : (B.module.parseGetNamesFromPattern = (function () {
                    return function (v) {
                      for (
                        var g = $r(v),
                          y = [],
                          x = 0,
                          E = null == g ? 0 : g.length;
                        x < E;
                        x++
                      ) {
                        var R = g[x].name
                        y.push(R)
                      }
                      return y
                    }
                  })()),
              Xr = B.inited
                ? B.module.parseGetShadowed
                : (B.module.parseGetShadowed = (function () {
                    return function (v, g, y) {
                      var x = 'arguments' === g,
                        E = null
                      return (
                        v.getParentNode(function (R) {
                          var _ = R.type
                          if ('WithStatement' === _) {
                            var P = v.getValue()
                            return (E = R.object === P ? null : R), null !== E
                          }
                          var k = y.get(R)
                          void 0 === k && ((k = new Map()), y.set(R, k))
                          var I = k.get(g)
                          if (void 0 !== I) return (E = I), null !== E
                          var A = 'FunctionExpression' === _,
                            N = A || 'FunctionDeclaration' === _
                          if (x && N) return (E = R), k.set(g, E), !0
                          if ('BlockStatement' === _)
                            for (
                              var C = 0,
                                O = R.body,
                                T = null == O ? 0 : O.length;
                              C < T;
                              C++
                            ) {
                              var L = O[C]
                              if ('VariableDeclaration' === L.type)
                                for (
                                  var M = 0,
                                    D = L.declarations,
                                    F = null == D ? 0 : D.length;
                                  M < F;
                                  M++
                                )
                                  for (
                                    var j = D[M],
                                      V = Qr(j.id),
                                      B = 0,
                                      G = null == V ? 0 : V.length;
                                    B < G;
                                    B++
                                  ) {
                                    var U = V[B]
                                    if (U === g) return (E = j), k.set(g, E), !0
                                  }
                            }
                          if ('CatchClause' === _) {
                            var W = R.param
                            if (null !== W && W.name === g)
                              return (E = W), k.set(g, E), !0
                          }
                          if (A) {
                            var q = R.id
                            if (null !== q && q.name === g)
                              return (E = R), k.set(g, E), !0
                          }
                          if (N || 'ArrowFunctionExpression' === _)
                            for (
                              var z = 0,
                                K = R.params,
                                he = null == K ? 0 : K.length;
                              z < he;
                              z++
                            ) {
                              var fe = K[z],
                                de = Qr(fe),
                                me = de[0]
                              if (me === g) return (E = fe), k.set(g, E), !0
                            }
                          k.set(g, null)
                        }),
                        E
                      )
                    }
                  })()),
              Zr = B.inited
                ? B.module.parseIsShadowed
                : (B.module.parseIsShadowed = (function () {
                    return function (v, g, y) {
                      return null !== Xr(v, g, y)
                    }
                  })()),
              ei = B.inited
                ? B.module.parseIsOutsideFunction
                : (B.module.parseIsOutsideFunction = (function () {
                    return function (v, g, y) {
                      var x = !1
                      return (
                        v.getParentNode(function (v) {
                          var E = v.type,
                            R = y.get(v)
                          void 0 === R && ((R = new Map()), y.set(v, R))
                          var _ = R.get(g)
                          return void 0 !== _
                            ? (x = _)
                            : 'Program' === E
                            ? ((x = !0), R.set(g, x), !0)
                            : (R.set(g, !1),
                              'ArrowFunctionExpression' === E ||
                                'FunctionDeclaration' === E ||
                                'FunctionExpression' === E ||
                                void 0)
                        }),
                        x
                      )
                    }
                  })()),
              ti = B.inited
                ? B.module.parsePad
                : (B.module.parsePad = (function () {
                    return function (v, g, y, x) {
                      for (
                        var E = v.slice(y, x),
                          R = E.split('\n'),
                          _ = g.split('\n'),
                          P = _.length - 1,
                          k = R.length,
                          I = P - 1;
                        ++I < k;

                      ) {
                        var A = R[I],
                          N = A.charCodeAt(A.length - 1)
                        I > P && (_[I] = ''), 13 === N && (_[I] += '\r')
                      }
                      return _.join('\n')
                    }
                  })()),
              ri = B.inited
                ? B.module.parseOverwrite
                : (B.module.parseOverwrite = (function () {
                    return function (v, g, y, x) {
                      var E = v.magicString,
                        R = ti(E.original, x, g, y)
                      return E.overwrite(g, y, R)
                    }
                  })()),
              ii = B.inited
                ? B.module.visitorAssignment
                : (B.module.visitorAssignment = (function () {
                    var v = new Map(),
                      g = new Map()
                    function r(y, x, E) {
                      var R = y.assignableBindings,
                        _ = y.importedBindings,
                        P = y.magicString,
                        k = y.runtimeName,
                        I = x.getValue(),
                        A = I[E],
                        N = Qr(A),
                        C = I.end,
                        O = I.start
                      if (y.transformImportBindingAssignments)
                        for (
                          var T = 0, L = null == N ? 0 : N.length;
                          T < L;
                          T++
                        ) {
                          var M = N[T]
                          if (_.has(M) && !Zr(x, M, g)) {
                            var D = P.original,
                              F = I.right,
                              j =
                                k +
                                '.b(' +
                                JSON.stringify(D.slice(A.start, A.end)) +
                                ',"' +
                                I.operator +
                                '"'
                            void 0 !== F &&
                              (j += ',' + D.slice(F.start, F.end)),
                              (j += ')'),
                              ri(y, O, C, j)
                            break
                          }
                        }
                      var V = y.transformInsideFunctions,
                        B = y.transformOutsideFunctions
                      if (V || B)
                        for (
                          var G = V && B, U = 0, W = null == N ? 0 : N.length;
                          U < W;
                          U++
                        ) {
                          var q = N[U]
                          if (
                            R.has(q) &&
                            !Zr(x, q, g) &&
                            (G || (V && !ei(x, q, v)) || (B && ei(x, q, v)))
                          ) {
                            P.prependLeft(O, k + '.u(').prependRight(C, ')')
                            break
                          }
                        }
                    }
                    return new (class extends Yr {
                      reset(v) {
                        ;(this.assignableBindings = null),
                          (this.importedBindings = null),
                          (this.magicString = null),
                          (this.possibleIndexes = null),
                          (this.runtimeName = null),
                          (this.transformImportBindingAssignments = !1),
                          (this.transformInsideFunctions = !1),
                          (this.transformOutsideFunctions = !1),
                          void 0 !== v &&
                            ((this.assignableBindings = v.assignableBindings),
                            (this.importedBindings = v.importedBindings),
                            (this.magicString = v.magicString),
                            (this.possibleIndexes = v.possibleIndexes),
                            (this.runtimeName = v.runtimeName),
                            (this.transformImportBindingAssignments =
                              v.transformImportBindingAssignments),
                            (this.transformInsideFunctions =
                              v.transformInsideFunctions),
                            (this.transformOutsideFunctions =
                              v.transformOutsideFunctions))
                      }
                      visitAssignmentExpression(v) {
                        r(this, v, 'left'),
                          v.call(this, 'visitWithoutReset', 'right')
                      }
                      visitUpdateExpression(v) {
                        r(this, v, 'argument')
                      }
                    })()
                  })()),
              ni = B.inited
                ? B.module.parseIsBindingIdentifier
                : (B.module.parseIsBindingIdentifier = (function () {
                    return function (v, g) {
                      if ('Identifier' !== v.type) return !1
                      if (void 0 === g) return !0
                      var y = g.type
                      return 'Property' === y
                        ? g.computed || g.shorthand
                        : (('AssignmentExpression' !== y &&
                            'AssignmentPattern' !== y) ||
                            g.left !== v) &&
                            ('UpdateExpression' !== y || g.argument !== v) &&
                            'BreakStatement' !== y &&
                            'ContinueStatement' !== y &&
                            'ImportDefaultSpecifier' !== y &&
                            'ImportNamespaceSpecifier' !== y &&
                            'ImportSpecifier' !== y &&
                            'LabeledStatement' !== y
                    }
                  })()),
              si = B.inited
                ? B.module.visitorEval
                : (B.module.visitorEval = (function () {
                    var v = new Map()
                    return new (class extends Yr {
                      reset(v) {
                        ;(this.magicString = null),
                          (this.possibleIndexes = null),
                          (this.runtimeName = null),
                          (this.strict = !1),
                          (this.transforms = 0),
                          (this.transformUpdateBindings = !1),
                          void 0 !== v &&
                            ((this.magicString = v.magicString),
                            (this.possibleIndexes = v.possibleIndexes),
                            (this.runtimeName = v.runtimeName),
                            (this.strict = v.strict),
                            (this.transformUpdateBindings =
                              v.transformUpdateBindings))
                      }
                      visitCallExpression(v) {
                        var g = v.getValue(),
                          y = g.callee
                        if ('eval' === y.name) {
                          if (0 !== g.arguments.length) {
                            this.transforms |= 8
                            var x = g.end,
                              E = this.magicString,
                              R = this.runtimeName,
                              _ = this.strict
                                ? R + '.c'
                                : '(eval===' + R + '.v?' + R + '.c:' + R + '.k)'
                            E.prependLeft(y.end, '(' + _).prependRight(x, ')'),
                              this.transformUpdateBindings &&
                                E.prependLeft(g.start, R + '.u(').prependRight(
                                  x,
                                  ')'
                                ),
                              v.call(this, 'visitWithoutReset', 'arguments')
                          }
                        } else this.visitChildren(v)
                      }
                      visitIdentifier(g) {
                        var y = g.getValue()
                        if ('eval' === y.name) {
                          var x = g.getParentNode(),
                            E = x.type
                          if (
                            ('UnaryExpression' !== E ||
                              'typeof' !== x.operator) &&
                            ni(y, x) &&
                            !Zr(g, 'eval', v)
                          ) {
                            this.transforms |= 8
                            var R = y.end,
                              _ = y.start,
                              P = this.runtimeName,
                              k = this.strict
                                ? P + '.e'
                                : '(eval===' + P + '.v?' + P + '.e:eval)'
                            'Property' === E && x.shorthand
                              ? this.magicString.prependLeft(R, ':' + k)
                              : ri(this, _, R, k)
                          }
                        }
                      }
                    })()
                  })()),
              ai = B.inited
                ? B.module.utilEscapeRegExp
                : (B.module.utilEscapeRegExp = (function () {
                    var v = /[\\^$.*+?()[\]{}|]/g
                    return function (g) {
                      return 'string' == typeof g ? g.replace(v, '\\$&') : ''
                    }
                  })()),
              oi = B.inited
                ? B.module.parseFindIndexes
                : (B.module.parseFindIndexes = (function () {
                    return function (v, g) {
                      var y = [],
                        x = g.length
                      if (0 === x) return y
                      for (
                        var E,
                          R = x - 1,
                          _ = RegExp(
                            '\\b(?:' +
                              (function () {
                                for (var v = -1, y = ''; ++v < x; )
                                  y += ai(g[v]) + (v === R ? '' : '|')
                                return y
                              })() +
                              ')\\b',
                            'g'
                          );
                        null !== (E = _.exec(v));

                      ) {
                        var P = E,
                          k = P.index
                        ;(0 !== k && 46 === v.charCodeAt(k - 1)) || y.push(k)
                      }
                      return y
                    }
                  })()),
              ui = B.inited
                ? B.module.visitorGlobals
                : (B.module.visitorGlobals = (function () {
                    var v = new Map()
                    return new (class extends Yr {
                      reset(v) {
                        ;(this.globals = null),
                          (this.magicString = null),
                          (this.possibleIndexes = null),
                          (this.runtimeName = null),
                          (this.transforms = 0),
                          void 0 !== v &&
                            ((this.globals = v.globals),
                            (this.magicString = v.magicString),
                            (this.possibleIndexes = v.possibleIndexes),
                            (this.runtimeName = v.runtimeName))
                      }
                      visitCallExpression(g) {
                        var y = g.getValue(),
                          x = y.callee
                        if ('MemberExpression' === x.type) {
                          var E = x.object,
                            R = E.name
                          if (this.globals.has(R)) {
                            var _ = y.arguments
                            if (0 !== _.length && !Zr(g, R, v)) {
                              if ('console' === R) {
                                for (
                                  var P = !0,
                                    k = 0,
                                    I = null == _ ? 0 : _.length;
                                  k < I;
                                  k++
                                ) {
                                  var A = _[k].type
                                  if (
                                    'Literal' !== A &&
                                    'TemplateLiteral' !== A
                                  ) {
                                    P = !1
                                    break
                                  }
                                }
                                if (P) return
                                this.transforms |= 1
                              } else 'Reflect' === R && (this.transforms |= 64)
                              this.magicString.prependLeft(
                                E.start,
                                this.runtimeName + '.g.'
                              ),
                                g.call(this, 'visitWithoutReset', 'arguments')
                            }
                          } else this.visitChildren(g)
                        } else this.visitChildren(g)
                      }
                      visitIdentifier(g) {
                        var y = g.getValue(),
                          x = y.name
                        if (this.globals.has(x)) {
                          var E = g.getParentNode(),
                            R = E.type
                          if (
                            ('UnaryExpression' !== R ||
                              'typeof' !== E.operator) &&
                            ni(y, E) &&
                            !Zr(g, x, v)
                          ) {
                            'console' === x
                              ? (this.transforms |= 1)
                              : 'Reflect' === x && (this.transforms |= 64)
                            var _ = this.runtimeName + '.g.',
                              P = y.start
                            'Property' === R &&
                              E.shorthand &&
                              ((_ = ':' + _ + x), (P = y.end)),
                              this.magicString.prependLeft(P, _)
                          }
                        }
                      }
                    })()
                  })()),
              li = B.inited
                ? B.module.parseIndexOfPragma
                : (B.module.parseIndexOfPragma = (function () {
                    return function (v, g) {
                      for (var y = 0; ; ) {
                        ;(Yt.lastIndex = y), (y += Yt.exec(v)[0].length)
                        var x = kr.exec(v.slice(y))
                        if (null === x) return -1
                        if ((x[1] || x[2]) === g) return y
                        y += x[0].length
                      }
                    }
                  })()),
              ci = B.inited
                ? B.module.parseHasPragma
                : (B.module.parseHasPragma = (function () {
                    return function (v, g) {
                      var y = li(v, g)
                      return (
                        -1 !== y &&
                        (y >= 13 && 'use module' === g
                          ? -1 === li(v.slice(0, y), 'use script')
                          : !(y >= 13 && 'use script' === g) ||
                            -1 === li(v.slice(0, y), 'use module'))
                      )
                    }
                  })()),
              pi = B.inited
                ? B.module.parsePreserveChild
                : (B.module.parsePreserveChild = (function () {
                    return function (v, g, y) {
                      var x = g[y],
                        E = x.start,
                        R = g.start,
                        _ = ''
                      if (E > v.firstLineBreakPos) {
                        var P = E - R
                        _ = 7 === P ? '       ' : ' '.repeat(P)
                      }
                      return ri(v, R, E, _)
                    }
                  })()),
              hi = B.inited
                ? B.module.parsePreserveLine
                : (B.module.parsePreserveLine = (function () {
                    return function (v, { end: g, start: y }) {
                      return ri(v, y, g, '')
                    }
                  })()),
              fi = B.inited
                ? B.module.utilEscapeQuotes
                : (B.module.utilEscapeQuotes = (function () {
                    var v = new Map([
                      [39, /\\?'/g],
                      [34, /\\?"/g],
                    ])
                    return function (g, y = 34) {
                      if ('string' != typeof g) return ''
                      var x = String.fromCharCode(y)
                      return g.replace(v.get(y), '\\' + x)
                    }
                  })()),
              di = B.inited
                ? B.module.utilToString
                : (B.module.utilToString = (function () {
                    var v = String
                    return function (g) {
                      if ('string' == typeof g) return g
                      try {
                        return v(g)
                      } catch (v) {}
                      return ''
                    }
                  })()),
              mi = B.inited
                ? B.module.utilUnescapeQuotes
                : (B.module.utilUnescapeQuotes = (function () {
                    var v = new Map([
                      [39, /\\'/g],
                      [34, /\\"/g],
                    ])
                    return function (g, y = 34) {
                      if ('string' != typeof g) return ''
                      var x = String.fromCharCode(y)
                      return g.replace(v.get(y), x)
                    }
                  })()),
              vi = B.inited
                ? B.module.utilStripQuotes
                : (B.module.utilStripQuotes = (function () {
                    return function (v, g) {
                      if ('string' != typeof v) return ''
                      var y = v.charCodeAt(0),
                        x = v.charCodeAt(v.length - 1)
                      if (
                        (void 0 === g &&
                          (39 === y && 39 === x
                            ? (g = 39)
                            : 34 === y && 34 === x && (g = 34)),
                        void 0 === g)
                      )
                        return v
                      var E = v.slice(1, -1)
                      return mi(E, g)
                    }
                  })()),
              gi = B.inited
                ? B.module.utilToStringLiteral
                : (B.module.utilToStringLiteral = (function () {
                    var v = /[\u2028\u2029]/g,
                      g = new Map([
                        ['\u2028', '\\u2028'],
                        ['\u2029', '\\u2029'],
                      ])
                    function r(v) {
                      return '\\' + g.get(v)
                    }
                    return function (g, y = 34) {
                      var x = JSON.stringify(g)
                      if (
                        ('string' != typeof x && (x = di(g)),
                        (x = x.replace(v, r)),
                        34 === y && 34 === x.charCodeAt(0))
                      )
                        return x
                      var E = String.fromCharCode(y),
                        R = vi(x, y)
                      return E + fi(R, y) + E
                    }
                  })()),
              yi = B.inited
                ? B.module.visitorImportExport
                : (B.module.visitorImportExport = (function () {
                    function e() {
                      return {
                        imports: new Map(),
                        reExports: new Map(),
                        star: !1,
                      }
                    }
                    function t(v, g, y) {
                      v.hoistedExports.push(...y),
                        g.declaration ? pi(v, g, 'declaration') : hi(v, g)
                    }
                    function r(v, g) {
                      hi(v, g)
                    }
                    return new (class extends Yr {
                      finalizeHoisting() {
                        var v = this.top,
                          g = v.importedBindings,
                          y = v.insertPrefix
                        0 !== g.size &&
                          (y +=
                            (this.generateVarDeclarations ? 'var ' : 'let ') +
                            [...g].join(',') +
                            ';'),
                          (y += (function (v, g) {
                            var y = '',
                              x = g.length
                            if (0 === x) return y
                            var E = x - 1,
                              R = -1
                            y += v.runtimeName + '.x(['
                            for (
                              var _ = 0, P = null == g ? 0 : g.length;
                              _ < P;
                              _++
                            ) {
                              var k = g[_],
                                I = k[0],
                                A = k[1]
                              y +=
                                '["' +
                                I +
                                '",()=>' +
                                A +
                                ']' +
                                (++R === E ? '' : ',')
                            }
                            return (y += ']);'), y
                          })(this, this.hoistedExports))
                        var x = this.runtimeName
                        this.importSpecifierMap.forEach(function (v, g) {
                          y += x + '.w(' + gi(g)
                          var E = ''
                          v.imports.forEach(function (v, g) {
                            var y = (function e(v, g) {
                              return -1 === g.indexOf(v) ? v : e(a(v), g)
                            })('v', v)
                            E +=
                              ('' === E ? '' : ',') +
                              '["' +
                              g +
                              '",' +
                              ('*' === g
                                ? 'null'
                                : '["' + v.join('","') + '"]') +
                              ',function(' +
                              y +
                              '){' +
                              v.join('=') +
                              '=' +
                              y +
                              '}]'
                          }),
                            v.reExports.forEach(function (v, g) {
                              for (
                                var y = 0, R = null == v ? 0 : v.length;
                                y < R;
                                y++
                              ) {
                                var _ = v[y]
                                E +=
                                  ('' === E ? '' : ',') +
                                  '["' +
                                  _ +
                                  '",null,' +
                                  x +
                                  '.f("' +
                                  _ +
                                  '","' +
                                  g +
                                  '")]'
                              }
                            }),
                            v.star &&
                              (E +=
                                ('' === E ? '' : ',') +
                                '["*",null,' +
                                x +
                                '.n()]'),
                            '' !== E && (y += ',[' + E + ']'),
                            (y += ');')
                        }),
                          this.magicString.prependLeft(v.insertIndex, y),
                          (this.yieldIndex += y.length)
                      }
                      reset(v) {
                        if (
                          ((this.assignableBindings = null),
                          (this.firstLineBreakPos = -1),
                          (this.generateVarDeclarations = !1),
                          (this.hoistedExports = null),
                          (this.hoistedImportsString = ''),
                          (this.importSpecifierMap = null),
                          (this.magicString = null),
                          (this.possibleIndexes = null),
                          (this.runtimeName = null),
                          (this.sourceType = null),
                          (this.temporalBindings = null),
                          (this.top = null),
                          (this.transforms = 0),
                          (this.yieldIndex = 0),
                          void 0 !== v)
                        ) {
                          var g = v.magicString
                          ;(this.assignableBindings = new Set()),
                            (this.firstLineBreakPos = g.original.search(Ht)),
                            (this.generateVarDeclarations =
                              v.generateVarDeclarations),
                            (this.hoistedExports = []),
                            (this.importSpecifierMap = new Map()),
                            (this.magicString = g),
                            (this.possibleIndexes = v.possibleIndexes),
                            (this.runtimeName = v.runtimeName),
                            (this.sourceType = v.sourceType),
                            (this.temporalBindings = new Set()),
                            (this.top = v.top),
                            (this.yieldIndex = v.yieldIndex)
                        }
                      }
                      visitCallExpression(v) {
                        var g = v.getValue(),
                          y = g.callee
                        'Import' === y.type
                          ? 0 !== g.arguments.length &&
                            ((this.transforms |= 2),
                            ri(this, y.start, y.end, this.runtimeName + '.i'),
                            v.call(this, 'visitWithoutReset', 'arguments'))
                          : this.visitChildren(v)
                      }
                      visitImportDeclaration(v) {
                        if (2 === this.sourceType) {
                          this.transforms |= 16
                          var g = this.importSpecifierMap,
                            y = this.temporalBindings,
                            x = v.getValue(),
                            E = x.source.value,
                            R = x.specifiers,
                            _ = g.get(E)
                          void 0 === _ && ((_ = e()), g.set(E, _))
                          for (
                            var P = _,
                              k = P.imports,
                              I = 0,
                              A = null == R ? 0 : R.length;
                            I < A;
                            I++
                          ) {
                            var N = R[I],
                              C = N.type,
                              O = '*'
                            'ImportSpecifier' === C
                              ? (O = N.imported.name)
                              : 'ImportDefaultSpecifier' === C &&
                                (O = 'default')
                            var T = k.get(O)
                            void 0 === T && ((T = []), k.set(O, T))
                            var L = N.local.name
                            T.push(L), '*' !== O && y.add(L)
                          }
                          r(this, x)
                        }
                      }
                      visitExportAllDeclaration(v) {
                        if (2 === this.sourceType) {
                          this.transforms |= 4
                          var g = this.importSpecifierMap,
                            y = v.getValue(),
                            x = y.source.value,
                            E = g.get(x)
                          void 0 === E && ((E = e()), g.set(x, E)),
                            (E.star = !0),
                            r(this, y)
                        }
                      }
                      visitExportDefaultDeclaration(v) {
                        if (2 === this.sourceType) {
                          this.transforms |= 4
                          var g = v.getValue(),
                            y = g.declaration,
                            x = this.magicString,
                            E = this.runtimeName,
                            R = y.type,
                            _ = y.id
                          void 0 === _ && (_ = null)
                          var P = null === _ ? E + 'anonymous' : _.name
                          if (
                            (null !== _ && 'ClassDeclaration' === R) ||
                            'FunctionDeclaration' === R
                          )
                            null === _ &&
                              x.prependLeft(y.functionParamsStart, ' ' + P),
                              t(this, g, [['default', P]])
                          else {
                            var k = E + '.d(',
                              I = ');'
                            null !== _ ||
                              ('ArrowFunctionExpression' !== R &&
                                'ClassDeclaration' !== R &&
                                'ClassExpression' !== R &&
                                'FunctionExpression' !== R) ||
                              ((k = 'const ' + P + '='),
                              (I = ';' + E + '.d(' + P + ');')),
                              'SequenceExpression' === R &&
                                ((k += '('), (I = ')' + I))
                            var A = null === _ ? E + '.o' : P
                            this.hoistedExports.push(['default', A]),
                              ri(this, g.start, y.start, ''),
                              ri(this, y.end, g.end, ''),
                              x.prependLeft(y.start, k).prependRight(y.end, I)
                          }
                          null !== _ && this.assignableBindings.add(P),
                            v.call(this, 'visitWithoutReset', 'declaration')
                        }
                      }
                      visitExportNamedDeclaration(v) {
                        if (2 === this.sourceType) {
                          this.transforms |= 4
                          var g = this.assignableBindings,
                            y = this.magicString,
                            x = v.getValue(),
                            E = x.declaration,
                            R = x.source,
                            _ = x.specifiers
                          if (null !== E) {
                            var P = [],
                              k = E.type
                            if (
                              'ClassDeclaration' === k ||
                              'FunctionDeclaration' === k
                            ) {
                              var I = E.id.name
                              g.add(I), P.push([I, I])
                            } else if ('VariableDeclaration' === k)
                              for (
                                var A = (function ({
                                    declaration: v,
                                    type: g,
                                  }) {
                                    if ('ExportDefaultDeclaration' === g) {
                                      var y = v.type
                                      return (
                                        'FunctionDeclaration' === y ||
                                        'ClassDeclaration' === y
                                      )
                                    }
                                    return (
                                      'ExportNamedDeclaration' !== g ||
                                      null === v ||
                                      'VariableDeclaration' !== v.type ||
                                      'const' !== v.kind
                                    )
                                  })(x),
                                  N = 0,
                                  C = E.declarations,
                                  O = null == C ? 0 : C.length;
                                N < O;
                                N++
                              )
                                for (
                                  var T = C[N].id,
                                    L = Qr(T),
                                    M = 0,
                                    D = null == L ? 0 : L.length;
                                  M < D;
                                  M++
                                ) {
                                  var F = L[M]
                                  A && g.add(F), P.push([F, F])
                                }
                            t(this, x, P)
                          } else if (null === R) {
                            for (
                              var j = [],
                                V = this.top.identifiers,
                                B = 0,
                                G = null == _ ? 0 : _.length;
                              B < G;
                              B++
                            ) {
                              var U = _[B],
                                W = U.exported.name,
                                q = U.local.name
                              if (!V.has(q))
                                throw new Tr.SyntaxError(
                                  { inModule: !0, input: y.original },
                                  U.start,
                                  "Export '" + q + "' is not defined in module"
                                )
                              g.add(q), j.push([W, q])
                            }
                            t(this, x, j)
                          } else {
                            var z = this.importSpecifierMap,
                              K = R.value,
                              he = z.get(K)
                            void 0 === he && ((he = e()), z.set(K, he))
                            for (
                              var fe = 0, de = null == _ ? 0 : _.length;
                              fe < de;
                              fe++
                            ) {
                              var me = _[fe],
                                ve = me.exported.name,
                                ge = he,
                                ye = ge.reExports,
                                xe = ye.get(ve)
                              void 0 === xe && ((xe = []), ye.set(ve, xe))
                              var be =
                                'ExportNamespaceSpecifier' === me.type
                                  ? '*'
                                  : me.local.name
                              xe.push(be)
                            }
                            r(this, x)
                          }
                          null !== E &&
                            v.call(this, 'visitWithoutReset', 'declaration')
                        }
                      }
                      visitMetaProperty(v) {
                        var g = v.getValue(),
                          y = g.meta
                        'import' === y.name &&
                          ((this.transforms |= 32),
                          ri(this, y.start, y.end, this.runtimeName + '._'))
                      }
                    })()
                  })()),
              xi = B.inited
                ? B.module.visitorRequire
                : (B.module.visitorRequire = (function () {
                    var v = new Map()
                    return new (class extends Yr {
                      reset(v) {
                        ;(this.found = !1),
                          (this.possibleIndexes = null),
                          void 0 !== v &&
                            (this.possibleIndexes = v.possibleIndexes)
                      }
                      visitCallExpression(g) {
                        var y = g.getValue(),
                          x = y.callee
                        'require' === x.name
                          ? 0 === y.arguments.length ||
                            Zr(g, 'require', v) ||
                            ((this.found = !0),
                            g.call(this, 'visitWithoutReset', 'arguments'))
                          : this.visitChildren(g)
                      }
                    })()
                  })()),
              bi = B.inited
                ? B.module.utilStripShebang
                : (B.module.utilStripShebang = (function () {
                    var v = /^#!.*/
                    return function (g) {
                      return 'string' != typeof g
                        ? ''
                        : 35 === g.charCodeAt(0)
                        ? g.replace(v, '')
                        : g
                    }
                  })()),
              wi = B.inited
                ? B.module.parseMaybeIdentifier
                : (B.module.parseMaybeIdentifier = (function () {
                    return function (v, g) {
                      var y = v.getValue(),
                        x = v.getParentNode()
                      if (ni(y, x)) {
                        for (var E = -2; 'MemberExpression' === x.type; ) {
                          E -= 2
                          var R = v.getNode(E)
                          if (null === R) break
                          x = R
                        }
                        g(y, x)
                      }
                    }
                  })()),
              Ei = B.inited
                ? B.module.visitorTemporal
                : (B.module.visitorTemporal = (function () {
                    var v = new Map()
                    return new (class extends Yr {
                      reset(v) {
                        ;(this.magicString = null),
                          (this.possibleIndexes = null),
                          (this.runtimeName = null),
                          (this.temporalBindings = null),
                          (this.transforms = 0),
                          void 0 !== v &&
                            ((this.magicString = v.magicString),
                            (this.possibleIndexes = v.possibleIndexes),
                            (this.runtimeName = v.runtimeName),
                            (this.temporalBindings = v.temporalBindings))
                      }
                      visitIdentifier(g) {
                        var y = this,
                          x = g.getValue(),
                          E = x.name
                        if (this.temporalBindings.has(E) && !Zr(g, E, v)) {
                          var R = this.magicString,
                            _ = this.runtimeName
                          wi(g, function (v, g) {
                            y.transforms |= 128
                            var x = v.end,
                              P = v.start
                            if (g.shorthand)
                              R.prependLeft(
                                x,
                                ':' + _ + '.a("' + E + '",' + E + ')'
                              )
                            else {
                              var k = '',
                                I = ''
                              'NewExpression' === g.type &&
                                ((k = '('), (I = ')')),
                                ri(
                                  y,
                                  P,
                                  x,
                                  k + _ + '.a("' + E + '",' + E + ')' + I
                                )
                            }
                          })
                        }
                      }
                      visitExportDefaultDeclaration(v) {
                        var g = v.getValue(),
                          y = g.declaration
                        'FunctionDeclaration' !== y.type &&
                          ((this.transforms |= 128),
                          this.magicString.appendRight(
                            y.end,
                            this.runtimeName + '.j(["default"]);'
                          )),
                          v.call(this, 'visitWithoutReset', 'declaration')
                      }
                      visitExportNamedDeclaration(v) {
                        var g = v.getValue(),
                          y = g.declaration,
                          x = g.specifiers,
                          E = new Set()
                        if (null !== y) {
                          var R = y.type
                          if ('ClassDeclaration' === R) E.add(y.id.name)
                          else if ('VariableDeclaration' === R)
                            for (
                              var _ = 0,
                                P = y.declarations,
                                k = null == P ? 0 : P.length;
                              _ < k;
                              _++
                            )
                              for (
                                var I = P[_].id,
                                  A = Qr(I),
                                  N = 0,
                                  C = null == A ? 0 : A.length;
                                N < C;
                                N++
                              ) {
                                var O = A[N]
                                E.add(O)
                              }
                        } else if (null === g.source)
                          for (
                            var T = 0, L = null == x ? 0 : x.length;
                            T < L;
                            T++
                          ) {
                            var M = x[T]
                            E.add(M.exported.name)
                          }
                        else
                          for (
                            var D = 0, F = null == x ? 0 : x.length;
                            D < F;
                            D++
                          ) {
                            var j = x[D]
                            E.add(j.exported.name)
                          }
                        if (0 !== E.size) {
                          this.transforms |= 128
                          var V = y || g,
                            B = V.end
                          this.magicString.appendRight(
                            B,
                            ';' +
                              this.runtimeName +
                              '.j(' +
                              JSON.stringify([...E]) +
                              ');'
                          )
                        }
                        null !== y &&
                          v.call(this, 'visitWithoutReset', 'declaration')
                      }
                    })()
                  })()),
              Si = B.inited
                ? B.module.visitorUndeclared
                : (B.module.visitorUndeclared = (function () {
                    var v = new Map()
                    return new (class extends Yr {
                      reset(v) {
                        ;(this.magicString = null),
                          (this.possibleIndexes = null),
                          (this.runtimeName = null),
                          (this.transforms = 0),
                          (this.undeclared = null),
                          void 0 !== v &&
                            ((this.magicString = v.magicString),
                            (this.possibleIndexes = v.possibleIndexes),
                            (this.runtimeName = v.runtimeName),
                            (this.undeclared = v.undeclared))
                      }
                      visitIdentifier(g) {
                        var y = this,
                          x = g.getValue(),
                          E = x.name
                        if (
                          this.undeclared.has(E) &&
                          ni(x, R) &&
                          !Zr(g, E, v)
                        ) {
                          var R = g.getParentNode(),
                            _ = this.runtimeName
                          if (
                            'UnaryExpression' === R.type &&
                            'typeof' === R.operator
                          )
                            return (
                              (this.transforms |= 256),
                              void ri(this, x.start, x.end, _ + '.g.' + E)
                            )
                          wi(g, function (v, g) {
                            y.transforms |= 256
                            var x = v.end,
                              R = v.start
                            if (g.shorthand)
                              y.magicString.prependLeft(
                                x,
                                ':' + _ + '.t("' + E + '")'
                              )
                            else {
                              var P = '',
                                k = ''
                              'NewExpression' === g.type &&
                                ((P = '('), (k = ')')),
                                ri(y, R, x, P + _ + '.t("' + E + '")' + k)
                            }
                          })
                        }
                      }
                    })()
                  })()),
              Ri = B.inited
                ? B.module.Compiler
                : (B.module.Compiler = (function () {
                    var v = {
                        cjsPaths: !1,
                        cjsVars: !1,
                        generateVarDeclarations: !1,
                        hint: -1,
                        pragmas: !0,
                        runtimeName: '_',
                        sourceType: 1,
                        strict: void 0,
                        topLevelReturn: !1,
                      },
                      g = {
                        createOptions: function (v) {
                          return Hr({}, v, g.defaultOptions)
                        },
                        defaultOptions: v,
                        compile(v, y) {
                          ;(v = bi(v)),
                            (y = g.createOptions(y)),
                            ii.reset(),
                            si.reset(),
                            ui.reset(),
                            yi.reset(),
                            xi.reset(),
                            Ei.reset(),
                            Si.reset()
                          var x = {
                              circular: 0,
                              code: v,
                              codeWithTDZ: null,
                              filename: null,
                              firstAwaitOutsideFunction: null,
                              firstReturnOutsideFunction: null,
                              mtime: -1,
                              scriptData: null,
                              sourceType: 1,
                              transforms: 0,
                              yieldIndex: 0,
                            },
                            E = y,
                            R = E.hint,
                            _ = y,
                            P = _.sourceType
                          1 === R
                            ? (P = 1)
                            : 2 === R
                            ? (P = 2)
                            : y.pragmas &&
                              (ci(v, 'use module')
                                ? (P = 2)
                                : ci(v, 'use script') && (P = 1))
                          var k = oi(v, ['export']),
                            I = oi(v, ['eval']),
                            A = oi(v, ['import']),
                            N =
                              0 !== k.length || 0 !== I.length || 0 !== A.length
                          if (!N && (1 === P || 3 === P)) return x
                          var C,
                            O,
                            T = {
                              allowReturnOutsideFunction:
                                y.topLevelReturn || 1 === P,
                              sourceType: 1 === P ? 1 : 2,
                              strict: y.strict,
                            },
                            L = !0
                          try {
                            ;(C = Kr.parse(v, T)), (L = !1)
                          } catch (v) {
                            O = v
                          }
                          if (L && 3 === P) {
                            ;(P = 1),
                              (T.allowReturnOutsideFunction = !0),
                              (T.sourceType = P)
                            try {
                              ;(C = Kr.parse(v, T)), (L = !1)
                            } catch (v) {}
                          }
                          if (L) throw (y.cjsPaths && (O.inModule = !1), O)
                          var M = y,
                            D = M.cjsVars,
                            F = M.runtimeName,
                            j = C,
                            V = j.strict,
                            B = j.top,
                            G = B.identifiers
                          Reflect.deleteProperty(C, 'inModule'),
                            Reflect.deleteProperty(C, 'strict'),
                            Reflect.deleteProperty(C, 'top')
                          var U = new _t(v),
                            W = new Rt(C),
                            q = B.insertIndex
                          A.push(...k),
                            A.sort(Jr),
                            yi.visit(W, {
                              generateVarDeclarations:
                                y.generateVarDeclarations,
                              magicString: U,
                              possibleIndexes: A,
                              runtimeName: F,
                              sourceType: 1 === P ? 1 : 2,
                              top: B,
                              yieldIndex: q,
                            })
                          var z,
                            K = yi.transforms,
                            he = 0 != (2 & K),
                            fe = 0 != (4 & K),
                            de = 0 != (16 & K),
                            me = 0 != (32 & K)
                          if (
                            (3 === P && (P = fe || me || de ? 2 : 1), he || de)
                          ) {
                            var ve = new Set(['Reflect', 'console']),
                              ge = []
                            G.has('console')
                              ? ve.delete('console')
                              : ge.push('console'),
                              G.has('Reflect')
                                ? ve.delete('Reflect')
                                : ge.push('Reflect'),
                              ui.visit(W, {
                                globals: ve,
                                magicString: U,
                                possibleIndexes: oi(v, ge),
                                runtimeName: F,
                              })
                          }
                          if (
                            (G.has('eval') ||
                              si.visit(W, {
                                magicString: U,
                                possibleIndexes: I,
                                runtimeName: F,
                                strict: V,
                                transformUpdateBindings: fe,
                              }),
                            fe || de)
                          ) {
                            var ye = yi.assignableBindings
                            ;(z = oi(v, [...ye])),
                              D &&
                                xi.visit(W, {
                                  possibleIndexes: oi(v, ['require']),
                                })
                            var xe = B.importedBindings,
                              be = !xi.found && 0 !== xe.size,
                              we = z
                            be && (we.push(...oi(v, [...xe])), we.sort(Jr)),
                              ii.visit(W, {
                                assignableBindings: ye,
                                importedBindings: xe,
                                magicString: U,
                                possibleIndexes: we,
                                runtimeName: F,
                                transformImportBindingAssignments: be,
                                transformInsideFunctions: !0,
                              }),
                              yi.finalizeHoisting()
                          }
                          if (!D && 2 === P) {
                            for (
                              var Ee = [
                                  '__dirname',
                                  '__filename',
                                  'arguments',
                                  'exports',
                                  'module',
                                  'require',
                                ],
                                Se = new Set(),
                                Re = [],
                                _e = 0,
                                Pe = null == Ee ? 0 : Ee.length;
                              _e < Pe;
                              _e++
                            ) {
                              var ke = Ee[_e]
                              G.has(ke) || (Se.add(ke), Re.push(ke))
                            }
                            Si.visit(W, {
                              magicString: U,
                              possibleIndexes: oi(v, Re),
                              runtimeName: F,
                              undeclared: Se,
                            })
                          }
                          if (
                            ((x.transforms =
                              si.transforms |
                              ui.transforms |
                              K |
                              Si.transforms),
                            0 !== x.transforms &&
                              ((q = yi.yieldIndex), (x.code = '' + U)),
                            de)
                          ) {
                            var Ie = yi.assignableBindings,
                              Ae = yi.temporalBindings
                            f(x, 'codeWithTDZ', function () {
                              var g = oi(v, [...Ae])
                              g.push(...k),
                                g.sort(Jr),
                                ii.visit(W, {
                                  assignableBindings: Ie,
                                  magicString: U,
                                  possibleIndexes: z,
                                  runtimeName: F,
                                  transformOutsideFunctions: !0,
                                }),
                                Ei.visit(W, {
                                  magicString: U,
                                  possibleIndexes: g,
                                  runtimeName: F,
                                  temporalBindings: Ae,
                                })
                              var y = Ei.transforms
                              return (
                                (x.transforms |= y),
                                0 == (128 & y) ? null : '' + U
                              )
                            }),
                              (x.circular = -1)
                          }
                          return (
                            (x.firstAwaitOutsideFunction =
                              B.firstAwaitOutsideFunction),
                            (x.firstReturnOutsideFunction =
                              B.firstReturnOutsideFunction),
                            (x.sourceType = P),
                            (x.yieldIndex = q),
                            x
                          )
                        },
                      }
                    return g
                  })()),
              _i = B.inited
                ? B.module.SafeBuffer
                : (B.module.SafeBuffer = Se(B.external.Buffer)),
              Pi = B.inited
                ? B.module.GenericBuffer
                : (B.module.GenericBuffer = (function () {
                    return {
                      alloc: _i.alloc,
                      concat: _i.concat,
                      slice: G(_i.prototype.slice),
                    }
                  })()),
              ki = B.inited ? B.module.realFs : (B.module.realFs = et(W('fs'))),
              Ii = B.inited
                ? B.module.safeFs
                : (B.module.safeFs = (function () {
                    var v = Se(ki),
                      g = v.realpathSync.native
                    return (
                      'function' == typeof g && (B.realpathNativeSync = g),
                      me(v, 'constants') && K(v, 'constants', Se(v.constants)),
                      K(v, 'Stats', Se(v.Stats)),
                      v
                    )
                  })()),
              Ai = Ii.mkdirSync,
              Ni = Ii.readdirSync,
              Ci = Ii.readFileSync,
              Oi = Ii.realpathSync,
              Ti = Ii.Stats,
              Li = Ii.statSync,
              Mi = Ii.unlinkSync,
              Di = Ii.writeFileSync,
              Fi = B.inited
                ? B.module.envLastArgMatch
                : (B.module.envLastArgMatch = (function () {
                    return function (v, g, y = 1) {
                      for (var x = null == v ? 0 : v.length; x--; ) {
                        var E = g.exec(v[x])
                        if (null !== E) return vi(E[y])
                      }
                    }
                  })()),
              ji = B.inited
                ? B.module.utilGetToStringTag
                : (B.module.utilGetToStringTag = (function () {
                    var v = Object.prototype.toString
                    return function (g) {
                      return v.call(g)
                    }
                  })()),
              Vi = B.inited
                ? B.module.realUtil
                : (B.module.realUtil = et(W('util'))),
              Bi = B.inited
                ? B.module.safeUtil
                : (B.module.safeUtil = (function () {
                    var v = Se(Vi),
                      g = v.inspect,
                      y = g.custom
                    B.customInspectKey = 'symbol' == typeof y ? y : 'inspect'
                    var x = g.defaultOptions
                    return (
                      z(x) ||
                        (x = {
                          breakLength: 60,
                          colors: !1,
                          compact: !0,
                          customInspect: !0,
                          depth: 2,
                          maxArrayLength: 100,
                          showHidden: !1,
                          showProxy: !1,
                        }),
                      (B.defaultInspectOptions = x),
                      me(v, 'types') && K(v, 'types', Se(v.types)),
                      v
                    )
                  })()),
              Gi = Bi.deprecate,
              Ui = Bi.inspect,
              Wi = Bi.types,
              qi = Bi,
              $i = B.inited
                ? B.module.utilIsRegExp
                : (B.module.utilIsRegExp = (function () {
                    return 'function' == typeof (Wi && Wi.isRegExp)
                      ? Wi.isRegExp
                      : function (v) {
                          return ge(v) && '[object RegExp]' === ji(v)
                        }
                  })()),
              zi = B.inited
                ? B.module.utilToMatcher
                : (B.module.utilToMatcher = (function () {
                    return function (v) {
                      return 'function' == typeof v
                        ? function (g) {
                            return v(g)
                          }
                        : $i(v)
                        ? function (g) {
                            return v.test(g)
                          }
                        : function (g) {
                            return g === v
                          }
                    }
                  })()),
              Hi = B.inited
                ? B.module.utilMatches
                : (B.module.utilMatches = (function () {
                    return function (v, g) {
                      for (
                        var y, x = 0, E = null == v ? 0 : v.length;
                        x < E;
                        x++
                      ) {
                        var R = v[x]
                        if ((void 0 === y && (y = zi(g)), y(R))) return !0
                      }
                      return !1
                    }
                  })()),
              Ki = B.inited
                ? B.module.utilParseCommand
                : (B.module.utilParseCommand = (function () {
                    var v =
                      /(?:[^ "'\\]|\\.)*(["'])(?:(?!\1)[^\\]|\\.)*\1|(?:[^ "'\\]|\\.)+/g
                    return function (g) {
                      var y = []
                      if ('string' == typeof g)
                        for (var x; null !== (x = v.exec(g)); ) y.push(x[0])
                      return y
                    }
                  })()),
              Ji = B.inited
                ? B.module.envGetFlags
                : (B.module.envGetFlags = (function () {
                    return function () {
                      var v = Ki(Oe.NODE_OPTIONS)
                      Array.isArray(Te) && v.push(...Te)
                      var g = {}
                      return (
                        f(g, 'abortOnUncaughtException', function () {
                          return Hi(v, '--abort-on-uncaught-exception')
                        }),
                        f(g, 'check', function () {
                          return Hi(v, /^(?:--check|-c)$/)
                        }),
                        f(g, 'esModuleSpecifierResolution', function () {
                          return Fi(
                            v,
                            /^--es-module-specifier-resolution=(.+)$/
                          )
                        }),
                        f(g, 'eval', function () {
                          return Hi(v, /^(?:--eval|-e)$/)
                        }),
                        f(g, 'experimentalJSONModules', function () {
                          return Hi(v, '--experimental-json-modules')
                        }),
                        f(g, 'experimentalPolicy', function () {
                          return Hi(v, '--experimental-policy')
                        }),
                        f(g, 'experimentalREPLAwait', function () {
                          return Hi(v, '--experimental-repl-await')
                        }),
                        f(g, 'experimentalWorker', function () {
                          return Hi(v, '--experimental-worker')
                        }),
                        f(g, 'exposeInternals', function () {
                          return Hi(v, /^--expose[-_]internals$/)
                        }),
                        f(g, 'inspectBrk', function () {
                          return Hi(v, /^--(?:debug|inspect)-brk(?:=.+)?$/)
                        }),
                        f(g, 'interactive', function () {
                          return Hi(v, /^(?:--interactive|-i)$/)
                        }),
                        f(g, 'pendingDeprecation', function () {
                          return Hi(v, '--pending-deprecation')
                        }),
                        f(g, 'preserveSymlinks', function () {
                          return Hi(v, '--preserve-symlinks')
                        }),
                        f(g, 'preserveSymlinksMain', function () {
                          return Hi(v, '--preserve-symlinks-main')
                        }),
                        f(g, 'print', function () {
                          return Hi(v, /^(?:--print|-pe?)$/)
                        }),
                        f(g, 'type', function () {
                          return Fi(v, /^--type=(.+)$/)
                        }),
                        f(g, 'inspect', function () {
                          return (
                            g.inspectBrk ||
                            Hi(v, /^--(?:debug|inspect)(?:=.*)?$/)
                          )
                        }),
                        f(g, 'preloadModules', function () {
                          for (
                            var g = /^(?:--require|-r)$/,
                              y = v.length,
                              x = [],
                              E = -1;
                            ++E < y;

                          )
                            g.test(v[E]) && x.push(vi(v[++E]))
                          return x
                        }),
                        g
                      )
                    }
                  })()),
              Yi = B.inited
                ? B.module.pathIsAbsolute
                : (B.module.pathIsAbsolute = (function () {
                    return function (v) {
                      if ('string' != typeof v || 0 === v.length) return !1
                      if (47 === v.charCodeAt(0)) {
                        var g = Dn.WIN32,
                          y = v.charCodeAt(1)
                        if (!g) return 47 !== y
                      }
                      return ht(v)
                    }
                  })()),
              Qi = B.inited
                ? B.module.envIsWin32
                : (B.module.envIsWin32 = (function () {
                    return function () {
                      return 'win32' === Fe
                    }
                  })()),
              Xi = B.inited
                ? B.module.pathIsSep
                : (B.module.pathIsSep = (function () {
                    var v = Qi()
                    return function (g) {
                      return 'number' == typeof g
                        ? 47 === g || (v && 92 === g)
                        : '/' === g || (v && '\\' === g)
                    }
                  })()),
              Zi = B.inited
                ? B.module.pathIsRelativePath
                : (B.module.pathIsRelativePath = (function () {
                    return function (v) {
                      if ('string' != typeof v) return !1
                      var g = v.length
                      if (0 === g) return !1
                      var y = v.charCodeAt(0)
                      if (46 !== y) return !1
                      if (1 === g) return !0
                      if (((y = v.charCodeAt(1)), 46 === y)) {
                        if (2 === g) return !0
                        y = v.charCodeAt(2)
                      }
                      return Xi(y)
                    }
                  })()),
              en = B.inited
                ? B.module.utilIsPath
                : (B.module.utilIsPath = (function () {
                    return function (v) {
                      return (
                        'string' == typeof v &&
                        0 !== v.length &&
                        (Zi(v) || Yi(v))
                      )
                    }
                  })()),
              tn = y(1),
              rn = B.inited
                ? B.module.utilQuotifyJSON
                : (B.module.utilQuotifyJSON = (function () {
                    var v = new Set(['false', 'true']),
                      g = new Set(['"', "'"]),
                      y = /(|[^a-zA-Z])([a-zA-Z]+)([^a-zA-Z]|)/g
                    return function (x) {
                      return 'string' != typeof x || '' === x
                        ? x
                        : x.replace(y, function (y, x, E, R) {
                            return g.has(x) || v.has(E) || g.has(R)
                              ? y
                              : x + '"' + E + '"' + R
                          })
                    }
                  })()),
              nn = B.inited
                ? B.module.utilParseJSON6
                : (B.module.utilParseJSON6 = (function () {
                    function e(v) {
                      if ('string' == typeof v && v.length)
                        try {
                          return Object(tn.parse)(v)
                        } catch (v) {}
                      return null
                    }
                    return function (v) {
                      return e(v) || e(rn(v))
                    }
                  })()),
              sn = B.inited
                ? B.module.utilStripBOM
                : (B.module.utilStripBOM = (function () {
                    return function (v) {
                      return 'string' != typeof v
                        ? ''
                        : 65279 === v.charCodeAt(0)
                        ? v.slice(1)
                        : v
                    }
                  })()),
              an = B.inited
                ? B.module.fsReadFile
                : (B.module.fsReadFile = (function () {
                    return function (v, g) {
                      var y = null
                      try {
                        y = Ci(v, g)
                      } catch (v) {}
                      return y && 'utf8' === g ? sn(y) : y
                    }
                  })()),
              on = B.inited
                ? B.module.envGetOptions
                : (B.module.envGetOptions = (function () {
                    return function () {
                      var v = Oe && Oe.ESM_OPTIONS
                      if ('string' != typeof v) return null
                      var g = v.trim()
                      if (
                        (en(g) &&
                          ((g = an(dt(g), 'utf8')),
                          (g = null === g ? '' : g.trim())),
                        '' === g)
                      )
                        return null
                      var y = g.charCodeAt(0)
                      return (
                        (39 !== y && 123 !== y && 34 !== y) || (g = nn(g)), g
                      )
                    }
                  })()),
              un = B.inited
                ? B.module.builtinIds
                : (B.module.builtinIds = (function () {
                    var v = E.constructor.builtinModules
                    if (Array.isArray(v) && Object.isFrozen(v))
                      v = Array.from(v)
                    else {
                      var g = Ji(),
                        y = g.exposeInternals
                      for (var x in ((v = []), We.natives))
                        y
                          ? 'internal/bootstrap_loaders' !== x &&
                            'internal/bootstrap/loaders' !== x &&
                            v.push(x)
                          : x.startsWith('internal/') || v.push(x)
                    }
                    return v.sort()
                  })()),
              ln = B.inited
                ? B.module.builtinLookup
                : (B.module.builtinLookup = (function () {
                    return new Set(un)
                  })()),
              cn = B.inited
                ? B.module.envHasInspector
                : (B.module.envHasInspector = (function () {
                    return function () {
                      return (
                        1 === Pe.variables.v8_enable_inspector ||
                        (ln.has('inspector') && z(Ye('inspector')))
                      )
                    }
                  })()),
              pn = B.inited
                ? B.module.envIsBrave
                : (B.module.envIsBrave = (function () {
                    return function () {
                      return me(Ge, 'Brave')
                    }
                  })()),
              hn = B.inited
                ? B.module.utilIsOwnPath
                : (B.module.utilIsOwnPath = (function () {
                    var v = D.PACKAGE_FILENAMES
                    return function (g) {
                      if ('string' == typeof g)
                        for (
                          var y = 0, x = null == v ? 0 : v.length;
                          y < x;
                          y++
                        ) {
                          var E = v[y]
                          if (g === E) return !0
                        }
                      return !1
                    }
                  })()),
              fn = B.inited
                ? B.module.envHasLoaderModule
                : (B.module.envHasLoaderModule = (function () {
                    return function (v) {
                      return Hi(v, function ({ filename: v }) {
                        return hn(v)
                      })
                    }
                  })()),
              dn = B.inited
                ? B.module.envIsInternal
                : (B.module.envIsInternal = (function () {
                    return function () {
                      return E.id.startsWith('internal/')
                    }
                  })()),
              mn = E,
              vn = mn,
              gn = vn.parent,
              yn = new Set();
            null != gn && !yn.has(gn);

          )
            yn.add(gn), (mn = gn), (gn = mn.parent)
          var xn = mn,
            bn = B.inited
              ? B.module.envIsPreloaded
              : (B.module.envIsPreloaded = (function () {
                  return function () {
                    return (
                      !!dn() ||
                      ('internal/preload' === xn.id && fn(xn.children))
                    )
                  }
                })()),
            wn = B.inited
              ? B.module.envIsCheck
              : (B.module.envIsCheck = (function () {
                  return function () {
                    var v = _e.length
                    return (1 === v || 2 === v) && Ji().check && bn()
                  }
                })()),
            En = B.inited
              ? B.module.envIsCLI
              : (B.module.envIsCLI = (function () {
                  return function () {
                    return _e.length > 1 && bn()
                  }
                })()),
            Sn = B.inited
              ? B.module.envIsDevelopment
              : (B.module.envIsDevelopment = (function () {
                  return function () {
                    return 'development' === Oe.NODE_ENV
                  }
                })()),
            Rn = B.inited
              ? B.module.envIsElectron
              : (B.module.envIsElectron = (function () {
                  return function () {
                    return me(Ge, 'electron') || pn()
                  }
                })()),
            _n = B.inited
              ? B.module.envIsElectronRenderer
              : (B.module.envIsElectronRenderer = (function () {
                  return function () {
                    return 'renderer' === Be && Rn()
                  }
                })()),
            Pn = B.inited
              ? B.module.envIsPrint
              : (B.module.envIsPrint = (function () {
                  return function () {
                    return 1 === _e.length && Ji().print && bn()
                  }
                })()),
            kn = B.inited
              ? B.module.envIsEval
              : (B.module.envIsEval = (function () {
                  return function () {
                    if (Pn()) return !0
                    if (1 !== _e.length || !bn()) return !1
                    var v = Ji()
                    return v.eval || (!Ve.isTTY && !v.interactive)
                  }
                })()),
            In = B.inited
              ? B.module.envIsJamine
              : (B.module.envIsJamine = (function () {
                  var v = D.PACKAGE_PARENT_NAME
                  return function () {
                    return 'jasmine' === v
                  }
                })()),
            An = B.inited
              ? B.module.envIsNdb
              : (B.module.envIsNdb = (function () {
                  return function () {
                    return me(Ge, 'ndb')
                  }
                })()),
            Nn = B.inited
              ? B.module.envIsNyc
              : (B.module.envIsNyc = (function () {
                  return function () {
                    return me(Oe, 'NYC_ROOT_ID')
                  }
                })()),
            Cn = B.inited
              ? B.module.envIsREPL
              : (B.module.envIsREPL = (function () {
                  return function () {
                    return (
                      1 === _e.length &&
                      (!!bn() ||
                        ('<repl>' === xn.id &&
                          null === xn.filename &&
                          !1 === xn.loaded &&
                          null == xn.parent &&
                          fn(xn.children)))
                    )
                  }
                })()),
            On = B.inited
              ? B.module.envIsRunkit
              : (B.module.envIsRunkit = (function () {
                  return function () {
                    return me(Oe, 'RUNKIT_HOST')
                  }
                })()),
            Tn = B.inited
              ? B.module.envIsTink
              : (B.module.envIsTink = (function () {
                  var v = D.PACKAGE_PARENT_NAME
                  return function () {
                    return 'tink' === v
                  }
                })()),
            Ln = B.inited
              ? B.module.envIsYarnPnP
              : (B.module.envIsYarnPnP = (function () {
                  return function () {
                    return me(Ge, 'pnp')
                  }
                })()),
            Mn = {}
          f(Mn, 'BRAVE', pn),
            f(Mn, 'CHECK', wn),
            f(Mn, 'CLI', En),
            f(Mn, 'DEVELOPMENT', Sn),
            f(Mn, 'ELECTRON', Rn),
            f(Mn, 'ELECTRON_RENDERER', _n),
            f(Mn, 'EVAL', kn),
            f(Mn, 'FLAGS', Ji),
            f(Mn, 'HAS_INSPECTOR', cn),
            f(Mn, 'INTERNAL', dn),
            f(Mn, 'JASMINE', In),
            f(Mn, 'NDB', An),
            f(Mn, 'NYC', Nn),
            f(Mn, 'OPTIONS', on),
            f(Mn, 'PRELOADED', bn),
            f(Mn, 'PRINT', Pn),
            f(Mn, 'REPL', Cn),
            f(Mn, 'RUNKIT', On),
            f(Mn, 'TINK', Tn),
            f(Mn, 'WIN32', Qi),
            f(Mn, 'YARN_PNP', Ln)
          var Dn = Mn,
            Fn = B.inited
              ? B.module.fsStatSync
              : (B.module.fsStatSync = (function () {
                  var v = Dn.ELECTRON,
                    g = Ti.prototype
                  return function (y) {
                    if ('string' != typeof y) return null
                    var x,
                      E = B.moduleState.statSync
                    if (null !== E && ((x = E.get(y)), void 0 !== x)) return x
                    try {
                      ;(x = Li(y)), !v || x instanceof Ti || Ee(x, g)
                    } catch (v) {
                      x = null
                    }
                    return null !== E && E.set(y, x), x
                  }
                })()),
            jn = B.inited
              ? B.module.pathToNamespacedPath
              : (B.module.pathToNamespacedPath = (function () {
                  return 'function' == typeof vt ? vt : gt._makeLong
                })()),
            Vn = B.inited
              ? B.module.fsStatFast
              : (B.module.fsStatFast = (function () {
                  var v,
                    g = Ti.prototype.isFile
                  return function (y) {
                    if ('string' != typeof y) return -1
                    var x,
                      E = B.moduleState.statFast
                    return null !== E && ((x = E.get(y)), void 0 !== x)
                      ? x
                      : ((x = (function (y) {
                          if (
                            (void 0 === v &&
                              (v =
                                'function' == typeof We.fs.internalModuleStat),
                            v)
                          ) {
                            try {
                              return (function (v) {
                                var g =
                                  'string' == typeof v
                                    ? We.fs.internalModuleStat(jn(v))
                                    : -1
                                return g < 0 ? -1 : g
                              })(y)
                            } catch (v) {}
                            v = !1
                          }
                          return (function (v) {
                            var y = Fn(v)
                            return null !== y
                              ? Reflect.apply(g, y, [])
                                ? 0
                                : 1
                              : -1
                          })(y)
                        })(y)),
                        null !== E && E.set(y, x),
                        x)
                  }
                })()),
            Bn = B.inited
              ? B.module.fsExists
              : (B.module.fsExists = (function () {
                  return function (v) {
                    return -1 !== Vn(v)
                  }
                })()),
            Gn = B.inited
              ? B.module.utilGetCachePathHash
              : (B.module.utilGetCachePathHash = (function () {
                  return function (v) {
                    return 'string' == typeof v ? v.slice(0, 8) : ''
                  }
                })()),
            Un = B.inited
              ? B.module.pathIsExtMJS
              : (B.module.pathIsExtMJS = (function () {
                  return function (v) {
                    if ('string' != typeof v) return !1
                    var g = v.length
                    return (
                      g > 4 &&
                      109 === v.charCodeAt(g - 3) &&
                      46 === v.charCodeAt(g - 4) &&
                      106 === v.charCodeAt(g - 2) &&
                      115 === v.charCodeAt(g - 1)
                    )
                  }
                })()),
            Wn = B.inited
              ? B.module.utilGet
              : (B.module.utilGet = (function () {
                  return function (v, g, y) {
                    if (null != v)
                      try {
                        return void 0 === y ? v[g] : Reflect.get(v, g, y)
                      } catch (v) {}
                  }
                })()),
            qn = B.inited
              ? B.module.utilGetEnv
              : (B.module.utilGetEnv = (function () {
                  return function (v) {
                    return Wn(q.env, v)
                  }
                })()),
            $n = B.inited
              ? B.module.utilIsDirectory
              : (B.module.utilIsDirectory = (function () {
                  return function (v) {
                    return 1 === Vn(v)
                  }
                })()),
            zn = B.inited
              ? B.module.fsMkdir
              : (B.module.fsMkdir = (function () {
                  return function (v) {
                    if ('string' == typeof v)
                      try {
                        return Ai(v), !0
                      } catch (v) {}
                    return !1
                  }
                })()),
            Hn = B.inited
              ? B.module.fsMkdirp
              : (B.module.fsMkdirp = (function () {
                  return function (v) {
                    if ('string' != typeof v) return !1
                    for (var g = []; !$n(v); ) {
                      g.push(v)
                      var y = ct(v)
                      if (v === y) break
                      v = y
                    }
                    for (var x = g.length; x--; ) if (!zn(g[x])) return !1
                    return !0
                  }
                })()),
            Kn = B.inited
              ? B.module.utilParseJSON
              : (B.module.utilParseJSON = (function () {
                  return function (v) {
                    if ('string' == typeof v && v.length)
                      try {
                        return JSON.parse(v)
                      } catch (v) {}
                    return null
                  }
                })()),
            Jn = B.inited
              ? B.module.pathNormalize
              : (B.module.pathNormalize = (function () {
                  var v = Qi(),
                    g = /\\/g
                  return v
                    ? function (v) {
                        return 'string' == typeof v ? v.replace(g, '/') : ''
                      }
                    : function (v) {
                        return 'string' == typeof v ? v : ''
                      }
                })()),
            Yn = B.inited
              ? B.module.pathRelative
              : (B.module.pathRelative = (function () {
                  var v = Qi()
                  return v
                    ? function (v, g) {
                        for (
                          var y = v.length,
                            x = g.length,
                            E = v.toLowerCase(),
                            R = g.toLowerCase(),
                            _ = -1;
                          ++_ < y && 92 === v.charCodeAt(_);

                        );
                        for (
                          var P = y - _, k = -1;
                          ++k < x && 92 === g.charCodeAt(k);

                        );
                        for (
                          var I = x - k, A = P < I ? P : I, N = -1, C = -1;
                          ++N <= A;

                        ) {
                          if (N === A) {
                            if (I > A) {
                              if (92 === g.charCodeAt(k + N))
                                return g.slice(k + N + 1)
                              if (2 === N) return g.slice(k + N)
                            }
                            P > A &&
                              (92 === v.charCodeAt(_ + N)
                                ? (C = N)
                                : 2 === N && (C = 3))
                            break
                          }
                          var O = E.charCodeAt(_ + N),
                            T = R.charCodeAt(k + N)
                          if (O !== T) break
                          92 === O && (C = N)
                        }
                        if (N !== A && -1 === C) return g
                        var L = ''
                        for (-1 === C && (C = 0), N = _ + C; ++N <= y; )
                          (N !== y && 92 !== v.charCodeAt(N)) ||
                            (L += 0 === L.length ? '..' : '/..')
                        return L.length > 0
                          ? L + Jn(g.slice(k + C))
                          : ((k += C),
                            92 === g.charCodeAt(k) && ++k,
                            Jn(g.slice(k)))
                      }
                    : function (v, g) {
                        for (
                          var y = v.length,
                            x = y - 1,
                            E = 1,
                            R = g.length,
                            _ = R - E,
                            P = x < _ ? x : _,
                            k = -1,
                            I = -1;
                          ++k <= P;

                        ) {
                          if (k === P) {
                            if (_ > P) {
                              if (47 === g.charCodeAt(E + k))
                                return g.slice(E + k + 1)
                              if (0 === k) return g.slice(E + k)
                            } else
                              x > P &&
                                (47 === v.charCodeAt(1 + k)
                                  ? (I = k)
                                  : 0 === k && (I = 0))
                            break
                          }
                          var A = v.charCodeAt(1 + k),
                            N = g.charCodeAt(E + k)
                          if (A !== N) break
                          47 === A && (I = k)
                        }
                        var C = ''
                        for (k = 1 + I; ++k <= y; )
                          (k !== y && 47 !== v.charCodeAt(k)) ||
                            (C += 0 === C.length ? '..' : '/..')
                        return 0 !== C.length
                          ? C + g.slice(E + I)
                          : ((E += I),
                            47 === g.charCodeAt(E) && ++E,
                            g.slice(E))
                      }
                })()),
            Qn = B.inited
              ? B.module.fsRemoveFile
              : (B.module.fsRemoveFile = (function () {
                  return function (v) {
                    if ('string' == typeof v)
                      try {
                        return Mi(v), !0
                      } catch (v) {}
                    return !1
                  }
                })()),
            Zn = B.inited
              ? B.module.fsWriteFile
              : (B.module.fsWriteFile = (function () {
                  return function (v, g, y) {
                    if ('string' == typeof v)
                      try {
                        return Di(v, g, y), !0
                      } catch (v) {}
                    return !1
                  }
                })()),
            es = B.inited
              ? B.module.CachingCompiler
              : (B.module.CachingCompiler = (function () {
                  var v = D.PACKAGE_VERSION,
                    g = {
                      compile: (v, g = {}) =>
                        !g.eval && g.filename && g.cachePath
                          ? (function (v, g) {
                              var y = g.cacheName,
                                x = g.cachePath,
                                E = r(v, g)
                              if (!y || !x || 0 === E.transforms) return E
                              var R = B.pendingWrites,
                                _ = R.get(x)
                              return (
                                void 0 === _ && ((_ = new Map()), R.set(x, _)),
                                _.set(y, E),
                                E
                              )
                            })(v, g)
                          : r(v, g),
                      from(v) {
                        var g = v.package,
                          y = g.cache,
                          x = v.cacheName,
                          E = y.meta.get(x)
                        if (void 0 === E) return null
                        var R = E.length,
                          _ = {
                            circular: 0,
                            code: null,
                            codeWithTDZ: null,
                            filename: null,
                            firstAwaitOutsideFunction: null,
                            firstReturnOutsideFunction: null,
                            mtime: -1,
                            scriptData: null,
                            sourceType: 1,
                            transforms: 0,
                            yieldIndex: -1,
                          }
                        if (R > 2) {
                          var P = E[7]
                          'string' == typeof P &&
                            (_.filename = dt(g.cachePath, P))
                          var k = E[5]
                          null !== k && (_.firstAwaitOutsideFunction = n(k))
                          var I = E[6]
                          null !== I && (_.firstReturnOutsideFunction = n(I)),
                            (_.mtime = +E[3]),
                            (_.sourceType = +E[4]),
                            (_.transforms = +E[2])
                        }
                        R > 7 &&
                          2 === _.sourceType &&
                          ((v.type = 3),
                          (_.circular = +E[8]),
                          (_.yieldIndex = +E[9]))
                        var A = E[0],
                          N = E[1]
                        return (
                          -1 !== A &&
                            -1 !== N &&
                            (_.scriptData = Pi.slice(y.buffer, A, N)),
                          (v.compileData = _),
                          y.compile.set(x, _),
                          _
                        )
                      },
                    }
                  function r(v, g) {
                    var y = Ri.compile(
                      v,
                      (function (v = {}) {
                        var g = v.cjsPaths,
                          y = v.cjsVars,
                          x = v.topLevelReturn
                        Un(v.filename) &&
                          ((g = void 0), (y = void 0), (x = void 0))
                        var E = v.runtimeName
                        return v.eval
                          ? {
                              cjsPaths: g,
                              cjsVars: y,
                              runtimeName: E,
                              topLevelReturn: !0,
                            }
                          : {
                              cjsPaths: g,
                              cjsVars: y,
                              generateVarDeclarations:
                                v.generateVarDeclarations,
                              hint: v.hint,
                              pragmas: v.pragmas,
                              runtimeName: E,
                              sourceType: v.sourceType,
                              strict: v.strict,
                              topLevelReturn: x,
                            }
                      })(g)
                    )
                    return g.eval
                      ? y
                      : ((y.filename = g.filename), (y.mtime = g.mtime), y)
                  }
                  function i({ column: v, line: g }) {
                    return [v, g]
                  }
                  function n([v, g]) {
                    return { column: v, line: g }
                  }
                  return (
                    je(Me() + 1),
                    De(
                      'exit',
                      ze(function () {
                        je(Math.max(Me() - 1, 0))
                        var g = B.pendingScripts,
                          y = B.pendingWrites,
                          x = B.package.dir
                        x.forEach(function (v, E) {
                          if ('' !== E) {
                            var R,
                              _ = !Hn(E),
                              P = v.dirty
                            P ||
                              _ ||
                              ((P = !!Kn(qn('ESM_DISABLE_CACHE'))),
                              (v.dirty = P)),
                              (P || _) &&
                                (x.delete(E), g.delete(E), y.delete(E)),
                              _ ||
                                (P &&
                                  ((R = E + mt + '.dirty'),
                                  Bn(R) || Zn(R, ''),
                                  Qn(E + mt + '.data.blob'),
                                  Qn(E + mt + '.data.json'),
                                  v.compile.forEach(function (v, g) {
                                    Qn(E + mt + g)
                                  })))
                          }
                        })
                        var E = new Map(),
                          R = B.support.createCachedData
                        g.forEach(function (v, g) {
                          var y = x.get(g),
                            _ = y.compile,
                            P = y.meta
                          v.forEach(function (v, y) {
                            var x,
                              k = _.get(y)
                            void 0 === k && (k = null),
                              null !== k &&
                                ((x = k.scriptData), null === x && (x = void 0))
                            var I = !1,
                              A = null
                            if (
                              (void 0 === x &&
                                (R && 'function' == typeof v.createCachedData
                                  ? (A = v.createCachedData())
                                  : v.cachedDataProduced && (A = v.cachedData)),
                              null !== A && A.length && (I = !0),
                              null !== k)
                            )
                              if (null !== A) k.scriptData = A
                              else if (void 0 !== x && v.cachedDataRejected) {
                                I = !0
                                var N = P.get(y)
                                void 0 !== N && ((N[0] = -1), (N[1] = -1)),
                                  (A = null),
                                  (k.scriptData = null)
                              }
                            if (I && '' !== y) {
                              var C = E.get(g)
                              void 0 === C && ((C = new Map()), E.set(g, C)),
                                C.set(y, A)
                            }
                          })
                        }),
                          E.forEach(function (g, y) {
                            var E = x.get(y),
                              R = E.compile,
                              _ = E.meta
                            g.forEach(function (v, g) {
                              var x = _.get(g)
                              if (void 0 === x) {
                                x = [-1, -1]
                                var E = R.get(g)
                                if ((void 0 === E && (E = null), null !== E)) {
                                  var P = E,
                                    k = P.filename,
                                    I = P.firstAwaitOutsideFunction,
                                    A = P.firstReturnOutsideFunction,
                                    N = P.mtime,
                                    C = P.sourceType,
                                    O = P.transforms,
                                    T = null === I ? null : i(I),
                                    L = null === A ? null : i(A)
                                  1 === C
                                    ? 0 !== O && x.push(O, N, C, T, L, Yn(y, k))
                                    : x.push(
                                        O,
                                        N,
                                        C,
                                        T,
                                        L,
                                        Yn(y, k),
                                        E.circular,
                                        E.yieldIndex
                                      )
                                }
                                _.set(g, x)
                              }
                            })
                            var P = E.buffer,
                              k = [],
                              I = {},
                              A = 0
                            _.forEach(function (v, y) {
                              var x = g.get(y)
                              if (void 0 === x) {
                                var E = R.get(y)
                                void 0 === E && (E = null)
                                var _ = v[0],
                                  N = v[1]
                                ;(x = null),
                                  null !== E
                                    ? (x = E.scriptData)
                                    : -1 !== _ &&
                                      -1 !== N &&
                                      (x = Pi.slice(P, _, N))
                              }
                              null !== x &&
                                ((v[0] = A),
                                (A += x.length),
                                (v[1] = A),
                                k.push(x)),
                                (I[y] = v)
                            }),
                              Zn(y + mt + '.data.blob', Pi.concat(k)),
                              Zn(
                                y + mt + '.data.json',
                                JSON.stringify({ meta: I, version: v })
                              )
                          }),
                          y.forEach(function (v, g) {
                            v.forEach(function (v, y) {
                              Zn(g + mt + y, v.code) &&
                                (function (v, g) {
                                  var y = B.package.dir.get(v),
                                    x = y.compile,
                                    E = y.meta,
                                    R = Gn(g)
                                  x.forEach(function (y, _) {
                                    _ !== g &&
                                      _.startsWith(R) &&
                                      (x.delete(_), E.delete(_), Qn(v + mt + _))
                                  })
                                })(g, y)
                            })
                          })
                      })
                    ),
                    g
                  )
                })()),
            ts = B.inited
              ? B.module.SafeArray
              : (B.module.SafeArray = Se(B.external.Array)),
            rs = B.inited
              ? B.module.GenericArray
              : (B.module.GenericArray = (function () {
                  var v = Array.prototype,
                    g = ts.prototype
                  return {
                    concat: G(g.concat),
                    from: ts.from,
                    indexOf: G(v.indexOf),
                    join: G(v.join),
                    of: ts.of,
                    push: G(v.push),
                    unshift: G(v.unshift),
                  }
                })()),
            is = B.inited
              ? B.module.GenericObject
              : (B.module.GenericObject = (function () {
                  var v = B.external.Object
                  return {
                    create: (g, y) => (
                      null === y && (y = void 0),
                      null === g || z(g)
                        ? Object.create(g, y)
                        : void 0 === y
                        ? new v()
                        : Object.defineProperties(new v(), y)
                    ),
                  }
                })()),
            ns = B.inited
              ? B.module.RealModule
              : (B.module.RealModule = et(W('module'))),
            ss = B.inited
              ? B.module.SafeModule
              : (B.module.SafeModule = Se(ns)),
            as = B.inited
              ? B.module.SafeObject
              : (B.module.SafeObject = Se(B.external.Object)),
            os = B.inited
              ? B.module.utilAssign
              : (B.module.utilAssign = (function () {
                  return function (v) {
                    for (var g = arguments.length, y = 0; ++y < g; ) {
                      var x = arguments[y]
                      for (var E in x) me(x, E) && (v[E] = x[E])
                    }
                    return v
                  }
                })()),
            us = B.inited
              ? B.module.utilDecodeURIComponent
              : (B.module.utilDecodeURIComponent = (function () {
                  var v = decodeURIComponent
                  return function (g) {
                    return 'string' == typeof g ? v(g) : ''
                  }
                })()),
            ls = B.inited
              ? B.module.realPunycode
              : (B.module.realPunycode = (function () {
                  if (ln.has('punycode')) {
                    var v = Ye('punycode')
                    return z(v) ? et(v) : void 0
                  }
                })()),
            cs = B.inited
              ? B.module.safePunycode
              : (B.module.safePunycode = Se(ls)),
            ps = void 0 === cs ? void 0 : cs.toUnicode,
            hs = B.inited
              ? B.module.realURL
              : (B.module.realURL = et(W('url'))),
            fs = B.inited ? B.module.safeURL : (B.module.safeURL = Se(hs)),
            ds = fs.URL,
            vs = fs.domainToUnicode,
            gs = fs.parse,
            ys = B.inited
              ? B.module.utilDomainToUnicode
              : (B.module.utilDomainToUnicode = (function () {
                  var v = 'function' == typeof vs ? vs : ps
                  return function (g) {
                    return 'string' == typeof g ? v(g) : ''
                  }
                })()),
            xs = B.inited
              ? B.module.pathHasEncodedSep
              : (B.module.pathHasEncodedSep = (function () {
                  var v = Dn.WIN32,
                    g = /%2f/i,
                    y = /%5c|%2f/i
                  return function (x) {
                    return 'string' == typeof x && (v ? y.test(x) : g.test(x))
                  }
                })()),
            bs = B.inited
              ? B.module.utilParseURL
              : (B.module.utilParseURL = (function () {
                  var v = 'function' == typeof ds,
                    g = [
                      'hash',
                      'host',
                      'hostname',
                      'href',
                      'pathname',
                      'port',
                      'protocol',
                      'search',
                    ]
                  return function (y) {
                    var x = B.memoize.utilParseURL,
                      E = x.get(y)
                    return void 0 !== E
                      ? E
                      : ('string' == typeof y &&
                          y.length > 1 &&
                          47 === y.charCodeAt(0) &&
                          47 === y.charCodeAt(1) &&
                          (y = 'file:' + y),
                        (E = v
                          ? new ds(y)
                          : (function (v) {
                              for (
                                var y = gs(v),
                                  x = 0,
                                  E = null == g ? 0 : g.length;
                                x < E;
                                x++
                              ) {
                                var R = g[x]
                                'string' != typeof y[R] && (y[R] = '')
                              }
                              return y
                            })(y)),
                        x.set(y, E),
                        E)
                  }
                })()),
            ws = B.inited
              ? B.module.utilGetFilePathFromURL
              : (B.module.utilGetFilePathFromURL = (function () {
                  var v = Dn.WIN32
                  return function (g) {
                    var y = 'string' == typeof g ? bs(g) : g,
                      x = y.pathname
                    if ('' === x || 'file:' !== y.protocol || xs(x)) return ''
                    var E = y.host
                    if (((x = us(x)), '' !== E && 'localhost' !== E))
                      return v ? '\\\\' + ys(E) + ft(x) : ''
                    if (!v) return x
                    if (x.length < 3 || 58 !== x.charCodeAt(2)) return ''
                    var R = x.charCodeAt(1)
                    return ((R >= 65 && R <= 90) || (R >= 97 && R <= 122)) &&
                      47 === x.charCodeAt(3)
                      ? ft(x).slice(1)
                      : ''
                  }
                })()),
            Es = B.inited
              ? B.module.utilIsFileOrigin
              : (B.module.utilIsFileOrigin = (function () {
                  return function (v) {
                    if ('string' != typeof v) return !1
                    var g = v.length
                    return (
                      g > 7 &&
                      102 === v.charCodeAt(0) &&
                      105 === v.charCodeAt(1) &&
                      108 === v.charCodeAt(2) &&
                      101 === v.charCodeAt(3) &&
                      58 === v.charCodeAt(4) &&
                      47 === v.charCodeAt(5) &&
                      47 === v.charCodeAt(6)
                    )
                  }
                })()),
            ks = B.inited
              ? B.module.utilGetModuleDirname
              : (B.module.utilGetModuleDirname = (function () {
                  return function (v) {
                    if (ge(v)) {
                      var g = v.path
                      if ('string' == typeof g) return g
                      var y = v.id
                      if (ln.has(y)) return ''
                      var x = v.filename
                      if (
                        (null === x &&
                          'string' == typeof y &&
                          (x = Es(y) ? ws(y) : y),
                        'string' == typeof x)
                      )
                        return ct(x)
                    }
                    return '.'
                  }
                })()),
            Is = B.inited
              ? B.module.pathIsExtNode
              : (B.module.pathIsExtNode = (function () {
                  return function (v) {
                    if ('string' != typeof v) return !1
                    var g = v.length
                    return (
                      g > 5 &&
                      110 === v.charCodeAt(g - 4) &&
                      46 === v.charCodeAt(g - 5) &&
                      111 === v.charCodeAt(g - 3) &&
                      100 === v.charCodeAt(g - 2) &&
                      101 === v.charCodeAt(g - 1)
                    )
                  }
                })()),
            As = B.inited
              ? B.module.utilCopyProperty
              : (B.module.utilCopyProperty = (function () {
                  return function (v, g, y) {
                    if (!z(v) || !z(g)) return v
                    var x = Reflect.getOwnPropertyDescriptor(g, y)
                    return (
                      void 0 !== x &&
                        (xe(x)
                          ? (v[y] = g[y])
                          : Reflect.defineProperty(v, y, x)),
                      v
                    )
                  }
                })()),
            Ns = B.inited
              ? B.module.utilIsError
              : (B.module.utilIsError = (function () {
                  var v = qi.types
                  if ('function' == typeof (v && v.isNativeError))
                    return v.isNativeError
                  var g = We.util.isNativeError
                  return 'function' == typeof g ? g : qi.isError
                })()),
            Os = B.inited
              ? B.module.errorCaptureStackTrace
              : (B.module.errorCaptureStackTrace = (function () {
                  var v = Error.captureStackTrace
                  return function (g, y) {
                    return Ns(g) && ('function' == typeof y ? v(g, y) : v(g)), g
                  }
                })()),
            Ls = B.inited
              ? B.module.utilNativeTrap
              : (B.module.utilNativeTrap = (function () {
                  return function (v) {
                    return function t(...g) {
                      try {
                        return Reflect.apply(v, this, g)
                      } catch (v) {
                        throw (Os(v, t), v)
                      }
                    }
                  }
                })()),
            Ds = B.inited
              ? B.module.utilEmptyArray
              : (B.module.utilEmptyArray = (function () {
                  return []
                })()),
            Fs = B.inited
              ? B.module.utilEmptyObject
              : (B.module.utilEmptyObject = (function () {
                  return {}
                })()),
            js = B.inited
              ? B.module.utilIsOwnProxy
              : (B.module.utilIsOwnProxy = (function () {
                  var v = D.PACKAGE_PREFIX,
                    g = RegExp(
                      '[\\["\']' +
                        ai(v) +
                        ':proxy[\'"\\]]\\s*:\\s*1\\s*\\}\\s*.?$'
                    ),
                    y = {
                      breakLength: 1 / 0,
                      colors: !1,
                      compact: !0,
                      customInspect: !1,
                      depth: 0,
                      maxArrayLength: 0,
                      showHidden: !1,
                      showProxy: !0,
                    },
                    x = {
                      breakLength: 1 / 0,
                      colors: !1,
                      compact: !0,
                      customInspect: !1,
                      depth: 1,
                      maxArrayLength: 0,
                      showHidden: !0,
                      showProxy: !0,
                    },
                    E = 0
                  return function (v) {
                    return (
                      He.instances.has(v) ||
                      (function (v) {
                        if (!B.support.inspectProxies || !z(v) || 1 != ++E)
                          return !1
                        var R
                        try {
                          R = Ui(v, y)
                        } finally {
                          E -= 1
                        }
                        if (!R.startsWith('Proxy [')) return !1
                        E += 1
                        try {
                          R = Ui(v, x)
                        } finally {
                          E -= 1
                        }
                        return g.test(R)
                      })(v)
                    )
                  }
                })()),
            Vs = B.inited
              ? B.module.utilUnwrapOwnProxy
              : (B.module.utilUnwrapOwnProxy = (function () {
                  return function (v) {
                    if (!z(v)) return v
                    var g = B.memoize.utilUnwrapOwnProxy,
                      y = g.get(v)
                    if (void 0 !== y) return y
                    for (
                      var x, E = He.instances, R = v;
                      void 0 !== (x = E.get(R));

                    )
                      R = x[0]
                    return g.set(v, R), R
                  }
                })()),
            Bs = B.inited
              ? B.module.shimFunctionPrototypeToString
              : (B.module.shimFunctionPrototypeToString = (function () {
                  var v = B.proxyNativeSourceText,
                    g = '' === v ? 'function () { [native code] }' : v,
                    y = {
                      enable(y) {
                        var x = Reflect.getOwnPropertyDescriptor(y, 'Function')
                            .value.prototype,
                          E = B.memoize.shimFunctionPrototypeToString
                        if (
                          (function (v, g) {
                            var y = g.get(v)
                            if (void 0 !== y) return y
                            y = !0
                            try {
                              var x = v.toString
                              'function' == typeof x &&
                                (y =
                                  Reflect.apply(x, new He(x, Fs), Ds) ===
                                  Reflect.apply(x, x, Ds))
                            } catch (v) {
                              y = !1
                            }
                            return g.set(v, y), y
                          })(x, E)
                        )
                          return y
                        var R = Ls(function (y, x) {
                          '' !== v && js(x) && (x = Vs(x))
                          try {
                            return Reflect.apply(y, x, Ds)
                          } catch (v) {
                            if ('function' != typeof x) throw v
                          }
                          if (js(x))
                            try {
                              return Reflect.apply(y, Vs(x), Ds)
                            } catch (v) {}
                          return g
                        })
                        return (
                          Reflect.defineProperty(x, 'toString', {
                            configurable: !0,
                            value: new He(x.toString, { apply: R }),
                            writable: !0,
                          }) && E.set(x, !0),
                          y
                        )
                      },
                    }
                  return y
                })())
          Bs.enable(B.safeGlobal)
          var Xn = function (v, g) {
              if ('function' != typeof g) return v
              var y = B.memoize.utilMaskFunction,
                x = y.get(v)
              if (void 0 !== x) return x.proxy
              ;(x = y.get(g)), void 0 !== x && (g = x.source)
              var E = new He(v, {
                  get: (v, g, y) =>
                    'toString' !== g || me(v, 'toString')
                      ? (y === E && (y = v), Reflect.get(v, g, y))
                      : x.toString,
                }),
                R = me(g, 'prototype') ? g.prototype : void 0
              if (z(R)) {
                var _ = me(v, 'prototype') ? v.prototype : void 0
                z(_) ||
                  ((_ = is.create()),
                  Reflect.defineProperty(v, 'prototype', {
                    value: _,
                    writable: !0,
                  })),
                  Reflect.defineProperty(_, 'constructor', {
                    configurable: !0,
                    value: E,
                    writable: !0,
                  }),
                  Ee(_, qe(R))
              } else {
                var P = Reflect.getOwnPropertyDescriptor(g, 'prototype')
                void 0 === P
                  ? Reflect.deleteProperty(v, 'prototype')
                  : Reflect.defineProperty(v, 'prototype', P)
              }
              return (
                As(v, g, 'name'),
                Ee(v, qe(g)),
                (x = {
                  proxy: E,
                  source: g,
                  toString: new He(v.toString, {
                    apply: Ls(function (g, y, E) {
                      return (
                        pp.state.package.default.options.debug ||
                          'function' != typeof y ||
                          Vs(y) !== v ||
                          (y = x.source),
                        Reflect.apply(g, y, E)
                      )
                    }),
                  }),
                }),
                y.set(v, x),
                y.set(E, x),
                E
              )
            },
            Gs = B.inited
              ? B.module.utilIsModuleNamespaceObjectLike
              : (B.module.utilIsModuleNamespaceObjectLike = (function () {
                  return function (v) {
                    if (!ge(v) || null !== qe(v)) return !1
                    var g = Reflect.getOwnPropertyDescriptor(
                      v,
                      Symbol.toStringTag
                    )
                    return (
                      void 0 !== g &&
                      !1 === g.configurable &&
                      !1 === g.enumerable &&
                      !1 === g.writable &&
                      'Module' === g.value
                    )
                  }
                })()),
            Us = B.inited
              ? B.module.utilIsProxyInspectable
              : (B.module.utilIsProxyInspectable = (function () {
                  return function (v) {
                    return (
                      !!z(v) &&
                      ('function' == typeof v ||
                        Array.isArray(v) ||
                        Reflect.has(v, Symbol.toStringTag) ||
                        v === ou.process.module.exports ||
                        '[object Object]' === ji(v))
                    )
                  }
                })()),
            Ws = B.inited
              ? B.module.utilIsNativeLike
              : (B.module.utilIsNativeLike = (function () {
                  var v = Function.prototype.toString,
                    g = RegExp(
                      '^' +
                        ai(v.call(v)).replace(
                          /toString|(function ).*?(?=\\\()/g,
                          '$1.*?'
                        ) +
                        '$'
                    )
                  return function (y) {
                    return (
                      'function' == typeof y &&
                      (function (y) {
                        try {
                          return g.test(v.call(y))
                        } catch (v) {}
                        return !1
                      })(y)
                    )
                  }
                })()),
            qs = B.inited
              ? B.module.utilIsProxy
              : (B.module.utilIsProxy = (function () {
                  if ('function' == typeof (Wi && Wi.isProxy)) return Wi.isProxy
                  var v,
                    g = {
                      breakLength: 1 / 0,
                      colors: !1,
                      compact: !0,
                      customInspect: !1,
                      depth: 0,
                      maxArrayLength: 0,
                      showHidden: !1,
                      showProxy: !0,
                    }
                  return function (y) {
                    return (
                      !!He.instances.has(y) ||
                      (void 0 === v &&
                        (v = 'function' == typeof We.util.getProxyDetails),
                      v
                        ? !!Ze(y)
                        : B.support.inspectProxies &&
                          z(y) &&
                          Ui(y, g).startsWith('Proxy ['))
                    )
                  }
                })()),
            $s = B.inited
              ? B.module.utilIsNative
              : (B.module.utilIsNative = (function () {
                  return function (v) {
                    if (!Ws(v)) return !1
                    var g = v.name
                    return !(
                      ('string' == typeof g && g.startsWith('bound ')) ||
                      qs(v)
                    )
                  }
                })()),
            zs = B.inited
              ? B.module.utilIsStackTraceMaskable
              : (B.module.utilIsStackTraceMaskable = (function () {
                  return function (v) {
                    if (!Ns(v)) return !1
                    var g = Reflect.getOwnPropertyDescriptor(v, 'stack')
                    return !(
                      void 0 !== g &&
                      !0 === g.configurable &&
                      !1 === g.enumerable &&
                      'function' == typeof g.get &&
                      'function' == typeof g.set &&
                      !$s(g.get) &&
                      !$s(g.set)
                    )
                  }
                })()),
            Hs = B.inited
              ? B.module.utilSetHiddenValue
              : (B.module.utilSetHiddenValue = (function () {
                  var v
                  return function (g, y, x) {
                    if (
                      (void 0 === v &&
                        (v = 'function' == typeof We.util.setHiddenValue),
                      v &&
                        typeof y === B.utilBinding.hiddenKeyType &&
                        null != y &&
                        z(g))
                    )
                      try {
                        return We.util.setHiddenValue(g, y, x)
                      } catch (v) {}
                    return !1
                  }
                })()),
            Ks = B.inited
              ? B.module.errorDecorateStackTrace
              : (B.module.errorDecorateStackTrace = (function () {
                  return function (v) {
                    return (
                      Ns(v) && Hs(v, B.utilBinding.errorDecoratedSymbol, !0), v
                    )
                  }
                })()),
            Js = B.inited
              ? B.module.utilEncodeURI
              : (B.module.utilEncodeURI = (function () {
                  var v = encodeURI
                  return function (g) {
                    return 'string' == typeof g ? v(g) : ''
                  }
                })()),
            Ys = B.inited
              ? B.module.utilGetURLFromFilePath
              : (B.module.utilGetURLFromFilePath = (function () {
                  var v = /[?#]/g,
                    g = new Map([
                      ['#', '%23'],
                      ['?', '%3F'],
                    ])
                  function r(v) {
                    return g.get(v)
                  }
                  return function (g) {
                    var y = 'string' == typeof g ? g.length : 0
                    if (0 === y) return 'file:///'
                    var x = g,
                      E = y
                    ;(g = Jn(dt(g))),
                      (g = Js(g).replace(v, r)),
                      (y = g.length),
                      47 !== g.charCodeAt(y - 1) &&
                        Xi(x.charCodeAt(E - 1)) &&
                        (g += '/')
                    for (var R = -1; ++R < y && 47 === g.charCodeAt(R); );
                    return (
                      R > 1 ? (g = '/' + g.slice(R)) : 0 === R && (g = '/' + g),
                      'file://' + g
                    )
                  }
                })()),
            Qs = B.inited
              ? B.module.utilGetModuleURL
              : (B.module.utilGetModuleURL = (function () {
                  return function (v) {
                    if ('string' == typeof v) return en(v) ? Ys(v) : v
                    if (ge(v)) {
                      var g = v.filename,
                        y = v.id
                      if ('string' == typeof g) return Ys(g)
                      if ('string' == typeof y) return y
                    }
                    return ''
                  }
                })()),
            Xs = B.inited
              ? B.module.utilIsParseError
              : (B.module.utilIsParseError = (function () {
                  return function (v) {
                    for (var g in Tr) if (v instanceof Tr[g]) return !0
                    return !1
                  }
                })()),
            Zs = B.inited
              ? B.module.utilReplaceWithout
              : (B.module.utilReplaceWithout = (function () {
                  return function (v, g, y) {
                    if ('string' != typeof v || 'string' != typeof g) return v
                    var x = y(v.replace(g, '‍WITHOUT‍'))
                    return 'string' == typeof x
                      ? x.replace('‍WITHOUT‍', function () {
                          return g
                        })
                      : v
                  }
                })()),
            ea = B.inited
              ? B.module.utilUntransformRuntime
              : (B.module.utilUntransformRuntime = (function () {
                  var v = /\w+\u200D\.a\("(.+?)",\1\)/g,
                    g = /\w+\u200D\.t\("(.+?)"\)/g,
                    y = /\(eval===(\w+\u200D)\.v\?\1\.c:\1\.k\)/g,
                    x = /\(eval===(\w+\u200D)\.v\?\1\.e:eval\)/g,
                    E = /\w+\u200D\.(\w+)(\.)?/g,
                    R = /\w+\u200D\.b\("(.+?)","(.+?)",?/g
                  function a(v, g) {
                    return g
                  }
                  function o() {
                    return ''
                  }
                  function u() {
                    return 'eval'
                  }
                  function l(v, g, y = '') {
                    return 'e' === g
                      ? 'eval' + y
                      : '_' === g || 'i' === g
                      ? 'import' + y
                      : 'r' === g
                      ? 'require' + y
                      : ''
                  }
                  function c(v, g, y) {
                    return '(' + g + y
                  }
                  return function (_) {
                    return 'string' != typeof _
                      ? ''
                      : _.replace(v, a)
                          .replace(g, a)
                          .replace(y, o)
                          .replace(x, u)
                          .replace(R, c)
                          .replace(E, l)
                  }
                })()),
            ta = B.inited
              ? B.module.errorScrubStackTrace
              : (B.module.errorScrubStackTrace = (function () {
                  var v = D.PACKAGE_FILENAMES,
                    g = /:1:\d+(?=\)?$)/gm,
                    y = /(\n +at .+)+$/
                  return function (x) {
                    if ('string' != typeof x) return ''
                    var E = y.exec(x)
                    if (null === E) return x
                    var R = E.index,
                      _ = x.slice(0, R),
                      P = x
                        .slice(R)
                        .split('\n')
                        .filter(function (g) {
                          for (
                            var y = 0, x = null == v ? 0 : v.length;
                            y < x;
                            y++
                          ) {
                            var E = v[y]
                            if (-1 !== g.indexOf(E)) return !1
                          }
                          return !0
                        })
                        .join('\n')
                        .replace(g, ':1')
                    return _ + ea(P)
                  }
                })()),
            ra = B.inited
              ? B.module.utilToExternalError
              : (B.module.utilToExternalError = (function () {
                  var v = B.external,
                    g = v.Error,
                    y = v.EvalError,
                    x = v.RangeError,
                    E = v.ReferenceError,
                    R = v.SyntaxError,
                    _ = v.TypeError,
                    P = v.URIError,
                    k = new Map([
                      ['Error', g.prototype],
                      ['EvalError', y.prototype],
                      ['RangeError', x.prototype],
                      ['ReferenceError', E.prototype],
                      ['SyntaxError', R.prototype],
                      ['TypeError', _.prototype],
                      ['URIError', P.prototype],
                    ])
                  return function (v) {
                    if (v instanceof Error) {
                      var g = qe(v),
                        y = g.name,
                        x = k.get(y)
                      void 0 !== x && Ee(v, x)
                    }
                    return v
                  }
                })()),
            ia = B.inited
              ? B.module.errorMaskStackTrace
              : (B.module.errorMaskStackTrace = (function () {
                  var v = /^(.+)\n( *\^+)\n(\n)?/m,
                    g = /^( *at (?:.+? \()?)(.+?)(?=:\d+)/gm,
                    y = /^\s*$/,
                    x = /^(.+?):(\d+)(?=\n)/
                  function n(v, g, y) {
                    return g + Qs(y)
                  }
                  function s(v, g, y) {
                    return Qs(g) + ':' + y
                  }
                  function a(v) {
                    try {
                      return di(Wn(v, 'name')) + ': ' + di(Wn(v, 'message'))
                    } catch (v) {}
                    return ''
                  }
                  return function (E, R = {}) {
                    if (!Ns(E)) return E
                    var _,
                      P,
                      k = R.content,
                      I = R.filename,
                      A = R.inModule,
                      N = Xs(E)
                    N &&
                      ((_ = E.column),
                      (P = E.line),
                      void 0 === A && (A = E.inModule),
                      Reflect.deleteProperty(E, 'column'),
                      Reflect.deleteProperty(E, 'inModule'),
                      Reflect.deleteProperty(E, 'line')),
                      ra(E)
                    var C = Wn(E, 'stack')
                    if ('string' != typeof C) return E
                    var O = a(E)
                    return (
                      Reflect.defineProperty(E, 'stack', {
                        configurable: !0,
                        get: ze(function () {
                          this.stack = ''
                          var E = di(Wn(this, 'message')),
                            R = di(Wn(this, 'name')),
                            T = a(this),
                            L = C.replace(O, function () {
                              return T
                            })
                          L = N
                            ? (function (v, g, x, E, R, _, P) {
                                var k = [0, 1]
                                if (
                                  ('string' == typeof P &&
                                    (k.push(P + ':' + E),
                                    'string' != typeof _ &&
                                      (_ = an(P, 'utf8'))),
                                  'string' == typeof _)
                                ) {
                                  var I = _.split('\n'),
                                    A = E - 1
                                  if (A < I.length) {
                                    var N = '^'
                                    x.startsWith("Export '") &&
                                      (N = N.repeat(x.indexOf("'", 8) - 8))
                                    var C = I[A]
                                    y.test(C) ||
                                      k.push(C, ' '.repeat(R) + N, '')
                                  }
                                }
                                var O = v.split('\n')
                                return (
                                  k.push(g + ': ' + x),
                                  O.splice(...k),
                                  O.join('\n')
                                )
                              })(L, R, E, P, _, k, I)
                            : (function (g, y, E) {
                                var R = x.exec(g)
                                if (null === R)
                                  return 'string' == typeof E
                                    ? E + ':1\n' + g
                                    : g
                                var _,
                                  P,
                                  k = R[0],
                                  I = R[1],
                                  A = +R[2],
                                  N = I !== E && en(I)
                                if (!N)
                                  if (
                                    ('string' != typeof y &&
                                      'string' == typeof E &&
                                      '.wasm' !== pt(E) &&
                                      (y = an(E, 'utf8')),
                                    'string' != typeof y ||
                                      y.startsWith('\0asm'))
                                  )
                                    N = !0
                                  else {
                                    var C = A - 1
                                    ;(_ = y.split('\n')),
                                      (P = C > -1 && C < _.length ? _[C] : '')
                                  }
                                var O = !1
                                if (
                                  ((g = g.replace(
                                    v,
                                    function (v, g, y, x = '') {
                                      if (
                                        ((O = !0),
                                        N && (P = g),
                                        'string' != typeof P)
                                      )
                                        return ''
                                      if (1 === A) {
                                        var E = fe(op, 'wrapper')
                                        if (Array.isArray(E)) {
                                          var R = E[0]
                                          if (
                                            'string' == typeof R &&
                                            g.startsWith(R)
                                          ) {
                                            var _ = R.length
                                            ;(g = g.slice(_)), (y = y.slice(_))
                                          }
                                        }
                                      }
                                      return g === P
                                        ? P + '\n' + y + '\n' + x
                                        : P + (P ? '\n\n' : '\n')
                                    }
                                  )),
                                  O)
                                )
                                  return g
                                if (P && 'string' == typeof P) {
                                  var T = k.length
                                  g =
                                    g.slice(0, T) + '\n' + P + '\n' + g.slice(T)
                                }
                                return g
                              })(L, k, I)
                          var M = A
                            ? function (v) {
                                return (function (v) {
                                  return v.replace(x, s).replace(g, n)
                                })(ta(v))
                              }
                            : ta
                          return (this.stack = Zs(L, T, M))
                        }),
                        set: ze(function (v) {
                          Reflect.defineProperty(this, 'stack', {
                            configurable: !0,
                            value: v,
                            writable: !0,
                          })
                        }),
                      }),
                      Ks(E),
                      E
                    )
                  }
                })()),
            ms = function (v) {
              var g = pp.state.package.default
              return (null !== g && g.options.debug) || !zs(v) || ia(v), v
            },
            na = B.inited
              ? B.module.utilIsModuleNamespaceObject
              : (B.module.utilIsModuleNamespaceObject = (function () {
                  return function (v) {
                    return ge(v) && Reflect.has(v, B.symbol.namespace) && js(v)
                  }
                })()),
            sa = B.inited
              ? B.module.utilIsUpdatableDescriptor
              : (B.module.utilIsUpdatableDescriptor = (function () {
                  return function (v) {
                    return (
                      ge(v) &&
                      (!0 === v.configurable || !0 === v.writable) &&
                      me(v, 'value')
                    )
                  }
                })()),
            aa = B.inited
              ? B.module.utilIsUpdatableGet
              : (B.module.utilIsUpdatableGet = (function () {
                  return function (v, g) {
                    var y = Reflect.getOwnPropertyDescriptor(v, g)
                    return (
                      void 0 === y ||
                      !0 === y.configurable ||
                      !0 === y.writable ||
                      'function' == typeof y.get
                    )
                  }
                })()),
            va = B.inited
              ? B.module.utilOwnPropertyNames
              : (B.module.utilOwnPropertyNames = (function () {
                  return function (v) {
                    return z(v) ? Object.getOwnPropertyNames(v) : []
                  }
                })()),
            ga = B.inited
              ? B.module.utilToRawModuleNamespaceObject
              : (B.module.utilToRawModuleNamespaceObject = (function () {
                  var v = { value: 'Module' }
                  return function (g) {
                    var y = { __proto__: null }
                    return (
                      Reflect.defineProperty(y, Symbol.toStringTag, v), os(y, g)
                    )
                  }
                })()),
            ya = {},
            xa = /\S/
          function Ss(v, g) {
            return {
              __proto__: null,
              [B.customInspectKey]: ze(function (y) {
                var x = os(is.create(), g)
                return (x.depth = y), Sa(v, x)
              }),
            }
          }
          function Rs(v, g) {
            try {
              return Reflect.get(v, g)
            } catch (v) {}
            return ya
          }
          function Ps(...v) {
            try {
              return Reflect.apply(Ui, this, v)
            } catch (v) {}
            return ''
          }
          var _s = function (...v) {
              var g = v[0],
                y = v[1],
                x = v[2]
              if (!z(g)) return Reflect.apply(Ui, this, v)
              g = ms(g)
              var E = is.create()
              'boolean' == typeof y ? (E.showHidden = !0) : os(E, y)
              var R = B.defaultInspectOptions,
                _ = me(E, 'customInspect') ? E.customInspect : R.customInspect,
                P = me(E, 'showProxy') ? E.showProxy : R.showProxy
              void 0 === x || me(E, 'depth') || (E.depth = x),
                (v[0] = g),
                (v[1] = E)
              var k = Reflect.apply(Ps, this, v)
              return !Us(g) || (-1 === k.indexOf('Proxy [') && !Gs(g))
                ? k
                : ((E.customInspect = _),
                  (E.showProxy = P),
                  (y = os(is.create(), E)),
                  (v[0] = (function e(v, g, y) {
                    if (!Us(v)) return v
                    if (void 0 === y) y = new Map()
                    else {
                      var x = y.get(v)
                      if (void 0 !== x) return x
                    }
                    var E,
                      R,
                      _ = !1,
                      P = new He(v, {
                        get(v, y, x) {
                          x === P && (x = v)
                          var k = B.customInspectKey,
                            I = Reflect.get(v, y, x),
                            A = I
                          return (
                            I !== Sa || (y !== k && 'inspect' !== y)
                              ? _ || y !== k
                                ? 'toString' === y &&
                                  'function' == typeof I &&
                                  (A = U.bind(I, v))
                                : (A = ze(function (...y) {
                                    _ = !0
                                    var x = y[0],
                                      k = y[1],
                                      A = os(is.create(), k),
                                      N = g.showProxy
                                    ;(A.customInspect = g.customInspect),
                                      (A.depth = x),
                                      (A.showProxy = N)
                                    try {
                                      return v === ya
                                        ? A.colors
                                          ? (function (v, g) {
                                              var y = Sa.styles.special
                                              if (void 0 === y)
                                                return '<uninitialized>'
                                              var x = Sa.colors[y],
                                                E = x[0],
                                                R = x[1]
                                              return (
                                                '[' +
                                                E +
                                                'm<uninitialized>[' +
                                                R +
                                                'm'
                                              )
                                            })()
                                          : '<uninitialized>'
                                        : na(v)
                                        ? (function (v, g) {
                                            for (
                                              var y = va(v),
                                                x = ga(),
                                                E = 0,
                                                R = null == y ? 0 : y.length;
                                              E < R;
                                              E++
                                            ) {
                                              var _ = y[E]
                                              x[_] = Rs(v, _)
                                            }
                                            var P = Sa(x, g),
                                              k = P.slice(0, P.search(xa)),
                                              I = P.slice(
                                                P.indexOf('{'),
                                                P.lastIndexOf('}') + 1
                                              )
                                            return k + '[Module] ' + I
                                          })(v, A)
                                        : (void 0 === R && (R = js(v)),
                                          void 0 === E && (E = qs(v)),
                                          N && E && !R
                                            ? (function (v, g) {
                                                var y = Ze(v),
                                                  x = v
                                                void 0 !== y &&
                                                  (x = new Proxy(
                                                    Ss(y[0], g),
                                                    Ss(y[1], g)
                                                  ))
                                                var E = os({}, g)
                                                return (
                                                  (E.customInspect = !0),
                                                  Ui(x, E)
                                                )
                                              })(v, A)
                                            : ('function' != typeof I &&
                                                (A.customInspect = !0),
                                              (A.showProxy = !1),
                                              Ui(P, A)))
                                    } finally {
                                      _ = !1
                                    }
                                  }))
                              : (A = Ui),
                            A !== I && aa(v, y) ? A : ms(I)
                          )
                        },
                        getOwnPropertyDescriptor(v, x) {
                          var E = Reflect.getOwnPropertyDescriptor(v, x)
                          if (sa(E)) {
                            var R = E.value
                            z(R) && (E.value = e(R, g, y))
                          }
                          return E
                        },
                      })
                    return y.set(v, P), y.set(P, P), P
                  })(g, y)),
                  (E.customInspect = !0),
                  (E.showProxy = !1),
                  Reflect.apply(Ui, this, v))
            },
            ba = B.inited
              ? B.module.utilProxyWrap
              : (B.module.utilProxyWrap = (function () {
                  return function (v, g) {
                    return new He(v, {
                      apply: (v, y, x) => Reflect.apply(g, y, [v, x]),
                      construct: (v, y, x) => Reflect.construct(g, [v, y], x),
                    })
                  }
                })()),
            wa = B.inited
              ? B.module.utilToWrapper
              : (B.module.utilToWrapper = (function () {
                  return function (v) {
                    return function (g, y) {
                      return Reflect.apply(v, this, y)
                    }
                  }
                })()),
            Ea = ba(qi.inspect, wa(_s)),
            Sa = Ea
          function Cs(v) {
            try {
              return JSON.stringify(v)
            } catch (v) {
              if (Ns(v)) {
                if (
                  'TypeError' === Wn(v, 'name') &&
                  Wn(v, 'message') === B.circularErrorMessage
                )
                  return '[Circular]'
                ra(v)
              }
              throw v
            }
          }
          var Ra,
            Ts = function (v, ...g) {
              var y = g[0],
                x = g.length,
                E = 0,
                R = '',
                _ = ''
              if ('string' == typeof y) {
                if (1 === x) return y
                for (
                  var P, k, I = y.length, A = I - 1, N = -1, C = 0;
                  ++N < A;

                )
                  if (37 === y.charCodeAt(N)) {
                    var O = y.charCodeAt(++N)
                    if (E + 1 !== x) {
                      var T = void 0
                      switch (O) {
                        case 115:
                          var L = g[++E]
                          'bigint' == typeof L
                            ? (T = L + 'n')
                            : ge(L)
                            ? (void 0 === k &&
                                (k = os({}, v, {
                                  breakLength: 120,
                                  colors: !1,
                                  compact: !0,
                                  depth: 0,
                                })),
                              (T = _s(L, k)))
                            : (T = L + '')
                          break
                        case 106:
                          T = Cs(g[++E])
                          break
                        case 100:
                          var M = g[++E],
                            D = typeof M
                          T =
                            'bigint' === D
                              ? M + 'n'
                              : 'symbol' === D
                              ? 'NaN'
                              : +M + ''
                          break
                        case 79:
                          T = _s(g[++E], v)
                          break
                        case 111:
                          void 0 === P &&
                            (P = os({}, v, {
                              depth: 4,
                              showHidden: !0,
                              showProxy: !0,
                            })),
                            (T = _s(g[++E], P))
                          break
                        case 105:
                          var F = g[++E],
                            j = typeof F
                          T =
                            'bigint' === j
                              ? F + 'n'
                              : 'symbol' === j
                              ? 'NaN'
                              : parseInt(F) + ''
                          break
                        case 102:
                          var V = g[++E]
                          T = 'symbol' == typeof V ? 'NaN' : parseFloat(V) + ''
                          break
                        case 37:
                          ;(_ += y.slice(C, N)), (C = N + 1)
                      }
                      C !== N - 1 && (_ += y.slice(C, N - 1)),
                        (_ += T),
                        (C = N + 1)
                    } else 37 === O && ((_ += y.slice(C, N)), (C = N + 1))
                  }
                0 !== C && (++E, (R = ' '), C < I && (_ += y.slice(C)))
              }
              for (; E < x; ) {
                var B = g[E]
                ;(_ += R + ('string' == typeof B ? B : _s(B, v))),
                  (R = ' '),
                  ++E
              }
              return _
            },
            Ms = function (...v) {
              return Ts(Fs, ...v)
            },
            _a = qi.formatWithOptions,
            Pa = qi.types
          if (z(Pa)) {
            Ra = is.create()
            for (
              var ka = ba(Pa.isModuleNamespaceObject, wa(na)),
                Ia = ba(Pa.isProxy, function (v, [g]) {
                  return v(g) && !js(g)
                }),
                Aa = ye(Pa),
                Na = 0,
                Ca = null == Aa ? 0 : Aa.length;
              Na < Ca;
              Na++
            ) {
              var Oa = Aa[Na]
              'isModuleNamespaceObject' === Oa
                ? (Ra.isModuleNamespaceObject = ka)
                : 'isProxy' === Oa
                ? (Ra.isProxy = Ia)
                : As(Ra, Pa, Oa)
            }
          }
          for (
            var Ta = is.create(),
              La = ye(qi),
              Ma = 0,
              Da = null == La ? 0 : La.length;
            Ma < Da;
            Ma++
          ) {
            var Fa = La[Ma]
            'format' === Fa
              ? (Ta.format = ba(qi.format, wa(Ms)))
              : 'formatWithOptions' === Fa
              ? 'function' == typeof _a &&
                (Ta.formatWithOptions = ba(_a, wa(Ts)))
              : 'inspect' === Fa
              ? (Ta.inspect = Sa)
              : 'types' === Fa
              ? void 0 !== Ra && (Ta.types = Ra)
              : As(Ta, qi, Fa)
          }
          var ja = Ta,
            Va = B.inited
              ? B.module.realConsole
              : (B.module.realConsole = et(W('console'))),
            Ba = B.inited
              ? B.module.safeConsole
              : (B.module.safeConsole = (function () {
                  var v = Se(Va),
                    g = v.Console
                  return K(v, 'Console', Xn(Se(g), g)), v
                })()),
            Ua = B.inited
              ? B.module.safeGlobalConsole
              : (B.module.safeGlobalConsole = Se(_)),
            Wa = Dn.ELECTRON_RENDERER,
            qa = Dn.FLAGS,
            $a = Dn.HAS_INSPECTOR,
            za = Ba.Console,
            Ha = za.prototype,
            Ka = ye(Ha),
            Ja = { customInspect: !0 },
            Ya = (function (v) {
              for (
                var g = ma(v.log, ha),
                  y = new Map([
                    ['assert', ma(v.assert, oa)],
                    ['debug', g],
                    ['dir', ma(v.dir, ca)],
                    ['dirxml', g],
                    ['info', g],
                    ['log', g],
                    ['trace', ma(v.trace)],
                    ['warn', ma(v.warn)],
                  ]),
                  x = de(v),
                  E = 0,
                  R = null == x ? 0 : x.length;
                E < R;
                E++
              ) {
                var _ = x[E]
                if (pa(_) && !y.has(_)) {
                  var P = v[_]
                  'function' == typeof P && y.set(_, ma(P))
                }
              }
              return y
            })(Ha),
            Qa = (function (v, g) {
              for (var y = 0, x = null == v ? 0 : v.length; y < x; y++) {
                var E = v[y]
                if (g.test(di(E))) return E
              }
            })(Object.getOwnPropertySymbols(Ba), /IsConsole/i)
          function oa(v, [g, ...y]) {
            return Reflect.apply(v, this, [g, ...da(y, fa)])
          }
          function ua() {
            var v = (function (v) {
              try {
                return (function ({ stderr: v, stdout: g }) {
                  var y = eo.prototype,
                    x = Reflect.construct(
                      eo,
                      B.support.consoleOptions
                        ? [{ stderr: v, stdout: g }]
                        : [g, v]
                    )
                  Ee(x, is.create())
                  for (var E = 0, R = null == Ka ? 0 : Ka.length; E < R; E++) {
                    var _ = Ka[E]
                    pa(_) && !me(x, _) && As(x, y, _)
                  }
                  return x
                })(v)
              } catch (v) {}
              return null
            })(Ue)
            if (null === v) return Va
            if ($a && qa.inspect)
              for (
                var g = We.inspector.consoleCall,
                  y = B.originalConsole,
                  x = 'function' == typeof g,
                  E = x ? {} : null,
                  R = de(y),
                  _ = 0,
                  P = null == R ? 0 : R.length;
                _ < P;
                _++
              ) {
                var k = R[_]
                if (pa(k)) {
                  var I = y[k]
                  if ('function' == typeof I) {
                    var A = v[k]
                    x && 'function' == typeof A && me(v, k)
                      ? K(v, k, U.bind(g, void 0, I, A, E))
                      : K(v, k, I)
                  }
                }
              }
            else if (Wa)
              for (
                var N = de(Ua), C = 0, O = null == N ? 0 : N.length;
                C < O;
                C++
              ) {
                var T = N[C]
                if (pa(T)) {
                  var L = Ua[T]
                  'function' == typeof L && K(v, T, L)
                }
              }
            for (
              var M = ye(Ba), D = 0, F = null == M ? 0 : M.length;
              D < F;
              D++
            ) {
              var j = M[D]
              pa(j) && !me(v, j) && As(v, Ba, j)
            }
            return (v.Console = eo), v
          }
          function la(v) {
            for (
              var g = de(v), y = new Map(), x = 0, E = null == g ? 0 : g.length;
              x < E;
              x++
            ) {
              var R = g[x],
                _ = v[R],
                P = Ua[R]
              'function' != typeof _ ||
                'function' != typeof P ||
                (pa(R) && !Ws(P)) ||
                y.set(P, _)
            }
            return y
          }
          function ca(v, [g, y]) {
            return Reflect.apply(v, this, [
              {
                [B.customInspectKey](v, x) {
                  var E = os({}, x, y)
                  return (
                    (E.customInspect =
                      !!me(y, 'customInspect') && y.customInspect),
                    (E.depth = v),
                    ja.inspect(g, E)
                  )
                },
              },
              Ja,
            ])
          }
          function pa(v) {
            return 'Console' !== v && 'constructor' !== v
          }
          function ha(v, g) {
            return Reflect.apply(v, this, da(g, fa))
          }
          function fa(v) {
            return ge(v)
              ? {
                  [B.customInspectKey](g, y) {
                    var x = os({}, y)
                    return (x.depth = g), ja.inspect(v, x)
                  },
                }
              : v
          }
          function da(v, g) {
            for (var y = v.length, x = -1; ++x < y; ) v[x] = g(v[x])
            return v
          }
          function ma(
            v,
            g = function (v, g) {
              return Reflect.apply(v, this, g)
            }
          ) {
            var y = {
              method(...y) {
                var x = B.defaultInspectOptions,
                  E = x.customInspect
                K(x, 'customInspect', !0)
                try {
                  return Reflect.apply(g, this, [v, y])
                } finally {
                  K(x, 'customInspect', E)
                }
              },
            }
            return Xn(y.method, v)
          }
          'symbol' != typeof Qa && (Qa = Symbol('kIsConsole'))
          for (
            var Xa,
              Za,
              eo = Xn(function (...v) {
                var g = new.target
                if (void 0 === g) return Reflect.construct(eo, v)
                this[Qa] = !0
                for (
                  var y = eo.prototype,
                    x = de(y),
                    E = 0,
                    R = null == x ? 0 : x.length;
                  E < R;
                  E++
                ) {
                  var _ = x[E]
                  if (pa(_)) {
                    var P = this[_]
                    'function' == typeof P && (this[_] = U.bind(P, this))
                  }
                }
                for (
                  var k = Reflect.construct(za, v, g),
                    I = ye(k),
                    A = 0,
                    N = null == I ? 0 : I.length;
                  A < N;
                  A++
                ) {
                  var C = I[A]
                  pa(C) && !me(this, C) && As(this, k, C)
                }
              }, za),
              to = eo.prototype,
              ro = 0,
              io = null == Ka ? 0 : Ka.length;
            ro < io;
            ro++
          ) {
            var no = Ka[ro]
            if (pa(no)) {
              var so = Ya.get(no)
              if (void 0 === so) As(to, Ha, no)
              else {
                var ao = Reflect.getOwnPropertyDescriptor(Ha, no)
                Reflect.defineProperty(to, no, {
                  configurable: ao.configurable,
                  enumerable: ao.enumerable,
                  value: so,
                  writable: !0 === ao.writable || 'function' == typeof ao.set,
                })
              }
            }
          }
          Reflect.defineProperty(eo, Symbol.hasInstance, {
            value: ze(function (v) {
              return v[Qa]
            }),
          })
          for (
            var oo = new He(_, {
                get(v, g, y) {
                  y === oo && (y = v)
                  var x = Reflect.get(v, g, y)
                  if (aa(v, g)) {
                    void 0 === Xa && ((Xa = ua()), (Za = la(Xa)))
                    var E = Za.get(x)
                    if (void 0 !== E) return E
                  }
                  return x
                },
                getOwnPropertyDescriptor(v, g) {
                  var y = Reflect.getOwnPropertyDescriptor(v, g)
                  if (sa(y)) {
                    void 0 === Xa && ((Xa = ua()), (Za = la(Xa)))
                    var x = Za.get(y.value)
                    void 0 !== x && (y.value = x)
                  }
                  return y
                },
              }),
              uo = oo,
              lo = B.inited
                ? B.module.utilAssignProperties
                : (B.module.utilAssignProperties = (function () {
                    return function (v) {
                      for (var g = arguments.length, y = 0; ++y < g; )
                        for (
                          var x = arguments[y],
                            E = ye(x),
                            R = 0,
                            _ = null == E ? 0 : E.length;
                          R < _;
                          R++
                        ) {
                          var P = E[R]
                          As(v, x, P)
                        }
                      return v
                    }
                  })()),
              co = B.inited
                ? B.module.realTimers
                : (B.module.realTimers = et(W('timers'))),
              po = B.inited
                ? B.module.safeTimers
                : (B.module.safeTimers = (function () {
                    var v = Dn.ELECTRON,
                      g = Se(co)
                    if (v) {
                      var y = B.unsafeGlobal
                      K(g, 'setImmediate', y.setImmediate),
                        K(g, 'setInterval', y.setInterval),
                        K(g, 'setTimeout', y.setTimeout)
                    }
                    return g
                  })()),
              ho = po.setImmediate,
              mo = po,
              vo = B.inited
                ? B.module.builtinTimers
                : (B.module.builtinTimers = lo(is.create(), mo)),
              go = B.inited ? B.module.realVM : (B.module.realVM = et(W('vm'))),
              yo = B.inited
                ? B.module.safeVM
                : (B.module.safeVM = (function () {
                    for (
                      var v = Se(go),
                        g = v.Script,
                        y = Se(g),
                        x = y.prototype,
                        E = qe(g.prototype),
                        R = ye(E),
                        _ = 0,
                        P = null == R ? 0 : R.length;
                      _ < P;
                      _++
                    ) {
                      var k = R[_]
                      me(x, k) || As(x, E, k)
                    }
                    return Ee(x, E), K(v, 'Script', y), v
                  })()),
              xo = yo.Script,
              bo = yo,
              wo = B.inited
                ? B.module.builtinVM
                : (B.module.builtinVM = (function () {
                    for (
                      var v = is.create(),
                        g = ye(bo),
                        y = 0,
                        x = null == g ? 0 : g.length;
                      y < x;
                      y++
                    ) {
                      var E = g[y]
                      'Module' !== E && 'SourceTextModule' !== E && As(v, bo, E)
                    }
                    return v
                  })()),
              Eo = { __proto__: null },
              So = B.memoize.builtinModules,
              Ga = function (v) {
                f(Eo, v, function () {
                  var g = So.get(v)
                  if (void 0 !== g) return g
                  var y = new op(v)
                  return (
                    (y.exports = (function (v) {
                      switch (v) {
                        case 'console':
                          return uo
                        case 'module':
                          return op
                        case 'timers':
                          return vo
                        case 'util':
                          return ja
                        case 'vm':
                          return wo
                      }
                      return et(W(v))
                    })(v)),
                    (y.loaded = !0),
                    'console' !== v &&
                      'module' !== v &&
                      'util' !== v &&
                      So.set(v, y),
                    y
                  )
                })
              },
              Ro = 0,
              Po = null == un ? 0 : un.length;
            Ro < Po;
            Ro++
          ) {
            var ko = un[Ro]
            Ga(ko)
          }
          for (
            var Io = Eo,
              Ao = B.inited
                ? B.module.utilInstanceOf
                : (B.module.utilInstanceOf = (function () {
                    return function (v, g) {
                      var y = g.prototype
                      if (z(v))
                        for (var x = v; null !== (x = qe(x)); )
                          if (x === y) return !0
                      return !1
                    }
                  })()),
              No = B.inited
                ? B.module.utilGetGetter
                : (B.module.utilGetGetter = (function () {
                    var v = Object.prototype.__lookupGetter__
                    return function (g, y) {
                      var x = void 0 === y
                      if (x || !B.support.lookupShadowed) {
                        var E = x ? g : Reflect.getOwnPropertyDescriptor(g, y)
                        if (void 0 !== E) return E.get
                        if (x) return
                      }
                      return v.call(g, y)
                    }
                  })()),
              Co = B.inited
                ? B.module.utilGetSetter
                : (B.module.utilGetSetter = (function () {
                    var v = Object.prototype.__lookupSetter__
                    return function (g, y) {
                      var x = void 0 === y
                      if (x || !B.support.lookupShadowed) {
                        var E = x ? g : Reflect.getOwnPropertyDescriptor(g, y)
                        if (void 0 !== E) return E.set
                        if (x) return
                      }
                      return v.call(g, y)
                    }
                  })()),
              Oo = B.inited
                ? B.module.utilIsAnyArrayBuffer
                : (B.module.utilIsAnyArrayBuffer = (function () {
                    return 'function' == typeof (Wi && Wi.isAnyArrayBuffer)
                      ? Wi.isAnyArrayBuffer
                      : function (v) {
                          if (!ge(v)) return !1
                          var g = ji(v)
                          return (
                            '[object ArrayBuffer]' === g ||
                            '[object SharedArrayBuffer]' === g
                          )
                        }
                  })()),
              To = B.inited
                ? B.module.utilIsDate
                : (B.module.utilIsDate = (function () {
                    return 'function' == typeof (Wi && Wi.isDate)
                      ? Wi.isDate
                      : function (v) {
                          return ge(v) && '[object Date]' === ji(v)
                        }
                  })()),
              Lo = B.inited
                ? B.module.utilIsExternal
                : (B.module.utilIsExternal = (function () {
                    return 'function' == typeof (Wi && Wi.isExternal)
                      ? Wi.isExternal
                      : Wr
                  })()),
              Mo = B.inited
                ? B.module.utilIsMap
                : (B.module.utilIsMap = (function () {
                    return 'function' == typeof (Wi && Wi.isMap)
                      ? Wi.isMap
                      : function (v) {
                          return ge(v) && '[object Map]' === ji(v)
                        }
                  })()),
              Do = B.inited
                ? B.module.utilIsMapIterator
                : (B.module.utilIsMapIterator = (function () {
                    return 'function' == typeof (Wi && Wi.isMapIterator)
                      ? Wi.isMapIterator
                      : function (v) {
                          return ge(v) && '[object Map Iterator]' === ji(v)
                        }
                  })()),
              Fo = B.inited
                ? B.module.utilIsNumberObject
                : (B.module.utilIsNumberObject = (function () {
                    return 'function' == typeof (Wi && Wi.isNumberObject)
                      ? Wi.isNumberObject
                      : function (v) {
                          return ge(v) && '[object Number]' === ji(v)
                        }
                  })()),
              jo = B.inited
                ? B.module.utilIsPlainObject
                : (B.module.utilIsPlainObject = (function () {
                    return function (v) {
                      if (!ge(v)) return !1
                      for (var g = qe(v), y = g, x = null; y; )
                        (x = y), (y = qe(x))
                      return g === x
                    }
                  })()),
              Vo = B.inited
                ? B.module.utilIsPromise
                : (B.module.utilIsPromise = (function () {
                    return 'function' == typeof (Wi && Wi.isPromise)
                      ? Wi.isPromise
                      : function (v) {
                          return ge(v) && '[object Promise]' === ji(v)
                        }
                  })()),
              Bo = B.inited
                ? B.module.utilIsSet
                : (B.module.utilIsSet = (function () {
                    return 'function' == typeof (Wi && Wi.isSet)
                      ? Wi.isSet
                      : function (v) {
                          return ge(v) && '[object Set]' === ji(v)
                        }
                  })()),
              Go = B.inited
                ? B.module.utilIsSetIterator
                : (B.module.utilIsSetIterator = (function () {
                    return 'function' == typeof (Wi && Wi.isSetIterator)
                      ? Wi.isSetIterator
                      : function (v) {
                          return ge(v) && '[object Set Iterator]' === ji(v)
                        }
                  })()),
              Ho = B.inited
                ? B.module.utilIsStringObject
                : (B.module.utilIsStringObject = (function () {
                    return 'function' == typeof (Wi && Wi.isStringObject)
                      ? Wi.isStringObject
                      : function (v) {
                          return ge(v) && '[object String]' === ji(v)
                        }
                  })()),
              Ko = B.inited
                ? B.module.utilIsWeakMap
                : (B.module.utilIsWeakMap = (function () {
                    return 'function' == typeof (Wi && Wi.isWeakMap)
                      ? Wi.isWeakMap
                      : function (v) {
                          return '[object WeakMap]' === ji(v)
                        }
                  })()),
              Jo = B.inited
                ? B.module.utilIsWeakSet
                : (B.module.utilIsWeakSet = (function () {
                    return 'function' == typeof (Wi && Wi.isWeakSet)
                      ? Wi.isWeakSet
                      : function (v) {
                          return '[object WeakSet]' === ji(v)
                        }
                  })()),
              Yo = B.inited
                ? B.module.utilIsWebAssemblyCompiledModule
                : (B.module.utilIsWebAssemblyCompiledModule = (function () {
                    return 'function' ==
                      typeof (Wi && Wi.isWebAssemblyCompiledModule)
                      ? Wi.isWebAssemblyCompiledModule
                      : function (v) {
                          return (
                            ge(v) && '[object WebAssembly.Module]' === ji(v)
                          )
                        }
                  })()),
              Qo = B.inited
                ? B.module.utilIsUpdatableSet
                : (B.module.utilIsUpdatableSet = (function () {
                    return function (v, g) {
                      var y = Reflect.getOwnPropertyDescriptor(v, g)
                      return (
                        void 0 === y ||
                        !0 === y.configurable ||
                        !0 === y.writable ||
                        'function' == typeof y.set
                      )
                    }
                  })()),
              Xo = B.inited
                ? B.module.utilProxyExports
                : (B.module.utilProxyExports = (function () {
                    function e(v, g) {
                      if ('function' != typeof v && 'string' != typeof g) {
                        var y = ji(v).slice(8, -1)
                        return 'Object' === y ? g : y
                      }
                      return g
                    }
                    return function (v) {
                      var g = v.module.exports
                      if (!z(g)) return g
                      var y = B.memoize.utilProxyExports,
                        x = y.get(g)
                      if (void 0 !== x) return x.proxy
                      for (
                        var E = ze(function (v, g, y) {
                            y === C && (y = v)
                            var x = void 0 !== No(v, g),
                              E = Reflect.get(v, g, y)
                            return x && o(g, E), E
                          }),
                          a = function (g, y) {
                            if (!$s(y)) return y
                            var E = x.wrap.get(y)
                            return void 0 !== E
                              ? E
                              : ((E = new He(y, {
                                  apply: Ls(function (y, x, E) {
                                    return (
                                      (x !== C &&
                                        x !== v.completeMutableNamespace &&
                                        x !== v.completeNamespace) ||
                                        (x = g),
                                      Reflect.apply(y, x, E)
                                    )
                                  }),
                                })),
                                x.wrap.set(y, E),
                                x.unwrap.set(E, y),
                                E)
                          },
                          o = function (g, y) {
                            var x = v.getters,
                              E = x[g]
                            if (void 0 !== E) {
                              v.addGetter(g, function () {
                                return y
                              })
                              try {
                                v.updateBindings(g)
                              } finally {
                                x[g] = E
                              }
                            } else v.updateBindings()
                          },
                          R = {
                            defineProperty(g, y, _) {
                              var P = _.value
                              if ('function' == typeof P) {
                                var k = x.unwrap.get(P)
                                _.value = void 0 === k ? P : k
                              }
                              return (
                                as.defineProperty(g, y, _),
                                'function' == typeof _.get &&
                                  'function' != typeof R.get &&
                                  (R.get = E),
                                me(v.getters, y) &&
                                  (v.addGetter(y, function () {
                                    return v.exports[y]
                                  }),
                                  v.updateBindings(y)),
                                !0
                              )
                            },
                            deleteProperty: (g, y) =>
                              !!Reflect.deleteProperty(g, y) &&
                              (me(v.getters, y) &&
                                (v.addGetter(y, function () {
                                  return v.exports[y]
                                }),
                                v.updateBindings(y)),
                              !0),
                            set(g, y, E, R) {
                              if (!Qo(g, y)) return !1
                              var _ =
                                'function' == typeof E
                                  ? x.unwrap.get(E)
                                  : void 0
                              void 0 !== _ && (E = _), R === C && (R = g)
                              var P = void 0 !== Co(g, y)
                              return (
                                !!Reflect.set(g, y, E, R) &&
                                (me(v.getters, y)
                                  ? (v.addGetter(y, function () {
                                      return v.exports[y]
                                    }),
                                    v.updateBindings(P ? void 0 : y))
                                  : P && v.updateBindings(),
                                !0)
                              )
                            },
                          },
                          _ = v.builtin,
                          P = _ ? null : de(g),
                          k = 0,
                          I = null == P ? 0 : P.length;
                        k < I;
                        k++
                      ) {
                        var A = P[k]
                        if (
                          'function' ==
                          typeof Reflect.getOwnPropertyDescriptor(g, A).get
                        ) {
                          R.get = E
                          break
                        }
                      }
                      var N = !B.support.nativeProxyReceiver
                      _ ||
                        N ||
                        ('function' == typeof g
                          ? (N = $s(g))
                          : jo(g) ||
                            (N =
                              Vo(g) ||
                              Mo(g) ||
                              Bo(g) ||
                              Ko(g) ||
                              Jo(g) ||
                              To(g) ||
                              $i(g) ||
                              ArrayBuffer.isView(g) ||
                              Oo(g) ||
                              Fo(g) ||
                              Ho(g) ||
                              Do(g) ||
                              Go(g) ||
                              Yo(g) ||
                              Lo(g))),
                        N
                          ? ((R.get = function (v, g, y) {
                              y === C && (y = v)
                              var x = E(v, g, y),
                                R = x
                              return (
                                g === Symbol.toStringTag && (R = e(v, x)),
                                (R = a(v, R)),
                                R !== x && aa(v, g) ? R : x
                              )
                            }),
                            (R.getOwnPropertyDescriptor = function (v, g) {
                              var y = Reflect.getOwnPropertyDescriptor(v, g)
                              if (sa(y)) {
                                var x = y.value
                                'function' == typeof x && (y.value = a(v, x))
                              }
                              return y
                            }))
                          : _ &&
                            ge(g) &&
                            !Reflect.has(g, Symbol.toStringTag) &&
                            '[object Object]' !== ji(g) &&
                            (R.get = function (v, g, y) {
                              y === C && (y = v)
                              var x = Reflect.get(v, g, y)
                              if (g === Symbol.toStringTag) {
                                var E = e(v, x)
                                if (E !== x && aa(v, g)) return E
                              }
                              return x
                            })
                      var C = new He(g, R)
                      return (
                        (x = {
                          proxy: C,
                          unwrap: new WeakMap(),
                          wrap: new WeakMap(),
                        }),
                        y.set(g, x),
                        y.set(C, x),
                        C
                      )
                    }
                  })()),
              Zo = Function.prototype[Symbol.hasInstance],
              eu = { __proto__: null },
              tu = B.memoize.builtinEntries,
              fo = function (v) {
                f(eu, v, function () {
                  var g = tu.get(v)
                  if (void 0 !== g) return g
                  var y = (function (v) {
                    var g = Io[v],
                      y = g.exports,
                      x = y,
                      E = 'function' == typeof x
                    if (E && 'assert' !== v) {
                      var R = x,
                        _ = R.prototype,
                        P = Xn(function (v) {
                          return this === y
                            ? v instanceof R || Ao(v, y)
                            : Ao(v, this)
                        }, Zo),
                        k = new He(R, {
                          get(v, g, x) {
                            ;(x !== y && x !== k) || (x = v)
                            var E = Reflect.get(v, g, x),
                              R = E
                            return (
                              g === Symbol.hasInstance
                                ? (R = P)
                                : E === v
                                ? (R = y)
                                : E === _ && (R = I),
                              R !== E && aa(v, g) ? R : E
                            )
                          },
                          getOwnPropertyDescriptor(v, g) {
                            var y = Reflect.getOwnPropertyDescriptor(v, g)
                            return (
                              void 0 !== y &&
                                y.value === _ &&
                                sa(y) &&
                                (y.value = I),
                              y
                            )
                          },
                        }),
                        I = new He(_, {
                          get(v, g, x) {
                            x === I && (x = v)
                            var E = Reflect.get(v, g, x)
                            return E === R && aa(v, g) ? y : E
                          },
                          getOwnPropertyDescriptor(v, g) {
                            var x = Reflect.getOwnPropertyDescriptor(v, g)
                            return (
                              void 0 !== x &&
                                x.value === R &&
                                sa(x) &&
                                (x.value = y),
                              x
                            )
                          },
                        })
                      g.exports = k
                    }
                    var A = Bh.get(g)
                    return (
                      (A.builtin = !0),
                      (y = Xo(A)),
                      (g.exports = y),
                      (A.exports = y),
                      E && 'module' === v && (x.prototype.constructor = y),
                      A.loaded(),
                      A
                    )
                  })(v)
                  return (
                    'console' !== v &&
                      'module' !== v &&
                      'util' !== v &&
                      tu.set(v, y),
                    y
                  )
                })
              },
              ru = 0,
              iu = null == un ? 0 : un.length;
            ru < iu;
            ru++
          ) {
            var su = un[ru]
            fo(su)
          }
          var au,
            ou = eu,
            uu = B.inited
              ? B.module.builtinReflect
              : (B.module.builtinReflect = (function () {
                  var v = B.external.Reflect,
                    g = v.defineProperty,
                    y = v.deleteProperty,
                    x = v.set
                  function n(v) {
                    return Xn(function (...g) {
                      var y = g[0]
                      try {
                        return Reflect.apply(v, this, g)
                      } catch (v) {
                        if (na(y)) return !1
                        throw v
                      }
                    }, v)
                  }
                  var E = is.create()
                  return (
                    lo(E, v),
                    'function' == typeof g && (E.defineProperty = n(g)),
                    'function' == typeof y && (E.deleteProperty = n(y)),
                    'function' == typeof x && (E.set = n(x)),
                    E
                  )
                })()),
            lu = B.inited
              ? B.module.builtinGlobal
              : (B.module.builtinGlobal = (function () {
                  var v = {
                      Reflect: uu,
                      get console() {
                        return ou.console.module.exports
                      },
                    },
                    g = new Map([
                      ['Reflect', B.external.Reflect],
                      ['console', _],
                    ]),
                    y = new He(B.unsafeGlobal, {
                      get(x, E, R) {
                        R === y && (R = x)
                        var _ = Reflect.get(x, E, R)
                        if (g.has(E)) {
                          var P = v[E]
                          if (P !== _ && _ === g.get(E) && aa(x, E)) return P
                        }
                        return _
                      },
                      getOwnPropertyDescriptor(y, x) {
                        var E = Reflect.getOwnPropertyDescriptor(y, x)
                        return (
                          g.has(x) &&
                            void 0 !== E &&
                            E.value === g.get(x) &&
                            sa(E) &&
                            (E.value = v[x]),
                          E
                        )
                      },
                    })
                  return y
                })()),
            cu = B.inited
              ? B.module.errorGetBuiltinErrorConstructor
              : (B.module.errorGetBuiltinErrorConstructor = (function () {
                  var v = B.external.Error
                  return function (g) {
                    if (g instanceof Error || g === Error.prototype)
                      return Error
                    if (g instanceof v || g === v.prototype) return v
                    for (var y = g; null !== (y = qe(y)); ) {
                      var x = y.constructor
                      if ('function' == typeof x && 'Error' === x.name && $s(x))
                        return x
                    }
                    return v
                  }
                })()),
            pu = B.inited
              ? B.module.errorConstructError
              : (B.module.errorConstructError =
                  ((au = D.STACK_TRACE_LIMIT),
                  function (v, g, y = au) {
                    var x = cu(v.prototype),
                      E = Reflect.getOwnPropertyDescriptor(
                        x,
                        'stackTraceLimit'
                      ),
                      R = void 0 === E ? void 0 : E.value,
                      _ =
                        0 === y ||
                        'number' != typeof R ||
                        Number.isNaN(R) ||
                        R < y
                    _ && K(x, 'stackTraceLimit', y)
                    var P = Reflect.construct(v, g)
                    return (
                      _ &&
                        (void 0 === E
                          ? Reflect.deleteProperty(x, 'stackTraceLimit')
                          : Reflect.defineProperty(x, 'stackTraceLimit', E)),
                      P
                    )
                  })),
            hu = B.inited
              ? B.module.errorGetLocationFromStackTrace
              : (B.module.errorGetLocationFromStackTrace = (function () {
                  var v = /^(.+?):(\d+)(?=\n)/,
                    g = /^ *at (?:.+? \()?(.+?):(\d+)(?:\:(\d+))?/gm
                  function r(v) {
                    return en(v) && !hn(v)
                  }
                  return function (y) {
                    if (!Ns(y)) return null
                    var x = Wn(y, 'stack')
                    if ('string' != typeof x) return null
                    var E = di(Wn(y, 'message'))
                    x = x.replace(E, '')
                    var R = v.exec(x)
                    if (null !== R) {
                      var _ = R,
                        P = _[1],
                        k = _[2]
                      if (r(P)) return { column: 0, filename: P, line: k }
                    }
                    for (g.lastIndex = 0; null !== (R = g.exec(x)); ) {
                      var I = R,
                        A = I[1],
                        N = I[2],
                        C = I[3]
                      if (r(A)) return { column: C, filename: A, line: N }
                    }
                    return null
                  }
                })()),
            fu = B.inited
              ? B.module.utilGetModuleName
              : (B.module.utilGetModuleName = (function () {
                  return function (v) {
                    if (ge(v)) {
                      var g = v.filename,
                        y = v.id
                      if ('string' == typeof y)
                        return '.' === y && 'string' == typeof g ? g : y
                      if ('string' == typeof g) return g
                    }
                    return ''
                  }
                })()),
            _o = function (v, g = 128) {
              var y = _s(v)
              return y.length > g ? y.slice(0, g) + '...' : y
            },
            du = B.inited
              ? B.module.errors
              : (B.module.errors = (function () {
                  var v = 39,
                    g = D.PACKAGE_VERSION,
                    y = B.external,
                    x = y.Error,
                    E = y.ReferenceError,
                    R = y.SyntaxError,
                    _ = y.TypeError,
                    P = new Map(),
                    k = {
                      MAIN_NOT_FOUND: function (g, y) {
                        var E = new x(
                          'Cannot find module ' +
                            gi(g, v) +
                            '. Please verify that the package.json has a valid "main" entry'
                        )
                        return (
                          (E.code = 'MODULE_NOT_FOUND'),
                          (E.path = y),
                          (E.requestPath = g),
                          E
                        )
                      },
                      MODULE_NOT_FOUND: function (g, y) {
                        var E = (function (v) {
                            for (
                              var g = [], y = new Set();
                              null != v && !y.has(v);

                            )
                              y.add(v), g.push(fu(v)), (v = v.parent)
                            return g
                          })(y),
                          R = 'Cannot find module ' + gi(g, v)
                        0 !== E.length &&
                          (R += '\nRequire stack:\n- ' + E.join('\n- '))
                        var _ = new x(R)
                        return (
                          (_.code = 'MODULE_NOT_FOUND'), (_.requireStack = E), _
                        )
                      },
                    }
                  function l(v, g, y) {
                    ;(k[v] = (function (v, g) {
                      return function (...y) {
                        var x,
                          E = y.length,
                          R = 0 === E ? null : y[E - 1],
                          _ = 'function' == typeof R ? y.pop() : null,
                          k = P.get(g),
                          I = k(...y)
                        null === _
                          ? (x = pu(v, [I]))
                          : ((x = pu(v, [I], 0)), Os(x, _))
                        var A = hu(x)
                        if (null !== A) {
                          var N = Wn(x, 'stack')
                          'string' == typeof N &&
                            Reflect.defineProperty(x, 'stack', {
                              configurable: !0,
                              value: A.filename + ':' + A.line + '\n' + N,
                              writable: !0,
                            })
                        }
                        return x
                      }
                    })(y, v)),
                      P.set(v, g)
                  }
                  function c(v, g, y) {
                    ;(k[v] = (function (v, g) {
                      return class extends v {
                        constructor(...v) {
                          var y = P.get(g)
                          super(y(...v))
                          var x = di(Wn(this, 'name'))
                          Reflect.defineProperty(this, 'name', {
                            configurable: !0,
                            value: x + ' [' + g + ']',
                            writable: !0,
                          }),
                            Wn(this, 'stack'),
                            Reflect.deleteProperty(this, 'name')
                        }
                        get code() {
                          return g
                        }
                        set code(v) {
                          K(this, 'code', v)
                        }
                      }
                    })(y, v)),
                      P.set(v, g)
                  }
                  function p(g) {
                    return 'symbol' == typeof g ? di(g) : gi(g, v)
                  }
                  return (
                    l(
                      'ERR_CONST_ASSIGNMENT',
                      function () {
                        return 'Assignment to constant variable.'
                      },
                      _
                    ),
                    l(
                      'ERR_EXPORT_CYCLE',
                      function (v, g) {
                        return (
                          "Detected cycle while resolving name '" +
                          g +
                          "' in '" +
                          Qs(v) +
                          "'"
                        )
                      },
                      R
                    ),
                    l(
                      'ERR_EXPORT_MISSING',
                      function (v, g) {
                        return (
                          "The requested module '" +
                          Qs(v) +
                          "' does not provide an export named '" +
                          g +
                          "'"
                        )
                      },
                      R
                    ),
                    l(
                      'ERR_EXPORT_STAR_CONFLICT',
                      function (v, g) {
                        return (
                          "The requested module '" +
                          Qs(v) +
                          "' contains conflicting star exports for name '" +
                          g +
                          "'"
                        )
                      },
                      R
                    ),
                    l(
                      'ERR_INVALID_ESM_FILE_EXTENSION',
                      function (v) {
                        return 'Cannot load module from .mjs: ' + Qs(v)
                      },
                      x
                    ),
                    l(
                      'ERR_INVALID_ESM_OPTION',
                      function (y, x, E) {
                        return (
                          'The esm@' +
                          g +
                          ' option ' +
                          (E ? di(y) : gi(y, v)) +
                          ' is invalid. Received ' +
                          _o(x)
                        )
                      },
                      x
                    ),
                    l(
                      'ERR_NS_ASSIGNMENT',
                      function (v, g) {
                        return (
                          'Cannot assign to read only module namespace property ' +
                          p(g) +
                          ' of ' +
                          Qs(v)
                        )
                      },
                      _
                    ),
                    l(
                      'ERR_NS_DEFINITION',
                      function (v, g) {
                        return (
                          'Cannot define module namespace property ' +
                          p(g) +
                          ' of ' +
                          Qs(v)
                        )
                      },
                      _
                    ),
                    l(
                      'ERR_NS_DELETION',
                      function (v, g) {
                        return (
                          'Cannot delete module namespace property ' +
                          p(g) +
                          ' of ' +
                          Qs(v)
                        )
                      },
                      _
                    ),
                    l(
                      'ERR_NS_EXTENSION',
                      function (v, g) {
                        return (
                          'Cannot add module namespace property ' +
                          p(g) +
                          ' to ' +
                          Qs(v)
                        )
                      },
                      _
                    ),
                    l(
                      'ERR_NS_REDEFINITION',
                      function (v, g) {
                        return (
                          'Cannot redefine module namespace property ' +
                          p(g) +
                          ' of ' +
                          Qs(v)
                        )
                      },
                      _
                    ),
                    l(
                      'ERR_UNDEFINED_IDENTIFIER',
                      function (v) {
                        return v + ' is not defined'
                      },
                      E
                    ),
                    l(
                      'ERR_UNKNOWN_ESM_OPTION',
                      function (v) {
                        return 'Unknown esm@' + g + ' option: ' + v
                      },
                      x
                    ),
                    c(
                      'ERR_INVALID_ARG_TYPE',
                      function (v, g, y) {
                        var x = "The '" + v + "' argument must be " + g
                        return (
                          arguments.length > 2 &&
                            (x +=
                              '. Received type ' +
                              (null === y ? 'null' : typeof y)),
                          x
                        )
                      },
                      _
                    ),
                    c(
                      'ERR_INVALID_ARG_VALUE',
                      function (v, g, y = 'is invalid') {
                        return (
                          "The argument '" +
                          v +
                          "' " +
                          y +
                          '. Received ' +
                          _o(g)
                        )
                      },
                      x
                    ),
                    c(
                      'ERR_INVALID_PROTOCOL',
                      function (v, g) {
                        return (
                          "Protocol '" +
                          v +
                          "' not supported. Expected '" +
                          g +
                          "'"
                        )
                      },
                      x
                    ),
                    c(
                      'ERR_MODULE_RESOLUTION_LEGACY',
                      function (v, g, y) {
                        return (
                          v +
                          ' not found by import in ' +
                          g +
                          '. Legacy behavior in require() would have found it at ' +
                          y
                        )
                      },
                      x
                    ),
                    c(
                      'ERR_REQUIRE_ESM',
                      function (v) {
                        return 'Must use import to load module: ' + Qs(v)
                      },
                      x
                    ),
                    c(
                      'ERR_UNKNOWN_FILE_EXTENSION',
                      function (v) {
                        return 'Unknown file extension: ' + v
                      },
                      x
                    ),
                    k
                  )
                })()),
            mu = B.inited
              ? B.module.bundledLookup
              : (B.module.bundledLookup = (function () {
                  var v = Dn.BRAVE,
                    g = Dn.ELECTRON,
                    y = new Set()
                  return (
                    g && y.add('electron'),
                    v && y.add('ad-block').add('tracking-protection'),
                    y
                  )
                })()),
            vu = B.inited
              ? B.module.pathIsExtJS
              : (B.module.pathIsExtJS = (function () {
                  return function (v) {
                    if ('string' != typeof v) return !1
                    var g = v.length
                    return (
                      g > 3 &&
                      46 === v.charCodeAt(g - 3) &&
                      106 === v.charCodeAt(g - 2) &&
                      115 === v.charCodeAt(g - 1)
                    )
                  }
                })()),
            gu = B.inited
              ? B.module.moduleInternalReadPackage
              : (B.module.moduleInternalReadPackage = (function () {
                  var v = /"main"/
                  return function (g, y) {
                    var x = B.memoize.moduleInternalReadPackage,
                      E = void 0 === y ? 0 : y.length,
                      R = g + '\0'
                    E > 0 && (R += 1 === E ? y[0] : y.join())
                    var _ = x.get(R)
                    if (void 0 !== _) return _
                    var P,
                      k = g + mt + 'package.json',
                      I = an(k, 'utf8')
                    if (
                      null === I ||
                      '' === I ||
                      (1 === E && 'main' === y[0] && !v.test(I))
                    )
                      return null
                    try {
                      P = JSON.parse(I)
                    } catch (v) {
                      throw (
                        ((v.message = 'Error parsing ' + k + ': ' + v.message),
                        (v.path = k),
                        ra(v),
                        v)
                      )
                    }
                    return ge(P) ? (x.set(R, P), P) : null
                  }
                })()),
            yu = B.inited
              ? B.module.fsRealpath
              : (B.module.fsRealpath = (function () {
                  var v,
                    g = Dn.ELECTRON,
                    y = Dn.WIN32,
                    x = B.realpathNativeSync,
                    E = g || y,
                    R = !E && 'function' == typeof x
                  function a(g) {
                    try {
                      return Oi(g)
                    } catch (y) {
                      if (
                        Ns(y) &&
                        'ENOENT' === y.code &&
                        (void 0 === v &&
                          (v =
                            !E &&
                            !B.support.realpathNative &&
                            'function' == typeof We.fs.realpath),
                        v)
                      )
                        return (function (v) {
                          if ('string' == typeof v)
                            try {
                              return We.fs.realpath(jn(v))
                            } catch (v) {}
                          return ''
                        })(g)
                    }
                    return ''
                  }
                  return function (v) {
                    if ('string' != typeof v) return ''
                    var g = B.memoize.fsRealpath,
                      y = g.get(v)
                    return void 0 !== y
                      ? y
                      : ((y = R
                          ? (function (v) {
                              try {
                                return x(v)
                              } catch (v) {}
                              return a(v)
                            })(v)
                          : a(v)),
                        '' !== y && g.set(v, y),
                        y)
                  }
                })()),
            Ru = 39,
            _u = Dn.FLAGS,
            Pu = Dn.TINK,
            Iu = Dn.YARN_PNP,
            Au = du.MAIN_NOT_FOUND,
            Nu = Ti.prototype.isFile,
            Lu = ['main'],
            Du = Pu || Iu,
            Fu = !Du && !_u.preserveSymlinks,
            ju = !Du && !_u.preserveSymlinksMain
          function Uo(v, g, y) {
            for (var x = 0, E = null == g ? 0 : g.length; x < E; x++) {
              var R = g[x],
                _ = qo(v + R, y)
              if ('' !== _) return _
            }
            return ''
          }
          function Wo(v, g, y, x) {
            if ('string' != typeof g) return ''
            var E = dt(v, g),
              R = qo(E, x)
            return (
              '' === R && (R = Uo(E, y, x)),
              '' === R && (R = Uo(E + mt + 'index', y, x)),
              R
            )
          }
          function qo(v, g) {
            var y = -1
            if (vu(v) || Un(v)) {
              var x = Fn(v)
              null !== x && (y = Reflect.apply(Nu, x, []) ? 0 : 1)
            } else y = Vn(v)
            if (y) return ''
            var E = g ? ju : Fu
            return E ? yu(v) : v
          }
          function zo(v, g, y, x, E) {
            var R,
              _,
              P,
              k = gu(g, y)
            if (null === k) return Uo(g + mt + 'index', x, E)
            for (var I = 0, A = null == y ? 0 : y.length; I < A; I++)
              if (
                ((R = y[I]),
                (_ = k[R]),
                (P = Wo(g, _, x, E)),
                '' !== P && ('main' === R || !Un(P)))
              )
                return P
            var N = g + mt + 'package.json'
            if (((P = Uo(g + mt + 'index', x, E)), '' === P)) throw new Au(v, N)
            return (
              _u.pendingDeprecation &&
                Ae(
                  'Invalid ' +
                    gi(R, Ru) +
                    ' field in ' +
                    gi(N, Ru) +
                    ' of ' +
                    _o(_) +
                    '. Please either fix or report it to the module author',
                  'DeprecationWarning',
                  'DEP0128'
                ),
              P
            )
          }
          var Vu,
            $o = function (v, g, y = !1, x, E) {
              var R = g.length,
                _ = v + '\0' + (1 === R ? g[0] : rs.join(g)) + '\0'
              void 0 !== x && (_ += 1 === x.length ? x[0] : x.join()),
                (_ += '\0'),
                void 0 !== E && (_ += 1 === E.length ? E[0] : E.join()),
                (_ += '\0'),
                y && (_ += '1')
              var P = B.memoize.moduleInternalFindPath,
                k = P.get(_)
              if (void 0 !== k) return k
              var I = y ? ju : Fu,
                A = Yi(v)
              if (!A && 0 === R) return ''
              var N = v.length,
                C = 0 !== N
              if (C) {
                var O = v.charCodeAt(N - 1)
                46 === O &&
                  ((O = v.charCodeAt(N - 2)),
                  46 === O && (O = v.charCodeAt(N - 3))),
                  (C = Xi(O))
              }
              A && (I ? ((g = [ct(v)]), (v = it(v))) : (g = [v]))
              for (var T = 0, L = g, M = null == L ? 0 : L.length; T < M; T++) {
                var D = L[T]
                if (A || 1 === Vn(D)) {
                  var F = D
                  if (!I || ((F = yu(D)), '' !== F)) {
                    A ? I && (F += mt + v) : (F = dt(F, v))
                    var j = -1,
                      V = null
                    vu(F) || Un(F)
                      ? ((V = Fn(F)),
                        null !== V && (j = Reflect.apply(Nu, V, []) ? 0 : 1))
                      : (j = Vn(F))
                    var G = ''
                    if (
                      (C ||
                        (0 === j && (G = I ? yu(F) : F),
                        '' === G &&
                          (void 0 === E && (E = de(op._extensions)),
                          (G = Uo(F, E, y)))),
                      1 === j &&
                        '' === G &&
                        (void 0 === E && (E = de(op._extensions)),
                        void 0 === x && (x = Lu),
                        (G = zo(v, F, x, E, y))),
                      '' !== G)
                    )
                      return P.set(_, G), G
                  }
                }
              }
              return ''
            },
            Bu = {},
            Gu = B.inited
              ? B.module.utilValidateString
              : (B.module.utilValidateString = (function () {
                  var v = du.ERR_INVALID_ARG_TYPE
                  return function (g, y) {
                    if ('string' != typeof g) throw new v(y, 'string', g)
                  }
                })()),
            Uu = Dn.ELECTRON,
            Wu = Dn.WIN32,
            $u = Array.prototype.map
              .call('node_modules', function (v) {
                return v.charCodeAt(0)
              })
              .reverse(),
            Ku = $u.length,
            Ju = Xn(function (v) {
              if ((Gu(v, 'from'), Uu)) return ss._nodeModulePaths(v)
              if (((v = dt(v)), Wu)) {
                if (
                  v.length > 1 &&
                  92 === v.charCodeAt(v.length - 1) &&
                  58 === v.charCodeAt(v.length - 2)
                )
                  return rs.of(v + 'node_modules')
              } else if ('/' === v) return rs.of('/node_modules')
              for (var g = v, y = g.length, x = y, E = 0, R = rs.of(); y--; ) {
                var _ = v.charCodeAt(y)
                Xi(_)
                  ? (E !== Ku &&
                      rs.push(R, v.slice(0, x) + mt + 'node_modules'),
                    (x = y),
                    (E = 0))
                  : -1 !== E && ($u[E] === _ ? (E += 1) : (E = -1))
              }
              return Wu || rs.push(R, '/node_modules'), R
            }, ns._nodeModulePaths),
            Yu = Ju,
            Qu = Dn.RUNKIT,
            Xu = D.PACKAGE_DIRNAME,
            nu = function (v, g = null, y = !1) {
              var x = null !== g && g.filename
              if (!Zi(v)) {
                var E = null !== g && g.paths,
                  R = E ? rs.from(E) : rs.of()
                return (
                  E && !y && rs.push(R, ...pp.state.module.globalPaths),
                  Qu && (void 0 === Vu && (Vu = ct(Xu)), R.push(Vu)),
                  R.length ? R : null
                )
              }
              if ('string' == typeof x) return rs.of(ct(x))
              var _ = y ? Yu('.') : op._nodeModulePaths('.')
              return rs.unshift(_, '.'), _
            },
            Zu = 1,
            el = 2,
            tl = Dn.ELECTRON,
            rl = Dn.FLAGS,
            il = Dn.YARN_PNP,
            nl = du.ERR_INVALID_PROTOCOL,
            sl = du.ERR_MODULE_RESOLUTION_LEGACY,
            al = du.ERR_UNKNOWN_FILE_EXTENSION,
            ol = du.MODULE_NOT_FOUND,
            ul = /^\/\/localhost\b/,
            ll = /[?#].*$/,
            cl = ['.mjs', '.js', '.json', '.node'],
            pl = ['main'],
            hl = new Set(cl)
          function xu(v, g, y, x, E, R, _) {
            var P
            return (
              x && Array.isArray(x.paths)
                ? (P = (function (v, g, y) {
                    for (
                      var x = new op(''),
                        E = [],
                        R = 0,
                        _ = null == g ? 0 : g.length;
                      R < _;
                      R++
                    ) {
                      var P = g[R]
                      x.paths = Yu(P)
                      for (
                        var k = nu(v, x, y),
                          I = 0,
                          A = null == k ? 0 : k.length;
                        I < A;
                        I++
                      ) {
                        var N = k[I]
                        ;-1 === E.indexOf(N) && E.push(N)
                      }
                    }
                    return E
                  })(v, x.paths, _))
                : ((P = nu(v, g, _)), null === P && (P = [])),
              $o(v, P, y, E, R)
            )
          }
          function bu(v, g) {
            if (!pp.state.package.default.options.debug) {
              var y = { filename: null, inModule: !1 }
              if (null !== g) {
                var x = g.type
                ;(y.filename = g.filename),
                  (y.inModule =
                    (!g.package.options.cjs.paths || '.mjs' === g.extname) &&
                    x !== Zu &&
                    x !== el)
              }
              ia(v, y)
            }
            return v
          }
          var wu = function (v, g, y = !1, x) {
              if (tl && mu.has(v)) return ss._resolveFilename(v, g, y, x)
              if (ln.has(v)) return v
              if (il) return Bu._resolveFilename(v, g, y, x)
              var E,
                R,
                _,
                P = Yi(v),
                k = Bh.get(g)
              if (
                (null !== k && k.updateFilename(),
                (E = P ? ct(v) : null === k ? '' : k.dirname),
                !ge(x))
              ) {
                ;(R = B.memoize.moduleESMResolveFilename),
                  (_ = v + '\0' + E + '\0' + (y ? '1' : ''))
                var I = R.get(_)
                if (void 0 !== I) return I
              }
              var A = !P && Zi(v),
                N = P || A,
                C = Cp.get(E).options,
                O = C.cjs.paths,
                T = C.mainFields
              null !== k && '.mjs' === k.extname && ((O = !1), (T = pl))
              var L = ''
              if (N || (47 !== v.charCodeAt(0) && -1 === v.indexOf(':'))) {
                if (N) {
                  var M = v.replace(ll, '')
                  if (!xs(M)) {
                    var D,
                      F = P ? [''] : [E]
                    O ||
                      (D =
                        'explicit' === rl.esModuleSpecifierResolution
                          ? Ds
                          : cl),
                      (M = us(M)),
                      (L = $o(M, F, y, T, D))
                  }
                } else if (!xs(v)) {
                  var j = us(v),
                    V = !O,
                    G = O ? void 0 : cl
                  if (((L = xu(j, g, y, x, T, G, V)), '' === L && ln.has(j)))
                    return void 0 !== R && R.set(_, j), j
                }
              } else {
                var U = bs(v)
                if (
                  ((L = ws(U)),
                  '' === L && 'file:' !== U.protocol && !ul.test(v))
                ) {
                  var W = new nl(U.protocol, 'file:')
                  throw (bu(W, k), W)
                }
                '' !== L && (L = xu(L, g, y, x, Ds, Ds, !0))
              }
              if ('' !== L) {
                if (O || y || vu(L) || Un(L) || hl.has(pt(L)))
                  return void 0 !== R && R.set(_, L), L
                var q = new al(L)
                throw (bu(q, k), q)
              }
              if (
                ((L = (function (v, g, y, x) {
                  try {
                    return op._resolveFilename(v, g, y, x)
                  } catch (v) {}
                  return ''
                })(v, g, y, x)),
                '' !== L)
              ) {
                if (O) return void 0 !== R && R.set(_, L), L
                var z = new sl(v, E, L)
                throw (bu(z, k), z)
              }
              var K = new ol(v, g)
              throw (bu(K, k), K)
            },
            Eu = function (v, g, y, x) {
              var E
              try {
                return wu(v, g, y, x)
              } catch (v) {
                E = v
              }
              try {
                return op._resolveFilename(v, g, y, x)
              } catch (v) {}
              throw E
            },
            Su = function (v, g, y = !1, x, E) {
              var R,
                _ = pp.state.module,
                P = B.moduleState.parsing,
                k = x[v]
              void 0 === k && x === _.scratchCache && (k = op._cache[v])
              var I = void 0 !== k
              if (I) {
                var A = null != g && g.children
                if (
                  (Array.isArray(A) && -1 === rs.indexOf(A, k) && rs.push(A, k),
                  (R = Bh.get(k)),
                  P || k.loaded || 2 !== R.state)
                )
                  return R
              } else {
                if (me(ou, v)) return ou[v]
                ;(k = new op(v, g)),
                  (k.filename = Es(v) ? ws(v) : v),
                  (R = Bh.get(k)),
                  y && ((k.id = '.'), (_.mainModule = k), (q.mainModule = k))
              }
              var N = R,
                C = N.compileData,
                O = R.extname
              if (
                I ||
                (null !== C && null !== C.code) ||
                '.json' === O ||
                '.wasm' === O
              )
                return E(R), R
              var T = k,
                L = T._compile,
                M = me(k, '_compile')
              return (
                K(
                  k,
                  '_compile',
                  ze(function (v, g) {
                    M
                      ? K(this, '_compile', L)
                      : Reflect.deleteProperty(this, '_compile')
                    var y = me(this, B.symbol._compile)
                        ? this[B.symbol._compile]
                        : null,
                      x = L
                    return (
                      'function' == typeof y &&
                        ((x = y),
                        Reflect.deleteProperty(this, B.symbol._compile)),
                      Reflect.apply(x, this, [v, g])
                    )
                  })
                ),
                E(R),
                R
              )
            },
            fl = B.inited
              ? B.module.utilDecodeURI
              : (B.module.utilDecodeURI = (function () {
                  var v = decodeURI
                  return function (g) {
                    return 'string' == typeof g ? v(g) : ''
                  }
                })()),
            dl = B.inited
              ? B.module.utilGetURLQueryFragment
              : (B.module.utilGetURLQueryFragment = (function () {
                  var v = /[?#]/
                  return function (g) {
                    var y = 'string' == typeof g ? g.search(v) : -1
                    return -1 === y ? '' : fl(Js(g.slice(y)))
                  }
                })()),
            ml = B.inited
              ? B.module.moduleInternalFindCompilerExtension
              : (B.module.moduleInternalFindCompilerExtension = (function () {
                  return function (v, g) {
                    var y = g.basename,
                      x = g.extname,
                      E = g.filename
                    if ('' === x) return x
                    for (
                      var R, _ = E.length - x.length, P = 0;
                      -1 !== (R = y.indexOf('.', P));

                    )
                      if (((P = R + 1), 0 !== R)) {
                        var k = R === _,
                          I = k ? x : y.slice(R)
                        if (me(v, I)) return I
                        if (k) break
                      }
                    return ''
                  }
                })()),
            ku = function (v, g, y = !1, x) {
              var E,
                R = B.moduleState.parsing,
                _ = Bh.get(g),
                P = null === _ ? null : _.package.options.cjs,
                k = null !== _ && '.mjs' === _.extname,
                I = null === _ ? -1 : _.type
              E = null !== _ && P.paths && !k ? Eu(v, g, y) : wu(v, g, y)
              var A = ct(E)
              '.' === A && ln.has(E) && (v = E)
              var N = Cp.from(E),
                C = N.options.cjs,
                O = dl(v),
                T = pp.state.module,
                L = T.moduleCache,
                M = T.scratchCache,
                D = op._cache,
                F = !C.cache
              if (((v = '' === O ? E : Ys(E) + O), Un(E) || me(L, v))) D = L
              else if (R) D = M
              else if (me(M, v)) {
                var j = M[v]
                F && 1 !== Bh.get(j).type && (D = L),
                  (D[v] = j),
                  Reflect.deleteProperty(M, v)
              }
              var V = !1,
                w = function (v) {
                  var g = 1 === v.type
                  g && (F = !1),
                    y && F && Reflect.deleteProperty(q, 'mainModule'),
                    g &&
                      null !== _ &&
                      (k || (1 !== I && 2 !== I && !P.cache)) &&
                      (v.module.parent = void 0)
                },
                G = Su(v, g, y, D, function (g) {
                  ;(V = !0),
                    (D[v] = g.module),
                    null !== _ && (_.children[g.name] = g),
                    R || w(g),
                    'function' == typeof x && x(g),
                    (function (v, g, y, x, E) {
                      var R,
                        _ = !0
                      try {
                        ;(function (v, g, y) {
                          var x = B.moduleState.parsing
                          v.updateFilename(g), null === y && (y = v)
                          var E = pp.state.module.extensions,
                            R = v.extname,
                            _ = y.extname,
                            P = y.type,
                            k = 1 === P,
                            I = '.mjs' === _,
                            A = 2 === P
                          ;(k ||
                            A ||
                            '.js' === R ||
                            (('.cjs' === R ||
                              y.package.options.cjs.extensions) &&
                              !I)) &&
                            (E = op._extensions)
                          var N = ml(E, v)
                          '' === N && (N = '.js')
                          var C = v.module
                          C.paths ||
                            (C.paths =
                              k ||
                              A ||
                              (v.package.options.cjs.paths &&
                                !I &&
                                '.mjs' !== R)
                                ? op._nodeModulePaths(v.dirname)
                                : Yu(v.dirname)),
                            x &&
                            '.cjs' !== N &&
                            '.js' !== N &&
                            '.json' !== N &&
                            '.mjs' !== N &&
                            '.wasm' !== N
                              ? (v.state = 2)
                              : (E[N](C, g), x || C.loaded || (C.loaded = !0))
                        })(v, g, y),
                          (_ = !1)
                      } catch (v) {
                        throw ((R = v), R)
                      } finally {
                        _ &&
                          (1 !== v.type
                            ? Reflect.defineProperty(x, E, {
                                configurable: !0,
                                enumerable: !0,
                                get: ze(function () {
                                  throw R
                                }),
                                set: ze(function (v) {
                                  K(this, E, v)
                                }),
                              })
                            : Reflect.deleteProperty(x, E))
                      }
                    })(g, E, _, D, v)
                })
              return (
                R && w(G),
                V || 'function' != typeof x || x(G),
                null !== _ && (_._lastChild = G),
                G
              )
            },
            vl = B.inited
              ? B.module.moduleEsmValidateDeep
              : (B.module.moduleEsmValidateDeep = (function () {
                  var v = 1,
                    g = -1,
                    y = 3,
                    x = 1,
                    E = 4,
                    R = 2,
                    _ = du.ERR_EXPORT_CYCLE,
                    P = du.ERR_EXPORT_MISSING
                  function u(v, g, x) {
                    var E = v.setters[g],
                      R = E.findIndex(function ({ owner: v }) {
                        return v === x
                      })
                    if (-1 !== R) {
                      var k = (function e(v, g, x) {
                        var E = v.name
                        if (void 0 === x) x = new Set()
                        else if (x.has(E)) return !0
                        x.add(E)
                        for (
                          var R = 0,
                            _ = v.setters[g],
                            P = null == _ ? 0 : _.length;
                          R < P;
                          R++
                        ) {
                          var k = _[R]
                          if (k.type === y && e(k.owner, k.exportedName, x))
                            return !0
                        }
                        return !1
                      })(v, g)
                        ? _
                        : P
                      throw (E.splice(R, 1), new k(v.module, g))
                    }
                  }
                  function l(y, _) {
                    var P = '.mjs' === _.extname,
                      k = _.package.options.cjs.namedExports && !P
                    if (y._namespaceFinalized !== g) {
                      var I = y.type,
                        A = I === x,
                        N = y._loaded === v,
                        C =
                          ((A || I === E) && !k && !y.builtin) || (I === R && P)
                      if (!A || C || N) {
                        var O,
                          T = y._validation,
                          L = y.getters,
                          M = y.setters
                        for (var D in M) {
                          if (C) {
                            if ('*' === D || 'default' === D) continue
                            u(y, D, _)
                          }
                          var F = T.get(D)
                          if (!0 !== F) {
                            if (
                              (void 0 === O &&
                                (O = N ? y.getExportByName('*', _) : L),
                              me(O, D))
                            ) {
                              var j = L[D],
                                V = j,
                                B = V.owner
                              if (B.type === x && B._loaded !== v) continue
                              if (!j.deferred) {
                                T.set(D, !0)
                                continue
                              }
                              for (
                                var G = new Set();
                                void 0 !== j && j.deferred;

                              )
                                G.has(j)
                                  ? (j = void 0)
                                  : (G.add(j), (j = j.owner.getters[j.id]))
                              if (void 0 !== j) {
                                ;(L[D] = j), T.set(D, !0)
                                continue
                              }
                            }
                            T.set(D, !1), u(y, D, _)
                          }
                        }
                      }
                    }
                  }
                  return function e(v, g) {
                    var y = v.children
                    if (void 0 === g) g = new Set()
                    else if (g.has(v)) return
                    for (var E in (g.add(v), y)) {
                      var R = y[E]
                      R.type !== x && e(R, g), l(R, v)
                    }
                  }
                })()),
            gl = B.inited
              ? B.module.moduleEsmValidateShallow
              : (B.module.moduleEsmValidateShallow = (function () {
                  var v = du.ERR_EXPORT_MISSING
                  return function (g, y) {
                    var x,
                      E = g._validation,
                      R = g.setters
                    for (var _ in R) {
                      var P = E.get(_)
                      if (!0 !== P)
                        if (
                          (void 0 === x && (x = g.getExportByName('*', y)),
                          me(x, _))
                        )
                          E.set(_, !0)
                        else {
                          E.set(_, !1)
                          var k = R[_],
                            I = k.findIndex(function ({ owner: v }) {
                              return v === y
                            })
                          if (-1 !== I)
                            throw (k.splice(I, 1), new v(g.module, _))
                        }
                    }
                  }
                })()),
            yl = du.ERR_INVALID_ESM_FILE_EXTENSION
          function Cu(v, g, y) {
            var x = y._lastChild
            if (null !== x && Object.is(x.module.exports, g)) return x
            var E = (function (v, g, y) {
                try {
                  return Eu(v, g, void 0)
                } catch (v) {}
                if (en(v)) {
                  var x = g.filename
                  return 'string' == typeof x ? dt(x, v) : dt(v)
                }
                return v
              })(v, y.module),
              R = new op(E)
            return (
              (R.exports = g),
              (R.loaded = !0),
              en(E) && (R.filename = E),
              Bh.get(R)
            )
          }
          function Ou(v, g, y) {
            var x,
              E,
              R = B.moduleState
            R.requireDepth += 1
            var _ = !0
            try {
              ;(x = ku(v, g.module, !1, y)), (_ = !1)
            } catch (v) {
              E = v
            }
            if (((R.requireDepth -= 1), !_)) return x
            if ('.mjs' === g.extname || !Ns(E)) throw E
            var P = E,
              k = P.code
            if ('ERR_INVALID_PROTOCOL' !== k && 'MODULE_NOT_FOUND' !== k)
              throw E
            return null
          }
          function Tu(v, g) {
            g._passthruRequire = !0
            try {
              return g.module.require(v)
            } finally {
              g._passthruRequire = !1
            }
          }
          var Mu = function (v, g, y, x = !1) {
              var E = B.moduleState,
                R = E.parsing,
                _ = null,
                P = !1,
                u = function (v, g, x = g.name) {
                  ;(v.children[x] = g), g.addSetters(y, v)
                },
                l = function () {
                  if (!P) {
                    P = !0
                    var y = Tu(v, g)
                    if (null === _) (_ = Cu(v, y, g)), u(g, _)
                    else if (!Object.is(_.module.exports, y)) {
                      var x = _,
                        E = x.name
                      ;(_ = Cu(v, y, g)), u(g, _, E)
                    }
                    _.loaded(), _.updateBindings(null, 3), gl(_, g)
                  }
                },
                c = function (v) {
                  return u(g, v)
                }
              if (x || R) {
                x && (E.parsing = !0)
                try {
                  _ = Ou(v, g, c)
                } finally {
                  x && (E.parsing = !1)
                }
                null !== _ &&
                  (_.updateBindings(),
                  x && 2 === _.state && 1 !== _.type && vl(_))
              } else _ = Ou(v, g, c)
              if (R) {
                if (null === _) {
                  var k = Tu(v, g)
                  ;(_ = Cu(v, k, g)), u(g, _)
                }
                _._finalize = l
              }
              if (
                '.mjs' === g.extname &&
                null !== _ &&
                3 === _.type &&
                '.mjs' !== _.extname
              )
                throw yl(_.module)
              R || l()
            },
            xl = B.inited
              ? B.module.utilIdentity
              : (B.module.utilIdentity = (function () {
                  return function (v) {
                    return v
                  }
                })()),
            El = bt,
            Sl = wt,
            Rl = du.ERR_CONST_ASSIGNMENT,
            _l = du.ERR_UNDEFINED_IDENTIFIER,
            Pl = B.external,
            Il = Pl.Promise,
            Al = Pl.eval,
            Nl = {
              addDefaultValue(v) {
                this.addExportGetters([
                  [
                    'default',
                    function () {
                      return v
                    },
                  ],
                ]),
                  void 0 === v && this.initBindings(['default'])
              },
              addExportFromSetter(v, g = v) {
                var y = this,
                  x = qu(3, function (x, E) {
                    var R = y.entry
                    if (1 === R._loaded) return !0
                    1 === E.type &&
                      1 !== E._loaded &&
                      (R._namespaceFinalized = -1),
                      R.addGetterFrom(E, v, g)
                  })
                return (x.exportedName = g), x
              },
              addExportGetters(v) {
                this.entry.addGetters(v)
              },
              addNamespaceSetter() {
                var v = this
                return qu(4, function (g, y) {
                  var x = v.entry
                  if (1 === x._loaded) return !0
                  var E = 1 === y._loaded
                  if (E || 1 !== y.type) {
                    var R = y.getters,
                      _ = x.getters,
                      P = x.name,
                      k = E ? y.getExportByName('*', x) : y.getters
                    for (var I in k)
                      if ('default' !== I) {
                        var A = void 0,
                          N = _[I]
                        if (void 0 === N || ((A = N.owner.name), P !== A)) {
                          var C = R[I].owner.name
                          ;(void 0 !== N && A !== C) || x.addGetterFrom(y, I),
                            (A = _[I].owner.name),
                            A !== P &&
                              A !== C &&
                              x.addGetter(
                                I,
                                qu(2, function () {
                                  return Sl
                                })
                              )
                        }
                      }
                  } else x._namespaceFinalized = -1
                })
              },
              assertImportedBinding: function e(v, g) {
                if (!0 !== this.entry.importedBindings.get(v))
                  throw new _l(v, e)
                return g
              },
              assertUndeclared: function e(v) {
                var g = B.unsafeGlobal
                if (!me(g, v)) throw new _l(v, e)
                return g[v]
              },
              compileEval(v) {
                if ('string' != typeof v) return v
                var g = this.entry,
                  y = g.package.options.cjs,
                  x = '.mjs' === g.extname,
                  E = y.vars && !x
                try {
                  return es.compile(v, {
                    cjsVars: E,
                    eval: !0,
                    runtimeName: g.runtimeName,
                  }).code
                } catch (E) {
                  if (!pp.state.package.default.options.debug && zs(E)) {
                    var R = g.type
                    ia(E, {
                      content: v,
                      filename: 'eval',
                      inModule: (!y.paths || x) && 1 !== R && 2 !== R,
                    })
                  } else ra(E)
                  throw E
                }
              },
              compileGlobalEval(v) {
                if ('string' != typeof v) return v
                var g,
                  y = this.entry,
                  x = y.package.options.cjs,
                  E = '.mjs' === y.extname,
                  R = y.runtimeName,
                  _ = x.vars && !E
                try {
                  var P = es.compile(v, {
                    cjsVars: _,
                    eval: !0,
                    runtimeName: R,
                  })
                  if (0 === P.transforms) return v
                  g = P.code
                } catch (g) {
                  if (!pp.state.package.default.options.debug && zs(g)) {
                    var k = y.type
                    ia(g, {
                      content: v,
                      filename: 'eval',
                      inModule: (!x.paths || E) && 1 !== k && 2 !== k,
                    })
                  } else ra(g)
                  throw g
                }
                var I = B.unsafeGlobal
                if (me(I, R)) return g
                var A = this
                return (
                  Reflect.defineProperty(I, R, {
                    configurable: !0,
                    get: ze(function () {
                      return Reflect.deleteProperty(this, R), A
                    }),
                  }),
                  (g =
                    (ci(g, 'use strict') ? '"use strict";' : '') +
                    'let ' +
                    R +
                    '=global.' +
                    R +
                    ';' +
                    g),
                  g
                )
              },
              dynamicImport(v) {
                var g = this.entry
                return new Il(function (y, x) {
                  ho(function () {
                    try {
                      var E, R
                      'string' != typeof v && (v += '')
                      var _ = [
                        [
                          '*',
                          null,
                          qu(2, function (v, g) {
                            if (1 === g._loaded)
                              return (
                                (E = v),
                                void 0 === R &&
                                  (R = ho(function () {
                                    return y(E)
                                  })),
                                !0
                              )
                          }),
                        ],
                      ]
                      Mu(v, g, _, !0)
                    } catch (v) {
                      !pp.state.package.default.options.debug && zs(v)
                        ? ia(v, {
                            inModule:
                              !g.package.options.cjs.paths ||
                              '.mjs' === g.extname,
                          })
                        : ra(v),
                        x(v)
                    }
                  })
                })
              },
              enable(v, g) {
                if (null !== v.runtime) return v.runtime
                var y = v.module,
                  x = y.exports
                return (
                  (v.exports = g),
                  f(x, 'meta', function () {
                    var g = v.id,
                      y = null
                    return (
                      Es(g) ? (y = g) : en(g) && (y = Ys(g)),
                      { __proto__: null, url: y }
                    )
                  }),
                  (x.addDefaultValue = Nl.addDefaultValue),
                  (x.addExportFromSetter = Nl.addExportFromSetter),
                  (x.addExportGetters = Nl.addExportGetters),
                  (x.addNamespaceSetter = Nl.addNamespaceSetter),
                  (x.assertImportedBinding = Nl.assertImportedBinding),
                  (x.assertUndeclared = Nl.assertUndeclared),
                  (x.compileEval = function (v) {
                    return Nl.compileEval.call(x, v)
                  }),
                  (x.compileGlobalEval = Nl.compileGlobalEval),
                  (x.dynamicImport = Nl.dynamicImport),
                  (x.entry = v),
                  (x.global = lu),
                  (x.globalEval = function (v) {
                    return Nl.globalEval.call(x, v)
                  }),
                  (x.import = Nl.import),
                  (x.initBindings = Nl.initBindings),
                  (x.resumeChildren = Nl.resumeChildren),
                  (x.run = Nl.run),
                  (x.runResult = void 0),
                  (x.throwConstAssignment = Nl.throwConstAssignment),
                  (x.updateBindings = Nl.updateBindings),
                  (x._ = x),
                  (x.a = x.assertImportedBinding),
                  (x.b = x.throwConstAssignment),
                  (x.c = x.compileEval),
                  (x.d = x.addDefaultValue),
                  (x.e = x.globalEval),
                  (x.f = x.addExportFromSetter),
                  (x.g = x.global),
                  (x.i = x.dynamicImport),
                  (x.j = x.initBindings),
                  (x.k = xl),
                  (x.n = x.addNamespaceSetter),
                  (x.o = El),
                  (x.r = x.run),
                  (x.s = x.resumeChildren),
                  (x.t = x.assertUndeclared),
                  (x.u = x.updateBindings),
                  (x.v = Al),
                  (x.w = x.import),
                  (x.x = x.addExportGetters),
                  (v.runtime = x)
                )
              },
              globalEval(v) {
                return Al(this.compileGlobalEval(v))
              },
              import(v, g) {
                return Mu(v, this.entry, g)
              },
              initBindings(v) {
                this.entry.updateBindings(v)
              },
              resumeChildren() {
                this.entry.resumeChildren()
              },
              run(v) {
                var g = this.entry,
                  y = 3 === g.type ? Hu : zu
                return (this.runResult = y(g, v))
              },
              throwConstAssignment: function e() {
                throw new Rl(e)
              },
              updateBindings(v) {
                return this.entry.updateBindings(null, 2), v
              },
            }
          function qu(v, g) {
            return (g.type = v), g
          }
          function zu(v, g) {
            var y = v.module,
              x = v.exports
            return (y.exports = x), Reflect.apply(g, x, [x, ah(y)])
          }
          function Hu(v, g) {
            var y = v.module,
              x = v.exports
            return (
              (y.exports = x),
              v.package.options.cjs.vars && '.mjs' !== v.extname
                ? Reflect.apply(g, x, [x, ah(y)])
                : Reflect.apply(g, void 0, [])
            )
          }
          var Cl,
            Ol = Nl,
            Tl = B.inited
              ? B.module.safeJSON
              : (B.module.safeJSON = Se(B.external.JSON)),
            Ll = B.inited
              ? B.module.utilCreateSourceMap
              : (B.module.utilCreateSourceMap = (function () {
                  var v = /\n/g
                  return function (g, y) {
                    if (!en(g)) return ''
                    for (var x = 0, E = ''; 0 === x || v.test(y); )
                      (E += (x ? ';' : '') + 'AA' + (x ? 'C' : 'A') + 'A'),
                        (x += 1)
                    return (
                      '{"version":3,"sources":[' +
                      gi(Ys(g)) +
                      '],"names":[],"mappings":"' +
                      E +
                      '"}'
                    )
                  }
                })()),
            Ml = B.inited
              ? B.module.utilCreateInlineSourceMap
              : (B.module.utilCreateInlineSourceMap = (function () {
                  return function (v, g) {
                    var y = Ll(v, g)
                    return '' === y
                      ? y
                      : '//# sourceMappingURL=data:application/json;charset=utf-8,' +
                          Js(y)
                  }
                })()),
            Dl = B.inited
              ? B.module.moduleInternalCompileSource
              : (B.module.moduleInternalCompileSource = (function () {
                  var v = 59
                  function t(v, g) {
                    var y = g.async,
                      x = 0 !== v.transforms,
                      E = v.code
                    if (x) {
                      var R = null !== v.firstReturnOutsideFunction,
                        _ = g.runtimeName
                      null === v.firstAwaitOutsideFunction && (y = !1),
                        (E =
                          'const ' +
                          _ +
                          '=exports;' +
                          (R ? 'return ' : '') +
                          _ +
                          '.r((' +
                          (y ? 'async ' : '') +
                          'function(exports,require){' +
                          E +
                          '\n}))')
                    } else
                      y &&
                        ((x = !0), (E = '(async () => { ' + bi(E) + '\n})();'))
                    return x && g.sourceMap && (E += Ml(v.filename, E)), E
                  }
                  function r(g, y) {
                    var x = y.cjsVars,
                      E = y.runtimeName,
                      R = null !== g.firstReturnOutsideFunction,
                      _ = 'yield;' + E + '.s();',
                      P = g.yieldIndex,
                      k = y.async
                    null === g.firstAwaitOutsideFunction && (k = !1)
                    var I = g.code
                    0 === g.transforms && (I = bi(I)),
                      -1 !== P &&
                        (I =
                          0 === P
                            ? _ + I
                            : I.slice(0, P) +
                              (I.charCodeAt(P - 1) === v ? '' : ';') +
                              _ +
                              I.slice(P))
                    var A =
                      'const ' +
                      E +
                      '=exports;' +
                      (x
                        ? ''
                        : '__dirname=__filename=arguments=exports=module=require=void 0;') +
                      (R ? 'return ' : '') +
                      E +
                      '.r((' +
                      (k ? 'async ' : '') +
                      'function *(' +
                      (x ? 'exports,require' : '') +
                      '){"use strict";' +
                      I +
                      '\n}))'
                    return y.sourceMap && (A += Ml(g.filename, A)), A
                  }
                  return function (v, g = {}) {
                    var y = 2 === v.sourceType ? r : t
                    return y(v, g)
                  }
                })()),
            Fl = B.inited
              ? B.module.utilGetSourceMappingURL
              : (B.module.utilGetSourceMappingURL = (function () {
                  return function (v) {
                    if ('string' != typeof v) return ''
                    var g = v.length
                    if (g < 22) return ''
                    for (var y = null, x = g; null === y; ) {
                      if (
                        ((x = v.lastIndexOf('sourceMappingURL', x)),
                        -1 === x || x < 4)
                      )
                        return ''
                      var E = x + 16,
                        R = E + 1
                      if (
                        ((x -= 4),
                        47 === v.charCodeAt(x) && 47 === v.charCodeAt(x + 1))
                      ) {
                        var _ = v.charCodeAt(x + 2)
                        if (
                          !(
                            (64 !== _ && 35 !== _) ||
                            ((_ = v.charCodeAt(x + 3)),
                            (32 !== _ && 9 !== _) ||
                              (E < g && 61 !== v.charCodeAt(E)))
                          )
                        ) {
                          if (R === g) return ''
                          y = v.slice(R)
                        }
                      }
                    }
                    var P = y.indexOf('\n')
                    ;-1 !== P && (y = y.slice(0, P)), (y = y.trim())
                    for (var k = y.length, I = -1; ++I < k; ) {
                      var A = y.charCodeAt(I)
                      if (39 === A || 34 === A || 32 === A || 9 === A) return ''
                    }
                    return y
                  }
                })()),
            jl = B.inited
              ? B.module.errorGetStackFrames
              : (B.module.errorGetStackFrames =
                  ((Cl = ze(function (v, g) {
                    return g
                  })),
                  function (v) {
                    if (!Ns(v)) return []
                    var g = cu(v),
                      y = Reflect.getOwnPropertyDescriptor(
                        g,
                        'prepareStackTrace'
                      )
                    K(g, 'prepareStackTrace', Cl)
                    var x = v.stack
                    return (
                      void 0 === y
                        ? Reflect.deleteProperty(g, 'prepareStackTrace')
                        : Reflect.defineProperty(g, 'prepareStackTrace', y),
                      Array.isArray(x) ? x : []
                    )
                  })),
            Vl = B.inited
              ? B.module.utilIsIdentifierName
              : (B.module.utilIsIdentifierName = (function () {
                  return function (v) {
                    if ('string' != typeof v || 0 === v.length) return !1
                    var g = 0,
                      y = v.codePointAt(g)
                    if (!Ke(y, !0)) return !1
                    for (
                      var x = y;
                      void 0 !== (y = v.codePointAt((g += x > 65535 ? 2 : 1)));

                    ) {
                      if (!Je(y, !0)) return !1
                      x = y
                    }
                    return !0
                  }
                })()),
            Bl = B.inited
              ? B.module.utilIsObjectEmpty
              : (B.module.utilIsObjectEmpty = (function () {
                  return function (v) {
                    for (var g in v) if (me(v, g)) return !1
                    return !0
                  }
                })()),
            Gl = bt,
            Ul = 4,
            Wl = 3,
            ql = 0,
            $l = 2,
            zl = 1,
            Hl = 1,
            Kl = 3,
            Jl = 4,
            Yl = 5,
            Ql = Dn.DEVELOPMENT,
            Xl = Dn.ELECTRON_RENDERER,
            Zl = Dn.FLAGS,
            ec = Dn.NDB,
            tc = 'await is only valid in async function',
            rc = { input: '' },
            ic = /^.*?\bexports\b/
          function bl(v, g, y) {
            var x = v.compileData,
              E = v.type,
              R = E === Kl,
              _ = E === Jl,
              P = '.mjs' === v.extname,
              k = E === Yl,
              I = v.runtime
            null === I &&
              (R || 0 !== x.transforms
                ? (I = Ol.enable(v, is.create()))
                : ((I = is.create()), (v.runtime = I)))
            var A,
              N,
              C = v.package,
              O = (function (v) {
                return (
                  v.package.options.await &&
                  B.support.await &&
                  '.mjs' !== v.extname
                )
              })(v),
              T = C.options.cjs,
              L = void 0 === I.runResult,
              M = v.module,
              D = B.moduleState.parsing,
              F = !1
            if (((v.state = D ? zl : Wl), L)) {
              if (((v.running = !0), _))
                I.runResult = (function* () {
                  var x = (function (v, g, y) {
                    var x = v.module,
                      E = x.exports,
                      R = v.state,
                      _ = !1
                    if ('function' == typeof y) {
                      var P = Bh.get(v.parent)
                      _ =
                        null !== P &&
                        P.package.options.cjs.extensions &&
                        '.mjs' !== P.extname
                    }
                    var k,
                      I,
                      A = _ ? null : sn(an(g, 'utf8')),
                      N = !0
                    try {
                      _ ? (y(), (I = x.exports)) : (I = Tl.parse(A)), (N = !1)
                    } catch (v) {
                      ;(k = v), _ || (k.message = g + ': ' + k.message)
                    }
                    if ((_ && ((v.state = R), K(x, 'exports', E)), N)) throw k
                    for (
                      var C = de(I), O = 0, T = null == C ? 0 : C.length;
                      O < T;
                      O++
                    ) {
                      var L = C[O]
                      Vl(L) &&
                        v.addGetter(L, function () {
                          return Gl
                        })
                    }
                    return (
                      v.addGetter('default', function () {
                        return Gl
                      }),
                      I
                    )
                  })(v, g, y)
                  yield,
                    (function (v, g) {
                      ;(v.exports = g), (v.module.exports = g)
                      var y = v.getters,
                        i = function (g) {
                          v.addGetter(g, function () {
                            return v.exports[g]
                          })
                        }
                      for (var x in y) i(x)
                      v.addGetter('default', function () {
                        return v.exports
                      })
                    })(v, x)
                })()
              else if (k)
                I.runResult = (function* () {
                  var y = { __proto__: null },
                    x = (function (v, g, y) {
                      for (
                        var x = new WebAssembly.Module(an(g)),
                          E = WebAssembly.Module.exports(x),
                          R = WebAssembly.Module.imports(x),
                          _ = 0,
                          P = null == E ? 0 : E.length;
                        _ < P;
                        _++
                      ) {
                        var k = E[_].name
                        Vl(k) &&
                          v.addGetter(k, function () {
                            return Gl
                          })
                      }
                      for (
                        var l = function (g, x) {
                            Mu(g, v, [
                              [
                                x,
                                [x],
                                function (v, x) {
                                  y[g] = x.name
                                },
                              ],
                            ])
                          },
                          I = 0,
                          A = null == R ? 0 : R.length;
                        I < A;
                        I++
                      ) {
                        var N = R[I],
                          C = N.module,
                          O = N.name
                        l(C, O)
                      }
                      return x
                    })(v, g, y)
                  yield,
                    (function (v, g, y) {
                      v.resumeChildren()
                      var x = v.children
                      for (var E in y) {
                        var R = y[E]
                        y[E] = x[R].module.exports
                      }
                      var _ = v.module.exports,
                        P = v.getters,
                        k = new WebAssembly.Instance(g, y),
                        I = os(is.create(), k.exports)
                      v.exports = I
                      var c = function (g) {
                        var r = function () {
                          return v.exports[g]
                        }
                        me(P, g) && v.addGetter(g, r),
                          Reflect.defineProperty(_, g, {
                            configurable: !0,
                            enumerable: !0,
                            get: ze(r),
                            set: ze(function (v) {
                              K(this, g, v)
                            }),
                          })
                      }
                      for (var A in I) c(A)
                    })(v, x, y)
                })()
              else {
                var j = T.vars && !P,
                  V = Dl(x, {
                    async: O,
                    cjsVars: j,
                    runtimeName: v.runtimeName,
                    sourceMap: wl(v),
                  })
                if (R)
                  try {
                    v._ranthruCompile
                      ? (N = Reflect.apply(Pc, M, [V, g]))
                      : ((v._ranthruCompile = !0), (N = M._compile(V, g)))
                  } catch (v) {
                    ;(F = !0), (A = v)
                  }
                else {
                  var G = M._compile
                  I.runResult = (function* () {
                    return yield, (N = Reflect.apply(G, M, [V, g]))
                  })()
                }
              }
              v.running = !1
            }
            var U = I,
              W = U.runResult
            if (!F && !D && L) {
              v.running = !0
              try {
                W.next()
              } catch (v) {
                ;(F = !0), (A = v)
              }
              v.running = !1
            }
            var q = x.firstAwaitOutsideFunction,
              z = (!T.paths || P) && v.type !== Hl
            if (
              (F ||
                v.running ||
                !O ||
                !R ||
                null === q ||
                Bl(v.getters) ||
                ((F = !0),
                (A = new Tr.SyntaxError(rc, tc)),
                (A.column = q.column),
                (A.inModule = z),
                (A.line = q.line)),
              !F && !v.running)
            ) {
              v.running = !0
              try {
                N = W.next().value
              } catch (v) {
                ;(F = !0), (A = v)
              }
              v.running = !1
            }
            if (!F)
              return (
                (R || k) &&
                  Reflect.defineProperty(M, 'loaded', {
                    configurable: !0,
                    enumerable: !0,
                    get: ze(function () {
                      return !1
                    }),
                    set: ze(function (g) {
                      g &&
                        (K(this, 'loaded', g), v.updateBindings(), v.loaded())
                    }),
                  }),
                (v.state = D ? $l : Ul),
                N
              )
            if (
              ((v.state = ql), pp.state.package.default.options.debug || !zs(A))
            )
              throw (ra(A), A)
            var he = di(Wn(A, 'message')),
              fe = Wn(A, 'name')
            R &&
              ('SyntaxError' === fe ||
                ('ReferenceError' === fe && ic.test(he))) &&
              (C.cache.dirty = !0)
            var ve = hu(A)
            throw (
              (null !== ve && (g = ve.filename),
              ia(A, { filename: g, inModule: z }),
              A)
            )
          }
          function wl(v) {
            var g = v.package.options.sourceMap
            return (
              !1 !== g &&
              (g || Ql || Xl || ec || Zl.inspect) &&
              '' === Fl(v.compileData.code)
            )
          }
          var nc,
            sc,
            ac,
            oc,
            uc,
            kl = function (v, g, y, x, E) {
              var R = g.extname,
                _ = g.module,
                P = g.package,
                k = P.options,
                I = k.mode,
                A = -1,
                N = !1,
                C = !1,
                O = 1
              '.cjs' === R
                ? (A = 1)
                : '.json' === R
                ? ((A = 4), (N = !0))
                : '.mjs' === R
                ? (A = 2)
                : '.wasm' === R && ((A = 5), (C = !0)),
                3 === I ? (O = 2) : 2 === I && (O = 3)
              var T = pp.state.package.default,
                L = P === T,
                M = '.mjs' === g.extname,
                D = g.compileData
              if (null === D) {
                var F = g.cacheName
                if (((D = es.from(g)), null === D || 0 !== D.transforms)) {
                  if (N || C)
                    (g.type = N ? Jl : Yl),
                      (D = {
                        circular: 0,
                        code: null,
                        codeWithTDZ: null,
                        filename: null,
                        firstAwaitOutsideFunction: null,
                        firstReturnOutsideFunction: null,
                        mtime: -1,
                        scriptData: null,
                        sourceType: A,
                        transforms: 0,
                        yieldIndex: -1,
                      })
                  else {
                    var j = k.cjs,
                      V = j.paths && !M,
                      G = j.vars && !M,
                      U = null === D ? null : D.scriptData,
                      W = j.topLevelReturn && !M
                    ;(D = (function (v, g, y, x) {
                      var E
                      try {
                        return es.compile(y, x)
                      } catch (v) {
                        E = v
                      }
                      throw (
                        ((g.state = ql),
                        !pp.state.package.default.options.debug && zs(E)
                          ? (Os(E, v),
                            ia(E, { content: y, filename: x.filename }))
                          : ra(E),
                        E)
                      )
                    })(v, g, y, {
                      cacheName: F,
                      cachePath: P.cachePath,
                      cjsPaths: V,
                      cjsVars: G,
                      filename: x,
                      hint: A,
                      mtime: g.mtime,
                      runtimeName: g.runtimeName,
                      sourceType: O,
                      topLevelReturn: W,
                    })),
                      (D.scriptData = U),
                      2 === D.sourceType && (g.type = Kl),
                      L &&
                        g.type === Hl &&
                        8 === D.transforms &&
                        ((D.code = y), (D.transforms = 0))
                  }
                  ;(g.compileData = D), P.cache.compile.set(F, D)
                }
              }
              null !== D && null === D.code && (D.code = y)
              var q = g.type === Kl,
                z = !1
              if (!q && !C && 'function' == typeof E) {
                var K = Bh.get(g.parent),
                  he = null !== K && K.type === Kl,
                  fe = null === K ? null : K.package
                he || (!L && fe !== T) || (z = !0)
              }
              if (z) {
                g.type = Hl
                for (
                  var de = jl(pu(Error, Ds)),
                    me = 0,
                    ve = null == de ? 0 : de.length;
                  me < ve;
                  me++
                ) {
                  var ge = de[me],
                    ye = ge.getFileName()
                  if (Yi(ye) && !hn(ye)) return E(y)
                }
                return bl(g, x, E)
              }
              var xe = B.moduleState,
                be = !1
              if (!xe.parsing) {
                if (!(q || N || C) || g.state !== ql) return bl(g, x, E)
                ;(be = !0), (xe.parsing = !0), (g.state = zl)
              }
              if (q || N || C)
                try {
                  var we = bl(g, x, E)
                  if (
                    (-1 === D.circular &&
                      (D.circular = (function e(v, g, y) {
                        if (void 0 === y) y = new Set()
                        else if (y.has(g)) return !1
                        y.add(g)
                        var x = g.children
                        for (var E in x) {
                          var R = x[E]
                          if (v === R || e(v, R, y)) return !0
                        }
                        return !1
                      })(g, g)
                        ? 1
                        : 0),
                    1 === D.circular && ((g.circular = !0), q))
                  ) {
                    ;(g.runtime = null), (_.exports = is.create())
                    var Ee = D,
                      Se = Ee.codeWithTDZ
                    null !== Se && (D.code = Se), (we = bl(g, x, E))
                  }
                  if (
                    (g.updateBindings(),
                    -1 !== g._namespaceFinalized && g.finalizeNamespace(),
                    !be)
                  )
                    return we
                } finally {
                  be && (xe.parsing = !1)
                }
              return bl(g, x, E)
            },
            cc = B.inited
              ? B.module.realCrypto
              : (B.module.realCrypto = et(W('crypto'))),
            pc = B.inited
              ? B.module.safeCrypto
              : (B.module.safeCrypto = (function () {
                  var v = Se(cc)
                  return K(v, 'Hash', Se(v.Hash)), v
                })()),
            hc = pc.Hash,
            fc = B.inited
              ? B.module.utilMD5
              : (B.module.utilMD5 = (function () {
                  return function (v) {
                    var g = new hc('md5')
                    return 'string' == typeof v && g.update(v), g.digest('hex')
                  }
                })()),
            dc = B.inited
              ? B.module.utilGetCacheName
              : (B.module.utilGetCacheName = (function () {
                  var v = D.PACKAGE_VERSION
                  return function (g, y = {}) {
                    var x = y.cachePath,
                      E = y.filename,
                      R = 'd41d8cd98f00b204e9800998ecf8427e'
                    'string' == typeof x &&
                      'string' == typeof E &&
                      (R = fc(Yn(x, E)))
                    var _ = fc(
                      v + '\0' + JSON.stringify(y.packageOptions) + '\0' + g
                    )
                    return R.slice(0, 8) + _.slice(0, 8) + '.js'
                  }
                })()),
            mc = Xn(function (v) {
              return op.wrapper[0] + v + op.wrapper[1]
            }, ns.wrap),
            vc = mc,
            gc = rs.of(
              '(function (exports, require, module, __filename, __dirname) { ',
              '\n});'
            ),
            yc = gc,
            xc = Dn.ELECTRON,
            bc = D.PACKAGE_RANGE,
            wc = ['exports', 'require', 'module', '__filename', '__dirname'],
            Ec = ns.prototype,
            Sc = Xn(function (v, g) {
              Gu(v, 'content'), Gu(g, 'filename')
              var y = Bh.get(this),
                x = y.state,
                E = 0 === x
              if (
                1 !== y.package.options.mode &&
                '.mjs' !== y.extname &&
                (E || 2 === x)
              ) {
                if (void 0 === nc) {
                  var R = pp.state.package.default.options,
                    _ = os({}, R.cjs),
                    P = os({}, R)
                  ;(P.cache = !1), (P.cjs = _), (nc = new Cp('', bc, P))
                }
                var k
                y.initialize(),
                  (y.cacheName = dc(v)),
                  (y.package = nc),
                  (y.runtimeName = B.runtimeName)
                try {
                  k = kl(Sc, y, v, g)
                } finally {
                  E && (y.state = 0)
                }
                return k
              }
              if (
                void 0 === oc &&
                ((oc = xc || !B.support.vmCompileFunction), !oc)
              ) {
                var I = new He(yc, {
                  defineProperty: (v, g, y) => (
                    (oc = !0), as.defineProperty(v, g, y), !0
                  ),
                  set: (v, g, y, x) => (
                    (oc = !0), x === I && (x = v), Reflect.set(v, g, y, x)
                  ),
                })
                Reflect.defineProperty(op, 'wrap', {
                  configurable: !0,
                  enumerable: !0,
                  get: ze(function () {
                    return vc
                  }),
                  set: ze(function (v) {
                    ;(oc = !0), K(this, 'wrap', v)
                  }),
                }),
                  Reflect.defineProperty(op, 'wrapper', {
                    configurable: !0,
                    enumerable: !0,
                    get: ze(function () {
                      return I
                    }),
                    set: ze(function (v) {
                      ;(oc = !0), K(this, 'wrapper', v)
                    }),
                  })
              }
              var A,
                N = y.compileData
              if (null !== N) {
                var C = N.scriptData
                null !== C && (A = C)
              }
              var O = bi(v)
              if (pp.state.module.breakFirstLine) {
                if (void 0 === sc) {
                  var T = q.argv[1]
                  sc = T ? op._resolveFilename(T) : 'repl'
                }
                g === sc &&
                  ((pp.state.module.breakFirstLine = !1),
                  Reflect.deleteProperty(q, '_breakFirstLine'),
                  '' === Fl(O) && (O += Ml(g, O)),
                  (O = 'debugger;' + O))
              }
              var L = this.exports,
                M = B.unsafeGlobal,
                D = [L, ah(this), this, g, ct(g)]
              if (xc) {
                if ((D.push(q, M), void 0 === ac)) {
                  var F = op.wrap
                  ac =
                    'function' == typeof F &&
                    -1 !== (F('') + '').indexOf('Buffer')
                }
                ac && D.push(B.external.Buffer)
              }
              void 0 === uc && ((uc = M !== B.defaultGlobal), uc && (oc = !0))
              var j,
                V,
                G = 3 === y.type
              G || oc
                ? ((O = G ? vc(O) : op.wrap(O)),
                  (V = new go.Script(O, {
                    cachedData: A,
                    filename: g,
                    produceCachedData: !B.support.createCachedData,
                  })),
                  (j = uc
                    ? V.runInContext(B.unsafeContext, { filename: g })
                    : V.runInThisContext({ filename: g })))
                : ((V = go.compileFunction(O, wc, {
                    cachedData: A,
                    filename: g,
                    produceCachedData: !0,
                  })),
                  (j = V))
              var U = y.package.cachePath
              if ('' !== U) {
                var W = B.pendingScripts,
                  z = W.get(U)
                void 0 === z && ((z = new Map()), W.set(U, z)),
                  z.set(y.cacheName, V)
              }
              var he = B.moduleState,
                fe = 0 === he.requireDepth
              fe && ((he.statFast = new Map()), (he.statSync = new Map()))
              var de = Reflect.apply(j, L, D)
              return fe && ((he.statFast = null), (he.statSync = null)), de
            }, Ec._compile),
            Pc = Sc,
            kc = ns.prototype,
            Ic = Xn(function (v) {
              if ((Gu(v, 'filename'), this.loaded))
                throw new B.external.Error('Module already loaded: ' + this.id)
              var g = Bh.get(this),
                y = g,
                x = y.id,
                E = pp.state.module.scratchCache
              if (me(E, x)) {
                var R = Bh.get(E[x])
                g !== R &&
                  ((R.exports = this.exports),
                  (R.module = this),
                  (R.runtime = null),
                  (g = R),
                  Bh.set(this, R),
                  Reflect.deleteProperty(E, x))
              }
              ;(function (v, g) {
                v.updateFilename(g)
                var y = ml(op._extensions, v)
                '' === y && (y = '.js')
                var x = v.module
                ;(x.paths = op._nodeModulePaths(v.dirname)),
                  op._extensions[y](x, g),
                  x.loaded || ((x.loaded = !0), v.loaded())
              })(g, v)
            }, kc.load),
            Ac = Ic,
            Nc = du.ERR_INVALID_ARG_VALUE,
            Cc = ns.prototype,
            Oc = Xn(function (v) {
              if ((Gu(v, 'request'), '' === v))
                throw new Nc('request', v, 'must be a non-empty string')
              var g = B.moduleState
              g.requireDepth += 1
              try {
                var y = Un(this.filename) ? Bh.get(this) : null
                return null !== y && y._passthruRequire
                  ? ((y._passthruRequire = !1), ku(v, this).module.exports)
                  : op._load(v, this)
              } finally {
                g.requireDepth -= 1
              }
            }, Cc.require),
            Tc = Oc,
            Lc = B.inited
              ? B.module.utilSafeDefaultProperties
              : (B.module.utilSafeDefaultProperties = (function () {
                  return function (v) {
                    for (var g = arguments.length, y = 0; ++y < g; )
                      for (
                        var x = arguments[y],
                          E = ye(x),
                          R = 0,
                          _ = null == E ? 0 : E.length;
                        R < _;
                        R++
                      ) {
                        var P = E[R]
                        !me(x, P) ||
                          (me(v, P) && void 0 !== Wn(v, P)) ||
                          be(v, x, P)
                      }
                    return v
                  }
                })()),
            Mc = Xn(function (v) {
              Gu(v, 'filename')
              var g = new op(v)
              return (
                (g.filename = v), (g.paths = op._nodeModulePaths(ct(v))), ah(g)
              )
            }, ns.createRequireFromPath),
            Dc = Mc,
            Fc = Xn(function (v, g, y) {
              Gu(v, 'request'), Array.isArray(g) || (g = [])
              var x = $o(v, g, y)
              return '' !== x && x
            }, ns._findPath),
            jc = Fc,
            Vc = B.inited
              ? B.module.utilSafeGetEnv
              : (B.module.utilSafeGetEnv = (function () {
                  var v
                  return function (g) {
                    if (
                      (void 0 === v &&
                        (v = 'function' == typeof We.util.safeGetenv),
                      v)
                    )
                      try {
                        return We.util.safeGetenv(di(g))
                      } catch (v) {}
                    return qn(g)
                  }
                })()),
            Bc = B.inited
              ? B.module.moduleInternalInitGlobalPaths
              : (B.module.moduleInternalInitGlobalPaths = (function () {
                  return function () {
                    var v,
                      g,
                      y,
                      x = 'win32' === q.platform
                    x
                      ? ((v = qn('USERPROFILE')), (g = qn('HOME')))
                      : ((v = Vc('HOME')), (g = Vc('NODE_PATH'))),
                      (y =
                        v && 'string' == typeof v
                          ? [dt(v, '.node_modules'), dt(v, '.node_libraries')]
                          : [])
                    var E = dt(q.execPath, '..', x ? '' : '..')
                    if (
                      (y.push(dt(E, 'lib', 'node')), g && 'string' == typeof g)
                    ) {
                      var R = g.split(st),
                        _ = y
                      y = []
                      for (
                        var P = 0, k = null == R ? 0 : R.length;
                        P < k;
                        P++
                      ) {
                        var I = R[P]
                        'string' == typeof I && '' !== I && y.push(I)
                      }
                      y.push(..._)
                    }
                    return y
                  }
                })()),
            Gc = Xn(function () {
              var v = Bc()
              ;(pp.state.module.globalPaths = v), (op.globalPaths = rs.from(v))
            }, ns._initPaths),
            Uc = Gc,
            Wc = du.ERR_REQUIRE_ESM,
            qc = Xn(function (v, g, y = !1) {
              Gu(v, 'request')
              var x = B.moduleState.parsing,
                E = Bh.get(g)
              if (null !== E && E._passthruRequire)
                return (E._passthruRequire = !1), ku(v, g, y).module.exports
              var R = null !== E && 1 === E.package.options.mode,
                _ = op._resolveFilename(v, g, y),
                P = pp.state.module.scratchCache,
                k = op._cache
              x
                ? (k = P)
                : me(P, _) && ((k[_] = P[_]), Reflect.deleteProperty(P, _))
              var I = !1,
                A = Su(_, g, y, k, function (v) {
                  ;(I = !0),
                    (k[_] = v.module),
                    (R || '.mjs' === v.extname) && (v._passthruCompile = !0),
                    (function (v, g, y, x) {
                      var E = v.module,
                        R = !0
                      try {
                        E.load(x), (R = !1)
                      } finally {
                        ;(v._passthruCompile = !1),
                          R && Reflect.deleteProperty(g, y)
                      }
                    })(v, k, _, _)
                })
              if (!I && R && 3 === A.type) throw new Wc(_)
              return null !== E && (E._lastChild = A), A.module.exports
            }, ns._load),
            zc = qc,
            Yc = Xn(function (v) {
              if (Array.isArray(v) && 0 !== v.length) {
                var g = new op('internal/preload', null)
                try {
                  g.paths = op._nodeModulePaths(ke())
                } catch (v) {
                  if (!Ns(v) || 'ENOENT' !== v.code) throw (lc(v), v)
                }
                try {
                  for (var y = 0, x = null == v ? 0 : v.length; y < x; y++) {
                    var E = v[y]
                    g.require(E)
                  }
                } catch (v) {
                  throw (lc(v), v)
                }
              }
            }, ns._preloadModules)
          function lc(v) {
            !pp.state.package.default.options.debug && zs(v) ? ia(v) : ra(v)
          }
          var Qc = Yc,
            Xc = Xn(function (v, g, y = !1) {
              if ((Gu(v, 'request'), ln.has(v)))
                return y ? null : rs.of(v, rs.of())
              var x = nu(v, g)
              return y ? x : rs.of(v, x)
            }, ns._resolveLookupPaths),
            Zc = Xc,
            ep = Dn.ELECTRON,
            tp = du.MODULE_NOT_FOUND,
            rp = Xn(function (v, g, y = !1, x) {
              if ((Gu(v, 'request'), ep && mu.has(v)))
                return ss._resolveFilename(v, g, y, x)
              if (ln.has(v)) return v
              var E,
                R,
                _,
                P = Yi(v),
                k = Bh.get(g)
              if (
                (null !== k && k.updateFilename(),
                (E = P ? ct(v) : null === k ? '' : k.dirname),
                !ge(x))
              ) {
                ;(R = B.memoize.moduleStaticResolveFilename),
                  (_ = v + '\0' + E + '\0' + (y ? '1' : ''))
                var I = R.get(_)
                if (void 0 !== I) return I
              }
              var A,
                N = !P && Zi(v),
                C = P || N
              A =
                C && op._findPath === jc && op._resolveLookupPaths === Zc
                  ? [E]
                  : void 0 === R && Array.isArray(x.paths)
                  ? (function (v, g) {
                      for (
                        var y = new op(''),
                          x = [],
                          E = 0,
                          R = null == g ? 0 : g.length;
                        E < R;
                        E++
                      ) {
                        var _ = g[E]
                        y.paths = op._nodeModulePaths(_)
                        for (
                          var P = op._resolveLookupPaths(v, y, !0),
                            k = 0,
                            I = null == P ? 0 : P.length;
                          k < I;
                          k++
                        ) {
                          var A = P[k]
                          ;-1 === x.indexOf(A) && x.push(A)
                        }
                      }
                      return x
                    })(v, x.paths)
                  : op._resolveLookupPaths(v, g, !0)
              var O = op._findPath(v, A, y)
              if ((!1 === O && (O = ''), '' !== O))
                return void 0 !== R && R.set(_, O), O
              var T = new tp(v, g)
              if (!pp.state.package.default.options.debug) {
                var L = { filename: null, inModule: !1 }
                if (null !== k) {
                  var M = k.type
                  ;(L.filename = k.filename),
                    (L.inModule =
                      (!k.package.options.cjs.paths || '.mjs' === k.extname) &&
                      1 !== M &&
                      2 !== M)
                }
                ia(T, L)
              }
              throw T
            }, ns._resolveFilename),
            ip = rp,
            np = Dn.ELECTRON,
            sp = Xn(function (v = '', g) {
              ;(this.children = rs.of()),
                (this.exports = is.create()),
                (this.filename = null),
                (this.id = v),
                (this.loaded = !1),
                (this.parent = g),
                (this.paths = void 0),
                (this.path = ks(this))
              var y = null == g ? null : g.children
              Array.isArray(y) && rs.push(y, this)
            }, ns)
          ;(sp._cache = require.cache),
            (sp._extensions = { __proto__: null }),
            (sp._findPath = jc),
            (sp._initPaths = Uc),
            (sp._load = zc),
            (sp._nodeModulePaths = Yu),
            (sp._preloadModules = Qc),
            (sp._resolveFilename = ip),
            (sp._resolveLookupPaths = Zc),
            (sp.Module = sp),
            (sp.builtinModules = Object.freeze(rs.from(un))),
            (sp.createRequireFromPath = Dc),
            (sp.wrap = vc),
            os(sp._extensions, ns._extensions),
            Lc(sp, ns),
            z(sp._cache) || (sp._cache = { __proto__: null }),
            sp._cache !== ns._cache &&
              (sp._cache = new He(sp._cache, {
                defineProperty(v, g, y) {
                  var x = ns._cache
                  return (
                    Is(g) && z(x) && Reflect.defineProperty(x, g, y),
                    as.defineProperty(v, g, y),
                    !0
                  )
                },
                deleteProperty(v, g) {
                  var y = ns._cache
                  return (
                    Is(g) && z(y) && Reflect.deleteProperty(y, g),
                    Reflect.deleteProperty(v, g)
                  )
                },
                set(v, g, y, x) {
                  var E = ns._cache
                  return (
                    Is(g) && z(E) && Reflect.set(E, g, y),
                    Reflect.set(v, g, y, x)
                  )
                },
              })),
            (np && Array.isArray(ss.wrapper)) || (sp.wrapper = yc)
          var ap = sp.prototype
          ;(ap._compile = Pc),
            (ap.constructor = sp),
            (ap.load = Ac),
            (ap.require = Tc),
            Array.isArray(sp.globalPaths) || sp._initPaths()
          var op = sp,
            up = {
              __proto__: null,
              '.js': function (v, g) {
                v._compile(sn(Ci(g, 'utf8')), g)
              },
              '.json': function (v, g) {
                var y,
                  x = Ci(g, 'utf8')
                try {
                  y = Tl.parse(x)
                } catch (v) {
                  throw ((v.message = g + ': ' + v.message), v)
                }
                v.exports = y
              },
              '.node': function (v, g) {
                return Ie(v, jn(g))
              },
            },
            lp = up,
            cp = Dn.FLAGS
          class Rc {
            static init(v) {
              var g = B.loader,
                y = g.get(v)
              return (
                void 0 === y &&
                  ((y = {
                    module: {
                      breakFirstLine: cp.inspectBrk && !cp.eval,
                      extensions: lp,
                      globalPaths: Array.from(op.globalPaths),
                      mainModule: q.mainModule,
                      moduleCache: { __proto__: null },
                      scratchCache: { __proto__: null },
                    },
                    package: { cache: new Map(), default: null },
                  }),
                  g.set(v, y)),
                (Rc.state = y)
              )
            }
          }
          ;(Rc.state = null),
            f(Rc, 'state', function () {
              return Rc.init(JSON.stringify(Cp.createOptions()))
            }),
            Ee(Rc.prototype, null)
          var pp = Rc,
            _c = function (v, g, y) {
              var x,
                E = B.moduleState
              ;(E.parsing = !0), (E.requireDepth += 1)
              try {
                x = ku(v, g, y)
              } finally {
                ;(E.parsing = !1), (E.requireDepth -= 1)
              }
              try {
                x.updateBindings(),
                  2 === x.state && (1 !== x.type && vl(x), ku(v, g, y))
              } finally {
                E.requireDepth -= 1
              }
              return x
            },
            hp = B.inited
              ? B.module.utilIsCacheName
              : (B.module.utilIsCacheName = (function () {
                  return function (v) {
                    if ('string' != typeof v || 19 !== v.length || !vu(v))
                      return !1
                    for (var g = -1; ++g < 16; ) {
                      var y = v.charCodeAt(g)
                      if (!((y >= 97 && y <= 122) || (y >= 48 && y <= 57)))
                        return !1
                    }
                    return !0
                  }
                })()),
            fp = B.inited
              ? B.module.pathIsExtJSON
              : (B.module.pathIsExtJSON = (function () {
                  return function (v) {
                    if ('string' != typeof v) return !1
                    var g = v.length
                    return (
                      g > 5 &&
                      106 === v.charCodeAt(g - 4) &&
                      46 === v.charCodeAt(g - 5) &&
                      115 === v.charCodeAt(g - 3) &&
                      111 === v.charCodeAt(g - 2) &&
                      110 === v.charCodeAt(g - 1)
                    )
                  }
                })()),
            dp = B.inited
              ? B.module.utilIsFile
              : (B.module.utilIsFile = (function () {
                  return function (v) {
                    return 0 === Vn(v)
                  }
                })()),
            mp = B.inited
              ? B.module.fsReadJSON
              : (B.module.fsReadJSON = (function () {
                  return function (v) {
                    var g = an(v, 'utf8')
                    return null === g ? null : Kn(g)
                  }
                })()),
            vp = B.inited
              ? B.module.fsReadJSON6
              : (B.module.fsReadJSON6 = (function () {
                  return function (v) {
                    var g = an(v, 'utf8')
                    return null === g ? null : nn(g)
                  }
                })()),
            gp = B.inited
              ? B.module.fsReaddir
              : (B.module.fsReaddir = (function () {
                  return function (v) {
                    if ('string' == typeof v)
                      try {
                        return Ni(v)
                      } catch (v) {}
                    return null
                  }
                })()),
            yp = y(0),
            xp = 46,
            bp = Dn.OPTIONS,
            wp = D.PACKAGE_RANGE,
            Ep = D.PACKAGE_VERSION,
            Sp = '*',
            Rp = du.ERR_INVALID_ESM_OPTION,
            _p = du.ERR_UNKNOWN_ESM_OPTION,
            Pp = '.esmrc',
            kp = 'package.json',
            Ip = ['.mjs', '.cjs', '.js', '.json'],
            Ap = {
              await: !1,
              cache: !0,
              cjs: {
                cache: !1,
                dedefault: !1,
                esModule: !1,
                extensions: !1,
                mutableNamespace: !1,
                namedExports: !1,
                paths: !1,
                topLevelReturn: !1,
                vars: !1,
              },
              debug: !1,
              force: !1,
              mainFields: ['main'],
              mode: 1,
              sourceMap: void 0,
              wasm: !1,
            },
            Np = {
              cjs: {
                cache: !0,
                dedefault: !1,
                esModule: !0,
                extensions: !0,
                mutableNamespace: !0,
                namedExports: !0,
                paths: !0,
                topLevelReturn: !1,
                vars: !0,
              },
              mode: 2,
            }
          class Hc {
            constructor(v, g, y) {
              y = Hc.createOptions(y)
              var x = ''
              'string' == typeof y.cache
                ? (x = dt(v, y.cache))
                : !1 !== y.cache &&
                  (x = v + mt + 'node_modules' + mt + '.cache' + mt + 'esm')
              var E = B.package.dir
              if (!E.has(x)) {
                var R = { buffer: null, compile: null, meta: null },
                  _ = null,
                  P = new Map(),
                  k = null
                if ('' !== x) {
                  for (
                    var I = gp(x),
                      A = !1,
                      N = !1,
                      C = !1,
                      O = 0,
                      T = null == I ? 0 : I.length;
                    O < T;
                    O++
                  ) {
                    var L = I[O]
                    if (hp(L)) P.set(L, null)
                    else if (L.charCodeAt(0) === xp)
                      if ('.data.blob' === L) A = !0
                      else if ('.data.json' === L) C = !0
                      else if ('.dirty' === L) {
                        N = !0
                        break
                      }
                  }
                  var M = N,
                    D = null
                  if (
                    (C &&
                      !M &&
                      ((D = mp(x + mt + '.data.json')),
                      (M =
                        null === D ||
                        !me(D, 'version') ||
                        D.version !== Ep ||
                        !me(D, 'meta') ||
                        !ge(D.meta))),
                    M &&
                      ((A = !1),
                      (C = !1),
                      (P = new Map()),
                      N && Qn(x + mt + '.dirty'),
                      (function (v) {
                        for (
                          var g = dt(v, '../@babel/register'),
                            y = gp(g),
                            x = 0,
                            E = null == y ? 0 : y.length;
                          x < E;
                          x++
                        ) {
                          var R = y[x]
                          fp(R) && Qn(g + mt + R)
                        }
                      })(x)),
                    A && (_ = an(x + mt + '.data.blob')),
                    C)
                  ) {
                    var F = D.meta,
                      j = de(F)
                    k = new Map()
                    for (var V = 0, G = null == j ? 0 : j.length; V < G; V++) {
                      var U = j[V]
                      k.set(U, F[U])
                    }
                  }
                }
                null === _ && (_ = Pi.alloc(0)),
                  null === k && (k = new Map()),
                  (R.buffer = _),
                  (R.compile = P),
                  (R.meta = k),
                  E.set(x, R)
              }
              ;(this.cache = E.get(x)),
                (this.cachePath = x),
                (this.dirPath = v),
                (this.options = y),
                (this.range = g)
            }
            clone() {
              var v = this.options,
                g = v.cjs,
                y = os({ __proto__: Hc.prototype }, this),
                x = os({}, v)
              return (x.cjs = os({}, g)), (y.options = x), y
            }
            static get(v, g) {
              '.' === v && (v = ke())
              var y = pp.state.package,
                x = y.cache
              '' !== v ||
                x.has('') ||
                x.set(
                  '',
                  new Hc('', wp, { cache: !1, cjs: { topLevelReturn: !0 } })
                )
              var E = (function e(v, g) {
                var y = pp.state.package,
                  x = y.cache,
                  E = y.default,
                  R = null
                if (
                  x.has(v) &&
                  ((R = x.get(v)), null !== R || void 0 === g.forceOptions)
                )
                  return R
                if ('node_modules' === it(v)) return x.set(v, null), null
                if (
                  ((R =
                    E && E.options.force
                      ? E.clone()
                      : (function (v, g) {
                          var y,
                            x = v + mt + Pp,
                            E = dp(x) ? an(x, 'utf8') : null,
                            R = null !== E
                          R ? (E = nn(E)) : (x = $o(x, Ds, !1, Ip))
                          var _ = g.forceOptions
                          if (((g.forceOptions = void 0), '' !== x && !R))
                            if (((R = !0), fp(x))) E = vp(x)
                            else {
                              var P = pp.state.package.cache,
                                k = B.moduleState,
                                I = k.parsing
                              ;(y = new Hc(v, Sp, {
                                cache: Hc.createOptions(_).cache,
                              })),
                                (k.parsing = !1),
                                P.set(v, y)
                              try {
                                y.options = Hc.createOptions(
                                  _c(x, null).module.exports
                                )
                              } finally {
                                P.set(v, null), (k.parsing = I)
                              }
                            }
                          var A,
                            N = v + mt + kp,
                            C = dp(N) ? an(N, 'utf8') : null
                          if (void 0 === _ && null === C) {
                            if (!R) return null
                            A = e(ct(v), g)
                          }
                          var O = 0
                          null === C ||
                            R ||
                            ((C = Kn(C)),
                            (O = null === C ? -1 : 1),
                            1 === O &&
                              !R &&
                              me(C, 'esm') &&
                              ((R = !0), (E = C.esm)))
                          var T = null
                          if (void 0 !== _) T = Sp
                          else if (A) T = A.range
                          else if (
                            (0 === O &&
                              null !== C &&
                              ((C = Kn(C)), (O = null === C ? -1 : 1)),
                            1 === O &&
                              (T =
                                $c(C, 'dependencies') ||
                                $c(C, 'peerDependencies')),
                            null === T)
                          ) {
                            if (!R && !$c(C, 'devDependencies')) return null
                            T = Sp
                          }
                          return void 0 !== y
                            ? ((y.range = T), y)
                            : (void 0 === _ || R || ((R = !0), (E = _)),
                              (!0 !== E && R) || ((R = !0), (E = bp)),
                              1 !== O &&
                                null === C &&
                                (v = (function (v) {
                                  var g = B.package.root,
                                    y = g.get(v)
                                  return (
                                    void 0 === y &&
                                      ((y =
                                        (function e(v) {
                                          if (
                                            'node_modules' === it(v) ||
                                            dp(v + mt + kp)
                                          )
                                            return v
                                          var g = ct(v)
                                          return g === v
                                            ? ''
                                            : 'node_modules' === it(g)
                                            ? v
                                            : e(g)
                                        })(v) || v),
                                      g.set(v, y)),
                                    y
                                  )
                                })(v)),
                              new Hc(v, T, E))
                        })(v, g)),
                  null === R)
                ) {
                  var _ = ct(v)
                  _ !== v && (R = e(_, g))
                }
                return x.set(v, R), R
              })(v, { __proto__: null, forceOptions: g, type: void 0 })
              return null === E ? y.default : E
            }
            static from(v, g) {
              var y
              return (
                (y = 'string' == typeof v ? (ln.has(v) ? '' : ct(v)) : ks(v)),
                Hc.get(y, g)
              )
            }
            static set(v, g) {
              pp.state.package.cache.set(v, g)
            }
          }
          function $c(v, g) {
            if (me(v, g)) {
              var y = v[g]
              if (me(y, 'esm')) return Object(yp.validRange)(y.esm)
            }
            return null
          }
          function Kc(v) {
            return 'dedefault' === v || 'topLevelReturn' === v
          }
          function Jc(v) {
            return 'boolean' == typeof v || 0 === v || 1 === v
          }
          ;(Hc.createOptions = function (v) {
            var g = Hc.defaultOptions,
              y = [],
              x = {}
            if ('string' == typeof v) y.push('mode'), (x.mode = v)
            else
              for (
                var E = de(v), R = 0, _ = null == E ? 0 : E.length;
                R < _;
                R++
              ) {
                var P = E[R]
                if (me(g, P)) y.push(P), (x[P] = v[P])
                else {
                  if ('sourcemap' !== P || -1 !== E.indexOf('sourceMap'))
                    throw new _p(P)
                  x.sourceMap = v.sourcemap
                }
              }
            ;-1 === y.indexOf('cjs') && (x.cjs = Np.cjs),
              -1 === y.indexOf('mode') && (x.mode = Np.mode)
            var k = (function (v) {
              var g = Hc.defaultOptions.cjs,
                y = {}
              if (void 0 === v) return os(y, g)
              if (!ge(v)) {
                for (
                  var x = de(g), E = !!v, R = 0, _ = null == x ? 0 : x.length;
                  R < _;
                  R++
                ) {
                  var P = x[R]
                  y[P] = !Kc(P) && E
                }
                return y
              }
              for (
                var k = [], I = de(v), A = 0, N = null == I ? 0 : I.length;
                A < N;
                A++
              ) {
                var C = I[A]
                if (me(g, C)) k.push(C), (y[C] = v[C])
                else {
                  if ('interop' !== C || -1 !== I.indexOf('esModule'))
                    throw new _p('cjs[' + gi(C, 39) + ']')
                  y.esModule = v.interop
                }
              }
              for (
                var O = !0, T = 0, L = null == k ? 0 : k.length;
                T < L;
                T++
              ) {
                var M = k[T],
                  D = y[M]
                if (!Jc(D)) throw new Rp('cjs[' + gi(M, 39) + ']', D, !0)
                var F = !!D
                F && !Kc(M) && (O = !1), (y[M] = F)
              }
              var j = O ? Np.cjs : g
              return Hr(y, j)
            })(x.cjs)
            Hr(x, g), (x.cjs = k)
            var I = x.await
            if (!Jc(I)) throw new Rp('await', I)
            x.await = !!I
            var A = x.cache
            if (Jc(A)) x.cache = !!A
            else if ('string' != typeof A) throw new Rp('cache', A)
            var N = x.debug
            if (!Jc(N)) throw new Rp('debug', N)
            x.debug = !!N
            var C = x.force
            if (!Jc(C)) throw new Rp('force', A)
            x.force = !!C
            var O = g.mainFields,
              T = x.mainFields
            Array.isArray(T) || (T = [T]),
              (T =
                T === O
                  ? [O[0]]
                  : Array.from(T, function (v) {
                      if ('string' != typeof v) throw new Rp('mainFields', T)
                      return v
                    })),
              -1 === T.indexOf('main') && T.push('main'),
              (x.mainFields = T)
            var L = x.mode
            if (3 === L || 'all' === L) x.mode = 3
            else if (2 === L || 'auto' === L) x.mode = 2
            else {
              if (1 !== L && 'strict' !== L) throw new Rp('mode', L)
              x.mode = 1
            }
            var M = x.sourceMap
            if (Jc(M)) x.sourceMap = !!M
            else if (void 0 !== M) throw new Rp('sourceMap', M)
            var D = x.wasm
            if (!Jc(D)) throw new Rp('wasm', D)
            return (x.wasm = !!D), x
          }),
            (Hc.defaultOptions = Ap),
            (Hc.state = null),
            Ee(Hc.prototype, null)
          var Cp = Hc,
            Op = B.inited
              ? B.module.utilGetCacheStateHash
              : (B.module.utilGetCacheStateHash = (function () {
                  return function (v) {
                    return 'string' == typeof v ? v.slice(-11, -3) : ''
                  }
                })()),
            Tp = B.inited
              ? B.module.GenericDate
              : (B.module.GenericDate = (function () {
                  return { getTime: G(Date.prototype.getTime) }
                })()),
            Lp = B.inited
              ? B.module.fsGetStatTimestamp
              : (B.module.fsGetStatTimestamp = (function () {
                  return function (v, g) {
                    if (!ge(v)) return -1
                    var y = v[g + 'Ms']
                    return 'number' == typeof y
                      ? Math.round(y + 0.5)
                      : Tp.getTime(v[g])
                  }
                })()),
            Mp = B.inited
              ? B.module.utilIsCalledFromStrictCode
              : (B.module.utilIsCalledFromStrictCode = function () {
                  for (
                    var v = jl(pu(Error, Ds)),
                      g = 0,
                      y = null == v ? 0 : v.length;
                    g < y;
                    g++
                  ) {
                    var x = v[g],
                      E = x.getFileName()
                    if (E && !hn(E) && !x.isNative())
                      return void 0 === x.getFunction()
                  }
                  return !1
                }),
            Dp = B.inited
              ? B.module.utilIsDescriptorMatch
              : (B.module.utilIsDescriptorMatch = (function () {
                  return function (v, g) {
                    if (!ge(v)) return !ge(g)
                    for (var y in g) if (!Object.is(v[y], g[y])) return !1
                    return !0
                  }
                })()),
            Fp = B.inited
              ? B.module.utilIsEnumerable
              : (B.module.utilIsEnumerable = (function () {
                  var v = Object.prototype.propertyIsEnumerable
                  return function (g, y) {
                    return null != g && v.call(g, y)
                  }
                })()),
            jp = B.inited
              ? B.module.shimPuppeteerExecutionContextPrototypeEvaluateHandle
              : (B.module.shimPuppeteerExecutionContextPrototypeEvaluateHandle =
                  (function () {
                    var v = {
                      enable(v) {
                        var g =
                          B.memoize
                            .shimPuppeteerExecutionContextPrototypeEvaluateHandle
                        if (
                          (function (v, g) {
                            var y = z(v) ? v.ExecutionContext : void 0,
                              x = 'function' == typeof y ? y.prototype : void 0,
                              E = z(x) ? x.evaluateHandle : void 0
                            if ('function' != typeof E) return !0
                            var R = g.get(x)
                            return void 0 !== R
                              ? R
                              : ((R = js(E)), g.set(x, R), R)
                          })(v, g)
                        )
                          return v
                        var y = v.ExecutionContext.prototype,
                          x = ba(y.evaluateHandle, function (v, g) {
                            var y = g[0]
                            if ('function' == typeof y) {
                              var x = new He(y, {
                                  get: (v, g, y) =>
                                    'toString' !== g || me(v, 'toString')
                                      ? (y === x && (y = v),
                                        Reflect.get(v, g, y))
                                      : E,
                                }),
                                E = new He(y.toString, {
                                  apply: Ls(function (v, g, E) {
                                    g === x && (g = y)
                                    var R = Reflect.apply(v, g, E)
                                    return 'string' == typeof R ? ea(R) : R
                                  }),
                                })
                              g[0] = x
                            }
                            return Reflect.apply(v, this, g)
                          })
                        return (
                          Reflect.defineProperty(y, 'evaluateHandle', {
                            configurable: !0,
                            value: x,
                            writable: !0,
                          }) && g.set(y, !0),
                          v
                        )
                      },
                    }
                    return v
                  })()),
            Vp = 69,
            Gp = bt,
            Zp = wt,
            eh = 1,
            th = 2,
            rh = {},
            ih = 1,
            nh = 0,
            sh = -1,
            oh = 1,
            uh = 0,
            lh = 1,
            ch = 2,
            ph = 3,
            hh = 4,
            fh = 0,
            dh = 4,
            mh = 3,
            vh = 1,
            gh = 3,
            yh = 4,
            xh = 2,
            bh = 5,
            wh = 1,
            Eh = 3,
            Sh = 2,
            kh = du.ERR_EXPORT_STAR_CONFLICT,
            Ah = du.ERR_NS_ASSIGNMENT,
            Ch = du.ERR_NS_DEFINITION,
            Oh = du.ERR_NS_DELETION,
            Th = du.ERR_NS_EXTENSION,
            Lh = du.ERR_NS_REDEFINITION,
            Mh = du.ERR_UNDEFINED_IDENTIFIER,
            Dh = mt + 'lib' + mt + 'ExecutionContext.js',
            Fh = mt + 'puppeteer' + mt,
            jh = -19,
            Vh = { value: !0 }
          class Bp {
            constructor(v) {
              this.initialize(v)
            }
            static get(v) {
              if (!ge(v)) return null
              var g = B.entry.cache,
                y = g.get(v)
              if (void 0 === y) y = new Bp(v)
              else if (y.type === vh && y._loaded === ih) {
                var x = B.bridged,
                  E = y.module.exports,
                  R = x.get(E)
                void 0 !== R && ((y = R), x.delete(E))
              }
              return void 0 !== y && Bp.set(v, y), y
            }
            static has(v) {
              return B.entry.cache.has(v)
            }
            static set(v, g) {
              ge(v) && B.entry.cache.set(v, g)
            }
            addGetter(v, g) {
              me(g, 'id') || (g.id = v),
                me(g, 'owner') || (g.owner = this),
                me(g, 'type') || (g.type = eh)
              var y = this.type
              if (y !== vh && y !== xh && 'default' === v) {
                var x = Qp(g)
                'function' == typeof x &&
                  x.name === this.runtimeName + 'anonymous' &&
                  Reflect.defineProperty(x, 'name', {
                    configurable: !0,
                    value: 'default',
                  })
              }
              return (this.getters[v] = g), this
            }
            addGetters(v) {
              for (var g = 0, y = null == v ? 0 : v.length; g < y; g++) {
                var x = v[g],
                  E = x[0],
                  R = x[1]
                this.addGetter(E, R)
              }
              return this
            }
            addGetterFrom(v, g, y = g) {
              var x = this
              if ('*' === g)
                return this.addGetter(y, function () {
                  return v.getExportByName('*', x)
                })
              var E = v.getters,
                R = E[g]
              return (
                v.type !== gh &&
                  '.mjs' === this.extname &&
                  ((R = function () {
                    return v.partialNamespace[g]
                  }),
                  (R.owner = v)),
                void 0 === R &&
                  ((R = function () {
                    return v.getters[g]()
                  }),
                  (R.deferred = !0),
                  (R.id = g),
                  (R.owner = v)),
                this.addGetter(y, R)
              )
            }
            addSetter(v, g, y, x) {
              ;(y.last = rh),
                (y.localNames = g),
                (y.owner = x),
                me(y, 'exportedName') || (y.exportedName = null),
                me(y, 'type') || (y.type = lh)
              var E = this.setters
              me(E, v) || (E[v] = []), E[v].push(y)
              for (
                var R = x.importedBindings, _ = 0, P = null == g ? 0 : g.length;
                _ < P;
                _++
              ) {
                var k = g[_]
                R.has(k) || R.set(k, !1)
              }
              return this
            }
            addSetters(v, g) {
              for (var y = 0, x = null == v ? 0 : v.length; y < x; y++) {
                var E = v[y],
                  R = E[0],
                  _ = E[1],
                  P = E[2]
                this.addSetter(R, _, P, g)
              }
              return this
            }
            finalizeNamespace() {
              if (this._namespaceFinalized === oh) return this
              this._namespaceFinalized = oh
              for (
                var v = this.getters,
                  g = de(v).sort(),
                  y = 0,
                  x = null == g ? 0 : g.length;
                y < x;
                y++
              ) {
                var E = g[y]
                v[E].type !== th &&
                  ((this._completeMutableNamespace[E] = rh),
                  (this._completeNamespace[E] = rh))
              }
              Object.seal(this._completeNamespace)
              var R = this.type
              if (R === gh || R === bh) return this
              if (this.builtin) {
                for (
                  var _ = ['default'],
                    P = de(this.exports),
                    k = 0,
                    I = null == P ? 0 : P.length;
                  k < I;
                  k++
                ) {
                  var A = P[k]
                  Vl(A) && _.push(A)
                }
                _.sort(),
                  Reflect.deleteProperty(
                    this._partialMutableNamespace,
                    'default'
                  ),
                  Reflect.deleteProperty(this._partialNamespace, 'default')
                for (var N = 0, C = null == _ ? 0 : _.length; N < C; N++) {
                  var O = _[N]
                  ;(this._partialMutableNamespace[O] = rh),
                    (this._partialNamespace[O] = rh)
                }
              }
              return Object.seal(this._partialNamespace), this
            }
            getExportByName(v, g) {
              var y = this.type
              return y === gh || y === bh
                ? (function (v, g, y) {
                    if ('*' !== g) {
                      var x = v.getters[g]
                      return void 0 === x ? Gp : Qp(x)
                    }
                    var E =
                        y.package.options.cjs.mutableNamespace &&
                        '.mjs' !== y.extname,
                      R = !E || '.mjs' === v.extname
                    return R ? v.completeNamespace : v.completeMutableNamespace
                  })(this, v, g)
                : (function (v, g, y) {
                    var x = '.mjs' === y.extname,
                      E = v.type
                    if ('*' !== g) {
                      if (v._loaded !== ih) return Gp
                      if (E === xh && x && 'default' === g) return v.exports
                      var R = v.getters[g]
                      return void 0 === R ? Gp : R()
                    }
                    var _ = y.package.options.cjs,
                      P = _.namedExports && !x,
                      k = _.mutableNamespace && !x,
                      I = !k || '.mjs' === v.extname,
                      A = !P && E !== gh
                    return I
                      ? A
                        ? v.partialNamespace
                        : v.completeNamespace
                      : A
                      ? v.partialMutableNamespace
                      : v.completeMutableNamespace
                  })(this, v, g)
            }
            initialize(v = this.module) {
              var g = this
              ;(this._changed = !1),
                (this._completeMutableNamespace = ga()),
                (this._completeNamespace = ga()),
                (this._finalize = null),
                (this._lastChild = null),
                (this._loaded = nh),
                (this._namespaceFinalized = uh),
                (this._partialMutableNamespace = ga({ default: rh })),
                (this._partialNamespace = ga({ default: rh })),
                (this._passthruCompile = !1),
                (this._passthruRequire = !1),
                (this._ranthruCompile = !1),
                (this._validation = new Map([['*', !0]])),
                (this.basename = null),
                (this.builtin = !1),
                (this.children = { __proto__: null }),
                (this.circular = !1),
                (this.dirname = null),
                (this.exports = v.exports),
                (this.extname = null),
                (this.filename = null),
                (this.getters = { __proto__: null }),
                (this.id = v.id),
                (this.importedBindings = new Map()),
                (this.module = v),
                (this.name = null),
                (this.parent = v.parent),
                (this.running = !1),
                (this.runtime = null),
                (this.setters = { __proto__: null }),
                (this.setters['*'] = []),
                (this.state = fh),
                (this.type = vh),
                f(this, 'cacheName', function () {
                  var v = g.package
                  return dc(g.mtime, {
                    cachePath: v.cachePath,
                    filename: g.filename,
                    packageOptions: v.options,
                  })
                }),
                f(this, 'compileData', function () {
                  var v = es.from(g)
                  if (null !== v && 0 !== v.transforms) {
                    var y = an(g.package.cachePath + mt + g.cacheName, 'utf8')
                    null !== y && (v.code = y)
                  }
                  return v
                }),
                f(this, 'completeMutableNamespace', function () {
                  return $p(g, g._completeMutableNamespace)
                }),
                f(this, 'completeNamespace', function () {
                  return Hp(g, g._completeNamespace)
                }),
                f(this, 'mtime', function () {
                  var v = g.filename
                  if (en(v)) {
                    var y = Fn(v)
                    if (null !== y) return Lp(y, 'mtime')
                  }
                  return -1
                }),
                f(this, 'package', function () {
                  return Cp.from(g.module)
                }),
                f(this, 'partialMutableNamespace', function () {
                  return $p(g, g._partialMutableNamespace)
                }),
                f(this, 'partialNamespace', function () {
                  return Hp(g, g._partialNamespace)
                }),
                f(this, 'runtimeName', function () {
                  return a('_' + Op(g.cacheName).slice(0, 3))
                }),
                this.updateFilename(!0)
            }
            loaded() {
              var v = this
              if (this._loaded !== nh) return this._loaded
              var g = this.module
              if (!g.loaded) return (this._loaded = nh)
              this._loaded = sh
              var y = this.children
              for (var x in y)
                if (!y[x].module.loaded) return (this._loaded = nh)
              var E = this.package.options.cjs,
                R = g.exports
              if (this.type === vh) {
                E.esModule && null != R && R.__esModule && (this.type = xh)
                for (
                  var _ = Kp(this, R),
                    o = function (g) {
                      v.addGetter(g, function () {
                        return v.exports[g]
                      })
                    },
                    P = 0,
                    k = null == _ ? 0 : _.length;
                  P < k;
                  P++
                ) {
                  var I = _[P]
                  o(I)
                }
                if (this.type === vh) {
                  var A = this.filename
                  'string' == typeof A &&
                    A.charCodeAt(A.length + jh) === Vp &&
                    A.endsWith(Dh) &&
                    -1 !== A.indexOf(Fh) &&
                    jp.enable(R),
                    this.addGetter('default', function () {
                      return v.exports
                    }),
                    (R = Xo(this))
                }
                this.exports = R
              } else if (this.type === yh)
                (R = Xo(this)), (g.exports = R), (this.exports = R)
              else if ('.mjs' === this.extname) g.exports = zp(this, R)
              else {
                var N = Kp(this)
                E.dedefault && 1 === N.length && 'default' === N[0]
                  ? (g.exports = R.default)
                  : (E.esModule &&
                      !me(this.getters, '__esModule') &&
                      Reflect.defineProperty(R, '__esModule', Vh),
                    (g.exports = E.mutableNamespace
                      ? (function (v, g) {
                          var y = Jp(),
                            x = new He(g, y)
                          for (var E in (Up(y, v, x),
                          qp(y, v, x),
                          Reflect.deleteProperty(y, 'has'),
                          y))
                            ze(y[E])
                          return x
                        })(this, R)
                      : zp(this, R)))
              }
              return this.finalizeNamespace(), (this._loaded = ih)
            }
            resumeChildren() {
              var v = this.children
              for (var g in v) {
                var y = v[g]
                if (!y.running) {
                  var x = y.runtime,
                    E = null === x ? void 0 : x.runResult,
                    R = !0
                  try {
                    void 0 !== E &&
                      y.state < mh &&
                      ((y.state = mh),
                      (y.running = !0),
                      E.next(),
                      (y.module.loaded = !0),
                      (y.running = !1)),
                      'function' == typeof y._finalize
                        ? y._finalize()
                        : (y.loaded(), y.updateBindings(null, Eh), gl(y, this)),
                      (R = !1)
                  } finally {
                    y.state = R ? fh : dh
                  }
                }
              }
            }
            updateBindings(v, g = wh, y) {
              var x,
                E = this.circular || g === Sh || g === Eh
              if (E && void 0 !== y && y.has(this)) return this
              if (
                ('string' == typeof v && (v = [v]),
                (this._changed = !1),
                (function (v, g) {
                  if (v.type === gh)
                    if (Array.isArray(g))
                      for (
                        var y = 0, x = null == g ? 0 : g.length;
                        y < x;
                        y++
                      ) {
                        var E = g[y]
                        Yp(v, E)
                      }
                    else for (var R in v.getters) Yp(v, R)
                })(this, v),
                (function (v, g, y, x) {
                  if (Array.isArray(g))
                    for (var E = 0, R = null == g ? 0 : g.length; E < R; E++) {
                      var _ = g[E]
                      Xp(v, _, y, x)
                    }
                  else for (var P in v.setters) Xp(v, P, y, x)
                })(
                  this,
                  v,
                  function (v) {
                    var g = v.owner,
                      y = g.importedBindings
                    if (v.last !== Gp)
                      for (
                        var R = 0,
                          _ = v.localNames,
                          P = null == _ ? 0 : _.length;
                        R < P;
                        R++
                      ) {
                        var k = _[R]
                        y.set(k, !0)
                      }
                    E && (void 0 === x && (x = new Set()), x.add(g))
                  },
                  g
                ),
                (this._changed = !1),
                void 0 === x)
              )
                return this
              var R = g
              return (
                R !== wh && (R = Sh),
                void 0 === y && (y = new Set()),
                y.add(this),
                x.forEach(function (v) {
                  v.loaded(), v.updateBindings(null, R, y)
                }),
                this
              )
            }
            updateFilename(v, g) {
              var y = this.module
              if (
                ('boolean' == typeof v && ((g = v), (v = void 0)),
                void 0 !== v && (y.filename = v),
                !g && this.filename === y.filename)
              )
                return this
              var x = ks(y),
                E = y.filename
              return (
                (this.dirname = x),
                (this.filename = E),
                (this.name = fu(y)),
                '' === x
                  ? ((this.basename = E), (this.extname = ''))
                  : 'string' != typeof E
                  ? ((this.basename = ''), (this.extname = ''))
                  : ((this.basename =
                      '.' === x ? it(E) : E.slice(x.length + 1)),
                    (this.extname = pt(E))),
                this
              )
            }
          }
          function Up(v, g, y) {
            ;(v.get = function (x, E, R) {
              var _,
                P = g.getters,
                k = P[E],
                I = void 0 !== k,
                A = !1
              if ('string' == typeof E && me(x, E) && Fp(x, E)) {
                var N = g._namespaceFinalized !== oh
                if ((!N && I && ((A = !0), (_ = k()), (N = _ === Gp)), N))
                  throw new Mh(E, v.get)
              }
              return g.type === xh &&
                'default' === E &&
                x === g._partialNamespace
                ? g.exports
                : I
                ? A
                  ? _
                  : k()
                : (R === y && (R = x), Reflect.get(x, E, R))
            }),
              (v.getOwnPropertyDescriptor = function (g, y) {
                var x = Reflect.getOwnPropertyDescriptor(g, y)
                return void 0 !== x && (x.value = v.get(g, y)), x
              }),
              (v.has = function (v, g) {
                return g === B.symbol.namespace || Reflect.has(v, g)
              }),
              (v.preventExtensions = function (v) {
                return (
                  g._namespaceFinalized === oh && Reflect.preventExtensions(v)
                )
              })
          }
          function Wp(v, g) {
            ;(v.defineProperty = function (v, y, x) {
              if (
                g._namespaceFinalized === oh &&
                me(v, y) &&
                Dp(Reflect.getOwnPropertyDescriptor(v, y), x)
              )
                return Reflect.defineProperty(v, y, x)
              if (!Mp()) return !1
              throw me(v, y) ? new Lh(g.module, y) : new Ch(g.module, y)
            }),
              (v.deleteProperty = function (v, y) {
                if (Reflect.deleteProperty(v, y)) return !0
                if (!Mp()) return !1
                throw new Oh(g.module, y)
              }),
              (v.set = function (v, y) {
                if (!Mp()) return !1
                if (me(v, y)) throw new Ah(g.module, y)
                throw new Th(g.module, y)
              })
          }
          function qp(v, g, y) {
            ;(v.defineProperty = function (v, y, x) {
              return (
                g._namespaceFinalized === oh &&
                (as.defineProperty(g.exports, y, x),
                me(v, y) &&
                  (g.addGetter(y, function () {
                    return g.exports[y]
                  }),
                  g.updateBindings(y)),
                Reflect.isExtensible(v) || Reflect.defineProperty(v, y, x))
              )
            }),
              (v.deleteProperty = function (v, y) {
                return (
                  !!Reflect.deleteProperty(g.exports, y) &&
                  (me(v, y) &&
                    (g.addGetter(y, function () {
                      return g.exports[y]
                    }),
                    g.updateBindings(y)),
                  Reflect.isExtensible(v))
                )
              })
            var x = v.get
            'function' == typeof x &&
              (v.get = function (v, y, E) {
                var R = g.exports,
                  _ = x(v, y, E)
                if (me(R, y)) {
                  var P = Reflect.get(R, y, E),
                    k = g.type
                  if (
                    P !== _ &&
                    ((k !== vh && k !== yh) || 'default' !== y) &&
                    aa(v, y)
                  )
                    return P
                }
                return _
              }),
              (v.getOwnPropertyDescriptor = function (y, x) {
                var E = Reflect.getOwnPropertyDescriptor(y, x)
                if (void 0 === E ? !Reflect.isExtensible(y) : !sa(E)) return E
                var R = g.exports
                if (me(R, x)) {
                  var _,
                    P = Reflect.getOwnPropertyDescriptor(R, x)
                  if (me(P, 'value')) _ = P.value
                  else if (
                    'function' == typeof P.get &&
                    ((_ = Qp(P.get)), _ === Gp)
                  )
                    return E
                  if (void 0 === E)
                    return {
                      configurable: !0,
                      enumerable: P.enumerable,
                      value: _,
                      writable: !0 === P.writable || 'function' == typeof P.set,
                    }
                  E.value = _
                } else void 0 !== E && (E.value = v.get(y, x))
                return E
              }),
              (v.set = function (v, x, E, R) {
                if (!Qo(v, x)) return !1
                var _ = g.exports
                return (
                  R === y && (R = _),
                  !!Reflect.set(_, x, E, R) &&
                    (me(v, x) &&
                      (g.addGetter(x, function () {
                        return g.exports[x]
                      }),
                      g.updateBindings(x)),
                    !0)
                )
              })
          }
          function zp(v, g) {
            var y = Jp(),
              x = new He(g, y)
            for (var E in (Up(y, v, x),
            Wp(y, v),
            Reflect.deleteProperty(y, 'has'),
            y))
              ze(y[E])
            return Object.seal(g), x
          }
          function Hp(v, g) {
            var y = Jp(),
              x = new He(g, y)
            for (var E in (Up(y, v, x), Wp(y, v), y)) ze(y[E])
            return x
          }
          function $p(v, g) {
            var y = Jp(),
              x = new He(g, y)
            for (var E in (Up(y, v, x), qp(y, v, x), y)) ze(y[E])
            return x
          }
          function Kp(v, g = v.exports) {
            var y,
              x = v.type
            if (x === vh || x === xh) {
              var E = 'function' == typeof g,
                R = va(g),
                _ = qe(g)
              y = []
              for (var P = 0, k = null == R ? 0 : R.length; P < k; P++) {
                var I = R[P]
                ;(!Fp(g, I) &&
                  ('__esModule' === I ||
                    (E && 'prototype' === I) ||
                    (me(_, I) && !Fp(_, I)))) ||
                  y.push(I)
              }
            } else y = de(g)
            for (
              var A = [], N = 0, C = y, O = null == C ? 0 : C.length;
              N < O;
              N++
            ) {
              var T = C[N]
              Vl(T) && A.push(T)
            }
            return A
          }
          function Jp() {
            return {
              defineProperty: null,
              deleteProperty: null,
              get: null,
              getOwnPropertyDescriptor: null,
              has: null,
              set: null,
            }
          }
          function Yp(v, g) {
            var y = v.getters[g]
            if (void 0 !== y && y.type !== th) {
              var x = v.exports,
                E = Qp(y)
              ;(me(x, g) && Object.is(x[g], E)) ||
                ((v._changed = !0), (x[g] = E))
            }
          }
          function Xp(v, g, y, x) {
            var E = v.setters[g]
            if (void 0 !== E)
              for (
                var R = v._loaded === ih, _ = v._changed, P = E.length;
                P--;

              ) {
                var k = E[P],
                  I = v.getExportByName(g, k.owner)
                if (I === Zp) throw (E.splice(P, 1), new kh(v.module, g))
                var A = k.type,
                  N = A !== ch && !Object.is(k.last, I),
                  C = R && A === ch,
                  O = A === ph,
                  T = _ && A === hh,
                  L = x === Eh
                if (N || C || O || T || L) {
                  k.last = I
                  var M = I === Gp ? void 0 : I
                  k(M, v) && E.splice(P, 1), (!N && O) || y(k)
                }
              }
          }
          function Qp(v) {
            try {
              return v()
            } catch (v) {}
            return Gp
          }
          Ee(Bp.prototype, null)
          var Bh = Bp,
            Gh = B.inited
              ? B.module.utilIsInstalled
              : (B.module.utilIsInstalled = (function () {
                  var v = Dn.WIN32,
                    g = v ? /[\\\/]node_modules[\\\/]/ : /\/node_modules\//
                  return function ({ filename: v }) {
                    return 'string' == typeof v && g.test(v)
                  }
                })()),
            Uh = B.inited
              ? B.module.utilIsOwnModule
              : (B.module.utilIsOwnModule = (function () {
                  var v = D.PACKAGE_DIRNAME
                  return function ({ filename: g }) {
                    return 'string' == typeof g && g.startsWith(v)
                  }
                })()),
            Wh = W.resolve,
            qh = Wh && Wh.paths,
            zh = B.symbol,
            Hh = new Map([
              [zh.entry, Bh],
              [zh.realGetProxyDetails, Xe],
              [zh.realRequire, W],
              [zh.runtime, Ol],
              [zh.shared, B],
            ]),
            ah = function (v, g, y) {
              var x = Uh(v),
                n = function (y) {
                  var E = x
                    ? (function (v) {
                        if ('symbol' == typeof v) return Hh.get(v)
                      })(y)
                    : void 0
                  return void 0 === E ? g.call(v, y) : E
                }
              function s(g, x) {
                return Gu(g, 'request'), y.call(v, g, x)
              }
              function a(g) {
                return Gu(g, 'request'), op._resolveLookupPaths(g, v, !0)
              }
              return (
                'function' != typeof g &&
                  (g = function (g) {
                    return v.require(g)
                  }),
                'function' != typeof y &&
                  (y = function (g, y) {
                    return op._resolveFilename(g, v, !1, y)
                  }),
                (n.cache = op._cache),
                (n.extensions = op._extensions),
                (n.main = q.mainModule),
                (n.resolve = s),
                (s.paths = a),
                Gh(v) ||
                  ((s.paths = Xn(a, qh)),
                  (n.resolve = Xn(s, Wh)),
                  (n = Xn(n, W))),
                n
              )
            }
          B.inited ||
            (B.module.utilPrepareContext = (function () {
              var v = [
                  'Array',
                  'ArrayBuffer',
                  'Atomics',
                  'BigInt',
                  'BigInt64Array',
                  'BigUint64Array',
                  'Boolean',
                  'DataView',
                  'Date',
                  'Error',
                  'EvalError',
                  'Float32Array',
                  'Float64Array',
                  'Function',
                  'Int16Array',
                  'Int32Array',
                  'Int8Array',
                  'Map',
                  'Number',
                  'Object',
                  'Promise',
                  'Proxy',
                  'RangeError',
                  'ReferenceError',
                  'Reflect',
                  'RegExp',
                  'Set',
                  'SharedArrayBuffer',
                  'String',
                  'Symbol',
                  'SyntaxError',
                  'TypeError',
                  'URIError',
                  'Uint16Array',
                  'Uint32Array',
                  'Uint8Array',
                  'Uint8ClampedArray',
                  'WeakMap',
                  'WeakSet',
                ],
                g = [
                  'Buffer',
                  'URL',
                  'URLSearchParams',
                  'clearImmediate',
                  'clearInterval',
                  'clearTimeout',
                  'console',
                  'global',
                  'process',
                  'setImmediate',
                  'setInterval',
                  'setTimeout',
                ]
              function r(v, g) {
                var y = "'" + v + "' is deprecated, use 'global'"
                return {
                  configurable: !0,
                  get: Gi(
                    function () {
                      return g
                    },
                    y,
                    'DEP0016'
                  ),
                  set: Gi(
                    function (g) {
                      Reflect.defineProperty(this, v, {
                        configurable: !0,
                        value: g,
                        writable: !0,
                      })
                    },
                    y,
                    'DEP0016'
                  ),
                }
              }
              return function (y) {
                var x = B.defaultGlobal
                if (y === x) return y
                for (
                  var E = ye(x), R = 0, _ = null == E ? 0 : E.length;
                  R < _;
                  R++
                ) {
                  var P = E[R],
                    k = void 0
                  'global' === P
                    ? (k = {
                        configurable: !0,
                        enumerable: !0,
                        value: y,
                        writable: !0,
                      })
                    : 'GLOBAL' === P || 'root' === P
                    ? (k = r(P, y))
                    : me(y, P) || (k = Reflect.getOwnPropertyDescriptor(x, P)),
                    void 0 !== k && Reflect.defineProperty(y, P, k)
                }
                for (var I = 0, A = null == g ? 0 : g.length; I < A; I++) {
                  var N = g[I],
                    C = Reflect.getOwnPropertyDescriptor(y, N)
                  void 0 !== C &&
                    Reflect.deleteProperty(y, N) &&
                    Reflect.defineProperty(y, N, C)
                }
                for (
                  var O = new Map(), T = 0, L = null == v ? 0 : v.length;
                  T < L;
                  T++
                ) {
                  var M = v[T]
                  me(y, M) &&
                    (O.set(M, Reflect.getOwnPropertyDescriptor(y, M)),
                    Reflect.deleteProperty(y, M))
                }
                if (0 === O.size) return y
                var D = new xo(
                  '({' +
                    (function () {
                      var v,
                        g,
                        y,
                        x = O.keys(),
                        E = ''
                      do {
                        ;(v = x.next()),
                          (E +=
                            ((g = v.value),
                            (y = void 0),
                            (y = g + ':'),
                            (y +=
                              'Array' === g
                                ? '[].constructor'
                                : 'BigInt' === g
                                ? '1n.constructor'
                                : 'Boolean' === g
                                ? 'true.constructor'
                                : 'Function' === g
                                ? '(function () {}).constructor'
                                : 'Number' === g
                                ? '1..constructor'
                                : 'Object' === g
                                ? '({}).constructor'
                                : 'RegExp' === g
                                ? '/./.constructor'
                                : 'String' === g
                                ? '"".constructor'
                                : 'this.' + g),
                            y + (v.done ? '' : ',')))
                      } while (!v.done)
                      return E
                    })() +
                    '})'
                ).runInContext(y)
                return (
                  O.forEach(function (v, g) {
                    Reflect.defineProperty(y, g, v)
                    var x = y[g],
                      E = D[g]
                    if (
                      x !== E &&
                      z(x) &&
                      z(E) &&
                      ('Error' === g
                        ? (E.prepareStackTrace = function (...v) {
                            return Reflect.apply(x.prepareStackTrace, x, v)
                          })
                        : 'Object' === g &&
                          Reflect.defineProperty(x, Symbol.hasInstance, {
                            configurable: !0,
                            value: function (v) {
                              return this === x
                                ? v instanceof E || Ao(v, x)
                                : Ao(v, this)
                            },
                          }),
                      'function' == typeof E &&
                        (Ee(E, qe(x)), me(E, 'prototype')))
                    ) {
                      var R = E.prototype
                      if (z(R)) {
                        var _ = x.prototype
                        Ee(R, _),
                          me(_, 'constructor') &&
                            Reflect.defineProperty(
                              R,
                              'constructor',
                              Reflect.getOwnPropertyDescriptor(_, 'constructor')
                            )
                      }
                    }
                  }),
                  y
                )
              }
            })())
          var Jh = B.inited
              ? B.module.utilSatisfies
              : (B.module.utilSatisfies = (function () {
                  var v = { includePrerelease: !0 }
                  return function (g, y) {
                    if ('string' != typeof g || 'string' != typeof y) return !1
                    var x = g + '\0' + y,
                      E = B.memoize.utilSatisfies,
                      R = E.get(x)
                    return (
                      void 0 === R &&
                        ((R = Object(yp.satisfies)(g, y, v)), E.set(x, R)),
                      R
                    )
                  }
                })()),
            Qh = B.inited
              ? B.module.envHasLoaderValue
              : (B.module.envHasLoaderValue = (function () {
                  return function e(v) {
                    if ('string' == typeof v) {
                      if (en(v)) {
                        var g = v
                        if (('' === pt(g) && (g += mt + 'index.js'), hn(yu(g))))
                          return !0
                      } else if (
                        45 !== v.charCodeAt(0) &&
                        hn(
                          (function (v, g, y) {
                            var x,
                              E = B.entry,
                              R = E.cache,
                              _ = pp.state.package,
                              P = _.cache
                            ;(E.cache = new WeakMap()), (_.cache = new Map())
                            var k = !0
                            try {
                              ;(x = Eu(v, g, !1)), (k = !1)
                            } catch (v) {}
                            return (E.cache = R), (_.cache = P), k ? '' : x
                          })(v, xn)
                        )
                      )
                        return !0
                    } else if (z(v))
                      for (
                        var y = de(v), x = 0, E = null == y ? 0 : y.length;
                        x < E;
                        x++
                      ) {
                        var R = y[x]
                        if (e(v[R])) return !0
                      }
                    return !1
                  }
                })()),
            Xh = B.inited
              ? B.module.envHasLoaderArg
              : (B.module.envHasLoaderArg = (function () {
                  return function (v) {
                    return Hi(v, function (v) {
                      return 123 === v.charCodeAt(0) ? Qh(Kn(v)) : Qh(v)
                    })
                  }
                })()),
            Zh = B.inited
              ? B.module.envIsSideloaded
              : (B.module.envIsSideloaded = (function () {
                  return function () {
                    if (In() || Nn()) return !0
                    var v = _e.slice(2)
                    if (0 === v.length) return !1
                    var g = yu(_e[1]),
                      y = g.lastIndexOf(mt + 'node_modules' + mt)
                    if (-1 === y || !Xh(v)) return !1
                    var x = B.entry,
                      E = x.cache,
                      R = pp.state.package,
                      _ = R.cache
                    ;(x.cache = new WeakMap()), (R.cache = new Map())
                    var P = !1
                    return (
                      (null === Cp.get(ke()) &&
                        null === Cp.get(g.slice(0, y + 1))) ||
                        (P = !0),
                      (x.cache = E),
                      (R.cache = _),
                      P
                    )
                  }
                })()),
            ef = B.inited
              ? B.module.utilMaxSatisfying
              : (B.module.utilMaxSatisfying = (function () {
                  return function (v, g) {
                    if (!Array.isArray(v) || 'string' != typeof g) return null
                    var y = (1 === v.length ? v[0] : rs.join(v)) + '\0' + g,
                      x = B.memoize.utilMaxSatisfying,
                      E = x.get(y)
                    return (
                      void 0 === E &&
                        ((E = Object(yp.maxSatisfying)(v, g)), x.set(y, E)),
                      E
                    )
                  }
                })()),
            tf = B.inited
              ? B.module.utilSetSilent
              : (B.module.utilSetSilent = (function () {
                  return function (v, g, y) {
                    he(function () {
                      try {
                        v[g] = y
                      } catch (v) {}
                    })
                  }
                })()),
            rf = B.inited
              ? B.module.Wrapper
              : (B.module.Wrapper = (function () {
                  var v = D.PACKAGE_RANGE,
                    g = {
                      find(v, g, y) {
                        var x = r(v, g)
                        if (null !== x) {
                          var E = ef(x.versions, y)
                          if (null !== E) {
                            var R = x.wrappers.get(E)
                            if (void 0 !== R) return R
                          }
                        }
                        return null
                      },
                      manage(v, y, x) {
                        var E = g.unwrap(v, y),
                          R = ba(E, function (v, g) {
                            var y = new.target
                            return void 0 === y
                              ? Reflect.apply(x, this, [R, v, g])
                              : Reflect.construct(x, [R, v, g], y)
                          })
                        Reflect.defineProperty(R, B.symbol.wrapper, {
                          configurable: !0,
                          value: E,
                        }),
                          tf(v, y, R)
                      },
                      unwrap(v, g) {
                        var y = he(function () {
                            return v[g]
                          }),
                          x = B.symbol.wrapper
                        return me(y, x) ? y[x] : y
                      },
                      wrap(y, x, E) {
                        var R = (function (v, y) {
                          var x = r(v, y)
                          return null === x
                            ? (function (v, y) {
                                var x = (function (v) {
                                    var g = i(v)
                                    return null === g
                                      ? (function (v) {
                                          var g = new Map()
                                          return (
                                            Reflect.defineProperty(
                                              v,
                                              B.symbol.wrapper,
                                              { configurable: !0, value: g }
                                            ),
                                            g
                                          )
                                        })(v)
                                      : g
                                  })(v),
                                  E = {
                                    raw: g.unwrap(v, y),
                                    versions: [],
                                    wrappers: new Map(),
                                  }
                                return x.set(y, E), E
                              })(v, y)
                            : x
                        })(y, x)
                        void 0 === R.wrappers.get(v) &&
                          (rs.push(R.versions, v), R.wrappers.set(v, ze(E)))
                      },
                    }
                  function r(v, g) {
                    var y,
                      x = i(v)
                    return null !== x && (y = x.get(g)), void 0 === y ? null : y
                  }
                  function i(v) {
                    var g = B.symbol.wrapper
                    return me(v, g) ? v[g] : null
                  }
                  return g
                })()),
            nf = B.inited
              ? B.module.utilRelaxRange
              : (B.module.utilRelaxRange = (function () {
                  return function (v) {
                    if ('string' != typeof v) return '*'
                    var g = v.charCodeAt(0)
                    if (94 !== g) {
                      if (g >= 48 && g <= 57) return '^' + v
                      if (126 === g || 118 === g || 61 === g)
                        return '^' + v.slice(1)
                    }
                    return v
                  }
                })()),
            sf = 4,
            af = 3,
            of = 0,
            uf = Dn.OPTIONS,
            lf = D.PACKAGE_VERSION,
            cf = du.ERR_REQUIRE_ESM,
            pf = ['.js', '.json', '.mjs', '.cjs', '.wasm'],
            hf = /^.*?\b(?:im|ex)port\b/,
            ff = ns._extensions['.js']
          function Rh(v, g) {
            throw new cf(g)
          }
          function Ph(v, g, y) {
            var x
            try {
              return Reflect.apply(v, this, g)
            } catch (v) {
              x = v
            }
            if (pp.state.package.default.options.debug || !zs(x))
              throw (ra(x), x)
            var E = Wn(x, 'name'),
              R = g[1]
            if ('SyntaxError' === E) {
              var _ = di(Wn(x, 'message')),
                P = y.range
              if (hf.test(_) && !Jh(lf, P)) {
                var k = 'Expected esm@' + P + '. Using esm@' + lf + ': ' + R
                Reflect.defineProperty(x, 'message', {
                  configurable: !0,
                  value: k,
                  writable: !0,
                })
                var I = Wn(x, 'stack')
                'string' == typeof I &&
                  Reflect.defineProperty(x, 'stack', {
                    configurable: !0,
                    value: I.replace(_, function () {
                      return k
                    }),
                    writable: !0,
                  })
              }
              y.cache.dirty = !0
            }
            var A = hu(x)
            throw (null !== A && (R = A.filename), ia(x, { filename: R }), x)
          }
          Reflect.defineProperty(Rh, B.symbol.mjs, { value: !0 })
          var _h = function (v, g) {
              var y = v._extensions,
                x = new Map(),
                E = Cp.from(g)
              null === E && (E = Cp.from(g, uf || !0))
              var R = E.clone(),
                _ = R.options
              ;(R.range = '*'),
                _.force || 3 !== _.mode || (_.mode = 2),
                (pp.state.package.default = R),
                (op._extensions = y)
              var o = function (v, g, x) {
                var E = x[1],
                  R = Cp.from(E),
                  _ = rf.find(y, '.js', nf(R.range))
                return null === _
                  ? Ph.call(this, g, x, R)
                  : Reflect.apply(_, this, [v, g, x])
              }
              function u(v, g, y) {
                var E = this,
                  R = y[0],
                  _ = y[1],
                  P = !Bh.has(R),
                  k = Bh.get(R),
                  I = k.extname,
                  A = k.package,
                  p = function (v) {
                    if (((k.state = af), 'string' == typeof v)) {
                      var x = R._compile,
                        _ = me(R, '_compile')
                      K(
                        R,
                        '_compile',
                        ze(function (g, y) {
                          return (
                            _
                              ? K(this, '_compile', x)
                              : Reflect.deleteProperty(this, '_compile'),
                            Reflect.apply(x, this, [v, y])
                          )
                        })
                      )
                    }
                    var P,
                      I = !0
                    try {
                      ;(P = Ph.call(E, g, y, A)), (I = !1)
                    } finally {
                      k.state = I ? of : sf
                    }
                    return P
                  }
                if (
                  (P && Ee(R, op.prototype),
                  k._passthruCompile || (P && '.mjs' === I))
                )
                  return (k._passthruCompile = !1), p()
                var N = k.compileData
                if (
                  (null !== N && null !== N.code) ||
                  '.json' === I ||
                  '.wasm' === I
                )
                  return (k._ranthruCompile = !0), void kl(v, k, null, _, p)
                if (this === pp.state.module.extensions)
                  return (
                    (k._ranthruCompile = !0), void kl(v, k, an(_, 'utf8'), _, p)
                  )
                var C = R._compile,
                  O = P && me(R, '_compile'),
                  T = ze(function (g, y) {
                    P &&
                      (O
                        ? K(this, '_compile', C)
                        : Reflect.deleteProperty(this, '_compile'))
                    var x = me(this, B.symbol._compile)
                      ? this[B.symbol._compile]
                      : null
                    'function' == typeof x
                      ? (Reflect.deleteProperty(this, B.symbol._compile),
                        Reflect.apply(x, this, [g, y]))
                      : kl(v, k, g, y, p)
                  })
                if (
                  (P
                    ? K(R, '_compile', T)
                    : ((k._ranthruCompile = !0),
                      Reflect.defineProperty(R, B.symbol._compile, {
                        configurable: !0,
                        value: T,
                      })),
                  (null === N || 0 === N.transforms) && x.get(g))
                )
                  return Ph.call(this, g, y, A)
                R._compile(an(_, 'utf8'), _)
              }
              for (var P = 0, k = null == pf ? 0 : pf.length; P < k; P++) {
                var I = pf[P],
                  A = '.mjs' === I
                A && !me(y, I) && (y[I] = Xn(Rh, ff))
                var N = '.wasm' === I
                if (!N || B.support.wasm) {
                  me(y, I) || (y[I] = ff)
                  var C = rf.unwrap(y, I),
                    O = 'function' == typeof C && !me(C, B.symbol.mjs)
                  if (A && O)
                    try {
                      C()
                    } catch (v) {
                      Ns(v) && 'ERR_REQUIRE_ESM' === v.code && (O = !1)
                    }
                  rf.manage(y, I, o),
                    rf.wrap(y, I, u),
                    x.set(C, O),
                    (pp.state.module.extensions[I] = y[I])
                }
              }
            },
            df = Dn.FLAGS,
            Ih = function (v) {
              var g = op._cache
              for (var y in g)
                if (y.endsWith(mt + '.pnp.js')) {
                  Reflect.deleteProperty(g, y)
                  break
                }
              for (
                var x = 0, E = df.preloadModules, R = null == E ? 0 : E.length;
                x < R;
                x++
              ) {
                var _ = E[x]
                if (_.endsWith(mt + '.pnp.js')) {
                  op._preloadModules([_]),
                    (v._resolveFilename = op._resolveFilename)
                  break
                }
              }
            },
            mf = D.PACKAGE_RANGE,
            Nh = function (v) {
              rf.manage(v, '_fatalException', function (g, y, x) {
                var E = rf.find(v, '_fatalException', mf)
                return null === E
                  ? Reflect.apply(y, this, x)
                  : Reflect.apply(E, this, [g, y, x])
              }),
                rf.wrap(v, '_fatalException', function (v, g, y) {
                  var x = y[0]
                  return (
                    !pp.state.package.default.options.debug && zs(x)
                      ? ia(x)
                      : ra(x),
                    Reflect.apply(g, this, y)
                  )
                }),
                rf.manage(v, 'emitWarning', function (g, y, x) {
                  var E = rf.find(v, 'emitWarning', mf)
                  return null === E
                    ? Reflect.apply(y, this, x)
                    : Reflect.apply(E, this, [g, y, x])
                }),
                rf.wrap(v, 'emitWarning', function (v, g, y) {
                  var x = y[0]
                  return (
                    'string' == typeof x && (y[0] = ta(x)),
                    Reflect.apply(g, this, y)
                  )
                })
            },
            vf = du.ERR_INVALID_ARG_VALUE,
            gf = B.inited
              ? B.module.shimProcessBindingUtilGetProxyDetails
              : (B.module.shimProcessBindingUtilGetProxyDetails = (function () {
                  var v = {
                    enable(v) {
                      var g,
                        y,
                        x = B.memoize.shimProcessBindingUtilGetProxyDetails
                      if (
                        (he(function () {
                          try {
                            ;(y = v.process.binding('util')),
                              (g = y.getProxyDetails)
                          } catch (v) {}
                        }),
                        (function (v, g, y) {
                          if (!z(v) || 'function' != typeof g) return !0
                          var x = y.get(v)
                          if (void 0 !== x) return x
                          x = !0
                          try {
                            x = void 0 === g(new He(Fs, Fs))
                          } catch (v) {}
                          return y.set(v, x), x
                        })(y, g, x))
                      )
                        return v
                      var E = Ls(function (v, ...g) {
                        var x = g[g.length - 1],
                          E = x[0]
                        if (!js(E)) return Reflect.apply(v, y, [E])
                      })
                      return (
                        K(
                          y,
                          'getProxyDetails',
                          new He(g, { apply: E, construct: E })
                        ) && x.set(y, !0),
                        v
                      )
                    },
                  }
                  return v
                })()),
            yf = B.inited
              ? B.module.realREPL
              : (B.module.realREPL = et(W('repl'))),
            xf = B.inited ? B.module.safeREPL : (B.module.safeREPL = Se(yf)),
            bf = xf.REPLServer,
            wf = B.inited
              ? B.module.acornAcornParse
              : (B.module.acornAcornParse = (function () {
                  var v = 2,
                    g = 1,
                    y = {
                      enable(v) {
                        v.parse = i
                      },
                    }
                  function i(y, x) {
                    var E,
                      R,
                      _ = !0
                    x = Hr({ sourceType: v, strict: !1 }, x)
                    try {
                      ;(E = Kr.parse(y, x)), (_ = !1)
                    } catch (v) {
                      R = v
                    }
                    if (_) {
                      x.sourceType = g
                      try {
                        ;(E = Kr.parse(y, x)), (_ = !1)
                      } catch (v) {}
                    }
                    if (_) throw R
                    return E
                  }
                  return y
                })()),
            Ef = B.inited
              ? B.module.acornInternalAcorn
              : (B.module.acornInternalAcorn = (function () {
                  var v = Dn.INTERNAL,
                    g = {
                      enable() {
                        if (v) {
                          var g = Ye('internal/deps/acorn/acorn/dist/acorn')
                          z(g) && wf.enable(g)
                        }
                      },
                    }
                  return g
                })()),
            Sf = B.inited
              ? B.module.acornWalkDynamicImport
              : (B.module.acornWalkDynamicImport = (function () {
                  var v = { enable: (v) => ((v.base.Import = ve), v) }
                  return v
                })()),
            Rf = B.inited
              ? B.module.acornInternalWalk
              : (B.module.acornInternalWalk = (function () {
                  var v = Dn.INTERNAL,
                    g = {
                      enable() {
                        if (v) {
                          var g = Ye('internal/deps/acorn/acorn-walk/dist/walk')
                          z(g) && Sf.enable(g)
                        }
                      },
                    }
                  return g
                })()),
            _f = Dn.CHECK,
            Pf = Dn.EVAL,
            kf = Dn.FLAGS,
            If = Dn.HAS_INSPECTOR,
            Af = Dn.INTERNAL,
            Nf = Dn.REPL,
            Cf = du.ERR_INVALID_ARG_TYPE
          function $h(v, g, y) {
            Reflect.defineProperty(v, g, {
              configurable: !0,
              value: y,
              writable: !0,
            })
          }
          function Kh(v, g, y) {
            var x
            try {
              return Reflect.apply(v, this, g)
            } catch (v) {
              x = v
            }
            throw (
              (!pp.state.package.default.options.debug && zs(x)
                ? ia(x, { content: y })
                : ra(x),
              x)
            )
          }
          var Of,
            Yh = function (v) {
              var g
              function r(v) {
                Ee(v, op.prototype),
                  (g = Bh.get(v)),
                  (g.addBuiltinModules = (function (v) {
                    var g = [
                        'assert',
                        'async_hooks',
                        'buffer',
                        'child_process',
                        'cluster',
                        'crypto',
                        'dgram',
                        'dns',
                        'domain',
                        'events',
                        'fs',
                        'http',
                        'http2',
                        'https',
                        'net',
                        'os',
                        'path',
                        'perf_hooks',
                        'punycode',
                        'querystring',
                        'readline',
                        'repl',
                        'stream',
                        'string_decoder',
                        'tls',
                        'tty',
                        'url',
                        'util',
                        'v8',
                        'vm',
                        'zlib',
                      ],
                      y = g.length
                    return (
                      If && g.push('inspector'),
                      kf.experimentalWorker && g.push('worker_threads'),
                      g.length !== y && g.sort(),
                      function (y) {
                        var x = v.require
                        $h(y, 'console', x('console')),
                          $h(y, 'process', x('process'))
                        for (
                          var n = function (v) {
                              var g = ze(function (g) {
                                Reflect.defineProperty(this, v, {
                                  configurable: !0,
                                  value: g,
                                  writable: !0,
                                })
                              })
                              Reflect.defineProperty(y, v, {
                                configurable: !0,
                                get: ze(function () {
                                  this[v] = void 0
                                  var y = x(v)
                                  return (
                                    Reflect.defineProperty(this, v, {
                                      configurable: !0,
                                      get: function () {
                                        return y
                                      },
                                      set: g,
                                    }),
                                    y
                                  )
                                }),
                                set: g,
                              })
                            },
                            E = 0,
                            R = null == g ? 0 : g.length;
                          E < R;
                          E++
                        ) {
                          var _ = g[E]
                          n(_)
                        }
                      }
                    )
                  })(g)),
                  (g.package = Cp.get('')),
                  (g.require = ah(v)),
                  (g.runtime = null),
                  (g.runtimeName = B.runtimeName),
                  Ol.enable(g, is.create())
              }
              rf.manage(v, 'createScript', function (g, y, x) {
                var E = rf.find(v, 'createScript', '*')
                return Reflect.apply(E, this, [g, y, x])
              }),
                rf.wrap(v, 'createScript', function (y, x, [E, R]) {
                  ;(R = os({}, R)), (R.produceCachedData = !0)
                  var _ = dc(E),
                    P = g.package.cache.compile,
                    k = g,
                    I = k.runtimeName,
                    A = P.get(_)
                  if ((void 0 === A && (A = null), (g.state = 1), null === A)) {
                    var N = {
                      cjsPaths: !0,
                      cjsVars: !0,
                      generateVarDeclarations: !0,
                      pragmas: !1,
                      runtimeName: I,
                      sourceType: 3,
                      strict: !1,
                    }
                    ;(A = Kh(es.compile, [E, N], E)), P.set(_, A)
                  } else null !== A.scriptData && R.produceCachedData && !me(R, 'cachedData') && (R.cachedData = A.scriptData)
                  g.state = 2
                  var C =
                      '(()=>{var g=Function("return this")(),m=g.module,e=m&&m.exports,n="' +
                      I +
                      '";if(e&&!g[n]){m.exports=e.entry.exports;require=e.entry.require;e.entry.addBuiltinModules(g);Reflect.defineProperty(g,n,{__proto__:null,value:e})}})();' +
                      A.code,
                    O = Kh.call(v, x, [C, R], E)
                  O.cachedDataProduced && (A.scriptData = O.cachedData)
                  var d = function (v, y) {
                    g._validation.clear(),
                      (g.cacheName = _),
                      (g.compileData = A),
                      (g.state = 3),
                      (g.type = 2 === A.sourceType ? 3 : 1)
                    var x = Kh.call(this, v, y, E)
                    return (g.state = 4), x
                  }
                  return (
                    (O.runInContext = Ar(O.runInContext, d)),
                    (O.runInThisContext = Ar(O.runInThisContext, d)),
                    O
                  )
                }),
                _f
                  ? (v.Script = ba(v.Script, function (g, [y, x]) {
                      v.Script = g
                      var E = fe(op, 'wrapper')
                      if (Array.isArray(E)) {
                        var R = E[0],
                          _ = E[1]
                        'string' == typeof R &&
                          'string' == typeof _ &&
                          (y = y.slice(R.length, -_.length))
                      }
                      return r(xn), v.createScript(y, x)
                    }))
                  : Pf
                  ? ((v.runInThisContext = ba(
                      v.runInThisContext,
                      function (g, [y, x]) {
                        return (
                          (v.runInThisContext = g),
                          r(B.unsafeGlobal.module),
                          v.createScript(y, x).runInThisContext(x)
                        )
                      }
                    )),
                    (ns.prototype._compile = op.prototype._compile))
                  : Nf &&
                    (function () {
                      var g = bf.prototype.createContext
                      if (
                        ('<repl>' === xn.id
                          ? r(xn)
                          : 'function' == typeof g &&
                            (bf.prototype.createContext = ba(g, function () {
                              ;(bf.prototype.createContext = g),
                                Reflect.defineProperty(this, 'writer', {
                                  configurable: !0,
                                  enumerable: !0,
                                  get() {},
                                  set(v) {
                                    var g = Xn(function (v) {
                                      return Sa(v, g.options)
                                    }, v)
                                    return (
                                      (g.options = v.options),
                                      (g.options.colors = this.useColors),
                                      Reflect.defineProperty(
                                        Sa,
                                        'replDefaults',
                                        {
                                          configurable: !0,
                                          enumerable: !0,
                                          get: () => g.options,
                                          set(v) {
                                            if (!ge(v))
                                              throw new Cf(
                                                'options',
                                                'Object',
                                                v
                                              )
                                            return os(g.options, v)
                                          },
                                        }
                                      ),
                                      K(this, 'writer', g),
                                      K(yf, 'writer', g),
                                      g
                                    )
                                  },
                                })
                              var v = Reflect.apply(g, this, []),
                                y = v.module
                              return (
                                Reflect.defineProperty(
                                  B.unsafeGlobal,
                                  'module',
                                  {
                                    configurable: !0,
                                    get: () => y,
                                    set(v) {
                                      ;(y = v), r(y)
                                    },
                                  }
                                ),
                                r(y),
                                v
                              )
                            })),
                        (wo.createScript = v.createScript),
                        Af &&
                          kf.experimentalREPLAwait &&
                          (Ef.enable(), Rf.enable()),
                        B.support.replShowProxy)
                      )
                        K(Vi, 'inspect', Sa)
                      else {
                        var y = Vi.inspect
                        u(
                          Vi,
                          'inspect',
                          ze(function () {
                            return (this.inspect = Sa), y
                          })
                        ),
                          c(
                            Vi,
                            'inspect',
                            ze(function (v) {
                              K(this, 'inspect', v)
                            })
                          )
                      }
                    })()
            },
            Tf = Dn.CHECK,
            Lf = Dn.CLI,
            Mf = Dn.EVAL,
            Df = Dn.INTERNAL,
            Ff = Dn.PRELOADED,
            jf = Dn.REPL,
            Vf = Dn.YARN_PNP,
            Bf = du.ERR_INVALID_ARG_TYPE,
            Gf = B.safeGlobal,
            Uf = B.unsafeGlobal
          B.inited && !B.reloaded
            ? (Bs.enable(Uf),
              gf.enable(Uf),
              (Of = function (v, g) {
                if (!ge(v)) throw new Bf('module', 'object')
                var y, x, E
                if (void 0 === g) {
                  var R = Cp.from(v)
                  null !== R && (y = JSON.stringify(R.options))
                } else
                  (g = Cp.createOptions(g)),
                    (y = JSON.stringify({ name: fu(v), options: g }))
                return (
                  void 0 !== y && pp.init(y),
                  void 0 !== g && Cp.from(v, g),
                  _h(op, v),
                  Gh(v) || Nh(q),
                  Vf && Ih(Bu),
                  (x = v),
                  (E = ah(
                    x,
                    function (v) {
                      if ((Gu(v, 'request'), '' === v))
                        throw new vf('request', v, 'must be a non-empty string')
                      var g = Eu(v, x),
                        y = pp.state.package.default,
                        E = ct(g)
                      Cp.get(E) === y && Cp.set(E, y.clone())
                      var R = _c(v, x),
                        _ = R.module.exports
                      return 1 !== R.type && B.bridged.set(_, R), _
                    },
                    function (v, g) {
                      return Eu(v, x, !1, g)
                    }
                  )),
                  (E.main = pp.state.module.mainModule),
                  E
                )
              }))
            : ((Of = B),
              (Of.inited = !0),
              (Of.reloaded = !1),
              Bs.enable(Gf),
              gf.enable(Gf),
              Bs.enable(Uf),
              gf.enable(Uf),
              Tf
                ? Yh(go)
                : Mf || jf
                ? (_h(op), Nh(q), Yh(go))
                : (Lf || Df || Zh()) &&
                  (_h(ns),
                  (function (v) {
                    rf.manage(v, 'runMain', function (g, y, x) {
                      var E = q.argv,
                        R = E[1],
                        _ = Eu(R, null, !0),
                        P = Cp.from(_),
                        k = rf.find(v, 'runMain', nf(P.range))
                      return null === k
                        ? Reflect.apply(y, this, x)
                        : Reflect.apply(k, this, [g, y, x])
                    }),
                      rf.wrap(v, 'runMain', function () {
                        var v,
                          g = q.argv,
                          y = g[1],
                          x = Eu(y, null, !0),
                          E = pp.state.package.default,
                          R = ct(x)
                        Cp.get(R) === E && Cp.set(R, E.clone())
                        try {
                          _c(y, null, !0)
                        } catch (v) {
                          throw (
                            (!E.options.debug && zs(v)
                              ? ia(v, { filename: x })
                              : ra(v),
                            v)
                          )
                        }
                        ;(v = fe(q, '_tickCallback')),
                          'function' == typeof v && Reflect.apply(v, q, [])
                      }),
                      (op.runMain = v.runMain)
                  })(ns),
                  Nh(q)),
              Df &&
                (function (v) {
                  ;(v.console = ou.console.module.exports),
                    (v.process = ou.process.module.exports)
                })(Uf),
              Ff && Vf && Ih(Bu)),
            (g.default = Of)
        },
      ]).default
    },
  }
  var g = {}
  function __nccwpck_require__(y) {
    var x = g[y]
    if (x !== undefined) {
      return x.exports
    }
    var E = (g[y] = { id: y, loaded: false, exports: {} })
    var R = true
    try {
      v[y](E, E.exports, __nccwpck_require__)
      R = false
    } finally {
      if (R) delete g[y]
    }
    E.loaded = true
    return E.exports
  }
  ;(() => {
    __nccwpck_require__.nmd = (v) => {
      v.paths = []
      if (!v.children) v.children = []
      return v
    }
  })()
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var y = __nccwpck_require__(411)
  module.exports = y
})()
