import React, { useContext,  } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import ModalContext from '../../../../contexts/modalContext'
import LoadingContext from '../../../../contexts/loadingContext'
import AuthContext from '../../../../contexts/authContext'
import OrcamentosContext from '../../../../contexts/orcamentosContext'

import OrcamentosServices from '../../../../services/sgo/OrcamentosServices'

import OrcamentoPdf from '../PDF'
import Confirmation from '../../../../components/Modal/components/confirmation';

import checkStatus from '../../../../utils/checkStatus'
import dateFormat from '../../../../utils/dateFormat'
import Toast from '../../../../utils/toast'
import { orcamentoValue } from '../../../../utils/calculateInfosObras'
import { ExportOrcamentoXLSX } from '../../../../utils/createXlsx'

import { Table, Tr, Td, Edit, Copy, Pdf, Delete, Xlsx } from './styles'

import { type Orcamento, type TiposOrcamentos, type Cliente, type Obra } from '../../../../interfaces/globalInterfaces'

interface ItemTableProps {
  orcamentos: Orcamento[]
  tipo: TiposOrcamentos[]
  clientes: Cliente[]
  obras: Obra[]
}

const OrcamentosTable: React.FC<ItemTableProps> = ({ orcamentos, tipo, clientes, obras }) => {
  const navigate = useNavigate()
  const { changeLoading } = useContext(LoadingContext)
  const { changeModal, changeModalConfirmacao } = useContext(ModalContext)
  const { token } = useContext(AuthContext)
  const {listOrcamentos} = useContext(OrcamentosContext)

  const handleOpenOrcamento = (id: number) => {
    navigate(`/orcamentos/edit/${id}`)
  }

  const handleDuplicateOrcamento = async (orcamento: any) => {
    changeLoading(true, 'Enviando os dados do orçamento...')
    const orcamentoData = {
      nome: `${orcamento.nome} - cópia - ${moment().format('DD-MM-YYYY - HH:mm:ss')}`,
      status: orcamento.status,
      modelo: orcamento.modelo,
      id_cliente: orcamento.id_cliente,
      obra: orcamento.obra,
      item: orcamento.item,
      subitem: orcamento.subitem
    }

    try {
      const create = await OrcamentosServices.create({ token, mapperOrcamentoUpdate: orcamentoData })

      changeLoading(true, 'atualizando lista de orçamentos...')
      listOrcamentos({ token })

      if (create.id) {
        Toast({ type: 'success', text: 'Orçamento duplicado com sucesso.', duration: 5000 })
      }
    } catch (error) {
      Toast({ type: 'danger', text: 'Erro ao duplicar orçamento.', duration: 5000 })
      console.error('Erro ao duplicar orçamento:', error)
    } finally {
      changeLoading(false)
    }
  }

  const deleteOrcamento = async (id: number) => {
    changeModalConfirmacao()

    try {
      const erase = await OrcamentosServices.delete({ token, id })

      changeLoading(true, 'atualizando lista de orçamentos...')
      listOrcamentos({ token })

      if (erase.message) {
        Toast({ type: 'success', text: 'Orçamento deletado com sucesso.', duration: 5000 })
      }
    } catch (error) {
      Toast({ type: 'danger', text: 'Erro ao deletar orçamento.', duration: 5000 })
      console.error('Erro ao deletar orçamento:', error)
    } finally {
      changeLoading(false)
    }
  }

  const handleDeleteOrcamento = async (orcamento: {nome: string, id: number}) => {
    changeModalConfirmacao(
      <Confirmation confirmation={() => deleteOrcamento(orcamento.id)} message={`Você tem certeza que deseja deletar o orçamento ${orcamento.nome}`} />
    )
  }

  const createDoc = async (orcamento: any, type: string) => {
    if (type === 'excel') {
      try {
        ExportOrcamentoXLSX({orcamento})
      } catch (error) {
        console.error('Erro ao gerar o arquivo Excel:', error);
        return Toast({ type: 'danger', text: 'Erro ao gerar arquivo para excel.', duration: 5000 });
      }
    }

    if (type === 'pdf') {
      changeLoading(true, 'Gerando arquivo...')

      try {
        changeModal(<OrcamentoPdf orcamento={orcamento} />)
      } catch (error) {
        changeLoading(false)
        console.error("Erro ao gerar PDF:", error);
        Toast({ type: 'danger', text: 'Erro ao gerar PDF.', duration: 5000 });
      }
    }
  };

  return (
    <Table>
      <tbody>
        <Tr $index>
          <Td $index><b>Nome</b></Td>
          <Td $index><b>Data criação</b></Td>
          <Td $index><b>Modelo</b></Td>
          <Td $index><b>Obra</b></Td>
          <Td $index $large><b>Cliente</b></Td>
          <Td $index><b>Valor total</b></Td>
          <Td $index><b>Situação</b></Td>
          <Td $index $large><b>Ações</b></Td>
        </Tr>
        {orcamentos?.map((orcamento) => {
          const [obra] = obras.filter((item) => item.id === orcamento.obra)
          const [cliente] = clientes.filter((item) => item.id === orcamento.id_cliente)
          const [tipoOrcamento] = tipo.filter((item) => orcamento.modelo === item.tipo)
          const valorTotal = orcamentoValue(orcamento.item)

          return (
            <React.Fragment key={orcamento.id}>
              <Tr>
                <Td>{orcamento.nome}</Td>
                <Td>{dateFormat(orcamento.data_criacao)}</Td>
                <Td>{tipoOrcamento?.nome ?? 'Avulso'}</Td>
                <Td >{obra?.nome.length > 25 ? obra?.nome.slice(0, 25) + '...' : obra?.nome}</Td>
                <Td $large>{cliente?.nome.length > 20 ? cliente.nome.slice(0, 20) + '...' : cliente?.nome}</Td>
                <Td>{valorTotal}</Td>
                <Td>{checkStatus(orcamento.status, 'orçamento')}</Td>
                <Td $large>
                  <Edit onClick={() => handleOpenOrcamento(orcamento.id)}/>
                  <Copy onClick={() => handleDuplicateOrcamento(orcamento)}/>
                  <Pdf onClick={() => createDoc(orcamento, 'pdf')}/>
                  <Xlsx onClick={() => createDoc(orcamento, 'excel')}/>
                  <Delete onClick={() => handleDeleteOrcamento(orcamento)}/>
                </Td>
              </Tr>
            </React.Fragment>
          )
        })}
      </tbody>
    </Table>
  )
}

export default OrcamentosTable
