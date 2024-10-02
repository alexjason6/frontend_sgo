/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, type ReactNode, useCallback, useContext, useEffect } from 'react'

import AuthContext from './authContext'

import OrcamentosServices from '../services/sgo/OrcamentosServices'

import { type Orcamento, type Etapa, type Subetapa, type TiposOrcamentos, type ContextData } from '../interfaces/globalInterfaces'

interface OrcamentosContextType {
  orcamentos: Orcamento[]
  itens: Etapa[]
  subitens: Subetapa[]
  modelos: TiposOrcamentos[]
  listOrcamentos: ({ token }: ContextData) => Promise<void>
  getOrcamento: ({ token, id }: ContextData) => Promise<any>
  listModelos: ({ token }: ContextData) => Promise<void>
}

interface OrcamentosProviderProps {
  children: ReactNode
}

const initialContextValue: OrcamentosContextType = {
  orcamentos: [],
  itens: [],
  subitens: [],
  modelos: [],
  listOrcamentos: async () => {},
  getOrcamento: async () => Promise,
  listModelos: async () => {}
}

const OrcamentosContext = createContext<OrcamentosContextType>(initialContextValue)

export const OrcamentosProvider: React.FC<OrcamentosProviderProps> = ({ children }) => {
  const { token } = useContext(AuthContext)
  const [orcamentos, setOrcamentos] = useState([])
  const [modelos, setModelos] = useState([])
  const [itens, setItens] = useState([])
  const [subitens, setSubitens] = useState([])

  const listOrcamentos = useCallback(async ({ token }: ContextData) => {
    try {
      const response = await OrcamentosServices.list({ token })

      if (response.message) {
        return
      }

      if (response.length >= 1) {
        setOrcamentos(response)
      }
    } catch (error) {
      console.error('Erro ao realizar listagem de orçamento:', error)
      // Adicionar lógica de tratamento de erro, como exibir mensagens de erro para o usuário
    }
  }, [])

  const listModelos = useCallback(async ({ token }: ContextData) => {
    try {
      const response = await OrcamentosServices.listTipos({ token })

      if (response.message) {
        return
      }

      if (response.length >= 1) {
        setModelos(response)
      }
    } catch (error) {
      console.error('Erro ao realizar listagem de tipos de orçamento:', error)
      // Adicionar lógica de tratamento de erro, como exibir mensagens de erro para o usuário
    }
  }, [])

  const listItens = useCallback(async ({ token }: ContextData) => {
    try {
      const response = await OrcamentosServices.listItens({ token })

      if (response.message) {
        return
      }

      if (response.length >= 1) {
        setItens(response)
      }
    } catch (error) {
      console.error('Erro ao realizar listagem de itens do orçamento:', error)
      // Adicionar lógica de tratamento de erro, como exibir mensagens de erro para o usuário
    }
  }, [])

  const listSubitens = useCallback(async ({ token }: ContextData) => {
    try {
      const response = await OrcamentosServices.listSubitens({ token })

      if (response.message) {
        return
      }

      if (response.length >= 1) {
        setSubitens(response)
      }
    } catch (error) {
      console.error('Erro ao realizar listagem de subitens do orçamento:', error)
      // Adicionar lógica de tratamento de erro, como exibir mensagens de erro para o usuário
    }
  }, [])

  const getOrcamento = async ({ token, id }: ContextData) => {
    try {
      const orcamento = await OrcamentosServices.get({ token, id })

      if (orcamento.id) {
        return orcamento
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getInitialData = async () => {
    await listOrcamentos({ token })
    await listModelos({ token })
    await listItens({ token })
    await listSubitens({ token })
  }

  useEffect(() => {
    if (token) {
      void getInitialData()
    }
  }, [token])

  return (
    <OrcamentosContext.Provider
      value={{
        orcamentos,
        itens,
        subitens,
        modelos,
        listOrcamentos,
        getOrcamento,
        listModelos
      }}
    >
      {children}
    </OrcamentosContext.Provider>
  )
}

export default OrcamentosContext
