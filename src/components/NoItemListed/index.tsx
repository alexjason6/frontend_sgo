import React, { useContext, type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

import ModalContext from '../../contexts/modalContext'

import Button from '../Button'
import CreateModelo from '../CreateOrEditItem/Itens/Modelos'

import { Container } from './styles'

interface NoItemListedParams {
  component: ReactElement
  text: string
  type?: string
}

const NoItemListed: React.FC<NoItemListedParams> = ({ component, text, type }) => {
  const navigate = useNavigate()
  const { changeModal } = useContext(ModalContext)

  const handleChangeModal = () => {
    if (type === 'modeloOrcamento') {
      return changeModal(<CreateModelo />)
    }

    navigate('/orcamentos/novo')
  }

  return (
    <Container>
      <p>{text}</p>
      <Button $blue onClick={() => handleChangeModal()}>Iniciar</Button>
    </Container>
  )
}

export default NoItemListed
