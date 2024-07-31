/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { GlobalContainer } from '../../assets/styles/global'

import Menu from '../../components/Menu'
import Header from '../../components/Header'
import CreateFirstObra from './components/CreateFirsObra'
import CardObra from './components/CardObra'

import { Content } from './styles'

import { type Obra } from '../../interfaces/globalInterfaces'

const Dashboard: React.FC = () => {
  const [obras, setObras] = useState<Obra[] | null>([{
    id: 6,
    alvara: '0101010101010101',
    nome: 'Viana Flex',
    cnd: '010101010101010',
    cep: '29136519',
    logradouro: 'Rua Idalino Carvalho',
    numero: 'SN',
    complemento: '',
    bairro: 'Parque Industrial',
    cidade: 'Viana',
    uf: 'ES',
    engenheiro: 'Tiago Novais',
    data_cadastro: '1721604552',
    data_alteracao: '1721699514',
    data_inicio: '1721604552',
    previsao_entrega: '1721604552',
    data_entrega: null,
    status: 1,
    tipo: 2,
    id_cliente: 2
  }])

  return (
    <GlobalContainer>
      <Menu />
      <Header title={obras ? 'Obras em andamento' : 'Dashboard'} />
      <Content obras={!!obras}>
        {/* {!obras || obras.length === 0
          ? (
          <CreateFirstObra />
            )
          : (
          <>
            {obras.map((obra) => (
              <CardObra
                key={obra.id}
                idCliente={obra.id_cliente}
                id={obra.id}
                nome={obra.nome}
              />
            ))}
          </>
            )} */}
        <CardObra />
        <CardObra />
        <CardObra />
        <CardObra />
        <CardObra />
        <CardObra />
        <CardObra />
        <CardObra />
        <CardObra />
        <CardObra />
        <CardObra />
        <CardObra />
      </Content>
    </GlobalContainer>
  )
}

export default Dashboard
