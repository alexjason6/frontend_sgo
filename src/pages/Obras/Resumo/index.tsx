/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect } from 'react'

import { GlobalContainer } from '../../../assets/styles/global'

import Header from '../../../components/Header'
import Button from '../../../components/Button'
import HeaderResumoObra from '../components/HeaderResumo'
import BoxInfos from '../components/BoxInfos'

import checkStatus from '../../../utils/checkStatus'

import { Content } from './styles'

import { type Obra } from '../../../interfaces/globalInterfaces'
import { calculaPerCentValue } from '../../../utils/calculateInfosObras'
import ClientesContext from '../../../contexts/clientesContext'
import AuthContext from '../../../contexts/authContext'
import LoadingContext from '../../../contexts/loadingContext'

interface TypeObra {
  obra: Obra
  saldo: string | number
  orcamento?: string | number
  executado?: string | number
  comprometido?: string | number
  valorM2?: string
  clienteName?: string
}

const ResumoObra: React.FC<TypeObra> = ({ saldo, orcamento, executado, comprometido, obra, valorM2, clienteName }) => {
  const { clientes, listClientes } = useContext(ClientesContext)
  const { token } = useContext(AuthContext)
  const { changeLoading } = useContext(LoadingContext)
  const [dataCliente] = clientes.filter((item) => item.nome === clienteName)

  const getData = async () => {
    changeLoading(true, 'Buscando dados do cliente...')
    await listClientes({ token })
  }

  useEffect(() => {
    changeLoading(true, 'Buscando dados...')
    if (!obra) {
      void getData()
    }

    const timeout = setTimeout(() => {
      changeLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <GlobalContainer $modal>
      <Header title='Resumo de obra' modal/>
      <HeaderResumoObra obra={obra} detalhamento cliente={dataCliente} />

      <Header title='Documentos' modal subHeader/>
      <Content>
        <BoxInfos info='RDO' color='grays' />
        <BoxInfos info='RDA' color='grays' />
        <BoxInfos info='Relatórios' color='blues' opacityColor={1} />
      </Content>

      <Header title='Informações de orçamento' modal subHeader/>
      <Content>
        <BoxInfos legend='status' color='blues' info={checkStatus(obra.status, 'orçamento')!} />
        <BoxInfos
          legend='orçamento'
          color='blues'
          info={orcamento}
        />
        <BoxInfos
          legend='saldo'
          color='greens'
          info={saldo}
        />
        <div className='containerButtons'>
          <Button $blue>Ver mais</Button>
        </div>
      </Content>

      <Header title='Acompanhamento econômico' modal subHeader/>
      <Content>
        <BoxInfos
          legend={'valor m<sup>2</sup>'}
          color='blues'
          info={valorM2}
        />
        <BoxInfos
          legend='orçamento'
          color='blues'
          info={orcamento}
        />
        <BoxInfos
          legend='valor executado'
          color='alert'
          info={executado}
        />
        <BoxInfos
          legend='comprometido'
          color='oranges'
          info={comprometido}
        />
        <BoxInfos
          legend='saldo'
          color='greens'
          info={saldo}
        />
        <BoxInfos
          legend='% executado'
          color='alert'
          info={`${calculaPerCentValue(executado, orcamento)}%`}
        />
        <BoxInfos
          legend='% comprometido'
          color='oranges'
          info={`${calculaPerCentValue(comprometido, orcamento)}%`}
        />
        <BoxInfos
          legend='% disponível'
          color='greens'
          info={`${calculaPerCentValue(saldo, orcamento)}%`}
        />
        <div className='containerButtons' style={{ marginBottom: 20 }}>
          <Button $blue>Ver mais</Button>
        </div>
      </Content>
    </GlobalContainer>
  )
}

export default ResumoObra
