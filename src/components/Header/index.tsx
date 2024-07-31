import React from 'react'
import { Container, Title, Divisor } from './styles'

import { type TypeHeader } from '../../interfaces/globalInterfaces'

const Header: React.FC<TypeHeader> = ({ title, colorLine }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Divisor colorLine={colorLine} />
    </Container>
  )
}

export default Header
