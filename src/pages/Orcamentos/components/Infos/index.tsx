/* eslint-disable @typescript-eslint/no-misused-promises */

import React, { useState, type Dispatch, type SetStateAction, type ChangeEvent, useContext, useEffect } from 'react'
import moment from 'moment'

import { GlobalContainer, Legend } from '../../../../assets/styles/global'

import LoadingContext from '../../../../contexts/loadingContext'
import ModalContext from '../../../../contexts/modalContext'
import AuthContext from '../../../../contexts/authContext'
import UsersContext from '../../../../contexts/usersContext'
import ClientesContext from '../../../../contexts/clientesContext'
import ObrasContext from '../../../../contexts/obrasContext'

import Input from '../../../../components/Input'
import Select from '../../../../components/Select'
import Button from '../../../../components/Button'
import FormGroup from '../../../../components/FormGroup'
import Header from '../../../../components/Header'
import Menu from '../../../../components/Menu'

import Toast from '../../../../utils/toast'

import OrcamentosServices from '../../../../services/sgo/OrcamentosServices'
import OrcamentoMapper from '../../../../services/mappers/OrcamentoMapper'

import useErrors from '../../../../hooks/useErrors'

import { Container, Edit, EditIcon, ButtonContainer, Form } from './styles'

import { type Orcamento } from '../../../../interfaces/globalInterfaces'

interface Data {
  data?: Orcamento
}

const Infos: React.FC<Data> = ({ data }) => {
  const { token } = useContext(AuthContext)
  const { listUsers } = useContext(UsersContext)
  const { clientes, listClientes } = useContext(ClientesContext)
  const { obras, listObras } = useContext(ObrasContext)
  const { changeLoading } = useContext(LoadingContext)
  const { isOpen, changeModal } = useContext(ModalContext)

  const [edit, setEdit] = useState(!data)
  const [nome, setNome] = useState(data?.nome ?? '')
  const [dataCriacao, setDataCriacao] = useState(data?.data_criacao ?? '')
  const [idCliente, setIdCliente] = useState(data?.id_cliente ?? 0)
  const [obra, setObra] = useState(data?.obra ?? 0)
  const [status, setStatus] = useState(data?.status ?? 0)

  const [obrasCliente, setObrasCliente] = useState(obras.filter((item) => item.id_cliente === idCliente))

  const { errors, setError, removeError, getErrorMessageByFieldName } = useErrors()
  const formIsValid = idCliente && nome && dataCriacao && status && obra && errors.length === 0

  const handleEditInfos = () => {
    setEdit(!edit)
  }

  const handleChangeItem = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>, fieldName: string, message: string, setState: Dispatch<SetStateAction<any>>) => {
    const value = fieldName === 'cliente' || fieldName === 'obra' ? Number(event.target.value) : event.target.value

    setState(value)

    if (fieldName === 'cliente') {
      console.log('passou aqui: ', value)
      setObrasCliente(obras.filter((item) => item.id_cliente === value))
    }

    if (!value) {
      setError({ field: fieldName, message })
    } else {
      removeError(fieldName)
    }
  }

  const handleCreateOrcamentos = async () => {
    try {
      changeLoading(true, 'Enviando dados...')

      const dataOrcamento = {
        nome,
        dataCriacao: String(moment(dataCriacao).unix()),
        idCliente: Number(idCliente),
        obra: Number(obra),
        status: Number(status)
      }

      const mapperOrcamento = OrcamentoMapper.toPersistence(dataOrcamento)
      const create = !data
        ? await OrcamentosServices.create({ token, mapperOrcamento })
        : await OrcamentosServices.update({ token, mapperOrcamento })

      if (create.id) {
        clearFormFields()
      }

      changeLoading(true, 'Atualizando lista de orçamentos...')
      await listUsers({ token })

      if (isOpen) {
        changeModal()
      }

      Toast({ type: 'success', text: 'Orçamento cadastrado com sucesso.', duration: 5000 })
    } catch (error) {
      console.error('Erro ao criar/atualizar orçamento:', error)
      Toast({ type: 'danger', text: 'Erro ao criar/atualizar orçamento.', duration: 5000 })
    } finally {
      changeLoading(false)
    }
  }

  const clearFormFields = () => {
    setNome('')
    setObra(Number)
    setIdCliente(Number)
    setDataCriacao('')
  }

  const getData = async () => {
    await listObras({ token })
    await listClientes({ token })
  }

  useEffect(() => {
    changeLoading(true, 'Buscando clientes...')
    if (!clientes || clientes.length === 0) {
      void getData()
    }

    const timeout = setTimeout(() => {
      changeLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [clientes, obras])

  return (

    <GlobalContainer>
      {!isOpen && <Menu />}
      <Container>
        {data && (
          <Edit>
            <p onClick={handleEditInfos}>{!edit ? 'Editar dados' : 'Cancelar edição'}</p>
            <EditIcon onClick={handleEditInfos} />
          </Edit>
        )}
        {(edit && !data) && <Header title={!data ? 'Cadastrar novo orçamento' : 'Editar orçamento'} subHeader={!!data} fullwidth={!!data} modal={!data} />}
        <Form $create={!data}>
          <FormGroup $error={getErrorMessageByFieldName('nome')}>
            <Legend>Nome:<sup>*</sup></Legend>
            <Input
              $error={!!getErrorMessageByFieldName('nome')}
              placeholder='Ex.: Reforma 4º andar'
              value={nome}
              disabled={!edit}
              $listData={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'nome', 'Por favor, digite o nome do usuário', setNome)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('cliente')}>
            <Legend>Cliente:<sup>*</sup></Legend>
            <Select
              $error={!!getErrorMessageByFieldName('cliente')}
              disabled={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'cliente', 'Por favor, selecione um cliente', setIdCliente)
              }
            >
              <option value=''>Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('obra')}>
            <Legend>Obra:<sup>*</sup></Legend>
            <Select
              $error={!!getErrorMessageByFieldName('obra')}
              disabled={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'obra', 'Por favor, selecione a obra do cliente', setObra)
              }
            >
              <option value=''>Selecione uma obra</option>
              {obrasCliente?.map((item) => (
                <option key={item.id} value={item.id}>{item.nome}</option>
              ))}
            </Select>
          </FormGroup>

          {!data && <FormGroup $error={getErrorMessageByFieldName('dataCriacao')}>
            <Legend>Data criação:<sup>*</sup></Legend>
            <Input
              $error={!!getErrorMessageByFieldName('dataCriacao')}
              value={dataCriacao}
              type='date'
              disabled={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'dataCriacao', 'Por favor, digite a data de criação', setDataCriacao)
              }
            />
          </FormGroup>}

          <FormGroup $error={getErrorMessageByFieldName('status')}>
            <Legend>Situacao:<sup>*</sup></Legend>
            <Select
              $error={!!getErrorMessageByFieldName('status')}
              value={status}
              disabled={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'status', 'Por favor, selecione uma situação', setStatus)
              }
            >
              <option value={'1'}>Ativo</option>
              <option value={'2'}>Inativo</option>
            </Select>
          </FormGroup>

        </Form>
        <Header title='Itens do orçamento' subHeader modal />
        <ButtonContainer>
          <Button disabled={!data ? !formIsValid : !edit} $green onClick={handleCreateOrcamentos}>{!data ? 'Cadastrar' : 'Salvar'}</Button>
        </ButtonContainer>
      </Container>
    </GlobalContainer>
  )
}

export default Infos
