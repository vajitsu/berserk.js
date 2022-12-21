;(() => {
  var e = {
    182: (e) => {
      var t = typeof BigInt64Array !== 'undefined'
      e.exports = function equal(e, t) {
        if (e === t) return true
        if (e && t && typeof e == 'object' && typeof t == 'object') {
          if (e.constructor !== t.constructor) return false
          var r, n, a
          if (Array.isArray(e)) {
            r = e.length
            if (r != t.length) return false
            for (n = r; n-- !== 0; ) if (!equal(e[n], t[n])) return false
            return true
          }
          if (e instanceof Map && t instanceof Map) {
            if (e.size !== t.size) return false
            for (n of e.entries()) if (!t.has(n[0])) return false
            for (n of e.entries()) if (!equal(n[1], t.get(n[0]))) return false
            return true
          }
          if (e instanceof Set && t instanceof Set) {
            if (e.size !== t.size) return false
            for (n of e.entries()) if (!t.has(n[0])) return false
            return true
          }
          if (ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
            r = e.length
            if (r != t.length) return false
            for (n = r; n-- !== 0; ) if (e[n] !== t[n]) return false
            return true
          }
          if (e.constructor === RegExp)
            return e.source === t.source && e.flags === t.flags
          if (e.valueOf !== Object.prototype.valueOf)
            return e.valueOf() === t.valueOf()
          if (e.toString !== Object.prototype.toString)
            return e.toString() === t.toString()
          a = Object.keys(e)
          r = a.length
          if (r !== Object.keys(t).length) return false
          for (n = r; n-- !== 0; )
            if (!Object.prototype.hasOwnProperty.call(t, a[n])) return false
          for (n = r; n-- !== 0; ) {
            var s = a[n]
            if (!equal(e[s], t[s])) return false
          }
          return true
        }
        return e !== e && t !== t
      }
    },
    571: (e) => {
      var t = 200
      var r = '__lodash_hash_undefined__'
      var n = 1 / 0
      var a = '[object Function]',
        s = '[object GeneratorFunction]'
      var i = /[\\^$.*+?()[\]{}|]/g
      var o = /^\[object .+?Constructor\]$/
      var u =
        typeof global == 'object' &&
        global &&
        global.Object === Object &&
        global
      var l = typeof self == 'object' && self && self.Object === Object && self
      var h = u || l || Function('return this')()
      function arrayIncludes(e, t) {
        var r = e ? e.length : 0
        return !!r && baseIndexOf(e, t, 0) > -1
      }
      function arrayIncludesWith(e, t, r) {
        var n = -1,
          a = e ? e.length : 0
        while (++n < a) {
          if (r(t, e[n])) {
            return true
          }
        }
        return false
      }
      function baseFindIndex(e, t, r, n) {
        var a = e.length,
          s = r + (n ? 1 : -1)
        while (n ? s-- : ++s < a) {
          if (t(e[s], s, e)) {
            return s
          }
        }
        return -1
      }
      function baseIndexOf(e, t, r) {
        if (t !== t) {
          return baseFindIndex(e, baseIsNaN, r)
        }
        var n = r - 1,
          a = e.length
        while (++n < a) {
          if (e[n] === t) {
            return n
          }
        }
        return -1
      }
      function baseIsNaN(e) {
        return e !== e
      }
      function cacheHas(e, t) {
        return e.has(t)
      }
      function getValue(e, t) {
        return e == null ? undefined : e[t]
      }
      function isHostObject(e) {
        var t = false
        if (e != null && typeof e.toString != 'function') {
          try {
            t = !!(e + '')
          } catch (e) {}
        }
        return t
      }
      function setToArray(e) {
        var t = -1,
          r = Array(e.size)
        e.forEach(function (e) {
          r[++t] = e
        })
        return r
      }
      var c = Array.prototype,
        d = Function.prototype,
        g = Object.prototype
      var p = h['__core-js_shared__']
      var y = (function () {
        var e = /[^.]+$/.exec((p && p.keys && p.keys.IE_PROTO) || '')
        return e ? 'Symbol(src)_1.' + e : ''
      })()
      var f = d.toString
      var v = g.hasOwnProperty
      var b = g.toString
      var E = RegExp(
        '^' +
          f
            .call(v)
            .replace(i, '\\$&')
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              '$1.*?'
            ) +
          '$'
      )
      var m = c.splice
      var L = getNative(h, 'Map'),
        T = getNative(h, 'Set'),
        x = getNative(Object, 'create')
      function Hash(e) {
        var t = -1,
          r = e ? e.length : 0
        this.clear()
        while (++t < r) {
          var n = e[t]
          this.set(n[0], n[1])
        }
      }
      function hashClear() {
        this.__data__ = x ? x(null) : {}
      }
      function hashDelete(e) {
        return this.has(e) && delete this.__data__[e]
      }
      function hashGet(e) {
        var t = this.__data__
        if (x) {
          var n = t[e]
          return n === r ? undefined : n
        }
        return v.call(t, e) ? t[e] : undefined
      }
      function hashHas(e) {
        var t = this.__data__
        return x ? t[e] !== undefined : v.call(t, e)
      }
      function hashSet(e, t) {
        var n = this.__data__
        n[e] = x && t === undefined ? r : t
        return this
      }
      Hash.prototype.clear = hashClear
      Hash.prototype['delete'] = hashDelete
      Hash.prototype.get = hashGet
      Hash.prototype.has = hashHas
      Hash.prototype.set = hashSet
      function ListCache(e) {
        var t = -1,
          r = e ? e.length : 0
        this.clear()
        while (++t < r) {
          var n = e[t]
          this.set(n[0], n[1])
        }
      }
      function listCacheClear() {
        this.__data__ = []
      }
      function listCacheDelete(e) {
        var t = this.__data__,
          r = assocIndexOf(t, e)
        if (r < 0) {
          return false
        }
        var n = t.length - 1
        if (r == n) {
          t.pop()
        } else {
          m.call(t, r, 1)
        }
        return true
      }
      function listCacheGet(e) {
        var t = this.__data__,
          r = assocIndexOf(t, e)
        return r < 0 ? undefined : t[r][1]
      }
      function listCacheHas(e) {
        return assocIndexOf(this.__data__, e) > -1
      }
      function listCacheSet(e, t) {
        var r = this.__data__,
          n = assocIndexOf(r, e)
        if (n < 0) {
          r.push([e, t])
        } else {
          r[n][1] = t
        }
        return this
      }
      ListCache.prototype.clear = listCacheClear
      ListCache.prototype['delete'] = listCacheDelete
      ListCache.prototype.get = listCacheGet
      ListCache.prototype.has = listCacheHas
      ListCache.prototype.set = listCacheSet
      function MapCache(e) {
        var t = -1,
          r = e ? e.length : 0
        this.clear()
        while (++t < r) {
          var n = e[t]
          this.set(n[0], n[1])
        }
      }
      function mapCacheClear() {
        this.__data__ = {
          hash: new Hash(),
          map: new (L || ListCache)(),
          string: new Hash(),
        }
      }
      function mapCacheDelete(e) {
        return getMapData(this, e)['delete'](e)
      }
      function mapCacheGet(e) {
        return getMapData(this, e).get(e)
      }
      function mapCacheHas(e) {
        return getMapData(this, e).has(e)
      }
      function mapCacheSet(e, t) {
        getMapData(this, e).set(e, t)
        return this
      }
      MapCache.prototype.clear = mapCacheClear
      MapCache.prototype['delete'] = mapCacheDelete
      MapCache.prototype.get = mapCacheGet
      MapCache.prototype.has = mapCacheHas
      MapCache.prototype.set = mapCacheSet
      function SetCache(e) {
        var t = -1,
          r = e ? e.length : 0
        this.__data__ = new MapCache()
        while (++t < r) {
          this.add(e[t])
        }
      }
      function setCacheAdd(e) {
        this.__data__.set(e, r)
        return this
      }
      function setCacheHas(e) {
        return this.__data__.has(e)
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd
      SetCache.prototype.has = setCacheHas
      function assocIndexOf(e, t) {
        var r = e.length
        while (r--) {
          if (eq(e[r][0], t)) {
            return r
          }
        }
        return -1
      }
      function baseIsNative(e) {
        if (!isObject(e) || isMasked(e)) {
          return false
        }
        var t = isFunction(e) || isHostObject(e) ? E : o
        return t.test(toSource(e))
      }
      function baseUniq(e, r, n) {
        var a = -1,
          s = arrayIncludes,
          i = e.length,
          o = true,
          u = [],
          l = u
        if (n) {
          o = false
          s = arrayIncludesWith
        } else if (i >= t) {
          var h = r ? null : q(e)
          if (h) {
            return setToArray(h)
          }
          o = false
          s = cacheHas
          l = new SetCache()
        } else {
          l = r ? [] : u
        }
        e: while (++a < i) {
          var c = e[a],
            d = r ? r(c) : c
          c = n || c !== 0 ? c : 0
          if (o && d === d) {
            var g = l.length
            while (g--) {
              if (l[g] === d) {
                continue e
              }
            }
            if (r) {
              l.push(d)
            }
            u.push(c)
          } else if (!s(l, d, n)) {
            if (l !== u) {
              l.push(d)
            }
            u.push(c)
          }
        }
        return u
      }
      var q = !(T && 1 / setToArray(new T([, -0]))[1] == n)
        ? noop
        : function (e) {
            return new T(e)
          }
      function getMapData(e, t) {
        var r = e.__data__
        return isKeyable(t)
          ? r[typeof t == 'string' ? 'string' : 'hash']
          : r.map
      }
      function getNative(e, t) {
        var r = getValue(e, t)
        return baseIsNative(r) ? r : undefined
      }
      function isKeyable(e) {
        var t = typeof e
        return t == 'string' || t == 'number' || t == 'symbol' || t == 'boolean'
          ? e !== '__proto__'
          : e === null
      }
      function isMasked(e) {
        return !!y && y in e
      }
      function toSource(e) {
        if (e != null) {
          try {
            return f.call(e)
          } catch (e) {}
          try {
            return e + ''
          } catch (e) {}
        }
        return ''
      }
      function uniqWith(e, t) {
        return e && e.length ? baseUniq(e, undefined, t) : []
      }
      function eq(e, t) {
        return e === t || (e !== e && t !== t)
      }
      function isFunction(e) {
        var t = isObject(e) ? b.call(e) : ''
        return t == a || t == s
      }
      function isObject(e) {
        var t = typeof e
        return !!e && (t == 'object' || t == 'function')
      }
      function noop() {}
      e.exports = uniqWith
    },
    837: (e) => {
      e.exports = require('util')
    },
  }
  var t = {}
  function __nccwpck_require__(r) {
    var n = t[r]
    if (n !== undefined) {
      return n.exports
    }
    var a = (t[r] = { exports: {} })
    var s = true
    try {
      e[r](a, a.exports, __nccwpck_require__)
      s = false
    } finally {
      if (s) delete t[r]
    }
    return a.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var r = {}
  ;(() => {
    var e = r
    var t = __nccwpck_require__(837)
    var n = __nccwpck_require__(182)
    var a = __nccwpck_require__(571)
    var s = Object.defineProperty
    var __name = (e, t) => s(e, 'name', { value: t, configurable: true })
    var i = true
    function setGlobalValidationEnabled(e) {
      i = e
    }
    __name(setGlobalValidationEnabled, 'setGlobalValidationEnabled')
    function getGlobalValidationEnabled() {
      return i
    }
    __name(getGlobalValidationEnabled, 'getGlobalValidationEnabled')
    var o = class {
      constructor(e, t, r) {
        this.success = e
        if (e) {
          this.value = t
        } else {
          this.error = r
        }
      }
      isOk() {
        return this.success
      }
      isErr() {
        return !this.success
      }
      unwrap() {
        if (this.isOk()) return this.value
        throw this.error
      }
      static ok(e) {
        return new o(true, e)
      }
      static err(e) {
        return new o(false, void 0, e)
      }
    }
    __name(o, 'Result')
    function getValue(e) {
      return typeof e === 'function' ? e() : e
    }
    __name(getValue, 'getValue')
    var u = class {
      constructor(e = []) {
        this.constraints = []
        this.isValidationEnabled = null
        this.constraints = e
      }
      get optional() {
        return new U([new A(void 0), this.clone()])
      }
      get nullable() {
        return new U([new A(null), this.clone()])
      }
      get nullish() {
        return new U([new O(), this.clone()])
      }
      get array() {
        return new v(this.clone())
      }
      get set() {
        return new F(this.clone())
      }
      or(...e) {
        return new U([this.clone(), ...e])
      }
      transform(e) {
        return this.addConstraint({ run: (t) => o.ok(e(t)) })
      }
      reshape(e) {
        return this.addConstraint({ run: e })
      }
      default(e) {
        return new B(this.clone(), e)
      }
      run(e) {
        let t = this.handle(e)
        if (t.isErr()) return t
        for (const e of this.constraints) {
          t = e.run(t.value)
          if (t.isErr()) break
        }
        return t
      }
      parse(e) {
        if (!this.shouldRunConstraints) {
          return this.handle(e).unwrap()
        }
        return this.constraints.reduce(
          (e, t) => t.run(e).unwrap(),
          this.handle(e).unwrap()
        )
      }
      is(e) {
        return this.run(e).isOk()
      }
      setValidationEnabled(e) {
        const t = this.clone()
        t.isValidationEnabled = e
        return t
      }
      getValidationEnabled() {
        return getValue(this.isValidationEnabled)
      }
      get shouldRunConstraints() {
        return (
          getValue(this.isValidationEnabled) ?? getGlobalValidationEnabled()
        )
      }
      clone() {
        const e = Reflect.construct(this.constructor, [this.constraints])
        e.isValidationEnabled = this.isValidationEnabled
        return e
      }
      addConstraint(e) {
        const t = this.clone()
        t.constraints = t.constraints.concat(e)
        return t
      }
    }
    __name(u, 'BaseValidator')
    var l = Symbol.for('nodejs.util.inspect.custom')
    var h = Symbol.for('nodejs.util.inspect.custom.stack-less')
    var c = class extends Error {
      [l](e, t) {
        return `${this[h](e, t)}\n${this.stack.slice(this.stack.indexOf('\n'))}`
      }
    }
    __name(c, 'BaseError')
    var d = class extends c {
      constructor(e, t, r) {
        super(t)
        this.constraint = e
        this.given = r
      }
    }
    __name(d, 'BaseConstraintError')
    var g = class extends d {
      constructor(e, t, r, n) {
        super(e, t, r)
        this.expected = n
      }
      toJSON() {
        return {
          name: this.name,
          constraint: this.constraint,
          given: this.given,
          expected: this.expected,
        }
      }
      [h](e, r) {
        const n = r.stylize(this.constraint, 'string')
        if (e < 0) {
          return r.stylize(`[ExpectedConstraintError: ${n}]`, 'special')
        }
        const a = { ...r, depth: r.depth === null ? null : r.depth - 1 }
        const s = `\n  ${r.stylize('|', 'undefined')} `
        const i = t.inspect(this.given, a).replace(/\n/g, s)
        const o = `${r.stylize('ExpectedConstraintError', 'special')} > ${n}`
        const u = r.stylize(this.message, 'regexp')
        const l = `\n  ${r.stylize('Expected: ', 'string')}${r.stylize(
          this.expected,
          'boolean'
        )}`
        const h = `\n  ${r.stylize('Received:', 'regexp')}${s}${i}`
        return `${o}\n  ${u}\n${l}\n${h}`
      }
    }
    __name(g, 'ExpectedConstraintError')
    function isUnique(e) {
      if (e.length < 2) return true
      const t = a(e, n)
      return t.length === e.length
    }
    __name(isUnique, 'isUnique')
    function lessThan(e, t) {
      return e < t
    }
    __name(lessThan, 'lessThan')
    function lessThanOrEqual(e, t) {
      return e <= t
    }
    __name(lessThanOrEqual, 'lessThanOrEqual')
    function greaterThan(e, t) {
      return e > t
    }
    __name(greaterThan, 'greaterThan')
    function greaterThanOrEqual(e, t) {
      return e >= t
    }
    __name(greaterThanOrEqual, 'greaterThanOrEqual')
    function equal(e, t) {
      return e === t
    }
    __name(equal, 'equal')
    function notEqual(e, t) {
      return e !== t
    }
    __name(notEqual, 'notEqual')
    function arrayLengthComparator(e, t, r, n) {
      return {
        run(a) {
          return e(a.length, n)
            ? o.ok(a)
            : o.err(new g(t, 'Invalid Array length', a, r))
        },
      }
    }
    __name(arrayLengthComparator, 'arrayLengthComparator')
    function arrayLengthLessThan(e) {
      const t = `expected.length < ${e}`
      return arrayLengthComparator(lessThan, 's.array(T).lengthLessThan', t, e)
    }
    __name(arrayLengthLessThan, 'arrayLengthLessThan')
    function arrayLengthLessThanOrEqual(e) {
      const t = `expected.length <= ${e}`
      return arrayLengthComparator(
        lessThanOrEqual,
        's.array(T).lengthLessThanOrEqual',
        t,
        e
      )
    }
    __name(arrayLengthLessThanOrEqual, 'arrayLengthLessThanOrEqual')
    function arrayLengthGreaterThan(e) {
      const t = `expected.length > ${e}`
      return arrayLengthComparator(
        greaterThan,
        's.array(T).lengthGreaterThan',
        t,
        e
      )
    }
    __name(arrayLengthGreaterThan, 'arrayLengthGreaterThan')
    function arrayLengthGreaterThanOrEqual(e) {
      const t = `expected.length >= ${e}`
      return arrayLengthComparator(
        greaterThanOrEqual,
        's.array(T).lengthGreaterThanOrEqual',
        t,
        e
      )
    }
    __name(arrayLengthGreaterThanOrEqual, 'arrayLengthGreaterThanOrEqual')
    function arrayLengthEqual(e) {
      const t = `expected.length === ${e}`
      return arrayLengthComparator(equal, 's.array(T).lengthEqual', t, e)
    }
    __name(arrayLengthEqual, 'arrayLengthEqual')
    function arrayLengthNotEqual(e) {
      const t = `expected.length !== ${e}`
      return arrayLengthComparator(notEqual, 's.array(T).lengthNotEqual', t, e)
    }
    __name(arrayLengthNotEqual, 'arrayLengthNotEqual')
    function arrayLengthRange(e, t) {
      const r = `expected.length >= ${e} && expected.length < ${t}`
      return {
        run(n) {
          return n.length >= e && n.length < t
            ? o.ok(n)
            : o.err(
                new g('s.array(T).lengthRange', 'Invalid Array length', n, r)
              )
        },
      }
    }
    __name(arrayLengthRange, 'arrayLengthRange')
    function arrayLengthRangeInclusive(e, t) {
      const r = `expected.length >= ${e} && expected.length <= ${t}`
      return {
        run(n) {
          return n.length >= e && n.length <= t
            ? o.ok(n)
            : o.err(
                new g(
                  's.array(T).lengthRangeInclusive',
                  'Invalid Array length',
                  n,
                  r
                )
              )
        },
      }
    }
    __name(arrayLengthRangeInclusive, 'arrayLengthRangeInclusive')
    function arrayLengthRangeExclusive(e, t) {
      const r = `expected.length > ${e} && expected.length < ${t}`
      return {
        run(n) {
          return n.length > e && n.length < t
            ? o.ok(n)
            : o.err(
                new g(
                  's.array(T).lengthRangeExclusive',
                  'Invalid Array length',
                  n,
                  r
                )
              )
        },
      }
    }
    __name(arrayLengthRangeExclusive, 'arrayLengthRangeExclusive')
    var p = {
      run(e) {
        return isUnique(e)
          ? o.ok(e)
          : o.err(
              new g(
                's.array(T).unique',
                'Array values are not unique',
                e,
                'Expected all values to be unique'
              )
            )
      },
    }
    var y = class extends c {
      constructor(e) {
        super('Received one or more errors')
        this.errors = e
      }
      [h](e, t) {
        if (e < 0) {
          return t.stylize('[CombinedPropertyError]', 'special')
        }
        const r = {
          ...t,
          depth: t.depth === null ? null : t.depth - 1,
          compact: true,
        }
        const n = `\n  ${t.stylize('|', 'undefined')} `
        const a = `${t.stylize(
          'CombinedPropertyError',
          'special'
        )} (${t.stylize(this.errors.length.toString(), 'number')})`
        const s = t.stylize(this.message, 'regexp')
        const i = this.errors
          .map(([a, s]) => {
            const i = y.formatProperty(a, t)
            const o = s[h](e - 1, r).replace(/\n/g, n)
            return `  input${i}${n}${o}`
          })
          .join('\n\n')
        return `${a}\n  ${s}\n\n${i}`
      }
      static formatProperty(e, t) {
        if (typeof e === 'string') return t.stylize(`.${e}`, 'symbol')
        if (typeof e === 'number')
          return `[${t.stylize(e.toString(), 'number')}]`
        return `[${t.stylize('Symbol', 'symbol')}(${e.description})]`
      }
    }
    __name(y, 'CombinedPropertyError')
    var f = class extends c {
      constructor(e, t, r) {
        super(t)
        this.validator = e
        this.given = r
      }
      toJSON() {
        return { name: this.name, validator: this.validator, given: this.given }
      }
      [h](e, r) {
        const n = r.stylize(this.validator, 'string')
        if (e < 0) {
          return r.stylize(`[ValidationError: ${n}]`, 'special')
        }
        const a = {
          ...r,
          depth: r.depth === null ? null : r.depth - 1,
          compact: true,
        }
        const s = `\n  ${r.stylize('|', 'undefined')} `
        const i = t.inspect(this.given, a).replace(/\n/g, s)
        const o = `${r.stylize('ValidationError', 'special')} > ${n}`
        const u = r.stylize(this.message, 'regexp')
        const l = `\n  ${r.stylize('Received:', 'regexp')}${s}${i}`
        return `${o}\n  ${u}\n${l}`
      }
    }
    __name(f, 'ValidationError')
    var v = class extends u {
      constructor(e, t = []) {
        super(t)
        this.validator = e
      }
      lengthLessThan(e) {
        return this.addConstraint(arrayLengthLessThan(e))
      }
      lengthLessThanOrEqual(e) {
        return this.addConstraint(arrayLengthLessThanOrEqual(e))
      }
      lengthGreaterThan(e) {
        return this.addConstraint(arrayLengthGreaterThan(e))
      }
      lengthGreaterThanOrEqual(e) {
        return this.addConstraint(arrayLengthGreaterThanOrEqual(e))
      }
      lengthEqual(e) {
        return this.addConstraint(arrayLengthEqual(e))
      }
      lengthNotEqual(e) {
        return this.addConstraint(arrayLengthNotEqual(e))
      }
      lengthRange(e, t) {
        return this.addConstraint(arrayLengthRange(e, t))
      }
      lengthRangeInclusive(e, t) {
        return this.addConstraint(arrayLengthRangeInclusive(e, t))
      }
      lengthRangeExclusive(e, t) {
        return this.addConstraint(arrayLengthRangeExclusive(e, t))
      }
      get unique() {
        return this.addConstraint(p)
      }
      clone() {
        return Reflect.construct(this.constructor, [
          this.validator,
          this.constraints,
        ])
      }
      handle(e) {
        if (!Array.isArray(e)) {
          return o.err(new f('s.array(T)', 'Expected an array', e))
        }
        if (!this.shouldRunConstraints) {
          return o.ok(e)
        }
        const t = []
        const r = []
        for (let n = 0; n < e.length; n++) {
          const a = this.validator.run(e[n])
          if (a.isOk()) r.push(a.value)
          else t.push([n, a.error])
        }
        return t.length === 0 ? o.ok(r) : o.err(new y(t))
      }
    }
    __name(v, 'ArrayValidator')
    function bigintComparator(e, t, r, n) {
      return {
        run(a) {
          return e(a, n)
            ? o.ok(a)
            : o.err(new g(t, 'Invalid bigint value', a, r))
        },
      }
    }
    __name(bigintComparator, 'bigintComparator')
    function bigintLessThan(e) {
      const t = `expected < ${e}n`
      return bigintComparator(lessThan, 's.bigint.lessThan', t, e)
    }
    __name(bigintLessThan, 'bigintLessThan')
    function bigintLessThanOrEqual(e) {
      const t = `expected <= ${e}n`
      return bigintComparator(lessThanOrEqual, 's.bigint.lessThanOrEqual', t, e)
    }
    __name(bigintLessThanOrEqual, 'bigintLessThanOrEqual')
    function bigintGreaterThan(e) {
      const t = `expected > ${e}n`
      return bigintComparator(greaterThan, 's.bigint.greaterThan', t, e)
    }
    __name(bigintGreaterThan, 'bigintGreaterThan')
    function bigintGreaterThanOrEqual(e) {
      const t = `expected >= ${e}n`
      return bigintComparator(
        greaterThanOrEqual,
        's.bigint.greaterThanOrEqual',
        t,
        e
      )
    }
    __name(bigintGreaterThanOrEqual, 'bigintGreaterThanOrEqual')
    function bigintEqual(e) {
      const t = `expected === ${e}n`
      return bigintComparator(equal, 's.bigint.equal', t, e)
    }
    __name(bigintEqual, 'bigintEqual')
    function bigintNotEqual(e) {
      const t = `expected !== ${e}n`
      return bigintComparator(notEqual, 's.bigint.notEqual', t, e)
    }
    __name(bigintNotEqual, 'bigintNotEqual')
    function bigintDivisibleBy(e) {
      const t = `expected % ${e}n === 0n`
      return {
        run(r) {
          return r % e === 0n
            ? o.ok(r)
            : o.err(
                new g('s.bigint.divisibleBy', 'BigInt is not divisible', r, t)
              )
        },
      }
    }
    __name(bigintDivisibleBy, 'bigintDivisibleBy')
    var b = class extends u {
      lessThan(e) {
        return this.addConstraint(bigintLessThan(e))
      }
      lessThanOrEqual(e) {
        return this.addConstraint(bigintLessThanOrEqual(e))
      }
      greaterThan(e) {
        return this.addConstraint(bigintGreaterThan(e))
      }
      greaterThanOrEqual(e) {
        return this.addConstraint(bigintGreaterThanOrEqual(e))
      }
      equal(e) {
        return this.addConstraint(bigintEqual(e))
      }
      notEqual(e) {
        return this.addConstraint(bigintNotEqual(e))
      }
      get positive() {
        return this.greaterThanOrEqual(0n)
      }
      get negative() {
        return this.lessThan(0n)
      }
      divisibleBy(e) {
        return this.addConstraint(bigintDivisibleBy(e))
      }
      get abs() {
        return this.transform((e) => (e < 0 ? -e : e))
      }
      intN(e) {
        return this.transform((t) => BigInt.asIntN(e, t))
      }
      uintN(e) {
        return this.transform((t) => BigInt.asUintN(e, t))
      }
      handle(e) {
        return typeof e === 'bigint'
          ? o.ok(e)
          : o.err(new f('s.bigint', 'Expected a bigint primitive', e))
      }
    }
    __name(b, 'BigIntValidator')
    var E = {
      run(e) {
        return e
          ? o.ok(e)
          : o.err(new g('s.boolean.true', 'Invalid boolean value', e, 'true'))
      },
    }
    var m = {
      run(e) {
        return e
          ? o.err(new g('s.boolean.false', 'Invalid boolean value', e, 'false'))
          : o.ok(e)
      },
    }
    var L = class extends u {
      get true() {
        return this.addConstraint(E)
      }
      get false() {
        return this.addConstraint(m)
      }
      equal(e) {
        return e ? this.true : this.false
      }
      notEqual(e) {
        return e ? this.false : this.true
      }
      handle(e) {
        return typeof e === 'boolean'
          ? o.ok(e)
          : o.err(new f('s.boolean', 'Expected a boolean primitive', e))
      }
    }
    __name(L, 'BooleanValidator')
    function dateComparator(e, t, r, n) {
      return {
        run(a) {
          return e(a.getTime(), n)
            ? o.ok(a)
            : o.err(new g(t, 'Invalid Date value', a, r))
        },
      }
    }
    __name(dateComparator, 'dateComparator')
    function dateLessThan(e) {
      const t = `expected < ${e.toISOString()}`
      return dateComparator(lessThan, 's.date.lessThan', t, e.getTime())
    }
    __name(dateLessThan, 'dateLessThan')
    function dateLessThanOrEqual(e) {
      const t = `expected <= ${e.toISOString()}`
      return dateComparator(
        lessThanOrEqual,
        's.date.lessThanOrEqual',
        t,
        e.getTime()
      )
    }
    __name(dateLessThanOrEqual, 'dateLessThanOrEqual')
    function dateGreaterThan(e) {
      const t = `expected > ${e.toISOString()}`
      return dateComparator(greaterThan, 's.date.greaterThan', t, e.getTime())
    }
    __name(dateGreaterThan, 'dateGreaterThan')
    function dateGreaterThanOrEqual(e) {
      const t = `expected >= ${e.toISOString()}`
      return dateComparator(
        greaterThanOrEqual,
        's.date.greaterThanOrEqual',
        t,
        e.getTime()
      )
    }
    __name(dateGreaterThanOrEqual, 'dateGreaterThanOrEqual')
    function dateEqual(e) {
      const t = `expected === ${e.toISOString()}`
      return dateComparator(equal, 's.date.equal', t, e.getTime())
    }
    __name(dateEqual, 'dateEqual')
    function dateNotEqual(e) {
      const t = `expected !== ${e.toISOString()}`
      return dateComparator(notEqual, 's.date.notEqual', t, e.getTime())
    }
    __name(dateNotEqual, 'dateNotEqual')
    var T = {
      run(e) {
        return Number.isNaN(e.getTime())
          ? o.ok(e)
          : o.err(
              new g(
                's.date.invalid',
                'Invalid Date value',
                e,
                'expected === NaN'
              )
            )
      },
    }
    var x = {
      run(e) {
        return Number.isNaN(e.getTime())
          ? o.err(
              new g('s.date.valid', 'Invalid Date value', e, 'expected !== NaN')
            )
          : o.ok(e)
      },
    }
    var q = class extends u {
      lessThan(e) {
        return this.addConstraint(dateLessThan(new Date(e)))
      }
      lessThanOrEqual(e) {
        return this.addConstraint(dateLessThanOrEqual(new Date(e)))
      }
      greaterThan(e) {
        return this.addConstraint(dateGreaterThan(new Date(e)))
      }
      greaterThanOrEqual(e) {
        return this.addConstraint(dateGreaterThanOrEqual(new Date(e)))
      }
      equal(e) {
        const t = new Date(e)
        return Number.isNaN(t.getTime())
          ? this.invalid
          : this.addConstraint(dateEqual(t))
      }
      notEqual(e) {
        const t = new Date(e)
        return Number.isNaN(t.getTime())
          ? this.valid
          : this.addConstraint(dateNotEqual(t))
      }
      get valid() {
        return this.addConstraint(x)
      }
      get invalid() {
        return this.addConstraint(T)
      }
      handle(e) {
        return e instanceof Date
          ? o.ok(e)
          : o.err(new f('s.date', 'Expected a Date', e))
      }
    }
    __name(q, 'DateValidator')
    var $ = class extends f {
      constructor(e, t, r, n) {
        super(e, t, r)
        this.expected = n
      }
      toJSON() {
        return {
          name: this.name,
          validator: this.validator,
          given: this.given,
          expected: this.expected,
        }
      }
      [h](e, r) {
        const n = r.stylize(this.validator, 'string')
        if (e < 0) {
          return r.stylize(`[ExpectedValidationError: ${n}]`, 'special')
        }
        const a = { ...r, depth: r.depth === null ? null : r.depth - 1 }
        const s = `\n  ${r.stylize('|', 'undefined')} `
        const i = t.inspect(this.expected, a).replace(/\n/g, s)
        const o = t.inspect(this.given, a).replace(/\n/g, s)
        const u = `${r.stylize('ExpectedValidationError', 'special')} > ${n}`
        const l = r.stylize(this.message, 'regexp')
        const h = `\n  ${r.stylize('Expected:', 'string')}${s}${i}`
        const c = `\n  ${r.stylize('Received:', 'regexp')}${s}${o}`
        return `${u}\n  ${l}\n${h}\n${c}`
      }
    }
    __name($, 'ExpectedValidationError')
    var C = class extends u {
      constructor(e, t = []) {
        super(t)
        this.expected = e
      }
      handle(e) {
        return e instanceof this.expected
          ? o.ok(e)
          : o.err(new $('s.instance(V)', 'Expected', e, this.expected))
      }
      clone() {
        return Reflect.construct(this.constructor, [
          this.expected,
          this.constraints,
        ])
      }
    }
    __name(C, 'InstanceValidator')
    var A = class extends u {
      constructor(e, t = []) {
        super(t)
        this.expected = e
      }
      handle(e) {
        return Object.is(e, this.expected)
          ? o.ok(e)
          : o.err(
              new $(
                's.literal(V)',
                'Expected values to be equals',
                e,
                this.expected
              )
            )
      }
      clone() {
        return Reflect.construct(this.constructor, [
          this.expected,
          this.constraints,
        ])
      }
    }
    __name(A, 'LiteralValidator')
    var w = class extends u {
      handle(e) {
        return o.err(new f('s.never', 'Expected a value to not be passed', e))
      }
    }
    __name(w, 'NeverValidator')
    var O = class extends u {
      handle(e) {
        return e === void 0 || e === null
          ? o.ok(e)
          : o.err(new f('s.nullish', 'Expected undefined or null', e))
      }
    }
    __name(O, 'NullishValidator')
    function numberComparator(e, t, r, n) {
      return {
        run(a) {
          return e(a, n)
            ? o.ok(a)
            : o.err(new g(t, 'Invalid number value', a, r))
        },
      }
    }
    __name(numberComparator, 'numberComparator')
    function numberLessThan(e) {
      const t = `expected < ${e}`
      return numberComparator(lessThan, 's.number.lessThan', t, e)
    }
    __name(numberLessThan, 'numberLessThan')
    function numberLessThanOrEqual(e) {
      const t = `expected <= ${e}`
      return numberComparator(lessThanOrEqual, 's.number.lessThanOrEqual', t, e)
    }
    __name(numberLessThanOrEqual, 'numberLessThanOrEqual')
    function numberGreaterThan(e) {
      const t = `expected > ${e}`
      return numberComparator(greaterThan, 's.number.greaterThan', t, e)
    }
    __name(numberGreaterThan, 'numberGreaterThan')
    function numberGreaterThanOrEqual(e) {
      const t = `expected >= ${e}`
      return numberComparator(
        greaterThanOrEqual,
        's.number.greaterThanOrEqual',
        t,
        e
      )
    }
    __name(numberGreaterThanOrEqual, 'numberGreaterThanOrEqual')
    function numberEqual(e) {
      const t = `expected === ${e}`
      return numberComparator(equal, 's.number.equal', t, e)
    }
    __name(numberEqual, 'numberEqual')
    function numberNotEqual(e) {
      const t = `expected !== ${e}`
      return numberComparator(notEqual, 's.number.notEqual', t, e)
    }
    __name(numberNotEqual, 'numberNotEqual')
    var I = {
      run(e) {
        return Number.isInteger(e)
          ? o.ok(e)
          : o.err(
              new g(
                's.number.int',
                'Given value is not an integer',
                e,
                'Number.isInteger(expected) to be true'
              )
            )
      },
    }
    var R = {
      run(e) {
        return Number.isSafeInteger(e)
          ? o.ok(e)
          : o.err(
              new g(
                's.number.safeInt',
                'Given value is not a safe integer',
                e,
                'Number.isSafeInteger(expected) to be true'
              )
            )
      },
    }
    var _ = {
      run(e) {
        return Number.isFinite(e)
          ? o.ok(e)
          : o.err(
              new g(
                's.number.finite',
                'Given value is not finite',
                e,
                'Number.isFinite(expected) to be true'
              )
            )
      },
    }
    var k = {
      run(e) {
        return Number.isNaN(e)
          ? o.ok(e)
          : o.err(
              new g(
                's.number.equal(NaN)',
                'Invalid number value',
                e,
                'expected === NaN'
              )
            )
      },
    }
    var N = {
      run(e) {
        return Number.isNaN(e)
          ? o.err(
              new g(
                's.number.notEqual(NaN)',
                'Invalid number value',
                e,
                'expected !== NaN'
              )
            )
          : o.ok(e)
      },
    }
    function numberDivisibleBy(e) {
      const t = `expected % ${e} === 0`
      return {
        run(r) {
          return r % e === 0
            ? o.ok(r)
            : o.err(
                new g('s.number.divisibleBy', 'Number is not divisible', r, t)
              )
        },
      }
    }
    __name(numberDivisibleBy, 'numberDivisibleBy')
    var G = class extends u {
      lessThan(e) {
        return this.addConstraint(numberLessThan(e))
      }
      lessThanOrEqual(e) {
        return this.addConstraint(numberLessThanOrEqual(e))
      }
      greaterThan(e) {
        return this.addConstraint(numberGreaterThan(e))
      }
      greaterThanOrEqual(e) {
        return this.addConstraint(numberGreaterThanOrEqual(e))
      }
      equal(e) {
        return Number.isNaN(e)
          ? this.addConstraint(k)
          : this.addConstraint(numberEqual(e))
      }
      notEqual(e) {
        return Number.isNaN(e)
          ? this.addConstraint(N)
          : this.addConstraint(numberNotEqual(e))
      }
      get int() {
        return this.addConstraint(I)
      }
      get safeInt() {
        return this.addConstraint(R)
      }
      get finite() {
        return this.addConstraint(_)
      }
      get positive() {
        return this.greaterThanOrEqual(0)
      }
      get negative() {
        return this.lessThan(0)
      }
      divisibleBy(e) {
        return this.addConstraint(numberDivisibleBy(e))
      }
      get abs() {
        return this.transform(Math.abs)
      }
      get sign() {
        return this.transform(Math.sign)
      }
      get trunc() {
        return this.transform(Math.trunc)
      }
      get floor() {
        return this.transform(Math.floor)
      }
      get fround() {
        return this.transform(Math.fround)
      }
      get round() {
        return this.transform(Math.round)
      }
      get ceil() {
        return this.transform(Math.ceil)
      }
      handle(e) {
        return typeof e === 'number'
          ? o.ok(e)
          : o.err(new f('s.number', 'Expected a number primitive', e))
      }
    }
    __name(G, 'NumberValidator')
    var V = class extends c {
      constructor(e) {
        super('A required property is missing')
        this.property = e
      }
      toJSON() {
        return { name: this.name, property: this.property }
      }
      [h](e, t) {
        const r = t.stylize(this.property.toString(), 'string')
        if (e < 0) {
          return t.stylize(`[MissingPropertyError: ${r}]`, 'special')
        }
        const n = `${t.stylize('MissingPropertyError', 'special')} > ${r}`
        const a = t.stylize(this.message, 'regexp')
        return `${n}\n  ${a}`
      }
    }
    __name(V, 'MissingPropertyError')
    var S = class extends c {
      constructor(e, t) {
        super('Received unexpected property')
        this.property = e
        this.value = t
      }
      toJSON() {
        return { name: this.name, property: this.property, value: this.value }
      }
      [h](e, r) {
        const n = r.stylize(this.property.toString(), 'string')
        if (e < 0) {
          return r.stylize(`[UnknownPropertyError: ${n}]`, 'special')
        }
        const a = {
          ...r,
          depth: r.depth === null ? null : r.depth - 1,
          compact: true,
        }
        const s = `\n  ${r.stylize('|', 'undefined')} `
        const i = t.inspect(this.value, a).replace(/\n/g, s)
        const o = `${r.stylize('UnknownPropertyError', 'special')} > ${n}`
        const u = r.stylize(this.message, 'regexp')
        const l = `\n  ${r.stylize('Received:', 'regexp')}${s}${i}`
        return `${o}\n  ${u}\n${l}`
      }
    }
    __name(S, 'UnknownPropertyError')
    var B = class extends u {
      constructor(e, t, r = []) {
        super(r)
        this.validator = e
        this.defaultValue = t
      }
      default(e) {
        const t = this.clone()
        t.defaultValue = e
        return t
      }
      handle(e) {
        return typeof e === 'undefined'
          ? o.ok(getValue(this.defaultValue))
          : this.validator['handle'](e)
      }
      clone() {
        return Reflect.construct(this.constructor, [
          this.validator,
          this.defaultValue,
          this.constraints,
        ])
      }
    }
    __name(B, 'DefaultValidator')
    var z = class extends c {
      constructor(e) {
        super('Received one or more errors')
        this.errors = e
      }
      [h](e, t) {
        if (e < 0) {
          return t.stylize('[CombinedError]', 'special')
        }
        const r = {
          ...t,
          depth: t.depth === null ? null : t.depth - 1,
          compact: true,
        }
        const n = `\n  ${t.stylize('|', 'undefined')} `
        const a = `${t.stylize('CombinedError', 'special')} (${t.stylize(
          this.errors.length.toString(),
          'number'
        )})`
        const s = t.stylize(this.message, 'regexp')
        const i = this.errors
          .map((a, s) => {
            const i = t.stylize((s + 1).toString(), 'number')
            const o = a[h](e - 1, r).replace(/\n/g, n)
            return `  ${i} ${o}`
          })
          .join('\n\n')
        return `${a}\n  ${s}\n\n${i}`
      }
    }
    __name(z, 'CombinedError')
    var U = class extends u {
      constructor(e, t = []) {
        super(t)
        this.validators = e
      }
      get optional() {
        if (this.validators.length === 0)
          return new U([new A(void 0)], this.constraints)
        const [e] = this.validators
        if (e instanceof A) {
          if (e.expected === void 0) return this.clone()
          if (e.expected === null) {
            return new U(
              [new O(), ...this.validators.slice(1)],
              this.constraints
            )
          }
        } else if (e instanceof O) {
          return this.clone()
        }
        return new U([new A(void 0), ...this.validators])
      }
      get required() {
        if (this.validators.length === 0) return this.clone()
        const [e] = this.validators
        if (e instanceof A) {
          if (e.expected === void 0)
            return new U(this.validators.slice(1), this.constraints)
        } else if (e instanceof O) {
          return new U(
            [new A(null), ...this.validators.slice(1)],
            this.constraints
          )
        }
        return this.clone()
      }
      get nullable() {
        if (this.validators.length === 0)
          return new U([new A(null)], this.constraints)
        const [e] = this.validators
        if (e instanceof A) {
          if (e.expected === null) return this.clone()
          if (e.expected === void 0) {
            return new U(
              [new O(), ...this.validators.slice(1)],
              this.constraints
            )
          }
        } else if (e instanceof O) {
          return this.clone()
        }
        return new U([new A(null), ...this.validators])
      }
      get nullish() {
        if (this.validators.length === 0)
          return new U([new O()], this.constraints)
        const [e] = this.validators
        if (e instanceof A) {
          if (e.expected === null || e.expected === void 0) {
            return new U(
              [new O(), ...this.validators.slice(1)],
              this.constraints
            )
          }
        } else if (e instanceof O) {
          return this.clone()
        }
        return new U([new O(), ...this.validators])
      }
      or(...e) {
        return new U([...this.validators, ...e])
      }
      clone() {
        return Reflect.construct(this.constructor, [
          this.validators,
          this.constraints,
        ])
      }
      handle(e) {
        const t = []
        for (const r of this.validators) {
          const n = r.run(e)
          if (n.isOk()) return n
          t.push(n.error)
        }
        return o.err(new z(t))
      }
    }
    __name(U, 'UnionValidator')
    var P = class extends u {
      constructor(e, t = D.Ignore, r = []) {
        super(r)
        this.keys = []
        this.requiredKeys = new Map()
        this.possiblyUndefinedKeys = new Map()
        this.possiblyUndefinedKeysWithDefaults = new Map()
        this.shape = e
        this.strategy = t
        switch (this.strategy) {
          case D.Ignore:
            this.handleStrategy = (e) => this.handleIgnoreStrategy(e)
            break
          case D.Strict: {
            this.handleStrategy = (e) => this.handleStrictStrategy(e)
            break
          }
          case D.Passthrough:
            this.handleStrategy = (e) => this.handlePassthroughStrategy(e)
            break
        }
        const n = Object.entries(e)
        this.keys = n.map(([e]) => e)
        for (const [e, t] of n) {
          if (t instanceof U) {
            const [r] = t['validators']
            if (r instanceof O) {
              this.possiblyUndefinedKeys.set(e, t)
            } else if (r instanceof A) {
              if (r.expected === void 0) {
                this.possiblyUndefinedKeys.set(e, t)
              } else {
                this.requiredKeys.set(e, t)
              }
            } else if (t instanceof B) {
              this.possiblyUndefinedKeysWithDefaults.set(e, t)
            } else {
              this.requiredKeys.set(e, t)
            }
          } else if (t instanceof O) {
            this.possiblyUndefinedKeys.set(e, t)
          } else if (t instanceof A) {
            if (t.expected === void 0) {
              this.possiblyUndefinedKeys.set(e, t)
            } else {
              this.requiredKeys.set(e, t)
            }
          } else if (t instanceof B) {
            this.possiblyUndefinedKeysWithDefaults.set(e, t)
          } else {
            this.requiredKeys.set(e, t)
          }
        }
      }
      get strict() {
        return Reflect.construct(this.constructor, [
          this.shape,
          D.Strict,
          this.constraints,
        ])
      }
      get ignore() {
        return Reflect.construct(this.constructor, [
          this.shape,
          D.Ignore,
          this.constraints,
        ])
      }
      get passthrough() {
        return Reflect.construct(this.constructor, [
          this.shape,
          D.Passthrough,
          this.constraints,
        ])
      }
      get partial() {
        const e = Object.fromEntries(
          this.keys.map((e) => [e, this.shape[e].optional])
        )
        return Reflect.construct(this.constructor, [
          e,
          this.strategy,
          this.constraints,
        ])
      }
      get required() {
        const e = Object.fromEntries(
          this.keys.map((e) => {
            let t = this.shape[e]
            if (t instanceof U) t = t.required
            return [e, t]
          })
        )
        return Reflect.construct(this.constructor, [
          e,
          this.strategy,
          this.constraints,
        ])
      }
      extend(e) {
        const t = { ...this.shape, ...(e instanceof P ? e.shape : e) }
        return Reflect.construct(this.constructor, [
          t,
          this.strategy,
          this.constraints,
        ])
      }
      pick(e) {
        const t = Object.fromEntries(
          e.filter((e) => this.keys.includes(e)).map((e) => [e, this.shape[e]])
        )
        return Reflect.construct(this.constructor, [
          t,
          this.strategy,
          this.constraints,
        ])
      }
      omit(e) {
        const t = Object.fromEntries(
          this.keys.filter((t) => !e.includes(t)).map((e) => [e, this.shape[e]])
        )
        return Reflect.construct(this.constructor, [
          t,
          this.strategy,
          this.constraints,
        ])
      }
      handle(e) {
        const t = typeof e
        if (t !== 'object') {
          return o.err(
            new f(
              's.object(T)',
              `Expected the value to be an object, but received ${t} instead`,
              e
            )
          )
        }
        if (e === null) {
          return o.err(
            new f('s.object(T)', 'Expected the value to not be null', e)
          )
        }
        if (Array.isArray(e)) {
          return o.err(
            new f('s.object(T)', 'Expected the value to not be an array', e)
          )
        }
        if (!this.shouldRunConstraints) {
          return o.ok(e)
        }
        return this.handleStrategy(e)
      }
      clone() {
        return Reflect.construct(this.constructor, [
          this.shape,
          this.strategy,
          this.constraints,
        ])
      }
      handleIgnoreStrategy(e) {
        const t = []
        const r = {}
        const n = new Map(Object.entries(e))
        const a = __name((n, a) => {
          const s = a.run(e[n])
          if (s.isOk()) {
            r[n] = s.value
          } else {
            const e = s.error
            t.push([n, e])
          }
        }, 'runPredicate')
        for (const [e, r] of this.requiredKeys) {
          if (n.delete(e)) {
            a(e, r)
          } else {
            t.push([e, new V(e)])
          }
        }
        for (const [e, t] of this.possiblyUndefinedKeysWithDefaults) {
          n.delete(e)
          a(e, t)
        }
        if (n.size === 0) {
          return t.length === 0 ? o.ok(r) : o.err(new y(t))
        }
        const s = this.possiblyUndefinedKeys.size > n.size
        if (s) {
          for (const [e] of n) {
            const t = this.possiblyUndefinedKeys.get(e)
            if (t) {
              a(e, t)
            }
          }
        } else {
          for (const [e, t] of this.possiblyUndefinedKeys) {
            if (n.delete(e)) {
              a(e, t)
            }
          }
        }
        return t.length === 0 ? o.ok(r) : o.err(new y(t))
      }
      handleStrictStrategy(e) {
        const t = []
        const r = {}
        const n = new Map(Object.entries(e))
        const a = __name((n, a) => {
          const s = a.run(e[n])
          if (s.isOk()) {
            r[n] = s.value
          } else {
            const e = s.error
            t.push([n, e])
          }
        }, 'runPredicate')
        for (const [e, r] of this.requiredKeys) {
          if (n.delete(e)) {
            a(e, r)
          } else {
            t.push([e, new V(e)])
          }
        }
        for (const [e, t] of this.possiblyUndefinedKeysWithDefaults) {
          n.delete(e)
          a(e, t)
        }
        for (const [e, t] of this.possiblyUndefinedKeys) {
          if (n.size === 0) {
            break
          }
          if (n.delete(e)) {
            a(e, t)
          }
        }
        if (n.size !== 0) {
          for (const [e, r] of n.entries()) {
            t.push([e, new S(e, r)])
          }
        }
        return t.length === 0 ? o.ok(r) : o.err(new y(t))
      }
      handlePassthroughStrategy(e) {
        const t = this.handleIgnoreStrategy(e)
        return t.isErr() ? t : o.ok({ ...e, ...t.value })
      }
    }
    __name(P, 'ObjectValidator')
    var D = ((e) => {
      e[(e['Ignore'] = 0)] = 'Ignore'
      e[(e['Strict'] = 1)] = 'Strict'
      e[(e['Passthrough'] = 2)] = 'Passthrough'
      return e
    })(D || {})
    var M = class extends u {
      handle(e) {
        return o.ok(e)
      }
    }
    __name(M, 'PassthroughValidator')
    var j = class extends u {
      constructor(e, t = []) {
        super(t)
        this.validator = e
      }
      clone() {
        return Reflect.construct(this.constructor, [
          this.validator,
          this.constraints,
        ])
      }
      handle(e) {
        if (typeof e !== 'object') {
          return o.err(new f('s.record(T)', 'Expected an object', e))
        }
        if (e === null) {
          return o.err(
            new f('s.record(T)', 'Expected the value to not be null', e)
          )
        }
        if (Array.isArray(e)) {
          return o.err(
            new f('s.record(T)', 'Expected the value to not be an array', e)
          )
        }
        if (!this.shouldRunConstraints) {
          return o.ok(e)
        }
        const t = []
        const r = {}
        for (const [n, a] of Object.entries(e)) {
          const e = this.validator.run(a)
          if (e.isOk()) r[n] = e.value
          else t.push([n, e.error])
        }
        return t.length === 0 ? o.ok(r) : o.err(new y(t))
      }
    }
    __name(j, 'RecordValidator')
    var F = class extends u {
      constructor(e, t = []) {
        super(t)
        this.validator = e
      }
      clone() {
        return Reflect.construct(this.constructor, [
          this.validator,
          this.constraints,
        ])
      }
      handle(e) {
        if (!(e instanceof Set)) {
          return o.err(new f('s.set(T)', 'Expected a set', e))
        }
        if (!this.shouldRunConstraints) {
          return o.ok(e)
        }
        const t = []
        const r = new Set()
        for (const n of e) {
          const e = this.validator.run(n)
          if (e.isOk()) r.add(e.value)
          else t.push(e.error)
        }
        return t.length === 0 ? o.ok(r) : o.err(new z(t))
      }
    }
    __name(F, 'SetValidator')
    var K =
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")$/
    function validateEmail(e) {
      if (!e) return false
      const t = e.indexOf('@')
      if (t === -1) return false
      if (t > 64) return false
      const r = t + 1
      if (e.includes('@', r)) return false
      if (e.length - r > 255) return false
      let n = e.indexOf('.', r)
      if (n === -1) return false
      let a = r
      do {
        if (n - a > 63) return false
        a = n + 1
      } while ((n = e.indexOf('.', a)) !== -1)
      if (e.length - a > 63) return false
      return K.test(e.slice(0, t)) && validateEmailDomain(e.slice(r))
    }
    __name(validateEmail, 'validateEmail')
    function validateEmailDomain(e) {
      try {
        return new URL(`http://${e}`).hostname === e
      } catch {
        return false
      }
    }
    __name(validateEmailDomain, 'validateEmailDomain')
    var H = '(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
    var W = `(${H}[.]){3}${H}`
    var J = new RegExp(`^${W}$`)
    var Z = '(?:[0-9a-fA-F]{1,4})'
    var Q = new RegExp(
      `^((?:${Z}:){7}(?:${Z}|:)|(?:${Z}:){6}(?:${W}|:${Z}|:)|(?:${Z}:){5}(?::${W}|(:${Z}){1,2}|:)|(?:${Z}:){4}(?:(:${Z}){0,1}:${W}|(:${Z}){1,3}|:)|(?:${Z}:){3}(?:(:${Z}){0,2}:${W}|(:${Z}){1,4}|:)|(?:${Z}:){2}(?:(:${Z}){0,3}:${W}|(:${Z}){1,5}|:)|(?:${Z}:){1}(?:(:${Z}){0,4}:${W}|(:${Z}){1,6}|:)|(?::((?::${Z}){0,5}:${W}|(?::${Z}){1,7}|:)))(%[0-9a-zA-Z-.:]{1,})?$`
    )
    function isIPv4(e) {
      return J.test(e)
    }
    __name(isIPv4, 'isIPv4')
    function isIPv6(e) {
      return Q.test(e)
    }
    __name(isIPv6, 'isIPv6')
    function isIP(e) {
      if (isIPv4(e)) return 4
      if (isIPv6(e)) return 6
      return 0
    }
    __name(isIP, 'isIP')
    var X = /^((?:\+|0{0,2})\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    function validatePhoneNumber(e) {
      return X.test(e)
    }
    __name(validatePhoneNumber, 'validatePhoneNumber')
    var Y = class extends d {
      constructor(e, t, r, n) {
        super(e, t, r)
        this.expected = n
      }
      toJSON() {
        return {
          name: this.name,
          constraint: this.constraint,
          given: this.given,
          expected: this.expected,
        }
      }
      [h](e, r) {
        const n = r.stylize(this.constraint, 'string')
        if (e < 0) {
          return r.stylize(
            `[MultiplePossibilitiesConstraintError: ${n}]`,
            'special'
          )
        }
        const a = { ...r, depth: r.depth === null ? null : r.depth - 1 }
        const s = r.stylize('|', 'undefined')
        const i = `\n  ${s} `
        const o = t.inspect(this.given, a).replace(/\n/g, i)
        const u = `${r.stylize(
          'MultiplePossibilitiesConstraintError',
          'special'
        )} > ${n}`
        const l = r.stylize(this.message, 'regexp')
        const h = `\n  ${s} - `
        const c = `\n  ${r.stylize(
          'Expected any of the following:',
          'string'
        )}${h}${this.expected.map((e) => r.stylize(e, 'boolean')).join(h)}`
        const d = `\n  ${r.stylize('Received:', 'regexp')}${i}${o}`
        return `${u}\n  ${l}\n${c}\n${d}`
      }
    }
    __name(Y, 'MultiplePossibilitiesConstraintError')
    function combinedErrorFn(...e) {
      switch (e.length) {
        case 0:
          return () => null
        case 1:
          return e[0]
        case 2: {
          const [t, r] = e
          return (...e) => t(...e) || r(...e)
        }
        default: {
          return (...t) => {
            for (const r of e) {
              const e = r(...t)
              if (e) return e
            }
            return null
          }
        }
      }
    }
    __name(combinedErrorFn, 'combinedErrorFn')
    function createUrlValidators(e) {
      const t = []
      if (e?.allowedProtocols?.length)
        t.push(allowedProtocolsFn(e.allowedProtocols))
      if (e?.allowedDomains?.length) t.push(allowedDomainsFn(e.allowedDomains))
      return combinedErrorFn(...t)
    }
    __name(createUrlValidators, 'createUrlValidators')
    function allowedProtocolsFn(e) {
      return (t, r) =>
        e.includes(r.protocol)
          ? null
          : new Y('s.string.url', 'Invalid URL protocol', t, e)
    }
    __name(allowedProtocolsFn, 'allowedProtocolsFn')
    function allowedDomainsFn(e) {
      return (t, r) =>
        e.includes(r.hostname)
          ? null
          : new Y('s.string.url', 'Invalid URL domain', t, e)
    }
    __name(allowedDomainsFn, 'allowedDomainsFn')
    function stringLengthComparator(e, t, r, n) {
      return {
        run(a) {
          return e(a.length, n)
            ? o.ok(a)
            : o.err(new g(t, 'Invalid string length', a, r))
        },
      }
    }
    __name(stringLengthComparator, 'stringLengthComparator')
    function stringLengthLessThan(e) {
      const t = `expected.length < ${e}`
      return stringLengthComparator(lessThan, 's.string.lengthLessThan', t, e)
    }
    __name(stringLengthLessThan, 'stringLengthLessThan')
    function stringLengthLessThanOrEqual(e) {
      const t = `expected.length <= ${e}`
      return stringLengthComparator(
        lessThanOrEqual,
        's.string.lengthLessThanOrEqual',
        t,
        e
      )
    }
    __name(stringLengthLessThanOrEqual, 'stringLengthLessThanOrEqual')
    function stringLengthGreaterThan(e) {
      const t = `expected.length > ${e}`
      return stringLengthComparator(
        greaterThan,
        's.string.lengthGreaterThan',
        t,
        e
      )
    }
    __name(stringLengthGreaterThan, 'stringLengthGreaterThan')
    function stringLengthGreaterThanOrEqual(e) {
      const t = `expected.length >= ${e}`
      return stringLengthComparator(
        greaterThanOrEqual,
        's.string.lengthGreaterThanOrEqual',
        t,
        e
      )
    }
    __name(stringLengthGreaterThanOrEqual, 'stringLengthGreaterThanOrEqual')
    function stringLengthEqual(e) {
      const t = `expected.length === ${e}`
      return stringLengthComparator(equal, 's.string.lengthEqual', t, e)
    }
    __name(stringLengthEqual, 'stringLengthEqual')
    function stringLengthNotEqual(e) {
      const t = `expected.length !== ${e}`
      return stringLengthComparator(notEqual, 's.string.lengthNotEqual', t, e)
    }
    __name(stringLengthNotEqual, 'stringLengthNotEqual')
    function stringEmail() {
      return {
        run(e) {
          return validateEmail(e)
            ? o.ok(e)
            : o.err(
                new g(
                  's.string.email',
                  'Invalid email address',
                  e,
                  'expected to be an email address'
                )
              )
        },
      }
    }
    __name(stringEmail, 'stringEmail')
    function stringRegexValidator(e, t, r) {
      return {
        run(n) {
          return r.test(n)
            ? o.ok(n)
            : o.err(new g(e, 'Invalid string format', n, t))
        },
      }
    }
    __name(stringRegexValidator, 'stringRegexValidator')
    function stringUrl(e) {
      const t = createUrlValidators(e)
      return {
        run(e) {
          let r
          try {
            r = new URL(e)
          } catch {
            return o.err(
              new g(
                's.string.url',
                'Invalid URL',
                e,
                'expected to match an URL'
              )
            )
          }
          const n = t(e, r)
          if (n === null) return o.ok(e)
          return o.err(n)
        },
      }
    }
    __name(stringUrl, 'stringUrl')
    function stringIp(e) {
      const t = e ? `v${e}` : ''
      const r = e === 4 ? isIPv4 : e === 6 ? isIPv6 : isIP
      const n = `s.string.ip${t}`
      const a = `Invalid IP${t} address`
      const s = `expected to be an IP${t} address`
      return {
        run(e) {
          return r(e) ? o.ok(e) : o.err(new g(n, a, e, s))
        },
      }
    }
    __name(stringIp, 'stringIp')
    function stringRegex(e) {
      return stringRegexValidator(
        's.string.regex',
        `expected ${e}.test(expected) to be true`,
        e
      )
    }
    __name(stringRegex, 'stringRegex')
    function stringUuid({ version: e = 4, nullable: t = false } = {}) {
      e ?? (e = '1-5')
      const r = new RegExp(
        `^(?:[0-9A-F]{8}-[0-9A-F]{4}-[${e}][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}${
          t ? '|00000000-0000-0000-0000-000000000000' : ''
        })$`,
        'i'
      )
      const n = `expected to match UUID${
        typeof e === 'number' ? `v${e}` : ` in range of ${e}`
      }`
      return stringRegexValidator('s.string.uuid', n, r)
    }
    __name(stringUuid, 'stringUuid')
    function stringDate() {
      return {
        run(e) {
          const t = Date.parse(e)
          return Number.isNaN(t)
            ? o.err(
                new g(
                  's.string.date',
                  'Invalid date string',
                  e,
                  'expected to be a valid date string (in the ISO 8601 or ECMA-262 format)'
                )
              )
            : o.ok(e)
        },
      }
    }
    __name(stringDate, 'stringDate')
    function stringPhone() {
      return {
        run(e) {
          return validatePhoneNumber(e)
            ? o.ok(e)
            : o.err(
                new g(
                  's.string.phone',
                  'Invalid phone number',
                  e,
                  'expected to be a phone number'
                )
              )
        },
      }
    }
    __name(stringPhone, 'stringPhone')
    var ee = class extends u {
      lengthLessThan(e) {
        return this.addConstraint(stringLengthLessThan(e))
      }
      lengthLessThanOrEqual(e) {
        return this.addConstraint(stringLengthLessThanOrEqual(e))
      }
      lengthGreaterThan(e) {
        return this.addConstraint(stringLengthGreaterThan(e))
      }
      lengthGreaterThanOrEqual(e) {
        return this.addConstraint(stringLengthGreaterThanOrEqual(e))
      }
      lengthEqual(e) {
        return this.addConstraint(stringLengthEqual(e))
      }
      lengthNotEqual(e) {
        return this.addConstraint(stringLengthNotEqual(e))
      }
      get email() {
        return this.addConstraint(stringEmail())
      }
      url(e) {
        return this.addConstraint(stringUrl(e))
      }
      uuid(e) {
        return this.addConstraint(stringUuid(e))
      }
      regex(e) {
        return this.addConstraint(stringRegex(e))
      }
      get date() {
        return this.addConstraint(stringDate())
      }
      get ipv4() {
        return this.ip(4)
      }
      get ipv6() {
        return this.ip(6)
      }
      ip(e) {
        return this.addConstraint(stringIp(e))
      }
      phone() {
        return this.addConstraint(stringPhone())
      }
      handle(e) {
        return typeof e === 'string'
          ? o.ok(e)
          : o.err(new f('s.string', 'Expected a string primitive', e))
      }
    }
    __name(ee, 'StringValidator')
    var te = class extends u {
      constructor(e, t = []) {
        super(t)
        this.validators = []
        this.validators = e
      }
      clone() {
        return Reflect.construct(this.constructor, [
          this.validators,
          this.constraints,
        ])
      }
      handle(e) {
        if (!Array.isArray(e)) {
          return o.err(new f('s.tuple(T)', 'Expected an array', e))
        }
        if (e.length !== this.validators.length) {
          return o.err(
            new f(
              's.tuple(T)',
              `Expected an array of length ${this.validators.length}`,
              e
            )
          )
        }
        if (!this.shouldRunConstraints) {
          return o.ok(e)
        }
        const t = []
        const r = []
        for (let n = 0; n < e.length; n++) {
          const a = this.validators[n].run(e[n])
          if (a.isOk()) r.push(a.value)
          else t.push([n, a.error])
        }
        return t.length === 0 ? o.ok(r) : o.err(new y(t))
      }
    }
    __name(te, 'TupleValidator')
    var re = class extends u {
      constructor(e, t, r = []) {
        super(r)
        this.keyValidator = e
        this.valueValidator = t
      }
      clone() {
        return Reflect.construct(this.constructor, [
          this.keyValidator,
          this.valueValidator,
          this.constraints,
        ])
      }
      handle(e) {
        if (!(e instanceof Map)) {
          return o.err(new f('s.map(K, V)', 'Expected a map', e))
        }
        if (!this.shouldRunConstraints) {
          return o.ok(e)
        }
        const t = []
        const r = new Map()
        for (const [n, a] of e.entries()) {
          const e = this.keyValidator.run(n)
          const s = this.valueValidator.run(a)
          const { length: i } = t
          if (e.isErr()) t.push([n, e.error])
          if (s.isErr()) t.push([n, s.error])
          if (t.length === i) r.set(e.value, s.value)
        }
        return t.length === 0 ? o.ok(r) : o.err(new y(t))
      }
    }
    __name(re, 'MapValidator')
    var ne = class extends u {
      constructor(e, t = []) {
        super(t)
        this.validator = e
      }
      clone() {
        return Reflect.construct(this.constructor, [
          this.validator,
          this.constraints,
        ])
      }
      handle(e) {
        return this.validator(e).run(e)
      }
    }
    __name(ne, 'LazyValidator')
    var ae = class extends c {
      constructor(e, t, r) {
        super('Expected the value to be one of the following enum values:')
        this.value = e
        this.enumKeys = t
        this.enumMappings = r
      }
      toJSON() {
        return {
          name: this.name,
          value: this.value,
          enumKeys: this.enumKeys,
          enumMappings: [...this.enumMappings.entries()],
        }
      }
      [h](e, t) {
        const r = t.stylize(this.value.toString(), 'string')
        if (e < 0) {
          return t.stylize(`[UnknownEnumValueError: ${r}]`, 'special')
        }
        const n = `\n  ${t.stylize('|', 'undefined')} `
        const a = this.enumKeys
          .map((e) => {
            const r = this.enumMappings.get(e)
            return `${t.stylize(e, 'string')} or ${t.stylize(
              r.toString(),
              typeof r === 'number' ? 'number' : 'string'
            )}`
          })
          .join(n)
        const s = `${t.stylize('UnknownEnumValueError', 'special')} > ${r}`
        const i = t.stylize(this.message, 'regexp')
        const o = `${n}${a}`
        return `${s}\n  ${i}\n${o}`
      }
    }
    __name(ae, 'UnknownEnumValueError')
    var se = class extends u {
      constructor(e) {
        super()
        this.hasNumericElements = false
        this.enumMapping = new Map()
        this.enumShape = e
        this.enumKeys = Object.keys(e).filter(
          (t) => typeof e[e[t]] !== 'number'
        )
        for (const t of this.enumKeys) {
          const r = e[t]
          this.enumMapping.set(t, r)
          this.enumMapping.set(r, r)
          if (typeof r === 'number') {
            this.hasNumericElements = true
            this.enumMapping.set(`${r}`, r)
          }
        }
      }
      handle(e) {
        const t = typeof e
        if (t === 'number') {
          if (!this.hasNumericElements) {
            return o.err(
              new f('s.nativeEnum(T)', 'Expected the value to be a string', e)
            )
          }
        } else if (t !== 'string') {
          return o.err(
            new f(
              's.nativeEnum(T)',
              'Expected the value to be a string or number',
              e
            )
          )
        }
        const r = e
        const n = this.enumMapping.get(r)
        return typeof n === 'undefined'
          ? o.err(new ae(r, this.enumKeys, this.enumMapping))
          : o.ok(n)
      }
      clone() {
        return Reflect.construct(this.constructor, [this.enumShape])
      }
    }
    __name(se, 'NativeEnumValidator')
    function typedArrayByteLengthComparator(e, t, r, n) {
      return {
        run(a) {
          return e(a.byteLength, n)
            ? o.ok(a)
            : o.err(new g(t, 'Invalid Typed Array byte length', a, r))
        },
      }
    }
    __name(typedArrayByteLengthComparator, 'typedArrayByteLengthComparator')
    function typedArrayByteLengthLessThan(e) {
      const t = `expected.byteLength < ${e}`
      return typedArrayByteLengthComparator(
        lessThan,
        's.typedArray(T).byteLengthLessThan',
        t,
        e
      )
    }
    __name(typedArrayByteLengthLessThan, 'typedArrayByteLengthLessThan')
    function typedArrayByteLengthLessThanOrEqual(e) {
      const t = `expected.byteLength <= ${e}`
      return typedArrayByteLengthComparator(
        lessThanOrEqual,
        's.typedArray(T).byteLengthLessThanOrEqual',
        t,
        e
      )
    }
    __name(
      typedArrayByteLengthLessThanOrEqual,
      'typedArrayByteLengthLessThanOrEqual'
    )
    function typedArrayByteLengthGreaterThan(e) {
      const t = `expected.byteLength > ${e}`
      return typedArrayByteLengthComparator(
        greaterThan,
        's.typedArray(T).byteLengthGreaterThan',
        t,
        e
      )
    }
    __name(typedArrayByteLengthGreaterThan, 'typedArrayByteLengthGreaterThan')
    function typedArrayByteLengthGreaterThanOrEqual(e) {
      const t = `expected.byteLength >= ${e}`
      return typedArrayByteLengthComparator(
        greaterThanOrEqual,
        's.typedArray(T).byteLengthGreaterThanOrEqual',
        t,
        e
      )
    }
    __name(
      typedArrayByteLengthGreaterThanOrEqual,
      'typedArrayByteLengthGreaterThanOrEqual'
    )
    function typedArrayByteLengthEqual(e) {
      const t = `expected.byteLength === ${e}`
      return typedArrayByteLengthComparator(
        equal,
        's.typedArray(T).byteLengthEqual',
        t,
        e
      )
    }
    __name(typedArrayByteLengthEqual, 'typedArrayByteLengthEqual')
    function typedArrayByteLengthNotEqual(e) {
      const t = `expected.byteLength !== ${e}`
      return typedArrayByteLengthComparator(
        notEqual,
        's.typedArray(T).byteLengthNotEqual',
        t,
        e
      )
    }
    __name(typedArrayByteLengthNotEqual, 'typedArrayByteLengthNotEqual')
    function typedArrayByteLengthRange(e, t) {
      const r = `expected.byteLength >= ${e} && expected.byteLength < ${t}`
      return {
        run(n) {
          return n.byteLength >= e && n.byteLength < t
            ? o.ok(n)
            : o.err(
                new g(
                  's.typedArray(T).byteLengthRange',
                  'Invalid Typed Array byte length',
                  n,
                  r
                )
              )
        },
      }
    }
    __name(typedArrayByteLengthRange, 'typedArrayByteLengthRange')
    function typedArrayByteLengthRangeInclusive(e, t) {
      const r = `expected.byteLength >= ${e} && expected.byteLength <= ${t}`
      return {
        run(n) {
          return n.byteLength >= e && n.byteLength <= t
            ? o.ok(n)
            : o.err(
                new g(
                  's.typedArray(T).byteLengthRangeInclusive',
                  'Invalid Typed Array byte length',
                  n,
                  r
                )
              )
        },
      }
    }
    __name(
      typedArrayByteLengthRangeInclusive,
      'typedArrayByteLengthRangeInclusive'
    )
    function typedArrayByteLengthRangeExclusive(e, t) {
      const r = `expected.byteLength > ${e} && expected.byteLength < ${t}`
      return {
        run(n) {
          return n.byteLength > e && n.byteLength < t
            ? o.ok(n)
            : o.err(
                new g(
                  's.typedArray(T).byteLengthRangeExclusive',
                  'Invalid Typed Array byte length',
                  n,
                  r
                )
              )
        },
      }
    }
    __name(
      typedArrayByteLengthRangeExclusive,
      'typedArrayByteLengthRangeExclusive'
    )
    function typedArrayLengthComparator(e, t, r, n) {
      return {
        run(a) {
          return e(a.length, n)
            ? o.ok(a)
            : o.err(new g(t, 'Invalid Typed Array length', a, r))
        },
      }
    }
    __name(typedArrayLengthComparator, 'typedArrayLengthComparator')
    function typedArrayLengthLessThan(e) {
      const t = `expected.length < ${e}`
      return typedArrayLengthComparator(
        lessThan,
        's.typedArray(T).lengthLessThan',
        t,
        e
      )
    }
    __name(typedArrayLengthLessThan, 'typedArrayLengthLessThan')
    function typedArrayLengthLessThanOrEqual(e) {
      const t = `expected.length <= ${e}`
      return typedArrayLengthComparator(
        lessThanOrEqual,
        's.typedArray(T).lengthLessThanOrEqual',
        t,
        e
      )
    }
    __name(typedArrayLengthLessThanOrEqual, 'typedArrayLengthLessThanOrEqual')
    function typedArrayLengthGreaterThan(e) {
      const t = `expected.length > ${e}`
      return typedArrayLengthComparator(
        greaterThan,
        's.typedArray(T).lengthGreaterThan',
        t,
        e
      )
    }
    __name(typedArrayLengthGreaterThan, 'typedArrayLengthGreaterThan')
    function typedArrayLengthGreaterThanOrEqual(e) {
      const t = `expected.length >= ${e}`
      return typedArrayLengthComparator(
        greaterThanOrEqual,
        's.typedArray(T).lengthGreaterThanOrEqual',
        t,
        e
      )
    }
    __name(
      typedArrayLengthGreaterThanOrEqual,
      'typedArrayLengthGreaterThanOrEqual'
    )
    function typedArrayLengthEqual(e) {
      const t = `expected.length === ${e}`
      return typedArrayLengthComparator(
        equal,
        's.typedArray(T).lengthEqual',
        t,
        e
      )
    }
    __name(typedArrayLengthEqual, 'typedArrayLengthEqual')
    function typedArrayLengthNotEqual(e) {
      const t = `expected.length !== ${e}`
      return typedArrayLengthComparator(
        notEqual,
        's.typedArray(T).lengthNotEqual',
        t,
        e
      )
    }
    __name(typedArrayLengthNotEqual, 'typedArrayLengthNotEqual')
    function typedArrayLengthRange(e, t) {
      const r = `expected.length >= ${e} && expected.length < ${t}`
      return {
        run(n) {
          return n.length >= e && n.length < t
            ? o.ok(n)
            : o.err(
                new g(
                  's.typedArray(T).lengthRange',
                  'Invalid Typed Array length',
                  n,
                  r
                )
              )
        },
      }
    }
    __name(typedArrayLengthRange, 'typedArrayLengthRange')
    function typedArrayLengthRangeInclusive(e, t) {
      const r = `expected.length >= ${e} && expected.length <= ${t}`
      return {
        run(n) {
          return n.length >= e && n.length <= t
            ? o.ok(n)
            : o.err(
                new g(
                  's.typedArray(T).lengthRangeInclusive',
                  'Invalid Typed Array length',
                  n,
                  r
                )
              )
        },
      }
    }
    __name(typedArrayLengthRangeInclusive, 'typedArrayLengthRangeInclusive')
    function typedArrayLengthRangeExclusive(e, t) {
      const r = `expected.length > ${e} && expected.length < ${t}`
      return {
        run(n) {
          return n.length > e && n.length < t
            ? o.ok(n)
            : o.err(
                new g(
                  's.typedArray(T).lengthRangeExclusive',
                  'Invalid Typed Array length',
                  n,
                  r
                )
              )
        },
      }
    }
    __name(typedArrayLengthRangeExclusive, 'typedArrayLengthRangeExclusive')
    var ie = ['a', 'e', 'i', 'o', 'u']
    var oe = __name(
      (e) => `${ie.includes(e[0].toLowerCase()) ? 'an' : 'a'} ${e}`,
      'aOrAn'
    )
    var ue = {
      Int8Array: (e) => e instanceof Int8Array,
      Uint8Array: (e) => e instanceof Uint8Array,
      Uint8ClampedArray: (e) => e instanceof Uint8ClampedArray,
      Int16Array: (e) => e instanceof Int16Array,
      Uint16Array: (e) => e instanceof Uint16Array,
      Int32Array: (e) => e instanceof Int32Array,
      Uint32Array: (e) => e instanceof Uint32Array,
      Float32Array: (e) => e instanceof Float32Array,
      Float64Array: (e) => e instanceof Float64Array,
      BigInt64Array: (e) => e instanceof BigInt64Array,
      BigUint64Array: (e) => e instanceof BigUint64Array,
      TypedArray: (e) => ArrayBuffer.isView(e) && !(e instanceof DataView),
    }
    var le = class extends u {
      constructor(e, t = []) {
        super(t)
        this.type = e
      }
      byteLengthLessThan(e) {
        return this.addConstraint(typedArrayByteLengthLessThan(e))
      }
      byteLengthLessThanOrEqual(e) {
        return this.addConstraint(typedArrayByteLengthLessThanOrEqual(e))
      }
      byteLengthGreaterThan(e) {
        return this.addConstraint(typedArrayByteLengthGreaterThan(e))
      }
      byteLengthGreaterThanOrEqual(e) {
        return this.addConstraint(typedArrayByteLengthGreaterThanOrEqual(e))
      }
      byteLengthEqual(e) {
        return this.addConstraint(typedArrayByteLengthEqual(e))
      }
      byteLengthNotEqual(e) {
        return this.addConstraint(typedArrayByteLengthNotEqual(e))
      }
      byteLengthRange(e, t) {
        return this.addConstraint(typedArrayByteLengthRange(e, t))
      }
      byteLengthRangeInclusive(e, t) {
        return this.addConstraint(typedArrayByteLengthRangeInclusive(e, t))
      }
      byteLengthRangeExclusive(e, t) {
        return this.addConstraint(typedArrayByteLengthRangeExclusive(e, t))
      }
      lengthLessThan(e) {
        return this.addConstraint(typedArrayLengthLessThan(e))
      }
      lengthLessThanOrEqual(e) {
        return this.addConstraint(typedArrayLengthLessThanOrEqual(e))
      }
      lengthGreaterThan(e) {
        return this.addConstraint(typedArrayLengthGreaterThan(e))
      }
      lengthGreaterThanOrEqual(e) {
        return this.addConstraint(typedArrayLengthGreaterThanOrEqual(e))
      }
      lengthEqual(e) {
        return this.addConstraint(typedArrayLengthEqual(e))
      }
      lengthNotEqual(e) {
        return this.addConstraint(typedArrayLengthNotEqual(e))
      }
      lengthRange(e, t) {
        return this.addConstraint(typedArrayLengthRange(e, t))
      }
      lengthRangeInclusive(e, t) {
        return this.addConstraint(typedArrayLengthRangeInclusive(e, t))
      }
      lengthRangeExclusive(e, t) {
        return this.addConstraint(typedArrayLengthRangeExclusive(e, t))
      }
      clone() {
        return Reflect.construct(this.constructor, [
          this.type,
          this.constraints,
        ])
      }
      handle(e) {
        return ue[this.type](e)
          ? o.ok(e)
          : o.err(new f('s.typedArray', `Expected ${oe(this.type)}`, e))
      }
    }
    __name(le, 'TypedArrayValidator')
    var he = class {
      get string() {
        return new ee()
      }
      get number() {
        return new G()
      }
      get bigint() {
        return new b()
      }
      get boolean() {
        return new L()
      }
      get date() {
        return new q()
      }
      object(e) {
        return new P(e)
      }
      get undefined() {
        return this.literal(void 0)
      }
      get null() {
        return this.literal(null)
      }
      get nullish() {
        return new O()
      }
      get any() {
        return new M()
      }
      get unknown() {
        return new M()
      }
      get never() {
        return new w()
      }
      enum(...e) {
        return this.union(...e.map((e) => this.literal(e)))
      }
      nativeEnum(e) {
        return new se(e)
      }
      literal(e) {
        if (e instanceof Date) return this.date.equal(e)
        return new A(e)
      }
      instance(e) {
        return new C(e)
      }
      union(...e) {
        return new U(e)
      }
      array(e) {
        return new v(e)
      }
      typedArray(e = 'TypedArray') {
        return new le(e)
      }
      get int8Array() {
        return this.typedArray('Int8Array')
      }
      get uint8Array() {
        return this.typedArray('Uint8Array')
      }
      get uint8ClampedArray() {
        return this.typedArray('Uint8ClampedArray')
      }
      get int16Array() {
        return this.typedArray('Int16Array')
      }
      get uint16Array() {
        return this.typedArray('Uint16Array')
      }
      get int32Array() {
        return this.typedArray('Int32Array')
      }
      get uint32Array() {
        return this.typedArray('Uint32Array')
      }
      get float32Array() {
        return this.typedArray('Float32Array')
      }
      get float64Array() {
        return this.typedArray('Float64Array')
      }
      get bigInt64Array() {
        return this.typedArray('BigInt64Array')
      }
      get bigUint64Array() {
        return this.typedArray('BigUint64Array')
      }
      tuple(e) {
        return new te(e)
      }
      set(e) {
        return new F(e)
      }
      record(e) {
        return new j(e)
      }
      map(e, t) {
        return new re(e, t)
      }
      lazy(e) {
        return new ne(e)
      }
    }
    __name(he, 'Shapes')
    var ce = new he()
    e.BaseError = c
    e.CombinedError = z
    e.CombinedPropertyError = y
    e.ExpectedConstraintError = g
    e.ExpectedValidationError = $
    e.MissingPropertyError = V
    e.MultiplePossibilitiesConstraintError = Y
    e.Result = o
    e.UnknownEnumValueError = ae
    e.UnknownPropertyError = S
    e.ValidationError = f
    e.customInspectSymbol = l
    e.customInspectSymbolStackLess = h
    e.getGlobalValidationEnabled = getGlobalValidationEnabled
    e.s = ce
    e.setGlobalValidationEnabled = setGlobalValidationEnabled
  })()
  module.exports = r
})()