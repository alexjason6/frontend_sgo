/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, type ReactNode, useCallback, useEffect, useContext } from 'react'

import AuthContext from './authContext'

import ObrasServices from '../services/sgo/ObrasServices'

import { type Obra, type ContextData } from '../interfaces/globalInterfaces'

interface ObrasContextType {
  obras: Obra[]
  listObras: ({ token }: ContextData) => Promise<void>
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
  const { token } = useContext(AuthContext)
  const [obras, setObras] = useState([])

  const listObras = useCallback(async ({ token }: ContextData) => {
    try {
      const response = await ObrasServices.list({ token })

      if (response.message) {
        return
      }

      if (response.length >= 1) {
        setObras(await response)
      }
    } catch (error) {
      console.error('Erro ao realizar listagem de obras:', error)
      // Adicionar lógica de tratamento de erro, como exibir mensagens de erro para o usuário
    }
  }, [])

  const getInitialData = async () => {
    await listObras({ token })
  }

  useEffect(() => {
    if (token) {
      void getInitialData()
    }
  }, [token])

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
