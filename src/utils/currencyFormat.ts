export const currencyFormat = (value: string | number) => {
  let dataValue = 0 || ''

  const options = { minimumFractionDigits: 2 }

  if (typeof (value) === 'string') {
    dataValue = value.replace('.', '').replace(',', '').replace(/\D/g, '')

    if (dataValue === '0' || value === '') {
      return 'R$ 0.00'
    }

    const result = new Intl.NumberFormat('pt-BR', options).format(
      Number(dataValue) / 100
    )

    return 'R$ ' + result
  }

  const result = new Intl.NumberFormat('pt-BR', options).format(
    Number(value) / 100
  )

  return 'R$ ' + result

/*   const trataValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(value))

  return trataValue */
}
