import { AppProps } from 'next/app'
import '../styles/nextra.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
