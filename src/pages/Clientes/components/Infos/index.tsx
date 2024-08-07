/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, type Dispatch, type SetStateAction } from 'react'

import Input from '../../../../components/Input'
import Select from '../../../../components/Select'
import Button from '../../../../components/Button'
import FormGroup from '../../../../components/FormGroup'

import phoneFormat from '../../../../utils/phoneFormat'
import cepFormat from '../../../../utils/cepFormat'
import cpfCnpjFormat from '../../../../utils/cpfCnpjFormat'

import { Container, Legend, Edit, EditIcon, ButtonContainer, Form } from './styles'

import { type Clientes } from '../../../../interfaces/globalInterfaces'

interface typeCliente {
  cliente: Clientes
}

const Infos: React.FC<typeCliente> = ({ cliente }) => {
  const [edit, setEdit] = useState(false)
  const [razao_social, setRazao_social] = useState(cliente.razao_social)
  const [nome, setNome] = useState(cliente.nome)
  const [cpf_cnpj, setCpf_cnpj] = useState(cliente.cpf_cnpj)
  const [inscricao_municipal, setInscricao_municipal] = useState(cliente.inscricao_municipal)
  const [inscricao_estadual, setInscricao_estadual] = useState(cliente.inscricao_estadual)
  const [responsavel, setResponsavel] = useState(cliente.responsavel)
  const [telefone, setTelefone] = useState(cliente.telefone)
  const [email, setEmail] = useState(cliente.email)
  const [responsavel_financeiro, setResponsavel_financeiro] = useState(cliente.responsavel_financeiro)
  const [telefone_financeiro, setTelefone_financeiro] = useState(cliente.telefone_financeiro)
  const [email_financeiro, setEmail_financeiro] = useState(cliente.email_financeiro)
  const [cep, setCep] = useState(cliente.cep)
  const [logradouro, setLogradouro] = useState(cliente.logradouro)
  const [numero, setNumero] = useState(cliente.numero)
  const [complemento, setComplemento] = useState(cliente.complemento)
  const [bairro, setBairro] = useState(cliente.bairro)
  const [cidade, setCidade] = useState(cliente.cidade)
  const [uf, setUf] = useState(cliente.uf)

  const handleEditInfos = () => {
    setEdit(!edit)
  }

  const handleChangeField = (setItem: Dispatch<SetStateAction<string | number>>, value: string | number) => {
    setItem(value)
  }

  return (
    <Container>
      <Edit>
        <p onClick={handleEditInfos}>{!edit ? 'Editar dados' : 'Cancelar edição'}</p>
        <EditIcon onClick={handleEditInfos} />
      </Edit>

      <Form>
        <FormGroup>
          <Legend>Razão Social:</Legend>
          <Input
            value={razao_social}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setRazao_social as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>Nome:</Legend>
          <Input
            value={nome}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setNome as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>CPF/CNPJ:</Legend>
          <Input
            value={cpfCnpjFormat(cpf_cnpj)}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setCpf_cnpj as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>Inscrição municipal:</Legend>
          <Input
            value={inscricao_municipal}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setInscricao_municipal as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>Inscrição estadual:</Legend>
          <Input
            value={inscricao_estadual}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setInscricao_estadual as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>Responsável:</Legend>
          <Input
            value={responsavel}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setResponsavel as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>Telefone:</Legend>
          <Input
            value={phoneFormat(telefone)}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setTelefone as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>e-Mail:</Legend>
          <Input
            value={email}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setEmail as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>Financeiro:</Legend>
          <Input
            value={responsavel_financeiro}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setResponsavel_financeiro as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>Telefone financeiro:</Legend>
          <Input
            value={phoneFormat(telefone_financeiro)}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setTelefone_financeiro as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>e-Mail financeiro:</Legend>
          <Input
            value={email_financeiro}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setEmail_financeiro as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>CEP:</Legend>
          <Input
            value={cepFormat(cep)}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setCep as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>Logradouro:</Legend>
          <Input
            value={logradouro}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setLogradouro as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>Número:</Legend>
          <Input
            value={numero}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setNumero as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>Complemento:</Legend>
          <Input
            value={complemento}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setComplemento as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>Bairro:</Legend>
          <Input
            value={bairro}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setBairro as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>Cidade:</Legend>
          <Input
            value={cidade}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setCidade as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>UF:</Legend>
          <Select
            value={uf}
            disabled={!edit}
            onChange={(event) => handleChangeField(setUf as Dispatch<SetStateAction<string | number>>, event.target.value)}
          >
            <option value={uf}>{uf}</option>
          </Select>
        </FormGroup>
      </Form>
      <ButtonContainer>
        <Button disabled={!edit} $green>Salvar</Button>
      </ButtonContainer>
    </Container>
  )
}

export default Infos
