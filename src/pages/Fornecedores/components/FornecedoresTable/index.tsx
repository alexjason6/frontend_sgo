/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import cpfCnpjFormat from '../../../../utils/cpfCnpjFormat'
import phoneFormat from '../../../../utils/phoneFormat'
import checkStatus from '../../../../utils/checkStatus'

import Infos from '../Infos'

import { Table, Tr, Td } from './styles'

import { type Fornecedores } from '../../../../interfaces/globalInterfaces'

interface ClientTableProps {
  fornecedores: Fornecedores[]
}

const FornecedoresTable: React.FC<ClientTableProps> = ({ fornecedores }) => {
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
        {fornecedores?.map((fornecedor) => {
          const [open] = infoOpen.filter((info) => info === fornecedor.id)

          return (
            <React.Fragment key={fornecedor.id}>
              <Tr $open={open === fornecedor.id} onClick={() => handleOpenInfo(fornecedor.id)}>
                <Td>{fornecedor.nome}</Td>
                <Td>{cpfCnpjFormat(fornecedor?.cpf_cnpj)}</Td>
                <Td>{phoneFormat(fornecedor.telefone)}</Td>
                <Td>{fornecedor.email}</Td>
                <Td>{fornecedor.responsavel}</Td>
                <Td>{checkStatus(fornecedor.status)}</Td>
              </Tr>
              {open === fornecedor.id && (
                <Infos data={fornecedor} />
              )}
            </React.Fragment>
          )
        })}
      </tbody>
    </Table>
  )
}

export default FornecedoresTable
