declare module '@berserk/discord-js/dist/compiled/ws' {
  import m from 'ws'
  export = m
}

declare module '@berserk/discord-js/dist/compiled/erlpack' {
  import m from 'erlpack'
  export = m
}

declare module '@berserk/discord-js/dist/compiled/chalk' {
  import m from 'chalk'
  export = m
}

declare module '@berserk/discord-js/dist/compiled/zod' {
  import m from 'zod'
  export = m
}

declare module '@berserk/discord-js/dist/compiled/lodash' {
  import m from 'lodash'
  export = m
}

declare module '@berserk/discord-js/dist/compiled/title' {
  declare function title(string: string, options?: title.Options): string

  declare namespace title {
    interface Options {
      /**
       * @default undefined
       */
      special?: string[] | undefined
    }
  }

  export = title
}
