/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import React, { useContext, type ChangeEvent, useState, type Dispatch, type SetStateAction } from 'react'

import { GlobalContainer, Legend } from '../../../assets/styles/global'

import ModalContext from '../../../contexts/modalContext'
import AuthContext from '../../../contexts/authContext'
import ClientesContext from '../../../contexts/clientesContext'

import Menu from '../../../components/Menu'
import Header from '../../../components/Header'
import FormGroup from '../../../components/FormGroup'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import Button from '../../../components/Button'

import useErrors from '../../../hooks/useErrors'

import isEmailValid from '../../../utils/isEmailValid'
import cpfCnpjFormat from '../../../utils/cpfCnpjFormat'
import phoneFormat from '../../../utils/phoneFormat'
import cepFormat from '../../../utils/cepFormat'

import ClienteMapper from '../../../services/mappers/ClienteMapper'
import ClientesServices from '../../../services/sgo/ClientesServices'
import CepServices from '../../../services/cep/CepServices'

import { ButtonContainer, Content, Form, FormContent } from './styles'
import LoadingContext from '../../../contexts/loadingContext'

const CreateCliente: React.FC = () => {
  const { isOpen, changeModal } = useContext(ModalContext)
  const { token } = useContext(AuthContext)
  const { listClientes } = useContext(ClientesContext)
  const { changeLoading } = useContext(LoadingContext)

  const [nome, setNome] = useState<string>('')
  const [cpfCnpj, setCpfCnpj] = useState<string>('')
  const [razaoSocial, setRazaoSocial] = useState<string>('')
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState<string>('')
  const [inscricaoEstadual, setInscricaoEstadual] = useState<string>('')
  const [responsavel, setResponsavel] = useState<string>('')
  const [telefone, setTelefone] = useState<string>('')
  const [email, setEmail] = useState('')
  const [responsavelFinanceiro, setResponsavelFinanceiro] = useState<string>('')
  const [telefoneFinanceiro, setTelefoneFinanceiro] = useState<string>('')
  const [emailFinanceiro, setEmailFinanceiro] = useState<string>('')
  const [status, setStatus] = useState<string>('1')
  const [cep, setCep] = useState<string>('')
  const [logradouro, setLogradouro] = useState<string>('')
  const [numero, setNumero] = useState<string>('')
  const [complemento, setComplemento] = useState<string>('')
  const [bairro, setBairro] = useState<string>('')
  const [cidade, setCidade] = useState<string>('')
  const [uf, setUf] = useState<string>('')

  const { errors, setError, removeError, getErrorMessageByFieldName } = useErrors()
  const formIsValid = isEmailValid(email) && telefone && responsavel && nome && cpfCnpj && razaoSocial && numero && status && errors.length === 0

  const handleChangeItem = async (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>, fieldName: string, message: string, setState: Dispatch<SetStateAction<string>>) => {
    const value = fieldName === 'email' || fieldName === 'emailFinanceiro' ? event.target.value.toLowerCase() : event.target.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')

    setState(value)

    if (setState === setCep && value.length > 7) {
      const cepValue = value.replace('-', '')
      const cepResponse = await CepServices.buscaCep(cepValue)

      setLogradouro(cepResponse.data.logradouro)
      setBairro(cepResponse.data.bairro)
      setCidade(cepResponse.data.localidade)
      setUf(cepResponse.data.uf)
    }

    if (!value) {
      setError({ field: fieldName, message })
    } else if (setState === setEmail && !isEmailValid(value)) {
      setError({ field: 'email', message: 'Digite um e-mail válido para entrar.' })
    } else {
      removeError(fieldName)
    }
  }

  const handleCreateCliente = async () => {
    changeLoading(true, 'enviando dados...')

    const data = {
      nome,
      cpfCnpj,
      razaoSocial,
      inscricaoMunicipal,
      inscricaoEstadual,
      responsavel,
      telefone,
      email,
      responsavelFinanceiro,
      telefoneFinanceiro,
      emailFinanceiro,
      status: Number(status),
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf
    }

    const mapperCliente = ClienteMapper.toPersistence(data)
    const create = await ClientesServices.create({ token, mapperCliente })

    if (create.id) {
      setNome('')
      setCpfCnpj('')
      setRazaoSocial('')
      setInscricaoMunicipal('')
      setInscricaoEstadual('')
      setResponsavel('')
      setTelefone('')
      setEmail('')
      setResponsavelFinanceiro('')
      setTelefoneFinanceiro('')
      setEmailFinanceiro('')
      setStatus('1')
      setCep('')
      setLogradouro('')
      setNumero('')
      setComplemento('')
      setBairro('')
      setCidade('')
      setUf('')
    }

    changeLoading(true, 'atualizando lista de clientes...')
    await listClientes({ token })

    if (isOpen) {
      changeModal()
    }

    changeLoading(false)
  }

  return (
    <GlobalContainer $modal>
      {!isOpen && <Menu />}
      <Header title={'Cadastrar novo cliente'} fullwidth={!!isOpen} goBack={!isOpen} />

      <Content $fullwidth={!!isOpen}>
        <Form>
          <FormContent>
            <FormGroup $error={getErrorMessageByFieldName('cliente')} oneOfFour>
              <Legend>Cliente:<sup>*</sup></Legend>
              <Input
                $error={!!getErrorMessageByFieldName('cliente')}
                type='text'
                placeholder='Digite o nome do cliente'
                value={nome}
                onChange={(event) =>
                  handleChangeItem(event, 'cliente', 'Por favor, digite o nome do Cliente', setNome)
                }
              />
            </FormGroup>
            <FormGroup $error={getErrorMessageByFieldName('razaoSocial')} oneOfFour>
              <Legend>Razão social:<sup>*</sup></Legend>
              <Input
                $error={!!getErrorMessageByFieldName('razaoSocial')}
                type='text'
                placeholder='Digite a razão social do cliente'
                value={razaoSocial}
                onChange={(event) =>
                  handleChangeItem(event, 'razaoSocial', 'Por favor, digite o a razão social do Cliente', setRazaoSocial)
                }
              />
            </FormGroup>
            <FormGroup $error={getErrorMessageByFieldName('cpfCnpj')} oneOfFive>
              <Legend>CPF/CNPJ:<sup>*</sup></Legend>
              <Input
                $error={!!getErrorMessageByFieldName('cpfCnpj')}
                type='tel'
                placeholder='Ex.: 00.000.000/0000-00'
                value={cpfCnpjFormat(cpfCnpj)}
                onChange={(event) =>
                  handleChangeItem(event, 'cpfCnpj', 'Por favor, digite o CFP ou CNPJ do cliente', setCpfCnpj)
                }
              />
            </FormGroup>
            <FormGroup $error={getErrorMessageByFieldName('inscricaoMunicipal')} oneOfFive>
              <Legend>Inscrição municipal:</Legend>
              <Input
                $error={!!getErrorMessageByFieldName('inscricaoMunicipal')}
                type='tel'
                placeholder='Digite a inscrição municipal'
                value={inscricaoMunicipal}
                onChange={(event) =>
                  handleChangeItem(event, 'inscricaoMunicipal', 'Por favor, digite a inscrição municipal', setInscricaoMunicipal)
                }
              />
            </FormGroup>
            <FormGroup $error={getErrorMessageByFieldName('inscricaoEstadual')} oneOfFive>
              <Legend>Inscrição estadual:</Legend>
              <Input
                $error={!!getErrorMessageByFieldName('inscricaoEstadual')}
                type='tel'
                placeholder='Digite a inscrição estadual'
                value={inscricaoEstadual}
                onChange={(event) =>
                  handleChangeItem(event, 'inscricaoEstadual', 'Por favor, digite a inscrição estadual', setInscricaoEstadual)
                }
              />
            </FormGroup>
            <FormGroup $error={getErrorMessageByFieldName('responsavel')} oneOfFour>
              <Legend>Responsável:<sup>*</sup></Legend>
              <Input
                $error={!!getErrorMessageByFieldName('responsavel')}
                type='text'
                placeholder='Digite o nome do responsável'
                value={responsavel}
                onChange={(event) =>
                  handleChangeItem(event, 'responsavel', 'Por favor, digite o nome do responsável', setResponsavel)
                }
              />
            </FormGroup>
            <FormGroup $error={getErrorMessageByFieldName('email')} oneOfFive>
              <Legend>e-Mail:<sup>*</sup></Legend>
              <Input
                $error={!!getErrorMessageByFieldName('email')}
                type='email'
                placeholder='Ex.: responsavel@cliente.com.br'
                value={email}
                onChange={(event) =>
                  handleChangeItem(event, 'email', 'Por favor, digite o email', setEmail)
                }
              />
            </FormGroup>
            <FormGroup $error={getErrorMessageByFieldName('telefone')} oneOfFive>
              <Legend>Telefone:<sup>*</sup></Legend>
              <Input
                $error={!!getErrorMessageByFieldName('telefone')}
                type='tel'
                placeholder='Ex.: 31 3333-3333'
                value={telefone && phoneFormat(telefone)}
                onChange={(event) =>
                  handleChangeItem(event, 'telefone', 'Por favor, digite o telefone', setTelefone)
                }
              />
            </FormGroup>
          </FormContent>

          <Header title='Informações financeiro' subHeader modal={!!isOpen} fullwidth />
          <FormContent>
            <FormGroup $error={getErrorMessageByFieldName('responsavelFinanceiro')} oneOfFour>
              <Legend>Responsável financeiro:<sup>*</sup></Legend>
              <Input
                $error={!!getErrorMessageByFieldName('responsavelFinanceiro')}
                type='text'
                placeholder='Ex. João Pedro'
                value={responsavelFinanceiro}
                onChange={(event) =>
                  handleChangeItem(event, 'responsavelFinanceiro', 'Por favor, digite o responsável financeiro', setResponsavelFinanceiro)
                }
              />
            </FormGroup>
            <FormGroup $error={getErrorMessageByFieldName('emailFinanceiro')} oneOfFive>
              <Legend>e-Mail financeiro:<sup>*</sup></Legend>
              <Input
                $error={!!getErrorMessageByFieldName('emailFinanceiro')}
                type='email'
                placeholder='Ex.: financeiro@cliente.com.br'
                value={emailFinanceiro}
                onChange={(event) =>
                  handleChangeItem(event, 'emailFinanceiro', 'Por favor, digite o email do financeiro', setEmailFinanceiro)
                }
              />
            </FormGroup>
            <FormGroup $error={getErrorMessageByFieldName('telefoneFinanceiro')} oneOfFive>
              <Legend>Telefone financeiro:<sup>*</sup></Legend>
              <Input
                $error={!!getErrorMessageByFieldName('telefoneFinanceiro')}
                type='tel'
                placeholder='Ex.: 31 3333-3333'
                value={telefoneFinanceiro && phoneFormat(telefoneFinanceiro)}
                onChange={(event) =>
                  handleChangeItem(event, 'telefoneFinanceiro', 'Por favor, digite o telefone do financeiro', setTelefoneFinanceiro)
                }
              />
            </FormGroup>
          </FormContent>

          <Header title='Informações endereço' subHeader modal={!!isOpen} fullwidth />
          <FormContent>
            <FormGroup $error={getErrorMessageByFieldName('cep')} oneOfFive>
              <Legend>CEP:<sup>*</sup></Legend>
              <Input
                $error={!!getErrorMessageByFieldName('cep')}
                type='tel'
                placeholder='Ex.: 30555-000'
                value={cepFormat(cep)}
                onChange={(event) =>
                  handleChangeItem(event, 'cep', 'Por favor, digite o CEP', setCep)
                }
              />
            </FormGroup>
            <FormGroup $error={getErrorMessageByFieldName('logradouro')} oneOfFour>
              <Legend>Logradouro:</Legend>
              <Input
                $error={!!getErrorMessageByFieldName('logradouro')}
                type='text'
                placeholder='Ex.: Rua Rio de Janeiro'
                value={logradouro}
                onChange={(event) =>
                  handleChangeItem(event, 'logradouro', 'Por favor, digite o logradouro', setLogradouro)
                }
              />
            </FormGroup>
            <FormGroup oneOfFive>
              <Legend>Número:<sup>*</sup></Legend>
              <Input
                type='tel'
                placeholder='1.435'
                value={numero}
                onChange={(event) =>
                  handleChangeItem(event, '', '', setNumero)
                }
              />
            </FormGroup>
            <FormGroup oneOfFive>
              <Legend>Complemento:</Legend>
              <Input
                type='text'
                placeholder='Galpão 3'
                value={complemento}
                onChange={(event) =>
                  handleChangeItem(event, '', '', setComplemento)
                }
              />
            </FormGroup>
            <FormGroup $error={getErrorMessageByFieldName('bairro')} oneOfFour>
              <Legend>Bairro:<sup>*</sup></Legend>
              <Input
                $error={!!getErrorMessageByFieldName('bairro')}
                type='text'
                placeholder='Ex.: Distrito industrial'
                readOnly
                value={bairro}
                onChange={(event) =>
                  handleChangeItem(event, 'bairro', 'Por favor, digite o bairro', setBairro)
                }
              />
            </FormGroup>
            <FormGroup $error={getErrorMessageByFieldName('cidade')} oneOfFour>
              <Legend>Cidade:<sup>*</sup></Legend>
              <Input
                $error={!!getErrorMessageByFieldName('cidade')}
                type='text'
                placeholder='Ex.: Viana'
                readOnly
                value={cidade}
                onChange={(event) =>
                  handleChangeItem(event, 'cidade', 'Por favor, digite a cidade', setCidade)
                }
              />
            </FormGroup>
            <FormGroup $error={getErrorMessageByFieldName('uf')} oneOfFive>
              <Legend>UF:<sup>*</sup></Legend>
              <Input
                $error={!!getErrorMessageByFieldName('uf')}
                readOnly
                value={uf}
                onChange={(event) =>
                  handleChangeItem(event, 'uf', 'Por favor, selecione o Estado', setUf)
                }
              />
            </FormGroup>
            <FormGroup $error={getErrorMessageByFieldName('situacao')} oneOfFive>
              <Legend>Situação do cliente:<sup>*</sup></Legend>
              <Select
                $error={!!getErrorMessageByFieldName('situacao')}
                value={status}
                onChange={(event) =>
                  handleChangeItem(event, 'situacao', 'Por favor, selecione a situação', setStatus)
                }
              >
                <option>Selecione uma situação</option>
                <option value={1}>Ativo</option>
                <option value={2}>Inativo</option>
              </Select>
            </FormGroup>
          </FormContent>
        </Form>

        <ButtonContainer>
            <Button disabled={!formIsValid} $green onClick={handleCreateCliente}>Cadastrar</Button>
            </ButtonContainer>
      </Content>
    </GlobalContainer>
  )
}

export default CreateCliente
