export default function cepFormat (cep: string) {
  return cep
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d{3})(\d{3})/, '$1$2-$3')
}
