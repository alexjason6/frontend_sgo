/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, type ReactNode, useCallback } from 'react'

import OrcamentosServices from '../services/sgo/OrcamentosServices'
import { itensOrcamentoDb } from '../assets/database/itensOrcamentos'
import { tipoOrcamentoDb } from '../assets/database/tipoOrcamento'
import { servicosDb } from '../assets/database/servicos'

import { type Orcamento, type Etapa, type Subetapa, type TiposOrcamentos } from '../interfaces/globalInterfaces'

interface ObraData {
  id?: number
  token: string
}

interface OrcamentosContextType {
  orcamentos: Orcamento[]
  itens: Etapa[]
  servicos: Subetapa[]
  tiposOrcamentos: TiposOrcamentos[]
  listOrcamentos: ({ token }: ObraData) => Promise<void>
  listTiposOrcamentos: ({ token }: ObraData) => Promise<void>
}

interface OrcamentosProviderProps {
  children: ReactNode
}

const initialContextValue: OrcamentosContextType = {
  orcamentos: [],
  itens: [],
  servicos: [],
  tiposOrcamentos: [],
  listOrcamentos: async () => {},
  listTiposOrcamentos: async () => {}
}

const OrcamentosContext = createContext<OrcamentosContextType>(initialContextValue)

export const OrcamentosProvider: React.FC<OrcamentosProviderProps> = ({ children }) => {
  const [orcamentos, setOrcamentos] = useState([])
  const [tiposOrcamentos, setTiposOrcamentos] = useState(tipoOrcamentoDb)
  const [itens, setItens] = useState(itensOrcamentoDb)
  const [servicos, setServicos] = useState(servicosDb)

  const listOrcamentos = useCallback(async ({ token }: ObraData) => {
    try {
      const response = await OrcamentosServices.list({ token })

      if (response.message) {
        return
      }

      setOrcamentos(await response)
    } catch (error) {
      console.error('Erro ao realizar listagem de obras:', error)
      // Adicionar lógica de tratamento de erro, como exibir mensagens de erro para o usuário
    }
  }, [])

  const listTiposOrcamentos = useCallback(async ({ token }: ObraData) => {
    try {
      const response = await OrcamentosServices.listTipos({ token })

      if (response.message) {
        return
      }

      setOrcamentos(await response)
    } catch (error) {
      console.error('Erro ao realizar listagem de obras:', error)
      // Adicionar lógica de tratamento de erro, como exibir mensagens de erro para o usuário
    }
  }, [])

  return (
    <OrcamentosContext.Provider
      value={{
        orcamentos,
        itens,
        servicos,
        tiposOrcamentos,
        listOrcamentos,
        listTiposOrcamentos
      }}
    >
      {children}
    </OrcamentosContext.Provider>
  )
}

export default OrcamentosContext
