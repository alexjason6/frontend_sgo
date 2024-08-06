import React, { type Dispatch, type SetStateAction } from 'react'

import Header from '../../../../components/Header'
import CardItem from '../CardItem'

import { clientesDb } from '../../../../assets/database/clientes'
import { obrasDb } from '../../../../assets/database/obras'

import { Content, Itens, More, Chevron } from './styles'

import { type Obra, type RdoRda } from '../../../../interfaces/globalInterfaces'

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
  setItem,
  handleChangeMore,
  more
}) => {
  return (
  <div>
    {isSubHeader && <Header title={titleHeader} subHeader={isSubHeader} />}
    <Content $obras={items.length > 0}>
      <Itens>
        {items.map((item) => {
          const cliente = clientesDb.find((cliente) => cliente.id === item.id_cliente)
          const name = isObra(item) ? item.nome : obrasDb.find((obra) => obra.id === item.obra)?.nome

          return (
            <CardItem
              type={typeSection}
              key={item.id}
              cliente={cliente?.nome ?? 'Cliente desconhecido'}
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
