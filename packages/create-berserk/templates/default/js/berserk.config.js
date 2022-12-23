/** @type {import('berserk').BerserkConfig} */
const berserkConfig = {
  discord: {
    token: 'your-token-goes-here',
    options: {
      intents: [1],
    },
  },
  experimental: {
    appDir: true,
  },
}

module.exports = berserkConfig
