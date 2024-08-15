/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, type ReactNode } from 'react'

import { obrasDb } from '../assets/database/obras'

import { type Obra } from '../interfaces/globalInterfaces'

interface ObrasContextType {
  obras: Obra[]
}

interface ObrasProviderProps {
  children: ReactNode
}

const initialContextValue: ObrasContextType = {
  obras: []
}

const ObrasContext = createContext<ObrasContextType>(initialContextValue)

export const ObrasProvider: React.FC<ObrasProviderProps> = ({ children }) => {
  const [obras, setObras] = useState(obrasDb)

  return (
    <ObrasContext.Provider
      value={{
        obras
      }}
    >
      {children}
    </ObrasContext.Provider>
  )
}

export default ObrasContext
