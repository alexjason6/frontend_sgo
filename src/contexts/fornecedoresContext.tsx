/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

import AuthContext from './authContext'

import FornecedoresServices from '../services/sgo/FornecedoresServices'

import { type Fornecedores, type ContextData } from '../interfaces/globalInterfaces'

interface FornecedoresContextType {
  fornecedores: Fornecedores[]
  listFornecedores: ({ token }: ContextData) => Promise<void>
}

interface FornecedoresProviderProps {
  children: ReactNode
}

const initialContextValue: FornecedoresContextType = {
  fornecedores: [],
  listFornecedores: async () => {}
}

const FornecedoresContext = createContext<FornecedoresContextType>(initialContextValue)

export const FornecedoresProvider: React.FC<FornecedoresProviderProps> = ({ children }) => {
  const { token } = useContext(AuthContext)
  const [fornecedores, setFornecedores] = useState<Fornecedores[]>([])

  const listFornecedores = useCallback(async ({ token }: ContextData) => {
    try {
      const response = await FornecedoresServices.list({ token })

      if (response.message) {
        return
      }

      if (response.length >= 1) {
        setFornecedores(response)
      }
    } catch (error) {
      console.error('Erro ao realizar listagem de fornecedores:', error)
      // Adicionar lógica de tratamento de erro, como exibir mensagens de erro para o usuário
    }
  }, [])

  const getInitialData = async () => {
    await listFornecedores({ token })
  }

  useEffect(() => {
    if (token) {
      void getInitialData()
    }
  }, [token])

  return (
    <FornecedoresContext.Provider
      value={{
        fornecedores,
        listFornecedores
      }}
    >
      {children}
    </FornecedoresContext.Provider>
  )
}

export default FornecedoresContext
