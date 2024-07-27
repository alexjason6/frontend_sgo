import React from 'react'
import { Container, Title, Divisor } from './styles'

interface TypeHeader {
  title: string
}

export default function Header ({ title }: TypeHeader) {
  return (
    <Container>
      <Title>{title}</Title>
      <Divisor />
    </Container>
  )
}
