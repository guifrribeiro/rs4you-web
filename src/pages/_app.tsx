import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import { AppWrapper } from '../context/auth'
import '../services/firebase'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default MyApp
