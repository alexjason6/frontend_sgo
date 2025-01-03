import React, { createContext, useState, type ReactNode } from 'react'

import Modal from '../components/Modal'

interface ModalContextType {
  isOpen: boolean
  isOpenConfirmacao: boolean
  changeModal: (element?: ReactNode) => void
  changeModalConfirmacao: (element?: ReactNode) => void
}

interface ModalProviderProps {
  children: ReactNode
}

const initialContextValue: ModalContextType = {
  isOpen: false,
  isOpenConfirmacao: false,
  changeModal: () => {},
  changeModalConfirmacao: () => {}
}

const ModalContext = createContext<ModalContextType>(initialContextValue)

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenConfirmacao, setIsOpenConfirmacao] = useState<boolean>(false)
  const [component, setComponent] = useState<ReactNode>()

  const changeModal = (element?: ReactNode) => {
    if (element) {
      setComponent(element)
      setIsOpen(true)
      return
    }

    setIsOpen(!isOpen)
  }

  const changeModalConfirmacao = (element?: ReactNode) => {
    if (element) {
      setComponent(element)
      setIsOpenConfirmacao(!isOpenConfirmacao)
      return
    }

    setIsOpenConfirmacao(!isOpenConfirmacao)
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        isOpenConfirmacao,
        changeModal,
        changeModalConfirmacao
      }}
    >
      {(isOpen || isOpenConfirmacao) && <Modal component={component} confirmation={isOpenConfirmacao} />}
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContext
