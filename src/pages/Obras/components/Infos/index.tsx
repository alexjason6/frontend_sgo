/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useState, type Dispatch, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'

import ClientesContext from '../../../../contexts/clientesContext'
import ModalContext from '../../../../contexts/modalContext'

import Input from '../../../../components/Input'
import Select from '../../../../components/Select'
import Button from '../../../../components/Button'
import FormGroup from '../../../../components/FormGroup'
import Header from '../../../../components/Header'

import dateFormat from '../../../../utils/dateFormat'
import cepFormat from '../../../../utils/cepFormat'

import { Container, Legend, Edit, ButtonContainer, Form } from './styles'

import { type Obra, type Cliente } from '../../../../interfaces/globalInterfaces'

interface typeCliente {
  obra: Obra
  cliente: Cliente
}

const Infos: React.FC<typeCliente> = ({ obra, cliente }) => {
  const navigate = useNavigate()
  const { clientes } = useContext(ClientesContext)
  const { changeModal } = useContext(ModalContext)
  const [edit, setEdit] = useState(false)
  const [nome, setNome] = useState(obra.nome)
  const [cnd, setCnd] = useState(obra.cnd)
  const [alvara, setAlvara] = useState(obra.alvara)
  const [engenheiro, setEngenheiro] = useState(obra.engenheiro)
  const [cep, setCep] = useState(obra.cep)
  const [logradouro, setLogradouro] = useState(obra.logradouro)
  const [numero, setNumero] = useState(obra.numero)
  const [complemento, setComplemento] = useState(obra.complemento)
  const [bairro, setBairro] = useState(obra.bairro)
  const [cidade, setCidade] = useState(obra.cidade)
  const [uf, setUf] = useState(obra.uf)
  const [id_cliente, setId_cliente] = useState(obra.id_cliente)
  const [data_inicio, setData_inicio] = useState(obra.data_inicio)
  const [previsao_entrega, setPrevisao_entrega] = useState(obra.previsao_entrega)
  const [data_entrega, setData_entrega] = useState(obra.data_entrega)
  const [tipo, setTipo] = useState(obra.tipo)
  const [status, setStatus] = useState(obra.status)

  const handleEditInfos = () => {
    setEdit(!edit)
  }

  const handleChangeField = (setItem: Dispatch<SetStateAction<string | number>>, value: string | number) => {
    setItem(value)
  }

  const handleNavigateDetalhamento = () => {
    navigate(`/obras/detalhamento/${obra.id}`)
    changeModal()
  }

  return (
    <div style={{ paddingRight: 30 }}>
    <Header subHeader modal title={`Dados obra - ${obra.nome}`} />
    <Container>
      <Edit>
        <Button $green onClick={handleNavigateDetalhamento}>Detalhamento</Button>
        <Button $alert={!edit} $danger={edit} onClick={handleEditInfos}>{!edit ? 'Editar dados' : 'Cancelar edição'}</Button>
      </Edit>

      <Form>
        <FormGroup>
          <Legend>Cliente:</Legend>
          <Select
            value={id_cliente}
            disabled={!edit}
            onChange={(event) => handleChangeField(setId_cliente as Dispatch<SetStateAction<string | number>>, event.target.value)}>
              <option value={obra.id_cliente}>{cliente.nome}</option>
              {clientes.map((item) => (
                <option key={item.id} value={item.id}>{item.nome}</option>
              ))}
          </Select>
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
          <Legend>Alvará:</Legend>
          <Input
            value={alvara}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setAlvara as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>CND:</Legend>
          <Input
            value={cnd}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setCnd as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>Data início:</Legend>
          <Input
            value={dateFormat(data_inicio, false, 'reverse')}
            disabled={!edit}
            $listData={!edit}
            type='date'
            onChange={(event) => handleChangeField(setData_inicio as Dispatch<SetStateAction<string | number>>, event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Legend>Tipo:</Legend>
          <Select
            disabled={!edit}
            defaultValue={tipo}
            onChange={(event) => handleChangeField(setTipo as Dispatch<SetStateAction<string | number>>, event.target.value)}
          >
            <option value={1}>Flex</option>
            <option value={2}>Reforma galpão</option>
            <option value={3}>Galpão novo</option>
            <option value={4}>MeLoca</option>
          </Select>
        </FormGroup>

        <FormGroup>
            <Legend>Previsão de entrega:</Legend>
            <Input
              value={dateFormat(previsao_entrega, false, 'reverse')}
              disabled={!edit}
              $listData={!edit}
              type='date'
              onChange={(event) => handleChangeField(setPrevisao_entrega as Dispatch<SetStateAction<string | number>>, event.target.value)}
            />
          </FormGroup>

        {status === 4 && (
          <FormGroup>
            <Legend>Data entrega:</Legend>
            <Input
              value={dateFormat(data_entrega!, false, 'reverse')}
              disabled={!edit}
              $listData={!edit}
              type='date'
              onChange={(event) => handleChangeField(setData_entrega as Dispatch<SetStateAction<string | number>>, event.target.value)}
            />
          </FormGroup>
        )}

        <FormGroup>
          <Legend>Engenheiro:</Legend>
          <Input
            value={engenheiro}
            disabled={!edit}
            $listData={!edit}
            onChange={(event) => handleChangeField(setEngenheiro as Dispatch<SetStateAction<string | number>>, event.target.value)}
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
            defaultValue={uf}
            disabled={!edit}
            onChange={(event) => handleChangeField(setUf as Dispatch<SetStateAction<string | number>>, event.target.value)}
          >
            <option value={uf}>{uf}</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Legend>Situação:</Legend>
          <Select
            defaultValue={status}
            disabled={!edit}
            onChange={(event) => handleChangeField(setStatus as Dispatch<SetStateAction<string | number>>, event.target.value)}
          >
            <option value={1}>Ativo</option>
            <option value={2}>Inativo</option>
            <option value={3}>Cancelado</option>
            <option value={4}>Entregue</option>
          </Select>
        </FormGroup>
      </Form>
      <ButtonContainer>
        <Button disabled={!edit} $green>Salvar</Button>
      </ButtonContainer>
    </Container>
    </div>
  )
}

export default Infos
