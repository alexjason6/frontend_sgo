import React, { useContext, type ReactElement } from 'react'

import ModalContext from '../../contexts/modalContext'

import Button from '../Button'

import { Container } from './styles'

interface NoItemListedParams {
  component: ReactElement
  text: string
}

const NoItemListed: React.FC<NoItemListedParams> = ({ component, text }) => {
  const { changeModal } = useContext(ModalContext)

  const handleChangeModal = () => {
    changeModal(component)
  }

  return (
    <Container>
      <p>{text}</p>
      <Button $blue onClick={() => handleChangeModal()}>Iniciar</Button>
    </Container>
  )
}

export default NoItemListed
