import React, { useContext, useEffect } from 'react'
import AuthRouter from './AuthRoutes'
import AppRouter from './AppRoutes'
import AuthContext from '../contexts/authContext'
import LoadingContext from '../contexts/loadingContext'

const Router = () => {
  const { user, loadingAuth } = useContext(AuthContext)
  const { changeLoading } = useContext(LoadingContext)

  useEffect(() => {
    if (loadingAuth) {
      changeLoading(true, 'Verificando autenticação...')
    } else {
      changeLoading(false)
    }
  }, [loadingAuth, changeLoading])

  return loadingAuth ? null : user ? <AppRouter /> : <AuthRouter />
}

export default Router
