import React from 'react'
import { Container, Title, Divisor } from './styles'

import { type TypeHeader } from '../../interfaces/globalInterfaces'

const Header: React.FC<TypeHeader> = ({ title, subHeader }) => {
  return (
    <Container $subHeader={subHeader}>
      <Title>{title}</Title>
      <Divisor $subHeader={subHeader}/>
    </Container>
  )
}

export default Header
