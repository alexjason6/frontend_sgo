/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect, useState, type Dispatch, type ChangeEvent, type SetStateAction, useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import { FiPlus, FiX } from 'react-icons/fi'

import { GlobalContainer, Legend } from '../../../assets/styles/global'

import OrcamentosContext from '../../../contexts/orcamentosContext'
import ModalContext from '../../../contexts/modalContext'
import AuthContext from '../../../contexts/authContext'
import ClientesContext from '../../../contexts/clientesContext'
import LoadingContext from '../../../contexts/loadingContext'
import ObrasContext from '../../../contexts/obrasContext'
import EtapasContext from '../../../contexts/etapasContext'

import OrcamentoMapper from '../../../services/mappers/OrcamentoMapper'
import OrcamentosServices from '../../../services/sgo/OrcamentosServices'

import Header from '../../../components/Header'
import Menu from '../../../components/Menu'
import Select from '../../../components/Select'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import FormGroup from '../../../components/FormGroup'
import CreateCliente from '../../../components/CreateOrEditItem/Itens/Clientes'
import CreateObra from '../../../components/CreateOrEditItem/Itens/Obras'
import CreateModelo from '../../../components/CreateOrEditItem/Itens/Modelos'
import CreateEtapa from '../../../components/CreateOrEditItem/Itens/Etapas'
import useErrors from '../../../hooks/useErrors'

import Toast from '../../../utils/toast'
import { currencyFormat } from '../../../utils/currencyFormat'

import { AddItem, ButtonContainer, Container, Divisor, Form, FormContent, Title, AddSubitem, Arrow, ArrowSubitem } from './styles'

import { type Obra, type Orcamento } from '../../../interfaces/globalInterfaces'

interface Props {
  idOrcamento?: number | string
}

const EditItem: React.FC<Props> = ({idOrcamento}) => {
  const { id } = useParams() || idOrcamento
  const navigate = useNavigate()
  const { token } = useContext(AuthContext)
  const { getOrcamento } = useContext(OrcamentosContext)
  const [orcamento, setOrcamento] = useState<Orcamento>()
  const { clientes } = useContext(ClientesContext)
  const { changeLoading } = useContext(LoadingContext)
  const { changeModal } = useContext(ModalContext)
  const { obras } = useContext(ObrasContext)
  const { modelos, listOrcamentos } = useContext(OrcamentosContext)
  const { etapas, subetapas, listEtapas, listSubetapas } = useContext(EtapasContext)
  const [idCliente, setIdCliente] = useState<number>(0)
  const [nome, setNome] = useState<string>('')
  const dataCriacao = String(moment().unix())
  const [status] = useState<number>(1)
  const [modelo, setModelo] = useState(0)
  const [obra, setObra] = useState<number>(0)
  const [etapasOpened, setEtapasOpened] = useState<number[]>([])
  const [items, setItems] = useState([
    {
      id: 1,
      nome: '',
      valorTotal: '',
      numero: '',
      idEtapa: 0,
      subetapas: [
        { id: 1, nome: '', unidade: '', numero: '', etapa: 0, idSubetapa: 0, quantidade: '', valor: '', valorTotal: '' }
      ]
    }
  ])
  const [obrasCliente, setObrasCliente] = useState<Obra[]>([])

  const { errors, setError, removeError, getErrorMessageByFieldName } = useErrors()
  const formIsValid = nome && idCliente && obra && modelo && status && errors.length === 0

  const handleAddEtapa = () => {

    setItems(prevState => [
      ...prevState,
      {
        id: Math.random(),
        nome: '',
        valorTotal: '',
        idEtapa: 0,
        numero: '',
        subetapas: [
          {
            id: 1,
            nome: '',
            unidade: '',
            numero: '',
            etapa: 0,
            idSubetapa: 0,
            quantidade: '',
            valor: '',
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
                  id: Math.random(),
                  nome: '',
                  unidade: '',
                  numero: '',
                  quantidade: '',
                  idSubetapa: 0,
                  etapa:  0,
                  valor: '',
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

  const handleChangeSubitemNumber = (etapaId: number, subetapaId: number, value: string) => {
    setItems(prevState =>
      prevState.map(etapa => {
        if (etapa.id === etapaId) {
          return {
            ...etapa,
            subetapas: etapa.subetapas.map(subetapa =>
              subetapa.id === subetapaId
                ? { ...subetapa, numero: value }
                : subetapa
            )
          }
        }
        return etapa
      })
    )
  }

  const handleChangeSubitemNome = (etapaId: number, subetapaId: number, value: string) => {

    if (value === '0') {
      changeModal(<CreateEtapa />)
      return
    }

    const nome = subetapas.find(item => item.id === Number(value))?.nome;
    const nomeSubetapaAlreadyExists = items.filter((item) => Number(item.id) === Number(etapaId)).find((item) => item.subetapas.find((subitem) => subitem.nome === nome))
    const idSubetapaAlreadyExists = items.filter((item) => Number(item.id) === Number(etapaId)).find((item) => item.subetapas.find((subitem) => subitem.id === Number(value)))

    if (nomeSubetapaAlreadyExists && idSubetapaAlreadyExists) {
      return null
    }

    setItems(prevState =>
    prevState.map(etapa => {
      if (etapa.id === etapaId) {
        return {
          ...etapa,
          subetapas: etapa.subetapas.map(subetapa =>
            subetapaId === subetapa.id
              ? { ...subetapa, nome: nome!, etapa: etapa.id, id: Number(value) }
              : subetapa
          )
        };
      }
        return etapa;
      })
    );
  }

  const handleChangeSubitemUnidade = (etapaId: number, subetapaId: number, value: string) => {
    setItems(prevState =>
      prevState.map(etapa => {
        if (etapa.id === etapaId) {
           return {
            ...etapa,
            subetapas: etapa.subetapas.map(subetapa =>
              subetapa.id === subetapaId
                ? { ...subetapa, unidade: value }
                : subetapa
            )
          }
        }
        return etapa
      })
    )
  }

  const handleChangeSubitemQuantidade = (etapaId: number, subetapaId: number, value: string) => {
    setItems(prevState =>
      prevState.map(etapa => {
        if (etapa.id === etapaId) {
          // Atualizar as subetapas com a nova quantidade e calcular o valorTotal da subetapa
          const subetapasAtualizadas = etapa.subetapas.map(subetapa => {
            if (subetapa.id === subetapaId) {
              // Calcula o novo valorTotal da subetapa com a quantidade atualizada
              const novoValorTotal = String(Number(subetapa.valor) * Number(value));
              return { ...subetapa, quantidade: value, valorTotal: novoValorTotal };
            }
            return subetapa;
          });

          // Recalcula o valorTotal da etapa com as subetapas atualizadas
          const etapaTotal = subetapasAtualizadas.reduce<number>(
            (acc, subetapa) => acc + parseFloat(subetapa.valorTotal || '0'),
            0
          );

          return {
            ...etapa,
            subetapas: subetapasAtualizadas,
            valorTotal: String(etapaTotal) // Atualiza o valorTotal da etapa
          };
        }
        return etapa;
      })
    );
  };

  const handleChangeSubitemValor = (etapaId: number, subetapaId: number, value: string) => {
    const cleanedValue = value.replace(/\D/g, '');

    let integerPart = cleanedValue.slice(0, -2);
    let decimalPart = cleanedValue.slice(-2);

    if (decimalPart.length > 2) {
      integerPart += decimalPart.slice(0, -2);
      decimalPart = decimalPart.slice(-2);
    }

    const trataValue = parseFloat(`${integerPart}.${decimalPart}`).toFixed(2);

    setItems(prevState =>
      prevState.map(etapa => {
        if (etapa.id === etapaId) {
          const subetapasAtualizadas = etapa.subetapas.map(subetapa => {
            if (subetapa.id === subetapaId) {
              const novoValorTotal = (parseFloat(trataValue) * parseFloat(subetapa.quantidade)).toFixed(2);
              console.log(novoValorTotal.toString().slice(0, -2) + (Number(trataValue) * Number(subetapa.quantidade.slice(-2))))

              return { ...subetapa, valor: trataValue, valorTotal: novoValorTotal };
            }

            return subetapa;
          });

          const etapaTotal = subetapasAtualizadas.reduce<number>(
            (acc, subetapa) => acc + parseFloat(subetapa.valorTotal || '0'),
            0
          );

          return {
            ...etapa,
            subetapas: subetapasAtualizadas,
            valorTotal: etapaTotal.toFixed(2)
          };
        }
        return etapa;
      })
    );
  };

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
              ? { ...item, nome: etapaSelecionada.nome, idEtapa: Number(value), id: etapaSelecionada.id}
              : item
          )
        )
      }
    }

    if (fieldName === 'numEtapa') {
      setItems(prevState =>
        prevState.map(item =>
          item.id === etapaId
            ? { ...item, numero: value }
            : item
        )
      );
    }

    setState(value)
    if (!value) {
      setError({ field: fieldName, message })
    } else {
      removeError(fieldName)
    }
  }

  const handleUpdateItem = async () => {
    changeLoading(true, 'Salvando orçamento...')
    const subitens = items.flatMap(itemOrcamento => itemOrcamento.subetapas.filter(subitemOrcamento => subitemOrcamento))

    const dataOrcamento = {
      id: Number(id),
      nome,
      dataCriacao,
      status,
      modelo,
      idCliente,
      obra,
      item: items.map(({ subetapas, ...rest }) => ({ id: rest.idEtapa, nome: rest.nome, numero: rest.numero, valor_total: rest.valorTotal })),
      subitem: subitens.map((subitem) => ({ id: subitem.id, numero: subitem.numero, nome: subitem.nome, etapa: subitem.etapa, quantidade: subitem.quantidade, unidade: subitem.unidade, valor_unitario: subitem.valor, valor_total: subitem.valorTotal }))
    }

    try {
      changeLoading(true, 'Enviando os dados do orçamento...')
      const mapperOrcamento = OrcamentoMapper.toPersistence(dataOrcamento)
      const edit = await OrcamentosServices.update({ token })

      changeLoading(true, 'atualizando lista de obras...')
      await listOrcamentos({ token })

      if (edit.id) {
        Toast({ type: 'success', text: 'Orçamento editado com sucesso.', duration: 5000 })
        navigate(-1)
      }
    } catch (error) {
      Toast({ type: 'danger', text: 'Erro ao editar orçamento.', duration: 5000 })
      console.error('Erro ao editar orçamento:', error)
    } finally {
      changeLoading(false)
    }
  }

  const getData = useCallback( async () => {
    changeLoading(true, 'Carregando etapas...')
    await listEtapas({ token })

    changeLoading(true, 'Carregando subetapas...')
    await listSubetapas({ token })

    changeLoading(false)
  }, [changeLoading, listSubetapas, listEtapas, token])

  const getInitialOrcamento = useCallback( async () => {
    try {
      const response = await getOrcamento({ token, id: Number(id) })

      if (response.id) {
        setOrcamento(response)
        setIdCliente(response.id_cliente)
        setObra(response.obra)
        setNome(response.nome)
        setModelo(response.modelo)

        const initialObras = obras.filter((item) => item.id_cliente === Number(response.id_cliente))
        setObrasCliente(initialObras)

        // Mapeando os itens e associando seus subitens correspondentes
        const itemsWithSubitems = response.item?.sort((a: any, b: any) => Number(a.numero) > Number(b.numero) ? 1 : -1).map((item: any) => {
        // Filtrar subitens que pertencem ao item atual
          const subitemsForItem = response.subitem.filter(
            (subitem: any) => subitem.etapa === item.id
          ).map((subitem: any) => ({
            id: subitem.id,
            nome: subitem.nome,
            unidade: subitem.unidade,
            numero: subitem.numero,
            etapa: subitem.etapa,
            idSubetapa: subitem.id,
            quantidade: subitem.quantidade,
            valor: subitem.valor_unitario,
            valorTotal: subitem.valor_total
          }))

          // Retornar o item com os subitens associados
          return {
            id: item.id,
            nome: item.nome,
            valorTotal: item.valor_total,
            numero: item.numero,
            idEtapa: item.id,
            subetapas: subitemsForItem.sort((a: { numero: string }, b: { numero: string }) => Number(a.numero) > Number(b.numero) ? -1 : 1).sort((a: { numero: any }, b: { numero: any }) => {
              try {
                const parseNumber = (num: string) => num?.split('.')?.map((part: string) => parseInt(part, 10) || 0);

                const numA = parseNumber(a.numero);
                const numB = parseNumber(b.numero);

                for (let i = 0; i < Math.max(numA.length, numB.length); i++) {
                  const partA = numA[i] || 0;
                  const partB = numB[i] || 0;

                  if (partA !== partB) {
                    return partA - partB;
                  }
                }
              } catch (error) {
                console.error("Erro ao comparar números:", error);
              }

              return 0;
            })
          }
        })

        // Definir os itens com subitens
        setItems(itemsWithSubitems)
      }
    } catch (error) {
      console.log(error)
    }
  }, [getOrcamento, id, obras, token])

  const handleChangeVisibilityOfSubetapas = (id: number) => {
    const [etapaIsOpened] = etapasOpened.filter((item) => item === id)

    if (etapaIsOpened) {
      const hideSubetapa = etapasOpened.filter((item) => item !== id)
      setEtapasOpened(hideSubetapa)
    } else {
      setEtapasOpened((prevstate) => [
        ...prevstate,
        id
      ])
    }
  }

  useEffect(() => {
    if (!orcamento) {
      changeLoading(true, 'Buscando dados orcamento...')

      void getInitialOrcamento()
      void getData()

      const timeout = setTimeout(() => {
        changeLoading(false)
      }, 1000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [changeLoading, getData, getInitialOrcamento, orcamento])

  return (
    <GlobalContainer>
      <Menu />
      <Header title="Editar orçamento" goBack/>
      <Container>
        <Form>
          <FormContent>
            <FormGroup oneOftree $error={getErrorMessageByFieldName('cliente')}>
              <Legend>Cliente: <sup>*</sup></Legend>
              <Select
                onChange={(e) => handleChangeItem(e, 'cliente', e.target.value, setIdCliente)}
                $error={!!getErrorMessageByFieldName('cliente')}
                required
                value={idCliente}
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
                value={obra}
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
                value={modelo}
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
                {etapa.subetapas.length > 0 && <Arrow $open={!!etapasOpened.find((item) => item === Number(etapa.id))} onClick={() => {handleChangeVisibilityOfSubetapas(Number(etapa.id))}} />}
                <FormGroup oneOfSix  $error={getErrorMessageByFieldName('numEtapa')}>
                  <Legend>Número:</Legend>
                  <Input
                    type="text"
                    value={etapa.numero}
                    placeholder="Ex.: 1"
                    $square
                    $error={!!getErrorMessageByFieldName('numEtapa')}
                    onChange={(e) => handleChangeItem(e, 'numEtapa', e.target.value, () => {}, etapa.id)}
                  />
                </FormGroup>

                <FormGroup oneOftree $error={getErrorMessageByFieldName('etapa')}>
                  <Legend>Etapa:</Legend>
                   <Select
                    id={String(etapa.id)}
                    onChange={(e) => handleChangeItem(e, 'etapa', e.target.value, () => {}, etapa.id)}
                    $error={!!getErrorMessageByFieldName('etapa')}
                    value={etapa.id}
                    >
                    <option value="">Selecione uma etapa</option>
                    <option value='0'>Cadastrar nova etapa</option>
                    <option disabled>________________________________</option>
                    {etapas.length > 0 && etapas.sort((a, b) => a.nome.localeCompare(b.nome, 'pt', { sensitivity: 'base' })).map((item) => (
                      <option key={item.id} value={item.id} className={String(item.id)}>{item.nome}</option>
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

                {etapa.subetapas?.map((subitem: any) => {
                  const valorTotal = subitem.valor * subitem.quantidade
                  const etapaActive = document.getElementsByClassName(String(etapa.id))[0]?.className as unknown as HTMLOptionElement | any
                  const subetapasActive = subetapas.filter((item) => Number(item.etapa) === Number(etapaActive))
                  return (
                    <>
                    {!!etapasOpened.find((item) => Number(item) === Number(etapa.id)) &&
                      <FormContent key={subitem.id} $items>
                        <ArrowSubitem />
                        <FormGroup oneOfSix $error={getErrorMessageByFieldName('numSubEtapa')}>
                        <Legend>Número:</Legend>
                        <Input
                          type="text"
                          value={subitem.numero || subetapasActive.find((item) => item.id === subitem.id)?.numero && `${etapa.numero + '.' + subetapasActive.find((item) => item.id === subitem.id)?.numero}` || ''}
                          $error={!!getErrorMessageByFieldName('numSubEtapa')}
                          onChange={(e) => handleChangeSubitemNumber(etapa.id, subitem.id, e.target.value)}
                          placeholder="Ex.: 01.01"
                          $square
                        />
                      </FormGroup>

                        <FormGroup oneOfFive $error={getErrorMessageByFieldName('subetapa')}>
                          <Legend>Subetapa:</Legend>
                          <Select
                            onChange={(e) => handleChangeSubitemNome(etapa.id, subitem.id, e.target.value)}
                            $error={!!getErrorMessageByFieldName('subetapa')}
                            value={subitem.id}
                          >
                            <option>Selecione a subetapa</option>
                            <option value='0'>Cadastrar nova subetapa</option>
                            <option disabled>________________________________</option>
                            {subetapasActive.sort((a, b) => a.nome.localeCompare(b.nome, 'pt', { sensitivity: 'base' })).map((servico) => {
                              return (
                              <option key={servico.id} value={servico.id} >{servico.nome}</option>
                              )
                            })
                            }
                          </Select>
                        </FormGroup>

                      <FormGroup oneOfSix $error={getErrorMessageByFieldName('unidade')}>
                        <Legend>Unidade:</Legend>
                        <Select
                          value={subitem.unidade}
                          $error={!!getErrorMessageByFieldName('unidade')}
                          onChange={(e) => handleChangeSubitemUnidade(Number(etapaActive), subitem.id, e.target.value)}
                        >
                          <option value='0'>Selecione uma medida</option>
                          <option value='kg'>Kg</option>
                          <option value='metro'>M</option>
                          <option value='m2'>M2</option>
                          <option value='m3'>M3</option>
                          <option value='unidade'>Unidade</option>
                          <option value='mês'>Mês</option>
                          <option value='verba'>Verba</option>
                          <option value='dia'>Dia</option>
                          <option value='viagem'>Viagem</option>
                        </Select>
                      </FormGroup>

                      <FormGroup oneOfSix $error={getErrorMessageByFieldName('quantidade')}>
                        <Legend>Quantidade:</Legend>
                        <Input
                          type="tel"
                          value={subitem.quantidade}
                          $error={!!getErrorMessageByFieldName('quantidade')}
                          onChange={(e) => handleChangeSubitemQuantidade(etapa.id, subitem.id, e.target.value)}
                          placeholder="Quantidade"
                          $square
                        />
                      </FormGroup>

                      <FormGroup oneOfFive $error={getErrorMessageByFieldName('valor')}>
                        <Legend>Valor unit.:</Legend>
                        <Input
                          type="tel"
                          $error={!!getErrorMessageByFieldName('valor')}
                          defaultValue={subitem.valor}
                          value={currencyFormat(subitem.valor)}
                          onChange={(e) => handleChangeSubitemValor(etapa.id, subitem.id, e.target.value)}
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
                          placeholder="Valor total"
                          $error={!!getErrorMessageByFieldName('valorTotal')}
                          readOnly
                        />
                      </FormGroup>

                      <p style={{ cursor: 'pointer' }} onClick={() => handleRemoveSubitem(etapa.id, subitem.id)}>
                        <FiX color="red" size={23} />
                      </p>
                    </FormContent>
                    }
                    </>
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
          <Button disabled={!formIsValid} $green onClick={handleUpdateItem}>Salvar</Button>
        </ButtonContainer>
      </Container>
    </GlobalContainer>
  )
}

export default EditItem
