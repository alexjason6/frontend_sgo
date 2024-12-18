import React, { type ReactNode } from 'react'

import ReactPortal from '../ReactPortal'

import useModal from './useModal'

import { Close, Container, Content, X } from './styles'

interface TypeModal {
  component: ReactNode
  confirmation?: boolean
}

const Modal: React.FC<TypeModal> = ({ component, confirmation }) => {
  const {changeModal} = useModal()

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
