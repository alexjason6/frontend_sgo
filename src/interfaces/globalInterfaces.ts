import { type ReactNode } from 'react'

export interface TypeErrors {
  field: string
  message: string
}

export interface TypesOpenedMenu {
  open: boolean
  itemActive: {
    name: string
  }
  handleChangeMenu: () => void
}

export interface TypeHeader {
  title: string
  subHeader?: boolean
  goBack?: boolean
  modal?: boolean
}

export interface TypesInputs {
  children: ReactNode
  $error?: string
  oneOftree?: boolean
  oneOfFour?: boolean
  oneOfFive?: boolean
  passwordChange?: boolean
}

export interface TypesItemActive {
  name: string
}

export interface Obra {
  id: number
  alvara: string
  nome: string
  cnd: string
  cep: string
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  uf: string
  engenheiro: string
  data_cadastro: string
  data_alteracao: string
  data_inicio: string
  previsao_entrega: string
  data_entrega?: string | null
  status: number
  tipo: number
  metragem?: number
  id_cliente: number
}

export interface TypeCardItem {
  item?: Obra | RdoRda
  type: string
  cliente?: string
  nome?: string
  id?: number
}

export interface RdoRda {
  id: number
  data_criacao: string
  data_alteracao: string
  orcamento: number
  obra: number
  id_cliente: number
  status: number
}

export interface Clientes {
  id: number
  nome: string
  razao_social: string
  cpf_cnpj: string
  telefone: string
  email: string
  cep: string
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  uf: string
  inscricao_municipal?: string
  inscricao_estadual?: string
  responsavel: string
  responsavel_financeiro: string
  telefone_financeiro: string
  email_financeiro: string
  status: number
}
