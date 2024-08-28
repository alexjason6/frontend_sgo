import React, { createContext, useContext, useEffect, useState, type ReactNode, useCallback } from 'react'
import { type User } from '../interfaces/globalInterfaces'
import AuthServices from '../services/sgo/AuthServices'
import LoadingContext from './loadingContext'
import Toast from '../utils/toast'

interface AuthContextType {
  user?: User | null
  token: string
  signIn: ({ email, password }: LoginData) => Promise<void>
  signOut: () => void
  loadingAuth: boolean // Adicionando um estado para controlar o carregamento de autenticação
}

interface AuthProviderProps {
  children: ReactNode
}

interface LoginData {
  email: string
  password: string
}

const initialContextValue: AuthContextType = {
  user: null,
  token: '',
  signIn: async () => {},
  signOut: () => {},
  loadingAuth: true // Inicialmente em carregamento até verificar o token
}

interface GetUserParams {
  id: number
  hash: string
}

const AuthContext = createContext<AuthContextType>(initialContextValue)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { changeLoading } = useContext(LoadingContext)
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState('')
  const [loadingAuth, setLoadingAuth] = useState(true)

  const getUser = useCallback(async ({ id, hash }: GetUserParams) => {
    try {
      const tokenIsValid = await AuthServices.validaToken({ token: hash })

      if (!tokenIsValid) throw new Error('Token inválido')

      const response = await AuthServices.getUser({ id, token: hash })

      localStorage.setItem('@SGO:user', JSON.stringify(response))

      setUser(response)
    } catch (error) {
      console.error('Erro ao buscar usuário:', error)
      setUser(null)
    } finally {
      setLoadingAuth(false)
      changeLoading(false)
    }
  }, [setUser, setLoadingAuth, changeLoading])

  const signIn = async ({ email, password }: LoginData) => {
    changeLoading(true, 'Fazendo login...')

    try {
      const response = await AuthServices.signIn({ email, password })
      setToken(response.token)

      localStorage.setItem('@SGO:token', response.token)

      await getUser({ id: response.id_user, hash: response.token })
    } catch {
      Toast({ type: 'danger', text: 'Falha na autenticação. Por favor, verifique suas credenciais.' })
    } finally {
      changeLoading(false)
    }
  }

  const signOut = () => {
    changeLoading(true, 'Fazendo logout...')

    localStorage.removeItem('@SGO:token')
    localStorage.removeItem('@SGO:user')

    setToken('')
    setUser(null)
    setLoadingAuth(false)
    changeLoading(false)
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('@SGO:user')
    const storedToken = localStorage.getItem('@SGO:token')

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
    }
    setLoadingAuth(false) // Verificação concluída
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
