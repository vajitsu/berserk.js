;(() => {
  var __webpack_modules__ = {
    2547: (e, t, i) => {
      'use strict'
      var s = Object.create
      var n = Object.defineProperty
      var r = Object.getOwnPropertyDescriptor
      var a = Object.getOwnPropertyNames
      var o = Object.getPrototypeOf
      var l = Object.prototype.hasOwnProperty
      var __name = (e, t) => n(e, 'name', { value: t, configurable: true })
      var __export = (e, t) => {
        for (var i in t) n(e, i, { get: t[i], enumerable: true })
      }
      var __copyProps = (e, t, i, s) => {
        if ((t && typeof t === 'object') || typeof t === 'function') {
          for (let o of a(t))
            if (!l.call(e, o) && o !== i)
              n(e, o, {
                get: () => t[o],
                enumerable: !(s = r(t, o)) || s.enumerable,
              })
        }
        return e
      }
      var __reExport = (e, t, i) => (
        __copyProps(e, t, 'default'), i && __copyProps(i, t, 'default')
      )
      var __toESM = (e, t, i) => (
        (i = e != null ? s(o(e)) : {}),
        __copyProps(
          t || !e || !e.__esModule
            ? n(i, 'default', { value: e, enumerable: true })
            : i,
          e
        )
      )
      var __toCommonJS = (e) =>
        __copyProps(n({}, '__esModule', { value: true }), e)
      var __decorateClass = (e, t, i, s) => {
        var a = s > 1 ? void 0 : s ? r(t, i) : t
        for (var o = e.length - 1, l; o >= 0; o--)
          if ((l = e[o])) a = (s ? l(t, i, a) : l(a)) || a
        if (s && a) n(t, i, a)
        return a
      }
      var c = {}
      __export(c, {
        ActionRowBuilder: () => xe,
        ApplicationCommandNumericOptionMinMaxValueMixin: () => ft,
        ApplicationCommandOptionBase: () => et,
        ApplicationCommandOptionChannelTypesMixin: () => dt,
        ApplicationCommandOptionWithChoicesAndAutocompleteMixin: () => Ct,
        BaseSelectMenuBuilder: () => oe,
        ButtonBuilder: () => re,
        ChannelSelectMenuBuilder: () => le,
        ComponentAssertions: () => j,
        ComponentBuilder: () => ie,
        ContextMenuCommandAssertions: () => zt,
        ContextMenuCommandBuilder: () => ei,
        EmbedAssertions: () => d,
        EmbedBuilder: () => O,
        Faces: () => U,
        MentionableSelectMenuBuilder: () => de,
        ModalAssertions: () => De,
        ModalBuilder: () => je,
        RoleSelectMenuBuilder: () => he,
        SelectMenuBuilder: () => pe,
        SelectMenuOptionBuilder: () => B,
        SharedNameAndDescription: () => Ze,
        SharedSlashCommandOptions: () => Ft,
        SlashCommandAssertions: () => Ge,
        SlashCommandAttachmentOption: () => tt,
        SlashCommandBooleanOption: () => st,
        SlashCommandBuilder: () => Vt,
        SlashCommandChannelOption: () => ut,
        SlashCommandIntegerOption: () => Mt,
        SlashCommandMentionableOption: () => Tt,
        SlashCommandNumberOption: () => xt,
        SlashCommandRoleOption: () => Ot,
        SlashCommandStringOption: () => Bt,
        SlashCommandSubcommandBuilder: () => Wt,
        SlashCommandSubcommandGroupBuilder: () => qt,
        SlashCommandUserOption: () => $t,
        StringSelectMenuBuilder: () => pe,
        StringSelectMenuOptionBuilder: () => B,
        TextInputAssertions: () => be,
        TextInputBuilder: () => ke,
        TimestampStyles: () => P,
        UserSelectMenuBuilder: () => ge,
        blockQuote: () => blockQuote,
        bold: () => bold,
        channelLink: () => channelLink,
        channelMention: () => channelMention,
        chatInputApplicationCommandMention: () =>
          chatInputApplicationCommandMention,
        codeBlock: () => codeBlock,
        createComponentBuilder: () => createComponentBuilder,
        disableValidators: () => p,
        embedLength: () => embedLength,
        enableValidators: () => m,
        formatEmoji: () => formatEmoji,
        hideLinkEmbed: () => hideLinkEmbed,
        hyperlink: () => hyperlink,
        inlineCode: () => inlineCode,
        isValidationEnabled: () => f,
        italic: () => italic,
        messageLink: () => messageLink,
        normalizeArray: () => normalizeArray,
        quote: () => quote,
        roleMention: () => roleMention,
        spoiler: () => spoiler,
        strikethrough: () => strikethrough,
        time: () => time,
        underscore: () => underscore,
        userMention: () => userMention,
        version: () => ti,
      })
      e.exports = __toCommonJS(c)
      var d = {}
      __export(d, {
        RGBPredicate: () => T,
        authorNamePredicate: () => C,
        colorPredicate: () => E,
        descriptionPredicate: () => R,
        embedAuthorPredicate: () => I,
        embedFieldPredicate: () => _,
        embedFieldsArrayPredicate: () => b,
        embedFooterPredicate: () => k,
        fieldInlinePredicate: () => y,
        fieldLengthPredicate: () => w,
        fieldNamePredicate: () => g,
        fieldValuePredicate: () => v,
        footerTextPredicate: () => A,
        imageURLPredicate: () => S,
        timestampPredicate: () => x,
        titlePredicate: () => D,
        urlPredicate: () => M,
        validateFieldLength: () => validateFieldLength,
      })
      var u = i(2593)
      var h = true
      var m = __name(() => (h = true), 'enableValidators')
      var p = __name(() => (h = false), 'disableValidators')
      var f = __name(() => h, 'isValidationEnabled')
      var g = u.s.string
        .lengthGreaterThanOrEqual(1)
        .lengthLessThanOrEqual(256)
        .setValidationEnabled(f)
      var v = u.s.string
        .lengthGreaterThanOrEqual(1)
        .lengthLessThanOrEqual(1024)
        .setValidationEnabled(f)
      var y = u.s.boolean.optional
      var _ = u.s
        .object({ name: g, value: v, inline: y })
        .setValidationEnabled(f)
      var b = _.array.setValidationEnabled(f)
      var w = u.s.number.lessThanOrEqual(25).setValidationEnabled(f)
      function validateFieldLength(e, t) {
        w.parse((t?.length ?? 0) + e)
      }
      __name(validateFieldLength, 'validateFieldLength')
      var C = g.nullable.setValidationEnabled(f)
      var S = u.s.string
        .url({ allowedProtocols: ['http:', 'https:', 'attachment:'] })
        .nullish.setValidationEnabled(f)
      var M = u.s.string
        .url({ allowedProtocols: ['http:', 'https:'] })
        .nullish.setValidationEnabled(f)
      var I = u.s
        .object({ name: C, iconURL: S, url: M })
        .setValidationEnabled(f)
      var T = u.s.number.int
        .greaterThanOrEqual(0)
        .lessThanOrEqual(255)
        .setValidationEnabled(f)
      var E = u.s.number.int
        .greaterThanOrEqual(0)
        .lessThanOrEqual(16777215)
        .or(u.s.tuple([T, T, T]))
        .nullable.setValidationEnabled(f)
      var R = u.s.string
        .lengthGreaterThanOrEqual(1)
        .lengthLessThanOrEqual(4096)
        .nullable.setValidationEnabled(f)
      var A = u.s.string
        .lengthGreaterThanOrEqual(1)
        .lengthLessThanOrEqual(2048)
        .nullable.setValidationEnabled(f)
      var k = u.s.object({ text: A, iconURL: S }).setValidationEnabled(f)
      var x = u.s.union(u.s.number, u.s.date).nullable.setValidationEnabled(f)
      var D = g.nullable.setValidationEnabled(f)
      function normalizeArray(e) {
        if (Array.isArray(e[0])) return e[0]
        return e
      }
      __name(normalizeArray, 'normalizeArray')
      var O = class {
        data
        constructor(e = {}) {
          this.data = { ...e }
          if (e.timestamp)
            this.data.timestamp = new Date(e.timestamp).toISOString()
        }
        addFields(...e) {
          e = normalizeArray(e)
          validateFieldLength(e.length, this.data.fields)
          b.parse(e)
          if (this.data.fields) this.data.fields.push(...e)
          else this.data.fields = e
          return this
        }
        spliceFields(e, t, ...i) {
          validateFieldLength(i.length - t, this.data.fields)
          b.parse(i)
          if (this.data.fields) this.data.fields.splice(e, t, ...i)
          else this.data.fields = i
          return this
        }
        setFields(...e) {
          this.spliceFields(
            0,
            this.data.fields?.length ?? 0,
            ...normalizeArray(e)
          )
          return this
        }
        setAuthor(e) {
          if (e === null) {
            this.data.author = void 0
            return this
          }
          I.parse(e)
          this.data.author = { name: e.name, url: e.url, icon_url: e.iconURL }
          return this
        }
        setColor(e) {
          E.parse(e)
          if (Array.isArray(e)) {
            const [t, i, s] = e
            this.data.color = (t << 16) + (i << 8) + s
            return this
          }
          this.data.color = e ?? void 0
          return this
        }
        setDescription(e) {
          R.parse(e)
          this.data.description = e ?? void 0
          return this
        }
        setFooter(e) {
          if (e === null) {
            this.data.footer = void 0
            return this
          }
          k.parse(e)
          this.data.footer = { text: e.text, icon_url: e.iconURL }
          return this
        }
        setImage(e) {
          S.parse(e)
          this.data.image = e ? { url: e } : void 0
          return this
        }
        setThumbnail(e) {
          S.parse(e)
          this.data.thumbnail = e ? { url: e } : void 0
          return this
        }
        setTimestamp(e = Date.now()) {
          x.parse(e)
          this.data.timestamp = e ? new Date(e).toISOString() : void 0
          return this
        }
        setTitle(e) {
          D.parse(e)
          this.data.title = e ?? void 0
          return this
        }
        setURL(e) {
          M.parse(e)
          this.data.url = e ?? void 0
          return this
        }
        toJSON() {
          return { ...this.data }
        }
      }
      __name(O, 'EmbedBuilder')
      function codeBlock(e, t) {
        return typeof t === 'undefined'
          ? `\`\`\`\n${e}\n\`\`\``
          : `\`\`\`${e}\n${t}\n\`\`\``
      }
      __name(codeBlock, 'codeBlock')
      function inlineCode(e) {
        return `\`${e}\``
      }
      __name(inlineCode, 'inlineCode')
      function italic(e) {
        return `_${e}_`
      }
      __name(italic, 'italic')
      function bold(e) {
        return `**${e}**`
      }
      __name(bold, 'bold')
      function underscore(e) {
        return `__${e}__`
      }
      __name(underscore, 'underscore')
      function strikethrough(e) {
        return `~~${e}~~`
      }
      __name(strikethrough, 'strikethrough')
      function quote(e) {
        return `> ${e}`
      }
      __name(quote, 'quote')
      function blockQuote(e) {
        return `>>> ${e}`
      }
      __name(blockQuote, 'blockQuote')
      function hideLinkEmbed(e) {
        return `<${e}>`
      }
      __name(hideLinkEmbed, 'hideLinkEmbed')
      function hyperlink(e, t, i) {
        return i ? `[${e}](${t} "${i}")` : `[${e}](${t})`
      }
      __name(hyperlink, 'hyperlink')
      function spoiler(e) {
        return `||${e}||`
      }
      __name(spoiler, 'spoiler')
      function userMention(e) {
        return `<@${e}>`
      }
      __name(userMention, 'userMention')
      function channelMention(e) {
        return `<#${e}>`
      }
      __name(channelMention, 'channelMention')
      function roleMention(e) {
        return `<@&${e}>`
      }
      __name(roleMention, 'roleMention')
      function chatInputApplicationCommandMention(e, t, i, s) {
        if (typeof s !== 'undefined') {
          return `</${e} ${t} ${i}:${s}>`
        }
        if (typeof i !== 'undefined') {
          return `</${e} ${t}:${i}>`
        }
        return `</${e}:${t}>`
      }
      __name(
        chatInputApplicationCommandMention,
        'chatInputApplicationCommandMention'
      )
      function formatEmoji(e, t = false) {
        return `<${t ? 'a' : ''}:_:${e}>`
      }
      __name(formatEmoji, 'formatEmoji')
      function channelLink(e, t) {
        return `https://discord.com/channels/${t ?? '@me'}/${e}`
      }
      __name(channelLink, 'channelLink')
      function messageLink(e, t, i) {
        return `${
          typeof i === 'undefined' ? channelLink(e) : channelLink(e, i)
        }/${t}`
      }
      __name(messageLink, 'messageLink')
      function time(e, t) {
        if (typeof e !== 'number') {
          e = Math.floor((e?.getTime() ?? Date.now()) / 1e3)
        }
        return typeof t === 'string' ? `<t:${e}:${t}>` : `<t:${e}>`
      }
      __name(time, 'time')
      var P = {
        ShortTime: 't',
        LongTime: 'T',
        ShortDate: 'd',
        LongDate: 'D',
        ShortDateTime: 'f',
        LongDateTime: 'F',
        RelativeTime: 'R',
      }
      var U = ((e) => {
        e['Shrug'] = '¯\\_(ツ)\\_/¯'
        e['Tableflip'] = '(╯°□°）╯︵ ┻━┻'
        e['Unflip'] = '┬─┬ ノ( ゜-゜ノ)'
        return e
      })(U || {})
      var j = {}
      __export(j, {
        buttonLabelValidator: () => q,
        buttonStyleValidator: () => W,
        channelTypesValidator: () => X,
        customIdValidator: () => N,
        defaultValidator: () => Z,
        disabledValidator: () => F,
        emojiValidator: () => $,
        jsonOptionValidator: () => J,
        labelValueDescriptionValidator: () => H,
        minMaxValidator: () => z,
        optionValidator: () => Q,
        optionsLengthValidator: () => Y,
        optionsValidator: () => K,
        placeholderValidator: () => V,
        urlValidator: () => ee,
        validateRequiredButtonParameters: () =>
          validateRequiredButtonParameters,
        validateRequiredSelectMenuOptionParameters: () =>
          validateRequiredSelectMenuOptionParameters,
        validateRequiredSelectMenuParameters: () =>
          validateRequiredSelectMenuParameters,
      })
      var G = i(2593)
      var L = i(2)
      var B = class {
        constructor(e = {}) {
          this.data = e
        }
        setLabel(e) {
          this.data.label = H.parse(e)
          return this
        }
        setValue(e) {
          this.data.value = H.parse(e)
          return this
        }
        setDescription(e) {
          this.data.description = H.parse(e)
          return this
        }
        setDefault(e = true) {
          this.data.default = Z.parse(e)
          return this
        }
        setEmoji(e) {
          this.data.emoji = $.parse(e)
          return this
        }
        toJSON() {
          validateRequiredSelectMenuOptionParameters(
            this.data.label,
            this.data.value
          )
          return { ...this.data }
        }
      }
      __name(B, 'StringSelectMenuOptionBuilder')
      var N = G.s.string
        .lengthGreaterThanOrEqual(1)
        .lengthLessThanOrEqual(100)
        .setValidationEnabled(f)
      var $ = G.s
        .object({ id: G.s.string, name: G.s.string, animated: G.s.boolean })
        .partial.strict.setValidationEnabled(f)
      var F = G.s.boolean
      var q = G.s.string
        .lengthGreaterThanOrEqual(1)
        .lengthLessThanOrEqual(80)
        .setValidationEnabled(f)
      var W = G.s.nativeEnum(L.ButtonStyle)
      var V = G.s.string.lengthLessThanOrEqual(150).setValidationEnabled(f)
      var z = G.s.number.int
        .greaterThanOrEqual(0)
        .lessThanOrEqual(25)
        .setValidationEnabled(f)
      var H = G.s.string
        .lengthGreaterThanOrEqual(1)
        .lengthLessThanOrEqual(100)
        .setValidationEnabled(f)
      var J = G.s
        .object({
          label: H,
          value: H,
          description: H.optional,
          emoji: $.optional,
          default: G.s.boolean.optional,
        })
        .setValidationEnabled(f)
      var Q = G.s.instance(B).setValidationEnabled(f)
      var K = Q.array.lengthGreaterThanOrEqual(0).setValidationEnabled(f)
      var Y = G.s.number.int
        .greaterThanOrEqual(0)
        .lessThanOrEqual(25)
        .setValidationEnabled(f)
      function validateRequiredSelectMenuParameters(e, t) {
        N.parse(t)
        K.parse(e)
      }
      __name(
        validateRequiredSelectMenuParameters,
        'validateRequiredSelectMenuParameters'
      )
      var Z = G.s.boolean
      function validateRequiredSelectMenuOptionParameters(e, t) {
        H.parse(e)
        H.parse(t)
      }
      __name(
        validateRequiredSelectMenuOptionParameters,
        'validateRequiredSelectMenuOptionParameters'
      )
      var X = G.s.nativeEnum(L.ChannelType).array.setValidationEnabled(f)
      var ee = G.s.string
        .url({ allowedProtocols: ['http:', 'https:', 'discord:'] })
        .setValidationEnabled(f)
      function validateRequiredButtonParameters(e, t, i, s, n) {
        if (n && s) {
          throw new RangeError('URL and custom id are mutually exclusive')
        }
        if (!t && !i) {
          throw new RangeError('Buttons must have a label and/or an emoji')
        }
        if (e === L.ButtonStyle.Link) {
          if (!n) {
            throw new RangeError('Link buttons must have a url')
          }
        } else if (n) {
          throw new RangeError('Non-link buttons cannot have a url')
        }
      }
      __name(
        validateRequiredButtonParameters,
        'validateRequiredButtonParameters'
      )
      var te = i(2)
      var ie = class {
        data
        constructor(e) {
          this.data = e
        }
      }
      __name(ie, 'ComponentBuilder')
      var se = i(2)
      var ne = i(2)
      var re = class extends ie {
        constructor(e) {
          super({ type: ne.ComponentType.Button, ...e })
        }
        setStyle(e) {
          this.data.style = W.parse(e)
          return this
        }
        setURL(e) {
          this.data.url = ee.parse(e)
          return this
        }
        setCustomId(e) {
          this.data.custom_id = N.parse(e)
          return this
        }
        setEmoji(e) {
          this.data.emoji = $.parse(e)
          return this
        }
        setDisabled(e = true) {
          this.data.disabled = F.parse(e)
          return this
        }
        setLabel(e) {
          this.data.label = q.parse(e)
          return this
        }
        toJSON() {
          validateRequiredButtonParameters(
            this.data.style,
            this.data.label,
            this.data.emoji,
            this.data.custom_id,
            this.data.url
          )
          return { ...this.data }
        }
      }
      __name(re, 'ButtonBuilder')
      var ae = i(2)
      var oe = class extends ie {
        setPlaceholder(e) {
          this.data.placeholder = V.parse(e)
          return this
        }
        setMinValues(e) {
          this.data.min_values = z.parse(e)
          return this
        }
        setMaxValues(e) {
          this.data.max_values = z.parse(e)
          return this
        }
        setCustomId(e) {
          this.data.custom_id = N.parse(e)
          return this
        }
        setDisabled(e = true) {
          this.data.disabled = F.parse(e)
          return this
        }
        toJSON() {
          N.parse(this.data.custom_id)
          return { ...this.data }
        }
      }
      __name(oe, 'BaseSelectMenuBuilder')
      var le = class extends oe {
        constructor(e) {
          super({ ...e, type: ae.ComponentType.ChannelSelect })
        }
        addChannelTypes(...e) {
          e = normalizeArray(e)
          this.data.channel_types ??= []
          this.data.channel_types.push(...X.parse(e))
          return this
        }
        setChannelTypes(...e) {
          e = normalizeArray(e)
          this.data.channel_types ??= []
          this.data.channel_types.splice(
            0,
            this.data.channel_types.length,
            ...X.parse(e)
          )
          return this
        }
        toJSON() {
          N.parse(this.data.custom_id)
          return { ...this.data }
        }
      }
      __name(le, 'ChannelSelectMenuBuilder')
      var ce = i(2)
      var de = class extends oe {
        constructor(e) {
          super({ ...e, type: ce.ComponentType.MentionableSelect })
        }
      }
      __name(de, 'MentionableSelectMenuBuilder')
      var ue = i(2)
      var he = class extends oe {
        constructor(e) {
          super({ ...e, type: ue.ComponentType.RoleSelect })
        }
      }
      __name(he, 'RoleSelectMenuBuilder')
      var me = i(2)
      var pe = class extends oe {
        options
        constructor(e) {
          const { options: t, ...i } = e ?? {}
          super({ ...i, type: me.ComponentType.StringSelect })
          this.options = t?.map((e) => new B(e)) ?? []
        }
        addOptions(...e) {
          e = normalizeArray(e)
          Y.parse(this.options.length + e.length)
          this.options.push(
            ...e.map((e) => (e instanceof B ? e : new B(J.parse(e))))
          )
          return this
        }
        setOptions(...e) {
          e = normalizeArray(e)
          Y.parse(e.length)
          this.options.splice(
            0,
            this.options.length,
            ...e.map((e) => (e instanceof B ? e : new B(J.parse(e))))
          )
          return this
        }
        toJSON() {
          validateRequiredSelectMenuParameters(
            this.options,
            this.data.custom_id
          )
          return { ...this.data, options: this.options.map((e) => e.toJSON()) }
        }
      }
      __name(pe, 'StringSelectMenuBuilder')
      var fe = i(2)
      var ge = class extends oe {
        constructor(e) {
          super({ ...e, type: fe.ComponentType.UserSelect })
        }
      }
      __name(ge, 'UserSelectMenuBuilder')
      var ve = i(9575)
      var ye = i(2)
      var _e = __toESM(i(1230))
      var be = {}
      __export(be, {
        labelValidator: () => Ae,
        maxLengthValidator: () => Ie,
        minLengthValidator: () => Me,
        placeholderValidator: () => Re,
        requiredValidator: () => Te,
        textInputStyleValidator: () => Se,
        validateRequiredParameters: () => validateRequiredParameters,
        valueValidator: () => Ee,
      })
      var we = i(2593)
      var Ce = i(2)
      var Se = we.s.nativeEnum(Ce.TextInputStyle)
      var Me = we.s.number.int
        .greaterThanOrEqual(0)
        .lessThanOrEqual(4e3)
        .setValidationEnabled(f)
      var Ie = we.s.number.int
        .greaterThanOrEqual(1)
        .lessThanOrEqual(4e3)
        .setValidationEnabled(f)
      var Te = we.s.boolean
      var Ee = we.s.string.lengthLessThanOrEqual(4e3).setValidationEnabled(f)
      var Re = we.s.string.lengthLessThanOrEqual(100).setValidationEnabled(f)
      var Ae = we.s.string
        .lengthGreaterThanOrEqual(1)
        .lengthLessThanOrEqual(45)
        .setValidationEnabled(f)
      function validateRequiredParameters(e, t, i) {
        N.parse(e)
        Se.parse(t)
        Ae.parse(i)
      }
      __name(validateRequiredParameters, 'validateRequiredParameters')
      var ke = class extends ie {
        constructor(e) {
          super({ type: ye.ComponentType.TextInput, ...e })
        }
        setCustomId(e) {
          this.data.custom_id = N.parse(e)
          return this
        }
        setLabel(e) {
          this.data.label = Ae.parse(e)
          return this
        }
        setStyle(e) {
          this.data.style = Se.parse(e)
          return this
        }
        setMinLength(e) {
          this.data.min_length = Me.parse(e)
          return this
        }
        setMaxLength(e) {
          this.data.max_length = Ie.parse(e)
          return this
        }
        setPlaceholder(e) {
          this.data.placeholder = Re.parse(e)
          return this
        }
        setValue(e) {
          this.data.value = Ee.parse(e)
          return this
        }
        setRequired(e = true) {
          this.data.required = Te.parse(e)
          return this
        }
        toJSON() {
          validateRequiredParameters(
            this.data.custom_id,
            this.data.style,
            this.data.label
          )
          return { ...this.data }
        }
        equals(e) {
          if ((0, ve.isJSONEncodable)(e)) {
            return (0, _e.default)(e.toJSON(), this.data)
          }
          return (0, _e.default)(e, this.data)
        }
      }
      __name(ke, 'TextInputBuilder')
      function createComponentBuilder(e) {
        if (e instanceof ie) {
          return e
        }
        switch (e.type) {
          case se.ComponentType.ActionRow:
            return new xe(e)
          case se.ComponentType.Button:
            return new re(e)
          case se.ComponentType.StringSelect:
            return new pe(e)
          case se.ComponentType.TextInput:
            return new ke(e)
          case se.ComponentType.UserSelect:
            return new ge(e)
          case se.ComponentType.RoleSelect:
            return new he(e)
          case se.ComponentType.MentionableSelect:
            return new de(e)
          case se.ComponentType.ChannelSelect:
            return new le(e)
          default:
            throw new Error(
              `Cannot properly serialize component type: ${e.type}`
            )
        }
      }
      __name(createComponentBuilder, 'createComponentBuilder')
      var xe = class extends ie {
        components
        constructor({ components: e, ...t } = {}) {
          super({ type: te.ComponentType.ActionRow, ...t })
          this.components = e?.map((e) => createComponentBuilder(e)) ?? []
        }
        addComponents(...e) {
          this.components.push(...normalizeArray(e))
          return this
        }
        setComponents(...e) {
          this.components.splice(
            0,
            this.components.length,
            ...normalizeArray(e)
          )
          return this
        }
        toJSON() {
          return {
            ...this.data,
            components: this.components.map((e) => e.toJSON()),
          }
        }
      }
      __name(xe, 'ActionRowBuilder')
      var De = {}
      __export(De, {
        componentsValidator: () => Ue,
        titleValidator: () => Pe,
        validateRequiredParameters: () => validateRequiredParameters2,
      })
      var Oe = i(2593)
      var Pe = Oe.s.string
        .lengthGreaterThanOrEqual(1)
        .lengthLessThanOrEqual(45)
        .setValidationEnabled(f)
      var Ue = Oe.s
        .instance(xe)
        .array.lengthGreaterThanOrEqual(1)
        .setValidationEnabled(f)
      function validateRequiredParameters2(e, t, i) {
        N.parse(e)
        Pe.parse(t)
        Ue.parse(i)
      }
      __name(validateRequiredParameters2, 'validateRequiredParameters')
      var je = class {
        data
        components = []
        constructor({ components: e, ...t } = {}) {
          this.data = { ...t }
          this.components = e?.map((e) => createComponentBuilder(e)) ?? []
        }
        setTitle(e) {
          this.data.title = Pe.parse(e)
          return this
        }
        setCustomId(e) {
          this.data.custom_id = N.parse(e)
          return this
        }
        addComponents(...e) {
          this.components.push(
            ...normalizeArray(e).map((e) => (e instanceof xe ? e : new xe(e)))
          )
          return this
        }
        setComponents(...e) {
          this.components.splice(
            0,
            this.components.length,
            ...normalizeArray(e)
          )
          return this
        }
        toJSON() {
          validateRequiredParameters2(
            this.data.custom_id,
            this.data.title,
            this.components
          )
          return {
            ...this.data,
            components: this.components.map((e) => e.toJSON()),
          }
        }
      }
      __name(je, 'ModalBuilder')
      var Ge = {}
      __export(Ge, {
        assertReturnOfBuilder: () => assertReturnOfBuilder,
        localizationMapPredicate: () => ze,
        validateChoicesLength: () => validateChoicesLength,
        validateDMPermission: () => validateDMPermission,
        validateDefaultMemberPermissions: () =>
          validateDefaultMemberPermissions,
        validateDefaultPermission: () => validateDefaultPermission,
        validateDescription: () => validateDescription,
        validateLocale: () => validateLocale,
        validateLocalizationMap: () => validateLocalizationMap,
        validateMaxOptionsLength: () => validateMaxOptionsLength,
        validateName: () => validateName,
        validateRequired: () => validateRequired,
        validateRequiredParameters: () => validateRequiredParameters3,
      })
      var Le = i(2593)
      var Be = i(2)
      var Ne = Le.s.string
        .lengthGreaterThanOrEqual(1)
        .lengthLessThanOrEqual(32)
        .regex(/^[\p{Ll}\p{Lm}\p{Lo}\p{N}\p{sc=Devanagari}\p{sc=Thai}_-]+$/u)
        .setValidationEnabled(f)
      function validateName(e) {
        Ne.parse(e)
      }
      __name(validateName, 'validateName')
      var $e = Le.s.string
        .lengthGreaterThanOrEqual(1)
        .lengthLessThanOrEqual(100)
        .setValidationEnabled(f)
      var Fe = Le.s.nativeEnum(Be.Locale)
      function validateDescription(e) {
        $e.parse(e)
      }
      __name(validateDescription, 'validateDescription')
      var qe = Le.s.unknown.array
        .lengthLessThanOrEqual(25)
        .setValidationEnabled(f)
      function validateLocale(e) {
        return Fe.parse(e)
      }
      __name(validateLocale, 'validateLocale')
      function validateMaxOptionsLength(e) {
        qe.parse(e)
      }
      __name(validateMaxOptionsLength, 'validateMaxOptionsLength')
      function validateRequiredParameters3(e, t, i) {
        validateName(e)
        validateDescription(t)
        validateMaxOptionsLength(i)
      }
      __name(validateRequiredParameters3, 'validateRequiredParameters')
      var We = Le.s.boolean
      function validateDefaultPermission(e) {
        We.parse(e)
      }
      __name(validateDefaultPermission, 'validateDefaultPermission')
      function validateRequired(e) {
        We.parse(e)
      }
      __name(validateRequired, 'validateRequired')
      var Ve = Le.s.number.lessThanOrEqual(25).setValidationEnabled(f)
      function validateChoicesLength(e, t) {
        Ve.parse((t?.length ?? 0) + e)
      }
      __name(validateChoicesLength, 'validateChoicesLength')
      function assertReturnOfBuilder(e, t) {
        Le.s.instance(t).parse(e)
      }
      __name(assertReturnOfBuilder, 'assertReturnOfBuilder')
      var ze = Le.s
        .object(
          Object.fromEntries(
            Object.values(Be.Locale).map((e) => [e, Le.s.string.nullish])
          )
        )
        .strict.nullish.setValidationEnabled(f)
      function validateLocalizationMap(e) {
        ze.parse(e)
      }
      __name(validateLocalizationMap, 'validateLocalizationMap')
      var He = Le.s.boolean.nullish
      function validateDMPermission(e) {
        He.parse(e)
      }
      __name(validateDMPermission, 'validateDMPermission')
      var Je = Le.s.union(
        Le.s.bigint.transform((e) => e.toString()),
        Le.s.number.safeInt.transform((e) => e.toString()),
        Le.s.string.regex(/^\d+$/)
      ).nullish
      function validateDefaultMemberPermissions(e) {
        return Je.parse(e)
      }
      __name(
        validateDefaultMemberPermissions,
        'validateDefaultMemberPermissions'
      )
      var Qe = i(7956)
      var Ke = i(2)
      var Ye = i(7956)
      var Ze = class {
        name
        name_localizations
        description
        description_localizations
        setName(e) {
          validateName(e)
          Reflect.set(this, 'name', e)
          return this
        }
        setDescription(e) {
          validateDescription(e)
          Reflect.set(this, 'description', e)
          return this
        }
        setNameLocalization(e, t) {
          if (!this.name_localizations) {
            Reflect.set(this, 'name_localizations', {})
          }
          const i = validateLocale(e)
          if (t === null) {
            this.name_localizations[i] = null
            return this
          }
          validateName(t)
          this.name_localizations[i] = t
          return this
        }
        setNameLocalizations(e) {
          if (e === null) {
            Reflect.set(this, 'name_localizations', null)
            return this
          }
          Reflect.set(this, 'name_localizations', {})
          for (const t of Object.entries(e)) {
            this.setNameLocalization(...t)
          }
          return this
        }
        setDescriptionLocalization(e, t) {
          if (!this.description_localizations) {
            Reflect.set(this, 'description_localizations', {})
          }
          const i = validateLocale(e)
          if (t === null) {
            this.description_localizations[i] = null
            return this
          }
          validateDescription(t)
          this.description_localizations[i] = t
          return this
        }
        setDescriptionLocalizations(e) {
          if (e === null) {
            Reflect.set(this, 'description_localizations', null)
            return this
          }
          Reflect.set(this, 'description_localizations', {})
          for (const t of Object.entries(e)) {
            this.setDescriptionLocalization(...t)
          }
          return this
        }
      }
      __name(Ze, 'SharedNameAndDescription')
      var Xe = i(2)
      var et = class extends Ze {
        required = false
        setRequired(e) {
          validateRequired(e)
          Reflect.set(this, 'required', e)
          return this
        }
        runRequiredValidations() {
          validateRequiredParameters3(this.name, this.description, [])
          validateLocalizationMap(this.name_localizations)
          validateLocalizationMap(this.description_localizations)
          validateRequired(this.required)
        }
      }
      __name(et, 'ApplicationCommandOptionBase')
      var tt = class extends et {
        type = Xe.ApplicationCommandOptionType.Attachment
        toJSON() {
          this.runRequiredValidations()
          return { ...this }
        }
      }
      __name(tt, 'SlashCommandAttachmentOption')
      var it = i(2)
      var st = class extends et {
        type = it.ApplicationCommandOptionType.Boolean
        toJSON() {
          this.runRequiredValidations()
          return { ...this }
        }
      }
      __name(st, 'SlashCommandBooleanOption')
      var nt = i(2)
      var rt = i(7956)
      var at = i(2593)
      var ot = i(2)
      var lt = [
        ot.ChannelType.GuildText,
        ot.ChannelType.GuildVoice,
        ot.ChannelType.GuildCategory,
        ot.ChannelType.GuildAnnouncement,
        ot.ChannelType.AnnouncementThread,
        ot.ChannelType.PublicThread,
        ot.ChannelType.PrivateThread,
        ot.ChannelType.GuildStageVoice,
        ot.ChannelType.GuildForum,
      ]
      var ct = at.s.array(at.s.union(...lt.map((e) => at.s.literal(e))))
      var dt = class {
        channel_types
        addChannelTypes(...e) {
          if (this.channel_types === void 0) {
            Reflect.set(this, 'channel_types', [])
          }
          this.channel_types.push(...ct.parse(e))
          return this
        }
      }
      __name(dt, 'ApplicationCommandOptionChannelTypesMixin')
      var ut = class extends et {
        type = nt.ApplicationCommandOptionType.Channel
        toJSON() {
          this.runRequiredValidations()
          return { ...this }
        }
      }
      __name(ut, 'SlashCommandChannelOption')
      ut = __decorateClass([(0, rt.mix)(dt)], ut)
      var ht = i(2593)
      var mt = i(2)
      var pt = i(7956)
      var ft = class {
        max_value
        min_value
      }
      __name(ft, 'ApplicationCommandNumericOptionMinMaxValueMixin')
      var gt = i(2593)
      var vt = i(2)
      var yt = gt.s.string
        .lengthGreaterThanOrEqual(1)
        .lengthLessThanOrEqual(100)
      var _t = gt.s.number
        .greaterThan(Number.NEGATIVE_INFINITY)
        .lessThan(Number.POSITIVE_INFINITY)
      var bt = gt.s.object({
        name: yt,
        name_localizations: ze,
        value: gt.s.union(yt, _t),
      }).array
      var wt = gt.s.boolean
      var Ct = class {
        choices
        autocomplete
        type
        addChoices(...e) {
          if (e.length > 0 && this.autocomplete) {
            throw new RangeError(
              'Autocomplete and choices are mutually exclusive to each other.'
            )
          }
          bt.parse(e)
          if (this.choices === void 0) {
            Reflect.set(this, 'choices', [])
          }
          validateChoicesLength(e.length, this.choices)
          for (const { name: t, name_localizations: i, value: s } of e) {
            if (this.type === vt.ApplicationCommandOptionType.String) {
              yt.parse(s)
            } else {
              _t.parse(s)
            }
            this.choices.push({ name: t, name_localizations: i, value: s })
          }
          return this
        }
        setChoices(...e) {
          if (e.length > 0 && this.autocomplete) {
            throw new RangeError(
              'Autocomplete and choices are mutually exclusive to each other.'
            )
          }
          bt.parse(e)
          Reflect.set(this, 'choices', [])
          this.addChoices(...e)
          return this
        }
        setAutocomplete(e) {
          wt.parse(e)
          if (e && Array.isArray(this.choices) && this.choices.length > 0) {
            throw new RangeError(
              'Autocomplete and choices are mutually exclusive to each other.'
            )
          }
          Reflect.set(this, 'autocomplete', e)
          return this
        }
      }
      __name(Ct, 'ApplicationCommandOptionWithChoicesAndAutocompleteMixin')
      var St = ht.s.number.int
      var Mt = class extends et {
        type = mt.ApplicationCommandOptionType.Integer
        setMaxValue(e) {
          St.parse(e)
          Reflect.set(this, 'max_value', e)
          return this
        }
        setMinValue(e) {
          St.parse(e)
          Reflect.set(this, 'min_value', e)
          return this
        }
        toJSON() {
          this.runRequiredValidations()
          if (
            this.autocomplete &&
            Array.isArray(this.choices) &&
            this.choices.length > 0
          ) {
            throw new RangeError(
              'Autocomplete and choices are mutually exclusive to each other.'
            )
          }
          return { ...this }
        }
      }
      __name(Mt, 'SlashCommandIntegerOption')
      Mt = __decorateClass([(0, pt.mix)(ft, Ct)], Mt)
      var It = i(2)
      var Tt = class extends et {
        type = It.ApplicationCommandOptionType.Mentionable
        toJSON() {
          this.runRequiredValidations()
          return { ...this }
        }
      }
      __name(Tt, 'SlashCommandMentionableOption')
      var Et = i(2593)
      var Rt = i(2)
      var At = i(7956)
      var kt = Et.s.number
      var xt = class extends et {
        type = Rt.ApplicationCommandOptionType.Number
        setMaxValue(e) {
          kt.parse(e)
          Reflect.set(this, 'max_value', e)
          return this
        }
        setMinValue(e) {
          kt.parse(e)
          Reflect.set(this, 'min_value', e)
          return this
        }
        toJSON() {
          this.runRequiredValidations()
          if (
            this.autocomplete &&
            Array.isArray(this.choices) &&
            this.choices.length > 0
          ) {
            throw new RangeError(
              'Autocomplete and choices are mutually exclusive to each other.'
            )
          }
          return { ...this }
        }
      }
      __name(xt, 'SlashCommandNumberOption')
      xt = __decorateClass([(0, At.mix)(ft, Ct)], xt)
      var Dt = i(2)
      var Ot = class extends et {
        type = Dt.ApplicationCommandOptionType.Role
        toJSON() {
          this.runRequiredValidations()
          return { ...this }
        }
      }
      __name(Ot, 'SlashCommandRoleOption')
      var Pt = i(2593)
      var Ut = i(2)
      var jt = i(7956)
      var Gt = Pt.s.number.greaterThanOrEqual(0).lessThanOrEqual(6e3)
      var Lt = Pt.s.number.greaterThanOrEqual(1).lessThanOrEqual(6e3)
      var Bt = class extends et {
        type = Ut.ApplicationCommandOptionType.String
        max_length
        min_length
        setMaxLength(e) {
          Lt.parse(e)
          Reflect.set(this, 'max_length', e)
          return this
        }
        setMinLength(e) {
          Gt.parse(e)
          Reflect.set(this, 'min_length', e)
          return this
        }
        toJSON() {
          this.runRequiredValidations()
          if (
            this.autocomplete &&
            Array.isArray(this.choices) &&
            this.choices.length > 0
          ) {
            throw new RangeError(
              'Autocomplete and choices are mutually exclusive to each other.'
            )
          }
          return { ...this }
        }
      }
      __name(Bt, 'SlashCommandStringOption')
      Bt = __decorateClass([(0, jt.mix)(Ct)], Bt)
      var Nt = i(2)
      var $t = class extends et {
        type = Nt.ApplicationCommandOptionType.User
        toJSON() {
          this.runRequiredValidations()
          return { ...this }
        }
      }
      __name($t, 'SlashCommandUserOption')
      var Ft = class {
        options
        addBooleanOption(e) {
          return this._sharedAddOptionMethod(e, st)
        }
        addUserOption(e) {
          return this._sharedAddOptionMethod(e, $t)
        }
        addChannelOption(e) {
          return this._sharedAddOptionMethod(e, ut)
        }
        addRoleOption(e) {
          return this._sharedAddOptionMethod(e, Ot)
        }
        addAttachmentOption(e) {
          return this._sharedAddOptionMethod(e, tt)
        }
        addMentionableOption(e) {
          return this._sharedAddOptionMethod(e, Tt)
        }
        addStringOption(e) {
          return this._sharedAddOptionMethod(e, Bt)
        }
        addIntegerOption(e) {
          return this._sharedAddOptionMethod(e, Mt)
        }
        addNumberOption(e) {
          return this._sharedAddOptionMethod(e, xt)
        }
        _sharedAddOptionMethod(e, t) {
          const { options: i } = this
          validateMaxOptionsLength(i)
          const s = typeof e === 'function' ? e(new t()) : e
          assertReturnOfBuilder(s, t)
          i.push(s)
          return this
        }
      }
      __name(Ft, 'SharedSlashCommandOptions')
      var qt = class {
        name = void 0
        description = void 0
        options = []
        addSubcommand(e) {
          const { options: t } = this
          validateMaxOptionsLength(t)
          const i = typeof e === 'function' ? e(new Wt()) : e
          assertReturnOfBuilder(i, Wt)
          t.push(i)
          return this
        }
        toJSON() {
          validateRequiredParameters3(this.name, this.description, this.options)
          return {
            type: Ke.ApplicationCommandOptionType.SubcommandGroup,
            name: this.name,
            name_localizations: this.name_localizations,
            description: this.description,
            description_localizations: this.description_localizations,
            options: this.options.map((e) => e.toJSON()),
          }
        }
      }
      __name(qt, 'SlashCommandSubcommandGroupBuilder')
      qt = __decorateClass([(0, Ye.mix)(Ze)], qt)
      var Wt = class {
        name = void 0
        description = void 0
        options = []
        toJSON() {
          validateRequiredParameters3(this.name, this.description, this.options)
          return {
            type: Ke.ApplicationCommandOptionType.Subcommand,
            name: this.name,
            name_localizations: this.name_localizations,
            description: this.description,
            description_localizations: this.description_localizations,
            options: this.options.map((e) => e.toJSON()),
          }
        }
      }
      __name(Wt, 'SlashCommandSubcommandBuilder')
      Wt = __decorateClass([(0, Ye.mix)(Ze, Ft)], Wt)
      var Vt = class {
        name = void 0
        name_localizations
        description = void 0
        description_localizations
        options = []
        default_permission = void 0
        default_member_permissions = void 0
        dm_permission = void 0
        toJSON() {
          validateRequiredParameters3(this.name, this.description, this.options)
          validateLocalizationMap(this.name_localizations)
          validateLocalizationMap(this.description_localizations)
          return { ...this, options: this.options.map((e) => e.toJSON()) }
        }
        setDefaultPermission(e) {
          validateDefaultPermission(e)
          Reflect.set(this, 'default_permission', e)
          return this
        }
        setDefaultMemberPermissions(e) {
          const t = validateDefaultMemberPermissions(e)
          Reflect.set(this, 'default_member_permissions', t)
          return this
        }
        setDMPermission(e) {
          validateDMPermission(e)
          Reflect.set(this, 'dm_permission', e)
          return this
        }
        addSubcommandGroup(e) {
          const { options: t } = this
          validateMaxOptionsLength(t)
          const i = typeof e === 'function' ? e(new qt()) : e
          assertReturnOfBuilder(i, qt)
          t.push(i)
          return this
        }
        addSubcommand(e) {
          const { options: t } = this
          validateMaxOptionsLength(t)
          const i = typeof e === 'function' ? e(new Wt()) : e
          assertReturnOfBuilder(i, Wt)
          t.push(i)
          return this
        }
      }
      __name(Vt, 'SlashCommandBuilder')
      Vt = __decorateClass([(0, Qe.mix)(Ft, Ze)], Vt)
      var zt = {}
      __export(zt, {
        validateDMPermission: () => validateDMPermission2,
        validateDefaultMemberPermissions: () =>
          validateDefaultMemberPermissions2,
        validateDefaultPermission: () => validateDefaultPermission2,
        validateName: () => validateName2,
        validateRequiredParameters: () => validateRequiredParameters4,
        validateType: () => validateType,
      })
      var Ht = i(2593)
      var Jt = i(2)
      var Qt = Ht.s.string
        .lengthGreaterThanOrEqual(1)
        .lengthLessThanOrEqual(32)
        .regex(/^( *[\p{P}\p{L}\p{N}\p{sc=Devanagari}\p{sc=Thai}]+ *)+$/u)
        .setValidationEnabled(f)
      var Kt = Ht.s
        .union(
          Ht.s.literal(Jt.ApplicationCommandType.User),
          Ht.s.literal(Jt.ApplicationCommandType.Message)
        )
        .setValidationEnabled(f)
      var Yt = Ht.s.boolean
      function validateDefaultPermission2(e) {
        Yt.parse(e)
      }
      __name(validateDefaultPermission2, 'validateDefaultPermission')
      function validateName2(e) {
        Qt.parse(e)
      }
      __name(validateName2, 'validateName')
      function validateType(e) {
        Kt.parse(e)
      }
      __name(validateType, 'validateType')
      function validateRequiredParameters4(e, t) {
        validateName2(e)
        validateType(t)
      }
      __name(validateRequiredParameters4, 'validateRequiredParameters')
      var Zt = Ht.s.boolean.nullish
      function validateDMPermission2(e) {
        Zt.parse(e)
      }
      __name(validateDMPermission2, 'validateDMPermission')
      var Xt = Ht.s.union(
        Ht.s.bigint.transform((e) => e.toString()),
        Ht.s.number.safeInt.transform((e) => e.toString()),
        Ht.s.string.regex(/^\d+$/)
      ).nullish
      function validateDefaultMemberPermissions2(e) {
        return Xt.parse(e)
      }
      __name(
        validateDefaultMemberPermissions2,
        'validateDefaultMemberPermissions'
      )
      var ei = class {
        name = void 0
        name_localizations
        type = void 0
        default_permission = void 0
        default_member_permissions = void 0
        dm_permission = void 0
        setName(e) {
          validateName2(e)
          Reflect.set(this, 'name', e)
          return this
        }
        setType(e) {
          validateType(e)
          Reflect.set(this, 'type', e)
          return this
        }
        setDefaultPermission(e) {
          validateDefaultPermission2(e)
          Reflect.set(this, 'default_permission', e)
          return this
        }
        setDefaultMemberPermissions(e) {
          const t = validateDefaultMemberPermissions2(e)
          Reflect.set(this, 'default_member_permissions', t)
          return this
        }
        setDMPermission(e) {
          validateDMPermission2(e)
          Reflect.set(this, 'dm_permission', e)
          return this
        }
        setNameLocalization(e, t) {
          if (!this.name_localizations) {
            Reflect.set(this, 'name_localizations', {})
          }
          const i = validateLocale(e)
          if (t === null) {
            this.name_localizations[i] = null
            return this
          }
          validateName2(t)
          this.name_localizations[i] = t
          return this
        }
        setNameLocalizations(e) {
          if (e === null) {
            Reflect.set(this, 'name_localizations', null)
            return this
          }
          Reflect.set(this, 'name_localizations', {})
          for (const t of Object.entries(e)) this.setNameLocalization(...t)
          return this
        }
        toJSON() {
          validateRequiredParameters4(this.name, this.type)
          validateLocalizationMap(this.name_localizations)
          return { ...this }
        }
      }
      __name(ei, 'ContextMenuCommandBuilder')
      function embedLength(e) {
        return (
          (e.title?.length ?? 0) +
          (e.description?.length ?? 0) +
          (e.fields?.reduce((e, t) => e + t.name.length + t.value.length, 0) ??
            0) +
          (e.footer?.text.length ?? 0) +
          (e.author?.name.length ?? 0)
        )
      }
      __name(embedLength, 'embedLength')
      __reExport(c, i(9575), e.exports)
      var ti = '1.4.0'
      0 && 0
    },
    2676: (e) => {
      'use strict'
      var t = Object.defineProperty
      var i = Object.getOwnPropertyDescriptor
      var s = Object.getOwnPropertyNames
      var n = Object.prototype.hasOwnProperty
      var __name = (e, i) => t(e, 'name', { value: i, configurable: true })
      var __export = (e, i) => {
        for (var s in i) t(e, s, { get: i[s], enumerable: true })
      }
      var __copyProps = (e, r, a, o) => {
        if ((r && typeof r === 'object') || typeof r === 'function') {
          for (let l of s(r))
            if (!n.call(e, l) && l !== a)
              t(e, l, {
                get: () => r[l],
                enumerable: !(o = i(r, l)) || o.enumerable,
              })
        }
        return e
      }
      var __toCommonJS = (e) =>
        __copyProps(t({}, '__esModule', { value: true }), e)
      var r = {}
      __export(r, { Collection: () => a, version: () => o })
      e.exports = __toCommonJS(r)
      var a = class extends Map {
        ensure(e, t) {
          if (this.has(e)) return this.get(e)
          if (typeof t !== 'function')
            throw new TypeError(`${t} is not a function`)
          const i = t(e, this)
          this.set(e, i)
          return i
        }
        hasAll(...e) {
          return e.every((e) => super.has(e))
        }
        hasAny(...e) {
          return e.some((e) => super.has(e))
        }
        first(e) {
          if (typeof e === 'undefined') return this.values().next().value
          if (e < 0) return this.last(e * -1)
          e = Math.min(this.size, e)
          const t = this.values()
          return Array.from({ length: e }, () => t.next().value)
        }
        firstKey(e) {
          if (typeof e === 'undefined') return this.keys().next().value
          if (e < 0) return this.lastKey(e * -1)
          e = Math.min(this.size, e)
          const t = this.keys()
          return Array.from({ length: e }, () => t.next().value)
        }
        last(e) {
          const t = [...this.values()]
          if (typeof e === 'undefined') return t[t.length - 1]
          if (e < 0) return this.first(e * -1)
          if (!e) return []
          return t.slice(-e)
        }
        lastKey(e) {
          const t = [...this.keys()]
          if (typeof e === 'undefined') return t[t.length - 1]
          if (e < 0) return this.firstKey(e * -1)
          if (!e) return []
          return t.slice(-e)
        }
        at(e) {
          e = Math.floor(e)
          const t = [...this.values()]
          return t.at(e)
        }
        keyAt(e) {
          e = Math.floor(e)
          const t = [...this.keys()]
          return t.at(e)
        }
        random(e) {
          const t = [...this.values()]
          if (typeof e === 'undefined')
            return t[Math.floor(Math.random() * t.length)]
          if (!t.length || !e) return []
          return Array.from(
            { length: Math.min(e, t.length) },
            () => t.splice(Math.floor(Math.random() * t.length), 1)[0]
          )
        }
        randomKey(e) {
          const t = [...this.keys()]
          if (typeof e === 'undefined')
            return t[Math.floor(Math.random() * t.length)]
          if (!t.length || !e) return []
          return Array.from(
            { length: Math.min(e, t.length) },
            () => t.splice(Math.floor(Math.random() * t.length), 1)[0]
          )
        }
        reverse() {
          const e = [...this.entries()].reverse()
          this.clear()
          for (const [t, i] of e) this.set(t, i)
          return this
        }
        find(e, t) {
          if (typeof e !== 'function')
            throw new TypeError(`${e} is not a function`)
          if (typeof t !== 'undefined') e = e.bind(t)
          for (const [t, i] of this) {
            if (e(i, t, this)) return i
          }
          return void 0
        }
        findKey(e, t) {
          if (typeof e !== 'function')
            throw new TypeError(`${e} is not a function`)
          if (typeof t !== 'undefined') e = e.bind(t)
          for (const [t, i] of this) {
            if (e(i, t, this)) return t
          }
          return void 0
        }
        sweep(e, t) {
          if (typeof e !== 'function')
            throw new TypeError(`${e} is not a function`)
          if (typeof t !== 'undefined') e = e.bind(t)
          const i = this.size
          for (const [t, i] of this) {
            if (e(i, t, this)) this.delete(t)
          }
          return i - this.size
        }
        filter(e, t) {
          if (typeof e !== 'function')
            throw new TypeError(`${e} is not a function`)
          if (typeof t !== 'undefined') e = e.bind(t)
          const i = new this.constructor[Symbol.species]()
          for (const [t, s] of this) {
            if (e(s, t, this)) i.set(t, s)
          }
          return i
        }
        partition(e, t) {
          if (typeof e !== 'function')
            throw new TypeError(`${e} is not a function`)
          if (typeof t !== 'undefined') e = e.bind(t)
          const i = [
            new this.constructor[Symbol.species](),
            new this.constructor[Symbol.species](),
          ]
          for (const [t, s] of this) {
            if (e(s, t, this)) {
              i[0].set(t, s)
            } else {
              i[1].set(t, s)
            }
          }
          return i
        }
        flatMap(e, t) {
          const i = this.map(e, t)
          return new this.constructor[Symbol.species]().concat(...i)
        }
        map(e, t) {
          if (typeof e !== 'function')
            throw new TypeError(`${e} is not a function`)
          if (typeof t !== 'undefined') e = e.bind(t)
          const i = this.entries()
          return Array.from({ length: this.size }, () => {
            const [t, s] = i.next().value
            return e(s, t, this)
          })
        }
        mapValues(e, t) {
          if (typeof e !== 'function')
            throw new TypeError(`${e} is not a function`)
          if (typeof t !== 'undefined') e = e.bind(t)
          const i = new this.constructor[Symbol.species]()
          for (const [t, s] of this) i.set(t, e(s, t, this))
          return i
        }
        some(e, t) {
          if (typeof e !== 'function')
            throw new TypeError(`${e} is not a function`)
          if (typeof t !== 'undefined') e = e.bind(t)
          for (const [t, i] of this) {
            if (e(i, t, this)) return true
          }
          return false
        }
        every(e, t) {
          if (typeof e !== 'function')
            throw new TypeError(`${e} is not a function`)
          if (typeof t !== 'undefined') e = e.bind(t)
          for (const [t, i] of this) {
            if (!e(i, t, this)) return false
          }
          return true
        }
        reduce(e, t) {
          if (typeof e !== 'function')
            throw new TypeError(`${e} is not a function`)
          let i
          if (typeof t !== 'undefined') {
            i = t
            for (const [t, s] of this) i = e(i, s, t, this)
            return i
          }
          let s = true
          for (const [t, n] of this) {
            if (s) {
              i = n
              s = false
              continue
            }
            i = e(i, n, t, this)
          }
          if (s) {
            throw new TypeError(
              'Reduce of empty collection with no initial value'
            )
          }
          return i
        }
        each(e, t) {
          if (typeof e !== 'function')
            throw new TypeError(`${e} is not a function`)
          this.forEach(e, t)
          return this
        }
        tap(e, t) {
          if (typeof e !== 'function')
            throw new TypeError(`${e} is not a function`)
          if (typeof t !== 'undefined') e = e.bind(t)
          e(this)
          return this
        }
        clone() {
          return new this.constructor[Symbol.species](this)
        }
        concat(...e) {
          const t = this.clone()
          for (const i of e) {
            for (const [e, s] of i) t.set(e, s)
          }
          return t
        }
        equals(e) {
          if (!e) return false
          if (this === e) return true
          if (this.size !== e.size) return false
          for (const [t, i] of this) {
            if (!e.has(t) || i !== e.get(t)) {
              return false
            }
          }
          return true
        }
        sort(e = a.defaultSort) {
          const t = [...this.entries()]
          t.sort((t, i) => e(t[1], i[1], t[0], i[0]))
          super.clear()
          for (const [e, i] of t) {
            super.set(e, i)
          }
          return this
        }
        intersect(e) {
          const t = new this.constructor[Symbol.species]()
          for (const [i, s] of e) {
            if (this.has(i) && Object.is(s, this.get(i))) {
              t.set(i, s)
            }
          }
          return t
        }
        subtract(e) {
          const t = new this.constructor[Symbol.species]()
          for (const [i, s] of this) {
            if (!e.has(i) || !Object.is(s, e.get(i))) {
              t.set(i, s)
            }
          }
          return t
        }
        difference(e) {
          const t = new this.constructor[Symbol.species]()
          for (const [i, s] of e) {
            if (!this.has(i)) t.set(i, s)
          }
          for (const [i, s] of this) {
            if (!e.has(i)) t.set(i, s)
          }
          return t
        }
        merge(e, t, i, s) {
          const n = new this.constructor[Symbol.species]()
          const r = new Set([...this.keys(), ...e.keys()])
          for (const a of r) {
            const r = this.has(a)
            const o = e.has(a)
            if (r && o) {
              const t = s(this.get(a), e.get(a), a)
              if (t.keep) n.set(a, t.value)
            } else if (r) {
              const e = t(this.get(a), a)
              if (e.keep) n.set(a, e.value)
            } else if (o) {
              const t = i(e.get(a), a)
              if (t.keep) n.set(a, t.value)
            }
          }
          return n
        }
        sorted(e = a.defaultSort) {
          return new this.constructor[Symbol.species](this).sort((t, i, s, n) =>
            e(t, i, s, n)
          )
        }
        toJSON() {
          return [...this.values()]
        }
        static defaultSort(e, t) {
          return Number(e > t) || Number(e === t) - 1
        }
        static combineEntries(e, t) {
          const i = new a()
          for (const [s, n] of e) {
            if (i.has(s)) {
              i.set(s, t(i.get(s), n, s))
            } else {
              i.set(s, n)
            }
          }
          return i
        }
      }
      __name(a, 'Collection')
      var o = '1.3.0'
      0 && 0
    },
    1372: (e, t, i) => {
      'use strict'
      var s = Object.create
      var n = Object.defineProperty
      var r = Object.getOwnPropertyDescriptor
      var a = Object.getOwnPropertyNames
      var o = Object.getPrototypeOf
      var l = Object.prototype.hasOwnProperty
      var __name = (e, t) => n(e, 'name', { value: t, configurable: true })
      var __export = (e, t) => {
        for (var i in t) n(e, i, { get: t[i], enumerable: true })
      }
      var __copyProps = (e, t, i, s) => {
        if ((t && typeof t === 'object') || typeof t === 'function') {
          for (let o of a(t))
            if (!l.call(e, o) && o !== i)
              n(e, o, {
                get: () => t[o],
                enumerable: !(s = r(t, o)) || s.enumerable,
              })
        }
        return e
      }
      var __toESM = (e, t, i) => (
        (i = e != null ? s(o(e)) : {}),
        __copyProps(
          t || !e || !e.__esModule
            ? n(i, 'default', { value: e, enumerable: true })
            : i,
          e
        )
      )
      var __toCommonJS = (e) =>
        __copyProps(n({}, '__esModule', { value: true }), e)
      var c = {}
      __export(c, {
        ALLOWED_EXTENSIONS: () => v,
        ALLOWED_SIZES: () => _,
        ALLOWED_STICKER_EXTENSIONS: () => y,
        CDN: () => b,
        DefaultRestOptions: () => f,
        DefaultUserAgent: () => p,
        DiscordAPIError: () => w,
        HTTPError: () => S,
        REST: () => H,
        RESTEvents: () => g,
        RateLimitError: () => M,
        RequestManager: () => V,
        RequestMethod: () => W,
        makeURLSearchParams: () => makeURLSearchParams,
        parseResponse: () => parseResponse,
        version: () => J,
      })
      e.exports = __toCommonJS(c)
      var d = i(7310)
      var u = __toESM(i(7282))
      var h = i(2)
      var m = i(1798)
      var p = `DiscordBot (https://discord.js.org, 1.4.0)`
      var f = {
        get agent() {
          return new m.Agent({ connect: { timeout: 3e4 } })
        },
        api: 'https://discord.com/api',
        authPrefix: 'Bot',
        cdn: 'https://cdn.discordapp.com',
        headers: {},
        invalidRequestWarningInterval: 0,
        globalRequestsPerSecond: 50,
        offset: 50,
        rejectOnRateLimit: null,
        retries: 3,
        timeout: 15e3,
        userAgentAppendix: `Node.js ${u.default.version}`,
        version: h.APIVersion,
        hashSweepInterval: 144e5,
        hashLifetime: 864e5,
        handlerSweepInterval: 36e5,
      }
      var g = ((e) => {
        e['Debug'] = 'restDebug'
        e['HandlerSweep'] = 'handlerSweep'
        e['HashSweep'] = 'hashSweep'
        e['InvalidRequestWarning'] = 'invalidRequestWarning'
        e['RateLimited'] = 'rateLimited'
        e['Response'] = 'response'
        return e
      })(g || {})
      var v = ['webp', 'png', 'jpg', 'jpeg', 'gif']
      var y = ['png', 'json']
      var _ = [16, 32, 64, 128, 256, 512, 1024, 2048, 4096]
      var b = class {
        constructor(e = f.cdn) {
          this.base = e
        }
        appAsset(e, t, i) {
          return this.makeURL(`/app-assets/${e}/${t}`, i)
        }
        appIcon(e, t, i) {
          return this.makeURL(`/app-icons/${e}/${t}`, i)
        }
        avatar(e, t, i) {
          return this.dynamicMakeURL(`/avatars/${e}/${t}`, t, i)
        }
        banner(e, t, i) {
          return this.dynamicMakeURL(`/banners/${e}/${t}`, t, i)
        }
        channelIcon(e, t, i) {
          return this.makeURL(`/channel-icons/${e}/${t}`, i)
        }
        defaultAvatar(e) {
          return this.makeURL(`/embed/avatars/${e}`, { extension: 'png' })
        }
        discoverySplash(e, t, i) {
          return this.makeURL(`/discovery-splashes/${e}/${t}`, i)
        }
        emoji(e, t) {
          return this.makeURL(`/emojis/${e}`, { extension: t })
        }
        guildMemberAvatar(e, t, i, s) {
          return this.dynamicMakeURL(
            `/guilds/${e}/users/${t}/avatars/${i}`,
            i,
            s
          )
        }
        guildMemberBanner(e, t, i, s) {
          return this.dynamicMakeURL(`/guilds/${e}/users/${t}/banner`, i, s)
        }
        icon(e, t, i) {
          return this.dynamicMakeURL(`/icons/${e}/${t}`, t, i)
        }
        roleIcon(e, t, i) {
          return this.makeURL(`/role-icons/${e}/${t}`, i)
        }
        splash(e, t, i) {
          return this.makeURL(`/splashes/${e}/${t}`, i)
        }
        sticker(e, t) {
          return this.makeURL(`/stickers/${e}`, {
            allowedExtensions: y,
            extension: t ?? 'png',
          })
        }
        stickerPackBanner(e, t) {
          return this.makeURL(`/app-assets/710982414301790216/store/${e}`, t)
        }
        teamIcon(e, t, i) {
          return this.makeURL(`/team-icons/${e}/${t}`, i)
        }
        guildScheduledEventCover(e, t, i) {
          return this.makeURL(`/guild-events/${e}/${t}`, i)
        }
        dynamicMakeURL(e, t, { forceStatic: i = false, ...s } = {}) {
          return this.makeURL(
            e,
            !i && t.startsWith('a_') ? { ...s, extension: 'gif' } : s
          )
        }
        makeURL(
          e,
          { allowedExtensions: t = v, extension: i = 'webp', size: s } = {}
        ) {
          i = String(i).toLowerCase()
          if (!t.includes(i)) {
            throw new RangeError(
              `Invalid extension provided: ${i}\nMust be one of: ${t.join(
                ', '
              )}`
            )
          }
          if (s && !_.includes(s)) {
            throw new RangeError(
              `Invalid size provided: ${s}\nMust be one of: ${_.join(', ')}`
            )
          }
          const n = new d.URL(`${this.base}${e}.${i}`)
          if (s) {
            n.searchParams.set('size', String(s))
          }
          return n.toString()
        }
      }
      __name(b, 'CDN')
      function isErrorGroupWrapper(e) {
        return Reflect.has(e, '_errors')
      }
      __name(isErrorGroupWrapper, 'isErrorGroupWrapper')
      function isErrorResponse(e) {
        return typeof Reflect.get(e, 'message') === 'string'
      }
      __name(isErrorResponse, 'isErrorResponse')
      var w = class extends Error {
        constructor(e, t, i, s, n, r) {
          super(w.getMessage(e))
          this.rawError = e
          this.code = t
          this.status = i
          this.method = s
          this.url = n
          this.requestBody = { files: r.files, json: r.body }
        }
        requestBody
        get name() {
          return `${w.name}[${this.code}]`
        }
        static getMessage(e) {
          let t = ''
          if ('code' in e) {
            if (e.errors) {
              t = [...this.flattenDiscordError(e.errors)].join('\n')
            }
            return e.message && t
              ? `${e.message}\n${t}`
              : e.message || t || 'Unknown Error'
          }
          return e.error_description ?? 'No Description'
        }
        static *flattenDiscordError(e, t = '') {
          if (isErrorResponse(e)) {
            return yield `${t.length ? `${t}[${e.code}]` : `${e.code}`}: ${
              e.message
            }`.trim()
          }
          for (const [i, s] of Object.entries(e)) {
            const e = i.startsWith('_')
              ? t
              : t
              ? Number.isNaN(Number(i))
                ? `${t}.${i}`
                : `${t}[${i}]`
              : i
            if (typeof s === 'string') {
              yield s
            } else if (isErrorGroupWrapper(s)) {
              for (const t of s._errors) {
                yield* this.flattenDiscordError(t, e)
              }
            } else {
              yield* this.flattenDiscordError(s, e)
            }
          }
        }
      }
      __name(w, 'DiscordAPIError')
      var C = i(3685)
      var S = class extends Error {
        constructor(e, t, i, s) {
          super(C.STATUS_CODES[e])
          this.status = e
          this.method = t
          this.url = i
          this.requestBody = { files: s.files, json: s.body }
        }
        requestBody
        name = S.name
      }
      __name(S, 'HTTPError')
      var M = class extends Error {
        timeToReset
        limit
        method
        hash
        url
        route
        majorParameter
        global
        constructor({
          timeToReset: e,
          limit: t,
          method: i,
          hash: s,
          url: n,
          route: r,
          majorParameter: a,
          global: o,
        }) {
          super()
          this.timeToReset = e
          this.limit = t
          this.method = i
          this.hash = s
          this.url = n
          this.route = r
          this.majorParameter = a
          this.global = o
        }
        get name() {
          return `${M.name}[${this.route}]`
        }
      }
      __name(M, 'RateLimitError')
      var I = i(4300)
      var T = i(2361)
      var E = i(9512)
      var R = i(2676)
      var A = i(9575)
      var k = i(8673)
      var x = i(1798)
      var D = i(9512)
      var O = i(8670)
      var P = i(5010)
      var U = i(1798)
      var j = i(4300)
      var G = i(7310)
      var L = i(3837)
      var B = i(1798)
      function parseHeader(e) {
        if (e === void 0 || typeof e === 'string') {
          return e
        }
        return e.join(';')
      }
      __name(parseHeader, 'parseHeader')
      function serializeSearchParam(e) {
        switch (typeof e) {
          case 'string':
            return e
          case 'number':
          case 'bigint':
          case 'boolean':
            return e.toString()
          case 'object':
            if (e === null) return null
            if (e instanceof Date) {
              return Number.isNaN(e.getTime()) ? null : e.toISOString()
            }
            if (
              typeof e.toString === 'function' &&
              e.toString !== Object.prototype.toString
            )
              return e.toString()
            return null
          default:
            return null
        }
      }
      __name(serializeSearchParam, 'serializeSearchParam')
      function makeURLSearchParams(e) {
        const t = new G.URLSearchParams()
        if (!e) return t
        for (const [i, s] of Object.entries(e)) {
          const e = serializeSearchParam(s)
          if (e !== null) t.append(i, e)
        }
        return t
      }
      __name(makeURLSearchParams, 'makeURLSearchParams')
      async function parseResponse(e) {
        const t = parseHeader(e.headers['content-type'])
        if (t?.startsWith('application/json')) {
          return e.body.json()
        }
        return e.body.arrayBuffer()
      }
      __name(parseResponse, 'parseResponse')
      function hasSublimit(e, t, i) {
        if (e === '/channels/:id') {
          if (typeof t !== 'object' || t === null) return false
          if (i !== 'PATCH') return false
          const e = t
          return ['name', 'topic'].some((t) => Reflect.has(e, t))
        }
        return true
      }
      __name(hasSublimit, 'hasSublimit')
      async function resolveBody(e) {
        if (e == null) {
          return null
        } else if (typeof e === 'string') {
          return e
        } else if (L.types.isUint8Array(e)) {
          return e
        } else if (L.types.isArrayBuffer(e)) {
          return new Uint8Array(e)
        } else if (e instanceof G.URLSearchParams) {
          return e.toString()
        } else if (e instanceof DataView) {
          return new Uint8Array(e.buffer)
        } else if (e instanceof j.Blob) {
          return new Uint8Array(await e.arrayBuffer())
        } else if (e instanceof B.FormData) {
          return e
        } else if (e[Symbol.iterator]) {
          const t = [...e]
          const i = t.reduce((e, t) => e + t.length, 0)
          const s = new Uint8Array(i)
          let n = 0
          return t.reduce((e, t) => {
            e.set(t, n)
            n += t.length
            return e
          }, s)
        } else if (e[Symbol.asyncIterator]) {
          const t = []
          for await (const i of e) {
            t.push(i)
          }
          return j.Buffer.concat(t)
        }
        throw new TypeError(`Unable to resolve body.`)
      }
      __name(resolveBody, 'resolveBody')
      function shouldRetry(e) {
        if (e.name === 'AbortError') return true
        return (
          ('code' in e && e.code === 'ECONNRESET') ||
          e.message.includes('ECONNRESET')
        )
      }
      __name(shouldRetry, 'shouldRetry')
      var N = 0
      var $ = null
      var F = class {
        constructor(e, t, i) {
          this.manager = e
          this.hash = t
          this.majorParameter = i
          this.id = `${t}:${i}`
        }
        id
        reset = -1
        remaining = 1
        limit = Number.POSITIVE_INFINITY
        #e = new P.AsyncQueue()
        #t = null
        #i = null
        #s = false
        get inactive() {
          return (
            this.#e.remaining === 0 &&
            (this.#t === null || this.#t.remaining === 0) &&
            !this.limited
          )
        }
        get globalLimited() {
          return (
            this.manager.globalRemaining <= 0 &&
            Date.now() < this.manager.globalReset
          )
        }
        get localLimited() {
          return this.remaining <= 0 && Date.now() < this.reset
        }
        get limited() {
          return this.globalLimited || this.localLimited
        }
        get timeToReset() {
          return this.reset + this.manager.options.offset - Date.now()
        }
        debug(e) {
          this.manager.emit('restDebug', `[REST ${this.id}] ${e}`)
        }
        async globalDelayFor(e) {
          await (0, O.setTimeout)(e)
          this.manager.globalDelay = null
        }
        async onRateLimit(e) {
          const { options: t } = this.manager
          if (!t.rejectOnRateLimit) return
          const i =
            typeof t.rejectOnRateLimit === 'function'
              ? await t.rejectOnRateLimit(e)
              : t.rejectOnRateLimit.some((t) =>
                  e.route.startsWith(t.toLowerCase())
                )
          if (i) {
            throw new M(e)
          }
        }
        async queueRequest(e, t, i, s) {
          let n = this.#e
          let r = 0
          if (this.#t && hasSublimit(e.bucketRoute, s.body, i.method)) {
            n = this.#t
            r = 1
          }
          await n.wait({ signal: s.signal })
          if (r === 0) {
            if (this.#t && hasSublimit(e.bucketRoute, s.body, i.method)) {
              n = this.#t
              const e = n.wait()
              this.#e.shift()
              await e
            } else if (this.#i) {
              await this.#i.promise
            }
          }
          try {
            return await this.runRequest(e, t, i, s)
          } finally {
            n.shift()
            if (this.#s) {
              this.#s = false
              this.#t?.shift()
            }
            if (this.#t?.remaining === 0) {
              this.#i?.resolve()
              this.#t = null
            }
          }
        }
        async runRequest(e, t, i, s, n = 0) {
          while (this.limited) {
            const s = this.globalLimited
            let n
            let r
            let a
            if (s) {
              n = this.manager.options.globalRequestsPerSecond
              r =
                this.manager.globalReset +
                this.manager.options.offset -
                Date.now()
              if (!this.manager.globalDelay) {
                this.manager.globalDelay = this.globalDelayFor(r)
              }
              a = this.manager.globalDelay
            } else {
              n = this.limit
              r = this.timeToReset
              a = (0, O.setTimeout)(r)
            }
            const o = {
              timeToReset: r,
              limit: n,
              method: i.method ?? 'get',
              hash: this.hash,
              url: t,
              route: e.bucketRoute,
              majorParameter: this.majorParameter,
              global: s,
            }
            this.manager.emit('rateLimited', o)
            await this.onRateLimit(o)
            if (s) {
              this.debug(
                `Global rate limit hit, blocking all requests for ${r}ms`
              )
            } else {
              this.debug(`Waiting ${r}ms for rate limit to pass`)
            }
            await a
          }
          if (
            !this.manager.globalReset ||
            this.manager.globalReset < Date.now()
          ) {
            this.manager.globalReset = Date.now() + 1e3
            this.manager.globalRemaining =
              this.manager.options.globalRequestsPerSecond
          }
          this.manager.globalRemaining--
          const r = i.method ?? 'get'
          const a = new AbortController()
          const o = (0, D.setTimeout)(
            () => a.abort(),
            this.manager.options.timeout
          ).unref()
          if (s.signal) {
            const e = s.signal
            if (e.aborted) a.abort()
            else e.addEventListener('abort', () => a.abort())
          }
          let l
          try {
            l = await (0, U.request)(t, { ...i, signal: a.signal })
          } catch (r) {
            if (!(r instanceof Error)) throw r
            if (shouldRetry(r) && n !== this.manager.options.retries) {
              return await this.runRequest(e, t, i, s, ++n)
            }
            throw r
          } finally {
            ;(0, D.clearTimeout)(o)
          }
          if (this.manager.listenerCount('response')) {
            this.manager.emit(
              'response',
              {
                method: r,
                path: e.original,
                route: e.bucketRoute,
                options: i,
                data: s,
                retries: n,
              },
              { ...l }
            )
          }
          const c = l.statusCode
          let d = 0
          const u = parseHeader(l.headers['x-ratelimit-limit'])
          const h = parseHeader(l.headers['x-ratelimit-remaining'])
          const m = parseHeader(l.headers['x-ratelimit-reset-after'])
          const p = parseHeader(l.headers['x-ratelimit-bucket'])
          const f = parseHeader(l.headers['retry-after'])
          this.limit = u ? Number(u) : Number.POSITIVE_INFINITY
          this.remaining = h ? Number(h) : 1
          this.reset = m
            ? Number(m) * 1e3 + Date.now() + this.manager.options.offset
            : Date.now()
          if (f) d = Number(f) * 1e3 + this.manager.options.offset
          if (p && p !== this.hash) {
            this.debug(
              [
                'Received bucket hash update',
                `  Old Hash  : ${this.hash}`,
                `  New Hash  : ${p}`,
              ].join('\n')
            )
            this.manager.hashes.set(`${r}:${e.bucketRoute}`, {
              value: p,
              lastAccess: Date.now(),
            })
          } else if (p) {
            const t = this.manager.hashes.get(`${r}:${e.bucketRoute}`)
            if (t) {
              t.lastAccess = Date.now()
            }
          }
          let g = null
          if (d > 0) {
            if (l.headers['x-ratelimit-global'] !== void 0) {
              this.manager.globalRemaining = 0
              this.manager.globalReset = Date.now() + d
            } else if (!this.localLimited) {
              g = d
            }
          }
          if (c === 401 || c === 403 || c === 429) {
            if (!$ || $ < Date.now()) {
              $ = Date.now() + 1e3 * 60 * 10
              N = 0
            }
            N++
            const e =
              this.manager.options.invalidRequestWarningInterval > 0 &&
              N % this.manager.options.invalidRequestWarningInterval === 0
            if (e) {
              this.manager.emit('invalidRequestWarning', {
                count: N,
                remainingTime: $ - Date.now(),
              })
            }
          }
          if (c >= 200 && c < 300) {
            return l
          } else if (c === 429) {
            const a = this.globalLimited
            let o
            let l
            if (a) {
              o = this.manager.options.globalRequestsPerSecond
              l =
                this.manager.globalReset +
                this.manager.options.offset -
                Date.now()
            } else {
              o = this.limit
              l = this.timeToReset
            }
            await this.onRateLimit({
              timeToReset: l,
              limit: o,
              method: r,
              hash: this.hash,
              url: t,
              route: e.bucketRoute,
              majorParameter: this.majorParameter,
              global: a,
            })
            this.debug(
              [
                'Encountered unexpected 429 rate limit',
                `  Global         : ${a.toString()}`,
                `  Method         : ${r}`,
                `  URL            : ${t}`,
                `  Bucket         : ${e.bucketRoute}`,
                `  Major parameter: ${e.majorParameter}`,
                `  Hash           : ${this.hash}`,
                `  Limit          : ${o}`,
                `  Retry After    : ${d}ms`,
                `  Sublimit       : ${g ? `${g}ms` : 'None'}`,
              ].join('\n')
            )
            if (g) {
              const e = !this.#t
              if (e) {
                this.#t = new P.AsyncQueue()
                void this.#t.wait()
                this.#e.shift()
              }
              this.#i?.resolve()
              this.#i = null
              await (0, O.setTimeout)(g)
              let t
              const i = new Promise((e) => (t = e))
              this.#i = { promise: i, resolve: t }
              if (e) {
                await this.#e.wait()
                this.#s = true
              }
            }
            return this.runRequest(e, t, i, s, n)
          } else if (c >= 500 && c < 600) {
            if (n !== this.manager.options.retries) {
              return this.runRequest(e, t, i, s, ++n)
            }
            throw new S(c, r, t, s)
          } else {
            if (c >= 400 && c < 500) {
              if (c === 401 && s.auth) {
                this.manager.setToken(null)
              }
              const e = await parseResponse(l)
              throw new w(e, 'code' in e ? e.code : e.error, c, r, t, s)
            }
            return l
          }
        }
      }
      __name(F, 'SequentialHandler')
      var q = (0, A.lazy)(async () => i.e(82).then(i.bind(i, 8633)))
      var W = ((e) => {
        e['Delete'] = 'DELETE'
        e['Get'] = 'GET'
        e['Patch'] = 'PATCH'
        e['Post'] = 'POST'
        e['Put'] = 'PUT'
        return e
      })(W || {})
      var V = class extends T.EventEmitter {
        agent = null
        globalRemaining
        globalDelay = null
        globalReset = -1
        hashes = new R.Collection()
        handlers = new R.Collection()
        #n = null
        hashTimer
        handlerTimer
        options
        constructor(e) {
          super()
          this.options = { ...f, ...e }
          this.options.offset = Math.max(0, this.options.offset)
          this.globalRemaining = this.options.globalRequestsPerSecond
          this.agent = e.agent ?? null
          this.setupSweepers()
        }
        setupSweepers() {
          const e = __name((e) => {
            if (e > 144e5) {
              throw new Error('Cannot set an interval greater than 4 hours')
            }
          }, 'validateMaxInterval')
          if (
            this.options.hashSweepInterval !== 0 &&
            this.options.hashSweepInterval !== Number.POSITIVE_INFINITY
          ) {
            e(this.options.hashSweepInterval)
            this.hashTimer = (0, E.setInterval)(() => {
              const e = new R.Collection()
              const t = Date.now()
              this.hashes.sweep((i, s) => {
                if (i.lastAccess === -1) return false
                const n =
                  Math.floor(t - i.lastAccess) > this.options.hashLifetime
                if (n) {
                  e.set(s, i)
                }
                this.emit(
                  'restDebug',
                  `Hash ${i.value} for ${s} swept due to lifetime being exceeded`
                )
                return n
              })
              this.emit('hashSweep', e)
            }, this.options.hashSweepInterval).unref()
          }
          if (
            this.options.handlerSweepInterval !== 0 &&
            this.options.handlerSweepInterval !== Number.POSITIVE_INFINITY
          ) {
            e(this.options.handlerSweepInterval)
            this.handlerTimer = (0, E.setInterval)(() => {
              const e = new R.Collection()
              this.handlers.sweep((t, i) => {
                const { inactive: s } = t
                if (s) {
                  e.set(i, t)
                }
                this.emit(
                  'restDebug',
                  `Handler ${t.id} for ${i} swept due to being inactive`
                )
                return s
              })
              this.emit('handlerSweep', e)
            }, this.options.handlerSweepInterval).unref()
          }
        }
        setAgent(e) {
          this.agent = e
          return this
        }
        setToken(e) {
          this.#n = e
          return this
        }
        async queueRequest(e) {
          const t = V.generateRouteData(e.fullRoute, e.method)
          const i = this.hashes.get(`${e.method}:${t.bucketRoute}`) ?? {
            value: `Global(${e.method}:${t.bucketRoute})`,
            lastAccess: -1,
          }
          const s =
            this.handlers.get(`${i.value}:${t.majorParameter}`) ??
            this.createHandler(i.value, t.majorParameter)
          const { url: n, fetchOptions: r } = await this.resolveRequest(e)
          return s.queueRequest(t, n, r, {
            body: e.body,
            files: e.files,
            auth: e.auth !== false,
            signal: e.signal,
          })
        }
        createHandler(e, t) {
          const i = new F(this, e, t)
          this.handlers.set(i.id, i)
          return i
        }
        async resolveRequest(e) {
          const { options: t } = this
          let i = ''
          if (e.query) {
            const t = e.query.toString()
            if (t !== '') {
              i = `?${t}`
            }
          }
          const s = {
            ...this.options.headers,
            'User-Agent': `${p} ${t.userAgentAppendix}`.trim(),
          }
          if (e.auth !== false) {
            if (!this.#n) {
              throw new Error(
                'Expected token to be set for this request, but none was present'
              )
            }
            s.Authorization = `${e.authPrefix ?? this.options.authPrefix} ${
              this.#n
            }`
          }
          if (e.reason?.length) {
            s['X-Audit-Log-Reason'] = encodeURIComponent(e.reason)
          }
          const n = `${t.api}${e.versioned === false ? '' : `/v${t.version}`}${
            e.fullRoute
          }${i}`
          let r
          let a = {}
          if (e.files?.length) {
            const t = new x.FormData()
            for (const [i, s] of e.files.entries()) {
              const e = s.key ?? `files[${i}]`
              if (I.Buffer.isBuffer(s.data)) {
                const { fileTypeFromBuffer: i } = await q()
                const n = s.contentType ?? (await i(s.data))?.mime
                t.append(e, new I.Blob([s.data], { type: n }), s.name)
              } else {
                t.append(
                  e,
                  new I.Blob([`${s.data}`], { type: s.contentType }),
                  s.name
                )
              }
            }
            if (e.body != null) {
              if (e.appendToFormData) {
                for (const [i, s] of Object.entries(e.body)) {
                  t.append(i, s)
                }
              } else {
                t.append('payload_json', JSON.stringify(e.body))
              }
            }
            r = t
          } else if (e.body != null) {
            if (e.passThroughBody) {
              r = e.body
            } else {
              r = JSON.stringify(e.body)
              a = { 'Content-Type': 'application/json' }
            }
          }
          r = await resolveBody(r)
          const o = {
            headers: { ...e.headers, ...a, ...s },
            method: e.method.toUpperCase(),
          }
          if (r !== void 0) {
            o.body = r
          }
          o.dispatcher = e.dispatcher ?? this.agent ?? void 0
          return { url: n, fetchOptions: o }
        }
        clearHashSweeper() {
          ;(0, E.clearInterval)(this.hashTimer)
        }
        clearHandlerSweeper() {
          ;(0, E.clearInterval)(this.handlerTimer)
        }
        static generateRouteData(e, t) {
          const i = /^\/(?:channels|guilds|webhooks)\/(\d{16,19})/.exec(e)
          const s = i?.[1] ?? 'global'
          const n = e
            .replaceAll(/\d{16,19}/g, ':id')
            .replace(/\/reactions\/(.*)/, '/reactions/:reaction')
          let r = ''
          if (t === 'DELETE' && n === '/channels/:id/messages/:id') {
            const t = /\d{16,19}$/.exec(e)[0]
            const i = k.DiscordSnowflake.timestampFrom(t)
            if (Date.now() - i > 1e3 * 60 * 60 * 24 * 14) {
              r += '/Delete Old Message'
            }
          }
          return { majorParameter: s, bucketRoute: n + r, original: e }
        }
      }
      __name(V, 'RequestManager')
      var z = i(2361)
      var H = class extends z.EventEmitter {
        cdn
        requestManager
        constructor(e = {}) {
          super()
          this.cdn = new b(e.cdn ?? f.cdn)
          this.requestManager = new V(e)
            .on('restDebug', this.emit.bind(this, 'restDebug'))
            .on('rateLimited', this.emit.bind(this, 'rateLimited'))
            .on(
              'invalidRequestWarning',
              this.emit.bind(this, 'invalidRequestWarning')
            )
            .on('hashSweep', this.emit.bind(this, 'hashSweep'))
          this.on('newListener', (e, t) => {
            if (e === 'response') this.requestManager.on(e, t)
          })
          this.on('removeListener', (e, t) => {
            if (e === 'response') this.requestManager.off(e, t)
          })
        }
        getAgent() {
          return this.requestManager.agent
        }
        setAgent(e) {
          this.requestManager.setAgent(e)
          return this
        }
        setToken(e) {
          this.requestManager.setToken(e)
          return this
        }
        async get(e, t = {}) {
          return this.request({ ...t, fullRoute: e, method: 'GET' })
        }
        async delete(e, t = {}) {
          return this.request({ ...t, fullRoute: e, method: 'DELETE' })
        }
        async post(e, t = {}) {
          return this.request({ ...t, fullRoute: e, method: 'POST' })
        }
        async put(e, t = {}) {
          return this.request({ ...t, fullRoute: e, method: 'PUT' })
        }
        async patch(e, t = {}) {
          return this.request({ ...t, fullRoute: e, method: 'PATCH' })
        }
        async request(e) {
          const t = await this.raw(e)
          return parseResponse(t)
        }
        async raw(e) {
          return this.requestManager.queueRequest(e)
        }
      }
      __name(H, 'REST')
      var J = '1.4.0'
      0 && 0
    },
    9575: (e) => {
      'use strict'
      var t = Object.defineProperty
      var i = Object.getOwnPropertyDescriptor
      var s = Object.getOwnPropertyNames
      var n = Object.prototype.hasOwnProperty
      var __name = (e, i) => t(e, 'name', { value: i, configurable: true })
      var __export = (e, i) => {
        for (var s in i) t(e, s, { get: i[s], enumerable: true })
      }
      var __copyProps = (e, r, a, o) => {
        if ((r && typeof r === 'object') || typeof r === 'function') {
          for (let l of s(r))
            if (!n.call(e, l) && l !== a)
              t(e, l, {
                get: () => r[l],
                enumerable: !(o = i(r, l)) || o.enumerable,
              })
        }
        return e
      }
      var __toCommonJS = (e) =>
        __copyProps(t({}, '__esModule', { value: true }), e)
      var r = {}
      __export(r, {
        isEquatable: () => isEquatable,
        isJSONEncodable: () => isJSONEncodable,
        lazy: () => lazy,
        range: () => range,
      })
      e.exports = __toCommonJS(r)
      function lazy(e) {
        let t
        return () => (t ??= e())
      }
      __name(lazy, 'lazy')
      function range(e, t, i = 1) {
        return Array.from({ length: (t - e) / i + 1 }, (t, s) => e + s * i)
      }
      __name(range, 'range')
      function isJSONEncodable(e) {
        return e !== null && typeof e === 'object' && 'toJSON' in e
      }
      __name(isJSONEncodable, 'isJSONEncodable')
      function isEquatable(e) {
        return e !== null && typeof e === 'object' && 'equals' in e
      }
      __name(isEquatable, 'isEquatable')
      0 && 0
    },
    5010: (e) => {
      'use strict'
      'use strict'
      var t = Object.defineProperty
      var i = Object.getOwnPropertyDescriptor
      var s = Object.getOwnPropertyNames
      var n = Object.prototype.hasOwnProperty
      var __defNormalProp = (e, i, s) =>
        i in e
          ? t(e, i, {
              enumerable: true,
              configurable: true,
              writable: true,
              value: s,
            })
          : (e[i] = s)
      var __name = (e, i) => t(e, 'name', { value: i, configurable: true })
      var __export = (e, i) => {
        for (var s in i) t(e, s, { get: i[s], enumerable: true })
      }
      var __copyProps = (e, r, a, o) => {
        if ((r && typeof r === 'object') || typeof r === 'function') {
          for (let l of s(r))
            if (!n.call(e, l) && l !== a)
              t(e, l, {
                get: () => r[l],
                enumerable: !(o = i(r, l)) || o.enumerable,
              })
        }
        return e
      }
      var __toCommonJS = (e) =>
        __copyProps(t({}, '__esModule', { value: true }), e)
      var __publicField = (e, t, i) => {
        __defNormalProp(e, typeof t !== 'symbol' ? t + '' : t, i)
        return i
      }
      var r = {}
      __export(r, { AsyncQueue: () => o })
      e.exports = __toCommonJS(r)
      var a = class {
        constructor(e) {
          __publicField(this, 'promise')
          __publicField(this, 'resolve')
          __publicField(this, 'reject')
          __publicField(this, 'queue')
          __publicField(this, 'signal', null)
          __publicField(this, 'signalListener', null)
          this.queue = e
          this.promise = new Promise((e, t) => {
            this.resolve = e
            this.reject = t
          })
        }
        setSignal(e) {
          if (e.aborted) return this
          this.signal = e
          this.signalListener = () => {
            const e = this.queue['promises'].indexOf(this)
            if (e !== -1) this.queue['promises'].splice(e, 1)
            this.reject(new Error('Request aborted manually'))
          }
          this.signal.addEventListener('abort', this.signalListener)
          return this
        }
        use() {
          this.dispose()
          this.resolve()
          return this
        }
        abort() {
          this.dispose()
          this.reject(new Error('Request aborted manually'))
          return this
        }
        dispose() {
          if (this.signal) {
            this.signal.removeEventListener('abort', this.signalListener)
            this.signal = null
            this.signalListener = null
          }
        }
      }
      __name(a, 'AsyncQueueEntry')
      var o = class {
        constructor() {
          __publicField(this, 'promises', [])
        }
        get remaining() {
          return this.promises.length
        }
        get queued() {
          return this.remaining === 0 ? 0 : this.remaining - 1
        }
        wait(e) {
          const t = new a(this)
          if (this.promises.length === 0) {
            this.promises.push(t)
            return Promise.resolve()
          }
          this.promises.push(t)
          if (e?.signal) t.setSignal(e.signal)
          return t.promise
        }
        shift() {
          if (this.promises.length === 0) return
          if (this.promises.length === 1) {
            this.promises.shift()
            return
          }
          this.promises.shift()
          this.promises[0].use()
        }
        abortAll() {
          if (this.queued === 0) return
          for (let e = 1; e < this.promises.length; ++e) {
            this.promises[e].abort()
          }
          this.promises.length = 1
        }
      }
      __name(o, 'AsyncQueue')
      0 && 0
    },
    8673: (e) => {
      'use strict'
      var t = Object.defineProperty
      var i = Object.getOwnPropertyDescriptor
      var s = Object.getOwnPropertyNames
      var n = Object.prototype.hasOwnProperty
      var __defNormalProp = (e, i, s) =>
        i in e
          ? t(e, i, {
              enumerable: true,
              configurable: true,
              writable: true,
              value: s,
            })
          : (e[i] = s)
      var __name = (e, i) => t(e, 'name', { value: i, configurable: true })
      var __export = (e, i) => {
        for (var s in i) t(e, s, { get: i[s], enumerable: true })
      }
      var __copyProps = (e, r, a, o) => {
        if ((r && typeof r === 'object') || typeof r === 'function') {
          for (let l of s(r))
            if (!n.call(e, l) && l !== a)
              t(e, l, {
                get: () => r[l],
                enumerable: !(o = i(r, l)) || o.enumerable,
              })
        }
        return e
      }
      var __toCommonJS = (e) =>
        __copyProps(t({}, '__esModule', { value: true }), e)
      var __publicField = (e, t, i) => {
        __defNormalProp(e, typeof t !== 'symbol' ? t + '' : t, i)
        return i
      }
      var __accessCheck = (e, t, i) => {
        if (!t.has(e)) throw TypeError('Cannot ' + i)
      }
      var __privateGet = (e, t, i) => {
        __accessCheck(e, t, 'read from private field')
        return i ? i.call(e) : t.get(e)
      }
      var __privateAdd = (e, t, i) => {
        if (t.has(e))
          throw TypeError('Cannot add the same private member more than once')
        t instanceof WeakSet ? t.add(e) : t.set(e, i)
      }
      var __privateSet = (e, t, i, s) => {
        __accessCheck(e, t, 'write to private field')
        s ? s.call(e, i) : t.set(e, i)
        return i
      }
      var __privateWrapper = (e, t, i, s) => ({
        set _(s) {
          __privateSet(e, t, s, i)
        },
        get _() {
          return __privateGet(e, t, s)
        },
      })
      var r = {}
      __export(r, {
        DiscordSnowflake: () => u,
        Snowflake: () => d,
        TwitterSnowflake: () => h,
      })
      e.exports = __toCommonJS(r)
      var a = 1n
      var o = 0n
      var l, c
      var d = class {
        constructor(e) {
          __privateAdd(this, l, 0n)
          __privateAdd(this, c, void 0)
          __publicField(this, 'decode', this.deconstruct)
          __privateSet(this, c, BigInt(e instanceof Date ? e.getTime() : e))
        }
        get epoch() {
          return __privateGet(this, c)
        }
        generate({
          increment: e,
          timestamp: t = Date.now(),
          workerId: i = o,
          processId: s = a,
        } = {}) {
          if (t instanceof Date) t = BigInt(t.getTime())
          else if (typeof t === 'number') t = BigInt(t)
          else if (typeof t !== 'bigint') {
            throw new TypeError(
              `"timestamp" argument must be a number, bigint, or Date (received ${typeof t})`
            )
          }
          if (typeof e === 'bigint' && e >= 4095n) e = 0n
          else {
            e = __privateWrapper(this, l)._++
            if (__privateGet(this, l) >= 4095n) __privateSet(this, l, 0n)
          }
          return (
            ((t - __privateGet(this, c)) << 22n) |
            ((i & 0b11111n) << 17n) |
            ((s & 0b11111n) << 12n) |
            e
          )
        }
        deconstruct(e) {
          const t = BigInt(e)
          return {
            id: t,
            timestamp: (t >> 22n) + __privateGet(this, c),
            workerId: (t >> 17n) & 0b11111n,
            processId: (t >> 12n) & 0b11111n,
            increment: t & 0b111111111111n,
            epoch: __privateGet(this, c),
          }
        }
        timestampFrom(e) {
          return Number((BigInt(e) >> 22n) + __privateGet(this, c))
        }
      }
      __name(d, 'Snowflake')
      l = new WeakMap()
      c = new WeakMap()
      var u = new d(1420070400000n)
      var h = new d(1142974214000n)
      0 && 0
    },
    4211: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    8941: function (e, t, i) {
      'use strict'
      var s =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, i, s) {
              if (s === undefined) s = i
              var n = Object.getOwnPropertyDescriptor(t, i)
              if (
                !n ||
                ('get' in n ? !t.__esModule : n.writable || n.configurable)
              ) {
                n = {
                  enumerable: true,
                  get: function () {
                    return t[i]
                  },
                }
              }
              Object.defineProperty(e, s, n)
            }
          : function (e, t, i, s) {
              if (s === undefined) s = i
              e[s] = t[i]
            })
      var n =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var i in e)
            if (i !== 'default' && !Object.prototype.hasOwnProperty.call(t, i))
              s(t, e, i)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      t.GatewayDispatchEvents =
        t.GatewayIntentBits =
        t.GatewayCloseCodes =
        t.GatewayOpcodes =
        t.GatewayVersion =
          void 0
      n(i(4211), t)
      t.GatewayVersion = '10'
      var r
      ;(function (e) {
        e[(e['Dispatch'] = 0)] = 'Dispatch'
        e[(e['Heartbeat'] = 1)] = 'Heartbeat'
        e[(e['Identify'] = 2)] = 'Identify'
        e[(e['PresenceUpdate'] = 3)] = 'PresenceUpdate'
        e[(e['VoiceStateUpdate'] = 4)] = 'VoiceStateUpdate'
        e[(e['Resume'] = 6)] = 'Resume'
        e[(e['Reconnect'] = 7)] = 'Reconnect'
        e[(e['RequestGuildMembers'] = 8)] = 'RequestGuildMembers'
        e[(e['InvalidSession'] = 9)] = 'InvalidSession'
        e[(e['Hello'] = 10)] = 'Hello'
        e[(e['HeartbeatAck'] = 11)] = 'HeartbeatAck'
      })((r = t.GatewayOpcodes || (t.GatewayOpcodes = {})))
      var a
      ;(function (e) {
        e[(e['UnknownError'] = 4e3)] = 'UnknownError'
        e[(e['UnknownOpcode'] = 4001)] = 'UnknownOpcode'
        e[(e['DecodeError'] = 4002)] = 'DecodeError'
        e[(e['NotAuthenticated'] = 4003)] = 'NotAuthenticated'
        e[(e['AuthenticationFailed'] = 4004)] = 'AuthenticationFailed'
        e[(e['AlreadyAuthenticated'] = 4005)] = 'AlreadyAuthenticated'
        e[(e['InvalidSeq'] = 4007)] = 'InvalidSeq'
        e[(e['RateLimited'] = 4008)] = 'RateLimited'
        e[(e['SessionTimedOut'] = 4009)] = 'SessionTimedOut'
        e[(e['InvalidShard'] = 4010)] = 'InvalidShard'
        e[(e['ShardingRequired'] = 4011)] = 'ShardingRequired'
        e[(e['InvalidAPIVersion'] = 4012)] = 'InvalidAPIVersion'
        e[(e['InvalidIntents'] = 4013)] = 'InvalidIntents'
        e[(e['DisallowedIntents'] = 4014)] = 'DisallowedIntents'
      })((a = t.GatewayCloseCodes || (t.GatewayCloseCodes = {})))
      var o
      ;(function (e) {
        e[(e['Guilds'] = 1)] = 'Guilds'
        e[(e['GuildMembers'] = 2)] = 'GuildMembers'
        e[(e['GuildBans'] = 4)] = 'GuildBans'
        e[(e['GuildEmojisAndStickers'] = 8)] = 'GuildEmojisAndStickers'
        e[(e['GuildIntegrations'] = 16)] = 'GuildIntegrations'
        e[(e['GuildWebhooks'] = 32)] = 'GuildWebhooks'
        e[(e['GuildInvites'] = 64)] = 'GuildInvites'
        e[(e['GuildVoiceStates'] = 128)] = 'GuildVoiceStates'
        e[(e['GuildPresences'] = 256)] = 'GuildPresences'
        e[(e['GuildMessages'] = 512)] = 'GuildMessages'
        e[(e['GuildMessageReactions'] = 1024)] = 'GuildMessageReactions'
        e[(e['GuildMessageTyping'] = 2048)] = 'GuildMessageTyping'
        e[(e['DirectMessages'] = 4096)] = 'DirectMessages'
        e[(e['DirectMessageReactions'] = 8192)] = 'DirectMessageReactions'
        e[(e['DirectMessageTyping'] = 16384)] = 'DirectMessageTyping'
        e[(e['MessageContent'] = 32768)] = 'MessageContent'
        e[(e['GuildScheduledEvents'] = 65536)] = 'GuildScheduledEvents'
        e[(e['AutoModerationConfiguration'] = 1048576)] =
          'AutoModerationConfiguration'
        e[(e['AutoModerationExecution'] = 2097152)] = 'AutoModerationExecution'
      })((o = t.GatewayIntentBits || (t.GatewayIntentBits = {})))
      var l
      ;(function (e) {
        e['ApplicationCommandPermissionsUpdate'] =
          'APPLICATION_COMMAND_PERMISSIONS_UPDATE'
        e['ChannelCreate'] = 'CHANNEL_CREATE'
        e['ChannelDelete'] = 'CHANNEL_DELETE'
        e['ChannelPinsUpdate'] = 'CHANNEL_PINS_UPDATE'
        e['ChannelUpdate'] = 'CHANNEL_UPDATE'
        e['GuildBanAdd'] = 'GUILD_BAN_ADD'
        e['GuildBanRemove'] = 'GUILD_BAN_REMOVE'
        e['GuildCreate'] = 'GUILD_CREATE'
        e['GuildDelete'] = 'GUILD_DELETE'
        e['GuildEmojisUpdate'] = 'GUILD_EMOJIS_UPDATE'
        e['GuildIntegrationsUpdate'] = 'GUILD_INTEGRATIONS_UPDATE'
        e['GuildMemberAdd'] = 'GUILD_MEMBER_ADD'
        e['GuildMemberRemove'] = 'GUILD_MEMBER_REMOVE'
        e['GuildMembersChunk'] = 'GUILD_MEMBERS_CHUNK'
        e['GuildMemberUpdate'] = 'GUILD_MEMBER_UPDATE'
        e['GuildRoleCreate'] = 'GUILD_ROLE_CREATE'
        e['GuildRoleDelete'] = 'GUILD_ROLE_DELETE'
        e['GuildRoleUpdate'] = 'GUILD_ROLE_UPDATE'
        e['GuildStickersUpdate'] = 'GUILD_STICKERS_UPDATE'
        e['GuildUpdate'] = 'GUILD_UPDATE'
        e['IntegrationCreate'] = 'INTEGRATION_CREATE'
        e['IntegrationDelete'] = 'INTEGRATION_DELETE'
        e['IntegrationUpdate'] = 'INTEGRATION_UPDATE'
        e['InteractionCreate'] = 'INTERACTION_CREATE'
        e['InviteCreate'] = 'INVITE_CREATE'
        e['InviteDelete'] = 'INVITE_DELETE'
        e['MessageCreate'] = 'MESSAGE_CREATE'
        e['MessageDelete'] = 'MESSAGE_DELETE'
        e['MessageDeleteBulk'] = 'MESSAGE_DELETE_BULK'
        e['MessageReactionAdd'] = 'MESSAGE_REACTION_ADD'
        e['MessageReactionRemove'] = 'MESSAGE_REACTION_REMOVE'
        e['MessageReactionRemoveAll'] = 'MESSAGE_REACTION_REMOVE_ALL'
        e['MessageReactionRemoveEmoji'] = 'MESSAGE_REACTION_REMOVE_EMOJI'
        e['MessageUpdate'] = 'MESSAGE_UPDATE'
        e['PresenceUpdate'] = 'PRESENCE_UPDATE'
        e['StageInstanceCreate'] = 'STAGE_INSTANCE_CREATE'
        e['StageInstanceDelete'] = 'STAGE_INSTANCE_DELETE'
        e['StageInstanceUpdate'] = 'STAGE_INSTANCE_UPDATE'
        e['Ready'] = 'READY'
        e['Resumed'] = 'RESUMED'
        e['ThreadCreate'] = 'THREAD_CREATE'
        e['ThreadDelete'] = 'THREAD_DELETE'
        e['ThreadListSync'] = 'THREAD_LIST_SYNC'
        e['ThreadMembersUpdate'] = 'THREAD_MEMBERS_UPDATE'
        e['ThreadMemberUpdate'] = 'THREAD_MEMBER_UPDATE'
        e['ThreadUpdate'] = 'THREAD_UPDATE'
        e['TypingStart'] = 'TYPING_START'
        e['UserUpdate'] = 'USER_UPDATE'
        e['VoiceServerUpdate'] = 'VOICE_SERVER_UPDATE'
        e['VoiceStateUpdate'] = 'VOICE_STATE_UPDATE'
        e['WebhooksUpdate'] = 'WEBHOOKS_UPDATE'
        e['GuildScheduledEventCreate'] = 'GUILD_SCHEDULED_EVENT_CREATE'
        e['GuildScheduledEventUpdate'] = 'GUILD_SCHEDULED_EVENT_UPDATE'
        e['GuildScheduledEventDelete'] = 'GUILD_SCHEDULED_EVENT_DELETE'
        e['GuildScheduledEventUserAdd'] = 'GUILD_SCHEDULED_EVENT_USER_ADD'
        e['GuildScheduledEventUserRemove'] = 'GUILD_SCHEDULED_EVENT_USER_REMOVE'
        e['AutoModerationRuleCreate'] = 'AUTO_MODERATION_RULE_CREATE'
        e['AutoModerationRuleUpdate'] = 'AUTO_MODERATION_RULE_UPDATE'
        e['AutoModerationRuleDelete'] = 'AUTO_MODERATION_RULE_DELETE'
        e['AutoModerationActionExecution'] = 'AUTO_MODERATION_ACTION_EXECUTION'
      })((l = t.GatewayDispatchEvents || (t.GatewayDispatchEvents = {})))
    },
    2811: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.FormattingPatterns = void 0
      t.FormattingPatterns = {
        User: /<@(?<id>\d{17,20})>/,
        UserWithNickname: /<@!(?<id>\d{17,20})>/,
        UserWithOptionalNickname: /<@!?(?<id>\d{17,20})>/,
        Channel: /<#(?<id>\d{17,20})>/,
        Role: /<@&(?<id>\d{17,20})>/,
        SlashCommand:
          /<\/(?<fullName>(?<name>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32})(?: (?<subcommandOrGroup>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32}))?(?: (?<subcommand>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32}))?):(?<id>\d{17,20})>/u,
        Emoji: /<(?<animated>a)?:(?<name>\w{2,32}):(?<id>\d{17,20})>/,
        AnimatedEmoji: /<(?<animated>a):(?<name>\w{2,32}):(?<id>\d{17,20})>/,
        StaticEmoji: /<:(?<name>\w{2,32}):(?<id>\d{17,20})>/,
        Timestamp: /<t:(?<timestamp>-?\d{1,13})(:(?<style>[tTdDfFR]))?>/,
        DefaultStyledTimestamp: /<t:(?<timestamp>-?\d{1,13})>/,
        StyledTimestamp: /<t:(?<timestamp>-?\d{1,13}):(?<style>[tTdDfFR])>/,
      }
      Object.freeze(t.FormattingPatterns)
    },
    3736: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.PermissionFlagsBits = void 0
      t.PermissionFlagsBits = {
        CreateInstantInvite: 1n << 0n,
        KickMembers: 1n << 1n,
        BanMembers: 1n << 2n,
        Administrator: 1n << 3n,
        ManageChannels: 1n << 4n,
        ManageGuild: 1n << 5n,
        AddReactions: 1n << 6n,
        ViewAuditLog: 1n << 7n,
        PrioritySpeaker: 1n << 8n,
        Stream: 1n << 9n,
        ViewChannel: 1n << 10n,
        SendMessages: 1n << 11n,
        SendTTSMessages: 1n << 12n,
        ManageMessages: 1n << 13n,
        EmbedLinks: 1n << 14n,
        AttachFiles: 1n << 15n,
        ReadMessageHistory: 1n << 16n,
        MentionEveryone: 1n << 17n,
        UseExternalEmojis: 1n << 18n,
        ViewGuildInsights: 1n << 19n,
        Connect: 1n << 20n,
        Speak: 1n << 21n,
        MuteMembers: 1n << 22n,
        DeafenMembers: 1n << 23n,
        MoveMembers: 1n << 24n,
        UseVAD: 1n << 25n,
        ChangeNickname: 1n << 26n,
        ManageNicknames: 1n << 27n,
        ManageRoles: 1n << 28n,
        ManageWebhooks: 1n << 29n,
        ManageEmojisAndStickers: 1n << 30n,
        UseApplicationCommands: 1n << 31n,
        RequestToSpeak: 1n << 32n,
        ManageEvents: 1n << 33n,
        ManageThreads: 1n << 34n,
        CreatePublicThreads: 1n << 35n,
        CreatePrivateThreads: 1n << 36n,
        UseExternalStickers: 1n << 37n,
        SendMessagesInThreads: 1n << 38n,
        UseEmbeddedActivities: 1n << 39n,
        ModerateMembers: 1n << 40n,
      }
      Object.freeze(t.PermissionFlagsBits)
    },
    2032: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    557: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    3716: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    4103: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    1067: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    4593: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    1103: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    3690: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    34: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.ApplicationCommandOptionType = void 0
      var i
      ;(function (e) {
        e[(e['Subcommand'] = 1)] = 'Subcommand'
        e[(e['SubcommandGroup'] = 2)] = 'SubcommandGroup'
        e[(e['String'] = 3)] = 'String'
        e[(e['Integer'] = 4)] = 'Integer'
        e[(e['Boolean'] = 5)] = 'Boolean'
        e[(e['User'] = 6)] = 'User'
        e[(e['Channel'] = 7)] = 'Channel'
        e[(e['Role'] = 8)] = 'Role'
        e[(e['Mentionable'] = 9)] = 'Mentionable'
        e[(e['Number'] = 10)] = 'Number'
        e[(e['Attachment'] = 11)] = 'Attachment'
      })(
        (i =
          t.ApplicationCommandOptionType ||
          (t.ApplicationCommandOptionType = {}))
      )
    },
    9011: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    4796: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    8011: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    7410: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    8401: function (e, t, i) {
      'use strict'
      var s =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, i, s) {
              if (s === undefined) s = i
              var n = Object.getOwnPropertyDescriptor(t, i)
              if (
                !n ||
                ('get' in n ? !t.__esModule : n.writable || n.configurable)
              ) {
                n = {
                  enumerable: true,
                  get: function () {
                    return t[i]
                  },
                }
              }
              Object.defineProperty(e, s, n)
            }
          : function (e, t, i, s) {
              if (s === undefined) s = i
              e[s] = t[i]
            })
      var n =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var i in e)
            if (i !== 'default' && !Object.prototype.hasOwnProperty.call(t, i))
              s(t, e, i)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      n(i(2032), t)
      n(i(557), t)
      n(i(3716), t)
      n(i(4103), t)
      n(i(1067), t)
      n(i(4593), t)
      n(i(1103), t)
      n(i(3690), t)
      n(i(34), t)
      n(i(9011), t)
      n(i(4796), t)
      n(i(8011), t)
      n(i(7410), t)
    },
    9444: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    6858: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.APIApplicationCommandPermissionsConstant =
        t.ApplicationCommandPermissionType = void 0
      var i
      ;(function (e) {
        e[(e['Role'] = 1)] = 'Role'
        e[(e['User'] = 2)] = 'User'
        e[(e['Channel'] = 3)] = 'Channel'
      })(
        (i =
          t.ApplicationCommandPermissionType ||
          (t.ApplicationCommandPermissionType = {}))
      )
      t.APIApplicationCommandPermissionsConstant = {
        Everyone: (e) => String(e),
        AllChannels: (e) => String(BigInt(e) - 1n),
      }
    },
    1633: function (e, t, i) {
      'use strict'
      var s =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, i, s) {
              if (s === undefined) s = i
              var n = Object.getOwnPropertyDescriptor(t, i)
              if (
                !n ||
                ('get' in n ? !t.__esModule : n.writable || n.configurable)
              ) {
                n = {
                  enumerable: true,
                  get: function () {
                    return t[i]
                  },
                }
              }
              Object.defineProperty(e, s, n)
            }
          : function (e, t, i, s) {
              if (s === undefined) s = i
              e[s] = t[i]
            })
      var n =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var i in e)
            if (i !== 'default' && !Object.prototype.hasOwnProperty.call(t, i))
              s(t, e, i)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      t.ApplicationCommandType = void 0
      n(i(8401), t)
      n(i(9444), t)
      n(i(6858), t)
      var r
      ;(function (e) {
        e[(e['ChatInput'] = 1)] = 'ChatInput'
        e[(e['User'] = 2)] = 'User'
        e[(e['Message'] = 3)] = 'Message'
      })((r = t.ApplicationCommandType || (t.ApplicationCommandType = {})))
    },
    5260: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    4716: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    4439: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    791: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    6322: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    6339: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.InteractionResponseType = t.InteractionType = void 0
      var i
      ;(function (e) {
        e[(e['Ping'] = 1)] = 'Ping'
        e[(e['ApplicationCommand'] = 2)] = 'ApplicationCommand'
        e[(e['MessageComponent'] = 3)] = 'MessageComponent'
        e[(e['ApplicationCommandAutocomplete'] = 4)] =
          'ApplicationCommandAutocomplete'
        e[(e['ModalSubmit'] = 5)] = 'ModalSubmit'
      })((i = t.InteractionType || (t.InteractionType = {})))
      var s
      ;(function (e) {
        e[(e['Pong'] = 1)] = 'Pong'
        e[(e['ChannelMessageWithSource'] = 4)] = 'ChannelMessageWithSource'
        e[(e['DeferredChannelMessageWithSource'] = 5)] =
          'DeferredChannelMessageWithSource'
        e[(e['DeferredMessageUpdate'] = 6)] = 'DeferredMessageUpdate'
        e[(e['UpdateMessage'] = 7)] = 'UpdateMessage'
        e[(e['ApplicationCommandAutocompleteResult'] = 8)] =
          'ApplicationCommandAutocompleteResult'
        e[(e['Modal'] = 9)] = 'Modal'
      })((s = t.InteractionResponseType || (t.InteractionResponseType = {})))
    },
    2484: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.ApplicationFlags = void 0
      var i
      ;(function (e) {
        e[(e['EmbeddedReleased'] = 2)] = 'EmbeddedReleased'
        e[(e['ManagedEmoji'] = 4)] = 'ManagedEmoji'
        e[(e['GroupDMCreate'] = 16)] = 'GroupDMCreate'
        e[(e['RPCHasConnected'] = 2048)] = 'RPCHasConnected'
        e[(e['GatewayPresence'] = 4096)] = 'GatewayPresence'
        e[(e['GatewayPresenceLimited'] = 8192)] = 'GatewayPresenceLimited'
        e[(e['GatewayGuildMembers'] = 16384)] = 'GatewayGuildMembers'
        e[(e['GatewayGuildMembersLimited'] = 32768)] =
          'GatewayGuildMembersLimited'
        e[(e['VerificationPendingGuildLimit'] = 65536)] =
          'VerificationPendingGuildLimit'
        e[(e['Embedded'] = 131072)] = 'Embedded'
        e[(e['GatewayMessageContent'] = 262144)] = 'GatewayMessageContent'
        e[(e['GatewayMessageContentLimited'] = 524288)] =
          'GatewayMessageContentLimited'
        e[(e['EmbeddedFirstParty'] = 1048576)] = 'EmbeddedFirstParty'
        e[(e['ApplicationCommandBadge'] = 8388608)] = 'ApplicationCommandBadge'
      })((i = t.ApplicationFlags || (t.ApplicationFlags = {})))
    },
    5937: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.AuditLogOptionsType = t.AuditLogEvent = void 0
      var i
      ;(function (e) {
        e[(e['GuildUpdate'] = 1)] = 'GuildUpdate'
        e[(e['ChannelCreate'] = 10)] = 'ChannelCreate'
        e[(e['ChannelUpdate'] = 11)] = 'ChannelUpdate'
        e[(e['ChannelDelete'] = 12)] = 'ChannelDelete'
        e[(e['ChannelOverwriteCreate'] = 13)] = 'ChannelOverwriteCreate'
        e[(e['ChannelOverwriteUpdate'] = 14)] = 'ChannelOverwriteUpdate'
        e[(e['ChannelOverwriteDelete'] = 15)] = 'ChannelOverwriteDelete'
        e[(e['MemberKick'] = 20)] = 'MemberKick'
        e[(e['MemberPrune'] = 21)] = 'MemberPrune'
        e[(e['MemberBanAdd'] = 22)] = 'MemberBanAdd'
        e[(e['MemberBanRemove'] = 23)] = 'MemberBanRemove'
        e[(e['MemberUpdate'] = 24)] = 'MemberUpdate'
        e[(e['MemberRoleUpdate'] = 25)] = 'MemberRoleUpdate'
        e[(e['MemberMove'] = 26)] = 'MemberMove'
        e[(e['MemberDisconnect'] = 27)] = 'MemberDisconnect'
        e[(e['BotAdd'] = 28)] = 'BotAdd'
        e[(e['RoleCreate'] = 30)] = 'RoleCreate'
        e[(e['RoleUpdate'] = 31)] = 'RoleUpdate'
        e[(e['RoleDelete'] = 32)] = 'RoleDelete'
        e[(e['InviteCreate'] = 40)] = 'InviteCreate'
        e[(e['InviteUpdate'] = 41)] = 'InviteUpdate'
        e[(e['InviteDelete'] = 42)] = 'InviteDelete'
        e[(e['WebhookCreate'] = 50)] = 'WebhookCreate'
        e[(e['WebhookUpdate'] = 51)] = 'WebhookUpdate'
        e[(e['WebhookDelete'] = 52)] = 'WebhookDelete'
        e[(e['EmojiCreate'] = 60)] = 'EmojiCreate'
        e[(e['EmojiUpdate'] = 61)] = 'EmojiUpdate'
        e[(e['EmojiDelete'] = 62)] = 'EmojiDelete'
        e[(e['MessageDelete'] = 72)] = 'MessageDelete'
        e[(e['MessageBulkDelete'] = 73)] = 'MessageBulkDelete'
        e[(e['MessagePin'] = 74)] = 'MessagePin'
        e[(e['MessageUnpin'] = 75)] = 'MessageUnpin'
        e[(e['IntegrationCreate'] = 80)] = 'IntegrationCreate'
        e[(e['IntegrationUpdate'] = 81)] = 'IntegrationUpdate'
        e[(e['IntegrationDelete'] = 82)] = 'IntegrationDelete'
        e[(e['StageInstanceCreate'] = 83)] = 'StageInstanceCreate'
        e[(e['StageInstanceUpdate'] = 84)] = 'StageInstanceUpdate'
        e[(e['StageInstanceDelete'] = 85)] = 'StageInstanceDelete'
        e[(e['StickerCreate'] = 90)] = 'StickerCreate'
        e[(e['StickerUpdate'] = 91)] = 'StickerUpdate'
        e[(e['StickerDelete'] = 92)] = 'StickerDelete'
        e[(e['GuildScheduledEventCreate'] = 100)] = 'GuildScheduledEventCreate'
        e[(e['GuildScheduledEventUpdate'] = 101)] = 'GuildScheduledEventUpdate'
        e[(e['GuildScheduledEventDelete'] = 102)] = 'GuildScheduledEventDelete'
        e[(e['ThreadCreate'] = 110)] = 'ThreadCreate'
        e[(e['ThreadUpdate'] = 111)] = 'ThreadUpdate'
        e[(e['ThreadDelete'] = 112)] = 'ThreadDelete'
        e[(e['ApplicationCommandPermissionUpdate'] = 121)] =
          'ApplicationCommandPermissionUpdate'
        e[(e['AutoModerationRuleCreate'] = 140)] = 'AutoModerationRuleCreate'
        e[(e['AutoModerationRuleUpdate'] = 141)] = 'AutoModerationRuleUpdate'
        e[(e['AutoModerationRuleDelete'] = 142)] = 'AutoModerationRuleDelete'
        e[(e['AutoModerationBlockMessage'] = 143)] =
          'AutoModerationBlockMessage'
        e[(e['AutoModerationFlagToChannel'] = 144)] =
          'AutoModerationFlagToChannel'
        e[(e['AutoModerationUserCommunicationDisabled'] = 145)] =
          'AutoModerationUserCommunicationDisabled'
      })((i = t.AuditLogEvent || (t.AuditLogEvent = {})))
      var s
      ;(function (e) {
        e['Role'] = '0'
        e['Member'] = '1'
      })((s = t.AuditLogOptionsType || (t.AuditLogOptionsType = {})))
    },
    5130: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.AutoModerationActionType =
        t.AutoModerationRuleEventType =
        t.AutoModerationRuleKeywordPresetType =
        t.AutoModerationRuleTriggerType =
          void 0
      var i
      ;(function (e) {
        e[(e['Keyword'] = 1)] = 'Keyword'
        e[(e['Spam'] = 3)] = 'Spam'
        e[(e['KeywordPreset'] = 4)] = 'KeywordPreset'
        e[(e['MentionSpam'] = 5)] = 'MentionSpam'
      })(
        (i =
          t.AutoModerationRuleTriggerType ||
          (t.AutoModerationRuleTriggerType = {}))
      )
      var s
      ;(function (e) {
        e[(e['Profanity'] = 1)] = 'Profanity'
        e[(e['SexualContent'] = 2)] = 'SexualContent'
        e[(e['Slurs'] = 3)] = 'Slurs'
      })(
        (s =
          t.AutoModerationRuleKeywordPresetType ||
          (t.AutoModerationRuleKeywordPresetType = {}))
      )
      var n
      ;(function (e) {
        e[(e['MessageSend'] = 1)] = 'MessageSend'
      })(
        (n =
          t.AutoModerationRuleEventType || (t.AutoModerationRuleEventType = {}))
      )
      var r
      ;(function (e) {
        e[(e['BlockMessage'] = 1)] = 'BlockMessage'
        e[(e['SendAlertMessage'] = 2)] = 'SendAlertMessage'
        e[(e['Timeout'] = 3)] = 'Timeout'
      })((r = t.AutoModerationActionType || (t.AutoModerationActionType = {})))
    },
    2876: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.ChannelFlags =
        t.TextInputStyle =
        t.ButtonStyle =
        t.ComponentType =
        t.AllowedMentionsTypes =
        t.EmbedType =
        t.ThreadMemberFlags =
        t.ThreadAutoArchiveDuration =
        t.OverwriteType =
        t.MessageFlags =
        t.MessageActivityType =
        t.MessageType =
        t.VideoQualityMode =
        t.ChannelType =
        t.SortOrderType =
          void 0
      var i
      ;(function (e) {
        e[(e['LatestActivity'] = 0)] = 'LatestActivity'
        e[(e['CreationDate'] = 1)] = 'CreationDate'
      })((i = t.SortOrderType || (t.SortOrderType = {})))
      var s
      ;(function (e) {
        e[(e['GuildText'] = 0)] = 'GuildText'
        e[(e['DM'] = 1)] = 'DM'
        e[(e['GuildVoice'] = 2)] = 'GuildVoice'
        e[(e['GroupDM'] = 3)] = 'GroupDM'
        e[(e['GuildCategory'] = 4)] = 'GuildCategory'
        e[(e['GuildAnnouncement'] = 5)] = 'GuildAnnouncement'
        e[(e['AnnouncementThread'] = 10)] = 'AnnouncementThread'
        e[(e['PublicThread'] = 11)] = 'PublicThread'
        e[(e['PrivateThread'] = 12)] = 'PrivateThread'
        e[(e['GuildStageVoice'] = 13)] = 'GuildStageVoice'
        e[(e['GuildDirectory'] = 14)] = 'GuildDirectory'
        e[(e['GuildForum'] = 15)] = 'GuildForum'
        e[(e['GuildNews'] = 5)] = 'GuildNews'
        e[(e['GuildNewsThread'] = 10)] = 'GuildNewsThread'
        e[(e['GuildPublicThread'] = 11)] = 'GuildPublicThread'
        e[(e['GuildPrivateThread'] = 12)] = 'GuildPrivateThread'
      })((s = t.ChannelType || (t.ChannelType = {})))
      var n
      ;(function (e) {
        e[(e['Auto'] = 1)] = 'Auto'
        e[(e['Full'] = 2)] = 'Full'
      })((n = t.VideoQualityMode || (t.VideoQualityMode = {})))
      var r
      ;(function (e) {
        e[(e['Default'] = 0)] = 'Default'
        e[(e['RecipientAdd'] = 1)] = 'RecipientAdd'
        e[(e['RecipientRemove'] = 2)] = 'RecipientRemove'
        e[(e['Call'] = 3)] = 'Call'
        e[(e['ChannelNameChange'] = 4)] = 'ChannelNameChange'
        e[(e['ChannelIconChange'] = 5)] = 'ChannelIconChange'
        e[(e['ChannelPinnedMessage'] = 6)] = 'ChannelPinnedMessage'
        e[(e['UserJoin'] = 7)] = 'UserJoin'
        e[(e['GuildBoost'] = 8)] = 'GuildBoost'
        e[(e['GuildBoostTier1'] = 9)] = 'GuildBoostTier1'
        e[(e['GuildBoostTier2'] = 10)] = 'GuildBoostTier2'
        e[(e['GuildBoostTier3'] = 11)] = 'GuildBoostTier3'
        e[(e['ChannelFollowAdd'] = 12)] = 'ChannelFollowAdd'
        e[(e['GuildDiscoveryDisqualified'] = 14)] = 'GuildDiscoveryDisqualified'
        e[(e['GuildDiscoveryRequalified'] = 15)] = 'GuildDiscoveryRequalified'
        e[(e['GuildDiscoveryGracePeriodInitialWarning'] = 16)] =
          'GuildDiscoveryGracePeriodInitialWarning'
        e[(e['GuildDiscoveryGracePeriodFinalWarning'] = 17)] =
          'GuildDiscoveryGracePeriodFinalWarning'
        e[(e['ThreadCreated'] = 18)] = 'ThreadCreated'
        e[(e['Reply'] = 19)] = 'Reply'
        e[(e['ChatInputCommand'] = 20)] = 'ChatInputCommand'
        e[(e['ThreadStarterMessage'] = 21)] = 'ThreadStarterMessage'
        e[(e['GuildInviteReminder'] = 22)] = 'GuildInviteReminder'
        e[(e['ContextMenuCommand'] = 23)] = 'ContextMenuCommand'
        e[(e['AutoModerationAction'] = 24)] = 'AutoModerationAction'
      })((r = t.MessageType || (t.MessageType = {})))
      var a
      ;(function (e) {
        e[(e['Join'] = 1)] = 'Join'
        e[(e['Spectate'] = 2)] = 'Spectate'
        e[(e['Listen'] = 3)] = 'Listen'
        e[(e['JoinRequest'] = 5)] = 'JoinRequest'
      })((a = t.MessageActivityType || (t.MessageActivityType = {})))
      var o
      ;(function (e) {
        e[(e['Crossposted'] = 1)] = 'Crossposted'
        e[(e['IsCrosspost'] = 2)] = 'IsCrosspost'
        e[(e['SuppressEmbeds'] = 4)] = 'SuppressEmbeds'
        e[(e['SourceMessageDeleted'] = 8)] = 'SourceMessageDeleted'
        e[(e['Urgent'] = 16)] = 'Urgent'
        e[(e['HasThread'] = 32)] = 'HasThread'
        e[(e['Ephemeral'] = 64)] = 'Ephemeral'
        e[(e['Loading'] = 128)] = 'Loading'
        e[(e['FailedToMentionSomeRolesInThread'] = 256)] =
          'FailedToMentionSomeRolesInThread'
      })((o = t.MessageFlags || (t.MessageFlags = {})))
      var l
      ;(function (e) {
        e[(e['Role'] = 0)] = 'Role'
        e[(e['Member'] = 1)] = 'Member'
      })((l = t.OverwriteType || (t.OverwriteType = {})))
      var c
      ;(function (e) {
        e[(e['OneHour'] = 60)] = 'OneHour'
        e[(e['OneDay'] = 1440)] = 'OneDay'
        e[(e['ThreeDays'] = 4320)] = 'ThreeDays'
        e[(e['OneWeek'] = 10080)] = 'OneWeek'
      })(
        (c = t.ThreadAutoArchiveDuration || (t.ThreadAutoArchiveDuration = {}))
      )
      var d
      ;(function (e) {})(
        (d = t.ThreadMemberFlags || (t.ThreadMemberFlags = {}))
      )
      var u
      ;(function (e) {
        e['Rich'] = 'rich'
        e['Image'] = 'image'
        e['Video'] = 'video'
        e['GIFV'] = 'gifv'
        e['Article'] = 'article'
        e['Link'] = 'link'
        e['AutoModerationMessage'] = 'auto_moderation_message'
      })((u = t.EmbedType || (t.EmbedType = {})))
      var h
      ;(function (e) {
        e['Everyone'] = 'everyone'
        e['Role'] = 'roles'
        e['User'] = 'users'
      })((h = t.AllowedMentionsTypes || (t.AllowedMentionsTypes = {})))
      var m
      ;(function (e) {
        e[(e['ActionRow'] = 1)] = 'ActionRow'
        e[(e['Button'] = 2)] = 'Button'
        e[(e['StringSelect'] = 3)] = 'StringSelect'
        e[(e['TextInput'] = 4)] = 'TextInput'
        e[(e['UserSelect'] = 5)] = 'UserSelect'
        e[(e['RoleSelect'] = 6)] = 'RoleSelect'
        e[(e['MentionableSelect'] = 7)] = 'MentionableSelect'
        e[(e['ChannelSelect'] = 8)] = 'ChannelSelect'
        e[(e['SelectMenu'] = 3)] = 'SelectMenu'
      })((m = t.ComponentType || (t.ComponentType = {})))
      var p
      ;(function (e) {
        e[(e['Primary'] = 1)] = 'Primary'
        e[(e['Secondary'] = 2)] = 'Secondary'
        e[(e['Success'] = 3)] = 'Success'
        e[(e['Danger'] = 4)] = 'Danger'
        e[(e['Link'] = 5)] = 'Link'
      })((p = t.ButtonStyle || (t.ButtonStyle = {})))
      var f
      ;(function (e) {
        e[(e['Short'] = 1)] = 'Short'
        e[(e['Paragraph'] = 2)] = 'Paragraph'
      })((f = t.TextInputStyle || (t.TextInputStyle = {})))
      var g
      ;(function (e) {
        e[(e['Pinned'] = 2)] = 'Pinned'
        e[(e['RequireTag'] = 16)] = 'RequireTag'
      })((g = t.ChannelFlags || (t.ChannelFlags = {})))
    },
    8419: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    6702: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.ActivityFlags =
        t.ActivityType =
        t.ActivityPlatform =
        t.PresenceUpdateStatus =
          void 0
      var i
      ;(function (e) {
        e['Online'] = 'online'
        e['DoNotDisturb'] = 'dnd'
        e['Idle'] = 'idle'
        e['Invisible'] = 'invisible'
        e['Offline'] = 'offline'
      })((i = t.PresenceUpdateStatus || (t.PresenceUpdateStatus = {})))
      var s
      ;(function (e) {
        e['Desktop'] = 'desktop'
        e['Xbox'] = 'xbox'
        e['Samsung'] = 'samsung'
        e['IOS'] = 'ios'
        e['Android'] = 'android'
        e['Embedded'] = 'embedded'
        e['PS4'] = 'ps4'
        e['PS5'] = 'ps5'
      })((s = t.ActivityPlatform || (t.ActivityPlatform = {})))
      var n
      ;(function (e) {
        e[(e['Playing'] = 0)] = 'Playing'
        e[(e['Streaming'] = 1)] = 'Streaming'
        e[(e['Listening'] = 2)] = 'Listening'
        e[(e['Watching'] = 3)] = 'Watching'
        e[(e['Custom'] = 4)] = 'Custom'
        e[(e['Competing'] = 5)] = 'Competing'
      })((n = t.ActivityType || (t.ActivityType = {})))
      var r
      ;(function (e) {
        e[(e['Instance'] = 1)] = 'Instance'
        e[(e['Join'] = 2)] = 'Join'
        e[(e['Spectate'] = 4)] = 'Spectate'
        e[(e['JoinRequest'] = 8)] = 'JoinRequest'
        e[(e['Sync'] = 16)] = 'Sync'
        e[(e['Play'] = 32)] = 'Play'
        e[(e['PartyPrivacyFriends'] = 64)] = 'PartyPrivacyFriends'
        e[(e['PartyPrivacyVoiceChannel'] = 128)] = 'PartyPrivacyVoiceChannel'
        e[(e['Embedded'] = 256)] = 'Embedded'
      })((r = t.ActivityFlags || (t.ActivityFlags = {})))
    },
    713: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.MembershipScreeningFieldType =
        t.GuildWidgetStyle =
        t.IntegrationExpireBehavior =
        t.GuildFeature =
        t.GuildSystemChannelFlags =
        t.GuildHubType =
        t.GuildPremiumTier =
        t.GuildVerificationLevel =
        t.GuildNSFWLevel =
        t.GuildMFALevel =
        t.GuildExplicitContentFilter =
        t.GuildDefaultMessageNotifications =
          void 0
      var i
      ;(function (e) {
        e[(e['AllMessages'] = 0)] = 'AllMessages'
        e[(e['OnlyMentions'] = 1)] = 'OnlyMentions'
      })(
        (i =
          t.GuildDefaultMessageNotifications ||
          (t.GuildDefaultMessageNotifications = {}))
      )
      var s
      ;(function (e) {
        e[(e['Disabled'] = 0)] = 'Disabled'
        e[(e['MembersWithoutRoles'] = 1)] = 'MembersWithoutRoles'
        e[(e['AllMembers'] = 2)] = 'AllMembers'
      })(
        (s =
          t.GuildExplicitContentFilter || (t.GuildExplicitContentFilter = {}))
      )
      var n
      ;(function (e) {
        e[(e['None'] = 0)] = 'None'
        e[(e['Elevated'] = 1)] = 'Elevated'
      })((n = t.GuildMFALevel || (t.GuildMFALevel = {})))
      var r
      ;(function (e) {
        e[(e['Default'] = 0)] = 'Default'
        e[(e['Explicit'] = 1)] = 'Explicit'
        e[(e['Safe'] = 2)] = 'Safe'
        e[(e['AgeRestricted'] = 3)] = 'AgeRestricted'
      })((r = t.GuildNSFWLevel || (t.GuildNSFWLevel = {})))
      var a
      ;(function (e) {
        e[(e['None'] = 0)] = 'None'
        e[(e['Low'] = 1)] = 'Low'
        e[(e['Medium'] = 2)] = 'Medium'
        e[(e['High'] = 3)] = 'High'
        e[(e['VeryHigh'] = 4)] = 'VeryHigh'
      })((a = t.GuildVerificationLevel || (t.GuildVerificationLevel = {})))
      var o
      ;(function (e) {
        e[(e['None'] = 0)] = 'None'
        e[(e['Tier1'] = 1)] = 'Tier1'
        e[(e['Tier2'] = 2)] = 'Tier2'
        e[(e['Tier3'] = 3)] = 'Tier3'
      })((o = t.GuildPremiumTier || (t.GuildPremiumTier = {})))
      var l
      ;(function (e) {
        e[(e['Default'] = 0)] = 'Default'
        e[(e['HighSchool'] = 1)] = 'HighSchool'
        e[(e['College'] = 2)] = 'College'
      })((l = t.GuildHubType || (t.GuildHubType = {})))
      var c
      ;(function (e) {
        e[(e['SuppressJoinNotifications'] = 1)] = 'SuppressJoinNotifications'
        e[(e['SuppressPremiumSubscriptions'] = 2)] =
          'SuppressPremiumSubscriptions'
        e[(e['SuppressGuildReminderNotifications'] = 4)] =
          'SuppressGuildReminderNotifications'
        e[(e['SuppressJoinNotificationReplies'] = 8)] =
          'SuppressJoinNotificationReplies'
      })((c = t.GuildSystemChannelFlags || (t.GuildSystemChannelFlags = {})))
      var d
      ;(function (e) {
        e['AnimatedBanner'] = 'ANIMATED_BANNER'
        e['AnimatedIcon'] = 'ANIMATED_ICON'
        e['ApplicationCommandPermissionsV2'] =
          'APPLICATION_COMMAND_PERMISSIONS_V2'
        e['AutoModeration'] = 'AUTO_MODERATION'
        e['Banner'] = 'BANNER'
        e['Community'] = 'COMMUNITY'
        e['DeveloperSupportServer'] = 'DEVELOPER_SUPPORT_SERVER'
        e['Discoverable'] = 'DISCOVERABLE'
        e['Featurable'] = 'FEATURABLE'
        e['HasDirectoryEntry'] = 'HAS_DIRECTORY_ENTRY'
        e['Hub'] = 'HUB'
        e['InvitesDisabled'] = 'INVITES_DISABLED'
        e['InviteSplash'] = 'INVITE_SPLASH'
        e['LinkedToHub'] = 'LINKED_TO_HUB'
        e['MemberVerificationGateEnabled'] = 'MEMBER_VERIFICATION_GATE_ENABLED'
        e['MonetizationEnabled'] = 'MONETIZATION_ENABLED'
        e['MoreStickers'] = 'MORE_STICKERS'
        e['News'] = 'NEWS'
        e['Partnered'] = 'PARTNERED'
        e['PreviewEnabled'] = 'PREVIEW_ENABLED'
        e['PrivateThreads'] = 'PRIVATE_THREADS'
        e['RelayEnabled'] = 'RELAY_ENABLED'
        e['RoleIcons'] = 'ROLE_ICONS'
        e['TicketedEventsEnabled'] = 'TICKETED_EVENTS_ENABLED'
        e['VanityURL'] = 'VANITY_URL'
        e['Verified'] = 'VERIFIED'
        e['VIPRegions'] = 'VIP_REGIONS'
        e['WelcomeScreenEnabled'] = 'WELCOME_SCREEN_ENABLED'
      })((d = t.GuildFeature || (t.GuildFeature = {})))
      var u
      ;(function (e) {
        e[(e['RemoveRole'] = 0)] = 'RemoveRole'
        e[(e['Kick'] = 1)] = 'Kick'
      })(
        (u = t.IntegrationExpireBehavior || (t.IntegrationExpireBehavior = {}))
      )
      var h
      ;(function (e) {
        e['Shield'] = 'shield'
        e['Banner1'] = 'banner1'
        e['Banner2'] = 'banner2'
        e['Banner3'] = 'banner3'
        e['Banner4'] = 'banner4'
      })((h = t.GuildWidgetStyle || (t.GuildWidgetStyle = {})))
      var m
      ;(function (e) {
        e['Terms'] = 'TERMS'
      })(
        (m =
          t.MembershipScreeningFieldType ||
          (t.MembershipScreeningFieldType = {}))
      )
    },
    4446: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.GuildScheduledEventPrivacyLevel =
        t.GuildScheduledEventStatus =
        t.GuildScheduledEventEntityType =
          void 0
      var i
      ;(function (e) {
        e[(e['StageInstance'] = 1)] = 'StageInstance'
        e[(e['Voice'] = 2)] = 'Voice'
        e[(e['External'] = 3)] = 'External'
      })(
        (i =
          t.GuildScheduledEventEntityType ||
          (t.GuildScheduledEventEntityType = {}))
      )
      var s
      ;(function (e) {
        e[(e['Scheduled'] = 1)] = 'Scheduled'
        e[(e['Active'] = 2)] = 'Active'
        e[(e['Completed'] = 3)] = 'Completed'
        e[(e['Canceled'] = 4)] = 'Canceled'
      })(
        (s = t.GuildScheduledEventStatus || (t.GuildScheduledEventStatus = {}))
      )
      var n
      ;(function (e) {
        e[(e['GuildOnly'] = 2)] = 'GuildOnly'
      })(
        (n =
          t.GuildScheduledEventPrivacyLevel ||
          (t.GuildScheduledEventPrivacyLevel = {}))
      )
    },
    7999: function (e, t, i) {
      'use strict'
      var s =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, i, s) {
              if (s === undefined) s = i
              var n = Object.getOwnPropertyDescriptor(t, i)
              if (
                !n ||
                ('get' in n ? !t.__esModule : n.writable || n.configurable)
              ) {
                n = {
                  enumerable: true,
                  get: function () {
                    return t[i]
                  },
                }
              }
              Object.defineProperty(e, s, n)
            }
          : function (e, t, i, s) {
              if (s === undefined) s = i
              e[s] = t[i]
            })
      var n =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var i in e)
            if (i !== 'default' && !Object.prototype.hasOwnProperty.call(t, i))
              s(t, e, i)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      n(i(3736), t)
      n(i(2484), t)
      n(i(5937), t)
      n(i(5130), t)
      n(i(2876), t)
      n(i(8419), t)
      n(i(6702), t)
      n(i(713), t)
      n(i(4446), t)
      n(i(2580), t)
      n(i(4520), t)
      n(i(8718), t)
      n(i(5278), t)
      n(i(5009), t)
      n(i(4877), t)
      n(i(9097), t)
      n(i(8018), t)
      n(i(622), t)
      n(i(4658), t)
      n(i(6744), t)
    },
    2580: function (e, t, i) {
      'use strict'
      var s =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, i, s) {
              if (s === undefined) s = i
              var n = Object.getOwnPropertyDescriptor(t, i)
              if (
                !n ||
                ('get' in n ? !t.__esModule : n.writable || n.configurable)
              ) {
                n = {
                  enumerable: true,
                  get: function () {
                    return t[i]
                  },
                }
              }
              Object.defineProperty(e, s, n)
            }
          : function (e, t, i, s) {
              if (s === undefined) s = i
              e[s] = t[i]
            })
      var n =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var i in e)
            if (i !== 'default' && !Object.prototype.hasOwnProperty.call(t, i))
              s(t, e, i)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      n(i(1633), t)
      n(i(5260), t)
      n(i(4716), t)
      n(i(4439), t)
      n(i(791), t)
      n(i(6322), t)
      n(i(6339), t)
    },
    4520: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.InviteTargetType = void 0
      var i
      ;(function (e) {
        e[(e['Stream'] = 1)] = 'Stream'
        e[(e['EmbeddedApplication'] = 2)] = 'EmbeddedApplication'
      })((i = t.InviteTargetType || (t.InviteTargetType = {})))
    },
    8718: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.OAuth2Scopes = void 0
      var i
      ;(function (e) {
        e['Bot'] = 'bot'
        e['Connections'] = 'connections'
        e['DMChannelsRead'] = 'dm_channels.read'
        e['Email'] = 'email'
        e['Identify'] = 'identify'
        e['Guilds'] = 'guilds'
        e['GuildsJoin'] = 'guilds.join'
        e['GuildsMembersRead'] = 'guilds.members.read'
        e['GroupDMJoins'] = 'gdm.join'
        e['MessagesRead'] = 'messages.read'
        e['RPC'] = 'rpc'
        e['RPCNotificationsRead'] = 'rpc.notifications.read'
        e['WebhookIncoming'] = 'webhook.incoming'
        e['Voice'] = 'voice'
        e['ApplicationsBuildsUpload'] = 'applications.builds.upload'
        e['ApplicationsBuildsRead'] = 'applications.builds.read'
        e['ApplicationsStoreUpdate'] = 'applications.store.update'
        e['ApplicationsEntitlements'] = 'applications.entitlements'
        e['RelationshipsRead'] = 'relationships.read'
        e['ActivitiesRead'] = 'activities.read'
        e['ActivitiesWrite'] = 'activities.write'
        e['ApplicationsCommands'] = 'applications.commands'
        e['ApplicationsCommandsUpdate'] = 'applications.commands.update'
        e['ApplicationCommandsPermissionsUpdate'] =
          'applications.commands.permissions.update'
      })((i = t.OAuth2Scopes || (t.OAuth2Scopes = {})))
    },
    5278: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    5009: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.StageInstancePrivacyLevel = void 0
      var i
      ;(function (e) {
        e[(e['Public'] = 1)] = 'Public'
        e[(e['GuildOnly'] = 2)] = 'GuildOnly'
      })(
        (i = t.StageInstancePrivacyLevel || (t.StageInstancePrivacyLevel = {}))
      )
    },
    4877: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.StickerFormatType = t.StickerType = void 0
      var i
      ;(function (e) {
        e[(e['Standard'] = 1)] = 'Standard'
        e[(e['Guild'] = 2)] = 'Guild'
      })((i = t.StickerType || (t.StickerType = {})))
      var s
      ;(function (e) {
        e[(e['PNG'] = 1)] = 'PNG'
        e[(e['APNG'] = 2)] = 'APNG'
        e[(e['Lottie'] = 3)] = 'Lottie'
      })((s = t.StickerFormatType || (t.StickerFormatType = {})))
    },
    9097: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.TeamMemberMembershipState = void 0
      var i
      ;(function (e) {
        e[(e['Invited'] = 1)] = 'Invited'
        e[(e['Accepted'] = 2)] = 'Accepted'
      })(
        (i = t.TeamMemberMembershipState || (t.TeamMemberMembershipState = {}))
      )
    },
    8018: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    622: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.ConnectionVisibility =
        t.ConnectionService =
        t.UserPremiumType =
        t.UserFlags =
          void 0
      var i
      ;(function (e) {
        e[(e['Staff'] = 1)] = 'Staff'
        e[(e['Partner'] = 2)] = 'Partner'
        e[(e['Hypesquad'] = 4)] = 'Hypesquad'
        e[(e['BugHunterLevel1'] = 8)] = 'BugHunterLevel1'
        e[(e['HypeSquadOnlineHouse1'] = 64)] = 'HypeSquadOnlineHouse1'
        e[(e['HypeSquadOnlineHouse2'] = 128)] = 'HypeSquadOnlineHouse2'
        e[(e['HypeSquadOnlineHouse3'] = 256)] = 'HypeSquadOnlineHouse3'
        e[(e['PremiumEarlySupporter'] = 512)] = 'PremiumEarlySupporter'
        e[(e['TeamPseudoUser'] = 1024)] = 'TeamPseudoUser'
        e[(e['BugHunterLevel2'] = 16384)] = 'BugHunterLevel2'
        e[(e['VerifiedBot'] = 65536)] = 'VerifiedBot'
        e[(e['VerifiedDeveloper'] = 131072)] = 'VerifiedDeveloper'
        e[(e['CertifiedModerator'] = 262144)] = 'CertifiedModerator'
        e[(e['BotHTTPInteractions'] = 524288)] = 'BotHTTPInteractions'
        e[(e['Spammer'] = 1048576)] = 'Spammer'
        e[(e['ActiveDeveloper'] = 4194304)] = 'ActiveDeveloper'
        e[(e['Quarantined'] = 17592186044416)] = 'Quarantined'
      })((i = t.UserFlags || (t.UserFlags = {})))
      var s
      ;(function (e) {
        e[(e['None'] = 0)] = 'None'
        e[(e['NitroClassic'] = 1)] = 'NitroClassic'
        e[(e['Nitro'] = 2)] = 'Nitro'
        e[(e['NitroBasic'] = 3)] = 'NitroBasic'
      })((s = t.UserPremiumType || (t.UserPremiumType = {})))
      var n
      ;(function (e) {
        e['BattleNet'] = 'battlenet'
        e['eBay'] = 'ebay'
        e['EpicGames'] = 'epicgames'
        e['Facebook'] = 'facebook'
        e['GitHub'] = 'github'
        e['LeagueOfLegends'] = 'leagueoflegends'
        e['PayPal'] = 'paypal'
        e['PlayStationNetwork'] = 'playstation'
        e['Reddit'] = 'reddit'
        e['RiotGames'] = 'riotgames'
        e['Spotify'] = 'spotify'
        e['Skype'] = 'skype'
        e['Steam'] = 'steam'
        e['Twitch'] = 'twitch'
        e['Twitter'] = 'twitter'
        e['Xbox'] = 'xbox'
        e['YouTube'] = 'youtube'
      })((n = t.ConnectionService || (t.ConnectionService = {})))
      var r
      ;(function (e) {
        e[(e['None'] = 0)] = 'None'
        e[(e['Everyone'] = 1)] = 'Everyone'
      })((r = t.ConnectionVisibility || (t.ConnectionVisibility = {})))
    },
    4658: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    6744: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.WebhookType = void 0
      var i
      ;(function (e) {
        e[(e['Incoming'] = 1)] = 'Incoming'
        e[(e['ChannelFollower'] = 2)] = 'ChannelFollower'
        e[(e['Application'] = 3)] = 'Application'
      })((i = t.WebhookType || (t.WebhookType = {})))
    },
    9745: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.Locale = t.RESTJSONErrorCodes = void 0
      var i
      ;(function (e) {
        e[(e['GeneralError'] = 0)] = 'GeneralError'
        e[(e['UnknownAccount'] = 10001)] = 'UnknownAccount'
        e[(e['UnknownApplication'] = 10002)] = 'UnknownApplication'
        e[(e['UnknownChannel'] = 10003)] = 'UnknownChannel'
        e[(e['UnknownGuild'] = 10004)] = 'UnknownGuild'
        e[(e['UnknownIntegration'] = 10005)] = 'UnknownIntegration'
        e[(e['UnknownInvite'] = 10006)] = 'UnknownInvite'
        e[(e['UnknownMember'] = 10007)] = 'UnknownMember'
        e[(e['UnknownMessage'] = 10008)] = 'UnknownMessage'
        e[(e['UnknownPermissionOverwrite'] = 10009)] =
          'UnknownPermissionOverwrite'
        e[(e['UnknownProvider'] = 10010)] = 'UnknownProvider'
        e[(e['UnknownRole'] = 10011)] = 'UnknownRole'
        e[(e['UnknownToken'] = 10012)] = 'UnknownToken'
        e[(e['UnknownUser'] = 10013)] = 'UnknownUser'
        e[(e['UnknownEmoji'] = 10014)] = 'UnknownEmoji'
        e[(e['UnknownWebhook'] = 10015)] = 'UnknownWebhook'
        e[(e['UnknownWebhookService'] = 10016)] = 'UnknownWebhookService'
        e[(e['UnknownSession'] = 10020)] = 'UnknownSession'
        e[(e['UnknownBan'] = 10026)] = 'UnknownBan'
        e[(e['UnknownSKU'] = 10027)] = 'UnknownSKU'
        e[(e['UnknownStoreListing'] = 10028)] = 'UnknownStoreListing'
        e[(e['UnknownEntitlement'] = 10029)] = 'UnknownEntitlement'
        e[(e['UnknownBuild'] = 10030)] = 'UnknownBuild'
        e[(e['UnknownLobby'] = 10031)] = 'UnknownLobby'
        e[(e['UnknownBranch'] = 10032)] = 'UnknownBranch'
        e[(e['UnknownStoreDirectoryLayout'] = 10033)] =
          'UnknownStoreDirectoryLayout'
        e[(e['UnknownRedistributable'] = 10036)] = 'UnknownRedistributable'
        e[(e['UnknownGiftCode'] = 10038)] = 'UnknownGiftCode'
        e[(e['UnknownStream'] = 10049)] = 'UnknownStream'
        e[(e['UnknownPremiumServerSubscribeCooldown'] = 10050)] =
          'UnknownPremiumServerSubscribeCooldown'
        e[(e['UnknownGuildTemplate'] = 10057)] = 'UnknownGuildTemplate'
        e[(e['UnknownDiscoverableServerCategory'] = 10059)] =
          'UnknownDiscoverableServerCategory'
        e[(e['UnknownSticker'] = 10060)] = 'UnknownSticker'
        e[(e['UnknownInteraction'] = 10062)] = 'UnknownInteraction'
        e[(e['UnknownApplicationCommand'] = 10063)] =
          'UnknownApplicationCommand'
        e[(e['UnknownVoiceState'] = 10065)] = 'UnknownVoiceState'
        e[(e['UnknownApplicationCommandPermissions'] = 10066)] =
          'UnknownApplicationCommandPermissions'
        e[(e['UnknownStageInstance'] = 10067)] = 'UnknownStageInstance'
        e[(e['UnknownGuildMemberVerificationForm'] = 10068)] =
          'UnknownGuildMemberVerificationForm'
        e[(e['UnknownGuildWelcomeScreen'] = 10069)] =
          'UnknownGuildWelcomeScreen'
        e[(e['UnknownGuildScheduledEvent'] = 10070)] =
          'UnknownGuildScheduledEvent'
        e[(e['UnknownGuildScheduledEventUser'] = 10071)] =
          'UnknownGuildScheduledEventUser'
        e[(e['UnknownTag'] = 10087)] = 'UnknownTag'
        e[(e['BotsCannotUseThisEndpoint'] = 20001)] =
          'BotsCannotUseThisEndpoint'
        e[(e['OnlyBotsCanUseThisEndpoint'] = 20002)] =
          'OnlyBotsCanUseThisEndpoint'
        e[(e['ExplicitContentCannotBeSentToTheDesiredRecipient'] = 20009)] =
          'ExplicitContentCannotBeSentToTheDesiredRecipient'
        e[(e['NotAuthorizedToPerformThisActionOnThisApplication'] = 20012)] =
          'NotAuthorizedToPerformThisActionOnThisApplication'
        e[(e['ActionCannotBePerformedDueToSlowmodeRateLimit'] = 20016)] =
          'ActionCannotBePerformedDueToSlowmodeRateLimit'
        e[(e['TheMazeIsntMeantForYou'] = 20017)] = 'TheMazeIsntMeantForYou'
        e[(e['OnlyTheOwnerOfThisAccountCanPerformThisAction'] = 20018)] =
          'OnlyTheOwnerOfThisAccountCanPerformThisAction'
        e[(e['AnnouncementEditLimitExceeded'] = 20022)] =
          'AnnouncementEditLimitExceeded'
        e[(e['UnderMinimumAge'] = 20024)] = 'UnderMinimumAge'
        e[(e['ChannelSendRateLimit'] = 20028)] = 'ChannelSendRateLimit'
        e[(e['ServerSendRateLimit'] = 20029)] = 'ServerSendRateLimit'
        e[
          (e[
            'StageTopicServerNameServerDescriptionOrChannelNamesContainDisallowedWords'
          ] = 20031)
        ] =
          'StageTopicServerNameServerDescriptionOrChannelNamesContainDisallowedWords'
        e[(e['GuildPremiumSubscriptionLevelTooLow'] = 20035)] =
          'GuildPremiumSubscriptionLevelTooLow'
        e[(e['MaximumNumberOfGuildsReached'] = 30001)] =
          'MaximumNumberOfGuildsReached'
        e[(e['MaximumNumberOfFriendsReached'] = 30002)] =
          'MaximumNumberOfFriendsReached'
        e[(e['MaximumNumberOfPinsReachedForTheChannel'] = 30003)] =
          'MaximumNumberOfPinsReachedForTheChannel'
        e[(e['MaximumNumberOfRecipientsReached'] = 30004)] =
          'MaximumNumberOfRecipientsReached'
        e[(e['MaximumNumberOfGuildRolesReached'] = 30005)] =
          'MaximumNumberOfGuildRolesReached'
        e[(e['MaximumNumberOfWebhooksReached'] = 30007)] =
          'MaximumNumberOfWebhooksReached'
        e[(e['MaximumNumberOfEmojisReached'] = 30008)] =
          'MaximumNumberOfEmojisReached'
        e[(e['MaximumNumberOfReactionsReached'] = 30010)] =
          'MaximumNumberOfReactionsReached'
        e[(e['MaximumNumberOfGuildChannelsReached'] = 30013)] =
          'MaximumNumberOfGuildChannelsReached'
        e[(e['MaximumNumberOfAttachmentsInAMessageReached'] = 30015)] =
          'MaximumNumberOfAttachmentsInAMessageReached'
        e[(e['MaximumNumberOfInvitesReached'] = 30016)] =
          'MaximumNumberOfInvitesReached'
        e[(e['MaximumNumberOfAnimatedEmojisReached'] = 30018)] =
          'MaximumNumberOfAnimatedEmojisReached'
        e[(e['MaximumNumberOfServerMembersReached'] = 30019)] =
          'MaximumNumberOfServerMembersReached'
        e[(e['MaximumNumberOfServerCategoriesReached'] = 30030)] =
          'MaximumNumberOfServerCategoriesReached'
        e[(e['GuildAlreadyHasTemplate'] = 30031)] = 'GuildAlreadyHasTemplate'
        e[(e['MaximumNumberOfApplicationCommandsReached'] = 30032)] =
          'MaximumNumberOfApplicationCommandsReached'
        e[(e['MaximumThreadParticipantsReached'] = 30033)] =
          'MaximumThreadParticipantsReached'
        e[(e['MaximumDailyApplicationCommandCreatesReached'] = 30034)] =
          'MaximumDailyApplicationCommandCreatesReached'
        e[(e['MaximumNumberOfNonGuildMemberBansHasBeenExceeded'] = 30035)] =
          'MaximumNumberOfNonGuildMemberBansHasBeenExceeded'
        e[(e['MaximumNumberOfBanFetchesHasBeenReached'] = 30037)] =
          'MaximumNumberOfBanFetchesHasBeenReached'
        e[
          (e['MaximumNumberOfUncompletedGuildScheduledEventsReached'] = 30038)
        ] = 'MaximumNumberOfUncompletedGuildScheduledEventsReached'
        e[(e['MaximumNumberOfStickersReached'] = 30039)] =
          'MaximumNumberOfStickersReached'
        e[(e['MaximumNumberOfPruneRequestsHasBeenReached'] = 30040)] =
          'MaximumNumberOfPruneRequestsHasBeenReached'
        e[
          (e['MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReached'] = 30042)
        ] = 'MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReached'
        e[
          (e['MaximumNumberOfEditsToMessagesOlderThanOneHourReached'] = 30046)
        ] = 'MaximumNumberOfEditsToMessagesOlderThanOneHourReached'
        e[(e['MaximumNumberOfPinnedThreadsInForumHasBeenReached'] = 30047)] =
          'MaximumNumberOfPinnedThreadsInForumHasBeenReached'
        e[(e['MaximumNumberOfTagsInForumHasBeenReached'] = 30048)] =
          'MaximumNumberOfTagsInForumHasBeenReached'
        e[(e['BitrateIsTooHighForChannelOfThisType'] = 30052)] =
          'BitrateIsTooHighForChannelOfThisType'
        e[(e['Unauthorized'] = 40001)] = 'Unauthorized'
        e[(e['VerifyYourAccount'] = 40002)] = 'VerifyYourAccount'
        e[(e['OpeningDirectMessagesTooFast'] = 40003)] =
          'OpeningDirectMessagesTooFast'
        e[(e['SendMessagesHasBeenTemporarilyDisabled'] = 40004)] =
          'SendMessagesHasBeenTemporarilyDisabled'
        e[(e['RequestEntityTooLarge'] = 40005)] = 'RequestEntityTooLarge'
        e[(e['FeatureTemporarilyDisabledServerSide'] = 40006)] =
          'FeatureTemporarilyDisabledServerSide'
        e[(e['UserBannedFromThisGuild'] = 40007)] = 'UserBannedFromThisGuild'
        e[(e['ConnectionHasBeenRevoked'] = 40012)] = 'ConnectionHasBeenRevoked'
        e[(e['TargetUserIsNotConnectedToVoice'] = 40032)] =
          'TargetUserIsNotConnectedToVoice'
        e[(e['ThisMessageWasAlreadyCrossposted'] = 40033)] =
          'ThisMessageWasAlreadyCrossposted'
        e[(e['ApplicationCommandWithThatNameAlreadyExists'] = 40041)] =
          'ApplicationCommandWithThatNameAlreadyExists'
        e[(e['ApplicationInteractionFailedToSend'] = 40043)] =
          'ApplicationInteractionFailedToSend'
        e[(e['CannotSendAMessageInAForumChannel'] = 40058)] =
          'CannotSendAMessageInAForumChannel'
        e[(e['InteractionHasAlreadyBeenAcknowledged'] = 40060)] =
          'InteractionHasAlreadyBeenAcknowledged'
        e[(e['TagNamesMustBeUnique'] = 40061)] = 'TagNamesMustBeUnique'
        e[(e['ThereAreNoTagsAvailableThatCanBeSetByNonModerators'] = 40066)] =
          'ThereAreNoTagsAvailableThatCanBeSetByNonModerators'
        e[(e['TagRequiredToCreateAForumPostInThisChannel'] = 40067)] =
          'TagRequiredToCreateAForumPostInThisChannel'
        e[(e['MissingAccess'] = 50001)] = 'MissingAccess'
        e[(e['InvalidAccountType'] = 50002)] = 'InvalidAccountType'
        e[(e['CannotExecuteActionOnDMChannel'] = 50003)] =
          'CannotExecuteActionOnDMChannel'
        e[(e['GuildWidgetDisabled'] = 50004)] = 'GuildWidgetDisabled'
        e[(e['CannotEditMessageAuthoredByAnotherUser'] = 50005)] =
          'CannotEditMessageAuthoredByAnotherUser'
        e[(e['CannotSendAnEmptyMessage'] = 50006)] = 'CannotSendAnEmptyMessage'
        e[(e['CannotSendMessagesToThisUser'] = 50007)] =
          'CannotSendMessagesToThisUser'
        e[(e['CannotSendMessagesInNonTextChannel'] = 50008)] =
          'CannotSendMessagesInNonTextChannel'
        e[(e['ChannelVerificationLevelTooHighForYouToGainAccess'] = 50009)] =
          'ChannelVerificationLevelTooHighForYouToGainAccess'
        e[(e['OAuth2ApplicationDoesNotHaveBot'] = 50010)] =
          'OAuth2ApplicationDoesNotHaveBot'
        e[(e['OAuth2ApplicationLimitReached'] = 50011)] =
          'OAuth2ApplicationLimitReached'
        e[(e['InvalidOAuth2State'] = 50012)] = 'InvalidOAuth2State'
        e[(e['MissingPermissions'] = 50013)] = 'MissingPermissions'
        e[(e['InvalidToken'] = 50014)] = 'InvalidToken'
        e[(e['NoteWasTooLong'] = 50015)] = 'NoteWasTooLong'
        e[(e['ProvidedTooFewOrTooManyMessagesToDelete'] = 50016)] =
          'ProvidedTooFewOrTooManyMessagesToDelete'
        e[(e['InvalidMFALevel'] = 50017)] = 'InvalidMFALevel'
        e[(e['MessageCanOnlyBePinnedInTheChannelItWasSentIn'] = 50019)] =
          'MessageCanOnlyBePinnedInTheChannelItWasSentIn'
        e[(e['InviteCodeInvalidOrTaken'] = 50020)] = 'InviteCodeInvalidOrTaken'
        e[(e['CannotExecuteActionOnSystemMessage'] = 50021)] =
          'CannotExecuteActionOnSystemMessage'
        e[(e['CannotExecuteActionOnThisChannelType'] = 50024)] =
          'CannotExecuteActionOnThisChannelType'
        e[(e['InvalidOAuth2AccessToken'] = 50025)] = 'InvalidOAuth2AccessToken'
        e[(e['MissingRequiredOAuth2Scope'] = 50026)] =
          'MissingRequiredOAuth2Scope'
        e[(e['InvalidWebhookToken'] = 50027)] = 'InvalidWebhookToken'
        e[(e['InvalidRole'] = 50028)] = 'InvalidRole'
        e[(e['InvalidRecipients'] = 50033)] = 'InvalidRecipients'
        e[(e['OneOfTheMessagesProvidedWasTooOldForBulkDelete'] = 50034)] =
          'OneOfTheMessagesProvidedWasTooOldForBulkDelete'
        e[(e['InvalidFormBodyOrContentType'] = 50035)] =
          'InvalidFormBodyOrContentType'
        e[(e['InviteAcceptedToGuildWithoutTheBotBeingIn'] = 50036)] =
          'InviteAcceptedToGuildWithoutTheBotBeingIn'
        e[(e['InvalidActivityAction'] = 50039)] = 'InvalidActivityAction'
        e[(e['InvalidAPIVersion'] = 50041)] = 'InvalidAPIVersion'
        e[(e['FileUploadedExceedsMaximumSize'] = 50045)] =
          'FileUploadedExceedsMaximumSize'
        e[(e['InvalidFileUploaded'] = 50046)] = 'InvalidFileUploaded'
        e[(e['CannotSelfRedeemThisGift'] = 50054)] = 'CannotSelfRedeemThisGift'
        e[(e['InvalidGuild'] = 50055)] = 'InvalidGuild'
        e[(e['InvalidMessageType'] = 50068)] = 'InvalidMessageType'
        e[(e['PaymentSourceRequiredToRedeemGift'] = 50070)] =
          'PaymentSourceRequiredToRedeemGift'
        e[(e['CannotModifyASystemWebhook'] = 50073)] =
          'CannotModifyASystemWebhook'
        e[(e['CannotDeleteChannelRequiredForCommunityGuilds'] = 50074)] =
          'CannotDeleteChannelRequiredForCommunityGuilds'
        e[(e['CannotEditStickersWithinMessage'] = 50080)] =
          'CannotEditStickersWithinMessage'
        e[(e['InvalidStickerSent'] = 50081)] = 'InvalidStickerSent'
        e[(e['InvalidActionOnArchivedThread'] = 50083)] =
          'InvalidActionOnArchivedThread'
        e[(e['InvalidThreadNotificationSettings'] = 50084)] =
          'InvalidThreadNotificationSettings'
        e[(e['ParameterEarlierThanCreation'] = 50085)] =
          'ParameterEarlierThanCreation'
        e[(e['CommunityServerChannelsMustBeTextChannels'] = 50086)] =
          'CommunityServerChannelsMustBeTextChannels'
        e[(e['ServerNotAvailableInYourLocation'] = 50095)] =
          'ServerNotAvailableInYourLocation'
        e[(e['ServerNeedsMonetizationEnabledToPerformThisAction'] = 50097)] =
          'ServerNeedsMonetizationEnabledToPerformThisAction'
        e[(e['ServerNeedsMoreBoostsToPerformThisAction'] = 50101)] =
          'ServerNeedsMoreBoostsToPerformThisAction'
        e[(e['RequestBodyContainsInvalidJSON'] = 50109)] =
          'RequestBodyContainsInvalidJSON'
        e[(e['OwnershipCannotBeMovedToABotUser'] = 50132)] =
          'OwnershipCannotBeMovedToABotUser'
        e[(e['FailedToResizeAssetBelowTheMinimumSize'] = 50138)] =
          'FailedToResizeAssetBelowTheMinimumSize'
        e[(e['UploadedFileNotFound'] = 50146)] = 'UploadedFileNotFound'
        e[(e['YouDoNotHavePermissionToSendThisSticker'] = 50600)] =
          'YouDoNotHavePermissionToSendThisSticker'
        e[(e['TwoFactorAuthenticationIsRequired'] = 60003)] =
          'TwoFactorAuthenticationIsRequired'
        e[(e['NoUsersWithDiscordTagExist'] = 80004)] =
          'NoUsersWithDiscordTagExist'
        e[(e['ReactionWasBlocked'] = 90001)] = 'ReactionWasBlocked'
        e[(e['ApplicationNotYetAvailable'] = 110001)] =
          'ApplicationNotYetAvailable'
        e[(e['APIResourceOverloaded'] = 13e4)] = 'APIResourceOverloaded'
        e[(e['TheStageIsAlreadyOpen'] = 150006)] = 'TheStageIsAlreadyOpen'
        e[(e['CannotReplyWithoutPermissionToReadMessageHistory'] = 160002)] =
          'CannotReplyWithoutPermissionToReadMessageHistory'
        e[(e['ThreadAlreadyCreatedForMessage'] = 160004)] =
          'ThreadAlreadyCreatedForMessage'
        e[(e['ThreadLocked'] = 160005)] = 'ThreadLocked'
        e[(e['MaximumActiveThreads'] = 160006)] = 'MaximumActiveThreads'
        e[(e['MaximumActiveAnnouncementThreads'] = 160007)] =
          'MaximumActiveAnnouncementThreads'
        e[(e['InvalidJSONForUploadedLottieFile'] = 170001)] =
          'InvalidJSONForUploadedLottieFile'
        e[(e['UploadedLottiesCannotContainRasterizedImages'] = 170002)] =
          'UploadedLottiesCannotContainRasterizedImages'
        e[(e['StickerMaximumFramerateExceeded'] = 170003)] =
          'StickerMaximumFramerateExceeded'
        e[(e['StickerFrameCountExceedsMaximumOf1000Frames'] = 170004)] =
          'StickerFrameCountExceedsMaximumOf1000Frames'
        e[(e['LottieAnimationMaximumDimensionsExceeded'] = 170005)] =
          'LottieAnimationMaximumDimensionsExceeded'
        e[(e['StickerFramerateIsTooSmallOrTooLarge'] = 170006)] =
          'StickerFramerateIsTooSmallOrTooLarge'
        e[(e['StickerAnimationDurationExceedsMaximumOf5Seconds'] = 170007)] =
          'StickerAnimationDurationExceedsMaximumOf5Seconds'
        e[(e['CannotUpdateAFinishedEvent'] = 18e4)] =
          'CannotUpdateAFinishedEvent'
        e[(e['FailedToCreateStageNeededForStageEvent'] = 180002)] =
          'FailedToCreateStageNeededForStageEvent'
        e[(e['MessageWasBlockedByAutomaticModeration'] = 2e5)] =
          'MessageWasBlockedByAutomaticModeration'
        e[(e['TitleWasBlockedByAutomaticModeration'] = 200001)] =
          'TitleWasBlockedByAutomaticModeration'
        e[
          (e[
            'WebhooksPostedToForumChannelsMustHaveAThreadNameOrThreadId'
          ] = 220001)
        ] = 'WebhooksPostedToForumChannelsMustHaveAThreadNameOrThreadId'
        e[
          (e[
            'WebhooksPostedToForumChannelsCannotHaveBothAThreadNameAndThreadId'
          ] = 220002)
        ] = 'WebhooksPostedToForumChannelsCannotHaveBothAThreadNameAndThreadId'
        e[(e['WebhooksCanOnlyCreateThreadsInForumChannels'] = 220003)] =
          'WebhooksCanOnlyCreateThreadsInForumChannels'
        e[(e['WebhookServicesCannotBeUsedInForumChannels'] = 220004)] =
          'WebhookServicesCannotBeUsedInForumChannels'
        e[(e['MessageBlockedByHarmfulLinksFilter'] = 24e4)] =
          'MessageBlockedByHarmfulLinksFilter'
      })((i = t.RESTJSONErrorCodes || (t.RESTJSONErrorCodes = {})))
      var s
      ;(function (e) {
        e['EnglishUS'] = 'en-US'
        e['EnglishGB'] = 'en-GB'
        e['Bulgarian'] = 'bg'
        e['ChineseCN'] = 'zh-CN'
        e['ChineseTW'] = 'zh-TW'
        e['Croatian'] = 'hr'
        e['Czech'] = 'cs'
        e['Danish'] = 'da'
        e['Dutch'] = 'nl'
        e['Finnish'] = 'fi'
        e['French'] = 'fr'
        e['German'] = 'de'
        e['Greek'] = 'el'
        e['Hindi'] = 'hi'
        e['Hungarian'] = 'hu'
        e['Italian'] = 'it'
        e['Japanese'] = 'ja'
        e['Korean'] = 'ko'
        e['Lithuanian'] = 'lt'
        e['Norwegian'] = 'no'
        e['Polish'] = 'pl'
        e['PortugueseBR'] = 'pt-BR'
        e['Romanian'] = 'ro'
        e['Russian'] = 'ru'
        e['SpanishES'] = 'es-ES'
        e['Swedish'] = 'sv-SE'
        e['Thai'] = 'th'
        e['Turkish'] = 'tr'
        e['Ukrainian'] = 'uk'
        e['Vietnamese'] = 'vi'
      })((s = t.Locale || (t.Locale = {})))
    },
    6167: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    7672: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    2878: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    4352: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    8908: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    3220: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    7927: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    8843: function (e, t, i) {
      'use strict'
      var s =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, i, s) {
              if (s === undefined) s = i
              var n = Object.getOwnPropertyDescriptor(t, i)
              if (
                !n ||
                ('get' in n ? !t.__esModule : n.writable || n.configurable)
              ) {
                n = {
                  enumerable: true,
                  get: function () {
                    return t[i]
                  },
                }
              }
              Object.defineProperty(e, s, n)
            }
          : function (e, t, i, s) {
              if (s === undefined) s = i
              e[s] = t[i]
            })
      var n =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var i in e)
            if (i !== 'default' && !Object.prototype.hasOwnProperty.call(t, i))
              s(t, e, i)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      t.OAuth2Routes =
        t.RouteBases =
        t.ImageFormat =
        t.CDNRoutes =
        t.StickerPackApplicationId =
        t.Routes =
        t.APIVersion =
          void 0
      n(i(9745), t)
      n(i(6167), t)
      n(i(7672), t)
      n(i(2878), t)
      n(i(4352), t)
      n(i(8908), t)
      n(i(3220), t)
      n(i(7927), t)
      n(i(2220), t)
      n(i(1018), t)
      n(i(4576), t)
      n(i(2957), t)
      n(i(5426), t)
      n(i(5927), t)
      n(i(9005), t)
      n(i(7570), t)
      n(i(3531), t)
      t.APIVersion = '10'
      t.Routes = {
        guildAutoModerationRules(e) {
          return `/guilds/${e}/auto-moderation/rules`
        },
        guildAutoModerationRule(e, t) {
          return `/guilds/${e}/auto-moderation/rules/${t}`
        },
        guildAuditLog(e) {
          return `/guilds/${e}/audit-logs`
        },
        channel(e) {
          return `/channels/${e}`
        },
        channelMessages(e) {
          return `/channels/${e}/messages`
        },
        channelMessage(e, t) {
          return `/channels/${e}/messages/${t}`
        },
        channelMessageCrosspost(e, t) {
          return `/channels/${e}/messages/${t}/crosspost`
        },
        channelMessageOwnReaction(e, t, i) {
          return `/channels/${e}/messages/${t}/reactions/${i}/@me`
        },
        channelMessageUserReaction(e, t, i, s) {
          return `/channels/${e}/messages/${t}/reactions/${i}/${s}`
        },
        channelMessageReaction(e, t, i) {
          return `/channels/${e}/messages/${t}/reactions/${i}`
        },
        channelMessageAllReactions(e, t) {
          return `/channels/${e}/messages/${t}/reactions`
        },
        channelBulkDelete(e) {
          return `/channels/${e}/messages/bulk-delete`
        },
        channelPermission(e, t) {
          return `/channels/${e}/permissions/${t}`
        },
        channelInvites(e) {
          return `/channels/${e}/invites`
        },
        channelFollowers(e) {
          return `/channels/${e}/followers`
        },
        channelTyping(e) {
          return `/channels/${e}/typing`
        },
        channelPins(e) {
          return `/channels/${e}/pins`
        },
        channelPin(e, t) {
          return `/channels/${e}/pins/${t}`
        },
        channelRecipient(e, t) {
          return `/channels/${e}/recipients/${t}`
        },
        guildEmojis(e) {
          return `/guilds/${e}/emojis`
        },
        guildEmoji(e, t) {
          return `/guilds/${e}/emojis/${t}`
        },
        guilds() {
          return '/guilds'
        },
        guild(e) {
          return `/guilds/${e}`
        },
        guildPreview(e) {
          return `/guilds/${e}/preview`
        },
        guildChannels(e) {
          return `/guilds/${e}/channels`
        },
        guildMember(e, t = '@me') {
          return `/guilds/${e}/members/${t}`
        },
        guildMembers(e) {
          return `/guilds/${e}/members`
        },
        guildMembersSearch(e) {
          return `/guilds/${e}/members/search`
        },
        guildCurrentMemberNickname(e) {
          return `/guilds/${e}/members/@me/nick`
        },
        guildMemberRole(e, t, i) {
          return `/guilds/${e}/members/${t}/roles/${i}`
        },
        guildMFA(e) {
          return `/guilds/${e}/mfa`
        },
        guildBans(e) {
          return `/guilds/${e}/bans`
        },
        guildBan(e, t) {
          return `/guilds/${e}/bans/${t}`
        },
        guildRoles(e) {
          return `/guilds/${e}/roles`
        },
        guildRole(e, t) {
          return `/guilds/${e}/roles/${t}`
        },
        guildPrune(e) {
          return `/guilds/${e}/prune`
        },
        guildVoiceRegions(e) {
          return `/guilds/${e}/regions`
        },
        guildInvites(e) {
          return `/guilds/${e}/invites`
        },
        guildIntegrations(e) {
          return `/guilds/${e}/integrations`
        },
        guildIntegration(e, t) {
          return `/guilds/${e}/integrations/${t}`
        },
        guildWidgetSettings(e) {
          return `/guilds/${e}/widget`
        },
        guildWidgetJSON(e) {
          return `/guilds/${e}/widget.json`
        },
        guildVanityUrl(e) {
          return `/guilds/${e}/vanity-url`
        },
        guildWidgetImage(e) {
          return `/guilds/${e}/widget.png`
        },
        invite(e) {
          return `/invites/${e}`
        },
        template(e) {
          return `/guilds/templates/${e}`
        },
        guildTemplates(e) {
          return `/guilds/${e}/templates`
        },
        guildTemplate(e, t) {
          return `/guilds/${e}/templates/${t}`
        },
        threads(e, t) {
          const i = ['', 'channels', e]
          if (t) i.push('messages', t)
          i.push('threads')
          return i.join('/')
        },
        guildActiveThreads(e) {
          return `/guilds/${e}/threads/active`
        },
        channelThreads(e, t) {
          return `/channels/${e}/threads/archived/${t}`
        },
        channelJoinedArchivedThreads(e) {
          return `/channels/${e}/users/@me/threads/archived/private`
        },
        threadMembers(e, t) {
          const i = ['', 'channels', e, 'thread-members']
          if (t) i.push(t)
          return i.join('/')
        },
        user(e = '@me') {
          return `/users/${e}`
        },
        userGuilds() {
          return `/users/@me/guilds`
        },
        userGuildMember(e) {
          return `/users/@me/guilds/${e}/member`
        },
        userGuild(e) {
          return `/users/@me/guilds/${e}`
        },
        userChannels() {
          return `/users/@me/channels`
        },
        userConnections() {
          return `/users/@me/connections`
        },
        voiceRegions() {
          return `/voice/regions`
        },
        channelWebhooks(e) {
          return `/channels/${e}/webhooks`
        },
        guildWebhooks(e) {
          return `/guilds/${e}/webhooks`
        },
        webhook(e, t) {
          const i = ['', 'webhooks', e]
          if (t) i.push(t)
          return i.join('/')
        },
        webhookMessage(e, t, i = '@original') {
          return `/webhooks/${e}/${t}/messages/${i}`
        },
        webhookPlatform(e, t, i) {
          return `/webhooks/${e}/${t}/${i}`
        },
        gateway() {
          return `/gateway`
        },
        gatewayBot() {
          return `/gateway/bot`
        },
        oauth2CurrentApplication() {
          return `/oauth2/applications/@me`
        },
        oauth2CurrentAuthorization() {
          return `/oauth2/@me`
        },
        oauth2Authorization() {
          return `/oauth2/authorize`
        },
        oauth2TokenExchange() {
          return `/oauth2/token`
        },
        oauth2TokenRevocation() {
          return `/oauth2/token/revoke`
        },
        applicationCommands(e) {
          return `/applications/${e}/commands`
        },
        applicationCommand(e, t) {
          return `/applications/${e}/commands/${t}`
        },
        applicationGuildCommands(e, t) {
          return `/applications/${e}/guilds/${t}/commands`
        },
        applicationGuildCommand(e, t, i) {
          return `/applications/${e}/guilds/${t}/commands/${i}`
        },
        interactionCallback(e, t) {
          return `/interactions/${e}/${t}/callback`
        },
        guildMemberVerification(e) {
          return `/guilds/${e}/member-verification`
        },
        guildVoiceState(e, t = '@me') {
          return `/guilds/${e}/voice-states/${t}`
        },
        guildApplicationCommandsPermissions(e, t) {
          return `/applications/${e}/guilds/${t}/commands/permissions`
        },
        applicationCommandPermissions(e, t, i) {
          return `/applications/${e}/guilds/${t}/commands/${i}/permissions`
        },
        guildWelcomeScreen(e) {
          return `/guilds/${e}/welcome-screen`
        },
        stageInstances() {
          return `/stage-instances`
        },
        stageInstance(e) {
          return `/stage-instances/${e}`
        },
        sticker(e) {
          return `/stickers/${e}`
        },
        nitroStickerPacks() {
          return '/sticker-packs'
        },
        guildStickers(e) {
          return `/guilds/${e}/stickers`
        },
        guildSticker(e, t) {
          return `/guilds/${e}/stickers/${t}`
        },
        guildScheduledEvents(e) {
          return `/guilds/${e}/scheduled-events`
        },
        guildScheduledEvent(e, t) {
          return `/guilds/${e}/scheduled-events/${t}`
        },
        guildScheduledEventUsers(e, t) {
          return `/guilds/${e}/scheduled-events/${t}/users`
        },
      }
      t.StickerPackApplicationId = '710982414301790216'
      t.CDNRoutes = {
        emoji(e, t) {
          return `/emojis/${e}.${t}`
        },
        guildIcon(e, t, i) {
          return `icons/${e}/${t}.${i}`
        },
        guildSplash(e, t, i) {
          return `/splashes/${e}/${t}.${i}`
        },
        guildDiscoverySplash(e, t, i) {
          return `/discovery-splashes/${e}/${t}.${i}`
        },
        guildBanner(e, t, i) {
          return `/banners/${e}/${t}.${i}`
        },
        userBanner(e, t, i) {
          return `/banners/${e}/${t}.${i}`
        },
        defaultUserAvatar(e) {
          return `/embed/avatars/${e}.png`
        },
        userAvatar(e, t, i) {
          return `/avatars/${e}/${t}.${i}`
        },
        guildMemberAvatar(e, t, i, s) {
          return `/guilds/${e}/users/${t}/avatars/${i}.${s}`
        },
        applicationIcon(e, t, i) {
          return `/app-icons/${e}/${t}.${i}`
        },
        applicationCover(e, t, i) {
          return `/app-icons/${e}/${t}.${i}`
        },
        applicationAsset(e, t, i) {
          return `/app-icons/${e}/${t}.${i}`
        },
        achievementIcon(e, t, i, s) {
          return `/app-assets/${e}/achievements/${t}/icons/${i}.${s}`
        },
        stickerPackBanner(e, i) {
          return `/app-assets/${t.StickerPackApplicationId}/store/${e}.${i}`
        },
        teamIcon(e, t, i) {
          return `/team-icons/${e}/${t}.${i}`
        },
        sticker(e, t) {
          return `/stickers/${e}.${t}`
        },
        roleIcon(e, t, i) {
          return `/role-icons/${e}/${t}.${i}`
        },
        guildScheduledEventCover(e, t, i) {
          return `/guild-events/${e}/${t}.${i}`
        },
        guildMemberBanner(e, t, i, s) {
          return `/guilds/${e}/users/${t}/banners/${i}.${s}`
        },
      }
      var r
      ;(function (e) {
        e['JPEG'] = 'jpeg'
        e['PNG'] = 'png'
        e['WebP'] = 'webp'
        e['GIF'] = 'gif'
        e['Lottie'] = 'json'
      })((r = t.ImageFormat || (t.ImageFormat = {})))
      t.RouteBases = {
        api: `https://discord.com/api/v${t.APIVersion}`,
        cdn: 'https://cdn.discordapp.com',
        invite: 'https://discord.gg',
        template: 'https://discord.new',
        gift: 'https://discord.gift',
        scheduledEvent: 'https://discord.com/events',
      }
      Object.freeze(t.RouteBases)
      t.OAuth2Routes = {
        authorizationURL: `${
          t.RouteBases.api
        }${t.Routes.oauth2Authorization()}`,
        tokenURL: `${t.RouteBases.api}${t.Routes.oauth2TokenExchange()}`,
        tokenRevocationURL: `${
          t.RouteBases.api
        }${t.Routes.oauth2TokenRevocation()}`,
      }
      Object.freeze(t.OAuth2Routes)
    },
    2220: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    1018: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    4576: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    2957: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    5426: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    5927: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    9005: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    7570: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    3531: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
    },
    3776: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.RPCCloseEventCodes = t.RPCErrorCodes = void 0
      var i
      ;(function (e) {
        e[(e['UnknownError'] = 1e3)] = 'UnknownError'
        e[(e['InvalidPayload'] = 4e3)] = 'InvalidPayload'
        e[(e['InvalidCommand'] = 4002)] = 'InvalidCommand'
        e[(e['InvalidGuild'] = 4003)] = 'InvalidGuild'
        e[(e['InvalidEvent'] = 4004)] = 'InvalidEvent'
        e[(e['InvalidChannel'] = 4005)] = 'InvalidChannel'
        e[(e['InvalidPermissions'] = 4006)] = 'InvalidPermissions'
        e[(e['InvalidClientId'] = 4007)] = 'InvalidClientId'
        e[(e['InvalidOrigin'] = 4008)] = 'InvalidOrigin'
        e[(e['InvalidToken'] = 4009)] = 'InvalidToken'
        e[(e['InvalidUser'] = 4010)] = 'InvalidUser'
        e[(e['OAuth2Error'] = 5e3)] = 'OAuth2Error'
        e[(e['SelectChannelTimedOut'] = 5001)] = 'SelectChannelTimedOut'
        e[(e['GetGuildTimedOut'] = 5002)] = 'GetGuildTimedOut'
        e[(e['SelectVoiceForceRequired'] = 5003)] = 'SelectVoiceForceRequired'
        e[(e['CaptureShortcutAlreadyListening'] = 5004)] =
          'CaptureShortcutAlreadyListening'
      })((i = t.RPCErrorCodes || (t.RPCErrorCodes = {})))
      var s
      ;(function (e) {
        e[(e['InvalidClientId'] = 4e3)] = 'InvalidClientId'
        e[(e['InvalidOrigin'] = 4001)] = 'InvalidOrigin'
        e[(e['RateLimited'] = 4002)] = 'RateLimited'
        e[(e['TokenRevoked'] = 4003)] = 'TokenRevoked'
        e[(e['InvalidVersion'] = 4004)] = 'InvalidVersion'
        e[(e['InvalidEncoding'] = 4005)] = 'InvalidEncoding'
      })((s = t.RPCCloseEventCodes || (t.RPCCloseEventCodes = {})))
    },
    5557: function (e, t, i) {
      'use strict'
      var s =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, i, s) {
              if (s === undefined) s = i
              var n = Object.getOwnPropertyDescriptor(t, i)
              if (
                !n ||
                ('get' in n ? !t.__esModule : n.writable || n.configurable)
              ) {
                n = {
                  enumerable: true,
                  get: function () {
                    return t[i]
                  },
                }
              }
              Object.defineProperty(e, s, n)
            }
          : function (e, t, i, s) {
              if (s === undefined) s = i
              e[s] = t[i]
            })
      var n =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var i in e)
            if (i !== 'default' && !Object.prototype.hasOwnProperty.call(t, i))
              s(t, e, i)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      n(i(3776), t)
    },
    4220: (e, t, i) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.isContextMenuApplicationCommandInteraction =
        t.isChatInputApplicationCommandInteraction =
        t.isMessageComponentSelectMenuInteraction =
        t.isMessageComponentButtonInteraction =
        t.isMessageComponentInteraction =
        t.isInteractionButton =
        t.isLinkButton =
        t.isMessageComponentGuildInteraction =
        t.isMessageComponentDMInteraction =
        t.isApplicationCommandGuildInteraction =
        t.isApplicationCommandDMInteraction =
        t.isGuildInteraction =
        t.isDMInteraction =
          void 0
      const s = i(7999)
      function isDMInteraction(e) {
        return Reflect.has(e, 'user')
      }
      t.isDMInteraction = isDMInteraction
      function isGuildInteraction(e) {
        return Reflect.has(e, 'guild_id')
      }
      t.isGuildInteraction = isGuildInteraction
      function isApplicationCommandDMInteraction(e) {
        return isDMInteraction(e)
      }
      t.isApplicationCommandDMInteraction = isApplicationCommandDMInteraction
      function isApplicationCommandGuildInteraction(e) {
        return isGuildInteraction(e)
      }
      t.isApplicationCommandGuildInteraction =
        isApplicationCommandGuildInteraction
      function isMessageComponentDMInteraction(e) {
        return isDMInteraction(e)
      }
      t.isMessageComponentDMInteraction = isMessageComponentDMInteraction
      function isMessageComponentGuildInteraction(e) {
        return isGuildInteraction(e)
      }
      t.isMessageComponentGuildInteraction = isMessageComponentGuildInteraction
      function isLinkButton(e) {
        return e.style === s.ButtonStyle.Link
      }
      t.isLinkButton = isLinkButton
      function isInteractionButton(e) {
        return e.style !== s.ButtonStyle.Link
      }
      t.isInteractionButton = isInteractionButton
      function isMessageComponentInteraction(e) {
        return e.type === s.InteractionType.MessageComponent
      }
      t.isMessageComponentInteraction = isMessageComponentInteraction
      function isMessageComponentButtonInteraction(e) {
        return e.data.component_type === s.ComponentType.Button
      }
      t.isMessageComponentButtonInteraction =
        isMessageComponentButtonInteraction
      function isMessageComponentSelectMenuInteraction(e) {
        return [
          s.ComponentType.StringSelect,
          s.ComponentType.UserSelect,
          s.ComponentType.RoleSelect,
          s.ComponentType.MentionableSelect,
          s.ComponentType.ChannelSelect,
        ].includes(e.data.component_type)
      }
      t.isMessageComponentSelectMenuInteraction =
        isMessageComponentSelectMenuInteraction
      function isChatInputApplicationCommandInteraction(e) {
        return e.data.type === s.ApplicationCommandType.ChatInput
      }
      t.isChatInputApplicationCommandInteraction =
        isChatInputApplicationCommandInteraction
      function isContextMenuApplicationCommandInteraction(e) {
        return (
          e.data.type === s.ApplicationCommandType.Message ||
          e.data.type === s.ApplicationCommandType.User
        )
      }
      t.isContextMenuApplicationCommandInteraction =
        isContextMenuApplicationCommandInteraction
    },
    2: function (e, t, i) {
      'use strict'
      var s =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, i, s) {
              if (s === undefined) s = i
              var n = Object.getOwnPropertyDescriptor(t, i)
              if (
                !n ||
                ('get' in n ? !t.__esModule : n.writable || n.configurable)
              ) {
                n = {
                  enumerable: true,
                  get: function () {
                    return t[i]
                  },
                }
              }
              Object.defineProperty(e, s, n)
            }
          : function (e, t, i, s) {
              if (s === undefined) s = i
              e[s] = t[i]
            })
      var n =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var i in e)
            if (i !== 'default' && !Object.prototype.hasOwnProperty.call(t, i))
              s(t, e, i)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      t.Utils = void 0
      n(i(8941), t)
      n(i(2811), t)
      n(i(7999), t)
      n(i(8843), t)
      n(i(5557), t)
      t.Utils = i(4220)
    },
    9245: (e, t, i) => {
      'use strict'
      let s
      const { Buffer: n } = i(2254)
      try {
        s = i(8060)
        if (!s.pack) s = null
      } catch {}
      t.WebSocket = i(172)
      const r = new TextDecoder()
      t.encoding = s ? 'etf' : 'json'
      t.pack = s ? s.pack : JSON.stringify
      t.unpack = (e, i) => {
        if (t.encoding === 'json' || i === 'json') {
          if (typeof e !== 'string') {
            e = r.decode(e)
          }
          return JSON.parse(e)
        }
        if (!n.isBuffer(e)) e = n.from(new Uint8Array(e))
        return s.unpack(e)
      }
      t.create = (e, i = {}, ...s) => {
        const [n, r] = e.split('?')
        i.encoding = t.encoding
        i = new URLSearchParams(i)
        if (r) new URLSearchParams(r).forEach((e, t) => i.set(t, e))
        const a = new t.WebSocket(`${n}?${i}`, ...s)
        return a
      }
      for (const e of ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'])
        t[e] = t.WebSocket[e]
    },
    9299: (e, t, i) => {
      'use strict'
      const s = i(5673)
      const { REST: n } = i(1372)
      const { DiscordjsTypeError: r, ErrorCodes: a } = i(8951)
      const o = i(2199)
      const { mergeDefault: l, flatten: c } = i(7966)
      class BaseClient extends s {
        constructor(e = {}) {
          super({ captureRejections: true })
          if (typeof e !== 'object' || e === null) {
            throw new r(a.InvalidType, 'options', 'object', true)
          }
          this.options = l(o.createDefault(), e)
          this.rest = new n(this.options.rest)
        }
        destroy() {
          this.rest.requestManager.clearHashSweeper()
          this.rest.requestManager.clearHandlerSweeper()
        }
        incrementMaxListeners() {
          const e = this.getMaxListeners()
          if (e !== 0) {
            this.setMaxListeners(e + 1)
          }
        }
        decrementMaxListeners() {
          const e = this.getMaxListeners()
          if (e !== 0) {
            this.setMaxListeners(e - 1)
          }
        }
        toJSON(...e) {
          return c(this, ...e)
        }
      }
      e.exports = BaseClient
    },
    8795: (module, __unused_webpack_exports, __nccwpck_require__) => {
      'use strict'
      const process = __nccwpck_require__(7742)
      const { Collection: Collection } = __nccwpck_require__(2676)
      const { makeURLSearchParams: makeURLSearchParams } =
        __nccwpck_require__(1372)
      const { OAuth2Scopes: OAuth2Scopes, Routes: Routes } =
        __nccwpck_require__(2)
      const BaseClient = __nccwpck_require__(9299)
      const ActionsManager = __nccwpck_require__(1698)
      const ClientVoiceManager = __nccwpck_require__(9133)
      const WebSocketManager = __nccwpck_require__(2626)
      const {
        DiscordjsError: DiscordjsError,
        DiscordjsTypeError: DiscordjsTypeError,
        DiscordjsRangeError: DiscordjsRangeError,
        ErrorCodes: ErrorCodes,
      } = __nccwpck_require__(8951)
      const BaseGuildEmojiManager = __nccwpck_require__(4123)
      const ChannelManager = __nccwpck_require__(6088)
      const GuildManager = __nccwpck_require__(2706)
      const UserManager = __nccwpck_require__(6657)
      const ShardClientUtil = __nccwpck_require__(7732)
      const ClientPresence = __nccwpck_require__(7057)
      const GuildPreview = __nccwpck_require__(210)
      const GuildTemplate = __nccwpck_require__(6378)
      const Invite = __nccwpck_require__(3493)
      const { Sticker: Sticker } = __nccwpck_require__(2736)
      const StickerPack = __nccwpck_require__(4864)
      const VoiceRegion = __nccwpck_require__(3179)
      const Webhook = __nccwpck_require__(3630)
      const Widget = __nccwpck_require__(6477)
      const DataResolver = __nccwpck_require__(3989)
      const Events = __nccwpck_require__(457)
      const IntentsBitField = __nccwpck_require__(4776)
      const Options = __nccwpck_require__(2199)
      const PermissionsBitField = __nccwpck_require__(9238)
      const Status = __nccwpck_require__(6619)
      const Sweepers = __nccwpck_require__(9850)
      class Client extends BaseClient {
        constructor(e) {
          super(e)
          const t = __nccwpck_require__(3621).workerData ?? process.env
          const i = Options.createDefault()
          if (this.options.shards === i.shards) {
            if ('SHARDS' in t) {
              this.options.shards = JSON.parse(t.SHARDS)
            }
          }
          if (this.options.shardCount === i.shardCount) {
            if ('SHARD_COUNT' in t) {
              this.options.shardCount = Number(t.SHARD_COUNT)
            } else if (Array.isArray(this.options.shards)) {
              this.options.shardCount = this.options.shards.length
            }
          }
          const s = typeof this.options.shards
          if (
            s === 'undefined' &&
            typeof this.options.shardCount === 'number'
          ) {
            this.options.shards = Array.from(
              { length: this.options.shardCount },
              (e, t) => t
            )
          }
          if (s === 'number') this.options.shards = [this.options.shards]
          if (Array.isArray(this.options.shards)) {
            this.options.shards = [
              ...new Set(
                this.options.shards.filter(
                  (e) => !isNaN(e) && e >= 0 && e < Infinity && e === (e | 0)
                )
              ),
            ]
          }
          this._validateOptions()
          this.ws = new WebSocketManager(this)
          this.actions = new ActionsManager(this)
          this.voice = new ClientVoiceManager(this)
          this.shard = process.env.SHARDING_MANAGER
            ? ShardClientUtil.singleton(this, process.env.SHARDING_MANAGER_MODE)
            : null
          this.users = new UserManager(this)
          this.guilds = new GuildManager(this)
          this.channels = new ChannelManager(this)
          this.sweepers = new Sweepers(this, this.options.sweepers)
          this.presence = new ClientPresence(this, this.options.presence)
          Object.defineProperty(this, 'token', { writable: true })
          if (!this.token && 'DISCORD_TOKEN' in process.env) {
            this.token = process.env.DISCORD_TOKEN
          } else {
            this.token = null
          }
          this.user = null
          this.application = null
          this.readyTimestamp = null
        }
        get emojis() {
          const e = new BaseGuildEmojiManager(this)
          for (const t of this.guilds.cache.values()) {
            if (t.available)
              for (const i of t.emojis.cache.values()) e.cache.set(i.id, i)
          }
          return e
        }
        get readyAt() {
          return this.readyTimestamp && new Date(this.readyTimestamp)
        }
        get uptime() {
          return this.readyTimestamp && Date.now() - this.readyTimestamp
        }
        async login(e = this.token) {
          if (!e || typeof e !== 'string')
            throw new DiscordjsError(ErrorCodes.TokenInvalid)
          this.token = e = e.replace(/^(Bot|Bearer)\s*/i, '')
          this.rest.setToken(e)
          this.emit(Events.Debug, `Provided token: ${this._censoredToken}`)
          if (this.options.presence) {
            this.options.ws.presence = this.presence._parse(
              this.options.presence
            )
          }
          this.emit(Events.Debug, 'Preparing to connect to the gateway...')
          try {
            await this.ws.connect()
            return this.token
          } catch (e) {
            this.destroy()
            throw e
          }
        }
        isReady() {
          return this.ws.status === Status.Ready
        }
        destroy() {
          super.destroy()
          this.sweepers.destroy()
          this.ws.destroy()
          this.token = null
          this.rest.setToken(null)
        }
        async fetchInvite(e, t) {
          const i = DataResolver.resolveInviteCode(e)
          const s = makeURLSearchParams({
            with_counts: true,
            with_expiration: true,
            guild_scheduled_event_id: t?.guildScheduledEventId,
          })
          const n = await this.rest.get(Routes.invite(i), { query: s })
          return new Invite(this, n)
        }
        async fetchGuildTemplate(e) {
          const t = DataResolver.resolveGuildTemplateCode(e)
          const i = await this.rest.get(Routes.template(t))
          return new GuildTemplate(this, i)
        }
        async fetchWebhook(e, t) {
          const i = await this.rest.get(Routes.webhook(e, t), {
            auth: typeof t === 'undefined',
          })
          return new Webhook(this, { token: t, ...i })
        }
        async fetchVoiceRegions() {
          const e = await this.rest.get(Routes.voiceRegions())
          const t = new Collection()
          for (const i of e) t.set(i.id, new VoiceRegion(i))
          return t
        }
        async fetchSticker(e) {
          const t = await this.rest.get(Routes.sticker(e))
          return new Sticker(this, t)
        }
        async fetchPremiumStickerPacks() {
          const e = await this.rest.get(Routes.nitroStickerPacks())
          return new Collection(
            e.sticker_packs.map((e) => [e.id, new StickerPack(this, e)])
          )
        }
        async fetchGuildPreview(e) {
          const t = this.guilds.resolveId(e)
          if (!t)
            throw new DiscordjsTypeError(
              ErrorCodes.InvalidType,
              'guild',
              'GuildResolvable'
            )
          const i = await this.rest.get(Routes.guildPreview(t))
          return new GuildPreview(this, i)
        }
        async fetchGuildWidget(e) {
          const t = this.guilds.resolveId(e)
          if (!t)
            throw new DiscordjsTypeError(
              ErrorCodes.InvalidType,
              'guild',
              'GuildResolvable'
            )
          const i = await this.rest.get(Routes.guildWidgetJSON(t))
          return new Widget(this, i)
        }
        generateInvite(e = {}) {
          if (typeof e !== 'object')
            throw new DiscordjsTypeError(
              ErrorCodes.InvalidType,
              'options',
              'object',
              true
            )
          if (!this.application)
            throw new DiscordjsError(
              ErrorCodes.ClientNotReady,
              'generate an invite link'
            )
          const { scopes: t } = e
          if (typeof t === 'undefined') {
            throw new DiscordjsTypeError(ErrorCodes.InvalidMissingScopes)
          }
          if (!Array.isArray(t)) {
            throw new DiscordjsTypeError(
              ErrorCodes.InvalidType,
              'scopes',
              'Array of Invite Scopes',
              true
            )
          }
          if (
            !t.some((e) =>
              [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands].includes(e)
            )
          ) {
            throw new DiscordjsTypeError(ErrorCodes.InvalidMissingScopes)
          }
          const i = Object.values(OAuth2Scopes)
          const s = t.find((e) => !i.includes(e))
          if (s) {
            throw new DiscordjsTypeError(
              ErrorCodes.InvalidElement,
              'Array',
              'scopes',
              s
            )
          }
          const n = makeURLSearchParams({
            client_id: this.application.id,
            scope: t.join(' '),
            disable_guild_select: e.disableGuildSelect,
          })
          if (e.permissions) {
            const t = PermissionsBitField.resolve(e.permissions)
            if (t) n.set('permissions', t.toString())
          }
          if (e.guild) {
            const t = this.guilds.resolveId(e.guild)
            if (!t)
              throw new DiscordjsTypeError(
                ErrorCodes.InvalidType,
                'options.guild',
                'GuildResolvable'
              )
            n.set('guild_id', t)
          }
          return `${this.options.rest.api}${Routes.oauth2Authorization()}?${n}`
        }
        toJSON() {
          return super.toJSON({ actions: false, presence: false })
        }
        get _censoredToken() {
          if (!this.token) return null
          return this.token
            .split('.')
            .map((e, t) => (t > 1 ? e.replace(/./g, '*') : e))
            .join('.')
        }
        _eval(script) {
          return eval(script)
        }
        _validateOptions(e = this.options) {
          if (typeof e.intents === 'undefined') {
            throw new DiscordjsTypeError(ErrorCodes.ClientMissingIntents)
          } else {
            e.intents = new IntentsBitField(e.intents).freeze()
          }
          if (
            typeof e.shardCount !== 'number' ||
            isNaN(e.shardCount) ||
            e.shardCount < 1
          ) {
            throw new DiscordjsTypeError(
              ErrorCodes.ClientInvalidOption,
              'shardCount',
              'a number greater than or equal to 1'
            )
          }
          if (e.shards && !(e.shards === 'auto' || Array.isArray(e.shards))) {
            throw new DiscordjsTypeError(
              ErrorCodes.ClientInvalidOption,
              'shards',
              "'auto', a number or array of numbers"
            )
          }
          if (e.shards && !e.shards.length)
            throw new DiscordjsRangeError(
              ErrorCodes.ClientInvalidProvidedShards
            )
          if (typeof e.makeCache !== 'function') {
            throw new DiscordjsTypeError(
              ErrorCodes.ClientInvalidOption,
              'makeCache',
              'a function'
            )
          }
          if (typeof e.sweepers !== 'object' || e.sweepers === null) {
            throw new DiscordjsTypeError(
              ErrorCodes.ClientInvalidOption,
              'sweepers',
              'an object'
            )
          }
          if (!Array.isArray(e.partials)) {
            throw new DiscordjsTypeError(
              ErrorCodes.ClientInvalidOption,
              'partials',
              'an Array'
            )
          }
          if (
            typeof e.waitGuildTimeout !== 'number' ||
            isNaN(e.waitGuildTimeout)
          ) {
            throw new DiscordjsTypeError(
              ErrorCodes.ClientInvalidOption,
              'waitGuildTimeout',
              'a number'
            )
          }
          if (typeof e.failIfNotExists !== 'boolean') {
            throw new DiscordjsTypeError(
              ErrorCodes.ClientInvalidOption,
              'failIfNotExists',
              'a boolean'
            )
          }
        }
      }
      module.exports = Client
    },
    3661: (e, t, i) => {
      'use strict'
      const s = i(9299)
      const { DiscordjsError: n, ErrorCodes: r } = i(8951)
      const a = i(3630)
      const { parseWebhookURL: o } = i(7966)
      class WebhookClient extends s {
        constructor(e, t) {
          super(t)
          Object.defineProperty(this, 'client', { value: this })
          let { id: i, token: s } = e
          if ('url' in e) {
            const t = o(e.url)
            if (!t) {
              throw new n(r.WebhookURLInvalid)
            }
            ;({ id: i, token: s } = t)
          }
          this.id = i
          Object.defineProperty(this, 'token', {
            value: s,
            writable: true,
            configurable: true,
          })
        }
        send() {}
        fetchMessage() {}
        editMessage() {}
        sendSlackMessage() {}
        edit() {}
        delete() {}
        deleteMessage() {}
        get createdTimestamp() {}
        get createdAt() {}
        get url() {}
      }
      a.applyToClass(WebhookClient)
      e.exports = WebhookClient
    },
    8585: (e, t, i) => {
      'use strict'
      const s = i(527)
      class GenericAction {
        constructor(e) {
          this.client = e
        }
        handle(e) {
          return e
        }
        getPayload(e, t, i, s, n) {
          const r = t.cache.get(i)
          if (!r && this.client.options.partials.includes(s)) {
            return t._add(e, n)
          }
          return r
        }
        getChannel(e) {
          const t = e.channel_id ?? e.id
          return (
            e.channel ??
            this.getPayload(
              {
                id: t,
                guild_id: e.guild_id,
                recipients: [e.author ?? e.user ?? { id: e.user_id }],
              },
              this.client.channels,
              t,
              s.Channel
            )
          )
        }
        getMessage(e, t, i) {
          const n = e.message_id ?? e.id
          return (
            e.message ??
            this.getPayload(
              { id: n, channel_id: t.id, guild_id: e.guild_id ?? t.guild?.id },
              t.messages,
              n,
              s.Message,
              i
            )
          )
        }
        getReaction(e, t, i) {
          const n = e.emoji.id ?? decodeURIComponent(e.emoji.name)
          return this.getPayload(
            {
              emoji: e.emoji,
              count: t.partial ? null : 0,
              me: i?.id === this.client.user.id,
            },
            t.reactions,
            n,
            s.Reaction
          )
        }
        getMember(e, t) {
          return this.getPayload(e, t.members, e.user.id, s.GuildMember)
        }
        getUser(e) {
          const t = e.user_id
          return (
            e.user ?? this.getPayload({ id: t }, this.client.users, t, s.User)
          )
        }
        getUserFromMember(e) {
          if (e.guild_id && e.member?.user) {
            const t = this.client.guilds.cache.get(e.guild_id)
            if (t) {
              return t.members._add(e.member).user
            } else {
              return this.client.users._add(e.member.user)
            }
          }
          return this.getUser(e)
        }
        getScheduledEvent(e, t) {
          const i = e.guild_scheduled_event_id ?? e.id
          return this.getPayload(
            { id: i, guild_id: e.guild_id ?? t.id },
            t.scheduledEvents,
            i,
            s.GuildScheduledEvent
          )
        }
        getThreadMember(e, t) {
          return this.getPayload({ user_id: e }, t, e, s.ThreadMember, false)
        }
      }
      e.exports = GenericAction
    },
    1698: (e, t, i) => {
      'use strict'
      class ActionsManager {
        constructor(e) {
          this.client = e
          this.register(i(5525))
          this.register(i(3665))
          this.register(i(5034))
          this.register(i(6704))
          this.register(i(7806))
          this.register(i(4813))
          this.register(i(4499))
          this.register(i(603))
          this.register(i(297))
          this.register(i(1053))
          this.register(i(5982))
          this.register(i(44))
          this.register(i(383))
          this.register(i(3762))
          this.register(i(4559))
          this.register(i(8558))
          this.register(i(6942))
          this.register(i(7930))
          this.register(i(9047))
          this.register(i(3085))
          this.register(i(3505))
          this.register(i(3003))
          this.register(i(4356))
          this.register(i(6529))
          this.register(i(2136))
          this.register(i(6384))
          this.register(i(1038))
          this.register(i(473))
          this.register(i(3183))
          this.register(i(401))
          this.register(i(164))
          this.register(i(7013))
          this.register(i(5951))
          this.register(i(3356))
          this.register(i(3513))
          this.register(i(1533))
          this.register(i(6674))
          this.register(i(3842))
          this.register(i(3498))
          this.register(i(8170))
          this.register(i(9666))
          this.register(i(3223))
          this.register(i(2571))
          this.register(i(3e3))
          this.register(i(6772))
          this.register(i(6847))
          this.register(i(8662))
          this.register(i(9048))
          this.register(i(7470))
          this.register(i(3551))
          this.register(i(840))
          this.register(i(3404))
          this.register(i(8255))
          this.register(i(8887))
          this.register(i(570))
          this.register(i(8180))
          this.register(i(4453))
        }
        register(e) {
          this[e.name.replace(/Action$/, '')] = new e(this.client)
        }
      }
      e.exports = ActionsManager
    },
    5525: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class ApplicationCommandPermissionsUpdateAction extends s {
        handle(e) {
          const t = this.client
          t.emit(n.ApplicationCommandPermissionsUpdate, {
            permissions: e.permissions,
            id: e.id,
            guildId: e.guild_id,
            applicationId: e.application_id,
          })
        }
      }
      e.exports = ApplicationCommandPermissionsUpdateAction
    },
    3665: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(7333)
      const r = i(457)
      class AutoModerationActionExecutionAction extends s {
        handle(e) {
          const { client: t } = this
          const i = t.guilds.cache.get(e.guild_id)
          if (i) {
            t.emit(r.AutoModerationActionExecution, new n(e, i))
          }
          return {}
        }
      }
      e.exports = AutoModerationActionExecutionAction
    },
    5034: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class AutoModerationRuleCreateAction extends s {
        handle(e) {
          const { client: t } = this
          const i = t.guilds.cache.get(e.guild_id)
          if (i) {
            const s = i.autoModerationRules._add(e)
            t.emit(n.AutoModerationRuleCreate, s)
          }
          return {}
        }
      }
      e.exports = AutoModerationRuleCreateAction
    },
    6704: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class AutoModerationRuleDeleteAction extends s {
        handle(e) {
          const { client: t } = this
          const i = t.guilds.cache.get(e.guild_id)
          if (i) {
            const s = i.autoModerationRules.cache.get(e.id)
            if (s) {
              i.autoModerationRules.cache.delete(s.id)
              t.emit(n.AutoModerationRuleDelete, s)
            }
          }
          return {}
        }
      }
      e.exports = AutoModerationRuleDeleteAction
    },
    7806: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class AutoModerationRuleUpdateAction extends s {
        handle(e) {
          const { client: t } = this
          const i = t.guilds.cache.get(e.guild_id)
          if (i) {
            const s = i.autoModerationRules.cache.get(e.id)?._clone() ?? null
            const r = i.autoModerationRules._add(e)
            t.emit(n.AutoModerationRuleUpdate, s, r)
          }
          return {}
        }
      }
      e.exports = AutoModerationRuleUpdateAction
    },
    4813: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class ChannelCreateAction extends s {
        handle(e) {
          const t = this.client
          const i = t.channels.cache.has(e.id)
          const s = t.channels._add(e)
          if (!i && s) {
            t.emit(n.ChannelCreate, s)
          }
          return { channel: s }
        }
      }
      e.exports = ChannelCreateAction
    },
    4499: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class ChannelDeleteAction extends s {
        handle(e) {
          const t = this.client
          const i = t.channels.cache.get(e.id)
          if (i) {
            t.channels._remove(i.id)
            t.emit(n.ChannelDelete, i)
          }
        }
      }
      e.exports = ChannelDeleteAction
    },
    603: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const { createChannel: n } = i(275)
      class ChannelUpdateAction extends s {
        handle(e) {
          const t = this.client
          let i = t.channels.cache.get(e.id)
          if (i) {
            const t = i._update(e)
            if (i.type !== e.type) {
              const t = n(this.client, e, i.guild)
              for (const [e, s] of i.messages.cache) t.messages.cache.set(e, s)
              i = t
              this.client.channels.cache.set(i.id, i)
            }
            return { old: t, updated: i }
          } else {
            t.channels._add(e)
          }
          return {}
        }
      }
      e.exports = ChannelUpdateAction
    },
    297: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildBanAdd extends s {
        handle(e) {
          const t = this.client
          const i = t.guilds.cache.get(e.guild_id)
          if (i) t.emit(n.GuildBanAdd, i.bans._add(e))
        }
      }
      e.exports = GuildBanAdd
    },
    1053: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(3694)
      const r = i(457)
      class GuildBanRemove extends s {
        handle(e) {
          const t = this.client
          const i = t.guilds.cache.get(e.guild_id)
          if (i) {
            const s = i.bans.cache.get(e.user.id) ?? new n(t, e, i)
            i.bans.cache.delete(s.user.id)
            t.emit(r.GuildBanRemove, s)
          }
        }
      }
      e.exports = GuildBanRemove
    },
    5982: (e, t, i) => {
      'use strict'
      const s = i(8585)
      class GuildChannelsPositionUpdate extends s {
        handle(e) {
          const t = this.client
          const i = t.guilds.cache.get(e.guild_id)
          if (i) {
            for (const t of e.channels) {
              const e = i.channels.cache.get(t.id)
              if (e) e.rawPosition = t.position
            }
          }
          return { guild: i }
        }
      }
      e.exports = GuildChannelsPositionUpdate
    },
    44: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildDeleteAction extends s {
        handle(e) {
          const t = this.client
          let i = t.guilds.cache.get(e.id)
          if (i) {
            if (e.unavailable) {
              i.available = false
              t.emit(n.GuildUnavailable, i)
              return
            }
            for (const e of i.channels.cache.values())
              this.client.channels._remove(e.id)
            t.voice.adapters.get(e.id)?.destroy()
            t.guilds.cache.delete(i.id)
            t.emit(n.GuildDelete, i)
          }
        }
      }
      e.exports = GuildDeleteAction
    },
    383: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildEmojiCreateAction extends s {
        handle(e, t) {
          const i = e.emojis.cache.has(t.id)
          const s = e.emojis._add(t)
          if (!i) this.client.emit(n.GuildEmojiCreate, s)
          return { emoji: s }
        }
      }
      e.exports = GuildEmojiCreateAction
    },
    3762: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildEmojiDeleteAction extends s {
        handle(e) {
          e.guild.emojis.cache.delete(e.id)
          this.client.emit(n.GuildEmojiDelete, e)
          return { emoji: e }
        }
      }
      e.exports = GuildEmojiDeleteAction
    },
    4559: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildEmojiUpdateAction extends s {
        handle(e, t) {
          const i = e._update(t)
          this.client.emit(n.GuildEmojiUpdate, i, e)
          return { emoji: e }
        }
      }
      e.exports = GuildEmojiUpdateAction
    },
    8558: (e, t, i) => {
      'use strict'
      const s = i(8585)
      class GuildEmojisUpdateAction extends s {
        handle(e) {
          const t = this.client.guilds.cache.get(e.guild_id)
          if (!t?.emojis) return
          const i = new Map(t.emojis.cache)
          for (const s of e.emojis) {
            const e = t.emojis.cache.get(s.id)
            if (e) {
              i.delete(s.id)
              if (!e.equals(s)) {
                this.client.actions.GuildEmojiUpdate.handle(e, s)
              }
            } else {
              this.client.actions.GuildEmojiCreate.handle(t, s)
            }
          }
          for (const e of i.values()) {
            this.client.actions.GuildEmojiDelete.handle(e)
          }
        }
      }
      e.exports = GuildEmojisUpdateAction
    },
    6942: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildIntegrationsUpdate extends s {
        handle(e) {
          const t = this.client
          const i = t.guilds.cache.get(e.guild_id)
          if (i) t.emit(n.GuildIntegrationsUpdate, i)
        }
      }
      e.exports = GuildIntegrationsUpdate
    },
    7930: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      const r = i(6619)
      class GuildMemberRemoveAction extends s {
        handle(e, t) {
          const i = this.client
          const s = i.guilds.cache.get(e.guild_id)
          let a = null
          if (s) {
            a = this.getMember({ user: e.user }, s)
            s.memberCount--
            if (a) {
              s.members.cache.delete(a.id)
              if (t.status === r.Ready) i.emit(n.GuildMemberRemove, a)
            }
            s.presences.cache.delete(e.user.id)
            s.voiceStates.cache.delete(e.user.id)
          }
          return { guild: s, member: a }
        }
      }
      e.exports = GuildMemberRemoveAction
    },
    9047: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      const r = i(6619)
      class GuildMemberUpdateAction extends s {
        handle(e, t) {
          const { client: i } = this
          if (e.user.username) {
            const t = i.users.cache.get(e.user.id)
            if (!t) {
              i.users._add(e.user)
            } else if (!t._equals(e.user)) {
              i.actions.UserUpdate.handle(e.user)
            }
          }
          const s = i.guilds.cache.get(e.guild_id)
          if (s) {
            const a = this.getMember({ user: e.user }, s)
            if (a) {
              const s = a._update(e)
              if (t.status === r.Ready && !a.equals(s))
                i.emit(n.GuildMemberUpdate, s, a)
            } else {
              const t = s.members._add(e)
              this.client.emit(n.GuildMemberAvailable, t)
            }
          }
        }
      }
      e.exports = GuildMemberUpdateAction
    },
    3085: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildRoleCreate extends s {
        handle(e) {
          const t = this.client
          const i = t.guilds.cache.get(e.guild_id)
          let s
          if (i) {
            const r = i.roles.cache.has(e.role.id)
            s = i.roles._add(e.role)
            if (!r) t.emit(n.GuildRoleCreate, s)
          }
          return { role: s }
        }
      }
      e.exports = GuildRoleCreate
    },
    3505: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildRoleDeleteAction extends s {
        handle(e) {
          const t = this.client
          const i = t.guilds.cache.get(e.guild_id)
          let s
          if (i) {
            s = i.roles.cache.get(e.role_id)
            if (s) {
              i.roles.cache.delete(e.role_id)
              t.emit(n.GuildRoleDelete, s)
            }
          }
          return { role: s }
        }
      }
      e.exports = GuildRoleDeleteAction
    },
    3003: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildRoleUpdateAction extends s {
        handle(e) {
          const t = this.client
          const i = t.guilds.cache.get(e.guild_id)
          if (i) {
            let s = null
            const r = i.roles.cache.get(e.role.id)
            if (r) {
              s = r._update(e.role)
              t.emit(n.GuildRoleUpdate, s, r)
            }
            return { old: s, updated: r }
          }
          return { old: null, updated: null }
        }
      }
      e.exports = GuildRoleUpdateAction
    },
    4356: (e, t, i) => {
      'use strict'
      const s = i(8585)
      class GuildRolesPositionUpdate extends s {
        handle(e) {
          const t = this.client
          const i = t.guilds.cache.get(e.guild_id)
          if (i) {
            for (const t of e.roles) {
              const e = i.roles.cache.get(t.id)
              if (e) e.rawPosition = t.position
            }
          }
          return { guild: i }
        }
      }
      e.exports = GuildRolesPositionUpdate
    },
    6529: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildScheduledEventCreateAction extends s {
        handle(e) {
          const t = this.client
          const i = t.guilds.cache.get(e.guild_id)
          if (i) {
            const s = i.scheduledEvents._add(e)
            t.emit(n.GuildScheduledEventCreate, s)
            return { guildScheduledEvent: s }
          }
          return {}
        }
      }
      e.exports = GuildScheduledEventCreateAction
    },
    2136: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildScheduledEventDeleteAction extends s {
        handle(e) {
          const t = this.client
          const i = t.guilds.cache.get(e.guild_id)
          if (i) {
            const s = this.getScheduledEvent(e, i)
            if (s) {
              i.scheduledEvents.cache.delete(s.id)
              t.emit(n.GuildScheduledEventDelete, s)
              return { guildScheduledEvent: s }
            }
          }
          return {}
        }
      }
      e.exports = GuildScheduledEventDeleteAction
    },
    6384: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildScheduledEventUpdateAction extends s {
        handle(e) {
          const t = this.client
          const i = t.guilds.cache.get(e.guild_id)
          if (i) {
            const s = i.scheduledEvents.cache.get(e.id)?._clone() ?? null
            const r = i.scheduledEvents._add(e)
            t.emit(n.GuildScheduledEventUpdate, s, r)
            return { oldGuildScheduledEvent: s, newGuildScheduledEvent: r }
          }
          return {}
        }
      }
      e.exports = GuildScheduledEventUpdateAction
    },
    1038: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildScheduledEventUserAddAction extends s {
        handle(e) {
          const t = this.client
          const i = t.guilds.cache.get(e.guild_id)
          if (i) {
            const s = this.getScheduledEvent(e, i)
            const r = this.getUser(e)
            if (s && r) {
              t.emit(n.GuildScheduledEventUserAdd, s, r)
              return { guildScheduledEvent: s, user: r }
            }
          }
          return {}
        }
      }
      e.exports = GuildScheduledEventUserAddAction
    },
    473: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildScheduledEventUserRemoveAction extends s {
        handle(e) {
          const t = this.client
          const i = t.guilds.cache.get(e.guild_id)
          if (i) {
            const s = this.getScheduledEvent(e, i)
            const r = this.getUser(e)
            if (s && r) {
              t.emit(n.GuildScheduledEventUserRemove, s, r)
              return { guildScheduledEvent: s, user: r }
            }
          }
          return {}
        }
      }
      e.exports = GuildScheduledEventUserRemoveAction
    },
    3183: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildStickerCreateAction extends s {
        handle(e, t) {
          const i = e.stickers.cache.has(t.id)
          const s = e.stickers._add(t)
          if (!i) this.client.emit(n.GuildStickerCreate, s)
          return { sticker: s }
        }
      }
      e.exports = GuildStickerCreateAction
    },
    401: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildStickerDeleteAction extends s {
        handle(e) {
          e.guild.stickers.cache.delete(e.id)
          this.client.emit(n.GuildStickerDelete, e)
          return { sticker: e }
        }
      }
      e.exports = GuildStickerDeleteAction
    },
    164: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildStickerUpdateAction extends s {
        handle(e, t) {
          const i = e._update(t)
          this.client.emit(n.GuildStickerUpdate, i, e)
          return { sticker: e }
        }
      }
      e.exports = GuildStickerUpdateAction
    },
    7013: (e, t, i) => {
      'use strict'
      const s = i(8585)
      class GuildStickersUpdateAction extends s {
        handle(e) {
          const t = this.client.guilds.cache.get(e.guild_id)
          if (!t?.stickers) return
          const i = new Map(t.stickers.cache)
          for (const s of e.stickers) {
            const e = t.stickers.cache.get(s.id)
            if (e) {
              i.delete(s.id)
              if (!e.equals(s)) {
                this.client.actions.GuildStickerUpdate.handle(e, s)
              }
            } else {
              this.client.actions.GuildStickerCreate.handle(t, s)
            }
          }
          for (const e of i.values()) {
            this.client.actions.GuildStickerDelete.handle(e)
          }
        }
      }
      e.exports = GuildStickersUpdateAction
    },
    5951: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class GuildUpdateAction extends s {
        handle(e) {
          const t = this.client
          const i = t.guilds.cache.get(e.id)
          if (i) {
            const s = i._update(e)
            t.emit(n.GuildUpdate, s, i)
            return { old: s, updated: i }
          }
          return { old: null, updated: null }
        }
      }
      e.exports = GuildUpdateAction
    },
    3356: (e, t, i) => {
      'use strict'
      const {
        InteractionType: s,
        ComponentType: n,
        ApplicationCommandType: r,
      } = i(2)
      const a = i(8585)
      const o = i(5767)
      const l = i(5282)
      const c = i(2731)
      const d = i(5737)
      const u = i(3754)
      const h = i(167)
      const m = i(9461)
      const p = i(4961)
      const f = i(4433)
      const g = i(2902)
      const v = i(1174)
      const y = i(457)
      class InteractionCreateAction extends a {
        handle(e) {
          const t = this.client
          const i = this.getChannel(e)
          let a
          switch (e.type) {
            case s.ApplicationCommand:
              switch (e.data.type) {
                case r.ChatInput:
                  a = d
                  break
                case r.User:
                  a = g
                  break
                case r.Message:
                  if (i && !i.isTextBased()) return
                  a = h
                  break
                default:
                  t.emit(
                    y.Debug,
                    `[INTERACTION] Received application command interaction with unknown type: ${e.data.type}`
                  )
                  return
              }
              break
            case s.MessageComponent:
              if (i && !i.isTextBased()) return
              switch (e.data.component_type) {
                case n.Button:
                  a = l
                  break
                case n.StringSelect:
                  a = f
                  break
                case n.UserSelect:
                  a = v
                  break
                case n.RoleSelect:
                  a = p
                  break
                case n.MentionableSelect:
                  a = u
                  break
                case n.ChannelSelect:
                  a = c
                  break
                default:
                  t.emit(
                    y.Debug,
                    `[INTERACTION] Received component interaction with unknown type: ${e.data.component_type}`
                  )
                  return
              }
              break
            case s.ApplicationCommandAutocomplete:
              a = o
              break
            case s.ModalSubmit:
              a = m
              break
            default:
              t.emit(
                y.Debug,
                `[INTERACTION] Received interaction with unknown type: ${e.type}`
              )
              return
          }
          const _ = new a(t, e)
          t.emit(y.InteractionCreate, _)
        }
      }
      e.exports = InteractionCreateAction
    },
    3513: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class InviteCreateAction extends s {
        handle(e) {
          const t = this.client
          const i = t.channels.cache.get(e.channel_id)
          const s = t.guilds.cache.get(e.guild_id)
          if (!i) return false
          const r = Object.assign(e, { channel: i, guild: s })
          const a = s.invites._add(r)
          t.emit(n.InviteCreate, a)
          return { invite: a }
        }
      }
      e.exports = InviteCreateAction
    },
    1533: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(3493)
      const r = i(457)
      class InviteDeleteAction extends s {
        handle(e) {
          const t = this.client
          const i = t.channels.cache.get(e.channel_id)
          const s = t.guilds.cache.get(e.guild_id)
          if (!i) return false
          const a = Object.assign(e, { channel: i, guild: s })
          const o = new n(t, a)
          s.invites.cache.delete(o.code)
          t.emit(r.InviteDelete, o)
          return { invite: o }
        }
      }
      e.exports = InviteDeleteAction
    },
    6674: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class MessageCreateAction extends s {
        handle(e) {
          const t = this.client
          const i = this.getChannel(e)
          if (i) {
            if (!i.isTextBased()) return {}
            if (i.isThread()) {
              i.messageCount++
              i.totalMessageSent++
            }
            const s = i.messages.cache.get(e.id)
            if (s) return { message: s }
            const r = i.messages._add(e)
            i.lastMessageId = e.id
            t.emit(n.MessageCreate, r)
            return { message: r }
          }
          return {}
        }
      }
      e.exports = MessageCreateAction
    },
    3842: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class MessageDeleteAction extends s {
        handle(e) {
          const t = this.client
          const i = this.getChannel(e)
          let s
          if (i) {
            if (!i.isTextBased()) return {}
            if (i.isThread()) i.messageCount--
            s = this.getMessage(e, i)
            if (s) {
              i.messages.cache.delete(s.id)
              t.emit(n.MessageDelete, s)
            }
          }
          return { message: s }
        }
      }
      e.exports = MessageDeleteAction
    },
    3498: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const n = i(8585)
      const r = i(457)
      class MessageDeleteBulkAction extends n {
        handle(e) {
          const t = this.client
          const i = t.channels.cache.get(e.channel_id)
          if (i) {
            if (!i.isTextBased()) return {}
            if (i.isThread()) i.messageCount -= e.ids.length
            const n = e.ids
            const a = new s()
            for (const t of n) {
              const s = this.getMessage(
                { id: t, guild_id: e.guild_id },
                i,
                false
              )
              if (s) {
                a.set(s.id, s)
                i.messages.cache.delete(t)
              }
            }
            if (a.size > 0) t.emit(r.MessageBulkDelete, a, i)
            return { messages: a }
          }
          return {}
        }
      }
      e.exports = MessageDeleteBulkAction
    },
    8170: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      const r = i(527)
      class MessageReactionAdd extends s {
        handle(e, t = false) {
          if (!e.emoji) return false
          const i = this.getUserFromMember(e)
          if (!i) return false
          const s = this.getChannel(e)
          if (!s?.isTextBased()) return false
          const a = this.getMessage(e, s)
          if (!a) return false
          const o = this.client.options.partials.includes(r.Reaction)
          if (a.partial && !o) return false
          const l = a.reactions._add({
            emoji: e.emoji,
            count: a.partial ? null : 0,
            me: i.id === this.client.user.id,
          })
          if (!l) return false
          l._add(i)
          if (t) return { message: a, reaction: l, user: i }
          this.client.emit(n.MessageReactionAdd, l, i)
          return { message: a, reaction: l, user: i }
        }
      }
      e.exports = MessageReactionAdd
    },
    9666: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class MessageReactionRemove extends s {
        handle(e) {
          if (!e.emoji) return false
          const t = this.getUser(e)
          if (!t) return false
          const i = this.getChannel(e)
          if (!i?.isTextBased()) return false
          const s = this.getMessage(e, i)
          if (!s) return false
          const r = this.getReaction(e, s, t)
          if (!r) return false
          r._remove(t)
          this.client.emit(n.MessageReactionRemove, r, t)
          return { message: s, reaction: r, user: t }
        }
      }
      e.exports = MessageReactionRemove
    },
    3223: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class MessageReactionRemoveAll extends s {
        handle(e) {
          const t = this.getChannel(e)
          if (!t?.isTextBased()) return false
          const i = this.getMessage(e, t)
          if (!i) return false
          const s = i.reactions.cache.clone()
          i.reactions.cache.clear()
          this.client.emit(n.MessageReactionRemoveAll, i, s)
          return { message: i }
        }
      }
      e.exports = MessageReactionRemoveAll
    },
    2571: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class MessageReactionRemoveEmoji extends s {
        handle(e) {
          const t = this.getChannel(e)
          if (!t?.isTextBased()) return false
          const i = this.getMessage(e, t)
          if (!i) return false
          const s = this.getReaction(e, i)
          if (!s) return false
          if (!i.partial) i.reactions.cache.delete(s.emoji.id ?? s.emoji.name)
          this.client.emit(n.MessageReactionRemoveEmoji, s)
          return { reaction: s }
        }
      }
      e.exports = MessageReactionRemoveEmoji
    },
    3e3: (e, t, i) => {
      'use strict'
      const s = i(8585)
      class MessageUpdateAction extends s {
        handle(e) {
          const t = this.getChannel(e)
          if (t) {
            if (!t.isTextBased()) return {}
            const {
              id: i,
              channel_id: s,
              guild_id: n,
              author: r,
              timestamp: a,
              type: o,
            } = e
            const l = this.getMessage(
              {
                id: i,
                channel_id: s,
                guild_id: n,
                author: r,
                timestamp: a,
                type: o,
              },
              t
            )
            if (l) {
              const t = l._update(e)
              return { old: t, updated: l }
            }
          }
          return {}
        }
      }
      e.exports = MessageUpdateAction
    },
    6772: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class PresenceUpdateAction extends s {
        handle(e) {
          let t = this.client.users.cache.get(e.user.id)
          if (!t && e.user.username) t = this.client.users._add(e.user)
          if (!t) return
          if (e.user.username) {
            if (!t._equals(e.user))
              this.client.actions.UserUpdate.handle(e.user)
          }
          const i = this.client.guilds.cache.get(e.guild_id)
          if (!i) return
          const s = i.presences.cache.get(t.id)?._clone() ?? null
          let r = i.members.cache.get(t.id)
          if (!r && e.status !== 'offline') {
            r = i.members._add({ user: t, deaf: false, mute: false })
            this.client.emit(n.GuildMemberAvailable, r)
          }
          const a = i.presences._add(Object.assign(e, { guild: i }))
          if (this.client.listenerCount(n.PresenceUpdate) && !a.equals(s)) {
            this.client.emit(n.PresenceUpdate, s, a)
          }
        }
      }
      e.exports = PresenceUpdateAction
    },
    6847: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class StageInstanceCreateAction extends s {
        handle(e) {
          const t = this.client
          const i = this.getChannel(e)
          if (i) {
            const s = i.guild.stageInstances._add(e)
            t.emit(n.StageInstanceCreate, s)
            return { stageInstance: s }
          }
          return {}
        }
      }
      e.exports = StageInstanceCreateAction
    },
    8662: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class StageInstanceDeleteAction extends s {
        handle(e) {
          const t = this.client
          const i = this.getChannel(e)
          if (i) {
            const s = i.guild.stageInstances._add(e)
            if (s) {
              i.guild.stageInstances.cache.delete(s.id)
              t.emit(n.StageInstanceDelete, s)
              return { stageInstance: s }
            }
          }
          return {}
        }
      }
      e.exports = StageInstanceDeleteAction
    },
    9048: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class StageInstanceUpdateAction extends s {
        handle(e) {
          const t = this.client
          const i = this.getChannel(e)
          if (i) {
            const s = i.guild.stageInstances.cache.get(e.id)?._clone() ?? null
            const r = i.guild.stageInstances._add(e)
            t.emit(n.StageInstanceUpdate, s, r)
            return { oldStageInstance: s, newStageInstance: r }
          }
          return {}
        }
      }
      e.exports = StageInstanceUpdateAction
    },
    7470: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class ThreadCreateAction extends s {
        handle(e) {
          const t = this.client
          const i = t.channels.cache.has(e.id)
          const s = t.channels._add(e)
          if (!i && s) {
            t.emit(n.ThreadCreate, s, e.newly_created ?? false)
          }
          return { thread: s }
        }
      }
      e.exports = ThreadCreateAction
    },
    3551: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class ThreadDeleteAction extends s {
        handle(e) {
          const t = this.client
          const i = t.channels.cache.get(e.id)
          if (i) {
            t.channels._remove(i.id)
            t.emit(n.ThreadDelete, i)
          }
          return { thread: i }
        }
      }
      e.exports = ThreadDeleteAction
    },
    840: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const n = i(8585)
      const r = i(457)
      class ThreadListSyncAction extends n {
        handle(e) {
          const t = this.client
          const i = t.guilds.cache.get(e.guild_id)
          if (!i) return {}
          if (e.channel_ids) {
            for (const i of e.channel_ids) {
              const e = t.channels.resolve(i)
              if (e) this.removeStale(e)
            }
          } else {
            for (const e of i.channels.cache.values()) {
              this.removeStale(e)
            }
          }
          const n = e.threads.reduce((e, i) => {
            const s = t.channels._add(i)
            return e.set(s.id, s)
          }, new s())
          for (const i of Object.values(e.members)) {
            const e = t.channels.cache.get(i.id)
            if (e) {
              e.members._add(i)
            }
          }
          t.emit(r.ThreadListSync, n, i)
          return { syncedThreads: n }
        }
        removeStale(e) {
          e.threads?.cache.forEach((e) => {
            if (!e.archived) {
              this.client.channels._remove(e.id)
            }
          })
        }
      }
      e.exports = ThreadListSyncAction
    },
    3404: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class ThreadMemberUpdateAction extends s {
        handle(e) {
          const t = this.client
          const i = t.channels.cache.get(e.id)
          if (i) {
            const s = i.members.cache.get(e.user_id)
            if (!s) {
              const t = i.members._add(e)
              return { newMember: t }
            }
            const r = s._update(e)
            t.emit(n.ThreadMemberUpdate, r, s)
          }
          return {}
        }
      }
      e.exports = ThreadMemberUpdateAction
    },
    8255: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const n = i(8585)
      const r = i(457)
      class ThreadMembersUpdateAction extends n {
        handle(e) {
          const t = this.client
          const i = t.channels.cache.get(e.id)
          if (i) {
            i.memberCount = e.member_count
            const n = new s()
            const a = new s()
            e.added_members?.reduce(
              (e, t) => e.set(t.user_id, i.members._add(t)),
              n
            )
            e.removed_member_ids?.reduce((e, t) => {
              const s = this.getThreadMember(t, i.members)
              if (s) e.set(s.id, s)
              i.members.cache.delete(t)
              return e
            }, a)
            if (n.size === 0 && a.size === 0) {
              return {}
            }
            t.emit(r.ThreadMembersUpdate, n, a, i)
          }
          return {}
        }
      }
      e.exports = ThreadMembersUpdateAction
    },
    8887: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(7175)
      const r = i(457)
      class TypingStart extends s {
        handle(e) {
          const t = this.getChannel(e)
          if (!t) return
          if (!t.isTextBased()) {
            this.client.emit(
              r.Warn,
              `Discord sent a typing packet to a ${t.type} channel ${t.id}`
            )
            return
          }
          const i = this.getUserFromMember(e)
          if (i) {
            this.client.emit(r.TypingStart, new n(t, i, e))
          }
        }
      }
      e.exports = TypingStart
    },
    570: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class UserUpdateAction extends s {
        handle(e) {
          const t = this.client
          const i = e.id === t.user.id ? t.user : t.users.cache.get(e.id)
          const s = i._update(e)
          if (!s.equals(i)) {
            t.emit(n.UserUpdate, s, i)
            return { old: s, updated: i }
          }
          return { old: null, updated: null }
        }
      }
      e.exports = UserUpdateAction
    },
    8180: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(5036)
      const r = i(457)
      class VoiceStateUpdate extends s {
        handle(e) {
          const t = this.client
          const i = t.guilds.cache.get(e.guild_id)
          if (i) {
            const s =
              i.voiceStates.cache.get(e.user_id)?._clone() ??
              new n(i, { user_id: e.user_id })
            const a = i.voiceStates._add(e)
            let o = i.members.cache.get(e.user_id)
            if (o && e.member) {
              o._patch(e.member)
            } else if (e.member?.user && e.member.joined_at) {
              o = i.members._add(e.member)
            }
            if (o?.user.id === t.user.id) {
              t.emit(
                'debug',
                `[VOICE] received voice state update: ${JSON.stringify(e)}`
              )
              t.voice.onVoiceStateUpdate(e)
            }
            t.emit(r.VoiceStateUpdate, s, a)
          }
        }
      }
      e.exports = VoiceStateUpdate
    },
    4453: (e, t, i) => {
      'use strict'
      const s = i(8585)
      const n = i(457)
      class WebhooksUpdate extends s {
        handle(e) {
          const t = this.client
          const i = t.channels.cache.get(e.channel_id)
          if (i) t.emit(n.WebhooksUpdate, i)
        }
      }
      e.exports = WebhooksUpdate
    },
    9133: (e, t, i) => {
      'use strict'
      const s = i(457)
      class ClientVoiceManager {
        constructor(e) {
          Object.defineProperty(this, 'client', { value: e })
          this.adapters = new Map()
          e.on(s.ShardDisconnect, (t, i) => {
            for (const [t, s] of this.adapters.entries()) {
              if (e.guilds.cache.get(t)?.shardId === i) {
                s.destroy()
              }
            }
          })
        }
        onVoiceServer(e) {
          this.adapters.get(e.guild_id)?.onVoiceServerUpdate(e)
        }
        onVoiceStateUpdate(e) {
          if (
            e.guild_id &&
            e.session_id &&
            e.user_id === this.client.user?.id
          ) {
            this.adapters.get(e.guild_id)?.onVoiceStateUpdate(e)
          }
        }
      }
      e.exports = ClientVoiceManager
    },
    2626: (e, t, i) => {
      'use strict'
      const s = i(5673)
      const { setImmediate: n } = i(2332)
      const { setTimeout: r } = i(9397)
      const { Collection: a } = i(2676)
      const { GatewayCloseCodes: o, GatewayDispatchEvents: l, Routes: c } = i(2)
      const d = i(3800)
      const u = i(8486)
      const { DiscordjsError: h, ErrorCodes: m } = i(8951)
      const p = i(457)
      const f = i(6619)
      const g = i(5579)
      const v = [
        l.Ready,
        l.Resumed,
        l.GuildCreate,
        l.GuildDelete,
        l.GuildMembersChunk,
        l.GuildMemberAdd,
        l.GuildMemberRemove,
      ]
      const y = {
        [o.AuthenticationFailed]: m.TokenInvalid,
        [o.InvalidShard]: m.ShardingInvalid,
        [o.ShardingRequired]: m.ShardingRequired,
        [o.InvalidIntents]: m.InvalidIntents,
        [o.DisallowedIntents]: m.DisallowedIntents,
      }
      const _ = [1e3, o.AlreadyAuthenticated, o.InvalidSeq]
      class WebSocketManager extends s {
        constructor(e) {
          super()
          Object.defineProperty(this, 'client', { value: e })
          this.gateway = null
          this.totalShards = this.client.options.shards.length
          this.shards = new a()
          Object.defineProperty(this, 'shardQueue', {
            value: new Set(),
            writable: true,
          })
          Object.defineProperty(this, 'packetQueue', { value: [] })
          this.status = f.Idle
          this.destroyed = false
          this.reconnecting = false
        }
        get ping() {
          const e = this.shards.reduce((e, t) => e + t.ping, 0)
          return e / this.shards.size
        }
        debug(e, t) {
          this.client.emit(
            p.Debug,
            `[WS => ${t ? `Shard ${t.id}` : 'Manager'}] ${e}`
          )
        }
        async connect() {
          const e = new h(m.TokenInvalid)
          const {
            url: t,
            shards: i,
            session_start_limit: s,
          } = await this.client.rest.get(c.gatewayBot()).catch((t) => {
            throw t.status === 401 ? e : t
          })
          const { total: n, remaining: r } = s
          this.debug(
            `Fetched Gateway Information\n    URL: ${t}\n    Recommended Shards: ${i}`
          )
          this.debug(
            `Session Limit Information\n    Total: ${n}\n    Remaining: ${r}`
          )
          this.gateway = `${t}/`
          let { shards: a } = this.client.options
          if (a === 'auto') {
            this.debug(
              `Using the recommended shard count provided by Discord: ${i}`
            )
            this.totalShards = this.client.options.shardCount = i
            a = this.client.options.shards = Array.from(
              { length: i },
              (e, t) => t
            )
          }
          this.totalShards = a.length
          this.debug(`Spawning shards: ${a.join(', ')}`)
          this.shardQueue = new Set(a.map((e) => new d(this, e)))
          return this.createShards()
        }
        async createShards() {
          if (!this.shardQueue.size) return false
          const [e] = this.shardQueue
          this.shardQueue.delete(e)
          if (!e.eventsAttached) {
            e.on(g.AllReady, (t) => {
              this.client.emit(p.ShardReady, e.id, t)
              if (!this.shardQueue.size) this.reconnecting = false
              this.checkShardsReady()
            })
            e.on(g.Close, (t) => {
              if (t.code === 1e3 ? this.destroyed : t.code in y) {
                this.client.emit(p.ShardDisconnect, t, e.id)
                this.debug(o[t.code], e)
                return
              }
              if (_.includes(t.code)) {
                e.sessionId = null
              }
              this.client.emit(p.ShardReconnecting, e.id)
              this.shardQueue.add(e)
              if (e.sessionId)
                this.debug(
                  `Session id is present, attempting an immediate reconnect...`,
                  e
                )
              this.reconnect()
            })
            e.on(g.InvalidSession, () => {
              this.client.emit(p.ShardReconnecting, e.id)
            })
            e.on(g.Destroyed, () => {
              this.debug(
                'Shard was destroyed but no WebSocket connection was present! Reconnecting...',
                e
              )
              this.client.emit(p.ShardReconnecting, e.id)
              this.shardQueue.add(e)
              this.reconnect()
            })
            e.eventsAttached = true
          }
          this.shards.set(e.id, e)
          try {
            await e.connect()
          } catch (t) {
            if (t?.code && t.code in y) {
              throw new h(y[t.code])
            } else if (!t || t.code) {
              this.debug('Failed to connect to the gateway, requeueing...', e)
              this.shardQueue.add(e)
            } else {
              throw t
            }
          }
          if (this.shardQueue.size) {
            this.debug(
              `Shard Queue Size: ${this.shardQueue.size}; continuing in 5 seconds...`
            )
            await r(5e3)
            return this.createShards()
          }
          return true
        }
        async reconnect() {
          if (this.reconnecting || this.status !== f.Ready) return false
          this.reconnecting = true
          try {
            await this.createShards()
          } catch (e) {
            this.debug(
              `Couldn't reconnect or fetch information about the gateway. ${e}`
            )
            if (e.httpStatus !== 401) {
              this.debug(`Possible network error occurred. Retrying in 5s...`)
              await r(5e3)
              this.reconnecting = false
              return this.reconnect()
            }
            if (this.client.listenerCount(p.Invalidated)) {
              this.client.emit(p.Invalidated)
              this.destroy()
            } else {
              this.client.destroy()
            }
          } finally {
            this.reconnecting = false
          }
          return true
        }
        broadcast(e) {
          for (const t of this.shards.values()) t.send(e)
        }
        destroy() {
          if (this.destroyed) return
          this.debug(`Manager was destroyed. Called by:\n${new Error().stack}`)
          this.destroyed = true
          this.shardQueue.clear()
          for (const e of this.shards.values())
            e.destroy({ closeCode: 1e3, reset: true, emit: false, log: false })
        }
        handlePacket(e, t) {
          if (e && this.status !== f.Ready) {
            if (!v.includes(e.t)) {
              this.packetQueue.push({ packet: e, shard: t })
              return false
            }
          }
          if (this.packetQueue.length) {
            const e = this.packetQueue.shift()
            n(() => {
              this.handlePacket(e.packet, e.shard)
            }).unref()
          }
          if (e && u[e.t]) {
            u[e.t](this.client, e, t)
          }
          return true
        }
        checkShardsReady() {
          if (this.status === f.Ready) return
          if (
            this.shards.size !== this.totalShards ||
            this.shards.some((e) => e.status !== f.Ready)
          ) {
            return
          }
          this.triggerClientReady()
        }
        triggerClientReady() {
          this.status = f.Ready
          this.client.readyTimestamp = Date.now()
          this.client.emit(p.ClientReady, this.client)
          this.handlePacket()
        }
      }
      e.exports = WebSocketManager
    },
    3800: (e, t, i) => {
      'use strict'
      const s = i(5673)
      const {
        setTimeout: n,
        setInterval: r,
        clearTimeout: a,
        clearInterval: o,
      } = i(2332)
      const {
        GatewayDispatchEvents: l,
        GatewayIntentBits: c,
        GatewayOpcodes: d,
      } = i(2)
      const u = i(9245)
      const h = i(457)
      const m = i(6619)
      const p = i(5579)
      const f = Object.keys(m)
      const g = Object.keys(u.WebSocket)
      let v
      try {
        v = i(3115)
      } catch {}
      class WebSocketShard extends s {
        constructor(e, t) {
          super()
          this.manager = e
          this.id = t
          this.status = m.Idle
          this.sequence = -1
          this.closeSequence = 0
          this.sessionId = null
          this.resumeURL = null
          this.ping = -1
          this.lastPingTimestamp = -1
          this.lastHeartbeatAcked = true
          this.closeEmitted = false
          Object.defineProperty(this, 'ratelimit', {
            value: {
              queue: [],
              total: 120,
              remaining: 120,
              time: 6e4,
              timer: null,
            },
          })
          Object.defineProperty(this, 'connection', {
            value: null,
            writable: true,
          })
          Object.defineProperty(this, 'inflate', {
            value: null,
            writable: true,
          })
          Object.defineProperty(this, 'helloTimeout', {
            value: null,
            writable: true,
          })
          Object.defineProperty(this, 'wsCloseTimeout', {
            value: null,
            writable: true,
          })
          Object.defineProperty(this, 'eventsAttached', {
            value: false,
            writable: true,
          })
          Object.defineProperty(this, 'expectedGuilds', {
            value: null,
            writable: true,
          })
          Object.defineProperty(this, 'readyTimeout', {
            value: null,
            writable: true,
          })
          Object.defineProperty(this, 'connectedAt', {
            value: 0,
            writable: true,
          })
        }
        debug(e) {
          this.manager.debug(e, this)
        }
        connect() {
          const { client: e } = this.manager
          if (
            this.connection?.readyState === u.OPEN &&
            this.status === m.Ready
          ) {
            return Promise.resolve()
          }
          const t = this.resumeURL ?? this.manager.gateway
          return new Promise((i, s) => {
            const cleanup = () => {
              this.removeListener(p.Close, onClose)
              this.removeListener(p.Ready, onReady)
              this.removeListener(p.Resumed, onResumed)
              this.removeListener(p.InvalidSession, onInvalidOrDestroyed)
              this.removeListener(p.Destroyed, onInvalidOrDestroyed)
            }
            const onReady = () => {
              cleanup()
              i()
            }
            const onResumed = () => {
              cleanup()
              i()
            }
            const onClose = (e) => {
              cleanup()
              s(e)
            }
            const onInvalidOrDestroyed = () => {
              cleanup()
              s()
            }
            this.once(p.Ready, onReady)
            this.once(p.Resumed, onResumed)
            this.once(p.Close, onClose)
            this.once(p.InvalidSession, onInvalidOrDestroyed)
            this.once(p.Destroyed, onInvalidOrDestroyed)
            if (this.connection?.readyState === u.OPEN) {
              this.debug(
                'An open connection was found, attempting an immediate identify.'
              )
              this.identify()
              return
            }
            if (this.connection) {
              this.debug(
                `A connection object was found. Cleaning up before continuing.\n    State: ${
                  g[this.connection.readyState]
                }`
              )
              this.destroy({ emit: false })
            }
            const n = { v: e.options.ws.version }
            if (v) {
              this.inflate = new v.Inflate({
                chunkSize: 65535,
                flush: v.Z_SYNC_FLUSH,
                to: u.encoding === 'json' ? 'string' : '',
              })
              n.compress = 'zlib-stream'
            }
            this.debug(
              `[CONNECT]\n    Gateway    : ${t}\n    Version    : ${
                e.options.ws.version
              }\n    Encoding   : ${u.encoding}\n    Compression: ${
                v ? 'zlib-stream' : 'none'
              }`
            )
            this.status =
              this.status === m.Disconnected ? m.Reconnecting : m.Connecting
            this.setHelloTimeout()
            this.connectedAt = Date.now()
            const r = (this.connection = u.create(t, n, {
              handshakeTimeout: 3e4,
            }))
            r.onopen = this.onOpen.bind(this)
            r.onmessage = this.onMessage.bind(this)
            r.onerror = this.onError.bind(this)
            r.onclose = this.onClose.bind(this)
          })
        }
        onOpen() {
          this.debug(`[CONNECTED] Took ${Date.now() - this.connectedAt}ms`)
          this.status = m.Nearly
        }
        onMessage({ data: e }) {
          let t
          if (e instanceof ArrayBuffer) e = new Uint8Array(e)
          if (v) {
            const i = e.length
            const s =
              i >= 4 &&
              e[i - 4] === 0 &&
              e[i - 3] === 0 &&
              e[i - 2] === 255 &&
              e[i - 1] === 255
            this.inflate.push(e, s && v.Z_SYNC_FLUSH)
            if (!s) return
            t = this.inflate.result
          } else {
            t = e
          }
          let i
          try {
            i = u.unpack(t)
          } catch (e) {
            this.manager.client.emit(h.ShardError, e, this.id)
            return
          }
          this.manager.client.emit(h.Raw, i, this.id)
          if (i.op === d.Dispatch) this.manager.emit(i.t, i.d, this.id)
          this.onPacket(i)
        }
        onError(e) {
          const t = e?.error ?? e
          if (!t) return
          this.manager.client.emit(h.ShardError, t, this.id)
        }
        onClose(e) {
          this.closeEmitted = true
          if (this.sequence !== -1) this.closeSequence = this.sequence
          this.sequence = -1
          this.setHeartbeatTimer(-1)
          this.setHelloTimeout(-1)
          this.setWsCloseTimeout(-1)
          if (this.connection) this._cleanupConnection()
          this.status = m.Disconnected
          this.emitClose(e)
        }
        emitClose(
          e = { code: 1011, reason: 'INTERNAL_ERROR', wasClean: false }
        ) {
          this.debug(
            `[CLOSE]\n    Event Code: ${e.code}\n    Clean     : ${
              e.wasClean
            }\n    Reason    : ${e.reason ?? 'No reason received'}`
          )
          this.emit(p.Close, e)
        }
        onPacket(e) {
          if (!e) {
            this.debug(`Received broken packet: '${e}'.`)
            return
          }
          switch (e.t) {
            case l.Ready:
              this.emit(p.Ready)
              this.sessionId = e.d.session_id
              this.resumeURL = e.d.resume_gateway_url
              this.expectedGuilds = new Set(e.d.guilds.map((e) => e.id))
              this.status = m.WaitingForGuilds
              this.debug(
                `[READY] Session ${this.sessionId} | Resume url ${this.resumeURL}.`
              )
              this.lastHeartbeatAcked = true
              this.sendHeartbeat('ReadyHeartbeat')
              break
            case l.Resumed: {
              this.emit(p.Resumed)
              this.status = m.Ready
              const t = e.s - this.closeSequence
              this.debug(
                `[RESUMED] Session ${this.sessionId} | Replayed ${t} events.`
              )
              this.lastHeartbeatAcked = true
              this.sendHeartbeat('ResumeHeartbeat')
              break
            }
          }
          if (e.s > this.sequence) this.sequence = e.s
          switch (e.op) {
            case d.Hello:
              this.setHelloTimeout(-1)
              this.setHeartbeatTimer(e.d.heartbeat_interval)
              this.identify()
              break
            case d.Reconnect:
              this.debug('[RECONNECT] Discord asked us to reconnect')
              this.destroy({ closeCode: 4e3 })
              break
            case d.InvalidSession:
              this.debug(`[INVALID SESSION] Resumable: ${e.d}.`)
              if (e.d) {
                this.identifyResume()
                return
              }
              this.sequence = -1
              this.sessionId = null
              this.status = m.Reconnecting
              this.emit(p.InvalidSession)
              break
            case d.HeartbeatAck:
              this.ackHeartbeat()
              break
            case d.Heartbeat:
              this.sendHeartbeat('HeartbeatRequest', true)
              break
            default:
              this.manager.handlePacket(e, this)
              if (this.status === m.WaitingForGuilds && e.t === l.GuildCreate) {
                this.expectedGuilds.delete(e.d.id)
                this.checkReady()
              }
          }
        }
        checkReady() {
          if (this.readyTimeout) {
            a(this.readyTimeout)
            this.readyTimeout = null
          }
          if (!this.expectedGuilds.size) {
            this.debug('Shard received all its guilds. Marking as fully ready.')
            this.status = m.Ready
            this.emit(p.AllReady)
            return
          }
          const e = this.manager.client.options.intents.has(c.Guilds)
          const { waitGuildTimeout: t } = this.manager.client.options
          this.readyTimeout = n(
            () => {
              this.debug(
                `Shard ${
                  e ? 'did' : 'will'
                } not receive any more guild packets` +
                  `${e ? ` in ${t} ms` : ''}.\nUnavailable guild count: ${
                    this.expectedGuilds.size
                  }`
              )
              this.readyTimeout = null
              this.status = m.Ready
              this.emit(p.AllReady, this.expectedGuilds)
            },
            e ? t : 0
          ).unref()
        }
        setHelloTimeout(e) {
          if (e === -1) {
            if (this.helloTimeout) {
              this.debug('Clearing the HELLO timeout.')
              a(this.helloTimeout)
              this.helloTimeout = null
            }
            return
          }
          this.debug('Setting a HELLO timeout for 20s.')
          this.helloTimeout = n(() => {
            this.debug(
              'Did not receive HELLO in time. Destroying and connecting again.'
            )
            this.destroy({ reset: true, closeCode: 4009 })
          }, 2e4).unref()
        }
        setWsCloseTimeout(e) {
          if (this.wsCloseTimeout) {
            this.debug('[WebSocket] Clearing the close timeout.')
            a(this.wsCloseTimeout)
          }
          if (e === -1) {
            this.wsCloseTimeout = null
            return
          }
          this.wsCloseTimeout = n(() => {
            this.setWsCloseTimeout(-1)
            this.debug(`[WebSocket] Close Emitted: ${this.closeEmitted}`)
            if (this.closeEmitted) {
              this.debug(
                `[WebSocket] was closed. | WS State: ${
                  g[this.connection?.readyState ?? u.CLOSED]
                } | Close Emitted: ${this.closeEmitted}`
              )
              this.closeEmitted = false
              return
            }
            this.debug(
              `[WebSocket] did not close properly, assuming a zombie connection.\nEmitting close and reconnecting again.`
            )
            this.emitClose()
            this.closeEmitted = false
          }, e).unref()
        }
        setHeartbeatTimer(e) {
          if (e === -1) {
            if (this.heartbeatInterval) {
              this.debug('Clearing the heartbeat interval.')
              o(this.heartbeatInterval)
              this.heartbeatInterval = null
            }
            return
          }
          this.debug(`Setting a heartbeat interval for ${e}ms.`)
          if (this.heartbeatInterval) o(this.heartbeatInterval)
          this.heartbeatInterval = r(() => this.sendHeartbeat(), e).unref()
        }
        sendHeartbeat(
          e = 'HeartbeatTimer',
          t = [m.WaitingForGuilds, m.Identifying, m.Resuming].includes(
            this.status
          )
        ) {
          if (t && !this.lastHeartbeatAcked) {
            this.debug(
              `[${e}] Didn't process heartbeat ack yet but we are still connected. Sending one now.`
            )
          } else if (!this.lastHeartbeatAcked) {
            this.debug(
              `[${e}] Didn't receive a heartbeat ack last time, assuming zombie connection. Destroying and reconnecting.\n    Status          : ${
                f[this.status]
              }\n    Sequence        : ${
                this.sequence
              }\n    Connection State: ${
                this.connection
                  ? g[this.connection.readyState]
                  : 'No Connection??'
              }`
            )
            this.destroy({ reset: true, closeCode: 4009 })
            return
          }
          this.debug(`[${e}] Sending a heartbeat.`)
          this.lastHeartbeatAcked = false
          this.lastPingTimestamp = Date.now()
          this.send({ op: d.Heartbeat, d: this.sequence }, true)
        }
        ackHeartbeat() {
          this.lastHeartbeatAcked = true
          const e = Date.now() - this.lastPingTimestamp
          this.debug(`Heartbeat acknowledged, latency of ${e}ms.`)
          this.ping = e
        }
        identify() {
          return this.sessionId ? this.identifyResume() : this.identifyNew()
        }
        identifyNew() {
          const { client: e } = this.manager
          if (!e.token) {
            this.debug(
              '[IDENTIFY] No token available to identify a new session.'
            )
            return
          }
          this.status = m.Identifying
          const t = {
            ...e.options.ws,
            intents: e.options.intents.bitfield,
            token: e.token,
            shard: [this.id, Number(e.options.shardCount)],
          }
          this.debug(
            `[IDENTIFY] Shard ${this.id}/${e.options.shardCount} with intents: ${t.intents}`
          )
          this.send({ op: d.Identify, d: t }, true)
        }
        identifyResume() {
          if (!this.sessionId) {
            this.debug(
              '[RESUME] No session id was present; identifying as a new session.'
            )
            this.identifyNew()
            return
          }
          this.status = m.Resuming
          this.debug(
            `[RESUME] Session ${this.sessionId}, sequence ${this.closeSequence}`
          )
          const e = {
            token: this.manager.client.token,
            session_id: this.sessionId,
            seq: this.closeSequence,
          }
          this.send({ op: d.Resume, d: e }, true)
        }
        send(e, t = false) {
          this.ratelimit.queue[t ? 'unshift' : 'push'](e)
          this.processQueue()
        }
        _send(e) {
          if (this.connection?.readyState !== u.OPEN) {
            this.debug(
              `Tried to send packet '${JSON.stringify(e).replaceAll(
                this.manager.client.token,
                this.manager.client._censoredToken
              )}' but no WebSocket is available!`
            )
            this.destroy({ closeCode: 4e3 })
            return
          }
          this.connection.send(u.pack(e), (e) => {
            if (e) this.manager.client.emit(h.ShardError, e, this.id)
          })
        }
        processQueue() {
          if (this.ratelimit.remaining === 0) return
          if (this.ratelimit.queue.length === 0) return
          if (this.ratelimit.remaining === this.ratelimit.total) {
            this.ratelimit.timer = n(() => {
              this.ratelimit.remaining = this.ratelimit.total
              this.processQueue()
            }, this.ratelimit.time).unref()
          }
          while (this.ratelimit.remaining > 0) {
            const e = this.ratelimit.queue.shift()
            if (!e) return
            this._send(e)
            this.ratelimit.remaining--
          }
        }
        destroy({
          closeCode: e = 1e3,
          reset: t = false,
          emit: i = true,
          log: s = true,
        } = {}) {
          if (s) {
            this.debug(
              `[DESTROY]\n    Close Code    : ${e}\n    Reset         : ${t}\n    Emit DESTROYED: ${i}`
            )
          }
          this.setHeartbeatTimer(-1)
          this.setHelloTimeout(-1)
          this.debug(
            `[WebSocket] Destroy: Attempting to close the WebSocket. | WS State: ${
              g[this.connection?.readyState ?? u.CLOSED]
            }`
          )
          if (this.connection) {
            if (this.connection.readyState === u.OPEN) {
              this.connection.close(e)
              this.debug(
                `[WebSocket] Close: Tried closing. | WS State: ${
                  g[this.connection.readyState]
                }`
              )
            } else {
              this.debug(`WS State: ${g[this.connection.readyState]}`)
              this._cleanupConnection()
              try {
                this.connection.close(e)
              } catch (e) {
                this.debug(
                  `[WebSocket] Close: Something went wrong while closing the WebSocket: ${
                    e.message || e
                  }. Forcefully terminating the connection | WS State: ${
                    g[this.connection.readyState]
                  }`
                )
                this.connection.terminate()
              }
              if (i) this._emitDestroyed()
            }
          } else if (i) {
            this._emitDestroyed()
          }
          if (
            this.connection?.readyState === u.CLOSING ||
            this.connection?.readyState === u.CLOSED
          ) {
            this.closeEmitted = false
            this.debug(
              `[WebSocket] Adding a WebSocket close timeout to ensure a correct WS reconnect.\n        Timeout: ${this.manager.client.options.closeTimeout}ms`
            )
            this.setWsCloseTimeout(this.manager.client.options.closeTimeout)
          }
          this.connection = null
          this.status = m.Disconnected
          if (this.sequence !== -1) this.closeSequence = this.sequence
          if (t) {
            this.sequence = -1
            this.sessionId = null
            this.resumeURL = null
          }
          this.ratelimit.remaining = this.ratelimit.total
          this.ratelimit.queue.length = 0
          if (this.ratelimit.timer) {
            a(this.ratelimit.timer)
            this.ratelimit.timer = null
          }
        }
        _cleanupConnection() {
          this.connection.onopen =
            this.connection.onclose =
            this.connection.onmessage =
              null
          this.connection.onerror = () => null
        }
        _emitDestroyed() {
          this.emit(p.Destroyed)
        }
      }
      e.exports = WebSocketShard
    },
    7264: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.ApplicationCommandPermissionsUpdate.handle(t.d)
      }
    },
    9737: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.AutoModerationActionExecution.handle(t.d)
      }
    },
    9480: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.AutoModerationRuleCreate.handle(t.d)
      }
    },
    3635: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.AutoModerationRuleDelete.handle(t.d)
      }
    },
    1122: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.AutoModerationRuleUpdate.handle(t.d)
      }
    },
    7182: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.ChannelCreate.handle(t.d)
      }
    },
    4328: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.ChannelDelete.handle(t.d)
      }
    },
    4938: (e, t, i) => {
      'use strict'
      const s = i(457)
      e.exports = (e, { d: t }) => {
        const i = e.channels.cache.get(t.channel_id)
        const n = t.last_pin_timestamp ? Date.parse(t.last_pin_timestamp) : null
        if (i) {
          i.lastPinTimestamp = n
          e.emit(s.ChannelPinsUpdate, i, n)
        }
      }
    },
    3523: (e, t, i) => {
      'use strict'
      const s = i(457)
      e.exports = (e, t) => {
        const { old: i, updated: n } = e.actions.ChannelUpdate.handle(t.d)
        if (i && n) {
          e.emit(s.ChannelUpdate, i, n)
        }
      }
    },
    6248: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.GuildBanAdd.handle(t.d)
      }
    },
    635: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.GuildBanRemove.handle(t.d)
      }
    },
    5172: (e, t, i) => {
      'use strict'
      const s = i(457)
      const n = i(6619)
      e.exports = (e, { d: t }, i) => {
        let r = e.guilds.cache.get(t.id)
        if (r) {
          if (!r.available && !t.unavailable) {
            r._patch(t)
          }
        } else {
          t.shardId = i.id
          r = e.guilds._add(t)
          if (e.ws.status === n.Ready) {
            e.emit(s.GuildCreate, r)
          }
        }
      }
    },
    3924: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.GuildDelete.handle(t.d)
      }
    },
    5158: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.GuildEmojisUpdate.handle(t.d)
      }
    },
    5874: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.GuildIntegrationsUpdate.handle(t.d)
      }
    },
    3266: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const n = i(457)
      e.exports = (e, { d: t }) => {
        const i = e.guilds.cache.get(t.guild_id)
        if (!i) return
        const r = new s()
        for (const e of t.members) r.set(e.user.id, i.members._add(e))
        if (t.presences) {
          for (const e of t.presences)
            i.presences._add(Object.assign(e, { guild: i }))
        }
        e.emit(n.GuildMembersChunk, r, i, {
          count: t.chunk_count,
          index: t.chunk_index,
          nonce: t.nonce,
        })
      }
    },
    9796: (e, t, i) => {
      'use strict'
      const s = i(457)
      const n = i(6619)
      e.exports = (e, { d: t }, i) => {
        const r = e.guilds.cache.get(t.guild_id)
        if (r) {
          r.memberCount++
          const a = r.members._add(t)
          if (i.status === n.Ready) {
            e.emit(s.GuildMemberAdd, a)
          }
        }
      }
    },
    6965: (e) => {
      'use strict'
      e.exports = (e, t, i) => {
        e.actions.GuildMemberRemove.handle(t.d, i)
      }
    },
    993: (e) => {
      'use strict'
      e.exports = (e, t, i) => {
        e.actions.GuildMemberUpdate.handle(t.d, i)
      }
    },
    4989: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.GuildRoleCreate.handle(t.d)
      }
    },
    897: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.GuildRoleDelete.handle(t.d)
      }
    },
    7638: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.GuildRoleUpdate.handle(t.d)
      }
    },
    3258: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.GuildScheduledEventCreate.handle(t.d)
      }
    },
    5480: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.GuildScheduledEventDelete.handle(t.d)
      }
    },
    7169: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.GuildScheduledEventUpdate.handle(t.d)
      }
    },
    3068: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.GuildScheduledEventUserAdd.handle(t.d)
      }
    },
    6261: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.GuildScheduledEventUserRemove.handle(t.d)
      }
    },
    8262: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.GuildStickersUpdate.handle(t.d)
      }
    },
    8531: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.GuildUpdate.handle(t.d)
      }
    },
    1714: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.InteractionCreate.handle(t.d)
      }
    },
    9898: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.InviteCreate.handle(t.d)
      }
    },
    5512: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.InviteDelete.handle(t.d)
      }
    },
    7799: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.MessageCreate.handle(t.d)
      }
    },
    1689: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.MessageDelete.handle(t.d)
      }
    },
    416: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.MessageDeleteBulk.handle(t.d)
      }
    },
    8479: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.MessageReactionAdd.handle(t.d)
      }
    },
    2961: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.MessageReactionRemove.handle(t.d)
      }
    },
    3851: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.MessageReactionRemoveAll.handle(t.d)
      }
    },
    3868: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.MessageReactionRemoveEmoji.handle(t.d)
      }
    },
    9351: (e, t, i) => {
      'use strict'
      const s = i(457)
      e.exports = (e, t) => {
        const { old: i, updated: n } = e.actions.MessageUpdate.handle(t.d)
        if (i && n) {
          e.emit(s.MessageUpdate, i, n)
        }
      }
    },
    3710: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.PresenceUpdate.handle(t.d)
      }
    },
    636: (e, t, i) => {
      'use strict'
      const s = i(7538)
      let n
      e.exports = (e, { d: t }, r) => {
        if (e.user) {
          e.user._patch(t.user)
        } else {
          n ??= i(2355)
          e.user = new n(e, t.user)
          e.users.cache.set(e.user.id, e.user)
        }
        for (const i of t.guilds) {
          i.shardId = r.id
          e.guilds._add(i)
        }
        if (e.application) {
          e.application._patch(t.application)
        } else {
          e.application = new s(e, t.application)
        }
        r.checkReady()
      }
    },
    7451: (e, t, i) => {
      'use strict'
      const s = i(457)
      e.exports = (e, t, i) => {
        const n = i.sequence - i.closeSequence
        e.emit(s.ShardResume, i.id, n)
      }
    },
    1999: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.StageInstanceCreate.handle(t.d)
      }
    },
    1133: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.StageInstanceDelete.handle(t.d)
      }
    },
    5415: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.StageInstanceUpdate.handle(t.d)
      }
    },
    375: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.ThreadCreate.handle(t.d)
      }
    },
    3574: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.ThreadDelete.handle(t.d)
      }
    },
    4086: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.ThreadListSync.handle(t.d)
      }
    },
    4240: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.ThreadMembersUpdate.handle(t.d)
      }
    },
    4170: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.ThreadMemberUpdate.handle(t.d)
      }
    },
    8802: (e, t, i) => {
      'use strict'
      const s = i(457)
      e.exports = (e, t) => {
        const { old: i, updated: n } = e.actions.ChannelUpdate.handle(t.d)
        if (i && n) {
          e.emit(s.ThreadUpdate, i, n)
        }
      }
    },
    5454: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.TypingStart.handle(t.d)
      }
    },
    3298: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.UserUpdate.handle(t.d)
      }
    },
    1259: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.emit('debug', `[VOICE] received voice server: ${JSON.stringify(t)}`)
        e.voice.onVoiceServer(t.d)
      }
    },
    2609: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.VoiceStateUpdate.handle(t.d)
      }
    },
    4416: (e) => {
      'use strict'
      e.exports = (e, t) => {
        e.actions.WebhooksUpdate.handle(t.d)
      }
    },
    8486: (e, t, i) => {
      'use strict'
      const s = Object.fromEntries([
        ['APPLICATION_COMMAND_PERMISSIONS_UPDATE', i(7264)],
        ['AUTO_MODERATION_ACTION_EXECUTION', i(9737)],
        ['AUTO_MODERATION_RULE_CREATE', i(9480)],
        ['AUTO_MODERATION_RULE_DELETE', i(3635)],
        ['AUTO_MODERATION_RULE_UPDATE', i(1122)],
        ['CHANNEL_CREATE', i(7182)],
        ['CHANNEL_DELETE', i(4328)],
        ['CHANNEL_PINS_UPDATE', i(4938)],
        ['CHANNEL_UPDATE', i(3523)],
        ['GUILD_BAN_ADD', i(6248)],
        ['GUILD_BAN_REMOVE', i(635)],
        ['GUILD_CREATE', i(5172)],
        ['GUILD_DELETE', i(3924)],
        ['GUILD_EMOJIS_UPDATE', i(5158)],
        ['GUILD_INTEGRATIONS_UPDATE', i(5874)],
        ['GUILD_MEMBERS_CHUNK', i(3266)],
        ['GUILD_MEMBER_ADD', i(9796)],
        ['GUILD_MEMBER_REMOVE', i(6965)],
        ['GUILD_MEMBER_UPDATE', i(993)],
        ['GUILD_ROLE_CREATE', i(4989)],
        ['GUILD_ROLE_DELETE', i(897)],
        ['GUILD_ROLE_UPDATE', i(7638)],
        ['GUILD_SCHEDULED_EVENT_CREATE', i(3258)],
        ['GUILD_SCHEDULED_EVENT_DELETE', i(5480)],
        ['GUILD_SCHEDULED_EVENT_UPDATE', i(7169)],
        ['GUILD_SCHEDULED_EVENT_USER_ADD', i(3068)],
        ['GUILD_SCHEDULED_EVENT_USER_REMOVE', i(6261)],
        ['GUILD_STICKERS_UPDATE', i(8262)],
        ['GUILD_UPDATE', i(8531)],
        ['INTERACTION_CREATE', i(1714)],
        ['INVITE_CREATE', i(9898)],
        ['INVITE_DELETE', i(5512)],
        ['MESSAGE_CREATE', i(7799)],
        ['MESSAGE_DELETE', i(1689)],
        ['MESSAGE_DELETE_BULK', i(416)],
        ['MESSAGE_REACTION_ADD', i(8479)],
        ['MESSAGE_REACTION_REMOVE', i(2961)],
        ['MESSAGE_REACTION_REMOVE_ALL', i(3851)],
        ['MESSAGE_REACTION_REMOVE_EMOJI', i(3868)],
        ['MESSAGE_UPDATE', i(9351)],
        ['PRESENCE_UPDATE', i(3710)],
        ['READY', i(636)],
        ['RESUMED', i(7451)],
        ['STAGE_INSTANCE_CREATE', i(1999)],
        ['STAGE_INSTANCE_DELETE', i(1133)],
        ['STAGE_INSTANCE_UPDATE', i(5415)],
        ['THREAD_CREATE', i(375)],
        ['THREAD_DELETE', i(3574)],
        ['THREAD_LIST_SYNC', i(4086)],
        ['THREAD_MEMBERS_UPDATE', i(4240)],
        ['THREAD_MEMBER_UPDATE', i(4170)],
        ['THREAD_UPDATE', i(8802)],
        ['TYPING_START', i(5454)],
        ['USER_UPDATE', i(3298)],
        ['VOICE_SERVER_UPDATE', i(1259)],
        ['VOICE_STATE_UPDATE', i(2609)],
        ['WEBHOOKS_UPDATE', i(4416)],
      ])
      e.exports = s
    },
    4084: (e, t, i) => {
      'use strict'
      const s = i(2473)
      const n = i(1490)
      function makeDiscordjsError(e) {
        return class DiscordjsError extends e {
          constructor(e, ...t) {
            super(message(e, t))
            this.code = e
            Error.captureStackTrace?.(this, DiscordjsError)
          }
          get name() {
            return `${super.name} [${this.code}]`
          }
        }
      }
      function message(e, t) {
        if (!(e in s))
          throw new Error('Error code must be a valid DiscordjsErrorCodes')
        const i = n[e]
        if (!i) throw new Error(`No message associated with error code: ${e}.`)
        if (typeof i === 'function') return i(...t)
        if (!t?.length) return i
        t.unshift(i)
        return String(...t)
      }
      e.exports = {
        DiscordjsError: makeDiscordjsError(Error),
        DiscordjsTypeError: makeDiscordjsError(TypeError),
        DiscordjsRangeError: makeDiscordjsError(RangeError),
      }
    },
    2473: (e) => {
      'use strict'
      const t = [
        'ClientInvalidOption',
        'ClientInvalidProvidedShards',
        'ClientMissingIntents',
        'ClientNotReady',
        'TokenInvalid',
        'TokenMissing',
        'ApplicationCommandPermissionsTokenMissing',
        'WSCloseRequested',
        'WSConnectionExists',
        'WSNotOpen',
        'ManagerDestroyed',
        'BitFieldInvalid',
        'ShardingInvalid',
        'ShardingRequired',
        'InvalidIntents',
        'DisallowedIntents',
        'ShardingNoShards',
        'ShardingInProcess',
        'ShardingInvalidEvalBroadcast',
        'ShardingShardNotFound',
        'ShardingAlreadySpawned',
        'ShardingProcessExists',
        'ShardingWorkerExists',
        'ShardingReadyTimeout',
        'ShardingReadyDisconnected',
        'ShardingReadyDied',
        'ShardingNoChildExists',
        'ShardingShardMiscalculation',
        'ColorRange',
        'ColorConvert',
        'InviteOptionsMissingChannel',
        'ButtonLabel',
        'ButtonURL',
        'ButtonCustomId',
        'SelectMenuCustomId',
        'SelectMenuPlaceholder',
        'SelectOptionLabel',
        'SelectOptionValue',
        'SelectOptionDescription',
        'InteractionCollectorError',
        'FileNotFound',
        'UserBannerNotFetched',
        'UserNoDMChannel',
        'VoiceNotStageChannel',
        'VoiceStateNotOwn',
        'VoiceStateInvalidType',
        'ReqResourceType',
        'ImageFormat',
        'ImageSize',
        'MessageBulkDeleteType',
        'MessageNonceType',
        'MessageContentType',
        'SplitMaxLen',
        'BanResolveId',
        'FetchBanResolveId',
        'PruneDaysType',
        'GuildChannelResolve',
        'GuildVoiceChannelResolve',
        'GuildChannelOrphan',
        'GuildChannelUnowned',
        'GuildOwned',
        'GuildMembersTimeout',
        'GuildUncachedMe',
        'ChannelNotCached',
        'StageChannelResolve',
        'GuildScheduledEventResolve',
        'FetchOwnerId',
        'InvalidType',
        'InvalidElement',
        'MessageThreadParent',
        'MessageExistingThread',
        'ThreadInvitableType',
        'WebhookMessage',
        'WebhookTokenUnavailable',
        'WebhookURLInvalid',
        'WebhookApplication',
        'MessageReferenceMissing',
        'EmojiType',
        'EmojiManaged',
        'MissingManageEmojisAndStickersPermission',
        'NotGuildSticker',
        'ReactionResolveUser',
        'VanityURL',
        'InviteResolveCode',
        'InviteNotFound',
        'DeleteGroupDMChannel',
        'FetchGroupDMChannel',
        'MemberFetchNonceLength',
        'GlobalCommandPermissions',
        'GuildUncachedEntityResolve',
        'InteractionAlreadyReplied',
        'InteractionNotReplied',
        'InteractionEphemeralReplied',
        'CommandInteractionOptionNotFound',
        'CommandInteractionOptionType',
        'CommandInteractionOptionEmpty',
        'CommandInteractionOptionNoSubcommand',
        'CommandInteractionOptionNoSubcommandGroup',
        'AutocompleteInteractionOptionNoFocusedOption',
        'ModalSubmitInteractionFieldNotFound',
        'ModalSubmitInteractionFieldType',
        'InvalidMissingScopes',
        'NotImplemented',
        'SweepFilterReturn',
        'GuildForumMessageRequired',
      ]
      e.exports = Object.fromEntries(t.map((e) => [e, e]))
    },
    1490: (e, t, i) => {
      'use strict'
      const s = i(2473)
      const n = {
        [s.ClientInvalidOption]: (e, t) => `The ${e} option must be ${t}`,
        [s.ClientInvalidProvidedShards]:
          'None of the provided shards were valid.',
        [s.ClientMissingIntents]:
          'Valid intents must be provided for the Client.',
        [s.ClientNotReady]: (e) => `The client needs to be logged in to ${e}.`,
        [s.TokenInvalid]: 'An invalid token was provided.',
        [s.TokenMissing]:
          'Request to use token, but token was unavailable to the client.',
        [s.ApplicationCommandPermissionsTokenMissing]:
          'Editing application command permissions requires an OAuth2 bearer token, but none was provided.',
        [s.WSCloseRequested]: 'WebSocket closed due to user request.',
        [s.WSConnectionExists]:
          'There is already an existing WebSocket connection.',
        [s.WSNotOpen]: (e = 'data') => `WebSocket not open to send ${e}`,
        [s.ManagerDestroyed]: 'Manager was destroyed.',
        [s.BitFieldInvalid]: (e) => `Invalid bitfield flag or number: ${e}.`,
        [s.ShardingInvalid]: 'Invalid shard settings were provided.',
        [s.ShardingRequired]:
          'This session would have handled too many guilds - Sharding is required.',
        [s.InvalidIntents]: 'Invalid intent provided for WebSocket intents.',
        [s.DisallowedIntents]:
          'Privileged intent provided is not enabled or whitelisted.',
        [s.ShardingNoShards]: 'No shards have been spawned.',
        [s.ShardingInProcess]: 'Shards are still being spawned.',
        [s.ShardingInvalidEvalBroadcast]:
          'Script to evaluate must be a function',
        [s.ShardingShardNotFound]: (e) => `Shard ${e} could not be found.`,
        [s.ShardingAlreadySpawned]: (e) => `Already spawned ${e} shards.`,
        [s.ShardingProcessExists]: (e) =>
          `Shard ${e} already has an active process.`,
        [s.ShardingWorkerExists]: (e) =>
          `Shard ${e} already has an active worker.`,
        [s.ShardingReadyTimeout]: (e) =>
          `Shard ${e}'s Client took too long to become ready.`,
        [s.ShardingReadyDisconnected]: (e) =>
          `Shard ${e}'s Client disconnected before becoming ready.`,
        [s.ShardingReadyDied]: (e) =>
          `Shard ${e}'s process exited before its Client became ready.`,
        [s.ShardingNoChildExists]: (e) =>
          `Shard ${e} has no active process or worker.`,
        [s.ShardingShardMiscalculation]: (e, t, i) =>
          `Calculated invalid shard ${e} for guild ${t} with ${i} shards.`,
        [s.ColorRange]:
          'Color must be within the range 0 - 16777215 (0xFFFFFF).',
        [s.ColorConvert]: 'Unable to convert color to a number.',
        [s.InviteOptionsMissingChannel]:
          'A valid guild channel must be provided when GuildScheduledEvent is EXTERNAL.',
        [s.ButtonLabel]: 'MessageButton label must be a string',
        [s.ButtonURL]: 'MessageButton URL must be a string',
        [s.ButtonCustomId]: 'MessageButton customId must be a string',
        [s.SelectMenuCustomId]: 'MessageSelectMenu customId must be a string',
        [s.SelectMenuPlaceholder]:
          'MessageSelectMenu placeholder must be a string',
        [s.SelectOptionLabel]: 'MessageSelectOption label must be a string',
        [s.SelectOptionValue]: 'MessageSelectOption value must be a string',
        [s.SelectOptionDescription]:
          'MessageSelectOption description must be a string',
        [s.InteractionCollectorError]: (e) =>
          `Collector received no interactions before ending with reason: ${e}`,
        [s.FileNotFound]: (e) => `File could not be found: ${e}`,
        [s.UserBannerNotFetched]:
          "You must fetch this user's banner before trying to generate its URL!",
        [s.UserNoDMChannel]: 'No DM Channel exists!',
        [s.VoiceNotStageChannel]:
          'You are only allowed to do this in stage channels.',
        [s.VoiceStateNotOwn]:
          'You cannot self-deafen/mute/request to speak on VoiceStates that do not belong to the ClientUser.',
        [s.VoiceStateInvalidType]: (e) => `${e} must be a boolean.`,
        [s.ReqResourceType]:
          'The resource must be a string, Buffer or a valid file stream.',
        [s.ImageFormat]: (e) => `Invalid image format: ${e}`,
        [s.ImageSize]: (e) => `Invalid image size: ${e}`,
        [s.MessageBulkDeleteType]:
          'The messages must be an Array, Collection, or number.',
        [s.MessageNonceType]: 'Message nonce must be an integer or a string.',
        [s.MessageContentType]: 'Message content must be a string.',
        [s.SplitMaxLen]:
          'Chunk exceeds the max length and contains no split characters.',
        [s.BanResolveId]: (e = false) =>
          `Couldn't resolve the user id to ${e ? 'ban' : 'unban'}.`,
        [s.FetchBanResolveId]: "Couldn't resolve the user id to fetch the ban.",
        [s.PruneDaysType]: 'Days must be a number',
        [s.GuildChannelResolve]:
          'Could not resolve channel to a guild channel.',
        [s.GuildVoiceChannelResolve]:
          'Could not resolve channel to a guild voice channel.',
        [s.GuildChannelOrphan]:
          'Could not find a parent to this guild channel.',
        [s.GuildChannelUnowned]:
          "The fetched channel does not belong to this manager's guild.",
        [s.GuildOwned]: 'Guild is owned by the client.',
        [s.GuildMembersTimeout]: "Members didn't arrive in time.",
        [s.GuildUncachedMe]:
          'The client user as a member of this guild is uncached.',
        [s.ChannelNotCached]:
          'Could not find the channel where this message came from in the cache!',
        [s.StageChannelResolve]:
          'Could not resolve channel to a stage channel.',
        [s.GuildScheduledEventResolve]:
          'Could not resolve the guild scheduled event.',
        [s.FetchOwnerId]:
          "Couldn't resolve the guild ownerId to fetch the member.",
        [s.InvalidType]: (e, t, i = false) =>
          `Supplied ${e} is not a${i ? 'n' : ''} ${t}.`,
        [s.InvalidElement]: (e, t, i) =>
          `Supplied ${e} ${t} includes an invalid element: ${i}`,
        [s.MessageThreadParent]:
          'The message was not sent in a guild text or news channel',
        [s.MessageExistingThread]: 'The message already has a thread',
        [s.ThreadInvitableType]: (e) => `Invitable cannot be edited on ${e}`,
        [s.WebhookMessage]: 'The message was not sent by a webhook.',
        [s.WebhookTokenUnavailable]:
          'This action requires a webhook token, but none is available.',
        [s.WebhookURLInvalid]: 'The provided webhook URL is not valid.',
        [s.WebhookApplication]:
          'This message webhook belongs to an application and cannot be fetched.',
        [s.MessageReferenceMissing]:
          'The message does not reference another message',
        [s.EmojiType]: 'Emoji must be a string or GuildEmoji/ReactionEmoji',
        [s.EmojiManaged]: 'Emoji is managed and has no Author.',
        [s.MissingManageEmojisAndStickersPermission]: (e) =>
          `Client must have Manage Emojis and Stickers permission in guild ${e} to see emoji authors.`,
        [s.NotGuildSticker]:
          'Sticker is a standard (non-guild) sticker and has no author.',
        [s.ReactionResolveUser]:
          "Couldn't resolve the user id to remove from the reaction.",
        [s.VanityURL]:
          'This guild does not have the vanity URL feature enabled.',
        [s.InviteResolveCode]:
          'Could not resolve the code to fetch the invite.',
        [s.InviteNotFound]: 'Could not find the requested invite.',
        [s.DeleteGroupDMChannel]:
          "Bots don't have access to Group DM Channels and cannot delete them",
        [s.FetchGroupDMChannel]:
          "Bots don't have access to Group DM Channels and cannot fetch them",
        [s.MemberFetchNonceLength]:
          'Nonce length must not exceed 32 characters.',
        [s.GlobalCommandPermissions]:
          'Permissions for global commands may only be fetched or modified by providing a GuildResolvable ' +
          "or from a guild's application command manager.",
        [s.GuildUncachedEntityResolve]: (e) =>
          `Cannot resolve ${e} from an arbitrary guild, provide an id instead`,
        [s.InteractionAlreadyReplied]:
          'The reply to this interaction has already been sent or deferred.',
        [s.InteractionNotReplied]:
          'The reply to this interaction has not been sent or deferred.',
        [s.InteractionEphemeralReplied]:
          'Ephemeral responses cannot be deleted.',
        [s.CommandInteractionOptionNotFound]: (e) =>
          `Required option "${e}" not found.`,
        [s.CommandInteractionOptionType]: (e, t, i) =>
          `Option "${e}" is of type: ${t}; expected ${i}.`,
        [s.CommandInteractionOptionEmpty]: (e, t) =>
          `Required option "${e}" is of type: ${t}; expected a non-empty value.`,
        [s.CommandInteractionOptionNoSubcommand]:
          'No subcommand specified for interaction.',
        [s.CommandInteractionOptionNoSubcommandGroup]:
          'No subcommand group specified for interaction.',
        [s.AutocompleteInteractionOptionNoFocusedOption]:
          'No focused option for autocomplete interaction.',
        [s.ModalSubmitInteractionFieldNotFound]: (e) =>
          `Required field with custom id "${e}" not found.`,
        [s.ModalSubmitInteractionFieldType]: (e, t, i) =>
          `Field with custom id "${e}" is of type: ${t}; expected ${i}.`,
        [s.InvalidMissingScopes]:
          'At least one valid scope must be provided for the invite',
        [s.NotImplemented]: (e, t) => `Method ${e} not implemented on ${t}.`,
        [s.SweepFilterReturn]:
          'The return value of the sweepFilter function was not false or a Function',
        [s.GuildForumMessageRequired]:
          'You must provide a message to create a guild forum thread',
      }
      e.exports = n
    },
    8951: (e, t, i) => {
      'use strict'
      e.exports = i(4084)
      e.exports.ErrorCodes = i(2473)
      e.exports.Messages = i(1490)
    },
    4805: (e, t, i) => {
      'use strict'
      const { __exportStar: s } = i(9386)
      t.BaseClient = i(9299)
      t.Client = i(8795)
      t.Shard = i(8680)
      t.ShardClientUtil = i(7732)
      t.ShardingManager = i(8004)
      t.WebhookClient = i(3661)
      t.DiscordjsError = i(4084).DiscordjsError
      t.DiscordjsTypeError = i(4084).DiscordjsTypeError
      t.DiscordjsRangeError = i(4084).DiscordjsRangeError
      t.DiscordjsErrorCodes = i(2473)
      t.ActivityFlagsBitField = i(7558)
      t.ApplicationFlagsBitField = i(2152)
      t.BaseManager = i(4719)
      t.BitField = i(6492)
      t.ChannelFlagsBitField = i(4874)
      t.Collection = i(2676).Collection
      t.Constants = i(6047)
      t.Colors = i(562)
      t.DataResolver = i(3989)
      t.Events = i(457)
      t.Formatters = i(6448)
      t.IntentsBitField = i(4776)
      t.LimitedCollection = i(3329)
      t.MessageFlagsBitField = i(7323)
      t.Options = i(2199)
      t.Partials = i(527)
      t.PermissionsBitField = i(9238)
      t.ShardEvents = i(4053)
      t.Status = i(6619)
      t.SnowflakeUtil = i(8673).DiscordSnowflake
      t.Sweepers = i(9850)
      t.SystemChannelFlagsBitField = i(3502)
      t.ThreadMemberFlagsBitField = i(7892)
      t.UserFlagsBitField = i(2377)
      s(i(7966), t)
      t.WebSocketShardEvents = i(5579)
      t.version = i(6939).version
      t.ApplicationCommandManager = i(8050)
      t.ApplicationCommandPermissionsManager = i(7121)
      t.AutoModerationRuleManager = i(6658)
      t.BaseGuildEmojiManager = i(4123)
      t.CachedManager = i(1666)
      t.ChannelManager = i(6088)
      t.ClientVoiceManager = i(9133)
      t.DataManager = i(2889)
      t.GuildApplicationCommandManager = i(8533)
      t.GuildBanManager = i(3939)
      t.GuildChannelManager = i(3946)
      t.GuildEmojiManager = i(8693)
      t.GuildEmojiRoleManager = i(554)
      t.GuildForumThreadManager = i(3766)
      t.GuildInviteManager = i(1294)
      t.GuildManager = i(2706)
      t.GuildMemberManager = i(6324)
      t.GuildMemberRoleManager = i(7444)
      t.GuildScheduledEventManager = i(5082)
      t.GuildStickerManager = i(4215)
      t.GuildTextThreadManager = i(2808)
      t.MessageManager = i(9903)
      t.PermissionOverwriteManager = i(7941)
      t.PresenceManager = i(5710)
      t.ReactionManager = i(7500)
      t.ReactionUserManager = i(7041)
      t.RoleManager = i(4213)
      t.StageInstanceManager = i(3105)
      t.ThreadManager = i(3918)
      t.ThreadMemberManager = i(3038)
      t.UserManager = i(6657)
      t.VoiceStateManager = i(5679)
      t.WebSocketManager = i(2626)
      t.WebSocketShard = i(3800)
      t.ActionRow = i(121)
      t.ActionRowBuilder = i(112)
      t.Activity = i(4253).Activity
      t.AnonymousGuild = i(7888)
      t.Application = i(174)
      t.ApplicationCommand = i(6130)
      t.AutocompleteInteraction = i(5767)
      t.AutoModerationActionExecution = i(7333)
      t.AutoModerationRule = i(9974)
      t.Base = i(4936)
      t.BaseGuild = i(6918)
      t.BaseGuildEmoji = i(8708)
      t.BaseGuildTextChannel = i(8967)
      t.BaseGuildVoiceChannel = i(9417)
      t.ButtonBuilder = i(6925)
      t.ButtonComponent = i(3700)
      t.ButtonInteraction = i(5282)
      t.CategoryChannel = i(1451)
      t.BaseChannel = i(6948).BaseChannel
      t.ChatInputCommandInteraction = i(5737)
      t.ClientApplication = i(7538)
      t.ClientPresence = i(7057)
      t.ClientUser = i(2355)
      t.CommandInteraction = i(7155)
      t.Collector = i(9984)
      t.CommandInteractionOptionResolver = i(792)
      t.Component = i(1688)
      t.ContextMenuCommandInteraction = i(47)
      t.DMChannel = i(460)
      t.Embed = i(1458)
      t.EmbedBuilder = i(9237)
      t.Emoji = i(1168).Emoji
      t.ForumChannel = i(5023)
      t.Guild = i(4445).Guild
      t.GuildAuditLogs = i(8630)
      t.GuildAuditLogsEntry = i(6554)
      t.GuildBan = i(3694)
      t.GuildChannel = i(3883)
      t.GuildEmoji = i(3130)
      t.GuildMember = i(5780).GuildMember
      t.GuildPreview = i(210)
      t.GuildPreviewEmoji = i(3570)
      t.GuildScheduledEvent = i(6122).GuildScheduledEvent
      t.GuildTemplate = i(6378)
      t.Integration = i(208)
      t.IntegrationApplication = i(5606)
      t.BaseInteraction = i(1879)
      t.InteractionCollector = i(4463)
      t.InteractionResponse = i(5281)
      t.InteractionWebhook = i(3445)
      t.Invite = i(3493)
      t.InviteStageInstance = i(4079)
      t.InviteGuild = i(8061)
      t.Message = i(6774).Message
      t.Attachment = i(8855)
      t.AttachmentBuilder = i(8114)
      t.ModalBuilder = i(6756)
      t.MessageCollector = i(5506)
      t.MessageComponentInteraction = i(8341)
      t.MessageContextMenuCommandInteraction = i(167)
      t.MessageMentions = i(1291)
      t.MessagePayload = i(9822)
      t.MessageReaction = i(5477)
      t.ModalSubmitInteraction = i(9461)
      t.ModalSubmitFields = i(7837)
      t.NewsChannel = i(2793)
      t.OAuth2Guild = i(4736)
      t.PartialGroupDMChannel = i(2562)
      t.PermissionOverwrites = i(1812)
      t.Presence = i(4253).Presence
      t.ReactionCollector = i(5883)
      t.ReactionEmoji = i(116)
      t.RichPresenceAssets = i(4253).RichPresenceAssets
      t.Role = i(8033).Role
      t.SelectMenuBuilder = i(6241)
      t.ChannelSelectMenuBuilder = i(881)
      t.MentionableSelectMenuBuilder = i(4895)
      t.RoleSelectMenuBuilder = i(5564)
      t.StringSelectMenuBuilder = i(2392)
      t.UserSelectMenuBuilder = i(1527)
      t.BaseSelectMenuComponent = i(6386)
      t.SelectMenuComponent = i(5924)
      t.ChannelSelectMenuComponent = i(1749)
      t.MentionableSelectMenuComponent = i(1574)
      t.RoleSelectMenuComponent = i(5744)
      t.StringSelectMenuComponent = i(2784)
      t.UserSelectMenuComponent = i(7185)
      t.SelectMenuInteraction = i(9063)
      t.ChannelSelectMenuInteraction = i(2731)
      t.MentionableSelectMenuInteraction = i(3754)
      t.MentionableSelectMenuInteraction = i(3754)
      t.RoleSelectMenuInteraction = i(4961)
      t.StringSelectMenuInteraction = i(4433)
      t.UserSelectMenuInteraction = i(1174)
      t.SelectMenuOptionBuilder = i(9683)
      t.StringSelectMenuOptionBuilder = i(7355)
      t.StageChannel = i(8096)
      t.StageInstance = i(4233).StageInstance
      t.Sticker = i(2736).Sticker
      t.StickerPack = i(4864)
      t.Team = i(2683)
      t.TeamMember = i(3192)
      t.TextChannel = i(7541)
      t.TextInputBuilder = i(6342)
      t.TextInputComponent = i(4597)
      t.ThreadChannel = i(7522)
      t.ThreadMember = i(9950)
      t.Typing = i(7175)
      t.User = i(8569)
      t.UserContextMenuCommandInteraction = i(2902)
      t.VoiceChannel = i(4899)
      t.VoiceRegion = i(3179)
      t.VoiceState = i(5036)
      t.Webhook = i(3630)
      t.Widget = i(6477)
      t.WidgetMember = i(2943)
      t.WelcomeChannel = i(1721)
      t.WelcomeScreen = i(7710)
      t.WebSocket = i(9245)
      s(i(2), t)
      s(i(2547), t)
      s(i(1372), t)
      s(i(9575), t)
    },
    8050: (e, t, i) => {
      'use strict'
      const { isJSONEncodable: s } = i(2547)
      const { Collection: n } = i(2676)
      const { makeURLSearchParams: r } = i(1372)
      const { Routes: a } = i(2)
      const o = i(7121)
      const l = i(1666)
      const { DiscordjsTypeError: c, ErrorCodes: d } = i(8951)
      const u = i(6130)
      const h = i(9238)
      class ApplicationCommandManager extends l {
        constructor(e, t) {
          super(e, u, t)
          this.permissions = new o(this)
        }
        _add(e, t, i) {
          return super._add(e, t, { extras: [this.guild, i] })
        }
        commandPath({ id: e, guildId: t } = {}) {
          if (this.guild ?? t) {
            if (e) {
              return a.applicationGuildCommand(
                this.client.application.id,
                this.guild?.id ?? t,
                e
              )
            }
            return a.applicationGuildCommands(
              this.client.application.id,
              this.guild?.id ?? t
            )
          }
          if (e) {
            return a.applicationCommand(this.client.application.id, e)
          }
          return a.applicationCommands(this.client.application.id)
        }
        async fetch(
          e,
          {
            guildId: t,
            cache: i = true,
            force: s = false,
            locale: a,
            withLocalizations: o,
          } = {}
        ) {
          if (typeof e === 'object') {
            ;({
              guildId: t,
              cache: i = true,
              locale: a,
              withLocalizations: o,
            } = e)
          } else if (e) {
            if (!s) {
              const t = this.cache.get(e)
              if (t) return t
            }
            const n = await this.client.rest.get(
              this.commandPath({ id: e, guildId: t })
            )
            return this._add(n, i)
          }
          const l = await this.client.rest.get(
            this.commandPath({ guildId: t }),
            {
              headers: { 'X-Discord-Locale': a },
              query: r({ with_localizations: o }),
            }
          )
          return l.reduce((e, s) => e.set(s.id, this._add(s, i, t)), new n())
        }
        async create(e, t) {
          const i = await this.client.rest.post(
            this.commandPath({ guildId: t }),
            { body: this.constructor.transformCommand(e) }
          )
          return this._add(i, true, t)
        }
        async set(e, t) {
          const i = await this.client.rest.put(
            this.commandPath({ guildId: t }),
            { body: e.map((e) => this.constructor.transformCommand(e)) }
          )
          return i.reduce((e, i) => e.set(i.id, this._add(i, true, t)), new n())
        }
        async edit(e, t, i) {
          const s = this.resolveId(e)
          if (!s)
            throw new c(
              d.InvalidType,
              'command',
              'ApplicationCommandResolvable'
            )
          const n = await this.client.rest.patch(
            this.commandPath({ id: s, guildId: i }),
            { body: this.constructor.transformCommand(t) }
          )
          return this._add(n, true, i)
        }
        async delete(e, t) {
          const i = this.resolveId(e)
          if (!i)
            throw new c(
              d.InvalidType,
              'command',
              'ApplicationCommandResolvable'
            )
          await this.client.rest.delete(this.commandPath({ id: i, guildId: t }))
          const s = this.cache.get(i)
          this.cache.delete(i)
          return s ?? null
        }
        static transformCommand(e) {
          if (s(e)) return e.toJSON()
          let t
          if ('default_member_permissions' in e) {
            t = e.default_member_permissions
              ? new h(BigInt(e.default_member_permissions)).bitfield.toString()
              : e.default_member_permissions
          }
          if ('defaultMemberPermissions' in e) {
            t =
              e.defaultMemberPermissions !== null
                ? new h(e.defaultMemberPermissions).bitfield.toString()
                : e.defaultMemberPermissions
          }
          return {
            name: e.name,
            name_localizations: e.nameLocalizations ?? e.name_localizations,
            description: e.description,
            description_localizations:
              e.descriptionLocalizations ?? e.description_localizations,
            type: e.type,
            options: e.options?.map((e) => u.transformOption(e)),
            default_member_permissions: t,
            dm_permission: e.dmPermission ?? e.dm_permission,
          }
        }
      }
      e.exports = ApplicationCommandManager
    },
    7121: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const {
        ApplicationCommandPermissionType: n,
        RESTJSONErrorCodes: r,
        Routes: a,
      } = i(2)
      const o = i(4719)
      const {
        DiscordjsError: l,
        DiscordjsTypeError: c,
        ErrorCodes: d,
      } = i(8951)
      class ApplicationCommandPermissionsManager extends o {
        constructor(e) {
          super(e.client)
          this.manager = e
          this.guild = e.guild ?? null
          this.guildId = e.guildId ?? e.guild?.id ?? null
          this.commandId = e.id ?? null
        }
        permissionsPath(e, t) {
          if (t) {
            return a.applicationCommandPermissions(
              this.client.application.id,
              e,
              t
            )
          }
          return a.guildApplicationCommandsPermissions(
            this.client.application.id,
            e
          )
        }
        async fetch({ guild: e, command: t } = {}) {
          const { guildId: i, commandId: n } = this._validateOptions(e, t)
          if (n) {
            const e = await this.client.rest.get(this.permissionsPath(i, n))
            return e.permissions
          }
          const r = await this.client.rest.get(this.permissionsPath(i))
          return r.reduce((e, t) => e.set(t.id, t.permissions), new s())
        }
        async set({ guild: e, command: t, permissions: i, token: s } = {}) {
          if (!s) {
            throw new l(d.ApplicationCommandPermissionsTokenMissing)
          }
          let { guildId: n, commandId: r } = this._validateOptions(e, t)
          if (!Array.isArray(i)) {
            throw new c(
              d.InvalidType,
              'permissions',
              'Array of ApplicationCommandPermissions',
              true
            )
          }
          if (!r) {
            r = this.client.user.id
          }
          const a = await this.client.rest.put(this.permissionsPath(n, r), {
            body: { permissions: i },
            auth: false,
            headers: { Authorization: `Bearer ${s}` },
          })
          return a.permissions
        }
        async add({ guild: e, command: t, permissions: i, token: s } = {}) {
          if (!s) {
            throw new l(d.ApplicationCommandPermissionsTokenMissing)
          }
          let { guildId: n, commandId: a } = this._validateOptions(e, t)
          if (!a) {
            a = this.client.user.id
          }
          if (!Array.isArray(i)) {
            throw new c(
              d.InvalidType,
              'permissions',
              'Array of ApplicationCommandPermissions',
              true
            )
          }
          let o = []
          try {
            o = await this.fetch({ guild: n, command: a })
          } catch (e) {
            if (e.code !== r.UnknownApplicationCommandPermissions) throw e
          }
          const u = i.slice()
          for (const e of o) {
            if (!u.some((t) => t.id === e.id)) {
              u.push(e)
            }
          }
          return this.set({ guild: n, command: a, permissions: u, token: s })
        }
        async remove({
          guild: e,
          command: t,
          users: i,
          roles: s,
          channels: a,
          token: o,
        } = {}) {
          if (!o) {
            throw new l(d.ApplicationCommandPermissionsTokenMissing)
          }
          let { guildId: u, commandId: h } = this._validateOptions(e, t)
          if (!h) {
            h = this.client.user.id
          }
          if (!i && !s && !a) {
            throw new c(
              d.InvalidType,
              'users OR roles OR channels',
              'Array or Resolvable',
              true
            )
          }
          let m = []
          if (Array.isArray(i)) {
            for (const e of i) {
              const t = this.client.users.resolveId(e)
              if (!t) throw new c(d.InvalidElement, 'Array', 'users', e)
              m.push(t)
            }
          }
          let p = []
          if (Array.isArray(s)) {
            for (const e of s) {
              if (typeof e === 'string') {
                p.push(e)
                continue
              }
              if (!this.guild)
                throw new l(d.GuildUncachedEntityResolve, 'roles')
              const t = this.guild.roles.resolveId(e)
              if (!t) throw new c(d.InvalidElement, 'Array', 'users', e)
              p.push(t)
            }
          }
          let f = []
          if (Array.isArray(a)) {
            for (const e of a) {
              if (typeof e === 'string') {
                f.push(e)
                continue
              }
              if (!this.guild)
                throw new l(d.GuildUncachedEntityResolve, 'channels')
              const t = this.guild.channels.resolveId(e)
              if (!t) throw new c(d.InvalidElement, 'Array', 'channels', e)
              f.push(t)
            }
          }
          let g = []
          try {
            g = await this.fetch({ guild: u, command: h })
          } catch (e) {
            if (e.code !== r.UnknownApplicationCommandPermissions) throw e
          }
          const v = g.filter((e) => {
            switch (e.type) {
              case n.Role:
                return !p.includes(e.id)
              case n.User:
                return !m.includes(e.id)
              case n.Channel:
                return !f.includes(e.id)
            }
            return true
          })
          return this.set({ guild: u, command: h, permissions: v, token: o })
        }
        async has({
          guild: e,
          command: t,
          permissionId: i,
          permissionType: s,
        }) {
          const { guildId: n, commandId: a } = this._validateOptions(e, t)
          if (!a)
            throw new c(
              d.InvalidType,
              'command',
              'ApplicationCommandResolvable'
            )
          if (!i) {
            throw new c(
              d.InvalidType,
              'permissionId',
              'UserResolvable, RoleResolvable, ChannelResolvable, or Permission Constant'
            )
          }
          let o = i
          if (typeof i !== 'string') {
            o = this.client.users.resolveId(i)
            if (!o) {
              if (!this.guild)
                throw new l(d.GuildUncachedEntityResolve, 'roles')
              o = this.guild.roles.resolveId(i)
            }
            if (!o) {
              o = this.guild.channels.resolveId(i)
            }
            if (!o) {
              throw new c(
                d.InvalidType,
                'permissionId',
                'UserResolvable, RoleResolvable, ChannelResolvable, or Permission Constant'
              )
            }
          }
          let u = []
          try {
            u = await this.fetch({ guild: n, command: a })
          } catch (e) {
            if (e.code !== r.UnknownApplicationCommandPermissions) throw e
          }
          return u.some((e) => e.id === o && (s ?? e.type) === e.type)
        }
        _validateOptions(e, t) {
          const i = this.guildId ?? this.client.guilds.resolveId(e)
          if (!i) throw new l(d.GlobalCommandPermissions)
          let s = this.commandId
          if (t && !s) {
            s = this.manager.resolveId?.(t)
            if (!s && this.guild) {
              s = this.guild.commands.resolveId(t)
            }
            s ??= this.client.application?.commands.resolveId(t)
            if (!s) {
              throw new c(
                d.InvalidType,
                'command',
                'ApplicationCommandResolvable',
                true
              )
            }
          }
          return { guildId: i, commandId: s }
        }
      }
      e.exports = ApplicationCommandPermissionsManager
    },
    6658: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { Routes: n } = i(2)
      const r = i(1666)
      const a = i(9974)
      class AutoModerationRuleManager extends r {
        constructor(e, t) {
          super(e.client, a, t)
          this.guild = e
        }
        _add(e, t) {
          return super._add(e, t, { extras: [this.guild] })
        }
        async create({
          name: e,
          eventType: t,
          triggerType: i,
          triggerMetadata: s,
          actions: r,
          enabled: a,
          exemptRoles: o,
          exemptChannels: l,
          reason: c,
        }) {
          const d = await this.client.rest.post(
            n.guildAutoModerationRules(this.guild.id),
            {
              body: {
                name: e,
                event_type: t,
                trigger_type: i,
                trigger_metadata: s && {
                  keyword_filter: s.keywordFilter,
                  regex_patterns: s.regexPatterns,
                  presets: s.presets,
                  allow_list: s.allowList,
                  mention_total_limit: s.mentionTotalLimit,
                },
                actions: r.map((e) => ({
                  type: e.type,
                  metadata: {
                    duration_seconds: e.metadata?.durationSeconds,
                    channel_id:
                      e.metadata?.channel &&
                      this.guild.channels.resolveId(e.metadata.channel),
                  },
                })),
                enabled: a,
                exempt_roles: o?.map((e) => this.guild.roles.resolveId(e)),
                exempt_channels: l?.map((e) =>
                  this.guild.channels.resolveId(e)
                ),
              },
              reason: c,
            }
          )
          return this._add(d)
        }
        async edit(
          e,
          {
            name: t,
            eventType: i,
            triggerMetadata: s,
            actions: r,
            enabled: a,
            exemptRoles: o,
            exemptChannels: l,
            reason: c,
          }
        ) {
          const d = this.resolveId(e)
          const u = await this.client.rest.patch(
            n.guildAutoModerationRule(this.guild.id, d),
            {
              body: {
                name: t,
                event_type: i,
                trigger_metadata: s && {
                  keyword_filter: s.keywordFilter,
                  regex_patterns: s.regexPatterns,
                  presets: s.presets,
                  allow_list: s.allowList,
                  mention_total_limit: s.mentionTotalLimit,
                },
                actions: r?.map((e) => ({
                  type: e.type,
                  metadata: {
                    duration_seconds: e.metadata?.durationSeconds,
                    channel_id:
                      e.metadata?.channel &&
                      this.guild.channels.resolveId(e.metadata.channel),
                  },
                })),
                enabled: a,
                exempt_roles: o?.map((e) => this.guild.roles.resolveId(e)),
                exempt_channels: l?.map((e) =>
                  this.guild.channels.resolveId(e)
                ),
              },
              reason: c,
            }
          )
          return this._add(u)
        }
        fetch(e) {
          if (!e) return this._fetchMany()
          const { autoModerationRule: t, cache: i, force: s } = e
          const n = this.resolveId(t ?? e)
          if (n) {
            return this._fetchSingle({
              autoModerationRule: n,
              cache: i,
              force: s,
            })
          }
          return this._fetchMany(e)
        }
        async _fetchSingle({
          autoModerationRule: e,
          cache: t,
          force: i = false,
        }) {
          if (!i) {
            const t = this.cache.get(e)
            if (t) return t
          }
          const s = await this.client.rest.get(
            n.guildAutoModerationRule(this.guild.id, e)
          )
          return this._add(s, t)
        }
        async _fetchMany(e = {}) {
          const t = await this.client.rest.get(
            n.guildAutoModerationRules(this.guild.id)
          )
          return t.reduce((t, i) => t.set(i.id, this._add(i, e.cache)), new s())
        }
        async delete(e, t) {
          const i = this.resolveId(e)
          await this.client.rest.delete(
            n.guildAutoModerationRule(this.guild.id, i),
            { reason: t }
          )
        }
      }
      e.exports = AutoModerationRuleManager
    },
    4123: (e, t, i) => {
      'use strict'
      const s = i(1666)
      const n = i(3130)
      const r = i(116)
      const { parseEmoji: a } = i(7966)
      class BaseGuildEmojiManager extends s {
        constructor(e, t) {
          super(e, n, t)
        }
        resolve(e) {
          if (e instanceof r) return super.resolve(e.id)
          return super.resolve(e)
        }
        resolveId(e) {
          if (e instanceof r) return e.id
          return super.resolveId(e)
        }
        resolveIdentifier(e) {
          const t = this.resolve(e)
          if (t) return t.identifier
          if (e instanceof r) return e.identifier
          if (typeof e === 'string') {
            const t = a(e)
            if (t?.name.length) {
              e = `${t.animated ? 'a:' : ''}${t.name}${t.id ? `:${t.id}` : ''}`
            }
            if (!e.includes('%')) return encodeURIComponent(e)
            return e
          }
          return null
        }
      }
      e.exports = BaseGuildEmojiManager
    },
    4719: (e) => {
      'use strict'
      class BaseManager {
        constructor(e) {
          Object.defineProperty(this, 'client', { value: e })
        }
      }
      e.exports = BaseManager
    },
    1666: (e, t, i) => {
      'use strict'
      const s = i(2889)
      class CachedManager extends s {
        constructor(e, t, i) {
          super(e, t)
          Object.defineProperty(this, '_cache', {
            value: this.client.options.makeCache(this.constructor, this.holds),
          })
          if (i) {
            for (const e of i) {
              this._add(e)
            }
          }
        }
        get cache() {
          return this._cache
        }
        _add(e, t = true, { id: i, extras: s = [] } = {}) {
          const n = this.cache.get(i ?? e.id)
          if (n) {
            if (t) {
              n._patch(e)
              return n
            }
            const i = n._clone()
            i._patch(e)
            return i
          }
          const r = this.holds ? new this.holds(this.client, e, ...s) : e
          if (t) this.cache.set(i ?? r.id, r)
          return r
        }
      }
      e.exports = CachedManager
    },
    3434: (e, t, i) => {
      'use strict'
      const s = i(2889)
      const n = i(3883)
      class CategoryChannelChildManager extends s {
        constructor(e) {
          super(e.client, n)
          this.channel = e
        }
        get cache() {
          return this.guild.channels.cache.filter(
            (e) => e.parentId === this.channel.id
          )
        }
        get guild() {
          return this.channel.guild
        }
        create(e) {
          return this.guild.channels.create({ ...e, parent: this.channel.id })
        }
      }
      e.exports = CategoryChannelChildManager
    },
    6088: (e, t, i) => {
      'use strict'
      const s = i(7742)
      const { Routes: n } = i(2)
      const r = i(1666)
      const { BaseChannel: a } = i(6948)
      const { createChannel: o } = i(275)
      const { ThreadChannelTypes: l } = i(6047)
      const c = i(457)
      let d = false
      class ChannelManager extends r {
        constructor(e, t) {
          super(e, a, t)
          const i =
            this._cache.constructor.name === 'Collection' ||
            this._cache.maxSize === undefined ||
            this._cache.maxSize === Infinity
          if (!d && !i) {
            d = true
            s.emitWarning(
              `Overriding the cache handling for ${this.constructor.name} is unsupported and breaks functionality.`,
              'UnsupportedCacheOverwriteWarning'
            )
          }
        }
        _add(
          e,
          t,
          {
            cache: i = true,
            allowUnknownGuild: s = false,
            fromInteraction: n = false,
          } = {}
        ) {
          const r = this.cache.get(e.id)
          if (r) {
            if (i) r._patch(e, n)
            t?.channels?._add(r)
            if (l.includes(r.type)) {
              r.parent?.threads?._add(r)
            }
            return r
          }
          const a = o(this.client, e, t, {
            allowUnknownGuild: s,
            fromInteraction: n,
          })
          if (!a) {
            this.client.emit(
              c.Debug,
              `Failed to find guild, or unknown type for channel ${e.id} ${e.type}`
            )
            return null
          }
          if (i && !s) this.cache.set(a.id, a)
          return a
        }
        _remove(e) {
          const t = this.cache.get(e)
          t?.guild?.channels.cache.delete(e)
          for (const [i, s] of t?.guild?.invites.cache ?? []) {
            if (s.channelId === e) t.guild.invites.cache.delete(i)
          }
          t?.parent?.threads?.cache.delete(e)
          this.cache.delete(e)
        }
        async fetch(
          e,
          {
            allowUnknownGuild: t = false,
            cache: i = true,
            force: s = false,
          } = {}
        ) {
          if (!s) {
            const t = this.cache.get(e)
            if (t && !t.partial) return t
          }
          const r = await this.client.rest.get(n.channel(e))
          return this._add(r, null, { cache: i, allowUnknownGuild: t })
        }
      }
      e.exports = ChannelManager
    },
    2889: (e, t, i) => {
      'use strict'
      const s = i(4719)
      const { DiscordjsError: n, ErrorCodes: r } = i(8951)
      class DataManager extends s {
        constructor(e, t) {
          super(e)
          Object.defineProperty(this, 'holds', { value: t })
        }
        get cache() {
          throw new n(r.NotImplemented, 'get cache', this.constructor.name)
        }
        resolve(e) {
          if (e instanceof this.holds) return e
          if (typeof e === 'string') return this.cache.get(e) ?? null
          return null
        }
        resolveId(e) {
          if (e instanceof this.holds) return e.id
          if (typeof e === 'string') return e
          return null
        }
        valueOf() {
          return this.cache
        }
      }
      e.exports = DataManager
    },
    8533: (e, t, i) => {
      'use strict'
      const s = i(8050)
      const n = i(7121)
      class GuildApplicationCommandManager extends s {
        constructor(e, t) {
          super(e.client, t)
          this.guild = e
          this.permissions = new n(this)
        }
      }
      e.exports = GuildApplicationCommandManager
    },
    3939: (e, t, i) => {
      'use strict'
      const s = i(7742)
      const { Collection: n } = i(2676)
      const { makeURLSearchParams: r } = i(1372)
      const { Routes: a } = i(2)
      const o = i(1666)
      const {
        DiscordjsTypeError: l,
        DiscordjsError: c,
        ErrorCodes: d,
      } = i(8951)
      const u = i(3694)
      const { GuildMember: h } = i(5780)
      let m = false
      class GuildBanManager extends o {
        constructor(e, t) {
          super(e.client, u, t)
          this.guild = e
        }
        _add(e, t) {
          return super._add(e, t, { id: e.user.id, extras: [this.guild] })
        }
        resolve(e) {
          return (
            super.resolve(e) ?? super.resolve(this.client.users.resolveId(e))
          )
        }
        fetch(e) {
          if (!e) return this._fetchMany()
          const {
            user: t,
            cache: i,
            force: s,
            limit: n,
            before: r,
            after: a,
          } = e
          const o = this.client.users.resolveId(t ?? e)
          if (o) return this._fetchSingle({ user: o, cache: i, force: s })
          if (!r && !a && !n && typeof i === 'undefined') {
            return Promise.reject(new c(d.FetchBanResolveId))
          }
          return this._fetchMany(e)
        }
        async _fetchSingle({ user: e, cache: t, force: i = false }) {
          if (!i) {
            const t = this.cache.get(e)
            if (t && !t.partial) return t
          }
          const s = await this.client.rest.get(a.guildBan(this.guild.id, e))
          return this._add(s, t)
        }
        async _fetchMany(e = {}) {
          const t = await this.client.rest.get(a.guildBans(this.guild.id), {
            query: r(e),
          })
          return t.reduce(
            (t, i) => t.set(i.user.id, this._add(i, e.cache)),
            new n()
          )
        }
        async create(e, t = {}) {
          if (typeof t !== 'object')
            throw new l(d.InvalidType, 'options', 'object', true)
          const i = this.client.users.resolveId(e)
          if (!i) throw new c(d.BanResolveId, true)
          if (typeof t.deleteMessageDays !== 'undefined' && !m) {
            s.emitWarning(
              'The deleteMessageDays option for GuildBanManager#create() is deprecated. Use the deleteMessageSeconds option instead.',
              'DeprecationWarning'
            )
            m = true
          }
          await this.client.rest.put(a.guildBan(this.guild.id, i), {
            body: {
              delete_message_seconds:
                t.deleteMessageSeconds ??
                (t.deleteMessageDays
                  ? t.deleteMessageDays * 24 * 60 * 60
                  : undefined),
            },
            reason: t.reason,
          })
          if (e instanceof h) return e
          const n = this.client.users.resolve(i)
          if (n) {
            return this.guild.members.resolve(n) ?? n
          }
          return i
        }
        async remove(e, t) {
          const i = this.client.users.resolveId(e)
          if (!i) throw new c(d.BanResolveId)
          await this.client.rest.delete(a.guildBan(this.guild.id, i), {
            reason: t,
          })
          return this.client.users.resolve(e)
        }
      }
      e.exports = GuildBanManager
    },
    3946: (e, t, i) => {
      'use strict'
      const s = i(7742)
      const { Collection: n } = i(2676)
      const { ChannelType: r, Routes: a } = i(2)
      const o = i(1666)
      const l = i(2808)
      const {
        DiscordjsError: c,
        DiscordjsTypeError: d,
        ErrorCodes: u,
      } = i(8951)
      const h = i(3883)
      const m = i(1812)
      const p = i(7522)
      const f = i(3630)
      const g = i(4874)
      const { transformGuildForumTag: v, transformGuildDefaultReaction: y } =
        i(275)
      const { ThreadChannelTypes: _ } = i(6047)
      const b = i(3989)
      const { setPosition: w } = i(7966)
      let C = false
      class GuildChannelManager extends o {
        constructor(e, t) {
          super(e.client, h, t)
          const i =
            this._cache.constructor.name === 'Collection' ||
            this._cache.maxSize === undefined ||
            this._cache.maxSize === Infinity
          if (!C && !i) {
            C = true
            s.emitWarning(
              `Overriding the cache handling for ${this.constructor.name} is unsupported and breaks functionality.`,
              'UnsupportedCacheOverwriteWarning'
            )
          }
          this.guild = e
        }
        get channelCountWithoutThreads() {
          return this.cache.reduce((e, t) => {
            if (_.includes(t.type)) return e
            return ++e
          }, 0)
        }
        _add(e) {
          const t = this.cache.get(e.id)
          if (t) return t
          this.cache.set(e.id, e)
          return e
        }
        resolve(e) {
          if (e instanceof p) return super.resolve(e.id)
          return super.resolve(e)
        }
        resolveId(e) {
          if (e instanceof p) return super.resolveId(e.id)
          return super.resolveId(e)
        }
        async addFollower(e, t, i) {
          const s = this.resolveId(e)
          const n = this.resolveId(t)
          if (!s || !n) throw new Error(u.GuildChannelResolve)
          const { webhook_id: r } = await this.client.rest.post(
            a.channelFollowers(s),
            { body: { webhook_channel_id: n }, reason: i }
          )
          return r
        }
        async create({
          name: e,
          type: t,
          topic: i,
          nsfw: s,
          bitrate: n,
          userLimit: r,
          parent: o,
          permissionOverwrites: l,
          position: c,
          rateLimitPerUser: d,
          rtcRegion: u,
          videoQualityMode: h,
          availableTags: p,
          defaultReactionEmoji: f,
          defaultAutoArchiveDuration: g,
          defaultSortOrder: _,
          reason: b,
        }) {
          o &&= this.client.channels.resolveId(o)
          l &&= l.map((e) => m.resolve(e, this.guild))
          const w = await this.client.rest.post(
            a.guildChannels(this.guild.id),
            {
              body: {
                name: e,
                topic: i,
                type: t,
                nsfw: s,
                bitrate: n,
                user_limit: r,
                parent_id: o,
                position: c,
                permission_overwrites: l,
                rate_limit_per_user: d,
                rtc_region: u,
                video_quality_mode: h,
                available_tags: p?.map((e) => v(e)),
                default_reaction_emoji: f && y(f),
                default_auto_archive_duration: g,
                default_sort_order: _,
              },
              reason: b,
            }
          )
          return this.client.actions.ChannelCreate.handle(w).channel
        }
        async createWebhook({ channel: e, name: t, avatar: i, reason: s }) {
          const n = this.resolveId(e)
          if (!n)
            throw new d(u.InvalidType, 'channel', 'GuildChannelResolvable')
          if (typeof i === 'string' && !i.startsWith('data:')) {
            i = await b.resolveImage(i)
          }
          const r = await this.client.rest.post(a.channelWebhooks(n), {
            body: { name: t, avatar: i },
            reason: s,
          })
          return new f(this.client, r)
        }
        async edit(e, t) {
          e = this.resolve(e)
          if (!e)
            throw new d(u.InvalidType, 'channel', 'GuildChannelResolvable')
          const i = t.parent && this.client.channels.resolveId(t.parent)
          if (typeof t.position !== 'undefined') {
            await this.setPosition(e, t.position, {
              position: t.position,
              reason: t.reason,
            })
          }
          let s = t.permissionOverwrites?.map((e) => m.resolve(e, this.guild))
          if (t.lockPermissions) {
            if (i) {
              const e = this.guild.channels.resolve(i)
              if (e?.type === r.GuildCategory) {
                s = e.permissionOverwrites.cache.map((e) =>
                  m.resolve(e, this.guild)
                )
              }
            } else if (e.parent) {
              s = e.parent.permissionOverwrites.cache.map((e) =>
                m.resolve(e, this.guild)
              )
            }
          }
          const n = await this.client.rest.patch(a.channel(e.id), {
            body: {
              name: (t.name ?? e.name).trim(),
              type: t.type,
              topic: t.topic,
              nsfw: t.nsfw,
              bitrate: t.bitrate ?? e.bitrate,
              user_limit: t.userLimit ?? e.userLimit,
              rtc_region: 'rtcRegion' in t ? t.rtcRegion : e.rtcRegion,
              video_quality_mode: t.videoQualityMode,
              parent_id: i,
              lock_permissions: t.lockPermissions,
              rate_limit_per_user: t.rateLimitPerUser,
              default_auto_archive_duration: t.defaultAutoArchiveDuration,
              permission_overwrites: s,
              available_tags: t.availableTags?.map((e) => v(e)),
              default_reaction_emoji:
                t.defaultReactionEmoji && y(t.defaultReactionEmoji),
              default_thread_rate_limit_per_user:
                t.defaultThreadRateLimitPerUser,
              flags: 'flags' in t ? g.resolve(t.flags) : undefined,
              default_sort_order: t.defaultSortOrder,
            },
            reason: t.reason,
          })
          return this.client.actions.ChannelUpdate.handle(n).updated
        }
        async setPosition(e, t, { relative: i, reason: s } = {}) {
          e = this.resolve(e)
          if (!e)
            throw new d(u.InvalidType, 'channel', 'GuildChannelResolvable')
          const n = await w(
            e,
            t,
            i,
            this.guild._sortedChannels(e),
            this.client,
            a.guildChannels(this.guild.id),
            s
          )
          this.client.actions.GuildChannelsPositionUpdate.handle({
            guild_id: this.guild.id,
            channels: n,
          })
          return e
        }
        async fetch(e, { cache: t = true, force: i = false } = {}) {
          if (e && !i) {
            const t = this.cache.get(e)
            if (t) return t
          }
          if (e) {
            const i = await this.client.rest.get(a.channel(e))
            if (this.guild.id !== i.guild_id) throw new c(u.GuildChannelUnowned)
            return this.client.channels._add(i, this.guild, { cache: t })
          }
          const s = await this.client.rest.get(a.guildChannels(this.guild.id))
          const r = new n()
          for (const e of s)
            r.set(e.id, this.client.channels._add(e, this.guild, { cache: t }))
          return r
        }
        async fetchWebhooks(e) {
          const t = this.resolveId(e)
          if (!t)
            throw new d(u.InvalidType, 'channel', 'GuildChannelResolvable')
          const i = await this.client.rest.get(a.channelWebhooks(t))
          return i.reduce((e, t) => e.set(t.id, new f(this.client, t)), new n())
        }
        async setPositions(e) {
          e = e.map((e) => ({
            id: this.client.channels.resolveId(e.channel),
            position: e.position,
            lock_permissions: e.lockPermissions,
            parent_id:
              typeof e.parent !== 'undefined'
                ? this.resolveId(e.parent)
                : undefined,
          }))
          await this.client.rest.patch(a.guildChannels(this.guild.id), {
            body: e,
          })
          return this.client.actions.GuildChannelsPositionUpdate.handle({
            guild_id: this.guild.id,
            channels: e,
          }).guild
        }
        async fetchActiveThreads(e = true) {
          const t = await this.client.rest.get(
            a.guildActiveThreads(this.guild.id)
          )
          return l._mapThreads(t, this.client, { guild: this.guild, cache: e })
        }
        async delete(e, t) {
          const i = this.resolveId(e)
          if (!i)
            throw new d(u.InvalidType, 'channel', 'GuildChannelResolvable')
          await this.client.rest.delete(a.channel(i), { reason: t })
          this.client.actions.ChannelDelete.handle({ id: i })
        }
      }
      e.exports = GuildChannelManager
    },
    8693: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { Routes: n, PermissionFlagsBits: r } = i(2)
      const a = i(4123)
      const {
        DiscordjsError: o,
        DiscordjsTypeError: l,
        ErrorCodes: c,
      } = i(8951)
      const d = i(3989)
      class GuildEmojiManager extends a {
        constructor(e, t) {
          super(e.client, t)
          this.guild = e
        }
        _add(e, t) {
          return super._add(e, t, { extras: [this.guild] })
        }
        async create({ attachment: e, name: t, roles: i, reason: r }) {
          e = await d.resolveImage(e)
          if (!e) throw new l(c.ReqResourceType)
          const a = { image: e, name: t }
          if (i) {
            if (!Array.isArray(i) && !(i instanceof s)) {
              throw new l(
                c.InvalidType,
                'options.roles',
                'Array or Collection of Roles or Snowflakes',
                true
              )
            }
            a.roles = []
            for (const e of i.values()) {
              const t = this.guild.roles.resolveId(e)
              if (!t) {
                throw new l(
                  c.InvalidElement,
                  'Array or Collection',
                  'options.roles',
                  e
                )
              }
              a.roles.push(t)
            }
          }
          const o = await this.client.rest.post(n.guildEmojis(this.guild.id), {
            body: a,
            reason: r,
          })
          return this.client.actions.GuildEmojiCreate.handle(this.guild, o)
            .emoji
        }
        async fetch(e, { cache: t = true, force: i = false } = {}) {
          if (e) {
            if (!i) {
              const t = this.cache.get(e)
              if (t) return t
            }
            const s = await this.client.rest.get(n.guildEmoji(this.guild.id, e))
            return this._add(s, t)
          }
          const r = await this.client.rest.get(n.guildEmojis(this.guild.id))
          const a = new s()
          for (const e of r) a.set(e.id, this._add(e, t))
          return a
        }
        async delete(e, t) {
          const i = this.resolveId(e)
          if (!i) throw new l(c.InvalidType, 'emoji', 'EmojiResolvable', true)
          await this.client.rest.delete(n.guildEmoji(this.guild.id, i), {
            reason: t,
          })
        }
        async edit(e, t) {
          const i = this.resolveId(e)
          if (!i) throw new l(c.InvalidType, 'emoji', 'EmojiResolvable', true)
          const s = t.roles?.map((e) => this.guild.roles.resolveId(e))
          const r = await this.client.rest.patch(
            n.guildEmoji(this.guild.id, i),
            { body: { name: t.name, roles: s }, reason: t.reason }
          )
          const a = this.cache.get(i)
          if (a) {
            const e = a._clone()
            e._patch(r)
            return e
          }
          return this._add(r)
        }
        async fetchAuthor(e) {
          e = this.resolve(e)
          if (!e) throw new l(c.InvalidType, 'emoji', 'EmojiResolvable', true)
          if (e.managed) {
            throw new o(c.EmojiManaged)
          }
          const { me: t } = this.guild.members
          if (!t) throw new o(c.GuildUncachedMe)
          if (!t.permissions.has(r.ManageEmojisAndStickers)) {
            throw new o(c.MissingManageEmojisAndStickersPermission, this.guild)
          }
          const i = await this.client.rest.get(
            n.guildEmoji(this.guild.id, e.id)
          )
          e._patch(i)
          return e.author
        }
      }
      e.exports = GuildEmojiManager
    },
    554: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const n = i(2889)
      const { DiscordjsTypeError: r, ErrorCodes: a } = i(8951)
      const { Role: o } = i(8033)
      class GuildEmojiRoleManager extends n {
        constructor(e) {
          super(e.client, o)
          this.emoji = e
          this.guild = e.guild
        }
        get cache() {
          return this.guild.roles.cache.filter((e) =>
            this.emoji._roles.includes(e.id)
          )
        }
        add(e) {
          if (!Array.isArray(e) && !(e instanceof s)) e = [e]
          const t = []
          for (const i of e.values()) {
            const e = this.guild.roles.resolveId(i)
            if (!e) {
              return Promise.reject(
                new r(a.InvalidElement, 'Array or Collection', 'roles', i)
              )
            }
            t.push(e)
          }
          const i = [...new Set(t.concat(...this.cache.keys()))]
          return this.set(i)
        }
        remove(e) {
          if (!Array.isArray(e) && !(e instanceof s)) e = [e]
          const t = []
          for (const i of e.values()) {
            const e = this.guild.roles.resolveId(i)
            if (!e) {
              return Promise.reject(
                new r(a.InvalidElement, 'Array or Collection', 'roles', i)
              )
            }
            t.push(e)
          }
          const i = [...this.cache.keys()].filter((e) => !t.includes(e))
          return this.set(i)
        }
        set(e) {
          return this.emoji.edit({ roles: e })
        }
        clone() {
          const e = new this.constructor(this.emoji)
          e._patch([...this.cache.keys()])
          return e
        }
        _patch(e) {
          this.emoji._roles = e
        }
        valueOf() {
          return this.cache
        }
      }
      e.exports = GuildEmojiRoleManager
    },
    3766: (e, t, i) => {
      'use strict'
      const { Routes: s } = i(2)
      const n = i(3918)
      const { DiscordjsTypeError: r, ErrorCodes: a } = i(8951)
      const o = i(9822)
      class GuildForumThreadManager extends n {
        async create({
          name: e,
          autoArchiveDuration: t = this.channel.defaultAutoArchiveDuration,
          message: i,
          reason: n,
          rateLimitPerUser: l,
          appliedTags: c,
        } = {}) {
          if (!i) {
            throw new r(a.GuildForumMessageRequired)
          }
          const { body: d, files: u } = await (i instanceof o
            ? i
            : o.create(this, i)
          )
            .resolveBody()
            .resolveFiles()
          const h = await this.client.rest.post(s.threads(this.channel.id), {
            body: {
              name: e,
              auto_archive_duration: t,
              rate_limit_per_user: l,
              applied_tags: c,
              message: d,
            },
            files: u,
            reason: n,
          })
          return this.client.actions.ThreadCreate.handle(h).thread
        }
      }
      e.exports = GuildForumThreadManager
    },
    1294: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { Routes: n } = i(2)
      const r = i(1666)
      const { DiscordjsError: a, ErrorCodes: o } = i(8951)
      const l = i(3493)
      const c = i(3989)
      class GuildInviteManager extends r {
        constructor(e, t) {
          super(e.client, l, t)
          this.guild = e
        }
        _add(e, t) {
          return super._add(e, t, { id: e.code, extras: [this.guild] })
        }
        fetch(e) {
          if (!e) return this._fetchMany()
          if (typeof e === 'string') {
            const t = c.resolveInviteCode(e)
            if (!t) return Promise.reject(new a(o.InviteResolveCode))
            return this._fetchSingle({ code: t, cache: true })
          }
          if (!e.code) {
            if (e.channelId) {
              const t = this.guild.channels.resolveId(e.channelId)
              if (!t) return Promise.reject(new a(o.GuildChannelResolve))
              return this._fetchChannelMany(t, e.cache)
            }
            if ('cache' in e) return this._fetchMany(e.cache)
            return Promise.reject(new a(o.InviteResolveCode))
          }
          return this._fetchSingle({ ...e, code: c.resolveInviteCode(e.code) })
        }
        async _fetchSingle({ code: e, cache: t, force: i = false }) {
          if (!i) {
            const t = this.cache.get(e)
            if (t) return t
          }
          const s = await this._fetchMany(t)
          const n = s.get(e)
          if (!n) throw new a(o.InviteNotFound)
          return n
        }
        async _fetchMany(e) {
          const t = await this.client.rest.get(n.guildInvites(this.guild.id))
          return t.reduce((t, i) => t.set(i.code, this._add(i, e)), new s())
        }
        async _fetchChannelMany(e, t) {
          const i = await this.client.rest.get(n.channelInvites(e))
          return i.reduce((e, i) => e.set(i.code, this._add(i, t)), new s())
        }
        async create(
          e,
          {
            temporary: t,
            maxAge: i,
            maxUses: s,
            unique: r,
            targetUser: c,
            targetApplication: d,
            targetType: u,
            reason: h,
          } = {}
        ) {
          const m = this.guild.channels.resolveId(e)
          if (!m) throw new a(o.GuildChannelResolve)
          const p = await this.client.rest.post(n.channelInvites(m), {
            body: {
              temporary: t,
              max_age: i,
              max_uses: s,
              unique: r,
              target_user_id: this.client.users.resolveId(c),
              target_application_id: d?.id ?? d?.applicationId ?? d,
              target_type: u,
            },
            reason: h,
          })
          return new l(this.client, p)
        }
        async delete(e, t) {
          const i = c.resolveInviteCode(e)
          await this.client.rest.delete(n.invite(i), { reason: t })
        }
      }
      e.exports = GuildInviteManager
    },
    2706: (e, t, i) => {
      'use strict'
      const s = i(7742)
      const { setTimeout: n, clearTimeout: r } = i(2332)
      const { Collection: a } = i(2676)
      const { makeURLSearchParams: o } = i(1372)
      const { Routes: l } = i(2)
      const c = i(1666)
      const { Guild: d } = i(4445)
      const u = i(3883)
      const h = i(3130)
      const { GuildMember: m } = i(5780)
      const p = i(3493)
      const f = i(4736)
      const { Role: g } = i(8033)
      const v = i(3989)
      const y = i(457)
      const _ = i(9238)
      const b = i(3502)
      const { resolveColor: w } = i(7966)
      let C = false
      class GuildManager extends c {
        constructor(e, t) {
          super(e, d, t)
          if (!C && this._cache.constructor.name !== 'Collection') {
            C = true
            s.emitWarning(
              `Overriding the cache handling for ${this.constructor.name} is unsupported and breaks functionality.`,
              'UnsupportedCacheOverwriteWarning'
            )
          }
        }
        resolve(e) {
          if (
            e instanceof u ||
            e instanceof m ||
            e instanceof h ||
            e instanceof g ||
            (e instanceof p && e.guild)
          ) {
            return super.resolve(e.guild)
          }
          return super.resolve(e)
        }
        resolveId(e) {
          if (
            e instanceof u ||
            e instanceof m ||
            e instanceof h ||
            e instanceof g ||
            (e instanceof p && e.guild)
          ) {
            return super.resolveId(e.guild.id)
          }
          return super.resolveId(e)
        }
        async create({
          name: e,
          afkChannelId: t,
          afkTimeout: i,
          channels: s = [],
          defaultMessageNotifications: a,
          explicitContentFilter: o,
          icon: c = null,
          roles: d = [],
          systemChannelId: u,
          systemChannelFlags: h,
          verificationLevel: m,
        }) {
          c = await v.resolveImage(c)
          for (const e of s) {
            e.parent_id = e.parentId
            delete e.parentId
            e.user_limit = e.userLimit
            delete e.userLimit
            e.rate_limit_per_user = e.rateLimitPerUser
            delete e.rateLimitPerUser
            e.rtc_region = e.rtcRegion
            delete e.rtcRegion
            e.video_quality_mode = e.videoQualityMode
            delete e.videoQualityMode
            if (!e.permissionOverwrites) continue
            for (const t of e.permissionOverwrites) {
              t.allow &&= _.resolve(t.allow).toString()
              t.deny &&= _.resolve(t.deny).toString()
            }
            e.permission_overwrites = e.permissionOverwrites
            delete e.permissionOverwrites
          }
          for (const e of d) {
            e.color &&= w(e.color)
            e.permissions &&= _.resolve(e.permissions).toString()
          }
          h &&= b.resolve(h)
          const p = await this.client.rest.post(l.guilds(), {
            body: {
              name: e,
              icon: c,
              verification_level: m,
              default_message_notifications: a,
              explicit_content_filter: o,
              roles: d,
              channels: s,
              afk_channel_id: t,
              afk_timeout: i,
              system_channel_id: u,
              system_channel_flags: h,
            },
          })
          if (this.client.guilds.cache.has(p.id))
            return this.client.guilds.cache.get(p.id)
          return new Promise((e) => {
            const handleGuild = (i) => {
              if (i.id === p.id) {
                r(t)
                this.client.removeListener(y.GuildCreate, handleGuild)
                this.client.decrementMaxListeners()
                e(i)
              }
            }
            this.client.incrementMaxListeners()
            this.client.on(y.GuildCreate, handleGuild)
            const t = n(() => {
              this.client.removeListener(y.GuildCreate, handleGuild)
              this.client.decrementMaxListeners()
              e(this.client.guilds._add(p))
            }, 1e4).unref()
          })
        }
        async fetch(e = {}) {
          const t = this.resolveId(e) ?? this.resolveId(e.guild)
          if (t) {
            if (!e.force) {
              const e = this.cache.get(t)
              if (e) return e
            }
            const i = await this.client.rest.get(l.guild(t), {
              query: o({ with_counts: e.withCounts ?? true }),
            })
            return this._add(i, e.cache)
          }
          const i = await this.client.rest.get(l.userGuilds(), { query: o(e) })
          return i.reduce((e, t) => e.set(t.id, new f(this.client, t)), new a())
        }
      }
      e.exports = GuildManager
    },
    6324: (e, t, i) => {
      'use strict'
      const { setTimeout: s, clearTimeout: n } = i(2332)
      const { Collection: r } = i(2676)
      const { makeURLSearchParams: a } = i(1372)
      const { DiscordSnowflake: o } = i(8673)
      const { Routes: l, GatewayOpcodes: c } = i(2)
      const d = i(1666)
      const {
        DiscordjsError: u,
        DiscordjsTypeError: h,
        DiscordjsRangeError: m,
        ErrorCodes: p,
      } = i(8951)
      const f = i(9417)
      const { GuildMember: g } = i(5780)
      const { Role: v } = i(8033)
      const y = i(457)
      const _ = i(527)
      class GuildMemberManager extends d {
        constructor(e, t) {
          super(e.client, g, t)
          this.guild = e
        }
        _add(e, t = true) {
          return super._add(e, t, { id: e.user.id, extras: [this.guild] })
        }
        resolve(e) {
          const t = super.resolve(e)
          if (t) return t
          const i = this.client.users.resolveId(e)
          if (i) return super.resolve(i)
          return null
        }
        resolveId(e) {
          const t = super.resolveId(e)
          if (t) return t
          const i = this.client.users.resolveId(e)
          return this.cache.has(i) ? i : null
        }
        async add(e, t) {
          const i = this.client.users.resolveId(e)
          if (!i) throw new h(p.InvalidType, 'user', 'UserResolvable')
          if (!t.force) {
            const e = this.cache.get(i)
            if (e) return e
          }
          const s = {
            access_token: t.accessToken,
            nick: t.nick,
            mute: t.mute,
            deaf: t.deaf,
          }
          if (t.roles) {
            if (!Array.isArray(t.roles) && !(t.roles instanceof r)) {
              throw new h(
                p.InvalidType,
                'options.roles',
                'Array or Collection of Roles or Snowflakes',
                true
              )
            }
            const e = []
            for (const i of t.roles.values()) {
              const t = this.guild.roles.resolveId(i)
              if (!t) {
                throw new h(
                  p.InvalidElement,
                  'Array or Collection',
                  'options.roles',
                  i
                )
              }
              e.push(t)
            }
            s.roles = e
          }
          const n = await this.client.rest.put(
            l.guildMember(this.guild.id, i),
            { body: s }
          )
          return n instanceof Uint8Array
            ? t.fetchWhenExisting === false
              ? null
              : this.fetch(i)
            : this._add(n)
        }
        get me() {
          return (
            this.resolve(this.client.user.id) ??
            (this.client.options.partials.includes(_.GuildMember)
              ? this._add({ user: { id: this.client.user.id } }, true)
              : null)
          )
        }
        fetch(e) {
          if (!e) return this._fetchMany()
          const t = this.client.users.resolveId(e)
          if (t) return this._fetchSingle({ user: t, cache: true })
          if (e.user) {
            if (Array.isArray(e.user)) {
              e.user = e.user.map((e) => this.client.users.resolveId(e))
              return this._fetchMany(e)
            } else {
              e.user = this.client.users.resolveId(e.user)
            }
            if (!e.limit && !e.withPresences) return this._fetchSingle(e)
          }
          return this._fetchMany(e)
        }
        fetchMe(e) {
          return this.fetch({ ...e, user: this.client.user.id })
        }
        async search({ query: e, limit: t, cache: i = true } = {}) {
          const s = await this.client.rest.get(
            l.guildMembersSearch(this.guild.id),
            { query: a({ query: e, limit: t }) }
          )
          return s.reduce((e, t) => e.set(t.user.id, this._add(t, i)), new r())
        }
        async list({ after: e, limit: t, cache: i = true } = {}) {
          const s = a({ limit: t, after: e })
          const n = await this.client.rest.get(l.guildMembers(this.guild.id), {
            query: s,
          })
          return n.reduce((e, t) => e.set(t.user.id, this._add(t, i)), new r())
        }
        async edit(e, { reason: t, ...i }) {
          const s = this.client.users.resolveId(e)
          if (!s) throw new h(p.InvalidType, 'user', 'UserResolvable')
          if (i.channel) {
            i.channel = this.guild.channels.resolve(i.channel)
            if (!(i.channel instanceof f)) {
              throw new u(p.GuildVoiceChannelResolve)
            }
            i.channel_id = i.channel.id
            i.channel = undefined
          } else if (i.channel === null) {
            i.channel_id = null
            i.channel = undefined
          }
          i.roles &&= i.roles.map((e) => (e instanceof v ? e.id : e))
          if (typeof i.communicationDisabledUntil !== 'undefined') {
            i.communication_disabled_until =
              i.communicationDisabledUntil != null
                ? new Date(i.communicationDisabledUntil).toISOString()
                : i.communicationDisabledUntil
          }
          let n
          if (s === this.client.user.id) {
            const e = Object.keys(i)
            if (e.length === 1 && e[0] === 'nick')
              n = l.guildMember(this.guild.id)
            else n = l.guildMember(this.guild.id, s)
          } else {
            n = l.guildMember(this.guild.id, s)
          }
          const r = await this.client.rest.patch(n, { body: i, reason: t })
          const a = this.cache.get(s)?._clone()
          a?._patch(r)
          return a ?? this._add(r, false)
        }
        async prune({
          days: e,
          dry: t = false,
          count: i,
          roles: s = [],
          reason: n,
        } = {}) {
          if (typeof e !== 'number') throw new h(p.PruneDaysType)
          const r = { days: e }
          const o = []
          for (const e of s) {
            const t = this.guild.roles.resolveId(e)
            if (!t) {
              throw new h(p.InvalidElement, 'Array', 'options.roles', e)
            }
            o.push(t)
          }
          if (o.length) {
            r.include_roles = t ? o.join(',') : o
          }
          const c = l.guildPrune(this.guild.id)
          const { pruned: d } = await (t
            ? this.client.rest.get(c, { query: a(r), reason: n })
            : this.client.rest.post(c, {
                body: { ...r, compute_prune_count: i },
                reason: n,
              }))
          return d
        }
        async kick(e, t) {
          const i = this.client.users.resolveId(e)
          if (!i)
            return Promise.reject(
              new h(p.InvalidType, 'user', 'UserResolvable')
            )
          await this.client.rest.delete(l.guildMember(this.guild.id, i), {
            reason: t,
          })
          return this.resolve(e) ?? this.client.users.resolve(e) ?? i
        }
        ban(e, t) {
          return this.guild.bans.create(e, t)
        }
        unban(e, t) {
          return this.guild.bans.remove(e, t)
        }
        async addRole(e) {
          const { user: t, role: i, reason: s } = e
          const n = this.guild.members.resolveId(t)
          const r = this.guild.roles.resolveId(i)
          await this.client.rest.put(l.guildMemberRole(this.guild.id, n, r), {
            reason: s,
          })
          return this.resolve(t) ?? this.client.users.resolve(t) ?? n
        }
        async removeRole(e) {
          const { user: t, role: i, reason: s } = e
          const n = this.guild.members.resolveId(t)
          const r = this.guild.roles.resolveId(i)
          await this.client.rest.delete(
            l.guildMemberRole(this.guild.id, n, r),
            { reason: s }
          )
          return this.resolve(t) ?? this.client.users.resolve(t) ?? n
        }
        async _fetchSingle({ user: e, cache: t, force: i = false }) {
          if (!i) {
            const t = this.cache.get(e)
            if (t && !t.partial) return t
          }
          const s = await this.client.rest.get(l.guildMember(this.guild.id, e))
          return this._add(s, t)
        }
        _fetchMany({
          limit: e = 0,
          withPresences: t = false,
          user: i,
          query: a,
          time: l = 12e4,
          nonce: d = o.generate().toString(),
        } = {}) {
          return new Promise((o, h) => {
            if (!a && !i) a = ''
            if (d.length > 32) throw new m(p.MemberFetchNonceLength)
            this.guild.shard.send({
              op: c.RequestGuildMembers,
              d: {
                guild_id: this.guild.id,
                presences: t,
                user_ids: i,
                query: a,
                nonce: d,
                limit: e,
              },
            })
            const f = new r()
            let g = 0
            const handler = (t, s, r) => {
              v.refresh()
              if (r.nonce !== d) return
              g++
              for (const e of t.values()) {
                f.set(e.id, e)
              }
              if (t.size < 1e3 || (e && f.size >= e) || g === r.count) {
                n(v)
                this.client.removeListener(y.GuildMembersChunk, handler)
                this.client.decrementMaxListeners()
                let e = f
                if (i && !Array.isArray(i) && e.size) e = e.first()
                o(e)
              }
            }
            const v = s(() => {
              this.client.removeListener(y.GuildMembersChunk, handler)
              this.client.decrementMaxListeners()
              h(new u(p.GuildMembersTimeout))
            }, l).unref()
            this.client.incrementMaxListeners()
            this.client.on(y.GuildMembersChunk, handler)
          })
        }
      }
      e.exports = GuildMemberManager
    },
    7444: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { Routes: n } = i(2)
      const r = i(2889)
      const { DiscordjsTypeError: a, ErrorCodes: o } = i(8951)
      const { Role: l } = i(8033)
      class GuildMemberRoleManager extends r {
        constructor(e) {
          super(e.client, l)
          this.member = e
          this.guild = e.guild
        }
        get cache() {
          const e = this.guild.roles.everyone
          return this.guild.roles.cache
            .filter((e) => this.member._roles.includes(e.id))
            .set(e.id, e)
        }
        get hoist() {
          const e = this.cache.filter((e) => e.hoist)
          if (!e.size) return null
          return e.reduce((e, t) => (t.comparePositionTo(e) > 0 ? t : e))
        }
        get icon() {
          const e = this.cache.filter((e) => e.icon || e.unicodeEmoji)
          if (!e.size) return null
          return e.reduce((e, t) => (t.comparePositionTo(e) > 0 ? t : e))
        }
        get color() {
          const e = this.cache.filter((e) => e.color)
          if (!e.size) return null
          return e.reduce((e, t) => (t.comparePositionTo(e) > 0 ? t : e))
        }
        get highest() {
          return this.cache.reduce(
            (e, t) => (t.comparePositionTo(e) > 0 ? t : e),
            this.cache.first()
          )
        }
        get premiumSubscriberRole() {
          return this.cache.find((e) => e.tags?.premiumSubscriberRole) ?? null
        }
        get botRole() {
          if (!this.member.user.bot) return null
          return (
            this.cache.find((e) => e.tags?.botId === this.member.user.id) ??
            null
          )
        }
        async add(e, t) {
          if (e instanceof s || Array.isArray(e)) {
            const i = []
            for (const t of e.values()) {
              const e = this.guild.roles.resolveId(t)
              if (!e) {
                throw new a(o.InvalidElement, 'Array or Collection', 'roles', t)
              }
              i.push(e)
            }
            const s = [...new Set(i.concat(...this.cache.keys()))]
            return this.set(s, t)
          } else {
            e = this.guild.roles.resolveId(e)
            if (e === null) {
              throw new a(
                o.InvalidType,
                'roles',
                'Role, Snowflake or Array or Collection of Roles or Snowflakes'
              )
            }
            await this.client.rest.put(
              n.guildMemberRole(this.guild.id, this.member.id, e),
              { reason: t }
            )
            const i = this.member._clone()
            i._roles = [...this.cache.keys(), e]
            return i
          }
        }
        async remove(e, t) {
          if (e instanceof s || Array.isArray(e)) {
            const i = []
            for (const t of e.values()) {
              const e = this.guild.roles.resolveId(t)
              if (!e) {
                throw new a(o.InvalidElement, 'Array or Collection', 'roles', t)
              }
              i.push(e)
            }
            const s = this.cache.filter((e) => !i.includes(e.id))
            return this.set(s, t)
          } else {
            e = this.guild.roles.resolveId(e)
            if (e === null) {
              throw new a(
                o.InvalidType,
                'roles',
                'Role, Snowflake or Array or Collection of Roles or Snowflakes'
              )
            }
            await this.client.rest.delete(
              n.guildMemberRole(this.guild.id, this.member.id, e),
              { reason: t }
            )
            const i = this.member._clone()
            const s = this.cache.filter((t) => t.id !== e)
            i._roles = [...s.keys()]
            return i
          }
        }
        set(e, t) {
          return this.member.edit({ roles: e, reason: t })
        }
        clone() {
          const e = new this.constructor(this.member)
          e.member._roles = [...this.cache.keys()]
          return e
        }
      }
      e.exports = GuildMemberRoleManager
    },
    5082: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { makeURLSearchParams: n } = i(1372)
      const { GuildScheduledEventEntityType: r, Routes: a } = i(2)
      const o = i(1666)
      const {
        DiscordjsTypeError: l,
        DiscordjsError: c,
        ErrorCodes: d,
      } = i(8951)
      const { GuildScheduledEvent: u } = i(6122)
      const h = i(3989)
      class GuildScheduledEventManager extends o {
        constructor(e, t) {
          super(e.client, u, t)
          this.guild = e
        }
        async create(e) {
          if (typeof e !== 'object')
            throw new l(d.InvalidType, 'options', 'object', true)
          let {
            privacyLevel: t,
            entityType: i,
            channel: s,
            name: n,
            scheduledStartTime: o,
            description: u,
            scheduledEndTime: m,
            entityMetadata: p,
            reason: f,
            image: g,
          } = e
          let v, y
          if (i === r.External) {
            y = typeof s === 'undefined' ? s : null
            v = { location: p?.location }
          } else {
            y = this.guild.channels.resolveId(s)
            if (!y) throw new c(d.GuildVoiceChannelResolve)
            v = typeof p === 'undefined' ? p : null
          }
          const _ = await this.client.rest.post(
            a.guildScheduledEvents(this.guild.id),
            {
              body: {
                channel_id: y,
                name: n,
                privacy_level: t,
                scheduled_start_time: new Date(o).toISOString(),
                scheduled_end_time: m ? new Date(m).toISOString() : m,
                description: u,
                entity_type: i,
                entity_metadata: v,
                image: g && (await h.resolveImage(g)),
              },
              reason: f,
            }
          )
          return this._add(_)
        }
        async fetch(e = {}) {
          const t = this.resolveId(e.guildScheduledEvent ?? e)
          if (t) {
            if (!e.force) {
              const e = this.cache.get(t)
              if (e) return e
            }
            const i = await this.client.rest.get(
              a.guildScheduledEvent(this.guild.id, t),
              { query: n({ with_user_count: e.withUserCount ?? true }) }
            )
            return this._add(i, e.cache)
          }
          const i = await this.client.rest.get(
            a.guildScheduledEvents(this.guild.id),
            { query: n({ with_user_count: e.withUserCount ?? true }) }
          )
          return i.reduce(
            (t, i) => t.set(i.id, this.guild.scheduledEvents._add(i, e.cache)),
            new s()
          )
        }
        async edit(e, t) {
          const i = this.resolveId(e)
          if (!i) throw new c(d.GuildScheduledEventResolve)
          if (typeof t !== 'object')
            throw new l(d.InvalidType, 'options', 'object', true)
          let {
            privacyLevel: s,
            entityType: n,
            channel: r,
            status: o,
            name: u,
            scheduledStartTime: m,
            description: p,
            scheduledEndTime: f,
            entityMetadata: g,
            reason: v,
            image: y,
          } = t
          let _
          if (g) {
            _ = { location: g.location }
          }
          const b = await this.client.rest.patch(
            a.guildScheduledEvent(this.guild.id, i),
            {
              body: {
                channel_id:
                  typeof r === 'undefined'
                    ? r
                    : this.guild.channels.resolveId(r),
                name: u,
                privacy_level: s,
                scheduled_start_time: m ? new Date(m).toISOString() : undefined,
                scheduled_end_time: f ? new Date(f).toISOString() : f,
                description: p,
                entity_type: n,
                status: o,
                image: y && (await h.resolveImage(y)),
                entity_metadata: _,
              },
              reason: v,
            }
          )
          return this._add(b)
        }
        async delete(e) {
          const t = this.resolveId(e)
          if (!t) throw new c(d.GuildScheduledEventResolve)
          await this.client.rest.delete(a.guildScheduledEvent(this.guild.id, t))
        }
        async fetchSubscribers(e, t = {}) {
          const i = this.resolveId(e)
          if (!i) throw new c(d.GuildScheduledEventResolve)
          const r = n({
            limit: t.limit,
            with_member: t.withMember,
            before: t.before,
            after: t.after,
          })
          const o = await this.client.rest.get(
            a.guildScheduledEventUsers(this.guild.id, i),
            { query: r }
          )
          return o.reduce(
            (e, t) =>
              e.set(t.user.id, {
                guildScheduledEventId: t.guild_scheduled_event_id,
                user: this.client.users._add(t.user),
                member: t.member
                  ? this.guild.members._add({ ...t.member, user: t.user })
                  : null,
              }),
            new s()
          )
        }
      }
      e.exports = GuildScheduledEventManager
    },
    4215: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { Routes: n } = i(2)
      const r = i(1666)
      const { DiscordjsTypeError: a, ErrorCodes: o } = i(8951)
      const l = i(9822)
      const { Sticker: c } = i(2736)
      class GuildStickerManager extends r {
        constructor(e, t) {
          super(e.client, c, t)
          this.guild = e
        }
        _add(e, t) {
          return super._add(e, t, { extras: [this.guild] })
        }
        async create({
          file: e,
          name: t,
          tags: i,
          description: s,
          reason: r,
        } = {}) {
          const c = await l.resolveFile(e)
          if (!c) throw new a(o.ReqResourceType)
          e = { ...c, key: 'file' }
          const d = { name: t, tags: i, description: s ?? '' }
          const u = await this.client.rest.post(
            n.guildStickers(this.guild.id),
            { appendToFormData: true, body: d, files: [e], reason: r }
          )
          return this.client.actions.GuildStickerCreate.handle(this.guild, u)
            .sticker
        }
        async edit(e, t = {}) {
          const i = this.resolveId(e)
          if (!i) throw new a(o.InvalidType, 'sticker', 'StickerResolvable')
          const s = await this.client.rest.patch(
            n.guildSticker(this.guild.id, i),
            { body: t, reason: t.reason }
          )
          const r = this.cache.get(i)
          if (r) {
            const e = r._clone()
            e._patch(s)
            return e
          }
          return this._add(s)
        }
        async delete(e, t) {
          e = this.resolveId(e)
          if (!e) throw new a(o.InvalidType, 'sticker', 'StickerResolvable')
          await this.client.rest.delete(n.guildSticker(this.guild.id, e), {
            reason: t,
          })
        }
        async fetch(e, { cache: t = true, force: i = false } = {}) {
          if (e) {
            if (!i) {
              const t = this.cache.get(e)
              if (t) return t
            }
            const s = await this.client.rest.get(
              n.guildSticker(this.guild.id, e)
            )
            return this._add(s, t)
          }
          const r = await this.client.rest.get(n.guildStickers(this.guild.id))
          return new s(r.map((e) => [e.id, this._add(e, t)]))
        }
        async fetchUser(e) {
          e = this.resolve(e)
          if (!e) throw new a(o.InvalidType, 'sticker', 'StickerResolvable')
          const t = await this.client.rest.get(
            n.guildSticker(this.guild.id, e.id)
          )
          e._patch(t)
          return e.user
        }
      }
      e.exports = GuildStickerManager
    },
    2808: (e, t, i) => {
      'use strict'
      const { ChannelType: s, Routes: n } = i(2)
      const r = i(3918)
      const { DiscordjsTypeError: a, ErrorCodes: o } = i(8951)
      class GuildTextThreadManager extends r {
        async create({
          name: e,
          autoArchiveDuration: t = this.channel.defaultAutoArchiveDuration,
          startMessage: i,
          type: r,
          invitable: l,
          reason: c,
          rateLimitPerUser: d,
        } = {}) {
          let u =
            this.channel.type === s.GuildAnnouncement
              ? s.AnnouncementThread
              : s.PublicThread
          let h
          if (i) {
            h = this.channel.messages.resolveId(i)
            if (!h)
              throw new a(o.InvalidType, 'startMessage', 'MessageResolvable')
          } else if (this.channel.type !== s.GuildAnnouncement) {
            u = r ?? u
          }
          const m = await this.client.rest.post(n.threads(this.channel.id, h), {
            body: {
              name: e,
              auto_archive_duration: t,
              type: u,
              invitable: u === s.PrivateThread ? l : undefined,
              rate_limit_per_user: d,
            },
            reason: c,
          })
          return this.client.actions.ThreadCreate.handle(m).thread
        }
      }
      e.exports = GuildTextThreadManager
    },
    9903: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { makeURLSearchParams: n } = i(1372)
      const { Routes: r } = i(2)
      const a = i(1666)
      const { DiscordjsTypeError: o, ErrorCodes: l } = i(8951)
      const { Message: c } = i(6774)
      const d = i(9822)
      const { resolvePartialEmoji: u } = i(7966)
      class MessageManager extends a {
        constructor(e, t) {
          super(e.client, c, t)
          this.channel = e
        }
        _add(e, t) {
          return super._add(e, t)
        }
        fetch(e) {
          if (!e) return this._fetchMany()
          const { message: t, cache: i, force: s } = e
          const n = this.resolveId(t ?? e)
          if (n) return this._fetchSingle({ message: n, cache: i, force: s })
          return this._fetchMany(e)
        }
        async _fetchSingle({ message: e, cache: t, force: i = false }) {
          if (!i) {
            const t = this.cache.get(e)
            if (t && !t.partial) return t
          }
          const s = await this.client.rest.get(
            r.channelMessage(this.channel.id, e)
          )
          return this._add(s, t)
        }
        async _fetchMany(e = {}) {
          const t = await this.client.rest.get(
            r.channelMessages(this.channel.id),
            { query: n(e) }
          )
          return t.reduce((t, i) => t.set(i.id, this._add(i, e.cache)), new s())
        }
        async fetchPinned(e = true) {
          const t = await this.client.rest.get(r.channelPins(this.channel.id))
          const i = new s()
          for (const s of t) i.set(s.id, this._add(s, e))
          return i
        }
        async edit(e, t) {
          const i = this.resolveId(e)
          if (!i) throw new o(l.InvalidType, 'message', 'MessageResolvable')
          const { body: s, files: n } = await (t instanceof d
            ? t
            : d.create(e instanceof c ? e : this, t)
          )
            .resolveBody()
            .resolveFiles()
          const a = await this.client.rest.patch(
            r.channelMessage(this.channel.id, i),
            { body: s, files: n }
          )
          const u = this.cache.get(i)
          if (u) {
            const e = u._clone()
            e._patch(a)
            return e
          }
          return this._add(a)
        }
        async crosspost(e) {
          e = this.resolveId(e)
          if (!e) throw new o(l.InvalidType, 'message', 'MessageResolvable')
          const t = await this.client.rest.post(
            r.channelMessageCrosspost(this.channel.id, e)
          )
          return this.cache.get(t.id) ?? this._add(t)
        }
        async pin(e, t) {
          e = this.resolveId(e)
          if (!e) throw new o(l.InvalidType, 'message', 'MessageResolvable')
          await this.client.rest.put(r.channelPin(this.channel.id, e), {
            reason: t,
          })
        }
        async unpin(e, t) {
          e = this.resolveId(e)
          if (!e) throw new o(l.InvalidType, 'message', 'MessageResolvable')
          await this.client.rest.delete(r.channelPin(this.channel.id, e), {
            reason: t,
          })
        }
        async react(e, t) {
          e = this.resolveId(e)
          if (!e) throw new o(l.InvalidType, 'message', 'MessageResolvable')
          t = u(t)
          if (!t) throw new o(l.EmojiType, 'emoji', 'EmojiIdentifierResolvable')
          const i = t.id
            ? `${t.animated ? 'a:' : ''}${t.name}:${t.id}`
            : encodeURIComponent(t.name)
          await this.client.rest.put(
            r.channelMessageOwnReaction(this.channel.id, e, i)
          )
        }
        async delete(e) {
          e = this.resolveId(e)
          if (!e) throw new o(l.InvalidType, 'message', 'MessageResolvable')
          await this.client.rest.delete(r.channelMessage(this.channel.id, e))
        }
      }
      e.exports = MessageManager
    },
    7941: (e, t, i) => {
      'use strict'
      const s = i(7742)
      const { Collection: n } = i(2676)
      const { OverwriteType: r, Routes: a } = i(2)
      const o = i(1666)
      const { DiscordjsTypeError: l, ErrorCodes: c } = i(8951)
      const d = i(1812)
      const { Role: u } = i(8033)
      let h = false
      class PermissionOverwriteManager extends o {
        constructor(e, t) {
          super(e.client, d)
          if (!h && this._cache.constructor.name !== 'Collection') {
            h = true
            s.emitWarning(
              `Overriding the cache handling for ${this.constructor.name} is unsupported and breaks functionality.`,
              'UnsupportedCacheOverwriteWarning'
            )
          }
          this.channel = e
          if (t) {
            for (const e of t) {
              this._add(e)
            }
          }
        }
        _add(e, t) {
          return super._add(e, t, { extras: [this.channel] })
        }
        set(e, t) {
          if (!Array.isArray(e) && !(e instanceof n)) {
            return Promise.reject(
              new l(
                c.InvalidType,
                'overwrites',
                'Array or Collection of Permission Overwrites',
                true
              )
            )
          }
          return this.channel.edit({ permissionOverwrites: e, reason: t })
        }
        async upsert(e, t, i = {}, s) {
          let n =
            this.channel.guild.roles.resolveId(e) ??
            this.client.users.resolveId(e)
          let { type: o, reason: h } = i
          if (typeof o !== 'number') {
            e =
              this.channel.guild.roles.resolve(e) ??
              this.client.users.resolve(e)
            if (!e) throw new l(c.InvalidType, 'parameter', 'User nor a Role')
            o = e instanceof u ? r.Role : r.Member
          }
          const { allow: m, deny: p } = d.resolveOverwriteOptions(t, s)
          await this.client.rest.put(a.channelPermission(this.channel.id, n), {
            body: { id: n, type: o, allow: m, deny: p },
            reason: h,
          })
          return this.channel
        }
        create(e, t, i) {
          return this.upsert(e, t, i)
        }
        edit(e, t, i) {
          const s = this.cache.get(
            this.channel.guild.roles.resolveId(e) ??
              this.client.users.resolveId(e)
          )
          return this.upsert(e, t, i, s)
        }
        async delete(e, t) {
          const i =
            this.channel.guild.roles.resolveId(e) ??
            this.client.users.resolveId(e)
          if (!i) throw new l(c.InvalidType, 'parameter', 'User nor a Role')
          await this.client.rest.delete(
            a.channelPermission(this.channel.id, i),
            { reason: t }
          )
          return this.channel
        }
      }
      e.exports = PermissionOverwriteManager
    },
    5710: (e, t, i) => {
      'use strict'
      const s = i(1666)
      const { Presence: n } = i(4253)
      class PresenceManager extends s {
        constructor(e, t) {
          super(e, n, t)
        }
        _add(e, t) {
          return super._add(e, t, { id: e.user.id })
        }
        resolve(e) {
          const t = super.resolve(e)
          if (t) return t
          const i = this.client.users.resolveId(e)
          return super.resolve(i)
        }
        resolveId(e) {
          const t = super.resolveId(e)
          if (t) return t
          const i = this.client.users.resolveId(e)
          return this.cache.has(i) ? i : null
        }
      }
      e.exports = PresenceManager
    },
    7500: (e, t, i) => {
      'use strict'
      const { Routes: s } = i(2)
      const n = i(1666)
      const r = i(5477)
      class ReactionManager extends n {
        constructor(e, t) {
          super(e.client, r, t)
          this.message = e
        }
        _add(e, t) {
          return super._add(e, t, {
            id: e.emoji.id ?? e.emoji.name,
            extras: [this.message],
          })
        }
        async removeAll() {
          await this.client.rest.delete(
            s.channelMessageAllReactions(
              this.message.channelId,
              this.message.id
            )
          )
          return this.message
        }
      }
      e.exports = ReactionManager
    },
    7041: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { makeURLSearchParams: n } = i(1372)
      const { Routes: r } = i(2)
      const a = i(1666)
      const { DiscordjsError: o, ErrorCodes: l } = i(8951)
      const c = i(8569)
      class ReactionUserManager extends a {
        constructor(e, t) {
          super(e.client, c, t)
          this.reaction = e
        }
        async fetch({ limit: e = 100, after: t } = {}) {
          const i = this.reaction.message
          const a = n({ limit: e, after: t })
          const o = await this.client.rest.get(
            r.channelMessageReaction(
              i.channelId,
              i.id,
              this.reaction.emoji.identifier
            ),
            { query: a }
          )
          const l = new s()
          for (const e of o) {
            const t = this.client.users._add(e)
            this.cache.set(t.id, t)
            l.set(t.id, t)
          }
          return l
        }
        async remove(e = this.client.user) {
          const t = this.client.users.resolveId(e)
          if (!t) throw new o(l.ReactionResolveUser)
          const i = this.reaction.message
          const s =
            t === this.client.user.id
              ? r.channelMessageOwnReaction(
                  i.channelId,
                  i.id,
                  this.reaction.emoji.identifier
                )
              : r.channelMessageUserReaction(
                  i.channelId,
                  i.id,
                  this.reaction.emoji.identifier,
                  t
                )
          await this.client.rest.delete(s)
          return this.reaction
        }
      }
      e.exports = ReactionUserManager
    },
    4213: (e, t, i) => {
      'use strict'
      const s = i(7742)
      const { Collection: n } = i(2676)
      const { Routes: r } = i(2)
      const a = i(1666)
      const { DiscordjsTypeError: o, ErrorCodes: l } = i(8951)
      const { Role: c } = i(8033)
      const d = i(3989)
      const u = i(9238)
      const { setPosition: h, resolveColor: m } = i(7966)
      let p = false
      class RoleManager extends a {
        constructor(e, t) {
          super(e.client, c, t)
          if (!p && this._cache.constructor.name !== 'Collection') {
            p = true
            s.emitWarning(
              `Overriding the cache handling for ${this.constructor.name} is unsupported and breaks functionality.`,
              'UnsupportedCacheOverwriteWarning'
            )
          }
          this.guild = e
        }
        _add(e, t) {
          return super._add(e, t, { extras: [this.guild] })
        }
        async fetch(e, { cache: t = true, force: i = false } = {}) {
          if (e && !i) {
            const t = this.cache.get(e)
            if (t) return t
          }
          const s = await this.client.rest.get(r.guildRoles(this.guild.id))
          const a = new n()
          for (const e of s) a.set(e.id, this._add(e, t))
          return e ? a.get(e) ?? null : a
        }
        async create(e = {}) {
          let {
            name: t,
            color: i,
            hoist: s,
            permissions: n,
            position: a,
            mentionable: o,
            reason: l,
            icon: c,
            unicodeEmoji: h,
          } = e
          i &&= m(i)
          if (typeof n !== 'undefined') n = new u(n)
          if (c) {
            const e = this.guild.emojis.resolve(c)?.url
            c = e ? await d.resolveImage(e) : await d.resolveImage(c)
            if (typeof c !== 'string') c = undefined
          }
          const p = await this.client.rest.post(r.guildRoles(this.guild.id), {
            body: {
              name: t,
              color: i,
              hoist: s,
              permissions: n,
              mentionable: o,
              icon: c,
              unicode_emoji: h,
            },
            reason: l,
          })
          const { role: f } = this.client.actions.GuildRoleCreate.handle({
            guild_id: this.guild.id,
            role: p,
          })
          if (a) return this.setPosition(f, a, { reason: l })
          return f
        }
        async edit(e, t) {
          e = this.resolve(e)
          if (!e) throw new o(l.InvalidType, 'role', 'RoleResolvable')
          if (typeof t.position === 'number') {
            await this.setPosition(e, t.position, { reason: t.reason })
          }
          let i = t.icon
          if (i) {
            const e = this.guild.emojis.resolve(i)?.url
            i = e ? await d.resolveImage(e) : await d.resolveImage(i)
            if (typeof i !== 'string') i = undefined
          }
          const s = {
            name: t.name,
            color: typeof t.color === 'undefined' ? undefined : m(t.color),
            hoist: t.hoist,
            permissions:
              typeof t.permissions === 'undefined'
                ? undefined
                : new u(t.permissions),
            mentionable: t.mentionable,
            icon: i,
            unicode_emoji: t.unicodeEmoji,
          }
          const n = await this.client.rest.patch(
            r.guildRole(this.guild.id, e.id),
            { body: s, reason: t.reason }
          )
          const a = e._clone()
          a._patch(n)
          return a
        }
        async delete(e, t) {
          const i = this.resolveId(e)
          await this.client.rest.delete(r.guildRole(this.guild.id, i), {
            reason: t,
          })
          this.client.actions.GuildRoleDelete.handle({
            guild_id: this.guild.id,
            role_id: i,
          })
        }
        async setPosition(e, t, { relative: i, reason: s } = {}) {
          e = this.resolve(e)
          if (!e) throw new o(l.InvalidType, 'role', 'RoleResolvable')
          const n = await h(
            e,
            t,
            i,
            this.guild._sortedRoles(),
            this.client,
            r.guildRoles(this.guild.id),
            s
          )
          this.client.actions.GuildRolesPositionUpdate.handle({
            guild_id: this.guild.id,
            roles: n,
          })
          return e
        }
        async setPositions(e) {
          e = e.map((e) => ({
            id: this.resolveId(e.role),
            position: e.position,
          }))
          await this.client.rest.patch(r.guildRoles(this.guild.id), { body: e })
          return this.client.actions.GuildRolesPositionUpdate.handle({
            guild_id: this.guild.id,
            roles: e,
          }).guild
        }
        comparePositions(e, t) {
          const i = this.resolve(e)
          const s = this.resolve(t)
          if (!i || !s) {
            throw new o(l.InvalidType, 'role', 'Role nor a Snowflake')
          }
          if (i.position === s.position) {
            return Number(BigInt(s.id) - BigInt(i.id))
          }
          return i.position - s.position
        }
        botRoleFor(e) {
          const t = this.client.users.resolveId(e)
          if (!t) return null
          return this.cache.find((e) => e.tags?.botId === t) ?? null
        }
        get everyone() {
          return this.cache.get(this.guild.id)
        }
        get premiumSubscriberRole() {
          return this.cache.find((e) => e.tags?.premiumSubscriberRole) ?? null
        }
        get highest() {
          return this.cache.reduce(
            (e, t) => (t.comparePositionTo(e) > 0 ? t : e),
            this.cache.first()
          )
        }
      }
      e.exports = RoleManager
    },
    3105: (e, t, i) => {
      'use strict'
      const { Routes: s } = i(2)
      const n = i(1666)
      const {
        DiscordjsTypeError: r,
        DiscordjsError: a,
        ErrorCodes: o,
      } = i(8951)
      const { StageInstance: l } = i(4233)
      class StageInstanceManager extends n {
        constructor(e, t) {
          super(e.client, l, t)
          this.guild = e
        }
        async create(e, t) {
          const i = this.guild.channels.resolveId(e)
          if (!i) throw new a(o.StageChannelResolve)
          if (typeof t !== 'object')
            throw new r(o.InvalidType, 'options', 'object', true)
          let { topic: n, privacyLevel: l, sendStartNotification: c } = t
          const d = await this.client.rest.post(s.stageInstances(), {
            body: {
              channel_id: i,
              topic: n,
              privacy_level: l,
              send_start_notification: c,
            },
          })
          return this._add(d)
        }
        async fetch(e, { cache: t = true, force: i = false } = {}) {
          const n = this.guild.channels.resolveId(e)
          if (!n) throw new a(o.StageChannelResolve)
          if (!i) {
            const e = this.cache.find((e) => e.channelId === n)
            if (e) return e
          }
          const r = await this.client.rest.get(s.stageInstance(n))
          return this._add(r, t)
        }
        async edit(e, t) {
          if (typeof t !== 'object')
            throw new r(o.InvalidType, 'options', 'object', true)
          const i = this.guild.channels.resolveId(e)
          if (!i) throw new a(o.StageChannelResolve)
          let { topic: n, privacyLevel: l } = t
          const c = await this.client.rest.patch(s.stageInstance(i), {
            body: { topic: n, privacy_level: l },
          })
          if (this.cache.has(c.id)) {
            const e = this.cache.get(c.id)._clone()
            e._patch(c)
            return e
          }
          return this._add(c)
        }
        async delete(e) {
          const t = this.guild.channels.resolveId(e)
          if (!t) throw new a(o.StageChannelResolve)
          await this.client.rest.delete(s.stageInstance(t))
        }
      }
      e.exports = StageInstanceManager
    },
    3918: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { makeURLSearchParams: n } = i(1372)
      const { Routes: r } = i(2)
      const a = i(1666)
      const { DiscordjsTypeError: o, ErrorCodes: l } = i(8951)
      const c = i(7522)
      class ThreadManager extends a {
        constructor(e, t) {
          super(e.client, c, t)
          this.channel = e
        }
        _add(e) {
          const t = this.cache.get(e.id)
          if (t) return t
          this.cache.set(e.id, e)
          return e
        }
        fetch(e, { cache: t = true, force: i = false } = {}) {
          if (!e) return this.fetchActive(t)
          const s = this.client.channels.resolveId(e)
          if (s) return this.client.channels.fetch(s, t, i)
          if (e.archived) {
            return this.fetchArchived(e.archived, t)
          }
          return this.fetchActive(t)
        }
        async fetchArchived(
          { type: e = 'public', fetchAll: t = false, before: i, limit: s } = {},
          a = true
        ) {
          let d = r.channelThreads(this.channel.id, e)
          if (e === 'private' && !t) {
            d = r.channelJoinedArchivedThreads(this.channel.id)
          }
          let u
          let h
          const m = n({ limit: s })
          if (typeof i !== 'undefined') {
            if (i instanceof c || /^\d{16,19}$/.test(String(i))) {
              h = this.resolveId(i)
              u = this.resolve(i)?.archivedAt?.toISOString()
              const s = e === 'private' && !t ? h : u
              if (s) {
                m.set('before', s)
              }
            } else {
              try {
                u = new Date(i).toISOString()
                if (e === 'public' || t) {
                  m.set('before', u)
                }
              } catch {
                throw new o(
                  l.InvalidType,
                  'before',
                  'DateResolvable or ThreadChannelResolvable'
                )
              }
            }
          }
          const p = await this.client.rest.get(d, { query: m })
          return this.constructor._mapThreads(p, this.client, {
            parent: this.channel,
            cache: a,
          })
        }
        async fetchActive(e = true) {
          const t = await this.client.rest.get(
            r.guildActiveThreads(this.channel.guild.id)
          )
          return this.constructor._mapThreads(t, this.client, {
            parent: this.channel,
            cache: e,
          })
        }
        static _mapThreads(e, t, { parent: i, guild: n, cache: r }) {
          const a = e.threads.reduce((e, s) => {
            const a = t.channels._add(s, n ?? i?.guild, { cache: r })
            if (i && a.parentId !== i.id) return e
            return e.set(a.id, a)
          }, new s())
          for (const i of e.members) t.channels.cache.get(i.id)?.members._add(i)
          return { threads: a, hasMore: e.has_more ?? false }
        }
      }
      e.exports = ThreadManager
    },
    3038: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { Routes: n } = i(2)
      const r = i(1666)
      const { DiscordjsTypeError: a, ErrorCodes: o } = i(8951)
      const l = i(9950)
      class ThreadMemberManager extends r {
        constructor(e, t) {
          super(e.client, l, t)
          this.thread = e
        }
        _add(e, t = true) {
          const i = this.cache.get(e.user_id)
          if (t) i?._patch(e)
          if (i) return i
          const s = new l(this.thread, e)
          if (t) this.cache.set(e.user_id, s)
          return s
        }
        fetchMe(e) {
          return this.fetch({ ...e, member: this.client.user.id })
        }
        get me() {
          return this.resolve(this.client.user.id)
        }
        resolve(e) {
          const t = super.resolve(e)
          if (t) return t
          const i = this.client.users.resolveId(e)
          if (i) return super.resolve(i)
          return null
        }
        resolveId(e) {
          const t = super.resolveId(e)
          if (t) return t
          const i = this.client.users.resolveId(e)
          return this.cache.has(i) ? i : null
        }
        async add(e, t) {
          const i = e === '@me' ? e : this.client.users.resolveId(e)
          if (!i) throw new a(o.InvalidType, 'member', 'UserResolvable')
          await this.client.rest.put(n.threadMembers(this.thread.id, i), {
            reason: t,
          })
          return i
        }
        async remove(e, t) {
          await this.client.rest.delete(n.threadMembers(this.thread.id, e), {
            reason: t,
          })
          return e
        }
        fetch(e) {
          if (!e) return this._fetchMany()
          const { member: t, cache: i, force: s } = e
          const n = this.resolveId(t ?? e)
          if (n) return this._fetchSingle({ member: n, cache: i, force: s })
          return this._fetchMany(e)
        }
        async _fetchSingle({ member: e, cache: t, force: i = false }) {
          if (!i) {
            const t = this.cache.get(e)
            if (t) return t
          }
          const s = await this.client.rest.get(
            n.threadMembers(this.thread.id, e)
          )
          return this._add(s, t)
        }
        async _fetchMany(e = {}) {
          const t = await this.client.rest.get(n.threadMembers(this.thread.id))
          return t.reduce(
            (t, i) => t.set(i.user_id, this._add(i, e.cache)),
            new s()
          )
        }
      }
      e.exports = ThreadMemberManager
    },
    6657: (e, t, i) => {
      'use strict'
      const { ChannelType: s, Routes: n } = i(2)
      const r = i(1666)
      const { DiscordjsError: a, ErrorCodes: o } = i(8951)
      const { GuildMember: l } = i(5780)
      const { Message: c } = i(6774)
      const d = i(9950)
      const u = i(8569)
      class UserManager extends r {
        constructor(e, t) {
          super(e, u, t)
        }
        dmChannel(e) {
          return (
            this.client.channels.cache.find(
              (t) => t.type === s.DM && t.recipientId === e
            ) ?? null
          )
        }
        async createDM(e, { cache: t = true, force: i = false } = {}) {
          const s = this.resolveId(e)
          if (!i) {
            const e = this.dmChannel(s)
            if (e && !e.partial) return e
          }
          const r = await this.client.rest.post(n.userChannels(), {
            body: { recipient_id: s },
          })
          return this.client.channels._add(r, null, { cache: t })
        }
        async deleteDM(e) {
          const t = this.resolveId(e)
          const i = this.dmChannel(t)
          if (!i) throw new a(o.UserNoDMChannel)
          await this.client.rest.delete(n.channel(i.id))
          this.client.channels._remove(i.id)
          return i
        }
        async fetch(e, { cache: t = true, force: i = false } = {}) {
          const s = this.resolveId(e)
          if (!i) {
            const e = this.cache.get(s)
            if (e && !e.partial) return e
          }
          const r = await this.client.rest.get(n.user(s))
          return this._add(r, t)
        }
        async fetchFlags(e, t) {
          return (await this.fetch(e, t)).flags
        }
        async send(e, t) {
          return (await this.createDM(e)).send(t)
        }
        resolve(e) {
          if (e instanceof l || e instanceof d) return e.user
          if (e instanceof c) return e.author
          return super.resolve(e)
        }
        resolveId(e) {
          if (e instanceof d) return e.id
          if (e instanceof l) return e.user.id
          if (e instanceof c) return e.author.id
          return super.resolveId(e)
        }
      }
      e.exports = UserManager
    },
    5679: (e, t, i) => {
      'use strict'
      const s = i(1666)
      const n = i(5036)
      class VoiceStateManager extends s {
        constructor(e, t) {
          super(e.client, n, t)
          this.guild = e
        }
        _add(e, t = true) {
          const i = this.cache.get(e.user_id)
          if (i) return i._patch(e)
          const s = new this.holds(this.guild, e)
          if (t) this.cache.set(e.user_id, s)
          return s
        }
      }
      e.exports = VoiceStateManager
    },
    8680: (e, t, i) => {
      'use strict'
      const s = i(5673)
      const n = i(9411)
      const r = i(7742)
      const { setTimeout: a, clearTimeout: o } = i(2332)
      const { setTimeout: l } = i(9397)
      const { DiscordjsError: c, ErrorCodes: d } = i(8951)
      const u = i(4053)
      const { makeError: h, makePlainError: m } = i(7966)
      let p = null
      let f = null
      class Shard extends s {
        constructor(e, t) {
          super()
          if (e.mode === 'process') p = i(7718)
          else if (e.mode === 'worker') f = i(3621).Worker
          this.manager = e
          this.id = t
          this.args = e.shardArgs ?? []
          this.execArgv = e.execArgv
          this.env = Object.assign({}, r.env, {
            SHARDING_MANAGER: true,
            SHARDS: this.id,
            SHARD_COUNT: this.manager.totalShards,
            DISCORD_TOKEN: this.manager.token,
          })
          this.ready = false
          this.process = null
          this.worker = null
          this._evals = new Map()
          this._fetches = new Map()
          this._exitListener = null
        }
        spawn(e = 3e4) {
          if (this.process) throw new c(d.ShardingProcessExists, this.id)
          if (this.worker) throw new c(d.ShardingWorkerExists, this.id)
          this._exitListener = this._handleExit.bind(this, undefined, e)
          if (this.manager.mode === 'process') {
            this.process = p
              .fork(n.resolve(this.manager.file), this.args, {
                env: this.env,
                execArgv: this.execArgv,
              })
              .on('message', this._handleMessage.bind(this))
              .on('exit', this._exitListener)
          } else if (this.manager.mode === 'worker') {
            this.worker = new f(n.resolve(this.manager.file), {
              workerData: this.env,
            })
              .on('message', this._handleMessage.bind(this))
              .on('exit', this._exitListener)
          }
          this._evals.clear()
          this._fetches.clear()
          const t = this.process ?? this.worker
          this.emit(u.Spawn, t)
          if (e === -1 || e === Infinity) return Promise.resolve(t)
          return new Promise((i, s) => {
            const cleanup = () => {
              o(n)
              this.off('ready', onReady)
              this.off('disconnect', onDisconnect)
              this.off('death', onDeath)
            }
            const onReady = () => {
              cleanup()
              i(t)
            }
            const onDisconnect = () => {
              cleanup()
              s(new c(d.ShardingReadyDisconnected, this.id))
            }
            const onDeath = () => {
              cleanup()
              s(new c(d.ShardingReadyDied, this.id))
            }
            const onTimeout = () => {
              cleanup()
              s(new c(d.ShardingReadyTimeout, this.id))
            }
            const n = a(onTimeout, e)
            this.once('ready', onReady)
            this.once('disconnect', onDisconnect)
            this.once('death', onDeath)
          })
        }
        kill() {
          if (this.process) {
            this.process.removeListener('exit', this._exitListener)
            this.process.kill()
          } else {
            this.worker.removeListener('exit', this._exitListener)
            this.worker.terminate()
          }
          this._handleExit(false)
        }
        async respawn({ delay: e = 500, timeout: t = 3e4 } = {}) {
          this.kill()
          if (e > 0) await l(e)
          return this.spawn(t)
        }
        send(e) {
          return new Promise((t, i) => {
            if (this.process) {
              this.process.send(e, (e) => {
                if (e) i(e)
                else t(this)
              })
            } else {
              this.worker.postMessage(e)
              t(this)
            }
          })
        }
        fetchClientValue(e) {
          if (!this.process && !this.worker) {
            return Promise.reject(new c(d.ShardingNoChildExists, this.id))
          }
          if (this._fetches.has(e)) return this._fetches.get(e)
          const t = new Promise((t, i) => {
            const s = this.process ?? this.worker
            const listener = (n) => {
              if (n?._fetchProp !== e) return
              s.removeListener('message', listener)
              this.decrementMaxListeners(s)
              this._fetches.delete(e)
              if (!n._error) t(n._result)
              else i(h(n._error))
            }
            this.incrementMaxListeners(s)
            s.on('message', listener)
            this.send({ _fetchProp: e }).catch((t) => {
              s.removeListener('message', listener)
              this.decrementMaxListeners(s)
              this._fetches.delete(e)
              i(t)
            })
          })
          this._fetches.set(e, t)
          return t
        }
        eval(e, t) {
          const i =
            typeof e === 'function' ? `(${e})(this, ${JSON.stringify(t)})` : e
          if (!this.process && !this.worker) {
            return Promise.reject(new c(d.ShardingNoChildExists, this.id))
          }
          if (this._evals.has(i)) return this._evals.get(i)
          const s = new Promise((e, t) => {
            const s = this.process ?? this.worker
            const listener = (n) => {
              if (n?._eval !== i) return
              s.removeListener('message', listener)
              this.decrementMaxListeners(s)
              this._evals.delete(i)
              if (!n._error) e(n._result)
              else t(h(n._error))
            }
            this.incrementMaxListeners(s)
            s.on('message', listener)
            this.send({ _eval: i }).catch((e) => {
              s.removeListener('message', listener)
              this.decrementMaxListeners(s)
              this._evals.delete(i)
              t(e)
            })
          })
          this._evals.set(i, s)
          return s
        }
        _handleMessage(e) {
          if (e) {
            if (e._ready) {
              this.ready = true
              this.emit(u.Ready)
              return
            }
            if (e._disconnect) {
              this.ready = false
              this.emit(u.Disconnect)
              return
            }
            if (e._reconnecting) {
              this.ready = false
              this.emit(u.Reconnecting)
              return
            }
            if (e._sFetchProp) {
              const t = {
                _sFetchProp: e._sFetchProp,
                _sFetchPropShard: e._sFetchPropShard,
              }
              this.manager
                .fetchClientValues(e._sFetchProp, e._sFetchPropShard)
                .then(
                  (e) => this.send({ ...t, _result: e }),
                  (e) => this.send({ ...t, _error: m(e) })
                )
              return
            }
            if (e._sEval) {
              const t = { _sEval: e._sEval, _sEvalShard: e._sEvalShard }
              this.manager
                ._performOnShards('eval', [e._sEval], e._sEvalShard)
                .then(
                  (e) => this.send({ ...t, _result: e }),
                  (e) => this.send({ ...t, _error: m(e) })
                )
              return
            }
            if (e._sRespawnAll) {
              const {
                shardDelay: t,
                respawnDelay: i,
                timeout: s,
              } = e._sRespawnAll
              this.manager
                .respawnAll({ shardDelay: t, respawnDelay: i, timeout: s })
                .catch(() => {})
              return
            }
          }
          this.emit(u.Message, e)
        }
        _handleExit(e = this.manager.respawn, t) {
          this.emit(u.Death, this.process ?? this.worker)
          this.ready = false
          this.process = null
          this.worker = null
          this._evals.clear()
          this._fetches.clear()
          if (e) this.spawn(t).catch((e) => this.emit(u.Error, e))
        }
        incrementMaxListeners(e) {
          const t = e.getMaxListeners()
          if (t !== 0) {
            e.setMaxListeners(t + 1)
          }
        }
        decrementMaxListeners(e) {
          const t = e.getMaxListeners()
          if (t !== 0) {
            e.setMaxListeners(t - 1)
          }
        }
      }
      e.exports = Shard
    },
    7732: (e, t, i) => {
      'use strict'
      const s = i(7742)
      const {
        DiscordjsError: n,
        DiscordjsTypeError: r,
        ErrorCodes: a,
      } = i(8951)
      const o = i(457)
      const { makeError: l, makePlainError: c } = i(7966)
      class ShardClientUtil {
        constructor(e, t) {
          this.client = e
          this.mode = t
          this.parentPort = null
          if (t === 'process') {
            s.on('message', this._handleMessage.bind(this))
            e.on('ready', () => {
              s.send({ _ready: true })
            })
            e.on('disconnect', () => {
              s.send({ _disconnect: true })
            })
            e.on('reconnecting', () => {
              s.send({ _reconnecting: true })
            })
          } else if (t === 'worker') {
            this.parentPort = i(3621).parentPort
            this.parentPort.on('message', this._handleMessage.bind(this))
            e.on('ready', () => {
              this.parentPort.postMessage({ _ready: true })
            })
            e.on('disconnect', () => {
              this.parentPort.postMessage({ _disconnect: true })
            })
            e.on('reconnecting', () => {
              this.parentPort.postMessage({ _reconnecting: true })
            })
          }
        }
        get ids() {
          return this.client.options.shards
        }
        get count() {
          return this.client.options.shardCount
        }
        send(e) {
          return new Promise((t, i) => {
            if (this.mode === 'process') {
              s.send(e, (e) => {
                if (e) i(e)
                else t()
              })
            } else if (this.mode === 'worker') {
              this.parentPort.postMessage(e)
              t()
            }
          })
        }
        fetchClientValues(e, t) {
          return new Promise((i, n) => {
            const r = this.parentPort ?? s
            const listener = (s) => {
              if (s?._sFetchProp !== e || s._sFetchPropShard !== t) return
              r.removeListener('message', listener)
              this.decrementMaxListeners(r)
              if (!s._error) i(s._result)
              else n(l(s._error))
            }
            this.incrementMaxListeners(r)
            r.on('message', listener)
            this.send({ _sFetchProp: e, _sFetchPropShard: t }).catch((e) => {
              r.removeListener('message', listener)
              this.decrementMaxListeners(r)
              n(e)
            })
          })
        }
        broadcastEval(e, t = {}) {
          return new Promise((i, n) => {
            const o = this.parentPort ?? s
            if (typeof e !== 'function') {
              n(new r(a.ShardingInvalidEvalBroadcast))
              return
            }
            e = `(${e})(this, ${JSON.stringify(t.context)})`
            const listener = (s) => {
              if (s?._sEval !== e || s._sEvalShard !== t.shard) return
              o.removeListener('message', listener)
              this.decrementMaxListeners(o)
              if (!s._error) i(s._result)
              else n(l(s._error))
            }
            this.incrementMaxListeners(o)
            o.on('message', listener)
            this.send({ _sEval: e, _sEvalShard: t.shard }).catch((e) => {
              o.removeListener('message', listener)
              this.decrementMaxListeners(o)
              n(e)
            })
          })
        }
        respawnAll({
          shardDelay: e = 5e3,
          respawnDelay: t = 500,
          timeout: i = 3e4,
        } = {}) {
          return this.send({
            _sRespawnAll: { shardDelay: e, respawnDelay: t, timeout: i },
          })
        }
        async _handleMessage(e) {
          if (!e) return
          if (e._fetchProp) {
            try {
              const t = e._fetchProp.split('.')
              let i = this.client
              for (const e of t) i = i[e]
              this._respond('fetchProp', {
                _fetchProp: e._fetchProp,
                _result: i,
              })
            } catch (t) {
              this._respond('fetchProp', {
                _fetchProp: e._fetchProp,
                _error: c(t),
              })
            }
          } else if (e._eval) {
            try {
              this._respond('eval', {
                _eval: e._eval,
                _result: await this.client._eval(e._eval),
              })
            } catch (t) {
              this._respond('eval', { _eval: e._eval, _error: c(t) })
            }
          }
        }
        _respond(e, t) {
          this.send(t).catch((t) => {
            const i = new Error(
              `Error when sending ${e} response to master process: ${t.message}`
            )
            i.stack = t.stack
            this.client.emit(o.Error, i)
          })
        }
        static singleton(e, t) {
          if (!this._singleton) {
            this._singleton = new this(e, t)
          } else {
            e.emit(
              o.Warn,
              'Multiple clients created in child process/worker; only the first will handle sharding helpers.'
            )
          }
          return this._singleton
        }
        static shardIdForGuildId(e, t) {
          const i = Number(BigInt(e) >> 22n) % t
          if (i < 0) throw new n(a.ShardingShardMiscalculation, i, e, t)
          return i
        }
        incrementMaxListeners(e) {
          const t = e.getMaxListeners()
          if (t !== 0) {
            e.setMaxListeners(t + 1)
          }
        }
        decrementMaxListeners(e) {
          const t = e.getMaxListeners()
          if (t !== 0) {
            e.setMaxListeners(t - 1)
          }
        }
      }
      e.exports = ShardClientUtil
    },
    8004: (e, t, i) => {
      'use strict'
      const s = i(5673)
      const n = i(7561)
      const r = i(9411)
      const a = i(7742)
      const { setTimeout: o } = i(9397)
      const { Collection: l } = i(2676)
      const c = i(8680)
      const {
        DiscordjsError: d,
        DiscordjsTypeError: u,
        DiscordjsRangeError: h,
        ErrorCodes: m,
      } = i(8951)
      const { mergeDefault: p, fetchRecommendedShardCount: f } = i(7966)
      class ShardingManager extends s {
        constructor(e, t = {}) {
          super()
          t = p(
            {
              totalShards: 'auto',
              mode: 'process',
              respawn: true,
              shardArgs: [],
              execArgv: [],
              token: a.env.DISCORD_TOKEN,
            },
            t
          )
          this.file = e
          if (!e) throw new d(m.ClientInvalidOption, 'File', 'specified.')
          if (!r.isAbsolute(e)) this.file = r.resolve(a.cwd(), e)
          const i = n.statSync(this.file)
          if (!i.isFile()) throw new d(m.ClientInvalidOption, 'File', 'a file')
          this.shardList = t.shardList ?? 'auto'
          if (this.shardList !== 'auto') {
            if (!Array.isArray(this.shardList)) {
              throw new u(m.ClientInvalidOption, 'shardList', 'an array.')
            }
            this.shardList = [...new Set(this.shardList)]
            if (this.shardList.length < 1) {
              throw new h(m.ClientInvalidOption, 'shardList', 'at least 1 id.')
            }
            if (
              this.shardList.some(
                (e) =>
                  typeof e !== 'number' ||
                  isNaN(e) ||
                  !Number.isInteger(e) ||
                  e < 0
              )
            ) {
              throw new u(
                m.ClientInvalidOption,
                'shardList',
                'an array of positive integers.'
              )
            }
          }
          this.totalShards = t.totalShards || 'auto'
          if (this.totalShards !== 'auto') {
            if (
              typeof this.totalShards !== 'number' ||
              isNaN(this.totalShards)
            ) {
              throw new u(
                m.ClientInvalidOption,
                'Amount of shards',
                'a number.'
              )
            }
            if (this.totalShards < 1) {
              throw new h(
                m.ClientInvalidOption,
                'Amount of shards',
                'at least 1.'
              )
            }
            if (!Number.isInteger(this.totalShards)) {
              throw new h(
                m.ClientInvalidOption,
                'Amount of shards',
                'an integer.'
              )
            }
          }
          this.mode = t.mode
          if (this.mode !== 'process' && this.mode !== 'worker') {
            throw new h(
              m.ClientInvalidOption,
              'Sharding mode',
              '"process" or "worker"'
            )
          }
          this.respawn = t.respawn
          this.shardArgs = t.shardArgs
          this.execArgv = t.execArgv
          this.token = t.token?.replace(/^Bot\s*/i, '') ?? null
          this.shards = new l()
          a.env.SHARDING_MANAGER = true
          a.env.SHARDING_MANAGER_MODE = this.mode
          a.env.DISCORD_TOKEN = this.token
        }
        createShard(e = this.shards.size) {
          const t = new c(this, e)
          this.shards.set(e, t)
          this.emit('shardCreate', t)
          return t
        }
        async spawn({
          amount: e = this.totalShards,
          delay: t = 5500,
          timeout: i = 3e4,
        } = {}) {
          if (e === 'auto') {
            e = await f(this.token)
          } else {
            if (typeof e !== 'number' || isNaN(e)) {
              throw new u(
                m.ClientInvalidOption,
                'Amount of shards',
                'a number.'
              )
            }
            if (e < 1)
              throw new h(
                m.ClientInvalidOption,
                'Amount of shards',
                'at least 1.'
              )
            if (!Number.isInteger(e)) {
              throw new u(
                m.ClientInvalidOption,
                'Amount of shards',
                'an integer.'
              )
            }
          }
          if (this.shards.size >= e)
            throw new d(m.ShardingAlreadySpawned, this.shards.size)
          if (
            this.shardList === 'auto' ||
            this.totalShards === 'auto' ||
            this.totalShards !== e
          ) {
            this.shardList = [...Array(e).keys()]
          }
          if (this.totalShards === 'auto' || this.totalShards !== e) {
            this.totalShards = e
          }
          if (this.shardList.some((t) => t >= e)) {
            throw new h(
              m.ClientInvalidOption,
              'Amount of shards',
              'bigger than the highest shardId in the shardList option.'
            )
          }
          for (const e of this.shardList) {
            const s = []
            const n = this.createShard(e)
            s.push(n.spawn(i))
            if (t > 0 && this.shards.size !== this.shardList.length)
              s.push(o(t))
            await Promise.all(s)
          }
          return this.shards
        }
        broadcast(e) {
          const t = []
          for (const i of this.shards.values()) t.push(i.send(e))
          return Promise.all(t)
        }
        broadcastEval(e, t = {}) {
          if (typeof e !== 'function') {
            return Promise.reject(new u(m.ShardingInvalidEvalBroadcast))
          }
          return this._performOnShards(
            'eval',
            [`(${e})(this, ${JSON.stringify(t.context)})`],
            t.shard
          )
        }
        fetchClientValues(e, t) {
          return this._performOnShards('fetchClientValue', [e], t)
        }
        _performOnShards(e, t, i) {
          if (this.shards.size === 0)
            return Promise.reject(new d(m.ShardingNoShards))
          if (typeof i === 'number') {
            if (this.shards.has(i)) return this.shards.get(i)[e](...t)
            return Promise.reject(new d(m.ShardingShardNotFound, i))
          }
          if (this.shards.size !== this.shardList.length) {
            return Promise.reject(new d(m.ShardingInProcess))
          }
          const s = []
          for (const i of this.shards.values()) s.push(i[e](...t))
          return Promise.all(s)
        }
        async respawnAll({
          shardDelay: e = 5e3,
          respawnDelay: t = 500,
          timeout: i = 3e4,
        } = {}) {
          let s = 0
          for (const n of this.shards.values()) {
            const r = [n.respawn({ delay: t, timeout: i })]
            if (++s < this.shards.size && e > 0) r.push(o(e))
            await Promise.all(r)
          }
          return this.shards
        }
      }
      e.exports = ShardingManager
    },
    121: (e, t, i) => {
      'use strict'
      const { deprecate: s } = i(7261)
      const { isJSONEncodable: n } = i(2547)
      const r = i(1688)
      const { createComponent: a } = i(6129)
      class ActionRow extends r {
        constructor({ components: e, ...t }) {
          super(t)
          this.components = e.map((e) => a(e))
        }
        static from(e) {
          if (n(e)) {
            return new this(e.toJSON())
          }
          return new this(e)
        }
        toJSON() {
          return {
            ...this.data,
            components: this.components.map((e) => e.toJSON()),
          }
        }
      }
      ActionRow.from = s(
        ActionRow.from,
        'ActionRow.from() is deprecated. Use ActionRowBuilder.from() instead.'
      )
      e.exports = ActionRow
    },
    112: (e, t, i) => {
      'use strict'
      const { ActionRowBuilder: s, isJSONEncodable: n } = i(2547)
      const { createComponentBuilder: r } = i(6129)
      const { toSnakeCase: a } = i(7910)
      class ActionRowBuilder extends s {
        constructor({ components: e, ...t } = {}) {
          super({ ...a(t), components: e?.map((e) => r(e)) })
        }
        static from(e) {
          if (n(e)) {
            return new this(e.toJSON())
          }
          return new this(e)
        }
      }
      e.exports = ActionRowBuilder
    },
    7888: (e, t, i) => {
      'use strict'
      const s = i(6918)
      class AnonymousGuild extends s {
        constructor(e, t, i = true) {
          super(e, t)
          if (i) this._patch(t)
        }
        _patch(e) {
          if ('features' in e) this.features = e.features
          if ('splash' in e) {
            this.splash = e.splash
          }
          if ('banner' in e) {
            this.banner = e.banner
          }
          if ('description' in e) {
            this.description = e.description
          }
          if ('verification_level' in e) {
            this.verificationLevel = e.verification_level
          }
          if ('vanity_url_code' in e) {
            this.vanityURLCode = e.vanity_url_code
          }
          if ('nsfw_level' in e) {
            this.nsfwLevel = e.nsfw_level
          }
          if ('premium_subscription_count' in e) {
            this.premiumSubscriptionCount = e.premium_subscription_count
          } else {
            this.premiumSubscriptionCount ??= null
          }
        }
        bannerURL(e = {}) {
          return (
            this.banner && this.client.rest.cdn.banner(this.id, this.banner, e)
          )
        }
        splashURL(e = {}) {
          return (
            this.splash && this.client.rest.cdn.splash(this.id, this.splash, e)
          )
        }
      }
      e.exports = AnonymousGuild
    },
    6130: (e, t, i) => {
      'use strict'
      const { DiscordSnowflake: s } = i(8673)
      const { ApplicationCommandOptionType: n } = i(2)
      const r = i(1230)
      const a = i(4936)
      const o = i(7121)
      const l = i(9238)
      class ApplicationCommand extends a {
        constructor(e, t, i, s) {
          super(e)
          this.id = t.id
          this.applicationId = t.application_id
          this.guild = i ?? null
          this.guildId = i?.id ?? s ?? null
          this.permissions = new o(this)
          this.type = t.type
          this._patch(t)
        }
        _patch(e) {
          if ('name' in e) {
            this.name = e.name
          }
          if ('name_localizations' in e) {
            this.nameLocalizations = e.name_localizations
          } else {
            this.nameLocalizations ??= null
          }
          if ('name_localized' in e) {
            this.nameLocalized = e.name_localized
          } else {
            this.nameLocalized ??= null
          }
          if ('description' in e) {
            this.description = e.description
          }
          if ('description_localizations' in e) {
            this.descriptionLocalizations = e.description_localizations
          } else {
            this.descriptionLocalizations ??= null
          }
          if ('description_localized' in e) {
            this.descriptionLocalized = e.description_localized
          } else {
            this.descriptionLocalized ??= null
          }
          if ('options' in e) {
            this.options = e.options.map((e) =>
              this.constructor.transformOption(e, true)
            )
          } else {
            this.options ??= []
          }
          if ('default_member_permissions' in e) {
            this.defaultMemberPermissions = e.default_member_permissions
              ? new l(BigInt(e.default_member_permissions)).freeze()
              : null
          } else {
            this.defaultMemberPermissions ??= null
          }
          if ('dm_permission' in e) {
            this.dmPermission = e.dm_permission
          } else {
            this.dmPermission ??= null
          }
          if ('version' in e) {
            this.version = e.version
          }
        }
        get createdTimestamp() {
          return s.timestampFrom(this.id)
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
        get manager() {
          return (this.guild ?? this.client.application).commands
        }
        edit(e) {
          return this.manager.edit(this, e, this.guildId)
        }
        setName(e) {
          return this.edit({ name: e })
        }
        setNameLocalizations(e) {
          return this.edit({ nameLocalizations: e })
        }
        setDescription(e) {
          return this.edit({ description: e })
        }
        setDescriptionLocalizations(e) {
          return this.edit({ descriptionLocalizations: e })
        }
        setDefaultMemberPermissions(e) {
          return this.edit({ defaultMemberPermissions: e })
        }
        setDMPermission(e = true) {
          return this.edit({ dmPermission: e })
        }
        setOptions(e) {
          return this.edit({ options: e })
        }
        delete() {
          return this.manager.delete(this, this.guildId)
        }
        equals(e, t = false) {
          if (e.id && this.id !== e.id) return false
          let i = null
          let s = e.dmPermission ?? e.dm_permission
          if ('default_member_permissions' in e) {
            i = e.default_member_permissions
              ? new l(BigInt(e.default_member_permissions)).bitfield
              : null
          }
          if ('defaultMemberPermissions' in e) {
            i =
              e.defaultMemberPermissions !== null
                ? new l(e.defaultMemberPermissions).bitfield
                : null
          }
          if (
            e.name !== this.name ||
            ('description' in e && e.description !== this.description) ||
            ('version' in e && e.version !== this.version) ||
            (e.type && e.type !== this.type) ||
            (e.options?.length ?? 0) !== (this.options?.length ?? 0) ||
            i !== (this.defaultMemberPermissions?.bitfield ?? null) ||
            (typeof s !== 'undefined' && s !== this.dmPermission) ||
            !r(
              e.nameLocalizations ?? e.name_localizations ?? {},
              this.nameLocalizations ?? {}
            ) ||
            !r(
              e.descriptionLocalizations ?? e.description_localizations ?? {},
              this.descriptionLocalizations ?? {}
            )
          ) {
            return false
          }
          if (e.options) {
            return this.constructor.optionsEqual(this.options, e.options, t)
          }
          return true
        }
        static optionsEqual(e, t, i = false) {
          if (e.length !== t.length) return false
          if (i) {
            return e.every((e, s) => this._optionEquals(e, t[s], i))
          }
          const s = new Map(t.map((e) => [e.name, e]))
          for (const t of e) {
            const e = s.get(t.name)
            if (!e || !this._optionEquals(t, e)) return false
          }
          return true
        }
        static _optionEquals(e, t, i = false) {
          if (
            t.name !== e.name ||
            t.type !== e.type ||
            t.description !== e.description ||
            t.autocomplete !== e.autocomplete ||
            (t.required ??
              ([n.Subcommand, n.SubcommandGroup].includes(t.type)
                ? undefined
                : false)) !== e.required ||
            t.choices?.length !== e.choices?.length ||
            t.options?.length !== e.options?.length ||
            (t.channelTypes ?? t.channel_types)?.length !==
              e.channelTypes?.length ||
            (t.minValue ?? t.min_value) !== e.minValue ||
            (t.maxValue ?? t.max_value) !== e.maxValue ||
            (t.minLength ?? t.min_length) !== e.minLength ||
            (t.maxLength ?? t.max_length) !== e.maxLength ||
            !r(
              t.nameLocalizations ?? t.name_localizations ?? {},
              e.nameLocalizations ?? {}
            ) ||
            !r(
              t.descriptionLocalizations ?? t.description_localizations ?? {},
              e.descriptionLocalizations ?? {}
            )
          ) {
            return false
          }
          if (e.choices) {
            if (
              i &&
              !e.choices.every(
                (e, i) =>
                  e.name === t.choices[i].name &&
                  e.value === t.choices[i].value &&
                  r(
                    e.nameLocalizations ?? {},
                    t.choices[i].nameLocalizations ??
                      t.choices[i].name_localizations ??
                      {}
                  )
              )
            ) {
              return false
            }
            if (!i) {
              const i = new Map(t.choices.map((e) => [e.name, e]))
              for (const t of e.choices) {
                const e = i.get(t.name)
                if (!e || e.value !== t.value) return false
              }
            }
          }
          if (e.channelTypes) {
            const i = t.channelTypes ?? t.channel_types
            for (const t of e.channelTypes) {
              if (!i.includes(t)) return false
            }
          }
          if (e.options) {
            return this.optionsEqual(e.options, t.options, i)
          }
          return true
        }
        static transformOption(e, t) {
          const i = t ? 'channelTypes' : 'channel_types'
          const s = t ? 'minValue' : 'min_value'
          const r = t ? 'maxValue' : 'max_value'
          const a = t ? 'minLength' : 'min_length'
          const o = t ? 'maxLength' : 'max_length'
          const l = t ? 'nameLocalizations' : 'name_localizations'
          const c = t ? 'nameLocalized' : 'name_localized'
          const d = t ? 'descriptionLocalizations' : 'description_localizations'
          const u = t ? 'descriptionLocalized' : 'description_localized'
          return {
            type: e.type,
            name: e.name,
            [l]: e.nameLocalizations ?? e.name_localizations,
            [c]: e.nameLocalized ?? e.name_localized,
            description: e.description,
            [d]: e.descriptionLocalizations ?? e.description_localizations,
            [u]: e.descriptionLocalized ?? e.description_localized,
            required:
              e.required ??
              (e.type === n.Subcommand || e.type === n.SubcommandGroup
                ? undefined
                : false),
            autocomplete: e.autocomplete,
            choices: e.choices?.map((e) => ({
              name: e.name,
              [c]: e.nameLocalized ?? e.name_localized,
              [l]: e.nameLocalizations ?? e.name_localizations,
              value: e.value,
            })),
            options: e.options?.map((e) => this.transformOption(e, t)),
            [i]: e.channelTypes ?? e.channel_types,
            [s]: e.minValue ?? e.min_value,
            [r]: e.maxValue ?? e.max_value,
            [a]: e.minLength ?? e.min_length,
            [o]: e.maxLength ?? e.max_length,
          }
        }
      }
      e.exports = ApplicationCommand
    },
    8855: (e, t, i) => {
      'use strict'
      const { basename: s, flatten: n } = i(7966)
      class Attachment {
        constructor(e) {
          this.attachment = e.url
          this.name = e.filename
          this._patch(e)
        }
        _patch(e) {
          this.id = e.id
          if ('size' in e) {
            this.size = e.size
          }
          if ('url' in e) {
            this.url = e.url
          }
          if ('proxy_url' in e) {
            this.proxyURL = e.proxy_url
          }
          if ('height' in e) {
            this.height = e.height
          } else {
            this.height ??= null
          }
          if ('width' in e) {
            this.width = e.width
          } else {
            this.width ??= null
          }
          if ('content_type' in e) {
            this.contentType = e.content_type
          } else {
            this.contentType ??= null
          }
          if ('description' in e) {
            this.description = e.description
          } else {
            this.description ??= null
          }
          this.ephemeral = e.ephemeral ?? false
        }
        get spoiler() {
          return s(this.url ?? this.name).startsWith('SPOILER_')
        }
        toJSON() {
          return n(this)
        }
      }
      e.exports = Attachment
    },
    8114: (e, t, i) => {
      'use strict'
      const { basename: s, flatten: n } = i(7966)
      class AttachmentBuilder {
        constructor(e, t = {}) {
          this.attachment = e
          this.name = t.name
          this.description = t.description
        }
        setDescription(e) {
          this.description = e
          return this
        }
        setFile(e) {
          this.attachment = e
          return this
        }
        setName(e) {
          this.name = e
          return this
        }
        setSpoiler(e = true) {
          if (e === this.spoiler) return this
          if (!e) {
            while (this.spoiler) {
              this.name = this.name.slice('SPOILER_'.length)
            }
            return this
          }
          this.name = `SPOILER_${this.name}`
          return this
        }
        get spoiler() {
          return s(this.name).startsWith('SPOILER_')
        }
        toJSON() {
          return n(this)
        }
        static from(e) {
          return new AttachmentBuilder(e.attachment, {
            name: e.name,
            description: e.description,
          })
        }
      }
      e.exports = AttachmentBuilder
    },
    7333: (e) => {
      'use strict'
      class AutoModerationActionExecution {
        constructor(e, t) {
          this.guild = t
          this.action = e.action
          this.ruleId = e.rule_id
          this.ruleTriggerType = e.rule_trigger_type
          this.userId = e.user_id
          this.channelId = e.channel_id ?? null
          this.messageId = e.message_id ?? null
          this.alertSystemMessageId = e.alert_system_message_id ?? null
          this.content = e.content
          this.matchedKeyword = e.matched_keyword ?? null
          this.matchedContent = e.matched_content ?? null
        }
        get autoModerationRule() {
          return this.guild.autoModerationRules.cache.get(this.ruleId) ?? null
        }
      }
      e.exports = AutoModerationActionExecution
    },
    9974: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const n = i(4936)
      class AutoModerationRule extends n {
        constructor(e, t, i) {
          super(e)
          this.id = t.id
          this.guild = i
          this.creatorId = t.creator_id
          this.triggerType = t.trigger_type
          this._patch(t)
        }
        _patch(e) {
          if ('name' in e) {
            this.name = e.name
          }
          if ('event_type' in e) {
            this.eventType = e.event_type
          }
          if ('trigger_metadata' in e) {
            this.triggerMetadata = {
              keywordFilter: e.trigger_metadata.keyword_filter ?? [],
              regexPatterns: e.trigger_metadata.regex_patterns ?? [],
              presets: e.trigger_metadata.presets ?? [],
              allowList: e.trigger_metadata.allow_list ?? [],
              mentionTotalLimit: e.trigger_metadata.mention_total_limit ?? null,
            }
          }
          if ('actions' in e) {
            this.actions = e.actions.map((e) => ({
              type: e.type,
              metadata: {
                durationSeconds: e.metadata.duration_seconds ?? null,
                channelId: e.metadata.channel_id ?? null,
              },
            }))
          }
          if ('enabled' in e) {
            this.enabled = e.enabled
          }
          if ('exempt_roles' in e) {
            this.exemptRoles = new s(
              e.exempt_roles.map((e) => [e, this.guild.roles.cache.get(e)])
            )
          }
          if ('exempt_channels' in e) {
            this.exemptChannels = new s(
              e.exempt_channels.map((e) => [
                e,
                this.guild.channels.cache.get(e),
              ])
            )
          }
        }
        edit(e) {
          return this.guild.autoModerationRules.edit(this.id, e)
        }
        delete(e) {
          return this.guild.autoModerationRules.delete(this.id, e)
        }
        setName(e, t) {
          return this.edit({ name: e, reason: t })
        }
        setEventType(e, t) {
          return this.edit({ eventType: e, reason: t })
        }
        setKeywordFilter(e, t) {
          return this.edit({ triggerMetadata: { keywordFilter: e }, reason: t })
        }
        setRegexPatterns(e, t) {
          return this.edit({ triggerMetadata: { regexPatterns: e }, reason: t })
        }
        setPresets(e, t) {
          return this.edit({ triggerMetadata: { presets: e }, reason: t })
        }
        setAllowList(e, t) {
          return this.edit({ triggerMetadata: { allowList: e }, reason: t })
        }
        setMentionTotalLimit(e, t) {
          return this.edit({
            triggerMetadata: { mentionTotalLimit: e },
            reason: t,
          })
        }
        setActions(e, t) {
          return this.edit({ actions: e, reason: t })
        }
        setEnabled(e = true, t) {
          return this.edit({ enabled: e, reason: t })
        }
        setExemptRoles(e, t) {
          return this.edit({ exemptRoles: e, reason: t })
        }
        setExemptChannels(e, t) {
          return this.edit({ exemptChannels: e, reason: t })
        }
      }
      e.exports = AutoModerationRule
    },
    5767: (e, t, i) => {
      'use strict'
      const { InteractionResponseType: s, Routes: n } = i(2)
      const r = i(1879)
      const a = i(792)
      const { DiscordjsError: o, ErrorCodes: l } = i(8951)
      class AutocompleteInteraction extends r {
        constructor(e, t) {
          super(e, t)
          this.commandId = t.data.id
          this.commandName = t.data.name
          this.commandType = t.data.type
          this.commandGuildId = t.data.guild_id ?? null
          this.responded = false
          this.options = new a(this.client, t.data.options ?? [])
        }
        get command() {
          const e = this.commandId
          return (
            this.guild?.commands.cache.get(e) ??
            this.client.application.commands.cache.get(e) ??
            null
          )
        }
        async respond(e) {
          if (this.responded) throw new o(l.InteractionAlreadyReplied)
          await this.client.rest.post(
            n.interactionCallback(this.id, this.token),
            {
              body: {
                type: s.ApplicationCommandAutocompleteResult,
                data: { choices: e },
              },
              auth: false,
            }
          )
          this.responded = true
        }
      }
      e.exports = AutocompleteInteraction
    },
    4936: (e, t, i) => {
      'use strict'
      const { flatten: s } = i(7966)
      class Base {
        constructor(e) {
          Object.defineProperty(this, 'client', { value: e })
        }
        _clone() {
          return Object.assign(Object.create(this), this)
        }
        _patch(e) {
          return e
        }
        _update(e) {
          const t = this._clone()
          this._patch(e)
          return t
        }
        toJSON(...e) {
          return s(this, ...e)
        }
        valueOf() {
          return this.id
        }
      }
      e.exports = Base
    },
    6948: (e, t, i) => {
      'use strict'
      const { channelLink: s } = i(2547)
      const { DiscordSnowflake: n } = i(8673)
      const { ChannelType: r, Routes: a } = i(2)
      const o = i(4936)
      const l = i(4874)
      const { ThreadChannelTypes: c } = i(6047)
      class BaseChannel extends o {
        constructor(e, t, i = true) {
          super(e)
          this.type = t.type
          if (t && i) this._patch(t)
        }
        _patch(e) {
          if ('flags' in e) {
            this.flags = new l(e.flags).freeze()
          } else {
            this.flags ??= new l().freeze()
          }
          this.id = e.id
        }
        get createdTimestamp() {
          return n.timestampFrom(this.id)
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
        get url() {
          return this.isDMBased() ? s(this.id) : s(this.id, this.guildId)
        }
        get partial() {
          return false
        }
        toString() {
          return `<#${this.id}>`
        }
        async delete() {
          await this.client.rest.delete(a.channel(this.id))
          return this
        }
        fetch(e = true) {
          return this.client.channels.fetch(this.id, { force: e })
        }
        isThread() {
          return c.includes(this.type)
        }
        isTextBased() {
          return 'messages' in this
        }
        isDMBased() {
          return [r.DM, r.GroupDM].includes(this.type)
        }
        isVoiceBased() {
          return 'bitrate' in this
        }
        toJSON(...e) {
          return super.toJSON({ createdTimestamp: true }, ...e)
        }
      }
      t.BaseChannel = BaseChannel
    },
    6918: (e, t, i) => {
      'use strict'
      const { makeURLSearchParams: s } = i(1372)
      const { DiscordSnowflake: n } = i(8673)
      const { Routes: r, GuildFeature: a } = i(2)
      const o = i(4936)
      class BaseGuild extends o {
        constructor(e, t) {
          super(e)
          this.id = t.id
          this.name = t.name
          this.icon = t.icon
          this.features = t.features
        }
        get createdTimestamp() {
          return n.timestampFrom(this.id)
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
        get nameAcronym() {
          return this.name
            .replace(/'s /g, ' ')
            .replace(/\w+/g, (e) => e[0])
            .replace(/\s/g, '')
        }
        get partnered() {
          return this.features.includes(a.Partnered)
        }
        get verified() {
          return this.features.includes(a.Verified)
        }
        iconURL(e = {}) {
          return this.icon && this.client.rest.cdn.icon(this.id, this.icon, e)
        }
        async fetch() {
          const e = await this.client.rest.get(r.guild(this.id), {
            query: s({ with_counts: true }),
          })
          return this.client.guilds._add(e)
        }
        toString() {
          return this.name
        }
      }
      e.exports = BaseGuild
    },
    8708: (e, t, i) => {
      'use strict'
      const { Emoji: s } = i(1168)
      class BaseGuildEmoji extends s {
        constructor(e, t, i) {
          super(e, t)
          this.guild = i
          this.requiresColons = null
          this.managed = null
          this.available = null
          this._patch(t)
        }
        _patch(e) {
          if ('name' in e) this.name = e.name
          if ('require_colons' in e) {
            this.requiresColons = e.require_colons
          }
          if ('managed' in e) {
            this.managed = e.managed
          }
          if ('available' in e) {
            this.available = e.available
          }
        }
      }
      e.exports = BaseGuildEmoji
    },
    8967: (e, t, i) => {
      'use strict'
      const s = i(3883)
      const n = i(5954)
      const r = i(2808)
      const a = i(9903)
      class BaseGuildTextChannel extends s {
        constructor(e, t, i) {
          super(e, t, i, false)
          this.messages = new a(this)
          this.threads = new r(this)
          this.nsfw = Boolean(t.nsfw)
          this._patch(t)
        }
        _patch(e) {
          super._patch(e)
          if ('topic' in e) {
            this.topic = e.topic
          }
          if ('nsfw' in e) {
            this.nsfw = Boolean(e.nsfw)
          }
          if ('last_message_id' in e) {
            this.lastMessageId = e.last_message_id
          }
          if ('last_pin_timestamp' in e) {
            this.lastPinTimestamp = e.last_pin_timestamp
              ? Date.parse(e.last_pin_timestamp)
              : null
          }
          if ('default_auto_archive_duration' in e) {
            this.defaultAutoArchiveDuration = e.default_auto_archive_duration
          }
          if ('messages' in e) {
            for (const t of e.messages) this.messages._add(t)
          }
        }
        setDefaultAutoArchiveDuration(e, t) {
          return this.edit({ defaultAutoArchiveDuration: e, reason: t })
        }
        setType(e, t) {
          return this.edit({ type: e, reason: t })
        }
        setTopic(e, t) {
          return this.edit({ topic: e, reason: t })
        }
        createInvite(e) {
          return this.guild.invites.create(this.id, e)
        }
        fetchInvites(e = true) {
          return this.guild.invites.fetch({ channelId: this.id, cache: e })
        }
        get lastMessage() {}
        get lastPinAt() {}
        send() {}
        sendTyping() {}
        createMessageCollector() {}
        awaitMessages() {}
        createMessageComponentCollector() {}
        awaitMessageComponent() {}
        bulkDelete() {}
        fetchWebhooks() {}
        createWebhook() {}
        setRateLimitPerUser() {}
        setNSFW() {}
      }
      n.applyToClass(BaseGuildTextChannel, true)
      e.exports = BaseGuildTextChannel
    },
    9417: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { PermissionFlagsBits: n } = i(2)
      const r = i(3883)
      class BaseGuildVoiceChannel extends r {
        _patch(e) {
          super._patch(e)
          if ('rtc_region' in e) {
            this.rtcRegion = e.rtc_region
          }
          if ('bitrate' in e) {
            this.bitrate = e.bitrate
          }
          if ('user_limit' in e) {
            this.userLimit = e.user_limit
          }
        }
        get members() {
          const e = new s()
          for (const t of this.guild.voiceStates.cache.values()) {
            if (t.channelId === this.id && t.member) {
              e.set(t.id, t.member)
            }
          }
          return e
        }
        get full() {
          return this.userLimit > 0 && this.members.size >= this.userLimit
        }
        get joinable() {
          if (!this.viewable) return false
          const e = this.permissionsFor(this.client.user)
          if (!e) return false
          if (e.has(n.Administrator, false)) return true
          return (
            this.guild.members.me.communicationDisabledUntilTimestamp <
              Date.now() && e.has(n.Connect, false)
          )
        }
        setRTCRegion(e, t) {
          return this.edit({ rtcRegion: e, reason: t })
        }
        createInvite(e) {
          return this.guild.invites.create(this.id, e)
        }
        fetchInvites(e = true) {
          return this.guild.invites.fetch({ channelId: this.id, cache: e })
        }
      }
      e.exports = BaseGuildVoiceChannel
    },
    1879: (e, t, i) => {
      'use strict'
      const { deprecate: s } = i(7261)
      const { DiscordSnowflake: n } = i(8673)
      const {
        InteractionType: r,
        ApplicationCommandType: a,
        ComponentType: o,
      } = i(2)
      const l = i(4936)
      const { SelectMenuTypes: c } = i(6047)
      const d = i(9238)
      class BaseInteraction extends l {
        constructor(e, t) {
          super(e)
          this.type = t.type
          this.id = t.id
          Object.defineProperty(this, 'token', { value: t.token })
          this.applicationId = t.application_id
          this.channelId = t.channel_id ?? null
          this.guildId = t.guild_id ?? null
          this.user = this.client.users._add(t.user ?? t.member.user)
          this.member = t.member
            ? this.guild?.members._add(t.member) ?? t.member
            : null
          this.version = t.version
          this.appPermissions = t.app_permissions
            ? new d(t.app_permissions).freeze()
            : null
          this.memberPermissions = t.member?.permissions
            ? new d(t.member.permissions).freeze()
            : null
          this.locale = t.locale
          this.guildLocale = t.guild_locale ?? null
        }
        get createdTimestamp() {
          return n.timestampFrom(this.id)
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
        get channel() {
          return this.client.channels.cache.get(this.channelId) ?? null
        }
        get guild() {
          return this.client.guilds.cache.get(this.guildId) ?? null
        }
        inGuild() {
          return Boolean(this.guildId && this.member)
        }
        inCachedGuild() {
          return Boolean(this.guild && this.member)
        }
        inRawGuild() {
          return Boolean(this.guildId && !this.guild && this.member)
        }
        isAutocomplete() {
          return this.type === r.ApplicationCommandAutocomplete
        }
        isCommand() {
          return this.type === r.ApplicationCommand
        }
        isChatInputCommand() {
          return (
            this.type === r.ApplicationCommand &&
            this.commandType === a.ChatInput
          )
        }
        isContextMenuCommand() {
          return (
            this.type === r.ApplicationCommand &&
            [a.User, a.Message].includes(this.commandType)
          )
        }
        isMessageComponent() {
          return this.type === r.MessageComponent
        }
        isModalSubmit() {
          return this.type === r.ModalSubmit
        }
        isUserContextMenuCommand() {
          return this.isContextMenuCommand() && this.commandType === a.User
        }
        isMessageContextMenuCommand() {
          return this.isContextMenuCommand() && this.commandType === a.Message
        }
        isButton() {
          return (
            this.type === r.MessageComponent && this.componentType === o.Button
          )
        }
        isSelectMenu() {
          return this.isStringSelectMenu()
        }
        isAnySelectMenu() {
          return (
            this.type === r.MessageComponent && c.includes(this.componentType)
          )
        }
        isStringSelectMenu() {
          return (
            this.type === r.MessageComponent &&
            this.componentType === o.StringSelect
          )
        }
        isUserSelectMenu() {
          return (
            this.type === r.MessageComponent &&
            this.componentType === o.UserSelect
          )
        }
        isRoleSelectMenu() {
          return (
            this.type === r.MessageComponent &&
            this.componentType === o.RoleSelect
          )
        }
        isChannelSelectMenu() {
          return (
            this.type === r.MessageComponent &&
            this.componentType === o.ChannelSelect
          )
        }
        isMentionableSelectMenu() {
          return (
            this.type === r.MessageComponent &&
            this.componentType === o.MentionableSelect
          )
        }
        isRepliable() {
          return ![r.Ping, r.ApplicationCommandAutocomplete].includes(this.type)
        }
      }
      BaseInteraction.prototype.isSelectMenu = s(
        BaseInteraction.prototype.isSelectMenu,
        'BaseInteraction#isSelectMenu() is deprecated. Use BaseInteraction#isStringSelectMenu() instead.'
      )
      e.exports = BaseInteraction
    },
    6386: (e, t, i) => {
      'use strict'
      const s = i(1688)
      class BaseSelectMenuComponent extends s {
        get placeholder() {
          return this.data.placeholder ?? null
        }
        get maxValues() {
          return this.data.max_values ?? null
        }
        get minValues() {
          return this.data.min_values ?? null
        }
        get customId() {
          return this.data.custom_id
        }
        get disabled() {
          return this.data.disabled ?? null
        }
      }
      e.exports = BaseSelectMenuComponent
    },
    6925: (e, t, i) => {
      'use strict'
      const { ButtonBuilder: s, isJSONEncodable: n } = i(2547)
      const { toSnakeCase: r } = i(7910)
      const { resolvePartialEmoji: a } = i(7966)
      class ButtonBuilder extends s {
        constructor({ emoji: e, ...t } = {}) {
          super(r({ ...t, emoji: e && typeof e === 'string' ? a(e) : e }))
        }
        setEmoji(e) {
          if (typeof e === 'string') {
            return super.setEmoji(a(e))
          }
          return super.setEmoji(e)
        }
        static from(e) {
          if (n(e)) {
            return new this(e.toJSON())
          }
          return new this(e)
        }
      }
      e.exports = ButtonBuilder
    },
    3700: (e, t, i) => {
      'use strict'
      const s = i(1688)
      class ButtonComponent extends s {
        get style() {
          return this.data.style
        }
        get label() {
          return this.data.label ?? null
        }
        get emoji() {
          return this.data.emoji ?? null
        }
        get disabled() {
          return this.data.disabled ?? null
        }
        get customId() {
          return this.data.custom_id ?? null
        }
        get url() {
          return this.data.url ?? null
        }
      }
      e.exports = ButtonComponent
    },
    5282: (e, t, i) => {
      'use strict'
      const s = i(8341)
      class ButtonInteraction extends s {}
      e.exports = ButtonInteraction
    },
    1451: (e, t, i) => {
      'use strict'
      const s = i(3883)
      const n = i(3434)
      class CategoryChannel extends s {
        get children() {
          return new n(this)
        }
      }
      e.exports = CategoryChannel
    },
    881: (e, t, i) => {
      'use strict'
      const { ChannelSelectMenuBuilder: s, isJSONEncodable: n } = i(2547)
      const { toSnakeCase: r } = i(7910)
      class ChannelSelectMenuBuilder extends s {
        constructor(e = {}) {
          super(r(e))
        }
        static from(e) {
          if (n(e)) {
            return new this(e.toJSON())
          }
          return new this(e)
        }
      }
      e.exports = ChannelSelectMenuBuilder
    },
    1749: (e, t, i) => {
      'use strict'
      const s = i(6386)
      class ChannelSelectMenuComponent extends s {
        get channelTypes() {
          return this.data.channel_types ?? null
        }
      }
      e.exports = ChannelSelectMenuComponent
    },
    2731: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const n = i(8341)
      class ChannelSelectMenuInteraction extends n {
        constructor(e, t) {
          super(e, t)
          const { resolved: i, values: n } = t.data
          this.values = n ?? []
          this.channels = new s()
          for (const e of Object.values(i?.channels ?? {})) {
            this.channels.set(
              e.id,
              this.client.channels._add(e, this.guild) ?? e
            )
          }
        }
      }
      e.exports = ChannelSelectMenuInteraction
    },
    5737: (e, t, i) => {
      'use strict'
      const s = i(7155)
      const n = i(792)
      class ChatInputCommandInteraction extends s {
        constructor(e, t) {
          super(e, t)
          this.options = new n(
            this.client,
            t.data.options?.map((e) =>
              this.transformOption(e, t.data.resolved)
            ) ?? [],
            this.transformResolved(t.data.resolved ?? {})
          )
        }
        toString() {
          const e = [
            this.commandName,
            this.options._group,
            this.options._subcommand,
            ...this.options._hoistedOptions.map((e) => `${e.name}:${e.value}`),
          ]
          return `/${e.filter(Boolean).join(' ')}`
        }
      }
      e.exports = ChatInputCommandInteraction
    },
    7538: (e, t, i) => {
      'use strict'
      const { Routes: s } = i(2)
      const n = i(2683)
      const r = i(174)
      const a = i(8050)
      const o = i(2152)
      const l = i(9238)
      class ClientApplication extends r {
        constructor(e, t) {
          super(e, t)
          this.commands = new a(this.client)
        }
        _patch(e) {
          super._patch(e)
          this.tags = e.tags ?? []
          if ('install_params' in e) {
            this.installParams = {
              scopes: e.install_params.scopes,
              permissions: new l(e.install_params.permissions).freeze(),
            }
          } else {
            this.installParams ??= null
          }
          if ('custom_install_url' in e) {
            this.customInstallURL = e.custom_install_url
          } else {
            this.customInstallURL = null
          }
          if ('flags' in e) {
            this.flags = new o(e.flags).freeze()
          }
          if ('cover_image' in e) {
            this.cover = e.cover_image
          } else {
            this.cover ??= null
          }
          if ('rpc_origins' in e) {
            this.rpcOrigins = e.rpc_origins
          } else {
            this.rpcOrigins ??= []
          }
          if ('bot_require_code_grant' in e) {
            this.botRequireCodeGrant = e.bot_require_code_grant
          } else {
            this.botRequireCodeGrant ??= null
          }
          if ('bot_public' in e) {
            this.botPublic = e.bot_public
          } else {
            this.botPublic ??= null
          }
          this.owner = e.team
            ? new n(this.client, e.team)
            : e.owner
            ? this.client.users._add(e.owner)
            : this.owner ?? null
        }
        get partial() {
          return !this.name
        }
        async fetch() {
          const e = await this.client.rest.get(s.oauth2CurrentApplication())
          this._patch(e)
          return this
        }
      }
      e.exports = ClientApplication
    },
    7057: (e, t, i) => {
      'use strict'
      const { GatewayOpcodes: s } = i(2)
      const { Presence: n } = i(4253)
      const { DiscordjsTypeError: r, ErrorCodes: a } = i(8951)
      class ClientPresence extends n {
        constructor(e, t = {}) {
          super(
            e,
            Object.assign(t, {
              status: t.status ?? 'online',
              user: { id: null },
            })
          )
        }
        set(e) {
          const t = this._parse(e)
          this._patch(t)
          if (typeof e.shardId === 'undefined') {
            this.client.ws.broadcast({ op: s.PresenceUpdate, d: t })
          } else if (Array.isArray(e.shardId)) {
            for (const i of e.shardId) {
              this.client.ws.shards.get(i).send({ op: s.PresenceUpdate, d: t })
            }
          } else {
            this.client.ws.shards
              .get(e.shardId)
              .send({ op: s.PresenceUpdate, d: t })
          }
          return this
        }
        _parse({ status: e, since: t, afk: i, activities: s }) {
          const n = {
            activities: [],
            afk: typeof i === 'boolean' ? i : false,
            since: typeof t === 'number' && !Number.isNaN(t) ? t : null,
            status: e ?? this.status,
          }
          if (s?.length) {
            for (const [e, t] of s.entries()) {
              if (typeof t.name !== 'string') {
                throw new r(a.InvalidType, `activities[${e}].name`, 'string')
              }
              t.type ??= 0
              n.activities.push({ type: t.type, name: t.name, url: t.url })
            }
          } else if (!s && (e || i || t) && this.activities.length) {
            n.activities.push(
              ...this.activities.map((e) => ({
                name: e.name,
                type: e.type,
                url: e.url ?? undefined,
              }))
            )
          }
          return n
        }
      }
      e.exports = ClientPresence
    },
    2355: (e, t, i) => {
      'use strict'
      const { Routes: s } = i(2)
      const n = i(8569)
      const r = i(3989)
      class ClientUser extends n {
        _patch(e) {
          super._patch(e)
          if ('verified' in e) {
            this.verified = e.verified
          }
          if ('mfa_enabled' in e) {
            this.mfaEnabled =
              typeof e.mfa_enabled === 'boolean' ? e.mfa_enabled : null
          } else {
            this.mfaEnabled ??= null
          }
          if ('token' in e) this.client.token = e.token
        }
        get presence() {
          return this.client.presence
        }
        async edit(e) {
          if (typeof e.avatar !== 'undefined')
            e.avatar = await r.resolveImage(e.avatar)
          const t = await this.client.rest.patch(s.user(), { body: e })
          this.client.token = t.token
          this.client.rest.setToken(t.token)
          const { updated: i } = this.client.actions.UserUpdate.handle(t)
          return i ?? this
        }
        setUsername(e) {
          return this.edit({ username: e })
        }
        setAvatar(e) {
          return this.edit({ avatar: e })
        }
        setPresence(e) {
          return this.client.presence.set(e)
        }
        setStatus(e, t) {
          return this.setPresence({ status: e, shardId: t })
        }
        setActivity(e, t = {}) {
          if (!e)
            return this.setPresence({ activities: [], shardId: t.shardId })
          const i = Object.assign(
            {},
            t,
            typeof e === 'object' ? e : { name: e }
          )
          return this.setPresence({ activities: [i], shardId: i.shardId })
        }
        setAFK(e = true, t) {
          return this.setPresence({ afk: e, shardId: t })
        }
      }
      e.exports = ClientUser
    },
    7155: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const n = i(8855)
      const r = i(1879)
      const a = i(3445)
      const o = i(2047)
      class CommandInteraction extends r {
        constructor(e, t) {
          super(e, t)
          this.commandId = t.data.id
          this.commandName = t.data.name
          this.commandType = t.data.type
          this.commandGuildId = t.data.guild_id ?? null
          this.deferred = false
          this.replied = false
          this.ephemeral = null
          this.webhook = new a(this.client, this.applicationId, this.token)
        }
        get command() {
          const e = this.commandId
          return (
            this.guild?.commands.cache.get(e) ??
            this.client.application.commands.cache.get(e) ??
            null
          )
        }
        transformResolved({
          members: e,
          users: t,
          channels: i,
          roles: r,
          messages: a,
          attachments: o,
        }) {
          const l = {}
          if (e) {
            l.members = new s()
            for (const [i, s] of Object.entries(e)) {
              const e = t[i]
              l.members.set(i, this.guild?.members._add({ user: e, ...s }) ?? s)
            }
          }
          if (t) {
            l.users = new s()
            for (const e of Object.values(t)) {
              l.users.set(e.id, this.client.users._add(e))
            }
          }
          if (r) {
            l.roles = new s()
            for (const e of Object.values(r)) {
              l.roles.set(e.id, this.guild?.roles._add(e) ?? e)
            }
          }
          if (i) {
            l.channels = new s()
            for (const e of Object.values(i)) {
              l.channels.set(
                e.id,
                this.client.channels._add(e, this.guild) ?? e
              )
            }
          }
          if (a) {
            l.messages = new s()
            for (const e of Object.values(a)) {
              l.messages.set(e.id, this.channel?.messages?._add(e) ?? e)
            }
          }
          if (o) {
            l.attachments = new s()
            for (const e of Object.values(o)) {
              const t = new n(e)
              l.attachments.set(e.id, t)
            }
          }
          return l
        }
        transformOption(e, t) {
          const i = { name: e.name, type: e.type }
          if ('value' in e) i.value = e.value
          if ('options' in e)
            i.options = e.options.map((e) => this.transformOption(e, t))
          if (t) {
            const s = t.users?.[e.value]
            if (s) i.user = this.client.users._add(s)
            const r = t.members?.[e.value]
            if (r) i.member = this.guild?.members._add({ user: s, ...r }) ?? r
            const a = t.channels?.[e.value]
            if (a) i.channel = this.client.channels._add(a, this.guild) ?? a
            const o = t.roles?.[e.value]
            if (o) i.role = this.guild?.roles._add(o) ?? o
            const l = t.attachments?.[e.value]
            if (l) i.attachment = new n(l)
          }
          return i
        }
        deferReply() {}
        reply() {}
        fetchReply() {}
        editReply() {}
        deleteReply() {}
        followUp() {}
        showModal() {}
        awaitModalSubmit() {}
      }
      o.applyToClass(CommandInteraction, ['deferUpdate', 'update'])
      e.exports = CommandInteraction
    },
    792: (e, t, i) => {
      'use strict'
      const { ApplicationCommandOptionType: s } = i(2)
      const { DiscordjsTypeError: n, ErrorCodes: r } = i(8951)
      class CommandInteractionOptionResolver {
        constructor(e, t, i) {
          Object.defineProperty(this, 'client', { value: e })
          this._group = null
          this._subcommand = null
          this._hoistedOptions = t
          if (this._hoistedOptions[0]?.type === s.SubcommandGroup) {
            this._group = this._hoistedOptions[0].name
            this._hoistedOptions = this._hoistedOptions[0].options ?? []
          }
          if (this._hoistedOptions[0]?.type === s.Subcommand) {
            this._subcommand = this._hoistedOptions[0].name
            this._hoistedOptions = this._hoistedOptions[0].options ?? []
          }
          Object.defineProperty(this, 'data', { value: Object.freeze([...t]) })
          Object.defineProperty(this, 'resolved', {
            value: i ? Object.freeze(i) : null,
          })
        }
        get(e, t = false) {
          const i = this._hoistedOptions.find((t) => t.name === e)
          if (!i) {
            if (t) {
              throw new n(r.CommandInteractionOptionNotFound, e)
            }
            return null
          }
          return i
        }
        _getTypedOption(e, t, i, s) {
          const a = this.get(e, s)
          if (!a) {
            return null
          } else if (a.type !== t) {
            throw new n(r.CommandInteractionOptionType, e, a.type, t)
          } else if (
            s &&
            i.every((e) => a[e] === null || typeof a[e] === 'undefined')
          ) {
            throw new n(r.CommandInteractionOptionEmpty, e, a.type)
          }
          return a
        }
        getSubcommand(e = true) {
          if (e && !this._subcommand) {
            throw new n(r.CommandInteractionOptionNoSubcommand)
          }
          return this._subcommand
        }
        getSubcommandGroup(e = false) {
          if (e && !this._group) {
            throw new n(r.CommandInteractionOptionNoSubcommandGroup)
          }
          return this._group
        }
        getBoolean(e, t = false) {
          const i = this._getTypedOption(e, s.Boolean, ['value'], t)
          return i?.value ?? null
        }
        getChannel(e, t = false) {
          const i = this._getTypedOption(e, s.Channel, ['channel'], t)
          return i?.channel ?? null
        }
        getString(e, t = false) {
          const i = this._getTypedOption(e, s.String, ['value'], t)
          return i?.value ?? null
        }
        getInteger(e, t = false) {
          const i = this._getTypedOption(e, s.Integer, ['value'], t)
          return i?.value ?? null
        }
        getNumber(e, t = false) {
          const i = this._getTypedOption(e, s.Number, ['value'], t)
          return i?.value ?? null
        }
        getUser(e, t = false) {
          const i = this._getTypedOption(e, s.User, ['user'], t)
          return i?.user ?? null
        }
        getMember(e) {
          const t = this._getTypedOption(e, s.User, ['member'], false)
          return t?.member ?? null
        }
        getRole(e, t = false) {
          const i = this._getTypedOption(e, s.Role, ['role'], t)
          return i?.role ?? null
        }
        getAttachment(e, t = false) {
          const i = this._getTypedOption(e, s.Attachment, ['attachment'], t)
          return i?.attachment ?? null
        }
        getMentionable(e, t = false) {
          const i = this._getTypedOption(
            e,
            s.Mentionable,
            ['user', 'member', 'role'],
            t
          )
          return i?.member ?? i?.user ?? i?.role ?? null
        }
        getMessage(e, t = false) {
          const i = this._getTypedOption(e, '_MESSAGE', ['message'], t)
          return i?.message ?? null
        }
        getFocused(e = false) {
          const t = this._hoistedOptions.find((e) => e.focused)
          if (!t) throw new n(r.AutocompleteInteractionOptionNoFocusedOption)
          return e ? t : t.value
        }
      }
      e.exports = CommandInteractionOptionResolver
    },
    1688: (e, t, i) => {
      'use strict'
      const s = i(1230)
      class Component {
        constructor(e) {
          this.data = e
        }
        get type() {
          return this.data.type
        }
        equals(e) {
          if (e instanceof Component) {
            return s(e.data, this.data)
          }
          return s(e, this.data)
        }
        toJSON() {
          return { ...this.data }
        }
      }
      e.exports = Component
    },
    47: (e, t, i) => {
      'use strict'
      const { lazy: s } = i(9575)
      const { ApplicationCommandOptionType: n } = i(2)
      const r = i(7155)
      const a = i(792)
      const o = s(() => i(6774).Message)
      class ContextMenuCommandInteraction extends r {
        constructor(e, t) {
          super(e, t)
          this.options = new a(
            this.client,
            this.resolveContextMenuOptions(t.data),
            this.transformResolved(t.data.resolved)
          )
          this.targetId = t.data.target_id
        }
        resolveContextMenuOptions({ target_id: e, resolved: t }) {
          const i = []
          if (t.users?.[e]) {
            i.push(
              this.transformOption({ name: 'user', type: n.User, value: e }, t)
            )
          }
          if (t.messages?.[e]) {
            i.push({
              name: 'message',
              type: '_MESSAGE',
              value: e,
              message:
                this.channel?.messages._add(t.messages[e]) ??
                new (o())(this.client, t.messages[e]),
            })
          }
          return i
        }
      }
      e.exports = ContextMenuCommandInteraction
    },
    460: (e, t, i) => {
      'use strict'
      const { userMention: s } = i(2547)
      const { ChannelType: n } = i(2)
      const { BaseChannel: r } = i(6948)
      const a = i(5954)
      const o = i(9903)
      const l = i(527)
      class DMChannel extends r {
        constructor(e, t) {
          super(e, t)
          this.type = n.DM
          this.messages = new o(this)
        }
        _patch(e) {
          super._patch(e)
          if (e.recipients) {
            const t = e.recipients[0]
            this.recipientId = t.id
            if (
              'username' in t ||
              this.client.options.partials.includes(l.Users)
            ) {
              this.client.users._add(t)
            }
          }
          if ('last_message_id' in e) {
            this.lastMessageId = e.last_message_id
          }
          if ('last_pin_timestamp' in e) {
            this.lastPinTimestamp = Date.parse(e.last_pin_timestamp)
          } else {
            this.lastPinTimestamp ??= null
          }
        }
        get partial() {
          return typeof this.lastMessageId === 'undefined'
        }
        get recipient() {
          return this.client.users.resolve(this.recipientId)
        }
        fetch(e = true) {
          return this.client.users.createDM(this.recipientId, { force: e })
        }
        toString() {
          return s(this.recipientId)
        }
        get lastMessage() {}
        get lastPinAt() {}
        send() {}
        sendTyping() {}
        createMessageCollector() {}
        awaitMessages() {}
        createMessageComponentCollector() {}
        awaitMessageComponent() {}
      }
      a.applyToClass(DMChannel, true, [
        'bulkDelete',
        'fetchWebhooks',
        'createWebhook',
        'setRateLimitPerUser',
        'setNSFW',
      ])
      e.exports = DMChannel
    },
    6133: (e, t, i) => {
      'use strict'
      const { BaseChannel: s } = i(6948)
      class DirectoryChannel extends s {
        constructor(e, t, i) {
          super(i, t)
          this.guild = e
          this.guildId = e.id
        }
        _patch(e) {
          super._patch(e)
          this.name = e.name
        }
      }
      e.exports = DirectoryChannel
    },
    1458: (e, t, i) => {
      'use strict'
      const { embedLength: s } = i(2547)
      const n = i(1230)
      class Embed {
        constructor(e) {
          this.data = { ...e }
        }
        get fields() {
          return this.data.fields ?? []
        }
        get title() {
          return this.data.title ?? null
        }
        get description() {
          return this.data.description ?? null
        }
        get url() {
          return this.data.url ?? null
        }
        get color() {
          return this.data.color ?? null
        }
        get timestamp() {
          return this.data.timestamp ?? null
        }
        get thumbnail() {
          if (!this.data.thumbnail) return null
          return {
            url: this.data.thumbnail.url,
            proxyURL: this.data.thumbnail.proxy_url,
            height: this.data.thumbnail.height,
            width: this.data.thumbnail.width,
          }
        }
        get image() {
          if (!this.data.image) return null
          return {
            url: this.data.image.url,
            proxyURL: this.data.image.proxy_url,
            height: this.data.image.height,
            width: this.data.image.width,
          }
        }
        get video() {
          if (!this.data.video) return null
          return {
            url: this.data.video.url,
            proxyURL: this.data.video.proxy_url,
            height: this.data.video.height,
            width: this.data.video.width,
          }
        }
        get author() {
          if (!this.data.author) return null
          return {
            name: this.data.author.name,
            url: this.data.author.url,
            iconURL: this.data.author.icon_url,
            proxyIconURL: this.data.author.proxy_icon_url,
          }
        }
        get provider() {
          return this.data.provider ?? null
        }
        get footer() {
          if (!this.data.footer) return null
          return {
            text: this.data.footer.text,
            iconURL: this.data.footer.icon_url,
            proxyIconURL: this.data.footer.proxy_icon_url,
          }
        }
        get length() {
          return s(this.data)
        }
        get hexColor() {
          return typeof this.data.color === 'number'
            ? `#${this.data.color.toString(16).padStart(6, '0')}`
            : this.data.color ?? null
        }
        toJSON() {
          return { ...this.data }
        }
        equals(e) {
          if (e instanceof Embed) {
            return n(e.data, this.data)
          }
          return n(e, this.data)
        }
      }
      e.exports = Embed
    },
    9237: (e, t, i) => {
      'use strict'
      const { EmbedBuilder: s, isJSONEncodable: n } = i(2547)
      const { toSnakeCase: r } = i(7910)
      const { resolveColor: a } = i(7966)
      class EmbedBuilder extends s {
        constructor(e) {
          super(r(e))
        }
        setColor(e) {
          return super.setColor(e && a(e))
        }
        static from(e) {
          if (n(e)) {
            return new this(e.toJSON())
          }
          return new this(e)
        }
      }
      e.exports = EmbedBuilder
    },
    1168: (e, t, i) => {
      'use strict'
      const { DiscordSnowflake: s } = i(8673)
      const n = i(4936)
      class Emoji extends n {
        constructor(e, t) {
          super(e)
          this.animated = t.animated ?? null
          this.name = t.name ?? null
          this.id = t.id
        }
        get identifier() {
          if (this.id)
            return `${this.animated ? 'a:' : ''}${this.name}:${this.id}`
          return encodeURIComponent(this.name)
        }
        get url() {
          return (
            this.id &&
            this.client.rest.cdn.emoji(this.id, this.animated ? 'gif' : 'png')
          )
        }
        get createdTimestamp() {
          return this.id && s.timestampFrom(this.id)
        }
        get createdAt() {
          return this.id && new Date(this.createdTimestamp)
        }
        toString() {
          return this.id
            ? `<${this.animated ? 'a' : ''}:${this.name}:${this.id}>`
            : this.name
        }
        toJSON() {
          return super.toJSON({
            guild: 'guildId',
            createdTimestamp: true,
            url: true,
            identifier: true,
          })
        }
      }
      t.Emoji = Emoji
    },
    5023: (e, t, i) => {
      'use strict'
      const s = i(3883)
      const n = i(5954)
      const r = i(3766)
      const {
        transformAPIGuildForumTag: a,
        transformAPIGuildDefaultReaction: o,
      } = i(275)
      class ForumChannel extends s {
        constructor(e, t, i) {
          super(e, t, i, false)
          this.threads = new r(this)
          this._patch(t)
        }
        _patch(e) {
          super._patch(e)
          if ('available_tags' in e) {
            this.availableTags = e.available_tags.map((e) => a(e))
          } else {
            this.availableTags ??= []
          }
          if ('default_reaction_emoji' in e) {
            this.defaultReactionEmoji = e.default_reaction_emoji
              ? o(e.default_reaction_emoji)
              : null
          } else {
            this.defaultReactionEmoji ??= null
          }
          if ('default_thread_rate_limit_per_user' in e) {
            this.defaultThreadRateLimitPerUser =
              e.default_thread_rate_limit_per_user
          } else {
            this.defaultThreadRateLimitPerUser ??= null
          }
          if ('rate_limit_per_user' in e) {
            this.rateLimitPerUser = e.rate_limit_per_user
          } else {
            this.rateLimitPerUser ??= null
          }
          if ('default_auto_archive_duration' in e) {
            this.defaultAutoArchiveDuration = e.default_auto_archive_duration
          } else {
            this.defaultAutoArchiveDuration ??= null
          }
          if ('nsfw' in e) {
            this.nsfw = e.nsfw
          } else {
            this.nsfw ??= false
          }
          if ('topic' in e) {
            this.topic = e.topic
          }
          if ('default_sort_order' in e) {
            this.defaultSortOrder = e.default_sort_order
          } else {
            this.defaultSortOrder ??= null
          }
        }
        setAvailableTags(e, t) {
          return this.edit({ availableTags: e, reason: t })
        }
        setDefaultReactionEmoji(e, t) {
          return this.edit({ defaultReactionEmoji: e, reason: t })
        }
        setDefaultThreadRateLimitPerUser(e, t) {
          return this.edit({ defaultThreadRateLimitPerUser: e, reason: t })
        }
        createInvite(e) {
          return this.guild.invites.create(this.id, e)
        }
        fetchInvites(e) {
          return this.guild.invites.fetch({ channelId: this.id, cache: e })
        }
        setDefaultAutoArchiveDuration(e, t) {
          return this.edit({ defaultAutoArchiveDuration: e, reason: t })
        }
        setTopic(e, t) {
          return this.edit({ topic: e, reason: t })
        }
        setDefaultSortOrder(e, t) {
          return this.edit({ defaultSortOrder: e, reason: t })
        }
        createWebhook() {}
        fetchWebhooks() {}
        setNSFW() {}
        setRateLimitPerUser() {}
      }
      n.applyToClass(ForumChannel, true, [
        'send',
        'lastMessage',
        'lastPinAt',
        'bulkDelete',
        'sendTyping',
        'createMessageCollector',
        'awaitMessages',
        'createMessageComponentCollector',
        'awaitMessageComponent',
      ])
      e.exports = ForumChannel
    },
    4445: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { makeURLSearchParams: n } = i(1372)
      const {
        ChannelType: r,
        GuildPremiumTier: a,
        Routes: o,
        GuildFeature: l,
      } = i(2)
      const c = i(7888)
      const d = i(8630)
      const u = i(6554)
      const h = i(210)
      const m = i(6378)
      const p = i(208)
      const f = i(3630)
      const g = i(7710)
      const {
        DiscordjsError: v,
        DiscordjsTypeError: y,
        ErrorCodes: _,
      } = i(8951)
      const b = i(6658)
      const w = i(8533)
      const C = i(3939)
      const S = i(3946)
      const M = i(8693)
      const I = i(1294)
      const T = i(6324)
      const E = i(5082)
      const R = i(4215)
      const A = i(5710)
      const k = i(4213)
      const x = i(3105)
      const D = i(5679)
      const O = i(3989)
      const P = i(6619)
      const U = i(3502)
      const { discordSort: j } = i(7966)
      class Guild extends c {
        constructor(e, t) {
          super(e, t, false)
          this.commands = new w(this)
          this.members = new T(this)
          this.channels = new S(this)
          this.bans = new C(this)
          this.roles = new k(this)
          this.presences = new A(this.client)
          this.voiceStates = new D(this)
          this.stageInstances = new x(this)
          this.invites = new I(this)
          this.scheduledEvents = new E(this)
          this.autoModerationRules = new b(this)
          if (!t) return
          if (t.unavailable) {
            this.available = false
          } else {
            this._patch(t)
            if (!t.channels) this.available = false
          }
          this.shardId = t.shardId
        }
        get shard() {
          return this.client.ws.shards.get(this.shardId)
        }
        _patch(e) {
          super._patch(e)
          this.id = e.id
          if ('name' in e) this.name = e.name
          if ('icon' in e) this.icon = e.icon
          if ('unavailable' in e) {
            this.available = !e.unavailable
          } else {
            this.available ??= true
          }
          if ('discovery_splash' in e) {
            this.discoverySplash = e.discovery_splash
          }
          if ('member_count' in e) {
            this.memberCount = e.member_count
          }
          if ('large' in e) {
            this.large = Boolean(e.large)
          }
          if ('premium_progress_bar_enabled' in e) {
            this.premiumProgressBarEnabled = e.premium_progress_bar_enabled
          }
          if ('application_id' in e) {
            this.applicationId = e.application_id
          }
          if ('afk_timeout' in e) {
            this.afkTimeout = e.afk_timeout
          }
          if ('afk_channel_id' in e) {
            this.afkChannelId = e.afk_channel_id
          }
          if ('system_channel_id' in e) {
            this.systemChannelId = e.system_channel_id
          }
          if ('premium_tier' in e) {
            this.premiumTier = e.premium_tier
          }
          if ('widget_enabled' in e) {
            this.widgetEnabled = e.widget_enabled
          } else {
            this.widgetEnabled ??= null
          }
          if ('widget_channel_id' in e) {
            this.widgetChannelId = e.widget_channel_id
          } else {
            this.widgetChannelId ??= null
          }
          if ('explicit_content_filter' in e) {
            this.explicitContentFilter = e.explicit_content_filter
          }
          if ('mfa_level' in e) {
            this.mfaLevel = e.mfa_level
          }
          if ('joined_at' in e) {
            this.joinedTimestamp = Date.parse(e.joined_at)
          }
          if ('default_message_notifications' in e) {
            this.defaultMessageNotifications = e.default_message_notifications
          }
          if ('system_channel_flags' in e) {
            this.systemChannelFlags = new U(e.system_channel_flags).freeze()
          }
          if ('max_members' in e) {
            this.maximumMembers = e.max_members
          } else {
            this.maximumMembers ??= null
          }
          if ('max_presences' in e) {
            this.maximumPresences = e.max_presences
          } else {
            this.maximumPresences ??= null
          }
          if ('max_video_channel_users' in e) {
            this.maxVideoChannelUsers = e.max_video_channel_users
          } else {
            this.maxVideoChannelUsers ??= null
          }
          if ('approximate_member_count' in e) {
            this.approximateMemberCount = e.approximate_member_count
          } else {
            this.approximateMemberCount ??= null
          }
          if ('approximate_presence_count' in e) {
            this.approximatePresenceCount = e.approximate_presence_count
          } else {
            this.approximatePresenceCount ??= null
          }
          this.vanityURLUses ??= null
          if ('rules_channel_id' in e) {
            this.rulesChannelId = e.rules_channel_id
          }
          if ('public_updates_channel_id' in e) {
            this.publicUpdatesChannelId = e.public_updates_channel_id
          }
          if ('preferred_locale' in e) {
            this.preferredLocale = e.preferred_locale
          }
          if (e.channels) {
            this.channels.cache.clear()
            for (const t of e.channels) {
              this.client.channels._add(t, this)
            }
          }
          if (e.threads) {
            for (const t of e.threads) {
              this.client.channels._add(t, this)
            }
          }
          if (e.roles) {
            this.roles.cache.clear()
            for (const t of e.roles) this.roles._add(t)
          }
          if (e.members) {
            this.members.cache.clear()
            for (const t of e.members) this.members._add(t)
          }
          if ('owner_id' in e) {
            this.ownerId = e.owner_id
          }
          if (e.presences) {
            for (const t of e.presences) {
              this.presences._add(Object.assign(t, { guild: this }))
            }
          }
          if (e.stage_instances) {
            this.stageInstances.cache.clear()
            for (const t of e.stage_instances) {
              this.stageInstances._add(t)
            }
          }
          if (e.guild_scheduled_events) {
            this.scheduledEvents.cache.clear()
            for (const t of e.guild_scheduled_events) {
              this.scheduledEvents._add(t)
            }
          }
          if (e.voice_states) {
            this.voiceStates.cache.clear()
            for (const t of e.voice_states) {
              this.voiceStates._add(t)
            }
          }
          if (!this.emojis) {
            this.emojis = new M(this)
            if (e.emojis) for (const t of e.emojis) this.emojis._add(t)
          } else if (e.emojis) {
            this.client.actions.GuildEmojisUpdate.handle({
              guild_id: this.id,
              emojis: e.emojis,
            })
          }
          if (!this.stickers) {
            this.stickers = new R(this)
            if (e.stickers) for (const t of e.stickers) this.stickers._add(t)
          } else if (e.stickers) {
            this.client.actions.GuildStickersUpdate.handle({
              guild_id: this.id,
              stickers: e.stickers,
            })
          }
        }
        get joinedAt() {
          return new Date(this.joinedTimestamp)
        }
        discoverySplashURL(e = {}) {
          return (
            this.discoverySplash &&
            this.client.rest.cdn.discoverySplash(
              this.id,
              this.discoverySplash,
              e
            )
          )
        }
        async fetchOwner(e) {
          if (!this.ownerId) {
            throw new v(_.FetchOwnerId)
          }
          const t = await this.members.fetch({ ...e, user: this.ownerId })
          return t
        }
        get afkChannel() {
          return this.client.channels.resolve(this.afkChannelId)
        }
        get systemChannel() {
          return this.client.channels.resolve(this.systemChannelId)
        }
        get widgetChannel() {
          return this.client.channels.resolve(this.widgetChannelId)
        }
        get rulesChannel() {
          return this.client.channels.resolve(this.rulesChannelId)
        }
        get publicUpdatesChannel() {
          return this.client.channels.resolve(this.publicUpdatesChannelId)
        }
        get maximumBitrate() {
          if (this.features.includes(l.VIPRegions)) {
            return 384e3
          }
          switch (this.premiumTier) {
            case a.Tier1:
              return 128e3
            case a.Tier2:
              return 256e3
            case a.Tier3:
              return 384e3
            default:
              return 96e3
          }
        }
        async fetchIntegrations() {
          const e = await this.client.rest.get(o.guildIntegrations(this.id))
          return e.reduce(
            (e, t) => e.set(t.id, new p(this.client, t, this)),
            new s()
          )
        }
        async fetchTemplates() {
          const e = await this.client.rest.get(o.guildTemplates(this.id))
          return e.reduce(
            (e, t) => e.set(t.code, new m(this.client, t)),
            new s()
          )
        }
        async fetchWelcomeScreen() {
          const e = await this.client.rest.get(o.guildWelcomeScreen(this.id))
          return new g(this, e)
        }
        async createTemplate(e, t) {
          const i = await this.client.rest.post(o.guildTemplates(this.id), {
            body: { name: e, description: t },
          })
          return new m(this.client, i)
        }
        async fetchPreview() {
          const e = await this.client.rest.get(o.guildPreview(this.id))
          return new h(this.client, e)
        }
        async fetchVanityData() {
          if (!this.features.includes(l.VanityURL)) {
            throw new v(_.VanityURL)
          }
          const e = await this.client.rest.get(o.guildVanityUrl(this.id))
          this.vanityURLCode = e.code
          this.vanityURLUses = e.uses
          return e
        }
        async fetchWebhooks() {
          const e = await this.client.rest.get(o.guildWebhooks(this.id))
          const t = new s()
          for (const i of e) t.set(i.id, new f(this.client, i))
          return t
        }
        fetchWidget() {
          return this.client.fetchGuildWidget(this.id)
        }
        async fetchWidgetSettings() {
          const e = await this.client.rest.get(o.guildWidgetSettings(this.id))
          this.widgetEnabled = e.enabled
          this.widgetChannelId = e.channel_id
          return {
            enabled: e.enabled,
            channel: e.channel_id
              ? this.channels.cache.get(e.channel_id)
              : null,
          }
        }
        async fetchAuditLogs(e = {}) {
          if (e.before && e.before instanceof u) e.before = e.before.id
          const t = n({ before: e.before, limit: e.limit, action_type: e.type })
          if (e.user) {
            const i = this.client.users.resolveId(e.user)
            if (!i) throw new y(_.InvalidType, 'user', 'UserResolvable')
            t.set('user_id', i)
          }
          const i = await this.client.rest.get(o.guildAuditLog(this.id), {
            query: t,
          })
          return new d(this, i)
        }
        async edit(e) {
          const t = {}
          if (e.name) t.name = e.name
          if (typeof e.verificationLevel !== 'undefined') {
            t.verification_level = e.verificationLevel
          }
          if (typeof e.afkChannel !== 'undefined') {
            t.afk_channel_id = this.client.channels.resolveId(e.afkChannel)
          }
          if (typeof e.systemChannel !== 'undefined') {
            t.system_channel_id = this.client.channels.resolveId(
              e.systemChannel
            )
          }
          if (e.afkTimeout) t.afk_timeout = Number(e.afkTimeout)
          if (typeof e.icon !== 'undefined')
            t.icon = await O.resolveImage(e.icon)
          if (e.owner) t.owner_id = this.client.users.resolveId(e.owner)
          if (typeof e.splash !== 'undefined')
            t.splash = await O.resolveImage(e.splash)
          if (typeof e.discoverySplash !== 'undefined') {
            t.discovery_splash = await O.resolveImage(e.discoverySplash)
          }
          if (typeof e.banner !== 'undefined')
            t.banner = await O.resolveImage(e.banner)
          if (typeof e.explicitContentFilter !== 'undefined') {
            t.explicit_content_filter = e.explicitContentFilter
          }
          if (typeof e.defaultMessageNotifications !== 'undefined') {
            t.default_message_notifications = e.defaultMessageNotifications
          }
          if (typeof e.systemChannelFlags !== 'undefined') {
            t.system_channel_flags = U.resolve(e.systemChannelFlags)
          }
          if (typeof e.rulesChannel !== 'undefined') {
            t.rules_channel_id = this.client.channels.resolveId(e.rulesChannel)
          }
          if (typeof e.publicUpdatesChannel !== 'undefined') {
            t.public_updates_channel_id = this.client.channels.resolveId(
              e.publicUpdatesChannel
            )
          }
          if (typeof e.features !== 'undefined') {
            t.features = e.features
          }
          if (typeof e.description !== 'undefined') {
            t.description = e.description
          }
          if (typeof e.preferredLocale !== 'undefined')
            t.preferred_locale = e.preferredLocale
          if ('premiumProgressBarEnabled' in e)
            t.premium_progress_bar_enabled = e.premiumProgressBarEnabled
          const i = await this.client.rest.patch(o.guild(this.id), {
            body: t,
            reason: e.reason,
          })
          return this.client.actions.GuildUpdate.handle(i).updated
        }
        async editWelcomeScreen(e) {
          const { enabled: t, description: i, welcomeChannels: s } = e
          const n = s?.map((e) => {
            const t = this.emojis.resolve(e.emoji)
            return {
              emoji_id: t?.id,
              emoji_name: t?.name ?? e.emoji,
              channel_id: this.channels.resolveId(e.channel),
              description: e.description,
            }
          })
          const r = await this.client.rest.patch(
            o.guildWelcomeScreen(this.id),
            { body: { welcome_channels: n, description: i, enabled: t } }
          )
          return new g(this, r)
        }
        setExplicitContentFilter(e, t) {
          return this.edit({ explicitContentFilter: e, reason: t })
        }
        setDefaultMessageNotifications(e, t) {
          return this.edit({ defaultMessageNotifications: e, reason: t })
        }
        setSystemChannelFlags(e, t) {
          return this.edit({ systemChannelFlags: e, reason: t })
        }
        setName(e, t) {
          return this.edit({ name: e, reason: t })
        }
        setVerificationLevel(e, t) {
          return this.edit({ verificationLevel: e, reason: t })
        }
        setAFKChannel(e, t) {
          return this.edit({ afkChannel: e, reason: t })
        }
        setSystemChannel(e, t) {
          return this.edit({ systemChannel: e, reason: t })
        }
        setAFKTimeout(e, t) {
          return this.edit({ afkTimeout: e, reason: t })
        }
        setIcon(e, t) {
          return this.edit({ icon: e, reason: t })
        }
        setOwner(e, t) {
          return this.edit({ owner: e, reason: t })
        }
        setSplash(e, t) {
          return this.edit({ splash: e, reason: t })
        }
        setDiscoverySplash(e, t) {
          return this.edit({ discoverySplash: e, reason: t })
        }
        setBanner(e, t) {
          return this.edit({ banner: e, reason: t })
        }
        setRulesChannel(e, t) {
          return this.edit({ rulesChannel: e, reason: t })
        }
        setPublicUpdatesChannel(e, t) {
          return this.edit({ publicUpdatesChannel: e, reason: t })
        }
        setPreferredLocale(e, t) {
          return this.edit({ preferredLocale: e, reason: t })
        }
        setPremiumProgressBarEnabled(e = true, t) {
          return this.edit({ premiumProgressBarEnabled: e, reason: t })
        }
        async setWidgetSettings(e, t) {
          await this.client.rest.patch(o.guildWidgetSettings(this.id), {
            body: {
              enabled: e.enabled,
              channel_id: this.channels.resolveId(e.channel),
            },
            reason: t,
          })
          return this
        }
        async setMFALevel(e, t) {
          await this.client.rest.post(o.guildMFA(this.id), {
            body: { level: e },
            reason: t,
          })
          return this
        }
        async leave() {
          if (this.ownerId === this.client.user.id) throw new v(_.GuildOwned)
          await this.client.rest.delete(o.userGuild(this.id))
          return this
        }
        async delete() {
          await this.client.rest.delete(o.guild(this.id))
          return this
        }
        equals(e) {
          return (
            e &&
            e instanceof this.constructor &&
            this.id === e.id &&
            this.available === e.available &&
            this.splash === e.splash &&
            this.discoverySplash === e.discoverySplash &&
            this.name === e.name &&
            this.memberCount === e.memberCount &&
            this.large === e.large &&
            this.icon === e.icon &&
            this.ownerId === e.ownerId &&
            this.verificationLevel === e.verificationLevel &&
            (this.features === e.features ||
              (this.features.length === e.features.length &&
                this.features.every((t, i) => t === e.features[i])))
          )
        }
        toJSON() {
          const e = super.toJSON({
            available: false,
            createdTimestamp: true,
            nameAcronym: true,
            presences: false,
            voiceStates: false,
          })
          e.iconURL = this.iconURL()
          e.splashURL = this.splashURL()
          e.discoverySplashURL = this.discoverySplashURL()
          e.bannerURL = this.bannerURL()
          return e
        }
        get voiceAdapterCreator() {
          return (e) => {
            this.client.voice.adapters.set(this.id, e)
            return {
              sendPayload: (e) => {
                if (this.shard.status !== P.Ready) return false
                this.shard.send(e)
                return true
              },
              destroy: () => {
                this.client.voice.adapters.delete(this.id)
              },
            }
          }
        }
        _sortedRoles() {
          return j(this.roles.cache)
        }
        _sortedChannels(e) {
          const t = e.type === r.GuildCategory
          const i = [r.GuildText, r.GuildAnnouncement]
          return j(
            this.channels.cache.filter(
              (s) =>
                (i.includes(e.type) ? i.includes(s.type) : s.type === e.type) &&
                (t || s.parent === e.parent)
            )
          )
        }
      }
      t.Guild = Guild
    },
    8630: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const n = i(6130)
      const r = i(6554)
      const a = i(208)
      const o = i(3630)
      const { flatten: l } = i(7966)
      class GuildAuditLogs {
        constructor(e, t) {
          if (t.users) for (const i of t.users) e.client.users._add(i)
          if (t.threads) for (const i of t.threads) e.client.channels._add(i, e)
          this.webhooks = new s()
          if (t.webhooks) {
            for (const i of t.webhooks) {
              this.webhooks.set(i.id, new o(e.client, i))
            }
          }
          this.integrations = new s()
          if (t.integrations) {
            for (const i of t.integrations) {
              this.integrations.set(i.id, new a(e.client, i, e))
            }
          }
          this.guildScheduledEvents = t.guild_scheduled_events.reduce(
            (t, i) => t.set(i.id, e.scheduledEvents._add(i)),
            new s()
          )
          this.applicationCommands = new s()
          if (t.application_commands) {
            for (const i of t.application_commands) {
              this.applicationCommands.set(i.id, new n(e.client, i, e))
            }
          }
          this.autoModerationRules = t.auto_moderation_rules.reduce(
            (t, i) => t.set(i.id, e.autoModerationRules._add(i)),
            new s()
          )
          this.entries = new s()
          for (const i of t.audit_log_entries) {
            const t = new r(this, e, i)
            this.entries.set(t.id, t)
          }
        }
        toJSON() {
          return l(this)
        }
      }
      e.exports = GuildAuditLogs
    },
    6554: (e, t, i) => {
      'use strict'
      const { DiscordSnowflake: s } = i(8673)
      const { AuditLogOptionsType: n, AuditLogEvent: r } = i(2)
      const a = i(9974)
      const { GuildScheduledEvent: o } = i(6122)
      const l = i(208)
      const c = i(3493)
      const { StageInstance: d } = i(4233)
      const { Sticker: u } = i(2736)
      const h = i(3630)
      const m = i(527)
      const { flatten: p } = i(7966)
      const f = {
        All: 'All',
        Guild: 'Guild',
        GuildScheduledEvent: 'GuildScheduledEvent',
        Channel: 'Channel',
        User: 'User',
        Role: 'Role',
        Invite: 'Invite',
        Webhook: 'Webhook',
        Emoji: 'Emoji',
        Message: 'Message',
        Integration: 'Integration',
        StageInstance: 'StageInstance',
        Sticker: 'Sticker',
        Thread: 'Thread',
        ApplicationCommand: 'ApplicationCommand',
        AutoModeration: 'AutoModeration',
        Unknown: 'Unknown',
      }
      class GuildAuditLogsEntry {
        static Targets = f
        constructor(e, t, i) {
          this.targetType = GuildAuditLogsEntry.targetType(i.action_type)
          const s = this.targetType
          this.actionType = GuildAuditLogsEntry.actionType(i.action_type)
          this.action = i.action_type
          this.reason = i.reason ?? null
          this.executor = i.user_id
            ? t.client.options.partials.includes(m.User)
              ? t.client.users._add({ id: i.user_id })
              : t.client.users.cache.get(i.user_id)
            : null
          this.changes =
            i.changes?.map((e) => ({
              key: e.key,
              old: e.old_value,
              new: e.new_value,
            })) ?? []
          this.id = i.id
          this.extra = null
          switch (i.action_type) {
            case r.MemberPrune:
              this.extra = {
                removed: Number(i.options.members_removed),
                days: Number(i.options.delete_member_days),
              }
              break
            case r.MemberMove:
            case r.MessageDelete:
            case r.MessageBulkDelete:
              this.extra = {
                channel: t.channels.cache.get(i.options.channel_id) ?? {
                  id: i.options.channel_id,
                },
                count: Number(i.options.count),
              }
              break
            case r.MessagePin:
            case r.MessageUnpin:
              this.extra = {
                channel: t.client.channels.cache.get(i.options.channel_id) ?? {
                  id: i.options.channel_id,
                },
                messageId: i.options.message_id,
              }
              break
            case r.MemberDisconnect:
              this.extra = { count: Number(i.options.count) }
              break
            case r.ChannelOverwriteCreate:
            case r.ChannelOverwriteUpdate:
            case r.ChannelOverwriteDelete:
              switch (i.options.type) {
                case n.Role:
                  this.extra = t.roles.cache.get(i.options.id) ?? {
                    id: i.options.id,
                    name: i.options.role_name,
                    type: n.Role,
                  }
                  break
                case n.Member:
                  this.extra = t.members.cache.get(i.options.id) ?? {
                    id: i.options.id,
                    type: n.Member,
                  }
                  break
                default:
                  break
              }
              break
            case r.StageInstanceCreate:
            case r.StageInstanceDelete:
            case r.StageInstanceUpdate:
              this.extra = {
                channel: t.client.channels.cache.get(i.options?.channel_id) ?? {
                  id: i.options?.channel_id,
                },
              }
              break
            case r.ApplicationCommandPermissionUpdate:
              this.extra = { applicationId: i.options.application_id }
              break
            case r.AutoModerationBlockMessage:
            case r.AutoModerationFlagToChannel:
            case r.AutoModerationUserCommunicationDisabled:
              this.extra = {
                autoModerationRuleName: i.options.auto_moderation_rule_name,
                autoModerationRuleTriggerType:
                  i.options.auto_moderation_rule_trigger_type,
              }
              break
            default:
              break
          }
          this.target = null
          if (s === f.Unknown) {
            this.target = this.changes.reduce((e, t) => {
              e[t.key] = t.new ?? t.old
              return e
            }, {})
            this.target.id = i.target_id
          } else if (s === f.User && i.target_id) {
            this.target = t.client.options.partials.includes(m.User)
              ? t.client.users._add({ id: i.target_id })
              : t.client.users.cache.get(i.target_id)
          } else if (s === f.Guild) {
            this.target = t.client.guilds.cache.get(i.target_id)
          } else if (s === f.Webhook) {
            this.target =
              e.webhooks.get(i.target_id) ??
              new h(
                t.client,
                this.changes.reduce(
                  (e, t) => {
                    e[t.key] = t.new ?? t.old
                    return e
                  },
                  { id: i.target_id, guild_id: t.id }
                )
              )
          } else if (s === f.Invite) {
            let e = this.changes.find((e) => e.key === 'code')
            e = e.new ?? e.old
            this.target =
              t.invites.cache.get(e) ??
              new c(
                t.client,
                this.changes.reduce(
                  (e, t) => {
                    e[t.key] = t.new ?? t.old
                    return e
                  },
                  { guild: t }
                )
              )
          } else if (s === f.Message) {
            this.target =
              i.action_type === r.MessageBulkDelete
                ? t.channels.cache.get(i.target_id) ?? { id: i.target_id }
                : t.client.users.cache.get(i.target_id)
          } else if (s === f.Integration) {
            this.target =
              e.integrations.get(i.target_id) ??
              new l(
                t.client,
                this.changes.reduce(
                  (e, t) => {
                    e[t.key] = t.new ?? t.old
                    return e
                  },
                  { id: i.target_id }
                ),
                t
              )
          } else if (s === f.Channel || s === f.Thread) {
            this.target =
              t.channels.cache.get(i.target_id) ??
              this.changes.reduce(
                (e, t) => {
                  e[t.key] = t.new ?? t.old
                  return e
                },
                { id: i.target_id }
              )
          } else if (s === f.StageInstance) {
            this.target =
              t.stageInstances.cache.get(i.target_id) ??
              new d(
                t.client,
                this.changes.reduce(
                  (e, t) => {
                    e[t.key] = t.new ?? t.old
                    return e
                  },
                  {
                    id: i.target_id,
                    channel_id: i.options?.channel_id,
                    guild_id: t.id,
                  }
                )
              )
          } else if (s === f.Sticker) {
            this.target =
              t.stickers.cache.get(i.target_id) ??
              new u(
                t.client,
                this.changes.reduce(
                  (e, t) => {
                    e[t.key] = t.new ?? t.old
                    return e
                  },
                  { id: i.target_id }
                )
              )
          } else if (s === f.GuildScheduledEvent) {
            this.target =
              t.scheduledEvents.cache.get(i.target_id) ??
              new o(
                t.client,
                this.changes.reduce(
                  (e, t) => {
                    e[t.key] = t.new ?? t.old
                    return e
                  },
                  { id: i.target_id, guild_id: t.id }
                )
              )
          } else if (s === f.ApplicationCommand) {
            this.target = e.applicationCommands.get(i.target_id) ?? {
              id: i.target_id,
            }
          } else if (s === f.AutoModeration) {
            this.target =
              t.autoModerationRules.cache.get(i.target_id) ??
              new a(
                t.client,
                this.changes.reduce(
                  (e, t) => {
                    e[t.key] = t.new ?? t.old
                    return e
                  },
                  { id: i.target_id, guild_id: t.id }
                ),
                t
              )
          } else if (i.target_id) {
            this.target = t[`${s.toLowerCase()}s`]?.cache.get(i.target_id) ?? {
              id: i.target_id,
            }
          }
        }
        static targetType(e) {
          if (e < 10) return f.Guild
          if (e < 20) return f.Channel
          if (e < 30) return f.User
          if (e < 40) return f.Role
          if (e < 50) return f.Invite
          if (e < 60) return f.Webhook
          if (e < 70) return f.Emoji
          if (e < 80) return f.Message
          if (e < 83) return f.Integration
          if (e < 86) return f.StageInstance
          if (e < 100) return f.Sticker
          if (e < 110) return f.GuildScheduledEvent
          if (e < 120) return f.Thread
          if (e < 130) return f.ApplicationCommand
          if (e >= 140 && e < 150) return f.AutoModeration
          return f.Unknown
        }
        static actionType(e) {
          if (
            [
              r.ChannelCreate,
              r.ChannelOverwriteCreate,
              r.MemberBanRemove,
              r.BotAdd,
              r.RoleCreate,
              r.InviteCreate,
              r.WebhookCreate,
              r.EmojiCreate,
              r.MessagePin,
              r.IntegrationCreate,
              r.StageInstanceCreate,
              r.StickerCreate,
              r.GuildScheduledEventCreate,
              r.ThreadCreate,
              r.AutoModerationRuleCreate,
              r.AutoModerationBlockMessage,
            ].includes(e)
          ) {
            return 'Create'
          }
          if (
            [
              r.ChannelDelete,
              r.ChannelOverwriteDelete,
              r.MemberKick,
              r.MemberPrune,
              r.MemberBanAdd,
              r.MemberDisconnect,
              r.RoleDelete,
              r.InviteDelete,
              r.WebhookDelete,
              r.EmojiDelete,
              r.MessageDelete,
              r.MessageBulkDelete,
              r.MessageUnpin,
              r.IntegrationDelete,
              r.StageInstanceDelete,
              r.StickerDelete,
              r.GuildScheduledEventDelete,
              r.ThreadDelete,
              r.AutoModerationRuleDelete,
            ].includes(e)
          ) {
            return 'Delete'
          }
          if (
            [
              r.GuildUpdate,
              r.ChannelUpdate,
              r.ChannelOverwriteUpdate,
              r.MemberUpdate,
              r.MemberRoleUpdate,
              r.MemberMove,
              r.RoleUpdate,
              r.InviteUpdate,
              r.WebhookUpdate,
              r.EmojiUpdate,
              r.IntegrationUpdate,
              r.StageInstanceUpdate,
              r.StickerUpdate,
              r.GuildScheduledEventUpdate,
              r.ThreadUpdate,
              r.ApplicationCommandPermissionUpdate,
              r.AutoModerationRuleUpdate,
            ].includes(e)
          ) {
            return 'Update'
          }
          return 'All'
        }
        get createdTimestamp() {
          return s.timestampFrom(this.id)
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
        toJSON() {
          return p(this, { createdTimestamp: true })
        }
      }
      e.exports = GuildAuditLogsEntry
    },
    3694: (e, t, i) => {
      'use strict'
      const s = i(4936)
      class GuildBan extends s {
        constructor(e, t, i) {
          super(e)
          this.guild = i
          this._patch(t)
        }
        _patch(e) {
          if ('user' in e) {
            this.user = this.client.users._add(e.user, true)
          }
          if ('reason' in e) {
            this.reason = e.reason
          }
        }
        get partial() {
          return !('reason' in this)
        }
        fetch(e = true) {
          return this.guild.bans.fetch({
            user: this.user,
            cache: true,
            force: e,
          })
        }
      }
      e.exports = GuildBan
    },
    3883: (e, t, i) => {
      'use strict'
      const { PermissionFlagsBits: s } = i(2)
      const { BaseChannel: n } = i(6948)
      const { DiscordjsError: r, ErrorCodes: a } = i(8951)
      const o = i(7941)
      const { VoiceBasedChannelTypes: l } = i(6047)
      const c = i(9238)
      class GuildChannel extends n {
        constructor(e, t, i, s = true) {
          super(e?.client ?? i, t, false)
          this.guild = e
          this.guildId = e?.id ?? t.guild_id
          this.parentId = this.parentId ?? null
          this.permissionOverwrites = new o(this)
          if (t && s) this._patch(t)
        }
        _patch(e) {
          super._patch(e)
          if ('name' in e) {
            this.name = e.name
          }
          if ('position' in e) {
            this.rawPosition = e.position
          }
          if ('guild_id' in e) {
            this.guildId = e.guild_id
          }
          if ('parent_id' in e) {
            this.parentId = e.parent_id
          }
          if ('permission_overwrites' in e) {
            this.permissionOverwrites.cache.clear()
            for (const t of e.permission_overwrites) {
              this.permissionOverwrites._add(t)
            }
          }
        }
        _clone() {
          const e = super._clone()
          e.permissionOverwrites = new o(
            e,
            this.permissionOverwrites.cache.values()
          )
          return e
        }
        get parent() {
          return this.guild.channels.resolve(this.parentId)
        }
        get permissionsLocked() {
          if (!this.parent) return null
          const e = new Set([
            ...this.permissionOverwrites.cache.keys(),
            ...this.parent.permissionOverwrites.cache.keys(),
          ])
          return [...e].every((e) => {
            const t = this.permissionOverwrites.cache.get(e)
            const i = this.parent.permissionOverwrites.cache.get(e)
            if (
              (!t &&
                i.deny.bitfield === c.DefaultBit &&
                i.allow.bitfield === c.DefaultBit) ||
              (!i &&
                t.deny.bitfield === c.DefaultBit &&
                t.allow.bitfield === c.DefaultBit)
            ) {
              return true
            }
            return (
              typeof t !== 'undefined' &&
              typeof i !== 'undefined' &&
              t.deny.bitfield === i.deny.bitfield &&
              t.allow.bitfield === i.allow.bitfield
            )
          })
        }
        get position() {
          const e = this.guild._sortedChannels(this)
          return [...e.values()].indexOf(e.get(this.id))
        }
        permissionsFor(e, t = true) {
          const i = this.guild.members.resolve(e)
          if (i) return this.memberPermissions(i, t)
          const s = this.guild.roles.resolve(e)
          return s && this.rolePermissions(s, t)
        }
        overwritesFor(e, t = false, i = null) {
          if (!t) e = this.guild.members.resolve(e)
          if (!e) return []
          i ??= e.roles.cache
          const s = []
          let n
          let r
          for (const t of this.permissionOverwrites.cache.values()) {
            if (t.id === this.guild.id) {
              r = t
            } else if (i.has(t.id)) {
              s.push(t)
            } else if (t.id === e.id) {
              n = t
            }
          }
          return { everyone: r, roles: s, member: n }
        }
        memberPermissions(e, t) {
          if (t && e.id === this.guild.ownerId) {
            return new c(c.All).freeze()
          }
          const i = e.roles.cache
          const n = new c(i.map((e) => e.permissions))
          if (t && n.has(s.Administrator)) {
            return new c(c.All).freeze()
          }
          const r = this.overwritesFor(e, true, i)
          return n
            .remove(r.everyone?.deny ?? c.DefaultBit)
            .add(r.everyone?.allow ?? c.DefaultBit)
            .remove(
              r.roles.length > 0 ? r.roles.map((e) => e.deny) : c.DefaultBit
            )
            .add(
              r.roles.length > 0 ? r.roles.map((e) => e.allow) : c.DefaultBit
            )
            .remove(r.member?.deny ?? c.DefaultBit)
            .add(r.member?.allow ?? c.DefaultBit)
            .freeze()
        }
        rolePermissions(e, t) {
          if (t && e.permissions.has(s.Administrator)) {
            return new c(c.All).freeze()
          }
          const i = this.permissionOverwrites.cache.get(this.guild.id)
          const n = this.permissionOverwrites.cache.get(e.id)
          return e.permissions
            .remove(i?.deny ?? c.DefaultBit)
            .add(i?.allow ?? c.DefaultBit)
            .remove(n?.deny ?? c.DefaultBit)
            .add(n?.allow ?? c.DefaultBit)
            .freeze()
        }
        lockPermissions() {
          if (!this.parent) return Promise.reject(new r(a.GuildChannelOrphan))
          const e = this.parent.permissionOverwrites.cache.map((e) =>
            e.toJSON()
          )
          return this.edit({ permissionOverwrites: e })
        }
        get members() {
          return this.guild.members.cache.filter((e) =>
            this.permissionsFor(e).has(s.ViewChannel, false)
          )
        }
        edit(e) {
          return this.guild.channels.edit(this, e)
        }
        setName(e, t) {
          return this.edit({ name: e, reason: t })
        }
        setParent(e, { lockPermissions: t = true, reason: i } = {}) {
          return this.edit({ parent: e ?? null, lockPermissions: t, reason: i })
        }
        setPosition(e, t = {}) {
          return this.guild.channels.setPosition(this, e, t)
        }
        clone(e = {}) {
          return this.guild.channels.create({
            name: e.name ?? this.name,
            permissionOverwrites: this.permissionOverwrites.cache,
            topic: this.topic,
            type: this.type,
            nsfw: this.nsfw,
            parent: this.parent,
            bitrate: this.bitrate,
            userLimit: this.userLimit,
            rateLimitPerUser: this.rateLimitPerUser,
            position: this.rawPosition,
            reason: null,
            ...e,
          })
        }
        equals(e) {
          let t =
            e &&
            this.id === e.id &&
            this.type === e.type &&
            this.topic === e.topic &&
            this.position === e.position &&
            this.name === e.name
          if (t) {
            if (this.permissionOverwrites && e.permissionOverwrites) {
              t = this.permissionOverwrites.cache.equals(
                e.permissionOverwrites.cache
              )
            } else {
              t = !this.permissionOverwrites && !e.permissionOverwrites
            }
          }
          return t
        }
        get deletable() {
          return (
            this.manageable &&
            this.guild.rulesChannelId !== this.id &&
            this.guild.publicUpdatesChannelId !== this.id
          )
        }
        get manageable() {
          if (this.client.user.id === this.guild.ownerId) return true
          const e = this.permissionsFor(this.client.user)
          if (!e) return false
          if (e.has(s.Administrator, false)) return true
          if (
            this.guild.members.me.communicationDisabledUntilTimestamp >
            Date.now()
          )
            return false
          const t = l.includes(this.type)
            ? s.ManageChannels | s.Connect
            : s.ViewChannel | s.ManageChannels
          return e.has(t, false)
        }
        get viewable() {
          if (this.client.user.id === this.guild.ownerId) return true
          const e = this.permissionsFor(this.client.user)
          if (!e) return false
          return e.has(s.ViewChannel, false)
        }
        async delete(e) {
          await this.guild.channels.delete(this.id, e)
          return this
        }
      }
      e.exports = GuildChannel
    },
    3130: (e, t, i) => {
      'use strict'
      const { PermissionFlagsBits: s } = i(2)
      const n = i(8708)
      const { DiscordjsError: r, ErrorCodes: a } = i(8951)
      const o = i(554)
      class GuildEmoji extends n {
        constructor(e, t, i) {
          super(e, t, i)
          this.author = null
          Object.defineProperty(this, '_roles', { value: [], writable: true })
          this._patch(t)
        }
        _clone() {
          const e = super._clone()
          e._roles = this._roles.slice()
          return e
        }
        _patch(e) {
          super._patch(e)
          if (e.user) this.author = this.client.users._add(e.user)
          if (e.roles) this._roles = e.roles
        }
        get deletable() {
          if (!this.guild.members.me) throw new r(a.GuildUncachedMe)
          return (
            !this.managed &&
            this.guild.members.me.permissions.has(s.ManageEmojisAndStickers)
          )
        }
        get roles() {
          return new o(this)
        }
        fetchAuthor() {
          return this.guild.emojis.fetchAuthor(this)
        }
        edit(e) {
          return this.guild.emojis.edit(this.id, e)
        }
        setName(e, t) {
          return this.edit({ name: e, reason: t })
        }
        async delete(e) {
          await this.guild.emojis.delete(this.id, e)
          return this
        }
        equals(e) {
          if (e instanceof GuildEmoji) {
            return (
              e.id === this.id &&
              e.name === this.name &&
              e.managed === this.managed &&
              e.available === this.available &&
              e.requiresColons === this.requiresColons &&
              e.roles.cache.size === this.roles.cache.size &&
              e.roles.cache.every((e) => this.roles.cache.has(e.id))
            )
          } else {
            return (
              e.id === this.id &&
              e.name === this.name &&
              e.roles.length === this.roles.cache.size &&
              e.roles.every((e) => this.roles.cache.has(e))
            )
          }
        }
      }
      e.exports = GuildEmoji
    },
    5780: (e, t, i) => {
      'use strict'
      const { PermissionFlagsBits: s } = i(2)
      const n = i(4936)
      const r = i(5036)
      const a = i(5954)
      const { DiscordjsError: o, ErrorCodes: l } = i(8951)
      const c = i(7444)
      const d = i(9238)
      class GuildMember extends n {
        constructor(e, t, i) {
          super(e)
          this.guild = i
          this.joinedTimestamp = null
          this.premiumSinceTimestamp = null
          this.nickname = null
          this.pending = null
          this.communicationDisabledUntilTimestamp = null
          this._roles = []
          if (t) this._patch(t)
        }
        _patch(e) {
          if ('user' in e) {
            this.user = this.client.users._add(e.user, true)
          }
          if ('nick' in e) this.nickname = e.nick
          if ('avatar' in e) {
            this.avatar = e.avatar
          } else if (typeof this.avatar !== 'string') {
            this.avatar = null
          }
          if ('joined_at' in e) this.joinedTimestamp = Date.parse(e.joined_at)
          if ('premium_since' in e) {
            this.premiumSinceTimestamp = e.premium_since
              ? Date.parse(e.premium_since)
              : null
          }
          if ('roles' in e) this._roles = e.roles
          if ('pending' in e) {
            this.pending = e.pending
          } else if (!this.partial) {
            this.pending ??= false
          }
          if ('communication_disabled_until' in e) {
            this.communicationDisabledUntilTimestamp =
              e.communication_disabled_until &&
              Date.parse(e.communication_disabled_until)
          }
        }
        _clone() {
          const e = super._clone()
          e._roles = this._roles.slice()
          return e
        }
        get partial() {
          return this.joinedTimestamp === null
        }
        get roles() {
          return new c(this)
        }
        get voice() {
          return (
            this.guild.voiceStates.cache.get(this.id) ??
            new r(this.guild, { user_id: this.id })
          )
        }
        avatarURL(e = {}) {
          return (
            this.avatar &&
            this.client.rest.cdn.guildMemberAvatar(
              this.guild.id,
              this.id,
              this.avatar,
              e
            )
          )
        }
        displayAvatarURL(e) {
          return this.avatarURL(e) ?? this.user.displayAvatarURL(e)
        }
        get joinedAt() {
          return this.joinedTimestamp && new Date(this.joinedTimestamp)
        }
        get communicationDisabledUntil() {
          return (
            this.communicationDisabledUntilTimestamp &&
            new Date(this.communicationDisabledUntilTimestamp)
          )
        }
        get premiumSince() {
          return (
            this.premiumSinceTimestamp && new Date(this.premiumSinceTimestamp)
          )
        }
        get presence() {
          return this.guild.presences.resolve(this.id)
        }
        get displayColor() {
          return this.roles.color?.color ?? 0
        }
        get displayHexColor() {
          return this.roles.color?.hexColor ?? '#000000'
        }
        get id() {
          return this.user.id
        }
        get dmChannel() {
          return this.client.users.dmChannel(this.id)
        }
        get displayName() {
          return this.nickname ?? this.user.username
        }
        get permissions() {
          if (this.user.id === this.guild.ownerId) return new d(d.All).freeze()
          return new d(this.roles.cache.map((e) => e.permissions)).freeze()
        }
        get manageable() {
          if (this.user.id === this.guild.ownerId) return false
          if (this.user.id === this.client.user.id) return false
          if (this.client.user.id === this.guild.ownerId) return true
          if (!this.guild.members.me) throw new o(l.GuildUncachedMe)
          return (
            this.guild.members.me.roles.highest.comparePositionTo(
              this.roles.highest
            ) > 0
          )
        }
        get kickable() {
          if (!this.guild.members.me) throw new o(l.GuildUncachedMe)
          return (
            this.manageable &&
            this.guild.members.me.permissions.has(s.KickMembers)
          )
        }
        get bannable() {
          if (!this.guild.members.me) throw new o(l.GuildUncachedMe)
          return (
            this.manageable &&
            this.guild.members.me.permissions.has(s.BanMembers)
          )
        }
        get moderatable() {
          return (
            !this.permissions.has(s.Administrator) &&
            this.manageable &&
            (this.guild.members.me?.permissions.has(s.ModerateMembers) ?? false)
          )
        }
        isCommunicationDisabled() {
          return this.communicationDisabledUntilTimestamp > Date.now()
        }
        permissionsIn(e) {
          e = this.guild.channels.resolve(e)
          if (!e) throw new o(l.GuildChannelResolve)
          return e.permissionsFor(this)
        }
        edit(e) {
          return this.guild.members.edit(this, e)
        }
        setNickname(e, t) {
          return this.edit({ nick: e, reason: t })
        }
        createDM(e = false) {
          return this.user.createDM(e)
        }
        deleteDM() {
          return this.user.deleteDM()
        }
        kick(e) {
          return this.guild.members.kick(this, e)
        }
        ban(e) {
          return this.guild.members.ban(this, e)
        }
        disableCommunicationUntil(e, t) {
          return this.edit({ communicationDisabledUntil: e, reason: t })
        }
        timeout(e, t) {
          return this.disableCommunicationUntil(e && Date.now() + e, t)
        }
        fetch(e = true) {
          return this.guild.members.fetch({
            user: this.id,
            cache: true,
            force: e,
          })
        }
        equals(e) {
          return (
            e instanceof this.constructor &&
            this.id === e.id &&
            this.partial === e.partial &&
            this.guild.id === e.guild.id &&
            this.joinedTimestamp === e.joinedTimestamp &&
            this.nickname === e.nickname &&
            this.avatar === e.avatar &&
            this.pending === e.pending &&
            this.communicationDisabledUntilTimestamp ===
              e.communicationDisabledUntilTimestamp &&
            (this._roles === e._roles ||
              (this._roles.length === e._roles.length &&
                this._roles.every((t, i) => t === e._roles[i])))
          )
        }
        toString() {
          return this.user.toString()
        }
        toJSON() {
          const e = super.toJSON({
            guild: 'guildId',
            user: 'userId',
            displayName: true,
            roles: true,
          })
          e.avatarURL = this.avatarURL()
          e.displayAvatarURL = this.displayAvatarURL()
          return e
        }
        send() {}
      }
      a.applyToClass(GuildMember)
      t.GuildMember = GuildMember
    },
    210: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { DiscordSnowflake: n } = i(8673)
      const { Routes: r } = i(2)
      const a = i(4936)
      const o = i(3570)
      const { Sticker: l } = i(2736)
      class GuildPreview extends a {
        constructor(e, t) {
          super(e)
          if (!t) return
          this._patch(t)
        }
        _patch(e) {
          this.id = e.id
          if ('name' in e) {
            this.name = e.name
          }
          if ('icon' in e) {
            this.icon = e.icon
          }
          if ('splash' in e) {
            this.splash = e.splash
          }
          if ('discovery_splash' in e) {
            this.discoverySplash = e.discovery_splash
          }
          if ('features' in e) {
            this.features = e.features
          }
          if ('approximate_member_count' in e) {
            this.approximateMemberCount = e.approximate_member_count
          }
          if ('approximate_presence_count' in e) {
            this.approximatePresenceCount = e.approximate_presence_count
          }
          if ('description' in e) {
            this.description = e.description
          } else {
            this.description ??= null
          }
          if (!this.emojis) {
            this.emojis = new s()
          } else {
            this.emojis.clear()
          }
          for (const t of e.emojis) {
            this.emojis.set(t.id, new o(this.client, t, this))
          }
          this.stickers = e.stickers.reduce(
            (e, t) => e.set(t.id, new l(this.client, t)),
            new s()
          )
        }
        get createdTimestamp() {
          return n.timestampFrom(this.id)
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
        splashURL(e = {}) {
          return (
            this.splash && this.client.rest.cdn.splash(this.id, this.splash, e)
          )
        }
        discoverySplashURL(e = {}) {
          return (
            this.discoverySplash &&
            this.client.rest.cdn.discoverySplash(
              this.id,
              this.discoverySplash,
              e
            )
          )
        }
        iconURL(e = {}) {
          return this.icon && this.client.rest.cdn.icon(this.id, this.icon, e)
        }
        async fetch() {
          const e = await this.client.rest.get(r.guildPreview(this.id))
          this._patch(e)
          return this
        }
        toString() {
          return this.name
        }
        toJSON() {
          const e = super.toJSON()
          e.iconURL = this.iconURL()
          e.splashURL = this.splashURL()
          return e
        }
      }
      e.exports = GuildPreview
    },
    3570: (e, t, i) => {
      'use strict'
      const s = i(8708)
      class GuildPreviewEmoji extends s {
        constructor(e, t, i) {
          super(e, t, i)
          this.roles = t.roles
        }
      }
      e.exports = GuildPreviewEmoji
    },
    6122: (e, t, i) => {
      'use strict'
      const { DiscordSnowflake: s } = i(8673)
      const {
        GuildScheduledEventStatus: n,
        GuildScheduledEventEntityType: r,
        RouteBases: a,
      } = i(2)
      const o = i(4936)
      const { DiscordjsError: l, ErrorCodes: c } = i(8951)
      class GuildScheduledEvent extends o {
        constructor(e, t) {
          super(e)
          this.id = t.id
          this.guildId = t.guild_id
          this._patch(t)
        }
        _patch(e) {
          if ('channel_id' in e) {
            this.channelId = e.channel_id
          } else {
            this.channelId ??= null
          }
          if ('creator_id' in e) {
            this.creatorId = e.creator_id
          } else {
            this.creatorId ??= null
          }
          this.name = e.name
          if ('description' in e) {
            this.description = e.description
          } else {
            this.description ??= null
          }
          this.scheduledStartTimestamp = e.scheduled_start_time
            ? Date.parse(e.scheduled_start_time)
            : null
          this.scheduledEndTimestamp = e.scheduled_end_time
            ? Date.parse(e.scheduled_end_time)
            : null
          this.privacyLevel = e.privacy_level
          this.status = e.status
          this.entityType = e.entity_type
          if ('entity_id' in e) {
            this.entityId = e.entity_id
          } else {
            this.entityId ??= null
          }
          if ('user_count' in e) {
            this.userCount = e.user_count
          } else {
            this.userCount ??= null
          }
          if ('creator' in e) {
            this.creator = this.client.users._add(e.creator)
          } else {
            this.creator ??= this.client.users.resolve(this.creatorId)
          }
          if ('entity_metadata' in e) {
            if (e.entity_metadata) {
              this.entityMetadata = {
                location:
                  e.entity_metadata.location ??
                  this.entityMetadata?.location ??
                  null,
              }
            } else {
              this.entityMetadata = null
            }
          } else {
            this.entityMetadata ??= null
          }
          if ('image' in e) {
            this.image = e.image
          } else {
            this.image ??= null
          }
        }
        coverImageURL(e = {}) {
          return (
            this.image &&
            this.client.rest.cdn.guildScheduledEventCover(
              this.id,
              this.image,
              e
            )
          )
        }
        get createdTimestamp() {
          return s.timestampFrom(this.id)
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
        get scheduledStartAt() {
          return (
            this.scheduledStartTimestamp &&
            new Date(this.scheduledStartTimestamp)
          )
        }
        get scheduledEndAt() {
          return (
            this.scheduledEndTimestamp && new Date(this.scheduledEndTimestamp)
          )
        }
        get channel() {
          return this.client.channels.resolve(this.channelId)
        }
        get guild() {
          return this.client.guilds.resolve(this.guildId)
        }
        get url() {
          return `${a.scheduledEvent}/${this.guildId}/${this.id}`
        }
        async createInviteURL(e) {
          let t = this.channelId
          if (this.entityType === r.External) {
            if (!e?.channel) throw new l(c.InviteOptionsMissingChannel)
            t = this.guild.channels.resolveId(e.channel)
            if (!t) throw new l(c.GuildChannelResolve)
          }
          const i = await this.guild.invites.create(t, e)
          return `${a.invite}/${i.code}?event=${this.id}`
        }
        edit(e) {
          return this.guild.scheduledEvents.edit(this.id, e)
        }
        async delete() {
          await this.guild.scheduledEvents.delete(this.id)
          return this
        }
        setName(e, t) {
          return this.edit({ name: e, reason: t })
        }
        setScheduledStartTime(e, t) {
          return this.edit({ scheduledStartTime: e, reason: t })
        }
        setScheduledEndTime(e, t) {
          return this.edit({ scheduledEndTime: e, reason: t })
        }
        setDescription(e, t) {
          return this.edit({ description: e, reason: t })
        }
        setStatus(e, t) {
          return this.edit({ status: e, reason: t })
        }
        setLocation(e, t) {
          return this.edit({ entityMetadata: { location: e }, reason: t })
        }
        fetchSubscribers(e) {
          return this.guild.scheduledEvents.fetchSubscribers(this.id, e)
        }
        toString() {
          return this.url
        }
        isActive() {
          return this.status === n.Active
        }
        isCanceled() {
          return this.status === n.Canceled
        }
        isCompleted() {
          return this.status === n.Completed
        }
        isScheduled() {
          return this.status === n.Scheduled
        }
      }
      t.GuildScheduledEvent = GuildScheduledEvent
    },
    6378: (e, t, i) => {
      'use strict'
      const { setTimeout: s, clearTimeout: n } = i(2332)
      const { RouteBases: r, Routes: a } = i(2)
      const o = i(4936)
      const l = i(3989)
      const c = i(457)
      class GuildTemplate extends o {
        static GuildTemplatesPattern =
          /discord(?:app)?\.(?:com\/template|new)\/(?<code>[\w-]{2,255})/i
        constructor(e, t) {
          super(e)
          this._patch(t)
        }
        _patch(e) {
          if ('code' in e) {
            this.code = e.code
          }
          if ('name' in e) {
            this.name = e.name
          }
          if ('description' in e) {
            this.description = e.description
          }
          if ('usage_count' in e) {
            this.usageCount = e.usage_count
          }
          if ('creator_id' in e) {
            this.creatorId = e.creator_id
          }
          if ('creator' in e) {
            this.creator = this.client.users._add(e.creator)
          }
          if ('created_at' in e) {
            this.createdTimestamp = Date.parse(e.created_at)
          }
          if ('updated_at' in e) {
            this.updatedTimestamp = Date.parse(e.updated_at)
          }
          if ('source_guild_id' in e) {
            this.guildId = e.source_guild_id
          }
          if ('serialized_source_guild' in e) {
            this.serializedGuild = e.serialized_source_guild
          }
          this.unSynced = 'is_dirty' in e ? Boolean(e.is_dirty) : null
          return this
        }
        async createGuild(e, t) {
          const { client: i } = this
          const r = await i.rest.post(a.template(this.code), {
            body: { name: e, icon: await l.resolveImage(t) },
          })
          if (i.guilds.cache.has(r.id)) return i.guilds.cache.get(r.id)
          return new Promise((e) => {
            const resolveGuild = (t) => {
              i.off(c.GuildCreate, handleGuild)
              i.decrementMaxListeners()
              e(t)
            }
            const handleGuild = (e) => {
              if (e.id === r.id) {
                n(t)
                resolveGuild(e)
              }
            }
            i.incrementMaxListeners()
            i.on(c.GuildCreate, handleGuild)
            const t = s(() => resolveGuild(i.guilds._add(r)), 1e4).unref()
          })
        }
        async edit({ name: e, description: t } = {}) {
          const i = await this.client.rest.patch(
            a.guildTemplate(this.guildId, this.code),
            { body: { name: e, description: t } }
          )
          return this._patch(i)
        }
        async delete() {
          await this.client.rest.delete(
            a.guildTemplate(this.guildId, this.code)
          )
          return this
        }
        async sync() {
          const e = await this.client.rest.put(
            a.guildTemplate(this.guildId, this.code)
          )
          return this._patch(e)
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
        get updatedAt() {
          return new Date(this.updatedTimestamp)
        }
        get guild() {
          return this.client.guilds.resolve(this.guildId)
        }
        get url() {
          return `${r.template}/${this.code}`
        }
        toString() {
          return this.code
        }
      }
      e.exports = GuildTemplate
    },
    208: (e, t, i) => {
      'use strict'
      const { Routes: s } = i(2)
      const n = i(4936)
      const r = i(5606)
      class Integration extends n {
        constructor(e, t, i) {
          super(e)
          this.guild = i
          this.id = t.id
          this.name = t.name
          this.type = t.type
          this.enabled = t.enabled ?? null
          if ('syncing' in t) {
            this.syncing = t.syncing
          } else {
            this.syncing ??= null
          }
          this.role = this.guild.roles.resolve(t.role_id)
          if ('enable_emoticons' in t) {
            this.enableEmoticons = t.enable_emoticons
          } else {
            this.enableEmoticons ??= null
          }
          if (t.user) {
            this.user = this.client.users._add(t.user)
          } else {
            this.user ??= null
          }
          this.account = t.account
          if ('synced_at' in t) {
            this.syncedTimestamp = Date.parse(t.synced_at)
          } else {
            this.syncedTimestamp ??= null
          }
          if ('subscriber_count' in t) {
            this.subscriberCount = t.subscriber_count
          } else {
            this.subscriberCount ??= null
          }
          if ('revoked' in t) {
            this.revoked = t.revoked
          } else {
            this.revoked ??= null
          }
          this._patch(t)
        }
        get syncedAt() {
          return this.syncedTimestamp && new Date(this.syncedTimestamp)
        }
        get roles() {
          const e = this.guild.roles.cache
          return e.filter((e) => e.tags?.integrationId === this.id)
        }
        _patch(e) {
          if ('expire_behavior' in e) {
            this.expireBehavior = e.expire_behavior
          } else {
            this.expireBehavior ??= null
          }
          if ('expire_grace_period' in e) {
            this.expireGracePeriod = e.expire_grace_period
          } else {
            this.expireGracePeriod ??= null
          }
          if ('application' in e) {
            if (this.application) {
              this.application._patch(e.application)
            } else {
              this.application = new r(this.client, e.application)
            }
          } else {
            this.application ??= null
          }
          if ('scopes' in e) {
            this.scopes = e.scopes
          } else {
            this.scopes ??= []
          }
        }
        async delete(e) {
          await this.client.rest.delete(
            s.guildIntegration(this.guild.id, this.id),
            { reason: e }
          )
          return this
        }
        toJSON() {
          return super.toJSON({
            role: 'roleId',
            guild: 'guildId',
            user: 'userId',
          })
        }
      }
      e.exports = Integration
    },
    5606: (e, t, i) => {
      'use strict'
      const s = i(174)
      class IntegrationApplication extends s {
        _patch(e) {
          super._patch(e)
          if ('bot' in e) {
            this.bot = this.client.users._add(e.bot)
          } else {
            this.bot ??= null
          }
          if ('terms_of_service_url' in e) {
            this.termsOfServiceURL = e.terms_of_service_url
          } else {
            this.termsOfServiceURL ??= null
          }
          if ('privacy_policy_url' in e) {
            this.privacyPolicyURL = e.privacy_policy_url
          } else {
            this.privacyPolicyURL ??= null
          }
          if ('rpc_origins' in e) {
            this.rpcOrigins = e.rpc_origins
          } else {
            this.rpcOrigins ??= []
          }
          if ('hook' in e) {
            this.hook = e.hook
          } else {
            this.hook ??= null
          }
          if ('cover_image' in e) {
            this.cover = e.cover_image
          } else {
            this.cover ??= null
          }
          if ('verify_key' in e) {
            this.verifyKey = e.verify_key
          } else {
            this.verifyKey ??= null
          }
        }
      }
      e.exports = IntegrationApplication
    },
    4463: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const n = i(9984)
      const r = i(457)
      class InteractionCollector extends n {
        constructor(e, t = {}) {
          super(e, t)
          this.messageId = t.message?.id ?? null
          this.messageInteractionId = t.interactionResponse?.id ?? null
          this.channelId =
            t.interactionResponse?.interaction.channelId ??
            t.message?.channelId ??
            t.message?.channel_id ??
            this.client.channels.resolveId(t.channel)
          this.guildId =
            t.interactionResponse?.interaction.guildId ??
            t.message?.guildId ??
            t.message?.guild_id ??
            this.client.guilds.resolveId(t.channel?.guild) ??
            this.client.guilds.resolveId(t.guild)
          this.interactionType = t.interactionType ?? null
          this.componentType = t.componentType ?? null
          this.users = new s()
          this.total = 0
          this.client.incrementMaxListeners()
          const bulkDeleteListener = (e) => {
            if (e.has(this.messageId)) this.stop('messageDelete')
          }
          if (this.messageId || this.messageInteractionId) {
            this._handleMessageDeletion = this._handleMessageDeletion.bind(this)
            this.client.on(r.MessageDelete, this._handleMessageDeletion)
            this.client.on(r.MessageBulkDelete, bulkDeleteListener)
          }
          if (this.channelId) {
            this._handleChannelDeletion = this._handleChannelDeletion.bind(this)
            this._handleThreadDeletion = this._handleThreadDeletion.bind(this)
            this.client.on(r.ChannelDelete, this._handleChannelDeletion)
            this.client.on(r.ThreadDelete, this._handleThreadDeletion)
          }
          if (this.guildId) {
            this._handleGuildDeletion = this._handleGuildDeletion.bind(this)
            this.client.on(r.GuildDelete, this._handleGuildDeletion)
          }
          this.client.on(r.InteractionCreate, this.handleCollect)
          this.once('end', () => {
            this.client.removeListener(r.InteractionCreate, this.handleCollect)
            this.client.removeListener(
              r.MessageDelete,
              this._handleMessageDeletion
            )
            this.client.removeListener(r.MessageBulkDelete, bulkDeleteListener)
            this.client.removeListener(
              r.ChannelDelete,
              this._handleChannelDeletion
            )
            this.client.removeListener(
              r.ThreadDelete,
              this._handleThreadDeletion
            )
            this.client.removeListener(r.GuildDelete, this._handleGuildDeletion)
            this.client.decrementMaxListeners()
          })
          this.on('collect', (e) => {
            this.total++
            this.users.set(e.user.id, e.user)
          })
        }
        collect(e) {
          if (this.interactionType && e.type !== this.interactionType)
            return null
          if (this.componentType && e.componentType !== this.componentType)
            return null
          if (this.messageId && e.message?.id !== this.messageId) return null
          if (
            this.messageInteractionId &&
            e.message?.interaction?.id &&
            e.message.interaction.id !== this.messageInteractionId
          ) {
            return null
          }
          if (this.channelId && e.channelId !== this.channelId) return null
          if (this.guildId && e.guildId !== this.guildId) return null
          return e.id
        }
        dispose(e) {
          if (this.type && e.type !== this.type) return null
          if (this.componentType && e.componentType !== this.componentType)
            return null
          if (this.messageId && e.message?.id !== this.messageId) return null
          if (
            this.messageInteractionId &&
            e.message?.interaction?.id !== this.messageInteractionId
          )
            return null
          if (this.channelId && e.channelId !== this.channelId) return null
          if (this.guildId && e.guildId !== this.guildId) return null
          return e.id
        }
        empty() {
          this.total = 0
          this.collected.clear()
          this.users.clear()
          this.checkEnd()
        }
        get endReason() {
          if (this.options.max && this.total >= this.options.max) return 'limit'
          if (
            this.options.maxComponents &&
            this.collected.size >= this.options.maxComponents
          )
            return 'componentLimit'
          if (this.options.maxUsers && this.users.size >= this.options.maxUsers)
            return 'userLimit'
          return super.endReason
        }
        _handleMessageDeletion(e) {
          if (e.id === this.messageId) {
            this.stop('messageDelete')
          }
          if (e.interaction?.id === this.messageInteractionId) {
            this.stop('messageDelete')
          }
        }
        _handleChannelDeletion(e) {
          if (e.id === this.channelId || e.threads?.cache.has(this.channelId)) {
            this.stop('channelDelete')
          }
        }
        _handleThreadDeletion(e) {
          if (e.id === this.channelId) {
            this.stop('threadDelete')
          }
        }
        _handleGuildDeletion(e) {
          if (e.id === this.guildId) {
            this.stop('guildDelete')
          }
        }
      }
      e.exports = InteractionCollector
    },
    5281: (e, t, i) => {
      'use strict'
      const { InteractionType: s } = i(2)
      const { DiscordjsError: n, ErrorCodes: r } = i(8951)
      class InteractionResponse {
        constructor(e, t) {
          this.interaction = e
          this.id = t ?? e.id
          this.client = e.client
        }
        awaitMessageComponent(e = {}) {
          const t = { ...e, max: 1 }
          return new Promise((e, i) => {
            const s = this.createMessageComponentCollector(t)
            s.once('end', (t, s) => {
              const a = t.first()
              if (a) e(a)
              else i(new n(r.InteractionCollectorError, s))
            })
          })
        }
        createMessageComponentCollector(e = {}) {
          return new a(this.client, {
            ...e,
            interactionResponse: this,
            interactionType: s.MessageComponent,
          })
        }
      }
      const a = i(4463)
      e.exports = InteractionResponse
    },
    3445: (e, t, i) => {
      'use strict'
      const s = i(3630)
      class InteractionWebhook {
        constructor(e, t, i) {
          Object.defineProperty(this, 'client', { value: e })
          this.id = t
          Object.defineProperty(this, 'token', {
            value: i,
            writable: true,
            configurable: true,
          })
        }
        send() {}
        fetchMessage() {}
        editMessage() {}
        deleteMessage() {}
        get url() {}
      }
      s.applyToClass(InteractionWebhook, [
        'sendSlackMessage',
        'edit',
        'delete',
        'createdTimestamp',
        'createdAt',
      ])
      e.exports = InteractionWebhook
    },
    3493: (e, t, i) => {
      'use strict'
      const { RouteBases: s, Routes: n, PermissionFlagsBits: r } = i(2)
      const a = i(4936)
      const { GuildScheduledEvent: o } = i(6122)
      const l = i(5606)
      const c = i(4079)
      const { DiscordjsError: d, ErrorCodes: u } = i(8951)
      class Invite extends a {
        static InvitesPattern =
          /discord(?:(?:app)?\.com\/invite|\.gg(?:\/invite)?)\/(?<code>[\w-]{2,255})/i
        constructor(e, t) {
          super(e)
          this._patch(t)
        }
        _patch(e) {
          const t = i(8061)
          this.guild ??= null
          if (e.guild) {
            this.guild =
              this.client.guilds.resolve(e.guild.id) ??
              new t(this.client, e.guild)
          }
          if ('code' in e) {
            this.code = e.code
          }
          if ('approximate_presence_count' in e) {
            this.presenceCount = e.approximate_presence_count
          } else {
            this.presenceCount ??= null
          }
          if ('approximate_member_count' in e) {
            this.memberCount = e.approximate_member_count
          } else {
            this.memberCount ??= null
          }
          if ('temporary' in e) {
            this.temporary = e.temporary ?? null
          } else {
            this.temporary ??= null
          }
          if ('max_age' in e) {
            this.maxAge = e.max_age
          } else {
            this.maxAge ??= null
          }
          if ('uses' in e) {
            this.uses = e.uses
          } else {
            this.uses ??= null
          }
          if ('max_uses' in e) {
            this.maxUses = e.max_uses
          } else {
            this.maxUses ??= null
          }
          if ('inviter_id' in e) {
            this.inviterId = e.inviter_id
          } else {
            this.inviterId ??= null
          }
          if ('inviter' in e) {
            this.client.users._add(e.inviter)
            this.inviterId = e.inviter.id
          }
          if ('target_user' in e) {
            this.targetUser = this.client.users._add(e.target_user)
          } else {
            this.targetUser ??= null
          }
          if ('target_application' in e) {
            this.targetApplication = new l(this.client, e.target_application)
          } else {
            this.targetApplication ??= null
          }
          if ('target_type' in e) {
            this.targetType = e.target_type
          } else {
            this.targetType ??= null
          }
          if ('channel_id' in e) {
            this.channelId = e.channel_id
          }
          if ('channel' in e) {
            this.channel =
              this.client.channels._add(e.channel, this.guild, {
                cache: false,
              }) ?? this.client.channels.resolve(this.channelId)
            this.channelId ??= e.channel.id
          }
          if ('created_at' in e) {
            this.createdTimestamp = Date.parse(e.created_at)
          } else {
            this.createdTimestamp ??= null
          }
          if ('expires_at' in e) {
            this._expiresTimestamp = e.expires_at && Date.parse(e.expires_at)
          } else {
            this._expiresTimestamp ??= null
          }
          if ('stage_instance' in e) {
            this.stageInstance = new c(
              this.client,
              e.stage_instance,
              this.channel.id,
              this.guild.id
            )
          } else {
            this.stageInstance ??= null
          }
          if ('guild_scheduled_event' in e) {
            this.guildScheduledEvent = new o(
              this.client,
              e.guild_scheduled_event
            )
          } else {
            this.guildScheduledEvent ??= null
          }
        }
        get createdAt() {
          return this.createdTimestamp && new Date(this.createdTimestamp)
        }
        get deletable() {
          const e = this.guild
          if (!e || !this.client.guilds.cache.has(e.id)) return false
          if (!e.members.me) throw new d(u.GuildUncachedMe)
          return Boolean(
            this.channel
              ?.permissionsFor(this.client.user)
              .has(r.ManageChannels, false) ||
              e.members.me.permissions.has(r.ManageGuild)
          )
        }
        get expiresTimestamp() {
          return (
            this._expiresTimestamp ??
            (this.createdTimestamp && this.maxAge
              ? this.createdTimestamp + this.maxAge * 1e3
              : null)
          )
        }
        get expiresAt() {
          return this.expiresTimestamp && new Date(this.expiresTimestamp)
        }
        get inviter() {
          return this.inviterId && this.client.users.resolve(this.inviterId)
        }
        get url() {
          return `${s.invite}/${this.code}`
        }
        async delete(e) {
          await this.client.rest.delete(n.invite(this.code), { reason: e })
          return this
        }
        toString() {
          return this.url
        }
        toJSON() {
          return super.toJSON({
            url: true,
            expiresTimestamp: true,
            presenceCount: false,
            memberCount: false,
            uses: false,
            channel: 'channelId',
            inviter: 'inviterId',
            guild: 'guildId',
          })
        }
        valueOf() {
          return this.code
        }
      }
      e.exports = Invite
    },
    8061: (e, t, i) => {
      'use strict'
      const s = i(7888)
      const n = i(7710)
      class InviteGuild extends s {
        constructor(e, t) {
          super(e, t)
          this.welcomeScreen =
            typeof t.welcome_screen !== 'undefined'
              ? new n(this, t.welcome_screen)
              : null
        }
      }
      e.exports = InviteGuild
    },
    4079: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const n = i(4936)
      class InviteStageInstance extends n {
        constructor(e, t, i, n) {
          super(e)
          this.channelId = i
          this.guildId = n
          this.members = new s()
          this._patch(t)
        }
        _patch(e) {
          if ('topic' in e) {
            this.topic = e.topic
          }
          if ('participant_count' in e) {
            this.participantCount = e.participant_count
          }
          if ('speaker_count' in e) {
            this.speakerCount = e.speaker_count
          }
          this.members.clear()
          for (const t of e.members) {
            const e = this.guild.members._add(t)
            this.members.set(e.id, e)
          }
        }
        get channel() {
          return this.client.channels.resolve(this.channelId)
        }
        get guild() {
          return this.client.guilds.resolve(this.guildId)
        }
      }
      e.exports = InviteStageInstance
    },
    4895: (e, t, i) => {
      'use strict'
      const { MentionableSelectMenuBuilder: s, isJSONEncodable: n } = i(2547)
      const { toSnakeCase: r } = i(7910)
      class MentionableSelectMenuBuilder extends s {
        constructor(e = {}) {
          super(r(e))
        }
        static from(e) {
          if (n(e)) {
            return new this(e.toJSON())
          }
          return new this(e)
        }
      }
      e.exports = MentionableSelectMenuBuilder
    },
    1574: (e, t, i) => {
      'use strict'
      const s = i(6386)
      class MentionableSelectMenuComponent extends s {}
      e.exports = MentionableSelectMenuComponent
    },
    3754: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const n = i(8341)
      const r = i(457)
      class MentionableSelectMenuInteraction extends n {
        constructor(e, t) {
          super(e, t)
          const { resolved: i, values: n } = t.data
          const { members: a, users: o, roles: l } = i ?? {}
          this.values = n ?? []
          this.users = new s()
          this.members = new s()
          this.roles = new s()
          if (a) {
            for (const [e, t] of Object.entries(a)) {
              const i = o[e]
              if (!i) {
                this.client.emit(
                  r.Debug,
                  `[MentionableSelectMenuInteraction] Received a member without a user, skipping ${e}`
                )
                continue
              }
              this.members.set(
                e,
                this.guild?.members._add({ user: i, ...t }) ?? { user: i, ...t }
              )
            }
          }
          if (o) {
            for (const e of Object.values(o)) {
              this.users.set(e.id, this.client.users._add(e))
            }
          }
          if (l) {
            for (const e of Object.values(l)) {
              this.roles.set(e.id, this.guild?.roles._add(e) ?? e)
            }
          }
        }
      }
      e.exports = MentionableSelectMenuInteraction
    },
    6774: (e, t, i) => {
      'use strict'
      const { messageLink: s } = i(2547)
      const { Collection: n } = i(2676)
      const { DiscordSnowflake: r } = i(8673)
      const {
        InteractionType: a,
        ChannelType: o,
        MessageType: l,
        MessageFlags: c,
        PermissionFlagsBits: d,
      } = i(2)
      const u = i(8855)
      const h = i(4936)
      const m = i(7538)
      const p = i(1458)
      const f = i(4463)
      const g = i(1291)
      const v = i(9822)
      const y = i(5883)
      const { Sticker: _ } = i(2736)
      const { DiscordjsError: b, ErrorCodes: w } = i(8951)
      const C = i(7500)
      const { createComponent: S } = i(6129)
      const { NonSystemMessageTypes: M, MaxBulkDeletableMessageAge: I } =
        i(6047)
      const T = i(7323)
      const E = i(9238)
      const { cleanContent: R, resolvePartialEmoji: A } = i(7966)
      class Message extends h {
        constructor(e, t) {
          super(e)
          this.channelId = t.channel_id
          this.guildId = t.guild_id ?? this.channel?.guild?.id ?? null
          this._patch(t)
        }
        _patch(e) {
          this.id = e.id
          this.createdTimestamp = r.timestampFrom(this.id)
          if ('type' in e) {
            this.type = e.type
            this.system = !M.includes(this.type)
          } else {
            this.system ??= null
            this.type ??= null
          }
          if ('content' in e) {
            this.content = e.content
          } else {
            this.content ??= null
          }
          if ('author' in e) {
            this.author = this.client.users._add(e.author, !e.webhook_id)
          } else {
            this.author ??= null
          }
          if ('pinned' in e) {
            this.pinned = Boolean(e.pinned)
          } else {
            this.pinned ??= null
          }
          if ('tts' in e) {
            this.tts = e.tts
          } else {
            this.tts ??= null
          }
          if ('nonce' in e) {
            this.nonce = e.nonce
          } else {
            this.nonce ??= null
          }
          if ('embeds' in e) {
            this.embeds = e.embeds.map((e) => new p(e))
          } else {
            this.embeds = this.embeds?.slice() ?? []
          }
          if ('components' in e) {
            this.components = e.components.map((e) => S(e))
          } else {
            this.components = this.components?.slice() ?? []
          }
          if ('attachments' in e) {
            this.attachments = new n()
            if (e.attachments) {
              for (const t of e.attachments) {
                this.attachments.set(t.id, new u(t))
              }
            }
          } else {
            this.attachments = new n(this.attachments)
          }
          if ('sticker_items' in e || 'stickers' in e) {
            this.stickers = new n(
              (e.sticker_items ?? e.stickers)?.map((e) => [
                e.id,
                new _(this.client, e),
              ])
            )
          } else {
            this.stickers = new n(this.stickers)
          }
          if ('position' in e) {
            this.position = e.position
          } else {
            this.position ??= null
          }
          if (e.edited_timestamp) {
            this.editedTimestamp = Date.parse(e.edited_timestamp)
          } else {
            this.editedTimestamp ??= null
          }
          if ('reactions' in e) {
            this.reactions = new C(this)
            if (e.reactions?.length > 0) {
              for (const t of e.reactions) {
                this.reactions._add(t)
              }
            }
          } else {
            this.reactions ??= new C(this)
          }
          if (!this.mentions) {
            this.mentions = new g(
              this,
              e.mentions,
              e.mention_roles,
              e.mention_everyone,
              e.mention_channels,
              e.referenced_message?.author
            )
          } else {
            this.mentions = new g(
              this,
              e.mentions ?? this.mentions.users,
              e.mention_roles ?? this.mentions.roles,
              e.mention_everyone ?? this.mentions.everyone,
              e.mention_channels ?? this.mentions.crosspostedChannels,
              e.referenced_message?.author ?? this.mentions.repliedUser
            )
          }
          if ('webhook_id' in e) {
            this.webhookId = e.webhook_id
          } else {
            this.webhookId ??= null
          }
          if ('application' in e) {
            this.groupActivityApplication = new m(this.client, e.application)
          } else {
            this.groupActivityApplication ??= null
          }
          if ('application_id' in e) {
            this.applicationId = e.application_id
          } else {
            this.applicationId ??= null
          }
          if ('activity' in e) {
            this.activity = {
              partyId: e.activity.party_id,
              type: e.activity.type,
            }
          } else {
            this.activity ??= null
          }
          if ('thread' in e) {
            this.client.channels._add(e.thread, this.guild)
          }
          if (this.member && e.member) {
            this.member._patch(e.member)
          } else if (e.member && this.guild && this.author) {
            this.guild.members._add(
              Object.assign(e.member, { user: this.author })
            )
          }
          if ('flags' in e) {
            this.flags = new T(e.flags).freeze()
          } else {
            this.flags = new T(this.flags).freeze()
          }
          if ('message_reference' in e) {
            this.reference = {
              channelId: e.message_reference.channel_id,
              guildId: e.message_reference.guild_id,
              messageId: e.message_reference.message_id,
            }
          } else {
            this.reference ??= null
          }
          if (e.referenced_message) {
            this.channel?.messages._add({
              guild_id: e.message_reference?.guild_id,
              ...e.referenced_message,
            })
          }
          if (e.interaction) {
            this.interaction = {
              id: e.interaction.id,
              type: e.interaction.type,
              commandName: e.interaction.name,
              user: this.client.users._add(e.interaction.user),
            }
          } else {
            this.interaction ??= null
          }
        }
        get channel() {
          return this.client.channels.resolve(this.channelId)
        }
        get partial() {
          return typeof this.content !== 'string' || !this.author
        }
        get member() {
          return this.guild?.members.resolve(this.author) ?? null
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
        get editedAt() {
          return this.editedTimestamp && new Date(this.editedTimestamp)
        }
        get guild() {
          return (
            this.client.guilds.resolve(this.guildId) ??
            this.channel?.guild ??
            null
          )
        }
        get hasThread() {
          return this.flags.has(c.HasThread)
        }
        get thread() {
          return this.channel?.threads?.resolve(this.id) ?? null
        }
        get url() {
          return this.inGuild()
            ? s(this.channelId, this.id, this.guildId)
            : s(this.channelId, this.id)
        }
        get cleanContent() {
          return this.content != null ? R(this.content, this.channel) : null
        }
        createReactionCollector(e = {}) {
          return new y(this, e)
        }
        awaitReactions(e = {}) {
          return new Promise((t, i) => {
            const s = this.createReactionCollector(e)
            s.once('end', (s, n) => {
              if (e.errors?.includes(n)) i(s)
              else t(s)
            })
          })
        }
        createMessageComponentCollector(e = {}) {
          return new f(this.client, {
            ...e,
            interactionType: a.MessageComponent,
            message: this,
          })
        }
        awaitMessageComponent(e = {}) {
          const t = { ...e, max: 1 }
          return new Promise((e, i) => {
            const s = this.createMessageComponentCollector(t)
            s.once('end', (t, s) => {
              const n = t.first()
              if (n) e(n)
              else i(new b(w.InteractionCollectorError, s))
            })
          })
        }
        get editable() {
          const e = Boolean(
            this.author.id === this.client.user.id &&
              (!this.guild || this.channel?.viewable)
          )
          if (this.channel?.isThread()) {
            return e && !this.channel.locked
          }
          return e
        }
        get deletable() {
          if (!this.guild) {
            return this.author.id === this.client.user.id
          }
          if (!this.channel?.viewable) {
            return false
          }
          const e = this.channel?.permissionsFor(this.client.user)
          if (!e) return false
          if (e.has(d.Administrator, false)) return true
          return Boolean(
            this.author.id === this.client.user.id ||
              (e.has(d.ManageMessages, false) &&
                this.guild.members.me.communicationDisabledUntilTimestamp <
                  Date.now())
          )
        }
        get bulkDeletable() {
          const e = this.channel?.permissionsFor(this.client.user)
          return (
            (this.inGuild() &&
              Date.now() - this.createdTimestamp < I &&
              this.deletable &&
              e?.has(d.ManageMessages, false)) ??
            false
          )
        }
        get pinnable() {
          const { channel: e } = this
          return Boolean(
            !this.system &&
              (!this.guild ||
                (e?.viewable &&
                  e
                    ?.permissionsFor(this.client.user)
                    ?.has(d.ManageMessages, false)))
          )
        }
        async fetchReference() {
          if (!this.reference) throw new b(w.MessageReferenceMissing)
          const { channelId: e, messageId: t } = this.reference
          const i = this.client.channels.resolve(e)
          if (!i) throw new b(w.GuildChannelResolve)
          const s = await i.messages.fetch(t)
          return s
        }
        get crosspostable() {
          const e =
            d.SendMessages |
            (this.author.id === this.client.user.id
              ? E.DefaultBit
              : d.ManageMessages)
          const { channel: t } = this
          return Boolean(
            t?.type === o.GuildAnnouncement &&
              !this.flags.has(c.Crossposted) &&
              this.type === l.Default &&
              t.viewable &&
              t.permissionsFor(this.client.user)?.has(e, false)
          )
        }
        edit(e) {
          if (!this.channel) return Promise.reject(new b(w.ChannelNotCached))
          return this.channel.messages.edit(this, e)
        }
        crosspost() {
          if (!this.channel) return Promise.reject(new b(w.ChannelNotCached))
          return this.channel.messages.crosspost(this.id)
        }
        async pin(e) {
          if (!this.channel) throw new b(w.ChannelNotCached)
          await this.channel.messages.pin(this.id, e)
          return this
        }
        async unpin(e) {
          if (!this.channel) throw new b(w.ChannelNotCached)
          await this.channel.messages.unpin(this.id, e)
          return this
        }
        async react(e) {
          if (!this.channel) throw new b(w.ChannelNotCached)
          await this.channel.messages.react(this.id, e)
          return this.client.actions.MessageReactionAdd.handle(
            {
              user: this.client.user,
              channel: this.channel,
              message: this,
              emoji: A(e),
            },
            true
          ).reaction
        }
        async delete() {
          if (!this.channel) throw new b(w.ChannelNotCached)
          await this.channel.messages.delete(this.id)
          return this
        }
        reply(e) {
          if (!this.channel) return Promise.reject(new b(w.ChannelNotCached))
          let t
          if (e instanceof v) {
            t = e
          } else {
            t = v.create(this, e, {
              reply: {
                messageReference: this,
                failIfNotExists:
                  e?.failIfNotExists ?? this.client.options.failIfNotExists,
              },
            })
          }
          return this.channel.send(t)
        }
        startThread(e = {}) {
          if (!this.channel) return Promise.reject(new b(w.ChannelNotCached))
          if (![o.GuildText, o.GuildAnnouncement].includes(this.channel.type)) {
            return Promise.reject(new b(w.MessageThreadParent))
          }
          if (this.hasThread)
            return Promise.reject(new b(w.MessageExistingThread))
          return this.channel.threads.create({ ...e, startMessage: this })
        }
        fetch(e = true) {
          if (!this.channel) return Promise.reject(new b(w.ChannelNotCached))
          return this.channel.messages.fetch({ message: this.id, force: e })
        }
        fetchWebhook() {
          if (!this.webhookId) return Promise.reject(new b(w.WebhookMessage))
          if (this.webhookId === this.applicationId)
            return Promise.reject(new b(w.WebhookApplication))
          return this.client.fetchWebhook(this.webhookId)
        }
        suppressEmbeds(e = true) {
          const t = new T(this.flags.bitfield)
          if (e) {
            t.add(c.SuppressEmbeds)
          } else {
            t.remove(c.SuppressEmbeds)
          }
          return this.edit({ flags: t })
        }
        removeAttachments() {
          return this.edit({ attachments: [] })
        }
        resolveComponent(e) {
          return (
            this.components
              .flatMap((e) => e.components)
              .find((t) => t.customId === e) ?? null
          )
        }
        equals(e, t) {
          if (!e) return false
          const i = !e.author && !e.attachments
          if (i)
            return this.id === e.id && this.embeds.length === e.embeds.length
          let s =
            this.id === e.id &&
            this.author.id === e.author.id &&
            this.content === e.content &&
            this.tts === e.tts &&
            this.nonce === e.nonce &&
            this.embeds.length === e.embeds.length &&
            this.attachments.length === e.attachments.length
          if (s && t) {
            s =
              this.mentions.everyone === e.mentions.everyone &&
              this.createdTimestamp === Date.parse(t.timestamp) &&
              this.editedTimestamp === Date.parse(t.edited_timestamp)
          }
          return s
        }
        inGuild() {
          return Boolean(this.guildId)
        }
        toString() {
          return this.content
        }
        toJSON() {
          return super.toJSON({
            channel: 'channelId',
            author: 'authorId',
            groupActivityApplication: 'groupActivityApplicationId',
            guild: 'guildId',
            cleanContent: true,
            member: false,
            reactions: false,
          })
        }
      }
      t.Message = Message
    },
    5506: (e, t, i) => {
      'use strict'
      const s = i(9984)
      const n = i(457)
      class MessageCollector extends s {
        constructor(e, t = {}) {
          super(e.client, t)
          this.channel = e
          this.received = 0
          const bulkDeleteListener = (e) => {
            for (const t of e.values()) this.handleDispose(t)
          }
          this._handleChannelDeletion = this._handleChannelDeletion.bind(this)
          this._handleThreadDeletion = this._handleThreadDeletion.bind(this)
          this._handleGuildDeletion = this._handleGuildDeletion.bind(this)
          this.client.incrementMaxListeners()
          this.client.on(n.MessageCreate, this.handleCollect)
          this.client.on(n.MessageDelete, this.handleDispose)
          this.client.on(n.MessageBulkDelete, bulkDeleteListener)
          this.client.on(n.ChannelDelete, this._handleChannelDeletion)
          this.client.on(n.ThreadDelete, this._handleThreadDeletion)
          this.client.on(n.GuildDelete, this._handleGuildDeletion)
          this.once('end', () => {
            this.client.removeListener(n.MessageCreate, this.handleCollect)
            this.client.removeListener(n.MessageDelete, this.handleDispose)
            this.client.removeListener(n.MessageBulkDelete, bulkDeleteListener)
            this.client.removeListener(
              n.ChannelDelete,
              this._handleChannelDeletion
            )
            this.client.removeListener(
              n.ThreadDelete,
              this._handleThreadDeletion
            )
            this.client.removeListener(n.GuildDelete, this._handleGuildDeletion)
            this.client.decrementMaxListeners()
          })
        }
        collect(e) {
          if (e.channelId !== this.channel.id) return null
          this.received++
          return e.id
        }
        dispose(e) {
          return e.channelId === this.channel.id ? e.id : null
        }
        get endReason() {
          if (this.options.max && this.collected.size >= this.options.max)
            return 'limit'
          if (
            this.options.maxProcessed &&
            this.received === this.options.maxProcessed
          )
            return 'processedLimit'
          return super.endReason
        }
        _handleChannelDeletion(e) {
          if (e.id === this.channel.id || e.id === this.channel.parentId) {
            this.stop('channelDelete')
          }
        }
        _handleThreadDeletion(e) {
          if (e.id === this.channel.id) {
            this.stop('threadDelete')
          }
        }
        _handleGuildDeletion(e) {
          if (e.id === this.channel.guild?.id) {
            this.stop('guildDelete')
          }
        }
      }
      e.exports = MessageCollector
    },
    8341: (e, t, i) => {
      'use strict'
      const { lazy: s } = i(9575)
      const n = i(1879)
      const r = i(3445)
      const a = i(2047)
      const o = s(() => i(6774).Message)
      class MessageComponentInteraction extends n {
        constructor(e, t) {
          super(e, t)
          this.message =
            this.channel?.messages._add(t.message) ?? new (o())(e, t.message)
          this.customId = t.data.custom_id
          this.componentType = t.data.component_type
          this.deferred = false
          this.ephemeral = null
          this.replied = false
          this.webhook = new r(this.client, this.applicationId, this.token)
        }
        get component() {
          return this.message.components
            .flatMap((e) => e.components)
            .find((e) => (e.customId ?? e.custom_id) === this.customId)
        }
        deferReply() {}
        reply() {}
        fetchReply() {}
        editReply() {}
        deleteReply() {}
        followUp() {}
        deferUpdate() {}
        update() {}
        showModal() {}
        awaitModalSubmit() {}
      }
      a.applyToClass(MessageComponentInteraction)
      e.exports = MessageComponentInteraction
    },
    167: (e, t, i) => {
      'use strict'
      const s = i(47)
      class MessageContextMenuCommandInteraction extends s {
        get targetMessage() {
          return this.options.getMessage('message')
        }
      }
      e.exports = MessageContextMenuCommandInteraction
    },
    1291: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { FormattingPatterns: n } = i(2)
      const { flatten: r } = i(7966)
      class MessageMentions {
        static EveryonePattern = /@(?<mention>everyone|here)/
        static UsersPattern = n.UserWithOptionalNickname
        static RolesPattern = n.Role
        static ChannelsPattern = n.Channel
        static GlobalChannelsPattern = new RegExp(
          this.ChannelsPattern.source,
          'g'
        )
        static GlobalUsersPattern = new RegExp(this.UsersPattern.source, 'g')
        constructor(e, t, i, n, r, a) {
          Object.defineProperty(this, 'client', { value: e.client })
          Object.defineProperty(this, 'guild', { value: e.guild })
          Object.defineProperty(this, '_content', { value: e.content })
          this.everyone = Boolean(n)
          if (t) {
            if (t instanceof s) {
              this.users = new s(t)
            } else {
              this.users = new s()
              for (const i of t) {
                if (i.member && e.guild) {
                  e.guild.members._add(Object.assign(i.member, { user: i }))
                }
                const t = e.client.users._add(i)
                this.users.set(t.id, t)
              }
            }
          } else {
            this.users = new s()
          }
          if (i instanceof s) {
            this.roles = new s(i)
          } else if (i) {
            this.roles = new s()
            const t = e.guild
            if (t) {
              for (const e of i) {
                const i = t.roles.cache.get(e)
                if (i) this.roles.set(i.id, i)
              }
            }
          } else {
            this.roles = new s()
          }
          this._members = null
          this._channels = null
          this._parsedUsers = null
          if (r) {
            if (r instanceof s) {
              this.crosspostedChannels = new s(r)
            } else {
              this.crosspostedChannels = new s()
              for (const e of r) {
                this.crosspostedChannels.set(e.id, {
                  channelId: e.id,
                  guildId: e.guild_id,
                  type: e.type,
                  name: e.name,
                })
              }
            }
          } else {
            this.crosspostedChannels = new s()
          }
          this.repliedUser = a ? this.client.users._add(a) : null
        }
        get members() {
          if (this._members) return this._members
          if (!this.guild) return null
          this._members = new s()
          this.users.forEach((e) => {
            const t = this.guild.members.resolve(e)
            if (t) this._members.set(t.user.id, t)
          })
          return this._members
        }
        get channels() {
          if (this._channels) return this._channels
          this._channels = new s()
          let e
          while (
            (e = this.constructor.GlobalChannelsPattern.exec(this._content)) !==
            null
          ) {
            const t = this.client.channels.cache.get(e.groups.id)
            if (t) this._channels.set(t.id, t)
          }
          return this._channels
        }
        get parsedUsers() {
          if (this._parsedUsers) return this._parsedUsers
          this._parsedUsers = new s()
          let e
          while (
            (e = this.constructor.GlobalUsersPattern.exec(this._content)) !==
            null
          ) {
            const t = this.client.users.cache.get(e[1])
            if (t) this._parsedUsers.set(t.id, t)
          }
          return this._parsedUsers
        }
        has(
          e,
          {
            ignoreDirect: t = false,
            ignoreRoles: i = false,
            ignoreRepliedUser: s = false,
            ignoreEveryone: n = false,
          } = {}
        ) {
          const r = this.client.users.resolve(e)
          if (!n && r && this.everyone) return true
          const a = r && this.repliedUser?.id === r.id
          if (!s && a && this.users.has(r.id)) return true
          if (!t) {
            if (r && (!s || this.parsedUsers.has(r.id)) && this.users.has(r.id))
              return true
            const t = this.guild?.roles.resolve(e)
            if (t && this.roles.has(t.id)) return true
            const i = this.client.channels.resolve(e)
            if (i && this.channels.has(i.id)) return true
          }
          if (!i) {
            const t = this.guild?.members.resolve(e)
            if (t) {
              for (const e of this.roles.values())
                if (t.roles.cache.has(e.id)) return true
            }
          }
          return false
        }
        toJSON() {
          return r(this, { members: true, channels: true })
        }
      }
      e.exports = MessageMentions
    },
    9822: (e, t, i) => {
      'use strict'
      const { Buffer: s } = i(2254)
      const { isJSONEncodable: n } = i(2547)
      const { lazy: r } = i(9575)
      const { MessageFlags: a } = i(2)
      const o = i(112)
      const { DiscordjsRangeError: l, ErrorCodes: c } = i(8951)
      const d = i(3989)
      const u = i(7323)
      const { basename: h, verifyString: m } = i(7966)
      const p = r(() => i(1879))
      class MessagePayload {
        constructor(e, t) {
          this.target = e
          this.options = t
          this.body = null
          this.files = null
        }
        get isWebhook() {
          const e = i(3630)
          const t = i(3661)
          return this.target instanceof e || this.target instanceof t
        }
        get isUser() {
          const e = i(8569)
          const { GuildMember: t } = i(5780)
          return this.target instanceof e || this.target instanceof t
        }
        get isMessage() {
          const { Message: e } = i(6774)
          return this.target instanceof e
        }
        get isMessageManager() {
          const e = i(9903)
          return this.target instanceof e
        }
        get isInteraction() {
          const e = p()
          const t = i(3445)
          return this.target instanceof e || this.target instanceof t
        }
        makeContent() {
          let e
          if (this.options.content === null) {
            e = ''
          } else if (typeof this.options.content !== 'undefined') {
            e = m(this.options.content, l, c.MessageContentType, true)
          }
          return e
        }
        resolveBody() {
          if (this.body) return this
          const e = this.isInteraction
          const t = this.isWebhook
          const i = this.makeContent()
          const s = Boolean(this.options.tts)
          let r
          if (typeof this.options.nonce !== 'undefined') {
            r = this.options.nonce
            if (
              typeof r === 'number'
                ? !Number.isInteger(r)
                : typeof r !== 'string'
            ) {
              throw new l(c.MessageNonceType)
            }
          }
          const d = this.options.components?.map((e) =>
            (n(e) ? e : new o(e)).toJSON()
          )
          let h
          let m
          let p
          if (t) {
            h = this.options.username ?? this.target.name
            if (this.options.avatarURL) m = this.options.avatarURL
            if (this.options.threadName) p = this.options.threadName
          }
          let f
          if (
            typeof this.options.flags !== 'undefined' ||
            (this.isMessage && typeof this.options.reply === 'undefined') ||
            this.isMessageManager
          ) {
            f =
              this.options.flags != null
                ? new u(this.options.flags).bitfield
                : this.target.flags?.bitfield
          }
          if (e && this.options.ephemeral) {
            f |= a.Ephemeral
          }
          let g =
            typeof this.options.allowedMentions === 'undefined'
              ? this.target.client.options.allowedMentions
              : this.options.allowedMentions
          if (typeof g?.repliedUser !== 'undefined') {
            g = { ...g, replied_user: g.repliedUser }
            delete g.repliedUser
          }
          let v
          if (typeof this.options.reply === 'object') {
            const e = this.options.reply.messageReference
            const t = this.isMessage
              ? e.id ?? e
              : this.target.messages.resolveId(e)
            if (t) {
              v = {
                message_id: t,
                fail_if_not_exists:
                  this.options.reply.failIfNotExists ??
                  this.target.client.options.failIfNotExists,
              }
            }
          }
          const y = this.options.files?.map((e, t) => ({
            id: t.toString(),
            description: e.description,
          }))
          if (Array.isArray(this.options.attachments)) {
            this.options.attachments.push(...(y ?? []))
          } else {
            this.options.attachments = y
          }
          this.body = {
            content: i,
            tts: s,
            nonce: r,
            embeds: this.options.embeds?.map((e) =>
              n(e) ? e.toJSON() : this.target.client.options.jsonTransformer(e)
            ),
            components: d,
            username: h,
            avatar_url: m,
            allowed_mentions:
              typeof i === 'undefined' && typeof v === 'undefined'
                ? undefined
                : g,
            flags: f,
            message_reference: v,
            attachments: this.options.attachments,
            sticker_ids: this.options.stickers?.map((e) => e.id ?? e),
            thread_name: p,
          }
          return this
        }
        async resolveFiles() {
          if (this.files) return this
          this.files = await Promise.all(
            this.options.files?.map((e) => this.constructor.resolveFile(e)) ??
              []
          )
          return this
        }
        static async resolveFile(e) {
          let t
          let i
          const findName = (e) => {
            if (typeof e === 'string') {
              return h(e)
            }
            if (e.path) {
              return h(e.path)
            }
            return 'file.jpg'
          }
          const n =
            typeof e === 'string' ||
            e instanceof s ||
            typeof e.pipe === 'function'
          if (n) {
            t = e
            i = findName(t)
          } else {
            t = e.attachment
            i = e.name ?? findName(t)
          }
          const { data: r, contentType: a } = await d.resolveFile(t)
          return { data: r, name: i, contentType: a }
        }
        static create(e, t, i = {}) {
          return new this(
            e,
            typeof t !== 'object' || t === null
              ? { content: t, ...i }
              : { ...t, ...i }
          )
        }
      }
      e.exports = MessagePayload
    },
    5477: (e, t, i) => {
      'use strict'
      const { Routes: s } = i(2)
      const n = i(3130)
      const r = i(116)
      const a = i(7041)
      const { flatten: o } = i(7966)
      class MessageReaction {
        constructor(e, t, i) {
          Object.defineProperty(this, 'client', { value: e })
          this.message = i
          this.me = t.me
          this.users = new a(this, this.me ? [e.user] : [])
          this._emoji = new r(this, t.emoji)
          this._patch(t)
        }
        _patch(e) {
          if ('count' in e) {
            this.count ??= e.count
          }
        }
        react() {
          return this.message.react(this.emoji)
        }
        async remove() {
          await this.client.rest.delete(
            s.channelMessageReaction(
              this.message.channelId,
              this.message.id,
              this._emoji.identifier
            )
          )
          return this
        }
        get emoji() {
          if (this._emoji instanceof n) return this._emoji
          if (this._emoji.id) {
            const e = this.message.client.emojis.cache
            if (e.has(this._emoji.id)) {
              const t = e.get(this._emoji.id)
              this._emoji = t
              return t
            }
          }
          return this._emoji
        }
        get partial() {
          return this.count === null
        }
        async fetch() {
          const e = await this.message.fetch()
          const t = e.reactions.cache.get(this.emoji.id ?? this.emoji.name)
          this._patch(t ?? { count: 0 })
          return this
        }
        toJSON() {
          return o(this, { emoji: 'emojiId', message: 'messageId' })
        }
        _add(e) {
          if (this.partial) return
          this.users.cache.set(e.id, e)
          if (
            !this.me ||
            e.id !== this.message.client.user.id ||
            this.count === 0
          )
            this.count++
          this.me ||= e.id === this.message.client.user.id
        }
        _remove(e) {
          if (this.partial) return
          this.users.cache.delete(e.id)
          if (!this.me || e.id !== this.message.client.user.id) this.count--
          if (e.id === this.message.client.user.id) this.me = false
          if (this.count <= 0 && this.users.cache.size === 0) {
            this.message.reactions.cache.delete(
              this.emoji.id ?? this.emoji.name
            )
          }
        }
      }
      e.exports = MessageReaction
    },
    6756: (e, t, i) => {
      'use strict'
      const {
        ModalBuilder: s,
        ComponentBuilder: n,
        isJSONEncodable: r,
      } = i(2547)
      const { toSnakeCase: a } = i(7910)
      class ModalBuilder extends s {
        constructor({ components: e, ...t } = {}) {
          super({
            ...a(t),
            components: e?.map((e) => (e instanceof n ? e : a(e))),
          })
        }
        static from(e) {
          if (r(e)) {
            return new this(e.toJSON())
          }
          return new this(e)
        }
      }
      e.exports = ModalBuilder
    },
    7837: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { ComponentType: n } = i(2)
      const { DiscordjsTypeError: r, ErrorCodes: a } = i(8951)
      class ModalSubmitFields {
        constructor(e) {
          this.components = e
          this.fields = e.reduce((e, t) => {
            t.components.forEach((t) => e.set(t.customId, t))
            return e
          }, new s())
        }
        getField(e, t) {
          const i = this.fields.get(e)
          if (!i) throw new r(a.ModalSubmitInteractionFieldNotFound, e)
          if (t !== undefined && t !== i.type) {
            throw new r(a.ModalSubmitInteractionFieldType, e, i.type, t)
          }
          return i
        }
        getTextInputValue(e) {
          return this.getField(e, n.TextInput).value
        }
      }
      e.exports = ModalSubmitFields
    },
    9461: (e, t, i) => {
      'use strict'
      const { lazy: s } = i(9575)
      const n = i(1879)
      const r = i(3445)
      const a = i(7837)
      const o = i(2047)
      const l = s(() => i(6774).Message)
      class ModalSubmitInteraction extends n {
        constructor(e, t) {
          super(e, t)
          this.customId = t.data.custom_id
          if ('message' in t) {
            this.message =
              this.channel?.messages._add(t.message) ??
              new (l())(this.client, t.message)
          } else {
            this.message = null
          }
          this.components = t.data.components?.map((e) =>
            ModalSubmitInteraction.transformComponent(e)
          )
          this.fields = new a(this.components)
          this.deferred = false
          this.replied = false
          this.ephemeral = null
          this.webhook = new r(this.client, this.applicationId, this.token)
        }
        static transformComponent(e) {
          return {
            value: e.value,
            type: e.type,
            customId: e.custom_id,
            components: e.components?.map((e) => this.transformComponent(e)),
          }
        }
        isFromMessage() {
          return Boolean(this.message)
        }
        deferReply() {}
        reply() {}
        fetchReply() {}
        editReply() {}
        deleteReply() {}
        followUp() {}
        deferUpdate() {}
        update() {}
      }
      o.applyToClass(ModalSubmitInteraction, 'showModal')
      e.exports = ModalSubmitInteraction
    },
    2793: (e, t, i) => {
      'use strict'
      const { Routes: s } = i(2)
      const n = i(8967)
      const { DiscordjsError: r, ErrorCodes: a } = i(8951)
      class NewsChannel extends n {
        async addFollower(e, t) {
          const i = this.guild.channels.resolveId(e)
          if (!i) throw new r(a.GuildChannelResolve)
          await this.client.rest.post(s.channelFollowers(this.id), {
            body: { webhook_channel_id: i },
            reason: t,
          })
          return this
        }
      }
      e.exports = NewsChannel
    },
    4736: (e, t, i) => {
      'use strict'
      const s = i(6918)
      const n = i(9238)
      class OAuth2Guild extends s {
        constructor(e, t) {
          super(e, t)
          this.owner = t.owner
          this.permissions = new n(BigInt(t.permissions)).freeze()
        }
      }
      e.exports = OAuth2Guild
    },
    2562: (e, t, i) => {
      'use strict'
      const { BaseChannel: s } = i(6948)
      const { DiscordjsError: n, ErrorCodes: r } = i(8951)
      class PartialGroupDMChannel extends s {
        constructor(e, t) {
          super(e, t)
          this.flags = null
          this.name = t.name
          this.icon = t.icon
          this.recipients = t.recipients
        }
        iconURL(e = {}) {
          return (
            this.icon && this.client.rest.cdn.channelIcon(this.id, this.icon, e)
          )
        }
        delete() {
          return Promise.reject(new n(r.DeleteGroupDMChannel))
        }
        fetch() {
          return Promise.reject(new n(r.FetchGroupDMChannel))
        }
      }
      e.exports = PartialGroupDMChannel
    },
    1812: (e, t, i) => {
      'use strict'
      const { OverwriteType: s } = i(2)
      const n = i(4936)
      const { Role: r } = i(8033)
      const { DiscordjsTypeError: a, ErrorCodes: o } = i(8951)
      const l = i(9238)
      class PermissionOverwrites extends n {
        constructor(e, t, i) {
          super(e)
          Object.defineProperty(this, 'channel', { value: i })
          if (t) this._patch(t)
        }
        _patch(e) {
          this.id = e.id
          if ('type' in e) {
            this.type = e.type
          }
          if ('deny' in e) {
            this.deny = new l(BigInt(e.deny)).freeze()
          }
          if ('allow' in e) {
            this.allow = new l(BigInt(e.allow)).freeze()
          }
        }
        async edit(e, t) {
          await this.channel.permissionOverwrites.upsert(
            this.id,
            e,
            { type: this.type, reason: t },
            this
          )
          return this
        }
        async delete(e) {
          await this.channel.permissionOverwrites.delete(this.id, e)
          return this
        }
        toJSON() {
          return {
            id: this.id,
            type: this.type,
            allow: this.allow,
            deny: this.deny,
          }
        }
        static resolveOverwriteOptions(e, { allow: t, deny: i } = {}) {
          t = new l(t)
          i = new l(i)
          for (const [s, n] of Object.entries(e)) {
            if (n === true) {
              t.add(s)
              i.remove(s)
            } else if (n === false) {
              t.remove(s)
              i.add(s)
            } else if (n === null) {
              t.remove(s)
              i.remove(s)
            }
          }
          return { allow: t, deny: i }
        }
        static resolve(e, t) {
          if (e instanceof this) return e.toJSON()
          if (typeof e.id === 'string' && e.type in s) {
            return {
              id: e.id,
              type: e.type,
              allow: l.resolve(e.allow ?? l.DefaultBit).toString(),
              deny: l.resolve(e.deny ?? l.DefaultBit).toString(),
            }
          }
          const i = t.roles.resolve(e.id) ?? t.client.users.resolve(e.id)
          if (!i) throw new a(o.InvalidType, 'parameter', 'User nor a Role')
          const n = i instanceof r ? s.Role : s.Member
          return {
            id: i.id,
            type: n,
            allow: l.resolve(e.allow ?? l.DefaultBit).toString(),
            deny: l.resolve(e.deny ?? l.DefaultBit).toString(),
          }
        }
      }
      e.exports = PermissionOverwrites
    },
    4253: (e, t, i) => {
      'use strict'
      const s = i(4936)
      const { Emoji: n } = i(1168)
      const r = i(7558)
      const { flatten: a } = i(7966)
      class Presence extends s {
        constructor(e, t = {}) {
          super(e)
          this.userId = t.user.id
          this.guild = t.guild ?? null
          this._patch(t)
        }
        get user() {
          return this.client.users.resolve(this.userId)
        }
        get member() {
          return this.guild.members.resolve(this.userId)
        }
        _patch(e) {
          if ('status' in e) {
            this.status = e.status
          } else {
            this.status ??= 'offline'
          }
          if ('activities' in e) {
            this.activities = e.activities.map((e) => new Activity(this, e))
          } else {
            this.activities ??= []
          }
          if ('client_status' in e) {
            this.clientStatus = e.client_status
          } else {
            this.clientStatus ??= null
          }
          return this
        }
        _clone() {
          const e = Object.assign(Object.create(this), this)
          e.activities = this.activities.map((e) => e._clone())
          return e
        }
        equals(e) {
          return (
            this === e ||
            (e &&
              this.status === e.status &&
              this.activities.length === e.activities.length &&
              this.activities.every((t, i) => t.equals(e.activities[i])) &&
              this.clientStatus?.web === e.clientStatus?.web &&
              this.clientStatus?.mobile === e.clientStatus?.mobile &&
              this.clientStatus?.desktop === e.clientStatus?.desktop)
          )
        }
        toJSON() {
          return a(this)
        }
      }
      class Activity {
        constructor(e, t) {
          Object.defineProperty(this, 'presence', { value: e })
          this.name = t.name
          this.type = t.type
          this.url = t.url ?? null
          this.details = t.details ?? null
          this.state = t.state ?? null
          this.applicationId = t.application_id ?? null
          this.timestamps = t.timestamps
            ? {
                start: t.timestamps.start
                  ? new Date(Number(t.timestamps.start))
                  : null,
                end: t.timestamps.end
                  ? new Date(Number(t.timestamps.end))
                  : null,
              }
            : null
          this.party = t.party ?? null
          this.assets = t.assets ? new RichPresenceAssets(this, t.assets) : null
          this.flags = new r(t.flags).freeze()
          this.emoji = t.emoji ? new n(e.client, t.emoji) : null
          this.buttons = t.buttons ?? []
          this.createdTimestamp = t.created_at
        }
        equals(e) {
          return (
            this === e ||
            (e &&
              this.name === e.name &&
              this.type === e.type &&
              this.url === e.url &&
              this.state === e.state &&
              this.details === e.details &&
              this.emoji?.id === e.emoji?.id &&
              this.emoji?.name === e.emoji?.name)
          )
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
        toString() {
          return this.name
        }
        _clone() {
          return Object.assign(Object.create(this), this)
        }
      }
      class RichPresenceAssets {
        constructor(e, t) {
          Object.defineProperty(this, 'activity', { value: e })
          this.largeText = t.large_text ?? null
          this.smallText = t.small_text ?? null
          this.largeImage = t.large_image ?? null
          this.smallImage = t.small_image ?? null
        }
        smallImageURL(e = {}) {
          if (!this.smallImage) return null
          if (this.smallImage.includes(':')) {
            const [e, t] = this.smallImage.split(':')
            switch (e) {
              case 'mp':
                return `https://media.discordapp.net/${t}`
              default:
                return null
            }
          }
          return this.activity.presence.client.rest.cdn.appAsset(
            this.activity.applicationId,
            this.smallImage,
            e
          )
        }
        largeImageURL(e = {}) {
          if (!this.largeImage) return null
          if (this.largeImage.includes(':')) {
            const [e, t] = this.largeImage.split(':')
            switch (e) {
              case 'mp':
                return `https://media.discordapp.net/${t}`
              default:
                return null
            }
          }
          return this.activity.presence.client.rest.cdn.appAsset(
            this.activity.applicationId,
            this.largeImage,
            e
          )
        }
      }
      t.Presence = Presence
      t.Activity = Activity
      t.RichPresenceAssets = RichPresenceAssets
    },
    5883: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const n = i(9984)
      const r = i(457)
      class ReactionCollector extends n {
        constructor(e, t = {}) {
          super(e.client, t)
          this.message = e
          this.users = new s()
          this.total = 0
          this.empty = this.empty.bind(this)
          this._handleChannelDeletion = this._handleChannelDeletion.bind(this)
          this._handleThreadDeletion = this._handleThreadDeletion.bind(this)
          this._handleGuildDeletion = this._handleGuildDeletion.bind(this)
          this._handleMessageDeletion = this._handleMessageDeletion.bind(this)
          const bulkDeleteListener = (e) => {
            if (e.has(this.message.id)) this.stop('messageDelete')
          }
          this.client.incrementMaxListeners()
          this.client.on(r.MessageReactionAdd, this.handleCollect)
          this.client.on(r.MessageReactionRemove, this.handleDispose)
          this.client.on(r.MessageReactionRemoveAll, this.empty)
          this.client.on(r.MessageDelete, this._handleMessageDeletion)
          this.client.on(r.MessageBulkDelete, bulkDeleteListener)
          this.client.on(r.ChannelDelete, this._handleChannelDeletion)
          this.client.on(r.ThreadDelete, this._handleThreadDeletion)
          this.client.on(r.GuildDelete, this._handleGuildDeletion)
          this.once('end', () => {
            this.client.removeListener(r.MessageReactionAdd, this.handleCollect)
            this.client.removeListener(
              r.MessageReactionRemove,
              this.handleDispose
            )
            this.client.removeListener(r.MessageReactionRemoveAll, this.empty)
            this.client.removeListener(
              r.MessageDelete,
              this._handleMessageDeletion
            )
            this.client.removeListener(r.MessageBulkDelete, bulkDeleteListener)
            this.client.removeListener(
              r.ChannelDelete,
              this._handleChannelDeletion
            )
            this.client.removeListener(
              r.ThreadDelete,
              this._handleThreadDeletion
            )
            this.client.removeListener(r.GuildDelete, this._handleGuildDeletion)
            this.client.decrementMaxListeners()
          })
          this.on('collect', (e, t) => {
            if (e.count === 1) {
              this.emit('create', e, t)
            }
            this.total++
            this.users.set(t.id, t)
          })
          this.on('remove', (e, t) => {
            this.total--
            if (!this.collected.some((e) => e.users.cache.has(t.id)))
              this.users.delete(t.id)
          })
        }
        collect(e) {
          if (e.message.id !== this.message.id) return null
          return ReactionCollector.key(e)
        }
        dispose(e, t) {
          if (e.message.id !== this.message.id) return null
          if (
            this.collected.has(ReactionCollector.key(e)) &&
            this.users.has(t.id)
          ) {
            this.emit('remove', e, t)
          }
          return e.count ? null : ReactionCollector.key(e)
        }
        empty() {
          this.total = 0
          this.collected.clear()
          this.users.clear()
          this.checkEnd()
        }
        get endReason() {
          if (this.options.max && this.total >= this.options.max) return 'limit'
          if (
            this.options.maxEmojis &&
            this.collected.size >= this.options.maxEmojis
          )
            return 'emojiLimit'
          if (this.options.maxUsers && this.users.size >= this.options.maxUsers)
            return 'userLimit'
          return super.endReason
        }
        _handleMessageDeletion(e) {
          if (e.id === this.message.id) {
            this.stop('messageDelete')
          }
        }
        _handleChannelDeletion(e) {
          if (
            e.id === this.message.channelId ||
            e.threads?.cache.has(this.message.channelId)
          ) {
            this.stop('channelDelete')
          }
        }
        _handleThreadDeletion(e) {
          if (e.id === this.message.channelId) {
            this.stop('threadDelete')
          }
        }
        _handleGuildDeletion(e) {
          if (e.id === this.message.guild?.id) {
            this.stop('guildDelete')
          }
        }
        static key(e) {
          return e.emoji.id ?? e.emoji.name
        }
      }
      e.exports = ReactionCollector
    },
    116: (e, t, i) => {
      'use strict'
      const { Emoji: s } = i(1168)
      const { flatten: n } = i(7966)
      class ReactionEmoji extends s {
        constructor(e, t) {
          super(e.message.client, t)
          this.reaction = e
        }
        toJSON() {
          return n(this, { identifier: true })
        }
        valueOf() {
          return this.id
        }
      }
      e.exports = ReactionEmoji
    },
    8033: (e, t, i) => {
      'use strict'
      const { DiscordSnowflake: s } = i(8673)
      const { PermissionFlagsBits: n } = i(2)
      const r = i(4936)
      const { DiscordjsError: a, ErrorCodes: o } = i(8951)
      const l = i(9238)
      class Role extends r {
        constructor(e, t, i) {
          super(e)
          this.guild = i
          this.icon = null
          this.unicodeEmoji = null
          if (t) this._patch(t)
        }
        _patch(e) {
          this.id = e.id
          if ('name' in e) {
            this.name = e.name
          }
          if ('color' in e) {
            this.color = e.color
          }
          if ('hoist' in e) {
            this.hoist = e.hoist
          }
          if ('position' in e) {
            this.rawPosition = e.position
          }
          if ('permissions' in e) {
            this.permissions = new l(BigInt(e.permissions)).freeze()
          }
          if ('managed' in e) {
            this.managed = e.managed
          }
          if ('mentionable' in e) {
            this.mentionable = e.mentionable
          }
          if ('icon' in e) this.icon = e.icon
          if ('unicode_emoji' in e) this.unicodeEmoji = e.unicode_emoji
          this.tags = e.tags ? {} : null
          if (e.tags) {
            if ('bot_id' in e.tags) {
              this.tags.botId = e.tags.bot_id
            }
            if ('integration_id' in e.tags) {
              this.tags.integrationId = e.tags.integration_id
            }
            if ('premium_subscriber' in e.tags) {
              this.tags.premiumSubscriberRole = true
            }
          }
        }
        get createdTimestamp() {
          return s.timestampFrom(this.id)
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
        get hexColor() {
          return `#${this.color.toString(16).padStart(6, '0')}`
        }
        get members() {
          return this.guild.members.cache.filter((e) =>
            e.roles.cache.has(this.id)
          )
        }
        get editable() {
          if (this.managed) return false
          const e = this.guild.members.resolve(this.client.user)
          if (!e.permissions.has(n.ManageRoles)) return false
          return e.roles.highest.comparePositionTo(this) > 0
        }
        get position() {
          const e = this.guild._sortedRoles()
          return [...e.values()].indexOf(e.get(this.id))
        }
        comparePositionTo(e) {
          return this.guild.roles.comparePositions(this, e)
        }
        edit(e) {
          return this.guild.roles.edit(this, e)
        }
        permissionsIn(e, t = true) {
          e = this.guild.channels.resolve(e)
          if (!e) throw new a(o.GuildChannelResolve)
          return e.rolePermissions(this, t)
        }
        setName(e, t) {
          return this.edit({ name: e, reason: t })
        }
        setColor(e, t) {
          return this.edit({ color: e, reason: t })
        }
        setHoist(e = true, t) {
          return this.edit({ hoist: e, reason: t })
        }
        setPermissions(e, t) {
          return this.edit({ permissions: e, reason: t })
        }
        setMentionable(e = true, t) {
          return this.edit({ mentionable: e, reason: t })
        }
        setIcon(e, t) {
          return this.edit({ icon: e, reason: t })
        }
        setUnicodeEmoji(e, t) {
          return this.edit({ unicodeEmoji: e, reason: t })
        }
        setPosition(e, t = {}) {
          return this.guild.roles.setPosition(this, e, t)
        }
        async delete(e) {
          await this.guild.roles.delete(this.id, e)
          return this
        }
        iconURL(e = {}) {
          return (
            this.icon && this.client.rest.cdn.roleIcon(this.id, this.icon, e)
          )
        }
        equals(e) {
          return (
            e &&
            this.id === e.id &&
            this.name === e.name &&
            this.color === e.color &&
            this.hoist === e.hoist &&
            this.position === e.position &&
            this.permissions.bitfield === e.permissions.bitfield &&
            this.managed === e.managed &&
            this.icon === e.icon &&
            this.unicodeEmoji === e.unicodeEmoji
          )
        }
        toString() {
          if (this.id === this.guild.id) return '@everyone'
          return `<@&${this.id}>`
        }
        toJSON() {
          return {
            ...super.toJSON({ createdTimestamp: true }),
            permissions: this.permissions.toJSON(),
          }
        }
      }
      t.Role = Role
    },
    5564: (e, t, i) => {
      'use strict'
      const { RoleSelectMenuBuilder: s, isJSONEncodable: n } = i(2547)
      const { toSnakeCase: r } = i(7910)
      class RoleSelectMenuBuilder extends s {
        constructor(e = {}) {
          super(r(e))
        }
        static from(e) {
          if (n(e)) {
            return new this(e.toJSON())
          }
          return new this(e)
        }
      }
      e.exports = RoleSelectMenuBuilder
    },
    5744: (e, t, i) => {
      'use strict'
      const s = i(6386)
      class RoleSelectMenuComponent extends s {}
      e.exports = RoleSelectMenuComponent
    },
    4961: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const n = i(8341)
      class RoleSelectMenuInteraction extends n {
        constructor(e, t) {
          super(e, t)
          const { resolved: i, values: n } = t.data
          this.values = n ?? []
          this.roles = new s()
          for (const e of Object.values(i?.roles ?? {})) {
            this.roles.set(e.id, this.guild?.roles._add(e) ?? e)
          }
        }
      }
      e.exports = RoleSelectMenuInteraction
    },
    6241: (e, t, i) => {
      'use strict'
      const s = i(7742)
      const n = i(2392)
      let r = false
      class SelectMenuBuilder extends n {
        constructor(...e) {
          super(...e)
          if (!r) {
            s.emitWarning(
              'The SelectMenuBuilder class is deprecated, use StringSelectMenuBuilder instead.',
              'DeprecationWarning'
            )
            r = true
          }
        }
      }
      e.exports = SelectMenuBuilder
    },
    5924: (e, t, i) => {
      'use strict'
      const s = i(7742)
      const n = i(2784)
      let r = false
      class SelectMenuComponent extends n {
        constructor(...e) {
          super(...e)
          if (!r) {
            s.emitWarning(
              'The SelectMenuComponent class is deprecated, use StringSelectMenuComponent instead.',
              'DeprecationWarning'
            )
            r = true
          }
        }
      }
      e.exports = SelectMenuComponent
    },
    9063: (e, t, i) => {
      'use strict'
      const s = i(7742)
      const n = i(4433)
      let r = false
      class SelectMenuInteraction extends n {
        constructor(...e) {
          super(...e)
          if (!r) {
            s.emitWarning(
              'The SelectMenuInteraction class is deprecated, use StringSelectMenuInteraction instead.',
              'DeprecationWarning'
            )
            r = true
          }
        }
      }
      e.exports = SelectMenuInteraction
    },
    9683: (e, t, i) => {
      'use strict'
      const s = i(7742)
      const n = i(7355)
      let r = false
      class SelectMenuOptionBuilder extends n {
        constructor(...e) {
          super(...e)
          if (!r) {
            s.emitWarning(
              'The SelectMenuOptionBuilder class is deprecated, use StringSelectMenuOptionBuilder instead.',
              'DeprecationWarning'
            )
            r = true
          }
        }
      }
      e.exports = SelectMenuOptionBuilder
    },
    8096: (e, t, i) => {
      'use strict'
      const s = i(9417)
      class StageChannel extends s {
        _patch(e) {
          super._patch(e)
          if ('topic' in e) {
            this.topic = e.topic
          }
        }
        get stageInstance() {
          return (
            this.guild.stageInstances.cache.find(
              (e) => e.channelId === this.id
            ) ?? null
          )
        }
        createStageInstance(e) {
          return this.guild.stageInstances.create(this.id, e)
        }
        setTopic(e, t) {
          return this.edit({ topic: e, reason: t })
        }
      }
      e.exports = StageChannel
    },
    4233: (e, t, i) => {
      'use strict'
      const { DiscordSnowflake: s } = i(8673)
      const n = i(4936)
      class StageInstance extends n {
        constructor(e, t) {
          super(e)
          this.id = t.id
          this._patch(t)
        }
        _patch(e) {
          if ('guild_id' in e) {
            this.guildId = e.guild_id
          }
          if ('channel_id' in e) {
            this.channelId = e.channel_id
          }
          if ('topic' in e) {
            this.topic = e.topic
          }
          if ('privacy_level' in e) {
            this.privacyLevel = e.privacy_level
          }
          if ('discoverable_disabled' in e) {
            this.discoverableDisabled = e.discoverable_disabled
          } else {
            this.discoverableDisabled ??= null
          }
          if ('guild_scheduled_event_id' in e) {
            this.guildScheduledEventId = e.guild_scheduled_event_id
          } else {
            this.guildScheduledEventId ??= null
          }
        }
        get channel() {
          return this.client.channels.resolve(this.channelId)
        }
        get guild() {
          return this.client.guilds.resolve(this.guildId)
        }
        get guildScheduledEvent() {
          return (
            this.guild?.scheduledEvents.resolve(this.guildScheduledEventId) ??
            null
          )
        }
        edit(e) {
          return this.guild.stageInstances.edit(this.channelId, e)
        }
        async delete() {
          await this.guild.stageInstances.delete(this.channelId)
          const e = this._clone()
          return e
        }
        setTopic(e) {
          return this.guild.stageInstances.edit(this.channelId, { topic: e })
        }
        get createdTimestamp() {
          return s.timestampFrom(this.id)
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
      }
      t.StageInstance = StageInstance
    },
    2736: (e, t, i) => {
      'use strict'
      const { DiscordSnowflake: s } = i(8673)
      const { Routes: n, StickerFormatType: r } = i(2)
      const a = i(4936)
      const { DiscordjsError: o, ErrorCodes: l } = i(8951)
      class Sticker extends a {
        constructor(e, t) {
          super(e)
          this._patch(t)
        }
        _patch(e) {
          this.id = e.id
          if ('description' in e) {
            this.description = e.description
          } else {
            this.description ??= null
          }
          if ('type' in e) {
            this.type = e.type
          } else {
            this.type ??= null
          }
          if ('format_type' in e) {
            this.format = e.format_type
          }
          if ('name' in e) {
            this.name = e.name
          }
          if ('pack_id' in e) {
            this.packId = e.pack_id
          } else {
            this.packId ??= null
          }
          if ('tags' in e) {
            this.tags = e.tags
          } else {
            this.tags ??= null
          }
          if ('available' in e) {
            this.available = e.available
          } else {
            this.available ??= null
          }
          if ('guild_id' in e) {
            this.guildId = e.guild_id
          } else {
            this.guildId ??= null
          }
          if ('user' in e) {
            this.user = this.client.users._add(e.user)
          } else {
            this.user ??= null
          }
          if ('sort_value' in e) {
            this.sortValue = e.sort_value
          } else {
            this.sortValue ??= null
          }
        }
        get createdTimestamp() {
          return s.timestampFrom(this.id)
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
        get partial() {
          return !this.type
        }
        get guild() {
          return this.client.guilds.resolve(this.guildId)
        }
        get url() {
          return this.client.rest.cdn.sticker(
            this.id,
            this.format === r.Lottie ? 'json' : 'png'
          )
        }
        async fetch() {
          const e = await this.client.rest.get(n.sticker(this.id))
          this._patch(e)
          return this
        }
        async fetchPack() {
          return (
            (this.packId &&
              (await this.client.fetchPremiumStickerPacks()).get(
                this.packId
              )) ??
            null
          )
        }
        async fetchUser() {
          if (this.partial) await this.fetch()
          if (!this.guildId) throw new o(l.NotGuildSticker)
          return this.guild.stickers.fetchUser(this)
        }
        edit(e) {
          return this.guild.stickers.edit(this, e)
        }
        async delete(e) {
          await this.guild.stickers.delete(this, e)
          return this
        }
        equals(e) {
          if (e instanceof Sticker) {
            return (
              e.id === this.id &&
              e.description === this.description &&
              e.type === this.type &&
              e.format === this.format &&
              e.name === this.name &&
              e.packId === this.packId &&
              e.tags === this.tags &&
              e.available === this.available &&
              e.guildId === this.guildId &&
              e.sortValue === this.sortValue
            )
          } else {
            return (
              e.id === this.id &&
              e.description === this.description &&
              e.name === this.name &&
              e.tags === this.tags
            )
          }
        }
      }
      t.Sticker = Sticker
    },
    4864: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { DiscordSnowflake: n } = i(8673)
      const r = i(4936)
      const { Sticker: a } = i(2736)
      class StickerPack extends r {
        constructor(e, t) {
          super(e)
          this.id = t.id
          this.stickers = new s(t.stickers.map((t) => [t.id, new a(e, t)]))
          this.name = t.name
          this.skuId = t.sku_id
          this.coverStickerId = t.cover_sticker_id ?? null
          this.description = t.description
          this.bannerId = t.banner_asset_id ?? null
        }
        get createdTimestamp() {
          return n.timestampFrom(this.id)
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
        get coverSticker() {
          return this.coverStickerId && this.stickers.get(this.coverStickerId)
        }
        bannerURL(e = {}) {
          return (
            this.bannerId &&
            this.client.rest.cdn.stickerPackBanner(this.bannerId, e)
          )
        }
      }
      e.exports = StickerPack
    },
    2392: (e, t, i) => {
      'use strict'
      const {
        SelectMenuBuilder: s,
        isJSONEncodable: n,
        normalizeArray: r,
      } = i(2547)
      const { toSnakeCase: a } = i(7910)
      const { resolvePartialEmoji: o } = i(7966)
      class StringSelectMenuBuilder extends s {
        constructor({ options: e, ...t } = {}) {
          super(
            a({
              ...t,
              options: e?.map(({ emoji: e, ...t }) => ({
                ...t,
                emoji: e && typeof e === 'string' ? o(e) : e,
              })),
            })
          )
        }
        static normalizeEmoji(e) {
          if (n(e)) {
            return e
          }
          const { emoji: t, ...i } = e
          return { ...i, emoji: typeof t === 'string' ? o(t) : t }
        }
        addOptions(...e) {
          return super.addOptions(
            r(e).map((e) => StringSelectMenuBuilder.normalizeEmoji(e))
          )
        }
        setOptions(...e) {
          return super.setOptions(
            r(e).map((e) => StringSelectMenuBuilder.normalizeEmoji(e))
          )
        }
        static from(e) {
          if (n(e)) {
            return new this(e.toJSON())
          }
          return new this(e)
        }
      }
      e.exports = StringSelectMenuBuilder
    },
    2784: (e, t, i) => {
      'use strict'
      const s = i(6386)
      class StringSelectMenuComponent extends s {
        get options() {
          return this.data.options
        }
      }
      e.exports = StringSelectMenuComponent
    },
    4433: (e, t, i) => {
      'use strict'
      const s = i(8341)
      class StringSelectMenuInteraction extends s {
        constructor(e, t) {
          super(e, t)
          this.values = t.data.values ?? []
        }
      }
      e.exports = StringSelectMenuInteraction
    },
    7355: (e, t, i) => {
      'use strict'
      const { SelectMenuOptionBuilder: s, isJSONEncodable: n } = i(2547)
      const { toSnakeCase: r } = i(7910)
      const { resolvePartialEmoji: a } = i(7966)
      class StringSelectMenuOptionBuilder extends s {
        constructor({ emoji: e, ...t } = {}) {
          super(r({ ...t, emoji: e && typeof e === 'string' ? a(e) : e }))
        }
        setEmoji(e) {
          if (typeof e === 'string') {
            return super.setEmoji(a(e))
          }
          return super.setEmoji(e)
        }
        static from(e) {
          if (n(e)) {
            return new this(e.toJSON())
          }
          return new this(e)
        }
      }
      e.exports = StringSelectMenuOptionBuilder
    },
    2683: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { DiscordSnowflake: n } = i(8673)
      const r = i(4936)
      const a = i(3192)
      class Team extends r {
        constructor(e, t) {
          super(e)
          this._patch(t)
        }
        _patch(e) {
          this.id = e.id
          if ('name' in e) {
            this.name = e.name
          }
          if ('icon' in e) {
            this.icon = e.icon
          } else {
            this.icon ??= null
          }
          if ('owner_user_id' in e) {
            this.ownerId = e.owner_user_id
          } else {
            this.ownerId ??= null
          }
          this.members = new s()
          for (const t of e.members) {
            const e = new a(this, t)
            this.members.set(e.id, e)
          }
        }
        get owner() {
          return this.members.get(this.ownerId) ?? null
        }
        get createdTimestamp() {
          return n.timestampFrom(this.id)
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
        iconURL(e = {}) {
          return (
            this.icon && this.client.rest.cdn.teamIcon(this.id, this.icon, e)
          )
        }
        toString() {
          return this.name
        }
        toJSON() {
          return super.toJSON({ createdTimestamp: true })
        }
      }
      e.exports = Team
    },
    3192: (e, t, i) => {
      'use strict'
      const s = i(4936)
      class TeamMember extends s {
        constructor(e, t) {
          super(e.client)
          this.team = e
          this._patch(t)
        }
        _patch(e) {
          if ('permissions' in e) {
            this.permissions = e.permissions
          }
          if ('membership_state' in e) {
            this.membershipState = e.membership_state
          }
          if ('user' in e) {
            this.user = this.client.users._add(e.user)
          }
        }
        get id() {
          return this.user.id
        }
        toString() {
          return this.user.toString()
        }
      }
      e.exports = TeamMember
    },
    7541: (e, t, i) => {
      'use strict'
      const s = i(8967)
      class TextChannel extends s {
        _patch(e) {
          super._patch(e)
          if ('rate_limit_per_user' in e) {
            this.rateLimitPerUser = e.rate_limit_per_user
          }
        }
        setRateLimitPerUser(e, t) {
          return this.edit({ rateLimitPerUser: e, reason: t })
        }
      }
      e.exports = TextChannel
    },
    6342: (e, t, i) => {
      'use strict'
      const { TextInputBuilder: s, isJSONEncodable: n } = i(2547)
      const { toSnakeCase: r } = i(7910)
      class TextInputBuilder extends s {
        constructor(e) {
          super(r(e))
        }
        static from(e) {
          if (n(e)) {
            return new this(e.toJSON())
          }
          return new this(e)
        }
      }
      e.exports = TextInputBuilder
    },
    4597: (e, t, i) => {
      'use strict'
      const s = i(1688)
      class TextInputComponent extends s {
        get customId() {
          return this.data.custom_id
        }
        get value() {
          return this.data.value
        }
      }
      e.exports = TextInputComponent
    },
    7522: (e, t, i) => {
      'use strict'
      const {
        ChannelType: s,
        PermissionFlagsBits: n,
        Routes: r,
        ChannelFlags: a,
      } = i(2)
      const { BaseChannel: o } = i(6948)
      const l = i(5954)
      const { DiscordjsRangeError: c, ErrorCodes: d } = i(8951)
      const u = i(9903)
      const h = i(3038)
      const m = i(4874)
      class ThreadChannel extends o {
        constructor(e, t, i, s = false) {
          super(e?.client ?? i, t, false)
          this.guild = e
          this.guildId = e?.id ?? t.guild_id
          this.messages = new u(this)
          this.members = new h(this)
          if (t) this._patch(t, s)
        }
        _patch(e, t = false) {
          super._patch(e)
          if ('name' in e) {
            this.name = e.name
          }
          if ('guild_id' in e) {
            this.guildId = e.guild_id
          }
          if ('parent_id' in e) {
            this.parentId = e.parent_id
          } else {
            this.parentId ??= null
          }
          if ('thread_metadata' in e) {
            this.locked = e.thread_metadata.locked ?? false
            this.invitable =
              this.type === s.PrivateThread
                ? e.thread_metadata.invitable ?? false
                : null
            this.archived = e.thread_metadata.archived
            this.autoArchiveDuration = e.thread_metadata.auto_archive_duration
            this.archiveTimestamp = Date.parse(
              e.thread_metadata.archive_timestamp
            )
            if ('create_timestamp' in e.thread_metadata) {
              this._createdTimestamp = Date.parse(
                e.thread_metadata.create_timestamp
              )
            }
          } else {
            this.locked ??= null
            this.archived ??= null
            this.autoArchiveDuration ??= null
            this.archiveTimestamp ??= null
            this.invitable ??= null
          }
          this._createdTimestamp ??=
            this.type === s.PrivateThread ? super.createdTimestamp : null
          if ('owner_id' in e) {
            this.ownerId = e.owner_id
          } else {
            this.ownerId ??= null
          }
          if ('last_message_id' in e) {
            this.lastMessageId = e.last_message_id
          } else {
            this.lastMessageId ??= null
          }
          if ('last_pin_timestamp' in e) {
            this.lastPinTimestamp = e.last_pin_timestamp
              ? Date.parse(e.last_pin_timestamp)
              : null
          } else {
            this.lastPinTimestamp ??= null
          }
          if ('rate_limit_per_user' in e || !t) {
            this.rateLimitPerUser = e.rate_limit_per_user ?? 0
          } else {
            this.rateLimitPerUser ??= null
          }
          if ('message_count' in e) {
            this.messageCount = e.message_count
          } else {
            this.messageCount ??= null
          }
          if ('member_count' in e) {
            this.memberCount = e.member_count
          } else {
            this.memberCount ??= null
          }
          if ('total_message_sent' in e) {
            this.totalMessageSent = e.total_message_sent
          } else {
            this.totalMessageSent ??= null
          }
          if (e.member && this.client.user)
            this.members._add({ user_id: this.client.user.id, ...e.member })
          if (e.messages) for (const t of e.messages) this.messages._add(t)
          if ('applied_tags' in e) {
            this.appliedTags = e.applied_tags
          } else {
            this.appliedTags ??= []
          }
        }
        get createdTimestamp() {
          return this._createdTimestamp
        }
        get guildMembers() {
          return this.members.cache.mapValues((e) => e.guildMember)
        }
        get archivedAt() {
          return this.archiveTimestamp && new Date(this.archiveTimestamp)
        }
        get createdAt() {
          return this.createdTimestamp && new Date(this.createdTimestamp)
        }
        get parent() {
          return this.guild.channels.resolve(this.parentId)
        }
        async join() {
          await this.members.add('@me')
          return this
        }
        async leave() {
          await this.members.remove('@me')
          return this
        }
        permissionsFor(e, t) {
          return this.parent?.permissionsFor(e, t) ?? null
        }
        async fetchOwner({ cache: e = true, force: t = false } = {}) {
          if (!t) {
            const e = this.members.cache.get(this.ownerId)
            if (e) return e
          }
          const i = await this.members.fetch({ cache: e })
          return i.get(this.ownerId) ?? null
        }
        async fetchStarterMessage(e) {
          const t = this.parent?.type === s.GuildForum ? this : this.parent
          return t?.messages.fetch({ message: this.id, ...e }) ?? null
        }
        async edit(e) {
          const t = await this.client.rest.patch(r.channel(this.id), {
            body: {
              name: (e.name ?? this.name).trim(),
              archived: e.archived,
              auto_archive_duration: e.autoArchiveDuration,
              rate_limit_per_user: e.rateLimitPerUser,
              locked: e.locked,
              invitable:
                this.type === s.PrivateThread ? e.invitable : undefined,
              applied_tags: e.appliedTags,
              flags: 'flags' in e ? m.resolve(e.flags) : undefined,
            },
            reason: e.reason,
          })
          return this.client.actions.ChannelUpdate.handle(t).updated
        }
        setArchived(e = true, t) {
          return this.edit({ archived: e, reason: t })
        }
        setAutoArchiveDuration(e, t) {
          return this.edit({ autoArchiveDuration: e, reason: t })
        }
        setInvitable(e = true, t) {
          if (this.type !== s.PrivateThread) {
            return Promise.reject(new c(d.ThreadInvitableType, this.type))
          }
          return this.edit({ invitable: e, reason: t })
        }
        setLocked(e = true, t) {
          return this.edit({ locked: e, reason: t })
        }
        setName(e, t) {
          return this.edit({ name: e, reason: t })
        }
        setRateLimitPerUser(e, t) {
          return this.edit({ rateLimitPerUser: e, reason: t })
        }
        setAppliedTags(e, t) {
          return this.edit({ appliedTags: e, reason: t })
        }
        pin(e) {
          return this.edit({ flags: this.flags.add(a.Pinned), reason: e })
        }
        unpin(e) {
          return this.edit({ flags: this.flags.remove(a.Pinned), reason: e })
        }
        get joined() {
          return this.members.cache.has(this.client.user?.id)
        }
        get editable() {
          return (
            (this.ownerId === this.client.user.id &&
              (this.type !== s.PrivateThread || this.joined)) ||
            this.manageable
          )
        }
        get joinable() {
          return (
            !this.archived &&
            !this.joined &&
            this.permissionsFor(this.client.user)?.has(
              this.type === s.PrivateThread ? n.ManageThreads : n.ViewChannel,
              false
            )
          )
        }
        get manageable() {
          const e = this.permissionsFor(this.client.user)
          if (!e) return false
          if (e.has(n.Administrator, false)) return true
          return (
            this.guild.members.me.communicationDisabledUntilTimestamp <
              Date.now() && e.has(n.ManageThreads, false)
          )
        }
        get viewable() {
          if (this.client.user.id === this.guild.ownerId) return true
          const e = this.permissionsFor(this.client.user)
          if (!e) return false
          return e.has(n.ViewChannel, false)
        }
        get sendable() {
          const e = this.permissionsFor(this.client.user)
          if (!e) return false
          if (e.has(n.Administrator, false)) return true
          return (
            !(this.archived && this.locked && !this.manageable) &&
            (this.type !== s.PrivateThread || this.joined || this.manageable) &&
            e.has(n.SendMessagesInThreads, false) &&
            this.guild.members.me.communicationDisabledUntilTimestamp <
              Date.now()
          )
        }
        get unarchivable() {
          return (
            this.archived && this.sendable && (!this.locked || this.manageable)
          )
        }
        async delete(e) {
          await this.guild.channels.delete(this.id, e)
          return this
        }
        get lastMessage() {}
        get lastPinAt() {}
        send() {}
        sendTyping() {}
        createMessageCollector() {}
        awaitMessages() {}
        createMessageComponentCollector() {}
        awaitMessageComponent() {}
        bulkDelete() {}
      }
      l.applyToClass(ThreadChannel, true, [
        'fetchWebhooks',
        'setRateLimitPerUser',
        'setNSFW',
      ])
      e.exports = ThreadChannel
    },
    9950: (e, t, i) => {
      'use strict'
      const s = i(4936)
      const n = i(7892)
      class ThreadMember extends s {
        constructor(e, t) {
          super(e.client)
          this.thread = e
          this.joinedTimestamp = null
          this.flags = null
          this.id = t.user_id
          this._patch(t)
        }
        _patch(e) {
          if ('join_timestamp' in e)
            this.joinedTimestamp = Date.parse(e.join_timestamp)
          if ('flags' in e) this.flags = new n(e.flags).freeze()
        }
        get partial() {
          return this.flags === null
        }
        get guildMember() {
          return this.thread.guild.members.resolve(this.id)
        }
        get joinedAt() {
          return this.joinedTimestamp && new Date(this.joinedTimestamp)
        }
        get user() {
          return this.client.users.resolve(this.id)
        }
        get manageable() {
          return !this.thread.archived && this.thread.editable
        }
        async remove(e) {
          await this.thread.members.remove(this.id, e)
          return this
        }
      }
      e.exports = ThreadMember
    },
    7175: (e, t, i) => {
      'use strict'
      const s = i(4936)
      class Typing extends s {
        constructor(e, t, i) {
          super(e.client)
          this.channel = e
          this.user = t
          this._patch(i)
        }
        _patch(e) {
          if ('timestamp' in e) {
            this.startedTimestamp = e.timestamp * 1e3
          }
        }
        inGuild() {
          return this.guild !== null
        }
        get startedAt() {
          return new Date(this.startedTimestamp)
        }
        get guild() {
          return this.channel.guild ?? null
        }
        get member() {
          return this.guild?.members.resolve(this.user) ?? null
        }
      }
      e.exports = Typing
    },
    8569: (e, t, i) => {
      'use strict'
      const { userMention: s } = i(2547)
      const { DiscordSnowflake: n } = i(8673)
      const r = i(4936)
      const a = i(5954)
      const o = i(2377)
      class User extends r {
        constructor(e, t) {
          super(e)
          this.id = t.id
          this.bot = null
          this.system = null
          this.flags = null
          this._patch(t)
        }
        _patch(e) {
          if ('username' in e) {
            this.username = e.username
          } else {
            this.username ??= null
          }
          if ('bot' in e) {
            this.bot = Boolean(e.bot)
          } else if (!this.partial && typeof this.bot !== 'boolean') {
            this.bot = false
          }
          if ('discriminator' in e) {
            this.discriminator = e.discriminator
          } else {
            this.discriminator ??= null
          }
          if ('avatar' in e) {
            this.avatar = e.avatar
          } else {
            this.avatar ??= null
          }
          if ('banner' in e) {
            this.banner = e.banner
          } else if (this.banner !== null) {
            this.banner ??= undefined
          }
          if ('accent_color' in e) {
            this.accentColor = e.accent_color
          } else if (this.accentColor !== null) {
            this.accentColor ??= undefined
          }
          if ('system' in e) {
            this.system = Boolean(e.system)
          } else if (!this.partial && typeof this.system !== 'boolean') {
            this.system = false
          }
          if ('public_flags' in e) {
            this.flags = new o(e.public_flags)
          }
        }
        get partial() {
          return typeof this.username !== 'string'
        }
        get createdTimestamp() {
          return n.timestampFrom(this.id)
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
        avatarURL(e = {}) {
          return (
            this.avatar && this.client.rest.cdn.avatar(this.id, this.avatar, e)
          )
        }
        get defaultAvatarURL() {
          return this.client.rest.cdn.defaultAvatar(this.discriminator % 5)
        }
        displayAvatarURL(e) {
          return this.avatarURL(e) ?? this.defaultAvatarURL
        }
        get hexAccentColor() {
          if (typeof this.accentColor !== 'number') return this.accentColor
          return `#${this.accentColor.toString(16).padStart(6, '0')}`
        }
        bannerURL(e = {}) {
          return (
            this.banner && this.client.rest.cdn.banner(this.id, this.banner, e)
          )
        }
        get tag() {
          return typeof this.username === 'string'
            ? `${this.username}#${this.discriminator}`
            : null
        }
        get dmChannel() {
          return this.client.users.dmChannel(this.id)
        }
        createDM(e = false) {
          return this.client.users.createDM(this.id, { force: e })
        }
        deleteDM() {
          return this.client.users.deleteDM(this.id)
        }
        equals(e) {
          return (
            e &&
            this.id === e.id &&
            this.username === e.username &&
            this.discriminator === e.discriminator &&
            this.avatar === e.avatar &&
            this.flags?.bitfield === e.flags?.bitfield &&
            this.banner === e.banner &&
            this.accentColor === e.accentColor
          )
        }
        _equals(e) {
          return (
            e &&
            this.id === e.id &&
            this.username === e.username &&
            this.discriminator === e.discriminator &&
            this.avatar === e.avatar &&
            this.flags?.bitfield === e.public_flags &&
            ('banner' in e ? this.banner === e.banner : true) &&
            ('accent_color' in e ? this.accentColor === e.accent_color : true)
          )
        }
        fetchFlags(e = false) {
          return this.client.users.fetchFlags(this.id, { force: e })
        }
        fetch(e = true) {
          return this.client.users.fetch(this.id, { force: e })
        }
        toString() {
          return s(this.id)
        }
        toJSON(...e) {
          const t = super.toJSON(
            {
              createdTimestamp: true,
              defaultAvatarURL: true,
              hexAccentColor: true,
              tag: true,
            },
            ...e
          )
          t.avatarURL = this.avatarURL()
          t.displayAvatarURL = this.displayAvatarURL()
          t.bannerURL = this.banner ? this.bannerURL() : this.banner
          return t
        }
        send() {}
      }
      a.applyToClass(User)
      e.exports = User
    },
    2902: (e, t, i) => {
      'use strict'
      const s = i(47)
      class UserContextMenuCommandInteraction extends s {
        get targetUser() {
          return this.options.getUser('user')
        }
        get targetMember() {
          return this.options.getMember('user')
        }
      }
      e.exports = UserContextMenuCommandInteraction
    },
    1527: (e, t, i) => {
      'use strict'
      const { UserSelectMenuBuilder: s, isJSONEncodable: n } = i(2547)
      const { toSnakeCase: r } = i(7910)
      class UserSelectMenuBuilder extends s {
        constructor(e = {}) {
          super(r(e))
        }
        static from(e) {
          if (n(e)) {
            return new this(e.toJSON())
          }
          return new this(e)
        }
      }
      e.exports = UserSelectMenuBuilder
    },
    7185: (e, t, i) => {
      'use strict'
      const s = i(6386)
      class UserSelectMenuComponent extends s {}
      e.exports = UserSelectMenuComponent
    },
    1174: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const n = i(8341)
      const r = i(457)
      class UserSelectMenuInteraction extends n {
        constructor(e, t) {
          super(e, t)
          const { resolved: i, values: n } = t.data
          this.values = n ?? []
          this.users = new s()
          this.members = new s()
          for (const e of Object.values(i?.users ?? {})) {
            this.users.set(e.id, this.client.users._add(e))
          }
          for (const [e, t] of Object.entries(i?.members ?? {})) {
            const s = i.users[e]
            if (!s) {
              this.client.emit(
                r.Debug,
                `[UserSelectMenuInteraction] Received a member without a user, skipping ${e}`
              )
              continue
            }
            this.members.set(
              e,
              this.guild?.members._add({ user: s, ...t }) ?? { user: s, ...t }
            )
          }
        }
      }
      e.exports = UserSelectMenuInteraction
    },
    4899: (e, t, i) => {
      'use strict'
      const { PermissionFlagsBits: s } = i(2)
      const n = i(9417)
      const r = i(5954)
      const a = i(9903)
      class VoiceChannel extends n {
        constructor(e, t, i) {
          super(e, t, i, false)
          this.messages = new a(this)
          this.nsfw = Boolean(t.nsfw)
          this._patch(t)
        }
        _patch(e) {
          super._patch(e)
          if ('video_quality_mode' in e) {
            this.videoQualityMode = e.video_quality_mode
          } else {
            this.videoQualityMode ??= null
          }
          if ('last_message_id' in e) {
            this.lastMessageId = e.last_message_id
          }
          if ('messages' in e) {
            for (const t of e.messages) this.messages._add(t)
          }
          if ('rate_limit_per_user' in e) {
            this.rateLimitPerUser = e.rate_limit_per_user
          }
          if ('nsfw' in e) {
            this.nsfw = Boolean(e.nsfw)
          }
        }
        get joinable() {
          if (!super.joinable) return false
          if (
            this.full &&
            !this.permissionsFor(this.client.user).has(s.MoveMembers, false)
          )
            return false
          return true
        }
        get speakable() {
          const e = this.permissionsFor(this.client.user)
          if (!e) return false
          if (e.has(s.Administrator, false)) return true
          return (
            this.guild.members.me.communicationDisabledUntilTimestamp <
              Date.now() && e.has(s.Speak, false)
          )
        }
        setBitrate(e, t) {
          return this.edit({ bitrate: e, reason: t })
        }
        setUserLimit(e, t) {
          return this.edit({ userLimit: e, reason: t })
        }
        setVideoQualityMode(e, t) {
          return this.edit({ videoQualityMode: e, reason: t })
        }
        get lastMessage() {}
        send() {}
        sendTyping() {}
        createMessageCollector() {}
        awaitMessages() {}
        createMessageComponentCollector() {}
        awaitMessageComponent() {}
        bulkDelete() {}
        fetchWebhooks() {}
        createWebhook() {}
        setRateLimitPerUser() {}
        setNSFW() {}
      }
      r.applyToClass(VoiceChannel, true, ['lastPinAt'])
      e.exports = VoiceChannel
    },
    3179: (e, t, i) => {
      'use strict'
      const { flatten: s } = i(7966)
      class VoiceRegion {
        constructor(e) {
          this.id = e.id
          this.name = e.name
          this.deprecated = e.deprecated
          this.optimal = e.optimal
          this.custom = e.custom
        }
        toJSON() {
          return s(this)
        }
      }
      e.exports = VoiceRegion
    },
    5036: (e, t, i) => {
      'use strict'
      const { ChannelType: s, Routes: n } = i(2)
      const r = i(4936)
      const {
        DiscordjsError: a,
        DiscordjsTypeError: o,
        ErrorCodes: l,
      } = i(8951)
      class VoiceState extends r {
        constructor(e, t) {
          super(e.client)
          this.guild = e
          this.id = t.user_id
          this._patch(t)
        }
        _patch(e) {
          if ('deaf' in e) {
            this.serverDeaf = e.deaf
          } else {
            this.serverDeaf ??= null
          }
          if ('mute' in e) {
            this.serverMute = e.mute
          } else {
            this.serverMute ??= null
          }
          if ('self_deaf' in e) {
            this.selfDeaf = e.self_deaf
          } else {
            this.selfDeaf ??= null
          }
          if ('self_mute' in e) {
            this.selfMute = e.self_mute
          } else {
            this.selfMute ??= null
          }
          if ('self_video' in e) {
            this.selfVideo = e.self_video
          } else {
            this.selfVideo ??= null
          }
          if ('session_id' in e) {
            this.sessionId = e.session_id
          } else {
            this.sessionId ??= null
          }
          if ('self_video' in e) {
            this.streaming = e.self_stream ?? false
          } else {
            this.streaming ??= null
          }
          if ('channel_id' in e) {
            this.channelId = e.channel_id
          } else {
            this.channelId ??= null
          }
          if ('suppress' in e) {
            this.suppress = e.suppress
          } else {
            this.suppress ??= null
          }
          if ('request_to_speak_timestamp' in e) {
            this.requestToSpeakTimestamp =
              e.request_to_speak_timestamp &&
              Date.parse(e.request_to_speak_timestamp)
          } else {
            this.requestToSpeakTimestamp ??= null
          }
          return this
        }
        get member() {
          return this.guild.members.cache.get(this.id) ?? null
        }
        get channel() {
          return this.guild.channels.cache.get(this.channelId) ?? null
        }
        get deaf() {
          return this.serverDeaf || this.selfDeaf
        }
        get mute() {
          return this.serverMute || this.selfMute
        }
        setMute(e = true, t) {
          return this.guild.members.edit(this.id, { mute: e, reason: t })
        }
        setDeaf(e = true, t) {
          return this.guild.members.edit(this.id, { deaf: e, reason: t })
        }
        disconnect(e) {
          return this.setChannel(null, e)
        }
        setChannel(e, t) {
          return this.guild.members.edit(this.id, { channel: e, reason: t })
        }
        async edit(e) {
          if (this.channel?.type !== s.GuildStageVoice)
            throw new a(l.VoiceNotStageChannel)
          const t = this.client.user.id === this.id ? '@me' : this.id
          if (t !== '@me' && typeof e.requestToSpeak !== 'undefined') {
            throw new a(l.VoiceStateNotOwn)
          }
          if (!['boolean', 'undefined'].includes(typeof e.requestToSpeak)) {
            throw new o(l.VoiceStateInvalidType, 'requestToSpeak')
          }
          if (!['boolean', 'undefined'].includes(typeof e.suppressed)) {
            throw new o(l.VoiceStateInvalidType, 'suppressed')
          }
          await this.client.rest.patch(n.guildVoiceState(this.guild.id, t), {
            body: {
              channel_id: this.channelId,
              request_to_speak_timestamp: e.requestToSpeak
                ? new Date().toISOString()
                : e.requestToSpeak === false
                ? null
                : undefined,
              suppress: e.suppressed,
            },
          })
          return this
        }
        setRequestToSpeak(e = true) {
          return this.edit({ requestToSpeak: e })
        }
        setSuppressed(e = true) {
          return this.edit({ suppressed: e })
        }
        toJSON() {
          return super.toJSON({
            id: true,
            serverDeaf: true,
            serverMute: true,
            selfDeaf: true,
            selfMute: true,
            sessionId: true,
            channelId: 'channel',
          })
        }
      }
      e.exports = VoiceState
    },
    3630: (e, t, i) => {
      'use strict'
      const { makeURLSearchParams: s } = i(1372)
      const { lazy: n } = i(9575)
      const { DiscordSnowflake: r } = i(8673)
      const { Routes: a, WebhookType: o } = i(2)
      const l = i(9822)
      const { DiscordjsError: c, ErrorCodes: d } = i(8951)
      const u = i(3989)
      const h = n(() => i(6774).Message)
      class Webhook {
        constructor(e, t) {
          Object.defineProperty(this, 'client', { value: e })
          if (t) this._patch(t)
        }
        _patch(e) {
          if ('name' in e) {
            this.name = e.name
          }
          Object.defineProperty(this, 'token', {
            value: e.token ?? null,
            writable: true,
            configurable: true,
          })
          if ('avatar' in e) {
            this.avatar = e.avatar
          }
          this.id = e.id
          if ('type' in e) {
            this.type = e.type
          }
          if ('guild_id' in e) {
            this.guildId = e.guild_id
          }
          if ('channel_id' in e) {
            this.channelId = e.channel_id
          }
          if ('user' in e) {
            this.owner = this.client.users?._add(e.user) ?? e.user
          } else {
            this.owner ??= null
          }
          if ('application_id' in e) {
            this.applicationId = e.application_id
          } else {
            this.applicationId ??= null
          }
          if ('source_guild' in e) {
            this.sourceGuild =
              this.client.guilds?.resolve(e.source_guild.id) ?? e.source_guild
          } else {
            this.sourceGuild ??= null
          }
          if ('source_channel' in e) {
            this.sourceChannel =
              this.client.channels?.resolve(e.source_channel?.id) ??
              e.source_channel
          } else {
            this.sourceChannel ??= null
          }
        }
        get channel() {
          return this.client.channels.resolve(this.channelId)
        }
        async send(e) {
          if (!this.token) throw new c(d.WebhookTokenUnavailable)
          let t
          if (e instanceof l) {
            t = e.resolveBody()
          } else {
            t = l.create(this, e).resolveBody()
          }
          const i = s({ wait: true, thread_id: t.options.threadId })
          const { body: n, files: r } = await t.resolveFiles()
          const o = await this.client.rest.post(
            a.webhook(this.id, this.token),
            { body: n, files: r, query: i, auth: false }
          )
          if (!this.client.channels) return o
          return (
            this.client.channels.cache
              .get(o.channel_id)
              ?.messages._add(o, false) ?? new (h())(this.client, o)
          )
        }
        async sendSlackMessage(e) {
          if (!this.token) throw new c(d.WebhookTokenUnavailable)
          const t = await this.client.rest.post(
            a.webhookPlatform(this.id, this.token, 'slack'),
            { query: s({ wait: true }), auth: false, body: e }
          )
          return t.toString() === 'ok'
        }
        async edit({ name: e = this.name, avatar: t, channel: i, reason: s }) {
          if (t && !(typeof t === 'string' && t.startsWith('data:'))) {
            t = await u.resolveImage(t)
          }
          i &&= i.id ?? i
          const n = await this.client.rest.patch(
            a.webhook(this.id, i ? undefined : this.token),
            {
              body: { name: e, avatar: t, channel_id: i },
              reason: s,
              auth: !this.token || Boolean(i),
            }
          )
          this.name = n.name
          this.avatar = n.avatar
          this.channelId = n.channel_id
          return this
        }
        async fetchMessage(e, { threadId: t } = {}) {
          if (!this.token) throw new c(d.WebhookTokenUnavailable)
          const i = await this.client.rest.get(
            a.webhookMessage(this.id, this.token, e),
            { query: t ? s({ thread_id: t }) : undefined, auth: false }
          )
          if (!this.client.channels) return i
          return (
            this.client.channels.cache
              .get(i.channel_id)
              ?.messages._add(i, false) ?? new (h())(this.client, i)
          )
        }
        async editMessage(e, t) {
          if (!this.token) throw new c(d.WebhookTokenUnavailable)
          let i
          if (t instanceof l) i = t
          else i = l.create(this, t)
          const { body: n, files: r } = await i.resolveBody().resolveFiles()
          const o = await this.client.rest.patch(
            a.webhookMessage(
              this.id,
              this.token,
              typeof e === 'string' ? e : e.id
            ),
            {
              body: n,
              files: r,
              query: i.options.threadId
                ? s({ thread_id: i.options.threadId })
                : undefined,
              auth: false,
            }
          )
          const u = this.client.channels
          if (!u) return o
          const m = u.cache.get(o.channel_id)?.messages
          if (!m) return new (h())(this.client, o)
          const p = m.cache.get(o.id)
          if (!p) return m._add(o)
          const f = p._clone()
          f._patch(o)
          return f
        }
        async delete(e) {
          await this.client.rest.delete(a.webhook(this.id, this.token), {
            reason: e,
            auth: !this.token,
          })
        }
        async deleteMessage(e, t) {
          if (!this.token) throw new c(d.WebhookTokenUnavailable)
          await this.client.rest.delete(
            a.webhookMessage(
              this.id,
              this.token,
              typeof e === 'string' ? e : e.id
            ),
            { query: t ? s({ thread_id: t }) : undefined, auth: false }
          )
        }
        get createdTimestamp() {
          return r.timestampFrom(this.id)
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
        get url() {
          return this.client.options.rest.api + a.webhook(this.id, this.token)
        }
        avatarURL(e = {}) {
          return (
            this.avatar && this.client.rest.cdn.avatar(this.id, this.avatar, e)
          )
        }
        isUserCreated() {
          return Boolean(
            this.type === o.Incoming && this.owner && !this.owner.bot
          )
        }
        isApplicationCreated() {
          return this.type === o.Application
        }
        isChannelFollower() {
          return this.type === o.ChannelFollower
        }
        isIncoming() {
          return this.type === o.Incoming
        }
        static applyToClass(e, t = []) {
          for (const i of [
            'send',
            'sendSlackMessage',
            'fetchMessage',
            'edit',
            'editMessage',
            'delete',
            'deleteMessage',
            'createdTimestamp',
            'createdAt',
            'url',
          ]) {
            if (t.includes(i)) continue
            Object.defineProperty(
              e.prototype,
              i,
              Object.getOwnPropertyDescriptor(Webhook.prototype, i)
            )
          }
        }
      }
      e.exports = Webhook
    },
    1721: (e, t, i) => {
      'use strict'
      const s = i(4936)
      const { Emoji: n } = i(1168)
      class WelcomeChannel extends s {
        constructor(e, t) {
          super(e.client)
          this.guild = e
          this.description = t.description
          this._emoji = { name: t.emoji_name, id: t.emoji_id }
          this.channelId = t.channel_id
        }
        get channel() {
          return this.client.channels.resolve(this.channelId)
        }
        get emoji() {
          return (
            this.client.emojis.resolve(this._emoji.id) ??
            new n(this.client, this._emoji)
          )
        }
      }
      e.exports = WelcomeChannel
    },
    7710: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { GuildFeature: n } = i(2)
      const r = i(4936)
      const a = i(1721)
      class WelcomeScreen extends r {
        constructor(e, t) {
          super(e.client)
          this.guild = e
          this.description = t.description ?? null
          this.welcomeChannels = new s()
          for (const e of t.welcome_channels) {
            const t = new a(this.guild, e)
            this.welcomeChannels.set(t.channelId, t)
          }
        }
        get enabled() {
          return this.guild.features.includes(n.WelcomeScreenEnabled)
        }
      }
      e.exports = WelcomeScreen
    },
    6477: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { Routes: n } = i(2)
      const r = i(4936)
      const a = i(2943)
      class Widget extends r {
        constructor(e, t) {
          super(e)
          this._patch(t)
        }
        _patch(e) {
          this.id = e.id
          if ('name' in e) {
            this.name = e.name
          }
          if ('instant_invite' in e) {
            this.instantInvite = e.instant_invite
          }
          this.channels = new s()
          for (const t of e.channels) {
            this.channels.set(t.id, t)
          }
          this.members = new s()
          for (const t of e.members) {
            this.members.set(t.id, new a(this.client, t))
          }
          if ('presence_count' in e) {
            this.presenceCount = e.presence_count
          }
        }
        async fetch() {
          const e = await this.client.rest.get(n.guildWidgetJSON(this.id))
          this._patch(e)
          return this
        }
      }
      e.exports = Widget
    },
    2943: (e, t, i) => {
      'use strict'
      const s = i(4936)
      class WidgetMember extends s {
        constructor(e, t) {
          super(e)
          this.id = t.id
          this.username = t.username
          this.discriminator = t.discriminator
          this.avatar = t.avatar
          this.status = t.status
          this.deaf = t.deaf ?? null
          this.mute = t.mute ?? null
          this.selfDeaf = t.self_deaf ?? null
          this.selfMute = t.self_mute ?? null
          this.suppress = t.suppress ?? null
          this.channelId = t.channel_id ?? null
          this.avatarURL = t.avatar_url
          this.activity = t.activity ?? null
        }
      }
      e.exports = WidgetMember
    },
    174: (e, t, i) => {
      'use strict'
      const { DiscordSnowflake: s } = i(8673)
      const n = i(4936)
      class Application extends n {
        constructor(e, t) {
          super(e)
          this._patch(t)
        }
        _patch(e) {
          this.id = e.id
          if ('name' in e) {
            this.name = e.name
          } else {
            this.name ??= null
          }
          if ('description' in e) {
            this.description = e.description
          } else {
            this.description ??= null
          }
          if ('icon' in e) {
            this.icon = e.icon
          } else {
            this.icon ??= null
          }
        }
        get createdTimestamp() {
          return s.timestampFrom(this.id)
        }
        get createdAt() {
          return new Date(this.createdTimestamp)
        }
        iconURL(e = {}) {
          return (
            this.icon && this.client.rest.cdn.appIcon(this.id, this.icon, e)
          )
        }
        coverURL(e = {}) {
          return (
            this.cover && this.client.rest.cdn.appIcon(this.id, this.cover, e)
          )
        }
        toString() {
          return this.name
        }
        toJSON() {
          return super.toJSON({ createdTimestamp: true })
        }
      }
      e.exports = Application
    },
    9984: (e, t, i) => {
      'use strict'
      const s = i(5673)
      const { setTimeout: n, clearTimeout: r } = i(2332)
      const { Collection: a } = i(2676)
      const { DiscordjsTypeError: o, ErrorCodes: l } = i(8951)
      const { flatten: c } = i(7966)
      class Collector extends s {
        constructor(e, t = {}) {
          super()
          Object.defineProperty(this, 'client', { value: e })
          this.filter = t.filter ?? (() => true)
          this.options = t
          this.collected = new a()
          this.ended = false
          this._timeout = null
          this._idletimeout = null
          this._endReason = null
          if (typeof this.filter !== 'function') {
            throw new o(l.InvalidType, 'options.filter', 'function')
          }
          this.handleCollect = this.handleCollect.bind(this)
          this.handleDispose = this.handleDispose.bind(this)
          if (t.time) this._timeout = n(() => this.stop('time'), t.time).unref()
          if (t.idle)
            this._idletimeout = n(() => this.stop('idle'), t.idle).unref()
        }
        async handleCollect(...e) {
          const t = await this.collect(...e)
          if (t) {
            const i = await this.filter(...e, this.collected)
            if (i) {
              this.collected.set(t, e[0])
              this.emit('collect', ...e)
              if (this._idletimeout) {
                r(this._idletimeout)
                this._idletimeout = n(
                  () => this.stop('idle'),
                  this.options.idle
                ).unref()
              }
            } else {
              this.emit('ignore', ...e)
            }
          }
          this.checkEnd()
        }
        async handleDispose(...e) {
          if (!this.options.dispose) return
          const t = this.dispose(...e)
          if (!t || !(await this.filter(...e)) || !this.collected.has(t)) return
          this.collected.delete(t)
          this.emit('dispose', ...e)
          this.checkEnd()
        }
        get next() {
          return new Promise((e, t) => {
            if (this.ended) {
              t(this.collected)
              return
            }
            const cleanup = () => {
              this.removeListener('collect', onCollect)
              this.removeListener('end', onEnd)
            }
            const onCollect = (t) => {
              cleanup()
              e(t)
            }
            const onEnd = () => {
              cleanup()
              t(this.collected)
            }
            this.on('collect', onCollect)
            this.on('end', onEnd)
          })
        }
        stop(e = 'user') {
          if (this.ended) return
          if (this._timeout) {
            r(this._timeout)
            this._timeout = null
          }
          if (this._idletimeout) {
            r(this._idletimeout)
            this._idletimeout = null
          }
          this._endReason = e
          this.ended = true
          this.emit('end', this.collected, e)
        }
        resetTimer({ time: e, idle: t } = {}) {
          if (this._timeout) {
            r(this._timeout)
            this._timeout = n(
              () => this.stop('time'),
              e ?? this.options.time
            ).unref()
          }
          if (this._idletimeout) {
            r(this._idletimeout)
            this._idletimeout = n(
              () => this.stop('idle'),
              t ?? this.options.idle
            ).unref()
          }
        }
        checkEnd() {
          const e = this.endReason
          if (e) this.stop(e)
          return Boolean(e)
        }
        async *[Symbol.asyncIterator]() {
          const e = []
          const onCollect = (...t) => e.push(t)
          this.on('collect', onCollect)
          try {
            while (e.length || !this.ended) {
              if (e.length) {
                yield e.shift()
              } else {
                await new Promise((e) => {
                  const tick = () => {
                    this.removeListener('collect', tick)
                    this.removeListener('end', tick)
                    return e()
                  }
                  this.on('collect', tick)
                  this.on('end', tick)
                })
              }
            }
          } finally {
            this.removeListener('collect', onCollect)
          }
        }
        toJSON() {
          return c(this)
        }
        get endReason() {
          return this._endReason
        }
        collect() {}
        dispose() {}
      }
      e.exports = Collector
    },
    2047: (e, t, i) => {
      'use strict'
      const { isJSONEncodable: s } = i(2547)
      const {
        InteractionResponseType: n,
        MessageFlags: r,
        Routes: a,
        InteractionType: o,
      } = i(2)
      const { DiscordjsError: l, ErrorCodes: c } = i(8951)
      const d = i(4463)
      const u = i(5281)
      const h = i(9822)
      class InteractionResponses {
        async deferReply(e = {}) {
          if (this.deferred || this.replied)
            throw new l(c.InteractionAlreadyReplied)
          this.ephemeral = e.ephemeral ?? false
          await this.client.rest.post(
            a.interactionCallback(this.id, this.token),
            {
              body: {
                type: n.DeferredChannelMessageWithSource,
                data: { flags: e.ephemeral ? r.Ephemeral : undefined },
              },
              auth: false,
            }
          )
          this.deferred = true
          return e.fetchReply ? this.fetchReply() : new u(this)
        }
        async reply(e) {
          if (this.deferred || this.replied)
            throw new l(c.InteractionAlreadyReplied)
          this.ephemeral = e.ephemeral ?? false
          let t
          if (e instanceof h) t = e
          else t = h.create(this, e)
          const { body: i, files: s } = await t.resolveBody().resolveFiles()
          await this.client.rest.post(
            a.interactionCallback(this.id, this.token),
            {
              body: { type: n.ChannelMessageWithSource, data: i },
              files: s,
              auth: false,
            }
          )
          this.replied = true
          return e.fetchReply ? this.fetchReply() : new u(this)
        }
        fetchReply(e = '@original') {
          return this.webhook.fetchMessage(e)
        }
        async editReply(e) {
          if (!this.deferred && !this.replied)
            throw new l(c.InteractionNotReplied)
          const t = await this.webhook.editMessage(e.message ?? '@original', e)
          this.replied = true
          return t
        }
        async deleteReply(e = '@original') {
          await this.webhook.deleteMessage(e)
        }
        followUp(e) {
          if (!this.deferred && !this.replied)
            return Promise.reject(new l(c.InteractionNotReplied))
          return this.webhook.send(e)
        }
        async deferUpdate(e = {}) {
          if (this.deferred || this.replied)
            throw new l(c.InteractionAlreadyReplied)
          await this.client.rest.post(
            a.interactionCallback(this.id, this.token),
            { body: { type: n.DeferredMessageUpdate }, auth: false }
          )
          this.deferred = true
          return e.fetchReply
            ? this.fetchReply()
            : new u(this, this.message?.interaction?.id)
        }
        async update(e) {
          if (this.deferred || this.replied)
            throw new l(c.InteractionAlreadyReplied)
          let t
          if (e instanceof h) t = e
          else t = h.create(this, e)
          const { body: i, files: s } = await t.resolveBody().resolveFiles()
          await this.client.rest.post(
            a.interactionCallback(this.id, this.token),
            { body: { type: n.UpdateMessage, data: i }, files: s, auth: false }
          )
          this.replied = true
          return e.fetchReply
            ? this.fetchReply()
            : new u(this, this.message.interaction?.id)
        }
        async showModal(e) {
          if (this.deferred || this.replied)
            throw new l(c.InteractionAlreadyReplied)
          await this.client.rest.post(
            a.interactionCallback(this.id, this.token),
            {
              body: {
                type: n.Modal,
                data: s(e)
                  ? e.toJSON()
                  : this.client.options.jsonTransformer(e),
              },
            }
          )
          this.replied = true
        }
        awaitModalSubmit(e) {
          if (typeof e.time !== 'number')
            throw new l(c.InvalidType, 'time', 'number')
          const t = { ...e, max: 1, interactionType: o.ModalSubmit }
          return new Promise((e, i) => {
            const s = new d(this.client, t)
            s.once('end', (t, s) => {
              const n = t.first()
              if (n) e(n)
              else i(new l(c.InteractionCollectorError, s))
            })
          })
        }
        static applyToClass(e, t = []) {
          const i = [
            'deferReply',
            'reply',
            'fetchReply',
            'editReply',
            'deleteReply',
            'followUp',
            'deferUpdate',
            'update',
            'showModal',
            'awaitModalSubmit',
          ]
          for (const s of i) {
            if (t.includes(s)) continue
            Object.defineProperty(
              e.prototype,
              s,
              Object.getOwnPropertyDescriptor(InteractionResponses.prototype, s)
            )
          }
        }
      }
      e.exports = InteractionResponses
    },
    5954: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { DiscordSnowflake: n } = i(8673)
      const { InteractionType: r, Routes: a } = i(2)
      const {
        DiscordjsTypeError: o,
        DiscordjsError: l,
        ErrorCodes: c,
      } = i(8951)
      const { MaxBulkDeletableMessageAge: d } = i(6047)
      const u = i(4463)
      const h = i(5506)
      const m = i(9822)
      class TextBasedChannel {
        constructor() {
          this.messages = new p(this)
          this.lastMessageId = null
          this.lastPinTimestamp = null
        }
        get lastMessage() {
          return this.messages.resolve(this.lastMessageId)
        }
        get lastPinAt() {
          return this.lastPinTimestamp && new Date(this.lastPinTimestamp)
        }
        async send(e) {
          const t = i(8569)
          const { GuildMember: s } = i(5780)
          if (this instanceof t || this instanceof s) {
            const t = await this.createDM()
            return t.send(e)
          }
          let n
          if (e instanceof m) {
            n = e.resolveBody()
          } else {
            n = m.create(this, e).resolveBody()
          }
          const { body: r, files: o } = await n.resolveFiles()
          const l = await this.client.rest.post(a.channelMessages(this.id), {
            body: r,
            files: o,
          })
          return this.messages.cache.get(l.id) ?? this.messages._add(l)
        }
        async sendTyping() {
          await this.client.rest.post(a.channelTyping(this.id))
        }
        createMessageCollector(e = {}) {
          return new h(this, e)
        }
        awaitMessages(e = {}) {
          return new Promise((t, i) => {
            const s = this.createMessageCollector(e)
            s.once('end', (s, n) => {
              if (e.errors?.includes(n)) {
                i(s)
              } else {
                t(s)
              }
            })
          })
        }
        createMessageComponentCollector(e = {}) {
          return new u(this.client, {
            ...e,
            interactionType: r.MessageComponent,
            channel: this,
          })
        }
        awaitMessageComponent(e = {}) {
          const t = { ...e, max: 1 }
          return new Promise((e, i) => {
            const s = this.createMessageComponentCollector(t)
            s.once('end', (t, s) => {
              const n = t.first()
              if (n) e(n)
              else i(new l(c.InteractionCollectorError, s))
            })
          })
        }
        async bulkDelete(e, t = false) {
          if (Array.isArray(e) || e instanceof s) {
            let i = e instanceof s ? [...e.keys()] : e.map((e) => e.id ?? e)
            if (t) {
              i = i.filter((e) => Date.now() - n.timestampFrom(e) < d)
            }
            if (i.length === 0) return new s()
            if (i.length === 1) {
              const e = this.client.actions.MessageDelete.getMessage(
                { message_id: i[0] },
                this
              )
              await this.client.rest.delete(a.channelMessage(this.id, i[0]))
              return e ? new s([[e.id, e]]) : new s()
            }
            await this.client.rest.post(a.channelBulkDelete(this.id), {
              body: { messages: i },
            })
            return i.reduce(
              (e, t) =>
                e.set(
                  t,
                  this.client.actions.MessageDeleteBulk.getMessage(
                    { message_id: t },
                    this
                  )
                ),
              new s()
            )
          }
          if (!isNaN(e)) {
            const i = await this.messages.fetch({ limit: e })
            return this.bulkDelete(i, t)
          }
          throw new o(c.MessageBulkDeleteType)
        }
        fetchWebhooks() {
          return this.guild.channels.fetchWebhooks(this.id)
        }
        createWebhook(e) {
          return this.guild.channels.createWebhook({ channel: this.id, ...e })
        }
        setRateLimitPerUser(e, t) {
          return this.edit({ rateLimitPerUser: e, reason: t })
        }
        setNSFW(e = true, t) {
          return this.edit({ nsfw: e, reason: t })
        }
        static applyToClass(e, t = false, i = []) {
          const s = ['send']
          if (t) {
            s.push(
              'lastMessage',
              'lastPinAt',
              'bulkDelete',
              'sendTyping',
              'createMessageCollector',
              'awaitMessages',
              'createMessageComponentCollector',
              'awaitMessageComponent',
              'fetchWebhooks',
              'createWebhook',
              'setRateLimitPerUser',
              'setNSFW'
            )
          }
          for (const t of s) {
            if (i.includes(t)) continue
            Object.defineProperty(
              e.prototype,
              t,
              Object.getOwnPropertyDescriptor(TextBasedChannel.prototype, t)
            )
          }
        }
      }
      e.exports = TextBasedChannel
      const p = i(9903)
    },
    7558: (e, t, i) => {
      'use strict'
      const { ActivityFlags: s } = i(2)
      const n = i(6492)
      class ActivityFlagsBitField extends n {
        static Flags = s
      }
      e.exports = ActivityFlagsBitField
    },
    2152: (e, t, i) => {
      'use strict'
      const { ApplicationFlags: s } = i(2)
      const n = i(6492)
      class ApplicationFlagsBitField extends n {
        static Flags = s
      }
      e.exports = ApplicationFlagsBitField
    },
    6492: (e, t, i) => {
      'use strict'
      const { DiscordjsRangeError: s, ErrorCodes: n } = i(8951)
      class BitField {
        static Flags = {}
        static DefaultBit = 0
        constructor(e = this.constructor.DefaultBit) {
          this.bitfield = this.constructor.resolve(e)
        }
        any(e) {
          return (
            (this.bitfield & this.constructor.resolve(e)) !==
            this.constructor.DefaultBit
          )
        }
        equals(e) {
          return this.bitfield === this.constructor.resolve(e)
        }
        has(e) {
          e = this.constructor.resolve(e)
          return (this.bitfield & e) === e
        }
        missing(e, ...t) {
          return new this.constructor(e).remove(this).toArray(...t)
        }
        freeze() {
          return Object.freeze(this)
        }
        add(...e) {
          let t = this.constructor.DefaultBit
          for (const i of e) {
            t |= this.constructor.resolve(i)
          }
          if (Object.isFrozen(this))
            return new this.constructor(this.bitfield | t)
          this.bitfield |= t
          return this
        }
        remove(...e) {
          let t = this.constructor.DefaultBit
          for (const i of e) {
            t |= this.constructor.resolve(i)
          }
          if (Object.isFrozen(this))
            return new this.constructor(this.bitfield & ~t)
          this.bitfield &= ~t
          return this
        }
        serialize(...e) {
          const t = {}
          for (const [i, s] of Object.entries(this.constructor.Flags))
            t[i] = this.has(s, ...e)
          return t
        }
        toArray(...e) {
          return Object.keys(this.constructor.Flags).filter((t) =>
            this.has(t, ...e)
          )
        }
        toJSON() {
          return typeof this.bitfield === 'number'
            ? this.bitfield
            : this.bitfield.toString()
        }
        valueOf() {
          return this.bitfield
        }
        *[Symbol.iterator]() {
          yield* this.toArray()
        }
        static resolve(e) {
          const { DefaultBit: t } = this
          if (typeof t === typeof e && e >= t) return e
          if (e instanceof BitField) return e.bitfield
          if (Array.isArray(e))
            return e.map((e) => this.resolve(e)).reduce((e, t) => e | t, t)
          if (typeof e === 'string') {
            if (typeof this.Flags[e] !== 'undefined') return this.Flags[e]
            if (!isNaN(e)) return typeof t === 'bigint' ? BigInt(e) : Number(e)
          }
          throw new s(n.BitFieldInvalid, e)
        }
      }
      e.exports = BitField
    },
    4874: (e, t, i) => {
      'use strict'
      const { ChannelFlags: s } = i(2)
      const n = i(6492)
      class ChannelFlagsBitField extends n {
        static Flags = s
      }
      e.exports = ChannelFlagsBitField
    },
    275: (e, t, i) => {
      'use strict'
      const { lazy: s } = i(9575)
      const { ChannelType: n } = i(2)
      const r = s(() => i(1451))
      const a = s(() => i(460))
      const o = s(() => i(2793))
      const l = s(() => i(8096))
      const c = s(() => i(7541))
      const d = s(() => i(7522))
      const u = s(() => i(4899))
      const h = s(() => i(6133))
      const m = s(() => i(2562))
      const p = s(() => i(5023))
      function createChannel(
        e,
        t,
        i,
        { allowUnknownGuild: s, fromInteraction: f } = {}
      ) {
        let g
        if (!t.guild_id && !i) {
          if ((t.recipients && t.type !== n.GroupDM) || t.type === n.DM) {
            g = new (a())(e, t)
          } else if (t.type === n.GroupDM) {
            g = new (m())(e, t)
          }
        } else {
          i ??= e.guilds.cache.get(t.guild_id)
          if (i || s) {
            switch (t.type) {
              case n.GuildText: {
                g = new (c())(i, t, e)
                break
              }
              case n.GuildVoice: {
                g = new (u())(i, t, e)
                break
              }
              case n.GuildCategory: {
                g = new (r())(i, t, e)
                break
              }
              case n.GuildAnnouncement: {
                g = new (o())(i, t, e)
                break
              }
              case n.GuildStageVoice: {
                g = new (l())(i, t, e)
                break
              }
              case n.AnnouncementThread:
              case n.PublicThread:
              case n.PrivateThread: {
                g = new (d())(i, t, e, f)
                if (!s) g.parent?.threads.cache.set(g.id, g)
                break
              }
              case n.GuildDirectory:
                g = new (h())(i, t, e)
                break
              case n.GuildForum:
                g = new (p())(i, t, e)
                break
            }
            if (g && !s) i.channels?.cache.set(g.id, g)
          }
        }
        return g
      }
      function transformAPIGuildForumTag(e) {
        return {
          id: e.id,
          name: e.name,
          moderated: e.moderated,
          emoji:
            e.emoji_id ?? e.emoji_name
              ? { id: e.emoji_id, name: e.emoji_name }
              : null,
        }
      }
      function transformGuildForumTag(e) {
        return {
          id: e.id,
          name: e.name,
          moderated: e.moderated,
          emoji_id: e.emoji?.id ?? null,
          emoji_name: e.emoji?.name ?? null,
        }
      }
      function transformAPIGuildDefaultReaction(e) {
        return { id: e.emoji_id, name: e.emoji_name }
      }
      function transformGuildDefaultReaction(e) {
        return { emoji_id: e.id, emoji_name: e.name }
      }
      e.exports = {
        createChannel: createChannel,
        transformAPIGuildForumTag: transformAPIGuildForumTag,
        transformGuildForumTag: transformGuildForumTag,
        transformAPIGuildDefaultReaction: transformAPIGuildDefaultReaction,
        transformGuildDefaultReaction: transformGuildDefaultReaction,
      }
    },
    562: (e) => {
      'use strict'
      e.exports = {
        Default: 0,
        White: 16777215,
        Aqua: 1752220,
        Green: 5763719,
        Blue: 3447003,
        Yellow: 16705372,
        Purple: 10181046,
        LuminousVividPink: 15277667,
        Fuchsia: 15418782,
        Gold: 15844367,
        Orange: 15105570,
        Red: 15548997,
        Grey: 9807270,
        Navy: 3426654,
        DarkAqua: 1146986,
        DarkGreen: 2067276,
        DarkBlue: 2123412,
        DarkPurple: 7419530,
        DarkVividPink: 11342935,
        DarkGold: 12745742,
        DarkOrange: 11027200,
        DarkRed: 10038562,
        DarkGrey: 9936031,
        DarkerGrey: 8359053,
        LightGrey: 12370112,
        DarkNavy: 2899536,
        Blurple: 5793266,
        Greyple: 10070709,
        DarkButNotBlack: 2895667,
        NotQuiteBlack: 2303786,
      }
    },
    6129: (e, t, i) => {
      'use strict'
      const { ComponentBuilder: s } = i(2547)
      const { ComponentType: n } = i(2)
      function createComponent(e) {
        if (e instanceof u) {
          return e
        }
        switch (e.type) {
          case n.ActionRow:
            return new r(e)
          case n.Button:
            return new l(e)
          case n.StringSelect:
            return new v(e)
          case n.TextInput:
            return new _(e)
          case n.UserSelect:
            return new w(e)
          case n.RoleSelect:
            return new f(e)
          case n.MentionableSelect:
            return new m(e)
          case n.ChannelSelect:
            return new d(e)
          default:
            return new u(e)
        }
      }
      function createComponentBuilder(e) {
        if (e instanceof s) {
          return e
        }
        switch (e.type) {
          case n.ActionRow:
            return new a(e)
          case n.Button:
            return new o(e)
          case n.StringSelect:
            return new g(e)
          case n.TextInput:
            return new y(e)
          case n.UserSelect:
            return new b(e)
          case n.RoleSelect:
            return new p(e)
          case n.MentionableSelect:
            return new h(e)
          case n.ChannelSelect:
            return new c(e)
          default:
            return new s(e)
        }
      }
      e.exports = {
        createComponent: createComponent,
        createComponentBuilder: createComponentBuilder,
      }
      const r = i(121)
      const a = i(112)
      const o = i(6925)
      const l = i(3700)
      const c = i(881)
      const d = i(1749)
      const u = i(1688)
      const h = i(4895)
      const m = i(1574)
      const p = i(5564)
      const f = i(5744)
      const g = i(2392)
      const v = i(2784)
      const y = i(6342)
      const _ = i(4597)
      const b = i(1527)
      const w = i(7185)
    },
    6047: (e, t, i) => {
      'use strict'
      const { ChannelType: s, MessageType: n, ComponentType: r } = i(2)
      t.MaxBulkDeletableMessageAge = 12096e5
      t.SweeperKeys = [
        'autoModerationRules',
        'applicationCommands',
        'bans',
        'emojis',
        'invites',
        'guildMembers',
        'messages',
        'presences',
        'reactions',
        'stageInstances',
        'stickers',
        'threadMembers',
        'threads',
        'users',
        'voiceStates',
      ]
      t.NonSystemMessageTypes = [
        n.Default,
        n.Reply,
        n.ChatInputCommand,
        n.ContextMenuCommand,
      ]
      t.TextBasedChannelTypes = [
        s.DM,
        s.GuildText,
        s.GuildAnnouncement,
        s.AnnouncementThread,
        s.PublicThread,
        s.PrivateThread,
        s.GuildVoice,
      ]
      t.ThreadChannelTypes = [
        s.AnnouncementThread,
        s.PublicThread,
        s.PrivateThread,
      ]
      t.VoiceBasedChannelTypes = [s.GuildVoice, s.GuildStageVoice]
      t.SelectMenuTypes = [
        r.StringSelect,
        r.UserSelect,
        r.RoleSelect,
        r.MentionableSelect,
        r.ChannelSelect,
      ]
    },
    3989: (e, t, i) => {
      'use strict'
      const { Buffer: s } = i(2254)
      const n = i(3977)
      const r = i(9411)
      const { fetch: a } = i(1798)
      const {
        DiscordjsError: o,
        DiscordjsTypeError: l,
        ErrorCodes: c,
      } = i(8951)
      const d = i(3493)
      class DataResolver extends null {
        static resolveCode(e, t) {
          return t.exec(e)?.[1] ?? e
        }
        static resolveInviteCode(e) {
          return this.resolveCode(e, d.InvitesPattern)
        }
        static resolveGuildTemplateCode(e) {
          const t = i(6378)
          return this.resolveCode(e, t.GuildTemplatesPattern)
        }
        static async resolveImage(e) {
          if (!e) return null
          if (typeof e === 'string' && e.startsWith('data:')) {
            return e
          }
          const t = await this.resolveFile(e)
          return this.resolveBase64(t.data)
        }
        static resolveBase64(e) {
          if (s.isBuffer(e))
            return `data:image/jpg;base64,${e.toString('base64')}`
          return e
        }
        static async resolveFile(e) {
          if (s.isBuffer(e)) return { data: e }
          if (typeof e[Symbol.asyncIterator] === 'function') {
            const t = []
            for await (const i of e) t.push(s.from(i))
            return { data: s.concat(t) }
          }
          if (typeof e === 'string') {
            if (/^https?:\/\//.test(e)) {
              const t = await a(e)
              return {
                data: s.from(await t.arrayBuffer()),
                contentType: t.headers.get('content-type'),
              }
            }
            const t = r.resolve(e)
            const i = await n.stat(t)
            if (!i.isFile()) throw new o(c.FileNotFound, t)
            return { data: await n.readFile(t) }
          }
          throw new l(c.ReqResourceType)
        }
      }
      e.exports = DataResolver
    },
    6257: (e) => {
      'use strict'
      function createEnum(e) {
        const t = {}
        for (const [i, s] of e.entries()) {
          if (s === null) continue
          t[s] = i
          t[i] = s
        }
        return t
      }
      e.exports = { createEnum: createEnum }
    },
    457: (e) => {
      'use strict'
      e.exports = {
        ApplicationCommandPermissionsUpdate:
          'applicationCommandPermissionsUpdate',
        AutoModerationActionExecution: 'autoModerationActionExecution',
        AutoModerationRuleCreate: 'autoModerationRuleCreate',
        AutoModerationRuleDelete: 'autoModerationRuleDelete',
        AutoModerationRuleUpdate: 'autoModerationRuleUpdate',
        CacheSweep: 'cacheSweep',
        ChannelCreate: 'channelCreate',
        ChannelDelete: 'channelDelete',
        ChannelPinsUpdate: 'channelPinsUpdate',
        ChannelUpdate: 'channelUpdate',
        ClientReady: 'ready',
        Debug: 'debug',
        Error: 'error',
        GuildBanAdd: 'guildBanAdd',
        GuildBanRemove: 'guildBanRemove',
        GuildCreate: 'guildCreate',
        GuildDelete: 'guildDelete',
        GuildEmojiCreate: 'emojiCreate',
        GuildEmojiDelete: 'emojiDelete',
        GuildEmojiUpdate: 'emojiUpdate',
        GuildIntegrationsUpdate: 'guildIntegrationsUpdate',
        GuildMemberAdd: 'guildMemberAdd',
        GuildMemberAvailable: 'guildMemberAvailable',
        GuildMemberRemove: 'guildMemberRemove',
        GuildMembersChunk: 'guildMembersChunk',
        GuildMemberUpdate: 'guildMemberUpdate',
        GuildRoleCreate: 'roleCreate',
        GuildRoleDelete: 'roleDelete',
        GuildRoleUpdate: 'roleUpdate',
        GuildScheduledEventCreate: 'guildScheduledEventCreate',
        GuildScheduledEventDelete: 'guildScheduledEventDelete',
        GuildScheduledEventUpdate: 'guildScheduledEventUpdate',
        GuildScheduledEventUserAdd: 'guildScheduledEventUserAdd',
        GuildScheduledEventUserRemove: 'guildScheduledEventUserRemove',
        GuildStickerCreate: 'stickerCreate',
        GuildStickerDelete: 'stickerDelete',
        GuildStickerUpdate: 'stickerUpdate',
        GuildUnavailable: 'guildUnavailable',
        GuildUpdate: 'guildUpdate',
        InteractionCreate: 'interactionCreate',
        Invalidated: 'invalidated',
        InviteCreate: 'inviteCreate',
        InviteDelete: 'inviteDelete',
        MessageBulkDelete: 'messageDeleteBulk',
        MessageCreate: 'messageCreate',
        MessageDelete: 'messageDelete',
        MessageReactionAdd: 'messageReactionAdd',
        MessageReactionRemove: 'messageReactionRemove',
        MessageReactionRemoveAll: 'messageReactionRemoveAll',
        MessageReactionRemoveEmoji: 'messageReactionRemoveEmoji',
        MessageUpdate: 'messageUpdate',
        PresenceUpdate: 'presenceUpdate',
        Raw: 'raw',
        ShardDisconnect: 'shardDisconnect',
        ShardError: 'shardError',
        ShardReady: 'shardReady',
        ShardReconnecting: 'shardReconnecting',
        ShardResume: 'shardResume',
        StageInstanceCreate: 'stageInstanceCreate',
        StageInstanceDelete: 'stageInstanceDelete',
        StageInstanceUpdate: 'stageInstanceUpdate',
        ThreadCreate: 'threadCreate',
        ThreadDelete: 'threadDelete',
        ThreadListSync: 'threadListSync',
        ThreadMembersUpdate: 'threadMembersUpdate',
        ThreadMemberUpdate: 'threadMemberUpdate',
        ThreadUpdate: 'threadUpdate',
        TypingStart: 'typingStart',
        UserUpdate: 'userUpdate',
        VoiceServerUpdate: 'voiceServerUpdate',
        VoiceStateUpdate: 'voiceStateUpdate',
        Warn: 'warn',
        WebhooksUpdate: 'webhookUpdate',
      }
    },
    6448: (e, t, i) => {
      'use strict'
      const { deprecate: s } = i(7261)
      const {
        blockQuote: n,
        bold: r,
        channelMention: a,
        codeBlock: o,
        formatEmoji: l,
        hideLinkEmbed: c,
        hyperlink: d,
        inlineCode: u,
        italic: h,
        quote: m,
        roleMention: p,
        spoiler: f,
        strikethrough: g,
        time: v,
        TimestampStyles: y,
        underscore: _,
        userMention: b,
      } = i(2547)
      class Formatters extends null {
        static blockQuote = s(
          n,
          'Formatters.blockQuote() is deprecated. Import this method directly from discord.js instead.'
        )
        static bold = s(
          r,
          'Formatters.bold() is deprecated. Import this method directly from discord.js instead.'
        )
        static channelMention = s(
          a,
          'Formatters.channelMention() is deprecated. Import this method directly from discord.js instead.'
        )
        static codeBlock = s(
          o,
          'Formatters.codeBlock() is deprecated. Import this method directly from discord.js instead.'
        )
        static formatEmoji = s(
          l,
          'Formatters.formatEmoji() is deprecated. Import this method directly from discord.js instead.'
        )
        static hideLinkEmbed = s(
          c,
          'Formatters.hideLinkEmbed() is deprecated. Import this method directly from discord.js instead.'
        )
        static hyperlink = s(
          d,
          'Formatters.hyperlink() is deprecated. Import this method directly from discord.js instead.'
        )
        static inlineCode = s(
          u,
          'Formatters.inlineCode() is deprecated. Import this method directly from discord.js instead.'
        )
        static italic = s(
          h,
          'Formatters.italic() is deprecated. Import this method directly from discord.js instead.'
        )
        static quote = s(
          m,
          'Formatters.quote() is deprecated. Import this method directly from discord.js instead.'
        )
        static roleMention = s(
          p,
          'Formatters.roleMention() is deprecated. Import this method directly from discord.js instead.'
        )
        static spoiler = s(
          f,
          'Formatters.spoiler() is deprecated. Import this method directly from discord.js instead.'
        )
        static strikethrough = s(
          g,
          'Formatters.strikethrough() is deprecated. Import this method directly from discord.js instead.'
        )
        static time = s(
          v,
          'Formatters.time() is deprecated. Import this method directly from discord.js instead.'
        )
        static TimestampStyles = y
        static underscore = s(
          _,
          'Formatters.underscore() is deprecated. Import this method directly from discord.js instead.'
        )
        static userMention = s(
          b,
          'Formatters.userMention() is deprecated. Import this method directly from discord.js instead.'
        )
      }
      e.exports = Formatters
    },
    4776: (e, t, i) => {
      'use strict'
      const { GatewayIntentBits: s } = i(2)
      const n = i(6492)
      class IntentsBitField extends n {
        static Flags = s
      }
      e.exports = IntentsBitField
    },
    3329: (e, t, i) => {
      'use strict'
      const { Collection: s } = i(2676)
      const { DiscordjsTypeError: n, ErrorCodes: r } = i(8951)
      class LimitedCollection extends s {
        constructor(e = {}, t) {
          if (typeof e !== 'object' || e === null) {
            throw new n(r.InvalidType, 'options', 'object', true)
          }
          const { maxSize: i = Infinity, keepOverLimit: s = null } = e
          if (typeof i !== 'number') {
            throw new n(r.InvalidType, 'maxSize', 'number')
          }
          if (s !== null && typeof s !== 'function') {
            throw new n(r.InvalidType, 'keepOverLimit', 'function')
          }
          super(t)
          this.maxSize = i
          this.keepOverLimit = s
        }
        set(e, t) {
          if (this.maxSize === 0) return this
          if (this.size >= this.maxSize && !this.has(e)) {
            for (const [e, t] of this.entries()) {
              const i = this.keepOverLimit?.(t, e, this) ?? false
              if (!i) {
                this.delete(e)
                break
              }
            }
          }
          return super.set(e, t)
        }
        static get [Symbol.species]() {
          return s
        }
      }
      e.exports = LimitedCollection
    },
    7323: (e, t, i) => {
      'use strict'
      const { MessageFlags: s } = i(2)
      const n = i(6492)
      class MessageFlagsBitField extends n {
        static Flags = s
      }
      e.exports = MessageFlagsBitField
    },
    2199: (e, t, i) => {
      'use strict'
      const s = i(7742)
      const { DefaultRestOptions: n } = i(1372)
      const { toSnakeCase: r } = i(7910)
      class Options extends null {
        static createDefault() {
          return {
            closeTimeout: 5e3,
            waitGuildTimeout: 15e3,
            shardCount: 1,
            makeCache: this.cacheWithLimits(this.DefaultMakeCacheSettings),
            partials: [],
            failIfNotExists: true,
            presence: {},
            sweepers: this.DefaultSweeperSettings,
            ws: {
              large_threshold: 50,
              compress: false,
              properties: {
                os: s.platform,
                browser: 'discord.js',
                device: 'discord.js',
              },
              version: 10,
            },
            rest: n,
            jsonTransformer: r,
          }
        }
        static cacheWithLimits(e = {}) {
          const { Collection: t } = i(2676)
          const s = i(3329)
          return (i) => {
            const n = e[i.name]
            if (n == null) {
              return new t()
            }
            if (typeof n === 'number') {
              if (n === Infinity) {
                return new t()
              }
              return new s({ maxSize: n })
            }
            const r = n.maxSize == null || n.maxSize === Infinity
            if (r) {
              return new t()
            }
            return new s(n)
          }
        }
        static cacheEverything() {
          const { Collection: e } = i(2676)
          return () => new e()
        }
        static get DefaultMakeCacheSettings() {
          return { MessageManager: 200 }
        }
        static get DefaultSweeperSettings() {
          return { threads: { interval: 3600, lifetime: 14400 } }
        }
      }
      e.exports = Options
    },
    527: (e, t, i) => {
      'use strict'
      const { createEnum: s } = i(6257)
      e.exports = s([
        'User',
        'Channel',
        'GuildMember',
        'Message',
        'Reaction',
        'GuildScheduledEvent',
        'ThreadMember',
      ])
    },
    9238: (e, t, i) => {
      'use strict'
      const { PermissionFlagsBits: s } = i(2)
      const n = i(6492)
      class PermissionsBitField extends n {
        static Flags = s
        static All = Object.values(s).reduce((e, t) => e | t, 0n)
        static Default = BigInt(104324673)
        static StageModerator = s.ManageChannels | s.MuteMembers | s.MoveMembers
        static DefaultBit = BigInt(0)
        missing(e, t = true) {
          return t && this.has(s.Administrator) ? [] : super.missing(e)
        }
        any(e, t = true) {
          return (t && super.has(s.Administrator)) || super.any(e)
        }
        has(e, t = true) {
          return (t && super.has(s.Administrator)) || super.has(e)
        }
        toArray() {
          return super.toArray(false)
        }
      }
      e.exports = PermissionsBitField
    },
    4053: (e) => {
      'use strict'
      e.exports = {
        Death: 'death',
        Disconnect: 'disconnect',
        Error: 'error',
        Message: 'message',
        Ready: 'ready',
        Reconnecting: 'reconnecting',
        Spawn: 'spawn',
      }
    },
    6619: (e, t, i) => {
      'use strict'
      const { createEnum: s } = i(6257)
      e.exports = s([
        'Ready',
        'Connecting',
        'Reconnecting',
        'Idle',
        'Nearly',
        'Disconnected',
        'WaitingForGuilds',
        'Identifying',
        'Resuming',
      ])
    },
    9850: (e, t, i) => {
      'use strict'
      const { setInterval: s, clearInterval: n } = i(2332)
      const { ThreadChannelTypes: r, SweeperKeys: a } = i(6047)
      const o = i(457)
      const { DiscordjsTypeError: l, ErrorCodes: c } = i(8951)
      class Sweepers {
        constructor(e, t) {
          Object.defineProperty(this, 'client', { value: e })
          this.options = t
          this.intervals = Object.fromEntries(a.map((e) => [e, null]))
          for (const e of a) {
            if (!(e in t)) continue
            this._validateProperties(e)
            const i = { ...this.options[e] }
            if (!('filter' in i)) {
              switch (e) {
                case 'invites':
                  i.filter = this.constructor.expiredInviteSweepFilter(
                    i.lifetime
                  )
                  break
                case 'messages':
                  i.filter = this.constructor.outdatedMessageSweepFilter(
                    i.lifetime
                  )
                  break
                case 'threads':
                  i.filter = this.constructor.archivedThreadSweepFilter(
                    i.lifetime
                  )
              }
            }
            this._initInterval(e, `sweep${e[0].toUpperCase()}${e.slice(1)}`, i)
          }
        }
        sweepApplicationCommands(e) {
          const { guilds: t, items: i } = this._sweepGuildDirectProp(
            'commands',
            e,
            { emit: false }
          )
          const s = this.client.application?.commands.cache.sweep(e) ?? 0
          this.client.emit(
            o.CacheSweep,
            `Swept ${s} global application commands and ${i} guild commands in ${t} guilds.`
          )
          return i + s
        }
        sweepAutoModerationRules(e) {
          return this._sweepGuildDirectProp('autoModerationRules', e).items
        }
        sweepBans(e) {
          return this._sweepGuildDirectProp('bans', e).items
        }
        sweepEmojis(e) {
          return this._sweepGuildDirectProp('emojis', e).items
        }
        sweepInvites(e) {
          return this._sweepGuildDirectProp('invites', e).items
        }
        sweepGuildMembers(e) {
          return this._sweepGuildDirectProp('members', e, {
            outputName: 'guild members',
          }).items
        }
        sweepMessages(e) {
          if (typeof e !== 'function') {
            throw new l(c.InvalidType, 'filter', 'function')
          }
          let t = 0
          let i = 0
          for (const s of this.client.channels.cache.values()) {
            if (!s.isTextBased()) continue
            t++
            i += s.messages.cache.sweep(e)
          }
          this.client.emit(
            o.CacheSweep,
            `Swept ${i} messages in ${t} text-based channels.`
          )
          return i
        }
        sweepPresences(e) {
          return this._sweepGuildDirectProp('presences', e).items
        }
        sweepReactions(e) {
          if (typeof e !== 'function') {
            throw new l(c.InvalidType, 'filter', 'function')
          }
          let t = 0
          let i = 0
          let s = 0
          for (const n of this.client.channels.cache.values()) {
            if (!n.isTextBased()) continue
            t++
            for (const t of n.messages.cache.values()) {
              i++
              s += t.reactions.cache.sweep(e)
            }
          }
          this.client.emit(
            o.CacheSweep,
            `Swept ${s} reactions on ${i} messages in ${t} text-based channels.`
          )
          return s
        }
        sweepStageInstances(e) {
          return this._sweepGuildDirectProp('stageInstances', e, {
            outputName: 'stage instances',
          }).items
        }
        sweepStickers(e) {
          return this._sweepGuildDirectProp('stickers', e).items
        }
        sweepThreadMembers(e) {
          if (typeof e !== 'function') {
            throw new l(c.InvalidType, 'filter', 'function')
          }
          let t = 0
          let i = 0
          for (const s of this.client.channels.cache.values()) {
            if (!r.includes(s.type)) continue
            t++
            i += s.members.cache.sweep(e)
          }
          this.client.emit(
            o.CacheSweep,
            `Swept ${i} thread members in ${t} threads.`
          )
          return i
        }
        sweepThreads(e) {
          if (typeof e !== 'function') {
            throw new l(c.InvalidType, 'filter', 'function')
          }
          let t = 0
          for (const [i, s] of this.client.channels.cache.entries()) {
            if (!r.includes(s.type)) continue
            if (e(s, i, this.client.channels.cache)) {
              t++
              this.client.channels._remove(i)
            }
          }
          this.client.emit(o.CacheSweep, `Swept ${t} threads.`)
          return t
        }
        sweepUsers(e) {
          if (typeof e !== 'function') {
            throw new l(c.InvalidType, 'filter', 'function')
          }
          const t = this.client.users.cache.sweep(e)
          this.client.emit(o.CacheSweep, `Swept ${t} users.`)
          return t
        }
        sweepVoiceStates(e) {
          return this._sweepGuildDirectProp('voiceStates', e, {
            outputName: 'voice states',
          }).items
        }
        destroy() {
          for (const e of a) {
            if (this.intervals[e]) n(this.intervals[e])
          }
        }
        static filterByLifetime({
          lifetime: e = 14400,
          getComparisonTimestamp: t = (e) => e?.createdTimestamp,
          excludeFromSweep: i = () => false,
        } = {}) {
          if (typeof e !== 'number') {
            throw new l(c.InvalidType, 'lifetime', 'number')
          }
          if (typeof t !== 'function') {
            throw new l(c.InvalidType, 'getComparisonTimestamp', 'function')
          }
          if (typeof i !== 'function') {
            throw new l(c.InvalidType, 'excludeFromSweep', 'function')
          }
          return () => {
            if (e <= 0) return null
            const s = e * 1e3
            const n = Date.now()
            return (e, r, a) => {
              if (i(e, r, a)) {
                return false
              }
              const o = t(e, r, a)
              if (!o || typeof o !== 'number') return false
              return n - o > s
            }
          }
        }
        static archivedThreadSweepFilter(e = 14400) {
          return this.filterByLifetime({
            lifetime: e,
            getComparisonTimestamp: (e) => e.archiveTimestamp,
            excludeFromSweep: (e) => !e.archived,
          })
        }
        static expiredInviteSweepFilter(e = 14400) {
          return this.filterByLifetime({
            lifetime: e,
            getComparisonTimestamp: (e) => e.expiresTimestamp,
          })
        }
        static outdatedMessageSweepFilter(e = 3600) {
          return this.filterByLifetime({
            lifetime: e,
            getComparisonTimestamp: (e) =>
              e.editedTimestamp ?? e.createdTimestamp,
          })
        }
        _sweepGuildDirectProp(e, t, { emit: i = true, outputName: s } = {}) {
          if (typeof t !== 'function') {
            throw new l(c.InvalidType, 'filter', 'function')
          }
          let n = 0
          let r = 0
          for (const i of this.client.guilds.cache.values()) {
            const { cache: s } = i[e]
            n++
            r += s.sweep(t)
          }
          if (i) {
            this.client.emit(
              o.CacheSweep,
              `Swept ${r} ${s ?? e} in ${n} guilds.`
            )
          }
          return { guilds: n, items: r }
        }
        _validateProperties(e) {
          const t = this.options[e]
          if (typeof t !== 'object') {
            throw new l(c.InvalidType, `sweepers.${e}`, 'object', true)
          }
          if (typeof t.interval !== 'number') {
            throw new l(c.InvalidType, `sweepers.${e}.interval`, 'number')
          }
          if (
            ['invites', 'messages', 'threads'].includes(e) &&
            !('filter' in t)
          ) {
            if (typeof t.lifetime !== 'number') {
              throw new l(c.InvalidType, `sweepers.${e}.lifetime`, 'number')
            }
            return
          }
          if (typeof t.filter !== 'function') {
            throw new l(c.InvalidType, `sweepers.${e}.filter`, 'function')
          }
        }
        _initInterval(e, t, i) {
          if (i.interval <= 0 || i.interval === Infinity) return
          this.intervals[e] = s(() => {
            const e = i.filter()
            if (e === null) return
            if (typeof e !== 'function') throw new l(c.SweepFilterReturn)
            this[t](e)
          }, i.interval * 1e3).unref()
        }
      }
      e.exports = Sweepers
    },
    3502: (e, t, i) => {
      'use strict'
      const { GuildSystemChannelFlags: s } = i(2)
      const n = i(6492)
      class SystemChannelFlagsBitField extends n {
        static Flags = s
      }
      e.exports = SystemChannelFlagsBitField
    },
    7892: (e, t, i) => {
      'use strict'
      const s = i(6492)
      class ThreadMemberFlagsBitField extends s {
        static Flags = {}
      }
      e.exports = ThreadMemberFlagsBitField
    },
    7910: (e, t, i) => {
      'use strict'
      const { isJSONEncodable: s } = i(9575)
      const n = i(3360)
      function toSnakeCase(e) {
        if (typeof e !== 'object' || !e) return e
        if (e instanceof Date) return e
        if (s(e)) return toSnakeCase(e.toJSON())
        if (Array.isArray(e)) return e.map(toSnakeCase)
        return Object.fromEntries(
          Object.entries(e).map(([e, t]) => [n(e), toSnakeCase(t)])
        )
      }
      e.exports = { toSnakeCase: toSnakeCase }
    },
    2377: (e, t, i) => {
      'use strict'
      const { UserFlags: s } = i(2)
      const n = i(6492)
      class UserFlagsBitField extends n {
        static Flags = s
      }
      e.exports = UserFlagsBitField
    },
    7966: (e, t, i) => {
      'use strict'
      const { parse: s } = i(9411)
      const { Collection: n } = i(2676)
      const { ChannelType: r, RouteBases: a, Routes: o } = i(2)
      const { fetch: l } = i(1798)
      const c = i(562)
      const {
        DiscordjsError: d,
        DiscordjsRangeError: u,
        DiscordjsTypeError: h,
        ErrorCodes: m,
      } = i(8951)
      const isObject = (e) => typeof e === 'object' && e !== null
      function flatten(e, ...t) {
        if (!isObject(e)) return e
        const i = Object.keys(e)
          .filter((e) => !e.startsWith('_'))
          .map((e) => ({ [e]: true }))
        t = i.length ? Object.assign(...i, ...t) : Object.assign({}, ...t)
        const s = {}
        for (let [i, r] of Object.entries(t)) {
          if (!r) continue
          r = r === true ? i : r
          const t = e[i]
          const a = isObject(t)
          const o = a && typeof t.valueOf === 'function' ? t.valueOf() : null
          const l = a && typeof t.toJSON === 'function'
          if (t instanceof n) s[r] = Array.from(t.keys())
          else if (o instanceof n) s[r] = Array.from(o.keys())
          else if (Array.isArray(t))
            s[r] = t.map((e) => e.toJSON?.() ?? flatten(e))
          else if (typeof o !== 'object') s[r] = o
          else if (l) s[r] = t.toJSON()
          else if (typeof t === 'object') s[r] = flatten(t)
          else if (!a) s[r] = t
        }
        return s
      }
      function escapeMarkdown(
        e,
        {
          codeBlock: t = true,
          inlineCode: i = true,
          bold: s = true,
          italic: n = true,
          underline: r = true,
          strikethrough: a = true,
          spoiler: o = true,
          codeBlockContent: l = true,
          inlineCodeContent: c = true,
          escape: d = true,
          heading: u = false,
          bulletedList: h = false,
          numberedList: m = false,
          maskedLink: p = false,
        } = {}
      ) {
        if (!l) {
          return e
            .split('```')
            .map((e, t, l) => {
              if (t % 2 && t !== l.length - 1) return e
              return escapeMarkdown(e, {
                inlineCode: i,
                bold: s,
                italic: n,
                underline: r,
                strikethrough: a,
                spoiler: o,
                inlineCodeContent: c,
                escape: d,
                heading: u,
                bulletedList: h,
                numberedList: m,
                maskedLink: p,
              })
            })
            .join(t ? '\\`\\`\\`' : '```')
        }
        if (!c) {
          return e
            .split(/(?<=^|[^`])`(?=[^`]|$)/g)
            .map((e, i, l) => {
              if (i % 2 && i !== l.length - 1) return e
              return escapeMarkdown(e, {
                codeBlock: t,
                bold: s,
                italic: n,
                underline: r,
                strikethrough: a,
                spoiler: o,
                escape: d,
                heading: u,
                bulletedList: h,
                numberedList: m,
                maskedLink: p,
              })
            })
            .join(i ? '\\`' : '`')
        }
        if (d) e = escapeEscape(e)
        if (i) e = escapeInlineCode(e)
        if (t) e = escapeCodeBlock(e)
        if (n) e = escapeItalic(e)
        if (s) e = escapeBold(e)
        if (r) e = escapeUnderline(e)
        if (a) e = escapeStrikethrough(e)
        if (o) e = escapeSpoiler(e)
        if (u) e = escapeHeading(e)
        if (h) e = escapeBulletedList(e)
        if (m) e = escapeNumberedList(e)
        if (p) e = escapeMaskedLink(e)
        return e
      }
      function escapeCodeBlock(e) {
        return e.replaceAll('```', '\\`\\`\\`')
      }
      function escapeInlineCode(e) {
        return e.replace(/(?<=^|[^`])``?(?=[^`]|$)/g, (e) =>
          e.length === 2 ? '\\`\\`' : '\\`'
        )
      }
      function escapeItalic(e) {
        let t = 0
        e = e.replace(/(?<=^|[^*])\*([^*]|\*\*|$)/g, (e, i) => {
          if (i === '**') return ++t % 2 ? `\\*${i}` : `${i}\\*`
          return `\\*${i}`
        })
        t = 0
        return e.replace(/(?<=^|[^_])_([^_]|__|$)/g, (e, i) => {
          if (i === '__') return ++t % 2 ? `\\_${i}` : `${i}\\_`
          return `\\_${i}`
        })
      }
      function escapeBold(e) {
        let t = 0
        return e.replace(/\*\*(\*)?/g, (e, i) => {
          if (i) return ++t % 2 ? `${i}\\*\\*` : `\\*\\*${i}`
          return '\\*\\*'
        })
      }
      function escapeUnderline(e) {
        let t = 0
        return e.replace(/__(_)?/g, (e, i) => {
          if (i) return ++t % 2 ? `${i}\\_\\_` : `\\_\\_${i}`
          return '\\_\\_'
        })
      }
      function escapeStrikethrough(e) {
        return e.replaceAll('~~', '\\~\\~')
      }
      function escapeSpoiler(e) {
        return e.replaceAll('||', '\\|\\|')
      }
      function escapeEscape(e) {
        return e.replaceAll('\\', '\\\\')
      }
      function escapeHeading(e) {
        return e.replaceAll(/^( {0,2}[*-] +)?(#{1,3} )/gm, '$1\\$2')
      }
      function escapeBulletedList(e) {
        return e.replaceAll(/^( *)[*-]( +)/gm, '$1\\-$2')
      }
      function escapeNumberedList(e) {
        return e.replaceAll(/^( *\d+)\./gm, '$1\\.')
      }
      function escapeMaskedLink(e) {
        return e.replaceAll(/\[.+\]\(.+\)/gm, '\\$&')
      }
      async function fetchRecommendedShardCount(
        e,
        { guildsPerShard: t = 1e3, multipleOf: i = 1 } = {}
      ) {
        if (!e) throw new d(m.TokenMissing)
        const s = await l(a.api + o.gatewayBot(), {
          method: 'GET',
          headers: { Authorization: `Bot ${e.replace(/^Bot\s*/i, '')}` },
        })
        if (!s.ok) {
          if (s.status === 401) throw new d(m.TokenInvalid)
          throw s
        }
        const { shards: n } = await s.json()
        return Math.ceil((n * (1e3 / t)) / i) * i
      }
      function parseEmoji(e) {
        if (e.includes('%')) e = decodeURIComponent(e)
        if (!e.includes(':')) return { animated: false, name: e, id: undefined }
        const t = e.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/)
        return t && { animated: Boolean(t[1]), name: t[2], id: t[3] }
      }
      function resolvePartialEmoji(e) {
        if (!e) return null
        if (typeof e === 'string')
          return /^\d{17,19}$/.test(e) ? { id: e } : parseEmoji(e)
        const { id: t, name: i, animated: s } = e
        if (!t && !i) return null
        return { id: t, name: i, animated: Boolean(s) }
      }
      function mergeDefault(e, t) {
        if (!t) return e
        for (const i in e) {
          if (!Object.hasOwn(t, i) || t[i] === undefined) {
            t[i] = e[i]
          } else if (t[i] === Object(t[i])) {
            t[i] = mergeDefault(e[i], t[i])
          }
        }
        return t
      }
      function makeError(e) {
        const t = new Error(e.message)
        t.name = e.name
        t.stack = e.stack
        return t
      }
      function makePlainError(e) {
        return { name: e.name, message: e.message, stack: e.stack }
      }
      function moveElementInArray(e, t, i, s = false) {
        const n = e.indexOf(t)
        i = (s ? n : 0) + i
        if (i > -1 && i < e.length) {
          const t = e.splice(n, 1)[0]
          e.splice(i, 0, t)
        }
        return e.indexOf(t)
      }
      function verifyString(
        e,
        t = Error,
        i = `Expected a string, got ${e} instead.`,
        s = true
      ) {
        if (typeof e !== 'string') throw new t(i)
        if (!s && e.length === 0) throw new t(i)
        return e
      }
      function resolveColor(e) {
        if (typeof e === 'string') {
          if (e === 'Random') return Math.floor(Math.random() * (16777215 + 1))
          if (e === 'Default') return 0
          e = c[e] ?? parseInt(e.replace('#', ''), 16)
        } else if (Array.isArray(e)) {
          e = (e[0] << 16) + (e[1] << 8) + e[2]
        }
        if (e < 0 || e > 16777215) throw new u(m.ColorRange)
        else if (Number.isNaN(e)) throw new h(m.ColorConvert)
        return e
      }
      function discordSort(e) {
        const t = e.first() instanceof p
        return e.sorted(
          t
            ? (e, t) =>
                e.rawPosition - t.rawPosition ||
                Number(BigInt(e.id) - BigInt(t.id))
            : (e, t) =>
                e.rawPosition - t.rawPosition ||
                Number(BigInt(t.id) - BigInt(e.id))
        )
      }
      async function setPosition(e, t, i, s, n, r, a) {
        let o = [...s.values()]
        moveElementInArray(o, e, t, i)
        o = o.map((e, t) => ({ id: e.id, position: t }))
        await n.rest.patch(r, { body: o, reason: a })
        return o
      }
      function basename(e, t) {
        const i = s(e)
        return t && i.ext.startsWith(t) ? i.name : i.base.split('?')[0]
      }
      function cleanContent(e, t) {
        return e.replaceAll(/<(@[!&]?|#)(\d{17,19})>/g, (e, i, s) => {
          switch (i) {
            case '@':
            case '@!': {
              const i = t.guild?.members.cache.get(s)
              if (i) {
                return `@${i.displayName}`
              }
              const n = t.client.users.cache.get(s)
              return n ? `@${n.username}` : e
            }
            case '@&': {
              if (t.type === r.DM) return e
              const i = t.guild.roles.cache.get(s)
              return i ? `@${i.name}` : e
            }
            case '#': {
              const i = t.client.channels.cache.get(s)
              return i ? `#${i.name}` : e
            }
            default: {
              return e
            }
          }
        })
      }
      function cleanCodeBlockContent(e) {
        return e.replaceAll('```', '`​``')
      }
      function parseWebhookURL(e) {
        const t = e.match(
          /https?:\/\/(?:ptb\.|canary\.)?discord\.com\/api(?:\/v\d{1,2})?\/webhooks\/(\d{17,19})\/([\w-]{68})/i
        )
        if (!t || t.length <= 2) return null
        const [, i, s] = t
        return { id: i, token: s }
      }
      e.exports = {
        flatten: flatten,
        escapeMarkdown: escapeMarkdown,
        escapeCodeBlock: escapeCodeBlock,
        escapeInlineCode: escapeInlineCode,
        escapeItalic: escapeItalic,
        escapeBold: escapeBold,
        escapeUnderline: escapeUnderline,
        escapeStrikethrough: escapeStrikethrough,
        escapeSpoiler: escapeSpoiler,
        fetchRecommendedShardCount: fetchRecommendedShardCount,
        parseEmoji: parseEmoji,
        resolvePartialEmoji: resolvePartialEmoji,
        mergeDefault: mergeDefault,
        makeError: makeError,
        makePlainError: makePlainError,
        moveElementInArray: moveElementInArray,
        verifyString: verifyString,
        resolveColor: resolveColor,
        discordSort: discordSort,
        setPosition: setPosition,
        basename: basename,
        cleanContent: cleanContent,
        cleanCodeBlockContent: cleanCodeBlockContent,
        parseWebhookURL: parseWebhookURL,
      }
      const p = i(3883)
    },
    5579: (e) => {
      'use strict'
      e.exports = {
        Close: 'close',
        Destroyed: 'destroyed',
        InvalidSession: 'invalidSession',
        Ready: 'ready',
        Resumed: 'resumed',
        AllReady: 'allReady',
      }
    },
    8060: (e, t, i) => {
      e.exports = require(i.ab + 'build/Release/erlpack.node')
    },
    1230: (e) => {
      'use strict'
      e.exports = function equal(e, t) {
        if (e === t) return true
        if (e && t && typeof e == 'object' && typeof t == 'object') {
          if (e.constructor !== t.constructor) return false
          var i, s, n
          if (Array.isArray(e)) {
            i = e.length
            if (i != t.length) return false
            for (s = i; s-- !== 0; ) if (!equal(e[s], t[s])) return false
            return true
          }
          if (e.constructor === RegExp)
            return e.source === t.source && e.flags === t.flags
          if (e.valueOf !== Object.prototype.valueOf)
            return e.valueOf() === t.valueOf()
          if (e.toString !== Object.prototype.toString)
            return e.toString() === t.toString()
          n = Object.keys(e)
          i = n.length
          if (i !== Object.keys(t).length) return false
          for (s = i; s-- !== 0; )
            if (!Object.prototype.hasOwnProperty.call(t, n[s])) return false
          for (s = i; s-- !== 0; ) {
            var r = n[s]
            if (!equal(e[r], t[r])) return false
          }
          return true
        }
        return e !== e && t !== t
      }
    },
    3360: (e) => {
      var t = 1 / 0
      var i = '[object Symbol]'
      var s = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g
      var n = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g
      var r = '\\ud800-\\udfff',
        a = '\\u0300-\\u036f\\ufe20-\\ufe23',
        o = '\\u20d0-\\u20f0',
        l = '\\u2700-\\u27bf',
        c = 'a-z\\xdf-\\xf6\\xf8-\\xff',
        d = '\\xac\\xb1\\xd7\\xf7',
        u = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
        h = '\\u2000-\\u206f',
        m =
          ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
        p = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
        f = '\\ufe0e\\ufe0f',
        g = d + u + h + m
      var v = "['’]",
        y = '[' + g + ']',
        _ = '[' + a + o + ']',
        b = '\\d+',
        w = '[' + l + ']',
        C = '[' + c + ']',
        S = '[^' + r + g + b + l + c + p + ']',
        M = '\\ud83c[\\udffb-\\udfff]',
        I = '(?:' + _ + '|' + M + ')',
        T = '[^' + r + ']',
        E = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        R = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        A = '[' + p + ']',
        k = '\\u200d'
      var x = '(?:' + C + '|' + S + ')',
        D = '(?:' + A + '|' + S + ')',
        O = '(?:' + v + '(?:d|ll|m|re|s|t|ve))?',
        P = '(?:' + v + '(?:D|LL|M|RE|S|T|VE))?',
        U = I + '?',
        j = '[' + f + ']?',
        G = '(?:' + k + '(?:' + [T, E, R].join('|') + ')' + j + U + ')*',
        L = j + U + G,
        B = '(?:' + [w, E, R].join('|') + ')' + L
      var N = RegExp(v, 'g')
      var $ = RegExp(_, 'g')
      var F = RegExp(
        [
          A + '?' + C + '+' + O + '(?=' + [y, A, '$'].join('|') + ')',
          D + '+' + P + '(?=' + [y, A + x, '$'].join('|') + ')',
          A + '?' + x + '+' + O,
          A + '+' + P,
          b,
          B,
        ].join('|'),
        'g'
      )
      var q =
        /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/
      var W = {
        À: 'A',
        Á: 'A',
        Â: 'A',
        Ã: 'A',
        Ä: 'A',
        Å: 'A',
        à: 'a',
        á: 'a',
        â: 'a',
        ã: 'a',
        ä: 'a',
        å: 'a',
        Ç: 'C',
        ç: 'c',
        Ð: 'D',
        ð: 'd',
        È: 'E',
        É: 'E',
        Ê: 'E',
        Ë: 'E',
        è: 'e',
        é: 'e',
        ê: 'e',
        ë: 'e',
        Ì: 'I',
        Í: 'I',
        Î: 'I',
        Ï: 'I',
        ì: 'i',
        í: 'i',
        î: 'i',
        ï: 'i',
        Ñ: 'N',
        ñ: 'n',
        Ò: 'O',
        Ó: 'O',
        Ô: 'O',
        Õ: 'O',
        Ö: 'O',
        Ø: 'O',
        ò: 'o',
        ó: 'o',
        ô: 'o',
        õ: 'o',
        ö: 'o',
        ø: 'o',
        Ù: 'U',
        Ú: 'U',
        Û: 'U',
        Ü: 'U',
        ù: 'u',
        ú: 'u',
        û: 'u',
        ü: 'u',
        Ý: 'Y',
        ý: 'y',
        ÿ: 'y',
        Æ: 'Ae',
        æ: 'ae',
        Þ: 'Th',
        þ: 'th',
        ß: 'ss',
        Ā: 'A',
        Ă: 'A',
        Ą: 'A',
        ā: 'a',
        ă: 'a',
        ą: 'a',
        Ć: 'C',
        Ĉ: 'C',
        Ċ: 'C',
        Č: 'C',
        ć: 'c',
        ĉ: 'c',
        ċ: 'c',
        č: 'c',
        Ď: 'D',
        Đ: 'D',
        ď: 'd',
        đ: 'd',
        Ē: 'E',
        Ĕ: 'E',
        Ė: 'E',
        Ę: 'E',
        Ě: 'E',
        ē: 'e',
        ĕ: 'e',
        ė: 'e',
        ę: 'e',
        ě: 'e',
        Ĝ: 'G',
        Ğ: 'G',
        Ġ: 'G',
        Ģ: 'G',
        ĝ: 'g',
        ğ: 'g',
        ġ: 'g',
        ģ: 'g',
        Ĥ: 'H',
        Ħ: 'H',
        ĥ: 'h',
        ħ: 'h',
        Ĩ: 'I',
        Ī: 'I',
        Ĭ: 'I',
        Į: 'I',
        İ: 'I',
        ĩ: 'i',
        ī: 'i',
        ĭ: 'i',
        į: 'i',
        ı: 'i',
        Ĵ: 'J',
        ĵ: 'j',
        Ķ: 'K',
        ķ: 'k',
        ĸ: 'k',
        Ĺ: 'L',
        Ļ: 'L',
        Ľ: 'L',
        Ŀ: 'L',
        Ł: 'L',
        ĺ: 'l',
        ļ: 'l',
        ľ: 'l',
        ŀ: 'l',
        ł: 'l',
        Ń: 'N',
        Ņ: 'N',
        Ň: 'N',
        Ŋ: 'N',
        ń: 'n',
        ņ: 'n',
        ň: 'n',
        ŋ: 'n',
        Ō: 'O',
        Ŏ: 'O',
        Ő: 'O',
        ō: 'o',
        ŏ: 'o',
        ő: 'o',
        Ŕ: 'R',
        Ŗ: 'R',
        Ř: 'R',
        ŕ: 'r',
        ŗ: 'r',
        ř: 'r',
        Ś: 'S',
        Ŝ: 'S',
        Ş: 'S',
        Š: 'S',
        ś: 's',
        ŝ: 's',
        ş: 's',
        š: 's',
        Ţ: 'T',
        Ť: 'T',
        Ŧ: 'T',
        ţ: 't',
        ť: 't',
        ŧ: 't',
        Ũ: 'U',
        Ū: 'U',
        Ŭ: 'U',
        Ů: 'U',
        Ű: 'U',
        Ų: 'U',
        ũ: 'u',
        ū: 'u',
        ŭ: 'u',
        ů: 'u',
        ű: 'u',
        ų: 'u',
        Ŵ: 'W',
        ŵ: 'w',
        Ŷ: 'Y',
        ŷ: 'y',
        Ÿ: 'Y',
        Ź: 'Z',
        Ż: 'Z',
        Ž: 'Z',
        ź: 'z',
        ż: 'z',
        ž: 'z',
        Ĳ: 'IJ',
        ĳ: 'ij',
        Œ: 'Oe',
        œ: 'oe',
        ŉ: "'n",
        ſ: 'ss',
      }
      var V =
        typeof global == 'object' &&
        global &&
        global.Object === Object &&
        global
      var z = typeof self == 'object' && self && self.Object === Object && self
      var H = V || z || Function('return this')()
      function arrayReduce(e, t, i, s) {
        var n = -1,
          r = e ? e.length : 0
        if (s && r) {
          i = e[++n]
        }
        while (++n < r) {
          i = t(i, e[n], n, e)
        }
        return i
      }
      function asciiWords(e) {
        return e.match(s) || []
      }
      function basePropertyOf(e) {
        return function (t) {
          return e == null ? undefined : e[t]
        }
      }
      var J = basePropertyOf(W)
      function hasUnicodeWord(e) {
        return q.test(e)
      }
      function unicodeWords(e) {
        return e.match(F) || []
      }
      var Q = Object.prototype
      var K = Q.toString
      var Y = H.Symbol
      var Z = Y ? Y.prototype : undefined,
        X = Z ? Z.toString : undefined
      function baseToString(e) {
        if (typeof e == 'string') {
          return e
        }
        if (isSymbol(e)) {
          return X ? X.call(e) : ''
        }
        var i = e + ''
        return i == '0' && 1 / e == -t ? '-0' : i
      }
      function createCompounder(e) {
        return function (t) {
          return arrayReduce(words(deburr(t).replace(N, '')), e, '')
        }
      }
      function isObjectLike(e) {
        return !!e && typeof e == 'object'
      }
      function isSymbol(e) {
        return typeof e == 'symbol' || (isObjectLike(e) && K.call(e) == i)
      }
      function toString(e) {
        return e == null ? '' : baseToString(e)
      }
      function deburr(e) {
        e = toString(e)
        return e && e.replace(n, J).replace($, '')
      }
      var ee = createCompounder(function (e, t, i) {
        return e + (i ? '_' : '') + t.toLowerCase()
      })
      function words(e, t, i) {
        e = toString(e)
        t = i ? undefined : t
        if (t === undefined) {
          return hasUnicodeWord(e) ? unicodeWords(e) : asciiWords(e)
        }
        return e.match(t) || []
      }
      e.exports = ee
    },
    2931: (e, t, i) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.decorate =
        t.getDecoratorsForClass =
        t.directDecoratorSearch =
        t.deepDecoratorSearch =
          void 0
      const s = i(9192)
      const n = i(7030)
      const mergeObjectsOfDecorators = (e, t) => {
        var i, n
        const r = s.unique([
          ...Object.getOwnPropertyNames(e),
          ...Object.getOwnPropertyNames(t),
        ])
        const a = {}
        for (let o of r)
          a[o] = s.unique([
            ...((i = e === null || e === void 0 ? void 0 : e[o]) !== null &&
            i !== void 0
              ? i
              : []),
            ...((n = t === null || t === void 0 ? void 0 : t[o]) !== null &&
            n !== void 0
              ? n
              : []),
          ])
        return a
      }
      const mergePropertyAndMethodDecorators = (e, t) => {
        var i, s, n, r
        return {
          property: mergeObjectsOfDecorators(
            (i = e === null || e === void 0 ? void 0 : e.property) !== null &&
              i !== void 0
              ? i
              : {},
            (s = t === null || t === void 0 ? void 0 : t.property) !== null &&
              s !== void 0
              ? s
              : {}
          ),
          method: mergeObjectsOfDecorators(
            (n = e === null || e === void 0 ? void 0 : e.method) !== null &&
              n !== void 0
              ? n
              : {},
            (r = t === null || t === void 0 ? void 0 : t.method) !== null &&
              r !== void 0
              ? r
              : {}
          ),
        }
      }
      const mergeDecorators = (e, t) => {
        var i, n, r, a, o, l
        return {
          class: s.unique([
            ...((i = e === null || e === void 0 ? void 0 : e.class) !== null &&
            i !== void 0
              ? i
              : []),
            ...((n = t === null || t === void 0 ? void 0 : t.class) !== null &&
            n !== void 0
              ? n
              : []),
          ]),
          static: mergePropertyAndMethodDecorators(
            (r = e === null || e === void 0 ? void 0 : e.static) !== null &&
              r !== void 0
              ? r
              : {},
            (a = t === null || t === void 0 ? void 0 : t.static) !== null &&
              a !== void 0
              ? a
              : {}
          ),
          instance: mergePropertyAndMethodDecorators(
            (o = e === null || e === void 0 ? void 0 : e.instance) !== null &&
              o !== void 0
              ? o
              : {},
            (l = t === null || t === void 0 ? void 0 : t.instance) !== null &&
              l !== void 0
              ? l
              : {}
          ),
        }
      }
      const r = new Map()
      const findAllConstituentClasses = (...e) => {
        var t
        const i = new Set()
        const r = new Set([...e])
        while (r.size > 0) {
          for (let e of r) {
            const a = s.protoChain(e.prototype).map((e) => e.constructor)
            const o =
              (t = n.getMixinsForClass(e)) !== null && t !== void 0 ? t : []
            const l = [...a, ...o]
            const c = l.filter((e) => !i.has(e))
            for (let e of c) r.add(e)
            i.add(e)
            r.delete(e)
          }
        }
        return [...i]
      }
      const deepDecoratorSearch = (...e) => {
        const t = findAllConstituentClasses(...e)
          .map((e) => r.get(e))
          .filter((e) => !!e)
        if (t.length == 0) return {}
        if (t.length == 1) return t[0]
        return t.reduce((e, t) => mergeDecorators(e, t))
      }
      t.deepDecoratorSearch = deepDecoratorSearch
      const directDecoratorSearch = (...e) => {
        const i = e.map((e) => t.getDecoratorsForClass(e))
        if (i.length === 0) return {}
        if (i.length === 1) return i[0]
        return i.reduce((e, t) => mergeDecorators(e, t))
      }
      t.directDecoratorSearch = directDecoratorSearch
      const getDecoratorsForClass = (e) => {
        let t = r.get(e)
        if (!t) {
          t = {}
          r.set(e, t)
        }
        return t
      }
      t.getDecoratorsForClass = getDecoratorsForClass
      const decorateClass = (e) => (i) => {
        const s = t.getDecoratorsForClass(i)
        let n = s.class
        if (!n) {
          n = []
          s.class = n
        }
        n.push(e)
        return e(i)
      }
      const decorateMember =
        (e) =>
        (i, s, ...n) => {
          const r = typeof i === 'function' ? 'static' : 'instance'
          const a = typeof i[s] === 'function' ? 'method' : 'property'
          const o = r === 'static' ? i : i.constructor
          const l = t.getDecoratorsForClass(o)
          let c = l === null || l === void 0 ? void 0 : l[r]
          if (!c) {
            c = {}
            l[r] = c
          }
          let d = c === null || c === void 0 ? void 0 : c[a]
          if (!d) {
            d = {}
            c[a] = d
          }
          let u = d === null || d === void 0 ? void 0 : d[s]
          if (!u) {
            u = []
            d[s] = u
          }
          u.push(e)
          return e(i, s, ...n)
        }
      const decorate =
        (e) =>
        (...t) => {
          if (t.length === 1) return decorateClass(e)(t[0])
          return decorateMember(e)(...t)
        }
      t.decorate = decorate
    },
    7956: (e, t, i) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.hasMixin = t.decorate = t.settings = t.mix = t.Mixin = void 0
      var s = i(9392)
      Object.defineProperty(t, 'Mixin', {
        enumerable: true,
        get: function () {
          return s.Mixin
        },
      })
      Object.defineProperty(t, 'mix', {
        enumerable: true,
        get: function () {
          return s.mix
        },
      })
      var n = i(8541)
      Object.defineProperty(t, 'settings', {
        enumerable: true,
        get: function () {
          return n.settings
        },
      })
      var r = i(2931)
      Object.defineProperty(t, 'decorate', {
        enumerable: true,
        get: function () {
          return r.decorate
        },
      })
      var a = i(7030)
      Object.defineProperty(t, 'hasMixin', {
        enumerable: true,
        get: function () {
          return a.hasMixin
        },
      })
    },
    7030: (e, t, i) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.hasMixin = t.registerMixins = t.getMixinsForClass = void 0
      const s = i(9192)
      const n = new Map()
      const getMixinsForClass = (e) => n.get(e)
      t.getMixinsForClass = getMixinsForClass
      const registerMixins = (e, t) => n.set(e, t)
      t.registerMixins = registerMixins
      const hasMixin = (e, t) => {
        if (e instanceof t) return true
        const i = e.constructor
        const r = new Set()
        let a = new Set()
        a.add(i)
        while (a.size > 0) {
          if (a.has(t)) return true
          a.forEach((e) => r.add(e))
          const e = new Set()
          a.forEach((t) => {
            var i
            const o =
              (i = n.get(t)) !== null && i !== void 0
                ? i
                : s
                    .protoChain(t.prototype)
                    .map((e) => e.constructor)
                    .filter((e) => e !== null)
            if (o)
              o.forEach((t) => {
                if (!r.has(t) && !a.has(t)) e.add(t)
              })
          })
          a = e
        }
        return false
      }
      t.hasMixin = hasMixin
    },
    9392: (e, t, i) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.mix = t.Mixin = void 0
      const s = i(9591)
      const n = i(8541)
      const r = i(9192)
      const a = i(2931)
      const o = i(7030)
      function Mixin(...e) {
        var t, i, l
        const c = e.map((e) => e.prototype)
        const d = n.settings.initFunction
        if (d !== null) {
          const e = c.map((e) => e[d]).filter((e) => typeof e === 'function')
          const combinedInitFunction = function (...t) {
            for (let i of e) i.apply(this, t)
          }
          const t = { [d]: combinedInitFunction }
          c.push(t)
        }
        function MixedClass(...t) {
          for (const i of e) r.copyProps(this, new i(...t))
          if (d !== null && typeof this[d] === 'function')
            this[d].apply(this, t)
        }
        MixedClass.prototype =
          n.settings.prototypeStrategy === 'copy'
            ? r.hardMixProtos(c, MixedClass)
            : s.softMixProtos(c, MixedClass)
        Object.setPrototypeOf(
          MixedClass,
          n.settings.staticsStrategy === 'copy'
            ? r.hardMixProtos(e, null, ['prototype'])
            : s.proxyMix(e, Function.prototype)
        )
        let u = MixedClass
        if (n.settings.decoratorInheritance !== 'none') {
          const s =
            n.settings.decoratorInheritance === 'deep'
              ? a.deepDecoratorSearch(...e)
              : a.directDecoratorSearch(...e)
          for (let e of (t = s === null || s === void 0 ? void 0 : s.class) !==
            null && t !== void 0
            ? t
            : []) {
            const t = e(u)
            if (t) {
              u = t
            }
          }
          applyPropAndMethodDecorators(
            (i = s === null || s === void 0 ? void 0 : s.static) !== null &&
              i !== void 0
              ? i
              : {},
            u
          )
          applyPropAndMethodDecorators(
            (l = s === null || s === void 0 ? void 0 : s.instance) !== null &&
              l !== void 0
              ? l
              : {},
            u.prototype
          )
        }
        o.registerMixins(u, e)
        return u
      }
      t.Mixin = Mixin
      const applyPropAndMethodDecorators = (e, t) => {
        const i = e.property
        const s = e.method
        if (i) for (let e in i) for (let s of i[e]) s(t, e)
        if (s)
          for (let e in s)
            for (let i of s[e]) i(t, e, Object.getOwnPropertyDescriptor(t, e))
      }
      const mix =
        (...e) =>
        (t) => {
          const i = Mixin(...e.concat([t]))
          Object.defineProperty(i, 'name', { value: t.name, writable: false })
          return i
        }
      t.mix = mix
    },
    9591: (e, t, i) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.softMixProtos = t.proxyMix = t.getIngredientWithProp = void 0
      const s = i(9192)
      const getIngredientWithProp = (e, t) => {
        const i = t.map((e) => s.protoChain(e))
        let n = 0
        let r = true
        while (r) {
          r = false
          for (let s = t.length - 1; s >= 0; s--) {
            const t = i[s][n]
            if (t !== undefined && t !== null) {
              r = true
              if (Object.getOwnPropertyDescriptor(t, e) != undefined) {
                return i[s][0]
              }
            }
          }
          n++
        }
        return undefined
      }
      t.getIngredientWithProp = getIngredientWithProp
      const proxyMix = (e, i = Object.prototype) =>
        new Proxy(
          {},
          {
            getPrototypeOf() {
              return i
            },
            setPrototypeOf() {
              throw Error('Cannot set prototype of Proxies created by ts-mixer')
            },
            getOwnPropertyDescriptor(i, s) {
              return Object.getOwnPropertyDescriptor(
                t.getIngredientWithProp(s, e) || {},
                s
              )
            },
            defineProperty() {
              throw new Error(
                'Cannot define new properties on Proxies created by ts-mixer'
              )
            },
            has(s, n) {
              return (
                t.getIngredientWithProp(n, e) !== undefined ||
                i[n] !== undefined
              )
            },
            get(s, n) {
              return (t.getIngredientWithProp(n, e) || i)[n]
            },
            set(i, s, n) {
              const r = t.getIngredientWithProp(s, e)
              if (r === undefined)
                throw new Error(
                  'Cannot set new properties on Proxies created by ts-mixer'
                )
              r[s] = n
              return true
            },
            deleteProperty() {
              throw new Error(
                'Cannot delete properties on Proxies created by ts-mixer'
              )
            },
            ownKeys() {
              return e
                .map(Object.getOwnPropertyNames)
                .reduce((e, t) => t.concat(e.filter((e) => t.indexOf(e) < 0)))
            },
          }
        )
      t.proxyMix = proxyMix
      const softMixProtos = (e, i) => t.proxyMix([...e, { constructor: i }])
      t.softMixProtos = softMixProtos
    },
    8541: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.settings = void 0
      t.settings = {
        initFunction: null,
        staticsStrategy: 'copy',
        prototypeStrategy: 'copy',
        decoratorInheritance: 'deep',
      }
    },
    9192: (e, t) => {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: true })
      t.flatten =
        t.unique =
        t.hardMixProtos =
        t.nearestCommonProto =
        t.protoChain =
        t.copyProps =
          void 0
      const copyProps = (e, t, i = []) => {
        const s = Object.getOwnPropertyDescriptors(t)
        for (let e of i) delete s[e]
        Object.defineProperties(e, s)
      }
      t.copyProps = copyProps
      const protoChain = (e, i = [e]) => {
        const s = Object.getPrototypeOf(e)
        if (s === null) return i
        return t.protoChain(s, [...i, s])
      }
      t.protoChain = protoChain
      const nearestCommonProto = (...e) => {
        if (e.length === 0) return undefined
        let i = undefined
        const s = e.map((e) => t.protoChain(e))
        while (s.every((e) => e.length > 0)) {
          const e = s.map((e) => e.pop())
          const t = e[0]
          if (e.every((e) => e === t)) i = t
          else break
        }
        return i
      }
      t.nearestCommonProto = nearestCommonProto
      const hardMixProtos = (e, i, s = []) => {
        var n
        const r =
          (n = t.nearestCommonProto(...e)) !== null && n !== void 0
            ? n
            : Object.prototype
        const a = Object.create(r)
        const o = t.protoChain(r)
        for (let i of e) {
          let e = t.protoChain(i)
          for (let i = e.length - 1; i >= 0; i--) {
            let n = e[i]
            if (o.indexOf(n) === -1) {
              t.copyProps(a, n, ['constructor', ...s])
              o.push(n)
            }
          }
        }
        a.constructor = i
        return a
      }
      t.hardMixProtos = hardMixProtos
      const unique = (e) => e.filter((t, i) => e.indexOf(t) == i)
      t.unique = unique
      const flatten = (e) =>
        e.length === 0
          ? []
          : e.length === 1
          ? e[0]
          : e.reduce((e, t) => [...e, ...t])
      t.flatten = flatten
    },
    9386: (e) => {
      var t
      var i
      var s
      var n
      var r
      var a
      var o
      var l
      var c
      var d
      var u
      var h
      var m
      var p
      var f
      var g
      var v
      var y
      var _
      var b
      var w
      var C
      var S
      var M
      var I
      ;(function (t) {
        var i =
          typeof global === 'object'
            ? global
            : typeof self === 'object'
            ? self
            : typeof this === 'object'
            ? this
            : {}
        if (typeof define === 'function' && define.amd) {
          define('tslib', ['exports'], function (e) {
            t(createExporter(i, createExporter(e)))
          })
        } else if (true && typeof e.exports === 'object') {
          t(createExporter(i, createExporter(e.exports)))
        } else {
          t(createExporter(i))
        }
        function createExporter(e, t) {
          if (e !== i) {
            if (typeof Object.create === 'function') {
              Object.defineProperty(e, '__esModule', { value: true })
            } else {
              e.__esModule = true
            }
          }
          return function (i, s) {
            return (e[i] = t ? t(i, s) : s)
          }
        }
      })(function (e) {
        var T =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (e, t) {
              e.__proto__ = t
            }) ||
          function (e, t) {
            for (var i in t)
              if (Object.prototype.hasOwnProperty.call(t, i)) e[i] = t[i]
          }
        t = function (e, t) {
          if (typeof t !== 'function' && t !== null)
            throw new TypeError(
              'Class extends value ' +
                String(t) +
                ' is not a constructor or null'
            )
          T(e, t)
          function __() {
            this.constructor = e
          }
          e.prototype =
            t === null
              ? Object.create(t)
              : ((__.prototype = t.prototype), new __())
        }
        i =
          Object.assign ||
          function (e) {
            for (var t, i = 1, s = arguments.length; i < s; i++) {
              t = arguments[i]
              for (var n in t)
                if (Object.prototype.hasOwnProperty.call(t, n)) e[n] = t[n]
            }
            return e
          }
        s = function (e, t) {
          var i = {}
          for (var s in e)
            if (Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0)
              i[s] = e[s]
          if (e != null && typeof Object.getOwnPropertySymbols === 'function')
            for (
              var n = 0, s = Object.getOwnPropertySymbols(e);
              n < s.length;
              n++
            ) {
              if (
                t.indexOf(s[n]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, s[n])
              )
                i[s[n]] = e[s[n]]
            }
          return i
        }
        n = function (e, t, i, s) {
          var n = arguments.length,
            r =
              n < 3
                ? t
                : s === null
                ? (s = Object.getOwnPropertyDescriptor(t, i))
                : s,
            a
          if (
            typeof Reflect === 'object' &&
            typeof Reflect.decorate === 'function'
          )
            r = Reflect.decorate(e, t, i, s)
          else
            for (var o = e.length - 1; o >= 0; o--)
              if ((a = e[o]))
                r = (n < 3 ? a(r) : n > 3 ? a(t, i, r) : a(t, i)) || r
          return n > 3 && r && Object.defineProperty(t, i, r), r
        }
        r = function (e, t) {
          return function (i, s) {
            t(i, s, e)
          }
        }
        a = function (e, t) {
          if (
            typeof Reflect === 'object' &&
            typeof Reflect.metadata === 'function'
          )
            return Reflect.metadata(e, t)
        }
        o = function (e, t, i, s) {
          function adopt(e) {
            return e instanceof i
              ? e
              : new i(function (t) {
                  t(e)
                })
          }
          return new (i || (i = Promise))(function (i, n) {
            function fulfilled(e) {
              try {
                step(s.next(e))
              } catch (e) {
                n(e)
              }
            }
            function rejected(e) {
              try {
                step(s['throw'](e))
              } catch (e) {
                n(e)
              }
            }
            function step(e) {
              e.done ? i(e.value) : adopt(e.value).then(fulfilled, rejected)
            }
            step((s = s.apply(e, t || [])).next())
          })
        }
        l = function (e, t) {
          var i = {
              label: 0,
              sent: function () {
                if (r[0] & 1) throw r[1]
                return r[1]
              },
              trys: [],
              ops: [],
            },
            s,
            n,
            r,
            a
          return (
            (a = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === 'function' &&
              (a[Symbol.iterator] = function () {
                return this
              }),
            a
          )
          function verb(e) {
            return function (t) {
              return step([e, t])
            }
          }
          function step(o) {
            if (s) throw new TypeError('Generator is already executing.')
            while ((a && ((a = 0), o[0] && (i = 0)), i))
              try {
                if (
                  ((s = 1),
                  n &&
                    (r =
                      o[0] & 2
                        ? n['return']
                        : o[0]
                        ? n['throw'] || ((r = n['return']) && r.call(n), 0)
                        : n.next) &&
                    !(r = r.call(n, o[1])).done)
                )
                  return r
                if (((n = 0), r)) o = [o[0] & 2, r.value]
                switch (o[0]) {
                  case 0:
                  case 1:
                    r = o
                    break
                  case 4:
                    i.label++
                    return { value: o[1], done: false }
                  case 5:
                    i.label++
                    n = o[1]
                    o = [0]
                    continue
                  case 7:
                    o = i.ops.pop()
                    i.trys.pop()
                    continue
                  default:
                    if (
                      !((r = i.trys), (r = r.length > 0 && r[r.length - 1])) &&
                      (o[0] === 6 || o[0] === 2)
                    ) {
                      i = 0
                      continue
                    }
                    if (o[0] === 3 && (!r || (o[1] > r[0] && o[1] < r[3]))) {
                      i.label = o[1]
                      break
                    }
                    if (o[0] === 6 && i.label < r[1]) {
                      i.label = r[1]
                      r = o
                      break
                    }
                    if (r && i.label < r[2]) {
                      i.label = r[2]
                      i.ops.push(o)
                      break
                    }
                    if (r[2]) i.ops.pop()
                    i.trys.pop()
                    continue
                }
                o = t.call(e, i)
              } catch (e) {
                o = [6, e]
                n = 0
              } finally {
                s = r = 0
              }
            if (o[0] & 5) throw o[1]
            return { value: o[0] ? o[1] : void 0, done: true }
          }
        }
        c = function (e, t) {
          for (var i in e)
            if (i !== 'default' && !Object.prototype.hasOwnProperty.call(t, i))
              I(t, e, i)
        }
        I = Object.create
          ? function (e, t, i, s) {
              if (s === undefined) s = i
              var n = Object.getOwnPropertyDescriptor(t, i)
              if (
                !n ||
                ('get' in n ? !t.__esModule : n.writable || n.configurable)
              ) {
                n = {
                  enumerable: true,
                  get: function () {
                    return t[i]
                  },
                }
              }
              Object.defineProperty(e, s, n)
            }
          : function (e, t, i, s) {
              if (s === undefined) s = i
              e[s] = t[i]
            }
        d = function (e) {
          var t = typeof Symbol === 'function' && Symbol.iterator,
            i = t && e[t],
            s = 0
          if (i) return i.call(e)
          if (e && typeof e.length === 'number')
            return {
              next: function () {
                if (e && s >= e.length) e = void 0
                return { value: e && e[s++], done: !e }
              },
            }
          throw new TypeError(
            t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
          )
        }
        u = function (e, t) {
          var i = typeof Symbol === 'function' && e[Symbol.iterator]
          if (!i) return e
          var s = i.call(e),
            n,
            r = [],
            a
          try {
            while ((t === void 0 || t-- > 0) && !(n = s.next()).done)
              r.push(n.value)
          } catch (e) {
            a = { error: e }
          } finally {
            try {
              if (n && !n.done && (i = s['return'])) i.call(s)
            } finally {
              if (a) throw a.error
            }
          }
          return r
        }
        h = function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e = e.concat(u(arguments[t]))
          return e
        }
        m = function () {
          for (var e = 0, t = 0, i = arguments.length; t < i; t++)
            e += arguments[t].length
          for (var s = Array(e), n = 0, t = 0; t < i; t++)
            for (var r = arguments[t], a = 0, o = r.length; a < o; a++, n++)
              s[n] = r[a]
          return s
        }
        p = function (e, t, i) {
          if (i || arguments.length === 2)
            for (var s = 0, n = t.length, r; s < n; s++) {
              if (r || !(s in t)) {
                if (!r) r = Array.prototype.slice.call(t, 0, s)
                r[s] = t[s]
              }
            }
          return e.concat(r || Array.prototype.slice.call(t))
        }
        f = function (e) {
          return this instanceof f ? ((this.v = e), this) : new f(e)
        }
        g = function (e, t, i) {
          if (!Symbol.asyncIterator)
            throw new TypeError('Symbol.asyncIterator is not defined.')
          var s = i.apply(e, t || []),
            n,
            r = []
          return (
            (n = {}),
            verb('next'),
            verb('throw'),
            verb('return'),
            (n[Symbol.asyncIterator] = function () {
              return this
            }),
            n
          )
          function verb(e) {
            if (s[e])
              n[e] = function (t) {
                return new Promise(function (i, s) {
                  r.push([e, t, i, s]) > 1 || resume(e, t)
                })
              }
          }
          function resume(e, t) {
            try {
              step(s[e](t))
            } catch (e) {
              settle(r[0][3], e)
            }
          }
          function step(e) {
            e.value instanceof f
              ? Promise.resolve(e.value.v).then(fulfill, reject)
              : settle(r[0][2], e)
          }
          function fulfill(e) {
            resume('next', e)
          }
          function reject(e) {
            resume('throw', e)
          }
          function settle(e, t) {
            if ((e(t), r.shift(), r.length)) resume(r[0][0], r[0][1])
          }
        }
        v = function (e) {
          var t, i
          return (
            (t = {}),
            verb('next'),
            verb('throw', function (e) {
              throw e
            }),
            verb('return'),
            (t[Symbol.iterator] = function () {
              return this
            }),
            t
          )
          function verb(s, n) {
            t[s] = e[s]
              ? function (t) {
                  return (i = !i)
                    ? { value: f(e[s](t)), done: s === 'return' }
                    : n
                    ? n(t)
                    : t
                }
              : n
          }
        }
        y = function (e) {
          if (!Symbol.asyncIterator)
            throw new TypeError('Symbol.asyncIterator is not defined.')
          var t = e[Symbol.asyncIterator],
            i
          return t
            ? t.call(e)
            : ((e = typeof d === 'function' ? d(e) : e[Symbol.iterator]()),
              (i = {}),
              verb('next'),
              verb('throw'),
              verb('return'),
              (i[Symbol.asyncIterator] = function () {
                return this
              }),
              i)
          function verb(t) {
            i[t] =
              e[t] &&
              function (i) {
                return new Promise(function (s, n) {
                  ;(i = e[t](i)), settle(s, n, i.done, i.value)
                })
              }
          }
          function settle(e, t, i, s) {
            Promise.resolve(s).then(function (t) {
              e({ value: t, done: i })
            }, t)
          }
        }
        _ = function (e, t) {
          if (Object.defineProperty) {
            Object.defineProperty(e, 'raw', { value: t })
          } else {
            e.raw = t
          }
          return e
        }
        var E = Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', {
                enumerable: true,
                value: t,
              })
            }
          : function (e, t) {
              e['default'] = t
            }
        b = function (e) {
          if (e && e.__esModule) return e
          var t = {}
          if (e != null)
            for (var i in e)
              if (i !== 'default' && Object.prototype.hasOwnProperty.call(e, i))
                I(t, e, i)
          E(t, e)
          return t
        }
        w = function (e) {
          return e && e.__esModule ? e : { default: e }
        }
        C = function (e, t, i, s) {
          if (i === 'a' && !s)
            throw new TypeError('Private accessor was defined without a getter')
          if (typeof t === 'function' ? e !== t || !s : !t.has(e))
            throw new TypeError(
              'Cannot read private member from an object whose class did not declare it'
            )
          return i === 'm' ? s : i === 'a' ? s.call(e) : s ? s.value : t.get(e)
        }
        S = function (e, t, i, s, n) {
          if (s === 'm') throw new TypeError('Private method is not writable')
          if (s === 'a' && !n)
            throw new TypeError('Private accessor was defined without a setter')
          if (typeof t === 'function' ? e !== t || !n : !t.has(e))
            throw new TypeError(
              'Cannot write private member to an object whose class did not declare it'
            )
          return s === 'a' ? n.call(e, i) : n ? (n.value = i) : t.set(e, i), i
        }
        M = function (e, t) {
          if (t === null || (typeof t !== 'object' && typeof t !== 'function'))
            throw new TypeError("Cannot use 'in' operator on non-object")
          return typeof e === 'function' ? t === e : e.has(t)
        }
        e('__extends', t)
        e('__assign', i)
        e('__rest', s)
        e('__decorate', n)
        e('__param', r)
        e('__metadata', a)
        e('__awaiter', o)
        e('__generator', l)
        e('__exportStar', c)
        e('__createBinding', I)
        e('__values', d)
        e('__read', u)
        e('__spread', h)
        e('__spreadArrays', m)
        e('__spreadArray', p)
        e('__await', f)
        e('__asyncGenerator', g)
        e('__asyncDelegator', v)
        e('__asyncValues', y)
        e('__makeTemplateObject', _)
        e('__importStar', b)
        e('__importDefault', w)
        e('__classPrivateFieldGet', C)
        e('__classPrivateFieldSet', S)
        e('__classPrivateFieldIn', M)
      })
    },
    3115: (module) => {
      module.exports = eval('require')('zlib-sync')
    },
    2593: (e) => {
      'use strict'
      e.exports = require('jujutsu/dist/compiled/@sapphire/shapeshift')
    },
    1798: (e) => {
      'use strict'
      e.exports = require('jujutsu/dist/compiled/undici')
    },
    172: (e) => {
      'use strict'
      e.exports = require('jujutsu/dist/compiled/ws')
    },
    4300: (e) => {
      'use strict'
      e.exports = require('buffer')
    },
    2361: (e) => {
      'use strict'
      e.exports = require('events')
    },
    3685: (e) => {
      'use strict'
      e.exports = require('http')
    },
    2254: (e) => {
      'use strict'
      e.exports = require('node:buffer')
    },
    7718: (e) => {
      'use strict'
      e.exports = require('node:child_process')
    },
    5673: (e) => {
      'use strict'
      e.exports = require('node:events')
    },
    7561: (e) => {
      'use strict'
      e.exports = require('node:fs')
    },
    3977: (e) => {
      'use strict'
      e.exports = require('node:fs/promises')
    },
    9411: (e) => {
      'use strict'
      e.exports = require('node:path')
    },
    7742: (e) => {
      'use strict'
      e.exports = require('node:process')
    },
    4492: (e) => {
      'use strict'
      e.exports = require('node:stream')
    },
    2332: (e) => {
      'use strict'
      e.exports = require('node:timers')
    },
    9397: (e) => {
      'use strict'
      e.exports = require('node:timers/promises')
    },
    7261: (e) => {
      'use strict'
      e.exports = require('node:util')
    },
    3621: (e) => {
      'use strict'
      e.exports = require('node:worker_threads')
    },
    7282: (e) => {
      'use strict'
      e.exports = require('process')
    },
    9512: (e) => {
      'use strict'
      e.exports = require('timers')
    },
    8670: (e) => {
      'use strict'
      e.exports = require('timers/promises')
    },
    7310: (e) => {
      'use strict'
      e.exports = require('url')
    },
    3837: (e) => {
      'use strict'
      e.exports = require('util')
    },
    6939: (e) => {
      'use strict'
      e.exports = { version: '14.7.1' }
    },
  }
  var __webpack_module_cache__ = {}
  function __nccwpck_require__(e) {
    var t = __webpack_module_cache__[e]
    if (t !== undefined) {
      return t.exports
    }
    var i = (__webpack_module_cache__[e] = { exports: {} })
    var s = true
    try {
      __webpack_modules__[e].call(i.exports, i, i.exports, __nccwpck_require__)
      s = false
    } finally {
      if (s) delete __webpack_module_cache__[e]
    }
    return i.exports
  }
  __nccwpck_require__.m = __webpack_modules__
  ;(() => {
    var e = Object.getPrototypeOf
      ? (e) => Object.getPrototypeOf(e)
      : (e) => e.__proto__
    var t
    __nccwpck_require__.t = function (i, s) {
      if (s & 1) i = this(i)
      if (s & 8) return i
      if (typeof i === 'object' && i) {
        if (s & 4 && i.__esModule) return i
        if (s & 16 && typeof i.then === 'function') return i
      }
      var n = Object.create(null)
      __nccwpck_require__.r(n)
      var r = {}
      t = t || [null, e({}), e([]), e(e)]
      for (
        var a = s & 2 && i;
        typeof a == 'object' && !~t.indexOf(a);
        a = e(a)
      ) {
        Object.getOwnPropertyNames(a).forEach((e) => (r[e] = () => i[e]))
      }
      r['default'] = () => i
      __nccwpck_require__.d(n, r)
      return n
    }
  })()
  ;(() => {
    __nccwpck_require__.d = (e, t) => {
      for (var i in t) {
        if (__nccwpck_require__.o(t, i) && !__nccwpck_require__.o(e, i)) {
          Object.defineProperty(e, i, { enumerable: true, get: t[i] })
        }
      }
    }
  })()
  ;(() => {
    __nccwpck_require__.f = {}
    __nccwpck_require__.e = (e) =>
      Promise.all(
        Object.keys(__nccwpck_require__.f).reduce((t, i) => {
          __nccwpck_require__.f[i](e, t)
          return t
        }, [])
      )
  })()
  ;(() => {
    __nccwpck_require__.u = (e) => '' + e + '.index.js'
  })()
  ;(() => {
    __nccwpck_require__.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)
  })()
  ;(() => {
    __nccwpck_require__.r = (e) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' })
      }
      Object.defineProperty(e, '__esModule', { value: true })
    }
  })()
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  ;(() => {
    var e = { 179: 1 }
    var installChunk = (t) => {
      var i = t.modules,
        s = t.ids,
        n = t.runtime
      for (var r in i) {
        if (__nccwpck_require__.o(i, r)) {
          __nccwpck_require__.m[r] = i[r]
        }
      }
      if (n) n(__nccwpck_require__)
      for (var a = 0; a < s.length; a++) e[s[a]] = 1
    }
    __nccwpck_require__.f.require = (t, i) => {
      if (!e[t]) {
        if (true) {
          installChunk(require('./' + __nccwpck_require__.u(t)))
        } else e[t] = 1
      }
    }
  })()
  var __webpack_exports__ = __nccwpck_require__(4805)
  module.exports = __webpack_exports__
})()