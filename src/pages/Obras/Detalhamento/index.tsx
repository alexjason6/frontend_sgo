import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { GlobalContainer } from '../../../assets/styles/global'

import RdoRdaContext from '../../../contexts/rdoRdaContext'
import FornecedoresContext from '../../../contexts/fornecedoresContext'
import ObrasContext from '../../../contexts/obrasContext'
import OrcamentosContext from '../../../contexts/orcamentosContext'

import Header from '../../../components/Header'
import Menu from '../../../components/Menu'
import HeaderResumoObra from '../components/HeaderResumo'
import BoxInfos from '../components/BoxInfos'

import { calculaPerCentValue, comprometidoValue, executadoValue, orcamentoValue, saldoValue } from '../../../utils/calculateInfosObras'

import { Content, CardsInfos, Title, Infos, Bar, Var } from './styles'

const DetalhamentoObra: React.FC = () => {
  const { id } = useParams()
  const { obras } = useContext(ObrasContext)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { lancamentosRdo, lancamentosRda } = useContext(RdoRdaContext)
  const { fornecedores } = useContext(FornecedoresContext)
  const { itens } = useContext(OrcamentosContext)
  const [obra] = obras.filter((item) => item.id === Number(id))
  const bigestPayments = lancamentosRdo.sort((a, b) => Number(a.valor_pagamento) > Number(b.valor_pagamento) ? 1 : -1).slice(0, 5)
  const comprometidoPayments = lancamentosRdo.sort((a, b) => Number(a.valor_comprometido) > Number(b.valor_comprometido) ? -1 : 1).slice(0, 8)
  const trataInicio = moment.unix(Number(obra.data_inicio))
  const inicio = moment(trataInicio, 'YYYY-MM-DD').diff(moment().format('YYYY-MM-DD'), 'months')

  const [widths, setWidths] = useState([])

  const mediaGastosRDO = (days: number) => {
    const value = lancamentosRdo.reduce<number>((accumulator, item) => {
      return accumulator + Number(item.valor_pagamento)
    }, 0) / days

    if (value === Infinity) {
      return 0
    }

    return value
  }

  const verificaOpacidade = (index: number, arrayLength: number) => {
    if (arrayLength <= 1) {
      return 1
    }

    const minOpacity = 0.1
    const maxOpacity = 1

    return maxOpacity - ((maxOpacity - minOpacity) * index) / (arrayLength - 1)
  }

  useEffect(() => {
    const executado = document.querySelector('.executado')
    const comprometido = document.querySelector('.comprometido')
    const saldo = document.querySelector('.saldo')
    const widthsArray = [executado, comprometido, saldo].map(element => element?.clientWidth)

    setWidths(widthsArray as [])
  }, [])

  return (
    <GlobalContainer>
      <Menu />
      <Header title='Detalhamento geral de obra' goBack/>
      <Content>
        <HeaderResumoObra obra={obra} />
        <Header title='RDO' subHeader fullwidth/>
        <CardsInfos $bars>
          <Title>Evolução dos pagamentos</Title>
          <Bar $color='blues' $width={'100%'}>
            <p>{orcamentoValue(itens)}</p>
            <Var className={'bar'}>orçamento</Var>
          </Bar>
          <Bar
            $size={widths[0]}
            $color='alert'
            $width={String(calculaPerCentValue(executadoValue(lancamentosRdo, 'pure'), orcamentoValue(itens, 'pure'))).replace(',', '.')}
          >
            <p className='bargray executado'>{executadoValue(lancamentosRdo)}</p>
            <Var $size={widths[0]} className={'bar bargray'}>executado</Var>
          </Bar>
          <Bar
            $size={widths[1]}
            $color='oranges'
            $width={String(calculaPerCentValue(comprometidoValue(lancamentosRdo, 'pure'), orcamentoValue(itens, 'pure'))).replace(',', '.')}
          >
            <p className='comprometido'>{comprometidoValue(lancamentosRdo)}</p>
            <Var $size={widths[1]} className={'bar'}>comprometido</Var>
          </Bar>
          <Bar
            $size={widths[2]}
            $color='greens'
            $width={String(calculaPerCentValue(saldoValue(itens, lancamentosRdo), orcamentoValue(itens, 'pure'))).split(',')[0] + '%'}
          >
            <p className='saldo'>{saldoValue(itens, lancamentosRdo)}</p>
            <Var $size={widths[2]} className={'bar'}>saldo</Var>
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
                legend={fornecedor.nome}
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
      </Content>
    </GlobalContainer>
  )
}

export default DetalhamentoObra
