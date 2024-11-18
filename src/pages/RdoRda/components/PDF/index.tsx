import React, {useContext, useEffect, useRef} from "react";
import generatePDF, { Margin } from 'react-to-pdf'

import LoadingContext from "../../../../contexts/loadingContext";
import ModalContext from "../../../../contexts/modalContext";
import ClientesContext from "../../../../contexts/clientesContext";
import FornecedoresContext from "../../../../contexts/fornecedoresContext";
import OrcamentosContext from "../../../../contexts/orcamentosContext";
import ObrasContext from "../../../../contexts/obrasContext";

import Logo from  '../../../../assets/images/marca_sgo_preferencial.svg'
import LogoCliente from '../../../../assets/images/cliente.svg'

import dateFormat from "../../../../utils/dateFormat";
import { currencyFormat } from "../../../../utils/currencyFormat";
import { orcamentoValue } from "../../../../utils/calculateInfosObras";

import { Header, Subtitle, Title, Infos, Content, Item, Tr, Td, Container } from "./styles";

interface Lancamentos {
  lancamentos: any
}

const RdoRdaPdf: React.FC<Lancamentos> = ({lancamentos}) => {
  const ref = useRef<HTMLDivElement>(null)
  const {changeLoading} = useContext(LoadingContext)
  const {clientes} = useContext(ClientesContext)
  const {changeModal} = useContext(ModalContext)
  const {fornecedores} = useContext(FornecedoresContext)
  const {orcamentos} = useContext(OrcamentosContext)
  const {obras} = useContext(ObrasContext)

  const [cliente] = clientes.filter((item) => item.id === lancamentos[0].cliente)
  const [obra] = obras.filter((item) => item.id === lancamentos[0].obra)
  const [orcamento] = orcamentos.filter((item) => item.obra === obra.id)

  const createPdf = async () => {
    await generatePDF(ref, {
      method: 'save',
      page: {
        format: 'A4',
        margin: Margin.MEDIUM,
        orientation: 'landscape'
      }
    });

    changeLoading(false)
    changeModal(false)
  }

  useEffect(() => {
    if (ref.current) {
      createPdf()
    } else {
      return
    }
  }, [ref])

  return (
    <Container ref={ref}>
      <Header>
        <img src={Logo} style={{float: 'right', marginLeft: 20}} width={80} alt="SGO - Sistema de gerenciamento de obras"/>
        <img src={LogoCliente} style={{float: 'right'}} width={80} alt="Logo cliente"/>
        <Title>Lançamentos do RDO - {obra.nome}</Title>
        <Subtitle><Infos>Cliente: <span>{cliente.nome}</span></Infos></Subtitle>
        <Infos>Data orçamento: <span>{dateFormat(orcamento.data_criacao)}</span></Infos>
        <Infos>Valor total orçamento: <span>{orcamentoValue(orcamento.item)}</span></Infos>
      </Header>

      <Content>
        <Item>
          <tbody>
            <Tr $index>
              <Td $index>Data lançamento</Td>
              <Td $index>NF</Td>
              <Td $index>Emissão NF</Td>
              <Td $index $large>Descrição</Td>
              <Td $index $medium>Etapa</Td>
              <Td $index $medium>Serviço</Td>
              <Td $index $medium>Fornecedor</Td>
              <Td $index>Valor comprometido</Td>
              <Td $index>Data pagamento</Td>
              <Td $index>Valor</Td>
            </Tr>
            {lancamentos.length >= 1 && (
              <>
                {lancamentos.map((lancamento: any) => {
                  const [fornecedor] = fornecedores.filter((item) => item.id === lancamento.fornecedor)

                  return (
                  <Tr $subitem>
                    <Td $subitem>{dateFormat(lancamento.data_lancamento)}</Td>
                    <Td $subitem>{lancamento.nf}</Td>
                    <Td $subitem>{dateFormat(lancamento.data_nf)}</Td>
                    <Td $subitem $large>{lancamento.descricao}</Td>
                    <Td $subitem $medium>{orcamento.item.find((item) => item.id === Number(lancamento.etapa))?.nome}</Td>
                    <Td $subitem $medium>{orcamento.subitem.find((item) => item.id === Number(lancamento.subetapa))?.nome}</Td>
                    <Td $subitem $medium>{fornecedor.nome}</Td>
                    <Td $subitem>{lancamento.valor_comprometido ? currencyFormat(lancamento.valor_comprometido) : '-' }</Td>
                    <Td $subitem>{dateFormat(lancamento.data_pagamento)}</Td>
                    <Td $subitem>{currencyFormat(lancamento.valor_pagamento)}</Td>
                  </Tr>
                )})}
              </>
            )}
          </tbody>
        </Item>
      </Content>
    </Container>
  )
}

export default RdoRdaPdf
