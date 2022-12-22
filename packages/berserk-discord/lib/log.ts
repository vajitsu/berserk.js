import chalk from '@berserk/discord/dist/compiled/chalk'

export const prefixes = {
  error: chalk.red('error') + ' -',
  warn: chalk.yellow('warn') + ' -',
  event: chalk.magenta('event') + '  -',
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
