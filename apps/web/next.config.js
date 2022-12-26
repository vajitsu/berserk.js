/** @type {import('nextra').NextraConfig} */
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './nextra.theme.tsx',
  flexsearch: {
    codeblocks: false,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/getting-started',
        permanent: false,
      },
      {
        source: '/',
        destination: '/docs',
        permanent: false,
      },
    ]
  },
}

module.exports = withNextra(nextConfig)
