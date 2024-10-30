/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useContext, useEffect, useState } from 'react'

import EtapasContext from '../../contexts/etapasContext'
import AuthContext from '../../contexts/authContext'
import ModalContext from '../../contexts/modalContext'
import LoadingContext from '../../contexts/loadingContext'

import RdoRdaServices from '../../services/sgo/RdoRdaServices'

import dateFormat from '../../utils/dateFormat'
import { currencyFormat } from '../../utils/currencyFormat'
import { comprometidoValue, executadoValue } from '../../utils/calculateInfosObras'
import Toast from '../../utils/toast'

import EditLancamento from '../../pages/RdoRda/Edit'

import { Table, Td, Thead, Tr, Th } from './styles'

import { type Fornecedores, type LancamentoRdoRda } from '../../interfaces/globalInterfaces'

interface TypeInfos {
  infos: LancamentoRdoRda[]
  fornecedores: Fornecedores[]
  id?: string | number
}

const TableInfos: React.FC<TypeInfos> = ({ infos, fornecedores, id }) => {
  const {token} = useContext(AuthContext)
  const {changeLoading} = useContext(LoadingContext)
  const { etapas, subetapas } = useContext(EtapasContext)
  const {changeModal} = useContext(ModalContext)
  const sortLancamentos = infos.sort((a, b) => Number(a.data_lancamento) > Number(b.data_lancamento) ? -1 : 1)
  const lastLancamentos = sortLancamentos
  const [lancamentos, setLancamentos] = useState(lastLancamentos)

  const getLancamentos = useCallback(async () => {
    const response = await RdoRdaServices.getLancamentosRdo({token, type: 'rdo', id})

    setLancamentos(response.sort((a: { data_lancamento: any }, b: { data_lancamento: any }) => Number(a.data_lancamento) > Number(b.data_lancamento) ? -1 : 1))
    changeLoading(false, '')
  }, [changeLoading, id, token])

  const formatValue = (value?: string | null) => {
    if (!value) {
      return '-'
    }

    const formatedValue = currencyFormat(value)

    return formatedValue
  }

  const handleEditLancamento = async (id: number) => {
    changeLoading(true, 'Carregando dados do lançamento...')
    const response = await RdoRdaServices.getLancamentoRdo({token, type: 'rdo', id})

    if (response) {
      changeModal(<EditLancamento lancamento={response} />)
    } else {
      Toast({ type: 'danger', text: `Lançamento não encontrado.`, duration: 5000 })
    }
  }

  useEffect(() => {
    setInterval(() => {
      getLancamentos()
    }, 15000)
  }, [getLancamentos])

  useEffect(() => {
      getLancamentos()
  }, [])

  return (
    <div style={{overflowY: 'auto', maxHeight: 600,}}>
      <Table cellSpacing={0} cellPadding={0}>
        <Thead>
          <Tr $index>
            <Th $index><b>Data<br />lançamento</b></Th>
            <Th $index><b>Nº da NF</b></Th>
            <Th $index><b>Data emissão<br />NF</b></Th>
            <Th $index $large><b>Descrição</b></Th>
            <Th $index $medium><b>Etapa</b></Th>
            <Th $index $medium><b>Serviço</b></Th>
            <Th $index><b>Valor<br />comprometido</b></Th>
            <Th $index $large><b>Fornecedor</b></Th>
            <Th $index><b>Data<br />pagamento</b></Th>
            <Th $index><b>Valor<br />Pagamento</b></Th>
          </Tr>
          <Tr $total>
            <Th $index $total><b>Total</b></Th>
            <Th $index $total><b></b></Th>
            <Th $index $total><b></b></Th>
            <Th $index $total><b></b></Th>
            <Th $index $total><b></b></Th>
            <Th $index $total><b></b></Th>
            <Th $index $total><b>{comprometidoValue(lancamentos)}</b></Th>
            <Th $index $total><b></b></Th>
            <Th $index $total><b></b></Th>
            <Th $index $total><b>{executadoValue(lancamentos)}</b></Th>
          </Tr>
        </Thead>
        <tbody>
        {lancamentos.length >= 1 && lancamentos?.map((lancamento) => {
          const [fornecedor] = fornecedores.filter((item) => item.id === lancamento.fornecedor)
          const [etapa] = etapas.filter((item) => Number(item.id) === Number(lancamento.etapa))
          const [subetapa] = subetapas?.filter((item) => Number(item.id) === Number(lancamento?.subetapa))

          return (
            <Tr key={lancamento.id} onClick={() => handleEditLancamento(lancamento.id)}>
              <Td>{dateFormat(lancamento.data_lancamento)}</Td>
              <Td>{lancamento.nf}</Td>
              <Td>{dateFormat(lancamento.data_nf)}</Td>
              <Td $large>{}{lancamento.descricao?.length > 70 ? lancamento.descricao.slice(0, 70) + '...' : lancamento.descricao}</Td>
              <Td $medium>{etapa?.numero} - {etapa?.nome}</Td>
              <Td $medium>{subetapa?.numero} - {subetapa?.nome}</Td>
              <Td>{formatValue(lancamento.valor_comprometido)}</Td>
              <Td $medium>{fornecedor?.nome}</Td>
              <Td>{dateFormat(lancamento.data_pagamento)}</Td>
              <Td>{formatValue(lancamento.valor_pagamento)}</Td>
            </Tr>
          )
        })}
      </tbody>
    </Table>
  </div>
  )
}

export default TableInfos
