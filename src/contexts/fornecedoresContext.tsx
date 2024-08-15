/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useState, type ReactNode } from 'react'

import { fornecedoresDb } from '../assets/database/fornecedores'

import { type Fornecedores } from '../interfaces/globalInterfaces'

interface FornecedoresContextType {
  fornecedores: Fornecedores[]
}

interface FornecedoresProviderProps {
  children: ReactNode
}

const initialContextValue: FornecedoresContextType = {
  fornecedores: []
}

const FornecedoresContext = createContext<FornecedoresContextType>(initialContextValue)

export const FornecedoresProvider: React.FC<FornecedoresProviderProps> = ({ children }) => {
  const [fornecedores, setFornecedores] = useState(fornecedoresDb)

  useEffect(() => {
    setFornecedores(fornecedoresDb)
  }, [])

  return (
    <FornecedoresContext.Provider
      value={{
        fornecedores
      }}
    >
      {children}
    </FornecedoresContext.Provider>
  )
}

export default FornecedoresContext
