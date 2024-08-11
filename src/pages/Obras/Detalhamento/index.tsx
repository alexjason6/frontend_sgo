import React from 'react'
import { useParams } from 'react-router-dom'

const DetalhamentoObra: React.FC = () => {
  const { id } = useParams()
  console.log(id)

  return <h1>Detalhamento obra, {id}</h1>
}

export default DetalhamentoObra
