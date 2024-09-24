import { type Cliente } from '../../interfaces/globalInterfaces'
import HttpClientSgo from '../utils/HttpCliente'
import { url } from '../utils/urlServices'

interface ValidateCreateClienteParams {
  token: string
  mapperCliente: Cliente
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

  async update ({ token, mapperCliente }: ValidateCreateClienteParams) {
    try {
      const response = await this.httpClient.post(`api/clientes/update/${mapperCliente.id}`, {
        headers: {
          Authorization: token
        },
        data: mapperCliente
      })

      return response
    } catch (error) {
      console.error('Erro ao editar cliente', error)
      throw new Error('Falha na edição de cliente.')
    }
  }
}

export default new ClientesServices()
