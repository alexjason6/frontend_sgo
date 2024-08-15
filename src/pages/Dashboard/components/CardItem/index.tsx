import React, { useContext } from 'react'

import ModalContext from '../../../../contexts/modalContext'
import OrcamentosContext from '../../../../contexts/orcamentosContext'
import RdoRdaContext from '../../../../contexts/rdoRdaContext'

import Button from '../../../../components/Button'

import ResumoObra from '../../../Obras/Resumo'

import { comprometidoValue, executadoValue, m2ValueTotalOrcamento, orcamentoValue, saldoValue } from '../../../../utils/calculateInfosObras'

import { Container, Title, Hr, Item, Value, Cliente } from './styles'

import { type Obra, type TypeCardItem } from '../../../../interfaces/globalInterfaces'
import ObrasContext from '../../../../contexts/obrasContext'

const CardItem: React.FC<TypeCardItem> = ({ cliente, type, nome, item, id }) => {
  const { changeModal } = useContext(ModalContext)
  const { itens } = useContext(OrcamentosContext)
  const { rdos, lancamentosRdo } = useContext(RdoRdaContext)
  const { obras } = useContext(ObrasContext)
  const rdo = rdos.find((file) => file.obra === id)
  const lancamentos = lancamentosRdo.filter((lancamento) => lancamento.obra === rdo?.id)

  const handleClickCard = () => {
    changeModal(
      <ResumoObra
        saldo={saldoValue(itens, lancamentos)}
        orcamento={orcamentoValue(itens)}
        executado={executadoValue(lancamentos)}
        comprometido={comprometidoValue(lancamentos)}
        obra={item as Obra}
        valorM2={m2ValueTotalOrcamento(itens, obras, item as Obra)}
      />
    )
  }

  return (
    <Container>
      <div onClick={type === 'obra' ? handleClickCard : undefined}>
        <Title>{nome}</Title>
        <Hr $title />
        {type === 'obra'
          ? (
            <>
              <Item>Valor da obra <Value $valor>{orcamentoValue(itens)}</Value></Item>
              <Hr />

              <Item>Executado <Value $executado>{executadoValue(lancamentos)}</Value></Item>
              <Hr />

              <Item>Comprometido <Value $comprometido>{comprometidoValue(lancamentos)}</Value></Item>
              <Hr />

              <Item>Saldo <Value $saldo>{saldoValue(itens, lancamentos)}</Value></Item>
              <Hr />

            </>
            )
          : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Button $rdoRda $stroke>Abrir {type === 'rdo' ? 'RDO' : 'RDA'}</Button>
              <Button $rdoRda $blue>Criar lancamento</Button>
            </div>
            )}
        <Cliente>{cliente}</Cliente>
      </div>
    </Container>
  )
}

export default CardItem
