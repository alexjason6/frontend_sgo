interface OrcamentoDomain {
  nome: string
  dataCriacao: string
  idCliente: number
  obra: number
  status: number
  etapas: Array<{
    id?: number
    nome: string
    valorTotal: string
    subetapas: Array<{
      id?: number
      nome: string
      unidade: string
      quantidade: number
      valor: number
      valorTotal: string
    }>
  }>
}

class OrcamentoMapper {
  toPersistence (domainOrcamento: OrcamentoDomain) {
    return {
      nome: domainOrcamento.nome,
      data_criacao: domainOrcamento.dataCriacao,
      id_cliente: domainOrcamento.idCliente,
      obra: domainOrcamento.obra,
      status: domainOrcamento.status,
      etapas: domainOrcamento.etapas
    }
  }

  toDomain (persistenceUser: OrcamentoDomain) {

  }
}

export default new OrcamentoMapper()
