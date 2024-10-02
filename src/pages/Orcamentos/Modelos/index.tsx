import React, { useContext, useEffect, useCallback } from 'react'

import { GlobalContainer, Content } from '../../../assets/styles/global'

import ModalContext from '../../../contexts/modalContext'
import LoadingContext from '../../../contexts/loadingContext'
import AuthContext from '../../../contexts/authContext'
import OrcamentosContext from '../../../contexts/orcamentosContext'

import Menu from '../../../components/Menu'
import Header from '../../../components/Header'
import NoItemListed from '../../../components/NoItemListed'
import Button from '../../../components/Button'

import { ButtonContainer, ContentPage } from '../styles'

import CreateModelo from '../../../components/CreateItem/Itens/Modelos'
import ModelosTable from './components/ModelosTable'

const ModelosOrcamento: React.FC = () => {
  const { token } = useContext(AuthContext)
  const { changeModal } = useContext(ModalContext)
  const { changeLoading } = useContext(LoadingContext)
  const { modelos, listModelos } = useContext(OrcamentosContext)

  const handleCreateModelo = () => {
    changeModal(<CreateModelo />)
  }

  const getData = useCallback(async () => {
    await listModelos({ token })
    changeLoading(true, 'Buscando clientes...')
  }, [listModelos])

  useEffect(() => {
    changeLoading(true, 'Buscando modelos de orçamentos...')
    if (!modelos || modelos.length === 0) {
      void getData()
    }

    const timeout = setTimeout(() => {
      changeLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [modelos])

  return (
    <GlobalContainer>
      <Menu />
      <Header title='Modelos de orçamentos' goBack/>
      <Content $itens={modelos.length > 0}>
      {!modelos || modelos.length === 0
        ? <NoItemListed component={<CreateModelo />} text='Não foram encontradas modelos de orçamentos.' type='modeloOrcamento' />
        : (
          <ContentPage>
            <ButtonContainer>
              <Button $blue onClick={handleCreateModelo}>Criar modelo</Button>
            </ButtonContainer>
            <ModelosTable
              data={modelos}
            />
          </ContentPage>
          )}
      </Content>
    </GlobalContainer>
  )
}

export default ModelosOrcamento
