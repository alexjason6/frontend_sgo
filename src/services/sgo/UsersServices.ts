import HttpClientSgo from '../utils/HttpCliente'
import { url } from '../utils/urlServices'

interface ValidateCreateUsersParams {
  token: string
  mapperUser: {
    id?: number
    nome: string
    cpf: string
    telefone: string
    email: string
    cep: string
    logradouro: string
    numero: string
    complemento?: string
    bairro: string
    cidade: string
    uf: string
    status: number
  }
}

interface ListUsersParams {
  token: string
}

class UsersServices {
  private readonly httpClient: HttpClientSgo

  constructor () {
    this.httpClient = new HttpClientSgo(url)
  }

  async list ({ token }: ListUsersParams) {
    try {
      const response = await this.httpClient.get('/api/users/list', {
        headers: {
          Authorization: token
        }
      })
      return response
    } catch (error) {
      console.error('Erro ao listar os usuários', error)
      throw new Error('Falha na listagem de usuários.')
    }
  }

  async create ({ token, mapperUser }: ValidateCreateUsersParams) {
    try {
      const response = await this.httpClient.post('/api/users/create', {
        headers: {
          Authorization: token
        },
        data: mapperUser
      })

      return response
    } catch (error) {
      console.error('Erro ao criar usuário', error)
      throw new Error('Falha na criação de usuário.')
    }
  }

  async update ({ token, mapperUser }: ValidateCreateUsersParams) {
    try {
      const response = await this.httpClient.post('/api/clientes/create', {
        headers: {
          Authorization: token
        },
        data: mapperUser
      })

      return response
    } catch (error) {
      console.error('Erro ao criar cliente', error)
      throw new Error('Falha na criação de cliente.')
    }
  }
}

export default new UsersServices()
