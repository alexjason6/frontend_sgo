/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState, type ChangeEvent, type SetStateAction, type Dispatch } from 'react'
import moment from 'moment'

import { GlobalContainer, Legend } from '../../../../assets/styles/global'

import LoadingContext from '../../../../contexts/loadingContext'
import ModalContext from '../../../../contexts/modalContext'
import OrcamentosContext from '../../../../contexts/orcamentosContext'
import AuthContext from '../../../../contexts/authContext'

import OrcamentosServices from '../../../../services/sgo/OrcamentosServices'
import OrcamentoMapper from '../../../../services/mappers/OrcamentoMapper'

import Input from '../../../Input'
import Button from '../../../Button'
import FormGroup from '../../../FormGroup'
import { toastEventManager } from '../../../../utils/toast'
import Header from '../../../Header'
import Select from '../../../Select'

import useErrors from '../../../../hooks/useErrors'

import { Container, Form, ButtonContainer } from './styles'

const CreateModelo: React.FC = () => {
  const { token } = useContext(AuthContext)
  const { changeLoading } = useContext(LoadingContext)
  const { isOpen, changeModal } = useContext(ModalContext)
  const { listModelos } = useContext(OrcamentosContext)
  const tipo = 0
  const [nome, setNome] = useState<string>('')
  const [status, setStatus] = useState<number>(0)
  const dataCriacao = moment().unix()
  const { errors, setError, removeError, getErrorMessageByFieldName } = useErrors()
  const formIsValid = nome && status && errors.length === 0

  const handleChangeItem = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>, fieldName: string, message: string, setState: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<number>>) => {
    if (setState === setStatus) {
      const trataValue = Number(event.target.value)
      setState(trataValue)
    }

    if (setState === setNome) {
      setState(event.target.value)
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
        nome,
        tipo,
        dataCriacao: String(dataCriacao),
        status: Number(status)
      }

      const mapperModelo = OrcamentoMapper.modeloToPersistence(data)
      const create = await OrcamentosServices.createModelo({ token, mapperModelo })

      if (create.id) {
        clearFormFields()
      }

      changeLoading(true, 'atualizando lista de modelos...')
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
    setNome('')
    setStatus(0)
  }

  return (
    <GlobalContainer>
      <Header title='Novo modelo de orçamento' fullwidth/>
      <Container>
        <Form>
        <FormGroup $error={getErrorMessageByFieldName('nome')}>
            <Legend>Nome:<sup>*</sup></Legend>
            <Input
              placeholder='Ex.: Padrão modelo Flex'
              value={nome}
              $error={!!getErrorMessageByFieldName('nome')}
              type='text'
              required
              onChange={(event) =>
                handleChangeItem(event, 'nome', 'Por favor, digite o nome do fornecedor', setNome)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('status')}>
            <Legend>Status:<sup>*</sup></Legend>
            <Select
              value={status}
              $error={!!getErrorMessageByFieldName('status')}
              required
              onChange={(event) =>
                handleChangeItem(event, 'status', 'Por favor, selecione o status', setStatus)
            }>
              <option>Selecione uma opção</option>
              <option disabled>________________________________</option>
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

export default CreateModelo
