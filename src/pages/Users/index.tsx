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
import UsersTable from './components/UsersTable'

import CreateUser from './CreateUser'

import { Content, ContentPage, ButtonContainer } from './styles'

const ListUsers: React.FC = () => {
  const { clientes, listClientes } = useContext(ClientesContext)
  const { token } = useContext(AuthContext)
  const { changeLoading } = useContext(LoadingContext)
  const { changeModal } = useContext(ModalContext)

  const handleCreateUser = () => {
    changeModal(<CreateUser />)
  }

  const getClientes = async () => {
    await listClientes({ token })

    changeLoading(false)
  }

  useEffect(() => {
    changeLoading(true, 'buscando clientes...')
    if (!clientes || clientes.length === 0) {
      void getClientes()
    }
  }, [])

  return (
  <GlobalContainer>
    <Menu />
    <Header title='Clientes' goBack/>
    <Content $clientes={clientes.length > 0}>
      {!clientes || clientes.length === 0
        ? (<NoItemListed component={<></>} text='Não foram encontrados nenhum usuário cadastrado' />)
        : (
            <ContentPage>
              <ButtonContainer>
                <Button $blue onClick={handleCreateUser}>Adicionar usuário</Button>
              </ButtonContainer>
              <UsersTable clientes={clientes} />
            </ContentPage>
          )}
    </Content>
  </GlobalContainer>)
}

export default ListUsers