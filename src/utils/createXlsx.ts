import xlsx from "json-as-xlsx";
import { currencyFormat } from "./currencyFormat";
import dateFormat from "./dateFormat";
import {
  Etapa,
  Obra,
  Orcamento,
  Subetapa,
} from "../interfaces/globalInterfaces";

interface Props {
  orcamento?: {
    nome: string;
    obra: string;
    item: {
      id: number;
      nome: string;
      numero: string | number;
      valor_total: string;
    }[];
    subitem: {
      id: number;
      nome: string;
      etapa: number | string;
      numero: string | number;
      unidade: string;
      quantidade: string;
      valor_total: string;
      valor_unitario: string;
    }[];
    servico: string;
    valor_total: string;
  };
  lancamentos?: {
    agencia: string;
    banco: string;
    boletos: string[];
    cliente: number;
    comprovante: string;
    conta: string;
    data_alteracao: string;
    data_lancamento: string;
    data_nf: string;
    data_pagamento: string;
    descricao: string;
    etapa: string;
    fornecedor: number;
    id: number;
    nf: string;
    nf_doc: string;
    obra: number;
    observacao: string;
    parcela: string;
    pix: string;
    rdo: number;
    situacao: number;
    status: number;
    subetapa: string;
    tipo_conta: number;
    usuario: number;
    valor_comprometido: string;
    valor_pagamento: string;
  }[];
  obras?: Obra[];
  orcamentos?: Orcamento[];
  cliente?: string;
  etapas?: Etapa[];
  subetapas?: Subetapa[];
}

export const ExportOrcamentoXLSX = ({ orcamento }: Props) => {
  const content = orcamento!.item.flatMap((item: any) => {
    const valor = currencyFormat(item.valor_total);
    // Adiciona o item pai
    const itemRow = {
      item: item.numero,
      servico: item.nome,
      unidade: "", // Deixe em branco, pois o item pai não possui unidade
      quantidade: "", // Deixe em branco, pois o item pai não possui quantidade
      valor_unitario: "", // Deixe em branco, pois o item pai não possui valor unitário
      valor_total: valor, // Deixe em branco, pois o item pai não possui valor total
    };

    const subitemsRows = orcamento!.subitem
      .filter(
        (subitem: any) =>
          Number(subitem.numero.split(".")[0]) === Number(item.numero)
      ) // Use a chave que associa subitem ao item pai
      .map((subitem: any) => {
        const valorUnitario = currencyFormat(subitem.valor_unitario);
        const somaTotal =
          Number(subitem.valor_unitario) * Number(subitem.quantidade);
        const valorTotal = Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(somaTotal);

        return {
          item: subitem.numero,
          servico: subitem.nome,
          unidade: subitem.unidade,
          quantidade: subitem.quantidade,
          valor_unitario: valorUnitario,
          valor_total: valorTotal,
        };
      });

    return [itemRow, ...subitemsRows];
  });

  const data = [
    {
      sheet: "Orçamento",
      columns: [
        { label: "Item", value: "item" },
        { label: "Serviços", value: "servico" },
        { label: "Unidade", value: "unidade" },
        { label: "Quantidade", value: "quantidade" },
        { label: "Valor unitário", value: "valor_unitario" },
        { label: "Valor total", value: "valor_total" },
      ],
      content: content,
    },
  ];

  const settings = {
    fileName: `orcamento - ${orcamento!.nome}`,
    extraLength: 3,
    writeMode: "writeFile",
    writeOptions: {},
  };

  return xlsx(data, settings);
};

export const ExportLancamentosXLSX = ({
  lancamentos,
  orcamentos,
  obras,
  cliente,
  etapas,
  subetapas,
}: Props) => {
  const [obra] = obras?.filter((item) => item?.id === lancamentos![0]?.obra)!;
  const content = lancamentos!.map((lancamento: any) => {
    const etapa = etapas?.filter(
      (item) => Number(item.id) === Number(lancamento.etapa)
    );
    const subetapa = subetapas?.filter(
      (item) => Number(item.id) === Number(lancamento?.subetapa)
    );

    return {
      dataLancamento: dateFormat(lancamento.data_lancamento),
      nfNumber: lancamento.nf,
      nfDate: dateFormat(lancamento.data_nf),
      descricao: lancamento.descricao,
      valorComprometido: currencyFormat(lancamento.valor_comprometido),
      servicos: etapa![0]?.nome,
      item: subetapa![0]?.nome || lancamento.descricao,
      contrato: lancamento.valor_comprometido && lancamento.observacao,
      dataPagamento: dateFormat(lancamento.data_pagamento),
      valorPagamento: currencyFormat(lancamento.valor_pagamento),
    };
  });

  const data = [
    {
      sheet: `Rdo - ${cliente}`,
      columns: [
        { value: "dataLancamento", label: "DATA DE LANÇAMENTO" },
        { value: "nfNumber", label: "Nº DA NOTA FISCAL" },
        { value: "nfDate", label: "DATA DA EMISSÃO" },
        { value: "descricao", label: "DESCRIÇÃO" },
        { value: "valorComprometido", label: "VALOR COMPROMETIDO" },
        { value: "servicos", label: "SERVIÇO" },
        { value: "item", label: "ITEM" },
        { value: "contrato", label: "CONTRATO" },
        { value: "dataPagamento", label: "DATA PAGAMENTO" },
        { value: "valorPagamento", label: "VALOR PAGAMENTO" },
      ],
      content: content,
    },
  ];

  const settings = {
    fileName: `lançamentos RDO obra ${obra?.nome}`,
    extraLength: 3,
    writeMode: "writeFile",
    writeOptions: {},
  };

  return xlsx(data, settings);
};
