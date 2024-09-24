/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState, type Dispatch, type SetStateAction, type ChangeEvent, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FiPlus, FiX } from 'react-icons/fi'
import moment from 'moment'

import { GlobalContainer, Legend } from '../../../assets/styles/global'

import ModalContext from '../../../contexts/modalContext'
// import ClientesContext from '../../../contexts/clientesContext'
import FornecedoresContext from '../../../contexts/fornecedoresContext'
import AuthContext from '../../../contexts/authContext'
import LoadingContext from '../../../contexts/loadingContext'

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
import EtapasContext from '../../../contexts/etapasContext'
import OrcamentosContext from '../../../contexts/orcamentosContext'

const CreateLancamento: React.FC<TypeNewLancamento> = ({ tipo, rdoRda, nameCliente, obraId, cliente_id }) => {
  const { type, id } = useParams()
  const navigate = useNavigate()
  const { obra, clienteId, cliente } = useLocation().state
  const { isOpen, changeModal } = useContext(ModalContext)
  const { changeLoading } = useContext(LoadingContext)
  const { token, user } = useContext(AuthContext)
  const { fornecedores, listFornecedores } = useContext(FornecedoresContext)
  const { etapas, subetapas, listEtapas, listSubetapas } = useContext(EtapasContext)
  const { orcamentos, listOrcamentos } = useContext(OrcamentosContext)
  const [descricaoItem, setDescricaoItem] = useState('')
  const typeDocument = tipo?.toUpperCase() ?? type?.toUpperCase()
  const [parcelamento, setParcelamento] = useState<boolean>(false)
  const [groupItems, setGroupItems] = useState([{ id: 1 }])
  const [diasVencimento, setDiasVencimento] = useState<number>(28)
  const [dataVencimento, setDataVencimento] = useState<string>('')
  const [dataLancamento, setDataLancamento] = useState<string>('')
  const [nf, setNf] = useState<number>()
  const [dataNf, setDataNf] = useState<string>('')
  const [valorComprometido, setValorComprometido] = useState<string>()
  const [valorPagamento, setValorPagamento] = useState<string>()
  const [fornecedor, setFornecedor] = useState<number>()
  const [contratoExists, setContratoExists] = useState<number>(0)
  const [contrato, setContrato] = useState<number>()
  const [observacao, setObservacao] = useState<string>('')
  const [orcamentoSelected] = orcamentos.filter((item) => Number(item.obra) === Number(obra) || Number(item.obra === Number(obraId)))
  const etapasOrcamento = etapas.filter((etapa) => orcamentoSelected?.item.some((item) => item.id === etapa.id))
  const subetapasOrcamento = subetapas.filter((subetapa) => etapasOrcamento.some((etapa) => subetapa.etapa === etapa.id)
  )

  const [itens, setItens] = useState<Array<{ id: number, etapa: number | null, subetapa: number | null, valor: string }>>([
    { id: 1, etapa: null, subetapa: null, valor: '' }
  ])
  const [parcelas, setParcelas] = useState<Array<{ id: number, vencimento: string, valor: string }>>([
    { id: 1, vencimento: '', valor: '' }
  ])
  const [numeroParcelas, setNumeroParcelas] = useState(1)
  const [valorTotal, setValorTotal] = useState<number>(0)

  const handleAddItem = () => {
    const newId = groupItems.length + 1
    setGroupItems((prevstate) => [...prevstate, { id: newId }])
    setItens((prevstate) => [...prevstate, { id: newId, etapa: null, subetapa: null, valor: '' }])
  }

  const handleRemoveItem = (id: number) => {
    if (groupItems.length === 1) return

    setGroupItems((prevstate) => prevstate.filter((item) => item.id !== id))
    setItens((prevstate) => prevstate.filter((item) => item.id !== id))
  }

  const calculaDataParcelas = (parcela: number) => {
    const days = parcela * diasVencimento

    const date = moment(dataVencimento).add(days, 'days').calendar(null, {
      sameElse: 'YYYY-MM-DD'
    })
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
    const date = moment().add(value, 'days').calendar(null, {
      sameElse: 'YYYY-MM-DD'
    })

    setDataVencimento(date)
  }

  const handleSubmitLancamento = async () => {
    try {
      changeLoading(true, 'Iniciando lançamentos...')

      const [fornecedorSelecionado] = fornecedores.filter((item) => item.id === fornecedor)
      const { banco, agencia, conta, tipo_conta, pix } = fornecedorSelecionado

      for (const item of itens) {
        const infos = {
          rdo: Number(rdoRda) || Number(id),
          dataLancamento: String(moment(dataLancamento).unix()),
          nf,
          dataNf: String(moment(dataNf).unix()),
          valorComprometido,
          valorPagamento: String(item.valor),
          dataPagamento: String(moment(dataVencimento).unix()),
          usuario: user?.id,
          observacao,
          descricao: descricaoItem,
          parcela: String(parcelas.length),
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
          status: 1
        }

        try {
          changeLoading(true, `Enviando dados do lancamento ${item.etapa}...`)

          const mapperLancamento = RdoRdaMapper.toPersistence(infos)
          const create = await RdoRdaServices.createLancamentoRdoRda({ token, mapperLancamento, type })

          console.log(`Lançamento da etapa ${item.etapa} criado com sucesso:`, create)

          Toast({ type: 'success', text: `Lançamento da etapa ${item.etapa} cadastrado com sucesso.`, duration: 5000 })
        } catch (error) {
          console.error(`Erro ao criar/atualizar lançamento da etapa ${item.etapa}:`, error)
          Toast({ type: 'danger', text: `Erro ao criar/atualizar lançamento da etapa ${item.etapa}.`, duration: 5000 })
        }
      }
    } catch (error) {
      console.error('Erro ao realizar o lançamento:', error)
      Toast({ type: 'danger', text: 'Erro ao realizar os lançamentos.', duration: 5000 })
    } finally {
      changeLoading(false)
      // navigate(-1) // Navega de volta após os lançamentos
    }
  }

  const getData = async () => {
    await listFornecedores({ token })
    await listOrcamentos({ token })
    await listEtapas({ token })
    await listSubetapas({ token })
  }

  useEffect(() => {
    if (!fornecedores || fornecedores.length === 0) {
      void getData()
    }
  }, [fornecedores])

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
              <Select onChange={(e) => setFornecedor(Number(e.target.value))}>
                <option selected>Selecione um fornecedor</option>
                <option>Cadastrar novo fornecedor</option>
                <option disabled>________________________________</option>
                {fornecedores.map((item) => (
                  <option key={item.id} value={item.id}>{item.nome}</option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>É contrato?</Legend>
              <Select onChange={(event) => setContratoExists(Number((event.target as HTMLSelectElement).value))}>
                <option value={1}>Sim</option>
                <option value={0} selected>Não</option>
              </Select>
            </FormGroup>

            {contratoExists === 1 && <FormGroup oneOfFive>
              <Legend >Abater do contrato:</Legend>
              <Select onChange={(event) => setContrato(Number((event.target as HTMLSelectElement).value))}>
                <option selected>Selecione o contrato</option>
                <option value={1}>27/08/20204 - Contrato documentação da obra - R$ 5.000,00</option>
              </Select>
            </FormGroup>}

            <FormGroup oneOfFive>
              <Legend>Data lançamento:</Legend>
              <Input type='date' onChange={(event) => setDataLancamento(event?.target.value)} />
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Nº da NF:</Legend>
              <Input type='tel' placeholder='Ex.: 123456' value={nf} onChange={(event) => setNf(Number(event.target.value))} />
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Data emissão NF:</Legend>
              <Input type='date' onChange={(event) => setDataNf(event.target.value)} />
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Descrição:</Legend>
              <Input type='text' onChange={(event) => setObservacao(event.target.value)} placeholder='Ex.: Pagamento medição.' />
            </FormGroup>
          </FormContent>

          <Header title='Itens do lançamento' subHeader modal={!!isOpen} fullwidth />
          {groupItems.map((groupItem) => {
            const [valueInfos] = itens.filter((item) => item.id === groupItem.id)
            const value = valueInfos.valor

            return (
              <FormContent key={groupItem.id} $items>
                <FormGroup oneOfFive>
                  <Legend>Etapa:</Legend>
                  <Select onChange={(e) => handleChangeItemAndParcelaPrice(groupItem.id, 'etapa', e.target.value, setItens)}>
                    <option value="">Selecione uma etapa</option>
                    <option value='0'>Cadastrar nova etapa</option>
                    <option disabled>________________________________</option>
                    {etapasOrcamento.map((etapa) => (
                      <option key={etapa.id} value={etapa.id}>{etapa.numero} - {etapa.nome}</option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup oneOfFive>
                  <Legend>Subetapa:</Legend>
                  <Select onChange={(e) => handleChangeItemAndParcelaPrice(groupItem.id, 'subetapa', e.target.value, setItens)}>
                    <option value="">Selecione uma subetapa</option>
                    <option value='0'>Cadastrar nova subetapa</option>
                    <option disabled>________________________________</option>
                    {subetapasOrcamento.map((subetapa) => (
                      <option key={subetapa.id} value={subetapa.id}>{subetapa.numero} - {subetapa.nome}</option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup oneOfFour>
                  <Legend>Descrição:</Legend>
                  <Input type='text' placeholder='Digite a descrição do lançamento' onChange={(e) => setDescricaoItem(e?.target.value)} />
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
              <Input placeholder='Ex.: 28' value={diasVencimento} type='number' onChange={(event) => handleChangeDataVencimento(event.target.value)} />
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
                        onFocus={() => handleChangeItemAndParcelaPrice(parcela.id, 'vencimento', calculaDataParcelas(parcela.id), setParcelas)}
                        onChange={(e) => handleChangeItemAndParcelaPrice(parcela.id, 'vencimento', e.target.value, setParcelas)}
                      />
                    </FormGroup>
                  </FormContent>
                )
              })}
            </>
          )}
          <Header title='Documentos' fullwidth subHeader />
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
          </FormContent>
        </Form>

        <ButtonContainer>
          <Button $green onClick={handleSubmitLancamento}>Gravar lançamento</Button>
        </ButtonContainer>
      </Content>
    </GlobalContainer>
  )
}

export default CreateLancamento
