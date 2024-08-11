export default function checkStatus (status: number, type?: string) {
  switch (status) {
    case 1:
      return type === 'orçamento' ? 'Aprovado' : 'Ativo'
    case 2:
      return type === 'orçamento' ? 'Reprovado' : 'Inativo'
    case 3:
      return type === 'orçamento' ? 'Cancelado' : 'Cancelado'
  }
}
