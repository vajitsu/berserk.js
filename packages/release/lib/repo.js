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
const git = require('git-state')
const repoName = require('git-repo-name')
const repoUser = require('git-username')

// Utilities
const handleSpinner = require('./spinner')

exports.getRepo = (githubConnection) =>
  new Promise((resolve) => {
    repoName((err, repo) => {
      if (err) {
        handleSpinner.fail('Could not determine GitHub repository.')
        return
      }

      const details = { repo }

      githubConnection.repos.get(
        { owner: repoUser(), repo: details.repo },
        (error, detailedRepo) => {
          if (error) {
            handleSpinner.fail('Could not determine GitHub repository.')
            return
          }

          details.user = detailedRepo.data.owner.login
          resolve(details)
        }
      )
    })
  })

exports.branchSynced = () =>
  new Promise((resolve) => {
    const path = process.cwd()

    const ignore = ['branch', 'stashes', 'untracked']

    git.isGit(path, (exists) => {
      if (!exists) {
        return
      }

      git.check(path, (err, results) => {
        if (err) {
          resolve(false)
          return
        }

        for (const state of ignore) {
          delete results[state]
        }

        for (const result in results) {
          if (results[result] > 0) {
            resolve(false)
            break
          }
        }

        resolve(true)
      })
    })
  })
