/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import { GlobalContainer } from '../../assets/styles/global'
import { clientesDb } from '../../assets/database/clientes'

import Menu from '../../components/Menu'
import Header from '../../components/Header'

import CreateCliente from './CreateCliente'
import ClientesTable from './components/ClientesTable'

import { Content } from './styles'

import { type Clientes } from '../../interfaces/globalInterfaces'

const ListClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Clientes[]>(clientesDb)

  return (
  <GlobalContainer>
    <Menu />
    <Header title='Clientes' goBack/>
    <Content $clientes={clientes.length > 0}>
      {!clientes || clientes.length === 0
        ? <CreateCliente/>
        : (
          <ClientesTable clientes={clientes} />
          )}
    </Content>
  </GlobalContainer>)
}

export default ListClientes
