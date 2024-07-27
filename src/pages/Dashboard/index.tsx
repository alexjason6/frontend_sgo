import React from 'react'
import Menu from '../../components/Menu'
import Header from '../../components/Header'
import { Content } from './styles'

const Dashboard: React.FC = () => {
  return (
    <>
      <Menu />
      <Content>
        <Header title={'Dashboard'} />
      </Content>
    </>
  )
}

export default Dashboard
