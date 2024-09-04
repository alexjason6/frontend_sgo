/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState, useMemo, type Dispatch, type SetStateAction, type ChangeEvent } from 'react'
import { FiPlus, FiX } from 'react-icons/fi'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

import { GlobalContainer, Legend } from '../../../../assets/styles/global'

import ModalContext from '../../../../contexts/modalContext'
import ClientesContext from '../../../../contexts/clientesContext'
import ObrasContext from '../../../../contexts/obrasContext'
import OrcamentosContext from '../../../../contexts/orcamentosContext'
import LoadingContext from '../../../../contexts/loadingContext'

import Header from '../../../../components/Header'
import Menu from '../../../../components/Menu'
import FormGroup from '../../../../components/FormGroup'
import Input from '../../../../components/Input'
import Select from '../../../../components/Select'
import Button from '../../../../components/Button'

import CreateObra from '../../../Obras/CreateObra'

import CreateCliente from '../../../Clientes/CreateCliente'

import useErrors from '../../../../hooks/useErrors'

import { currencyFormat } from '../../../../utils/currencyFormat'
import Toast from '../../../../utils/toast'

import { AddItem, ButtonContainer, Container, Divisor, Form, FormContent, Title, AddSubitem } from './styles'

import { type Obra } from '../../../../interfaces/globalInterfaces'

const CreateOrcamento: React.FC = () => {
  const navigate = useNavigate()
  const { isOpen, changeModal } = useContext(ModalContext)
  const { clientes } = useContext(ClientesContext)
  const { changeLoading } = useContext(LoadingContext)
  const { obras } = useContext(ObrasContext)
  const { itens, servicos } = useContext(OrcamentosContext)
  const [itensOrcamento, setItensOrcamento] = useState([{ id: 1, descricao: '', valor: '' }])

  const [idCliente, setIdCliente] = useState()
  const [nome, setNome] = useState()
  const [numero, setNumero] = useState()
  const dataCriacao = moment().unix()
  const [status, setStatus] = useState()
  const [modelo, setModelo] = useState()
  const [obra, setObra] = useState()
  const [etapas, setEtapas] = useState([
    {
      id: 1,
      nome: '',
      valorTotal: 0,
      subitens: [
        { id: 1, nome: '', unidade: '', quantidade: 1, valor: 0, valorTotal: 0 }
      ]
    }
  ])
  const [obrasCliente, setObrasCliente] = useState<Obra[]>([])

  const { errors, setError, removeError, getErrorMessageByFieldName } = useErrors()
  const formIsValid = nome && idCliente && obra && modelo && status && errors.length === 0

  const totalOrcamentoValue = useMemo(() => {
    return itensOrcamento.reduce<number>((acc, item) => acc + Number(item.valor || 0), 0)
  }, [itensOrcamento])

  const handleAddEtapa = () => {
    setEtapas((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        nome: '',
        valorTotal: 0,
        subitens: [
          {
            id: 1,
            nome: '',
            unidade: '',
            quantidade: 1,
            valor: 0,
            fornecedor: '',
            valorTotal: 0
          }]
      }
    ])
  }

  const handleRemoveEtapa = (etapaId: number) => {
    if (etapas.length === 1) return

    setEtapas(prevState => prevState.filter(etapa => etapa.id !== etapaId))
  }

  const handleAddSubetapa = (etapaId: number) => {
    setEtapas(prevState =>
      prevState.map(etapa =>
        etapa.id === etapaId
          ? {
              ...etapa,
              subitens: [
                ...etapa.subitens,
                {
                  id: etapa.subitens.length + 1,
                  nome: '',
                  unidade: '',
                  quantidade: 1,
                  valor: 0,
                  fornecedor: '',
                  valorTotal: 0
                }
              ]
            }
          : etapa
      )
    )
  }

  const handleRemoveSubitem = (etapaId: number, subitemId: number) => {
    setEtapas(prevState =>
      prevState.map(etapa =>
        etapa.id === etapaId
          ? {
              ...etapa,
              subitens: etapa.subitens.filter(subitem => subitem.id !== subitemId)
            }
          : etapa
      )
    )
  }

  const handleChangeSubitem = (etapaId: number, subitemId: number, field: string, value: string) => {
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

    setEtapas(prevState =>
      prevState.map(etapa =>
        etapa.id === etapaId
          ? {
              ...etapa,
              subitens: etapa.subitens.map(subitem =>
                subitem.id === subitemId
                  ? {
                      ...subitem,
                      [field]: field === 'valor' || field === 'valorTotal' ? trataValue : value,
                      valorTotal: field === 'valor' || field === 'quantidade' ? subitem.quantidade * Number(trataValue) : 0
                    }
                  : subitem
              )
            }
          : etapa
      )
    )
  }

  const handleChangeItemPrice = (id: number, field: string, value: string, setItem: Dispatch<SetStateAction<any[]>>) => {
    const trataValue = value.includes('R$')
      ? value
        ?.replace('R$ ', '')
        ?.replaceAll('.', '')
        ?.replace(',', '.')
      : value
    setItem((prevstate) => prevstate.map((item) => (
      item.id === id
        ? { ...item, [field]: trataValue }
        : item)))

    if (field === 'cliente') {
      changeModal(<CreateCliente />)
    }
  }

  const handleChangeItem = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    fieldName: string,
    message: string,
    setState: Dispatch<SetStateAction<any>>
  ) => {
    const value = fieldName === 'email' ||
     fieldName === 'emailFinanceiro'
      ? event.target.value.toLowerCase()
      : event.target.value.split(' ')
        ?.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        ?.join(' ')

    if (fieldName === 'cliente' && event.target.value === '0') {
      changeModal(<CreateCliente />)
    }

    if (fieldName === 'obra' && event.target.value === '0') {
      changeModal(<CreateObra />)
    }

    if (fieldName === 'cliente' && event.target.value !== '0') {
      const obraCliente = obras.filter((item) => item.id_cliente === Number(event.target.value))

      setObrasCliente(obraCliente)
    }

    setState(value)

    if (!value) {
      setError({ field: fieldName, message })
    } else {
      removeError(fieldName)
    }
  }

  console.log(etapas)

  const handleCreateitem = async () => {
    try {
      changeLoading(true, 'Enviando os dados...')

      const dataOrcamento = {
        nome,
        dataCriacao,
        status,
        modelo,
        idCliente,
        obra,
        etapas,
        subitem: etapas.filter((etapa) => etapa)
      }

      console.log({ dataOrcamento })

      /*       const mapperObra = ObraMapper.toPersistence(dataOrcamento)
      const create = !dataOrcamento
        ? await ObrasServices.create({ token, mapperObra })
        : await ObrasServices.update({ token, mapperObra })
 */
      changeLoading(true, 'atualizando lista de obras...')
      // await listObras({ token })

      /*       if (isOpen) {
        changeModal()
      } */

      /*       if (!isOpen) {
        navigate('/orcamentos')
      } */

      Toast({ type: 'success', text: 'Obra cadastrada com sucesso.', duration: 5000 })
    } catch (error) {
      Toast({ type: 'danger', text: 'Erro ao criar/atualizar obra.', duration: 5000 })
      console.error('Erro ao criar/atualizar usuário:', error)
    } finally {
      changeLoading(false)
    }
  }

  return (
    <GlobalContainer $modal>
      {!isOpen && <Menu />}
      <Header title="Criar orçamento" fullwidth={!!isOpen} />
      <Container>
        <Form>
          <FormContent>
            <FormGroup oneOftree>
              <Legend>Cliente:</Legend>
                  <Select onChange={(e) => handleChangeItem(e, 'cliente', e.target.value, setIdCliente)}>
                <option>Selecione um cliente</option>
                <option value='0'>Cadastrar novo cliente</option>
                <option disabled>________________________________</option>
                {clientes.map((item) => (
                  <option key={item.id} value={item.id}>{item.nome}</option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup oneOfFour>
              <Legend>Obra:</Legend>
              <Select onChange={(e) => handleChangeItem(e, 'obra', e.target.value, setObra)}>
                <option>Selecione uma obra</option>
                <option value='0'>Cadastrar nova obra</option>
                <option disabled>________________________________</option>
                {obrasCliente.map((item) => (
                  <option key={item.id} value={item.id}>{item.nome}</option>
                ))}
              </Select>
            </FormGroup>
          </FormContent>

          <Title>Itens do orçamento</Title>
          {etapas.map((item) => (
            <>
              <FormContent key={item.id} $items>
                <FormGroup oneOftree>
                  <Legend>Etapa:</Legend>
                  <Select onChange={(e) => handleChangeItem(e, 'etapa', e.target.value, setObra)}>
                    <option disabled>Selecione uma etapa</option>
                    <option>Cadastrar nova etapa</option>
                    <option disabled>________________________________</option>
                    {itens.map((item) => (
                      <option key={item.id} value={item.id}>{item.nome}</option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup oneOfFive>
                  <Legend>Valor etapa:</Legend>
                  <Input
                    type="text"
                    /* value={currencyFormat(item?.valor)} */
                    placeholder="Ex.: R$5.022,53"
                    onChange={(e) => handleChangeItemPrice(item.id, 'valor', e.target.value, setItensOrcamento)}
                    readOnly
                  />
                </FormGroup>

                <p style={{ cursor: 'pointer' }} onClick={() => handleRemoveEtapa(item.id)}>
                  <FiX color="red" size={23} />
                </p>
              </FormContent>

                {item.subitens.map((subitem, index) => {
                  const valorTotal = subitem.valor * subitem.quantidade

                  return (
                  <FormContent key={subitem.id} $items>
                  <FormGroup oneOfFour>
                    <Legend>Nome da subetapa:</Legend>
                    <Select
                      value={subitem.id}
                      onChange={(e) => handleChangeSubitem(item.id, subitem.id, 'nome', e.target.value)}
                    >
                      <option>Selecione a subetapa</option>
                      <option>Cadastrar nova subetapa</option>
                      {servicos.map((servico) => (
                        <option key={servico.id} value={servico.id}>{servico.nome}</option>
                      ))

                      }
                    </Select>
                  </FormGroup>

                  <FormGroup square>
                    <Legend>Un.:</Legend>
                    <Input
                      type="text"
                      value={subitem.unidade}
                      onChange={(e) => handleChangeSubitem(item.id, subitem.id, 'unidade', e.target.value)}
                      placeholder="m2"
                      $square
                    />
                  </FormGroup>

                  <FormGroup square>
                    <Legend>Qnt.:</Legend>
                    <Input
                      type="tel"
                      value={subitem.quantidade}
                      onChange={(e) => handleChangeSubitem(item.id, subitem.id, 'quantidade', e.target.value)}
                      placeholder="Quantidade"
                      $square
                    />
                  </FormGroup>

                  <FormGroup oneOfFive>
                    <Legend>Valor:</Legend>
                    <Input
                      type="tel"
                      value={currencyFormat(subitem.valor)}
                      onChange={(e) => handleChangeSubitem(item.id, subitem.id, 'valor', e.target.value)}
                      placeholder="Valor"
                    />
                  </FormGroup>

                  <FormGroup oneOfFive>
                    <Legend>Valor total:</Legend>
                    <Input
                      type="tel"
                      value={Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(valorTotal)}
                      onChange={(e) => handleChangeSubitem(item.id, subitem.id, 'valorTotal', e.target.value)}
                      placeholder="Valor total"
                      readOnly
                    />
                  </FormGroup>

                  <p style={{ cursor: 'pointer' }} onClick={() => handleRemoveSubitem(item.id, subitem.id)}>
                    <FiX color="red" size={23} />
                  </p>
                </FormContent>
                  )
                })}

              <AddSubitem>
                  <p onClick={() => handleAddSubetapa(item.id)}>
                    Adicionar subetapa <FiPlus color="green" size={23} />
                  </p>
                </AddSubitem>
                <Divisor />
            </>
          ))}
          <AddItem>
            <p onClick={handleAddEtapa}>
              Adicionar etapa <FiPlus color="green" size={23} />
            </p>
          </AddItem>

          <ButtonContainer>
            <Button /* disabled={!formIsValid} */ $green onClick={handleCreateitem}>Gravar Orçamento</Button>
          </ButtonContainer>
        </Form>
      </Container>
    </GlobalContainer>
  )
}

export default CreateOrcamento
