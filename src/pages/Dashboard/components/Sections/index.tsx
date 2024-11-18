import React, { useContext, type Dispatch, type SetStateAction } from 'react'

import ClientesContext from '../../../../contexts/clientesContext'
import ModalContext from '../../../../contexts/modalContext'
import ObrasContext from '../../../../contexts/obrasContext'
import CreateRdoRda from '../../../../components/CreateItem/Itens/RdaRdo'

import Button from '../../../../components/Button'
import Header from '../../../../components/Header'

import CardItem from '../CardItem'

import { Content, Itens, More, Chevron } from './styles'

import { type Obra, type RdoRda } from '../../../../interfaces/globalInterfaces'

interface PropsSections {
  titleHeader: string
  isSubHeader?: boolean
  typeSection: string
  items: RdoRda[] | Obra[]
  itemDb: any[]
  width: number
  showDoc?: boolean
  setItem: Dispatch<SetStateAction<any[]>>
  handleChangeMore: (typeSection: string, setItem: Dispatch<SetStateAction<any[]>>, itemDb: any[]) => void
  more: string[]
}

const isObra = (item: RdoRda | Obra): item is Obra => {
  return (item as Obra).nome !== undefined
}

const Sections: React.FC<PropsSections> = ({
  titleHeader,
  isSubHeader,
  typeSection,
  items,
  itemDb,
  more,
  showDoc,
  width,
  setItem,
  handleChangeMore
}) => {
  const { clientes } = useContext(ClientesContext)
  const { obras } = useContext(ObrasContext)
  const { changeModal } = useContext(ModalContext)

  const createRdoRda = (type: string) => {
    changeModal(<CreateRdoRda type={type}/>)
  }

  return (
  <div>
    {isSubHeader && <Header title={titleHeader} subHeader={isSubHeader} />}
    <Content $obras={items.length > 0}>
      {typeSection === 'rdo' && itemDb.length === 0 && <Button onClick={() => createRdoRda('rdo')}>Cadastrar RDO</Button>}
      {typeSection === 'rda' && itemDb.length === 0 && <Button onClick={() => createRdoRda('rda')}>Cadastrar RDA</Button>}
      <Itens $obras={typeSection === 'obra'} >
        {items.map((item) => {
          const cliente = clientes.find((cliente) => cliente.id === item.id_cliente)
          const [obra] = obras.filter((obra) => !isObra(item) ? obra.id === item?.obra : item.id === obra.id)

          return (
            <CardItem
              key={item.id}
              type={typeSection}
              cliente={cliente?.nome ?? 'Cliente desconhecido'}
              item={item}
              id={item.id || obra.id}
              nome={obra?.nome ?? 'Obra desconhecida'}
              idCliente={cliente?.id}
            />
          )
        })}
      </Itens>

      {showDoc && typeSection === 'rdo' && <div style={{ width: '100%', marginTop: '20px', marginBottom: '-20px' }}><Button style={{ float: 'right' }} onClick={() => createRdoRda('rdo')}>Novo RDO</Button></div>}

      {(width < itemDb.length) && (
          <More>
            <p onClick={() => handleChangeMore(typeSection, setItem, itemDb)}>
              {more.includes(typeSection) ? 'Recolher' : 'Expandir'}
              <Chevron $obras={more.includes(typeSection)} />
            </p>
          </More>
        )}
    </Content>
  </div>
  )
}

export default Sections
