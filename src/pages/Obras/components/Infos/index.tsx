/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect, useState, type Dispatch, type SetStateAction, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import { GlobalContainer, Legend } from '../../../../assets/styles/global'

import ClientesContext from '../../../../contexts/clientesContext'
import ModalContext from '../../../../contexts/modalContext'
import AuthContext from '../../../../contexts/authContext'
import LoadingContext from '../../../../contexts/loadingContext'
import ObrasContext from '../../../../contexts/obrasContext'

import Input from '../../../../components/Input'
import Select from '../../../../components/Select'
import Button from '../../../../components/Button'
import FormGroup from '../../../../components/FormGroup'
import Header from '../../../../components/Header'
import Menu from '../../../../components/Menu'

import dateFormat from '../../../../utils/dateFormat'
import cepFormat from '../../../../utils/cepFormat'
import Toast from '../../../../utils/toast'

import CepServices from '../../../../services/cep/CepServices'
import ObrasServices from '../../../../services/sgo/ObrasServices'
import ObraMapper from '../../../../services/mappers/ObraMapper'

import useErrors from '../../../../hooks/useErrors'

import CreateCliente from '../../../Clientes/CreateCliente'

import { Container, Edit, ButtonContainer, Form } from './styles'

import { type Obra } from '../../../../interfaces/globalInterfaces'

interface typeCliente {
  data?: Obra
}

const Infos: React.FC<typeCliente> = ({ data }) => {
  const navigate = useNavigate()
  const { token } = useContext(AuthContext)
  const { clientes, listClientes } = useContext(ClientesContext)
  const { isOpen, changeModal } = useContext(ModalContext)
  const { changeLoading } = useContext(LoadingContext)
  const { listObras } = useContext(ObrasContext)

  const [edit, setEdit] = useState(!data)
  const [nome, setNome] = useState(data?.nome ?? '')
  const [cno, setCno] = useState(data?.cno ?? '')
  const [alvara, setAlvara] = useState(data?.alvara ?? '')
  const [engenheiro, setEngenheiro] = useState(data?.engenheiro ?? '')
  const [cep, setCep] = useState(data?.cep ?? '')
  const [logradouro, setLogradouro] = useState(data?.logradouro ?? '')
  const [numero, setNumero] = useState(data?.numero ?? '')
  const [complemento, setComplemento] = useState(data?.complemento ?? '')
  const [bairro, setBairro] = useState(data?.bairro ?? '')
  const [cidade, setCidade] = useState(data?.cidade ?? '')
  const [uf, setUf] = useState(data?.uf ?? '')
  const [idCliente, setIdCliente] = useState(data?.id_cliente ?? '')
  const [dataInicio, setDataInicio] = useState(data?.data_inicio ?? '')
  const [previsaoEntrega, setPrevisaoEntrega] = useState(data?.previsao_entrega ?? '')
  const [dataEntrega, setDataEntrega] = useState(data?.data_entrega ?? null)
  const [tipo, setTipo] = useState(data?.tipo ?? '1')
  const [status, setStatus] = useState(data?.status ?? '1')
  const menu = document.getElementsByClassName('menu')[0]

  const { errors, setError, removeError, getErrorMessageByFieldName } = useErrors()
  const formIsValid = nome && idCliente && logradouro && tipo && status && errors.length === 0

  const [cliente] = clientes.filter((item) => item.id === data?.id_cliente)

  const handleEditInfos = () => {
    setEdit(!edit)
  }

  const handleChangeItem = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>, fieldName: string, message: string, setState: Dispatch<SetStateAction<any>>) => {
    const value = fieldName === 'email' || fieldName === 'emailFinanceiro' ? event.target.value.toLowerCase() : event.target.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')

    if (fieldName === 'cliente' && event.target.value === '0') {
      changeModal(<CreateCliente />)
    }

    setState(value)

    if (setState === setCep && value.length >= 8) {
      void fetchCep(value)
    }

    if (!value) {
      setError({ field: fieldName, message })
    } else {
      removeError(fieldName)
    }
  }

  const fetchCep = async (cepValue: string) => {
    const cepResponse = await CepServices.buscaCep(cepValue.replace('-', ''))

    if (!cepResponse) {
      console.log(cepResponse)

      return
    }

    if (cepResponse) {
      setLogradouro(cepResponse.data.logradouro)
      setBairro(cepResponse.data.bairro)
      setCidade(cepResponse.data.localidade)
      setUf(cepResponse.data.uf)
    }
  }

  const handleCreateObra = async () => {
    try {
      changeLoading(true, 'Enviando os dados...')

      const dataUser = {
        nome,
        cno,
        alvara,
        engenheiro,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
        idCliente: Number(idCliente),
        dataInicio: String(moment(dataInicio).unix()),
        previsaoEntrega: String(moment(previsaoEntrega).unix()),
        dataEntrega: String(moment(dataEntrega).unix()),
        tipo: Number(tipo),
        status: Number(status)
      }

      const mapperObra = ObraMapper.toPersistence(dataUser)
      const create = !data
        ? await ObrasServices.create({ token, mapperObra })
        : await ObrasServices.update({ token, mapperObra })

      if (create.id) {
        clearFormFields()
      }

      changeLoading(true, 'atualizando lista de obras...')
      await listObras({ token })

      if (isOpen) {
        changeModal()
      }

      if (!isOpen) {
        navigate('/obras')
      }

      Toast({ type: 'success', text: 'Obra cadastrada com sucesso.', duration: 5000 })
    } catch (error) {
      Toast({ type: 'danger', text: 'Erro ao criar/atualizar obra.', duration: 5000 })
      console.error('Erro ao criar/atualizar usuário:', error)
    } finally {
      changeLoading(false)
    }
  }

  const handleNavigateDetalhamento = () => {
    navigate(`/obras/detalhamento/${data?.id}`, {
      state: {
        obra: data?.id,
        clienteId: cliente?.id,
        cliente: cliente?.nome
      }
    })
    changeModal()
  }

  const clearFormFields = () => {
    setNome('')
    setStatus('1')
    setAlvara('')
    setEngenheiro('')
    setCno('')
    setCep('')
    setLogradouro('')
    setNumero('')
    setComplemento('')
    setBairro('')
    setCidade('')
    setUf('')
    setIdCliente('')
    setDataInicio('')
    setPrevisaoEntrega('')
    setDataEntrega('')
    setTipo('')
  }

  useEffect(() => {
    void listClientes({ token })
  }, [])

  return (
    <GlobalContainer>
      {!data && !isOpen && <Menu className />}
      <Container>
        {data && <Edit>
          <Button $green onClick={handleNavigateDetalhamento}>Detalhamento</Button>
          <Button $alert={!edit} $danger={edit} onClick={handleEditInfos}>{!edit ? 'Editar dados' : 'Cancelar edição'}</Button>
        </Edit>}
        {!data && <Header title='Cadastrar nova obra' subHeader={isOpen} modal />}
        {data && <Header title={`Editar obra - ${nome}`} modal />}
        <Form $create={isOpen || !!menu}>
          <FormGroup $error={getErrorMessageByFieldName('cliente')}>
            <Legend>Cliente:</Legend>
            <Select
              $error={!!getErrorMessageByFieldName('cliente')}
              disabled={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'cliente', 'Por favor, digite o cliente do usuário', setIdCliente)
              }>
                {cliente ? <option value={idCliente}>{cliente?.nome}</option> : <option>Selecione um cliente</option>}
                <option value='0'>Criar novo cliente</option>
                {clientes.map((item) => (
                  <option key={item.id} value={String(item.id)}>{item.nome}</option>
                ))}
            </Select>
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('nome')}>
            <Legend>Nome:</Legend>
            <Input
              $error={!!getErrorMessageByFieldName('nome')}
              value={nome}
              placeholder='Ex.: Betim Flex'
              type='text'
              disabled={!edit}
              $listData={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'nome', 'Por favor, digite o nome da obra', setNome)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('alvara')}>
            <Legend>Alvará:</Legend>
            <Input
              $error={!!getErrorMessageByFieldName('alvara')}
              value={alvara}
              placeholder='Ex.: 1235521887'
              type='text'
              disabled={!edit}
              $listData={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'alvara', 'Por favor, digite o alvara da obra', setAlvara)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('cno')}>
            <Legend>CNO:</Legend>
            <Input
              $error={!!getErrorMessageByFieldName('cno')}
              value={cno}
              placeholder='Ex.: 1235521887'
              type='text'
              disabled={!edit}
              $listData={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'cno', 'Por favor, digite o numero CNO da obra', setCno)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('dataInicio')}>
            <Legend>Data início:</Legend>
            <Input
              $error={!!getErrorMessageByFieldName('dataInicio')}
              value={data ? dateFormat(dataInicio, false, 'reverse') : dataInicio}
              disabled={!edit}
              $listData={!edit}
              type='date'
              onChange={async (event) =>
                handleChangeItem(event, 'dataInicio', 'Por favor, digite a data de início da obra', setDataInicio)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('tipo')}>
            <Legend>Tipo:</Legend>
            <Select
              $error={!!getErrorMessageByFieldName('tipo')}
              disabled={!edit}
              defaultValue={tipo}
              onChange={async (event) =>
                handleChangeItem(event, 'tipo', 'Por favor, digite o tipo da obra', setTipo)
              }
            >
              <option value={'1'}>Flex</option>
              <option value={'2'}>Reforma galpão</option>
              <option value={'3'}>Galpão novo</option>
              <option value={'4'}>MeLoca</option>
            </Select>
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('previsaoEntrega')}>
            <Legend>Previsão de entrega:</Legend>
              <Input
              $error={!!getErrorMessageByFieldName('previsaoEntrega')}
              value={data ? dateFormat(previsaoEntrega, false, 'reverse') : previsaoEntrega}
              disabled={!edit}
              $listData={!edit}
              type='date'
              onChange={async (event) =>
                handleChangeItem(event, 'previsaoEntrega', 'Por favor, digite a previsão de entrega da obra', setPrevisaoEntrega)
              }
            />
          </FormGroup>

          {status === 4 && (
            <FormGroup $error={getErrorMessageByFieldName('dataEntrega')}>
              <Legend>Data entrega:</Legend>
              <Input
                $error={!!getErrorMessageByFieldName('dataEntrega')}
                value={dateFormat(dataEntrega!, false, 'reverse')}
                disabled={!edit}
                $listData={!edit}
                type='date'
                onChange={async (event) =>
                  handleChangeItem(event, 'dataEntrega', 'Por favor, digite o dataEntrega da obra', setDataEntrega)
                }
              />
            </FormGroup>
          )}

          <FormGroup $error={getErrorMessageByFieldName('engenheiro')}>
            <Legend>Engenheiro:</Legend>
            <Input
              $error={!!getErrorMessageByFieldName('engenheiro')}
              value={engenheiro}
              placeholder='Ex.: João Pedro'
              type='text'
              disabled={!edit}
              $listData={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'engenheiro', 'Por favor, digite o engenheiro da obra', setEngenheiro)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('cep')}>
            <Legend>CEP:</Legend>
            <Input
              $error={!!getErrorMessageByFieldName('cep')}
              value={cepFormat(cep)}
              maxLength={9}
              type='tel'
              placeholder='Ex.: 32321-321'
              disabled={!edit}
              $listData={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'cep', 'Por favor, digite o cep da obra', setCep)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('logradouro')}>
            <Legend>Logradouro:</Legend>
            <Input
              $error={!!getErrorMessageByFieldName('logradouro')}
              value={logradouro}
              placeholder='Ex.: Rua Jupira'
              type='text'
              disabled={!edit}
              $listData={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'logradouro', 'Por favor, digite o logradouro da obra', setLogradouro)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('numero')}>
            <Legend>Número:</Legend>
            <Input
              $error={!!getErrorMessageByFieldName('numero')}
              value={numero}
              placeholder='Ex.: 1355'
              type='text'
              disabled={!edit}
              $listData={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'numero', 'Por favor, digite o numero do logradouro', setNumero)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('telecomplementofone')}>
            <Legend>Complemento:</Legend>
            <Input
              $error={!!getErrorMessageByFieldName('complemento')}
              value={complemento}
              placeholder='Ex.: Galpão 3'
              type='text'
              disabled={!edit}
              $listData={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'complemento', 'Por favor, digite o complemento da obra', setComplemento)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('bairro')}>
            <Legend>Bairro:</Legend>
            <Input
              $error={!!getErrorMessageByFieldName('bairro')}
              value={bairro}
              placeholder='Ex.: Paraíso'
              disabled={!edit}
              $listData={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'bairro', 'Por favor, digite o bairro', setBairro)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('cidade')}>
            <Legend>Cidade:</Legend>
            <Input
              $error={!!getErrorMessageByFieldName('cidade')}
              value={cidade}
              placeholder='Ex.: Betim'
              disabled={!edit}
              $listData={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'cidade', 'Por favor, digite a cidade da obra', setCidade)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('uf')}>
            <Legend>UF:</Legend>
            <Input
              $error={!!getErrorMessageByFieldName('uf')}
              value={uf}
              $listData={!edit}
              placeholder='Ex.: MG'
              disabled={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'uf', 'Por favor, digite aUF da obra', setUf)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('status')}>
            <Legend>Situação:</Legend>
            <Select
              $error={!!getErrorMessageByFieldName('status')}
              value={status}
              disabled={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'status', 'Por favor, digite o status da obra', setStatus)
              }
            >
              <option value={'1'}>Ativo</option>
              <option value={'2'}>Inativo</option>
              <option value={'3'}>Cancelado</option>
              <option value={'4'}>Entregue</option>
            </Select>
          </FormGroup>
        </Form>
        <ButtonContainer>
          <Button disabled={!data ? !formIsValid : !edit} $green onClick={handleCreateObra}>{!data ? 'Cadastrar' : 'Salvar'}</Button>
        </ButtonContainer>
      </Container>
    </GlobalContainer>
  )
}

export default Infos
