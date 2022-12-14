;(() => {
  var t = {
    876: (t, r, e) => {
      'use strict'
      const o = e(287)
      const n = e(953)
      const i = /\s/g
      function InitGradient(...t) {
        const r = n.apply(this, t)
        const ret = (t, e) => applyGradient(t ? t.toString() : '', r, e)
        ret.multiline = (t, e) => multilineGradient(t ? t.toString() : '', r, e)
        return ret
      }
      const getColors = (t, r, e) =>
        r.interpolation.toLowerCase() === 'hsv'
          ? t.hsv(e, r.hsvSpin.toLowerCase())
          : t.rgb(e)
      function applyGradient(t, r, e) {
        const n = validateOptions(e)
        const s = Math.max(t.replace(i, '').length, r.stops.length)
        const a = getColors(r, n, s)
        let l = ''
        for (const r of t) {
          l += r.match(i) ? r : o.hex(a.shift().toHex())(r)
        }
        return l
      }
      function multilineGradient(t, r, e) {
        const n = validateOptions(e)
        const i = t.split('\n')
        const s = Math.max.apply(
          null,
          i.map((t) => t.length).concat([r.stops.length])
        )
        const a = getColors(r, n, s)
        const l = []
        for (const t of i) {
          const r = a.slice(0)
          let e = ''
          for (const n of t) {
            e += o.hex(r.shift().toHex())(n)
          }
          l.push(e)
        }
        return l.join('\n')
      }
      function validateOptions(t) {
        const r = { interpolation: 'rgb', hsvSpin: 'short', ...t }
        if (t !== undefined && typeof t !== 'object') {
          throw new TypeError(
            `Expected \`options\` to be an \`object\`, got \`${typeof t}\``
          )
        }
        if (typeof r.interpolation !== 'string') {
          throw new TypeError(
            `Expected \`options.interpolation\` to be a \`string\`, got \`${typeof r.interpolation}\``
          )
        }
        if (
          r.interpolation.toLowerCase() === 'hsv' &&
          typeof r.hsvSpin !== 'string'
        ) {
          throw new TypeError(
            `Expected \`options.hsvSpin\` to be a \`string\`, got \`${typeof r.hsvSpin}\``
          )
        }
        return r
      }
      const s = {
        atlas: { colors: ['#feac5e', '#c779d0', '#4bc0c8'], options: {} },
        cristal: { colors: ['#bdfff3', '#4ac29a'], options: {} },
        teen: { colors: ['#77a1d3', '#79cbca', '#e684ae'], options: {} },
        mind: { colors: ['#473b7b', '#3584a7', '#30d2be'], options: {} },
        morning: {
          colors: ['#ff5f6d', '#ffc371'],
          options: { interpolation: 'hsv' },
        },
        vice: {
          colors: ['#5ee7df', '#b490ca'],
          options: { interpolation: 'hsv' },
        },
        passion: { colors: ['#f43b47', '#453a94'], options: {} },
        fruit: { colors: ['#ff4e50', '#f9d423'], options: {} },
        instagram: { colors: ['#833ab4', '#fd1d1d', '#fcb045'], options: {} },
        retro: {
          colors: [
            '#3f51b1',
            '#5a55ae',
            '#7b5fac',
            '#8f6aae',
            '#a86aa4',
            '#cc6b8e',
            '#f18271',
            '#f3a469',
            '#f7c978',
          ],
          options: {},
        },
        summer: { colors: ['#fdbb2d', '#22c1c3'], options: {} },
        rainbow: {
          colors: ['#ff0000', '#ff0100'],
          options: { interpolation: 'hsv', hsvSpin: 'long' },
        },
        pastel: {
          colors: ['#74ebd5', '#74ecd5'],
          options: { interpolation: 'hsv', hsvSpin: 'long' },
        },
      }
      t.exports = InitGradient
      for (const r in s) {
        t.exports[r] = (t) => new InitGradient(s[r].colors)(t, s[r].options)
        t.exports[r].multiline = (t) =>
          new InitGradient(s[r].colors).multiline(t, s[r].options)
      }
    },
    182: (t) => {
      ;(function (r) {
        var e = /^\s+/,
          o = /\s+$/,
          n = 0,
          i = r.round,
          s = r.min,
          a = r.max,
          l = r.random
        function tinycolor(t, r) {
          t = t ? t : ''
          r = r || {}
          if (t instanceof tinycolor) {
            return t
          }
          if (!(this instanceof tinycolor)) {
            return new tinycolor(t, r)
          }
          var e = inputToRGB(t)
          ;(this._originalInput = t),
            (this._r = e.r),
            (this._g = e.g),
            (this._b = e.b),
            (this._a = e.a),
            (this._roundA = i(100 * this._a) / 100),
            (this._format = r.format || e.format)
          this._gradientType = r.gradientType
          if (this._r < 1) {
            this._r = i(this._r)
          }
          if (this._g < 1) {
            this._g = i(this._g)
          }
          if (this._b < 1) {
            this._b = i(this._b)
          }
          this._ok = e.ok
          this._tc_id = n++
        }
        tinycolor.prototype = {
          isDark: function () {
            return this.getBrightness() < 128
          },
          isLight: function () {
            return !this.isDark()
          },
          isValid: function () {
            return this._ok
          },
          getOriginalInput: function () {
            return this._originalInput
          },
          getFormat: function () {
            return this._format
          },
          getAlpha: function () {
            return this._a
          },
          getBrightness: function () {
            var t = this.toRgb()
            return (t.r * 299 + t.g * 587 + t.b * 114) / 1e3
          },
          getLuminance: function () {
            var t = this.toRgb()
            var e, o, n, i, s, a
            e = t.r / 255
            o = t.g / 255
            n = t.b / 255
            if (e <= 0.03928) {
              i = e / 12.92
            } else {
              i = r.pow((e + 0.055) / 1.055, 2.4)
            }
            if (o <= 0.03928) {
              s = o / 12.92
            } else {
              s = r.pow((o + 0.055) / 1.055, 2.4)
            }
            if (n <= 0.03928) {
              a = n / 12.92
            } else {
              a = r.pow((n + 0.055) / 1.055, 2.4)
            }
            return 0.2126 * i + 0.7152 * s + 0.0722 * a
          },
          setAlpha: function (t) {
            this._a = boundAlpha(t)
            this._roundA = i(100 * this._a) / 100
            return this
          },
          toHsv: function () {
            var t = rgbToHsv(this._r, this._g, this._b)
            return { h: t.h * 360, s: t.s, v: t.v, a: this._a }
          },
          toHsvString: function () {
            var t = rgbToHsv(this._r, this._g, this._b)
            var r = i(t.h * 360),
              e = i(t.s * 100),
              o = i(t.v * 100)
            return this._a == 1
              ? 'hsv(' + r + ', ' + e + '%, ' + o + '%)'
              : 'hsva(' + r + ', ' + e + '%, ' + o + '%, ' + this._roundA + ')'
          },
          toHsl: function () {
            var t = rgbToHsl(this._r, this._g, this._b)
            return { h: t.h * 360, s: t.s, l: t.l, a: this._a }
          },
          toHslString: function () {
            var t = rgbToHsl(this._r, this._g, this._b)
            var r = i(t.h * 360),
              e = i(t.s * 100),
              o = i(t.l * 100)
            return this._a == 1
              ? 'hsl(' + r + ', ' + e + '%, ' + o + '%)'
              : 'hsla(' + r + ', ' + e + '%, ' + o + '%, ' + this._roundA + ')'
          },
          toHex: function (t) {
            return rgbToHex(this._r, this._g, this._b, t)
          },
          toHexString: function (t) {
            return '#' + this.toHex(t)
          },
          toHex8: function (t) {
            return rgbaToHex(this._r, this._g, this._b, this._a, t)
          },
          toHex8String: function (t) {
            return '#' + this.toHex8(t)
          },
          toRgb: function () {
            return { r: i(this._r), g: i(this._g), b: i(this._b), a: this._a }
          },
          toRgbString: function () {
            return this._a == 1
              ? 'rgb(' +
                  i(this._r) +
                  ', ' +
                  i(this._g) +
                  ', ' +
                  i(this._b) +
                  ')'
              : 'rgba(' +
                  i(this._r) +
                  ', ' +
                  i(this._g) +
                  ', ' +
                  i(this._b) +
                  ', ' +
                  this._roundA +
                  ')'
          },
          toPercentageRgb: function () {
            return {
              r: i(bound01(this._r, 255) * 100) + '%',
              g: i(bound01(this._g, 255) * 100) + '%',
              b: i(bound01(this._b, 255) * 100) + '%',
              a: this._a,
            }
          },
          toPercentageRgbString: function () {
            return this._a == 1
              ? 'rgb(' +
                  i(bound01(this._r, 255) * 100) +
                  '%, ' +
                  i(bound01(this._g, 255) * 100) +
                  '%, ' +
                  i(bound01(this._b, 255) * 100) +
                  '%)'
              : 'rgba(' +
                  i(bound01(this._r, 255) * 100) +
                  '%, ' +
                  i(bound01(this._g, 255) * 100) +
                  '%, ' +
                  i(bound01(this._b, 255) * 100) +
                  '%, ' +
                  this._roundA +
                  ')'
          },
          toName: function () {
            if (this._a === 0) {
              return 'transparent'
            }
            if (this._a < 1) {
              return false
            }
            return f[rgbToHex(this._r, this._g, this._b, true)] || false
          },
          toFilter: function (t) {
            var r = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a)
            var e = r
            var o = this._gradientType ? 'GradientType = 1, ' : ''
            if (t) {
              var n = tinycolor(t)
              e = '#' + rgbaToArgbHex(n._r, n._g, n._b, n._a)
            }
            return (
              'progid:DXImageTransform.Microsoft.gradient(' +
              o +
              'startColorstr=' +
              r +
              ',endColorstr=' +
              e +
              ')'
            )
          },
          toString: function (t) {
            var r = !!t
            t = t || this._format
            var e = false
            var o = this._a < 1 && this._a >= 0
            var n =
              !r &&
              o &&
              (t === 'hex' ||
                t === 'hex6' ||
                t === 'hex3' ||
                t === 'hex4' ||
                t === 'hex8' ||
                t === 'name')
            if (n) {
              if (t === 'name' && this._a === 0) {
                return this.toName()
              }
              return this.toRgbString()
            }
            if (t === 'rgb') {
              e = this.toRgbString()
            }
            if (t === 'prgb') {
              e = this.toPercentageRgbString()
            }
            if (t === 'hex' || t === 'hex6') {
              e = this.toHexString()
            }
            if (t === 'hex3') {
              e = this.toHexString(true)
            }
            if (t === 'hex4') {
              e = this.toHex8String(true)
            }
            if (t === 'hex8') {
              e = this.toHex8String()
            }
            if (t === 'name') {
              e = this.toName()
            }
            if (t === 'hsl') {
              e = this.toHslString()
            }
            if (t === 'hsv') {
              e = this.toHsvString()
            }
            return e || this.toHexString()
          },
          clone: function () {
            return tinycolor(this.toString())
          },
          _applyModification: function (t, r) {
            var e = t.apply(null, [this].concat([].slice.call(r)))
            this._r = e._r
            this._g = e._g
            this._b = e._b
            this.setAlpha(e._a)
            return this
          },
          lighten: function () {
            return this._applyModification(lighten, arguments)
          },
          brighten: function () {
            return this._applyModification(brighten, arguments)
          },
          darken: function () {
            return this._applyModification(darken, arguments)
          },
          desaturate: function () {
            return this._applyModification(desaturate, arguments)
          },
          saturate: function () {
            return this._applyModification(saturate, arguments)
          },
          greyscale: function () {
            return this._applyModification(greyscale, arguments)
          },
          spin: function () {
            return this._applyModification(spin, arguments)
          },
          _applyCombination: function (t, r) {
            return t.apply(null, [this].concat([].slice.call(r)))
          },
          analogous: function () {
            return this._applyCombination(analogous, arguments)
          },
          complement: function () {
            return this._applyCombination(complement, arguments)
          },
          monochromatic: function () {
            return this._applyCombination(monochromatic, arguments)
          },
          splitcomplement: function () {
            return this._applyCombination(splitcomplement, arguments)
          },
          triad: function () {
            return this._applyCombination(triad, arguments)
          },
          tetrad: function () {
            return this._applyCombination(tetrad, arguments)
          },
        }
        tinycolor.fromRatio = function (t, r) {
          if (typeof t == 'object') {
            var e = {}
            for (var o in t) {
              if (t.hasOwnProperty(o)) {
                if (o === 'a') {
                  e[o] = t[o]
                } else {
                  e[o] = convertToPercentage(t[o])
                }
              }
            }
            t = e
          }
          return tinycolor(t, r)
        }
        function inputToRGB(t) {
          var r = { r: 0, g: 0, b: 0 }
          var e = 1
          var o = null
          var n = null
          var i = null
          var l = false
          var c = false
          if (typeof t == 'string') {
            t = stringInputToObject(t)
          }
          if (typeof t == 'object') {
            if (
              isValidCSSUnit(t.r) &&
              isValidCSSUnit(t.g) &&
              isValidCSSUnit(t.b)
            ) {
              r = rgbToRgb(t.r, t.g, t.b)
              l = true
              c = String(t.r).substr(-1) === '%' ? 'prgb' : 'rgb'
            } else if (
              isValidCSSUnit(t.h) &&
              isValidCSSUnit(t.s) &&
              isValidCSSUnit(t.v)
            ) {
              o = convertToPercentage(t.s)
              n = convertToPercentage(t.v)
              r = hsvToRgb(t.h, o, n)
              l = true
              c = 'hsv'
            } else if (
              isValidCSSUnit(t.h) &&
              isValidCSSUnit(t.s) &&
              isValidCSSUnit(t.l)
            ) {
              o = convertToPercentage(t.s)
              i = convertToPercentage(t.l)
              r = hslToRgb(t.h, o, i)
              l = true
              c = 'hsl'
            }
            if (t.hasOwnProperty('a')) {
              e = t.a
            }
          }
          e = boundAlpha(e)
          return {
            ok: l,
            format: t.format || c,
            r: s(255, a(r.r, 0)),
            g: s(255, a(r.g, 0)),
            b: s(255, a(r.b, 0)),
            a: e,
          }
        }
        function rgbToRgb(t, r, e) {
          return {
            r: bound01(t, 255) * 255,
            g: bound01(r, 255) * 255,
            b: bound01(e, 255) * 255,
          }
        }
        function rgbToHsl(t, r, e) {
          t = bound01(t, 255)
          r = bound01(r, 255)
          e = bound01(e, 255)
          var o = a(t, r, e),
            n = s(t, r, e)
          var i,
            l,
            c = (o + n) / 2
          if (o == n) {
            i = l = 0
          } else {
            var f = o - n
            l = c > 0.5 ? f / (2 - o - n) : f / (o + n)
            switch (o) {
              case t:
                i = (r - e) / f + (r < e ? 6 : 0)
                break
              case r:
                i = (e - t) / f + 2
                break
              case e:
                i = (t - r) / f + 4
                break
            }
            i /= 6
          }
          return { h: i, s: l, l: c }
        }
        function hslToRgb(t, r, e) {
          var o, n, i
          t = bound01(t, 360)
          r = bound01(r, 100)
          e = bound01(e, 100)
          function hue2rgb(t, r, e) {
            if (e < 0) e += 1
            if (e > 1) e -= 1
            if (e < 1 / 6) return t + (r - t) * 6 * e
            if (e < 1 / 2) return r
            if (e < 2 / 3) return t + (r - t) * (2 / 3 - e) * 6
            return t
          }
          if (r === 0) {
            o = n = i = e
          } else {
            var s = e < 0.5 ? e * (1 + r) : e + r - e * r
            var a = 2 * e - s
            o = hue2rgb(a, s, t + 1 / 3)
            n = hue2rgb(a, s, t)
            i = hue2rgb(a, s, t - 1 / 3)
          }
          return { r: o * 255, g: n * 255, b: i * 255 }
        }
        function rgbToHsv(t, r, e) {
          t = bound01(t, 255)
          r = bound01(r, 255)
          e = bound01(e, 255)
          var o = a(t, r, e),
            n = s(t, r, e)
          var i,
            l,
            c = o
          var f = o - n
          l = o === 0 ? 0 : f / o
          if (o == n) {
            i = 0
          } else {
            switch (o) {
              case t:
                i = (r - e) / f + (r < e ? 6 : 0)
                break
              case r:
                i = (e - t) / f + 2
                break
              case e:
                i = (t - r) / f + 4
                break
            }
            i /= 6
          }
          return { h: i, s: l, v: c }
        }
        function hsvToRgb(t, e, o) {
          t = bound01(t, 360) * 6
          e = bound01(e, 100)
          o = bound01(o, 100)
          var n = r.floor(t),
            i = t - n,
            s = o * (1 - e),
            a = o * (1 - i * e),
            l = o * (1 - (1 - i) * e),
            c = n % 6,
            f = [o, a, s, s, l, o][c],
            h = [l, o, o, a, s, s][c],
            u = [s, s, l, o, o, a][c]
          return { r: f * 255, g: h * 255, b: u * 255 }
        }
        function rgbToHex(t, r, e, o) {
          var n = [
            pad2(i(t).toString(16)),
            pad2(i(r).toString(16)),
            pad2(i(e).toString(16)),
          ]
          if (
            o &&
            n[0].charAt(0) == n[0].charAt(1) &&
            n[1].charAt(0) == n[1].charAt(1) &&
            n[2].charAt(0) == n[2].charAt(1)
          ) {
            return n[0].charAt(0) + n[1].charAt(0) + n[2].charAt(0)
          }
          return n.join('')
        }
        function rgbaToHex(t, r, e, o, n) {
          var s = [
            pad2(i(t).toString(16)),
            pad2(i(r).toString(16)),
            pad2(i(e).toString(16)),
            pad2(convertDecimalToHex(o)),
          ]
          if (
            n &&
            s[0].charAt(0) == s[0].charAt(1) &&
            s[1].charAt(0) == s[1].charAt(1) &&
            s[2].charAt(0) == s[2].charAt(1) &&
            s[3].charAt(0) == s[3].charAt(1)
          ) {
            return (
              s[0].charAt(0) + s[1].charAt(0) + s[2].charAt(0) + s[3].charAt(0)
            )
          }
          return s.join('')
        }
        function rgbaToArgbHex(t, r, e, o) {
          var n = [
            pad2(convertDecimalToHex(o)),
            pad2(i(t).toString(16)),
            pad2(i(r).toString(16)),
            pad2(i(e).toString(16)),
          ]
          return n.join('')
        }
        tinycolor.equals = function (t, r) {
          if (!t || !r) {
            return false
          }
          return tinycolor(t).toRgbString() == tinycolor(r).toRgbString()
        }
        tinycolor.random = function () {
          return tinycolor.fromRatio({ r: l(), g: l(), b: l() })
        }
        function desaturate(t, r) {
          r = r === 0 ? 0 : r || 10
          var e = tinycolor(t).toHsl()
          e.s -= r / 100
          e.s = clamp01(e.s)
          return tinycolor(e)
        }
        function saturate(t, r) {
          r = r === 0 ? 0 : r || 10
          var e = tinycolor(t).toHsl()
          e.s += r / 100
          e.s = clamp01(e.s)
          return tinycolor(e)
        }
        function greyscale(t) {
          return tinycolor(t).desaturate(100)
        }
        function lighten(t, r) {
          r = r === 0 ? 0 : r || 10
          var e = tinycolor(t).toHsl()
          e.l += r / 100
          e.l = clamp01(e.l)
          return tinycolor(e)
        }
        function brighten(t, r) {
          r = r === 0 ? 0 : r || 10
          var e = tinycolor(t).toRgb()
          e.r = a(0, s(255, e.r - i(255 * -(r / 100))))
          e.g = a(0, s(255, e.g - i(255 * -(r / 100))))
          e.b = a(0, s(255, e.b - i(255 * -(r / 100))))
          return tinycolor(e)
        }
        function darken(t, r) {
          r = r === 0 ? 0 : r || 10
          var e = tinycolor(t).toHsl()
          e.l -= r / 100
          e.l = clamp01(e.l)
          return tinycolor(e)
        }
        function spin(t, r) {
          var e = tinycolor(t).toHsl()
          var o = (e.h + r) % 360
          e.h = o < 0 ? 360 + o : o
          return tinycolor(e)
        }
        function complement(t) {
          var r = tinycolor(t).toHsl()
          r.h = (r.h + 180) % 360
          return tinycolor(r)
        }
        function triad(t) {
          var r = tinycolor(t).toHsl()
          var e = r.h
          return [
            tinycolor(t),
            tinycolor({ h: (e + 120) % 360, s: r.s, l: r.l }),
            tinycolor({ h: (e + 240) % 360, s: r.s, l: r.l }),
          ]
        }
        function tetrad(t) {
          var r = tinycolor(t).toHsl()
          var e = r.h
          return [
            tinycolor(t),
            tinycolor({ h: (e + 90) % 360, s: r.s, l: r.l }),
            tinycolor({ h: (e + 180) % 360, s: r.s, l: r.l }),
            tinycolor({ h: (e + 270) % 360, s: r.s, l: r.l }),
          ]
        }
        function splitcomplement(t) {
          var r = tinycolor(t).toHsl()
          var e = r.h
          return [
            tinycolor(t),
            tinycolor({ h: (e + 72) % 360, s: r.s, l: r.l }),
            tinycolor({ h: (e + 216) % 360, s: r.s, l: r.l }),
          ]
        }
        function analogous(t, r, e) {
          r = r || 6
          e = e || 30
          var o = tinycolor(t).toHsl()
          var n = 360 / e
          var i = [tinycolor(t)]
          for (o.h = (o.h - ((n * r) >> 1) + 720) % 360; --r; ) {
            o.h = (o.h + n) % 360
            i.push(tinycolor(o))
          }
          return i
        }
        function monochromatic(t, r) {
          r = r || 6
          var e = tinycolor(t).toHsv()
          var o = e.h,
            n = e.s,
            i = e.v
          var s = []
          var a = 1 / r
          while (r--) {
            s.push(tinycolor({ h: o, s: n, v: i }))
            i = (i + a) % 1
          }
          return s
        }
        tinycolor.mix = function (t, r, e) {
          e = e === 0 ? 0 : e || 50
          var o = tinycolor(t).toRgb()
          var n = tinycolor(r).toRgb()
          var i = e / 100
          var s = {
            r: (n.r - o.r) * i + o.r,
            g: (n.g - o.g) * i + o.g,
            b: (n.b - o.b) * i + o.b,
            a: (n.a - o.a) * i + o.a,
          }
          return tinycolor(s)
        }
        tinycolor.readability = function (t, e) {
          var o = tinycolor(t)
          var n = tinycolor(e)
          return (
            (r.max(o.getLuminance(), n.getLuminance()) + 0.05) /
            (r.min(o.getLuminance(), n.getLuminance()) + 0.05)
          )
        }
        tinycolor.isReadable = function (t, r, e) {
          var o = tinycolor.readability(t, r)
          var n, i
          i = false
          n = validateWCAG2Parms(e)
          switch (n.level + n.size) {
            case 'AAsmall':
            case 'AAAlarge':
              i = o >= 4.5
              break
            case 'AAlarge':
              i = o >= 3
              break
            case 'AAAsmall':
              i = o >= 7
              break
          }
          return i
        }
        tinycolor.mostReadable = function (t, r, e) {
          var o = null
          var n = 0
          var i
          var s, a, l
          e = e || {}
          s = e.includeFallbackColors
          a = e.level
          l = e.size
          for (var c = 0; c < r.length; c++) {
            i = tinycolor.readability(t, r[c])
            if (i > n) {
              n = i
              o = tinycolor(r[c])
            }
          }
          if (tinycolor.isReadable(t, o, { level: a, size: l }) || !s) {
            return o
          } else {
            e.includeFallbackColors = false
            return tinycolor.mostReadable(t, ['#fff', '#000'], e)
          }
        }
        var c = (tinycolor.names = {
          aliceblue: 'f0f8ff',
          antiquewhite: 'faebd7',
          aqua: '0ff',
          aquamarine: '7fffd4',
          azure: 'f0ffff',
          beige: 'f5f5dc',
          bisque: 'ffe4c4',
          black: '000',
          blanchedalmond: 'ffebcd',
          blue: '00f',
          blueviolet: '8a2be2',
          brown: 'a52a2a',
          burlywood: 'deb887',
          burntsienna: 'ea7e5d',
          cadetblue: '5f9ea0',
          chartreuse: '7fff00',
          chocolate: 'd2691e',
          coral: 'ff7f50',
          cornflowerblue: '6495ed',
          cornsilk: 'fff8dc',
          crimson: 'dc143c',
          cyan: '0ff',
          darkblue: '00008b',
          darkcyan: '008b8b',
          darkgoldenrod: 'b8860b',
          darkgray: 'a9a9a9',
          darkgreen: '006400',
          darkgrey: 'a9a9a9',
          darkkhaki: 'bdb76b',
          darkmagenta: '8b008b',
          darkolivegreen: '556b2f',
          darkorange: 'ff8c00',
          darkorchid: '9932cc',
          darkred: '8b0000',
          darksalmon: 'e9967a',
          darkseagreen: '8fbc8f',
          darkslateblue: '483d8b',
          darkslategray: '2f4f4f',
          darkslategrey: '2f4f4f',
          darkturquoise: '00ced1',
          darkviolet: '9400d3',
          deeppink: 'ff1493',
          deepskyblue: '00bfff',
          dimgray: '696969',
          dimgrey: '696969',
          dodgerblue: '1e90ff',
          firebrick: 'b22222',
          floralwhite: 'fffaf0',
          forestgreen: '228b22',
          fuchsia: 'f0f',
          gainsboro: 'dcdcdc',
          ghostwhite: 'f8f8ff',
          gold: 'ffd700',
          goldenrod: 'daa520',
          gray: '808080',
          green: '008000',
          greenyellow: 'adff2f',
          grey: '808080',
          honeydew: 'f0fff0',
          hotpink: 'ff69b4',
          indianred: 'cd5c5c',
          indigo: '4b0082',
          ivory: 'fffff0',
          khaki: 'f0e68c',
          lavender: 'e6e6fa',
          lavenderblush: 'fff0f5',
          lawngreen: '7cfc00',
          lemonchiffon: 'fffacd',
          lightblue: 'add8e6',
          lightcoral: 'f08080',
          lightcyan: 'e0ffff',
          lightgoldenrodyellow: 'fafad2',
          lightgray: 'd3d3d3',
          lightgreen: '90ee90',
          lightgrey: 'd3d3d3',
          lightpink: 'ffb6c1',
          lightsalmon: 'ffa07a',
          lightseagreen: '20b2aa',
          lightskyblue: '87cefa',
          lightslategray: '789',
          lightslategrey: '789',
          lightsteelblue: 'b0c4de',
          lightyellow: 'ffffe0',
          lime: '0f0',
          limegreen: '32cd32',
          linen: 'faf0e6',
          magenta: 'f0f',
          maroon: '800000',
          mediumaquamarine: '66cdaa',
          mediumblue: '0000cd',
          mediumorchid: 'ba55d3',
          mediumpurple: '9370db',
          mediumseagreen: '3cb371',
          mediumslateblue: '7b68ee',
          mediumspringgreen: '00fa9a',
          mediumturquoise: '48d1cc',
          mediumvioletred: 'c71585',
          midnightblue: '191970',
          mintcream: 'f5fffa',
          mistyrose: 'ffe4e1',
          moccasin: 'ffe4b5',
          navajowhite: 'ffdead',
          navy: '000080',
          oldlace: 'fdf5e6',
          olive: '808000',
          olivedrab: '6b8e23',
          orange: 'ffa500',
          orangered: 'ff4500',
          orchid: 'da70d6',
          palegoldenrod: 'eee8aa',
          palegreen: '98fb98',
          paleturquoise: 'afeeee',
          palevioletred: 'db7093',
          papayawhip: 'ffefd5',
          peachpuff: 'ffdab9',
          peru: 'cd853f',
          pink: 'ffc0cb',
          plum: 'dda0dd',
          powderblue: 'b0e0e6',
          purple: '800080',
          rebeccapurple: '663399',
          red: 'f00',
          rosybrown: 'bc8f8f',
          royalblue: '4169e1',
          saddlebrown: '8b4513',
          salmon: 'fa8072',
          sandybrown: 'f4a460',
          seagreen: '2e8b57',
          seashell: 'fff5ee',
          sienna: 'a0522d',
          silver: 'c0c0c0',
          skyblue: '87ceeb',
          slateblue: '6a5acd',
          slategray: '708090',
          slategrey: '708090',
          snow: 'fffafa',
          springgreen: '00ff7f',
          steelblue: '4682b4',
          tan: 'd2b48c',
          teal: '008080',
          thistle: 'd8bfd8',
          tomato: 'ff6347',
          turquoise: '40e0d0',
          violet: 'ee82ee',
          wheat: 'f5deb3',
          white: 'fff',
          whitesmoke: 'f5f5f5',
          yellow: 'ff0',
          yellowgreen: '9acd32',
        })
        var f = (tinycolor.hexNames = flip(c))
        function flip(t) {
          var r = {}
          for (var e in t) {
            if (t.hasOwnProperty(e)) {
              r[t[e]] = e
            }
          }
          return r
        }
        function boundAlpha(t) {
          t = parseFloat(t)
          if (isNaN(t) || t < 0 || t > 1) {
            t = 1
          }
          return t
        }
        function bound01(t, e) {
          if (isOnePointZero(t)) {
            t = '100%'
          }
          var o = isPercentage(t)
          t = s(e, a(0, parseFloat(t)))
          if (o) {
            t = parseInt(t * e, 10) / 100
          }
          if (r.abs(t - e) < 1e-6) {
            return 1
          }
          return (t % e) / parseFloat(e)
        }
        function clamp01(t) {
          return s(1, a(0, t))
        }
        function parseIntFromHex(t) {
          return parseInt(t, 16)
        }
        function isOnePointZero(t) {
          return (
            typeof t == 'string' && t.indexOf('.') != -1 && parseFloat(t) === 1
          )
        }
        function isPercentage(t) {
          return typeof t === 'string' && t.indexOf('%') != -1
        }
        function pad2(t) {
          return t.length == 1 ? '0' + t : '' + t
        }
        function convertToPercentage(t) {
          if (t <= 1) {
            t = t * 100 + '%'
          }
          return t
        }
        function convertDecimalToHex(t) {
          return r.round(parseFloat(t) * 255).toString(16)
        }
        function convertHexToDecimal(t) {
          return parseIntFromHex(t) / 255
        }
        var h = (function () {
          var t = '[-\\+]?\\d+%?'
          var r = '[-\\+]?\\d*\\.\\d+%?'
          var e = '(?:' + r + ')|(?:' + t + ')'
          var o =
            '[\\s|\\(]+(' +
            e +
            ')[,|\\s]+(' +
            e +
            ')[,|\\s]+(' +
            e +
            ')\\s*\\)?'
          var n =
            '[\\s|\\(]+(' +
            e +
            ')[,|\\s]+(' +
            e +
            ')[,|\\s]+(' +
            e +
            ')[,|\\s]+(' +
            e +
            ')\\s*\\)?'
          return {
            CSS_UNIT: new RegExp(e),
            rgb: new RegExp('rgb' + o),
            rgba: new RegExp('rgba' + n),
            hsl: new RegExp('hsl' + o),
            hsla: new RegExp('hsla' + n),
            hsv: new RegExp('hsv' + o),
            hsva: new RegExp('hsva' + n),
            hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
          }
        })()
        function isValidCSSUnit(t) {
          return !!h.CSS_UNIT.exec(t)
        }
        function stringInputToObject(t) {
          t = t.replace(e, '').replace(o, '').toLowerCase()
          var r = false
          if (c[t]) {
            t = c[t]
            r = true
          } else if (t == 'transparent') {
            return { r: 0, g: 0, b: 0, a: 0, format: 'name' }
          }
          var n
          if ((n = h.rgb.exec(t))) {
            return { r: n[1], g: n[2], b: n[3] }
          }
          if ((n = h.rgba.exec(t))) {
            return { r: n[1], g: n[2], b: n[3], a: n[4] }
          }
          if ((n = h.hsl.exec(t))) {
            return { h: n[1], s: n[2], l: n[3] }
          }
          if ((n = h.hsla.exec(t))) {
            return { h: n[1], s: n[2], l: n[3], a: n[4] }
          }
          if ((n = h.hsv.exec(t))) {
            return { h: n[1], s: n[2], v: n[3] }
          }
          if ((n = h.hsva.exec(t))) {
            return { h: n[1], s: n[2], v: n[3], a: n[4] }
          }
          if ((n = h.hex8.exec(t))) {
            return {
              r: parseIntFromHex(n[1]),
              g: parseIntFromHex(n[2]),
              b: parseIntFromHex(n[3]),
              a: convertHexToDecimal(n[4]),
              format: r ? 'name' : 'hex8',
            }
          }
          if ((n = h.hex6.exec(t))) {
            return {
              r: parseIntFromHex(n[1]),
              g: parseIntFromHex(n[2]),
              b: parseIntFromHex(n[3]),
              format: r ? 'name' : 'hex',
            }
          }
          if ((n = h.hex4.exec(t))) {
            return {
              r: parseIntFromHex(n[1] + '' + n[1]),
              g: parseIntFromHex(n[2] + '' + n[2]),
              b: parseIntFromHex(n[3] + '' + n[3]),
              a: convertHexToDecimal(n[4] + '' + n[4]),
              format: r ? 'name' : 'hex8',
            }
          }
          if ((n = h.hex3.exec(t))) {
            return {
              r: parseIntFromHex(n[1] + '' + n[1]),
              g: parseIntFromHex(n[2] + '' + n[2]),
              b: parseIntFromHex(n[3] + '' + n[3]),
              format: r ? 'name' : 'hex',
            }
          }
          return false
        }
        function validateWCAG2Parms(t) {
          var r, e
          t = t || { level: 'AA', size: 'small' }
          r = (t.level || 'AA').toUpperCase()
          e = (t.size || 'small').toLowerCase()
          if (r !== 'AA' && r !== 'AAA') {
            r = 'AA'
          }
          if (e !== 'small' && e !== 'large') {
            e = 'small'
          }
          return { level: r, size: e }
        }
        if (true && t.exports) {
          t.exports = tinycolor
        } else if (typeof define === 'function' && define.amd) {
          define(function () {
            return tinycolor
          })
        } else {
          window.tinycolor = tinycolor
        }
      })(Math)
    },
    953: (t, r, e) => {
      const o = e(182)
      const n = { r: 256, g: 256, b: 256, a: 1 }
      const i = { h: 360, s: 1, v: 1, a: 1 }
      function stepize(t, r, e) {
        let o = {}
        for (let n in t) {
          if (t.hasOwnProperty(n)) {
            o[n] = e === 0 ? 0 : (r[n] - t[n]) / e
          }
        }
        return o
      }
      function interpolate(t, r, e, o) {
        let n = {}
        for (let i in r) {
          if (r.hasOwnProperty(i)) {
            n[i] = t[i] * e + r[i]
            n[i] = n[i] < 0 ? n[i] + o[i] : o[i] !== 1 ? n[i] % o[i] : n[i]
          }
        }
        return n
      }
      function interpolateRgb(t, r, e) {
        const i = t.color.toRgb()
        const s = r.color.toRgb()
        const a = stepize(i, s, e)
        let l = [t.color]
        for (let t = 1; t < e; t++) {
          const r = interpolate(a, i, t, n)
          l.push(o(r))
        }
        return l
      }
      function interpolateHsv(t, r, e, n) {
        const s = t.color.toHsv()
        const a = r.color.toHsv()
        if (s.s === 0 || a.s === 0) {
          return interpolateRgb(t, r, e)
        }
        let l
        if (typeof n === 'boolean') {
          l = n
        } else {
          const t =
            (s.h < a.h && a.h - s.h < 180) || (s.h > a.h && s.h - a.h > 180)
          l = (n === 'long' && t) || (n === 'short' && !t)
        }
        const c = stepize(s, a, e)
        let f = [t.color]
        let h
        if ((s.h <= a.h && !l) || (s.h >= a.h && l)) {
          h = a.h - s.h
        } else if (l) {
          h = 360 - a.h + s.h
        } else {
          h = 360 - s.h + a.h
        }
        c.h = (Math.pow(-1, l ? 1 : 0) * Math.abs(h)) / e
        for (let t = 1; t < e; t++) {
          const r = interpolate(c, s, t, i)
          f.push(o(r))
        }
        return f
      }
      function computeSubsteps(t, r) {
        const e = t.length
        r = parseInt(r, 10)
        if (isNaN(r) || r < 2) {
          throw new Error('Invalid number of steps (< 2)')
        }
        if (r < e) {
          throw new Error(
            'Number of steps cannot be inferior to number of stops'
          )
        }
        let o = []
        for (let n = 1; n < e; n++) {
          const e = (r - 1) * (t[n].pos - t[n - 1].pos)
          o.push(Math.max(1, Math.round(e)))
        }
        let n = 1
        for (let t = e - 1; t--; ) n += o[t]
        while (n !== r) {
          if (n < r) {
            const t = Math.min.apply(null, o)
            o[o.indexOf(t)]++
            n++
          } else {
            const t = Math.max.apply(null, o)
            o[o.indexOf(t)]--
            n--
          }
        }
        return o
      }
      function computeAt(t, r, e, n) {
        if (r < 0 || r > 1) {
          throw new Error('Position must be between 0 and 1')
        }
        let i, s
        for (let e = 0, o = t.length; e < o - 1; e++) {
          if (r >= t[e].pos && r < t[e + 1].pos) {
            i = t[e]
            s = t[e + 1]
            break
          }
        }
        if (!i) {
          i = s = t[t.length - 1]
        }
        const a = stepize(i.color[e](), s.color[e](), (s.pos - i.pos) * 100)
        const l = interpolate(a, i.color[e](), (r - i.pos) * 100, n)
        return o(l)
      }
      class TinyGradient {
        constructor(t) {
          if (t.length < 2) {
            throw new Error('Invalid number of stops (< 2)')
          }
          const r = t[0].pos !== undefined
          let e = t.length
          let n = -1
          let i = false
          this.stops = t.map((t, s) => {
            const a = t.pos !== undefined
            if (r ^ a) {
              throw new Error(
                'Cannot mix positionned and not posionned color stops'
              )
            }
            if (a) {
              const r = t.color !== undefined
              if (!r && (i || s === 0 || s === e - 1)) {
                throw new Error(
                  'Cannot define two consecutive position-only stops'
                )
              }
              i = !r
              t = { color: r ? o(t.color) : null, colorLess: !r, pos: t.pos }
              if (t.pos < 0 || t.pos > 1) {
                throw new Error('Color stops positions must be between 0 and 1')
              } else if (t.pos < n) {
                throw new Error('Color stops positions are not ordered')
              }
              n = t.pos
            } else {
              t = {
                color: o(t.color !== undefined ? t.color : t),
                pos: s / (e - 1),
              }
            }
            return t
          })
          if (this.stops[0].pos !== 0) {
            this.stops.unshift({ color: this.stops[0].color, pos: 0 })
            e++
          }
          if (this.stops[e - 1].pos !== 1) {
            this.stops.push({ color: this.stops[e - 1].color, pos: 1 })
          }
        }
        reverse() {
          let t = []
          this.stops.forEach(function (r) {
            t.push({ color: r.color, pos: 1 - r.pos })
          })
          return new TinyGradient(t.reverse())
        }
        loop() {
          let t = []
          let r = []
          this.stops.forEach((r) => {
            t.push({ color: r.color, pos: r.pos / 2 })
          })
          this.stops.slice(0, -1).forEach((t) => {
            r.push({ color: t.color, pos: 1 - t.pos / 2 })
          })
          return new TinyGradient(t.concat(r.reverse()))
        }
        rgb(t) {
          const r = computeSubsteps(this.stops, t)
          let e = []
          this.stops.forEach((t, r) => {
            if (t.colorLess) {
              t.color = interpolateRgb(
                this.stops[r - 1],
                this.stops[r + 1],
                2
              )[1]
            }
          })
          for (let t = 0, o = this.stops.length; t < o - 1; t++) {
            const o = interpolateRgb(this.stops[t], this.stops[t + 1], r[t])
            e.splice(e.length, 0, ...o)
          }
          e.push(this.stops[this.stops.length - 1].color)
          return e
        }
        hsv(t, r) {
          const e = computeSubsteps(this.stops, t)
          let o = []
          this.stops.forEach((t, e) => {
            if (t.colorLess) {
              t.color = interpolateHsv(
                this.stops[e - 1],
                this.stops[e + 1],
                2,
                r
              )[1]
            }
          })
          for (let t = 0, n = this.stops.length; t < n - 1; t++) {
            const n = interpolateHsv(this.stops[t], this.stops[t + 1], e[t], r)
            o.splice(o.length, 0, ...n)
          }
          o.push(this.stops[this.stops.length - 1].color)
          return o
        }
        css(t, r) {
          t = t || 'linear'
          r = r || (t === 'linear' ? 'to right' : 'ellipse at center')
          let e = t + '-gradient(' + r
          this.stops.forEach(function (t) {
            e +=
              ', ' +
              (t.colorLess ? '' : t.color.toRgbString() + ' ') +
              t.pos * 100 +
              '%'
          })
          e += ')'
          return e
        }
        rgbAt(t) {
          return computeAt(this.stops, t, 'toRgb', n)
        }
        hsvAt(t) {
          return computeAt(this.stops, t, 'toHsv', i)
        }
      }
      t.exports = function (t) {
        if (arguments.length === 1) {
          if (!Array.isArray(arguments[0])) {
            throw new Error('"stops" is not an array')
          }
          t = arguments[0]
        } else {
          t = Array.prototype.slice.call(arguments)
        }
        return new TinyGradient(t)
      }
    },
    287: (t) => {
      'use strict'
      t.exports = require('jujutsu/dist/compiled/chalk')
    },
  }
  var r = {}
  function __nccwpck_require__(e) {
    var o = r[e]
    if (o !== undefined) {
      return o.exports
    }
    var n = (r[e] = { exports: {} })
    var i = true
    try {
      t[e](n, n.exports, __nccwpck_require__)
      i = false
    } finally {
      if (i) delete r[e]
    }
    return n.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var e = __nccwpck_require__(876)
  module.exports = e
})()
