import React from 'react'
import { useNavigate } from 'react-router-dom'

import checkStatus from '../../../../utils/checkStatus'
import dateFormat from '../../../../utils/dateFormat'
import { orcamentoValue } from '../../../../utils/calculateInfosObras'

import { Table, Tr, Td } from './styles'

import { type Orcamento, type TiposOrcamentos, type Cliente, type Obra } from '../../../../interfaces/globalInterfaces'

interface ItemTableProps {
  orcamentos: Orcamento[]
  tipo: TiposOrcamentos[]
  clientes: Cliente[]
  obras: Obra[]
}

const OrcamentosTable: React.FC<ItemTableProps> = ({ orcamentos, tipo, clientes, obras }) => {
  const navigate = useNavigate()

  const handleOpenOrcamento = (id: number) => {
    navigate(`/orcamentos/edit/${id}`)
  }

  return (
    <Table>
      <tbody>
        <Tr $index>
          <Td $index><b>Nome</b></Td>
          <Td $index><b>Data criação</b></Td>
          <Td $index><b>Modelo</b></Td>
          <Td $index><b>Obra</b></Td>
          <Td $index><b>Cliente</b></Td>
          <Td $index><b>Valor total</b></Td>
          <Td $index><b>Situação</b></Td>
        </Tr>
        {orcamentos?.map((orcamento) => {
          const [obra] = obras.filter((item) => item.id === orcamento.obra)
          const [cliente] = clientes.filter((item) => item.id === orcamento.id_cliente)
          const [tipoOrcamento] = tipo.filter((item) => orcamento.modelo === item.tipo)
          const valorTotal = orcamentoValue(orcamento.item)

          return (
            <React.Fragment key={orcamento.id}>
              <Tr onClick={() => handleOpenOrcamento(orcamento.id)}>
                <Td>{orcamento.nome}</Td>
                <Td>{dateFormat(orcamento.data_criacao)}</Td>
                <Td>{tipoOrcamento?.nome ?? 'Avulso'}</Td>
                <Td>{obra?.nome.length > 25 ? obra?.nome.slice(0, 25) + ' ...' : obra.nome}</Td>
                <Td>{cliente?.nome.length > 20 ? cliente.nome.slice(0, 20) + '...' : cliente?.nome}</Td>
                <Td>{valorTotal}</Td>
                <Td>{checkStatus(orcamento.status, 'orçamento')}</Td>
              </Tr>
            </React.Fragment>
          )
        })}
      </tbody>
    </Table>
  )
}

export default OrcamentosTable
