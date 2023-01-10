;(() => {
  var __webpack_modules__ = {
    28: (e, t, s) => {
      'use strict'
      const r = s(335)
      r.createWebSocketStream = s(551)
      r.Server = s(597)
      r.Receiver = s(157)
      r.Sender = s(769)
      r.WebSocket = r
      r.WebSocketServer = r.Server
      e.exports = r
    },
    214: (e, t, s) => {
      'use strict'
      const { EMPTY_BUFFER: r } = s(217)
      function concat(e, t) {
        if (e.length === 0) return r
        if (e.length === 1) return e[0]
        const s = Buffer.allocUnsafe(t)
        let n = 0
        for (let t = 0; t < e.length; t++) {
          const r = e[t]
          s.set(r, n)
          n += r.length
        }
        if (n < t) return s.slice(0, n)
        return s
      }
      function _mask(e, t, s, r, n) {
        for (let i = 0; i < n; i++) {
          s[r + i] = e[i] ^ t[i & 3]
        }
      }
      function _unmask(e, t) {
        for (let s = 0; s < e.length; s++) {
          e[s] ^= t[s & 3]
        }
      }
      function toArrayBuffer(e) {
        if (e.byteLength === e.buffer.byteLength) {
          return e.buffer
        }
        return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength)
      }
      function toBuffer(e) {
        toBuffer.readOnly = true
        if (Buffer.isBuffer(e)) return e
        let t
        if (e instanceof ArrayBuffer) {
          t = Buffer.from(e)
        } else if (ArrayBuffer.isView(e)) {
          t = Buffer.from(e.buffer, e.byteOffset, e.byteLength)
        } else {
          t = Buffer.from(e)
          toBuffer.readOnly = false
        }
        return t
      }
      try {
        const t = s(605)
        e.exports = {
          concat: concat,
          mask(e, s, r, n, i) {
            if (i < 48) _mask(e, s, r, n, i)
            else t.mask(e, s, r, n, i)
          },
          toArrayBuffer: toArrayBuffer,
          toBuffer: toBuffer,
          unmask(e, s) {
            if (e.length < 32) _unmask(e, s)
            else t.unmask(e, s)
          },
        }
      } catch (t) {
        e.exports = {
          concat: concat,
          mask: _mask,
          toArrayBuffer: toArrayBuffer,
          toBuffer: toBuffer,
          unmask: _unmask,
        }
      }
    },
    217: (e) => {
      'use strict'
      e.exports = {
        BINARY_TYPES: ['nodebuffer', 'arraybuffer', 'fragments'],
        EMPTY_BUFFER: Buffer.alloc(0),
        GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
        kForOnEventAttribute: Symbol('kIsForOnEventAttribute'),
        kListener: Symbol('kListener'),
        kStatusCode: Symbol('status-code'),
        kWebSocket: Symbol('websocket'),
        NOOP: () => {},
      }
    },
    874: (e, t, s) => {
      'use strict'
      const { kForOnEventAttribute: r, kListener: n } = s(217)
      const i = Symbol('kCode')
      const o = Symbol('kData')
      const a = Symbol('kError')
      const c = Symbol('kMessage')
      const l = Symbol('kReason')
      const f = Symbol('kTarget')
      const h = Symbol('kType')
      const d = Symbol('kWasClean')
      class Event {
        constructor(e) {
          this[f] = null
          this[h] = e
        }
        get target() {
          return this[f]
        }
        get type() {
          return this[h]
        }
      }
      Object.defineProperty(Event.prototype, 'target', { enumerable: true })
      Object.defineProperty(Event.prototype, 'type', { enumerable: true })
      class CloseEvent extends Event {
        constructor(e, t = {}) {
          super(e)
          this[i] = t.code === undefined ? 0 : t.code
          this[l] = t.reason === undefined ? '' : t.reason
          this[d] = t.wasClean === undefined ? false : t.wasClean
        }
        get code() {
          return this[i]
        }
        get reason() {
          return this[l]
        }
        get wasClean() {
          return this[d]
        }
      }
      Object.defineProperty(CloseEvent.prototype, 'code', { enumerable: true })
      Object.defineProperty(CloseEvent.prototype, 'reason', {
        enumerable: true,
      })
      Object.defineProperty(CloseEvent.prototype, 'wasClean', {
        enumerable: true,
      })
      class ErrorEvent extends Event {
        constructor(e, t = {}) {
          super(e)
          this[a] = t.error === undefined ? null : t.error
          this[c] = t.message === undefined ? '' : t.message
        }
        get error() {
          return this[a]
        }
        get message() {
          return this[c]
        }
      }
      Object.defineProperty(ErrorEvent.prototype, 'error', { enumerable: true })
      Object.defineProperty(ErrorEvent.prototype, 'message', {
        enumerable: true,
      })
      class MessageEvent extends Event {
        constructor(e, t = {}) {
          super(e)
          this[o] = t.data === undefined ? null : t.data
        }
        get data() {
          return this[o]
        }
      }
      Object.defineProperty(MessageEvent.prototype, 'data', {
        enumerable: true,
      })
      const u = {
        addEventListener(e, t, s = {}) {
          let i
          if (e === 'message') {
            i = function onMessage(e, s) {
              const r = new MessageEvent('message', {
                data: s ? e : e.toString(),
              })
              r[f] = this
              t.call(this, r)
            }
          } else if (e === 'close') {
            i = function onClose(e, s) {
              const r = new CloseEvent('close', {
                code: e,
                reason: s.toString(),
                wasClean: this._closeFrameReceived && this._closeFrameSent,
              })
              r[f] = this
              t.call(this, r)
            }
          } else if (e === 'error') {
            i = function onError(e) {
              const s = new ErrorEvent('error', {
                error: e,
                message: e.message,
              })
              s[f] = this
              t.call(this, s)
            }
          } else if (e === 'open') {
            i = function onOpen() {
              const e = new Event('open')
              e[f] = this
              t.call(this, e)
            }
          } else {
            return
          }
          i[r] = !!s[r]
          i[n] = t
          if (s.once) {
            this.once(e, i)
          } else {
            this.on(e, i)
          }
        },
        removeEventListener(e, t) {
          for (const s of this.listeners(e)) {
            if (s[n] === t && !s[r]) {
              this.removeListener(e, s)
              break
            }
          }
        },
      }
      e.exports = {
        CloseEvent: CloseEvent,
        ErrorEvent: ErrorEvent,
        Event: Event,
        EventTarget: u,
        MessageEvent: MessageEvent,
      }
    },
    725: (e, t, s) => {
      'use strict'
      const { tokenChars: r } = s(848)
      function push(e, t, s) {
        if (e[t] === undefined) e[t] = [s]
        else e[t].push(s)
      }
      function parse(e) {
        const t = Object.create(null)
        let s = Object.create(null)
        let n = false
        let i = false
        let o = false
        let a
        let c
        let l = -1
        let f = -1
        let h = -1
        let d = 0
        for (; d < e.length; d++) {
          f = e.charCodeAt(d)
          if (a === undefined) {
            if (h === -1 && r[f] === 1) {
              if (l === -1) l = d
            } else if (d !== 0 && (f === 32 || f === 9)) {
              if (h === -1 && l !== -1) h = d
            } else if (f === 59 || f === 44) {
              if (l === -1) {
                throw new SyntaxError(`Unexpected character at index ${d}`)
              }
              if (h === -1) h = d
              const r = e.slice(l, h)
              if (f === 44) {
                push(t, r, s)
                s = Object.create(null)
              } else {
                a = r
              }
              l = h = -1
            } else {
              throw new SyntaxError(`Unexpected character at index ${d}`)
            }
          } else if (c === undefined) {
            if (h === -1 && r[f] === 1) {
              if (l === -1) l = d
            } else if (f === 32 || f === 9) {
              if (h === -1 && l !== -1) h = d
            } else if (f === 59 || f === 44) {
              if (l === -1) {
                throw new SyntaxError(`Unexpected character at index ${d}`)
              }
              if (h === -1) h = d
              push(s, e.slice(l, h), true)
              if (f === 44) {
                push(t, a, s)
                s = Object.create(null)
                a = undefined
              }
              l = h = -1
            } else if (f === 61 && l !== -1 && h === -1) {
              c = e.slice(l, d)
              l = h = -1
            } else {
              throw new SyntaxError(`Unexpected character at index ${d}`)
            }
          } else {
            if (i) {
              if (r[f] !== 1) {
                throw new SyntaxError(`Unexpected character at index ${d}`)
              }
              if (l === -1) l = d
              else if (!n) n = true
              i = false
            } else if (o) {
              if (r[f] === 1) {
                if (l === -1) l = d
              } else if (f === 34 && l !== -1) {
                o = false
                h = d
              } else if (f === 92) {
                i = true
              } else {
                throw new SyntaxError(`Unexpected character at index ${d}`)
              }
            } else if (f === 34 && e.charCodeAt(d - 1) === 61) {
              o = true
            } else if (h === -1 && r[f] === 1) {
              if (l === -1) l = d
            } else if (l !== -1 && (f === 32 || f === 9)) {
              if (h === -1) h = d
            } else if (f === 59 || f === 44) {
              if (l === -1) {
                throw new SyntaxError(`Unexpected character at index ${d}`)
              }
              if (h === -1) h = d
              let r = e.slice(l, h)
              if (n) {
                r = r.replace(/\\/g, '')
                n = false
              }
              push(s, c, r)
              if (f === 44) {
                push(t, a, s)
                s = Object.create(null)
                a = undefined
              }
              c = undefined
              l = h = -1
            } else {
              throw new SyntaxError(`Unexpected character at index ${d}`)
            }
          }
        }
        if (l === -1 || o || f === 32 || f === 9) {
          throw new SyntaxError('Unexpected end of input')
        }
        if (h === -1) h = d
        const u = e.slice(l, h)
        if (a === undefined) {
          push(t, u, s)
        } else {
          if (c === undefined) {
            push(s, u, true)
          } else if (n) {
            push(s, c, u.replace(/\\/g, ''))
          } else {
            push(s, c, u)
          }
          push(t, a, s)
        }
        return t
      }
      function format(e) {
        return Object.keys(e)
          .map((t) => {
            let s = e[t]
            if (!Array.isArray(s)) s = [s]
            return s
              .map((e) =>
                [t]
                  .concat(
                    Object.keys(e).map((t) => {
                      let s = e[t]
                      if (!Array.isArray(s)) s = [s]
                      return s
                        .map((e) => (e === true ? t : `${t}=${e}`))
                        .join('; ')
                    })
                  )
                  .join('; ')
              )
              .join(', ')
          })
          .join(', ')
      }
      e.exports = { format: format, parse: parse }
    },
    462: (e) => {
      'use strict'
      const t = Symbol('kDone')
      const s = Symbol('kRun')
      class Limiter {
        constructor(e) {
          this[t] = () => {
            this.pending--
            this[s]()
          }
          this.concurrency = e || Infinity
          this.jobs = []
          this.pending = 0
        }
        add(e) {
          this.jobs.push(e)
          this[s]()
        }
        [s]() {
          if (this.pending === this.concurrency) return
          if (this.jobs.length) {
            const e = this.jobs.shift()
            this.pending++
            e(this[t])
          }
        }
      }
      e.exports = Limiter
    },
    290: (e, t, s) => {
      'use strict'
      const r = s(796)
      const n = s(214)
      const i = s(462)
      const { kStatusCode: o } = s(217)
      const a = Buffer.from([0, 0, 255, 255])
      const c = Symbol('permessage-deflate')
      const l = Symbol('total-length')
      const f = Symbol('callback')
      const h = Symbol('buffers')
      const d = Symbol('error')
      let u
      class PerMessageDeflate {
        constructor(e, t, s) {
          this._maxPayload = s | 0
          this._options = e || {}
          this._threshold =
            this._options.threshold !== undefined
              ? this._options.threshold
              : 1024
          this._isServer = !!t
          this._deflate = null
          this._inflate = null
          this.params = null
          if (!u) {
            const e =
              this._options.concurrencyLimit !== undefined
                ? this._options.concurrencyLimit
                : 10
            u = new i(e)
          }
        }
        static get extensionName() {
          return 'permessage-deflate'
        }
        offer() {
          const e = {}
          if (this._options.serverNoContextTakeover) {
            e.server_no_context_takeover = true
          }
          if (this._options.clientNoContextTakeover) {
            e.client_no_context_takeover = true
          }
          if (this._options.serverMaxWindowBits) {
            e.server_max_window_bits = this._options.serverMaxWindowBits
          }
          if (this._options.clientMaxWindowBits) {
            e.client_max_window_bits = this._options.clientMaxWindowBits
          } else if (this._options.clientMaxWindowBits == null) {
            e.client_max_window_bits = true
          }
          return e
        }
        accept(e) {
          e = this.normalizeParams(e)
          this.params = this._isServer
            ? this.acceptAsServer(e)
            : this.acceptAsClient(e)
          return this.params
        }
        cleanup() {
          if (this._inflate) {
            this._inflate.close()
            this._inflate = null
          }
          if (this._deflate) {
            const e = this._deflate[f]
            this._deflate.close()
            this._deflate = null
            if (e) {
              e(
                new Error(
                  'The deflate stream was closed while data was being processed'
                )
              )
            }
          }
        }
        acceptAsServer(e) {
          const t = this._options
          const s = e.find((e) => {
            if (
              (t.serverNoContextTakeover === false &&
                e.server_no_context_takeover) ||
              (e.server_max_window_bits &&
                (t.serverMaxWindowBits === false ||
                  (typeof t.serverMaxWindowBits === 'number' &&
                    t.serverMaxWindowBits > e.server_max_window_bits))) ||
              (typeof t.clientMaxWindowBits === 'number' &&
                !e.client_max_window_bits)
            ) {
              return false
            }
            return true
          })
          if (!s) {
            throw new Error('None of the extension offers can be accepted')
          }
          if (t.serverNoContextTakeover) {
            s.server_no_context_takeover = true
          }
          if (t.clientNoContextTakeover) {
            s.client_no_context_takeover = true
          }
          if (typeof t.serverMaxWindowBits === 'number') {
            s.server_max_window_bits = t.serverMaxWindowBits
          }
          if (typeof t.clientMaxWindowBits === 'number') {
            s.client_max_window_bits = t.clientMaxWindowBits
          } else if (
            s.client_max_window_bits === true ||
            t.clientMaxWindowBits === false
          ) {
            delete s.client_max_window_bits
          }
          return s
        }
        acceptAsClient(e) {
          const t = e[0]
          if (
            this._options.clientNoContextTakeover === false &&
            t.client_no_context_takeover
          ) {
            throw new Error('Unexpected parameter "client_no_context_takeover"')
          }
          if (!t.client_max_window_bits) {
            if (typeof this._options.clientMaxWindowBits === 'number') {
              t.client_max_window_bits = this._options.clientMaxWindowBits
            }
          } else if (
            this._options.clientMaxWindowBits === false ||
            (typeof this._options.clientMaxWindowBits === 'number' &&
              t.client_max_window_bits > this._options.clientMaxWindowBits)
          ) {
            throw new Error(
              'Unexpected or invalid parameter "client_max_window_bits"'
            )
          }
          return t
        }
        normalizeParams(e) {
          e.forEach((e) => {
            Object.keys(e).forEach((t) => {
              let s = e[t]
              if (s.length > 1) {
                throw new Error(
                  `Parameter "${t}" must have only a single value`
                )
              }
              s = s[0]
              if (t === 'client_max_window_bits') {
                if (s !== true) {
                  const e = +s
                  if (!Number.isInteger(e) || e < 8 || e > 15) {
                    throw new TypeError(
                      `Invalid value for parameter "${t}": ${s}`
                    )
                  }
                  s = e
                } else if (!this._isServer) {
                  throw new TypeError(
                    `Invalid value for parameter "${t}": ${s}`
                  )
                }
              } else if (t === 'server_max_window_bits') {
                const e = +s
                if (!Number.isInteger(e) || e < 8 || e > 15) {
                  throw new TypeError(
                    `Invalid value for parameter "${t}": ${s}`
                  )
                }
                s = e
              } else if (
                t === 'client_no_context_takeover' ||
                t === 'server_no_context_takeover'
              ) {
                if (s !== true) {
                  throw new TypeError(
                    `Invalid value for parameter "${t}": ${s}`
                  )
                }
              } else {
                throw new Error(`Unknown parameter "${t}"`)
              }
              e[t] = s
            })
          })
          return e
        }
        decompress(e, t, s) {
          u.add((r) => {
            this._decompress(e, t, (e, t) => {
              r()
              s(e, t)
            })
          })
        }
        compress(e, t, s) {
          u.add((r) => {
            this._compress(e, t, (e, t) => {
              r()
              s(e, t)
            })
          })
        }
        _decompress(e, t, s) {
          const i = this._isServer ? 'client' : 'server'
          if (!this._inflate) {
            const e = `${i}_max_window_bits`
            const t =
              typeof this.params[e] !== 'number'
                ? r.Z_DEFAULT_WINDOWBITS
                : this.params[e]
            this._inflate = r.createInflateRaw({
              ...this._options.zlibInflateOptions,
              windowBits: t,
            })
            this._inflate[c] = this
            this._inflate[l] = 0
            this._inflate[h] = []
            this._inflate.on('error', inflateOnError)
            this._inflate.on('data', inflateOnData)
          }
          this._inflate[f] = s
          this._inflate.write(e)
          if (t) this._inflate.write(a)
          this._inflate.flush(() => {
            const e = this._inflate[d]
            if (e) {
              this._inflate.close()
              this._inflate = null
              s(e)
              return
            }
            const r = n.concat(this._inflate[h], this._inflate[l])
            if (this._inflate._readableState.endEmitted) {
              this._inflate.close()
              this._inflate = null
            } else {
              this._inflate[l] = 0
              this._inflate[h] = []
              if (t && this.params[`${i}_no_context_takeover`]) {
                this._inflate.reset()
              }
            }
            s(null, r)
          })
        }
        _compress(e, t, s) {
          const i = this._isServer ? 'server' : 'client'
          if (!this._deflate) {
            const e = `${i}_max_window_bits`
            const t =
              typeof this.params[e] !== 'number'
                ? r.Z_DEFAULT_WINDOWBITS
                : this.params[e]
            this._deflate = r.createDeflateRaw({
              ...this._options.zlibDeflateOptions,
              windowBits: t,
            })
            this._deflate[l] = 0
            this._deflate[h] = []
            this._deflate.on('data', deflateOnData)
          }
          this._deflate[f] = s
          this._deflate.write(e)
          this._deflate.flush(r.Z_SYNC_FLUSH, () => {
            if (!this._deflate) {
              return
            }
            let e = n.concat(this._deflate[h], this._deflate[l])
            if (t) e = e.slice(0, e.length - 4)
            this._deflate[f] = null
            this._deflate[l] = 0
            this._deflate[h] = []
            if (t && this.params[`${i}_no_context_takeover`]) {
              this._deflate.reset()
            }
            s(null, e)
          })
        }
      }
      e.exports = PerMessageDeflate
      function deflateOnData(e) {
        this[h].push(e)
        this[l] += e.length
      }
      function inflateOnData(e) {
        this[l] += e.length
        if (this[c]._maxPayload < 1 || this[l] <= this[c]._maxPayload) {
          this[h].push(e)
          return
        }
        this[d] = new RangeError('Max payload size exceeded')
        this[d].code = 'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
        this[d][o] = 1009
        this.removeListener('data', inflateOnData)
        this.reset()
      }
      function inflateOnError(e) {
        this[c]._inflate = null
        e[o] = 1007
        this[f](e)
      }
    },
    157: (e, t, s) => {
      'use strict'
      const { Writable: r } = s(781)
      const n = s(290)
      const {
        BINARY_TYPES: i,
        EMPTY_BUFFER: o,
        kStatusCode: a,
        kWebSocket: c,
      } = s(217)
      const { concat: l, toArrayBuffer: f, unmask: h } = s(214)
      const { isValidStatusCode: d, isValidUTF8: u } = s(848)
      const _ = 0
      const p = 1
      const m = 2
      const b = 3
      const y = 4
      const S = 5
      class Receiver extends r {
        constructor(e = {}) {
          super()
          this._binaryType = e.binaryType || i[0]
          this._extensions = e.extensions || {}
          this._isServer = !!e.isServer
          this._maxPayload = e.maxPayload | 0
          this._skipUTF8Validation = !!e.skipUTF8Validation
          this[c] = undefined
          this._bufferedBytes = 0
          this._buffers = []
          this._compressed = false
          this._payloadLength = 0
          this._mask = undefined
          this._fragmented = 0
          this._masked = false
          this._fin = false
          this._opcode = 0
          this._totalPayloadLength = 0
          this._messageLength = 0
          this._fragments = []
          this._state = _
          this._loop = false
        }
        _write(e, t, s) {
          if (this._opcode === 8 && this._state == _) return s()
          this._bufferedBytes += e.length
          this._buffers.push(e)
          this.startLoop(s)
        }
        consume(e) {
          this._bufferedBytes -= e
          if (e === this._buffers[0].length) return this._buffers.shift()
          if (e < this._buffers[0].length) {
            const t = this._buffers[0]
            this._buffers[0] = t.slice(e)
            return t.slice(0, e)
          }
          const t = Buffer.allocUnsafe(e)
          do {
            const s = this._buffers[0]
            const r = t.length - e
            if (e >= s.length) {
              t.set(this._buffers.shift(), r)
            } else {
              t.set(new Uint8Array(s.buffer, s.byteOffset, e), r)
              this._buffers[0] = s.slice(e)
            }
            e -= s.length
          } while (e > 0)
          return t
        }
        startLoop(e) {
          let t
          this._loop = true
          do {
            switch (this._state) {
              case _:
                t = this.getInfo()
                break
              case p:
                t = this.getPayloadLength16()
                break
              case m:
                t = this.getPayloadLength64()
                break
              case b:
                this.getMask()
                break
              case y:
                t = this.getData(e)
                break
              default:
                this._loop = false
                return
            }
          } while (this._loop)
          e(t)
        }
        getInfo() {
          if (this._bufferedBytes < 2) {
            this._loop = false
            return
          }
          const e = this.consume(2)
          if ((e[0] & 48) !== 0) {
            this._loop = false
            return error(
              RangeError,
              'RSV2 and RSV3 must be clear',
              true,
              1002,
              'WS_ERR_UNEXPECTED_RSV_2_3'
            )
          }
          const t = (e[0] & 64) === 64
          if (t && !this._extensions[n.extensionName]) {
            this._loop = false
            return error(
              RangeError,
              'RSV1 must be clear',
              true,
              1002,
              'WS_ERR_UNEXPECTED_RSV_1'
            )
          }
          this._fin = (e[0] & 128) === 128
          this._opcode = e[0] & 15
          this._payloadLength = e[1] & 127
          if (this._opcode === 0) {
            if (t) {
              this._loop = false
              return error(
                RangeError,
                'RSV1 must be clear',
                true,
                1002,
                'WS_ERR_UNEXPECTED_RSV_1'
              )
            }
            if (!this._fragmented) {
              this._loop = false
              return error(
                RangeError,
                'invalid opcode 0',
                true,
                1002,
                'WS_ERR_INVALID_OPCODE'
              )
            }
            this._opcode = this._fragmented
          } else if (this._opcode === 1 || this._opcode === 2) {
            if (this._fragmented) {
              this._loop = false
              return error(
                RangeError,
                `invalid opcode ${this._opcode}`,
                true,
                1002,
                'WS_ERR_INVALID_OPCODE'
              )
            }
            this._compressed = t
          } else if (this._opcode > 7 && this._opcode < 11) {
            if (!this._fin) {
              this._loop = false
              return error(
                RangeError,
                'FIN must be set',
                true,
                1002,
                'WS_ERR_EXPECTED_FIN'
              )
            }
            if (t) {
              this._loop = false
              return error(
                RangeError,
                'RSV1 must be clear',
                true,
                1002,
                'WS_ERR_UNEXPECTED_RSV_1'
              )
            }
            if (this._payloadLength > 125) {
              this._loop = false
              return error(
                RangeError,
                `invalid payload length ${this._payloadLength}`,
                true,
                1002,
                'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
              )
            }
          } else {
            this._loop = false
            return error(
              RangeError,
              `invalid opcode ${this._opcode}`,
              true,
              1002,
              'WS_ERR_INVALID_OPCODE'
            )
          }
          if (!this._fin && !this._fragmented) this._fragmented = this._opcode
          this._masked = (e[1] & 128) === 128
          if (this._isServer) {
            if (!this._masked) {
              this._loop = false
              return error(
                RangeError,
                'MASK must be set',
                true,
                1002,
                'WS_ERR_EXPECTED_MASK'
              )
            }
          } else if (this._masked) {
            this._loop = false
            return error(
              RangeError,
              'MASK must be clear',
              true,
              1002,
              'WS_ERR_UNEXPECTED_MASK'
            )
          }
          if (this._payloadLength === 126) this._state = p
          else if (this._payloadLength === 127) this._state = m
          else return this.haveLength()
        }
        getPayloadLength16() {
          if (this._bufferedBytes < 2) {
            this._loop = false
            return
          }
          this._payloadLength = this.consume(2).readUInt16BE(0)
          return this.haveLength()
        }
        getPayloadLength64() {
          if (this._bufferedBytes < 8) {
            this._loop = false
            return
          }
          const e = this.consume(8)
          const t = e.readUInt32BE(0)
          if (t > Math.pow(2, 53 - 32) - 1) {
            this._loop = false
            return error(
              RangeError,
              'Unsupported WebSocket frame: payload length > 2^53 - 1',
              false,
              1009,
              'WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH'
            )
          }
          this._payloadLength = t * Math.pow(2, 32) + e.readUInt32BE(4)
          return this.haveLength()
        }
        haveLength() {
          if (this._payloadLength && this._opcode < 8) {
            this._totalPayloadLength += this._payloadLength
            if (
              this._totalPayloadLength > this._maxPayload &&
              this._maxPayload > 0
            ) {
              this._loop = false
              return error(
                RangeError,
                'Max payload size exceeded',
                false,
                1009,
                'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
              )
            }
          }
          if (this._masked) this._state = b
          else this._state = y
        }
        getMask() {
          if (this._bufferedBytes < 4) {
            this._loop = false
            return
          }
          this._mask = this.consume(4)
          this._state = y
        }
        getData(e) {
          let t = o
          if (this._payloadLength) {
            if (this._bufferedBytes < this._payloadLength) {
              this._loop = false
              return
            }
            t = this.consume(this._payloadLength)
            if (this._masked) h(t, this._mask)
          }
          if (this._opcode > 7) return this.controlMessage(t)
          if (this._compressed) {
            this._state = S
            this.decompress(t, e)
            return
          }
          if (t.length) {
            this._messageLength = this._totalPayloadLength
            this._fragments.push(t)
          }
          return this.dataMessage()
        }
        decompress(e, t) {
          const s = this._extensions[n.extensionName]
          s.decompress(e, this._fin, (e, s) => {
            if (e) return t(e)
            if (s.length) {
              this._messageLength += s.length
              if (
                this._messageLength > this._maxPayload &&
                this._maxPayload > 0
              ) {
                return t(
                  error(
                    RangeError,
                    'Max payload size exceeded',
                    false,
                    1009,
                    'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
                  )
                )
              }
              this._fragments.push(s)
            }
            const r = this.dataMessage()
            if (r) return t(r)
            this.startLoop(t)
          })
        }
        dataMessage() {
          if (this._fin) {
            const e = this._messageLength
            const t = this._fragments
            this._totalPayloadLength = 0
            this._messageLength = 0
            this._fragmented = 0
            this._fragments = []
            if (this._opcode === 2) {
              let s
              if (this._binaryType === 'nodebuffer') {
                s = l(t, e)
              } else if (this._binaryType === 'arraybuffer') {
                s = f(l(t, e))
              } else {
                s = t
              }
              this.emit('message', s, true)
            } else {
              const s = l(t, e)
              if (!this._skipUTF8Validation && !u(s)) {
                this._loop = false
                return error(
                  Error,
                  'invalid UTF-8 sequence',
                  true,
                  1007,
                  'WS_ERR_INVALID_UTF8'
                )
              }
              this.emit('message', s, false)
            }
          }
          this._state = _
        }
        controlMessage(e) {
          if (this._opcode === 8) {
            this._loop = false
            if (e.length === 0) {
              this.emit('conclude', 1005, o)
              this.end()
            } else if (e.length === 1) {
              return error(
                RangeError,
                'invalid payload length 1',
                true,
                1002,
                'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
              )
            } else {
              const t = e.readUInt16BE(0)
              if (!d(t)) {
                return error(
                  RangeError,
                  `invalid status code ${t}`,
                  true,
                  1002,
                  'WS_ERR_INVALID_CLOSE_CODE'
                )
              }
              const s = e.slice(2)
              if (!this._skipUTF8Validation && !u(s)) {
                return error(
                  Error,
                  'invalid UTF-8 sequence',
                  true,
                  1007,
                  'WS_ERR_INVALID_UTF8'
                )
              }
              this.emit('conclude', t, s)
              this.end()
            }
          } else if (this._opcode === 9) {
            this.emit('ping', e)
          } else {
            this.emit('pong', e)
          }
          this._state = _
        }
      }
      e.exports = Receiver
      function error(e, t, s, r, n) {
        const i = new e(s ? `Invalid WebSocket frame: ${t}` : t)
        Error.captureStackTrace(i, error)
        i.code = n
        i[a] = r
        return i
      }
    },
    769: (e, t, s) => {
      'use strict'
      const r = s(808)
      const n = s(404)
      const { randomFillSync: i } = s(113)
      const o = s(290)
      const { EMPTY_BUFFER: a } = s(217)
      const { isValidStatusCode: c } = s(848)
      const { mask: l, toBuffer: f } = s(214)
      const h = Buffer.alloc(4)
      class Sender {
        constructor(e, t) {
          this._extensions = t || {}
          this._socket = e
          this._firstFragment = true
          this._compress = false
          this._bufferedBytes = 0
          this._deflating = false
          this._queue = []
        }
        static frame(e, t) {
          const s = t.mask && t.readOnly
          let r = t.mask ? 6 : 2
          let n = e.length
          if (e.length >= 65536) {
            r += 8
            n = 127
          } else if (e.length > 125) {
            r += 2
            n = 126
          }
          const o = Buffer.allocUnsafe(s ? e.length + r : r)
          o[0] = t.fin ? t.opcode | 128 : t.opcode
          if (t.rsv1) o[0] |= 64
          o[1] = n
          if (n === 126) {
            o.writeUInt16BE(e.length, 2)
          } else if (n === 127) {
            o.writeUInt32BE(0, 2)
            o.writeUInt32BE(e.length, 6)
          }
          if (!t.mask) return [o, e]
          i(h, 0, 4)
          o[1] |= 128
          o[r - 4] = h[0]
          o[r - 3] = h[1]
          o[r - 2] = h[2]
          o[r - 1] = h[3]
          if (s) {
            l(e, h, o, r, e.length)
            return [o]
          }
          l(e, h, e, 0, e.length)
          return [o, e]
        }
        close(e, t, s, r) {
          let n
          if (e === undefined) {
            n = a
          } else if (typeof e !== 'number' || !c(e)) {
            throw new TypeError(
              'First argument must be a valid error code number'
            )
          } else if (t === undefined || !t.length) {
            n = Buffer.allocUnsafe(2)
            n.writeUInt16BE(e, 0)
          } else {
            const s = Buffer.byteLength(t)
            if (s > 123) {
              throw new RangeError(
                'The message must not be greater than 123 bytes'
              )
            }
            n = Buffer.allocUnsafe(2 + s)
            n.writeUInt16BE(e, 0)
            if (typeof t === 'string') {
              n.write(t, 2)
            } else {
              n.set(t, 2)
            }
          }
          if (this._deflating) {
            this.enqueue([this.doClose, n, s, r])
          } else {
            this.doClose(n, s, r)
          }
        }
        doClose(e, t, s) {
          this.sendFrame(
            Sender.frame(e, {
              fin: true,
              rsv1: false,
              opcode: 8,
              mask: t,
              readOnly: false,
            }),
            s
          )
        }
        ping(e, t, s) {
          const r = f(e)
          if (r.length > 125) {
            throw new RangeError(
              'The data size must not be greater than 125 bytes'
            )
          }
          if (this._deflating) {
            this.enqueue([this.doPing, r, t, f.readOnly, s])
          } else {
            this.doPing(r, t, f.readOnly, s)
          }
        }
        doPing(e, t, s, r) {
          this.sendFrame(
            Sender.frame(e, {
              fin: true,
              rsv1: false,
              opcode: 9,
              mask: t,
              readOnly: s,
            }),
            r
          )
        }
        pong(e, t, s) {
          const r = f(e)
          if (r.length > 125) {
            throw new RangeError(
              'The data size must not be greater than 125 bytes'
            )
          }
          if (this._deflating) {
            this.enqueue([this.doPong, r, t, f.readOnly, s])
          } else {
            this.doPong(r, t, f.readOnly, s)
          }
        }
        doPong(e, t, s, r) {
          this.sendFrame(
            Sender.frame(e, {
              fin: true,
              rsv1: false,
              opcode: 10,
              mask: t,
              readOnly: s,
            }),
            r
          )
        }
        send(e, t, s) {
          const r = f(e)
          const n = this._extensions[o.extensionName]
          let i = t.binary ? 2 : 1
          let a = t.compress
          if (this._firstFragment) {
            this._firstFragment = false
            if (
              a &&
              n &&
              n.params[
                n._isServer
                  ? 'server_no_context_takeover'
                  : 'client_no_context_takeover'
              ]
            ) {
              a = r.length >= n._threshold
            }
            this._compress = a
          } else {
            a = false
            i = 0
          }
          if (t.fin) this._firstFragment = true
          if (n) {
            const e = {
              fin: t.fin,
              rsv1: a,
              opcode: i,
              mask: t.mask,
              readOnly: f.readOnly,
            }
            if (this._deflating) {
              this.enqueue([this.dispatch, r, this._compress, e, s])
            } else {
              this.dispatch(r, this._compress, e, s)
            }
          } else {
            this.sendFrame(
              Sender.frame(r, {
                fin: t.fin,
                rsv1: false,
                opcode: i,
                mask: t.mask,
                readOnly: f.readOnly,
              }),
              s
            )
          }
        }
        dispatch(e, t, s, r) {
          if (!t) {
            this.sendFrame(Sender.frame(e, s), r)
            return
          }
          const n = this._extensions[o.extensionName]
          this._bufferedBytes += e.length
          this._deflating = true
          n.compress(e, s.fin, (t, n) => {
            if (this._socket.destroyed) {
              const e = new Error(
                'The socket was closed while data was being compressed'
              )
              if (typeof r === 'function') r(e)
              for (let t = 0; t < this._queue.length; t++) {
                const s = this._queue[t][4]
                if (typeof s === 'function') s(e)
              }
              return
            }
            this._bufferedBytes -= e.length
            this._deflating = false
            s.readOnly = false
            this.sendFrame(Sender.frame(n, s), r)
            this.dequeue()
          })
        }
        dequeue() {
          while (!this._deflating && this._queue.length) {
            const e = this._queue.shift()
            this._bufferedBytes -= e[1].length
            Reflect.apply(e[0], this, e.slice(1))
          }
        }
        enqueue(e) {
          this._bufferedBytes += e[1].length
          this._queue.push(e)
        }
        sendFrame(e, t) {
          if (e.length === 2) {
            this._socket.cork()
            this._socket.write(e[0])
            this._socket.write(e[1], t)
            this._socket.uncork()
          } else {
            this._socket.write(e[0], t)
          }
        }
      }
      e.exports = Sender
    },
    551: (e, t, s) => {
      'use strict'
      const { Duplex: r } = s(781)
      function emitClose(e) {
        e.emit('close')
      }
      function duplexOnEnd() {
        if (!this.destroyed && this._writableState.finished) {
          this.destroy()
        }
      }
      function duplexOnError(e) {
        this.removeListener('error', duplexOnError)
        this.destroy()
        if (this.listenerCount('error') === 0) {
          this.emit('error', e)
        }
      }
      function createWebSocketStream(e, t) {
        let s = true
        let n = true
        function receiverOnDrain() {
          if (s) e._socket.resume()
        }
        if (e.readyState === e.CONNECTING) {
          e.once('open', function open() {
            e._receiver.removeAllListeners('drain')
            e._receiver.on('drain', receiverOnDrain)
          })
        } else {
          e._receiver.removeAllListeners('drain')
          e._receiver.on('drain', receiverOnDrain)
        }
        const i = new r({
          ...t,
          autoDestroy: false,
          emitClose: false,
          objectMode: false,
          writableObjectMode: false,
        })
        e.on('message', function message(t, r) {
          const n = !r && i._readableState.objectMode ? t.toString() : t
          if (!i.push(n)) {
            s = false
            e._socket.pause()
          }
        })
        e.once('error', function error(e) {
          if (i.destroyed) return
          n = false
          i.destroy(e)
        })
        e.once('close', function close() {
          if (i.destroyed) return
          i.push(null)
        })
        i._destroy = function (t, s) {
          if (e.readyState === e.CLOSED) {
            s(t)
            process.nextTick(emitClose, i)
            return
          }
          let r = false
          e.once('error', function error(e) {
            r = true
            s(e)
          })
          e.once('close', function close() {
            if (!r) s(t)
            process.nextTick(emitClose, i)
          })
          if (n) e.terminate()
        }
        i._final = function (t) {
          if (e.readyState === e.CONNECTING) {
            e.once('open', function open() {
              i._final(t)
            })
            return
          }
          if (e._socket === null) return
          if (e._socket._writableState.finished) {
            t()
            if (i._readableState.endEmitted) i.destroy()
          } else {
            e._socket.once('finish', function finish() {
              t()
            })
            e.close()
          }
        }
        i._read = function () {
          if (e.readyState === e.OPEN && !s) {
            s = true
            if (!e._receiver._writableState.needDrain) e._socket.resume()
          }
        }
        i._write = function (t, s, r) {
          if (e.readyState === e.CONNECTING) {
            e.once('open', function open() {
              i._write(t, s, r)
            })
            return
          }
          e.send(t, r)
        }
        i.on('end', duplexOnEnd)
        i.on('error', duplexOnError)
        return i
      }
      e.exports = createWebSocketStream
    },
    955: (e, t, s) => {
      'use strict'
      const { tokenChars: r } = s(848)
      function parse(e) {
        const t = new Set()
        let s = -1
        let n = -1
        let i = 0
        for (i; i < e.length; i++) {
          const o = e.charCodeAt(i)
          if (n === -1 && r[o] === 1) {
            if (s === -1) s = i
          } else if (i !== 0 && (o === 32 || o === 9)) {
            if (n === -1 && s !== -1) n = i
          } else if (o === 44) {
            if (s === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`)
            }
            if (n === -1) n = i
            const r = e.slice(s, n)
            if (t.has(r)) {
              throw new SyntaxError(`The "${r}" subprotocol is duplicated`)
            }
            t.add(r)
            s = n = -1
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`)
          }
        }
        if (s === -1 || n !== -1) {
          throw new SyntaxError('Unexpected end of input')
        }
        const o = e.slice(s, i)
        if (t.has(o)) {
          throw new SyntaxError(`The "${o}" subprotocol is duplicated`)
        }
        t.add(o)
        return t
      }
      e.exports = { parse: parse }
    },
    848: (e, t, s) => {
      'use strict'
      const r = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 0, 1, 0, 1, 0,
      ]
      function isValidStatusCode(e) {
        return (
          (e >= 1e3 && e <= 1014 && e !== 1004 && e !== 1005 && e !== 1006) ||
          (e >= 3e3 && e <= 4999)
        )
      }
      function _isValidUTF8(e) {
        const t = e.length
        let s = 0
        while (s < t) {
          if ((e[s] & 128) === 0) {
            s++
          } else if ((e[s] & 224) === 192) {
            if (
              s + 1 === t ||
              (e[s + 1] & 192) !== 128 ||
              (e[s] & 254) === 192
            ) {
              return false
            }
            s += 2
          } else if ((e[s] & 240) === 224) {
            if (
              s + 2 >= t ||
              (e[s + 1] & 192) !== 128 ||
              (e[s + 2] & 192) !== 128 ||
              (e[s] === 224 && (e[s + 1] & 224) === 128) ||
              (e[s] === 237 && (e[s + 1] & 224) === 160)
            ) {
              return false
            }
            s += 3
          } else if ((e[s] & 248) === 240) {
            if (
              s + 3 >= t ||
              (e[s + 1] & 192) !== 128 ||
              (e[s + 2] & 192) !== 128 ||
              (e[s + 3] & 192) !== 128 ||
              (e[s] === 240 && (e[s + 1] & 240) === 128) ||
              (e[s] === 244 && e[s + 1] > 143) ||
              e[s] > 244
            ) {
              return false
            }
            s += 4
          } else {
            return false
          }
        }
        return true
      }
      try {
        const t = s(12)
        e.exports = {
          isValidStatusCode: isValidStatusCode,
          isValidUTF8(e) {
            return e.length < 150 ? _isValidUTF8(e) : t(e)
          },
          tokenChars: r,
        }
      } catch (t) {
        e.exports = {
          isValidStatusCode: isValidStatusCode,
          isValidUTF8: _isValidUTF8,
          tokenChars: r,
        }
      }
    },
    597: (e, t, s) => {
      'use strict'
      const r = s(361)
      const n = s(685)
      const i = s(687)
      const o = s(808)
      const a = s(404)
      const { createHash: c } = s(113)
      const l = s(725)
      const f = s(290)
      const h = s(955)
      const d = s(335)
      const { GUID: u, kWebSocket: _ } = s(217)
      const p = /^[+/0-9A-Za-z]{22}==$/
      const m = 0
      const b = 1
      const y = 2
      class WebSocketServer extends r {
        constructor(e, t) {
          super()
          e = {
            maxPayload: 100 * 1024 * 1024,
            skipUTF8Validation: false,
            perMessageDeflate: false,
            handleProtocols: null,
            clientTracking: true,
            verifyClient: null,
            noServer: false,
            backlog: null,
            server: null,
            host: null,
            path: null,
            port: null,
            ...e,
          }
          if (
            (e.port == null && !e.server && !e.noServer) ||
            (e.port != null && (e.server || e.noServer)) ||
            (e.server && e.noServer)
          ) {
            throw new TypeError(
              'One and only one of the "port", "server", or "noServer" options ' +
                'must be specified'
            )
          }
          if (e.port != null) {
            this._server = n.createServer((e, t) => {
              const s = n.STATUS_CODES[426]
              t.writeHead(426, {
                'Content-Length': s.length,
                'Content-Type': 'text/plain',
              })
              t.end(s)
            })
            this._server.listen(e.port, e.host, e.backlog, t)
          } else if (e.server) {
            this._server = e.server
          }
          if (this._server) {
            const e = this.emit.bind(this, 'connection')
            this._removeListeners = addListeners(this._server, {
              listening: this.emit.bind(this, 'listening'),
              error: this.emit.bind(this, 'error'),
              upgrade: (t, s, r) => {
                this.handleUpgrade(t, s, r, e)
              },
            })
          }
          if (e.perMessageDeflate === true) e.perMessageDeflate = {}
          if (e.clientTracking) {
            this.clients = new Set()
            this._shouldEmitClose = false
          }
          this.options = e
          this._state = m
        }
        address() {
          if (this.options.noServer) {
            throw new Error('The server is operating in "noServer" mode')
          }
          if (!this._server) return null
          return this._server.address()
        }
        close(e) {
          if (this._state === y) {
            if (e) {
              this.once('close', () => {
                e(new Error('The server is not running'))
              })
            }
            process.nextTick(emitClose, this)
            return
          }
          if (e) this.once('close', e)
          if (this._state === b) return
          this._state = b
          if (this.options.noServer || this.options.server) {
            if (this._server) {
              this._removeListeners()
              this._removeListeners = this._server = null
            }
            if (this.clients) {
              if (!this.clients.size) {
                process.nextTick(emitClose, this)
              } else {
                this._shouldEmitClose = true
              }
            } else {
              process.nextTick(emitClose, this)
            }
          } else {
            const e = this._server
            this._removeListeners()
            this._removeListeners = this._server = null
            e.close(() => {
              emitClose(this)
            })
          }
        }
        shouldHandle(e) {
          if (this.options.path) {
            const t = e.url.indexOf('?')
            const s = t !== -1 ? e.url.slice(0, t) : e.url
            if (s !== this.options.path) return false
          }
          return true
        }
        handleUpgrade(e, t, s, r) {
          t.on('error', socketOnError)
          const n =
            e.headers['sec-websocket-key'] !== undefined
              ? e.headers['sec-websocket-key']
              : false
          const i = +e.headers['sec-websocket-version']
          if (
            e.method !== 'GET' ||
            e.headers.upgrade.toLowerCase() !== 'websocket' ||
            !n ||
            !p.test(n) ||
            (i !== 8 && i !== 13) ||
            !this.shouldHandle(e)
          ) {
            return abortHandshake(t, 400)
          }
          const o = e.headers['sec-websocket-protocol']
          let a = new Set()
          if (o !== undefined) {
            try {
              a = h.parse(o)
            } catch (e) {
              return abortHandshake(t, 400)
            }
          }
          const c = e.headers['sec-websocket-extensions']
          const d = {}
          if (this.options.perMessageDeflate && c !== undefined) {
            const e = new f(
              this.options.perMessageDeflate,
              true,
              this.options.maxPayload
            )
            try {
              const t = l.parse(c)
              if (t[f.extensionName]) {
                e.accept(t[f.extensionName])
                d[f.extensionName] = e
              }
            } catch (e) {
              return abortHandshake(t, 400)
            }
          }
          if (this.options.verifyClient) {
            const o = {
              origin:
                e.headers[`${i === 8 ? 'sec-websocket-origin' : 'origin'}`],
              secure: !!(e.socket.authorized || e.socket.encrypted),
              req: e,
            }
            if (this.options.verifyClient.length === 2) {
              this.options.verifyClient(o, (i, o, c, l) => {
                if (!i) {
                  return abortHandshake(t, o || 401, c, l)
                }
                this.completeUpgrade(d, n, a, e, t, s, r)
              })
              return
            }
            if (!this.options.verifyClient(o)) return abortHandshake(t, 401)
          }
          this.completeUpgrade(d, n, a, e, t, s, r)
        }
        completeUpgrade(e, t, s, r, n, i, o) {
          if (!n.readable || !n.writable) return n.destroy()
          if (n[_]) {
            throw new Error(
              'server.handleUpgrade() was called more than once with the same ' +
                'socket, possibly due to a misconfiguration'
            )
          }
          if (this._state > m) return abortHandshake(n, 503)
          const a = c('sha1')
            .update(t + u)
            .digest('base64')
          const h = [
            'HTTP/1.1 101 Switching Protocols',
            'Upgrade: websocket',
            'Connection: Upgrade',
            `Sec-WebSocket-Accept: ${a}`,
          ]
          const p = new d(null)
          if (s.size) {
            const e = this.options.handleProtocols
              ? this.options.handleProtocols(s, r)
              : s.values().next().value
            if (e) {
              h.push(`Sec-WebSocket-Protocol: ${e}`)
              p._protocol = e
            }
          }
          if (e[f.extensionName]) {
            const t = e[f.extensionName].params
            const s = l.format({ [f.extensionName]: [t] })
            h.push(`Sec-WebSocket-Extensions: ${s}`)
            p._extensions = e
          }
          this.emit('headers', h, r)
          n.write(h.concat('\r\n').join('\r\n'))
          n.removeListener('error', socketOnError)
          p.setSocket(n, i, {
            maxPayload: this.options.maxPayload,
            skipUTF8Validation: this.options.skipUTF8Validation,
          })
          if (this.clients) {
            this.clients.add(p)
            p.on('close', () => {
              this.clients.delete(p)
              if (this._shouldEmitClose && !this.clients.size) {
                process.nextTick(emitClose, this)
              }
            })
          }
          o(p, r)
        }
      }
      e.exports = WebSocketServer
      function addListeners(e, t) {
        for (const s of Object.keys(t)) e.on(s, t[s])
        return function removeListeners() {
          for (const s of Object.keys(t)) {
            e.removeListener(s, t[s])
          }
        }
      }
      function emitClose(e) {
        e._state = y
        e.emit('close')
      }
      function socketOnError() {
        this.destroy()
      }
      function abortHandshake(e, t, s, r) {
        if (e.writable) {
          s = s || n.STATUS_CODES[t]
          r = {
            Connection: 'close',
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(s),
            ...r,
          }
          e.write(
            `HTTP/1.1 ${t} ${n.STATUS_CODES[t]}\r\n` +
              Object.keys(r)
                .map((e) => `${e}: ${r[e]}`)
                .join('\r\n') +
              '\r\n\r\n' +
              s
          )
        }
        e.removeListener('error', socketOnError)
        e.destroy()
      }
    },
    335: (e, t, s) => {
      'use strict'
      const r = s(361)
      const n = s(687)
      const i = s(685)
      const o = s(808)
      const a = s(404)
      const { randomBytes: c, createHash: l } = s(113)
      const { Readable: f } = s(781)
      const { URL: h } = s(310)
      const d = s(290)
      const u = s(157)
      const _ = s(769)
      const {
        BINARY_TYPES: p,
        EMPTY_BUFFER: m,
        GUID: b,
        kForOnEventAttribute: y,
        kListener: S,
        kStatusCode: g,
        kWebSocket: k,
        NOOP: v,
      } = s(217)
      const {
        EventTarget: { addEventListener: E, removeEventListener: w },
      } = s(874)
      const { format: x, parse: O } = s(725)
      const { toBuffer: C } = s(214)
      const T = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED']
      const N = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/
      const L = [8, 13]
      const P = 30 * 1e3
      class WebSocket extends r {
        constructor(e, t, s) {
          super()
          this._binaryType = p[0]
          this._closeCode = 1006
          this._closeFrameReceived = false
          this._closeFrameSent = false
          this._closeMessage = m
          this._closeTimer = null
          this._extensions = {}
          this._protocol = ''
          this._readyState = WebSocket.CONNECTING
          this._receiver = null
          this._sender = null
          this._socket = null
          if (e !== null) {
            this._bufferedAmount = 0
            this._isServer = false
            this._redirects = 0
            if (t === undefined) {
              t = []
            } else if (!Array.isArray(t)) {
              if (typeof t === 'object' && t !== null) {
                s = t
                t = []
              } else {
                t = [t]
              }
            }
            initAsClient(this, e, t, s)
          } else {
            this._isServer = true
          }
        }
        get binaryType() {
          return this._binaryType
        }
        set binaryType(e) {
          if (!p.includes(e)) return
          this._binaryType = e
          if (this._receiver) this._receiver._binaryType = e
        }
        get bufferedAmount() {
          if (!this._socket) return this._bufferedAmount
          return (
            this._socket._writableState.length + this._sender._bufferedBytes
          )
        }
        get extensions() {
          return Object.keys(this._extensions).join()
        }
        get onclose() {
          return null
        }
        get onerror() {
          return null
        }
        get onopen() {
          return null
        }
        get onmessage() {
          return null
        }
        get protocol() {
          return this._protocol
        }
        get readyState() {
          return this._readyState
        }
        get url() {
          return this._url
        }
        setSocket(e, t, s) {
          const r = new u({
            binaryType: this.binaryType,
            extensions: this._extensions,
            isServer: this._isServer,
            maxPayload: s.maxPayload,
            skipUTF8Validation: s.skipUTF8Validation,
          })
          this._sender = new _(e, this._extensions)
          this._receiver = r
          this._socket = e
          r[k] = this
          e[k] = this
          r.on('conclude', receiverOnConclude)
          r.on('drain', receiverOnDrain)
          r.on('error', receiverOnError)
          r.on('message', receiverOnMessage)
          r.on('ping', receiverOnPing)
          r.on('pong', receiverOnPong)
          e.setTimeout(0)
          e.setNoDelay()
          if (t.length > 0) e.unshift(t)
          e.on('close', socketOnClose)
          e.on('data', socketOnData)
          e.on('end', socketOnEnd)
          e.on('error', socketOnError)
          this._readyState = WebSocket.OPEN
          this.emit('open')
        }
        emitClose() {
          if (!this._socket) {
            this._readyState = WebSocket.CLOSED
            this.emit('close', this._closeCode, this._closeMessage)
            return
          }
          if (this._extensions[d.extensionName]) {
            this._extensions[d.extensionName].cleanup()
          }
          this._receiver.removeAllListeners()
          this._readyState = WebSocket.CLOSED
          this.emit('close', this._closeCode, this._closeMessage)
        }
        close(e, t) {
          if (this.readyState === WebSocket.CLOSED) return
          if (this.readyState === WebSocket.CONNECTING) {
            const e =
              'WebSocket was closed before the connection was established'
            return abortHandshake(this, this._req, e)
          }
          if (this.readyState === WebSocket.CLOSING) {
            if (
              this._closeFrameSent &&
              (this._closeFrameReceived ||
                this._receiver._writableState.errorEmitted)
            ) {
              this._socket.end()
            }
            return
          }
          this._readyState = WebSocket.CLOSING
          this._sender.close(e, t, !this._isServer, (e) => {
            if (e) return
            this._closeFrameSent = true
            if (
              this._closeFrameReceived ||
              this._receiver._writableState.errorEmitted
            ) {
              this._socket.end()
            }
          })
          this._closeTimer = setTimeout(
            this._socket.destroy.bind(this._socket),
            P
          )
        }
        ping(e, t, s) {
          if (this.readyState === WebSocket.CONNECTING) {
            throw new Error('WebSocket is not open: readyState 0 (CONNECTING)')
          }
          if (typeof e === 'function') {
            s = e
            e = t = undefined
          } else if (typeof t === 'function') {
            s = t
            t = undefined
          }
          if (typeof e === 'number') e = e.toString()
          if (this.readyState !== WebSocket.OPEN) {
            sendAfterClose(this, e, s)
            return
          }
          if (t === undefined) t = !this._isServer
          this._sender.ping(e || m, t, s)
        }
        pong(e, t, s) {
          if (this.readyState === WebSocket.CONNECTING) {
            throw new Error('WebSocket is not open: readyState 0 (CONNECTING)')
          }
          if (typeof e === 'function') {
            s = e
            e = t = undefined
          } else if (typeof t === 'function') {
            s = t
            t = undefined
          }
          if (typeof e === 'number') e = e.toString()
          if (this.readyState !== WebSocket.OPEN) {
            sendAfterClose(this, e, s)
            return
          }
          if (t === undefined) t = !this._isServer
          this._sender.pong(e || m, t, s)
        }
        send(e, t, s) {
          if (this.readyState === WebSocket.CONNECTING) {
            throw new Error('WebSocket is not open: readyState 0 (CONNECTING)')
          }
          if (typeof t === 'function') {
            s = t
            t = {}
          }
          if (typeof e === 'number') e = e.toString()
          if (this.readyState !== WebSocket.OPEN) {
            sendAfterClose(this, e, s)
            return
          }
          const r = {
            binary: typeof e !== 'string',
            mask: !this._isServer,
            compress: true,
            fin: true,
            ...t,
          }
          if (!this._extensions[d.extensionName]) {
            r.compress = false
          }
          this._sender.send(e || m, r, s)
        }
        terminate() {
          if (this.readyState === WebSocket.CLOSED) return
          if (this.readyState === WebSocket.CONNECTING) {
            const e =
              'WebSocket was closed before the connection was established'
            return abortHandshake(this, this._req, e)
          }
          if (this._socket) {
            this._readyState = WebSocket.CLOSING
            this._socket.destroy()
          }
        }
      }
      Object.defineProperty(WebSocket, 'CONNECTING', {
        enumerable: true,
        value: T.indexOf('CONNECTING'),
      })
      Object.defineProperty(WebSocket.prototype, 'CONNECTING', {
        enumerable: true,
        value: T.indexOf('CONNECTING'),
      })
      Object.defineProperty(WebSocket, 'OPEN', {
        enumerable: true,
        value: T.indexOf('OPEN'),
      })
      Object.defineProperty(WebSocket.prototype, 'OPEN', {
        enumerable: true,
        value: T.indexOf('OPEN'),
      })
      Object.defineProperty(WebSocket, 'CLOSING', {
        enumerable: true,
        value: T.indexOf('CLOSING'),
      })
      Object.defineProperty(WebSocket.prototype, 'CLOSING', {
        enumerable: true,
        value: T.indexOf('CLOSING'),
      })
      Object.defineProperty(WebSocket, 'CLOSED', {
        enumerable: true,
        value: T.indexOf('CLOSED'),
      })
      Object.defineProperty(WebSocket.prototype, 'CLOSED', {
        enumerable: true,
        value: T.indexOf('CLOSED'),
      })
      ;[
        'binaryType',
        'bufferedAmount',
        'extensions',
        'protocol',
        'readyState',
        'url',
      ].forEach((e) => {
        Object.defineProperty(WebSocket.prototype, e, { enumerable: true })
      })
      ;['open', 'error', 'close', 'message'].forEach((e) => {
        Object.defineProperty(WebSocket.prototype, `on${e}`, {
          enumerable: true,
          get() {
            for (const t of this.listeners(e)) {
              if (t[y]) return t[S]
            }
            return null
          },
          set(t) {
            for (const t of this.listeners(e)) {
              if (t[y]) {
                this.removeListener(e, t)
                break
              }
            }
            if (typeof t !== 'function') return
            this.addEventListener(e, t, { [y]: true })
          },
        })
      })
      WebSocket.prototype.addEventListener = E
      WebSocket.prototype.removeEventListener = w
      e.exports = WebSocket
      function initAsClient(e, t, s, r) {
        const o = {
          protocolVersion: L[1],
          maxPayload: 100 * 1024 * 1024,
          skipUTF8Validation: false,
          perMessageDeflate: true,
          followRedirects: false,
          maxRedirects: 10,
          ...r,
          createConnection: undefined,
          socketPath: undefined,
          hostname: undefined,
          protocol: undefined,
          timeout: undefined,
          method: undefined,
          host: undefined,
          path: undefined,
          port: undefined,
        }
        if (!L.includes(o.protocolVersion)) {
          throw new RangeError(
            `Unsupported protocol version: ${o.protocolVersion} ` +
              `(supported versions: ${L.join(', ')})`
          )
        }
        let a
        if (t instanceof h) {
          a = t
          e._url = t.href
        } else {
          try {
            a = new h(t)
          } catch (e) {
            throw new SyntaxError(`Invalid URL: ${t}`)
          }
          e._url = t
        }
        const f = a.protocol === 'wss:'
        const u = a.protocol === 'ws+unix:'
        if (a.protocol !== 'ws:' && !f && !u) {
          throw new SyntaxError(
            'The URL\'s protocol must be one of "ws:", "wss:", or "ws+unix:"'
          )
        }
        if (u && !a.pathname) {
          throw new SyntaxError("The URL's pathname is empty")
        }
        if (a.hash) {
          throw new SyntaxError('The URL contains a fragment identifier')
        }
        const _ = f ? 443 : 80
        const p = c(16).toString('base64')
        const m = f ? n.get : i.get
        const y = new Set()
        let S
        o.createConnection = f ? tlsConnect : netConnect
        o.defaultPort = o.defaultPort || _
        o.port = a.port || _
        o.host = a.hostname.startsWith('[')
          ? a.hostname.slice(1, -1)
          : a.hostname
        o.headers = {
          'Sec-WebSocket-Version': o.protocolVersion,
          'Sec-WebSocket-Key': p,
          Connection: 'Upgrade',
          Upgrade: 'websocket',
          ...o.headers,
        }
        o.path = a.pathname + a.search
        o.timeout = o.handshakeTimeout
        if (o.perMessageDeflate) {
          S = new d(
            o.perMessageDeflate !== true ? o.perMessageDeflate : {},
            false,
            o.maxPayload
          )
          o.headers['Sec-WebSocket-Extensions'] = x({
            [d.extensionName]: S.offer(),
          })
        }
        if (s.length) {
          for (const e of s) {
            if (typeof e !== 'string' || !N.test(e) || y.has(e)) {
              throw new SyntaxError(
                'An invalid or duplicated subprotocol was specified'
              )
            }
            y.add(e)
          }
          o.headers['Sec-WebSocket-Protocol'] = s.join(',')
        }
        if (o.origin) {
          if (o.protocolVersion < 13) {
            o.headers['Sec-WebSocket-Origin'] = o.origin
          } else {
            o.headers.Origin = o.origin
          }
        }
        if (a.username || a.password) {
          o.auth = `${a.username}:${a.password}`
        }
        if (u) {
          const e = o.path.split(':')
          o.socketPath = e[0]
          o.path = e[1]
        }
        let g = (e._req = m(o))
        if (o.timeout) {
          g.on('timeout', () => {
            abortHandshake(e, g, 'Opening handshake has timed out')
          })
        }
        g.on('error', (t) => {
          if (g === null || g.aborted) return
          g = e._req = null
          e._readyState = WebSocket.CLOSING
          e.emit('error', t)
          e.emitClose()
        })
        g.on('response', (n) => {
          const i = n.headers.location
          const a = n.statusCode
          if (i && o.followRedirects && a >= 300 && a < 400) {
            if (++e._redirects > o.maxRedirects) {
              abortHandshake(e, g, 'Maximum redirects exceeded')
              return
            }
            g.abort()
            const n = new h(i, t)
            initAsClient(e, n, s, r)
          } else if (!e.emit('unexpected-response', g, n)) {
            abortHandshake(e, g, `Unexpected server response: ${n.statusCode}`)
          }
        })
        g.on('upgrade', (t, s, r) => {
          e.emit('upgrade', t)
          if (e.readyState !== WebSocket.CONNECTING) return
          g = e._req = null
          const n = l('sha1')
            .update(p + b)
            .digest('base64')
          if (t.headers['sec-websocket-accept'] !== n) {
            abortHandshake(e, s, 'Invalid Sec-WebSocket-Accept header')
            return
          }
          const i = t.headers['sec-websocket-protocol']
          let a
          if (i !== undefined) {
            if (!y.size) {
              a = 'Server sent a subprotocol but none was requested'
            } else if (!y.has(i)) {
              a = 'Server sent an invalid subprotocol'
            }
          } else if (y.size) {
            a = 'Server sent no subprotocol'
          }
          if (a) {
            abortHandshake(e, s, a)
            return
          }
          if (i) e._protocol = i
          const c = t.headers['sec-websocket-extensions']
          if (c !== undefined) {
            if (!S) {
              const t =
                'Server sent a Sec-WebSocket-Extensions header but no extension ' +
                'was requested'
              abortHandshake(e, s, t)
              return
            }
            let t
            try {
              t = O(c)
            } catch (t) {
              const r = 'Invalid Sec-WebSocket-Extensions header'
              abortHandshake(e, s, r)
              return
            }
            const r = Object.keys(t)
            if (r.length !== 1 || r[0] !== d.extensionName) {
              const t = 'Server indicated an extension that was not requested'
              abortHandshake(e, s, t)
              return
            }
            try {
              S.accept(t[d.extensionName])
            } catch (t) {
              const r = 'Invalid Sec-WebSocket-Extensions header'
              abortHandshake(e, s, r)
              return
            }
            e._extensions[d.extensionName] = S
          }
          e.setSocket(s, r, {
            maxPayload: o.maxPayload,
            skipUTF8Validation: o.skipUTF8Validation,
          })
        })
      }
      function netConnect(e) {
        e.path = e.socketPath
        return o.connect(e)
      }
      function tlsConnect(e) {
        e.path = undefined
        if (!e.servername && e.servername !== '') {
          e.servername = o.isIP(e.host) ? '' : e.host
        }
        return a.connect(e)
      }
      function abortHandshake(e, t, s) {
        e._readyState = WebSocket.CLOSING
        const r = new Error(s)
        Error.captureStackTrace(r, abortHandshake)
        if (t.setHeader) {
          t.abort()
          if (t.socket && !t.socket.destroyed) {
            t.socket.destroy()
          }
          t.once('abort', e.emitClose.bind(e))
          e.emit('error', r)
        } else {
          t.destroy(r)
          t.once('error', e.emit.bind(e, 'error'))
          t.once('close', e.emitClose.bind(e))
        }
      }
      function sendAfterClose(e, t, s) {
        if (t) {
          const s = C(t).length
          if (e._socket) e._sender._bufferedBytes += s
          else e._bufferedAmount += s
        }
        if (s) {
          const t = new Error(
            `WebSocket is not open: readyState ${e.readyState} ` +
              `(${T[e.readyState]})`
          )
          s(t)
        }
      }
      function receiverOnConclude(e, t) {
        const s = this[k]
        s._closeFrameReceived = true
        s._closeMessage = t
        s._closeCode = e
        if (s._socket[k] === undefined) return
        s._socket.removeListener('data', socketOnData)
        process.nextTick(resume, s._socket)
        if (e === 1005) s.close()
        else s.close(e, t)
      }
      function receiverOnDrain() {
        this[k]._socket.resume()
      }
      function receiverOnError(e) {
        const t = this[k]
        if (t._socket[k] !== undefined) {
          t._socket.removeListener('data', socketOnData)
          process.nextTick(resume, t._socket)
          t.close(e[g])
        }
        t.emit('error', e)
      }
      function receiverOnFinish() {
        this[k].emitClose()
      }
      function receiverOnMessage(e, t) {
        this[k].emit('message', e, t)
      }
      function receiverOnPing(e) {
        const t = this[k]
        t.pong(e, !t._isServer, v)
        t.emit('ping', e)
      }
      function receiverOnPong(e) {
        this[k].emit('pong', e)
      }
      function resume(e) {
        e.resume()
      }
      function socketOnClose() {
        const e = this[k]
        this.removeListener('close', socketOnClose)
        this.removeListener('data', socketOnData)
        this.removeListener('end', socketOnEnd)
        e._readyState = WebSocket.CLOSING
        let t
        if (
          !this._readableState.endEmitted &&
          !e._closeFrameReceived &&
          !e._receiver._writableState.errorEmitted &&
          (t = e._socket.read()) !== null
        ) {
          e._receiver.write(t)
        }
        e._receiver.end()
        this[k] = undefined
        clearTimeout(e._closeTimer)
        if (
          e._receiver._writableState.finished ||
          e._receiver._writableState.errorEmitted
        ) {
          e.emitClose()
        } else {
          e._receiver.on('error', receiverOnFinish)
          e._receiver.on('finish', receiverOnFinish)
        }
      }
      function socketOnData(e) {
        if (!this[k]._receiver.write(e)) {
          this.pause()
        }
      }
      function socketOnEnd() {
        const e = this[k]
        e._readyState = WebSocket.CLOSING
        e._receiver.end()
        this.end()
      }
      function socketOnError() {
        const e = this[k]
        this.removeListener('error', socketOnError)
        this.on('error', v)
        if (e) {
          e._readyState = WebSocket.CLOSING
          this.destroy()
        }
      }
    },
    605: (module) => {
      module.exports = eval('require')('bufferutil')
    },
    12: (module) => {
      module.exports = eval('require')('utf-8-validate')
    },
    113: (e) => {
      'use strict'
      e.exports = require('crypto')
    },
    361: (e) => {
      'use strict'
      e.exports = require('events')
    },
    685: (e) => {
      'use strict'
      e.exports = require('http')
    },
    687: (e) => {
      'use strict'
      e.exports = require('https')
    },
    808: (e) => {
      'use strict'
      e.exports = require('net')
    },
    781: (e) => {
      'use strict'
      e.exports = require('stream')
    },
    404: (e) => {
      'use strict'
      e.exports = require('tls')
    },
    310: (e) => {
      'use strict'
      e.exports = require('url')
    },
    796: (e) => {
      'use strict'
      e.exports = require('zlib')
    },
  }
  var __webpack_module_cache__ = {}
  function __nccwpck_require__(e) {
    var t = __webpack_module_cache__[e]
    if (t !== undefined) {
      return t.exports
    }
    var s = (__webpack_module_cache__[e] = { exports: {} })
    var r = true
    try {
      __webpack_modules__[e](s, s.exports, __nccwpck_require__)
      r = false
    } finally {
      if (r) delete __webpack_module_cache__[e]
    }
    return s.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var __webpack_exports__ = __nccwpck_require__(28)
  module.exports = __webpack_exports__
})()
