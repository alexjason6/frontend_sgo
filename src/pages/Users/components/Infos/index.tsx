/* eslint-disable @typescript-eslint/no-misused-promises */

import React, { useState, type Dispatch, type SetStateAction, type ChangeEvent, useContext } from 'react'

import { Legend } from '../../../../assets/styles/global'

import LoadingContext from '../../../../contexts/loadingContext'
import ModalContext from '../../../../contexts/modalContext'
import AuthContext from '../../../../contexts/authContext'
import UsersContext from '../../../../contexts/usersContext'

import Input from '../../../../components/Input'
import Select from '../../../../components/Select'
import Button from '../../../../components/Button'
import FormGroup from '../../../../components/FormGroup'
import Header from '../../../../components/Header'

import phoneFormat from '../../../../utils/phoneFormat'
import cepFormat from '../../../../utils/cepFormat'
import cpfCnpjFormat from '../../../../utils/cpfCnpjFormat'
import isEmailValid from '../../../../utils/isEmailValid'

import UserServices from '../../../../services/sgo/UsersServices'
import CepServices from '../../../../services/cep/CepServices'
import UserMapper from '../../../../services/mappers/UserMapper'

import useErrors from '../../../../hooks/useErrors'

import { Container, Edit, EditIcon, ButtonContainer, Form } from './styles'

import { type User } from '../../../../interfaces/globalInterfaces'

interface Data {
  data?: User
}

const Infos: React.FC<Data> = ({ data }) => {
  const { token } = useContext(AuthContext)
  const { changeLoading } = useContext(LoadingContext)
  const { isOpen, changeModal } = useContext(ModalContext)
  const { listUsers } = useContext(UsersContext)

  const [edit, setEdit] = useState(!data)
  const [nome, setNome] = useState(data?.nome ?? '')
  const [cpf, setCpf] = useState(data?.cpf ?? '')
  const [telefone, setTelefone] = useState(data?.telefone ?? '')
  const [email, setEmail] = useState(data?.email ?? '')
  const [cep, setCep] = useState(data?.cep ?? '')
  const [logradouro, setLogradouro] = useState(data?.logradouro ?? '')
  const [numero, setNumero] = useState(data?.numero ?? '')
  const [complemento, setComplemento] = useState(data?.complemento ?? '')
  const [bairro, setBairro] = useState(data?.bairro ?? '')
  const [cidade, setCidade] = useState(data?.cidade ?? '')
  const [uf, setUf] = useState(data?.uf ?? '')
  const [status, setStatus] = useState(data?.status ?? '1')
  const [permissoes, setPermissoes] = useState<string[]>(data?.permissoes ?? [''])
  const [password, setPassword] = useState('')

  const { errors, setError, removeError, getErrorMessageByFieldName } = useErrors()
  const formIsValid = isEmailValid(email) && telefone && nome && cpf && status && errors.length === 0

  const handleEditInfos = () => {
    setEdit(!edit)
  }

  const handleChangeItem = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>, fieldName: string, message: string, setState: Dispatch<SetStateAction<string>>) => {
    const value = fieldName === 'email' || fieldName === 'emailFinanceiro' ? event.target.value.toLowerCase() : event.target.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')

    setState(value)

    // Lidar com campos específicos de forma separada
    if (setState === setCep && value.length >= 8) {
      void fetchCep(value)
    }

    if (!value) {
      setError({ field: fieldName, message })
    } else if (setState === setEmail && !isEmailValid(value)) {
      setError({ field: 'email', message: 'Digite um e-mail válido para entrar.' })
    } else {
      removeError(fieldName)
    }
  }

  const fetchCep = async (cepValue: string) => {
    const cepResponse = await CepServices.buscaCep(cepValue.replace('-', ''))

    if (cepResponse) {
      setLogradouro(cepResponse.data.logradouro)
      setBairro(cepResponse.data.bairro)
      setCidade(cepResponse.data.localidade)
      setUf(cepResponse.data.uf)
    }
  }

  const handleChangePermissions = (event: ChangeEvent<HTMLSelectElement>) => {
    setPermissoes([event.target.value])
  }

  const handleCreateUser = async () => {
    try {
      changeLoading(true, 'enviando dados...')

      const dataUser = {
        nome,
        cpf,
        telefone,
        email,
        status: Number(status),
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
        password,
        permissoes
      }

      const mapperUser = UserMapper.toPersistence(dataUser)
      const create = !data
        ? await UserServices.create({ token, mapperUser })
        : await UserServices.update({ token, mapperUser })

      if (create.id) {
        clearFormFields()
      }

      changeLoading(true, 'atualizando lista de clientes...')
      await listUsers({ token })

      if (isOpen) {
        changeModal()
      }
    } catch (error) {
      console.error('Erro ao criar/atualizar usuário:', error)
    } finally {
      changeLoading(false)
    }
  }

  const clearFormFields = () => {
    setNome('')
    setCpf('')
    setTelefone('')
    setEmail('')
    setStatus('1')
    setCep('')
    setLogradouro('')
    setNumero('')
    setComplemento('')
    setBairro('')
    setCidade('')
    setUf('')
    setPassword('')
    setPermissoes([''])
  }

  return (
    <Container>
      {data && (
        <Edit>
          <p onClick={handleEditInfos}>{!edit ? 'Editar dados' : 'Cancelar edição'}</p>
          <EditIcon onClick={handleEditInfos} />
        </Edit>
      )}
      {(edit && !data) && <Header title={!data ? 'Cadastrar novo usuário' : 'Editar usuário'} subHeader={!!data} fullwidth={!!data} modal={!data} />}
      <Form $create={!data}>
        <FormGroup $error={getErrorMessageByFieldName('nome')}>
          <Legend>Nome:<sup>*</sup></Legend>
          <Input
            $error={!!getErrorMessageByFieldName('nome')}
            placeholder='Ex.: José Fausto'
            value={nome}
            disabled={!edit}
            $listData={!edit}
            onChange={async (event) =>
              handleChangeItem(event, 'nome', 'Por favor, digite o nome do usuário', setNome)
            }
          />
        </FormGroup>

        <FormGroup $error={getErrorMessageByFieldName('cpf')}>
          <Legend>CPF/CNPJ:<sup>*</sup></Legend>
          <Input
            $error={!!getErrorMessageByFieldName('cpf')}
            placeholder='Ex.: 000.000.000-00'
            type='tel'
            maxLength={14}
            value={cpfCnpjFormat(cpf)}
            disabled={!edit}
            $listData={!edit}
            onChange={async (event) =>
              handleChangeItem(event, 'cpf', 'Por favor, digite o CPF', setCpf)
            }
          />
        </FormGroup>

        <FormGroup $error={getErrorMessageByFieldName('telefone')}>
          <Legend>Telefone:<sup>*</sup></Legend>
          <Input
            $error={!!getErrorMessageByFieldName('telefone')}
            placeholder='Ex.: 31 3333-3333'
            type='tel'
            maxLength={15}
            value={telefone && phoneFormat(telefone)}
            disabled={!edit}
            $listData={!edit}
            onChange={async (event) =>
              handleChangeItem(event, 'telefone', 'Por favor, digite o telefone do usuário', setTelefone)
            }
          />
        </FormGroup>

        <FormGroup $error={getErrorMessageByFieldName('email')}>
          <Legend>e-Mail:<sup>*</sup></Legend>
          <Input
            $error={!!getErrorMessageByFieldName('email')}
            placeholder='Ex.: miranto@miranto.com.br'
            value={email}
            type='email'
            disabled={!edit}
            $listData={!edit}
            onChange={async (event) =>
              handleChangeItem(event, 'email', 'Por favor, digite o email do usuário', setEmail)
            }
          />
        </FormGroup>

        <FormGroup $error={getErrorMessageByFieldName('cep')}>
          <Legend>CEP:<sup>*</sup></Legend>
          <Input
            $error={!!getErrorMessageByFieldName('cep')}
            maxLength={9}
            placeholder='Ex.: 00000-000'
            type='tel'
            value={cepFormat(cep)}
            disabled={!edit}
            $listData={!edit}
            onChange={async (event) =>
              handleChangeItem(event, 'cep', 'Por favor, digite o CEP', setCep)
            }
          />
        </FormGroup>

        <FormGroup $error={getErrorMessageByFieldName('logradouro')}>
          <Legend>Logradouro:</Legend>
          <Input
            $error={!!getErrorMessageByFieldName('logradouro')}
            placeholder='Ex.: Rua Rio de Janeiro'
            value={logradouro}
            disabled={!edit}
            type='text'
            $listData={!edit}
            onChange={async (event) =>
              handleChangeItem(event, 'logradouro', 'Por favor, digite o logradouro', setLogradouro)
            }
          />
        </FormGroup>

        <FormGroup $error={getErrorMessageByFieldName('numero')}>
          <Legend>Número:<sup>*</sup></Legend>
          <Input
            $error={!!getErrorMessageByFieldName('numero')}
            placeholder='Ex.: 1535'
            type='tel'
            value={numero}
            disabled={!edit}
            $listData={!edit}
            onChange={async (event) =>
              handleChangeItem(event, 'numero', 'Por favor, digite o número ou S/N', setNumero)
            }
          />
        </FormGroup>

        <FormGroup $error={getErrorMessageByFieldName('complemento')}>
          <Legend>Complemento:</Legend>
          <Input
            value={complemento}
            placeholder='Ex.: Loja 4'
            type='text'
            disabled={!edit}
            $listData={!edit}
            onChange={async (event) =>
              handleChangeItem(event, '', '', setComplemento)
            }
          />
        </FormGroup>

        <FormGroup $error={getErrorMessageByFieldName('bairro')}>
          <Legend>Bairro:</Legend>
          <Input
            $error={!!getErrorMessageByFieldName('bairro')}
            placeholder='Ex.: Esplanada'
            value={bairro}
            type='text'
            disabled={!edit}
            $listData={!edit}
            onChange={async (event) =>
              handleChangeItem(event, 'bairro', 'Por favor, digite o bairro', setBairro)
            }
          />
        </FormGroup>

        <FormGroup $error={getErrorMessageByFieldName('cidade')}>
          <Legend>Cidade:<sup>*</sup></Legend>
          <Input
            $error={!!getErrorMessageByFieldName('cidade')}
            placeholder='Ex.: São Paulo'
            type='text'
            value={cidade}
            disabled={!edit}
            $listData={!edit}
            readOnly
            onChange={async (event) =>
              handleChangeItem(event, 'cidade', 'Por favor, digite o nome da cidade', setCidade)
            }
          />
        </FormGroup>

        <FormGroup $error={getErrorMessageByFieldName('uf')}>
          <Legend>UF:<sup>*</sup></Legend>
          <Input
            $error={!!getErrorMessageByFieldName('uf')}
            placeholder='Ex.: BA'
            type='text'
            value={uf}
            disabled={!edit}
            readOnly
            onChange={async (event) =>
              handleChangeItem(event, 'uf', 'Por favor, digite a UF', setUf)
            }
          />
        </FormGroup>

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

        <FormGroup $error={getErrorMessageByFieldName('permissoes')}>
          <Legend>Permissões:<sup>*</sup></Legend>
          <Select
            $error={!!getErrorMessageByFieldName('permissoes')}
            disabled={!edit}
            onChange={(event) => handleChangePermissions(event)}
          >
            <option value={'superAdmin'}>Super admin</option>
            <option value={'superAdmin'}>Financeiro</option>
            <option value={'superAdmin'}>Lançamentos</option>
          </Select>
        </FormGroup>

        {!data && <FormGroup $error={getErrorMessageByFieldName('password')}>
          <Legend>Senha:<sup>*</sup></Legend>
          <Input
            $error={!!getErrorMessageByFieldName('password')}
            placeholder='••••••••'
            value={password}
            type='password'
            disabled={!edit}
            onChange={async (event) =>
              handleChangeItem(event, 'password', 'Por favor, digite uma senha para o usuário', setPassword)
            }
          />
        </FormGroup>}
      </Form>
      <ButtonContainer>
        <Button disabled={!data ? !formIsValid : !edit} $green onClick={handleCreateUser}>{!data ? 'Cadastrar' : 'Salvar'}</Button>
      </ButtonContainer>
    </Container>
  )
}

export default Infos
