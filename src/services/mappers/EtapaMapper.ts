interface EtapasDomain {
  id?: number
  nome: string
  dataCriacao: string
  status: number
  numero: number
}

class EtapasMapper {
  toPersistence (domainEtapa: EtapasDomain) {
    return {
      nome: domainEtapa.nome.toUpperCase(),
      data_criacao: domainEtapa.dataCriacao,
      status: domainEtapa.status,
      numero: domainEtapa.numero
    }
  }
}

export default new EtapasMapper()
