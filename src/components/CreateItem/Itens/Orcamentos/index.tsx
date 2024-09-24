/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState, type Dispatch, type SetStateAction, type ChangeEvent, useEffect } from 'react'
import { FiPlus, FiX } from 'react-icons/fi'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

import { GlobalContainer, Legend } from '../../../../assets/styles/global'

import ModalContext from '../../../../contexts/modalContext'
import ClientesContext from '../../../../contexts/clientesContext'
import ObrasContext from '../../../../contexts/obrasContext'
import OrcamentosContext from '../../../../contexts/orcamentosContext'
import LoadingContext from '../../../../contexts/loadingContext'
import AuthContext from '../../../../contexts/authContext'
import EtapasContext from '../../../../contexts/etapasContext'

import Header from '../../../../components/Header'
import Menu from '../../../../components/Menu'
import FormGroup from '../../../../components/FormGroup'
import Input from '../../../../components/Input'
import Select from '../../../../components/Select'
import Button from '../../../../components/Button'

import OrcamentoMapper from '../../../../services/mappers/OrcamentoMapper'
import OrcamentosServices from '../../../../services/sgo/OrcamentosServices'

import CreateObra from '../Obras'
import CreateEtapa from '../Etapas'
import CreateCliente from '../Clientes'

import useErrors from '../../../../hooks/useErrors'

import { currencyFormat } from '../../../../utils/currencyFormat'
import Toast from '../../../../utils/toast'

import { AddItem, ButtonContainer, Container, Divisor, Form, FormContent, Title, AddSubitem } from './styles'

import { type Obra } from '../../../../interfaces/globalInterfaces'
import CreateModelo from '../Modelos'
import EtapaMapper from '../../../../services/mappers/EtapaMapper'

const CreateOrcamento: React.FC = () => {
  const navigate = useNavigate()
  const { token } = useContext(AuthContext)
  const { isOpen, changeModal } = useContext(ModalContext)
  const { clientes } = useContext(ClientesContext)
  const { changeLoading } = useContext(LoadingContext)
  const { obras } = useContext(ObrasContext)
  const { modelos, listOrcamentos } = useContext(OrcamentosContext)
  const { etapas, subetapas, listEtapas, listSubetapas } = useContext(EtapasContext)
  const [idCliente, setIdCliente] = useState<number>(0)
  const [nome, setNome] = useState<string>('')
  const dataCriacao = String(moment().unix())
  const [status] = useState<number>(1)
  const [modelo, setModelo] = useState(0)
  const [obra, setObra] = useState<number>(0)
  const [items, setItems] = useState([
    {
      id: 1,
      nome: '',
      valorTotal: '',
      numero: 0,
      idEtapa: 0,
      subetapas: [
        { id: 1, nome: '', unidade: '', numero: 0, etapa: 0, idSubetapa: 0, quantidade: 1, valor: 0, valorTotal: '' }
      ]
    }
  ])
  const [obrasCliente, setObrasCliente] = useState<Obra[]>([])

  const { errors, setError, removeError, getErrorMessageByFieldName } = useErrors()
  const formIsValid = nome && idCliente && obra && modelo && status && errors.length === 0

  const handleAddEtapa = () => {
    // Verifica se existe alguma etapa e obtém o maior ID
    const newEtapaId = items.length
      ? Math.max(...items.map(item => item.id)) + 1
      : 1

    setItems(prevState => [
      ...prevState,
      {
        id: newEtapaId,
        nome: '',
        valorTotal: '',
        idEtapa: 1,
        numero: 0,
        subetapas: [
          {
            id: 1,
            nome: '',
            unidade: '',
            numero: 0,
            etapa: 0,
            idSubetapa: 0,
            quantidade: 1,
            valor: 0,
            fornecedor: '',
            valorTotal: ''
          }]
      }
    ])
  }

  const handleRemoveEtapa = (etapaId: number) => {
    if (items.length <= 1) return
    setItems(prevState => prevState.filter(etapa => etapa.id !== etapaId))
  }

  const handleAddSubetapa = (etapaId: number) => {
    setItems(prevState =>
      prevState.map(etapa =>
        etapa.id === etapaId
          ? {
              ...etapa,
              subetapas: [
                ...etapa.subetapas,
                {
                  id: etapa.subetapas.length
                    ? Math.max(...etapa.subetapas.map(sub => sub.id)) + 1
                    : 1,
                  nome: '',
                  unidade: '',
                  numero: 0,
                  quantidade: 1,
                  idSubetapa: 0,
                  etapa: 0,
                  valor: 0,
                  fornecedor: '',
                  valorTotal: ''
                }
              ]
            }
          : etapa
      )
    )
  }

  const handleRemoveSubitem = (etapaId: number, subetapaId: number) => {
    setItems(prevState =>
      prevState.map(etapa =>
        etapa.id === etapaId
          ? {
              ...etapa,
              subetapas: etapa.subetapas.filter(subetapa => subetapa.id !== subetapaId)
            }
          : etapa
      )
    )
  }

  const handleChangeSubitem = (etapaId: number, subetapaId: number, field: string, value: string, e?: any) => {
    const cleanedValue = value.replace(/\D/g, '')
    const subetapaSelected = subetapas.find(subetapa => subetapa.id === Number(value))

    let integerPart = cleanedValue.slice(0, -2)
    let decimalPart = cleanedValue.slice(-2)

    if (decimalPart.length > 2) {
      integerPart += decimalPart.slice(0, -2)
      decimalPart = decimalPart.slice(-2)
    }

    const formattedValue = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + decimalPart

    const trataValue = field === 'valor'
      ? formattedValue.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
      : field === 'quantidade'
        ? value.replace(',', '.')
        : value

    if (field === 'subetapa' && value === '0') {
      changeModal(<CreateEtapa />)
    }

    // Atualizando o estado com os IDs de subetapas selecionadas

    if (field === 'subetapa' && value !== '0') {
      setItems(prevState =>
        prevState.map(etapa => {
          if (etapa.id === etapaId) {
            const updatedSubetapas = etapa.subetapas.map(subetapa => {
              if (subetapa.id === subetapaId) {
                const [id, numero, nome] = value.split('|')

                return {
                  ...subetapa,
                  [field]: trataValue,
                  nome,
                  id: subetapaId, // Setando o ID da subetapa selecionada
                  idSubetapa: Number(id),
                  etapa: Number(etapaId),
                  numero: Number(numero)
                }
              }
              return subetapa
            })

            const etapaTotal = updatedSubetapas.reduce<number>((acc, subetapa) => acc + parseFloat(subetapa.valorTotal || '0'), 0)

            return {
              ...etapa,
              subetapas: updatedSubetapas,
              valorTotal: etapaTotal.toFixed(2)
            }
          }
          return etapa
        })
      )
    }

    setItems(prevState =>
      prevState.map(etapa => {
        if (etapa.id === etapaId) {
          const updatedSubetapas = etapa.subetapas.map(subetapa => {
            if (subetapa.id === subetapaId) {
              const valor = parseFloat(String(subetapa.valor)) || 0
              const quantidade = parseFloat(String(subetapa.quantidade)) || 1
              const updatedValue = parseFloat(trataValue) || 0

              return {
                ...subetapa,
                [field]: trataValue,
                id: subetapaId, // Setando o ID da subetapa selecionada
                valorTotal: field === 'valor'
                  ? (updatedValue * quantidade).toFixed(2)
                  : (valor * updatedValue).toFixed(2)
              }
            }
            return subetapa
          })

          const etapaTotal = updatedSubetapas.reduce<number>((acc, subetapa) => acc + parseFloat(subetapa.valorTotal || '0'), 0)

          return {
            ...etapa,
            subetapas: updatedSubetapas,
            valorTotal: etapaTotal.toFixed(2)
          }
        }
        return etapa
      })
    )
  }

  const handleChangeItem = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    fieldName: string,
    message: string,
    setState: Dispatch<SetStateAction<any>>,
    etapaId?: number
  ) => {
    const value = event.target.value

    if (fieldName === 'cliente' && value === '0') {
      changeModal(<CreateCliente />)
    }

    if (fieldName === 'obra' && value === '0') {
      changeModal(<CreateObra />)
    }

    if (fieldName === 'modelo' && value === '0') {
      changeModal(<CreateModelo />)
    }

    if (fieldName === 'cliente' && value !== '0') {
      const obraCliente = obras.filter((item) => item.id_cliente === Number(value))
      setObrasCliente(obraCliente)
    }

    if (fieldName === 'etapa' && value === '0') {
      changeModal(<CreateEtapa />)
    }

    if (fieldName === 'etapa' && value !== '0' && etapaId) {
      const etapaSelecionada = etapas?.find(etapa => etapa.id === Number(value))
      if (etapaSelecionada) {
        setItems(prevState =>
          prevState.map(item =>
            item.id === etapaId
              ? { ...item, nome: etapaSelecionada.nome, numero: etapaSelecionada.numero, idEtapa: Number(value), id: etapaSelecionada.id }
              : item
          )
        )
      }
    }

    setState(value)
    if (!value) {
      setError({ field: fieldName, message })
    } else {
      removeError(fieldName)
    }
  }

  const handleCreateitem = async () => {
    changeLoading(true, 'Criando orçamento...')
    // const itemsOrcamento = items.filter((itemOrcamento) => itemOrcamento.id)
    const itemsOrcamento = items.filter((itemOrcamento) => itemOrcamento)
    // const idsItemsOrcamento = itemsOrcamento.map(itemOrcamento => itemOrcamento.id)
    const subitens = items.flatMap(itemOrcamento => itemOrcamento.subetapas.filter(subitemOrcamento => subitemOrcamento))
    // const subitens = items.flatMap(itemOrcamento => itemOrcamento.subetapas.filter(subitemOrcamento => subitemOrcamento.id))
    // const idsSubitens = subitens.map(subitemOrcamento => subitemOrcamento.id)

    /*     const itemsCreated: Array<{ id: number, numero: number, valor_total: string, nome: string }> = []
    const subitemsCreated: Array<{ id: number, numero: number, nome: string, etapa: number, quantidade: string, unidade: string, valor_unitario: string, valor_total: string }> = [] */

    const dataOrcamento = {
      nome,
      dataCriacao,
      status,
      modelo,
      idCliente,
      obra,
      item: items.map(({ subetapas, ...rest }) => ({ id: rest.idEtapa, nome: rest.nome, numero: rest.numero, valor_total: rest.valorTotal })),
      subitem: subitens.map((subitem) => ({ id: subitem.idSubetapa, numero: subitem.numero, nome: subitem.nome, etapa: subitem.etapa, quantidade: subitem.quantidade, unidade: subitem.unidade, valor_unitario: subitem.valor, valor_total: subitem.valorTotal }))
    }

    console.log({ dataOrcamento })

    try {
      changeLoading(true, 'Enviando os dados do orçamento...')
      const mapperOrcamento = OrcamentoMapper.toPersistence(dataOrcamento)
      const create = await OrcamentosServices.create({ token, mapperOrcamento })

      changeLoading(true, 'atualizando lista de obras...')
      await listOrcamentos({ token })

      if (create.id) {
        Toast({ type: 'success', text: 'Orçamento cadastrado com sucesso.', duration: 5000 })
        navigate(-1)
      }
    } catch (error) {
      Toast({ type: 'danger', text: 'Erro ao criar orçamento.', duration: 5000 })
      console.error('Erro ao criar usuário:', error)
    } finally {
      changeLoading(false)
    }

    /*
    if (!createOrcamento.id) {
      Toast({ type: 'danger', text: 'Erro ao criar orçamento.', duration: 5000 })
      console.error('Erro ao criar o orçamento:', 'Erro ao criar o orçamento')
      return
    }

    if (createOrcamento.id) {
      itemsOrcamento.forEach(async (item) => {
        const dataItem = {
          orcamento: createOrcamento.id,
          dataCriacao: String(moment().unix()),
          numero: item.numero,
          nome: item.nome,
          valorTotal: item.valorTotal,
          status: 1
        }

        if (item.nome) {
          const mapperItem = EtapaMapper.toPersistence(dataItem)
          const createEtapa = await OrcamentosServices.createItem({ token, mapperItem })

          itemsCreated.push({ id: createItem.id, numero: createItem.numero, valor_total: createItem.valorTotal, nome: createItem.nome })
        }
      })

      subitens.forEach(async (item) => {
        const dataItem = {
          dataCriacao: String(moment().unix()),
          numero: item.numero,
          nome: item.nome,
          status: 1
        }

        const mapperItem = OrcamentoMapper.subitemToPersistence(dataItem)
        const createSubitem = await OrcamentosServices.createSubitem({ token, mapperItem })

        subitemsCreated.push({ id: createSubitem.id, numero: createSubitem.numero, nome: createSubitem.nome, etapa: createSubitem.etapa, quantidade: createSubitem.quantidade, unidade: createSubitem.unidade, valor_unitario: createSubitem.valor, valor_total: createSubitem.valorTotal })
      })

      const dataUpdateOrcamento = {
        id: createOrcamento.id,
        nome,
        dataCriacao,
        status,
        modelo,
        idCliente,
        obra,
        item: itemsCreated,
        subitem: subitemsCreated
      }

      try {
        changeLoading(true, 'Enviando os dados...')

        const mapperOrcamento = OrcamentoMapper.toPersistence(dataUpdateOrcamento)
        const create = await OrcamentosServices.update({ token, mapperOrcamento })

        changeLoading(true, 'atualizando lista de obras...')
        await listOrcamentos({ token })

        if (create.id) {
          Toast({ type: 'success', text: 'Orçamento cadastrado com sucesso.', duration: 5000 })
          navigate(-1)
        }
      } catch (error) {
        Toast({ type: 'danger', text: 'Erro ao criar/atualizar orçamento.', duration: 5000 })
        console.error('Erro ao criar/atualizar usuário:', error)
      } finally {
        changeLoading(false)
      }
    } */
  }

  const getData = async () => {
    changeLoading(true, 'Carregando etapas...')
    await listEtapas({ token })

    changeLoading(true, 'Carregando subetapas...')
    await listSubetapas({ token })

    changeLoading(false)
  }

  useEffect(() => {
    void getData()
  }, [])

  return (
    <GlobalContainer $modal>
      {!isOpen && <Menu />}
      <Header title="Criar orçamento" fullwidth={!!isOpen} />
      <Container>
        <Form>
          <FormContent>
            <FormGroup oneOftree $error={getErrorMessageByFieldName('cliente')}>
              <Legend>Cliente: <sup>*</sup></Legend>
              <Select
                onChange={(e) => handleChangeItem(e, 'cliente', e.target.value, setIdCliente)}
                $error={!!getErrorMessageByFieldName('cliente')}
                required
              >
                <option>Selecione um cliente</option>
                <option value='0'>Cadastrar novo cliente</option>
                <option disabled>________________________________</option>
                {clientes.map((item) => (
                  <option key={item.id} value={item.id}>{item.nome}</option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup oneOfFour $error={getErrorMessageByFieldName('obra')}>
              <Legend>Obra: <sup>*</sup></Legend>
              <Select
                onChange={(e) => handleChangeItem(e, 'obra', e.target.value, setObra)}
                $error={!!getErrorMessageByFieldName('obra')}
                required
              >
                <option>Selecione uma obra</option>
                <option value='0'>Cadastrar nova obra</option>
                <option disabled>________________________________</option>
                {obrasCliente.map((item) => (
                  <option key={item.id} value={item.id}>{item.nome}</option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup oneOfFive $error={getErrorMessageByFieldName('modelo')}>
              <Legend>Modelo orçamento: <sup>*</sup></Legend>
              <Select
                onChange={(e) => handleChangeItem(e, 'modelo', e.target.value, setModelo)}
                $error={!!getErrorMessageByFieldName('modelo')}
                required
              >
                <option>Selecione um modelo</option>
                <option value='0'>Cadastrar novo modelo</option>
                <option disabled>________________________________</option>
                {modelos.map((item) => (
                  <option key={item.id} value={item.id}>{item.nome}</option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup oneOfFour $error={getErrorMessageByFieldName('nome')}>
              <Legend>Nome orçamento: <sup>*</sup></Legend>
              <Input
                value={nome}
                type='text'
                placeholder='Ex.: Betim flex geral'
                onChange={(e) => handleChangeItem(e, 'nome', e.target.value, setNome)}
                required
                $error={!!getErrorMessageByFieldName('nome')}
              />
            </FormGroup>
          </FormContent>

          <Title>Itens do orçamento</Title>
          {items?.map((etapa) => {
            return (
            <React.Fragment key={etapa.id}>
              <FormContent $items>
                <FormGroup oneOftree $error={getErrorMessageByFieldName('etapa')}>
                  <Legend>Etapa:</Legend>
                   <Select
                    id={String(etapa.id)}
                    onChange={(e) => handleChangeItem(e, 'etapa', e.target.value, () => {}, etapa.id)}
                    $error={!!getErrorMessageByFieldName('etapa')}
                    value={etapas.length > 0 ? etapas.filter((etapaSeleted) => etapaSeleted?.id === etapa?.id)[0]?.id : undefined}
                    >
                    <option value="">Selecione uma etapa</option>
                    <option value='0'>Cadastrar nova etapa</option>
                    <option disabled>________________________________</option>
                    {etapas.length > 0 && etapas.map((item) => (
                      <option key={item.id} value={item.id} className={String(item.id)}>{item.numero} - {item.nome}</option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup oneOfFive>
                  <Legend>Valor etapa:</Legend>
                  <Input
                    type="text"
                    value={Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(Number(etapa?.valorTotal))}
                    placeholder="Ex.: R$5.022,53"
                    readOnly
                  />
                </FormGroup>

                <p style={{ cursor: 'pointer' }} onClick={() => handleRemoveEtapa(etapa.id)}>
                  <FiX color="red" size={23} />
                </p>
              </FormContent>

                {etapa.subetapas.map((subitem: any) => {
                  const valorTotal = subitem.valor * subitem.quantidade
                  const etapaActive = document.getElementsByClassName(String(etapa.id))[0]?.className as unknown as HTMLOptionElement | any
                  const numeroEtapaActive = document.getElementsByClassName(String(etapa.id)) as unknown as HTMLOptionElement | any
                  const subetapasActive = subetapas.filter((item) => item.etapa === Number(etapaActive))

                  return (
                  <FormContent key={subitem.id} $items>
                    <FormGroup oneOfFive $error={getErrorMessageByFieldName('subetapa')}>
                    <Legend>Subetapa:</Legend>
                    <Select
                      onChange={(e) => handleChangeSubitem(etapa.id, subitem.id, 'subetapa', e.target.value, e)}
                      $error={!!getErrorMessageByFieldName('subetapa')}
                    >
                      <option>Selecione a subetapa</option>
                      <option value='0'>Cadastrar nova subetapa</option>
                      <option disabled>________________________________</option>
                      {subetapasActive.map((servico) => {
                        return (
                        <option key={servico.id} value={`${servico.id}|${servico.numero}|${servico.nome}`} >{servico.numero} - {servico.nome}</option>
                        )
                      })
                      }
                    </Select>
                  </FormGroup>

                  <FormGroup oneOfFive $error={getErrorMessageByFieldName('unidade')}>
                    <Legend>Unidade:</Legend>
                    <Select
                      value={subitem.unidade}
                      $error={!!getErrorMessageByFieldName('unidade')}
                      onChange={(e) => handleChangeSubitem(Number(etapaActive), subitem.id, 'unidade', e.target.value)}
                    >
                      <option value='0'>Selecione uma medida</option>
                      <option value='kg'>Kg</option>
                      <option value='m2'>m2</option>
                      <option value='m3'>m3</option>
                      <option value='unidade'>Unidade</option>
                      <option value='mês'>Mês</option>
                      <option value='verba'>Verba</option>
                      <option value='viagem'>Viagem</option>
                    </Select>
                  </FormGroup>

                  <FormGroup oneOfFive $error={getErrorMessageByFieldName('quantidade')}>
                    <Legend>Quantidade:</Legend>
                    <Input
                      type="tel"
                      value={subitem.quantidade}
                      $error={!!getErrorMessageByFieldName('quantidade')}
                      onChange={(e) => handleChangeSubitem(etapa.id, subitem.id, 'quantidade', e.target.value)}
                      placeholder="Quantidade"
                    />
                  </FormGroup>

                  <FormGroup oneOfFive $error={getErrorMessageByFieldName('valor')}>
                    <Legend>Valor unit.:</Legend>
                    <Input
                      type="tel"
                      $error={!!getErrorMessageByFieldName('valor')}
                      value={currencyFormat(subitem.valor)}
                      onChange={(e) => handleChangeSubitem(etapa.id, subitem.id, 'valor', e.target.value)}
                      placeholder="Valor"
                    />
                  </FormGroup>

                  <FormGroup oneOfFive $error={getErrorMessageByFieldName('valorTotal')}>
                    <Legend>Valor total:</Legend>
                    <Input
                      type="tel"
                      value={Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(valorTotal)}
                      onChange={(e) => handleChangeSubitem(etapa.id, subitem.id, 'valorTotal', e.target.value)}
                      placeholder="Valor total"
                      $error={!!getErrorMessageByFieldName('valorTotal')}
                      readOnly
                    />
                  </FormGroup>

                  <p style={{ cursor: 'pointer' }} onClick={() => handleRemoveSubitem(etapa.id, subitem.id)}>
                    <FiX color="red" size={23} />
                  </p>
                </FormContent>
                  )
                })}

              <AddSubitem>
                  <p onClick={() => handleAddSubetapa(etapa.id)}>
                    Adicionar subetapa <FiPlus color="green" size={23} />
                  </p>
                </AddSubitem>
                <Divisor />
            </React.Fragment>
            )
          })}
          <AddItem>
            <p onClick={handleAddEtapa}>
              Adicionar etapa <FiPlus color="green" size={23} />
            </p>
          </AddItem>
        </Form>
        <ButtonContainer>
          <span>Valor total do orçamento:<p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(items.reduce<number>((acc, item) => { return acc + Number(item?.valorTotal) }, 0))}</p></span>
          <Button disabled={!formIsValid} $green onClick={handleCreateitem}>Salvar</Button>
        </ButtonContainer>
      </Container>
    </GlobalContainer>
  )
}

export default CreateOrcamento
