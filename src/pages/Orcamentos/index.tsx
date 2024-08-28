import React, { useContext, useEffect, useCallback } from 'react'

import { GlobalContainer, Content } from '../../assets/styles/global'

import OrcamentosContext from '../../contexts/orcamentosContext'
import ModalContext from '../../contexts/modalContext'
import LoadingContext from '../../contexts/loadingContext'
import AuthContext from '../../contexts/authContext'

import Menu from '../../components/Menu'
import Header from '../../components/Header'
import Button from '../../components/Button'
import NoItemListed from '../../components/NoItemListed'

import CreateOrcamento from './CreateOrcamento'
import OrcamentosTable from './components/OrcamentosTable'

import { ButtonContainer, ContentPage } from './styles'
import { orcamentoValue } from '../../utils/calculateInfosObras'
import ClientesContext from '../../contexts/clientesContext'
import ObrasContext from '../../contexts/obrasContext'

const ListOrcamentos: React.FC = () => {
  const { orcamentos, itens, tiposOrcamentos, listOrcamentos } = useContext(OrcamentosContext)
  const { token } = useContext(AuthContext)
  const { clientes, listClientes } = useContext(ClientesContext)
  const { obras, listObras } = useContext(ObrasContext)
  const { changeModal } = useContext(ModalContext)
  const { changeLoading } = useContext(LoadingContext)
  const valorOrcamento = orcamentoValue(itens)

  const handleCreateObra = () => {
    changeModal(<CreateOrcamento />)
  }

  const getData = useCallback(async () => {
    await listOrcamentos({ token })
    changeLoading(true, 'Buscando clientes...')

    await listClientes({ token })
    changeLoading(true, 'Buscando obras...')

    await listObras({ token })
  }, [listOrcamentos, listClientes, listObras])

  useEffect(() => {
    changeLoading(true, 'Buscando orçamentos...')
    if (!orcamentos || orcamentos.length === 0) {
      void getData()
    }

    const timeout = setTimeout(() => {
      changeLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [orcamentos])

  return (
  <GlobalContainer>
    <Menu />
    <Header title='Cadastro de orçamentos' goBack/>
    <Content $itens={orcamentos.length > 0}>
      {!orcamentos || orcamentos.length === 0
        ? <NoItemListed component={<CreateOrcamento />} text='Não foram encontradas orçamentos cadastrados.' />
        : (
          <ContentPage>
            <ButtonContainer>
              <Button $blue onClick={handleCreateObra}>Criar orçamento</Button>
            </ButtonContainer>
            <OrcamentosTable
              orcamentos={orcamentos}
              valorTotal={valorOrcamento}
              tipo={tiposOrcamentos}
              clientes={clientes}
              obras={obras}
            />
          </ContentPage>
          )}
    </Content>
  </GlobalContainer>)
}

export default ListOrcamentos
