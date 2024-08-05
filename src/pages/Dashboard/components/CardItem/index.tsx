import React from 'react'

import Button from '../../../../components/Button'

import { Container, Title, Hr, Item, Value, Cliente } from './styles'

import { type TypeCardItem } from '../../../../interfaces/globalInterfaces'

const CardItem: React.FC<TypeCardItem> = ({ cliente, type, nome }) => {
  return (
    <Container>
      <Title>{nome}</Title>
      <Hr $title />
      {type === 'obra'
        ? (
        <>
          <Item>Valor da obra <Value $valor>R$20.671.844,68</Value></Item>
          <Hr />

          <Item>Executado <Value $executado>R$4.410.752,77</Value></Item>
          <Hr />

          <Item>Comprometido <Value $comprometido>R$8.472.684,25</Value></Item>
          <Hr />

          <Item>Saldo <Value $saldo>R$7.788.407,66</Value></Item>
          <Hr />

        </>
          )
        : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Button $rdoRda $stroke>Abrir {type === 'rdo' ? 'RDO' : 'RDA'}</Button>
          <Button $rdoRda $blue>Criar lancamento</Button>
        </div>
          )}
        <Cliente>{cliente}</Cliente>
    </Container>
  )
}

export default CardItem
