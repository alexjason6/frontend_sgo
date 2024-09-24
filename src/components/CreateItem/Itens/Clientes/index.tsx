/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useState, type Dispatch, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'

import ModalContext from '../../../../contexts/modalContext'
import LoadingContext from '../../../../contexts/loadingContext'
import ClienteMapper from '../../../../services/mappers/ClienteMapper'
import AuthContext from '../../../../contexts/authContext'
import ClientesContext from '../../../../contexts/clientesContext'

import ClientesServices from '../../../../services/sgo/ClientesServices'
import CepServices from '../../../../services/cep/CepServices'

import Menu from '../../../Menu'
import Header from '../../../Header'
import Input from '../../../Input'
import Select from '../../../Select'
import Button from '../../../Button'
import FormGroup from '../../../FormGroup'

import phoneFormat from '../../../../utils/phoneFormat'
import cepFormat from '../../../../utils/cepFormat'
import cpfCnpjFormat from '../../../../utils/cpfCnpjFormat'
import Toast from '../../../../utils/toast'

import { Container, Edit, EditIcon, ButtonContainer, Form } from './styles'

import { type Cliente } from '../../../../interfaces/globalInterfaces'
import { GlobalContainer, Legend } from '../../../../assets/styles/global'
import useErrors from '../../../../hooks/useErrors'
import isEmailValid from '../../../../utils/isEmailValid'

interface Data {
  cliente?: Cliente
}

const CreateCliente: React.FC<Data> = ({ cliente }) => {
  const { token } = useContext(AuthContext)
  const { isOpen, changeModal } = useContext(ModalContext)
  const { changeLoading } = useContext(LoadingContext)
  const { listClientes } = useContext(ClientesContext)
  const navigate = useNavigate()
  const [edit, setEdit] = useState(!cliente)
  const [razaoSocial, setRazaoSocial] = useState(cliente ? cliente.razao_social : '')
  const [nome, setNome] = useState(cliente ? cliente.nome : '')
  const [cpfCnpj, setCpfCnpj] = useState(cliente ? cliente.cpf_cnpj : '')
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState(cliente ? cliente.inscricao_municipal : '')
  const [inscricaoEstadual, setInscricaoEstadual] = useState(cliente ? cliente.inscricao_estadual : '')
  const [responsavel, setResponsavel] = useState(cliente ? cliente.responsavel : '')
  const [telefone, setTelefone] = useState(cliente ? cliente.telefone : '')
  const [email, setEmail] = useState(cliente ? cliente.email : '')
  const [responsavelFinanceiro, setResponsavelFinanceiro] = useState(cliente ? cliente.responsavel_financeiro : '')
  const [telefoneFinanceiro, setTelefoneFinanceiro] = useState(cliente ? cliente.telefone_financeiro : '')
  const [emailFinanceiro, setEmailFinanceiro] = useState(cliente ? cliente.email_financeiro : '')
  const [cep, setCep] = useState(cliente ? cliente.cep : '')
  const [logradouro, setLogradouro] = useState(cliente ? cliente.logradouro : '')
  const [numero, setNumero] = useState(cliente ? cliente.numero : '')
  const [complemento, setComplemento] = useState(cliente ? cliente.complemento : '')
  const [bairro, setBairro] = useState(cliente ? cliente.bairro : '')
  const [cidade, setCidade] = useState(cliente ? cliente.cidade : '')
  const [uf, setUf] = useState(cliente ? cliente.uf : '')
  const { errors, setError, removeError, getErrorMessageByFieldName } = useErrors()
  const formIsValid = uf && cep && nome && cpfCnpj && email && telefone && razaoSocial && logradouro && bairro && cidade && errors.length === 0

  const handleEditInfos = () => {
    setEdit(!edit)
  }

  const handleChangeField = async (setItem: Dispatch<SetStateAction<string | number>>, fieldName: string, message: string, value: string | number) => {
    console.log(setItem === setEmail, value)
    if (setItem === setEmail || setItem === setEmailFinanceiro) {
      console.log('passou aqui email')
      setItem(value.toString().toLowerCase())
    }

    if (setItem === setCep && value.toString().replace('-', '').length === 8) {
      console.log('cep')
      void fetchCep(value.toString())
    }

    if ((setItem !== setEmail && setItem !== setEmailFinanceiro) && typeof value === 'number') {
      console.log('passou aqui não email = number')
      setItem(value)
    }

    if ((setItem !== setEmail && setItem !== setEmailFinanceiro) && typeof value === 'string') {
      console.log('passou aqui não email = string')
      setItem(value.toUpperCase())
    }

    if (!value) {
      setError({ field: fieldName, message })
    } else if (setItem === setEmail && !isEmailValid(value.toString())) {
      setError({ field: 'email', message: 'Digite um e-mail válido para entrar.' })
    } else {
      removeError(fieldName)
    }
  }

  const fetchCep = async (value: string) => {
    const cepResponse = await CepServices.buscaCep(value.replace('-', ''))

    if (!cepResponse || cepResponse.data.erro) {
      Toast({ type: 'danger', text: 'CEP não encontrado.', duration: 2000 })
    }

    if (!cepResponse.data.erro) {
      setLogradouro(cepResponse.data.logradouro)
      setBairro(cepResponse.data.bairro)
      setCidade(cepResponse.data.localidade)
      setUf(cepResponse.data.uf)
    }
  }

  const handleCreateCliente = async () => {
    try {
      changeLoading(true, 'Enviando os dados do cliente...')

      const data = {
        id: Number(cliente?.id),
        nome,
        razaoSocial,
        cpfCnpj,
        inscricaoMunicipal,
        inscricaoEstadual,
        telefone,
        email,
        telefoneFinanceiro,
        emailFinanceiro,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
        responsavel,
        responsavelFinanceiro,
        status: 1
      }

      const mapperCliente = ClienteMapper.toPersistence(data)
      const create = !cliente
        ? await ClientesServices.create({ token, mapperCliente })
        : await ClientesServices.update({ token, mapperCliente })

      if (create.id) {
        clearFormFields()
      }

      changeLoading(true, 'atualizando lista de clientes...')
      await listClientes({ token })

      if (isOpen) {
        changeModal()
      }

      if (!isOpen) {
        navigate('/clientes')
      }

      Toast({ type: 'success', text: 'Cliente cadastrado com sucesso.', duration: 5000 })
    } catch (error) {
      Toast({ type: 'danger', text: 'Erro ao criar/atualizar cliente.', duration: 5000 })
      console.error('Erro ao criar/atualizar cliente:', error)
    } finally {
      changeLoading(false)
    }
  }

  const clearFormFields = () => {
    setNome('')
    setRazaoSocial('')
    setCpfCnpj('')
    setCep('')
    setLogradouro('')
    setNumero('')
    setComplemento('')
    setBairro('')
    setCidade('')
    setUf('')
    setResponsavel('')
    setEmailFinanceiro('')
    setTelefone('')
    setEmail('')
    setTelefoneFinanceiro('')
    setResponsavelFinanceiro('')
  }

  return (
    <GlobalContainer>
      {(!isOpen && !cliente) && <Menu />}
      {!cliente && <Header title='Cadastrar novo cliente' subHeader={isOpen} />}
      {cliente && <Header title={`Editar cliente - ${nome}`} modal />}
      <Container>
       {cliente && <Edit>
          <p onClick={handleEditInfos}>{!edit ? 'Editar dados' : 'Cancelar edição'}</p>
          <EditIcon onClick={handleEditInfos} />
        </Edit>}

        <Form>
          <FormGroup $error={getErrorMessageByFieldName('razaoSocial')}>
            <Legend>Razão Social: <sup>*</sup></Legend>
            <Input
              value={razaoSocial}
              type='text'
              required
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('razaoSocial')}
              onChange={(event) => handleChangeField(setRazaoSocial as Dispatch<SetStateAction<string | number>>, 'razaoSocial', 'Digite a razão social.', event.target.value)}
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('nome')}>
            <Legend>Nome: <sup>*</sup></Legend>
            <Input
              value={nome}
              type='text'
              required
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('nome')}
              onChange={(event) => handleChangeField(setNome as Dispatch<SetStateAction<string | number>>, 'nome', 'Digite o nome do cliente.', event.target.value)}
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('cpfCnpj')}>
            <Legend>CPF/CNPJ: <sup>*</sup></Legend>
            <Input
              value={cpfCnpj && cpfCnpjFormat(cpfCnpj)}
              disabled={!edit}
              type='tel'
              required
              maxLength={18}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('cpfCnpj')}
              onChange={(event) => handleChangeField(setCpfCnpj as Dispatch<SetStateAction<string | number>>, 'cpfCnpj', 'Digite o CPF ou CNPJ.', event.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Legend>Inscrição municipal:</Legend>
            <Input
              value={inscricaoMunicipal}
              disabled={!edit}
              type='text'
              $listData={!edit}
              onChange={(event) => handleChangeField(setInscricaoMunicipal as Dispatch<SetStateAction<string | number>>, '', '', event.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Legend>Inscrição estadual:</Legend>
            <Input
              value={inscricaoEstadual}
              disabled={!edit}
              type='text'
              $listData={!edit}
              onChange={(event) => handleChangeField(setInscricaoEstadual as Dispatch<SetStateAction<string | number>>, '', '', event.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Legend>Responsável:</Legend>
            <Input
              value={responsavel}
              disabled={!edit}
              $listData={!edit}
              type='text'
              onChange={(event) => handleChangeField(setResponsavel as Dispatch<SetStateAction<string | number>>, '', '', event.target.value)}
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('telefone')}>
            <Legend>Telefone: <sup>*</sup></Legend>
            <Input
              value={telefone && phoneFormat(telefone)}
              type='tel'
              required
              maxLength={15}
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('telefone')}
              onChange={(event) => handleChangeField(setTelefone as Dispatch<SetStateAction<string | number>>, 'telefone', 'Digite o telefone do cliente.', event.target.value)}
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('email')}>
            <Legend>e-Mail: <sup>*</sup></Legend>
            <Input
              value={email}
              type='email'
              required
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('email')}
              onChange={(event) => handleChangeField(setEmail as Dispatch<SetStateAction<string | number>>, 'email', 'Digite um email para o cliente.', event.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Legend>Financeiro:</Legend>
            <Input
              value={responsavelFinanceiro}
              disabled={!edit}
              type='text'
              $listData={!edit}
              onChange={(event) => handleChangeField(setResponsavelFinanceiro as Dispatch<SetStateAction<string | number>>, '', '', event.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Legend>Telefone financeiro:</Legend>
            <Input
              value={telefoneFinanceiro && phoneFormat(telefoneFinanceiro)}
              disabled={!edit}
              $listData={!edit}
              type='tel'
              maxLength={15}
              onChange={(event) => handleChangeField(setTelefoneFinanceiro as Dispatch<SetStateAction<string | number>>, '', '', event.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Legend>e-Mail financeiro:</Legend>
            <Input
              value={emailFinanceiro}
              disabled={!edit}
              $listData={!edit}
              type='email'
              onChange={(event) => handleChangeField(setEmailFinanceiro as Dispatch<SetStateAction<string | number>>, '', '', event.target.value)}
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('cep')}>
            <Legend>CEP: <sup>*</sup></Legend>
            <Input
              value={cep && cepFormat(cep)}
              disabled={!edit}
              $listData={!edit}
              maxLength={8}
              type='tel'
              required
              $error={!!getErrorMessageByFieldName('cep')}
              onChange={(event) => handleChangeField(setCep as Dispatch<SetStateAction<string | number>>, '', '', event.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Legend>Logradouro: <sup>*</sup></Legend>
            <Input
              value={logradouro}
              disabled={!edit}
              $listData={!edit}
              type='text'
              required
              onChange={(event) => handleChangeField(setLogradouro as Dispatch<SetStateAction<string | number>>, '', '', event.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Legend>Número:</Legend>
            <Input
              value={numero}
              disabled={!edit}
              $listData={!edit}
              type='text'
              onChange={(event) => handleChangeField(setNumero as Dispatch<SetStateAction<string | number>>, '', '', event.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Legend>Complemento:</Legend>
            <Input
              value={complemento}
              disabled={!edit}
              $listData={!edit}
              type='text'
              onChange={(event) => handleChangeField(setComplemento as Dispatch<SetStateAction<string | number>>, '', '', event.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Legend>Bairro: <sup>*</sup></Legend>
            <Input
              value={bairro}
              disabled={!edit}
              $listData={!edit}
              type='text'
              required
              onChange={(event) => handleChangeField(setBairro as Dispatch<SetStateAction<string | number>>, '', '', event.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Legend>Cidade: <sup>*</sup></Legend>
            <Input
              value={cidade}
              disabled={!edit}
              $listData={!edit}
              type='text'
              required
              onChange={(event) => handleChangeField(setCidade as Dispatch<SetStateAction<string | number>>, '', '', event.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Legend>UF: <sup>*</sup></Legend>
            <Select
              value={uf}
              disabled={!edit}
              required
              onChange={(event) => handleChangeField(setUf as Dispatch<SetStateAction<string | number>>, '', '', event.target.value)}
            >
              <option value={uf}>{uf}</option>
            </Select>
          </FormGroup>
        </Form>
        <ButtonContainer>
          <Button disabled={!cliente ? !formIsValid : !edit} $green onClick={handleCreateCliente}>{!cliente ? 'Cadastrar' : 'Salvar'}</Button>
        </ButtonContainer>
      </Container>
    </GlobalContainer>
  )
}

export default CreateCliente
