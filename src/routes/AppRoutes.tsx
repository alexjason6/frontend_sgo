import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'

export default function AppRouter () {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/notFound" element={<NotFound />} />
    </Routes>
  )
}
