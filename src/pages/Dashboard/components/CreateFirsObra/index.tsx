import React from 'react'

import Button from '../../../../components/Button'

import { Container } from './styles'

const CreateFirstObra: React.FC = () => {
  return (
    <Container>
      <p>Não há obras cadastradas.</p>
      <Button blue>Iniciar</Button>
    </Container>
  )
}

export default CreateFirstObra
