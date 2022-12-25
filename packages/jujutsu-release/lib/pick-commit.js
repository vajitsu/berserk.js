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
const capitalize = require('capitalize')
const escapeGoat = require('escape-goat')

// Utilities
const connect = require('./connect')
const repo = require('./repo')
const definitions = require('./definitions')

const getPullRequest = async (number, showURL) => {
  const github = await connect(showURL)
  const repoDetails = await repo.getRepo(github)

  const response = await github.pullRequests.get({
    owner: repoDetails.user,
    repo: repoDetails.repo,
    number,
  })

  return response.data
}

const forPullRequest = async (number, showURL) => {
  let data

  try {
    data = await getPullRequest(number, showURL)
  } catch (err) {
    return
  }

  if (data.user) {
    return [data.user.login]
  }

  return false
}

const cleanCommitTitle = (title, changeTypes, doEscapeHTML) => {
  const toReplace = {
    type: definitions.type(title, changeTypes),
    ref: definitions.reference(title),
  }

  for (const definition in toReplace) {
    if (!{}.hasOwnProperty.call(toReplace, definition)) {
      continue
    }

    const state = toReplace[definition]

    if (state) {
      title = title.replace(`(${state})`, '')
    }
  }

  if (doEscapeHTML) {
    title = escapeGoat.escape(title)
  }

  return {
    content: capitalize(title).trim(),
    ref: toReplace.ref,
  }
}

module.exports = async (
  { hash, message },
  all,
  changeTypes,
  doEscapeHTML,
  showURL
) => {
  const title = cleanCommitTitle(message, changeTypes, doEscapeHTML)
  let credits = []

  if (title.ref) {
    hash = title.ref

    const rawHash = hash.split('#')[1]

    // Retrieve users that have collaborated on a change
    const collaborators = await forPullRequest(rawHash, showURL)

    if (collaborators) {
      credits = credits.concat(collaborators)
    }
  }

  return {
    text: `- ${title.content}: ${hash}\n`,
    credits,
  }
}
