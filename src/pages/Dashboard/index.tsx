import React from 'react'
import Menu from '../../components/Menu'
import Header from '../../components/Header'
import { Content } from './styles'

export default function Dashboard () {
  return (
    <>
      <Menu />
      <Content>
        <Header title={'Dashboard'} />
      </Content>
    </>
  )
}
