import React, { useContext, type Dispatch, type SetStateAction } from 'react'

import Header from '../../../../components/Header'
import CardItem from '../CardItem'

import { obrasDb } from '../../../../assets/database/obras'

import { Content, Itens, More, Chevron } from './styles'

import { type Obra, type RdoRda } from '../../../../interfaces/globalInterfaces'
import ClientesContext from '../../../../contexts/clientesContext'

interface PropsSections {
  titleHeader: string
  isSubHeader?: boolean
  typeSection: string
  items: RdoRda[] | Obra[]
  itemDb: any[]
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
  setItem,
  handleChangeMore
}) => {
  const { clientes } = useContext(ClientesContext)
  return (
  <div>
    {isSubHeader && <Header title={titleHeader} subHeader={isSubHeader} />}
    <Content $obras={items.length > 0}>
      <Itens $obras={typeSection === 'obra'} >
        {items.map((item) => {
          const cliente = clientes.find((cliente) => cliente.id === item.id_cliente)
          const name = isObra(item) ? item.nome : obrasDb.find((obra) => obra.id === item.obra)?.nome

          return (
            <CardItem
              key={item.id}
              type={typeSection}
              cliente={cliente?.nome ?? 'Cliente desconhecido'}
              item={item}
              id={item.id}
              nome={name ?? 'Obra desconhecida'}
            />
          )
        })}
      </Itens>

      {itemDb.length >= items.length && (
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
