/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState, type Dispatch, type SetStateAction, type ChangeEvent } from 'react'

import { GlobalContainer, Legend } from '../../../../assets/styles/global'

import LoadingContext from '../../../../contexts/loadingContext'
import ModalContext from '../../../../contexts/modalContext'
import FornecedoresContext from '../../../../contexts/fornecedoresContext'
import AuthContext from '../../../../contexts/authContext'

import Input from '../../../Input'
import Button from '../../../Button'
import FormGroup from '../../../FormGroup'
import Header from '../../../Header'
import Select from '../../../Select'
import Menu from '../../../Menu'

import phoneFormat from '../../../../utils/phoneFormat'
import cepFormat from '../../../../utils/cepFormat'
import cpfCnpjFormat from '../../../../utils/cpfCnpjFormat'
import isEmailValid from '../../../../utils/isEmailValid'
import Toast from '../../../../utils/toast'

import CepServices from '../../../../services/cep/CepServices'
import FornecedoresServices from '../../../../services/sgo/FornecedoresServices'
import FornecedoresMapper from '../../../../services/mappers/FornecedoresMapper'

import useErrors from '../../../../hooks/useErrors'

import { Container, Edit, EditIcon, ButtonContainer, Form } from './styles'

import { type Fornecedores } from '../../../../interfaces/globalInterfaces'
import SerproServices from '../../../../services/serpro/SerproServices'

interface Data {
  fornecedor?: Fornecedores
}

const CreateFornecedor: React.FC<Data> = ({ fornecedor }) => {
  const { token } = useContext(AuthContext)
  const { changeLoading } = useContext(LoadingContext)
  const { isOpen, changeModal } = useContext(ModalContext)
  const { listFornecedores } = useContext(FornecedoresContext)

  const [edit, setEdit] = useState(!fornecedor)
  const [razaoSocial, setRazaoSocial] = useState(fornecedor?.razao_social ?? '')
  const [nome, setNome] = useState(fornecedor?.nome ?? '')
  const [cpfCnpj, setCpfCnpj] = useState(fornecedor?.cpf_cnpj ?? '')
  const [responsavel, setResponsavel] = useState(fornecedor?.responsavel ?? '')
  const [telefone, setTelefone] = useState(fornecedor?.telefone ?? '')
  const [email, setEmail] = useState(fornecedor?.email ?? '')
  const [responsavelFinanceiro, setResponsavelFinanceiro] = useState(fornecedor?.responsavel_financeiro ?? '')
  const [telefoneFinanceiro, setTelefoneFinanceiro] = useState(fornecedor?.telefone_financeiro ?? '')
  const [emailFinanceiro, setEmailFinanceiro] = useState(fornecedor?.email_financeiro ?? '')
  const [cep, setCep] = useState(fornecedor?.cep ?? '')
  const [logradouro, setLogradouro] = useState(fornecedor?.logradouro ?? '')
  const [numero, setNumero] = useState(fornecedor?.numero ?? '')
  const [complemento, setComplemento] = useState(fornecedor?.complemento ?? '')
  const [bairro, setBairro] = useState(fornecedor?.bairro ?? '')
  const [cidade, setCidade] = useState(fornecedor?.cidade ?? '')
  const [status, setStatus] = useState(fornecedor?.status ?? '1')
  const [banco, setBanco] = useState(fornecedor?.banco ?? '')
  const [agencia, setAgencia] = useState(fornecedor?.agencia ?? '')
  const [conta, setConta] = useState(fornecedor?.conta ?? '')
  const [tipoConta, setTipoConta] = useState(fornecedor?.tipo_conta ?? '')
  const [pix, setPix] = useState(fornecedor?.pix ?? '')
  const [uf, setUf] = useState(fornecedor?.uf ?? '')

  const { errors, setError, removeError, getErrorMessageByFieldName } = useErrors()
  const formIsValid = isEmailValid(email) && telefone && nome && cpfCnpj && status && cep && errors.length === 0

  const handleEditInfos = () => {
    setEdit(!edit)
  }

  const handleChangeItem = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>, fieldName: string, message: string, setState: Dispatch<SetStateAction<string>>) => {
    const value = fieldName === 'email' || fieldName === 'emailFinanceiro' ? event.target.value.toLowerCase() : event.target.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')

    setState(value)

    if (setState === setCpfCnpj) {
      const cpfCnpjValue = value.replaceAll('.', '').replace('/', '').replace('-', '')

      void fetchCpfCnpj(cpfCnpjValue)
    }

    // Lidar com campos específicos de forma separada
    if (setState === setCep) {
      const cepValue = value.replace('-', '')

      if (cepValue.length === 8) {
        void fetchCep(value)
      }
    }

    if (!value) {
      setError({ field: fieldName, message })
    } else if (setState === setEmail && !isEmailValid(value)) {
      setError({ field: 'email', message: 'Digite um e-mail válido para entrar.' })
    } else if (setState === setEmailFinanceiro && !isEmailValid(value)) {
      setError({ field: 'emailFinanceiro', message: 'Digite um e-mail válido para entrar.' })
    } else {
      removeError(fieldName)
    }
  }

  const fetchCpfCnpj = async (cpfCnpjValue: string) => {
    const value = cpfCnpjValue.replaceAll('.', '').replace('/', '').replace('-', '')

    if (value.length === 11) {
      const dataCpf = await SerproServices.buscaCpf(value)

      if (dataCpf?.status === 200) {
        setNome(dataCpf?.data.nome)
      }
    }

    if (value.length === 14) {
      const dataCnpj = await SerproServices.buscaCnpj(value)

      if (dataCnpj?.status === 200) {
        setNome(dataCnpj.data.nomeFantasia)
        setRazaoSocial(dataCnpj.data.nomeEmpresarial)
        setCep(dataCnpj.data.endereco.cep)
        await fetchCep(dataCnpj.data.endereco.cep)
        setNumero(dataCnpj.data.endereco.numero)
        setComplemento(dataCnpj.data.endereco.complemento)
      }
    }
  }

  const fetchCep = async (cepValue: string) => {
    const cepResponse = await CepServices.buscaCep(cepValue)

    if (cepResponse.data.erro) {
      Toast({ type: 'danger', text: 'CEP não encontrado.', duration: 5000 })
    }

    setLogradouro(cepResponse.data.logradouro)
    setBairro(cepResponse.data.bairro)
    setCidade(cepResponse.data.localidade)
    setUf(cepResponse.data.uf)
  }

  const handleCreateFornecedor = async () => {
    try {
      changeLoading(true, 'Enviando dados do fornecedor...')

      const dataFornecedor = {
        nome,
        cpfCnpj,
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
        responsavelFinanceiro,
        telefoneFinanceiro,
        emailFinanceiro,
        razaoSocial,
        responsavel,
        banco,
        agencia,
        conta,
        tipoConta,
        pix
      }

      const mapperFornecedores = FornecedoresMapper.toPersistence(dataFornecedor)

      const create = !fornecedor
        ? await FornecedoresServices.create({ token, mapperFornecedores })
        : await FornecedoresServices.update({ token, id: fornecedor.id, mapperFornecedores })

      if (create.id) {
        clearFormFields()
      }

      if (fornecedor && create.id) {
        handleEditInfos()
      }

      changeLoading(true, 'atualizando lista de fornecedores...')
      await listFornecedores({ token })

      if (isOpen) {
        changeModal()
      }

      Toast({ type: 'success', text: 'Fornecedor cadastrado com sucesso.', duration: 5000 })
    } catch (error) {
      console.error('Erro ao criar/atualizar fornecedor:', error)
      Toast({ type: 'danger', text: 'Erro ao criar/atualizar fornecedor.', duration: 5000 })
    } finally {
      changeLoading(false)
    }
  }

  const clearFormFields = () => {
    setNome('')
    setCpfCnpj('')
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
    setRazaoSocial('')
    setResponsavel('')
    setResponsavelFinanceiro('')
    setTelefoneFinanceiro('')
    setEmailFinanceiro('')
    setBanco('')
    setAgencia('')
    setConta('')
    setPix('')
    setTipoConta('')
  }

  return (
    <GlobalContainer>
      {(!isOpen && !fornecedor) && <Menu />}
      <Container>
        {fornecedor && (
          <Edit>
            <p onClick={handleEditInfos}>{!edit ? 'Editar dados' : 'Cancelar edição'}</p>
            <EditIcon onClick={handleEditInfos} />
          </Edit>
        )}
        {!fornecedor && <Header title='Cadastrar novo fornecedor' subHeader={isOpen} modal />}
        {fornecedor && <Header title={`Editar fornecedor - ${nome}`} modal />}
        <Form>
          <FormGroup $error={getErrorMessageByFieldName('cpfCnpj')}>
            <Legend>CPF/CNPJ:<sup>*</sup></Legend>
            <Input
              value={cpfCnpjFormat(cpfCnpj)}
              disabled={!edit}
              $listData={!edit}
              maxLength={18}
              $error={!!getErrorMessageByFieldName('cpfCnpj')}
              type='tel'
              onChange={async (event) =>
                handleChangeItem(event, 'cpfCnpj', 'Por favor, digite o CPF/CNPJ', setCpfCnpj)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('nome')}>
            <Legend>Nome:<sup>*</sup></Legend>
            <Input
              placeholder='Ex.: Almeida Pinto Fundações'
              value={nome}
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('nome')}
              type='text'
              onChange={async (event) =>
                handleChangeItem(event, 'nome', 'Por favor, digite o nome do fornecedor', setNome)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('razaoSocial')}>
            <Legend>Razão Social:<sup>*</sup></Legend>
            <Input
              value={razaoSocial}
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('razaoSocial')}
              type='text'
              onChange={async (event) =>
                handleChangeItem(event, 'razaoSocial', 'Por favor, digite a razao social', setRazaoSocial)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('telefone')}>
            <Legend>Telefone:<sup>*</sup></Legend>
            <Input
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('telefone')}
              type='tel'
              maxLength={15}
              value={telefone && phoneFormat(telefone)}
              onChange={async (event) =>
                handleChangeItem(event, 'telefone', 'Por favor, digite o telefone do fornecedor', setTelefone)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('email')}>
            <Legend>e-Mail:<sup>*</sup></Legend>
            <Input
              value={email}
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('email')}
              type='email'
              onChange={async (event) =>
                handleChangeItem(event, 'email', 'Por favor, digite o email', setEmail)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('responsavel')}>
            <Legend>Responsável:</Legend>
            <Input
              value={responsavel}
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('responsavel')}
              type='text'
              onChange={async (event) =>
                handleChangeItem(event, 'responsavel', 'Por favor, digite a pessoal responsável pela empresa', setResponsavel)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('responsavelFinanceiro')}>
            <Legend>Financeiro:</Legend>
            <Input
              value={responsavelFinanceiro}
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('responsavelFinanceiro')}
              type='text'
              onChange={async (event) =>
                handleChangeItem(event, 'responsavelFinanceiro', 'Por favor, digite o responsavel financeiro', setResponsavelFinanceiro)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('telefoneFinanceiro')}>
            <Legend>Telefone financeiro:</Legend>
            <Input
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('telefoneFinanceiro')}
              type='tel'
              maxLength={15}
              value={telefoneFinanceiro && phoneFormat(telefoneFinanceiro)}
              onChange={async (event) =>
                handleChangeItem(event, 'telefoneFinanceiro', 'Por favor, digite o telefone do financeiro', setTelefoneFinanceiro)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('emailFinanceiro')}>
            <Legend>e-Mail financeiro:</Legend>
            <Input
              value={emailFinanceiro}
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('emailFinanceiro')}
              type='email'
              onChange={async (event) =>
                handleChangeItem(event, 'emailFinanceiro', 'Por favor, digite o email do financeiro', setEmailFinanceiro)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('cep')}>
            <Legend>CEP:<sup>*</sup></Legend>
            <Input
              value={cepFormat(cep)}
              disabled={!edit}
              $listData={!edit}
              maxLength={9}
              $error={!!getErrorMessageByFieldName('cep')}
              type='tel'
              onChange={async (event) =>
                handleChangeItem(event, 'cep', 'Por favor, digite o CEP', setCep)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('logradouro')}>
            <Legend>Logradouro:</Legend>
            <Input
              value={logradouro}
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('logradouro')}
              type='text'
              onChange={async (event) =>
                handleChangeItem(event, 'logradouro', 'Por favor, digite o logradouro', setLogradouro)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('numero')}>
            <Legend>Número:</Legend>
            <Input
              value={numero}
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('numero')}
              type='tel'
              onChange={async (event) =>
                handleChangeItem(event, 'numero', 'Por favor, digite o número do logradouro', setNumero)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('complemento')}>
            <Legend>Complemento:</Legend>
            <Input
              value={complemento}
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('complemento')}
              type='text'
              onChange={async (event) =>
                handleChangeItem(event, 'complemento', 'Por favor, digite o complemento do endereço', setComplemento)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('bairro')}>
            <Legend>Bairro:</Legend>
            <Input
              value={bairro}
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('bairro')}
              type='text'
              onChange={async (event) =>
                handleChangeItem(event, 'bairro', 'Por favor, digite o bairro', setBairro)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('cidade')}>
            <Legend>Cidade:<sup>*</sup></Legend>
            <Input
              value={cidade}
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('cidade')}
              type='text'
              onChange={async (event) =>
                handleChangeItem(event, 'cidade', 'Por favor, digite o cidade', setCidade)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('uf')}>
            <Legend>UF:<sup>*</sup></Legend>
            <Input
              value={uf}
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('uf')}
              type='text'
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

          <FormGroup $error={getErrorMessageByFieldName('banco')}>
            <Legend>Banco:</Legend>
            <Input
              value={banco}
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('banco')}
              type='text'
              onChange={async (event) =>
                handleChangeItem(event, 'banco', 'Por favor, digite o banco', setBanco)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('agencia')}>
            <Legend>Agência:</Legend>
            <Input
              value={agencia}
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('agencia')}
              type='text'
              onChange={async (event) =>
                handleChangeItem(event, 'agencia', 'Por favor, digite a agência', setAgencia)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('conta')}>
            <Legend>Conta:</Legend>
            <Input
              value={conta}
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('conta')}
              type='text'
              onChange={async (event) =>
                handleChangeItem(event, 'conta', 'Por favor, digite a conta', setConta)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('pix')}>
            <Legend>Pix:</Legend>
            <Input
              value={pix}
              disabled={!edit}
              $listData={!edit}
              $error={!!getErrorMessageByFieldName('pix')}
              type='text'
              onChange={async (event) =>
                handleChangeItem(event, 'pix', 'Por favor, digite o pix', setPix)
              }
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('tipoConta')}>
            <Legend>Tipo conta:</Legend>
            <Select
              $error={!!getErrorMessageByFieldName('tipoConta')}
              value={tipoConta}
              disabled={!edit}
              onChange={async (event) =>
                handleChangeItem(event, 'tipoConta', 'Por favor, selecione uma situação', setTipoConta)
              }
            >
              <option value={0}>Selecione uma opção</option>
              <option value={1}>Corrente</option>
              <option value={2}>Poupança</option>
            </Select>
          </FormGroup>
        </Form>
        <ButtonContainer>
          <Button disabled={!fornecedor ? !formIsValid : !edit} $green onClick={handleCreateFornecedor}>{!fornecedor ? 'Cadastrar' : 'Salvar'}</Button>
        </ButtonContainer>
      </Container>
    </GlobalContainer>
  )
}

export default CreateFornecedor
