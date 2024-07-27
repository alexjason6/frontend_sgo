// import PropTypes from 'prop-types';
import React from 'react'
import AuthRouter from './AuthRoutes'
import AppRouter from './AppRoutes'

const Router = () => {
  // const user = 1

  /*   return user ? <AuthRouter /> : <AuthRouter /> */

  return (
    <>
      <AuthRouter />
      <AppRouter />
    </>
  )
}

export default Router
