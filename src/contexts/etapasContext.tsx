/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, type ReactNode, useCallback, useContext, useEffect } from 'react'

import AuthContext from './authContext'

import EtapasServices from '../services/sgo/EtapasServices'

import { type Etapa, type Subetapa, type ContextData } from '../interfaces/globalInterfaces'

interface EtapasContextType {
  etapas: Etapa[]
  subetapas: Subetapa[]
  listEtapas: ({ token }: ContextData) => Promise<void>
  listSubetapas: ({ token }: ContextData) => Promise<void>
}

interface EtapasProviderProps {
  children: ReactNode
}

const initialContextValue: EtapasContextType = {
  etapas: [],
  subetapas: [],
  listEtapas: async () => {},
  listSubetapas: async () => {}
}

const EtapasContext = createContext<EtapasContextType>(initialContextValue)

export const EtapasProvider: React.FC<EtapasProviderProps> = ({ children }) => {
  const { token } = useContext(AuthContext)
  const [etapas, setEtapas] = useState([])
  const [subetapas, setSubetapas] = useState([])

  const listEtapas = useCallback(async ({ token }: ContextData) => {
    try {
      const response = await EtapasServices.listEtapas({ token })

      if (response.message) {
        return
      }

      if (response.length >= 1) {
        setEtapas(response)
      }
    } catch (error) {
      console.error('Erro ao realizar listagem de etapas:', error)
      // Adicionar lógica de tratamento de erro, como exibir mensagens de erro para o usuário
    }
  }, [])

  const listSubetapas = useCallback(async ({ token }: ContextData) => {
    try {
      const response = await EtapasServices.listSubetapas({ token })

      if (response.message) {
        return
      }

      if (response.length >= 1) {
        setSubetapas(response)
      }
    } catch (error) {
      console.error('Erro ao realizar listagem de subetapas:', error)
      // Adicionar lógica de tratamento de erro, como exibir mensagens de erro para o usuário
    }
  }, [])

  const getInitialData = async () => {
    await listEtapas({ token })
    await listSubetapas({ token })
  }

  useEffect(() => {
    if (token) {
      void getInitialData()
    }
  }, [token])

  return (
    <EtapasContext.Provider
      value={{
        etapas,
        subetapas,
        listEtapas,
        listSubetapas
      }}
    >
      {children}
    </EtapasContext.Provider>
  )
}

export default EtapasContext
