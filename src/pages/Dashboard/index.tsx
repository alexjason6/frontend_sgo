import React, { useEffect, useState, useRef, useContext, useLayoutEffect, type Dispatch, type SetStateAction } from 'react'
import { GlobalContainer } from '../../assets/styles/global'

import LoadingContext from '../../contexts/loadingContext'
import ObrasContext from '../../contexts/obrasContext'
import RdoRdaContext from '../../contexts/rdoRdaContext'

import Menu from '../../components/Menu'
import Header from '../../components/Header'

import CreateFirstObra from './components/CreateFirsObra'
import Sections from './components/Sections'

const Dashboard: React.FC = () => {
  const { changeLoading } = useContext(LoadingContext)
  const refPage = useRef<null | HTMLElement>(null)
  const { obras } = useContext(ObrasContext)
  const { rdos, rdas } = useContext(RdoRdaContext)
  const [itensObras, setItensObras] = useState(obras)
  const [itensRdo, setItensRdos] = useState(rdos)
  const [itensRda, setItensRdas] = useState(rdas)
  const [more, setMore] = useState<string[]>([])
  const [width, setWidth] = useState<number>(6)

  const resizeHandler = (sizeWindow: number) => {
    if (obras && rdos && rdas) {
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

      if (!more.includes('obras')) setItensObras(obras.slice(0, size))
      if (!more.includes('rdos')) setItensRdos(rdos.slice(0, size))
      if (!more.includes('rdas')) setItensRdas(rdas.slice(0, size))
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
          <div>
            <Sections
              titleHeader='Obras'
              typeSection={'obra'}
              items={itensObras}
              itemDb={obras}
              setItem={setItensObras}
              handleChangeMore={(type, setItems, itemsDb) => handleChangeMore(type, setItems, itemsDb)}
              more={more}
            />

            <Sections
              titleHeader='RDOS'
              typeSection={'rdo'}
              isSubHeader
              items={itensRdo}
              itemDb={rdos}
              setItem={setItensRdos}
              handleChangeMore={(type, setItems, itemsDb) => handleChangeMore(type, setItems, itemsDb)}
              more={more}
            />

            <Sections
              titleHeader='RDAS'
              typeSection={'rda'}
              isSubHeader
              items={itensRda}
              itemDb={rdas}
              setItem={setItensRdas}
              handleChangeMore={(type, setItems, itemsDb) => handleChangeMore(type, setItems, itemsDb)}
              more={more}
            />
        </div>
            )}
    </GlobalContainer>
  )
}

export default Dashboard
