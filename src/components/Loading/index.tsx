import React from 'react'
import ReactPortal from '../ReactPortal'

import { Container, Loader, Message } from './styles'

interface TypeLoading {
  message?: string | null | undefined
}

const Loading: React.FC<TypeLoading> = ({ message }) => {
  return (
    <ReactPortal containerId='loading-root'>
      <Container>
        <Loader />
        <Message>{message ?? 'Aguarde...'}</Message>
      </Container>
    </ReactPortal>
  )
}

export default Loading
