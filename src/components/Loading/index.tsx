import React from 'react'
import ReactDOM from 'react-dom'

import { Container, Loader, Message } from './styles'

interface TypeLoading {
  message?: string | null | undefined
}

const Loading: React.FC<TypeLoading> = ({ message }) => {
  const element = document.getElementById('loader-root')

  return ReactDOM.createPortal(
    <Container>
      <Loader />
      <Message>{message}</Message>
    </Container>,
    element!
  )
}

export default Loading
