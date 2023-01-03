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
import { randomBytes } from 'crypto'
import { traceGlobals } from '../shared'
import fs from 'fs'
import path from 'path'
import { PHASE_DEVELOPMENT_SERVER } from '../../lib/constants'

type Event = {
  traceId: string
  parentId?: number
  name: string
  id: number
  timestamp: number
  duration: number
  tags?: Object
  startTime?: number
}

// Batch events as zipkin allows for multiple events to be sent in one go
export function batcher(reportEvents: (evts: Event[]) => Promise<void>) {
  const events: Event[] = []
  // Promise queue to ensure events are always sent on flushAll
  const queue = new Set()
  return {
    flushAll: async () => {
      await Promise.all(queue)
      if (events.length > 0) {
        await reportEvents(events)
        events.length = 0
      }
    },
    report: (event: Event) => {
      events.push(event)

      if (events.length > 100) {
        const evts = events.slice()
        events.length = 0
        const report = reportEvents(evts)
        queue.add(report)
        report.then(() => queue.delete(report))
      }
    },
  }
}

let writeStream: RotatingWriteStream
let traceId: string
let batch: ReturnType<typeof batcher> | undefined

const writeStreamOptions = {
  flags: 'a',
  encoding: 'utf8' as const,
}
class RotatingWriteStream {
  file: string
  writeStream!: fs.WriteStream
  size: number
  sizeLimit: number
  private rotatePromise: Promise<void> | undefined
  private drainPromise: Promise<void> | undefined
  constructor(file: string, sizeLimit: number) {
    this.file = file
    this.size = 0
    this.sizeLimit = sizeLimit
    this.createWriteStream()
  }
  private createWriteStream() {
    this.writeStream = fs.createWriteStream(this.file, writeStreamOptions)
  }
  // Recreate the file
  private async rotate() {
    await this.end()
    try {
      fs.unlinkSync(this.file)
    } catch (err: any) {
      // It's fine if the file does not exist yet
      if (err.code !== 'ENOENT') {
        throw err
      }
    }
    this.size = 0
    this.createWriteStream()
    this.rotatePromise = undefined
  }
  async write(data: string): Promise<void> {
    if (this.rotatePromise) await this.rotatePromise

    this.size += data.length
    if (this.size > this.sizeLimit) {
      await (this.rotatePromise = this.rotate())
    }

    if (!this.writeStream.write(data, 'utf8')) {
      if (this.drainPromise === undefined) {
        this.drainPromise = new Promise<void>((resolve, _reject) => {
          this.writeStream.once('drain', () => {
            this.drainPromise = undefined
            resolve()
          })
        })
      }
      await this.drainPromise
    }
  }

  end(): Promise<void> {
    return new Promise((resolve) => {
      this.writeStream.end(resolve)
    })
  }
}

const reportToLocalHost = (
  name: string,
  duration: number,
  timestamp: number,
  id: number,
  parentId?: number,
  attrs?: Object,
  startTime?: number
) => {
  const distDir = traceGlobals.get('distDir')
  const phase = traceGlobals.get('phase')
  if (!distDir || !phase) {
    return
  }

  if (!traceId) {
    traceId = process.env.TRACE_ID || randomBytes(8).toString('hex')
  }

  if (!batch) {
    batch = batcher(async (events) => {
      if (!writeStream) {
        await fs.promises.mkdir(distDir, { recursive: true })
        const file = path.join(distDir, 'trace')
        writeStream = new RotatingWriteStream(
          file,
          // Development is limited to 50MB, production is unlimited
          phase === PHASE_DEVELOPMENT_SERVER ? 52428800 : Infinity
        )
      }
      const eventsJson = JSON.stringify(events)
      try {
        await writeStream.write(eventsJson + '\n')
      } catch (err) {
        console.log(err)
      }
    })
  }

  batch.report({
    traceId,
    parentId,
    name,
    id,
    timestamp,
    duration,
    tags: attrs,
    startTime,
  })
}

export default {
  flushAll: () =>
    batch
      ? batch.flushAll().then(() => {
          const phase = traceGlobals.get('phase')
          // Only end writeStream when manually flushing in production
          if (phase !== PHASE_DEVELOPMENT_SERVER) {
            writeStream.end()
          }
        })
      : undefined,
  report: reportToLocalHost,
}
