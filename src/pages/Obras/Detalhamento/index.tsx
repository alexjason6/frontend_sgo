import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import moment from 'moment'

import { GlobalContainer } from '../../../assets/styles/global'

import RdoRdaContext from '../../../contexts/rdoRdaContext'
import FornecedoresContext from '../../../contexts/fornecedoresContext'
import ObrasContext from '../../../contexts/obrasContext'
import OrcamentosContext from '../../../contexts/orcamentosContext'
import LoadingContext from '../../../contexts/loadingContext'

import Header from '../../../components/Header'
import Menu from '../../../components/Menu'
import HeaderResumoObra from '../components/HeaderResumo'
import BoxInfos from '../components/BoxInfos'
import TableInfos from '../../../components/TableInfos'
import Button from '../../../components/Button'

import { calculaPerCentValue, comprometidoValue, executadoValue, orcamentoValue, saldoValue } from '../../../utils/calculateInfosObras'

import { Content, CardsInfos, Title, Infos, Bar, Var } from './styles'
import AuthContext from '../../../contexts/authContext'

const DetalhamentoObra: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  const { token } = useContext(AuthContext)
  const { cliente, clienteId } = location.state
  const { changeLoading } = useContext(LoadingContext)
  const { obras, listObras } = useContext(ObrasContext)

  const { lancamentosRdo, lancamentosRda, rdos, rdas } = useContext(RdoRdaContext)
  const { fornecedores, listFornecedores } = useContext(FornecedoresContext)
  const { orcamentos } = useContext(OrcamentosContext)

  const [obra] = obras.filter((item) => item.id === Number(id))
  const [orcamentoOpened] = orcamentos.filter((orcamento) => orcamento.obra === obra.id)
  const itens = orcamentoOpened.item
  const bigestPayments = useMemo(() => lancamentosRdo.sort((a, b) => Number(a.valor_pagamento) > Number(b.valor_pagamento) ? -1 : 1).slice(0, 5), [lancamentosRdo])
  const comprometidoPayments = useMemo(() => lancamentosRdo.sort((a, b) => Number(a.valor_comprometido) > Number(b.valor_comprometido) ? -1 : 1).slice(0, 8), [lancamentosRdo])
  const trataInicio = moment.unix(Number(obra?.data_inicio))
  const inicio = moment(trataInicio, 'YYYY-MM-DD').diff(moment().format('YYYY-MM-DD'), 'months')
  const sizeExecutado = Number(calculaPerCentValue(executadoValue(lancamentosRdo, 'pure'), orcamentoValue(itens, 'pure')))
  const sizeComprometido = Number(calculaPerCentValue(comprometidoValue(lancamentosRdo, 'pure'), orcamentoValue(itens, 'pure')))
  const sizeSaldo = Number(String(calculaPerCentValue(saldoValue(itens, lancamentosRdo, 'pure'), orcamentoValue(itens, 'pure'))).split(',')[0])
  const currentRdo = rdos.find((rdo) => rdo.obra === obra?.id)
  const currentRda = rdas.find((rda) => rda.obra === obra?.id)
  const [animate, setAnimate] = useState(false)

  const mediaGastosRDO = (days: number) => {
    const value = lancamentosRdo.reduce<number>((accumulator, item) => {
      return accumulator + Number(item.valor_pagamento)
    }, 0) / days

    if (value === Infinity) {
      return 0
    }

    return lancamentosRdo.length === 0 ? 0 : value
  }

  const verificaOpacidade = (index: number, arrayLength: number) => {
    if (arrayLength <= 1) {
      return 1
    }

    const minOpacity = 0.1
    const maxOpacity = 1

    return maxOpacity - ((maxOpacity - minOpacity) * index) / (arrayLength - 1)
  }

  const handleOpenLancamentoRDORDA = (type: string, id?: number) => {
    if (!type || !id) {
      return
    }

    changeLoading(true, `carregando dados do ${type}...`)

    navigate(`/obras/lancamentos/${type}/${id}`, {
      state: {
        cliente,
        clienteId,
        obra: obra.id
      }
    })
  }

  const getData = useCallback(async () => {
    changeLoading(true, 'Buscando fornecedores...')
    await listFornecedores({ token })

    changeLoading(true, 'Buscando dados da obra...')
    await listObras({ token })
  }, [listObras, token, changeLoading, listFornecedores])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true)
    }, 0)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    changeLoading(true, 'Buscando dados...')
    if (!obras || obras.length === 0) {
      void getData()
    }

    const timeout = setTimeout(() => {
      changeLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [changeLoading, getData, obras])

  if (!obra) return <p>Obra não encontrada</p>

  return (
    <GlobalContainer>
      <Menu />
      <Header title='Detalhamento geral de obra' goBack/>
      <Content>
        <HeaderResumoObra obra={obra} cliente={cliente} />
        <Header title='RDO' subHeader fullwidth/>
        <CardsInfos $bars>
          <Title>Evolução dos pagamentos</Title>
          <Bar $animate={animate} $color='blues' $width={'100'}>
            <p>{orcamentoValue(itens)}</p>
            <Var className={'bar'}>orçamento</Var>
          </Bar>
          <Bar
            $size={sizeExecutado}
            $color='alert'
            $width={String(sizeExecutado)}
            $animate={animate}
          >
            <p className='bargray executado'>{executadoValue(lancamentosRdo)}</p>
            <Var $size={sizeExecutado} className={'bar bargray'}>executado</Var>
          </Bar>
          <Bar
            $size={sizeComprometido}
            $color='oranges'
            $width={String(sizeComprometido)}
            $animate={animate}
          >
            <p className='comprometido'>{comprometidoValue(lancamentosRdo)}</p>
            <Var $size={sizeComprometido} className={'bar'}>comprometido</Var>
          </Bar>
          <Bar
            $size={sizeSaldo}
            $color='greens'
            $width={String(sizeSaldo).split(',')[0]}
            $animate={animate}
          >
            <p className='saldo'>{saldoValue(itens, lancamentosRdo)}</p>
            <Var $size={sizeSaldo} className={'bar'}>saldo</Var>
          </Bar>
        </CardsInfos>

        <CardsInfos>
          <Infos $oneOfThree>
            <Title>Médias de pagamentos</Title>
            <BoxInfos
              legend='média semanal'
              color='blues'
              opacityColor={1}
              info={Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(mediaGastosRDO(7))}
            />
            <BoxInfos
              legend='média quinzenal'
              color='blues'
              opacityColor={0.6}
              info={Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(mediaGastosRDO(15))}
            />
            <BoxInfos
              legend='média mensal'
              color='blues'
              opacityColor={0.3}
              info={Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(mediaGastosRDO(inicio))}
            />
          </Infos>

          <Infos>
            <Title>Fornecedores com maiores pagamentos</Title>
            {bigestPayments.map((payment, index) => {
              const [fornecedor] = fornecedores.filter((item) => item.id === payment.fornecedor)
              return (
              <BoxInfos
                key={payment.id}
                legend={fornecedor?.nome}
                color='alert'
                opacityColor={verificaOpacidade(index, fornecedores.length)}
                info={Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(payment.valor_pagamento))}
              />
              )
            })}
          </Infos>
        </CardsInfos>

        <CardsInfos>
          <Infos $fullWidth>
            <Title>Contratos com valores comprometidos</Title>
            {comprometidoPayments.map((comprometido, index) => {
              const [fornecedor] = fornecedores.filter((item) => item.id === comprometido.fornecedor)
              return (
              <BoxInfos
                key={comprometido.id}
                legend={fornecedor.nome}
                color='oranges'
                accent='dark'
                opacityColor={verificaOpacidade(index, fornecedores.length)}
                info={Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(comprometido.valor_comprometido))}
              />
              )
            })}
          </Infos>
        </CardsInfos>

        <CardsInfos $fullWidth>
            <Title>Últimos lançamentos</Title>
            <TableInfos infos={lancamentosRdo} fornecedores={fornecedores} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              {rdos.length > 0 && <Button $blue onClick={() => handleOpenLancamentoRDORDA('rdo', currentRdo?.id)}>Abrir RDO</Button>}
            </div>
        </CardsInfos>

        <Header title='RDA' subHeader fullwidth/>
        <CardsInfos $fullWidth>
            <Title>Últimos lançamentos</Title>
            <TableInfos infos={lancamentosRda} fornecedores={fornecedores} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              {rdas.length > 0 && <Button $blue onClick={() => handleOpenLancamentoRDORDA('rda', currentRda?.id)}>Abrir RDA</Button>}
            </div>
        </CardsInfos>
      </Content>
    </GlobalContainer>
  )
}

export default DetalhamentoObra
