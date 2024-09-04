/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

import { rdosDb } from '../assets/database/rdos'
import { rdasDb } from '../assets/database/rdas'
import { lancamentosRdoDb } from '../assets/database/lancamentosRdo'
import { lancamentosRdaDb } from '../assets/database/lancamentosRda'

import { type RdoRda, type LancamentoRdoRda } from '../interfaces/globalInterfaces'
import AuthContext from './authContext'
import RdoRdaServices from '../services/sgo/RdoRdaServices'

interface RdoRdaContextType {
  rdos: RdoRda[]
  rdas: RdoRda[]
  lancamentosRdo: LancamentoRdoRda[]
  lancamentosRda: LancamentoRdoRda[]
  listRdos: ({ token }: Data) => Promise<void>
  listRdas: ({ token }: Data) => Promise<void>
}

interface Data {
  id?: number
  token: string
}

interface RdoRdaProviderProps {
  children: ReactNode
}

const initialContextValue: RdoRdaContextType = {
  rdos: [],
  rdas: [],
  lancamentosRdo: [],
  lancamentosRda: [],
  listRdos: async () => {},
  listRdas: async () => {}
}

const RdoRdaContext = createContext<RdoRdaContextType>(initialContextValue)

export const RdoRdaProvider: React.FC<RdoRdaProviderProps> = ({ children }) => {
  const { token } = useContext(AuthContext)
  const [rdos, setRdos] = useState([])
  const [rdas, setRdas] = useState([])
  const [lancamentosRdo, setLancamentosRdo] = useState(lancamentosRdoDb)
  const [lancamentosRda, setLancamentosRda] = useState(lancamentosRdaDb)

  const listRdos = useCallback(async ({ token }: Data) => {
    const response = await RdoRdaServices.listRdo({ token })

    setRdos(response)
  }, [])

  const listRdas = useCallback(async ({ token }: Data) => {
    const response = await RdoRdaServices.listRda({ token })

    setRdas(response)
  }, [])

  const getInitialData = async () => {
    await listRdos({ token })
    await listRdas({ token })
  }

  useEffect(() => {
    if (token) {
      void getInitialData()
    }
  }, [token])

  return (
    <RdoRdaContext.Provider
      value={{
        rdos,
        rdas,
        lancamentosRdo,
        lancamentosRda,
        listRdos,
        listRdas
      }}
    >
      {children}
    </RdoRdaContext.Provider>
  )
}

export default RdoRdaContext
