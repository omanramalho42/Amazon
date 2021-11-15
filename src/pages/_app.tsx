import React from "react"
import { ThemeProvider } from 'styled-components'
import { StoreProvider } from "../store/Store"
import GlobalStyle from '../styles/global'
import { light } from '../styles/theme/index'

// import theme from "../styles/theme/theme"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={light}>
      <StoreProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </StoreProvider>
    </ThemeProvider>
  ) 
  
}

export default MyApp
