import React, { type ReactNode } from 'react'
import ReactDOM from 'react-dom'

import { Container } from './styles'

interface TypeModal {
  component: ReactNode
}

const Modal: React.FC<TypeModal> = ({ component }) => {
  const element = document.getElementById('modal-root')

  return ReactDOM.createPortal(
    <Container>
      {component}
    </Container>,
    element!
  )
}

export default Modal
