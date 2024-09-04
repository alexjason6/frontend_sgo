import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import GlobalStyles from '../assets/styles/global'
import defaultTheme from '../assets/styles/themes/default'

import Router from '../routes/router'
import { AuthProvider } from '../contexts/authContext'
import { LoadingProvider } from '../contexts/loadingContext'
import { ModalProvider } from '../contexts/modalContext'
import { ObrasProvider } from '../contexts/obrasContext'
import { ClientesProvider } from '../contexts/clientesContext'
import { OrcamentosProvider } from '../contexts/orcamentosContext'
import { RdoRdaProvider } from '../contexts/rdoRdaContext'
import { FornecedoresProvider } from '../contexts/fornecedoresContext'
import { UsersProvider } from '../contexts/usersContext'

import Toast from '../components/Toast/ToastContainer'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Toast />
        <LoadingProvider>
          <AuthProvider>
            <UsersProvider>
              <ClientesProvider>
                <FornecedoresProvider>
                  <ObrasProvider>
                    <OrcamentosProvider>
                      <RdoRdaProvider>
                        <ModalProvider>
                          <Router />
                        </ModalProvider>
                      </RdoRdaProvider>
                    </OrcamentosProvider>
                  </ObrasProvider>
                </FornecedoresProvider>
              </ClientesProvider>
            </UsersProvider>
          </AuthProvider>
        </LoadingProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
