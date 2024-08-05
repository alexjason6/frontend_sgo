/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import { GlobalContainer } from '../../assets/styles/global'

import Menu from '../../components/Menu'
import Header from '../../components/Header'

import { clientesDb } from '../../assets/database/clientes'

import CreateCliente from './CreateCliente'

import { Content } from './styles'
import Modal from '../../components/Modal'

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState([])
  const [modal, setModal] = useState(false)

  const handleChangeModal = (value: boolean) => {
    setModal(value)
  }

  if (modal) {
    return <Modal component={<h1>Teste</h1>}/>
  }

  return (
  <GlobalContainer>
    <Menu />
    <Header title='Clientes' />
    <Content>
      {!clientes || clientes.length === 0 ? <CreateCliente changeModal={handleChangeModal} /> : <h1>Oi fasfsdfdsf</h1>}
    </Content>
  </GlobalContainer>)
}

export default Clientes
