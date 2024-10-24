import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

import { GlobalContainer } from '../../assets/styles/global'

import RdoRdaContext from '../../contexts/rdoRdaContext'
import LoadingContext from '../../contexts/loadingContext'
import FornecedoresContext from '../../contexts/fornecedoresContext'
import ClientesContext from '../../contexts/clientesContext'

import Menu from '../../components/Menu'
import Header from '../../components/Header'
import TableInfos from '../../components/TableInfos'
import Button from '../../components/Button'
import Input from '../../components/Input'

import { Content, Infos } from './styles'

import { type LancamentoRdoRda } from '../../interfaces/globalInterfaces'

const RdoRda: React.FC = () => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { type, id } = params
  const { obra, cliente } = location.state
  const { changeLoading } = useContext(LoadingContext)
  const { fornecedores } = useContext(FornecedoresContext)
  const { rdos, rdas, lancamentosRdo, lancamentosRda } = useContext(RdoRdaContext)
  const {clientes} = useContext(ClientesContext)


  const [data, setData] = useState<LancamentoRdoRda[]>([])
  const [filteredData, setFilteredData] = useState<LancamentoRdoRda[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleChangeFilteredData = (event: { target: { value: string } }) => {
    const value = event.target.value
    setSearchTerm(value)

    if (value.length > 2) {
      const filter = data.filter(
        (data) =>
          data.descricao.toLowerCase().includes(value.toLowerCase()) ||
          data.nf.toString().toLowerCase().includes(value.toLowerCase()) ||
          data.valor_pagamento.toLowerCase().includes(value.toLowerCase())
      )

      setFilteredData(filter.sort((a, b) => a.valor_pagamento > b.valor_pagamento ? -1 : 1))
    } else {
      setFilteredData(data.sort((a, b) => a.valor_pagamento > b.valor_pagamento ? -1 : 1))
    }
  }

  const handleOpenModal = () => {
    const clienteId = clientes.find((item) => item.nome === cliente)

    navigate(`/obras/lancamentos/${type}/${obra}/novo`, {
      state: {
        obra,
        cliente,
        clienteId: clienteId?.id
      }
    })
  }

  useEffect(() => {
    if (!data || data.length === 0) {
      const [document] = type === 'rdo'
        ? rdos.filter((document) => document.id === Number(id))
        : rdas.filter((document) => document.id === Number(id))

      if (document) {
        const lancamentos = type === 'rdo'
          ? lancamentosRdo.filter((lancamento) => lancamento.rdo === document.id)
          : lancamentosRda.filter((lancamento) => lancamento.rdo === document.id)

        setData(lancamentos.sort((a, b) => a.valor_pagamento > b.valor_pagamento ? -1 : 1))
        setFilteredData(lancamentos.sort((a, b) => a.valor_pagamento > b.valor_pagamento ? -1 : 1))
      }

      changeLoading(false, '')
    }
  }, [])

  return (
    <GlobalContainer>
      <Menu />
      <Header title={type!.toUpperCase()} cliente={cliente} goBack/>
      <Content>
        <Infos>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button $blue onClick={handleOpenModal}>Novo lançamento</Button>
          </div>
          <div style={{ width: '100%', maxWidth: '300px', marginBottom: 20 }}>
            <Input
              placeholder='Digite a descrição, valor, fornecedor ou Nº da NF'
              value={searchTerm}
              onChange={handleChangeFilteredData}
            />
          </div>
          <TableInfos infos={filteredData} fornecedores={fornecedores} />
        </Infos>
      </Content>
    </GlobalContainer>
  )
}

export default RdoRda
