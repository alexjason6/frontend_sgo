/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

import AuthContext from './authContext'

import ClientesServices from '../services/sgo/ClientesServices'

import { type Cliente, type ContextData } from '../interfaces/globalInterfaces'

interface ClientesContextType {
  clientes: Cliente[]
  listClientes: ({ token }: ContextData) => Promise<void>
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
  const { token } = useContext(AuthContext)
  const [clientes, setClientes] = useState([])

  const listClientes = useCallback(async ({ token }: ContextData) => {
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
  }, [])

  const getInitialData = async () => {
    await listClientes({ token })
  }

  useEffect(() => {
    if (token) {
      void getInitialData()
    }
  }, [token])

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
