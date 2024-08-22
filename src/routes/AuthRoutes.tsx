import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Login from '../pages/Login'
import NotFound from '../pages/NotFound'

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/notFound" element={<NotFound />} />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default AuthRouter
