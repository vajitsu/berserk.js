export type cliCommand = (argv?: string[]) => void

export const commands: { [command: string]: () => Promise<cliCommand> } = {
  build: () => Promise.resolve(require('../cli/berserk-build').jujutsuBuild),
  start: () => Promise.resolve(require('../cli/berserk-start').jujutsuStart),
  dev: () => Promise.resolve(require('../cli/berserk-dev').jujutsuDev),
  // TODO: Impletment init
  // init: () => Promise.resolve(require('../cli/berserk-init').jujutsuInit),
  info: () => Promise.resolve(require('../cli/berserk-info').jujutsuInfo),
}
