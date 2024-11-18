import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import ModalContext from '../../../../contexts/modalContext'
import OrcamentosContext from '../../../../contexts/orcamentosContext'
import RdoRdaContext from '../../../../contexts/rdoRdaContext'
import ObrasContext from '../../../../contexts/obrasContext'
import LoadingContext from '../../../../contexts/loadingContext'

import Button from '../../../../components/Button'

import ResumoObra from '../../../Obras/Resumo'

import { comprometidoValue, executadoValue, m2ValueTotalOrcamento, orcamentoValue, saldoValue } from '../../../../utils/calculateInfosObras'

import { Container, Title, Hr, Item, Value, Cliente } from './styles'

import { type Obra, type TypeCardItem } from '../../../../interfaces/globalInterfaces'

const CardItem: React.FC<TypeCardItem> = (props) => {
  const { cliente, type, nome, id, idCliente } = props;
  const { item } = props as any;
  const navigate = useNavigate()
  const { changeModal } = useContext(ModalContext)
  const { changeLoading } = useContext(LoadingContext)
  const { orcamentos } = useContext(OrcamentosContext)
  const { rdos, lancamentosRdo } = useContext(RdoRdaContext)
  const { obras } = useContext(ObrasContext)
  const [rdo] = rdos.filter((file) => Number(file.obra) === (Number(item.obra) || Number(item.id)))
  const lancamentos = lancamentosRdo.filter((lancamento) => Number(lancamento.rdo) === Number(rdo?.id) && Number(lancamento.cliente) === Number(idCliente))
  const itensObra = orcamentos.filter((orcamento) => orcamento.obra === id && orcamento.id_cliente === idCliente)
  const [itens] = itensObra.map((itemObra) => itemObra.item)

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
    const obra = rdo?.obra

    navigate(`/obras/lancamentos/${type}/${id}`, {
      state: {
        obra,
        cliente,
        clienteId: item?.id_cliente
      }
    })
  }

  const handleOpenNewEntry = () => {
    const [obra] = obras.filter((item) => item.nome === nome)

    navigate(`/obras/lancamentos/${type}/${id}/novo`, {
      state: {
        obra: obra.id,
        cliente,
        clienteId: item?.id_cliente,
        type,
        id
      }
    })
  }

  return (
    <Container>
      <div className='card' onClick={type === 'obra' ? handleClickCard : undefined}>
        <Title>{`${nome && nome.length > 20 ? nome?.slice(0, 20) + '...' : nome}`}</Title>
        <Hr $title />
        {type === 'obra'
          ? (
            <>
              <Item>Valor da obra <Value $valor>{itens && orcamentoValue(itens)}</Value></Item>
              <Hr />

              <Item>Executado <Value $executado>{itens && executadoValue(lancamentos)}</Value></Item>
              <Hr />

              <Item>Comprometido <Value $comprometido>{lancamentos && comprometidoValue(lancamentos)}</Value></Item>
              <Hr />

              <Item>Saldo <Value $saldo>{itens && saldoValue(itens, lancamentos)}</Value></Item>
              <Hr />
            </>
            )
          : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Button $rdoRda $stroke onClick={handleOpenDocument} >Abrir {type === 'rdo' ? 'RDO' : 'RDA'}</Button>
              <Button $rdoRda $blue onClick={handleOpenNewEntry}>Criar lancamento</Button>
            </div>
            )}
        <Cliente>{cliente && cliente.length > 25 ? cliente.slice(0, 25) + '...' : cliente}</Cliente>
      </div>
    </Container>
  )
}

export default CardItem
