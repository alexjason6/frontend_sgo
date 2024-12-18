/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState, useEffect, useCallback } from 'react'
import moment from 'moment'

import { GlobalContainer, Legend } from '../../../assets/styles/global'

import ModalContext from '../../../contexts/modalContext'
import FornecedoresContext from '../../../contexts/fornecedoresContext'
import AuthContext from '../../../contexts/authContext'
import LoadingContext from '../../../contexts/loadingContext'
import EtapasContext from '../../../contexts/etapasContext'
import OrcamentosContext from '../../../contexts/orcamentosContext'
import ClientesContext from '../../../contexts/clientesContext'
import RdoRdaContext from '../../../contexts/rdoRdaContext'
import ObrasContext from '../../../contexts/obrasContext'

import RdoRdaServices from '../../../services/sgo/RdoRdaServices'
import RdoRdaMapper from '../../../services/mappers/RdoRdaMapper'

import Header from '../../../components/Header'
import Menu from '../../../components/Menu'
import FormGroup from '../../../components/FormGroup'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import Button from '../../../components/Button'
import CreateFornecedor from '../../../components/CreateOrEditItem/Itens/Fornecedores'

import dateFormat from '../../../utils/dateFormat'
import Toast from '../../../utils/toast'
import { currencyFormat } from '../../../utils/currencyFormat'

import { ButtonContainer, Content, Form, FormContent } from '../CreateLancamento/styles'

import { type TypeEditLancamento } from '../../../interfaces/globalInterfaces'
import CreateEtapa from '../../../components/CreateOrEditItem/Itens/Etapas'

const EditLancamento: React.FC<TypeEditLancamento> = ({ lancamento }) => {
  const { isOpen, changeModal } = useContext(ModalContext)
  const { changeLoading } = useContext(LoadingContext)
  const { token, user } = useContext(AuthContext)
  const { fornecedores, listFornecedores } = useContext(FornecedoresContext)
  const { listEtapas, listSubetapas } = useContext(EtapasContext)
  const { orcamentos, listOrcamentos } = useContext(OrcamentosContext)
  const { clientes, listClientes } = useContext(ClientesContext)
  const { lancamentosRdo, listRdos } = useContext(RdoRdaContext)
  const { obras } = useContext(ObrasContext)
  const [clienteObra] = obras.filter((item) => item.id === lancamento.obra)
  const [clienteName] = clientes.filter((item) => item.id === clienteObra.id_cliente)

  //const [descricaoItem, setDescricaoItem] = useState('')
  const typeDocument = 'RDO'
  const [dataVencimento, setDataVencimento] = useState<string>(dateFormat(lancamento.data_pagamento, false, 'reverse'))
  const [dataLancamento, setDataLancamento] = useState<string>(dateFormat(lancamento.data_lancamento, false, 'reverse'))
  const [nf, setNf] = useState<string>(String(lancamento?.nf))
  const [dataNf, setDataNf] = useState<string>(dateFormat(lancamento.data_nf, false, 'reverse'))
  const [valorPagamento, setValorPagamento] = useState<string>(String(lancamento.valor_pagamento))
  const [fornecedor, setFornecedor] = useState<number>(lancamento.fornecedor)
  const [contratoExists, setContratoExists] = useState<number>(0)
  const [contrato, setContrato] = useState<number>()
  const [observacao, setObservacao] = useState<string>(lancamento.observacao)
  const [descricao, setDescricao] = useState<string>(lancamento.descricao)
  const [etapa, setEtapa] = useState<string>(lancamento.etapa)
  const [subetapa, setSubetapa] = useState<string>(lancamento.subetapa)
  const [comprovante, setComprovante] = useState<string>(lancamento?.comprovante!)
  const parcela = lancamento.parcela
  const [situacao, setSituacao] = useState<number>(lancamento.situacao)
  const obra = lancamento.obra
  const cliente = lancamento.cliente
  const [orcamentoSelected] = orcamentos.filter((item) => Number(item.obra) === Number(obra) || Number(item.obra === Number(obra)))
  const etapaSelected = etapa
  const subetapaFiltered = orcamentoSelected?.subitem.filter((item) => item.etapa === Number(etapaSelected))

  const handleEditLancamento = async () => {
    try {
      changeLoading(true, 'Alterando lançamento...')

      const [fornecedorSelecionado] = fornecedores.filter((item) => item.id === fornecedor)
      const { banco, agencia, conta, tipo_conta, pix } = fornecedorSelecionado

      const infos = {
        id: lancamento.id,
        rdo: lancamento.rdo,
        dataLancamento: String(moment(dataLancamento).unix()),
        nf,
        dataNf: String(moment(dataNf).unix()),
        valorComprometido: contrato ? valorPagamento?.replace('R$ ', '')?.replace(',', '.') : '',
        valorPagamento: !contrato ? valorPagamento?.replace('R$ ', '')?.replace(',', '.') : '',
        dataPagamento: String(moment(dataVencimento).unix()),
        usuario: user?.id,
        observacao,
        descricao,
        parcela,
        obra,
        situacao,
        banco,
        agencia,
        conta,
        tipo_conta,
        pix,
        etapa,
        subetapa,
        fornecedor,
        boletos: [],
        cliente,
        comprovante,
        status: situacao
      }

      const mapperLancamento = RdoRdaMapper.toPersistence(infos)
      await RdoRdaServices.updateLancamento({ token, mapperLancamento, type: typeDocument, id: infos.id })

      Toast({ type: 'success', text: 'Lançamento alterado com sucesso.', duration: 5000 })
    } catch (error) {
      console.error('Erro ao editar o lançamento:', error)
      Toast({ type: 'danger', text: 'Erro ao editar o lançamento.', duration: 5000 })
    } finally {
      changeLoading(false)
      listRdos({ token })
    }
  }

  const handleChangeValor = (value: string) => {
    const onlyNumbers = value.replace(/[^\d,]/g, "")
    const formattedValue = currencyFormat(onlyNumbers);

    setValorPagamento(formattedValue)
  }

  const handleChangeFornecedor = (value: string) => {
    if (value === '0') {
      changeModal(<CreateFornecedor />)
    } else {
      setFornecedor(Number(value))
    }
  }

  const handleDeleteLancamento = async (id: number) => {
    changeLoading(true, 'Enviando dados...')
    try {
      const apagar = await RdoRdaServices.deleteLancamentosRdo({ token, id })

      if (apagar.status === 'ok') {
        Toast({ type: 'success', text: 'Lançamento apagado com sucesso.', duration: 5000 })
        changeModal(false)
      }
    }  catch (error) {
      console.error('Erro ao apagar o lançamento:', error)
      Toast({ type: 'danger', text: 'Erro ao apagar o lançamento.', duration: 5000 })
    } finally {
      changeLoading(false)
    }
  }

  const getData = useCallback(async () => {
    await listFornecedores({ token })

    await listClientes({ token })

    await listOrcamentos({ token })

    await listEtapas({ token })

    await listSubetapas({ token })

    changeLoading(false)
  }, [listClientes, listFornecedores, listOrcamentos, listEtapas, listSubetapas, token, changeLoading])

  useEffect(() => {
    void getData()
  }, [getData])


  return (
    <GlobalContainer $modal>
      {!isOpen && <Menu />}
      <Header title={`Edição lançamento em ${typeDocument}`} fullwidth={!!isOpen} cliente={clienteName.nome} goBack={!isOpen} />
      <Content $fullwidth={!!isOpen}>
        <Form>
          <FormContent>
            <FormGroup oneOfFour>
              <Legend>Cliente:</Legend>
              <Input value={clienteName.nome} readOnly />
            </FormGroup>

            <FormGroup oneOfFour>
              <Legend>Fornecedor:</Legend>
              <Select value={fornecedor} onChange={(e) => {
                  if (e.target.value === '0') {
                    changeModal(<CreateFornecedor />)
                    return
                  }
                  handleChangeFornecedor(e.target.value)
                  }}>
                <option value=''>Selecione um fornecedor</option>
                <option value="0">Cadastrar novo fornecedor</option>
                <option disabled>________________________________</option>
                {fornecedores.map((item) => (
                  <option key={item.id} value={item.id}>{item.nome}</option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>É contrato?</Legend>
              <Select value={contratoExists} onChange={(event) => setContratoExists(Number((event.target as HTMLSelectElement).value))}>
                <option value={1}>Sim</option>
                <option value={0}>Não</option>
              </Select>
            </FormGroup>

            {contratoExists === 1 && <FormGroup oneOfFive>
              <Legend >Abater do contrato:</Legend>
              <Select value={contrato} onChange={(event) => setContrato(Number((event.target as HTMLSelectElement).value))}>
                <option  value=''>Selecione o contrato</option>
                <option>Novo contrato</option>
                <option disabled>________________________________</option>
                {lancamentosRdo.filter((lancamentoFilter) => lancamentoFilter.valor_comprometido).map((lancamento, index) => {
                  const fornecedor = fornecedores.find((item) => item.id === lancamento.fornecedor)
                  return (
                  <option value={lancamento.id} key={index}>Contrato NF: {lancamento.nf} - {dateFormat(lancamento.data_lancamento)} - {fornecedor?.nome} - {currencyFormat(String(lancamento.valor_comprometido))}</option>
                )})}
              </Select>
            </FormGroup>}

            <FormGroup oneOfFive>
              <Legend>Data lançamento:</Legend>
              <Input type='date' value={dataLancamento} onChange={(event) => setDataLancamento(event?.target.value)} />
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Nº da NF:</Legend>
              <Input type='textl' placeholder='Ex.: 123456' value={nf} onChange={(event) => setNf(event.target.value)} />
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Data emissão NF:</Legend>
              <Input type='date' value={dataNf} onChange={(event) => setDataNf(event.target.value)} />
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Descrição:</Legend>
              <Input type='text' value={observacao} onChange={(event) => setObservacao(event.target.value)} placeholder='Ex.: Pagamento medição.' />
            </FormGroup>
          </FormContent>

          <Header title='Itens do lançamento' subHeader modal={!!isOpen} fullwidth />
          <FormContent $items>
            <FormGroup oneOfFive>
              <Legend>Etapa:</Legend>
              <Select onChange={(e) => {
                  if (e.target.value === '0') {
                    changeModal(<CreateFornecedor />)
                    return
                  }
                  setEtapa(e.target.value)}}
                  defaultValue={etapa}>
                <option value="">Selecione uma etapa</option>
                <option value='0'>Cadastrar nova etapa</option>
                <option disabled>________________________________</option>
                {orcamentoSelected?.item.filter((item) => item.nome !== '').map((etapa, index) => {
                  return (
                  <option key={index} value={etapa.id}>{etapa.numero} - {etapa.nome}</option>
                )})}
              </Select>
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Subetapa:</Legend>
              <Select onChange={(e) => {
                  if (e.target.value === '0') {
                    changeModal(<CreateEtapa/>)
                    return
                  }
                  setSubetapa(e.target.value)}} defaultValue={subetapa}>
                <option value="">Selecione uma subetapa</option>
                <option value='0'>Cadastrar nova subetapa</option>
                <option disabled>________________________________</option>
                {subetapaFiltered?.filter((item, index, self) => index === self.findIndex((t) => t.id === item.id)).map((subetapa, index) => {
                  return (
                  <option key={index} value={subetapa?.id}>{subetapa?.numero} - {subetapa?.nome}</option>
                )})}
              </Select>
            </FormGroup>

            <FormGroup oneOfFour>
              <Legend>Descrição:</Legend>
              <Input type='text' placeholder='Digite a descrição do lançamento' value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Valor:</Legend>
              <Input type='text' value={valorPagamento} placeholder='Ex.: R$5.022,53' onChange={(e) => handleChangeValor(e.target.value)} />
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Vencimento:</Legend>
              <Input placeholder='Ex.: 28' value={dataVencimento} type='date' onChange={(event) => setDataVencimento(event?.target.value)} />
            </FormGroup>
          </FormContent>
        </Form>

        <ButtonContainer>
          <p onClick={() => handleDeleteLancamento(lancamento.id)}>Deletar lançamento</p>
          <Button $green onClick={handleEditLancamento}>Gravar lançamento</Button>
        </ButtonContainer>
      </Content>
    </GlobalContainer>
  )
}

export default EditLancamento
