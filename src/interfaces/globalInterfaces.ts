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
  colorLine?: string
}

export interface TypesInputs {
  children: ReactNode
  error?: string
  oneOftree?: boolean
  oneOfFour?: boolean
  oneOfFive?: boolean
  passwordChange?: boolean
}

export interface TypesItemActive {
  name: string
}

export interface TypeCardObras {
  id?: number
  idCliente?: number
  nome?: string
}

export interface Obra {
  id: number;
  alvara: string;
  nome: string;
  cnd: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  engenheiro: string;
  data_cadastro: string;
  data_alteracao: string;
  data_inicio: string;
  previsao_entrega: string;
  data_entrega?: string | null;
  status: number;
  tipo: number;
  id_cliente: number;
}
