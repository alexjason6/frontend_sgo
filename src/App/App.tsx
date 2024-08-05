import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import GlobalStyles from '../assets/styles/global'
import defaultTheme from '../assets/styles/themes/default'

import Router from '../routes/router'
import { LoadingProvider } from '../contexts/loadingContext'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <LoadingProvider>
          <GlobalStyles />
          <Router />
        </LoadingProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
