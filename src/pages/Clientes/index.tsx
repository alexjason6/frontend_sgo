/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react'

import { GlobalContainer } from '../../assets/styles/global'

import ClientesContext from '../../contexts/clientesContext'

import Menu from '../../components/Menu'
import Header from '../../components/Header'

import CreateCliente from './CreateCliente'
import ClientesTable from './components/ClientesTable'

import { Content } from './styles'

const ListClientes: React.FC = () => {
  const { clientes } = useContext(ClientesContext)

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
