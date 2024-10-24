import React, { useEffect, useState, useRef, useContext, useLayoutEffect, useCallback, type Dispatch, type SetStateAction } from 'react'
import { GlobalContainer } from '../../assets/styles/global'

import LoadingContext from '../../contexts/loadingContext'
import ObrasContext from '../../contexts/obrasContext'
import RdoRdaContext from '../../contexts/rdoRdaContext'

import Menu from '../../components/Menu'
import Header from '../../components/Header'

import CreateFirstObra from './components/CreateFirsObra'
import Sections from './components/Sections'
import AuthContext from '../../contexts/authContext'

import { type Obra } from '../../interfaces/globalInterfaces'

const Dashboard: React.FC = () => {
  const refPage = useRef<null | HTMLElement>(null)

  const { changeLoading } = useContext(LoadingContext)
  const { token } = useContext(AuthContext)
  const { obras, listObras } = useContext(ObrasContext)
  const { rdos, rdas, listRdas, listRdos } = useContext(RdoRdaContext)

  const [itensObras, setItensObras] = useState<Obra[]>([])
  const [itensRdo, setItensRdos] = useState(rdos)
  const [itensRda, setItensRdas] = useState(rdas)
  const [more, setMore] = useState<string[]>([])
  const [width, setWidth] = useState<number>(6)

  const resizeHandler = useCallback((sizeWindow: number) => {
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

      if (obras.length > 3) {
        if (!more.includes('obras')) setItensObras(obras)
        if (!more.includes('rdos')) setItensRdos(rdos)
        if (!more.includes('rdas')) setItensRdas(rdas)
      }

      if (!more.includes('obras')) setItensObras(obras.slice(0, size))
      if (!more.includes('rdos')) setItensRdos(rdos.slice(0, size))
      if (!more.includes('rdas')) setItensRdas(rdas.slice(0, size))
    }
  }, [obras, rdas, rdos])

  const handleResize = useCallback(() => {
    if (refPage.current) {
      const sizeWindow = refPage.current.getBoundingClientRect().width
      resizeHandler(sizeWindow)
    }
  }, [resizeHandler])

  const handleChangeMore = useCallback((type: string, setItems: Dispatch<SetStateAction<any[]>>, itemsDb: any[]) => {
    setMore((prevMore) => {
      if (prevMore.includes(type)) {
        setItems(itemsDb.slice(0, width))
        return prevMore.filter((item) => item !== type)
      } else {
        setItems(itemsDb)
        return [...prevMore, type]
      }
    })
  }, [width])

  useLayoutEffect(() => {
    changeLoading(true, 'Carregando...')
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
  }, [obras, changeLoading, resizeHandler])

  const getData = useCallback(async() => {
    changeLoading(true, 'Carregando obras...')
    await listObras({ token })

    changeLoading(true, 'Carregando RDOS...')
    await listRdos({ token })

    changeLoading(true, 'Carregando RDAS...')
    await listRdas({ token })
  }, [changeLoading, listObras, listRdas, listRdos, token])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  useEffect(() => {
    void getData()

    if (obras.length > 0) {
      setItensObras(obras)
    }

    const timeout = setTimeout(() => {
      changeLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [token, getData])

  return (
    <GlobalContainer ref={refPage}>
      <Menu />
      <Header title={obras.length > 0 ? 'Obras em andamento' : 'Dashboard'} />
        {!obras || obras.length === 0
          ? <CreateFirstObra />
          : (
          <div style={{ paddingBottom: 20 }}>
            <Sections
              titleHeader='Obras'
              typeSection={'obra'}
              items={itensObras}
              itemDb={obras}
              setItem={setItensObras}
              handleChangeMore={(type, setItems, itemsDb) => handleChangeMore(type, setItems, itemsDb)}
              more={more}
              width={width}
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
              showDoc
              width={width}
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
              showDoc
              width={width}
            />

        </div>
            )}
    </GlobalContainer>
  )
}

export default Dashboard
