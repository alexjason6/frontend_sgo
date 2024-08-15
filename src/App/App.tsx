import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import GlobalStyles from '../assets/styles/global'
import defaultTheme from '../assets/styles/themes/default'

import Router from '../routes/router'
import { LoadingProvider } from '../contexts/loadingContext'
import { ModalProvider } from '../contexts/modalContext'
import { ObrasProvider } from '../contexts/obrasContext'
import { ClientesProvider } from '../contexts/clientesContext'
import { OrcamentosProvider } from '../contexts/orcamentosContext'
import { RdoRdaProvider } from '../contexts/rdoRdaContext'
import { FornecedoresProvider } from '../contexts/fornecedoresContext'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ClientesProvider>
          <FornecedoresProvider>
            <ObrasProvider>
              <OrcamentosProvider>
                <RdoRdaProvider>
                  <LoadingProvider>
                    <ModalProvider>
                      <Router />
                    </ModalProvider>
                  </LoadingProvider>
                </RdoRdaProvider>
              </OrcamentosProvider>
            </ObrasProvider>
          </FornecedoresProvider>
        </ClientesProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
