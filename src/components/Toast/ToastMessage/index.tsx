import React, { useEffect } from 'react'
import { FiXCircle, FiCheckCircle } from 'react-icons/fi'

import { Container } from './styles'

interface TypeToastMessage {
  id: number
  message: string
  type?: 'default' | 'danger' | 'success'
  duration?: number
  onRemoveMessage: (id: number) => void
}

const ToastMessage: React.FC<TypeToastMessage> = ({ message, id, type = 'default', duration, onRemoveMessage }) => {
  const handleRemoveToast = () => {
    onRemoveMessage(id)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      onRemoveMessage(id)
    }, duration ?? 7000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <Container $type={type} onClick={handleRemoveToast} role='button'>
      {type === 'danger' && <FiXCircle size={20} color='#ffffff'/>}
      {type === 'success' && <FiCheckCircle size={20} color='#ffffff'/>}
      <strong>{message}</strong>
    </Container>
  )
}

export default ToastMessage
