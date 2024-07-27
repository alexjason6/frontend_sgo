import { type Vehicles } from './vehiclesInterfaces'

export interface User {
  cpf_cnpj: string
  nome: string
  email: string
  tel: string
  cep: string
  logradouro: string
  numero: string
  complemento: string | null
  bairro: string
  cidade: string
  uf: string
  permissoes: string[]
  data_cadastro: string
  equipamentos: [
    {
      id: number
      imei: string
    },
  ]
  veiculos: Vehicles[]
  status: number
  id_cliente: number
}
