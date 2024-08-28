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

import CreateModelo from '../CreateModelos'

const ModelosOrcamento: React.FC = () => {
  const { token } = useContext(AuthContext)
  const { changeModal } = useContext(ModalContext)
  const { changeLoading } = useContext(LoadingContext)
  const { tiposOrcamentos, listTiposOrcamentos } = useContext(OrcamentosContext)

  const handleCreateObra = () => {
    changeModal(<CreateModelo />)
  }

  const getData = useCallback(async () => {
    await listTiposOrcamentos({ token })
    changeLoading(true, 'Buscando clientes...')
  }, [listTiposOrcamentos])

  useEffect(() => {
    changeLoading(true, 'Buscando modelos de orçamentos...')
    if (!tiposOrcamentos || tiposOrcamentos.length === 0) {
      void getData()
    }

    const timeout = setTimeout(() => {
      changeLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [tiposOrcamentos])

  return (
    <GlobalContainer>
      <Menu />
      <Header title='Modelos de orçamentos' goBack/>
      <Content $itens={tiposOrcamentos.length > 0}>
      {!tiposOrcamentos || tiposOrcamentos.length === 0
        ? <NoItemListed component={<CreateModelo />} text='Não foram encontradas orçamentos cadastrados.' />
        : (
          <ContentPage>
            <ButtonContainer>
              <Button $blue onClick={handleCreateObra}>Criar modelo</Button>
            </ButtonContainer>
            {/* <ModelosTable
              orcamentos={orcamentos}
              valorTotal={valorOrcamento}
              tipo={tiposOrcamentos}
              clientes={clientes}
              obras={obras}
            /> */}
          </ContentPage>
          )}
      </Content>
    </GlobalContainer>
  )
}

export default ModelosOrcamento
