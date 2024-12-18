import React, { useContext } from 'react'

import ModalContext from '../../../../contexts/modalContext'

import CreateObra from '../../../../components/CreateOrEditItem/Itens/Obras'

import checkStatus from '../../../../utils/checkStatus'

import { Table, Tr, Th, Td } from './styles'

import { type Cliente, type Obra } from '../../../../interfaces/globalInterfaces'

interface ClientTableProps {
  obras: Obra[]
  clientes: Cliente[]
}

const ObrasTable: React.FC<ClientTableProps> = ({ obras, clientes }) => {
  const { changeModal } = useContext(ModalContext)

  const handleOpenInfo = (id: number) => {
    const [obra] = obras?.filter((item) => item.id === id)

    changeModal(<CreateObra obra={obra} />)
  }

  return (
    <Table>
      <tbody>
        <Tr $index>
          <Th $index><b>Nome</b></Th>
          <Th $index><b>Cliente</b></Th>
          <Th $index><b>Alvará</b></Th>
          <Th $index><b>CNO</b></Th>
          <Th $index><b>Engenheiro</b></Th>
          <Th $index><b>Situação</b></Th>
        </Tr>
        {obras.map((obra) => {
          const [cliente] = clientes.filter((item) => item.id === obra.id_cliente)

          return (
            <Tr key={obra?.id} onClick={() => handleOpenInfo(obra?.id)}>
              <Td>{obra?.nome.length > 25 ? obra?.nome.slice(0, 25) + '...' : obra.nome}</Td>
              <Td>{cliente?.nome.length > 25 ? cliente?.nome.slice(0, 25) + '...' : cliente.nome}</Td>
              <Td>{obra?.alvara}</Td>
              <Td>{obra?.cno}</Td>
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
