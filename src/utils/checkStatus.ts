export default function checkStatus (status: number) {
  if (status === 1) {
    return 'Ativo'
  } if (status === 2) {
    return 'Inativo'
  }
  return 'Inadimplente'
}
