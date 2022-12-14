/*
The MIT License (MIT)

Copyright (c) 2023 Vercel, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import { SpanId } from './shared'
import { reporter } from './report'

const NUM_OF_MICROSEC_IN_NANOSEC = BigInt('1000')
let count = 0
const getId = () => {
  count++
  return count
}

// eslint typescript has a bug with TS enums
/* eslint-disable no-shadow */
export enum SpanStatus {
  Started,
  Stopped,
}

export class Span {
  name: string
  id: SpanId
  parentId?: SpanId
  duration: number | null
  attrs: { [key: string]: any }
  status: SpanStatus
  now: number

  _start: bigint

  constructor({
    name,
    parentId,
    attrs,
    startTime,
  }: {
    name: string
    parentId?: SpanId
    startTime?: bigint
    attrs?: Object
  }) {
    this.name = name
    this.parentId = parentId
    this.duration = null
    this.attrs = attrs ? { ...attrs } : {}
    this.status = SpanStatus.Started
    this.id = getId()
    this._start = startTime || process.hrtime.bigint()
    // hrtime cannot be used to reconstruct tracing span's actual start time
    // since it does not have relation to clock time:
    // `These times are relative to an arbitrary time in the past, and not related to the time of day and therefore not subject to clock drift`
    // https://nodejs.org/api/process.html#processhrtimetime
    // Capturing current datetime as additional metadata for external reconstruction.
    this.now = Date.now()
  }

  // Durations are reported as microseconds. This gives 1000x the precision
  // of something like Date.now(), which reports in milliseconds.
  // Additionally, ~285 years can be safely represented as microseconds as
  // a float64 in both JSON and JavaScript.
  stop(stopTime?: bigint) {
    const end: bigint = stopTime || process.hrtime.bigint()
    const duration = (end - this._start) / NUM_OF_MICROSEC_IN_NANOSEC
    this.status = SpanStatus.Stopped
    if (duration > Number.MAX_SAFE_INTEGER) {
      throw new Error(`Duration is too long to express as float64: ${duration}`)
    }
    const timestamp = this._start / NUM_OF_MICROSEC_IN_NANOSEC
    reporter.report(
      this.name,
      Number(duration),
      Number(timestamp),
      this.id,
      this.parentId,
      this.attrs,
      this.now
    )
  }

  traceChild(name: string, attrs?: Object) {
    return new Span({ name, parentId: this.id, attrs })
  }

  manualTraceChild(
    name: string,
    startTime: bigint,
    stopTime: bigint,
    attrs?: Object
  ) {
    const span = new Span({ name, parentId: this.id, attrs, startTime })
    span.stop(stopTime)
  }

  setAttribute(key: string, value: any) {
    this.attrs[key] = String(value)
  }

  traceFn<T>(fn: () => T): T {
    try {
      return fn()
    } finally {
      this.stop()
    }
  }

  async traceAsyncFn<T>(fn: () => T | Promise<T>): Promise<T> {
    try {
      return await fn()
    } finally {
      this.stop()
    }
  }
}

export const trace = (
  name: string,
  parentId?: SpanId,
  attrs?: { [key: string]: string }
) => {
  return new Span({ name, parentId, attrs })
}

export const flushAllTraces = () => reporter.flushAll()
