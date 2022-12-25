/*
Modified version of `tagged-versions` from NPM,

MIT License

Copyright (c) 2016 Iheb KHEMISSI

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

const semver = require('semver')

const tagRegex = /tag:\s*([^,)]+)/g
const commitDetailsRegex = /^(.+);(.+);(.+)$/

/**
 * Run shell command and resolve with stdout content
 *
 * @param  {string} command Shell command
 * @return {Promise<string,Error>}
 */
function runCommand(command) {
  return require('child_process').execSync(command).toString()
}

/**
 * Get all tags with a semantic version name out of a list of Refs
 *
 * @param  {string} refs List of refs
 * @return {Arrays<Commit>}
 */
function getSemanticCommits(refs) {
  const tagNames = []
  let match = []

  // Finding successive matches
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Finding_successive_matches
  while (match) {
    match = tagRegex.exec(refs)

    if (match) {
      tagNames.push(match[1])
    }
  }

  return tagNames
    .map((name) => ({
      tag: name,
      version: semver.valid(name),
      hash: null,
      date: null,
    }))
    .filter((tag) => tag.version != null)
}

function isString(v) {
  return typeof v === 'string'
}

/**
 * Parse commit into an array of tag object.
 *
 * @param  {string} line Line to parse
 * @return {Array<Commit>}
 */
function parseLine(line) {
  const match = commitDetailsRegex.exec(line)

  if (!match || match.length < 4) {
    return []
  }

  const tags = getSemanticCommits(match[1])
  const hash = match[2].trim()
  const date = new Date(match[3].trim())

  return tags.map((tag) => Object.assign(tag, { hash, date }))
}

/**
 * Merge the arrays of elements into one array.
 *
 * @param  {Array<Array<any>>} arrays The list of array to merge
 * @return {Array<any>}
 */
function flatten(tags) {
  return Array.prototype.concat.apply([], tags)
}

/**
 * Filter tags with range.
 *
 * Skip filtering if the range is not set.
 *
 * @param  {Array<Commit>} tags  List of tags
 * @param  {string}     range Semantic range to filter with.
 * @return {Array<Commit>}
 */
function filterByRange(tags, range) {
  if (!range) {
    return tags
  }

  return tags.filter((tag) => semver.satisfies(tag.version, range))
}

/**
 * Compare tag by version.
 *
 * @param  {Commit} a First tag
 * @param  {Commit} b Second tag
 * @return {number}
 */
function compareCommit(a, b) {
  return semver.rcompare(a.version, b.version)
}

/**
 * Get list of tag with a  semantic version name.
 *
 * @param  {object|string} options       Options map or range string
 * @param  {string}        options.range Semantic range to filter tag with
 * @param  {string}        options.rev   Revision range to filter tag with
 * @return {Promise<Array<Commit>,Error>}
 */
function getList(options) {
  const range = isString(options) ? options : options && options.range
  const rev = options && options.rev
  const fmt = '--pretty="%d;%H;%ci" --decorate=short'
  const cmd = rev
    ? `git log --simplify-by-decoration ${fmt} -- ${rev}`
    : `git log --no-walk --tags ${fmt}`

  const output = runCommand(cmd)
  const lines = output.split('\n')
  const tags = flatten(lines.map(parseLine))

  return filterByRange(tags, range).sort(compareCommit)
}

/**
 * Get most recent tag.
 *
 * @param  {object|string} options       Options map or range string
 * @param  {string}        options.range Semantic range to filter tag with
 * @param  {string}        options.rev   Revision range to filter tag with
 * @return {Promise<Commit,Error>}
 */
function getLastVersion(options) {
  const list = getList(options)
  return list[0]
}

module.exports = {
  getList,
  getLastVersion,
}
