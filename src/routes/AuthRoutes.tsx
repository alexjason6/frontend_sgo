import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from '../pages/Login'
import NotFound from '../pages/NotFound'

export default function AuthRouter () {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/notFound" element={<NotFound />} />
    </Routes>
  )
}
