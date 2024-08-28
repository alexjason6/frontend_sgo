import React, { useContext, useEffect } from 'react'

import { GlobalContainer, Content } from '../../assets/styles/global'

import ObrasContext from '../../contexts/obrasContext'
import ModalContext from '../../contexts/modalContext'
import LoadingContext from '../../contexts/loadingContext'
import AuthContext from '../../contexts/authContext'

import Menu from '../../components/Menu'
import Header from '../../components/Header'
import Button from '../../components/Button'

import CreateObra from './CreateObra'
import ObrasTable from './components/ObrasTable'

import { ButtonContainer, ContentPage } from './styles'
import NoItemListed from '../../components/NoItemListed'

const ListObras: React.FC = () => {
  const { obras, listObras } = useContext(ObrasContext)
  const { token } = useContext(AuthContext)
  const { changeModal } = useContext(ModalContext)
  const { changeLoading } = useContext(LoadingContext)

  const handleCreateObra = () => {
    changeModal(<CreateObra />)
  }

  const getObras = async () => {
    await listObras({ token })
  }

  useEffect(() => {
    changeLoading(true, 'Buscando obras...')
    if (!obras || obras.length === 0) {
      void getObras()
    }

    const timeout = setTimeout(() => {
      changeLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [obras])

  return (
  <GlobalContainer>
    <Menu />
    <Header title='Obras' goBack/>
    <Content $itens={obras.length > 0}>
      {!obras || obras.length === 0
        ? <NoItemListed component={<CreateObra />} text='Não foram encontradas obras cadastradas.' />
        : (
          <ContentPage>
            <ButtonContainer>
              <Button $blue onClick={handleCreateObra}>Adicionar obra</Button>
            </ButtonContainer>
            <ObrasTable obras={obras} />
          </ContentPage>
          )}
    </Content>
  </GlobalContainer>)
}

export default ListObras
