export type cliCommand = (argv?: string[]) => void

export const commands: { [command: string]: () => Promise<cliCommand> } = {
  build: () => Promise.resolve(require('../cli/jujutsu-build').jujutsuBuild),
  start: () => Promise.resolve(require('../cli/jujutsu-start').jujutsuStart),
  dev: () => Promise.resolve(require('../cli/jujutsu-dev').jujutsuDev),
  init: () => Promise.resolve(require('../cli/jujutsu-init').jujutsuInit),
}
