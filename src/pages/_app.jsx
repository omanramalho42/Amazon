import React from "react"

import { SnackbarProvider } from 'notistack'

import { ThemeProvider } from 'styled-components'
import { StoreProvider } from "../store/Store"

import GlobalStyle from '../styles/global'
import { light } from '../styles/theme/index'

import { PayPalScriptProvider } from "@paypal/react-paypal-js"

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <ThemeProvider theme={light}>
        <StoreProvider>
          <GlobalStyle />
          <PayPalScriptProvider deferLoading={true}>
            <Component {...pageProps} />
          </PayPalScriptProvider>
        </StoreProvider>
      </ThemeProvider>
    </SnackbarProvider>
  )  
}

export default MyApp
