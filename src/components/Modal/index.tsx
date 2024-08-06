import React, { type ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { Close, Container, Content, X } from './styles'

interface TypeModal {
  component: ReactNode
  close: () => void
}

const Modal: React.FC<TypeModal> = ({ component, close }) => {
  const element = document.getElementById('modal-root')

  useEffect(() => {
    const closeOnEscapeKey = (e: { key: string }) => e.key === 'Escape' ? close() : null
    document.body.addEventListener('keydown', closeOnEscapeKey)

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [close])

  return ReactDOM.createPortal(
    <Container>
      <Content>
        <Close>
          <X onClick={close}/>
        </Close>
        {component}
      </Content>
    </Container>,
    element!
  )
}

export default Modal
