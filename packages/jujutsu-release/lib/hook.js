/*
MIT License

Copyright (c) 2016 Vercel, Inc.

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

// Native
const { existsSync } = require('fs')
const { resolve } = require('path')

// Utilities
const handleSpinner = require('../lib/spinner')

module.exports = async (flag, markdown, changes) => {
  let file = resolve(process.cwd(), 'release.js')

  if (!flag && !existsSync(file)) {
    return markdown
  }

  if (flag) {
    file = resolve(process.cwd(), flag)

    if (!existsSync(file)) {
      handleSpinner.fail(`The specified ${'--hook'} file doesn't exist`)
    }
  }

  let hook

  try {
    hook = require(file)
  } catch (err) {
    handleSpinner.fail(err)
  }

  if (typeof hook !== 'function') {
    handleSpinner.fail(`The release hook file doesn't export a function`)
  }

  if (global.spinner) {
    global.spinner.succeed('Found a hook file')
  }

  let filtered

  try {
    filtered = await hook(markdown, changes)
  } catch (err) {
    handleSpinner.fail(err)
  }

  return filtered
}
