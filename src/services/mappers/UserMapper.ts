interface UserDomain {
  id?: number
  nome: string
  cpf: string
  telefone: string
  email: string
  cep: string
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  uf: string
  status: number
  permissoes: string[]
  password?: string
}

class UserMapper {
  toPersistence (domainUser: UserDomain) {
    return {
      id: domainUser.id ?? 0,
      nome: domainUser.nome.toUpperCase(),
      cpf: domainUser.cpf,
      telefone: domainUser.telefone,
      email: domainUser.email.toLowerCase(),
      status: domainUser.status,
      cep: domainUser.cep,
      logradouro: domainUser.logradouro.toUpperCase(),
      numero: domainUser.numero.toUpperCase(),
      complemento: domainUser.complemento?.toUpperCase(),
      bairro: domainUser.bairro.toUpperCase(),
      cidade: domainUser.cidade.toUpperCase(),
      uf: domainUser.uf.toUpperCase(),
      password: domainUser.password,
      permissoes: domainUser.permissoes
    }
  }

  toDomain (persistenceUser: UserDomain) {
    return {
      id: persistenceUser.id,
      nome: persistenceUser.nome.toUpperCase(),
      cpf: persistenceUser.cpf,
      telefone: persistenceUser.telefone,
      email: persistenceUser.email.toLowerCase(),
      status: persistenceUser.status,
      cep: persistenceUser.cep,
      logradouro: persistenceUser.logradouro.toUpperCase(),
      numero: persistenceUser.numero.toUpperCase(),
      complemento: persistenceUser.complemento?.toUpperCase(),
      bairro: persistenceUser.bairro.toUpperCase(),
      cidade: persistenceUser.cidade.toUpperCase(),
      uf: persistenceUser.uf.toUpperCase(),
      password: persistenceUser.password,
      permissoes: persistenceUser.permissoes
    }
  }
}

export default new UserMapper()
