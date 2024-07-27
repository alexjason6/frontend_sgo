/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import GlobalStyles from '../assets/styles/global'
import defaultTheme from '../assets/styles/themes/default'

import Router from '../routes/router'

function App () {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
          <Router />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
