import React from 'react'

import { GlobalContainer } from '../../../assets/styles/global'

import Header from '../../../components/Header'
import Menu from '../../../components/Menu'
import HeaderResumoObra from '../components/HeaderResumo'
import BoxInfos from '../components/BoxInfos'
import TableInfos from '../../../components/TableInfos'
import Button from '../../../components/Button'

import useDetalhamento from './useDetalhamento'

import { comprometidoValue, executadoValue, orcamentoValue, saldoValue } from '../../../utils/calculateInfosObras'

import { Content, CardsInfos, Title, Infos, Bar, Var } from './styles'

const DetalhamentoObra: React.FC = () => {
  const {
    obra,
    cliente,
    animate,
    itens,
    lancamentosRdo,
    lancamentos,
    sizeExecutado,
    sizeComprometido,
    sizeSaldo,
    comprometidoPayments,
    rdos,
    rdas,
    currentRda,
    bigestPayments,
    fornecedores,
    inicio,
    currentRdo,
    lancamentosRda,
    etapas,
    subetapas,
    mediaGastosRDO,
    verificaOpacidade,
    handleOpenLancamentoRDORDA,
  } = useDetalhamento()

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
            <p className='bargray executado'>{executadoValue(lancamentos)}</p>
            <Var $size={sizeExecutado} className={'bar bargray'}>executado</Var>
          </Bar>
          <Bar
            $size={sizeComprometido}
            $color='oranges'
            $width={String(sizeComprometido)}
            $animate={animate}
          >
            <p className='comprometido'>{comprometidoValue(lancamentos)}</p>
            <Var $size={sizeComprometido} className={'bar'}>comprometido</Var>
          </Bar>
          <Bar
            $size={sizeSaldo}
            $color='greens'
            $width={String(sizeSaldo).split(',')[0]}
            $animate={animate}
          >
            <p className='saldo'>{saldoValue(itens, lancamentos)}</p>
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
              }).format((mediaGastosRDO(7)))}
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
            <TableInfos infos={lancamentosRdo} fornecedores={fornecedores} etapas={etapas} subetapas={subetapas}/>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              {rdos.length > 0 && <Button $blue onClick={() => handleOpenLancamentoRDORDA('rdo', currentRdo?.id)}>Abrir RDO</Button>}
            </div>
        </CardsInfos>

        <Header title='RDA' subHeader fullwidth/>
        <CardsInfos $fullWidth>
            <Title>Últimos lançamentos</Title>
            <TableInfos infos={lancamentosRda} fornecedores={fornecedores} etapas={etapas} subetapas={subetapas} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              {rdas.length > 0 && <Button $blue onClick={() => handleOpenLancamentoRDORDA('rda', currentRda?.id)}>Abrir RDA</Button>}
            </div>
        </CardsInfos>
      </Content>
    </GlobalContainer>
  )
}

export default DetalhamentoObra
