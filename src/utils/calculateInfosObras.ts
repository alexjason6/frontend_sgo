import { type LancamentoRdoRda, type Etapa, type Obra } from '../interfaces/globalInterfaces'

export const executadoValue = (lancamentos: LancamentoRdoRda[], type?: string) => {
  const executado = lancamentos.reduce<number>((accumulator, item) => {
    return accumulator + Number(item.valor_pagamento)
  }, 0)

  if (type === 'pure') {
    return executado
  }

  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(executado)
}

export const comprometidoValue = (lancamentos: LancamentoRdoRda[], type?: string) => {
  const comprometido = lancamentos.reduce<number>((accumulator, item) => {
    return accumulator + Number(item.valor_comprometido)
  }, 0)

  if (type === 'pure') {
    return comprometido
  }

  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(comprometido)
}

export const orcamentoValue = (itens: Etapa[], type?: string) => {
  const orcamento = itens.reduce<number>((accumulator, item) => {
    return accumulator + Number(item.valor_total)
  }, 0)

  if (type === 'pure') {
    return orcamento
  }

  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(orcamento)
}

export const m2ValueTotalOrcamento = (itens: Etapa[], obras: Obra[], obra: Obra) => {
  const totalOrcamento = itens.reduce<number>((accumulator, item) => {
    return accumulator + Number(item.valor_total)
  }, 0)

  const [metragem] = obras.filter((item) => item.id === obra.id)

  if (!metragem.metragem) {
    return
  }

  const m2Value = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(totalOrcamento / metragem.metragem!)

  return m2Value
}

export const saldoValue = (itens: Etapa[], lancamentos: LancamentoRdoRda[]) => {
  const orcamento = itens.reduce<number>((accumulator, item) => {
    return accumulator + Number(item.valor_total)
  }, 0)

  const executado = lancamentos.reduce<number>((accumulator, item) => {
    return accumulator + Number(item.valor_pagamento)
  }, 0)

  const comprometido = lancamentos.reduce<number>((accumulator, item) => {
    return accumulator + Number(item.valor_comprometido)
  }, 0)

  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(orcamento - (comprometido + executado))
}

export const percentValue = (value: string) => {
  return Number(value
    ?.replace(/\D/g, ''))
}

export const calculaPerCentValue = (value1: any, value2: any) => {
  if (typeof (value1) === 'string' && typeof (value2) === 'string') {
    const calcula = ((percentValue(value1) / percentValue(value2)) * 100).toFixed(2)
    const trataValue = Intl.NumberFormat('pt-BR').format(Number(calcula))

    return `${trataValue}%`
  } else if (typeof (value1) === 'string' && typeof (value2) === 'number') {
    const calcula = ((percentValue(value1) / value2) * 100).toFixed(2)
    const trataValue = Intl.NumberFormat('pt-BR').format(Number(calcula))

    return `${trataValue}%`
  } else if (typeof (value1) === 'number' && typeof (value2) === 'string') {
    const calcula = ((value1 / percentValue(value2)) * 100).toFixed(2)
    const trataValue = Intl.NumberFormat('pt-BR').format(Number(calcula))

    return `${trataValue}%`
  } else {
    const calcula = ((value1 / value2) * 100).toFixed(2)
    const trataValue = Intl.NumberFormat('pt-BR').format(Number(calcula))

    return `${trataValue}%`
  }
}
