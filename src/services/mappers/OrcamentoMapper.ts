/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/member-delimiter-style */
interface OrcamentoDomain {
  id?: number;
  nome: string;
  dataCriacao: string;
  idCliente: number;
  obra: number;
  status: number;
  item: number[] | any;
  subitem: number | any;
  modelo: number;
}

interface ItemsDomain {
  nome: string;
  dataCriacao: string;
  status: number;
  numero: number;
  orcamento: number;
  valorTotal: string;
}

interface SubItemsDomain {
  nome: string;
  dataCriacao: string;
  status: number;
  numero: number;
  orcamento: number;
  valorTotal: string;
  valorUnitario: string;
  quantidade: number;
  etapa: number;
}

interface ModelosDomain {
  nome: string;
  dataCriacao: string;
  status: number;
  tipo: number;
}

class OrcamentoMapper {
  toPersistence(domainOrcamento: OrcamentoDomain) {
    return {
      id: domainOrcamento.id,
      nome: domainOrcamento.nome.toUpperCase(),
      data_criacao: domainOrcamento.dataCriacao,
      id_cliente: domainOrcamento.idCliente,
      obra: domainOrcamento.obra,
      status: domainOrcamento.status,
      item: domainOrcamento.item,
      subitem: domainOrcamento.subitem,
      modelo: domainOrcamento.modelo,
    };
  }

  itemToPersistence(domainItem: ItemsDomain) {
    return {
      nome: domainItem.nome.toUpperCase(),
      data_criacao: domainItem.dataCriacao,
      orcamento: domainItem.orcamento,
      status: domainItem.status,
      numero: domainItem.numero,
      valor_total: domainItem.valorTotal,
    };
  }

  subitemToPersistence(domainSubitem: SubItemsDomain) {
    return {
      nome: domainSubitem.nome.toUpperCase(),
      data_criacao: domainSubitem.dataCriacao,
      orcamento: domainSubitem.orcamento,
      status: domainSubitem.status,
      numero: domainSubitem.numero,
      valor_total: domainSubitem.valorTotal,
      valor_unitario: domainSubitem.valorUnitario,
      quantidade: domainSubitem.quantidade,
      etapa: domainSubitem.etapa,
    };
  }

  modeloToPersistence(domainModelos: ModelosDomain) {
    return {
      nome: domainModelos.nome.toUpperCase(),
      data_criacao: domainModelos.dataCriacao,
      status: domainModelos.status,
      tipo: domainModelos.tipo,
    };
  }

  toDomain(persistenceUser: OrcamentoDomain) {}
}

export default new OrcamentoMapper();
