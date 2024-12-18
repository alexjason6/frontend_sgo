import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

import { GlobalContainer } from '../../assets/styles/global'

import RdoRdaServices from '../../services/sgo/RdoRdaServices'

import RdoRdaContext from '../../contexts/rdoRdaContext'
import FornecedoresContext from '../../contexts/fornecedoresContext'
import LoadingContext from '../../contexts/loadingContext'
import ModalContext from '../../contexts/modalContext'
import ObrasContext from '../../contexts/obrasContext'
import OrcamentosContext from '../../contexts/orcamentosContext'
import EtapasContext from '../../contexts/etapasContext'
import AuthContext from '../../contexts/authContext'

import Menu from '../../components/Menu'
import Header from '../../components/Header'
import TableInfos from '../../components/TableInfos'
import Button from '../../components/Button'
import Input from '../../components/Input'
import FormGroup from '../../components/FormGroup'
import RdoRdaPdf from './components/PDF'

import { ExportLancamentosXLSX } from '../../utils/createXlsx'
import Toast from '../../utils/toast'
import dateFormat from '../../utils/dateFormat'

import { Content, Infos, Pdf, Xlsx, TextFilter } from './styles'

import { type LancamentoRdoRda } from '../../interfaces/globalInterfaces'

const RdoRda: React.FC = () => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const { type, id } = params
  const { obra, cliente, clienteId, infos } = location.state
  const {token} = useContext(AuthContext)
  const { fornecedores } = useContext(FornecedoresContext)
  const { rdos, rdas, lancamentosRdo, lancamentosRda } = useContext(RdoRdaContext)
  const { orcamentos } = useContext(OrcamentosContext);
  const { obras } = useContext(ObrasContext)
  const { etapas, subetapas } = useContext(EtapasContext)
  const { changeLoading } = useContext(LoadingContext)
  const { changeModal } = useContext(ModalContext)

  const [data, setData] = useState<LancamentoRdoRda[]>(infos || [])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [dataSearchStart, setDataSearchStart] = useState<string>('')
  const [dataSearchEnd, setDataSearchEnd] = useState<string>('')

  const filteredData = useMemo(() => {
    if (searchTerm.length > 2 && (dataSearchStart.length < 1 && dataSearchEnd.length < 1)){
      return data.filter(
        (dataItem) =>
          dataItem.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dataItem.nf.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
          dataItem.valor_pagamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dataItem.valor_comprometido?.toLowerCase().includes(searchTerm.toLowerCase())
      ).sort((a, b) => (a.valor_pagamento > b.valor_pagamento ? 1 : -1));
    }

    if (searchTerm.length === 0 && (dataSearchStart.length > 2 && dataSearchEnd.length > 2)) {
      return data
        .filter((a) => dateFormat(a.data_lancamento, false, 'reverse') >= dataSearchStart)
        .filter((b) => dateFormat(b.data_lancamento, false, 'reverse') <= dataSearchEnd)
        .sort((a,b) => a.data_lancamento > b.data_lancamento ? 1 : -1);
    }

    return data.sort((a, b) => (a.data_lancamento > b.data_lancamento ? -1 : 1));
  }, [data, searchTerm, dataSearchStart, dataSearchEnd]);

  const handleChangeFilteredData = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {

    if (type === 'text') {
      setSearchTerm(event.target.value);
    }

    if (type === 'dateStart') {
      setSearchTerm('')
      setDataSearchStart(event.target.value)
    }

    if (type === 'dateEnd') {
      setSearchTerm('')
      setDataSearchEnd(event.target.value)
    }

  };

  const handleOpenModal = () => {
    const [document] = type === 'rdo'
    ? rdos.filter((document) => document.id === Number(id))
    : rdas.filter((document) => document.id === Number(id))

    navigate(`/obras/lancamentos/${type}/${document.id}/novo`, {
      state: {
        rdoRda: id,
        obra,
        cliente,
        clienteId: clienteId
      }
    })
  }

  const createDoc = async (lancamentos: any, type: string) => {
    if (type === 'excel') {
      try {
        ExportLancamentosXLSX({ lancamentos, orcamentos, obras, cliente, etapas, subetapas })
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

  const getLancamentos = useCallback(async () => {
    try {
      const response = await RdoRdaServices.getLancamentosRdo({ token, type: "rdo", id: obra });

      if (response && response.length > 0) {
        setData(
          response.sort((a: { data_lancamento: any }, b: { data_lancamento: any }) =>
            Number(a.data_lancamento) > Number(b.data_lancamento) ? 1 : -1
          )
        );
      }
    } catch (error) {
      Toast({ type: "danger", text: "Erro ao carregar lançamentos", duration: 5000 });
    } finally {
      changeLoading(false, "");
    }
  }, [changeLoading, id, token, obra]);

  useEffect(() => {
    getLancamentos();

    const interval = setInterval(() => {
      getLancamentos();
    }, 5000);

    return () => clearInterval(interval);
  }, [getLancamentos]);

    useEffect(() => {
    if (infos && infos.length > 0) {
      setData(
        infos.sort((a: { valor_pagamento: number }, b: { valor_pagamento: number }) => (a.valor_pagamento > b.valor_pagamento ? 1 : -1))
      );
    }
  }, [infos]);

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
            <FormGroup oneOfFour>
              <Input
                placeholder='Digite a descrição, valor, fornecedor ou Nº da NF'
                value={searchTerm}
                onChange={(event) => handleChangeFilteredData('text', event)}
              />
            </FormGroup>

            <FormGroup oneOftree>
              <TextFilter>Lançamentos de: <Input $listData $dateFilter type='date' onChange={(event) => handleChangeFilteredData('dateStart', event)} /> a <Input $listData $dateFilter type='date' onChange={(event) => handleChangeFilteredData('dateEnd', event)}/></TextFilter>
            </FormGroup>

            <div style={{marginBottom: 10}}>
              <Pdf onClick={() => createDoc(filteredData.filter((filter) => filter.rdo === Number(id)), 'pdf')} />
              <Xlsx onClick={() => createDoc(filteredData.filter((filter) => filter.rdo === Number(id)), 'excel')} />
            </div>
          </div>
          <TableInfos
            infos={filteredData.filter((filter) => filter.rdo === Number(id))}
            fornecedores={fornecedores}
            id={obra}
            etapas={etapas}
            subetapas={subetapas}
          />
        </Infos>
      </Content>
    </GlobalContainer>
  )
}

export default RdoRda
