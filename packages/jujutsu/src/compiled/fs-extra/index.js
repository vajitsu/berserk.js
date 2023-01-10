;(() => {
  var e = {
    538: (e, t, r) => {
      'use strict'
      const n = r(165)
      const i = r(17)
      const o = r(856).mkdirsSync
      const c = r(897).utimesMillisSync
      const s = r(239)
      function copySync(e, t, r) {
        if (typeof r === 'function') {
          r = { filter: r }
        }
        r = r || {}
        r.clobber = 'clobber' in r ? !!r.clobber : true
        r.overwrite = 'overwrite' in r ? !!r.overwrite : r.clobber
        if (r.preserveTimestamps && process.arch === 'ia32') {
          process.emitWarning(
            'Using the preserveTimestamps option in 32-bit node is not recommended;\n\n' +
              '\tsee https://github.com/jprichardson/node-fs-extra/issues/269',
            'Warning',
            'fs-extra-WARN0002'
          )
        }
        const { srcStat: n, destStat: i } = s.checkPathsSync(e, t, 'copy', r)
        s.checkParentPathsSync(e, n, t, 'copy')
        return handleFilterAndCopy(i, e, t, r)
      }
      function handleFilterAndCopy(e, t, r, c) {
        if (c.filter && !c.filter(t, r)) return
        const s = i.dirname(r)
        if (!n.existsSync(s)) o(s)
        return getStats(e, t, r, c)
      }
      function startCopy(e, t, r, n) {
        if (n.filter && !n.filter(t, r)) return
        return getStats(e, t, r, n)
      }
      function getStats(e, t, r, i) {
        const o = i.dereference ? n.statSync : n.lstatSync
        const c = o(t)
        if (c.isDirectory()) return onDir(c, e, t, r, i)
        else if (c.isFile() || c.isCharacterDevice() || c.isBlockDevice())
          return onFile(c, e, t, r, i)
        else if (c.isSymbolicLink()) return onLink(e, t, r, i)
        else if (c.isSocket())
          throw new Error(`Cannot copy a socket file: ${t}`)
        else if (c.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${t}`)
        throw new Error(`Unknown file: ${t}`)
      }
      function onFile(e, t, r, n, i) {
        if (!t) return copyFile(e, r, n, i)
        return mayCopyFile(e, r, n, i)
      }
      function mayCopyFile(e, t, r, i) {
        if (i.overwrite) {
          n.unlinkSync(r)
          return copyFile(e, t, r, i)
        } else if (i.errorOnExist) {
          throw new Error(`'${r}' already exists`)
        }
      }
      function copyFile(e, t, r, i) {
        n.copyFileSync(t, r)
        if (i.preserveTimestamps) handleTimestamps(e.mode, t, r)
        return setDestMode(r, e.mode)
      }
      function handleTimestamps(e, t, r) {
        if (fileIsNotWritable(e)) makeFileWritable(r, e)
        return setDestTimestamps(t, r)
      }
      function fileIsNotWritable(e) {
        return (e & 128) === 0
      }
      function makeFileWritable(e, t) {
        return setDestMode(e, t | 128)
      }
      function setDestMode(e, t) {
        return n.chmodSync(e, t)
      }
      function setDestTimestamps(e, t) {
        const r = n.statSync(e)
        return c(t, r.atime, r.mtime)
      }
      function onDir(e, t, r, n, i) {
        if (!t) return mkDirAndCopy(e.mode, r, n, i)
        return copyDir(r, n, i)
      }
      function mkDirAndCopy(e, t, r, i) {
        n.mkdirSync(r)
        copyDir(t, r, i)
        return setDestMode(r, e)
      }
      function copyDir(e, t, r) {
        n.readdirSync(e).forEach((n) => copyDirItem(n, e, t, r))
      }
      function copyDirItem(e, t, r, n) {
        const o = i.join(t, e)
        const c = i.join(r, e)
        const { destStat: a } = s.checkPathsSync(o, c, 'copy', n)
        return startCopy(a, o, c, n)
      }
      function onLink(e, t, r, o) {
        let c = n.readlinkSync(t)
        if (o.dereference) {
          c = i.resolve(process.cwd(), c)
        }
        if (!e) {
          return n.symlinkSync(c, r)
        } else {
          let e
          try {
            e = n.readlinkSync(r)
          } catch (e) {
            if (e.code === 'EINVAL' || e.code === 'UNKNOWN')
              return n.symlinkSync(c, r)
            throw e
          }
          if (o.dereference) {
            e = i.resolve(process.cwd(), e)
          }
          if (s.isSrcSubdir(c, e)) {
            throw new Error(
              `Cannot copy '${c}' to a subdirectory of itself, '${e}'.`
            )
          }
          if (n.statSync(r).isDirectory() && s.isSrcSubdir(e, c)) {
            throw new Error(`Cannot overwrite '${e}' with '${c}'.`)
          }
          return copyLink(c, r)
        }
      }
      function copyLink(e, t) {
        n.unlinkSync(t)
        return n.symlinkSync(e, t)
      }
      e.exports = copySync
    },
    521: (e, t, r) => {
      'use strict'
      const n = r(165)
      const i = r(17)
      const o = r(856).mkdirs
      const c = r(714).pathExists
      const s = r(897).utimesMillis
      const a = r(239)
      function copy(e, t, r, n) {
        if (typeof r === 'function' && !n) {
          n = r
          r = {}
        } else if (typeof r === 'function') {
          r = { filter: r }
        }
        n = n || function () {}
        r = r || {}
        r.clobber = 'clobber' in r ? !!r.clobber : true
        r.overwrite = 'overwrite' in r ? !!r.overwrite : r.clobber
        if (r.preserveTimestamps && process.arch === 'ia32') {
          process.emitWarning(
            'Using the preserveTimestamps option in 32-bit node is not recommended;\n\n' +
              '\tsee https://github.com/jprichardson/node-fs-extra/issues/269',
            'Warning',
            'fs-extra-WARN0001'
          )
        }
        a.checkPaths(e, t, 'copy', r, (i, o) => {
          if (i) return n(i)
          const { srcStat: c, destStat: s } = o
          a.checkParentPaths(e, c, t, 'copy', (i) => {
            if (i) return n(i)
            if (r.filter) return handleFilter(checkParentDir, s, e, t, r, n)
            return checkParentDir(s, e, t, r, n)
          })
        })
      }
      function checkParentDir(e, t, r, n, s) {
        const a = i.dirname(r)
        c(a, (i, c) => {
          if (i) return s(i)
          if (c) return getStats(e, t, r, n, s)
          o(a, (i) => {
            if (i) return s(i)
            return getStats(e, t, r, n, s)
          })
        })
      }
      function handleFilter(e, t, r, n, i, o) {
        Promise.resolve(i.filter(r, n)).then(
          (c) => {
            if (c) return e(t, r, n, i, o)
            return o()
          },
          (e) => o(e)
        )
      }
      function startCopy(e, t, r, n, i) {
        if (n.filter) return handleFilter(getStats, e, t, r, n, i)
        return getStats(e, t, r, n, i)
      }
      function getStats(e, t, r, i, o) {
        const c = i.dereference ? n.stat : n.lstat
        c(t, (n, c) => {
          if (n) return o(n)
          if (c.isDirectory()) return onDir(c, e, t, r, i, o)
          else if (c.isFile() || c.isCharacterDevice() || c.isBlockDevice())
            return onFile(c, e, t, r, i, o)
          else if (c.isSymbolicLink()) return onLink(e, t, r, i, o)
          else if (c.isSocket())
            return o(new Error(`Cannot copy a socket file: ${t}`))
          else if (c.isFIFO())
            return o(new Error(`Cannot copy a FIFO pipe: ${t}`))
          return o(new Error(`Unknown file: ${t}`))
        })
      }
      function onFile(e, t, r, n, i, o) {
        if (!t) return copyFile(e, r, n, i, o)
        return mayCopyFile(e, r, n, i, o)
      }
      function mayCopyFile(e, t, r, i, o) {
        if (i.overwrite) {
          n.unlink(r, (n) => {
            if (n) return o(n)
            return copyFile(e, t, r, i, o)
          })
        } else if (i.errorOnExist) {
          return o(new Error(`'${r}' already exists`))
        } else return o()
      }
      function copyFile(e, t, r, i, o) {
        n.copyFile(t, r, (n) => {
          if (n) return o(n)
          if (i.preserveTimestamps)
            return handleTimestampsAndMode(e.mode, t, r, o)
          return setDestMode(r, e.mode, o)
        })
      }
      function handleTimestampsAndMode(e, t, r, n) {
        if (fileIsNotWritable(e)) {
          return makeFileWritable(r, e, (i) => {
            if (i) return n(i)
            return setDestTimestampsAndMode(e, t, r, n)
          })
        }
        return setDestTimestampsAndMode(e, t, r, n)
      }
      function fileIsNotWritable(e) {
        return (e & 128) === 0
      }
      function makeFileWritable(e, t, r) {
        return setDestMode(e, t | 128, r)
      }
      function setDestTimestampsAndMode(e, t, r, n) {
        setDestTimestamps(t, r, (t) => {
          if (t) return n(t)
          return setDestMode(r, e, n)
        })
      }
      function setDestMode(e, t, r) {
        return n.chmod(e, t, r)
      }
      function setDestTimestamps(e, t, r) {
        n.stat(e, (e, n) => {
          if (e) return r(e)
          return s(t, n.atime, n.mtime, r)
        })
      }
      function onDir(e, t, r, n, i, o) {
        if (!t) return mkDirAndCopy(e.mode, r, n, i, o)
        return copyDir(r, n, i, o)
      }
      function mkDirAndCopy(e, t, r, i, o) {
        n.mkdir(r, (n) => {
          if (n) return o(n)
          copyDir(t, r, i, (t) => {
            if (t) return o(t)
            return setDestMode(r, e, o)
          })
        })
      }
      function copyDir(e, t, r, i) {
        n.readdir(e, (n, o) => {
          if (n) return i(n)
          return copyDirItems(o, e, t, r, i)
        })
      }
      function copyDirItems(e, t, r, n, i) {
        const o = e.pop()
        if (!o) return i()
        return copyDirItem(e, o, t, r, n, i)
      }
      function copyDirItem(e, t, r, n, o, c) {
        const s = i.join(r, t)
        const u = i.join(n, t)
        a.checkPaths(s, u, 'copy', o, (t, i) => {
          if (t) return c(t)
          const { destStat: a } = i
          startCopy(a, s, u, o, (t) => {
            if (t) return c(t)
            return copyDirItems(e, r, n, o, c)
          })
        })
      }
      function onLink(e, t, r, o, c) {
        n.readlink(t, (t, s) => {
          if (t) return c(t)
          if (o.dereference) {
            s = i.resolve(process.cwd(), s)
          }
          if (!e) {
            return n.symlink(s, r, c)
          } else {
            n.readlink(r, (t, u) => {
              if (t) {
                if (t.code === 'EINVAL' || t.code === 'UNKNOWN')
                  return n.symlink(s, r, c)
                return c(t)
              }
              if (o.dereference) {
                u = i.resolve(process.cwd(), u)
              }
              if (a.isSrcSubdir(s, u)) {
                return c(
                  new Error(
                    `Cannot copy '${s}' to a subdirectory of itself, '${u}'.`
                  )
                )
              }
              if (e.isDirectory() && a.isSrcSubdir(u, s)) {
                return c(new Error(`Cannot overwrite '${u}' with '${s}'.`))
              }
              return copyLink(s, r, c)
            })
          }
        })
      }
      function copyLink(e, t, r) {
        n.unlink(t, (i) => {
          if (i) return r(i)
          return n.symlink(e, t, r)
        })
      }
      e.exports = copy
    },
    586: (e, t, r) => {
      'use strict'
      const n = r(531).fromCallback
      e.exports = { copy: n(r(521)), copySync: r(538) }
    },
    344: (e, t, r) => {
      'use strict'
      const n = r(531).fromPromise
      const i = r(58)
      const o = r(17)
      const c = r(856)
      const s = r(973)
      const a = n(async function emptyDir(e) {
        let t
        try {
          t = await i.readdir(e)
        } catch {
          return c.mkdirs(e)
        }
        return Promise.all(t.map((t) => s.remove(o.join(e, t))))
      })
      function emptyDirSync(e) {
        let t
        try {
          t = i.readdirSync(e)
        } catch {
          return c.mkdirsSync(e)
        }
        t.forEach((t) => {
          t = o.join(e, t)
          s.removeSync(t)
        })
      }
      e.exports = {
        emptyDirSync: emptyDirSync,
        emptydirSync: emptyDirSync,
        emptyDir: a,
        emptydir: a,
      }
    },
    214: (e, t, r) => {
      'use strict'
      const n = r(531).fromCallback
      const i = r(17)
      const o = r(165)
      const c = r(856)
      function createFile(e, t) {
        function makeFile() {
          o.writeFile(e, '', (e) => {
            if (e) return t(e)
            t()
          })
        }
        o.stat(e, (r, n) => {
          if (!r && n.isFile()) return t()
          const s = i.dirname(e)
          o.stat(s, (e, r) => {
            if (e) {
              if (e.code === 'ENOENT') {
                return c.mkdirs(s, (e) => {
                  if (e) return t(e)
                  makeFile()
                })
              }
              return t(e)
            }
            if (r.isDirectory()) makeFile()
            else {
              o.readdir(s, (e) => {
                if (e) return t(e)
              })
            }
          })
        })
      }
      function createFileSync(e) {
        let t
        try {
          t = o.statSync(e)
        } catch {}
        if (t && t.isFile()) return
        const r = i.dirname(e)
        try {
          if (!o.statSync(r).isDirectory()) {
            o.readdirSync(r)
          }
        } catch (e) {
          if (e && e.code === 'ENOENT') c.mkdirsSync(r)
          else throw e
        }
        o.writeFileSync(e, '')
      }
      e.exports = { createFile: n(createFile), createFileSync: createFileSync }
    },
    322: (e, t, r) => {
      'use strict'
      const { createFile: n, createFileSync: i } = r(214)
      const { createLink: o, createLinkSync: c } = r(455)
      const { createSymlink: s, createSymlinkSync: a } = r(409)
      e.exports = {
        createFile: n,
        createFileSync: i,
        ensureFile: n,
        ensureFileSync: i,
        createLink: o,
        createLinkSync: c,
        ensureLink: o,
        ensureLinkSync: c,
        createSymlink: s,
        createSymlinkSync: a,
        ensureSymlink: s,
        ensureSymlinkSync: a,
      }
    },
    455: (e, t, r) => {
      'use strict'
      const n = r(531).fromCallback
      const i = r(17)
      const o = r(165)
      const c = r(856)
      const s = r(714).pathExists
      const { areIdentical: a } = r(239)
      function createLink(e, t, r) {
        function makeLink(e, t) {
          o.link(e, t, (e) => {
            if (e) return r(e)
            r(null)
          })
        }
        o.lstat(t, (n, u) => {
          o.lstat(e, (n, o) => {
            if (n) {
              n.message = n.message.replace('lstat', 'ensureLink')
              return r(n)
            }
            if (u && a(o, u)) return r(null)
            const f = i.dirname(t)
            s(f, (n, i) => {
              if (n) return r(n)
              if (i) return makeLink(e, t)
              c.mkdirs(f, (n) => {
                if (n) return r(n)
                makeLink(e, t)
              })
            })
          })
        })
      }
      function createLinkSync(e, t) {
        let r
        try {
          r = o.lstatSync(t)
        } catch {}
        try {
          const t = o.lstatSync(e)
          if (r && a(t, r)) return
        } catch (e) {
          e.message = e.message.replace('lstat', 'ensureLink')
          throw e
        }
        const n = i.dirname(t)
        const s = o.existsSync(n)
        if (s) return o.linkSync(e, t)
        c.mkdirsSync(n)
        return o.linkSync(e, t)
      }
      e.exports = { createLink: n(createLink), createLinkSync: createLinkSync }
    },
    610: (e, t, r) => {
      'use strict'
      const n = r(17)
      const i = r(165)
      const o = r(714).pathExists
      function symlinkPaths(e, t, r) {
        if (n.isAbsolute(e)) {
          return i.lstat(e, (t) => {
            if (t) {
              t.message = t.message.replace('lstat', 'ensureSymlink')
              return r(t)
            }
            return r(null, { toCwd: e, toDst: e })
          })
        } else {
          const c = n.dirname(t)
          const s = n.join(c, e)
          return o(s, (t, o) => {
            if (t) return r(t)
            if (o) {
              return r(null, { toCwd: s, toDst: e })
            } else {
              return i.lstat(e, (t) => {
                if (t) {
                  t.message = t.message.replace('lstat', 'ensureSymlink')
                  return r(t)
                }
                return r(null, { toCwd: e, toDst: n.relative(c, e) })
              })
            }
          })
        }
      }
      function symlinkPathsSync(e, t) {
        let r
        if (n.isAbsolute(e)) {
          r = i.existsSync(e)
          if (!r) throw new Error('absolute srcpath does not exist')
          return { toCwd: e, toDst: e }
        } else {
          const o = n.dirname(t)
          const c = n.join(o, e)
          r = i.existsSync(c)
          if (r) {
            return { toCwd: c, toDst: e }
          } else {
            r = i.existsSync(e)
            if (!r) throw new Error('relative srcpath does not exist')
            return { toCwd: e, toDst: n.relative(o, e) }
          }
        }
      }
      e.exports = {
        symlinkPaths: symlinkPaths,
        symlinkPathsSync: symlinkPathsSync,
      }
    },
    958: (e, t, r) => {
      'use strict'
      const n = r(165)
      function symlinkType(e, t, r) {
        r = typeof t === 'function' ? t : r
        t = typeof t === 'function' ? false : t
        if (t) return r(null, t)
        n.lstat(e, (e, n) => {
          if (e) return r(null, 'file')
          t = n && n.isDirectory() ? 'dir' : 'file'
          r(null, t)
        })
      }
      function symlinkTypeSync(e, t) {
        let r
        if (t) return t
        try {
          r = n.lstatSync(e)
        } catch {
          return 'file'
        }
        return r && r.isDirectory() ? 'dir' : 'file'
      }
      e.exports = { symlinkType: symlinkType, symlinkTypeSync: symlinkTypeSync }
    },
    409: (e, t, r) => {
      'use strict'
      const n = r(531).fromCallback
      const i = r(17)
      const o = r(58)
      const c = r(856)
      const s = c.mkdirs
      const a = c.mkdirsSync
      const u = r(610)
      const f = u.symlinkPaths
      const l = u.symlinkPathsSync
      const y = r(958)
      const d = y.symlinkType
      const m = y.symlinkTypeSync
      const p = r(714).pathExists
      const { areIdentical: h } = r(239)
      function createSymlink(e, t, r, n) {
        n = typeof r === 'function' ? r : n
        r = typeof r === 'function' ? false : r
        o.lstat(t, (i, c) => {
          if (!i && c.isSymbolicLink()) {
            Promise.all([o.stat(e), o.stat(t)]).then(([i, o]) => {
              if (h(i, o)) return n(null)
              _createSymlink(e, t, r, n)
            })
          } else _createSymlink(e, t, r, n)
        })
      }
      function _createSymlink(e, t, r, n) {
        f(e, t, (c, a) => {
          if (c) return n(c)
          e = a.toDst
          d(a.toCwd, r, (r, c) => {
            if (r) return n(r)
            const a = i.dirname(t)
            p(a, (r, i) => {
              if (r) return n(r)
              if (i) return o.symlink(e, t, c, n)
              s(a, (r) => {
                if (r) return n(r)
                o.symlink(e, t, c, n)
              })
            })
          })
        })
      }
      function createSymlinkSync(e, t, r) {
        let n
        try {
          n = o.lstatSync(t)
        } catch {}
        if (n && n.isSymbolicLink()) {
          const r = o.statSync(e)
          const n = o.statSync(t)
          if (h(r, n)) return
        }
        const c = l(e, t)
        e = c.toDst
        r = m(c.toCwd, r)
        const s = i.dirname(t)
        const u = o.existsSync(s)
        if (u) return o.symlinkSync(e, t, r)
        a(s)
        return o.symlinkSync(e, t, r)
      }
      e.exports = {
        createSymlink: n(createSymlink),
        createSymlinkSync: createSymlinkSync,
      }
    },
    58: (e, t, r) => {
      'use strict'
      const n = r(531).fromCallback
      const i = r(165)
      const o = [
        'access',
        'appendFile',
        'chmod',
        'chown',
        'close',
        'copyFile',
        'fchmod',
        'fchown',
        'fdatasync',
        'fstat',
        'fsync',
        'ftruncate',
        'futimes',
        'lchmod',
        'lchown',
        'link',
        'lstat',
        'mkdir',
        'mkdtemp',
        'open',
        'opendir',
        'readdir',
        'readFile',
        'readlink',
        'realpath',
        'rename',
        'rm',
        'rmdir',
        'stat',
        'symlink',
        'truncate',
        'unlink',
        'utimes',
        'writeFile',
      ].filter((e) => typeof i[e] === 'function')
      Object.assign(t, i)
      o.forEach((e) => {
        t[e] = n(i[e])
      })
      t.exists = function (e, t) {
        if (typeof t === 'function') {
          return i.exists(e, t)
        }
        return new Promise((t) => i.exists(e, t))
      }
      t.read = function (e, t, r, n, o, c) {
        if (typeof c === 'function') {
          return i.read(e, t, r, n, o, c)
        }
        return new Promise((c, s) => {
          i.read(e, t, r, n, o, (e, t, r) => {
            if (e) return s(e)
            c({ bytesRead: t, buffer: r })
          })
        })
      }
      t.write = function (e, t, ...r) {
        if (typeof r[r.length - 1] === 'function') {
          return i.write(e, t, ...r)
        }
        return new Promise((n, o) => {
          i.write(e, t, ...r, (e, t, r) => {
            if (e) return o(e)
            n({ bytesWritten: t, buffer: r })
          })
        })
      }
      if (typeof i.writev === 'function') {
        t.writev = function (e, t, ...r) {
          if (typeof r[r.length - 1] === 'function') {
            return i.writev(e, t, ...r)
          }
          return new Promise((n, o) => {
            i.writev(e, t, ...r, (e, t, r) => {
              if (e) return o(e)
              n({ bytesWritten: t, buffers: r })
            })
          })
        }
      }
      if (typeof i.realpath.native === 'function') {
        t.realpath.native = n(i.realpath.native)
      } else {
        process.emitWarning(
          'fs.realpath.native is not a function. Is fs being monkey-patched?',
          'Warning',
          'fs-extra-WARN0003'
        )
      }
    },
    493: (e, t, r) => {
      'use strict'
      e.exports = {
        ...r(58),
        ...r(586),
        ...r(344),
        ...r(322),
        ...r(963),
        ...r(856),
        ...r(175),
        ...r(657),
        ...r(714),
        ...r(973),
      }
    },
    963: (e, t, r) => {
      'use strict'
      const n = r(531).fromPromise
      const i = r(321)
      i.outputJson = n(r(400))
      i.outputJsonSync = r(661)
      i.outputJSON = i.outputJson
      i.outputJSONSync = i.outputJsonSync
      i.writeJSON = i.writeJson
      i.writeJSONSync = i.writeJsonSync
      i.readJSON = i.readJson
      i.readJSONSync = i.readJsonSync
      e.exports = i
    },
    321: (e, t, r) => {
      'use strict'
      const n = r(947)
      e.exports = {
        readJson: n.readFile,
        readJsonSync: n.readFileSync,
        writeJson: n.writeFile,
        writeJsonSync: n.writeFileSync,
      }
    },
    661: (e, t, r) => {
      'use strict'
      const { stringify: n } = r(456)
      const { outputFileSync: i } = r(657)
      function outputJsonSync(e, t, r) {
        const o = n(t, r)
        i(e, o, r)
      }
      e.exports = outputJsonSync
    },
    400: (e, t, r) => {
      'use strict'
      const { stringify: n } = r(456)
      const { outputFile: i } = r(657)
      async function outputJson(e, t, r = {}) {
        const o = n(t, r)
        await i(e, o, r)
      }
      e.exports = outputJson
    },
    856: (e, t, r) => {
      'use strict'
      const n = r(531).fromPromise
      const { makeDir: i, makeDirSync: o } = r(642)
      const c = n(i)
      e.exports = {
        mkdirs: c,
        mkdirsSync: o,
        mkdirp: c,
        mkdirpSync: o,
        ensureDir: c,
        ensureDirSync: o,
      }
    },
    642: (e, t, r) => {
      'use strict'
      const n = r(58)
      const { checkPath: i } = r(376)
      const getMode = (e) => {
        const t = { mode: 511 }
        if (typeof e === 'number') return e
        return { ...t, ...e }.mode
      }
      e.exports.makeDir = async (e, t) => {
        i(e)
        return n.mkdir(e, { mode: getMode(t), recursive: true })
      }
      e.exports.makeDirSync = (e, t) => {
        i(e)
        return n.mkdirSync(e, { mode: getMode(t), recursive: true })
      }
    },
    376: (e, t, r) => {
      'use strict'
      const n = r(17)
      e.exports.checkPath = function checkPath(e) {
        if (process.platform === 'win32') {
          const t = /[<>:"|?*]/.test(e.replace(n.parse(e).root, ''))
          if (t) {
            const t = new Error(`Path contains invalid characters: ${e}`)
            t.code = 'EINVAL'
            throw t
          }
        }
      }
    },
    175: (e, t, r) => {
      'use strict'
      const n = r(531).fromCallback
      e.exports = { move: n(r(90)), moveSync: r(979) }
    },
    979: (e, t, r) => {
      'use strict'
      const n = r(165)
      const i = r(17)
      const o = r(586).copySync
      const c = r(973).removeSync
      const s = r(856).mkdirpSync
      const a = r(239)
      function moveSync(e, t, r) {
        r = r || {}
        const n = r.overwrite || r.clobber || false
        const { srcStat: o, isChangingCase: c = false } = a.checkPathsSync(
          e,
          t,
          'move',
          r
        )
        a.checkParentPathsSync(e, o, t, 'move')
        if (!isParentRoot(t)) s(i.dirname(t))
        return doRename(e, t, n, c)
      }
      function isParentRoot(e) {
        const t = i.dirname(e)
        const r = i.parse(t)
        return r.root === t
      }
      function doRename(e, t, r, i) {
        if (i) return rename(e, t, r)
        if (r) {
          c(t)
          return rename(e, t, r)
        }
        if (n.existsSync(t)) throw new Error('dest already exists.')
        return rename(e, t, r)
      }
      function rename(e, t, r) {
        try {
          n.renameSync(e, t)
        } catch (n) {
          if (n.code !== 'EXDEV') throw n
          return moveAcrossDevice(e, t, r)
        }
      }
      function moveAcrossDevice(e, t, r) {
        const n = { overwrite: r, errorOnExist: true }
        o(e, t, n)
        return c(e)
      }
      e.exports = moveSync
    },
    90: (e, t, r) => {
      'use strict'
      const n = r(165)
      const i = r(17)
      const o = r(586).copy
      const c = r(973).remove
      const s = r(856).mkdirp
      const a = r(714).pathExists
      const u = r(239)
      function move(e, t, r, n) {
        if (typeof r === 'function') {
          n = r
          r = {}
        }
        r = r || {}
        const o = r.overwrite || r.clobber || false
        u.checkPaths(e, t, 'move', r, (r, c) => {
          if (r) return n(r)
          const { srcStat: a, isChangingCase: f = false } = c
          u.checkParentPaths(e, a, t, 'move', (r) => {
            if (r) return n(r)
            if (isParentRoot(t)) return doRename(e, t, o, f, n)
            s(i.dirname(t), (r) => {
              if (r) return n(r)
              return doRename(e, t, o, f, n)
            })
          })
        })
      }
      function isParentRoot(e) {
        const t = i.dirname(e)
        const r = i.parse(t)
        return r.root === t
      }
      function doRename(e, t, r, n, i) {
        if (n) return rename(e, t, r, i)
        if (r) {
          return c(t, (n) => {
            if (n) return i(n)
            return rename(e, t, r, i)
          })
        }
        a(t, (n, o) => {
          if (n) return i(n)
          if (o) return i(new Error('dest already exists.'))
          return rename(e, t, r, i)
        })
      }
      function rename(e, t, r, i) {
        n.rename(e, t, (n) => {
          if (!n) return i()
          if (n.code !== 'EXDEV') return i(n)
          return moveAcrossDevice(e, t, r, i)
        })
      }
      function moveAcrossDevice(e, t, r, n) {
        const i = { overwrite: r, errorOnExist: true }
        o(e, t, i, (t) => {
          if (t) return n(t)
          return c(e, n)
        })
      }
      e.exports = move
    },
    657: (e, t, r) => {
      'use strict'
      const n = r(531).fromCallback
      const i = r(165)
      const o = r(17)
      const c = r(856)
      const s = r(714).pathExists
      function outputFile(e, t, r, n) {
        if (typeof r === 'function') {
          n = r
          r = 'utf8'
        }
        const a = o.dirname(e)
        s(a, (o, s) => {
          if (o) return n(o)
          if (s) return i.writeFile(e, t, r, n)
          c.mkdirs(a, (o) => {
            if (o) return n(o)
            i.writeFile(e, t, r, n)
          })
        })
      }
      function outputFileSync(e, ...t) {
        const r = o.dirname(e)
        if (i.existsSync(r)) {
          return i.writeFileSync(e, ...t)
        }
        c.mkdirsSync(r)
        i.writeFileSync(e, ...t)
      }
      e.exports = { outputFile: n(outputFile), outputFileSync: outputFileSync }
    },
    714: (e, t, r) => {
      'use strict'
      const n = r(531).fromPromise
      const i = r(58)
      function pathExists(e) {
        return i
          .access(e)
          .then(() => true)
          .catch(() => false)
      }
      e.exports = { pathExists: n(pathExists), pathExistsSync: i.existsSync }
    },
    973: (e, t, r) => {
      'use strict'
      const n = r(165)
      const i = r(531).fromCallback
      const o = r(547)
      function remove(e, t) {
        if (n.rm) return n.rm(e, { recursive: true, force: true }, t)
        o(e, t)
      }
      function removeSync(e) {
        if (n.rmSync) return n.rmSync(e, { recursive: true, force: true })
        o.sync(e)
      }
      e.exports = { remove: i(remove), removeSync: removeSync }
    },
    547: (e, t, r) => {
      'use strict'
      const n = r(165)
      const i = r(17)
      const o = r(491)
      const c = process.platform === 'win32'
      function defaults(e) {
        const t = ['unlink', 'chmod', 'stat', 'lstat', 'rmdir', 'readdir']
        t.forEach((t) => {
          e[t] = e[t] || n[t]
          t = t + 'Sync'
          e[t] = e[t] || n[t]
        })
        e.maxBusyTries = e.maxBusyTries || 3
      }
      function rimraf(e, t, r) {
        let n = 0
        if (typeof t === 'function') {
          r = t
          t = {}
        }
        o(e, 'rimraf: missing path')
        o.strictEqual(typeof e, 'string', 'rimraf: path should be a string')
        o.strictEqual(
          typeof r,
          'function',
          'rimraf: callback function required'
        )
        o(t, 'rimraf: invalid options argument provided')
        o.strictEqual(typeof t, 'object', 'rimraf: options should be object')
        defaults(t)
        rimraf_(e, t, function CB(i) {
          if (i) {
            if (
              (i.code === 'EBUSY' ||
                i.code === 'ENOTEMPTY' ||
                i.code === 'EPERM') &&
              n < t.maxBusyTries
            ) {
              n++
              const r = n * 100
              return setTimeout(() => rimraf_(e, t, CB), r)
            }
            if (i.code === 'ENOENT') i = null
          }
          r(i)
        })
      }
      function rimraf_(e, t, r) {
        o(e)
        o(t)
        o(typeof r === 'function')
        t.lstat(e, (n, i) => {
          if (n && n.code === 'ENOENT') {
            return r(null)
          }
          if (n && n.code === 'EPERM' && c) {
            return fixWinEPERM(e, t, n, r)
          }
          if (i && i.isDirectory()) {
            return rmdir(e, t, n, r)
          }
          t.unlink(e, (n) => {
            if (n) {
              if (n.code === 'ENOENT') {
                return r(null)
              }
              if (n.code === 'EPERM') {
                return c ? fixWinEPERM(e, t, n, r) : rmdir(e, t, n, r)
              }
              if (n.code === 'EISDIR') {
                return rmdir(e, t, n, r)
              }
            }
            return r(n)
          })
        })
      }
      function fixWinEPERM(e, t, r, n) {
        o(e)
        o(t)
        o(typeof n === 'function')
        t.chmod(e, 438, (i) => {
          if (i) {
            n(i.code === 'ENOENT' ? null : r)
          } else {
            t.stat(e, (i, o) => {
              if (i) {
                n(i.code === 'ENOENT' ? null : r)
              } else if (o.isDirectory()) {
                rmdir(e, t, r, n)
              } else {
                t.unlink(e, n)
              }
            })
          }
        })
      }
      function fixWinEPERMSync(e, t, r) {
        let n
        o(e)
        o(t)
        try {
          t.chmodSync(e, 438)
        } catch (e) {
          if (e.code === 'ENOENT') {
            return
          } else {
            throw r
          }
        }
        try {
          n = t.statSync(e)
        } catch (e) {
          if (e.code === 'ENOENT') {
            return
          } else {
            throw r
          }
        }
        if (n.isDirectory()) {
          rmdirSync(e, t, r)
        } else {
          t.unlinkSync(e)
        }
      }
      function rmdir(e, t, r, n) {
        o(e)
        o(t)
        o(typeof n === 'function')
        t.rmdir(e, (i) => {
          if (
            i &&
            (i.code === 'ENOTEMPTY' ||
              i.code === 'EEXIST' ||
              i.code === 'EPERM')
          ) {
            rmkids(e, t, n)
          } else if (i && i.code === 'ENOTDIR') {
            n(r)
          } else {
            n(i)
          }
        })
      }
      function rmkids(e, t, r) {
        o(e)
        o(t)
        o(typeof r === 'function')
        t.readdir(e, (n, o) => {
          if (n) return r(n)
          let c = o.length
          let s
          if (c === 0) return t.rmdir(e, r)
          o.forEach((n) => {
            rimraf(i.join(e, n), t, (n) => {
              if (s) {
                return
              }
              if (n) return r((s = n))
              if (--c === 0) {
                t.rmdir(e, r)
              }
            })
          })
        })
      }
      function rimrafSync(e, t) {
        let r
        t = t || {}
        defaults(t)
        o(e, 'rimraf: missing path')
        o.strictEqual(typeof e, 'string', 'rimraf: path should be a string')
        o(t, 'rimraf: missing options')
        o.strictEqual(typeof t, 'object', 'rimraf: options should be object')
        try {
          r = t.lstatSync(e)
        } catch (r) {
          if (r.code === 'ENOENT') {
            return
          }
          if (r.code === 'EPERM' && c) {
            fixWinEPERMSync(e, t, r)
          }
        }
        try {
          if (r && r.isDirectory()) {
            rmdirSync(e, t, null)
          } else {
            t.unlinkSync(e)
          }
        } catch (r) {
          if (r.code === 'ENOENT') {
            return
          } else if (r.code === 'EPERM') {
            return c ? fixWinEPERMSync(e, t, r) : rmdirSync(e, t, r)
          } else if (r.code !== 'EISDIR') {
            throw r
          }
          rmdirSync(e, t, r)
        }
      }
      function rmdirSync(e, t, r) {
        o(e)
        o(t)
        try {
          t.rmdirSync(e)
        } catch (n) {
          if (n.code === 'ENOTDIR') {
            throw r
          } else if (
            n.code === 'ENOTEMPTY' ||
            n.code === 'EEXIST' ||
            n.code === 'EPERM'
          ) {
            rmkidsSync(e, t)
          } else if (n.code !== 'ENOENT') {
            throw n
          }
        }
      }
      function rmkidsSync(e, t) {
        o(e)
        o(t)
        t.readdirSync(e).forEach((r) => rimrafSync(i.join(e, r), t))
        if (c) {
          const r = Date.now()
          do {
            try {
              const r = t.rmdirSync(e, t)
              return r
            } catch {}
          } while (Date.now() - r < 500)
        } else {
          const r = t.rmdirSync(e, t)
          return r
        }
      }
      e.exports = rimraf
      rimraf.sync = rimrafSync
    },
    239: (e, t, r) => {
      'use strict'
      const n = r(58)
      const i = r(17)
      const o = r(837)
      function getStats(e, t, r) {
        const i = r.dereference
          ? (e) => n.stat(e, { bigint: true })
          : (e) => n.lstat(e, { bigint: true })
        return Promise.all([
          i(e),
          i(t).catch((e) => {
            if (e.code === 'ENOENT') return null
            throw e
          }),
        ]).then(([e, t]) => ({ srcStat: e, destStat: t }))
      }
      function getStatsSync(e, t, r) {
        let i
        const o = r.dereference
          ? (e) => n.statSync(e, { bigint: true })
          : (e) => n.lstatSync(e, { bigint: true })
        const c = o(e)
        try {
          i = o(t)
        } catch (e) {
          if (e.code === 'ENOENT') return { srcStat: c, destStat: null }
          throw e
        }
        return { srcStat: c, destStat: i }
      }
      function checkPaths(e, t, r, n, c) {
        o.callbackify(getStats)(e, t, n, (n, o) => {
          if (n) return c(n)
          const { srcStat: s, destStat: a } = o
          if (a) {
            if (areIdentical(s, a)) {
              const n = i.basename(e)
              const o = i.basename(t)
              if (
                r === 'move' &&
                n !== o &&
                n.toLowerCase() === o.toLowerCase()
              ) {
                return c(null, {
                  srcStat: s,
                  destStat: a,
                  isChangingCase: true,
                })
              }
              return c(
                new Error('Source and destination must not be the same.')
              )
            }
            if (s.isDirectory() && !a.isDirectory()) {
              return c(
                new Error(
                  `Cannot overwrite non-directory '${t}' with directory '${e}'.`
                )
              )
            }
            if (!s.isDirectory() && a.isDirectory()) {
              return c(
                new Error(
                  `Cannot overwrite directory '${t}' with non-directory '${e}'.`
                )
              )
            }
          }
          if (s.isDirectory() && isSrcSubdir(e, t)) {
            return c(new Error(errMsg(e, t, r)))
          }
          return c(null, { srcStat: s, destStat: a })
        })
      }
      function checkPathsSync(e, t, r, n) {
        const { srcStat: o, destStat: c } = getStatsSync(e, t, n)
        if (c) {
          if (areIdentical(o, c)) {
            const n = i.basename(e)
            const s = i.basename(t)
            if (
              r === 'move' &&
              n !== s &&
              n.toLowerCase() === s.toLowerCase()
            ) {
              return { srcStat: o, destStat: c, isChangingCase: true }
            }
            throw new Error('Source and destination must not be the same.')
          }
          if (o.isDirectory() && !c.isDirectory()) {
            throw new Error(
              `Cannot overwrite non-directory '${t}' with directory '${e}'.`
            )
          }
          if (!o.isDirectory() && c.isDirectory()) {
            throw new Error(
              `Cannot overwrite directory '${t}' with non-directory '${e}'.`
            )
          }
        }
        if (o.isDirectory() && isSrcSubdir(e, t)) {
          throw new Error(errMsg(e, t, r))
        }
        return { srcStat: o, destStat: c }
      }
      function checkParentPaths(e, t, r, o, c) {
        const s = i.resolve(i.dirname(e))
        const a = i.resolve(i.dirname(r))
        if (a === s || a === i.parse(a).root) return c()
        n.stat(a, { bigint: true }, (n, i) => {
          if (n) {
            if (n.code === 'ENOENT') return c()
            return c(n)
          }
          if (areIdentical(t, i)) {
            return c(new Error(errMsg(e, r, o)))
          }
          return checkParentPaths(e, t, a, o, c)
        })
      }
      function checkParentPathsSync(e, t, r, o) {
        const c = i.resolve(i.dirname(e))
        const s = i.resolve(i.dirname(r))
        if (s === c || s === i.parse(s).root) return
        let a
        try {
          a = n.statSync(s, { bigint: true })
        } catch (e) {
          if (e.code === 'ENOENT') return
          throw e
        }
        if (areIdentical(t, a)) {
          throw new Error(errMsg(e, r, o))
        }
        return checkParentPathsSync(e, t, s, o)
      }
      function areIdentical(e, t) {
        return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev
      }
      function isSrcSubdir(e, t) {
        const r = i
          .resolve(e)
          .split(i.sep)
          .filter((e) => e)
        const n = i
          .resolve(t)
          .split(i.sep)
          .filter((e) => e)
        return r.reduce((e, t, r) => e && n[r] === t, true)
      }
      function errMsg(e, t, r) {
        return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`
      }
      e.exports = {
        checkPaths: checkPaths,
        checkPathsSync: checkPathsSync,
        checkParentPaths: checkParentPaths,
        checkParentPathsSync: checkParentPathsSync,
        isSrcSubdir: isSrcSubdir,
        areIdentical: areIdentical,
      }
    },
    897: (e, t, r) => {
      'use strict'
      const n = r(165)
      function utimesMillis(e, t, r, i) {
        n.open(e, 'r+', (e, o) => {
          if (e) return i(e)
          n.futimes(o, t, r, (e) => {
            n.close(o, (t) => {
              if (i) i(e || t)
            })
          })
        })
      }
      function utimesMillisSync(e, t, r) {
        const i = n.openSync(e, 'r+')
        n.futimesSync(i, t, r)
        return n.closeSync(i)
      }
      e.exports = {
        utimesMillis: utimesMillis,
        utimesMillisSync: utimesMillisSync,
      }
    },
    444: (e) => {
      'use strict'
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
    165: (e, t, r) => {
      var n = r(147)
      var i = r(986)
      var o = r(78)
      var c = r(444)
      var s = r(837)
      var a
      var u
      if (typeof Symbol === 'function' && typeof Symbol.for === 'function') {
        a = Symbol.for('graceful-fs.queue')
        u = Symbol.for('graceful-fs.previous')
      } else {
        a = '___graceful-fs.queue'
        u = '___graceful-fs.previous'
      }
      function noop() {}
      function publishQueue(e, t) {
        Object.defineProperty(e, a, {
          get: function () {
            return t
          },
        })
      }
      var f = noop
      if (s.debuglog) f = s.debuglog('gfs4')
      else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
        f = function () {
          var e = s.format.apply(s, arguments)
          e = 'GFS4: ' + e.split(/\n/).join('\nGFS4: ')
          console.error(e)
        }
      if (!n[a]) {
        var l = global[a] || []
        publishQueue(n, l)
        n.close = (function (e) {
          function close(t, r) {
            return e.call(n, t, function (e) {
              if (!e) {
                resetQueue()
              }
              if (typeof r === 'function') r.apply(this, arguments)
            })
          }
          Object.defineProperty(close, u, { value: e })
          return close
        })(n.close)
        n.closeSync = (function (e) {
          function closeSync(t) {
            e.apply(n, arguments)
            resetQueue()
          }
          Object.defineProperty(closeSync, u, { value: e })
          return closeSync
        })(n.closeSync)
        if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
          process.on('exit', function () {
            f(n[a])
            r(491).equal(n[a].length, 0)
          })
        }
      }
      if (!global[a]) {
        publishQueue(global, n[a])
      }
      e.exports = patch(c(n))
      if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !n.__patched) {
        e.exports = patch(n)
        n.__patched = true
      }
      function patch(e) {
        i(e)
        e.gracefulify = patch
        e.createReadStream = createReadStream
        e.createWriteStream = createWriteStream
        var t = e.readFile
        e.readFile = readFile
        function readFile(e, r, n) {
          if (typeof r === 'function') (n = r), (r = null)
          return go$readFile(e, r, n)
          function go$readFile(e, r, n, i) {
            return t(e, r, function (t) {
              if (t && (t.code === 'EMFILE' || t.code === 'ENFILE'))
                enqueue([
                  go$readFile,
                  [e, r, n],
                  t,
                  i || Date.now(),
                  Date.now(),
                ])
              else {
                if (typeof n === 'function') n.apply(this, arguments)
              }
            })
          }
        }
        var r = e.writeFile
        e.writeFile = writeFile
        function writeFile(e, t, n, i) {
          if (typeof n === 'function') (i = n), (n = null)
          return go$writeFile(e, t, n, i)
          function go$writeFile(e, t, n, i, o) {
            return r(e, t, n, function (r) {
              if (r && (r.code === 'EMFILE' || r.code === 'ENFILE'))
                enqueue([
                  go$writeFile,
                  [e, t, n, i],
                  r,
                  o || Date.now(),
                  Date.now(),
                ])
              else {
                if (typeof i === 'function') i.apply(this, arguments)
              }
            })
          }
        }
        var n = e.appendFile
        if (n) e.appendFile = appendFile
        function appendFile(e, t, r, i) {
          if (typeof r === 'function') (i = r), (r = null)
          return go$appendFile(e, t, r, i)
          function go$appendFile(e, t, r, i, o) {
            return n(e, t, r, function (n) {
              if (n && (n.code === 'EMFILE' || n.code === 'ENFILE'))
                enqueue([
                  go$appendFile,
                  [e, t, r, i],
                  n,
                  o || Date.now(),
                  Date.now(),
                ])
              else {
                if (typeof i === 'function') i.apply(this, arguments)
              }
            })
          }
        }
        var c = e.copyFile
        if (c) e.copyFile = copyFile
        function copyFile(e, t, r, n) {
          if (typeof r === 'function') {
            n = r
            r = 0
          }
          return go$copyFile(e, t, r, n)
          function go$copyFile(e, t, r, n, i) {
            return c(e, t, r, function (o) {
              if (o && (o.code === 'EMFILE' || o.code === 'ENFILE'))
                enqueue([
                  go$copyFile,
                  [e, t, r, n],
                  o,
                  i || Date.now(),
                  Date.now(),
                ])
              else {
                if (typeof n === 'function') n.apply(this, arguments)
              }
            })
          }
        }
        var s = e.readdir
        e.readdir = readdir
        var a = /^v[0-5]\./
        function readdir(e, t, r) {
          if (typeof t === 'function') (r = t), (t = null)
          var n = a.test(process.version)
            ? function go$readdir(e, t, r, n) {
                return s(e, fs$readdirCallback(e, t, r, n))
              }
            : function go$readdir(e, t, r, n) {
                return s(e, t, fs$readdirCallback(e, t, r, n))
              }
          return n(e, t, r)
          function fs$readdirCallback(e, t, r, i) {
            return function (o, c) {
              if (o && (o.code === 'EMFILE' || o.code === 'ENFILE'))
                enqueue([n, [e, t, r], o, i || Date.now(), Date.now()])
              else {
                if (c && c.sort) c.sort()
                if (typeof r === 'function') r.call(this, o, c)
              }
            }
          }
        }
        if (process.version.substr(0, 4) === 'v0.8') {
          var u = o(e)
          ReadStream = u.ReadStream
          WriteStream = u.WriteStream
        }
        var f = e.ReadStream
        if (f) {
          ReadStream.prototype = Object.create(f.prototype)
          ReadStream.prototype.open = ReadStream$open
        }
        var l = e.WriteStream
        if (l) {
          WriteStream.prototype = Object.create(l.prototype)
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
        var y = ReadStream
        Object.defineProperty(e, 'FileReadStream', {
          get: function () {
            return y
          },
          set: function (e) {
            y = e
          },
          enumerable: true,
          configurable: true,
        })
        var d = WriteStream
        Object.defineProperty(e, 'FileWriteStream', {
          get: function () {
            return d
          },
          set: function (e) {
            d = e
          },
          enumerable: true,
          configurable: true,
        })
        function ReadStream(e, t) {
          if (this instanceof ReadStream) return f.apply(this, arguments), this
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
          if (this instanceof WriteStream) return l.apply(this, arguments), this
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
        function open(e, t, r, n) {
          if (typeof r === 'function') (n = r), (r = null)
          return go$open(e, t, r, n)
          function go$open(e, t, r, n, i) {
            return m(e, t, r, function (o, c) {
              if (o && (o.code === 'EMFILE' || o.code === 'ENFILE'))
                enqueue([go$open, [e, t, r, n], o, i || Date.now(), Date.now()])
              else {
                if (typeof n === 'function') n.apply(this, arguments)
              }
            })
          }
        }
        return e
      }
      function enqueue(e) {
        f('ENQUEUE', e[0].name, e[1])
        n[a].push(e)
        retry()
      }
      var y
      function resetQueue() {
        var e = Date.now()
        for (var t = 0; t < n[a].length; ++t) {
          if (n[a][t].length > 2) {
            n[a][t][3] = e
            n[a][t][4] = e
          }
        }
        retry()
      }
      function retry() {
        clearTimeout(y)
        y = undefined
        if (n[a].length === 0) return
        var e = n[a].shift()
        var t = e[0]
        var r = e[1]
        var i = e[2]
        var o = e[3]
        var c = e[4]
        if (o === undefined) {
          f('RETRY', t.name, r)
          t.apply(null, r)
        } else if (Date.now() - o >= 6e4) {
          f('TIMEOUT', t.name, r)
          var s = r.pop()
          if (typeof s === 'function') s.call(null, i)
        } else {
          var u = Date.now() - c
          var l = Math.max(c - o, 1)
          var d = Math.min(l * 1.2, 100)
          if (u >= d) {
            f('RETRY', t.name, r)
            t.apply(null, r.concat([o]))
          } else {
            n[a].push(e)
          }
        }
        if (y === undefined) {
          y = setTimeout(retry, 0)
        }
      }
    },
    78: (e, t, r) => {
      var n = r(781).Stream
      e.exports = legacy
      function legacy(e) {
        return { ReadStream: ReadStream, WriteStream: WriteStream }
        function ReadStream(t, r) {
          if (!(this instanceof ReadStream)) return new ReadStream(t, r)
          n.call(this)
          var i = this
          this.path = t
          this.fd = null
          this.readable = true
          this.paused = false
          this.flags = 'r'
          this.mode = 438
          this.bufferSize = 64 * 1024
          r = r || {}
          var o = Object.keys(r)
          for (var c = 0, s = o.length; c < s; c++) {
            var a = o[c]
            this[a] = r[a]
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
              i._read()
            })
            return
          }
          e.open(this.path, this.flags, this.mode, function (e, t) {
            if (e) {
              i.emit('error', e)
              i.readable = false
              return
            }
            i.fd = t
            i.emit('open', t)
            i._read()
          })
        }
        function WriteStream(t, r) {
          if (!(this instanceof WriteStream)) return new WriteStream(t, r)
          n.call(this)
          this.path = t
          this.fd = null
          this.writable = true
          this.flags = 'w'
          this.encoding = 'binary'
          this.mode = 438
          this.bytesWritten = 0
          r = r || {}
          var i = Object.keys(r)
          for (var o = 0, c = i.length; o < c; o++) {
            var s = i[o]
            this[s] = r[s]
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
    986: (e, t, r) => {
      var n = r(57)
      var i = process.cwd
      var o = null
      var c = process.env.GRACEFUL_FS_PLATFORM || process.platform
      process.cwd = function () {
        if (!o) o = i.call(process)
        return o
      }
      try {
        process.cwd()
      } catch (e) {}
      if (typeof process.chdir === 'function') {
        var s = process.chdir
        process.chdir = function (e) {
          o = null
          s.call(process, e)
        }
        if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, s)
      }
      e.exports = patch
      function patch(e) {
        if (
          n.hasOwnProperty('O_SYMLINK') &&
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
          e.lchown = function (e, t, r, n) {
            if (n) process.nextTick(n)
          }
          e.lchownSync = function () {}
        }
        if (c === 'win32') {
          e.rename =
            typeof e.rename !== 'function'
              ? e.rename
              : (function (t) {
                  function rename(r, n, i) {
                    var o = Date.now()
                    var c = 0
                    t(r, n, function CB(s) {
                      if (
                        s &&
                        (s.code === 'EACCES' || s.code === 'EPERM') &&
                        Date.now() - o < 6e4
                      ) {
                        setTimeout(function () {
                          e.stat(n, function (e, o) {
                            if (e && e.code === 'ENOENT') t(r, n, CB)
                            else i(s)
                          })
                        }, c)
                        if (c < 100) c += 10
                        return
                      }
                      if (i) i(s)
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
                function read(r, n, i, o, c, s) {
                  var a
                  if (s && typeof s === 'function') {
                    var u = 0
                    a = function (f, l, y) {
                      if (f && f.code === 'EAGAIN' && u < 10) {
                        u++
                        return t.call(e, r, n, i, o, c, a)
                      }
                      s.apply(this, arguments)
                    }
                  }
                  return t.call(e, r, n, i, o, c, a)
                }
                if (Object.setPrototypeOf) Object.setPrototypeOf(read, t)
                return read
              })(e.read)
        e.readSync =
          typeof e.readSync !== 'function'
            ? e.readSync
            : (function (t) {
                return function (r, n, i, o, c) {
                  var s = 0
                  while (true) {
                    try {
                      return t.call(e, r, n, i, o, c)
                    } catch (e) {
                      if (e.code === 'EAGAIN' && s < 10) {
                        s++
                        continue
                      }
                      throw e
                    }
                  }
                }
              })(e.readSync)
        function patchLchmod(e) {
          e.lchmod = function (t, r, i) {
            e.open(t, n.O_WRONLY | n.O_SYMLINK, r, function (t, n) {
              if (t) {
                if (i) i(t)
                return
              }
              e.fchmod(n, r, function (t) {
                e.close(n, function (e) {
                  if (i) i(t || e)
                })
              })
            })
          }
          e.lchmodSync = function (t, r) {
            var i = e.openSync(t, n.O_WRONLY | n.O_SYMLINK, r)
            var o = true
            var c
            try {
              c = e.fchmodSync(i, r)
              o = false
            } finally {
              if (o) {
                try {
                  e.closeSync(i)
                } catch (e) {}
              } else {
                e.closeSync(i)
              }
            }
            return c
          }
        }
        function patchLutimes(e) {
          if (n.hasOwnProperty('O_SYMLINK') && e.futimes) {
            e.lutimes = function (t, r, i, o) {
              e.open(t, n.O_SYMLINK, function (t, n) {
                if (t) {
                  if (o) o(t)
                  return
                }
                e.futimes(n, r, i, function (t) {
                  e.close(n, function (e) {
                    if (o) o(t || e)
                  })
                })
              })
            }
            e.lutimesSync = function (t, r, i) {
              var o = e.openSync(t, n.O_SYMLINK)
              var c
              var s = true
              try {
                c = e.futimesSync(o, r, i)
                s = false
              } finally {
                if (s) {
                  try {
                    e.closeSync(o)
                  } catch (e) {}
                } else {
                  e.closeSync(o)
                }
              }
              return c
            }
          } else if (e.futimes) {
            e.lutimes = function (e, t, r, n) {
              if (n) process.nextTick(n)
            }
            e.lutimesSync = function () {}
          }
        }
        function chmodFix(t) {
          if (!t) return t
          return function (r, n, i) {
            return t.call(e, r, n, function (e) {
              if (chownErOk(e)) e = null
              if (i) i.apply(this, arguments)
            })
          }
        }
        function chmodFixSync(t) {
          if (!t) return t
          return function (r, n) {
            try {
              return t.call(e, r, n)
            } catch (e) {
              if (!chownErOk(e)) throw e
            }
          }
        }
        function chownFix(t) {
          if (!t) return t
          return function (r, n, i, o) {
            return t.call(e, r, n, i, function (e) {
              if (chownErOk(e)) e = null
              if (o) o.apply(this, arguments)
            })
          }
        }
        function chownFixSync(t) {
          if (!t) return t
          return function (r, n, i) {
            try {
              return t.call(e, r, n, i)
            } catch (e) {
              if (!chownErOk(e)) throw e
            }
          }
        }
        function statFix(t) {
          if (!t) return t
          return function (r, n, i) {
            if (typeof n === 'function') {
              i = n
              n = null
            }
            function callback(e, t) {
              if (t) {
                if (t.uid < 0) t.uid += 4294967296
                if (t.gid < 0) t.gid += 4294967296
              }
              if (i) i.apply(this, arguments)
            }
            return n ? t.call(e, r, n, callback) : t.call(e, r, callback)
          }
        }
        function statFixSync(t) {
          if (!t) return t
          return function (r, n) {
            var i = n ? t.call(e, r, n) : t.call(e, r)
            if (i) {
              if (i.uid < 0) i.uid += 4294967296
              if (i.gid < 0) i.gid += 4294967296
            }
            return i
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
    947: (e, t, r) => {
      let n
      try {
        n = r(165)
      } catch (e) {
        n = r(147)
      }
      const i = r(531)
      const { stringify: o, stripBom: c } = r(456)
      async function _readFile(e, t = {}) {
        if (typeof t === 'string') {
          t = { encoding: t }
        }
        const r = t.fs || n
        const o = 'throws' in t ? t.throws : true
        let s = await i.fromCallback(r.readFile)(e, t)
        s = c(s)
        let a
        try {
          a = JSON.parse(s, t ? t.reviver : null)
        } catch (t) {
          if (o) {
            t.message = `${e}: ${t.message}`
            throw t
          } else {
            return null
          }
        }
        return a
      }
      const s = i.fromPromise(_readFile)
      function readFileSync(e, t = {}) {
        if (typeof t === 'string') {
          t = { encoding: t }
        }
        const r = t.fs || n
        const i = 'throws' in t ? t.throws : true
        try {
          let n = r.readFileSync(e, t)
          n = c(n)
          return JSON.parse(n, t.reviver)
        } catch (t) {
          if (i) {
            t.message = `${e}: ${t.message}`
            throw t
          } else {
            return null
          }
        }
      }
      async function _writeFile(e, t, r = {}) {
        const c = r.fs || n
        const s = o(t, r)
        await i.fromCallback(c.writeFile)(e, s, r)
      }
      const a = i.fromPromise(_writeFile)
      function writeFileSync(e, t, r = {}) {
        const i = r.fs || n
        const c = o(t, r)
        return i.writeFileSync(e, c, r)
      }
      const u = {
        readFile: s,
        readFileSync: readFileSync,
        writeFile: a,
        writeFileSync: writeFileSync,
      }
      e.exports = u
    },
    456: (e) => {
      function stringify(
        e,
        {
          EOL: t = '\n',
          finalEOL: r = true,
          replacer: n = null,
          spaces: i,
        } = {}
      ) {
        const o = r ? t : ''
        const c = JSON.stringify(e, n, i)
        return c.replace(/\n/g, t) + o
      }
      function stripBom(e) {
        if (Buffer.isBuffer(e)) e = e.toString('utf8')
        return e.replace(/^\uFEFF/, '')
      }
      e.exports = { stringify: stringify, stripBom: stripBom }
    },
    531: (e, t) => {
      'use strict'
      t.fromCallback = function (e) {
        return Object.defineProperty(
          function (...t) {
            if (typeof t[t.length - 1] === 'function') e.apply(this, t)
            else {
              return new Promise((r, n) => {
                e.call(this, ...t, (e, t) => (e != null ? n(e) : r(t)))
              })
            }
          },
          'name',
          { value: e.name }
        )
      }
      t.fromPromise = function (e) {
        return Object.defineProperty(
          function (...t) {
            const r = t[t.length - 1]
            if (typeof r !== 'function') return e.apply(this, t)
            else e.apply(this, t.slice(0, -1)).then((e) => r(null, e), r)
          },
          'name',
          { value: e.name }
        )
      }
    },
    491: (e) => {
      'use strict'
      e.exports = require('assert')
    },
    57: (e) => {
      'use strict'
      e.exports = require('constants')
    },
    147: (e) => {
      'use strict'
      e.exports = require('fs')
    },
    17: (e) => {
      'use strict'
      e.exports = require('path')
    },
    781: (e) => {
      'use strict'
      e.exports = require('stream')
    },
    837: (e) => {
      'use strict'
      e.exports = require('util')
    },
  }
  var t = {}
  function __nccwpck_require__(r) {
    var n = t[r]
    if (n !== undefined) {
      return n.exports
    }
    var i = (t[r] = { exports: {} })
    var o = true
    try {
      e[r](i, i.exports, __nccwpck_require__)
      o = false
    } finally {
      if (o) delete t[r]
    }
    return i.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var r = __nccwpck_require__(493)
  module.exports = r
})()
