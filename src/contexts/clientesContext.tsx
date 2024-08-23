/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, type ReactNode } from 'react'

import ClientesServices from '../services/sgo/ClientesServices'

import { type Cliente } from '../interfaces/globalInterfaces'

interface TokenParams {
  token: string
}

interface ClientesContextType {
  clientes: Cliente[]
  listClientes: ({ token }: TokenParams) => Promise<void>
}

interface ClientesProviderProps {
  children: ReactNode
}

const initialContextValue: ClientesContextType = {
  clientes: [],
  listClientes: async () => {}
}

const ClientesContext = createContext<ClientesContextType>(initialContextValue)

export const ClientesProvider: React.FC<ClientesProviderProps> = ({ children }) => {
  const [clientes, setClientes] = useState([])

  const listClientes = async ({ token }: TokenParams) => {
    try {
      const response = await ClientesServices.list({ token })

      if (response.message) {
        return
      }

      setClientes(response)
    } catch (error) {
      console.error('Erro ao realizar listagem de clientes:', error)
      // Adicionar lógica de tratamento de erro, como exibir mensagens de erro para o usuário
    }
  }

  return (
    <ClientesContext.Provider
      value={{
        clientes,
        listClientes
      }}
    >
      {children}
    </ClientesContext.Provider>
  )
}

export default ClientesContext
