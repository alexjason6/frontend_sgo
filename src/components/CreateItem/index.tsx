import React from 'react'

import CreateCliente from './Itens/Clientes'
import CreateFornecedor from './Itens/Fornecedores'
import CreateOrcamento from './Itens/Orcamentos'
import CreateObra from './Itens/Obras'

import { type Fornecedores, type Cliente, type Obra } from '../../interfaces/globalInterfaces'
import CreateUser from '../../pages/Users/CreateUser'

interface CreateParams {
  type: 'cliente' | 'obra' | 'fornecedor' | 'usuario' | 'orcamento'
  data?: Cliente | Fornecedores | Obra
}

const CreateItem: React.FC<CreateParams> = ({ type, data }) => {
  return (
    <>
      {type === 'cliente' && <CreateCliente cliente={data as Cliente} />}
      {type === 'obra' && <CreateObra obra={data as Obra} />}
      {type === 'fornecedor' && <CreateFornecedor fornecedor={data as Fornecedores} />}
      {type === 'usuario' && <CreateUser />}
      {type === 'orcamento' && <CreateOrcamento />}
    </>
  )
}

export default CreateItem
