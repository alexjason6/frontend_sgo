import React, { useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  MdMenu, MdDashboard, MdHistory,
  MdDirectionsCar
} from 'react-icons/md'
import { FiUsers } from 'react-icons/fi'
import { LuConstruction } from 'react-icons/lu'
import { FaFileInvoiceDollar } from 'react-icons/fa'

import OpenedMenu from './components/Opened'

import { Container, Item } from './styles'

import { type TypesItemActive } from '../../interfaces/globalInterfaces'

const Menu: React.FC = () => {
  const { pathname } = useLocation()
  const [itemActive, setItemActive] = useState<TypesItemActive>({ name: pathname })
  const [open, setOpen] = useState(false)

  const handleSelectItem = useCallback((item: string) => {
    setOpen(false)
    setItemActive(prevState => (prevState.name === item ? { name: '' } : { name: item }))
  }, [])

  const handleChangeMenu = useCallback(() => {
    setOpen(prevState => !prevState)
  }, [])

  return (
    <Container>
      <OpenedMenu
        open={open}
        handleChangeMenu={handleChangeMenu}
        itemActive={itemActive}
      />
      <Item active={itemActive.name === 'menu'} onClick={handleChangeMenu}>
        <MdMenu size={25} />
      </Item>
      <Link to="/dashboard" onClick={() => handleSelectItem('/dashboard')}>
        <Item active={itemActive.name === '/dashboard'}>
          <MdDashboard size={20} />
        </Item>
      </Link>
      <Link to="/clientes" onClick={() => handleSelectItem('/clientes')}>
        <Item active={itemActive.name.includes('/clientes')}>
          <FiUsers size={20} />
        </Item>
      </Link>
      <Link to="/obras" onClick={() => handleSelectItem('/obras')}>
        <Item active={itemActive.name.includes('/obras')}>
          <LuConstruction size={20} />
        </Item>
      </Link>
      <Link to="/orcamentos" onClick={() => handleSelectItem('/orcamentos')}>
        <Item active={itemActive.name.includes('/orcamentos')}>
          <FaFileInvoiceDollar size={20} />
        </Item>
      </Link>
      <Item active={itemActive.name === '/history'} onClick={() => handleSelectItem('/history')}>
        <MdHistory size={20} />
      </Item>
      <Link to="/vehicles/list" onClick={() => handleSelectItem('/vehicles')}>
        <Item active={pathname.includes('/vehicles')}>
          <MdDirectionsCar size={20} />
        </Item>
      </Link>
    </Container>
  )
}

export default Menu