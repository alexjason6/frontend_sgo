import React from 'react'

import Button from '../../../components/Button'

import { Container } from './styles'

interface TypeModal {
  changeModal: (value: boolean) => void
}

const CreateCliente: React.FC<TypeModal> = ({ changeModal }) => {
  return (
    <Container>
      <p>Não há clientes cadastrados.</p>
      <Button $blue onClick={() => changeModal(true)}>Iniciar</Button>
    </Container>
  )
}

export default CreateCliente
