import HttpClientSgo from '../utils/HttpCliente'
import { url } from '../utils/urlServices'

interface ValidateCreateClienteParams {
  token: string
  mapperCliente: {
    id?: number
    nome: string
    razao_social: string
    cpf_cnpj: string
    telefone: string
    email: string
    cep: string
    logradouro: string
    numero: string
    complemento?: string
    bairro: string
    cidade: string
    uf: string
    inscricao_municipal?: string
    inscricao_estadual?: string
    responsavel: string
    responsavel_financeiro: string
    telefone_financeiro: string
    email_financeiro: string
    status: number
  }
}

interface ListClientesParams {
  token: string
}

class ClientesServices {
  private readonly httpClient: HttpClientSgo

  constructor () {
    this.httpClient = new HttpClientSgo(url)
  }

  async list ({ token }: ListClientesParams) {
    try {
      const response = await this.httpClient.get('/api/clientes/list', {
        headers: {
          Authorization: token
        }
      })
      return response
    } catch (error) {
      console.error('Erro ao listar os clientes', error)
      throw new Error('Falha na listagem de clientes.')
    }
  }

  async create ({ token, mapperCliente }: ValidateCreateClienteParams) {
    try {
      const response = await this.httpClient.post('/api/clientes/create', {
        headers: {
          Authorization: token
        },
        data: mapperCliente
      })

      return response
    } catch (error) {
      console.error('Erro ao criar cliente', error)
      throw new Error('Falha na criação de cliente.')
    }
  }
}

export default new ClientesServices()
