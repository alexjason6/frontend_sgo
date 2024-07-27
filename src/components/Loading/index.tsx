import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import { Container, Loader, Message } from './styles'

export default function Loading ({ light, message }: { light: boolean, message: string }) {
  const [localMessage, setLocalMessage] = useState('carregando...')
  const element = document.getElementById('loader-root')

  useEffect(() => {
    setLocalMessage(message)
  }, [message])

  return ReactDOM.createPortal(
    <Container light={light}>
      <Loader light={light} />
      <Message light={light}>{localMessage}</Message>
    </Container>,
    element!
  )
}

Loading.propTypes = {
  light: PropTypes.bool,
  message: PropTypes.string
}
