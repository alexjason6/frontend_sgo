/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react'

import { GlobalContainer, Content } from '../../assets/styles/global'

import ObrasContext from '../../contexts/obrasContext'

import Menu from '../../components/Menu'
import Header from '../../components/Header'

import CreateObras from './CreateObras'
import ObrasTable from './components/ObrasTable'

const ListObras: React.FC = () => {
  const { obras } = useContext(ObrasContext)

  return (
  <GlobalContainer>
    <Menu />
    <Header title='Obras' goBack/>
    <Content $obras={obras.length > 0}>
      {!obras || obras.length === 0
        ? <CreateObras />
        : (
          <ObrasTable obras={obras} />
          )}
    </Content>
  </GlobalContainer>)
}

export default ListObras
