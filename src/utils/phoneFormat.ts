export default function phoneFormat (phoneNumber: string) {
  if (phoneNumber.length < 12) {
    return phoneNumber
      ?.replace(/\D/g, '')
      ?.replace(/^(\d{2})\B/, '($1) ')
      ?.replace(/(\d{1})?(\d{4})(\d{4})/, '$1$2-$3')
  }

  return phoneNumber
    ?.replace(/\D/g, '')
    ?.replace(/^(\d{2})?(\d{2})?/, '+$1 ($2)')
    ?.replace(/(\d)(\d{4})(\d{4})$/, ' $1$2-$3') // Formata o prefixo, os quatro dígitos seguintes e os últimos quatro dígitos
}