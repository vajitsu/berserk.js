/** @type {import('jujutsu').JujutsuConfig} */
const jujutsuConfig = {
  discord: {
    token:
      'MTA0MTAzNjIxMDM3MTU3OTkzNA.Gi50KP.MU0Pkm3lbwW04WK31SKj6iZUPxU9UNSthxsXLo',
    options: {
      intents: [1],
    },
  },
  experimental: {
    appDir: true,
    compress: true,
    swcMinify: true,
  },
}

module.exports = jujutsuConfig
