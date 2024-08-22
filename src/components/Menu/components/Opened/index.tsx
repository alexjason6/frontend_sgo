import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  MdClose, MdDashboard, MdDescription, MdLogout
} from 'react-icons/md'
import { FiUser, FiUsers } from 'react-icons/fi'
import { LuConstruction } from 'react-icons/lu'
import { FaFileInvoiceDollar, FaHandHoldingUsd } from 'react-icons/fa'

import AuthContext from '../../../../contexts/authContext'

import logoCliente from '../../../../assets/images/cliente.svg'

import {
  Container, Item, LogoCliente
} from './styles'

import { type TypesOpenedMenu } from '../../../../interfaces/globalInterfaces'

const OpenedMenu: React.FC<TypesOpenedMenu> = ({
  open, itemActive, handleChangeMenu
}) => {
  const { signOut } = useContext(AuthContext)
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
    <Container $visible={open}>
      <Item $active={itemActive.name === 'menu'} onClick={handleChangeMenu}>
        <MdClose size={25} />
        <span>Menu</span>
      </Item>
      <Link to="/dashboard">
        <Item $active={itemActive.name.includes('/dashboard')}>
          <MdDashboard size={20} />
          <p>Dashboard</p>
        </Item>
      </Link>
      <Link to="/clientes">
        <Item $active={itemActive.name.includes('/clientes')}>
          <FiUsers size={20} />
          <p>Clientes</p>
        </Item>
      </Link>
      <Link to="/obras">
        <Item $active={itemActive.name.includes('/obras')}>
          <LuConstruction size={20} />
          <p>Obras</p>
        </Item>
      </Link>
      <Link to="/fornecedores">
        <Item $active={itemActive.name === '/fornecedores'}>
          <FaHandHoldingUsd size={20} />
          <p>Fornecedores</p>
        </Item>
      </Link>
      <Link to="/orcamentos">
        <Item $active={itemActive.name === '/orcamentos'}>
          <FaFileInvoiceDollar size={20} />
          <p>Orçamentos</p>
        </Item>
      </Link>
      <Link to="/usuarios">
        <Item $active={itemActive.name === '/usuarios'}>
          <FiUser size={20} />
          <p>Usuários</p>
        </Item>
      </Link>

      <Link to="/reports">
        <Item $active={itemActive.name === 'relatorios'}>
          <MdDescription size={20} />
          <p>Relatórios</p>
        </Item>
      </Link>

{/*       <Item $active={itemActive.name === 'settings'}>
        <MdSettings size={20} />
        <p>Configurações</p>
      </Item> */}

      <Item onClick={signOut}>
        <MdLogout size={20} />
        <p>Sair</p>
      </Item>
      <LogoCliente src={logoCliente} />
    </Container>
  )
}

export default OpenedMenu
