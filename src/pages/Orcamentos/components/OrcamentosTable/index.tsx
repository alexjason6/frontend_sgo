import React, { useContext, useState, useRef,  } from 'react'
import { useNavigate } from 'react-router-dom'

import generatePDF, { Margin } from 'react-to-pdf'

import checkStatus from '../../../../utils/checkStatus'
import dateFormat from '../../../../utils/dateFormat'
import { orcamentoValue } from '../../../../utils/calculateInfosObras'

import { Table, Tr, Td, Edit, Copy, Pdf, Delete } from './styles'

import { type Orcamento, type TiposOrcamentos, type Cliente, type Obra } from '../../../../interfaces/globalInterfaces'
import LoadingContext from '../../../../contexts/loadingContext'
import AuthContext from '../../../../contexts/authContext'
import OrcamentosServices from '../../../../services/sgo/OrcamentosServices'
import Toast from '../../../../utils/toast'
import moment from 'moment'
import OrcamentosContext from '../../../../contexts/orcamentosContext'
import OrcamentoPdf from '../PDF'

interface ItemTableProps {
  orcamentos: Orcamento[]
  tipo: TiposOrcamentos[]
  clientes: Cliente[]
  obras: Obra[]
}

const OrcamentosTable: React.FC<ItemTableProps> = ({ orcamentos, tipo, clientes, obras }) => {
  const navigate = useNavigate()
  const {changeLoading} = useContext(LoadingContext)
  const { token } = useContext(AuthContext)
  const {listOrcamentos} = useContext(OrcamentosContext)
  const [orcamentoPdf, setOrcamentoPdf] = useState<any>()
  const targetRef = useRef<HTMLDivElement>(null)

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
      const create = await OrcamentosServices.create({ token, mapperOrcamento: orcamentoData })

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

  const handleDeleteOrcamento = async (id: number) => {
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

  const createPdf = async () => {
    if (!targetRef.current) {
      console.error("targetRef is null. Cannot generate PDF.");
      return;
    }

    try {
      // Chama a função para gerar o PDF
      await generatePDF(targetRef, {
        method: 'open',
        page: {
          margin: Margin.SMALL,
          format: 'A4',
          orientation: 'portrait'
        }
      });

      // PDF gerado com sucesso, limpa o estado
      setOrcamentoPdf(null);
      Toast({ type: 'success', text: 'PDF gerado com sucesso.', duration: 5000 });
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      Toast({ type: 'danger', text: 'Erro ao gerar PDF.', duration: 5000 });
    }
  };

  {console.log(orcamentoPdf)}

  return (
    <>
      <Table>
        <tbody>
          <Tr $index>
            <Td $index><b>Nome</b></Td>
            <Td $index><b>Data criação</b></Td>
            <Td $index><b>Modelo</b></Td>
            <Td $index><b>Obra</b></Td>
            <Td $index><b>Cliente</b></Td>
            <Td $index><b>Valor total</b></Td>
            <Td $index><b>Situação</b></Td>
            <Td $index><b>Ações</b></Td>
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
                  <Td>{obra?.nome.length > 25 ? obra?.nome.slice(0, 25) + '...' : obra?.nome}</Td>
                  <Td>{cliente?.nome.length > 20 ? cliente.nome.slice(0, 20) + '...' : cliente?.nome}</Td>
                  <Td>{valorTotal}</Td>
                  <Td>{checkStatus(orcamento.status, 'orçamento')}</Td>
                  <Td>
                    <Edit onClick={() => handleOpenOrcamento(orcamento.id)}/>
                    <Copy onClick={() => handleDuplicateOrcamento(orcamento)}/>
                    <Pdf onClick={() => {setOrcamentoPdf(orcamento); createPdf()}}/>
                    <Delete onClick={() => handleDeleteOrcamento(orcamento.id)}/>
                  </Td>
                </Tr>
              </React.Fragment>
            )
          })}
        </tbody>
      </Table>
      {orcamentoPdf && (
        <div ref={targetRef}>
          <OrcamentoPdf orcamento={orcamentoPdf} />
        </div>
      )}
    </>
  )
}

export default OrcamentosTable
