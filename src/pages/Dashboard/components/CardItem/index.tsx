import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import ModalContext from '../../../../contexts/modalContext'
import OrcamentosContext from '../../../../contexts/orcamentosContext'
import RdoRdaContext from '../../../../contexts/rdoRdaContext'
import ObrasContext from '../../../../contexts/obrasContext'

import Button from '../../../../components/Button'

import ResumoObra from '../../../Obras/Resumo'

import { comprometidoValue, executadoValue, m2ValueTotalOrcamento, orcamentoValue, saldoValue } from '../../../../utils/calculateInfosObras'

import { Container, Title, Hr, Item, Value, Cliente } from './styles'

import { type Obra, type TypeCardItem } from '../../../../interfaces/globalInterfaces'
import LoadingContext from '../../../../contexts/loadingContext'

const CardItem: React.FC<TypeCardItem> = ({ cliente, type, nome, item, id }) => {
  const navigate = useNavigate()
  const { changeModal } = useContext(ModalContext)
  const { changeLoading } = useContext(LoadingContext)
  const { itens } = useContext(OrcamentosContext)
  const { rdos, lancamentosRdo } = useContext(RdoRdaContext)
  const { obras } = useContext(ObrasContext)
  const rdo = rdos.find((file) => file.obra === id)
  const lancamentos = lancamentosRdo.filter((lancamento) => lancamento.obra === rdo?.id)

  const handleClickCard = () => {
    changeLoading(true, 'Carregando dados da obra...')

    changeModal(
      <ResumoObra
        saldo={saldoValue(itens, lancamentos)}
        orcamento={orcamentoValue(itens)}
        executado={executadoValue(lancamentos)}
        comprometido={comprometidoValue(lancamentos)}
        obra={item as Obra}
        valorM2={m2ValueTotalOrcamento(itens, obras, item as Obra)}
        clienteName={cliente}
      />
    )
  }

  const handleOpenDocument = () => {
    navigate(`/obras/lancamentos/${type}/${id}`, {
      state: {
        obra: item?.id,
        cliente,
        clienteId: item?.id_cliente
      }
    })
  }

  const handleOpenNewEntry = () => {
    navigate(`/obras/lancamentos/${type}/${id}/novo`, {
      state: {
        obra: item?.id,
        cliente,
        clienteId: item?.id_cliente
      }
    })
  }

  return (
    <Container>
      <div className='card' onClick={type === 'obra' ? handleClickCard : undefined}>
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
              <Button $rdoRda $stroke onClick={handleOpenDocument} >Abrir {type === 'rdo' ? 'RDO' : 'RDA'}</Button>
              <Button $rdoRda $blue onClick={handleOpenNewEntry}>Criar lancamento</Button>
            </div>
            )}
        <Cliente>{cliente}</Cliente>
      </div>
    </Container>
  )
}

export default CardItem
