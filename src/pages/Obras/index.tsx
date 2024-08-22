import React, { useContext, useEffect } from 'react'

import { GlobalContainer, Content } from '../../assets/styles/global'

import ObrasContext from '../../contexts/obrasContext'
import ModalContext from '../../contexts/modalContext'
import LoadingContext from '../../contexts/loadingContext'
import AuthContext from '../../contexts/authContext'

import Menu from '../../components/Menu'
import Header from '../../components/Header'
import Button from '../../components/Button'

import CreateObras from './CreateObras'
import ObrasTable from './components/ObrasTable'

import { ButtonContainer, ContentPage } from './styles'

const ListObras: React.FC = () => {
  const { obras, listObras } = useContext(ObrasContext)
  const { token } = useContext(AuthContext)
  const { changeModal } = useContext(ModalContext)
  const { changeLoading } = useContext(LoadingContext)

  const handleCreateObra = () => {
    changeModal(<CreateObras />)
  }

  const getObras = async () => {
    await listObras({ token })

    changeLoading(false)
  }

  useEffect(() => {
    changeLoading(true, 'buscando obras...')
    if (!obras || obras.length === 0) {
      void getObras()
    }
  }, [])

  return (
  <GlobalContainer>
    <Menu />
    <Header title='Obras' goBack/>
    <Content $obras={obras.length > 0}>
      {!obras || obras.length === 0
        ? <CreateObras />
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
