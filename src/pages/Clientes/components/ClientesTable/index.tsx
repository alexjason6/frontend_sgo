/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import cpfCnpjFormat from '../../../../utils/cpfCnpjFormat'
import phoneFormat from '../../../../utils/phoneFormat'
import checkStatus from '../../../../utils/checkStatus'

import Create from '../../../../components/CreateItem/Itens/Clientes'

import { Table, Tr, Td } from './styles'

import { type Cliente } from '../../../../interfaces/globalInterfaces'

interface ClientTableProps {
  clientes: Cliente[]
}

const ClientesTable: React.FC<ClientTableProps> = ({ clientes }) => {
  const [infoOpen, setInfoOpen] = useState<number[]>([])

  const handleOpenInfo = (id: number) => {
    const [idExists] = infoOpen.filter((cliente) => cliente === id)

    if (idExists) {
      setInfoOpen((prevState) => prevState.filter((cliente) => cliente !== id))
    } else {
      setInfoOpen((prevState) => [
        ...prevState,
        id
      ])
    }
  }

  return (
    <Table>
      <tbody>
        <Tr $index>
          <Td $index><b>Nome</b></Td>
          <Td $index><b>CPF/CNPJ</b></Td>
          <Td $index><b>Telefone</b></Td>
          <Td $index><b>e-Mail</b></Td>
          <Td $index><b>Responsável</b></Td>
          <Td $index><b>Situação</b></Td>
        </Tr>
        {clientes?.map((cliente) => {
          const [open] = infoOpen.filter((info) => info === cliente.id)

          return (
            <React.Fragment key={cliente.id}>
              <Tr $open={open === cliente.id} onClick={() => handleOpenInfo(cliente.id!)}>
                <Td>{cliente?.nome.length > 25 ? cliente?.nome.slice(0, 25) + ' ...' : cliente.nome}</Td>
                <Td>{cpfCnpjFormat(cliente.cpf_cnpj)}</Td>
                <Td>{phoneFormat(cliente.telefone)}</Td>
                <Td>{cliente.email}</Td>
                <Td>{cliente.responsavel}</Td>
                <Td>{checkStatus(cliente.status)}</Td>
              </Tr>
              {open === cliente.id && (
                <Create cliente={cliente} />
              )}
            </React.Fragment>
          )
        })}
      </tbody>
    </Table>
  )
}

export default ClientesTable
