/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'

import checkStatus from '../../../../utils/checkStatus'
import dateFormat from '../../../../utils/dateFormat'

import { Table, Tr, Td } from './styles'

import { type Orcamento, type TiposOrcamentos, type Cliente, type Obra } from '../../../../interfaces/globalInterfaces'

interface ItemTableProps {
  orcamentos: Orcamento[]
  valorTotal?: string | number
  tipo: TiposOrcamentos[]
  clientes: Cliente[]
  obras: Obra[]
}

const OrcamentosTable: React.FC<ItemTableProps> = ({ orcamentos, valorTotal, tipo, clientes, obras }) => {
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
          <Td $index><b>Modelo</b></Td>
          <Td $index><b>Obra</b></Td>
          <Td $index><b>Cliente</b></Td>
          <Td $index><b>Valor total</b></Td>
          <Td $index><b>Situação</b></Td>
        </Tr>
        {orcamentos?.map((orcamento) => {
          const [open] = infoOpen.filter((info) => info === orcamento.id)
          const [obra] = obras.filter((item) => item.id === orcamento.obra)
          const [cliente] = clientes.filter((item) => item.id === orcamento.id_cliente)
          const [tipoOrcamento] = tipo.filter((item) => orcamento.modelo === item.tipo)

          return (
            <React.Fragment key={orcamento.id}>
              <Tr $open={open === orcamento.id} onClick={() => handleOpenInfo(orcamento.id)}>
                <Td>{orcamento.nome}</Td>
                <Td>{dateFormat(orcamento.data_criacao)}</Td>
                <Td>{tipoOrcamento.nome}</Td>
                <Td>{obra?.nome}</Td>
                <Td>{cliente?.nome}</Td>
                <Td>{valorTotal}</Td>
                <Td>{checkStatus(orcamento.status, 'orçamento')}</Td>
              </Tr>
              {open === orcamento.id && (
                <>{/* <Infos data={orcamento} /> */}</>
              )}
            </React.Fragment>
          )
        })}
      </tbody>
    </Table>
  )
}

export default OrcamentosTable