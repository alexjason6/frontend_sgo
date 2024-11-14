/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

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
  type?: string
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
  const { token, signOut } = useContext(AuthContext)
  const [rdos, setRdos] = useState([])
  const [rdas, setRdas] = useState([])
  const [lancamentosRdo, setLancamentosRdo] = useState([])
  const [lancamentosRda, setLancamentosRda] = useState([])

  const listRdos = useCallback(async ({ token }: Data) => {
    const response = await RdoRdaServices.listRdo({ token })

    if (response.message === 'Token inválido.') {
      signOut()
    }

    if (response.length >= 1) {
      setRdos(response)
    }
  }, [])

  const listRdas = useCallback(async ({ token }: Data) => {
    const response = await RdoRdaServices.listRda({ token })

    if (response.message === 'Token inválido.') {
      signOut()
    }

    if (response.length >= 1) {
      setRdas(response)
    }
  }, [])

  const listLancamentosRdo = useCallback(async ({ token }: Data) => {
    const response = await RdoRdaServices.listLancamentosRdo({ token })

    if (response.message === 'Token inválido.') {
      signOut()
    }

    if (response.length >= 1) {
      setLancamentosRdo(response)
    }
  }, [])

  const listLancamentosRda = useCallback(async ({ token }: Data) => {
    const response = await RdoRdaServices.listLancamentosRda({ token })

    if (response.message === 'Token inválido.') {
      signOut()
    }

    if (response.length >= 1) {
      setLancamentosRda(response)
    }
  }, [])

  const getInitialData = useCallback(async () => {
    await listRdos({ token })
    await listRdas({ token })
    await listLancamentosRdo({ token })
    await listLancamentosRda({ token })
  }, [token, listRdos, listRdas, listLancamentosRda, listLancamentosRdo])

  useEffect(() => {
    if (token) {
      void getInitialData()
    }
  }, [token, getInitialData])

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
