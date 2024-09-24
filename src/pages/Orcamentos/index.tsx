import React, { useContext, useEffect, useCallback } from 'react'

import { GlobalContainer, Content } from '../../assets/styles/global'

import OrcamentosContext from '../../contexts/orcamentosContext'
import LoadingContext from '../../contexts/loadingContext'
import AuthContext from '../../contexts/authContext'

import Menu from '../../components/Menu'
import Header from '../../components/Header'
import Button from '../../components/Button'
import NoItemListed from '../../components/NoItemListed'

import CreateItem from '../../components/CreateItem/'
import OrcamentosTable from './components/OrcamentosTable'

import { ButtonContainer, ContentPage } from './styles'
// import { orcamentoValue } from '../../utils/calculateInfosObras'
import ClientesContext from '../../contexts/clientesContext'
import ObrasContext from '../../contexts/obrasContext'
import { useNavigate } from 'react-router-dom'

const ListOrcamentos: React.FC = () => {
  const navigate = useNavigate()
  const { orcamentos, itens, modelos, listOrcamentos } = useContext(OrcamentosContext)
  const { token } = useContext(AuthContext)
  const { clientes, listClientes } = useContext(ClientesContext)
  const { obras, listObras } = useContext(ObrasContext)
  const { changeLoading } = useContext(LoadingContext)
  // const valorOrcamento = orcamentoValue(itens)

  console.log({ itens }, { orcamentos })

  const handleCreateOrcamento = () => {
    navigate('/orcamentos/novo')
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
        ? <NoItemListed component={<CreateItem type='orcamento' />} text='Não foram encontradas orçamentos cadastrados.' />
        : (
          <ContentPage>
            <ButtonContainer>
              <Button $blue onClick={handleCreateOrcamento}>Criar orçamento</Button>
            </ButtonContainer>
            <OrcamentosTable
              orcamentos={orcamentos}
              tipo={modelos}
              clientes={clientes}
              obras={obras}
            />
          </ContentPage>
          )}
    </Content>
  </GlobalContainer>)
}

export default ListOrcamentos
