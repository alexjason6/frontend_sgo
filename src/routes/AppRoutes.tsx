import React, { Suspense, lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Loading from '../components/Loading'

const Dashboard = lazy(async () => await import('../pages/Dashboard'))
const Clientes = lazy(async () => await import('../pages/Clientes'))
const Obras = lazy(async () => await import('../pages/Obras'))
const DetalhamentoObra = lazy(async () => await import('../pages/Obras/Detalhamento'))
const RdoRda = lazy(async () => await import('../pages/RdoRda'))
const CreateLancamento = lazy(async () => await import('../pages/RdoRda/CreateLancamento'))
const Users = lazy(async () => await import('../pages/Users'))
const Fornecedores = lazy(async () => await import('../pages/Fornecedores'))
const Orcamentos = lazy(async () => await import('../pages/Orcamentos'))
const ModelosOrcamentos = lazy(async () => await import('../pages/Orcamentos/Modelos'))
const CreateItem = lazy(async () => await import('../components/CreateItem'))
const NotFound = lazy(async () => await import('../pages/NotFound'))

const AppRouter = () => (
  <Suspense fallback={<Loading message={'Verificando autenticação...'} />}>
    <Routes>
      <Route path='/' element={<Navigate to='/dashboard' replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/clientes/novo" element={<CreateItem type='cliente' />} />
      <Route path="/obras" element={<Obras />} />
      <Route path="/obras/novo" element={<CreateItem type='obra' />} />
      <Route path="/obras/detalhamento/:id" element={<DetalhamentoObra />} />
      <Route path="/obras/lancamentos/:type/:id" element={<RdoRda />} />
      <Route path="/obras/lancamentos/:type/:id/novo" element={<CreateLancamento />} />
      <Route path="/usuarios" element={<Users />} />
      <Route path="/fornecedores" element={<Fornecedores />} />
      <Route path="/fornecedores/novo" element={<CreateItem type='fornecedor' />} />
      <Route path="/orcamentos" element={<Orcamentos />} />
      <Route path="/orcamentos/novo" element={<CreateItem type='orcamento' />} />
      <Route path="/orcamentos/modelos" element={<ModelosOrcamentos />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path='/*' element={<Navigate to="/not-found" replace />} />
    </Routes>
  </Suspense>
)

export default AppRouter
