import React from 'react'
import { FiArrowDown, FiArrowUp } from 'react-icons/fi'

import { GlobalContainer } from '../../assets/styles/global'

import useFornecedores from './useFornecedores'

import Menu from '../../components/Menu'
import Header from '../../components/Header'
import Button from '../../components/Button'
import CreateItem from '../../components/CreateOrEditItem'

import NoItemListed from '../../components/NoItemListed'
import FornecedoresTable from './components/FornecedoresTable'

import { Content, ContentPage, ButtonContainer, Arrow, Sort } from './styles'

const ListFornecedores: React.FC = () => {
  const { fornecedoresData, fornecedoresLength, changeModal, sortFornecedores } = useFornecedores();
  const ASCName = fornecedoresData.every((current, index, array) => {
    if (index === 0) return true; // Primeiro elemento não tem anterior para comparar
    return array[index - 1].nome <= current.nome; // Verifica se o anterior <= atual
  })

  return (
    <GlobalContainer>
      <Menu />
      <Header title='Fornecedores' goBack/>
      <Content $data={fornecedoresLength > 0}>
        {!fornecedoresData || fornecedoresLength === 0
          ? (<NoItemListed component={<CreateItem type='fornecedor' />} text='Não foram encontrados fornecedores cadastrados.' />)
          : (
              <ContentPage>
                <ButtonContainer>
                  <div style={{width: 200}}>
                    <Button $blue onClick={() => changeModal(<CreateItem type="fornecedor" />)}>Adicionar fornecedor</Button>
                  </div>
                  <Sort onClick={() => sortFornecedores("name", ASCName ? 'DESC' : 'ASC')}>Nome <Arrow $direction={ASCName}/></Sort>
                </ButtonContainer>
                <FornecedoresTable fornecedores={fornecedoresData} />
              </ContentPage>
            )}
      </Content>
    </GlobalContainer>
  )
}

export default ListFornecedores
