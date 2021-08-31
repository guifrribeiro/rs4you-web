import React from 'react';
import ReactNotification from 'react-notifications-component';
import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import { AppWrapper } from '../context/auth'
import '../services/firebase'

function MyApp({ Component, pageProps }: AppProps) : JSX.Element {
  return (
    <AppWrapper>
      <ReactNotification />
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default MyApp
