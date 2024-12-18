import React, { useContext, useEffect } from 'react'

import { GlobalContainer } from '../../assets/styles/global'

import ClientesContext from '../../contexts/clientesContext'
import ModalContext from '../../contexts/modalContext'
import AuthContext from '../../contexts/authContext'
import LoadingContext from '../../contexts/loadingContext'

import Menu from '../../components/Menu'
import Header from '../../components/Header'
import Button from '../../components/Button'
import NoItemListed from '../../components/NoItemListed'

import ClientesTable from './components/ClientesTable'

import { Content, ContentPage, ButtonContainer } from './styles'
import CreateCliente from '../../components/CreateOrEditItem/Itens/Clientes'

const ListClientes: React.FC = () => {
  const { clientes, listClientes } = useContext(ClientesContext)
  const { token } = useContext(AuthContext)
  const { changeLoading } = useContext(LoadingContext)
  const { changeModal } = useContext(ModalContext)

  const handleCreateCliente = () => {
    changeModal(<CreateCliente />)
  }

  const getClientes = async () => {
    await listClientes({ token })
  }

  useEffect(() => {
    changeLoading(true, 'Buscando clientes...')

    if (!clientes || clientes.length === 0) {
      void getClientes()

      changeLoading(false)
    }

    const timeout = setTimeout(() => {
      changeLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [clientes])

  return (
  <GlobalContainer>
    <Menu />
    <Header title='Clientes' goBack/>
    <Content $clientes={clientes.length > 0}>
      {!clientes || clientes.length === 0
        ? (<NoItemListed component={<CreateCliente />} text='Não foi encontrado nenhum cliente cadastrado.' />)
        : (
            <ContentPage>
              <ButtonContainer>
                <Button $blue onClick={handleCreateCliente}>Adicionar cliente</Button>
              </ButtonContainer>
              <ClientesTable clientes={clientes} />
            </ContentPage>
          )}
    </Content>
  </GlobalContainer>)
}

export default ListClientes
