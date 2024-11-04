import React, { type ReactNode, useContext, useEffect } from 'react'

import ModalContext from '../../contexts/modalContext'

import { Close, Container, Content, X } from './styles'
import ReactPortal from '../ReactPortal'

interface TypeModal {
  component: ReactNode
  confirmation?: boolean
}

const Modal: React.FC<TypeModal> = ({ component, confirmation }) => {
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

  return (
    <ReactPortal containerId='modal-root'>
      <Container>
        <Content $confirmation={confirmation}>
          <Close>
            <X $confirmation={confirmation} onClick={() => changeModal()}/>
          </Close>
          {component}
        </Content>
      </Container>
    </ReactPortal>
  )
}

export default Modal
