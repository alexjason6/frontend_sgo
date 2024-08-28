import React, { useContext } from 'react'

import OrcamentosContext from '../../contexts/orcamentosContext'

import dateFormat from '../../utils/dateFormat'
import { numberFormat } from '../../utils/numberFormat'
import { currencyFormat } from '../../utils/currencyFormat'
import { comprometidoValue, executadoValue } from '../../utils/calculateInfosObras'

import { Table, Td, Tr } from './styles'

import { type Fornecedores, type LancamentoRdoRda } from '../../interfaces/globalInterfaces'

interface TypeInfos {
  infos: LancamentoRdoRda[]
  fornecedores: Fornecedores[]
}

const TableInfos: React.FC<TypeInfos> = ({ infos, fornecedores }) => {
  const sortLancamentos = infos.sort((a, b) => Number(a.data_lancamento) > Number(b.data_lancamento) ? -1 : 1)
  const lastLancamentos = sortLancamentos.slice(-15)
  const { itens } = useContext(OrcamentosContext)

  const formatValue = (value?: string | null) => {
    if (!value) {
      return '-'
    }

    const formatedValue = currencyFormat(value)

    return formatedValue
  }

  return (
    <Table cellSpacing={0} cellPadding={0}>
      <tbody>
        <Tr $index>
          <Td $index><b>Data<br />lançamento</b></Td>
          <Td $index><b>Nº da NF</b></Td>
          <Td $index><b>Data emissão<br />NF</b></Td>
          <Td $index $large><b>Descrição</b></Td>
          <Td $index $medium><b>Etapa</b></Td>
          <Td $index $medium><b>Serviço</b></Td>
          <Td $index><b>Valor<br />comprometido</b></Td>
          <Td $index $large><b>Fornecedor</b></Td>
          <Td $index><b>Data<br />pagamento</b></Td>
          <Td $index><b>Valor<br />Pagamento</b></Td>
        </Tr>
        <Tr $total>
          <Td $index $total><b>Total</b></Td>
          <Td $index $total><b></b></Td>
          <Td $index $total><b></b></Td>
          <Td $index $total><b></b></Td>
          <Td $index $total><b></b></Td>
          <Td $index $total><b></b></Td>
          <Td $index $total><b>{comprometidoValue(infos)}</b></Td>
          <Td $index $total><b></b></Td>
          <Td $index $total><b></b></Td>
          <Td $index $total><b>{executadoValue(infos)}</b></Td>

        </Tr>
      {lastLancamentos.map((lancamento) => {
        const [fornecedor] = fornecedores.filter((item) => item.id === lancamento.fornecedor)
        const [etapa] = itens.filter((item) => item.id === Number(lancamento.etapa))

        return (
          <React.Fragment key={lancamento.id}>
            <Tr>
              <Td>{dateFormat(lancamento.data_lancamento)}</Td>
              <Td>{numberFormat(lancamento.nf)}</Td>
              <Td>{dateFormat(lancamento.data_nf)}</Td>
              <Td $large>{lancamento.descricao}</Td>
              <Td $medium>{etapa.nome}</Td>
              <Td $medium>{lancamento.subetapa}</Td>
              <Td>{formatValue(lancamento.valor_comprometido)}</Td>
              <Td $large>{fornecedor?.nome}</Td>
              <Td>{dateFormat(lancamento.data_pagamento)}</Td>
              <Td>{formatValue(lancamento.valor_pagamento)}</Td>
            </Tr>
          </React.Fragment>
        )
      })}
    </tbody>
  </Table>
  )
}

export default TableInfos
