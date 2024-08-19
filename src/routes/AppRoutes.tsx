import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Clientes from '../pages/Clientes'
import Obras from '../pages/Obras'
import DetalhamentoObra from '../pages/Obras/Detalhamento'
import RdoRda from '../pages/Rdo'
import NotFound from '../pages/NotFound'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/obras" element={<Obras />} />
      <Route path="/obras/detalhamento/:id" element={<DetalhamentoObra />} />
      <Route path="/obras/lancamentos/:type/:id" element={<RdoRda />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  )
}

export default AppRouter
