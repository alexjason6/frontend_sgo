import React, { type ReactNode, useContext, useEffect } from 'react'

import ModalContext from '../../contexts/modalContext'

import { Close, Container, Content, X } from './styles'
import ReactPortal from '../ReactPortal'

interface TypeModal {
  component: ReactNode
}

const ModalConfirmacao: React.FC<TypeModal> = ({ component }) => {
  const { changeModalConfirmacao } = useContext(ModalContext)

  useEffect(() => {
    const closeOnEscapeKey = (e: { key: string }) => e.key === 'Escape' ? changeModalConfirmacao() : null
    document.body.addEventListener('keydown', closeOnEscapeKey)
    document.body.classList.add('no-scroll')

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
      document.body.classList.remove('no-scroll')
    }
  }, [changeModalConfirmacao])

  return (
    <ReactPortal containerId='confirmacao-root'>
      <Container>
        <Content>
          <Close>
            <X onClick={() => changeModalConfirmacao()}/>
          </Close>
          {component}
        </Content>
      </Container>
    </ReactPortal>
  )
}

export default ModalConfirmacao