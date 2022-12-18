/*
The MIT License (MIT)

Copyright (c) 2022 Vercel, Inc.

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
// eslint-disable-next-line import/no-extraneous-dependencies
import ora, { Options, Ora } from 'ora'

const dotsSpinner = {
  frames: ['.', '..', '...'],
  interval: 200,
}

export default function createSpinner(
  text: string | { prefixText: string },
  options: Options = {},
  logFn: (...data: any[]) => void = console.log
) {
  let spinner: undefined | Ora
  let prefixText = text && typeof text === 'object' && text.prefixText

  if (process.stdout.isTTY) {
    spinner = ora({
      text: typeof text === 'string' ? text : undefined,
      prefixText: typeof prefixText === 'string' ? prefixText : undefined,
      spinner: dotsSpinner,
      stream: process.stdout,
      ...options,
    }).start()

    // Add capturing of console.log/warn/error to allow pausing
    // the spinner before logging and then restarting spinner after
    const origLog = console.log
    const origWarn = console.warn
    const origError = console.error
    const origStop = spinner.stop.bind(spinner)
    const origStopAndPersist = spinner.stopAndPersist.bind(spinner)

    const logHandle = (method: any, args: any[]) => {
      origStop()
      method(...args)
      spinner!.start()
    }

    console.log = (...args: any) => logHandle(origLog, args)
    console.warn = (...args: any) => logHandle(origWarn, args)
    console.error = (...args: any) => logHandle(origError, args)

    const resetLog = () => {
      console.log = origLog
      console.warn = origWarn
      console.error = origError
    }
    spinner.stop = (): Ora => {
      origStop()
      resetLog()
      return spinner!
    }
    spinner.stopAndPersist = (): Ora => {
      origStopAndPersist()
      resetLog()
      return spinner!
    }
  } else if (prefixText || text) {
    logFn(prefixText ? prefixText + '...' : text)
  }

  return spinner
}
