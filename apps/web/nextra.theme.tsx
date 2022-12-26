import Image from 'next/image'
import Balancer from 'react-wrap-balancer'
import { useRouter } from 'next/router'
import { DocsThemeConfig } from 'nextra-theme-docs'
import classNames from 'classnames'
import React from 'react'

import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })

const theme: DocsThemeConfig = {
  logo: () => <></>,
  logoLink: false,
  docsRepositoryBase:
    'https://github.com/vajitsu/jujutsu.js/blob/canary/apps/web',
  search: {
    placeholder: 'Search...',
  },
  project: {
    link: 'https://gitlab.com/vajitsu/jujutsu.js',
  },
  feedback: {
    content: 'Question? Give us feedback →',
  },
  editLink: {
    text: 'Edit this page on GitHub',
  },
  nextThemes: {
    defaultTheme: 'dark',
  },
  components: {
    h1: (props: any) => {
      return (
        <Balancer>
          <h1
            className={classNames(
              inter.className,
              'mt-3 text-5xl font-bold leading-snug'
            )}
          >
            {props.children}
          </h1>
        </Balancer>
      )
    },
  },
  toc: {
    float: true,
  },
  navigation: {
    prev: true,
    next: true,
  },
  footer: {
    text: () => (
      <a
        href="https://vercel.com/?utm_source=swc"
        target="_blank"
        rel="noopener"
        className="inline-flex items-center no-underline text-current"
      >
        <span className="mr-1">Powered by</span>
        <span>
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="vercelLogo"
            width={100}
            height={20}
            priority
          />
        </span>
      </a>
    ),
  },
  sidebar: {
    defaultMenuCollapseLevel: Number.POSITIVE_INFINITY,
  },
  useNextSeoProps() {
    const { route } = useRouter()
    if (route !== '/')
      return {
        titleTemplate: '%s – Jujutsu.js',
      }
    else
      return {
        title: 'Jujutsu.js',
      }
  },
  head: (
    <>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
  gitTimestamp({ timestamp }) {
    const [dateString, setDateString] = React.useState(timestamp.toISOString())

    React.useEffect(() => {
      try {
        setDateString(
          timestamp.toLocaleDateString(navigator.language, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        )
      } catch (e) {
        // Ignore errors here; they get the ISO string.
        // At least one person out there has manually misconfigured navigator.language.
      }
    }, [timestamp])

    return <>Last updated on {dateString}</>
  },
}

export default theme
