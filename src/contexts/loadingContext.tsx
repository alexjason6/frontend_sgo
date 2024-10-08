import React, { createContext, useCallback, useState, type ReactNode } from 'react'

import Loading from '../components/Loading'

interface LoadingContextType {
  loading: boolean
  changeLoading: (newValue: boolean, textValue?: string) => void
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

  const changeLoading = useCallback((newValue: boolean, textValue?: string) => {
    if (newValue) {
      setLoading(newValue)
      setMessage(textValue)
    } else {
      setLoading(false)
    }
  }, [])

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
