;(() => {
  'use strict'
  var e = {
    989: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.AggregateAjvError = t.AjvError = void 0
      const i = r(866)
      const a = r(385)
      const n = {
        fieldLabels: 'title',
        includeOriginalError: false,
        includeData: false,
      }
      class AjvError extends Error {
        constructor(e, t = {}) {
          super()
          this.options = {}
          this.redundant = false
          this.options = { ...n, ...t }
          this.pointer = e.instancePath
          this.path = a.jsonPath(e.instancePath)
          const r = i.getMessage(e, this.options)
          if (r === null) {
            this.redundant = true
            return
          }
          this.message = `${a.capitalize(r)}.`
          if (this.options.includeOriginalError) {
            this.original = e
          }
          if (this.options.includeData) {
            this.data = e.data
          }
        }
        toJSON() {
          const e = {
            path: this.path,
            pointer: this.pointer,
            message: this.message,
          }
          if (this.options.includeOriginalError) {
            e.original = this.original
          }
          if (this.options.includeData) {
            e.data = this.data
          }
          return e
        }
      }
      t.AjvError = AjvError
      class AggregateAjvError extends Error {
        constructor(e, t = {}) {
          super()
          this.name = 'AggregateAjvError'
          this.errors = (e !== null && e !== void 0 ? e : [])
            .map((e) => new AjvError(e, t))
            .filter((e) => !e.redundant)
          this.message = this.errors.map((e) => e.message).join(' ')
        }
        toJSON() {
          return this.errors.map((e) => e.toJSON())
        }
        *[Symbol.iterator]() {
          for (const e of this.errors) {
            yield e
          }
        }
      }
      t.AggregateAjvError = AggregateAjvError
    },
    866: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.getMessage = t.fieldPreamble = void 0
      const i = r(385)
      const a = {
        'date-time': 'date and time',
        time: 'time',
        date: 'date',
        email: 'email address',
        hostname: 'hostname',
        ipv4: 'IPv4 address',
        ipv6: 'IPv6 address',
        uri: 'URI',
        'uri-reference': 'URI Reference',
        'uri-template': 'URI-template',
        'json-pointer': 'JSON Pointer',
        'relative-json-pointer': 'relative JSON Pointer',
        regex: 'regular expression',
      }
      const fieldPreamble = (
        { instancePath: e, parentSchema: t },
        { fieldLabels: r }
      ) => {
        switch (r) {
          case 'js':
            if (e === '') {
              return 'the root value'
            }
            return `the value at ${i.jsonPath(e).replace(/^\$/, '')}`
          case 'jsonPath':
            return `the value at ${i.jsonPath(e)}`
          case 'jsonPointer':
          case 'instancePath':
            if (e === '') {
              return 'the root value'
            }
            return `the value at ${e}`
          case 'title':
            if (t === null || t === void 0 ? void 0 : t.title) {
              return t.title
            }
            if (e === '') {
              return 'the root value'
            }
            return `the value at ${e}`
          default:
            throw new Error(`invalid fieldLabels value: ${r}`)
        }
      }
      t.fieldPreamble = fieldPreamble
      const getMessage = (
        {
          data: e,
          keyword: r,
          message: n,
          params: s,
          parentSchema: o,
          schemaPath: u,
          instancePath: l,
        },
        { fieldLabels: c }
      ) => {
        const h = t.fieldPreamble(
          { instancePath: l, parentSchema: o },
          { fieldLabels: c }
        )
        if (o === null || o === void 0 ? void 0 : o.errorMessage) {
          return `${h} ${o.errorMessage}`
        }
        switch (r) {
          case 'enum': {
            const e = s.allowedValues.map(JSON.stringify)
            const t = i.humanizeList(e, 'or')
            return `${h} must be one of: ${t}`
          }
          case 'type': {
            const t = Array.isArray(s.type) ? s.type : s.type.split(',')
            const r = i.humanizeList(t, 'or')
            const a = i.humanizeTypeOf(e)
            return `${h} must be ${i.indefiniteArticle(r)} ${r} but it was ${a}`
          }
          case 'minLength': {
            const t = s.limit
            const r = i.pluralize('character', t)
            const a = e.length
            const n = i.pluralize('character', a)
            return `${h} must be ${t} ${r} or more but it was ${a} ${n}`
          }
          case 'maxLength': {
            const t = s.limit
            const r = i.pluralize('character', t)
            const a = e.length
            const n = i.pluralize('character', a)
            return `${h} must be ${t} ${r} or fewer but it was ${a} ${n}`
          }
          case 'pattern': {
            if (u.endsWith('propertyNames/pattern')) return null
            const e = o === null || o === void 0 ? void 0 : o.patternLabel
            if (e) {
              return `${h} must be ${e} but it was not`
            } else {
              return `${h} is an invalid string`
            }
          }
          case 'format': {
            const e = a[s.format] || s.format
            return `${h} must be a valid ${e} string but it was not`
          }
          case 'multipleOf': {
            return `${h} must be a multiple of ${s.multipleOf}`
          }
          case 'minimum': {
            return `${h} must be equal to or greater than ${s.limit}`
          }
          case 'exclusiveMinimum': {
            return `${h} must be greater than ${s.limit}`
          }
          case 'maximum': {
            return `${h} must be equal to or less than ${s.limit}`
          }
          case 'exclusiveMaximum': {
            return `${h} must be less than ${s.limit}`
          }
          case 'additionalProperties': {
            const e = Object.keys(
              o === null || o === void 0 ? void 0 : o.properties
            ).join(', ')
            const t = s.additionalProperty
            return `${h} has an unexpected property, ${t}, which is not in the list of allowed properties (${e})`
          }
          case 'required': {
            const e = s.missingProperty
            return `${h} is missing the required field '${e}'`
          }
          case 'propertyNames': {
            return `${h} has an invalid property name ${JSON.stringify(
              s.propertyName
            )}`
          }
          case 'minProperties': {
            const t = s.limit
            const r = Object.keys(e).length
            return `${h} must have ${t} or more properties but it has ${r}`
          }
          case 'maxProperties': {
            const t = s.limit
            const r = Object.keys(e).length
            return `${h} must have ${t} or fewer properties but it has ${r}`
          }
          case 'dependencies': {
            const e = s.property
            const t = s.missingProperty
            return `${h} must have property ${t} when ${e} is present`
          }
          case 'minItems': {
            const t = s.limit
            const r = e.length
            return `${h} must have ${t} or more items but it has ${r}`
          }
          case 'maxItems': {
            const t = s.limit
            const r = e.length
            return `${h} must have ${t} or fewer items but it has ${r}`
          }
          case 'uniqueItems': {
            const { i: e, j: t } = s
            return `${h} must be unique but elements ${t} and ${e} are the same`
          }
          default:
            return `${h} ${n}`
        }
      }
      t.getMessage = getMessage
    },
    385: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.humanizeList =
        t.humanizeTypeOf =
        t.indefiniteArticle =
        t.humanizePath =
        t.jsonPath =
        t.pluralize =
        t.capitalize =
          void 0
      const capitalize = (e) => {
        if (typeof e !== 'string' || e.length === 0) {
          return e
        }
        return e.charAt(0).toUpperCase() + e.slice(1)
      }
      t.capitalize = capitalize
      const pluralize = (e, t) => {
        if (t === 1) {
          return e
        }
        return `${e}s`
      }
      t.pluralize = pluralize
      const jsonPath = (e) => {
        if (e === '') {
          return '$'
        }
        const t = e
          .substring(1)
          .split(/\//)
          .map((e) =>
            e.replace(/~1/g, '/').replace(/~0/g, '~').replace(/\./g, '\\.')
          )
          .map((e) => {
            if (/^\d+$/.exec(e)) {
              return `[${e}]`
            }
            return `.${e}`
          })
          .join('')
        return '$' + t
      }
      t.jsonPath = jsonPath
      const humanizePath = (e) => {
        if (e === '') {
          return 'the root value'
        }
        return `the value at ${t.jsonPath(e)}`
      }
      t.humanizePath = humanizePath
      const indefiniteArticle = (e) => {
        switch (e[0]) {
          case 'a':
          case 'e':
          case 'i':
          case 'o':
          case 'u':
            return 'an'
          default:
            return 'a'
        }
      }
      t.indefiniteArticle = indefiniteArticle
      const humanizeTypeOf = (e) => {
        const r = typeof e
        switch (r) {
          case 'object':
            if (e === null) {
              return 'null'
            }
            if (Array.isArray(e)) {
              return 'an array'
            }
            return 'an object'
          case 'undefined':
            return 'undefined'
          default:
            return `${t.indefiniteArticle(r)} ${r}`
        }
      }
      t.humanizeTypeOf = humanizeTypeOf
      const humanizeList = (e, t = 'and') => {
        if (e.length === 0) {
          return 'nothing'
        }
        if (e.length === 1) {
          return e[0]
        }
        if (e.length === 2) {
          return `${e[0]} ${t} ${e[1]}`
        }
        return `${e.slice(0, -1).join(', ')}, ${t} ${e[e.length - 1]}`
      }
      t.humanizeList = humanizeList
    },
  }
  var t = {}
  function __nccwpck_require__(r) {
    var i = t[r]
    if (i !== undefined) {
      return i.exports
    }
    var a = (t[r] = { exports: {} })
    var n = true
    try {
      e[r](a, a.exports, __nccwpck_require__)
      n = false
    } finally {
      if (n) delete t[r]
    }
    return a.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var r = {}
  ;(() => {
    var e = r
    Object.defineProperty(e, '__esModule', { value: true })
    e.AggregateAjvError = void 0
    var t = __nccwpck_require__(989)
    Object.defineProperty(e, 'AggregateAjvError', {
      enumerable: true,
      get: function () {
        return t.AggregateAjvError
      },
    })
  })()
  module.exports = r
})()
