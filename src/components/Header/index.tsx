import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Container, Title, Divisor, Back, GoBack } from './styles'

import { type TypeHeader } from '../../interfaces/globalInterfaces'

const Header: React.FC<TypeHeader> = ({ title, subHeader, goBack }) => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Container $subHeader={subHeader}>
      <Title>{title}</Title>
      {goBack && <GoBack onClick={handleGoBack}><Back /><p>Voltar</p></GoBack>}
      <Divisor $subHeader={subHeader}/>
    </Container>
  )
}

export default Header
