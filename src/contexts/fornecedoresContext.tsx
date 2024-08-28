/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

import { type Fornecedores } from '../interfaces/globalInterfaces'
import FornecedoresServices from '../services/sgo/FornecedoresServices'

interface TokenParams {
  token: string
}

interface FornecedoresContextType {
  fornecedores: Fornecedores[]
  listFornecedores: ({ token }: TokenParams) => Promise<void>
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
  const [fornecedores, setFornecedores] = useState<Fornecedores[]>([])

  const listFornecedores = async ({ token }: TokenParams) => {
    try {
      const response = await FornecedoresServices.list({ token })

      if (response.message) {
        return
      }

      setFornecedores(response)
    } catch (error) {
      console.error('Erro ao realizar listagem de fornecedores:', error)
      // Adicionar lógica de tratamento de erro, como exibir mensagens de erro para o usuário
    }
  }

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
