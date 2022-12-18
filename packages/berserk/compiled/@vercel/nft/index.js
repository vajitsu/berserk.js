;(() => {
  var __webpack_modules__ = {
    4917: (e, t, r) => {
      e.exports = t
      t.mockS3Http = r(5563).get_mockS3Http()
      t.mockS3Http('on')
      const s = t.mockS3Http('get')
      const a = r(7147)
      const o = r(1017)
      const u = r(1758)
      const c = r(1069)
      c.disableProgress()
      const f = r(3184)
      const p = r(2361).EventEmitter
      const h = r(3837).inherits
      const d = [
        'clean',
        'install',
        'reinstall',
        'build',
        'rebuild',
        'package',
        'testpackage',
        'publish',
        'unpublish',
        'info',
        'testbinary',
        'reveal',
        'configure',
      ]
      const g = {}
      c.heading = 'node-pre-gyp'
      if (s) {
        c.warn(`mocking s3 to ${process.env.node_pre_gyp_mock_s3}`)
      }
      Object.defineProperty(t, 'find', {
        get: function () {
          return r(985).find
        },
        enumerable: true,
      })
      function Run({ package_json_path: e = './package.json', argv: t }) {
        this.package_json_path = e
        this.commands = {}
        const r = this
        d.forEach((e) => {
          r.commands[e] = function (t, s) {
            c.verbose('command', e, t)
            return require('./' + e)(r, t, s)
          }
        })
        this.parseArgv(t)
        this.binaryHostSet = false
      }
      h(Run, p)
      t.Run = Run
      const v = Run.prototype
      v.package = r(2181)
      v.configDefs = {
        help: Boolean,
        arch: String,
        debug: Boolean,
        directory: String,
        proxy: String,
        loglevel: String,
      }
      v.shorthands = {
        release: '--no-debug',
        C: '--directory',
        debug: '--debug',
        j: '--jobs',
        silent: '--loglevel=silent',
        silly: '--loglevel=silly',
        verbose: '--loglevel=verbose',
      }
      v.aliases = g
      v.parseArgv = function parseOpts(e) {
        this.opts = u(this.configDefs, this.shorthands, e)
        this.argv = this.opts.argv.remain.slice()
        const t = (this.todo = [])
        e = this.argv.map((e) => {
          if (e in this.aliases) {
            e = this.aliases[e]
          }
          return e
        })
        e.slice().forEach((r) => {
          if (r in this.commands) {
            const s = e.splice(0, e.indexOf(r))
            e.shift()
            if (t.length > 0) {
              t[t.length - 1].args = s
            }
            t.push({ name: r, args: [] })
          }
        })
        if (t.length > 0) {
          t[t.length - 1].args = e.splice(0)
        }
        let r = this.package_json_path
        if (this.opts.directory) {
          r = o.join(this.opts.directory, r)
        }
        this.package_json = JSON.parse(a.readFileSync(r))
        this.todo = f.expand_commands(this.package_json, this.opts, t)
        const s = 'npm_config_'
        Object.keys(process.env).forEach((e) => {
          if (e.indexOf(s) !== 0) return
          const t = process.env[e]
          if (e === s + 'loglevel') {
            c.level = t
          } else {
            e = e.substring(s.length)
            if (e === 'argv') {
              if (
                this.opts.argv &&
                this.opts.argv.remain &&
                this.opts.argv.remain.length
              ) {
              } else {
                this.opts[e] = t
              }
            } else {
              this.opts[e] = t
            }
          }
        })
        if (this.opts.loglevel) {
          c.level = this.opts.loglevel
        }
        c.resume()
      }
      v.setBinaryHostProperty = function (e) {
        if (this.binaryHostSet) {
          return this.package_json.binary.host
        }
        const t = this.package_json
        if (!t || !t.binary || t.binary.host) {
          return ''
        }
        if (!t.binary.staging_host || !t.binary.production_host) {
          return ''
        }
        let r = 'production_host'
        if (e === 'publish' || e === 'unpublish') {
          r = 'staging_host'
        }
        const s = process.env.node_pre_gyp_s3_host
        if (s === 'staging' || s === 'production') {
          r = `${s}_host`
        } else if (
          this.opts['s3_host'] === 'staging' ||
          this.opts['s3_host'] === 'production'
        ) {
          r = `${this.opts['s3_host']}_host`
        } else if (this.opts['s3_host'] || s) {
          throw new Error(`invalid s3_host ${this.opts['s3_host'] || s}`)
        }
        t.binary.host = t.binary[r]
        this.binaryHostSet = true
        return t.binary.host
      }
      v.usage = function usage() {
        const e = [
          '',
          '  Usage: node-pre-gyp <command> [options]',
          '',
          '  where <command> is one of:',
          d
            .map((e) => '    - ' + e + ' - ' + require('./' + e).usage)
            .join('\n'),
          '',
          'node-pre-gyp@' + this.version + '  ' + o.resolve(__dirname, '..'),
          'node@' + process.versions.node,
        ].join('\n')
        return e
      }
      Object.defineProperty(v, 'version', {
        get: function () {
          return this.package.version
        },
        enumerable: true,
      })
    },
    985: (e, t, r) => {
      const s = r(4917)
      const a = r(606)
      const o = r(3184)
      const u = r(7147).existsSync || r(1017).existsSync
      const c = r(1017)
      e.exports = t
      t.usage = 'Finds the require path for the node-pre-gyp installed module'
      t.validate = function (e, t) {
        a.validate_config(e, t)
      }
      t.find = function (e, t) {
        if (!u(e)) {
          throw new Error(e + 'does not exist')
        }
        const r = new s.Run({ package_json_path: e, argv: process.argv })
        r.setBinaryHostProperty()
        const f = r.package_json
        a.validate_config(f, t)
        let p
        if (o.get_napi_build_versions(f, t)) {
          p = o.get_best_napi_build_version(f, t)
        }
        t = t || {}
        if (!t.module_root) t.module_root = c.dirname(e)
        const h = a.evaluate(f, t, p)
        return h.module
      }
    },
    3184: (e, t, r) => {
      const s = r(7147)
      e.exports = t
      const a = process.version
        .substr(1)
        .replace(/-.*$/, '')
        .split('.')
        .map((e) => +e)
      const o = [
        'build',
        'clean',
        'configure',
        'package',
        'publish',
        'reveal',
        'testbinary',
        'testpackage',
        'unpublish',
      ]
      const u = 'napi_build_version='
      e.exports.get_napi_version = function () {
        let e = process.versions.napi
        if (!e) {
          if (a[0] === 9 && a[1] >= 3) e = 2
          else if (a[0] === 8) e = 1
        }
        return e
      }
      e.exports.get_napi_version_as_string = function (t) {
        const r = e.exports.get_napi_version(t)
        return r ? '' + r : ''
      }
      e.exports.validate_package_json = function (t, r) {
        const s = t.binary
        const a = pathOK(s.module_path)
        const o = pathOK(s.remote_path)
        const u = pathOK(s.package_name)
        const c = e.exports.get_napi_build_versions(t, r, true)
        const f = e.exports.get_napi_build_versions_raw(t)
        if (c) {
          c.forEach((e) => {
            if (!(parseInt(e, 10) === e && e > 0)) {
              throw new Error(
                'All values specified in napi_versions must be positive integers.'
              )
            }
          })
        }
        if (c && (!a || (!o && !u))) {
          throw new Error(
            'When napi_versions is specified; module_path and either remote_path or ' +
              "package_name must contain the substitution string '{napi_build_version}`."
          )
        }
        if ((a || o || u) && !f) {
          throw new Error(
            "When the substitution string '{napi_build_version}` is specified in " +
              'module_path, remote_path, or package_name; napi_versions must also be specified.'
          )
        }
        if (
          c &&
          !e.exports.get_best_napi_build_version(t, r) &&
          e.exports.build_napi_only(t)
        ) {
          throw new Error(
            'The Node-API version of this Node instance is ' +
              e.exports.get_napi_version(r ? r.target : undefined) +
              '. ' +
              'This module supports Node-API version(s) ' +
              e.exports.get_napi_build_versions_raw(t) +
              '. ' +
              'This Node instance cannot run this module.'
          )
        }
        if (f && !c && e.exports.build_napi_only(t)) {
          throw new Error(
            'The Node-API version of this Node instance is ' +
              e.exports.get_napi_version(r ? r.target : undefined) +
              '. ' +
              'This module supports Node-API version(s) ' +
              e.exports.get_napi_build_versions_raw(t) +
              '. ' +
              'This Node instance cannot run this module.'
          )
        }
      }
      function pathOK(e) {
        return (
          e &&
          (e.indexOf('{napi_build_version}') !== -1 ||
            e.indexOf('{node_napi_label}') !== -1)
        )
      }
      e.exports.expand_commands = function (t, r, s) {
        const a = []
        const c = e.exports.get_napi_build_versions(t, r)
        s.forEach((s) => {
          if (c && s.name === 'install') {
            const o = e.exports.get_best_napi_build_version(t, r)
            const c = o ? [u + o] : []
            a.push({ name: s.name, args: c })
          } else if (c && o.indexOf(s.name) !== -1) {
            c.forEach((e) => {
              const t = s.args.slice()
              t.push(u + e)
              a.push({ name: s.name, args: t })
            })
          } else {
            a.push(s)
          }
        })
        return a
      }
      e.exports.get_napi_build_versions = function (t, s, a) {
        const o = r(1069)
        let u = []
        const c = e.exports.get_napi_version(s ? s.target : undefined)
        if (t.binary && t.binary.napi_versions) {
          t.binary.napi_versions.forEach((e) => {
            const t = u.indexOf(e) !== -1
            if (!t && c && e <= c) {
              u.push(e)
            } else if (a && !t && c) {
              o.info(
                'This Node instance does not support builds for Node-API version',
                e
              )
            }
          })
        }
        if (s && s['build-latest-napi-version-only']) {
          let e = 0
          u.forEach((t) => {
            if (t > e) e = t
          })
          u = e ? [e] : []
        }
        return u.length ? u : undefined
      }
      e.exports.get_napi_build_versions_raw = function (e) {
        const t = []
        if (e.binary && e.binary.napi_versions) {
          e.binary.napi_versions.forEach((e) => {
            if (t.indexOf(e) === -1) {
              t.push(e)
            }
          })
        }
        return t.length ? t : undefined
      }
      e.exports.get_command_arg = function (e) {
        return u + e
      }
      e.exports.get_napi_build_version_from_command_args = function (e) {
        for (let t = 0; t < e.length; t++) {
          const r = e[t]
          if (r.indexOf(u) === 0) {
            return parseInt(r.substr(u.length), 10)
          }
        }
        return undefined
      }
      e.exports.swap_build_dir_out = function (t) {
        if (t) {
          const a = r(4700)
          a.sync(e.exports.get_build_dir(t))
          s.renameSync('build', e.exports.get_build_dir(t))
        }
      }
      e.exports.swap_build_dir_in = function (t) {
        if (t) {
          const a = r(4700)
          a.sync('build')
          s.renameSync(e.exports.get_build_dir(t), 'build')
        }
      }
      e.exports.get_build_dir = function (e) {
        return 'build-tmp-napi-v' + e
      }
      e.exports.get_best_napi_build_version = function (t, r) {
        let s = 0
        const a = e.exports.get_napi_build_versions(t, r)
        if (a) {
          const t = e.exports.get_napi_version(r ? r.target : undefined)
          a.forEach((e) => {
            if (e > s && e <= t) {
              s = e
            }
          })
        }
        return s === 0 ? undefined : s
      }
      e.exports.build_napi_only = function (e) {
        return (
          e.binary &&
          e.binary.package_name &&
          e.binary.package_name.indexOf('{node_napi_label}') === -1
        )
      }
    },
    5563: (e, t, r) => {
      e.exports = t
      const s = r(7310)
      const a = r(7147)
      const o = r(1017)
      e.exports.detect = function (e, t) {
        const r = e.hosted_path
        const a = s.parse(r)
        t.prefix =
          !a.pathname || a.pathname === '/' ? '' : a.pathname.replace('/', '')
        if (e.bucket && e.region) {
          t.bucket = e.bucket
          t.region = e.region
          t.endpoint = e.host
          t.s3ForcePathStyle = e.s3ForcePathStyle
        } else {
          const e = a.hostname.split('.s3')
          const r = e[0]
          if (!r) {
            return
          }
          if (!t.bucket) {
            t.bucket = r
          }
          if (!t.region) {
            const r = e[1].slice(1).split('.')[0]
            if (r === 'amazonaws') {
              t.region = 'us-east-1'
            } else {
              t.region = r
            }
          }
        }
      }
      e.exports.get_s3 = function (e) {
        if (process.env.node_pre_gyp_mock_s3) {
          const e = r(3930)
          const t = r(2037)
          e.config.basePath = `${t.tmpdir()}/mock`
          const s = e.S3()
          const wcb =
            (e) =>
            (t, ...r) => {
              if (t && t.code === 'ENOENT') {
                t.code = 'NotFound'
              }
              return e(t, ...r)
            }
          return {
            listObjects(e, t) {
              return s.listObjects(e, wcb(t))
            },
            headObject(e, t) {
              return s.headObject(e, wcb(t))
            },
            deleteObject(e, t) {
              return s.deleteObject(e, wcb(t))
            },
            putObject(e, t) {
              return s.putObject(e, wcb(t))
            },
          }
        }
        const t = r(2355)
        t.config.update(e)
        const s = new t.S3()
        return {
          listObjects(e, t) {
            return s.listObjects(e, t)
          },
          headObject(e, t) {
            return s.headObject(e, t)
          },
          deleteObject(e, t) {
            return s.deleteObject(e, t)
          },
          putObject(e, t) {
            return s.putObject(e, t)
          },
        }
      }
      e.exports.get_mockS3Http = function () {
        let e = false
        if (!process.env.node_pre_gyp_mock_s3) {
          return () => e
        }
        const t = r(4997)
        const s =
          'https://mapbox-node-pre-gyp-public-testing-bucket.s3.us-east-1.amazonaws.com'
        const u =
          process.env.node_pre_gyp_mock_s3 +
          '/mapbox-node-pre-gyp-public-testing-bucket'
        const mock_http = () => {
          function get(e, t) {
            const r = o.join(u, e.replace('%2B', '+'))
            try {
              a.accessSync(r, a.constants.R_OK)
            } catch (e) {
              return [404, 'not found\n']
            }
            return [200, a.createReadStream(r)]
          }
          return t(s)
            .persist()
            .get(() => e)
            .reply(get)
        }
        mock_http(t, s, u)
        const mockS3Http = (t) => {
          const r = e
          if (t === 'off') {
            e = false
          } else if (t === 'on') {
            e = true
          } else if (t !== 'get') {
            throw new Error(`illegal action for setMockHttp ${t}`)
          }
          return r
        }
        return mockS3Http
      }
    },
    606: (e, t, r) => {
      e.exports = t
      const s = r(1017)
      const a = r(798)
      const o = r(7310)
      const u = r(6972)
      const c = r(3184)
      let f
      if (process.env.NODE_PRE_GYP_ABI_CROSSWALK) {
        f = require(process.env.NODE_PRE_GYP_ABI_CROSSWALK)
      } else {
        f = r(1152)
      }
      const p = {}
      Object.keys(f).forEach((e) => {
        const t = e.split('.')[0]
        if (!p[t]) {
          p[t] = e
        }
      })
      function get_electron_abi(e, t) {
        if (!e) {
          throw new Error('get_electron_abi requires valid runtime arg')
        }
        if (typeof t === 'undefined') {
          throw new Error(
            'Empty target version is not supported if electron is the target.'
          )
        }
        const r = a.parse(t)
        return e + '-v' + r.major + '.' + r.minor
      }
      e.exports.get_electron_abi = get_electron_abi
      function get_node_webkit_abi(e, t) {
        if (!e) {
          throw new Error('get_node_webkit_abi requires valid runtime arg')
        }
        if (typeof t === 'undefined') {
          throw new Error(
            'Empty target version is not supported if node-webkit is the target.'
          )
        }
        return e + '-v' + t
      }
      e.exports.get_node_webkit_abi = get_node_webkit_abi
      function get_node_abi(e, t) {
        if (!e) {
          throw new Error('get_node_abi requires valid runtime arg')
        }
        if (!t) {
          throw new Error('get_node_abi requires valid process.versions object')
        }
        const r = a.parse(t.node)
        if (r.major === 0 && r.minor % 2) {
          return e + '-v' + t.node
        } else {
          return t.modules
            ? e + '-v' + +t.modules
            : 'v8-' + t.v8.split('.').slice(0, 2).join('.')
        }
      }
      e.exports.get_node_abi = get_node_abi
      function get_runtime_abi(e, t) {
        if (!e) {
          throw new Error('get_runtime_abi requires valid runtime arg')
        }
        if (e === 'node-webkit') {
          return get_node_webkit_abi(e, t || process.versions['node-webkit'])
        } else if (e === 'electron') {
          return get_electron_abi(e, t || process.versions.electron)
        } else {
          if (e !== 'node') {
            throw new Error("Unknown Runtime: '" + e + "'")
          }
          if (!t) {
            return get_node_abi(e, process.versions)
          } else {
            let r
            if (f[t]) {
              r = f[t]
            } else {
              const e = t.split('.').map((e) => +e)
              if (e.length !== 3) {
                throw new Error('Unknown target version: ' + t)
              }
              const s = e[0]
              let a = e[1]
              let o = e[2]
              if (s === 1) {
                while (true) {
                  if (a > 0) --a
                  if (o > 0) --o
                  const e = '' + s + '.' + a + '.' + o
                  if (f[e]) {
                    r = f[e]
                    console.log(
                      'Warning: node-pre-gyp could not find exact match for ' +
                        t
                    )
                    console.log(
                      'Warning: but node-pre-gyp successfully choose ' +
                        e +
                        ' as ABI compatible target'
                    )
                    break
                  }
                  if (a === 0 && o === 0) {
                    break
                  }
                }
              } else if (s >= 2) {
                if (p[s]) {
                  r = f[p[s]]
                  console.log(
                    'Warning: node-pre-gyp could not find exact match for ' + t
                  )
                  console.log(
                    'Warning: but node-pre-gyp successfully choose ' +
                      p[s] +
                      ' as ABI compatible target'
                  )
                }
              } else if (s === 0) {
                if (e[1] % 2 === 0) {
                  while (--o > 0) {
                    const e = '' + s + '.' + a + '.' + o
                    if (f[e]) {
                      r = f[e]
                      console.log(
                        'Warning: node-pre-gyp could not find exact match for ' +
                          t
                      )
                      console.log(
                        'Warning: but node-pre-gyp successfully choose ' +
                          e +
                          ' as ABI compatible target'
                      )
                      break
                    }
                  }
                }
              }
            }
            if (!r) {
              throw new Error('Unsupported target version: ' + t)
            }
            const s = {
              node: t,
              v8: r.v8 + '.0',
              modules: r.node_abi > 1 ? r.node_abi : undefined,
            }
            return get_node_abi(e, s)
          }
        }
      }
      e.exports.get_runtime_abi = get_runtime_abi
      const h = ['module_name', 'module_path', 'host']
      function validate_config(e, t) {
        const r = e.name + ' package.json is not node-pre-gyp ready:\n'
        const s = []
        if (!e.main) {
          s.push('main')
        }
        if (!e.version) {
          s.push('version')
        }
        if (!e.name) {
          s.push('name')
        }
        if (!e.binary) {
          s.push('binary')
        }
        const a = e.binary
        if (a) {
          h.forEach((e) => {
            if (!a[e] || typeof a[e] !== 'string') {
              s.push('binary.' + e)
            }
          })
        }
        if (s.length >= 1) {
          throw new Error(
            r + 'package.json must declare these properties: \n' + s.join('\n')
          )
        }
        if (a) {
          const e = o.parse(a.host).protocol
          if (e === 'http:') {
            throw new Error(
              "'host' protocol (" +
                e +
                ") is invalid - only 'https:' is accepted"
            )
          }
        }
        c.validate_package_json(e, t)
      }
      e.exports.validate_config = validate_config
      function eval_template(e, t) {
        Object.keys(t).forEach((r) => {
          const s = '{' + r + '}'
          while (e.indexOf(s) > -1) {
            e = e.replace(s, t[r])
          }
        })
        return e
      }
      function fix_slashes(e) {
        if (e.slice(-1) !== '/') {
          return e + '/'
        }
        return e
      }
      function drop_double_slashes(e) {
        return e.replace(/\/\//g, '/')
      }
      function get_process_runtime(e) {
        let t = 'node'
        if (e['node-webkit']) {
          t = 'node-webkit'
        } else if (e.electron) {
          t = 'electron'
        }
        return t
      }
      e.exports.get_process_runtime = get_process_runtime
      const d = '{module_name}-v{version}-{node_abi}-{platform}-{arch}.tar.gz'
      const g = ''
      e.exports.evaluate = function (e, t, r) {
        t = t || {}
        validate_config(e, t)
        const f = e.version
        const p = a.parse(f)
        const h = t.runtime || get_process_runtime(process.versions)
        const v = {
          name: e.name,
          configuration: t.debug ? 'Debug' : 'Release',
          debug: t.debug,
          module_name: e.binary.module_name,
          version: p.version,
          prerelease: p.prerelease.length ? p.prerelease.join('.') : '',
          build: p.build.length ? p.build.join('.') : '',
          major: p.major,
          minor: p.minor,
          patch: p.patch,
          runtime: h,
          node_abi: get_runtime_abi(h, t.target),
          node_abi_napi: c.get_napi_version(t.target)
            ? 'napi'
            : get_runtime_abi(h, t.target),
          napi_version: c.get_napi_version(t.target),
          napi_build_version: r || '',
          node_napi_label: r ? 'napi-v' + r : get_runtime_abi(h, t.target),
          target: t.target || '',
          platform: t.target_platform || process.platform,
          target_platform: t.target_platform || process.platform,
          arch: t.target_arch || process.arch,
          target_arch: t.target_arch || process.arch,
          libc: t.target_libc || u.familySync() || 'unknown',
          module_main: e.main,
          toolset: t.toolset || '',
          bucket: e.binary.bucket,
          region: e.binary.region,
          s3ForcePathStyle: e.binary.s3ForcePathStyle || false,
        }
        const m = v.module_name.replace('-', '_')
        const y =
          process.env['npm_config_' + m + '_binary_host_mirror'] ||
          e.binary.host
        v.host = fix_slashes(eval_template(y, v))
        v.module_path = eval_template(e.binary.module_path, v)
        if (t.module_root) {
          v.module_path = s.join(t.module_root, v.module_path)
        } else {
          v.module_path = s.resolve(v.module_path)
        }
        v.module = s.join(v.module_path, v.module_name + '.node')
        v.remote_path = e.binary.remote_path
          ? drop_double_slashes(
              fix_slashes(eval_template(e.binary.remote_path, v))
            )
          : g
        const _ = e.binary.package_name ? e.binary.package_name : d
        v.package_name = eval_template(_, v)
        v.staged_tarball = s.join('build/stage', v.remote_path, v.package_name)
        v.hosted_path = o.resolve(v.host, v.remote_path)
        v.hosted_tarball = o.resolve(v.hosted_path, v.package_name)
        return v
      }
    },
    3028: function (e, t, r) {
      var s =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e }
        }
      Object.defineProperty(t, '__esModule', { value: true })
      const a = s(r(1017))
      const o = r(5224)
      const u = r(8010)
      const c = r(8107)
      const f = s(r(3331))
      const p = r(6922)
      const h = s(r(3460))
      const d = r(5258)
      const g = r(4184)
      const v = r(2122)
      const m = s(r(2221))
      const y = s(r(5825))
      const _ = s(r(646))
      const D = s(r(4917))
      const x = r(7310)
      const E = r(3982).asyncWalk
      const w = c.Parser.extend()
      const C = s(r(2037))
      const S = r(867)
      const A = s(r(2382))
      const R = {
        cwd: () => G,
        env: { NODE_ENV: u.UNKNOWN, [u.UNKNOWN]: true },
        [u.UNKNOWN]: true,
      }
      const k = Symbol()
      const T = Symbol()
      const F = Symbol()
      const O = Symbol()
      const I = Symbol()
      const L = Symbol()
      const N = Symbol()
      const P = Symbol()
      const B = Symbol()
      const j = {
        access: L,
        accessSync: L,
        createReadStream: L,
        exists: L,
        existsSync: L,
        fstat: L,
        fstatSync: L,
        lstat: L,
        lstatSync: L,
        open: L,
        readdir: N,
        readdirSync: N,
        readFile: L,
        readFileSync: L,
        stat: L,
        statSync: L,
      }
      const M = Object.assign(Object.assign({}, j), {
        pathExists: L,
        pathExistsSync: L,
        readJson: L,
        readJSON: L,
        readJsonSync: L,
        readJSONSync: L,
      })
      const H = Object.assign(Object.create(null), {
        bindings: { default: P },
        express: {
          default: function () {
            return { [u.UNKNOWN]: true, set: k, engine: T }
          },
        },
        fs: Object.assign({ default: j }, j),
        'fs-extra': Object.assign({ default: M }, M),
        'graceful-fs': Object.assign({ default: j }, j),
        process: Object.assign({ default: R }, R),
        path: { default: {} },
        os: Object.assign({ default: C.default }, C.default),
        '@mapbox/node-pre-gyp': Object.assign(
          { default: D.default },
          D.default
        ),
        'node-pre-gyp': g.pregyp,
        'node-pre-gyp/lib/pre-binding': g.pregyp,
        'node-pre-gyp/lib/pre-binding.js': g.pregyp,
        'node-gyp-build': { default: B },
        nbind: { init: F, default: { init: F } },
        'resolve-from': { default: A.default },
        'strong-globalize': { default: { SetRootDir: O }, SetRootDir: O },
        pkginfo: { default: I },
      })
      const $ = {
        _interopRequireDefault: v.normalizeDefaultRequire,
        _interopRequireWildcard: v.normalizeWildcardRequire,
        __importDefault: v.normalizeDefaultRequire,
        __importStar: v.normalizeWildcardRequire,
        MONGOOSE_DRIVER_PATH: undefined,
        URL: x.URL,
        Object: { assign: Object.assign },
      }
      $.global = $.GLOBAL = $.globalThis = $
      const U = Symbol()
      g.pregyp.find[U] = true
      const W = H.path
      Object.keys(a.default).forEach((e) => {
        const t = a.default[e]
        if (typeof t === 'function') {
          const r = function mockPath() {
            return t.apply(mockPath, arguments)
          }
          r[U] = true
          W[e] = W.default[e] = r
        } else {
          W[e] = W.default[e] = t
        }
      })
      W.resolve = W.default.resolve = function (...e) {
        return a.default.resolve.apply(this, [G, ...e])
      }
      W.resolve[U] = true
      const V = new Set(['.h', '.cmake', '.c', '.cpp'])
      const q = new Set([
        'CHANGELOG.md',
        'README.md',
        'readme.md',
        'changelog.md',
      ])
      let G
      const K = /^\/[^\/]+|^[a-z]:[\\/][^\\/]+/i
      function isAbsolutePathOrUrl(e) {
        if (e instanceof x.URL) return e.protocol === 'file:'
        if (typeof e === 'string') {
          if (e.startsWith('file:')) {
            try {
              new x.URL(e)
              return true
            } catch (e) {
              return false
            }
          }
          return K.test(e)
        }
        return false
      }
      const z = Symbol()
      const Q = /([\/\\]\*\*[\/\\]\*)+/g
      async function analyze(e, t, r) {
        const s = new Set()
        const c = new Set()
        const v = new Set()
        const D = a.default.dirname(e)
        G = r.cwd
        const C = d.getPackageBase(e)
        const emitAssetDirectory = (e) => {
          if (!r.analysis.emitGlobs) return
          const t = e.indexOf(u.WILDCARD)
          const o = t === -1 ? e.length : e.lastIndexOf(a.default.sep, t)
          const c = e.substring(0, o)
          const f = e.slice(o)
          const p =
            f
              .replace(u.wildcardRegEx, (e, t) =>
                f[t - 1] === a.default.sep ? '**/*' : '*'
              )
              .replace(Q, '/**/*') || '/**/*'
          if (r.ignoreFn(a.default.relative(r.base, c + p))) return
          j = j.then(async () => {
            if (r.log) console.log('Globbing ' + c + p)
            const e = await new Promise((e, t) =>
              h.default(
                c + p,
                { mark: true, ignore: c + '/**/node_modules/**/*' },
                (r, s) => (r ? t(r) : e(s))
              )
            )
            e.filter(
              (e) =>
                !V.has(a.default.extname(e)) &&
                !q.has(a.default.basename(e)) &&
                !e.endsWith('/')
            ).forEach((e) => s.add(e))
          })
        }
        let j = Promise.resolve()
        t = t.replace(/^#![^\n\r]*[\r\n]/, '')
        let M
        let W = false
        try {
          M = w.parse(t, {
            ecmaVersion: 'latest',
            allowReturnOutsideFunction: true,
          })
          W = false
        } catch (t) {
          const s = t && t.message && t.message.includes('sourceType: module')
          if (!s) {
            r.warnings.add(
              new Error(`Failed to parse ${e} as script:\n${t && t.message}`)
            )
          }
        }
        if (!M) {
          try {
            M = w.parse(t, {
              ecmaVersion: 'latest',
              sourceType: 'module',
              allowAwaitOutsideFunction: true,
            })
            W = true
          } catch (t) {
            r.warnings.add(
              new Error(`Failed to parse ${e} as module:\n${t && t.message}`)
            )
            return { assets: s, deps: c, imports: v, isESM: false }
          }
        }
        const Y = x.pathToFileURL(e).href
        const X = Object.assign(Object.create(null), {
          __dirname: {
            shadowDepth: 0,
            value: { value: a.default.resolve(e, '..') },
          },
          __filename: { shadowDepth: 0, value: { value: e } },
          process: { shadowDepth: 0, value: { value: R } },
        })
        if (!W || r.mixedModules) {
          X.require = {
            shadowDepth: 0,
            value: {
              value: {
                [u.FUNCTION](e) {
                  c.add(e)
                  const t = H[e.startsWith('node:') ? e.slice(5) : e]
                  return t.default
                },
                resolve(t) {
                  return y.default(t, e, r)
                },
              },
            },
          }
          X.require.value.value.resolve[U] = true
        }
        function setKnownBinding(e, t) {
          if (e === 'require') return
          X[e] = { shadowDepth: 0, value: t }
        }
        function getKnownBinding(e) {
          const t = X[e]
          if (t) {
            if (t.shadowDepth === 0) {
              return t.value
            }
          }
          return undefined
        }
        function hasKnownBindingValue(e) {
          const t = X[e]
          return t && t.shadowDepth === 0
        }
        if ((W || r.mixedModules) && isAst(M)) {
          for (const e of M.body) {
            if (e.type === 'ImportDeclaration') {
              const t = String(e.source.value)
              c.add(t)
              const r = H[t.startsWith('node:') ? t.slice(5) : t]
              if (r) {
                for (const t of e.specifiers) {
                  if (t.type === 'ImportNamespaceSpecifier')
                    setKnownBinding(t.local.name, { value: r })
                  else if (
                    t.type === 'ImportDefaultSpecifier' &&
                    'default' in r
                  )
                    setKnownBinding(t.local.name, { value: r.default })
                  else if (t.type === 'ImportSpecifier' && t.imported.name in r)
                    setKnownBinding(t.local.name, { value: r[t.imported.name] })
                }
              }
            } else if (
              e.type === 'ExportNamedDeclaration' ||
              e.type === 'ExportAllDeclaration'
            ) {
              if (e.source) c.add(String(e.source.value))
            }
          }
        }
        async function computePureStaticValue(e, t = true) {
          const r = Object.create(null)
          Object.keys($).forEach((e) => {
            r[e] = { value: $[e] }
          })
          Object.keys(X).forEach((e) => {
            r[e] = getKnownBinding(e)
          })
          r['import.meta'] = { url: Y }
          const s = await u.evaluate(e, r, t)
          return s
        }
        let Z
        let J
        let ee = false
        function emitWildcardRequire(e) {
          if (
            !r.analysis.emitGlobs ||
            (!e.startsWith('./') && !e.startsWith('../'))
          )
            return
          e = a.default.resolve(D, e)
          const t = e.indexOf(u.WILDCARD)
          const s = t === -1 ? e.length : e.lastIndexOf(a.default.sep, t)
          const o = e.substring(0, s)
          const f = e.slice(s)
          let p =
            f.replace(u.wildcardRegEx, (e, t) =>
              f[t - 1] === a.default.sep ? '**/*' : '*'
            ) || '/**/*'
          if (!p.endsWith('*'))
            p += '?(' + (r.ts ? '.ts|.tsx|' : '') + '.js|.json|.node)'
          if (r.ignoreFn(a.default.relative(r.base, o + p))) return
          j = j.then(async () => {
            if (r.log) console.log('Globbing ' + o + p)
            const e = await new Promise((e, t) =>
              h.default(
                o + p,
                { mark: true, ignore: o + '/**/node_modules/**/*' },
                (r, s) => (r ? t(r) : e(s))
              )
            )
            e.filter(
              (e) =>
                !V.has(a.default.extname(e)) &&
                !q.has(a.default.basename(e)) &&
                !e.endsWith('/')
            ).forEach((e) => c.add(e))
          })
        }
        async function processRequireArg(e, t = false) {
          if (e.type === 'ConditionalExpression') {
            await processRequireArg(e.consequent, t)
            await processRequireArg(e.alternate, t)
            return
          }
          if (e.type === 'LogicalExpression') {
            await processRequireArg(e.left, t)
            await processRequireArg(e.right, t)
            return
          }
          let r = await computePureStaticValue(e, true)
          if (!r) return
          if ('value' in r && typeof r.value === 'string') {
            if (!r.wildcards) (t ? v : c).add(r.value)
            else if (r.wildcards.length >= 1) emitWildcardRequire(r.value)
          } else {
            if ('then' in r && typeof r.then === 'string')
              (t ? v : c).add(r.then)
            if ('else' in r && typeof r.else === 'string')
              (t ? v : c).add(r.else)
          }
        }
        let te = o.attachScopes(M, 'scope')
        if (isAst(M)) {
          S.handleWrappers(M)
          await m.default({
            id: e,
            ast: M,
            emitDependency: (e) => c.add(e),
            emitAsset: (e) => s.add(e),
            emitAssetDirectory: emitAssetDirectory,
            job: r,
          })
        }
        async function backtrack(e, t) {
          if (!Z)
            throw new Error('Internal error: No staticChildNode for backtrack.')
          const r = await computePureStaticValue(e, true)
          if (r) {
            if (
              ('value' in r && typeof r.value !== 'symbol') ||
              ('then' in r &&
                typeof r.then !== 'symbol' &&
                typeof r.else !== 'symbol')
            ) {
              J = r
              Z = e
              if (t) t.skip()
              return
            }
          }
          await emitStaticChildAsset()
        }
        await E(M, {
          async enter(t, o) {
            var u
            const h = t
            const d = o
            if (h.scope) {
              te = h.scope
              for (const e in h.scope.declarations) {
                if (e in X) X[e].shadowDepth++
              }
            }
            if (Z) return
            if (!d) return
            if (h.type === 'Identifier') {
              if (
                p.isIdentifierRead(h, d) &&
                r.analysis.computeFileReferences
              ) {
                let e
                if (
                  (typeof (e =
                    (u = getKnownBinding(h.name)) === null || u === void 0
                      ? void 0
                      : u.value) === 'string' &&
                    e.match(K)) ||
                  (e &&
                    (typeof e === 'function' || typeof e === 'object') &&
                    e[U])
                ) {
                  J = { value: typeof e === 'string' ? e : undefined }
                  Z = h
                  await backtrack(d, this)
                }
              }
            } else if (
              r.analysis.computeFileReferences &&
              h.type === 'MemberExpression' &&
              h.object.type === 'MetaProperty' &&
              h.object.meta.name === 'import' &&
              h.object.property.name === 'meta' &&
              (h.property.computed ? h.property.value : h.property.name) ===
                'url'
            ) {
              J = { value: Y }
              Z = h
              await backtrack(d, this)
            } else if (h.type === 'ImportExpression') {
              await processRequireArg(h.source, true)
              return
            } else if (h.type === 'CallExpression') {
              if (
                (!W || r.mixedModules) &&
                h.callee.type === 'Identifier' &&
                h.arguments.length
              ) {
                if (
                  h.callee.name === 'require' &&
                  X.require.shadowDepth === 0
                ) {
                  await processRequireArg(h.arguments[0])
                  return
                }
              } else if (
                (!W || r.mixedModules) &&
                h.callee.type === 'MemberExpression' &&
                h.callee.object.type === 'Identifier' &&
                h.callee.object.name === 'module' &&
                'module' in X === false &&
                h.callee.property.type === 'Identifier' &&
                !h.callee.computed &&
                h.callee.property.name === 'require' &&
                h.arguments.length
              ) {
                await processRequireArg(h.arguments[0])
                return
              } else if (
                (!W || r.mixedModules) &&
                h.callee.type === 'MemberExpression' &&
                h.callee.object.type === 'Identifier' &&
                h.callee.object.name === 'require' &&
                X.require.shadowDepth === 0 &&
                h.callee.property.type === 'Identifier' &&
                !h.callee.computed &&
                h.callee.property.name === 'resolve' &&
                h.arguments.length
              ) {
                await processRequireArg(h.arguments[0])
                return
              }
              const t =
                r.analysis.evaluatePureExpressions &&
                (await computePureStaticValue(h.callee, false))
              if (
                t &&
                'value' in t &&
                typeof t.value === 'function' &&
                t.value[U] &&
                r.analysis.computeFileReferences
              ) {
                J = await computePureStaticValue(h, true)
                if (J && d) {
                  Z = h
                  await backtrack(d, this)
                }
              } else if (t && 'value' in t && typeof t.value === 'symbol') {
                switch (t.value) {
                  case z:
                    if (
                      h.arguments.length === 1 &&
                      h.arguments[0].type === 'Literal' &&
                      h.callee.type === 'Identifier' &&
                      X.require.shadowDepth === 0
                    ) {
                      await processRequireArg(h.arguments[0])
                    }
                    break
                  case P:
                    if (h.arguments.length) {
                      const e = await computePureStaticValue(
                        h.arguments[0],
                        false
                      )
                      if (e && 'value' in e && e.value) {
                        let t
                        if (typeof e.value === 'object') t = e.value
                        else if (typeof e.value === 'string')
                          t = { bindings: e.value }
                        if (!t.path) {
                          t.path = true
                        }
                        t.module_root = C
                        let r
                        try {
                          r = f.default(t)
                        } catch (e) {}
                        if (r) {
                          J = { value: r }
                          Z = h
                          await emitStaticChildAsset()
                        }
                      }
                    }
                    break
                  case B:
                    if (
                      h.arguments.length === 1 &&
                      h.arguments[0].type === 'Identifier' &&
                      h.arguments[0].name === '__dirname' &&
                      X.__dirname.shadowDepth === 0
                    ) {
                      let e
                      try {
                        const t = A.default(D, 'node-gyp-build')
                        e = require(t).path(D)
                      } catch (t) {
                        try {
                          e = _.default.path(D)
                        } catch (e) {}
                      }
                      if (e) {
                        J = { value: e }
                        Z = h
                        await emitStaticChildAsset()
                      }
                    }
                    break
                  case F:
                    if (h.arguments.length) {
                      const e = await computePureStaticValue(
                        h.arguments[0],
                        false
                      )
                      if (
                        e &&
                        'value' in e &&
                        (typeof e.value === 'string' ||
                          typeof e.value === 'undefined')
                      ) {
                        const t = g.nbind(e.value)
                        if (t && t.path) {
                          c.add(
                            a.default.relative(D, t.path).replace(/\\/g, '/')
                          )
                          return this.skip()
                        }
                      }
                    }
                    break
                  case k:
                    if (
                      h.arguments.length === 2 &&
                      h.arguments[0].type === 'Literal' &&
                      h.arguments[0].value === 'view engine' &&
                      !ee
                    ) {
                      await processRequireArg(h.arguments[1])
                      return this.skip()
                    }
                    break
                  case T:
                    ee = true
                    break
                  case L:
                  case N:
                    if (h.arguments[0] && r.analysis.computeFileReferences) {
                      J = await computePureStaticValue(h.arguments[0], true)
                      if (J) {
                        Z = h.arguments[0]
                        if (
                          t.value === N &&
                          h.arguments[0].type === 'Identifier' &&
                          h.arguments[0].name === '__dirname'
                        ) {
                          emitAssetDirectory(D)
                        } else {
                          await backtrack(d, this)
                        }
                        return this.skip()
                      }
                    }
                    break
                  case O:
                    if (h.arguments[0]) {
                      const e = await computePureStaticValue(
                        h.arguments[0],
                        false
                      )
                      if (e && 'value' in e && e.value)
                        emitAssetDirectory(e.value + '/intl')
                      return this.skip()
                    }
                    break
                  case I:
                    let o = a.default.resolve(e, '../package.json')
                    const u = a.default.resolve('/package.json')
                    while (o !== u && (await r.stat(o)) === null)
                      o = a.default.resolve(o, '../../package.json')
                    if (o !== u) s.add(o)
                    break
                }
              }
            } else if (
              h.type === 'VariableDeclaration' &&
              d &&
              !p.isVarLoop(d) &&
              r.analysis.evaluatePureExpressions
            ) {
              for (const e of h.declarations) {
                if (!e.init) continue
                const t = await computePureStaticValue(e.init, true)
                if (t) {
                  if (e.id.type === 'Identifier') {
                    setKnownBinding(e.id.name, t)
                  } else if (e.id.type === 'ObjectPattern' && 'value' in t) {
                    for (const r of e.id.properties) {
                      if (
                        r.type !== 'Property' ||
                        r.key.type !== 'Identifier' ||
                        r.value.type !== 'Identifier' ||
                        typeof t.value !== 'object' ||
                        t.value === null ||
                        !(r.key.name in t.value)
                      )
                        continue
                      setKnownBinding(r.value.name, {
                        value: t.value[r.key.name],
                      })
                    }
                  }
                  if (
                    !('value' in t) &&
                    isAbsolutePathOrUrl(t.then) &&
                    isAbsolutePathOrUrl(t.else)
                  ) {
                    J = t
                    Z = e.init
                    await emitStaticChildAsset()
                  }
                }
              }
            } else if (
              h.type === 'AssignmentExpression' &&
              d &&
              !p.isLoop(d) &&
              r.analysis.evaluatePureExpressions
            ) {
              if (!hasKnownBindingValue(h.left.name)) {
                const e = await computePureStaticValue(h.right, false)
                if (e && 'value' in e) {
                  if (h.left.type === 'Identifier') {
                    setKnownBinding(h.left.name, e)
                  } else if (h.left.type === 'ObjectPattern') {
                    for (const t of h.left.properties) {
                      if (
                        t.type !== 'Property' ||
                        t.key.type !== 'Identifier' ||
                        t.value.type !== 'Identifier' ||
                        typeof e.value !== 'object' ||
                        e.value === null ||
                        !(t.key.name in e.value)
                      )
                        continue
                      setKnownBinding(t.value.name, {
                        value: e.value[t.key.name],
                      })
                    }
                  }
                  if (isAbsolutePathOrUrl(e.value)) {
                    J = e
                    Z = h.right
                    await emitStaticChildAsset()
                  }
                }
              }
            } else if (
              (!W || r.mixedModules) &&
              (h.type === 'FunctionDeclaration' ||
                h.type === 'FunctionExpression' ||
                h.type === 'ArrowFunctionExpression') &&
              (h.arguments || h.params)[0] &&
              (h.arguments || h.params)[0].type === 'Identifier'
            ) {
              let e
              let t
              if (
                (h.type === 'ArrowFunctionExpression' ||
                  h.type === 'FunctionExpression') &&
                d &&
                d.type === 'VariableDeclarator' &&
                d.id.type === 'Identifier'
              ) {
                e = d.id
                t = h.arguments || h.params
              } else if (h.id) {
                e = h.id
                t = h.arguments || h.params
              }
              if (e && h.body.body) {
                let r,
                  s = false
                for (let e = 0; e < h.body.body.length; e++) {
                  if (h.body.body[e].type === 'VariableDeclaration' && !r) {
                    r = h.body.body[e].declarations.find(
                      (e) =>
                        e &&
                        e.id &&
                        e.id.type === 'Identifier' &&
                        e.init &&
                        e.init.type === 'CallExpression' &&
                        e.init.callee.type === 'Identifier' &&
                        e.init.callee.name === 'require' &&
                        X.require.shadowDepth === 0 &&
                        e.init.arguments[0] &&
                        e.init.arguments[0].type === 'Identifier' &&
                        e.init.arguments[0].name === t[0].name
                    )
                  }
                  if (
                    r &&
                    h.body.body[e].type === 'ReturnStatement' &&
                    h.body.body[e].argument &&
                    h.body.body[e].argument.type === 'Identifier' &&
                    h.body.body[e].argument.name === r.id.name
                  ) {
                    s = true
                    break
                  }
                }
                if (s) setKnownBinding(e.name, { value: z })
              }
            }
          },
          async leave(e, t) {
            const r = e
            const s = t
            if (r.scope) {
              if (te.parent) {
                te = te.parent
              }
              for (const e in r.scope.declarations) {
                if (e in X) {
                  if (X[e].shadowDepth > 0) X[e].shadowDepth--
                  else delete X[e]
                }
              }
            }
            if (Z && s) await backtrack(s, this)
          },
        })
        await j
        return { assets: s, deps: c, imports: v, isESM: W }
        async function emitAssetPath(e) {
          const t = e.indexOf(u.WILDCARD)
          const o = t === -1 ? e.length : e.lastIndexOf(a.default.sep, t)
          const c = e.substring(0, o)
          try {
            var f = await r.stat(c)
            if (f === null) {
              throw new Error('file not found')
            }
          } catch (e) {
            return
          }
          if (t !== -1 && f.isFile()) return
          if (f.isFile()) {
            s.add(e)
          } else if (f.isDirectory()) {
            if (validWildcard(e)) emitAssetDirectory(e)
          }
        }
        function validWildcard(t) {
          let s = ''
          if (t.endsWith(a.default.sep)) s = a.default.sep
          else if (t.endsWith(a.default.sep + u.WILDCARD))
            s = a.default.sep + u.WILDCARD
          else if (t.endsWith(u.WILDCARD)) s = u.WILDCARD
          if (t === D + s) return false
          if (t === G + s) return false
          if (t.endsWith(a.default.sep + 'node_modules' + s)) return false
          if (D.startsWith(t.slice(0, t.length - s.length) + a.default.sep))
            return false
          if (C) {
            const s =
              e.substring(0, e.indexOf(a.default.sep + 'node_modules')) +
              a.default.sep +
              'node_modules' +
              a.default.sep
            if (!t.startsWith(s)) {
              if (r.log)
                console.log(
                  'Skipping asset emission of ' +
                    t.replace(u.wildcardRegEx, '*') +
                    ' for ' +
                    e +
                    ' as it is outside the package base ' +
                    C
                )
              return false
            }
          }
          return true
        }
        function resolveAbsolutePathOrUrl(e) {
          return e instanceof x.URL
            ? x.fileURLToPath(e)
            : e.startsWith('file:')
            ? x.fileURLToPath(new x.URL(e))
            : a.default.resolve(e)
        }
        async function emitStaticChildAsset() {
          if (!J) {
            return
          }
          if ('value' in J && isAbsolutePathOrUrl(J.value)) {
            try {
              const e = resolveAbsolutePathOrUrl(J.value)
              await emitAssetPath(e)
            } catch (e) {}
          } else if (
            'then' in J &&
            'else' in J &&
            isAbsolutePathOrUrl(J.then) &&
            isAbsolutePathOrUrl(J.else)
          ) {
            let e
            try {
              e = resolveAbsolutePathOrUrl(J.then)
            } catch (e) {}
            let t
            try {
              t = resolveAbsolutePathOrUrl(J.else)
            } catch (e) {}
            if (e) await emitAssetPath(e)
            if (t) await emitAssetPath(t)
          } else if (
            Z &&
            Z.type === 'ArrayExpression' &&
            'value' in J &&
            J.value instanceof Array
          ) {
            for (const e of J.value) {
              try {
                const t = resolveAbsolutePathOrUrl(e)
                await emitAssetPath(t)
              } catch (e) {}
            }
          }
          Z = J = undefined
        }
      }
      t['default'] = analyze
      function isAst(e) {
        return 'body' in e
      }
    },
    1735: function (e, t, r) {
      var s =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, s) {
              if (s === undefined) s = r
              Object.defineProperty(e, s, {
                enumerable: true,
                get: function () {
                  return t[r]
                },
              })
            }
          : function (e, t, r, s) {
              if (s === undefined) s = r
              e[s] = t[r]
            })
      var a =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !t.hasOwnProperty(r)) s(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      a(r(4590), t)
      var o = r(8068)
      Object.defineProperty(t, 'nodeFileTrace', {
        enumerable: true,
        get: function () {
          return o.nodeFileTrace
        },
      })
    },
    8068: function (e, t, r) {
      var s =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e }
        }
      Object.defineProperty(t, '__esModule', { value: true })
      t.Job = t.nodeFileTrace = void 0
      const a = r(1017)
      const o = s(r(9165))
      const u = s(r(3028))
      const c = s(r(5825))
      const f = r(1065)
      const p = r(2878)
      const h = r(1017)
      const d = r(438)
      const g = o.default.promises.readFile
      const v = o.default.promises.readlink
      const m = o.default.promises.stat
      function inPath(e, t) {
        const r = h.join(t, a.sep)
        return e.startsWith(r) && e !== r
      }
      async function nodeFileTrace(e, t = {}) {
        const r = new Job(t)
        if (t.readFile) r.readFile = t.readFile
        if (t.stat) r.stat = t.stat
        if (t.readlink) r.readlink = t.readlink
        if (t.resolve) r.resolve = t.resolve
        r.ts = true
        await Promise.all(
          e.map(async (e) => {
            const t = a.resolve(e)
            await r.emitFile(t, 'initial')
            return r.emitDependency(t)
          })
        )
        const s = {
          fileList: r.fileList,
          esmFileList: r.esmFileList,
          reasons: r.reasons,
          warnings: r.warnings,
        }
        return s
      }
      t.nodeFileTrace = nodeFileTrace
      class Job {
        constructor({
          base: e = process.cwd(),
          processCwd: t,
          exports: r,
          conditions: s = r || ['node'],
          exportsOnly: o = false,
          paths: u = {},
          ignore: c,
          log: p = false,
          mixedModules: h = false,
          ts: g = true,
          analysis: v = {},
          cache: m,
          fileIOConcurrency: y = 1024,
        }) {
          this.reasons = new Map()
          this.ts = g
          e = a.resolve(e)
          this.ignoreFn = (e) => {
            if (e.startsWith('..' + a.sep)) return true
            return false
          }
          if (typeof c === 'string') c = [c]
          if (typeof c === 'function') {
            const e = c
            this.ignoreFn = (t) => {
              if (t.startsWith('..' + a.sep)) return true
              if (e(t)) return true
              return false
            }
          } else if (Array.isArray(c)) {
            const t = c.map((t) =>
              a.relative(e, a.resolve(e || process.cwd(), t))
            )
            this.ignoreFn = (e) => {
              if (e.startsWith('..' + a.sep)) return true
              if (f.isMatch(e, t)) return true
              return false
            }
          }
          this.base = e
          this.cwd = a.resolve(t || e)
          this.conditions = s
          this.exportsOnly = o
          const _ = {}
          for (const t of Object.keys(u)) {
            const r = u[t].endsWith('/')
            const s = a.resolve(e, u[t])
            _[t] = s + (r ? '/' : '')
          }
          this.paths = _
          this.log = p
          this.mixedModules = h
          this.fileIOQueue = new d.Sema(y)
          this.analysis = {}
          if (v !== false) {
            Object.assign(
              this.analysis,
              {
                emitGlobs: true,
                computeFileReferences: true,
                evaluatePureExpressions: true,
              },
              v === true ? {} : v
            )
          }
          this.fileCache = (m && m.fileCache) || new Map()
          this.statCache = (m && m.statCache) || new Map()
          this.symlinkCache = (m && m.symlinkCache) || new Map()
          this.analysisCache = (m && m.analysisCache) || new Map()
          if (m) {
            m.fileCache = this.fileCache
            m.statCache = this.statCache
            m.symlinkCache = this.symlinkCache
            m.analysisCache = this.analysisCache
          }
          this.fileList = new Set()
          this.esmFileList = new Set()
          this.processed = new Set()
          this.warnings = new Set()
        }
        async readlink(e) {
          const t = this.symlinkCache.get(e)
          if (t !== undefined) return t
          await this.fileIOQueue.acquire()
          try {
            const t = await v(e)
            const r = this.statCache.get(e)
            if (r) this.statCache.set(a.resolve(e, t), r)
            this.symlinkCache.set(e, t)
            return t
          } catch (t) {
            if (
              t.code !== 'EINVAL' &&
              t.code !== 'ENOENT' &&
              t.code !== 'UNKNOWN'
            )
              throw t
            this.symlinkCache.set(e, null)
            return null
          } finally {
            this.fileIOQueue.release()
          }
        }
        async isFile(e) {
          const t = await this.stat(e)
          if (t) return t.isFile()
          return false
        }
        async isDir(e) {
          const t = await this.stat(e)
          if (t) return t.isDirectory()
          return false
        }
        async stat(e) {
          const t = this.statCache.get(e)
          if (t) return t
          await this.fileIOQueue.acquire()
          try {
            const t = await m(e)
            this.statCache.set(e, t)
            return t
          } catch (t) {
            if (t.code === 'ENOENT') {
              this.statCache.set(e, null)
              return null
            }
            throw t
          } finally {
            this.fileIOQueue.release()
          }
        }
        async resolve(e, t, r, s) {
          return c.default(e, t, r, s)
        }
        async readFile(e) {
          const t = this.fileCache.get(e)
          if (t !== undefined) return t
          await this.fileIOQueue.acquire()
          try {
            const t = (await g(e)).toString()
            this.fileCache.set(e, t)
            return t
          } catch (t) {
            if (t.code === 'ENOENT' || t.code === 'EISDIR') {
              this.fileCache.set(e, null)
              return null
            }
            throw t
          } finally {
            this.fileIOQueue.release()
          }
        }
        async realpath(e, t, r = new Set()) {
          if (r.has(e))
            throw new Error('Recursive symlink detected resolving ' + e)
          r.add(e)
          const s = await this.readlink(e)
          if (s) {
            const o = a.dirname(e)
            const u = a.resolve(o, s)
            const c = await this.realpath(o, t)
            if (inPath(e, c)) await this.emitFile(e, 'resolve', t, true)
            return this.realpath(u, t, r)
          }
          if (!inPath(e, this.base)) return e
          return h.join(await this.realpath(a.dirname(e), t, r), a.basename(e))
        }
        async emitFile(e, t, r, s = false) {
          if (!s) {
            e = await this.realpath(e, r)
          }
          e = a.relative(this.base, e)
          if (r) {
            r = a.relative(this.base, r)
          }
          let o = this.reasons.get(e)
          if (!o) {
            o = { type: [t], ignored: false, parents: new Set() }
            this.reasons.set(e, o)
          } else if (!o.type.includes(t)) {
            o.type.push(t)
          }
          if (r && this.ignoreFn(e, r)) {
            if (!this.fileList.has(e) && o) {
              o.ignored = true
            }
            return false
          }
          if (r) {
            o.parents.add(r)
          }
          this.fileList.add(e)
          return true
        }
        async getPjsonBoundary(e) {
          const t = e.indexOf(a.sep)
          let r
          while ((r = e.lastIndexOf(a.sep)) > t) {
            e = e.slice(0, r)
            if (await this.isFile(e + a.sep + 'package.json')) return e
          }
          return undefined
        }
        async emitDependency(e, t) {
          if (this.processed.has(e)) {
            if (t) {
              await this.emitFile(e, 'dependency', t)
            }
            return
          }
          this.processed.add(e)
          const r = await this.emitFile(e, 'dependency', t)
          if (!r) return
          if (e.endsWith('.json')) return
          if (e.endsWith('.node')) return await p.sharedLibEmit(e, this)
          if (e.endsWith('.js')) {
            const t = await this.getPjsonBoundary(e)
            if (t) await this.emitFile(t + a.sep + 'package.json', 'resolve', e)
          }
          let s
          const o = this.analysisCache.get(e)
          if (o) {
            s = o
          } else {
            const t = await this.readFile(e)
            if (t === null) throw new Error('File ' + e + ' does not exist.')
            s = await u.default(e, t.toString(), this)
            this.analysisCache.set(e, s)
          }
          const { deps: c, imports: f, assets: h, isESM: d } = s
          if (d) this.esmFileList.add(a.relative(this.base, e))
          await Promise.all([
            ...[...h].map(async (t) => {
              const r = a.extname(t)
              if (
                r === '.js' ||
                r === '.mjs' ||
                r === '.node' ||
                r === '' ||
                (this.ts &&
                  (r === '.ts' || r === '.tsx') &&
                  t.startsWith(this.base) &&
                  t
                    .slice(this.base.length)
                    .indexOf(a.sep + 'node_modules' + a.sep) === -1)
              )
                await this.emitDependency(t, e)
              else await this.emitFile(t, 'asset', e)
            }),
            ...[...c].map(async (t) => {
              try {
                var r = await this.resolve(t, e, this, !d)
              } catch (e) {
                this.warnings.add(
                  new Error(
                    `Failed to resolve dependency ${t}:\n${e && e.message}`
                  )
                )
                return
              }
              if (Array.isArray(r)) {
                for (const t of r) {
                  if (t.startsWith('node:')) return
                  await this.emitDependency(t, e)
                }
              } else {
                if (r.startsWith('node:')) return
                await this.emitDependency(r, e)
              }
            }),
            ...[...f].map(async (t) => {
              try {
                var r = await this.resolve(t, e, this, false)
              } catch (e) {
                this.warnings.add(
                  new Error(
                    `Failed to resolve dependency ${t}:\n${e && e.message}`
                  )
                )
                return
              }
              if (Array.isArray(r)) {
                for (const t of r) {
                  if (t.startsWith('node:')) return
                  await this.emitDependency(t, e)
                }
              } else {
                if (r.startsWith('node:')) return
                await this.emitDependency(r, e)
              }
            }),
          ])
        }
      }
      t.Job = Job
    },
    5825: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      const s = r(1017)
      async function resolveDependency(e, t, r, a = true) {
        let o
        if (
          s.isAbsolute(e) ||
          e === '.' ||
          e === '..' ||
          e.startsWith('./') ||
          e.startsWith('../')
        ) {
          const a = e.endsWith('/')
          o = await resolvePath(s.resolve(t, '..', e) + (a ? '/' : ''), t, r)
        } else if (e[0] === '#') {
          o = await packageImportsResolve(e, t, r, a)
        } else {
          o = await resolvePackage(e, t, r, a)
        }
        if (Array.isArray(o)) {
          return Promise.all(o.map((e) => r.realpath(e, t)))
        } else if (o.startsWith('node:')) {
          return o
        } else {
          return r.realpath(o, t)
        }
      }
      t['default'] = resolveDependency
      async function resolvePath(e, t, r) {
        const s = (await resolveFile(e, t, r)) || (await resolveDir(e, t, r))
        if (!s) {
          throw new NotFoundError(e, t)
        }
        return s
      }
      async function resolveFile(e, t, r) {
        if (e.endsWith('/')) return undefined
        e = await r.realpath(e, t)
        if (await r.isFile(e)) return e
        if (
          r.ts &&
          e.startsWith(r.base) &&
          e.slice(r.base.length).indexOf(s.sep + 'node_modules' + s.sep) ===
            -1 &&
          (await r.isFile(e + '.ts'))
        )
          return e + '.ts'
        if (
          r.ts &&
          e.startsWith(r.base) &&
          e.slice(r.base.length).indexOf(s.sep + 'node_modules' + s.sep) ===
            -1 &&
          (await r.isFile(e + '.tsx'))
        )
          return e + '.tsx'
        if (await r.isFile(e + '.js')) return e + '.js'
        if (await r.isFile(e + '.json')) return e + '.json'
        if (await r.isFile(e + '.node')) return e + '.node'
        return undefined
      }
      async function resolveDir(e, t, r) {
        if (e.endsWith('/')) e = e.slice(0, -1)
        if (!(await r.isDir(e))) return
        const a = await getPkgCfg(e, r)
        if (a && typeof a.main === 'string') {
          const o =
            (await resolveFile(s.resolve(e, a.main), t, r)) ||
            (await resolveFile(s.resolve(e, a.main, 'index'), t, r))
          if (o) {
            await r.emitFile(e + s.sep + 'package.json', 'resolve', t)
            return o
          }
        }
        return resolveFile(s.resolve(e, 'index'), t, r)
      }
      class NotFoundError extends Error {
        constructor(e, t) {
          super("Cannot find module '" + e + "' loaded from " + t)
          this.code = 'MODULE_NOT_FOUND'
        }
      }
      const a = new Set([
        ...r(8102)._builtinLibs,
        'constants',
        'module',
        'timers',
        'console',
        '_stream_writable',
        '_stream_readable',
        '_stream_duplex',
        'process',
        'sys',
      ])
      function getPkgName(e) {
        const t = e.split('/')
        if (e[0] === '@' && t.length > 1)
          return t.length > 1 ? t.slice(0, 2).join('/') : null
        return t.length ? t[0] : null
      }
      async function getPkgCfg(e, t) {
        const r = await t.readFile(e + s.sep + 'package.json')
        if (r) {
          try {
            return JSON.parse(r.toString())
          } catch (e) {}
        }
        return undefined
      }
      function getExportsTarget(e, t, r) {
        if (typeof e === 'string') {
          return e
        } else if (e === null) {
          return e
        } else if (Array.isArray(e)) {
          for (const s of e) {
            const e = getExportsTarget(s, t, r)
            if (e === null || (typeof e === 'string' && e.startsWith('./')))
              return e
          }
        } else if (typeof e === 'object') {
          for (const s of Object.keys(e)) {
            if (
              s === 'default' ||
              (s === 'require' && r) ||
              (s === 'import' && !r) ||
              t.includes(s)
            ) {
              const a = getExportsTarget(e[s], t, r)
              if (a !== undefined) return a
            }
          }
        }
        return undefined
      }
      function resolveExportsImports(e, t, r, s, a, o) {
        let u
        if (a) {
          if (!(typeof t === 'object' && !Array.isArray(t) && t !== null))
            return undefined
          u = t
        } else if (
          typeof t === 'string' ||
          Array.isArray(t) ||
          t === null ||
          (typeof t === 'object' &&
            Object.keys(t).length &&
            Object.keys(t)[0][0] !== '.')
        ) {
          u = { '.': t }
        } else {
          u = t
        }
        if (r in u) {
          const t = getExportsTarget(u[r], s.conditions, o)
          if (typeof t === 'string' && t.startsWith('./')) return e + t.slice(1)
        }
        for (const t of Object.keys(u).sort((e, t) => t.length - e.length)) {
          if (t.endsWith('*') && r.startsWith(t.slice(0, -1))) {
            const a = getExportsTarget(u[t], s.conditions, o)
            if (typeof a === 'string' && a.startsWith('./'))
              return e + a.slice(1).replace(/\*/g, r.slice(t.length - 1))
          }
          if (!t.endsWith('/')) continue
          if (r.startsWith(t)) {
            const a = getExportsTarget(u[t], s.conditions, o)
            if (typeof a === 'string' && a.endsWith('/') && a.startsWith('./'))
              return e + a.slice(1) + r.slice(t.length)
          }
        }
        return undefined
      }
      async function packageImportsResolve(e, t, r, a) {
        if (e !== '#' && !e.startsWith('#/') && r.conditions) {
          const o = await r.getPjsonBoundary(t)
          if (o) {
            const u = await getPkgCfg(o, r)
            const { imports: c } = u || {}
            if (u && c !== null && c !== undefined) {
              let u = resolveExportsImports(o, c, e, r, true, a)
              if (u) {
                if (a)
                  u =
                    (await resolveFile(u, t, r)) || (await resolveDir(u, t, r))
                else if (!(await r.isFile(u))) throw new NotFoundError(u, t)
                if (u) {
                  await r.emitFile(o + s.sep + 'package.json', 'resolve', t)
                  return u
                }
              }
            }
          }
        }
        throw new NotFoundError(e, t)
      }
      async function resolvePackage(e, t, r, o) {
        let u = t
        if (a.has(e)) return 'node:' + e
        if (e.startsWith('node:')) return e
        const c = getPkgName(e) || ''
        let f
        if (r.conditions) {
          const a = await r.getPjsonBoundary(t)
          if (a) {
            const u = await getPkgCfg(a, r)
            const { exports: p } = u || {}
            if (u && u.name && u.name === c && p !== null && p !== undefined) {
              f = resolveExportsImports(
                a,
                p,
                '.' + e.slice(c.length),
                r,
                false,
                o
              )
              if (f) {
                if (o)
                  f =
                    (await resolveFile(f, t, r)) || (await resolveDir(f, t, r))
                else if (!(await r.isFile(f))) throw new NotFoundError(f, t)
              }
              if (f) await r.emitFile(a + s.sep + 'package.json', 'resolve', t)
            }
          }
        }
        let p
        const h = u.indexOf(s.sep)
        while ((p = u.lastIndexOf(s.sep)) > h) {
          u = u.slice(0, p)
          const a = u + s.sep + 'node_modules'
          const h = await r.stat(a)
          if (!h || !h.isDirectory()) continue
          const d = await getPkgCfg(a + s.sep + c, r)
          const { exports: g } = d || {}
          if (r.conditions && g !== undefined && g !== null && !f) {
            let u
            if (!r.exportsOnly)
              u =
                (await resolveFile(a + s.sep + e, t, r)) ||
                (await resolveDir(a + s.sep + e, t, r))
            let f = resolveExportsImports(
              a + s.sep + c,
              g,
              '.' + e.slice(c.length),
              r,
              false,
              o
            )
            if (f) {
              if (o)
                f = (await resolveFile(f, t, r)) || (await resolveDir(f, t, r))
              else if (!(await r.isFile(f))) throw new NotFoundError(f, t)
            }
            if (f) {
              await r.emitFile(
                a + s.sep + c + s.sep + 'package.json',
                'resolve',
                t
              )
              if (u && u !== f) return [f, u]
              return f
            }
            if (u) return u
          } else {
            const o =
              (await resolveFile(a + s.sep + e, t, r)) ||
              (await resolveDir(a + s.sep + e, t, r))
            if (o) {
              if (f && f !== o) return [o, f]
              return o
            }
          }
        }
        if (f) return f
        if (Object.hasOwnProperty.call(r.paths, e)) {
          return r.paths[e]
        }
        for (const s of Object.keys(r.paths)) {
          if (s.endsWith('/') && e.startsWith(s)) {
            const a = r.paths[s] + e.slice(s.length)
            const o =
              (await resolveFile(a, t, r)) || (await resolveDir(a, t, r))
            if (!o) {
              throw new NotFoundError(e, t)
            }
            return o
          }
        }
        throw new NotFoundError(e, t)
      }
    },
    4590: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    6922: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.isLoop = t.isVarLoop = t.isIdentifierRead = void 0
      function isIdentifierRead(e, t) {
        switch (t.type) {
          case 'ObjectPattern':
          case 'ArrayPattern':
            return false
          case 'AssignmentExpression':
            return t.right === e
          case 'MemberExpression':
            return t.computed || e === t.object
          case 'Property':
            return e === t.value
          case 'MethodDefinition':
            return false
          case 'VariableDeclarator':
            return t.id !== e
          case 'ExportSpecifier':
            return false
          case 'FunctionExpression':
          case 'FunctionDeclaration':
          case 'ArrowFunctionExpression':
            return false
          default:
            return true
        }
      }
      t.isIdentifierRead = isIdentifierRead
      function isVarLoop(e) {
        return (
          e.type === 'ForStatement' ||
          e.type === 'ForInStatement' ||
          e.type === 'ForOfStatement'
        )
      }
      t.isVarLoop = isVarLoop
      function isLoop(e) {
        return (
          e.type === 'ForStatement' ||
          e.type === 'ForInStatement' ||
          e.type === 'ForOfStatement' ||
          e.type === 'WhileStatement' ||
          e.type === 'DoWhileStatement'
        )
      }
      t.isLoop = isLoop
    },
    4184: function (__unused_webpack_module, exports, __nccwpck_require__) {
      var __importDefault =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e }
        }
      Object.defineProperty(exports, '__esModule', { value: true })
      exports.nbind = exports.pregyp = void 0
      const path_1 = __importDefault(__nccwpck_require__(1017))
      const graceful_fs_1 = __importDefault(__nccwpck_require__(9165))
      const versioning = __nccwpck_require__(606)
      const napi = __nccwpck_require__(3184)
      const pregypFind = (e, t) => {
        const r = JSON.parse(graceful_fs_1.default.readFileSync(e).toString())
        versioning.validate_config(r, t)
        var s
        if (napi.get_napi_build_versions(r, t)) {
          s = napi.get_best_napi_build_version(r, t)
        }
        t = t || {}
        if (!t.module_root) t.module_root = path_1.default.dirname(e)
        var a = versioning.evaluate(r, t, s)
        return a.module
      }
      exports.pregyp = { default: { find: pregypFind }, find: pregypFind }
      function makeModulePathList(e, t) {
        return [
          [e, t],
          [e, 'build', t],
          [e, 'build', 'Debug', t],
          [e, 'build', 'Release', t],
          [e, 'out', 'Debug', t],
          [e, 'Debug', t],
          [e, 'out', 'Release', t],
          [e, 'Release', t],
          [e, 'build', 'default', t],
          [
            e,
            process.env['NODE_BINDINGS_COMPILED_DIR'] || 'compiled',
            process.versions.node,
            process.platform,
            process.arch,
            t,
          ],
        ]
      }
      function findCompiledModule(basePath, specList) {
        var resolvedList = []
        var ext = path_1.default.extname(basePath)
        for (var _i = 0, specList_1 = specList; _i < specList_1.length; _i++) {
          var spec = specList_1[_i]
          if (ext == spec.ext) {
            try {
              spec.path = eval('require.resolve(basePath)')
              return spec
            } catch (e) {
              resolvedList.push(basePath)
            }
          }
        }
        for (var _a = 0, specList_2 = specList; _a < specList_2.length; _a++) {
          var spec = specList_2[_a]
          for (
            var _b = 0, _c = makeModulePathList(basePath, spec.name);
            _b < _c.length;
            _b++
          ) {
            var pathParts = _c[_b]
            var resolvedPath = path_1.default.resolve.apply(
              path_1.default,
              pathParts
            )
            try {
              spec.path = eval('require.resolve(resolvedPath)')
            } catch (e) {
              resolvedList.push(resolvedPath)
              continue
            }
            return spec
          }
        }
        return null
      }
      function nbind(e = process.cwd()) {
        const t = findCompiledModule(e, [
          { ext: '.node', name: 'nbind.node', type: 'node' },
          { ext: '.js', name: 'nbind.js', type: 'emcc' },
        ])
        return t
      }
      exports.nbind = nbind
    },
    5258: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.getPackageName = t.getPackageBase = void 0
      const r = /^(@[^\\\/]+[\\\/])?[^\\\/]+/
      function getPackageBase(e) {
        const t = e.lastIndexOf('node_modules')
        if (
          t !== -1 &&
          (e[t - 1] === '/' || e[t - 1] === '\\') &&
          (e[t + 12] === '/' || e[t + 12] === '\\')
        ) {
          const s = e.slice(t + 13).match(r)
          if (s) return e.slice(0, t + 13 + s[0].length)
        }
        return undefined
      }
      t.getPackageBase = getPackageBase
      function getPackageName(e) {
        const t = e.lastIndexOf('node_modules')
        if (
          t !== -1 &&
          (e[t - 1] === '/' || e[t - 1] === '\\') &&
          (e[t + 12] === '/' || e[t + 12] === '\\')
        ) {
          const s = e.slice(t + 13).match(r)
          if (s && s.length > 0) {
            return s[0].replace(/\\/g, '/')
          }
        }
        return undefined
      }
      t.getPackageName = getPackageName
    },
    2122: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.normalizeWildcardRequire = t.normalizeDefaultRequire = void 0
      function normalizeDefaultRequire(e) {
        if (e && e.__esModule) return e
        return { default: e }
      }
      t.normalizeDefaultRequire = normalizeDefaultRequire
      const r = Object.prototype.hasOwnProperty
      function normalizeWildcardRequire(e) {
        if (e && e.__esModule) return e
        const t = {}
        for (const s in e) {
          if (!r.call(e, s)) continue
          t[s] = e[s]
        }
        t['default'] = e
        return t
      }
      t.normalizeWildcardRequire = normalizeWildcardRequire
    },
    2878: function (e, t, r) {
      var s =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e }
        }
      Object.defineProperty(t, '__esModule', { value: true })
      t.sharedLibEmit = void 0
      const a = s(r(2037))
      const o = s(r(3460))
      const u = r(5258)
      let c = ''
      switch (a.default.platform()) {
        case 'darwin':
          c = '/**/*.@(dylib|so?(.*))'
          break
        case 'win32':
          c = '/**/*.dll'
          break
        default:
          c = '/**/*.so?(.*)'
      }
      async function sharedLibEmit(e, t) {
        const r = u.getPackageBase(e)
        if (!r) return
        const s = await new Promise((e, t) =>
          o.default(r + c, { ignore: r + '/**/node_modules/**/*' }, (r, s) =>
            r ? t(r) : e(s)
          )
        )
        await Promise.all(s.map((r) => t.emitFile(r, 'sharedlib', e)))
      }
      t.sharedLibEmit = sharedLibEmit
    },
    2221: function (e, t, r) {
      var s =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e }
        }
      Object.defineProperty(t, '__esModule', { value: true })
      const a = r(1017)
      const o = s(r(5825))
      const u = r(5258)
      const c = r(9165)
      const f = {
        '@generated/photon'({ id: e, emitAssetDirectory: t }) {
          if (e.endsWith('@generated/photon/index.js')) {
            t(a.resolve(a.dirname(e), 'runtime/'))
          }
        },
        argon2({ id: e, emitAssetDirectory: t }) {
          if (e.endsWith('argon2/argon2.js')) {
            t(a.resolve(a.dirname(e), 'build', 'Release'))
            t(a.resolve(a.dirname(e), 'prebuilds'))
            t(a.resolve(a.dirname(e), 'lib', 'binding'))
          }
        },
        bull({ id: e, emitAssetDirectory: t }) {
          if (e.endsWith('bull/lib/commands/index.js')) {
            t(a.resolve(a.dirname(e)))
          }
        },
        camaro({ id: e, emitAsset: t }) {
          if (e.endsWith('camaro/dist/camaro.js')) {
            t(a.resolve(a.dirname(e), 'camaro.wasm'))
          }
        },
        esbuild({ id: e, emitAssetDirectory: t }) {
          if (e.endsWith('esbuild/lib/main.js')) {
            const r = a.resolve(e, '..', '..', 'package.json')
            const s = JSON.parse(c.readFileSync(r, 'utf8'))
            for (const r of Object.keys(s.optionalDependencies || {})) {
              const s = a.resolve(e, '..', '..', '..', r)
              t(s)
            }
          }
        },
        'google-gax'({ id: e, ast: t, emitAssetDirectory: r }) {
          if (e.endsWith('google-gax/build/src/grpc.js')) {
            for (const s of t.body) {
              if (
                s.type === 'VariableDeclaration' &&
                s.declarations[0].id.type === 'Identifier' &&
                s.declarations[0].id.name === 'googleProtoFilesDir'
              ) {
                r(a.resolve(a.dirname(e), '../../../google-proto-files'))
              }
            }
          }
        },
        oracledb({ id: e, ast: t, emitAsset: r }) {
          if (e.endsWith('oracledb/lib/oracledb.js')) {
            for (const s of t.body) {
              if (
                s.type === 'ForStatement' &&
                'body' in s.body &&
                s.body.body &&
                Array.isArray(s.body.body) &&
                s.body.body[0] &&
                s.body.body[0].type === 'TryStatement' &&
                s.body.body[0].block.body[0] &&
                s.body.body[0].block.body[0].type === 'ExpressionStatement' &&
                s.body.body[0].block.body[0].expression.type ===
                  'AssignmentExpression' &&
                s.body.body[0].block.body[0].expression.operator === '=' &&
                s.body.body[0].block.body[0].expression.left.type ===
                  'Identifier' &&
                s.body.body[0].block.body[0].expression.left.name ===
                  'oracledbCLib' &&
                s.body.body[0].block.body[0].expression.right.type ===
                  'CallExpression' &&
                s.body.body[0].block.body[0].expression.right.callee.type ===
                  'Identifier' &&
                s.body.body[0].block.body[0].expression.right.callee.name ===
                  'require' &&
                s.body.body[0].block.body[0].expression.right.arguments
                  .length === 1 &&
                s.body.body[0].block.body[0].expression.right.arguments[0]
                  .type === 'MemberExpression' &&
                s.body.body[0].block.body[0].expression.right.arguments[0]
                  .computed === true &&
                s.body.body[0].block.body[0].expression.right.arguments[0]
                  .object.type === 'Identifier' &&
                s.body.body[0].block.body[0].expression.right.arguments[0]
                  .object.name === 'binaryLocations' &&
                s.body.body[0].block.body[0].expression.right.arguments[0]
                  .property.type === 'Identifier' &&
                s.body.body[0].block.body[0].expression.right.arguments[0]
                  .property.name === 'i'
              ) {
                s.body.body[0].block.body[0].expression.right.arguments = [
                  { type: 'Literal', value: '_' },
                ]
                const t = global._unit
                  ? '3.0.0'
                  : JSON.parse(
                      c.readFileSync(e.slice(0, -15) + 'package.json', 'utf8')
                    ).version
                const o = Number(t.slice(0, t.indexOf('.'))) >= 4
                const u =
                  'oracledb-' +
                  (o ? t : 'abi' + process.versions.modules) +
                  '-' +
                  process.platform +
                  '-' +
                  process.arch +
                  '.node'
                r(a.resolve(e, '../../build/Release/' + u))
              }
            }
          }
        },
        'phantomjs-prebuilt'({ id: e, emitAssetDirectory: t }) {
          if (e.endsWith('phantomjs-prebuilt/lib/phantomjs.js')) {
            t(a.resolve(a.dirname(e), '..', 'bin'))
          }
        },
        'remark-prism'({ id: e, emitAssetDirectory: t }) {
          const r = 'remark-prism/src/highlight.js'
          if (e.endsWith(r)) {
            try {
              const s = e.slice(0, -r.length)
              t(a.resolve(s, 'prismjs', 'components'))
            } catch (e) {}
          }
        },
        semver({ id: e, emitAsset: t }) {
          if (e.endsWith('semver/index.js')) {
            t(a.resolve(e.replace('index.js', 'preload.js')))
          }
        },
        'socket.io': async function ({ id: e, ast: t, job: r }) {
          if (e.endsWith('socket.io/lib/index.js')) {
            async function replaceResolvePathStatement(t) {
              if (
                t.type === 'ExpressionStatement' &&
                t.expression.type === 'AssignmentExpression' &&
                t.expression.operator === '=' &&
                t.expression.right.type === 'CallExpression' &&
                t.expression.right.callee.type === 'Identifier' &&
                t.expression.right.callee.name === 'read' &&
                t.expression.right.arguments.length >= 1 &&
                t.expression.right.arguments[0].type === 'CallExpression' &&
                t.expression.right.arguments[0].callee.type === 'Identifier' &&
                t.expression.right.arguments[0].callee.name === 'resolvePath' &&
                t.expression.right.arguments[0].arguments.length === 1 &&
                t.expression.right.arguments[0].arguments[0].type === 'Literal'
              ) {
                const s = t.expression.right.arguments[0].arguments[0].value
                let u
                try {
                  const t = await o.default(String(s), e, r)
                  if (typeof t === 'string') {
                    u = t
                  } else {
                    return undefined
                  }
                } catch (e) {
                  return undefined
                }
                const c = '/' + a.relative(a.dirname(e), u)
                t.expression.right.arguments[0] = {
                  type: 'BinaryExpression',
                  start: t.expression.right.arguments[0].start,
                  end: t.expression.right.arguments[0].end,
                  operator: '+',
                  left: { type: 'Identifier', name: '__dirname' },
                  right: { type: 'Literal', value: c, raw: JSON.stringify(c) },
                }
              }
              return undefined
            }
            for (const e of t.body) {
              if (
                e.type === 'ExpressionStatement' &&
                e.expression.type === 'AssignmentExpression' &&
                e.expression.operator === '=' &&
                e.expression.left.type === 'MemberExpression' &&
                e.expression.left.object.type === 'MemberExpression' &&
                e.expression.left.object.object.type === 'Identifier' &&
                e.expression.left.object.object.name === 'Server' &&
                e.expression.left.object.property.type === 'Identifier' &&
                e.expression.left.object.property.name === 'prototype' &&
                e.expression.left.property.type === 'Identifier' &&
                e.expression.left.property.name === 'serveClient' &&
                e.expression.right.type === 'FunctionExpression'
              ) {
                for (const t of e.expression.right.body.body) {
                  if (
                    t.type === 'IfStatement' &&
                    t.consequent &&
                    'body' in t.consequent &&
                    t.consequent.body
                  ) {
                    const e = t.consequent.body
                    let r = false
                    if (
                      Array.isArray(e) &&
                      e[0] &&
                      e[0].type === 'ExpressionStatement'
                    ) {
                      r = await replaceResolvePathStatement(e[0])
                    }
                    if (
                      Array.isArray(e) &&
                      e[1] &&
                      e[1].type === 'TryStatement' &&
                      e[1].block.body &&
                      e[1].block.body[0]
                    ) {
                      r =
                        (await replaceResolvePathStatement(
                          e[1].block.body[0]
                        )) || r
                    }
                    return
                  }
                }
              }
            }
          }
        },
        typescript({ id: e, emitAssetDirectory: t }) {
          if (e.endsWith('typescript/lib/tsc.js')) {
            t(a.resolve(e, '../'))
          }
        },
        'uglify-es'({ id: e, emitAsset: t }) {
          if (e.endsWith('uglify-es/tools/node.js')) {
            t(a.resolve(e, '../../lib/utils.js'))
            t(a.resolve(e, '../../lib/ast.js'))
            t(a.resolve(e, '../../lib/parse.js'))
            t(a.resolve(e, '../../lib/transform.js'))
            t(a.resolve(e, '../../lib/scope.js'))
            t(a.resolve(e, '../../lib/output.js'))
            t(a.resolve(e, '../../lib/compress.js'))
            t(a.resolve(e, '../../lib/sourcemap.js'))
            t(a.resolve(e, '../../lib/mozilla-ast.js'))
            t(a.resolve(e, '../../lib/propmangle.js'))
            t(a.resolve(e, '../../lib/minify.js'))
            t(a.resolve(e, '../exports.js'))
          }
        },
        'uglify-js'({ id: e, emitAsset: t, emitAssetDirectory: r }) {
          if (e.endsWith('uglify-js/tools/node.js')) {
            r(a.resolve(e, '../../lib'))
            t(a.resolve(e, '../exports.js'))
          }
        },
        'playwright-core'({ id: e, emitAsset: t }) {
          if (e.endsWith('playwright-core/index.js')) {
            t(a.resolve(a.dirname(e), 'browsers.json'))
          }
        },
        'geo-tz'({ id: e, emitAsset: t }) {
          if (e.endsWith('geo-tz/dist/geo-tz.js')) {
            t(a.resolve(a.dirname(e), '../data/geo.dat'))
          }
        },
        pixelmatch({ id: e, emitDependency: t }) {
          if (e.endsWith('pixelmatch/index.js')) {
            t(a.resolve(a.dirname(e), 'bin/pixelmatch'))
          }
        },
      }
      async function handleSpecialCases({
        id: e,
        ast: t,
        emitDependency: r,
        emitAsset: s,
        emitAssetDirectory: a,
        job: o,
      }) {
        const c = u.getPackageName(e)
        const p = f[c || '']
        e = e.replace(/\\/g, '/')
        if (p)
          await p({
            id: e,
            ast: t,
            emitDependency: r,
            emitAsset: s,
            emitAssetDirectory: a,
            job: o,
          })
      }
      t['default'] = handleSpecialCases
    },
    8010: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.wildcardRegEx =
        t.WILDCARD =
        t.FUNCTION =
        t.UNKNOWN =
        t.evaluate =
          void 0
      const s = r(7310)
      async function evaluate(e, t = {}, r = true) {
        const s = { computeBranches: r, vars: t }
        return walk(e)
        function walk(e) {
          const t = a[e.type]
          if (t) {
            return t.call(s, e, walk)
          }
          return undefined
        }
      }
      t.evaluate = evaluate
      t.UNKNOWN = Symbol()
      t.FUNCTION = Symbol()
      t.WILDCARD = ''
      t.wildcardRegEx = /\x1a/g
      function countWildcards(e) {
        t.wildcardRegEx.lastIndex = 0
        let r = 0
        while (t.wildcardRegEx.exec(e)) r++
        return r
      }
      const a = {
        ArrayExpression: async function ArrayExpression(e, t) {
          const r = []
          for (let s = 0, a = e.elements.length; s < a; s++) {
            if (e.elements[s] === null) {
              r.push(null)
              continue
            }
            const a = await t(e.elements[s])
            if (!a) return
            if ('value' in a === false) return
            r.push(a.value)
          }
          return { value: r }
        },
        ArrowFunctionExpression: async function (e, r) {
          if (
            e.params.length === 0 &&
            !e.generator &&
            !e.async &&
            e.expression
          ) {
            const s = await r(e.body)
            if (!s || !('value' in s)) return
            return { value: { [t.FUNCTION]: () => s.value } }
          }
          return undefined
        },
        BinaryExpression: async function BinaryExpression(e, r) {
          const s = e.operator
          let a = await r(e.left)
          if (!a && s !== '+') return
          let o = await r(e.right)
          if (!a && !o) return
          if (!a) {
            if (
              this.computeBranches &&
              o &&
              'value' in o &&
              typeof o.value === 'string'
            )
              return {
                value: t.WILDCARD + o.value,
                wildcards: [e.left, ...(o.wildcards || [])],
              }
            return
          }
          if (!o) {
            if (this.computeBranches && s === '+') {
              if (a && 'value' in a && typeof a.value === 'string')
                return {
                  value: a.value + t.WILDCARD,
                  wildcards: [...(a.wildcards || []), e.right],
                }
            }
            if (!('test' in a) && s === '||' && a.value) return a
            return
          }
          if ('test' in a && 'value' in o) {
            const e = o.value
            if (s === '==')
              return { test: a.test, then: a.then == e, else: a.else == e }
            if (s === '===')
              return { test: a.test, then: a.then === e, else: a.else === e }
            if (s === '!=')
              return { test: a.test, then: a.then != e, else: a.else != e }
            if (s === '!==')
              return { test: a.test, then: a.then !== e, else: a.else !== e }
            if (s === '+')
              return { test: a.test, then: a.then + e, else: a.else + e }
            if (s === '-')
              return { test: a.test, then: a.then - e, else: a.else - e }
            if (s === '*')
              return { test: a.test, then: a.then * e, else: a.else * e }
            if (s === '/')
              return { test: a.test, then: a.then / e, else: a.else / e }
            if (s === '%')
              return { test: a.test, then: a.then % e, else: a.else % e }
            if (s === '<')
              return { test: a.test, then: a.then < e, else: a.else < e }
            if (s === '<=')
              return { test: a.test, then: a.then <= e, else: a.else <= e }
            if (s === '>')
              return { test: a.test, then: a.then > e, else: a.else > e }
            if (s === '>=')
              return { test: a.test, then: a.then >= e, else: a.else >= e }
            if (s === '|')
              return { test: a.test, then: a.then | e, else: a.else | e }
            if (s === '&')
              return { test: a.test, then: a.then & e, else: a.else & e }
            if (s === '^')
              return { test: a.test, then: a.then ^ e, else: a.else ^ e }
            if (s === '&&')
              return { test: a.test, then: a.then && e, else: a.else && e }
            if (s === '||')
              return { test: a.test, then: a.then || e, else: a.else || e }
          } else if ('test' in o && 'value' in a) {
            const e = a.value
            if (s === '==')
              return { test: o.test, then: e == o.then, else: e == o.else }
            if (s === '===')
              return { test: o.test, then: e === o.then, else: e === o.else }
            if (s === '!=')
              return { test: o.test, then: e != o.then, else: e != o.else }
            if (s === '!==')
              return { test: o.test, then: e !== o.then, else: e !== o.else }
            if (s === '+')
              return { test: o.test, then: e + o.then, else: e + o.else }
            if (s === '-')
              return { test: o.test, then: e - o.then, else: e - o.else }
            if (s === '*')
              return { test: o.test, then: e * o.then, else: e * o.else }
            if (s === '/')
              return { test: o.test, then: e / o.then, else: e / o.else }
            if (s === '%')
              return { test: o.test, then: e % o.then, else: e % o.else }
            if (s === '<')
              return { test: o.test, then: e < o.then, else: e < o.else }
            if (s === '<=')
              return { test: o.test, then: e <= o.then, else: e <= o.else }
            if (s === '>')
              return { test: o.test, then: e > o.then, else: e > o.else }
            if (s === '>=')
              return { test: o.test, then: e >= o.then, else: e >= o.else }
            if (s === '|')
              return { test: o.test, then: e | o.then, else: e | o.else }
            if (s === '&')
              return { test: o.test, then: e & o.then, else: e & o.else }
            if (s === '^')
              return { test: o.test, then: e ^ o.then, else: e ^ o.else }
            if (s === '&&')
              return { test: o.test, then: e && o.then, else: a && o.else }
            if (s === '||')
              return { test: o.test, then: e || o.then, else: a || o.else }
          } else if ('value' in a && 'value' in o) {
            if (s === '==') return { value: a.value == o.value }
            if (s === '===') return { value: a.value === o.value }
            if (s === '!=') return { value: a.value != o.value }
            if (s === '!==') return { value: a.value !== o.value }
            if (s === '+') {
              const e = { value: a.value + o.value }
              let t = []
              if ('wildcards' in a && a.wildcards) {
                t = t.concat(a.wildcards)
              }
              if ('wildcards' in o && o.wildcards) {
                t = t.concat(o.wildcards)
              }
              if (t.length > 0) {
                e.wildcards = t
              }
              return e
            }
            if (s === '-') return { value: a.value - o.value }
            if (s === '*') return { value: a.value * o.value }
            if (s === '/') return { value: a.value / o.value }
            if (s === '%') return { value: a.value % o.value }
            if (s === '<') return { value: a.value < o.value }
            if (s === '<=') return { value: a.value <= o.value }
            if (s === '>') return { value: a.value > o.value }
            if (s === '>=') return { value: a.value >= o.value }
            if (s === '|') return { value: a.value | o.value }
            if (s === '&') return { value: a.value & o.value }
            if (s === '^') return { value: a.value ^ o.value }
            if (s === '&&') return { value: a.value && o.value }
            if (s === '||') return { value: a.value || o.value }
          }
          return
        },
        CallExpression: async function CallExpression(e, r) {
          var s
          const a = await r(e.callee)
          if (!a || 'test' in a) return
          let o = a.value
          if (typeof o === 'object' && o !== null) o = o[t.FUNCTION]
          if (typeof o !== 'function') return
          let u = null
          if (e.callee.object) {
            u = await r(e.callee.object)
            u = u && 'value' in u && u.value ? u.value : null
          }
          let c
          let f = []
          let p
          let h =
            e.arguments.length > 0 &&
            ((s = e.callee.property) === null || s === void 0
              ? void 0
              : s.name) !== 'concat'
          const d = []
          for (let s = 0, a = e.arguments.length; s < a; s++) {
            let a = await r(e.arguments[s])
            if (a) {
              h = false
              if ('value' in a && typeof a.value === 'string' && a.wildcards)
                a.wildcards.forEach((e) => d.push(e))
            } else {
              if (!this.computeBranches) return
              a = { value: t.WILDCARD }
              d.push(e.arguments[s])
            }
            if ('test' in a) {
              if (d.length) return
              if (c) return
              c = a.test
              p = f.concat([])
              f.push(a.then)
              p.push(a.else)
            } else {
              f.push(a.value)
              if (p) p.push(a.value)
            }
          }
          if (h) return
          try {
            const e = await o.apply(u, f)
            if (e === t.UNKNOWN) return
            if (!c) {
              if (d.length) {
                if (typeof e !== 'string' || countWildcards(e) !== d.length)
                  return
                return { value: e, wildcards: d }
              }
              return { value: e }
            }
            const r = await o.apply(u, p)
            if (e === t.UNKNOWN) return
            return { test: c, then: e, else: r }
          } catch (e) {
            return
          }
        },
        ConditionalExpression: async function ConditionalExpression(e, t) {
          const r = await t(e.test)
          if (r && 'value' in r)
            return r.value ? t(e.consequent) : t(e.alternate)
          if (!this.computeBranches) return
          const s = await t(e.consequent)
          if (!s || 'wildcards' in s || 'test' in s) return
          const a = await t(e.alternate)
          if (!a || 'wildcards' in a || 'test' in a) return
          return { test: e.test, then: s.value, else: a.value }
        },
        ExpressionStatement: async function ExpressionStatement(e, t) {
          return t(e.expression)
        },
        Identifier: async function Identifier(e, t) {
          if (Object.hasOwnProperty.call(this.vars, e.name))
            return this.vars[e.name]
          return undefined
        },
        Literal: async function Literal(e, t) {
          return { value: e.value }
        },
        MemberExpression: async function MemberExpression(e, r) {
          const s = await r(e.object)
          if (!s || 'test' in s || typeof s.value === 'function') {
            return undefined
          }
          if (e.property.type === 'Identifier') {
            if (typeof s.value === 'string' && e.property.name === 'concat') {
              return { value: { [t.FUNCTION]: (...e) => s.value.concat(e) } }
            }
            if (typeof s.value === 'object' && s.value !== null) {
              const a = s.value
              if (e.computed) {
                const o = await r(e.property)
                if (o && 'value' in o && o.value) {
                  const e = a[o.value]
                  if (e === t.UNKNOWN) return undefined
                  return { value: e }
                }
                if (!a[t.UNKNOWN] && Object.keys(s).length === 0) {
                  return { value: undefined }
                }
              } else if (e.property.name in a) {
                const r = a[e.property.name]
                if (r === t.UNKNOWN) return undefined
                return { value: r }
              } else if (a[t.UNKNOWN]) return undefined
            } else {
              return { value: undefined }
            }
          }
          const a = await r(e.property)
          if (!a || 'test' in a) return undefined
          if (typeof s.value === 'object' && s.value !== null) {
            if (a.value in s.value) {
              const e = s.value[a.value]
              if (e === t.UNKNOWN) return undefined
              return { value: e }
            } else if (s.value[t.UNKNOWN]) {
              return undefined
            }
          } else {
            return { value: undefined }
          }
          return undefined
        },
        MetaProperty: async function MetaProperty(e) {
          if (e.meta.name === 'import' && e.property.name === 'meta')
            return { value: this.vars['import.meta'] }
          return undefined
        },
        NewExpression: async function NewExpression(e, t) {
          const r = await t(e.callee)
          if (r && 'value' in r && r.value === s.URL && e.arguments.length) {
            const r = await t(e.arguments[0])
            if (!r) return undefined
            let a = null
            if (e.arguments[1]) {
              a = await t(e.arguments[1])
              if (!a || !('value' in a)) return undefined
            }
            if ('value' in r) {
              if (a) {
                try {
                  return { value: new s.URL(r.value, a.value) }
                } catch (e) {
                  return undefined
                }
              }
              try {
                return { value: new s.URL(r.value) }
              } catch (e) {
                return undefined
              }
            } else {
              const e = r.test
              if (a) {
                try {
                  return {
                    test: e,
                    then: new s.URL(r.then, a.value),
                    else: new s.URL(r.else, a.value),
                  }
                } catch (e) {
                  return undefined
                }
              }
              try {
                return {
                  test: e,
                  then: new s.URL(r.then),
                  else: new s.URL(r.else),
                }
              } catch (e) {
                return undefined
              }
            }
          }
          return undefined
        },
        ObjectExpression: async function ObjectExpression(e, r) {
          const s = {}
          for (let a = 0; a < e.properties.length; a++) {
            const o = e.properties[a]
            const u = o.computed
              ? r(o.key)
              : o.key && { value: o.key.name || o.key.value }
            if (!u || 'test' in u) return
            const c = await r(o.value)
            if (!c || 'test' in c) return
            if (c.value === t.UNKNOWN) return
            s[u.value] = c.value
          }
          return { value: s }
        },
        SequenceExpression: async function SequenceExpression(e, t) {
          if (
            'expressions' in e &&
            e.expressions.length === 2 &&
            e.expressions[0].type === 'Literal' &&
            e.expressions[0].value === 0 &&
            e.expressions[1].type === 'MemberExpression'
          ) {
            const r = await t(e.expressions[1])
            return r
          }
          return undefined
        },
        TemplateLiteral: async function TemplateLiteral(e, r) {
          let s = { value: '' }
          for (var a = 0; a < e.expressions.length; a++) {
            if ('value' in s) {
              s.value += e.quasis[a].value.cooked
            } else {
              s.then += e.quasis[a].value.cooked
              s.else += e.quasis[a].value.cooked
            }
            let o = await r(e.expressions[a])
            if (!o) {
              if (!this.computeBranches) return undefined
              o = { value: t.WILDCARD, wildcards: [e.expressions[a]] }
            }
            if ('value' in o) {
              if ('value' in s) {
                s.value += o.value
                if (o.wildcards)
                  s.wildcards = [...(s.wildcards || []), ...o.wildcards]
              } else {
                if (o.wildcards) return
                s.then += o.value
                s.else += o.value
              }
            } else if ('value' in s) {
              if ('wildcards' in s) {
                return
              }
              s = {
                test: o.test,
                then: s.value + o.then,
                else: s.value + o.else,
              }
            } else {
              return
            }
          }
          if ('value' in s) {
            s.value += e.quasis[a].value.cooked
          } else {
            s.then += e.quasis[a].value.cooked
            s.else += e.quasis[a].value.cooked
          }
          return s
        },
        ThisExpression: async function ThisExpression(e, t) {
          if (Object.hasOwnProperty.call(this.vars, 'this'))
            return this.vars['this']
          return undefined
        },
        UnaryExpression: async function UnaryExpression(e, t) {
          const r = await t(e.argument)
          if (!r) return undefined
          if ('value' in r && 'wildcards' in r === false) {
            if (e.operator === '+') return { value: +r.value }
            if (e.operator === '-') return { value: -r.value }
            if (e.operator === '~') return { value: ~r.value }
            if (e.operator === '!') return { value: !r.value }
          } else if ('test' in r && 'wildcards' in r === false) {
            if (e.operator === '+')
              return { test: r.test, then: +r.then, else: +r.else }
            if (e.operator === '-')
              return { test: r.test, then: -r.then, else: -r.else }
            if (e.operator === '~')
              return { test: r.test, then: ~r.then, else: ~r.else }
            if (e.operator === '!')
              return { test: r.test, then: !r.then, else: !r.else }
          }
          return undefined
        },
      }
      a.LogicalExpression = a.BinaryExpression
    },
    867: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.handleWrappers = void 0
      const s = r(3982)
      function isUndefinedOrVoid(e) {
        return (
          (e.type === 'Identifier' && e.name === 'undefined') ||
          (e.type === 'UnaryExpression' &&
            e.operator === 'void' &&
            e.argument.type === 'Literal' &&
            e.argument.value === 0)
        )
      }
      function handleWrappers(e) {
        var t
        let r
        if (
          e.body.length === 1 &&
          e.body[0].type === 'ExpressionStatement' &&
          e.body[0].expression.type === 'UnaryExpression' &&
          e.body[0].expression.operator === '!' &&
          e.body[0].expression.argument.type === 'CallExpression' &&
          e.body[0].expression.argument.callee.type === 'FunctionExpression' &&
          e.body[0].expression.argument.arguments.length === 1
        )
          r = e.body[0].expression.argument
        else if (
          e.body.length === 1 &&
          e.body[0].type === 'ExpressionStatement' &&
          e.body[0].expression.type === 'CallExpression' &&
          e.body[0].expression.callee.type === 'FunctionExpression' &&
          (e.body[0].expression.arguments.length === 1 ||
            e.body[0].expression.arguments.length === 0)
        )
          r = e.body[0].expression
        else if (
          e.body.length === 1 &&
          e.body[0].type === 'ExpressionStatement' &&
          e.body[0].expression.type === 'AssignmentExpression' &&
          e.body[0].expression.left.type === 'MemberExpression' &&
          e.body[0].expression.left.object.type === 'Identifier' &&
          e.body[0].expression.left.object.name === 'module' &&
          e.body[0].expression.left.property.type === 'Identifier' &&
          e.body[0].expression.left.property.name === 'exports' &&
          e.body[0].expression.right.type === 'CallExpression' &&
          e.body[0].expression.right.callee.type === 'FunctionExpression' &&
          e.body[0].expression.right.arguments.length === 1
        )
          r = e.body[0].expression.right
        if (r) {
          let e
          let a
          if (
            r.arguments[0] &&
            r.arguments[0].type === 'ConditionalExpression' &&
            r.arguments[0].test.type === 'LogicalExpression' &&
            r.arguments[0].test.operator === '&&' &&
            r.arguments[0].test.left.type === 'BinaryExpression' &&
            r.arguments[0].test.left.operator === '===' &&
            r.arguments[0].test.left.left.type === 'UnaryExpression' &&
            r.arguments[0].test.left.left.operator === 'typeof' &&
            'name' in r.arguments[0].test.left.left.argument &&
            r.arguments[0].test.left.left.argument.name === 'define' &&
            r.arguments[0].test.left.right.type === 'Literal' &&
            r.arguments[0].test.left.right.value === 'function' &&
            r.arguments[0].test.right.type === 'MemberExpression' &&
            r.arguments[0].test.right.object.type === 'Identifier' &&
            r.arguments[0].test.right.property.type === 'Identifier' &&
            r.arguments[0].test.right.property.name === 'amd' &&
            r.arguments[0].test.right.computed === false &&
            r.arguments[0].alternate.type === 'FunctionExpression' &&
            r.arguments[0].alternate.params.length === 1 &&
            r.arguments[0].alternate.params[0].type === 'Identifier' &&
            r.arguments[0].alternate.body.body.length === 1 &&
            r.arguments[0].alternate.body.body[0].type ===
              'ExpressionStatement' &&
            r.arguments[0].alternate.body.body[0].expression.type ===
              'AssignmentExpression' &&
            r.arguments[0].alternate.body.body[0].expression.left.type ===
              'MemberExpression' &&
            r.arguments[0].alternate.body.body[0].expression.left.object
              .type === 'Identifier' &&
            r.arguments[0].alternate.body.body[0].expression.left.object
              .name === 'module' &&
            r.arguments[0].alternate.body.body[0].expression.left.property
              .type === 'Identifier' &&
            r.arguments[0].alternate.body.body[0].expression.left.property
              .name === 'exports' &&
            r.arguments[0].alternate.body.body[0].expression.left.computed ===
              false &&
            r.arguments[0].alternate.body.body[0].expression.right.type ===
              'CallExpression' &&
            r.arguments[0].alternate.body.body[0].expression.right.callee
              .type === 'Identifier' &&
            r.arguments[0].alternate.body.body[0].expression.right.callee
              .name === r.arguments[0].alternate.params[0].name &&
            'body' in r.callee &&
            'body' in r.callee.body &&
            Array.isArray(r.callee.body.body) &&
            r.arguments[0].alternate.body.body[0].expression.right.arguments
              .length === 1 &&
            r.arguments[0].alternate.body.body[0].expression.right.arguments[0]
              .type === 'Identifier' &&
            r.arguments[0].alternate.body.body[0].expression.right.arguments[0]
              .name === 'require'
          ) {
            let e = r.callee.body.body
            if (
              e[0].type === 'ExpressionStatement' &&
              e[0].expression.type === 'Literal' &&
              e[0].expression.value === 'use strict'
            ) {
              e = e.slice(1)
            }
            if (
              e.length === 1 &&
              e[0].type === 'ExpressionStatement' &&
              e[0].expression.type === 'CallExpression' &&
              e[0].expression.callee.type === 'Identifier' &&
              e[0].expression.callee.name ===
                r.arguments[0].test.right.object.name &&
              e[0].expression.arguments.length === 1 &&
              e[0].expression.arguments[0].type === 'FunctionExpression' &&
              e[0].expression.arguments[0].params.length === 1 &&
              e[0].expression.arguments[0].params[0].type === 'Identifier' &&
              e[0].expression.arguments[0].params[0].name === 'require'
            ) {
              const t = e[0].expression.arguments[0]
              t.params = []
              try {
                delete t.scope.declarations.require
              } catch (e) {}
            }
          } else if (
            r.arguments[0] &&
            r.arguments[0].type === 'FunctionExpression' &&
            r.arguments[0].params.length === 0 &&
            (r.arguments[0].body.body.length === 1 ||
              (r.arguments[0].body.body.length === 2 &&
                r.arguments[0].body.body[0].type === 'VariableDeclaration' &&
                r.arguments[0].body.body[0].declarations.length === 3 &&
                r.arguments[0].body.body[0].declarations.every(
                  (e) => e.init === null && e.id.type === 'Identifier'
                ))) &&
            r.arguments[0].body.body[r.arguments[0].body.body.length - 1]
              .type === 'ReturnStatement' &&
            (e =
              r.arguments[0].body.body[r.arguments[0].body.body.length - 1]) &&
            ((t = e.argument) === null || t === void 0 ? void 0 : t.type) ===
              'CallExpression' &&
            e.argument.arguments.length &&
            e.argument.arguments.every(
              (e) => e && e.type === 'Literal' && typeof e.value === 'number'
            ) &&
            e.argument.callee.type === 'CallExpression' &&
            (e.argument.callee.callee.type === 'FunctionExpression' ||
              (e.argument.callee.callee.type === 'CallExpression' &&
                e.argument.callee.callee.callee.type === 'FunctionExpression' &&
                e.argument.callee.callee.arguments.length === 0)) &&
            e.argument.callee.arguments.length === 3 &&
            e.argument.callee.arguments[0].type === 'ObjectExpression' &&
            e.argument.callee.arguments[1].type === 'ObjectExpression' &&
            e.argument.callee.arguments[2].type === 'ArrayExpression'
          ) {
            const t = e.argument.callee.arguments[0].properties
            const r = {}
            if (
              t.every((e) => {
                if (
                  e.type !== 'Property' ||
                  e.computed !== false ||
                  e.key.type !== 'Literal' ||
                  typeof e.key.value !== 'number' ||
                  e.value.type !== 'ArrayExpression' ||
                  e.value.elements.length !== 2 ||
                  !e.value.elements[0] ||
                  !e.value.elements[1] ||
                  e.value.elements[0].type !== 'FunctionExpression' ||
                  e.value.elements[1].type !== 'ObjectExpression'
                ) {
                  return false
                }
                const t = e.value.elements[1].properties
                for (const e of t) {
                  if (
                    e.type !== 'Property' ||
                    (e.value.type !== 'Identifier' &&
                      e.value.type !== 'Literal' &&
                      !isUndefinedOrVoid(e.value)) ||
                    !(
                      (e.key.type === 'Literal' &&
                        typeof e.key.value === 'string') ||
                      e.key.type === 'Identifier'
                    ) ||
                    e.computed
                  ) {
                    return false
                  }
                  if (isUndefinedOrVoid(e.value)) {
                    if (e.key.type === 'Identifier') {
                      r[e.key.name] = {
                        type: 'Literal',
                        start: e.key.start,
                        end: e.key.end,
                        value: e.key.name,
                        raw: JSON.stringify(e.key.name),
                      }
                    } else if (e.key.type === 'Literal') {
                      r[String(e.key.value)] = e.key
                    }
                  }
                }
                return true
              })
            ) {
              const t = Object.keys(r)
              const s = e.argument.callee.arguments[1]
              s.properties = t.map((e) => ({
                type: 'Property',
                method: false,
                shorthand: false,
                computed: false,
                kind: 'init',
                key: r[e],
                value: {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      kind: 'init',
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: { type: 'Identifier', name: 'exports' },
                      value: {
                        type: 'CallExpression',
                        optional: false,
                        callee: { type: 'Identifier', name: 'require' },
                        arguments: [r[e]],
                      },
                    },
                  ],
                },
              }))
            }
          } else if (
            r.arguments[0] &&
            r.arguments[0].type === 'FunctionExpression' &&
            r.arguments[0].params.length === 2 &&
            r.arguments[0].params[0].type === 'Identifier' &&
            r.arguments[0].params[1].type === 'Identifier' &&
            'body' in r.callee &&
            'body' in r.callee.body &&
            Array.isArray(r.callee.body.body) &&
            r.callee.body.body.length === 1
          ) {
            const e = r.callee.body.body[0]
            if (
              e.type === 'IfStatement' &&
              e.test.type === 'LogicalExpression' &&
              e.test.operator === '&&' &&
              e.test.left.type === 'BinaryExpression' &&
              e.test.left.left.type === 'UnaryExpression' &&
              e.test.left.left.operator === 'typeof' &&
              e.test.left.left.argument.type === 'Identifier' &&
              e.test.left.left.argument.name === 'module' &&
              e.test.left.right.type === 'Literal' &&
              e.test.left.right.value === 'object' &&
              e.test.right.type === 'BinaryExpression' &&
              e.test.right.left.type === 'UnaryExpression' &&
              e.test.right.left.operator === 'typeof' &&
              e.test.right.left.argument.type === 'MemberExpression' &&
              e.test.right.left.argument.object.type === 'Identifier' &&
              e.test.right.left.argument.object.name === 'module' &&
              e.test.right.left.argument.property.type === 'Identifier' &&
              e.test.right.left.argument.property.name === 'exports' &&
              e.test.right.right.type === 'Literal' &&
              e.test.right.right.value === 'object' &&
              e.consequent.type === 'BlockStatement' &&
              e.consequent.body.length > 0
            ) {
              let t
              if (
                e.consequent.body[0].type === 'VariableDeclaration' &&
                e.consequent.body[0].declarations[0].init &&
                e.consequent.body[0].declarations[0].init.type ===
                  'CallExpression'
              )
                t = e.consequent.body[0].declarations[0].init
              else if (
                e.consequent.body[0].type === 'ExpressionStatement' &&
                e.consequent.body[0].expression.type === 'CallExpression'
              )
                t = e.consequent.body[0].expression
              else if (
                e.consequent.body[0].type === 'ExpressionStatement' &&
                e.consequent.body[0].expression.type ===
                  'AssignmentExpression' &&
                e.consequent.body[0].expression.operator === '=' &&
                e.consequent.body[0].expression.right.type === 'CallExpression'
              )
                t = e.consequent.body[0].expression.right
              if (
                t &&
                t.callee.type === 'Identifier' &&
                'params' in r.callee &&
                r.callee.params.length > 0 &&
                'name' in r.callee.params[0] &&
                t.callee.name === r.callee.params[0].name &&
                t.arguments.length === 2 &&
                t.arguments[0].type === 'Identifier' &&
                t.arguments[0].name === 'require' &&
                t.arguments[1].type === 'Identifier' &&
                t.arguments[1].name === 'exports'
              ) {
                const e = r.arguments[0]
                e.params = []
                try {
                  const t = e.scope
                  delete t.declarations.require
                  delete t.declarations.exports
                } catch (e) {}
              }
            }
          } else if (
            (r.callee.type === 'FunctionExpression' &&
              r.callee.body.body.length > 2 &&
              r.callee.body.body[0].type === 'VariableDeclaration' &&
              r.callee.body.body[0].declarations.length === 1 &&
              r.callee.body.body[0].declarations[0].type ===
                'VariableDeclarator' &&
              r.callee.body.body[0].declarations[0].id.type === 'Identifier' &&
              r.callee.body.body[0].declarations[0].init &&
              ((r.callee.body.body[0].declarations[0].init.type ===
                'ObjectExpression' &&
                r.callee.body.body[0].declarations[0].init.properties.length ===
                  0) ||
                (r.callee.body.body[0].declarations[0].init.type ===
                  'CallExpression' &&
                  r.callee.body.body[0].declarations[0].init.arguments
                    .length === 1)) &&
              ((r.callee.body.body[1] &&
                r.callee.body.body[1].type === 'FunctionDeclaration' &&
                r.callee.body.body[1].params.length === 1 &&
                r.callee.body.body[1].body.body.length >= 3) ||
                (r.callee.body.body[2] &&
                  r.callee.body.body[2].type === 'FunctionDeclaration' &&
                  r.callee.body.body[2].params.length === 1 &&
                  r.callee.body.body[2].body.body.length >= 3)) &&
              r.arguments[0] &&
              ((r.arguments[0].type === 'ArrayExpression' &&
                (a = r.arguments[0]) &&
                r.arguments[0].elements.length > 0 &&
                r.arguments[0].elements.every(
                  (e) => e && e.type === 'FunctionExpression'
                )) ||
                (r.arguments[0].type === 'ObjectExpression' &&
                  (a = r.arguments[0]) &&
                  r.arguments[0].properties &&
                  r.arguments[0].properties.length > 0 &&
                  r.arguments[0].properties.every(
                    (e) =>
                      e &&
                      e.type === 'Property' &&
                      !e.computed &&
                      e.key &&
                      e.key.type === 'Literal' &&
                      (typeof e.key.value === 'string' ||
                        typeof e.key.value === 'number') &&
                      e.value &&
                      e.value.type === 'FunctionExpression'
                  )))) ||
            (r.arguments.length === 0 &&
              r.callee.type === 'FunctionExpression' &&
              r.callee.params.length === 0 &&
              r.callee.body.type === 'BlockStatement' &&
              r.callee.body.body.length > 5 &&
              r.callee.body.body[0].type === 'VariableDeclaration' &&
              r.callee.body.body[0].declarations.length === 1 &&
              r.callee.body.body[0].declarations[0].id.type === 'Identifier' &&
              r.callee.body.body[1].type === 'ExpressionStatement' &&
              r.callee.body.body[1].expression.type ===
                'AssignmentExpression' &&
              r.callee.body.body[2].type === 'ExpressionStatement' &&
              r.callee.body.body[2].expression.type ===
                'AssignmentExpression' &&
              r.callee.body.body[3].type === 'ExpressionStatement' &&
              r.callee.body.body[3].expression.type ===
                'AssignmentExpression' &&
              r.callee.body.body[3].expression.left.type ===
                'MemberExpression' &&
              r.callee.body.body[3].expression.left.object.type ===
                'Identifier' &&
              r.callee.body.body[3].expression.left.object.name ===
                r.callee.body.body[0].declarations[0].id.name &&
              r.callee.body.body[3].expression.left.property.type ===
                'Identifier' &&
              r.callee.body.body[3].expression.left.property.name ===
                'modules' &&
              r.callee.body.body[3].expression.right.type ===
                'ObjectExpression' &&
              r.callee.body.body[3].expression.right.properties.every(
                (e) =>
                  e &&
                  e.type === 'Property' &&
                  !e.computed &&
                  e.key &&
                  e.key.type === 'Literal' &&
                  (typeof e.key.value === 'string' ||
                    typeof e.key.value === 'number') &&
                  e.value &&
                  e.value.type === 'FunctionExpression'
              ) &&
              (a = r.callee.body.body[3].expression.right) &&
              ((r.callee.body.body[4].type === 'VariableDeclaration' &&
                r.callee.body.body[4].declarations.length === 1 &&
                r.callee.body.body[4].declarations[0].init &&
                r.callee.body.body[4].declarations[0].init.type ===
                  'CallExpression' &&
                r.callee.body.body[4].declarations[0].init.callee.type ===
                  'Identifier' &&
                r.callee.body.body[4].declarations[0].init.callee.name ===
                  'require') ||
                (r.callee.body.body[5].type === 'VariableDeclaration' &&
                  r.callee.body.body[5].declarations.length === 1 &&
                  r.callee.body.body[5].declarations[0].init &&
                  r.callee.body.body[5].declarations[0].init.type ===
                    'CallExpression' &&
                  r.callee.body.body[5].declarations[0].init.callee.type ===
                    'Identifier' &&
                  r.callee.body.body[5].declarations[0].init.callee.name ===
                    'require')))
          ) {
            const e = new Map()
            let t
            if (a.type === 'ArrayExpression')
              t = a.elements
                .filter(
                  (e) =>
                    (e === null || e === void 0 ? void 0 : e.type) ===
                    'FunctionExpression'
                )
                .map((e, t) => [String(t), e])
            else t = a.properties.map((e) => [String(e.key.value), e.value])
            for (const [r, s] of t) {
              const t =
                s.body.body.length === 1
                  ? s.body.body[0]
                  : (s.body.body.length === 2 ||
                      (s.body.body.length === 3 &&
                        s.body.body[2].type === 'EmptyStatement')) &&
                    s.body.body[0].type === 'ExpressionStatement' &&
                    s.body.body[0].expression.type === 'Literal' &&
                    s.body.body[0].expression.value === 'use strict'
                  ? s.body.body[1]
                  : null
              if (
                t &&
                t.type === 'ExpressionStatement' &&
                t.expression.type === 'AssignmentExpression' &&
                t.expression.operator === '=' &&
                t.expression.left.type === 'MemberExpression' &&
                t.expression.left.object.type === 'Identifier' &&
                'params' in s &&
                s.params.length > 0 &&
                'name' in s.params[0] &&
                t.expression.left.object.name === s.params[0].name &&
                t.expression.left.property.type === 'Identifier' &&
                t.expression.left.property.name === 'exports' &&
                t.expression.right.type === 'CallExpression' &&
                t.expression.right.callee.type === 'Identifier' &&
                t.expression.right.callee.name === 'require' &&
                t.expression.right.arguments.length === 1 &&
                t.expression.right.arguments[0].type === 'Literal'
              ) {
                e.set(r, t.expression.right.arguments[0].value)
              }
            }
            for (const [, r] of t) {
              if (
                'params' in r &&
                r.params.length === 3 &&
                r.params[2].type === 'Identifier'
              ) {
                const t = new Map()
                s.walk(r.body, {
                  enter(s, a) {
                    const o = s
                    const u = a
                    if (
                      o.type === 'CallExpression' &&
                      o.callee.type === 'Identifier' &&
                      'name' in r.params[2] &&
                      o.callee.name === r.params[2].name &&
                      o.arguments.length === 1 &&
                      o.arguments[0].type === 'Literal'
                    ) {
                      const r = e.get(String(o.arguments[0].value))
                      if (r) {
                        const e = {
                          type: 'CallExpression',
                          optional: false,
                          callee: { type: 'Identifier', name: 'require' },
                          arguments: [{ type: 'Literal', value: r }],
                        }
                        const s = u
                        if ('right' in s && s.right === o) {
                          s.right = e
                        } else if ('left' in s && s.left === o) {
                          s.left = e
                        } else if ('object' in s && s.object === o) {
                          s.object = e
                        } else if ('callee' in s && s.callee === o) {
                          s.callee = e
                        } else if (
                          'arguments' in s &&
                          s.arguments.some((e) => e === o)
                        ) {
                          s.arguments = s.arguments.map((t) =>
                            t === o ? e : t
                          )
                        } else if ('init' in s && s.init === o) {
                          if (
                            s.type === 'VariableDeclarator' &&
                            s.id.type === 'Identifier'
                          )
                            t.set(s.id.name, r)
                          s.init = e
                        }
                      }
                    } else if (
                      o.type === 'CallExpression' &&
                      o.callee.type === 'MemberExpression' &&
                      o.callee.object.type === 'Identifier' &&
                      'name' in r.params[2] &&
                      o.callee.object.name === r.params[2].name &&
                      o.callee.property.type === 'Identifier' &&
                      o.callee.property.name === 'n' &&
                      o.arguments.length === 1 &&
                      o.arguments[0].type === 'Identifier'
                    ) {
                      if (u && 'init' in u && u.init === o) {
                        const e = o.arguments[0]
                        const t = {
                          type: 'CallExpression',
                          optional: false,
                          callee: {
                            type: 'MemberExpression',
                            computed: false,
                            optional: false,
                            object: { type: 'Identifier', name: 'Object' },
                            property: { type: 'Identifier', name: 'assign' },
                          },
                          arguments: [
                            {
                              type: 'ArrowFunctionExpression',
                              expression: true,
                              params: [],
                              body: e,
                            },
                            {
                              type: 'ObjectExpression',
                              properties: [
                                {
                                  type: 'Property',
                                  kind: 'init',
                                  method: false,
                                  computed: false,
                                  shorthand: false,
                                  key: { type: 'Identifier', name: 'a' },
                                  value: e,
                                },
                              ],
                            },
                          ],
                        }
                        u.init = t
                      }
                    }
                  },
                })
              }
            }
          }
        }
      }
      t.handleWrappers = handleWrappers
    },
    351: (e, t) => {
      e.exports = t = abbrev.abbrev = abbrev
      abbrev.monkeyPatch = monkeyPatch
      function monkeyPatch() {
        Object.defineProperty(Array.prototype, 'abbrev', {
          value: function () {
            return abbrev(this)
          },
          enumerable: false,
          configurable: true,
          writable: true,
        })
        Object.defineProperty(Object.prototype, 'abbrev', {
          value: function () {
            return abbrev(Object.keys(this))
          },
          enumerable: false,
          configurable: true,
          writable: true,
        })
      }
      function abbrev(e) {
        if (arguments.length !== 1 || !Array.isArray(e)) {
          e = Array.prototype.slice.call(arguments, 0)
        }
        for (var t = 0, r = e.length, s = []; t < r; t++) {
          s[t] = typeof e[t] === 'string' ? e[t] : String(e[t])
        }
        s = s.sort(lexSort)
        var a = {},
          o = ''
        for (var t = 0, r = s.length; t < r; t++) {
          var u = s[t],
            c = s[t + 1] || '',
            f = true,
            p = true
          if (u === c) continue
          for (var h = 0, d = u.length; h < d; h++) {
            var g = u.charAt(h)
            f = f && g === c.charAt(h)
            p = p && g === o.charAt(h)
            if (!f && !p) {
              h++
              break
            }
          }
          o = u
          if (h === d) {
            a[u] = u
            continue
          }
          for (var v = u.substr(0, h); h <= d; h++) {
            a[v] = u
            v += u.charAt(h)
          }
        }
        return a
      }
      function lexSort(e, t) {
        return e === t ? 0 : e > t ? 1 : -1
      }
    },
    8107: function (e, t) {
      ;(function (e, r) {
        true ? r(t) : 0
      })(this, function (e) {
        var t = [
          509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166,
          1, 574, 3, 9, 9, 370, 1, 154, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1,
          11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2,
          49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6,
          3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19,
          13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9,
          243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6,
          4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9,
          57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2,
          4, 9, 9, 330, 3, 19306, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54,
          8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3,
          6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14,
          1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 357, 0, 62, 13, 1495,
          6, 110, 6, 6, 9, 4759, 9, 787719, 239,
        ]
        var r = [
          0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4,
          48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35,
          5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2,
          1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2,
          1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55,
          7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53,
          11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7,
          1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0,
          14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22,
          0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7,
          3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21,
          2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0,
          72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16,
          0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12,
          45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37,
          22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110,
          18, 195, 2637, 96, 16, 1070, 4050, 582, 8634, 568, 8, 30, 18, 78, 18,
          29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65,
          1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 46, 2,
          18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3,
          0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2,
          3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24,
          2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 482, 44, 11, 6, 17, 0,
          322, 29, 19, 43, 1269, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0,
          1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0,
          2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2,
          0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421,
          42719, 33, 4152, 8, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938,
        ]
        var s =
          '‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࢘-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿'
        var a =
          'ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟊꟐꟑꟓꟕ-ꟙꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ'
        var o = {
          3: 'abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile',
          5: 'class enum extends super const export import',
          6: 'enum',
          strict:
            'implements interface let package private protected public static yield',
          strictBind: 'eval arguments',
        }
        var u =
          'break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this'
        var c = {
          5: u,
          '5module': u + ' export import',
          6: u + ' const class extends export import super',
        }
        var f = /^in(stanceof)?$/
        var p = new RegExp('[' + a + ']')
        var h = new RegExp('[' + a + s + ']')
        function isInAstralSet(e, t) {
          var r = 65536
          for (var s = 0; s < t.length; s += 2) {
            r += t[s]
            if (r > e) {
              return false
            }
            r += t[s + 1]
            if (r >= e) {
              return true
            }
          }
        }
        function isIdentifierStart(e, t) {
          if (e < 65) {
            return e === 36
          }
          if (e < 91) {
            return true
          }
          if (e < 97) {
            return e === 95
          }
          if (e < 123) {
            return true
          }
          if (e <= 65535) {
            return e >= 170 && p.test(String.fromCharCode(e))
          }
          if (t === false) {
            return false
          }
          return isInAstralSet(e, r)
        }
        function isIdentifierChar(e, s) {
          if (e < 48) {
            return e === 36
          }
          if (e < 58) {
            return true
          }
          if (e < 65) {
            return false
          }
          if (e < 91) {
            return true
          }
          if (e < 97) {
            return e === 95
          }
          if (e < 123) {
            return true
          }
          if (e <= 65535) {
            return e >= 170 && h.test(String.fromCharCode(e))
          }
          if (s === false) {
            return false
          }
          return isInAstralSet(e, r) || isInAstralSet(e, t)
        }
        var d = function TokenType(e, t) {
          if (t === void 0) t = {}
          this.label = e
          this.keyword = t.keyword
          this.beforeExpr = !!t.beforeExpr
          this.startsExpr = !!t.startsExpr
          this.isLoop = !!t.isLoop
          this.isAssign = !!t.isAssign
          this.prefix = !!t.prefix
          this.postfix = !!t.postfix
          this.binop = t.binop || null
          this.updateContext = null
        }
        function binop(e, t) {
          return new d(e, { beforeExpr: true, binop: t })
        }
        var g = { beforeExpr: true },
          v = { startsExpr: true }
        var m = {}
        function kw(e, t) {
          if (t === void 0) t = {}
          t.keyword = e
          return (m[e] = new d(e, t))
        }
        var y = {
          num: new d('num', v),
          regexp: new d('regexp', v),
          string: new d('string', v),
          name: new d('name', v),
          privateId: new d('privateId', v),
          eof: new d('eof'),
          bracketL: new d('[', { beforeExpr: true, startsExpr: true }),
          bracketR: new d(']'),
          braceL: new d('{', { beforeExpr: true, startsExpr: true }),
          braceR: new d('}'),
          parenL: new d('(', { beforeExpr: true, startsExpr: true }),
          parenR: new d(')'),
          comma: new d(',', g),
          semi: new d(';', g),
          colon: new d(':', g),
          dot: new d('.'),
          question: new d('?', g),
          questionDot: new d('?.'),
          arrow: new d('=>', g),
          template: new d('template'),
          invalidTemplate: new d('invalidTemplate'),
          ellipsis: new d('...', g),
          backQuote: new d('`', v),
          dollarBraceL: new d('${', { beforeExpr: true, startsExpr: true }),
          eq: new d('=', { beforeExpr: true, isAssign: true }),
          assign: new d('_=', { beforeExpr: true, isAssign: true }),
          incDec: new d('++/--', {
            prefix: true,
            postfix: true,
            startsExpr: true,
          }),
          prefix: new d('!/~', {
            beforeExpr: true,
            prefix: true,
            startsExpr: true,
          }),
          logicalOR: binop('||', 1),
          logicalAND: binop('&&', 2),
          bitwiseOR: binop('|', 3),
          bitwiseXOR: binop('^', 4),
          bitwiseAND: binop('&', 5),
          equality: binop('==/!=/===/!==', 6),
          relational: binop('</>/<=/>=', 7),
          bitShift: binop('<</>>/>>>', 8),
          plusMin: new d('+/-', {
            beforeExpr: true,
            binop: 9,
            prefix: true,
            startsExpr: true,
          }),
          modulo: binop('%', 10),
          star: binop('*', 10),
          slash: binop('/', 10),
          starstar: new d('**', { beforeExpr: true }),
          coalesce: binop('??', 1),
          _break: kw('break'),
          _case: kw('case', g),
          _catch: kw('catch'),
          _continue: kw('continue'),
          _debugger: kw('debugger'),
          _default: kw('default', g),
          _do: kw('do', { isLoop: true, beforeExpr: true }),
          _else: kw('else', g),
          _finally: kw('finally'),
          _for: kw('for', { isLoop: true }),
          _function: kw('function', v),
          _if: kw('if'),
          _return: kw('return', g),
          _switch: kw('switch'),
          _throw: kw('throw', g),
          _try: kw('try'),
          _var: kw('var'),
          _const: kw('const'),
          _while: kw('while', { isLoop: true }),
          _with: kw('with'),
          _new: kw('new', { beforeExpr: true, startsExpr: true }),
          _this: kw('this', v),
          _super: kw('super', v),
          _class: kw('class', v),
          _extends: kw('extends', g),
          _export: kw('export'),
          _import: kw('import', v),
          _null: kw('null', v),
          _true: kw('true', v),
          _false: kw('false', v),
          _in: kw('in', { beforeExpr: true, binop: 7 }),
          _instanceof: kw('instanceof', { beforeExpr: true, binop: 7 }),
          _typeof: kw('typeof', {
            beforeExpr: true,
            prefix: true,
            startsExpr: true,
          }),
          _void: kw('void', {
            beforeExpr: true,
            prefix: true,
            startsExpr: true,
          }),
          _delete: kw('delete', {
            beforeExpr: true,
            prefix: true,
            startsExpr: true,
          }),
        }
        var _ = /\r\n?|\n|\u2028|\u2029/
        var D = new RegExp(_.source, 'g')
        function isNewLine(e) {
          return e === 10 || e === 13 || e === 8232 || e === 8233
        }
        function nextLineBreak(e, t, r) {
          if (r === void 0) r = e.length
          for (var s = t; s < r; s++) {
            var a = e.charCodeAt(s)
            if (isNewLine(a)) {
              return s < r - 1 && a === 13 && e.charCodeAt(s + 1) === 10
                ? s + 2
                : s + 1
            }
          }
          return -1
        }
        var x = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/
        var E = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g
        var w = Object.prototype
        var C = w.hasOwnProperty
        var S = w.toString
        var A =
          Object.hasOwn ||
          function (e, t) {
            return C.call(e, t)
          }
        var R =
          Array.isArray ||
          function (e) {
            return S.call(e) === '[object Array]'
          }
        function wordsRegexp(e) {
          return new RegExp('^(?:' + e.replace(/ /g, '|') + ')$')
        }
        function codePointToString(e) {
          if (e <= 65535) {
            return String.fromCharCode(e)
          }
          e -= 65536
          return String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320)
        }
        var k =
          /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/
        var T = function Position(e, t) {
          this.line = e
          this.column = t
        }
        T.prototype.offset = function offset(e) {
          return new T(this.line, this.column + e)
        }
        var F = function SourceLocation(e, t, r) {
          this.start = t
          this.end = r
          if (e.sourceFile !== null) {
            this.source = e.sourceFile
          }
        }
        function getLineInfo(e, t) {
          for (var r = 1, s = 0; ; ) {
            var a = nextLineBreak(e, s, t)
            if (a < 0) {
              return new T(r, t - s)
            }
            ++r
            s = a
          }
        }
        var O = {
          ecmaVersion: null,
          sourceType: 'script',
          onInsertedSemicolon: null,
          onTrailingComma: null,
          allowReserved: null,
          allowReturnOutsideFunction: false,
          allowImportExportEverywhere: false,
          allowAwaitOutsideFunction: null,
          allowSuperOutsideMethod: null,
          allowHashBang: false,
          locations: false,
          onToken: null,
          onComment: null,
          ranges: false,
          program: null,
          sourceFile: null,
          directSourceFile: null,
          preserveParens: false,
        }
        var I = false
        function getOptions(e) {
          var t = {}
          for (var r in O) {
            t[r] = e && A(e, r) ? e[r] : O[r]
          }
          if (t.ecmaVersion === 'latest') {
            t.ecmaVersion = 1e8
          } else if (t.ecmaVersion == null) {
            if (!I && typeof console === 'object' && console.warn) {
              I = true
              console.warn(
                'Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.'
              )
            }
            t.ecmaVersion = 11
          } else if (t.ecmaVersion >= 2015) {
            t.ecmaVersion -= 2009
          }
          if (t.allowReserved == null) {
            t.allowReserved = t.ecmaVersion < 5
          }
          if (e.allowHashBang == null) {
            t.allowHashBang = t.ecmaVersion >= 14
          }
          if (R(t.onToken)) {
            var s = t.onToken
            t.onToken = function (e) {
              return s.push(e)
            }
          }
          if (R(t.onComment)) {
            t.onComment = pushComment(t, t.onComment)
          }
          return t
        }
        function pushComment(e, t) {
          return function (r, s, a, o, u, c) {
            var f = { type: r ? 'Block' : 'Line', value: s, start: a, end: o }
            if (e.locations) {
              f.loc = new F(this, u, c)
            }
            if (e.ranges) {
              f.range = [a, o]
            }
            t.push(f)
          }
        }
        var L = 1,
          N = 2,
          P = 4,
          B = 8,
          j = 16,
          M = 32,
          H = 64,
          $ = 128,
          U = 256,
          W = L | N | U
        function functionFlags(e, t) {
          return N | (e ? P : 0) | (t ? B : 0)
        }
        var V = 0,
          q = 1,
          G = 2,
          K = 3,
          z = 4,
          Q = 5
        var Y = function Parser(e, t, r) {
          this.options = e = getOptions(e)
          this.sourceFile = e.sourceFile
          this.keywords = wordsRegexp(
            c[
              e.ecmaVersion >= 6 ? 6 : e.sourceType === 'module' ? '5module' : 5
            ]
          )
          var s = ''
          if (e.allowReserved !== true) {
            s = o[e.ecmaVersion >= 6 ? 6 : e.ecmaVersion === 5 ? 5 : 3]
            if (e.sourceType === 'module') {
              s += ' await'
            }
          }
          this.reservedWords = wordsRegexp(s)
          var a = (s ? s + ' ' : '') + o.strict
          this.reservedWordsStrict = wordsRegexp(a)
          this.reservedWordsStrictBind = wordsRegexp(a + ' ' + o.strictBind)
          this.input = String(t)
          this.containsEsc = false
          if (r) {
            this.pos = r
            this.lineStart = this.input.lastIndexOf('\n', r - 1) + 1
            this.curLine = this.input.slice(0, this.lineStart).split(_).length
          } else {
            this.pos = this.lineStart = 0
            this.curLine = 1
          }
          this.type = y.eof
          this.value = null
          this.start = this.end = this.pos
          this.startLoc = this.endLoc = this.curPosition()
          this.lastTokEndLoc = this.lastTokStartLoc = null
          this.lastTokStart = this.lastTokEnd = this.pos
          this.context = this.initialContext()
          this.exprAllowed = true
          this.inModule = e.sourceType === 'module'
          this.strict = this.inModule || this.strictDirective(this.pos)
          this.potentialArrowAt = -1
          this.potentialArrowInForAwait = false
          this.yieldPos = this.awaitPos = this.awaitIdentPos = 0
          this.labels = []
          this.undefinedExports = Object.create(null)
          if (
            this.pos === 0 &&
            e.allowHashBang &&
            this.input.slice(0, 2) === '#!'
          ) {
            this.skipLineComment(2)
          }
          this.scopeStack = []
          this.enterScope(L)
          this.regexpState = null
          this.privateNameStack = []
        }
        var X = {
          inFunction: { configurable: true },
          inGenerator: { configurable: true },
          inAsync: { configurable: true },
          canAwait: { configurable: true },
          allowSuper: { configurable: true },
          allowDirectSuper: { configurable: true },
          treatFunctionsAsVar: { configurable: true },
          allowNewDotTarget: { configurable: true },
          inClassStaticBlock: { configurable: true },
        }
        Y.prototype.parse = function parse() {
          var e = this.options.program || this.startNode()
          this.nextToken()
          return this.parseTopLevel(e)
        }
        X.inFunction.get = function () {
          return (this.currentVarScope().flags & N) > 0
        }
        X.inGenerator.get = function () {
          return (
            (this.currentVarScope().flags & B) > 0 &&
            !this.currentVarScope().inClassFieldInit
          )
        }
        X.inAsync.get = function () {
          return (
            (this.currentVarScope().flags & P) > 0 &&
            !this.currentVarScope().inClassFieldInit
          )
        }
        X.canAwait.get = function () {
          for (var e = this.scopeStack.length - 1; e >= 0; e--) {
            var t = this.scopeStack[e]
            if (t.inClassFieldInit || t.flags & U) {
              return false
            }
            if (t.flags & N) {
              return (t.flags & P) > 0
            }
          }
          return (
            (this.inModule && this.options.ecmaVersion >= 13) ||
            this.options.allowAwaitOutsideFunction
          )
        }
        X.allowSuper.get = function () {
          var e = this.currentThisScope()
          var t = e.flags
          var r = e.inClassFieldInit
          return (t & H) > 0 || r || this.options.allowSuperOutsideMethod
        }
        X.allowDirectSuper.get = function () {
          return (this.currentThisScope().flags & $) > 0
        }
        X.treatFunctionsAsVar.get = function () {
          return this.treatFunctionsAsVarInScope(this.currentScope())
        }
        X.allowNewDotTarget.get = function () {
          var e = this.currentThisScope()
          var t = e.flags
          var r = e.inClassFieldInit
          return (t & (N | U)) > 0 || r
        }
        X.inClassStaticBlock.get = function () {
          return (this.currentVarScope().flags & U) > 0
        }
        Y.extend = function extend() {
          var e = [],
            t = arguments.length
          while (t--) e[t] = arguments[t]
          var r = this
          for (var s = 0; s < e.length; s++) {
            r = e[s](r)
          }
          return r
        }
        Y.parse = function parse(e, t) {
          return new this(t, e).parse()
        }
        Y.parseExpressionAt = function parseExpressionAt(e, t, r) {
          var s = new this(r, e, t)
          s.nextToken()
          return s.parseExpression()
        }
        Y.tokenizer = function tokenizer(e, t) {
          return new this(t, e)
        }
        Object.defineProperties(Y.prototype, X)
        var Z = Y.prototype
        var J = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/
        Z.strictDirective = function (e) {
          if (this.options.ecmaVersion < 5) {
            return false
          }
          for (;;) {
            E.lastIndex = e
            e += E.exec(this.input)[0].length
            var t = J.exec(this.input.slice(e))
            if (!t) {
              return false
            }
            if ((t[1] || t[2]) === 'use strict') {
              E.lastIndex = e + t[0].length
              var r = E.exec(this.input),
                s = r.index + r[0].length
              var a = this.input.charAt(s)
              return (
                a === ';' ||
                a === '}' ||
                (_.test(r[0]) &&
                  !(
                    /[(`.[+\-/*%<>=,?^&]/.test(a) ||
                    (a === '!' && this.input.charAt(s + 1) === '=')
                  ))
              )
            }
            e += t[0].length
            E.lastIndex = e
            e += E.exec(this.input)[0].length
            if (this.input[e] === ';') {
              e++
            }
          }
        }
        Z.eat = function (e) {
          if (this.type === e) {
            this.next()
            return true
          } else {
            return false
          }
        }
        Z.isContextual = function (e) {
          return this.type === y.name && this.value === e && !this.containsEsc
        }
        Z.eatContextual = function (e) {
          if (!this.isContextual(e)) {
            return false
          }
          this.next()
          return true
        }
        Z.expectContextual = function (e) {
          if (!this.eatContextual(e)) {
            this.unexpected()
          }
        }
        Z.canInsertSemicolon = function () {
          return (
            this.type === y.eof ||
            this.type === y.braceR ||
            _.test(this.input.slice(this.lastTokEnd, this.start))
          )
        }
        Z.insertSemicolon = function () {
          if (this.canInsertSemicolon()) {
            if (this.options.onInsertedSemicolon) {
              this.options.onInsertedSemicolon(
                this.lastTokEnd,
                this.lastTokEndLoc
              )
            }
            return true
          }
        }
        Z.semicolon = function () {
          if (!this.eat(y.semi) && !this.insertSemicolon()) {
            this.unexpected()
          }
        }
        Z.afterTrailingComma = function (e, t) {
          if (this.type === e) {
            if (this.options.onTrailingComma) {
              this.options.onTrailingComma(
                this.lastTokStart,
                this.lastTokStartLoc
              )
            }
            if (!t) {
              this.next()
            }
            return true
          }
        }
        Z.expect = function (e) {
          this.eat(e) || this.unexpected()
        }
        Z.unexpected = function (e) {
          this.raise(e != null ? e : this.start, 'Unexpected token')
        }
        var ee = function DestructuringErrors() {
          this.shorthandAssign =
            this.trailingComma =
            this.parenthesizedAssign =
            this.parenthesizedBind =
            this.doubleProto =
              -1
        }
        Z.checkPatternErrors = function (e, t) {
          if (!e) {
            return
          }
          if (e.trailingComma > -1) {
            this.raiseRecoverable(
              e.trailingComma,
              'Comma is not permitted after the rest element'
            )
          }
          var r = t ? e.parenthesizedAssign : e.parenthesizedBind
          if (r > -1) {
            this.raiseRecoverable(
              r,
              t ? 'Assigning to rvalue' : 'Parenthesized pattern'
            )
          }
        }
        Z.checkExpressionErrors = function (e, t) {
          if (!e) {
            return false
          }
          var r = e.shorthandAssign
          var s = e.doubleProto
          if (!t) {
            return r >= 0 || s >= 0
          }
          if (r >= 0) {
            this.raise(
              r,
              'Shorthand property assignments are valid only in destructuring patterns'
            )
          }
          if (s >= 0) {
            this.raiseRecoverable(s, 'Redefinition of __proto__ property')
          }
        }
        Z.checkYieldAwaitInDefaultParams = function () {
          if (
            this.yieldPos &&
            (!this.awaitPos || this.yieldPos < this.awaitPos)
          ) {
            this.raise(
              this.yieldPos,
              'Yield expression cannot be a default value'
            )
          }
          if (this.awaitPos) {
            this.raise(
              this.awaitPos,
              'Await expression cannot be a default value'
            )
          }
        }
        Z.isSimpleAssignTarget = function (e) {
          if (e.type === 'ParenthesizedExpression') {
            return this.isSimpleAssignTarget(e.expression)
          }
          return e.type === 'Identifier' || e.type === 'MemberExpression'
        }
        var te = Y.prototype
        te.parseTopLevel = function (e) {
          var t = Object.create(null)
          if (!e.body) {
            e.body = []
          }
          while (this.type !== y.eof) {
            var r = this.parseStatement(null, true, t)
            e.body.push(r)
          }
          if (this.inModule) {
            for (
              var s = 0, a = Object.keys(this.undefinedExports);
              s < a.length;
              s += 1
            ) {
              var o = a[s]
              this.raiseRecoverable(
                this.undefinedExports[o].start,
                "Export '" + o + "' is not defined"
              )
            }
          }
          this.adaptDirectivePrologue(e.body)
          this.next()
          e.sourceType = this.options.sourceType
          return this.finishNode(e, 'Program')
        }
        var re = { kind: 'loop' },
          ie = { kind: 'switch' }
        te.isLet = function (e) {
          if (this.options.ecmaVersion < 6 || !this.isContextual('let')) {
            return false
          }
          E.lastIndex = this.pos
          var t = E.exec(this.input)
          var r = this.pos + t[0].length,
            s = this.input.charCodeAt(r)
          if (s === 91 || s === 92 || (s > 55295 && s < 56320)) {
            return true
          }
          if (e) {
            return false
          }
          if (s === 123) {
            return true
          }
          if (isIdentifierStart(s, true)) {
            var a = r + 1
            while (isIdentifierChar((s = this.input.charCodeAt(a)), true)) {
              ++a
            }
            if (s === 92 || (s > 55295 && s < 56320)) {
              return true
            }
            var o = this.input.slice(r, a)
            if (!f.test(o)) {
              return true
            }
          }
          return false
        }
        te.isAsyncFunction = function () {
          if (this.options.ecmaVersion < 8 || !this.isContextual('async')) {
            return false
          }
          E.lastIndex = this.pos
          var e = E.exec(this.input)
          var t = this.pos + e[0].length,
            r
          return (
            !_.test(this.input.slice(this.pos, t)) &&
            this.input.slice(t, t + 8) === 'function' &&
            (t + 8 === this.input.length ||
              !(
                isIdentifierChar((r = this.input.charCodeAt(t + 8))) ||
                (r > 55295 && r < 56320)
              ))
          )
        }
        te.parseStatement = function (e, t, r) {
          var s = this.type,
            a = this.startNode(),
            o
          if (this.isLet(e)) {
            s = y._var
            o = 'let'
          }
          switch (s) {
            case y._break:
            case y._continue:
              return this.parseBreakContinueStatement(a, s.keyword)
            case y._debugger:
              return this.parseDebuggerStatement(a)
            case y._do:
              return this.parseDoStatement(a)
            case y._for:
              return this.parseForStatement(a)
            case y._function:
              if (
                e &&
                (this.strict || (e !== 'if' && e !== 'label')) &&
                this.options.ecmaVersion >= 6
              ) {
                this.unexpected()
              }
              return this.parseFunctionStatement(a, false, !e)
            case y._class:
              if (e) {
                this.unexpected()
              }
              return this.parseClass(a, true)
            case y._if:
              return this.parseIfStatement(a)
            case y._return:
              return this.parseReturnStatement(a)
            case y._switch:
              return this.parseSwitchStatement(a)
            case y._throw:
              return this.parseThrowStatement(a)
            case y._try:
              return this.parseTryStatement(a)
            case y._const:
            case y._var:
              o = o || this.value
              if (e && o !== 'var') {
                this.unexpected()
              }
              return this.parseVarStatement(a, o)
            case y._while:
              return this.parseWhileStatement(a)
            case y._with:
              return this.parseWithStatement(a)
            case y.braceL:
              return this.parseBlock(true, a)
            case y.semi:
              return this.parseEmptyStatement(a)
            case y._export:
            case y._import:
              if (this.options.ecmaVersion > 10 && s === y._import) {
                E.lastIndex = this.pos
                var u = E.exec(this.input)
                var c = this.pos + u[0].length,
                  f = this.input.charCodeAt(c)
                if (f === 40 || f === 46) {
                  return this.parseExpressionStatement(
                    a,
                    this.parseExpression()
                  )
                }
              }
              if (!this.options.allowImportExportEverywhere) {
                if (!t) {
                  this.raise(
                    this.start,
                    "'import' and 'export' may only appear at the top level"
                  )
                }
                if (!this.inModule) {
                  this.raise(
                    this.start,
                    "'import' and 'export' may appear only with 'sourceType: module'"
                  )
                }
              }
              return s === y._import
                ? this.parseImport(a)
                : this.parseExport(a, r)
            default:
              if (this.isAsyncFunction()) {
                if (e) {
                  this.unexpected()
                }
                this.next()
                return this.parseFunctionStatement(a, true, !e)
              }
              var p = this.value,
                h = this.parseExpression()
              if (
                s === y.name &&
                h.type === 'Identifier' &&
                this.eat(y.colon)
              ) {
                return this.parseLabeledStatement(a, p, h, e)
              } else {
                return this.parseExpressionStatement(a, h)
              }
          }
        }
        te.parseBreakContinueStatement = function (e, t) {
          var r = t === 'break'
          this.next()
          if (this.eat(y.semi) || this.insertSemicolon()) {
            e.label = null
          } else if (this.type !== y.name) {
            this.unexpected()
          } else {
            e.label = this.parseIdent()
            this.semicolon()
          }
          var s = 0
          for (; s < this.labels.length; ++s) {
            var a = this.labels[s]
            if (e.label == null || a.name === e.label.name) {
              if (a.kind != null && (r || a.kind === 'loop')) {
                break
              }
              if (e.label && r) {
                break
              }
            }
          }
          if (s === this.labels.length) {
            this.raise(e.start, 'Unsyntactic ' + t)
          }
          return this.finishNode(e, r ? 'BreakStatement' : 'ContinueStatement')
        }
        te.parseDebuggerStatement = function (e) {
          this.next()
          this.semicolon()
          return this.finishNode(e, 'DebuggerStatement')
        }
        te.parseDoStatement = function (e) {
          this.next()
          this.labels.push(re)
          e.body = this.parseStatement('do')
          this.labels.pop()
          this.expect(y._while)
          e.test = this.parseParenExpression()
          if (this.options.ecmaVersion >= 6) {
            this.eat(y.semi)
          } else {
            this.semicolon()
          }
          return this.finishNode(e, 'DoWhileStatement')
        }
        te.parseForStatement = function (e) {
          this.next()
          var t =
            this.options.ecmaVersion >= 9 &&
            this.canAwait &&
            this.eatContextual('await')
              ? this.lastTokStart
              : -1
          this.labels.push(re)
          this.enterScope(0)
          this.expect(y.parenL)
          if (this.type === y.semi) {
            if (t > -1) {
              this.unexpected(t)
            }
            return this.parseFor(e, null)
          }
          var r = this.isLet()
          if (this.type === y._var || this.type === y._const || r) {
            var s = this.startNode(),
              a = r ? 'let' : this.value
            this.next()
            this.parseVar(s, true, a)
            this.finishNode(s, 'VariableDeclaration')
            if (
              (this.type === y._in ||
                (this.options.ecmaVersion >= 6 && this.isContextual('of'))) &&
              s.declarations.length === 1
            ) {
              if (this.options.ecmaVersion >= 9) {
                if (this.type === y._in) {
                  if (t > -1) {
                    this.unexpected(t)
                  }
                } else {
                  e.await = t > -1
                }
              }
              return this.parseForIn(e, s)
            }
            if (t > -1) {
              this.unexpected(t)
            }
            return this.parseFor(e, s)
          }
          var o = this.isContextual('let'),
            u = false
          var c = new ee()
          var f = this.parseExpression(t > -1 ? 'await' : true, c)
          if (
            this.type === y._in ||
            (u = this.options.ecmaVersion >= 6 && this.isContextual('of'))
          ) {
            if (this.options.ecmaVersion >= 9) {
              if (this.type === y._in) {
                if (t > -1) {
                  this.unexpected(t)
                }
              } else {
                e.await = t > -1
              }
            }
            if (o && u) {
              this.raise(
                f.start,
                "The left-hand side of a for-of loop may not start with 'let'."
              )
            }
            this.toAssignable(f, false, c)
            this.checkLValPattern(f)
            return this.parseForIn(e, f)
          } else {
            this.checkExpressionErrors(c, true)
          }
          if (t > -1) {
            this.unexpected(t)
          }
          return this.parseFor(e, f)
        }
        te.parseFunctionStatement = function (e, t, r) {
          this.next()
          return this.parseFunction(e, se | (r ? 0 : ae), false, t)
        }
        te.parseIfStatement = function (e) {
          this.next()
          e.test = this.parseParenExpression()
          e.consequent = this.parseStatement('if')
          e.alternate = this.eat(y._else) ? this.parseStatement('if') : null
          return this.finishNode(e, 'IfStatement')
        }
        te.parseReturnStatement = function (e) {
          if (!this.inFunction && !this.options.allowReturnOutsideFunction) {
            this.raise(this.start, "'return' outside of function")
          }
          this.next()
          if (this.eat(y.semi) || this.insertSemicolon()) {
            e.argument = null
          } else {
            e.argument = this.parseExpression()
            this.semicolon()
          }
          return this.finishNode(e, 'ReturnStatement')
        }
        te.parseSwitchStatement = function (e) {
          this.next()
          e.discriminant = this.parseParenExpression()
          e.cases = []
          this.expect(y.braceL)
          this.labels.push(ie)
          this.enterScope(0)
          var t
          for (var r = false; this.type !== y.braceR; ) {
            if (this.type === y._case || this.type === y._default) {
              var s = this.type === y._case
              if (t) {
                this.finishNode(t, 'SwitchCase')
              }
              e.cases.push((t = this.startNode()))
              t.consequent = []
              this.next()
              if (s) {
                t.test = this.parseExpression()
              } else {
                if (r) {
                  this.raiseRecoverable(
                    this.lastTokStart,
                    'Multiple default clauses'
                  )
                }
                r = true
                t.test = null
              }
              this.expect(y.colon)
            } else {
              if (!t) {
                this.unexpected()
              }
              t.consequent.push(this.parseStatement(null))
            }
          }
          this.exitScope()
          if (t) {
            this.finishNode(t, 'SwitchCase')
          }
          this.next()
          this.labels.pop()
          return this.finishNode(e, 'SwitchStatement')
        }
        te.parseThrowStatement = function (e) {
          this.next()
          if (_.test(this.input.slice(this.lastTokEnd, this.start))) {
            this.raise(this.lastTokEnd, 'Illegal newline after throw')
          }
          e.argument = this.parseExpression()
          this.semicolon()
          return this.finishNode(e, 'ThrowStatement')
        }
        var ne = []
        te.parseTryStatement = function (e) {
          this.next()
          e.block = this.parseBlock()
          e.handler = null
          if (this.type === y._catch) {
            var t = this.startNode()
            this.next()
            if (this.eat(y.parenL)) {
              t.param = this.parseBindingAtom()
              var r = t.param.type === 'Identifier'
              this.enterScope(r ? M : 0)
              this.checkLValPattern(t.param, r ? z : G)
              this.expect(y.parenR)
            } else {
              if (this.options.ecmaVersion < 10) {
                this.unexpected()
              }
              t.param = null
              this.enterScope(0)
            }
            t.body = this.parseBlock(false)
            this.exitScope()
            e.handler = this.finishNode(t, 'CatchClause')
          }
          e.finalizer = this.eat(y._finally) ? this.parseBlock() : null
          if (!e.handler && !e.finalizer) {
            this.raise(e.start, 'Missing catch or finally clause')
          }
          return this.finishNode(e, 'TryStatement')
        }
        te.parseVarStatement = function (e, t) {
          this.next()
          this.parseVar(e, false, t)
          this.semicolon()
          return this.finishNode(e, 'VariableDeclaration')
        }
        te.parseWhileStatement = function (e) {
          this.next()
          e.test = this.parseParenExpression()
          this.labels.push(re)
          e.body = this.parseStatement('while')
          this.labels.pop()
          return this.finishNode(e, 'WhileStatement')
        }
        te.parseWithStatement = function (e) {
          if (this.strict) {
            this.raise(this.start, "'with' in strict mode")
          }
          this.next()
          e.object = this.parseParenExpression()
          e.body = this.parseStatement('with')
          return this.finishNode(e, 'WithStatement')
        }
        te.parseEmptyStatement = function (e) {
          this.next()
          return this.finishNode(e, 'EmptyStatement')
        }
        te.parseLabeledStatement = function (e, t, r, s) {
          for (var a = 0, o = this.labels; a < o.length; a += 1) {
            var u = o[a]
            if (u.name === t) {
              this.raise(r.start, "Label '" + t + "' is already declared")
            }
          }
          var c = this.type.isLoop
            ? 'loop'
            : this.type === y._switch
            ? 'switch'
            : null
          for (var f = this.labels.length - 1; f >= 0; f--) {
            var p = this.labels[f]
            if (p.statementStart === e.start) {
              p.statementStart = this.start
              p.kind = c
            } else {
              break
            }
          }
          this.labels.push({ name: t, kind: c, statementStart: this.start })
          e.body = this.parseStatement(
            s ? (s.indexOf('label') === -1 ? s + 'label' : s) : 'label'
          )
          this.labels.pop()
          e.label = r
          return this.finishNode(e, 'LabeledStatement')
        }
        te.parseExpressionStatement = function (e, t) {
          e.expression = t
          this.semicolon()
          return this.finishNode(e, 'ExpressionStatement')
        }
        te.parseBlock = function (e, t, r) {
          if (e === void 0) e = true
          if (t === void 0) t = this.startNode()
          t.body = []
          this.expect(y.braceL)
          if (e) {
            this.enterScope(0)
          }
          while (this.type !== y.braceR) {
            var s = this.parseStatement(null)
            t.body.push(s)
          }
          if (r) {
            this.strict = false
          }
          this.next()
          if (e) {
            this.exitScope()
          }
          return this.finishNode(t, 'BlockStatement')
        }
        te.parseFor = function (e, t) {
          e.init = t
          this.expect(y.semi)
          e.test = this.type === y.semi ? null : this.parseExpression()
          this.expect(y.semi)
          e.update = this.type === y.parenR ? null : this.parseExpression()
          this.expect(y.parenR)
          e.body = this.parseStatement('for')
          this.exitScope()
          this.labels.pop()
          return this.finishNode(e, 'ForStatement')
        }
        te.parseForIn = function (e, t) {
          var r = this.type === y._in
          this.next()
          if (
            t.type === 'VariableDeclaration' &&
            t.declarations[0].init != null &&
            (!r ||
              this.options.ecmaVersion < 8 ||
              this.strict ||
              t.kind !== 'var' ||
              t.declarations[0].id.type !== 'Identifier')
          ) {
            this.raise(
              t.start,
              (r ? 'for-in' : 'for-of') +
                ' loop variable declaration may not have an initializer'
            )
          }
          e.left = t
          e.right = r ? this.parseExpression() : this.parseMaybeAssign()
          this.expect(y.parenR)
          e.body = this.parseStatement('for')
          this.exitScope()
          this.labels.pop()
          return this.finishNode(e, r ? 'ForInStatement' : 'ForOfStatement')
        }
        te.parseVar = function (e, t, r) {
          e.declarations = []
          e.kind = r
          for (;;) {
            var s = this.startNode()
            this.parseVarId(s, r)
            if (this.eat(y.eq)) {
              s.init = this.parseMaybeAssign(t)
            } else if (
              r === 'const' &&
              !(
                this.type === y._in ||
                (this.options.ecmaVersion >= 6 && this.isContextual('of'))
              )
            ) {
              this.unexpected()
            } else if (
              s.id.type !== 'Identifier' &&
              !(t && (this.type === y._in || this.isContextual('of')))
            ) {
              this.raise(
                this.lastTokEnd,
                'Complex binding patterns require an initialization value'
              )
            } else {
              s.init = null
            }
            e.declarations.push(this.finishNode(s, 'VariableDeclarator'))
            if (!this.eat(y.comma)) {
              break
            }
          }
          return e
        }
        te.parseVarId = function (e, t) {
          e.id = this.parseBindingAtom()
          this.checkLValPattern(e.id, t === 'var' ? q : G, false)
        }
        var se = 1,
          ae = 2,
          oe = 4
        te.parseFunction = function (e, t, r, s, a) {
          this.initFunction(e)
          if (
            this.options.ecmaVersion >= 9 ||
            (this.options.ecmaVersion >= 6 && !s)
          ) {
            if (this.type === y.star && t & ae) {
              this.unexpected()
            }
            e.generator = this.eat(y.star)
          }
          if (this.options.ecmaVersion >= 8) {
            e.async = !!s
          }
          if (t & se) {
            e.id = t & oe && this.type !== y.name ? null : this.parseIdent()
            if (e.id && !(t & ae)) {
              this.checkLValSimple(
                e.id,
                this.strict || e.generator || e.async
                  ? this.treatFunctionsAsVar
                    ? q
                    : G
                  : K
              )
            }
          }
          var o = this.yieldPos,
            u = this.awaitPos,
            c = this.awaitIdentPos
          this.yieldPos = 0
          this.awaitPos = 0
          this.awaitIdentPos = 0
          this.enterScope(functionFlags(e.async, e.generator))
          if (!(t & se)) {
            e.id = this.type === y.name ? this.parseIdent() : null
          }
          this.parseFunctionParams(e)
          this.parseFunctionBody(e, r, false, a)
          this.yieldPos = o
          this.awaitPos = u
          this.awaitIdentPos = c
          return this.finishNode(
            e,
            t & se ? 'FunctionDeclaration' : 'FunctionExpression'
          )
        }
        te.parseFunctionParams = function (e) {
          this.expect(y.parenL)
          e.params = this.parseBindingList(
            y.parenR,
            false,
            this.options.ecmaVersion >= 8
          )
          this.checkYieldAwaitInDefaultParams()
        }
        te.parseClass = function (e, t) {
          this.next()
          var r = this.strict
          this.strict = true
          this.parseClassId(e, t)
          this.parseClassSuper(e)
          var s = this.enterClassBody()
          var a = this.startNode()
          var o = false
          a.body = []
          this.expect(y.braceL)
          while (this.type !== y.braceR) {
            var u = this.parseClassElement(e.superClass !== null)
            if (u) {
              a.body.push(u)
              if (u.type === 'MethodDefinition' && u.kind === 'constructor') {
                if (o) {
                  this.raise(u.start, 'Duplicate constructor in the same class')
                }
                o = true
              } else if (
                u.key &&
                u.key.type === 'PrivateIdentifier' &&
                isPrivateNameConflicted(s, u)
              ) {
                this.raiseRecoverable(
                  u.key.start,
                  "Identifier '#" + u.key.name + "' has already been declared"
                )
              }
            }
          }
          this.strict = r
          this.next()
          e.body = this.finishNode(a, 'ClassBody')
          this.exitClassBody()
          return this.finishNode(e, t ? 'ClassDeclaration' : 'ClassExpression')
        }
        te.parseClassElement = function (e) {
          if (this.eat(y.semi)) {
            return null
          }
          var t = this.options.ecmaVersion
          var r = this.startNode()
          var s = ''
          var a = false
          var o = false
          var u = 'method'
          var c = false
          if (this.eatContextual('static')) {
            if (t >= 13 && this.eat(y.braceL)) {
              this.parseClassStaticBlock(r)
              return r
            }
            if (this.isClassElementNameStart() || this.type === y.star) {
              c = true
            } else {
              s = 'static'
            }
          }
          r.static = c
          if (!s && t >= 8 && this.eatContextual('async')) {
            if (
              (this.isClassElementNameStart() || this.type === y.star) &&
              !this.canInsertSemicolon()
            ) {
              o = true
            } else {
              s = 'async'
            }
          }
          if (!s && (t >= 9 || !o) && this.eat(y.star)) {
            a = true
          }
          if (!s && !o && !a) {
            var f = this.value
            if (this.eatContextual('get') || this.eatContextual('set')) {
              if (this.isClassElementNameStart()) {
                u = f
              } else {
                s = f
              }
            }
          }
          if (s) {
            r.computed = false
            r.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc)
            r.key.name = s
            this.finishNode(r.key, 'Identifier')
          } else {
            this.parseClassElementName(r)
          }
          if (t < 13 || this.type === y.parenL || u !== 'method' || a || o) {
            var p = !r.static && checkKeyName(r, 'constructor')
            var h = p && e
            if (p && u !== 'method') {
              this.raise(r.key.start, "Constructor can't have get/set modifier")
            }
            r.kind = p ? 'constructor' : u
            this.parseClassMethod(r, a, o, h)
          } else {
            this.parseClassField(r)
          }
          return r
        }
        te.isClassElementNameStart = function () {
          return (
            this.type === y.name ||
            this.type === y.privateId ||
            this.type === y.num ||
            this.type === y.string ||
            this.type === y.bracketL ||
            this.type.keyword
          )
        }
        te.parseClassElementName = function (e) {
          if (this.type === y.privateId) {
            if (this.value === 'constructor') {
              this.raise(
                this.start,
                "Classes can't have an element named '#constructor'"
              )
            }
            e.computed = false
            e.key = this.parsePrivateIdent()
          } else {
            this.parsePropertyName(e)
          }
        }
        te.parseClassMethod = function (e, t, r, s) {
          var a = e.key
          if (e.kind === 'constructor') {
            if (t) {
              this.raise(a.start, "Constructor can't be a generator")
            }
            if (r) {
              this.raise(a.start, "Constructor can't be an async method")
            }
          } else if (e.static && checkKeyName(e, 'prototype')) {
            this.raise(
              a.start,
              'Classes may not have a static property named prototype'
            )
          }
          var o = (e.value = this.parseMethod(t, r, s))
          if (e.kind === 'get' && o.params.length !== 0) {
            this.raiseRecoverable(o.start, 'getter should have no params')
          }
          if (e.kind === 'set' && o.params.length !== 1) {
            this.raiseRecoverable(
              o.start,
              'setter should have exactly one param'
            )
          }
          if (e.kind === 'set' && o.params[0].type === 'RestElement') {
            this.raiseRecoverable(
              o.params[0].start,
              'Setter cannot use rest params'
            )
          }
          return this.finishNode(e, 'MethodDefinition')
        }
        te.parseClassField = function (e) {
          if (checkKeyName(e, 'constructor')) {
            this.raise(
              e.key.start,
              "Classes can't have a field named 'constructor'"
            )
          } else if (e.static && checkKeyName(e, 'prototype')) {
            this.raise(
              e.key.start,
              "Classes can't have a static field named 'prototype'"
            )
          }
          if (this.eat(y.eq)) {
            var t = this.currentThisScope()
            var r = t.inClassFieldInit
            t.inClassFieldInit = true
            e.value = this.parseMaybeAssign()
            t.inClassFieldInit = r
          } else {
            e.value = null
          }
          this.semicolon()
          return this.finishNode(e, 'PropertyDefinition')
        }
        te.parseClassStaticBlock = function (e) {
          e.body = []
          var t = this.labels
          this.labels = []
          this.enterScope(U | H)
          while (this.type !== y.braceR) {
            var r = this.parseStatement(null)
            e.body.push(r)
          }
          this.next()
          this.exitScope()
          this.labels = t
          return this.finishNode(e, 'StaticBlock')
        }
        te.parseClassId = function (e, t) {
          if (this.type === y.name) {
            e.id = this.parseIdent()
            if (t) {
              this.checkLValSimple(e.id, G, false)
            }
          } else {
            if (t === true) {
              this.unexpected()
            }
            e.id = null
          }
        }
        te.parseClassSuper = function (e) {
          e.superClass = this.eat(y._extends)
            ? this.parseExprSubscripts(false)
            : null
        }
        te.enterClassBody = function () {
          var e = { declared: Object.create(null), used: [] }
          this.privateNameStack.push(e)
          return e.declared
        }
        te.exitClassBody = function () {
          var e = this.privateNameStack.pop()
          var t = e.declared
          var r = e.used
          var s = this.privateNameStack.length
          var a = s === 0 ? null : this.privateNameStack[s - 1]
          for (var o = 0; o < r.length; ++o) {
            var u = r[o]
            if (!A(t, u.name)) {
              if (a) {
                a.used.push(u)
              } else {
                this.raiseRecoverable(
                  u.start,
                  "Private field '#" +
                    u.name +
                    "' must be declared in an enclosing class"
                )
              }
            }
          }
        }
        function isPrivateNameConflicted(e, t) {
          var r = t.key.name
          var s = e[r]
          var a = 'true'
          if (
            t.type === 'MethodDefinition' &&
            (t.kind === 'get' || t.kind === 'set')
          ) {
            a = (t.static ? 's' : 'i') + t.kind
          }
          if (
            (s === 'iget' && a === 'iset') ||
            (s === 'iset' && a === 'iget') ||
            (s === 'sget' && a === 'sset') ||
            (s === 'sset' && a === 'sget')
          ) {
            e[r] = 'true'
            return false
          } else if (!s) {
            e[r] = a
            return false
          } else {
            return true
          }
        }
        function checkKeyName(e, t) {
          var r = e.computed
          var s = e.key
          return (
            !r &&
            ((s.type === 'Identifier' && s.name === t) ||
              (s.type === 'Literal' && s.value === t))
          )
        }
        te.parseExport = function (e, t) {
          this.next()
          if (this.eat(y.star)) {
            if (this.options.ecmaVersion >= 11) {
              if (this.eatContextual('as')) {
                e.exported = this.parseModuleExportName()
                this.checkExport(t, e.exported, this.lastTokStart)
              } else {
                e.exported = null
              }
            }
            this.expectContextual('from')
            if (this.type !== y.string) {
              this.unexpected()
            }
            e.source = this.parseExprAtom()
            this.semicolon()
            return this.finishNode(e, 'ExportAllDeclaration')
          }
          if (this.eat(y._default)) {
            this.checkExport(t, 'default', this.lastTokStart)
            var r
            if (this.type === y._function || (r = this.isAsyncFunction())) {
              var s = this.startNode()
              this.next()
              if (r) {
                this.next()
              }
              e.declaration = this.parseFunction(s, se | oe, false, r)
            } else if (this.type === y._class) {
              var a = this.startNode()
              e.declaration = this.parseClass(a, 'nullableID')
            } else {
              e.declaration = this.parseMaybeAssign()
              this.semicolon()
            }
            return this.finishNode(e, 'ExportDefaultDeclaration')
          }
          if (this.shouldParseExportStatement()) {
            e.declaration = this.parseStatement(null)
            if (e.declaration.type === 'VariableDeclaration') {
              this.checkVariableExport(t, e.declaration.declarations)
            } else {
              this.checkExport(t, e.declaration.id, e.declaration.id.start)
            }
            e.specifiers = []
            e.source = null
          } else {
            e.declaration = null
            e.specifiers = this.parseExportSpecifiers(t)
            if (this.eatContextual('from')) {
              if (this.type !== y.string) {
                this.unexpected()
              }
              e.source = this.parseExprAtom()
            } else {
              for (var o = 0, u = e.specifiers; o < u.length; o += 1) {
                var c = u[o]
                this.checkUnreserved(c.local)
                this.checkLocalExport(c.local)
                if (c.local.type === 'Literal') {
                  this.raise(
                    c.local.start,
                    'A string literal cannot be used as an exported binding without `from`.'
                  )
                }
              }
              e.source = null
            }
            this.semicolon()
          }
          return this.finishNode(e, 'ExportNamedDeclaration')
        }
        te.checkExport = function (e, t, r) {
          if (!e) {
            return
          }
          if (typeof t !== 'string') {
            t = t.type === 'Identifier' ? t.name : t.value
          }
          if (A(e, t)) {
            this.raiseRecoverable(r, "Duplicate export '" + t + "'")
          }
          e[t] = true
        }
        te.checkPatternExport = function (e, t) {
          var r = t.type
          if (r === 'Identifier') {
            this.checkExport(e, t, t.start)
          } else if (r === 'ObjectPattern') {
            for (var s = 0, a = t.properties; s < a.length; s += 1) {
              var o = a[s]
              this.checkPatternExport(e, o)
            }
          } else if (r === 'ArrayPattern') {
            for (var u = 0, c = t.elements; u < c.length; u += 1) {
              var f = c[u]
              if (f) {
                this.checkPatternExport(e, f)
              }
            }
          } else if (r === 'Property') {
            this.checkPatternExport(e, t.value)
          } else if (r === 'AssignmentPattern') {
            this.checkPatternExport(e, t.left)
          } else if (r === 'RestElement') {
            this.checkPatternExport(e, t.argument)
          } else if (r === 'ParenthesizedExpression') {
            this.checkPatternExport(e, t.expression)
          }
        }
        te.checkVariableExport = function (e, t) {
          if (!e) {
            return
          }
          for (var r = 0, s = t; r < s.length; r += 1) {
            var a = s[r]
            this.checkPatternExport(e, a.id)
          }
        }
        te.shouldParseExportStatement = function () {
          return (
            this.type.keyword === 'var' ||
            this.type.keyword === 'const' ||
            this.type.keyword === 'class' ||
            this.type.keyword === 'function' ||
            this.isLet() ||
            this.isAsyncFunction()
          )
        }
        te.parseExportSpecifiers = function (e) {
          var t = [],
            r = true
          this.expect(y.braceL)
          while (!this.eat(y.braceR)) {
            if (!r) {
              this.expect(y.comma)
              if (this.afterTrailingComma(y.braceR)) {
                break
              }
            } else {
              r = false
            }
            var s = this.startNode()
            s.local = this.parseModuleExportName()
            s.exported = this.eatContextual('as')
              ? this.parseModuleExportName()
              : s.local
            this.checkExport(e, s.exported, s.exported.start)
            t.push(this.finishNode(s, 'ExportSpecifier'))
          }
          return t
        }
        te.parseImport = function (e) {
          this.next()
          if (this.type === y.string) {
            e.specifiers = ne
            e.source = this.parseExprAtom()
          } else {
            e.specifiers = this.parseImportSpecifiers()
            this.expectContextual('from')
            e.source =
              this.type === y.string ? this.parseExprAtom() : this.unexpected()
          }
          this.semicolon()
          return this.finishNode(e, 'ImportDeclaration')
        }
        te.parseImportSpecifiers = function () {
          var e = [],
            t = true
          if (this.type === y.name) {
            var r = this.startNode()
            r.local = this.parseIdent()
            this.checkLValSimple(r.local, G)
            e.push(this.finishNode(r, 'ImportDefaultSpecifier'))
            if (!this.eat(y.comma)) {
              return e
            }
          }
          if (this.type === y.star) {
            var s = this.startNode()
            this.next()
            this.expectContextual('as')
            s.local = this.parseIdent()
            this.checkLValSimple(s.local, G)
            e.push(this.finishNode(s, 'ImportNamespaceSpecifier'))
            return e
          }
          this.expect(y.braceL)
          while (!this.eat(y.braceR)) {
            if (!t) {
              this.expect(y.comma)
              if (this.afterTrailingComma(y.braceR)) {
                break
              }
            } else {
              t = false
            }
            var a = this.startNode()
            a.imported = this.parseModuleExportName()
            if (this.eatContextual('as')) {
              a.local = this.parseIdent()
            } else {
              this.checkUnreserved(a.imported)
              a.local = a.imported
            }
            this.checkLValSimple(a.local, G)
            e.push(this.finishNode(a, 'ImportSpecifier'))
          }
          return e
        }
        te.parseModuleExportName = function () {
          if (this.options.ecmaVersion >= 13 && this.type === y.string) {
            var e = this.parseLiteral(this.value)
            if (k.test(e.value)) {
              this.raise(
                e.start,
                'An export name cannot include a lone surrogate.'
              )
            }
            return e
          }
          return this.parseIdent(true)
        }
        te.adaptDirectivePrologue = function (e) {
          for (
            var t = 0;
            t < e.length && this.isDirectiveCandidate(e[t]);
            ++t
          ) {
            e[t].directive = e[t].expression.raw.slice(1, -1)
          }
        }
        te.isDirectiveCandidate = function (e) {
          return (
            this.options.ecmaVersion >= 5 &&
            e.type === 'ExpressionStatement' &&
            e.expression.type === 'Literal' &&
            typeof e.expression.value === 'string' &&
            (this.input[e.start] === '"' || this.input[e.start] === "'")
          )
        }
        var ue = Y.prototype
        ue.toAssignable = function (e, t, r) {
          if (this.options.ecmaVersion >= 6 && e) {
            switch (e.type) {
              case 'Identifier':
                if (this.inAsync && e.name === 'await') {
                  this.raise(
                    e.start,
                    "Cannot use 'await' as identifier inside an async function"
                  )
                }
                break
              case 'ObjectPattern':
              case 'ArrayPattern':
              case 'AssignmentPattern':
              case 'RestElement':
                break
              case 'ObjectExpression':
                e.type = 'ObjectPattern'
                if (r) {
                  this.checkPatternErrors(r, true)
                }
                for (var s = 0, a = e.properties; s < a.length; s += 1) {
                  var o = a[s]
                  this.toAssignable(o, t)
                  if (
                    o.type === 'RestElement' &&
                    (o.argument.type === 'ArrayPattern' ||
                      o.argument.type === 'ObjectPattern')
                  ) {
                    this.raise(o.argument.start, 'Unexpected token')
                  }
                }
                break
              case 'Property':
                if (e.kind !== 'init') {
                  this.raise(
                    e.key.start,
                    "Object pattern can't contain getter or setter"
                  )
                }
                this.toAssignable(e.value, t)
                break
              case 'ArrayExpression':
                e.type = 'ArrayPattern'
                if (r) {
                  this.checkPatternErrors(r, true)
                }
                this.toAssignableList(e.elements, t)
                break
              case 'SpreadElement':
                e.type = 'RestElement'
                this.toAssignable(e.argument, t)
                if (e.argument.type === 'AssignmentPattern') {
                  this.raise(
                    e.argument.start,
                    'Rest elements cannot have a default value'
                  )
                }
                break
              case 'AssignmentExpression':
                if (e.operator !== '=') {
                  this.raise(
                    e.left.end,
                    "Only '=' operator can be used for specifying default value."
                  )
                }
                e.type = 'AssignmentPattern'
                delete e.operator
                this.toAssignable(e.left, t)
                break
              case 'ParenthesizedExpression':
                this.toAssignable(e.expression, t, r)
                break
              case 'ChainExpression':
                this.raiseRecoverable(
                  e.start,
                  'Optional chaining cannot appear in left-hand side'
                )
                break
              case 'MemberExpression':
                if (!t) {
                  break
                }
              default:
                this.raise(e.start, 'Assigning to rvalue')
            }
          } else if (r) {
            this.checkPatternErrors(r, true)
          }
          return e
        }
        ue.toAssignableList = function (e, t) {
          var r = e.length
          for (var s = 0; s < r; s++) {
            var a = e[s]
            if (a) {
              this.toAssignable(a, t)
            }
          }
          if (r) {
            var o = e[r - 1]
            if (
              this.options.ecmaVersion === 6 &&
              t &&
              o &&
              o.type === 'RestElement' &&
              o.argument.type !== 'Identifier'
            ) {
              this.unexpected(o.argument.start)
            }
          }
          return e
        }
        ue.parseSpread = function (e) {
          var t = this.startNode()
          this.next()
          t.argument = this.parseMaybeAssign(false, e)
          return this.finishNode(t, 'SpreadElement')
        }
        ue.parseRestBinding = function () {
          var e = this.startNode()
          this.next()
          if (this.options.ecmaVersion === 6 && this.type !== y.name) {
            this.unexpected()
          }
          e.argument = this.parseBindingAtom()
          return this.finishNode(e, 'RestElement')
        }
        ue.parseBindingAtom = function () {
          if (this.options.ecmaVersion >= 6) {
            switch (this.type) {
              case y.bracketL:
                var e = this.startNode()
                this.next()
                e.elements = this.parseBindingList(y.bracketR, true, true)
                return this.finishNode(e, 'ArrayPattern')
              case y.braceL:
                return this.parseObj(true)
            }
          }
          return this.parseIdent()
        }
        ue.parseBindingList = function (e, t, r) {
          var s = [],
            a = true
          while (!this.eat(e)) {
            if (a) {
              a = false
            } else {
              this.expect(y.comma)
            }
            if (t && this.type === y.comma) {
              s.push(null)
            } else if (r && this.afterTrailingComma(e)) {
              break
            } else if (this.type === y.ellipsis) {
              var o = this.parseRestBinding()
              this.parseBindingListItem(o)
              s.push(o)
              if (this.type === y.comma) {
                this.raise(
                  this.start,
                  'Comma is not permitted after the rest element'
                )
              }
              this.expect(e)
              break
            } else {
              var u = this.parseMaybeDefault(this.start, this.startLoc)
              this.parseBindingListItem(u)
              s.push(u)
            }
          }
          return s
        }
        ue.parseBindingListItem = function (e) {
          return e
        }
        ue.parseMaybeDefault = function (e, t, r) {
          r = r || this.parseBindingAtom()
          if (this.options.ecmaVersion < 6 || !this.eat(y.eq)) {
            return r
          }
          var s = this.startNodeAt(e, t)
          s.left = r
          s.right = this.parseMaybeAssign()
          return this.finishNode(s, 'AssignmentPattern')
        }
        ue.checkLValSimple = function (e, t, r) {
          if (t === void 0) t = V
          var s = t !== V
          switch (e.type) {
            case 'Identifier':
              if (this.strict && this.reservedWordsStrictBind.test(e.name)) {
                this.raiseRecoverable(
                  e.start,
                  (s ? 'Binding ' : 'Assigning to ') +
                    e.name +
                    ' in strict mode'
                )
              }
              if (s) {
                if (t === G && e.name === 'let') {
                  this.raiseRecoverable(
                    e.start,
                    'let is disallowed as a lexically bound name'
                  )
                }
                if (r) {
                  if (A(r, e.name)) {
                    this.raiseRecoverable(e.start, 'Argument name clash')
                  }
                  r[e.name] = true
                }
                if (t !== Q) {
                  this.declareName(e.name, t, e.start)
                }
              }
              break
            case 'ChainExpression':
              this.raiseRecoverable(
                e.start,
                'Optional chaining cannot appear in left-hand side'
              )
              break
            case 'MemberExpression':
              if (s) {
                this.raiseRecoverable(e.start, 'Binding member expression')
              }
              break
            case 'ParenthesizedExpression':
              if (s) {
                this.raiseRecoverable(
                  e.start,
                  'Binding parenthesized expression'
                )
              }
              return this.checkLValSimple(e.expression, t, r)
            default:
              this.raise(e.start, (s ? 'Binding' : 'Assigning to') + ' rvalue')
          }
        }
        ue.checkLValPattern = function (e, t, r) {
          if (t === void 0) t = V
          switch (e.type) {
            case 'ObjectPattern':
              for (var s = 0, a = e.properties; s < a.length; s += 1) {
                var o = a[s]
                this.checkLValInnerPattern(o, t, r)
              }
              break
            case 'ArrayPattern':
              for (var u = 0, c = e.elements; u < c.length; u += 1) {
                var f = c[u]
                if (f) {
                  this.checkLValInnerPattern(f, t, r)
                }
              }
              break
            default:
              this.checkLValSimple(e, t, r)
          }
        }
        ue.checkLValInnerPattern = function (e, t, r) {
          if (t === void 0) t = V
          switch (e.type) {
            case 'Property':
              this.checkLValInnerPattern(e.value, t, r)
              break
            case 'AssignmentPattern':
              this.checkLValPattern(e.left, t, r)
              break
            case 'RestElement':
              this.checkLValPattern(e.argument, t, r)
              break
            default:
              this.checkLValPattern(e, t, r)
          }
        }
        var le = function TokContext(e, t, r, s, a) {
          this.token = e
          this.isExpr = !!t
          this.preserveSpace = !!r
          this.override = s
          this.generator = !!a
        }
        var ce = {
          b_stat: new le('{', false),
          b_expr: new le('{', true),
          b_tmpl: new le('${', false),
          p_stat: new le('(', false),
          p_expr: new le('(', true),
          q_tmpl: new le('`', true, true, function (e) {
            return e.tryReadTemplateToken()
          }),
          f_stat: new le('function', false),
          f_expr: new le('function', true),
          f_expr_gen: new le('function', true, false, null, true),
          f_gen: new le('function', false, false, null, true),
        }
        var fe = Y.prototype
        fe.initialContext = function () {
          return [ce.b_stat]
        }
        fe.curContext = function () {
          return this.context[this.context.length - 1]
        }
        fe.braceIsBlock = function (e) {
          var t = this.curContext()
          if (t === ce.f_expr || t === ce.f_stat) {
            return true
          }
          if (e === y.colon && (t === ce.b_stat || t === ce.b_expr)) {
            return !t.isExpr
          }
          if (e === y._return || (e === y.name && this.exprAllowed)) {
            return _.test(this.input.slice(this.lastTokEnd, this.start))
          }
          if (
            e === y._else ||
            e === y.semi ||
            e === y.eof ||
            e === y.parenR ||
            e === y.arrow
          ) {
            return true
          }
          if (e === y.braceL) {
            return t === ce.b_stat
          }
          if (e === y._var || e === y._const || e === y.name) {
            return false
          }
          return !this.exprAllowed
        }
        fe.inGeneratorContext = function () {
          for (var e = this.context.length - 1; e >= 1; e--) {
            var t = this.context[e]
            if (t.token === 'function') {
              return t.generator
            }
          }
          return false
        }
        fe.updateContext = function (e) {
          var t,
            r = this.type
          if (r.keyword && e === y.dot) {
            this.exprAllowed = false
          } else if ((t = r.updateContext)) {
            t.call(this, e)
          } else {
            this.exprAllowed = r.beforeExpr
          }
        }
        fe.overrideContext = function (e) {
          if (this.curContext() !== e) {
            this.context[this.context.length - 1] = e
          }
        }
        y.parenR.updateContext = y.braceR.updateContext = function () {
          if (this.context.length === 1) {
            this.exprAllowed = true
            return
          }
          var e = this.context.pop()
          if (e === ce.b_stat && this.curContext().token === 'function') {
            e = this.context.pop()
          }
          this.exprAllowed = !e.isExpr
        }
        y.braceL.updateContext = function (e) {
          this.context.push(this.braceIsBlock(e) ? ce.b_stat : ce.b_expr)
          this.exprAllowed = true
        }
        y.dollarBraceL.updateContext = function () {
          this.context.push(ce.b_tmpl)
          this.exprAllowed = true
        }
        y.parenL.updateContext = function (e) {
          var t = e === y._if || e === y._for || e === y._with || e === y._while
          this.context.push(t ? ce.p_stat : ce.p_expr)
          this.exprAllowed = true
        }
        y.incDec.updateContext = function () {}
        y._function.updateContext = y._class.updateContext = function (e) {
          if (
            e.beforeExpr &&
            e !== y._else &&
            !(e === y.semi && this.curContext() !== ce.p_stat) &&
            !(
              e === y._return &&
              _.test(this.input.slice(this.lastTokEnd, this.start))
            ) &&
            !(
              (e === y.colon || e === y.braceL) &&
              this.curContext() === ce.b_stat
            )
          ) {
            this.context.push(ce.f_expr)
          } else {
            this.context.push(ce.f_stat)
          }
          this.exprAllowed = false
        }
        y.backQuote.updateContext = function () {
          if (this.curContext() === ce.q_tmpl) {
            this.context.pop()
          } else {
            this.context.push(ce.q_tmpl)
          }
          this.exprAllowed = false
        }
        y.star.updateContext = function (e) {
          if (e === y._function) {
            var t = this.context.length - 1
            if (this.context[t] === ce.f_expr) {
              this.context[t] = ce.f_expr_gen
            } else {
              this.context[t] = ce.f_gen
            }
          }
          this.exprAllowed = true
        }
        y.name.updateContext = function (e) {
          var t = false
          if (this.options.ecmaVersion >= 6 && e !== y.dot) {
            if (
              (this.value === 'of' && !this.exprAllowed) ||
              (this.value === 'yield' && this.inGeneratorContext())
            ) {
              t = true
            }
          }
          this.exprAllowed = t
        }
        var pe = Y.prototype
        pe.checkPropClash = function (e, t, r) {
          if (this.options.ecmaVersion >= 9 && e.type === 'SpreadElement') {
            return
          }
          if (
            this.options.ecmaVersion >= 6 &&
            (e.computed || e.method || e.shorthand)
          ) {
            return
          }
          var s = e.key
          var a
          switch (s.type) {
            case 'Identifier':
              a = s.name
              break
            case 'Literal':
              a = String(s.value)
              break
            default:
              return
          }
          var o = e.kind
          if (this.options.ecmaVersion >= 6) {
            if (a === '__proto__' && o === 'init') {
              if (t.proto) {
                if (r) {
                  if (r.doubleProto < 0) {
                    r.doubleProto = s.start
                  }
                } else {
                  this.raiseRecoverable(
                    s.start,
                    'Redefinition of __proto__ property'
                  )
                }
              }
              t.proto = true
            }
            return
          }
          a = '$' + a
          var u = t[a]
          if (u) {
            var c
            if (o === 'init') {
              c = (this.strict && u.init) || u.get || u.set
            } else {
              c = u.init || u[o]
            }
            if (c) {
              this.raiseRecoverable(s.start, 'Redefinition of property')
            }
          } else {
            u = t[a] = { init: false, get: false, set: false }
          }
          u[o] = true
        }
        pe.parseExpression = function (e, t) {
          var r = this.start,
            s = this.startLoc
          var a = this.parseMaybeAssign(e, t)
          if (this.type === y.comma) {
            var o = this.startNodeAt(r, s)
            o.expressions = [a]
            while (this.eat(y.comma)) {
              o.expressions.push(this.parseMaybeAssign(e, t))
            }
            return this.finishNode(o, 'SequenceExpression')
          }
          return a
        }
        pe.parseMaybeAssign = function (e, t, r) {
          if (this.isContextual('yield')) {
            if (this.inGenerator) {
              return this.parseYield(e)
            } else {
              this.exprAllowed = false
            }
          }
          var s = false,
            a = -1,
            o = -1,
            u = -1
          if (t) {
            a = t.parenthesizedAssign
            o = t.trailingComma
            u = t.doubleProto
            t.parenthesizedAssign = t.trailingComma = -1
          } else {
            t = new ee()
            s = true
          }
          var c = this.start,
            f = this.startLoc
          if (this.type === y.parenL || this.type === y.name) {
            this.potentialArrowAt = this.start
            this.potentialArrowInForAwait = e === 'await'
          }
          var p = this.parseMaybeConditional(e, t)
          if (r) {
            p = r.call(this, p, c, f)
          }
          if (this.type.isAssign) {
            var h = this.startNodeAt(c, f)
            h.operator = this.value
            if (this.type === y.eq) {
              p = this.toAssignable(p, false, t)
            }
            if (!s) {
              t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1
            }
            if (t.shorthandAssign >= p.start) {
              t.shorthandAssign = -1
            }
            if (this.type === y.eq) {
              this.checkLValPattern(p)
            } else {
              this.checkLValSimple(p)
            }
            h.left = p
            this.next()
            h.right = this.parseMaybeAssign(e)
            if (u > -1) {
              t.doubleProto = u
            }
            return this.finishNode(h, 'AssignmentExpression')
          } else {
            if (s) {
              this.checkExpressionErrors(t, true)
            }
          }
          if (a > -1) {
            t.parenthesizedAssign = a
          }
          if (o > -1) {
            t.trailingComma = o
          }
          return p
        }
        pe.parseMaybeConditional = function (e, t) {
          var r = this.start,
            s = this.startLoc
          var a = this.parseExprOps(e, t)
          if (this.checkExpressionErrors(t)) {
            return a
          }
          if (this.eat(y.question)) {
            var o = this.startNodeAt(r, s)
            o.test = a
            o.consequent = this.parseMaybeAssign()
            this.expect(y.colon)
            o.alternate = this.parseMaybeAssign(e)
            return this.finishNode(o, 'ConditionalExpression')
          }
          return a
        }
        pe.parseExprOps = function (e, t) {
          var r = this.start,
            s = this.startLoc
          var a = this.parseMaybeUnary(t, false, false, e)
          if (this.checkExpressionErrors(t)) {
            return a
          }
          return a.start === r && a.type === 'ArrowFunctionExpression'
            ? a
            : this.parseExprOp(a, r, s, -1, e)
        }
        pe.parseExprOp = function (e, t, r, s, a) {
          var o = this.type.binop
          if (o != null && (!a || this.type !== y._in)) {
            if (o > s) {
              var u = this.type === y.logicalOR || this.type === y.logicalAND
              var c = this.type === y.coalesce
              if (c) {
                o = y.logicalAND.binop
              }
              var f = this.value
              this.next()
              var p = this.start,
                h = this.startLoc
              var d = this.parseExprOp(
                this.parseMaybeUnary(null, false, false, a),
                p,
                h,
                o,
                a
              )
              var g = this.buildBinary(t, r, e, d, f, u || c)
              if (
                (u && this.type === y.coalesce) ||
                (c && (this.type === y.logicalOR || this.type === y.logicalAND))
              ) {
                this.raiseRecoverable(
                  this.start,
                  'Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses'
                )
              }
              return this.parseExprOp(g, t, r, s, a)
            }
          }
          return e
        }
        pe.buildBinary = function (e, t, r, s, a, o) {
          if (s.type === 'PrivateIdentifier') {
            this.raise(
              s.start,
              'Private identifier can only be left side of binary expression'
            )
          }
          var u = this.startNodeAt(e, t)
          u.left = r
          u.operator = a
          u.right = s
          return this.finishNode(
            u,
            o ? 'LogicalExpression' : 'BinaryExpression'
          )
        }
        pe.parseMaybeUnary = function (e, t, r, s) {
          var a = this.start,
            o = this.startLoc,
            u
          if (this.isContextual('await') && this.canAwait) {
            u = this.parseAwait(s)
            t = true
          } else if (this.type.prefix) {
            var c = this.startNode(),
              f = this.type === y.incDec
            c.operator = this.value
            c.prefix = true
            this.next()
            c.argument = this.parseMaybeUnary(null, true, f, s)
            this.checkExpressionErrors(e, true)
            if (f) {
              this.checkLValSimple(c.argument)
            } else if (
              this.strict &&
              c.operator === 'delete' &&
              c.argument.type === 'Identifier'
            ) {
              this.raiseRecoverable(
                c.start,
                'Deleting local variable in strict mode'
              )
            } else if (
              c.operator === 'delete' &&
              isPrivateFieldAccess(c.argument)
            ) {
              this.raiseRecoverable(
                c.start,
                'Private fields can not be deleted'
              )
            } else {
              t = true
            }
            u = this.finishNode(c, f ? 'UpdateExpression' : 'UnaryExpression')
          } else if (!t && this.type === y.privateId) {
            if (s || this.privateNameStack.length === 0) {
              this.unexpected()
            }
            u = this.parsePrivateIdent()
            if (this.type !== y._in) {
              this.unexpected()
            }
          } else {
            u = this.parseExprSubscripts(e, s)
            if (this.checkExpressionErrors(e)) {
              return u
            }
            while (this.type.postfix && !this.canInsertSemicolon()) {
              var p = this.startNodeAt(a, o)
              p.operator = this.value
              p.prefix = false
              p.argument = u
              this.checkLValSimple(u)
              this.next()
              u = this.finishNode(p, 'UpdateExpression')
            }
          }
          if (!r && this.eat(y.starstar)) {
            if (t) {
              this.unexpected(this.lastTokStart)
            } else {
              return this.buildBinary(
                a,
                o,
                u,
                this.parseMaybeUnary(null, false, false, s),
                '**',
                false
              )
            }
          } else {
            return u
          }
        }
        function isPrivateFieldAccess(e) {
          return (
            (e.type === 'MemberExpression' &&
              e.property.type === 'PrivateIdentifier') ||
            (e.type === 'ChainExpression' && isPrivateFieldAccess(e.expression))
          )
        }
        pe.parseExprSubscripts = function (e, t) {
          var r = this.start,
            s = this.startLoc
          var a = this.parseExprAtom(e, t)
          if (
            a.type === 'ArrowFunctionExpression' &&
            this.input.slice(this.lastTokStart, this.lastTokEnd) !== ')'
          ) {
            return a
          }
          var o = this.parseSubscripts(a, r, s, false, t)
          if (e && o.type === 'MemberExpression') {
            if (e.parenthesizedAssign >= o.start) {
              e.parenthesizedAssign = -1
            }
            if (e.parenthesizedBind >= o.start) {
              e.parenthesizedBind = -1
            }
            if (e.trailingComma >= o.start) {
              e.trailingComma = -1
            }
          }
          return o
        }
        pe.parseSubscripts = function (e, t, r, s, a) {
          var o =
            this.options.ecmaVersion >= 8 &&
            e.type === 'Identifier' &&
            e.name === 'async' &&
            this.lastTokEnd === e.end &&
            !this.canInsertSemicolon() &&
            e.end - e.start === 5 &&
            this.potentialArrowAt === e.start
          var u = false
          while (true) {
            var c = this.parseSubscript(e, t, r, s, o, u, a)
            if (c.optional) {
              u = true
            }
            if (c === e || c.type === 'ArrowFunctionExpression') {
              if (u) {
                var f = this.startNodeAt(t, r)
                f.expression = c
                c = this.finishNode(f, 'ChainExpression')
              }
              return c
            }
            e = c
          }
        }
        pe.parseSubscript = function (e, t, r, s, a, o, u) {
          var c = this.options.ecmaVersion >= 11
          var f = c && this.eat(y.questionDot)
          if (s && f) {
            this.raise(
              this.lastTokStart,
              'Optional chaining cannot appear in the callee of new expressions'
            )
          }
          var p = this.eat(y.bracketL)
          if (
            p ||
            (f && this.type !== y.parenL && this.type !== y.backQuote) ||
            this.eat(y.dot)
          ) {
            var h = this.startNodeAt(t, r)
            h.object = e
            if (p) {
              h.property = this.parseExpression()
              this.expect(y.bracketR)
            } else if (this.type === y.privateId && e.type !== 'Super') {
              h.property = this.parsePrivateIdent()
            } else {
              h.property = this.parseIdent(
                this.options.allowReserved !== 'never'
              )
            }
            h.computed = !!p
            if (c) {
              h.optional = f
            }
            e = this.finishNode(h, 'MemberExpression')
          } else if (!s && this.eat(y.parenL)) {
            var d = new ee(),
              g = this.yieldPos,
              v = this.awaitPos,
              m = this.awaitIdentPos
            this.yieldPos = 0
            this.awaitPos = 0
            this.awaitIdentPos = 0
            var _ = this.parseExprList(
              y.parenR,
              this.options.ecmaVersion >= 8,
              false,
              d
            )
            if (a && !f && !this.canInsertSemicolon() && this.eat(y.arrow)) {
              this.checkPatternErrors(d, false)
              this.checkYieldAwaitInDefaultParams()
              if (this.awaitIdentPos > 0) {
                this.raise(
                  this.awaitIdentPos,
                  "Cannot use 'await' as identifier inside an async function"
                )
              }
              this.yieldPos = g
              this.awaitPos = v
              this.awaitIdentPos = m
              return this.parseArrowExpression(
                this.startNodeAt(t, r),
                _,
                true,
                u
              )
            }
            this.checkExpressionErrors(d, true)
            this.yieldPos = g || this.yieldPos
            this.awaitPos = v || this.awaitPos
            this.awaitIdentPos = m || this.awaitIdentPos
            var D = this.startNodeAt(t, r)
            D.callee = e
            D.arguments = _
            if (c) {
              D.optional = f
            }
            e = this.finishNode(D, 'CallExpression')
          } else if (this.type === y.backQuote) {
            if (f || o) {
              this.raise(
                this.start,
                'Optional chaining cannot appear in the tag of tagged template expressions'
              )
            }
            var x = this.startNodeAt(t, r)
            x.tag = e
            x.quasi = this.parseTemplate({ isTagged: true })
            e = this.finishNode(x, 'TaggedTemplateExpression')
          }
          return e
        }
        pe.parseExprAtom = function (e, t) {
          if (this.type === y.slash) {
            this.readRegexp()
          }
          var r,
            s = this.potentialArrowAt === this.start
          switch (this.type) {
            case y._super:
              if (!this.allowSuper) {
                this.raise(this.start, "'super' keyword outside a method")
              }
              r = this.startNode()
              this.next()
              if (this.type === y.parenL && !this.allowDirectSuper) {
                this.raise(
                  r.start,
                  'super() call outside constructor of a subclass'
                )
              }
              if (
                this.type !== y.dot &&
                this.type !== y.bracketL &&
                this.type !== y.parenL
              ) {
                this.unexpected()
              }
              return this.finishNode(r, 'Super')
            case y._this:
              r = this.startNode()
              this.next()
              return this.finishNode(r, 'ThisExpression')
            case y.name:
              var a = this.start,
                o = this.startLoc,
                u = this.containsEsc
              var c = this.parseIdent(false)
              if (
                this.options.ecmaVersion >= 8 &&
                !u &&
                c.name === 'async' &&
                !this.canInsertSemicolon() &&
                this.eat(y._function)
              ) {
                this.overrideContext(ce.f_expr)
                return this.parseFunction(
                  this.startNodeAt(a, o),
                  0,
                  false,
                  true,
                  t
                )
              }
              if (s && !this.canInsertSemicolon()) {
                if (this.eat(y.arrow)) {
                  return this.parseArrowExpression(
                    this.startNodeAt(a, o),
                    [c],
                    false,
                    t
                  )
                }
                if (
                  this.options.ecmaVersion >= 8 &&
                  c.name === 'async' &&
                  this.type === y.name &&
                  !u &&
                  (!this.potentialArrowInForAwait ||
                    this.value !== 'of' ||
                    this.containsEsc)
                ) {
                  c = this.parseIdent(false)
                  if (this.canInsertSemicolon() || !this.eat(y.arrow)) {
                    this.unexpected()
                  }
                  return this.parseArrowExpression(
                    this.startNodeAt(a, o),
                    [c],
                    true,
                    t
                  )
                }
              }
              return c
            case y.regexp:
              var f = this.value
              r = this.parseLiteral(f.value)
              r.regex = { pattern: f.pattern, flags: f.flags }
              return r
            case y.num:
            case y.string:
              return this.parseLiteral(this.value)
            case y._null:
            case y._true:
            case y._false:
              r = this.startNode()
              r.value = this.type === y._null ? null : this.type === y._true
              r.raw = this.type.keyword
              this.next()
              return this.finishNode(r, 'Literal')
            case y.parenL:
              var p = this.start,
                h = this.parseParenAndDistinguishExpression(s, t)
              if (e) {
                if (
                  e.parenthesizedAssign < 0 &&
                  !this.isSimpleAssignTarget(h)
                ) {
                  e.parenthesizedAssign = p
                }
                if (e.parenthesizedBind < 0) {
                  e.parenthesizedBind = p
                }
              }
              return h
            case y.bracketL:
              r = this.startNode()
              this.next()
              r.elements = this.parseExprList(y.bracketR, true, true, e)
              return this.finishNode(r, 'ArrayExpression')
            case y.braceL:
              this.overrideContext(ce.b_expr)
              return this.parseObj(false, e)
            case y._function:
              r = this.startNode()
              this.next()
              return this.parseFunction(r, 0)
            case y._class:
              return this.parseClass(this.startNode(), false)
            case y._new:
              return this.parseNew()
            case y.backQuote:
              return this.parseTemplate()
            case y._import:
              if (this.options.ecmaVersion >= 11) {
                return this.parseExprImport()
              } else {
                return this.unexpected()
              }
            default:
              this.unexpected()
          }
        }
        pe.parseExprImport = function () {
          var e = this.startNode()
          if (this.containsEsc) {
            this.raiseRecoverable(
              this.start,
              'Escape sequence in keyword import'
            )
          }
          var t = this.parseIdent(true)
          switch (this.type) {
            case y.parenL:
              return this.parseDynamicImport(e)
            case y.dot:
              e.meta = t
              return this.parseImportMeta(e)
            default:
              this.unexpected()
          }
        }
        pe.parseDynamicImport = function (e) {
          this.next()
          e.source = this.parseMaybeAssign()
          if (!this.eat(y.parenR)) {
            var t = this.start
            if (this.eat(y.comma) && this.eat(y.parenR)) {
              this.raiseRecoverable(
                t,
                'Trailing comma is not allowed in import()'
              )
            } else {
              this.unexpected(t)
            }
          }
          return this.finishNode(e, 'ImportExpression')
        }
        pe.parseImportMeta = function (e) {
          this.next()
          var t = this.containsEsc
          e.property = this.parseIdent(true)
          if (e.property.name !== 'meta') {
            this.raiseRecoverable(
              e.property.start,
              "The only valid meta property for import is 'import.meta'"
            )
          }
          if (t) {
            this.raiseRecoverable(
              e.start,
              "'import.meta' must not contain escaped characters"
            )
          }
          if (
            this.options.sourceType !== 'module' &&
            !this.options.allowImportExportEverywhere
          ) {
            this.raiseRecoverable(
              e.start,
              "Cannot use 'import.meta' outside a module"
            )
          }
          return this.finishNode(e, 'MetaProperty')
        }
        pe.parseLiteral = function (e) {
          var t = this.startNode()
          t.value = e
          t.raw = this.input.slice(this.start, this.end)
          if (t.raw.charCodeAt(t.raw.length - 1) === 110) {
            t.bigint = t.raw.slice(0, -1).replace(/_/g, '')
          }
          this.next()
          return this.finishNode(t, 'Literal')
        }
        pe.parseParenExpression = function () {
          this.expect(y.parenL)
          var e = this.parseExpression()
          this.expect(y.parenR)
          return e
        }
        pe.parseParenAndDistinguishExpression = function (e, t) {
          var r = this.start,
            s = this.startLoc,
            a,
            o = this.options.ecmaVersion >= 8
          if (this.options.ecmaVersion >= 6) {
            this.next()
            var u = this.start,
              c = this.startLoc
            var f = [],
              p = true,
              h = false
            var d = new ee(),
              g = this.yieldPos,
              v = this.awaitPos,
              m
            this.yieldPos = 0
            this.awaitPos = 0
            while (this.type !== y.parenR) {
              p ? (p = false) : this.expect(y.comma)
              if (o && this.afterTrailingComma(y.parenR, true)) {
                h = true
                break
              } else if (this.type === y.ellipsis) {
                m = this.start
                f.push(this.parseParenItem(this.parseRestBinding()))
                if (this.type === y.comma) {
                  this.raise(
                    this.start,
                    'Comma is not permitted after the rest element'
                  )
                }
                break
              } else {
                f.push(this.parseMaybeAssign(false, d, this.parseParenItem))
              }
            }
            var _ = this.lastTokEnd,
              D = this.lastTokEndLoc
            this.expect(y.parenR)
            if (e && !this.canInsertSemicolon() && this.eat(y.arrow)) {
              this.checkPatternErrors(d, false)
              this.checkYieldAwaitInDefaultParams()
              this.yieldPos = g
              this.awaitPos = v
              return this.parseParenArrowList(r, s, f, t)
            }
            if (!f.length || h) {
              this.unexpected(this.lastTokStart)
            }
            if (m) {
              this.unexpected(m)
            }
            this.checkExpressionErrors(d, true)
            this.yieldPos = g || this.yieldPos
            this.awaitPos = v || this.awaitPos
            if (f.length > 1) {
              a = this.startNodeAt(u, c)
              a.expressions = f
              this.finishNodeAt(a, 'SequenceExpression', _, D)
            } else {
              a = f[0]
            }
          } else {
            a = this.parseParenExpression()
          }
          if (this.options.preserveParens) {
            var x = this.startNodeAt(r, s)
            x.expression = a
            return this.finishNode(x, 'ParenthesizedExpression')
          } else {
            return a
          }
        }
        pe.parseParenItem = function (e) {
          return e
        }
        pe.parseParenArrowList = function (e, t, r, s) {
          return this.parseArrowExpression(this.startNodeAt(e, t), r, false, s)
        }
        var he = []
        pe.parseNew = function () {
          if (this.containsEsc) {
            this.raiseRecoverable(this.start, 'Escape sequence in keyword new')
          }
          var e = this.startNode()
          var t = this.parseIdent(true)
          if (this.options.ecmaVersion >= 6 && this.eat(y.dot)) {
            e.meta = t
            var r = this.containsEsc
            e.property = this.parseIdent(true)
            if (e.property.name !== 'target') {
              this.raiseRecoverable(
                e.property.start,
                "The only valid meta property for new is 'new.target'"
              )
            }
            if (r) {
              this.raiseRecoverable(
                e.start,
                "'new.target' must not contain escaped characters"
              )
            }
            if (!this.allowNewDotTarget) {
              this.raiseRecoverable(
                e.start,
                "'new.target' can only be used in functions and class static block"
              )
            }
            return this.finishNode(e, 'MetaProperty')
          }
          var s = this.start,
            a = this.startLoc,
            o = this.type === y._import
          e.callee = this.parseSubscripts(
            this.parseExprAtom(),
            s,
            a,
            true,
            false
          )
          if (o && e.callee.type === 'ImportExpression') {
            this.raise(s, 'Cannot use new with import()')
          }
          if (this.eat(y.parenL)) {
            e.arguments = this.parseExprList(
              y.parenR,
              this.options.ecmaVersion >= 8,
              false
            )
          } else {
            e.arguments = he
          }
          return this.finishNode(e, 'NewExpression')
        }
        pe.parseTemplateElement = function (e) {
          var t = e.isTagged
          var r = this.startNode()
          if (this.type === y.invalidTemplate) {
            if (!t) {
              this.raiseRecoverable(
                this.start,
                'Bad escape sequence in untagged template literal'
              )
            }
            r.value = { raw: this.value, cooked: null }
          } else {
            r.value = {
              raw: this.input
                .slice(this.start, this.end)
                .replace(/\r\n?/g, '\n'),
              cooked: this.value,
            }
          }
          this.next()
          r.tail = this.type === y.backQuote
          return this.finishNode(r, 'TemplateElement')
        }
        pe.parseTemplate = function (e) {
          if (e === void 0) e = {}
          var t = e.isTagged
          if (t === void 0) t = false
          var r = this.startNode()
          this.next()
          r.expressions = []
          var s = this.parseTemplateElement({ isTagged: t })
          r.quasis = [s]
          while (!s.tail) {
            if (this.type === y.eof) {
              this.raise(this.pos, 'Unterminated template literal')
            }
            this.expect(y.dollarBraceL)
            r.expressions.push(this.parseExpression())
            this.expect(y.braceR)
            r.quasis.push((s = this.parseTemplateElement({ isTagged: t })))
          }
          this.next()
          return this.finishNode(r, 'TemplateLiteral')
        }
        pe.isAsyncProp = function (e) {
          return (
            !e.computed &&
            e.key.type === 'Identifier' &&
            e.key.name === 'async' &&
            (this.type === y.name ||
              this.type === y.num ||
              this.type === y.string ||
              this.type === y.bracketL ||
              this.type.keyword ||
              (this.options.ecmaVersion >= 9 && this.type === y.star)) &&
            !_.test(this.input.slice(this.lastTokEnd, this.start))
          )
        }
        pe.parseObj = function (e, t) {
          var r = this.startNode(),
            s = true,
            a = {}
          r.properties = []
          this.next()
          while (!this.eat(y.braceR)) {
            if (!s) {
              this.expect(y.comma)
              if (
                this.options.ecmaVersion >= 5 &&
                this.afterTrailingComma(y.braceR)
              ) {
                break
              }
            } else {
              s = false
            }
            var o = this.parseProperty(e, t)
            if (!e) {
              this.checkPropClash(o, a, t)
            }
            r.properties.push(o)
          }
          return this.finishNode(r, e ? 'ObjectPattern' : 'ObjectExpression')
        }
        pe.parseProperty = function (e, t) {
          var r = this.startNode(),
            s,
            a,
            o,
            u
          if (this.options.ecmaVersion >= 9 && this.eat(y.ellipsis)) {
            if (e) {
              r.argument = this.parseIdent(false)
              if (this.type === y.comma) {
                this.raise(
                  this.start,
                  'Comma is not permitted after the rest element'
                )
              }
              return this.finishNode(r, 'RestElement')
            }
            r.argument = this.parseMaybeAssign(false, t)
            if (this.type === y.comma && t && t.trailingComma < 0) {
              t.trailingComma = this.start
            }
            return this.finishNode(r, 'SpreadElement')
          }
          if (this.options.ecmaVersion >= 6) {
            r.method = false
            r.shorthand = false
            if (e || t) {
              o = this.start
              u = this.startLoc
            }
            if (!e) {
              s = this.eat(y.star)
            }
          }
          var c = this.containsEsc
          this.parsePropertyName(r)
          if (
            !e &&
            !c &&
            this.options.ecmaVersion >= 8 &&
            !s &&
            this.isAsyncProp(r)
          ) {
            a = true
            s = this.options.ecmaVersion >= 9 && this.eat(y.star)
            this.parsePropertyName(r, t)
          } else {
            a = false
          }
          this.parsePropertyValue(r, e, s, a, o, u, t, c)
          return this.finishNode(r, 'Property')
        }
        pe.parsePropertyValue = function (e, t, r, s, a, o, u, c) {
          if ((r || s) && this.type === y.colon) {
            this.unexpected()
          }
          if (this.eat(y.colon)) {
            e.value = t
              ? this.parseMaybeDefault(this.start, this.startLoc)
              : this.parseMaybeAssign(false, u)
            e.kind = 'init'
          } else if (this.options.ecmaVersion >= 6 && this.type === y.parenL) {
            if (t) {
              this.unexpected()
            }
            e.kind = 'init'
            e.method = true
            e.value = this.parseMethod(r, s)
          } else if (
            !t &&
            !c &&
            this.options.ecmaVersion >= 5 &&
            !e.computed &&
            e.key.type === 'Identifier' &&
            (e.key.name === 'get' || e.key.name === 'set') &&
            this.type !== y.comma &&
            this.type !== y.braceR &&
            this.type !== y.eq
          ) {
            if (r || s) {
              this.unexpected()
            }
            e.kind = e.key.name
            this.parsePropertyName(e)
            e.value = this.parseMethod(false)
            var f = e.kind === 'get' ? 0 : 1
            if (e.value.params.length !== f) {
              var p = e.value.start
              if (e.kind === 'get') {
                this.raiseRecoverable(p, 'getter should have no params')
              } else {
                this.raiseRecoverable(p, 'setter should have exactly one param')
              }
            } else {
              if (
                e.kind === 'set' &&
                e.value.params[0].type === 'RestElement'
              ) {
                this.raiseRecoverable(
                  e.value.params[0].start,
                  'Setter cannot use rest params'
                )
              }
            }
          } else if (
            this.options.ecmaVersion >= 6 &&
            !e.computed &&
            e.key.type === 'Identifier'
          ) {
            if (r || s) {
              this.unexpected()
            }
            this.checkUnreserved(e.key)
            if (e.key.name === 'await' && !this.awaitIdentPos) {
              this.awaitIdentPos = a
            }
            e.kind = 'init'
            if (t) {
              e.value = this.parseMaybeDefault(a, o, this.copyNode(e.key))
            } else if (this.type === y.eq && u) {
              if (u.shorthandAssign < 0) {
                u.shorthandAssign = this.start
              }
              e.value = this.parseMaybeDefault(a, o, this.copyNode(e.key))
            } else {
              e.value = this.copyNode(e.key)
            }
            e.shorthand = true
          } else {
            this.unexpected()
          }
        }
        pe.parsePropertyName = function (e) {
          if (this.options.ecmaVersion >= 6) {
            if (this.eat(y.bracketL)) {
              e.computed = true
              e.key = this.parseMaybeAssign()
              this.expect(y.bracketR)
              return e.key
            } else {
              e.computed = false
            }
          }
          return (e.key =
            this.type === y.num || this.type === y.string
              ? this.parseExprAtom()
              : this.parseIdent(this.options.allowReserved !== 'never'))
        }
        pe.initFunction = function (e) {
          e.id = null
          if (this.options.ecmaVersion >= 6) {
            e.generator = e.expression = false
          }
          if (this.options.ecmaVersion >= 8) {
            e.async = false
          }
        }
        pe.parseMethod = function (e, t, r) {
          var s = this.startNode(),
            a = this.yieldPos,
            o = this.awaitPos,
            u = this.awaitIdentPos
          this.initFunction(s)
          if (this.options.ecmaVersion >= 6) {
            s.generator = e
          }
          if (this.options.ecmaVersion >= 8) {
            s.async = !!t
          }
          this.yieldPos = 0
          this.awaitPos = 0
          this.awaitIdentPos = 0
          this.enterScope(functionFlags(t, s.generator) | H | (r ? $ : 0))
          this.expect(y.parenL)
          s.params = this.parseBindingList(
            y.parenR,
            false,
            this.options.ecmaVersion >= 8
          )
          this.checkYieldAwaitInDefaultParams()
          this.parseFunctionBody(s, false, true, false)
          this.yieldPos = a
          this.awaitPos = o
          this.awaitIdentPos = u
          return this.finishNode(s, 'FunctionExpression')
        }
        pe.parseArrowExpression = function (e, t, r, s) {
          var a = this.yieldPos,
            o = this.awaitPos,
            u = this.awaitIdentPos
          this.enterScope(functionFlags(r, false) | j)
          this.initFunction(e)
          if (this.options.ecmaVersion >= 8) {
            e.async = !!r
          }
          this.yieldPos = 0
          this.awaitPos = 0
          this.awaitIdentPos = 0
          e.params = this.toAssignableList(t, true)
          this.parseFunctionBody(e, true, false, s)
          this.yieldPos = a
          this.awaitPos = o
          this.awaitIdentPos = u
          return this.finishNode(e, 'ArrowFunctionExpression')
        }
        pe.parseFunctionBody = function (e, t, r, s) {
          var a = t && this.type !== y.braceL
          var o = this.strict,
            u = false
          if (a) {
            e.body = this.parseMaybeAssign(s)
            e.expression = true
            this.checkParams(e, false)
          } else {
            var c =
              this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params)
            if (!o || c) {
              u = this.strictDirective(this.end)
              if (u && c) {
                this.raiseRecoverable(
                  e.start,
                  "Illegal 'use strict' directive in function with non-simple parameter list"
                )
              }
            }
            var f = this.labels
            this.labels = []
            if (u) {
              this.strict = true
            }
            this.checkParams(
              e,
              !o && !u && !t && !r && this.isSimpleParamList(e.params)
            )
            if (this.strict && e.id) {
              this.checkLValSimple(e.id, Q)
            }
            e.body = this.parseBlock(false, undefined, u && !o)
            e.expression = false
            this.adaptDirectivePrologue(e.body.body)
            this.labels = f
          }
          this.exitScope()
        }
        pe.isSimpleParamList = function (e) {
          for (var t = 0, r = e; t < r.length; t += 1) {
            var s = r[t]
            if (s.type !== 'Identifier') {
              return false
            }
          }
          return true
        }
        pe.checkParams = function (e, t) {
          var r = Object.create(null)
          for (var s = 0, a = e.params; s < a.length; s += 1) {
            var o = a[s]
            this.checkLValInnerPattern(o, q, t ? null : r)
          }
        }
        pe.parseExprList = function (e, t, r, s) {
          var a = [],
            o = true
          while (!this.eat(e)) {
            if (!o) {
              this.expect(y.comma)
              if (t && this.afterTrailingComma(e)) {
                break
              }
            } else {
              o = false
            }
            var u = void 0
            if (r && this.type === y.comma) {
              u = null
            } else if (this.type === y.ellipsis) {
              u = this.parseSpread(s)
              if (s && this.type === y.comma && s.trailingComma < 0) {
                s.trailingComma = this.start
              }
            } else {
              u = this.parseMaybeAssign(false, s)
            }
            a.push(u)
          }
          return a
        }
        pe.checkUnreserved = function (e) {
          var t = e.start
          var r = e.end
          var s = e.name
          if (this.inGenerator && s === 'yield') {
            this.raiseRecoverable(
              t,
              "Cannot use 'yield' as identifier inside a generator"
            )
          }
          if (this.inAsync && s === 'await') {
            this.raiseRecoverable(
              t,
              "Cannot use 'await' as identifier inside an async function"
            )
          }
          if (this.currentThisScope().inClassFieldInit && s === 'arguments') {
            this.raiseRecoverable(
              t,
              "Cannot use 'arguments' in class field initializer"
            )
          }
          if (this.inClassStaticBlock && (s === 'arguments' || s === 'await')) {
            this.raise(
              t,
              'Cannot use ' + s + ' in class static initialization block'
            )
          }
          if (this.keywords.test(s)) {
            this.raise(t, "Unexpected keyword '" + s + "'")
          }
          if (
            this.options.ecmaVersion < 6 &&
            this.input.slice(t, r).indexOf('\\') !== -1
          ) {
            return
          }
          var a = this.strict ? this.reservedWordsStrict : this.reservedWords
          if (a.test(s)) {
            if (!this.inAsync && s === 'await') {
              this.raiseRecoverable(
                t,
                "Cannot use keyword 'await' outside an async function"
              )
            }
            this.raiseRecoverable(t, "The keyword '" + s + "' is reserved")
          }
        }
        pe.parseIdent = function (e, t) {
          var r = this.startNode()
          if (this.type === y.name) {
            r.name = this.value
          } else if (this.type.keyword) {
            r.name = this.type.keyword
            if (
              (r.name === 'class' || r.name === 'function') &&
              (this.lastTokEnd !== this.lastTokStart + 1 ||
                this.input.charCodeAt(this.lastTokStart) !== 46)
            ) {
              this.context.pop()
            }
          } else {
            this.unexpected()
          }
          this.next(!!e)
          this.finishNode(r, 'Identifier')
          if (!e) {
            this.checkUnreserved(r)
            if (r.name === 'await' && !this.awaitIdentPos) {
              this.awaitIdentPos = r.start
            }
          }
          return r
        }
        pe.parsePrivateIdent = function () {
          var e = this.startNode()
          if (this.type === y.privateId) {
            e.name = this.value
          } else {
            this.unexpected()
          }
          this.next()
          this.finishNode(e, 'PrivateIdentifier')
          if (this.privateNameStack.length === 0) {
            this.raise(
              e.start,
              "Private field '#" +
                e.name +
                "' must be declared in an enclosing class"
            )
          } else {
            this.privateNameStack[this.privateNameStack.length - 1].used.push(e)
          }
          return e
        }
        pe.parseYield = function (e) {
          if (!this.yieldPos) {
            this.yieldPos = this.start
          }
          var t = this.startNode()
          this.next()
          if (
            this.type === y.semi ||
            this.canInsertSemicolon() ||
            (this.type !== y.star && !this.type.startsExpr)
          ) {
            t.delegate = false
            t.argument = null
          } else {
            t.delegate = this.eat(y.star)
            t.argument = this.parseMaybeAssign(e)
          }
          return this.finishNode(t, 'YieldExpression')
        }
        pe.parseAwait = function (e) {
          if (!this.awaitPos) {
            this.awaitPos = this.start
          }
          var t = this.startNode()
          this.next()
          t.argument = this.parseMaybeUnary(null, true, false, e)
          return this.finishNode(t, 'AwaitExpression')
        }
        var de = Y.prototype
        de.raise = function (e, t) {
          var r = getLineInfo(this.input, e)
          t += ' (' + r.line + ':' + r.column + ')'
          var s = new SyntaxError(t)
          s.pos = e
          s.loc = r
          s.raisedAt = this.pos
          throw s
        }
        de.raiseRecoverable = de.raise
        de.curPosition = function () {
          if (this.options.locations) {
            return new T(this.curLine, this.pos - this.lineStart)
          }
        }
        var ge = Y.prototype
        var ve = function Scope(e) {
          this.flags = e
          this.var = []
          this.lexical = []
          this.functions = []
          this.inClassFieldInit = false
        }
        ge.enterScope = function (e) {
          this.scopeStack.push(new ve(e))
        }
        ge.exitScope = function () {
          this.scopeStack.pop()
        }
        ge.treatFunctionsAsVarInScope = function (e) {
          return e.flags & N || (!this.inModule && e.flags & L)
        }
        ge.declareName = function (e, t, r) {
          var s = false
          if (t === G) {
            var a = this.currentScope()
            s =
              a.lexical.indexOf(e) > -1 ||
              a.functions.indexOf(e) > -1 ||
              a.var.indexOf(e) > -1
            a.lexical.push(e)
            if (this.inModule && a.flags & L) {
              delete this.undefinedExports[e]
            }
          } else if (t === z) {
            var o = this.currentScope()
            o.lexical.push(e)
          } else if (t === K) {
            var u = this.currentScope()
            if (this.treatFunctionsAsVar) {
              s = u.lexical.indexOf(e) > -1
            } else {
              s = u.lexical.indexOf(e) > -1 || u.var.indexOf(e) > -1
            }
            u.functions.push(e)
          } else {
            for (var c = this.scopeStack.length - 1; c >= 0; --c) {
              var f = this.scopeStack[c]
              if (
                (f.lexical.indexOf(e) > -1 &&
                  !(f.flags & M && f.lexical[0] === e)) ||
                (!this.treatFunctionsAsVarInScope(f) &&
                  f.functions.indexOf(e) > -1)
              ) {
                s = true
                break
              }
              f.var.push(e)
              if (this.inModule && f.flags & L) {
                delete this.undefinedExports[e]
              }
              if (f.flags & W) {
                break
              }
            }
          }
          if (s) {
            this.raiseRecoverable(
              r,
              "Identifier '" + e + "' has already been declared"
            )
          }
        }
        ge.checkLocalExport = function (e) {
          if (
            this.scopeStack[0].lexical.indexOf(e.name) === -1 &&
            this.scopeStack[0].var.indexOf(e.name) === -1
          ) {
            this.undefinedExports[e.name] = e
          }
        }
        ge.currentScope = function () {
          return this.scopeStack[this.scopeStack.length - 1]
        }
        ge.currentVarScope = function () {
          for (var e = this.scopeStack.length - 1; ; e--) {
            var t = this.scopeStack[e]
            if (t.flags & W) {
              return t
            }
          }
        }
        ge.currentThisScope = function () {
          for (var e = this.scopeStack.length - 1; ; e--) {
            var t = this.scopeStack[e]
            if (t.flags & W && !(t.flags & j)) {
              return t
            }
          }
        }
        var be = function Node(e, t, r) {
          this.type = ''
          this.start = t
          this.end = 0
          if (e.options.locations) {
            this.loc = new F(e, r)
          }
          if (e.options.directSourceFile) {
            this.sourceFile = e.options.directSourceFile
          }
          if (e.options.ranges) {
            this.range = [t, 0]
          }
        }
        var me = Y.prototype
        me.startNode = function () {
          return new be(this, this.start, this.startLoc)
        }
        me.startNodeAt = function (e, t) {
          return new be(this, e, t)
        }
        function finishNodeAt(e, t, r, s) {
          e.type = t
          e.end = r
          if (this.options.locations) {
            e.loc.end = s
          }
          if (this.options.ranges) {
            e.range[1] = r
          }
          return e
        }
        me.finishNode = function (e, t) {
          return finishNodeAt.call(
            this,
            e,
            t,
            this.lastTokEnd,
            this.lastTokEndLoc
          )
        }
        me.finishNodeAt = function (e, t, r, s) {
          return finishNodeAt.call(this, e, t, r, s)
        }
        me.copyNode = function (e) {
          var t = new be(this, e.start, this.startLoc)
          for (var r in e) {
            t[r] = e[r]
          }
          return t
        }
        var ye =
          'ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS'
        var _e = ye + ' Extended_Pictographic'
        var De = _e
        var xe = De + ' EBase EComp EMod EPres ExtPict'
        var Ee = xe
        var we = { 9: ye, 10: _e, 11: De, 12: xe, 13: Ee }
        var Ce =
          'Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu'
        var Se =
          'Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb'
        var Ae =
          Se +
          ' Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd'
        var Re =
          Ae +
          ' Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho'
        var ke =
          Re +
          ' Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi'
        var Te =
          ke +
          ' Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith'
        var Fe = { 9: Se, 10: Ae, 11: Re, 12: ke, 13: Te }
        var Oe = {}
        function buildUnicodeData(e) {
          var t = (Oe[e] = {
            binary: wordsRegexp(we[e] + ' ' + Ce),
            nonBinary: {
              General_Category: wordsRegexp(Ce),
              Script: wordsRegexp(Fe[e]),
            },
          })
          t.nonBinary.Script_Extensions = t.nonBinary.Script
          t.nonBinary.gc = t.nonBinary.General_Category
          t.nonBinary.sc = t.nonBinary.Script
          t.nonBinary.scx = t.nonBinary.Script_Extensions
        }
        for (var Ie = 0, Le = [9, 10, 11, 12, 13]; Ie < Le.length; Ie += 1) {
          var Ne = Le[Ie]
          buildUnicodeData(Ne)
        }
        var Pe = Y.prototype
        var Be = function RegExpValidationState(e) {
          this.parser = e
          this.validFlags =
            'gim' +
            (e.options.ecmaVersion >= 6 ? 'uy' : '') +
            (e.options.ecmaVersion >= 9 ? 's' : '') +
            (e.options.ecmaVersion >= 13 ? 'd' : '')
          this.unicodeProperties =
            Oe[e.options.ecmaVersion >= 13 ? 13 : e.options.ecmaVersion]
          this.source = ''
          this.flags = ''
          this.start = 0
          this.switchU = false
          this.switchN = false
          this.pos = 0
          this.lastIntValue = 0
          this.lastStringValue = ''
          this.lastAssertionIsQuantifiable = false
          this.numCapturingParens = 0
          this.maxBackReference = 0
          this.groupNames = []
          this.backReferenceNames = []
        }
        Be.prototype.reset = function reset(e, t, r) {
          var s = r.indexOf('u') !== -1
          this.start = e | 0
          this.source = t + ''
          this.flags = r
          this.switchU = s && this.parser.options.ecmaVersion >= 6
          this.switchN = s && this.parser.options.ecmaVersion >= 9
        }
        Be.prototype.raise = function raise(e) {
          this.parser.raiseRecoverable(
            this.start,
            'Invalid regular expression: /' + this.source + '/: ' + e
          )
        }
        Be.prototype.at = function at(e, t) {
          if (t === void 0) t = false
          var r = this.source
          var s = r.length
          if (e >= s) {
            return -1
          }
          var a = r.charCodeAt(e)
          if (!(t || this.switchU) || a <= 55295 || a >= 57344 || e + 1 >= s) {
            return a
          }
          var o = r.charCodeAt(e + 1)
          return o >= 56320 && o <= 57343 ? (a << 10) + o - 56613888 : a
        }
        Be.prototype.nextIndex = function nextIndex(e, t) {
          if (t === void 0) t = false
          var r = this.source
          var s = r.length
          if (e >= s) {
            return s
          }
          var a = r.charCodeAt(e),
            o
          if (
            !(t || this.switchU) ||
            a <= 55295 ||
            a >= 57344 ||
            e + 1 >= s ||
            (o = r.charCodeAt(e + 1)) < 56320 ||
            o > 57343
          ) {
            return e + 1
          }
          return e + 2
        }
        Be.prototype.current = function current(e) {
          if (e === void 0) e = false
          return this.at(this.pos, e)
        }
        Be.prototype.lookahead = function lookahead(e) {
          if (e === void 0) e = false
          return this.at(this.nextIndex(this.pos, e), e)
        }
        Be.prototype.advance = function advance(e) {
          if (e === void 0) e = false
          this.pos = this.nextIndex(this.pos, e)
        }
        Be.prototype.eat = function eat(e, t) {
          if (t === void 0) t = false
          if (this.current(t) === e) {
            this.advance(t)
            return true
          }
          return false
        }
        Pe.validateRegExpFlags = function (e) {
          var t = e.validFlags
          var r = e.flags
          for (var s = 0; s < r.length; s++) {
            var a = r.charAt(s)
            if (t.indexOf(a) === -1) {
              this.raise(e.start, 'Invalid regular expression flag')
            }
            if (r.indexOf(a, s + 1) > -1) {
              this.raise(e.start, 'Duplicate regular expression flag')
            }
          }
        }
        Pe.validateRegExpPattern = function (e) {
          this.regexp_pattern(e)
          if (
            !e.switchN &&
            this.options.ecmaVersion >= 9 &&
            e.groupNames.length > 0
          ) {
            e.switchN = true
            this.regexp_pattern(e)
          }
        }
        Pe.regexp_pattern = function (e) {
          e.pos = 0
          e.lastIntValue = 0
          e.lastStringValue = ''
          e.lastAssertionIsQuantifiable = false
          e.numCapturingParens = 0
          e.maxBackReference = 0
          e.groupNames.length = 0
          e.backReferenceNames.length = 0
          this.regexp_disjunction(e)
          if (e.pos !== e.source.length) {
            if (e.eat(41)) {
              e.raise("Unmatched ')'")
            }
            if (e.eat(93) || e.eat(125)) {
              e.raise('Lone quantifier brackets')
            }
          }
          if (e.maxBackReference > e.numCapturingParens) {
            e.raise('Invalid escape')
          }
          for (var t = 0, r = e.backReferenceNames; t < r.length; t += 1) {
            var s = r[t]
            if (e.groupNames.indexOf(s) === -1) {
              e.raise('Invalid named capture referenced')
            }
          }
        }
        Pe.regexp_disjunction = function (e) {
          this.regexp_alternative(e)
          while (e.eat(124)) {
            this.regexp_alternative(e)
          }
          if (this.regexp_eatQuantifier(e, true)) {
            e.raise('Nothing to repeat')
          }
          if (e.eat(123)) {
            e.raise('Lone quantifier brackets')
          }
        }
        Pe.regexp_alternative = function (e) {
          while (e.pos < e.source.length && this.regexp_eatTerm(e)) {}
        }
        Pe.regexp_eatTerm = function (e) {
          if (this.regexp_eatAssertion(e)) {
            if (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e)) {
              if (e.switchU) {
                e.raise('Invalid quantifier')
              }
            }
            return true
          }
          if (
            e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)
          ) {
            this.regexp_eatQuantifier(e)
            return true
          }
          return false
        }
        Pe.regexp_eatAssertion = function (e) {
          var t = e.pos
          e.lastAssertionIsQuantifiable = false
          if (e.eat(94) || e.eat(36)) {
            return true
          }
          if (e.eat(92)) {
            if (e.eat(66) || e.eat(98)) {
              return true
            }
            e.pos = t
          }
          if (e.eat(40) && e.eat(63)) {
            var r = false
            if (this.options.ecmaVersion >= 9) {
              r = e.eat(60)
            }
            if (e.eat(61) || e.eat(33)) {
              this.regexp_disjunction(e)
              if (!e.eat(41)) {
                e.raise('Unterminated group')
              }
              e.lastAssertionIsQuantifiable = !r
              return true
            }
          }
          e.pos = t
          return false
        }
        Pe.regexp_eatQuantifier = function (e, t) {
          if (t === void 0) t = false
          if (this.regexp_eatQuantifierPrefix(e, t)) {
            e.eat(63)
            return true
          }
          return false
        }
        Pe.regexp_eatQuantifierPrefix = function (e, t) {
          return (
            e.eat(42) ||
            e.eat(43) ||
            e.eat(63) ||
            this.regexp_eatBracedQuantifier(e, t)
          )
        }
        Pe.regexp_eatBracedQuantifier = function (e, t) {
          var r = e.pos
          if (e.eat(123)) {
            var s = 0,
              a = -1
            if (this.regexp_eatDecimalDigits(e)) {
              s = e.lastIntValue
              if (e.eat(44) && this.regexp_eatDecimalDigits(e)) {
                a = e.lastIntValue
              }
              if (e.eat(125)) {
                if (a !== -1 && a < s && !t) {
                  e.raise('numbers out of order in {} quantifier')
                }
                return true
              }
            }
            if (e.switchU && !t) {
              e.raise('Incomplete quantifier')
            }
            e.pos = r
          }
          return false
        }
        Pe.regexp_eatAtom = function (e) {
          return (
            this.regexp_eatPatternCharacters(e) ||
            e.eat(46) ||
            this.regexp_eatReverseSolidusAtomEscape(e) ||
            this.regexp_eatCharacterClass(e) ||
            this.regexp_eatUncapturingGroup(e) ||
            this.regexp_eatCapturingGroup(e)
          )
        }
        Pe.regexp_eatReverseSolidusAtomEscape = function (e) {
          var t = e.pos
          if (e.eat(92)) {
            if (this.regexp_eatAtomEscape(e)) {
              return true
            }
            e.pos = t
          }
          return false
        }
        Pe.regexp_eatUncapturingGroup = function (e) {
          var t = e.pos
          if (e.eat(40)) {
            if (e.eat(63) && e.eat(58)) {
              this.regexp_disjunction(e)
              if (e.eat(41)) {
                return true
              }
              e.raise('Unterminated group')
            }
            e.pos = t
          }
          return false
        }
        Pe.regexp_eatCapturingGroup = function (e) {
          if (e.eat(40)) {
            if (this.options.ecmaVersion >= 9) {
              this.regexp_groupSpecifier(e)
            } else if (e.current() === 63) {
              e.raise('Invalid group')
            }
            this.regexp_disjunction(e)
            if (e.eat(41)) {
              e.numCapturingParens += 1
              return true
            }
            e.raise('Unterminated group')
          }
          return false
        }
        Pe.regexp_eatExtendedAtom = function (e) {
          return (
            e.eat(46) ||
            this.regexp_eatReverseSolidusAtomEscape(e) ||
            this.regexp_eatCharacterClass(e) ||
            this.regexp_eatUncapturingGroup(e) ||
            this.regexp_eatCapturingGroup(e) ||
            this.regexp_eatInvalidBracedQuantifier(e) ||
            this.regexp_eatExtendedPatternCharacter(e)
          )
        }
        Pe.regexp_eatInvalidBracedQuantifier = function (e) {
          if (this.regexp_eatBracedQuantifier(e, true)) {
            e.raise('Nothing to repeat')
          }
          return false
        }
        Pe.regexp_eatSyntaxCharacter = function (e) {
          var t = e.current()
          if (isSyntaxCharacter(t)) {
            e.lastIntValue = t
            e.advance()
            return true
          }
          return false
        }
        function isSyntaxCharacter(e) {
          return (
            e === 36 ||
            (e >= 40 && e <= 43) ||
            e === 46 ||
            e === 63 ||
            (e >= 91 && e <= 94) ||
            (e >= 123 && e <= 125)
          )
        }
        Pe.regexp_eatPatternCharacters = function (e) {
          var t = e.pos
          var r = 0
          while ((r = e.current()) !== -1 && !isSyntaxCharacter(r)) {
            e.advance()
          }
          return e.pos !== t
        }
        Pe.regexp_eatExtendedPatternCharacter = function (e) {
          var t = e.current()
          if (
            t !== -1 &&
            t !== 36 &&
            !(t >= 40 && t <= 43) &&
            t !== 46 &&
            t !== 63 &&
            t !== 91 &&
            t !== 94 &&
            t !== 124
          ) {
            e.advance()
            return true
          }
          return false
        }
        Pe.regexp_groupSpecifier = function (e) {
          if (e.eat(63)) {
            if (this.regexp_eatGroupName(e)) {
              if (e.groupNames.indexOf(e.lastStringValue) !== -1) {
                e.raise('Duplicate capture group name')
              }
              e.groupNames.push(e.lastStringValue)
              return
            }
            e.raise('Invalid group')
          }
        }
        Pe.regexp_eatGroupName = function (e) {
          e.lastStringValue = ''
          if (e.eat(60)) {
            if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) {
              return true
            }
            e.raise('Invalid capture group name')
          }
          return false
        }
        Pe.regexp_eatRegExpIdentifierName = function (e) {
          e.lastStringValue = ''
          if (this.regexp_eatRegExpIdentifierStart(e)) {
            e.lastStringValue += codePointToString(e.lastIntValue)
            while (this.regexp_eatRegExpIdentifierPart(e)) {
              e.lastStringValue += codePointToString(e.lastIntValue)
            }
            return true
          }
          return false
        }
        Pe.regexp_eatRegExpIdentifierStart = function (e) {
          var t = e.pos
          var r = this.options.ecmaVersion >= 11
          var s = e.current(r)
          e.advance(r)
          if (s === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, r)) {
            s = e.lastIntValue
          }
          if (isRegExpIdentifierStart(s)) {
            e.lastIntValue = s
            return true
          }
          e.pos = t
          return false
        }
        function isRegExpIdentifierStart(e) {
          return isIdentifierStart(e, true) || e === 36 || e === 95
        }
        Pe.regexp_eatRegExpIdentifierPart = function (e) {
          var t = e.pos
          var r = this.options.ecmaVersion >= 11
          var s = e.current(r)
          e.advance(r)
          if (s === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, r)) {
            s = e.lastIntValue
          }
          if (isRegExpIdentifierPart(s)) {
            e.lastIntValue = s
            return true
          }
          e.pos = t
          return false
        }
        function isRegExpIdentifierPart(e) {
          return (
            isIdentifierChar(e, true) ||
            e === 36 ||
            e === 95 ||
            e === 8204 ||
            e === 8205
          )
        }
        Pe.regexp_eatAtomEscape = function (e) {
          if (
            this.regexp_eatBackReference(e) ||
            this.regexp_eatCharacterClassEscape(e) ||
            this.regexp_eatCharacterEscape(e) ||
            (e.switchN && this.regexp_eatKGroupName(e))
          ) {
            return true
          }
          if (e.switchU) {
            if (e.current() === 99) {
              e.raise('Invalid unicode escape')
            }
            e.raise('Invalid escape')
          }
          return false
        }
        Pe.regexp_eatBackReference = function (e) {
          var t = e.pos
          if (this.regexp_eatDecimalEscape(e)) {
            var r = e.lastIntValue
            if (e.switchU) {
              if (r > e.maxBackReference) {
                e.maxBackReference = r
              }
              return true
            }
            if (r <= e.numCapturingParens) {
              return true
            }
            e.pos = t
          }
          return false
        }
        Pe.regexp_eatKGroupName = function (e) {
          if (e.eat(107)) {
            if (this.regexp_eatGroupName(e)) {
              e.backReferenceNames.push(e.lastStringValue)
              return true
            }
            e.raise('Invalid named reference')
          }
          return false
        }
        Pe.regexp_eatCharacterEscape = function (e) {
          return (
            this.regexp_eatControlEscape(e) ||
            this.regexp_eatCControlLetter(e) ||
            this.regexp_eatZero(e) ||
            this.regexp_eatHexEscapeSequence(e) ||
            this.regexp_eatRegExpUnicodeEscapeSequence(e, false) ||
            (!e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e)) ||
            this.regexp_eatIdentityEscape(e)
          )
        }
        Pe.regexp_eatCControlLetter = function (e) {
          var t = e.pos
          if (e.eat(99)) {
            if (this.regexp_eatControlLetter(e)) {
              return true
            }
            e.pos = t
          }
          return false
        }
        Pe.regexp_eatZero = function (e) {
          if (e.current() === 48 && !isDecimalDigit(e.lookahead())) {
            e.lastIntValue = 0
            e.advance()
            return true
          }
          return false
        }
        Pe.regexp_eatControlEscape = function (e) {
          var t = e.current()
          if (t === 116) {
            e.lastIntValue = 9
            e.advance()
            return true
          }
          if (t === 110) {
            e.lastIntValue = 10
            e.advance()
            return true
          }
          if (t === 118) {
            e.lastIntValue = 11
            e.advance()
            return true
          }
          if (t === 102) {
            e.lastIntValue = 12
            e.advance()
            return true
          }
          if (t === 114) {
            e.lastIntValue = 13
            e.advance()
            return true
          }
          return false
        }
        Pe.regexp_eatControlLetter = function (e) {
          var t = e.current()
          if (isControlLetter(t)) {
            e.lastIntValue = t % 32
            e.advance()
            return true
          }
          return false
        }
        function isControlLetter(e) {
          return (e >= 65 && e <= 90) || (e >= 97 && e <= 122)
        }
        Pe.regexp_eatRegExpUnicodeEscapeSequence = function (e, t) {
          if (t === void 0) t = false
          var r = e.pos
          var s = t || e.switchU
          if (e.eat(117)) {
            if (this.regexp_eatFixedHexDigits(e, 4)) {
              var a = e.lastIntValue
              if (s && a >= 55296 && a <= 56319) {
                var o = e.pos
                if (
                  e.eat(92) &&
                  e.eat(117) &&
                  this.regexp_eatFixedHexDigits(e, 4)
                ) {
                  var u = e.lastIntValue
                  if (u >= 56320 && u <= 57343) {
                    e.lastIntValue = (a - 55296) * 1024 + (u - 56320) + 65536
                    return true
                  }
                }
                e.pos = o
                e.lastIntValue = a
              }
              return true
            }
            if (
              s &&
              e.eat(123) &&
              this.regexp_eatHexDigits(e) &&
              e.eat(125) &&
              isValidUnicode(e.lastIntValue)
            ) {
              return true
            }
            if (s) {
              e.raise('Invalid unicode escape')
            }
            e.pos = r
          }
          return false
        }
        function isValidUnicode(e) {
          return e >= 0 && e <= 1114111
        }
        Pe.regexp_eatIdentityEscape = function (e) {
          if (e.switchU) {
            if (this.regexp_eatSyntaxCharacter(e)) {
              return true
            }
            if (e.eat(47)) {
              e.lastIntValue = 47
              return true
            }
            return false
          }
          var t = e.current()
          if (t !== 99 && (!e.switchN || t !== 107)) {
            e.lastIntValue = t
            e.advance()
            return true
          }
          return false
        }
        Pe.regexp_eatDecimalEscape = function (e) {
          e.lastIntValue = 0
          var t = e.current()
          if (t >= 49 && t <= 57) {
            do {
              e.lastIntValue = 10 * e.lastIntValue + (t - 48)
              e.advance()
            } while ((t = e.current()) >= 48 && t <= 57)
            return true
          }
          return false
        }
        Pe.regexp_eatCharacterClassEscape = function (e) {
          var t = e.current()
          if (isCharacterClassEscape(t)) {
            e.lastIntValue = -1
            e.advance()
            return true
          }
          if (
            e.switchU &&
            this.options.ecmaVersion >= 9 &&
            (t === 80 || t === 112)
          ) {
            e.lastIntValue = -1
            e.advance()
            if (
              e.eat(123) &&
              this.regexp_eatUnicodePropertyValueExpression(e) &&
              e.eat(125)
            ) {
              return true
            }
            e.raise('Invalid property name')
          }
          return false
        }
        function isCharacterClassEscape(e) {
          return (
            e === 100 ||
            e === 68 ||
            e === 115 ||
            e === 83 ||
            e === 119 ||
            e === 87
          )
        }
        Pe.regexp_eatUnicodePropertyValueExpression = function (e) {
          var t = e.pos
          if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
            var r = e.lastStringValue
            if (this.regexp_eatUnicodePropertyValue(e)) {
              var s = e.lastStringValue
              this.regexp_validateUnicodePropertyNameAndValue(e, r, s)
              return true
            }
          }
          e.pos = t
          if (this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {
            var a = e.lastStringValue
            this.regexp_validateUnicodePropertyNameOrValue(e, a)
            return true
          }
          return false
        }
        Pe.regexp_validateUnicodePropertyNameAndValue = function (e, t, r) {
          if (!A(e.unicodeProperties.nonBinary, t)) {
            e.raise('Invalid property name')
          }
          if (!e.unicodeProperties.nonBinary[t].test(r)) {
            e.raise('Invalid property value')
          }
        }
        Pe.regexp_validateUnicodePropertyNameOrValue = function (e, t) {
          if (!e.unicodeProperties.binary.test(t)) {
            e.raise('Invalid property name')
          }
        }
        Pe.regexp_eatUnicodePropertyName = function (e) {
          var t = 0
          e.lastStringValue = ''
          while (isUnicodePropertyNameCharacter((t = e.current()))) {
            e.lastStringValue += codePointToString(t)
            e.advance()
          }
          return e.lastStringValue !== ''
        }
        function isUnicodePropertyNameCharacter(e) {
          return isControlLetter(e) || e === 95
        }
        Pe.regexp_eatUnicodePropertyValue = function (e) {
          var t = 0
          e.lastStringValue = ''
          while (isUnicodePropertyValueCharacter((t = e.current()))) {
            e.lastStringValue += codePointToString(t)
            e.advance()
          }
          return e.lastStringValue !== ''
        }
        function isUnicodePropertyValueCharacter(e) {
          return isUnicodePropertyNameCharacter(e) || isDecimalDigit(e)
        }
        Pe.regexp_eatLoneUnicodePropertyNameOrValue = function (e) {
          return this.regexp_eatUnicodePropertyValue(e)
        }
        Pe.regexp_eatCharacterClass = function (e) {
          if (e.eat(91)) {
            e.eat(94)
            this.regexp_classRanges(e)
            if (e.eat(93)) {
              return true
            }
            e.raise('Unterminated character class')
          }
          return false
        }
        Pe.regexp_classRanges = function (e) {
          while (this.regexp_eatClassAtom(e)) {
            var t = e.lastIntValue
            if (e.eat(45) && this.regexp_eatClassAtom(e)) {
              var r = e.lastIntValue
              if (e.switchU && (t === -1 || r === -1)) {
                e.raise('Invalid character class')
              }
              if (t !== -1 && r !== -1 && t > r) {
                e.raise('Range out of order in character class')
              }
            }
          }
        }
        Pe.regexp_eatClassAtom = function (e) {
          var t = e.pos
          if (e.eat(92)) {
            if (this.regexp_eatClassEscape(e)) {
              return true
            }
            if (e.switchU) {
              var r = e.current()
              if (r === 99 || isOctalDigit(r)) {
                e.raise('Invalid class escape')
              }
              e.raise('Invalid escape')
            }
            e.pos = t
          }
          var s = e.current()
          if (s !== 93) {
            e.lastIntValue = s
            e.advance()
            return true
          }
          return false
        }
        Pe.regexp_eatClassEscape = function (e) {
          var t = e.pos
          if (e.eat(98)) {
            e.lastIntValue = 8
            return true
          }
          if (e.switchU && e.eat(45)) {
            e.lastIntValue = 45
            return true
          }
          if (!e.switchU && e.eat(99)) {
            if (this.regexp_eatClassControlLetter(e)) {
              return true
            }
            e.pos = t
          }
          return (
            this.regexp_eatCharacterClassEscape(e) ||
            this.regexp_eatCharacterEscape(e)
          )
        }
        Pe.regexp_eatClassControlLetter = function (e) {
          var t = e.current()
          if (isDecimalDigit(t) || t === 95) {
            e.lastIntValue = t % 32
            e.advance()
            return true
          }
          return false
        }
        Pe.regexp_eatHexEscapeSequence = function (e) {
          var t = e.pos
          if (e.eat(120)) {
            if (this.regexp_eatFixedHexDigits(e, 2)) {
              return true
            }
            if (e.switchU) {
              e.raise('Invalid escape')
            }
            e.pos = t
          }
          return false
        }
        Pe.regexp_eatDecimalDigits = function (e) {
          var t = e.pos
          var r = 0
          e.lastIntValue = 0
          while (isDecimalDigit((r = e.current()))) {
            e.lastIntValue = 10 * e.lastIntValue + (r - 48)
            e.advance()
          }
          return e.pos !== t
        }
        function isDecimalDigit(e) {
          return e >= 48 && e <= 57
        }
        Pe.regexp_eatHexDigits = function (e) {
          var t = e.pos
          var r = 0
          e.lastIntValue = 0
          while (isHexDigit((r = e.current()))) {
            e.lastIntValue = 16 * e.lastIntValue + hexToInt(r)
            e.advance()
          }
          return e.pos !== t
        }
        function isHexDigit(e) {
          return (
            (e >= 48 && e <= 57) ||
            (e >= 65 && e <= 70) ||
            (e >= 97 && e <= 102)
          )
        }
        function hexToInt(e) {
          if (e >= 65 && e <= 70) {
            return 10 + (e - 65)
          }
          if (e >= 97 && e <= 102) {
            return 10 + (e - 97)
          }
          return e - 48
        }
        Pe.regexp_eatLegacyOctalEscapeSequence = function (e) {
          if (this.regexp_eatOctalDigit(e)) {
            var t = e.lastIntValue
            if (this.regexp_eatOctalDigit(e)) {
              var r = e.lastIntValue
              if (t <= 3 && this.regexp_eatOctalDigit(e)) {
                e.lastIntValue = t * 64 + r * 8 + e.lastIntValue
              } else {
                e.lastIntValue = t * 8 + r
              }
            } else {
              e.lastIntValue = t
            }
            return true
          }
          return false
        }
        Pe.regexp_eatOctalDigit = function (e) {
          var t = e.current()
          if (isOctalDigit(t)) {
            e.lastIntValue = t - 48
            e.advance()
            return true
          }
          e.lastIntValue = 0
          return false
        }
        function isOctalDigit(e) {
          return e >= 48 && e <= 55
        }
        Pe.regexp_eatFixedHexDigits = function (e, t) {
          var r = e.pos
          e.lastIntValue = 0
          for (var s = 0; s < t; ++s) {
            var a = e.current()
            if (!isHexDigit(a)) {
              e.pos = r
              return false
            }
            e.lastIntValue = 16 * e.lastIntValue + hexToInt(a)
            e.advance()
          }
          return true
        }
        var je = function Token(e) {
          this.type = e.type
          this.value = e.value
          this.start = e.start
          this.end = e.end
          if (e.options.locations) {
            this.loc = new F(e, e.startLoc, e.endLoc)
          }
          if (e.options.ranges) {
            this.range = [e.start, e.end]
          }
        }
        var Me = Y.prototype
        Me.next = function (e) {
          if (!e && this.type.keyword && this.containsEsc) {
            this.raiseRecoverable(
              this.start,
              'Escape sequence in keyword ' + this.type.keyword
            )
          }
          if (this.options.onToken) {
            this.options.onToken(new je(this))
          }
          this.lastTokEnd = this.end
          this.lastTokStart = this.start
          this.lastTokEndLoc = this.endLoc
          this.lastTokStartLoc = this.startLoc
          this.nextToken()
        }
        Me.getToken = function () {
          this.next()
          return new je(this)
        }
        if (typeof Symbol !== 'undefined') {
          Me[Symbol.iterator] = function () {
            var e = this
            return {
              next: function () {
                var t = e.getToken()
                return { done: t.type === y.eof, value: t }
              },
            }
          }
        }
        Me.nextToken = function () {
          var e = this.curContext()
          if (!e || !e.preserveSpace) {
            this.skipSpace()
          }
          this.start = this.pos
          if (this.options.locations) {
            this.startLoc = this.curPosition()
          }
          if (this.pos >= this.input.length) {
            return this.finishToken(y.eof)
          }
          if (e.override) {
            return e.override(this)
          } else {
            this.readToken(this.fullCharCodeAtPos())
          }
        }
        Me.readToken = function (e) {
          if (isIdentifierStart(e, this.options.ecmaVersion >= 6) || e === 92) {
            return this.readWord()
          }
          return this.getTokenFromCode(e)
        }
        Me.fullCharCodeAtPos = function () {
          var e = this.input.charCodeAt(this.pos)
          if (e <= 55295 || e >= 56320) {
            return e
          }
          var t = this.input.charCodeAt(this.pos + 1)
          return t <= 56319 || t >= 57344 ? e : (e << 10) + t - 56613888
        }
        Me.skipBlockComment = function () {
          var e = this.options.onComment && this.curPosition()
          var t = this.pos,
            r = this.input.indexOf('*/', (this.pos += 2))
          if (r === -1) {
            this.raise(this.pos - 2, 'Unterminated comment')
          }
          this.pos = r + 2
          if (this.options.locations) {
            for (
              var s = void 0, a = t;
              (s = nextLineBreak(this.input, a, this.pos)) > -1;

            ) {
              ++this.curLine
              a = this.lineStart = s
            }
          }
          if (this.options.onComment) {
            this.options.onComment(
              true,
              this.input.slice(t + 2, r),
              t,
              this.pos,
              e,
              this.curPosition()
            )
          }
        }
        Me.skipLineComment = function (e) {
          var t = this.pos
          var r = this.options.onComment && this.curPosition()
          var s = this.input.charCodeAt((this.pos += e))
          while (this.pos < this.input.length && !isNewLine(s)) {
            s = this.input.charCodeAt(++this.pos)
          }
          if (this.options.onComment) {
            this.options.onComment(
              false,
              this.input.slice(t + e, this.pos),
              t,
              this.pos,
              r,
              this.curPosition()
            )
          }
        }
        Me.skipSpace = function () {
          e: while (this.pos < this.input.length) {
            var e = this.input.charCodeAt(this.pos)
            switch (e) {
              case 32:
              case 160:
                ++this.pos
                break
              case 13:
                if (this.input.charCodeAt(this.pos + 1) === 10) {
                  ++this.pos
                }
              case 10:
              case 8232:
              case 8233:
                ++this.pos
                if (this.options.locations) {
                  ++this.curLine
                  this.lineStart = this.pos
                }
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
                  (e > 8 && e < 14) ||
                  (e >= 5760 && x.test(String.fromCharCode(e)))
                ) {
                  ++this.pos
                } else {
                  break e
                }
            }
          }
        }
        Me.finishToken = function (e, t) {
          this.end = this.pos
          if (this.options.locations) {
            this.endLoc = this.curPosition()
          }
          var r = this.type
          this.type = e
          this.value = t
          this.updateContext(r)
        }
        Me.readToken_dot = function () {
          var e = this.input.charCodeAt(this.pos + 1)
          if (e >= 48 && e <= 57) {
            return this.readNumber(true)
          }
          var t = this.input.charCodeAt(this.pos + 2)
          if (this.options.ecmaVersion >= 6 && e === 46 && t === 46) {
            this.pos += 3
            return this.finishToken(y.ellipsis)
          } else {
            ++this.pos
            return this.finishToken(y.dot)
          }
        }
        Me.readToken_slash = function () {
          var e = this.input.charCodeAt(this.pos + 1)
          if (this.exprAllowed) {
            ++this.pos
            return this.readRegexp()
          }
          if (e === 61) {
            return this.finishOp(y.assign, 2)
          }
          return this.finishOp(y.slash, 1)
        }
        Me.readToken_mult_modulo_exp = function (e) {
          var t = this.input.charCodeAt(this.pos + 1)
          var r = 1
          var s = e === 42 ? y.star : y.modulo
          if (this.options.ecmaVersion >= 7 && e === 42 && t === 42) {
            ++r
            s = y.starstar
            t = this.input.charCodeAt(this.pos + 2)
          }
          if (t === 61) {
            return this.finishOp(y.assign, r + 1)
          }
          return this.finishOp(s, r)
        }
        Me.readToken_pipe_amp = function (e) {
          var t = this.input.charCodeAt(this.pos + 1)
          if (t === e) {
            if (this.options.ecmaVersion >= 12) {
              var r = this.input.charCodeAt(this.pos + 2)
              if (r === 61) {
                return this.finishOp(y.assign, 3)
              }
            }
            return this.finishOp(e === 124 ? y.logicalOR : y.logicalAND, 2)
          }
          if (t === 61) {
            return this.finishOp(y.assign, 2)
          }
          return this.finishOp(e === 124 ? y.bitwiseOR : y.bitwiseAND, 1)
        }
        Me.readToken_caret = function () {
          var e = this.input.charCodeAt(this.pos + 1)
          if (e === 61) {
            return this.finishOp(y.assign, 2)
          }
          return this.finishOp(y.bitwiseXOR, 1)
        }
        Me.readToken_plus_min = function (e) {
          var t = this.input.charCodeAt(this.pos + 1)
          if (t === e) {
            if (
              t === 45 &&
              !this.inModule &&
              this.input.charCodeAt(this.pos + 2) === 62 &&
              (this.lastTokEnd === 0 ||
                _.test(this.input.slice(this.lastTokEnd, this.pos)))
            ) {
              this.skipLineComment(3)
              this.skipSpace()
              return this.nextToken()
            }
            return this.finishOp(y.incDec, 2)
          }
          if (t === 61) {
            return this.finishOp(y.assign, 2)
          }
          return this.finishOp(y.plusMin, 1)
        }
        Me.readToken_lt_gt = function (e) {
          var t = this.input.charCodeAt(this.pos + 1)
          var r = 1
          if (t === e) {
            r = e === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2
            if (this.input.charCodeAt(this.pos + r) === 61) {
              return this.finishOp(y.assign, r + 1)
            }
            return this.finishOp(y.bitShift, r)
          }
          if (
            t === 33 &&
            e === 60 &&
            !this.inModule &&
            this.input.charCodeAt(this.pos + 2) === 45 &&
            this.input.charCodeAt(this.pos + 3) === 45
          ) {
            this.skipLineComment(4)
            this.skipSpace()
            return this.nextToken()
          }
          if (t === 61) {
            r = 2
          }
          return this.finishOp(y.relational, r)
        }
        Me.readToken_eq_excl = function (e) {
          var t = this.input.charCodeAt(this.pos + 1)
          if (t === 61) {
            return this.finishOp(
              y.equality,
              this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2
            )
          }
          if (e === 61 && t === 62 && this.options.ecmaVersion >= 6) {
            this.pos += 2
            return this.finishToken(y.arrow)
          }
          return this.finishOp(e === 61 ? y.eq : y.prefix, 1)
        }
        Me.readToken_question = function () {
          var e = this.options.ecmaVersion
          if (e >= 11) {
            var t = this.input.charCodeAt(this.pos + 1)
            if (t === 46) {
              var r = this.input.charCodeAt(this.pos + 2)
              if (r < 48 || r > 57) {
                return this.finishOp(y.questionDot, 2)
              }
            }
            if (t === 63) {
              if (e >= 12) {
                var s = this.input.charCodeAt(this.pos + 2)
                if (s === 61) {
                  return this.finishOp(y.assign, 3)
                }
              }
              return this.finishOp(y.coalesce, 2)
            }
          }
          return this.finishOp(y.question, 1)
        }
        Me.readToken_numberSign = function () {
          var e = this.options.ecmaVersion
          var t = 35
          if (e >= 13) {
            ++this.pos
            t = this.fullCharCodeAtPos()
            if (isIdentifierStart(t, true) || t === 92) {
              return this.finishToken(y.privateId, this.readWord1())
            }
          }
          this.raise(
            this.pos,
            "Unexpected character '" + codePointToString(t) + "'"
          )
        }
        Me.getTokenFromCode = function (e) {
          switch (e) {
            case 46:
              return this.readToken_dot()
            case 40:
              ++this.pos
              return this.finishToken(y.parenL)
            case 41:
              ++this.pos
              return this.finishToken(y.parenR)
            case 59:
              ++this.pos
              return this.finishToken(y.semi)
            case 44:
              ++this.pos
              return this.finishToken(y.comma)
            case 91:
              ++this.pos
              return this.finishToken(y.bracketL)
            case 93:
              ++this.pos
              return this.finishToken(y.bracketR)
            case 123:
              ++this.pos
              return this.finishToken(y.braceL)
            case 125:
              ++this.pos
              return this.finishToken(y.braceR)
            case 58:
              ++this.pos
              return this.finishToken(y.colon)
            case 96:
              if (this.options.ecmaVersion < 6) {
                break
              }
              ++this.pos
              return this.finishToken(y.backQuote)
            case 48:
              var t = this.input.charCodeAt(this.pos + 1)
              if (t === 120 || t === 88) {
                return this.readRadixNumber(16)
              }
              if (this.options.ecmaVersion >= 6) {
                if (t === 111 || t === 79) {
                  return this.readRadixNumber(8)
                }
                if (t === 98 || t === 66) {
                  return this.readRadixNumber(2)
                }
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
              return this.readNumber(false)
            case 34:
            case 39:
              return this.readString(e)
            case 47:
              return this.readToken_slash()
            case 37:
            case 42:
              return this.readToken_mult_modulo_exp(e)
            case 124:
            case 38:
              return this.readToken_pipe_amp(e)
            case 94:
              return this.readToken_caret()
            case 43:
            case 45:
              return this.readToken_plus_min(e)
            case 60:
            case 62:
              return this.readToken_lt_gt(e)
            case 61:
            case 33:
              return this.readToken_eq_excl(e)
            case 63:
              return this.readToken_question()
            case 126:
              return this.finishOp(y.prefix, 1)
            case 35:
              return this.readToken_numberSign()
          }
          this.raise(
            this.pos,
            "Unexpected character '" + codePointToString(e) + "'"
          )
        }
        Me.finishOp = function (e, t) {
          var r = this.input.slice(this.pos, this.pos + t)
          this.pos += t
          return this.finishToken(e, r)
        }
        Me.readRegexp = function () {
          var e,
            t,
            r = this.pos
          for (;;) {
            if (this.pos >= this.input.length) {
              this.raise(r, 'Unterminated regular expression')
            }
            var s = this.input.charAt(this.pos)
            if (_.test(s)) {
              this.raise(r, 'Unterminated regular expression')
            }
            if (!e) {
              if (s === '[') {
                t = true
              } else if (s === ']' && t) {
                t = false
              } else if (s === '/' && !t) {
                break
              }
              e = s === '\\'
            } else {
              e = false
            }
            ++this.pos
          }
          var a = this.input.slice(r, this.pos)
          ++this.pos
          var o = this.pos
          var u = this.readWord1()
          if (this.containsEsc) {
            this.unexpected(o)
          }
          var c = this.regexpState || (this.regexpState = new Be(this))
          c.reset(r, a, u)
          this.validateRegExpFlags(c)
          this.validateRegExpPattern(c)
          var f = null
          try {
            f = new RegExp(a, u)
          } catch (e) {}
          return this.finishToken(y.regexp, { pattern: a, flags: u, value: f })
        }
        Me.readInt = function (e, t, r) {
          var s = this.options.ecmaVersion >= 12 && t === undefined
          var a = r && this.input.charCodeAt(this.pos) === 48
          var o = this.pos,
            u = 0,
            c = 0
          for (
            var f = 0, p = t == null ? Infinity : t;
            f < p;
            ++f, ++this.pos
          ) {
            var h = this.input.charCodeAt(this.pos),
              d = void 0
            if (s && h === 95) {
              if (a) {
                this.raiseRecoverable(
                  this.pos,
                  'Numeric separator is not allowed in legacy octal numeric literals'
                )
              }
              if (c === 95) {
                this.raiseRecoverable(
                  this.pos,
                  'Numeric separator must be exactly one underscore'
                )
              }
              if (f === 0) {
                this.raiseRecoverable(
                  this.pos,
                  'Numeric separator is not allowed at the first of digits'
                )
              }
              c = h
              continue
            }
            if (h >= 97) {
              d = h - 97 + 10
            } else if (h >= 65) {
              d = h - 65 + 10
            } else if (h >= 48 && h <= 57) {
              d = h - 48
            } else {
              d = Infinity
            }
            if (d >= e) {
              break
            }
            c = h
            u = u * e + d
          }
          if (s && c === 95) {
            this.raiseRecoverable(
              this.pos - 1,
              'Numeric separator is not allowed at the last of digits'
            )
          }
          if (this.pos === o || (t != null && this.pos - o !== t)) {
            return null
          }
          return u
        }
        function stringToNumber(e, t) {
          if (t) {
            return parseInt(e, 8)
          }
          return parseFloat(e.replace(/_/g, ''))
        }
        function stringToBigInt(e) {
          if (typeof BigInt !== 'function') {
            return null
          }
          return BigInt(e.replace(/_/g, ''))
        }
        Me.readRadixNumber = function (e) {
          var t = this.pos
          this.pos += 2
          var r = this.readInt(e)
          if (r == null) {
            this.raise(this.start + 2, 'Expected number in radix ' + e)
          }
          if (
            this.options.ecmaVersion >= 11 &&
            this.input.charCodeAt(this.pos) === 110
          ) {
            r = stringToBigInt(this.input.slice(t, this.pos))
            ++this.pos
          } else if (isIdentifierStart(this.fullCharCodeAtPos())) {
            this.raise(this.pos, 'Identifier directly after number')
          }
          return this.finishToken(y.num, r)
        }
        Me.readNumber = function (e) {
          var t = this.pos
          if (!e && this.readInt(10, undefined, true) === null) {
            this.raise(t, 'Invalid number')
          }
          var r = this.pos - t >= 2 && this.input.charCodeAt(t) === 48
          if (r && this.strict) {
            this.raise(t, 'Invalid number')
          }
          var s = this.input.charCodeAt(this.pos)
          if (!r && !e && this.options.ecmaVersion >= 11 && s === 110) {
            var a = stringToBigInt(this.input.slice(t, this.pos))
            ++this.pos
            if (isIdentifierStart(this.fullCharCodeAtPos())) {
              this.raise(this.pos, 'Identifier directly after number')
            }
            return this.finishToken(y.num, a)
          }
          if (r && /[89]/.test(this.input.slice(t, this.pos))) {
            r = false
          }
          if (s === 46 && !r) {
            ++this.pos
            this.readInt(10)
            s = this.input.charCodeAt(this.pos)
          }
          if ((s === 69 || s === 101) && !r) {
            s = this.input.charCodeAt(++this.pos)
            if (s === 43 || s === 45) {
              ++this.pos
            }
            if (this.readInt(10) === null) {
              this.raise(t, 'Invalid number')
            }
          }
          if (isIdentifierStart(this.fullCharCodeAtPos())) {
            this.raise(this.pos, 'Identifier directly after number')
          }
          var o = stringToNumber(this.input.slice(t, this.pos), r)
          return this.finishToken(y.num, o)
        }
        Me.readCodePoint = function () {
          var e = this.input.charCodeAt(this.pos),
            t
          if (e === 123) {
            if (this.options.ecmaVersion < 6) {
              this.unexpected()
            }
            var r = ++this.pos
            t = this.readHexChar(this.input.indexOf('}', this.pos) - this.pos)
            ++this.pos
            if (t > 1114111) {
              this.invalidStringToken(r, 'Code point out of bounds')
            }
          } else {
            t = this.readHexChar(4)
          }
          return t
        }
        Me.readString = function (e) {
          var t = '',
            r = ++this.pos
          for (;;) {
            if (this.pos >= this.input.length) {
              this.raise(this.start, 'Unterminated string constant')
            }
            var s = this.input.charCodeAt(this.pos)
            if (s === e) {
              break
            }
            if (s === 92) {
              t += this.input.slice(r, this.pos)
              t += this.readEscapedChar(false)
              r = this.pos
            } else if (s === 8232 || s === 8233) {
              if (this.options.ecmaVersion < 10) {
                this.raise(this.start, 'Unterminated string constant')
              }
              ++this.pos
              if (this.options.locations) {
                this.curLine++
                this.lineStart = this.pos
              }
            } else {
              if (isNewLine(s)) {
                this.raise(this.start, 'Unterminated string constant')
              }
              ++this.pos
            }
          }
          t += this.input.slice(r, this.pos++)
          return this.finishToken(y.string, t)
        }
        var He = {}
        Me.tryReadTemplateToken = function () {
          this.inTemplateElement = true
          try {
            this.readTmplToken()
          } catch (e) {
            if (e === He) {
              this.readInvalidTemplateToken()
            } else {
              throw e
            }
          }
          this.inTemplateElement = false
        }
        Me.invalidStringToken = function (e, t) {
          if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
            throw He
          } else {
            this.raise(e, t)
          }
        }
        Me.readTmplToken = function () {
          var e = '',
            t = this.pos
          for (;;) {
            if (this.pos >= this.input.length) {
              this.raise(this.start, 'Unterminated template')
            }
            var r = this.input.charCodeAt(this.pos)
            if (
              r === 96 ||
              (r === 36 && this.input.charCodeAt(this.pos + 1) === 123)
            ) {
              if (
                this.pos === this.start &&
                (this.type === y.template || this.type === y.invalidTemplate)
              ) {
                if (r === 36) {
                  this.pos += 2
                  return this.finishToken(y.dollarBraceL)
                } else {
                  ++this.pos
                  return this.finishToken(y.backQuote)
                }
              }
              e += this.input.slice(t, this.pos)
              return this.finishToken(y.template, e)
            }
            if (r === 92) {
              e += this.input.slice(t, this.pos)
              e += this.readEscapedChar(true)
              t = this.pos
            } else if (isNewLine(r)) {
              e += this.input.slice(t, this.pos)
              ++this.pos
              switch (r) {
                case 13:
                  if (this.input.charCodeAt(this.pos) === 10) {
                    ++this.pos
                  }
                case 10:
                  e += '\n'
                  break
                default:
                  e += String.fromCharCode(r)
                  break
              }
              if (this.options.locations) {
                ++this.curLine
                this.lineStart = this.pos
              }
              t = this.pos
            } else {
              ++this.pos
            }
          }
        }
        Me.readInvalidTemplateToken = function () {
          for (; this.pos < this.input.length; this.pos++) {
            switch (this.input[this.pos]) {
              case '\\':
                ++this.pos
                break
              case '$':
                if (this.input[this.pos + 1] !== '{') {
                  break
                }
              case '`':
                return this.finishToken(
                  y.invalidTemplate,
                  this.input.slice(this.start, this.pos)
                )
            }
          }
          this.raise(this.start, 'Unterminated template')
        }
        Me.readEscapedChar = function (e) {
          var t = this.input.charCodeAt(++this.pos)
          ++this.pos
          switch (t) {
            case 110:
              return '\n'
            case 114:
              return '\r'
            case 120:
              return String.fromCharCode(this.readHexChar(2))
            case 117:
              return codePointToString(this.readCodePoint())
            case 116:
              return '\t'
            case 98:
              return '\b'
            case 118:
              return '\v'
            case 102:
              return '\f'
            case 13:
              if (this.input.charCodeAt(this.pos) === 10) {
                ++this.pos
              }
            case 10:
              if (this.options.locations) {
                this.lineStart = this.pos
                ++this.curLine
              }
              return ''
            case 56:
            case 57:
              if (this.strict) {
                this.invalidStringToken(this.pos - 1, 'Invalid escape sequence')
              }
              if (e) {
                var r = this.pos - 1
                this.invalidStringToken(
                  r,
                  'Invalid escape sequence in template string'
                )
                return null
              }
            default:
              if (t >= 48 && t <= 55) {
                var s = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0]
                var a = parseInt(s, 8)
                if (a > 255) {
                  s = s.slice(0, -1)
                  a = parseInt(s, 8)
                }
                this.pos += s.length - 1
                t = this.input.charCodeAt(this.pos)
                if ((s !== '0' || t === 56 || t === 57) && (this.strict || e)) {
                  this.invalidStringToken(
                    this.pos - 1 - s.length,
                    e
                      ? 'Octal literal in template string'
                      : 'Octal literal in strict mode'
                  )
                }
                return String.fromCharCode(a)
              }
              if (isNewLine(t)) {
                return ''
              }
              return String.fromCharCode(t)
          }
        }
        Me.readHexChar = function (e) {
          var t = this.pos
          var r = this.readInt(16, e)
          if (r === null) {
            this.invalidStringToken(t, 'Bad character escape sequence')
          }
          return r
        }
        Me.readWord1 = function () {
          this.containsEsc = false
          var e = '',
            t = true,
            r = this.pos
          var s = this.options.ecmaVersion >= 6
          while (this.pos < this.input.length) {
            var a = this.fullCharCodeAtPos()
            if (isIdentifierChar(a, s)) {
              this.pos += a <= 65535 ? 1 : 2
            } else if (a === 92) {
              this.containsEsc = true
              e += this.input.slice(r, this.pos)
              var o = this.pos
              if (this.input.charCodeAt(++this.pos) !== 117) {
                this.invalidStringToken(
                  this.pos,
                  'Expecting Unicode escape sequence \\uXXXX'
                )
              }
              ++this.pos
              var u = this.readCodePoint()
              if (!(t ? isIdentifierStart : isIdentifierChar)(u, s)) {
                this.invalidStringToken(o, 'Invalid Unicode escape')
              }
              e += codePointToString(u)
              r = this.pos
            } else {
              break
            }
            t = false
          }
          return e + this.input.slice(r, this.pos)
        }
        Me.readWord = function () {
          var e = this.readWord1()
          var t = y.name
          if (this.keywords.test(e)) {
            t = m[e]
          }
          return this.finishToken(t, e)
        }
        var $e = '8.8.1'
        Y.acorn = {
          Parser: Y,
          version: $e,
          defaultOptions: O,
          Position: T,
          SourceLocation: F,
          getLineInfo: getLineInfo,
          Node: be,
          TokenType: d,
          tokTypes: y,
          keywordTypes: m,
          TokContext: le,
          tokContexts: ce,
          isIdentifierChar: isIdentifierChar,
          isIdentifierStart: isIdentifierStart,
          Token: je,
          isNewLine: isNewLine,
          lineBreak: _,
          lineBreakG: D,
          nonASCIIwhitespace: x,
        }
        function parse(e, t) {
          return Y.parse(e, t)
        }
        function parseExpressionAt(e, t, r) {
          return Y.parseExpressionAt(e, t, r)
        }
        function tokenizer(e, t) {
          return Y.tokenizer(e, t)
        }
        e.Node = be
        e.Parser = Y
        e.Position = T
        e.SourceLocation = F
        e.TokContext = le
        e.Token = je
        e.TokenType = d
        e.defaultOptions = O
        e.getLineInfo = getLineInfo
        e.isIdentifierChar = isIdentifierChar
        e.isIdentifierStart = isIdentifierStart
        e.isNewLine = isNewLine
        e.keywordTypes = m
        e.lineBreak = _
        e.lineBreakG = D
        e.nonASCIIwhitespace = x
        e.parse = parse
        e.parseExpressionAt = parseExpressionAt
        e.tokContexts = ce
        e.tokTypes = y
        e.tokenizer = tokenizer
        e.version = $e
        Object.defineProperty(e, '__esModule', { value: true })
      })
    },
    5511: (e) => {
      e.exports = ({ onlyFirst: e = false } = {}) => {
        const t = [
          '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
          '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
        ].join('|')
        return new RegExp(t, e ? undefined : 'g')
      }
    },
    3594: (e) => {
      e.exports = validate
      function isArguments(e) {
        return e != null && typeof e === 'object' && e.hasOwnProperty('callee')
      }
      const t = {
        '*': { label: 'any', check: () => true },
        A: { label: 'array', check: (e) => Array.isArray(e) || isArguments(e) },
        S: { label: 'string', check: (e) => typeof e === 'string' },
        N: { label: 'number', check: (e) => typeof e === 'number' },
        F: { label: 'function', check: (e) => typeof e === 'function' },
        O: {
          label: 'object',
          check: (e) =>
            typeof e === 'object' &&
            e != null &&
            !t.A.check(e) &&
            !t.E.check(e),
        },
        B: { label: 'boolean', check: (e) => typeof e === 'boolean' },
        E: { label: 'error', check: (e) => e instanceof Error },
        Z: { label: 'null', check: (e) => e == null },
      }
      function addSchema(e, t) {
        const r = (t[e.length] = t[e.length] || [])
        if (r.indexOf(e) === -1) r.push(e)
      }
      function validate(e, r) {
        if (arguments.length !== 2)
          throw wrongNumberOfArgs(['SA'], arguments.length)
        if (!e) throw missingRequiredArg(0, 'rawSchemas')
        if (!r) throw missingRequiredArg(1, 'args')
        if (!t.S.check(e)) throw invalidType(0, ['string'], e)
        if (!t.A.check(r)) throw invalidType(1, ['array'], r)
        const s = e.split('|')
        const a = {}
        s.forEach((e) => {
          for (let r = 0; r < e.length; ++r) {
            const s = e[r]
            if (!t[s]) throw unknownType(r, s)
          }
          if (/E.*E/.test(e)) throw moreThanOneError(e)
          addSchema(e, a)
          if (/E/.test(e)) {
            addSchema(e.replace(/E.*$/, 'E'), a)
            addSchema(e.replace(/E/, 'Z'), a)
            if (e.length === 1) addSchema('', a)
          }
        })
        let o = a[r.length]
        if (!o) {
          throw wrongNumberOfArgs(Object.keys(a), r.length)
        }
        for (let e = 0; e < r.length; ++e) {
          let s = o.filter((s) => {
            const a = s[e]
            const o = t[a].check
            return o(r[e])
          })
          if (!s.length) {
            const s = o.map((r) => t[r[e]].label).filter((e) => e != null)
            throw invalidType(e, s, r[e])
          }
          o = s
        }
      }
      function missingRequiredArg(e) {
        return newException(
          'EMISSINGARG',
          'Missing required argument #' + (e + 1)
        )
      }
      function unknownType(e, t) {
        return newException(
          'EUNKNOWNTYPE',
          'Unknown type ' + t + ' in argument #' + (e + 1)
        )
      }
      function invalidType(e, r, s) {
        let a
        Object.keys(t).forEach((e) => {
          if (t[e].check(s)) a = t[e].label
        })
        return newException(
          'EINVALIDTYPE',
          'Argument #' +
            (e + 1) +
            ': Expected ' +
            englishList(r) +
            ' but got ' +
            a
        )
      }
      function englishList(e) {
        return e.join(', ').replace(/, ([^,]+)$/, ' or $1')
      }
      function wrongNumberOfArgs(e, t) {
        const r = englishList(e)
        const s = e.every((e) => e.length === 1) ? 'argument' : 'arguments'
        return newException(
          'EWRONGARGCOUNT',
          'Expected ' + r + ' ' + s + ' but got ' + t
        )
      }
      function moreThanOneError(e) {
        return newException(
          'ETOOMANYERRORTYPES',
          'Only one error type per argument signature is allowed, more than one found in "' +
            e +
            '"'
        )
      }
      function newException(e, t) {
        const r = new Error(t)
        r.code = e
        if (Error.captureStackTrace) Error.captureStackTrace(r, validate)
        return r
      }
    },
    2933: (e, t, r) => {
      t.TrackerGroup = r(7849)
      t.Tracker = r(3041)
      t.TrackerStream = r(8982)
    },
    4938: (e, t, r) => {
      var s = r(2361).EventEmitter
      var a = r(3837)
      var o = 0
      var u = (e.exports = function (e) {
        s.call(this)
        this.id = ++o
        this.name = e
      })
      a.inherits(u, s)
    },
    7849: (e, t, r) => {
      var s = r(3837)
      var a = r(4938)
      var o = r(3041)
      var u = r(8982)
      var c = (e.exports = function (e) {
        a.call(this, e)
        this.parentGroup = null
        this.trackers = []
        this.completion = {}
        this.weight = {}
        this.totalWeight = 0
        this.finished = false
        this.bubbleChange = bubbleChange(this)
      })
      s.inherits(c, a)
      function bubbleChange(e) {
        return function (t, r, s) {
          e.completion[s.id] = r
          if (e.finished) {
            return
          }
          e.emit('change', t || e.name, e.completed(), e)
        }
      }
      c.prototype.nameInTree = function () {
        var e = []
        var t = this
        while (t) {
          e.unshift(t.name)
          t = t.parentGroup
        }
        return e.join('/')
      }
      c.prototype.addUnit = function (e, t) {
        if (e.addUnit) {
          var r = this
          while (r) {
            if (e === r) {
              throw new Error(
                'Attempted to add tracker group ' +
                  e.name +
                  ' to tree that already includes it ' +
                  this.nameInTree(this)
              )
            }
            r = r.parentGroup
          }
          e.parentGroup = this
        }
        this.weight[e.id] = t || 1
        this.totalWeight += this.weight[e.id]
        this.trackers.push(e)
        this.completion[e.id] = e.completed()
        e.on('change', this.bubbleChange)
        if (!this.finished) {
          this.emit('change', e.name, this.completion[e.id], e)
        }
        return e
      }
      c.prototype.completed = function () {
        if (this.trackers.length === 0) {
          return 0
        }
        var e = 1 / this.totalWeight
        var t = 0
        for (var r = 0; r < this.trackers.length; r++) {
          var s = this.trackers[r].id
          t += e * this.weight[s] * this.completion[s]
        }
        return t
      }
      c.prototype.newGroup = function (e, t) {
        return this.addUnit(new c(e), t)
      }
      c.prototype.newItem = function (e, t, r) {
        return this.addUnit(new o(e, t), r)
      }
      c.prototype.newStream = function (e, t, r) {
        return this.addUnit(new u(e, t), r)
      }
      c.prototype.finish = function () {
        this.finished = true
        if (!this.trackers.length) {
          this.addUnit(new o(), 1, true)
        }
        for (var e = 0; e < this.trackers.length; e++) {
          var t = this.trackers[e]
          t.finish()
          t.removeListener('change', this.bubbleChange)
        }
        this.emit('change', this.name, 1, this)
      }
      var f = '                                  '
      c.prototype.debug = function (e) {
        e = e || 0
        var t = e ? f.substr(0, e) : ''
        var r = t + (this.name || 'top') + ': ' + this.completed() + '\n'
        this.trackers.forEach(function (s) {
          if (s instanceof c) {
            r += s.debug(e + 1)
          } else {
            r += t + ' ' + s.name + ': ' + s.completed() + '\n'
          }
        })
        return r
      }
    },
    8982: (e, t, r) => {
      var s = r(3837)
      var a = r(3726)
      var o = r(857)
      var u = r(3041)
      var c = (e.exports = function (e, t, r) {
        a.Transform.call(this, r)
        this.tracker = new u(e, t)
        this.name = e
        this.id = this.tracker.id
        this.tracker.on('change', delegateChange(this))
      })
      s.inherits(c, a.Transform)
      function delegateChange(e) {
        return function (t, r, s) {
          e.emit('change', t, r, e)
        }
      }
      c.prototype._transform = function (e, t, r) {
        this.tracker.completeWork(e.length ? e.length : 1)
        this.push(e)
        r()
      }
      c.prototype._flush = function (e) {
        this.tracker.finish()
        e()
      }
      o(c.prototype, 'tracker')
        .method('completed')
        .method('addWork')
        .method('finish')
    },
    3041: (e, t, r) => {
      var s = r(3837)
      var a = r(4938)
      var o = (e.exports = function (e, t) {
        a.call(this, e)
        this.workDone = 0
        this.workTodo = t || 0
      })
      s.inherits(o, a)
      o.prototype.completed = function () {
        return this.workTodo === 0 ? 0 : this.workDone / this.workTodo
      }
      o.prototype.addWork = function (e) {
        this.workTodo += e
        this.emit('change', this.name, this.completed(), this)
      }
      o.prototype.completeWork = function (e) {
        this.workDone += e
        if (this.workDone > this.workTodo) {
          this.workDone = this.workTodo
        }
        this.emit('change', this.name, this.completed(), this)
      }
      o.prototype.finish = function () {
        this.workTodo = this.workDone = 1
        this.emit('change', this.name, 1, this)
      }
    },
    438: function (e, t, r) {
      var s =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e }
        }
      Object.defineProperty(t, '__esModule', { value: true })
      t.RateLimit = t.Sema = void 0
      const a = s(r(2361))
      function arrayMove(e, t, r, s, a) {
        for (let o = 0; o < a; ++o) {
          r[o + s] = e[o + t]
          e[o + t] = void 0
        }
      }
      function pow2AtLeast(e) {
        e = e >>> 0
        e = e - 1
        e = e | (e >> 1)
        e = e | (e >> 2)
        e = e | (e >> 4)
        e = e | (e >> 8)
        e = e | (e >> 16)
        return e + 1
      }
      function getCapacity(e) {
        return pow2AtLeast(Math.min(Math.max(16, e), 1073741824))
      }
      class Deque {
        constructor(e) {
          this._capacity = getCapacity(e)
          this._length = 0
          this._front = 0
          this.arr = []
        }
        push(e) {
          const t = this._length
          this.checkCapacity(t + 1)
          const r = (this._front + t) & (this._capacity - 1)
          this.arr[r] = e
          this._length = t + 1
          return t + 1
        }
        pop() {
          const e = this._length
          if (e === 0) {
            return void 0
          }
          const t = (this._front + e - 1) & (this._capacity - 1)
          const r = this.arr[t]
          this.arr[t] = void 0
          this._length = e - 1
          return r
        }
        shift() {
          const e = this._length
          if (e === 0) {
            return void 0
          }
          const t = this._front
          const r = this.arr[t]
          this.arr[t] = void 0
          this._front = (t + 1) & (this._capacity - 1)
          this._length = e - 1
          return r
        }
        get length() {
          return this._length
        }
        checkCapacity(e) {
          if (this._capacity < e) {
            this.resizeTo(getCapacity(this._capacity * 1.5 + 16))
          }
        }
        resizeTo(e) {
          const t = this._capacity
          this._capacity = e
          const r = this._front
          const s = this._length
          if (r + s > t) {
            const e = (r + s) & (t - 1)
            arrayMove(this.arr, 0, this.arr, t, e)
          }
        }
      }
      class ReleaseEmitter extends a.default {}
      function isFn(e) {
        return typeof e === 'function'
      }
      function defaultInit() {
        return '1'
      }
      class Sema {
        constructor(
          e,
          {
            initFn: t = defaultInit,
            pauseFn: r,
            resumeFn: s,
            capacity: a = 10,
          } = {}
        ) {
          if (isFn(r) !== isFn(s)) {
            throw new Error('pauseFn and resumeFn must be both set for pausing')
          }
          this.nrTokens = e
          this.free = new Deque(e)
          this.waiting = new Deque(a)
          this.releaseEmitter = new ReleaseEmitter()
          this.noTokens = t === defaultInit
          this.pauseFn = r
          this.resumeFn = s
          this.paused = false
          this.releaseEmitter.on('release', (e) => {
            const t = this.waiting.shift()
            if (t) {
              t.resolve(e)
            } else {
              if (this.resumeFn && this.paused) {
                this.paused = false
                this.resumeFn()
              }
              this.free.push(e)
            }
          })
          for (let r = 0; r < e; r++) {
            this.free.push(t())
          }
        }
        tryAcquire() {
          return this.free.pop()
        }
        async acquire() {
          let e = this.tryAcquire()
          if (e !== void 0) {
            return e
          }
          return new Promise((e, t) => {
            if (this.pauseFn && !this.paused) {
              this.paused = true
              this.pauseFn()
            }
            this.waiting.push({ resolve: e, reject: t })
          })
        }
        release(e) {
          this.releaseEmitter.emit('release', this.noTokens ? '1' : e)
        }
        drain() {
          const e = new Array(this.nrTokens)
          for (let t = 0; t < this.nrTokens; t++) {
            e[t] = this.acquire()
          }
          return Promise.all(e)
        }
        nrWaiting() {
          return this.waiting.length
        }
      }
      t.Sema = Sema
      function RateLimit(
        e,
        { timeUnit: t = 1e3, uniformDistribution: r = false } = {}
      ) {
        const s = new Sema(r ? 1 : e)
        const a = r ? t / e : t
        return async function rl() {
          await s.acquire()
          setTimeout(() => s.release(), a)
        }
      }
      t.RateLimit = RateLimit
    },
    3331: (module, exports, __nccwpck_require__) => {
      var fs = __nccwpck_require__(7147),
        path = __nccwpck_require__(1017),
        fileURLToPath = __nccwpck_require__(7121),
        join = path.join,
        dirname = path.dirname,
        exists =
          (fs.accessSync &&
            function (e) {
              try {
                fs.accessSync(e)
              } catch (e) {
                return false
              }
              return true
            }) ||
          fs.existsSync ||
          path.existsSync,
        defaults = {
          arrow: process.env.NODE_BINDINGS_ARROW || ' → ',
          compiled: process.env.NODE_BINDINGS_COMPILED_DIR || 'compiled',
          platform: process.platform,
          arch: process.arch,
          nodePreGyp:
            'node-v' +
            process.versions.modules +
            '-' +
            process.platform +
            '-' +
            process.arch,
          version: process.versions.node,
          bindings: 'bindings.node',
          try: [
            ['module_root', 'build', 'bindings'],
            ['module_root', 'build', 'Debug', 'bindings'],
            ['module_root', 'build', 'Release', 'bindings'],
            ['module_root', 'out', 'Debug', 'bindings'],
            ['module_root', 'Debug', 'bindings'],
            ['module_root', 'out', 'Release', 'bindings'],
            ['module_root', 'Release', 'bindings'],
            ['module_root', 'build', 'default', 'bindings'],
            [
              'module_root',
              'compiled',
              'version',
              'platform',
              'arch',
              'bindings',
            ],
            [
              'module_root',
              'addon-build',
              'release',
              'install-root',
              'bindings',
            ],
            ['module_root', 'addon-build', 'debug', 'install-root', 'bindings'],
            [
              'module_root',
              'addon-build',
              'default',
              'install-root',
              'bindings',
            ],
            ['module_root', 'lib', 'binding', 'nodePreGyp', 'bindings'],
          ],
        }
      function bindings(opts) {
        if (typeof opts == 'string') {
          opts = { bindings: opts }
        } else if (!opts) {
          opts = {}
        }
        Object.keys(defaults).map(function (e) {
          if (!(e in opts)) opts[e] = defaults[e]
        })
        if (!opts.module_root) {
          opts.module_root = exports.getRoot(exports.getFileName())
        }
        if (path.extname(opts.bindings) != '.node') {
          opts.bindings += '.node'
        }
        var requireFunc = true ? eval('require') : 0
        var tries = [],
          i = 0,
          l = opts.try.length,
          n,
          b,
          err
        for (; i < l; i++) {
          n = join.apply(
            null,
            opts.try[i].map(function (e) {
              return opts[e] || e
            })
          )
          tries.push(n)
          try {
            b = opts.path ? requireFunc.resolve(n) : requireFunc(n)
            if (!opts.path) {
              b.path = n
            }
            return b
          } catch (e) {
            if (
              e.code !== 'MODULE_NOT_FOUND' &&
              e.code !== 'QUALIFIED_PATH_RESOLUTION_FAILED' &&
              !/not find/i.test(e.message)
            ) {
              throw e
            }
          }
        }
        err = new Error(
          'Could not locate the bindings file. Tried:\n' +
            tries
              .map(function (e) {
                return opts.arrow + e
              })
              .join('\n')
        )
        err.tries = tries
        throw err
      }
      module.exports = exports = bindings
      exports.getFileName = function getFileName(e) {
        var t = Error.prepareStackTrace,
          r = Error.stackTraceLimit,
          s = {},
          a
        Error.stackTraceLimit = 10
        Error.prepareStackTrace = function (t, r) {
          for (var s = 0, o = r.length; s < o; s++) {
            a = r[s].getFileName()
            if (a !== __filename) {
              if (e) {
                if (a !== e) {
                  return
                }
              } else {
                return
              }
            }
          }
        }
        Error.captureStackTrace(s)
        s.stack
        Error.prepareStackTrace = t
        Error.stackTraceLimit = r
        var o = 'file://'
        if (a.indexOf(o) === 0) {
          a = fileURLToPath(a)
        }
        return a
      }
      exports.getRoot = function getRoot(e) {
        var t = dirname(e),
          r
        while (true) {
          if (t === '.') {
            t = process.cwd()
          }
          if (
            exists(join(t, 'package.json')) ||
            exists(join(t, 'node_modules'))
          ) {
            return t
          }
          if (r === t) {
            throw new Error(
              'Could not find module root given file: "' +
                e +
                '". Do you have a `package.json` file? '
            )
          }
          r = t
          t = join(t, '..')
        }
      }
    },
    8333: (e, t, r) => {
      const s = r(8137)
      const a = r(8179)
      const o = r(3013)
      const u = r(5719)
      const braces = (e, t = {}) => {
        let r = []
        if (Array.isArray(e)) {
          for (let s of e) {
            let e = braces.create(s, t)
            if (Array.isArray(e)) {
              r.push(...e)
            } else {
              r.push(e)
            }
          }
        } else {
          r = [].concat(braces.create(e, t))
        }
        if (t && t.expand === true && t.nodupes === true) {
          r = [...new Set(r)]
        }
        return r
      }
      braces.parse = (e, t = {}) => u(e, t)
      braces.stringify = (e, t = {}) => {
        if (typeof e === 'string') {
          return s(braces.parse(e, t), t)
        }
        return s(e, t)
      }
      braces.compile = (e, t = {}) => {
        if (typeof e === 'string') {
          e = braces.parse(e, t)
        }
        return a(e, t)
      }
      braces.expand = (e, t = {}) => {
        if (typeof e === 'string') {
          e = braces.parse(e, t)
        }
        let r = o(e, t)
        if (t.noempty === true) {
          r = r.filter(Boolean)
        }
        if (t.nodupes === true) {
          r = [...new Set(r)]
        }
        return r
      }
      braces.create = (e, t = {}) => {
        if (e === '' || e.length < 3) {
          return [e]
        }
        return t.expand !== true ? braces.compile(e, t) : braces.expand(e, t)
      }
      e.exports = braces
    },
    8179: (e, t, r) => {
      const s = r(7783)
      const a = r(5617)
      const compile = (e, t = {}) => {
        let walk = (e, r = {}) => {
          let o = a.isInvalidBrace(r)
          let u = e.invalid === true && t.escapeInvalid === true
          let c = o === true || u === true
          let f = t.escapeInvalid === true ? '\\' : ''
          let p = ''
          if (e.isOpen === true) {
            return f + e.value
          }
          if (e.isClose === true) {
            return f + e.value
          }
          if (e.type === 'open') {
            return c ? f + e.value : '('
          }
          if (e.type === 'close') {
            return c ? f + e.value : ')'
          }
          if (e.type === 'comma') {
            return e.prev.type === 'comma' ? '' : c ? e.value : '|'
          }
          if (e.value) {
            return e.value
          }
          if (e.nodes && e.ranges > 0) {
            let r = a.reduce(e.nodes)
            let o = s(...r, { ...t, wrap: false, toRegex: true })
            if (o.length !== 0) {
              return r.length > 1 && o.length > 1 ? `(${o})` : o
            }
          }
          if (e.nodes) {
            for (let t of e.nodes) {
              p += walk(t, e)
            }
          }
          return p
        }
        return walk(e)
      }
      e.exports = compile
    },
    5457: (e) => {
      e.exports = {
        MAX_LENGTH: 1024 * 64,
        CHAR_0: '0',
        CHAR_9: '9',
        CHAR_UPPERCASE_A: 'A',
        CHAR_LOWERCASE_A: 'a',
        CHAR_UPPERCASE_Z: 'Z',
        CHAR_LOWERCASE_Z: 'z',
        CHAR_LEFT_PARENTHESES: '(',
        CHAR_RIGHT_PARENTHESES: ')',
        CHAR_ASTERISK: '*',
        CHAR_AMPERSAND: '&',
        CHAR_AT: '@',
        CHAR_BACKSLASH: '\\',
        CHAR_BACKTICK: '`',
        CHAR_CARRIAGE_RETURN: '\r',
        CHAR_CIRCUMFLEX_ACCENT: '^',
        CHAR_COLON: ':',
        CHAR_COMMA: ',',
        CHAR_DOLLAR: '$',
        CHAR_DOT: '.',
        CHAR_DOUBLE_QUOTE: '"',
        CHAR_EQUAL: '=',
        CHAR_EXCLAMATION_MARK: '!',
        CHAR_FORM_FEED: '\f',
        CHAR_FORWARD_SLASH: '/',
        CHAR_HASH: '#',
        CHAR_HYPHEN_MINUS: '-',
        CHAR_LEFT_ANGLE_BRACKET: '<',
        CHAR_LEFT_CURLY_BRACE: '{',
        CHAR_LEFT_SQUARE_BRACKET: '[',
        CHAR_LINE_FEED: '\n',
        CHAR_NO_BREAK_SPACE: ' ',
        CHAR_PERCENT: '%',
        CHAR_PLUS: '+',
        CHAR_QUESTION_MARK: '?',
        CHAR_RIGHT_ANGLE_BRACKET: '>',
        CHAR_RIGHT_CURLY_BRACE: '}',
        CHAR_RIGHT_SQUARE_BRACKET: ']',
        CHAR_SEMICOLON: ';',
        CHAR_SINGLE_QUOTE: "'",
        CHAR_SPACE: ' ',
        CHAR_TAB: '\t',
        CHAR_UNDERSCORE: '_',
        CHAR_VERTICAL_LINE: '|',
        CHAR_ZERO_WIDTH_NOBREAK_SPACE: '\ufeff',
      }
    },
    3013: (e, t, r) => {
      const s = r(7783)
      const a = r(8137)
      const o = r(5617)
      const append = (e = '', t = '', r = false) => {
        let s = []
        e = [].concat(e)
        t = [].concat(t)
        if (!t.length) return e
        if (!e.length) {
          return r ? o.flatten(t).map((e) => `{${e}}`) : t
        }
        for (let a of e) {
          if (Array.isArray(a)) {
            for (let e of a) {
              s.push(append(e, t, r))
            }
          } else {
            for (let e of t) {
              if (r === true && typeof e === 'string') e = `{${e}}`
              s.push(Array.isArray(e) ? append(a, e, r) : a + e)
            }
          }
        }
        return o.flatten(s)
      }
      const expand = (e, t = {}) => {
        let r = t.rangeLimit === void 0 ? 1e3 : t.rangeLimit
        let walk = (e, u = {}) => {
          e.queue = []
          let c = u
          let f = u.queue
          while (c.type !== 'brace' && c.type !== 'root' && c.parent) {
            c = c.parent
            f = c.queue
          }
          if (e.invalid || e.dollar) {
            f.push(append(f.pop(), a(e, t)))
            return
          }
          if (
            e.type === 'brace' &&
            e.invalid !== true &&
            e.nodes.length === 2
          ) {
            f.push(append(f.pop(), ['{}']))
            return
          }
          if (e.nodes && e.ranges > 0) {
            let u = o.reduce(e.nodes)
            if (o.exceedsLimit(...u, t.step, r)) {
              throw new RangeError(
                'expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.'
              )
            }
            let c = s(...u, t)
            if (c.length === 0) {
              c = a(e, t)
            }
            f.push(append(f.pop(), c))
            e.nodes = []
            return
          }
          let p = o.encloseBrace(e)
          let h = e.queue
          let d = e
          while (d.type !== 'brace' && d.type !== 'root' && d.parent) {
            d = d.parent
            h = d.queue
          }
          for (let t = 0; t < e.nodes.length; t++) {
            let r = e.nodes[t]
            if (r.type === 'comma' && e.type === 'brace') {
              if (t === 1) h.push('')
              h.push('')
              continue
            }
            if (r.type === 'close') {
              f.push(append(f.pop(), h, p))
              continue
            }
            if (r.value && r.type !== 'open') {
              h.push(append(h.pop(), r.value))
              continue
            }
            if (r.nodes) {
              walk(r, e)
            }
          }
          return h
        }
        return o.flatten(walk(e))
      }
      e.exports = expand
    },
    5719: (e, t, r) => {
      const s = r(8137)
      const {
        MAX_LENGTH: a,
        CHAR_BACKSLASH: o,
        CHAR_BACKTICK: u,
        CHAR_COMMA: c,
        CHAR_DOT: f,
        CHAR_LEFT_PARENTHESES: p,
        CHAR_RIGHT_PARENTHESES: h,
        CHAR_LEFT_CURLY_BRACE: d,
        CHAR_RIGHT_CURLY_BRACE: g,
        CHAR_LEFT_SQUARE_BRACKET: v,
        CHAR_RIGHT_SQUARE_BRACKET: m,
        CHAR_DOUBLE_QUOTE: y,
        CHAR_SINGLE_QUOTE: _,
        CHAR_NO_BREAK_SPACE: D,
        CHAR_ZERO_WIDTH_NOBREAK_SPACE: x,
      } = r(5457)
      const parse = (e, t = {}) => {
        if (typeof e !== 'string') {
          throw new TypeError('Expected a string')
        }
        let r = t || {}
        let E = typeof r.maxLength === 'number' ? Math.min(a, r.maxLength) : a
        if (e.length > E) {
          throw new SyntaxError(
            `Input length (${e.length}), exceeds max characters (${E})`
          )
        }
        let w = { type: 'root', input: e, nodes: [] }
        let C = [w]
        let S = w
        let A = w
        let R = 0
        let k = e.length
        let T = 0
        let F = 0
        let O
        let I = {}
        const advance = () => e[T++]
        const push = (e) => {
          if (e.type === 'text' && A.type === 'dot') {
            A.type = 'text'
          }
          if (A && A.type === 'text' && e.type === 'text') {
            A.value += e.value
            return
          }
          S.nodes.push(e)
          e.parent = S
          e.prev = A
          A = e
          return e
        }
        push({ type: 'bos' })
        while (T < k) {
          S = C[C.length - 1]
          O = advance()
          if (O === x || O === D) {
            continue
          }
          if (O === o) {
            push({ type: 'text', value: (t.keepEscaping ? O : '') + advance() })
            continue
          }
          if (O === m) {
            push({ type: 'text', value: '\\' + O })
            continue
          }
          if (O === v) {
            R++
            let e = true
            let t
            while (T < k && (t = advance())) {
              O += t
              if (t === v) {
                R++
                continue
              }
              if (t === o) {
                O += advance()
                continue
              }
              if (t === m) {
                R--
                if (R === 0) {
                  break
                }
              }
            }
            push({ type: 'text', value: O })
            continue
          }
          if (O === p) {
            S = push({ type: 'paren', nodes: [] })
            C.push(S)
            push({ type: 'text', value: O })
            continue
          }
          if (O === h) {
            if (S.type !== 'paren') {
              push({ type: 'text', value: O })
              continue
            }
            S = C.pop()
            push({ type: 'text', value: O })
            S = C[C.length - 1]
            continue
          }
          if (O === y || O === _ || O === u) {
            let e = O
            let r
            if (t.keepQuotes !== true) {
              O = ''
            }
            while (T < k && (r = advance())) {
              if (r === o) {
                O += r + advance()
                continue
              }
              if (r === e) {
                if (t.keepQuotes === true) O += r
                break
              }
              O += r
            }
            push({ type: 'text', value: O })
            continue
          }
          if (O === d) {
            F++
            let e = (A.value && A.value.slice(-1) === '$') || S.dollar === true
            let t = {
              type: 'brace',
              open: true,
              close: false,
              dollar: e,
              depth: F,
              commas: 0,
              ranges: 0,
              nodes: [],
            }
            S = push(t)
            C.push(S)
            push({ type: 'open', value: O })
            continue
          }
          if (O === g) {
            if (S.type !== 'brace') {
              push({ type: 'text', value: O })
              continue
            }
            let e = 'close'
            S = C.pop()
            S.close = true
            push({ type: e, value: O })
            F--
            S = C[C.length - 1]
            continue
          }
          if (O === c && F > 0) {
            if (S.ranges > 0) {
              S.ranges = 0
              let e = S.nodes.shift()
              S.nodes = [e, { type: 'text', value: s(S) }]
            }
            push({ type: 'comma', value: O })
            S.commas++
            continue
          }
          if (O === f && F > 0 && S.commas === 0) {
            let e = S.nodes
            if (F === 0 || e.length === 0) {
              push({ type: 'text', value: O })
              continue
            }
            if (A.type === 'dot') {
              S.range = []
              A.value += O
              A.type = 'range'
              if (S.nodes.length !== 3 && S.nodes.length !== 5) {
                S.invalid = true
                S.ranges = 0
                A.type = 'text'
                continue
              }
              S.ranges++
              S.args = []
              continue
            }
            if (A.type === 'range') {
              e.pop()
              let t = e[e.length - 1]
              t.value += A.value + O
              A = t
              S.ranges--
              continue
            }
            push({ type: 'dot', value: O })
            continue
          }
          push({ type: 'text', value: O })
        }
        do {
          S = C.pop()
          if (S.type !== 'root') {
            S.nodes.forEach((e) => {
              if (!e.nodes) {
                if (e.type === 'open') e.isOpen = true
                if (e.type === 'close') e.isClose = true
                if (!e.nodes) e.type = 'text'
                e.invalid = true
              }
            })
            let e = C[C.length - 1]
            let t = e.nodes.indexOf(S)
            e.nodes.splice(t, 1, ...S.nodes)
          }
        } while (C.length > 0)
        push({ type: 'eos' })
        return w
      }
      e.exports = parse
    },
    8137: (e, t, r) => {
      const s = r(5617)
      e.exports = (e, t = {}) => {
        let stringify = (e, r = {}) => {
          let a = t.escapeInvalid && s.isInvalidBrace(r)
          let o = e.invalid === true && t.escapeInvalid === true
          let u = ''
          if (e.value) {
            if ((a || o) && s.isOpenOrClose(e)) {
              return '\\' + e.value
            }
            return e.value
          }
          if (e.value) {
            return e.value
          }
          if (e.nodes) {
            for (let t of e.nodes) {
              u += stringify(t)
            }
          }
          return u
        }
        return stringify(e)
      }
    },
    5617: (e, t) => {
      t.isInteger = (e) => {
        if (typeof e === 'number') {
          return Number.isInteger(e)
        }
        if (typeof e === 'string' && e.trim() !== '') {
          return Number.isInteger(Number(e))
        }
        return false
      }
      t.find = (e, t) => e.nodes.find((e) => e.type === t)
      t.exceedsLimit = (e, r, s = 1, a) => {
        if (a === false) return false
        if (!t.isInteger(e) || !t.isInteger(r)) return false
        return (Number(r) - Number(e)) / Number(s) >= a
      }
      t.escapeNode = (e, t = 0, r) => {
        let s = e.nodes[t]
        if (!s) return
        if ((r && s.type === r) || s.type === 'open' || s.type === 'close') {
          if (s.escaped !== true) {
            s.value = '\\' + s.value
            s.escaped = true
          }
        }
      }
      t.encloseBrace = (e) => {
        if (e.type !== 'brace') return false
        if ((e.commas >> (0 + e.ranges)) >> 0 === 0) {
          e.invalid = true
          return true
        }
        return false
      }
      t.isInvalidBrace = (e) => {
        if (e.type !== 'brace') return false
        if (e.invalid === true || e.dollar) return true
        if ((e.commas >> (0 + e.ranges)) >> 0 === 0) {
          e.invalid = true
          return true
        }
        if (e.open !== true || e.close !== true) {
          e.invalid = true
          return true
        }
        return false
      }
      t.isOpenOrClose = (e) => {
        if (e.type === 'open' || e.type === 'close') {
          return true
        }
        return e.open === true || e.close === true
      }
      t.reduce = (e) =>
        e.reduce((e, t) => {
          if (t.type === 'text') e.push(t.value)
          if (t.type === 'range') t.type = 'text'
          return e
        }, [])
      t.flatten = (...e) => {
        const t = []
        const flat = (e) => {
          for (let r = 0; r < e.length; r++) {
            let s = e[r]
            Array.isArray(s) ? flat(s, t) : s !== void 0 && t.push(s)
          }
          return t
        }
        flat(e)
        return t
      }
    },
    5820: (e) => {
      e.exports = colorSupport({ alwaysReturn: true }, colorSupport)
      function hasNone(e, t) {
        e.level = 0
        e.hasBasic = false
        e.has256 = false
        e.has16m = false
        if (!t.alwaysReturn) {
          return false
        }
        return e
      }
      function hasBasic(e) {
        e.hasBasic = true
        e.has256 = false
        e.has16m = false
        e.level = 1
        return e
      }
      function has256(e) {
        e.hasBasic = true
        e.has256 = true
        e.has16m = false
        e.level = 2
        return e
      }
      function has16m(e) {
        e.hasBasic = true
        e.has256 = true
        e.has16m = true
        e.level = 3
        return e
      }
      function colorSupport(e, t) {
        e = e || {}
        t = t || {}
        if (typeof e.level === 'number') {
          switch (e.level) {
            case 0:
              return hasNone(t, e)
            case 1:
              return hasBasic(t)
            case 2:
              return has256(t)
            case 3:
              return has16m(t)
          }
        }
        t.level = 0
        t.hasBasic = false
        t.has256 = false
        t.has16m = false
        if (
          typeof process === 'undefined' ||
          !process ||
          !process.stdout ||
          !process.env ||
          !process.platform
        ) {
          return hasNone(t, e)
        }
        var r = e.env || process.env
        var s = e.stream || process.stdout
        var a = e.term || r.TERM || ''
        var o = e.platform || process.platform
        if (!e.ignoreTTY && !s.isTTY) {
          return hasNone(t, e)
        }
        if (!e.ignoreDumb && a === 'dumb' && !r.COLORTERM) {
          return hasNone(t, e)
        }
        if (o === 'win32') {
          return hasBasic(t)
        }
        if (r.TMUX) {
          return has256(t)
        }
        if (!e.ignoreCI && (r.CI || r.TEAMCITY_VERSION)) {
          if (r.TRAVIS) {
            return has256(t)
          } else {
            return hasNone(t, e)
          }
        }
        switch (r.TERM_PROGRAM) {
          case 'iTerm.app':
            var u = r.TERM_PROGRAM_VERSION || '0.'
            if (/^[0-2]\./.test(u)) {
              return has256(t)
            } else {
              return has16m(t)
            }
          case 'HyperTerm':
          case 'Hyper':
            return has16m(t)
          case 'MacTerm':
            return has16m(t)
          case 'Apple_Terminal':
            return has256(t)
        }
        if (/^xterm-256/.test(a)) {
          return has256(t)
        }
        if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(a)) {
          return hasBasic(t)
        }
        if (r.COLORTERM) {
          return hasBasic(t)
        }
        return hasNone(t, e)
      }
    },
    3844: (e, t) => {
      var r = '['
      t.up = function up(e) {
        return r + (e || '') + 'A'
      }
      t.down = function down(e) {
        return r + (e || '') + 'B'
      }
      t.forward = function forward(e) {
        return r + (e || '') + 'C'
      }
      t.back = function back(e) {
        return r + (e || '') + 'D'
      }
      t.nextLine = function nextLine(e) {
        return r + (e || '') + 'E'
      }
      t.previousLine = function previousLine(e) {
        return r + (e || '') + 'F'
      }
      t.horizontalAbsolute = function horizontalAbsolute(e) {
        if (e == null)
          throw new Error('horizontalAboslute requires a column to position to')
        return r + e + 'G'
      }
      t.eraseData = function eraseData() {
        return r + 'J'
      }
      t.eraseLine = function eraseLine() {
        return r + 'K'
      }
      t.goto = function (e, t) {
        return r + t + ';' + e + 'H'
      }
      t.gotoSOL = function () {
        return '\r'
      }
      t.beep = function () {
        return ''
      }
      t.hideCursor = function hideCursor() {
        return r + '?25l'
      }
      t.showCursor = function showCursor() {
        return r + '?25h'
      }
      var s = {
        reset: 0,
        bold: 1,
        italic: 3,
        underline: 4,
        inverse: 7,
        stopBold: 22,
        stopItalic: 23,
        stopUnderline: 24,
        stopInverse: 27,
        white: 37,
        black: 30,
        blue: 34,
        cyan: 36,
        green: 32,
        magenta: 35,
        red: 31,
        yellow: 33,
        bgWhite: 47,
        bgBlack: 40,
        bgBlue: 44,
        bgCyan: 46,
        bgGreen: 42,
        bgMagenta: 45,
        bgRed: 41,
        bgYellow: 43,
        grey: 90,
        brightBlack: 90,
        brightRed: 91,
        brightGreen: 92,
        brightYellow: 93,
        brightBlue: 94,
        brightMagenta: 95,
        brightCyan: 96,
        brightWhite: 97,
        bgGrey: 100,
        bgBrightBlack: 100,
        bgBrightRed: 101,
        bgBrightGreen: 102,
        bgBrightYellow: 103,
        bgBrightBlue: 104,
        bgBrightMagenta: 105,
        bgBrightCyan: 106,
        bgBrightWhite: 107,
      }
      t.color = function color(e) {
        if (arguments.length !== 1 || !Array.isArray(e)) {
          e = Array.prototype.slice.call(arguments)
        }
        return r + e.map(colorNameToCode).join(';') + 'm'
      }
      function colorNameToCode(e) {
        if (s[e] != null) return s[e]
        throw new Error('Unknown color or style name: ' + e)
      }
    },
    857: (e) => {
      e.exports = Delegator
      function Delegator(e, t) {
        if (!(this instanceof Delegator)) return new Delegator(e, t)
        this.proto = e
        this.target = t
        this.methods = []
        this.getters = []
        this.setters = []
        this.fluents = []
      }
      Delegator.prototype.method = function (e) {
        var t = this.proto
        var r = this.target
        this.methods.push(e)
        t[e] = function () {
          return this[r][e].apply(this[r], arguments)
        }
        return this
      }
      Delegator.prototype.access = function (e) {
        return this.getter(e).setter(e)
      }
      Delegator.prototype.getter = function (e) {
        var t = this.proto
        var r = this.target
        this.getters.push(e)
        t.__defineGetter__(e, function () {
          return this[r][e]
        })
        return this
      }
      Delegator.prototype.setter = function (e) {
        var t = this.proto
        var r = this.target
        this.setters.push(e)
        t.__defineSetter__(e, function (t) {
          return (this[r][e] = t)
        })
        return this
      }
      Delegator.prototype.fluent = function (e) {
        var t = this.proto
        var r = this.target
        this.fluents.push(e)
        t[e] = function (t) {
          if ('undefined' != typeof t) {
            this[r][e] = t
            return this
          } else {
            return this[r][e]
          }
        }
        return this
      }
    },
    6972: (e, t, r) => {
      const s = r(2081)
      const { isLinux: a, getReport: o } = r(974)
      const u =
        'getconf GNU_LIBC_VERSION 2>&1 || true; ldd --version 2>&1 || true'
      let c = ''
      const safeCommand = () => {
        if (!c) {
          return new Promise((e) => {
            s.exec(u, (t, r) => {
              c = t ? ' ' : r
              e(c)
            })
          })
        }
        return c
      }
      const safeCommandSync = () => {
        if (!c) {
          try {
            c = s.execSync(u, { encoding: 'utf8' })
          } catch (e) {
            c = ' '
          }
        }
        return c
      }
      const f = 'glibc'
      const p = 'musl'
      const isFileMusl = (e) =>
        e.includes('libc.musl-') || e.includes('ld-musl-')
      const familyFromReport = () => {
        const e = o()
        if (e.header && e.header.glibcVersionRuntime) {
          return f
        }
        if (Array.isArray(e.sharedObjects)) {
          if (e.sharedObjects.some(isFileMusl)) {
            return p
          }
        }
        return null
      }
      const familyFromCommand = (e) => {
        const [t, r] = e.split(/[\r\n]+/)
        if (t && t.includes(f)) {
          return f
        }
        if (r && r.includes(p)) {
          return p
        }
        return null
      }
      const family = async () => {
        let e = null
        if (a()) {
          e = familyFromReport()
          if (!e) {
            const t = await safeCommand()
            e = familyFromCommand(t)
          }
        }
        return e
      }
      const familySync = () => {
        let e = null
        if (a()) {
          e = familyFromReport()
          if (!e) {
            const t = safeCommandSync()
            e = familyFromCommand(t)
          }
        }
        return e
      }
      const isNonGlibcLinux = async () => a() && (await family()) !== f
      const isNonGlibcLinuxSync = () => a() && familySync() !== f
      const versionFromReport = () => {
        const e = o()
        if (e.header && e.header.glibcVersionRuntime) {
          return e.header.glibcVersionRuntime
        }
        return null
      }
      const versionSuffix = (e) => e.trim().split(/\s+/)[1]
      const versionFromCommand = (e) => {
        const [t, r, s] = e.split(/[\r\n]+/)
        if (t && t.includes(f)) {
          return versionSuffix(t)
        }
        if (r && s && r.includes(p)) {
          return versionSuffix(s)
        }
        return null
      }
      const version = async () => {
        let e = null
        if (a()) {
          e = versionFromReport()
          if (!e) {
            const t = await safeCommand()
            e = versionFromCommand(t)
          }
        }
        return e
      }
      const versionSync = () => {
        let e = null
        if (a()) {
          e = versionFromReport()
          if (!e) {
            const t = safeCommandSync()
            e = versionFromCommand(t)
          }
        }
        return e
      }
      e.exports = {
        GLIBC: f,
        MUSL: p,
        family: family,
        familySync: familySync,
        isNonGlibcLinux: isNonGlibcLinux,
        isNonGlibcLinuxSync: isNonGlibcLinuxSync,
        version: version,
        versionSync: versionSync,
      }
    },
    974: (e) => {
      const isLinux = () => process.platform === 'linux'
      let t = null
      const getReport = () => {
        if (!t) {
          t = isLinux() && process.report ? process.report.getReport() : {}
        }
        return t
      }
      e.exports = { isLinux: isLinux, getReport: getReport }
    },
    3876: (e) => {
      e.exports = function () {
        return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g
      }
    },
    6064: function (e, t) {
      ;(function (e, r) {
        true ? r(t) : 0
      })(this, function (e) {
        function walk(e, { enter: t, leave: r }) {
          visit(e, null, t, r)
        }
        let t = false
        const r = { skip: () => (t = true) }
        const s = {}
        const a = Object.prototype.toString
        function isArray(e) {
          return a.call(e) === '[object Array]'
        }
        function visit(e, a, o, u, c, f) {
          if (!e) return
          if (o) {
            const s = t
            t = false
            o.call(r, e, a, c, f)
            const u = t
            t = s
            if (u) return
          }
          const p =
            (e.type && s[e.type]) ||
            (s[e.type] = Object.keys(e).filter((t) => typeof e[t] === 'object'))
          for (let t = 0; t < p.length; t += 1) {
            const r = p[t]
            const s = e[r]
            if (isArray(s)) {
              for (let t = 0; t < s.length; t += 1) {
                s[t] && s[t].type && visit(s[t], e, o, u, r, t)
              }
            } else if (s && s.type) {
              visit(s, e, o, u, r, null)
            }
          }
          if (u) {
            u(e, a, c, f)
          }
        }
        e.walk = walk
        e.childKeys = s
        Object.defineProperty(e, '__esModule', { value: true })
      })
    },
    7121: (e, t, r) => {
      var s = r(1017).sep || '/'
      e.exports = fileUriToPath
      function fileUriToPath(e) {
        if (
          'string' != typeof e ||
          e.length <= 7 ||
          'file://' != e.substring(0, 7)
        ) {
          throw new TypeError(
            'must pass in a file:// URI to convert to a file path'
          )
        }
        var t = decodeURI(e.substring(7))
        var r = t.indexOf('/')
        var a = t.substring(0, r)
        var o = t.substring(r + 1)
        if ('localhost' == a) a = ''
        if (a) {
          a = s + s + a
        }
        o = o.replace(/^(.+)\|/, '$1:')
        if (s == '\\') {
          o = o.replace(/\//g, '\\')
        }
        if (/^.+\:/.test(o)) {
        } else {
          o = s + o
        }
        return a + o
      }
    },
    7783: (e, t, r) => {
      /*!
       * fill-range <https://github.com/jonschlinkert/fill-range>
       *
       * Copyright (c) 2014-present, Jon Schlinkert.
       * Licensed under the MIT License.
       */ const s = r(3837)
      const a = r(492)
      const isObject = (e) =>
        e !== null && typeof e === 'object' && !Array.isArray(e)
      const transform = (e) => (t) => e === true ? Number(t) : String(t)
      const isValidValue = (e) =>
        typeof e === 'number' || (typeof e === 'string' && e !== '')
      const isNumber = (e) => Number.isInteger(+e)
      const zeros = (e) => {
        let t = `${e}`
        let r = -1
        if (t[0] === '-') t = t.slice(1)
        if (t === '0') return false
        while (t[++r] === '0');
        return r > 0
      }
      const stringify = (e, t, r) => {
        if (typeof e === 'string' || typeof t === 'string') {
          return true
        }
        return r.stringify === true
      }
      const pad = (e, t, r) => {
        if (t > 0) {
          let r = e[0] === '-' ? '-' : ''
          if (r) e = e.slice(1)
          e = r + e.padStart(r ? t - 1 : t, '0')
        }
        if (r === false) {
          return String(e)
        }
        return e
      }
      const toMaxLen = (e, t) => {
        let r = e[0] === '-' ? '-' : ''
        if (r) {
          e = e.slice(1)
          t--
        }
        while (e.length < t) e = '0' + e
        return r ? '-' + e : e
      }
      const toSequence = (e, t) => {
        e.negatives.sort((e, t) => (e < t ? -1 : e > t ? 1 : 0))
        e.positives.sort((e, t) => (e < t ? -1 : e > t ? 1 : 0))
        let r = t.capture ? '' : '?:'
        let s = ''
        let a = ''
        let o
        if (e.positives.length) {
          s = e.positives.join('|')
        }
        if (e.negatives.length) {
          a = `-(${r}${e.negatives.join('|')})`
        }
        if (s && a) {
          o = `${s}|${a}`
        } else {
          o = s || a
        }
        if (t.wrap) {
          return `(${r}${o})`
        }
        return o
      }
      const toRange = (e, t, r, s) => {
        if (r) {
          return a(e, t, { wrap: false, ...s })
        }
        let o = String.fromCharCode(e)
        if (e === t) return o
        let u = String.fromCharCode(t)
        return `[${o}-${u}]`
      }
      const toRegex = (e, t, r) => {
        if (Array.isArray(e)) {
          let t = r.wrap === true
          let s = r.capture ? '' : '?:'
          return t ? `(${s}${e.join('|')})` : e.join('|')
        }
        return a(e, t, r)
      }
      const rangeError = (...e) =>
        new RangeError('Invalid range arguments: ' + s.inspect(...e))
      const invalidRange = (e, t, r) => {
        if (r.strictRanges === true) throw rangeError([e, t])
        return []
      }
      const invalidStep = (e, t) => {
        if (t.strictRanges === true) {
          throw new TypeError(`Expected step "${e}" to be a number`)
        }
        return []
      }
      const fillNumbers = (e, t, r = 1, s = {}) => {
        let a = Number(e)
        let o = Number(t)
        if (!Number.isInteger(a) || !Number.isInteger(o)) {
          if (s.strictRanges === true) throw rangeError([e, t])
          return []
        }
        if (a === 0) a = 0
        if (o === 0) o = 0
        let u = a > o
        let c = String(e)
        let f = String(t)
        let p = String(r)
        r = Math.max(Math.abs(r), 1)
        let h = zeros(c) || zeros(f) || zeros(p)
        let d = h ? Math.max(c.length, f.length, p.length) : 0
        let g = h === false && stringify(e, t, s) === false
        let v = s.transform || transform(g)
        if (s.toRegex && r === 1) {
          return toRange(toMaxLen(e, d), toMaxLen(t, d), true, s)
        }
        let m = { negatives: [], positives: [] }
        let push = (e) => m[e < 0 ? 'negatives' : 'positives'].push(Math.abs(e))
        let y = []
        let _ = 0
        while (u ? a >= o : a <= o) {
          if (s.toRegex === true && r > 1) {
            push(a)
          } else {
            y.push(pad(v(a, _), d, g))
          }
          a = u ? a - r : a + r
          _++
        }
        if (s.toRegex === true) {
          return r > 1
            ? toSequence(m, s)
            : toRegex(y, null, { wrap: false, ...s })
        }
        return y
      }
      const fillLetters = (e, t, r = 1, s = {}) => {
        if ((!isNumber(e) && e.length > 1) || (!isNumber(t) && t.length > 1)) {
          return invalidRange(e, t, s)
        }
        let a = s.transform || ((e) => String.fromCharCode(e))
        let o = `${e}`.charCodeAt(0)
        let u = `${t}`.charCodeAt(0)
        let c = o > u
        let f = Math.min(o, u)
        let p = Math.max(o, u)
        if (s.toRegex && r === 1) {
          return toRange(f, p, false, s)
        }
        let h = []
        let d = 0
        while (c ? o >= u : o <= u) {
          h.push(a(o, d))
          o = c ? o - r : o + r
          d++
        }
        if (s.toRegex === true) {
          return toRegex(h, null, { wrap: false, options: s })
        }
        return h
      }
      const fill = (e, t, r, s = {}) => {
        if (t == null && isValidValue(e)) {
          return [e]
        }
        if (!isValidValue(e) || !isValidValue(t)) {
          return invalidRange(e, t, s)
        }
        if (typeof r === 'function') {
          return fill(e, t, 1, { transform: r })
        }
        if (isObject(r)) {
          return fill(e, t, 0, r)
        }
        let a = { ...s }
        if (a.capture === true) a.wrap = true
        r = r || a.step || 1
        if (!isNumber(r)) {
          if (r != null && !isObject(r)) return invalidStep(r, a)
          return fill(e, t, 1, r)
        }
        if (isNumber(e) && isNumber(t)) {
          return fillNumbers(e, t, r, a)
        }
        return fillLetters(e, t, Math.max(Math.abs(r), 1), a)
      }
      e.exports = fill
    },
    3753: (e, t, r) => {
      var s = r(3084)
      var a = r(9537)
      e.exports = {
        activityIndicator: function (e, t, r) {
          if (e.spun == null) return
          return s(t, e.spun)
        },
        progressbar: function (e, t, r) {
          if (e.completed == null) return
          return a(t, r, e.completed)
        },
      }
    },
    5038: (e, t, r) => {
      var s = r(3837)
      var a = (t.User = function User(e) {
        var t = new Error(e)
        Error.captureStackTrace(t, User)
        t.code = 'EGAUGE'
        return t
      })
      t.MissingTemplateValue = function MissingTemplateValue(e, t) {
        var r = new a(s.format('Missing template value "%s"', e.type))
        Error.captureStackTrace(r, MissingTemplateValue)
        r.template = e
        r.values = t
        return r
      }
      t.Internal = function Internal(e) {
        var t = new Error(e)
        Error.captureStackTrace(t, Internal)
        t.code = 'EGAUGEINTERNAL'
        return t
      }
    },
    2912: (e, t, r) => {
      var s = r(5820)
      e.exports = s().hasBasic
    },
    1285: (e, t, r) => {
      var s = r(9209)
      var a = r(5214)
      var o = r(2912)
      var u = r(7234)
      var c = r(7674)
      var f = r(5839)
      var p = r(216)
      var h = r(7022)
      e.exports = Gauge
      function callWith(e, t) {
        return function () {
          return t.call(e)
        }
      }
      function Gauge(e, t) {
        var r, a
        if (e && e.write) {
          a = e
          r = t || {}
        } else if (t && t.write) {
          a = t
          r = e || {}
        } else {
          a = p.stderr
          r = e || t || {}
        }
        this._status = { spun: 0, section: '', subsection: '' }
        this._paused = false
        this._disabled = true
        this._showing = false
        this._onScreen = false
        this._needsRedraw = false
        this._hideCursor = r.hideCursor == null ? true : r.hideCursor
        this._fixedFramerate =
          r.fixedFramerate == null
            ? !/^v0\.8\./.test(p.version)
            : r.fixedFramerate
        this._lastUpdateAt = null
        this._updateInterval = r.updateInterval == null ? 50 : r.updateInterval
        this._themes = r.themes || c
        this._theme = r.theme
        var o = this._computeTheme(r.theme)
        var u = r.template || [
          { type: 'progressbar', length: 20 },
          { type: 'activityIndicator', kerning: 1, length: 1 },
          { type: 'section', kerning: 1, default: '' },
          { type: 'subsection', kerning: 1, default: '' },
        ]
        this.setWriteTo(a, r.tty)
        var f = r.Plumbing || s
        this._gauge = new f(o, u, this.getWidth())
        this._$$doRedraw = callWith(this, this._doRedraw)
        this._$$handleSizeChange = callWith(this, this._handleSizeChange)
        this._cleanupOnExit = r.cleanupOnExit == null || r.cleanupOnExit
        this._removeOnExit = null
        if (r.enabled || (r.enabled == null && this._tty && this._tty.isTTY)) {
          this.enable()
        } else {
          this.disable()
        }
      }
      Gauge.prototype = {}
      Gauge.prototype.isEnabled = function () {
        return !this._disabled
      }
      Gauge.prototype.setTemplate = function (e) {
        this._gauge.setTemplate(e)
        if (this._showing) this._requestRedraw()
      }
      Gauge.prototype._computeTheme = function (e) {
        if (!e) e = {}
        if (typeof e === 'string') {
          e = this._themes.getTheme(e)
        } else if (
          e &&
          (Object.keys(e).length === 0 ||
            e.hasUnicode != null ||
            e.hasColor != null)
        ) {
          var t = e.hasUnicode == null ? a() : e.hasUnicode
          var r = e.hasColor == null ? o : e.hasColor
          e = this._themes.getDefault({
            hasUnicode: t,
            hasColor: r,
            platform: e.platform,
          })
        }
        return e
      }
      Gauge.prototype.setThemeset = function (e) {
        this._themes = e
        this.setTheme(this._theme)
      }
      Gauge.prototype.setTheme = function (e) {
        this._gauge.setTheme(this._computeTheme(e))
        if (this._showing) this._requestRedraw()
        this._theme = e
      }
      Gauge.prototype._requestRedraw = function () {
        this._needsRedraw = true
        if (!this._fixedFramerate) this._doRedraw()
      }
      Gauge.prototype.getWidth = function () {
        return ((this._tty && this._tty.columns) || 80) - 1
      }
      Gauge.prototype.setWriteTo = function (e, t) {
        var r = !this._disabled
        if (r) this.disable()
        this._writeTo = e
        this._tty =
          t ||
          (e === p.stderr && p.stdout.isTTY && p.stdout) ||
          (e.isTTY && e) ||
          this._tty
        if (this._gauge) this._gauge.setWidth(this.getWidth())
        if (r) this.enable()
      }
      Gauge.prototype.enable = function () {
        if (!this._disabled) return
        this._disabled = false
        if (this._tty) this._enableEvents()
        if (this._showing) this.show()
      }
      Gauge.prototype.disable = function () {
        if (this._disabled) return
        if (this._showing) {
          this._lastUpdateAt = null
          this._showing = false
          this._doRedraw()
          this._showing = true
        }
        this._disabled = true
        if (this._tty) this._disableEvents()
      }
      Gauge.prototype._enableEvents = function () {
        if (this._cleanupOnExit) {
          this._removeOnExit = u(callWith(this, this.disable))
        }
        this._tty.on('resize', this._$$handleSizeChange)
        if (this._fixedFramerate) {
          this.redrawTracker = f(this._$$doRedraw, this._updateInterval)
          if (this.redrawTracker.unref) this.redrawTracker.unref()
        }
      }
      Gauge.prototype._disableEvents = function () {
        this._tty.removeListener('resize', this._$$handleSizeChange)
        if (this._fixedFramerate) clearInterval(this.redrawTracker)
        if (this._removeOnExit) this._removeOnExit()
      }
      Gauge.prototype.hide = function (e) {
        if (this._disabled) return e && p.nextTick(e)
        if (!this._showing) return e && p.nextTick(e)
        this._showing = false
        this._doRedraw()
        e && h(e)
      }
      Gauge.prototype.show = function (e, t) {
        this._showing = true
        if (typeof e === 'string') {
          this._status.section = e
        } else if (typeof e === 'object') {
          var r = Object.keys(e)
          for (var s = 0; s < r.length; ++s) {
            var a = r[s]
            this._status[a] = e[a]
          }
        }
        if (t != null) this._status.completed = t
        if (this._disabled) return
        this._requestRedraw()
      }
      Gauge.prototype.pulse = function (e) {
        this._status.subsection = e || ''
        this._status.spun++
        if (this._disabled) return
        if (!this._showing) return
        this._requestRedraw()
      }
      Gauge.prototype._handleSizeChange = function () {
        this._gauge.setWidth(this._tty.columns - 1)
        this._requestRedraw()
      }
      Gauge.prototype._doRedraw = function () {
        if (this._disabled || this._paused) return
        if (!this._fixedFramerate) {
          var e = Date.now()
          if (
            this._lastUpdateAt &&
            e - this._lastUpdateAt < this._updateInterval
          )
            return
          this._lastUpdateAt = e
        }
        if (!this._showing && this._onScreen) {
          this._onScreen = false
          var t = this._gauge.hide()
          if (this._hideCursor) {
            t += this._gauge.showCursor()
          }
          return this._writeTo.write(t)
        }
        if (!this._showing && !this._onScreen) return
        if (this._showing && !this._onScreen) {
          this._onScreen = true
          this._needsRedraw = true
          if (this._hideCursor) {
            this._writeTo.write(this._gauge.hideCursor())
          }
        }
        if (!this._needsRedraw) return
        if (!this._writeTo.write(this._gauge.show(this._status))) {
          this._paused = true
          this._writeTo.on(
            'drain',
            callWith(this, function () {
              this._paused = false
              this._doRedraw()
            })
          )
        }
      }
    },
    9209: (e, t, r) => {
      var s = r(3844)
      var a = r(3074)
      var o = r(3594)
      var u = (e.exports = function (e, t, r) {
        if (!r) r = 80
        o('OAN', [e, t, r])
        this.showing = false
        this.theme = e
        this.width = r
        this.template = t
      })
      u.prototype = {}
      u.prototype.setTheme = function (e) {
        o('O', [e])
        this.theme = e
      }
      u.prototype.setTemplate = function (e) {
        o('A', [e])
        this.template = e
      }
      u.prototype.setWidth = function (e) {
        o('N', [e])
        this.width = e
      }
      u.prototype.hide = function () {
        return s.gotoSOL() + s.eraseLine()
      }
      u.prototype.hideCursor = s.hideCursor
      u.prototype.showCursor = s.showCursor
      u.prototype.show = function (e) {
        var t = Object.create(this.theme)
        for (var r in e) {
          t[r] = e[r]
        }
        return (
          a(this.width, this.template, t).trim() +
          s.color('reset') +
          s.eraseLine() +
          s.gotoSOL()
        )
      }
    },
    216: (e) => {
      e.exports = process
    },
    9537: (e, t, r) => {
      var s = r(3594)
      var a = r(3074)
      var o = r(7678)
      var u = r(5663)
      e.exports = function (e, t, r) {
        s('ONN', [e, t, r])
        if (r < 0) r = 0
        if (r > 1) r = 1
        if (t <= 0) return ''
        var o = Math.round(t * r)
        var u = t - o
        var c = [
          { type: 'complete', value: repeat(e.complete, o), length: o },
          { type: 'remaining', value: repeat(e.remaining, u), length: u },
        ]
        return a(t, c, e)
      }
      function repeat(e, t) {
        var r = ''
        var s = t
        do {
          if (s % 2) {
            r += e
          }
          s = Math.floor(s / 2)
          e += e
        } while (s && u(r) < t)
        return o(r, t)
      }
    },
    3074: (e, t, r) => {
      var s = r(1365)
      var a = r(3594)
      var o = r(7678)
      var u = r(5038)
      var c = r(5471)
      function renderValueWithValues(e) {
        return function (t) {
          return renderValue(t, e)
        }
      }
      var f = (e.exports = function (e, t, r) {
        var a = prepareItems(e, t, r)
        var u = a.map(renderValueWithValues(r)).join('')
        return s.left(o(u, e), e)
      })
      function preType(e) {
        var t = e.type[0].toUpperCase() + e.type.slice(1)
        return 'pre' + t
      }
      function postType(e) {
        var t = e.type[0].toUpperCase() + e.type.slice(1)
        return 'post' + t
      }
      function hasPreOrPost(e, t) {
        if (!e.type) return
        return t[preType(e)] || t[postType(e)]
      }
      function generatePreAndPost(e, t) {
        var r = Object.assign({}, e)
        var s = Object.create(t)
        var a = []
        var o = preType(r)
        var u = postType(r)
        if (s[o]) {
          a.push({ value: s[o] })
          s[o] = null
        }
        r.minLength = null
        r.length = null
        r.maxLength = null
        a.push(r)
        s[r.type] = s[r.type]
        if (s[u]) {
          a.push({ value: s[u] })
          s[u] = null
        }
        return function (e, t, r) {
          return f(r, a, s)
        }
      }
      function prepareItems(e, t, r) {
        function cloneAndObjectify(t, s, a) {
          var o = new c(t, e)
          var f = o.type
          if (o.value == null) {
            if (!(f in r)) {
              if (o.default == null) {
                throw new u.MissingTemplateValue(o, r)
              } else {
                o.value = o.default
              }
            } else {
              o.value = r[f]
            }
          }
          if (o.value == null || o.value === '') return null
          o.index = s
          o.first = s === 0
          o.last = s === a.length - 1
          if (hasPreOrPost(o, r)) o.value = generatePreAndPost(o, r)
          return o
        }
        var s = t.map(cloneAndObjectify).filter(function (e) {
          return e != null
        })
        var a = e
        var o = s.length
        function consumeSpace(e) {
          if (e > a) e = a
          a -= e
        }
        function finishSizing(e, t) {
          if (e.finished)
            throw new u.Internal(
              'Tried to finish template item that was already finished'
            )
          if (t === Infinity)
            throw new u.Internal('Length of template item cannot be infinity')
          if (t != null) e.length = t
          e.minLength = null
          e.maxLength = null
          --o
          e.finished = true
          if (e.length == null) e.length = e.getBaseLength()
          if (e.length == null)
            throw new u.Internal('Finished template items must have a length')
          consumeSpace(e.getLength())
        }
        s.forEach(function (e) {
          if (!e.kerning) return
          var t = e.first ? 0 : s[e.index - 1].padRight
          if (!e.first && t < e.kerning) e.padLeft = e.kerning - t
          if (!e.last) e.padRight = e.kerning
        })
        s.forEach(function (e) {
          if (e.getBaseLength() == null) return
          finishSizing(e)
        })
        var f = 0
        var p
        var h
        do {
          p = false
          h = Math.round(a / o)
          s.forEach(function (e) {
            if (e.finished) return
            if (!e.maxLength) return
            if (e.getMaxLength() < h) {
              finishSizing(e, e.maxLength)
              p = true
            }
          })
        } while (p && f++ < s.length)
        if (p)
          throw new u.Internal(
            'Resize loop iterated too many times while determining maxLength'
          )
        f = 0
        do {
          p = false
          h = Math.round(a / o)
          s.forEach(function (e) {
            if (e.finished) return
            if (!e.minLength) return
            if (e.getMinLength() >= h) {
              finishSizing(e, e.minLength)
              p = true
            }
          })
        } while (p && f++ < s.length)
        if (p)
          throw new u.Internal(
            'Resize loop iterated too many times while determining minLength'
          )
        h = Math.round(a / o)
        s.forEach(function (e) {
          if (e.finished) return
          finishSizing(e, h)
        })
        return s
      }
      function renderFunction(e, t, r) {
        a('OON', arguments)
        if (e.type) {
          return e.value(t, t[e.type + 'Theme'] || {}, r)
        } else {
          return e.value(t, {}, r)
        }
      }
      function renderValue(e, t) {
        var r = e.getBaseLength()
        var a =
          typeof e.value === 'function' ? renderFunction(e, t, r) : e.value
        if (a == null || a === '') return ''
        var u = s[e.align] || s.left
        var c = e.padLeft ? s.left('', e.padLeft) : ''
        var f = e.padRight ? s.right('', e.padRight) : ''
        var p = o(String(a), r)
        var h = u(p, r)
        return c + h + f
      }
    },
    7022: (e, t, r) => {
      var s = r(216)
      try {
        e.exports = setImmediate
      } catch (t) {
        e.exports = s.nextTick
      }
    },
    5839: (e) => {
      e.exports = setInterval
    },
    3084: (e) => {
      e.exports = function spin(e, t) {
        return e[t % e.length]
      }
    },
    5471: (e, t, r) => {
      var s = r(5663)
      e.exports = TemplateItem
      function isPercent(e) {
        if (typeof e !== 'string') return false
        return e.slice(-1) === '%'
      }
      function percent(e) {
        return Number(e.slice(0, -1)) / 100
      }
      function TemplateItem(e, t) {
        this.overallOutputLength = t
        this.finished = false
        this.type = null
        this.value = null
        this.length = null
        this.maxLength = null
        this.minLength = null
        this.kerning = null
        this.align = 'left'
        this.padLeft = 0
        this.padRight = 0
        this.index = null
        this.first = null
        this.last = null
        if (typeof e === 'string') {
          this.value = e
        } else {
          for (var r in e) this[r] = e[r]
        }
        if (isPercent(this.length)) {
          this.length = Math.round(
            this.overallOutputLength * percent(this.length)
          )
        }
        if (isPercent(this.minLength)) {
          this.minLength = Math.round(
            this.overallOutputLength * percent(this.minLength)
          )
        }
        if (isPercent(this.maxLength)) {
          this.maxLength = Math.round(
            this.overallOutputLength * percent(this.maxLength)
          )
        }
        return this
      }
      TemplateItem.prototype = {}
      TemplateItem.prototype.getBaseLength = function () {
        var e = this.length
        if (
          e == null &&
          typeof this.value === 'string' &&
          this.maxLength == null &&
          this.minLength == null
        ) {
          e = s(this.value)
        }
        return e
      }
      TemplateItem.prototype.getLength = function () {
        var e = this.getBaseLength()
        if (e == null) return null
        return e + this.padLeft + this.padRight
      }
      TemplateItem.prototype.getMaxLength = function () {
        if (this.maxLength == null) return null
        return this.maxLength + this.padLeft + this.padRight
      }
      TemplateItem.prototype.getMinLength = function () {
        if (this.minLength == null) return null
        return this.minLength + this.padLeft + this.padRight
      }
    },
    7719: (e, t, r) => {
      var s = r(3540)
      e.exports = function () {
        return a.newThemeSet()
      }
      var a = {}
      a.baseTheme = r(3753)
      a.newTheme = function (e, t) {
        if (!t) {
          t = e
          e = this.baseTheme
        }
        return s({}, e, t)
      }
      a.getThemeNames = function () {
        return Object.keys(this.themes)
      }
      a.addTheme = function (e, t, r) {
        this.themes[e] = this.newTheme(t, r)
      }
      a.addToAllThemes = function (e) {
        var t = this.themes
        Object.keys(t).forEach(function (r) {
          s(t[r], e)
        })
        s(this.baseTheme, e)
      }
      a.getTheme = function (e) {
        if (!this.themes[e]) throw this.newMissingThemeError(e)
        return this.themes[e]
      }
      a.setDefault = function (e, t) {
        if (t == null) {
          t = e
          e = {}
        }
        var r = e.platform == null ? 'fallback' : e.platform
        var s = !!e.hasUnicode
        var a = !!e.hasColor
        if (!this.defaults[r]) this.defaults[r] = { true: {}, false: {} }
        this.defaults[r][s][a] = t
      }
      a.getDefault = function (e) {
        if (!e) e = {}
        var t = e.platform || process.platform
        var r = this.defaults[t] || this.defaults.fallback
        var a = !!e.hasUnicode
        var o = !!e.hasColor
        if (!r) throw this.newMissingDefaultThemeError(t, a, o)
        if (!r[a][o]) {
          if (a && o && r[!a][o]) {
            a = false
          } else if (a && o && r[a][!o]) {
            o = false
          } else if (a && o && r[!a][!o]) {
            a = false
            o = false
          } else if (a && !o && r[!a][o]) {
            a = false
          } else if (!a && o && r[a][!o]) {
            o = false
          } else if (r === this.defaults.fallback) {
            throw this.newMissingDefaultThemeError(t, a, o)
          }
        }
        if (r[a][o]) {
          return this.getTheme(r[a][o])
        } else {
          return this.getDefault(s({}, e, { platform: 'fallback' }))
        }
      }
      a.newMissingThemeError = function newMissingThemeError(e) {
        var t = new Error('Could not find a gauge theme named "' + e + '"')
        Error.captureStackTrace.call(t, newMissingThemeError)
        t.theme = e
        t.code = 'EMISSINGTHEME'
        return t
      }
      a.newMissingDefaultThemeError = function newMissingDefaultThemeError(
        e,
        t,
        r
      ) {
        var s = new Error(
          'Could not find a gauge theme for your platform/unicode/color use combo:\n' +
            '    platform = ' +
            e +
            '\n' +
            '    hasUnicode = ' +
            t +
            '\n' +
            '    hasColor = ' +
            r
        )
        Error.captureStackTrace.call(s, newMissingDefaultThemeError)
        s.platform = e
        s.hasUnicode = t
        s.hasColor = r
        s.code = 'EMISSINGTHEME'
        return s
      }
      a.newThemeSet = function () {
        var themeset = function (e) {
          return themeset.getDefault(e)
        }
        return s(themeset, a, {
          themes: s({}, this.themes),
          baseTheme: s({}, this.baseTheme),
          defaults: JSON.parse(JSON.stringify(this.defaults || {})),
        })
      }
    },
    7674: (e, t, r) => {
      var s = r(3844).color
      var a = r(7719)
      var o = (e.exports = new a())
      o.addTheme('ASCII', {
        preProgressbar: '[',
        postProgressbar: ']',
        progressbarTheme: { complete: '#', remaining: '.' },
        activityIndicatorTheme: '-\\|/',
        preSubsection: '>',
      })
      o.addTheme('colorASCII', o.getTheme('ASCII'), {
        progressbarTheme: {
          preComplete: s('bgBrightWhite', 'brightWhite'),
          complete: '#',
          postComplete: s('reset'),
          preRemaining: s('bgBrightBlack', 'brightBlack'),
          remaining: '.',
          postRemaining: s('reset'),
        },
      })
      o.addTheme('brailleSpinner', {
        preProgressbar: '⸨',
        postProgressbar: '⸩',
        progressbarTheme: { complete: '#', remaining: '⠂' },
        activityIndicatorTheme: '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏',
        preSubsection: '>',
      })
      o.addTheme('colorBrailleSpinner', o.getTheme('brailleSpinner'), {
        progressbarTheme: {
          preComplete: s('bgBrightWhite', 'brightWhite'),
          complete: '#',
          postComplete: s('reset'),
          preRemaining: s('bgBrightBlack', 'brightBlack'),
          remaining: '⠂',
          postRemaining: s('reset'),
        },
      })
      o.setDefault({}, 'ASCII')
      o.setDefault({ hasColor: true }, 'colorASCII')
      o.setDefault({ platform: 'darwin', hasUnicode: true }, 'brailleSpinner')
      o.setDefault(
        { platform: 'darwin', hasUnicode: true, hasColor: true },
        'colorBrailleSpinner'
      )
      o.setDefault({ platform: 'linux', hasUnicode: true }, 'brailleSpinner')
      o.setDefault(
        { platform: 'linux', hasUnicode: true, hasColor: true },
        'colorBrailleSpinner'
      )
    },
    7678: (e, t, r) => {
      var s = r(5663)
      var a = r(1081)
      e.exports = wideTruncate
      function wideTruncate(e, t) {
        if (s(e) === 0) return e
        if (t <= 0) return ''
        if (s(e) <= t) return e
        var r = a(e)
        var o = e.length + r.length
        var u = e.slice(0, t + o)
        while (s(u) > t) {
          u = u.slice(0, -1)
        }
        return u
      }
    },
    4444: (e) => {
      e.exports = clone
      var t =
        Object.getPrototypeOf ||
        function (e) {
          return e.__proto__
        }
      function clone(e) {
        if (e === null || typeof e !== 'object') return e
        if (e instanceof Object) var r = { __proto__: t(e) }
        else var r = Object.create(null)
        Object.getOwnPropertyNames(e).forEach(function (t) {
          Object.defineProperty(r, t, Object.getOwnPropertyDescriptor(e, t))
        })
        return r
      }
    },
    9165: (e, t, r) => {
      var s = r(7147)
      var a = r(8986)
      var o = r(7078)
      var u = r(4444)
      var c = r(3837)
      var f
      var p
      if (typeof Symbol === 'function' && typeof Symbol.for === 'function') {
        f = Symbol.for('graceful-fs.queue')
        p = Symbol.for('graceful-fs.previous')
      } else {
        f = '___graceful-fs.queue'
        p = '___graceful-fs.previous'
      }
      function noop() {}
      function publishQueue(e, t) {
        Object.defineProperty(e, f, {
          get: function () {
            return t
          },
        })
      }
      var h = noop
      if (c.debuglog) h = c.debuglog('gfs4')
      else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
        h = function () {
          var e = c.format.apply(c, arguments)
          e = 'GFS4: ' + e.split(/\n/).join('\nGFS4: ')
          console.error(e)
        }
      if (!s[f]) {
        var d = global[f] || []
        publishQueue(s, d)
        s.close = (function (e) {
          function close(t, r) {
            return e.call(s, t, function (e) {
              if (!e) {
                resetQueue()
              }
              if (typeof r === 'function') r.apply(this, arguments)
            })
          }
          Object.defineProperty(close, p, { value: e })
          return close
        })(s.close)
        s.closeSync = (function (e) {
          function closeSync(t) {
            e.apply(s, arguments)
            resetQueue()
          }
          Object.defineProperty(closeSync, p, { value: e })
          return closeSync
        })(s.closeSync)
        if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
          process.on('exit', function () {
            h(s[f])
            r(9491).equal(s[f].length, 0)
          })
        }
      }
      if (!global[f]) {
        publishQueue(global, s[f])
      }
      e.exports = patch(u(s))
      if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !s.__patched) {
        e.exports = patch(s)
        s.__patched = true
      }
      function patch(e) {
        a(e)
        e.gracefulify = patch
        e.createReadStream = createReadStream
        e.createWriteStream = createWriteStream
        var t = e.readFile
        e.readFile = readFile
        function readFile(e, r, s) {
          if (typeof r === 'function') (s = r), (r = null)
          return go$readFile(e, r, s)
          function go$readFile(e, r, s, a) {
            return t(e, r, function (t) {
              if (t && (t.code === 'EMFILE' || t.code === 'ENFILE'))
                enqueue([
                  go$readFile,
                  [e, r, s],
                  t,
                  a || Date.now(),
                  Date.now(),
                ])
              else {
                if (typeof s === 'function') s.apply(this, arguments)
              }
            })
          }
        }
        var r = e.writeFile
        e.writeFile = writeFile
        function writeFile(e, t, s, a) {
          if (typeof s === 'function') (a = s), (s = null)
          return go$writeFile(e, t, s, a)
          function go$writeFile(e, t, s, a, o) {
            return r(e, t, s, function (r) {
              if (r && (r.code === 'EMFILE' || r.code === 'ENFILE'))
                enqueue([
                  go$writeFile,
                  [e, t, s, a],
                  r,
                  o || Date.now(),
                  Date.now(),
                ])
              else {
                if (typeof a === 'function') a.apply(this, arguments)
              }
            })
          }
        }
        var s = e.appendFile
        if (s) e.appendFile = appendFile
        function appendFile(e, t, r, a) {
          if (typeof r === 'function') (a = r), (r = null)
          return go$appendFile(e, t, r, a)
          function go$appendFile(e, t, r, a, o) {
            return s(e, t, r, function (s) {
              if (s && (s.code === 'EMFILE' || s.code === 'ENFILE'))
                enqueue([
                  go$appendFile,
                  [e, t, r, a],
                  s,
                  o || Date.now(),
                  Date.now(),
                ])
              else {
                if (typeof a === 'function') a.apply(this, arguments)
              }
            })
          }
        }
        var u = e.copyFile
        if (u) e.copyFile = copyFile
        function copyFile(e, t, r, s) {
          if (typeof r === 'function') {
            s = r
            r = 0
          }
          return go$copyFile(e, t, r, s)
          function go$copyFile(e, t, r, s, a) {
            return u(e, t, r, function (o) {
              if (o && (o.code === 'EMFILE' || o.code === 'ENFILE'))
                enqueue([
                  go$copyFile,
                  [e, t, r, s],
                  o,
                  a || Date.now(),
                  Date.now(),
                ])
              else {
                if (typeof s === 'function') s.apply(this, arguments)
              }
            })
          }
        }
        var c = e.readdir
        e.readdir = readdir
        var f = /^v[0-5]\./
        function readdir(e, t, r) {
          if (typeof t === 'function') (r = t), (t = null)
          var s = f.test(process.version)
            ? function go$readdir(e, t, r, s) {
                return c(e, fs$readdirCallback(e, t, r, s))
              }
            : function go$readdir(e, t, r, s) {
                return c(e, t, fs$readdirCallback(e, t, r, s))
              }
          return s(e, t, r)
          function fs$readdirCallback(e, t, r, a) {
            return function (o, u) {
              if (o && (o.code === 'EMFILE' || o.code === 'ENFILE'))
                enqueue([s, [e, t, r], o, a || Date.now(), Date.now()])
              else {
                if (u && u.sort) u.sort()
                if (typeof r === 'function') r.call(this, o, u)
              }
            }
          }
        }
        if (process.version.substr(0, 4) === 'v0.8') {
          var p = o(e)
          ReadStream = p.ReadStream
          WriteStream = p.WriteStream
        }
        var h = e.ReadStream
        if (h) {
          ReadStream.prototype = Object.create(h.prototype)
          ReadStream.prototype.open = ReadStream$open
        }
        var d = e.WriteStream
        if (d) {
          WriteStream.prototype = Object.create(d.prototype)
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
        var g = ReadStream
        Object.defineProperty(e, 'FileReadStream', {
          get: function () {
            return g
          },
          set: function (e) {
            g = e
          },
          enumerable: true,
          configurable: true,
        })
        var v = WriteStream
        Object.defineProperty(e, 'FileWriteStream', {
          get: function () {
            return v
          },
          set: function (e) {
            v = e
          },
          enumerable: true,
          configurable: true,
        })
        function ReadStream(e, t) {
          if (this instanceof ReadStream) return h.apply(this, arguments), this
          else
            return ReadStream.apply(
              Object.create(ReadStream.prototype),
              arguments
            )
        }
        function ReadStream$open() {
          var e = this
          open(e.path, e.flags, e.mode, function (t, r) {
            if (t) {
              if (e.autoClose) e.destroy()
              e.emit('error', t)
            } else {
              e.fd = r
              e.emit('open', r)
              e.read()
            }
          })
        }
        function WriteStream(e, t) {
          if (this instanceof WriteStream) return d.apply(this, arguments), this
          else
            return WriteStream.apply(
              Object.create(WriteStream.prototype),
              arguments
            )
        }
        function WriteStream$open() {
          var e = this
          open(e.path, e.flags, e.mode, function (t, r) {
            if (t) {
              e.destroy()
              e.emit('error', t)
            } else {
              e.fd = r
              e.emit('open', r)
            }
          })
        }
        function createReadStream(t, r) {
          return new e.ReadStream(t, r)
        }
        function createWriteStream(t, r) {
          return new e.WriteStream(t, r)
        }
        var m = e.open
        e.open = open
        function open(e, t, r, s) {
          if (typeof r === 'function') (s = r), (r = null)
          return go$open(e, t, r, s)
          function go$open(e, t, r, s, a) {
            return m(e, t, r, function (o, u) {
              if (o && (o.code === 'EMFILE' || o.code === 'ENFILE'))
                enqueue([go$open, [e, t, r, s], o, a || Date.now(), Date.now()])
              else {
                if (typeof s === 'function') s.apply(this, arguments)
              }
            })
          }
        }
        return e
      }
      function enqueue(e) {
        h('ENQUEUE', e[0].name, e[1])
        s[f].push(e)
        retry()
      }
      var g
      function resetQueue() {
        var e = Date.now()
        for (var t = 0; t < s[f].length; ++t) {
          if (s[f][t].length > 2) {
            s[f][t][3] = e
            s[f][t][4] = e
          }
        }
        retry()
      }
      function retry() {
        clearTimeout(g)
        g = undefined
        if (s[f].length === 0) return
        var e = s[f].shift()
        var t = e[0]
        var r = e[1]
        var a = e[2]
        var o = e[3]
        var u = e[4]
        if (o === undefined) {
          h('RETRY', t.name, r)
          t.apply(null, r)
        } else if (Date.now() - o >= 6e4) {
          h('TIMEOUT', t.name, r)
          var c = r.pop()
          if (typeof c === 'function') c.call(null, a)
        } else {
          var p = Date.now() - u
          var d = Math.max(u - o, 1)
          var v = Math.min(d * 1.2, 100)
          if (p >= v) {
            h('RETRY', t.name, r)
            t.apply(null, r.concat([o]))
          } else {
            s[f].push(e)
          }
        }
        if (g === undefined) {
          g = setTimeout(retry, 0)
        }
      }
    },
    7078: (e, t, r) => {
      var s = r(2781).Stream
      e.exports = legacy
      function legacy(e) {
        return { ReadStream: ReadStream, WriteStream: WriteStream }
        function ReadStream(t, r) {
          if (!(this instanceof ReadStream)) return new ReadStream(t, r)
          s.call(this)
          var a = this
          this.path = t
          this.fd = null
          this.readable = true
          this.paused = false
          this.flags = 'r'
          this.mode = 438
          this.bufferSize = 64 * 1024
          r = r || {}
          var o = Object.keys(r)
          for (var u = 0, c = o.length; u < c; u++) {
            var f = o[u]
            this[f] = r[f]
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
              a._read()
            })
            return
          }
          e.open(this.path, this.flags, this.mode, function (e, t) {
            if (e) {
              a.emit('error', e)
              a.readable = false
              return
            }
            a.fd = t
            a.emit('open', t)
            a._read()
          })
        }
        function WriteStream(t, r) {
          if (!(this instanceof WriteStream)) return new WriteStream(t, r)
          s.call(this)
          this.path = t
          this.fd = null
          this.writable = true
          this.flags = 'w'
          this.encoding = 'binary'
          this.mode = 438
          this.bytesWritten = 0
          r = r || {}
          var a = Object.keys(r)
          for (var o = 0, u = a.length; o < u; o++) {
            var c = a[o]
            this[c] = r[c]
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
    8986: (e, t, r) => {
      var s = r(2057)
      var a = process.cwd
      var o = null
      var u = process.env.GRACEFUL_FS_PLATFORM || process.platform
      process.cwd = function () {
        if (!o) o = a.call(process)
        return o
      }
      try {
        process.cwd()
      } catch (e) {}
      if (typeof process.chdir === 'function') {
        var c = process.chdir
        process.chdir = function (e) {
          o = null
          c.call(process, e)
        }
        if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, c)
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
          e.lchmod = function (e, t, r) {
            if (r) process.nextTick(r)
          }
          e.lchmodSync = function () {}
        }
        if (e.chown && !e.lchown) {
          e.lchown = function (e, t, r, s) {
            if (s) process.nextTick(s)
          }
          e.lchownSync = function () {}
        }
        if (u === 'win32') {
          e.rename =
            typeof e.rename !== 'function'
              ? e.rename
              : (function (t) {
                  function rename(r, s, a) {
                    var o = Date.now()
                    var u = 0
                    t(r, s, function CB(c) {
                      if (
                        c &&
                        (c.code === 'EACCES' || c.code === 'EPERM') &&
                        Date.now() - o < 6e4
                      ) {
                        setTimeout(function () {
                          e.stat(s, function (e, o) {
                            if (e && e.code === 'ENOENT') t(r, s, CB)
                            else a(c)
                          })
                        }, u)
                        if (u < 100) u += 10
                        return
                      }
                      if (a) a(c)
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
                function read(r, s, a, o, u, c) {
                  var f
                  if (c && typeof c === 'function') {
                    var p = 0
                    f = function (h, d, g) {
                      if (h && h.code === 'EAGAIN' && p < 10) {
                        p++
                        return t.call(e, r, s, a, o, u, f)
                      }
                      c.apply(this, arguments)
                    }
                  }
                  return t.call(e, r, s, a, o, u, f)
                }
                if (Object.setPrototypeOf) Object.setPrototypeOf(read, t)
                return read
              })(e.read)
        e.readSync =
          typeof e.readSync !== 'function'
            ? e.readSync
            : (function (t) {
                return function (r, s, a, o, u) {
                  var c = 0
                  while (true) {
                    try {
                      return t.call(e, r, s, a, o, u)
                    } catch (e) {
                      if (e.code === 'EAGAIN' && c < 10) {
                        c++
                        continue
                      }
                      throw e
                    }
                  }
                }
              })(e.readSync)
        function patchLchmod(e) {
          e.lchmod = function (t, r, a) {
            e.open(t, s.O_WRONLY | s.O_SYMLINK, r, function (t, s) {
              if (t) {
                if (a) a(t)
                return
              }
              e.fchmod(s, r, function (t) {
                e.close(s, function (e) {
                  if (a) a(t || e)
                })
              })
            })
          }
          e.lchmodSync = function (t, r) {
            var a = e.openSync(t, s.O_WRONLY | s.O_SYMLINK, r)
            var o = true
            var u
            try {
              u = e.fchmodSync(a, r)
              o = false
            } finally {
              if (o) {
                try {
                  e.closeSync(a)
                } catch (e) {}
              } else {
                e.closeSync(a)
              }
            }
            return u
          }
        }
        function patchLutimes(e) {
          if (s.hasOwnProperty('O_SYMLINK') && e.futimes) {
            e.lutimes = function (t, r, a, o) {
              e.open(t, s.O_SYMLINK, function (t, s) {
                if (t) {
                  if (o) o(t)
                  return
                }
                e.futimes(s, r, a, function (t) {
                  e.close(s, function (e) {
                    if (o) o(t || e)
                  })
                })
              })
            }
            e.lutimesSync = function (t, r, a) {
              var o = e.openSync(t, s.O_SYMLINK)
              var u
              var c = true
              try {
                u = e.futimesSync(o, r, a)
                c = false
              } finally {
                if (c) {
                  try {
                    e.closeSync(o)
                  } catch (e) {}
                } else {
                  e.closeSync(o)
                }
              }
              return u
            }
          } else if (e.futimes) {
            e.lutimes = function (e, t, r, s) {
              if (s) process.nextTick(s)
            }
            e.lutimesSync = function () {}
          }
        }
        function chmodFix(t) {
          if (!t) return t
          return function (r, s, a) {
            return t.call(e, r, s, function (e) {
              if (chownErOk(e)) e = null
              if (a) a.apply(this, arguments)
            })
          }
        }
        function chmodFixSync(t) {
          if (!t) return t
          return function (r, s) {
            try {
              return t.call(e, r, s)
            } catch (e) {
              if (!chownErOk(e)) throw e
            }
          }
        }
        function chownFix(t) {
          if (!t) return t
          return function (r, s, a, o) {
            return t.call(e, r, s, a, function (e) {
              if (chownErOk(e)) e = null
              if (o) o.apply(this, arguments)
            })
          }
        }
        function chownFixSync(t) {
          if (!t) return t
          return function (r, s, a) {
            try {
              return t.call(e, r, s, a)
            } catch (e) {
              if (!chownErOk(e)) throw e
            }
          }
        }
        function statFix(t) {
          if (!t) return t
          return function (r, s, a) {
            if (typeof s === 'function') {
              a = s
              s = null
            }
            function callback(e, t) {
              if (t) {
                if (t.uid < 0) t.uid += 4294967296
                if (t.gid < 0) t.gid += 4294967296
              }
              if (a) a.apply(this, arguments)
            }
            return s ? t.call(e, r, s, callback) : t.call(e, r, callback)
          }
        }
        function statFixSync(t) {
          if (!t) return t
          return function (r, s) {
            var a = s ? t.call(e, r, s) : t.call(e, r)
            if (a) {
              if (a.uid < 0) a.uid += 4294967296
              if (a.gid < 0) a.gid += 4294967296
            }
            return a
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
    5214: (e, t, r) => {
      var s = r(2037)
      var a = (e.exports = function () {
        if (s.type() == 'Windows_NT') {
          return false
        }
        var e = /UTF-?8$/i
        var t = process.env.LC_ALL || process.env.LC_CTYPE || process.env.LANG
        return e.test(t)
      })
    },
    2842: (e, t, r) => {
      try {
        var s = r(3837)
        if (typeof s.inherits !== 'function') throw ''
        e.exports = s.inherits
      } catch (t) {
        e.exports = r(3782)
      }
    },
    3782: (e) => {
      if (typeof Object.create === 'function') {
        e.exports = function inherits(e, t) {
          if (t) {
            e.super_ = t
            e.prototype = Object.create(t.prototype, {
              constructor: {
                value: e,
                enumerable: false,
                writable: true,
                configurable: true,
              },
            })
          }
        }
      } else {
        e.exports = function inherits(e, t) {
          if (t) {
            e.super_ = t
            var TempCtor = function () {}
            TempCtor.prototype = t.prototype
            e.prototype = new TempCtor()
            e.prototype.constructor = e
          }
        }
      }
    },
    8502: (e) => {
      const isFullwidthCodePoint = (e) => {
        if (Number.isNaN(e)) {
          return false
        }
        if (
          e >= 4352 &&
          (e <= 4447 ||
            e === 9001 ||
            e === 9002 ||
            (11904 <= e && e <= 12871 && e !== 12351) ||
            (12880 <= e && e <= 19903) ||
            (19968 <= e && e <= 42182) ||
            (43360 <= e && e <= 43388) ||
            (44032 <= e && e <= 55203) ||
            (63744 <= e && e <= 64255) ||
            (65040 <= e && e <= 65049) ||
            (65072 <= e && e <= 65131) ||
            (65281 <= e && e <= 65376) ||
            (65504 <= e && e <= 65510) ||
            (110592 <= e && e <= 110593) ||
            (127488 <= e && e <= 127569) ||
            (131072 <= e && e <= 262141))
        ) {
          return true
        }
        return false
      }
      e.exports = isFullwidthCodePoint
      e.exports['default'] = isFullwidthCodePoint
    },
    3357: (e) => {
      /*!
       * is-number <https://github.com/jonschlinkert/is-number>
       *
       * Copyright (c) 2014-present, Jon Schlinkert.
       * Released under the MIT License.
       */ e.exports = function (e) {
        if (typeof e === 'number') {
          return e - e === 0
        }
        if (typeof e === 'string' && e.trim() !== '') {
          return Number.isFinite ? Number.isFinite(+e) : isFinite(+e)
        }
        return false
      }
    },
    1065: (e, t, r) => {
      const s = r(3837)
      const a = r(8333)
      const o = r(3846)
      const u = r(5502)
      const isEmptyString = (e) => e === '' || e === './'
      const micromatch = (e, t, r) => {
        t = [].concat(t)
        e = [].concat(e)
        let s = new Set()
        let a = new Set()
        let u = new Set()
        let c = 0
        let onResult = (e) => {
          u.add(e.output)
          if (r && r.onResult) {
            r.onResult(e)
          }
        }
        for (let u = 0; u < t.length; u++) {
          let f = o(String(t[u]), { ...r, onResult: onResult }, true)
          let p = f.state.negated || f.state.negatedExtglob
          if (p) c++
          for (let t of e) {
            let e = f(t, true)
            let r = p ? !e.isMatch : e.isMatch
            if (!r) continue
            if (p) {
              s.add(e.output)
            } else {
              s.delete(e.output)
              a.add(e.output)
            }
          }
        }
        let f = c === t.length ? [...u] : [...a]
        let p = f.filter((e) => !s.has(e))
        if (r && p.length === 0) {
          if (r.failglob === true) {
            throw new Error(`No matches found for "${t.join(', ')}"`)
          }
          if (r.nonull === true || r.nullglob === true) {
            return r.unescape ? t.map((e) => e.replace(/\\/g, '')) : t
          }
        }
        return p
      }
      micromatch.match = micromatch
      micromatch.matcher = (e, t) => o(e, t)
      micromatch.isMatch = (e, t, r) => o(t, r)(e)
      micromatch.any = micromatch.isMatch
      micromatch.not = (e, t, r = {}) => {
        t = [].concat(t).map(String)
        let s = new Set()
        let a = []
        let onResult = (e) => {
          if (r.onResult) r.onResult(e)
          a.push(e.output)
        }
        let o = new Set(micromatch(e, t, { ...r, onResult: onResult }))
        for (let e of a) {
          if (!o.has(e)) {
            s.add(e)
          }
        }
        return [...s]
      }
      micromatch.contains = (e, t, r) => {
        if (typeof e !== 'string') {
          throw new TypeError(`Expected a string: "${s.inspect(e)}"`)
        }
        if (Array.isArray(t)) {
          return t.some((t) => micromatch.contains(e, t, r))
        }
        if (typeof t === 'string') {
          if (isEmptyString(e) || isEmptyString(t)) {
            return false
          }
          if (e.includes(t) || (e.startsWith('./') && e.slice(2).includes(t))) {
            return true
          }
        }
        return micromatch.isMatch(e, t, { ...r, contains: true })
      }
      micromatch.matchKeys = (e, t, r) => {
        if (!u.isObject(e)) {
          throw new TypeError('Expected the first argument to be an object')
        }
        let s = micromatch(Object.keys(e), t, r)
        let a = {}
        for (let t of s) a[t] = e[t]
        return a
      }
      micromatch.some = (e, t, r) => {
        let s = [].concat(e)
        for (let e of [].concat(t)) {
          let t = o(String(e), r)
          if (s.some((e) => t(e))) {
            return true
          }
        }
        return false
      }
      micromatch.every = (e, t, r) => {
        let s = [].concat(e)
        for (let e of [].concat(t)) {
          let t = o(String(e), r)
          if (!s.every((e) => t(e))) {
            return false
          }
        }
        return true
      }
      micromatch.all = (e, t, r) => {
        if (typeof e !== 'string') {
          throw new TypeError(`Expected a string: "${s.inspect(e)}"`)
        }
        return [].concat(t).every((t) => o(t, r)(e))
      }
      micromatch.capture = (e, t, r) => {
        let s = u.isWindows(r)
        let a = o.makeRe(String(e), { ...r, capture: true })
        let c = a.exec(s ? u.toPosixSlashes(t) : t)
        if (c) {
          return c.slice(1).map((e) => (e === void 0 ? '' : e))
        }
      }
      micromatch.makeRe = (...e) => o.makeRe(...e)
      micromatch.scan = (...e) => o.scan(...e)
      micromatch.parse = (e, t) => {
        let r = []
        for (let s of [].concat(e || [])) {
          for (let e of a(String(s), t)) {
            r.push(o.parse(e, t))
          }
        }
        return r
      }
      micromatch.braces = (e, t) => {
        if (typeof e !== 'string') throw new TypeError('Expected a string')
        if ((t && t.nobrace === true) || !/\{.*\}/.test(e)) {
          return [e]
        }
        return a(e, t)
      }
      micromatch.braceExpand = (e, t) => {
        if (typeof e !== 'string') throw new TypeError('Expected a string')
        return micromatch.braces(e, { ...t, expand: true })
      }
      e.exports = micromatch
    },
    646: (module, __unused_webpack_exports, __nccwpck_require__) => {
      var fs = __nccwpck_require__(7147)
      var path = __nccwpck_require__(1017)
      var os = __nccwpck_require__(2037)
      var runtimeRequire = true ? eval('require') : 0
      var vars = (process.config && process.config.variables) || {}
      var prebuildsOnly = !!process.env.PREBUILDS_ONLY
      var abi = process.versions.modules
      var runtime = isElectron()
        ? 'electron'
        : isNwjs()
        ? 'node-webkit'
        : 'node'
      var arch = process.env.npm_config_arch || os.arch()
      var platform = process.env.npm_config_platform || os.platform()
      var libc = process.env.LIBC || (isAlpine(platform) ? 'musl' : 'glibc')
      var armv =
        process.env.ARM_VERSION ||
        (arch === 'arm64' ? '8' : vars.arm_version) ||
        ''
      var uv = (process.versions.uv || '').split('.')[0]
      module.exports = load
      function load(e) {
        return runtimeRequire(load.path(e))
      }
      load.path = function (e) {
        e = path.resolve(e || '.')
        try {
          var t = runtimeRequire(path.join(e, 'package.json'))
            .name.toUpperCase()
            .replace(/-/g, '_')
          if (process.env[t + '_PREBUILD']) e = process.env[t + '_PREBUILD']
        } catch (e) {}
        if (!prebuildsOnly) {
          var r = getFirst(path.join(e, 'build/Release'), matchBuild)
          if (r) return r
          var s = getFirst(path.join(e, 'build/Debug'), matchBuild)
          if (s) return s
        }
        var a = resolve(e)
        if (a) return a
        var o = resolve(path.dirname(process.execPath))
        if (o) return o
        var u = [
          'platform=' + platform,
          'arch=' + arch,
          'runtime=' + runtime,
          'abi=' + abi,
          'uv=' + uv,
          armv ? 'armv=' + armv : '',
          'libc=' + libc,
          'node=' + process.versions.node,
          process.versions.electron
            ? 'electron=' + process.versions.electron
            : '',
          true ? 'webpack=true' : 0,
        ]
          .filter(Boolean)
          .join(' ')
        throw new Error(
          'No native build was found for ' +
            u +
            '\n    loaded from: ' +
            e +
            '\n'
        )
        function resolve(e) {
          var t = readdirSync(path.join(e, 'prebuilds')).map(parseTuple)
          var r = t.filter(matchTuple(platform, arch)).sort(compareTuples)[0]
          if (!r) return
          var s = path.join(e, 'prebuilds', r.name)
          var a = readdirSync(s).map(parseTags)
          var o = a.filter(matchTags(runtime, abi))
          var u = o.sort(compareTags(runtime))[0]
          if (u) return path.join(s, u.file)
        }
      }
      function readdirSync(e) {
        try {
          return fs.readdirSync(e)
        } catch (e) {
          return []
        }
      }
      function getFirst(e, t) {
        var r = readdirSync(e).filter(t)
        return r[0] && path.join(e, r[0])
      }
      function matchBuild(e) {
        return /\.node$/.test(e)
      }
      function parseTuple(e) {
        var t = e.split('-')
        if (t.length !== 2) return
        var r = t[0]
        var s = t[1].split('+')
        if (!r) return
        if (!s.length) return
        if (!s.every(Boolean)) return
        return { name: e, platform: r, architectures: s }
      }
      function matchTuple(e, t) {
        return function (r) {
          if (r == null) return false
          if (r.platform !== e) return false
          return r.architectures.includes(t)
        }
      }
      function compareTuples(e, t) {
        return e.architectures.length - t.architectures.length
      }
      function parseTags(e) {
        var t = e.split('.')
        var r = t.pop()
        var s = { file: e, specificity: 0 }
        if (r !== 'node') return
        for (var a = 0; a < t.length; a++) {
          var o = t[a]
          if (o === 'node' || o === 'electron' || o === 'node-webkit') {
            s.runtime = o
          } else if (o === 'napi') {
            s.napi = true
          } else if (o.slice(0, 3) === 'abi') {
            s.abi = o.slice(3)
          } else if (o.slice(0, 2) === 'uv') {
            s.uv = o.slice(2)
          } else if (o.slice(0, 4) === 'armv') {
            s.armv = o.slice(4)
          } else if (o === 'glibc' || o === 'musl') {
            s.libc = o
          } else {
            continue
          }
          s.specificity++
        }
        return s
      }
      function matchTags(e, t) {
        return function (r) {
          if (r == null) return false
          if (r.runtime !== e && !runtimeAgnostic(r)) return false
          if (r.abi !== t && !r.napi) return false
          if (r.uv && r.uv !== uv) return false
          if (r.armv && r.armv !== armv) return false
          if (r.libc && r.libc !== libc) return false
          return true
        }
      }
      function runtimeAgnostic(e) {
        return e.runtime === 'node' && e.napi
      }
      function compareTags(e) {
        return function (t, r) {
          if (t.runtime !== r.runtime) {
            return t.runtime === e ? -1 : 1
          } else if (t.abi !== r.abi) {
            return t.abi ? -1 : 1
          } else if (t.specificity !== r.specificity) {
            return t.specificity > r.specificity ? -1 : 1
          } else {
            return 0
          }
        }
      }
      function isNwjs() {
        return !!(process.versions && process.versions.nw)
      }
      function isElectron() {
        if (process.versions && process.versions.electron) return true
        if (process.env.ELECTRON_RUN_AS_NODE) return true
        return (
          typeof window !== 'undefined' &&
          window.process &&
          window.process.type === 'renderer'
        )
      }
      function isAlpine(e) {
        return e === 'linux' && fs.existsSync('/etc/alpine-release')
      }
      load.parseTags = parseTags
      load.matchTags = matchTags
      load.compareTags = compareTags
      load.parseTuple = parseTuple
      load.matchTuple = matchTuple
      load.compareTuples = compareTuples
    },
    1758: (e, t, r) => {
      var s =
        process.env.DEBUG_NOPT || process.env.NOPT_DEBUG
          ? function () {
              console.error.apply(console, arguments)
            }
          : function () {}
      var a = r(7310),
        o = r(1017),
        u = r(2781).Stream,
        c = r(351),
        f = r(2037)
      e.exports = t = nopt
      t.clean = clean
      t.typeDefs = {
        String: { type: String, validate: validateString },
        Boolean: { type: Boolean, validate: validateBoolean },
        url: { type: a, validate: validateUrl },
        Number: { type: Number, validate: validateNumber },
        path: { type: o, validate: validatePath },
        Stream: { type: u, validate: validateStream },
        Date: { type: Date, validate: validateDate },
      }
      function nopt(e, r, a, o) {
        a = a || process.argv
        e = e || {}
        r = r || {}
        if (typeof o !== 'number') o = 2
        s(e, r, a, o)
        a = a.slice(o)
        var u = {},
          c,
          f = { remain: [], cooked: a, original: a.slice(0) }
        parse(a, u, f.remain, e, r)
        clean(u, e, t.typeDefs)
        u.argv = f
        Object.defineProperty(u.argv, 'toString', {
          value: function () {
            return this.original.map(JSON.stringify).join(' ')
          },
          enumerable: false,
        })
        return u
      }
      function clean(e, r, a) {
        a = a || t.typeDefs
        var o = {},
          u = [false, true, null, String, Array]
        Object.keys(e).forEach(function (c) {
          if (c === 'argv') return
          var f = e[c],
            p = Array.isArray(f),
            h = r[c]
          if (!p) f = [f]
          if (!h) h = u
          if (h === Array) h = u.concat(Array)
          if (!Array.isArray(h)) h = [h]
          s('val=%j', f)
          s('types=', h)
          f = f
            .map(function (u) {
              if (typeof u === 'string') {
                s('string %j', u)
                u = u.trim()
                if (
                  (u === 'null' && ~h.indexOf(null)) ||
                  (u === 'true' && (~h.indexOf(true) || ~h.indexOf(Boolean))) ||
                  (u === 'false' && (~h.indexOf(false) || ~h.indexOf(Boolean)))
                ) {
                  u = JSON.parse(u)
                  s('jsonable %j', u)
                } else if (~h.indexOf(Number) && !isNaN(u)) {
                  s('convert to number', u)
                  u = +u
                } else if (~h.indexOf(Date) && !isNaN(Date.parse(u))) {
                  s('convert to date', u)
                  u = new Date(u)
                }
              }
              if (!r.hasOwnProperty(c)) {
                return u
              }
              if (
                u === false &&
                ~h.indexOf(null) &&
                !(~h.indexOf(false) || ~h.indexOf(Boolean))
              ) {
                u = null
              }
              var f = {}
              f[c] = u
              s('prevalidated val', f, u, r[c])
              if (!validate(f, c, u, r[c], a)) {
                if (t.invalidHandler) {
                  t.invalidHandler(c, u, r[c], e)
                } else if (t.invalidHandler !== false) {
                  s('invalid: ' + c + '=' + u, r[c])
                }
                return o
              }
              s('validated val', f, u, r[c])
              return f[c]
            })
            .filter(function (e) {
              return e !== o
            })
          if (!f.length && h.indexOf(Array) === -1) {
            s('VAL HAS NO LENGTH, DELETE IT', f, c, h.indexOf(Array))
            delete e[c]
          } else if (p) {
            s(p, e[c], f)
            e[c] = f
          } else e[c] = f[0]
          s('k=%s val=%j', c, f, e[c])
        })
      }
      function validateString(e, t, r) {
        e[t] = String(r)
      }
      function validatePath(e, t, r) {
        if (r === true) return false
        if (r === null) return true
        r = String(r)
        var s = process.platform === 'win32',
          a = s ? /^~(\/|\\)/ : /^~\//,
          u = f.homedir()
        if (u && r.match(a)) {
          e[t] = o.resolve(u, r.substr(2))
        } else {
          e[t] = o.resolve(r)
        }
        return true
      }
      function validateNumber(e, t, r) {
        s('validate Number %j %j %j', t, r, isNaN(r))
        if (isNaN(r)) return false
        e[t] = +r
      }
      function validateDate(e, t, r) {
        var a = Date.parse(r)
        s('validate Date %j %j %j', t, r, a)
        if (isNaN(a)) return false
        e[t] = new Date(r)
      }
      function validateBoolean(e, t, r) {
        if (r instanceof Boolean) r = r.valueOf()
        else if (typeof r === 'string') {
          if (!isNaN(r)) r = !!+r
          else if (r === 'null' || r === 'false') r = false
          else r = true
        } else r = !!r
        e[t] = r
      }
      function validateUrl(e, t, r) {
        r = a.parse(String(r))
        if (!r.host) return false
        e[t] = r.href
      }
      function validateStream(e, t, r) {
        if (!(r instanceof u)) return false
        e[t] = r
      }
      function validate(e, t, r, a, o) {
        if (Array.isArray(a)) {
          for (var u = 0, c = a.length; u < c; u++) {
            if (a[u] === Array) continue
            if (validate(e, t, r, a[u], o)) return true
          }
          delete e[t]
          return false
        }
        if (a === Array) return true
        if (a !== a) {
          s('Poison NaN', t, r, a)
          delete e[t]
          return false
        }
        if (r === a) {
          s('Explicitly allowed %j', r)
          e[t] = r
          return true
        }
        var f = false,
          p = Object.keys(o)
        for (var u = 0, c = p.length; u < c; u++) {
          s('test type %j %j %j', t, r, p[u])
          var h = o[p[u]]
          if (
            h &&
            (a && a.name && h.type && h.type.name
              ? a.name === h.type.name
              : a === h.type)
          ) {
            var d = {}
            f = false !== h.validate(d, t, r)
            r = d[t]
            if (f) {
              e[t] = r
              break
            }
          }
        }
        s('OK? %j (%j %j %j)', f, t, r, p[u])
        if (!f) delete e[t]
        return f
      }
      function parse(e, t, r, a, o) {
        s('parse', e, t, r)
        var u = null,
          f = c(Object.keys(a)),
          p = c(Object.keys(o))
        for (var h = 0; h < e.length; h++) {
          var d = e[h]
          s('arg', d)
          if (d.match(/^-{2,}$/)) {
            r.push.apply(r, e.slice(h + 1))
            e[h] = '--'
            break
          }
          var g = false
          if (d.charAt(0) === '-' && d.length > 1) {
            var v = d.indexOf('=')
            if (v > -1) {
              g = true
              var m = d.substr(v + 1)
              d = d.substr(0, v)
              e.splice(h, 1, d, m)
            }
            var y = resolveShort(d, o, p, f)
            s('arg=%j shRes=%j', d, y)
            if (y) {
              s(d, y)
              e.splice.apply(e, [h, 1].concat(y))
              if (d !== y[0]) {
                h--
                continue
              }
            }
            d = d.replace(/^-+/, '')
            var _ = null
            while (d.toLowerCase().indexOf('no-') === 0) {
              _ = !_
              d = d.substr(3)
            }
            if (f[d]) d = f[d]
            var D = a[d]
            var x = Array.isArray(D)
            if (x && D.length === 1) {
              x = false
              D = D[0]
            }
            var E = D === Array || (x && D.indexOf(Array) !== -1)
            if (!a.hasOwnProperty(d) && t.hasOwnProperty(d)) {
              if (!Array.isArray(t[d])) t[d] = [t[d]]
              E = true
            }
            var w,
              C = e[h + 1]
            var S =
              typeof _ === 'boolean' ||
              D === Boolean ||
              (x && D.indexOf(Boolean) !== -1) ||
              (typeof D === 'undefined' && !g) ||
              (C === 'false' && (D === null || (x && ~D.indexOf(null))))
            if (S) {
              w = !_
              if (C === 'true' || C === 'false') {
                w = JSON.parse(C)
                C = null
                if (_) w = !w
                h++
              }
              if (x && C) {
                if (~D.indexOf(C)) {
                  w = C
                  h++
                } else if (C === 'null' && ~D.indexOf(null)) {
                  w = null
                  h++
                } else if (
                  !C.match(/^-{2,}[^-]/) &&
                  !isNaN(C) &&
                  ~D.indexOf(Number)
                ) {
                  w = +C
                  h++
                } else if (!C.match(/^-[^-]/) && ~D.indexOf(String)) {
                  w = C
                  h++
                }
              }
              if (E) (t[d] = t[d] || []).push(w)
              else t[d] = w
              continue
            }
            if (D === String) {
              if (C === undefined) {
                C = ''
              } else if (C.match(/^-{1,2}[^-]+/)) {
                C = ''
                h--
              }
            }
            if (C && C.match(/^-{2,}$/)) {
              C = undefined
              h--
            }
            w = C === undefined ? true : C
            if (E) (t[d] = t[d] || []).push(w)
            else t[d] = w
            h++
            continue
          }
          r.push(d)
        }
      }
      function resolveShort(e, t, r, a) {
        e = e.replace(/^-+/, '')
        if (a[e] === e) return null
        if (t[e]) {
          if (t[e] && !Array.isArray(t[e])) t[e] = t[e].split(/\s+/)
          return t[e]
        }
        var o = t.___singles
        if (!o) {
          o = Object.keys(t)
            .filter(function (e) {
              return e.length === 1
            })
            .reduce(function (e, t) {
              e[t] = true
              return e
            }, {})
          t.___singles = o
          s('shorthand singles', o)
        }
        var u = e.split('').filter(function (e) {
          return o[e]
        })
        if (u.join('') === e)
          return u
            .map(function (e) {
              return t[e]
            })
            .reduce(function (e, t) {
              return e.concat(t)
            }, [])
        if (a[e] && !t[e]) return null
        if (r[e]) e = r[e]
        if (t[e] && !Array.isArray(t[e])) t[e] = t[e].split(/\s+/)
        return t[e]
      }
    },
    1069: (e, t, r) => {
      var s = r(2933)
      var a = r(1285)
      var o = r(2361).EventEmitter
      var u = (t = e.exports = new o())
      var c = r(3837)
      var f = r(2656)
      var p = r(3844)
      f(true)
      var h = process.stderr
      Object.defineProperty(u, 'stream', {
        set: function (e) {
          h = e
          if (this.gauge) {
            this.gauge.setWriteTo(h, h)
          }
        },
        get: function () {
          return h
        },
      })
      var d
      u.useColor = function () {
        return d != null ? d : h.isTTY
      }
      u.enableColor = function () {
        d = true
        this.gauge.setTheme({ hasColor: d, hasUnicode: g })
      }
      u.disableColor = function () {
        d = false
        this.gauge.setTheme({ hasColor: d, hasUnicode: g })
      }
      u.level = 'info'
      u.gauge = new a(h, {
        enabled: false,
        theme: { hasColor: u.useColor() },
        template: [
          { type: 'progressbar', length: 20 },
          { type: 'activityIndicator', kerning: 1, length: 1 },
          { type: 'section', default: '' },
          ':',
          { type: 'logline', kerning: 1, default: '' },
        ],
      })
      u.tracker = new s.TrackerGroup()
      u.progressEnabled = u.gauge.isEnabled()
      var g
      u.enableUnicode = function () {
        g = true
        this.gauge.setTheme({ hasColor: this.useColor(), hasUnicode: g })
      }
      u.disableUnicode = function () {
        g = false
        this.gauge.setTheme({ hasColor: this.useColor(), hasUnicode: g })
      }
      u.setGaugeThemeset = function (e) {
        this.gauge.setThemeset(e)
      }
      u.setGaugeTemplate = function (e) {
        this.gauge.setTemplate(e)
      }
      u.enableProgress = function () {
        if (this.progressEnabled) {
          return
        }
        this.progressEnabled = true
        this.tracker.on('change', this.showProgress)
        if (this._paused) {
          return
        }
        this.gauge.enable()
      }
      u.disableProgress = function () {
        if (!this.progressEnabled) {
          return
        }
        this.progressEnabled = false
        this.tracker.removeListener('change', this.showProgress)
        this.gauge.disable()
      }
      var v = ['newGroup', 'newItem', 'newStream']
      var mixinLog = function (e) {
        Object.keys(u).forEach(function (t) {
          if (t[0] === '_') {
            return
          }
          if (
            v.filter(function (e) {
              return e === t
            }).length
          ) {
            return
          }
          if (e[t]) {
            return
          }
          if (typeof u[t] !== 'function') {
            return
          }
          var r = u[t]
          e[t] = function () {
            return r.apply(u, arguments)
          }
        })
        if (e instanceof s.TrackerGroup) {
          v.forEach(function (t) {
            var r = e[t]
            e[t] = function () {
              return mixinLog(r.apply(e, arguments))
            }
          })
        }
        return e
      }
      v.forEach(function (e) {
        u[e] = function () {
          return mixinLog(this.tracker[e].apply(this.tracker, arguments))
        }
      })
      u.clearProgress = function (e) {
        if (!this.progressEnabled) {
          return e && process.nextTick(e)
        }
        this.gauge.hide(e)
      }
      u.showProgress = function (e, t) {
        if (!this.progressEnabled) {
          return
        }
        var r = {}
        if (e) {
          r.section = e
        }
        var s = u.record[u.record.length - 1]
        if (s) {
          r.subsection = s.prefix
          var a = u.disp[s.level] || s.level
          var o = this._format(a, u.style[s.level])
          if (s.prefix) {
            o += ' ' + this._format(s.prefix, this.prefixStyle)
          }
          o += ' ' + s.message.split(/\r?\n/)[0]
          r.logline = o
        }
        r.completed = t || this.tracker.completed()
        this.gauge.show(r)
      }.bind(u)
      u.pause = function () {
        this._paused = true
        if (this.progressEnabled) {
          this.gauge.disable()
        }
      }
      u.resume = function () {
        if (!this._paused) {
          return
        }
        this._paused = false
        var e = this._buffer
        this._buffer = []
        e.forEach(function (e) {
          this.emitLog(e)
        }, this)
        if (this.progressEnabled) {
          this.gauge.enable()
        }
      }
      u._buffer = []
      var m = 0
      u.record = []
      u.maxRecordSize = 1e4
      u.log = function (e, t, r) {
        var s = this.levels[e]
        if (s === undefined) {
          return this.emit(
            'error',
            new Error(c.format('Undefined log level: %j', e))
          )
        }
        var a = new Array(arguments.length - 2)
        var o = null
        for (var u = 2; u < arguments.length; u++) {
          var f = (a[u - 2] = arguments[u])
          if (typeof f === 'object' && f instanceof Error && f.stack) {
            Object.defineProperty(f, 'stack', {
              value: (o = f.stack + ''),
              enumerable: true,
              writable: true,
            })
          }
        }
        if (o) {
          a.unshift(o + '\n')
        }
        r = c.format.apply(c, a)
        var p = {
          id: m++,
          level: e,
          prefix: String(t || ''),
          message: r,
          messageRaw: a,
        }
        this.emit('log', p)
        this.emit('log.' + e, p)
        if (p.prefix) {
          this.emit(p.prefix, p)
        }
        this.record.push(p)
        var h = this.maxRecordSize
        var d = this.record.length - h
        if (d > h / 10) {
          var g = Math.floor(h * 0.9)
          this.record = this.record.slice(-1 * g)
        }
        this.emitLog(p)
      }.bind(u)
      u.emitLog = function (e) {
        if (this._paused) {
          this._buffer.push(e)
          return
        }
        if (this.progressEnabled) {
          this.gauge.pulse(e.prefix)
        }
        var t = this.levels[e.level]
        if (t === undefined) {
          return
        }
        if (t < this.levels[this.level]) {
          return
        }
        if (t > 0 && !isFinite(t)) {
          return
        }
        var r = u.disp[e.level] != null ? u.disp[e.level] : e.level
        this.clearProgress()
        e.message.split(/\r?\n/).forEach(function (t) {
          if (this.heading) {
            this.write(this.heading, this.headingStyle)
            this.write(' ')
          }
          this.write(r, u.style[e.level])
          var s = e.prefix || ''
          if (s) {
            this.write(' ')
          }
          this.write(s, this.prefixStyle)
          this.write(' ' + t + '\n')
        }, this)
        this.showProgress()
      }
      u._format = function (e, t) {
        if (!h) {
          return
        }
        var r = ''
        if (this.useColor()) {
          t = t || {}
          var s = []
          if (t.fg) {
            s.push(t.fg)
          }
          if (t.bg) {
            s.push('bg' + t.bg[0].toUpperCase() + t.bg.slice(1))
          }
          if (t.bold) {
            s.push('bold')
          }
          if (t.underline) {
            s.push('underline')
          }
          if (t.inverse) {
            s.push('inverse')
          }
          if (s.length) {
            r += p.color(s)
          }
          if (t.beep) {
            r += p.beep()
          }
        }
        r += e
        if (this.useColor()) {
          r += p.color('reset')
        }
        return r
      }
      u.write = function (e, t) {
        if (!h) {
          return
        }
        h.write(this._format(e, t))
      }
      u.addLevel = function (e, t, r, s) {
        if (s == null) {
          s = e
        }
        this.levels[e] = t
        this.style[e] = r
        if (!this[e]) {
          this[e] = function () {
            var t = new Array(arguments.length + 1)
            t[0] = e
            for (var r = 0; r < arguments.length; r++) {
              t[r + 1] = arguments[r]
            }
            return this.log.apply(this, t)
          }.bind(this)
        }
        this.disp[e] = s
      }
      u.prefixStyle = { fg: 'magenta' }
      u.headingStyle = { fg: 'white', bg: 'black' }
      u.style = {}
      u.levels = {}
      u.disp = {}
      u.addLevel('silly', -Infinity, { inverse: true }, 'sill')
      u.addLevel('verbose', 1e3, { fg: 'blue', bg: 'black' }, 'verb')
      u.addLevel('info', 2e3, { fg: 'green' })
      u.addLevel('timing', 2500, { fg: 'green', bg: 'black' })
      u.addLevel('http', 3e3, { fg: 'green', bg: 'black' })
      u.addLevel('notice', 3500, { fg: 'blue', bg: 'black' })
      u.addLevel('warn', 4e3, { fg: 'black', bg: 'yellow' }, 'WARN')
      u.addLevel('error', 5e3, { fg: 'red', bg: 'black' }, 'ERR!')
      u.addLevel('silent', Infinity)
      u.on('error', function () {})
    },
    3540: (e) => {
      /*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var t = Object.getOwnPropertySymbols
      var r = Object.prototype.hasOwnProperty
      var s = Object.prototype.propertyIsEnumerable
      function toObject(e) {
        if (e === null || e === undefined) {
          throw new TypeError(
            'Object.assign cannot be called with null or undefined'
          )
        }
        return Object(e)
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false
          }
          var e = new String('abc')
          e[5] = 'de'
          if (Object.getOwnPropertyNames(e)[0] === '5') {
            return false
          }
          var t = {}
          for (var r = 0; r < 10; r++) {
            t['_' + String.fromCharCode(r)] = r
          }
          var s = Object.getOwnPropertyNames(t).map(function (e) {
            return t[e]
          })
          if (s.join('') !== '0123456789') {
            return false
          }
          var a = {}
          'abcdefghijklmnopqrst'.split('').forEach(function (e) {
            a[e] = e
          })
          if (
            Object.keys(Object.assign({}, a)).join('') !==
            'abcdefghijklmnopqrst'
          ) {
            return false
          }
          return true
        } catch (e) {
          return false
        }
      }
      e.exports = shouldUseNative()
        ? Object.assign
        : function (e, a) {
            var o
            var u = toObject(e)
            var c
            for (var f = 1; f < arguments.length; f++) {
              o = Object(arguments[f])
              for (var p in o) {
                if (r.call(o, p)) {
                  u[p] = o[p]
                }
              }
              if (t) {
                c = t(o)
                for (var h = 0; h < c.length; h++) {
                  if (s.call(o, c[h])) {
                    u[c[h]] = o[c[h]]
                  }
                }
              }
            }
            return u
          }
    },
    3846: (e, t, r) => {
      e.exports = r(7250)
    },
    7798: (e, t, r) => {
      const s = r(1017)
      const a = '\\\\/'
      const o = `[^${a}]`
      const u = '\\.'
      const c = '\\+'
      const f = '\\?'
      const p = '\\/'
      const h = '(?=.)'
      const d = '[^/]'
      const g = `(?:${p}|$)`
      const v = `(?:^|${p})`
      const m = `${u}{1,2}${g}`
      const y = `(?!${u})`
      const _ = `(?!${v}${m})`
      const D = `(?!${u}{0,1}${g})`
      const x = `(?!${m})`
      const E = `[^.${p}]`
      const w = `${d}*?`
      const C = {
        DOT_LITERAL: u,
        PLUS_LITERAL: c,
        QMARK_LITERAL: f,
        SLASH_LITERAL: p,
        ONE_CHAR: h,
        QMARK: d,
        END_ANCHOR: g,
        DOTS_SLASH: m,
        NO_DOT: y,
        NO_DOTS: _,
        NO_DOT_SLASH: D,
        NO_DOTS_SLASH: x,
        QMARK_NO_DOT: E,
        STAR: w,
        START_ANCHOR: v,
      }
      const S = {
        ...C,
        SLASH_LITERAL: `[${a}]`,
        QMARK: o,
        STAR: `${o}*?`,
        DOTS_SLASH: `${u}{1,2}(?:[${a}]|$)`,
        NO_DOT: `(?!${u})`,
        NO_DOTS: `(?!(?:^|[${a}])${u}{1,2}(?:[${a}]|$))`,
        NO_DOT_SLASH: `(?!${u}{0,1}(?:[${a}]|$))`,
        NO_DOTS_SLASH: `(?!${u}{1,2}(?:[${a}]|$))`,
        QMARK_NO_DOT: `[^.${a}]`,
        START_ANCHOR: `(?:^|[${a}])`,
        END_ANCHOR: `(?:[${a}]|$)`,
      }
      const A = {
        alnum: 'a-zA-Z0-9',
        alpha: 'a-zA-Z',
        ascii: '\\x00-\\x7F',
        blank: ' \\t',
        cntrl: '\\x00-\\x1F\\x7F',
        digit: '0-9',
        graph: '\\x21-\\x7E',
        lower: 'a-z',
        print: '\\x20-\\x7E ',
        punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
        space: ' \\t\\r\\n\\v\\f',
        upper: 'A-Z',
        word: 'A-Za-z0-9_',
        xdigit: 'A-Fa-f0-9',
      }
      e.exports = {
        MAX_LENGTH: 1024 * 64,
        POSIX_REGEX_SOURCE: A,
        REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
        REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
        REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
        REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
        REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
        REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
        REPLACEMENTS: { '***': '*', '**/**': '**', '**/**/**': '**' },
        CHAR_0: 48,
        CHAR_9: 57,
        CHAR_UPPERCASE_A: 65,
        CHAR_LOWERCASE_A: 97,
        CHAR_UPPERCASE_Z: 90,
        CHAR_LOWERCASE_Z: 122,
        CHAR_LEFT_PARENTHESES: 40,
        CHAR_RIGHT_PARENTHESES: 41,
        CHAR_ASTERISK: 42,
        CHAR_AMPERSAND: 38,
        CHAR_AT: 64,
        CHAR_BACKWARD_SLASH: 92,
        CHAR_CARRIAGE_RETURN: 13,
        CHAR_CIRCUMFLEX_ACCENT: 94,
        CHAR_COLON: 58,
        CHAR_COMMA: 44,
        CHAR_DOT: 46,
        CHAR_DOUBLE_QUOTE: 34,
        CHAR_EQUAL: 61,
        CHAR_EXCLAMATION_MARK: 33,
        CHAR_FORM_FEED: 12,
        CHAR_FORWARD_SLASH: 47,
        CHAR_GRAVE_ACCENT: 96,
        CHAR_HASH: 35,
        CHAR_HYPHEN_MINUS: 45,
        CHAR_LEFT_ANGLE_BRACKET: 60,
        CHAR_LEFT_CURLY_BRACE: 123,
        CHAR_LEFT_SQUARE_BRACKET: 91,
        CHAR_LINE_FEED: 10,
        CHAR_NO_BREAK_SPACE: 160,
        CHAR_PERCENT: 37,
        CHAR_PLUS: 43,
        CHAR_QUESTION_MARK: 63,
        CHAR_RIGHT_ANGLE_BRACKET: 62,
        CHAR_RIGHT_CURLY_BRACE: 125,
        CHAR_RIGHT_SQUARE_BRACKET: 93,
        CHAR_SEMICOLON: 59,
        CHAR_SINGLE_QUOTE: 39,
        CHAR_SPACE: 32,
        CHAR_TAB: 9,
        CHAR_UNDERSCORE: 95,
        CHAR_VERTICAL_LINE: 124,
        CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
        SEP: s.sep,
        extglobChars(e) {
          return {
            '!': { type: 'negate', open: '(?:(?!(?:', close: `))${e.STAR})` },
            '?': { type: 'qmark', open: '(?:', close: ')?' },
            '+': { type: 'plus', open: '(?:', close: ')+' },
            '*': { type: 'star', open: '(?:', close: ')*' },
            '@': { type: 'at', open: '(?:', close: ')' },
          }
        },
        globChars(e) {
          return e === true ? S : C
        },
      }
    },
    3632: (e, t, r) => {
      const s = r(7798)
      const a = r(5502)
      const {
        MAX_LENGTH: o,
        POSIX_REGEX_SOURCE: u,
        REGEX_NON_SPECIAL_CHARS: c,
        REGEX_SPECIAL_CHARS_BACKREF: f,
        REPLACEMENTS: p,
      } = s
      const expandRange = (e, t) => {
        if (typeof t.expandRange === 'function') {
          return t.expandRange(...e, t)
        }
        e.sort()
        const r = `[${e.join('-')}]`
        try {
          new RegExp(r)
        } catch (t) {
          return e.map((e) => a.escapeRegex(e)).join('..')
        }
        return r
      }
      const syntaxError = (e, t) =>
        `Missing ${e}: "${t}" - use "\\\\${t}" to match literal characters`
      const parse = (e, t) => {
        if (typeof e !== 'string') {
          throw new TypeError('Expected a string')
        }
        e = p[e] || e
        const r = { ...t }
        const h = typeof r.maxLength === 'number' ? Math.min(o, r.maxLength) : o
        let d = e.length
        if (d > h) {
          throw new SyntaxError(
            `Input length: ${d}, exceeds maximum allowed length: ${h}`
          )
        }
        const g = { type: 'bos', value: '', output: r.prepend || '' }
        const v = [g]
        const m = r.capture ? '' : '?:'
        const y = a.isWindows(t)
        const _ = s.globChars(y)
        const D = s.extglobChars(_)
        const {
          DOT_LITERAL: x,
          PLUS_LITERAL: E,
          SLASH_LITERAL: w,
          ONE_CHAR: C,
          DOTS_SLASH: S,
          NO_DOT: A,
          NO_DOT_SLASH: R,
          NO_DOTS_SLASH: k,
          QMARK: T,
          QMARK_NO_DOT: F,
          STAR: O,
          START_ANCHOR: I,
        } = _
        const globstar = (e) => `(${m}(?:(?!${I}${e.dot ? S : x}).)*?)`
        const L = r.dot ? '' : A
        const N = r.dot ? T : F
        let P = r.bash === true ? globstar(r) : O
        if (r.capture) {
          P = `(${P})`
        }
        if (typeof r.noext === 'boolean') {
          r.noextglob = r.noext
        }
        const B = {
          input: e,
          index: -1,
          start: 0,
          dot: r.dot === true,
          consumed: '',
          output: '',
          prefix: '',
          backtrack: false,
          negated: false,
          brackets: 0,
          braces: 0,
          parens: 0,
          quotes: 0,
          globstar: false,
          tokens: v,
        }
        e = a.removePrefix(e, B)
        d = e.length
        const j = []
        const M = []
        const H = []
        let $ = g
        let U
        const eos = () => B.index === d - 1
        const W = (B.peek = (t = 1) => e[B.index + t])
        const V = (B.advance = () => e[++B.index] || '')
        const remaining = () => e.slice(B.index + 1)
        const consume = (e = '', t = 0) => {
          B.consumed += e
          B.index += t
        }
        const append = (e) => {
          B.output += e.output != null ? e.output : e.value
          consume(e.value)
        }
        const negate = () => {
          let e = 1
          while (W() === '!' && (W(2) !== '(' || W(3) === '?')) {
            V()
            B.start++
            e++
          }
          if (e % 2 === 0) {
            return false
          }
          B.negated = true
          B.start++
          return true
        }
        const increment = (e) => {
          B[e]++
          H.push(e)
        }
        const decrement = (e) => {
          B[e]--
          H.pop()
        }
        const push = (e) => {
          if ($.type === 'globstar') {
            const t = B.braces > 0 && (e.type === 'comma' || e.type === 'brace')
            const r =
              e.extglob === true ||
              (j.length && (e.type === 'pipe' || e.type === 'paren'))
            if (e.type !== 'slash' && e.type !== 'paren' && !t && !r) {
              B.output = B.output.slice(0, -$.output.length)
              $.type = 'star'
              $.value = '*'
              $.output = P
              B.output += $.output
            }
          }
          if (j.length && e.type !== 'paren') {
            j[j.length - 1].inner += e.value
          }
          if (e.value || e.output) append(e)
          if ($ && $.type === 'text' && e.type === 'text') {
            $.value += e.value
            $.output = ($.output || '') + e.value
            return
          }
          e.prev = $
          v.push(e)
          $ = e
        }
        const extglobOpen = (e, t) => {
          const s = { ...D[t], conditions: 1, inner: '' }
          s.prev = $
          s.parens = B.parens
          s.output = B.output
          const a = (r.capture ? '(' : '') + s.open
          increment('parens')
          push({ type: e, value: t, output: B.output ? '' : C })
          push({ type: 'paren', extglob: true, value: V(), output: a })
          j.push(s)
        }
        const extglobClose = (e) => {
          let s = e.close + (r.capture ? ')' : '')
          let a
          if (e.type === 'negate') {
            let o = P
            if (e.inner && e.inner.length > 1 && e.inner.includes('/')) {
              o = globstar(r)
            }
            if (o !== P || eos() || /^\)+$/.test(remaining())) {
              s = e.close = `)$))${o}`
            }
            if (
              e.inner.includes('*') &&
              (a = remaining()) &&
              /^\.[^\\/.]+$/.test(a)
            ) {
              const r = parse(a, { ...t, fastpaths: false }).output
              s = e.close = `)${r})${o})`
            }
            if (e.prev.type === 'bos') {
              B.negatedExtglob = true
            }
          }
          push({ type: 'paren', extglob: true, value: U, output: s })
          decrement('parens')
        }
        if (r.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(e)) {
          let s = false
          let o = e.replace(f, (e, t, r, a, o, u) => {
            if (a === '\\') {
              s = true
              return e
            }
            if (a === '?') {
              if (t) {
                return t + a + (o ? T.repeat(o.length) : '')
              }
              if (u === 0) {
                return N + (o ? T.repeat(o.length) : '')
              }
              return T.repeat(r.length)
            }
            if (a === '.') {
              return x.repeat(r.length)
            }
            if (a === '*') {
              if (t) {
                return t + a + (o ? P : '')
              }
              return P
            }
            return t ? e : `\\${e}`
          })
          if (s === true) {
            if (r.unescape === true) {
              o = o.replace(/\\/g, '')
            } else {
              o = o.replace(/\\+/g, (e) =>
                e.length % 2 === 0 ? '\\\\' : e ? '\\' : ''
              )
            }
          }
          if (o === e && r.contains === true) {
            B.output = e
            return B
          }
          B.output = a.wrapOutput(o, B, t)
          return B
        }
        while (!eos()) {
          U = V()
          if (U === '\0') {
            continue
          }
          if (U === '\\') {
            const e = W()
            if (e === '/' && r.bash !== true) {
              continue
            }
            if (e === '.' || e === ';') {
              continue
            }
            if (!e) {
              U += '\\'
              push({ type: 'text', value: U })
              continue
            }
            const t = /^\\+/.exec(remaining())
            let s = 0
            if (t && t[0].length > 2) {
              s = t[0].length
              B.index += s
              if (s % 2 !== 0) {
                U += '\\'
              }
            }
            if (r.unescape === true) {
              U = V()
            } else {
              U += V()
            }
            if (B.brackets === 0) {
              push({ type: 'text', value: U })
              continue
            }
          }
          if (
            B.brackets > 0 &&
            (U !== ']' || $.value === '[' || $.value === '[^')
          ) {
            if (r.posix !== false && U === ':') {
              const e = $.value.slice(1)
              if (e.includes('[')) {
                $.posix = true
                if (e.includes(':')) {
                  const e = $.value.lastIndexOf('[')
                  const t = $.value.slice(0, e)
                  const r = $.value.slice(e + 2)
                  const s = u[r]
                  if (s) {
                    $.value = t + s
                    B.backtrack = true
                    V()
                    if (!g.output && v.indexOf($) === 1) {
                      g.output = C
                    }
                    continue
                  }
                }
              }
            }
            if ((U === '[' && W() !== ':') || (U === '-' && W() === ']')) {
              U = `\\${U}`
            }
            if (U === ']' && ($.value === '[' || $.value === '[^')) {
              U = `\\${U}`
            }
            if (r.posix === true && U === '!' && $.value === '[') {
              U = '^'
            }
            $.value += U
            append({ value: U })
            continue
          }
          if (B.quotes === 1 && U !== '"') {
            U = a.escapeRegex(U)
            $.value += U
            append({ value: U })
            continue
          }
          if (U === '"') {
            B.quotes = B.quotes === 1 ? 0 : 1
            if (r.keepQuotes === true) {
              push({ type: 'text', value: U })
            }
            continue
          }
          if (U === '(') {
            increment('parens')
            push({ type: 'paren', value: U })
            continue
          }
          if (U === ')') {
            if (B.parens === 0 && r.strictBrackets === true) {
              throw new SyntaxError(syntaxError('opening', '('))
            }
            const e = j[j.length - 1]
            if (e && B.parens === e.parens + 1) {
              extglobClose(j.pop())
              continue
            }
            push({ type: 'paren', value: U, output: B.parens ? ')' : '\\)' })
            decrement('parens')
            continue
          }
          if (U === '[') {
            if (r.nobracket === true || !remaining().includes(']')) {
              if (r.nobracket !== true && r.strictBrackets === true) {
                throw new SyntaxError(syntaxError('closing', ']'))
              }
              U = `\\${U}`
            } else {
              increment('brackets')
            }
            push({ type: 'bracket', value: U })
            continue
          }
          if (U === ']') {
            if (
              r.nobracket === true ||
              ($ && $.type === 'bracket' && $.value.length === 1)
            ) {
              push({ type: 'text', value: U, output: `\\${U}` })
              continue
            }
            if (B.brackets === 0) {
              if (r.strictBrackets === true) {
                throw new SyntaxError(syntaxError('opening', '['))
              }
              push({ type: 'text', value: U, output: `\\${U}` })
              continue
            }
            decrement('brackets')
            const e = $.value.slice(1)
            if ($.posix !== true && e[0] === '^' && !e.includes('/')) {
              U = `/${U}`
            }
            $.value += U
            append({ value: U })
            if (r.literalBrackets === false || a.hasRegexChars(e)) {
              continue
            }
            const t = a.escapeRegex($.value)
            B.output = B.output.slice(0, -$.value.length)
            if (r.literalBrackets === true) {
              B.output += t
              $.value = t
              continue
            }
            $.value = `(${m}${t}|${$.value})`
            B.output += $.value
            continue
          }
          if (U === '{' && r.nobrace !== true) {
            increment('braces')
            const e = {
              type: 'brace',
              value: U,
              output: '(',
              outputIndex: B.output.length,
              tokensIndex: B.tokens.length,
            }
            M.push(e)
            push(e)
            continue
          }
          if (U === '}') {
            const e = M[M.length - 1]
            if (r.nobrace === true || !e) {
              push({ type: 'text', value: U, output: U })
              continue
            }
            let t = ')'
            if (e.dots === true) {
              const e = v.slice()
              const s = []
              for (let t = e.length - 1; t >= 0; t--) {
                v.pop()
                if (e[t].type === 'brace') {
                  break
                }
                if (e[t].type !== 'dots') {
                  s.unshift(e[t].value)
                }
              }
              t = expandRange(s, r)
              B.backtrack = true
            }
            if (e.comma !== true && e.dots !== true) {
              const r = B.output.slice(0, e.outputIndex)
              const s = B.tokens.slice(e.tokensIndex)
              e.value = e.output = '\\{'
              U = t = '\\}'
              B.output = r
              for (const e of s) {
                B.output += e.output || e.value
              }
            }
            push({ type: 'brace', value: U, output: t })
            decrement('braces')
            M.pop()
            continue
          }
          if (U === '|') {
            if (j.length > 0) {
              j[j.length - 1].conditions++
            }
            push({ type: 'text', value: U })
            continue
          }
          if (U === ',') {
            let e = U
            const t = M[M.length - 1]
            if (t && H[H.length - 1] === 'braces') {
              t.comma = true
              e = '|'
            }
            push({ type: 'comma', value: U, output: e })
            continue
          }
          if (U === '/') {
            if ($.type === 'dot' && B.index === B.start + 1) {
              B.start = B.index + 1
              B.consumed = ''
              B.output = ''
              v.pop()
              $ = g
              continue
            }
            push({ type: 'slash', value: U, output: w })
            continue
          }
          if (U === '.') {
            if (B.braces > 0 && $.type === 'dot') {
              if ($.value === '.') $.output = x
              const e = M[M.length - 1]
              $.type = 'dots'
              $.output += U
              $.value += U
              e.dots = true
              continue
            }
            if (
              B.braces + B.parens === 0 &&
              $.type !== 'bos' &&
              $.type !== 'slash'
            ) {
              push({ type: 'text', value: U, output: x })
              continue
            }
            push({ type: 'dot', value: U, output: x })
            continue
          }
          if (U === '?') {
            const e = $ && $.value === '('
            if (!e && r.noextglob !== true && W() === '(' && W(2) !== '?') {
              extglobOpen('qmark', U)
              continue
            }
            if ($ && $.type === 'paren') {
              const e = W()
              let t = U
              if (e === '<' && !a.supportsLookbehinds()) {
                throw new Error(
                  'Node.js v10 or higher is required for regex lookbehinds'
                )
              }
              if (
                ($.value === '(' && !/[!=<:]/.test(e)) ||
                (e === '<' && !/<([!=]|\w+>)/.test(remaining()))
              ) {
                t = `\\${U}`
              }
              push({ type: 'text', value: U, output: t })
              continue
            }
            if (r.dot !== true && ($.type === 'slash' || $.type === 'bos')) {
              push({ type: 'qmark', value: U, output: F })
              continue
            }
            push({ type: 'qmark', value: U, output: T })
            continue
          }
          if (U === '!') {
            if (r.noextglob !== true && W() === '(') {
              if (W(2) !== '?' || !/[!=<:]/.test(W(3))) {
                extglobOpen('negate', U)
                continue
              }
            }
            if (r.nonegate !== true && B.index === 0) {
              negate()
              continue
            }
          }
          if (U === '+') {
            if (r.noextglob !== true && W() === '(' && W(2) !== '?') {
              extglobOpen('plus', U)
              continue
            }
            if (($ && $.value === '(') || r.regex === false) {
              push({ type: 'plus', value: U, output: E })
              continue
            }
            if (
              ($ &&
                ($.type === 'bracket' ||
                  $.type === 'paren' ||
                  $.type === 'brace')) ||
              B.parens > 0
            ) {
              push({ type: 'plus', value: U })
              continue
            }
            push({ type: 'plus', value: E })
            continue
          }
          if (U === '@') {
            if (r.noextglob !== true && W() === '(' && W(2) !== '?') {
              push({ type: 'at', extglob: true, value: U, output: '' })
              continue
            }
            push({ type: 'text', value: U })
            continue
          }
          if (U !== '*') {
            if (U === '$' || U === '^') {
              U = `\\${U}`
            }
            const e = c.exec(remaining())
            if (e) {
              U += e[0]
              B.index += e[0].length
            }
            push({ type: 'text', value: U })
            continue
          }
          if ($ && ($.type === 'globstar' || $.star === true)) {
            $.type = 'star'
            $.star = true
            $.value += U
            $.output = P
            B.backtrack = true
            B.globstar = true
            consume(U)
            continue
          }
          let t = remaining()
          if (r.noextglob !== true && /^\([^?]/.test(t)) {
            extglobOpen('star', U)
            continue
          }
          if ($.type === 'star') {
            if (r.noglobstar === true) {
              consume(U)
              continue
            }
            const s = $.prev
            const a = s.prev
            const o = s.type === 'slash' || s.type === 'bos'
            const u = a && (a.type === 'star' || a.type === 'globstar')
            if (r.bash === true && (!o || (t[0] && t[0] !== '/'))) {
              push({ type: 'star', value: U, output: '' })
              continue
            }
            const c = B.braces > 0 && (s.type === 'comma' || s.type === 'brace')
            const f = j.length && (s.type === 'pipe' || s.type === 'paren')
            if (!o && s.type !== 'paren' && !c && !f) {
              push({ type: 'star', value: U, output: '' })
              continue
            }
            while (t.slice(0, 3) === '/**') {
              const r = e[B.index + 4]
              if (r && r !== '/') {
                break
              }
              t = t.slice(3)
              consume('/**', 3)
            }
            if (s.type === 'bos' && eos()) {
              $.type = 'globstar'
              $.value += U
              $.output = globstar(r)
              B.output = $.output
              B.globstar = true
              consume(U)
              continue
            }
            if (s.type === 'slash' && s.prev.type !== 'bos' && !u && eos()) {
              B.output = B.output.slice(0, -(s.output + $.output).length)
              s.output = `(?:${s.output}`
              $.type = 'globstar'
              $.output = globstar(r) + (r.strictSlashes ? ')' : '|$)')
              $.value += U
              B.globstar = true
              B.output += s.output + $.output
              consume(U)
              continue
            }
            if (s.type === 'slash' && s.prev.type !== 'bos' && t[0] === '/') {
              const e = t[1] !== void 0 ? '|$' : ''
              B.output = B.output.slice(0, -(s.output + $.output).length)
              s.output = `(?:${s.output}`
              $.type = 'globstar'
              $.output = `${globstar(r)}${w}|${w}${e})`
              $.value += U
              B.output += s.output + $.output
              B.globstar = true
              consume(U + V())
              push({ type: 'slash', value: '/', output: '' })
              continue
            }
            if (s.type === 'bos' && t[0] === '/') {
              $.type = 'globstar'
              $.value += U
              $.output = `(?:^|${w}|${globstar(r)}${w})`
              B.output = $.output
              B.globstar = true
              consume(U + V())
              push({ type: 'slash', value: '/', output: '' })
              continue
            }
            B.output = B.output.slice(0, -$.output.length)
            $.type = 'globstar'
            $.output = globstar(r)
            $.value += U
            B.output += $.output
            B.globstar = true
            consume(U)
            continue
          }
          const s = { type: 'star', value: U, output: P }
          if (r.bash === true) {
            s.output = '.*?'
            if ($.type === 'bos' || $.type === 'slash') {
              s.output = L + s.output
            }
            push(s)
            continue
          }
          if (
            $ &&
            ($.type === 'bracket' || $.type === 'paren') &&
            r.regex === true
          ) {
            s.output = U
            push(s)
            continue
          }
          if (B.index === B.start || $.type === 'slash' || $.type === 'dot') {
            if ($.type === 'dot') {
              B.output += R
              $.output += R
            } else if (r.dot === true) {
              B.output += k
              $.output += k
            } else {
              B.output += L
              $.output += L
            }
            if (W() !== '*') {
              B.output += C
              $.output += C
            }
          }
          push(s)
        }
        while (B.brackets > 0) {
          if (r.strictBrackets === true)
            throw new SyntaxError(syntaxError('closing', ']'))
          B.output = a.escapeLast(B.output, '[')
          decrement('brackets')
        }
        while (B.parens > 0) {
          if (r.strictBrackets === true)
            throw new SyntaxError(syntaxError('closing', ')'))
          B.output = a.escapeLast(B.output, '(')
          decrement('parens')
        }
        while (B.braces > 0) {
          if (r.strictBrackets === true)
            throw new SyntaxError(syntaxError('closing', '}'))
          B.output = a.escapeLast(B.output, '{')
          decrement('braces')
        }
        if (
          r.strictSlashes !== true &&
          ($.type === 'star' || $.type === 'bracket')
        ) {
          push({ type: 'maybe_slash', value: '', output: `${w}?` })
        }
        if (B.backtrack === true) {
          B.output = ''
          for (const e of B.tokens) {
            B.output += e.output != null ? e.output : e.value
            if (e.suffix) {
              B.output += e.suffix
            }
          }
        }
        return B
      }
      parse.fastpaths = (e, t) => {
        const r = { ...t }
        const u = typeof r.maxLength === 'number' ? Math.min(o, r.maxLength) : o
        const c = e.length
        if (c > u) {
          throw new SyntaxError(
            `Input length: ${c}, exceeds maximum allowed length: ${u}`
          )
        }
        e = p[e] || e
        const f = a.isWindows(t)
        const {
          DOT_LITERAL: h,
          SLASH_LITERAL: d,
          ONE_CHAR: g,
          DOTS_SLASH: v,
          NO_DOT: m,
          NO_DOTS: y,
          NO_DOTS_SLASH: _,
          STAR: D,
          START_ANCHOR: x,
        } = s.globChars(f)
        const E = r.dot ? y : m
        const w = r.dot ? _ : m
        const C = r.capture ? '' : '?:'
        const S = { negated: false, prefix: '' }
        let A = r.bash === true ? '.*?' : D
        if (r.capture) {
          A = `(${A})`
        }
        const globstar = (e) => {
          if (e.noglobstar === true) return A
          return `(${C}(?:(?!${x}${e.dot ? v : h}).)*?)`
        }
        const create = (e) => {
          switch (e) {
            case '*':
              return `${E}${g}${A}`
            case '.*':
              return `${h}${g}${A}`
            case '*.*':
              return `${E}${A}${h}${g}${A}`
            case '*/*':
              return `${E}${A}${d}${g}${w}${A}`
            case '**':
              return E + globstar(r)
            case '**/*':
              return `(?:${E}${globstar(r)}${d})?${w}${g}${A}`
            case '**/*.*':
              return `(?:${E}${globstar(r)}${d})?${w}${A}${h}${g}${A}`
            case '**/.*':
              return `(?:${E}${globstar(r)}${d})?${h}${g}${A}`
            default: {
              const t = /^(.*?)\.(\w+)$/.exec(e)
              if (!t) return
              const r = create(t[1])
              if (!r) return
              return r + h + t[2]
            }
          }
        }
        const R = a.removePrefix(e, S)
        let k = create(R)
        if (k && r.strictSlashes !== true) {
          k += `${d}?`
        }
        return k
      }
      e.exports = parse
    },
    7250: (e, t, r) => {
      const s = r(1017)
      const a = r(2964)
      const o = r(3632)
      const u = r(5502)
      const c = r(7798)
      const isObject = (e) => e && typeof e === 'object' && !Array.isArray(e)
      const picomatch = (e, t, r = false) => {
        if (Array.isArray(e)) {
          const s = e.map((e) => picomatch(e, t, r))
          const arrayMatcher = (e) => {
            for (const t of s) {
              const r = t(e)
              if (r) return r
            }
            return false
          }
          return arrayMatcher
        }
        const s = isObject(e) && e.tokens && e.input
        if (e === '' || (typeof e !== 'string' && !s)) {
          throw new TypeError('Expected pattern to be a non-empty string')
        }
        const a = t || {}
        const o = u.isWindows(t)
        const c = s
          ? picomatch.compileRe(e, t)
          : picomatch.makeRe(e, t, false, true)
        const f = c.state
        delete c.state
        let isIgnored = () => false
        if (a.ignore) {
          const e = { ...t, ignore: null, onMatch: null, onResult: null }
          isIgnored = picomatch(a.ignore, e, r)
        }
        const matcher = (r, s = false) => {
          const {
            isMatch: u,
            match: p,
            output: h,
          } = picomatch.test(r, c, t, { glob: e, posix: o })
          const d = {
            glob: e,
            state: f,
            regex: c,
            posix: o,
            input: r,
            output: h,
            match: p,
            isMatch: u,
          }
          if (typeof a.onResult === 'function') {
            a.onResult(d)
          }
          if (u === false) {
            d.isMatch = false
            return s ? d : false
          }
          if (isIgnored(r)) {
            if (typeof a.onIgnore === 'function') {
              a.onIgnore(d)
            }
            d.isMatch = false
            return s ? d : false
          }
          if (typeof a.onMatch === 'function') {
            a.onMatch(d)
          }
          return s ? d : true
        }
        if (r) {
          matcher.state = f
        }
        return matcher
      }
      picomatch.test = (e, t, r, { glob: s, posix: a } = {}) => {
        if (typeof e !== 'string') {
          throw new TypeError('Expected input to be a string')
        }
        if (e === '') {
          return { isMatch: false, output: '' }
        }
        const o = r || {}
        const c = o.format || (a ? u.toPosixSlashes : null)
        let f = e === s
        let p = f && c ? c(e) : e
        if (f === false) {
          p = c ? c(e) : e
          f = p === s
        }
        if (f === false || o.capture === true) {
          if (o.matchBase === true || o.basename === true) {
            f = picomatch.matchBase(e, t, r, a)
          } else {
            f = t.exec(p)
          }
        }
        return { isMatch: Boolean(f), match: f, output: p }
      }
      picomatch.matchBase = (e, t, r, a = u.isWindows(r)) => {
        const o = t instanceof RegExp ? t : picomatch.makeRe(t, r)
        return o.test(s.basename(e))
      }
      picomatch.isMatch = (e, t, r) => picomatch(t, r)(e)
      picomatch.parse = (e, t) => {
        if (Array.isArray(e)) return e.map((e) => picomatch.parse(e, t))
        return o(e, { ...t, fastpaths: false })
      }
      picomatch.scan = (e, t) => a(e, t)
      picomatch.compileRe = (e, t, r = false, s = false) => {
        if (r === true) {
          return e.output
        }
        const a = t || {}
        const o = a.contains ? '' : '^'
        const u = a.contains ? '' : '$'
        let c = `${o}(?:${e.output})${u}`
        if (e && e.negated === true) {
          c = `^(?!${c}).*$`
        }
        const f = picomatch.toRegex(c, t)
        if (s === true) {
          f.state = e
        }
        return f
      }
      picomatch.makeRe = (e, t = {}, r = false, s = false) => {
        if (!e || typeof e !== 'string') {
          throw new TypeError('Expected a non-empty string')
        }
        let a = { negated: false, fastpaths: true }
        if (t.fastpaths !== false && (e[0] === '.' || e[0] === '*')) {
          a.output = o.fastpaths(e, t)
        }
        if (!a.output) {
          a = o(e, t)
        }
        return picomatch.compileRe(a, t, r, s)
      }
      picomatch.toRegex = (e, t) => {
        try {
          const r = t || {}
          return new RegExp(e, r.flags || (r.nocase ? 'i' : ''))
        } catch (e) {
          if (t && t.debug === true) throw e
          return /$^/
        }
      }
      picomatch.constants = c
      e.exports = picomatch
    },
    2964: (e, t, r) => {
      const s = r(5502)
      const {
        CHAR_ASTERISK: a,
        CHAR_AT: o,
        CHAR_BACKWARD_SLASH: u,
        CHAR_COMMA: c,
        CHAR_DOT: f,
        CHAR_EXCLAMATION_MARK: p,
        CHAR_FORWARD_SLASH: h,
        CHAR_LEFT_CURLY_BRACE: d,
        CHAR_LEFT_PARENTHESES: g,
        CHAR_LEFT_SQUARE_BRACKET: v,
        CHAR_PLUS: m,
        CHAR_QUESTION_MARK: y,
        CHAR_RIGHT_CURLY_BRACE: _,
        CHAR_RIGHT_PARENTHESES: D,
        CHAR_RIGHT_SQUARE_BRACKET: x,
      } = r(7798)
      const isPathSeparator = (e) => e === h || e === u
      const depth = (e) => {
        if (e.isPrefix !== true) {
          e.depth = e.isGlobstar ? Infinity : 1
        }
      }
      const scan = (e, t) => {
        const r = t || {}
        const E = e.length - 1
        const w = r.parts === true || r.scanToEnd === true
        const C = []
        const S = []
        const A = []
        let R = e
        let k = -1
        let T = 0
        let F = 0
        let O = false
        let I = false
        let L = false
        let N = false
        let P = false
        let B = false
        let j = false
        let M = false
        let H = false
        let $ = false
        let U = 0
        let W
        let V
        let q = { value: '', depth: 0, isGlob: false }
        const eos = () => k >= E
        const peek = () => R.charCodeAt(k + 1)
        const advance = () => {
          W = V
          return R.charCodeAt(++k)
        }
        while (k < E) {
          V = advance()
          let e
          if (V === u) {
            j = q.backslashes = true
            V = advance()
            if (V === d) {
              B = true
            }
            continue
          }
          if (B === true || V === d) {
            U++
            while (eos() !== true && (V = advance())) {
              if (V === u) {
                j = q.backslashes = true
                advance()
                continue
              }
              if (V === d) {
                U++
                continue
              }
              if (B !== true && V === f && (V = advance()) === f) {
                O = q.isBrace = true
                L = q.isGlob = true
                $ = true
                if (w === true) {
                  continue
                }
                break
              }
              if (B !== true && V === c) {
                O = q.isBrace = true
                L = q.isGlob = true
                $ = true
                if (w === true) {
                  continue
                }
                break
              }
              if (V === _) {
                U--
                if (U === 0) {
                  B = false
                  O = q.isBrace = true
                  $ = true
                  break
                }
              }
            }
            if (w === true) {
              continue
            }
            break
          }
          if (V === h) {
            C.push(k)
            S.push(q)
            q = { value: '', depth: 0, isGlob: false }
            if ($ === true) continue
            if (W === f && k === T + 1) {
              T += 2
              continue
            }
            F = k + 1
            continue
          }
          if (r.noext !== true) {
            const e = V === m || V === o || V === a || V === y || V === p
            if (e === true && peek() === g) {
              L = q.isGlob = true
              N = q.isExtglob = true
              $ = true
              if (V === p && k === T) {
                H = true
              }
              if (w === true) {
                while (eos() !== true && (V = advance())) {
                  if (V === u) {
                    j = q.backslashes = true
                    V = advance()
                    continue
                  }
                  if (V === D) {
                    L = q.isGlob = true
                    $ = true
                    break
                  }
                }
                continue
              }
              break
            }
          }
          if (V === a) {
            if (W === a) P = q.isGlobstar = true
            L = q.isGlob = true
            $ = true
            if (w === true) {
              continue
            }
            break
          }
          if (V === y) {
            L = q.isGlob = true
            $ = true
            if (w === true) {
              continue
            }
            break
          }
          if (V === v) {
            while (eos() !== true && (e = advance())) {
              if (e === u) {
                j = q.backslashes = true
                advance()
                continue
              }
              if (e === x) {
                I = q.isBracket = true
                L = q.isGlob = true
                $ = true
                break
              }
            }
            if (w === true) {
              continue
            }
            break
          }
          if (r.nonegate !== true && V === p && k === T) {
            M = q.negated = true
            T++
            continue
          }
          if (r.noparen !== true && V === g) {
            L = q.isGlob = true
            if (w === true) {
              while (eos() !== true && (V = advance())) {
                if (V === g) {
                  j = q.backslashes = true
                  V = advance()
                  continue
                }
                if (V === D) {
                  $ = true
                  break
                }
              }
              continue
            }
            break
          }
          if (L === true) {
            $ = true
            if (w === true) {
              continue
            }
            break
          }
        }
        if (r.noext === true) {
          N = false
          L = false
        }
        let G = R
        let K = ''
        let z = ''
        if (T > 0) {
          K = R.slice(0, T)
          R = R.slice(T)
          F -= T
        }
        if (G && L === true && F > 0) {
          G = R.slice(0, F)
          z = R.slice(F)
        } else if (L === true) {
          G = ''
          z = R
        } else {
          G = R
        }
        if (G && G !== '' && G !== '/' && G !== R) {
          if (isPathSeparator(G.charCodeAt(G.length - 1))) {
            G = G.slice(0, -1)
          }
        }
        if (r.unescape === true) {
          if (z) z = s.removeBackslashes(z)
          if (G && j === true) {
            G = s.removeBackslashes(G)
          }
        }
        const Q = {
          prefix: K,
          input: e,
          start: T,
          base: G,
          glob: z,
          isBrace: O,
          isBracket: I,
          isGlob: L,
          isExtglob: N,
          isGlobstar: P,
          negated: M,
          negatedExtglob: H,
        }
        if (r.tokens === true) {
          Q.maxDepth = 0
          if (!isPathSeparator(V)) {
            S.push(q)
          }
          Q.tokens = S
        }
        if (r.parts === true || r.tokens === true) {
          let t
          for (let s = 0; s < C.length; s++) {
            const a = t ? t + 1 : T
            const o = C[s]
            const u = e.slice(a, o)
            if (r.tokens) {
              if (s === 0 && T !== 0) {
                S[s].isPrefix = true
                S[s].value = K
              } else {
                S[s].value = u
              }
              depth(S[s])
              Q.maxDepth += S[s].depth
            }
            if (s !== 0 || u !== '') {
              A.push(u)
            }
            t = o
          }
          if (t && t + 1 < e.length) {
            const s = e.slice(t + 1)
            A.push(s)
            if (r.tokens) {
              S[S.length - 1].value = s
              depth(S[S.length - 1])
              Q.maxDepth += S[S.length - 1].depth
            }
          }
          Q.slashes = C
          Q.parts = A
        }
        return Q
      }
      e.exports = scan
    },
    5502: (e, t, r) => {
      const s = r(1017)
      const a = process.platform === 'win32'
      const {
        REGEX_BACKSLASH: o,
        REGEX_REMOVE_BACKSLASH: u,
        REGEX_SPECIAL_CHARS: c,
        REGEX_SPECIAL_CHARS_GLOBAL: f,
      } = r(7798)
      t.isObject = (e) =>
        e !== null && typeof e === 'object' && !Array.isArray(e)
      t.hasRegexChars = (e) => c.test(e)
      t.isRegexChar = (e) => e.length === 1 && t.hasRegexChars(e)
      t.escapeRegex = (e) => e.replace(f, '\\$1')
      t.toPosixSlashes = (e) => e.replace(o, '/')
      t.removeBackslashes = (e) => e.replace(u, (e) => (e === '\\' ? '' : e))
      t.supportsLookbehinds = () => {
        const e = process.version.slice(1).split('.').map(Number)
        if ((e.length === 3 && e[0] >= 9) || (e[0] === 8 && e[1] >= 10)) {
          return true
        }
        return false
      }
      t.isWindows = (e) => {
        if (e && typeof e.windows === 'boolean') {
          return e.windows
        }
        return a === true || s.sep === '\\'
      }
      t.escapeLast = (e, r, s) => {
        const a = e.lastIndexOf(r, s)
        if (a === -1) return e
        if (e[a - 1] === '\\') return t.escapeLast(e, r, a - 1)
        return `${e.slice(0, a)}\\${e.slice(a)}`
      }
      t.removePrefix = (e, t = {}) => {
        let r = e
        if (r.startsWith('./')) {
          r = r.slice(2)
          t.prefix = './'
        }
        return r
      }
      t.wrapOutput = (e, t = {}, r = {}) => {
        const s = r.contains ? '' : '^'
        const a = r.contains ? '' : '$'
        let o = `${s}(?:${e})${a}`
        if (t.negated === true) {
          o = `(?:^(?!${o}).*$)`
        }
        return o
      }
    },
    4646: (e) => {
      const t = {}
      function createErrorType(e, r, s) {
        if (!s) {
          s = Error
        }
        function getMessage(e, t, s) {
          if (typeof r === 'string') {
            return r
          } else {
            return r(e, t, s)
          }
        }
        class NodeError extends s {
          constructor(e, t, r) {
            super(getMessage(e, t, r))
          }
        }
        NodeError.prototype.name = s.name
        NodeError.prototype.code = e
        t[e] = NodeError
      }
      function oneOf(e, t) {
        if (Array.isArray(e)) {
          const r = e.length
          e = e.map((e) => String(e))
          if (r > 2) {
            return `one of ${t} ${e.slice(0, r - 1).join(', ')}, or ` + e[r - 1]
          } else if (r === 2) {
            return `one of ${t} ${e[0]} or ${e[1]}`
          } else {
            return `of ${t} ${e[0]}`
          }
        } else {
          return `of ${t} ${String(e)}`
        }
      }
      function startsWith(e, t, r) {
        return e.substr(!r || r < 0 ? 0 : +r, t.length) === t
      }
      function endsWith(e, t, r) {
        if (r === undefined || r > e.length) {
          r = e.length
        }
        return e.substring(r - t.length, r) === t
      }
      function includes(e, t, r) {
        if (typeof r !== 'number') {
          r = 0
        }
        if (r + t.length > e.length) {
          return false
        } else {
          return e.indexOf(t, r) !== -1
        }
      }
      createErrorType(
        'ERR_INVALID_OPT_VALUE',
        function (e, t) {
          return 'The value "' + t + '" is invalid for option "' + e + '"'
        },
        TypeError
      )
      createErrorType(
        'ERR_INVALID_ARG_TYPE',
        function (e, t, r) {
          let s
          if (typeof t === 'string' && startsWith(t, 'not ')) {
            s = 'must not be'
            t = t.replace(/^not /, '')
          } else {
            s = 'must be'
          }
          let a
          if (endsWith(e, ' argument')) {
            a = `The ${e} ${s} ${oneOf(t, 'type')}`
          } else {
            const r = includes(e, '.') ? 'property' : 'argument'
            a = `The "${e}" ${r} ${s} ${oneOf(t, 'type')}`
          }
          a += `. Received type ${typeof r}`
          return a
        },
        TypeError
      )
      createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF')
      createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (e) {
        return 'The ' + e + ' method is not implemented'
      })
      createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close')
      createErrorType('ERR_STREAM_DESTROYED', function (e) {
        return 'Cannot call ' + e + ' after a stream was destroyed'
      })
      createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times')
      createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable')
      createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end')
      createErrorType(
        'ERR_STREAM_NULL_VALUES',
        'May not write null values to stream',
        TypeError
      )
      createErrorType(
        'ERR_UNKNOWN_ENCODING',
        function (e) {
          return 'Unknown encoding: ' + e
        },
        TypeError
      )
      createErrorType(
        'ERR_STREAM_UNSHIFT_AFTER_END_EVENT',
        'stream.unshift() after end event'
      )
      e.exports.q = t
    },
    2403: (e, t, r) => {
      var s =
        Object.keys ||
        function (e) {
          var t = []
          for (var r in e) {
            t.push(r)
          }
          return t
        }
      e.exports = Duplex
      var a = r(1709)
      var o = r(7337)
      r(2842)(Duplex, a)
      {
        var u = s(o.prototype)
        for (var c = 0; c < u.length; c++) {
          var f = u[c]
          if (!Duplex.prototype[f]) Duplex.prototype[f] = o.prototype[f]
        }
      }
      function Duplex(e) {
        if (!(this instanceof Duplex)) return new Duplex(e)
        a.call(this, e)
        o.call(this, e)
        this.allowHalfOpen = true
        if (e) {
          if (e.readable === false) this.readable = false
          if (e.writable === false) this.writable = false
          if (e.allowHalfOpen === false) {
            this.allowHalfOpen = false
            this.once('end', onend)
          }
        }
      }
      Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
        enumerable: false,
        get: function get() {
          return this._writableState.highWaterMark
        },
      })
      Object.defineProperty(Duplex.prototype, 'writableBuffer', {
        enumerable: false,
        get: function get() {
          return this._writableState && this._writableState.getBuffer()
        },
      })
      Object.defineProperty(Duplex.prototype, 'writableLength', {
        enumerable: false,
        get: function get() {
          return this._writableState.length
        },
      })
      function onend() {
        if (this._writableState.ended) return
        process.nextTick(onEndNT, this)
      }
      function onEndNT(e) {
        e.end()
      }
      Object.defineProperty(Duplex.prototype, 'destroyed', {
        enumerable: false,
        get: function get() {
          if (
            this._readableState === undefined ||
            this._writableState === undefined
          ) {
            return false
          }
          return this._readableState.destroyed && this._writableState.destroyed
        },
        set: function set(e) {
          if (
            this._readableState === undefined ||
            this._writableState === undefined
          ) {
            return
          }
          this._readableState.destroyed = e
          this._writableState.destroyed = e
        },
      })
    },
    7889: (e, t, r) => {
      e.exports = PassThrough
      var s = r(1170)
      r(2842)(PassThrough, s)
      function PassThrough(e) {
        if (!(this instanceof PassThrough)) return new PassThrough(e)
        s.call(this, e)
      }
      PassThrough.prototype._transform = function (e, t, r) {
        r(null, e)
      }
    },
    1709: (e, t, r) => {
      e.exports = Readable
      var s
      Readable.ReadableState = ReadableState
      var a = r(2361).EventEmitter
      var o = function EElistenerCount(e, t) {
        return e.listeners(t).length
      }
      var u = r(4678)
      var c = r(4300).Buffer
      var f = global.Uint8Array || function () {}
      function _uint8ArrayToBuffer(e) {
        return c.from(e)
      }
      function _isUint8Array(e) {
        return c.isBuffer(e) || e instanceof f
      }
      var p = r(3837)
      var h
      if (p && p.debuglog) {
        h = p.debuglog('stream')
      } else {
        h = function debug() {}
      }
      var d = r(4379)
      var g = r(7025)
      var v = r(6776),
        m = v.getHighWaterMark
      var y = r(4646).q,
        _ = y.ERR_INVALID_ARG_TYPE,
        D = y.ERR_STREAM_PUSH_AFTER_EOF,
        x = y.ERR_METHOD_NOT_IMPLEMENTED,
        E = y.ERR_STREAM_UNSHIFT_AFTER_END_EVENT
      var w
      var C
      var S
      r(2842)(Readable, u)
      var A = g.errorOrDestroy
      var R = ['error', 'close', 'destroy', 'pause', 'resume']
      function prependListener(e, t, r) {
        if (typeof e.prependListener === 'function')
          return e.prependListener(t, r)
        if (!e._events || !e._events[t]) e.on(t, r)
        else if (Array.isArray(e._events[t])) e._events[t].unshift(r)
        else e._events[t] = [r, e._events[t]]
      }
      function ReadableState(e, t, a) {
        s = s || r(2403)
        e = e || {}
        if (typeof a !== 'boolean') a = t instanceof s
        this.objectMode = !!e.objectMode
        if (a) this.objectMode = this.objectMode || !!e.readableObjectMode
        this.highWaterMark = m(this, e, 'readableHighWaterMark', a)
        this.buffer = new d()
        this.length = 0
        this.pipes = null
        this.pipesCount = 0
        this.flowing = null
        this.ended = false
        this.endEmitted = false
        this.reading = false
        this.sync = true
        this.needReadable = false
        this.emittedReadable = false
        this.readableListening = false
        this.resumeScheduled = false
        this.paused = true
        this.emitClose = e.emitClose !== false
        this.autoDestroy = !!e.autoDestroy
        this.destroyed = false
        this.defaultEncoding = e.defaultEncoding || 'utf8'
        this.awaitDrain = 0
        this.readingMore = false
        this.decoder = null
        this.encoding = null
        if (e.encoding) {
          if (!w) w = r(3704).s
          this.decoder = new w(e.encoding)
          this.encoding = e.encoding
        }
      }
      function Readable(e) {
        s = s || r(2403)
        if (!(this instanceof Readable)) return new Readable(e)
        var t = this instanceof s
        this._readableState = new ReadableState(e, this, t)
        this.readable = true
        if (e) {
          if (typeof e.read === 'function') this._read = e.read
          if (typeof e.destroy === 'function') this._destroy = e.destroy
        }
        u.call(this)
      }
      Object.defineProperty(Readable.prototype, 'destroyed', {
        enumerable: false,
        get: function get() {
          if (this._readableState === undefined) {
            return false
          }
          return this._readableState.destroyed
        },
        set: function set(e) {
          if (!this._readableState) {
            return
          }
          this._readableState.destroyed = e
        },
      })
      Readable.prototype.destroy = g.destroy
      Readable.prototype._undestroy = g.undestroy
      Readable.prototype._destroy = function (e, t) {
        t(e)
      }
      Readable.prototype.push = function (e, t) {
        var r = this._readableState
        var s
        if (!r.objectMode) {
          if (typeof e === 'string') {
            t = t || r.defaultEncoding
            if (t !== r.encoding) {
              e = c.from(e, t)
              t = ''
            }
            s = true
          }
        } else {
          s = true
        }
        return readableAddChunk(this, e, t, false, s)
      }
      Readable.prototype.unshift = function (e) {
        return readableAddChunk(this, e, null, true, false)
      }
      function readableAddChunk(e, t, r, s, a) {
        h('readableAddChunk', t)
        var o = e._readableState
        if (t === null) {
          o.reading = false
          onEofChunk(e, o)
        } else {
          var u
          if (!a) u = chunkInvalid(o, t)
          if (u) {
            A(e, u)
          } else if (o.objectMode || (t && t.length > 0)) {
            if (
              typeof t !== 'string' &&
              !o.objectMode &&
              Object.getPrototypeOf(t) !== c.prototype
            ) {
              t = _uint8ArrayToBuffer(t)
            }
            if (s) {
              if (o.endEmitted) A(e, new E())
              else addChunk(e, o, t, true)
            } else if (o.ended) {
              A(e, new D())
            } else if (o.destroyed) {
              return false
            } else {
              o.reading = false
              if (o.decoder && !r) {
                t = o.decoder.write(t)
                if (o.objectMode || t.length !== 0) addChunk(e, o, t, false)
                else maybeReadMore(e, o)
              } else {
                addChunk(e, o, t, false)
              }
            }
          } else if (!s) {
            o.reading = false
            maybeReadMore(e, o)
          }
        }
        return !o.ended && (o.length < o.highWaterMark || o.length === 0)
      }
      function addChunk(e, t, r, s) {
        if (t.flowing && t.length === 0 && !t.sync) {
          t.awaitDrain = 0
          e.emit('data', r)
        } else {
          t.length += t.objectMode ? 1 : r.length
          if (s) t.buffer.unshift(r)
          else t.buffer.push(r)
          if (t.needReadable) emitReadable(e)
        }
        maybeReadMore(e, t)
      }
      function chunkInvalid(e, t) {
        var r
        if (
          !_isUint8Array(t) &&
          typeof t !== 'string' &&
          t !== undefined &&
          !e.objectMode
        ) {
          r = new _('chunk', ['string', 'Buffer', 'Uint8Array'], t)
        }
        return r
      }
      Readable.prototype.isPaused = function () {
        return this._readableState.flowing === false
      }
      Readable.prototype.setEncoding = function (e) {
        if (!w) w = r(3704).s
        var t = new w(e)
        this._readableState.decoder = t
        this._readableState.encoding = this._readableState.decoder.encoding
        var s = this._readableState.buffer.head
        var a = ''
        while (s !== null) {
          a += t.write(s.data)
          s = s.next
        }
        this._readableState.buffer.clear()
        if (a !== '') this._readableState.buffer.push(a)
        this._readableState.length = a.length
        return this
      }
      var k = 1073741824
      function computeNewHighWaterMark(e) {
        if (e >= k) {
          e = k
        } else {
          e--
          e |= e >>> 1
          e |= e >>> 2
          e |= e >>> 4
          e |= e >>> 8
          e |= e >>> 16
          e++
        }
        return e
      }
      function howMuchToRead(e, t) {
        if (e <= 0 || (t.length === 0 && t.ended)) return 0
        if (t.objectMode) return 1
        if (e !== e) {
          if (t.flowing && t.length) return t.buffer.head.data.length
          else return t.length
        }
        if (e > t.highWaterMark) t.highWaterMark = computeNewHighWaterMark(e)
        if (e <= t.length) return e
        if (!t.ended) {
          t.needReadable = true
          return 0
        }
        return t.length
      }
      Readable.prototype.read = function (e) {
        h('read', e)
        e = parseInt(e, 10)
        var t = this._readableState
        var r = e
        if (e !== 0) t.emittedReadable = false
        if (
          e === 0 &&
          t.needReadable &&
          ((t.highWaterMark !== 0
            ? t.length >= t.highWaterMark
            : t.length > 0) ||
            t.ended)
        ) {
          h('read: emitReadable', t.length, t.ended)
          if (t.length === 0 && t.ended) endReadable(this)
          else emitReadable(this)
          return null
        }
        e = howMuchToRead(e, t)
        if (e === 0 && t.ended) {
          if (t.length === 0) endReadable(this)
          return null
        }
        var s = t.needReadable
        h('need readable', s)
        if (t.length === 0 || t.length - e < t.highWaterMark) {
          s = true
          h('length less than watermark', s)
        }
        if (t.ended || t.reading) {
          s = false
          h('reading or ended', s)
        } else if (s) {
          h('do read')
          t.reading = true
          t.sync = true
          if (t.length === 0) t.needReadable = true
          this._read(t.highWaterMark)
          t.sync = false
          if (!t.reading) e = howMuchToRead(r, t)
        }
        var a
        if (e > 0) a = fromList(e, t)
        else a = null
        if (a === null) {
          t.needReadable = t.length <= t.highWaterMark
          e = 0
        } else {
          t.length -= e
          t.awaitDrain = 0
        }
        if (t.length === 0) {
          if (!t.ended) t.needReadable = true
          if (r !== e && t.ended) endReadable(this)
        }
        if (a !== null) this.emit('data', a)
        return a
      }
      function onEofChunk(e, t) {
        h('onEofChunk')
        if (t.ended) return
        if (t.decoder) {
          var r = t.decoder.end()
          if (r && r.length) {
            t.buffer.push(r)
            t.length += t.objectMode ? 1 : r.length
          }
        }
        t.ended = true
        if (t.sync) {
          emitReadable(e)
        } else {
          t.needReadable = false
          if (!t.emittedReadable) {
            t.emittedReadable = true
            emitReadable_(e)
          }
        }
      }
      function emitReadable(e) {
        var t = e._readableState
        h('emitReadable', t.needReadable, t.emittedReadable)
        t.needReadable = false
        if (!t.emittedReadable) {
          h('emitReadable', t.flowing)
          t.emittedReadable = true
          process.nextTick(emitReadable_, e)
        }
      }
      function emitReadable_(e) {
        var t = e._readableState
        h('emitReadable_', t.destroyed, t.length, t.ended)
        if (!t.destroyed && (t.length || t.ended)) {
          e.emit('readable')
          t.emittedReadable = false
        }
        t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark
        flow(e)
      }
      function maybeReadMore(e, t) {
        if (!t.readingMore) {
          t.readingMore = true
          process.nextTick(maybeReadMore_, e, t)
        }
      }
      function maybeReadMore_(e, t) {
        while (
          !t.reading &&
          !t.ended &&
          (t.length < t.highWaterMark || (t.flowing && t.length === 0))
        ) {
          var r = t.length
          h('maybeReadMore read 0')
          e.read(0)
          if (r === t.length) break
        }
        t.readingMore = false
      }
      Readable.prototype._read = function (e) {
        A(this, new x('_read()'))
      }
      Readable.prototype.pipe = function (e, t) {
        var r = this
        var s = this._readableState
        switch (s.pipesCount) {
          case 0:
            s.pipes = e
            break
          case 1:
            s.pipes = [s.pipes, e]
            break
          default:
            s.pipes.push(e)
            break
        }
        s.pipesCount += 1
        h('pipe count=%d opts=%j', s.pipesCount, t)
        var a =
          (!t || t.end !== false) &&
          e !== process.stdout &&
          e !== process.stderr
        var u = a ? onend : unpipe
        if (s.endEmitted) process.nextTick(u)
        else r.once('end', u)
        e.on('unpipe', onunpipe)
        function onunpipe(e, t) {
          h('onunpipe')
          if (e === r) {
            if (t && t.hasUnpiped === false) {
              t.hasUnpiped = true
              cleanup()
            }
          }
        }
        function onend() {
          h('onend')
          e.end()
        }
        var c = pipeOnDrain(r)
        e.on('drain', c)
        var f = false
        function cleanup() {
          h('cleanup')
          e.removeListener('close', onclose)
          e.removeListener('finish', onfinish)
          e.removeListener('drain', c)
          e.removeListener('error', onerror)
          e.removeListener('unpipe', onunpipe)
          r.removeListener('end', onend)
          r.removeListener('end', unpipe)
          r.removeListener('data', ondata)
          f = true
          if (s.awaitDrain && (!e._writableState || e._writableState.needDrain))
            c()
        }
        r.on('data', ondata)
        function ondata(t) {
          h('ondata')
          var a = e.write(t)
          h('dest.write', a)
          if (a === false) {
            if (
              ((s.pipesCount === 1 && s.pipes === e) ||
                (s.pipesCount > 1 && indexOf(s.pipes, e) !== -1)) &&
              !f
            ) {
              h('false write response, pause', s.awaitDrain)
              s.awaitDrain++
            }
            r.pause()
          }
        }
        function onerror(t) {
          h('onerror', t)
          unpipe()
          e.removeListener('error', onerror)
          if (o(e, 'error') === 0) A(e, t)
        }
        prependListener(e, 'error', onerror)
        function onclose() {
          e.removeListener('finish', onfinish)
          unpipe()
        }
        e.once('close', onclose)
        function onfinish() {
          h('onfinish')
          e.removeListener('close', onclose)
          unpipe()
        }
        e.once('finish', onfinish)
        function unpipe() {
          h('unpipe')
          r.unpipe(e)
        }
        e.emit('pipe', r)
        if (!s.flowing) {
          h('pipe resume')
          r.resume()
        }
        return e
      }
      function pipeOnDrain(e) {
        return function pipeOnDrainFunctionResult() {
          var t = e._readableState
          h('pipeOnDrain', t.awaitDrain)
          if (t.awaitDrain) t.awaitDrain--
          if (t.awaitDrain === 0 && o(e, 'data')) {
            t.flowing = true
            flow(e)
          }
        }
      }
      Readable.prototype.unpipe = function (e) {
        var t = this._readableState
        var r = { hasUnpiped: false }
        if (t.pipesCount === 0) return this
        if (t.pipesCount === 1) {
          if (e && e !== t.pipes) return this
          if (!e) e = t.pipes
          t.pipes = null
          t.pipesCount = 0
          t.flowing = false
          if (e) e.emit('unpipe', this, r)
          return this
        }
        if (!e) {
          var s = t.pipes
          var a = t.pipesCount
          t.pipes = null
          t.pipesCount = 0
          t.flowing = false
          for (var o = 0; o < a; o++) {
            s[o].emit('unpipe', this, { hasUnpiped: false })
          }
          return this
        }
        var u = indexOf(t.pipes, e)
        if (u === -1) return this
        t.pipes.splice(u, 1)
        t.pipesCount -= 1
        if (t.pipesCount === 1) t.pipes = t.pipes[0]
        e.emit('unpipe', this, r)
        return this
      }
      Readable.prototype.on = function (e, t) {
        var r = u.prototype.on.call(this, e, t)
        var s = this._readableState
        if (e === 'data') {
          s.readableListening = this.listenerCount('readable') > 0
          if (s.flowing !== false) this.resume()
        } else if (e === 'readable') {
          if (!s.endEmitted && !s.readableListening) {
            s.readableListening = s.needReadable = true
            s.flowing = false
            s.emittedReadable = false
            h('on readable', s.length, s.reading)
            if (s.length) {
              emitReadable(this)
            } else if (!s.reading) {
              process.nextTick(nReadingNextTick, this)
            }
          }
        }
        return r
      }
      Readable.prototype.addListener = Readable.prototype.on
      Readable.prototype.removeListener = function (e, t) {
        var r = u.prototype.removeListener.call(this, e, t)
        if (e === 'readable') {
          process.nextTick(updateReadableListening, this)
        }
        return r
      }
      Readable.prototype.removeAllListeners = function (e) {
        var t = u.prototype.removeAllListeners.apply(this, arguments)
        if (e === 'readable' || e === undefined) {
          process.nextTick(updateReadableListening, this)
        }
        return t
      }
      function updateReadableListening(e) {
        var t = e._readableState
        t.readableListening = e.listenerCount('readable') > 0
        if (t.resumeScheduled && !t.paused) {
          t.flowing = true
        } else if (e.listenerCount('data') > 0) {
          e.resume()
        }
      }
      function nReadingNextTick(e) {
        h('readable nexttick read 0')
        e.read(0)
      }
      Readable.prototype.resume = function () {
        var e = this._readableState
        if (!e.flowing) {
          h('resume')
          e.flowing = !e.readableListening
          resume(this, e)
        }
        e.paused = false
        return this
      }
      function resume(e, t) {
        if (!t.resumeScheduled) {
          t.resumeScheduled = true
          process.nextTick(resume_, e, t)
        }
      }
      function resume_(e, t) {
        h('resume', t.reading)
        if (!t.reading) {
          e.read(0)
        }
        t.resumeScheduled = false
        e.emit('resume')
        flow(e)
        if (t.flowing && !t.reading) e.read(0)
      }
      Readable.prototype.pause = function () {
        h('call pause flowing=%j', this._readableState.flowing)
        if (this._readableState.flowing !== false) {
          h('pause')
          this._readableState.flowing = false
          this.emit('pause')
        }
        this._readableState.paused = true
        return this
      }
      function flow(e) {
        var t = e._readableState
        h('flow', t.flowing)
        while (t.flowing && e.read() !== null) {}
      }
      Readable.prototype.wrap = function (e) {
        var t = this
        var r = this._readableState
        var s = false
        e.on('end', function () {
          h('wrapped end')
          if (r.decoder && !r.ended) {
            var e = r.decoder.end()
            if (e && e.length) t.push(e)
          }
          t.push(null)
        })
        e.on('data', function (a) {
          h('wrapped data')
          if (r.decoder) a = r.decoder.write(a)
          if (r.objectMode && (a === null || a === undefined)) return
          else if (!r.objectMode && (!a || !a.length)) return
          var o = t.push(a)
          if (!o) {
            s = true
            e.pause()
          }
        })
        for (var a in e) {
          if (this[a] === undefined && typeof e[a] === 'function') {
            this[a] = (function methodWrap(t) {
              return function methodWrapReturnFunction() {
                return e[t].apply(e, arguments)
              }
            })(a)
          }
        }
        for (var o = 0; o < R.length; o++) {
          e.on(R[o], this.emit.bind(this, R[o]))
        }
        this._read = function (t) {
          h('wrapped _read', t)
          if (s) {
            s = false
            e.resume()
          }
        }
        return this
      }
      if (typeof Symbol === 'function') {
        Readable.prototype[Symbol.asyncIterator] = function () {
          if (C === undefined) {
            C = r(6871)
          }
          return C(this)
        }
      }
      Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
        enumerable: false,
        get: function get() {
          return this._readableState.highWaterMark
        },
      })
      Object.defineProperty(Readable.prototype, 'readableBuffer', {
        enumerable: false,
        get: function get() {
          return this._readableState && this._readableState.buffer
        },
      })
      Object.defineProperty(Readable.prototype, 'readableFlowing', {
        enumerable: false,
        get: function get() {
          return this._readableState.flowing
        },
        set: function set(e) {
          if (this._readableState) {
            this._readableState.flowing = e
          }
        },
      })
      Readable._fromList = fromList
      Object.defineProperty(Readable.prototype, 'readableLength', {
        enumerable: false,
        get: function get() {
          return this._readableState.length
        },
      })
      function fromList(e, t) {
        if (t.length === 0) return null
        var r
        if (t.objectMode) r = t.buffer.shift()
        else if (!e || e >= t.length) {
          if (t.decoder) r = t.buffer.join('')
          else if (t.buffer.length === 1) r = t.buffer.first()
          else r = t.buffer.concat(t.length)
          t.buffer.clear()
        } else {
          r = t.buffer.consume(e, t.decoder)
        }
        return r
      }
      function endReadable(e) {
        var t = e._readableState
        h('endReadable', t.endEmitted)
        if (!t.endEmitted) {
          t.ended = true
          process.nextTick(endReadableNT, t, e)
        }
      }
      function endReadableNT(e, t) {
        h('endReadableNT', e.endEmitted, e.length)
        if (!e.endEmitted && e.length === 0) {
          e.endEmitted = true
          t.readable = false
          t.emit('end')
          if (e.autoDestroy) {
            var r = t._writableState
            if (!r || (r.autoDestroy && r.finished)) {
              t.destroy()
            }
          }
        }
      }
      if (typeof Symbol === 'function') {
        Readable.from = function (e, t) {
          if (S === undefined) {
            S = r(9727)
          }
          return S(Readable, e, t)
        }
      }
      function indexOf(e, t) {
        for (var r = 0, s = e.length; r < s; r++) {
          if (e[r] === t) return r
        }
        return -1
      }
    },
    1170: (e, t, r) => {
      e.exports = Transform
      var s = r(4646).q,
        a = s.ERR_METHOD_NOT_IMPLEMENTED,
        o = s.ERR_MULTIPLE_CALLBACK,
        u = s.ERR_TRANSFORM_ALREADY_TRANSFORMING,
        c = s.ERR_TRANSFORM_WITH_LENGTH_0
      var f = r(2403)
      r(2842)(Transform, f)
      function afterTransform(e, t) {
        var r = this._transformState
        r.transforming = false
        var s = r.writecb
        if (s === null) {
          return this.emit('error', new o())
        }
        r.writechunk = null
        r.writecb = null
        if (t != null) this.push(t)
        s(e)
        var a = this._readableState
        a.reading = false
        if (a.needReadable || a.length < a.highWaterMark) {
          this._read(a.highWaterMark)
        }
      }
      function Transform(e) {
        if (!(this instanceof Transform)) return new Transform(e)
        f.call(this, e)
        this._transformState = {
          afterTransform: afterTransform.bind(this),
          needTransform: false,
          transforming: false,
          writecb: null,
          writechunk: null,
          writeencoding: null,
        }
        this._readableState.needReadable = true
        this._readableState.sync = false
        if (e) {
          if (typeof e.transform === 'function') this._transform = e.transform
          if (typeof e.flush === 'function') this._flush = e.flush
        }
        this.on('prefinish', prefinish)
      }
      function prefinish() {
        var e = this
        if (
          typeof this._flush === 'function' &&
          !this._readableState.destroyed
        ) {
          this._flush(function (t, r) {
            done(e, t, r)
          })
        } else {
          done(this, null, null)
        }
      }
      Transform.prototype.push = function (e, t) {
        this._transformState.needTransform = false
        return f.prototype.push.call(this, e, t)
      }
      Transform.prototype._transform = function (e, t, r) {
        r(new a('_transform()'))
      }
      Transform.prototype._write = function (e, t, r) {
        var s = this._transformState
        s.writecb = r
        s.writechunk = e
        s.writeencoding = t
        if (!s.transforming) {
          var a = this._readableState
          if (s.needTransform || a.needReadable || a.length < a.highWaterMark)
            this._read(a.highWaterMark)
        }
      }
      Transform.prototype._read = function (e) {
        var t = this._transformState
        if (t.writechunk !== null && !t.transforming) {
          t.transforming = true
          this._transform(t.writechunk, t.writeencoding, t.afterTransform)
        } else {
          t.needTransform = true
        }
      }
      Transform.prototype._destroy = function (e, t) {
        f.prototype._destroy.call(this, e, function (e) {
          t(e)
        })
      }
      function done(e, t, r) {
        if (t) return e.emit('error', t)
        if (r != null) e.push(r)
        if (e._writableState.length) throw new c()
        if (e._transformState.transforming) throw new u()
        return e.push(null)
      }
    },
    7337: (e, t, r) => {
      e.exports = Writable
      function WriteReq(e, t, r) {
        this.chunk = e
        this.encoding = t
        this.callback = r
        this.next = null
      }
      function CorkedRequest(e) {
        var t = this
        this.next = null
        this.entry = null
        this.finish = function () {
          onCorkedFinish(t, e)
        }
      }
      var s
      Writable.WritableState = WritableState
      var a = { deprecate: r(6124) }
      var o = r(4678)
      var u = r(4300).Buffer
      var c = global.Uint8Array || function () {}
      function _uint8ArrayToBuffer(e) {
        return u.from(e)
      }
      function _isUint8Array(e) {
        return u.isBuffer(e) || e instanceof c
      }
      var f = r(7025)
      var p = r(6776),
        h = p.getHighWaterMark
      var d = r(4646).q,
        g = d.ERR_INVALID_ARG_TYPE,
        v = d.ERR_METHOD_NOT_IMPLEMENTED,
        m = d.ERR_MULTIPLE_CALLBACK,
        y = d.ERR_STREAM_CANNOT_PIPE,
        _ = d.ERR_STREAM_DESTROYED,
        D = d.ERR_STREAM_NULL_VALUES,
        x = d.ERR_STREAM_WRITE_AFTER_END,
        E = d.ERR_UNKNOWN_ENCODING
      var w = f.errorOrDestroy
      r(2842)(Writable, o)
      function nop() {}
      function WritableState(e, t, a) {
        s = s || r(2403)
        e = e || {}
        if (typeof a !== 'boolean') a = t instanceof s
        this.objectMode = !!e.objectMode
        if (a) this.objectMode = this.objectMode || !!e.writableObjectMode
        this.highWaterMark = h(this, e, 'writableHighWaterMark', a)
        this.finalCalled = false
        this.needDrain = false
        this.ending = false
        this.ended = false
        this.finished = false
        this.destroyed = false
        var o = e.decodeStrings === false
        this.decodeStrings = !o
        this.defaultEncoding = e.defaultEncoding || 'utf8'
        this.length = 0
        this.writing = false
        this.corked = 0
        this.sync = true
        this.bufferProcessing = false
        this.onwrite = function (e) {
          onwrite(t, e)
        }
        this.writecb = null
        this.writelen = 0
        this.bufferedRequest = null
        this.lastBufferedRequest = null
        this.pendingcb = 0
        this.prefinished = false
        this.errorEmitted = false
        this.emitClose = e.emitClose !== false
        this.autoDestroy = !!e.autoDestroy
        this.bufferedRequestCount = 0
        this.corkedRequestsFree = new CorkedRequest(this)
      }
      WritableState.prototype.getBuffer = function getBuffer() {
        var e = this.bufferedRequest
        var t = []
        while (e) {
          t.push(e)
          e = e.next
        }
        return t
      }
      ;(function () {
        try {
          Object.defineProperty(WritableState.prototype, 'buffer', {
            get: a.deprecate(
              function writableStateBufferGetter() {
                return this.getBuffer()
              },
              '_writableState.buffer is deprecated. Use _writableState.getBuffer ' +
                'instead.',
              'DEP0003'
            ),
          })
        } catch (e) {}
      })()
      var C
      if (
        typeof Symbol === 'function' &&
        Symbol.hasInstance &&
        typeof Function.prototype[Symbol.hasInstance] === 'function'
      ) {
        C = Function.prototype[Symbol.hasInstance]
        Object.defineProperty(Writable, Symbol.hasInstance, {
          value: function value(e) {
            if (C.call(this, e)) return true
            if (this !== Writable) return false
            return e && e._writableState instanceof WritableState
          },
        })
      } else {
        C = function realHasInstance(e) {
          return e instanceof this
        }
      }
      function Writable(e) {
        s = s || r(2403)
        var t = this instanceof s
        if (!t && !C.call(Writable, this)) return new Writable(e)
        this._writableState = new WritableState(e, this, t)
        this.writable = true
        if (e) {
          if (typeof e.write === 'function') this._write = e.write
          if (typeof e.writev === 'function') this._writev = e.writev
          if (typeof e.destroy === 'function') this._destroy = e.destroy
          if (typeof e.final === 'function') this._final = e.final
        }
        o.call(this)
      }
      Writable.prototype.pipe = function () {
        w(this, new y())
      }
      function writeAfterEnd(e, t) {
        var r = new x()
        w(e, r)
        process.nextTick(t, r)
      }
      function validChunk(e, t, r, s) {
        var a
        if (r === null) {
          a = new D()
        } else if (typeof r !== 'string' && !t.objectMode) {
          a = new g('chunk', ['string', 'Buffer'], r)
        }
        if (a) {
          w(e, a)
          process.nextTick(s, a)
          return false
        }
        return true
      }
      Writable.prototype.write = function (e, t, r) {
        var s = this._writableState
        var a = false
        var o = !s.objectMode && _isUint8Array(e)
        if (o && !u.isBuffer(e)) {
          e = _uint8ArrayToBuffer(e)
        }
        if (typeof t === 'function') {
          r = t
          t = null
        }
        if (o) t = 'buffer'
        else if (!t) t = s.defaultEncoding
        if (typeof r !== 'function') r = nop
        if (s.ending) writeAfterEnd(this, r)
        else if (o || validChunk(this, s, e, r)) {
          s.pendingcb++
          a = writeOrBuffer(this, s, o, e, t, r)
        }
        return a
      }
      Writable.prototype.cork = function () {
        this._writableState.corked++
      }
      Writable.prototype.uncork = function () {
        var e = this._writableState
        if (e.corked) {
          e.corked--
          if (
            !e.writing &&
            !e.corked &&
            !e.bufferProcessing &&
            e.bufferedRequest
          )
            clearBuffer(this, e)
        }
      }
      Writable.prototype.setDefaultEncoding = function setDefaultEncoding(e) {
        if (typeof e === 'string') e = e.toLowerCase()
        if (
          !(
            [
              'hex',
              'utf8',
              'utf-8',
              'ascii',
              'binary',
              'base64',
              'ucs2',
              'ucs-2',
              'utf16le',
              'utf-16le',
              'raw',
            ].indexOf((e + '').toLowerCase()) > -1
          )
        )
          throw new E(e)
        this._writableState.defaultEncoding = e
        return this
      }
      Object.defineProperty(Writable.prototype, 'writableBuffer', {
        enumerable: false,
        get: function get() {
          return this._writableState && this._writableState.getBuffer()
        },
      })
      function decodeChunk(e, t, r) {
        if (
          !e.objectMode &&
          e.decodeStrings !== false &&
          typeof t === 'string'
        ) {
          t = u.from(t, r)
        }
        return t
      }
      Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
        enumerable: false,
        get: function get() {
          return this._writableState.highWaterMark
        },
      })
      function writeOrBuffer(e, t, r, s, a, o) {
        if (!r) {
          var u = decodeChunk(t, s, a)
          if (s !== u) {
            r = true
            a = 'buffer'
            s = u
          }
        }
        var c = t.objectMode ? 1 : s.length
        t.length += c
        var f = t.length < t.highWaterMark
        if (!f) t.needDrain = true
        if (t.writing || t.corked) {
          var p = t.lastBufferedRequest
          t.lastBufferedRequest = {
            chunk: s,
            encoding: a,
            isBuf: r,
            callback: o,
            next: null,
          }
          if (p) {
            p.next = t.lastBufferedRequest
          } else {
            t.bufferedRequest = t.lastBufferedRequest
          }
          t.bufferedRequestCount += 1
        } else {
          doWrite(e, t, false, c, s, a, o)
        }
        return f
      }
      function doWrite(e, t, r, s, a, o, u) {
        t.writelen = s
        t.writecb = u
        t.writing = true
        t.sync = true
        if (t.destroyed) t.onwrite(new _('write'))
        else if (r) e._writev(a, t.onwrite)
        else e._write(a, o, t.onwrite)
        t.sync = false
      }
      function onwriteError(e, t, r, s, a) {
        --t.pendingcb
        if (r) {
          process.nextTick(a, s)
          process.nextTick(finishMaybe, e, t)
          e._writableState.errorEmitted = true
          w(e, s)
        } else {
          a(s)
          e._writableState.errorEmitted = true
          w(e, s)
          finishMaybe(e, t)
        }
      }
      function onwriteStateUpdate(e) {
        e.writing = false
        e.writecb = null
        e.length -= e.writelen
        e.writelen = 0
      }
      function onwrite(e, t) {
        var r = e._writableState
        var s = r.sync
        var a = r.writecb
        if (typeof a !== 'function') throw new m()
        onwriteStateUpdate(r)
        if (t) onwriteError(e, r, s, t, a)
        else {
          var o = needFinish(r) || e.destroyed
          if (!o && !r.corked && !r.bufferProcessing && r.bufferedRequest) {
            clearBuffer(e, r)
          }
          if (s) {
            process.nextTick(afterWrite, e, r, o, a)
          } else {
            afterWrite(e, r, o, a)
          }
        }
      }
      function afterWrite(e, t, r, s) {
        if (!r) onwriteDrain(e, t)
        t.pendingcb--
        s()
        finishMaybe(e, t)
      }
      function onwriteDrain(e, t) {
        if (t.length === 0 && t.needDrain) {
          t.needDrain = false
          e.emit('drain')
        }
      }
      function clearBuffer(e, t) {
        t.bufferProcessing = true
        var r = t.bufferedRequest
        if (e._writev && r && r.next) {
          var s = t.bufferedRequestCount
          var a = new Array(s)
          var o = t.corkedRequestsFree
          o.entry = r
          var u = 0
          var c = true
          while (r) {
            a[u] = r
            if (!r.isBuf) c = false
            r = r.next
            u += 1
          }
          a.allBuffers = c
          doWrite(e, t, true, t.length, a, '', o.finish)
          t.pendingcb++
          t.lastBufferedRequest = null
          if (o.next) {
            t.corkedRequestsFree = o.next
            o.next = null
          } else {
            t.corkedRequestsFree = new CorkedRequest(t)
          }
          t.bufferedRequestCount = 0
        } else {
          while (r) {
            var f = r.chunk
            var p = r.encoding
            var h = r.callback
            var d = t.objectMode ? 1 : f.length
            doWrite(e, t, false, d, f, p, h)
            r = r.next
            t.bufferedRequestCount--
            if (t.writing) {
              break
            }
          }
          if (r === null) t.lastBufferedRequest = null
        }
        t.bufferedRequest = r
        t.bufferProcessing = false
      }
      Writable.prototype._write = function (e, t, r) {
        r(new v('_write()'))
      }
      Writable.prototype._writev = null
      Writable.prototype.end = function (e, t, r) {
        var s = this._writableState
        if (typeof e === 'function') {
          r = e
          e = null
          t = null
        } else if (typeof t === 'function') {
          r = t
          t = null
        }
        if (e !== null && e !== undefined) this.write(e, t)
        if (s.corked) {
          s.corked = 1
          this.uncork()
        }
        if (!s.ending) endWritable(this, s, r)
        return this
      }
      Object.defineProperty(Writable.prototype, 'writableLength', {
        enumerable: false,
        get: function get() {
          return this._writableState.length
        },
      })
      function needFinish(e) {
        return (
          e.ending &&
          e.length === 0 &&
          e.bufferedRequest === null &&
          !e.finished &&
          !e.writing
        )
      }
      function callFinal(e, t) {
        e._final(function (r) {
          t.pendingcb--
          if (r) {
            w(e, r)
          }
          t.prefinished = true
          e.emit('prefinish')
          finishMaybe(e, t)
        })
      }
      function prefinish(e, t) {
        if (!t.prefinished && !t.finalCalled) {
          if (typeof e._final === 'function' && !t.destroyed) {
            t.pendingcb++
            t.finalCalled = true
            process.nextTick(callFinal, e, t)
          } else {
            t.prefinished = true
            e.emit('prefinish')
          }
        }
      }
      function finishMaybe(e, t) {
        var r = needFinish(t)
        if (r) {
          prefinish(e, t)
          if (t.pendingcb === 0) {
            t.finished = true
            e.emit('finish')
            if (t.autoDestroy) {
              var s = e._readableState
              if (!s || (s.autoDestroy && s.endEmitted)) {
                e.destroy()
              }
            }
          }
        }
        return r
      }
      function endWritable(e, t, r) {
        t.ending = true
        finishMaybe(e, t)
        if (r) {
          if (t.finished) process.nextTick(r)
          else e.once('finish', r)
        }
        t.ended = true
        e.writable = false
      }
      function onCorkedFinish(e, t, r) {
        var s = e.entry
        e.entry = null
        while (s) {
          var a = s.callback
          t.pendingcb--
          a(r)
          s = s.next
        }
        t.corkedRequestsFree.next = e
      }
      Object.defineProperty(Writable.prototype, 'destroyed', {
        enumerable: false,
        get: function get() {
          if (this._writableState === undefined) {
            return false
          }
          return this._writableState.destroyed
        },
        set: function set(e) {
          if (!this._writableState) {
            return
          }
          this._writableState.destroyed = e
        },
      })
      Writable.prototype.destroy = f.destroy
      Writable.prototype._undestroy = f.undestroy
      Writable.prototype._destroy = function (e, t) {
        t(e)
      }
    },
    6871: (e, t, r) => {
      var s
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
      var a = r(9698)
      var o = Symbol('lastResolve')
      var u = Symbol('lastReject')
      var c = Symbol('error')
      var f = Symbol('ended')
      var p = Symbol('lastPromise')
      var h = Symbol('handlePromise')
      var d = Symbol('stream')
      function createIterResult(e, t) {
        return { value: e, done: t }
      }
      function readAndResolve(e) {
        var t = e[o]
        if (t !== null) {
          var r = e[d].read()
          if (r !== null) {
            e[p] = null
            e[o] = null
            e[u] = null
            t(createIterResult(r, false))
          }
        }
      }
      function onReadable(e) {
        process.nextTick(readAndResolve, e)
      }
      function wrapForNext(e, t) {
        return function (r, s) {
          e.then(function () {
            if (t[f]) {
              r(createIterResult(undefined, true))
              return
            }
            t[h](r, s)
          }, s)
        }
      }
      var g = Object.getPrototypeOf(function () {})
      var v = Object.setPrototypeOf(
        ((s = {
          get stream() {
            return this[d]
          },
          next: function next() {
            var e = this
            var t = this[c]
            if (t !== null) {
              return Promise.reject(t)
            }
            if (this[f]) {
              return Promise.resolve(createIterResult(undefined, true))
            }
            if (this[d].destroyed) {
              return new Promise(function (t, r) {
                process.nextTick(function () {
                  if (e[c]) {
                    r(e[c])
                  } else {
                    t(createIterResult(undefined, true))
                  }
                })
              })
            }
            var r = this[p]
            var s
            if (r) {
              s = new Promise(wrapForNext(r, this))
            } else {
              var a = this[d].read()
              if (a !== null) {
                return Promise.resolve(createIterResult(a, false))
              }
              s = new Promise(this[h])
            }
            this[p] = s
            return s
          },
        }),
        _defineProperty(s, Symbol.asyncIterator, function () {
          return this
        }),
        _defineProperty(s, 'return', function _return() {
          var e = this
          return new Promise(function (t, r) {
            e[d].destroy(null, function (e) {
              if (e) {
                r(e)
                return
              }
              t(createIterResult(undefined, true))
            })
          })
        }),
        s),
        g
      )
      var m = function createReadableStreamAsyncIterator(e) {
        var t
        var r = Object.create(
          v,
          ((t = {}),
          _defineProperty(t, d, { value: e, writable: true }),
          _defineProperty(t, o, { value: null, writable: true }),
          _defineProperty(t, u, { value: null, writable: true }),
          _defineProperty(t, c, { value: null, writable: true }),
          _defineProperty(t, f, {
            value: e._readableState.endEmitted,
            writable: true,
          }),
          _defineProperty(t, h, {
            value: function value(e, t) {
              var s = r[d].read()
              if (s) {
                r[p] = null
                r[o] = null
                r[u] = null
                e(createIterResult(s, false))
              } else {
                r[o] = e
                r[u] = t
              }
            },
            writable: true,
          }),
          t)
        )
        r[p] = null
        a(e, function (e) {
          if (e && e.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
            var t = r[u]
            if (t !== null) {
              r[p] = null
              r[o] = null
              r[u] = null
              t(e)
            }
            r[c] = e
            return
          }
          var s = r[o]
          if (s !== null) {
            r[p] = null
            r[o] = null
            r[u] = null
            s(createIterResult(undefined, true))
          }
          r[f] = true
        })
        e.on('readable', onReadable.bind(null, r))
        return r
      }
      e.exports = m
    },
    4379: (e, t, r) => {
      function ownKeys(e, t) {
        var r = Object.keys(e)
        if (Object.getOwnPropertySymbols) {
          var s = Object.getOwnPropertySymbols(e)
          if (t)
            s = s.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            })
          r.push.apply(r, s)
        }
        return r
      }
      function _objectSpread(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t] != null ? arguments[t] : {}
          if (t % 2) {
            ownKeys(Object(r), true).forEach(function (t) {
              _defineProperty(e, t, r[t])
            })
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          } else {
            ownKeys(Object(r)).forEach(function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
          }
        }
        return e
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
      function _classCallCheck(e, t) {
        if (!(e instanceof t)) {
          throw new TypeError('Cannot call a class as a function')
        }
      }
      function _defineProperties(e, t) {
        for (var r = 0; r < t.length; r++) {
          var s = t[r]
          s.enumerable = s.enumerable || false
          s.configurable = true
          if ('value' in s) s.writable = true
          Object.defineProperty(e, s.key, s)
        }
      }
      function _createClass(e, t, r) {
        if (t) _defineProperties(e.prototype, t)
        if (r) _defineProperties(e, r)
        return e
      }
      var s = r(4300),
        a = s.Buffer
      var o = r(3837),
        u = o.inspect
      var c = (u && u.custom) || 'inspect'
      function copyBuffer(e, t, r) {
        a.prototype.copy.call(e, t, r)
      }
      e.exports = (function () {
        function BufferList() {
          _classCallCheck(this, BufferList)
          this.head = null
          this.tail = null
          this.length = 0
        }
        _createClass(BufferList, [
          {
            key: 'push',
            value: function push(e) {
              var t = { data: e, next: null }
              if (this.length > 0) this.tail.next = t
              else this.head = t
              this.tail = t
              ++this.length
            },
          },
          {
            key: 'unshift',
            value: function unshift(e) {
              var t = { data: e, next: this.head }
              if (this.length === 0) this.tail = t
              this.head = t
              ++this.length
            },
          },
          {
            key: 'shift',
            value: function shift() {
              if (this.length === 0) return
              var e = this.head.data
              if (this.length === 1) this.head = this.tail = null
              else this.head = this.head.next
              --this.length
              return e
            },
          },
          {
            key: 'clear',
            value: function clear() {
              this.head = this.tail = null
              this.length = 0
            },
          },
          {
            key: 'join',
            value: function join(e) {
              if (this.length === 0) return ''
              var t = this.head
              var r = '' + t.data
              while ((t = t.next)) {
                r += e + t.data
              }
              return r
            },
          },
          {
            key: 'concat',
            value: function concat(e) {
              if (this.length === 0) return a.alloc(0)
              var t = a.allocUnsafe(e >>> 0)
              var r = this.head
              var s = 0
              while (r) {
                copyBuffer(r.data, t, s)
                s += r.data.length
                r = r.next
              }
              return t
            },
          },
          {
            key: 'consume',
            value: function consume(e, t) {
              var r
              if (e < this.head.data.length) {
                r = this.head.data.slice(0, e)
                this.head.data = this.head.data.slice(e)
              } else if (e === this.head.data.length) {
                r = this.shift()
              } else {
                r = t ? this._getString(e) : this._getBuffer(e)
              }
              return r
            },
          },
          {
            key: 'first',
            value: function first() {
              return this.head.data
            },
          },
          {
            key: '_getString',
            value: function _getString(e) {
              var t = this.head
              var r = 1
              var s = t.data
              e -= s.length
              while ((t = t.next)) {
                var a = t.data
                var o = e > a.length ? a.length : e
                if (o === a.length) s += a
                else s += a.slice(0, e)
                e -= o
                if (e === 0) {
                  if (o === a.length) {
                    ++r
                    if (t.next) this.head = t.next
                    else this.head = this.tail = null
                  } else {
                    this.head = t
                    t.data = a.slice(o)
                  }
                  break
                }
                ++r
              }
              this.length -= r
              return s
            },
          },
          {
            key: '_getBuffer',
            value: function _getBuffer(e) {
              var t = a.allocUnsafe(e)
              var r = this.head
              var s = 1
              r.data.copy(t)
              e -= r.data.length
              while ((r = r.next)) {
                var o = r.data
                var u = e > o.length ? o.length : e
                o.copy(t, t.length - e, 0, u)
                e -= u
                if (e === 0) {
                  if (u === o.length) {
                    ++s
                    if (r.next) this.head = r.next
                    else this.head = this.tail = null
                  } else {
                    this.head = r
                    r.data = o.slice(u)
                  }
                  break
                }
                ++s
              }
              this.length -= s
              return t
            },
          },
          {
            key: c,
            value: function value(e, t) {
              return u(
                this,
                _objectSpread({}, t, { depth: 0, customInspect: false })
              )
            },
          },
        ])
        return BufferList
      })()
    },
    7025: (e) => {
      function destroy(e, t) {
        var r = this
        var s = this._readableState && this._readableState.destroyed
        var a = this._writableState && this._writableState.destroyed
        if (s || a) {
          if (t) {
            t(e)
          } else if (e) {
            if (!this._writableState) {
              process.nextTick(emitErrorNT, this, e)
            } else if (!this._writableState.errorEmitted) {
              this._writableState.errorEmitted = true
              process.nextTick(emitErrorNT, this, e)
            }
          }
          return this
        }
        if (this._readableState) {
          this._readableState.destroyed = true
        }
        if (this._writableState) {
          this._writableState.destroyed = true
        }
        this._destroy(e || null, function (e) {
          if (!t && e) {
            if (!r._writableState) {
              process.nextTick(emitErrorAndCloseNT, r, e)
            } else if (!r._writableState.errorEmitted) {
              r._writableState.errorEmitted = true
              process.nextTick(emitErrorAndCloseNT, r, e)
            } else {
              process.nextTick(emitCloseNT, r)
            }
          } else if (t) {
            process.nextTick(emitCloseNT, r)
            t(e)
          } else {
            process.nextTick(emitCloseNT, r)
          }
        })
        return this
      }
      function emitErrorAndCloseNT(e, t) {
        emitErrorNT(e, t)
        emitCloseNT(e)
      }
      function emitCloseNT(e) {
        if (e._writableState && !e._writableState.emitClose) return
        if (e._readableState && !e._readableState.emitClose) return
        e.emit('close')
      }
      function undestroy() {
        if (this._readableState) {
          this._readableState.destroyed = false
          this._readableState.reading = false
          this._readableState.ended = false
          this._readableState.endEmitted = false
        }
        if (this._writableState) {
          this._writableState.destroyed = false
          this._writableState.ended = false
          this._writableState.ending = false
          this._writableState.finalCalled = false
          this._writableState.prefinished = false
          this._writableState.finished = false
          this._writableState.errorEmitted = false
        }
      }
      function emitErrorNT(e, t) {
        e.emit('error', t)
      }
      function errorOrDestroy(e, t) {
        var r = e._readableState
        var s = e._writableState
        if ((r && r.autoDestroy) || (s && s.autoDestroy)) e.destroy(t)
        else e.emit('error', t)
      }
      e.exports = {
        destroy: destroy,
        undestroy: undestroy,
        errorOrDestroy: errorOrDestroy,
      }
    },
    9698: (e, t, r) => {
      var s = r(4646).q.ERR_STREAM_PREMATURE_CLOSE
      function once(e) {
        var t = false
        return function () {
          if (t) return
          t = true
          for (var r = arguments.length, s = new Array(r), a = 0; a < r; a++) {
            s[a] = arguments[a]
          }
          e.apply(this, s)
        }
      }
      function noop() {}
      function isRequest(e) {
        return e.setHeader && typeof e.abort === 'function'
      }
      function eos(e, t, r) {
        if (typeof t === 'function') return eos(e, null, t)
        if (!t) t = {}
        r = once(r || noop)
        var a = t.readable || (t.readable !== false && e.readable)
        var o = t.writable || (t.writable !== false && e.writable)
        var u = function onlegacyfinish() {
          if (!e.writable) f()
        }
        var c = e._writableState && e._writableState.finished
        var f = function onfinish() {
          o = false
          c = true
          if (!a) r.call(e)
        }
        var p = e._readableState && e._readableState.endEmitted
        var h = function onend() {
          a = false
          p = true
          if (!o) r.call(e)
        }
        var d = function onerror(t) {
          r.call(e, t)
        }
        var g = function onclose() {
          var t
          if (a && !p) {
            if (!e._readableState || !e._readableState.ended) t = new s()
            return r.call(e, t)
          }
          if (o && !c) {
            if (!e._writableState || !e._writableState.ended) t = new s()
            return r.call(e, t)
          }
        }
        var v = function onrequest() {
          e.req.on('finish', f)
        }
        if (isRequest(e)) {
          e.on('complete', f)
          e.on('abort', g)
          if (e.req) v()
          else e.on('request', v)
        } else if (o && !e._writableState) {
          e.on('end', u)
          e.on('close', u)
        }
        e.on('end', h)
        e.on('finish', f)
        if (t.error !== false) e.on('error', d)
        e.on('close', g)
        return function () {
          e.removeListener('complete', f)
          e.removeListener('abort', g)
          e.removeListener('request', v)
          if (e.req) e.req.removeListener('finish', f)
          e.removeListener('end', u)
          e.removeListener('close', u)
          e.removeListener('finish', f)
          e.removeListener('end', h)
          e.removeListener('error', d)
          e.removeListener('close', g)
        }
      }
      e.exports = eos
    },
    9727: (e, t, r) => {
      function asyncGeneratorStep(e, t, r, s, a, o, u) {
        try {
          var c = e[o](u)
          var f = c.value
        } catch (e) {
          r(e)
          return
        }
        if (c.done) {
          t(f)
        } else {
          Promise.resolve(f).then(s, a)
        }
      }
      function _asyncToGenerator(e) {
        return function () {
          var t = this,
            r = arguments
          return new Promise(function (s, a) {
            var o = e.apply(t, r)
            function _next(e) {
              asyncGeneratorStep(o, s, a, _next, _throw, 'next', e)
            }
            function _throw(e) {
              asyncGeneratorStep(o, s, a, _next, _throw, 'throw', e)
            }
            _next(undefined)
          })
        }
      }
      function ownKeys(e, t) {
        var r = Object.keys(e)
        if (Object.getOwnPropertySymbols) {
          var s = Object.getOwnPropertySymbols(e)
          if (t)
            s = s.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            })
          r.push.apply(r, s)
        }
        return r
      }
      function _objectSpread(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t] != null ? arguments[t] : {}
          if (t % 2) {
            ownKeys(Object(r), true).forEach(function (t) {
              _defineProperty(e, t, r[t])
            })
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          } else {
            ownKeys(Object(r)).forEach(function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
          }
        }
        return e
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
      var s = r(4646).q.ERR_INVALID_ARG_TYPE
      function from(e, t, r) {
        var a
        if (t && typeof t.next === 'function') {
          a = t
        } else if (t && t[Symbol.asyncIterator]) a = t[Symbol.asyncIterator]()
        else if (t && t[Symbol.iterator]) a = t[Symbol.iterator]()
        else throw new s('iterable', ['Iterable'], t)
        var o = new e(_objectSpread({ objectMode: true }, r))
        var u = false
        o._read = function () {
          if (!u) {
            u = true
            next()
          }
        }
        function next() {
          return _next2.apply(this, arguments)
        }
        function _next2() {
          _next2 = _asyncToGenerator(function* () {
            try {
              var e = yield a.next(),
                t = e.value,
                r = e.done
              if (r) {
                o.push(null)
              } else if (o.push(yield t)) {
                next()
              } else {
                u = false
              }
            } catch (e) {
              o.destroy(e)
            }
          })
          return _next2.apply(this, arguments)
        }
        return o
      }
      e.exports = from
    },
    8442: (e, t, r) => {
      var s
      function once(e) {
        var t = false
        return function () {
          if (t) return
          t = true
          e.apply(void 0, arguments)
        }
      }
      var a = r(4646).q,
        o = a.ERR_MISSING_ARGS,
        u = a.ERR_STREAM_DESTROYED
      function noop(e) {
        if (e) throw e
      }
      function isRequest(e) {
        return e.setHeader && typeof e.abort === 'function'
      }
      function destroyer(e, t, a, o) {
        o = once(o)
        var c = false
        e.on('close', function () {
          c = true
        })
        if (s === undefined) s = r(9698)
        s(e, { readable: t, writable: a }, function (e) {
          if (e) return o(e)
          c = true
          o()
        })
        var f = false
        return function (t) {
          if (c) return
          if (f) return
          f = true
          if (isRequest(e)) return e.abort()
          if (typeof e.destroy === 'function') return e.destroy()
          o(t || new u('pipe'))
        }
      }
      function call(e) {
        e()
      }
      function pipe(e, t) {
        return e.pipe(t)
      }
      function popCallback(e) {
        if (!e.length) return noop
        if (typeof e[e.length - 1] !== 'function') return noop
        return e.pop()
      }
      function pipeline() {
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) {
          t[r] = arguments[r]
        }
        var s = popCallback(t)
        if (Array.isArray(t[0])) t = t[0]
        if (t.length < 2) {
          throw new o('streams')
        }
        var a
        var u = t.map(function (e, r) {
          var o = r < t.length - 1
          var c = r > 0
          return destroyer(e, o, c, function (e) {
            if (!a) a = e
            if (e) u.forEach(call)
            if (o) return
            u.forEach(call)
            s(a)
          })
        })
        return t.reduce(pipe)
      }
      e.exports = pipeline
    },
    6776: (e, t, r) => {
      var s = r(4646).q.ERR_INVALID_OPT_VALUE
      function highWaterMarkFrom(e, t, r) {
        return e.highWaterMark != null ? e.highWaterMark : t ? e[r] : null
      }
      function getHighWaterMark(e, t, r, a) {
        var o = highWaterMarkFrom(t, a, r)
        if (o != null) {
          if (!(isFinite(o) && Math.floor(o) === o) || o < 0) {
            var u = a ? r : 'highWaterMark'
            throw new s(u, o)
          }
          return Math.floor(o)
        }
        return e.objectMode ? 16 : 16 * 1024
      }
      e.exports = { getHighWaterMark: getHighWaterMark }
    },
    4678: (e, t, r) => {
      e.exports = r(2781)
    },
    3726: (e, t, r) => {
      var s = r(2781)
      if (process.env.READABLE_STREAM === 'disable' && s) {
        e.exports = s.Readable
        Object.assign(e.exports, s)
        e.exports.Stream = s
      } else {
        t = e.exports = r(1709)
        t.Stream = s || t
        t.Readable = t
        t.Writable = r(7337)
        t.Duplex = r(2403)
        t.Transform = r(1170)
        t.PassThrough = r(7889)
        t.finished = r(9698)
        t.pipeline = r(8442)
      }
    },
    2382: (e, t, r) => {
      const s = r(1017)
      const a = r(8188)
      const o = r(7147)
      const resolveFrom = (e, t, r) => {
        if (typeof e !== 'string') {
          throw new TypeError(
            `Expected \`fromDir\` to be of type \`string\`, got \`${typeof e}\``
          )
        }
        if (typeof t !== 'string') {
          throw new TypeError(
            `Expected \`moduleId\` to be of type \`string\`, got \`${typeof t}\``
          )
        }
        try {
          e = o.realpathSync(e)
        } catch (t) {
          if (t.code === 'ENOENT') {
            e = s.resolve(e)
          } else if (r) {
            return
          } else {
            throw t
          }
        }
        const u = s.join(e, 'noop.js')
        const resolveFileName = () =>
          a._resolveFilename(t, {
            id: u,
            filename: u,
            paths: a._nodeModulePaths(e),
          })
        if (r) {
          try {
            return resolveFileName()
          } catch (e) {
            return
          }
        }
        return resolveFileName()
      }
      e.exports = (e, t) => resolveFrom(e, t)
      e.exports.silent = (e, t) => resolveFrom(e, t, true)
    },
    4700: (e, t, r) => {
      const s = r(9491)
      const a = r(1017)
      const o = r(7147)
      let u = undefined
      try {
        u = r(3460)
      } catch (e) {}
      const c = { nosort: true, silent: true }
      let f = 0
      const p = process.platform === 'win32'
      const defaults = (e) => {
        const t = ['unlink', 'chmod', 'stat', 'lstat', 'rmdir', 'readdir']
        t.forEach((t) => {
          e[t] = e[t] || o[t]
          t = t + 'Sync'
          e[t] = e[t] || o[t]
        })
        e.maxBusyTries = e.maxBusyTries || 3
        e.emfileWait = e.emfileWait || 1e3
        if (e.glob === false) {
          e.disableGlob = true
        }
        if (e.disableGlob !== true && u === undefined) {
          throw Error(
            'glob dependency not found, set `options.disableGlob = true` if intentional'
          )
        }
        e.disableGlob = e.disableGlob || false
        e.glob = e.glob || c
      }
      const rimraf = (e, t, r) => {
        if (typeof t === 'function') {
          r = t
          t = {}
        }
        s(e, 'rimraf: missing path')
        s.equal(typeof e, 'string', 'rimraf: path should be a string')
        s.equal(typeof r, 'function', 'rimraf: callback function required')
        s(t, 'rimraf: invalid options argument provided')
        s.equal(typeof t, 'object', 'rimraf: options should be object')
        defaults(t)
        let a = 0
        let o = null
        let c = 0
        const next = (e) => {
          o = o || e
          if (--c === 0) r(o)
        }
        const afterGlob = (e, s) => {
          if (e) return r(e)
          c = s.length
          if (c === 0) return r()
          s.forEach((e) => {
            const CB = (r) => {
              if (r) {
                if (
                  (r.code === 'EBUSY' ||
                    r.code === 'ENOTEMPTY' ||
                    r.code === 'EPERM') &&
                  a < t.maxBusyTries
                ) {
                  a++
                  return setTimeout(() => rimraf_(e, t, CB), a * 100)
                }
                if (r.code === 'EMFILE' && f < t.emfileWait) {
                  return setTimeout(() => rimraf_(e, t, CB), f++)
                }
                if (r.code === 'ENOENT') r = null
              }
              f = 0
              next(r)
            }
            rimraf_(e, t, CB)
          })
        }
        if (t.disableGlob || !u.hasMagic(e)) return afterGlob(null, [e])
        t.lstat(e, (r, s) => {
          if (!r) return afterGlob(null, [e])
          u(e, t.glob, afterGlob)
        })
      }
      const rimraf_ = (e, t, r) => {
        s(e)
        s(t)
        s(typeof r === 'function')
        t.lstat(e, (s, a) => {
          if (s && s.code === 'ENOENT') return r(null)
          if (s && s.code === 'EPERM' && p) fixWinEPERM(e, t, s, r)
          if (a && a.isDirectory()) return rmdir(e, t, s, r)
          t.unlink(e, (s) => {
            if (s) {
              if (s.code === 'ENOENT') return r(null)
              if (s.code === 'EPERM')
                return p ? fixWinEPERM(e, t, s, r) : rmdir(e, t, s, r)
              if (s.code === 'EISDIR') return rmdir(e, t, s, r)
            }
            return r(s)
          })
        })
      }
      const fixWinEPERM = (e, t, r, a) => {
        s(e)
        s(t)
        s(typeof a === 'function')
        t.chmod(e, 438, (s) => {
          if (s) a(s.code === 'ENOENT' ? null : r)
          else
            t.stat(e, (s, o) => {
              if (s) a(s.code === 'ENOENT' ? null : r)
              else if (o.isDirectory()) rmdir(e, t, r, a)
              else t.unlink(e, a)
            })
        })
      }
      const fixWinEPERMSync = (e, t, r) => {
        s(e)
        s(t)
        try {
          t.chmodSync(e, 438)
        } catch (e) {
          if (e.code === 'ENOENT') return
          else throw r
        }
        let a
        try {
          a = t.statSync(e)
        } catch (e) {
          if (e.code === 'ENOENT') return
          else throw r
        }
        if (a.isDirectory()) rmdirSync(e, t, r)
        else t.unlinkSync(e)
      }
      const rmdir = (e, t, r, a) => {
        s(e)
        s(t)
        s(typeof a === 'function')
        t.rmdir(e, (s) => {
          if (
            s &&
            (s.code === 'ENOTEMPTY' ||
              s.code === 'EEXIST' ||
              s.code === 'EPERM')
          )
            rmkids(e, t, a)
          else if (s && s.code === 'ENOTDIR') a(r)
          else a(s)
        })
      }
      const rmkids = (e, t, r) => {
        s(e)
        s(t)
        s(typeof r === 'function')
        t.readdir(e, (s, o) => {
          if (s) return r(s)
          let u = o.length
          if (u === 0) return t.rmdir(e, r)
          let c
          o.forEach((s) => {
            rimraf(a.join(e, s), t, (s) => {
              if (c) return
              if (s) return r((c = s))
              if (--u === 0) t.rmdir(e, r)
            })
          })
        })
      }
      const rimrafSync = (e, t) => {
        t = t || {}
        defaults(t)
        s(e, 'rimraf: missing path')
        s.equal(typeof e, 'string', 'rimraf: path should be a string')
        s(t, 'rimraf: missing options')
        s.equal(typeof t, 'object', 'rimraf: options should be object')
        let r
        if (t.disableGlob || !u.hasMagic(e)) {
          r = [e]
        } else {
          try {
            t.lstatSync(e)
            r = [e]
          } catch (s) {
            r = u.sync(e, t.glob)
          }
        }
        if (!r.length) return
        for (let e = 0; e < r.length; e++) {
          const s = r[e]
          let a
          try {
            a = t.lstatSync(s)
          } catch (e) {
            if (e.code === 'ENOENT') return
            if (e.code === 'EPERM' && p) fixWinEPERMSync(s, t, e)
          }
          try {
            if (a && a.isDirectory()) rmdirSync(s, t, null)
            else t.unlinkSync(s)
          } catch (e) {
            if (e.code === 'ENOENT') return
            if (e.code === 'EPERM')
              return p ? fixWinEPERMSync(s, t, e) : rmdirSync(s, t, e)
            if (e.code !== 'EISDIR') throw e
            rmdirSync(s, t, e)
          }
        }
      }
      const rmdirSync = (e, t, r) => {
        s(e)
        s(t)
        try {
          t.rmdirSync(e)
        } catch (s) {
          if (s.code === 'ENOENT') return
          if (s.code === 'ENOTDIR') throw r
          if (
            s.code === 'ENOTEMPTY' ||
            s.code === 'EEXIST' ||
            s.code === 'EPERM'
          )
            rmkidsSync(e, t)
        }
      }
      const rmkidsSync = (e, t) => {
        s(e)
        s(t)
        t.readdirSync(e).forEach((r) => rimrafSync(a.join(e, r), t))
        const r = p ? 100 : 1
        let o = 0
        do {
          let s = true
          try {
            const a = t.rmdirSync(e, t)
            s = false
            return a
          } finally {
            if (++o < r && s) continue
          }
        } while (true)
      }
      e.exports = rimraf
      rimraf.sync = rimrafSync
    },
    5224: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      function _interopDefault(e) {
        return e && typeof e === 'object' && 'default' in e ? e['default'] : e
      }
      var s = r(1017)
      var a = _interopDefault(s)
      var o = r(6064)
      var u = _interopDefault(r(3837))
      const c = function addExtension(e, t = '.js') {
        if (!s.extname(e)) e += t
        return e
      }
      const f = {
        ArrayPattern(e, t) {
          for (const r of t.elements) {
            if (r) f[r.type](e, r)
          }
        },
        AssignmentPattern(e, t) {
          f[t.left.type](e, t.left)
        },
        Identifier(e, t) {
          e.push(t.name)
        },
        MemberExpression() {},
        ObjectPattern(e, t) {
          for (const r of t.properties) {
            if (r.type === 'RestElement') {
              f.RestElement(e, r)
            } else {
              f[r.value.type](e, r.value)
            }
          }
        },
        RestElement(e, t) {
          f[t.argument.type](e, t.argument)
        },
      }
      const p = function extractAssignedNames(e) {
        const t = []
        f[e.type](t, e)
        return t
      }
      const h = { const: true, let: true }
      class Scope {
        constructor(e = {}) {
          this.parent = e.parent
          this.isBlockScope = !!e.block
          this.declarations = Object.create(null)
          if (e.params) {
            e.params.forEach((e) => {
              p(e).forEach((e) => {
                this.declarations[e] = true
              })
            })
          }
        }
        addDeclaration(e, t, r) {
          if (!t && this.isBlockScope) {
            this.parent.addDeclaration(e, t, r)
          } else if (e.id) {
            p(e.id).forEach((e) => {
              this.declarations[e] = true
            })
          }
        }
        contains(e) {
          return (
            this.declarations[e] ||
            (this.parent ? this.parent.contains(e) : false)
          )
        }
      }
      const d = function attachScopes(e, t = 'scope') {
        let r = new Scope()
        o.walk(e, {
          enter(e, s) {
            if (/(Function|Class)Declaration/.test(e.type)) {
              r.addDeclaration(e, false, false)
            }
            if (e.type === 'VariableDeclaration') {
              const t = e.kind
              const s = h[t]
              e.declarations.forEach((e) => {
                r.addDeclaration(e, s, true)
              })
            }
            let a
            if (/Function/.test(e.type)) {
              a = new Scope({ parent: r, block: false, params: e.params })
              if (e.type === 'FunctionExpression' && e.id) {
                a.addDeclaration(e, false, false)
              }
            }
            if (e.type === 'BlockStatement' && !/Function/.test(s.type)) {
              a = new Scope({ parent: r, block: true })
            }
            if (e.type === 'CatchClause') {
              a = new Scope({
                parent: r,
                params: e.param ? [e.param] : [],
                block: true,
              })
            }
            if (a) {
              Object.defineProperty(e, t, { value: a, configurable: true })
              r = a
            }
          },
          leave(e) {
            if (e[t]) r = r.parent
          },
        })
        return r
      }
      function createCommonjsModule(e, t) {
        return (t = { exports: {} }), e(t, t.exports), t.exports
      }
      var g = createCommonjsModule(function (e, t) {
        t.isInteger = (e) => {
          if (typeof e === 'number') {
            return Number.isInteger(e)
          }
          if (typeof e === 'string' && e.trim() !== '') {
            return Number.isInteger(Number(e))
          }
          return false
        }
        t.find = (e, t) => e.nodes.find((e) => e.type === t)
        t.exceedsLimit = (e, r, s = 1, a) => {
          if (a === false) return false
          if (!t.isInteger(e) || !t.isInteger(r)) return false
          return (Number(r) - Number(e)) / Number(s) >= a
        }
        t.escapeNode = (e, t = 0, r) => {
          let s = e.nodes[t]
          if (!s) return
          if ((r && s.type === r) || s.type === 'open' || s.type === 'close') {
            if (s.escaped !== true) {
              s.value = '\\' + s.value
              s.escaped = true
            }
          }
        }
        t.encloseBrace = (e) => {
          if (e.type !== 'brace') return false
          if ((e.commas >> (0 + e.ranges)) >> 0 === 0) {
            e.invalid = true
            return true
          }
          return false
        }
        t.isInvalidBrace = (e) => {
          if (e.type !== 'brace') return false
          if (e.invalid === true || e.dollar) return true
          if ((e.commas >> (0 + e.ranges)) >> 0 === 0) {
            e.invalid = true
            return true
          }
          if (e.open !== true || e.close !== true) {
            e.invalid = true
            return true
          }
          return false
        }
        t.isOpenOrClose = (e) => {
          if (e.type === 'open' || e.type === 'close') {
            return true
          }
          return e.open === true || e.close === true
        }
        t.reduce = (e) =>
          e.reduce((e, t) => {
            if (t.type === 'text') e.push(t.value)
            if (t.type === 'range') t.type = 'text'
            return e
          }, [])
        t.flatten = (...e) => {
          const t = []
          const flat = (e) => {
            for (let r = 0; r < e.length; r++) {
              let s = e[r]
              Array.isArray(s) ? flat(s, t) : s !== void 0 && t.push(s)
            }
            return t
          }
          flat(e)
          return t
        }
      })
      var v = g.isInteger
      var m = g.find
      var y = g.exceedsLimit
      var _ = g.escapeNode
      var D = g.encloseBrace
      var x = g.isInvalidBrace
      var E = g.isOpenOrClose
      var w = g.reduce
      var C = g.flatten
      var stringify = (e, t = {}) => {
        let stringify = (e, r = {}) => {
          let s = t.escapeInvalid && g.isInvalidBrace(r)
          let a = e.invalid === true && t.escapeInvalid === true
          let o = ''
          if (e.value) {
            if ((s || a) && g.isOpenOrClose(e)) {
              return '\\' + e.value
            }
            return e.value
          }
          if (e.value) {
            return e.value
          }
          if (e.nodes) {
            for (let t of e.nodes) {
              o += stringify(t)
            }
          }
          return o
        }
        return stringify(e)
      }
      /*!
       * is-number <https://github.com/jonschlinkert/is-number>
       *
       * Copyright (c) 2014-present, Jon Schlinkert.
       * Released under the MIT License.
       */ var isNumber = function (e) {
        if (typeof e === 'number') {
          return e - e === 0
        }
        if (typeof e === 'string' && e.trim() !== '') {
          return Number.isFinite ? Number.isFinite(+e) : isFinite(+e)
        }
        return false
      }
      const toRegexRange = (e, t, r) => {
        if (isNumber(e) === false) {
          throw new TypeError(
            'toRegexRange: expected the first argument to be a number'
          )
        }
        if (t === void 0 || e === t) {
          return String(e)
        }
        if (isNumber(t) === false) {
          throw new TypeError(
            'toRegexRange: expected the second argument to be a number.'
          )
        }
        let s = Object.assign({ relaxZeros: true }, r)
        if (typeof s.strictZeros === 'boolean') {
          s.relaxZeros = s.strictZeros === false
        }
        let a = String(s.relaxZeros)
        let o = String(s.shorthand)
        let u = String(s.capture)
        let c = String(s.wrap)
        let f = e + ':' + t + '=' + a + o + u + c
        if (toRegexRange.cache.hasOwnProperty(f)) {
          return toRegexRange.cache[f].result
        }
        let p = Math.min(e, t)
        let h = Math.max(e, t)
        if (Math.abs(p - h) === 1) {
          let r = e + '|' + t
          if (s.capture) {
            return `(${r})`
          }
          if (s.wrap === false) {
            return r
          }
          return `(?:${r})`
        }
        let d = hasPadding(e) || hasPadding(t)
        let g = { min: e, max: t, a: p, b: h }
        let v = []
        let m = []
        if (d) {
          g.isPadded = d
          g.maxLen = String(g.max).length
        }
        if (p < 0) {
          let e = h < 0 ? Math.abs(h) : 1
          m = splitToPatterns(e, Math.abs(p), g, s)
          p = g.a = 0
        }
        if (h >= 0) {
          v = splitToPatterns(p, h, g, s)
        }
        g.negatives = m
        g.positives = v
        g.result = collatePatterns(m, v, s)
        if (s.capture === true) {
          g.result = `(${g.result})`
        } else if (s.wrap !== false && v.length + m.length > 1) {
          g.result = `(?:${g.result})`
        }
        toRegexRange.cache[f] = g
        return g.result
      }
      function collatePatterns(e, t, r) {
        let s = filterPatterns(e, t, '-', false, r) || []
        let a = filterPatterns(t, e, '', false, r) || []
        let o = filterPatterns(e, t, '-?', true, r) || []
        let u = s.concat(o).concat(a)
        return u.join('|')
      }
      function splitToRanges(e, t) {
        let r = 1
        let s = 1
        let a = countNines(e, r)
        let o = new Set([t])
        while (e <= a && a <= t) {
          o.add(a)
          r += 1
          a = countNines(e, r)
        }
        a = countZeros(t + 1, s) - 1
        while (e < a && a <= t) {
          o.add(a)
          s += 1
          a = countZeros(t + 1, s) - 1
        }
        o = [...o]
        o.sort(compare)
        return o
      }
      function rangeToPattern(e, t, r) {
        if (e === t) {
          return { pattern: e, count: [], digits: 0 }
        }
        let s = zip(e, t)
        let a = s.length
        let o = ''
        let u = 0
        for (let e = 0; e < a; e++) {
          let [t, a] = s[e]
          if (t === a) {
            o += t
          } else if (t !== '0' || a !== '9') {
            o += toCharacterClass(t, a, r)
          } else {
            u++
          }
        }
        if (u) {
          o += r.shorthand === true ? '\\d' : '[0-9]'
        }
        return { pattern: o, count: [u], digits: a }
      }
      function splitToPatterns(e, t, r, s) {
        let a = splitToRanges(e, t)
        let o = []
        let u = e
        let c
        for (let e = 0; e < a.length; e++) {
          let t = a[e]
          let f = rangeToPattern(String(u), String(t), s)
          let p = ''
          if (!r.isPadded && c && c.pattern === f.pattern) {
            if (c.count.length > 1) {
              c.count.pop()
            }
            c.count.push(f.count[0])
            c.string = c.pattern + toQuantifier(c.count)
            u = t + 1
            continue
          }
          if (r.isPadded) {
            p = padZeros(t, r, s)
          }
          f.string = p + f.pattern + toQuantifier(f.count)
          o.push(f)
          u = t + 1
          c = f
        }
        return o
      }
      function filterPatterns(e, t, r, s, a) {
        let o = []
        for (let a of e) {
          let { string: e } = a
          if (!s && !contains(t, 'string', e)) {
            o.push(r + e)
          }
          if (s && contains(t, 'string', e)) {
            o.push(r + e)
          }
        }
        return o
      }
      function zip(e, t) {
        let r = []
        for (let s = 0; s < e.length; s++) r.push([e[s], t[s]])
        return r
      }
      function compare(e, t) {
        return e > t ? 1 : t > e ? -1 : 0
      }
      function contains(e, t, r) {
        return e.some((e) => e[t] === r)
      }
      function countNines(e, t) {
        return Number(String(e).slice(0, -t) + '9'.repeat(t))
      }
      function countZeros(e, t) {
        return e - (e % Math.pow(10, t))
      }
      function toQuantifier(e) {
        let [t = 0, r = ''] = e
        if (r || t > 1) {
          return `{${t + (r ? ',' + r : '')}}`
        }
        return ''
      }
      function toCharacterClass(e, t, r) {
        return `[${e}${t - e === 1 ? '' : '-'}${t}]`
      }
      function hasPadding(e) {
        return /^-?(0+)\d/.test(e)
      }
      function padZeros(e, t, r) {
        if (!t.isPadded) {
          return e
        }
        let s = Math.abs(t.maxLen - String(e).length)
        let a = r.relaxZeros !== false
        switch (s) {
          case 0:
            return ''
          case 1:
            return a ? '0?' : '0'
          case 2:
            return a ? '0{0,2}' : '00'
          default: {
            return a ? `0{0,${s}}` : `0{${s}}`
          }
        }
      }
      toRegexRange.cache = {}
      toRegexRange.clearCache = () => (toRegexRange.cache = {})
      var S = toRegexRange
      const isObject = (e) =>
        e !== null && typeof e === 'object' && !Array.isArray(e)
      const transform = (e) => (t) => e === true ? Number(t) : String(t)
      const isValidValue = (e) =>
        typeof e === 'number' || (typeof e === 'string' && e !== '')
      const isNumber$1 = (e) => Number.isInteger(+e)
      const zeros = (e) => {
        let t = `${e}`
        let r = -1
        if (t[0] === '-') t = t.slice(1)
        if (t === '0') return false
        while (t[++r] === '0');
        return r > 0
      }
      const stringify$1 = (e, t, r) => {
        if (typeof e === 'string' || typeof t === 'string') {
          return true
        }
        return r.stringify === true
      }
      const pad = (e, t, r) => {
        if (t > 0) {
          let r = e[0] === '-' ? '-' : ''
          if (r) e = e.slice(1)
          e = r + e.padStart(r ? t - 1 : t, '0')
        }
        if (r === false) {
          return String(e)
        }
        return e
      }
      const toMaxLen = (e, t) => {
        let r = e[0] === '-' ? '-' : ''
        if (r) {
          e = e.slice(1)
          t--
        }
        while (e.length < t) e = '0' + e
        return r ? '-' + e : e
      }
      const toSequence = (e, t) => {
        e.negatives.sort((e, t) => (e < t ? -1 : e > t ? 1 : 0))
        e.positives.sort((e, t) => (e < t ? -1 : e > t ? 1 : 0))
        let r = t.capture ? '' : '?:'
        let s = ''
        let a = ''
        let o
        if (e.positives.length) {
          s = e.positives.join('|')
        }
        if (e.negatives.length) {
          a = `-(${r}${e.negatives.join('|')})`
        }
        if (s && a) {
          o = `${s}|${a}`
        } else {
          o = s || a
        }
        if (t.wrap) {
          return `(${r}${o})`
        }
        return o
      }
      const toRange = (e, t, r, s) => {
        if (r) {
          return S(e, t, Object.assign({ wrap: false }, s))
        }
        let a = String.fromCharCode(e)
        if (e === t) return a
        let o = String.fromCharCode(t)
        return `[${a}-${o}]`
      }
      const toRegex = (e, t, r) => {
        if (Array.isArray(e)) {
          let t = r.wrap === true
          let s = r.capture ? '' : '?:'
          return t ? `(${s}${e.join('|')})` : e.join('|')
        }
        return S(e, t, r)
      }
      const rangeError = (...e) =>
        new RangeError('Invalid range arguments: ' + u.inspect(...e))
      const invalidRange = (e, t, r) => {
        if (r.strictRanges === true) throw rangeError([e, t])
        return []
      }
      const invalidStep = (e, t) => {
        if (t.strictRanges === true) {
          throw new TypeError(`Expected step "${e}" to be a number`)
        }
        return []
      }
      const fillNumbers = (e, t, r = 1, s = {}) => {
        let a = Number(e)
        let o = Number(t)
        if (!Number.isInteger(a) || !Number.isInteger(o)) {
          if (s.strictRanges === true) throw rangeError([e, t])
          return []
        }
        if (a === 0) a = 0
        if (o === 0) o = 0
        let u = a > o
        let c = String(e)
        let f = String(t)
        let p = String(r)
        r = Math.max(Math.abs(r), 1)
        let h = zeros(c) || zeros(f) || zeros(p)
        let d = h ? Math.max(c.length, f.length, p.length) : 0
        let g = h === false && stringify$1(e, t, s) === false
        let v = s.transform || transform(g)
        if (s.toRegex && r === 1) {
          return toRange(toMaxLen(e, d), toMaxLen(t, d), true, s)
        }
        let m = { negatives: [], positives: [] }
        let push = (e) => m[e < 0 ? 'negatives' : 'positives'].push(Math.abs(e))
        let y = []
        let _ = 0
        while (u ? a >= o : a <= o) {
          if (s.toRegex === true && r > 1) {
            push(a)
          } else {
            y.push(pad(v(a, _), d, g))
          }
          a = u ? a - r : a + r
          _++
        }
        if (s.toRegex === true) {
          return r > 1
            ? toSequence(m, s)
            : toRegex(y, null, Object.assign({ wrap: false }, s))
        }
        return y
      }
      const fillLetters = (e, t, r = 1, s = {}) => {
        if (
          (!isNumber$1(e) && e.length > 1) ||
          (!isNumber$1(t) && t.length > 1)
        ) {
          return invalidRange(e, t, s)
        }
        let a = s.transform || ((e) => String.fromCharCode(e))
        let o = `${e}`.charCodeAt(0)
        let u = `${t}`.charCodeAt(0)
        let c = o > u
        let f = Math.min(o, u)
        let p = Math.max(o, u)
        if (s.toRegex && r === 1) {
          return toRange(f, p, false, s)
        }
        let h = []
        let d = 0
        while (c ? o >= u : o <= u) {
          h.push(a(o, d))
          o = c ? o - r : o + r
          d++
        }
        if (s.toRegex === true) {
          return toRegex(h, null, { wrap: false, options: s })
        }
        return h
      }
      const fill = (e, t, r, s = {}) => {
        if (t == null && isValidValue(e)) {
          return [e]
        }
        if (!isValidValue(e) || !isValidValue(t)) {
          return invalidRange(e, t, s)
        }
        if (typeof r === 'function') {
          return fill(e, t, 1, { transform: r })
        }
        if (isObject(r)) {
          return fill(e, t, 0, r)
        }
        let a = Object.assign({}, s)
        if (a.capture === true) a.wrap = true
        r = r || a.step || 1
        if (!isNumber$1(r)) {
          if (r != null && !isObject(r)) return invalidStep(r, a)
          return fill(e, t, 1, r)
        }
        if (isNumber$1(e) && isNumber$1(t)) {
          return fillNumbers(e, t, r, a)
        }
        return fillLetters(e, t, Math.max(Math.abs(r), 1), a)
      }
      var A = fill
      const compile = (e, t = {}) => {
        let walk = (e, r = {}) => {
          let s = g.isInvalidBrace(r)
          let a = e.invalid === true && t.escapeInvalid === true
          let o = s === true || a === true
          let u = t.escapeInvalid === true ? '\\' : ''
          let c = ''
          if (e.isOpen === true) {
            return u + e.value
          }
          if (e.isClose === true) {
            return u + e.value
          }
          if (e.type === 'open') {
            return o ? u + e.value : '('
          }
          if (e.type === 'close') {
            return o ? u + e.value : ')'
          }
          if (e.type === 'comma') {
            return e.prev.type === 'comma' ? '' : o ? e.value : '|'
          }
          if (e.value) {
            return e.value
          }
          if (e.nodes && e.ranges > 0) {
            let r = g.reduce(e.nodes)
            let s = A(
              ...r,
              Object.assign({}, t, { wrap: false, toRegex: true })
            )
            if (s.length !== 0) {
              return r.length > 1 && s.length > 1 ? `(${s})` : s
            }
          }
          if (e.nodes) {
            for (let t of e.nodes) {
              c += walk(t, e)
            }
          }
          return c
        }
        return walk(e)
      }
      var R = compile
      const append = (e = '', t = '', r = false) => {
        let s = []
        e = [].concat(e)
        t = [].concat(t)
        if (!t.length) return e
        if (!e.length) {
          return r ? g.flatten(t).map((e) => `{${e}}`) : t
        }
        for (let a of e) {
          if (Array.isArray(a)) {
            for (let e of a) {
              s.push(append(e, t, r))
            }
          } else {
            for (let e of t) {
              if (r === true && typeof e === 'string') e = `{${e}}`
              s.push(Array.isArray(e) ? append(a, e, r) : a + e)
            }
          }
        }
        return g.flatten(s)
      }
      const expand = (e, t = {}) => {
        let r = t.rangeLimit === void 0 ? 1e3 : t.rangeLimit
        let walk = (e, s = {}) => {
          e.queue = []
          let a = s
          let o = s.queue
          while (a.type !== 'brace' && a.type !== 'root' && a.parent) {
            a = a.parent
            o = a.queue
          }
          if (e.invalid || e.dollar) {
            o.push(append(o.pop(), stringify(e, t)))
            return
          }
          if (
            e.type === 'brace' &&
            e.invalid !== true &&
            e.nodes.length === 2
          ) {
            o.push(append(o.pop(), ['{}']))
            return
          }
          if (e.nodes && e.ranges > 0) {
            let s = g.reduce(e.nodes)
            if (g.exceedsLimit(...s, t.step, r)) {
              throw new RangeError(
                'expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.'
              )
            }
            let a = A(...s, t)
            if (a.length === 0) {
              a = stringify(e, t)
            }
            o.push(append(o.pop(), a))
            e.nodes = []
            return
          }
          let u = g.encloseBrace(e)
          let c = e.queue
          let f = e
          while (f.type !== 'brace' && f.type !== 'root' && f.parent) {
            f = f.parent
            c = f.queue
          }
          for (let t = 0; t < e.nodes.length; t++) {
            let r = e.nodes[t]
            if (r.type === 'comma' && e.type === 'brace') {
              if (t === 1) c.push('')
              c.push('')
              continue
            }
            if (r.type === 'close') {
              o.push(append(o.pop(), c, u))
              continue
            }
            if (r.value && r.type !== 'open') {
              c.push(append(c.pop(), r.value))
              continue
            }
            if (r.nodes) {
              walk(r, e)
            }
          }
          return c
        }
        return g.flatten(walk(e))
      }
      var k = expand
      var T = {
        MAX_LENGTH: 1024 * 64,
        CHAR_0: '0',
        CHAR_9: '9',
        CHAR_UPPERCASE_A: 'A',
        CHAR_LOWERCASE_A: 'a',
        CHAR_UPPERCASE_Z: 'Z',
        CHAR_LOWERCASE_Z: 'z',
        CHAR_LEFT_PARENTHESES: '(',
        CHAR_RIGHT_PARENTHESES: ')',
        CHAR_ASTERISK: '*',
        CHAR_AMPERSAND: '&',
        CHAR_AT: '@',
        CHAR_BACKSLASH: '\\',
        CHAR_BACKTICK: '`',
        CHAR_CARRIAGE_RETURN: '\r',
        CHAR_CIRCUMFLEX_ACCENT: '^',
        CHAR_COLON: ':',
        CHAR_COMMA: ',',
        CHAR_DOLLAR: '$',
        CHAR_DOT: '.',
        CHAR_DOUBLE_QUOTE: '"',
        CHAR_EQUAL: '=',
        CHAR_EXCLAMATION_MARK: '!',
        CHAR_FORM_FEED: '\f',
        CHAR_FORWARD_SLASH: '/',
        CHAR_HASH: '#',
        CHAR_HYPHEN_MINUS: '-',
        CHAR_LEFT_ANGLE_BRACKET: '<',
        CHAR_LEFT_CURLY_BRACE: '{',
        CHAR_LEFT_SQUARE_BRACKET: '[',
        CHAR_LINE_FEED: '\n',
        CHAR_NO_BREAK_SPACE: ' ',
        CHAR_PERCENT: '%',
        CHAR_PLUS: '+',
        CHAR_QUESTION_MARK: '?',
        CHAR_RIGHT_ANGLE_BRACKET: '>',
        CHAR_RIGHT_CURLY_BRACE: '}',
        CHAR_RIGHT_SQUARE_BRACKET: ']',
        CHAR_SEMICOLON: ';',
        CHAR_SINGLE_QUOTE: "'",
        CHAR_SPACE: ' ',
        CHAR_TAB: '\t',
        CHAR_UNDERSCORE: '_',
        CHAR_VERTICAL_LINE: '|',
        CHAR_ZERO_WIDTH_NOBREAK_SPACE: '\ufeff',
      }
      const {
        MAX_LENGTH: F,
        CHAR_BACKSLASH: O,
        CHAR_BACKTICK: I,
        CHAR_COMMA: L,
        CHAR_DOT: N,
        CHAR_LEFT_PARENTHESES: P,
        CHAR_RIGHT_PARENTHESES: B,
        CHAR_LEFT_CURLY_BRACE: j,
        CHAR_RIGHT_CURLY_BRACE: M,
        CHAR_LEFT_SQUARE_BRACKET: H,
        CHAR_RIGHT_SQUARE_BRACKET: $,
        CHAR_DOUBLE_QUOTE: U,
        CHAR_SINGLE_QUOTE: W,
        CHAR_NO_BREAK_SPACE: V,
        CHAR_ZERO_WIDTH_NOBREAK_SPACE: q,
      } = T
      const parse = (e, t = {}) => {
        if (typeof e !== 'string') {
          throw new TypeError('Expected a string')
        }
        let r = t || {}
        let s = typeof r.maxLength === 'number' ? Math.min(F, r.maxLength) : F
        if (e.length > s) {
          throw new SyntaxError(
            `Input length (${e.length}), exceeds max characters (${s})`
          )
        }
        let a = { type: 'root', input: e, nodes: [] }
        let o = [a]
        let u = a
        let c = a
        let f = 0
        let p = e.length
        let h = 0
        let d = 0
        let g
        const advance = () => e[h++]
        const push = (e) => {
          if (e.type === 'text' && c.type === 'dot') {
            c.type = 'text'
          }
          if (c && c.type === 'text' && e.type === 'text') {
            c.value += e.value
            return
          }
          u.nodes.push(e)
          e.parent = u
          e.prev = c
          c = e
          return e
        }
        push({ type: 'bos' })
        while (h < p) {
          u = o[o.length - 1]
          g = advance()
          if (g === q || g === V) {
            continue
          }
          if (g === O) {
            push({ type: 'text', value: (t.keepEscaping ? g : '') + advance() })
            continue
          }
          if (g === $) {
            push({ type: 'text', value: '\\' + g })
            continue
          }
          if (g === H) {
            f++
            let e
            while (h < p && (e = advance())) {
              g += e
              if (e === H) {
                f++
                continue
              }
              if (e === O) {
                g += advance()
                continue
              }
              if (e === $) {
                f--
                if (f === 0) {
                  break
                }
              }
            }
            push({ type: 'text', value: g })
            continue
          }
          if (g === P) {
            u = push({ type: 'paren', nodes: [] })
            o.push(u)
            push({ type: 'text', value: g })
            continue
          }
          if (g === B) {
            if (u.type !== 'paren') {
              push({ type: 'text', value: g })
              continue
            }
            u = o.pop()
            push({ type: 'text', value: g })
            u = o[o.length - 1]
            continue
          }
          if (g === U || g === W || g === I) {
            let e = g
            let r
            if (t.keepQuotes !== true) {
              g = ''
            }
            while (h < p && (r = advance())) {
              if (r === O) {
                g += r + advance()
                continue
              }
              if (r === e) {
                if (t.keepQuotes === true) g += r
                break
              }
              g += r
            }
            push({ type: 'text', value: g })
            continue
          }
          if (g === j) {
            d++
            let e = (c.value && c.value.slice(-1) === '$') || u.dollar === true
            let t = {
              type: 'brace',
              open: true,
              close: false,
              dollar: e,
              depth: d,
              commas: 0,
              ranges: 0,
              nodes: [],
            }
            u = push(t)
            o.push(u)
            push({ type: 'open', value: g })
            continue
          }
          if (g === M) {
            if (u.type !== 'brace') {
              push({ type: 'text', value: g })
              continue
            }
            let e = 'close'
            u = o.pop()
            u.close = true
            push({ type: e, value: g })
            d--
            u = o[o.length - 1]
            continue
          }
          if (g === L && d > 0) {
            if (u.ranges > 0) {
              u.ranges = 0
              let e = u.nodes.shift()
              u.nodes = [e, { type: 'text', value: stringify(u) }]
            }
            push({ type: 'comma', value: g })
            u.commas++
            continue
          }
          if (g === N && d > 0 && u.commas === 0) {
            let e = u.nodes
            if (d === 0 || e.length === 0) {
              push({ type: 'text', value: g })
              continue
            }
            if (c.type === 'dot') {
              u.range = []
              c.value += g
              c.type = 'range'
              if (u.nodes.length !== 3 && u.nodes.length !== 5) {
                u.invalid = true
                u.ranges = 0
                c.type = 'text'
                continue
              }
              u.ranges++
              u.args = []
              continue
            }
            if (c.type === 'range') {
              e.pop()
              let t = e[e.length - 1]
              t.value += c.value + g
              c = t
              u.ranges--
              continue
            }
            push({ type: 'dot', value: g })
            continue
          }
          push({ type: 'text', value: g })
        }
        do {
          u = o.pop()
          if (u.type !== 'root') {
            u.nodes.forEach((e) => {
              if (!e.nodes) {
                if (e.type === 'open') e.isOpen = true
                if (e.type === 'close') e.isClose = true
                if (!e.nodes) e.type = 'text'
                e.invalid = true
              }
            })
            let e = o[o.length - 1]
            let t = e.nodes.indexOf(u)
            e.nodes.splice(t, 1, ...u.nodes)
          }
        } while (o.length > 0)
        push({ type: 'eos' })
        return a
      }
      var G = parse
      const braces = (e, t = {}) => {
        let r = []
        if (Array.isArray(e)) {
          for (let s of e) {
            let e = braces.create(s, t)
            if (Array.isArray(e)) {
              r.push(...e)
            } else {
              r.push(e)
            }
          }
        } else {
          r = [].concat(braces.create(e, t))
        }
        if (t && t.expand === true && t.nodupes === true) {
          r = [...new Set(r)]
        }
        return r
      }
      braces.parse = (e, t = {}) => G(e, t)
      braces.stringify = (e, t = {}) => {
        if (typeof e === 'string') {
          return stringify(braces.parse(e, t), t)
        }
        return stringify(e, t)
      }
      braces.compile = (e, t = {}) => {
        if (typeof e === 'string') {
          e = braces.parse(e, t)
        }
        return R(e, t)
      }
      braces.expand = (e, t = {}) => {
        if (typeof e === 'string') {
          e = braces.parse(e, t)
        }
        let r = k(e, t)
        if (t.noempty === true) {
          r = r.filter(Boolean)
        }
        if (t.nodupes === true) {
          r = [...new Set(r)]
        }
        return r
      }
      braces.create = (e, t = {}) => {
        if (e === '' || e.length < 3) {
          return [e]
        }
        return t.expand !== true ? braces.compile(e, t) : braces.expand(e, t)
      }
      var K = braces
      const z = '\\\\/'
      const Q = `[^${z}]`
      const Y = '\\.'
      const X = '\\+'
      const Z = '\\?'
      const J = '\\/'
      const ee = '(?=.)'
      const te = '[^/]'
      const re = `(?:${J}|$)`
      const ie = `(?:^|${J})`
      const ne = `${Y}{1,2}${re}`
      const se = `(?!${Y})`
      const ae = `(?!${ie}${ne})`
      const oe = `(?!${Y}{0,1}${re})`
      const ue = `(?!${ne})`
      const le = `[^.${J}]`
      const ce = `${te}*?`
      const fe = {
        DOT_LITERAL: Y,
        PLUS_LITERAL: X,
        QMARK_LITERAL: Z,
        SLASH_LITERAL: J,
        ONE_CHAR: ee,
        QMARK: te,
        END_ANCHOR: re,
        DOTS_SLASH: ne,
        NO_DOT: se,
        NO_DOTS: ae,
        NO_DOT_SLASH: oe,
        NO_DOTS_SLASH: ue,
        QMARK_NO_DOT: le,
        STAR: ce,
        START_ANCHOR: ie,
      }
      const pe = Object.assign({}, fe, {
        SLASH_LITERAL: `[${z}]`,
        QMARK: Q,
        STAR: `${Q}*?`,
        DOTS_SLASH: `${Y}{1,2}(?:[${z}]|$)`,
        NO_DOT: `(?!${Y})`,
        NO_DOTS: `(?!(?:^|[${z}])${Y}{1,2}(?:[${z}]|$))`,
        NO_DOT_SLASH: `(?!${Y}{0,1}(?:[${z}]|$))`,
        NO_DOTS_SLASH: `(?!${Y}{1,2}(?:[${z}]|$))`,
        QMARK_NO_DOT: `[^.${z}]`,
        START_ANCHOR: `(?:^|[${z}])`,
        END_ANCHOR: `(?:[${z}]|$)`,
      })
      const he = {
        alnum: 'a-zA-Z0-9',
        alpha: 'a-zA-Z',
        ascii: '\\x00-\\x7F',
        blank: ' \\t',
        cntrl: '\\x00-\\x1F\\x7F',
        digit: '0-9',
        graph: '\\x21-\\x7E',
        lower: 'a-z',
        print: '\\x20-\\x7E ',
        punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
        space: ' \\t\\r\\n\\v\\f',
        upper: 'A-Z',
        word: 'A-Za-z0-9_',
        xdigit: 'A-Fa-f0-9',
      }
      var de = {
        MAX_LENGTH: 1024 * 64,
        POSIX_REGEX_SOURCE: he,
        REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
        REGEX_NON_SPECIAL_CHAR: /^[^@![\].,$*+?^{}()|\\/]+/,
        REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
        REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
        REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
        REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
        REPLACEMENTS: { '***': '*', '**/**': '**', '**/**/**': '**' },
        CHAR_0: 48,
        CHAR_9: 57,
        CHAR_UPPERCASE_A: 65,
        CHAR_LOWERCASE_A: 97,
        CHAR_UPPERCASE_Z: 90,
        CHAR_LOWERCASE_Z: 122,
        CHAR_LEFT_PARENTHESES: 40,
        CHAR_RIGHT_PARENTHESES: 41,
        CHAR_ASTERISK: 42,
        CHAR_AMPERSAND: 38,
        CHAR_AT: 64,
        CHAR_BACKWARD_SLASH: 92,
        CHAR_CARRIAGE_RETURN: 13,
        CHAR_CIRCUMFLEX_ACCENT: 94,
        CHAR_COLON: 58,
        CHAR_COMMA: 44,
        CHAR_DOT: 46,
        CHAR_DOUBLE_QUOTE: 34,
        CHAR_EQUAL: 61,
        CHAR_EXCLAMATION_MARK: 33,
        CHAR_FORM_FEED: 12,
        CHAR_FORWARD_SLASH: 47,
        CHAR_GRAVE_ACCENT: 96,
        CHAR_HASH: 35,
        CHAR_HYPHEN_MINUS: 45,
        CHAR_LEFT_ANGLE_BRACKET: 60,
        CHAR_LEFT_CURLY_BRACE: 123,
        CHAR_LEFT_SQUARE_BRACKET: 91,
        CHAR_LINE_FEED: 10,
        CHAR_NO_BREAK_SPACE: 160,
        CHAR_PERCENT: 37,
        CHAR_PLUS: 43,
        CHAR_QUESTION_MARK: 63,
        CHAR_RIGHT_ANGLE_BRACKET: 62,
        CHAR_RIGHT_CURLY_BRACE: 125,
        CHAR_RIGHT_SQUARE_BRACKET: 93,
        CHAR_SEMICOLON: 59,
        CHAR_SINGLE_QUOTE: 39,
        CHAR_SPACE: 32,
        CHAR_TAB: 9,
        CHAR_UNDERSCORE: 95,
        CHAR_VERTICAL_LINE: 124,
        CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
        SEP: a.sep,
        extglobChars(e) {
          return {
            '!': { type: 'negate', open: '(?:(?!(?:', close: `))${e.STAR})` },
            '?': { type: 'qmark', open: '(?:', close: ')?' },
            '+': { type: 'plus', open: '(?:', close: ')+' },
            '*': { type: 'star', open: '(?:', close: ')*' },
            '@': { type: 'at', open: '(?:', close: ')' },
          }
        },
        globChars(e) {
          return e === true ? pe : fe
        },
      }
      var ge = createCommonjsModule(function (e, t) {
        const r = process.platform === 'win32'
        const {
          REGEX_SPECIAL_CHARS: s,
          REGEX_SPECIAL_CHARS_GLOBAL: o,
          REGEX_REMOVE_BACKSLASH: u,
        } = de
        t.isObject = (e) =>
          e !== null && typeof e === 'object' && !Array.isArray(e)
        t.hasRegexChars = (e) => s.test(e)
        t.isRegexChar = (e) => e.length === 1 && t.hasRegexChars(e)
        t.escapeRegex = (e) => e.replace(o, '\\$1')
        t.toPosixSlashes = (e) => e.replace(/\\/g, '/')
        t.removeBackslashes = (e) => e.replace(u, (e) => (e === '\\' ? '' : e))
        t.supportsLookbehinds = () => {
          let e = process.version.slice(1).split('.')
          if ((e.length === 3 && +e[0] >= 9) || (+e[0] === 8 && +e[1] >= 10)) {
            return true
          }
          return false
        }
        t.isWindows = (e) => {
          if (e && typeof e.windows === 'boolean') {
            return e.windows
          }
          return r === true || a.sep === '\\'
        }
        t.escapeLast = (e, r, s) => {
          let a = e.lastIndexOf(r, s)
          if (a === -1) return e
          if (e[a - 1] === '\\') return t.escapeLast(e, r, a - 1)
          return e.slice(0, a) + '\\' + e.slice(a)
        }
      })
      var ve = ge.isObject
      var be = ge.hasRegexChars
      var me = ge.isRegexChar
      var ye = ge.escapeRegex
      var _e = ge.toPosixSlashes
      var De = ge.removeBackslashes
      var xe = ge.supportsLookbehinds
      var Ee = ge.isWindows
      var we = ge.escapeLast
      const {
        CHAR_ASTERISK: Ce,
        CHAR_AT: Se,
        CHAR_BACKWARD_SLASH: Ae,
        CHAR_COMMA: Re,
        CHAR_DOT: ke,
        CHAR_EXCLAMATION_MARK: Te,
        CHAR_FORWARD_SLASH: Fe,
        CHAR_LEFT_CURLY_BRACE: Oe,
        CHAR_LEFT_PARENTHESES: Ie,
        CHAR_LEFT_SQUARE_BRACKET: Le,
        CHAR_PLUS: Ne,
        CHAR_QUESTION_MARK: Pe,
        CHAR_RIGHT_CURLY_BRACE: Be,
        CHAR_RIGHT_PARENTHESES: je,
        CHAR_RIGHT_SQUARE_BRACKET: Me,
      } = de
      const isPathSeparator = (e) => e === Fe || e === Ae
      var scan = (e, t) => {
        let r = t || {}
        let s = e.length - 1
        let a = -1
        let o = 0
        let u = 0
        let c = false
        let f = false
        let p = false
        let h = 0
        let d
        let g
        let v = false
        let eos = () => a >= s
        let advance = () => {
          d = g
          return e.charCodeAt(++a)
        }
        while (a < s) {
          g = advance()
          let t
          if (g === Ae) {
            f = true
            t = advance()
            if (t === Oe) {
              v = true
            }
            continue
          }
          if (v === true || g === Oe) {
            h++
            while (!eos() && (t = advance())) {
              if (t === Ae) {
                f = true
                t = advance()
                continue
              }
              if (t === Oe) {
                h++
                continue
              }
              if (!v && t === ke && (t = advance()) === ke) {
                c = true
                break
              }
              if (!v && t === Re) {
                c = true
                break
              }
              if (t === Be) {
                h--
                if (h === 0) {
                  v = false
                  break
                }
              }
            }
          }
          if (g === Fe) {
            if (d === ke && a === o + 1) {
              o += 2
              continue
            }
            u = a + 1
            continue
          }
          if (g === Ce) {
            c = true
            break
          }
          if (g === Ce || g === Pe) {
            c = true
            break
          }
          if (g === Le) {
            while (!eos() && (t = advance())) {
              if (t === Ae) {
                f = true
                t = advance()
                continue
              }
              if (t === Me) {
                c = true
                break
              }
            }
          }
          let r = g === Ne || g === Se || g === Te
          if (r && e.charCodeAt(a + 1) === Ie) {
            c = true
            break
          }
          if (g === Te && a === o) {
            p = true
            o++
            continue
          }
          if (g === Ie) {
            while (!eos() && (t = advance())) {
              if (t === Ae) {
                f = true
                t = advance()
                continue
              }
              if (t === je) {
                c = true
                break
              }
            }
          }
          if (c) {
            break
          }
        }
        let m = ''
        let y = e
        let _ = e
        let D = ''
        if (o > 0) {
          m = e.slice(0, o)
          e = e.slice(o)
          u -= o
        }
        if (_ && c === true && u > 0) {
          _ = e.slice(0, u)
          D = e.slice(u)
        } else if (c === true) {
          _ = ''
          D = e
        } else {
          _ = e
        }
        if (_ && _ !== '' && _ !== '/' && _ !== e) {
          if (isPathSeparator(_.charCodeAt(_.length - 1))) {
            _ = _.slice(0, -1)
          }
        }
        if (r.unescape === true) {
          if (D) D = ge.removeBackslashes(D)
          if (_ && f === true) {
            _ = ge.removeBackslashes(_)
          }
        }
        return { prefix: m, input: y, base: _, glob: D, negated: p, isGlob: c }
      }
      const {
        MAX_LENGTH: He,
        POSIX_REGEX_SOURCE: $e,
        REGEX_NON_SPECIAL_CHAR: Ue,
        REGEX_SPECIAL_CHARS_BACKREF: We,
        REPLACEMENTS: Ve,
      } = de
      const expandRange = (e, t) => {
        if (typeof t.expandRange === 'function') {
          return t.expandRange(...e, t)
        }
        e.sort()
        let r = `[${e.join('-')}]`
        try {
        } catch (t) {
          return e.map((e) => ge.escapeRegex(e)).join('..')
        }
        return r
      }
      const negate = (e) => {
        let t = 1
        while (e.peek() === '!' && (e.peek(2) !== '(' || e.peek(3) === '?')) {
          e.advance()
          e.start++
          t++
        }
        if (t % 2 === 0) {
          return false
        }
        e.negated = true
        e.start++
        return true
      }
      const syntaxError = (e, t) =>
        `Missing ${e}: "${t}" - use "\\\\${t}" to match literal characters`
      const parse$1 = (e, t) => {
        if (typeof e !== 'string') {
          throw new TypeError('Expected a string')
        }
        e = Ve[e] || e
        let r = Object.assign({}, t)
        let s = typeof r.maxLength === 'number' ? Math.min(He, r.maxLength) : He
        let a = e.length
        if (a > s) {
          throw new SyntaxError(
            `Input length: ${a}, exceeds maximum allowed length: ${s}`
          )
        }
        let o = { type: 'bos', value: '', output: r.prepend || '' }
        let u = [o]
        let c = r.capture ? '' : '?:'
        let f = ge.isWindows(t)
        const p = de.globChars(f)
        const h = de.extglobChars(p)
        const {
          DOT_LITERAL: d,
          PLUS_LITERAL: g,
          SLASH_LITERAL: v,
          ONE_CHAR: m,
          DOTS_SLASH: y,
          NO_DOT: _,
          NO_DOT_SLASH: D,
          NO_DOTS_SLASH: x,
          QMARK: E,
          QMARK_NO_DOT: w,
          STAR: C,
          START_ANCHOR: S,
        } = p
        const globstar = (e) => `(${c}(?:(?!${S}${e.dot ? y : d}).)*?)`
        let A = r.dot ? '' : _
        let R = r.bash === true ? globstar(r) : C
        let k = r.dot ? E : w
        if (r.capture) {
          R = `(${R})`
        }
        if (typeof r.noext === 'boolean') {
          r.noextglob = r.noext
        }
        let T = {
          index: -1,
          start: 0,
          consumed: '',
          output: '',
          backtrack: false,
          brackets: 0,
          braces: 0,
          parens: 0,
          quotes: 0,
          tokens: u,
        }
        let F = []
        let O = []
        let I = o
        let L
        const eos = () => T.index === a - 1
        const N = (T.peek = (t = 1) => e[T.index + t])
        const P = (T.advance = () => e[++T.index])
        const append = (e) => {
          T.output += e.output != null ? e.output : e.value
          T.consumed += e.value || ''
        }
        const increment = (e) => {
          T[e]++
          O.push(e)
        }
        const decrement = (e) => {
          T[e]--
          O.pop()
        }
        const push = (e) => {
          if (I.type === 'globstar') {
            let t = T.braces > 0 && (e.type === 'comma' || e.type === 'brace')
            let r = F.length && (e.type === 'pipe' || e.type === 'paren')
            if (e.type !== 'slash' && e.type !== 'paren' && !t && !r) {
              T.output = T.output.slice(0, -I.output.length)
              I.type = 'star'
              I.value = '*'
              I.output = R
              T.output += I.output
            }
          }
          if (F.length && e.type !== 'paren' && !h[e.value]) {
            F[F.length - 1].inner += e.value
          }
          if (e.value || e.output) append(e)
          if (I && I.type === 'text' && e.type === 'text') {
            I.value += e.value
            return
          }
          e.prev = I
          u.push(e)
          I = e
        }
        const extglobOpen = (e, t) => {
          let s = Object.assign({}, h[t], { conditions: 1, inner: '' })
          s.prev = I
          s.parens = T.parens
          s.output = T.output
          let a = (r.capture ? '(' : '') + s.open
          push({ type: e, value: t, output: T.output ? '' : m })
          push({ type: 'paren', extglob: true, value: P(), output: a })
          increment('parens')
          F.push(s)
        }
        const extglobClose = (t) => {
          let s = t.close + (r.capture ? ')' : '')
          if (t.type === 'negate') {
            let a = R
            if (t.inner && t.inner.length > 1 && t.inner.includes('/')) {
              a = globstar(r)
            }
            if (a !== R || eos() || /^\)+$/.test(e.slice(T.index + 1))) {
              s = t.close = ')$))' + a
            }
            if (t.prev.type === 'bos' && eos()) {
              T.negatedExtglob = true
            }
          }
          push({ type: 'paren', extglob: true, value: L, output: s })
          decrement('parens')
        }
        if (r.fastpaths !== false && !/(^[*!]|[/{[()\]}"])/.test(e)) {
          let t = false
          let s = e.replace(We, (e, r, s, a, o, u) => {
            if (a === '\\') {
              t = true
              return e
            }
            if (a === '?') {
              if (r) {
                return r + a + (o ? E.repeat(o.length) : '')
              }
              if (u === 0) {
                return k + (o ? E.repeat(o.length) : '')
              }
              return E.repeat(s.length)
            }
            if (a === '.') {
              return d.repeat(s.length)
            }
            if (a === '*') {
              if (r) {
                return r + a + (o ? R : '')
              }
              return R
            }
            return r ? e : '\\' + e
          })
          if (t === true) {
            if (r.unescape === true) {
              s = s.replace(/\\/g, '')
            } else {
              s = s.replace(/\\+/g, (e) =>
                e.length % 2 === 0 ? '\\\\' : e ? '\\' : ''
              )
            }
          }
          T.output = s
          return T
        }
        while (!eos()) {
          L = P()
          if (L === '\0') {
            continue
          }
          if (L === '\\') {
            let t = N()
            if (t === '/' && r.bash !== true) {
              continue
            }
            if (t === '.' || t === ';') {
              continue
            }
            if (!t) {
              L += '\\'
              push({ type: 'text', value: L })
              continue
            }
            let s = /^\\+/.exec(e.slice(T.index + 1))
            let a = 0
            if (s && s[0].length > 2) {
              a = s[0].length
              T.index += a
              if (a % 2 !== 0) {
                L += '\\'
              }
            }
            if (r.unescape === true) {
              L = P() || ''
            } else {
              L += P() || ''
            }
            if (T.brackets === 0) {
              push({ type: 'text', value: L })
              continue
            }
          }
          if (
            T.brackets > 0 &&
            (L !== ']' || I.value === '[' || I.value === '[^')
          ) {
            if (r.posix !== false && L === ':') {
              let e = I.value.slice(1)
              if (e.includes('[')) {
                I.posix = true
                if (e.includes(':')) {
                  let e = I.value.lastIndexOf('[')
                  let t = I.value.slice(0, e)
                  let r = I.value.slice(e + 2)
                  let s = $e[r]
                  if (s) {
                    I.value = t + s
                    T.backtrack = true
                    P()
                    if (!o.output && u.indexOf(I) === 1) {
                      o.output = m
                    }
                    continue
                  }
                }
              }
            }
            if ((L === '[' && N() !== ':') || (L === '-' && N() === ']')) {
              L = '\\' + L
            }
            if (L === ']' && (I.value === '[' || I.value === '[^')) {
              L = '\\' + L
            }
            if (r.posix === true && L === '!' && I.value === '[') {
              L = '^'
            }
            I.value += L
            append({ value: L })
            continue
          }
          if (T.quotes === 1 && L !== '"') {
            L = ge.escapeRegex(L)
            I.value += L
            append({ value: L })
            continue
          }
          if (L === '"') {
            T.quotes = T.quotes === 1 ? 0 : 1
            if (r.keepQuotes === true) {
              push({ type: 'text', value: L })
            }
            continue
          }
          if (L === '(') {
            push({ type: 'paren', value: L })
            increment('parens')
            continue
          }
          if (L === ')') {
            if (T.parens === 0 && r.strictBrackets === true) {
              throw new SyntaxError(syntaxError('opening', '('))
            }
            let e = F[F.length - 1]
            if (e && T.parens === e.parens + 1) {
              extglobClose(F.pop())
              continue
            }
            push({ type: 'paren', value: L, output: T.parens ? ')' : '\\)' })
            decrement('parens')
            continue
          }
          if (L === '[') {
            if (r.nobracket === true || !e.slice(T.index + 1).includes(']')) {
              if (r.nobracket !== true && r.strictBrackets === true) {
                throw new SyntaxError(syntaxError('closing', ']'))
              }
              L = '\\' + L
            } else {
              increment('brackets')
            }
            push({ type: 'bracket', value: L })
            continue
          }
          if (L === ']') {
            if (
              r.nobracket === true ||
              (I && I.type === 'bracket' && I.value.length === 1)
            ) {
              push({ type: 'text', value: L, output: '\\' + L })
              continue
            }
            if (T.brackets === 0) {
              if (r.strictBrackets === true) {
                throw new SyntaxError(syntaxError('opening', '['))
              }
              push({ type: 'text', value: L, output: '\\' + L })
              continue
            }
            decrement('brackets')
            let e = I.value.slice(1)
            if (I.posix !== true && e[0] === '^' && !e.includes('/')) {
              L = '/' + L
            }
            I.value += L
            append({ value: L })
            if (r.literalBrackets === false || ge.hasRegexChars(e)) {
              continue
            }
            let t = ge.escapeRegex(I.value)
            T.output = T.output.slice(0, -I.value.length)
            if (r.literalBrackets === true) {
              T.output += t
              I.value = t
              continue
            }
            I.value = `(${c}${t}|${I.value})`
            T.output += I.value
            continue
          }
          if (L === '{' && r.nobrace !== true) {
            push({ type: 'brace', value: L, output: '(' })
            increment('braces')
            continue
          }
          if (L === '}') {
            if (r.nobrace === true || T.braces === 0) {
              push({ type: 'text', value: L, output: '\\' + L })
              continue
            }
            let e = ')'
            if (T.dots === true) {
              let t = u.slice()
              let s = []
              for (let e = t.length - 1; e >= 0; e--) {
                u.pop()
                if (t[e].type === 'brace') {
                  break
                }
                if (t[e].type !== 'dots') {
                  s.unshift(t[e].value)
                }
              }
              e = expandRange(s, r)
              T.backtrack = true
            }
            push({ type: 'brace', value: L, output: e })
            decrement('braces')
            continue
          }
          if (L === '|') {
            if (F.length > 0) {
              F[F.length - 1].conditions++
            }
            push({ type: 'text', value: L })
            continue
          }
          if (L === ',') {
            let e = L
            if (T.braces > 0 && O[O.length - 1] === 'braces') {
              e = '|'
            }
            push({ type: 'comma', value: L, output: e })
            continue
          }
          if (L === '/') {
            if (I.type === 'dot' && T.index === 1) {
              T.start = T.index + 1
              T.consumed = ''
              T.output = ''
              u.pop()
              I = o
              continue
            }
            push({ type: 'slash', value: L, output: v })
            continue
          }
          if (L === '.') {
            if (T.braces > 0 && I.type === 'dot') {
              if (I.value === '.') I.output = d
              I.type = 'dots'
              I.output += L
              I.value += L
              T.dots = true
              continue
            }
            push({ type: 'dot', value: L, output: d })
            continue
          }
          if (L === '?') {
            if (I && I.type === 'paren') {
              let e = N()
              let t = L
              if (e === '<' && !ge.supportsLookbehinds()) {
                throw new Error(
                  'Node.js v10 or higher is required for regex lookbehinds'
                )
              }
              if (
                (I.value === '(' && !/[!=<:]/.test(e)) ||
                (e === '<' && !/[!=]/.test(N(2)))
              ) {
                t = '\\' + L
              }
              push({ type: 'text', value: L, output: t })
              continue
            }
            if (r.noextglob !== true && N() === '(' && N(2) !== '?') {
              extglobOpen('qmark', L)
              continue
            }
            if (r.dot !== true && (I.type === 'slash' || I.type === 'bos')) {
              push({ type: 'qmark', value: L, output: w })
              continue
            }
            push({ type: 'qmark', value: L, output: E })
            continue
          }
          if (L === '!') {
            if (r.noextglob !== true && N() === '(') {
              if (N(2) !== '?' || !/[!=<:]/.test(N(3))) {
                extglobOpen('negate', L)
                continue
              }
            }
            if (r.nonegate !== true && T.index === 0) {
              negate(T)
              continue
            }
          }
          if (L === '+') {
            if (r.noextglob !== true && N() === '(' && N(2) !== '?') {
              extglobOpen('plus', L)
              continue
            }
            if (
              I &&
              (I.type === 'bracket' || I.type === 'paren' || I.type === 'brace')
            ) {
              let e = I.extglob === true ? '\\' + L : L
              push({ type: 'plus', value: L, output: e })
              continue
            }
            if (T.parens > 0 && r.regex !== false) {
              push({ type: 'plus', value: L })
              continue
            }
            push({ type: 'plus', value: g })
            continue
          }
          if (L === '@') {
            if (r.noextglob !== true && N() === '(' && N(2) !== '?') {
              push({ type: 'at', value: L, output: '' })
              continue
            }
            push({ type: 'text', value: L })
            continue
          }
          if (L !== '*') {
            if (L === '$' || L === '^') {
              L = '\\' + L
            }
            let t = Ue.exec(e.slice(T.index + 1))
            if (t) {
              L += t[0]
              T.index += t[0].length
            }
            push({ type: 'text', value: L })
            continue
          }
          if (I && (I.type === 'globstar' || I.star === true)) {
            I.type = 'star'
            I.star = true
            I.value += L
            I.output = R
            T.backtrack = true
            T.consumed += L
            continue
          }
          if (r.noextglob !== true && N() === '(' && N(2) !== '?') {
            extglobOpen('star', L)
            continue
          }
          if (I.type === 'star') {
            if (r.noglobstar === true) {
              T.consumed += L
              continue
            }
            let t = I.prev
            let s = t.prev
            let a = t.type === 'slash' || t.type === 'bos'
            let o = s && (s.type === 'star' || s.type === 'globstar')
            if (r.bash === true && (!a || (!eos() && N() !== '/'))) {
              push({ type: 'star', value: L, output: '' })
              continue
            }
            let u = T.braces > 0 && (t.type === 'comma' || t.type === 'brace')
            let c = F.length && (t.type === 'pipe' || t.type === 'paren')
            if (!a && t.type !== 'paren' && !u && !c) {
              push({ type: 'star', value: L, output: '' })
              continue
            }
            while (e.slice(T.index + 1, T.index + 4) === '/**') {
              let t = e[T.index + 4]
              if (t && t !== '/') {
                break
              }
              T.consumed += '/**'
              T.index += 3
            }
            if (t.type === 'bos' && eos()) {
              I.type = 'globstar'
              I.value += L
              I.output = globstar(r)
              T.output = I.output
              T.consumed += L
              continue
            }
            if (t.type === 'slash' && t.prev.type !== 'bos' && !o && eos()) {
              T.output = T.output.slice(0, -(t.output + I.output).length)
              t.output = '(?:' + t.output
              I.type = 'globstar'
              I.output = globstar(r) + '|$)'
              I.value += L
              T.output += t.output + I.output
              T.consumed += L
              continue
            }
            let f = N()
            if (t.type === 'slash' && t.prev.type !== 'bos' && f === '/') {
              let e = N(2) !== void 0 ? '|$' : ''
              T.output = T.output.slice(0, -(t.output + I.output).length)
              t.output = '(?:' + t.output
              I.type = 'globstar'
              I.output = `${globstar(r)}${v}|${v}${e})`
              I.value += L
              T.output += t.output + I.output
              T.consumed += L + P()
              push({ type: 'slash', value: L, output: '' })
              continue
            }
            if (t.type === 'bos' && f === '/') {
              I.type = 'globstar'
              I.value += L
              I.output = `(?:^|${v}|${globstar(r)}${v})`
              T.output = I.output
              T.consumed += L + P()
              push({ type: 'slash', value: L, output: '' })
              continue
            }
            T.output = T.output.slice(0, -I.output.length)
            I.type = 'globstar'
            I.output = globstar(r)
            I.value += L
            T.output += I.output
            T.consumed += L
            continue
          }
          let t = { type: 'star', value: L, output: R }
          if (r.bash === true) {
            t.output = '.*?'
            if (I.type === 'bos' || I.type === 'slash') {
              t.output = A + t.output
            }
            push(t)
            continue
          }
          if (
            I &&
            (I.type === 'bracket' || I.type === 'paren') &&
            r.regex === true
          ) {
            t.output = L
            push(t)
            continue
          }
          if (T.index === T.start || I.type === 'slash' || I.type === 'dot') {
            if (I.type === 'dot') {
              T.output += D
              I.output += D
            } else if (r.dot === true) {
              T.output += x
              I.output += x
            } else {
              T.output += A
              I.output += A
            }
            if (N() !== '*') {
              T.output += m
              I.output += m
            }
          }
          push(t)
        }
        while (T.brackets > 0) {
          if (r.strictBrackets === true)
            throw new SyntaxError(syntaxError('closing', ']'))
          T.output = ge.escapeLast(T.output, '[')
          decrement('brackets')
        }
        while (T.parens > 0) {
          if (r.strictBrackets === true)
            throw new SyntaxError(syntaxError('closing', ')'))
          T.output = ge.escapeLast(T.output, '(')
          decrement('parens')
        }
        while (T.braces > 0) {
          if (r.strictBrackets === true)
            throw new SyntaxError(syntaxError('closing', '}'))
          T.output = ge.escapeLast(T.output, '{')
          decrement('braces')
        }
        if (
          r.strictSlashes !== true &&
          (I.type === 'star' || I.type === 'bracket')
        ) {
          push({ type: 'maybe_slash', value: '', output: `${v}?` })
        }
        if (T.backtrack === true) {
          T.output = ''
          for (let e of T.tokens) {
            T.output += e.output != null ? e.output : e.value
            if (e.suffix) {
              T.output += e.suffix
            }
          }
        }
        return T
      }
      parse$1.fastpaths = (e, t) => {
        let r = Object.assign({}, t)
        let s = typeof r.maxLength === 'number' ? Math.min(He, r.maxLength) : He
        let a = e.length
        if (a > s) {
          throw new SyntaxError(
            `Input length: ${a}, exceeds maximum allowed length: ${s}`
          )
        }
        e = Ve[e] || e
        let o = ge.isWindows(t)
        const {
          DOT_LITERAL: u,
          SLASH_LITERAL: c,
          ONE_CHAR: f,
          DOTS_SLASH: p,
          NO_DOT: h,
          NO_DOTS: d,
          NO_DOTS_SLASH: g,
          STAR: v,
          START_ANCHOR: m,
        } = de.globChars(o)
        let y = r.capture ? '' : '?:'
        let _ = r.bash === true ? '.*?' : v
        let D = r.dot ? d : h
        let x = r.dot ? g : h
        if (r.capture) {
          _ = `(${_})`
        }
        const globstar = (e) => `(${y}(?:(?!${m}${e.dot ? p : u}).)*?)`
        const create = (e) => {
          switch (e) {
            case '*':
              return `${D}${f}${_}`
            case '.*':
              return `${u}${f}${_}`
            case '*.*':
              return `${D}${_}${u}${f}${_}`
            case '*/*':
              return `${D}${_}${c}${f}${x}${_}`
            case '**':
              return D + globstar(r)
            case '**/*':
              return `(?:${D}${globstar(r)}${c})?${x}${f}${_}`
            case '**/*.*':
              return `(?:${D}${globstar(r)}${c})?${x}${_}${u}${f}${_}`
            case '**/.*':
              return `(?:${D}${globstar(r)}${c})?${u}${f}${_}`
            default: {
              let r = /^(.*?)\.(\w+)$/.exec(e)
              if (!r) return
              let s = create(r[1], t)
              if (!s) return
              return s + u + r[2]
            }
          }
        }
        let E = create(e)
        if (E && r.strictSlashes !== true) {
          E += `${c}?`
        }
        return E
      }
      var qe = parse$1
      const picomatch = (e, t, r = false) => {
        if (Array.isArray(e)) {
          let s = e.map((e) => picomatch(e, t, r))
          return (e) => {
            for (let t of s) {
              let r = t(e)
              if (r) return r
            }
            return false
          }
        }
        if (typeof e !== 'string' || e === '') {
          throw new TypeError('Expected pattern to be a non-empty string')
        }
        let s = t || {}
        let a = ge.isWindows(t)
        let o = picomatch.makeRe(e, t, false, true)
        let u = o.state
        delete o.state
        let isIgnored = () => false
        if (s.ignore) {
          let e = Object.assign({}, t, {
            ignore: null,
            onMatch: null,
            onResult: null,
          })
          isIgnored = picomatch(s.ignore, e, r)
        }
        const matcher = (r, c = false) => {
          let {
            isMatch: f,
            match: p,
            output: h,
          } = picomatch.test(r, o, t, { glob: e, posix: a })
          let d = {
            glob: e,
            state: u,
            regex: o,
            posix: a,
            input: r,
            output: h,
            match: p,
            isMatch: f,
          }
          if (typeof s.onResult === 'function') {
            s.onResult(d)
          }
          if (f === false) {
            d.isMatch = false
            return c ? d : false
          }
          if (isIgnored(r)) {
            if (typeof s.onIgnore === 'function') {
              s.onIgnore(d)
            }
            d.isMatch = false
            return c ? d : false
          }
          if (typeof s.onMatch === 'function') {
            s.onMatch(d)
          }
          return c ? d : true
        }
        if (r) {
          matcher.state = u
        }
        return matcher
      }
      picomatch.test = (e, t, r, { glob: s, posix: a } = {}) => {
        if (typeof e !== 'string') {
          throw new TypeError('Expected input to be a string')
        }
        if (e === '') {
          return { isMatch: false, output: '' }
        }
        let o = r || {}
        let u = o.format || (a ? ge.toPosixSlashes : null)
        let c = e === s
        let f = c && u ? u(e) : e
        if (c === false) {
          f = u ? u(e) : e
          c = f === s
        }
        if (c === false || o.capture === true) {
          if (o.matchBase === true || o.basename === true) {
            c = picomatch.matchBase(e, t, r, a)
          } else {
            c = t.exec(f)
          }
        }
        return { isMatch: !!c, match: c, output: f }
      }
      picomatch.matchBase = (e, t, r, s = ge.isWindows(r)) => {
        let o = t instanceof RegExp ? t : picomatch.makeRe(t, r)
        return o.test(a.basename(e))
      }
      picomatch.isMatch = (e, t, r) => picomatch(t, r)(e)
      picomatch.parse = (e, t) => qe(e, t)
      picomatch.scan = (e, t) => scan(e, t)
      picomatch.makeRe = (e, t, r = false, s = false) => {
        if (!e || typeof e !== 'string') {
          throw new TypeError('Expected a non-empty string')
        }
        let a = t || {}
        let o = a.contains ? '' : '^'
        let u = a.contains ? '' : '$'
        let c = { negated: false, fastpaths: true }
        let f = ''
        let p
        if (e.startsWith('./')) {
          e = e.slice(2)
          f = c.prefix = './'
        }
        if (a.fastpaths !== false && (e[0] === '.' || e[0] === '*')) {
          p = qe.fastpaths(e, t)
        }
        if (p === void 0) {
          c = picomatch.parse(e, t)
          c.prefix = f + (c.prefix || '')
          p = c.output
        }
        if (r === true) {
          return p
        }
        let h = `${o}(?:${p})${u}`
        if (c && c.negated === true) {
          h = `^(?!${h}).*$`
        }
        let d = picomatch.toRegex(h, t)
        if (s === true) {
          d.state = c
        }
        return d
      }
      picomatch.toRegex = (e, t) => {
        try {
          let r = t || {}
          return new RegExp(e, r.flags || (r.nocase ? 'i' : ''))
        } catch (e) {
          if (t && t.debug === true) throw e
          return /$^/
        }
      }
      picomatch.constants = de
      var Ge = picomatch
      var Ke = Ge
      const isEmptyString = (e) =>
        typeof e === 'string' && (e === '' || e === './')
      const micromatch = (e, t, r) => {
        t = [].concat(t)
        e = [].concat(e)
        let s = new Set()
        let a = new Set()
        let o = new Set()
        let u = 0
        let onResult = (e) => {
          o.add(e.output)
          if (r && r.onResult) {
            r.onResult(e)
          }
        }
        for (let o = 0; o < t.length; o++) {
          let c = Ke(
            String(t[o]),
            Object.assign({}, r, { onResult: onResult }),
            true
          )
          let f = c.state.negated || c.state.negatedExtglob
          if (f) u++
          for (let t of e) {
            let e = c(t, true)
            let r = f ? !e.isMatch : e.isMatch
            if (!r) continue
            if (f) {
              s.add(e.output)
            } else {
              s.delete(e.output)
              a.add(e.output)
            }
          }
        }
        let c = u === t.length ? [...o] : [...a]
        let f = c.filter((e) => !s.has(e))
        if (r && f.length === 0) {
          if (r.failglob === true) {
            throw new Error(`No matches found for "${t.join(', ')}"`)
          }
          if (r.nonull === true || r.nullglob === true) {
            return r.unescape ? t.map((e) => e.replace(/\\/g, '')) : t
          }
        }
        return f
      }
      micromatch.match = micromatch
      micromatch.matcher = (e, t) => Ke(e, t)
      micromatch.isMatch = (e, t, r) => Ke(t, r)(e)
      micromatch.any = micromatch.isMatch
      micromatch.not = (e, t, r = {}) => {
        t = [].concat(t).map(String)
        let s = new Set()
        let a = []
        let onResult = (e) => {
          if (r.onResult) r.onResult(e)
          a.push(e.output)
        }
        let o = micromatch(e, t, Object.assign({}, r, { onResult: onResult }))
        for (let e of a) {
          if (!o.includes(e)) {
            s.add(e)
          }
        }
        return [...s]
      }
      micromatch.contains = (e, t, r) => {
        if (typeof e !== 'string') {
          throw new TypeError(`Expected a string: "${u.inspect(e)}"`)
        }
        if (Array.isArray(t)) {
          return t.some((t) => micromatch.contains(e, t, r))
        }
        if (typeof t === 'string') {
          if (isEmptyString(e) || isEmptyString(t)) {
            return false
          }
          if (e.includes(t) || (e.startsWith('./') && e.slice(2).includes(t))) {
            return true
          }
        }
        return micromatch.isMatch(
          e,
          t,
          Object.assign({}, r, { contains: true })
        )
      }
      micromatch.matchKeys = (e, t, r) => {
        if (!ge.isObject(e)) {
          throw new TypeError('Expected the first argument to be an object')
        }
        let s = micromatch(Object.keys(e), t, r)
        let a = {}
        for (let t of s) a[t] = e[t]
        return a
      }
      micromatch.some = (e, t, r) => {
        let s = [].concat(e)
        for (let e of [].concat(t)) {
          let t = Ke(String(e), r)
          if (s.some((e) => t(e))) {
            return true
          }
        }
        return false
      }
      micromatch.every = (e, t, r) => {
        let s = [].concat(e)
        for (let e of [].concat(t)) {
          let t = Ke(String(e), r)
          if (!s.every((e) => t(e))) {
            return false
          }
        }
        return true
      }
      micromatch.all = (e, t, r) => {
        if (typeof e !== 'string') {
          throw new TypeError(`Expected a string: "${u.inspect(e)}"`)
        }
        return [].concat(t).every((t) => Ke(t, r)(e))
      }
      micromatch.capture = (e, t, r) => {
        let s = ge.isWindows(r)
        let a = Ke.makeRe(String(e), Object.assign({}, r, { capture: true }))
        let o = a.exec(s ? ge.toPosixSlashes(t) : t)
        if (o) {
          return o.slice(1).map((e) => (e === void 0 ? '' : e))
        }
      }
      micromatch.makeRe = (...e) => Ke.makeRe(...e)
      micromatch.scan = (...e) => Ke.scan(...e)
      micromatch.parse = (e, t) => {
        let r = []
        for (let s of [].concat(e || [])) {
          for (let e of K(String(s), t)) {
            r.push(Ke.parse(e, t))
          }
        }
        return r
      }
      micromatch.braces = (e, t) => {
        if (typeof e !== 'string') throw new TypeError('Expected a string')
        if ((t && t.nobrace === true) || !/\{.*\}/.test(e)) {
          return [e]
        }
        return K(e, t)
      }
      micromatch.braceExpand = (e, t) => {
        if (typeof e !== 'string') throw new TypeError('Expected a string')
        return micromatch.braces(e, Object.assign({}, t, { expand: true }))
      }
      var ze = micromatch
      function ensureArray(e) {
        if (Array.isArray(e)) return e
        if (e == undefined) return []
        return [e]
      }
      function getMatcherString(e, t) {
        if (t === false) {
          return e
        }
        return s.resolve(...(typeof t === 'string' ? [t, e] : [e]))
      }
      const Qe = function createFilter(e, t, r) {
        const a = r && r.resolve
        const getMatcher = (e) =>
          e instanceof RegExp
            ? e
            : {
                test: ze.matcher(
                  getMatcherString(e, a).split(s.sep).join('/'),
                  { dot: true }
                ),
              }
        const o = ensureArray(e).map(getMatcher)
        const u = ensureArray(t).map(getMatcher)
        return function (e) {
          if (typeof e !== 'string') return false
          if (/\0/.test(e)) return false
          e = e.split(s.sep).join('/')
          for (let t = 0; t < u.length; ++t) {
            const r = u[t]
            if (r.test(e)) return false
          }
          for (let t = 0; t < o.length; ++t) {
            const r = o[t]
            if (r.test(e)) return true
          }
          return !o.length
        }
      }
      const Ye =
        'break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public'
      const Xe =
        'arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl'
      const Ze = new Set(`${Ye} ${Xe}`.split(' '))
      Ze.add('')
      const Je = function makeLegalIdentifier(e) {
        e = e
          .replace(/-(\w)/g, (e, t) => t.toUpperCase())
          .replace(/[^$_a-zA-Z0-9]/g, '_')
        if (/\d/.test(e[0]) || Ze.has(e)) {
          e = `_${e}`
        }
        return e || '_'
      }
      function stringify$2(e) {
        return (JSON.stringify(e) || 'undefined').replace(
          /[\u2028\u2029]/g,
          (e) => `\\u${('000' + e.charCodeAt(0).toString(16)).slice(-4)}`
        )
      }
      function serializeArray(e, t, r) {
        let s = '['
        const a = t ? '\n' + r + t : ''
        for (let o = 0; o < e.length; o++) {
          const u = e[o]
          s += `${o > 0 ? ',' : ''}${a}${serialize(u, t, r + t)}`
        }
        return s + `${t ? '\n' + r : ''}]`
      }
      function serializeObject(e, t, r) {
        let s = '{'
        const a = t ? '\n' + r + t : ''
        const o = Object.keys(e)
        for (let u = 0; u < o.length; u++) {
          const c = o[u]
          const f = Je(c) === c ? c : stringify$2(c)
          s += `${u > 0 ? ',' : ''}${a}${f}:${t ? ' ' : ''}${serialize(
            e[c],
            t,
            r + t
          )}`
        }
        return s + `${t ? '\n' + r : ''}}`
      }
      function serialize(e, t, r) {
        if (e === Infinity) return 'Infinity'
        if (e === -Infinity) return '-Infinity'
        if (e === 0 && 1 / e === -Infinity) return '-0'
        if (e instanceof Date) return 'new Date(' + e.getTime() + ')'
        if (e instanceof RegExp) return e.toString()
        if (e !== e) return 'NaN'
        if (Array.isArray(e)) return serializeArray(e, t, r)
        if (e === null) return 'null'
        if (typeof e === 'object') return serializeObject(e, t, r)
        return stringify$2(e)
      }
      const et = function dataToEsm(e, t = {}) {
        const r = t.compact ? '' : 'indent' in t ? t.indent : '\t'
        const s = t.compact ? '' : ' '
        const a = t.compact ? '' : '\n'
        const o = t.preferConst ? 'const' : 'var'
        if (
          t.namedExports === false ||
          typeof e !== 'object' ||
          Array.isArray(e) ||
          e instanceof Date ||
          e instanceof RegExp ||
          e === null
        ) {
          const a = serialize(e, t.compact ? null : r, '')
          const o = s || (/^[{[\-\/]/.test(a) ? '' : ' ')
          return `export default${o}${a};`
        }
        let u = ''
        const c = []
        const f = Object.keys(e)
        for (let p = 0; p < f.length; p++) {
          const h = f[p]
          if (h === Je(h)) {
            if (t.objectShorthand) c.push(h)
            else c.push(`${h}:${s}${h}`)
            u += `export ${o} ${h}${s}=${s}${serialize(
              e[h],
              t.compact ? null : r,
              ''
            )};${a}`
          } else {
            c.push(
              `${stringify$2(h)}:${s}${serialize(
                e[h],
                t.compact ? null : r,
                ''
              )}`
            )
          }
        }
        return u + `export default${s}{${a}${r}${c.join(`,${a}${r}`)}${a}};${a}`
      }
      t.addExtension = c
      t.attachScopes = d
      t.createFilter = Qe
      t.dataToEsm = et
      t.extractAssignedNames = p
      t.makeLegalIdentifier = Je
    },
    6911: (e, t, r) => {
      /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
      var s = r(4300)
      var a = s.Buffer
      function copyProps(e, t) {
        for (var r in e) {
          t[r] = e[r]
        }
      }
      if (a.from && a.alloc && a.allocUnsafe && a.allocUnsafeSlow) {
        e.exports = s
      } else {
        copyProps(s, t)
        t.Buffer = SafeBuffer
      }
      function SafeBuffer(e, t, r) {
        return a(e, t, r)
      }
      SafeBuffer.prototype = Object.create(a.prototype)
      copyProps(a, SafeBuffer)
      SafeBuffer.from = function (e, t, r) {
        if (typeof e === 'number') {
          throw new TypeError('Argument must not be a number')
        }
        return a(e, t, r)
      }
      SafeBuffer.alloc = function (e, t, r) {
        if (typeof e !== 'number') {
          throw new TypeError('Argument must be a number')
        }
        var s = a(e)
        if (t !== undefined) {
          if (typeof r === 'string') {
            s.fill(t, r)
          } else {
            s.fill(t)
          }
        } else {
          s.fill(0)
        }
        return s
      }
      SafeBuffer.allocUnsafe = function (e) {
        if (typeof e !== 'number') {
          throw new TypeError('Argument must be a number')
        }
        return a(e)
      }
      SafeBuffer.allocUnsafeSlow = function (e) {
        if (typeof e !== 'number') {
          throw new TypeError('Argument must be a number')
        }
        return s.SlowBuffer(e)
      }
    },
    2656: (e) => {
      e.exports = function (e) {
        ;[process.stdout, process.stderr].forEach(function (t) {
          if (
            t._handle &&
            t.isTTY &&
            typeof t._handle.setBlocking === 'function'
          ) {
            t._handle.setBlocking(e)
          }
        })
      }
    },
    7234: (e, t, r) => {
      var s = global.process
      const processOk = function (e) {
        return (
          e &&
          typeof e === 'object' &&
          typeof e.removeListener === 'function' &&
          typeof e.emit === 'function' &&
          typeof e.reallyExit === 'function' &&
          typeof e.listeners === 'function' &&
          typeof e.kill === 'function' &&
          typeof e.pid === 'number' &&
          typeof e.on === 'function'
        )
      }
      if (!processOk(s)) {
        e.exports = function () {
          return function () {}
        }
      } else {
        var a = r(9491)
        var o = r(6462)
        var u = /^win/i.test(s.platform)
        var c = r(2361)
        if (typeof c !== 'function') {
          c = c.EventEmitter
        }
        var f
        if (s.__signal_exit_emitter__) {
          f = s.__signal_exit_emitter__
        } else {
          f = s.__signal_exit_emitter__ = new c()
          f.count = 0
          f.emitted = {}
        }
        if (!f.infinite) {
          f.setMaxListeners(Infinity)
          f.infinite = true
        }
        e.exports = function (e, t) {
          if (!processOk(global.process)) {
            return function () {}
          }
          a.equal(
            typeof e,
            'function',
            'a callback must be provided for exit handler'
          )
          if (g === false) {
            v()
          }
          var r = 'exit'
          if (t && t.alwaysLast) {
            r = 'afterexit'
          }
          var remove = function () {
            f.removeListener(r, e)
            if (
              f.listeners('exit').length === 0 &&
              f.listeners('afterexit').length === 0
            ) {
              p()
            }
          }
          f.on(r, e)
          return remove
        }
        var p = function unload() {
          if (!g || !processOk(global.process)) {
            return
          }
          g = false
          o.forEach(function (e) {
            try {
              s.removeListener(e, d[e])
            } catch (e) {}
          })
          s.emit = _
          s.reallyExit = m
          f.count -= 1
        }
        e.exports.unload = p
        var h = function emit(e, t, r) {
          if (f.emitted[e]) {
            return
          }
          f.emitted[e] = true
          f.emit(e, t, r)
        }
        var d = {}
        o.forEach(function (e) {
          d[e] = function listener() {
            if (!processOk(global.process)) {
              return
            }
            var t = s.listeners(e)
            if (t.length === f.count) {
              p()
              h('exit', null, e)
              h('afterexit', null, e)
              if (u && e === 'SIGHUP') {
                e = 'SIGINT'
              }
              s.kill(s.pid, e)
            }
          }
        })
        e.exports.signals = function () {
          return o
        }
        var g = false
        var v = function load() {
          if (g || !processOk(global.process)) {
            return
          }
          g = true
          f.count += 1
          o = o.filter(function (e) {
            try {
              s.on(e, d[e])
              return true
            } catch (e) {
              return false
            }
          })
          s.emit = D
          s.reallyExit = y
        }
        e.exports.load = v
        var m = s.reallyExit
        var y = function processReallyExit(e) {
          if (!processOk(global.process)) {
            return
          }
          s.exitCode = e || 0
          h('exit', s.exitCode, null)
          h('afterexit', s.exitCode, null)
          m.call(s, s.exitCode)
        }
        var _ = s.emit
        var D = function processEmit(e, t) {
          if (e === 'exit' && processOk(global.process)) {
            if (t !== undefined) {
              s.exitCode = t
            }
            var r = _.apply(this, arguments)
            h('exit', s.exitCode, null)
            h('afterexit', s.exitCode, null)
            return r
          } else {
            return _.apply(this, arguments)
          }
        }
      }
    },
    6462: (e) => {
      e.exports = ['SIGABRT', 'SIGALRM', 'SIGHUP', 'SIGINT', 'SIGTERM']
      if (process.platform !== 'win32') {
        e.exports.push(
          'SIGVTALRM',
          'SIGXCPU',
          'SIGXFSZ',
          'SIGUSR2',
          'SIGTRAP',
          'SIGSYS',
          'SIGQUIT',
          'SIGIOT'
        )
      }
      if (process.platform === 'linux') {
        e.exports.push('SIGIO', 'SIGPOLL', 'SIGPWR', 'SIGSTKFLT', 'SIGUNUSED')
      }
    },
    5663: (e, t, r) => {
      const s = r(1081)
      const a = r(8502)
      const o = r(3876)
      const stringWidth = (e) => {
        if (typeof e !== 'string' || e.length === 0) {
          return 0
        }
        e = s(e)
        if (e.length === 0) {
          return 0
        }
        e = e.replace(o(), '  ')
        let t = 0
        for (let r = 0; r < e.length; r++) {
          const s = e.codePointAt(r)
          if (s <= 31 || (s >= 127 && s <= 159)) {
            continue
          }
          if (s >= 768 && s <= 879) {
            continue
          }
          if (s > 65535) {
            r++
          }
          t += a(s) ? 2 : 1
        }
        return t
      }
      e.exports = stringWidth
      e.exports['default'] = stringWidth
    },
    3704: (e, t, r) => {
      var s = r(6911).Buffer
      var a =
        s.isEncoding ||
        function (e) {
          e = '' + e
          switch (e && e.toLowerCase()) {
            case 'hex':
            case 'utf8':
            case 'utf-8':
            case 'ascii':
            case 'binary':
            case 'base64':
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
            case 'raw':
              return true
            default:
              return false
          }
        }
      function _normalizeEncoding(e) {
        if (!e) return 'utf8'
        var t
        while (true) {
          switch (e) {
            case 'utf8':
            case 'utf-8':
              return 'utf8'
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return 'utf16le'
            case 'latin1':
            case 'binary':
              return 'latin1'
            case 'base64':
            case 'ascii':
            case 'hex':
              return e
            default:
              if (t) return
              e = ('' + e).toLowerCase()
              t = true
          }
        }
      }
      function normalizeEncoding(e) {
        var t = _normalizeEncoding(e)
        if (typeof t !== 'string' && (s.isEncoding === a || !a(e)))
          throw new Error('Unknown encoding: ' + e)
        return t || e
      }
      t.s = StringDecoder
      function StringDecoder(e) {
        this.encoding = normalizeEncoding(e)
        var t
        switch (this.encoding) {
          case 'utf16le':
            this.text = utf16Text
            this.end = utf16End
            t = 4
            break
          case 'utf8':
            this.fillLast = utf8FillLast
            t = 4
            break
          case 'base64':
            this.text = base64Text
            this.end = base64End
            t = 3
            break
          default:
            this.write = simpleWrite
            this.end = simpleEnd
            return
        }
        this.lastNeed = 0
        this.lastTotal = 0
        this.lastChar = s.allocUnsafe(t)
      }
      StringDecoder.prototype.write = function (e) {
        if (e.length === 0) return ''
        var t
        var r
        if (this.lastNeed) {
          t = this.fillLast(e)
          if (t === undefined) return ''
          r = this.lastNeed
          this.lastNeed = 0
        } else {
          r = 0
        }
        if (r < e.length) return t ? t + this.text(e, r) : this.text(e, r)
        return t || ''
      }
      StringDecoder.prototype.end = utf8End
      StringDecoder.prototype.text = utf8Text
      StringDecoder.prototype.fillLast = function (e) {
        if (this.lastNeed <= e.length) {
          e.copy(
            this.lastChar,
            this.lastTotal - this.lastNeed,
            0,
            this.lastNeed
          )
          return this.lastChar.toString(this.encoding, 0, this.lastTotal)
        }
        e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length)
        this.lastNeed -= e.length
      }
      function utf8CheckByte(e) {
        if (e <= 127) return 0
        else if (e >> 5 === 6) return 2
        else if (e >> 4 === 14) return 3
        else if (e >> 3 === 30) return 4
        return e >> 6 === 2 ? -1 : -2
      }
      function utf8CheckIncomplete(e, t, r) {
        var s = t.length - 1
        if (s < r) return 0
        var a = utf8CheckByte(t[s])
        if (a >= 0) {
          if (a > 0) e.lastNeed = a - 1
          return a
        }
        if (--s < r || a === -2) return 0
        a = utf8CheckByte(t[s])
        if (a >= 0) {
          if (a > 0) e.lastNeed = a - 2
          return a
        }
        if (--s < r || a === -2) return 0
        a = utf8CheckByte(t[s])
        if (a >= 0) {
          if (a > 0) {
            if (a === 2) a = 0
            else e.lastNeed = a - 3
          }
          return a
        }
        return 0
      }
      function utf8CheckExtraBytes(e, t, r) {
        if ((t[0] & 192) !== 128) {
          e.lastNeed = 0
          return '�'
        }
        if (e.lastNeed > 1 && t.length > 1) {
          if ((t[1] & 192) !== 128) {
            e.lastNeed = 1
            return '�'
          }
          if (e.lastNeed > 2 && t.length > 2) {
            if ((t[2] & 192) !== 128) {
              e.lastNeed = 2
              return '�'
            }
          }
        }
      }
      function utf8FillLast(e) {
        var t = this.lastTotal - this.lastNeed
        var r = utf8CheckExtraBytes(this, e, t)
        if (r !== undefined) return r
        if (this.lastNeed <= e.length) {
          e.copy(this.lastChar, t, 0, this.lastNeed)
          return this.lastChar.toString(this.encoding, 0, this.lastTotal)
        }
        e.copy(this.lastChar, t, 0, e.length)
        this.lastNeed -= e.length
      }
      function utf8Text(e, t) {
        var r = utf8CheckIncomplete(this, e, t)
        if (!this.lastNeed) return e.toString('utf8', t)
        this.lastTotal = r
        var s = e.length - (r - this.lastNeed)
        e.copy(this.lastChar, 0, s)
        return e.toString('utf8', t, s)
      }
      function utf8End(e) {
        var t = e && e.length ? this.write(e) : ''
        if (this.lastNeed) return t + '�'
        return t
      }
      function utf16Text(e, t) {
        if ((e.length - t) % 2 === 0) {
          var r = e.toString('utf16le', t)
          if (r) {
            var s = r.charCodeAt(r.length - 1)
            if (s >= 55296 && s <= 56319) {
              this.lastNeed = 2
              this.lastTotal = 4
              this.lastChar[0] = e[e.length - 2]
              this.lastChar[1] = e[e.length - 1]
              return r.slice(0, -1)
            }
          }
          return r
        }
        this.lastNeed = 1
        this.lastTotal = 2
        this.lastChar[0] = e[e.length - 1]
        return e.toString('utf16le', t, e.length - 1)
      }
      function utf16End(e) {
        var t = e && e.length ? this.write(e) : ''
        if (this.lastNeed) {
          var r = this.lastTotal - this.lastNeed
          return t + this.lastChar.toString('utf16le', 0, r)
        }
        return t
      }
      function base64Text(e, t) {
        var r = (e.length - t) % 3
        if (r === 0) return e.toString('base64', t)
        this.lastNeed = 3 - r
        this.lastTotal = 3
        if (r === 1) {
          this.lastChar[0] = e[e.length - 1]
        } else {
          this.lastChar[0] = e[e.length - 2]
          this.lastChar[1] = e[e.length - 1]
        }
        return e.toString('base64', t, e.length - r)
      }
      function base64End(e) {
        var t = e && e.length ? this.write(e) : ''
        if (this.lastNeed)
          return t + this.lastChar.toString('base64', 0, 3 - this.lastNeed)
        return t
      }
      function simpleWrite(e) {
        return e.toString(this.encoding)
      }
      function simpleEnd(e) {
        return e && e.length ? this.write(e) : ''
      }
    },
    1081: (e, t, r) => {
      const s = r(5511)
      e.exports = (e) => (typeof e === 'string' ? e.replace(s(), '') : e)
    },
    492: (e, t, r) => {
      /*!
       * to-regex-range <https://github.com/micromatch/to-regex-range>
       *
       * Copyright (c) 2015-present, Jon Schlinkert.
       * Released under the MIT License.
       */ const s = r(3357)
      const toRegexRange = (e, t, r) => {
        if (s(e) === false) {
          throw new TypeError(
            'toRegexRange: expected the first argument to be a number'
          )
        }
        if (t === void 0 || e === t) {
          return String(e)
        }
        if (s(t) === false) {
          throw new TypeError(
            'toRegexRange: expected the second argument to be a number.'
          )
        }
        let a = { relaxZeros: true, ...r }
        if (typeof a.strictZeros === 'boolean') {
          a.relaxZeros = a.strictZeros === false
        }
        let o = String(a.relaxZeros)
        let u = String(a.shorthand)
        let c = String(a.capture)
        let f = String(a.wrap)
        let p = e + ':' + t + '=' + o + u + c + f
        if (toRegexRange.cache.hasOwnProperty(p)) {
          return toRegexRange.cache[p].result
        }
        let h = Math.min(e, t)
        let d = Math.max(e, t)
        if (Math.abs(h - d) === 1) {
          let r = e + '|' + t
          if (a.capture) {
            return `(${r})`
          }
          if (a.wrap === false) {
            return r
          }
          return `(?:${r})`
        }
        let g = hasPadding(e) || hasPadding(t)
        let v = { min: e, max: t, a: h, b: d }
        let m = []
        let y = []
        if (g) {
          v.isPadded = g
          v.maxLen = String(v.max).length
        }
        if (h < 0) {
          let e = d < 0 ? Math.abs(d) : 1
          y = splitToPatterns(e, Math.abs(h), v, a)
          h = v.a = 0
        }
        if (d >= 0) {
          m = splitToPatterns(h, d, v, a)
        }
        v.negatives = y
        v.positives = m
        v.result = collatePatterns(y, m, a)
        if (a.capture === true) {
          v.result = `(${v.result})`
        } else if (a.wrap !== false && m.length + y.length > 1) {
          v.result = `(?:${v.result})`
        }
        toRegexRange.cache[p] = v
        return v.result
      }
      function collatePatterns(e, t, r) {
        let s = filterPatterns(e, t, '-', false, r) || []
        let a = filterPatterns(t, e, '', false, r) || []
        let o = filterPatterns(e, t, '-?', true, r) || []
        let u = s.concat(o).concat(a)
        return u.join('|')
      }
      function splitToRanges(e, t) {
        let r = 1
        let s = 1
        let a = countNines(e, r)
        let o = new Set([t])
        while (e <= a && a <= t) {
          o.add(a)
          r += 1
          a = countNines(e, r)
        }
        a = countZeros(t + 1, s) - 1
        while (e < a && a <= t) {
          o.add(a)
          s += 1
          a = countZeros(t + 1, s) - 1
        }
        o = [...o]
        o.sort(compare)
        return o
      }
      function rangeToPattern(e, t, r) {
        if (e === t) {
          return { pattern: e, count: [], digits: 0 }
        }
        let s = zip(e, t)
        let a = s.length
        let o = ''
        let u = 0
        for (let e = 0; e < a; e++) {
          let [t, a] = s[e]
          if (t === a) {
            o += t
          } else if (t !== '0' || a !== '9') {
            o += toCharacterClass(t, a, r)
          } else {
            u++
          }
        }
        if (u) {
          o += r.shorthand === true ? '\\d' : '[0-9]'
        }
        return { pattern: o, count: [u], digits: a }
      }
      function splitToPatterns(e, t, r, s) {
        let a = splitToRanges(e, t)
        let o = []
        let u = e
        let c
        for (let e = 0; e < a.length; e++) {
          let t = a[e]
          let f = rangeToPattern(String(u), String(t), s)
          let p = ''
          if (!r.isPadded && c && c.pattern === f.pattern) {
            if (c.count.length > 1) {
              c.count.pop()
            }
            c.count.push(f.count[0])
            c.string = c.pattern + toQuantifier(c.count)
            u = t + 1
            continue
          }
          if (r.isPadded) {
            p = padZeros(t, r, s)
          }
          f.string = p + f.pattern + toQuantifier(f.count)
          o.push(f)
          u = t + 1
          c = f
        }
        return o
      }
      function filterPatterns(e, t, r, s, a) {
        let o = []
        for (let a of e) {
          let { string: e } = a
          if (!s && !contains(t, 'string', e)) {
            o.push(r + e)
          }
          if (s && contains(t, 'string', e)) {
            o.push(r + e)
          }
        }
        return o
      }
      function zip(e, t) {
        let r = []
        for (let s = 0; s < e.length; s++) r.push([e[s], t[s]])
        return r
      }
      function compare(e, t) {
        return e > t ? 1 : t > e ? -1 : 0
      }
      function contains(e, t, r) {
        return e.some((e) => e[t] === r)
      }
      function countNines(e, t) {
        return Number(String(e).slice(0, -t) + '9'.repeat(t))
      }
      function countZeros(e, t) {
        return e - (e % Math.pow(10, t))
      }
      function toQuantifier(e) {
        let [t = 0, r = ''] = e
        if (r || t > 1) {
          return `{${t + (r ? ',' + r : '')}}`
        }
        return ''
      }
      function toCharacterClass(e, t, r) {
        return `[${e}${t - e === 1 ? '' : '-'}${t}]`
      }
      function hasPadding(e) {
        return /^-?(0+)\d/.test(e)
      }
      function padZeros(e, t, r) {
        if (!t.isPadded) {
          return e
        }
        let s = Math.abs(t.maxLen - String(e).length)
        let a = r.relaxZeros !== false
        switch (s) {
          case 0:
            return ''
          case 1:
            return a ? '0?' : '0'
          case 2:
            return a ? '0{0,2}' : '00'
          default: {
            return a ? `0{0,${s}}` : `0{${s}}`
          }
        }
      }
      toRegexRange.cache = {}
      toRegexRange.clearCache = () => (toRegexRange.cache = {})
      e.exports = toRegexRange
    },
    6124: (e, t, r) => {
      e.exports = r(3837).deprecate
    },
    1365: (e, t, r) => {
      var s = r(5663)
      t.center = alignCenter
      t.left = alignLeft
      t.right = alignRight
      function createPadding(e) {
        var t = ''
        var r = ' '
        var s = e
        do {
          if (s % 2) {
            t += r
          }
          s = Math.floor(s / 2)
          r += r
        } while (s)
        return t
      }
      function alignLeft(e, t) {
        var r = e.trimRight()
        if (r.length === 0 && e.length >= t) return e
        var a = ''
        var o = s(r)
        if (o < t) {
          a = createPadding(t - o)
        }
        return r + a
      }
      function alignRight(e, t) {
        var r = e.trimLeft()
        if (r.length === 0 && e.length >= t) return e
        var a = ''
        var o = s(r)
        if (o < t) {
          a = createPadding(t - o)
        }
        return a + r
      }
      function alignCenter(e, t) {
        var r = e.trim()
        if (r.length === 0 && e.length >= t) return e
        var a = ''
        var o = ''
        var u = s(r)
        if (u < t) {
          var c = parseInt((t - u) / 2, 10)
          a = createPadding(c)
          o = createPadding(t - (u + c))
        }
        return a + r + o
      }
    },
    2355: (module) => {
      module.exports = eval('require')('aws-sdk')
    },
    3930: (module) => {
      module.exports = eval('require')('mock-aws-s3')
    },
    4997: (module) => {
      module.exports = eval('require')('nock')
    },
    9491: (e) => {
      e.exports = require('assert')
    },
    4300: (e) => {
      e.exports = require('buffer')
    },
    2081: (e) => {
      e.exports = require('child_process')
    },
    2057: (e) => {
      e.exports = require('constants')
    },
    2361: (e) => {
      e.exports = require('events')
    },
    7147: (e) => {
      e.exports = require('fs')
    },
    3460: (e) => {
      e.exports = require('berserk/dist/compiled/glob')
    },
    798: (e) => {
      e.exports = require('berserk/dist/compiled/semver')
    },
    8188: (e) => {
      e.exports = require('module')
    },
    2037: (e) => {
      e.exports = require('os')
    },
    1017: (e) => {
      e.exports = require('path')
    },
    8102: (e) => {
      e.exports = require('repl')
    },
    2781: (e) => {
      e.exports = require('stream')
    },
    7310: (e) => {
      e.exports = require('url')
    },
    3837: (e) => {
      e.exports = require('util')
    },
    3982: function (e, t) {
      ;(function (e, r) {
        true ? r(t) : 0
      })(this, function (e) {
        class WalkerBase {
          constructor() {
            this.should_skip = false
            this.should_remove = false
            this.replacement = null
            this.context = {
              skip: () => (this.should_skip = true),
              remove: () => (this.should_remove = true),
              replace: (e) => (this.replacement = e),
            }
          }
          replace(e, t, r, s) {
            if (e) {
              if (r !== null) {
                e[t][r] = s
              } else {
                e[t] = s
              }
            }
          }
          remove(e, t, r) {
            if (e) {
              if (r !== null) {
                e[t].splice(r, 1)
              } else {
                delete e[t]
              }
            }
          }
        }
        class SyncWalker extends WalkerBase {
          constructor(e, t) {
            super()
            this.enter = e
            this.leave = t
          }
          visit(e, t, r, s) {
            if (e) {
              if (this.enter) {
                const a = this.should_skip
                const o = this.should_remove
                const u = this.replacement
                this.should_skip = false
                this.should_remove = false
                this.replacement = null
                this.enter.call(this.context, e, t, r, s)
                if (this.replacement) {
                  e = this.replacement
                  this.replace(t, r, s, e)
                }
                if (this.should_remove) {
                  this.remove(t, r, s)
                }
                const c = this.should_skip
                const f = this.should_remove
                this.should_skip = a
                this.should_remove = o
                this.replacement = u
                if (c) return e
                if (f) return null
              }
              for (const t in e) {
                const r = e[t]
                if (typeof r !== 'object') {
                  continue
                } else if (Array.isArray(r)) {
                  for (let s = 0; s < r.length; s += 1) {
                    if (r[s] !== null && typeof r[s].type === 'string') {
                      if (!this.visit(r[s], e, t, s)) {
                        s--
                      }
                    }
                  }
                } else if (r !== null && typeof r.type === 'string') {
                  this.visit(r, e, t, null)
                }
              }
              if (this.leave) {
                const a = this.replacement
                const o = this.should_remove
                this.replacement = null
                this.should_remove = false
                this.leave.call(this.context, e, t, r, s)
                if (this.replacement) {
                  e = this.replacement
                  this.replace(t, r, s, e)
                }
                if (this.should_remove) {
                  this.remove(t, r, s)
                }
                const u = this.should_remove
                this.replacement = a
                this.should_remove = o
                if (u) return null
              }
            }
            return e
          }
        }
        class AsyncWalker extends WalkerBase {
          constructor(e, t) {
            super()
            this.enter = e
            this.leave = t
          }
          async visit(e, t, r, s) {
            if (e) {
              if (this.enter) {
                const a = this.should_skip
                const o = this.should_remove
                const u = this.replacement
                this.should_skip = false
                this.should_remove = false
                this.replacement = null
                await this.enter.call(this.context, e, t, r, s)
                if (this.replacement) {
                  e = this.replacement
                  this.replace(t, r, s, e)
                }
                if (this.should_remove) {
                  this.remove(t, r, s)
                }
                const c = this.should_skip
                const f = this.should_remove
                this.should_skip = a
                this.should_remove = o
                this.replacement = u
                if (c) return e
                if (f) return null
              }
              for (const t in e) {
                const r = e[t]
                if (typeof r !== 'object') {
                  continue
                } else if (Array.isArray(r)) {
                  for (let s = 0; s < r.length; s += 1) {
                    if (r[s] !== null && typeof r[s].type === 'string') {
                      if (!(await this.visit(r[s], e, t, s))) {
                        s--
                      }
                    }
                  }
                } else if (r !== null && typeof r.type === 'string') {
                  await this.visit(r, e, t, null)
                }
              }
              if (this.leave) {
                const a = this.replacement
                const o = this.should_remove
                this.replacement = null
                this.should_remove = false
                await this.leave.call(this.context, e, t, r, s)
                if (this.replacement) {
                  e = this.replacement
                  this.replace(t, r, s, e)
                }
                if (this.should_remove) {
                  this.remove(t, r, s)
                }
                const u = this.should_remove
                this.replacement = a
                this.should_remove = o
                if (u) return null
              }
            }
            return e
          }
        }
        function walk(e, { enter: t, leave: r }) {
          const s = new SyncWalker(t, r)
          return s.visit(e, null)
        }
        async function asyncWalk(e, { enter: t, leave: r }) {
          const s = new AsyncWalker(t, r)
          return await s.visit(e, null)
        }
        e.asyncWalk = asyncWalk
        e.walk = walk
        Object.defineProperty(e, '__esModule', { value: true })
      })
    },
    1152: (e) => {
      e.exports = JSON.parse(
        '{"0.1.14":{"node_abi":null,"v8":"1.3"},"0.1.15":{"node_abi":null,"v8":"1.3"},"0.1.16":{"node_abi":null,"v8":"1.3"},"0.1.17":{"node_abi":null,"v8":"1.3"},"0.1.18":{"node_abi":null,"v8":"1.3"},"0.1.19":{"node_abi":null,"v8":"2.0"},"0.1.20":{"node_abi":null,"v8":"2.0"},"0.1.21":{"node_abi":null,"v8":"2.0"},"0.1.22":{"node_abi":null,"v8":"2.0"},"0.1.23":{"node_abi":null,"v8":"2.0"},"0.1.24":{"node_abi":null,"v8":"2.0"},"0.1.25":{"node_abi":null,"v8":"2.0"},"0.1.26":{"node_abi":null,"v8":"2.0"},"0.1.27":{"node_abi":null,"v8":"2.1"},"0.1.28":{"node_abi":null,"v8":"2.1"},"0.1.29":{"node_abi":null,"v8":"2.1"},"0.1.30":{"node_abi":null,"v8":"2.1"},"0.1.31":{"node_abi":null,"v8":"2.1"},"0.1.32":{"node_abi":null,"v8":"2.1"},"0.1.33":{"node_abi":null,"v8":"2.1"},"0.1.90":{"node_abi":null,"v8":"2.2"},"0.1.91":{"node_abi":null,"v8":"2.2"},"0.1.92":{"node_abi":null,"v8":"2.2"},"0.1.93":{"node_abi":null,"v8":"2.2"},"0.1.94":{"node_abi":null,"v8":"2.2"},"0.1.95":{"node_abi":null,"v8":"2.2"},"0.1.96":{"node_abi":null,"v8":"2.2"},"0.1.97":{"node_abi":null,"v8":"2.2"},"0.1.98":{"node_abi":null,"v8":"2.2"},"0.1.99":{"node_abi":null,"v8":"2.2"},"0.1.100":{"node_abi":null,"v8":"2.2"},"0.1.101":{"node_abi":null,"v8":"2.3"},"0.1.102":{"node_abi":null,"v8":"2.3"},"0.1.103":{"node_abi":null,"v8":"2.3"},"0.1.104":{"node_abi":null,"v8":"2.3"},"0.2.0":{"node_abi":1,"v8":"2.3"},"0.2.1":{"node_abi":1,"v8":"2.3"},"0.2.2":{"node_abi":1,"v8":"2.3"},"0.2.3":{"node_abi":1,"v8":"2.3"},"0.2.4":{"node_abi":1,"v8":"2.3"},"0.2.5":{"node_abi":1,"v8":"2.3"},"0.2.6":{"node_abi":1,"v8":"2.3"},"0.3.0":{"node_abi":1,"v8":"2.5"},"0.3.1":{"node_abi":1,"v8":"2.5"},"0.3.2":{"node_abi":1,"v8":"3.0"},"0.3.3":{"node_abi":1,"v8":"3.0"},"0.3.4":{"node_abi":1,"v8":"3.0"},"0.3.5":{"node_abi":1,"v8":"3.0"},"0.3.6":{"node_abi":1,"v8":"3.0"},"0.3.7":{"node_abi":1,"v8":"3.0"},"0.3.8":{"node_abi":1,"v8":"3.1"},"0.4.0":{"node_abi":1,"v8":"3.1"},"0.4.1":{"node_abi":1,"v8":"3.1"},"0.4.2":{"node_abi":1,"v8":"3.1"},"0.4.3":{"node_abi":1,"v8":"3.1"},"0.4.4":{"node_abi":1,"v8":"3.1"},"0.4.5":{"node_abi":1,"v8":"3.1"},"0.4.6":{"node_abi":1,"v8":"3.1"},"0.4.7":{"node_abi":1,"v8":"3.1"},"0.4.8":{"node_abi":1,"v8":"3.1"},"0.4.9":{"node_abi":1,"v8":"3.1"},"0.4.10":{"node_abi":1,"v8":"3.1"},"0.4.11":{"node_abi":1,"v8":"3.1"},"0.4.12":{"node_abi":1,"v8":"3.1"},"0.5.0":{"node_abi":1,"v8":"3.1"},"0.5.1":{"node_abi":1,"v8":"3.4"},"0.5.2":{"node_abi":1,"v8":"3.4"},"0.5.3":{"node_abi":1,"v8":"3.4"},"0.5.4":{"node_abi":1,"v8":"3.5"},"0.5.5":{"node_abi":1,"v8":"3.5"},"0.5.6":{"node_abi":1,"v8":"3.6"},"0.5.7":{"node_abi":1,"v8":"3.6"},"0.5.8":{"node_abi":1,"v8":"3.6"},"0.5.9":{"node_abi":1,"v8":"3.6"},"0.5.10":{"node_abi":1,"v8":"3.7"},"0.6.0":{"node_abi":1,"v8":"3.6"},"0.6.1":{"node_abi":1,"v8":"3.6"},"0.6.2":{"node_abi":1,"v8":"3.6"},"0.6.3":{"node_abi":1,"v8":"3.6"},"0.6.4":{"node_abi":1,"v8":"3.6"},"0.6.5":{"node_abi":1,"v8":"3.6"},"0.6.6":{"node_abi":1,"v8":"3.6"},"0.6.7":{"node_abi":1,"v8":"3.6"},"0.6.8":{"node_abi":1,"v8":"3.6"},"0.6.9":{"node_abi":1,"v8":"3.6"},"0.6.10":{"node_abi":1,"v8":"3.6"},"0.6.11":{"node_abi":1,"v8":"3.6"},"0.6.12":{"node_abi":1,"v8":"3.6"},"0.6.13":{"node_abi":1,"v8":"3.6"},"0.6.14":{"node_abi":1,"v8":"3.6"},"0.6.15":{"node_abi":1,"v8":"3.6"},"0.6.16":{"node_abi":1,"v8":"3.6"},"0.6.17":{"node_abi":1,"v8":"3.6"},"0.6.18":{"node_abi":1,"v8":"3.6"},"0.6.19":{"node_abi":1,"v8":"3.6"},"0.6.20":{"node_abi":1,"v8":"3.6"},"0.6.21":{"node_abi":1,"v8":"3.6"},"0.7.0":{"node_abi":1,"v8":"3.8"},"0.7.1":{"node_abi":1,"v8":"3.8"},"0.7.2":{"node_abi":1,"v8":"3.8"},"0.7.3":{"node_abi":1,"v8":"3.9"},"0.7.4":{"node_abi":1,"v8":"3.9"},"0.7.5":{"node_abi":1,"v8":"3.9"},"0.7.6":{"node_abi":1,"v8":"3.9"},"0.7.7":{"node_abi":1,"v8":"3.9"},"0.7.8":{"node_abi":1,"v8":"3.9"},"0.7.9":{"node_abi":1,"v8":"3.11"},"0.7.10":{"node_abi":1,"v8":"3.9"},"0.7.11":{"node_abi":1,"v8":"3.11"},"0.7.12":{"node_abi":1,"v8":"3.11"},"0.8.0":{"node_abi":1,"v8":"3.11"},"0.8.1":{"node_abi":1,"v8":"3.11"},"0.8.2":{"node_abi":1,"v8":"3.11"},"0.8.3":{"node_abi":1,"v8":"3.11"},"0.8.4":{"node_abi":1,"v8":"3.11"},"0.8.5":{"node_abi":1,"v8":"3.11"},"0.8.6":{"node_abi":1,"v8":"3.11"},"0.8.7":{"node_abi":1,"v8":"3.11"},"0.8.8":{"node_abi":1,"v8":"3.11"},"0.8.9":{"node_abi":1,"v8":"3.11"},"0.8.10":{"node_abi":1,"v8":"3.11"},"0.8.11":{"node_abi":1,"v8":"3.11"},"0.8.12":{"node_abi":1,"v8":"3.11"},"0.8.13":{"node_abi":1,"v8":"3.11"},"0.8.14":{"node_abi":1,"v8":"3.11"},"0.8.15":{"node_abi":1,"v8":"3.11"},"0.8.16":{"node_abi":1,"v8":"3.11"},"0.8.17":{"node_abi":1,"v8":"3.11"},"0.8.18":{"node_abi":1,"v8":"3.11"},"0.8.19":{"node_abi":1,"v8":"3.11"},"0.8.20":{"node_abi":1,"v8":"3.11"},"0.8.21":{"node_abi":1,"v8":"3.11"},"0.8.22":{"node_abi":1,"v8":"3.11"},"0.8.23":{"node_abi":1,"v8":"3.11"},"0.8.24":{"node_abi":1,"v8":"3.11"},"0.8.25":{"node_abi":1,"v8":"3.11"},"0.8.26":{"node_abi":1,"v8":"3.11"},"0.8.27":{"node_abi":1,"v8":"3.11"},"0.8.28":{"node_abi":1,"v8":"3.11"},"0.9.0":{"node_abi":1,"v8":"3.11"},"0.9.1":{"node_abi":10,"v8":"3.11"},"0.9.2":{"node_abi":10,"v8":"3.11"},"0.9.3":{"node_abi":10,"v8":"3.13"},"0.9.4":{"node_abi":10,"v8":"3.13"},"0.9.5":{"node_abi":10,"v8":"3.13"},"0.9.6":{"node_abi":10,"v8":"3.15"},"0.9.7":{"node_abi":10,"v8":"3.15"},"0.9.8":{"node_abi":10,"v8":"3.15"},"0.9.9":{"node_abi":11,"v8":"3.15"},"0.9.10":{"node_abi":11,"v8":"3.15"},"0.9.11":{"node_abi":11,"v8":"3.14"},"0.9.12":{"node_abi":11,"v8":"3.14"},"0.10.0":{"node_abi":11,"v8":"3.14"},"0.10.1":{"node_abi":11,"v8":"3.14"},"0.10.2":{"node_abi":11,"v8":"3.14"},"0.10.3":{"node_abi":11,"v8":"3.14"},"0.10.4":{"node_abi":11,"v8":"3.14"},"0.10.5":{"node_abi":11,"v8":"3.14"},"0.10.6":{"node_abi":11,"v8":"3.14"},"0.10.7":{"node_abi":11,"v8":"3.14"},"0.10.8":{"node_abi":11,"v8":"3.14"},"0.10.9":{"node_abi":11,"v8":"3.14"},"0.10.10":{"node_abi":11,"v8":"3.14"},"0.10.11":{"node_abi":11,"v8":"3.14"},"0.10.12":{"node_abi":11,"v8":"3.14"},"0.10.13":{"node_abi":11,"v8":"3.14"},"0.10.14":{"node_abi":11,"v8":"3.14"},"0.10.15":{"node_abi":11,"v8":"3.14"},"0.10.16":{"node_abi":11,"v8":"3.14"},"0.10.17":{"node_abi":11,"v8":"3.14"},"0.10.18":{"node_abi":11,"v8":"3.14"},"0.10.19":{"node_abi":11,"v8":"3.14"},"0.10.20":{"node_abi":11,"v8":"3.14"},"0.10.21":{"node_abi":11,"v8":"3.14"},"0.10.22":{"node_abi":11,"v8":"3.14"},"0.10.23":{"node_abi":11,"v8":"3.14"},"0.10.24":{"node_abi":11,"v8":"3.14"},"0.10.25":{"node_abi":11,"v8":"3.14"},"0.10.26":{"node_abi":11,"v8":"3.14"},"0.10.27":{"node_abi":11,"v8":"3.14"},"0.10.28":{"node_abi":11,"v8":"3.14"},"0.10.29":{"node_abi":11,"v8":"3.14"},"0.10.30":{"node_abi":11,"v8":"3.14"},"0.10.31":{"node_abi":11,"v8":"3.14"},"0.10.32":{"node_abi":11,"v8":"3.14"},"0.10.33":{"node_abi":11,"v8":"3.14"},"0.10.34":{"node_abi":11,"v8":"3.14"},"0.10.35":{"node_abi":11,"v8":"3.14"},"0.10.36":{"node_abi":11,"v8":"3.14"},"0.10.37":{"node_abi":11,"v8":"3.14"},"0.10.38":{"node_abi":11,"v8":"3.14"},"0.10.39":{"node_abi":11,"v8":"3.14"},"0.10.40":{"node_abi":11,"v8":"3.14"},"0.10.41":{"node_abi":11,"v8":"3.14"},"0.10.42":{"node_abi":11,"v8":"3.14"},"0.10.43":{"node_abi":11,"v8":"3.14"},"0.10.44":{"node_abi":11,"v8":"3.14"},"0.10.45":{"node_abi":11,"v8":"3.14"},"0.10.46":{"node_abi":11,"v8":"3.14"},"0.10.47":{"node_abi":11,"v8":"3.14"},"0.10.48":{"node_abi":11,"v8":"3.14"},"0.11.0":{"node_abi":12,"v8":"3.17"},"0.11.1":{"node_abi":12,"v8":"3.18"},"0.11.2":{"node_abi":12,"v8":"3.19"},"0.11.3":{"node_abi":12,"v8":"3.19"},"0.11.4":{"node_abi":12,"v8":"3.20"},"0.11.5":{"node_abi":12,"v8":"3.20"},"0.11.6":{"node_abi":12,"v8":"3.20"},"0.11.7":{"node_abi":12,"v8":"3.20"},"0.11.8":{"node_abi":13,"v8":"3.21"},"0.11.9":{"node_abi":13,"v8":"3.22"},"0.11.10":{"node_abi":13,"v8":"3.22"},"0.11.11":{"node_abi":14,"v8":"3.22"},"0.11.12":{"node_abi":14,"v8":"3.22"},"0.11.13":{"node_abi":14,"v8":"3.25"},"0.11.14":{"node_abi":14,"v8":"3.26"},"0.11.15":{"node_abi":14,"v8":"3.28"},"0.11.16":{"node_abi":14,"v8":"3.28"},"0.12.0":{"node_abi":14,"v8":"3.28"},"0.12.1":{"node_abi":14,"v8":"3.28"},"0.12.2":{"node_abi":14,"v8":"3.28"},"0.12.3":{"node_abi":14,"v8":"3.28"},"0.12.4":{"node_abi":14,"v8":"3.28"},"0.12.5":{"node_abi":14,"v8":"3.28"},"0.12.6":{"node_abi":14,"v8":"3.28"},"0.12.7":{"node_abi":14,"v8":"3.28"},"0.12.8":{"node_abi":14,"v8":"3.28"},"0.12.9":{"node_abi":14,"v8":"3.28"},"0.12.10":{"node_abi":14,"v8":"3.28"},"0.12.11":{"node_abi":14,"v8":"3.28"},"0.12.12":{"node_abi":14,"v8":"3.28"},"0.12.13":{"node_abi":14,"v8":"3.28"},"0.12.14":{"node_abi":14,"v8":"3.28"},"0.12.15":{"node_abi":14,"v8":"3.28"},"0.12.16":{"node_abi":14,"v8":"3.28"},"0.12.17":{"node_abi":14,"v8":"3.28"},"0.12.18":{"node_abi":14,"v8":"3.28"},"1.0.0":{"node_abi":42,"v8":"3.31"},"1.0.1":{"node_abi":42,"v8":"3.31"},"1.0.2":{"node_abi":42,"v8":"3.31"},"1.0.3":{"node_abi":42,"v8":"4.1"},"1.0.4":{"node_abi":42,"v8":"4.1"},"1.1.0":{"node_abi":43,"v8":"4.1"},"1.2.0":{"node_abi":43,"v8":"4.1"},"1.3.0":{"node_abi":43,"v8":"4.1"},"1.4.1":{"node_abi":43,"v8":"4.1"},"1.4.2":{"node_abi":43,"v8":"4.1"},"1.4.3":{"node_abi":43,"v8":"4.1"},"1.5.0":{"node_abi":43,"v8":"4.1"},"1.5.1":{"node_abi":43,"v8":"4.1"},"1.6.0":{"node_abi":43,"v8":"4.1"},"1.6.1":{"node_abi":43,"v8":"4.1"},"1.6.2":{"node_abi":43,"v8":"4.1"},"1.6.3":{"node_abi":43,"v8":"4.1"},"1.6.4":{"node_abi":43,"v8":"4.1"},"1.7.1":{"node_abi":43,"v8":"4.1"},"1.8.1":{"node_abi":43,"v8":"4.1"},"1.8.2":{"node_abi":43,"v8":"4.1"},"1.8.3":{"node_abi":43,"v8":"4.1"},"1.8.4":{"node_abi":43,"v8":"4.1"},"2.0.0":{"node_abi":44,"v8":"4.2"},"2.0.1":{"node_abi":44,"v8":"4.2"},"2.0.2":{"node_abi":44,"v8":"4.2"},"2.1.0":{"node_abi":44,"v8":"4.2"},"2.2.0":{"node_abi":44,"v8":"4.2"},"2.2.1":{"node_abi":44,"v8":"4.2"},"2.3.0":{"node_abi":44,"v8":"4.2"},"2.3.1":{"node_abi":44,"v8":"4.2"},"2.3.2":{"node_abi":44,"v8":"4.2"},"2.3.3":{"node_abi":44,"v8":"4.2"},"2.3.4":{"node_abi":44,"v8":"4.2"},"2.4.0":{"node_abi":44,"v8":"4.2"},"2.5.0":{"node_abi":44,"v8":"4.2"},"3.0.0":{"node_abi":45,"v8":"4.4"},"3.1.0":{"node_abi":45,"v8":"4.4"},"3.2.0":{"node_abi":45,"v8":"4.4"},"3.3.0":{"node_abi":45,"v8":"4.4"},"3.3.1":{"node_abi":45,"v8":"4.4"},"4.0.0":{"node_abi":46,"v8":"4.5"},"4.1.0":{"node_abi":46,"v8":"4.5"},"4.1.1":{"node_abi":46,"v8":"4.5"},"4.1.2":{"node_abi":46,"v8":"4.5"},"4.2.0":{"node_abi":46,"v8":"4.5"},"4.2.1":{"node_abi":46,"v8":"4.5"},"4.2.2":{"node_abi":46,"v8":"4.5"},"4.2.3":{"node_abi":46,"v8":"4.5"},"4.2.4":{"node_abi":46,"v8":"4.5"},"4.2.5":{"node_abi":46,"v8":"4.5"},"4.2.6":{"node_abi":46,"v8":"4.5"},"4.3.0":{"node_abi":46,"v8":"4.5"},"4.3.1":{"node_abi":46,"v8":"4.5"},"4.3.2":{"node_abi":46,"v8":"4.5"},"4.4.0":{"node_abi":46,"v8":"4.5"},"4.4.1":{"node_abi":46,"v8":"4.5"},"4.4.2":{"node_abi":46,"v8":"4.5"},"4.4.3":{"node_abi":46,"v8":"4.5"},"4.4.4":{"node_abi":46,"v8":"4.5"},"4.4.5":{"node_abi":46,"v8":"4.5"},"4.4.6":{"node_abi":46,"v8":"4.5"},"4.4.7":{"node_abi":46,"v8":"4.5"},"4.5.0":{"node_abi":46,"v8":"4.5"},"4.6.0":{"node_abi":46,"v8":"4.5"},"4.6.1":{"node_abi":46,"v8":"4.5"},"4.6.2":{"node_abi":46,"v8":"4.5"},"4.7.0":{"node_abi":46,"v8":"4.5"},"4.7.1":{"node_abi":46,"v8":"4.5"},"4.7.2":{"node_abi":46,"v8":"4.5"},"4.7.3":{"node_abi":46,"v8":"4.5"},"4.8.0":{"node_abi":46,"v8":"4.5"},"4.8.1":{"node_abi":46,"v8":"4.5"},"4.8.2":{"node_abi":46,"v8":"4.5"},"4.8.3":{"node_abi":46,"v8":"4.5"},"4.8.4":{"node_abi":46,"v8":"4.5"},"4.8.5":{"node_abi":46,"v8":"4.5"},"4.8.6":{"node_abi":46,"v8":"4.5"},"4.8.7":{"node_abi":46,"v8":"4.5"},"4.9.0":{"node_abi":46,"v8":"4.5"},"4.9.1":{"node_abi":46,"v8":"4.5"},"5.0.0":{"node_abi":47,"v8":"4.6"},"5.1.0":{"node_abi":47,"v8":"4.6"},"5.1.1":{"node_abi":47,"v8":"4.6"},"5.2.0":{"node_abi":47,"v8":"4.6"},"5.3.0":{"node_abi":47,"v8":"4.6"},"5.4.0":{"node_abi":47,"v8":"4.6"},"5.4.1":{"node_abi":47,"v8":"4.6"},"5.5.0":{"node_abi":47,"v8":"4.6"},"5.6.0":{"node_abi":47,"v8":"4.6"},"5.7.0":{"node_abi":47,"v8":"4.6"},"5.7.1":{"node_abi":47,"v8":"4.6"},"5.8.0":{"node_abi":47,"v8":"4.6"},"5.9.0":{"node_abi":47,"v8":"4.6"},"5.9.1":{"node_abi":47,"v8":"4.6"},"5.10.0":{"node_abi":47,"v8":"4.6"},"5.10.1":{"node_abi":47,"v8":"4.6"},"5.11.0":{"node_abi":47,"v8":"4.6"},"5.11.1":{"node_abi":47,"v8":"4.6"},"5.12.0":{"node_abi":47,"v8":"4.6"},"6.0.0":{"node_abi":48,"v8":"5.0"},"6.1.0":{"node_abi":48,"v8":"5.0"},"6.2.0":{"node_abi":48,"v8":"5.0"},"6.2.1":{"node_abi":48,"v8":"5.0"},"6.2.2":{"node_abi":48,"v8":"5.0"},"6.3.0":{"node_abi":48,"v8":"5.0"},"6.3.1":{"node_abi":48,"v8":"5.0"},"6.4.0":{"node_abi":48,"v8":"5.0"},"6.5.0":{"node_abi":48,"v8":"5.1"},"6.6.0":{"node_abi":48,"v8":"5.1"},"6.7.0":{"node_abi":48,"v8":"5.1"},"6.8.0":{"node_abi":48,"v8":"5.1"},"6.8.1":{"node_abi":48,"v8":"5.1"},"6.9.0":{"node_abi":48,"v8":"5.1"},"6.9.1":{"node_abi":48,"v8":"5.1"},"6.9.2":{"node_abi":48,"v8":"5.1"},"6.9.3":{"node_abi":48,"v8":"5.1"},"6.9.4":{"node_abi":48,"v8":"5.1"},"6.9.5":{"node_abi":48,"v8":"5.1"},"6.10.0":{"node_abi":48,"v8":"5.1"},"6.10.1":{"node_abi":48,"v8":"5.1"},"6.10.2":{"node_abi":48,"v8":"5.1"},"6.10.3":{"node_abi":48,"v8":"5.1"},"6.11.0":{"node_abi":48,"v8":"5.1"},"6.11.1":{"node_abi":48,"v8":"5.1"},"6.11.2":{"node_abi":48,"v8":"5.1"},"6.11.3":{"node_abi":48,"v8":"5.1"},"6.11.4":{"node_abi":48,"v8":"5.1"},"6.11.5":{"node_abi":48,"v8":"5.1"},"6.12.0":{"node_abi":48,"v8":"5.1"},"6.12.1":{"node_abi":48,"v8":"5.1"},"6.12.2":{"node_abi":48,"v8":"5.1"},"6.12.3":{"node_abi":48,"v8":"5.1"},"6.13.0":{"node_abi":48,"v8":"5.1"},"6.13.1":{"node_abi":48,"v8":"5.1"},"6.14.0":{"node_abi":48,"v8":"5.1"},"6.14.1":{"node_abi":48,"v8":"5.1"},"6.14.2":{"node_abi":48,"v8":"5.1"},"6.14.3":{"node_abi":48,"v8":"5.1"},"6.14.4":{"node_abi":48,"v8":"5.1"},"6.15.0":{"node_abi":48,"v8":"5.1"},"6.15.1":{"node_abi":48,"v8":"5.1"},"6.16.0":{"node_abi":48,"v8":"5.1"},"6.17.0":{"node_abi":48,"v8":"5.1"},"6.17.1":{"node_abi":48,"v8":"5.1"},"7.0.0":{"node_abi":51,"v8":"5.4"},"7.1.0":{"node_abi":51,"v8":"5.4"},"7.2.0":{"node_abi":51,"v8":"5.4"},"7.2.1":{"node_abi":51,"v8":"5.4"},"7.3.0":{"node_abi":51,"v8":"5.4"},"7.4.0":{"node_abi":51,"v8":"5.4"},"7.5.0":{"node_abi":51,"v8":"5.4"},"7.6.0":{"node_abi":51,"v8":"5.5"},"7.7.0":{"node_abi":51,"v8":"5.5"},"7.7.1":{"node_abi":51,"v8":"5.5"},"7.7.2":{"node_abi":51,"v8":"5.5"},"7.7.3":{"node_abi":51,"v8":"5.5"},"7.7.4":{"node_abi":51,"v8":"5.5"},"7.8.0":{"node_abi":51,"v8":"5.5"},"7.9.0":{"node_abi":51,"v8":"5.5"},"7.10.0":{"node_abi":51,"v8":"5.5"},"7.10.1":{"node_abi":51,"v8":"5.5"},"8.0.0":{"node_abi":57,"v8":"5.8"},"8.1.0":{"node_abi":57,"v8":"5.8"},"8.1.1":{"node_abi":57,"v8":"5.8"},"8.1.2":{"node_abi":57,"v8":"5.8"},"8.1.3":{"node_abi":57,"v8":"5.8"},"8.1.4":{"node_abi":57,"v8":"5.8"},"8.2.0":{"node_abi":57,"v8":"5.8"},"8.2.1":{"node_abi":57,"v8":"5.8"},"8.3.0":{"node_abi":57,"v8":"6.0"},"8.4.0":{"node_abi":57,"v8":"6.0"},"8.5.0":{"node_abi":57,"v8":"6.0"},"8.6.0":{"node_abi":57,"v8":"6.0"},"8.7.0":{"node_abi":57,"v8":"6.1"},"8.8.0":{"node_abi":57,"v8":"6.1"},"8.8.1":{"node_abi":57,"v8":"6.1"},"8.9.0":{"node_abi":57,"v8":"6.1"},"8.9.1":{"node_abi":57,"v8":"6.1"},"8.9.2":{"node_abi":57,"v8":"6.1"},"8.9.3":{"node_abi":57,"v8":"6.1"},"8.9.4":{"node_abi":57,"v8":"6.1"},"8.10.0":{"node_abi":57,"v8":"6.2"},"8.11.0":{"node_abi":57,"v8":"6.2"},"8.11.1":{"node_abi":57,"v8":"6.2"},"8.11.2":{"node_abi":57,"v8":"6.2"},"8.11.3":{"node_abi":57,"v8":"6.2"},"8.11.4":{"node_abi":57,"v8":"6.2"},"8.12.0":{"node_abi":57,"v8":"6.2"},"8.13.0":{"node_abi":57,"v8":"6.2"},"8.14.0":{"node_abi":57,"v8":"6.2"},"8.14.1":{"node_abi":57,"v8":"6.2"},"8.15.0":{"node_abi":57,"v8":"6.2"},"8.15.1":{"node_abi":57,"v8":"6.2"},"8.16.0":{"node_abi":57,"v8":"6.2"},"8.16.1":{"node_abi":57,"v8":"6.2"},"8.16.2":{"node_abi":57,"v8":"6.2"},"8.17.0":{"node_abi":57,"v8":"6.2"},"9.0.0":{"node_abi":59,"v8":"6.2"},"9.1.0":{"node_abi":59,"v8":"6.2"},"9.2.0":{"node_abi":59,"v8":"6.2"},"9.2.1":{"node_abi":59,"v8":"6.2"},"9.3.0":{"node_abi":59,"v8":"6.2"},"9.4.0":{"node_abi":59,"v8":"6.2"},"9.5.0":{"node_abi":59,"v8":"6.2"},"9.6.0":{"node_abi":59,"v8":"6.2"},"9.6.1":{"node_abi":59,"v8":"6.2"},"9.7.0":{"node_abi":59,"v8":"6.2"},"9.7.1":{"node_abi":59,"v8":"6.2"},"9.8.0":{"node_abi":59,"v8":"6.2"},"9.9.0":{"node_abi":59,"v8":"6.2"},"9.10.0":{"node_abi":59,"v8":"6.2"},"9.10.1":{"node_abi":59,"v8":"6.2"},"9.11.0":{"node_abi":59,"v8":"6.2"},"9.11.1":{"node_abi":59,"v8":"6.2"},"9.11.2":{"node_abi":59,"v8":"6.2"},"10.0.0":{"node_abi":64,"v8":"6.6"},"10.1.0":{"node_abi":64,"v8":"6.6"},"10.2.0":{"node_abi":64,"v8":"6.6"},"10.2.1":{"node_abi":64,"v8":"6.6"},"10.3.0":{"node_abi":64,"v8":"6.6"},"10.4.0":{"node_abi":64,"v8":"6.7"},"10.4.1":{"node_abi":64,"v8":"6.7"},"10.5.0":{"node_abi":64,"v8":"6.7"},"10.6.0":{"node_abi":64,"v8":"6.7"},"10.7.0":{"node_abi":64,"v8":"6.7"},"10.8.0":{"node_abi":64,"v8":"6.7"},"10.9.0":{"node_abi":64,"v8":"6.8"},"10.10.0":{"node_abi":64,"v8":"6.8"},"10.11.0":{"node_abi":64,"v8":"6.8"},"10.12.0":{"node_abi":64,"v8":"6.8"},"10.13.0":{"node_abi":64,"v8":"6.8"},"10.14.0":{"node_abi":64,"v8":"6.8"},"10.14.1":{"node_abi":64,"v8":"6.8"},"10.14.2":{"node_abi":64,"v8":"6.8"},"10.15.0":{"node_abi":64,"v8":"6.8"},"10.15.1":{"node_abi":64,"v8":"6.8"},"10.15.2":{"node_abi":64,"v8":"6.8"},"10.15.3":{"node_abi":64,"v8":"6.8"},"10.16.0":{"node_abi":64,"v8":"6.8"},"10.16.1":{"node_abi":64,"v8":"6.8"},"10.16.2":{"node_abi":64,"v8":"6.8"},"10.16.3":{"node_abi":64,"v8":"6.8"},"10.17.0":{"node_abi":64,"v8":"6.8"},"10.18.0":{"node_abi":64,"v8":"6.8"},"10.18.1":{"node_abi":64,"v8":"6.8"},"10.19.0":{"node_abi":64,"v8":"6.8"},"10.20.0":{"node_abi":64,"v8":"6.8"},"10.20.1":{"node_abi":64,"v8":"6.8"},"10.21.0":{"node_abi":64,"v8":"6.8"},"10.22.0":{"node_abi":64,"v8":"6.8"},"10.22.1":{"node_abi":64,"v8":"6.8"},"10.23.0":{"node_abi":64,"v8":"6.8"},"10.23.1":{"node_abi":64,"v8":"6.8"},"10.23.2":{"node_abi":64,"v8":"6.8"},"10.23.3":{"node_abi":64,"v8":"6.8"},"10.24.0":{"node_abi":64,"v8":"6.8"},"10.24.1":{"node_abi":64,"v8":"6.8"},"11.0.0":{"node_abi":67,"v8":"7.0"},"11.1.0":{"node_abi":67,"v8":"7.0"},"11.2.0":{"node_abi":67,"v8":"7.0"},"11.3.0":{"node_abi":67,"v8":"7.0"},"11.4.0":{"node_abi":67,"v8":"7.0"},"11.5.0":{"node_abi":67,"v8":"7.0"},"11.6.0":{"node_abi":67,"v8":"7.0"},"11.7.0":{"node_abi":67,"v8":"7.0"},"11.8.0":{"node_abi":67,"v8":"7.0"},"11.9.0":{"node_abi":67,"v8":"7.0"},"11.10.0":{"node_abi":67,"v8":"7.0"},"11.10.1":{"node_abi":67,"v8":"7.0"},"11.11.0":{"node_abi":67,"v8":"7.0"},"11.12.0":{"node_abi":67,"v8":"7.0"},"11.13.0":{"node_abi":67,"v8":"7.0"},"11.14.0":{"node_abi":67,"v8":"7.0"},"11.15.0":{"node_abi":67,"v8":"7.0"},"12.0.0":{"node_abi":72,"v8":"7.4"},"12.1.0":{"node_abi":72,"v8":"7.4"},"12.2.0":{"node_abi":72,"v8":"7.4"},"12.3.0":{"node_abi":72,"v8":"7.4"},"12.3.1":{"node_abi":72,"v8":"7.4"},"12.4.0":{"node_abi":72,"v8":"7.4"},"12.5.0":{"node_abi":72,"v8":"7.5"},"12.6.0":{"node_abi":72,"v8":"7.5"},"12.7.0":{"node_abi":72,"v8":"7.5"},"12.8.0":{"node_abi":72,"v8":"7.5"},"12.8.1":{"node_abi":72,"v8":"7.5"},"12.9.0":{"node_abi":72,"v8":"7.6"},"12.9.1":{"node_abi":72,"v8":"7.6"},"12.10.0":{"node_abi":72,"v8":"7.6"},"12.11.0":{"node_abi":72,"v8":"7.7"},"12.11.1":{"node_abi":72,"v8":"7.7"},"12.12.0":{"node_abi":72,"v8":"7.7"},"12.13.0":{"node_abi":72,"v8":"7.7"},"12.13.1":{"node_abi":72,"v8":"7.7"},"12.14.0":{"node_abi":72,"v8":"7.7"},"12.14.1":{"node_abi":72,"v8":"7.7"},"12.15.0":{"node_abi":72,"v8":"7.7"},"12.16.0":{"node_abi":72,"v8":"7.8"},"12.16.1":{"node_abi":72,"v8":"7.8"},"12.16.2":{"node_abi":72,"v8":"7.8"},"12.16.3":{"node_abi":72,"v8":"7.8"},"12.17.0":{"node_abi":72,"v8":"7.8"},"12.18.0":{"node_abi":72,"v8":"7.8"},"12.18.1":{"node_abi":72,"v8":"7.8"},"12.18.2":{"node_abi":72,"v8":"7.8"},"12.18.3":{"node_abi":72,"v8":"7.8"},"12.18.4":{"node_abi":72,"v8":"7.8"},"12.19.0":{"node_abi":72,"v8":"7.8"},"12.19.1":{"node_abi":72,"v8":"7.8"},"12.20.0":{"node_abi":72,"v8":"7.8"},"12.20.1":{"node_abi":72,"v8":"7.8"},"12.20.2":{"node_abi":72,"v8":"7.8"},"12.21.0":{"node_abi":72,"v8":"7.8"},"12.22.0":{"node_abi":72,"v8":"7.8"},"12.22.1":{"node_abi":72,"v8":"7.8"},"12.22.2":{"node_abi":72,"v8":"7.8"},"12.22.3":{"node_abi":72,"v8":"7.8"},"12.22.4":{"node_abi":72,"v8":"7.8"},"12.22.5":{"node_abi":72,"v8":"7.8"},"12.22.6":{"node_abi":72,"v8":"7.8"},"12.22.7":{"node_abi":72,"v8":"7.8"},"13.0.0":{"node_abi":79,"v8":"7.8"},"13.0.1":{"node_abi":79,"v8":"7.8"},"13.1.0":{"node_abi":79,"v8":"7.8"},"13.2.0":{"node_abi":79,"v8":"7.9"},"13.3.0":{"node_abi":79,"v8":"7.9"},"13.4.0":{"node_abi":79,"v8":"7.9"},"13.5.0":{"node_abi":79,"v8":"7.9"},"13.6.0":{"node_abi":79,"v8":"7.9"},"13.7.0":{"node_abi":79,"v8":"7.9"},"13.8.0":{"node_abi":79,"v8":"7.9"},"13.9.0":{"node_abi":79,"v8":"7.9"},"13.10.0":{"node_abi":79,"v8":"7.9"},"13.10.1":{"node_abi":79,"v8":"7.9"},"13.11.0":{"node_abi":79,"v8":"7.9"},"13.12.0":{"node_abi":79,"v8":"7.9"},"13.13.0":{"node_abi":79,"v8":"7.9"},"13.14.0":{"node_abi":79,"v8":"7.9"},"14.0.0":{"node_abi":83,"v8":"8.1"},"14.1.0":{"node_abi":83,"v8":"8.1"},"14.2.0":{"node_abi":83,"v8":"8.1"},"14.3.0":{"node_abi":83,"v8":"8.1"},"14.4.0":{"node_abi":83,"v8":"8.1"},"14.5.0":{"node_abi":83,"v8":"8.3"},"14.6.0":{"node_abi":83,"v8":"8.4"},"14.7.0":{"node_abi":83,"v8":"8.4"},"14.8.0":{"node_abi":83,"v8":"8.4"},"14.9.0":{"node_abi":83,"v8":"8.4"},"14.10.0":{"node_abi":83,"v8":"8.4"},"14.10.1":{"node_abi":83,"v8":"8.4"},"14.11.0":{"node_abi":83,"v8":"8.4"},"14.12.0":{"node_abi":83,"v8":"8.4"},"14.13.0":{"node_abi":83,"v8":"8.4"},"14.13.1":{"node_abi":83,"v8":"8.4"},"14.14.0":{"node_abi":83,"v8":"8.4"},"14.15.0":{"node_abi":83,"v8":"8.4"},"14.15.1":{"node_abi":83,"v8":"8.4"},"14.15.2":{"node_abi":83,"v8":"8.4"},"14.15.3":{"node_abi":83,"v8":"8.4"},"14.15.4":{"node_abi":83,"v8":"8.4"},"14.15.5":{"node_abi":83,"v8":"8.4"},"14.16.0":{"node_abi":83,"v8":"8.4"},"14.16.1":{"node_abi":83,"v8":"8.4"},"14.17.0":{"node_abi":83,"v8":"8.4"},"14.17.1":{"node_abi":83,"v8":"8.4"},"14.17.2":{"node_abi":83,"v8":"8.4"},"14.17.3":{"node_abi":83,"v8":"8.4"},"14.17.4":{"node_abi":83,"v8":"8.4"},"14.17.5":{"node_abi":83,"v8":"8.4"},"14.17.6":{"node_abi":83,"v8":"8.4"},"14.18.0":{"node_abi":83,"v8":"8.4"},"14.18.1":{"node_abi":83,"v8":"8.4"},"15.0.0":{"node_abi":88,"v8":"8.6"},"15.0.1":{"node_abi":88,"v8":"8.6"},"15.1.0":{"node_abi":88,"v8":"8.6"},"15.2.0":{"node_abi":88,"v8":"8.6"},"15.2.1":{"node_abi":88,"v8":"8.6"},"15.3.0":{"node_abi":88,"v8":"8.6"},"15.4.0":{"node_abi":88,"v8":"8.6"},"15.5.0":{"node_abi":88,"v8":"8.6"},"15.5.1":{"node_abi":88,"v8":"8.6"},"15.6.0":{"node_abi":88,"v8":"8.6"},"15.7.0":{"node_abi":88,"v8":"8.6"},"15.8.0":{"node_abi":88,"v8":"8.6"},"15.9.0":{"node_abi":88,"v8":"8.6"},"15.10.0":{"node_abi":88,"v8":"8.6"},"15.11.0":{"node_abi":88,"v8":"8.6"},"15.12.0":{"node_abi":88,"v8":"8.6"},"15.13.0":{"node_abi":88,"v8":"8.6"},"15.14.0":{"node_abi":88,"v8":"8.6"},"16.0.0":{"node_abi":93,"v8":"9.0"},"16.1.0":{"node_abi":93,"v8":"9.0"},"16.2.0":{"node_abi":93,"v8":"9.0"},"16.3.0":{"node_abi":93,"v8":"9.0"},"16.4.0":{"node_abi":93,"v8":"9.1"},"16.4.1":{"node_abi":93,"v8":"9.1"},"16.4.2":{"node_abi":93,"v8":"9.1"},"16.5.0":{"node_abi":93,"v8":"9.1"},"16.6.0":{"node_abi":93,"v8":"9.2"},"16.6.1":{"node_abi":93,"v8":"9.2"},"16.6.2":{"node_abi":93,"v8":"9.2"},"16.7.0":{"node_abi":93,"v8":"9.2"},"16.8.0":{"node_abi":93,"v8":"9.2"},"16.9.0":{"node_abi":93,"v8":"9.3"},"16.9.1":{"node_abi":93,"v8":"9.3"},"16.10.0":{"node_abi":93,"v8":"9.3"},"16.11.0":{"node_abi":93,"v8":"9.4"},"16.11.1":{"node_abi":93,"v8":"9.4"},"16.12.0":{"node_abi":93,"v8":"9.4"},"16.13.0":{"node_abi":93,"v8":"9.4"},"17.0.0":{"node_abi":102,"v8":"9.5"},"17.0.1":{"node_abi":102,"v8":"9.5"},"17.1.0":{"node_abi":102,"v8":"9.5"}}'
      )
    },
    2181: (e) => {
      e.exports = JSON.parse(
        '{"name":"@mapbox/node-pre-gyp","description":"Node.js native addon binary install tool","version":"1.0.10","keywords":["native","addon","module","c","c++","bindings","binary"],"license":"BSD-3-Clause","author":"Dane Springmeyer <dane@mapbox.com>","repository":{"type":"git","url":"git://github.com/mapbox/node-pre-gyp.git"},"bin":"./bin/node-pre-gyp","main":"./lib/node-pre-gyp.js","dependencies":{"detect-libc":"^2.0.0","https-proxy-agent":"^5.0.0","make-dir":"^3.1.0","node-fetch":"^2.6.7","nopt":"^5.0.0","npmlog":"^5.0.1","rimraf":"^3.0.2","semver":"^7.3.5","tar":"^6.1.11"},"devDependencies":{"@mapbox/cloudfriend":"^5.1.0","@mapbox/eslint-config-mapbox":"^3.0.0","aws-sdk":"^2.1087.0","codecov":"^3.8.3","eslint":"^7.32.0","eslint-plugin-node":"^11.1.0","mock-aws-s3":"^4.0.2","nock":"^12.0.3","node-addon-api":"^4.3.0","nyc":"^15.1.0","tape":"^5.5.2","tar-fs":"^2.1.1"},"nyc":{"all":true,"skip-full":false,"exclude":["test/**"]},"scripts":{"coverage":"nyc --all --include index.js --include lib/ npm test","upload-coverage":"nyc report --reporter json && codecov --clear --flags=unit --file=./coverage/coverage-final.json","lint":"eslint bin/node-pre-gyp lib/*js lib/util/*js test/*js scripts/*js","fix":"npm run lint -- --fix","update-crosswalk":"node scripts/abi_crosswalk.js","test":"tape test/*test.js"}}'
      )
    },
  }
  var __webpack_module_cache__ = {}
  function __nccwpck_require__(e) {
    var t = __webpack_module_cache__[e]
    if (t !== undefined) {
      return t.exports
    }
    var r = (__webpack_module_cache__[e] = { exports: {} })
    var s = true
    try {
      __webpack_modules__[e].call(r.exports, r, r.exports, __nccwpck_require__)
      s = false
    } finally {
      if (s) delete __webpack_module_cache__[e]
    }
    return r.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var __webpack_exports__ = __nccwpck_require__(1735)
  module.exports = __webpack_exports__
})()
