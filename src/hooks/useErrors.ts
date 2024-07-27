import { useState } from 'react'

import { type TypeErrors } from '../interfaces/globalInterfaces'

const useErrors = () => {
  const [errors, setErrors] = useState<TypeErrors[]>([])

  function setError ({ field, message }: TypeErrors) {
    if (errors.some(error => error.field === field)) {
      return
    }

    setErrors(prevState => [...prevState, { field, message }])
  }

  function removeError (fieldName: string) {
    setErrors(prevState => prevState.filter(error => error.field !== fieldName))
  }

  function getErrorMessageByFieldName (fieldName: string): string | undefined {
    return errors.find(error => error.field === fieldName)?.message
  }

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName
  }
}

export default useErrors
