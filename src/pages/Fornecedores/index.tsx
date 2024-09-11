import React, { useContext, useEffect } from 'react'

import { GlobalContainer } from '../../assets/styles/global'

import FornecedoresContext from '../../contexts/fornecedoresContext'
import ModalContext from '../../contexts/modalContext'
import AuthContext from '../../contexts/authContext'
import LoadingContext from '../../contexts/loadingContext'

import Menu from '../../components/Menu'
import Header from '../../components/Header'
import Button from '../../components/Button'
import CreateItem from '../../components/CreateItem'

import NoItemListed from '../../components/NoItemListed'
import FornecedoresTable from './components/FornecedoresTable'

import { Content, ContentPage, ButtonContainer } from './styles'

const ListFornecedores: React.FC = () => {
  const { fornecedores, listFornecedores } = useContext(FornecedoresContext)
  const { token } = useContext(AuthContext)
  const { changeLoading } = useContext(LoadingContext)
  const { changeModal } = useContext(ModalContext)

  const handleCreateUser = () => {
    changeModal(<CreateItem type='fornecedor' />)
  }

  const getFornecedores = async () => {
    await listFornecedores({ token })

    changeLoading(false)
  }

  useEffect(() => {
    changeLoading(true, 'Buscando fornecedores...')
    if (!fornecedores || fornecedores.length === 0) {
      void getFornecedores()
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
      <Header title='Fornecedores' goBack/>
      <Content $data={fornecedores.length > 0}>
        {!fornecedores || fornecedores.length === 0
          ? (<NoItemListed component={<CreateItem type='fornecedor' />} text='Não foram encontrados fornecedores cadastrados.' />)
          : (
              <ContentPage>
                <ButtonContainer>
                  <Button $blue onClick={handleCreateUser}>Adicionar fornecedor</Button>
                </ButtonContainer>
                <FornecedoresTable fornecedores={fornecedores} />
              </ContentPage>
            )}
      </Content>
    </GlobalContainer>
  )
}

export default ListFornecedores
