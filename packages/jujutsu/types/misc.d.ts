/* eslint-disable import/no-extraneous-dependencies */
declare module 'jujutsu/dist/compiled/node-fetch' {
  import m from 'node-fetch'
  export default m
  export * from 'node-fetch'
}

declare module 'jujutsu/dist/compiled/undici' {}

declare module 'jujutsu/dist/compiled/title' {
  import m from 'title'
  export = m
}

declare module 'jujutsu/dist/compiled/nanoid' {
  import m from 'nanoid'
  export = m
}

declare module 'jujutsu/dist/compiled/gradient-string' {
  import m from 'gradient-string'
  export = m
}

declare module 'jujutsu/dist/compiled/chalk' {
  import m from 'chalk'
  export = m
}

declare module 'jujutsu/dist/compiled/uid-promise' {
  import m from 'uid-promise'
  export = m
}

declare module 'jujutsu/dist/compiled/p-limit' {
  import m from 'p-limit'
  export = m
}

declare module 'jujutsu/dist/compiled/raw-body' {
  import m from 'raw-body'
  export = m
}

declare module 'jujutsu/dist/compiled/async-retry'
declare module 'jujutsu/dist/compiled/async-sema' {
  import m from 'async-sema'
  export = m
}

declare module 'jujutsu/dist/compiled/arg/index.js' {
  function arg<T extends arg.Spec>(
    spec: T,
    options?: { argv?: string[]; permissive?: boolean }
  ): arg.Result<T>

  namespace arg {
    export type Handler = (value: string) => any

    export interface Spec {
      [key: string]: string | Handler | [Handler]
    }

    export type Result<T extends Spec> = { _: string[] } & {
      [K in keyof T]: T[K] extends string
        ? never
        : T[K] extends Handler
        ? ReturnType<T[K]>
        : T[K] extends [Handler]
        ? Array<ReturnType<T[K][0]>>
        : never
    }
  }

  export = arg
}

declare module 'jujutsu/dist/compiled/jest-worker' {
  export * from 'jest-worker'
}

declare module 'jujutsu/dist/compiled/lodash' {
  import m from 'lodash'
  export = m
}

declare module 'jujutsu/dist/compiled/ci-info' {
  import m from 'ci-info'
  export = m
}
declare module 'jujutsu/dist/compiled/cli-select' {
  import m from 'cli-select'
  export = m
}
declare module 'jujutsu/dist/compiled/compression' {
  import m from 'compression'
  export = m
}
declare module 'jujutsu/dist/compiled/conf' {
  import m from 'conf'
  export = m
}
declare module 'jujutsu/dist/compiled/content-disposition' {
  import m from 'content-disposition'
  export = m
}
declare module 'jujutsu/dist/compiled/content-type' {
  import m from 'content-type'
  export = m
}
declare module 'jujutsu/dist/compiled/cookie' {
  import m from 'cookie'
  export = m
}
declare module 'jujutsu/dist/compiled/cross-spawn' {
  import m from 'cross-spawn'
  export = m
}
declare module 'jujutsu/dist/compiled/debug' {
  import m from 'debug'
  export = m
}
declare module 'jujutsu/dist/compiled/devalue' {
  import m from 'devalue'
  export = m
}
declare module 'jujutsu/dist/compiled/find-up' {
  import m from 'find-up'
  export = m
}
declare module 'jujutsu/dist/compiled/fresh' {
  import m from 'fresh'
  export = m
}
declare module 'jujutsu/dist/compiled/glob' {
  import m from 'glob'
  export = m
}
declare module 'jujutsu/dist/compiled/gzip-size' {
  import m from 'gzip-size'
  export = m
}
declare module 'jujutsu/dist/compiled/is-wsl' {
  import m from 'is-wsl'
  export = m
}
declare module 'jujutsu/dist/compiled/json5' {
  import m from 'json5'
  export = m
}
declare module 'jujutsu/dist/compiled/jsonwebtoken' {
  import m from 'jsonwebtoken'
  export = m
}
declare module 'jujutsu/dist/compiled/lodash.curry' {
  import m from 'lodash.curry'
  export = m
}
declare module 'jujutsu/dist/compiled/lru-cache' {
  import m from 'lru-cache'
  export = m
}
declare module 'jujutsu/dist/compiled/micromatch' {
  import m from 'micromatch'
  export = m
}
declare module 'jujutsu/dist/compiled/nanoid/index.cjs' {
  import m from 'nanoid'
  export = m
}
declare module 'jujutsu/dist/compiled/ora' {
  import m from 'ora'
  export = m
}
declare module 'jujutsu/dist/compiled/send' {
  import m from 'send'
  export = m
}
declare module 'jujutsu/dist/compiled/source-map' {
  import m from 'source-map'
  export = m
}
declare module 'jujutsu/dist/compiled/string-hash' {
  import m from 'string-hash'
  export = m
}
declare module 'jujutsu/dist/compiled/ua-parser-js' {
  import m from 'ua-parser-js'
  export = m
}
declare module 'jujutsu/dist/compiled/strip-ansi' {
  import m from 'strip-ansi'
  export = m
}
declare module 'jujutsu/dist/compiled/@vercel/nft' {
  import m from '@vercel/nft'
  export = m
}

declare module 'jujutsu/dist/compiled/tar' {
  import m from 'tar'
  export = m
}

declare module 'jujutsu/dist/compiled/terser' {
  import m from 'terser'
  export = m
}
declare module 'jujutsu/dist/compiled/semver' {
  import m from 'semver'
  export = m
}
declare module 'jujutsu/dist/compiled/postcss-scss' {
  import m from 'postcss-scss'
  export = m
}

declare module 'jujutsu/dist/compiled/text-table' {
  function textTable(
    rows: Array<Array<{}>>,
    opts?: {
      hsep?: string
      align?: Array<'l' | 'r' | 'c' | '.'>
      stringLength?(str: string): number
    }
  ): string

  export = textTable
}
declare module 'jujutsu/dist/compiled/unistore' {
  import m from 'unistore'
  export = m
}
declare module 'jujutsu/dist/compiled/web-vitals' {
  import m from 'web-vitals'
  export = m
}
declare module 'jujutsu/dist/compiled/web-vitals-attribution' {}

declare module 'jujutsu/dist/compiled/ws' {
  import m from 'ws'
  export = m
}

declare module 'jujutsu/dist/compiled/comment-json' {
  import m from 'comment-json'
  export = m
}

declare module 'jujutsu/dist/compiled/process' {
  import m from 'process'
  export = m
}

declare module 'jujutsu/dist/compiled/edge-runtime' {
  import m from 'edge-runtime'
  export = m
}

declare module 'jujutsu/dist/compiled/@edge-runtime/primitives' {
  import * as m from '@edge-runtime/primitives'
  export = m
}

declare module 'jujutsu/dist/compiled/@segment/ajv-human-errors' {
  import * as m from '@segment/ajv-human-errors'
  export = m
}

declare module 'jujutsu/dist/compiled/react' {
  import * as m from 'react'
  export = m
}
declare module 'jujutsu/dist/compiled/react-dom' {
  import * as m from 'react-dom'
  export = m
}

declare module 'jujutsu/dist/compiled/stacktrace-parser' {
  import * as m from 'stacktrace-parser'
  export = m
}

declare module 'jujutsu/dist/compiled/anser' {
  import * as m from 'anser'
  export = m
}

declare module 'jujutsu/dist/compiled/platform' {
  import * as m from 'platform'
  export = m
}

declare module 'jujutsu/dist/compiled/css.escape' {
  export = CSS.escape
}

declare module 'jujutsu/dist/compiled/data-uri-to-buffer' {
  import * as m from 'data-uri-to-buffer'
  export = m
}

declare module 'jujutsu/dist/compiled/shell-quote' {
  import * as m from 'shell-quote'
  export = m
}

declare module 'jujutsu/dist/compiled/discord.js' {
  import m from 'discord.js'
  export = m
}

declare module 'jujutsu/dist/compiled/@sapphire/shapeshift' {
  import m from '@sapphire/shapeshift'
  export = m
}

declare namespace NodeJS {
  interface ProcessVersions {
    pnp?: string
  }
  interface Process {
    crossOrigin?: string
  }
}

declare module 'jujutsu/dist/compiled/watchpack' {
  import { EventEmitter } from 'events'

  class Watchpack extends EventEmitter {
    constructor(options?: any)
    watch(params: {
      files?: string[]
      directories?: string[]
      startTime?: number
      missing?: string[]
    }): void
    watch(files: string[], directories: string[], startTime?: number): void
    close(): void

    getTimeInfoEntries(): Map<
      string,
      { safeTime: number; timestamp: number; accuracy?: number }
    >
  }

  export default Watchpack
}

declare module 'jujutsu/dist/compiled/is-animated' {
  export default function isAnimated(buffer: Buffer): boolean
}
