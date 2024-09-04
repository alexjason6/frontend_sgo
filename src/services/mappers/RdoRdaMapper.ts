interface lancamentoDomain {
  rdo: number
  dataLancamento: string
  nf?: number
  dataNf: string
  valorComprometido?: string
  valorPagamento?: string
  dataPagamento: string
  usuario?: number
  observacao: string
  parcela: string
  obra: number
  situacao: number
  banco: string
  agencia: string
  conta: string
  tipo_conta: string
  pix: string
}

class RdoRdaMapper {
  toPersistence (domainCliente: lancamentoDomain) {
    return {
      rdo: domainCliente.rdo,
      data_lancamento: domainCliente.dataLancamento,
      nf: domainCliente.nf,
      data_nf: domainCliente.dataNf,
      valor_comprometido: domainCliente.valorComprometido,
      valor_pagamento: domainCliente.valorPagamento,
      data_pagamento: domainCliente.dataPagamento,
      usuario: domainCliente.usuario,
      observacao: domainCliente.observacao,
      parcela: domainCliente.parcela,
      obra: domainCliente.obra,
      situacao: domainCliente.situacao,
      banco: domainCliente.banco,
      agencia: domainCliente.agencia,
      conta: domainCliente.conta,
      tipo_conta: domainCliente.tipo_conta,
      pix: domainCliente.pix
    }
  }

  toDomain (persistenceCliente: lancamentoDomain) {
    return {

    }
  }
}

export default new RdoRdaMapper()
