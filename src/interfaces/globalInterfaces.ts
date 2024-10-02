/* eslint-disable @typescript-eslint/ban-types */
import { type ReactNode } from 'react'

export interface ContextData {
  id?: number
  token: string
}

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
  cliente?: any
  subHeader?: boolean
  goBack?: boolean
  modal?: boolean
  fullwidth?: boolean
}

export interface TypesInputs {
  children: ReactNode
  $error?: string
  oneOftree?: boolean
  oneOfFour?: boolean
  oneOfFive?: boolean
  square?: boolean
  passwordChange?: boolean
}

export interface TypesItemActive {
  name: string
}

export interface User {
  id: number
  cpf: string
  nome: string
  email: string
  telefone: string
  cep: string
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  uf: string
  permissoes: string[]
  data_cadastro: string
  data_alteracao?: string
  status: any
  push?: string
  password: string

}

export interface Obra {
  id: number
  alvara: string
  nome: string
  cno: string
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

export interface TypeBoxInfos {
  color?: string
  info?: string | number
  legend?: string
  status?: string
  opacityColor?: number
  percent?: string
  accent?: string
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

export interface Cliente {
  id?: number
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

export interface Users {
  id: number
  cpf: string
  nome: string
  email: string
  telefone: string
  cep: string
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  uf: string
  permissoes: string[]
  data_cadastro: string
  data_alteracao?: string
  status: number
  push?: string
}

export interface ItemOrcamento {
  id: number
  nome: string
  numero: number
  valor_total: string
}

export interface SubitemOrcamento {
  etapa: number
  id: number
  nome: string
  numero: number
  quantidade: string
  valor_total: string
  valor_unitario: string
}

export interface Orcamento {
  id: number
  nome: string
  data_criacao: string
  data_alteracao: string | null
  status: any
  modelo: number
  id_cliente: number
  obra: number
  item: ItemOrcamento[]
  subitem: SubitemOrcamento[]
}

export interface Etapa {
  id: number
  data_criacao?: string
  data_alteracao?: string | null
  numero: number
  nome: string
  valor_total: string
  status?: number
  orcamento?: number
  subetapas?: Array<{}>
}

export interface Subetapa {
  id: number
  numero: number
  etapa: number
  nome: string
  status: number
  orcamento: number
}

export interface TiposOrcamentos {
  id: number
  tipo: number
  nome: string
  data_criacao: string
  data_alteracao: string
  status: number
}

export interface TypeHeaderResumoObra {
  obra: Obra
  detalhamento?: boolean
  cliente: Cliente
}

export interface LancamentoRdoRda {
  id: number
  rdo: number
  data_lancamento: string
  data_alteracao: string
  data_nf: string
  descricao: string
  etapa: string
  subetapa: string
  valor_comprometido: string | null
  fornecedor: number
  data_pagamento: string
  valor_pagamento: string
  usuario: number
  comprovante: null
  observacao: string
  parcela: string
  obra: number
  situacao: number
  banco: string
  agencia: string
  conta: string
  tipo_conta: number
  boletos: string[]
  status: number
  pix: string
  nf: number
}

export interface Fornecedores {
  id: number
  cpf_cnpj: string
  nome: string
  razao_social: string
  email: string
  telefone: string
  cep: string
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  uf: string
  responsavel: string
  responsavel_financeiro: string
  telefone_financeiro: string
  email_financeiro: string
  data_cadastro: string
  data_alteracao: string | null
  ultimo_login: string | null
  status: any
  banco: string
  agencia: string
  conta: string
  tipo_conta: string
  pix: string
}

export interface TypeNewLancamento {
  tipo?: string
  rdoRda?: string
  nameCliente?: string
  obraId?: number
  cliente_id?: number
}
