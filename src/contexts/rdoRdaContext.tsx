/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, type ReactNode } from 'react'

import { rdosDb } from '../assets/database/rdos'
import { rdasDb } from '../assets/database/rdas'
import { lancamentosRdoDb } from '../assets/database/lancamentosRdo'
import { lancamentosRdaDb } from '../assets/database/lancamentosRda'

import { type RdoRda, type LancamentoRdoRda } from '../interfaces/globalInterfaces'

interface RdoRdaContextType {
  rdos: RdoRda[]
  rdas: RdoRda[]
  lancamentosRdo: LancamentoRdoRda[]
  lancamentosRda: LancamentoRdoRda[]
}

interface RdoRdaProviderProps {
  children: ReactNode
}

const initialContextValue: RdoRdaContextType = {
  rdos: [],
  rdas: [],
  lancamentosRdo: [],
  lancamentosRda: []
}

const RdoRdaContext = createContext<RdoRdaContextType>(initialContextValue)

export const RdoRdaProvider: React.FC<RdoRdaProviderProps> = ({ children }) => {
  const [rdos, setRdos] = useState(rdosDb)
  const [rdas, setRdas] = useState(rdasDb)
  const [lancamentosRdo, setLancamentosRdo] = useState(lancamentosRdoDb)
  const [lancamentosRda, setLancamentosRda] = useState(lancamentosRdaDb)

  return (
    <RdoRdaContext.Provider
      value={{
        rdos,
        rdas,
        lancamentosRdo,
        lancamentosRda
      }}
    >
      {children}
    </RdoRdaContext.Provider>
  )
}

export default RdoRdaContext
