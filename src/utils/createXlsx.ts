import xlsx from "json-as-xlsx";
import { currencyFormat } from "./currencyFormat";

interface Props {
  orcamento: {
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
}
export const ExportOrcamentoXLSX = ({ orcamento }: Props) => {
  const content = orcamento.item.flatMap((item: any) => {
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

    const subitemsRows = orcamento.subitem
      .filter(
        (subitem: any) =>
          subitem.etapa === item.numero ||
          Number(subitem.etapa) === Number(item.numero)
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
    fileName: `orcamento - ${orcamento.nome}`,
    extraLength: 3,
    writeMode: "writeFile",
    writeOptions: {},
  };

  return xlsx(data, settings);
};
