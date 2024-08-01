import PropTypes from 'prop-types'
import React, { createContext, useState, type ReactNode } from 'react'
import Loading from '../components/Loading'

const dataContext = {
  loading: true || false,
  changeLoading: (newValue: boolean, textValue: string) => {}
}

const LoadingContext = createContext(dataContext)

const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string | null | undefined>()

  const changeLoading = (newValue: boolean, textValue: string) => {
    if (newValue) {
      setMessage(textValue)
      setLoading(newValue)
    } else {
      setMessage(null)
      setInterval(() => {
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

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default LoadingContext
