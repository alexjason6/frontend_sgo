interface OrcamentoDomain {
  nome: string
  dataCriacao: string
  idCliente: number
  obra: number
  status: number
}

class OrcamentoMapper {
  toPersistence (domainOrcamento: OrcamentoDomain) {
    return {
      nome: domainOrcamento.nome,
      data_criacao: domainOrcamento.dataCriacao,
      id_cliente: domainOrcamento.idCliente,
      obra: domainOrcamento.obra,
      status: domainOrcamento.status
    }
  }

  toDomain (persistenceUser: OrcamentoDomain) {

  }
}

export default new OrcamentoMapper()
