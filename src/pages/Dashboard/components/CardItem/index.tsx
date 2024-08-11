/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useContext } from 'react'

import Button from '../../../../components/Button'

import ResumoObra from '../../../Obras/Resumo'

// import { orcamentosDb } from '../../../../assets/database/orcamentos'
import { itensOrcamentoDb } from '../../../../assets/database/itensOrcamentos'

import { Container, Title, Hr, Item, Value, Cliente } from './styles'

import { type Obra, type TypeCardItem } from '../../../../interfaces/globalInterfaces'
import { lancamentosRdoDb } from '../../../../assets/database/lancamentosRdo'
import { rdosDb } from '../../../../assets/database/rdos'
import ModalContext from '../../../../contexts/modalContext'
// import { orcamentosDb } from '../../../../assets/database/orcamentos'

const CardItem: React.FC<TypeCardItem> = ({ cliente, type, nome, item, id }) => {
  const { changeModal } = useContext(ModalContext)
  // const orcamento = orcamentosDb.filter((itemDb) => itemDb.obra === id)
  const rdo = rdosDb.find((file) => file.obra === id)
  const lancamentos = lancamentosRdoDb.filter((lancamento) => lancamento.obra === rdo?.id)
  const valorOrcamento = itensOrcamentoDb.reduce<number>((accumulator, valor) => {
    return accumulator + Number(valor.valor_total)
  }, 0)
  const valorExecutado = lancamentos.reduce<number>((accumulator, valor) => {
    return accumulator + Number(valor.valor_pagamento)
  }, 0)
  const valorComprometido = lancamentos.reduce<number>((accumulator, valor) => {
    return accumulator + Number(valor.valor_comprometido)
  }, 0)
  const saldoOrcamento = valorOrcamento - (valorComprometido + valorExecutado)

  const handleClickCard = () => {
    changeModal(<ResumoObra
      saldo={saldoOrcamento}
      orcamento={valorOrcamento}
      executado={valorExecutado}
      comprometido={valorComprometido}
      obra={item as Obra}
    />)
  }

  return (
    <Container>
      <div onClick={type === 'obra' ? handleClickCard : undefined}>
        <Title>{nome}</Title>
        <Hr $title />
        {type === 'obra'
          ? (
            <>
              <Item>Valor da obra <Value $valor>{Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(valorOrcamento)}</Value></Item>
              <Hr />

              <Item>Executado <Value $executado>{Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(valorExecutado)}</Value></Item>
              <Hr />

              <Item>Comprometido <Value $comprometido>{Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(valorComprometido)}</Value></Item>
              <Hr />

              <Item>Saldo <Value $saldo>{Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(saldoOrcamento)}</Value></Item>
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
      </div>
    </Container>
  )
}

export default CardItem
