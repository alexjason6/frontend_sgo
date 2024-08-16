export const numberFormat = (value: number) => {
  return Intl.NumberFormat('pt-BR').format(value)
}
