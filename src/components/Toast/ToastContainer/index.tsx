import React, { useEffect, useState } from 'react'

import ToastMessage from '../ToastMessage'

import { toastEventManager } from '../../../utils/toast'

import { Container } from './styles'
import ReactPortal from '../../ReactPortal'

interface Message {
  id: number
  type: 'default' | 'success' | 'danger'
  text: string
  duration?: number
}

const Toast: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])

  const handleRamoveMessage = (id: number) => {
    setMessages((prevstate) => prevstate.filter((message) => message.id !== id))
  }

  useEffect(() => {
    const handleAddToast = ({ type, text, duration }: Message) => {
      setMessages((prevstate) => [
        ...prevstate,
        { id: Math.random(), type, text, duration }
      ])
    }

    toastEventManager.on('addtoast', handleAddToast)

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast)
    }
  }, [])
  return (
    <ReactPortal containerId='toastMessage'>
      <Container>
        {messages.map((message) => (
          <ToastMessage
            type={message.type}
            key={message.id}
            id={message.id}
            message={message.text}
            onRemoveMessage={handleRamoveMessage}
          />
        ))}
      </Container>
    </ReactPortal>
  )
}

export default Toast
