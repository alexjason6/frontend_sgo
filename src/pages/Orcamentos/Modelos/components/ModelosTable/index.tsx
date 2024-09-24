import React, { useState } from 'react'
import checkStatus from '../../../../../utils/checkStatus'
import dateFormat from '../../../../../utils/dateFormat'

import { Table, Tr, Td } from './styles'

import { type TiposOrcamentos } from '../../../../../interfaces/globalInterfaces'

interface ClientTableProps {
  data: TiposOrcamentos[]
}

const ModelosTable: React.FC<ClientTableProps> = ({ data }) => {
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
          <Td $index><b>Data criação</b></Td>
          <Td $index><b>Situação</b></Td>
        </Tr>
        {data?.map((modelo) => {
          const [open] = infoOpen.filter((info) => info === modelo.id)

          return (
            <React.Fragment key={modelo.id}>
              <Tr $open={open === modelo.id} onClick={() => handleOpenInfo(modelo.id)}>
                <Td>{modelo.nome}</Td>
                <Td>{dateFormat(modelo?.data_criacao)}</Td>
                <Td>{checkStatus(modelo.status)}</Td>
              </Tr>
            </React.Fragment>
          )
        })}
      </tbody>
    </Table>
  )
}

export default ModelosTable
