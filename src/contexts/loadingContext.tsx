import React, { createContext, useState, type ReactNode } from 'react'

import Loading from '../components/Loading'

interface LoadingContextType {
  loading: boolean
  changeLoading: (newValue: boolean, textValue: string) => void
}

interface LoadingProviderProps {
  children: ReactNode
}

const initialContextValue: LoadingContextType = {
  loading: false,
  changeLoading: () => {}
}

const LoadingContext = createContext<LoadingContextType>(initialContextValue)

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null | undefined>()

  const changeLoading = (newValue: boolean, textValue: string) => {
    setMessage(textValue)

    if (newValue) {
      setLoading(newValue)
    } else {
      setTimeout(() => {
        setLoading(newValue)
      }, 2000)
    }
  }

  return (
    <LoadingContext.Provider
      value={{
        loading,
        changeLoading
      }}
    >
      {loading && <Loading message={message} />}
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingContext
