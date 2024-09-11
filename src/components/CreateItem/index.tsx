import React from 'react'

import CreateCliente from './Itens/Clientes'
import CreateFornecedor from './Itens/Fornecedores'

import { type Fornecedores, type Cliente } from '../../interfaces/globalInterfaces'
import CreateOrcamento from './Itens/Orcamentos'

interface CreateParams {
  type: 'cliente' | 'obra' | 'fornecedor' | 'usuario' | 'orcamento'
  data?: Cliente | Fornecedores
}

const CreateItem: React.FC<CreateParams> = ({ type, data }) => {
  return (
    <>
      {type === 'cliente' && <CreateCliente cliente={data} />}
      {type === 'obra' && <CreateCliente cliente={data} />}
      {type === 'fornecedor' && <CreateFornecedor fornecedor={data as Fornecedores} />}
      {type === 'usuario' && <CreateCliente cliente={data} />}
      {type === 'orcamento' && <CreateOrcamento />}
    </>
  )
}

export default CreateItem
