interface ObrarDomain {
  nome: string
  cnd: string
  alvara: string
  engenheiro: string
  cep: string
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  uf: string
  idCliente: number
  dataInicio: string
  previsaoEntrega: string
  dataEntrega: string
  tipo: number
  status: number
}

class UserMapper {
  toPersistence (domainUser: ObrarDomain) {
    return {
      nome: domainUser.nome,
      cnd: domainUser.cnd,
      alvara: domainUser.alvara,
      engenheiro: domainUser.engenheiro,
      cep: domainUser.cep,
      logradouro: domainUser.logradouro,
      numero: domainUser.numero,
      complemento: domainUser.complemento,
      bairro: domainUser.bairro,
      cidade: domainUser.cidade,
      uf: domainUser.uf,
      id_cliente: domainUser.idCliente,
      data_inicio: domainUser.dataInicio,
      previsao_entrega: domainUser.previsaoEntrega,
      data_entrega: domainUser.dataEntrega,
      tipo: domainUser.tipo,
      status: domainUser.status
    }
  }

/*   toDomain (persistenceUser: ObrarDomain) {
    return {
      nome: persistenceUser.nome,
      cnd: persistenceUser.cnd,
      alvara: persistenceUser.alvara,
      engenheiro: persistenceUser.engenheiro,
      cep: persistenceUser.cep,
      logradouro: persistenceUser.logradouro,
      numero: persistenceUser.numero,
      complemento: persistenceUser.complemento,
      bairro: persistenceUser.bairro,
      cidade: persistenceUser.cidade,
      uf: persistenceUser.uf,
      idCliente: persistenceUser.id_cliente,
      dataInicio: persistenceUser.data_inicio,
      previsaoEntrega: persistenceUser.previsao_entrega,
      dataEntrega: persistenceUser.data_entrega,
      tipo: persistenceUser.tipo,
      status: persistenceUser.status
    }
  } */
}

export default new UserMapper()
