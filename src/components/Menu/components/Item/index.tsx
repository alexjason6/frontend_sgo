import React from 'react'

import { Link } from 'react-router-dom'

import { Item, Submenu, SubmenuItem } from './styles'

interface Props {
  submenuActive: string | null,
  handleMouseLeave: React.MouseEventHandler<HTMLDivElement>,
  open: boolean,
  itemActive: {name: string},
  handleMouseEnter: Function,
  handleSelectItem: Function,
  itensMenu: {
    nameEvent: string,
    icon: any,
    link: string,
    textLink: string,
    subitem?: {
      icon: any,
      link: string,
      textLink: string
    }[]
  },
}

const ItemMenu: React.FC<Props> = ({submenuActive, handleMouseLeave, open, itemActive, handleMouseEnter, handleSelectItem, itensMenu}) => {
  const Icon = itensMenu.icon
  return (
    <div onMouseEnter={() => handleMouseEnter(itensMenu.nameEvent)} onMouseLeave={handleMouseLeave}>
    <Link to={itensMenu.link} onClick={() => handleSelectItem(itensMenu.link)}>
      <Item $open={open} $active={itemActive.name.includes(itensMenu.link)}>
        <Icon size={20} />
        {open && <p>{itensMenu.textLink}</p>}
      </Item>
    </Link>
    {submenuActive === itensMenu.nameEvent && (
      <Submenu $open={open}>
        {itensMenu.subitem?.map((item) => {
          const IconSubmenu = item.icon;
          return (
          <SubmenuItem><IconSubmenu /><Link to={item.link}>{item.textLink}</Link></SubmenuItem>
        )})}
      </Submenu>
    )}
  </div>
  )
}

export default ItemMenu
