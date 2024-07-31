export interface Vehicles {
  id: number
  placa: string
  chassi: string
  renavam: string
  montadora: string
  modelo: string
  ano: number
  valor_fipe: string
  tipo: string
  data_cadastro: string
  data_alteracao: string | null
  cor: string
  status: number
  id_cliente: number
  id_rastreador: string
  users: number[]
  bloqueado: boolean
  prev_bloqueado: boolean
}
