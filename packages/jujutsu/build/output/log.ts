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
import chalk from '../../lib/chalk'
// eslint-disable-next-line import/no-extraneous-dependencies
import gs from 'jujutsu/dist/compiled/gradient-string'

export const prefixes = {
  jujutsu: process.stdout.isTTY
    ? gs('red', 'blue')('JUJUTSU >>>')
    : 'JUJUTSU >>>',
  error: chalk.red('error') + ' -',
  warn: chalk.yellow('warn') + ' -',
  event: chalk.magenta('event') + ' -',
  wait: chalk.cyan('wait') + ' -',
  info: chalk.cyan('info') + ' -',
  ready: chalk.green('ready') + ' -',
  trace: chalk.magenta('trace') + ' -',
}

export function wait(...message: any[]) {
  console.log(prefixes.wait, ...message)
}

export function error(...message: any[]) {
  console.error(prefixes.error, ...message)
}

export function warn(...message: any[]) {
  console.warn(prefixes.warn, ...message)
}

export function ready(...message: any[]) {
  console.log(prefixes.ready, ...message)
}

export function info(...message: any[]) {
  console.log(prefixes.info, ...message)
}

export function event(...message: any[]) {
  console.log(prefixes.event, ...message)
}

export function trace(...message: any[]) {
  console.log(prefixes.trace, ...message)
}

export function jujutsu(...message: any[]) {
  console.log(prefixes.jujutsu, ...message)
}
