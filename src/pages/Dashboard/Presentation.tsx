import React from 'react'
import { GlobalContainer } from '../../assets/styles/global'

import Menu from '../../components/Menu'
import Header from '../../components/Header'

import CreateFirstObra from './components/CreateFirsObra'
import Sections from './components/Sections'

import { type PropsDashboard } from '../../interfaces/presentationInterfaces'

const Presentation: React.FC<PropsDashboard> = ({
  refPage,
  obras,
  itensObras,
  setItensObras,
  handleChangeMore,
  more,
  width,
  itensRdo,
  rdos,
  setItensRdos,
  itensRda,
  rdas,
  setItensRdas,
}) => {
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

export default Presentation
