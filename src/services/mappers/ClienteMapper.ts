interface ClienteDomain {
  id?: number
  nome: string
  razaoSocial: string
  cpfCnpj: string
  telefone: string
  email: string
  cep: string
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  uf: string
  inscricaoMunicipal?: string
  inscricaoEstadual?: string
  responsavel: string
  responsavelFinanceiro: string
  telefoneFinanceiro: string
  emailFinanceiro: string
  status: number
}

class ClienteMapper {
  toPersistence (domainCliente: ClienteDomain) {
    return {
      id: domainCliente.id,
      nome: domainCliente.nome,
      cpf_cnpj: domainCliente.cpfCnpj,
      razao_social: domainCliente.razaoSocial,
      inscricao_municipal: domainCliente.inscricaoMunicipal,
      inscricao_estadual: domainCliente.inscricaoEstadual,
      responsavel: domainCliente.responsavel,
      telefone: domainCliente.telefone,
      email: domainCliente.email,
      responsavel_financeiro: domainCliente.responsavelFinanceiro,
      telefone_financeiro: domainCliente.telefoneFinanceiro,
      email_financeiro: domainCliente.emailFinanceiro,
      status: domainCliente.status,
      cep: domainCliente.cep,
      logradouro: domainCliente.logradouro,
      numero: domainCliente.numero,
      complemento: domainCliente.complemento,
      bairro: domainCliente.bairro,
      cidade: domainCliente.cidade,
      uf: domainCliente.uf
    }
  }

  /* toDomain (persistenceCliente: ClienteDomain) {
    return {
      id: persistenceCliente.id,
      nome: persistenceCliente.nome,
      cpfCnpj: persistenceCliente.cpfCnpj,
      razao_social: persistenceCliente.razaoSocial,
      inscricaoMunicipal: persistenceCliente.inscricaoMunicipal,
      inscricaoEstadual: persistenceCliente.inscricaoEstadual,
      responsavel: persistenceCliente.responsavel,
      telefone: persistenceCliente.telefone,
      email: persistenceCliente.email,
      responsavelFinanceiro: persistenceCliente.responsavelFinanceiro,
      telefoneFinanceiro: persistenceCliente.telefoneFinanceiro,
      emailFinanceiro: persistenceCliente.emailFinanceiro,
      status: persistenceCliente.status,
      cep: persistenceCliente.cep,
      logradouro: persistenceCliente.logradouro,
      numero: persistenceCliente.numero,
      complemento: persistenceCliente.complemento,
      bairro: persistenceCliente.bairro,
      cidade: persistenceCliente.cidade,
      uf: persistenceCliente.uf
    }
  } */
}

export default new ClienteMapper()
