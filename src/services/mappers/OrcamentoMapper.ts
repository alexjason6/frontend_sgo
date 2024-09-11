interface OrcamentoDomain {
  id?: number
  nome: string
  dataCriacao: string
  idCliente: number
  obra: number
  status: number
  item: number[] | any
  subitem: number | any
  modelo: number
}

interface ItemsDomain {
  nome: string
  dataCriacao: string
  status: number
  numero: number
  valorTotal: string
}

class OrcamentoMapper {
  toPersistence (domainOrcamento: OrcamentoDomain) {
    return {
      nome: domainOrcamento.nome,
      data_criacao: domainOrcamento.dataCriacao,
      id_cliente: domainOrcamento.idCliente,
      obra: domainOrcamento.obra,
      status: domainOrcamento.status,
      item: domainOrcamento.item,
      subitem: domainOrcamento.subitem,
      modelo: domainOrcamento.modelo
    }
  }

  itemToPersistence (domainItem: ItemsDomain) {
    return {
      nome: domainItem.nome,
      data_criacao: domainItem.dataCriacao,
      status: domainItem.status,
      numero: domainItem.numero,
      valor_total: domainItem.valorTotal
    }
  }

  toDomain (persistenceUser: OrcamentoDomain) {

  }
}

export default new OrcamentoMapper()
