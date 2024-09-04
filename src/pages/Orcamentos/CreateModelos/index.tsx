import React from 'react'

import { GlobalContainer } from '../../../assets/styles/global'

import Menu from '../../../components/Menu'
import Header from '../../../components/Header'

import { Container } from './styles'

const CreateModelo: React.FC = () => {
  return (
    <GlobalContainer>
      <Menu />
      <Header title='Criar orçamento' />
      <Container>
        <p>Oi</p>
      </Container>
    </GlobalContainer>
  )
}

export default CreateModelo
