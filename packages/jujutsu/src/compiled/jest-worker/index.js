;(() => {
  'use strict'
  var e = {
    914: (e) => {
      e.exports = (e, t = process.argv) => {
        const r = e.startsWith('-') ? '' : e.length === 1 ? '-' : '--'
        const s = t.indexOf(r + e)
        const o = t.indexOf('--')
        return s !== -1 && (o === -1 || s < o)
      }
    },
    982: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t['default'] = void 0
      var s = _interopRequireDefault(r(282))
      var o = r(841)
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e }
      }
      function _defineProperty(e, t, r) {
        if (t in e) {
          Object.defineProperty(e, t, {
            value: r,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        } else {
          e[t] = r
        }
        return e
      }
      class Farm {
        constructor(e, t, r = {}) {
          var o, i
          this._numOfWorkers = e
          this._callback = t
          _defineProperty(this, '_computeWorkerKey', void 0)
          _defineProperty(this, '_workerSchedulingPolicy', void 0)
          _defineProperty(this, '_cacheKeys', Object.create(null))
          _defineProperty(this, '_locks', [])
          _defineProperty(this, '_offset', 0)
          _defineProperty(this, '_taskQueue', void 0)
          this._computeWorkerKey = r.computeWorkerKey
          this._workerSchedulingPolicy =
            (o = r.workerSchedulingPolicy) !== null && o !== void 0
              ? o
              : 'round-robin'
          this._taskQueue =
            (i = r.taskQueue) !== null && i !== void 0 ? i : new s.default()
        }
        doWork(e, ...t) {
          const r = new Set()
          const addCustomMessageListener = (e) => {
            r.add(e)
            return () => {
              r.delete(e)
            }
          }
          const onCustomMessage = (e) => {
            r.forEach((t) => t(e))
          }
          const s = new Promise(
            ((t, s, i) => {
              const n = this._computeWorkerKey
              const u = [o.CHILD_MESSAGE_CALL, false, e, t]
              let _ = null
              let l = null
              if (n) {
                l = n.call(this, e, ...t)
                _ = l == null ? null : this._cacheKeys[l]
              }
              const onStart = (e) => {
                if (l != null) {
                  this._cacheKeys[l] = e
                }
              }
              const onEnd = (e, t) => {
                r.clear()
                if (e) {
                  i(e)
                } else {
                  s(t)
                }
              }
              const a = {
                onCustomMessage: onCustomMessage,
                onEnd: onEnd,
                onStart: onStart,
                request: u,
              }
              if (_) {
                this._taskQueue.enqueue(a, _.getWorkerId())
                this._process(_.getWorkerId())
              } else {
                this._push(a)
              }
            }).bind(null, t)
          )
          s.UNSTABLE_onCustomMessage = addCustomMessageListener
          return s
        }
        _process(e) {
          if (this._isLocked(e)) {
            return this
          }
          const t = this._taskQueue.dequeue(e)
          if (!t) {
            return this
          }
          if (t.request[1]) {
            throw new Error('Queue implementation returned processed task')
          }
          const r = t.onEnd
          const onEnd = (t, s) => {
            r(t, s)
            this._unlock(e)
            this._process(e)
          }
          t.request[1] = true
          this._lock(e)
          this._callback(e, t.request, t.onStart, onEnd, t.onCustomMessage)
          return this
        }
        _push(e) {
          this._taskQueue.enqueue(e)
          const t = this._getNextWorkerOffset()
          for (let r = 0; r < this._numOfWorkers; r++) {
            this._process((t + r) % this._numOfWorkers)
            if (e.request[1]) {
              break
            }
          }
          return this
        }
        _getNextWorkerOffset() {
          switch (this._workerSchedulingPolicy) {
            case 'in-order':
              return 0
            case 'round-robin':
              return this._offset++
          }
        }
        _lock(e) {
          this._locks[e] = true
        }
        _unlock(e) {
          this._locks[e] = false
        }
        _isLocked(e) {
          return this._locks[e]
        }
      }
      t['default'] = Farm
    },
    282: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t['default'] = void 0
      function _defineProperty(e, t, r) {
        if (t in e) {
          Object.defineProperty(e, t, {
            value: r,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        } else {
          e[t] = r
        }
        return e
      }
      class FifoQueue {
        constructor() {
          _defineProperty(this, '_workerQueues', [])
          _defineProperty(this, '_sharedQueue', new InternalQueue())
        }
        enqueue(e, t) {
          if (t == null) {
            this._sharedQueue.enqueue(e)
            return
          }
          let r = this._workerQueues[t]
          if (r == null) {
            r = this._workerQueues[t] = new InternalQueue()
          }
          const s = this._sharedQueue.peekLast()
          const o = { previousSharedTask: s, task: e }
          r.enqueue(o)
        }
        dequeue(e) {
          var t, r, s
          const o =
            (t = this._workerQueues[e]) === null || t === void 0
              ? void 0
              : t.peek()
          const i =
            (r =
              o === null || o === void 0
                ? void 0
                : (s = o.previousSharedTask) === null || s === void 0
                ? void 0
                : s.request[1]) !== null && r !== void 0
              ? r
              : true
          if (o != null && i) {
            var n, u, _
            return (n =
              (u = this._workerQueues[e]) === null || u === void 0
                ? void 0
                : (_ = u.dequeue()) === null || _ === void 0
                ? void 0
                : _.task) !== null && n !== void 0
              ? n
              : null
          }
          return this._sharedQueue.dequeue()
        }
      }
      t['default'] = FifoQueue
      class InternalQueue {
        constructor() {
          _defineProperty(this, '_head', null)
          _defineProperty(this, '_last', null)
        }
        enqueue(e) {
          const t = { next: null, value: e }
          if (this._last == null) {
            this._head = t
          } else {
            this._last.next = t
          }
          this._last = t
        }
        dequeue() {
          if (this._head == null) {
            return null
          }
          const e = this._head
          this._head = e.next
          if (this._head == null) {
            this._last = null
          }
          return e.value
        }
        peek() {
          var e, t
          return (e =
            (t = this._head) === null || t === void 0 ? void 0 : t.value) !==
            null && e !== void 0
            ? e
            : null
        }
        peekLast() {
          var e, t
          return (e =
            (t = this._last) === null || t === void 0 ? void 0 : t.value) !==
            null && e !== void 0
            ? e
            : null
        }
      }
    },
    513: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t['default'] = void 0
      function _defineProperty(e, t, r) {
        if (t in e) {
          Object.defineProperty(e, t, {
            value: r,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        } else {
          e[t] = r
        }
        return e
      }
      class PriorityQueue {
        constructor(e) {
          this._computePriority = e
          _defineProperty(this, '_queue', [])
          _defineProperty(this, '_sharedQueue', new MinHeap())
        }
        enqueue(e, t) {
          if (t == null) {
            this._enqueue(e, this._sharedQueue)
          } else {
            const r = this._getWorkerQueue(t)
            this._enqueue(e, r)
          }
        }
        _enqueue(e, t) {
          const r = {
            priority: this._computePriority(e.request[2], ...e.request[3]),
            task: e,
          }
          t.add(r)
        }
        dequeue(e) {
          const t = this._getWorkerQueue(e)
          const r = t.peek()
          const s = this._sharedQueue.peek()
          if (s == null || (r != null && r.priority <= s.priority)) {
            var o, i
            return (o =
              (i = t.poll()) === null || i === void 0 ? void 0 : i.task) !==
              null && o !== void 0
              ? o
              : null
          }
          return this._sharedQueue.poll().task
        }
        _getWorkerQueue(e) {
          let t = this._queue[e]
          if (t == null) {
            t = this._queue[e] = new MinHeap()
          }
          return t
        }
      }
      t['default'] = PriorityQueue
      class MinHeap {
        constructor() {
          _defineProperty(this, '_heap', [])
        }
        peek() {
          var e
          return (e = this._heap[0]) !== null && e !== void 0 ? e : null
        }
        add(e) {
          const t = this._heap
          t.push(e)
          if (t.length === 1) {
            return
          }
          let r = t.length - 1
          while (r > 0) {
            const s = Math.floor((r + 1) / 2) - 1
            const o = t[s]
            if (o.priority <= e.priority) {
              break
            }
            t[r] = o
            t[s] = e
            r = s
          }
        }
        poll() {
          const e = this._heap
          const t = e[0]
          const r = e.pop()
          if (t == null || e.length === 0) {
            return t !== null && t !== void 0 ? t : null
          }
          let s = 0
          e[0] = r !== null && r !== void 0 ? r : null
          const o = e[0]
          while (true) {
            let t = null
            const r = (s + 1) * 2
            const i = r - 1
            const n = e[r]
            const u = e[i]
            if (u != null && u.priority < o.priority) {
              t = i
            }
            if (n != null && n.priority < (t == null ? o : u).priority) {
              t = r
            }
            if (t == null) {
              break
            }
            e[s] = e[t]
            e[t] = o
            s = t
          }
          return t
        }
      }
    },
    953: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t['default'] = void 0
      var s = _interopRequireDefault(r(359))
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e }
      }
      const canUseWorkerThreads = () => {
        try {
          r(267)
          return true
        } catch {
          return false
        }
      }
      class WorkerPool extends s.default {
        send(e, t, r, s, o) {
          this.getWorkerById(e).send(t, r, s, o)
        }
        createWorker(e) {
          let t
          if (this._options.enableWorkerThreads && canUseWorkerThreads()) {
            t = r(369).Z
          } else {
            t = r(499).Z
          }
          return new t(e)
        }
      }
      var o = WorkerPool
      t['default'] = o
    },
    359: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t['default'] = void 0
      function path() {
        const e = _interopRequireWildcard(r(17))
        path = function () {
          return e
        }
        return e
      }
      function _mergeStream() {
        const e = _interopRequireDefault(r(942))
        _mergeStream = function () {
          return e
        }
        return e
      }
      function _types() {
        const e = r(841)
        _types = function () {
          return e
        }
        return e
      }
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e }
      }
      function _getRequireWildcardCache() {
        if (typeof WeakMap !== 'function') return null
        var e = new WeakMap()
        _getRequireWildcardCache = function () {
          return e
        }
        return e
      }
      function _interopRequireWildcard(e) {
        if (e && e.__esModule) {
          return e
        }
        if (e === null || (typeof e !== 'object' && typeof e !== 'function')) {
          return { default: e }
        }
        var t = _getRequireWildcardCache()
        if (t && t.has(e)) {
          return t.get(e)
        }
        var r = {}
        var s = Object.defineProperty && Object.getOwnPropertyDescriptor
        for (var o in e) {
          if (Object.prototype.hasOwnProperty.call(e, o)) {
            var i = s ? Object.getOwnPropertyDescriptor(e, o) : null
            if (i && (i.get || i.set)) {
              Object.defineProperty(r, o, i)
            } else {
              r[o] = e[o]
            }
          }
        }
        r.default = e
        if (t) {
          t.set(e, r)
        }
        return r
      }
      function _defineProperty(e, t, r) {
        if (t in e) {
          Object.defineProperty(e, t, {
            value: r,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        } else {
          e[t] = r
        }
        return e
      }
      const s = 500
      const emptyMethod = () => {}
      class BaseWorkerPool {
        constructor(e, t) {
          _defineProperty(this, '_stderr', void 0)
          _defineProperty(this, '_stdout', void 0)
          _defineProperty(this, '_options', void 0)
          _defineProperty(this, '_workers', void 0)
          this._options = t
          this._workers = new Array(t.numWorkers)
          if (!path().isAbsolute(e)) {
            e = require.resolve(e)
          }
          const r = (0, _mergeStream().default)()
          const s = (0, _mergeStream().default)()
          const {
            forkOptions: o,
            maxRetries: i,
            resourceLimits: n,
            setupArgs: u,
          } = t
          for (let _ = 0; _ < t.numWorkers; _++) {
            const t = {
              forkOptions: o,
              maxRetries: i,
              resourceLimits: n,
              setupArgs: u,
              workerId: _,
              workerPath: e,
            }
            const l = this.createWorker(t)
            const a = l.getStdout()
            const d = l.getStderr()
            if (a) {
              r.add(a)
            }
            if (d) {
              s.add(d)
            }
            this._workers[_] = l
          }
          this._stdout = r
          this._stderr = s
        }
        getStderr() {
          return this._stderr
        }
        getStdout() {
          return this._stdout
        }
        getWorkers() {
          return this._workers
        }
        getWorkerById(e) {
          return this._workers[e]
        }
        createWorker(e) {
          throw Error('Missing method createWorker in WorkerPool')
        }
        async end() {
          const e = this._workers.map(async (e) => {
            e.send(
              [_types().CHILD_MESSAGE_END, false],
              emptyMethod,
              emptyMethod,
              emptyMethod
            )
            let t = false
            const r = setTimeout(() => {
              e.forceExit()
              t = true
            }, s)
            await e.waitForExit()
            clearTimeout(r)
            return t
          })
          const t = await Promise.all(e)
          return t.reduce((e, t) => ({ forceExited: e.forceExited || t }), {
            forceExited: false,
          })
        }
      }
      t['default'] = BaseWorkerPool
    },
    841: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.PARENT_MESSAGE_CUSTOM =
        t.PARENT_MESSAGE_SETUP_ERROR =
        t.PARENT_MESSAGE_CLIENT_ERROR =
        t.PARENT_MESSAGE_OK =
        t.CHILD_MESSAGE_END =
        t.CHILD_MESSAGE_CALL =
        t.CHILD_MESSAGE_INITIALIZE =
          void 0
      const r = 0
      t.CHILD_MESSAGE_INITIALIZE = r
      const s = 1
      t.CHILD_MESSAGE_CALL = s
      const o = 2
      t.CHILD_MESSAGE_END = o
      const i = 0
      t.PARENT_MESSAGE_OK = i
      const n = 1
      t.PARENT_MESSAGE_CLIENT_ERROR = n
      const u = 2
      t.PARENT_MESSAGE_SETUP_ERROR = u
      const _ = 3
      t.PARENT_MESSAGE_CUSTOM = _
    },
    499: (e, t, r) => {
      var s
      s = { value: true }
      t.Z = void 0
      function _child_process() {
        const e = r(81)
        _child_process = function () {
          return e
        }
        return e
      }
      function _stream() {
        const e = r(781)
        _stream = function () {
          return e
        }
        return e
      }
      function _mergeStream() {
        const e = _interopRequireDefault(r(942))
        _mergeStream = function () {
          return e
        }
        return e
      }
      function _supportsColor() {
        const e = r(178)
        _supportsColor = function () {
          return e
        }
        return e
      }
      function _types() {
        const e = r(841)
        _types = function () {
          return e
        }
        return e
      }
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e }
      }
      function _defineProperty(e, t, r) {
        if (t in e) {
          Object.defineProperty(e, t, {
            value: r,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        } else {
          e[t] = r
        }
        return e
      }
      const o = 128
      const i = o + 9
      const n = o + 15
      const u = 500
      class ChildProcessWorker {
        constructor(e) {
          _defineProperty(this, '_child', void 0)
          _defineProperty(this, '_options', void 0)
          _defineProperty(this, '_request', void 0)
          _defineProperty(this, '_retries', void 0)
          _defineProperty(this, '_onProcessEnd', void 0)
          _defineProperty(this, '_onCustomMessage', void 0)
          _defineProperty(this, '_fakeStream', void 0)
          _defineProperty(this, '_stdout', void 0)
          _defineProperty(this, '_stderr', void 0)
          _defineProperty(this, '_exitPromise', void 0)
          _defineProperty(this, '_resolveExitPromise', void 0)
          this._options = e
          this._request = null
          this._fakeStream = null
          this._stdout = null
          this._stderr = null
          this._exitPromise = new Promise((e) => {
            this._resolveExitPromise = e
          })
          this.initialize()
        }
        initialize() {
          const e = _supportsColor().stdout ? { FORCE_COLOR: '1' } : {}
          const t = (0, _child_process().fork)(r.ab + 'processChild.js', [], {
            cwd: process.cwd(),
            env: {
              ...process.env,
              JEST_WORKER_ID: String(this._options.workerId + 1),
              ...e,
            },
            execArgv: process.execArgv.filter(
              (e) => !/^--(debug|inspect)/.test(e)
            ),
            silent: true,
            ...this._options.forkOptions,
          })
          if (t.stdout) {
            if (!this._stdout) {
              this._stdout = (0, _mergeStream().default)(this._getFakeStream())
            }
            this._stdout.add(t.stdout)
          }
          if (t.stderr) {
            if (!this._stderr) {
              this._stderr = (0, _mergeStream().default)(this._getFakeStream())
            }
            this._stderr.add(t.stderr)
          }
          t.on('message', this._onMessage.bind(this))
          t.on('exit', this._onExit.bind(this))
          t.send([
            _types().CHILD_MESSAGE_INITIALIZE,
            false,
            this._options.workerPath,
            this._options.setupArgs,
          ])
          this._child = t
          this._retries++
          if (this._retries > this._options.maxRetries) {
            const e = new Error('Call retries were exceeded')
            this._onMessage([
              _types().PARENT_MESSAGE_CLIENT_ERROR,
              e.name,
              e.message,
              e.stack,
              { type: 'WorkerError' },
            ])
          }
        }
        _shutdown() {
          if (this._fakeStream) {
            this._fakeStream.end()
            this._fakeStream = null
          }
          this._resolveExitPromise()
        }
        _onMessage(e) {
          let t
          switch (e[0]) {
            case _types().PARENT_MESSAGE_OK:
              this._onProcessEnd(null, e[1])
              break
            case _types().PARENT_MESSAGE_CLIENT_ERROR:
              t = e[4]
              if (t != null && typeof t === 'object') {
                const r = t
                const s = global[e[1]]
                const o = typeof s === 'function' ? s : Error
                t = new o(e[2])
                t.type = e[1]
                t.stack = e[3]
                for (const e in r) {
                  t[e] = r[e]
                }
              }
              this._onProcessEnd(t, null)
              break
            case _types().PARENT_MESSAGE_SETUP_ERROR:
              t = new Error('Error when calling setup: ' + e[2])
              t.type = e[1]
              t.stack = e[3]
              this._onProcessEnd(t, null)
              break
            case _types().PARENT_MESSAGE_CUSTOM:
              this._onCustomMessage(e[1])
              break
            default:
              throw new TypeError('Unexpected response from worker: ' + e[0])
          }
        }
        _onExit(e) {
          if (e !== 0 && e !== null && e !== n && e !== i) {
            this.initialize()
            if (this._request) {
              this._child.send(this._request)
            }
          } else {
            this._shutdown()
          }
        }
        send(e, t, r, s) {
          t(this)
          this._onProcessEnd = (...e) => {
            this._request = null
            return r(...e)
          }
          this._onCustomMessage = (...e) => s(...e)
          this._request = e
          this._retries = 0
          this._child.send(e, () => {})
        }
        waitForExit() {
          return this._exitPromise
        }
        forceExit() {
          this._child.kill('SIGTERM')
          const e = setTimeout(() => this._child.kill('SIGKILL'), u)
          this._exitPromise.then(() => clearTimeout(e))
        }
        getWorkerId() {
          return this._options.workerId
        }
        getStdout() {
          return this._stdout
        }
        getStderr() {
          return this._stderr
        }
        _getFakeStream() {
          if (!this._fakeStream) {
            this._fakeStream = new (_stream().PassThrough)()
          }
          return this._fakeStream
        }
      }
      t.Z = ChildProcessWorker
    },
    369: (e, t, r) => {
      var s
      s = { value: true }
      t.Z = void 0
      function path() {
        const e = _interopRequireWildcard(r(17))
        path = function () {
          return e
        }
        return e
      }
      function _stream() {
        const e = r(781)
        _stream = function () {
          return e
        }
        return e
      }
      function _worker_threads() {
        const e = r(267)
        _worker_threads = function () {
          return e
        }
        return e
      }
      function _mergeStream() {
        const e = _interopRequireDefault(r(942))
        _mergeStream = function () {
          return e
        }
        return e
      }
      function _types() {
        const e = r(841)
        _types = function () {
          return e
        }
        return e
      }
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e }
      }
      function _getRequireWildcardCache() {
        if (typeof WeakMap !== 'function') return null
        var e = new WeakMap()
        _getRequireWildcardCache = function () {
          return e
        }
        return e
      }
      function _interopRequireWildcard(e) {
        if (e && e.__esModule) {
          return e
        }
        if (e === null || (typeof e !== 'object' && typeof e !== 'function')) {
          return { default: e }
        }
        var t = _getRequireWildcardCache()
        if (t && t.has(e)) {
          return t.get(e)
        }
        var r = {}
        var s = Object.defineProperty && Object.getOwnPropertyDescriptor
        for (var o in e) {
          if (Object.prototype.hasOwnProperty.call(e, o)) {
            var i = s ? Object.getOwnPropertyDescriptor(e, o) : null
            if (i && (i.get || i.set)) {
              Object.defineProperty(r, o, i)
            } else {
              r[o] = e[o]
            }
          }
        }
        r.default = e
        if (t) {
          t.set(e, r)
        }
        return r
      }
      function _defineProperty(e, t, r) {
        if (t in e) {
          Object.defineProperty(e, t, {
            value: r,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        } else {
          e[t] = r
        }
        return e
      }
      class ExperimentalWorker {
        constructor(e) {
          _defineProperty(this, '_worker', void 0)
          _defineProperty(this, '_options', void 0)
          _defineProperty(this, '_request', void 0)
          _defineProperty(this, '_retries', void 0)
          _defineProperty(this, '_onProcessEnd', void 0)
          _defineProperty(this, '_onCustomMessage', void 0)
          _defineProperty(this, '_fakeStream', void 0)
          _defineProperty(this, '_stdout', void 0)
          _defineProperty(this, '_stderr', void 0)
          _defineProperty(this, '_exitPromise', void 0)
          _defineProperty(this, '_resolveExitPromise', void 0)
          _defineProperty(this, '_forceExited', void 0)
          this._options = e
          this._request = null
          this._fakeStream = null
          this._stdout = null
          this._stderr = null
          this._exitPromise = new Promise((e) => {
            this._resolveExitPromise = e
          })
          this._forceExited = false
          this.initialize()
        }
        initialize() {
          this._worker = new (_worker_threads().Worker)(
            path().resolve(__dirname, './threadChild.js'),
            {
              eval: false,
              resourceLimits: this._options.resourceLimits,
              stderr: true,
              stdout: true,
              workerData: {
                cwd: process.cwd(),
                env: {
                  ...process.env,
                  JEST_WORKER_ID: String(this._options.workerId + 1),
                },
                execArgv: process.execArgv.filter(
                  (e) => !/^--(debug|inspect)/.test(e)
                ),
                silent: true,
                ...this._options.forkOptions,
              },
            }
          )
          if (this._worker.stdout) {
            if (!this._stdout) {
              this._stdout = (0, _mergeStream().default)(this._getFakeStream())
            }
            this._stdout.add(this._worker.stdout)
          }
          if (this._worker.stderr) {
            if (!this._stderr) {
              this._stderr = (0, _mergeStream().default)(this._getFakeStream())
            }
            this._stderr.add(this._worker.stderr)
          }
          this._worker.on('message', this._onMessage.bind(this))
          this._worker.on('exit', this._onExit.bind(this))
          this._worker.postMessage([
            _types().CHILD_MESSAGE_INITIALIZE,
            false,
            this._options.workerPath,
            this._options.setupArgs,
          ])
          this._retries++
          if (this._retries > this._options.maxRetries) {
            const e = new Error('Call retries were exceeded')
            this._onMessage([
              _types().PARENT_MESSAGE_CLIENT_ERROR,
              e.name,
              e.message,
              e.stack,
              { type: 'WorkerError' },
            ])
          }
        }
        _shutdown() {
          if (this._fakeStream) {
            this._fakeStream.end()
            this._fakeStream = null
          }
          this._resolveExitPromise()
        }
        _onMessage(e) {
          let t
          switch (e[0]) {
            case _types().PARENT_MESSAGE_OK:
              this._onProcessEnd(null, e[1])
              break
            case _types().PARENT_MESSAGE_CLIENT_ERROR:
              t = e[4]
              if (t != null && typeof t === 'object') {
                const r = t
                const s = global[e[1]]
                const o = typeof s === 'function' ? s : Error
                t = new o(e[2])
                t.type = e[1]
                t.stack = e[3]
                for (const e in r) {
                  t[e] = r[e]
                }
              }
              this._onProcessEnd(t, null)
              break
            case _types().PARENT_MESSAGE_SETUP_ERROR:
              t = new Error('Error when calling setup: ' + e[2])
              t.type = e[1]
              t.stack = e[3]
              this._onProcessEnd(t, null)
              break
            case _types().PARENT_MESSAGE_CUSTOM:
              this._onCustomMessage(e[1])
              break
            default:
              throw new TypeError('Unexpected response from worker: ' + e[0])
          }
        }
        _onExit(e) {
          if (e !== 0 && !this._forceExited) {
            this.initialize()
            if (this._request) {
              this._worker.postMessage(this._request)
            }
          } else {
            this._shutdown()
          }
        }
        waitForExit() {
          return this._exitPromise
        }
        forceExit() {
          this._forceExited = true
          this._worker.terminate()
        }
        send(e, t, r, s) {
          t(this)
          this._onProcessEnd = (...e) => {
            var t
            this._request = null
            const s = (t = r) === null || t === void 0 ? void 0 : t(...e)
            r = null
            return s
          }
          this._onCustomMessage = (...e) => s(...e)
          this._request = e
          this._retries = 0
          this._worker.postMessage(e)
        }
        getWorkerId() {
          return this._options.workerId
        }
        getStdout() {
          return this._stdout
        }
        getStderr() {
          return this._stderr
        }
        _getFakeStream() {
          if (!this._fakeStream) {
            this._fakeStream = new (_stream().PassThrough)()
          }
          return this._fakeStream
        }
      }
      t.Z = ExperimentalWorker
    },
    524: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t['default'] = messageParent
      function _types() {
        const e = r(841)
        _types = function () {
          return e
        }
        return e
      }
      const s = (() => {
        try {
          const { isMainThread: e, parentPort: t } = r(267)
          return !e && t != null
        } catch {
          return false
        }
      })()
      function messageParent(e, t = process) {
        if (s) {
          const { parentPort: t } = r(267)
          t.postMessage([_types().PARENT_MESSAGE_CUSTOM, e])
        } else if (typeof t.send === 'function') {
          t.send([_types().PARENT_MESSAGE_CUSTOM, e])
        } else {
          throw new Error('"messageParent" can only be used inside a worker')
        }
      }
    },
    942: (e, t, r) => {
      const { PassThrough: s } = r(781)
      e.exports = function () {
        var e = []
        var t = new s({ objectMode: true })
        t.setMaxListeners(0)
        t.add = add
        t.isEmpty = isEmpty
        t.on('unpipe', remove)
        Array.prototype.slice.call(arguments).forEach(add)
        return t
        function add(r) {
          if (Array.isArray(r)) {
            r.forEach(add)
            return this
          }
          e.push(r)
          r.once('end', remove.bind(null, r))
          r.once('error', t.emit.bind(t, 'error'))
          r.pipe(t, { end: false })
          return this
        }
        function isEmpty() {
          return e.length == 0
        }
        function remove(r) {
          e = e.filter(function (e) {
            return e !== r
          })
          if (!e.length && t.readable) {
            t.end()
          }
        }
      }
    },
    178: (e, t, r) => {
      const s = r(37)
      const o = r(224)
      const i = r(914)
      const { env: n } = process
      let u
      if (
        i('no-color') ||
        i('no-colors') ||
        i('color=false') ||
        i('color=never')
      ) {
        u = 0
      } else if (
        i('color') ||
        i('colors') ||
        i('color=true') ||
        i('color=always')
      ) {
        u = 1
      }
      function envForceColor() {
        if ('FORCE_COLOR' in n) {
          if (n.FORCE_COLOR === 'true') {
            return 1
          }
          if (n.FORCE_COLOR === 'false') {
            return 0
          }
          return n.FORCE_COLOR.length === 0
            ? 1
            : Math.min(Number.parseInt(n.FORCE_COLOR, 10), 3)
        }
      }
      function translateLevel(e) {
        if (e === 0) {
          return false
        }
        return { level: e, hasBasic: true, has256: e >= 2, has16m: e >= 3 }
      }
      function supportsColor(e, { streamIsTTY: t, sniffFlags: r = true } = {}) {
        const o = envForceColor()
        if (o !== undefined) {
          u = o
        }
        const _ = r ? u : o
        if (_ === 0) {
          return 0
        }
        if (r) {
          if (i('color=16m') || i('color=full') || i('color=truecolor')) {
            return 3
          }
          if (i('color=256')) {
            return 2
          }
        }
        if (e && !t && _ === undefined) {
          return 0
        }
        const l = _ || 0
        if (n.TERM === 'dumb') {
          return l
        }
        if (process.platform === 'win32') {
          const e = s.release().split('.')
          if (Number(e[0]) >= 10 && Number(e[2]) >= 10586) {
            return Number(e[2]) >= 14931 ? 3 : 2
          }
          return 1
        }
        if ('CI' in n) {
          if (
            [
              'TRAVIS',
              'CIRCLECI',
              'APPVEYOR',
              'GITLAB_CI',
              'GITHUB_ACTIONS',
              'BUILDKITE',
              'DRONE',
            ].some((e) => e in n) ||
            n.CI_NAME === 'codeship'
          ) {
            return 1
          }
          return l
        }
        if ('TEAMCITY_VERSION' in n) {
          return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION)
            ? 1
            : 0
        }
        if (n.COLORTERM === 'truecolor') {
          return 3
        }
        if ('TERM_PROGRAM' in n) {
          const e = Number.parseInt(
            (n.TERM_PROGRAM_VERSION || '').split('.')[0],
            10
          )
          switch (n.TERM_PROGRAM) {
            case 'iTerm.app':
              return e >= 3 ? 3 : 2
            case 'Apple_Terminal':
              return 2
          }
        }
        if (/-256(color)?$/i.test(n.TERM)) {
          return 2
        }
        if (
          /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
            n.TERM
          )
        ) {
          return 1
        }
        if ('COLORTERM' in n) {
          return 1
        }
        return l
      }
      function getSupportLevel(e, t = {}) {
        const r = supportsColor(e, { streamIsTTY: e && e.isTTY, ...t })
        return translateLevel(r)
      }
      e.exports = {
        supportsColor: getSupportLevel,
        stdout: getSupportLevel({ isTTY: o.isatty(1) }),
        stderr: getSupportLevel({ isTTY: o.isatty(2) }),
      }
    },
    81: (e) => {
      e.exports = require('child_process')
    },
    37: (e) => {
      e.exports = require('os')
    },
    17: (e) => {
      e.exports = require('path')
    },
    781: (e) => {
      e.exports = require('stream')
    },
    224: (e) => {
      e.exports = require('tty')
    },
    267: (e) => {
      e.exports = require('worker_threads')
    },
  }
  var t = {}
  function __nccwpck_require__(r) {
    var s = t[r]
    if (s !== undefined) {
      return s.exports
    }
    var o = (t[r] = { exports: {} })
    var i = true
    try {
      e[r](o, o.exports, __nccwpck_require__)
      i = false
    } finally {
      if (i) delete t[r]
    }
    return o.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var r = {}
  ;(() => {
    var e = r
    Object.defineProperty(e, '__esModule', { value: true })
    Object.defineProperty(e, 'PriorityQueue', {
      enumerable: true,
      get: function () {
        return o.default
      },
    })
    Object.defineProperty(e, 'FifoQueue', {
      enumerable: true,
      get: function () {
        return i.default
      },
    })
    Object.defineProperty(e, 'messageParent', {
      enumerable: true,
      get: function () {
        return n.default
      },
    })
    e.Worker = void 0
    function _os() {
      const e = __nccwpck_require__(37)
      _os = function () {
        return e
      }
      return e
    }
    var t = _interopRequireDefault(__nccwpck_require__(982))
    var s = _interopRequireDefault(__nccwpck_require__(953))
    var o = _interopRequireDefault(__nccwpck_require__(513))
    var i = _interopRequireDefault(__nccwpck_require__(282))
    var n = _interopRequireDefault(__nccwpck_require__(524))
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e }
    }
    function _defineProperty(e, t, r) {
      if (t in e) {
        Object.defineProperty(e, t, {
          value: r,
          enumerable: true,
          configurable: true,
          writable: true,
        })
      } else {
        e[t] = r
      }
      return e
    }
    function getExposedMethods(e, t) {
      let r = t.exposedMethods
      if (!r) {
        const t = require(e)
        r = Object.keys(t).filter((e) => typeof t[e] === 'function')
        if (typeof t === 'function') {
          r = [...r, 'default']
        }
      }
      return r
    }
    class Worker {
      constructor(e, r) {
        var o, i, n, u, _, l
        _defineProperty(this, '_ending', void 0)
        _defineProperty(this, '_farm', void 0)
        _defineProperty(this, '_options', void 0)
        _defineProperty(this, '_workerPool', void 0)
        this._options = { ...r }
        this._ending = false
        const a = {
          enableWorkerThreads:
            (o = this._options.enableWorkerThreads) !== null && o !== void 0
              ? o
              : false,
          forkOptions:
            (i = this._options.forkOptions) !== null && i !== void 0 ? i : {},
          maxRetries:
            (n = this._options.maxRetries) !== null && n !== void 0 ? n : 3,
          numWorkers:
            (u = this._options.numWorkers) !== null && u !== void 0
              ? u
              : Math.max((0, _os().cpus)().length - 1, 1),
          resourceLimits:
            (_ = this._options.resourceLimits) !== null && _ !== void 0
              ? _
              : {},
          setupArgs:
            (l = this._options.setupArgs) !== null && l !== void 0 ? l : [],
        }
        if (this._options.WorkerPool) {
          this._workerPool = new this._options.WorkerPool(e, a)
        } else {
          this._workerPool = new s.default(e, a)
        }
        this._farm = new t.default(
          a.numWorkers,
          this._workerPool.send.bind(this._workerPool),
          {
            computeWorkerKey: this._options.computeWorkerKey,
            taskQueue: this._options.taskQueue,
            workerSchedulingPolicy: this._options.workerSchedulingPolicy,
          }
        )
        this._bindExposedWorkerMethods(e, this._options)
      }
      _bindExposedWorkerMethods(e, t) {
        getExposedMethods(e, t).forEach((e) => {
          if (e.startsWith('_')) {
            return
          }
          if (this.constructor.prototype.hasOwnProperty(e)) {
            throw new TypeError('Cannot define a method called ' + e)
          }
          this[e] = this._callFunctionWithArgs.bind(this, e)
        })
      }
      _callFunctionWithArgs(e, ...t) {
        if (this._ending) {
          throw new Error('Farm is ended, no more calls can be done to it')
        }
        return this._farm.doWork(e, ...t)
      }
      getStderr() {
        return this._workerPool.getStderr()
      }
      getStdout() {
        return this._workerPool.getStdout()
      }
      async end() {
        if (this._ending) {
          throw new Error('Farm is ended, no more calls can be done to it')
        }
        this._ending = true
        return this._workerPool.end()
      }
    }
    e.Worker = Worker
  })()
  module.exports = r
})()
