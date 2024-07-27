import { useState } from 'react'
import { type TypeErrors } from './interfaces/hookUseErrorsInterface'

export default function useErrors () {
  const [errors, setErrors] = useState<TypeErrors[]>([])

  function setError ({ field, message }: { field: string, message: string }) {
    const errorAreadyExists = errors.find((error: { field: string }) => error.field === field)

    if (errorAreadyExists) {
      return
    }

    setErrors((prevState) => [
      ...prevState,
      { field, message }
    ])
  }

  function removeError (fieldName: string) {
    setErrors((prevState) => prevState.filter(
      (error: { field: string }) => error.field !== fieldName
    ))
  }

  function getErrorMessageByFieldName (fieldName: string) {
    const [errorExists] = errors.filter((error: { field: string, message: string }) => error.field === fieldName)

    return errorExists?.message
  }

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName
  }
}
