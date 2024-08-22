import React from 'react'

import { Container } from './styles'

import { type TypesInputs } from '../../interfaces/globalInterfaces'

export default function FormGroup ({
  children,
  $error,
  oneOftree,
  oneOfFour,
  oneOfFive,
  passwordChange
}: TypesInputs) {
  return (
    <Container
      $oneOftree={oneOftree}
      $oneOfFour={oneOfFour}
      $oneOfFive={oneOfFive}
      passwordChange={passwordChange}
    >
      {children}
      {$error && <small>{$error}</small>}
    </Container>
  )
}
