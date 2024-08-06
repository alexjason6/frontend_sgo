import React from 'react'

import cpfCnpjFormat from '../../../../utils/cpfCnpjFormat'
import phoneFormat from '../../../../utils/phoneFormat'

import { Table, Tr, Td } from './styles'

import { type Clientes } from '../../../../interfaces/globalInterfaces'

interface ClientTableProps {
  clientes: Clientes[]
}

const ClientesTable: React.FC<ClientTableProps> = ({ clientes }) => {
  return (
    <Table>
      <tbody>
        <Tr $index>
          <Td><b>Nome</b></Td>
          <Td><b>CPF/CNPJ</b></Td>
          <Td><b>Telefone</b></Td>
          <Td><b>e-Mail</b></Td>
          <Td><b>Responsável</b></Td>
          <Td><b>Situação</b></Td>
        </Tr>
        {clientes.map((cliente: Clientes) => (
          <Tr key={cliente.id}>
            <Td>{cliente.nome}</Td>
            <Td>{cpfCnpjFormat(cliente.cpf_cnpj)}</Td>
            <Td>{phoneFormat(cliente.telefone)}</Td>
            <Td>{cliente.email}</Td>
            <Td>{cliente.responsavel}</Td>
            <Td>{cliente.status}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ClientesTable
