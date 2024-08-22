/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import cpfCnpjFormat from '../../../../utils/cpfCnpjFormat'
import phoneFormat from '../../../../utils/phoneFormat'
import checkStatus from '../../../../utils/checkStatus'

import Infos from '../Infos'

import { Table, Tr, Td } from './styles'

import { type User } from '../../../../interfaces/globalInterfaces'

interface ClientTableProps {
  users: User[]
}

const UsersTable: React.FC<ClientTableProps> = ({ users }) => {
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
          <Td $index><b>CPF</b></Td>
          <Td $index><b>Telefone</b></Td>
          <Td $index><b>e-Mail</b></Td>
          <Td $index><b>Situação</b></Td>
        </Tr>
        {users?.map((user) => {
          const [open] = infoOpen.filter((info) => info === user.id)

          return (
            <React.Fragment key={user.id}>
              <Tr $open={open === user.id} onClick={() => handleOpenInfo(user.id)}>
                <Td>{user.nome}</Td>
                <Td>{cpfCnpjFormat(user?.cpf)}</Td>
                <Td>{phoneFormat(user.telefone)}</Td>
                <Td>{user.email}</Td>
                <Td>{checkStatus(user.status)}</Td>
              </Tr>
              {open === user.id && (
                <Infos data={user} />
              )}
            </React.Fragment>
          )
        })}
      </tbody>
    </Table>
  )
}

export default UsersTable
