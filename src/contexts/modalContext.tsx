import React, { createContext, useState, type ReactNode } from 'react'

import Modal from '../components/Modal'

interface ModalContextType {
  isOpen: boolean
  changeModal: (element?: ReactNode) => void
}

interface ModalProviderProps {
  children: ReactNode
}

const initialContextValue: ModalContextType = {
  isOpen: false,
  changeModal: () => {}
}

const ModalContext = createContext<ModalContextType>(initialContextValue)

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [component, setComponent] = useState<ReactNode>()

  const changeModal = (element?: ReactNode) => {
    setIsOpen(!isOpen)

    if (element) {
      setComponent(element)
    }
  }

  console.log(isOpen)

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        changeModal
      }}
    >
      {isOpen && <Modal component={component} />}
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContext
