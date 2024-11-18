import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

import { GlobalContainer } from '../../assets/styles/global'

import RdoRdaContext from '../../contexts/rdoRdaContext'
import FornecedoresContext from '../../contexts/fornecedoresContext'
import LoadingContext from '../../contexts/loadingContext'
import ModalContext from '../../contexts/modalContext'
import ObrasContext from '../../contexts/obrasContext'
import OrcamentosContext from '../../contexts/orcamentosContext'

import Menu from '../../components/Menu'
import Header from '../../components/Header'
import TableInfos from '../../components/TableInfos'
import Button from '../../components/Button'
import Input from '../../components/Input'
import FormGroup from '../../components/FormGroup'
import RdoRdaPdf from './components/PDF'

import { ExportLancamentosXLSX } from '../../utils/createXlsx'
import Toast from '../../utils/toast'

import { Content, Infos, Pdf, Xlsx } from './styles'

import { type LancamentoRdoRda } from '../../interfaces/globalInterfaces'

const RdoRda: React.FC = () => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const { type, id } = params
  const { obra, cliente, clienteId, infos } = location.state
  const { fornecedores } = useContext(FornecedoresContext)
  const { rdos, rdas, lancamentosRdo, lancamentosRda } = useContext(RdoRdaContext)
  const { orcamentos } = useContext(OrcamentosContext);
  const { obras } = useContext(ObrasContext)

  const { changeLoading } = useContext(LoadingContext)
  const { changeModal } = useContext(ModalContext)

  const [data, setData] = useState<LancamentoRdoRda[]>(infos || [])
  const [filteredData, setFilteredData] = useState<LancamentoRdoRda[]>(infos || [])
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

    navigate(`/obras/lancamentos/${type}/${obra}/novo`, {
      state: {
        obra,
        cliente,
        clienteId: clienteId
      }
    })
  }

  const createDoc = async (lancamentos: any, type: string) => {
    if (type === 'excel') {
      try {
        ExportLancamentosXLSX({ lancamentos, orcamentos, obras, cliente })
      } catch (error) {
        console.error('Erro ao gerar o arquivo Excel:', error);
        return Toast({ type: 'danger', text: 'Erro ao gerar arquivo para excel.', duration: 5000 });
      }
    }

    if (type === 'pdf') {
      changeLoading(true, 'Gerando arquivo...')

      try {
        changeModal(<RdoRdaPdf lancamentos={lancamentos} />)
      } catch (error) {
        changeLoading(false)
        console.error("Erro ao gerar PDF:", error);
        Toast({ type: 'danger', text: 'Erro ao gerar PDF.', duration: 5000 });
      }
    }
  };

  useEffect(() => {
    if (!data || data.length === 0) {
      const [document] = type === 'rdo'
        ? rdos.filter((document) => document.id === Number(id))
        : rdas.filter((document) => document.id === Number(id))

      if (document) {
        const lancamentos = type === 'rdo'
          ? lancamentosRdo?.filter((lancamento) => lancamento.rdo === document.id)
          : lancamentosRda?.filter((lancamento) => lancamento.rdo === document.id)

        setData(lancamentos.sort((a, b) => a.valor_pagamento > b.valor_pagamento ? -1 : 1))
        setFilteredData(lancamentos.sort((a, b) => a.valor_pagamento > b.valor_pagamento ? -1 : 1))
      }
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
          <div style={{ width: '100%', marginBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <FormGroup oneOfFive>
              <Input
                placeholder='Digite a descrição, valor, fornecedor ou Nº da NF'
                value={searchTerm}
                onChange={handleChangeFilteredData}
              />
            </FormGroup>
            <div>
              <Pdf onClick={() => createDoc(infos || filteredData.filter((filter) => filter.rdo === Number(id)), 'pdf')} />
              <Xlsx onClick={() => createDoc(infos || filteredData.filter((filter) => filter.rdo === Number(id)), 'excel')} />
            </div>
          </div>
          <TableInfos infos={infos || filteredData.filter((filter) => filter.rdo === Number(id))} fornecedores={fornecedores} id={obra} />
        </Infos>
      </Content>
    </GlobalContainer>
  )
}

export default RdoRda
