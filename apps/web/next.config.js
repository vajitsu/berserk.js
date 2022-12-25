/** @type {import('nextra').NextraConfig} */
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './nextra.theme.tsx',
  staticImage: true,
  flexsearch: {
    codeblocks: false,
  },
  mdxOptions: {
    rehypePlugins: [
      [
        require('@code-hike/mdx').remarkCodeHike,
        { theme: require('shiki/themes/material-darker.json') },
      ],
    ],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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
        destination: '/docs/',
        permanent: false,
      },
    ]
  },
}

module.exports = withNextra(nextConfig)
