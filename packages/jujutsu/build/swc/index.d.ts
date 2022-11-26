import { Config } from '@swc/core'

export function transform(src: string, options?: Config): Promise<any>
export function transformSync(src: string, options?: Config): any
export function minify(src: string, options: Config): Promise<string>
export function minifySync(src: string, options: Config): string
export function parse(src: string, options: Config): any
export const lockfilePatchPromise: { cur?: Promise<void> }
export function initCustomTraceSubscriber(traceFileName?: string): void
export function teardownTraceSubscriber(): void
export function teardownCrashReporter(): void
export function loadBindings(): Promise<void>
