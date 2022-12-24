export type cliCommand = (argv?: string[]) => void

export const commands: { [command: string]: () => Promise<cliCommand> } = {
  build: () => Promise.resolve(require('../cli/berserk-build').berserkBuild),
  start: () => Promise.resolve(require('../cli/berserk-start').berserkStart),
  dev: () => Promise.resolve(require('../cli/berserk-dev').berserkDev),
  // TODO: Impletment init
  // init: () => Promise.resolve(require('../cli/berserk-init').berserkInit),
  info: () => Promise.resolve(require('../cli/berserk-info').berserkInfo),
}
