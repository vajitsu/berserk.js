import chalk from "chalk";

export const blocks = {
  riku: chalk.bgBlack.red(" RIKU "),
  compiler: chalk.bgBlack.cyanBright(" COMPILER "),
  restart: chalk.bgBlack.whiteBright(" RESTART "),
  error: chalk.bgBlack.yellowBright(" ERROR "),
  dev: chalk.bgBlack.magentaBright(" DEV "),
  paused: chalk.bgBlack.yellowBright(" PAUSED "),
  resumed: chalk.bgBlack.yellowBright(" RESUMED "),
  ended: chalk.bgBlack.blackBright(" ENDED "),
};

export const colors = {
  blue: chalk.blue,
  green: chalk.green,
  red: chalk.red,
  redBright: chalk.redBright,
  yellow: chalk.yellow,
};

export const msg = {
  riku(str: string) {
    return blocks.riku.concat(` ${str}`);
  },
  restart(str: string) {
    return blocks.restart.concat(` ${str}`);
  },
  error(str: string) {
    return blocks.error.concat(` ${str}`);
  },
  dev(str: string) {
    return blocks.dev.concat(` ${str}`);
  },
  paused(str: string) {
    return blocks.paused.concat(` ${str}`);
  },
  resumed(str: string) {
    return blocks.resumed.concat(` ${str}`);
  },
  ended(str: string) {
    return blocks.ended.concat(` ${str}`);
  },
  compiler(str: string) {
    return blocks.compiler.concat(` ${str}`);
  },
};
