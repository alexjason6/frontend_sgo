/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
import { GlobalContainer } from '../../assets/styles/global'

import Menu from '../../components/Menu'
import Header from '../../components/Header'
import CreateFirstObra from './components/CreateFirsObra'
import CardObra from './components/CardObra'

import { Content, Obras } from './styles'

import { type Obra } from '../../interfaces/globalInterfaces'
import Loading from '../../components/Loading'

type TypeMore = Record<string, string>

const Dashboard: React.FC = () => {
  const refElement = useRef<null | HTMLElement>(null)
  const [size, setSize] = useState(0)
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
  const [more, setMore] = useState<TypeMore[]>()
  const observer = new IntersectionObserver((entries) => {
    const sizeWindow = Number(entries[0]?.rootBounds?.width)

    window.addEventListener('resize', () => {
      if (sizeWindow >= 1740) {
        setSize(6)
      } else if (sizeWindow >= 1480) {
        setSize(5)
      } else if (sizeWindow >= 1220) {
        setSize(4)
      } else if (sizeWindow >= 960) {
        setSize(3)
      } else if (sizeWindow >= 700) {
        setSize(2)
      } else {
        setSize(1)
      }
    })
  })

  useEffect(() => {
    if (!refElement.current) {
      return
    }

    observer.observe(refElement.current)
  }, [size])

  return (
    <GlobalContainer>
      <Menu />
      <Header title={obras ? 'Obras em andamento' : 'Dashboard'} />
      <Content $obras={!!obras}>
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
        <Obras $open={!!more?.filter((item: any) => item === 'obras')} ref={refElement}>
          <CardObra nome='Viana Flex' cliente='Viana Flex S/A' />
          <CardObra nome='Escritório - Raja Gabáglia' cliente='Incorpe empreendimentos LTDA' />
          <CardObra nome='Salão de festas' cliente='Labareda Clube Atlético Mineiro'/>
          <CardObra nome='Betim Flex' cliente='Betim Flex S/A'/>
          <CardObra nome='P&W - Nova sede' cliente='PW Igarapé Transportes LTDA'/>
          <CardObra nome='MeLoca Paineiras' cliente='Condomínio Meloca Paineiras S/A'/>
          <CardObra nome='MeLoca Tinguassu' cliente='Condomínio Meloca Tinguassu S/A'/>
          <CardObra nome='Casa - Morro do chapéu' cliente='Willian Miranda'/>
          <CardObra nome='Expressa Flex' cliente='Expressa Flex S/A'/>
        </Obras>
        <Loading light={false} message={'Carregando...'} />
      </Content>
    </GlobalContainer>
  )
}

export default Dashboard
