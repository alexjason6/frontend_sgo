export const numberFormat = (value: number | string) => {
  return Intl.NumberFormat('pt-BR').format(Number(value))
}
