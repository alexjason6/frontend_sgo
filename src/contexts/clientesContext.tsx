/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useState, type ReactNode } from 'react'

import { clientesDb } from '../assets/database/clientes'

import { type Cliente } from '../interfaces/globalInterfaces'

interface ClientesContextType {
  clientes: Cliente[]
}

interface ClientesProviderProps {
  children: ReactNode
}

const initialContextValue: ClientesContextType = {
  clientes: []
}

const ClientesContext = createContext<ClientesContextType>(initialContextValue)

export const ClientesProvider: React.FC<ClientesProviderProps> = ({ children }) => {
  const [clientes, setClientes] = useState(clientesDb)

  useEffect(() => {
    setClientes(clientesDb)
  }, [])

  return (
    <ClientesContext.Provider
      value={{
        clientes
      }}
    >
      {children}
    </ClientesContext.Provider>
  )
}

export default ClientesContext
