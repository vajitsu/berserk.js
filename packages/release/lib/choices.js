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

// Packages
const inquirer = require('inquirer')
const semVer = require('semver')

module.exports = (changeTypes, tags) => {
  const list = []
  let notNeeded

  // We just detected the first release
  if (tags.length < 2) {
    return null
  }

  const releaseType = semVer.diff(tags[1].version, tags[0].version)

  switch (releaseType) {
    case 'minor':
      notNeeded = 1
      break
    case 'patch':
      notNeeded = 2
      break
    default:
      notNeeded = 0
  }

  if (notNeeded) {
    changeTypes.splice(0, notNeeded)
  }

  for (const type of changeTypes) {
    const short = type.handle

    list.push({
      name: `${type.name} (${type.description})`,
      value: short,
      short: `(${short})`,
    })
  }

  return list.concat([
    new inquirer.Separator(),
    {
      name: 'Ignore',
      short: '(ignored)',
      value: 'ignore',
    },
  ])
}
