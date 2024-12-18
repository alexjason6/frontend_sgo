import React from 'react'
import {
  MdMenu, MdDashboard, MdClose, MdLogout
} from 'react-icons/md'
import { FiUsers, FiUser, FiList, FiPlus } from 'react-icons/fi'
import { LuConstruction } from 'react-icons/lu'
import { FaFileInvoiceDollar, FaHandHoldingUsd, FaStar } from 'react-icons/fa'

import useMenu from './useMenu'

import ItemMenu from './components/Item'

import logoCliente from '../../assets/images/cliente.svg'

import { Container, Item, LogoCliente } from './styles'

interface TypeMenu {
  className?: boolean
}

const Menu: React.FC<TypeMenu> = ({ className }) => {
  const {
    itemActive,
    submenuActive,
    open,
    signOut,
    handleChangeMenu,
    handleSelectItem,
    handleMouseEnter,
    handleMouseLeave,
  } = useMenu()
  return (
    <Container className={className ? 'menu' : 'noMenu'} $open={open}>
      <Item $open={open} $menu $active={itemActive.name === 'menu'} onClick={handleChangeMenu}>
          {open ? <MdClose size={25} /> : <MdMenu size={25} />}
          {open && <span>Menu</span>}
      </Item>

      <ItemMenu
        itemActive={itemActive}
        handleMouseLeave={handleMouseLeave}
        open={open}
        handleMouseEnter={handleMouseEnter}
        handleSelectItem={handleSelectItem}
        itensMenu={{
          nameEvent: 'dashboard',
          icon: MdDashboard,
          link: '/dashboard',
          textLink: 'Dashboard',
        }}
        submenuActive={submenuActive}
      />

      <ItemMenu
        itemActive={itemActive}
        handleMouseLeave={handleMouseLeave}
        open={open}
        handleMouseEnter={handleMouseEnter}
        handleSelectItem={handleSelectItem}
        itensMenu={{
          nameEvent: 'clientes',
          icon: FiUsers,
          link: '/clientes',
          textLink: 'Clientes',
          subitem: [{
            icon: FiList,
            link: '/clientes',
            textLink: 'Listar clientes'
          },
          {
            icon: FiPlus,
            link: '/clientes/novo',
            textLink: 'Cadastrar clientes'
          }]
        }}
        submenuActive={submenuActive}
      />

      <ItemMenu
        itemActive={itemActive}
        handleMouseLeave={handleMouseLeave}
        open={open}
        handleMouseEnter={handleMouseEnter}
        handleSelectItem={handleSelectItem}
        itensMenu={{
          nameEvent: 'obras',
          icon: LuConstruction,
          link: '/obras',
          textLink: 'Obras',
          subitem: [{
            icon: FiList,
            link: '/obras',
            textLink: 'Listar obras'
          },
          {
            icon: FiPlus,
            link: '/obras/novo',
            textLink: 'Criar obra'
          }]
        }}
        submenuActive={submenuActive}
      />

      <ItemMenu
        itemActive={itemActive}
        handleMouseLeave={handleMouseLeave}
        open={open}
        handleMouseEnter={handleMouseEnter}
        handleSelectItem={handleSelectItem}
        itensMenu={{
          nameEvent: 'orcamentos',
          icon: FaFileInvoiceDollar,
          link: '/orcamentos',
          textLink: 'Orçamentos',
          subitem: [{
            icon: FiList,
            link: '/orcamentos',
            textLink: 'Listar orçamentos'
          },
          {
            icon: FiPlus,
            link: '/orcamentos/novo',
            textLink: 'Criar orcamento'
          },
          {
            icon: FaStar,
            link: '/orcamentos/modelos',
            textLink: 'Modelos orcamento'
          }]
        }}
        submenuActive={submenuActive}
      />

      <ItemMenu
        itemActive={itemActive}
        handleMouseLeave={handleMouseLeave}
        open={open}
        handleMouseEnter={handleMouseEnter}
        handleSelectItem={handleSelectItem}
        itensMenu={{
          nameEvent: 'fornecedores',
          icon: FaHandHoldingUsd,
          link: '/fornecedores',
          textLink: 'Fornecedores',
          subitem: [{
            icon: FiList,
            link: '/fornecedores',
            textLink: 'Listar fornecedores'
          },
          {
            icon: FiPlus,
            link: '/fornecedores/novo',
            textLink: 'Criar fornecedor'
          }]
        }}
        submenuActive={submenuActive}
      />

      <ItemMenu
        itemActive={itemActive}
        handleMouseLeave={handleMouseLeave}
        open={open}
        handleMouseEnter={handleMouseEnter}
        handleSelectItem={handleSelectItem}
        itensMenu={{
          nameEvent: 'usuarios',
          icon: FiUser,
          link: '/usuarios',
          textLink: 'Usuários',
          subitem: [{
            icon: FiList,
            link: '/usuarios',
            textLink: 'Listar usuarios'
          },
          {
            icon: FiPlus,
            link: '/usuarios/novo',
            textLink: 'Criar usuario'
          }]
        }}
        submenuActive={submenuActive}
      />

        <Item $open={open} onClick={signOut}>
          <MdLogout size={20} />
          {open && <p>Sair</p>}
        </Item>
        { open && <LogoCliente src={logoCliente} /> }
    </Container>
  )
}

export default Menu
