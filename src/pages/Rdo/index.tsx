/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { GlobalContainer } from '../../assets/styles/global'

import RdoRdaContext from '../../contexts/rdoRdaContext'
import LoadingContext from '../../contexts/loadingContext'

import Menu from '../../components/Menu'
import Header from '../../components/Header'
import TableInfos from '../../components/TableInfos'
import Button from '../../components/Button'

import { Content, Infos } from './styles'

import { type LancamentoRdoRda } from '../../interfaces/globalInterfaces'
import Input from '../../components/Input'

const RdoRda: React.FC = () => {
  const { type, id } = useParams()
  const { changeLoading } = useContext(LoadingContext)
  const { rdos, rdas, lancamentosRdo, lancamentosRda } = useContext(RdoRdaContext)
  const [data, setData] = useState<LancamentoRdoRda[]>([])
  const [filteredData, setFilteredData] = useState<LancamentoRdoRda[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleChangeFilteredData = (event: { target: { value: string } }) => {
    const value = event.target.value
    setSearchTerm(value)

    if (value.length > 2) {
      const filter = data.filter(
        (data) => data.descricao.toLowerCase().includes(value.toLowerCase()) ||
          data.nf.toString().toLowerCase().includes(value.toLowerCase()) ||
          data.valor_pagamento.toLowerCase().includes(value.toLowerCase())
      )

      setFilteredData(filter.sort((a, b) => a.valor_pagamento > b.valor_pagamento ? -1 : 1))
    }

    if (value.length <= 2) {
      setFilteredData(data.sort((a, b) => a.valor_pagamento > b.valor_pagamento ? -1 : 1))
    }
  }

  useEffect(() => {
    if (!data || data.length === 0) {
      const [document] = type === 'rdo' ? rdos.filter((document) => document.id === Number(id)) : rdas.filter((document) => document.id === Number(id))
      const lancamentos = type === 'rdo' ? lancamentosRdo.filter((lancamento) => lancamento.rdo === document.id) : lancamentosRda.filter((lancamento) => lancamento.rdo === document.id)

      setData(lancamentos.sort((a, b) => a.valor_pagamento > b.valor_pagamento ? -1 : 1))
      setFilteredData(lancamentos.sort((a, b) => a.valor_pagamento > b.valor_pagamento ? -1 : 1))

      changeLoading(false, '')
    }
  }, [])

  return (
    <GlobalContainer>
      <Menu />
      <Header title={type!.toUpperCase()} cliente='Viana Flex' goBack/>
      <Content>
        <Infos>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button $blue>Novo lançamento</Button>
          </div>
          <div style={{ width: '100%', maxWidth: '300px', marginBottom: 20 }}>
            <Input
              placeholder='Digite a descrição, valor, fornecedor ou Nº da NF'
              value={searchTerm}
              onChange={(event) => handleChangeFilteredData(event)}
            />
          </div>
          <TableInfos infos={filteredData} />
        </Infos>
      </Content>
    </GlobalContainer>
  )
}

export default RdoRda