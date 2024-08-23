import React, { useContext } from 'react'
import AuthRouter from './AuthRoutes'
import AppRouter from './AppRoutes'
import AuthContext from '../contexts/authContext'
import LoadingContext from '../contexts/loadingContext'

const Router = () => {
  const { user, loadingAuth } = useContext(AuthContext)
  const { changeLoading } = useContext(LoadingContext)

  // Exibe o carregamento enquanto a verificação de autenticação está em andamento
  if (loadingAuth) {
    changeLoading(true, 'verificando autenticação...')
    return null // Retorna null enquanto está verificando
  }

  return user ? <AppRouter /> : <AuthRouter />
}

export default Router
