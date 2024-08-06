/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef, useContext, useLayoutEffect, type Dispatch, type SetStateAction } from 'react'
import { GlobalContainer } from '../../assets/styles/global'

import LoadingContext from '../../contexts/loadingContext'

import Menu from '../../components/Menu'
import Header from '../../components/Header'
import CreateFirstObra from './components/CreateFirsObra'

import { obrasDb } from '../../assets/database/obras'
import { clientesDb } from '../../assets/database/clientes'
import { rdosDb } from '../../assets/database/rdos'
import { rdasDb } from '../../assets/database/rdas'

import { type Obra, type RdoRda } from '../../interfaces/globalInterfaces'
import Sections from './components/Sections'

const Dashboard: React.FC = () => {
  const { changeLoading } = useContext(LoadingContext)
  const refPage = useRef<null | HTMLElement>(null)
  const [obras, setObras] = useState<Obra[]>(obrasDb)
  const [rdos, setRdos] = useState<RdoRda[]>(rdosDb)
  const [rdas, setRdas] = useState<RdoRda[]>(rdasDb)
  const [more, setMore] = useState<string[]>([])
  const [width, setWidth] = useState<number>(6)

  const resizeHandler = (sizeWindow: number) => {
    if (obrasDb && rdosDb && rdasDb) {
      let size
      if (sizeWindow >= 1740) {
        size = 6
        setWidth(6)
      } else if (sizeWindow >= 1480) {
        size = 5
        setWidth(5)
      } else if (sizeWindow >= 1220) {
        size = 4
        setWidth(4)
      } else if (sizeWindow >= 960) {
        size = 3
        setWidth(3)
      } else if (sizeWindow >= 700) {
        size = 2
        setWidth(2)
      } else {
        size = 1
        setWidth(1)
      }

      if (!more.includes('obras')) setObras(obrasDb.slice(0, size))
      if (!more.includes('rdos')) setRdos(rdosDb.slice(0, size))
      if (!more.includes('rdas')) setRdas(rdasDb.slice(0, size))
    }

    changeLoading(false, 'Carregando obras...')
  }

  const handleResize = () => {
    if (refPage.current) {
      const sizeWindow = refPage.current.getBoundingClientRect().width
      resizeHandler(sizeWindow)
    }
  }

  const handleChangeMore = (type: string, setItems: Dispatch<SetStateAction<any[]>>, itemsDb: any[]) => {
    setMore((prevMore) => {
      if (prevMore.includes(type)) {
        setItems(itemsDb.slice(0, width))
        return prevMore.filter((item) => item !== type)
      } else {
        setItems(itemsDb)
        return [...prevMore, type]
      }
    })
  }

  useLayoutEffect(() => {
    changeLoading(true, 'Carregando obras...')

    const observer = new ResizeObserver((entries) => {
      const sizeWindow = entries[0].contentRect.width
      resizeHandler(sizeWindow)
    })

    if (refPage.current) {
      observer.observe(refPage.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <GlobalContainer ref={refPage}>
      <Menu />
      <Header title={obras.length > 0 ? 'Obras em andamento' : 'Dashboard'} />
        {!obras || obras.length === 0
          ? <CreateFirstObra />
          : (
          <div style={{ paddingBottom: 30 }}>
            <Sections
              titleHeader='Obras'
              typeSection={'obra'}
              items={obras}
              itemDb={obrasDb}
              setItem={setObras}
              handleChangeMore={(type, setItems, itemsDb) => handleChangeMore(type, setItems, itemsDb)}
              more={more}
            />

            <Sections
              titleHeader='RDOS'
              typeSection={'rdo'}
              isSubHeader
              items={rdos}
              itemDb={rdosDb}
              setItem={setRdos}
              handleChangeMore={(type, setItems, itemsDb) => handleChangeMore(type, setItems, itemsDb)}
              more={more}
            />

            <Sections
              titleHeader='RDAS'
              typeSection={'rda'}
              isSubHeader
              items={rdas}
              itemDb={rdasDb}
              setItem={setRdas}
              handleChangeMore={(type, setItems, itemsDb) => handleChangeMore(type, setItems, itemsDb)}
              more={more}
            />
            {/* <Content $obras={obras.length > 0}>
              <Itens>
                {obras.map((obra) => {
                  const cliente = clientesDb.find((item) => item.id === obra.id_cliente)
                  return (
                    <CardItem
                      type="obra"
                      key={obra.id}
                      cliente={cliente?.nome ?? 'Cliente desconhecido'}
                      id={obra.id}
                      nome={obra.nome}
                    />
                  )
                })}
              </Itens>
              {obrasDb.length >= obras.length && (
                <More>
                  <p onClick={() => handleChangeMore('obras', setObras, obrasDb)}>
                    {more.includes('obras') ? 'Recolher' : 'Expandir obras'}
                    <Chevron $obras={more.includes('obras')} />
                  </p>
                </More>
              )}
            </Content>

            <Header title="RDOs" subHeader />
            <Content $obras={rdos.length > 0}>
              <Itens>
                {rdos.map((rdo) => {
                  const obra = obrasDb.find((item) => item.id === rdo.obra)
                  const cliente = clientesDb.find((item) => item.id === rdo.id_cliente)
                  return (
                    <CardItem
                      type="rdo"
                      key={rdo.id}
                      cliente={cliente?.nome ?? 'Cliente desconhecido'}
                      id={rdo.id}
                      nome={obra?.nome ?? 'Obra desconhecida'}
                    />
                  )
                })}
              </Itens>
              {rdosDb.length >= rdos.length && (
                <More>
                  <p onClick={() => handleChangeMore('rdos', setRdos, rdosDb)}>
                    {more.includes('rdos') ? 'Recolher' : 'Expandir RDOs'}
                    <Chevron $obras={more.includes('rdos')} />
                  </p>
                </More>
              )}
            </Content>

            <Header title="RDAs" subHeader />
            <Content $obras={rdas.length > 0}>
              <Itens>
                {rdas.map((rda) => {
                  const obra = obrasDb.find((item) => item.id === rda.obra)
                  const cliente = clientesDb.find((item) => item.id === rda.id_cliente)
                  return (
                    <CardItem
                      type="rda"
                      key={rda.id}
                      cliente={cliente?.nome ?? 'Cliente desconhecido'}
                      id={rda.id}
                      nome={obra?.nome ?? 'Obra desconhecida'}
                    />
                  )
                })}
              </Itens>

              {rdasDb.length >= rdas.length && (
              <More>
                <p onClick={() => handleChangeMore('rdas', setRdas, rdasDb)}>
                  {more.includes('rdas') ? 'Recolher' : 'Expandir RDAs'}
                  <Chevron $obras={more.includes('rdas')} />
                </p>
              </More>
              )}
            </Content> */}
        </div>
            )}
    </GlobalContainer>
  )
}

export default Dashboard
