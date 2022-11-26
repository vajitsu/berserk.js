import chalk from 'chalk'
import gs from 'gradient-string'

export const prefixes = {
  jujutsu: process.stdout.isTTY
    ? gs('red', 'blue')('JUJUTSU >>>')
    : 'JUJUTSU >>>',
  error: chalk.red('error'),
  warn: chalk.yellow('warn'),
  event: chalk.magenta('event'),
  wait: chalk.cyan('wait'),
  ready: chalk.green('ready') + ' -',
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

export function event(...message: any[]) {
  console.log(prefixes.event, ...message)
}

export function jujutsu(...message: any[]) {
  console.log(prefixes.jujutsu, ...message)
}
