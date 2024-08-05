import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Clientes from '../pages/Clientes'
import NotFound from '../pages/NotFound'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/notFound" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter
