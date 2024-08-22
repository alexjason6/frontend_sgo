interface UserDomain {
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
      nome: domainUser.nome,
      cpf: domainUser.cpf,
      telefone: domainUser.telefone,
      email: domainUser.email,
      status: domainUser.status,
      cep: domainUser.cep,
      logradouro: domainUser.logradouro,
      numero: domainUser.numero,
      complemento: domainUser.complemento,
      bairro: domainUser.bairro,
      cidade: domainUser.cidade,
      uf: domainUser.uf,
      password: domainUser.password,
      permissoes: domainUser.permissoes
    }
  }

  toDomain (persistenceUser: UserDomain) {
    return {
      nome: persistenceUser.nome,
      cpf: persistenceUser.cpf,
      telefone: persistenceUser.telefone,
      email: persistenceUser.email,
      status: persistenceUser.status,
      cep: persistenceUser.cep,
      logradouro: persistenceUser.logradouro,
      numero: persistenceUser.numero,
      complemento: persistenceUser.complemento,
      bairro: persistenceUser.bairro,
      cidade: persistenceUser.cidade,
      uf: persistenceUser.uf,
      password: persistenceUser.password,
      permissoes: persistenceUser.permissoes
    }
  }
}

export default new UserMapper()
