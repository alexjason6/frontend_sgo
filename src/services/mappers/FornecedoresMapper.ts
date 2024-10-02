interface FornecedoresDomain {
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
  banco: string
  agencia: string
  conta: string
  tipoConta: string
  pix: string
}

class FornecedoresMapper {
  toPersistence (domainCliente: FornecedoresDomain) {
    return {
      nome: domainCliente.nome.toUpperCase(),
      cpf_cnpj: domainCliente.cpfCnpj.toUpperCase(),
      razao_social: domainCliente.razaoSocial.toUpperCase(),
      inscricao_municipal: domainCliente.inscricaoMunicipal,
      inscricao_estadual: domainCliente.inscricaoEstadual,
      responsavel: domainCliente.responsavel.toUpperCase(),
      telefone: domainCliente.telefone,
      email: domainCliente.email.toLowerCase(),
      responsavel_financeiro: domainCliente.responsavelFinanceiro.toUpperCase(),
      telefone_financeiro: domainCliente.telefoneFinanceiro,
      email_financeiro: domainCliente.emailFinanceiro.toLowerCase(),
      status: domainCliente.status,
      cep: domainCliente.cep,
      logradouro: domainCliente.logradouro.toUpperCase(),
      numero: domainCliente.numero.toUpperCase(),
      complemento: domainCliente?.complemento?.toUpperCase(),
      bairro: domainCliente.bairro.toUpperCase(),
      cidade: domainCliente.cidade.toUpperCase(),
      uf: domainCliente.uf.toUpperCase(),
      banco: domainCliente.banco.toUpperCase(),
      agencia: domainCliente.agencia,
      conta: domainCliente.conta,
      tipo_conta: domainCliente.tipoConta,
      pix: domainCliente.pix.toUpperCase()
    }
  }

  toDomain (persistenceCliente: FornecedoresDomain) {
    return {
      nome: persistenceCliente.nome.toUpperCase(),
      cpfCnpj: persistenceCliente.cpfCnpj,
      razao_social: persistenceCliente.razaoSocial.toUpperCase(),
      inscricaoMunicipal: persistenceCliente.inscricaoMunicipal,
      inscricaoEstadual: persistenceCliente.inscricaoEstadual,
      responsavel: persistenceCliente.responsavel.toUpperCase(),
      telefone: persistenceCliente.telefone,
      email: persistenceCliente.email.toLowerCase(),
      responsavelFinanceiro: persistenceCliente.responsavelFinanceiro.toUpperCase(),
      telefoneFinanceiro: persistenceCliente.telefoneFinanceiro,
      emailFinanceiro: persistenceCliente.emailFinanceiro.toLowerCase(),
      status: persistenceCliente.status,
      cep: persistenceCliente.cep,
      logradouro: persistenceCliente.logradouro.toUpperCase(),
      numero: persistenceCliente.numero.toUpperCase(),
      complemento: persistenceCliente.complemento?.toUpperCase(),
      bairro: persistenceCliente.bairro.toUpperCase(),
      cidade: persistenceCliente.cidade.toUpperCase(),
      uf: persistenceCliente.uf.toUpperCase()
    }
  }
}

export default new FornecedoresMapper()
