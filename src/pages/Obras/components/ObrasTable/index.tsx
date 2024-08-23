import React, { useContext } from 'react'

import ClientesContext from '../../../../contexts/clientesContext'
import ModalContext from '../../../../contexts/modalContext'

import checkStatus from '../../../../utils/checkStatus'

import Infos from '../Infos'

import { Table, Tr, Th, Td } from './styles'

import { type Obra } from '../../../../interfaces/globalInterfaces'

interface ClientTableProps {
  obras: Obra[]
}

const ObrasTable: React.FC<ClientTableProps> = ({ obras }) => {
  const { changeModal } = useContext(ModalContext)
  const { clientes } = useContext(ClientesContext)

  const handleOpenInfo = (id: number) => {
    const [obra] = obras?.filter((item) => item.id === id)

    changeModal(<Infos data={obra} />)
  }

  return (
    <Table>
      <tbody>
        <Tr $index>
          <Th $index><b>Nome</b></Th>
          <Th $index><b>Cliente</b></Th>
          <Th $index><b>Alvará</b></Th>
          <Th $index><b>CND</b></Th>
          <Th $index><b>Engenheiro</b></Th>
          <Th $index><b>Situação</b></Th>
        </Tr>
        {obras.map((obra) => {
          const [cliente] = clientes.filter((item) => item.id === obra.id_cliente)

          return (
            <Tr key={obra?.id} onClick={() => handleOpenInfo(obra?.id)}>
              <Td>{obra?.nome}</Td>
              <Td>{cliente?.nome}</Td>
              <Td>{obra?.alvara}</Td>
              <Td>{obra?.cnd}</Td>
              <Td>{obra?.engenheiro}</Td>
              <Td>{checkStatus(obra?.status)}</Td>
            </Tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default ObrasTable
