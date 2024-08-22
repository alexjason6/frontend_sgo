/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, type ReactNode, useCallback, useMemo } from 'react'

import { type Obra } from '../interfaces/globalInterfaces'
import ObrasServices from '../services/sgo/ObrasServices'

interface ObraData {
  id?: number
  token: string
}

interface ObrasContextType {
  obras: Obra[]
  listObras: ({ token }: ObraData) => Promise<void>
}

interface ObrasProviderProps {
  children: ReactNode
}

const initialContextValue: ObrasContextType = {
  obras: [],
  listObras: async () => {}
}

const ObrasContext = createContext<ObrasContextType>(initialContextValue)

export const ObrasProvider: React.FC<ObrasProviderProps> = ({ children }) => {
  const [obras, setObras] = useState([])

  const listObras = useCallback(async ({ token }: ObraData) => {
    try {
      const response = await ObrasServices.list({ token })

      if (response.message) {
        return
      }

      setObras(await response)
    } catch (error) {
      console.error('Erro ao realizar listagem de obras:', error)
      // Adicionar lógica de tratamento de erro, como exibir mensagens de erro para o usuário
    }
  }, [])

  return (
    <ObrasContext.Provider
      value={{
        obras,
        listObras
      }}
    >
      {children}
    </ObrasContext.Provider>
  )
}

export default ObrasContext
