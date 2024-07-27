import React, { type ReactNode } from 'react'

import { Container } from './styles'

interface PropStyles {
  children: ReactNode[]
  error?: string
  oneOftree?: boolean
  oneOfFour?: boolean
  oneOfFive?: boolean
  passwordChange?: boolean
}

export default function FormGroup ({
  children, error, oneOftree, oneOfFour, oneOfFive, passwordChange
}: PropStyles) {
  return (
    <Container oneOftree={oneOftree} oneOfFour={oneOfFour} oneOfFive={oneOfFive} passwordChange={passwordChange}>
      {children}
      {error && <small>{error}</small>}
    </Container>
  )
}
