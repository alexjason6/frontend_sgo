import React from 'react'

import Button from '../../../../components/Button'

import { Container, Content } from './styles'

const CreateFirstObra: React.FC = () => {
  return (
    <Container>
      <Content>
        <p>Não há obras cadastradas.</p>
        <Button $blue>Iniciar</Button>
      </Content>
    </Container>
  )
}

export default CreateFirstObra
