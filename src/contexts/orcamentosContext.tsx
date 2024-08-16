/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, type ReactNode } from 'react'

import { orcamentosDb } from '../assets/database/orcamentos'
import { itensOrcamentoDb } from '../assets/database/itensOrcamentos'
import { tipoOrcamentoDb } from '../assets/database/tipoOrcamento'
import { servicosDb } from '../assets/database/servicos'

import { type Orcamento, type Etapa, type Subetapa, type TiposOrcamentos } from '../interfaces/globalInterfaces'

interface OrcamentosContextType {
  orcamentos: Orcamento[]
  itens: Etapa[]
  servicos: Subetapa[]
  tiposOrcamentos: TiposOrcamentos[]
}

interface OrcamentosProviderProps {
  children: ReactNode
}

const initialContextValue: OrcamentosContextType = {
  orcamentos: [],
  itens: [],
  servicos: [],
  tiposOrcamentos: []
}

const OrcamentosContext = createContext<OrcamentosContextType>(initialContextValue)

export const OrcamentosProvider: React.FC<OrcamentosProviderProps> = ({ children }) => {
  const [orcamentos, setOrcamentos] = useState(orcamentosDb)
  const [tiposOrcamentos, setTiposOrcamentos] = useState(tipoOrcamentoDb)
  const [itens, setItens] = useState(itensOrcamentoDb)
  const [servicos, setServicos] = useState(servicosDb)

  return (
    <OrcamentosContext.Provider
      value={{
        orcamentos,
        itens,
        servicos,
        tiposOrcamentos
      }}
    >
      {children}
    </OrcamentosContext.Provider>
  )
}

export default OrcamentosContext
