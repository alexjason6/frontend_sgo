/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, type ReactNode } from 'react'

import { type Cliente } from '../interfaces/globalInterfaces'
import ClientesServices from '../services/sgo/ClientesServices'

interface TokenParams {
  token: string
}

interface UsersContextType {
  users: Cliente[]
  listUsers: ({ token }: TokenParams) => Promise<void>
}

interface UsersProviderProps {
  children: ReactNode
}

const initialContextValue: UsersContextType = {
  users: [],
  listUsers: async () => {}
}

const UsersContext = createContext<UsersContextType>(initialContextValue)

export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [users, setUsers] = useState([])

  const listUsers = async ({ token }: TokenParams) => {
    try {
      const response = await ClientesServices.list({ token })

      if (response.message) {
        return
      }

      setUsers(response)
    } catch (error) {
      console.error('Erro ao realizar listagem de usuários:', error)
      // Adicionar lógica de tratamento de erro, como exibir mensagens de erro para o usuário
    }
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        listUsers
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export default UsersContext
