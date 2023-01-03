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
import { SpanId } from '../shared'
import reportToJson from './to-json'

type Reporter = {
  flushAll: () => Promise<void> | void
  report: (
    spanName: string,
    duration: number,
    timestamp: number,
    id: SpanId,
    parentId?: SpanId,
    attrs?: Object,
    startTime?: number
  ) => void
}

class MultiReporter implements Reporter {
  private reporters: Reporter[] = []

  constructor(reporters: Reporter[]) {
    this.reporters = reporters
  }

  async flushAll() {
    await Promise.all(this.reporters.map((reporter) => reporter.flushAll()))
  }

  report(
    spanName: string,
    duration: number,
    timestamp: number,
    id: SpanId,
    parentId?: SpanId,
    attrs?: Object,
    startTime?: number
  ) {
    this.reporters.forEach((reporter) =>
      reporter.report(
        spanName,
        duration,
        timestamp,
        id,
        parentId,
        attrs,
        startTime
      )
    )
  }
}

// JSON is always reported to allow for diagnostics
export const reporter = new MultiReporter([reportToJson])
