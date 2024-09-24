import React from 'react'

import Button from '../../../../components/Button'

import { Container, Content } from './styles'
import { useNavigate } from 'react-router-dom'

const CreateFirstObra: React.FC = () => {
  const navigate = useNavigate()

  const begin = () => {
    navigate('/clientes/novo')
  }

  return (
    <Container>
      <Content>
        <p>Não há obras cadastradas.</p>
        <Button onClick={begin} $blue>Iniciar</Button>
      </Content>
    </Container>
  )
}

export default CreateFirstObra
