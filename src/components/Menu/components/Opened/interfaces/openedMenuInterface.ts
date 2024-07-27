export interface TypesOpenedMenu {
  open: boolean
  itemActive: {
    name: string
  }
  handleSelectItem: (value: string) => void
  handleChangenMenu: () => void
}
