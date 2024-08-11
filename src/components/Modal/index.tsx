import React, { type ReactNode, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'

import ModalContext from '../../contexts/modalContext'

import { Close, Container, Content, X } from './styles'

interface TypeModal {
  component: ReactNode
}

const Modal: React.FC<TypeModal> = ({ component }) => {
  const element = document.getElementById('modal-root')
  const { changeModal } = useContext(ModalContext)

  useEffect(() => {
    const closeOnEscapeKey = (e: { key: string }) => e.key === 'Escape' ? changeModal() : null
    document.body.addEventListener('keydown', closeOnEscapeKey)
    document.body.classList.add('no-scroll')

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
      document.body.classList.remove('no-scroll')
    }
  }, [changeModal])

  return ReactDOM.createPortal(
    <Container>
      <Content>
        <Close>
          <X onClick={() => changeModal()}/>
        </Close>
        {component}
      </Content>
    </Container>,
    element!
  )
}

export default Modal
