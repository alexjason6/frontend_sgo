import React, { createContext, useCallback, useState, type ReactNode } from 'react'

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

  const changeModal = useCallback((element?: ReactNode) => {
    if (element) {
      setComponent(element)
      setIsOpen(true)
      return
    }

    setIsOpen(!isOpen)
  }, [])

  const changeModalConfirmacao = (element?: ReactNode) => {
    setIsOpenConfirmacao(!isOpenConfirmacao)

    if (element) {
      setComponent(element)
    }
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
      {isOpen && <Modal component={component} />}
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContext
