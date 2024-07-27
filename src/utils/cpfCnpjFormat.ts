export default function cpfCnpjFormat (cpfCnpj: string) {
  const data = cpfCnpj

  if (data?.length > 13) {
    return data
      ?.replace(/\D/g, '')
      ?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }

  return data
    ?.replace(/\D/g, '')
    ?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}
