/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import { GlobalContainer } from '../../assets/styles/global'

import Menu from '../../components/Menu'
import Header from '../../components/Header'
import Modal from '../../components/Modal'

import CreateCliente from './CreateCliente'
import ClientesTable from './components/ClientesTable'

import { clientesDb } from '../../assets/database/clientes'

import { Content } from './styles'

import { type Clientes } from '../../interfaces/globalInterfaces'

const ListClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Clientes[]>(clientesDb)
  const [modal, setModal] = useState(false)

  const handleChangeModal = (value: boolean) => {
    setModal(value)
  }

  return (
  <GlobalContainer>
    <Menu />
    <Header title='Clientes' />
    <Content $clientes={clientes.length > 0}>
      {!clientes || clientes.length === 0
        ? <CreateCliente changeModal={handleChangeModal} />
        : (
          <ClientesTable clientes={clientes} />
          )}
    </Content>
    {modal && <Modal component={<h1>Teste</h1>} close={() => handleChangeModal(false)}/>}
  </GlobalContainer>)
}

export default ListClientes
