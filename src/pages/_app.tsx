import React from "react"
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../styles/global'
import { light } from '../styles/theme/index'

// import theme from "../styles/theme/theme"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  ) 
  
}

export default MyApp
