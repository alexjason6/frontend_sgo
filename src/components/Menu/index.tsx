import React, { useState, useCallback, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  MdMenu, MdDashboard, MdClose, MdLogout
} from 'react-icons/md'
import { FiUsers, FiUser, FiList, FiPlus } from 'react-icons/fi'
import { LuConstruction } from 'react-icons/lu'
import { FaFileInvoiceDollar, FaHandHoldingUsd, FaStar } from 'react-icons/fa'

import AuthContext from '../../contexts/authContext'

import logoCliente from '../../assets/images/cliente.svg'

import { Container, Item, Submenu, SubmenuItem, LogoCliente } from './styles'

import { type TypesItemActive } from '../../interfaces/globalInterfaces'

interface TypeMenu {
  className?: boolean
}

const Menu: React.FC<TypeMenu> = ({ className }) => {
  const { pathname } = useLocation()
  const { signOut } = useContext(AuthContext)
  const [itemActive, setItemActive] = useState<TypesItemActive>({ name: pathname })
  const [submenuActive, setSubmenuActive] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const handleSelectItem = useCallback((item: string) => {
    setOpen(false)
    setItemActive(prevState => (prevState.name === item ? { name: '' } : { name: item }))
  }, [])

  const handleMouseEnter = (item: string) => {
    setSubmenuActive(item)
  }

  const handleChangeMenu = useCallback(() => {
    setOpen(prevState => !prevState)
  }, [])

  const handleMouseLeave = () => {
    setSubmenuActive(null)
  }
  useEffect(() => {
    if (open) {
      const closeOnEscapeKey = (e: { key: string }) => e.key === 'Escape' ? handleChangeMenu() : null
      document.body.addEventListener('keydown', closeOnEscapeKey)

      return () => {
        document.body.removeEventListener('keydown', closeOnEscapeKey)
      }
    }
  }, [handleChangeMenu, open])

  return (
    <Container className={className ? 'menu' : 'noMenu'} $open={open}>
      <Item $open={open} $menu $active={itemActive.name === 'menu'} onClick={handleChangeMenu}>
        {open ? <MdClose size={25} /> : <MdMenu size={25} />}
          {open && <span>Menu</span>}
      </Item>
      <Link to="/dashboard" onClick={() => handleSelectItem('/dashboard')}>
          <Item $open={open} $active={itemActive.name === '/dashboard'}>
            <MdDashboard size={20} />
            {open && <p>Dashboard</p>}
          </Item>
        </Link>
      <div onMouseEnter={() => handleMouseEnter('clientes')} onMouseLeave={handleMouseLeave}>
        <Link to="/clientes" onClick={() => handleSelectItem('/clientes')}>
          <Item $open={open} $active={itemActive.name.includes('/clientes')}>
            <FiUsers size={20} />
            {open && <p>Clientes</p>}
          </Item>
        </Link>
        {submenuActive === 'clientes' && (
          <Submenu $open={open}>
            <SubmenuItem><FiList /><Link to="/clientes">Listar clientes</Link></SubmenuItem>
            <SubmenuItem><FiPlus /><Link to="/clientes/novo">Cadastrar cliente</Link></SubmenuItem>
          </Submenu>
        )}
      </div>

      <div onMouseEnter={() => handleMouseEnter('obras')} onMouseLeave={handleMouseLeave}>
        <Link to="/obras" onClick={() => handleSelectItem('/obras')}>
          <Item $open={open} $active={itemActive.name.includes('/obras')}>
            <LuConstruction size={20} />
            {open && <p>Obras</p>}
          </Item>
        </Link>
        {submenuActive === 'obras' && (
          <Submenu $open={open}>
            <SubmenuItem><FiList /><Link to="/obras">Listar obras</Link></SubmenuItem>
            <SubmenuItem><FiPlus /><Link to="/obras/novo">Criar obra</Link></SubmenuItem>
          </Submenu>
        )}
      </div>

      <div onMouseEnter={() => handleMouseEnter('fornecedores')} onMouseLeave={handleMouseLeave}>
        <Link to="/fornecedores" onClick={() => handleSelectItem('/fornecedores')}>
          <Item $open={open} $active={itemActive.name === '/fornecedores'} onClick={() => handleSelectItem('/fornecedores')}>
            <FaHandHoldingUsd size={20} />
            {open && <p>Fornecedores</p>}
          </Item>
        </Link>
        {submenuActive === 'fornecedores' && (
          <Submenu $open={open}>
            <SubmenuItem><FiList /><Link to="/fornecedores">Listar fornecedores</Link></SubmenuItem>
            <SubmenuItem><FiPlus /><Link to="/fornecedores/novo">Criar fornecedor</Link></SubmenuItem>
          </Submenu>
        )}
      </div>

      <div onMouseEnter={() => handleMouseEnter('orcamentos')} onMouseLeave={handleMouseLeave}>
        <Link to="/orcamentos" onClick={() => handleSelectItem('/orcamentos')}>
          <Item $open={open} $active={itemActive.name.includes('/orcamentos')}>
            <FaFileInvoiceDollar size={20} />
            {open && <p>Orçamentos</p>}
          </Item>
        </Link>
        {submenuActive === 'orcamentos' && (
          <Submenu $open={open}>
            <SubmenuItem><FiList /><Link to="/orcamentos">Listar orcamentos</Link></SubmenuItem>
            <SubmenuItem><FiPlus /><Link to="/orcamentos/novo">Criar orcamento</Link></SubmenuItem>
            <SubmenuItem><FaStar /><Link to="/orcamentos/modelos">Modelos orcamento</Link></SubmenuItem>
          </Submenu>
        )}
      </div>

      <Link to="/usuarios" onClick={() => handleSelectItem('/usuarios')}>
        <Item $open={open} $active={itemActive.name.includes('/usuarios')}>
          <FiUser size={20} />
          {open && <p>Usuários</p>}
        </Item>
      </Link>

      <Item $open={open} onClick={signOut}>
        <MdLogout size={20} />
        {open && <p>Sair</p>}
      </Item>
      { open && <LogoCliente src={logoCliente} /> }
    </Container>
  )
}

export default Menu
