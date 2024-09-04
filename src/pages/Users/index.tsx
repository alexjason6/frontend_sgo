import React, { useContext, useEffect } from 'react'

import { GlobalContainer } from '../../assets/styles/global'

import UsersContext from '../../contexts/usersContext'
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
  const { users, listUsers } = useContext(UsersContext)
  const { token, user } = useContext(AuthContext)
  const { changeLoading } = useContext(LoadingContext)
  const { changeModal } = useContext(ModalContext)

  const handleCreateUser = () => {
    changeModal(<CreateUser />)
  }

  const getData = async () => {
    await listUsers({ token })

    changeLoading(false)
  }

  useEffect(() => {
    changeLoading(true, 'Buscando usuários...')
    if (!users || users.length === 0) {
      void getData()
    }

    const timeout = setTimeout(() => {
      changeLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <GlobalContainer>
      <Menu />
      <Header title='Usuários' goBack/>
      <Content $data={users.length > 0}>
        {!users || users.length === 0
          ? (<NoItemListed component={<CreateUser />} text='Não foram encontrados usuários cadastrados.' />)
          : (
              <ContentPage>
                {(user?.permissoes[0] === 'superAdmin' || user?.permissoes[0] === 'gestao') && (
                  <ButtonContainer>
                    <Button $blue onClick={handleCreateUser}>Adicionar usuário</Button>
                  </ButtonContainer>
                )}
                <UsersTable users={users} />
              </ContentPage>
            )}
      </Content>
    </GlobalContainer>
  )
}

export default ListUsers
