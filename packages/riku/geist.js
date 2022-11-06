const primary = {
  background: 0x000,
  accents: {
    1: 0x111,
    2: 0x33,
    3: 0x444,
    4: 0x666,
    5: 0x888,
    6: 0x999,
    7: 0xeaeaea,
    8: 0xfafafa,
  },
  foreground: 0xfff,
};

const error = {
  lighter: 0xf7d4d6,
  light: 0xf33,
  default: 0xff0000,
  dark: 0xe60000,
};

const success = {
  lighter: 0xd3e5ff,
  light: 0x3291ff,
  default: 0x0070f3,
  dark: 0x0761d1,
};

const warning = {
  lighter: 0xffefcf,
  light: 0xf7b955,
  default: 0xf5a623,
  dark: 0xab570a,
};

const violet = {
  lighter: 0xd8ccf1,
  light: 0x8a63d2,
  default: 0x7928ca,
  dark: 0x4c2889,
};

const cyan = {
  lighter: 0xaaffec,
  light: 0x79ffe1,
  default: 0x50e3c2,
  dark: 0x29bc9b,
};

const highlight = {
  purple: 0xf81ce5,
  magenta: 0xeb367f,
  pink: 0xff0080,
  yellow: 0xfff500,
};

const geist = {
  primary,
  error,
  success,
  warning,
  violet,
  cyan,
  highlight,
};

module.exports = geist;
