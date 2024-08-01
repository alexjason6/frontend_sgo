import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { Container, Loader, Message } from './styles'

interface TypeLoading {
  light?: boolean
  message?: string | null | undefined
}

const Loading: React.FC<TypeLoading> = ({ light, message }) => {
  const [localMessage, setLocalMessage] = useState<string | undefined | null>('carregando...')
  const element = document.getElementById('loader-root')

  useEffect(() => {
    setLocalMessage(message)
  }, [message])

  return ReactDOM.createPortal(
    <Container $light={light}>
      <Loader className='box' $light={light} />
      <Message $light={light}>{localMessage}</Message>
    </Container>,
    element!
  )
}

export default Loading
