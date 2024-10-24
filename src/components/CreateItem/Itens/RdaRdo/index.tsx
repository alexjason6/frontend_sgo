/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState, type ChangeEvent, type SetStateAction, type Dispatch, useEffect, useCallback } from 'react'
import moment from 'moment'

import { GlobalContainer, Legend } from '../../../../assets/styles/global'

import LoadingContext from '../../../../contexts/loadingContext'
import ModalContext from '../../../../contexts/modalContext'
import OrcamentosContext from '../../../../contexts/orcamentosContext'
import AuthContext from '../../../../contexts/authContext'
import ObrasContext from '../../../../contexts/obrasContext'
import ClientesContext from '../../../../contexts/clientesContext'

import RdoRdaServices from '../../../../services/sgo/RdoRdaServices'

import Button from '../../../Button'
import FormGroup from '../../../FormGroup'
import { toastEventManager } from '../../../../utils/toast'
import Header from '../../../Header'
import Select from '../../../Select'

import RdoRdaMapper from '../../../../services/mappers/RdoRdaMapper'

import useErrors from '../../../../hooks/useErrors'

import { Container, Form, ButtonContainer } from './styles'

import { type Orcamento, type Obra } from '../../../../interfaces/globalInterfaces'

interface typeParams {
  type: string
}

const CreateRdoRda: React.FC<typeParams> = ({ type }) => {
  const { token } = useContext(AuthContext)
  const { changeLoading } = useContext(LoadingContext)
  const { isOpen, changeModal } = useContext(ModalContext)
  const { orcamentos, listOrcamentos, listModelos } = useContext(OrcamentosContext)
  const { obras, listObras } = useContext(ObrasContext)
  const { clientes, listClientes } = useContext(ClientesContext)
  const [status, setStatus] = useState<number>(0)
  const dataCriacao = moment().unix()
  const [cliente, setCliente] = useState<number>(0)
  const [obra, setObra] = useState<number>(0)
  const [orcamento, setOrcamento] = useState<number>(0)
  const [obrasCliente, setObrasCliente] = useState<Obra[]>([])
  const [orcamentosCliente, setOrcamentosCliente] = useState<Orcamento[]>([])
  const { errors, setError, removeError, getErrorMessageByFieldName } = useErrors()
  const formIsValid = cliente && obra && orcamento && status && errors.length === 0
  console.log(cliente, obra, orcamento, status)

  const handleChangeItem = (event: ChangeEvent<HTMLSelectElement>, fieldName: string, message: string, setState: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<number>>) => {
    const trataValue = Number(event.target.value)

    if (setState === setStatus) {
      setState(trataValue)
    }

    if (setState === setCliente && event.target.value !== '0') {
      const obraCliente = obras.filter((item) => item.id_cliente === Number(event.target.value))
      setObrasCliente(obraCliente)
      setState(trataValue)
    }

    if (setState === setObra && event.target.value !== '0') {
      const orcamentoCliente = orcamentos.filter((item) => item.obra === Number(event.target.value))
      setOrcamentosCliente(orcamentoCliente)
      setState(trataValue)
    }

    if (setState === setOrcamento && event.target.value !== '0') {
      setState(trataValue)
    }

    if (!event.target.value) {
      setError({ field: fieldName, message })
    } else {
      removeError(fieldName)
    }
  }

  const handleCreateFornecedor = async () => {
    try {
      changeLoading(true, 'enviando dados...')

      const data = {
        obra: Number(obra),
        cliente: Number(cliente),
        orcamento: Number(orcamento),
        dataCriacao: String(dataCriacao),
        status: Number(status)
      }

      const mapperRdoRda = RdoRdaMapper.rdaRdoToPersistence(data)
      const create = await RdoRdaServices.createRdoRda({ token, mapperRdoRda, type })

      if (create.id) {
        clearFormFields()
      }

      changeLoading(true, 'atualizando lista de Rdos e Rdas...')
      await listModelos({ token })

      if (isOpen) {
        changeModal()
      }

      toastEventManager.emit('addtoast', {
        type: 'success',
        text: 'Modelo de orçamento criado com sucesso.',
        duration: 5000
      })
    } catch (error) {
      console.error('Erro ao criar/atualizar fornecedor:', error)
      toastEventManager.emit('addtoast', {
        type: 'danger',
        text: 'Erro ao criar o modelo de orçamento.',
        duration: 5000
      })
    } finally {
      changeLoading(false)
    }
  }

  const clearFormFields = () => {
    setStatus(0)
    setCliente(0)
    setObra(0)
    setOrcamento(0)
  }

  const getData = useCallback( async () => {
    changeLoading(true, 'Buscando clientes...')
    await listClientes({ token })

    changeLoading(true, 'Buscando obras...')
    await listObras({ token })

    changeLoading(true, 'Buscando orçamentos...')
    await listOrcamentos({ token })
  }, [listClientes, listObras, listOrcamentos, changeLoading, token])

  useEffect(() => {
    void getData()
  }, [getData])

  return (
    <GlobalContainer>
      <Header title={`Novo documento ${type.toUpperCase()}`} fullwidth/>
      <Container>
        <Form>
          <FormGroup $error={getErrorMessageByFieldName('cliente')}>
            <Legend>Cliente:<sup>*</sup></Legend>
            <Select
              $error={!!getErrorMessageByFieldName('cliente')}
              onChange={(event) =>
                handleChangeItem(event, 'cliente', 'Por favor, selecione o cliente', setCliente)
            }>
              <option>Selecione uma opção</option>
              <option disabled>________________________________</option>
              {clientes.map((item) => (
                <option key={item.id} value={item.id}>{item.nome}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('obra')}>
            <Legend>Obra:<sup>*</sup></Legend>
            <Select
              $error={!!getErrorMessageByFieldName('obra')}
              onChange={(event) =>
                handleChangeItem(event, 'obra', 'Por favor, selecione o obra', setObra)
            }>
              <option>Selecione uma opção</option>
              <option disabled>________________________________</option>
              {obrasCliente.map((item) => (
                <option key={item.id} value={item.id}>{item.nome}</option>
              )
              )}
            </Select>
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('orcamento')}>
            <Legend>Orçamento:<sup>*</sup></Legend>
            <Select
              $error={!!getErrorMessageByFieldName('orcamento')}
              onChange={(event) =>
                handleChangeItem(event, 'orcamento', 'Por favor, selecione o orcamento', setOrcamento)
            }>
              <option>Selecione uma opção</option>
              <option disabled>________________________________</option>
              {orcamentosCliente.map((item) => (
                <option key={item.id} value={item.id}>{item.nome}</option>
              )
              )}
            </Select>
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('status')}>
            <Legend>Status:<sup>*</sup></Legend>
            <Select
              value={status}
              $error={!!getErrorMessageByFieldName('status')}
              onChange={(event) =>
                handleChangeItem(event, 'status', 'Por favor, selecione o status', setStatus)
            }>
              <option>Selecione uma opção</option>
              <option value={1}>Ativo</option>
              <option value={2}>Inativo</option>
              <option value={3}>Cancelado</option>
            </Select>
          </FormGroup>
        </Form>
        <ButtonContainer>
          <Button disabled={!formIsValid} onClick={handleCreateFornecedor} $green>Salvar</Button>
        </ButtonContainer>
      </Container>
    </GlobalContainer>
  )
}

export default CreateRdoRda
