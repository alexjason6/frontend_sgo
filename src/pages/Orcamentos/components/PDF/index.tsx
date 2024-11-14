import React, {useContext, useEffect, useRef} from "react";
import generatePDF, { Margin } from 'react-to-pdf'

import LoadingContext from "../../../../contexts/loadingContext";
import ModalContext from "../../../../contexts/modalContext";
import ClientesContext from "../../../../contexts/clientesContext";

import Logo from  '../../../../assets/images/marca_sgo_preferencial.svg'
import LogoCliente from '../../../../assets/images/cliente.svg'

import dateFormat from "../../../../utils/dateFormat";
import { currencyFormat } from "../../../../utils/currencyFormat";
import { orcamentoValue } from "../../../../utils/calculateInfosObras";

import { Header, Subtitle, Title, Infos, Content, Item, Tr, Td } from "./styles";
import { Container } from "../../Edit/styles";

interface Orcamento {
  orcamento: any
}

const OrcamentoPdf: React.FC<Orcamento> = ({orcamento}) => {
  const ref = useRef<HTMLDivElement>(null)
  const {changeLoading} = useContext(LoadingContext)
  const {clientes} = useContext(ClientesContext)
  const {changeModal} = useContext(ModalContext)
  const cliente = clientes.find((item) => item.id === orcamento.id_cliente)

  const createPdf = async () => {
    await generatePDF(ref, {
      method: 'save',
      page: {
        format: 'A4',
        margin: Margin.MEDIUM,
        orientation: 'portrait'
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
        <Title>Orçamento de obra</Title>
        <Subtitle>{cliente?.nome} - {orcamento?.nome}</Subtitle>
        <Infos>Data orçamento: <span>{dateFormat(orcamento.data_criacao)}</span></Infos>
        <Infos>Valor total orçamento: <span>{orcamentoValue(orcamento.item)}</span></Infos>
      </Header>

      <Content>
        <Item>
          <tbody>
            <Tr $index>
              <Td $index>Item</Td>
              <Td $index $large>Nome</Td>
              <Td $index>Unidade</Td>
              <Td $index>Quantidade</Td>
              <Td $index>Valor unitário</Td>
              <Td $index>Valor total</Td>
            </Tr>
            {orcamento.item.sort((a: { numero: any; }, b: { numero: any; }) => Number(a.numero) > Number(b.numero) ? 1 : -1).map((item: any) => (
            <>
              <Tr>
                <Td className={String(item.numero)}>{item.numero}</Td>
                <Td $large>{item.nome}</Td>
                <Td $index></Td>
                <Td $index></Td>
                <Td $index></Td>
                <Td>{currencyFormat(item.valor_total)}</Td>
              </Tr>
            {orcamento.subitem.length >= 1 && (
              <>
                {orcamento.subitem?.sort((a: { numero: any; }, b: { numero: any; }) => {
                  try {
                    const parseNumber = (num: string) => num?.split('.')?.map((part: string) => parseInt(part, 10) || 0);

                    const numA = parseNumber(a.numero);
                    const numB = parseNumber(b.numero);

                    for (let i = 0; i < Math.max(numA.length, numB.length); i++) {
                      const partA = numA[i] || 0;
                      const partB = numB[i] || 0;

                      if (partA !== partB) {
                        return partA - partB; // Inverte a ordem para decrescente
                      }
                    }
                  } catch (error) {
                    console.error("Erro ao comparar números:", error);
                  }

                  return 0;
                }).map((subitem: any) => {
                  const etapaActive = document.getElementsByClassName(String(item.numero))[0]?.className as unknown as HTMLOptionElement | any
                  //const [subetapasActive] = orcamento.subitem.filter((item2: { etapa: any; }) => Number(etapaActive) === Number(item2.etapa))

                  return (Number(subitem.numero.split('.')[0]) === Number(item.numero)) ? (
                  <Tr $subitem>
                    <Td $subitem>{subitem.numero}</Td>
                    <Td $subitem $large>{subitem?.nome}</Td>
                    <Td $subitem>{subitem.unidade}</Td>
                    <Td $subitem>{String(subitem.quantidade).replace('.', ',')}</Td>
                    <Td $subitem>{currencyFormat(subitem.valor_unitario)}</Td>
                    <Td $subitem>{currencyFormat(subitem.valor_total)}</Td>
                  </Tr>
                ) : null })}
              </>
            )}
            </>
            ))}
          </tbody>
        </Item>
      </Content>
    </Container>
  )
}

export default OrcamentoPdf
