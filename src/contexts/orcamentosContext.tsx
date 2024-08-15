/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, type ReactNode } from 'react'

import { orcamentosDb } from '../assets/database/orcamentos'
import { itensOrcamentoDb } from '../assets/database/itensOrcamentos'
import { tipoOrcamentoDb } from '../assets/database/tipoOrcamento'

import { type Orcamento, type Etapa, type TiposOrcamentos } from '../interfaces/globalInterfaces'

interface OrcamentosContextType {
  orcamentos: Orcamento[]
  itens: Etapa[]
  tiposOrcamentos: TiposOrcamentos[]
}

interface OrcamentosProviderProps {
  children: ReactNode
}

const initialContextValue: OrcamentosContextType = {
  orcamentos: [],
  itens: [],
  tiposOrcamentos: []
}

const OrcamentosContext = createContext<OrcamentosContextType>(initialContextValue)

export const OrcamentosProvider: React.FC<OrcamentosProviderProps> = ({ children }) => {
  const [orcamentos, setOrcamentos] = useState(orcamentosDb)
  const [tiposOrcamentos, setTiposOrcamentos] = useState(tipoOrcamentoDb)
  const [itens, setItens] = useState(itensOrcamentoDb)

  return (
    <OrcamentosContext.Provider
      value={{
        orcamentos,
        itens,
        tiposOrcamentos
      }}
    >
      {children}
    </OrcamentosContext.Provider>
  )
}

export default OrcamentosContext
