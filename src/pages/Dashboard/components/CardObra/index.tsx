import React from 'react'

import { Container, Title, Hr, Item, Value, Cliente } from './styles'

import { type TypeCardObras } from '../../../../interfaces/globalInterfaces'

const CardObra: React.FC<TypeCardObras> = ({ cliente, id, nome }) => {
  return (
    <Container>
      <Title>{nome}</Title>
      <Hr $title />

      <Item>Valor da obra <Value $valor>R$20.671.844,68</Value></Item>
      <Hr />

      <Item>Executado <Value $executado>R$4.410.752,77</Value></Item>
      <Hr />

      <Item>Comprometido <Value $comprometido>R$8.472.684,25</Value></Item>
      <Hr />

      <Item>Saldo <Value $saldo>R$7.788.407,66</Value></Item>
      <Hr />

      <Cliente>{cliente}</Cliente>
    </Container>
  )
}

export default CardObra
