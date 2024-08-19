import React from 'react'

import { Container, Loader, Message } from './styles'
import ReactPortal from '../ReactPortal'

interface TypeLoading {
  message?: string | null | undefined
}

const Loading: React.FC<TypeLoading> = ({ message }) => {
  return (
    <ReactPortal containerId='loading-root'>
      <Container>
        <Loader />
        <Message>{message}</Message>
      </Container>
    </ReactPortal>
  )
}

export default Loading
