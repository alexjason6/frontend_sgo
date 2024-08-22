export default function phoneFormat (phoneNumber: string) {
  return phoneNumber
    ?.replace(/\D/g, '')
    ?.replace(/^(\d{2})?/, '($1) ')
    ?.replace(/(\d{1})?(\d{4})(\d{4})/, '$1$2-$3') // Formata o prefixo, os quatro dígitos seguintes e os últimos quatro dígitos
}
