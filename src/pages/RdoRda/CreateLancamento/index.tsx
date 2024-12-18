/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState, type Dispatch, type SetStateAction, type ChangeEvent, useEffect, useCallback } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FiPlus, FiX } from 'react-icons/fi'
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

import RdoRdaServices from '../../../services/sgo/RdoRdaServices'
import RdoRdaMapper from '../../../services/mappers/RdoRdaMapper'

import Header from '../../../components/Header'
import Menu from '../../../components/Menu'
import FormGroup from '../../../components/FormGroup'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import Button from '../../../components/Button'
import ToggleSwitch from '../../../components/ToggleSwitch'
import Toast from '../../../utils/toast'

import { currencyFormat } from '../../../utils/currencyFormat'

import { AddItem, ButtonContainer, Content, Divisor, Form, FormContent } from './styles'

import { type TypeNewLancamento } from '../../../interfaces/globalInterfaces'
import { onlyNumberFormat } from '../../../utils/onlyNumbersFormat'
import dateFormat from '../../../utils/dateFormat'
import CreateFornecedor from '../../../components/CreateOrEditItem/Itens/Fornecedores'


const CreateLancamento: React.FC<TypeNewLancamento> = ({ tipo, rdoRda, nameCliente, obraId, cliente_id }) => {
  const { type, id } = useParams()
  const navigate = useNavigate()
  const { obra, clienteId, cliente } = useLocation().state
  const { isOpen, changeModal } = useContext(ModalContext)
  const { changeLoading } = useContext(LoadingContext)
  const { token, user } = useContext(AuthContext)
  const { fornecedores, listFornecedores } = useContext(FornecedoresContext)
  const { listEtapas, listSubetapas } = useContext(EtapasContext)
  const { orcamentos, listOrcamentos } = useContext(OrcamentosContext)
  const { listClientes } = useContext(ClientesContext)
  const {lancamentosRdo, listRdos} = useContext(RdoRdaContext)
  const [descricaoItem, setDescricaoItem] = useState('')
  const typeDocument = tipo?.toUpperCase() ?? type?.toUpperCase()
  const [parcelamento, setParcelamento] = useState<boolean>(false)
  const [groupItems, setGroupItems] = useState([{ id: Math.random(), etapa: 0 }])
  const [diasVencimento, setDiasVencimento] = useState<number>(0)
  const [dataVencimento, setDataVencimento] = useState<string>(moment().format('YYYY-MM-DD'))
  const [dataLancamento, setDataLancamento] = useState<string>(moment().format('YYYY-MM-DD'))
  const [nf, setNf] = useState<string>()
  const [dataNf, setDataNf] = useState<string>('')
  const [valorComprometido, setValorComprometido] = useState<string>()
  const [fornecedor, setFornecedor] = useState<number>()
  const [contratoExists, setContratoExists] = useState<number>(0)
  const [contrato, setContrato] = useState<number>()
  const [observacao, setObservacao] = useState<string>('')
  const [orcamentoSelected] = orcamentos.filter((item) => Number(item.obra) === Number(obra) || Number(item.obra === Number(obraId)))

  const [itens, setItens] = useState<Array<{ id: number, etapa: number | null, subetapa: number | null, valor: string, descricao: string }>>([
    { id: groupItems[0].id, etapa: 0, subetapa: null, valor: '', descricao: '' }
  ])
  const [parcelas, setParcelas] = useState<Array<{ id: number, vencimento: string, valor: string }>>([
    { id: 1, vencimento: '', valor: '' }
  ])
  const [numeroParcelas, setNumeroParcelas] = useState(1)
  const [valorTotal, setValorTotal] = useState<number>(0)

  const handleAddItem = () => {
    const newId = Math.random()
    setGroupItems((prevstate) => [...prevstate, { id: newId, etapa: 0 }])
    setItens((prevstate) => [...prevstate, { id: newId, etapa: 0, subetapa: null, valor: '', descricao: '' }])
  }

  const handleRemoveItem = (id: number) => {
    if (groupItems.length === 1) return

    setGroupItems((prevstate) => prevstate.filter((item) => item.id !== id))
    setItens((prevstate) => prevstate.filter((item) => item.id !== id))
  }

  const calculaDataParcelas = (parcela: number) => {
    const days = parcela * diasVencimento
    const date = moment(dataVencimento).add(days, 'days').format('YYYY-MM-DD')

    return date
  }

  const handleChangeItemAndParcelaPrice = (id: number, field: string, value: string, setItem: Dispatch<SetStateAction<any[]>>) => {
    const cleanedValue = value.replace(/\D/g, '')

    let integerPart = cleanedValue.slice(0, -2)
    let decimalPart = cleanedValue.slice(-2)

    if (decimalPart.length > 2) {
      integerPart += decimalPart.slice(0, -2)
      decimalPart = decimalPart.slice(-2)
    }

    const formattedValue = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + decimalPart

    const trataValue = field === 'valor'
      ? formattedValue.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
      : value

    if (field === 'etapa') {
      setItem((prevstate) => prevstate.map((item) =>
        item.id === id ? {...item, etapa: Number(trataValue)} : item
    ))

      const [groupItemExists] = groupItems.filter((item) => item.id === id)
      const addEtapa = Object.assign(groupItemExists, { etapa: trataValue })

      setGroupItems((prevstate) => {
        const removeDuplicate = prevstate.filter((item) => item.id !== id)
        return ([
          ...removeDuplicate,
          addEtapa
        ])
      })
    }

    if (field === 'descricaoEtapa') {
      setItem((prevstate) => prevstate.map((item) =>
        item.id === id ? {...item, descricao: value} : item
      ))
    }

    setItem((prevstate) => prevstate.map((item) => (item.id === id
      ? { ...item, [field]: field === 'vencimento' ? calculaDataParcelas(id) : trataValue }
      : item)))
  }

  const handleNumeroParcelasChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numero = parseInt(e.target.value, 10) || 1
    setNumeroParcelas(numero)

    const novasParcelas = Array.from({ length: numero }, (_, i) => ({
      id: i + 1,
      vencimento: '',
      valor: ''
    }))

    setParcelas(novasParcelas)
  }

  const handleChangeParcelamento = () => {
    setParcelamento(!parcelamento)
  }

  const handleChangeDataVencimento = (value: string) => {
    setDiasVencimento(Number(value))

    if (Number(value) === 0) {
      const today = moment().format('YYYY-MM-DD')
      setDataVencimento(today)
    } else {
      const date = moment().add(Number(value), 'days').format('YYYY-MM-DD')

      setDataVencimento(date)
    }
  }

  const handleSubmitLancamento = async () => {
    try {
      changeLoading(true, 'Iniciando lançamentos...')

      const [fornecedorSelecionado] = fornecedores.filter((item) => item.id === fornecedor)
      const { banco, agencia, conta, tipo_conta, pix } = fornecedorSelecionado
      let parcelaAtual = 1

      for (const item of itens) {
        for (const parcela of parcelas) {
          console.log(parcela)

          const infos = {
            rdo: Number(rdoRda) || Number(id),
            dataLancamento: String(moment(dataLancamento).unix()),
            nf,
            dataNf: String(moment(dataNf).unix()),
            valorComprometido: contratoExists ? String(item.valor) : undefined,
            valorPagamento: !contratoExists ? String(item.valor) : !contratoExists && parcelamento ? parcela.valor : '',
            dataPagamento: String(moment(dataVencimento).unix()),
            usuario: user?.id,
            observacao,
            descricao: item.descricao,
            parcela: `${parcelaAtual} de ${parcelas}`,
            obra: obra || obraId,
            situacao: 1,
            banco,
            agencia,
            conta,
            tipo_conta,
            pix,
            etapa: Number(item.etapa), // Atribuímos o valor correto da etapa
            subetapa: Number(item.subetapa), // Atribuímos o valor correto da subetapa
            fornecedor,
            boletos: [],
            cliente: clienteId || cliente.id || cliente_id,
            status: 1
          }

          parcelaAtual += 1; // Incrementa a parcela para o próximo item

          try {
            changeLoading(true, `Enviando dados do lancamento ${item.etapa}...`)

            const mapperLancamento = RdoRdaMapper.toPersistence(infos)
            const create = await RdoRdaServices.createLancamentoRdoRda({ token, mapperLancamento, type })

            console.log(`Lançamento da etapa ${item.etapa} criado com sucesso:`, create)

            Toast({ type: 'success', text: `Lançamento cadastrado com sucesso.`, duration: 5000 })
          } catch (error) {
            console.error(`Erro ao criar/atualizar lançamento da etapa ${item.etapa}:`, error)
            Toast({ type: 'danger', text: `Erro ao criar/atualizar lançamento da etapa ${item.etapa}.`, duration: 5000 })
          }
        }
      }
    } catch (error) {
      console.error('Erro ao realizar o lançamento:', error)
      Toast({ type: 'danger', text: 'Erro ao realizar os lançamentos.', duration: 5000 })
    } finally {
      changeLoading(false)
      listRdos({ token })
      navigate(-1) // Navega de volta após os lançamentos
    }
  }

  const handleChangeFornecedor = (value: string) => {
    console.log(value)
    if (value === '0') {
      changeModal(<CreateFornecedor />)
    } else {
      setFornecedor(Number(value))
    }
  }

  const getData = useCallback(async () => {
    await listFornecedores({ token })

    await listClientes({ token })

    await listOrcamentos({ token })

    await listEtapas({ token })

    await listSubetapas({ token })
  }, [listClientes, listFornecedores, listOrcamentos, listEtapas, listSubetapas, token])

  useEffect(() => {
    void getData()
  }, [getData])

  useEffect(() => {
    const totalLancamentoValue = itens.reduce<number>((acc, item) => acc + Number(item.valor), 0)

    setValorTotal(totalLancamentoValue)
  }, [itens])

  return (
    <GlobalContainer $modal>
      {!isOpen && <Menu />}
      <Header title={`Lançamento em ${typeDocument}`} fullwidth={!!isOpen} cliente={cliente ?? nameCliente} goBack={!isOpen} />
      <Content $fullwidth={!!isOpen}>
        <Form>
          <FormContent>
            <FormGroup oneOfFour>
              <Legend>Cliente:</Legend>
              <Input value={cliente ?? cliente.nome} readOnly />
            </FormGroup>

            <FormGroup oneOfFour>
              <Legend>Fornecedor:</Legend>
              <Select value={fornecedor} onChange={(e) => handleChangeFornecedor(e.target.value)}>
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
                {lancamentosRdo.filter((lancamentoFilter) => lancamentoFilter.valor_comprometido).map((lancamento) => {
                  const fornecedor = fornecedores.find((item) => item.id === lancamento.fornecedor)
                  return (
                  <option value={lancamento.id} key={lancamento.id}>Contrato NF: {lancamento.nf} - {dateFormat(lancamento.data_lancamento)} - {fornecedor?.nome} - {currencyFormat(String(lancamento.valor_comprometido))}</option>
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
          {groupItems.map((groupItem) => {
            const [valueInfos] = itens.filter((item) => item.id === groupItem.id)
            const value = valueInfos.valor
            const etapaSelected = groupItem.etapa
            const subetapaFiltered = orcamentoSelected?.subitem.filter((item) => item.etapa === Number(etapaSelected))

            return (
              <FormContent key={groupItem.id} $items>
                <FormGroup oneOfFive>
                  <Legend>Etapa:</Legend>
                  <Select onChange={(e) => handleChangeItemAndParcelaPrice(groupItem.id, 'etapa', e.target.value, setItens)}>
                    <option value="">Selecione uma etapa</option>
                    <option value='0'>Cadastrar nova etapa</option>
                    <option disabled>________________________________</option>
                    {orcamentoSelected?.item.filter((item) => item.nome !== '').map((etapa) => {
                      return (
                      <option key={etapa.id} value={etapa.id}>{etapa.numero} - {etapa.nome}</option>
                    )})}
                  </Select>
                </FormGroup>

                <FormGroup oneOfFive>
                  <Legend>Subetapa:</Legend>
                  <Select onChange={(e) => handleChangeItemAndParcelaPrice(groupItem.id, 'subetapa', e.target.value, setItens)}>
                    <option value="">Selecione uma subetapa</option>
                    <option value='0'>Cadastrar nova subetapa</option>
                    <option disabled>________________________________</option>
                    {subetapaFiltered?.filter((item, index, self) => index === self.findIndex((t) => t.id === item.id)).map((subetapa) => {
                      return (
                      <option key={subetapa?.id} value={subetapa?.id}>{subetapa?.numero} - {subetapa?.nome}</option>
                    )})}
                  </Select>
                </FormGroup>

                <FormGroup oneOfFour>
                  <Legend>Descrição:</Legend>
                  <Input type='text' placeholder='Digite a descrição do lançamento' onChange={(e) => handleChangeItemAndParcelaPrice(groupItem.id, 'descricaoEtapa', e.target.value, setItens)} />
                </FormGroup>

                <FormGroup oneOfFive>
                  <Legend>Valor:</Legend>
                  <Input type='text' value={currencyFormat(value)} placeholder='Ex.: R$5.022,53' onChange={(e) => handleChangeItemAndParcelaPrice(groupItem.id, 'valor', e.target.value, setItens)} />
                </FormGroup>
              <p style={{ cursor: 'pointer' }} onClick={() => handleRemoveItem(groupItem.id)}><FiX color='red' size={23} /></p>
            </FormContent>
            )
          })}
          <AddItem>
            <p onClick={handleAddItem}>Adicionar item <FiPlus color='green' size={23} /></p>
          </AddItem>

          <FormContent $total>
            <Divisor />
            {!contratoExists
              ? (
              <FormGroup oneOfFive>
                <Legend>Valor total {itens.length > 1 ? 'dos itens' : 'do item'}:</Legend>
                <Input placeholder='Valor total itens'
                  value={Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(valorTotal)} readOnly />
              </FormGroup>
                )
              : (
              <FormGroup oneOfFive>
              <Legend>Valor comprometido:</Legend>
              <Input placeholder='Valor total itens'
                value={Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(valorTotal)}
                readOnly
                onChange={(event) => setValorComprometido(event.target.value)}
              />
            </FormGroup>
                )}
          </FormContent>

          <Header title='Condições de pagamento' subHeader fullwidth/>
          <FormContent $items>
            <FormGroup oneOfFive>
              <Legend>Nº de dias para {parcelamento ? 'o 1º' : 'o'} pagamento:</Legend>
              <Input placeholder='Ex.: 28' value={onlyNumberFormat(String(diasVencimento))} type='text' pattern={'[0-9]'} onChange={(event) => handleChangeDataVencimento(event.target.value)} />
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Vencimento:</Legend>
              <Input placeholder='Ex.: 28' value={dataVencimento} type='date' onChange={(event) => setDataVencimento(event?.target.value)} />
            </FormGroup>
          </FormContent>
          <FormContent>
            <FormGroup oneOfFive>
              <Legend>Parcelamento:</Legend>
              <ToggleSwitch name='Parcelamento' checked={parcelamento} onChange={handleChangeParcelamento} />
            </FormGroup>
          </FormContent>

          {parcelamento && (
            <>
              <FormContent>
                <FormGroup oneOfFive>
                  <Legend>Nº de parcelas:</Legend>
                  <Input
                    placeholder='Ex.: 28'
                    type='number'
                    value={numeroParcelas}
                    onChange={handleNumeroParcelasChange} // Chama a função ao mudar o número de parcelas
                  />
                </FormGroup>
              </FormContent>

              {parcelas.map((parcela, index) => {
                return (
                  <FormContent key={parcela.id} $items>
                    <FormGroup square>
                      <Legend>Parcela:</Legend>
                      <Input type='number' value={index + 1} readOnly $square/>
                    </FormGroup>

                    <FormGroup oneOfFive>
                      <Legend>Valor:</Legend>
                      <Input
                        type='text'
                        value={Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(Number(valorTotal) / parcelas.length)}
                        placeholder='Ex.: R$5.022,53'
                        onChange={(e) => handleChangeItemAndParcelaPrice(parcela.id, 'valor', e.target.value, setParcelas)}
                      />
                    </FormGroup>

                    <FormGroup oneOfFive>
                      <Legend>Vencimento:</Legend>
                      <Input
                        type='date'
                        value={parcela.vencimento}
                        //onFocus={() => handleChangeItemAndParcelaPrice(parcela.id, 'vencimento', calculaDataParcelas(parcela.id), setParcelas)}
                        onChange={(e) => handleChangeItemAndParcelaPrice(parcela.id, 'vencimento', e.target.value, setParcelas)}
                      />
                    </FormGroup>
                  </FormContent>
                )
              })}
            </>
          )}
          {/* <Header title='Documentos' fullwidth subHeader />
          <FormContent>
            <FormGroup oneOfFive>
              <Legend>Enviar NF:</Legend>
              <Input
                type='file'
                onChange={handleNumeroParcelasChange} // Chama a função ao mudar o número de parcelas
              />
            </FormGroup>
          </FormContent>

          <FormContent>
            <FormGroup oneOfFive>
              <Legend>Enviar comprovante:</Legend>
              <Input
                type='file'
                onChange={handleNumeroParcelasChange} // Chama a função ao mudar o número de parcelas
              />
            </FormGroup>
          </FormContent> */}
        </Form>

        <ButtonContainer>
          <Button $green onClick={handleSubmitLancamento}>Gravar lançamento</Button>
        </ButtonContainer>
      </Content>
    </GlobalContainer>
  )
}

export default CreateLancamento
