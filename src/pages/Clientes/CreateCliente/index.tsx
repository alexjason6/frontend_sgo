import React, { useContext } from 'react'

import ModalContext from '../../../contexts/modalContext'

import Button from '../../../components/Button'

import { Container } from './styles'

const CreateCliente: React.FC = () => {
  const { changeModal } = useContext(ModalContext)

  const handleChangeModal = () => {
    changeModal(<h1>Novo Cliente</h1>)
  }
  return (
    <Container>
      <p>Não há clientes cadastrados.</p>
      <Button $blue onClick={() => handleChangeModal()}>Iniciar</Button>
    </Container>
  )
}

export default CreateCliente
