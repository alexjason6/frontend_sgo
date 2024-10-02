interface ObrarDomain {
  nome: string
  cno: string
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
      nome: domainUser.nome.toUpperCase(),
      cno: domainUser.cno.toUpperCase(),
      alvara: domainUser.alvara.toUpperCase(),
      engenheiro: domainUser.engenheiro.toUpperCase(),
      cep: domainUser.cep,
      logradouro: domainUser.logradouro.toUpperCase(),
      numero: domainUser.numero.toUpperCase(),
      complemento: domainUser.complemento.toUpperCase(),
      bairro: domainUser.bairro.toUpperCase(),
      cidade: domainUser.cidade.toUpperCase(),
      uf: domainUser.uf.toUpperCase(),
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
      cno: persistenceUser.cno,
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
