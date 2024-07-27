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
